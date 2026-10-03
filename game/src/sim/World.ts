// The simulation: one 4v4 match on Ashfall Crossing, stepped at 30 Hz.
// Renderer-independent so it can run headless (tests, future server).
import * as R from './rules';
import { econ, stat, T, type Lineage } from './tuning';
import { heightAt, normalAt, HALF_W, HALF_D } from './terrain';
import {
  BASES, HUBS, CORE_SITES, buildNodes, buildObstacles, buildCamps, cellAt,
  type NodeDef, type Obstacle, type CampDef, type Team, type Vec2,
} from './map';
import { NavGrid } from './nav';
import { SPECIES } from './species';
import { emptyIntent, type Creature, type GameEvent, type Side } from './types';
import { dealDamage, maxHp, heal, control } from './combat';
import { tryCasts, updateCast, canAct } from './abilities';
import { updateWild } from './wildAI';
import { Rng } from '../core/rng';

export interface MatchOptions {
  playerLineage: Lineage | null;   // null = spectate (all bots)
  playerTeam: Team;
  short: boolean;                  // short match: phases ×0.5, EXP ×2
  seed: number;
}

export interface Hub { node: number; pos: Vec2; level: number; hp: number; lastHit: number; uproot: number }
export interface EnemyCore { team: Team; pos: Vec2; hp: number; max: number; alive: boolean; regrowAt: number; reward: number; lastHit: number }
export interface Heart { team: Team; pos: Vec2; hp: number; lastHit: number }
export interface Pickup { id: number; pos: { x: number; y: number; z: number }; amount: number; expires: number }
export interface Camp { def: CampDef; members: number[]; respawnAt: number }

const GRAVITY = 25;
/** Below this level cores turn straight into EXP (no return needed to awaken). */
export const DIRECT_EXP_BELOW = 3;
const BASE_RADIUS = 14;

export class World {
  readonly opts: MatchOptions;
  readonly rng: Rng;
  time = 0;
  phase = 1;
  creatures: Creature[] = [];
  private events: GameEvent[] = [];
  readonly nodes: NodeDef[];
  nodeOwner: (Team | -1)[];
  cellOwner: (Team | -1)[];          // visual spread follows nodeOwner
  private spreadQueue: { cell: number; team: Team | -1; at: number }[] = [];
  growth: number[];
  hubs: Hub[];
  cores: EnemyCore[];
  hearts: Heart[];
  sap: [number, number] = [0, 0];
  readonly obstacles: Obstacle[];
  readonly nav: NavGrid;
  camps: Camp[] = [];
  pickups: Pickup[] = [];
  private nextPickup = 1;
  readonly sides: [Side, Side];
  result: { winner: Team | null; how: string; time: number } | null = null;
  private mercySince: (number | null)[] = [null, null];
  private secondAcc = 0;
  readonly timeScale: number;
  readonly expMult: number;
  player: Creature | null = null;
  /** True once the time limit hit with Territorial Influence within 1% (Spec 05 §10). */
  overtime = false;
  /** A* searches bots may still run this tick (reset every step). */
  pathBudget = 2;

  constructor(opts: MatchOptions) {
    this.opts = opts;
    this.rng = new Rng(opts.seed);
    this.timeScale = opts.short ? 0.5 : 1;
    this.expMult = opts.short ? 2 : 1;
    this.nodes = buildNodes();
    this.obstacles = buildObstacles();
    this.nav = new NavGrid(this.obstacles);
    this.nodeOwner = this.nodes.map(() => -1 as const);
    this.cellOwner = new Array(240).fill(-1);
    this.growth = this.nodes.map(() => 0);
    // each team starts owning the nodes around its base
    this.nodes.forEach((n) => {
      for (const t of [0, 1] as Team[]) {
        if (n.hub === null && this.dist2d(n.core, BASES[t]) < 34) this.setOwner(n.id, t, true);
      }
    });
    this.hubs = this.nodes.filter((n) => n.hub !== null).map((n) => ({
      node: n.id, pos: HUBS[n.hub!], level: 0, hp: econ('Hub base Health'), lastHit: -99, uproot: 0,
    }));
    this.cores = ([0, 1] as Team[]).flatMap((team) => CORE_SITES[team].map((pos) => ({
      team, pos, hp: econ('Enemy Core Health'), max: econ('Enemy Core Health'), alive: true, regrowAt: 0,
      reward: econ('Enemy Core reward'), lastHit: -99,
    })));
    this.hearts = ([0, 1] as Team[]).map((team) => ({ team, pos: { x: BASES[team].x * 1.03, z: 0 }, hp: econ('Base Heart Health'), lastHit: -99 }));
    const wild = this.rng.next() < 0.5 ? 0 : 1;
    this.sides = wild === 0 ? ['Wildborn', 'Blightborn'] : ['Blightborn', 'Wildborn'];
    this.spawnTeams();
    for (const def of buildCamps()) this.spawnCamp({ def, members: [], respawnAt: 0 });
  }

  // ------------------------------------------------------------------ setup
  private newCreature(partial: Partial<Creature> & Pick<Creature, 'kind' | 'team' | 'name' | 'lineage'>): Creature {
    const c: Creature = {
      id: this.creatures.length, isPlayer: false, partner: null,
      pos: { x: 0, y: 0, z: 0 }, vel: { x: 0, y: 0, z: 0 }, yaw: 0, grounded: true, moveSpeed: 0,
      level: 1, exp: 0, hp: 600, alive: true, respawnAt: 0, transformUntil: 0, carried: 0, wildCores: 0,
      stunUntil: 0, staggerUntil: 0, rootUntil: 0, slowUntil: 0, slowPct: 0, airborneUntil: 0, ccImmuneUntil: 0,
      unstoppableUntil: 0, invulnUntil: 0, bulwarkUntil: 0, chestExposedUntil: 0, grabbedBy: null,
      cd: {}, cast: null, channel: null, momentum: 0, ultUntil: 0,
      weakDamage: 0, weakLastHit: -99, weakBrokenUntil: 0,
      lastDamagedAt: -99, lastCombatAt: -99, lastAttacker: null, assists: new Map(),
      intent: emptyIntent(), kills: 0, deaths: 0,
      ...partial,
    };
    this.creatures.push(c);
    return c;
  }

  private spawnTeams() {
    const names = [['Ash', 'Moss', 'Cinder', 'Fern'], ['Glint', 'Shard', 'Hush', 'Facet']];
    for (const team of [0, 1] as Team[]) {
      const pairs: [Lineage, Lineage][] = [['Titan', 'Brawler'], ['Titan', 'Brawler']];
      let i = 0;
      for (const [a, b] of pairs) {
        const ca = this.newCreature({ kind: 'ascendant', team, name: names[team][i++], lineage: a });
        const cb = this.newCreature({ kind: 'ascendant', team, name: names[team][i++], lineage: b });
        ca.partner = cb.id; cb.partner = ca.id;
      }
    }
    if (this.opts.playerLineage) {
      const p = this.creatures.find((c) => c.team === this.opts.playerTeam && c.lineage === this.opts.playerLineage)!;
      p.isPlayer = true;
      p.name = 'You';
      this.player = p;
    }
    for (const c of this.creatures) this.placeAtBase(c);
  }

  placeAtBase(c: Creature) {
    const b = BASES[c.team as Team];
    const k = c.id % 4;
    const x = b.x + (c.team === 0 ? 4 : -4) + (k - 1.5) * 1.5;
    const z = b.z + (k - 1.5) * 3;
    c.pos = { x, y: heightAt(x, z), z };
    c.vel = { x: 0, y: 0, z: 0 };
    c.yaw = c.team === 0 ? Math.PI / 2 : -Math.PI / 2;
    c.intent.aimYaw = c.yaw;
  }

  private spawnCamp(camp: Camp) {
    const sp = SPECIES[camp.def.species];
    camp.members = [];
    for (let i = 0; i < sp.group; i++) {
      const a = (i / sp.group) * Math.PI * 2 + this.rng.next();
      const x = camp.def.pos.x + Math.cos(a) * (1 + sp.size) * 1.5;
      const z = camp.def.pos.z + Math.sin(a) * (1 + sp.size) * 1.5;
      const c = this.newCreature({
        kind: 'wild', team: -1, name: sp.name, lineage: 'Titan', species: sp.name,
        maxHpOverride: sp.health * this.phaseMult(), hp: sp.health * this.phaseMult(),
        campId: camp.def.id, homePos: { x, z }, wildState: sp.temperament === 'duel' ? 'duel' : 'idle', wildTimer: this.rng.range(1, 4),
      });
      c.pos = { x, y: heightAt(x, z), z };
      c.yaw = this.rng.range(-Math.PI, Math.PI);
      camp.members.push(c.id);
    }
    if (!this.camps.includes(camp)) this.camps.push(camp);
  }

  // ------------------------------------------------------------------ helpers
  emit(e: GameEvent) { this.events.push(e); }
  drainEvents(): GameEvent[] { const e = this.events; this.events = []; return e; }
  dist(a: { x: number; z: number }, b: { x: number; z: number }) { return Math.hypot(a.x - b.x, a.z - b.z); }
  dist2d(a: Vec2, b: Vec2) { return Math.hypot(a.x - b.x, a.z - b.z); }
  radius(c: Creature): number {
    if (c.kind === 'wild') return SPECIES[c.species!].size * 0.45;
    return R.FORM_RADIUS[R.formForLevel(c.level)] * (c.lineage === 'Titan' ? 1.15 : 1);
  }
  height(c: Creature): number {
    if (c.kind === 'wild') return SPECIES[c.species!].size;
    return R.FORM_HEIGHT[R.formForLevel(c.level)] * (c.lineage === 'Titan' ? 1.3 : 1);
  }
  phaseMult(): number {
    return [1, 1.15, 1.3, 1.45][this.phase - 1];
  }
  phaseStart(p: number): number { return [0, 300, 600, 960][p - 1] * this.timeScale; }
  get timeLimit(): number { return 1500 * this.timeScale; }
  hubNear(p: Vec2, r: number): Hub | undefined { return this.hubs.find((h) => this.dist2d(h.pos, p) <= r); }
  hubsHeld(team: Team): number { return this.hubs.filter((h) => this.nodeOwner[h.node] === team).length; }
  coresLost(team: Team): number { return this.cores.filter((c) => c.team === team && !c.alive).length; }
  ti(team: Team): number {
    const cells = this.nodes.reduce((s, n) => s + (this.nodeOwner[n.id] === team ? n.cells.length : 0), 0);
    return R.territorialInfluence(cells, 240, this.hubsHeld(team));
  }
  sideOf(team: Team): Side { return this.sides[team]; }

  addCores(c: Creature, amount: number, _source: string): number {
    // Awakening rule (sim/findings.md A2): until Level 3, cores become EXP when picked up.
    if (c.level < DIRECT_EXP_BELOW && amount > 0) {
      this.gainExp(c, amount * this.expMult);
      return amount;
    }
    const room = econ('Carry cap') - c.carried;
    const got = Math.max(0, Math.min(room, amount));
    c.carried += got;
    return got;
  }

  dropCores(pos: { x: number; y: number; z: number }, amount: number) {
    const pieces = Math.min(6, Math.max(1, Math.round(amount / 40)));
    for (let i = 0; i < pieces; i++) {
      const a = (i / pieces) * Math.PI * 2;
      const x = pos.x + Math.cos(a) * 1.5, z = pos.z + Math.sin(a) * 1.5;
      this.pickups.push({ id: this.nextPickup++, pos: { x, y: heightAt(x, z), z }, amount: amount / pieces, expires: this.time + econ('Dropped cores last') });
    }
  }

  /** Damage enemy structures in range of `pos`. `dmg` is ability-style (halved for structures);
   *  `final` is siege damage applied once per structure (tracked in `once`). */
  hitStructures(c: Creature, pos: Vec2, radius: number, dmg: number, final = 0, once?: Set<number>) {
    if (c.kind !== 'ascendant') return;
    const enemy = (1 - (c.team as number)) as Team;
    const stage = R.stageForLevel(c.level);
    const mod = econ('Structure damage modifier');
    const apply = (key: number, amount: number) => {
      if (final > 0) { if (once?.has(key)) return 0; once?.add(key); return final; }
      return amount * mod;
    };
    this.hubs.forEach((h, i) => {
      if (this.nodeOwner[h.node] !== enemy || this.dist2d(h.pos, pos) > radius + 4) return;
      const max = econ('Hub base Health') + econ('Hub Health per level') * h.level;
      if (h.hp >= econ('Hub shield threshold') * max && stage < 2) return; // shielded
      h.hp = Math.max(1, h.hp - apply(1000 + i, dmg));
      h.lastHit = this.time;
      c.lastCombatAt = this.time;
      this.emit({ type: 'hit', source: c.id, target: -1, amount: dmg * mod, weak: false, pos: { x: h.pos.x, y: heightAt(h.pos.x, h.pos.z) + 3, z: h.pos.z } });
    });
    this.cores.forEach((core, i) => {
      if (core.team !== enemy || !core.alive || stage < 2 || this.phase < 2 || this.dist2d(core.pos, pos) > radius + 3) return;
      core.hp -= apply(2000 + i, dmg);
      core.lastHit = this.time;
      c.lastCombatAt = this.time;
      this.emit({ type: 'hit', source: c.id, target: -2, amount: dmg * mod, weak: false, pos: { x: core.pos.x, y: heightAt(core.pos.x, core.pos.z) + 3, z: core.pos.z } });
      if (core.hp <= 0) this.destroyCore(core, i, c);
    });
    const heart = this.hearts[enemy];
    if (this.heartOpen(enemy) && stage >= 2 && this.dist2d(heart.pos, pos) <= radius + 5) {
      heart.hp -= apply(3000 + enemy, dmg);
      heart.lastHit = this.time;
      this.emit({ type: 'hit', source: c.id, target: -3, amount: dmg * mod, weak: false, pos: { x: heart.pos.x, y: heightAt(heart.pos.x, heart.pos.z) + 5, z: heart.pos.z } });
      if (heart.hp <= 0) this.end(c.team as Team, 'Base Heart destroyed');
    }
  }

  heartOpen(team: Team): boolean {
    return this.phase === 4 || this.cores.filter((c) => c.team === team).every((c) => !c.alive);
  }

  private destroyCore(core: EnemyCore, index: number, by: Creature) {
    core.alive = false;
    core.hp = 0;
    core.regrowAt = this.time + econ('Enemy Core regrowth');
    const attackers = this.creatures.filter((c) => c.kind === 'ascendant' && c.alive && c.team === by.team && this.dist2d(c.pos, core.pos) <= 20);
    for (const a of attackers) this.addCores(a, core.reward / attackers.length, 'cores');
    this.emit({ type: 'structure', kind: 'core', index, team: core.team, destroyed: true });
  }

  setOwner(node: number, team: Team | -1, instant = false) {
    this.nodeOwner[node] = team;
    this.growth[node] = 0;
    const cells = this.nodes[node].cells;
    cells.forEach((cell, i) => {
      if (instant) this.cellOwner[cell] = team;
      else this.spreadQueue.push({ cell, team, at: this.time + i * 2 });
    });
  }

  /** Can `team` root (neutral) or uproot (enemy) this node right now? */
  capturable(team: Team, node: number): boolean {
    const owner = this.nodeOwner[node];
    if (owner === team) return false;
    const n = this.nodes[node];
    if (this.phase === 1 && Math.abs(n.core.x) < 45) return false; // centre opens in Phase 2
    if (n.hub !== null && owner !== -1) {
      const h = this.hubs.find((x) => x.node === node)!;
      const max = econ('Hub base Health') + econ('Hub Health per level') * h.level;
      if (h.hp >= econ('Hub shield threshold') * max) return false; // shielded Hubs can't be uprooted
    }
    return n.neighbours.some((nb) => this.nodeOwner[nb] === team);
  }

  // ------------------------------------------------------------------ wildlife hooks
  onWildHit(c: Creature, src: Creature | null) {
    if (src) c.wildTarget = src.id;
  }

  onWildDeath(c: Creature, killer: Creature | null) {
    const sp = SPECIES[c.species!];
    const camp = this.camps.find((k) => k.def.id === c.campId);
    if (camp && camp.members.every((id) => !this.creatures[id].alive)) camp.respawnAt = this.time + sp.respawn;
    if (!killer || killer.kind !== 'ascendant') return;
    let value = sp.cores * (sp.affinity === killer.lineage ? T.affinityMult : 1);
    const full = Math.max(0, Math.min(value, econ('Wildlife full-value cap') - killer.wildCores));
    killer.wildCores += value;
    value = full + (value - full) * econ('Wildlife value after cap');
    const got = this.addCores(killer, value, 'wildlife');
    this.sap[killer.team as Team] += sp.sap;
    this.emit({ type: 'pickup', id: killer.id, amount: got, pos: { ...c.pos } });
  }

  // ------------------------------------------------------------------ interaction channels
  private updateInteract(c: Creature, dt: number) {
    if (c.kind !== 'ascendant') return;
    const team = c.team as Team;
    const moving = Math.hypot(c.intent.move.x, c.intent.move.z) > 0.2;
    if (!c.intent.interact || moving || !canAct(this, c) || (c.cast && !c.cast.done)) { c.channel = null; return; }
    if (!c.channel) {
      const reach = 2.5 + this.radius(c);
      if (c.carried >= 1 && this.dist2d(c.pos, BASES[team]) <= BASE_RADIUS) {
        c.channel = { kind: 'convert', t: 0, dur: R.convertTime(this.hubsHeld(team), this.coresLost(team)) };
      } else {
        const node = this.nodes.find((n) => this.dist2d(n.core, c.pos) <= reach + (n.hub !== null ? 3 : 0) && this.capturable(team, n.id));
        if (node) {
          const enemyOwned = this.nodeOwner[node.id] !== -1;
          let dur = R.rootChannel(control(c));
          if (enemyOwned) {
            dur = node.cells.length * R.uprootPerCell(0);
            if (node.hub !== null) {
              const h = this.hubs.find((x) => x.node === node.id)!;
              const max = econ('Hub base Health') + econ('Hub Health per level') * h.level;
              if (h.hp < 0.33 * max) dur /= 2; // Collapsing
            }
          }
          c.channel = { kind: enemyOwned ? 'uproot' : 'root', node: node.id, t: 0, dur };
        } else {
          const hub = this.hubNear(c.pos, 8 + this.radius(c));
          if (hub && this.nodeOwner[hub.node] === team && c.carried >= 1) {
            c.channel = { kind: 'field', t: 0, dur: R.convertTime(this.hubsHeld(team), this.coresLost(team)) };
          }
        }
      }
      return;
    }
    const ch = c.channel;
    ch.t += dt;
    if (ch.t < ch.dur) return;
    c.channel = null;
    if (ch.kind === 'convert' || ch.kind === 'field') {
      const partner = c.partner !== null ? this.creatures[c.partner] : null;
      const sync = !!partner && partner.channel?.kind === 'convert';
      if (c.level >= 20) {
        this.sap[team] += c.carried / econ('L20 cores per SAP');
      } else {
        const exp = R.conversionExp(c.carried, { field: ch.kind === 'field', partnerSync: sync }) * this.expMult;
        this.gainExp(c, exp);
        this.emit({ type: 'convert', id: c.id, exp, field: ch.kind === 'field' });
      }
      c.carried = 0;
    } else if (ch.node !== undefined && this.capturable(team, ch.node)) {
      const wasEnemy = this.nodeOwner[ch.node] !== -1;
      this.setOwner(ch.node, wasEnemy ? -1 : team);
      const hub = this.hubs.find((h) => h.node === ch.node);
      if (hub) { hub.level = 0; hub.hp = econ('Hub base Health'); hub.uproot = 0; }
      this.emit({ type: 'capture', node: ch.node, team: wasEnemy ? -1 : team, by: c.id });
      // Overtime (Spec 05 §10): the first team to capture a node wins
      if (this.overtime && !wasEnemy) this.end(team, 'Overtime capture');
    }
  }

  gainExp(c: Creature, amount: number) {
    const before = c.level;
    c.exp = Math.min(R.expToReach(20), c.exp + amount);
    const after = R.levelForExp(c.exp);
    if (after === before) return;
    const frac = c.hp / maxHp(c);
    c.level = after;
    c.hp = frac * maxHp(c);
    this.emit({ type: 'levelup', id: c.id, level: after });
    if (R.formForLevel(after) !== R.formForLevel(before)) {
      c.transformUntil = this.time + 1.5; // invulnerable and rooted while transforming
      c.cast = null;
      c.hp = maxHp(c) * Math.max(frac, 0.5);
      this.emit({ type: 'transform', id: c.id, form: R.formForLevel(after) });
    }
  }

  // ------------------------------------------------------------------ main step
  step(dt = R.DT) {
    if (this.result) return;
    this.pathBudget = 2;
    this.time += dt;
    const newPhase = this.time >= this.phaseStart(4) ? 4 : this.time >= this.phaseStart(3) ? 3 : this.time >= this.phaseStart(2) ? 2 : 1;
    if (newPhase !== this.phase) { this.phase = newPhase; this.emit({ type: 'phase', phase: newPhase }); }

    for (const c of this.creatures) {
      if (!c.alive) {
        if (c.kind === 'ascendant' && this.time >= c.respawnAt) this.respawn(c);
        continue;
      }
      if (c.kind === 'wild') updateWild(this, c, dt);
      else {
        tryCasts(this, c);
        updateCast(this, c, dt);
        this.updateInteract(c, dt);
        if (c.lineage === 'Brawler' && this.time - c.lastCombatAt > 3) c.momentum = Math.max(0, c.momentum - 10 * dt);
      }
      this.move(c, dt);
    }
    this.separate();
    this.updatePickups();
    this.secondAcc += dt;
    if (this.secondAcc >= 1) { this.secondAcc -= 1; this.everySecond(); }
    while (this.spreadQueue.length && this.spreadQueue[0].at <= this.time) {
      const s = this.spreadQueue.shift()!;
      this.cellOwner[s.cell] = s.team;
    }
    this.checkEnd();
  }

  private respawn(c: Creature) {
    c.alive = true;
    c.hp = maxHp(c);
    c.stunUntil = c.staggerUntil = c.rootUntil = c.airborneUntil = c.slowUntil = 0;
    c.grabbedBy = null;
    c.cd = {};
    c.weakBrokenUntil = 0;
    this.placeAtBase(c);
  }

  private move(c: Creature, dt: number) {
    const now = this.time;
    // airborne / knockback arcs
    if (!c.grounded || c.vel.y > 0) {
      c.pos.x += c.vel.x * dt;
      c.pos.z += c.vel.z * dt;
      c.pos.y += c.vel.y * dt;
      c.vel.y -= GRAVITY * dt;
      this.clampBounds(c);
      const g = heightAt(c.pos.x, c.pos.z);
      if (c.pos.y <= g) {
        c.pos.y = g;
        c.grounded = true;
        c.vel.x = c.vel.z = c.vel.y = 0;
        if (c.landingBy !== undefined) {
          dealDamage(this, this.creatures[c.landingBy], c, 40);
          c.landingBy = undefined;
        }
      }
      c.moveSpeed = 0;
      return;
    }
    if (c.grabbedBy !== null) { c.moveSpeed = 0; return; }
    const frozen = now < c.stunUntil || now < c.rootUntil || now < c.transformUntil || now < c.airborneUntil
      || (c.cast && !c.cast.done && c.cast.slot !== 'basic' && c.cast.slot !== 'E') || c.channel;
    let want = frozen ? { x: 0, z: 0 } : c.intent.move;
    const len = Math.hypot(want.x, want.z);
    if (len > 1) want = { x: want.x / len, z: want.z / len };
    let speed = R.BASE_SPEED;
    if (c.kind === 'ascendant') {
      speed *= (this.statSpeed(c)) / 100;
      if (now - c.lastCombatAt > 4 && now - c.lastDamagedAt > 4) speed *= 1.3; // sprint out of combat
      if (now < c.bulwarkUntil) speed *= 0.7;
      if (c.cast && c.cast.slot === 'E' && c.lineage === 'Brawler') speed *= 0.5;
    }
    if (now < c.staggerUntil) speed *= 0.5;
    if (now < c.slowUntil) speed *= 1 - c.slowPct;
    else c.slowPct = 0;
    if (c.kind === 'wild') speed = c.wildSpeed ?? speed;
    const nx = c.pos.x + want.x * speed * dt;
    const nz = c.pos.z + want.z * speed * dt;
    // A creature knocked or pushed onto blocked ground (steep edge, inside a rock's margin) may
    // always move, so it can walk back out instead of being stuck forever.
    const escaping = !this.nav.walkable(c.pos.x, c.pos.z);
    const ok = (x: number, z: number) => escaping || (this.nav.walkable(x, z) && Math.abs(heightAt(x, z) - c.pos.y) < 1.2 + this.radius(c));
    let moved = false;
    if (ok(nx, nz)) { c.pos.x = nx; c.pos.z = nz; moved = true; }
    else if (ok(nx, c.pos.z)) { c.pos.x = nx; moved = true; }
    else if (ok(c.pos.x, nz)) { c.pos.z = nz; moved = true; }
    c.moveSpeed = moved ? Math.hypot(want.x, want.z) * speed : 0;
    if (moved && len > 0.05 && !(c.cast && !c.cast.done)) {
      const target = c.kind === 'ascendant' && c.isPlayer && now - c.lastCombatAt < 2 ? c.intent.aimYaw : Math.atan2(want.x, want.z);
      c.yaw = turnToward(c.yaw, target, (c.kind === 'ascendant' ? [12, 10, 7, 5][R.formForLevel(c.level)] : 8) * dt);
    } else if (c.kind === 'ascendant' && c.isPlayer && now - c.lastCombatAt < 2 && !(c.cast && !c.cast.done)) {
      c.yaw = turnToward(c.yaw, c.intent.aimYaw, 10 * dt);
    }
    this.clampBounds(c);
    c.pos.y = heightAt(c.pos.x, c.pos.z);
    // obstacles
    for (const o of this.obstacles) {
      const dx = c.pos.x - o.x, dz = c.pos.z - o.z;
      const min = o.r + this.radius(c) * 0.8;
      const d = Math.hypot(dx, dz);
      if (d < min && d > 1e-4) { c.pos.x = o.x + (dx / d) * min; c.pos.z = o.z + (dz / d) * min; }
    }
  }

  statSpeed(c: Creature): number {
    return c.kind === 'ascendant' ? stat(c.lineage, 'Speed %', c.level) : 100;
  }

  private clampBounds(c: Creature) {
    c.pos.x = Math.max(-HALF_W + 5, Math.min(HALF_W - 5, c.pos.x));
    c.pos.z = Math.max(-HALF_D + 5, Math.min(HALF_D - 5, c.pos.z));
  }

  /** Pushes overlapping creatures apart; heavier (bigger) creatures move less. */
  private separate() {
    const list = this.creatures.filter((c) => c.alive && c.grounded && c.grabbedBy === null);
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i], b = list[j];
        const dx = b.pos.x - a.pos.x, dz = b.pos.z - a.pos.z;
        const min = this.radius(a) + this.radius(b);
        const d2 = dx * dx + dz * dz;
        if (d2 >= min * min || d2 < 1e-8) continue;
        const d = Math.sqrt(d2);
        const push = min - d;
        const ma = this.radius(a) ** 2, mb = this.radius(b) ** 2;
        const ka = mb / (ma + mb), kb = ma / (ma + mb);
        a.pos.x -= (dx / d) * push * ka; a.pos.z -= (dz / d) * push * ka;
        b.pos.x += (dx / d) * push * kb; b.pos.z += (dz / d) * push * kb;
      }
    }
  }

  private updatePickups() {
    if (!this.pickups.length) return;
    this.pickups = this.pickups.filter((p) => {
      if (this.time >= p.expires || p.amount <= 0.5) return false;
      for (const c of this.creatures) {
        if (c.kind !== 'ascendant' || !c.alive) continue;
        const reach = (R.formForLevel(c.level) === 3 ? 4 : 2) + this.radius(c);
        if (this.dist(c.pos, p.pos) <= reach) {
          const got = this.addCores(c, p.amount, 'kills');
          if (got > 0) this.emit({ type: 'pickup', id: c.id, amount: got, pos: { ...p.pos } });
          p.amount -= got;
          if (p.amount <= 0.5) return false;
        }
      }
      return true;
    });
  }

  private everySecond() {
    const now = this.time;
    // passive income (as carried cores), out-of-combat regeneration
    for (const c of this.creatures) {
      if (!c.alive) continue;
      if (c.kind === 'ascendant') {
        const team = c.team as Team;
        this.addCores(c, R.passiveIncome(this.ti(team), this.coresLost(team)), 'passive');
        if (now - c.lastDamagedAt >= 6 && now - c.lastCombatAt >= 6) heal(this, c, 0.02 * maxHp(c));
        if (this.dist2d(c.pos, BASES[team]) <= BASE_RADIUS) c.hp = Math.min(maxHp(c), c.hp + 0.1 * maxHp(c));
      } else if (now - c.lastDamagedAt >= 8) {
        c.hp = Math.min(maxHp(c), c.hp + 0.05 * maxHp(c));
      }
    }
    // SAP income and Hub Defense purchases (team-level, automatic in this build)
    for (const team of [0, 1] as Team[]) {
      const cells = this.nodes.reduce((s, n) => s + (this.nodeOwner[n.id] === team ? n.cells.length : 0), 0);
      this.sap[team] += cells * econ('SAP per cell') * (1 + econ('SAP bonus per Hub') * this.hubsHeld(team));
      const owned = this.hubs.filter((h) => this.nodeOwner[h.node] === team && h.level < 10).sort((a, b) => a.level - b.level);
      if (owned.length) {
        const h = owned[0];
        const cost = econ('Hub Defense cost per level') * (h.level + 1);
        if (this.sap[team] >= cost + 200) { this.sap[team] -= cost; h.level++; h.hp += econ('Hub Health per level'); }
      }
    }
    // territorial growth: border nodes spread into adjacent neutral nodes
    const interval = econ('Territorial Growth interval');
    for (const n of this.nodes) {
      if (this.nodeOwner[n.id] !== -1 || n.hub !== null) continue;
      for (const team of [0, 1] as Team[]) {
        if (!this.capturable(team, n.id)) continue;
        const border = n.neighbours.filter((nb) => this.nodeOwner[nb] === team).length;
        this.growth[n.id] += (border / interval) * (team === 0 ? 1 : -1);
      }
      if (this.growth[n.id] >= n.cells.length) { this.setOwner(n.id, 0); this.emit({ type: 'capture', node: n.id, team: 0, by: -1 }); }
      else if (this.growth[n.id] <= -n.cells.length) { this.setOwner(n.id, 1); this.emit({ type: 'capture', node: n.id, team: 1, by: -1 }); }
    }
    // structures regenerate; Enemy Cores regrow
    for (const h of this.hubs) {
      const max = econ('Hub base Health') + econ('Hub Health per level') * h.level;
      if (now - h.lastHit > 10) h.hp = Math.min(max, h.hp + 0.02 * max);
    }
    for (const heart of this.hearts) {
      if (now - heart.lastHit > 15) heart.hp = Math.min(econ('Base Heart Health'), heart.hp + 0.01 * econ('Base Heart Health'));
    }
    this.cores.forEach((core, i) => {
      if (core.alive || now < core.regrowAt) return;
      const nearOwned = this.nodes.some((n) => this.nodeOwner[n.id] === core.team && this.dist2d(n.core, core.pos) < 30);
      if (!nearOwned) { core.regrowAt = now + 10; return; }
      core.alive = true;
      core.max = econ('Enemy Core Health') / 2;
      core.hp = core.max;
      core.reward = econ('Enemy Core reward') / 2;
      this.emit({ type: 'structure', kind: 'core', index: i, team: core.team, destroyed: false });
    });
    // wildlife camps respawn
    for (const camp of this.camps) {
      if (camp.respawnAt && now >= camp.respawnAt && camp.members.every((id) => !this.creatures[id].alive)) {
        camp.respawnAt = 0;
        this.spawnCamp(camp);
      }
    }
  }

  private checkEnd() {
    for (const team of [0, 1] as Team[]) {
      if (this.ti(team) >= econ('Mercy TI')) {
        this.mercySince[team] ??= this.time;
        if (this.time - this.mercySince[team]! >= econ('Mercy hold')) this.end(team, 'Mercy (80% territory)');
      } else this.mercySince[team] = null;
    }
    if (this.time >= this.timeLimit && !this.result) {
      const a = this.ti(0), b = this.ti(1);
      if (Math.abs(a - b) > 0.01) this.end(a > b ? 0 : 1, 'Time limit (territory)');
      else if (!this.overtime) { this.overtime = true; this.emit({ type: 'phase', phase: 5 }); }
      else if (this.time >= this.timeLimit + econ('Overtime') * this.timeScale) {
        this.end(Math.abs(a - b) <= 1e-9 ? null : a > b ? 0 : 1, 'Overtime (territory)');
      }
    }
  }

  end(winner: Team | null, how: string) {
    if (this.result) return;
    this.result = { winner, how, time: this.time };
    this.emit({ type: 'end', winner, how });
  }
}

export function turnToward(cur: number, target: number, maxStep: number): number {
  let d = target - cur;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  if (Math.abs(d) <= maxStep) return target;
  return cur + Math.sign(d) * maxStep;
}

export { normalAt, cellAt };

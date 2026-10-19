// Bot brain for Ascendants: utility goal selection, A* path following and
// lineage-aware combat. Bots only write to creature.intent (like the player's input).
import * as R from './rules';
import { econ } from './tuning';
import { BASES, type Team, type Vec2 } from './map';
import { SPECIES } from './species';
import { maxHp, yawTo } from './combat';
import { abilityInfo } from './abilities';
import { lin } from './lineages/registry';
import { onRoad } from './migration';
import type { Creature } from './types';
import type { Difficulty, World } from './World';

type Goal =
  | { kind: 'return' }
  | { kind: 'fight'; target: number }
  | { kind: 'farm'; target: number }
  | { kind: 'capture'; node: number }
  | { kind: 'siege'; pos: Vec2 }
  | { kind: 'defend'; pos: Vec2 }
  | { kind: 'idle'; pos: Vec2 };

export class BotBrain {
  goal: Goal = { kind: 'idle', pos: { x: 0, z: 0 } };
  path: Vec2[] = [];
  pathTo: Vec2 | null = null;
  nextThink = 0;
  nextPath = 0;
  returnAt: number;
  /** Release time for a charged ability (Haymaker); read and set by the lineage's bot logic. */
  holdUntil = 0;
  stuckSince = 0;
  lastPos: Vec2 = { x: 0, z: 0 };
  /** Difficulty profile (Version B §10): reaction time, aim error and return discipline from the workbook. */
  readonly difficulty: Difficulty;
  private reaction: number;
  private aimError: number;   // radians, ± around the true aim
  private aimOffset = 0;      // resampled on every think

  constructor(public readonly id: number, w: World, difficulty: Difficulty = w.opts.difficulty ?? 'Normal') {
    this.difficulty = difficulty;
    this.reaction = econ(`Bot reaction ${difficulty}`);
    this.aimError = (econ(`Bot aim error ${difficulty}`) * Math.PI) / 180;
    this.returnAt = w.rng.range(econ(`Bot return min ${difficulty}`), econ(`Bot return max ${difficulty}`));
  }

  update(w: World) {
    const c = w.creatures[this.id];
    if (!c.alive) { this.path = []; return; }
    const it = c.intent;
    it.basic = it.q = it.r = it.evade = it.ult = false;
    // E is "held" only while a charged E (Haymaker) is charging; otherwise a stuck E would fire casts that cancel channels
    it.e = c.cast?.slot === 'E' && lin(c).chargedSlot === 'E' && w.time < this.holdUntil;
    // branch at Stage 2 (gdd/31 guidance): behind on territory → Tactical, otherwise Aggression
    if (!c.branch && R.formForLevel(c.level) >= 2) {
      const team = c.team as Team;
      it.branch = w.ti(team) < w.ti((1 - team) as Team) ? 'Tactical' : 'Aggression';
    }
    if (w.time >= this.nextThink) {
      this.think(w, c);
      this.nextThink = w.time + this.reaction + 0.15 + w.rng.next() * 0.4;
      this.aimOffset = this.difficulty === 'Normal' ? 0 : (w.rng.next() * 2 - 1) * this.aimError;
    }
    this.act(w, c);
  }

  // -------------------------------------------------------------- deciding
  private think(w: World, c: Creature) {
    const team = c.team as Team;
    const enemy = (1 - team) as Team;
    const hpFrac = c.hp / maxHp(c);
    const form = R.formForLevel(c.level);
    const stage = R.stageForLevel(c.level);
    const atBase = w.dist2d(c.pos, BASES[team]) < 12;

    // keep converting once started
    if (c.channel && (c.channel.kind === 'convert' || c.channel.kind === 'root' || c.channel.kind === 'uproot')) return;

    const enemies = w.creatures.filter((e) => e.kind === 'ascendant' && e.alive && e.team === enemy);
    const notice = this.difficulty === 'Easy' ? 12 : 22; // Easy bots don't join fights they aren't in
    const near = enemies.filter((e) => w.dist(e.pos, c.pos) < notice).sort((a, b) => w.dist(a.pos, c.pos) - w.dist(b.pos, c.pos));
    const allies = w.creatures.filter((a) => a.kind === 'ascendant' && a.alive && a.team === team && a.id !== c.id);
    const alliesNear = allies.filter((a) => w.dist(a.pos, c.pos) < 22).length;

    // return once the carry buys at least the next level (or the personal threshold, whichever is lower)
    const toNext = (R.expToReach(c.level + 1) - c.exp) / w.expMult;
    const threshold = c.level >= 20 ? 400 : Math.min(this.returnAt, Math.max(60, toNext * 1.05));
    const wantsHome = c.carried > 0 && (c.carried >= threshold || (c.carried >= 120 && hpFrac < 0.35) || c.carried >= econ('Carry cap') - 10
      || (atBase && c.carried >= 40));
    if (hpFrac < 0.25 && near.length) { this.setGoal(w, { kind: 'return' }); return; }
    // Hard: bank the cores before a fight it would lose
    if (this.difficulty === 'Hard' && c.carried >= 60 && near.length > alliesNear + 1) { this.setGoal(w, { kind: 'return' }); return; }
    if (wantsHome && !(w.phase === 4 && w.heartOpen(enemy) && c.carried < econ('Carry cap'))) { this.setGoal(w, { kind: 'return' }); return; }

    // fight nearby enemies when the odds are acceptable
    if (near.length && (alliesNear + 1 >= near.length || near[0].level <= c.level + 1)) {
      const target = near.sort((a, b) => a.hp / maxHp(a) - b.hp / maxHp(b))[0];
      this.setGoal(w, { kind: 'fight', target: target.id });
      return;
    }

    // defend structures under attack
    const myHurt = [
      ...w.cores.filter((k) => k.team === team && k.alive && w.time - k.lastHit < 8).map((k) => k.pos),
      ...(w.time - w.hearts[team].lastHit < 8 ? [w.hearts[team].pos] : []),
      ...w.hubs.filter((h) => w.nodeOwner[h.node] === team && w.time - h.lastHit < 8).map((h) => h.pos),
    ];
    if (myHurt.length) { this.setGoal(w, { kind: 'defend', pos: myHurt[0] }); return; }

    const options: { score: number; goal: Goal }[] = [];
    // siege (Stage 2+)
    if (stage >= 2 && w.phase >= 2) {
      if (w.heartOpen(enemy)) {
        const heart = w.hearts[enemy].pos;
        // Hard: gather at a rally point until three of the team are together, then push
        const rally = { x: heart.x * 0.55, z: 0 };
        const grouped = allies.filter((a) => w.dist2d(a.pos, c.pos) < 25).length >= 2;
        const pushing = w.dist2d(c.pos, heart) < w.dist2d(rally, heart);
        const goal: Goal = this.difficulty === 'Hard' && !grouped && !pushing ? { kind: 'idle', pos: rally } : { kind: 'siege', pos: heart };
        options.push({ score: 6, goal });
      }
      const core = w.cores.filter((k) => k.team === enemy && k.alive).sort((a, b) => w.dist2d(a.pos, c.pos) - w.dist2d(b.pos, c.pos))[0];
      if (core) options.push({ score: 2.5 + (w.phase >= 3 ? 1 : 0) - w.dist2d(core.pos, c.pos) / 120, goal: { kind: 'siege', pos: core.pos } });
      const hub = w.hubs.filter((h) => w.nodeOwner[h.node] === enemy).sort((a, b) => w.dist2d(a.pos, c.pos) - w.dist2d(b.pos, c.pos))[0];
      if (hub) options.push({ score: 2 - w.dist2d(hub.pos, c.pos) / 120, goal: { kind: 'siege', pos: hub.pos } });
    }
    // capture
    const caps = w.nodes.filter((n) => w.capturable(team, n.id)).map((n) => ({
      n, d: w.dist2d(n.core, c.pos),
      v: (n.hub !== null ? 2.5 : 1) * (w.nodeOwner[n.id] === -1 ? 1 : 0.8),
    }));
    caps.sort((a, b) => a.d / a.v - b.d / b.v);
    const coord = this.difficulty === 'Hard' ? lin(c).bot.coordinate?.(w, c) : undefined;
    if (coord?.capture !== undefined && w.capturable(team, coord.capture)) options.push({ score: 5, goal: { kind: 'capture', node: coord.capture } });
    if (caps.length) options.push({ score: 2 + caps[0].v * 0.4 - caps[0].d / 80 + lin(c).bot.captureBias, goal: { kind: 'capture', node: caps[0].n.id } });
    // farm wildlife
    const prey = w.creatures.filter((t) => {
      if (t.kind !== 'wild' || !t.alive || w.time < t.invulnUntil) return false;
      const sp = SPECIES[t.species!];
      if (sp.tier === 'III' && form < 2 && alliesNear === 0) return false;
      if (sp.tier === 'II' && form === 0) return false;
      return true;
    }).map((t) => ({ t, d: w.dist(t.pos, c.pos), v: SPECIES[t.species!].cores }));
    prey.sort((a, b) => a.d / (a.v + 10) - b.d / (b.v + 10));
    if (prey.length) options.push({ score: (w.phase <= 2 ? 2.6 : 1.8) - prey[0].d / 70, goal: { kind: 'farm', target: prey[0].t.id } });
    // hunt an enemy that is visible further away
    const far = enemies.filter((e) => w.dist(e.pos, c.pos) < 60 && e.level <= c.level);
    if (far.length && w.phase >= 2) options.push({ score: 1.6, goal: { kind: 'fight', target: far[0].id } });
    if (!options.length) { this.setGoal(w, { kind: 'idle', pos: { x: BASES[team].x * 0.5, z: 0 } }); return; }
    // hysteresis: keep the current goal unless something is clearly better
    for (const o of options) {
      o.score += w.rng.next() * 0.6;
      if (o.goal.kind === this.goal.kind) o.score += 0.5;
    }
    options.sort((a, b) => b.score - a.score);
    this.setGoal(w, options[0].goal);
  }

  private setGoal(w: World, g: Goal) {
    const same = JSON.stringify(g) === JSON.stringify(this.goal);
    this.goal = g;
    if (!same) { this.path = []; this.nextPath = 0; }
    void w;
  }

  // -------------------------------------------------------------- acting
  private goTo(w: World, c: Creature, to: Vec2, stopAt: number): number {
    const d = w.dist2d(c.pos, to);
    if (d <= stopAt) { c.intent.move = { x: 0, z: 0 }; return d; }
    if ((w.time >= this.nextPath || !this.pathTo || w.dist2d(this.pathTo, to) > 3) && w.pathBudget > 0) {
      w.pathBudget--; // at most a few A* searches per tick, so many bots repathing at once can't cause a hitch
      this.path = w.nav.findPath({ x: c.pos.x, z: c.pos.z }, to);
      this.pathTo = { ...to };
      this.nextPath = w.time + 1.5 + w.rng.next();
    }
    while (this.path.length > 1 && w.dist2d(c.pos, this.path[0]) < 1.5 + w.radius(c)) this.path.shift();
    const wp = this.path[0] ?? to;
    const dx = wp.x - c.pos.x, dz = wp.z - c.pos.z;
    const l = Math.hypot(dx, dz) || 1;
    c.intent.move = { x: dx / l, z: dz / l };
    // Grey Migration: get off the road and don't step onto it while the herds run
    if (w.migration !== 'none') {
      if (onRoad(c.pos)) c.intent.move = { x: c.pos.x >= 0 ? 1 : -1, z: 0 };
      else if (onRoad({ x: c.pos.x + c.intent.move.x * 3, z: c.pos.z + c.intent.move.z * 3 })) c.intent.move = { x: 0, z: 0 };
    }
    // unstick: if barely moving for 2 s, sidestep
    if (w.dist2d(this.lastPos, c.pos) < 0.05) {
      if (!this.stuckSince) this.stuckSince = w.time;
      if (w.time - this.stuckSince > 2) {
        c.intent.move = { x: -dz / l, z: dx / l };
        this.nextPath = 0;
        if (w.time - this.stuckSince > 3) this.stuckSince = 0;
      }
    } else this.stuckSince = 0;
    this.lastPos = { x: c.pos.x, z: c.pos.z };
    return d;
  }

  private act(w: World, c: Creature) {
    const it = c.intent;
    const team = c.team as Team;
    const g = this.goal;
    it.interact = false;
    switch (g.kind) {
      case 'return': {
        // conversion works anywhere within 14 m of the base centre: stop as soon as we're inside
        const d = this.goTo(w, c, BASES[team], 10);
        if (d <= 11) {
          it.move = { x: 0, z: 0 };
          it.interact = c.carried >= 1;
          if (c.carried < 1 && !c.channel) this.nextThink = 0;
        } else this.combatReflexes(w, c, null);
        return;
      }
      case 'capture': {
        const node = w.nodes[g.node];
        if (!w.capturable(team, g.node)) { this.nextThink = 0; return; }
        const d = this.goTo(w, c, node.core, 1.5 + w.radius(c));
        if (d <= 2 + w.radius(c)) { it.move = { x: 0, z: 0 }; it.interact = true; }
        return;
      }
      case 'fight':
      case 'farm': {
        const t = w.creatures[g.target];
        if (!t || !t.alive || (t.kind === 'wild' && w.time < t.invulnUntil)) { this.nextThink = 0; it.move = { x: 0, z: 0 }; return; }
        this.engage(w, c, t);
        return;
      }
      case 'siege':
      case 'defend':
      case 'idle': {
        const d = this.goTo(w, c, g.pos, g.kind === 'siege' ? 3 + w.radius(c) : 6);
        if (g.kind === 'siege' && d <= 4 + w.radius(c)) {
          it.move = { x: 0, z: 0 };
          it.aimYaw = yawTo(c.pos, g.pos);
          it.basic = true;
          this.useAbilities(w, c, null, d);
        }
        this.combatReflexes(w, c, null);
        return;
      }
    }
  }

  private engage(w: World, c: Creature, t: Creature) {
    const it = c.intent;
    const reach = w.radius(c) + w.radius(t) + (R.formForLevel(c.level) === 0 ? 2 * R.areaScale(c.level) : lin(c).rangedBasic ? lin(c).basicRange : lin(c).basicRange * R.areaScale(c.level)) * 0.9;
    const d = w.dist(c.pos, t.pos);
    it.aimYaw = yawTo(c.pos, t.pos) + this.aimOffset;
    if (d > reach) this.goTo(w, c, { x: t.pos.x, z: t.pos.z }, reach * 0.8);
    else { it.move = { x: 0, z: 0 }; it.basic = true; }
    this.useAbilities(w, c, t, d);
    this.combatReflexes(w, c, t);
  }

  private useAbilities(w: World, c: Creature, t: Creature | null, d: number) {
    const it = c.intent;
    if (R.formForLevel(c.level) === 0) return;
    const scale = R.areaScale(c.level);
    const ready = (s: string) => (c.cd[s] ?? 0) <= w.time;
    const brain = this;
    it.ult = c.level >= 20 && !!abilityInfo(c, 'ult') && ready('ult') && (t?.kind === 'ascendant' || !t);
    lin(c).bot.useAbilities(w, c, t, d, {
      ready, scale, hard: this.difficulty === 'Hard',
      get holdUntil() { return brain.holdUntil; },
      set holdUntil(v: number) { brain.holdUntil = v; },
    });
  }

  private combatReflexes(w: World, c: Creature, _t: Creature | null) {
    // evade when badly hurt and recently hit
    if (c.hp < 0.4 * maxHp(c) && w.time - c.lastDamagedAt < 0.5 && (c.cd.evade ?? 0) <= w.time && w.rng.next() < 0.1) {
      c.intent.evade = true;
    }
  }
}

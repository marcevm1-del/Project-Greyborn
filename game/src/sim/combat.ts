// Damage, weak points, crowd control and death (Spec 01).
import * as R from './rules';
import { stat, econ, T } from './tuning';
import { SPECIES } from './species';
import type { Creature } from './types';
import type { World } from './World';

export type CC = 'stun' | 'stagger' | 'root' | 'slow' | 'airborne';

function angleDiff(a: number, b: number): number {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return Math.abs(d);
}

/** Yaw from `from` to `to` (0 = +z). */
export function yawTo(from: { x: number; z: number }, to: { x: number; z: number }): number {
  return Math.atan2(to.x - from.x, to.z - from.z);
}

/** Is `src` positioned to hit `tgt`'s weak point? (Spec 02 exposure arcs) */
export function weakPointExposed(w: World, src: Creature, tgt: Creature): boolean {
  const fromTarget = yawTo(tgt.pos, src.pos);
  const off = angleDiff(fromTarget, tgt.yaw); // 0 = attacker in front
  if (tgt.kind === 'wild') {
    const sp = SPECIES[tgt.species!];
    return sp.tier !== 'I' && off >= Math.PI - Math.PI / 4; // rear 90°
  }
  if (R.formForLevel(tgt.level) === 0) return off >= Math.PI - Math.PI / 3;
  switch (tgt.lineage) {
    case 'Brawler':
      return w.time < tgt.chestExposedUntil && off <= Math.PI / 4;
    case 'Titan':
    default:
      return off >= Math.PI - Math.PI / 3; // rear 120°
  }
}

export function maxHp(c: Creature): number {
  return c.maxHpOverride ?? stat(c.lineage, 'Health', c.level);
}
export function power(c: Creature): number {
  return c.kind === 'wild' ? 0 : stat(c.lineage, 'Power', c.level);
}
export function control(c: Creature): number {
  return c.kind === 'wild' ? 0 : stat(c.lineage, 'Control', c.level);
}

export function isEnemy(a: Creature, b: Creature): boolean {
  if (a.id === b.id || !b.alive) return false;
  if (a.kind === 'wild' || b.kind === 'wild') return true;
  return a.team !== b.team;
}

export interface DamageOpts {
  weakPoint?: boolean;   // force a weak-point check (true = check exposure)
  dot?: boolean;
}

export function dealDamage(w: World, src: Creature | null, tgt: Creature, raw: number, opts: DamageOpts = {}): number {
  if (!tgt.alive || w.time < tgt.invulnUntil || w.time < tgt.transformUntil || raw <= 0) return 0;
  const now = w.time;
  const reductions: number[] = [];
  if (src) {
    // Bulwark: −60% from the front 120°
    if (now < tgt.bulwarkUntil && angleDiff(yawTo(tgt.pos, src.pos), tgt.yaw) <= Math.PI / 3) reductions.push(0.6);
    // Titan passive Immovable: −10% from lower-Stage enemies
    if (tgt.kind === 'ascendant' && tgt.lineage === 'Titan' && R.formForLevel(tgt.level) >= 1
      && src.kind === 'ascendant' && R.stageForLevel(src.level) < R.stageForLevel(tgt.level)) reductions.push(0.1);
  }
  if (tgt.kind === 'ascendant' && tgt.team !== -1) {
    const hub = w.hubNear(tgt.pos, 12);
    if (hub && w.nodeOwner[hub.node] === tgt.team) reductions.push(econ('Hub ally DR per level') * hub.level);
  }
  let mult = 1;
  let weak = false;
  if (src && opts.weakPoint && !opts.dot && weakPointExposed(w, src, tgt)) {
    weak = true;
    mult *= R.WEAK_POINT_MULT;
  }
  if (now < tgt.weakBrokenUntil) mult *= 1.1;
  const amount = raw * mult * (1 - R.combineReduction(...reductions));
  tgt.hp -= amount;
  tgt.lastDamagedAt = now;
  tgt.lastCombatAt = now;
  if (src) {
    src.lastCombatAt = now;
    tgt.lastAttacker = src.id;
    tgt.assists.set(src.id, now);
    if (src.lineage === 'Brawler' && src.kind === 'ascendant') src.momentum = Math.min(100, src.momentum + 5);
    if (src.kind === 'ascendant' && now < src.ultUntil && src.lineage === 'Brawler') {
      // Frenzy: 20% lifesteal, subject to the healing cap
      heal(w, src, amount * 0.2);
    }
  }
  if (tgt.channel) tgt.channel = null; // channels break on damage
  w.emit({ type: 'hit', source: src?.id ?? -1, target: tgt.id, amount, weak, pos: { ...tgt.pos } });
  if (weak) {
    if (now - tgt.weakLastHit > 8) tgt.weakDamage = 0;
    tgt.weakDamage += amount;
    tgt.weakLastHit = now;
    if (tgt.weakDamage >= R.WEAK_BREAK_SHARE * maxHp(tgt) && now >= tgt.weakBrokenUntil) {
      tgt.weakBrokenUntil = now + [15, 15, 12, 9][R.formForLevel(tgt.level)];
      tgt.weakDamage = 0;
      w.emit({ type: 'weakbreak', id: tgt.id });
    }
  }
  if (tgt.kind === 'wild') w.onWildHit(tgt, src);
  if (tgt.hp <= 0) kill(w, tgt, src);
  return amount;
}

const healWindow = new Map<number, { t: number; amount: number }>();
export function heal(w: World, c: Creature, amount: number) {
  // Healing cap: 5% of max Health per second from all sources
  const cap = 0.05 * maxHp(c);
  const win = healWindow.get(c.id);
  const sec = Math.floor(w.time);
  const used = win && win.t === sec ? win.amount : 0;
  const give = Math.max(0, Math.min(amount, cap - used));
  c.hp = Math.min(maxHp(c), c.hp + give);
  healWindow.set(c.id, { t: sec, amount: used + give });
}

export function applyCC(w: World, src: Creature, tgt: Creature, kind: CC, base: number, slowPct = 0) {
  if (!tgt.alive || w.time < tgt.unstoppableUntil || w.time < tgt.transformUntil) return;
  const hard = kind === 'stun' || kind === 'root';
  if (hard && w.time < tgt.ccImmuneUntil) return;
  const ten = tgt.kind === 'wild' ? (SPECIES[tgt.species!].tier === 'III' ? 0.2 : 0) : R.tenacity(tgt.level);
  const dur = kind === 'airborne' ? base * (1 + control(src) / 200) : R.ccDuration(base, control(src), ten);
  const until = w.time + dur;
  switch (kind) {
    case 'stun': tgt.stunUntil = Math.max(tgt.stunUntil, until); tgt.ccImmuneUntil = until + R.CC_IMMUNITY; break;
    case 'root': tgt.rootUntil = Math.max(tgt.rootUntil, until); tgt.ccImmuneUntil = until + R.CC_IMMUNITY; break;
    case 'stagger': tgt.staggerUntil = Math.max(tgt.staggerUntil, until); break;
    case 'airborne': tgt.airborneUntil = Math.max(tgt.airborneUntil, until); tgt.vel.y = 7; tgt.grounded = false; break;
    case 'slow': tgt.slowUntil = Math.max(tgt.slowUntil, until); tgt.slowPct = Math.max(tgt.slowPct, slowPct); break;
  }
  if (kind !== 'slow') {
    // stagger, stun and airborne interrupt casts and channels
    if (tgt.cast && !(w.time < tgt.unstoppableUntil)) tgt.cast = null;
    tgt.channel = null;
  }
}

export function knockback(w: World, src: { x: number; z: number }, tgt: Creature, distance: number, lift = 3) {
  if (!tgt.alive || w.time < tgt.unstoppableUntil) return;
  if (tgt.kind === 'ascendant' && tgt.lineage === 'Titan' && R.formForLevel(tgt.level) >= 1) return; // Immovable
  const yaw = yawTo(src, tgt.pos);
  // launch speed so the arc travels about `distance` metres
  const airTime = 2 * lift / 25 + 0.25;
  const speed = distance / Math.max(0.3, airTime);
  tgt.vel.x = Math.sin(yaw) * speed;
  tgt.vel.z = Math.cos(yaw) * speed;
  tgt.vel.y = lift;
  tgt.grounded = false;
  tgt.cast = null;
  tgt.channel = null;
}

export function kill(w: World, victim: Creature, killer: Creature | null) {
  victim.alive = false;
  victim.hp = 0;
  victim.cast = null;
  victim.channel = null;
  victim.deaths++;
  w.emit({ type: 'death', id: victim.id, killer: killer?.id ?? null, pos: { ...victim.pos } });
  if (victim.kind === 'wild') {
    w.onWildDeath(victim, killer);
    return;
  }
  if (victim.carried > 0) w.dropCores(victim.pos, victim.carried);
  victim.carried = 0;
  victim.respawnAt = w.time + R.respawnTime(victim.level, w.phase);
  let credit = killer && killer.kind === 'ascendant' ? killer : null;
  if (!credit) {
    // executions: bounty goes to the nearest enemy within 30 m
    credit = w.creatures.filter((c) => c.kind === 'ascendant' && c.alive && c.team !== victim.team
      && w.dist(c.pos, victim.pos) <= 30).sort((a, b) => w.dist(a.pos, victim.pos) - w.dist(b.pos, victim.pos))[0] ?? null;
  }
  if (!credit) return;
  const b = R.bounty(victim.level);
  credit.kills++;
  w.addCores(credit, b, 'kills');
  for (const [id, t] of victim.assists) {
    const a = w.creatures[id];
    if (a && a.id !== credit.id && a.kind === 'ascendant' && a.team === credit.team && w.time - t <= 10) {
      w.addCores(a, b * econ('Assist bounty share'), 'kills');
    }
  }
  victim.assists.clear();
}

export function basicStats(c: Creature): { ratio: number; rate: number; range: number } {
  if (R.formForLevel(c.level) === 0) return { ratio: 1.0, rate: 1.2, range: 2 };
  const b = T.basic[c.lineage];
  const range = c.lineage === 'Brawler' ? 2.5 : 3;
  return { ratio: b.ratio, rate: b.rate, range };
}

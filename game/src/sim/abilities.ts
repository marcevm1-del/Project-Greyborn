// The cast system (Spec 02 / Spec 03): starts casts from intents, runs the shared
// basic attack and Evade, and hands Q / E / R / Ultimate to the lineage module.
import * as R from './rules';
import { ability, ultimateRow } from './tuning';
import { basicStats, dealDamage, power } from './combat';
import { lin } from './lineages/registry';
import { dirOf, lenOf, norm, targetsIn } from './lineages/shared';
import type { Creature, Slot } from './types';
import type { World } from './World';

export interface AbilityInfo { name: string; cd: number; key: string }

/** The Ultimate this creature gets: its branch's (Aggression until a branch is chosen). */
export function ultimateName(c: Creature): string {
  return lin(c).ultimates[c.branch ?? 'Aggression'];
}

export function abilityInfo(c: Creature, slot: Slot | 'ult'): AbilityInfo | null {
  if (c.kind !== 'ascendant' || R.formForLevel(c.level) === 0) return null;
  if (slot === 'ult') {
    if (c.level < 20) return null;
    const u = ultimateRow(c.lineage, ultimateName(c));
    return { name: u.name, cd: u.cd, key: 'T' };
  }
  const a = ability(c.lineage, slot);
  return { name: a.name, cd: a.cd ?? 10, key: slot };
}

export function canAct(w: World, c: Creature): boolean {
  return c.alive && w.time >= c.stunUntil && w.time >= c.airborneUntil && w.time >= c.staggerUntil
    && w.time >= c.transformUntil && c.grabbedBy === null;
}

/** Starts casts from the creature's intent. */
export function tryCasts(w: World, c: Creature) {
  if (c.kind !== 'ascendant' || !canAct(w, c)) return;
  const it = c.intent;
  const now = w.time;
  const busy = c.cast && !c.cast.done;
  if (it.evade && now >= (c.cd.evade ?? 0) && w.time >= c.rootUntil && (!busy || c.cast!.slot === 'basic')) {
    c.cast = { slot: 'evade', t: 0, dir: lenOf(it.move) > 0.1 ? norm(it.move) : dirOf(c.yaw) };
    c.cd.evade = now + 8;
    c.channel = null;
    c.invulnUntil = now + 0.15;
    w.emit({ type: 'evade', id: c.id });
    return;
  }
  if (busy) return;
  const form = R.formForLevel(c.level);
  const def = lin(c);
  const disabledR = now < c.weakBrokenUntil; // broken weak point disables R
  const start = (slot: Slot | 'ult') => {
    const info = abilityInfo(c, slot)!;
    if (now < (c.cd[slot] ?? 0)) return false;
    c.cast = { slot, t: 0, dir: dirOf(it.aimYaw), hit: new Set(), carried: [] };
    c.yaw = it.aimYaw;
    c.channel = null;
    if (slot !== def.chargedSlot) c.cd[slot] = now + info.cd; // a charged ability sets its cooldown on release
    w.emit({ type: 'ability', id: c.id, name: info.name, pos: { ...c.pos }, yaw: c.yaw, radius: 0 });
    return true;
  };
  if (form >= 1) {
    if (it.q && start('Q')) return;
    if (it.e && start('E')) return;
    if (it.r && !disabledR && start('R')) return;
    if (c.level >= 20 && it.ult && start('ult')) return;
  }
  if (it.basic) {
    const bs = basicStats(c);
    const rate = bs.rate * (form >= 1 && def.attackRateMult ? def.attackRateMult(w, c) : 1);
    if (now >= (c.cd.basic ?? 0)) {
      c.cast = { slot: 'basic', t: 0, dir: dirOf(it.aimYaw), hit: new Set() };
      c.yaw = it.aimYaw;
      c.cd.basic = now + 1 / rate;
      c.channel = null;
    }
  }
}

/** Advances the current cast by dt. */
export function updateCast(w: World, c: Creature, dt: number) {
  const cast = c.cast;
  if (!cast) return;
  cast.t += dt;
  const P = power(c);
  const scale = R.areaScale(c.level);
  const r0 = w.radius(c);
  const front = (dist: number) => ({ x: c.pos.x + cast.dir.x * dist, z: c.pos.z + cast.dir.z * dist });

  switch (cast.slot) {
    case 'evade': {
      const nx = c.pos.x + cast.dir.x * (4 / 0.25) * dt;
      const nz = c.pos.z + cast.dir.z * (4 / 0.25) * dt;
      if (w.nav.walkable(nx, nz)) { c.pos.x = nx; c.pos.z = nz; }
      c.yaw = Math.atan2(cast.dir.x, cast.dir.z);
      if (cast.t >= 0.25) c.cast = null;
      return;
    }
    case 'basic': {
      const wind = 0.15;
      if (cast.t >= wind && !cast.done) {
        cast.done = true;
        const bs = basicStats(c);
        const range = bs.range * scale + r0;
        const hits = targetsIn(w, c, c.pos.x, c.pos.z, range, c.yaw, Math.PI * 0.4);
        hits.sort((a, b) => w.dist(a.pos, c.pos) - w.dist(b.pos, c.pos));
        w.emit({ type: 'swing', id: c.id, pos: { ...c.pos }, yaw: c.yaw });
        const target = hits[0];
        if (target) dealDamage(w, c, target, bs.ratio * P, { weakPoint: true });
        else w.hitStructures(c, front(range * 0.7), bs.range * scale * 0.8 + 2, bs.ratio * P);
      }
      if (cast.t >= 0.3) c.cast = null;
      return;
    }
    case 'ult':
      lin(c).ult(w, c, cast, ultimateName(c), dt);
      return;
  }
  const row = ability(c.lineage, cast.slot as Slot);
  const dmg = row.base !== null ? R.abilityDamage(row.base, row.ratio!, P) : 0;
  lin(c).cast(w, c, cast, { P, scale, r0, now: w.time, dmg, end: () => { c.cast = null; }, front }, dt);
}

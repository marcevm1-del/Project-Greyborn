// Abilities (Spec 02 / Spec 03). Numbers come from the tuning data; this file
// holds the behaviour: wind-ups, shapes, crowd control and movement.
import * as R from './rules';
import { ability, T } from './tuning';
import { applyCC, basicStats, dealDamage, isEnemy, knockback, power, yawTo } from './combat';
import type { Creature, Slot } from './types';
import type { World } from './World';

export interface AbilityInfo { name: string; cd: number; key: string }

/** Ultimate used by each lineage in this build (M1: one per lineage). */
export const ULTIMATE: Record<string, string> = { Titan: 'Avalanche', Brawler: 'Frenzy' };

function ultRow(lineage: string) {
  const list = (T as unknown as { ultimates: Record<string, { name: string; base: number | null; ratio: number | null; cd: number }[]> }).ultimates;
  return list[lineage].find((u) => u.name === ULTIMATE[lineage])!;
}

export function abilityInfo(c: Creature, slot: Slot | 'ult'): AbilityInfo | null {
  if (c.kind !== 'ascendant' || R.formForLevel(c.level) === 0) return null;
  if (slot === 'ult') {
    if (c.level < 20) return null;
    const u = ultRow(c.lineage);
    return { name: u.name, cd: u.cd, key: 'T' };
  }
  const a = ability(c.lineage, slot);
  let cd = a.cd ?? 10;
  return { name: a.name, cd, key: slot };
}

export function canAct(w: World, c: Creature): boolean {
  return c.alive && w.time >= c.stunUntil && w.time >= c.airborneUntil && w.time >= c.staggerUntil
    && w.time >= c.transformUntil && c.grabbedBy === null;
}

function dirOf(yaw: number) {
  return { x: Math.sin(yaw), z: Math.cos(yaw) };
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
  const disabledR = now < c.weakBrokenUntil; // broken weak point disables R
  const start = (slot: Slot | 'ult') => {
    const info = abilityInfo(c, slot)!;
    if (now < (c.cd[slot] ?? 0)) return false;
    c.cast = { slot, t: 0, dir: dirOf(it.aimYaw), hit: new Set(), carried: [] };
    c.yaw = it.aimYaw;
    c.channel = null;
    if (slot !== 'E' || c.lineage !== 'Brawler') c.cd[slot] = now + info.cd; // Haymaker sets its cooldown on release
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
    const rate = bs.rate * (c.lineage === 'Brawler' && c.momentum >= 100 && form >= 1 ? 1.15 : 1)
      * (now < c.ultUntil && c.lineage === 'Brawler' ? 1.4 : 1);
    if (now >= (c.cd.basic ?? 0)) {
      c.cast = { slot: 'basic', t: 0, dir: dirOf(it.aimYaw), hit: new Set() };
      c.yaw = it.aimYaw;
      c.cd.basic = now + 1 / rate;
      c.channel = null;
    }
  }
}

function lenOf(v: { x: number; z: number }) { return Math.hypot(v.x, v.z); }
function norm(v: { x: number; z: number }) { const l = lenOf(v) || 1; return { x: v.x / l, z: v.z / l }; }

/** Targets in a cone or circle around a point. */
function targetsIn(w: World, c: Creature, cx: number, cz: number, radius: number, yaw: number | null, halfAngle: number) {
  return w.creatures.filter((t) => {
    if (!isEnemy(c, t) || w.time < t.invulnUntil) return false;
    const d = Math.hypot(t.pos.x - cx, t.pos.z - cz) - w.radius(t);
    if (d > radius) return false;
    if (yaw === null) return true;
    let a = yawTo({ x: cx, z: cz }, t.pos) - yaw;
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return Math.abs(a) <= halfAngle || d < 0.3;
  });
}

/** Moves the caster along its committed direction (dashes, charges, rolls). */
function dash(w: World, c: Creature, speed: number, dt: number) {
  const nx = c.pos.x + c.cast!.dir.x * speed * dt;
  const nz = c.pos.z + c.cast!.dir.z * speed * dt;
  if (w.nav.walkable(nx, nz)) { c.pos.x = nx; c.pos.z = nz; }
  c.yaw = Math.atan2(c.cast!.dir.x, c.cast!.dir.z);
}

/** Advances the current cast by dt. */
export function updateCast(w: World, c: Creature, dt: number) {
  const cast = c.cast;
  if (!cast) return;
  cast.t += dt;
  const P = power(c);
  const scale = R.areaScale(c.level);
  const r0 = w.radius(c);
  const now = w.time;
  const end = () => { c.cast = null; };
  const front = (dist: number) => ({ x: c.pos.x + cast.dir.x * dist, z: c.pos.z + cast.dir.z * dist });

  switch (cast.slot) {
    case 'evade': {
      dash(w, c, 4 / 0.25, dt);
      if (cast.t >= 0.25) end();
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
      if (cast.t >= 0.3) end();
      return;
    }
    case 'ult':
      return updateUlt(w, c, dt);
  }
  // ---- lineage abilities
  const row = ability(c.lineage, cast.slot as Slot);
  const dmg = row.base !== null ? R.abilityDamage(row.base, row.ratio!, P) : 0;
  if (c.lineage === 'Titan') {
    if (cast.slot === 'Q') { // Quake Slam: 0.5 s wind-up, radius 5 m, stagger 0.8 s
      const radius = 5 * scale * (c.level >= 5 ? 1.2 : 1);
      if (!cast.done && cast.t < 0.05) w.emit({ type: 'telegraph', id: c.id, pos: { ...c.pos }, radius, time: 0.5 });
      if (cast.t >= 0.5 && !cast.done) {
        cast.done = true;
        w.emit({ type: 'ability', id: c.id, name: 'Quake Slam impact', pos: { ...c.pos }, yaw: c.yaw, radius });
        for (const t of targetsIn(w, c, c.pos.x, c.pos.z, radius, null, 0)) {
          dealDamage(w, c, t, dmg, { weakPoint: true });
          applyCC(w, c, t, 'stagger', 0.8);
        }
        w.hitStructures(c, c.pos, radius, dmg);
      }
      if (cast.t >= 0.75) end();
    } else if (cast.slot === 'E') { // Bulwark: 3 s, −60% from the front, slowed 30%
      c.bulwarkUntil = now + 3;
      end();
    } else { // Rampart Charge: 0.3 s wind-up, 1.0 s unstoppable charge 12 m, carries up to 2
      const len = 12 * scale;
      if (cast.t < 0.3) return;
      c.unstoppableUntil = now + 0.1;
      if (cast.t <= 1.3) {
        dash(w, c, len / 1.0, dt);
        for (const t of targetsIn(w, c, c.pos.x, c.pos.z, r0 + 1, null, 0)) {
          if (cast.carried!.length < 2 && !cast.carried!.includes(t.id) && !(t.kind === 'ascendant' && t.lineage === 'Titan')) cast.carried!.push(t.id);
        }
        for (const id of cast.carried!) {
          const t = w.creatures[id];
          if (t.alive) { t.pos.x = c.pos.x + cast.dir.x * (r0 + w.radius(t)); t.pos.z = c.pos.z + cast.dir.z * (r0 + w.radius(t)); t.cast = null; t.channel = null; }
        }
      } else {
        for (const t of targetsIn(w, c, c.pos.x, c.pos.z, r0 + 2.5, null, 0)) {
          dealDamage(w, c, t, dmg, { weakPoint: true });
          applyCC(w, c, t, 'stagger', 0.3);
        }
        w.hitStructures(c, front(r0 + 1), r0 + 2.5, dmg);
        end();
      }
    }
    return;
  }
  if (c.lineage === 'Brawler') {
    if (cast.slot === 'Q') { // Roll Commit: 8 m in 0.6 s, unstoppable, uppercut stagger 0.5
      c.unstoppableUntil = now + 0.1;
      if (cast.t <= 0.6) { dash(w, c, (8 * scale) / 0.6, dt); return; }
      for (const t of targetsIn(w, c, c.pos.x, c.pos.z, 2.5 * scale + r0, c.yaw, Math.PI / 3)) {
        dealDamage(w, c, t, dmg, { weakPoint: true });
        applyCC(w, c, t, 'stagger', 0.5);
      }
      w.hitStructures(c, front(r0 + 1), 3 * scale, dmg);
      c.chestExposedUntil = now + 1.0;
      w.emit({ type: 'ability', id: c.id, name: 'Uppercut', pos: { ...c.pos }, yaw: c.yaw, radius: 2.5 * scale });
      end();
    } else if (cast.slot === 'E') { // Haymaker: hold to charge 0.3–1.5 s (1.3 s at L5)
      const full = c.level >= 5 ? 1.3 : 1.5;
      const held = c.intent.e && cast.t < full;
      c.yaw = c.intent.aimYaw;
      cast.dir = dirOf(c.yaw);
      if (held || cast.t < 0.3) return;
      const k = Math.min(1, (cast.t - 0.3) / (full - 0.3));
      const amount = (50 + 0.6 * P) + ((120 + 1.4 * P) - (50 + 0.6 * P)) * k;
      for (const t of targetsIn(w, c, c.pos.x, c.pos.z, 3 * scale + r0, c.yaw, Math.PI / 4)) {
        dealDamage(w, c, t, amount, { weakPoint: true });
        if (k >= 0.99) knockback(w, c.pos, t, 6 * scale);
      }
      w.hitStructures(c, front(r0 + 1.5), 3 * scale, amount);
      w.emit({ type: 'ability', id: c.id, name: k >= 0.99 ? 'Haymaker (full)' : 'Haymaker', pos: { ...c.pos }, yaw: c.yaw, radius: 3 * scale });
      c.cd.E = now + (ability('Brawler', 'E').cd ?? 9);
      end();
    } else { // Grapple: grab a lower-Stage target within 3 m, hold 0.6 s, throw 8 m
      if (cast.carried!.length === 0) {
        const cands = targetsIn(w, c, c.pos.x, c.pos.z, 3 * scale + r0, c.yaw, Math.PI / 3)
          .filter((t) => (t.kind === 'wild' || R.stageForLevel(t.level) < R.stageForLevel(c.level) || R.formForLevel(t.level) < R.formForLevel(c.level))
            && !(t.kind === 'ascendant' && t.lineage === 'Titan' && R.formForLevel(t.level) >= 1));
        if (!cands.length) { if (cast.t > 0.2) { c.cd.R = now + 2; end(); } return; }
        const t = cands[0];
        cast.carried!.push(t.id);
        t.grabbedBy = c.id;
        t.cast = null;
        t.channel = null;
        dealDamage(w, c, t, dmg);
      }
      const t = w.creatures[cast.carried![0]];
      if (!t.alive) { end(); return; }
      if (cast.t < 0.6) {
        t.pos.x = c.pos.x + Math.sin(c.yaw) * (r0 + 0.5); t.pos.z = c.pos.z + Math.cos(c.yaw) * (r0 + 0.5);
        t.pos.y = c.pos.y + R.FORM_HEIGHT[R.formForLevel(c.level)] * 0.6;
        c.yaw = c.intent.aimYaw;
        return;
      }
      t.grabbedBy = null;
      const yaw = c.yaw;
      const dist = 8 * scale;
      t.vel.x = Math.sin(yaw) * dist / 0.8; t.vel.z = Math.cos(yaw) * dist / 0.8; t.vel.y = 6; t.grounded = false;
      t.landingBy = c.id; // +40 damage on landing (Spec 02)
      end();
    }
  }
}

function updateUlt(w: World, c: Creature, dt: number) {
  const cast = c.cast!;
  const u = ultRow(c.lineage);
  const P = power(c);
  if (c.lineage === 'Brawler') { // Frenzy: 8 s, +40% attack speed, 20% lifesteal
    c.ultUntil = w.time + 8;
    w.emit({ type: 'ability', id: c.id, name: 'Frenzy', pos: { ...c.pos }, yaw: c.yaw, radius: 4 });
    c.cast = null;
    return;
  }
  // Titan Avalanche: 3 s unstoppable roll along a 30 m line
  c.unstoppableUntil = w.time + 0.1;
  dash(w, c, 30 / 3, dt);
  for (const t of targetsIn(w, c, c.pos.x, c.pos.z, w.radius(c) + 1.5, null, 0)) {
    if (cast.hit!.has(t.id)) continue;
    cast.hit!.add(t.id);
    dealDamage(w, c, t, (u.base ?? 100) + (u.ratio ?? 1) * P);
    knockback(w, c.pos, t, 5);
  }
  w.hitStructures(c, c.pos, w.radius(c) + 2, 0, 600 + 3 * P, cast.hit!);
  if (cast.t >= 3) c.cast = null;
}

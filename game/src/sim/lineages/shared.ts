// Helpers shared by every lineage module: directions, area queries and dashes.
import { isEnemy, yawTo } from '../combat';
import type { Creature } from '../types';
import type { World } from '../World';
import type { Vec2 } from '../map';

export function dirOf(yaw: number) {
  return { x: Math.sin(yaw), z: Math.cos(yaw) };
}
export function lenOf(v: { x: number; z: number }) { return Math.hypot(v.x, v.z); }
export function norm(v: { x: number; z: number }) { const l = lenOf(v) || 1; return { x: v.x / l, z: v.z / l }; }

/** Enemies of `c` in a cone (yaw, halfAngle) or circle (yaw = null) around a point. */
export function targetsIn(w: World, c: Creature, cx: number, cz: number, radius: number, yaw: number | null, halfAngle: number) {
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
export function dash(w: World, c: Creature, speed: number, dt: number) {
  const nx = c.pos.x + c.cast!.dir.x * speed * dt;
  const nz = c.pos.z + c.cast!.dir.z * speed * dt;
  if (w.nav.walkable(nx, nz)) { c.pos.x = nx; c.pos.z = nz; }
  c.yaw = Math.atan2(c.cast!.dir.x, c.cast!.dir.z);
}

/** Angle between two yaws, 0..π. */
export function angleDiff(a: number, b: number): number {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return Math.abs(d);
}

/** Where a ground-targeted ability lands (Version B: no cursor): the nearest enemy within 25° of
 *  the aim and in range, Ascendants first; otherwise 60% of the range straight ahead. */
export function groundTarget(w: World, c: Creature, range: number): Vec2 {
  const yaw = c.cast ? Math.atan2(c.cast.dir.x, c.cast.dir.z) : c.yaw;
  const near = targetsIn(w, c, c.pos.x, c.pos.z, range, yaw, (25 * Math.PI) / 180)
    .sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'ascendant' ? -1 : 1) || w.dist(a.pos, c.pos) - w.dist(b.pos, c.pos));
  if (near.length) return { x: near[0].pos.x, z: near[0].pos.z };
  const d = dirOf(yaw);
  return { x: c.pos.x + d.x * range * 0.6, z: c.pos.z + d.z * range * 0.6 };
}

/** Drags `t` up to `step` metres toward `to` (Collapse, Event Horizon). Immovable and unstoppable targets hold. */
export function pull(w: World, t: Creature, to: Vec2, step: number) {
  if (w.time < t.unstoppableUntil || w.isImmovable(t, true)) return;
  const dx = to.x - t.pos.x, dz = to.z - t.pos.z;
  const d = Math.hypot(dx, dz);
  if (d < 0.5) return;
  const k = Math.min(step, d - 0.5) / d;
  const nx = t.pos.x + dx * k, nz = t.pos.z + dz * k;
  if (w.nav.walkable(nx, nz)) { t.pos.x = nx; t.pos.z = nz; }
  t.channel = null;
}

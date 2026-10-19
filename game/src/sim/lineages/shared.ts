// Helpers shared by every lineage module: directions, area queries and dashes.
import { isEnemy, yawTo } from '../combat';
import type { Creature } from '../types';
import type { World } from '../World';

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

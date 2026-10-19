// Ground effects placed by abilities: zones (Void Rift, Void Garden, Thornstorm,
// Entangle thorns) and walls (Bramble Wall). Zones apply their effect every tick;
// damage-over-time zones deal damage in 0.5 s pulses. Walls block movement and
// can be broken.
import { applyCC, dealDamage, isEnemy } from './combat';
import type { Team, Vec2 } from './map';
import type { Creature } from './types';
import type { World } from './World';

export type ZoneKind = 'rift' | 'garden' | 'thornstorm' | 'thorns';

export interface Zone {
  id: number;
  kind: ZoneKind;
  team: Team;
  owner: number;          // creature that made it
  pos: Vec2;
  r: number;
  start: number;
  until: number;
  follow?: boolean;       // moves with its owner (Thornstorm)
  dps?: number;           // damage per second to enemies inside
  slow?: number;          // slow fraction applied to enemies inside
  controlLoss?: number;   // Control reduction for enemies inside
  rootedOnly?: boolean;   // damage only enemies that are rooted (Entangle thorns)
  nextPulse: number;
}

export interface Wall {
  id: number;
  team: Team;
  owner: number;
  a: Vec2;
  b: Vec2;
  hp: number;
  max: number;
  start: number;          // grows in over `grow` seconds; blocks once grown
  grow: number;
  until: number;
  touchDps?: number;      // damage per second to enemies touching it
}

export function inZone(z: Zone, p: Vec2): boolean {
  return Math.hypot(p.x - z.pos.x, p.z - z.pos.z) <= z.r;
}

/** Closest point on segment ab to p. */
export function closestOnSegment(p: Vec2, a: Vec2, b: Vec2): Vec2 {
  const dx = b.x - a.x, dz = b.z - a.z;
  const l2 = dx * dx + dz * dz || 1;
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.z - a.z) * dz) / l2));
  return { x: a.x + dx * t, z: a.z + dz * t };
}

/** Is `c` an enemy of the team that owns a field? */
function enemyOfTeam(c: Creature, team: Team): boolean {
  return c.alive && (c.kind === 'wild' || c.team !== team);
}

/** Advances zones and walls by one tick. */
export function updateFields(w: World, dt: number) {
  const now = w.time;
  w.zones = w.zones.filter((z) => now < z.until);
  w.walls = w.walls.filter((wl) => now < wl.until && wl.hp > 0);
  for (const c of w.creatures) if (c.controlLoss && now >= c.controlLossUntil) c.controlLoss = 0;
  for (const z of w.zones) {
    const owner = w.creatures[z.owner];
    if (z.follow) {
      if (!owner.alive) { z.until = now; continue; }
      z.pos = { x: owner.pos.x, z: owner.pos.z };
    }
    if (now < z.start) continue;
    const pulse = z.dps && now >= z.nextPulse;
    if (pulse) z.nextPulse = now + 0.5;
    for (const c of w.creatures) {
      if (!enemyOfTeam(c, z.team) || !inZone(z, c.pos)) continue;
      if (z.slow) applyCC(w, owner, c, 'slow', 0.25, z.slow);
      if (z.controlLoss) {
        c.controlLoss = Math.max(c.controlLoss, z.controlLoss);
        c.controlLossUntil = now + 0.25;
      }
      if (pulse && (!z.rootedOnly || now < c.rootUntil) && isEnemy(owner, c)) dealDamage(w, owner, c, z.dps! * 0.5, { dot: true });
    }
  }
  for (const wl of w.walls) {
    if (!wl.touchDps || now < wl.start + wl.grow) continue;
    const owner = w.creatures[wl.owner];
    for (const c of w.creatures) {
      if (!enemyOfTeam(c, wl.team)) continue;
      const q = closestOnSegment(c.pos, wl.a, wl.b);
      if (Math.hypot(c.pos.x - q.x, c.pos.z - q.z) <= w.radius(c) + 0.8) dealDamage(w, owner, c, wl.touchDps * dt, { dot: true });
    }
  }
}

/** Pushes a creature out of every grown wall it overlaps (walls block movement). */
export function blockByWalls(w: World, c: Creature) {
  for (const wl of w.walls) {
    if (w.time < wl.start + wl.grow) continue;
    const q = closestOnSegment(c.pos, wl.a, wl.b);
    const dx = c.pos.x - q.x, dz = c.pos.z - q.z;
    const d = Math.hypot(dx, dz);
    const min = w.radius(c) * 0.8 + 0.6;
    if (d < min) {
      const nx = d > 1e-4 ? dx / d : -(wl.b.z - wl.a.z), nz = d > 1e-4 ? dz / d : (wl.b.x - wl.a.x);
      const nl = Math.hypot(nx, nz) || 1;
      c.pos.x = q.x + (nx / nl) * min;
      c.pos.z = q.z + (nz / nl) * min;
    }
  }
}

/** Damages enemy walls within `radius` of `pos` (attacks that hit nothing else). */
export function hitWalls(w: World, c: Creature, pos: Vec2, radius: number, dmg: number) {
  if (c.kind !== 'ascendant') return;
  for (const wl of w.walls) {
    if (wl.team === c.team) continue;
    const q = closestOnSegment(pos, wl.a, wl.b);
    if (Math.hypot(pos.x - q.x, pos.z - q.z) <= radius) wl.hp -= dmg;
  }
}

/** Zones of a kind and team that cover a point. */
export function zonesAt(w: World, p: Vec2, kind: ZoneKind, team?: Team): Zone[] {
  return w.zones.filter((z) => z.kind === kind && (team === undefined || z.team === team) && w.time >= z.start && inZone(z, p));
}

/** Does a grown wall cross the segment from `a` to `b`? Returns it (projectiles hit walls). */
export function wallBetween(w: World, a: Vec2, b: Vec2, team: Team): Wall | null {
  const cross = (o: Vec2, p: Vec2, q: Vec2) => (p.x - o.x) * (q.z - o.z) - (p.z - o.z) * (q.x - o.x);
  for (const wl of w.walls) {
    if (wl.team === team || w.time < wl.start + wl.grow) continue;
    const d1 = cross(a, b, wl.a), d2 = cross(a, b, wl.b), d3 = cross(wl.a, wl.b, a), d4 = cross(wl.a, wl.b, b);
    if (d1 * d2 < 0 && d3 * d4 < 0) return wl;
  }
  return null;
}

export function addZone(w: World, z: Omit<Zone, 'id' | 'nextPulse'>): Zone {
  const zone: Zone = { ...z, id: w.nextFieldId++, nextPulse: z.start };
  w.zones.push(zone);
  return zone;
}

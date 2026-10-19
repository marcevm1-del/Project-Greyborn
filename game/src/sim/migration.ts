// The Grey Migration (audit D-06, design-bible/08 "The Grey Migration"): Ashfall
// Crossing's one map event. At 6:00 the herds flow north → south along a 20 m road
// at x = 0 for 60 s. Anyone on the road takes 40 damage/s and is pushed off it; the
// Ash Knoll in the centre becomes an island. A 20 s warning comes first.
import * as R from './rules';
import { econ } from './tuning';
import { dealDamage } from './combat';
import type { Vec2 } from './map';
import type { Creature } from './types';
import type { World } from './World';

export type MigrationState = 'none' | 'warning' | 'active';

const ROAD_HALF_WIDTH = 10;
const KNOLL_RADIUS = 14;
const WARNING = 20;
const PUSH = 6;       // m/s off the road
const PUSH_HEAVY = 3; // Stage 3 Titans

export function migrationWindow(): { start: number; end: number } {
  const start = econ('Grey Migration time');
  return { start, end: start + econ('Grey Migration duration') };
}

export function migrationState(w: World): MigrationState {
  const { start, end } = migrationWindow();
  if (w.time >= start && w.time < end) return 'active';
  if (w.time >= start - WARNING && w.time < start) return 'warning';
  return 'none';
}

/** Is this point on the Migration road (and not on the Knoll island)? */
export function onRoad(p: Vec2): boolean {
  return Math.abs(p.x) < ROAD_HALF_WIDTH && Math.hypot(p.x, p.z) > KNOLL_RADIUS;
}

/** Runs every tick: announces the event and, while it lasts, hurts and pushes creatures on the road. */
export function updateMigration(w: World, dt: number) {
  const state = migrationState(w);
  if (state !== w.migration) {
    w.migration = state;
    w.emit({ type: 'migration', state });
  }
  if (state !== 'active') return;
  for (const c of w.creatures) {
    if (!c.alive || !c.grounded || !onRoad(c.pos)) continue;
    dealDamage(w, null, c, econ('Grey Migration damage') * dt, { dot: true });
    if (!c.alive) continue;
    const heavy = w.isImmovable(c, true) && R.formForLevel(c.level) >= 3;
    pushOff(w, c, (heavy ? PUSH_HEAVY : PUSH) * dt);
  }
}

/** Pushes south and away from the road's centre line (south-east or south-west). */
function pushOff(w: World, c: Creature, step: number) {
  const side = c.pos.x >= 0 ? 1 : -1;
  const nx = c.pos.x + side * step * 0.8, nz = c.pos.z + step * 0.6;
  if (w.nav.walkable(nx, nz)) { c.pos.x = nx; c.pos.z = nz; }
  else if (w.nav.walkable(nx, c.pos.z)) c.pos.x = nx;
}

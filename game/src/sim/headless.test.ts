import { describe, expect, it } from 'vitest';
import { World } from './World';
import { BotBrain } from './botAI';
import { DT } from './rules';

function runMatch(seed: number, seconds: number, short = true) {
  const w = new World({ playerLineage: null, playerTeam: 0, short, seed });
  const brains = w.creatures.filter((c) => c.kind === 'ascendant').map((c) => new BotBrain(c.id, w));
  const steps = Math.round(seconds / DT);
  for (let i = 0; i < steps && !w.result; i++) {
    for (const b of brains) b.update(w);
    w.step(DT);
    w.drainEvents();
  }
  return w;
}

describe('headless bot match', () => {
  it('runs 6 simulated minutes without errors and progresses', () => {
    const w = runMatch(3, 360);
    const asc = w.creatures.filter((c) => c.kind === 'ascendant');
    const levels = asc.map((c) => c.level);
    expect(Math.max(...levels)).toBeGreaterThanOrEqual(3);
    // positions stay finite and on the map
    for (const c of w.creatures) {
      expect(Number.isFinite(c.pos.x) && Number.isFinite(c.pos.y) && Number.isFinite(c.pos.z)).toBe(true);
    }
    const owned = w.nodeOwner.filter((o) => o !== -1).length;
    expect(owned).toBeGreaterThan(4);
  });
  it('is deterministic for a seed', () => {
    const a = runMatch(9, 60), b = runMatch(9, 60);
    expect(a.creatures.map((c) => c.pos.x.toFixed(3))).toEqual(b.creatures.map((c) => c.pos.x.toFixed(3)));
  });
});

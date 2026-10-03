import { describe, expect, it } from 'vitest';
import { World } from './World';
import { BotBrain } from './botAI';
import { DT } from './rules';

// One full short match with 8 bots: guards simulation cost and progression against regressions.
describe('full bot match', () => {
  it('stays within the simulation budget and progresses', () => {
    const w = new World({ playerLineage: null, playerTeam: 0, short: true, seed: 6 });
    const brains = w.creatures.filter((c) => c.kind === 'ascendant').map((c) => new BotBrain(c.id, w));
    const times: number[] = [];
    let n = 0;
    const t0 = performance.now();
    while (!w.result) {
      const a = performance.now();
      for (const b of brains) b.update(w);
      w.step(DT);
      w.drainEvents();
      if (n++ > 300) times.push(performance.now() - a);
    }
    const avg = (performance.now() - t0) / n;
    const levels = w.creatures.filter((c) => c.kind === 'ascendant').map((c) => c.level);
    expect(w.result).not.toBeNull();
    expect(avg).toBeLessThan(2);          // budget: 2 ms per 30 Hz tick
    times.sort((x, y) => x - y);
    const p99 = times[Math.floor(times.length * 0.99)];
    expect(p99).toBeLessThan(8);          // stutter budget: 99% of ticks under 8 ms (max is noisy under CPU load)
    expect(Math.max(...levels)).toBeGreaterThanOrEqual(15);
    expect(levels.filter((l) => l <= 3).length).toBeLessThanOrEqual(2); // nobody stuck at awakening
  });
});

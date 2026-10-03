import { it } from 'vitest';
import { writeFileSync } from 'fs';
import { World } from './World';
import { BotBrain } from './botAI';
import { DT } from './rules';
it('bench', () => {
  const out: string[] = [];
  for (const seed of [1, 2, 3, 4, 5, 6]) {
    const w = new World({ playerLineage: null, playerTeam: 0, short: true, seed });
    const brains = w.creatures.filter((c) => c.kind === 'ascendant').map((c) => new BotBrain(c.id, w));
    let worst = 0, n = 0; const t0 = performance.now(); let firstL20 = -1, firstS2 = -1;
    while (!w.result && w.time < 760) {
      const a = performance.now();
      for (const b of brains) b.update(w);
      w.step(DT); w.drainEvents();
      if (n > 300) worst = Math.max(worst, performance.now() - a); n++;
      const mx = Math.max(...w.creatures.filter((c) => c.kind === 'ascendant').map((c) => c.level));
      if (mx >= 10 && firstS2 < 0) firstS2 = w.time; if (mx >= 20 && firstL20 < 0) firstL20 = w.time;
    }
    const lv = w.creatures.filter((c) => c.kind === 'ascendant').map((c) => c.level);
    out.push(`seed ${seed}: avg ${((performance.now() - t0) / n).toFixed(3)} ms, worst ${worst.toFixed(2)} ms, ${w.result?.how} at ${Math.round(w.result?.time ?? 0)}s, firstS2 ${Math.round(firstS2)} firstL20 ${Math.round(firstL20)}, levels ${lv}`);
  }
  writeFileSync('/tmp/claude-0/-home-user-Project-Greyborn/752d3419-2453-55ad-bd2c-e7dc3059c633/scratchpad/bench.txt', out.join('\n'));
});

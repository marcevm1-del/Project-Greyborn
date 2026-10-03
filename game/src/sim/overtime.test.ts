import { describe, expect, it } from 'vitest';
import { World } from './World';

describe('time limit and overtime (Spec 05 §10)', () => {
  it('a clear territory lead wins at the time limit', () => {
    const w = new World({ playerLineage: null, playerTeam: 0, short: true, seed: 1 });
    const n = w.nodes.find((x) => x.hub === null && w.nodeOwner[x.id] === -1)!;
    w.setOwner(n.id, 0, true);
    w.time = w.timeLimit - 0.01;
    w.step();
    expect(w.result?.winner).toBe(0);
    expect(w.result?.how).toContain('Time limit');
  });
  it('a tie goes to overtime, and the first root wins', () => {
    const w = new World({ playerLineage: null, playerTeam: 0, short: true, seed: 1 });
    w.time = w.timeLimit - 0.01;
    w.step();
    expect(w.result).toBeNull();
    expect(w.overtime).toBe(true);
    // a team-1 Ascendant roots a neutral node next to its territory
    const c = w.creatures.find((x) => x.kind === 'ascendant' && x.team === 1)!;
    const node = w.nodes.find((x) => w.capturable(1, x.id) && w.nodeOwner[x.id] === -1)!;
    c.pos.x = node.core.x; c.pos.z = node.core.z;
    c.intent.interact = true;
    for (let i = 0; i < 30 * 6 && !w.result; i++) { c.intent.interact = true; c.intent.move = { x: 0, z: 0 }; w.step(); }
    expect(w.result?.winner).toBe(1);
    expect(w.result?.how).toBe('Overtime capture');
  });
});

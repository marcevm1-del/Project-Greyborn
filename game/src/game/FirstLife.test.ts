import { describe, expect, it } from 'vitest';
import * as R from '../sim/rules';
import { World } from '../sim/World';
import { FirstLife } from './FirstLife';

describe('First Life', () => {
  it('walks through move → hunt → awaken → root → pickup → convert → grow', () => {
    const w = new World({ playerLineage: 'Verdant', playerTeam: 0, short: true, seed: 7, difficulty: 'Easy' });
    const me = w.player!;
    const fl = new FirstLife(w);
    const tick = (s = 1) => { for (let i = 0; i < Math.round(s / R.DT); i++) { w.step(R.DT); fl.onEvents(w.drainEvents()); fl.update(); } };
    expect(fl.update().text).toContain('Move');
    me.pos.x += 13;
    fl.update();
    expect(fl.step).toBe('hunt');
    expect(fl.update().marker).not.toBeNull();
    const wild = w.creatures.filter((c) => c.kind === 'wild').slice(0, 3);
    fl.onEvents(wild.map((c) => ({ type: 'death' as const, id: c.id, killer: me.id, pos: { ...c.pos } })));
    fl.update();
    expect(fl.step).toBe('awaken');
    tick(4);
    expect(me.level).toBeGreaterThanOrEqual(3);
    expect(fl.step).toBe('root');
    const marker = fl.update().marker!;
    const node = w.nodes.find((n) => n.core === marker)!;
    expect(w.capturable(0, node.id)).toBe(true);
    fl.onEvents([{ type: 'capture', node: node.id, team: 0, by: me.id }]);
    fl.update();
    expect(fl.step).toBe('pickup');
    expect(w.pickups.length).toBeGreaterThan(0);
    me.carried = 150;
    fl.update();
    expect(fl.step).toBe('convert');
    fl.onEvents([{ type: 'convert', id: me.id, exp: 100, field: false }]);
    tick(4.5);
    expect(fl.done).toBe(true);
  });
});

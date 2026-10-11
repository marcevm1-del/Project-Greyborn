import { describe, expect, it } from 'vitest';
import { buildNodes, buildObstacles, buildCamps, GRID_W, GRID_H, cellCenter } from './map';
import { heightAt } from './terrain';

describe('Ashfall Crossing layout', () => {
  const nodes = buildNodes();
  it('covers all 240 cells exactly once', () => {
    const cells = nodes.flatMap((n) => n.cells);
    expect(cells.length).toBe(GRID_W * GRID_H);
    expect(new Set(cells).size).toBe(240);
  });
  it('has five 6-cell Hubs', () => {
    const hubs = nodes.filter((n) => n.hub !== null);
    expect(hubs.length).toBe(5);
    hubs.forEach((h) => expect(h.cells.length).toBe(6));
  });
  it('is mirror-symmetric', () => {
    const west = nodes.filter((n) => n.core.x < -1).length;
    const east = nodes.filter((n) => n.core.x > 1).length;
    expect(west).toBe(east);
    expect(heightAt(-37.3, 12.1)).toBeCloseTo(heightAt(37.3, 12.1), 6);
    const obs = buildObstacles();
    expect(obs.filter((o) => o.x < 0).length).toBe(obs.filter((o) => o.x > 0).length);
    expect(buildCamps().filter((c) => c.pos.x < 0).length).toBe(buildCamps().filter((c) => c.pos.x > 0).length);
  });
  it('every node is connected to the graph', () => {
    nodes.forEach((n) => expect(n.neighbours.length).toBeGreaterThan(0));
    expect(cellCenter(0).x).toBeLessThan(0);
  });
  it('node sizes stay within 1–8 cells', () => {
    nodes.filter((n) => n.hub === null).forEach((n) => {
      expect(n.cells.length).toBeGreaterThanOrEqual(1);
      expect(n.cells.length).toBeLessThanOrEqual(8);
    });
  });
});

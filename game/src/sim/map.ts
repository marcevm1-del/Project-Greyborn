// Ashfall Crossing layout: bases, Hubs, Enemy Cores, territory cells and nodes,
// wildlife camps and static obstacles. Deterministic and mirror-symmetric.
import { heightAt, valueNoise, HALF_W, HALF_D, MAP_W, MAP_D } from './terrain';

export type Team = 0 | 1; // 0 = west, 1 = east

export interface Vec2 { x: number; z: number }

export const GRID_W = 20;
export const GRID_H = 12;
export const CELL_W = MAP_W / GRID_W; // 14 m
export const CELL_D = MAP_D / GRID_H; // 15 m

export interface NodeDef {
  id: number;
  cells: number[];
  core: Vec2;
  hub: number | null;   // index into HUBS when this node is a Resource Hub
  neighbours: number[];
}

export interface Obstacle { x: number; z: number; r: number; kind: 'rock' | 'shard' | 'root' }

export const BASES: Vec2[] = [{ x: -122, z: 0 }, { x: 122, z: 0 }];

export const HUBS: Vec2[] = [
  { x: -82, z: -46 }, { x: -82, z: 46 }, { x: 0, z: 0 }, { x: 82, z: -46 }, { x: 82, z: 46 },
];

/** Enemy Core sites per team (team 1 mirrors team 0). */
export const CORE_SITES: Vec2[][] = [
  [{ x: -104, z: -30 }, { x: -100, z: 34 }, { x: -64, z: -8 }],
  [{ x: 104, z: -30 }, { x: 100, z: 34 }, { x: 64, z: -8 }],
];

export function cellIndex(cx: number, cz: number): number {
  return cz * GRID_W + cx;
}
export function cellCenter(i: number): Vec2 {
  const cx = i % GRID_W, cz = Math.floor(i / GRID_W);
  return { x: -HALF_W + (cx + 0.5) * CELL_W, z: -HALF_D + (cz + 0.5) * CELL_D };
}
export function cellAt(x: number, z: number): number {
  const cx = Math.max(0, Math.min(GRID_W - 1, Math.floor((x + HALF_W) / CELL_W)));
  const cz = Math.max(0, Math.min(GRID_H - 1, Math.floor((z + HALF_D) / CELL_D)));
  return cellIndex(cx, cz);
}

function dist2(a: Vec2, b: Vec2): number {
  return (a.x - b.x) ** 2 + (a.z - b.z) ** 2;
}

/** Builds the node graph: Hubs take their 6 nearest cells, the rest are split by
 *  Voronoi among mirrored node seeds. */
export function buildNodes(): NodeDef[] {
  const total = GRID_W * GRID_H;
  const owner = new Array<number>(total).fill(-1);
  const nodes: NodeDef[] = [];
  HUBS.forEach((h, hi) => {
    const cells = [...Array(total).keys()]
      .filter((c) => owner[c] === -1)
      .sort((a, b) => dist2(cellCenter(a), h) - dist2(cellCenter(b), h))
      .slice(0, 6);
    const id = nodes.length;
    cells.forEach((c) => (owner[c] = id));
    nodes.push({ id, cells, core: { ...h }, hub: hi, neighbours: [] });
  });
  // mirrored seeds on the west half, every ~2 columns x 2 rows, jittered
  const seeds: Vec2[] = [];
  for (let cz = 0; cz < GRID_H; cz += 2) {
    for (let cx = 0; cx < GRID_W / 2; cx += 2) {
      const c = cellCenter(cellIndex(cx, cz));
      const jx = (valueNoise(cx * 3.1, cz * 1.7, 5) - 0.5) * CELL_W;
      const jz = (valueNoise(cx * 1.3, cz * 2.9, 9) - 0.5) * CELL_D;
      seeds.push({ x: Math.min(-CELL_W * 0.5, c.x + CELL_W * 0.5 + jx), z: c.z + CELL_D * 0.5 + jz });
    }
  }
  const mirrored = [...seeds, ...seeds.map((s) => ({ x: -s.x, z: s.z }))];
  const seedNode = mirrored.map(() => -1);
  for (let c = 0; c < total; c++) {
    if (owner[c] !== -1) continue;
    const cc = cellCenter(c);
    let best = 0, bd = Infinity;
    mirrored.forEach((s, si) => {
      // tie-break on the side so the split stays mirrored
      const d = dist2(cc, s) + (Math.sign(s.x) === Math.sign(cc.x) ? 0 : 1e-6);
      if (d < bd) { bd = d; best = si; }
    });
    if (seedNode[best] === -1) {
      seedNode[best] = nodes.length;
      nodes.push({ id: nodes.length, cells: [], core: { x: 0, z: 0 }, hub: null, neighbours: [] });
    }
    owner[c] = seedNode[best];
  }
  for (let c = 0; c < total; c++) {
    if (nodes[owner[c]].hub === null) nodes[owner[c]].cells.push(c);
  }
  for (const n of nodes) {
    if (n.hub !== null) continue;
    // node core: the node's cell centre closest to the cells' centroid
    const cx = n.cells.reduce((s, c) => s + cellCenter(c).x, 0) / n.cells.length;
    const cz = n.cells.reduce((s, c) => s + cellCenter(c).z, 0) / n.cells.length;
    const near = n.cells.map(cellCenter).sort((a, b) => dist2(a, { x: cx, z: cz }) - dist2(b, { x: cx, z: cz }))[0];
    n.core = { x: (near.x + cx) / 2, z: (near.z + cz) / 2 };
  }
  // adjacency between nodes through 4-neighbour cells
  for (let c = 0; c < total; c++) {
    const cx = c % GRID_W, cz = Math.floor(c / GRID_W);
    for (const [dx, dz] of [[1, 0], [0, 1]]) {
      const nx = cx + dx, nz = cz + dz;
      if (nx >= GRID_W || nz >= GRID_H) continue;
      const a = owner[c], b = owner[cellIndex(nx, nz)];
      if (a !== b) {
        if (!nodes[a].neighbours.includes(b)) nodes[a].neighbours.push(b);
        if (!nodes[b].neighbours.includes(a)) nodes[b].neighbours.push(a);
      }
    }
  }
  return nodes;
}

export function cellOwnerTable(nodes: NodeDef[]): number[] {
  const t = new Array<number>(GRID_W * GRID_H).fill(-1);
  nodes.forEach((n) => n.cells.forEach((c) => (t[c] = n.id)));
  return t;
}

/** Static obstacles: boulders on the steppe, meteor shards in the crater, roots on the knot. */
export function buildObstacles(): Obstacle[] {
  const out: Obstacle[] = [];
  const keepClear = [...BASES, ...HUBS, ...CORE_SITES.flat()];
  for (let i = 0; i < 70; i++) {
    const x = -HALF_W + 12 + valueNoise(i * 7.31, 1.7, 21) * (HALF_W - 14);
    const z = -HALF_D + 18 + valueNoise(3.3, i * 5.17, 23) * (HALF_D * 2 - 36);
    const r = 1.2 + valueNoise(i * 2.2, i * 1.1, 29) * 2.6;
    if (keepClear.some((k) => dist2(k, { x, z }) < 18 * 18)) continue;
    const kind: Obstacle['kind'] = dist2({ x, z }, { x: 0, z: -62 }) < 26 * 26 ? 'shard'
      : dist2({ x, z }, { x: 0, z: 66 }) < 24 * 24 ? 'root' : 'rock';
    out.push({ x, z, r, kind }, { x: -x, z, r, kind });
  }
  // shard field in Shardfall Hollow (mirrored)
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI + 0.2;
    const x = Math.cos(a) * (6 + (i % 3) * 5);
    const z = -62 + Math.sin(a) * (5 + (i % 2) * 6) - 4;
    out.push({ x: Math.abs(x) + 2, z, r: 1.4, kind: 'shard' }, { x: -Math.abs(x) - 2, z, r: 1.4, kind: 'shard' });
  }
  return out;
}

export interface CampDef { id: number; pos: Vec2; species: string }

/** Wildlife camps for Ashfall Crossing (gdd/16): mirrored per half, plus the centre. */
export function buildCamps(): CampDef[] {
  const west: [number, number, string][] = [
    [-108, -62, 'Gravel Skink'], [-92, 62, 'Gravel Skink'], [-58, 30, 'Spurlark'], [-42, -40, 'Glimmerfox'],
    [-70, -70, 'Ashfang'], [-50, 62, 'Mossback Grazer'], [-30, 12, 'Clashhorn Beetles'], [-112, 50, 'Glimmerfox'],
    [-40, -12, 'Stonehide Ox'],
  ];
  const camps: CampDef[] = [];
  for (const [x, z, s] of west) {
    camps.push({ id: camps.length, pos: { x, z }, species: s });
    camps.push({ id: camps.length, pos: { x: -x, z }, species: s });
  }
  camps.push({ id: camps.length, pos: { x: 0, z: -50 }, species: 'Gravel Skink' });
  camps.push({ id: camps.length, pos: { x: 0, z: 46 }, species: 'Mossback Grazer' });
  return camps;
}

export function groundY(p: Vec2): number {
  return heightAt(p.x, p.z);
}

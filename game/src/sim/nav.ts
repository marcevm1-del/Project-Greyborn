// Navigation grid (2 m cells) with A* and line-of-sight path smoothing.
// Blocked cells: obstacles, steep slopes and the map edge.
import { heightAt, HALF_W, HALF_D } from './terrain';
import type { Obstacle, Vec2 } from './map';

export const NAV_CELL = 2;
const NW = Math.round((HALF_W * 2) / NAV_CELL);
const ND = Math.round((HALF_D * 2) / NAV_CELL);
export const MAX_STEP = 1.5; // max height change between neighbouring 2 m cells (~37°)

export class NavGrid {
  readonly blocked: Uint8Array;
  readonly w = NW;
  readonly d = ND;

  constructor(obstacles: Obstacle[]) {
    this.blocked = new Uint8Array(NW * ND);
    const h = new Float32Array(NW * ND);
    for (let j = 0; j < ND; j++) for (let i = 0; i < NW; i++) {
      const p = this.center(i, j);
      h[j * NW + i] = heightAt(p.x, p.z);
    }
    for (let j = 0; j < ND; j++) for (let i = 0; i < NW; i++) {
      const k = j * NW + i;
      if (i < 2 || j < 2 || i >= NW - 2 || j >= ND - 2) { this.blocked[k] = 1; continue; }
      const steep = Math.abs(h[k] - h[k + 1]) > MAX_STEP || Math.abs(h[k] - h[k - 1]) > MAX_STEP
        || Math.abs(h[k] - h[k + NW]) > MAX_STEP || Math.abs(h[k] - h[k - NW]) > MAX_STEP;
      if (steep) this.blocked[k] = 1;
    }
    for (const o of obstacles) {
      const r = o.r + 0.6;
      const [i0, j0] = this.cellOf(o.x - r, o.z - r);
      const [i1, j1] = this.cellOf(o.x + r, o.z + r);
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
        const c = this.center(i, j);
        if ((c.x - o.x) ** 2 + (c.z - o.z) ** 2 <= r * r) this.blocked[j * NW + i] = 1;
      }
    }
  }

  center(i: number, j: number): Vec2 {
    return { x: -HALF_W + (i + 0.5) * NAV_CELL, z: -HALF_D + (j + 0.5) * NAV_CELL };
  }
  cellOf(x: number, z: number): [number, number] {
    return [
      Math.max(0, Math.min(NW - 1, Math.floor((x + HALF_W) / NAV_CELL))),
      Math.max(0, Math.min(ND - 1, Math.floor((z + HALF_D) / NAV_CELL))),
    ];
  }
  walkable(x: number, z: number): boolean {
    const [i, j] = this.cellOf(x, z);
    return !this.blocked[j * NW + i];
  }
  /** Straight-line walkability, sampled every metre. */
  clearLine(a: Vec2, b: Vec2): boolean {
    const len = Math.hypot(b.x - a.x, b.z - a.z);
    const n = Math.ceil(len);
    for (let s = 1; s < n; s++) {
      const t = s / n;
      if (!this.walkable(a.x + (b.x - a.x) * t, a.z + (b.z - a.z) * t)) return false;
    }
    return true;
  }

  private nearestOpen(i: number, j: number): [number, number] {
    if (!this.blocked[j * NW + i]) return [i, j];
    for (let r = 1; r < 12; r++) for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) {
      const a = i + di, b = j + dj;
      if (a >= 0 && b >= 0 && a < NW && b < ND && !this.blocked[b * NW + a]) return [a, b];
    }
    return [i, j];
  }

  /** A* path from a to b as smoothed waypoints (excludes the start). Empty if unreachable. */
  findPath(a: Vec2, b: Vec2, maxExpand = 3500): Vec2[] {
    if (this.clearLine(a, b)) return [b];
    const [si, sj] = this.nearestOpen(...this.cellOf(a.x, a.z));
    const [gi, gj] = this.nearestOpen(...this.cellOf(b.x, b.z));
    const start = sj * NW + si, goal = gj * NW + gi;
    const g = new Map<number, number>([[start, 0]]);
    const from = new Map<number, number>();
    const heap: [number, number][] = [[0, start]];
    const hfn = (k: number) => {
      const dx = Math.abs((k % NW) - gi), dz = Math.abs(Math.floor(k / NW) - gj);
      return Math.max(dx, dz) + 0.414 * Math.min(dx, dz);
    };
    const closed = new Set<number>();
    let expanded = 0;
    while (heap.length && expanded < maxExpand) {
      const [, cur] = heapPop(heap);
      if (cur === goal) break;
      if (closed.has(cur)) continue;
      closed.add(cur);
      expanded++;
      const ci = cur % NW, cj = Math.floor(cur / NW);
      for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
        if (!di && !dj) continue;
        const ni = ci + di, nj = cj + dj;
        if (ni < 0 || nj < 0 || ni >= NW || nj >= ND) continue;
        const nk = nj * NW + ni;
        if (this.blocked[nk]) continue;
        if (di && dj && (this.blocked[cj * NW + ni] || this.blocked[nj * NW + ci])) continue;
        const cost = (g.get(cur) ?? 0) + (di && dj ? 1.414 : 1);
        if (cost < (g.get(nk) ?? Infinity)) {
          g.set(nk, cost);
          from.set(nk, cur);
          heapPush(heap, [cost + hfn(nk), nk]);
        }
      }
    }
    if (!from.has(goal) && start !== goal) return [];
    const cells: Vec2[] = [];
    for (let k = goal; k !== start; k = from.get(k)!) cells.push(this.center(k % NW, Math.floor(k / NW)));
    cells.reverse();
    cells[cells.length - 1] = b;
    // string-pulling: keep only waypoints needed for line of sight
    const out: Vec2[] = [];
    let anchor = a;
    for (let i = 0; i < cells.length; i++) {
      if (i === cells.length - 1 || !this.clearLine(anchor, cells[i + 1])) {
        out.push(cells[i]);
        anchor = cells[i];
      }
    }
    return out;
  }
}

function heapPush(h: [number, number][], v: [number, number]) {
  h.push(v);
  let i = h.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (h[p][0] <= h[i][0]) break;
    [h[p], h[i]] = [h[i], h[p]];
    i = p;
  }
}
function heapPop(h: [number, number][]): [number, number] {
  const top = h[0];
  const last = h.pop()!;
  if (h.length) {
    h[0] = last;
    let i = 0;
    for (;;) {
      const l = i * 2 + 1, r = l + 1;
      let m = i;
      if (l < h.length && h[l][0] < h[m][0]) m = l;
      if (r < h.length && h[r][0] < h[m][0]) m = r;
      if (m === i) break;
      [h[m], h[i]] = [h[i], h[m]];
      i = m;
    }
  }
  return top;
}

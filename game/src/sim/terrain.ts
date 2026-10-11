// Deterministic heightfield for Ashfall Crossing (gdd/16). Pure functions, shared
// by simulation (movement, line of sight) and rendering (mesh generation).
// The map is mirror-symmetric across x = 0 so neither side has an advantage.

export const MAP_W = 280; // x: -140 .. 140 (west base to east base)
export const MAP_D = 180; // z: -90 .. 90 (north to south)
export const HALF_W = MAP_W / 2;
export const HALF_D = MAP_D / 2;

function hash(ix: number, iz: number, seed: number): number {
  let h = (ix * 374761393 + iz * 668265263 + seed * 2246822519) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

/** Value noise in [0, 1]. */
export function valueNoise(x: number, z: number, seed = 1): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = smooth(x - ix), fz = smooth(z - iz);
  const a = hash(ix, iz, seed), b = hash(ix + 1, iz, seed);
  const c = hash(ix, iz + 1, seed), d = hash(ix + 1, iz + 1, seed);
  return a + (b - a) * fx + (c - a) * fz + (a - b - c + d) * fx * fz;
}

export function fbm(x: number, z: number, octaves = 4, seed = 1): number {
  let sum = 0, amp = 0.5, freq = 1, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise(x * freq, z * freq, seed + i * 17);
    norm += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum / norm;
}

function bump(x: number, z: number, cx: number, cz: number, r: number): number {
  const d2 = ((x - cx) ** 2 + (z - cz) ** 2) / (r * r);
  return d2 >= 1 ? 0 : (1 - d2) ** 2;
}

function rawHeight(x: number, z: number): number {
  // rolling steppe
  let h = (fbm(x / 38, z / 38, 4, 7) - 0.5) * 7;
  h += (fbm(x / 9, z / 9, 2, 3) - 0.5) * 0.8;
  // ridges along the north and south edges keep play inside the map
  const edge = Math.max(0, (Math.abs(z) - 70) / 20);
  h += edge * edge * 16 + edge * (fbm(x / 14, z / 14, 3, 11)) * 8;
  const side = Math.max(0, (Math.abs(x) - 128) / 12);
  h += side * side * 12;
  // central Hub on a low ash knoll
  h += bump(x, z, 0, 0, 26) * 4.5;
  // Shardfall Hollow: crater in the north centre
  h -= bump(x, z, 0, -62, 22) * 7;
  h += Math.max(0, bump(x, z, 0, -62, 27) - bump(x, z, 0, -62, 20)) * 5; // crater rim
  // Old Root Knot: a twisted root-hill in the south centre
  h += bump(x, z, 0, 66, 20) * 8;
  // sheltered hollows at the bases
  h -= bump(Math.abs(x), z, 122, 0, 22) * 3;
  // side Hubs sit on gentle rises
  h += bump(Math.abs(x), Math.abs(z), 82, 46, 14) * 2;
  return h;
}

/** Terrain height at (x, z). Symmetric across x = 0. */
export function heightAt(x: number, z: number): number {
  return (rawHeight(x, z) + rawHeight(-x, z)) * 0.5;
}

/** Surface normal by central differences (unnormalised components are fine for slope tests). */
export function normalAt(x: number, z: number): [number, number, number] {
  const e = 0.5;
  const dx = heightAt(x + e, z) - heightAt(x - e, z);
  const dz = heightAt(x, z + e) - heightAt(x, z - e);
  const nx = -dx, ny = 2 * e, nz = -dz;
  const len = Math.hypot(nx, ny, nz);
  return [nx / len, ny / len, nz / len];
}

export function inBounds(x: number, z: number, margin = 0): boolean {
  return Math.abs(x) <= HALF_W - margin && Math.abs(z) <= HALF_D - margin;
}

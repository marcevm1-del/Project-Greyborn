// Building blocks for procedural creature rigs: materials per side, parts, limbs
// and a shared geometry cache. Used by CreatureView and the lineage model builders.
import * as THREE from 'three';

export interface Skin { body: THREE.Material; armour: THREE.Material; glow: THREE.Material; eye: THREE.Material; dark: THREE.Material }

/** A rig is a set of named pivots the animator drives. All sizes are for a 1 m tall body; the root is scaled. */
export interface Rig {
  root: THREE.Group;     // positioned and yawed in the world
  body: THREE.Group;     // bob / lean
  head?: THREE.Object3D;
  legs: THREE.Object3D[];       // swing around x
  arms: THREE.Object3D[];
  weak?: THREE.Mesh;
  height: number;
  gait: 'biped' | 'knuckle' | 'quad' | 'hexapod' | 'float';
}

export function part(geo: THREE.BufferGeometry, mat: THREE.Material, outline: THREE.Material | null, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  if (outline) {
    const o = new THREE.Mesh(geo, outline);
    o.scale.setScalar(1.08);
    o.castShadow = false;
    o.raycast = () => {};
    m.add(o);
  }
  return m;
}

// geometry cache: creatures share geometry; only materials and transforms differ
const geoCache = new Map<string, THREE.BufferGeometry>();
function cached(key: string, make: () => THREE.BufferGeometry) {
  let g = geoCache.get(key);
  if (!g) { g = make(); geoCache.set(key, g); }
  return g;
}
export const G = {
  box: (w: number, h: number, d: number) => cached(`b${w},${h},${d}`, () => new THREE.BoxGeometry(w, h, d)),
  ball: (r: number, d = 1) => cached(`s${r},${d}`, () => new THREE.IcosahedronGeometry(r, d)),
  cap: (r: number, l: number) => cached(`c${r},${l}`, () => new THREE.CapsuleGeometry(r, l, 3, 8)),
  torus: (r: number, t: number) => cached(`t${r},${t}`, () => new THREE.TorusGeometry(r, t, 6, 12)),
  cone: (r: number, h: number, s = 5) => cached(`k${r},${h},${s}`, () => new THREE.ConeGeometry(r, h, s)),
};

export function limb(geo: THREE.BufferGeometry, mat: THREE.Material, outline: THREE.Material | null, x: number, y: number, z: number, len: number): THREE.Group {
  const pivot = new THREE.Group();
  pivot.position.set(x, y, z);
  const m = part(geo, mat, outline, 0, -len / 2, 0);
  pivot.add(m);
  return pivot;
}


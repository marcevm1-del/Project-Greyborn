// Procedural creature models and animation. Every Ascendant is built from a
// part hierarchy per lineage and form (gdd/14), skinned per side: Wildborn =
// moss, stone and bark with amber inner light; Blightborn = black glass with
// cyan light. A back-face outline marks friend (gold) or foe (red).
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as R from '../sim/rules';
import { SPECIES } from '../sim/species';
import type { Creature, Side } from '../sim/types';
import { PALETTE } from './Scene';

interface Skin { body: THREE.Material; armour: THREE.Material; glow: THREE.Material; eye: THREE.Material; dark: THREE.Material }

/** Friend / foe colours, shown as a rim light on every creature (gdd/14: "outline = friend or foe"). */
export const TEAM_RIM = { friend: new THREE.Color(PALETTE.friend), foe: new THREE.Color(PALETTE.foe) };
export function setTeamColors(friend: number, foe: number) { TEAM_RIM.friend.set(friend); TEAM_RIM.foe.set(foe); }

function withRim<T extends THREE.MeshStandardMaterial>(m: T, rim: THREE.Color, strength: number): T {
  m.onBeforeCompile = (shader) => {
    shader.uniforms.rimColor = { value: rim };
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 rimColor;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        float rimF = 1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0);
        totalEmissiveRadiance += rimColor * pow(rimF, 2.5) * ${strength.toFixed(2)};`);
  };
  m.customProgramCacheKey = () => `rim${strength}`;
  return m;
}

const skinCache = new Map<string, Skin>();
function skins(side: Side, friendly: boolean): Skin {
  const key = `${side}${friendly}`;
  const hit = skinCache.get(key);
  if (hit) return hit;
  const rim = friendly ? TEAM_RIM.friend : TEAM_RIM.foe;
  const sk: Skin = side === 'Wildborn' ? {
    body: withRim(new THREE.MeshStandardMaterial({ color: 0xa8a396, roughness: 0.85, flatShading: true }), rim, 0.9),
    armour: withRim(new THREE.MeshStandardMaterial({ color: 0x7d8b5f, roughness: 0.9, flatShading: true }), rim, 0.9),
    glow: new THREE.MeshStandardMaterial({ color: 0x3a2508, emissive: PALETTE.amber, emissiveIntensity: 1.6, roughness: 0.4 }),
    eye: new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffb84a, emissiveIntensity: 2.2 }),
    dark: withRim(new THREE.MeshStandardMaterial({ color: 0x5c4733, roughness: 0.95, flatShading: true }), rim, 0.9),
  } : {
    body: withRim(new THREE.MeshStandardMaterial({ color: 0x8a8e98, roughness: 0.45, metalness: 0.1, flatShading: true }), rim, 0.9),
    armour: withRim(new THREE.MeshStandardMaterial({ color: 0x2a3142, roughness: 0.15, metalness: 0.3, flatShading: true, emissive: 0x0b2a33, emissiveIntensity: 0.6 }), rim, 0.9),
    glow: new THREE.MeshStandardMaterial({ color: 0x062a30, emissive: PALETTE.cyan, emissiveIntensity: 1.8, roughness: 0.2 }),
    eye: new THREE.MeshStandardMaterial({ color: 0x000000, emissive: PALETTE.violet, emissiveIntensity: 2.5 }),
    dark: withRim(new THREE.MeshStandardMaterial({ color: 0x1d2230, roughness: 0.2, metalness: 0.3, flatShading: true }), rim, 0.9),
  };
  skinCache.set(key, sk);
  return sk;
}

/** A rig is a set of named pivots the animator drives. All sizes are for a 1 m tall body; the root is scaled. */
interface Rig {
  root: THREE.Group;     // positioned and yawed in the world
  body: THREE.Group;     // bob / lean
  head?: THREE.Object3D;
  legs: THREE.Object3D[];       // swing around x
  arms: THREE.Object3D[];
  weak?: THREE.Mesh;
  height: number;
  gait: 'biped' | 'knuckle' | 'quad' | 'hexapod';
}

function part(geo: THREE.BufferGeometry, mat: THREE.Material, outline: THREE.Material | null, x = 0, y = 0, z = 0): THREE.Mesh {
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
const G = {
  box: (w: number, h: number, d: number) => cached(`b${w},${h},${d}`, () => new THREE.BoxGeometry(w, h, d)),
  ball: (r: number, d = 1) => cached(`s${r},${d}`, () => new THREE.IcosahedronGeometry(r, d)),
  cap: (r: number, l: number) => cached(`c${r},${l}`, () => new THREE.CapsuleGeometry(r, l, 3, 8)),
  cone: (r: number, h: number, s = 5) => cached(`k${r},${h},${s}`, () => new THREE.ConeGeometry(r, h, s)),
};

function limb(geo: THREE.BufferGeometry, mat: THREE.Material, outline: THREE.Material | null, x: number, y: number, z: number, len: number): THREE.Group {
  const pivot = new THREE.Group();
  pivot.position.set(x, y, z);
  const m = part(geo, mat, outline, 0, -len / 2, 0);
  pivot.add(m);
  return pivot;
}

/** Builds an Ascendant for a lineage and form. */
function buildAscendant(lineage: string, form: number, sk: Skin, outline: THREE.Material | null): Rig {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  const legs: THREE.Object3D[] = [];
  const arms: THREE.Object3D[] = [];
  let head: THREE.Object3D;
  let weak: THREE.Mesh | undefined;

  if (form === 0) {
    // Kith Base Form: small grey humanoid, moss-flecked, glowing eyes
    const torso = part(G.cap(0.16, 0.28), sk.body, outline, 0, 0.62, 0);
    body.add(torso);
    head = part(G.ball(0.15, 1), sk.body, outline, 0, 0.98, 0.02);
    head.add(part(G.ball(0.03, 0), sk.eye, null, -0.06, 0.02, 0.12), part(G.ball(0.03, 0), sk.eye, null, 0.06, 0.02, 0.12));
    body.add(head);
    for (const s of [-1, 1]) {
      const leg = limb(G.cap(0.06, 0.32), sk.body, outline, s * 0.09, 0.46, 0, 0.42);
      legs.push(leg); root.add(leg);
      const arm = limb(G.cap(0.05, 0.3), sk.body, outline, s * 0.24, 0.8, 0, 0.38);
      arms.push(arm); body.add(arm);
    }
    weak = part(G.ball(0.06, 0), sk.glow, null, 0, 0.72, -0.15);
    body.add(weak);
    return { root, body, head, legs, arms, weak, height: 1, gait: 'biped' };
  }

  const detail = form; // 1..3 adds growths
  if (lineage === 'Titan') {
    // hunched stone colossus; amber/cyan crystal ridge along the spine (weak point)
    const torso = part(G.ball(0.38, 1), sk.armour, outline, 0, 0.58, 0);
    torso.scale.set(1.25, 0.95, 1.1);
    body.add(torso);
    const belly = part(G.ball(0.28, 1), sk.body, null, 0, 0.45, 0.12);
    body.add(belly);
    head = part(G.box(0.24, 0.2, 0.26), sk.armour, outline, 0, 0.66, 0.38);
    head.add(part(G.ball(0.035, 0), sk.eye, null, -0.06, 0.0, 0.14), part(G.ball(0.035, 0), sk.eye, null, 0.06, 0.0, 0.14));
    body.add(head);
    weak = new THREE.Mesh();
    const ridge = new THREE.Group();
    for (let i = 0; i < 3 + detail; i++) {
      const c = part(G.cone(0.07 + detail * 0.01, 0.28 + detail * 0.05, 4), sk.glow, null, 0, 0.9 - i * 0.035, -0.05 - i * 0.09);
      c.rotation.x = -0.5;
      ridge.add(c);
    }
    weak = ridge.children[0] as THREE.Mesh;
    body.add(ridge);
    for (const s of [-1, 1]) {
      const arm = limb(G.cap(0.11, 0.42), sk.armour, outline, s * 0.42, 0.72, 0.12, 0.6);
      arm.add(part(G.ball(0.13, 0), sk.body, outline, 0, -0.62, 0));
      arms.push(arm); body.add(arm);
      const leg = limb(G.cap(0.12, 0.2), sk.armour, outline, s * 0.22, 0.34, -0.12, 0.32);
      legs.push(leg); root.add(leg);
      // shoulder plates and (Stage 2+) moss / glass growths
      const plate = part(G.box(0.3, 0.12, 0.3), sk.armour, outline, s * 0.36, 0.92, 0.05);
      plate.rotation.z = s * 0.4;
      body.add(plate);
      if (detail >= 2) {
        const growth = part(sk.armour === sk.dark ? G.cone(0.05, 0.3) : G.cone(0.06, 0.32, 4), sk.dark, null, s * 0.38, 1.05, 0.0);
        body.add(growth);
      }
      if (detail >= 3) {
        // Stage 3: small trees (Wildborn) or glass spires (Blightborn) on the shoulders
        const tree = part(G.cone(0.12, 0.42, 6), sk.armour, null, s * 0.36, 1.25, -0.05);
        body.add(tree);
      }
    }
    return { root, body, head, legs, arms, weak, height: 1, gait: 'knuckle' };
  }

  // Brawler: long-armed, knuckle-walking beast, chest plate is the weak point
  const torso = part(G.ball(0.3, 1), sk.body, outline, 0, 0.62, 0.02);
  torso.scale.set(1.05, 1.1, 0.95);
  body.add(torso);
  const chest = part(G.box(0.3, 0.26, 0.08), sk.armour, null, 0, 0.62, 0.28);
  body.add(chest);
  weak = part(G.ball(0.07, 0), sk.glow, null, 0, 0.64, 0.33);
  body.add(weak);
  head = part(G.ball(0.15, 1), sk.body, outline, 0, 0.9, 0.18);
  head.add(part(G.ball(0.03, 0), sk.eye, null, -0.05, 0.02, 0.13), part(G.ball(0.03, 0), sk.eye, null, 0.05, 0.02, 0.13));
  body.add(head);
  for (const s of [-1, 1]) {
    const arm = limb(G.cap(0.08, 0.48), sk.body, outline, s * 0.32, 0.8, 0.1, 0.66);
    const fist = part(G.ball(0.12 + detail * 0.012, 0), sk.armour, outline, 0, -0.7, 0);
    arm.add(fist);
    arms.push(arm); body.add(arm);
    const leg = limb(G.cap(0.08, 0.22), sk.body, outline, s * 0.16, 0.36, -0.08, 0.34);
    legs.push(leg); root.add(leg);
    if (detail >= 2) {
      for (let i = 0; i < 2; i++) {
        const spike = part(G.cone(0.04, 0.2, 4), sk.armour, null, s * 0.08, 0.86 - i * 0.12, -0.24);
        spike.rotation.x = -0.9;
        body.add(spike);
      }
    }
  }
  return { root, body, head, legs, arms, weak, height: 1, gait: 'knuckle' };
}

/** Wildlife models by body plan. */
function buildWild(species: string): Rig {
  const sp = SPECIES[species];
  const col = new THREE.MeshStandardMaterial({ color: sp.color, roughness: 0.9, flatShading: true });
  const dark = new THREE.MeshStandardMaterial({ color: new THREE.Color(sp.color).multiplyScalar(0.55), roughness: 0.9, flatShading: true });
  const eye = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xfff0c0, emissiveIntensity: 0.8 });
  const o = null;
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  const legs: THREE.Object3D[] = [];
  let head: THREE.Object3D;
  if (sp.body === 'biped') {
    const torso = part(G.ball(0.22, 1), col, o, 0, 0.62, 0); torso.scale.set(0.9, 0.9, 1.2); body.add(torso);
    head = part(G.ball(0.12, 1), col, o, 0, 0.86, 0.22); body.add(head);
    head.add(part(G.cone(0.04, 0.16, 4), dark, null, 0, 0, 0.14).rotateX(Math.PI / 2));
    for (const s of [-1, 1]) { const l = limb(G.cap(0.035, 0.36), dark, o, s * 0.08, 0.5, 0, 0.5); legs.push(l); root.add(l); }
    return { root, body, head, legs, arms: [], height: 1, gait: 'biped' };
  }
  const long = sp.body === 'insect' ? 1.0 : 1.25;
  const torso = part(G.ball(0.3, 1), col, o, 0, 0.55, 0); torso.scale.set(0.8, 0.7, long * 1.2); body.add(torso);
  head = part(G.ball(0.17, 1), col, o, 0, 0.62, 0.42 * long); body.add(head);
  head.add(part(G.ball(0.025, 0), eye, null, -0.07, 0.04, 0.13), part(G.ball(0.025, 0), eye, null, 0.07, 0.04, 0.13));
  if (species === 'Stonehide Ox' || species === 'Clashhorn Beetles') {
    for (const s of [-1, 1]) { const h = part(G.cone(0.04, 0.3, 5), dark, null, s * 0.1, 0.12, 0.08); h.rotation.x = 1.0; h.rotation.z = -s * 0.5; head.add(h); }
  }
  if (species === 'Mossback Grazer') {
    const moss = part(G.ball(0.26, 1), new THREE.MeshStandardMaterial({ color: 0x4f6a35, roughness: 1, flatShading: true }), null, 0, 0.78, -0.05);
    moss.scale.set(0.9, 0.5, 1.2); body.add(moss);
  }
  const pairs = sp.body === 'hexapod' || sp.body === 'insect' ? 3 : 2;
  for (let i = 0; i < pairs; i++) {
    const z = pairs === 2 ? (i === 0 ? 0.25 : -0.25) * long : (1 - i) * 0.25 * long;
    for (const s of [-1, 1]) {
      const l = limb(G.cap(0.045, 0.3), dark, o, s * (sp.body === 'insect' ? 0.26 : 0.16), 0.42, z, 0.42);
      if (sp.body === 'insect') l.rotation.z = s * 0.5;
      legs.push(l); root.add(l);
    }
  }
  return { root, body, head, legs, arms: [], height: 1, gait: pairs === 3 ? 'hexapod' : 'quad' };
}

const mergeCache = new Map<string, THREE.BufferGeometry>();

/** Merges every static part under each animated pivot into one mesh per material
 *  (≈60 draw calls per creature down to ≈15). The weak point stays separate so it can pulse. */
function compactRig(rig: Rig) {
  const pivots: THREE.Object3D[] = [rig.body, ...rig.legs, ...rig.arms];
  const pivotSet = new Set(pivots);
  for (const pivot of pivots) {
    const groups = new Map<THREE.Material, { geos: THREE.BufferGeometry[]; key: string[]; outline: boolean }>();
    const remove: THREE.Mesh[] = [];
    pivot.updateMatrixWorld(true);
    const inv = new THREE.Matrix4().copy(pivot.matrixWorld).invert();
    const visit = (o: THREE.Object3D) => {
      for (const child of o.children) {
        if (pivotSet.has(child)) continue;          // animated sub-pivot: merged on its own
        if (child === rig.weak) continue;
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          const mat = m.material as THREE.Material;
          const rel = new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld);
          let g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
          for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal') g.deleteAttribute(k);
          g = g.applyMatrix4(rel);
          const entry = groups.get(mat) ?? { geos: [], key: [], outline: (mat as THREE.MeshBasicMaterial).side === THREE.BackSide };
          entry.geos.push(g);
          entry.key.push(m.geometry.uuid + rel.elements.map((e) => e.toFixed(3)).join(','));
          groups.set(mat, entry);
          remove.push(m);
        }
        visit(child);
      }
    };
    visit(pivot);
    if (remove.length < 2) continue;
    // keep sub-pivots and the weak point attached to the pivot before removing merged parts
    for (const m of remove) {
      for (const ch of [...m.children]) if (pivotSet.has(ch) || ch === rig.weak) pivot.attach(ch);
    }
    for (const m of remove) m.removeFromParent();
    for (const [mat, e] of groups) {
      const key = e.key.join('|');
      let geo = mergeCache.get(key);
      if (!geo) { geo = mergeGeometries(e.geos)!; mergeCache.set(key, geo); }
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = !e.outline;
      pivot.add(mesh);
    }
  }
}

export class CreatureView {
  readonly root = new THREE.Group();
  private rig: Rig;
  private form = -1;
  private phase = 0;
  private displayScale = 1;
  private hurtFlash = 0;
  private deathT = 0;
  private attackT = 0;
  private attackKind = '';
  private skin: Skin | null = null;
  private prevPos = new THREE.Vector3();
  readonly pos = new THREE.Vector3();

  constructor(private c: Creature, side: Side | null, friendly: boolean) {
    if (c.kind === 'ascendant') this.skin = skins(side!, friendly);
    this.rig = this.build();
    this.root.add(this.rig.root);
  }

  private build(): Rig {
    const c = this.c;
    let rig: Rig;
    if (c.kind === 'wild') rig = buildWild(c.species!);
    else {
      this.form = R.formForLevel(c.level);
      rig = buildAscendant(c.lineage, this.form, this.skin!, null);
    }
    // the weak point pulses per creature: give it its own material
    if (rig.weak) rig.weak.material = (rig.weak.material as THREE.Material).clone();
    compactRig(rig);
    return rig;
  }

  /** Target body height in metres. */
  private targetHeight(): number {
    const c = this.c;
    if (c.kind === 'wild') return SPECIES[c.species!].size;
    return R.FORM_HEIGHT[R.formForLevel(c.level)] * (c.lineage === 'Titan' ? 1.3 : 1);
  }

  onHit() { this.hurtFlash = 1; }
  onAttack(kind: string) { this.attackT = 1; this.attackKind = kind; }

  /** Called every render frame with interpolated position. */
  update(dt: number, time: number, x: number, y: number, z: number) {
    const c = this.c;
    // rebuild on form change (transformation); the grow animation smooths the size jump
    if (c.kind === 'ascendant' && R.formForLevel(c.level) !== this.form) {
      this.root.remove(this.rig.root);
      this.rig = this.build();
      this.root.add(this.rig.root);
    }
    this.prevPos.copy(this.pos);
    this.pos.set(x, y, z);
    const target = this.targetHeight();
    this.displayScale += (target - this.displayScale) * Math.min(1, dt * (c.kind === 'ascendant' ? 2.2 : 10));
    const s = this.displayScale;
    this.rig.root.scale.setScalar(s);
    this.root.position.set(x, y, z);
    this.rig.root.rotation.y = c.yaw;

    // locomotion: stride frequency from speed relative to body size
    const speed = c.moveSpeed;
    const stride = speed / Math.max(0.4, s * 0.9);
    this.phase += dt * stride * 3.2;
    const amp = Math.min(0.9, speed / Math.max(1, s * 2.5));
    const sw = Math.sin(this.phase);
    const rig = this.rig;
    rig.legs.forEach((l, i) => {
      const side = i % 2 === 0 ? 1 : -1;
      const pairPhase = Math.floor(i / 2) % 2 === 0 ? 0 : Math.PI;
      l.rotation.x = Math.sin(this.phase + (side > 0 ? 0 : Math.PI) + pairPhase) * amp;
    });
    const idle = Math.sin(time * 2 + c.id) * 0.02;
    rig.body.position.y = Math.abs(Math.cos(this.phase)) * amp * 0.06 + idle;
    rig.body.rotation.x = (rig.gait === 'knuckle' ? 0.25 : 0.05) * Math.min(1, speed / 3);
    rig.arms.forEach((a, i) => {
      const side = i % 2 === 0 ? 1 : -1;
      a.rotation.x = rig.gait === 'knuckle' ? -0.3 + Math.sin(this.phase + (side > 0 ? Math.PI : 0)) * amp * 0.9 : -sw * side * amp * 0.7;
      a.rotation.z = 0;
    });

    // attack and ability poses
    if (this.attackT > 0) {
      this.attackT = Math.max(0, this.attackT - dt * 3.2);
      const k = Math.sin((1 - this.attackT) * Math.PI);
      if (this.attackKind === 'slam') {
        rig.arms.forEach((a) => (a.rotation.x = -2.6 * k + 0.4));
        rig.body.rotation.x = -0.3 * k;
      } else if (this.attackKind === 'haymaker') {
        if (rig.arms[0]) rig.arms[0].rotation.x = -1.8 * k;
        rig.body.rotation.y = 0.5 * k;
      } else {
        const a = rig.arms[(Math.floor(time * 10) % 2)] ?? rig.arms[0];
        if (a) a.rotation.x = -1.6 * k;
        rig.body.position.z = 0.1 * k;
        if (!rig.arms.length && rig.head) rig.head.position.z += 0; // wildlife lunge handled below
        if (c.kind === 'wild') rig.body.position.z = 0.25 * k;
      }
    } else {
      rig.body.rotation.y = 0;
      rig.body.position.z = 0;
    }
    // Haymaker charge pose / Bulwark brace
    if (c.cast?.slot === 'E' && c.lineage === 'Brawler' && c.kind === 'ascendant') {
      if (rig.arms[0]) rig.arms[0].rotation.x = 1.2;
      rig.body.rotation.y = -0.4;
    }
    if (time < c.bulwarkUntil) {
      rig.arms.forEach((a) => (a.rotation.x = -1.4));
      rig.body.rotation.x = 0.35;
    }
    // weak point pulse (and visible exposure for Brawler after Roll Commit)
    if (rig.weak) {
      const exposed = c.kind === 'ascendant' && c.lineage === 'Brawler' ? time < c.chestExposedUntil : true;
      const m = rig.weak.material as THREE.MeshStandardMaterial;
      if (m.emissiveIntensity !== undefined) m.emissiveIntensity = (exposed ? 1.6 : 0.5) + Math.sin(time * 5) * 0.4 + (time < c.weakBrokenUntil ? -0.8 : 0);
    }
    // airborne / grabbed tumble
    rig.root.rotation.x = !c.grounded ? Math.sin(time * 12) * 0.4 : 0;
    // hit flash: briefly scale up and back
    if (this.hurtFlash > 0) {
      this.hurtFlash = Math.max(0, this.hurtFlash - dt * 6);
      rig.body.scale.setScalar(1 + this.hurtFlash * 0.06);
    }
    // death: sink and topple
    if (!c.alive) {
      this.deathT = Math.min(1, this.deathT + dt * 1.2);
      rig.root.rotation.z = this.deathT * 1.4;
      this.root.position.y -= this.deathT * s * 0.4;
    } else this.deathT = 0;
    this.root.visible = c.alive || this.deathT < 1;
    if (c.kind === 'wild' && c.wildState === 'burrow') this.root.position.y -= s * 0.8;
  }

  dispose() {
    // geometry is shared through the cache; materials are per side and shared too
    this.root.removeFromParent();
  }
}

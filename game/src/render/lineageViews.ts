// Procedural models per lineage (gdd/14): one builder per lineage, keyed by name,
// so CreatureView never checks lineage names. Each builder adds its parts to the
// pivots it is given and returns the finished rig. Sizes are for a 1 m body.
import * as THREE from 'three';
import { G, limb, part, type Rig, type Skin } from './rig';
import type { Lineage } from '../sim/tuning';

interface Pivots { root: THREE.Group; body: THREE.Group; legs: THREE.Object3D[]; arms: THREE.Object3D[] }
type Builder = (form: number, sk: Skin, outline: THREE.Material | null, p: Pivots) => Rig;

const titan: Builder = (form, sk, outline, { root, body, legs, arms }) => {
  const detail = form; // 1..3 adds growths
  let head: THREE.Object3D;
  let weak: THREE.Mesh;
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
};

const brawler: Builder = (form, sk, outline, { root, body, legs, arms }) => {
  const detail = form;
  let head: THREE.Object3D;
  let weak: THREE.Mesh;
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
};

const verdant: Builder = (form, sk, outline, { root, body, legs, arms }) => {
  const detail = form;
  // Verdant: a stag of bark and moss; antlers grow with each Stage; bloom pods on the shoulders (weak point)
  const torso = part(G.cap(0.2, 0.5), sk.body, outline, 0, 0.62, 0);
  torso.rotation.x = Math.PI / 2;
  body.add(torso);
  const moss = part(G.box(0.34, 0.08, 0.6), sk.armour, null, 0, 0.82, 0);
  body.add(moss);
  const neck = part(G.cap(0.08, 0.22), sk.body, outline, 0, 0.86, 0.34);
  neck.rotation.x = 0.6;
  body.add(neck);
  const head = part(G.box(0.14, 0.14, 0.24), sk.body, outline, 0, 1.0, 0.48);
  head.add(part(G.ball(0.025, 0), sk.eye, null, -0.06, 0.03, 0.08), part(G.ball(0.025, 0), sk.eye, null, 0.06, 0.03, 0.08));
  for (const s of [-1, 1]) {
    // antlers: one tine per Stage
    for (let i = 0; i <= detail; i++) {
      const tine = part(G.cone(0.025, 0.22 + i * 0.04, 4), sk.armour, null, s * (0.06 + i * 0.05), 0.12 + i * 0.06, -0.04 - i * 0.02);
      tine.rotation.z = -s * (0.4 + i * 0.15);
      head.add(tine);
    }
  }
  body.add(head);
  let weak: THREE.Mesh | undefined;
  for (const s of [-1, 1]) {
    const pod = part(G.ball(0.09 + detail * 0.01, 1), sk.glow, null, s * 0.2, 0.8, 0.2);
    if (!weak) weak = pod;
    body.add(pod);
    for (const z of [0.22, -0.22]) {
      const leg = limb(G.cap(0.05, 0.36), sk.body, outline, s * 0.13, 0.48, z, 0.48);
      legs.push(leg); root.add(leg);
    }
    if (detail >= 2) body.add(part(G.cone(0.06, 0.24, 5), sk.dark, null, s * 0.1, 0.92, -0.2));
  }
  return { root, body, head, legs, arms, weak, height: 1, gait: 'quad' };
};

const hollow: Builder = (form, sk, outline, { root, body, legs, arms }) => {
  const detail = form;
  // Hollow: a thin floating shape with a hole through its torso; the core cavity glows in front (weak point)
  const ring = part(G.torus(0.2, 0.07), sk.body, outline, 0, 0.7, 0);
  body.add(ring);
  const weak = part(G.ball(0.08 + detail * 0.01, 1), sk.glow, null, 0, 0.7, 0.02);
  body.add(weak);
  const spine = part(G.cap(0.06, 0.4), sk.dark, null, 0, 0.32, -0.02);
  body.add(spine);
  const head = part(G.cone(0.11, 0.26, 6), sk.armour, outline, 0, 1.06, 0);
  head.rotation.x = Math.PI;
  head.add(part(G.ball(0.025, 0), sk.eye, null, -0.04, 0.02, 0.09), part(G.ball(0.025, 0), sk.eye, null, 0.04, 0.02, 0.09));
  body.add(head);
  for (const s of [-1, 1]) {
    const arm = limb(G.cap(0.035, 0.5), sk.body, outline, s * 0.26, 0.86, 0, 0.6);
    arm.add(part(G.cone(0.04, 0.16, 4), sk.glow, null, 0, -0.66, 0));
    arms.push(arm); body.add(arm);
    // trailing veil (no legs: it floats)
    const veil = part(G.cone(0.08, 0.36, 4), sk.dark, null, s * 0.08, 0.08, -0.04);
    veil.rotation.x = Math.PI;
    body.add(veil);
    if (detail >= 2) body.add(part(G.ball(0.04, 0), sk.glow, null, s * 0.3, 0.7, 0));
  }
  return { root, body, head, legs, arms, weak, height: 1, gait: 'float' };
};

export const LINEAGE_VIEWS: Partial<Record<Lineage, Builder>> = { Titan: titan, Brawler: brawler, Verdant: verdant, Hollow: hollow };

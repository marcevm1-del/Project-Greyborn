// Static set dressing, all instanced and split into chunks so the renderer can
// frustum-cull per chunk; grass also fades and culls by distance (cheap LOD).
import * as THREE from 'three';
import { heightAt, normalAt, valueNoise, HALF_W, HALF_D } from '../sim/terrain';
import type { Obstacle } from '../sim/map';
import { PALETTE } from './Scene';

const CHUNK = 40; // metres

function rockGeometry(seed: number, detail = 1): THREE.BufferGeometry {
  const g = new THREE.IcosahedronGeometry(1, detail);
  const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(p, i);
    const n = valueNoise(v.x * 1.7 + seed, v.y * 1.7 + v.z * 1.3, 41);
    v.multiplyScalar(0.75 + n * 0.5);
    v.y *= 0.7;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

function shardGeometry(): THREE.BufferGeometry {
  const g = new THREE.ConeGeometry(0.45, 3.2, 5, 1);
  g.translate(0, 1.4, 0);
  return g;
}

function rootGeometry(): THREE.BufferGeometry {
  const g = new THREE.TorusGeometry(1.1, 0.28, 6, 10, Math.PI);
  g.rotateY(Math.random() * 0); // deterministic
  return g;
}

export class PropsView {
  readonly group = new THREE.Group();
  private grassChunks: { mesh: THREE.InstancedMesh; center: THREE.Vector3 }[] = [];
  private grassMat: THREE.MeshStandardMaterial;
  private grassUniforms: { time?: THREE.IUniform; camPos?: THREE.IUniform } = {};

  constructor(scene: THREE.Scene, obstacles: Obstacle[], grassDensity: number) {
    scene.add(this.group);
    const rockMat = new THREE.MeshStandardMaterial({ color: PALETTE.stone, roughness: 0.92, flatShading: true });
    const shardMat = new THREE.MeshStandardMaterial({ color: PALETTE.glass, roughness: 0.15, metalness: 0.3, emissive: PALETTE.cyan, emissiveIntensity: 0.55, flatShading: true });
    const rootMat = new THREE.MeshStandardMaterial({ color: 0x5b4632, roughness: 0.9, flatShading: true });

    // obstacles (they also collide in the simulation)
    const byKind = { rock: [] as Obstacle[], shard: [] as Obstacle[], root: [] as Obstacle[] };
    obstacles.forEach((o) => byKind[o.kind].push(o));
    this.instanced(rockGeometry(3, 1), rockMat, byKind.rock, (o, m, i) => {
      const y = heightAt(o.x, o.z);
      m.compose(new THREE.Vector3(o.x, y + o.r * 0.25, o.z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, i * 2.4, 0)), new THREE.Vector3(o.r, o.r * 1.1, o.r));
    });
    this.instanced(shardGeometry(), shardMat, byKind.shard, (o, m, i) => {
      const y = heightAt(o.x, o.z);
      m.compose(new THREE.Vector3(o.x, y - 0.3, o.z), new THREE.Quaternion().setFromEuler(new THREE.Euler((i % 3 - 1) * 0.35, i, (i % 2 - 0.5) * 0.5)), new THREE.Vector3(o.r, o.r * (1 + (i % 4) * 0.3), o.r));
    });
    this.instanced(rootGeometry(), rootMat, byKind.root, (o, m, i) => {
      const y = heightAt(o.x, o.z);
      m.compose(new THREE.Vector3(o.x, y - 0.2, o.z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, i * 1.3, 0)), new THREE.Vector3(o.r, o.r * 1.4, o.r));
    });

    // small decorative pebbles and bone fragments (no collision)
    const pebbles: Obstacle[] = [];
    for (let i = 0; i < 900; i++) {
      const x = -HALF_W + valueNoise(i * 1.37, 9.1, 51) * HALF_W * 2;
      const z = -HALF_D + valueNoise(4.2, i * 2.71, 53) * HALF_D * 2;
      pebbles.push({ x, z, r: 0.15 + valueNoise(i, i * 0.3, 57) * 0.45, kind: 'rock' });
    }
    this.instanced(rockGeometry(9, 0), rockMat, pebbles, (o, m, i) => {
      m.compose(new THREE.Vector3(o.x, heightAt(o.x, o.z), o.z), new THREE.Quaternion().setFromEuler(new THREE.Euler(i, i * 0.7, 0)), new THREE.Vector3(o.r, o.r * 0.7, o.r));
    }, false);

    // grass tufts: crossed blades with wind sway, faded by distance
    this.grassMat = new THREE.MeshStandardMaterial({ color: 0x7d8458, roughness: 1, side: THREE.FrontSide });
    this.grassMat.onBeforeCompile = (shader) => {
      shader.uniforms.time = { value: 0 };
      shader.uniforms.camPos = { value: new THREE.Vector3() };
      this.grassUniforms = shader.uniforms as typeof this.grassUniforms;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float time; uniform vec3 camPos; varying float vFade; varying float vTip;')
        .replace('#include <begin_vertex>', /* glsl */ `#include <begin_vertex>
          vec4 wp = instanceMatrix * vec4(transformed, 1.0);
          float sway = sin(time * 1.7 + wp.x * 0.35 + wp.z * 0.25) * 0.18 + sin(time * 3.1 + wp.x) * 0.05;
          transformed.x += sway * position.y;
          vTip = position.y;
          float d = distance((modelMatrix * wp).xz, camPos.xz);
          vFade = 1.0 - smoothstep(55.0, 75.0, d);
          transformed *= max(vFade, 0.001);`);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', '#include <common>\nvarying float vFade; varying float vTip;')
        .replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb *= mix(0.45, 1.1, vTip / 0.9);');
    };
    const tuft = tuftGeometry();
    const count = Math.round(26000 * grassDensity);
    const perChunk = new Map<string, THREE.Matrix4[]>();
    const m4 = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      const x = -HALF_W + 2 + valueNoise(i * 0.913, 1.3, 61) * (HALF_W * 2 - 4);
      const z = -HALF_D + 2 + valueNoise(2.7, i * 0.771, 63) * (HALF_D * 2 - 4);
      const [, ny] = normalAt(x, z);
      if (ny < 0.85 || valueNoise(x * 0.05, z * 0.05, 65) < 0.32) continue;
      const s = 0.7 + valueNoise(x, z, 67) * 0.9;
      m4.compose(new THREE.Vector3(x, heightAt(x, z) - 0.05, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, x * 3.1, 0)), new THREE.Vector3(s, s, s));
      const key = `${Math.floor((x + HALF_W) / CHUNK)},${Math.floor((z + HALF_D) / CHUNK)}`;
      if (!perChunk.has(key)) perChunk.set(key, []);
      perChunk.get(key)!.push(m4.clone());
    }
    for (const [key, mats] of perChunk) {
      const mesh = new THREE.InstancedMesh(tuft, this.grassMat, mats.length);
      mats.forEach((m, i) => mesh.setMatrixAt(i, m));
      mesh.computeBoundingSphere();
      mesh.receiveShadow = false;
      const [cx, cz] = key.split(',').map(Number);
      const center = new THREE.Vector3(-HALF_W + (cx + 0.5) * CHUNK, 0, -HALF_D + (cz + 0.5) * CHUNK);
      this.grassChunks.push({ mesh, center });
      this.group.add(mesh);
    }
  }

  private instanced(geo: THREE.BufferGeometry, mat: THREE.Material, items: Obstacle[],
    place: (o: Obstacle, m: THREE.Matrix4, i: number) => void, shadows = true) {
    if (!items.length) return;
    // chunk the instances so off-screen chunks are culled
    const chunks = new Map<string, Obstacle[]>();
    for (const o of items) {
      const key = `${Math.floor((o.x + HALF_W) / CHUNK)},${Math.floor((o.z + HALF_D) / CHUNK)}`;
      if (!chunks.has(key)) chunks.set(key, []);
      chunks.get(key)!.push(o);
    }
    let n = 0;
    for (const list of chunks.values()) {
      const mesh = new THREE.InstancedMesh(geo, mat, list.length);
      const m = new THREE.Matrix4();
      list.forEach((o, i) => { place(o, m, n + i); mesh.setMatrixAt(i, m); });
      n += list.length;
      mesh.castShadow = shadows;
      mesh.receiveShadow = true;
      mesh.computeBoundingSphere();
      this.group.add(mesh);
    }
  }

  update(time: number, camPos: THREE.Vector3) {
    if (this.grassUniforms.time) this.grassUniforms.time.value = time;
    if (this.grassUniforms.camPos) this.grassUniforms.camPos.value.copy(camPos);
    for (const c of this.grassChunks) {
      const d = Math.hypot(c.center.x - camPos.x, c.center.z - camPos.z);
      c.mesh.visible = d < 75 + CHUNK * 0.75; // distance cull whole chunks
    }
  }
}

/** A tuft of five thin, tapered, two-sided blades (front faces both ways, upward normals). */
function tuftGeometry(): THREE.BufferGeometry {
  const pos: number[] = [], nrm: number[] = [], uv: number[] = [], idx: number[] = [];
  for (let b = 0; b < 5; b++) {
    const a = (b / 5) * Math.PI * 2 + b * 0.7;
    const r = 0.12 + (b % 2) * 0.1;
    const cx = Math.cos(a) * r, cz = Math.sin(a) * r;
    const w = 0.07, h = 0.55 + (b % 3) * 0.18;
    const tx = Math.cos(a + 1.57) * w, tz = Math.sin(a + 1.57) * w;
    const lean = 0.18;
    const v0 = pos.length / 3;
    pos.push(cx - tx, 0, cz - tz, cx + tx, 0, cz + tz, cx + Math.cos(a) * lean, h, cz + Math.sin(a) * lean);
    for (let k = 0; k < 3; k++) nrm.push(0, 1, 0);
    uv.push(0, 0, 1, 0, 0.5, 1);
    idx.push(v0, v0 + 1, v0 + 2, v0 + 1, v0, v0 + 2); // both windings: visible from both sides
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

export function mergeGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const pos: number[] = [], nrm: number[] = [], uv: number[] = [], idx: number[] = [];
  let offset = 0;
  for (const g of geos) {
    const p = g.attributes.position, n = g.attributes.normal, u = g.attributes.uv;
    for (let i = 0; i < p.count; i++) {
      pos.push(p.getX(i), p.getY(i), p.getZ(i));
      nrm.push(0, 1, 0); // grass lit like the ground beneath it
      uv.push(u.getX(i), u.getY(i));
    }
    void n;
    const index = g.index!;
    for (let i = 0; i < index.count; i++) idx.push(index.getX(i) + offset);
    offset += p.count;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  out.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  out.setIndex(idx);
  return out;
}

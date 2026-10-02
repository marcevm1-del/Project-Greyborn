// Terrain mesh with a slope/height material and a live territory overlay:
// cells owned by the Wildborn side grow amber root veins, Blightborn cells grow
// a cyan crystal lattice (gdd/10, gdd/23). Built on MeshStandardMaterial so it
// keeps PBR lighting and shadows.
import * as THREE from 'three';
import { heightAt, HALF_W, HALF_D, MAP_W, MAP_D } from '../sim/terrain';
import { GRID_W, GRID_H } from '../sim/map';

export class TerrainView {
  readonly mesh: THREE.Mesh;
  readonly outer: THREE.Mesh;
  private ownerTex: THREE.DataTexture;
  private ownerData: Uint8Array;
  private shaderUniforms: { [k: string]: THREE.IUniform } = {};

  constructor(scene: THREE.Scene, private wildbornTeam: number) {
    // playable area: 1 m resolution
    const geo = new THREE.PlaneGeometry(MAP_W, MAP_D, MAP_W, MAP_D);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
    geo.computeVertexNormals();

    this.ownerData = new Uint8Array(GRID_W * GRID_H * 4);
    this.ownerTex = new THREE.DataTexture(this.ownerData, GRID_W, GRID_H, THREE.RGBAFormat);
    this.ownerTex.magFilter = THREE.LinearFilter;
    this.ownerTex.minFilter = THREE.LinearFilter;
    this.ownerTex.needsUpdate = true;

    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, metalness: 0 });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.ownerTex = { value: this.ownerTex };
      shader.uniforms.mapSize = { value: new THREE.Vector2(MAP_W, MAP_D) };
      shader.uniforms.time = { value: 0 };
      this.shaderUniforms = shader.uniforms;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vWorld; varying vec3 vNrm;')
        .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWorld = (modelMatrix * vec4(transformed, 1.0)).xyz; vNrm = normal;');
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', /* glsl */ `#include <common>
          varying vec3 vWorld; varying vec3 vNrm;
          uniform sampler2D ownerTex; uniform vec2 mapSize; uniform float time;
          float h21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
          float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
            return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y); }
          float fbm(vec2 p){ float s=0.0, a=0.5; for(int i=0;i<4;i++){ s+=a*vn(p); p*=2.03; a*=0.5; } return s; }
          // ridged vein pattern for roots and crystal lattice
          float veins(vec2 p){ float n = fbm(p); return 1.0 - abs(n*2.0-1.0); }
        `)
        .replace('#include <color_fragment>', /* glsl */ `#include <color_fragment>
          {
            // linear-space colours (gdd/23 palette: grey-green grass, warm grey stone, ash)
            vec3 grass = vec3(0.17, 0.20, 0.11);
            vec3 dry   = vec3(0.30, 0.27, 0.16);
            vec3 stone = vec3(0.15, 0.14, 0.12);
            vec3 ash   = vec3(0.22, 0.21, 0.19);
            float slope = 1.0 - clamp(vNrm.y, 0.0, 1.0);
            float n = fbm(vWorld.xz * 0.08);
            float n2 = fbm(vWorld.xz * 0.6);
            vec3 col = mix(grass, dry, smoothstep(0.35, 0.75, n));
            col = mix(col, ash, smoothstep(0.55, 0.9, fbm(vWorld.xz * 0.02 + 7.0)) * 0.6);
            col = mix(col, stone, smoothstep(0.18, 0.42, slope + (n2 - 0.5) * 0.15));
            col *= 0.86 + 0.28 * n2;
            // territory overlay
            vec2 uv = (vWorld.xz + mapSize * 0.5) / mapSize;
            vec4 own = texture2D(ownerTex, uv);   // r = Wildborn share, g = Blightborn share, b = spread pulse
            float v = veins(vWorld.xz * 0.35 + vec2(0.0, time * 0.02));
            float root = smoothstep(0.82, 0.97, v) * own.r;
            float lattice = smoothstep(0.86, 0.98, veins(vWorld.xz * 0.5 + 13.0)) * own.g;
            col = mix(col, col * vec3(1.0, 0.92, 0.78), own.r * 0.35);
            col = mix(col, col * vec3(0.78, 0.86, 0.95), own.g * 0.45);
            col = mix(col, vec3(0.20, 0.10, 0.03), root * 0.85);
            col = mix(col, vec3(0.01, 0.012, 0.02), lattice * 0.85);
            diffuseColor.rgb = col;
            // inner light (added to emissive below)
            vTerrGlow = vec3(0.80, 0.36, 0.04) * root * (0.45 + 0.4 * own.b) + vec3(0.11, 0.65, 0.75) * lattice * (0.5 + 0.4 * own.b);
          }`)
        .replace('#include <common>', '#include <common>\nvec3 vTerrGlow = vec3(0.0);')
        .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += vTerrGlow;');
    };
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.receiveShadow = true;
    scene.add(this.mesh);

    // surrounding land to the horizon (low resolution, no overlay)
    const og = new THREE.PlaneGeometry(900, 760, 90, 76);
    og.rotateX(-Math.PI / 2);
    const op = og.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < op.count; i++) {
      const x = op.getX(i), z = op.getZ(i);
      const inside = Math.abs(x) < HALF_W - 1 && Math.abs(z) < HALF_D - 1;
      const edge = Math.max(0, Math.max(Math.abs(x) - HALF_W, Math.abs(z) - HALF_D));
      const y = inside ? heightAt(x, z) - 3 : heightAt(Math.max(-HALF_W, Math.min(HALF_W, x)), Math.max(-HALF_D, Math.min(HALF_D, z)))
        + Math.min(40, edge * 0.35) * (0.6 + 0.4 * Math.sin(x * 0.03 + z * 0.05)) + Math.sin(x * 0.011) * 6;
      op.setY(i, y);
    }
    og.computeVertexNormals();
    this.outer = new THREE.Mesh(og, new THREE.MeshStandardMaterial({ color: 0x8a8672, roughness: 1 }));
    this.outer.position.y = -0.05;
    this.outer.receiveShadow = true;
    scene.add(this.outer);
  }

  /** cellOwner: -1 neutral, 0/1 team. pulse: 0..1 per cell for recent captures. */
  updateTerritory(cellOwner: (number)[], pulse: Float32Array, time: number) {
    for (let i = 0; i < cellOwner.length; i++) {
      const o = cellOwner[i];
      const wild = o !== -1 && o === this.wildbornTeam;
      const blight = o !== -1 && o !== this.wildbornTeam;
      const k = i * 4;
      // ease toward the target so captures spread smoothly
      this.ownerData[k] = ease(this.ownerData[k], wild ? 255 : 0);
      this.ownerData[k + 1] = ease(this.ownerData[k + 1], blight ? 255 : 0);
      this.ownerData[k + 2] = Math.min(255, pulse[i] * 255);
      this.ownerData[k + 3] = 255;
    }
    this.ownerTex.needsUpdate = true;
    if (this.shaderUniforms.time) this.shaderUniforms.time.value = time;
  }
}

function ease(cur: number, target: number): number {
  const d = target - cur;
  if (d === 0) return cur;
  return cur + Math.sign(d) * Math.max(1, Math.abs(d) * 0.08);
}

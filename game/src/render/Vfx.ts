// Pooled GPU particles (one draw call), expanding rings and flying core orbs.
import * as THREE from 'three';

const MAX = 3000;

export class Vfx {
  private geo = new THREE.BufferGeometry();
  private pos = new Float32Array(MAX * 3);
  private col = new Float32Array(MAX * 3);
  private size = new Float32Array(MAX);
  private vel = new Float32Array(MAX * 3);
  private life = new Float32Array(MAX);
  private maxLife = new Float32Array(MAX);
  private grav = new Float32Array(MAX);
  private next = 0;
  private points: THREE.Points;
  private rings: { mesh: THREE.Mesh; t: number; dur: number; r: number }[] = [];
  private ringPool: THREE.Mesh[] = [];
  private orbs: { mesh: THREE.Mesh; from: THREE.Vector3; to: () => THREE.Vector3; t: number }[] = [];
  private orbPool: THREE.Mesh[] = [];
  private orbGeo = new THREE.IcosahedronGeometry(0.18, 0);
  private orbMat = new THREE.MeshBasicMaterial({ color: 0xffe2a0 });
  private ringGeo = new THREE.RingGeometry(0.92, 1, 48);
  private reduced = false;

  constructor(private scene: THREE.Scene) {
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    this.geo.setAttribute('size', new THREE.BufferAttribute(this.size, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: { scale: { value: 600 } },
      vertexShader: /* glsl */ `
        attribute float size; varying vec3 vColor; uniform float scale;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * scale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        void main() {
          vec2 d = gl_PointCoord - 0.5;
          float a = smoothstep(0.5, 0.0, length(d));
          gl_FragColor = vec4(vColor * a, a);
        }`,
    });
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
    scene.add(this.points);
  }

  setReducedMotion(v: boolean) { this.reduced = v; }

  burst(p: THREE.Vector3, color: THREE.ColorRepresentation, count: number, speed: number, size = 0.4, life = 0.8, gravity = 6, up = 1) {
    const c = new THREE.Color(color);
    const n = this.reduced ? Math.ceil(count / 3) : count;
    for (let i = 0; i < n; i++) {
      const k = this.next;
      this.next = (this.next + 1) % MAX;
      this.pos[k * 3] = p.x; this.pos[k * 3 + 1] = p.y; this.pos[k * 3 + 2] = p.z;
      const a = Math.random() * Math.PI * 2, e = Math.random() * 0.9 + 0.1;
      const s = speed * (0.4 + Math.random() * 0.8);
      this.vel[k * 3] = Math.cos(a) * s * (1 - e * 0.5);
      this.vel[k * 3 + 1] = e * s * up;
      this.vel[k * 3 + 2] = Math.sin(a) * s * (1 - e * 0.5);
      this.col[k * 3] = c.r; this.col[k * 3 + 1] = c.g; this.col[k * 3 + 2] = c.b;
      this.size[k] = size * (0.6 + Math.random() * 0.8);
      this.life[k] = this.maxLife[k] = life * (0.6 + Math.random() * 0.6);
      this.grav[k] = gravity;
    }
  }

  ring(p: THREE.Vector3, radius: number, color: THREE.ColorRepresentation, dur = 0.5, telegraph = false) {
    const mesh = this.ringPool.pop() ?? new THREE.Mesh(this.ringGeo, new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
    (mesh.material as THREE.MeshBasicMaterial).color.set(color);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(p.x, p.y + 0.15, p.z);
    mesh.scale.setScalar(telegraph ? radius : 0.1);
    this.scene.add(mesh);
    this.rings.push({ mesh, t: 0, dur, r: telegraph ? -radius : radius });
  }

  orb(from: THREE.Vector3, to: () => THREE.Vector3) {
    const mesh = this.orbPool.pop() ?? new THREE.Mesh(this.orbGeo, this.orbMat);
    mesh.position.copy(from);
    this.scene.add(mesh);
    this.orbs.push({ mesh, from: from.clone(), to, t: 0 });
  }

  update(dt: number) {
    let any = false;
    for (let k = 0; k < MAX; k++) {
      if (this.life[k] <= 0) { if (this.size[k] !== 0) { this.size[k] = 0; any = true; } continue; }
      any = true;
      this.life[k] -= dt;
      this.vel[k * 3 + 1] -= this.grav[k] * dt;
      this.pos[k * 3] += this.vel[k * 3] * dt;
      this.pos[k * 3 + 1] += this.vel[k * 3 + 1] * dt;
      this.pos[k * 3 + 2] += this.vel[k * 3 + 2] * dt;
      const f = Math.max(0, this.life[k] / this.maxLife[k]);
      this.size[k] *= 0.985 + f * 0.015;
      if (this.life[k] <= 0) this.size[k] = 0;
    }
    if (any) {
      this.geo.attributes.position.needsUpdate = true;
      this.geo.attributes.size.needsUpdate = true;
      this.geo.attributes.color.needsUpdate = true;
    }
    this.rings = this.rings.filter((r) => {
      r.t += dt;
      const k = r.t / r.dur;
      const m = r.mesh.material as THREE.MeshBasicMaterial;
      if (r.r < 0) { m.opacity = 0.25 + 0.35 * k; } // telegraph: grows more opaque until impact
      else { r.mesh.scale.setScalar(0.1 + r.r * k); m.opacity = 1 - k; }
      if (k >= 1) { r.mesh.removeFromParent(); this.ringPool.push(r.mesh); return false; }
      return true;
    });
    this.orbs = this.orbs.filter((o) => {
      o.t += dt * 1.6;
      const to = o.to();
      const k = Math.min(1, o.t);
      o.mesh.position.lerpVectors(o.from, to, k * k);
      o.mesh.position.y += Math.sin(k * Math.PI) * 2;
      if (k >= 1) { o.mesh.removeFromParent(); this.orbPool.push(o.mesh); return false; }
      return true;
    });
  }
}

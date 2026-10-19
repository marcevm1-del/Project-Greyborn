// Draws ground effects (Void Rift, Void Garden, Thornstorm, Entangle thorns) as
// translucent discs and Bramble Walls as rows of thorny posts. Reads world.zones
// and world.walls each frame; meshes are pooled by field id.
import * as THREE from 'three';
import { heightAt } from '../sim/terrain';
import type { World } from '../sim/World';
import type { ZoneKind } from '../sim/fields';
import { PALETTE } from './Scene';

const ZONE_COLOR: Record<ZoneKind, number> = {
  rift: PALETTE.violet,
  garden: PALETTE.moss,
  thornstorm: 0x9a6a2e,
  thorns: 0x6b8a3a,
};

export class FieldView {
  readonly group = new THREE.Group();
  private zones = new Map<number, THREE.Mesh>();
  private walls = new Map<number, THREE.Group>();
  private disc = new THREE.CircleGeometry(1, 40);
  private post = new THREE.ConeGeometry(0.35, 1.8, 5);
  private wallMat = new THREE.MeshStandardMaterial({ color: 0x4a5a2c, roughness: 0.9 });

  constructor(scene: THREE.Scene) {
    scene.add(this.group);
  }

  update(w: World, time: number) {
    const live = new Set<number>();
    for (const z of w.zones) {
      live.add(z.id);
      let m = this.zones.get(z.id);
      if (!m) {
        const mat = new THREE.MeshBasicMaterial({ color: ZONE_COLOR[z.kind], transparent: true, opacity: 0.3, depthWrite: false });
        m = new THREE.Mesh(this.disc, mat);
        m.rotation.x = -Math.PI / 2;
        this.group.add(m);
        this.zones.set(z.id, m);
      }
      const open = w.time >= z.start;
      m.position.set(z.pos.x, heightAt(z.pos.x, z.pos.z) + 0.15, z.pos.z);
      m.scale.setScalar(z.r * (open ? 1 : 0.3 + 0.7 * Math.max(0, 1 - (z.start - w.time) / 0.3)));
      (m.material as THREE.MeshBasicMaterial).opacity = (open ? 0.28 : 0.15) + Math.sin(time * 4 + z.id) * 0.05;
    }
    for (const [id, m] of this.zones) {
      if (live.has(id)) continue;
      (m.material as THREE.Material).dispose();
      m.removeFromParent();
      this.zones.delete(id);
    }

    const liveWalls = new Set<number>();
    for (const wl of w.walls) {
      liveWalls.add(wl.id);
      let g = this.walls.get(wl.id);
      if (!g) {
        g = new THREE.Group();
        const len = Math.hypot(wl.b.x - wl.a.x, wl.b.z - wl.a.z);
        const n = Math.max(2, Math.round(len / 0.8));
        for (let i = 0; i <= n; i++) {
          const x = wl.a.x + ((wl.b.x - wl.a.x) * i) / n, z = wl.a.z + ((wl.b.z - wl.a.z) * i) / n;
          const p = new THREE.Mesh(this.post, this.wallMat);
          p.position.set(x, heightAt(x, z) + 0.9, z);
          p.rotation.z = Math.sin(i * 2.3) * 0.25;
          p.castShadow = true;
          g.add(p);
        }
        this.group.add(g);
        this.walls.set(wl.id, g);
      }
      const k = Math.min(1, Math.max(0.05, (w.time - wl.start) / wl.grow));
      for (const p of g.children) p.scale.y = k;
    }
    for (const [id, g] of this.walls) {
      if (liveWalls.has(id)) continue;
      g.removeFromParent();
      this.walls.delete(id);
    }
  }

  dispose() {
    for (const m of this.zones.values()) (m.material as THREE.Material).dispose();
    this.group.removeFromParent();
  }
}

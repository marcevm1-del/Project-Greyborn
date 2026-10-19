// Bases (the Cradle / the Clutch), Resource Hubs (Sap / Glow Wells), Enemy Cores
// (Heartseeds / Shard Hearts), Base Hearts and node cores (gdd/33).
import * as THREE from 'three';
import { heightAt } from '../sim/terrain';
import { BASES } from '../sim/map';
import type { World } from '../sim/World';
import { econ } from '../sim/tuning';
import { PALETTE } from './Scene';

function sideMats(wild: boolean) {
  return wild
    ? {
        main: new THREE.MeshStandardMaterial({ color: 0x7a6248, roughness: 0.9, flatShading: true }),
        glow: new THREE.MeshStandardMaterial({ color: 0x3a2508, emissive: PALETTE.amber, emissiveIntensity: 1.4 }),
        pool: new THREE.MeshStandardMaterial({ color: 0x6b4512, emissive: 0xc77d1c, emissiveIntensity: 0.22, roughness: 0.08, metalness: 0.2 }),
      }
    : {
        main: new THREE.MeshStandardMaterial({ color: PALETTE.glass, roughness: 0.12, metalness: 0.35, flatShading: true }),
        glow: new THREE.MeshStandardMaterial({ color: 0x062a30, emissive: PALETTE.cyan, emissiveIntensity: 1.6 }),
        pool: new THREE.MeshStandardMaterial({ color: 0x0c3238, emissive: 0x2aa6b4, emissiveIntensity: 0.22, roughness: 0.05, metalness: 0.2 }),
      };
}

export class StructureView {
  readonly group = new THREE.Group();
  private hubViews: { ring: THREE.Group; pool: THREE.Mesh; walls: THREE.Mesh[]; owner: number; level: number }[] = [];
  private coreViews: THREE.Group[] = [];
  private heartViews: THREE.Group[] = [];
  private nodeMarkers: THREE.Mesh[] = [];
  private mats: ReturnType<typeof sideMats>[]; // per team
  private neutral = new THREE.MeshStandardMaterial({ color: 0x6b6355, roughness: 0.95, flatShading: true });
  private neutralPool = new THREE.MeshStandardMaterial({ color: 0x7a5a20, emissive: 0x6b4a12, emissiveIntensity: 0.35, roughness: 0.1 });

  constructor(scene: THREE.Scene, private w: World, wildTeam: number) {
    scene.add(this.group);
    this.mats = [sideMats(wildTeam === 0), sideMats(wildTeam === 1)];
    // bases: a ring of split root knots (or glazed glass knots) around a birth-pool
    BASES.forEach((b, team) => {
      const g = new THREE.Group();
      const y = heightAt(b.x, b.z);
      g.position.set(b.x, y, b.z);
      const m = this.mats[team];
      const pool = new THREE.Mesh(new THREE.CylinderGeometry(6, 6.5, 0.4, 24), m.pool);
      pool.position.y = 0.1;
      g.add(pool);
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2;
        if (Math.abs(Math.cos(a)) > 0.85 && Math.sign(Math.cos(a)) === (team === 0 ? 1 : -1)) continue; // open toward the map
        const knot = new THREE.Mesh(new THREE.DodecahedronGeometry(1.3 + (i % 3) * 0.35, 0), m.main);
        knot.position.set(Math.cos(a) * 15, 1.1, Math.sin(a) * 15); // outside the spawn area
        knot.scale.y = 1.6 + (i % 2) * 0.8;
        knot.rotation.y = a;
        knot.castShadow = true;
        g.add(knot);
        const vein = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.08, 6), m.glow);
        vein.position.set(Math.cos(a) * 6.5, 0.3, Math.sin(a) * 6.5);
        vein.rotation.y = -a + Math.PI / 2;
        g.add(vein);
      }
      this.group.add(g);
      // Base Heart: the oldest knot at the centre
      const heart = new THREE.Group();
      const hp = w.hearts[team].pos;
      heart.position.set(hp.x, heightAt(hp.x, hp.z), hp.z);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.6, 7, 7), m.main);
      trunk.position.y = 3.5; trunk.castShadow = true;
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), m.glow);
      core.position.y = 6.2;
      heart.add(trunk, core);
      this.heartViews.push(heart);
      this.group.add(heart);
    });
    // Resource Hubs
    for (const h of w.hubs) {
      const g = new THREE.Group();
      g.position.set(h.pos.x, heightAt(h.pos.x, h.pos.z), h.pos.z);
      const pool = new THREE.Mesh(new THREE.CylinderGeometry(4, 4.4, 0.35, 20), this.neutralPool);
      pool.position.y = 0.1;
      g.add(pool);
      const ring = new THREE.Group();
      const walls: THREE.Mesh[] = [];
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        const wall = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1, 0.7), this.neutral);
        wall.position.set(Math.cos(a) * 5.6, 0.5, Math.sin(a) * 5.6);
        wall.rotation.y = -a + Math.PI / 2;
        wall.castShadow = true;
        walls.push(wall);
        ring.add(wall);
      }
      g.add(ring);
      this.hubViews.push({ ring, pool, walls, owner: -2, level: -1 });
      this.group.add(g);
    }
    // Enemy Cores
    w.cores.forEach((c) => {
      const g = new THREE.Group();
      g.position.set(c.pos.x, heightAt(c.pos.x, c.pos.z), c.pos.z);
      const m = this.mats[c.team];
      const husk = new THREE.Mesh(new THREE.IcosahedronGeometry(2.2, 0), m.main);
      husk.scale.set(1, 1.3, 1); husk.position.y = 2; husk.castShadow = true;
      const heart = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 1), m.glow);
      heart.position.y = 2.4;
      g.add(husk, heart);
      this.coreViews.push(g);
      this.group.add(g);
    });
    // node cores: small knots that glow in the owner's colour
    const knot = new THREE.CylinderGeometry(0.35, 0.6, 0.9, 6);
    for (const n of w.nodes) {
      if (n.hub !== null) { this.nodeMarkers.push(new THREE.Mesh()); continue; }
      const m = new THREE.Mesh(knot, this.neutral);
      m.position.set(n.core.x, heightAt(n.core.x, n.core.z) + 0.3, n.core.z);
      m.castShadow = true;
      this.nodeMarkers.push(m);
      this.group.add(m);
    }
  }

  update(time: number) {
    const w = this.w;
    w.hubs.forEach((h, i) => {
      const v = this.hubViews[i];
      const owner = w.nodeOwner[h.node];
      if (owner !== v.owner || h.level !== v.level) {
        v.owner = owner;
        v.level = h.level;
        const mat = owner === -1 ? this.neutral : this.mats[owner].main;
        v.pool.material = owner === -1 ? this.neutralPool : this.mats[owner].pool;
        const height = 0.8 + h.level * 0.35; // walls grow with Hub Defense level
        v.walls.forEach((wall) => { wall.material = mat; wall.scale.y = height; wall.position.y = height / 2; });
      }
      // damage stage: walls crack (shrink) as the Hub is hurt
      const max = econ('Hub base Health') + econ('Hub Health per level') * h.level;
      const frac = h.hp / max;
      v.walls.forEach((wall, k) => (wall.visible = owner === -1 || k / v.walls.length < frac + 0.1));
    });
    w.cores.forEach((c, i) => {
      const g = this.coreViews[i];
      const k = c.alive ? Math.max(0.35, c.hp / c.max) : 0.15;
      g.scale.setScalar(c.alive ? (c.max < econ('Enemy Core Health') ? 0.7 : 1) : 0.6);
      g.children[1].visible = c.alive;
      g.children[1].position.y = 2.4 + Math.sin(time * 2 + i) * 0.15;
      (g.children[0] as THREE.Mesh).rotation.y = time * 0.1;
      void k;
    });
    this.heartViews.forEach((g, team) => {
      const h = w.hearts[team];
      g.children[1].scale.setScalar(0.6 + 0.4 * (h.hp / econ('Base Heart Health')) + Math.sin(time * 3) * 0.05);
    });
    w.nodes.forEach((n, i) => {
      if (n.hub !== null) return;
      const owner = w.nodeOwner[n.id];
      const m = this.nodeMarkers[i];
      const want = owner === -1 ? this.neutral : this.mats[owner].glow;
      if (m.material !== want) m.material = want;
    });
  }
}

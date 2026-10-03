// Third-person orbit camera: distance grows with the player's form (Spec 01),
// terrain collision, smoothing, trauma-based shake and FOV kicks.
import * as THREE from 'three';
import { heightAt } from '../sim/terrain';

export class CameraRig {
  yaw = Math.PI / 2;     // radians; 0 = looking toward +z
  pitch = 0.32;          // radians above the horizon
  private dist = 6;
  private zoomOffset = 0;
  private target = new THREE.Vector3();
  private trauma = 0;
  private fovKick = 0;
  shakeScale = 1;
  baseFov = 62;

  /** Rocks and other solid props the camera must not pass through (x, z, radius). */
  colliders: { x: number; z: number; r: number }[] = [];

  constructor(private cam: THREE.PerspectiveCamera) {}

  private blocked(p: THREE.Vector3): boolean {
    if (heightAt(p.x, p.z) + 0.6 > p.y) return true;
    for (const o of this.colliders) {
      const dx = p.x - o.x, dz = p.z - o.z;
      if (dx * dx + dz * dz < (o.r + 0.4) ** 2 && p.y < heightAt(o.x, o.z) + o.r * 1.5) return true;
    }
    return false;
  }

  look(dx: number, dy: number, sensitivity: number, invertY: boolean) {
    this.yaw -= dx * 0.0025 * sensitivity;
    this.pitch += dy * 0.0022 * sensitivity * (invertY ? -1 : 1);
    this.pitch = Math.max(-0.25, Math.min(1.2, this.pitch));
  }
  zoom(steps: number) { this.zoomOffset = Math.max(-0.35, Math.min(0.6, this.zoomOffset + steps * 0.08)); }
  shake(amount: number) { this.trauma = Math.min(1, this.trauma + amount * this.shakeScale); }
  kick(amount: number) { this.fovKick = Math.max(this.fovKick, amount); }

  /** Snap without smoothing (spawn, respawn). */
  snap(focus: THREE.Vector3, height: number, baseDist: number) {
    this.dist = baseDist;
    this.target.set(focus.x, focus.y + height * 0.85, focus.z);
    this.place(1);
  }

  update(dt: number, focus: THREE.Vector3, height: number, baseDist: number, sprinting: boolean) {
    const want = baseDist * (1 + this.zoomOffset);
    this.dist += (want - this.dist) * Math.min(1, dt * 3);
    const t = new THREE.Vector3(focus.x, focus.y + height * 0.85 + 0.4, focus.z);
    this.target.lerp(t, Math.min(1, dt * 12));
    const fov = this.baseFov + (sprinting ? 4 : 0) + this.fovKick * 10;
    this.cam.fov += (fov - this.cam.fov) * Math.min(1, dt * 6);
    this.cam.updateProjectionMatrix();
    this.fovKick = Math.max(0, this.fovKick - dt * 3);
    this.place(dt);
  }

  private place(dt: number) {
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    const dir = new THREE.Vector3(-Math.sin(this.yaw) * cp, sp, -Math.cos(this.yaw) * cp);
    let d = this.dist;
    // terrain collision: pull in until the line from target to camera clears the ground
    for (let i = 1; i <= 12; i++) {
      const k = (i / 12) * d;
      const p = this.target.clone().addScaledVector(dir, k);
      if (this.blocked(p)) { d = Math.max(1.5, k - 0.5); break; }
    }
    const pos = this.target.clone().addScaledVector(dir, d);
    const g = heightAt(pos.x, pos.z) + 0.8;
    if (pos.y < g) pos.y = g;
    // shake
    if (this.trauma > 0) {
      const s = this.trauma * this.trauma * 0.5;
      pos.x += (Math.random() - 0.5) * s;
      pos.y += (Math.random() - 0.5) * s;
      pos.z += (Math.random() - 0.5) * s;
      this.trauma = Math.max(0, this.trauma - dt * 1.8);
    }
    this.cam.position.copy(pos);
    this.cam.lookAt(this.target);
  }

  /** Horizontal forward and right vectors for camera-relative movement. */
  basis(): { fx: number; fz: number; rx: number; rz: number } {
    const fx = Math.sin(this.yaw), fz = Math.cos(this.yaw);
    return { fx, fz, rx: -fz, rz: fx };
  }
}

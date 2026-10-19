// Ties the simulation, rendering, input, audio, HUD and menus together.
// The simulation runs at a fixed 30 Hz; rendering interpolates between ticks.
import * as THREE from 'three';
import * as R from '../sim/rules';
import { World } from '../sim/World';
import { BotBrain } from '../sim/botAI';
import { maxHp } from '../sim/combat';
import { SPECIES } from '../sim/species';
import type { Creature, GameEvent } from '../sim/types';
import type { Team } from '../sim/map';
import type { Lineage } from '../sim/tuning';
import { SceneRig, type Quality } from '../render/Scene';
import { TerrainView } from '../render/TerrainView';
import { PropsView } from '../render/PropsView';
import { StructureView } from '../render/StructureView';
import { CreatureView, setTeamColors } from '../render/CreatureView';
import { CameraRig } from '../render/CameraRig';
import { Vfx } from '../render/Vfx';
import { AudioEngine } from '../audio/Audio';
import { Input } from '../core/Input';
import { loadSettings, saveSettings, loadProfile, saveProfile, type Settings, type Profile } from '../core/Settings';
import { Hud } from '../ui/Hud';
import { Menus } from '../ui/Menus';

type State = 'title' | 'playing' | 'paused' | 'ended';

const QUALITY: Record<Settings['quality'], Quality> = {
  low: { shadows: false, shadowSize: 1024, pixelRatio: 1, grassDensity: 0.35 },
  medium: { shadows: true, shadowSize: 1024, pixelRatio: 1.25, grassDensity: 0.7 },
  high: { shadows: true, shadowSize: 2048, pixelRatio: 1.5, grassDensity: 1 },
};

export class Game {
  settings: Settings = loadSettings();
  profile: Profile = loadProfile();
  state: State = 'title';
  readonly rig: SceneRig;
  readonly input: Input;
  readonly audio = new AudioEngine();
  readonly hud: Hud;
  readonly menus: Menus;
  readonly cam: CameraRig;
  readonly vfx: Vfx;
  private terrain: TerrainView;
  private props: PropsView;
  world!: World;
  private structures: StructureView | null = null;
  private views = new Map<number, CreatureView>();
  private brains: BotBrain[] = [];
  private prev = new Map<number, { x: number; y: number; z: number }>();
  private acc = 0;
  private last = performance.now();
  private pulse = new Float32Array(240);
  private latched = { q: false, r: false, ult: false, evade: false };
  private stepDist = new Map<number, number>();
  private fpsAcc = { frames: 0, t: 0, fps: 0, simMs: 0 };
  private wasLocked = false;
  private timeScale = 1;
  private autopiloting = false;
  private pausedAt = 0;

  constructor(container: HTMLElement) {
    this.applyUiScale();
    this.rig = new SceneRig(container, QUALITY[this.settings.quality]);
    this.cam = new CameraRig(this.rig.camera);
    this.vfx = new Vfx(this.rig.scene);
    this.input = new Input(this.rig.renderer.domElement, () => this.settings);
    this.hud = new Hud(document.body);
    this.menus = new Menus(document.body, {
      start: (l) => this.startMatch(l),
      resume: () => this.resume(),
      quit: () => this.toTitle(),
      settingsChanged: (s) => this.applySettings(s),
      click: () => { this.audio.start(); this.audio.play('ui'); },
    }, () => this.settings, () => this.profile);
    this.world = this.attractWorld();
    this.terrain = new TerrainView(this.rig.scene, this.world.sides[0] === 'Wildborn' ? 0 : 1);
    this.props = new PropsView(this.rig.scene, this.world.obstacles, QUALITY[this.settings.quality].grassDensity);
    this.bindWorld();
    this.applySettings(this.settings);
    this.rig.renderer.domElement.addEventListener('click', () => {
      this.audio.start();
      if (this.state === 'playing') this.input.lockPointer();
    });
    document.addEventListener('pointerlockchange', () => {
      const locked = this.input.locked;
      // releasing the pointer (Esc) during play pauses the game
      if (this.wasLocked && !locked && this.state === 'playing') this.pause();
      this.wasLocked = locked;
    });
    this.hud.setVisible(false);
    this.menus.title();
    requestAnimationFrame((t) => this.frame(t));
  }

  // ---------------------------------------------------------------- lifecycle
  /** A bots-only match running behind the title screen. */
  private attractWorld(): World {
    return new World({ playerLineage: null, playerTeam: 0, short: true, seed: Math.floor(Math.random() * 1e9) });
  }

  private bindWorld() {
    for (const v of this.views.values()) v.dispose();
    this.views.clear();
    this.prev.clear();
    this.structures?.group.removeFromParent();
    const wildTeam = this.world.sides[0] === 'Wildborn' ? 0 : 1;
    this.terrain.wildbornTeam = wildTeam;
    this.structures = new StructureView(this.rig.scene, this.world, wildTeam);
    this.cam.colliders = this.world.obstacles.filter((o) => o.r > 1.2);
    this.brains = this.world.creatures.filter((c) => c.kind === 'ascendant' && !c.isPlayer).map((c) => new BotBrain(c.id, this.world));
    this.acc = 0;
    const focus = this.world.player ?? this.world.creatures[0];
    this.cam.yaw = focus.team === 0 ? Math.PI / 2 : -Math.PI / 2;
    this.cam.pitch = 0.3;
    this.cam.snap(new THREE.Vector3(focus.pos.x, focus.pos.y, focus.pos.z), this.world.height(focus), R.FORM_CAMERA[0]);
  }

  startMatch(lineage: Lineage) {
    this.autopiloting = false;
    this.audio.start();
    this.profile.lastLineage = lineage;
    saveProfile(this.profile);
    const team = (Math.random() < 0.5 ? 0 : 1) as Team;
    this.world = new World({ playerLineage: lineage, playerTeam: team, short: this.settings.shortMatch, seed: Math.floor(Math.random() * 1e9) });
    this.bindWorld();
    this.state = 'playing';
    this.hud.setVisible(true);
    this.input.lockPointer();
    const me = this.world.player!;
    this.hud.toast(`You are ${this.world.sideOf(me.team as Team)}`, me.team === 0 ? 'Your base is in the west' : 'Your base is in the east', 4);
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.pausedAt = performance.now();
    // release the mouse so the menu can be used (P or gamepad Start don't release it on their own)
    if (document.pointerLockElement) document.exitPointerLock();
    this.menus.pause();
  }
  resume() {
    this.state = 'playing';
    this.input.lockPointer();
  }
  toTitle() {
    this.state = 'title';
    this.world = this.attractWorld();
    this.bindWorld();
    this.hud.setVisible(false);
    if (document.pointerLockElement) document.exitPointerLock();
    this.menus.title();
  }

  applySettings(s: Settings) {
    this.settings = s;
    saveSettings(s);
    this.audio.setVolumes(s.masterVolume, s.musicVolume, s.sfxVolume);
    this.cam.baseFov = s.fov;
    this.cam.shakeScale = s.reduceMotion ? 0.2 * s.shakeScale : s.shakeScale;
    this.vfx.setReducedMotion(s.reduceMotion);
    this.hud.setFps(s.showFps);
    const q = QUALITY[s.quality];
    this.rig.renderer.setPixelRatio(Math.min(window.devicePixelRatio, q.pixelRatio));
    this.rig.renderer.shadowMap.enabled = q.shadows;
    this.rig.sun.castShadow = q.shadows;
    setTeamColors(s.colorBlind ? 0x4aa3ff : 0xe2c56a, s.colorBlind ? 0xff9a1f : 0xe0453a);
    document.documentElement.style.setProperty('--friend', s.colorBlind ? '#4aa3ff' : '#e2c56a');
    document.documentElement.style.setProperty('--foe', s.colorBlind ? '#ff9a1f' : '#e0453a');
    this.applyUiScale();
  }
  private applyUiScale() {
    document.documentElement.style.setProperty('--ui-scale', String(this.settings.uiScale));
  }

  // ---------------------------------------------------------------- per frame
  private frame(t: number) {
    requestAnimationFrame((n) => this.frame(n));
    const dt = Math.min(0.1, (t - this.last) / 1000);
    this.last = t;
    this.input.poll();
    if (this.state === 'playing' && this.input.tapped('pause') && !this.menus.open) this.pause();
    // Esc both releases pointer lock (which pauses) and arrives as a key press: ignore the key briefly after pausing
    else if (this.state === 'paused' && this.input.tapped('pause') && performance.now() - this.pausedAt > 400) { this.menus.close(); this.resume(); }

    const running = this.state === 'playing' || this.state === 'title' || this.state === 'ended';
    const t0 = performance.now();
    if (running && !this.world.result) {
      this.controlPlayer();
      this.acc += dt * this.timeScale;
      let steps = 0;
      while (this.acc >= R.DT && steps < 8) {
        for (const c of this.world.creatures) this.prev.set(c.id, { ...c.pos });
        for (const b of this.brains) b.update(this.world);
        this.world.step(R.DT);
        this.latched = { q: false, r: false, ult: false, evade: false };
        this.handleEvents(this.world.drainEvents());
        this.acc -= R.DT;
        steps++;
      }
      if (steps === 8) this.acc = 0;
    } else if (this.world.result && this.state === 'title') {
      this.world = this.attractWorld(); // keep the backdrop alive
      this.bindWorld();
    }
    const simMs = performance.now() - t0;
    this.render(dt, t / 1000);
    this.stats(dt, simMs);
    this.input.endFrame();
  }

  private controlPlayer() {
    const me = this.world.player;
    if (!me || this.state !== 'playing' || this.autopiloting) return;
    const s = this.settings;
    if (this.input.locked || this.input.usingGamepad) this.cam.look(this.input.lookDX, this.input.lookDY, s.mouseSensitivity, s.invertY);
    if (this.input.zoom) this.cam.zoom(this.input.zoom);
    const ax = this.input.moveAxes();
    const b = this.cam.basis();
    const it = me.intent;
    it.move = { x: b.fx * ax.y + b.rx * ax.x, z: b.fz * ax.y + b.rz * ax.x };
    it.aimYaw = this.cam.yaw;
    if (this.input.tapped('q')) this.latched.q = true;
    if (this.input.tapped('r')) this.latched.r = true;
    if (this.input.tapped('ult')) this.latched.ult = true;
    if (this.input.tapped('evade')) this.latched.evade = true;
    it.q = this.latched.q;
    it.r = this.latched.r;
    it.ult = this.latched.ult;
    it.evade = this.latched.evade;
    it.e = this.input.held('e');
    it.basic = this.input.held('basic');
    it.interact = this.input.held('interact');
  }

  private vec(p: { x: number; y: number; z: number }, up = 0) { return new THREE.Vector3(p.x, p.y + up, p.z); }

  private handleEvents(events: GameEvent[]) {
    const w = this.world;
    const me = w.player;
    for (const e of events) {
      switch (e.type) {
        case 'hit': {
          const tgt = e.target >= 0 ? w.creatures[e.target] : null;
          const glass = tgt?.kind === 'ascendant' && w.sideOf(tgt.team as Team) === 'Blightborn';
          const p = this.vec(e.pos, tgt ? w.height(tgt) * 0.6 : 0);
          this.views.get(e.target)?.onHit();
          this.vfx.burst(p, e.weak ? 0xffd76a : glass ? 0x8fe8f0 : 0xd8c8a8, e.weak ? 18 : 8, 5, e.weak ? 0.5 : 0.35, 0.5);
          this.audio.play(e.weak ? 'weak' : 'hit', p, { size: tgt ? w.height(tgt) : 3, glass });
          if (me && (e.source === me.id || e.target === me.id)) {
            this.hud.damageNumber(p, e.amount, e.target === me.id ? 'taken' : e.weak ? 'weak' : 'normal');
            if (e.target === me.id) this.cam.shake(Math.min(0.5, e.amount / maxHp(me) * 3));
            else this.cam.shake(e.weak ? 0.15 : 0.05);
          }
          break;
        }
        case 'swing': {
          const c = w.creatures[e.id];
          this.views.get(e.id)?.onAttack('basic');
          if (this.near(c)) this.audio.play('swing', this.vec(c.pos, 1));
          break;
        }
        case 'ability': {
          const c = w.creatures[e.id];
          const p = this.vec(e.pos);
          const view = this.views.get(e.id);
          const side = c.kind === 'ascendant' ? w.sideOf(c.team as Team) : 'Wildborn';
          const col = side === 'Wildborn' ? 0xe8a23a : 0x5fd4e0;
          if (e.name === 'Quake Slam impact') {
            view?.onAttack('slam');
            this.vfx.ring(p, e.radius, col, 0.5);
            this.vfx.burst(p.clone().setY(p.y + 0.3), 0xb8ab90, 40, 7, 0.6, 0.9, 10, 0.8);
            this.audio.play('slam', p);
            if (me && w.dist(me.pos, c.pos) < 30) this.cam.shake(0.45 - w.dist(me.pos, c.pos) / 80);
          } else if (e.name.startsWith('Haymaker')) {
            view?.onAttack('haymaker');
            this.audio.play(e.name.includes('full') ? 'slam' : 'hit', p, { size: 2 });
            if (e.name.includes('full')) this.vfx.ring(p, e.radius * 1.5, col, 0.35);
          } else if (e.name === 'Uppercut') {
            view?.onAttack('basic');
            this.vfx.burst(p.clone().setY(p.y + 1), col, 20, 6, 0.4, 0.6);
          } else if (e.name === 'Frenzy') {
            this.vfx.burst(p.clone().setY(p.y + 2), 0xff6a3a, 50, 5, 0.6, 1);
          } else {
            this.audio.play('whoosh', p);
            this.vfx.burst(p.clone().setY(p.y + 0.5), col, 12, 3, 0.4, 0.5);
          }
          if (c.isPlayer) this.cam.kick(0.3);
          break;
        }
        case 'telegraph': this.vfx.ring(this.vec(e.pos), e.radius, 0xffffff, e.time, true); break;
        case 'evade': {
          const c = w.creatures[e.id];
          this.vfx.burst(this.vec(c.pos, 0.5), 0xd8d0b8, 10, 3, 0.4, 0.4);
          if (this.near(c)) this.audio.play('evade', this.vec(c.pos, 1));
          if (c.isPlayer) this.cam.kick(0.5);
          break;
        }
        case 'death': {
          const c = w.creatures[e.id];
          const p = this.vec(e.pos, 1);
          this.vfx.burst(p, c.kind === 'ascendant' && w.sideOf(c.team as Team) === 'Blightborn' ? 0x5fd4e0 : 0xe8a23a, c.kind === 'ascendant' ? 50 : 18, 6, 0.5, 1.1);
          this.audio.play('death', p, { size: w.height(c) });
          if (c.kind === 'ascendant') {
            const killer = e.killer !== null ? w.creatures[e.killer] : null;
            const mine = (x: Creature | null) => x && me && x.team === me.team;
            this.hud.feedLine(`<span style="color:${mine(killer) ? 'var(--friend)' : 'var(--foe)'}">${killer?.name ?? 'The wild'}</span> ⟶ <span style="color:${mine(c) ? 'var(--friend)' : 'var(--foe)'}">${c.name}</span>`);
          }
          break;
        }
        case 'pickup': {
          const c = w.creatures[e.id];
          if (c.isPlayer) {
            for (let i = 0; i < Math.min(5, Math.ceil(e.amount / 15)); i++) this.vfx.orb(this.vec(e.pos, 0.8), () => this.vec(c.pos, w.height(c) * 0.6));
            this.audio.play('pickup', this.vec(c.pos, 1));
          }
          break;
        }
        case 'levelup': {
          const c = w.creatures[e.id];
          if (c.isPlayer) {
            this.audio.play('levelup');
            if (R.formForLevel(e.level) === R.formForLevel(e.level - 1)) this.hud.toast(`Level ${e.level}`, levelNote(e.level), 1.8);
          }
          break;
        }
        case 'transform': {
          const c = w.creatures[e.id];
          const p = this.vec(c.pos);
          const glass = w.sideOf(c.team as Team) === 'Blightborn';
          this.vfx.burst(p.clone().setY(p.y + 1), glass ? 0x5fd4e0 : 0xe8a23a, 120, 9, 0.7, 1.5, 4, 1.4);
          this.vfx.ring(p, 6 + e.form * 4, glass ? 0x5fd4e0 : 0xe8a23a, 1.2);
          this.audio.play('transform', p);
          if (c.isPlayer) {
            this.cam.shake(0.6);
            const names = ['', `${c.lineage} awakens`, 'Stage 2 · Enhanced Form', 'Stage 3 · Ultimate Form'];
            this.hud.toast(names[e.form], e.form === 1 ? 'Q, E and R are ready' : e.form === 3 ? 'Press T for your Ultimate' : 'You are larger, stronger and louder', 3);
          }
          break;
        }
        case 'capture': {
          const n = w.nodes[e.node];
          for (const cell of n.cells) this.pulse[cell] = 1;
          const by = e.by >= 0 ? w.creatures[e.by] : null;
          const glass = e.team !== -1 && w.sideOf(e.team as Team) === 'Blightborn';
          if (by?.isPlayer) {
            this.audio.play('capture', null, { glass });
            this.hud.feedLine(e.team === -1 ? 'You uprooted an enemy node' : n.hub !== null ? '<b style="color:var(--gold)">You claimed a Resource Hub</b>' : 'Node rooted');
          } else if (n.hub !== null && me) {
            this.hud.feedLine(e.team === -1 ? 'A Hub has been uprooted' : `${e.team === me.team ? 'Your team' : 'The enemy'} claimed a Hub`);
          }
          break;
        }
        case 'convert': {
          const c = w.creatures[e.id];
          if (c.isPlayer) {
            this.audio.play('convert');
            this.hud.toast(`+${Math.round(e.exp)} EXP`, e.field ? 'Field conversion (70%)' : 'Cores fed to the birth-pool', 1.8);
            this.vfx.burst(this.vec(c.pos, 1), 0xffe2a0, 60, 4, 0.5, 1.2, -1);
          }
          break;
        }
        case 'structure':
          if (e.destroyed && me) this.hud.feedLine(e.team === me.team ? '<b style="color:var(--foe)">One of your Enemy Cores fell</b>' : '<b style="color:var(--friend)">Enemy Core destroyed</b>');
          break;
        case 'phase': {
          const names = ['', 'Stable Flow', 'Pre-Aggro Resource Control', 'Resource Stage', 'Hunt', 'Overtime'];
          const rules = ['', '', 'The centre is open', 'Enemy Cores are under siege', 'Base Hearts are open', 'First team to root a node wins'];
          if (this.state === 'playing') this.hud.toast(`Phase ${e.phase} · ${names[e.phase]}`, rules[e.phase], 3);
          if (me) this.audio.play('phase', null, { glass: w.sideOf(me.team as Team) === 'Blightborn' });
          break;
        }
        case 'weakbreak': {
          const c = w.creatures[e.id];
          this.vfx.burst(this.vec(c.pos, w.height(c) * 0.7), 0xfff0b0, 40, 8, 0.5, 0.8);
          if (me && (c.id === me.id || c.lastAttacker === me.id)) this.hud.feedLine(c.id === me.id ? '<span style="color:var(--foe)">Your weak point broke: R disabled</span>' : '<b style="color:var(--gold)">Weak point broken!</b>');
          break;
        }
        case 'end': this.onEnd(e.winner, e.how); break;
      }
    }
  }

  private near(c: Creature): boolean {
    const p = this.rig.camera.position;
    return Math.hypot(c.pos.x - p.x, c.pos.z - p.z) < 60;
  }

  private onEnd(winner: Team | null, how: string) {
    const me = this.world.player;
    if (!me || this.state !== 'playing') return;
    this.state = 'ended';
    if (document.pointerLockElement) document.exitPointerLock();
    const win = winner === null ? null : winner === me.team;
    this.profile.matches++;
    if (win) this.profile.wins++;
    this.profile.bestLevel = Math.max(this.profile.bestLevel, me.level);
    this.profile.totalKills += me.kills;
    saveProfile(this.profile);
    const rows = this.world.creatures.filter((c) => c.kind === 'ascendant').sort((a, b) => (a.team as number) - (b.team as number))
      .map((c) => `<tr class="${c.team === me.team ? 'win' : 'loss'}"><td>${c.name}</td><td>${c.lineage}</td><td>${c.level}</td><td>${c.kills}</td><td>${c.deaths}</td></tr>`).join('');
    this.menus.results(win, how, rows, () => this.startMatch(me.lineage));
  }

  // ---------------------------------------------------------------- rendering
  private visibleTo(team: Team | null) {
    const w = this.world;
    return (c: Creature): boolean => {
      if (team === null || c.kind === 'wild' || c.team === team) return true;
      if (c.carried >= 300) return true; // heavy carriers are pinged
      return w.creatures.some((a) => a.alive && a.kind === 'ascendant' && a.team === team
        && w.dist(a.pos, c.pos) <= (R.formForLevel(a.level) === 3 ? 40 : 30));
    };
  }

  private render(dt: number, time: number) {
    const w = this.world;
    const me = w.player;
    const alpha = Math.min(1, this.acc / R.DT);
    const myTeam: Team | null = me ? (me.team as Team) : null;
    const visible = this.visibleTo(myTeam);
    for (const c of w.creatures) {
      let v = this.views.get(c.id);
      if (!v) {
        const side = c.kind === 'ascendant' ? w.sideOf(c.team as Team) : null;
        const friendly = myTeam === null ? c.team === 0 : c.team === myTeam;
        v = new CreatureView(c, side, friendly);
        this.views.set(c.id, v);
        this.rig.scene.add(v.root);
      }
      const p = this.prev.get(c.id) ?? c.pos;
      const x = p.x + (c.pos.x - p.x) * alpha, y = p.y + (c.pos.y - p.y) * alpha, z = p.z + (c.pos.z - p.z) * alpha;
      const dist = Math.hypot(x - this.rig.camera.position.x, z - this.rig.camera.position.z);
      const show = visible(c) && dist < 220;
      v.root.visible = show;
      if (show) v.update(dt, w.time, x, y, z);
      // footsteps for nearby moving creatures
      if (c.alive && c.moveSpeed > 0.5 && c.grounded && dist < 45) {
        const stride = Math.max(0.6, w.height(c) * 0.9);
        const acc = (this.stepDist.get(c.id) ?? 0) + c.moveSpeed * dt;
        if (acc >= stride) {
          this.stepDist.set(c.id, 0);
          const glass = c.kind === 'ascendant' && w.sideOf(c.team as Team) === 'Blightborn';
          const quiet = c.kind === 'wild' && SPECIES[c.species!].size < 1;
          if (!quiet) this.audio.play('step', new THREE.Vector3(x, y, z), { size: w.height(c), glass });
          if (w.height(c) >= 4) this.vfx.burst(new THREE.Vector3(x, y + 0.2, z), 0xb0a68e, 6, 2, 0.6, 0.6, 3);
        } else this.stepDist.set(c.id, acc);
      }
    }
    // camera
    const focus = me ?? this.spectateTarget();
    const fp = this.views.get(focus.id)?.pos ?? new THREE.Vector3(focus.pos.x, focus.pos.y, focus.pos.z);
    if (me) {
      const sprint = w.time - me.lastCombatAt > 4 && me.moveSpeed > 5;
      this.cam.update(dt, fp, w.height(me), Math.max(R.FORM_CAMERA[R.formForLevel(me.level)], w.height(me) * 2.1), sprint);
    } else {
      this.cam.yaw += dt * 0.05;
      this.cam.pitch = 0.35;
      this.cam.update(dt, fp, w.height(focus), 22, false);
    }
    this.rig.followShadow(fp, me && R.formForLevel(me.level) >= 2 ? 80 : 60);
    for (let i = 0; i < 240; i++) this.pulse[i] = Math.max(0, this.pulse[i] - dt * 0.5);
    this.terrain.updateTerritory(w.cellOwner, this.pulse, time);
    this.props.update(time, this.rig.camera.position);
    this.structures?.update(time);
    this.vfx.update(dt);
    // audio listener and music intensity
    const f = new THREE.Vector3();
    this.rig.camera.getWorldDirection(f);
    this.audio.setListener(this.rig.camera.position, f);
    const inCombat = me ? w.time - me.lastCombatAt < 5 : false;
    this.audio.setIntensity((inCombat ? 0.6 : 0.15) + (w.phase - 1) * 0.12);
    this.audio.tick(dt);
    if (this.state === 'playing' || this.state === 'paused') this.hud.update(w, me, this.rig.camera, visible, dt);
    this.rig.render();
  }

  private spectateTarget(): Creature {
    // follow the highest-level living bot for the title backdrop
    return this.world.creatures.filter((c) => c.kind === 'ascendant' && c.alive).sort((a, b) => b.level - a.level || a.id - b.id)[0]
      ?? this.world.creatures[0];
  }

  private stats(dt: number, simMs: number) {
    const s = this.fpsAcc;
    s.frames++; s.t += dt; s.simMs += simMs;
    if (s.t >= 0.5) {
      s.fps = s.frames / s.t;
      const info = this.rig.renderer.info;
      if (this.settings.showFps) {
        this.hud.setFpsText(`${s.fps.toFixed(0)} fps · ${(1000 / s.fps).toFixed(1)} ms\nsim ${(s.simMs / s.frames).toFixed(2)} ms\ndraw calls ${info.render.calls}\ntriangles ${(info.render.triangles / 1000).toFixed(0)}k\ngeometries ${info.memory.geometries} · textures ${info.memory.textures}`);
      }
      (window as unknown as { __perf: unknown }).__perf = { fps: s.fps, simMs: s.simMs / s.frames, calls: info.render.calls, triangles: info.render.triangles };
      s.frames = 0; s.t = 0; s.simMs = 0;
    }
  }

  /** Test hooks (used by the automated browser tests). */
  debugApi() {
    return {
      state: () => this.state,
      world: () => this.world,
      start: (l: Lineage) => { this.menus.close(); this.startMatch(l); },
      setTimeScale: (k: number) => { this.timeScale = k; },
      /** Lets a bot brain drive the player (automated long playtests). */
      autopilot: () => { const p = this.world.player; if (p) this.brains.push(new BotBrain(p.id, this.world)); this.autopiloting = true; },
      key: (code: string, down: boolean) => this.input.inject(code, down),
      look: (dx: number, dy: number) => this.cam.look(dx, dy, 1, false),
      perf: () => (window as unknown as { __perf: unknown }).__perf,
      /** QA: advance the simulation without rendering (used to finish matches quickly in tests). */
      fastForward: (seconds: number) => {
        const steps = Math.round(seconds / R.DT);
        for (let i = 0; i < steps && !this.world.result; i++) {
          for (const b of this.brains) b.update(this.world);
          this.world.step(R.DT);
          this.handleEvents(this.world.drainEvents());
        }
        return this.world.time;
      },
      /** QA: grant EXP to the player to inspect later forms. */
      grantExp: (n: number) => { const p = this.world.player; if (p) this.world.gainExp(p, n); },
      player: () => {
        const p = this.world.player;
        return p && { level: p.level, exp: p.exp, hp: p.hp, maxHp: maxHp(p), carried: p.carried, alive: p.alive, pos: { ...p.pos }, channel: p.channel?.kind ?? null, kills: p.kills };
      },
    };
  }
}

function levelNote(level: number): string {
  if (level === 5) return 'Abilities reach Rank 2';
  if (level === 15) return 'Tenacity maxed';
  if (level >= 16) return 'Territorial Dominance grows';
  return '';
}

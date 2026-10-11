// In-match HUD: timer and phase, Territorial Influence, vitals, carried cores,
// EXP, ability bar, channel bar, prompts, kill feed, minimap, nameplates and
// floating damage numbers.
import * as THREE from 'three';
import * as R from '../sim/rules';
import { econ } from '../sim/tuning';
import { BASES, GRID_W, GRID_H, cellCenter, type Team } from '../sim/map';
import { HALF_W, HALF_D, MAP_W, MAP_D } from '../sim/terrain';
import { abilityInfo } from '../sim/abilities';
import { maxHp } from '../sim/combat';
import type { World } from '../sim/World';
import type { Creature } from '../sim/types';

const ICONS: Record<string, string> = {
  'Quake Slam': '◎', Bulwark: '⛉', 'Rampart Charge': '➤', 'Roll Commit': '⟳', Haymaker: '✊', Grapple: '✋',
  Avalanche: '⛰', Frenzy: '✸',
};

function el(tag: string, cls = '', html = ''): HTMLElement {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

export class Hud {
  readonly root = el('div');
  private timer = el('div', 'timer');
  private phase = el('div', 'phase');
  private tiA = el('div', 'a');
  private tiB = el('div', 'b');
  private tiLabels = el('div', 'ti-labels');
  private vitals = el('div', 'vitals');
  private abilities = el('div', 'abilities');
  private abEls: Record<string, { box: HTMLElement; cd: HTMLElement; num: HTMLElement; label: HTMLElement; icon: HTMLElement }> = {};
  private channel = el('div', 'channel hidden');
  private prompt = el('div', 'prompt hidden');
  private feed = el('div', 'feed');
  private toastEl = el('div', 'toast hidden');
  private toastUntil = 0;
  private minimap = document.createElement('canvas');
  private fps = el('div', 'fps hidden');
  private respawn = el('div', 'respawn hidden');
  private plates = new Map<number, HTMLElement>();
  private plateLayer = el('div');
  private dmgLayer = el('div');
  private dmgs: { e: HTMLElement; pos: THREE.Vector3; t: number }[] = [];
  private v = new THREE.Vector3();

  constructor(parent: HTMLElement) {
    this.root.id = 'hud';
    const top = el('div', 'top');
    const ti = el('div', 'ti');
    ti.append(this.tiA, el('div', 'n'), this.tiB);
    top.append(this.timer, this.phase, ti, this.tiLabels);
    this.minimap.id = 'minimap';
    this.minimap.width = 280; this.minimap.height = 180;
    this.root.append(this.plateLayer, this.dmgLayer, top, this.vitals, this.abilities, this.channel, this.prompt,
      this.feed, this.toastEl, this.minimap, this.fps, el('div', 'crosshair'), this.respawn);
    for (const k of ['Q', 'E', 'R', 'ult']) {
      const box = el('div', 'ab');
      const icon = el('div', 'icon');
      const cd = el('div', 'cd');
      const num = el('div', 'num');
      const label = el('div', 'label');
      box.append(icon, cd, num, el('div', 'key', k === 'ult' ? 'T' : k), label);
      this.abilities.append(box);
      this.abEls[k] = { box, cd, num, label, icon };
    }
    parent.append(this.root);
  }

  setVisible(v: boolean) { this.root.classList.toggle('hidden', !v); }
  setFps(show: boolean) { this.fps.classList.toggle('hidden', !show); }
  setFpsText(t: string) { this.fps.textContent = t; }

  toast(text: string, sub = '', dur = 2.2, now = performance.now() / 1000) {
    this.toastEl.innerHTML = `${text}${sub ? `<small>${sub}</small>` : ''}`;
    this.toastEl.classList.remove('hidden');
    this.toastUntil = now + dur;
  }

  feedLine(html: string) {
    const d = el('div', '', html);
    this.feed.prepend(d);
    while (this.feed.children.length > 6) this.feed.lastChild!.remove();
    setTimeout(() => d.remove(), 7000);
  }

  damageNumber(pos: THREE.Vector3, amount: number, kind: 'normal' | 'weak' | 'taken') {
    const e = el('div', `dmg ${kind === 'normal' ? '' : kind}`, String(Math.round(amount)));
    this.dmgLayer.append(e);
    this.dmgs.push({ e, pos: pos.clone(), t: 0 });
    if (this.dmgs.length > 40) { this.dmgs.shift()!.e.remove(); }
  }

  update(w: World, me: Creature | null, cam: THREE.Camera, visible: (c: Creature) => boolean, dt: number) {
    const now = performance.now() / 1000;
    if (now > this.toastUntil) this.toastEl.classList.add('hidden');
    const myTeam = (me?.team ?? w.opts.playerTeam) as Team;
    const enemy = (1 - myTeam) as Team;
    // top: timer, phase, territory
    const left = w.overtime ? Math.max(0, w.timeLimit + econ('Overtime') * w.timeScale - w.time) : Math.max(0, w.timeLimit - w.time);
    this.timer.textContent = `${Math.floor(left / 60)}:${String(Math.floor(left % 60)).padStart(2, '0')}`;
    const names = ['Stable Flow', 'Pre-Aggro Resource Control', 'Resource Stage', 'Hunt'];
    const nextPhase = w.phase < 4 ? w.phaseStart(w.phase + 1) - w.time : 0;
    this.phase.textContent = w.overtime ? 'OVERTIME · first team to root a node wins' : `Phase ${w.phase} · ${names[w.phase - 1]}${w.phase < 4 ? ` · next in ${Math.ceil(nextPhase)}s` : w.heartOpen(enemy) ? ' · Base Hearts open' : ''}`;
    const a = w.ti(myTeam), b = w.ti(enemy);
    this.tiA.style.width = `${a * 100}%`;
    this.tiB.style.width = `${b * 100}%`;
    this.tiLabels.innerHTML = `<span>You ${(a * 100).toFixed(0)}% · ${w.sideOf(myTeam)} · SAP ${Math.floor(w.sap[myTeam])}</span><span>${(b * 100).toFixed(0)}% Enemy</span>`;

    if (me) {
      const mhp = maxHp(me);
      const lvl = me.level;
      const into = me.exp - R.expToReach(lvl);
      const need = lvl >= 20 ? 1 : R.expToReach(lvl + 1) - R.expToReach(lvl);
      const carry = me.carried;
      const tier = carry >= 300 ? 't3' : carry >= 150 ? 't2' : '';
      const forms = ['Base Form', 'Stage 1', 'Stage 2', 'Stage 3 · Ascendant'];
      this.vitals.innerHTML = `
        <div class="row"><span class="name">${R.formForLevel(lvl) === 0 ? 'Kith' : me.lineage} · ${forms[R.formForLevel(lvl)]}</span><span>Level <b>${lvl}</b></span></div>
        <div class="bar"><div class="hp" style="width:${Math.max(0, me.hp / mhp) * 100}%"></div><span>${Math.ceil(Math.max(0, me.hp))} / ${Math.round(mhp)}</span></div>
        <div class="bar"><div class="exp" style="width:${lvl >= 20 ? 100 : (into / need) * 100}%"></div><span>${lvl >= 20 ? 'MAX' : `EXP ${Math.floor(into)} / ${need}`}</span></div>
        <div class="cores"><div class="seed ${tier}"></div><span><b>${Math.floor(carry)}</b> / ${econ('Carry cap')} cores carried${carry >= 300 ? ' · <span style="color:#ff9b7a">enemies can hear you</span>' : ''}</span></div>`;
      // abilities
      for (const k of ['Q', 'E', 'R', 'ult'] as const) {
        const info = abilityInfo(me, k);
        const ab = this.abEls[k];
        const lockedText = k === 'ult' ? 'Level 20' : 'Level 3';
        ab.box.classList.toggle('locked', !info);
        ab.label.textContent = info ? info.name : lockedText;
        ab.icon.textContent = info ? (ICONS[info.name] ?? '•') : '🔒';
        const ready = me.cd[k] ?? 0;
        const remain = Math.max(0, ready - w.time);
        const broken = k === 'R' && w.time < me.weakBrokenUntil;
        ab.cd.style.height = info && remain > 0 ? `${Math.min(100, (remain / info.cd) * 100)}%` : broken ? '100%' : '0%';
        ab.num.textContent = info && remain > 0 ? String(Math.ceil(remain)) : broken ? '✕' : '';
        ab.box.classList.toggle('ready', !!info && remain <= 0 && !broken);
      }
      // channel bar
      if (me.channel) {
        const labels = { root: 'Rooting', uproot: 'Uprooting', convert: 'Converting cores', field: 'Field converting (70%)' };
        this.channel.classList.remove('hidden');
        this.channel.innerHTML = `<div>${labels[me.channel.kind]}</div><div class="bar"><div class="fill" style="width:${(me.channel.t / me.channel.dur) * 100}%;height:100%;background:var(--gold)"></div></div>`;
      } else this.channel.classList.add('hidden');
      this.prompt.classList.toggle('hidden', !!me.channel || !me.alive);
      const hint = this.interactHint(w, me);
      if (hint) this.prompt.innerHTML = hint; else this.prompt.classList.add('hidden');
      // respawn overlay
      if (!me.alive) {
        this.respawn.classList.remove('hidden');
        this.respawn.innerHTML = `<div>You were cut down</div><div style="font-size:.6em;color:var(--muted)">Budding again in ${Math.ceil(me.respawnAt - w.time)}s · your carried cores were dropped</div>`;
      } else this.respawn.classList.add('hidden');
    }
    this.drawMinimap(w, me, myTeam, visible);
    this.updatePlates(w, me, cam, visible);
    // damage numbers drift up and fade
    this.dmgs = this.dmgs.filter((d) => {
      d.t += dt;
      d.pos.y += dt * 1.5;
      this.v.copy(d.pos).project(cam);
      if (this.v.z > 1 || d.t > 1.1) { d.e.remove(); return false; }
      d.e.style.left = `${(this.v.x * 0.5 + 0.5) * window.innerWidth}px`;
      d.e.style.top = `${(-this.v.y * 0.5 + 0.5) * window.innerHeight}px`;
      d.e.style.opacity = String(1 - d.t / 1.1);
      return true;
    });
  }

  private interactHint(w: World, me: Creature): string {
    if (!me.alive) return '';
    const team = me.team as Team;
    const reach = 2.5 + w.radius(me);
    if (me.carried >= 1 && w.dist2d(me.pos, BASES[team]) <= 14) {
      return `Hold <b>F</b> to convert ${Math.floor(me.carried)} cores (${R.convertTime(w.hubsHeld(team), w.coresLost(team))}s)`;
    }
    const node = w.nodes.find((n) => w.dist2d(n.core, me.pos) <= reach + (n.hub !== null ? 3 : 0));
    if (node) {
      if (w.capturable(team, node.id)) return `Hold <b>F</b> to ${w.nodeOwner[node.id] === -1 ? 'root this node' : 'uproot this enemy node'}`;
      if (w.nodeOwner[node.id] !== team) {
        if (w.phase === 1 && Math.abs(node.core.x) < 45) return 'The centre opens in Phase 2';
        if (node.hub !== null && w.nodeOwner[node.id] !== -1) return 'This Hub is shielded: damage it below 66% first (Stage 2+)';
        return 'Not connected to your territory yet';
      }
    }
    const hub = w.hubNear(me.pos, 8 + w.radius(me));
    if (hub && w.nodeOwner[hub.node] === team && me.carried >= 1) return `Hold <b>F</b> to field-convert at this Hub (70%)`;
    return '';
  }

  private drawMinimap(w: World, me: Creature | null, myTeam: Team, visible: (c: Creature) => boolean) {
    const ctx = this.minimap.getContext('2d')!;
    const W = this.minimap.width, H = this.minimap.height;
    const sx = W / MAP_W, sz = H / MAP_D;
    const px = (x: number) => (x + HALF_W) * sx, pz = (z: number) => (z + HALF_D) * sz;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#3d3a32';
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < GRID_W * GRID_H; i++) {
      const o = w.cellOwner[i];
      if (o === -1) continue;
      const c = cellCenter(i);
      ctx.fillStyle = o === myTeam ? 'rgba(226,197,106,.45)' : 'rgba(224,69,58,.4)';
      ctx.fillRect(px(c.x) - (MAP_W / GRID_W) * sx / 2, pz(c.z) - (MAP_D / GRID_H) * sz / 2, (MAP_W / GRID_W) * sx + 0.5, (MAP_D / GRID_H) * sz + 0.5);
    }
    w.hubs.forEach((h) => {
      const o = w.nodeOwner[h.node];
      ctx.strokeStyle = o === -1 ? '#ddd' : o === myTeam ? '#e2c56a' : '#e0453a';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(px(h.pos.x), pz(h.pos.z), 5, 0, Math.PI * 2); ctx.stroke();
    });
    w.cores.forEach((c) => {
      if (!c.alive) return;
      ctx.fillStyle = c.team === myTeam ? '#e2c56a' : '#e0453a';
      ctx.fillRect(px(c.pos.x) - 3, pz(c.pos.z) - 3, 6, 6);
    });
    BASES.forEach((b, t) => {
      ctx.fillStyle = t === myTeam ? '#e2c56a' : '#e0453a';
      ctx.beginPath(); ctx.moveTo(px(b.x), pz(b.z) - 6); ctx.lineTo(px(b.x) + 6, pz(b.z) + 5); ctx.lineTo(px(b.x) - 6, pz(b.z) + 5); ctx.fill();
    });
    for (const c of w.creatures) {
      if (!c.alive || c.kind !== 'ascendant' || !visible(c)) continue;
      ctx.fillStyle = c.isPlayer ? '#fff' : c.team === myTeam ? '#e2c56a' : '#ff5a4a';
      ctx.beginPath(); ctx.arc(px(c.pos.x), pz(c.pos.z), c.isPlayer ? 4 : 3, 0, Math.PI * 2); ctx.fill();
    }
    if (me) {
      ctx.strokeStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(px(me.pos.x), pz(me.pos.z));
      ctx.lineTo(px(me.pos.x) + Math.sin(me.intent.aimYaw) * 10, pz(me.pos.z) + Math.cos(me.intent.aimYaw) * 10);
      ctx.stroke();
    }
  }

  private updatePlates(w: World, me: Creature | null, cam: THREE.Camera, visible: (c: Creature) => boolean) {
    const seen = new Set<number>();
    for (const c of w.creatures) {
      if (!c.alive || c.isPlayer || !visible(c)) continue;
      if (c.kind === 'wild' && c.hp >= maxHp(c) - 1) continue; // wildlife plates only when hurt
      const d = me ? w.dist(c.pos, me.pos) : 0;
      if (d > 70) continue;
      this.v.set(c.pos.x, c.pos.y + w.height(c) + 0.6, c.pos.z).project(cam);
      if (this.v.z > 1 || Math.abs(this.v.x) > 1.1 || Math.abs(this.v.y) > 1.1) continue;
      seen.add(c.id);
      let p = this.plates.get(c.id);
      if (!p) { p = el('div', 'plate'); this.plateLayer.append(p); this.plates.set(c.id, p); }
      const rel = c.kind === 'wild' ? 'wild' : c.team === me?.team ? 'friend' : 'foe';
      p.className = `plate ${rel}`;
      const label = c.kind === 'wild' ? c.name : `<span class="lvl">${c.level}</span> ${c.name}${c.carried >= 150 ? ` · ${Math.floor(c.carried)}◆` : ''}`;
      p.innerHTML = `${label}<div class="pbar"><div style="width:${Math.max(0, c.hp / maxHp(c)) * 100}%"></div></div>`;
      p.style.left = `${(this.v.x * 0.5 + 0.5) * window.innerWidth}px`;
      p.style.top = `${(-this.v.y * 0.5 + 0.5) * window.innerHeight}px`;
    }
    for (const [id, p] of this.plates) if (!seen.has(id)) { p.remove(); this.plates.delete(id); }
  }
}

// Title, lineage select, pause, settings (with rebinding), how-to-play and results screens.
import { DEFAULT_BINDINGS, type Action, type Settings, type Profile } from '../core/Settings';
import type { Lineage } from '../sim/tuning';
import type { Difficulty } from '../sim/World';

export interface MenuCallbacks {
  start(lineage: Lineage, difficulty: Difficulty): void;
  firstLife(lineage: Lineage): void;
  resume(): void;
  quit(): void;
  settingsChanged(s: Settings): void;
  click(): void;
}

const LINEAGES: { id: Lineage; role: string; text: string; kit: string[] }[] = [
  {
    id: 'Brawler', role: 'Diver / bruiser · the storm that commits',
    text: 'A knuckle-walking beast that dives in, wins short fights and throws smaller foes around.',
    kit: ['<b>Q · Roll Commit</b>: unstoppable roll, uppercut stagger. Exposes your chest weak point for 1 s.',
      '<b>E · Haymaker</b>: hold to charge; full charge knocks back 6 m.',
      '<b>R · Grapple</b>: grab a lower-Stage target and throw it 8 m.',
      '<b>Momentum</b>: hits build it; at 100, +15% attack speed.', '<b>T · Frenzy</b> (Aggression) or <b>Shove of the Storm</b> (Tactical) at L20.'],
  },
  {
    id: 'Titan', role: 'Juggernaut / frontline · the mountain that fights',
    text: 'A stone colossus that holds ground, protects allies and sieges structures.',
    kit: ['<b>Q · Quake Slam</b>: telegraphed ground slam, staggers everyone around you.',
      '<b>E · Bulwark</b>: −60% damage from the front for 3 s.',
      '<b>R · Rampart Charge</b>: unstoppable charge that carries up to 2 enemies.',
      '<b>Immovable</b>: can\'t be knocked back or grappled.', '<b>T · Avalanche</b> (Aggression) or <b>Fortress</b> (Tactical) at L20.'],
  },
  {
    id: 'Verdant', role: 'Territory / sustain · the root that holds',
    text: 'A bark-and-moss stag that takes ground fast, walls off paths and keeps allies alive.',
    kit: ['<b>Q · Bramble Wall</b>: a 10 m wall of thorns that blocks movement and bolts.',
      '<b>E · Sap Draw</b>: allies within 8 m heal 3% Health per second for 4 s.',
      '<b>R · Entangle</b>: after 0.6 s, roots everyone in a 3 m circle.',
      '<b>Deep Root</b>: roots nodes in 2 s; your nodes spread twice as fast.', '<b>T · Thornstorm</b> (Aggression) or <b>Overgrowth</b> (Tactical, up to 4 nodes) at L20.'],
  },
  {
    id: 'Hollow', role: 'Zone denial · the void that waits',
    text: 'A floating shape with a hole through its body that fights from 15 m and shuts down areas.',
    kit: ['<b>Basic · Void bolt</b>: ranged, 15 m. Walls stop it.',
      '<b>Q · Void Rift</b>: slows enemies 30% and cuts their Control by 40% for 4 s.',
      '<b>E · Hollow Step</b>: blink 8 m, through units and walls.',
      '<b>R · Null Pulse</b>: silences everyone around you for 1.5 s.', '<b>T · Collapse</b> (Aggression) or <b>Event Horizon</b> (Tactical) at L20.'],
  },
];

const ACTION_NAMES: Record<Action, string> = {
  forward: 'Move forward', back: 'Move back', left: 'Move left', right: 'Move right', basic: 'Basic attack',
  q: 'Ability Q', e: 'Ability E', r: 'Ability R', ult: 'Ultimate', evade: 'Evade', interact: 'Root / Convert (hold)',
  pause: 'Pause', scoreboard: 'Scoreboard', branch1: 'Branch: Aggression (L10)', branch2: 'Branch: Tactical (L10)',
};

function keyName(code: string): string {
  if (code.startsWith('Mouse')) return ['Left mouse', 'Middle mouse', 'Right mouse'][Number(code.slice(5))] ?? code;
  return code.replace(/^Key/, '').replace(/^Digit/, '').replace('Left', ' (L)').replace('Right', ' (R)');
}

export class Menus {
  private host = document.createElement('div');
  private screen: HTMLElement | null = null;
  private selected: Lineage;
  private difficulty: Difficulty = 'Normal';
  private rebinding: Action | null = null;

  constructor(parent: HTMLElement, private cb: MenuCallbacks, private getSettings: () => Settings, private getProfile: () => Profile) {
    parent.append(this.host);
    this.selected = (getProfile().lastLineage as Lineage) ?? 'Brawler';
    window.addEventListener('keydown', (e) => {
      if (!this.rebinding) return;
      e.preventDefault();
      this.applyBind(e.code);
    }, true);
    window.addEventListener('mousedown', (e) => {
      if (!this.rebinding || !(e.target as HTMLElement).closest('.binds')) return;
      if ((e.target as HTMLElement).dataset.bind) return;
      this.applyBind(`Mouse${e.button}`);
    }, true);
  }

  get open(): boolean { return this.screen !== null; }

  close() {
    this.screen?.remove();
    this.screen = null;
  }

  private show(html: string): HTMLElement {
    this.close();
    const s = document.createElement('div');
    s.className = 'screen';
    s.innerHTML = `<div class="panel">${html}</div>`;
    this.host.append(s);
    this.screen = s;
    s.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => this.cb.click()));
    return s;
  }

  title() {
    const p = this.getProfile();
    const s = this.show(`
      <h1>GREYBORN</h1>
      <div class="tag">Kills fuel evolution. Returns fuel tactical choice. Dominate the map.</div>
      <div class="menu">
        <button class="primary" data-a="play">Play · 4v4 vs bots</button>
        <button data-a="help">How to play</button>
        <button data-a="settings">Settings</button>
        <div style="margin-top:14px;color:var(--muted);font-size:.85em">Matches ${p.matches} · Wins ${p.wins} · Best level ${p.bestLevel}</div>
        <div style="margin-top:6px;color:var(--muted);font-size:.75em">Greyborn: Brood · Ashfall Crossing · Titan, Brawler, Verdant and Hollow</div>
      </div>`);
    s.querySelector('[data-a=play]')!.addEventListener('click', () => this.select());
    s.querySelector('[data-a=help]')!.addEventListener('click', () => this.help(() => this.title()));
    s.querySelector('[data-a=settings]')!.addEventListener('click', () => this.settings(() => this.title()));
    (s.querySelector('[data-a=play]') as HTMLElement).focus();
  }

  select() {
    const cards = LINEAGES.map((l) => `
      <div class="card ${l.id === this.selected ? 'sel' : ''}" data-l="${l.id}" tabindex="0">
        <h3>${l.id}</h3><div class="role">${l.role}</div><div>${l.text}</div><ul>${l.kit.map((k) => `<li>${k}</li>`).join('')}</ul>
      </div>`).join('');
    const s = this.show(`
      <h2>Choose your lineage</h2>
      <div style="color:var(--muted);margin-bottom:12px">You start as a small Kith Base Form. Your lineage awakens at Level 3. Your partner plays the other half of your pair (Titan with Brawler, Verdant with Hollow); near each other at Stage 2 you unlock a Synergy. At Level 10 you pick a branch (1 Aggression, 2 Tactical). Sides are assigned when the match starts.</div>
      <div class="cards">${cards}</div>
      <div class="difficulty" role="radiogroup" aria-label="Bot difficulty">Bots:
        ${(['Easy', 'Normal', 'Hard'] as Difficulty[]).map((d) => `<button data-d="${d}" class="${d === this.difficulty ? 'sel' : ''}" role="radio" aria-checked="${d === this.difficulty}">${d}</button>`).join('')}
      </div>
      <div class="menu" style="flex-direction:row;justify-content:center;margin-top:16px">
        <button data-a="back">Back</button>
        <button class="${this.getProfile().firstLifeDone ? '' : 'primary'}" data-a="first">First Life · tutorial (3 min)</button>
        <button class="${this.getProfile().firstLifeDone ? 'primary' : ''}" data-a="go">Bud into the world</button>
      </div>`);
    s.querySelectorAll('.card').forEach((c) => {
      const pick = () => {
        this.selected = (c as HTMLElement).dataset.l as Lineage;
        s.querySelectorAll('.card').forEach((x) => x.classList.toggle('sel', x === c));
        this.cb.click();
      };
      c.addEventListener('click', pick);
      c.addEventListener('keydown', (e) => { if ((e as KeyboardEvent).key === 'Enter') pick(); });
    });
    s.querySelectorAll<HTMLElement>('[data-d]').forEach((b) => b.addEventListener('click', () => {
      this.difficulty = b.dataset.d as Difficulty;
      s.querySelectorAll<HTMLElement>('[data-d]').forEach((x) => { x.classList.toggle('sel', x === b); x.setAttribute('aria-checked', String(x === b)); });
    }));
    s.querySelector('[data-a=back]')!.addEventListener('click', () => this.title());
    s.querySelector('[data-a=first]')!.addEventListener('click', () => { this.close(); this.cb.firstLife(this.selected); });
    s.querySelector('[data-a=go]')!.addEventListener('click', () => { this.close(); this.cb.start(this.selected, this.difficulty); });
  }

  pause() {
    const s = this.show(`
      <h2>Paused</h2>
      <div class="menu">
        <button class="primary" data-a="resume">Resume</button>
        <button data-a="help">How to play</button>
        <button data-a="settings">Settings</button>
        <button data-a="quit">Leave match</button>
      </div>`);
    s.querySelector('[data-a=resume]')!.addEventListener('click', () => { this.close(); this.cb.resume(); });
    s.querySelector('[data-a=help]')!.addEventListener('click', () => this.help(() => this.pause()));
    s.querySelector('[data-a=settings]')!.addEventListener('click', () => this.settings(() => this.pause()));
    s.querySelector('[data-a=quit]')!.addEventListener('click', () => { this.close(); this.cb.quit(); });
  }

  help(back: () => void) {
    const s = this.show(`
      <h2>How to play</h2>
      <div class="help">
        <p><b>Goal.</b> Destroy the enemy Base Heart, or hold more territory when time runs out. Holding 80% of the map for 60 s wins at once.</p>
        <p><b>Evolve.</b> Kill wildlife and enemies to collect evolution cores. Cores you carry aren't progress yet: return to your base and <b>hold F</b> to convert them into EXP. Carrying 100/200/300+ gives +10/20/30% bonus EXP, but at 150+ enemies hear you coming, and at 300+ they see you on the map.</p>
        <p><b>Grow.</b> Your lineage awakens at Level 3 (until then, cores become EXP as you collect them). Stage 2 at Level 10, Ultimate Form at Level 20. Each Stage makes you much larger and stronger.</p>
        <p><b>Territory.</b> Stand at a node's core and <b>hold F</b> to root it. Nodes must connect to your territory. Enemy nodes can be uprooted. Hubs need Stage 2 damage before they can be uprooted. A Hub gains one Defense Level for every 45 seconds your team holds it.</p>
        <p><b>Weak points.</b> Hit a Titan's back, or a Brawler's chest just after its Roll Commit, for ×1.5 damage. Enough weak-point damage breaks it: R is disabled and the target takes +10% damage.</p>
        <p><b>Phases.</b> 1: Stable Flow (the centre is closed) · 2: Hubs open · 3: Resource Stage (Enemy Cores under siege) · 4: Hunt (Base Hearts open).</p>
        <p><b>Controls.</b> WASD move · mouse look · Left click attack · Q/E/R abilities · T Ultimate · Space or Shift evade · F root/convert · Esc pause · mouse wheel zoom. Gamepad: left stick move, right stick look, X attack, LB/RB/LT abilities, Y Ultimate, A evade, B interact, Start pause.</p>
      </div>
      <div class="menu"><button data-a="back">Back</button></div>`);
    s.querySelector('[data-a=back]')!.addEventListener('click', back);
  }

  settings(back: () => void) {
    const st = this.getSettings();
    const range = (k: keyof Settings, lo: number, hi: number, step: number, label: string) =>
      `<label>${label}<input type="range" data-k="${k}" min="${lo}" max="${hi}" step="${step}" value="${st[k]}"></label>`;
    const check = (k: keyof Settings, label: string) => `<label>${label}<input type="checkbox" data-k="${k}" ${st[k] ? 'checked' : ''}></label>`;
    const binds = (Object.keys(DEFAULT_BINDINGS) as Action[]).map((a) =>
      `<div style="display:flex;justify-content:space-between;align-items:center">${ACTION_NAMES[a]}<button data-bind="${a}">${st.bindings[a].map(keyName).join(' / ')}</button></div>`).join('');
    const s = this.show(`
      <h2>Settings</h2>
      <div class="settings">
        ${range('masterVolume', 0, 1, 0.05, 'Master volume')}
        ${range('musicVolume', 0, 1, 0.05, 'Music volume')}
        ${range('sfxVolume', 0, 1, 0.05, 'Effects volume')}
        ${range('mouseSensitivity', 0.2, 3, 0.05, 'Look sensitivity')}
        ${range('fov', 50, 90, 1, 'Field of view')}
        ${range('uiScale', 0.8, 1.5, 0.05, 'UI scale')}
        ${range('shakeScale', 0, 1, 0.05, 'Camera shake')}
        ${range('gamepadDeadzone', 0.05, 0.4, 0.01, 'Gamepad dead zone')}
        ${check('invertY', 'Invert look Y')}
        ${check('reduceMotion', 'Reduce motion (less shake and particles)')}
        ${check('colorBlind', 'Colour-blind friendly team colours')}
        ${check('showFps', 'Show performance stats')}
        ${check('shortMatch', 'Standard match, 12:30 (untick for the 25:00 long test match)')}
        <label>Graphics quality<select data-k="quality">${['low', 'medium', 'high'].map((q) => `<option ${st.quality === q ? 'selected' : ''}>${q}</option>`).join('')}</select></label>
      </div>
      <h2 style="margin-top:16px;font-size:1.1em">Controls <span style="font-size:.7em;color:var(--muted)">(click a binding, then press a key or mouse button)</span></h2>
      <div class="binds">${binds}</div>
      <div class="menu" style="flex-direction:row;justify-content:center;margin-top:14px">
        <button data-a="reset">Reset controls</button><button class="primary" data-a="back">Done</button>
      </div>`);
    s.querySelectorAll('input, select').forEach((inp) => inp.addEventListener('input', () => {
      const i = inp as HTMLInputElement;
      const k = i.dataset.k as keyof Settings;
      const next = { ...this.getSettings() } as Record<string, unknown>;
      next[k] = i.type === 'checkbox' ? i.checked : i.tagName === 'SELECT' ? i.value : Number(i.value);
      this.cb.settingsChanged(next as unknown as Settings);
    }));
    s.querySelectorAll('[data-bind]').forEach((b) => b.addEventListener('click', (e) => {
      e.stopPropagation();
      this.rebinding = (b as HTMLElement).dataset.bind as Action;
      (b as HTMLElement).textContent = 'Press a key…';
    }));
    s.querySelector('[data-a=reset]')!.addEventListener('click', () => {
      this.cb.settingsChanged({ ...this.getSettings(), bindings: structuredClone(DEFAULT_BINDINGS) });
      this.settings(back);
    });
    s.querySelector('[data-a=back]')!.addEventListener('click', back);
    (this as unknown as { lastBack: () => void }).lastBack = back;
  }

  private applyBind(code: string) {
    const a = this.rebinding!;
    this.rebinding = null;
    if (code === 'Escape' && a !== 'pause') { this.settings((this as unknown as { lastBack: () => void }).lastBack); return; }
    const st = this.getSettings();
    const bindings = structuredClone(st.bindings);
    // a key can only do one thing: remove it from other actions
    for (const k of Object.keys(bindings) as Action[]) bindings[k] = bindings[k].filter((c) => c !== code);
    bindings[a] = [code, ...bindings[a].filter((c) => c !== code)].slice(0, 2);
    for (const k of Object.keys(bindings) as Action[]) if (!bindings[k].length) bindings[k] = [...DEFAULT_BINDINGS[k]].filter((c) => c !== code).slice(0, 1);
    this.cb.settingsChanged({ ...st, bindings });
    this.settings((this as unknown as { lastBack: () => void }).lastBack);
  }

  results(win: boolean | null, how: string, rows: string, again: () => void) {
    const title = win === null ? 'Draw' : win ? 'Victory' : 'Defeat';
    const s = this.show(`
      <h2 class="${win ? 'win' : 'loss'}" style="font-size:2em;text-align:center">${title}</h2>
      <div style="text-align:center;color:var(--muted)">${how}</div>
      <table class="stats"><tr><th>Ascendant</th><th>Lineage</th><th>Level</th><th>Kills</th><th>Deaths</th></tr>${rows}</table>
      <div class="menu" style="flex-direction:row;justify-content:center">
        <button data-a="title">Title</button><button class="primary" data-a="again">Play again</button>
      </div>`);
    s.querySelector('[data-a=title]')!.addEventListener('click', () => this.title());
    s.querySelector('[data-a=again]')!.addEventListener('click', () => { this.close(); again(); });
  }
}

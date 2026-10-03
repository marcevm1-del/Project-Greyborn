// Player settings and profile, persisted to localStorage with versioning and
// validation. Stored data is never trusted: every field is checked and clamped,
// and corrupt data falls back to defaults.

export type Action = 'forward' | 'back' | 'left' | 'right' | 'basic' | 'q' | 'e' | 'r' | 'ult' | 'evade' | 'interact' | 'pause' | 'scoreboard';

export interface Settings {
  version: number;
  masterVolume: number;   // 0..1
  musicVolume: number;
  sfxVolume: number;
  mouseSensitivity: number; // 0.2..3
  invertY: boolean;
  fov: number;            // 50..90
  reduceMotion: boolean;  // less camera shake and fewer particles
  shakeScale: number;     // 0..1
  colorBlind: boolean;    // stronger friend/foe outlines and icon shapes
  uiScale: number;        // 0.8..1.5
  quality: 'low' | 'medium' | 'high';
  showFps: boolean;
  shortMatch: boolean;
  gamepadDeadzone: number; // 0.05..0.4
  bindings: Record<Action, string[]>;
}

export const SETTINGS_VERSION = 1;
const KEY = 'greyborn.settings';
const PROFILE_KEY = 'greyborn.profile';

export const DEFAULT_BINDINGS: Record<Action, string[]> = {
  forward: ['KeyW', 'ArrowUp'],
  back: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  basic: ['Mouse0'],
  q: ['KeyQ'],
  e: ['KeyE', 'Mouse2'],
  r: ['KeyR'],
  ult: ['KeyT'],
  evade: ['Space', 'ShiftLeft'],
  interact: ['KeyF'],
  pause: ['Escape', 'KeyP'],
  scoreboard: ['Tab'],
};

export function defaultSettings(): Settings {
  return {
    version: SETTINGS_VERSION,
    masterVolume: 0.8, musicVolume: 0.5, sfxVolume: 0.9,
    mouseSensitivity: 1, invertY: false, fov: 62,
    reduceMotion: false, shakeScale: 1, colorBlind: false, uiScale: 1,
    quality: 'high', showFps: false, shortMatch: true, gamepadDeadzone: 0.15,
    bindings: structuredClone(DEFAULT_BINDINGS),
  };
}

function num(v: unknown, lo: number, hi: number, d: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d;
}
function bool(v: unknown, d: boolean): boolean {
  return typeof v === 'boolean' ? v : d;
}

/** Validates untrusted data into Settings; unknown or broken fields fall back to defaults. */
export function sanitize(raw: unknown): Settings {
  const d = defaultSettings();
  if (!raw || typeof raw !== 'object') return d;
  const r = raw as Record<string, unknown>;
  const bindings = structuredClone(DEFAULT_BINDINGS);
  if (r.bindings && typeof r.bindings === 'object') {
    for (const a of Object.keys(DEFAULT_BINDINGS) as Action[]) {
      const b = (r.bindings as Record<string, unknown>)[a];
      if (Array.isArray(b) && b.length && b.every((k) => typeof k === 'string' && k.length < 32)) bindings[a] = b.slice(0, 3) as string[];
    }
  }
  return {
    version: SETTINGS_VERSION,
    masterVolume: num(r.masterVolume, 0, 1, d.masterVolume),
    musicVolume: num(r.musicVolume, 0, 1, d.musicVolume),
    sfxVolume: num(r.sfxVolume, 0, 1, d.sfxVolume),
    mouseSensitivity: num(r.mouseSensitivity, 0.2, 3, d.mouseSensitivity),
    invertY: bool(r.invertY, d.invertY),
    fov: num(r.fov, 50, 90, d.fov),
    reduceMotion: bool(r.reduceMotion, d.reduceMotion),
    shakeScale: num(r.shakeScale, 0, 1, d.shakeScale),
    colorBlind: bool(r.colorBlind, d.colorBlind),
    uiScale: num(r.uiScale, 0.8, 1.5, d.uiScale),
    quality: r.quality === 'low' || r.quality === 'medium' || r.quality === 'high' ? r.quality : d.quality,
    showFps: bool(r.showFps, d.showFps),
    shortMatch: bool(r.shortMatch, d.shortMatch),
    gamepadDeadzone: num(r.gamepadDeadzone, 0.05, 0.4, d.gamepadDeadzone),
    bindings,
  };
}

function storage(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}

export function loadSettings(): Settings {
  try {
    const raw = storage()?.getItem(KEY);
    return raw ? sanitize(JSON.parse(raw)) : defaultSettings();
  } catch {
    return defaultSettings(); // corrupt JSON or blocked storage
  }
}

export function saveSettings(s: Settings): boolean {
  try { storage()?.setItem(KEY, JSON.stringify(s)); return true; } catch { return false; }
}

// ---------------------------------------------------------------- profile (match history)
export interface Profile {
  version: number;
  matches: number;
  wins: number;
  bestLevel: number;
  totalKills: number;
  lastLineage: string;
}

export function sanitizeProfile(raw: unknown): Profile {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  return {
    version: 1,
    matches: Math.floor(num(r.matches, 0, 1e6, 0)),
    wins: Math.floor(num(r.wins, 0, 1e6, 0)),
    bestLevel: Math.floor(num(r.bestLevel, 1, 20, 1)),
    totalKills: Math.floor(num(r.totalKills, 0, 1e7, 0)),
    lastLineage: r.lastLineage === 'Titan' || r.lastLineage === 'Brawler' ? r.lastLineage : 'Brawler',
  };
}

export function loadProfile(): Profile {
  try {
    const raw = storage()?.getItem(PROFILE_KEY);
    return sanitizeProfile(raw ? JSON.parse(raw) : null);
  } catch {
    return sanitizeProfile(null);
  }
}

export function saveProfile(p: Profile): boolean {
  try { storage()?.setItem(PROFILE_KEY, JSON.stringify(p)); return true; } catch { return false; }
}

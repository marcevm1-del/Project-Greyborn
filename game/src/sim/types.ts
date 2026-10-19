import type { Lineage } from './tuning';
import type { Branch } from './lineages/types';
import type { SynergyState } from './lineages/synergies';
import type { Team, Vec2 } from './map';

export type Side = 'Wildborn' | 'Blightborn';
export type Slot = 'Q' | 'E' | 'R';

export interface Intent {
  move: Vec2;          // desired direction in world space, length 0..1
  aimYaw: number;      // where the creature aims (radians, 0 = +z)
  basic: boolean;
  q: boolean;
  e: boolean;          // held: Haymaker charges while held
  r: boolean;
  evade: boolean;
  interact: boolean;   // held: Root / Uproot / Convert
  ult: boolean;        // Ultimate Form ability (L20)
  branch: Branch | null; // branch choice at Stage 2 (Level 10); applied once
}

export function emptyIntent(): Intent {
  return { move: { x: 0, z: 0 }, aimYaw: 0, basic: false, q: false, e: false, r: false, evade: false, interact: false, ult: false, branch: null };
}

export interface Cast {
  slot: Slot | 'basic' | 'evade' | 'ult';
  t: number;          // seconds since cast start
  dir: Vec2;          // committed direction
  charge?: number;    // Haymaker charge seconds
  hit?: Set<number>;  // creatures already hit by this cast
  carried?: number[]; // Rampart Charge / Grapple victims
  done?: boolean;
}

export interface Channel {
  kind: 'root' | 'uproot' | 'convert' | 'field';
  node?: number;
  t: number;
  dur: number;
}

export interface Creature {
  id: number;
  kind: 'ascendant' | 'wild';
  team: Team | -1;          // -1 = wildlife
  name: string;
  lineage: Lineage;         // wildlife use 'Titan' as a stat placeholder (unused)
  branch: Branch | null;    // chosen at Level 10 (Stage 2); decides the Ultimate
  species?: string;
  isPlayer: boolean;
  partner: number | null;

  pos: { x: number; y: number; z: number };
  vel: { x: number; y: number; z: number };   // knockback / airborne velocity
  yaw: number;
  grounded: boolean;
  moveSpeed: number;        // current horizontal speed (for animation)

  level: number;
  exp: number;
  hp: number;
  maxHpOverride?: number;   // wildlife
  alive: boolean;
  respawnAt: number;
  transformUntil: number;

  carried: number;
  wildCores: number;        // wildlife cores taken this match (for the income cap)

  // crowd control
  stunUntil: number;
  staggerUntil: number;
  rootUntil: number;
  slowUntil: number;
  slowPct: number;
  airborneUntil: number;
  ccImmuneUntil: number;
  unstoppableUntil: number;
  invulnUntil: number;
  bulwarkUntil: number;
  chestExposedUntil: number;
  grabbedBy: number | null;
  landingBy?: number;       // thrown by Grapple: takes landing damage from this creature
  landingStagger?: number;  // ...and is staggered this long on landing

  cd: Record<string, number>;  // ready-at times
  cast: Cast | null;
  channel: Channel | null;
  momentum: number;
  ultUntil: number;
  fortressUntil: number;    // Titan Ultimate (Tactical)
  syn: SynergyState;        // pair Synergy bookkeeping

  weakDamage: number;
  weakLastHit: number;
  weakBrokenUntil: number;

  lastDamagedAt: number;
  lastCombatAt: number;
  lastAttacker: number | null;
  assists: Map<number, number>; // attacker id -> last damage time

  intent: Intent;

  // wildlife
  campId?: number;
  homePos?: Vec2;
  wildState?: 'idle' | 'wander' | 'flee' | 'attack' | 'return' | 'burrow' | 'duel';
  wildTarget?: number | null;
  wildTimer?: number;
  wildSpeed?: number;       // set by the wildlife AI each tick

  // stats for UI
  kills: number;
  deaths: number;
}

export type GameEvent =
  | { type: 'hit'; source: number; target: number; amount: number; weak: boolean; pos: Vec2 & { y: number } }
  | { type: 'death'; id: number; killer: number | null; pos: Vec2 & { y: number } }
  | { type: 'ability'; id: number; name: string; pos: Vec2 & { y: number }; yaw: number; radius: number }
  | { type: 'telegraph'; id: number; pos: Vec2 & { y: number }; radius: number; time: number }
  | { type: 'levelup'; id: number; level: number }
  | { type: 'transform'; id: number; form: number }
  | { type: 'capture'; node: number; team: Team | -1; by: number }
  | { type: 'convert'; id: number; exp: number; field: boolean }
  | { type: 'pickup'; id: number; amount: number; pos: Vec2 & { y: number } }
  | { type: 'structure'; kind: 'hub' | 'core' | 'heart'; index: number; team: Team | -1; destroyed: boolean }
  | { type: 'phase'; phase: number }
  | { type: 'evade'; id: number }
  | { type: 'weakbreak'; id: number }
  | { type: 'branch'; id: number; branch: Branch }
  | { type: 'synergy'; id: number; partner: number; name: string; pos: Vec2 & { y: number } }
  | { type: 'swing'; id: number; pos: Vec2 & { y: number }; yaw: number }
  | { type: 'end'; winner: Team | null; how: string };

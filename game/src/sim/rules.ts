// Pure game formulas from spec/01-conventions.md and spec/05-economy.md.
// No state, no rendering: everything here is unit-tested.
import { T, econ } from './tuning';

export const TICK_HZ = 30;
export const DT = 1 / TICK_HZ;
export const BASE_SPEED = 5.0; // m/s at Speed 100%

/** Form index: 0 Base Form (L1–2), 1 Stage 1 (L3–9), 2 Stage 2 (L10–19), 3 Stage 3 (L20). */
export function formForLevel(level: number): 0 | 1 | 2 | 3 {
  return level >= 20 ? 3 : level >= 10 ? 2 : level >= 3 ? 1 : 0;
}
/** The spec's "Stage" number (1–3); Base Form counts as Stage 1. */
export function stageForLevel(level: number): 1 | 2 | 3 {
  return level >= 20 ? 3 : level >= 10 ? 2 : 1;
}

export const FORM_HEIGHT = [1.0, 2.0, 4.0, 7.5];
export const FORM_RADIUS = [0.35, 0.7, 1.3, 2.4];
export const FORM_CAMERA = [5, 7, 10, 15];
/** Area/range scaling by Stage (Spec 01): Stage 1 ×1.0 · Stage 2 ×1.25 · Stage 3 ×1.6. */
export function areaScale(level: number): number {
  return [1, 1, 1.25, 1.6][formForLevel(level)];
}

export function expToNext(level: number): number {
  return level >= 20 ? Infinity : T.expToNext[level - 1];
}
export function expToReach(level: number): number {
  let total = 0;
  for (let l = 1; l < level; l++) total += T.expToNext[l - 1];
  return total;
}
export function levelForExp(exp: number): number {
  let level = 1;
  while (level < 20 && exp >= expToReach(level + 1)) level++;
  return level;
}

/** Ability or basic damage: Base + Ratio × Power. */
export function abilityDamage(base: number, ratio: number, power: number): number {
  return base + ratio * power;
}

/** Multiplicative damage reduction, capped at 75%. */
export function combineReduction(...parts: number[]): number {
  let keep = 1;
  for (const p of parts) keep *= 1 - Math.max(0, Math.min(1, p));
  return Math.min(0.75, 1 - keep);
}

export function tenacity(level: number): number {
  return Math.min(0.28, 0.02 * Math.max(0, Math.min(level, 15) - 1));
}

/** final = base × (1 + Control/200) × (1 − Tenacity) */
export function ccDuration(base: number, casterControl: number, targetTenacity: number): number {
  return base * (1 + casterControl / 200) * (1 - targetTenacity);
}

export const WEAK_POINT_MULT = 1.5;
export const WEAK_BREAK_SHARE = 0.2; // weak-point damage ≥ 20% max Health breaks it
export const CC_IMMUNITY = 1.5;

export function aggressionBonus(carried: number): number {
  const step = econ('Aggression bonus per full 100 carried');
  return Math.min(econ('Aggression bonus cap'), Math.floor(carried / 100) * step);
}

/** EXP from converting `carried` cores (Spec 05 §4). */
export function conversionExp(carried: number, opts: { field?: boolean; partnerSync?: boolean } = {}): number {
  if (opts.field) return carried * econ('Field conversion efficiency');
  const bonus = aggressionBonus(carried) + (opts.partnerSync ? econ('Evolution-Sync Resonance') : 0);
  return carried * (1 + bonus);
}

export function convertTime(hubsHeld: number, coresLost: number): number {
  const times = [econ('C1 conversion (0–1 Hubs)'), econ('C2 conversion (2 Hubs)'), econ('C3 conversion (3+ Hubs)')];
  const tier = (hubsHeld >= 3 ? 2 : hubsHeld === 2 ? 1 : 0) - coresLost;
  return tier < 0 ? econ('Conversion floor after Core losses') : times[tier];
}

export function bounty(victimLevel: number): number {
  return T.expParams['Bounty base'] + T.expParams['Bounty per level'] * victimLevel;
}

export function respawnTime(level: number, phase: number): number {
  const p = T.expParams;
  return p['Respawn base (s)'] + p['Respawn per level (s)'] * level + (phase === 4 ? p['Phase 4 respawn extra (s)'] : 0);
}

/** Passive cores per second per player (Spec 05 §3). `ti` is a fraction. */
export function passiveIncome(ti: number, coresLost: number): number {
  return econ('Passive income factor') * ti * (1 - econ('Passive loss per Enemy Core lost') * coresLost);
}

/** TI = cells/total + 3 points per Hub, capped at 100%. */
export function territorialInfluence(cellsHeld: number, totalCells: number, hubsHeld: number): number {
  return Math.min(1, cellsHeld / totalCells + (hubsHeld * econ('TI per Hub held')) / 100);
}

export function rootChannel(control: number, verdant = false): number {
  const base = verdant ? econ('Root channel (Verdant)') : econ('Root channel');
  return base * (1 - Math.min(0.5, control / 200));
}

export function uprootPerCell(synergyTier: number): number {
  return [5, 5, 4, 3][Math.max(0, Math.min(3, synergyTier))];
}

/** Footstep hearing range in metres (Spec 01 sound signatures). */
export function footstepRange(level: number, carried: number): number {
  const base = [15, 25, 40, 70][formForLevel(level)];
  return base + (carried >= 300 ? 30 : carried >= 150 ? 15 : 0);
}

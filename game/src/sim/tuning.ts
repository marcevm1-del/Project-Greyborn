// Typed access to the tuning data exported from spec/greyborn-tuning.xlsx.
// Regenerate with `npm run data` after changing the workbook.
import raw from '../data/tuning.json';
import overrides from '../data/playtest-overrides.json';

export type Lineage = 'Titan' | 'Brawler' | 'Verdant' | 'Hollow' | 'Thornrunner' | 'Bonespire' | 'Stillheart';
export type StatName = 'Health' | 'Power' | 'Speed %' | 'Control';

export interface AbilityRow { slot: 'Q' | 'E' | 'R'; name: string; base: number | null; ratio: number | null; cd: number | null }
export interface CreatureRow { name: string; group: string; tier: string; health: number | null; cores: number; sap: number }

interface TuningData {
  stats: Record<string, Record<StatName, number[]>>;
  expToNext: number[];
  expParams: Record<string, number>;
  basic: Record<string, { ratio: number; rate: number }>;
  abilities: Record<string, AbilityRow[]>;
  creatures: CreatureRow[];
  phaseMult: number[];
  affinityMult: number;
  econ: Record<string, number>;
  tension: Record<string, number>;
  phaseSynergy: Record<string, (number | null)[]>;
}

export const T = raw as unknown as TuningData;

/** Playtest overrides (see data/playtest-overrides.json): applied once at load, then logged. */
export const APPLIED_OVERRIDES: Record<string, { spec: number; playtest: number }> = {};
for (const [k, v] of Object.entries(overrides.econ as Record<string, number>)) {
  if (!(k in T.econ)) throw new Error(`playtest override for unknown economy value "${k}"`);
  APPLIED_OVERRIDES[k] = { spec: T.econ[k], playtest: v };
  T.econ[k] = v;
}
for (const [k, v] of Object.entries(overrides.expParams as Record<string, number>)) {
  if (!(k in T.expParams)) throw new Error(`playtest override for unknown EXP parameter "${k}"`);
  APPLIED_OVERRIDES[k] = { spec: T.expParams[k], playtest: v };
  T.expParams[k] = v;
}
if ('EXP base' in overrides.expParams || 'EXP per level' in overrides.expParams) {
  T.expToNext = T.expToNext.map((_, i) => T.expParams['EXP base'] + T.expParams['EXP per level'] * (i + 1));
}

/** Stat value for a lineage at a level (1–20). */
export function stat(lineage: Lineage, name: StatName, level: number): number {
  const lv = Math.max(1, Math.min(20, Math.round(level)));
  return T.stats[lineage][name][lv - 1];
}

/** Ability row (base, ratio, cooldown) by lineage and slot. */
export function ability(lineage: Lineage, slot: 'Q' | 'E' | 'R'): AbilityRow {
  const row = T.abilities[lineage]?.find((a) => a.slot === slot);
  if (!row) throw new Error(`No ${slot} ability for ${lineage} in tuning data`);
  return row;
}

export function econ(name: string): number {
  const v = T.econ[name];
  if (v === undefined) throw new Error(`Unknown economy parameter "${name}"`);
  return v;
}

export function creatureRow(name: string): CreatureRow {
  const row = T.creatures.find((c) => c.name === name);
  if (!row) throw new Error(`Unknown creature "${name}"`);
  return row;
}

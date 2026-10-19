// The lineage registry: the only place that knows which lineages exist.
// Version B ("Greyborn: Brood", audit/GAME_DESIGN_DOCUMENT.md) ships four.
import type { Lineage } from '../tuning';
import type { Creature } from '../types';
import { Titan } from './titan';
import { Brawler } from './brawler';
import type { LineageDef } from './types';

export const LINEAGES: Partial<Record<Lineage, LineageDef>> = { Titan, Brawler };

/** Lineages a player or bot can pick, in draft order. */
export const PLAYABLE: Lineage[] = Object.keys(LINEAGES) as Lineage[];

export function lineageDef(name: Lineage): LineageDef {
  const d = LINEAGES[name];
  if (!d) throw new Error(`Lineage ${name} is not in the registry`);
  return d;
}

/** The lineage module of an Ascendant. */
export function lin(c: Creature): LineageDef {
  return lineageDef(c.lineage);
}

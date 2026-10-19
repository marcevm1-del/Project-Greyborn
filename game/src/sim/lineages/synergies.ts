// Pair Synergies, Version B rule (audit D-04): a Synergy is available when both
// partners are alive, Stage 2+ and within 15 m, with one fixed cooldown per pair.
// No Synergy XP, no S1–S3 tiers, no phase access matrix.
import * as R from '../rules';
import { econ } from '../tuning';
import { applyCC } from '../combat';
import { addZone } from '../fields';
import type { Team, Vec2 } from '../map';
import type { Creature } from '../types';
import type { World } from '../World';
import { lin } from './registry';

/** Per-creature Synergy bookkeeping. */
export interface SynergyState {
  slamAt: number;           // Titan: time of the last Quake Slam impact while Smash & Roll was available
  slamTargets: number[];    // creatures that Slam staggered
  slamChecked: boolean;     // commitment rule already resolved for that Slam
  rollTargets: number[];    // Brawler: Slam targets this Roll Commit can launch
  markUntil: number;        // target: takes extra damage from the pair until this time
  markBy: number[];
}

export function emptySynergy(): SynergyState {
  return { slamAt: -99, slamTargets: [], slamChecked: true, rollTargets: [], markUntil: 0, markBy: [] };
}

/** Name of the Synergy a pair shares, if any. */
export function synergyName(c: Creature): string | null {
  return { Commit: 'Smash & Roll', RootVoid: 'Void Garden' }[lin(c).pair] ?? null;
}

export function partnerOf(w: World, c: Creature): Creature | null {
  return c.partner === null ? null : w.creatures[c.partner];
}

function pairKey(c: Creature): number { return Math.min(c.id, c.partner ?? c.id); }

/** Is the pair's Synergy ready to fire right now (partner alive, both Stage 2+, within range, off cooldown)? */
export function synergyReady(w: World, c: Creature): boolean {
  const p = partnerOf(w, c);
  if (!p || !c.alive || !p.alive || !synergyName(c)) return false;
  if (R.formForLevel(c.level) < 2 || R.formForLevel(p.level) < 2) return false;
  if (w.dist(c.pos, p.pos) > econ('Synergy range')) return false;
  return w.time >= (w.pairReadyAt.get(pairKey(c)) ?? 0);
}

/** Seconds until the pair's Synergy cooldown ends (0 if ready). */
export function synergyCooldownLeft(w: World, c: Creature): number {
  return Math.max(0, (w.pairReadyAt.get(pairKey(c)) ?? 0) - w.time);
}

function fire(w: World, c: Creature, name: string) {
  w.pairReadyAt.set(pairKey(c), w.time + econ('Synergy cooldown'));
  w.emit({ type: 'synergy', id: c.id, partner: c.partner ?? -1, name, pos: { ...c.pos } });
}

// ------------------------------------------------------------ Smash & Roll (Titan + Brawler)

/** Titan: Quake Slam staggered these targets. */
export function onSlam(w: World, titan: Creature, targets: number[]) {
  if (!synergyReady(w, titan) || !targets.length) return;
  titan.syn.slamAt = w.time;
  titan.syn.slamTargets = targets;
  titan.syn.slamChecked = false;
}

/** Brawler: Roll Commit started. Arms the launch if the partner Slammed within the window. */
export function onRollStart(w: World, brawler: Creature) {
  brawler.syn.rollTargets = [];
  const titan = partnerOf(w, brawler);
  if (!titan || !synergyReady(w, brawler)) return;
  if (titan.syn.slamChecked || w.time - titan.syn.slamAt > econ('Synergy follow-up window')) return;
  titan.syn.slamChecked = true; // the Brawler followed up: no commitment penalty
  brawler.syn.rollTargets = titan.syn.slamTargets;
}

/** Brawler: the uppercut hit `tgt`. Launches it if it was one of the Slam's targets. */
export function onRollHit(w: World, brawler: Creature, tgt: Creature) {
  if (!brawler.syn.rollTargets.includes(tgt.id)) return;
  const titan = partnerOf(w, brawler)!;
  const first = w.time >= (w.pairReadyAt.get(pairKey(brawler)) ?? 0);
  applyCC(w, brawler, tgt, 'airborne', econ('Smash & Roll airborne'));
  tgt.syn.markUntil = w.time + econ('Synergy mark duration');
  tgt.syn.markBy = [brawler.id, titan.id];
  if (first) {
    fire(w, brawler, 'Smash & Roll');
    brawler.momentum = Math.min(100, brawler.momentum + econ('Smash & Roll Momentum'));
    if (titan.cd.Q !== undefined) titan.cd.Q = w.time + (titan.cd.Q - w.time) * (1 - econ('Smash & Roll Slam refund'));
  }
}

/** Extra damage a marked target takes from the pair that marked it. */
export function synergyDamageMult(w: World, src: Creature, tgt: Creature): number {
  return w.time < tgt.syn.markUntil && tgt.syn.markBy.includes(src.id) ? 1 + econ('Synergy mark damage bonus') : 1;
}

/** Runs every tick: the Smash & Roll commitment rule. */
export function synergyTick(w: World) {
  for (const c of w.creatures) {
    const s = c.syn;
    if (s.slamChecked || w.time - s.slamAt <= econ('Synergy follow-up window')) continue;
    s.slamChecked = true;
    // the Brawler didn't follow up: this Slam's cooldown is +50%
    const cd = c.cd.Q ?? 0;
    if (cd > w.time) c.cd.Q = cd + (cd - s.slamAt) * econ('Commitment Slam penalty');
  }
}

// ------------------------------------------------------------ Void Garden (Verdant + Hollow)

/** Opens a Void Garden at `pos` if the pair's Synergy is ready. Triggers: a Void Rift opens on
 *  ground the Verdant rooted, or the Verdant finishes a root inside the Hollow's Rift. */
export function tryVoidGarden(w: World, c: Creature, pos: Vec2): boolean {
  if (synergyName(c) !== 'Void Garden' || !synergyReady(w, c)) return false;
  addZone(w, {
    kind: 'garden', team: c.team as Team, owner: c.id, pos: { ...pos }, r: econ('Void Garden radius'),
    start: w.time, until: w.time + econ('Void Garden duration'), controlLoss: econ('Void Garden Control loss'),
  });
  fire(w, c, 'Void Garden');
  return true;
}

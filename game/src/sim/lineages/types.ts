// The contract every lineage module implements (audit/TECH_STACK.md, "The lineage registry").
// Lineage-specific behaviour lives only in sim/lineages/; the rest of the sim asks the registry.
import type { Lineage } from '../tuning';
import type { Cast, Creature, Slot } from '../types';
import type { World } from '../World';
import type { Vec2 } from '../map';

export type Branch = 'Aggression' | 'Tactical';
export type Pair = 'Commit' | 'RootVoid';

/** Values the cast system computes once per tick for the active ability. */
export interface CastCtx {
  P: number;          // caster Power
  scale: number;      // Stage area scaling
  r0: number;         // caster radius
  now: number;
  dmg: number;        // base + ratio × P from the tuning row (0 if the row has no damage)
  end(): void;
  front(dist: number): Vec2;
}

/** What a lineage's bot logic may read and set on its brain. */
export interface BotCtx {
  ready(slot: string): boolean;
  scale: number;
  /** Time until which a charged ability is held before release. */
  holdUntil: number;
}

export interface LineageDef {
  name: Lineage;
  pair: Pair;
  /** Multipliers on the Stage capsule radius and model height (Spec 01: Titan ×1.3 height). */
  sizeMul: { radius: number; height: number };
  /** Basic attack melee reach in metres before Stage scaling. */
  basicRange: number;
  /** Passive: immune to knockback, carrying and Grapple once awakened. */
  immovable: boolean;
  /** An ability held to charge: its cooldown starts on release, and the caster moves at half speed. */
  chargedSlot?: Slot;
  ultimates: Record<Branch, string>;

  /** Is `src` (at `off` radians from the target's facing, 0 = in front) able to hit the weak point? */
  weakPointExposed(w: World, src: Creature, tgt: Creature, off: number): boolean;
  /** Should the weak point glow as exposed right now (for the renderer)? */
  weakPointLit(c: Creature, time: number): boolean;
  /** Attack-rate multiplier for basic attacks (e.g. Momentum, Frenzy). */
  attackRateMult?(w: World, c: Creature): number;
  /** Extra damage reduction the target gets against `src` (0..1). */
  damageReduction?(w: World, tgt: Creature, src: Creature): number;
  /** Damage reduction this creature (`protector`) gives a nearby ally `tgt` against `src` (0..1). */
  allyDamageReduction?(w: World, protector: Creature, tgt: Creature, src: Creature): number;
  /** Called after this lineage's creature deals damage. */
  onDealtDamage?(w: World, src: Creature, tgt: Creature, amount: number): void;
  /** Runs every tick for living creatures of this lineage. */
  tick?(w: World, c: Creature, dt: number): void;
  /** Advances a Q / E / R cast. */
  cast(w: World, c: Creature, cast: Cast, ctx: CastCtx, dt: number): void;
  /** Advances the Ultimate cast (`name` is the creature's chosen Ultimate). */
  ult(w: World, c: Creature, cast: Cast, name: string, dt: number): void;

  bot: {
    /** Bonus to the bot's capture score (Titans like holding ground). */
    captureBias: number;
    /** Sets Q / E / R intents against target `t` at distance `d`. */
    useAbilities(w: World, c: Creature, t: Creature | null, d: number, b: BotCtx): void;
  };
}

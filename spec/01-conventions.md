# Spec 01 — Conventions, Formulas & Core Rules

This is the rulebook every other spec file depends on. All values are
**starting values for playtesting**, consistent with the design document
(`gdd/`). Where the GDD and this spec disagree, the GDD's decisions win and
this spec is corrected.

## Units

| Quantity | Unit |
|---|---|
| Distance, range, radius | metres (m) |
| Time, duration, cooldown | seconds (s) |
| Health, damage, healing | points |
| Speed | metres per second (m/s); stats express it as % of base |
| Rates | per second (/s) |
| Angles | degrees (°) |

**Server tick:** 30 Hz. **Client prediction** for movement and dodges.
All timings below are rounded to the nearest tick (0.033 s).

## Core stats

Every creature has four stats (source pages, p. 121).

| Stat | Meaning | Base Form (L1) |
|---|---|---|
| **Health** | Damage it can take before dying | 600 |
| **Power** | Scales all damage and healing | 40 |
| **Speed** | Movement, as % of the base speed (5.0 m/s) | 100% |
| **Control** | Scales crowd-control duration and capture speed | 10 |

Per-level values for each lineage are in the tuning spreadsheet
(`greyborn-tuning.xlsx`, sheet *Stats by level*). Growth is an S-curve
between the L1, L10 and L20 anchors in `gdd/02-ascendant-roster.md`:

```
stat(L) = L1 + (L20 − L1) × S(L)
S(L) = smoothstep over L = 1..20, weighted so L10 lands on the L10 anchor
```

The spreadsheet stores the resulting value for every level directly, so
engineers never need to re-derive it.

## Damage

```
ability damage = Base + Ratio × Power
basic attack damage = Basic ratio × Power
```

- **Weak-point hits** deal ×1.5 damage (×2.0 for Spire Lance on an *exposed* weak point; see Spec 02).
- **Damage reduction** stacks **multiplicatively**: two 30% reductions = 51% total, not 60%.
- **Maximum damage reduction:** 75%.
- **Damage over time** (bleed, burn) ticks every 0.5 s and can't crit or hit weak points.
- **No critical hits.** Damage is predictable; weak points are the skill.

## Healing

```
heal = Base + Ratio × Power (of the healer)
```

- **Maximum healing received:** 5% of max Health per second from all sources combined (stops unkillable stacks).
- **Out-of-combat regeneration:** 2% max Health/s after 6 s without taking or dealing damage (Stillheart: 3%).

## Crowd control (CC)

| CC type | Effect | Can be cleansed? |
|---|---|---|
| **Slow** | −X% movement speed | No |
| **Stagger** | Interrupts channels and actions; can still move at −50% | No |
| **Root** | Can't move; can act | No |
| **Stun** | Can't move or act | No |
| **Silence** | Can't use abilities; can move and basic-attack | No |
| **Drowse** (Stillheart) | Like a stun, but broken by any damage | No |
| **Airborne** (Smash & Roll) | Like a stun; can't be reduced by Tenacity | No |
| **Knockback** | Forced movement; interrupts channels | No |

**CC duration formula:**

```
final duration = base duration × (1 + caster Control ÷ 200) × (1 − target Tenacity)
```

- Control 100 makes CC last ×1.5.
- **Tenacity:** +2% per level from L2 to L15 (max 28%). From L16, Tenacity
  stops growing and **Territorial Dominance** takes over (GDD 03).
- **CC immunity window:** after any stun, root or Drowse ends, the target is
  immune to those three for 1.5 s (prevents chain-locking).
- **Unstoppable** (Roll Commit, Rampart Charge, some Ultimates): immune to all CC for its duration.

## Weak points

| Rule | Value |
|---|---|
| Damage multiplier | ×1.5 |
| Exposure | Always hittable from the correct angle (see Spec 02 per lineage); from any angle while **Marked** |
| Break threshold | Weak-point damage taken ≥ 20% of max Health (counter resets 8 s after the last weak-point hit) |
| Broken effect | The victim's **R ability** is disabled; the victim takes +10% damage |
| Regrowth | Stage 1: 15 s · Stage 2: 12 s · Stage 3: 9 s (source pages: S1/S2/S3) |
| Weak-point hitbox | A sphere sized per lineage and Stage (Spec 02) |

## Sizes and hitboxes

Creatures use a capsule hitbox. Height and radius by Stage (Titan ×1.3, Thornrunner ×0.8 in height, ×1.2 in length):

| Stage | Height | Capsule radius | Camera distance |
|---|---|---|---|
| Base Form (L1–2) | 1.0 m | 0.35 m | 5 m |
| Stage 1 (L3–9) | 2.0 m | 0.7 m | 7 m |
| Stage 2 (L10–19) | 4.0 m | 1.3 m | 10 m |
| Stage 3 (L20) | 7.5 m | 2.4 m | 15 m |

## Movement

| Rule | Value |
|---|---|
| Base speed | 5.0 m/s (Speed 100%) |
| Turn rate | 540°/s (Base Form) → 270°/s (Stage 3) |
| Evade (every lineage) | 4 m dash, 0.25 s, invulnerable for the first 0.15 s; cooldown 8 s |
| Sprint (out of combat) | +30% speed after 4 s without combat |
| Climbing (Bonevine) | 2.5 m/s |
| Swimming / deep water | −40% speed; light damage over time in cold water (The Sleeper: 2% max Health/s) |
| Mud (Hollow Mire) | −20% speed |

## Shared actions

| Action | Value |
|---|---|
| **Root / Blight** (capture) | 4 s channel (Verdant 2 s), range 2 m from the node's core; reduced by 1% per 2 Control, maximum −50%; interrupted by damage |
| **Uproot** | Per cell: 5 s / 4 s / 3 s by the attacker team's highest Synergy tier present (S1 or none / S2 / S3) |
| **Convert at base** | C1 15 s / C2 12 s / C3 9 s by Hubs held; interrupted by damage |
| **Field convert at a held Hub** | Same channel; 70% efficiency |
| **Touch a Memory site** | 2 s channel, out of combat only |
| **Infect / Rally** (Tier I–III wildlife below 50% Health) | 3 s channel, range 3 m |
| **Pick up cores** | Automatic within 2 m (Stage 3: 4 m) |

## Sound signature ranges

| Stage | Footsteps heard from |
|---|---|
| Base Form | 15 m |
| Stage 1 | 25 m |
| Stage 2 | 40 m |
| Stage 3 | 70 m |
| Carrying 150+ cores | +15 m |
| Carrying 300+ cores | +30 m, plus an enemy minimap ping every 5 s |
| Hollow | No footsteps |
| Thornrunner | ×0.5 range |
| Titan | ×1.25 range |

## Ability slots

| Slot | Unlock | Notes |
|---|---|---|
| Basic attack | L1 | Per lineage (Spec 02) |
| Evade | L1 | Shared |
| Root, Convert, Calls | L1 | Shared |
| Q, E, R | L3 (lineage awakens) | Base Form has only basic attack and Evade before L3 |
| Passive | L3 | Per lineage |
| Ultimate Form ability | L20 | One of three per branch (Spec 03) |
| Synergy | L12 / L15 / L18 | Per pair (Spec 02, section 9) |

## Ability ranks

Every Q/E/R ability has **three ranks**, raised automatically:

| Rank | Reached at | Typical change |
|---|---|---|
| 1 | L3 | Base values |
| 2 | L5 | The lineage's L5 upgrade (Spec 02) |
| 3 | L10 (Stage 2) | Size and duration scale with Stage; branch upgrade applied |

At **L15**, the second branch upgrade applies. At **L20**, Stage 3 scaling and the Ultimate.

**Stage scaling** (applied to every area, range and length value marked "scales"):
Stage 1 ×1.0 · Stage 2 ×1.25 · Stage 3 ×1.6.

## Cooldown reduction

Sources (Resonance, Lullaby Resonance, Attunement, Wild Echo) stack additively,
to a **maximum of 40%** cooldown reduction. Cooldown *slowing* (Long Night) is
applied separately as a tick-rate multiplier.

## Visibility

| Rule | Value |
|---|---|
| Base sight radius | 30 m (Stage 3: 40 m) |
| Night | 22 m (Stage 3: 30 m) |
| Ashfall / Rime Fog | 18 m / 15 m |
| Revealed | Visible to the revealing team through fog and terrain for the duration |
| Minimap | Shows teammates always, enemies only when visible or pinged |

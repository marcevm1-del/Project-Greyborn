# 03 — Progression & Evolution System (Chapter 11)

> *Kills fuel evolution. Returns fuel tactical choice. Dominate the map.*

## Levels and Stages

| Stage | Levels | Form | Milestones |
|---|---|---|---|
| **Stage 1: Base Form** | 1–9 | Humanoid Base Form (1–2), then the awakened lineage (3–9) | **L3:** lineage awakens |
| **Stage 2: Enhanced Form** | 10–19 | Larger, more detailed form ("growth-detailed") | **L10:** choose a branch (Aggression or Tactical Control) · **L12 / L15 / L18:** pair Synergies unlock |
| **Stage 3: Ultimate Form** | 20 | Ascendant ("hyper-detailed" / "hyper-rooted") | **L20:** choose 1 of 3 Ultimate forms in your branch |

Stage transitions are big moments: a 1.5 s transformation with a world-audible
roar, and the player is invulnerable but rooted in place. Everyone nearby
knows it happened.

## Evolution cores and EXP

**Evolution cores** are the progression currency. Cores you **carry** are not
yet progress. They become **EXP** (levels) when **converted**.

### Three ways to evolve (from the source page)

| Source | How | Notes |
|---|---|---|
| **1. Getting kills** | The victim drops **all carried cores + a bounty** (60 + 10 × victim level) | Hunting players who are carrying a lot is very lucrative |
| **2. Destroying Enemy Cores** | Each Enemy Core structure destroyed gives **300 cores** split among nearby attackers, and **denies** the enemy team (see below) | Objective play; the main comeback lever |
| **3. Returning to base** | Converts carried cores to EXP at the base (**100% + aggression bonus**) | *"Risky but strategic"* |

**Wildlife** (4th source, approved): neutral creatures drop 10–400 cores by
tier, capped so they provide about 15–20% of a match's EXP. See [09 — Wildlife](09-wildlife.md).

Small passive sources (proposal): **+2 cores/s per player** from team
territory, scaled by Territorial Influence, so a player who never fights still
grows slowly.

### Level costs (proposal)

EXP to go from level L to L+1 = **80 + 20 × L**.
That's 100 EXP for L1→2, 280 for L10→11, 460 for L19→20 and **5,320 total** to reach L20.
At the target pace, a player who plays well reaches L20 at around minute 16–18.

## Returning to base: conversion

- **Converting at base:** channel for **C** seconds, then all carried cores convert at **100%**.
- **Conversion time by Resource Hubs held** *(interpretation of the C1/C2/C3 values)*:

  | Tier | Hubs held | Channel time (pp. 120–122) | Alt. values (p. 123) |
  |---|---|---|---|
  | **C1** | 0–1 | 15 s | 18 s |
  | **C2** | 2 | 12 s | 15 s |
  | **C3** | 3+ | 9 s | 12 s |

- **Aggression bonus** (*"returns to base are risky but reward aggression"*):
  +10% EXP per 100 cores carried, up to **+30%** (at 300+ cores).
- **Field conversion** at a captured Resource Hub: no travel, but only **70%**
  efficiency and no aggression bonus. This is the safe alternative.
- **Carry risk:** carrying cores amplifies your **sound signature**. At 150+
  cores your footsteps and aura are audible from farther away. At 300+ you
  show on the enemy minimap every 5 s.
- **Carry cap:** 450 cores. Anything above that is lost, so you can't bank forever.

The decision this creates: *return now with 180 cores (+10%), or take one more
fight for 300+ (+30%) while every enemy can hear you coming?*

## Destroying Enemy Cores (denial)

- Each team has **3 Enemy Core structures** in its own territory (proposal).
- Destroying one:
  - gives 300 cores to the attackers;
  - cuts the victim team's passive core income by **15%** per Core lost;
  - pushes the victim team's conversion **one C-tier slower**, to a minimum of C1 + 3 s.
- Cores regrow **4 minutes** after destruction, but only if the team still
  holds territory adjacent to the Core site.

## Evolution branching (Progressive Tree)

The source pages show a tree that splits into **Aggression** and **Tactical
Control**, ending in **6 leaf abilities**. Proposed structure:

```
                 ┌─ Aggression ────────┬─ Ultimate A1
 L10 (Stage 2) ──┤                     ├─ Ultimate A2
                 │                     └─ Ultimate A3      (picked at L20)
                 └─ Tactical Control ──┬─ Ultimate T1
                                       ├─ Ultimate T2
                                       └─ Ultimate T3
```

- **Aggression branch:** more Power and Speed. Kills drop +15% cores.
  Abilities lean toward damage and dives.
- **Tactical Control branch:** more Control and Health. Node captures are +25%
  faster. Abilities lean toward zones, CC and objectives.
- Example (Titan): Aggression → *Colossus Step* / *Avalanche* / *Shatterfist*;
  Tactical → *Fortress* / *Fault Line* / *Mountain's Patience*.
- **Every lineage's branches and Ultimate Forms:** see [31 — Evolution Branches](31-evolution-branches.md).

## What evolution amplifies

From p. 120, each level and Stage amplifies three things:

1. **Specific capabilities:** stat growth (see [02](02-ascendant-roster.md#stat-profiles-health--power--speed--control)) and ability upgrades at L5, L10, L15 and L20.
2. **Sound signatures:** bigger Ascendants are louder and heard from farther
   away. Being powerful means being easy to find.
3. **Territorial Tension:** an Ascendant's presence near a border raises
   Tension faster (Stage 1 ×1, Stage 2 ×1.5, Stage 3 ×2). See [05](05-territory-and-economy.md#territorial-tension--global-events).

## High-Level Territorial Dominance

From p. 124 (*"High-Level Territorial Dominance replaces tenacity bonuses…"*), interpreted as:

- Up to **Level 15**, each level adds **+2% Tenacity** (CC-duration reduction).
- From **Level 16 on**, personal Tenacity stops growing. Each level instead
  adds a share of **Territorial Dominance**: team-wide bonuses that scale with
  your team's Territorial Influence above 50% (e.g. +1% Power per 5% influence
  over half the map).
- This makes late-game power about *holding the map*, not just individual levels.

---

## Evolution in practice: one player's curve

A typical match for a Brawler who plays aggressively and returns at good moments:

| Time | Level | Cores carried | Event |
|---|---|---|---|
| 1:30 | 2 | 60 | Critters and a Stray |
| 3:00 | 3 | 140 | Awakens as a Brawler |
| 5:30 | 5 | 310 | Two kills; returns at 310 (+30% bonus) |
| 6:10 | 7 | 0 | Converted: jumps two levels at once |
| 9:00 | 10 | 220 | **Stage 2**: picks Aggression |
| 11:00 | 12 | 0 | Field-converts at a captured Hub (70%) to stay near a fight |
| 14:00 | 15 | 280 | Killed while carrying; drops 280 cores |
| 15:30 | 15 | 120 | Respawn, returns to the fight |
| 17:00 | 18 | 0 | Converts; the Titan partner reaches 18 too: **Smash & Roll** unlocks |
| 19:30 | 20 | 0 | **Stage 3**: Frenzy |

The biggest single moment is the **6:10** conversion: two levels at once from
one well-timed return. That's the feeling the carry-and-return system is built to deliver.

## The feel of a transformation

A Stage change is the most important moment in a player's match. It should
feel like the creature itself is changing, not like an icon updating.

- **0.0 s:** the creature roots in place. Sound drops out for a beat.
- **0.2 s:** Wildborn: roots burst from the ground and wrap the body.
  Blightborn: crystal grows over the body in an instant cocoon.
- **0.8 s:** a map-wide sound: a deep tremor or a ringing chime, so everyone knows.
- **1.2 s:** the roots fall away, or the cocoon shatters.
- **1.5 s:** the new form stands, larger, and lets out a call. The camera pulls
  back slightly to fit the new size.

## Return decisions, worked through

| Situation | Carried | Choice | Why |
|---|---|---|---|
| Near base, no enemies seen | 120 | Keep hunting | Too little to be worth the trip |
| Mid-map, 320 cores, enemy Thornrunner nearby | 320 | Return now | The +30% bonus is maxed; you're on their minimap |
| At a captured Hub, fight starting nearby | 200 | Field-convert (70%) | Stay in the fight; lose 60 cores of value but no travel |
| Far from base, 180 cores, partner also heavy | 180 | Return together | Evolution-Sync Resonance (+10%) and an escort |
| Phase 4, Base Heart under attack | Any | Stay | The match matters more than levels now |

## Where EXP comes from in a typical match

| Source | Share of a player's EXP (target) |
|---|---|
| Player kills | 35–45% |
| Wildlife | 15–20% ([09](09-wildlife.md#income-cap-keeps-pvp-central)) |
| Enemy Cores | 10–15% |
| Passive territory income | 10–15% |
| Aggression and Resonance bonuses | 10–15% |

Kills stay the biggest source, as the source pages require: **kills fuel evolution.**

## EXP per level, in full (proposal)

| Level → next | EXP needed | Cumulative |
|---|---|---|
| 1 → 2 | 100 | 100 |
| 2 → 3 | 120 | 220 |
| 3 → 4 | 140 | 360 |
| 4 → 5 | 160 | 520 |
| 5 → 6 | 180 | 700 |
| 6 → 7 | 200 | 900 |
| 7 → 8 | 220 | 1,120 |
| 8 → 9 | 240 | 1,360 |
| 9 → 10 | 260 | 1,620 |
| 10 → 11 | 280 | 1,900 |
| 11 → 12 | 300 | 2,200 |
| 12 → 13 | 320 | 2,520 |
| 13 → 14 | 340 | 2,860 |
| 14 → 15 | 360 | 3,220 |
| 15 → 16 | 380 | 3,600 |
| 16 → 17 | 400 | 4,000 |
| 17 → 18 | 420 | 4,420 |
| 18 → 19 | 440 | 4,860 |
| 19 → 20 | 460 | 5,320 |

## What each level brings

| Level | Gain |
|---|---|
| 1–2 | Base Form; faster each level |
| 3 | **Lineage awakens:** full kit |
| 5 | First ability upgrade |
| 8 | Cross-resonance unlocks ([32](32-cross-resonance.md)) |
| 10 | **Stage 2:** branch choice and first branch upgrade |
| 12 | Void Garden (Verdant + Hollow) |
| 15 | Second branch upgrade; Co-Stalk (Thornrunner + Bonespire); Tenacity cap |
| 16+ | Territorial Dominance share per level |
| 18 | Smash & Roll (Titan + Brawler) |
| 20 | **Stage 3:** Ultimate Form |

## Death and cores, in detail

- On death, a player drops **all carried cores** where they fall, plus a **bounty** (60 + 10 × level) for the killer's team.
- Dropped cores glow on the ground for **30 s**. Anyone (allies, enemies, Marrowhounds) can pick them up.
- If a teammate recovers them, they count as that teammate's carried cores.
- **EXP already converted is never lost.** Levels never go down.

## Edge cases

| Case | Rule |
|---|---|
| Carrying over the cap (450) | Extra cores aren't picked up; they stay on the ground |
| Disconnecting while carrying | Cores drop as on death; the player's levels are kept for reconnection |
| Converting when at Level 20 | Cores convert to team SAP instead (1 SAP per 2 cores), so late-game carrying still matters |
| Field-converting at a Hub that's lost mid-channel | The channel breaks; cores are kept |
| Stage change during a fight | The 1.5 s transformation is invulnerable but rooted; it can be timed defensively |

## Evolution UI

- **Carried cores:** a glowing seed counter by the health bar, with three
  tiers of glow (under 150, 150–299, 300+) matching the carry signature.
- **EXP bar:** fills only on conversion, so the gap between carried and banked is always visible.
- **Next milestone:** a small icon shows the next big unlock (Stage, Synergy, branch).
- **Partner's level:** shown beside your own, so Evolution-Sync Resonance is easy to manage.

## Balance levers

| Lever | Effect of raising it |
|---|---|
| Kill bounty | Faster snowballing; more aggressive play |
| Wildlife core values | More farming; less PvP |
| Aggression bonus cap | Longer carrying; more risk |
| Field conversion efficiency | Fewer trips home; less carry risk |
| Conversion times (C1/C2/C3) | Returns cost more map time |
| Level costs | Slower matches; later Synergies |

Each lever should be tuned one at a time in playtests, watching match length
and the share of EXP from each source ([03](03-evolution-system.md#where-exp-comes-from-in-a-typical-match)).

## Stat growth for one lineage, level by level (Titan, proposal)

| Level | Health | Power | Speed | Control |
|---|---|---|---|---|
| 1 | 600 | 40 | 100 | 10 |
| 3 | 1,000 | 55 | 97 | 18 |
| 5 | 1,500 | 70 | 95 | 25 |
| 8 | 2,200 | 88 | 92 | 34 |
| 10 | 2,600 | 100 | 90 | 40 |
| 12 | 3,100 | 115 | 89 | 48 |
| 15 | 3,900 | 140 | 87 | 58 |
| 18 | 4,700 | 165 | 86 | 66 |
| 20 | 5,200 | 180 | 85 | 70 |

Growth follows an S-curve: slow at first, fastest between Levels 8 and 16,
then levelling off, so the middle of the match is where power changes most.

## Evolution across the modes

| Mode | Evolution changes |
|---|---|
| The Answering | Standard rules |
| Brood Skirmish | EXP ×2; matches end around Level 15–18 |
| Apex Hunt | Cores convert instantly; no carrying risk |
| The Truce | Shared birth-pool; carrying risk from the Clamor only |
| Season finales | Varies (e.g. The Glass Flower favours holding ground over evolution) |
| The Den | Any Level can be set freely for practice |

## Evolution and the story

Evolution is the game's mechanic and the world's story at once. In the lore,
the planet calls Kith, and they grow; in the game, players eat, carry and
convert, and they grow. Every match is a Kith's life compressed into twenty
minutes: budding, hunting, growing, and, if all goes well, becoming an Ascendant.

## Evolution principles

1. **Growth is visible.** Every level shows on the body.
2. **Progress is risky until it's banked.** Carried cores can be lost; EXP never is.
3. **Kills fuel evolution** (the source pages' first principle).
4. **Returns fuel tactical choice** (the source pages' second principle).
5. **The late game belongs to the map,** not just to levels (Territorial Dominance).

## Evolution in one paragraph

A Kith buds small and fragile. It eats critters, Strays and careless enemies,
and carries what it eats as glowing cores that make it louder with every
bite. When it judges the moment right, it runs home to its birth-pool and
pours those cores into it, and grows. At Level 3 its lineage awakens; at 10 it
chooses a path; at 12, 15 and 18 its partner bond becomes a power; at 20 it
becomes an Ascendant, towering over the map. Every level is visible, every
carried core is a risk, and every return is a choice.

Kills fuel evolution; returns fuel choice.

Grow, carry, return, evolve.

That is the whole loop.

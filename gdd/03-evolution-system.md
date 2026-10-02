# 03 — Progression & Evolution System (Chapter 11)

> *Kills fuel evolution. Returns fuel tactical choice. Dominate the map.*

## Levels and Stages

| Stage | Levels | Form | Milestones |
|---|---|---|---|
| **Stage 1: Base Form** | 1–9 | Greyborn humanoid (1–2), then the awakened lineage (3–9) | **L3:** lineage awakens |
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

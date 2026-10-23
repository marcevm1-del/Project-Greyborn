---
type: creature
group: Four-legged
tags: [creature, four-legged]
number: 2
---
# Ashfang

![[02-ashfang.jpg]]

| Field | Value |
|---|---|
| Tier · temperament | II · Predator, pack of 3 (Ash Turn: 4) |
| Habitat · maps | [[Ashen Steppe]] · [[Ashfall Crossing]] (south and north plains), [[The Ash Sea]] |
| Affinity | [[Thornrunner]] |
| Size | 1.3 m at the shoulder, 2.2 m long; lean grey canid with an ash-crusted mane |
| Health · damage · interval · speed | 700 · 50 · 1.0 s · 7.0 m/s |
| Cores · respawn | 50 each · 90 s |
| Weak point | Flank behind the ribs, left and right 90°, 0.2 × height |
| **Key mechanic** | Hunts any player **below 30% Health within 40 m**; +30% damage to them |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Patrol | Default | The pack trots a 30 m loop around its den, nose down |
| Stalk | A player below 30% Health within 40 m | Splits into a fan (one ahead, two flanking) and closes at 5 m/s, low to the ground |
| Hunt | Within 10 m of the wounded target | Sprints at 7 m/s; bites with +30% damage |
| Defend | Attacked by a healthy player | Normal Engage; flees at 25% Health |
| Lose interest | The target heals above 45%, or reaches a held Hub with Defense Level 3+ | Returns to Patrol |

**Attacks**

| Attack | Telegraph | Wind-up | Area | Damage | Cooldown |
|---|---|---|---|---|---|
| Bite | Head drops, lips curl, snarl | 0.4 s | Melee 2 m | 50 (65 vs. wounded) | 1.0 s |
| Leap bite | Crouch, hind legs bunch | 0.5 s | 6 m lunge | 60 | 6 s |

**Counter-play:** don't retreat through the steppe alone at low Health; heal first, or
travel with a brood-mate. A pack chasing a wounded enemy can be followed to find them.

**Animation set:** trot, sprint, stalk-crawl, bite, leap bite, howl (pack call), flinch, flee, death.

**Audio:** a dry, husky howl to start a hunt; pants and snarls; paws in ash.

**Look:** grey fur matted with ash, pale yellow eyes, a ridge of stiff mane. Readable
silhouette: lean, low, ears flat when hunting.

**Blighted — Shardfang (Spec):** when one is hit, the whole pack aggroes. Glass shards
in the mane; the pack moves in perfect step.
**Regional:** Frostfang ([[Rimewastes]]; bites slow 25% for 2 s), Cinderfang ([[Cinderveil]];
pawprints burn 15/s for 3 s).

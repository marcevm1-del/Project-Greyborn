---
type: creature
group: Four-legged
tags: [creature, four-legged]
number: 3
---
# Stonehide Ox

![[03-stonehide-ox.jpg]]

| Field | Value |
|---|---|
| Tier · temperament | III · Territorial, solo |
| Habitat · maps | [[Spirecliffs]] · [[Ashfall Crossing]] (Built: one per side at (±40, −12)) |
| Affinity | [[Titan]] |
| Size | 3.6 m at the shoulder, 5.5 m long; a rock-plated bovine |
| Health · damage · interval · speed | 3,500 · 140 · 1.5 s · 4.0 m/s |
| Cores · SAP · respawn | 160 + 20 SAP · 180 s |
| Weak point | Exposed belly seam, visible from the sides when it rears for a Charge; otherwise the soft nape (rear 90°) |
| **Key mechanic** | **Charge:** 25 m line at 10 m/s, 200 damage, **knockdown 1.0 s** to everything hit, creatures included; cooldown 10 s |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Graze | Default | Grazes slowly within 8 m of its rock |
| Warn | A player within 15 m | Paws the ground, snorts (2 s); does nothing else unless the player stays or attacks |
| Engage | Attacked, or a player stays inside 15 m for 4 s | Gores in melee; uses Charge when the target is 8–25 m away |
| Charge | Cooldown ready and target in range | Lowers horns, a 0.8 s wind-up, then a straight line; doesn't steer |
| Stun self | Charge ends in a wall or a large rock | Dazed 1.5 s; weak point exposed from all sides |

**Attacks**

| Attack | Telegraph | Wind-up | Area | Damage | Cooldown |
|---|---|---|---|---|---|
| Gore | Head swings back | 0.5 s | Melee 3 m, 90° cone | 140 | 1.5 s |
| Charge | Line decal 25 m, fills over the wind-up; dust plumes from the hooves | 0.8 s | 25 m × 3 m line | 200 + knockdown 1.0 s | 10 s |

**Counter-play:** stand between it and an enemy, then step aside: the Charge hits
everything in its path. Bait it into rocks to daze it.

**Animation set:** graze, paw-warn, gore, charge wind-up, charge run, dazed, flinch, death (topples like a rockslide).

**Audio:** grinding breath, stone plates clacking; a bellow and thundering hooves for the Charge.

**Look:** stone plates over a grey hide, moss in the cracks, horns like broken
columns. Charge leaves a line of churned earth for 10 s.

**Blighted — Obsidian Ox (Spec):** Charge leaves Glaze: −20% speed for Wildborn for 10 s.

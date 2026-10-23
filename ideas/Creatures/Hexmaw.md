---
type: creature
group: Six-legged
tags: [creature, six-legged]
number: 21
---
# Hexmaw

![[21-hexmaw.jpg]]

| Field | Value |
|---|---|
| Tier · temperament | III · Predator, ambush, solo |
| Habitat · maps | [[Hollow Mire]] · [[Breathing Canopy]] (mire edges) |
| Affinity | [[Hollow]] |
| Size | Body 3.0 m across, hidden in mud; six tentacle-legs up to 10 m |
| Health · damage | 2,800 · **60/s while holding** |
| Cores · SAP · respawn | 160 + 20 SAP · 180 s |
| Weak point | The mouth, exposed from any angle while it drags a victim |
| **Key mechanic** | **Drag:** grabs a player within 10 m and pulls at 2 m/s toward its mouth; grip broken by **400 damage to the tentacle** (by an ally) or **any stagger** on the Hexmaw; cooldown 12 s |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Hidden | Default | Submerged; only slow ripples and two eye-bumps show (the world tell) |
| Strike | A player within 10 m | A tentacle bursts out (0.4 s, splash decal) and grabs |
| Drag | Grab lands | Pulls the victim toward its mouth at 2 m/s; bites for 60/s once they arrive |
| Release | Grip broken or 6 s pass | Submerges for 4 s; moves 8 m |

**Counter-play:** watch the mud for ripples; travel in pairs so someone can cut the tentacle; a [[Titan]]'s Quake Slam staggers it free.
**Animation set:** submerged idle (ripples), tentacle strike, drag loop, bite, release, submerge, death (sinks).
**Audio:** bubbling; a wet crack on the strike; a sucking gurgle while dragging.
**Blighted — Glassmaw:** hides under Glaze instead of mud.

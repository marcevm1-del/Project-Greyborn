---
type: creature
group: Four-legged
tags: [creature, four-legged]
number: 6
---
# Duskmane

![[06-duskmane.jpg]]

| Field | Value |
|---|---|
| Tier · temperament | III · Predator, solo |
| Habitat · maps | [[Hollow Mire]] · [[Breathing Canopy]] (the mire) |
| Affinity | [[Hollow]] |
| Size | 1.8 m at the shoulder, 3.4 m long; a big cat with a mane of drifting dark fur |
| Health · damage · speed | 2,600 · 130 · 5.5 m/s |
| Cores · SAP · respawn | 150 + 20 SAP · 180 s |
| Weak point | Base of the skull, rear 120° |
| **Key mechanic** | Stealthed in fog. **Pounce** from 12 m: 180 damage + **stun 0.8 s**, cooldown 10 s; targets **lone** players (no ally within 15 m). Drops a **Void Pelt**: +10% Control for 60 s (Hollow: +15%) |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Prowl | Default | Moves through fog banks, stealthed (visible within 6 m as a darker patch) |
| Stalk | A lone player within 25 m | Circles to the player's rear at 3 m/s |
| Pounce | Within 12 m behind the target | A 0.5 s crouch (a low growl is the tell), then leaps |
| Maul | After the pounce | Claws at 130 per 1.5 s; disengages if a second player comes within 10 m |
| Withdraw | Two players near, or below 40% Health | Fades back into fog and resets stalking |

**Counter-play:** don't walk the mire alone; listen for the growl; turn and Evade
at the crouch. Killing it gives the Void Pelt, a strong Control buff for Hollow.

**Animation set:** prowl, crouch-growl, pounce, maul, withdraw, roar, death (fades to fog).
**Audio:** near-silent footsteps, a low growl 0.5 s before the pounce, a coughing roar.
**Look:** dark grey-violet fur, a mane that drifts like smoke, eyes that catch light.
**Blighted — Hushmane:** cloaks in whispers instead of fog.

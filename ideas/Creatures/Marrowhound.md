---
type: creature
group: Four-legged
tags: [creature, four-legged]
number: 5
---
# Marrowhound

![[05-marrowhound.jpg]]

| Field | Value |
|---|---|
| Tier · temperament | II · Scavenger, pair |
| Habitat · maps | [[Bone Flats]] · [[The Elder Ribs]], [[The Skull Basin]] |
| Affinity | [[Bonespire]] |
| Size | 1.5 m at the shoulder, 2.4 m long; a long-jawed hyena-like hound with bone plates |
| Health · damage · speed | 800 · 45 · 6.5 m/s |
| Cores · respawn | 50 each · 90 s |
| Weak point | Swollen belly (its hoard), sides 90° |
| **Key mechanic** | Eats dropped cores within 20 m at **40 cores/s**, holds up to **300**, drops all on death |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Scavenge | Default | Wanders between bone nests and recent fight sites |
| Feed | Dropped cores within 20 m | Runs to them and eats; its belly visibly swells (three sizes: 0, 1–150, 151–300) |
| Retreat | Damaged while carrying cores | Runs toward the nearest bone nest; fights only if cornered |
| Engage | Attacked while empty | Normal |

**Attacks:** Bite (0.4 s wind-up, 45 damage, 1.2 s) · Drag-bite (0.6 s crouch, 60, pulls 2 m, 8 s cooldown).

**Counter-play:** after a fight, race it to the dropped cores; a full Marrowhound is a
300-core piñata that runs. Bonespires kill it efficiently from range.

**Animation set:** trot, sniff, gulp-feed loop, belly-swell (blend shape), retreat lope, bite, death (cores burst out).
**Audio:** cackling yelps, crunching, a satisfied grunt per gulp.
**Look:** pale hide over bone plates, long jaws, glowing core light visible through the belly when full.
**Blighted — Murmurhound (Spec):** delivers eaten cores to the nearest Blightborn within 60 m, running at 8 m/s.

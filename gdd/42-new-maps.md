# 42 — Map Seeds, Developed

Full proposals for the three map seeds recommended in [41](41-landmarks.md#map-seeds-most-worth-developing-next).
They follow the map rules in [16](16-launch-maps.md#rules-every-map-follows)
unless noted.

## Map 8 · The Skull Basin (Brood Skirmish 2v2)

**Region:** Bone Flats. **Mode:** Brood Skirmish ([27](27-modes.md#brood-skirmish-2v2)).
**Identity:** a small circular arena inside the eye socket of a skull so large
that its rim is a cliff.

```
            ┌───── the rim (skull bone) ─────┐
          ╱    ◇        BASE A        ◇        ╲
         │  ◇     ●core       (H)        ◇      │
         │     ◇      ◇  the iris  ◇      ◇     │
         │  ◇      ◇     ✶  ♥     ◇     ◇       │
         │      ◇        BASE B    ●core   ◇    │
          ╲        ◇                  ◇        ╱
            └────────────────────────────────┘
```

| Rule | Value |
|---|---|
| Size | About 160 m across |
| Nodes | 10 |
| Hubs | 1 (the **Iris**, a raised bone disc in the centre) |
| Enemy Cores | 1 per team |
| Crater zone + grove | Small patches either side of the Iris ✶ ♥ |

- **The rim:** the socket wall is climbable on Bonevine at four points. The rim gives high ground but leaves you exposed from both sides.
- **The Iris:** the central Hub. Holding it gives a view of the whole basin.
- **Bone-fall:** every 2 minutes, a chunk of the rim breaks off and crashes
  into the basin at a telegraphed spot, creating new cover for the rest of the match.
- **Wildlife:** Marrowhounds (scavenging every fight), one Trundleback (climbable cover).
- **Why it works for 2v2:** small enough for one pair per team, with enough
  height and cover for each pair's Synergy to shine.

## Map 9 · The Ash Sea (4v4)

**Region:** Ashen Steppe. **Identity:** a dune field of grey ash where **the
terrain itself changes every phase**.

- **Dune shift:** at the start of each phase ([06](06-match-flow.md)), the
  wind rises for 20 s and the dunes **move**:
  - Sightlines and routes change.
  - **Nodes never move**, but paths between them do. A safe route in Phase 1
    can be exposed in Phase 2.
  - Both teams get the same shift (it's mirrored across the map's rotational symmetry).
- **Buried things:** dune shifts **uncover** Starshard veins and fossil caches
  that weren't there before, and bury others.
- **Ashfall** is the default weather. Visibility is short; sound carries farther ([12](12-life-on-greyborn.md#weather-and-time-of-day)).
- **Crater zone:** a half-buried meteor shard that rises out of the ash as the dunes move.
- **Heartwood grove:** an old root breaking through the ash.
- **Wildlife:** Gravel Skinks, Spurlarks, Ashfangs, Clashhorn Beetles, a Stiltwalker herd.
- **Apex:** the **Hive Colossus**, slowly crossing the dunes in Phase 3.
- **Favours:** Thornrunner and Hollow (using dunes to stay hidden), Bonespire (when the dunes open a long sightline).
- **Risk:** terrain that changes can feel random. It must be **telegraphed**
  (a visible storm front) and **identical for both teams**.

## Map 10 · The Glass Forest (4v4)

**Region:** Cinderveil, at the edge of the Glasswaste. **Identity:** a burnt
forest where **natural black glass** (obsidian from the volcano) and **Murmur
Blight** stand side by side, and players have to read the difference.

### The readability risk, and the safeguards

The art direction ([23](23-art-direction.md)) says ground ownership must be
readable at a glance. A map designed to blur that is risky, so it has clear limits:

1. **Obsidian is scenery; Blight is territory.** Natural obsidian trees and
   rocks are **never** capturable and never part of the node system.
2. **Blight always glows; obsidian never does.** Blight keeps its pulsing
   cyan-violet light. Obsidian is dull black with a faint red heat-glow from below.
3. **Sound differs:** Blight whispers; obsidian ticks and creaks as it cools.
4. **The UI is never ambiguous.** Node ownership on the minimap and in the HUD
   uses team colours, as always.

The **challenge** is only at a glance in the heat of battle. Anyone who looks
properly can always tell. It's a map that rewards experienced players' eyes
without ever being unfair.

### Layout and features

- **The burnt forest:** tall obsidian trunks give dense cover and break sightlines.
- **Heat vents:** cracks in the ground that pulse heat every 30 s, damaging
  anyone standing on them. They also briefly light up the obsidian red, which
  makes everything easier to read for a moment.
- **Crater zone:** where the Glasswaste creeps into the forest.
- **Heartwood grove:** a single living tree that survived the fire, surrounded by new green shoots.
- **Memory site:** *The Fever Meets the Glass*, where the planet's volcano and
  the Murmur's Blight met and neither gave way.
- **Wildlife:** Cinderfangs, Cinder Salamanders, Ash Vultures (circling above fights), Glass Weavers.
- **Favours:** Thornrunner (ambush in the trunks), Verdant (the living tree grove is a strong anchor).

## Map list (all proposals)

| # | Map | Region | Mode | Status |
|---|---|---|---|---|
| 1 | Ashfall Crossing | Ashen Steppe + Underroot | 4v4 | Launch |
| 2 | The Elder Ribs | Bone Flats | 4v4 | Launch |
| 3 | Breathing Canopy | Rootwilds + Hollow Mire | 4v4 | Launch |
| 4 | Fevermouth | Cinderveil | 4v4 | Season 2 |
| 5 | The Sleeper | Rimewastes | 4v4 | Season 2 |
| 6 | Shard Reef | Shattered Coast | 4v4 | Season 3 |
| 7 | The Nerve | Underroot | 4v4 | Season 4 |
| 8 | The Skull Basin | Bone Flats | 2v2 | With Brood Skirmish |
| 9 | The Ash Sea | Ashen Steppe | 4v4 | Season 5+ |
| 10 | The Glass Forest | Cinderveil / Glasswaste | 4v4 | Season 5+ |

---

## A moment on each map

**The Skull Basin.** A Verdant and Hollow pair hold the Iris. The Titan and
Brawler come over the rim from both sides at once, sliding down the Bonevine.
A chunk of the rim cracks above them all, and for two seconds every player
looks up as it falls, then the fight resumes in the dust around the new
cover. In a 2v2, every bone-fall changes the arena, and every pair learns to use them.

**The Ash Sea.** Phase 2 begins. The wind rises into a grey wall moving across
the map, and for twenty seconds nothing can be seen. When it passes, the dune
that hid the Wildborn's route to the central Hub has moved forty metres east.
The route is open, and so are they. Across the map, a meteor shard has risen
out of the ash where no one expected it, and a Blightborn Thornrunner is
already on its way.

**The Glass Forest.** A Wildborn Bonespire scans the black trunks. Obsidian,
obsidian, obsidian, and then one trunk with a faint pulse of cyan inside. Not
obsidian. Blight. A whisper-node hidden among the burnt trees. A heat vent
erupts nearby, lighting every trunk red for a moment, and in that light the
difference is obvious. The Bonespire lances, and the node shatters.

## Art and audio notes

| Map | Key art moment | Signature sound |
|---|---|---|
| **The Skull Basin** | Looking up from the Iris at the rim of the socket against the sky | Bone cracking and the boom of a rim-fall echoing in the bowl |
| **The Ash Sea** | A dune storm front rolling across the map like a grey wave | Wind building to a roar, then sudden quiet as it passes |
| **The Glass Forest** | Black trunks lit red from below, with one cyan pulse among them | Cooling obsidian ticking, under a faint whisper |

## Map-by-map lineage balance check

| Lineage | Maps that favour it (of 10) |
|---|---|
| Titan | Elder Ribs, Fevermouth, Skull Basin |
| Brawler | Elder Ribs, Fevermouth, Shard Reef, Skull Basin |
| Verdant | Breathing Canopy, The Sleeper, Glass Forest |
| Hollow | Breathing Canopy, The Sleeper, Shard Reef, The Nerve, Ash Sea |
| Thornrunner | Ashfall Crossing, Breathing Canopy, Fevermouth, Shard Reef, The Nerve, Ash Sea, Glass Forest |
| Bonespire | Ashfall Crossing, Elder Ribs, The Sleeper, Ash Sea |
| Stillheart | The Nerve |

**Gaps:** Thornrunner is favoured on many maps and Stillheart on only one.
Future maps should favour Stillheart (cold, slow, chokepoint-heavy maps),
and Thornrunner's map advantages should be watched in playtests.

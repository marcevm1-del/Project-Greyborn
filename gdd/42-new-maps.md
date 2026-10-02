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

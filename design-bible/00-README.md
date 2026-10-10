# Greyborn — Maps & Monsters Design Bible

A production-level reference for every map, creature, Ascendant and structure in
Greyborn. It pulls together what is spread across the design document (`gdd/`),
the build spec (`spec/`) and the playable build (`game/`). It also adds the detail
that level designers, character artists, animators, VFX and audio need to
start building.

## How to read this document

| Part | File | Contents |
|---|---|---|
| 1 | `01-standards.md` | Units, scale, stat-block format, telegraph rules, LOD and budgets, naming |
| 2 | `02-ascendants.md` | The Kith Base Form and all seven lineages, Stage by Stage: anatomy, numbers, kit, animation, VFX, audio |
| 3 | `03-kith-strays-wild.md` | Strays, wild evolution, Wild Ascendants, the Old Ones |
| 4 | `04-bestiary-legs-2-4.md` | Creature stat blocks: four-legged and two-legged natives |
| 5 | `05-bestiary-legs-6-8-insects.md` | Creature stat blocks: six-legged, eight-legged and insects |
| 6 | `06-variants-invaders-bosses.md` | Regional and Blighted variants, sea creatures, the Clamor, the Hushed Answers |
| 7 | `07-structures.md` | Bases, Enemy Cores, Resource Hubs, nodes: dimensions, states, numbers |
| 8 | `08-map-rules-ashfall.md` | Map rules and metrics, and Ashfall Crossing in full |
| 9 | `09-maps-ribs-canopy.md` | The Elder Ribs and Breathing Canopy in full |
| 10 | `10-maps-post-launch.md` | Fevermouth, The Sleeper, Shard Reef, The Nerve and the six later maps |
| 11 | `11-world-systems.md` | Weather, time of day, Turns, Tension events, hazards, sound |

## Status of the content

The document uses three source labels. Where a value matters, it says which one applies.

| Label | Meaning |
|---|---|
| **Spec** | Taken unchanged from `spec/` (the build-ready numbers). Change the spec first, then this document |
| **Built** | What the playable build in `game/` actually does today, including playtest overrides |
| **Proposal** | New detail added here for production: dimensions, animation lists, layouts, timings. Open to change in greybox and playtest |

When this document and the spec disagree, **the spec wins** and this document gets fixed.
When the built game and the spec disagree, the difference is listed in `game/KNOWN_ISSUES.md`
(for example the playtest overrides on Base Heart Health and the EXP curve).

## Counts at a glance

| Content | Count |
|---|---|
| Playable lineages | 7 (six at launch, Stillheart from Season 3) |
| Ultimate Forms | 42 |
| Native creatures | 54 |
| Regional variants | 8 |
| Blighted forms | 53 (every native except the Heartwood Elk) |
| Sea creatures | 4 |
| Clamor creatures | 7 (including the Roar) |
| Hushed Answers (bosses) | 6 |
| Old Ones (scenery) | 8 |
| Match maps | 13 (3 launch, 4 seasonal, 6 later or proposed) |

## Who uses which part

| Discipline | Start with |
|---|---|
| Level design | Parts 1, 7, 8, 9, 10, 11 |
| Character art | Parts 1, 2, 4, 5, 6 (anatomy, silhouettes, materials, sizes) |
| Animation | Parts 1, 2, 4, 5, 6 (animation lists, telegraph timings) |
| VFX | Parts 1, 2, 6, 7, 11 |
| Audio | Every "Audio" row, and Part 11 |
| Gameplay programming | Parts 1, 3, 4, 5, 6 (behaviour state machines and numbers) |
| Balance | The numbers in every stat block, all labelled Spec |

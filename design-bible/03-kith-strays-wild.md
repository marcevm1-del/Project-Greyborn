# Part 3 — Strays, Wild Evolution and the Old Ones

The Kith are the players' own species, living wild. This part covers Strays as
wildlife, the wild evolution chain that can end in a Wild Ascendant, and the Old
Ones that stand on the horizon. Numbers are **Spec** (`spec/04`); the rest is **Proposal**.

## 3.1 Strays (#9) — stat block

| Field | Value |
|---|---|
| Tier / temperament | I · Skittish, group of 3 (Spec) |
| Habitat / maps | Every map. 2–3 groups per map, in mirrored positions near each team's territory edge |
| Affinity | All lineages |
| Size | 1.0 m at the shoulder (a Kith) |
| Health · damage · speed | 200 · 15 per hit · 5.5 m/s (Spec) |
| Cores | 15 each (Spec) |
| Respawn | 45 s |
| Weak point | None |
| Elder | 1 group in 3 includes an **elder** (grey muzzle, thick cracked plates, 260 Health). Killing the elder makes the others flee for 6 s. While the elder lives, the wild-evolution timer runs 25% slower |

### Behaviour

| State | Trigger | Does |
|---|---|---|
| Forage | Default | Wanders within 10 m of its spawn, sniffing, nibbling Sapbloom, chasing critters |
| Alert | A player within 12 m | All three ears turn; one gives the rapid-click danger call |
| Flee | A player within 8 m, or any damage | Runs as a group to the far side of its spawn area; regroups after 4 s |
| Fight back | Cornered (can't flee further than 3 m) | Scratch combo, 15 damage, 1.5 s interval |
| Watch | A birth-pool within 25 m | Stops and watches the pool, curious (cosmetic) |
| Dusk | Time of day reaches dusk | All turn north toward the Fall-line and stand still for 6 s (cosmetic) |
| Grieve | A group member dies | The others stay near the body for 3 s unless a player is within 8 m |
| Stir | 300 s unharmed within 30 m of any held territory (Spec) | Begins wild evolution (below) |

**Animation set:** forage, sniff, chase-play, alert ears, danger call, flee run,
scratch, grieve (head lowered), dusk stillness, death (soft fall, sinks into moss).

**Audio:** chirps, clicks, a low hum when resting, the distress call (also the
Base Form's distress call, so players learn it in the first minute).

**Blighted form — Hushed Strays:** glass patches, violet eyes, still tails. They
rest in rows, not rings, and never face north at dusk. **They stir after 180 s instead of 300 s** (Spec).

## 3.2 Wild evolution (Spec numbers)

| Step | Trigger | Stats | Reward |
|---|---|---|---|
| Stray | — | Tier I (above) | 15 cores |
| **Stirring Stray** (visual only) | The 300 s timer passes its halfway point | As a Stray; limbs lengthen, a bark ridge grows along the spine | — |
| **Wild Brute** | A Stray unharmed for 300 s within 30 m of held territory | Tier III: 2,800 Health, 150 damage, 5.0 m/s, leash 30 m | 160 cores + 20 SAP |
| **Wild Ascendant** | A Wild Brute alive for 300 more seconds; **max once per match** | Stage 3 size; 12,000 Health; Q/E/R of a random lineage at Rank 3, Power = 60% of that lineage's L20 Power; no Ultimate; leash 40 m | 400 cores (split) + a **Wild Echo** for the killing team, 60 s |

### Wild Brute — stat block (Proposal detail on Spec numbers)

| Field | Value |
|---|---|
| Size | 3.0 m; a Kith grown thick and hunched, bark plates fused into crude armour |
| Behaviour | Territorial around the node nearest its birthplace; attacks anyone within 15 m; returns at 30 m |
| Attacks | Slam (150 damage, melee 3 m, 0.6 s wind-up, 1.5 s interval) · Lunge (6 m line, 0.7 s wind-up, 120 damage, knockback 3 m, 8 s cooldown) |
| Weak point | A cracked plate between the shoulder blades, rear 120° |
| Telegraph | Both arms raised for the Slam; a low crouch and ground decal for the Lunge |
| Counter-play | Kill it before the next 300 s pass, or the Wild Ascendant appears |
| Audio | Deep chirps turned into a growl; the Kith distress call, distorted, when hurt |

### Wild Ascendant — boss-lite encounter

| Field | Value |
|---|---|
| Size | Stage 3 (7.5 m; ×1.3 for a Titan) |
| Look | The planet's raw idea of the lineage: asymmetric, unpolished, **no team outline, no side colour, no Blight** |
| Announcement | Map-wide: the ground near it shakes; a low horn (neutral, neither side's sound) 5 s before it stands |
| Behaviour | Defends the nodes within 25 m of where it grew; attacks both teams; does not hunt across the map |
| Health | 12,000, phase-scaled |
| Target | The nearest player inside its territory; switches to whoever deals the most damage over 3 s |
| Kill target | ~20–30 s with a full brood (Spec tuning target) |

| Lineage | Wild form | Wild behaviour | Wild Echo (60 s, whole team) |
|---|---|---|---|
| Titan | Jagged unworked rock, no moss, one shoulder higher | Stands on its node and refuses to move; slams anything close | −10% damage taken |
| Brawler | Shaggy, scarred, mismatched fists (one far larger) | Charges anything that moves, then returns panting | +10% move speed |
| Verdant | Bare branches for antlers; bark peeling in strips | Roots the ground constantly, growing a ring of thorny undergrowth (slows 20%) | Captures +25% faster |
| Hollow | A ragged empty hole in the chest; trails darkness like smoke | Drifts in circles; opens rifts at random every 8–12 s | Sound signatures halved |
| Thornrunner | Too many legs; thorns pointing every direction | Circles its territory at full speed | Enemies carrying 200+ cores revealed |
| Bonespire | Spines of bones from everything it has eaten, at odd angles | Lances anything entering its line of sight, from far away | +20% weak-point damage |
| Stillheart | Thick dirty frost; heart barely beating | Sleeps until disturbed, then freezes everything nearby | Cooldowns 10% faster |

**Tuning targets (Spec):** appears in 10–20% of matches; about 60% are killed by the
team whose territory it grew beside; the Wild Echo should swing a fight, not a match.

## 3.3 The Old Ones (scenery)

The Old Ones are **invulnerable scenery** (Spec). They appear on map horizons and,
rarely, during an **Old One Crossing** event: for 60 s one walks a path across the
map, and within 25 m roots and Blight both spread ×2 (capture and uproot −30%) for
both teams (Spec).

| Old One | Lineage | Height (Proposal) | Seen from | Look | Sound |
|---|---|---|---|---|---|
| **Greymother** | Verdant | 35 m (antlers a living canopy) | Southern horizons; Heartwood groves | Antlers grown into a living tree; Mossbacks graze in her shadow | Deep creaking; birdsong in her antlers |
| **The Cairnback** | Titan | 60 m (mostly rock) | Fevermouth, Elder Ribs (west skyline) | A moving mountain; Cairnshells on its back, Sky Pines on its shoulders | Very slow grinding stone; pebbles falling |
| **Old Hush** | Hollow | 25 m, floating | Breathing Canopy (above the mire) | Floats so still birds land on it | Nothing; the swamp fades quiet as you approach |
| **The Scarred Runner** | Thornrunner | 9 m tall, 14 m long | Ashfall Crossing (beside the Migration) | One-eyed, grey-muzzled; walks, never runs | A slow clicking walk; soft panting |
| **The Last Bellow** | Brawler | 20 m sitting | Shard Reef (a distant cliff) | Fists worn smooth from pounding cliffs | One great roar each Fever |
| **The Bone-Keeper** | Bonespire | 15 m | The Elder Ribs (far out on the flats) | Tends fields of arranged bones | Bones clicking into place, one at a time |
| **The Drowsing One** | Stillheart | 18 m | The Sleeper, Frozen Falls (deep in an ice cave) | An older, smaller Stillheart; Drift Owlbears sleep around it | A heartbeat slower than the Sleeper's |
| **The Rootless** | Verdant | 22 m | The Glass Forest (walking the edge) | Antlers with a few glass leaves among real ones | Footsteps that never stop; a faint chime |

**Old One Crossing event (Proposal detail):**
- 15 s warning: the ground hums, wildlife on the path moves aside, the path shows as a faint line on the minimap.
- The Old One walks a fixed path chosen from 2–3 per map, always crossing the centre line, at 1.5 m/s.
- It ignores combat and can't be harmed or blocked; it passes through Bramble Walls, Ossuary and Living Wall without breaking them.
- Its blessing (×2 spread within 25 m) favours neither side.

**Production note:** horizon Old Ones are impostor cards or very low-poly meshes
(under 3,000 triangles), animated with a slow vertex sway. Crossing versions are full
assets but reuse a lineage's Stage 3 rig scaled up, with a dedicated walk cycle.

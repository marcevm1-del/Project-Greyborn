# Part 10 — Post-Launch Maps

Ten maps after launch: four seasonal 4v4 maps, two 2v2 arenas and four later or proposed
4v4 maps. Identities, signature mechanics, wildlife and favoured lineages are **Spec**
(`gdd/16`, `gdd/30`, `gdd/42`). Coordinates, node counts and exact timings are **Proposal**.
All follow §8.1 unless noted.

| # | Map | Region | Mode | Arrives |
|---|---|---|---|---|
| 4 | Fevermouth | Cinderveil | 4v4 | Season 2 |
| 5 | The Sleeper | Rimewastes | 4v4 | Season 2 |
| 6 | Shard Reef | Shattered Coast | 4v4 | Season 3 |
| 7 | The Nerve | Underroot | 4v4 | Season 4 |
| 8 | The Skull Basin | Bone Flats | 2v2 | With Brood Skirmish |
| 9 | The Ash Sea | Ashen Steppe | 4v4 | Season 5+ |
| 10 | The Glass Forest | Cinderveil / Glasswaste | 4v4 | Season 5+ |
| 11 | The Weaver's Hollow | Rootwilds | 4v4 | Proposal |
| 12 | The Heron Reach | Hollow Mire | 2v2 | Proposal |
| 13 | The Frozen Falls | Rimewastes | 4v4 | Proposal |

---

## 10.1 Fevermouth (Cinderveil)

**Identity:** fast, dangerous fights around a volcano that reshapes the map on a timer.
**Favours:** Brawler and Titan (Embergrass charges), Thornrunner (fast rotations between eruptions).

| Layout | Value |
|---|---|
| Orientation | Bases west and east; mirror x = 0 |
| The Fevermouth | A volcano cone at (0, −30), 60 m tall, crater 40 m across (not walkable) |
| Central Hub | **The Mouth**, on the lower slope at (0, 10) |
| Lava channels | **North, Middle, South**: three channels from the crater down to the map edges, each 10–14 m wide, crossing both halves symmetrically (each channel forks at x = 0 into a west and an east branch) |
| Crater zone | **Ashglass Field**, north flank (0, −100) |
| Heartwood grove | **Ember Root**, south flank (0, 100) |
| Bases | Cooled lava basins ringed with Ember Root, at (±130, 20) |

**Eruption cycle (Spec rule, Proposal detail)**

| Rule | Value |
|---|---|
| Interval | Every **4 min** (Short match: 2 min) |
| Channel choice | One of the three, never the same twice in a row |
| Warning | The chosen channel **glows and rumbles 20 s ahead** (Spec); the HUD marks it |
| Lava | Flows down both branches of the channel at 8 m/s; burns **80 damage/s** while standing in it (Proposal); lasts 25 s, then crusts |
| Cooling rock | Cells the lava crossed become **neutral and uncapturable for 60 s** (Spec), cutting a strip through both teams' territory |
| Structures | No Hub, Core or base is inside a channel (§7.7) |
| Cinder Salamanders | Killing one in a channel leaves a stepping stone (45 s; Titan 90 s) |

**Embergrass:** fields that burn when a Titan or Brawler charges through (Rampart Charge,
Roll Commit, Avalanche, Wrecking Rush). Fire spreads 1 m/s for 10 s, 20 damage/s; Ashwing Moths also ignite it.
**Wildlife:** Cinderfangs, Magma Beetles (lava trails), Ashwing Moths, Cinder Salamanders, Ash Vultures.
**Memory:** *The Fever*: the planet waking its volcanoes to burn out the infection.
**Callouts:** The Mouth · North / Middle / South Channel · Ashglass Field · Ember Root.
**Weather:** Clear, Ashfall. **Horizon:** the Glass Forest's dark edge; the Cairnback in the west.
**Risk:** random channel choice can decide a fight; the 20 s warning and the strict rotation (never twice in a row) keep it readable.

---

## 10.2 The Sleeper (Rimewastes)

**Identity:** slow, tense fights on a frozen lake above a giant that might be waking.
**Favours:** Hollow and Verdant (dry land and shore nodes), Bonespire (long sightlines across the ice).

| Layout | Value |
|---|---|
| Orientation | Bases west and east on the lake shores, half-buried in snow; mirror x = 0 |
| The lake | An oval 200 × 140 m in the centre; the Sleeper visible deep beneath the ice |
| Central Hub | **The Eye**, on a rock island in the lake's centre |
| Shore Hubs | Four, on the lakeshore (two per side) |
| Crater zone | **Rimeglass**, west flank in `gdd/16`; with mirror symmetry it sits on the centre line, north (0, −110) |
| Heartwood grove | **The Warm Spring**, south (0, 110): SAP keeps the ice open |
| Snow Halls | Caves in the north cliffs where Drift Owlbears sleep |

**Breakable ice (Spec rule, Proposal numbers)**

| Rule | Value |
|---|---|
| Ice panels | The lake is divided into hexagonal panels ~12 m across |
| Crack | A heavy impact cracks a panel: Titan slams, Brawler Roll Commit, any Stage 3 landing, Avalanche, Wrecking Rush |
| Break | A cracked panel gives way under the next heavy hit, or after 20 s with any Stage 2+ standing on it |
| In the water | −40% speed and **2% max Health/s** damage until they climb out (Spec) at any panel edge (1.0 s climb) |
| Refreeze | 90 s (Spec) |
| Nodes on the ice | Ice nodes can't be captured while their core panel is broken |

**The Sleeper's pulse (Spec):** in Phase 4, a heartbeat shockwave every **60 s** cracks all
lake ice at once. A deep thump 5 s ahead and a visible light pulse from beneath warn players.
**Wildlife:** Frostfangs, Snowback Grazers, Rime Weavers, Rimeback Stags, Stiltwalkers,
Drift Owlbears (2–3 drifts), Hoarfrost Mites (3–5 swarms).
**Memory:** *The Seventh*: the planet growing a seventh answer, then stopping.
**Weather:** Clear, Rime Fog, Breathing Night. **Horizon:** the Frozen Falls; the Drowsing One in an ice cave.
**Stillheart note:** Hoarfrost Mites and the cold suit it, but the map was designed before Stillheart; it isn't listed as favoured.

---

## 10.3 Shard Reef (Shattered Coast)

**Identity:** a coastal front where the tide opens and closes parts of the map.
**Favours:** Thornrunner and Brawler (causeway fights), Hollow (blinking across flooded ground).

| Layout | Value |
|---|---|
| Orientation | Bases north and south on the clifftops above the tide; mirror z = 0 |
| The Shard Reef | A reef of singing meteor glass in the centre; **The Singing Reef** Hub on it |
| Causeways | **Three causeways** (west, centre, east) link the reef to the shore, each 12 m wide, flooding at high tide |
| Crater zone | **The Glittering Shallows** (east flank in `gdd/16`; on the mirror line at (140, 0)) |
| Heartwood grove | **Kelp Root** (west, (−140, 0)), where the planet's roots reach the sea |
| Breaker's Steps | Fist-shaped craters down the cliffs; a vertical descent route on each side |

**The tide (Spec rule, Proposal detail)**

| Rule | Value |
|---|---|
| Cycle | Every **3 min** the tide comes in for **60 s** (Spec) |
| Warning | 15 s: waves grow, Shoal-lights scatter, the HUD shows a tide timer |
| Flooding | Two low-lying nodes on each side and all three causeways become **Inaccessible**; standing in flood water: −40% speed |
| Tidal Striders | 2–3 walk the flooded causeways; players beneath are hidden (r 4 m) |
| Low tide | **Tide pools** appear with small core caches (Proposal: 4 pools per side, 30 cores each) |
| The reef at high tide | Reachable only by Hollow Step, Tidal Strider cover (wading) or by holding position when it floods |

**Stillsong Whales:** a Planet Pulse event unique to this map; whale song stops Blight spreading within 60 m for 20 s.
**Wildlife:** Tide Scuttlers, Tidecrawlers, Strider Cranes, Shard Gulls (Gull Cliffs), Shoal-lights (ambient).
**Memory sites:** *The Breaker's Stand* (the cracked cliffs) and *The Deep Swallows* (the Deepmaw rising).
**Lore note (Spec):** the coast *looks* half-blighted (cyan-violet water, shard cliffs), but both teams start equal.
**Weather:** Clear, Shard Storm, Rime Fog. **Horizon:** the Last Bellow on a distant cliff.

---

## 10.4 The Nerve (Underroot)

**Identity:** a three-level cave map along the planet's nerves, where light gives you away.
**Favours:** Hollow (blink between levels), Thornrunner (ambush), Stillheart (holding chokepoints).

| Layout | Value |
|---|---|
| Levels | **Upper, Middle, Deep**, 14 m apart, linked by root-ramps (walkable) and drop-shafts (one-way) |
| Central Hub | **The Knot** on the Middle level, where nerve-roots meet |
| Bases | Deep caverns on the third (Deep) level, lit by nerve-light |
| Crater zone | **The Blight Pocket** (Murmur crept in through the tunnels) |
| Heartwood grove | **The Root Tendril**, a strand of the First Root reaching up from below |
| Nodes | Every level has nodes (vertical-map rule): ~10 per level |

**Nerve pulses (Spec):** every **20 s**, a wave of amber light runs along the nerve-roots;
any player in a **corridor** when it passes is **revealed for 2 s**. Chambers are safe.
Telegraph: the roots brighten 2 s ahead with a rising hum.
**Wildlife:** Lantern Lizards, Glow Lizards, Glasslegs, Burrowtusks (new tunnels mid-match), Lanternmoss.
**Apex:** the **Sixfold Wyrm**, which tunnels between levels.
**Memory:** *The Quiet Descends* (the Hollow First Answer sealing the deep places).
**Vertical rules (`gdd/42`):** the minimap shows levels; falls cost time, not Health; Stage 3s
can reach every level; footsteps above and below sound different.

---

## 10.5 The Skull Basin (2v2, Brood Skirmish)

**Identity:** a small circular arena inside the eye socket of a skull so large its rim is a cliff.

| Rule | Value |
|---|---|
| Size | About **160 m** across |
| Nodes | **10** |
| Hubs | **1**: the **Iris**, a raised bone disc in the centre that overlooks the whole basin |
| Enemy Cores | 1 per team |
| Flank zones | Small patches either side of the Iris |
| Symmetry | **Rotational** (the flank patches sit either side of the centre, so rotation works here) |
| The rim | Climbable on Bonevine at **4 points**; high ground exposed from both sides |

**Bone-fall (Spec):** every **2 min**, a chunk of the rim breaks off and crashes into the basin
at a **telegraphed** spot (a shadow and falling grit for 5 s, Proposal), dealing 300 damage in a
6 m radius and leaving permanent new cover.
**Wildlife:** Marrowhounds, one Trundleback (climbable cover).
**Mode rules:** EXP ×2; matches end around Level 15–18.

---

## 10.6 The Ash Sea (Ashen Steppe)

**Identity:** a dune field of grey ash where **the terrain changes every phase**.
**Favours:** Thornrunner and Hollow (dunes hide them), Bonespire (when the dunes open a sightline).

| Rule | Value |
|---|---|
| Dune shift | At the start of each phase, the wind rises for **20 s** and the dunes **move** (Spec) |
| What moves | Dunes (5–12 m tall) shift 20–40 m; **nodes never move**, paths between them do |
| Fairness | Each shift is mirrored across the map's symmetry; both teams get the same change |
| Telegraph | A visible storm front rolls across the map (a grey wall); visibility drops to 10 m inside it |
| Buried things | Shifts uncover Starshard veins and fossil caches and bury others |
| Default weather | Ashfall (sight 18 m; sound carries farther) |
| Crater zone | A half-buried meteor shard that rises out of the ash as the dunes move |
| Heartwood grove | An old root breaking through the ash |
| Wildlife | Gravel Skinks, Spurlarks, Ashfangs, Clashhorn Beetles, a Stiltwalker herd |
| Apex | The **Hive Colossus**, crossing the dunes in Phase 3 |
| Risk | Changing terrain can feel random; it must be telegraphed and identical for both teams |

**Production:** four pre-authored dune layouts (one per phase), blended during the 20 s storm,
so navigation and sightlines are tested in advance; nothing is procedural at runtime.

---

## 10.7 The Glass Forest (Cinderveil / Glasswaste)

**Identity:** a burnt forest where natural obsidian and Murmur Blight stand side by side,
and players have to read the difference. **Favours:** Thornrunner (trunks), Verdant (the living tree grove).

| Safeguard (Spec) | Rule |
|---|---|
| Obsidian is scenery; Blight is territory | Obsidian is never capturable or part of the node system |
| Blight always glows; obsidian never does | Blight pulses cyan-violet; obsidian is dull black with a faint red heat-glow from below |
| Sound differs | Blight whispers; obsidian ticks and creaks as it cools |
| UI never ambiguous | Minimap and HUD always use team colours |

**Heat vents (Spec):** cracks that pulse heat every **30 s**, damaging anyone on them (Proposal:
60 damage, 1 s), and briefly light the obsidian red, which makes everything easier to read.
**Crater zone:** where the Glasswaste creeps into the forest. **Grove:** a single living tree with green shoots.
**Memory:** *The Fever Meets the Glass*. **Wildlife:** Cinderfangs, Cinder Salamanders, Ash Vultures, Glass Weavers.
**Horizon:** the Rootless walking the edge.

---

## 10.8 The Weaver's Hollow (Rootwilds, proposal)

**Identity:** a vertical map fought on web-bridges strung across a deep forested valley.
**Favours:** Thornrunner (fast on strands), Verdant (canopy nodes), Bonespire (long views).

| Rule | Value |
|---|---|
| Levels | Forest floor, canopy, and the web itself |
| Web-bridges | Strands 3–5 m wide link the treetops; anyone can walk them |
| Cutting | Any strand can be **cut (8 s channel) or burned**; anyone on it drops to the level below (no damage) |
| Regrowth | Cut strands regrow after **90 s** |
| The Weavemother | Neutral Tier III at the web's centre; disturbing her makes her attack the closest player |
| Crater zone | East: a fallen shard caught in the web, glazing the strands |
| Grove | West: the Mother Oak, whose hollow is a sheltered node |
| Dawn | The web glows, lighting the valley |

---

## 10.9 The Heron Reach (Hollow Mire, 2v2 proposal)

**Identity:** a shallow lake where stealth is almost impossible. **Favours:** Hollow, Stillheart.

| Rule | Value |
|---|---|
| The flock | Thousands of Strider Cranes; any fight or fast movement in the open startles a section, revealing the players beneath it for **5 s** |
| Reed islands | Whisperreed islands give the only cover |
| Fogwell | A warm spring in the centre pours fog every **2 min**, hiding everything for ~10 s: the only safe time to move fast |

---

## 10.10 The Frozen Falls (Rimewastes, proposal)

**Identity:** a cliff map around a waterfall frozen mid-fall. Built to fill the Stillheart gap.
**Favours:** Stillheart (cold, chokepoints), Titan (breaking ice), Bonespire (high ground).

| Rule | Value |
|---|---|
| The falls | Divide the map vertically; marked climbing routes give a fast, exposed path up |
| Breakable ice | Heavy hits crack the falls, opening shortcuts or dropping climbers |
| The pool below | Unfrozen: falling in slows and damages, as on The Sleeper |
| Snow Halls | Caves where Drift Owlbears sleep |
| Crater zone | Rimeglass on the upper plateau |
| Grove | A Warm Spring at the base |

---

## 10.11 Lineage balance across all 13 maps (Spec, `gdd/42`)

| Lineage | Maps that favour it |
|---|---|
| Titan | Elder Ribs, Fevermouth, Skull Basin, Frozen Falls (4) |
| Brawler | Elder Ribs, Fevermouth, Shard Reef, Skull Basin (4) |
| Verdant | Breathing Canopy, The Sleeper, Glass Forest, Weaver's Hollow (4) |
| Hollow | Breathing Canopy, The Sleeper, Shard Reef, The Nerve, Ash Sea, Heron Reach (6) |
| Thornrunner | Ashfall, Breathing Canopy, Fevermouth, Shard Reef, The Nerve, Ash Sea, Glass Forest, Weaver's Hollow (8) |
| Bonespire | Ashfall, Elder Ribs, The Sleeper, Ash Sea, Weaver's Hollow, Frozen Falls (6) |
| Stillheart | The Nerve, Heron Reach, Frozen Falls (3) |

**Watch:** Thornrunner is favoured most often. New maps should avoid adding Thornrunner
advantages and favour Titan, Brawler or Stillheart.

## 10.12 The map pipeline (Spec, `gdd/42`)

1. Landmark chosen for its silhouette, story and gameplay idea.
2. One-page concept: identity, signature mechanic, lineages favoured.
3. Greybox following the map rules (§8.1).
4. Balance check: both bases equal; flank zones equidistant; every lineage has somewhere to shine.
5. Art pass: region palette, horizon landmarks, flora and wildlife.
6. Audio pass: soundscape, signature sounds, the region motif.
7. Memory sites placed.
8. Season fit: which season and Turn it launches in.

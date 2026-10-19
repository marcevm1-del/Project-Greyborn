# Part 6 — Variants, Invaders and Bosses

Regional variants, the full Blighted set, infection and rallying, sea creatures, the
Clamor (Season 3) and the six Hushed Answers. Labels as in Part 1.

## 6.1 Regional variants (Spec numbers)

Same as the base creature, plus one twist. Art reuses the base rig with a new
material set and one silhouette change, so each costs about 30% of a new creature.

| Variant | Base | Region · maps | Twist | Art change |
|---|---|---|---|---|
| Frostfang | Ashfang | Rimewastes · The Sleeper | Bites slow 25% for 2 s | White winter coat; frost on the muzzle; breath visible |
| Snowback Grazer | Mossback Grazer | Rimewastes · The Sleeper | Grazed cells: capture channels +25% longer | Snow instead of moss on the back; icicles on the horns |
| Rime Weaver | Weavemother | Rimewastes · The Sleeper, Frozen Falls | Webs break on any hit ≥ 150; anyone caught inside is rooted 1.0 s | Webs of ice lace that glint blue |
| Cinderfang | Ashfang | Cinderveil · Fevermouth, Glass Forest | Pawprints burn: 15/s for 3 s | Black fur with ember-orange cracks; glowing prints |
| Magma Beetle | Siege Beetle | Cinderveil · Fevermouth | Lava trail: 30/s for 4 s, structures included | Shell cracked with lava light; drips |
| Ashwing Moths | Ember Moth | Cinderveil · Fevermouth | Ignite Embergrass on touch (fire spreads 1 m/s for 10 s) | Larger, darker wings with burning edges |
| Tide Scuttler | Mire Scuttler | Shattered Coast · Shard Reef | Heals 5% max Health/s in surf | Barnacles; sea-green shell |
| Glow Lizard | Lantern Lizard | Underroot deep caves · The Nerve | Reveal radius 14 m | Larger throat sac; white-amber light |

## 6.2 Blighted forms

Every native except the Heartwood Elk has a Blighted form: the same body and rig,
remade in black glass and cyan light. Blighted creatures appear in three ways:

| How | Rule (Spec) |
|---|---|
| **Infect** (Blightborn player) | 3 s channel, range 3 m, on a Tier I–III creature below 50% Health. It fights for the Blightborn for 90 s at 60% Health and +15% damage, follows within 25 m, then dies and its cores go to the infector. One per player |
| **Territory** | A neutral creature standing on Blight for 30 s turns hostile to Wildborn only, until it leaves |
| **Native** | Glasswaste-adjacent maps and Murmur Surge events spawn Blighted forms directly |

**Rally** is the Wildborn mirror: the same channel and limits; the creature becomes **Kin**
(moss-flecked, amber-eyed) and fights for the Wildborn for 90 s, then leaves healed and its
cores go to the rallier. **Never converted:** Heartwood Elk, Old Ones, Clamor creatures,
Tier IV Apex (except the event-spawned Starbacked and Blighted Wyrm), Hushed Answers.

### Converted creature visuals (Proposal)

| Look | Infected | Rallied (Kin) |
|---|---|---|
| Transition | Glass creeps up from the feet over the 3 s channel | Moss and small flowers spread from the feet over the 3 s channel |
| Outline | The converter's team colour | Same |
| Eyes | Violet | Amber |
| End | Shatters to dust | Shakes itself, the moss falls away, and it walks off |

### Full Blighted list

Twists marked Spec come from `spec/04`; the rest from `gdd/09` and `gdd/34`. Rows marked
**new** are Proposals added here to complete the set.

| # | Native | Blighted form | Twist |
|---|---|---|---|
| 1 | Mossback Grazer | Glassback Grazer | Grazing adds Blight progress 5%/s on neutral or Wildborn cells (Spec) |
| 2 | Ashfang | Shardfang | When one is hit, the whole pack aggroes (Spec) |
| 3 | Stonehide Ox | Obsidian Ox | Charge leaves Glaze: −20% speed for Wildborn, 10 s (Spec) |
| 4 | Glimmerfox | Glintfox | Reveal shows Wildborn only (Spec) |
| 5 | Marrowhound | Murmurhound | Delivers eaten cores to the nearest Blightborn within 60 m at 8 m/s (Spec) |
| 6 | Duskmane | Hushmane | Cloaks in whispers instead of fog |
| 7 | Burrowtusk | Glassdigger | Tunnels lined with Blight |
| 8 | Greyback Colossus | The Starbacked | Back node starts blighted (Spec) |
| 9 | Strays | Hushed Strays | Evolve after 180 s (Spec) |
| 10 | Strider Crane | Shard Crane | Alarm is a ringing chime |
| 11 | Rootwalker | Lattice Walker | Guards Blightborn nodes |
| 12 | Knucklebrute | Geode Brute | Weak point moves to its back (Spec) |
| 13 | Hollowmonk | Whisper Monk | Pauses Wildborn progress only (Spec) |
| 14 | Spurlark | Glass Lark | Glittering trails reveal its path |
| 15 | Bonewright | Glasswright | Crystal totems buff Blighted creatures |
| 16 | The Old Tall | The Tall Hush | Raises Tension only on Wildborn borders |
| 17 | Sixhorn Ram | Shardhorn Ram | Longer knockback |
| 18 | Trundleback | Geode Shell | Underside visible from 15 m (Spec) |
| 19 | Lantern Lizard | Coldlight Lizard | Reveals Wildborn only (Spec) |
| 20 | Gravel Skink | Glass Skink | Burrows into Blight, leaving a trail |
| 21 | Hexmaw | Glassmaw | Hides under Glaze |
| 22 | Sapdrinker | Glowdrinker | Drains Wildborn SAP and adds it to the Blightborn (Spec) |
| 23 | Rimeback Stag | Glassback Stag | Stampede leaves Glaze |
| 24 | Sixfold Wyrm | Blighted Wyrm | Patron-event version, hunts Wildborn 45 s (Spec) |
| 25 | Weavemother | Glass Weaver | Webs can't be burned; shattered by 600 damage (Spec) |
| 26 | Threadlings | Glassthreads | 60 Health each; visible from 30 m (Spec) |
| 27 | Stiltwalker | Shardstilt | Hides Blightborn (Spec) |
| 28 | Mire Scuttler | Shard Scuttler | Weak-point hit breaks a claw: front reduction −45% (Spec) |
| 29 | Glasslegs | Truly Glass | Silent (Spec) |
| 30 | Tendril Crawler | Lattice Crawler | Grabbed players −10% healing for 8 s (Spec) |
| 31 | Bone Harvestman | Shard Harvestman | Nest holds Starshards: 100 cores (Spec) |
| 32 | Eightfold Matron | Glass Matron | Spawns Glassthreads |
| 33 | Ember Moth | Glimmer Moth | Drawn to Blightborn transformations |
| 34 | Siege Beetle | Shard Beetle | Damages Wildborn structures only |
| 35 | Rootworm | Shardworm | Emerges from fresh Blight |
| 36 | Thornwasp | Glasswasp | Chases Wildborn only |
| 37 | Hush Cicada | Murmur Cicada | Whisper hides Blightborn sound |
| 38 | Marrow Mantis | Glass Mantis | Leaves Glaze on the weak point it hits |
| 39 | Sapback Aphids | Shard Aphids | +2 SAP/s to the Blightborn; 70 Health (Spec) |
| 40 | Hive Colossus | Hive of Glass | Releases Glassthreads |
| 41 | Cairnshell | Geode Hermit | Wears a meteor shard |
| 42 | Clashhorn Beetles | Glasshorn Beetles | One mind; never fight each other |
| 43 | Lumen Bees | Glow Bees (**new**) | Boosts Blightborn nodes; drains 10% SAP from Wildborn nodes they visit |
| 44 | Seedcaller | Shardcaller (**new**) | Cells it crosses become neutral and can't be rooted for 30 s |
| 45 | Mossback Calves | Glass Calves (**new**) | Harming one makes a Glassback herd territorial toward Wildborn |
| 46 | Emberbark | Glassbark (**new**) | Attacks Clamor creatures and Wildborn |
| 47 | Drift Owlbear | Glass-furred Owlbear | Drift is Glaze; wakes only for Wildborn |
| 48 | Hoarfrost Mites | Shard Mites | Patches whisper; Blightborn don't slip |
| 49 | Cinder Salamander | Obsidian Salamander | Glass stepping stone, Blightborn only |
| 50 | Ash Vulture | Glass Vulture | Circles only above Wildborn about to die |
| 51 | Tidal Strider | Shard Strider | Hides Blightborn (Spec) |
| 52 | Shard Gull | Hush Gull | Silent; larger shards |
| 53 | Heartwood Elk | **None** | The Murmur can't touch it |
| 54 | Amber Beetles | Glow Beetles | 15 SAP to the Blightborn only (Spec) |

**Material recipe for any Blighted form (Proposal):** replace fur, bark and hide with
black glass (`#141821`, roughness 0.08) in the same shapes; keep 20–30% of the original
organic material showing at joints so the original creature is recognisable; cyan-violet
veins run toward the weak point; the eyes become violet. Movement is identical, but
groups of Blighted creatures move in sync (§1.9).

## 6.3 Sea creatures (coastal maps)

| Creature | Tier | Health | Role (Spec) | Look and sound (Proposal) |
|---|---|---|---|---|
| Shoal-lights | Ambient | — | Scatter from shore within 20 m of a fight | Thousands of tiny glowing fish; their scatter is a fight tell at night |
| Tidecrawlers | I | 150 | 15 cores; groups of 3–5 on beaches | Palm-sized crabs; clicks |
| Stillsong Whales | Ambient | — | Song (Planet Pulse, coastal): Blight stops spreading within 60 m for 20 s | Only backs and spouts visible far out; low song through the rock |
| The Deepmaw | Ambient | — | Never fought | A shadow under the reef at night; rises to swallow meteor fragments in a Memory |

## 6.4 The Clamor (Season 3 onward)

A third force that attacks **both** teams. Shared rules (Spec): Clamor creatures **can't be
rallied or infected**, attack both teams, and are drawn to the **loudest sound signature
within 40 m**. Art: crude, lumpy, asymmetrical; coal glow in cracks; steam; rust-red and
ash-black only; frantic movement.

### Landfall timeline (Proposal on `gdd/37`)

| Time | Event |
|---|---|
| −30 s | Red streak in the sky beside the Fall-line; low distant roar; the HUD marks the impact flank |
| −15 s | Wildlife on that flank stampedes toward the other side |
| −5 s | Sky on the impact flank turns red |
| 0 s | Impact: knockback within 20 m; a smoking crater with the burning **Landfall core** (Proposal: 6,000 Health) |
| +5 s | Spotting spreads across roots and Blight alike |
| +15 s | Shriekers pour out |
| +30 s | Spotting hardens into Crust (cells turn neutral and uncapturable); Spore Kites rise |
| +60 s | A Roar-vent bursts through if the core still stands; Ventborn defend it |
| Core destroyed | Scald stops spreading and burns out to grey ash over 60 s |

### Clamor stat blocks (Spec numbers)

| Creature | Tier | Health | Damage | Speed | Group | Cores | Key numbers |
|---|---|---|---|---|---|---|---|
| **Shriekers** | I | 100 each | 10 | 9.0 | Swarm of 6 | 30 per swarm | While any live: **all players within 20 m are revealed** |
| **Spore Kites** | I | 120 | — | 6.0 (flies) | 2–4 | 15 each | Land after 8 s aloft: a **Scald patch**, r 6 m (node goes neutral, uncapturable for 60 s) |
| **Ashmouths** | II | 900 | 60 | 5.0 | 1–3 | 60 | Eats a body in 3 s: **+10% Health and damage** per body (max 5) |
| **Kindlers** | II | 700 | 45 | 6.5 | 1–2 | 50 | Sets wildlife within 6 m burning: it panics and stampedes 6 s (20/s burn) |
| **Scald Hulks** | III | 3,800 | 130 | 3.0 | Solo | 180 + 20 SAP | 40% damage reduction; burning trail 20/s for 5 s |
| **Ventborn** | III | 3,000 | 150 | 4.5 | 2 per vent | 160 + 20 SAP | Leash 15 m to its Roar-vent; respawn only while the vent stands |

| Creature | Size (Proposal) | Look | Sound | Telegraphs |
|---|---|---|---|---|
| Shriekers | 0.6 m, six-legged | Eyeless, all mouth | Constant screaming | None needed (Tier I); their scream radius is shown as a red pulse ring |
| Spore Kites | 2 m wingspan | Flat membranous insects riding heat | A papery flutter | A spore cloud trails them; the landing spot shows a rust decal 2 s before they land |
| Ashmouths | 2.4 m, two-legged | Gaunt; jaws that open far too wide | Wet chewing, shrieks | Feeding is a 3 s kneel (interruptible); each body eaten adds a visible crust lump |
| Kindlers | 1.2 m, eight-legged | Quick, spider-like, glowing abdomens | Crackle and hiss | A 0.4 s abdomen flare before igniting wildlife |
| Scald Hulks | 3.6 m, four-legged | Thick crust, coal-glow cracks | Grinding, hissing steam | Slam 0.7 s with a ring decal; the burning trail is always visible |
| Ventborn | 3.0 m, two-legged | Fully armoured crust; crawl out of vents | A roar in rhythm with the vent | Shield bash 0.6 s, line decal 5 m |

### The Roar (Clamor apex)

| Field | Value |
|---|---|
| Tier | IV boss |
| Size (Proposal) | **20 m tall, 45 m long**, four crusted legs; a ridge of six vents along its back |
| Body | Dies when **all vents break**; body takes **−90% damage** (Spec) |
| Vents | **6 Roar-vents, 6,000 Health each** (Truce: 9,000), weak points (Spec) |
| Speed | 3.0 m/s; each broken vent −10% speed |
| Stomp | **400, radius 8 m, every 5 s** (Spec); 1.0 s foot-lift telegraph with a ring decal |
| Chorus | **Cone 90°, 25 m: 250 + silence 1.5 s, every 12 s** (Spec); each broken vent narrows it 15°; 1.2 s wind-up as the vents inhale (they glow brighter), cone decal |
| Aura | Within 30 m: all sound signatures maxed; calls disabled (Spec) |
| Ground | Eats roots and Blight: cells it crosses become burned-out neutral for 120 s (Spec) |
| Reward | 800 cores split + 200 SAP per team (Spec) |
| Where | Clamor Landfall finales; the Truce; Phase 4 Landfalls from Season 6 |
| Counter-play | One player makes noise to pull it while the others break vents; Stillheart slows it (co-op passive) |
| Animation | Walk, stomp, chorus inhale and blast, vent-break flinch (per vent), collapse into ash |
| Audio | Every Clamor sound at once; each broken vent removes one voice from the chorus |

## 6.5 The Hushed Answers (bosses)

The Murmur's glass copies of the six First Answers, used in season finales, the Truce
and a future Starwound mode. Shared rules (Spec):

| Rule | Value |
|---|---|
| Size | 12–20 m tall |
| Weak points | **3 crystal hearts**; it dies when all three break |
| Body | **−90% damage** |
| Heart Health | PvP finale (4 Wildborn): **5,000 each**, phase-scaled · co-op (8 players): **8,000 each** |
| Targets | Wildborn only (PvP finales) or everyone (co-op) |
| Phases | Phase 2 after the first heart, Phase 3 after the second: each adds the next attack and −15% to cooldowns |
| Enrage | 6 min after it appears: +50% damage |
| Reward | First-defeat Memory and cosmetic; 200 cores per player who dealt ≥ 3% of heart damage |
| Difficulty tiers (co-op) | Hushed (normal) · Ringing (+50% heart Health, faster attacks) · Shattering (+100%, an extra phase, no respawns in the final phase) |

**Look rules for all six (Proposal):** no Kith traces; no team outline; slow, perfect,
mechanical movement; a single deep tone per creature; hearts glow cyan through the glass
and pulse faster as the fight goes on.

### The Glass Range (copy of the Mountain That Walked, Titan) — Season 1 finale

| Field | Value |
|---|---|
| Height | 20 m (Proposal) |
| Speed | 2.0 m/s; walks a fixed path |
| Attack 1 (from start) | **Glass Quake:** radius 10 m, 300, stagger 1.0 s, every 8 s (Spec). Telegraph: 1.0 s, both fists raised, ring decal |
| Attack 2 (Phase 2) | **Ridge Line:** 40 m line of rising glass, 350, knock-up 1.0 s, every 14 s (Spec). Telegraph: 1.2 s, a crack runs along the line decal |
| Attack 3 (Phase 3) | **Kneel:** 3 s wind-up, radius 20 m, 600 (Spec). **Stand behind a pillar** (safe zones are the glass pillars raised by Ridge Line) |
| Hearts | Chest, back, crown (Spec). The back is reachable by flanking; the crown by standing on a Ridge Line pillar |
| Skill tested | Positioning and flanking |
| Sound | A struck glass bowl the size of a hill, every step |

### The Shatterer (copy of the Breaker, Brawler)

| Field | Value |
|---|---|
| Height | 14 m, knuckle-walking |
| Speed | 4.0 m/s |
| Attack 1 | **Geode Fists:** 2-hit combo, 250 each, every 4 s (Spec). Telegraph: 0.8 s fist raise per hit |
| Attack 2 (Phase 2) | **Leap:** lands at the farthest player, radius 6 m, 350, every 15 s (Spec). Telegraph: a 1.0 s crouch; the landing decal appears under the target |
| Attack 3 (Phase 3) | **Shard Halo:** shards orbit 8 m, 60/s to anyone inside, 10 s (Spec). Telegraph: shards rise around it for 1.0 s |
| Hearts | Both fists and the spine (Spec). Fist hearts glow for 1 s after each combo |
| Skill tested | Timing and punishing |

### The Lattice Grove (copy of the Breath, Verdant)

| Field | Value |
|---|---|
| Form | A walking forest of crystal trees, 12–16 m each |
| Speed | 1.0 m/s |
| Attack 1 | **Glass Roots:** 3 patches r 4 m, root 1.0 s + 150, every 10 s (Spec). Telegraph: glass cracks on the ground 1.0 s ahead |
| Attack 2 (Phase 2) | **Grow:** blights 2 cells/s around it (Spec). The team must uproot behind it |
| Attack 3 (Phase 3) | **Chime Heal:** heals 3% max Health/s for 6 s unless interrupted by 2,000 damage to the singing tree (Spec). The singing tree glows and rings |
| Hearts | Three trees within its grove (Spec); which three changes after each break |
| Skill tested | Territory control under pressure |

### The Unspoken (copy of the Quiet, Hollow)

| Field | Value |
|---|---|
| Form | Invisible; a faint violet outline flickers when it attacks |
| Speed | 5.0 m/s |
| Attack 1 | Invisible; **strikes for 280 from behind, every 6 s** (Spec). Tell: a rising whisper from the direction it approaches |
| Attack 2 (Phase 2) | **Silence Field:** r 15 m, no abilities 3 s, every 18 s (Spec). Telegraph: all sound fades over 1.0 s |
| Attack 3 (Phase 3) | **Pull:** draws all players to it, 200, then a 300 pulse 1 s later (Spec). Escape the pulse with Evade |
| Hearts | Visible only for 2 s after each strike (Spec) |
| Skill tested | Listening; must ship with on-screen sound indicators for accessibility |

### The Endless Pursuit (copy of the Hunt That Never Ended, Thornrunner)

| Field | Value |
|---|---|
| Form | A long glittering insect-like runner, 12 m tall, 30 m long |
| Speed | **9.0 m/s**; circles the map |
| Attack 1 | **Marks one player:** +30% damage to them for 10 s, every 15 s (Spec) |
| Attack 2 (Phase 2) | **Glass-dust trail:** 40/s for 4 s, −20% sight (Spec) |
| Attack 3 (Phase 3) | **Run-through:** 3 dashes of 25 m, 300 each (Spec). Telegraph: 0.8 s per dash, line decal |
| Hearts | Head, thorax, tail (Spec); exposed when Marked by a Thornrunner or stunned |
| Skill tested | Prediction and interception |

### The Archive (copy of the Rememberer, Bonespire)

| Field | Value |
|---|---|
| Form | A stationary cathedral of glass bones, 18 m |
| Speed | 1.5 m/s (slow turning) |
| Attack 1 | **Glass Lances:** 3 lances, 50 m, 220 each, every 6 s; ×1.5 on weak points (Spec). Telegraph: 0.8 s, a thin line from each lance to its target |
| Attack 2 (Phase 2) | **Reliquary:** releases 4 frozen creatures (Tier II stats), every 30 s (Spec) |
| Attack 3 (Phase 3) | **Remember:** repeats the last 3 player abilities used against it (Spec) |
| Hearts | Three reliquaries on its back (Spec) |
| Skill tested | Managing adds while focusing one target |

### Where each appears

| Hushed Answer | Map | Season or mode |
|---|---|---|
| The Glass Range | Ashfall Crossing | Season 1 finale |
| The Shatterer | Shard Reef | Coastal finale or Truce wave boss |
| The Lattice Grove | Breathing Canopy | Bloom-season event |
| The Unspoken | The Nerve | Rime-season event |
| The Endless Pursuit | Any large map | Hunt Weekend special |
| The Archive | The Elder Ribs | A finale about memory |
| All six | The Hushed Watch (Starwound floor) | Endgame co-op |

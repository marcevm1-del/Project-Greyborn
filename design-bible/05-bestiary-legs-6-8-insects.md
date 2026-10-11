# Part 5 — Bestiary II: Six-Legged, Eight-Legged and Insects

Same format and labels as Part 4. Numbers in the stat tables are **Spec**;
behaviour, telegraphs, sizes, animation, audio and look are **Proposal**.

---

# Six-legged creatures (non-insect)

## #17 Sixhorn Ram

| Field | Value |
|---|---|
| Tier · temperament | II · Territorial, solo or pair |
| Habitat · maps | Spirecliffs · The Frozen Falls, Ram's Crossing seed |
| Affinity | Titan |
| Size | 1.7 m at the shoulder, 2.6 m long; six legs, three pairs of curled horns |
| Health · damage · speed | 1,000 · 50 + **knockback 6 m** · 6.0 m/s |
| Cores · respawn | 55 · 90 s |
| Weak point | Underbelly between the middle legs, sides 90° when it rears |
| **Key mechanic** | Knockback can push players **off ledges** |

**Behaviour:** grazes on ledges. Warns at 10 m (stamps, lowers horns 1 s). Rams
anyone who stays. Prefers to charge when the target has a drop behind it.
**Attacks:** Head-butt (0.6 s wind-up, horns lowered, a short line decal 4 m; 50 + 6 m knockback; 6 s) · Kick (0.4 s, 40, rear only).
**Counter-play:** fight it away from edges; Titans are immune to the knockback (Immovable).
**Animation set:** graze, stamp-warn, head-butt, rear, kick, death.
**Audio:** horn clacks that echo off cliffs, a bleating bellow.
**Blighted — Shardhorn Ram:** crystal horns; knockback longer (Proposal: 8 m).

---

## #18 Trundleback

| Field | Value |
|---|---|
| Tier · temperament | III · Passive, solo |
| Habitat · maps | Bone Flats · The Elder Ribs, The Skull Basin |
| Affinity | Bonespire |
| Size | 2.8 m tall at the shell's crown, 5.0 m long; a six-legged armoured tortoise |
| Health · speed | 4,000 · 2.0 m/s |
| Cores · SAP · respawn | 180 + 20 SAP · 180 s |
| **Key mechanic** | **Immune** except its **underside** weak point: hittable from a 60° cone at ground level behind it, or from anywhere while **flipped**. Any knockback or stagger from a Titan or Brawler flips it for **4 s**. Its shell is a **3 m platform** |

**Behaviour:** wanders slowly between bone fields; ignores players entirely, including
those standing on its shell. When flipped, legs flail; it rights itself after 4 s with a 0.5 s roll.
**Counter-play:** a Titan's Quake Slam or a Brawler's uppercut flips it, then the team
bursts the belly. Players use the shell as moving high ground (a Bonespire's perch).
**Animation set:** walk, graze, flipped-flail loop, right-itself roll, withdraw head, death (shell stays as cover for 30 s).
**Audio:** slow scraping steps; a hollow boom when flipped.
**Look:** bone-white shell plates in a hexagon pattern; the underside is soft and amber-veined.
**Blighted — Geode Shell (Spec):** underside weak point visible from 15 m (it glows cyan through the plates).

---

## #19 Lantern Lizard

| Field | Value |
|---|---|
| Tier · temperament | I · Passive, solo |
| Habitat · maps | Underroot · Ashfall Crossing (tunnels), The Nerve |
| Size | 0.4 m tall, 1.2 m long |
| Health · speed · cores | 150 · 4.0 m/s · 10 |
| **Key mechanic** | Any player within **8 m** appears on the **enemy** minimap |

**Behaviour:** clings to tunnel walls and ceilings; its throat glows. Doesn't flee.
**Counter-play:** kill it before moving through a tunnel, or leave it as an alarm on your own flank.
**Animation set:** cling idle, crawl, throat pulse, death (light fades). **Audio:** a faint ticking.
**Look:** its throat sac glows amber; the light pulses brighter when a player is in range.
**Blighted — Coldlight Lizard (Spec):** violet light; reveals Wildborn only.
**Regional — Glow Lizard (Spec):** deep caves; reveal radius 14 m.

---

## #20 Gravel Skink

| Field | Value |
|---|---|
| Tier · temperament | I · Skittish, 2–4 |
| Habitat · maps | Ashen Steppe · Ashfall Crossing (Built: 2 per side + 1 centre), The Ash Sea |
| Size | 0.3 m tall, 0.9 m long |
| Health · speed · cores | 180 · 6.0 m/s · 15 |
| **Key mechanic** | Burrows for 5 s when a player comes within 6 m |

**Behaviour:** basks on flat stones; burrows at 6 m (a puff of gravel), resurfaces 5 s
later up to 8 m away. Pure, simple income for Stage 1 players.
**Animation set:** bask, head-bob, burrow, emerge, scurry, death. **Audio:** a gravel rattle.
**Blighted — Glass Skink:** burrows into Blight, leaving a trail.

---

## #21 Hexmaw

| Field | Value |
|---|---|
| Tier · temperament | III · Predator, ambush, solo |
| Habitat · maps | Hollow Mire · Breathing Canopy (mire edges) |
| Affinity | Hollow |
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

**Counter-play:** watch the mud for ripples; travel in pairs so someone can cut the tentacle; a Titan's Quake Slam staggers it free.
**Animation set:** submerged idle (ripples), tentacle strike, drag loop, bite, release, submerge, death (sinks).
**Audio:** bubbling; a wet crack on the strike; a sucking gurgle while dragging.
**Blighted — Glassmaw:** hides under Glaze instead of mud.

---

## #22 Sapdrinker

| Field | Value |
|---|---|
| Tier · temperament | II · Passive, solo, on a node |
| Habitat · maps | Rootwilds · Breathing Canopy |
| Affinity | Verdant |
| Size | 1.4 m tall, 2.4 m long; a tick-like six-legged drinker with a glassy abdomen that fills with SAP |
| Health · speed | 700 · 2.5 m/s |
| Cores · respawn | 45 · 90 s |
| **Key mechanic** | Drains **1 SAP/s** from the team holding its node (Verdant kill: **+30 SAP**) |

**Behaviour:** sits on a node's core with its proboscis in the ground. Its abdomen
glows brighter the more it has drained. Defends weakly (kick, 30 damage).
**Counter-play:** clear it from your nodes; leave it on enemy nodes.
**Animation set:** drink loop, abdomen fill (blend shape), scuttle, kick, death (abdomen bursts in an amber splash).
**Audio:** slurping; a soft gurgle.
**Blighted — Glowdrinker (Spec):** drains 1 SAP/s from the Wildborn **and adds it** to the Blightborn.

---

## #23 Rimeback Stag

| Field | Value |
|---|---|
| Tier · temperament | II · Skittish, herd of 5 |
| Habitat · maps | Spirecliffs, Rimewastes · The Sleeper, The Frozen Falls |
| Size | 2.0 m at the shoulder; six-legged, frost on the antlers |
| Health · speed | 800 · 8.0 m/s |
| Cores · respawn | 45 each · 90 s |
| **Key mechanic** | Killing one starts a **stampede** 25 m: **80 damage + 4 m knockback** to anyone in the path |

**Behaviour:** grazes in a loose herd. When one dies, the others bolt in a straight
25 m line away from the killer (the stampede line shows as a ground decal for 0.6 s
before they run).
**Counter-play:** kill a stag when the enemy stands in the stampede line.
**Animation set:** graze, alert, bolt, stampede run, death.
**Audio:** bugling calls; drumming hooves on ice.
**Blighted — Glassback Stag:** its stampede leaves Glaze.

---

## #24 Sixfold Wyrm (Apex)

| Field | Value |
|---|---|
| Tier · temperament | IV · Apex, solo |
| Habitat · maps | Underroot · The Nerve; patron event (Blighted Wyrm) on any map |
| Affinity | Brawler |
| Size | 6 m tall at the head when raised, **38 m long**; a six-legged serpent-dragon with a spade head |
| Health · speed | 28,000 · 6.0 m/s |
| Attacks | **Bite 400** · **Tail sweep 250, radius 8 m** |
| Cores · SAP | 400 + 100 SAP (split) |
| Weak point | The soft throat behind the jaw, front 90°, exposed while it rears for a Bite |
| **Key mechanic** | Bursts out at **100 Tension** in that region. **Burrows and resurfaces every 20 s near the loudest player** (lure it). The Murmur Surge version **hunts Wildborn for 45 s** |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Emerge | Spawn, or after a burrow | Ground cracks in a 10 m circle (1.5 s warning), then it bursts up: 150 damage, knock-up 0.6 s to anyone inside |
| Fight | Above ground | Bites (1.0 s rear-back, cone 60° 6 m, 400) and tail-sweeps (1.2 s coil, ring r 8 m, 250, knockback 4 m, every 10 s) |
| Burrow | Every 20 s | Dives (2 s), travels underground toward the player with the loudest sound signature in 60 m, emerges near them |
| Hunt (Murmur Surge) | Event spawn | Targets Wildborn only for 45 s, then burrows away |

**Counter-play:** the loudest player decides where it emerges, so a carrier with 300+
cores or a fresh Stage change can lure it into the enemy. Stand outside the crack circle.
**Animation set:** emerge, rear-bite, tail coil and sweep, burrow dive, underground travel (a moving ridge of earth), roar, death.
**Audio:** grinding rock underground (a rumble that moves); a hissing roar.
**Blighted — Blighted Wyrm (Spec):** the patron-event version; glass scales, cyan throat.

---

## #41 Cairnshell

| Field | Value |
|---|---|
| Tier · temperament | II · Passive, 2–3 |
| Habitat · maps | Spirecliffs · The Frozen Falls; climbs on Titans as cosmetic |
| Affinity | Titan |
| Size | 1.5 m tall with its boulder; six-legged hermit creature |
| Health · speed | 1,100 · 2.5 m/s |
| Cores · respawn | 50 · 90 s |
| **Key mechanic** | Drops its **boulder** when startled or killed: cover **3 m wide, 1,000 Health**. A Titan can **throw** it 20 m: **150 + 0.5 × P, stun 0.5 s** |

**Behaviour:** carries a boulder on its back. Startled at 6 m or by damage: drops the
boulder and scuttles away naked (pale, soft) to find another (40 s). The boulder stays
until destroyed.
**Counter-play:** create cover where you need it; a Titan picks up the boulder (1.0 s, interact) and throws it.
**Animation set:** walk, startle-drop, naked scuttle, re-shell, death.
**Audio:** stone scraping; a squeak when startled.
**Blighted — Geode Hermit:** wears a meteor shard instead of a boulder.

---

## #46 Emberbark

| Field | Value |
|---|---|
| Tier · temperament | III · Territorial, solo (Season 4) |
| Habitat · maps | Any map after a Clamor Landfall season |
| Size | 3.2 m tall; a six-legged creature armoured in thick charred bark |
| Health · damage · speed | 3,200 · 140 · 4.0 m/s |
| Cores · SAP · respawn | 160 + 20 SAP · 180 s |
| Weak point | A sap-filled split in the bark on its back, rear 120° |
| **Key mechanic** | Immune to burning; **×2 damage to Clamor creatures**; attacks them first |

**Behaviour:** patrols a 25 m area. If any Clamor creature is within 30 m, it goes for
it first, ignoring players unless attacked. Otherwise territorial (warns at 15 m).
**Attacks:** Bark slam (0.6 s, 140, 3 m) · Sap spray (0.5 s, cone 5 m, 80, puts out fire on allies; 10 s).
**Counter-play:** during a Landfall, lead Clamor creatures to it.
**Animation set:** patrol, warn, slam, sap spray, death. **Audio:** cracking bark, a low hum.
**Blighted form (Proposal) — Glassbark:** glass-sheathed; attacks Clamor and Wildborn.

---

## #51 Tidal Strider

| Field | Value |
|---|---|
| Tier · temperament | II · Passive; 2–3 at high tide |
| Habitat · maps | Shattered Coast · Shard Reef |
| Affinity | Hollow |
| Size | 5.0 m tall on long thin legs; body 3 m across |
| Health · speed | 1,300 · 3.0 m/s (walks on water) |
| Cores · respawn | 55 · 90 s |
| **Key mechanic** | Players beneath it (radius 4 m) are hidden from the enemy minimap and from sight beyond 10 m |

**Behaviour:** walks slow loops over the flooded causeways at high tide; stands still
on the beach at low tide. Ignores players.
**Animation set:** water-walk (feet dimpling the surface), stand, flinch, death (collapses into the water).
**Audio:** soft splashes, a low hum.
**Blighted — Shard Strider (Spec):** hides Blightborn beneath it, not Wildborn.

---

# Eight-legged creatures

## #25 Weavemother

| Field | Value |
|---|---|
| Tier · temperament | III · Territorial, solo |
| Habitat · maps | Rootwilds · Breathing Canopy (one per map, on a contested node), The Weaver's Hollow |
| Size | 2.4 m tall, legspan 7 m |
| Health · damage · speed | 2,600 · 120 · 4.0 m/s |
| Cores · SAP · respawn | 150 + 20 SAP · 180 s |
| Weak point | Spinnerets, rear 120° |
| **Key mechanic** | Webs a node every **60 s**: **Inaccessible** until **cut (8 s channel)** or **burned** (any burn removes it in 2 s) |

**Behaviour:** lives on a web between trees near a node. Every 60 s it spins over a
nearby node (8 s animation; interruptible by 300 damage). Attacks anyone who cuts a web within 20 m.
**Attacks:** Bite (0.5 s, 120) · Web shot (0.6 s, 15 m, roots 1.0 s, 12 s).
**Counter-play:** burn webs (Cinderfang trails, Kindler fire, Ashwing Moths); kill her to stop it.
**Animation set:** spin, hang, drop, bite, web shot, death (curls up).
**Audio:** silk singing as it stretches; a hiss.
**Look:** grey-banded, velvety; webs glisten with dew (amber at dusk).
**Blighted — Glass Weaver (Spec):** webs can't be burned; shattered by 600 damage instead (no channel).
**Regional — Rime Weaver (Spec):** webs break on any hit ≥ 150; anyone caught inside is rooted 1.0 s.

---

## #26 Threadlings

| Field | Value |
|---|---|
| Tier · temperament | I · Swarm of 12 |
| Habitat · maps | Rootwilds · Breathing Canopy; spawned by the Eightfold Matron |
| Affinity | Thornrunner |
| Size | 0.15 m each |
| Health · damage · speed | 40 each · 5 · 5.0 m/s |
| Cores | 24 per swarm |
| **Key mechanic** | Each Threadling within 3 m **slows 4%** (max 40%) |

**Behaviour:** drifts across the forest floor as a carpet; swarms anyone who steps into it.
**Counter-play:** area damage clears them fast (Quake Slam, Barb Volley, Thornstorm).
**Production:** GPU-instanced with vertex animation; the swarm is one AI agent with 12 visual members.
**Audio:** a dry rustle. **Blighted — Glassthreads (Spec):** 60 Health each; visible from 30 m (they shine and chime).

---

## #27 Stiltwalker

| Field | Value |
|---|---|
| Tier · temperament | II · Passive, solo or herd |
| Habitat · maps | Ashen Steppe · Ashfall Crossing, The Sleeper, The Ash Sea |
| Size | **8 m tall** on eight thin legs; body 4 m across |
| Health · speed | 1,500 · 3.0 m/s |
| Cores · respawn | 60 · 90 s |
| **Key mechanic** | Players beneath it (radius 4 m) are hidden from the enemy minimap and from sight beyond 10 m |

**Behaviour:** browses tall grass slowly; ignores players. Its slow route makes it a moving hide.
**Counter-play:** walk under it to cross open ground unseen; check under Stiltwalkers when hunting.
**Animation set:** stilt-walk, browse, flinch, death (folds legs and settles).
**Audio:** a slow creaking; a whale-like low moan.
**Blighted — Shardstilt (Spec):** hides Blightborn beneath it, not Wildborn.

---

## #28 Mire Scuttler

| Field | Value |
|---|---|
| Tier · temperament | II · Territorial, 1–2 |
| Habitat · maps | Hollow Mire · Breathing Canopy; tideline on Shard Reef |
| Affinity | Brawler |
| Size | 1.2 m tall, 2.4 m wide; crab-like, huge armoured front claws |
| Health · damage · speed | 1,000 · 60 · 4.0 m/s |
| Cores · respawn | 55 · 90 s |
| Weak point | The soft back, rear 120° |
| **Key mechanic** | **−90% damage from the front 180°** (exceeds the cap by design) |

**Behaviour:** always turns to face its attacker (turn rate 180°/s, so fast flankers get behind it).
**Attacks:** Claw pinch (0.5 s, 60) · Claw slam (0.7 s, 3 m arc, 80, stagger 0.3 s, 8 s).
**Counter-play:** one player holds its attention from the front while another hits its back.
**Animation set:** sidestep, claw guard, pinch, slam, turn, death.
**Audio:** clicking claws, bubbling.
**Blighted — Shard Scuttler (Spec):** a weak-point hit breaks a claw: front reduction falls to −45%.
**Regional — Tide Scuttler (Spec):** heals 5% max Health/s while in surf.

---

## #29 Glasslegs

| Field | Value |
|---|---|
| Tier · temperament | II · Predator, solo |
| Habitat · maps | Underroot · The Nerve, ice caves |
| Affinity | Hollow |
| Size | 1.6 m tall, legspan 4 m; translucent |
| Health · damage · speed | 800 · **70 first strike + root 0.5 s, then 50** · 6.0 m/s |
| Cores · respawn | 55 · 90 s |
| **Key mechanic** | **Invisible after 1.5 s still**; revealed only on its strike |

**Behaviour:** waits still in a corridor. World tell: a faint refraction, like heat
haze, visible within 5 m, and a single glint when a light source crosses it.
**Counter-play:** move with a Lantern Lizard nearby (light shows it); area attacks in corridors.
**Animation set:** still (shader), strike, chase, flee, death (shatters into clear fragments).
**Audio:** none until the strike; a glassy click on the strike.
**Blighted — Truly Glass (Spec):** silent; no attack sound.

---

## #30 Tendril Crawler

| Field | Value |
|---|---|
| Tier · temperament | III · Predator, solo |
| Habitat · maps | Hollow Mire · Breathing Canopy |
| Affinity | Hollow |
| Size | 2.2 m tall, 6 m tentacle reach; a land-octopus |
| Health · damage · speed | 3,000 · **50/s while holding** · 3.5 m/s |
| Cores · SAP · respawn | 170 + 20 SAP · 180 s |
| Weak point | The beak under the mantle, front 90°, exposed while holding |
| **Key mechanic** | Grabs **two** players within 8 m: **stun 1.5 s**; cooldown 14 s |

**Behaviour:** camouflaged against tree roots. When two players are within 8 m, it
raises two tentacles (0.7 s wind-up; two line decals) and grabs both.
**Counter-play:** spread out near it; a third player bursts its beak while it holds.
**Animation set:** camouflaged idle, double grab, hold loop, release, crawl, death.
**Audio:** wet suckers, a low gurgle.
**Blighted — Lattice Crawler (Spec):** grabbed players are Blighted: −10% healing received for 8 s.

---

## #31 Bone Harvestman

| Field | Value |
|---|---|
| Tier · temperament | II · Passive, solo |
| Habitat · maps | Bone Flats · The Elder Ribs (around the ribs) |
| Affinity | Bonespire |
| Size | 2.0 m tall on long thin legs |
| Health · speed | 900 · 3.5 m/s |
| Cores · respawn | 40 · 90 s |
| **Key mechanic** | Its nest fills with **1 core every 3 s, up to 80** (4 min). Nest: **300 Health**; anyone breaking it gets the stored cores |

**Behaviour:** carries bones from the flats to its nest, adding one every 30 s. The nest
visibly grows in three sizes (0–25, 26–55, 56–80 cores).
**Counter-play:** patrol the nests around the Ribs; a full nest is 80 free cores.
**Animation set:** walk, carry bone, place bone, flee, death.
**Audio:** bones clicking as they're placed; heard as a background sound around the Ribs.
**Blighted — Shard Harvestman (Spec):** nests hold Starshards: 100 cores.

---

## #32 Eightfold Matron (Apex)

| Field | Value |
|---|---|
| Tier · temperament | IV · Apex, solo |
| Habitat · maps | Underroot · Breathing Canopy (cave beneath the centre glade; nest wakes in Phase 3) |
| Affinity | Thornrunner |
| Size | **9 m tall, legspan 26 m** |
| Health · speed | 22,000 · 3.0 m/s |
| Attacks | **Bite 350** · **Web spit: root 1.5 s** |
| Cores · SAP | 400 + 100 SAP (split) |
| Weak point | The egg-sac under the abdomen, rear 120° |
| **Key mechanic** | Spawns a **Threadling swarm every 20 s** (max 4 alive) until she dies |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Nest | Default | Hangs above the cave floor; drops when a player enters the cave |
| Fight | Players in the cave | Bites (1.0 s, cone 6 m, 350); web spit every 8 s (0.8 s, 25 m projectile, root 1.5 s); a swarm every 20 s |
| Climb | Below 50% Health | Climbs to the ceiling for 6 s (out of melee range) and spits twice |
| Enrage | Below 20% | Swarms every 12 s |

**Counter-play:** area damage on the swarms; ranged damage while she climbs; a Thornrunner's affinity gives +25% cores.
**Animation set:** hang, drop, bite, spit, lay swarm, climb, ceiling hang, death.
**Audio:** a deep chittering; silk creaking; a scream at death.
**Blighted — Glass Matron:** spawns Glassthreads.

---

## #48 Hoarfrost Mites

| Field | Value |
|---|---|
| Tier · temperament | I · Swarm of 10; 3–5 swarms per map (Rime: more) |
| Habitat · maps | Rimewastes · The Sleeper |
| Affinity | Stillheart |
| Health · speed · cores | 30 each · 2.0 m/s · 15 per swarm |
| **Key mechanic** | Leave **slick patches** (radius 6 m, 20 s): **−30% turn rate, momentum slide**. Stillheart is unaffected and gains **+10% speed** on them |

**Behaviour:** drifts across ice; swarms toward the nearest Stillheart within 30 m.
**Look:** tiny glints of white light; patches are bright white frost with a sheen.
**Audio:** a faint crackle. **Blighted — Shard Mites:** patches whisper; Blightborn don't slip.

---

# Insects

## #33 Ember Moth

| Field | Value |
|---|---|
| Tier · temperament | I · Passive swarm of 8 |
| Habitat · maps | Ashen Steppe · Ashfall Crossing (dusk) |
| Health · speed · cores | 60 each · 4.0 m/s (flies) · 16 per swarm |
| **Key mechanic** | Drawn within **30 m** of any Stage transformation |

**Behaviour:** flutters over grass at dusk; converges on any transformation and circles the new form for 10 s.
**Counter-play:** easy cores for the transformed player; their glow gives away a transformation location.
**Look:** small grey moths whose wings glow ember-orange. **Blighted — Glimmer Moth:** drawn to Blightborn transformations.
**Regional — Ashwing Moths (Spec):** ignite Embergrass on touch (fire spreads 1 m/s for 10 s).

---

## #34 Siege Beetle

| Field | Value |
|---|---|
| Tier · temperament | III · Territorial, solo |
| Habitat · maps | Bone Flats · The Elder Ribs |
| Affinity | Titan |
| Size | 2.6 m tall, 4.0 m long; horned, heavily armoured |
| Health · damage · speed | 3,200 · 130 · 3.5 m/s |
| Cores · SAP · respawn | 170 + 20 SAP · 180 s |
| Weak point | The joint between head and thorax, front 60°, exposed when it lowers its horn |
| **Key mechanic** | **40% damage reduction.** Chases its **last attacker**; **200 damage per hit to structures** it touches (final) |

**Behaviour:** chases whoever hit it last, at 3.5 m/s, through anything. If a structure
is in its path, it rams it every 1.5 s until it's no longer in the way.
**Attacks:** Horn toss (0.6 s, 130, knockback 3 m) · Ram (0.8 s, line 6 m, 160).
**Counter-play:** the luring game: hit it, then run past an enemy Hub or Core so it rams
through. Defenders hit it last to pull it away.
**Animation set:** walk, horn lower, ram, toss, structure ram loop, death.
**Audio:** chitinous clacks, a heavy thud on every ram.
**Blighted — Shard Beetle:** damages Wildborn structures only.
**Regional — Magma Beetle (Spec):** lava trail, 30 damage/s for 4 s, structures included.

---

## #35 Rootworm

| Field | Value |
|---|---|
| Tier · temperament | I · Passive, 1–3 per freshly rooted node |
| Habitat · maps | Rootwilds · any map with fresh roots |
| Affinity | Verdant |
| Health · speed · cores | 80 · 2.0 m/s · 10 |
| **Key mechanic** | A Verdant eating one: **next Root −30% channel** |

**Behaviour:** emerges from a node 5 s after it's rooted (Wildborn) and wriggles for 30 s before burrowing.
**Blighted — Shardworm:** emerges from fresh Blight; speeds the next blight-capture.

---

## #36 Thornwasp

| Field | Value |
|---|---|
| Tier · temperament | II · Territorial swarm: nest + 6 wasps |
| Habitat · maps | Spirecliffs · The Frozen Falls |
| Affinity | Thornrunner |
| Health · damage · speed | Nest 800; wasps 30 each · 15/s per wasp · 7.0 m/s |
| Cores | 50 (nest) |
| **Key mechanic** | The swarm chases anyone within **10 m** of the nest for **12 s or 40 m** |

**Behaviour:** the nest hangs from a ledge. The swarm pursues the intruder and anyone
the intruder runs past (so it can be dragged into enemies).
**Counter-play:** run the swarm through the enemy; area damage kills wasps.
**Audio:** an angry drone that rises in pitch as it chases.
**Blighted — Glasswasp:** swarm chases Wildborn only.

---

## #37 Hush Cicada

| Field | Value |
|---|---|
| Tier · temperament | I · Passive, 3–5 |
| Habitat · maps | Hollow Mire · Breathing Canopy (the mire), The Nerve |
| Affinity | Hollow |
| Health · speed · cores | 60 · 1.0 m/s · 10 each |
| **Key mechanic** | While alive, **sound signatures within 15 m are muted** |

**Behaviour:** clings to reeds; never moves unless attacked. A natural stealth zone.
**Look:** grey-green with wing veins that glow faintly; the muted area shows a soft desaturation.
**Blighted — Murmur Cicada:** a constant whisper that hides Blightborn sound.

---

## #38 Marrow Mantis

| Field | Value |
|---|---|
| Tier · temperament | III · Predator, ambush, solo |
| Habitat · maps | Bone Flats · The Elder Ribs |
| Affinity | Bonespire |
| Size | 3.2 m tall when raised; bone-coloured |
| Health · damage | 2,400 · **150, always a weak-point hit (225)** |
| Cores · SAP · respawn | 160 + 20 SAP · 180 s |
| Weak point | The narrow neck, front 120° |
| **Key mechanic** | Strikes from stealth at **6 m**; cooldown 8 s |

**Behaviour:** stands motionless among fossil bones (a world tell: its forelegs are
the only bones folded at that angle). Strikes the closest player's weak point.
**Counter-play:** turn your weak point away from bone fields; Bulwark (front) doesn't help a Titan, whose weak point is on its back.
**Animation set:** freeze-camouflage, strike, raise threat pose, stalk, death.
**Audio:** a dry click just before the strike.
**Blighted — Glass Mantis:** leaves Glaze on the weak point it hits.

---

## #39 Sapback Aphids

| Field | Value |
|---|---|
| Tier · temperament | I · Passive herd of 6 |
| Habitat · maps | Rootwilds · Breathing Canopy |
| Affinity | Verdant |
| Health · speed · cores | 100 each · 1.5 m/s · 10 each |
| **Key mechanic** | While **3+ live** on your node: **+2 SAP/s** to your team |

**Behaviour:** feeds on a node; follows a Verdant within 15 m at a distance.
**Counter-play:** worth more alive. Protect yours; kill the enemy's.
**Blighted — Shard Aphids (Spec):** +2 SAP/s to the Blightborn; 70 Health each.

---

## #40 Hive Colossus (Apex)

| Field | Value |
|---|---|
| Tier · temperament | IV · Apex, solo |
| Habitat · maps | Ashen Steppe · The Ash Sea (crosses the dunes in Phase 3) |
| Affinity | Brawler |
| Size | **14 m tall**, 20 m long; a walking termite-mound creature on six stubby legs |
| Health | 26,000 + **4 shell plates of 2,500** |
| Attacks | **Slam 300**; releases a **6-wasp swarm every 15 s** |
| Cores · SAP | 400 + 100 SAP (+100 cores per plate broken) |
| **Key mechanic** | Body takes **−70% damage** until all four plates are broken |

**Behaviour:** walks a fixed path across the map. Plates (two on each side) are the
first targets; each broken plate drops 100 cores on the spot. Slams (1.2 s, ring r 6 m)
anything beside its legs.
**Counter-play:** split the team across both sides to break plates; area damage for the wasps.
**Audio:** a deep internal hum of millions of insects; plates crack like baked clay.
**Blighted — Hive of Glass:** releases Glassthread swarms.

---

## #42 Clashhorn Beetles

| Field | Value |
|---|---|
| Tier · temperament | II · Territorial pair |
| Habitat · maps | Ashen Steppe · Ashfall Crossing (Built: one pair per side at (±30, 12)) |
| Affinity | Brawler |
| Size | 1.4 m tall, 2.2 m long each; long forked horns |
| Health · damage · speed | 900 each · 55 · 4.5 m/s |
| Cores · respawn | 50 each · 90 s |
| **Key mechanic** | Ignore everything while dueling. Interrupting makes both attack. **Beating both within 10 s: Momentum 30 s** |

**Animation set:** duel loop (horns locked, shoving), break-off, charge, toss, death.
**Audio:** horn clacks every 2 s, audible at 30 m.
**Blighted — Glasshorn Beetles:** they never fight each other; they're one mind.

---

## #43 Lumen Bees

| Field | Value |
|---|---|
| Tier · temperament | I · Passive swarm of 6 (Season 4) |
| Health · speed · cores | 80 each · 5.0 m/s (flies) · 18 per swarm |
| **Key mechanic** | A node they visit gives **+25% SAP for 60 s** |

**Behaviour:** visits nodes and Hubs in a loop; a visited node glows gold for 60 s.
**Blighted form (Proposal) — Glow Bees:** visited Blightborn nodes give the bonus; Wildborn nodes they visit lose 10% SAP for 60 s.

---

## #54 Amber Beetles

| Field | Value |
|---|---|
| Tier · temperament | I · Passive, 5–10 |
| Habitat · maps | Heartwood groves; Breathing Canopy |
| Affinity | Verdant |
| Health · speed | 100 · 1.5 m/s |
| Cores · SAP | **0 cores, 15 SAP** each (Verdant: 20 SAP) |

**Look:** a single glowing bead of amber SAP on the back. **Blighted — Glow Beetles (Spec):** 15 SAP to the Blightborn only.

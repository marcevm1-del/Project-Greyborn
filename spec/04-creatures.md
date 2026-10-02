# Spec 04 — Creatures

Stats for every creature on Greyborn: the 54 natives, the regional and
Blighted variants, sea creatures, the seven Clamor creatures, the Hushed
Answers, Wild Ascendants and converted creatures. Concepts are from
`gdd/09`, `gdd/30`, `gdd/34`, `gdd/37`, `gdd/40` and `gdd/46`. Formulas and CC
rules are in [Spec 01](01-conventions.md). Core and SAP payouts feed the
economy in [Spec 05](05-economy.md).

## How creature stats work

Creatures don't level. Their damage is **flat** (not scaled by Power) and
rises with the match phase instead.

| Rule | Value |
|---|---|
| Phase scaling (Health and damage) | Phase 1 ×1.00 · Phase 2 ×1.15 · Phase 3 ×1.30 · Phase 4 ×1.45 |
| Core and SAP payouts | **Fixed** (don't scale with phase) |
| Lineage affinity | The matching lineage gets **+25% cores** (or the stronger effect listed) |
| Wildlife income cap | Each player gets full value from their first **600 wildlife cores** per match, then 50% |
| Tenacity | Tier I–II: 0% · Tier III: 20% · Tier IV: immune to all CC except slow (max 30%) |
| Damage reduction cap | 75% for Tier I–III (as players). **Bosses** (Tier IV, the Roar, the Hushed Answers) may exceed it where listed |
| Weak points | Every Tier II+ creature has one (×1.5, as players); breaking it is not tracked for creatures except where listed |
| Leash and reset | When pulled past its leash, a creature returns to its spawn at +50% speed, ignores damage, and heals to full |
| Out of combat | Heals 5% max Health/s after 8 s without combat |
| Kill credit | The player who deals the killing blow gets the cores, except Tier IV (split; see below) |
| Assist | Allies who dealt ≥ 10% of its Health in the last 15 s get **25%** extra cores (from the system, not taken from the killer) |

### Tier baselines

Designers tune within these ranges; each creature's row below is its starting value.

| Tier | Health | Hit damage | Attack interval | Speed (m/s) | Aggro radius | Leash | Cores | SAP | Respawn |
|---|---|---|---|---|---|---|---|---|---|
| **I** Critter | 60–300 | 0–25 | 1.5 s | 4–10 | Flees at 12 m | — | 10–20 (swarms: per swarm) | 0 | 45 s |
| **II** Beast | 600–1,500 | 40–70 | 1.2 s | 2.5–8 | 10 m | 25 m | 40–70 | 0 | 90 s |
| **III** Brute | 2,200–4,000 | 110–180 | 1.5 s | 3–5.5 | 15 m | 35 m | 120–180 | 20 | 180 s |
| **IV** Apex | 18,000–30,000 | 250–450 | 2.0 s | 2–6 | 25 m | None | 400 (split) | 100 | Once per phase from Phase 3 |

**Tier IV core split:** the 400 cores and 100 SAP are divided by **damage
share** among every player who dealt ≥ 3% of its Health; each team's SAP
goes to its pool. A Tier IV spawn is announced map-wide 10 s before it appears.

### Time to kill (reference)

Sustained damage per second for one player (rough, from Spec 02):
Stage 1 ~60 · Stage 2 ~150 · Stage 3 ~260.

| Tier (Phase 1 / 3) | One Stage 1 player | One Stage 2 player | Four Stage 3 players |
|---|---|---|---|
| I (200) | 3 s | 1–2 s | — |
| II (900 / 1,170) | 15 s | 6–8 s | — |
| III (3,000 / 3,900) | 50 s (and likely dies) | 20–26 s | 4 s |
| IV (25,000 / 32,500) | — | — | 24–31 s |

Targets: a Tier III should be a real fight for one Stage 1 player and a
quick detour for two Stage 2s; a Tier IV should take a full Stage 3 team
about 25–35 s, long enough for the enemy to contest.

---

## Four-legged creatures

| # | Creature | Tier | Health | Hit damage | Speed | Group | Cores | Key numbers |
|---|---|---|---|---|---|---|---|---|
| 1 | Mossback Grazer | II | 900 | — (passive) | 3.5 | Herd of 4 | 45 each | Grazing on an enemy cell adds **5% uproot progress/s** (about 20 s a cell). Herding: a player within 6 m behind the herd pushes it forward at 3.5 m/s |
| 2 | Ashfang | II | 700 | 50 / 1.0 s | 7.0 | Pack of 3 | 50 each | Hunts any player **below 30% Health within 40 m**; +30% damage to them |
| 3 | Stonehide Ox | III | 3,500 | 140 | 4.0 | Solo | 160 + 20 SAP | **Charge:** 25 m line at 10 m/s, 200 damage, knockdown (stun 1.0 s) to everything hit, creatures included; cooldown 10 s |
| 4 | Glimmerfox | I | 150 | — | 8.0 | Solo | 20 | Invisible after 2 s still. Killing it **reveals enemies within 15 m for 6 s** (Thornrunner: 25 m) |
| 5 | Marrowhound | II | 800 | 45 | 6.5 | Pair | 50 each | Eats dropped cores within 20 m (40 cores/s), holds up to **300**, drops all on death |
| 6 | Duskmane | III | 2,600 | 130 | 5.5 | Solo | 150 + 20 SAP | Stealthed in fog; **pounce** from 12 m: 180 damage + stun 0.8 s, cooldown 10 s; targets lone players (no ally within 15 m). Drops a **Void Pelt**: +10% Control for 60 s (Hollow: +15%) |
| 7 | Burrowtusk | II | 1,000 | 55 | 5.0 | Solo | 50 | Digs a tunnel between two nodes up to 80 m apart; lasts **60 s**; one every 120 s; 1.5 s to travel through |
| 8 | Greyback Colossus | IV | 30,000 | Stomp 300, radius 6 m, every 6 s | 2.5 | Solo | 400 + 100 SAP | Its back is a **3-cell moving node** (4 s root channel, Inaccessible while it's in enemy-only territory). Back reached by its tail ramp |
| 45 | Mossback Calves | I | 200 | — | 3.5 | 1–2 per herd (Bloom only) | 15 | Harming one makes its herd **territorial for 60 s**: Grazers attack for 45 / 1.2 s |
| 49 | Cinder Salamander | II | 600 | — | 5.0 (swims in lava) | 4–6 per map | 45 | Dives at 10 m. On death leaves a **cooling-rock stepping stone** (3 m) for 45 s (Titan: 90 s) |
| 53 | Heartwood Elk | IV | **Invulnerable** | — | 2.0 | 0–1 per match | 0 | In a Heartwood grove, roots spread **×3 for 30 s** for whoever holds the grove. Ignores combat; can't be infected |

## Two-legged creatures

| # | Creature | Tier | Health | Hit damage | Speed | Group | Cores | Key numbers |
|---|---|---|---|---|---|---|---|---|
| 9 | Strays (wild Kith) | I | 200 | 15 | 5.5 | Group of 3 | 15 each | Evolve after **300 s** unharmed within 30 m of held territory (Hushed Strays: 180 s). See *Wild evolution* below |
| 10 | Strider Crane | I | 120 | — | 9.0 (flies) | Flock of 6–8 | 10 each | Startled at 10 m (Hollow, Thornrunner: 5 m). Startling **reveals the startler for 4 s** to everyone |
| 11 | Rootwalker | II | 1,200 | 60 / 1.6 s | 3.0 | Solo, on a neutral node | 60 | The node can't be rooted while it lives. **Calm** (Verdant only): 3 s channel, removes it for 120 s without a fight; gives 60 cores |
| 12 | Knucklebrute | III | 3,000 | 160 | 5.0 | Solo | 170 + 20 SAP | Challenges the first player within 20 m. Winning alone (no ally damage) gives **Momentum: +10% damage and +10% speed for 30 s** |
| 13 | Hollowmonk | II | 900 | — | 3.0 | Solo | 55 | **Aura 12 m:** all capture and uproot progress paused |
| 14 | Spurlark | I | 160 | — | 10.0 | Solo | **40** (double) | Hard to catch; flees on a curving path |
| 15 | Bonewright | III | 2,400 | 120 | 3.5 | Solo + 3 totems | 150 + 20 SAP | Totems: 400 Health each, within 15 m; each gives wildlife nearby +10% damage and −10% damage taken (stacks to 3). **Bonewright takes −60% damage while any totem stands.** Rebuilds one totem every 20 s |
| 16 | The Old Tall | IV | 25,000 | Kick 350, cone 6 m | 2.0 | Solo | 400 + 100 SAP | Walks Hub to Hub. **Tension ×3** within 30 m. Planet Pulse version hunts Blightborn for 45 s, then leaves (no kill required) |
| 44 | Seedcaller | II | 700 | — | 6.0 | Solo | 45 | Regrows **1 neutral cell per 10 s** along its path, even from Scald |
| 47 | Drift Owlbear | III | 3,400 | 170 | 5.0 | 2–3 drifts per map | 170 + 20 SAP | Wakes when a player steps within **3 m** of its drift; rampages 20 s on the nearest creature, then sleeps if unharmed |
| 50 | Ash Vulture | I | 150 | — | 8.0 (flies) | 3–8 | 15 | Circles any spot with combat in the last 10 s; lands only on bodies |
| 52 | Shard Gull | I | 120 | 10 (mobs nest intruders) | 8.0 (flies) | Flock of 6–10 | 15 + a **Starshard** (30 cores, Thornrunner: 40) | Mobs anything within 8 m of its nest |

## Six-legged creatures

| # | Creature | Tier | Health | Hit damage | Speed | Group | Cores | Key numbers |
|---|---|---|---|---|---|---|---|---|
| 17 | Sixhorn Ram | II | 1,000 | 50 + knockback 6 m | 6.0 | Solo or pair | 55 | Knockback can push players off ledges |
| 18 | Trundleback | III | 4,000 | — (passive) | 2.0 | Solo | 180 + 20 SAP | **Immune** except its underside weak point: hittable from a 60° cone at ground level behind it, or from anywhere while **flipped** (any knockback or stagger from a Titan or Brawler flips it for 4 s). Shell is a 3 m platform |
| 19 | Lantern Lizard | I | 150 | — | 4.0 | Solo | 10 | Any player within **8 m** appears on the enemy minimap |
| 20 | Gravel Skink | I | 180 | — | 6.0 | 2–4 | 15 | Burrows for 5 s when a player comes within 6 m |
| 21 | Hexmaw | III | 2,800 | 60/s while holding | Ambush | Solo | 160 + 20 SAP | **Drag:** grabs a player within 10 m, pulls 2 m/s toward its mouth; grip broken by 400 damage to the tentacle (ally) or any stagger on the Hexmaw; cooldown 12 s |
| 22 | Sapdrinker | II | 700 | — | 2.5 | Solo, on a node | 45 | Drains **1 SAP/s** from the team holding its node (Verdant kill: +30 SAP) |
| 23 | Rimeback Stag | II | 800 | — | 8.0 | Herd of 5 | 45 each | Killing one starts a **stampede** 25 m: 80 damage + 4 m knockback to anyone in the path |
| 24 | Sixfold Wyrm | IV | 28,000 | Bite 400 · tail sweep 250, radius 8 m | 6.0 | Solo | 400 + 100 SAP | Bursts out at **100 Tension** in that region. Burrows and resurfaces every 20 s near the loudest player (lure it). Murmur Surge version hunts Wildborn for 45 s |
| 41 | Cairnshell | II | 1,100 | — | 2.5 | 2–3 | 50 | Drops its **boulder** when startled or killed: cover 3 m wide, 1,000 Health. A Titan can **throw** it 20 m: 150 + 0.5 × P, stun 0.5 s |
| 46 | Emberbark | III | 3,200 | 140 | 4.0 | Solo | 160 + 20 SAP | Immune to burning; **×2 damage to Clamor creatures**; attacks them first |
| 51 | Tidal Strider | II | 1,300 | — | 3.0 (walks on water) | 2–3 at high tide | 55 | Players beneath it (radius 4 m) are hidden from the enemy minimap and from sight beyond 10 m |

## Eight-legged creatures

| # | Creature | Tier | Health | Hit damage | Speed | Group | Cores | Key numbers |
|---|---|---|---|---|---|---|---|---|
| 25 | Weavemother | III | 2,600 | 120 | 4.0 | Solo | 150 + 20 SAP | Webs a node every 60 s: **Inaccessible** until cut (8 s channel) or burned (any burn removes it in 2 s) |
| 26 | Threadlings | I | 40 each | 5 | 5.0 | Swarm of 12 | 24 per swarm | Each Threadling within 3 m slows 4% (max 40%) |
| 27 | Stiltwalker | II | 1,500 | — | 3.0 | Solo | 60 | Players beneath it (radius 4 m) are hidden from the enemy minimap and from sight beyond 10 m |
| 28 | Mire Scuttler | II | 1,000 | 60 | 4.0 | 1–2 | 55 | **−90% damage from the front 180°** (exceeds the cap by design) |
| 29 | Glasslegs | II | 800 | 70 first strike + root 0.5 s, then 50 | 6.0 | Solo | 55 | Invisible after 1.5 s still; revealed only on its strike |
| 30 | Tendril Crawler | III | 3,000 | 50/s while holding | 3.5 | Solo | 170 + 20 SAP | Grabs **two** players within 8 m: stun 1.5 s; cooldown 14 s |
| 31 | Bone Harvestman | II | 900 | — | 3.5 | Solo | 40 | Its nest fills with **1 core every 3 s, up to 80** (4 min). Nest: 300 Health; anyone breaking it gets the stored cores |
| 32 | Eightfold Matron | IV | 22,000 | Bite 350 · web spit: root 1.5 s | 3.0 | Solo | 400 + 100 SAP | Spawns a Threadling swarm every **20 s** (max 4 alive) until she dies |
| 48 | Hoarfrost Mites | I | 30 each | — | 2.0 | Swarm of 10 | 15 per swarm | Leave **slick patches** (radius 6 m, 20 s): −30% turn rate, momentum slide. Stillheart is unaffected and gains +10% speed on them |

## Insects

| # | Creature | Tier | Health | Hit damage | Speed | Group | Cores | Key numbers |
|---|---|---|---|---|---|---|---|---|
| 33 | Ember Moth | I | 60 each | — | 4.0 (flies) | Swarm of 8 | 16 per swarm | Drawn within 30 m of any Stage transformation |
| 34 | Siege Beetle | III | 3,200 | 130 | 3.5 | Solo | 170 + 20 SAP | 40% damage reduction. Chases its **last attacker**; **200 damage per hit to structures** it touches |
| 35 | Rootworm | I | 80 | — | 2.0 | 1–3 per freshly rooted node | 10 | A Verdant eating one: **next root −30% channel** |
| 36 | Thornwasp | II | Nest 800; wasps 30 each | 15/s per wasp | 7.0 | Nest + 6 wasps | 50 (nest) | Swarm chases anyone within 10 m of the nest for 12 s or 40 m |
| 37 | Hush Cicada | I | 60 | — | 1.0 | 3–5 | 10 each | While alive, **sound signatures within 15 m are muted** |
| 38 | Marrow Mantis | III | 2,400 | 150, **always a weak-point hit** (225) | 5.5 | Solo, ambush | 160 + 20 SAP | Strikes from stealth at 6 m; cooldown 8 s |
| 39 | Sapback Aphids | I | 100 each | — | 1.5 | Herd of 6 | 10 each | While **3+ live** on your node: **+2 SAP/s** to your team |
| 40 | Hive Colossus | IV | 26,000 + 4 shell plates of 2,500 | Slam 300; releases a 6-wasp swarm every 15 s | 2.5 | Solo | 400 + 100 SAP (+100 cores per plate broken) | Body takes **−70% damage** until all four plates are broken |
| 42 | Clashhorn Beetles | II | 900 each | 55 | 4.5 | Pair | 50 each | Ignore everything while dueling. Interrupting makes both attack. Beating both within 10 s: **Momentum 30 s** (as Knucklebrute) |
| 43 | Lumen Bees | I | 80 each | — | 5.0 (flies) | Swarm of 6 | 18 per swarm | A node they visit gives **+25% SAP for 60 s** |
| 54 | Amber Beetles | I | 100 | — | 1.5 | 5–10 | **0 cores, 15 SAP** each | Verdant: 20 SAP |

---

## Regional variants

Same as the base creature, with these changes.

| Variant | Base | Change |
|---|---|---|
| Frostfang | Ashfang | Bites slow 25% for 2 s |
| Snowback Grazer | Mossback Grazer | Grazed cells: capture channels **+25% longer** |
| Rime Weaver | Weavemother | Webs break on any hit ≥ 150 damage; anyone caught inside is rooted 1.0 s |
| Cinderfang | Ashfang | Pawprints burn: 15 damage/s for 3 s |
| Magma Beetle | Siege Beetle | Lava trail: 30 damage/s for 4 s, structures included |
| Ashwing Moths | Ember Moth | Ignite Embergrass on touch (fire spreads 1 m/s for 10 s) |
| Tide Scuttler | Mire Scuttler | Heals 5% max Health/s while in surf |
| Glow Lizard | Lantern Lizard | Reveal radius **14 m** |

## Blighted variants

Every Blighted creature keeps its base stats. The ones with a mechanical twist:

| Blighted form | Change from base |
|---|---|
| Glassback Grazer | Grazing adds **Blight** progress (5%/s) on neutral or Wildborn cells |
| Hushed Strays | Evolve after 180 s |
| Murmurhound | Delivers eaten cores to the nearest Blightborn within 60 m (runs at 8 m/s) |
| Shard Aphids | +2 SAP/s to the Blightborn; 70 Health each |
| Glass Weaver | Webs can't be burned; shattered by 600 damage instead (no channel) |
| The Starbacked | Its back node starts **blighted** |
| Shardfang | When one is hit, the whole pack aggroes |
| Obsidian Ox | Charge leaves Glaze: −20% speed for Wildborn, 10 s |
| Glintfox / Coldlight Lizard / Whisper Monk / Shardstilt / Shard Strider / Glass Vulture | Their effect applies to **Wildborn only** (or hides Blightborn only) |
| Geode Brute | Weak point moves to its back (Bonespire easy shot) |
| Geode Shell | Underside weak point visible from 15 m |
| Glowdrinker | Drains 1 SAP/s from the Wildborn **and adds it** to the Blightborn |
| Glassthreads | 60 Health each; visible from 30 m |
| Shard Scuttler | A weak-point hit breaks a claw: front reduction falls to −45% |
| Truly Glass | Silent; no attack sound |
| Lattice Crawler | Grabbed players are Blighted: −10% healing received for 8 s |
| Shard Harvestman | Nest holds Starshards: 100 cores |
| Glow Beetles | 15 SAP each to the Blightborn only |

**Never infected:** Heartwood Elk, Old Ones, Clamor creatures, Tier IV Apex (except the event-spawned Starbacked and Blighted Wyrm).

## Infect, Rally and converted creatures

| Rule | Value |
|---|---|
| Channel | 3 s, range 3 m, target Tier I–III below 50% Health |
| Duration | 90 s |
| Converted stats | Health restored to 60% of max; **+15% damage**; base stats otherwise |
| Behaviour | Follows its converter within 25 m; attacks the converter's target; responds to an attack ping |
| Limit | 1 per player |
| End (Infect) | Dies; its cores go to the infector |
| End (Rally) | Leaves healed; its cores go to the rallier |
| Territory effect | A neutral creature standing on one team's ground for **30 s** turns hostile to the other team only, until it leaves |

## Wild evolution

| Step | Trigger | Stats | Reward |
|---|---|---|---|
| Stray | — | Tier I (above) | 15 cores |
| Wild Brute | A Stray unharmed for 300 s within 30 m of held territory | Tier III: 2,800 Health, 150 damage, 5.0 m/s, leash 30 m | 160 + 20 SAP |
| **Wild Ascendant** | A Wild Brute alive for 300 more s; **max once per match** | Stage 3 size; **12,000 Health**; the Q/E/R of a random lineage at Rank 3 with Power = 60% of that lineage's L20 Power; no Ultimate; leash 40 m | 400 cores (split) + a **Wild Echo**: the killing team gets that lineage's passive for **60 s** |

---

## Sea creatures (coastal maps)

| Creature | Tier | Health | Notes |
|---|---|---|---|
| Shoal-lights | Ambient | — | Scatter from shore within 20 m of a fight |
| Tidecrawlers | I | 150 | 15 cores; groups of 3–5 on beaches |
| Stillsong Whales | Ambient | — | Song (Planet Pulse, coastal): Blight stops spreading within 60 m for 20 s |
| The Deepmaw | Ambient | — | Never fought |

## Clamor creatures

All Clamor creatures **can't be rallied or infected**, attack **both** teams,
and are drawn to the loudest sound signature within 40 m.

| Creature | Tier | Health | Hit damage | Speed | Group | Cores | Key numbers |
|---|---|---|---|---|---|---|---|
| Shriekers | I | 100 each | 10 | 9.0 | Swarm of 6 | 30 per swarm | While any live: **all players within 20 m are revealed** |
| Spore Kites | I | 120 | — | 6.0 (flies) | 2–4 | 15 each | Land after 8 s aloft: a **Scald patch**, radius 6 m (node goes neutral, uncapturable for 60 s) |
| Ashmouths | II | 900 | 60 | 5.0 | 1–3 | 60 | Eats a body in 3 s: **+10% Health and damage** per body (max 5) |
| Kindlers | II | 700 | 45 | 6.5 | 1–2 | 50 | Sets wildlife within 6 m burning: the creature panics and stampedes for 6 s (20 damage/s burn) |
| Scald Hulks | III | 3,800 | 130 | 3.0 | Solo | 180 + 20 SAP | 40% damage reduction; burning trail 20 damage/s for 5 s |
| Ventborn | III | 3,000 | 150 | 4.5 | 2 per vent | 160 + 20 SAP | Leash 15 m to its Roar-vent; respawn only while the vent stands |
| **The Roar** | IV boss | Body: dies when all vents break | Stomp 400, radius 8 m, every 5 s · Chorus cone 90°, 25 m: 250 + silence 1.5 s, every 12 s | 3.0 | Solo | 800 split + 200 SAP per team | **6 Roar-vents, 6,000 Health each** (weak points). Body takes **−90% damage**. Each broken vent: −10% speed and the chorus cone narrows 15°. Within 30 m: all sound signatures maxed, calls disabled. Eats roots and Blight: cells it crosses become burned-out neutral for 120 s |

Truce mode (8 players): Roar vents 9,000 Health each.

## The Hushed Answers

Shared rules (`gdd/40`):

| Rule | Value |
|---|---|
| Size | 12–20 m tall (larger than Stage 3) |
| Weak points | **3 crystal hearts**. The Hushed Answer dies when all three break |
| Body | Takes **−90% damage** (bosses exceed the cap) |
| Heart Health (PvP finale, 4 Wildborn) | 5,000 each, phase-scaled |
| Heart Health (co-op, 8 players) | 8,000 each |
| Targets | Wildborn only (PvP finales) or everyone (co-op) |
| Phases | Phase 2 after the first heart, Phase 3 after the second: each phase adds the next attack in its list and −15% to its cooldowns |
| Enrage | 6 min after it appears: +50% damage |

| Hushed Answer | Copies | Speed | Attack 1 (from start) | Attack 2 (Phase 2) | Attack 3 (Phase 3) | Hearts |
|---|---|---|---|---|---|---|
| **The Glass Range** | Titan | 2.0 | Glass Quake: radius 10 m, 300, stagger 1.0 s, every 8 s | Ridge Line: 40 m line of rising glass, 350, knock up 1.0 s, every 14 s | Kneel: 3 s wind-up, radius 20 m, 600 (stand behind a pillar) | Chest, back, crown |
| **The Shatterer** | Brawler | 4.0 | Geode Fists: 2-hit combo, 250 each, every 4 s | Leap: lands at the farthest player, radius 6 m, 350, every 15 s | Shard Halo: shards orbit 8 m, 60/s to anyone inside, 10 s | Both fists, spine |
| **The Lattice Grove** | Verdant | 1.0 | Glass Roots: 3 patches radius 4 m, root 1.0 s + 150, every 10 s | Grow: blights 2 cells/s around it (the team must uproot behind it) | Chime Heal: heals 3% max Health/s for 6 s unless interrupted by 2,000 damage to the singing tree | Three trees within its grove |
| **The Unspoken** | Hollow | 5.0 | Invisible; strikes for 280 from behind, every 6 s | Silence Field: radius 15 m, no abilities 3 s, every 18 s | Pull: draws all players to it, 200, then a 300 pulse 1 s later | Appear only for 2 s after each strike |
| **The Endless Pursuit** | Thornrunner | 9.0 | Marks one player; +30% damage to them for 10 s, every 15 s | Glass-dust trail: 40/s for 4 s, −20% sight | Run-through: 3 dashes of 25 m, 300 each | Head, thorax, tail |
| **The Archive** | Bonespire | 1.5 | Glass Lances: 3 lances, 50 m, 220 each, every 6 s; ×1.5 on weak points | Reliquary: releases 4 frozen creatures (Tier II stats), every 30 s | Remember: repeats the last 3 player abilities used against it | Three reliquaries on its back |

**Rewards:** each Hushed Answer gives its first-defeat Memory and cosmetic
(`gdd/40`), plus 200 cores per player who dealt ≥ 3% of heart damage.

## The Old Ones

The Old Ones (Greymother, the Cairnback, Old Hush, the Scarred Runner) are
**invulnerable scenery**. During an **Old One Crossing** event they walk a
path across the map for 60 s; within 25 m of one, **roots and Blight both
spread ×2** (capture channels −30%, uproot −30%) for both teams.

---

## Placement per match

| Map size | Tier I groups | Tier II | Tier III | Tier IV |
|---|---|---|---|---|
| Standard map | 16–20 | 10–12 | 4–6 | 1 per phase from Phase 3 (2 max) |
| Large map | 22–26 | 14–16 | 6–8 | Same |

Each map uses the creatures of its biomes (`gdd/16`, `gdd/42`); a camp's
creature is fixed per map, so players can learn routes. **Mirror rule:**
every camp has a matching camp in the same position on the other side.

## Turn modifiers

| Turn | Wildlife change |
|---|---|
| Bloom | +1 Tier I group per biome; Mossback Calves present; Lumen Bees active |
| Ash | Ash Vultures ×2; Ashfang packs of 4 |
| Rime | All wildlife −10% speed; Hoarfrost Mites swarm; Drift Owlbears in deep sleep (wake radius 1.5 m) |
| Fever | Predators +10% damage; Cinder Salamanders on every lava map |

## Creature tuning targets

| Measure | Target |
|---|---|
| Wildlife share of a player's EXP | 15–20% |
| Tier III kills by a single Stage 1 player that end in the player's death | 40–60% |
| Tier IV contested by both teams | ≥ 70% of spawns |
| Time to kill a Tier IV (four Stage 3 players) | 25–35 s |
| Wild Ascendant appearances | 10–20% of matches |

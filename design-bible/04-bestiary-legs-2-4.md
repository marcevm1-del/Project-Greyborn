# Part 4 — Bestiary I: Four-Legged and Two-Legged Creatures

Stat blocks follow the format in Part 1 (§1.3). **Health, damage, speed, group,
cores, SAP and key numbers are Spec** (`spec/04`); Phase 1 values. Sizes,
behaviour states, telegraphs, animation, audio and look are **Proposal**.

Shared states (Idle, Alert, Flee, Engage, Leash, Recover, Dead, Converted) are
defined in §1.9. Each creature lists only what differs.

---

# Four-legged creatures

## #1 Mossback Grazer

| Field | Value |
|---|---|
| Tier · temperament | II · Passive, herd of 4 |
| Habitat · maps | Rootwilds · Ashfall Crossing (south plain), Breathing Canopy |
| Affinity | Verdant (+25% cores) |
| Size | 2.4 m at the shoulder, 4.2 m long; a broad, slow herbivore with a mossy back like a hillside |
| Health · damage · speed | 900 · none · 3.5 m/s |
| Cores · respawn | 45 each · 90 s |
| Weak point | Soft throat under the jaw, front 90°, 0.18 × height |
| **Key mechanic** | Grazing on an enemy cell adds **5% uproot progress/s** (~20 s per cell). **Herding:** a player within 6 m behind the herd pushes it forward at 3.5 m/s |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Graze | Default | Moves cell to cell at 0.8 m/s, head down; prefers cells with the most grass. Grazing an enemy-owned cell erodes it |
| Herded | A player within 6 m behind the herd's centre, inside a 90° cone | The herd walks away from the player at 3.5 m/s, keeping formation (2 m spacing) |
| Startle | Damage to any member | All four trot 15 m away, then resume grazing |
| Territorial (Bloom only) | A Calf harmed | Spec: Grazers attack for 45 damage every 1.2 s for 60 s |

**Counter-play:** herd it onto enemy nodes instead of killing it; it's worth more
alive as a slow siege tool. Defenders kill or push it back.

**Animation set:** graze loop, walk, trot, startle, herd-walk (head up, glancing back),
territorial charge (Bloom), death (kneels, lies down, moss spreads).

**Audio:** low lowing, tearing grass, heavy soft footfalls; a rumbling bellow when startled.

**Look:** grey-green hide, moss and small ferns growing on the back, wide flat horns
swept back. Grazed cells show bitten-down roots or Glaze.

**Blighted — Glassback Grazer (Spec):** grazing adds **Blight** progress (5%/s) on
neutral or Wildborn cells. Moss replaced by glass shards; its back glitters.

---

## #2 Ashfang

| Field | Value |
|---|---|
| Tier · temperament | II · Predator, pack of 3 (Ash Turn: 4) |
| Habitat · maps | Ashen Steppe · Ashfall Crossing (south and north plains), The Ash Sea |
| Affinity | Thornrunner |
| Size | 1.3 m at the shoulder, 2.2 m long; lean grey canid with an ash-crusted mane |
| Health · damage · interval · speed | 700 · 50 · 1.0 s · 7.0 m/s |
| Cores · respawn | 50 each · 90 s |
| Weak point | Flank behind the ribs, left and right 90°, 0.2 × height |
| **Key mechanic** | Hunts any player **below 30% Health within 40 m**; +30% damage to them |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Patrol | Default | The pack trots a 30 m loop around its den, nose down |
| Stalk | A player below 30% Health within 40 m | Splits into a fan (one ahead, two flanking) and closes at 5 m/s, low to the ground |
| Hunt | Within 10 m of the wounded target | Sprints at 7 m/s; bites with +30% damage |
| Defend | Attacked by a healthy player | Normal Engage; flees at 25% Health |
| Lose interest | The target heals above 45%, or reaches a held Hub with Defense Level 3+ | Returns to Patrol |

**Attacks**

| Attack | Telegraph | Wind-up | Area | Damage | Cooldown |
|---|---|---|---|---|---|
| Bite | Head drops, lips curl, snarl | 0.4 s | Melee 2 m | 50 (65 vs. wounded) | 1.0 s |
| Leap bite | Crouch, hind legs bunch | 0.5 s | 6 m lunge | 60 | 6 s |

**Counter-play:** don't retreat through the steppe alone at low Health; heal first, or
travel with a brood-mate. A pack chasing a wounded enemy can be followed to find them.

**Animation set:** trot, sprint, stalk-crawl, bite, leap bite, howl (pack call), flinch, flee, death.

**Audio:** a dry, husky howl to start a hunt; pants and snarls; paws in ash.

**Look:** grey fur matted with ash, pale yellow eyes, a ridge of stiff mane. Readable
silhouette: lean, low, ears flat when hunting.

**Blighted — Shardfang (Spec):** when one is hit, the whole pack aggroes. Glass shards
in the mane; the pack moves in perfect step.
**Regional:** Frostfang (Rimewastes; bites slow 25% for 2 s), Cinderfang (Cinderveil;
pawprints burn 15/s for 3 s).

---

## #3 Stonehide Ox

| Field | Value |
|---|---|
| Tier · temperament | III · Territorial, solo |
| Habitat · maps | Spirecliffs · Ashfall Crossing (Built: one per side at (±40, −12)) |
| Affinity | Titan |
| Size | 3.6 m at the shoulder, 5.5 m long; a rock-plated bovine |
| Health · damage · interval · speed | 3,500 · 140 · 1.5 s · 4.0 m/s |
| Cores · SAP · respawn | 160 + 20 SAP · 180 s |
| Weak point | Exposed belly seam, visible from the sides when it rears for a Charge; otherwise the soft nape (rear 90°) |
| **Key mechanic** | **Charge:** 25 m line at 10 m/s, 200 damage, **knockdown 1.0 s** to everything hit, creatures included; cooldown 10 s |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Graze | Default | Grazes slowly within 8 m of its rock |
| Warn | A player within 15 m | Paws the ground, snorts (2 s); does nothing else unless the player stays or attacks |
| Engage | Attacked, or a player stays inside 15 m for 4 s | Gores in melee; uses Charge when the target is 8–25 m away |
| Charge | Cooldown ready and target in range | Lowers horns, a 0.8 s wind-up, then a straight line; doesn't steer |
| Stun self | Charge ends in a wall or a large rock | Dazed 1.5 s; weak point exposed from all sides |

**Attacks**

| Attack | Telegraph | Wind-up | Area | Damage | Cooldown |
|---|---|---|---|---|---|
| Gore | Head swings back | 0.5 s | Melee 3 m, 90° cone | 140 | 1.5 s |
| Charge | Line decal 25 m, fills over the wind-up; dust plumes from the hooves | 0.8 s | 25 m × 3 m line | 200 + knockdown 1.0 s | 10 s |

**Counter-play:** stand between it and an enemy, then step aside: the Charge hits
everything in its path. Bait it into rocks to daze it.

**Animation set:** graze, paw-warn, gore, charge wind-up, charge run, dazed, flinch, death (topples like a rockslide).

**Audio:** grinding breath, stone plates clacking; a bellow and thundering hooves for the Charge.

**Look:** stone plates over a grey hide, moss in the cracks, horns like broken
columns. Charge leaves a line of churned earth for 10 s.

**Blighted — Obsidian Ox (Spec):** Charge leaves Glaze: −20% speed for Wildborn for 10 s.

---

## #4 Glimmerfox

| Field | Value |
|---|---|
| Tier · temperament | I · Skittish, solo |
| Habitat · maps | Rootwilds · Breathing Canopy, Ashfall Crossing (Built: 4 per side) |
| Affinity | Thornrunner |
| Size | 0.6 m at the shoulder; a slender fox with a shimmering coat |
| Health · speed | 150 · 8.0 m/s |
| Cores · respawn | 20 · 45 s |
| **Key mechanic** | **Invisible after 2 s still.** Killing it **reveals enemies within 15 m for 6 s** (Thornrunner kill: 25 m) |

**Behaviour:** sits still and fades (a heat-shimmer remains at 5 m). Flees at 12 m on a
zig-zag path, stopping behind cover to fade again. A careful observer sees the shimmer.

**Counter-play:** worth hunting before a fight for the reveal. A Thornrunner kill
gives a 25 m reveal, a strong pre-fight scouting tool.

**Animation set:** sit, fade (shader), zig-zag run, pounce-play, death (a burst of light motes).
**Audio:** a soft yip; a chime when it fades back in.
**Look:** pale grey coat with a pearly shimmer; amber eyes that stay visible for 0.3 s after it fades.
**Blighted — Glintfox (Spec):** its reveal shows Wildborn only.

---

## #5 Marrowhound

| Field | Value |
|---|---|
| Tier · temperament | II · Scavenger, pair |
| Habitat · maps | Bone Flats · The Elder Ribs, The Skull Basin |
| Affinity | Bonespire |
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

---

## #6 Duskmane

| Field | Value |
|---|---|
| Tier · temperament | III · Predator, solo |
| Habitat · maps | Hollow Mire · Breathing Canopy (the mire) |
| Affinity | Hollow |
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

---

## #7 Burrowtusk

| Field | Value |
|---|---|
| Tier · temperament | II · Territorial, solo |
| Habitat · maps | Underroot · The Nerve, Ashfall Crossing (tunnel mouths) |
| Affinity | Brawler |
| Size | 1.6 m at the shoulder, 2.8 m long; a boar-like digger with spade tusks |
| Health · damage · speed | 1,000 · 55 · 5.0 m/s |
| Cores · respawn | 50 · 90 s |
| Weak point | Rump, rear 90° |
| **Key mechanic** | Digs a tunnel between two nodes up to 80 m apart; lasts **60 s**; one every 120 s; **1.5 s** to travel through |

**Behaviour:** roots around a tunnel mouth. Every 120 s it digs: 3 s of churning
earth, then two mouths open (shown on the minimap to everyone). Anyone can use the
tunnel. If attacked, it charges (tusk sweep, 0.5 s wind-up, 55 damage, knockback 2 m).

**Counter-play:** a temporary flank route that both teams see. Kill it to stop new
tunnels near your base; protect it if its tunnels favour you.

**Animation set:** root-snuffle, dig (3 s), emerge, charge, tusk sweep, death.
**Audio:** snorts, scraping earth, a rumble under the ground while it digs.
**Look:** bristly brown-grey hide caked with soil, wide spade tusks, tiny eyes.
**Blighted — Glassdigger:** its tunnels are lined with Blight (cosmetic; Blightborn hear the whisper inside).

---

## #8 Greyback Colossus (Apex)

| Field | Value |
|---|---|
| Tier · temperament | IV · Apex (peaceful unless attacked), solo |
| Habitat · maps | Ashen Steppe · Ashfall Crossing (joins the Grey Migration in Phase 3) |
| Affinity | Titan |
| Size | **22 m at the shoulder, 48 m long** (Proposal); a mountain-sized grazer. Its back is a walkable plateau |
| Health · speed | 30,000 · 2.5 m/s |
| Attack | **Stomp 300, radius 6 m, every 6 s** |
| Cores · SAP | 400 + 100 SAP (split) |
| Spawn | Once per phase from Phase 3, max 2 per match (Spec) |
| Weak points | Four knee joints (two front, two rear), each 0.12 × height, visible from the side; ×1.5 |
| **Key mechanic** | Its back is a **3-cell moving node**: 4 s root channel; Inaccessible while it stands in enemy-only territory. **Reached by its tail ramp** |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Migrate | Default | Walks the Migration road north → south (or reverse), 2.5 m/s, never stops |
| Stomp | Any player under or beside it (within 6 m of a foot) | Lifts a foot (1.2 s wind-up, a circular decal under the foot), stomps 300 in r 6 m |
| Shrug | Players on its back while it's been damaged in the last 10 s | Every 15 s: a 2.0 s rumble, then a shake that knocks players on the back 4 m (not off) |
| Enraged | Below 30% Health | Stomps every 4 s; walks 3.2 m/s |

**The back node.** Three cells on its back are a single node that travels with it.
Whoever holds it gains territory that crosses the whole map. The tail is a 12 m ramp
(1.2 m wide strip of fur and moss) that anyone can climb at walking speed. The back is
6 m above the ground at the tail and 20 m at the shoulders.

**Counter-play:** root its back early in its walk so your node passes through enemy
lines; kill it for the 400 split cores; fight on its back for the high ground.

**Animation set:** walk cycle (very slow, every step a shudder), foot-lift stomp,
shrug, head-lower graze (cosmetic), death (kneels, then lies down over 6 s, becoming a hill
that fades after 60 s).

**Audio:** each step is a deep thud felt within 60 m; low, long moans; grass and ash
pouring off its sides.

**Look:** grey fur matted with ash and grass, a back like a meadow with boulders,
tusks like fallen trees. Birds ride on it.

**Blighted — The Starbacked (Spec):** its back node starts **blighted**; a meteor shard
grows out of its shoulders.

---

## #45 Mossback Calves

| Field | Value |
|---|---|
| Tier · temperament | I · Passive; 1–2 per Mossback herd, **Bloom only** |
| Size | 1.0 m at the shoulder |
| Health · speed · cores | 200 · 3.5 m/s · 15 |
| **Key mechanic** | Harming one makes its herd **territorial for 60 s**: the Grazers attack for 45 damage every 1.2 s |

**Behaviour:** stays within 4 m of an adult; bleats and runs to the herd's centre when a player is within 8 m.
**Counter-play:** don't farm calves near a herd unless you want a fight with four Grazers.
**Animation set:** follow, hop-play, bleat, run-to-herd, death. **Audio:** high bleats.
**Look:** a tiny Grazer with a soft moss fuzz instead of a back-garden.
**Blighted form (Proposal) — Glass Calves:** a thin glass frost on the fuzz; harming one makes a Glassback herd territorial toward Wildborn only.

---

## #49 Cinder Salamander

| Field | Value |
|---|---|
| Tier · temperament | II · Skittish; 4–6 per map |
| Habitat · maps | Cinderveil · Fevermouth, The Glass Forest |
| Affinity | Titan |
| Size | 0.8 m tall, 3.0 m long |
| Health · speed | 600 · 5.0 m/s (swims in lava) |
| Cores · respawn | 45 · 90 s |
| **Key mechanic** | Dives into lava at 10 m. On death leaves a **cooling-rock stepping stone** (3 m) for **45 s** (Titan kill: 90 s) |

**Behaviour:** basks on cooling rock at the edge of a lava channel; dives when anything
comes within 10 m; resurfaces 20 m along the channel after 6 s. Killing it on the lava
creates the stepping stone exactly where it died.
**Counter-play:** use ranged attacks while it basks; time the kill to create a shortcut across a lava channel.
**Animation set:** bask, look-around, dive, swim, surface, death (stiffens and cools to stone).
**Audio:** a hiss, a soft plop into lava, bubbling.
**Look:** slick black skin with glowing orange veins that brighten as it dives.
**Blighted — Obsidian Salamander:** leaves a glass stepping stone only Blightborn can use.

---

## #53 Heartwood Elk (special Apex)

| Field | Value |
|---|---|
| Tier · temperament | IV · Passive; **invulnerable**; 0–1 per match |
| Habitat · maps | Heartwood · any map's Heartwood grove, rarely |
| Affinity | Verdant |
| Size | **11 m at the shoulder**, antlers spanning 14 m; taller than a Stage 3 Titan |
| Speed | 2.0 m/s |
| Cores | 0 |
| **Key mechanic** | In a Heartwood grove, roots spread **×3 for 30 s** for whoever holds the grove. Ignores combat; can't be infected |

**Behaviour:** walks a slow loop through the grove for 30 s, then fades into the trees.
Bodies, walls and Ultimates pass through it.
**Look:** antlers like living trees with leaves and flowers; warm amber light under its fur.
**Audio:** deep, slow breaths; a soft hum. Every player hears a single low horn when it appears.
**Blighted form:** **none**. It is the only creature the Murmur has never touched.

---

# Two-legged creatures

## #9 Strays

See Part 3, §3.1.

## #10 Strider Crane

| Field | Value |
|---|---|
| Tier · temperament | I · Skittish flock of 6–8 |
| Habitat · maps | Hollow Mire · Breathing Canopy (mire), The Heron Reach |
| Size | 1.8 m tall on long legs; 2.6 m wingspan |
| Health · speed · cores | 120 · 9.0 m/s (flies) · 10 each |
| **Key mechanic** | Startled at **10 m** (Hollow, Thornrunner: **5 m**). Startling **reveals the startler for 4 s** to everyone |

**Behaviour:** stands in the shallows. A player moving faster than walking speed
within 10 m (5 m for Hollow and Thornrunner) startles the whole flock: they lift with a
roar of wings, circle once over the startler, and land 60 m away after 12 s.
**Counter-play:** walk, don't run, through the mire; or startle them on purpose to
check where enemies are (the reveal shows *whoever* startled them).
**Animation set:** stand, preen, step, take-off, flap loop, glide, land, death.
**Audio:** a rattling alarm call; the wing roar is audible at 60 m.
**Look:** grey-blue plumage, black legs, a crest that lifts when alarmed.
**Blighted — Shard Crane:** its alarm call is a ringing chime; same reveal.

---

## #11 Rootwalker

| Field | Value |
|---|---|
| Tier · temperament | II · Territorial, solo, on a neutral node |
| Habitat · maps | Rootwilds · Breathing Canopy |
| Affinity | Verdant |
| Size | 3.2 m tall; a tree-like biped with root feet |
| Health · damage · interval · speed | 1,200 · 60 · 1.6 s · 3.0 m/s |
| Cores · respawn | 60 · 90 s |
| Weak point | Knot in the trunk's back, rear 120° |
| **Key mechanic** | The node **can't be rooted while it lives**. **Calm** (Verdant only): 3 s channel, removes it for 120 s without a fight; gives 60 cores |

**Behaviour:** stands on the node's core, swaying. Attacks anyone who channels Root
on its node or hits it. Never leaves the node (leash = node radius).
**Attacks:** Branch sweep (0.6 s, 60, 3 m arc) · Root grip (0.8 s, ground decal r 2 m, roots the target 0.8 s, 12 s cooldown).
**Counter-play:** a Verdant calms it in 3 s; anyone else has to fight it, which is slow and noisy.
**Animation set:** sway idle, sweep, root grip, calm (kneels and sinks into the ground), death (topples).
**Audio:** creaking wood, a deep groan when attacked, soft rustle when calmed.
**Blighted — Lattice Walker:** guards **Blightborn** nodes instead of neutral ones (can't be calmed).

---

## #12 Knucklebrute

| Field | Value |
|---|---|
| Tier · temperament | III · Territorial, solo |
| Habitat · maps | Spirecliffs · The Frozen Falls, The Wind Bridge seed |
| Affinity | Brawler |
| Size | 3.4 m tall; a gorilla-like brawler with stone knuckles |
| Health · damage · speed | 3,000 · 160 · 5.0 m/s |
| Cores · SAP · respawn | 170 + 20 SAP · 180 s |
| Weak point | A crack in the brow plate, front 90° |
| **Key mechanic** | Challenges the first player within **20 m**. Winning **alone** (no ally damage) gives **Momentum: +10% damage and +10% speed for 30 s** |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Display | Default | Sits on a boulder; beats its chest every 20 s |
| Challenge | First player within 20 m | Roars, beats its chest twice (1.5 s) and charges that player only |
| Duel | Challenged player engaged | Ignores everyone else unless they damage it (which voids the solo reward) |
| Brawl | A second player damages it | Attacks whoever hit it most recently |

**Attacks:** Hook (0.5 s, 160, 3 m) · Double slam (0.8 s, ground decal r 4 m, 180, stagger 0.4 s, 10 s) · Leap (0.7 s crouch, 10 m, 140, 14 s).
**Counter-play:** a Brawler or Titan takes the 1v1 for Momentum; others leave it alone.
**Animation set:** chest beat, roar, charge, hook, double slam, leap, stagger, death.
**Audio:** chest drums audible at 50 m, grunting roars.
**Blighted — Geode Brute (Spec):** weak point moves to a glowing geode in its back (an easy Bonespire shot).

---

## #13 Hollowmonk

| Field | Value |
|---|---|
| Tier · temperament | II · Passive, solo |
| Habitat · maps | Hollow Mire · Breathing Canopy |
| Affinity | Hollow |
| Size | 2.6 m tall, gaunt; robed in hanging moss |
| Health · speed | 900 · 3.0 m/s |
| Cores · respawn | 55 · 90 s |
| **Key mechanic** | **Aura 12 m: all capture and uproot progress paused** |

**Behaviour:** stands still on or beside a node; drifts slowly away from damage (never fights).
The aura shows as a faint grey ring on the ground and a muted soundscape.
**Counter-play:** kill it before trying to capture nearby; or leave it alive next to
your own node as a natural defence.
**Animation set:** stand-meditate, drift, flinch, death (crumbles to moss).
**Audio:** none, except a low hum inside the aura; sound inside the ring is muffled 30%.
**Blighted — Whisper Monk (Spec):** pauses only Wildborn progress.

---

## #14 Spurlark

| Field | Value |
|---|---|
| Tier · temperament | I · Skittish, solo |
| Habitat · maps | Ashen Steppe · Ashfall Crossing (Built: 1 per side at (±58, 30)) |
| Affinity | Thornrunner |
| Size | 1.2 m tall; a sprinting ground bird with spurred legs |
| Health · speed · cores | 160 · **10.0 m/s** · **40** (double) |
| **Key mechanic** | Hard to catch; flees on a curving path |

**Behaviour:** pecks in the grass; flees at 12 m on an S-curve, changing direction every 1.5 s.
**Counter-play:** cut it off rather than chase; ranged attacks and Thorn Dash are best.
**Animation set:** peck, alert, sprint, hop-turn, death. **Audio:** a sharp trill.
**Blighted — Glass Lark:** leaves glittering trails that reveal its path.

---

## #15 Bonewright

| Field | Value |
|---|---|
| Tier · temperament | III · Territorial, solo + 3 totems |
| Habitat · maps | Bone Flats · The Elder Ribs |
| Affinity | Bonespire |
| Size | 3.0 m tall; a lanky biped that wears bones like armour |
| Health · damage · speed | 2,400 · 120 · 3.5 m/s |
| Cores · SAP · respawn | 150 + 20 SAP · 180 s |
| **Key mechanic** | Totems: **400 Health** each, within 15 m; each gives wildlife nearby +10% damage and −10% damage taken (stacks to 3). **The Bonewright takes −60% damage while any totem stands.** Rebuilds one totem every 20 s |

**Behaviour:** tends its totems; when attacked, retreats behind them and throws bone
shards (0.5 s, 20 m, 120). Starts rebuilding a fallen totem 20 s after it falls (a 3 s build animation; interrupted by damage).
**Counter-play:** break all three totems first (they're stationary, 400 Health each), then burst it before a rebuild.
**Animation set:** build totem, throw, retreat, idle-arrange bones, death (collapses into a bone pile).
**Audio:** clacking bones, a rattling hiss.
**Look:** totems are 2.5 m stacks of skulls and vertebrae with an amber glow inside.
**Blighted — Glasswright:** crystal totems that buff Blighted creatures.

---

## #16 The Old Tall (Apex)

| Field | Value |
|---|---|
| Tier · temperament | IV · Apex wanderer, solo |
| Habitat · maps | Any · patron event on any map; The Elder Ribs |
| Size | **16 m tall**; a towering, ancient biped with long arms and a lichen-hung body |
| Health · speed | 25,000 · 2.0 m/s |
| Attack | **Kick 350, cone 6 m** |
| Cores · SAP | 400 + 100 SAP (split) |
| **Key mechanic** | Walks Hub to Hub. **Tension ×3** within 30 m. The Planet Pulse version **hunts Blightborn for 45 s**, then leaves (no kill required) |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Wander | Default (natural spawn) | Walks Hub to Hub at 2 m/s; stops 20 s at each |
| Defend | Attacked | Kicks attackers within 6 m (1.0 s wind-up, cone decal); every 12 s a two-handed sweep (1.4 s, 10 m arc, 280, knockback 5 m) |
| Hunt (event) | Planet Pulse "The Old Tall wakes" | Targets the nearest Blightborn, walking at 3 m/s; ignores Wildborn unless hit; leaves after 45 s |

**Counter-play:** a Tension accelerator: fights near it trigger events fast. Blightborn
scatter during its hunt; Wildborn fight beside it.
**Animation set:** walk, look-around, kick, sweep, kneel-rest, leave (walks off the map edge), death.
**Audio:** creaking like an old tree, low hoots.
**Blighted — The Tall Hush:** raises Tension only on Wildborn borders.

---

## #44 Seedcaller

| Field | Value |
|---|---|
| Tier · temperament | II · Skittish, solo |
| Habitat · maps | Any (Season 4 Bloom onward) |
| Size | 2.2 m tall; slender, long-fingered, seed pods hanging from its arms |
| Health · speed · cores | 700 · 6.0 m/s · 45 |
| **Key mechanic** | Regrows **1 neutral cell per 10 s** along its path, even from Scald |

**Behaviour:** walks a wandering route between neutral and burnt cells, planting.
Flees at 12 m. Rally it (Wildborn) to make it walk where you choose for 90 s.
**Animation set:** walk-plant, scatter seeds, flee, death. **Audio:** soft rattles, a flute-like call.
**Blighted form (Proposal) — Shardcaller:** plants glass; cells it walks over become neutral but can't be rooted for 30 s.

---

## #47 Drift Owlbear

| Field | Value |
|---|---|
| Tier · temperament | III · Territorial; 2–3 drifts per map |
| Habitat · maps | Rimewastes · The Sleeper, The Frozen Falls |
| Affinity | Brawler |
| Size | 3.8 m tall standing; white-furred, hooked beak, bear shoulders |
| Health · damage · speed | 3,400 · 170 · 5.0 m/s |
| Cores · SAP · respawn | 170 + 20 SAP · 180 s |
| Weak point | The back of the neck, rear 90° |
| **Key mechanic** | Wakes when a player steps within **3 m** of its drift (Rime Turn: 1.5 m); rampages **20 s** on the nearest creature, then sleeps if unharmed |

**Behaviour:** asleep under a too-round drift with a frost plume. On waking: an
explosive 1.0 s rise (snow burst, 40 damage r 3 m), then 20 s attacking the nearest
creature of any team. If nobody damages it in the last 5 s of the rampage, it digs back in.
**Attacks:** Swipe (0.5 s, 170, 3 m) · Beak lunge (0.6 s, 6 m, 150) · Roar (1.0 s, r 8 m, slows 30% 2 s, 15 s cooldown).
**Counter-play:** read the frost plumes and walk around them, or lure enemies across one.
**Animation set:** sleep (breathing under snow), wake burst, swipe, lunge, roar, dig in, death.
**Audio:** a deep snore under the snow; an explosive roar.
**Blighted — Glass-furred Owlbear:** its drift is Glaze; it wakes only for Wildborn.

---

## #50 Ash Vulture

| Field | Value |
|---|---|
| Tier · temperament | I · Scavenger; 3–8 per map (Ash Turn ×2) |
| Habitat · maps | Cinderveil · Fevermouth, The Glass Forest |
| Affinity | Bonespire |
| Size | 1.1 m tall, 3.2 m wingspan |
| Health · speed · cores | 150 · 8.0 m/s (flies) · 15 |
| **Key mechanic** | Circles any spot with combat in the last 10 s; lands only on bodies |

**Behaviour:** soars at 25–35 m. Within 10 s of combat anywhere, 2–4 vultures circle the
spot (a readable sign of a fight). After a death, they land on the body and pick up any
cores still lying within 3 m (5 per second) unless scared off (a player within 6 m).
**Counter-play:** look up to find fights; shoot landed vultures to recover cores.
**Animation set:** soar, circle, land, peck, hop, take-off, death (falls).
**Audio:** rough croaks, heavy wingbeats on hot air.
**Blighted — Glass Vulture:** circles only above Wildborn who are about to die.

---

## #52 Shard Gull

| Field | Value |
|---|---|
| Tier · temperament | I · Skittish flock of 6–10 |
| Habitat · maps | Shattered Coast · Shard Reef |
| Affinity | Thornrunner |
| Size | 0.6 m tall, 1.4 m wingspan |
| Health · damage · speed | 120 · 10 · 8.0 m/s (flies) |
| Cores | 15 + a **Starshard** (30 cores; Thornrunner: 40) |
| **Key mechanic** | Mobs anything within 8 m of its nest |

**Behaviour:** dives into the surf for glass; returns to its cliff nest. Anyone within 8 m of
the nest is mobbed by the flock for 6 s (10 damage per peck, ~4 pecks/s total).
**Animation set:** dive, surface, fly, nest, mob-swoop, death (the shard falls and glints).
**Audio:** shrill cries; glass clinking in the beak.
**Blighted — Hush Gull:** silent; its shards are larger (Proposal: 40 cores).

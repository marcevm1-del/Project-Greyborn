# Part 1 — Production Standards

These rules apply to every map, creature and structure in this document.
Everything here is a **Proposal** unless it is marked Spec.

## 1.1 Units and axes

| Rule | Value |
|---|---|
| Length | Metres. 1 engine unit = 1 m |
| Time | Seconds. Simulation runs at a fixed **30 Hz** (Built) |
| Angles | Degrees, measured from the creature's facing; "front 120°" means 60° either side of forward |
| Axes (maps) | **x** runs west → east, **z** runs north → south, **y** is up. The map centre is (0, 0) |
| Map coordinates in this document | Written `(x, z)` in metres from the centre |
| Speeds | m/s. **Speed 100% = 5.0 m/s** (Spec) |
| Damage | Health points. **P** = the attacker's Power (Spec) |

## 1.2 The scale ladder

Everything in the world is built against the Kith. The size jumps between Stages
are the core of the game's fantasy, so props must make them obvious.

| Reference | Height | Notes |
|---|---|---|
| Kith (Base Form) | **1.0 m** (Spec) | Knee-high to a stag. Capsule radius 0.35 m |
| Stage 1 Ascendant | **2.0 m** (Spec) | Radius 0.7 m |
| Stage 2 Ascendant | **4.0 m** (Spec) | Radius 1.3 m |
| Stage 3 Ascendant | **7.5 m** (Spec) | Radius 2.4 m. Taller than most trees |
| Titan multiplier | ×1.3 height (Spec) | A Stage 3 Titan is ~9.8 m |
| Thornrunner multiplier | ×0.8 height, ×1.2 length (Spec) | Low and long |
| Ashgrass | 0.3–0.9 m | Hides a Kith's legs, never its head |
| Standing Stone | 6–12 m | Hides a Stage 2; a Stage 3's head shows above it |
| Breathing oak | 18–25 m | Taller than any Ascendant |
| Elder Ribs (one rib) | 40–60 m | City-block scale |
| Tier IV Apex | 14–30 m | Always taller than a Stage 3 |
| Hushed Answer | 12–20 m (Spec) | Larger than a Stage 3 |

**Doorway rule:** any gap a player must pass through is at least **5.5 m wide and
10.5 m tall**. A Stage 3 capsule is 4.8 m wide (radius 2.4 m) and a Stage 3 Titan is
~9.8 m tall, so every Ascendant can always get through with a margin. Gaps
meant for small creatures only (a Kith shortcut) are **under 1.6 m wide** and
signposted with a distinct visual (a root arch, a fallen-log tunnel).

## 1.3 Creature stat-block format

Every creature in Parts 4–6 uses this block. Fields marked Spec come straight from
`spec/04-creatures.md`.

| Field | Meaning |
|---|---|
| **Tier** | I Critter · II Beast · III Brute · IV Apex (Spec) |
| **Temperament** | Passive · Skittish · Territorial · Predator · Scavenger · Swarm · Apex (Spec) |
| **Habitat / maps** | Biome, and the maps where it spawns |
| **Affinity** | The lineage that gets +25% cores or a stronger effect (Spec) |
| **Group** | How many spawn together (Spec) |
| **Size** | Height at the shoulder or head, and length (Proposal) |
| **Health · Damage · Interval · Speed** | Phase 1 values (Spec). Multiply Health and damage by the phase factor: ×1.00 / 1.15 / 1.30 / 1.45 |
| **Aggro · Leash** | Radius at which it reacts; how far it follows before resetting (Spec, from the tier baseline unless listed) |
| **Cores · SAP · Respawn** | Payout and respawn (Spec) |
| **Weak point** | Location, exposure arc and hitbox. ×1.5 damage (Spec rule; location is Proposal) |
| **Behaviour** | A state machine: states, what triggers each change |
| **Attacks** | Each attack with telegraph, wind-up, area, damage, cooldown |
| **Counter-play** | What a skilled player does about it |
| **Animation set** | The clips the animator must deliver, in priority order |
| **Audio** | Idle, alert, attack and death sounds |
| **Look** | Silhouette, materials, colours |
| **Blighted form** | Name and twist (Spec where listed in `spec/04`) |

### Tier baselines (Spec)

| Tier | Health | Hit damage | Attack interval | Speed (m/s) | Aggro radius | Leash | Cores | SAP | Respawn |
|---|---|---|---|---|---|---|---|---|---|
| I Critter | 60–300 | 0–25 | 1.5 s | 4–10 | Flees at 12 m | — | 10–20 | 0 | 45 s |
| II Beast | 600–1,500 | 40–70 | 1.2 s | 2.5–8 | 10 m | 25 m | 40–70 | 0 | 90 s |
| III Brute | 2,200–4,000 | 110–180 | 1.5 s | 3–5.5 | 15 m | 35 m | 120–180 | 20 | 180 s |
| IV Apex | 18,000–30,000 | 250–450 | 2.0 s | 2–6 | 25 m | None | 400 split | 100 | Once per phase from Phase 3 |

### Shared creature rules (Spec)

| Rule | Value |
|---|---|
| Tenacity | Tier I–II 0% · Tier III 20% · Tier IV immune to all crowd control except slow (max 30%) |
| Damage reduction cap | 75% for Tier I–III. Bosses may exceed it where listed |
| Leash and reset | Returns to spawn at +50% speed, ignores damage, heals to full |
| Out of combat | Heals 5% max Health/s after 8 s without combat |
| Kill credit | Killing blow takes the cores; Tier IV is split by damage share (≥ 3% to qualify) |
| Assist | Allies who dealt ≥ 10% in the last 15 s get +25% extra cores (paid by the system) |
| Wildlife income cap | Full value for the first 600 wildlife cores per player per match, then 50% |
| Tier IV warning | Announced map-wide 10 s before it appears |

## 1.4 Telegraph rules

Every damaging attack in the game must be readable. These minimums apply to all
creatures and bosses (Proposal, built on the art direction in `gdd/23`).

| Threat | Minimum wind-up | Telegraph |
|---|---|---|
| Tier I attack | 0.3 s | Body cue only (crouch, wing flare) |
| Tier II attack | 0.4 s | Body cue plus a sound cue |
| Tier II area attack | 0.5 s | Ground decal (thin outline) |
| Tier III attack | 0.5 s | Body cue, sound cue, and a ground decal for any area |
| Tier III charge or grab | 0.6 s | Line or cone decal that fills as the wind-up completes |
| Tier IV attack | 0.8 s | Large decal, a camera-shake pre-rumble within 30 m, and a unique sound |
| Tier IV "wipe" attack (600+ damage) | 2.0–3.0 s | Decal, sound, and a safe zone that is shown, not guessed |
| Ambush (Hexmaw, Marrow Mantis, Glasslegs) | First strike exempt | A world tell must exist before the strike: ripples in mud, a glint, a too-still shape |

**Decal colours.** Wildlife and boss attack decals use a neutral **pale ochre**
(`#D9C08A`) outline that fills toward **warm white**. They never use team colours
(gold, red) or side colours (amber, cyan), so "this will hit me" can't be confused
with "this belongs to a team".

**Ground decal timing.** The fill reaches the edge exactly when the hit lands.
A decal never appears less than 0.3 s before impact.

## 1.5 Weak-point rules

| Rule | Value |
|---|---|
| Damage on a weak point | ×1.5 (Spec) |
| Exposed (Marked) weak point | ×2.0 for Spire Lance (Spec) |
| Hitbox | A sphere sized as a fraction of the creature's height (Spec for Ascendants; Proposal for wildlife: 0.15–0.25 × height) |
| Look | Glows in the creature's side colour: amber (wild and Wildborn), cyan-violet (Blighted and Blightborn). Neutral creatures use a pale amber |
| Exposure | Each creature lists the arc from which its weak point can be hit. Outside that arc, hits count as body hits |
| Readability | A weak point glows brighter for 0.2 s on every hit so attackers learn where it is |

## 1.6 Materials

Three ground materials carry the war (Spec art direction, `gdd/23`):

| Material | Owner | Surface | Light | Sound underfoot |
|---|---|---|---|---|
| **Roots** | Wildborn | Matte, fibrous, moss | Amber pulses along the roots every 4 s | Soft creak |
| **Blight (Glaze)** | Blightborn | Glossy black glass in fine lines | Cyan-violet shimmer moving outward | Faint ring |
| **Scald** | The Clamor (Season 3) | Crusted rust-red blotches, steaming | Coal glow in the cracks | Crackle |

**Greyscale test:** with colour removed, roots must read as matte and fibrous,
Blight as glossy and linear, Scald as crusted and blotchy.

### Palette (Spec art direction)

| Role | Hex |
|---|---|
| Stone | `#6E6A62` |
| Grass and moss | `#7A8466` |
| Haze and sky | `#C9C2AE` |
| Wildborn glow (amber sap) | `#E8A23A` |
| Moss green | `#5E8C4A` |
| Blightborn glow (starlit cyan) | `#5FD4E0` |
| Violet | `#8A5CD6` |
| Black glass | `#141821` |
| Scald | `#C2462B` |
| UI panels | `#0F2A30` |
| UI headings | `#E2B866` |

**Team outlines** are separate from side colours: your team is pale gold, the enemy is
sharp red (colour-blind presets in Part 11).

## 1.7 Asset budgets (Proposal)

Budgets assume the web build's target: 60 fps at 1080p on a mid-range GPU, with 8
Ascendants, ~40 wildlife and full terrain on screen. Real-GPU measurement is still
open (`game/KNOWN_ISSUES.md` #1).

| Asset | LOD0 triangles | LOD1 | LOD2 | Bones | Texture set |
|---|---|---|---|---|---|
| Kith / Stage 1 Ascendant | 6,000 | 2,500 | 800 | 40 | 1024² ×3 (albedo, normal, ORM + emissive mask) |
| Stage 2 Ascendant | 10,000 | 4,000 | 1,200 | 55 | 2048² ×3 |
| Stage 3 Ascendant | 16,000 | 6,000 | 2,000 | 70 | 2048² ×3 |
| Tier I critter | 800–1,500 | 400 | billboard / impostor | 12–20 | 512² shared atlas |
| Tier II beast | 3,000 | 1,200 | 400 | 30 | 1024² |
| Tier III brute | 6,000 | 2,500 | 800 | 45 | 1024² |
| Tier IV apex | 20,000 | 8,000 | 2,500 | 80 | 2048² ×2 sets |
| Hushed Answer | 30,000 | 12,000 | 4,000 | 100 | 2048² ×2 sets |
| Hub (each Defense stage) | 8,000 | 3,000 | 800 | — | 2048² shared with the map |
| Swarm member (Threadling, wasp, bee) | 60–150 | GPU instanced | — | 4–6 or vertex animation | Atlas |

**LOD distances:** LOD1 at 40 m, LOD2 at 90 m, impostor at 160 m for Tier I–II.
Tier IV and Ascendants never drop below LOD2, because silhouettes carry gameplay.

**Draw-call rule:** grass, flowers, small rocks and swarms are instanced
(Built: instanced props and grass with culling).

## 1.8 Naming

| Thing | Pattern | Example |
|---|---|---|
| Creature asset | `cr_<tier>_<name>` | `cr_t2_ashfang` |
| Blighted variant | `cr_<tier>_<name>_bl` | `cr_t2_ashfang_bl` (Shardfang) |
| Regional variant | `cr_<tier>_<name>_<region>` | `cr_t2_ashfang_rime` (Frostfang) |
| Ascendant | `asc_<lineage>_s<stage>_<side>` | `asc_titan_s2_wb`, `asc_titan_s2_bb` |
| Map | `map_<id>_<name>` | `map_01_ashfall` |
| Node (in a map) | `<side letter><number>` or a callout name | `W7`, `The Ash Knoll` |
| Animation clip | `<asset>@<clip>` | `cr_t3_stonehide_ox@charge_windup` |
| Sound event | `sfx/<category>/<asset>/<event>` | `sfx/cr/ashfang/bite` |

## 1.9 Behaviour state machine conventions

Every creature's behaviour in Parts 4–6 is written as states. The shared states
are defined once here:

| State | Meaning |
|---|---|
| **Idle** | At or near its spawn, playing its idle loop. Wanders up to 6 m (Tier I–II) or 10 m (Tier III) |
| **Alert** | Has noticed something within its aggro radius. Turns to face it for 0.5–1.0 s before choosing |
| **Flee** | Runs away from the threat for 3–6 s, then returns to Idle when it's more than 20 m away |
| **Engage** | Attacking a target. Chooses attacks by range and cooldown |
| **Leash** | Pulled past its leash: returns to spawn at +50% speed, ignores damage, heals to full |
| **Recover** | 8 s without combat: heals 5% max Health/s, then Idle |
| **Dead** | Death animation, drops its cores, starts its respawn timer |
| **Converted** | Infected (Blightborn) or rallied (Wildborn) for 90 s. Follows its converter within 25 m (Spec) |

**Target choice (default):** the player that damaged it most in the last 5 s; if none,
the nearest player. Exceptions are listed per creature (Ashfang hunts the weakest,
Siege Beetle chases its last attacker, Clamor creatures go for the loudest).

**Perception (from `gdd/43`):** each Ascendant has three values that wildlife reads.

| Lineage | Threat | Presence (noticed from) | Attraction |
|---|---|---|---|
| Titan | Medium | High (Stage × 12 m) | Small critters hide; Cairnshells climb on it |
| Brawler | High | Medium | Herds scatter early |
| Verdant | Low | Medium | Grazers and Sapback Aphids follow it |
| Hollow | Medium | Low (×0.5) | Birds stop singing |
| Thornrunner | High | Low (×0.5) | Prey flees before it is visible |
| Bonespire | Medium | Medium | Scavengers follow it |
| Stillheart | Low | Medium | Hoarfrost Mites swarm to it |

**Reaction rule:** wildlife reactions are hints, never more revealing than the
player's own sound signature. A reaction can never show a hidden player's exact
position on the minimap.

# Greyborn — Game Design (playable build)

This is the practical design for the **playable game**, kept in sync with
the code. The build follows **Version B, "Greyborn: Brood"**
(`../audit/GAME_DESIGN_DOCUMENT.md`, decisions D-01 to D-16 approved 2026-10-19). The full world and system design is in `../gdd/` (52 chapters)
and the numbers are in `../spec/`. Where this file and the code disagree,
the code is the truth and this file gets fixed.

## Analysis

| | |
|---|---|
| Genre | Team PvP action / territory control with in-match evolution |
| Subgenre | Creature MOBA-lite: no lanes, an open map of nodes and Hubs |
| Audience | Teens and adults who play team action games (MOBAs, hero shooters) and like creature/evolution fantasy |
| Platform | Web (desktop browsers with WebGL 2); keyboard + mouse or gamepad |
| Camera | Third-person 3D orbit; distance grows with the creature |
| Core fantasy | Bud as a tiny creature, grow into a towering Ascendant, and win the land for your side of a living war |
| Multiplayer | Designed for 4v4 online. **This build: you + 3 bot allies vs 4 bots** |

## Pillars

1. **Growth you can see.** Base Form (1 m) → Stage 1 (2 m) → Stage 2 (4 m) → Stage 3 (7.5 m). Size, sound and camera all change.
2. **Risk you carry.** Cores aren't progress until you bring them home. Carrying more pays more and makes you louder.
3. **Land is power.** Rooting nodes and holding Hubs wins the match and speeds your team up.
4. **Read the body.** Weak points, telegraphed slams and readable silhouettes reward skill over stats.

## Core loop (implemented)

```
fight wildlife / enemies ──► carry cores ──► return and hold F to convert ──► level up / transform
        ▲                                                                         │
        └──── root nodes, take Hubs, siege Enemy Cores and the Base Heart ◄───────┘
```

Moment to moment: move, read the enemy's facing (weak points), commit with
abilities, decide when to go home.

## Controls

| Action | Keyboard / mouse | Gamepad |
|---|---|---|
| Move | WASD / arrows | Left stick |
| Look | Mouse (pointer lock) | Right stick |
| Basic attack | Left mouse (hold) | X |
| Abilities | Q / E (hold to charge Haymaker) / R | LB / RB / LT |
| Ultimate (L20) | T | Y |
| Branch choice (L10 prompt) | 1 Aggression / 2 Tactical | D-pad left / right |
| Skip First Life | Enter | — |
| Evade | Space or Left Shift | A |
| Root / uproot / convert (hold) | F | B |
| Pause | Esc or P | Start |
| Zoom | Mouse wheel | — |

All keyboard/mouse bindings can be changed in Settings.

## Scope

### MUST HAVE (vertical slice) — status

| Feature | Status |
|---|---|
| 3D map (Ashfall Crossing), lighting, shadows, fog, sky | Done |
| Third-person player with movement, Evade, collision, knockback arcs | Done |
| Four lineages in two pairs: Titan + Brawler (Commit), Verdant + Hollow (Root & Void), each with Q/E/R, passive, weak point | Done |
| Branch choice at Level 10 (Aggression / Tactical) and two Ultimates per lineage | Done |
| Pair Synergies without tracks: Smash & Roll, Void Garden (both Stage 2+, within 15 m, 20 s pair cooldown) | Done |
| Ground effects: Void Rift, Void Garden, Thornstorm, Entangle thorns; Bramble Walls | Done |
| Grey Migration at 6:00 (one map event) | Done |
| Bot difficulty: Easy / Normal / Hard | Done |
| First Life tutorial (~3 min), one-time tips | Done |
| Base Form → Stage 1/2/3 transformations | Done |
| Cores: carry, drop on death, pick up, convert at base or Hub | Done |
| Territory: root, uproot, spread, TI, Hub Defense by time held (no SAP), contested field conversion, Hunt finale (territory ×2 in Phase 4) | Done |
| Structures: Hubs, Enemy Cores, Base Hearts | Done |
| Wildlife: 7 species, 5 behaviours | Done |
| Bots for the other 7 Ascendants (act only through `intent`) | Done |
| Phases, win conditions (Base Heart, mercy, time limit, overtime capture) | Done |
| HUD, minimap, nameplates, damage numbers | Done |
| Menus: title, lineage select, pause, settings, help, results | Done |
| Audio: synthesised SFX, ambience, generative music, 3D positioning | Done |
| Settings and profile persistence | Done |

### SHOULD HAVE (next milestone)

- Breathing Canopy map (Version B content)
- Thornrunner + Bonespire and Co-Stalk (deferred by Version B)
- Online 4v4 (server-authoritative)
- Real-GPU playtest pass, art and audio pass

### NICE TO HAVE

- The other launch maps (Elder Ribs, Breathing Canopy) and the Turns
- Stillheart, the Clamor, the Truce co-op mode
- Memories, collection and cosmetics
- Calls wheel, replays, spectating

## Decisions made while building

| Decision | Why |
|---|---|
| **Until Level 3, cores become EXP when picked up** (awakening rule) | Resolves a contradiction found by the simulator (`../sim/findings.md`, A2). |
| **The former playtest overrides are now the rules** (EXP 60 + 15 × L, bounty 100 + 15 × level, Enemy Core reward 900, Base Heart 12,000) | Approved with the audit (D-09); the values live in the tuning workbook. |
| **No SAP.** Hub Defense rises one level per 45 s held (+400 Health per level, max 10); Level 20 conversions add held time to every Hub | Audit D-05. |
| **Standard match is 12:30** (phases and time limit halved, EXP ×2); the 25:00 match stays as a test option | Audit D-07; the last phase is the Hunt (territory moves twice as fast, Base Hearts open). |
| **Field conversion is contested**: 6 s + 1 s per 50 cores, −25% per extra ally in the Hub ring (max −50%), pauses for 1 s after damage | Audit D-08. |
| **Synergies have no tracks**: available when both partners are Stage 2+ and within 15 m; one 20 s cooldown per pair | Audit D-04. |
| **Ground-targeted abilities** (Entangle, Bramble Wall, Void Rift, Collapse, Event Horizon) land on the nearest enemy within 25° of your aim, otherwise 60% of their range ahead | There is no ground cursor in the third-person camera. |
| **Enemies outside your team's sight are hidden** | Spec 01's sight radius (30 m, 40 m at Stage 3); carriers of 300+ cores are always shown. |

## Art direction (as built)

Following `gdd/23` and `gdd/14`: a pale grey-gold haze over grey-green
steppe; Wildborn creatures in stone, moss and bark with amber inner light;
Blightborn in black glass with cyan light. Friend = gold outline, foe = red
(blue/orange in colour-blind mode). All models are procedural low-poly with
flat shading.

## Audio direction (as built)

Wind ambience, a low drone with sparse pentatonic notes that grow busier in
combat and in later phases. Wildborn hear a wooden horn at phase changes,
Blightborn a glass chime. Footsteps get deeper and louder with size;
Blightborn giants ring like glass.

## Difficulty and accessibility

Bots use the same rules and inputs as the player. Three difficulties, numbers in the workbook:

| | Reaction | Aim error | Returns at | Coordination |
|---|---|---|---|---|
| Easy | 0.6 s | ±25° | 120–200 cores | Only fights within 12 m |
| Normal | 0.35 s | ±12° | 180–340 | Joins nearby fights |
| Hard | 0.2 s | ±5° | 160–300, and banks cores before losing fights | Sets up Smash & Roll and Void Garden; groups for Base Heart pushes |

Accessibility options:
rebinding, look sensitivity and invert, FOV, UI scale, camera-shake slider,
reduce-motion mode, colour-blind team colours, separate volume controls,
gamepad dead zone.

# Greyborn — Game Design (playable build)

This is the practical design for the **playable game**, kept in sync with
the code. The full world and system design is in `../gdd/` (52 chapters)
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
| Titan and Brawler with full Q/E/R kits, passives, weak points | Done |
| Base Form → Stage 1/2/3 transformations | Done |
| Cores: carry, drop on death, pick up, convert at base or Hub | Done |
| Territory: root, uproot, spread, TI, SAP, Hub Defense | Done |
| Structures: Hubs, Enemy Cores, Base Hearts | Done |
| Wildlife: 7 species, 5 behaviours | Done |
| Bots for the other 7 Ascendants | Done |
| Phases, win conditions (Base Heart, mercy, time limit) | Done |
| HUD, minimap, nameplates, damage numbers | Done |
| Menus: title, lineage select, pause, settings, help, results | Done |
| Audio: synthesised SFX, ambience, generative music, 3D positioning | Done |
| Settings and profile persistence | Done |

### SHOULD HAVE (next milestone)

- Verdant, Hollow, Thornrunner and Bonespire (and their pair Synergies)
- Branch choice at L10 and the three Ultimate choices per branch at L20 (this build gives one Ultimate per lineage)
- Synergy levels and Smash & Roll
- Tension, global events and patron decks
- Overtime capture rule
- Online 4v4 (server-authoritative)
- Tutorial (The First Budding, `gdd/25`)

### NICE TO HAVE

- The other launch maps (Elder Ribs, Breathing Canopy) and the Turns
- Stillheart, the Clamor, the Truce co-op mode
- Memories, collection and cosmetics
- Calls wheel, replays, spectating

## Decisions made while building

| Decision | Why |
|---|---|
| **Until Level 3, cores become EXP when picked up** (awakening rule) | Resolves a contradiction found by the simulator (`../sim/findings.md`, A2): the spec's targets needed a return before 3:30 but put the first return at 5–7 minutes. The GDD's own example player awakens without returning. |
| **Short match option (default on)**: phases and time limit halved, EXP ×2 | A full 25-minute match against bots is long for a first session; the spec's numbers still apply in a Standard match. |
| **Hub Defense is bought automatically for the team** | SAP spending UI isn't built yet; the team AI spends it as the spec's examples describe. |
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

Bots use the same rules and inputs as the player. Accessibility options:
rebinding, look sensitivity and invert, FOV, UI scale, camera-shake slider,
reduce-motion mode, colour-blind team colours, separate volume controls,
gamepad dead zone.

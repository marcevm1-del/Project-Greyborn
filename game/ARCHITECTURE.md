# Architecture

## Engine decision

| | |
|---|---|
| **Decision** | three.js (WebGL 2) + TypeScript + Vite, shipped as a browser game |
| **Reason** | The development environment has no GPU and no installed engine. three.js is the only option whose rendering could be run, screenshotted and auto-playtested here (headless Chromium + SwiftShader). It also needs no install to play, and its TypeScript simulation can run unchanged on a Node server for Greyborn's server-authoritative 4v4 (Spec 06). |
| **Alternatives** | **Godot 4**: a richer editor and built-in physics/navigation/animation, but rendering couldn't be verified here and players would need an install or ~1 GB of export templates. **Unity / Unreal**: not installable in this environment; better fits for a large funded team (revisit at production scale). |
| **Impact** | Physics, navigation and animation are written in code (small, deterministic, testable). All art is procedural (no 3D asset tools were available). The game runs in any WebGL 2 browser. |

## Layers

```
src/
  sim/      Pure simulation. No DOM, no three.js scene. Runs headless (tests, future server).
  render/   three.js views that read sim state each frame. Never change sim state.
  audio/    WebAudio synthesis and 3D positioning. Reads events only.
  ui/       DOM HUD and menus. Reads sim state; menus call back into Game.
  core/     Input, settings/profile persistence, RNG.
  game/     Game: owns the loop, wires everything together.
  data/     tuning.json, exported from spec/greyborn-tuning.xlsx.
```

**Rule:** data flows one way. Input and bots write `Creature.intent`; the
simulation steps and emits `GameEvent`s; renderers, audio and the HUD
consume state and events. The simulation never references rendering.

## Simulation (`src/sim`)

| Module | Responsibility |
|---|---|
| `rules.ts` | Every formula from Specs 01 and 05 (EXP curve, damage, CC, conversion, TI, respawn). Unit-tested. |
| `tuning.ts` | Typed access to `data/tuning.json` (the workbook). |
| `terrain.ts` | Deterministic, mirror-symmetric heightfield (value noise + landmarks). |
| `map.ts` | Ashfall Crossing: bases, 5 Hubs, 6 Enemy Cores, 240 territory cells grouped into nodes (Voronoi), obstacles, wildlife camps. |
| `nav.ts` | 2 m navigation grid, A* with octile heuristic, line-of-sight smoothing. |
| `World.ts` | Match state and the 30 Hz step: movement and collision, channels (root/uproot/convert), economy, territory growth, structures, wildlife respawn, win conditions. |
| `combat.ts` | Damage with weak points and damage reduction, healing cap, CC with Tenacity and immunity windows, knockback, death and bounties. |
| `abilities.ts` | Basic attacks, Evade, Titan and Brawler Q/E/R and Ultimates. Numbers from tuning data, behaviour in code. |
| `wildAI.ts` | Wildlife state machines by temperament (passive, skittish, predator pack, territorial, duel). |
| `botAI.ts` | Ascendant bots: utility goal selection, A* path following, lineage-aware combat. |

Fixed timestep: `DT = 1/30 s`. The render loop accumulates real time, runs
up to 8 sim steps per frame and interpolates creature positions between
the last two steps. Given the same seed and inputs, a match is
deterministic (tested), which a future server/client model needs.

## Rendering (`src/render`)

| Module | Technique |
|---|---|
| `Scene.ts` | ACES tone mapping, sRGB output, hemisphere + ambient + directional sun, PCF soft shadows on a texel-snapped box following the player, exponential haze fog, sky shader with the "Fall-line". |
| `TerrainView.ts` | 280 × 180 m mesh at 1 m resolution plus a low-res horizon ring. `MeshStandardMaterial` extended with `onBeforeCompile`: slope/height colouring and a live territory overlay (amber root veins vs cyan crystal lattice) driven by a 20 × 12 data texture. |
| `PropsView.ts` | Rocks, shards, roots and pebbles as chunked `InstancedMesh`es (per-chunk frustum culling); 26k grass tufts with wind sway in the vertex shader, distance fade and per-chunk distance culling (grass LOD). |
| `CreatureView.ts` | Procedural part-hierarchy models per lineage and form, skinned per side (moss/stone/amber vs black glass/cyan); inverted-hull outline for friend/foe; parts merged per animated pivot to cut draw calls; procedural locomotion, attack, hit, stagger, airborne and death animation; smooth growth on transformation. |
| `StructureView.ts` | Bases, Base Hearts, Hubs (walls grow with Defense level, crack with damage), Enemy Cores, node cores. |
| `Vfx.ts` | One pooled GPU point system (3,000 particles, additive), pooled rings (impacts, telegraphs) and flying core orbs. |
| `CameraRig.ts` | Third-person orbit, distance by form (5/7/10/15 m), terrain collision, trauma shake, FOV kicks. |

## Data-driven content

Stats, ability numbers, creature Health/cores/SAP and every economy value
come from `spec/greyborn-tuning.xlsx` → `npm run data` → `src/data/tuning.json`.
Changing a number in the workbook changes the game, the simulator and the
spec together. Ability *behaviour* (shapes, timings that the spec gives as
text) lives in `abilities.ts`.

## Persistence

`core/Settings.ts`: settings and a small profile in `localStorage`, with a
version number. All stored data is validated and clamped on load; corrupt
or missing data falls back to defaults, and blocked storage is handled.

## Multiplayer path (not built yet)

The simulation is deterministic and renderer-free, and bots and players
both act only through `intent`. The planned route is a Node server running
`World` authoritatively, clients sending intents and receiving snapshots,
with client-side prediction for the local player. See `ROADMAP.md`.

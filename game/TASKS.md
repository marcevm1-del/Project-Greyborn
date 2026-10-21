# Tasks

## Completed (Milestone 0–1)

- Environment discovery (`TOOLS.md`), engine decision (`ARCHITECTURE.md`)
- Tuning pipeline: workbook → `tuning.json` (shared with the simulator)
- Simulation: rules, terrain, map and node graph, navigation, combat, Titan/Brawler kits, wildlife AI, bot AI, territory, structures, economy, phases, win conditions
- Rendering: sky, fog, lighting with shadows and environment map, terrain shader with live territory overlay, instanced props and grass with culling/LOD, procedural creatures with animation and friend/foe rim light, structures, particles
- Camera, input (keyboard/mouse/gamepad, rebinding), procedural spatial audio
- HUD, minimap, nameplates, damage numbers, menus, settings, profile
- Tests: unit (rules, map, settings), headless bot match, browser playtest, visual showcase
- Bugs fixed: pause menu unclickable after P/Start (pointer lock); convert prompt with <1 core; black glass materials; cliff-climbing territory veins; dark backlit models

## Completed (Version B "Brood", 2026-10-19 to 2026-10-21)

- Lineage registry (`src/sim/lineages/`): no lineage-name checks outside it (D-12)
- Rules pass: no SAP, Hub Defense by time held, 12:30 match with the Hunt finale, contested field conversion, overrides made the rules (D-05, D-07, D-08, D-09)
- Branch choice at L10 and two Ultimates per lineage (D-03); Smash & Roll without tracks (D-04)
- Verdant + Hollow, Void Garden, ground effects and Bramble Walls (D-02)
- Bot difficulty Easy / Normal / Hard (D-10); Grey Migration (D-06)
- First Life tutorial, one-time tips, branch prompt, Synergy indicator, SVG icons, carried-core glow, difficulty selector (D-11, §13)

## In progress

- Visual polish pass on bases and creature readability at Stage 3

## Next (in order)

1. Manual playtest on real GPU hardware (frame rate, feel, audio, gamepad)
2. Breathing Canopy map and its canopy "breath" event (Version B content)
3. Update the Python simulator to Version B rules, then a balance pass on the four lineages with it and real playtests
4. Online 4v4 (needs a hosting decision)

## Blocked (needs the director)

- **Tag `v0.1.0`** on `main`: the push of the tag was blocked from this session; the director can run `git tag v0.1.0 f6d3488 && git push origin v0.1.0`.
- **Hosting** a public web build (e.g. Vercel): an external, possibly paid service.
- **Online multiplayer** backend choice.

## Bugs

See `KNOWN_ISSUES.md`.

## Technical debt

- `World.capturable()` and `ti()` scan all nodes on every call; cache per tick if profiling shows cost (sim is ~0.6 ms/tick now).
- `combat.ts` healing window is a module-level map; move it into `World`.
- `World.ts` mixes economy, territory and structure logic; ground effects (`fields.ts`) and the Migration (`migration.ts`) are already split out; continue with territory and structures.
- Creature models are code-built placeholders; plan a proper rigged-model pipeline (glTF) once an art tool is available.
- Bundle is about 710 KB (190 KB gzipped) in one chunk; split three.js into its own chunk.

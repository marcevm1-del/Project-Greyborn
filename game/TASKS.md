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

## In progress

- Visual polish pass on bases and creature readability at Stage 3

## Next (Milestone 2, in order)

1. Verdant + Hollow and Void Garden
2. Thornrunner + Bonespire and Co-Stalk
3. Branch choice (L10) and Ultimate choice (L20) UI
4. Synergy levels; Smash & Roll
5. Tension and global events
6. Overtime capture rule
7. Manual playtest on real GPU hardware; performance budget pass

## Blocked (needs the director)

- **Balance decisions** from `../sim/findings.md` (A1–A6). This build adopts only A2 (the awakening rule).
- **Hosting** a public web build (e.g. Vercel): an external, possibly paid service.
- **Online multiplayer** backend choice.

## Bugs

See `KNOWN_ISSUES.md`.

## Technical debt

- `World.capturable()` and `ti()` scan all nodes on every call; cache per tick if profiling shows cost (sim is ~0.6 ms/tick now).
- `combat.ts` healing window is a module-level map; move it into `World`.
- `World.ts` mixes economy, territory and structure logic; split into systems when Milestone 2 adds more.
- Creature models are code-built placeholders; plan a proper rigged-model pipeline (glTF) once an art tool is available.
- Bundle is 680 KB (180 KB gzipped) in one chunk; split three.js into its own chunk.

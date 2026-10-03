# Testing

## Test layers

| Layer | Command | What it covers | Runtime |
|---|---|---|---|
| Unit | `npm test` | Rules and formulas (`rules.test.ts`), map layout and symmetry (`map.test.ts`), settings and profile validation (`Settings.test.ts`), time limit and overtime (`overtime.test.ts`) | < 2 s |
| Headless match | `npm test` | 6-minute bot match runs and progresses; determinism for a seed (`headless.test.ts`) | ~10 s |
| Performance and progression | `npm test` | Full short bot match: average tick < 2 ms, 99th percentile < 8 ms, someone reaches L15+, nobody stuck at awakening (`perf.test.ts`) | ~15 s |
| Typecheck | `npm run typecheck` | Strict TypeScript across the project | ~5 s |
| Browser playtest | `node tests/e2e/smoke.mjs <url> <outDir>` | Real Chromium, production build: title → lineage select → match via real clicks; WASD movement speed; attack and evade inputs; Esc pause and resume; a whole match played out by autopilot; no console errors; screenshots | ~10–20 min under software WebGL |
| Visual showcase | `node tests/e2e/showcase.mjs <url> <outDir>` | Screenshots of both lineages at Base Form and Stages 1–3 | ~10 min |

Run the browser tests against `npm run build && npm run preview`, not the
dev server: hot reload restarts the page when files change mid-test.

## Latest results (2026-10-03)

| Suite | Result |
|---|---|
| Unit + headless + performance | **25 / 25 passed** |
| Typecheck | Passed |
| Browser playtest | See the table below |

### Browser playtest checks

| Check | Result |
|---|---|
| Title screen loads | Pass |
| Match starts from the menus (real clicks) | Pass |
| WASD moves the player at about Base Form speed | Pass (6.5 m/s of game time: 5.0 base × 1.3 out-of-combat sprint) |
| No errors after combat input | Pass |
| Performance stats available | Pass |
| Esc pauses | Pass (failed before the double-toggle fix) |
| Resume works | Pass (failed before the pointer-lock fix) |
| Full match ends with a result | Pass (time-limit win) |
| No console errors during the match | Pass |

## Bugs found by testing (and fixed)

| Bug | Found by | Fix |
|---|---|---|
| Pause menu unclickable after P / gamepad Start (pointer stayed locked) | Browser playtest | Pausing always releases pointer lock |
| Esc paused and resumed in the same frame | Browser playtest | Ignore the pause key for 400 ms after pausing |
| Bots stuck at Level 3: a "held" E fired Haymakers that cancelled every conversion | Headless match tracing | Bot E input reset every tick |
| Bots walking into the base until 6 m away cancelled their own conversions | Headless match tracing | Convert anywhere inside the base radius |
| Creatures pushed onto blocked ground (map corner) could never move again | Headless match tracing | Creatures on blocked ground may always move |
| 20–60 ms simulation hitches | Headless benchmark | A* budget per tick, shorter A* searches |
| "Hold F to convert 0 cores" prompt | Showcase screenshots | Prompt and channel need at least 1 core |
| Blightborn glass rendered black | Showcase screenshots | Environment map |

## Not covered by automated tests (UNVERIFIED)

- Frame rate on real GPUs (no GPU in this environment).
- Audio output (the headless browser has no audio device).
- Gamepad input (no device).
- Pointer-lock mouse look feel (headless browsers can't move a locked pointer).
- Settings persisting across a real reload (validation logic is unit-tested; the round-trip is not).

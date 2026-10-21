# Roadmap

Milestones adapted from `../spec/06-build-order.md` to the chosen stack.
Status is kept honest: **Done** means implemented, integrated and tested.

| # | Milestone | Status |
|---|---|---|
| 0 | Environment, engine choice, architecture, data pipeline | **Done** |
| 1 | 3D vertical slice: one map, Titan + Brawler, full match vs bots | **Done** (see `TESTING.md`; visual polish continues) |
| 2 | Version B core: four lineages, branches, two Ultimates each, Synergies without tracks, no SAP, Hunt finale, bot difficulty, Grey Migration, First Life | **Done** (2026-10-21; real-GPU playtest pending) |
| 3 | Content: Breathing Canopy map (Version B); Elder Ribs and the rest of the launch wildlife deferred | Next |
| 4 | Progression: profile, Collection/Memories (onboarding done as First Life) | Planned |
| 5 | Online 4v4: Node server running `World` authoritatively, client prediction, matchmaking | Planned (needs hosting decision) |
| 6 | Polish: animation pass, VFX pass, audio pass, UI pass | Ongoing from M2 |
| 7 | Optimisation on real GPUs; mobile/low-end profile | Planned |
| 8 | QA and release build | Planned |

## Milestone 1 exit criteria (vertical slice)

| Criterion | Status |
|---|---|
| Real 3D: terrain, lighting, shadows, materials, camera, collision | Met |
| A player can play a full match start to finish | Met (automated test plays a whole match) |
| Primary mechanic (carry, return, convert, evolve) works and is readable | Met |
| Combat with abilities, weak points, CC, death and respawn | Met |
| Enemy and wildlife AI with navigation | Met |
| UI, sound, VFX, settings, pause, results | Met |
| No console errors in automated play | Met |
| Performance measured | Measured under software rendering only (see `PERFORMANCE.md`) |

## Next

See `../audit/DEVELOPMENT_ROADMAP.md` for the playtest gates. In short:
real-GPU playtest of the four-lineage build, then Breathing Canopy, then a
balance pass with the simulator and playtest data.

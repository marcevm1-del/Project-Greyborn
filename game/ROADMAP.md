# Roadmap

Milestones adapted from `../spec/06-build-order.md` to the chosen stack.
Status is kept honest: **Done** means implemented, integrated and tested.

| # | Milestone | Status |
|---|---|---|
| 0 | Environment, engine choice, architecture, data pipeline | **Done** |
| 1 | 3D vertical slice: one map, Titan + Brawler, full match vs bots | **Done** (see `TESTING.md`; visual polish continues) |
| 2 | Core systems complete: all six launch lineages, branches, Ultimate choices, Synergies, Tension and events | Next |
| 3 | Content: Elder Ribs and Breathing Canopy maps, the rest of the launch wildlife, Grey Migration | Planned |
| 4 | Progression: profile, Collection/Memories, onboarding (The First Budding) | Planned |
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

## Milestone 2 plan (next)

1. Verdant + Hollow (territory pair) and Void Garden.
2. Thornrunner + Bonespire (hunt pair) and Co-Stalk; Mark Prey reveal.
3. Branch choice at L10 and the 3-of-6 Ultimate choice at L20 (Spec 03).
4. Synergy levels (gdd/04) and Smash & Roll for the Commit pair.
5. Tension, the event deck and patron decks (Spec 05 §8).
6. Re-run `../sim/` with the director's decisions on the findings and re-export tuning.

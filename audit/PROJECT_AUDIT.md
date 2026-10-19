# Greyborn — Project Audit (October 2026)

Deliverables 1–3 of the audit: **Executive Summary**, **Project Inventory**,
**Design Audit**, plus the code-quality and testing review (Phase 9).

Audit date: 2026-10-19. Baseline: branch `claude/vigilant-franklin-rjy3mj`
(commit `67ae3eb`, PR #1), identical to the uploaded
`Project-Greyborn-All-Files.zip`.

Labels used throughout:
**[Verified]** = checked during this audit by running or reading it.
**[Doc claim]** = stated in a project document, not re-checked.
**[Assumption]** = my working assumption. **[Recommendation]** = my proposal.

---

## 1. Executive summary

**State of the project.** Greyborn has an unusually large design and a
small, well-built playable core.

| Layer | Size | State |
|---|---|---|
| Design documents (`gdd/`, `spec/`, `design-bible/`) | ~187,000 words | Detailed; ~90% is world, story and post-launch content |
| Playable game (`game/`) | ~5,100 lines of TypeScript + 229 lines of tests | Working 4v4 bot match, 2 of 6 lineages, 1 of 3 maps |
| Balance simulator (`sim/`) | ~1,300 lines of Python | Working; spec meets 5 of 23 pacing targets |

[Verified] `npm run typecheck` passes, `npm test` passes 25/25, and
`npm run build` produces a 686 KB bundle (183 KB gzipped).

**The foundation of the design is thin.** All rules descend from five pages
(pp. 120–124) of an AI-generated GDD mock-up whose text is partly garbled
(`gdd/00-source-pages.md`). The Synergy Access Matrix, the conversion
timers (15/12/9 s vs. 18/15/12 s) and the phase names are *decodings*.
Then 133,000 words of lore and seven seasons of story were written on top,
before any human had played a match.

**My strongest recommendations:**

1. **Stop writing lore, start playtesting.** No new GDD chapters until real
   people have played at least 20 matches of the existing build. The fun of
   the carry → return → convert loop is the single biggest unknown.
2. **Make the game bots-first.** A 4v4 PvP game needs eight humans online
   at once. Recent, well-funded games died on exactly this: Concord peaked
   at 697 concurrent players on Steam and closed within two weeks;
   Supervive peaked around 400 and closed five months after 1.0 (sources
   in `COMPETITOR_RESEARCH.md`). Ship a game that is fun **alone against
   bots** first, then add online play with bot backfill.
3. **Build Version B ("Greyborn: Brood", `GAME_VERSIONS.md`):** four
   lineages in two pairs, 12–15 minute matches, a simple Synergy rule, two
   Ultimates per lineage instead of six, no SAP or Tension tracks.
4. **Keep the stack.** three.js + TypeScript + Vite is the right choice
   for this project and this developer. Don't switch engines.
5. **Protect the work.** `main` holds only a README; everything lives on an
   unmerged PR branch. Merge it (or make it the default branch) and tag
   `v0.1.0` before anything else.

---

## 2. Project inventory

### 2.1 What was accessed

| Item | Accessed | Notes |
|---|---|---|
| `Project-Greyborn-All-Files.zip` | Yes | 165 files; byte-identical to the PR branch |
| `Project-Greyborn-Complete.docx` / `.pdf` | Yes (sampled) | 411-page export of the repo's Markdown (made by `design-bible/tools/build_complete.py`); no unique content |
| `greyborn-tuning.xlsx` | Yes | Identical (MD5) to `spec/greyborn-tuning.xlsx` |
| GitHub `marcevm1-del/project-greyborn` | Yes | `main` = 1-line README (initial commit); work is on `claude/vigilant-franklin-rjy3mj`, PR #1 open |
| GDD v1.0 pages other than 120–124 | **No** | Never shared; unknown whether they exist |
| Any human playtest notes | **No** | None found anywhere in the repo |

### 2.2 Documents and systems

Status key: **I** implemented · **P** partial · **D** designed only · **S** superseded.

| Area | Where | Purpose | Status | Depends on | Main issues |
|---|---|---|---|---|---|
| Source pages | `gdd/00` | Transcribes pp. 120–124 | — | — | Garbled; core rules are interpretations |
| Vision & pillars | `gdd/01`, `gdd/36` | Pitch, 4 pillars, match arc | D | — | Pillars are good; match arc assumes Synergies that the sim says never fire |
| Roster (6 + Stillheart) | `gdd/02`, `14`, `31`, `32`, `spec/02-03`, `design-bible/02` | Kits, forms, 42 Ultimates, cross-resonance | P (Titan, Brawler) | Ability framework | 42 Ultimates + 12 cross-resonances is a large content load; Ultimate names differ between docs (see §3.3) |
| Evolution | `gdd/03`, `spec/05 §2–4` | Levels, Stages, cores, conversion | I | Cores, base | Awakening rule changed in build, not in spec |
| Synergies | `gdd/04`, `spec/02` | Pair abilities, levels 1–10, phase access | D | Pairs, XP track | Simulator: first Synergy fires in **0%** of matches |
| Territory & economy | `gdd/05`, `spec/05 §5–8` | Nodes, Hubs, TI, SAP, Tension | P (no Tension/events) | Map grid | SAP ~10× too high; Tension decay cancels build-up |
| Match flow | `gdd/06`, `spec/05 §9–10` | 4 phases, wins, respawn | I | All of the above | Bot matches always end on time limit |
| Wildlife & ecology | `gdd/09`, `15`, `34`, `43`, `spec/04`, `design-bible/04-06` | 54 creatures, live food web | P (7 species, 5 behaviours) | Wild AI | Live ecology is costly to build and to read in PvP |
| World & story | `gdd/10–13`, `18`, `20–22`, `24`, `28–30`, `35`, `37–41`, `44–51` | Lore, 7 seasons, War Map, Memories | D | Live service | Not needed for a first playable game |
| Maps | `gdd/16`, `42`, `design-bible/08-10` | 3 launch + up to 13 total | P (Ashfall Crossing) | Map pipeline | Each map has a bespoke event (Migration, breathing canopy…) |
| Structures | `gdd/33`, `design-bible/07` | Bases, Hubs, Enemy Cores, nodes | I | — | Fine |
| Art & audio | `gdd/19`, `23`, `game/ASSETS.md` | Direction | P (procedural placeholders) | Art pipeline | No pipeline for rigged monsters yet |
| Onboarding, collection, modes | `gdd/25–27` | Tutorial, cosmetics, 6 modes | D | Accounts/online | Premature |
| Build spec | `spec/01–06` | Numbers for engineers | — | — | Written for a 17-person core team growing to 40 (`spec/06`, "Team shape") |
| Tuning workbook | `spec/greyborn-tuning.xlsx` → `game/src/data/tuning.json` | Single source of numbers | I | `npm run data` | Playtest overrides sit on top, unsigned |
| Simulator | `sim/` | 1,000-match balance check | I | Workbook | Bot model, not humans |
| Playable game | `game/` | three.js vertical slice | I (M1) | — | See §4 |
| Old concept | `docs/`, `prototype/` | Single-player "Hue-stealing" metroidvania | S | — | Confuses navigation; `docs/` name clashes with the audit's suggested `docs/` folder |

### 2.3 Implemented vs. specified

| System | Spec | Build |
|---|---|---|
| Lineages playable | 6 (+1) | 2 |
| Ultimates | 42 | 2 (one per lineage) |
| Branch choice at L10 | Yes | No |
| Synergies | 3 pairs, 10 levels each | None |
| Maps | 3 launch | 1 |
| Wildlife species | 54 | 7 |
| Tension / global events / patron decks | Yes | No |
| Online 4v4 | Server-authoritative from day one (`spec/06` rule 1) | Not started; bots only |
| Tutorial | ~35 min "First Budding" | None |

---

## 3. Design audit

### 3.1 Contradictions found

| # | Contradiction | Where | Recommended resolution |
|---|---|---|---|
| C1 | Source pages: **Stage 1 = Base Form**, 3 Stages total. GDD and build: Base Form **plus** Stages 1–3 (four forms) | `gdd/00` p.120 vs `gdd/02`, `game/` | Keep the build's four forms; record the decision in `gdd/08` |
| C2 | Conversion channel **15/12/9 s** (pp. 120–122) vs **18/15/12 s** (p. 123) | `gdd/08` Q1 | Keep 15/12/9 (built); close Q1 |
| C3 | "No duplicate lineages per team" vs. build fielding 2 Titans + 2 Brawlers per team | `gdd/02`, `gdd/06` vs `World.ts` L120–128 | Unavoidable with 2 lineages; becomes enforceable once 4 exist |
| C4 | Titan's Ultimate is *Colossus Step* in the roster and *Avalanche* in the build; Brawler *Frenzy* in both | `gdd/02` vs `abilities.ts` | Decide one name per Ultimate; with Version B each lineage has 2 |
| C5 | Phase 3 **locks S1** Synergies at 10:00, the very phase in which S1 first unlocks (L12) | `gdd/04`, `gdd/06` | Remove the phase access matrix (see `CHANGELOG_DESIGN.md` D-04) |
| C6 | First-L3 target 2:30–3:30 and first-return target 5:00–7:00 can't both hold | `sim/findings.md` A2 | Build already uses the awakening rule; write it into spec |
| C7 | Spec 05's SAP income table assumes 7–16 cells; the same spec's grid has 240 cells | `sim/findings.md` A1 | Remove SAP (Version B) or accept 0.1/cell |
| C8 | Stillheart arrives in "Season 3" in most chapters, but its chapter is *Season 2* and the README lists it under Season 2 | `README.md`, `gdd/21` | Defer Stillheart entirely; fix wording later |
| C9 | Memories: 40 (catalogue), 46 (at a glance), 70 (iteration log). Plants 26 vs 40; landmarks 24 vs 48; maps 10 vs 13 | `gdd/36`, `38`, `41`, `44`, `08` log | Freeze lore; one pass to reconcile counts if ever needed |
| C10 | Captured nodes shown in **cyan**, which is also the Murmur's colour | `gdd/08` Q39 | Build uses team outline colours (gold/red, colour-blind option); close Q39 |
| C11 | `spec/06` rule 1 says "server-authoritative from day one"; the build (correctly, for now) is local | `spec/06`, `game/ARCHITECTURE.md` | Keep the deterministic, renderer-free sim; it is the right preparation. Amend the rule |

### 3.2 Missing systems or links

- **No human feedback loop.** No playtest form, no telemetry, no recordings.
- **No player-facing reason to return home besides levels.** The return trip
  is the identity mechanic, yet nothing on the trip itself is interesting
  (`gdd/08` risk 2). Pokémon Unite solves the same problem by making the
  *scoring channel* the contested moment, not the walk.
- **Synergy track has no HUD design**, and the GDD itself flags two
  progression tracks as confusing (`gdd/08` risk 3).
- **No defined bot difficulty levels**, which a bots-first game needs.
- **No onboarding inside the build** (the 35-minute "First Budding" is far
  too long for a web game; a 3-minute guided first life is enough).

### 3.3 Per-system review (Phase 3)

Decision key: **Keep · Simplify · Redesign · Remove · Defer**.

| # | System | Works | Missing / weak | Too complex | Bottleneck risk | Decision |
|---|---|---|---|---|---|---|
| 1 | Core loop | Carry → return → convert is distinctive and proven in a cousin (Pokémon Unite's carry-and-score) | Return trip has no texture; untested with humans | — | Low | **Keep** |
| 2 | Movement & controls | WASD + mouse + gamepad, rebinding, evade | Gamepad and pointer-lock feel unverified | — | Low | **Keep** |
| 3 | Combat & abilities | Weak points, telegraphs, CC with Tenacity | Lineage logic hard-coded with `if (lineage === …)` | 42 Ultimates | **High** (content cost) | **Simplify**: 2 Ultimates per lineage |
| 4 | Character identity | Clear pairs (Commit / Root & Void / Hunt) | Hunt pair relies on fog/stealth reveal systems | Cross-resonance (12 passives) | Medium | **Simplify**: 4 lineages; defer cross-resonance |
| 5 | Team composition | Pairs give natural drafts | — | Draft rules for 7 lineages | Low | **Keep** pairs |
| 6 | Maps & navigation | Ashfall Crossing works; mirror-symmetric; A* with budget | Grid A* has 14 ms spikes | 13 maps planned | Medium | **Keep** 1 map, add 1 later |
| 7 | Objectives & resources | Hubs, Enemy Cores, Base Heart, TI | Bots never finish Base Hearts | SAP + TI + Tension + patron decks: four meters | **High** (readability) | **Simplify**: TI + Hubs only |
| 8 | Progression & rewards | Visible growth (1 m → 7.5 m) is the best idea in the project | Level gap 6.4 at 15:00 (snowball watch) | Synergy XP track | Medium | **Simplify** |
| 9 | Modes & match length | Short-match option exists | 25 min standard is long for web/bots | 6 modes planned | Medium | **Redesign**: 12–15 min default |
| 10 | Multiplayer | Deterministic sim, intents, no renderer in sim | Nothing networked yet | Dedicated servers, ranked, matchmaking | **Very high** | **Defer**; bots-first, then Colyseus rooms with bot backfill |
| 11 | AI opponents & NPCs | Utility bots, 5 wildlife temperaments | Bots don't coordinate pushes or peel | Live ecology (predation, overhunting, migrations) | Medium | **Keep** bots, **defer** live ecology |
| 12 | Visual identity & animation | Strong direction (stone/amber vs. black glass/cyan) | Placeholders; no rig pipeline | Two full skins per lineage per Stage | **High** | **Keep** direction; grey-box until fun |
| 13 | Sound & feedback | Synthesised, positional, carry-louder rule | Never heard by a human | Adaptive music by region | Low | **Keep** |
| 14 | UI & onboarding | HUD, minimap, menus, accessibility options | No tutorial; ability icons are Unicode | 35-min tutorial | Medium | **Redesign**: 3-min first life |
| 15 | Replayability | Branches, pairs, sides | — | Seasons, War Map, Memories, events | — | **Defer** live-service layer |
| 16 | Performance | Budgets defined, pooling, instancing, LOD | No real-GPU numbers | — | Medium | **Keep**; measure now |
| 17 | Testing & balancing | Sim + unit + headless + e2e; rare for a project this size | No human tests; sim targets built for spec-B systems | — | Low | **Keep** |
| 18 | Cost & workload | — | — | Spec assumes 17 people (core), 40 at launch | **Very high** | **Redesign** scope to one developer |

### 3.4 What to preserve no matter what

These are the parts that make Greyborn *Greyborn* and not a MOBA clone:

1. **Growth you can see** — a 1 m Kith becoming a 7.5 m Ascendant.
2. **Risk you carry** — unbanked cores, louder when heavy, dropped on death.
3. **Land is power** — rooting, Hubs, territory you can see on the ground.
4. **Read the body** — weak points and telegraphs over stat checks.
5. **The mirror** — Wildborn and Blightborn with identical rules and different skins.
6. **The art direction** — grey world, amber planet, black-glass Blight.

---

## 4. Code quality, testing and safety (Phase 9)

### 4.1 Findings

| # | Finding | Evidence | Severity | Recommendation |
|---|---|---|---|---|
| Q1 | Clean architecture: sim/render/audio/ui split, one-way data flow, fixed 30 Hz deterministic step | `ARCHITECTURE.md`, `World.ts`, determinism test | Strength | Keep; it is what makes online play possible later |
| Q2 | Lineage behaviour is spread through `if (lineage === 'X')` checks: 24 across `World.ts`, `abilities.ts`, `combat.ts`, `botAI.ts`, `CreatureView.ts` | `grep -c "lineage === '"` | **High** before M2 | Introduce a lineage registry (`sim/lineages/<name>.ts` exporting kit, passives, bot hints, view parts) before adding Verdant/Hollow |
| Q3 | Wildlife are created with `lineage: 'Titan'` as a placeholder | `World.ts` L157 | Low | Make `lineage` optional on `Creature` or add `'None'` |
| Q4 | `World.ts` (638 lines) mixes economy, territory, structures, wildlife respawn and wins | `TASKS.md` debt list | Medium | Split into `systems/economy.ts`, `territory.ts`, `structures.ts` when M2 adds systems |
| Q5 | Hard-coded gameplay numbers in code (e.g. evade cooldown `8`, Titan size ×1.15/×1.3, Brawler momentum decay `10`) | `abilities.ts`, `World.ts` | Medium | Move into the workbook so the sim and the game can't drift |
| Q6 | Playtest overrides are applied silently at load in production too | `tuning.ts`, `playtest-overrides.json` | Medium | Fine for now; once the director signs off, fold into the workbook and delete the overrides file |
| Q7 | `innerHTML` with interpolated strings in HUD/menus | `Hud.ts`, `Menus.ts` | Low now, **High** once player names exist | Use `textContent` for any player-supplied text before online play |
| Q8 | Module-level healing window map in `combat.ts` | `TASKS.md` debt | Low | Move into `World` (breaks determinism if two Worlds run in one process, e.g. server rooms) |
| Q9 | A* spikes up to ~14 ms on long paths | `PERFORMANCE.md` | Medium | Coarse hierarchical grid for long trips, or `recast-navigation` (see `API_AND_TOOLS.md`) |
| Q10 | 680 KB single bundle | build output | Low | Split three.js into its own chunk |
| Q11 | No CI; tests only run when someone remembers | repo | Medium | GitHub Actions: typecheck + `npm test` on every push |
| Q12 | No `CLAUDE.md`; conventions live in `ARCHITECTURE.md` only | repo | Medium | Added in this audit |
| Q13 | Secrets | none in repo | Strength | Keep it that way |

### 4.2 Multiplayer cheating risks (for later)

Clients must only send **intents** (already the design). The server must
validate cooldowns, carry caps, channel ranges and core pickups. Never trust
client-reported damage, cores or positions. Fog of war must be enforced
server-side (don't send hidden enemies' positions to clients), otherwise
map-hack is trivial in a browser.

### 4.3 Testing strategy

| Layer | What to test | Tool | When |
|---|---|---|---|
| Rules | Formulas: EXP, damage, CC, conversion, TI | Vitest unit tests (exists) | Every commit |
| Ability interactions | Each ability vs. each CC state, weak point break, interrupts of channels | New table-driven Vitest file per lineage | When a lineage is added or changed |
| Movement & collision | Blocked ground, knockback onto cliffs, base radius | Headless scenario tests with scripted intents | Every commit |
| AI behaviour | Bots reach L15+, convert, capture, never stuck; no bot idles > 20 s | Headless match (exists) + new "stuck" assertion | Every commit |
| Game-state transitions | Phase changes, overtime, mercy, Base Heart win | `overtime.test.ts` pattern, extended | Every commit |
| UI & input | Menus by real clicks, pause/resume, rebinding | Playwright e2e (exists) | Before each release |
| Performance | Sim ≤ 2 ms/tick average; real-GPU FPS at High | `perf.test.ts` (exists) + manual GPU log | Every release |
| Balance | Pacing targets | `sim/` + headless game matches | After any tuning change |
| Regression | All of the above in CI | GitHub Actions | Every push |
| **Human fun** | Five-question playtest form after each match | Google Form or Jotform | Weekly from now on |
| Multiplayer sync (later) | Same seed + same intents ⇒ same state on server and client | Determinism test across two processes | When M-Online starts |

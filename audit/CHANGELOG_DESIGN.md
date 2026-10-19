# Design Change Log (proposals)

Deliverable 14, with the Phase 5 detail for each change. **Status of every
entry: Proposed**: awaiting the director. When decided, mark it
**Approved** or **Rejected** with the date (the `docs-sync` skill does this).

Summary first; detail cards below.

| ID | Change | Reason | Expected impact | Effort | Priority | Decision |
|---|---|---|---|---|---|---|
| D-01 | Single-player vs bots first; online later with bot backfill | Team PvP needs a population that doesn't exist yet | Playable, releasable game with zero servers | Low | **Critical** | Redesign |
| D-02 | Launch roster 6 (+Stillheart) → 4 lineages | Content and balance load | ~45% less lineage content | — (saves) | High | Simplify |
| D-03 | Ultimates 42 → 8 (one per branch) | 42 is a multi-year art/balance load | Branch choice still meaningful | — (saves) | High | Simplify |
| D-04 | Synergies: no XP track, no tiers, no phase matrix | Simulator: fires in 0% of matches; Phase 3 locks S1 when it unlocks | Synergies actually happen; one fewer HUD track | Low | **Critical** | Redesign |
| D-05 | Remove SAP; Hub Defense rises with time held | SAP ~10× too high; spent automatically anyway | One fewer meter; same Hub behaviour | Low | High | Remove |
| D-06 | Remove Tension, event deck, patron decks; one scheduled map event | Decay cancels build-up; events rarely fire; hard to read | Predictable, learnable mid-match moment | Low | Medium | Remove |
| D-07 | 12:30 standard match; Hunt phase doubles TI gains | 25 min is long for web/bots; matches always time out | More decisive endings, better comebacks | Low | High | Redesign |
| D-08 | Hub field conversion becomes the contested channel | Return trip is "dead time" (`gdd/08` risk 2) | Fights at Hubs, teamwork to convert faster | Medium | High | Redesign |
| D-09 | Adopt simulator fixes A2, A3, A6 and Heart 12,000 as rules | Already running in the build as overrides | Spec and build agree | Low | High | Keep (formalise) |
| D-10 | Bot difficulty levels; Hard bots push Base Hearts | Bots-first game; bot matches never finish | Real challenge curve; matches end | Medium | High | Redesign |
| D-11 | 3-minute "First Life" onboarding | 35-min tutorial is too long; Evolve's onboarding lesson | New players finish a first match | Medium | High | Redesign |
| D-12 | Lineage registry refactor | 24 lineage-name checks across 5 files | Adding lineages becomes contained | Medium | **Critical** (before D-02 work) | Redesign (code) |
| D-13 | Static wildlife camps; defer live food web | Costly, hard to read in PvP | Readable PvE layer | — (saves) | Medium | Defer |
| D-14 | Lore freeze: defer seasons, War Map, Memories, Collection, extra modes | Not needed to test the fun | Time goes to the game | — (saves) | High | Defer |
| D-15 | Merge PR #1 / make the work the default branch; tag v0.1.0 | `main` is empty | Work protected and discoverable | Low | **Critical** | Production |
| D-16 | Close open questions Q1 (15/12/9 s), Q39 (team colours), and C1 (four forms) as built | Build already chose | Fewer open questions | Low | Medium | Keep (record) |

---

## Detail cards

### D-01 · Bots-first, online later

- **Current design:** 4v4 online PvP; "server-authoritative from day one" (`spec/06` rule 1).
- **Problem:** eight concurrent humans per match. Concord (697 peak), Supervive (~400 peak) and Battlerite all closed or wound down on population (`COMPETITOR_RESEARCH.md`). One developer can't fund servers or marketing to fix that.
- **Recommended adjustment:** every seat can be a bot; the default match is 1 human + 7 bots with Easy/Normal/Hard. Online rooms come later and fill empty seats with the same bots.
- **Gameplay benefit:** instant matches, any time, any skill level.
- **Technical implementation:** already true in the build (`World` runs bots and players through `intent`). Later: Colyseus room owning a `World` (see `TECH_STACK.md`).
- **Dependencies:** D-10 (difficulty).
- **Effort:** Low now; High for the later online milestone. **Priority:** Critical. **Decision:** Redesign.

### D-02 · Four lineages at launch

- **Current design:** Titan, Brawler, Verdant, Hollow, Thornrunner, Bonespire + Stillheart.
- **Problem:** each lineage = 4 forms × 2 sides of models, kit code, bot logic, VFX, sounds, balance against every other.
- **Adjustment:** Commit pair (built) + Root & Void pair. Defer Hunt pair (needs reveal/stealth systems) and Stillheart.
- **Benefit:** two real pairs test "interdependency"; Root & Void carries territory identity.
- **Implementation:** via `/add-lineage` after D-12.
- **Dependencies:** D-12. **Effort:** High (two lineages). **Priority:** High. **Decision:** Simplify.

### D-03 · Eight Ultimates

- **Current design:** 3 Ultimate Forms per branch, 6 per lineage, 42 total (`spec/03`).
- **Problem:** each Ultimate needs unique code, VFX, animation, audio, balance; two are already flagged too strong.
- **Adjustment:** one per branch: Titan Avalanche / Fortress; Brawler Frenzy / Shove of the Storm; Verdant Thornstorm / Overgrowth (cap 4 nodes); Hollow Collapse / Event Horizon.
- **Benefit:** the L10 branch choice now *decides* your Ultimate, which makes it a bigger, clearer choice.
- **Implementation:** branch selection UI at L10; Ultimate lookup by branch in the lineage module.
- **Dependencies:** D-12. **Effort:** Medium. **Priority:** High. **Decision:** Simplify.

### D-04 · Synergies without tracks

- **Current design:** pair Synergy levels 1–10 from shared XP (30 × n per level), tiers S1–S3 with unlocks at L12/15/18, a phase access matrix (Phase 3 locks S1, Phase 4 allows S3 only).
- **Problem:** simulated pairs reach Synergy level 2.1 by 18:00 (target 10); the first Synergy fires in 0% of matches (`sim/findings.md` A4). The matrix locks S1 in the very phase it unlocks (C5). Two progression tracks confuse players (`gdd/08` risk 3).
- **Adjustment:** a Synergy is available when both partners are alive, Stage 2+ and within 15 m; fixed 20 s pair cooldown. Keep the Smash & Roll commitment penalty.
- **Example:** at 4:40 the Titan reaches L10 while the Brawler is L11, 9 m away: the pair icon lights; Titan slams, Brawler rolls within 1.5 s → Smash & Roll.
- **Benefit:** Synergies appear mid-match, every match.
- **Implementation:** `synergyReady(pair)` check in the sim; per-pair cooldown on `World`; HUD pair icon.
- **Dependencies:** D-12. **Effort:** Low. **Priority:** Critical. **Decision:** Redesign.

### D-05 · Remove SAP

- **Current design:** SAP per captured cell per second buys Hub Defense levels; Verdant's Sap Draw and Sap Frenzy spend it.
- **Problem:** 10× too high (A1); players can't spend it in the build (bought automatically).
- **Adjustment:** Hub Defense +1 level per 45 s held (max 10). Sap Draw becomes a cooldown heal (3% max Health/s for 4 s, 8 m, 16 s). Sap Frenzy isn't in the 8 Ultimates.
- **Benefit:** one fewer number to track; Hubs still get tougher the longer you hold them.
- **Implementation:** replace the SAP purchase loop in `World.ts` with a held-time counter per Hub.
- **Dependencies:** none. **Effort:** Low. **Priority:** High. **Decision:** Remove.

### D-06 · One scheduled map event instead of Tension

- **Current design:** per-border Tension builds and decays, triggers global events from neutral and patron decks.
- **Problem:** decay cancels build-up (A5); half of simulated matches have no event; four meters on screen.
- **Adjustment:** one known event per map at a fixed time (Ashfall: Grey Migration at 6:00; Canopy: breath every 90 s).
- **Benefit:** players can plan around it; it becomes a skill, not a dice roll.
- **Implementation:** a timed event in the map definition; herd as a wildlife camp with a path.
- **Effort:** Low–Medium. **Priority:** Medium. **Decision:** Remove + replace.

### D-07 · 12:30 matches with a Hunt finale

- **Current design:** 18–25 minute target, 25:00 limit; a "short match" option halves it.
- **Problem:** 96–100% of simulated matches hit the time limit; 25 minutes alone vs bots is long. Pokémon UNITE runs 10 minutes with a doubled final stretch.
- **Adjustment:** the short match becomes standard. In Phase 4 (Hunt) TI gains are doubled.
- **Benefit:** comebacks stay possible; endings are decisive.
- **Implementation:** default `short: true`; TI gain multiplier by phase.
- **Effort:** Low. **Priority:** High. **Decision:** Redesign.

### D-08 · Contested field conversion

- **Current design:** field conversion at a held Hub at 70% efficiency, same channel as base.
- **Problem:** the identity mechanic's key moment is a walk home.
- **Adjustment:** channel = 6 s + 1 s per 50 cores, −25% per extra ally in the Hub ring (max −50%); damage pauses it. Home conversion unchanged (safe, slower to reach, 100%).
- **Example:** 300 cores alone: 12 s exposed at the Hub; with two allies guarding: 6 s.
- **Benefit:** a real choice between safe-and-far and fast-and-exposed, and a reason to fight at Hubs together.
- **Implementation:** conversion channel duration function in `rules.ts`; ally count in the Hub ring; pause on damage.
- **Effort:** Medium. **Priority:** High. **Decision:** Redesign. **Needs:** simulator run + human playtest.

### D-09 · Formalise the simulator fixes

- **Current design:** spec values; build uses `playtest-overrides.json`.
- **Adjustment:** write awakening rule (A2), Enemy Core reward 900 (A3), EXP 60 + 15 × L and bounty 100 + 15 × level (A6), Base Heart 12,000 into the workbook and specs; delete the overrides file. A1 (SAP), A4 (Synergy) and A5 (Tension) are superseded by D-05, D-04 and D-06.
- **Effort:** Low. **Priority:** High. **Decision:** Keep.

### D-10 · Bot difficulty

- **Current design:** one bot level; bots don't coordinate pushes or peel (`KNOWN_ISSUES` 9, 12).
- **Adjustment:** Easy/Normal/Hard profiles (reaction time, aim error, return discipline, Synergy use, grouped Base Heart push once Enemy Cores are down). Table in `GAME_DESIGN_DOCUMENT.md` §10.
- **Implementation:** a `BotProfile` passed to `BotBrain`; a team-level "push" goal when the enemy Heart is open.
- **Effort:** Medium. **Priority:** High. **Decision:** Redesign.

### D-11 · First Life onboarding

- **Current design:** "The First Budding", ~35 minutes (`gdd/25`).
- **Adjustment:** ≈3-minute scripted first life (`GAME_DESIGN_DOCUMENT.md` §12) + one-time tooltips.
- **Effort:** Medium. **Priority:** High. **Decision:** Redesign.

### D-12 · Lineage registry (technical)

- **Current:** 24 `lineage === '…'` checks in `World.ts`, `abilities.ts`, `combat.ts`, `botAI.ts`, `CreatureView.ts`; wildlife typed as `lineage: 'Titan'`.
- **Adjustment:** `sim/lineages/` modules behind one interface (`TECH_STACK.md`).
- **Acceptance:** no lineage-name checks outside `sim/lineages/`; tests green; fixed-seed match identical before and after.
- **Effort:** Medium. **Priority:** Critical. **Decision:** Redesign.

### D-13 · Static wildlife

- **Current:** live food web, herd reactions, overhunting stress, migrations (`gdd/15`).
- **Adjustment:** keep camps and temperaments (built); defer the ecology layer.
- **Effort:** none. **Priority:** Medium. **Decision:** Defer.

### D-14 · Lore freeze

- **Current:** 52 chapters, 7 seasons, War Map, 40–70 Memories, Collection, 6 modes.
- **Adjustment:** no new lore chapters; all of it stays as reference for a later live game.
- **Effort:** none. **Priority:** High. **Decision:** Defer.

### D-15 · Protect the work

- **Current:** `main` has one README; everything is on PR #1's branch.
- **Adjustment:** merge PR #1 (or set the branch as default) and tag `v0.1.0`; merge this audit branch after review.
- **Effort:** Low. **Priority:** Critical. **Needs your approval** (it changes `main`).

### D-16 · Close settled questions

- Q1 conversion 15/12/9 s; Q39 node ownership in team colours; C1 four forms (Base Form + Stages 1–3). All already built.
- **Effort:** Low. **Priority:** Medium.

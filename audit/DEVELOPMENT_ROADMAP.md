# Development Roadmap

Deliverables 12–13. Adapted to the **actual** state: Stages 1–3 of the
master plan are largely done in code; what's missing is human evidence.
Effort is relative (Low / Medium / High). Nothing here starts from scratch.

```
Stage 1  Foundation        ██████████ mostly done → close it out (1–2 weeks)
Stage 2  Core prototype    ██████████ done (v0.1.0)
Stage 2a Human playtest    ░░░░░░░░░░ NEW GATE: is it fun?
Stage 3  Complete loop     ███████░░░ done vs bots; needs Version A items
Stage 4  Vertical slice B  ░░░░░░░░░░ 4 lineages, Synergies, art pass
Stage 5  Content           ░░░░░░░░░░ second map, polish, balance
Stage 6  Release           ░░░░░░░░░░ single-player 1.0 on the web
Stage 7  Online (optional) ░░░░░░░░░░ rooms with bot backfill
```

---

## Stage 1 — Close out the foundation

| | |
|---|---|
| Deliverables | PR #1 merged (or branch made default) and `v0.1.0` tagged; this audit reviewed; `CLAUDE.md`, skills, hook, CI merged; director decisions on `CHANGELOG_DESIGN.md` |
| Dependencies | Your approval |
| Acceptance | CI green on `main`; every D-xx entry marked Approved/Rejected |
| Effort | Low |
| Risks | R4 |
| Tests before proceeding | CI run passes |

## Stage 2a — Human playtest gate (new)

| | |
|---|---|
| Deliverables | Public test build (itch.io); a 5-question form linked from the results screen; 20 matches by at least 5 people, including you on a real GPU |
| Questions | 1. Did you finish the match? 2. When did you go home with cores, and why? 3. What was the best moment? 4. What confused you? 5. Would you play again (1–5)? + FPS shown by the overlay |
| Dependencies | Stage 1 |
| Acceptance | Gate passes if ≥ 60% would play again (4–5), and the return decision is mentioned as interesting by ≥ half. If it fails: fix the loop (D-07, D-08 first) before building content |
| Effort | Low (code), Medium (finding testers) |
| Risks | R1, R7 |

## Stage 3 — Complete loop (Version A items)

| | |
|---|---|
| Deliverables | D-07 12:30 standard + Hunt TI ×2; D-10 bot difficulty; D-05 SAP removal; D-06 Grey Migration event; D-09 overrides formalised; Smash & Roll with D-04 rule; D-11 First Life |
| Dependencies | Stage 2a findings |
| Acceptance | ≥ 30% of Normal-bot matches end at a Base Heart or mercy; Synergy fires before 7:00 in ≥ 80% of headless matches; testers finish the First Life without help |
| Effort | Medium |
| Risks | R5 |
| Tests | Unit tests for each rule; headless match assertions for endings and Synergy timing; `/balance-pass` |

## Stage 4 — Version B vertical slice

| | |
|---|---|
| Deliverables | D-12 lineage registry; Verdant + Hollow; Void Garden; branch choice at L10 with D-03 Ultimates; HUD pair indicator; SVG ability icons; one hero creature (Titan, Stage 3) through the art pipeline |
| Dependencies | Stage 3 |
| Acceptance | All 4 lineages playable by human and bots on both sides; no lineage win rate outside 45–55% in 400 headless matches; testers can name enemy lineages at Stage 3 |
| Effort | High |
| Risks | R6, R9, R12 |
| Tests | Per-lineage test files; determinism test; `/playtest-check`; second human playtest round |

## Stage 5 — Content

| | |
|---|---|
| Deliverables | Breathing Canopy map + 3 wildlife species; art pass on remaining creatures; audio pass after a real listen; performance pass on real GPUs |
| Dependencies | Stage 4 |
| Acceptance | 60 fps at High on a mid-range desktop GPU; both maps within 45–55% side/lineage balance |
| Effort | High |
| Risks | R8, R9, R10 |

## Stage 6 — Single-player release

| | |
|---|---|
| Deliverables | 1.0 web build; `RELEASE_CHECKLIST.md` all ticked on real hardware; store page (itch.io; portal application optional); short trailer captured from gameplay |
| Acceptance | Release checklist complete; no known crash; tested on Chrome, Firefox, Edge, Safari |
| Effort | Medium |
| Risks | R14, R16 |

## Stage 7 — Online (only if Stage 6 shows demand)

| | |
|---|---|
| Deliverables | Colyseus room owning `World`; 2v2 then 4v4 with bot backfill; server-side fog of war and intent validation; private rooms by link (no matchmaking yet) |
| Dependencies | Stage 6 + evidence of players asking for it |
| Acceptance | 4 players + 4 bots complete a match at ≤ 150 ms latency without desync; cost per match-hour measured |
| Effort | High |
| Risks | R3, R13, R14 |

---

## Immediate action list — the first five tasks

| # | Task | Why it comes first | Who | Effort |
|---|---|---|---|---|
| 1 | **Approve and merge** PR #1 and this audit branch (or tell me to set the branch as default); tag `v0.1.0` | Everything else builds on a safe, visible `main`; CI starts protecting the code | You approve, Claude does it | Low |
| 2 | **Play three matches yourself on a real PC** with the FPS overlay on, and write down the five answers above | The cheapest possible test of the biggest risk (R1) and the only way to get real performance numbers (R7) | You | Low |
| 3 | **Decide the 16 proposals** in `CHANGELOG_DESIGN.md` (a yes/no/change per row is enough) | Unblocks all build work; most are simplifications that save months | You | Low |
| 4 | **Build the lineage registry** (D-12) with no behaviour change | Every later lineage, Ultimate and Synergy depends on it; cheaper now with 2 lineages than later with 4 | Claude | Medium |
| 5 | **Ship a public playtest build** with the Version A quick wins (12:30 default, bot difficulty, Smash & Roll, a feedback form link) on itch.io | Gets other people's evidence within weeks, not months | Claude builds; you upload or approve hosting | Medium |

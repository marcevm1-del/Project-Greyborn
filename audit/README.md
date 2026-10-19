# Greyborn Design Audit — October 2026

A full audit of the project (design documents, specification, simulator
and playable build), with research, a recommended version of the game, and
a roadmap. Nothing in `gdd/`, `spec/`, `design-bible/` or `game/` was
changed by the audit; every change is a **proposal** in
[CHANGELOG_DESIGN.md](CHANGELOG_DESIGN.md).

## In one minute

- **What exists:** ~187,000 words of design, a balance simulator, and a
  tested, working 3D browser game (v0.1.0): a 4v4 bot match with 2 of 6
  lineages on 1 of 3 maps.
- **Biggest risk:** no human has played it, and its design assumes a studio
  of 17–40 people and an online player base that doesn't exist.
- **Recommendation:** build **Version B, "Greyborn: Brood"**: four
  lineages, simple Synergies, 12:30 matches, single-player against bots
  first, online later. Keep the three.js + TypeScript stack.
- **Do first:** merge the work into `main`, play three matches yourself on a
  real PC, decide the 16 proposals, build the lineage registry, ship a
  public playtest build.

## Files (read in this order)

| # | Deliverable | File |
|---|---|---|
| 1–3 | Executive summary, project inventory, design audit, code & testing review | [PROJECT_AUDIT.md](PROJECT_AUDIT.md) |
| 4–5 | Research report and comparison matrix | [COMPETITOR_RESEARCH.md](COMPETITOR_RESEARCH.md) |
| 6 | Three versions of the game | [GAME_VERSIONS.md](GAME_VERSIONS.md) |
| 7 | Revised game design document (Version B) | [GAME_DESIGN_DOCUMENT.md](GAME_DESIGN_DOCUMENT.md) |
| 8 | Architecture recommendation | [TECH_STACK.md](TECH_STACK.md) |
| 9 | API and tooling plan | [API_AND_TOOLS.md](API_AND_TOOLS.md) |
| 10 | Claude workflow setup | [CLAUDE_WORKFLOW.md](CLAUDE_WORKFLOW.md) |
| 11 | Risk register | [RISK_REGISTER.md](RISK_REGISTER.md) |
| 12–13 | Roadmap and the first five tasks | [DEVELOPMENT_ROADMAP.md](DEVELOPMENT_ROADMAP.md) |
| 14 | Change log with Phase 5 detail cards | [CHANGELOG_DESIGN.md](CHANGELOG_DESIGN.md) |

Also added: [`../CLAUDE.md`](../CLAUDE.md), `../.claude/` (6 skills, 2
agents, 1 hook) and `../.github/workflows/ci.yml`.

The audit lives in `audit/` rather than `docs/` because `docs/` holds the
superseded early concept.

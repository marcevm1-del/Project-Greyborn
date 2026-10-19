# Claude Workflow Setup

Deliverable 10 (Phase 8). Everything below was **created in this branch**
and checked against the current Claude Code documentation
([skills](https://code.claude.com/docs/en/skills.md),
[subagents](https://code.claude.com/docs/en/sub-agents.md),
[hooks](https://code.claude.com/docs/en/hooks-guide.md),
[GitHub Actions](https://code.claude.com/docs/en/github-actions.md)),
opened on 2026-10-19.

## The pieces, and what each is for

They are not interchangeable:

| Mechanism | What it is | Loaded | Used here for |
|---|---|---|---|
| **`CLAUDE.md`** | Project instructions read at the start of every session | Always | Folder map, authority order, the 9 project rules, commands |
| **Skills** (`.claude/skills/<name>/SKILL.md`) | Reusable procedures. Only the description is always in context; the body loads when invoked, by Claude or by typing `/name` | On demand | Repeatable jobs: design check, add a lineage, balance pass, QA pass, docs sync, asset intake |
| **Subagents** (`.claude/agents/<name>.md`) | Separate Claude instances with their own context and tool limits | When delegated | Independent review, so work isn't graded by the one who made it |
| **Hooks** (`.claude/settings.json`) | Shell commands Claude Code runs at fixed points; deterministic | Every matching event | Typecheck after each TypeScript edit |
| **MCP servers / connectors** | External tools (GitHub, Vercel, Jotform…) | When connected | Not added to the repo; your account already has GitHub, Vercel, Jotform, Supabase |
| **GitHub Actions** | CI, and optionally Claude on GitHub | On push / `@claude` | `ci.yml` added; Claude Action optional |

## Files created

```
CLAUDE.md
.claude/
  settings.json                 PostToolUse hook → typecheck.sh
  hooks/typecheck.sh            typechecks game/ after edits to game/src/*.ts; exit 2 sends errors back to Claude
  skills/
    design-check/SKILL.md       Game Design Auditor + Character & Ability Designer
    add-lineage/SKILL.md        Gameplay Systems Developer + AI Behaviour (bot hints)
    balance-pass/SKILL.md       Automated balancing (simulator + headless matches)
    playtest-check/SKILL.md     Automated Playtesting + QA + Performance
    docs-sync/SKILL.md          Documentation Maintainer
    asset-intake/SKILL.md       3D Asset Pipeline Assistant
  agents/
    code-reviewer.md            Code Review and QA (read-only, independent)
    design-critic.md            Design challenge before the director sees a proposal
.github/workflows/ci.yml        typecheck + tests + build + simulator tests on every push
```

**Verified in this audit:** the hook script was run with three inputs
(TypeScript file with no errors → exit 0; non-TS file → skipped; file with a
type error → exit 2 with the error text). The simulator's 10 unit tests and
the game's 25 tests pass. **Not verified:** the hook inside a live Claude
Code session, and the CI workflow on GitHub (it runs on the next push).
The perf test asserts tick times; if GitHub's runners are slower, that test
may need a CI-specific threshold.

## Skill catalogue

| Skill | Purpose | Activated | Inputs | Outputs | Constraints | Repository use | How results are tested |
|---|---|---|---|---|---|---|---|
| `design-check` | Judge a mechanic against pillars, scope, readability, counterplay, cost | Automatically for design questions, or `/design-check …` | Proposal text or file | Verdict + table + smallest fix + effort | Read-only | Reads `audit/`, `spec/`, `gdd/` | Director agrees/disagrees; verdict logged in `CHANGELOG_DESIGN.md` |
| `add-lineage` | Implement a lineage via the registry | **Manual only** (`/add-lineage Verdant`): it changes a lot of code | Lineage name | Code, tests, docs updates | Builds the registry first if missing; numbers in workbook | Writes `game/src/sim/lineages/`, `botAI.ts`, `CreatureView.ts` | New per-lineage test file; all tests green; headless match finishes |
| `balance-pass` | Run sim + headless matches after tuning | Automatically after tuning changes, or `/balance-pass` | What changed | Before/after table vs targets | Proposes, never commits workbook values | Runs `sim/run.py`, `npm test` | The table itself; reproducible with seeds |
| `playtest-check` | Full QA: types, tests, build, e2e, screenshots, perf | `/playtest-check` before merging/releasing | — | Results table; updates `game/TESTING.md` | e2e only against `vite preview` | Runs scripts in `game/` | Its own checks |
| `docs-sync` | Align docs with code and decisions | After features or decisions | Diff range | Edited status docs + list of remaining contradictions | Doesn't rewrite lore | Edits `game/*.md`, `gdd/08`, `audit/CHANGELOG_DESIGN.md` | `code-reviewer` checks docs updated |
| `asset-intake` | Safe import of external/AI assets | **Manual only** (`/asset-intake file source`) | File + source + licence | Placed asset + `ASSETS.md` record + screenshot | Refuses unclear licences | Writes `game/public/assets/`, `game/ASSETS.md` | Screenshot review; triangle budget check |

**Merged or dropped from the requested ten:** *Technical Architecture
Reviewer* and *Code Review/QA* became the `code-reviewer` subagent (a
reviewer works best with a fresh context). *AI Behaviour Designer* is part
of `add-lineage` (bot hints per lineage) because bots should be built with
each lineage, not separately. *Performance Optimiser* is part of
`playtest-check` until real-GPU numbers exist; a separate skill can't
measure frame rate in a cloud container. *Character and Ability Designer*
is part of `design-check`.

## How to use it day to day

1. Open the repo in Claude Code (desktop app or terminal). `CLAUDE.md`,
   the skills, the agents and the hook load automatically.
2. Idea → ask Claude; it should run `design-check` (or type `/design-check`).
3. Approved → `/add-lineage Verdant` (or a normal request for smaller work).
4. Before merging → "have the code-reviewer agent review this branch",
   then `/playtest-check`.
5. After any number change → `/balance-pass`.
6. After a decision → `/docs-sync`.

## Optional: Claude on GitHub

Lets you write "@claude the Titan gets stuck on the north cliff" on an
issue from your phone and get a pull request. Setup: run
`/install-github-app` in Claude Code, which installs the Claude GitHub App,
stores `ANTHROPIC_API_KEY` or a subscription token (`CLAUDE_CODE_OAUTH_TOKEN`)
as a repository secret, and opens a PR with the workflow
([docs](https://code.claude.com/docs/en/github-actions.md)). It uses your
API credits or subscription, plus Actions minutes. **Not done in this
audit**: it needs your account and approval.

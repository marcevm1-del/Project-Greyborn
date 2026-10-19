---
name: docs-sync
description: Bring Greyborn's documentation back in line with the code and the approved plan - game/*.md status files, audit/ decisions, and contradictions between gdd/, spec/ and the build. Use after a feature lands, after the director makes a decision, or when docs and code disagree.
allowed-tools: Read Grep Glob Edit
---

# Docs sync

## Order of authority

1. The code in `game/` (what exists).
2. Decisions recorded in `gdd/08-open-questions.md` "Decided" and
   `audit/CHANGELOG_DESIGN.md` entries marked **Approved**.
3. `audit/GAME_DESIGN_DOCUMENT.md` (plan).
4. `spec/`, then `gdd/` and `design-bible/`.

## Steps

1. `git diff main...HEAD --stat` (or the range given) to see what changed.
2. For each behaviour change, update in the same pass:
   `game/GAME_DESIGN.md`, `game/TASKS.md`, `game/KNOWN_ISSUES.md`,
   `game/CHANGELOG.md`, `game/ROADMAP.md`.
3. If a director decision was made: move it to "Decided" in
   `gdd/08-open-questions.md` with the date, and mark the matching
   `audit/CHANGELOG_DESIGN.md` entry Approved or Rejected.
4. Search for the old value or name across `gdd/ spec/ design-bible/`
   (`Grep`) and list where it still appears. **Fix `spec/` values; only
   list `gdd/` lore mentions** unless asked to edit them.

## Rules

Don't invent decisions. Don't rewrite chapters. Keep edits minimal and
factual. Report the files changed and any contradictions left open.

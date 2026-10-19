---
name: design-check
description: Review a proposed Greyborn mechanic, ability, lineage, map feature or rule change against the pillars, Version B scope, readability, counterplay and build cost. Use before adding or changing any gameplay design, or when the director asks "is this a good idea?".
argument-hint: "[the proposal, or a path to it]"
allowed-tools: Read Grep Glob
---

# Design check

Judge the proposal in `$ARGUMENTS` (text or a file path). Be direct: the
director wants a verdict, not an essay.

## Read first

- `audit/GAME_DESIGN_DOCUMENT.md` (what is in scope)
- `audit/PROJECT_AUDIT.md` §3.4 (what must be preserved)
- The `spec/` or `gdd/` section the proposal touches

## Test the proposal against

| Test | Pass when |
|---|---|
| Pillars | Strengthens at least one of: growth you can see, risk you carry, land is power, read the body; weakens none |
| Scope | Fits Version B, or is explicitly marked as deferred content |
| Readability | A spectator can tell what happened from the screen and sound alone, at 7.5 m creature scale |
| Counterplay | The target has a response (dodge, interrupt, weak point, retreat, peel) |
| Mirror | Works identically for Wildborn and Blightborn |
| Bots | Bots can use it and play against it without special cases |
| Cost | Lists new code, art, VFX, audio, UI, tests. Flags anything needing a new system |
| Numbers | Every number can live in the tuning workbook |
| Duplication | Doesn't duplicate an existing ability or Synergy |

## Output

1. **Verdict:** Keep · Simplify · Redesign · Defer · Reject (one line why).
2. The table above with ✓ / ✗ and a few words each.
3. If not Keep: the smallest change that would make it pass, as a concrete
   example (numbers included).
4. Effort: Low / Medium / High.

Don't edit files. Hand the verdict back.

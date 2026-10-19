---
name: add-lineage
description: Implement or change a Greyborn lineage (kit, passive, Ultimates, Synergy hook, bot behaviour, procedural model) through the lineage registry in game/src/sim/lineages. Use when building Verdant, Hollow or any later lineage, or reworking Titan/Brawler.
argument-hint: "[lineage name]"
disable-model-invocation: true
---

# Add or change a lineage: $ARGUMENTS

## Before writing code

1. Read the lineage's entries: `audit/GAME_DESIGN_DOCUMENT.md` §6–7,
   `spec/02-abilities.md`, `spec/03-ultimates.md`, `design-bible/02-ascendants.md`.
2. Check the registry exists (`game/src/sim/lineages/registry.ts`). If it
   doesn't, **stop** and build the registry first (see
   `audit/TECH_STACK.md`, "The lineage registry"), moving Titan and
   Brawler into it with no behaviour change, and prove it with the
   determinism test before continuing.
3. Confirm every number is in the tuning workbook. Missing numbers: add
   them to `spec/greyborn-tuning.xlsx`, run `npm run data`.

## Build, in this order

1. `sim/lineages/<name>.ts`: kit (Q/E/R), passive, both Ultimates,
   weak point, size multipliers, Synergy trigger hook, `botHints`.
2. Register it in `registry.ts` and the draft list.
3. Bot use: make `botAI.ts` read `botHints`; no lineage-name checks.
4. View: procedural parts per form and side in the lineage's `view()`;
   keep the silhouette readable at Stage 3 (check a screenshot).
5. HUD icons and ability names.

## Tests (required)

- New `src/sim/lineages/<name>.test.ts`: each ability hits, misses, is
  interrupted by stun, respects cooldown; weak point can break; Ultimate
  only at L20; Synergy fires with the partner in range and not out of range.
- `npm run typecheck && npm test` all green.
- Headless match with this lineage on both teams finishes without stuck bots.

## Finish

Update `game/GAME_DESIGN.md` (scope table), `game/CHANGELOG.md`,
`game/KNOWN_ISSUES.md`. Report: what was built, test results, anything
unverified.

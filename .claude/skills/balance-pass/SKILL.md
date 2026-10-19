---
name: balance-pass
description: Run Greyborn's balance checks after any tuning or rule change - the Python match simulator and headless game matches - and report results against the pacing targets. Use when numbers in spec/greyborn-tuning.xlsx or playtest-overrides.json change, or when asked whether the game is balanced.
argument-hint: "[what changed]"
allowed-tools: Read Grep Glob
---

# Balance pass

Change under test: $ARGUMENTS

## Steps

1. If the workbook changed: `cd game && npm run data`.
2. Simulator, quick: `python3 sim/run.py -n 200 --out /tmp/balance.md`
   (full run: drop `-n`, ~40 s). Use `--set` for one-off experiments
   instead of editing the workbook.
3. Game, headless: `cd game && npm test` (includes a full short bot match
   and the performance/progression test).
4. Compare with the targets in `audit/GAME_DESIGN_DOCUMENT.md` §15 and,
   for systems not in Version B, `sim/report.md`.

## Report

| Metric | Target | Before | After | OK? |
|---|---|---|---|---|

Then: one paragraph on what moved and why; one recommended next change, if
any. Remember the simulator models bots, not people: say which results
depend on bot behaviour. Don't change the workbook's committed values
without the director's sign-off; propose them.

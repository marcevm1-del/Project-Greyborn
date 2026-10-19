---
name: playtest-check
description: Full automated QA pass on the Greyborn web build - typecheck, unit and headless tests, production build, browser smoke playtest with screenshots, and performance numbers. Use before a release, before merging a feature branch, or when asked "does it still work?".
allowed-tools: Read Grep Glob
---

# Playtest check

Run from `game/`. Stop at the first failure, diagnose it, and report.

1. `npm run typecheck`
2. `npm test` — record pass count and the perf test's average/99th
   percentile tick times.
3. `npm run build` — record bundle size (budget: ≤ 1 MB, ≤ 300 KB gzip).
4. `npm run preview &` then
   `node tests/e2e/smoke.mjs http://localhost:4173 /tmp/e2e`
   (10–20 min under software WebGL). Never run e2e against `npm run dev`.
5. Look at the screenshots in `/tmp/e2e` with the Read tool: title,
   match, a Stage 3 creature. Note anything unreadable.
6. Stop the preview server.

## Report

| Check | Result |
|---|---|

Then a short list of regressions and anything **unverified** (real-GPU
frame rate, audio, gamepad are always unverified in a cloud container).
Update `game/TESTING.md` "Latest results" with the date and numbers.

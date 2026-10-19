# Greyborn — instructions for Claude

Greyborn is a 4v4 team game about evolution and territory, built by one
developer (the director, Marcé) with Claude. The playable game is in
`game/` (three.js + TypeScript + Vite). Read `audit/README.md` for the
current plan.

## Where things are

| Folder | What | Authority |
|---|---|---|
| `game/` | Playable build. **Code is the truth** for what exists | Highest for "what is built" |
| `audit/` | Current plan (Version B "Brood"), roadmap, risks | Highest for "what to build next" once approved |
| `spec/` + `spec/greyborn-tuning.xlsx` | Numbers | Source of every gameplay number |
| `gdd/`, `design-bible/` | World, lore, full design | Reference; **don't extend** without the director asking |
| `sim/` | Python balance simulator | Run after tuning changes |
| `docs/`, `prototype/` | Superseded early concept | Ignore |

## Rules

1. **Scope:** build Version B (`audit/GAME_DESIGN_DOCUMENT.md`). Anything
   in `gdd/` that isn't in Version B is deferred. Don't write new lore
   chapters unless asked.
2. **Sim purity:** `game/src/sim/` never imports from `render/`, `ui/`,
   `audio/` or touches the DOM. Bots and players act only through
   `Creature.intent`. Keep the step deterministic: use `w.rng`, never
   `Math.random()` in `sim/`.
3. **Numbers live in data:** gameplay numbers go in the tuning workbook →
   `npm run data` → `src/data/tuning.json`. No new magic numbers in code.
4. **Lineage code lives in `sim/lineages/`** (once the registry exists).
   Don't add new `lineage === '…'` checks elsewhere.
5. **Verify before claiming:** run `cd game && npm run typecheck && npm test`
   before saying something works. Say "unverified" for anything not run
   (real-GPU frame rate, audio, gamepad).
6. **Keep docs in step:** when behaviour changes, update `game/GAME_DESIGN.md`,
   `game/TASKS.md`, `game/KNOWN_ISSUES.md` and `game/CHANGELOG.md` in the
   same change.
7. **Assets:** record source and licence in `game/ASSETS.md` before
   committing any external or AI-generated asset.
8. **Safety:** no API keys in `game/` (it ships to browsers). Don't delete
   files, rewrite history, merge to `main`, deploy or sign up for services
   without the director's go-ahead. Work on a branch.
9. **The director prefers finished work over advice:** build it, test it,
   then report in a few lines. Plain language, no over-explaining.

## Commands

```bash
cd game
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm test             # unit + headless match + perf (~25 s)
npm run build
npm run data         # workbook → src/data/tuning.json
node tests/e2e/smoke.mjs http://localhost:4173 /tmp/e2e   # after build + preview
cd .. && python3 sim/run.py -n 200 --out /tmp/try.md   # balance simulator (needs openpyxl)
```

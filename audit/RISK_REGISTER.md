# Risk Register

Deliverable 11. Likelihood and impact: **L** low · **M** medium · **H** high.

| # | Type | Risk | Likelihood | Impact | Mitigation | Owner | Retired when |
|---|---|---|---|---|---|---|---|
| R1 | Design | The core loop (carry → return → convert) isn't fun for humans | M | **H** | Human playtests now (roadmap Stage 2a); D-08 contested conversion; Pokémon UNITE shows the shape can work | Director | ≥ 60% "would play again" across 20 tester matches |
| R2 | Production | Scope far beyond one part-time developer (spec assumes 17–40 people) | **H** | **H** | Version B; lore freeze (D-14); deferral list in `GAME_VERSIONS.md` | Director | Version B scope approved and held for 3 months |
| R3 | Market | Team PvP without a population dies (Concord, Supervive, Battlerite) | **H** | **H** | Bots-first (D-01); online only with bot backfill | Director | Single-player build stands on its own |
| R4 | Production | Work lost or hard to find: `main` empty, all on an unmerged branch | M | **H** | D-15: merge / set default, tag releases | Director | `main` contains v0.1.0 |
| R5 | Design | Snowballing: level gap 6.4 at 15:00 in sim, rising as progression speeds up | M | M | Bounties on carriers, Enemy Core regrowth, Hunt-phase TI ×2; watch in balance passes | Claude (`/balance-pass`) | Gap ≤ 6 at 10:00 in headless + human matches |
| R6 | Technical | Lineage code doesn't scale (24 name checks) | **H** | M | D-12 registry before new lineages | Claude | Registry merged, tests green |
| R7 | Technical | Real-GPU performance unknown | M | M | Manual run on your PC with the FPS overlay at Low/Medium/High; record in `PERFORMANCE.md` | Director | Numbers recorded on 2 machines |
| R8 | Technical | A* spikes (~14 ms) worsen with walls and a second map | M | M | Coarse-grid long paths; `recast-navigation` fallback | Claude | 99th-percentile tick < 8 ms in perf test |
| R9 | Art | No pipeline for rigged monster models; Mixamo is humanoid-only | **H** | M | Grey-box until fun; then Blender + AI image-to-3D drafts; budget in `asset-intake` skill | Director | One hero creature through the pipeline in-game |
| R10 | Licensing | AI-generated assets with attribution or unclear terms (Meshy free = CC BY 4.0) | M | M | `asset-intake` skill; `ASSETS.md` record before commit | Claude | Every asset has a licence row |
| R11 | Design | Foundation rules decoded from garbled AI mock-up pages | **H** | M | Treat all decoded rules as proposals; validate by playtest, not by text | Director | Each core rule playtested |
| R12 | Design | Readability at 7.5 m scale with 8 giants + wildlife + VFX | M | M | Silhouette and weak-point checks in screenshots; `design-check` readability test | Claude | Testers can name the enemy lineage at Stage 3 |
| R13 | Security | `innerHTML` with player text once names exist; client trust in online play | L now / H later | M | `textContent`; server validates intents; server-side fog of war | Claude | Before any online build |
| R14 | Cost | Paid services creep in (hosting, AI 3D credits, Claude API in CI) | M | L | Free tiers first; approval rule in `CLAUDE.md` | Director | — |
| R15 | Production | Competing commitments (teaching, other projects) stall progress | **H** | M | Small weekly milestones; roadmap tasks sized to one session each | Director | Steady cadence for 8 weeks |
| R16 | Licensing | Platform terms (e.g. Vercel Hobby non-commercial, Poki web exclusivity) | M | L | Check terms before monetising or choosing a portal | Director | Decision recorded |
| R17 | Technical | CI perf test flaky on slower GitHub runners | M | L | CI-specific threshold if it fails | Claude | CI green 10 runs in a row |
| R18 | Scope | AI makes writing docs so cheap that design keeps outrunning the build again | **H** | M | Rule: no new design doc without a playtest question it answers | Director + Claude | — |

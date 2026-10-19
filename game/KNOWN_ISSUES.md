# Known issues

| # | Issue | Severity | Status |
|---|---|---|---|
| 1 | **Not tested on a real GPU.** All rendering checks ran under software WebGL (SwiftShader) at ~10 fps; real frame rate is unknown. | High (unverified) | Needs a manual run on real hardware |
| 2 | **Audio not heard.** The headless test browser has no audio output; sound code runs without errors but levels and mix are unverified. | Medium (unverified) | Needs a manual listen |
| 3 | **Gamepad untested.** Mapping follows the standard layout; no device was available. | Medium (unverified) | Needs a device test |
| 4 | Only Titan and Brawler are playable; all bots use them too. | Scope | Milestone 2 |
| 5 | One Ultimate per lineage (Avalanche, Frenzy) instead of a choice of three per branch; no branch choice at L10. | Scope | Milestone 2 |
| 6 | No Synergies, Tension or global events yet. | Scope | Milestone 2 |
| 8 | Hub Defense is bought automatically by the team; players can't spend SAP. | Low | By design for now |
| 9 | Bots are simple: they don't coordinate pushes, peel for carriers, or use Bulwark well. | Medium | Ongoing |
| 10 | Creature models are code-built placeholders; animation is procedural (no skeletal rigs or IK). | Art | Planned art pipeline |
| 11 | Balance runs on **playtest overrides** (`src/data/playtest-overrides.json`: SAP 0.1/cell, EXP 60 + 15 × L, bounty 100 + 15 × level, Enemy Core reward 900, Base Heart 12,000), taken from `../sim/findings.md` and not yet signed off; the spec files still hold the original values. | Medium | Waiting on the director's sign-off |
| 12 | Every bot-only match so far ends on the time limit: bots don't coordinate Base Heart pushes (the simulator predicted this too). | Medium | Bot behaviour work in M2 |
| 13 | Online multiplayer isn't built; it's bots only. | Scope | Milestone 5 |

# Known issues

| # | Issue | Severity | Status |
|---|---|---|---|
| 1 | **Not tested on a real GPU.** All rendering checks ran under software WebGL (SwiftShader) at ~10 fps; real frame rate is unknown. | High (unverified) | Needs a manual run on real hardware |
| 2 | **Audio not heard.** The headless test browser has no audio output; sound code runs without errors but levels and mix are unverified. | Medium (unverified) | Needs a manual listen |
| 3 | **Gamepad untested.** Mapping follows the standard layout; no device was available. | Medium (unverified) | Needs a device test |
| 4 | Only Titan and Brawler are playable; all bots use them too. | Scope | Milestone 2 |
| 5 | One Ultimate per lineage (Avalanche, Frenzy) instead of a choice of three per branch; no branch choice at L10. | Scope | Milestone 2 |
| 6 | No Synergies, Tension or global events yet. | Scope | Milestone 2 |
| 7 | Time-limit ties end in a draw; the spec's overtime capture rule isn't implemented. | Low | Milestone 2 |
| 8 | Hub Defense is bought automatically by the team; players can't spend SAP. | Low | By design for now |
| 9 | Bots are simple: they don't coordinate pushes, peel for carriers, or use Bulwark well. | Medium | Ongoing |
| 10 | Creature models are code-built placeholders; animation is procedural (no skeletal rigs or IK). | Art | Planned art pipeline |
| 11 | Balance uses the spec's starting values; the simulator found that levelling is slow and SAP too high (`../sim/findings.md`). Only the awakening rule (A2) is adopted. | Medium | Waiting on the director's decisions |
| 12 | Camera can clip into large rocks (collision only checks the terrain). | Low | Open |
| 13 | Online multiplayer isn't built; it's bots only. | Scope | Milestone 5 |

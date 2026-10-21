# Known issues

| # | Issue | Severity | Status |
|---|---|---|---|
| 1 | **Not tested on a real GPU.** All rendering checks ran under software WebGL (SwiftShader) at ~10 fps; real frame rate is unknown. | High (unverified) | Needs a manual run on real hardware |
| 2 | **Audio not heard.** The headless test browser has no audio output; sound code runs without errors but levels and mix are unverified. | Medium (unverified) | Needs a manual listen |
| 3 | **Gamepad untested.** Mapping follows the standard layout; no device was available. | Medium (unverified) | Needs a device test |
| 4 | Four of the six launch lineages are playable (Version B); Thornrunner, Bonespire and Co-Stalk are deferred. | Scope | By design (Version B) |
| 5 | Two Ultimates per lineage (one per branch), not the full 3-of-6 choice from Spec 03. | Scope | By design (Version B) |
| 6 | No Tension or event deck; the Grey Migration is the only map event. Ground-targeted abilities can still be placed on the Migration road. | Scope | By design (Version B) |
| 9 | Bots are simple: they don't peel for carriers or use Bulwark well. Hard bots set up Synergies only in simple cases. | Medium | Ongoing |
| 10 | Creature models are code-built placeholders; animation is procedural (no skeletal rigs or IK). | Art | Planned art pipeline |
| 11 | Verdant and Hollow are untuned beyond the spec's numbers; no real-player balance data for the four-lineage roster. | Medium | Balance pass after playtests |
| 12 | Most bot-only matches still end on the time limit; Hard bots group for Base Heart pushes but rarely finish them. | Medium | Bot behaviour work |
| 13 | Online multiplayer isn't built; it's bots only. | Scope | Milestone 5 |
| 14 | First Life is a script on top of a normal match world: wildlife can still attack you, and the other Ascendants stand at their bases until it ends. | Low | Acceptable for now |
| 15 | Hollow's void bolt is instant (no 30 m/s projectile travel); Bramble Walls block it. | Low | Revisit with real playtests |
| 16 | The Python simulator (`../sim/`) still models the pre-Version B rules (25-minute match, SAP, six lineages, Synergy tracks), so its report scores the old targets (5 of 23 met on 2026-10-21). Use the headless game matches (`npm test`) for Version B until the simulator is updated. | Medium | Simulator update needed |

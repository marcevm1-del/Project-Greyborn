# Greyborn — M0 Prototype

A single-file browser prototype of the core loop from
[03 — Core Gameplay](../docs/03-core-gameplay.md). It answers one question,
the **M0 gate** from the [roadmap](../docs/08-production-roadmap.md):

> Is "spend it now, bank it, or let it go" an interesting decision?

## Run it

Open `prototype/index.html` in any modern browser. There is no build step
and nothing to install. Keyboard is the main input, and touch buttons appear
automatically on phones and tablets.

## What's in this build

| System | Status |
|---|---|
| Base kit (3-hit blade, dodge with i-frames, 150 ms parry, Mend) | ✅ |
| Flare meter → flared stagger → **Rip** → Wisp → Vessel | ✅ |
| 1 Vessel; ripping a new Hue forces the old one out | ✅ |
| **Crimson**: Kindle (burning lunge, fire ground), flame-dash, exploding parry | ✅ |
| **Azure**: Undertow (pulling wave), water-slide, tide-shield parry | ✅ |
| Saturation (fades and is spent) | ✅ |
| Stain: Tinge / Mark / Brand / Overcolour → Husked | ✅ |
| Vices: Crimson Wrath (no dodge after attacking), Azure Despair (−20% speed, −30% damage taken) | ✅ |
| Residue: permanent points, Stain floor, passive bonus, visible on the body | ✅ |
| Lantern rest, death, Dross shade recovery | ✅ |
| Enemies: Cinder Hound (▲), Drowned Knight (◆, frontal guard), Bleached Warden (○, unparryable, can't be ripped) | ✅ |
| Escalating levels every 5 kills | ✅ |
| Glyph-coded attack tells (accessibility rule from [07](../docs/07-art-and-audio.md)) | ✅ |
| Playtest log (rips, releases, fades, Residue, deaths) | ✅ |
| 2nd Vessel, Blends, Clash, skill tree, relics, audio | ❌ planned for M1 |

## Tuning (the `T` object at the top of the script)

| Value | Prototype | Design doc | Note |
|---|---|---|---|
| Stain while holding | +0.6 / s | +0.5 / s | Slightly faster so the decision shows up in a 5-minute session |
| Stain per Hue Art | +4 | +4 | |
| Stain per hit taken | +3 | +3 | |
| Stain drain after release | −5 / s | −5 / s | |
| Saturation fade | −1 / s | −1 / s | |
| Hue Art cost | 25 | 15–40 | Single value for now |
| Parry window | 150 ms | 150 ms | |

### Balance finding #1 (automated)

`tools/greedy-bot.mjs` plays like a greedy player: it never releases a Hue and
spends every Art it can.

| Run | Stain hold / Art | Result after ~55 s |
|---|---|---|
| A | +1.0 / s, +5 | Peak Stain 100 → Overcolour → **Husked**, 3 Residue |
| B (current) | +0.6 / s, +4 | Peak Stain 85 → Brand, **1 Residue**, survived |

With run A's values, greed was punished within a minute, which makes Stain
read as a trap rather than a temptation (pillar 1). Run B's values let greed
pay off for a while and then cost a permanent point. **Next:** human
playtests to see if players release a Hue voluntarily.

## Playtest script (for human testers, 10 minutes)

1. Play freely for 5 minutes. Don't explain Stain.
2. Ask: *"What happens if you hold a colour for a long time?"* (target: they can explain it)
3. Ask: *"Did you ever drop a colour on purpose? Why?"*
4. Record the Playtest log numbers. **Gate:** at least half of testers have Voluntary releases ≥ 1.
5. Ask which Hue they preferred and why: is Azure's defensive kit competitive with Crimson's?

## Automated playtest hook

The page exposes a read-only `window.greyborn` object (`player`, `enemies`,
`metrics`, `T`, `mode`) for scripted playtests. Run the bot with
`npm i playwright && node prototype/tools/greedy-bot.mjs 60`.

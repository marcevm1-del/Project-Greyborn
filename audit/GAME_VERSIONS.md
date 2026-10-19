# Three Versions of Greyborn

Deliverable 6. Each version keeps the identity in `PROJECT_AUDIT.md` §3.4.
Effort is relative to what already exists in `game/` (v0.1.0).

**[Assumption]** One developer, part-time (~8–12 hours a week), working
with Claude Code, near-zero budget, web-first. Time ranges below rest on
that assumption and on the pace seen so far (the M1 slice took about two
days of AI-assisted work, but human playtesting, art and tuning take much
longer than code). Treat them as orders of magnitude, not schedules.

---

## Version A — "Greyborn: Skirmish" (simplified and buildable)

**The pitch:** the current build, finished and polished as a short,
complete browser game against bots.

| Element | Version A |
|---|---|
| Players | You + 1 bot ally vs 2 bots (2v2), or 4v4 with bots |
| Lineages | Titan + Brawler only (already built) |
| Forms | Base Form → Stage 1 → 2 → 3 (built) |
| Choices | None in-match beyond lineage pick |
| Ultimates | 1 per lineage (built) |
| Synergy | Smash & Roll only, one rule: both partners Stage 2+, within 12 m, 25 s cooldown |
| Map | Ashfall Crossing (built), optionally a smaller 2v2 cut |
| Objectives | Hubs, Enemy Cores, Base Heart, TI (built) |
| Economy | Cores + EXP only. SAP, Tension, events **removed** |
| Match length | 10–12 minutes |
| Bots | Easy / Normal / Hard (aim error, reaction time, return discipline) |
| Online | None |
| Art | Current procedural style, polished (better silhouettes, proper icons) |
| Onboarding | 3-minute guided first life |
| Release | itch.io and/or a web portal |

- **Quick to do:** remove SAP/Tension paths, bot difficulty, Smash & Roll,
  tutorial overlay, icon art, short-match tuning.
- **Deferred:** everything else.
- **Feels complete?** Yes, as a small game: two creatures, one map,
  complete matches, clear win/loss, a reason to replay (difficulty, sides).
- **Weakness:** two lineages give little variety; replay value is limited.

---

## Version B — "Greyborn: Brood" (recommended)

**The pitch:** the smallest version that delivers *all four pillars*,
including pair interdependence and territory identity, while staying
playable alone.

| Element | Version B |
|---|---|
| Players | 4v4; any seat can be a bot. Single-player first; online later with bot backfill |
| Lineages | **4**: Commit pair (Titan, Brawler) + Root & Void pair (Verdant, Hollow) |
| Forms & levels | Unchanged from the build: Base Form (L1–2) → Stage 1 (L3) → Stage 2 (L10) → Stage 3 (L20). The faster "short match" curve becomes the standard |
| Choices | Branch at L10 (Aggression / Tactical Control): the spec's L10 branch upgrade. Ultimate at L20: **one per branch** (2 per lineage, 8 total) |
| Synergy | One Synergy per pair, unlocked when both partners are Stage 2+ and within 15 m; fixed cooldown; **no Synergy XP track, no phase matrix** |
| Map | Ashfall Crossing at launch; Breathing Canopy second (it favours the Root & Void pair) |
| Objectives | Nodes and TI, 5 Hubs (Defense rises with time held), 3 Enemy Cores per side, Base Heart |
| Economy | Cores → EXP. **SAP removed** (Hub Defense grows automatically while held; the build already spends SAP automatically for the team, so players never see it as a choice). **Tension removed**; replaced by **one scheduled map event** (Ashfall: the Grey Migration at 6:00) |
| Carry risk | Kept and sharpened: Hub field-conversion is a **contested channel** (longer with more cores, faster with allies present) |
| Match length | 12–15 minutes; final 2 minutes = "Hunt": TI gains doubled |
| Wildlife | The 7 built species + 3 more for the second map. Static camps with clear behaviours; no live food web |
| Sides | Wildborn / Blightborn as skins only (built) |
| Online | M-Online: 2v2 then 4v4 rooms with bot backfill (Colyseus, see `TECH_STACK.md`) |
| Art | Grey-box until playtests pass; then hero creatures modelled (Blender + AI image-to-3D for props) |
| Onboarding | 3-minute first life + tooltips on first Stage-up and first return |
| Not in B | Thornrunner, Bonespire, Stillheart, cross-resonance, Tension, patron decks, seasons, War Map, Memories, Collection, ranked |

**Why B is the best starting point**

1. It is the **smallest scope that still tests the core claim** of the GDD,
   "Interdependency over individuals", because it has two real pairs and a
   Synergy that actually fires (the spec's Synergy never fires in simulation).
2. The **Root & Void pair** carries the territory identity that separates
   Greyborn from MOBAs; the Hunt pair needs stealth/reveal systems that are
   costly and hard to read, so it waits.
3. It **removes two of four economy meters** (SAP, Tension) that the
   simulator showed were broken, rather than tuning them.
4. It **works with zero online players** and becomes multiplayer later
   without rewriting, because the sim is already deterministic and
   intent-driven.
5. Its content list (4 lineages × 4 forms × 2 sides; 8 Ultimates; 2 maps)
   is in reach of one developer with AI help.

---

## Version C — "Greyborn: Answering War" (expanded)

**The pitch:** close to the full GDD, as a live online game.

| Element | Version C |
|---|---|
| Lineages | 6 at launch + Stillheart; 6 Ultimate Forms per lineage (42) |
| Synergies | Pair Synergies with levels; cross-resonance for the other 12 pairings |
| Maps | 3 at launch, up to 13; each with its own living event |
| World | Live ecology (predators, herds, overhunting), Tension + global events, patron decks, Clamor Landfall third force, Wild Ascendants |
| Modes | Ranked, Brood Skirmish 2v2, Apex Hunt, Truce co-op, training, custom |
| Live service | Seasons, War Map by community goals, Memories, Collection, events |
| Online | Dedicated servers, matchmaking, accounts, anti-cheat, replays, spectating |

Additions that **would** create meaningful gameplay, if the population
existed: Hunt pair (picks and weak-point focus), dynamic map events
(Fevermouth eruptions, Shard Reef tides), ranked play, a co-op PvE mode
against the Clamor (also the best answer to low PvP population).

Additions that **would not justify their cost** even in C: cross-resonance
passives (12 small, hard-to-read buffs), the Synergy XP track, the full
live food web, 70 Memories.

---

## Comparison

| | A: Skirmish | B: Brood | C: Answering War |
|---|---|---|---|
| Implementation difficulty | Low | Medium–High | Very high |
| New content | ~1 tutorial, 3 bot levels, 1 Synergy | 2 lineages, 6 Ultimates, 2 Synergies, 1 map, 3 creatures, branch UI | 5 lineages, 40 Ultimates, 10+ maps, 47 creatures, modes, seasons |
| Dependencies | None new | Lineage registry refactor; branch UI; map 2 pipeline | Netcode, backend, accounts, art team |
| Testing burden | Low | Medium (two pairs × two sides × two branches) | Very high (combinatorial balance, live ops) |
| Performance risk | Low | Medium (more VFX, second map) | High (8 large creatures + live wildlife + online) |
| Online required | No | Optional (later) | Yes |
| Rough effort under the assumption | 1–3 months | 6–12 months to single-player 1.0; +3–6 months for online | Multi-year; needs a funded team (`spec/06` suggests 17–40 people) |
| Risk of never finishing | Low | Medium | Very high |

**Recommendation:** build **B**, but **pass through A on the way**: A's
items (difficulty, Smash & Roll, tutorial, short matches) are all part of B,
so shipping A as a public playtest build costs nothing extra and gets real
players in front of the game months earlier.

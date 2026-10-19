# Greyborn: Brood — Revised Game Design Document (v0.2 proposal)

Deliverable 7. An implementation-ready specification of **Version B**
(`GAME_VERSIONS.md`). It **does not replace** `gdd/`, `spec/` or
`design-bible/`; it selects from them and states exactly what is in scope.
Where this file is silent, `spec/` values apply. Every change from the
current design is listed in `CHANGELOG_DESIGN.md` with its reason.

Status: **approved by the director on 2026-10-19.** This is the plan being built. At the time of the audit nothing in `gdd/`,
`spec/` or the code has been changed by this audit.

---

## 1. One-paragraph pitch

You bud from a root-knot as a small grey Kith. With three broodmates
(people or bots), you hunt, carry evolution cores home and grow, through
three Stages, into a 7.5-metre Ascendant, while your team roots the land,
holds Resource Hubs and finally breaks the enemy's Base Heart. Every core
you carry is progress you haven't banked: the heavier you are, the louder
you are, and the more you lose when you fall. Twelve to fifteen minutes,
4v4, playable alone against bots from the first day.

## 2. Pillars (unchanged)

1. **Growth you can see.** 2. **Risk you carry.** 3. **Land is power.**
4. **Read the body.** Interdependence is expressed through pairs (§6).

## 3. Platform, camera and controls

| | |
|---|---|
| Platform | Desktop web browser (WebGL 2), keyboard + mouse or gamepad. Mobile later, not designed for |
| Camera | Third-person orbit; distance by form 5 / 7 / 10 / 15 m (built) |
| Controls | As built (`game/GAME_DESIGN.md`): WASD, mouse, Q/E/R, T Ultimate, Space evade, hold F root/convert |

## 4. Match structure

| Item | Value |
|---|---|
| Teams | 4v4. Each seat is a human or a bot. Default: 1 human + 7 bots |
| Sides | Wildborn vs Blightborn, assigned per match, identical rules (skins only) |
| Draft | Pick one of 4 lineages; **no duplicates within a team** |
| Length | 12:30 regulation (the build's "short match") + up to 1:00 overtime |
| Phases | Built names and the short-match timing: 1 Stable Flow 0:00–2:30 · 2 Pre-Aggro Resource Control 2:30–5:00 · 3 Resource Stage 5:00–8:00 · 4 Hunt 8:00–12:30 |
| Phase effects | Wildlife value ×1 / 1.15 / 1.3 / 1.45 (built). **P4 Hunt: Territorial Influence gains ×2** |
| Map event | One scheduled per map. Ashfall Crossing: the **Grey Migration** at 6:00 (herd crosses the centre road; killing herd animals pays cores but the herd tramples) |
| Win | (1) Destroy the enemy Base Heart, (2) mercy: hold ≥ 80% TI for 60 s, (3) higher TI at time limit; tie → overtime, first capture wins (built) |
| Respawn | As built (Spec 05 §9) |

## 5. Evolution

| Item | Rule |
|---|---|
| Levels | 1–20; EXP curve **60 + 15 × L** per level (playtest override, now the rule), ×2 in the 12:30 match |
| Forms | Base Form L1–2 · Stage 1 L3 (lineage awakens) · Stage 2 L10 (branch choice) · Stage 3 L20 (Ultimate) |
| Awakening rule | Until L3, cores become EXP when picked up (built) |
| Cores | Earned from wildlife, kills (bounty **100 + 15 × victim level**), Enemy Cores (**900**, regrown: 450) |
| Carry | Cap 450. Carried cores drop on death (30 s). Louder at 100 / 200 / 300 carried (sound signature tiers) |
| Home conversion | Hold F at base: 15 / 12 / 9 s by Hubs held (0–1 / 2 / 3+). +10% per full 100 carried, max +30% |
| **Field conversion (changed)** | Hold F at a held Hub: 70% efficiency. Channel = **6 s + 1 s per 50 cores**, **−25% per extra ally inside the Hub ring** (max −50%). Taking damage pauses it. This is the contested moment (see `COMPETITOR_RESEARCH.md`, Pokémon UNITE) |
| Branch (L10) | Choose **Aggression** or **Tactical Control**. Grants that branch's L10 upgrade from `spec/02` and fixes which Ultimate you get |

## 6. Lineages (4)

Kits are `spec/02` unless noted. Ultimates are `spec/03`.

| Lineage | Pair | Role | Q / E / R | Aggression Ultimate | Tactical Ultimate | Weak point |
|---|---|---|---|---|---|---|
| **Titan** | Commit | Frontline | Quake Slam / Bulwark / Rampart Charge | **Avalanche** (built) | **Fortress** | Crystal spine (back) |
| **Brawler** | Commit | Diver | Roll Commit / Haymaker / Grapple | **Frenzy** (built) | **Shove of the Storm** | Chest plate (during roll recovery) |
| **Verdant** | Root & Void | Territory / sustain | Bramble Wall / **Sap Draw (changed: heals 3% max Health/s for 4 s to allies in 8 m, 16 s cooldown, no SAP cost)** / Entangle | **Thornstorm** | **Overgrowth** (capped at 4 nodes, per `spec/03` balance flag) | Bloom pod (shoulder) |
| **Hollow** | Root & Void | Zone denial | Void Rift / Hollow Step / Null Pulse | **Collapse** | **Event Horizon** | Core cavity (front) |

Passives as in `spec/02` (e.g. Verdant **Deep Root**: roots 2× faster).

## 7. Pair Synergies (changed)

| Rule | Value |
|---|---|
| Unlock | Both partners alive, **Stage 2+**, within **15 m** |
| Tracks | **None.** No Synergy XP, no S1–S3 tiers, no phase access matrix |
| Cooldown | Fixed per Synergy (below), shared by the pair |
| HUD | A pair icon lights when the Synergy is ready and the partner is in range |

| Synergy | Pair | Trigger | Effect | Cooldown |
|---|---|---|---|---|
| **Smash & Roll** | Titan + Brawler | Quake Slam staggers a target; Brawler starts Roll Commit within 1.5 s | Target airborne 1 s, +40% damage from both; both gain Momentum. If the Brawler doesn't follow up, Slam's cooldown +50% for that cast | 20 s |
| **Void Garden** | Verdant + Hollow | Void Rift on Verdant-rooted ground, or Verdant roots inside a Rift | 8 m field, 6 s: enemies −50% Control and can't capture; allied nodes inside can't be uprooted; neutral/Vulnerable nodes inside captured 50% faster | 20 s |

## 8. Territory and structures

| Item | Rule |
|---|---|
| Grid | 240 cells grouped into nodes (built) |
| Root / uproot | Hold F: 4 s (Verdant 2 s); contested channels as built |
| Territorial Growth | Every 20 s, rooted nodes spread one cell (built) |
| TI | cells held / total + 3 points per Hub held, max 100% (built) |
| **Hub Defense (changed)** | Rises **one level per 45 s held**, max 10 (replaces SAP purchases); drops to 0 on capture |
| Hubs | 5 per map; Health 6,000 + 400 / level; allies near own Hub take −5% damage per level |
| Enemy Cores | 3 per side; 5,000 Health; regrow after 240 s; each lost slows that side's home conversion one tier (floor 18 s) |
| Base Heart | **12,000 Health** (playtest override, now the rule); attackable once all of that side's Enemy Cores are down, or by anyone in Phase 4 (built rule, `World.heartOpen`) |

**Removed from scope:** SAP, Tension, global event deck, patron decks.

## 9. Wildlife

The 7 built species and temperaments stay (Gravel Skinks, Spurlarks,
Glimmerfoxes, Ashfang packs, Mossback Grazers, Clashhorn Beetles, Stonehide
Oxen). The Breathing Canopy map adds 3 species from `spec/04`. Wildlife
uses static camps with readable behaviour; the live food web, overhunting
and migrations other than the scheduled map event are deferred.

## 10. Bots

| Difficulty | Reaction time | Aim error | Return discipline | Coordination |
|---|---|---|---|---|
| Easy | 0.6 s | ±25° | Returns at 120–200 cores | None |
| Normal | 0.35 s | ±12° | 180–340 (built) | Joins nearby fights |
| Hard | 0.2 s | ±5° | Returns before entering a losing fight | Uses Synergies; groups for Base Heart pushes after both Enemy Cores fall |

Bots act only through `intent`, like players (built rule).

## 11. Maps

| Map | Status | Notes |
|---|---|---|
| Ashfall Crossing | Built | Launch map |
| Breathing Canopy | Version B content | Favours Verdant/Hollow (`gdd/16`). Canopy "breath" every 90 s narrows sightlines; it is the map's one event |
| Others | Deferred | `design-bible/09-10` |

## 12. Onboarding (changed)

**First Life (≈3 minutes, skippable).** A scripted solo start on Ashfall
Crossing: move → eat three skinks → awaken at L3 → root a node → pick up
cores from a fallen Ashfang → walk home and convert → watch your body grow.
Then the full match starts with bots on Easy. Tooltips appear once on the
first Stage-up, first death with cores, first Hub conversion and first
Synergy. The 35-minute "First Budding" (`gdd/25`) is deferred.

## 13. UI changes

Ability icons drawn as simple SVG glyphs (no Unicode symbols); pair
Synergy indicator; carried cores shown on the HUD *and* as a glow on the
creature; difficulty selector on the lineage screen.

## 14. Audio, art and story

- Art and audio direction: unchanged (`gdd/23`, `gdd/19`). Grey-box until
  the playtest gates in `DEVELOPMENT_ROADMAP.md` pass.
- Story: the world, sides and Kith stay as written. **No new lore** is
  needed for Version B. The in-game story is the title screen line, the
  side names and the end-of-match vignette (roots flood or glass glazes the
  losing base).

## 15. Success targets (to be measured)

| Target | Value | How measured |
|---|---|---|
| A new player finishes a match | ≥ 80% of first-time testers | Playtest form |
| "Would play again" | ≥ 60% | Playtest form |
| First Stage 2 | 4:00–5:30 | Sim + headless matches |
| First L20 | 9:00–11:00 | Sim + headless matches |
| Matches ending at the Base Heart or mercy | ≥ 30% (Normal bots) | Headless matches |
| First Synergy | before 7:00 in ≥ 80% of matches | Headless matches |
| Frame rate | 60 fps at High on a mid-range desktop GPU | Manual GPU log |

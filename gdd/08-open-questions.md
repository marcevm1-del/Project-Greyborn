# 08 — Open Questions & Decisions Log

## Decisions needed from the director

Where the source pages are garbled or silent, the docs make a **proposal**.
Please confirm or override:

| # | Question | Current proposal | Where |
|---|---|---|---|
| 1 | Conversion times: **15/12/9 s** (pp. 120–122) or **18/15/12 s** (p. 123)? | 15/12/9, set by Hubs held | [03](03-evolution-system.md#returning-to-base-conversion) |
| 2 | What do the Synergy Access Matrix rows (S1–S4) mean? | Match phases; cells are cooldowns; "–" means locked | [04](04-synergies.md#synergy-access-by-match-phase) |
| 3 | Phase 4's label ("Thornrunna and Bonstruction") | "Hunt" phase | [06](06-match-flow.md) |
| 4 | What do the S1/S2/S3 values for weak points mean? | Regrowth time by the victim's Stage | [04](04-synergies.md#weak-points) |
| 5 | What is the Base Form species called in-world? | "Base Form" for now | [02](02-ascendant-roster.md) |
| 15 | The planet has **other naturally occurring creatures**. Should some appear on the map as neutral wildlife, e.g. small camps that drop a few evolution cores, or Base Forms that wander in from the wild? | Not designed yet. It would add a fourth, low-risk core source and make the world feel alive | [03](03-evolution-system.md), [05](05-territory-and-economy.md) |
| 6 | Synergy level vs. Ascendant level | Two separate tracks (pair 1–10, player 1–20) | [04](04-synergies.md) |
| 7 | The other 12 lineage pairings | Minor cross-resonance passives only | [04](04-synergies.md#open-the-other-12-pairings) |
| 8 | Win condition | Base Heart, TI at 25:00, or 80% TI mercy rule | [06](06-match-flow.md#win-conditions-proposal) |
| 9 | Duplicate lineages per team? | Not allowed | [06](06-match-flow.md) |
| 10 | Is "Vaelmoor" the studio, or a region/continent of Greyborn? | Unknown | [00](00-source-pages.md) |
| 11 | "18 months … Dost-Tamur" on p. 121 | Unknown: production timeline or place name? | [00](00-source-pages.md) |
| 12 | Camera, platform and input | 3D third-person, PC first (assumed from the wireframe art) | [01](01-vision.md) |
| 13 | Roster size at launch: 6, or more beyond what's shown? | 6 | [02](02-ascendant-roster.md) |
| 14 | The "4v4" panels show a **world-map heat map**. Is there a planet-wide layer where match results change territory across Greyborn (a seasonal war map)? | Not designed yet. It would fit "Dominate the map" at planet scale | [05](05-territory-and-economy.md) |

## Decided

| Date | Decision |
|---|---|
| 2026-10-02 | **Greyborn is the planet.** The game's world is named after it; it is not the name of the humanoid Base Form. |
| 2026-10-02 | **Base Forms are native creatures of Greyborn**, occurring naturally like the planet's other wildlife. Ascendant lineages are their natural evolutionary paths. |

## Design risks to watch

1. **Snowballing.** Kills give cores, and cores make you stronger. Mitigations
   already in the design: high bounties on players who are carrying, Enemy
   Core regrowth, Phase 3 synergy throttling, the TI time-limit. Needs simulation.
2. **The return trip feels like dead time.** If walking home is boring, nobody
   does it at the right moment. Field conversion and short paths from Hubs to
   base should keep trips under 20 s.
3. **Two progression tracks per pair can confuse new players.** The HUD needs
   to show the pair's Synergy level and the next unlock very clearly.
4. **Phase 4 S3-only rule** could leave a team with no Synergies at all in the
   endgame. Consider letting S2 fire at 20 s instead of locking it.

## Iteration log

| Version | Date | Change |
|---|---|---|
| gdd-0.1 | 2026-10-02 | Rebuilt from GDD v1.0 pp. 120–124: transcription and decoding, vision, roster, evolution, synergies, territory and economy, match flow, tactical notes. Replaces the placeholder single-player concept in `docs/` and `prototype/`, which was invented before the source pages were shared. |
| gdd-0.2 | 2026-10-02 | Greyborn confirmed as the planet. Removed the assumption that the humanoid Base Form is "the Greyborn"; added an open question about a planet-wide territory layer. |
| gdd-0.3 | 2026-10-02 | Base Forms confirmed as native wildlife of Greyborn; lineages framed as natural evolutionary paths. Added an open question on neutral wildlife on the map. |

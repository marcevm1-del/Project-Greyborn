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
| 6 | Synergy level vs. Ascendant level | Two separate tracks (pair 1–10, player 1–20) | [04](04-synergies.md) |
| 7 | The other 12 lineage pairings | Minor cross-resonance passives only | [04](04-synergies.md#open-the-other-12-pairings) |
| 8 | Win condition | Base Heart, TI at 25:00, or 80% TI mercy rule | [06](06-match-flow.md#win-conditions-proposal) |
| 9 | Duplicate lineages per team? | Not allowed | [06](06-match-flow.md) |
| 10 | Is "Vaelmoor" the studio, or a region/continent of Greyborn? | Unknown | [00](00-source-pages.md) |
| 11 | "18 months … Dost-Tamur" on p. 121 | Unknown: production timeline or place name? | [00](00-source-pages.md) |
| 12 | Camera, platform and input | 3D third-person, PC first (assumed from the wireframe art) | [01](01-vision.md) |
| 13 | Roster size at launch: 6, or more beyond what's shown? | 6 | [02](02-ascendant-roster.md) |
| 14 | The "4v4" panels show a **world-map heat map**. Is there a planet-wide layer where match results change territory across Greyborn (a seasonal war map)? Now that sides are assigned per match, it could track **planet vs. Murmur** across all matches | Not designed yet | [05](05-territory-and-economy.md) |
| 15 | Wildlife roster: which of the 40 proposed creatures to keep, cut or rework? Should Titan and Brawler get more affinity creatures? | 40 proposed | [09](09-wildlife.md) |
| 17 | Blightborn look: black glassy crystal with a starlit cyan-violet glow. Does that fit your vision? | Proposed | [10](10-world.md#the-two-sides) |
| 18 | How small are the "small mechanical differences" between sides? Currently only infect vs. rally and the patron decks, both mirrored | Proposed | [10](10-world.md), [09](09-wildlife.md#infection-and-rallying) |
| 19 | Does the war have an end state (lore or seasonal)? Can the Murmur ever win, or can the planet purge it? | Open | [10](10-world.md#timeline) |
| 20 | What are the Base Form species called on Greyborn? Their proposed life cycle (budding from birth-nodes, broods, Strays) is in 12 | Open | [12](12-life-on-greyborn.md) |
| 21 | Launch maps: Ashfall Crossing, The Elder Ribs, Breathing Canopy. Are three the right number, and these the right regions? | Proposed | [11](11-atlas.md#proposed-launch-match-maps) |
| 22 | Should weather and time of day vary per match, or be fixed per map? | Varies per match (visibility and sound only) | [12](12-life-on-greyborn.md#weather-and-time-of-day) |
| 23 | The Sleeper (Rimewastes) and the Murmur's possible loneliness are left as mysteries. Do you want either developed into a story thread? | Unresolved on purpose | [11](11-atlas.md), [12](12-life-on-greyborn.md#how-the-murmur-thinks) |

## Decided

| Date | Decision |
|---|---|
| 2026-10-02 | **Greyborn is the planet.** The game's world is named after it; it is not the name of the humanoid Base Form. |
| 2026-10-02 | **Base Forms are native creatures of Greyborn**, occurring naturally like the planet's other wildlife. Ascendant lineages are their natural evolutionary paths. |
| 2026-10-02 | **World:** primal nature fantasy. The planet is alive and aware. Only creatures, no cultures. |
| 2026-10-02 | **The war:** a meteorite carrying a **hive-mind disease** struck Greyborn. One team is **nature's response**, the other the **infected**. |
| 2026-10-02 | **Mirror rosters** (infected forms of the same six lineages). Sides **assigned per match**. Blight replaces roots, wildlife can be infected, crater zones on maps, nature fights back. |
| 2026-10-02 | **Names approved:** Starwound (meteorite), the Murmur (hive mind), Wildborn / Blightborn (sides), Heartwood (grove). |
| 2026-10-02 | **Neutral wildlife is in.** Body plans: four-legged, two-legged, six-legged, eight-legged and insects; 20–50 types, with contrasting creatures. |

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
| gdd-0.4 | 2026-10-02 | New chapter **09 — Wildlife**: 40 creatures across 5 body-plan groups, 4 threat tiers, lineage affinities, an income cap, 6 proposed biomes. |
| gdd-0.5 | 2026-10-02 | New chapter **10 — The World**: living planet, the Starwound meteorite, the Murmur hive mind, Wildborn vs. Blightborn, lineages as the planet's six answers, timeline, tone. Patron event decks (comeback mechanic), Roots vs. Blight, crater and Heartwood zones, wildlife infection and rallying. |
| gdd-0.6 | 2026-10-02 | Names approved. New chapters **11 — Atlas** (the Greyreach, 12 regions on an infection gradient, launch maps) and **12 — Life on Greyborn** (Base Form life cycle, flora, weather, Murmur biology and Blight stages). |

# Changelog

## 0.2.0 — Version B "Greyborn: Brood" (2026-10-21, branch `claude/vigilant-franklin-rjy3mj`)

The 16 audit proposals (D-01 to D-16) approved on 2026-10-19 and built.

- **Roster:** Verdant and Hollow join Titan and Brawler; each team fields both pairs. Lineage code lives in a registry (`src/sim/lineages/`).
- **Branches and Ultimates:** choose Aggression or Tactical at Level 10 (keys 1 / 2); each branch has its own stats and Ultimate (Avalanche / Fortress, Frenzy / Shove of the Storm, Thornstorm / Overgrowth, Collapse / Event Horizon).
- **Synergies without tracks:** Smash & Roll and Void Garden fire when both partners are Stage 2+ and within 15 m; 20 s cooldown per pair.
- **No SAP:** Hub Defense rises one level per 45 s held.
- **12:30 standard match** ending in the Hunt (territory ×2, Base Hearts open).
- **Contested field conversion** (6 s + 1 s per 50 cores, faster with allies, pauses on damage).
- **Former playtest overrides are now the rules** (in the workbook); `playtest-overrides.json` removed.
- **Grey Migration** at 6:00: the centre road is deadly for 60 s, the Ash Knoll becomes an island.
- **Bot difficulty** Easy / Normal / Hard, chosen on the lineage screen.
- **First Life**: a skippable three-minute tutorial, then a match against Easy bots; one-time tips.
- **UI:** branch prompt, pair Synergy indicator, SVG ability icons, carried cores glow above your creature.

## 0.1.0 — Milestone 1 vertical slice (2026-10-03)

First playable build.

- 4v4 match on Ashfall Crossing: you and 3 bot allies against 4 bots.
- Titan and Brawler, each with basic attack, Q/E/R, passive, weak point and one Ultimate.
- Kith Base Form → Stage 1 → Stage 2 → Stage 3 transformations with growth animation.
- Evolution cores: carry, drop on death, pick up, convert at base (C1–C3) or field-convert at a Hub (70%), aggression bonus, carry cap.
- Territory: 240 cells in nodes; root, uproot, Hubs with Defense levels, Territorial Growth, Territorial Influence, SAP.
- Structures: 5 Hubs, 6 Enemy Cores (with regrowth), 2 Base Hearts.
- Wildlife: Gravel Skinks, Spurlarks, Glimmerfoxes, Ashfang packs, Mossback Grazers, Clashhorn Beetles, Stonehide Oxen.
- Phases 1–4, Base Heart / mercy / time-limit wins; short match option.
- Procedural 3D art, VFX and synthesised spatial audio.
- HUD, minimap, menus, settings with rebinding and accessibility options, local profile.
- Awakening rule: until Level 3, cores become EXP when picked up (`../sim/findings.md` A2).

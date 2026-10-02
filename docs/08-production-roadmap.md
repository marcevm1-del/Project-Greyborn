# 08 — Production & Roadmap

## Recommended tech

| Area | Recommendation | Why |
|---|---|---|
| Engine | **Godot 4** (GDScript, C# for hot paths if needed) | Strong 2D tooling, free, small-team friendly, good console porting partners |
| Alternative | Unity 2D (URP) | If the team has existing Unity expertise |
| Animation | Hand-drawn frames (Aseprite / Krita) → sprite sheets; Spine only for large bosses | Matches the hand-drawn style |
| Data | Hues, abilities, enemies and relics defined as data resources (`.tres`/JSON) | Designers tune balance without code changes |
| Version control | Git + Git LFS for art/audio | |

## Core systems list (engineering scope)

1. Player controller (movement, jump, dodge, parry, buffers, coyote time)
2. Combat framework (hitboxes, hitstop, damage, stagger, Flare meter)
3. **Hue system** (Vessels, Saturation, Hue-modified moves, Blends, Clash)
4. **Stain / Residue system** (meters, thresholds, Vices, floors, persistence)
5. Enemy AI (state machines + tell scheduling with fairness budgets)
6. Boss framework (phases, Flare-on-transition, arena events)
7. World/map (rooms, transitions, map reveal, restored-state variants per room)
8. Save system (Lantern saves, world-state flags, Residue, endings)
9. UI (HUD, journal menus, Assist menu, colour-blind modes, glyph overlays)
10. Audio (adaptive music layers per Hue, Stain heartbeat)

## Milestones

### M0 — Paper & Greybox prototype (6 weeks)
- Player controller + base kit; 2 enemy types; Flare/Rip; **1 Hue** (Crimson) with Saturation & Stain.
- Greybox test room.
- **Gate:** is "spend vs. bank vs. release" an interesting decision? If not, iterate on Stain numbers before anything else.

### M1 — Systems prototype (10 weeks)
- All 6 Hues (programmer art); 2 Vessels; Blends; Clash; Residue.
- 1 boss (Unbanked Ember) in greybox.
- **Gate:** playtesters (n ≥ 10) can describe the Hue/Stain loop unprompted; ≥ 50% voluntarily release a Hue at least once.

### M2 — Vertical slice (16 weeks)
- Ashfall Orphanage + Kilnworks at final art quality, Lanternwick (partial),
  Sister Candle + Unbanked Ember, restoration sequence, music system.
- **Gate:** a 45-min demo ready for publishers / Steam Next Fest.

### M3 — Production (≈ 14 months)
- Remaining 5 regions, Cathedral, all bosses, narrative, endings.
- Region cadence: about 8 weeks per region with overlapping art/design pipelines.

### M4 — Content complete → Beta (3 months)
- Balancing, Assist options, localisation (EN, FR, DE, ES, PT-BR, JA, ZH-S, KO), accessibility pass.

### M5 — Launch & post-launch
- PC launch. Console ports start in parallel during beta.
- Post-launch idea: **"The Seventh Hue"** DLC (a forbidden colour outside the wheel; see open questions).

## Team (lean indie estimate)

| Role | FTE |
|---|---|
| Game director / designer | 1 |
| Gameplay programmers | 2 |
| 2D animators / illustrators | 3 |
| Environment artist | 1 |
| Composer / sound designer | 1 (contract) |
| Writer | 0.5 (contract) |
| QA / producer | 1 |

≈ **9 people, ~2.5 years** to launch. A 3–4 person team should cut to 4 regions + Cathedral (see the scope cuts below).

## Scope-cut ladder (cut from the top first)

1. 3rd Vessel (fold its role into a relic)
2. Memory Wisps → static illustrated vignettes
3. Dusk Archive's "replay your fights" boss → bespoke pattern boss
4. Reduce to 4 Hues (Crimson, Azure, Aurum, Verdant) + 2 Blends... **only if
   unavoidable**; the wheel symmetry is core to the identity.
5. Gardener's Peace secret ending

## Key risks

| Risk | Impact | Mitigation |
|---|---|---|
| Stain feels like pure punishment, so players never use Hues | Core loop fails | M0 gate; tune toward generosity; Mark-tier gives a buff, not only costs |
| Greyscale world feels visually dull | Wishlists / retention | Strong value contrast, lighting, parallax; colour moments placed often |
| Colour-dependence excludes colour-blind players | Accessibility / reviews | Glyphs + sound signatures from M1, not post-launch |
| Too many abilities to balance (36) | Schedule | Data-driven tuning; automated combat sims for DPS ranges |
| Comparisons to Hollow Knight / Blasphemous | Marketing | Lead every trailer with the "steal the Hue" mechanic; it's the differentiator |

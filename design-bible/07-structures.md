# Part 7 — Structures

Bases, Enemy Cores, Resource Hubs and nodes. Rules and Health are **Spec**
(`spec/05` §7). Dimensions, layouts and state visuals are **Proposal**. The
**Built** column shows what the playable build uses today.

## 7.1 Names on each side

| Game term | Wildborn | Blightborn | Count |
|---|---|---|---|
| Base | The Cradle | The Clutch | 1 per team |
| Base Heart | The oldest knot | The oldest knot (glazed) | 1 per base |
| Enemy Core | Heartseed | Shard Heart | 3 per team |
| Resource Hub | Sap Well | Glow Well | 5 per map, neutral at start |
| Node | Root-knot | Whisper-node | ~30 per map |

**Mirror rule:** rules, stats, sizes and positions are identical for both sides. Only
material and sound change. Hubs regrow in the new owner's material when captured; bases
and Enemy Cores are destroyed, never taken.

## 7.2 Damage rules (Spec)

| Rule | Value |
|---|---|
| Player damage to structures | **50%** with basics and ordinary abilities |
| Siege Ultimates, Siege Beetle | Listed structure damage is **final** (not halved) |
| Stage 1 | Can't damage Shielded Hubs, Enemy Cores or Base Hearts |

**Siege check (Spec):** four Stage 3 attackers (~260 damage/s each, halved) break a Level 0
Hub's Shield in ~4 s, a Level 10 Hub's Shield in ~6 s, an Enemy Core in ~10 s, and a Base Heart
in ~38 s without Ultimates (~25 s with two siege Ultimates).

---

## 7.3 The base: the Cradle / the Clutch

### Layout (Proposal)

The base is a ring of birth-node knots around a pool. Diameter of the playable base: **36 m**.

| Element | Position (relative to the base centre) | Size | Function |
|---|---|---|---|
| Birth-pool | Centre | 10 m diameter, 0.6 m deep | Conversion point (kneel at the edge) |
| Base Heart (oldest knot) | Behind the pool, toward the map edge, 8 m from centre | 7 m tall, 6 m wide knot | Win condition target |
| Respawn knots | 8 knots on a ring of radius 14 m | 2.5 m each | One per player slot; players bud here |
| Base radius (Built) | — | Conversion works anywhere within the base radius | Built: convert anywhere inside the base radius |
| Entrances | 3 openings in the knot ring (front, two flanks) | Each ≥ 8 m wide | Defensible but never single-file |
| Edge nodes | 2–3 nodes touching the base | — | Become Vulnerable in Phase 4 (Spec) |

### Base Heart (Spec)

| Rule | Value |
|---|---|
| Health | **20,000** (Built: 12,000, a playtest override, see `game/KNOWN_ISSUES.md` #11) |
| Attackable | Phase 4, or earlier if all three of that team's Enemy Cores are down at the same time |
| Damage taken | Only Stage 2+ damage counts |
| Regeneration | 1% max Health/s after 15 s without damage |
| Destroyed | Instant win |

### Base visuals

| State | Cradle | Clutch |
|---|---|---|
| Phase 1 | Freshly split knots, glistening; fireflies and Lumen Bees | Knots glazed in glass; cyan light pulsing inside; constant whisper |
| Phase 2 | The pool brightens with every conversion | Same, cyan |
| Phase 3 | Roots spread outward from the ring | Crystal spreads outward |
| Phase 4 | Edge nodes open; the Base Heart's bark splits to show its amber core | Its glass cracks to show the cyan core |
| Under attack | The Heart's pulse quickens; roots tremble | The hum rises in pitch |
| Destroyed | The knot splits, the pool drains, the brood's lights go out | The geode shatters; the pool goes dark |

### Conversion sequence (Spec timings)

| Step | Visual | Time |
|---|---|---|
| Arrive | Carry aura still humming | — |
| Kneel | Channel starts | C1 15 s · C2 12 s · C3 9 s (by Hubs held); +1 tier per Enemy Core lost (min 18 s) |
| Pour | Cores flow out as streams of light into the pool | During the channel |
| Grow | The pool's light climbs the body; a flash per level gained | End of channel |
| Stage change | Transformation plays at the pool | If reached |
| Interrupted | Streams snap back into the body; cores kept, time lost | On damage |

**Built:** the base radius allows conversion anywhere inside the base, and bots convert
anywhere inside it (a fix for bots cancelling conversion).

---

## 7.4 Enemy Cores: Heartseeds / Shard Hearts

| Rule | Value (Spec) |
|---|---|
| Count | 3 per team, in that team's half |
| Health | **5,000** (regrown: 2,500) |
| Attackable | From Phase 2 |
| Reward | **300 cores**, split equally among attackers within 20 m (regrown Core: 150) |
| Denial | −15% victim passive income per Core lost; conversion one C-tier slower per Core lost (min 18 s) |
| Regrowth | 4 min after destruction, 30 s growth, only if the team holds a node adjacent to the site |
| Built | Enemy Core reward **900** (playtest override) |

### Dimensions and placement (Proposal)

| Element | Value |
|---|---|
| Heartseed | A 5 m seed half-buried, husk split to show a beating heart; 4 m hitbox radius |
| Shard Heart | A house-sized geode, 5 m tall; same hitbox |
| Clear ring | No obstacles within 10 m (so attackers and defenders can both stand around it) |
| Distance from own base | 25–70 m |
| Adjacent nodes | Each site touches at least 2 nodes, so regrowth can be fought over |
| Sightline rule | Visible from at least one Hub of its own team |

| State | Heartseed | Shard Heart | Sound |
|---|---|---|---|
| Young (Phase 1) | A seedling | A crystal bud | Faint pulse |
| Grown | A full seed, heartbeat visible | A full geode, humming | Muffled pulse / humming |
| Under attack | The pulse quickens; husk cracks spread | Hum rises in pitch; cracks spread | Audible to the owning team map-wide (quiet) |
| Destroyed | The husk splits; the heart dims to grey; roots toward the Cradle wither one after another | Shatters outward in a ring of dust that drifts for a minute | A dry crack and a long exhale / a shatter, then silence |
| Regrowing | A shoot through the husk, 30 s | Needles fuse into a small geode, 30 s | — |
| Blocked | A withered husk | A pile of glass dust | — |

---

## 7.5 Resource Hubs: Sap Wells / Glow Wells

| Rule | Value (Spec) |
|---|---|
| Base Health | **6,000** |
| Defense Levels | 0 (bare, on capture) to 10; cost 100 × next level SAP |
| Per level | +400 Health; +5% damage reduction for **allies inside** (radius 12 m), max 75% total |
| Level 10 Health | 10,000 |
| Shielded (100–66%) | Only Stage 2+ damage counts; can't be uprooted |
| Exposed (66–33%) | Cells can be uprooted |
| Collapsing (< 33%) | Uproot at half time; defenders warned |
| Health floor | Can't go below 1; falls only when **all 6 cells** are uprooted |
| Regeneration | 2% max Health/s after 10 s without damage |
| On capture | New team's at Level 0, full base Health; old levels lost |
| Field conversion | 70% efficiency, no aggression bonus |
| Holding | +15% SAP and +10% TI weight each |
| Neutral at start | All five; captured like a large node (one 4 s channel, then spread) |
| Built | Hub Defense bought automatically by the team AI |

### Dimensions (Proposal)

| Element | Value |
|---|---|
| Hub footprint | 6 cells (Built: the 6 nearest cells to the Hub centre) |
| Pool | 8 m diameter, centred on the Hub point |
| Defense ring | Radius 12 m (matches the damage-reduction radius), with 3 openings each ≥ 8 m wide |
| Capture point | The pool's edge (2 m from the rim) |
| High ground | Each Hub has one nearby rise or rock from which its dome can be seen across the map |

### Defense levels in the world (Spec visuals, `gdd/33`)

| Level | Sap Well | Glow Well | Height of the ring (Proposal) |
|---|---|---|---|
| 0 | Bare pool | Bare pool | — |
| 1 | Low ring of roots | Short crystal stubs | 0.5 m |
| 2–3 | Knee-high root walls | Waist-high pillars | 1.0–1.5 m |
| 4–5 | Shoulder-high walls, moss | Shoulder-high pillars, glowing | 2.5–3 m |
| 6–7 | Walls arch over parts of the pool; flowers | Pillars lean inward into partial arches | 5–6 m |
| 8–9 | Near-complete dome of living wood | Near-complete crystal cage | 8–10 m |
| 10 | Full living dome, one opening, humming | Full crystal cage, ringing softly | 12 m |

**Openings:** at every level the ring keeps three openings at least 8 m wide and 10.5 m
tall (doorway rule, §1.2). At Level 10 the "single opening" is the visual roof opening;
the ground openings remain.

### Attack-stage silhouettes

| Stage | Visual | Sound |
|---|---|---|
| Shielded | Walls or pillars whole | Steady |
| Exposed | Cracks; roots or lattice show underneath | Groaning / cracking glass |
| Collapsing | The pool drains in a spiral; its glow flickers | A falling tone; defenders get a HUD warning |
| Captured | Pool drains and refills in the new material over 3 s | Roots groaning as they thicken / crystal singing as it grows |

**Scars:** a Hub that changes hands keeps traces of its previous owner (half-overgrown
crystal, glazed root tips), so by the end of a long match every Well shows its history.

---

## 7.6 Nodes and cells

| Rule | Value (Spec unless noted) |
|---|---|
| Nodes per map | About 30, each 1–6 cells |
| Cells per map | About 110 (Built: a 20 × 12 grid, 240 cells of 14 × 15 m) |
| Capture | 4 s channel within 2 m of the node core (Verdant 2 s); −1% time per 2 Control, max −50%; interrupted by damage |
| Uproot | Per cell 5 / 4 / 3 s by the attacker's highest Synergy tier present |
| SAP | 1 SAP/s per cell (Built: 0.1 per cell, playtest override) |
| Spread | Rooted territory spreads into adjacent neutral cells, ~1 cell per 20 s per border node |
| States | **Captured** · **Vulnerable** (neutral, or enemy-held and connected to your territory) · **Inaccessible** (not connected, or phase-locked) |

### Node visuals (Proposal on `gdd/33`)

| State | Root-knot / Whisper-node | Height |
|---|---|---|
| Neutral | Grey roots breaking the surface, pulsing faintly | 1.2 m knot |
| Captured (Wildborn) | Green shoots and moss spread from the knot | 1.8 m |
| Captured (Blightborn) | Glass from the centre outward; a whisper crystal rises | 2.2 m crystal |
| Vulnerable | Flickers; roots or crystals tremble (every 1.5 s) | — |
| Inaccessible | Dim and still | — |
| Being captured | Roots (or Glaze lines) race outward from the channeller to the knot | — |
| Cells | Ground material changes per cell: matte roots or glossy Glaze (§1.6) | — |

**Built:** a live territory overlay on the terrain shader; a slope mask keeps territory
veins off cliffs.

**UI rule:** minimap and HUD show ownership in **team colours** (gold / red), never side
colours, so a Blightborn player never confuses their own cyan with an enemy.

## 7.7 Structure checklist for a new map

1. Two bases in mirrored positions.
2. Five Hubs: two near each base and one central, equidistant in total from both bases.
3. Three Enemy Core sites per team, each touching at least two nodes.
4. Every Hub's dome visible from at least one high point.
5. No structure placed where a hazard (lava, tide, ice) could destroy it without player action.
6. Return trip to base ≤ 20 s from any Hub on foot at Speed 100% (≤ 100 m of path).

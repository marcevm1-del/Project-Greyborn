---
type: world
tags: [world, structure]
---
# Structures — Resource Hubs - Sap Wells and Glow Wells

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

## Dimensions (Proposal)

| Element | Value |
|---|---|
| Hub footprint | 6 cells (Built: the 6 nearest cells to the Hub centre) |
| Pool | 8 m diameter, centred on the Hub point |
| Defense ring | Radius 12 m (matches the damage-reduction radius), with 3 openings each ≥ 8 m wide |
| Capture point | The pool's edge (2 m from the rim) |
| High ground | Each Hub has one nearby rise or rock from which its dome can be seen across the map |

## Defense levels in the world (Spec visuals, `gdd/33`)

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

## Attack-stage silhouettes

| Stage | Visual | Sound |
|---|---|---|
| Shielded | Walls or pillars whole | Steady |
| Exposed | Cracks; roots or lattice show underneath | Groaning / cracking glass |
| Collapsing | The pool drains in a spiral; its glow flickers | A falling tone; defenders get a HUD warning |
| Captured | Pool drains and refills in the new material over 3 s | Roots groaning as they thicken / crystal singing as it grows |

**Scars:** a Hub that changes hands keeps traces of its previous owner (half-overgrown
crystal, glazed root tips), so by the end of a long match every Well shows its history.

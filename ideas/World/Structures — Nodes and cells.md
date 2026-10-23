---
type: world
tags: [world, structure]
---
# Structures — Nodes and cells

| Rule | Value (Spec unless noted) |
|---|---|
| Nodes per map | About 30, each 1–6 cells |
| Cells per map | About 110 (Built: a 20 × 12 grid, 240 cells of 14 × 15 m) |
| Capture | 4 s channel within 2 m of the node core ([[Verdant]] 2 s); −1% time per 2 Control, max −50%; interrupted by damage |
| Uproot | Per cell 5 / 4 / 3 s by the attacker's highest Synergy tier present |
| SAP | 1 SAP/s per cell (Built: 0.1 per cell, playtest override) |
| Spread | Rooted territory spreads into adjacent neutral cells, ~1 cell per 20 s per border node |
| States | **Captured** · **Vulnerable** (neutral, or enemy-held and connected to your territory) · **Inaccessible** (not connected, or phase-locked) |

## Node visuals (Proposal on `gdd/33`)

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

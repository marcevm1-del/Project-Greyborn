---
type: world
tags: [world, map]
---
# Map rules

| Rule | Value | Source |
|---|---|---|
| Playable size | About 320 × 320 m | Spec (`gdd/16`) |
| Nodes | About 30, ~110 cells (1–6 cells per node) | Spec |
| Resource Hubs | 5: two near each base, one central | Spec |
| Enemy Core sites | 3 per team, in its own half | Spec |
| Bases | 1 per team, a birth-node cluster | Spec |
| Symmetry | Neither base may have better routes, distances or resources | Spec |
| Crater zone and [[The Heartwood\|Heartwood]] grove | On the two flanks, each equidistant from both bases | Spec |
| Memory sites | 2–3 per map | Spec |
| Return trip | ≤ 20 s from any Hub to base | Spec |
| Tension regions | 5 per map, one per Hub | Spec (`spec/05` §8) |

## Symmetry: mirror, not rotation

`gdd/16` asks for rotational symmetry. On a map whose crater zone is on one flank and
whose grove is on the other, a 180° rotation would carry the crater onto the grove's
side, so the two zones could not both be equidistant from both bases. **Proposal:** use
**mirror symmetry across the centre line between the bases** (x = 0 for an east–west
map). The flank zones sit on that line, so each is exactly equidistant from both bases.
The playable build already does this (Built: `game/src/sim/map.ts`). Maps without
flank zones on the centre line ([[The Skull Basin]]) may use rotation.

## Metrics for greybox (Proposal)

| Metric | Value | Why |
|---|---|---|
| Base speed | 5.0 m/s; sprint 6.5 m/s out of combat after 4 s | Spec |
| Base → nearest own Hub | 50–70 m path (10–14 s) | Early Hub fights near home |
| Base → central Hub | ≤ 130 m path (≤ 20 s at sprint) | Return rule; the central Hub also allows field conversion |
| Base → own Enemy Cores | 25–70 m | Defensible in time |
| Base → enemy base | 240–280 m path | ~45–55 s at sprint, so a push is a commitment |
| Max open sightline at ground level | 120 m | Longer than Spire Lance (50 m) but short enough that cover matters |
| Cover spacing on open ground | A Stage 2-hiding object (≥ 4 m tall) every 25–35 m | Room to move between fights |
| Chokepoints | ≥ 8 m wide; ≤ 2 per route between bases | No single-file traps |
| Elevation | 3 layers: low ground, rises (2–6 m), high points (8–15 m) | Every lineage has a place |
| Ramps | ≤ 30° slope for walking; steeper is a cliff | Built: slope mask stops territory veins on cliffs |
| Fall damage | None; dropping a level costs time only | `gdd/42` vertical rules |

## Every map document includes

1. Identity and the fight style it rewards.
2. A layout with coordinates for bases, Hubs, Cores, nodes, flank zones and routes.
3. The signature mechanic with exact timings and telegraphs.
4. Wildlife camps with positions and respawn.
5. Apex spawn and route.
6. Memory sites and callout names.
7. [[Weather]] pool, time-of-day moods and lighting.
8. Audio zones.
9. Lineages it favours, and a balance check.
10. A greybox checklist.

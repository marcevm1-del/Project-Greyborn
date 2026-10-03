# Performance

## Important caveat

This environment has **no GPU**. All rendering numbers below come from
Chromium's software WebGL (SwiftShader) on 4 CPU cores. They are useful for
spotting regressions (draw calls, triangles, relative cost) but **say
nothing about frame rate on real hardware**, which is UNVERIFIED.

## Budgets (target, real hardware)

| Measure | Budget |
|---|---|
| Frame time | 16.7 ms (60 fps) at High on a mid-range desktop GPU |
| Simulation | ≤ 2 ms per 30 Hz tick (worst case ≤ 8 ms) |
| Draw calls | ≤ 300 |
| Triangles | ≤ 500k |
| JS bundle | ≤ 1 MB (gzip ≤ 300 KB) |

## Measurements (2026-10-03)

### Simulation (headless Node, 6 full short matches)

| Measure | Before fixes | After fixes |
|---|---|---|
| Average tick | 0.50–0.61 ms | 0.51–0.54 ms |
| Worst tick (after warm-up) | 17–61 ms | 2.6–13.7 ms |

**Bottleneck found:** many bots running A* in the same tick. **Fix:** a
budget of 2 searches per tick (bots without a fresh path steer directly
until their turn). Remaining spikes up to ~14 ms are rare; next suspects
are long A* searches across the whole map (cap `maxExpand` lower or use a
coarser grid for long trips).

### Rendering (SwiftShader, 1280 × 720)

| Measure | Value | Notes |
|---|---|---|
| Draw calls, creatures as separate parts with outlines | ~640 | First version |
| Draw calls after merging parts per animated pivot | ~120–200 | Rim light replaced outline hulls |
| Triangles in view | 120k–250k | Terrain mesh (100k) dominates; grass ~40k near the camera |
| Frame rate (software) | ~10 fps at Low, lower at High | Not representative |
| Bundle | 680 KB (181 KB gzip) | Within budget |

### Techniques in use

| Technique | Where |
|---|---|
| Instancing | Rocks, shards, roots, pebbles, grass |
| Chunked frustum culling | Props and grass in 40 m chunks |
| Distance culling / fade (LOD) | Grass fades 55–75 m, chunks beyond ~105 m hidden; creatures beyond 220 m hidden |
| Fog-of-war culling | Enemies outside your team's sight aren't drawn |
| Geometry merging and caching | Creature parts merged per pivot, merged geometry cached and shared |
| Object pooling | Particles (one buffer of 3,000), rings, core orbs |
| Texel-snapped shadow box | Shadow map follows the player, no shimmer |
| Quality presets | Low (no shadows, 35% grass), Medium, High |

## Next optimisation candidates (measure first on a real GPU)

1. Terrain: split into chunks with two LOD levels (largest triangle cost).
2. Shadows: cascaded or smaller box at Stage 1; skip shadow casting for distant creatures.
3. Bundle: split three.js into its own cached chunk.

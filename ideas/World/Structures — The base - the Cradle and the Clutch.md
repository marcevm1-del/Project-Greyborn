---
type: world
tags: [world, structure]
---
# Structures — The base - the Cradle and the Clutch

## Layout (Proposal)

The base is a ring of birth-node knots around a pool. Diameter of the playable base: **36 m**.

| Element | Position (relative to the base centre) | Size | Function |
|---|---|---|---|
| Birth-pool | Centre | 10 m diameter, 0.6 m deep | Conversion point (kneel at the edge) |
| Base Heart (oldest knot) | Behind the pool, toward the map edge, 8 m from centre | 7 m tall, 6 m wide knot | Win condition target |
| Respawn knots | 8 knots on a ring of radius 14 m | 2.5 m each | One per player slot; players bud here |
| Base radius (Built) | — | Conversion works anywhere within the base radius | Built: convert anywhere inside the base radius |
| Entrances | 3 openings in the knot ring (front, two flanks) | Each ≥ 8 m wide | Defensible but never single-file |
| Edge nodes | 2–3 nodes touching the base | — | Become Vulnerable in Phase 4 (Spec) |

## Base Heart (Spec)

| Rule | Value |
|---|---|
| Health | **20,000** (Built: 12,000, a playtest override, see `game/KNOWN_ISSUES.md` #11) |
| Attackable | Phase 4, or earlier if all three of that team's Enemy Cores are down at the same time |
| Damage taken | Only Stage 2+ damage counts |
| Regeneration | 1% max Health/s after 15 s without damage |
| Destroyed | Instant win |

## Base visuals

| State | Cradle | Clutch |
|---|---|---|
| Phase 1 | Freshly split knots, glistening; fireflies and [[Lumen Bees]] | Knots glazed in glass; cyan light pulsing inside; constant whisper |
| Phase 2 | The pool brightens with every conversion | Same, cyan |
| Phase 3 | Roots spread outward from the ring | Crystal spreads outward |
| Phase 4 | Edge nodes open; the Base Heart's bark splits to show its amber core | Its glass cracks to show the cyan core |
| Under attack | The Heart's pulse quickens; roots tremble | The hum rises in pitch |
| Destroyed | The knot splits, the pool drains, the brood's lights go out | The geode shatters; the pool goes dark |

## Conversion sequence (Spec timings)

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

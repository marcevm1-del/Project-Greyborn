---
type: world
tags: [world, systems]
---
# Sound as a gameplay system

## Sound signatures (Spec, `gdd/03`)

| Factor | Effect |
|---|---|
| Stage | Bigger Ascendants are louder and heard from farther |
| Carrying 150+ cores | Footsteps and aura audible from farther |
| Carrying 300+ | Shown on the enemy minimap every 5 s |
| [[Hollow]] | No footstep sounds |
| [[Thornrunner]] | Footsteps ×0.5 range |
| [[Stillheart]] | Footsteps ×0.7 range |
| [[Hush Cicada\|Hush Cicadas]] | Mute signatures within 15 m |
| [[The Roar]] | Maxes every signature within 30 m |

## Hearing distances (Proposal)

| Source | Heard from |
|---|---|
| Base Form footsteps | 12 m |
| Stage 1 footsteps | 18 m |
| Stage 2 footsteps | 30 m ([[Titan]]: through walls) |
| Stage 3 footsteps | 45 m |
| Carry aura 150+ | +10 m |
| Spire Lance crack | 60 m (Spec) |
| Transformation | Map-wide (Spec) |
| Tier IV footsteps | 60 m |
| Enemy Core under attack | Owning team, map-wide, quiet (Spec) |

## Accessibility (Spec principle, `gdd/19`, `gdd/43`)

Every sound cue that carries information has a visual equivalent:

| Cue | Visual equivalent |
|---|---|
| Footsteps and carry auras | Directional sound indicators at the screen edge |
| Wildlife reactions (birds silent, prey fleeing) | Optional small icon over the region |
| Tension drone | Region tint on the minimap at 75+ |
| Phase horns and chimes | HUD banner |
| [[The Unspoken]]'s whispers | Directional whisper indicators (required) |
| Low-Health breathing | Vignette pulse |

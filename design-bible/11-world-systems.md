# Part 11 — World Systems

The systems that change a map while a match is running: phases, weather, time of day,
the Turns, Tension events, hazards and sound. Numbers are **Spec** unless marked.

## 11.1 Match phases (Spec, `gdd/06`)

| # | Phase | Time (Standard) | Short match (Built default: ×0.5) | What switches on |
|---|---|---|---|---|
| 1 | Stable Flow | 0:00–5:00 | 0:00–2:30 | Spread out, root nearby nodes, lineages awaken |
| 2 | Pre-Aggro Resource Control | 5:00–10:00 | 2:30–5:00 | Hub fights; Enemy Cores attackable; Tension starts building |
| 3 | Resource Stage | 10:00–16:00 | 5:00–8:00 | Hub Defense race; events fire; Tier IV spawns; the central Hub's roots permanently Exposed. Synergy S1 locked, S2 31 s, S3 20 s |
| 4 | Hunt | 16:00–end | 8:00–end | Every node next to a base becomes Vulnerable; Base Hearts attackable; S1 and S2 locked, S3 9 s; respawn +5 s |

**Phase scaling for wildlife:** Health and damage ×1.00 / 1.15 / 1.30 / 1.45.
**Announcements:** each phase change has a map-wide sound (a wooden horn for Wildborn, a
glass chime for Blightborn; Built) and a HUD banner.

## 11.2 Visibility (Spec, `spec/01`)

| Condition | Sight radius |
|---|---|
| Base | 30 m (Stage 3: 40 m) |
| Night | 22 m (Stage 3: 30 m) |
| Ashfall | 18 m |
| Rime Fog | 15 m |
| Revealed | Visible to the revealing team through fog and terrain for the duration |
| Carriers of 300+ cores | Shown on the enemy minimap every 5 s |
| Minimap | Teammates always; enemies only when visible or pinged |

**Built:** enemies outside the team's sight are hidden; 300+ carriers always shown.

## 11.3 Weather

| Weather | Visual (`gdd/23`) | Gameplay (Proposal unless Spec) | Maps |
|---|---|---|---|
| **Clear** | Soft daylight; full palette | Normal sight. Elder Ribs: salt glare at noon | All |
| **Ashfall** | Grey particles drifting diagonally; distant shapes become silhouettes | Sight 18 m (Spec); footsteps heard ×1.3 farther | Ashfall Crossing, Fevermouth, Ash Sea |
| **Rime Fog** | Low white fog; creature tops visible above it; frost everywhere | Sight 15 m (Spec); Base Forms and Stage 1 hidden in the fog layer beyond 10 m | Breathing Canopy, The Sleeper, Shard Reef |
| **Sap Rain** | Warm amber droplets; glossy wet surfaces | SAP income +10% for both teams; footsteps ×0.8 | Breathing Canopy |
| **Shard Storm** | Glittering glass streaks; cyan flashes where shards land | Random shard strikes: a 2 m decal 1.0 s ahead, 60 damage; sight 22 m | Elder Ribs, Shard Reef |
| **Breathing Night** | Darkness lit by the Lantern moon, the Fall-line and every living glow | Night sight (22 m); glows (weak points, carriers) read from farther | Ashfall, Elder Ribs, Breathing Canopy, The Sleeper |

**Rule:** weather never hides team outlines or weak points. One weather per match, chosen
at random from the map's pool and shown on the loading screen.

## 11.4 Time of day (Proposal)

Each match plays one day-cycle segment, chosen per match: dawn → day, day → dusk, or dusk → night.
The segment lasts the whole match, so light changes slowly and fairly for both sides.

| Time | Light | Mood |
|---|---|---|
| Dawn | Low, soft, grey-gold through mist | Calm, waking |
| Day | Diffuse light from the Grey Eye; soft shadows | Clear, readable |
| Dusk | Warm gold fading to violet; long shadows; the Fall-line starts to glow | Most atmospheric |
| Night | The Lantern moon's amber, the Fall-line's cyan-violet, and gameplay glows | Mysterious; glow is the main light |

**Rule:** night must stay readable; ambient light never drops so low that silhouettes are lost.

## 11.5 The Turns (seasons of the planet's year)

| Turn | Wildlife (Spec, `spec/04`) | World look |
|---|---|---|
| **Bloom** | +1 Tier I group per biome; Mossback Calves present; Lumen Bees active | Flowers on Verdants and in Titans' moss; structures flower |
| **Ash** | Ash Vultures ×2; Ashfang packs of 4 | A coat of ash on every creature and surface |
| **Rime** | All wildlife −10% speed; Hoarfrost Mites swarm; Drift Owlbears in deep sleep (wake radius 1.5 m) | Frost on fur, bark and glass; breath visible; birth-pools steam |
| **Fever** | Predators +10% damage; Cinder Salamanders on every lava map | Heat shimmer; bark parched; glass glows warmer |

Turn overlays are cosmetic on creatures and never hide weak points or change silhouettes.

## 11.6 Tension and global events (Spec, `spec/05` §8)

| Rule | Value |
|---|---|
| Regions | 5 per standard map (one per Hub) |
| Range | 0–100 per region |
| Builds from | Phase 2; events fire from Phase 3 |
| At 100 | An event fires in that region; Tension resets; region cooldown 90 s |
| Global limit | One event at a time; at most one every 60 s |

| Factor | Tension per second |
|---|---|
| Borders touching in the region | +0.2 |
| Each fight within 15 m of a border | +1.0 |
| Stage 2 creature nearby | ×1.5 on its fight's rate |
| Stage 3 creature nearby | ×2 |
| The Old Tall within 30 m | ×3 on everything |
| No fighting for 30 s | −0.5 (decay) |

**Audio cue (Spec):** a low drone begins at 75 Tension in that region.

| Deck | When | Events (weight · duration · effect) |
|---|---|---|
| Neutral | TI within 5% | Rootquake (25% · 30 s · all nodes in the region Vulnerable) · Marrow Storm (20% · 20 s · weak points exposed from any angle) · Stampede (20% · 30 s · staggers +50%, Momentum ×2) · SAP Surge (20% · first team to spend 200 SAP gets ×3 SAP for 60 s) · Core Bloom (15% · 400 loose cores at the region's centre) |
| Planet Pulse | Wildborn behind by > 5% (60%, else neutral) | Heartquake (40% · 20 s · Blightborn nodes Vulnerable, uproot at half time) · Healing Bloom (40% · 15 s · Wildborn regenerate 3%/s) · The Old Tall wakes (20% · 45 s · hunts Blightborn) |
| Murmur Surge | Blightborn behind by > 5% (60%, else neutral) | Shard Rain (40% · 15 s · 150/s to Wildborn structures, final) · Thousand Whispers (40% · 10 s · all Wildborn revealed map-wide) · Blighted Wyrm (20% · 45 s · hunts Wildborn) |

**Event resource gain:** where an event pays out, each team's share is boosted +1% per
cell it holds in that region, max +30%.

### Event presentation (Proposal)

| Event | Warning | Visual | Audio |
|---|---|---|---|
| Rootquake | 3 s ground tremor | Ground heaves; roots and Glaze tear loose | Deep groan |
| Marrow Storm | Bone dust rises | Wind full of bone dust; every weak point glows through it | Howling wind, clicking bone |
| Stampede | Herds bellow | Every herd in the region bolts | Thundering hooves |
| SAP Surge | A geyser cracks open | An amber geyser; the claiming team's colour rings it | A rush like a fountain |
| Core Bloom | Light pulses from the ground | 400 cores burst up and scatter | A rising chime |
| Heartquake | The planet's heartbeat | Blight cracks open in the region | A deep heartbeat felt in the controller |
| Healing Bloom | Petals fall | Amber flowers bloom under Wildborn | Soft choral swell |
| Shard Rain | Glitter in the sky | Shards fall on Wildborn structures (decals 1.0 s ahead) | Glass whistling, then shattering |
| Thousand Whispers | Whispers rise | Every Wildborn outlined in violet for Blightborn | A rising chorus of whispers |

## 11.7 Map hazards (summary)

| Hazard | Map | Damage / effect | Warning |
|---|---|---|---|
| Grey Migration | Ashfall Crossing | 40/s on the road; pushed off | 20 s |
| Shard storm (crater) | Ashfall Crossing (Shardfall Hollow) | 12/s outside cover; sight 15 m | 10 s |
| Grasping ground | Heartwood groves | Root 0.8 s after 1.5 s still | Twitching roots |
| Salt glare | Elder Ribs | Sight 22 m toward the sun at noon | Always visible |
| Canopy fall | Breathing Canopy | Sight 18 m under the canopy | 5 s exhale |
| Mud | Hollow Mire areas | −20% speed (Spec) | Visible |
| Eruption | Fevermouth | 80/s in lava; cells uncapturable 60 s | 20 s |
| Embergrass fire | Fevermouth | 20/s; spreads 1 m/s for 10 s | Ignition visible |
| Breaking ice | The Sleeper, Frozen Falls | Water: −40% speed, 2% max Health/s | Cracks visible |
| Sleeper's pulse | The Sleeper (Phase 4) | All lake ice cracks | 5 s thump |
| Tide | Shard Reef | Nodes Inaccessible; water −40% speed | 15 s |
| Nerve pulse | The Nerve | Revealed 2 s in corridors | 2 s glow |
| Bone-fall | The Skull Basin | 300 in r 6 m; new cover | 5 s shadow |
| Dune shift | The Ash Sea | Routes change; sight 10 m in the storm | Visible storm front |
| Heat vent | The Glass Forest | 60 per pulse | Pulses every 30 s |

## 11.8 Sound as a gameplay system

### Sound signatures (Spec, `gdd/03`)

| Factor | Effect |
|---|---|
| Stage | Bigger Ascendants are louder and heard from farther |
| Carrying 150+ cores | Footsteps and aura audible from farther |
| Carrying 300+ | Shown on the enemy minimap every 5 s |
| Hollow | No footstep sounds |
| Thornrunner | Footsteps ×0.5 range |
| Stillheart | Footsteps ×0.7 range |
| Hush Cicadas | Mute signatures within 15 m |
| The Roar | Maxes every signature within 30 m |

### Hearing distances (Proposal)

| Source | Heard from |
|---|---|
| Base Form footsteps | 12 m |
| Stage 1 footsteps | 18 m |
| Stage 2 footsteps | 30 m (Titan: through walls) |
| Stage 3 footsteps | 45 m |
| Carry aura 150+ | +10 m |
| Spire Lance crack | 60 m (Spec) |
| Transformation | Map-wide (Spec) |
| Tier IV footsteps | 60 m |
| Enemy Core under attack | Owning team, map-wide, quiet (Spec) |

### Accessibility (Spec principle, `gdd/19`, `gdd/43`)

Every sound cue that carries information has a visual equivalent:

| Cue | Visual equivalent |
|---|---|
| Footsteps and carry auras | Directional sound indicators at the screen edge |
| Wildlife reactions (birds silent, prey fleeing) | Optional small icon over the region |
| Tension drone | Region tint on the minimap at 75+ |
| Phase horns and chimes | HUD banner |
| The Unspoken's whispers | Directional whisper indicators (required) |
| Low-Health breathing | Vignette pulse |

## 11.9 Colour-blind palettes (Spec, `gdd/23`)

| Palette | Wildborn | Blightborn | Team outlines |
|---|---|---|---|
| Default | Amber | Cyan-violet | Gold / red |
| Deuteranopia | Orange-yellow | Deep blue | White / magenta |
| Protanopia | Yellow | Blue | White / orange |
| Tritanopia | Red-orange | Teal | White / pink |

Material (matte organic vs. glossy crystal vs. crusted Scald) carries the side even without colour.
**Built:** a colour-blind team-colour option (blue / orange) exists in Settings.

## 11.10 Open questions for the director

These came up while writing this document and need a decision before greybox:

1. **Mirror vs. rotational symmetry** (§8.1): adopt mirror symmetry for maps whose flank zones
   sit on the centre line? The build already uses it.
2. **Ashfall Crossing size:** keep the tested 280 × 180 m core and expand only the flanks
   (proposal: 320 × 240 m), or rebuild at the GDD's 320 × 320 m?
3. **Wildlife counts on Ashfall Crossing:** approve the additions in §8.2 that bring it inside the Spec ranges?
4. **Blighted forms for the four Season 4 creatures** (Part 6, rows 43–46): approve the proposals?
5. **Balance sign-off** on the playtest overrides (Base Heart 12,000, Enemy Core reward 900, SAP 0.1/cell, EXP and bounty curves), still pending from `sim/findings.md`.

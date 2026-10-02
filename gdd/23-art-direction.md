# 23 — Art Direction

The visual guide for Greyborn's world. It builds on the look of the source
pages ([00](00-source-pages.md)) and on [14 — Lineage Forms](14-lineage-forms.md).
All content here is a proposal.

## What the source pages already show

- **Creatures:** detailed 3D monsters, presented as luminous blue-white
  **wireframe** models: huge, heavy and anatomically believable.
- **Environments:** painterly key art with misty mountains, deep forest and
  lava, plus **green bioluminescent glow** (the Stage 2 vine form).
- **UI:** dark teal panels, **warm gold headings**, thin bright lines, and
  colour-coded node states (cyan = captured, gold = inaccessible, red = vulnerable).

The proposals below keep all of that.

## Style in one line

> **Primal majesty, readable at a glance.** Painterly realism for the world,
> strong shapes for creatures, and glow reserved for meaning.

## Pillars

1. **Scale is the story.** A Level 1 Kith is small next to a tree; a Level 20
   Ascendant is taller than the trees. The world's props (trees, fossils,
   rocks) are built at sizes that make that growth obvious.
2. **Three materials, three meanings.** Every surface in a match is one of:
   - **Living ground and roots** (the planet): matte, organic, warm.
   - **Blight** (the Murmur): glossy, crystalline, cold.
   - **Scald** (the Clamor, Season 3): crusted, steaming, rust-red.

   A player should know who owns a patch of ground from the material alone, even in greyscale.
3. **Glow means something.** Bioluminescence, crystal light and ember glow are
   used **only** for gameplay meaning: weak points, nodes, Synergies, carry
   signatures, hazards. Decorative glow is avoided so the meaningful glow stays readable.
4. **Grey is the canvas.** Greyborn's base world is soft grey-green, grey-gold
   and stone-grey. The planet's warm colour and the Murmur's cold colour stand
   out against it, which also reflects the planet's name.

## Colour palette

| Role | Colour | Hex (starting point) |
|---|---|---|
| World base: stone | Warm grey | `#6E6A62` |
| World base: grass and moss | Grey-green | `#7A8466` |
| World base: haze and sky | Pale grey-gold | `#C9C2AE` |
| **Planet / Wildborn** glow | Amber sap | `#E8A23A` |
| Planet secondary | Moss green | `#5E8C4A` |
| **Murmur / Blightborn** glow | Starlit cyan | `#5FD4E0` |
| Murmur secondary | Violet | `#8A5CD6` |
| Murmur material | Black glass | `#141821` |
| **Clamor / Scald** (Season 3) | Rust red | `#C2462B` |
| UI panels | Deep teal (from the source pages) | `#0F2A30` |
| UI headings | Warm gold (from the source pages) | `#E2B866` |

**Team colours are separate from side colours.** Your own team always has the
same outline colour; enemies always have another. Side colours are flavour;
team colours are information ([14](14-lineage-forms.md#readability-rules-competitive-game)).

## Regions at a glance

| Region | Key colours | Light | Signature visual |
|---|---|---|---|
| Heartwood | Deep green, amber | Warm shafts through the canopy | Amber SAP lakes, roots as wide as hills |
| Rootwilds | Grey-green, moss | Dappled, shifting with the breathing canopy | The canopy rising and falling |
| Underroot | Black, amber nerve-light | Dark, lit by roots and Lantern Lizards | Pulses of light running along the walls |
| Ashen Steppe | Pale grey, ochre | Flat and bright, ash in the air | Herds on the horizon |
| Hollow Mire | Grey-blue, black water | Low fog, dim | Silhouettes in the fog |
| Spirecliffs | Slate, white | High contrast, long shadows | The Vertebrae peaks |
| Bone Flats | White salt, bone, ochre | Harsh noon glare, gold at dusk | The Elder Ribs |
| Rimewastes | Ice blue, white | Cold, low sun | The Sleeper's shape under the ice |
| Cinderveil | Black, orange, red | Lava glow from below | Rivers of lava between burnt trees |
| Shattered Coast | Grey sea, cyan glints | Silver, overcast | The singing Shard Reef |
| Glasswaste | Black glass, cyan-violet | Cold glow, no warm light at all | The Frozen Herd in glass |
| Starwound | Black, violet, cyan | Pulsing from the Seed | The meteorite at the centre |

## The sky on every map

The **Fall-line** (the meteorite's scar across the sky) is visible on every
map at all times: faint by day, glowing cyan-violet at night. From Season 3, a
second, rust-red streak runs beside it. The sky tells players which season it is.

## Key art briefs

Starting points for concept artists:

1. **"The Answering":** a brood of four small grey Kith on a ridge at dusk,
   facing north. On the horizon, a glowing scar in the sky. Behind them, the
   enormous silhouette of the Mountain That Walked, now a mountain range.
2. **"Mirror":** a Wildborn Titan and a Blightborn Titan, identical shapes,
   colliding in the centre of the frame: bark and amber against black glass and cyan.
3. **"The Murmur Spreads":** a forest edge where moss turns to glass mid-leaf;
   a herd of grazers half-frozen in crystal; whispering shown as faint light ribbons.
4. **"The Sleeper":** looking down through clear ice at a giant shape, with
   its heart glowing faintly. A single crack running across the frame.
5. **"Landfall":** a rust-red streak hitting a battlefield where Wildborn and
   Blightborn creatures both turn to look up.

## UI direction

- Keep the **dark teal and gold** look from the source pages.
- **Wordless world, clear interface:** the world has no writing, but the UI
  can and should use clear text. The UI is the player's tool, not part of the world.
- Node states keep the source pages' colours: **cyan = Captured,
  gold = Inaccessible, red = Vulnerable.** Note that cyan is also the Murmur's
  colour. Captured nodes for a Blightborn player could be confused with enemy
  Blight, so the UI should show **team** ownership with team outline colours,
  not side colours. Flagged for UI design.

---

## Lighting by time of day

| Time | Light | Mood |
|---|---|---|
| **Dawn** | Low, soft, grey-gold through mist | Calm, waking |
| **Day** | The Grey Eye's diffuse light; soft shadows | Clear, readable, neutral |
| **Dusk** | Warm gold fading to violet; long shadows | The most atmospheric; the Fall-line starts to glow |
| **Night** | The Lantern moon's amber, the Fall-line's cyan-violet, and gameplay glows | Mysterious; glow becomes the main light |

**Rule:** night must stay readable. Ambient light never drops so low that
silhouettes are lost, and weak points and team outlines are always visible.

## Camera and scale

- **Third-person camera** pulls back as the creature grows: close at Base
  Form, wide at Stage 3, so the player always sees enough of the battlefield.
- **Scale references** are built into every map: trees, rocks and fossils at
  known sizes, so growth is always measured against the world.
- **Stage 3 creatures** occasionally break the top of the frame for a moment
  during transformations, to sell their size.

## Visual effects language

| Effect type | Wildborn | Blightborn | Clamor |
|---|---|---|---|
| Hit | Splinters, leaves, sap | Shards, glints | Embers, ash |
| Heal | Petals and amber motes | Glass dust and cyan motes | — |
| Capture | Roots spreading outward | Glaze spreading in fine lines | Crust spreading in blotches |
| Death | Moss and flowers | Shatter into dust | Burn-out to ash |
| Synergy | Pollen threads | Glass threads | — |

Effects are kept **short and crisp** in fights, so they never hide the action.
Bigger, slower effects are saved for world moments: Stage changes, patron
events, finales.

## Concept art priorities

In order, the pieces the art team needs first:

1. **The Kith Base Form**, both sides: the form every player starts as.
2. **One lineage through all Stages, both sides** (the Titan is the clearest test of scale).
3. **The three surface materials together:** roots, Blight and Scald side by side.
4. **One launch map in key art** (Ashfall Crossing, with the Migration).
5. **The Starwound and the Heartwood** as distant horizon views.
6. **The remaining five lineages**, both sides.
7. **The 54 creatures**, starting with those on the launch maps.

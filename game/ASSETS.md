# Assets

**No external assets are used.** Every model, texture, material, effect and
sound in the game is generated in code in this repository. There are no
third-party asset licences to track yet.

| Asset type | Source | Where | Status |
|---|---|---|---|
| Terrain | Procedural heightfield (value-noise fbm + landmark shapes) | `src/sim/terrain.ts`, `src/render/TerrainView.ts` | In use; final-style |
| Terrain material | Shader: slope/height colouring, noise detail, territory veins | `TerrainView.ts` | In use |
| Sky | Shader gradient, sun, the Fall-line band | `src/render/Scene.ts` | In use |
| Rocks, shards, roots, pebbles | Deformed icosahedra, cones, tori (instanced) | `src/render/PropsView.ts` | Placeholder-quality, stylised |
| Grass | Procedural 5-blade tufts, wind in vertex shader | `PropsView.ts` | In use |
| Kith Base Form, Titan, Brawler (3 Stages, 2 sides) | Procedural part hierarchies | `src/render/CreatureView.ts` | **Placeholder**: readable silhouettes, to be replaced by sculpted/rigged models |
| 7 wildlife species | Procedural body plans (quad, biped, hexapod, insect) | `CreatureView.ts` | Placeholder |
| Bases, Hubs, Enemy Cores, Base Hearts, node cores | Primitives | `src/render/StructureView.ts` | Placeholder |
| Particles, rings, core orbs | Custom point shader, ring geometry | `src/render/Vfx.ts` | In use |
| Environment lighting | three.js `RoomEnvironment` (MIT, part of three.js) | `Scene.ts` | In use |
| Sound effects, ambience, music | WebAudio synthesis | `src/audio/Audio.ts` | In use; placeholder-quality |
| UI | HTML/CSS, Unicode symbols for ability icons | `src/ui/` | In use |
| Font | System fonts only (no web fonts) | `styles.css` | In use |

## Libraries

| Library | Licence | Use |
|---|---|---|
| three.js 0.186.1 | MIT | Rendering |
| Vite, TypeScript, Vitest | MIT / Apache-2.0 / MIT | Build and tests (development only) |
| Playwright | Apache-2.0 | Automated browser tests (development only) |

## Rules for adding assets

For any external asset, record: source, creator, licence, URL, modification
rights and status in this file **before** committing it. No asset with an
unclear or non-commercial licence goes into the repository.

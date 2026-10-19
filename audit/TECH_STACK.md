# Architecture & Tech Stack Recommendation

Deliverable 8 (Phase 6).

## Decision

**Keep three.js + TypeScript + Vite in the browser.** Add a Node
multiplayer server (Colyseus) only when the single-player game passes its
playtest gates. Do not switch engines.

## Why not switch

The question is not "which engine is best" but "which engine is best for
*this* project, at *this* stage, with *this* developer and AI tooling".

| Criterion | three.js + TS (current) | Godot 4 | Unity | Unreal | Babylon.js |
|---|---|---|---|---|---|
| Work already done | **~5,100 lines, tested, deterministic sim** | Rewrite | Rewrite | Rewrite | Partial port (rendering only) |
| AI-assistant fit | **Excellent**: plain text code, huge public corpus, runs headless; Claude Code can build, test and screenshot it in a cloud container (proved by this repo) | Good for GDScript; scenes/editor state are harder for an AI to verify without a GPU | Editor-centric; C# fine, but scenes and prefabs are binary-ish YAML and need the editor | Editor- and C++-heavy; poor fit | Good, similar to three.js |
| Language | TypeScript | GDScript / C# | C# | C++ / Blueprints | TypeScript |
| 3D & animation | Good; skinned glTF, custom shaders; you write more yourself | Very good, built-in animation tree | Excellent | Best in class | Very good, more built-in |
| Multiplayer | Same TS sim runs on a Node server unchanged | High-level multiplayer API, but web export limits (below) | Netcode for GameObjects, paid services | Strong, heavy | Same as three.js |
| Physics / navigation | Custom (works); add `recast-navigation` if needed | Built in | Built in | Built in | Havok plugin, nav plugin |
| Platform | **Any browser, no install**; desktop wrappers possible later | Desktop/mobile/web | Everything | Desktop/console | Browser |
| Build size | 183 KB gzipped JS today | Web export is a multi-MB WASM engine **[unverified size]** | Large WebGL builds | Not for web | Similar to three.js |
| Licence / cost | MIT, free | MIT, free | Free tier with conditions; check current terms | 5% royalty above a revenue threshold; check current terms | Apache-2.0, free |
| Long-term maintainability | Good if the sim/render split is kept | Good | Good | Heavy for one person | Good |

**[unverified]** Godot 4 limitations on the web (C# projects not exportable
to web; threads requiring cross-origin isolation) are from prior knowledge;
the official page (`docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html`)
could not be opened during the audit. Unity/Unreal licence terms change
often; check them before any switch. None of this changes the decision.

**When to revisit:** if the game needs console release, very large numbers
of skinned creatures with complex animation blending, or a hired art team
working in an editor. None applies to Version B.

## First playable shape

| Option | Verdict |
|---|---|
| Local prototype | Done (v0.1.0) |
| **Single-player vs bots, in the browser** | **Next public build.** Zero server cost, works with no player base, tests the fun |
| Browser multiplayer (rooms) | After the playtest gates; 2v2 first, bots fill empty seats |
| Dedicated servers, matchmaking, ranked, accounts | Not until there is a measured player base that needs them |

## Target architecture (Version B)

```
game/
  src/
    sim/                    pure, deterministic, no DOM (runs in browser and Node)
      World.ts              match state + step (slimmed)
      systems/              economy.ts · territory.ts · structures.ts · wildlife.ts · win.ts
      lineages/             registry.ts · titan.ts · brawler.ts · verdant.ts · hollow.ts
                            (kit behaviour, passives, Synergy hooks, bot hints)
      combat.ts  rules.ts  tuning.ts  nav.ts  map.ts  terrain.ts
      botAI.ts              uses lineage bot hints, difficulty profiles
    render/  audio/  ui/  core/  game/       as today
    data/    tuning.json (+ overrides only during experiments)
server/                     (later) Colyseus room that owns a World
  rooms/MatchRoom.ts        receives intents, steps World at 30 Hz, sends snapshots
```

### The lineage registry (do this before adding lineages)

Today, lineage behaviour is spread across five files with 24
`lineage === '…'` checks. Replace with one module per lineage:

```ts
// sim/lineages/registry.ts
export interface LineageDef {
  name: Lineage;
  pair: 'Commit' | 'RootVoid';
  sizeMul: { radius: number; height: number };   // replaces World.radius/height special cases
  passive?(w: World, c: Creature, dt: number): void;
  cast(w: World, c: Creature, slot: Slot | 'ult'): void;   // behaviour for Q/E/R/Ultimate
  ultimates: { Aggression: string; Tactical: string };
  botHints: { engageRange: number; preferredSlot: Slot[] };
  view: (side: Side, form: number) => PartSpec[];         // consumed by CreatureView
}
export const LINEAGES: Record<Lineage, LineageDef> = { Titan, Brawler, Verdant, Hollow };
```

Acceptance: zero `lineage === '` string checks outside `sim/lineages/`;
all 25 existing tests still pass; headless match results unchanged for a
fixed seed (determinism test).

### Multiplayer path (when its milestone starts)

1. Wrap `World` in a Colyseus room on Node; clients send `intent` messages
   only. Colyseus is an open-source Node framework for authoritative
   servers with rooms, matchmaking and binary delta state sync, with an
   official TypeScript/JavaScript client ([docs.colyseus.io](https://docs.colyseus.io/)).
2. Send per-team snapshots (fog of war enforced on the server).
3. Client-side prediction for the local creature only; interpolate others
   (the renderer already interpolates between sim steps).
4. Empty seats become bots on the server (same `BotBrain`).
5. Host on one small VPS or Colyseus Cloud; measure cost per match-hour
   before going public.

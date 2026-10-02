# Spec 06 — Systems & Build Order

The list of systems the game needs, what each depends on, and the order to
build them in. The goal is to reach **a fun 4v4 match as early as
possible** and add everything else on top of a loop that already works.

Sizes are relative (**S** about 1–2 weeks for one engineer, **M** 3–6
weeks, **L** 2–3 months) and are only for ordering, not for scheduling.

---

## Guiding rules

1. **Server-authoritative from day one.** Greyborn is competitive 4v4. The
   30 Hz server tick, prediction and lag compensation (Spec 01) are foundations,
   not polish. Retrofitting netcode is the most expensive mistake a PvP game can make.
2. **Data-driven abilities and stats.** Every number in Specs 01–05 lives in
   `greyborn-tuning.xlsx`, is exported to data files, and is hot-reloaded in
   playtest builds. Designers tune without engineers.
3. **Grey-box first.** Placeholder capsules and cubes until the loop is fun.
   Art follows proven gameplay.
4. **Mirror before asymmetry.** Build one side's rules once. Wildborn and
   Blightborn are a **skin layer** applied at the end of the pipeline.
5. **One map, one pair, then widen.** Each milestone proves one part of the
   loop with the smallest content set that can show it.

## Open decisions before production

| Decision | Options | Needed by |
|---|---|---|
| Engine | Any engine with strong server-authoritative networking and large-creature animation support | M0 |
| Platform at launch | PC only · PC + consoles | M0 (input, performance budget) |
| Backend | Build own · use a hosted game-backend service | M8 |
| Business model | Free-to-play with cosmetics (fits `gdd/26` Collection) · premium | M8 |

These are the director's calls; nothing in Specs 01–05 depends on which is chosen.

---

## The systems

| ID | System | Spec / GDD | Depends on | Size |
|---|---|---|---|---|
| **F1** | Netcode: server tick, client prediction, lag compensation, replication | Spec 01 | — | L |
| **F2** | Data pipeline: spreadsheet → data files → hot reload | Spec 01–05 | — | S |
| **F3** | Character controller and camera (sizes by Stage, turn rates, Evade, sprint, climb, swim) | Spec 01 | F1 | M |
| **F4** | Stats, damage, healing, CC, Tenacity, immunity windows | Spec 01 | F1, F2 | M |
| **F5** | Ability framework: Q/E/R, passives, basics, ranks, cooldowns, wind-ups, channels, interrupts | Spec 02 | F4 | L |
| **F6** | Hitboxes and **weak points** (per-angle exposure, break counter, regrowth) | Spec 01–02 | F4, F5 | M |
| **F7** | Visibility: sight radii, fog of war, reveal, stealth | Spec 01 | F1 | M |
| **F8** | **Sound signatures** (footstep ranges by Stage, carry tiers, lineage modifiers) | Spec 01 | F7 | S |
| **E1** | Evolution cores: drop, pickup, carry cap, dropped-core timer | Spec 05 §3 | F4 | S |
| **E2** | Conversion: channels C1–C3, aggression bonus, field conversion, Resonance | Spec 05 §4 | E1, T4 | S |
| **E3** | Levels and EXP curve; multi-level conversion; Stage transformations (1.5 s invulnerable) | Spec 05 §2 | E2 | M |
| **E4** | Stat growth by level (S-curve table), Tenacity, Dominance | Spec 01, 05 | E3 | S |
| **E5** | Branch choice at L10, upgrades at L10/L15 | Spec 02 | E3, F5 | S |
| **E6** | Ultimate choice and Ultimates at L20 | Spec 03 | E5 | L |
| **E7** | Death, bounty, respawn timer | Spec 05 §3, §9 | E1 | S |
| **T1** | Map grid: cells, nodes, adjacency, Captured / Vulnerable / Inaccessible | Spec 05 §5 | F1 | M |
| **T2** | Rooting and uprooting channels; contested channels; Territorial Growth | Spec 05 §5 | T1, F5 | M |
| **T3** | Territorial Influence; passive income; Dominance input | Spec 05 §5 | T1 | S |
| **T4** | Structures: Hubs (Defense levels, attack stages), Enemy Cores, Base Heart | Spec 05 §7 | T1, F4 | M |
| **T5** | SAP: extraction, Hub bonus, sinks | Spec 05 §6 | T1, T4 | S |
| **T6** | Roots and Blight **visuals** on the grid (the skin layer) | `gdd/10`, `gdd/23` | T1 | M |
| **S1** | Pair system: partner tracking, Resonance, Attunement | Spec 02 | F5, E3 | S |
| **S2** | Synergies: unlock by level, tiers S1–S3, phase matrix, cooldowns | Spec 02 | S1, M1 | M |
| **S3** | Cross-resonance (12 non-pair combinations) | Spec 02 | S1 | M |
| **W1** | Creature AI framework: temperaments, aggro, leash, reset, packs and herds | Spec 04 | F4, F7 | L |
| **W2** | Wildlife spawns, respawn, phase scaling, income cap, affinity | Spec 04 | W1, E1 | S |
| **W3** | Creature behaviours that touch other systems (grazing erosion, webs, tunnels, reveals) | Spec 04 | W1, T2, F7 | L |
| **W4** | Infect / Rally and the territory-hostility rule | Spec 04 | W1, T1 | M |
| **W5** | Tier IV Apex creatures and core split | Spec 04 | W1 | M |
| **M1** | Match flow: phases, timers, phase rules | Spec 05 §1 | T1, F5 | S |
| **M2** | Tension, regions, event deck, patron decks | Spec 05 §8 | M1, T3 | M |
| **M3** | Global events (11 at launch) | Spec 05 §8 | M2, W5 | M |
| **M4** | Win conditions, overtime, surrender, mercy | Spec 05 §10 | M1, T3, T4 | S |
| **M5** | Sides: assignment per match, skin swap for everything | `gdd/06`, `gdd/23` | T6 | M |
| **M6** | Draft: bans, picks, pair slots | `gdd/06` | M5 | S |
| **U1** | Combat HUD: Health, cooldowns, carried cores, EXP bar, partner level | `gdd/03` | E3 | M |
| **U2** | Minimap and territory UI; TI bar; Tension meters | `gdd/05` | T3, M2 | M |
| **U3** | Calls (the wordless call wheel) | `gdd/25` | F1 | S |
| **A1** | Audio: sound signatures as real sound, side palettes, phase cues | `gdd/19` | F8, M1 | L |
| **A2** | Creature art pipeline: Base Form → 7 lineages × 3 Stages × 2 sides | `gdd/14`, `gdd/23` | — | L (ongoing) |
| **A3** | Map pipeline: Ashfall Crossing first, then the other two launch maps | `gdd/16` | T1 | L (ongoing) |
| **B1** | Accounts, matchmaking, parties, pair queueing | `gdd/27` | — | L |
| **B2** | Ranked (The Answering), casual, Brood Skirmish 2v2, The Den | `gdd/27` | B1, M4 | M |
| **B3** | Collection: Growths, Memories, cosmetics | `gdd/26`, `gdd/38` | B1 | M |
| **B4** | War Map and community goals | `gdd/18` | B1, telemetry | M |
| **B5** | Onboarding: The First Budding | `gdd/25` | Core loop complete | M |
| **B6** | Telemetry and the balance dashboard (all tuning targets in Specs 02–05) | All specs | F2 | M |
| **L1** | Stillheart (7th lineage) | Spec 02–03 | Launch | M |
| **L2** | The Clamor: Landfalls, Scald, Clamor creatures, the Roar | Spec 04, `gdd/37` | Launch | L |
| **L3** | The Truce (co-op) and the Hushed Answers | Spec 04, `gdd/40` | L2 | L |
| **L4** | The Turns (Bloom, Ash, Rime, Fever) | Spec 04, `gdd/29` | Launch | M |

---

## Production order (milestones)

### M0 · Foundations (no gameplay yet)

**Build:** F1, F2, F3, F4.
**Exit:** two capsules can move, Evade and hit each other over a network with
100 ms simulated latency, and it feels fair from both ends. A designer
changes a damage value in the spreadsheet and sees it in-game without a rebuild.

### M1 · The duel (one pair, 1v1)

**Build:** F5, F6, E7. Base Form plus **Titan and Brawler** (the Commit
pair: the simplest kits, and the stagger and CC rules get stressed hardest).
**Exit:** 1v1 at fixed Stage 1 is fun for 10 minutes in a grey box. Weak
points break and regrow correctly. CC immunity windows prevent chain-locks.

### M2 · The evolution loop (2v2)

**Build:** E1, E2, E3, E4, E7, F7, F8, U1 (basic). A small grey-box map with
a base, wildlife stand-ins (static core piñatas), and two Hubs as plain
conversion points.
**Exit:** players feel the *carry or return* decision. Stage transformations
are a moment. Being heard while carrying 300+ is tense. This is the most
important milestone: if this loop isn't fun, stop and fix it before
building territory.

### M3 · Territory (2v2 → 4v4)

**Build:** T1, T2, T3, T4, T5, M1, M4, U2 (basic). Add **Verdant and
Hollow** (the territory pair).
**Exit:** a full 4v4 match on a grey-box Ashfall Crossing, start to finish,
with phases, Hubs, Enemy Cores, a Base Heart and a winner. Matches last 18–25 minutes.

### M4 · The full roster

**Build:** **Thornrunner and Bonespire** (the Hunt pair), E5, S1, S2, S3.
**Exit:** all six launch lineages, both branches, all three Synergies and
cross-resonance playable. Pick rates in internal tests aren't wildly lopsided
(no lineage under 8% or over 25%).

### M5 · Living world

**Build:** W1, W2, W3, W4, W5, M2, M3. Start with the **20 creatures** that
the Ashfall Crossing and Elder Ribs use (`gdd/16`), then the rest.
**Exit:** wildlife makes up 15–20% of EXP in test matches. Tension builds
and events fire in Phase 3. Patron decks help the team that's behind
without deciding matches.

### M6 · Stage 3

**Build:** E6 (all 42 Ultimates, in the order: the six Aggression
Ultimates with the simplest effects first, flagged ones last).
**Exit:** first L20 at 16–18 minutes; Ultimates decide fewer than 25% of
matches within 10 s of a cast (Spec 03).

### M7 · Two sides

**Build:** T6, M5, M6, A1. The full skin swap: every lineage, structure,
creature and sound in Wildborn and Blightborn versions.
**Exit:** a player can tell which side anything belongs to in under a
second, from silhouette and colour alone, and with the colour-blind modes on.

### M8 · Vertical slice (one finished map)

**Build:** A2 and A3 to final quality for **Ashfall Crossing** and all six
lineages at all Stages. U3 (calls), B6 (telemetry).
**Exit:** the slice could be shown publicly. All Spec 02–05 tuning targets
are measured automatically from playtests.

### M9 · Online

**Build:** B1, B2, B5. Then the other two launch maps (the Elder Ribs,
Breathing Canopy) through A3.
**Exit:** strangers can find a match, play it, and come back. The First
Budding takes a new player to their first real match in under 20 minutes.

### M10 · Launch

**Build:** B3, B4 (War Map with Season 1 goals), the Season 1 finale (the
Glass Range, Spec 04).
**Exit:** Season 1 content complete (`gdd/20`); a closed beta's balance data
inside the tuning targets.

### After launch (in season order)

| Season | Builds |
|---|---|
| 2 | The Turns (L4); new maps from `gdd/42` |
| 3 | **Stillheart** (L1); **the Clamor** (L2): one Landfall per match, Scald; the Truce (L3, first version) |
| 4 | The Glass Flower content; Season 4 creatures (#43–#46) |
| 5–7 | The Hushed Answers in rotation; the Roar; two Landfalls per match; the story through `gdd/51` |

---

## Dependency map (simplified)

```
F1 Netcode ──► F3 Controller ──► F4 Stats/CC ──► F5 Abilities ──► F6 Weak points
                                     │                │
                                     ▼                ▼
                               E1 Cores ──► E2 Convert ──► E3 Levels ──► E5 Branches ──► E6 Ultimates
                                     │            ▲              │
                                     ▼            │              ▼
                               W1 Creature AI   T4 Hubs      S1 Pairs ──► S2 Synergies / S3 Cross-resonance
                                     │            ▲
                                     ▼            │
                               W2–W5 Wildlife   T1 Grid ──► T2 Rooting ──► T3 TI ──► M2 Tension ──► M3 Events
                                                  │
                                                  ▼
                                               M1 Phases ──► M4 Win conditions
F2 Data pipeline feeds everything.  T6 / M5 skin the result for both sides.
```

## Risks and the milestone that retires each

| Risk | Retired by |
|---|---|
| Large creatures (Stage 3, 7.5 m) feel bad in close combat | M1 (camera and hitbox tests at all four sizes, even before Stage 3 exists) |
| Carry-and-return loop isn't fun | M2 |
| Matches too long or too short | M3 |
| One lineage or Synergy dominates | M4, then telemetry from M8 |
| Wildlife distracts from PvP | M5 |
| Ultimates end matches too suddenly | M6 |
| Sides confuse players | M7 |
| Netcode can't handle 8 large creatures and 50+ wildlife | M0 load test, rechecked at M5 |

## Team shape for production (suggested)

| Discipline | Core team through M5 | Adds for M6–M10 |
|---|---|---|
| Gameplay engineering | 4 | +2 |
| Network / server engineering | 2 | +1 |
| Backend / online | — | 3 |
| Game design (systems, combat, maps) | 3 | +1 (live) |
| Creature art and animation | 3 | +6 |
| Environment art | 1 | +4 |
| Audio | 1 | +1 |
| UI / UX | 1 | +1 |
| QA | 1 | +3 |
| Production | 1 | +1 |

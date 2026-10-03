# 00 — Source Pages (pp. 120–124) — Transcription & Decoding

These are the five pages of the **Greyborn Game Design Document v1.0** shared
on 2026-10-02 (Chapter 6 §6.8–6.13, Chapter 7 Tactical Notes and Chapter 11
§11.5). The page images contain garbled text, which is common in AI-generated
mock-ups. This file records:

- **Clear:** text that is legible and unambiguous.
- **Decoded:** garbled text, with the most likely intended reading.
- **Interpreted:** what a value or diagram most likely *means* as a rule. These are
  design proposals for the director to confirm; see [08 — Open Questions](08-open-questions.md).

Every other doc in `gdd/` builds on this file. If a source page and a doc
disagree, the source page wins until the director decides.

---

## p. 120 / 122 — Chapter 11: Progression & Evolution System

**Clear**
- Tagline: *"Kills fuel evolution. Returns fuel tactical choice. Dominate the map."*
- Alt subtitle (p. 122): *"Evolve to Dominate: From Base Form to Ascendant Roster."*
- Evolution stages: **Stage 1 (Base Form)** → **Stage 2 (Enhanced Form)** → **Stage 3 (Ultimate Form)**.
- **Evolve by:**
  1. **Getting Kills** (collect evolution cores)
  2. **Destroying Enemy Cores** (deny enemy progression)
  3. **Returning to Base** (risky but strategic)
- Progression mechanics: evolution amplifies **specific capabilities**,
  **sound signatures** and **Territorial Tension**. *"Returns to base are risky
  but reward aggression."*
- §11.5 **Evolution and Synergy Tracks: Progression & Conversion Mechanics**.
- **Node Status:** Captured · Inaccessible · Vulnerable.
- Hub panels: **Hub Health vs. attack stage**, **Hub Defense Level (1–10)**, Node Vitality.
- **Weak Point Access & Removal State:** S1: 15s · S2: 12s · S3: 9s.
- Charts: *Global Territorial Growth vs. Territorial Influence* (C1 15s, C2 12s, C3 9s).
- Footer cards: **Matchup Data:** conversion efficiency · **Team Coordination:** impact on Synergy and Control.
- p. 122 adds a **Progressive Tree** branching between **Aggression** and **Tactical Control**.

**4v4 Synergy Access Matrix vs. Game State (p. 120 version, the only legible one)**

| Row | S1 | S2 | S3 | State (decoded) |
|---|---|---|---|---|
| S1 | 15s | 12s | 9s | Stable Flow |
| S2 | 15s | 12s | 9s | "Pret-Aog Ress-cast control" → **Pre-Aggro Resource Control** |
| S3 | – | 31s | 20s | "Resource and Reopirce Stage" → **Resource Stage** |
| S4 | – | – | 9s | "Thornrunna and Bonstruction" → **Thornrunner & Bonespire** (likely *Hunt / Destruction* phase) |

**Interpreted:** the rows are **match phases**, the columns are **synergy tiers**,
the cells are synergy **cooldowns**, and "–" means that tier is locked in that
phase. See [04 — Synergies](04-synergies.md#synergy-access-by-match-phase).

## p. 121 — Chapter 11: Territorial Growth

**Clear**
- *Territorial Growth Visualisation*: a branching tree of Capture Control /
  Territorial Control / Capture Bonus nodes ("Captural Poxee", "Territorial Dross" are garbled repeats).
- An Ascendant plants a root into a node → **Captured nodes**.
- *"Root control amplified global territorial growth and event resource gain."*
- *"Resource Hub control is vital. Global Territorial Influence and Resource Gain are amplified."*
- *Territorial Access: specific capabilities and sound signatures are amplified.*
- Player stat curves, **Level 1 vs. Level 20**: **Health, Power, Speed, Control**.
- Tactical Notes: *Global Event Synergy tracks (e.g. node grid synergy level 6).*

**Unclear:** "18 months … Dost-Tamur" next to a hub cube icon. It may be a
production note (an 18-month timeline?) or a place name. Flagged in open questions.

## p. 123 — §6.12: Ascendant Evolution Track & Territorial Tension

**Clear**
- Level markers: **Level 1 → Level 3 → Level 10 → Level 20**. Level 1 is a
  humanoid figure; Level 20 is a huge monster ("Posed Wireframe Form").
- *Progression-focused benefits:*
  - **Synergy 1:** Verdant + Hollow synergy **level 5**: *localized void interdependency*.
  - **Synergy 2:** Titan + Brawler synergy **level 10**: *momentum conversion level 3, global evolution control rate level 2*.
- **Evolution Branching & Progression Track:** Aggression ↔ Tactical Control, ending in 6 leaf abilities.
- **Pre-Attack vs. Post-Attack** map diagram: *showing new paths & blocked areas*.
- *Resource Hub control amplified global territorial growth and event resource gain.*
- **Node Survival Time vs. Grid Cell Area:** S1: 5s · S2: 4s · S3: 3s.
- Charts: *Conversion Efficiency vs. Local Instability*; *Global Economy Stability vs. Team Action Duration* (**C1: 18s · C2: 15s · C3: 12s**).

**Conflict:** the C-values are 18/15/12 here but 15/12/9 on pp. 120–122. This needs a decision.

## p. 124 — §6.13: Ascendant Combat Interdependencies

**Clear**
- Evolution strip: humanoid (Level 1) → … → giant (Level 20).
- **Titan + Brawler combo:** *synchronized commitment interdependency*.
- Synergy cards:
  - **Verdant + Hollow:** *creates localized void field* (**Level 12+**).
  - **Titan + Brawler:** *coordinated smash and roll commit* (**Level 18+**).
  - **Thornrunner + Bonespire:** *co-stalk on targeted weak point* (**Level 15+**).
- **Ascendant Capabilities, Synergy Tracks:** S1: 15s · S2: 12s · S3: 9s.
- **Monster Evolution:** Level 1 → growth-detailed forms → hyper-rooted growths → hyper-detailed forms (Level 20+).
- *"High-Level Territorial Dominance replaces tenacity bonuses…"* (the rest is garbled).
- **Verdant + Hollow:** *unique capability bonuses to global control for 50%*.
- *Returns to base and conversion efficiency*; *Resource efficiency vs. Ascendant level*.
- Tactical Notes (§6.8 & 6.9): *coordinated interdependent abilities*.

## Recurring sidebar (all pages) — Synergy: Evolution-Sync Resonance

- **Synergy 1 (progression-focused):** Verdant + Hollow node network: **SAP extraction level 3, territory growth rate level 2**.
- **Synergy 2 (progression-focused):** Titan + Brawler synergy level 10: **momentum conversion level 3** (one page says "resource conversion"), **global evolution control rate level 2**.

## Names & identifiers found

| Term | Type | Notes |
|---|---|---|
| **Greyborn** | Planet | The game's world (confirmed by the director, 2026-10-02) |
| Titan, Brawler, Verdant, Hollow, Thornrunner, Bonespire | Ascendant lineages | 6 shown; the 6-icon team panel suggests the roster is 6 at minimum |
| Evolution cores | Resource | Dropped on kills |
| Enemy Cores | Map structure | Destroying them denies enemy progression |
| SAP | Resource | Extracted from nodes |
| Resource Hub | Map structure | Hub Defense Level 1–10 |
| Base | Map structure | Where you return to convert cores |
| Ascendant | Player character | The evolved monster form |
| vaelmoor.gg | Footer URL | Spelled "vaelmoor / vaeimoor / yaelmoor"; probably the studio name, or a region of Greyborn: **Vaelmoor** |

---

## What the pages look like

All five pages share one layout, which sets the visual language for the
whole project ([23](23-art-direction.md#what-the-source-pages-already-show)).

- **Header strip:** "VERSION 1.0 CONFIDENTIAL" repeated across the top, with
  "GREYBORN GAME DESIGN DOCUMENT" in the centre.
- **Footer:** "GREYBORN GAME DESIGN DOCUMENT", the page number (120–124) and the domain (vaelmoor.gg, spelled several ways).
- **Main area:** a large banner title over painted key art (misty mountains,
  a glowing green crater-like structure), with panels below.
- **Right sidebar:** "Chapter 7 / Chapter 11 Tactical Notes" and a boxed
  "Synergy: Evolution-Sync Resonance" panel, repeated on every page.
- **Colour:** deep teal panels, warm gold headings, white body text, thin bright lines.
- **Creature art:** glowing blue-white **wireframe** 3D monsters: hulking bipeds,
  a crouched brawler, an insect-like quadruped with long legs, a spined
  creature, and a slim humanoid at Level 1.
- **Stage art (pp. 120, 122):** three stacked images: Stage 1 as a grey
  wireframe brute; Stage 2 as a creature wrapped in **glowing green vines**;
  Stage 3 as a creature of **lava and rock**.
- **Diagrams:** a branching tree of diamond-shaped nodes with small icons; a
  wireframe **cube grid** labelled with Hub Health, Hub Defense and Node Status;
  line charts with two to three coloured curves and S1/S2/S3 or C1/C2/C3 labels;
  a **world-map heat map** in a "4v4" panel; and a cluster of **six coloured
  diamond icons** (green, orange, purple, blue and others), probably lineage icons.

## Garbled text index

Every garbled phrase on the pages, and how it was read:

| As printed | Decoded as | Confidence |
|---|---|---|
| "Posed Wiretrer details" | Posed wireframe details | High |
| "Ability User interactions" | Ability/user interactions | Medium |
| "Abilitiee's abilities" | Abilities | High |
| "interdependencis" | interdependencies | High |
| "Hyper-drolulation hyper-rooted growtts" | Hyper-detailed / hyper-rooted growths | Medium |
| "tenacity Bonuses for conesabillising" | tenacity bonuses for consolidating(?) | Low |
| "more interepen dency evil and square" | (unreadable) | None |
| "territorial beirring, territorial agenncies" | territorial bearing / agencies(?) | Low |
| "Pret-Aog Ress-cast control" | Pre-Aggro Resource control | Medium |
| "Resource and Reopirce Stage" | Resource Stage | High |
| "Thornrunna and Bonstruction" | Thornrunner and Bonespire (and destruction?) | Medium |
| "Monserrs Node and roll control" | Monsters' node and roll control | Medium |
| "globalcable globales" / "unstable globales" | global tables / unstable globals | Low |
| "Captural Poxee", "Captural Bonse", "Territorial Dross" | Capture Bonus / Territorial control | Medium |
| "18 months … Dost-Tamur" | Unknown: a timeline or a place name | None |
| "momentium cot" | momentum conversion | High |
| "synchtonized" | synchronized | High |
| "vaeimoor.gg", "yaelmoor.gg" | vaelmoor.gg | High |
| "Evolution and ban" | Evolution and bans(?) / Evolution and branching(?) | Low |
| "(MAGE 1)" | (STAGE 1)(?) | Medium |

Low-confidence readings were never used as decisions. They're listed in [08](08-open-questions.md) where they matter.

## Every number on the pages, and where it's used

| Number | Where on the pages | Used in the design as |
|---|---|---|
| **Level 1, 3, 10, 20** | Evolution strips | Base Form, lineage awakening, Stage 2, Stage 3 ([03](03-evolution-system.md)) |
| **Level 12+, 15+, 18+** | Synergy cards | Void Garden, Co-Stalk, Smash & Roll unlocks ([04](04-synergies.md)) |
| **S1 15s · S2 12s · S3 9s** | Synergy tracks; weak point panel | Synergy tier cooldowns; weak-point regrowth by Stage |
| **31s, 20s** | Access matrix, row S3 | Phase 3 Synergy cooldowns |
| **"–"** | Access matrix | Tier locked in that phase |
| **C1 15s · C2 12s · C3 9s** (pp. 120–122) | Charts | Conversion channel times by Hubs held |
| **C1 18s · C2 15s · C3 12s** (p. 123) | Charts | Alternative values, open question |
| **5s, 4s, 3s** | Node survival vs. grid cell area | Uproot time per cell by Synergy tier |
| **Hub Defense Level 1–10** | Cube panel | Hub upgrade levels ([05](05-territory-and-economy.md)) |
| **Synergy level 5, 10** | Sidebar | Resonance perk thresholds |
| **SAP extraction level 3; territory growth rate level 2** | Sidebar | Void Garden Resonance perks |
| **Momentum conversion level 3; global evolution control rate level 2** | Sidebar | Smash & Roll Resonance perks |
| **50%** | "global control for 50%" | Void Garden capture-speed bonus |
| **4v4** | Every page | The match format |

## Traceability: from source to chapter

| Source element | Built out in |
|---|---|
| "Kills fuel evolution. Returns fuel tactical choice. Dominate the map." | [01](01-vision.md), [03](03-evolution-system.md) |
| Stage 1 / 2 / 3 forms | [03](03-evolution-system.md), [14](14-lineage-forms.md) |
| Evolve by kills / Enemy Cores / returning to base | [03](03-evolution-system.md) |
| "Sound signatures are amplified" | [03](03-evolution-system.md), [19](19-sound-and-music.md) |
| "Territorial Tension is amplified" | [05](05-territory-and-economy.md) |
| Node Status: Captured / Inaccessible / Vulnerable | [05](05-territory-and-economy.md), [33](33-structures.md) |
| Hub Health vs. attack stage; Hub Defense 1–10 | [05](05-territory-and-economy.md), [33](33-structures.md) |
| Root control; Resource Hub control | [05](05-territory-and-economy.md) |
| The six lineages | [02](02-ascendant-roster.md) |
| The three Synergies | [04](04-synergies.md) |
| Evolution-Sync Resonance | [04](04-synergies.md) |
| Synergy Access Matrix vs. Game State | [04](04-synergies.md), [06](06-match-flow.md) |
| Weak point access and removal | [04](04-synergies.md) |
| Aggression / Tactical Control branching | [31](31-evolution-branches.md) |
| Pre-attack vs. post-attack map diagram | [05](05-territory-and-economy.md) |
| Player stats (Health, Power, Speed, Control) | [02](02-ascendant-roster.md), [03](03-evolution-system.md) |
| Tactical Notes (Chapter 7) | [07](07-tactical-notes.md) |
| "High-Level Territorial Dominance replaces tenacity bonuses" | [03](03-evolution-system.md) |
| The world-map heat map | [18](18-the-answering-war.md) |
| The visual style | [23](23-art-direction.md) |

## What the pages don't cover, and how the gaps were filled

| Gap | Filled by | Status |
|---|---|---|
| The world and its story | [10](10-world.md) and the lore chapters | Mostly decided by the director |
| The win condition | [06](06-match-flow.md) | Proposed |
| Map layouts | [16](16-launch-maps.md), [42](42-new-maps.md) | Proposed |
| Ability kits | [02](02-ascendant-roster.md), [31](31-evolution-branches.md) | Proposed |
| The economy's numbers | [03](03-evolution-system.md), [05](05-territory-and-economy.md) | Proposed |
| Wildlife | [09](09-wildlife.md), [34](34-far-region-creatures.md) | Decided in principle; details proposed |
| Live service (seasons, War Map) | [18](18-the-answering-war.md) and the season chapters | War Map model decided; seasons' directions decided |
| Monetisation | — | Open ([08](08-open-questions.md)) |

## Pages still wanted

The source document runs to at least 124 pages, and only five were shared.
These pages would most improve the design if they exist:

1. **The win condition** and match structure (probably Chapter 6).
2. **The map** or maps referenced by the world-map panel.
3. **The rest of Chapter 11**: the full evolution tables and branch trees.
4. **Chapter 7 in full**: the Tactical Notes the sidebars summarise.
5. **Any lore chapter**: to check against what's been built here.
6. **The page explaining "18 months … Dost-Tamur".**

Any page shared later will be transcribed here and will take priority over
proposals that contradict it.

## Reading the art for intent

The pages' images say things their text doesn't:

| Image | What it suggests | How the design used it |
|---|---|---|
| Glowing wireframe monsters | A 3D game with large, detailed creatures | 3D third-person assumed ([01](01-vision.md)) |
| A slim humanoid at Level 1 | Players start small and humanoid | The Kith Base Form ([45](45-the-kith.md)) |
| Stage 2 wrapped in green vines | Growth and nature in evolution | Wildborn growth; the Verdant look ([14](14-lineage-forms.md)) |
| Stage 3 of lava and rock | Late forms tied to fire and earth | The Cinderveil and Titan Ultimate forms |
| A monster planting a root into a node | Territory is claimed by rooting | Rooting as the capture action ([05](05-territory-and-economy.md)) |
| A glowing green crater in the key art | A strange, glowing landmark | Echoed in the Starwound and crater zones |
| A world-map heat map | Territory at planet scale | The War Map ([18](18-the-answering-war.md)) |
| Six coloured diamond icons | Six lineages with their own colours | Lineage icons in the draft and HUD |

## How new pages will be handled

When more of the source document is shared:

1. **Transcribe** every legible line into this chapter, page by page.
2. **Decode** garbled text into the index above, with a confidence level.
3. **Compare** with existing chapters, and list every conflict in [08](08-open-questions.md).
4. **Defer to the source** where it's clear: proposals that contradict it are revised.
5. **Log** the change in the iteration log.

## The source pages, in one sentence

**Five pages that describe a 4v4 game of evolving monsters, paired
Synergies and living territory, and that everything else in this design was
built to serve.**

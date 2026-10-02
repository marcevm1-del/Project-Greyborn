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

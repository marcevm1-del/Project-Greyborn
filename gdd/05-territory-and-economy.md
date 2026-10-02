# 05 — Territory & Economy

Greyborn has **two currencies with separate jobs**:

| Currency | Belongs to | Earned by | Spent on |
|---|---|---|---|
| **Evolution cores → EXP** | Each player | Kills, Enemy Cores, conversion | Levels and Stages (personal power) |
| **SAP** | The team | Extraction from captured nodes | Hub Defense, Verdant's Sap Draw, global-event responses (team power) |

## The map grid

- The map is a grid of **cells** grouped into **nodes** (1–6 cells each), connected by paths.
- *Proposal:* about **30 nodes** and **5 Resource Hubs** (2 near each base, 1 in the
  centre), 3 Enemy Core sites per team, and one base per team at opposite ends.

### Node states (from the source pages)

| State | Meaning | What you can do |
|---|---|---|
| **Captured** | Your team has rooted it | Extract SAP; it adds to your Territorial Influence |
| **Vulnerable** | Neutral, or enemy-held and connected to your territory | Capture it (neutral) or uproot it (enemy) |
| **Inaccessible** | Not connected to your territory, or locked by the current phase | Nothing yet. Expand toward it first |

**Pre-attack vs. post-attack** (p. 123): capturing or losing a node changes the
graph. **New paths open** (adjacent nodes become Vulnerable), and nodes behind
the front become **blocked** for the enemy. The map literally reshapes during
a push.

### Rooting (capturing)

- Any Ascendant can **Root**: a 4 s channel, interrupted by damage. Verdant takes 2 s.
- **Control** stat scales channel speed: −1% time per 2 Control.
- **Uprooting** an enemy node: see [04](04-synergies.md#node-survival-under-synergy-pressure)
  (time = cells × 5/4/3 s by synergy tier).
- *"Root control amplified global territorial growth and event resource gain."*
  Every rooted node adds to:
  - **Global Territorial Growth:** your territory slowly spreads into adjacent
    neutral *cells* by itself, about 1 cell per 20 s per border node;
  - **event resource gain:** a bigger share of the rewards when a global event fires.

## Territorial Influence

**Territorial Influence (TI)** = the % of the map's cells your team controls.
TI drives:
- passive cores per player (see [03](03-evolution-system.md#three-ways-to-evolve-from-the-source-page));
- SAP income;
- **High-Level Territorial Dominance** bonuses from Level 16 on;
- the time-limit tiebreak (see [06](06-match-flow.md)).

## Resource Hubs

*"Resource Hub control is vital. Global Territorial Influence and Resource Gain are amplified."*

- Hubs are large nodes with a structure. Holding one gives **+15% SAP and +10% TI weight** each.
- **Hub Defense Level 1–10:** upgraded with SAP (cost 100 × next level). Each level adds
  +400 Hub Health and +5% damage reduction for allies inside the hub.
- **Attack stages** (*"Hub Health vs. attack stage"*):
  1. **Shielded** (100–66% Health): only damage from Stage 2+ Ascendants counts.
  2. **Exposed** (66–33%): the hub's roots show; it can be uprooted like a node.
  3. **Collapsing** (< 33%): uprooting completes **2× faster**, and the defenders get a warning.
- Holding Hubs speeds up your team's **base conversion** (C1/C2/C3; see [03](03-evolution-system.md#returning-to-base-conversion)).
- A captured Hub also works as a **field conversion** point at 70% efficiency.

## SAP

- Each captured node extracts **1 SAP/s per cell**; Hubs give **+15%** each.
- Verdant + Hollow's **SAP extraction level 3** perk adds +30% on Verdant-rooted nodes.
- Sinks: Hub Defense upgrades, Verdant's Sap Draw, and **event responses**
  (spend SAP to claim a global event's reward for your team; see below).

## Territorial Tension & global events

*"Territorial Tension is amplified"* (p. 120) · *"interdependent global events with specialized effects"* (p. 124).

- Wherever the two teams' territories **touch**, that border builds **Tension** (0–100).
  Fighting there and Ascendants of higher Stages raise it faster.
- At **100 Tension**, a **global event** fires in that region. Proposed event deck:

| Event | Effect | Synergy it favours |
|---|---|---|
| **Rootquake** | All nodes in the region become Vulnerable for 30 s | Verdant + Hollow |
| **Marrow Storm** | Weak points are exposed for everyone in the region for 20 s | Thornrunner + Bonespire |
| **Stampede** | Stagger effects last 50% longer; Momentum gain is doubled | Titan + Brawler |
| **SAP Surge** | A SAP geyser spawns; the first team to spend 200 SAP claims it, and it then produces 3× SAP for 60 s | Any |
| **Core Bloom** | 400 loose cores spawn in the centre of the region | Hunters and divers |

- Each event favours a pair. That's the "interdependent" part: events reward
  teams that brought the right pair, or that rotate to the event their pair is good at.

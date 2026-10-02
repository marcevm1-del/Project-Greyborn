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

### Patron decks (nature fights back)

The table above is the **neutral deck**. Two patron decks are added (lore in [10](10-world.md)):

| Deck | Fires when… | Example events |
|---|---|---|
| **Planet Pulse** (Greyborn) | The Wildborn are **behind** by more than 5% Territorial Influence | **Heartquake:** all Blight in the region cracks; Blightborn nodes there become Vulnerable · **Healing Bloom:** Wildborn in the region regenerate 3% Health/s for 15 s · **The Old Tall wakes** and hunts Blightborn |
| **Murmur Surge** (the hive mind) | The Blightborn are **behind** by more than 5% | **Shard Rain:** meteor shards fall and damage Wildborn structures · **Thousand Whispers:** all Wildborn are revealed for 10 s · **Blighted Wyrm** erupts and hunts Wildborn |
| **Neutral** | Territorial Influence is within 5% | Rootquake, Marrow Storm, Stampede, SAP Surge, Core Bloom |

The losing side's patron intervenes. In lore, the planet and the Murmur each
protect their own. In design, it's a built-in comeback mechanic (see risk #1 in [08](08-open-questions.md)).

### Roots and Blight

Both sides capture with the same rules. Only the material and the words
change: Wildborn **root** and **purge**; Blightborn **blight** and **consume**.
Each map has a **Starwound crater** (Blight spreads 2× faster) and a mirrored
**Heartwood grove** (roots spread 2× faster).

---

## Territory in practice: watching a border

Two nodes face each other across a narrow stream: one rooted by the Wildborn,
one blighted by the Blightborn. Where their cells meet, the ground is a
tangle: roots pushing into the stream from one bank, glassy Glaze creeping in
from the other. This is a **border**, and it builds **Tension**.

Every fight near the border raises it. Every Stage 2 or Stage 3 creature
nearby raises it faster. Players hear a low drone begin at 75. At 100, the
border erupts: a global event fires. If the Wildborn are behind on
Territorial Influence, the ground under the Blight cracks open in a
**Heartquake**. If the Blightborn are behind, glass shards rain down on the
Wildborn's structures in **Shard Rain**. If the teams are close, a neutral
event fires: a Rootquake, a Stampede, a SAP Surge.

Borders are where the map is most alive, and most dangerous.

## SAP spending: examples

| Situation | Spend | Why |
|---|---|---|
| Early, holding two Hubs | Hub Defense on the more exposed Hub to Level 3 (600 SAP) | Makes the first enemy push slower |
| A Verdant in a long fight | Sap Draw heals (SAP cost per heal) | Keeps the front line alive without returning |
| SAP Surge event nearby | 200 SAP to claim the geyser | Three times the SAP for 60 s |
| Late, ahead | Hub Defense to Level 8+ on all held Hubs | Locks in the lead before Phase 4 |
| Late, behind | Save SAP for event responses and Sap Draw | Hub upgrades won't matter if the Hubs fall |

## Global events, described

**Rootquake.** The ground in the region heaves. Every node in it becomes
Vulnerable for 30 seconds, roots and Blight alike torn loose. A scramble.

**Marrow Storm.** Wind full of bone dust sweeps the region, and every
creature's weak point glows through it. For 20 seconds, the Hunt pair is king.

**Stampede.** Every herd in the region bolts. Stagger effects last 50% longer
and Momentum gain doubles. The Commit pair thrives in the chaos.

**SAP Surge.** A geyser of amber SAP bursts from the ground. The first team to
spend 200 SAP claims it, and it then gives them three times the SAP for a minute.

**Core Bloom.** Four hundred loose cores spill across the region's centre,
glowing. Everyone wants them. Hunters and divers arrive first.

**Heartquake** (Planet Pulse). The planet shudders. Blight in the region cracks,
and Blightborn nodes there become Vulnerable.

**Healing Bloom** (Planet Pulse). Flowers burst open across the region, and
Wildborn standing in them heal quickly.

**Shard Rain** (Murmur Surge). Meteor glass falls from a clear sky onto
Wildborn structures.

**Thousand Whispers** (Murmur Surge). Every Wildborn on the map is revealed
for 10 seconds by a wave of whispering.

## The economy at a glance

```
 Kills, wildlife, Enemy Cores ──► carried cores ──► (return / field-convert) ──► EXP ──► Levels & Stages
                                                                                       (personal power)
 Captured nodes ──► SAP ──► Hub Defense, Sap Draw, event responses
                                    (team power)
 Captured nodes ──► Territorial Influence ──► passive cores, SAP bonus, Dominance, tiebreak
```

Two currencies, one map. Personal power comes from fighting and returning;
team power comes from holding ground.

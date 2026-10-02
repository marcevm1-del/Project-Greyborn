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

## Nodes in detail

| Node size | Cells | Typical location | Capture time (base, 4 s per channel) | Uproot time (S1 / S2 / S3) |
|---|---|---|---|---|
| Small | 1–2 | Forest clearings, cave junctions | One channel | 5–10 s / 4–8 s / 3–6 s |
| Medium | 3–4 | Open ground, ridges | One channel, then spread | 15–20 s / 12–16 s / 9–12 s |
| Large | 5–6 | Plains, Hub surroundings | One channel, then spread | 25–30 s / 20–24 s / 15–18 s |
| Hub | 6 + structure | The five Resource Hubs | Attack stages first ([33](33-structures.md)) | Only in Exposed and Collapsing stages |

**Capture** roots the node's core cell; the rest of the node fills over a few
seconds as roots (or Blight) spread from it. **Uprooting** works cell by cell,
so bigger nodes take longer to take back.

## How Territorial Influence is calculated

TI = (cells your team holds ÷ all capturable cells) × 100%, with **Hubs
counting extra** (+10% weight each). Proposal for launch maps:

| Holding | Approximate TI |
|---|---|
| Your half of the map, no Hubs | ~40% |
| Your half plus your two Hubs | ~50% |
| Your half, your Hubs and the centre | ~60% |
| Your half and all five Hubs | ~75% |
| The mercy rule | 80% for 60 seconds |

## Tension in numbers

| Factor | Tension added per second at a border |
|---|---|
| Borders touching (base rate) | +0.2 |
| Each fight within 15 m of the border | +1.0 |
| Each Stage 2 creature nearby | ×1.5 |
| Each Stage 3 creature nearby | ×2 |
| No fighting for 30 s | −0.5 (decay) |

At 75, the drone starts. At 100, the event fires, and that border's Tension resets to 0.

## The event deck, with weights

| Deck | Event | Weight |
|---|---|---|
| Neutral | Rootquake | 25% |
| Neutral | Marrow Storm | 20% |
| Neutral | Stampede | 20% |
| Neutral | SAP Surge | 20% |
| Neutral | Core Bloom | 15% |
| Planet Pulse | Heartquake | 40% |
| Planet Pulse | Healing Bloom | 40% |
| Planet Pulse | The Old Tall wakes | 20% |
| Murmur Surge | Shard Rain | 40% |
| Murmur Surge | Thousand Whispers | 40% |
| Murmur Surge | Blighted Wyrm | 20% |

The apex events (the Old Tall, the Blighted Wyrm) are rarer because they're
the most powerful. A deck never fires the same event twice in a row in one match.

## SAP across a match (example, one team)

| Time | Nodes held | Hubs | SAP income per minute | Spent on |
|---|---|---|---|---|
| 0–5 min | 6 small | 0 | ~400 | Saved |
| 5–10 min | 10 | 1 | ~800 | Hub Defense to Level 3 |
| 10–15 min | 14 | 2 | ~1,300 | Sap Draw; an event response (SAP Surge) |
| 15–20 min | 12 | 2 | ~1,100 | Hub Defense to Level 7 on the threatened Hub |
| 20+ min | Varies | Varies | Varies | Everything into the last stand |

## Territory strategies

| Strategy | How | Strength | Weakness |
|---|---|---|---|
| **Turtle** | Hold your half, max your Hubs' Defense | Hard to break; strong late | Concedes the centre; enemy patron events won't help you |
| **Spread** | Take many small nodes everywhere | High passive income | Thin; easy to uproot |
| **Centre control** | Hold the central Hub and its surroundings | Rotates fastest to any fight | Exposed on two sides |
| **Cut the bridges** | Uproot the enemy's connecting nodes | Turns enemy nodes Inaccessible to them | Takes coordination and timing |
| **Event farming** | Keep borders hot where events favour you | Free swings | Unpredictable |

## Territory edge cases

| Case | Rule |
|---|---|
| Two teams channel the same neutral node | Both channels pause; neither progresses until one is interrupted |
| A Hub's last owner disconnects | The Hub stays the team's; ownership is by team, not player |
| Scald covers a node (Season 3+) | The node becomes neutral and uncapturable until the Scald burns out or its Landfall core is destroyed |
| A node is Inaccessible to both teams | Possible in Phase 1 only; Phase 2 opens all central nodes |

## Territory UI

- **The minimap** shows territory as amber and cyan, with team outlines for clarity.
- **Node states** use the source pages' colours: cyan = Captured, gold =
  Inaccessible, red = Vulnerable, shown with team-coloured borders to avoid
  the cyan clash with the Murmur ([23](23-art-direction.md#ui-direction)).
- **TI** is shown as two bars at the top of the screen, filling toward each other.
- **Tension** is shown on borders as a glowing line that brightens toward 100.

## Territory principles

1. **The map is the planet's body.** Territory is its nerves, claimed by roots or Blight.
2. **Two currencies, two jobs:** cores for personal power, SAP for team power.
3. **Borders make the map alive** through Tension and events.
4. **The losing side's patron helps,** so territory leads are never permanent.
5. **Territory is always readable,** in colour, in material and on the UI.

## Territory in one paragraph

Every node on the map is a cluster of the living planet's nerves. Teams claim
them with roots or Blight, extract SAP from them, and build Territorial
Influence across the map. Where territories touch, Tension rises until the
world itself erupts in an event, and the losing side's patron steps in. The
team that holds the map grows richer, but never safe.

# Spec 05 — Economy, Territory & Match Rules

Every number in the economy: cores, EXP, conversion, SAP, structures,
territory, Tension, events, respawn and win conditions. Concepts are from
`gdd/03`, `gdd/05`, `gdd/06` and `gdd/33`. Creature payouts are in
[Spec 04](04-creatures.md); ability numbers are in [Spec 02](02-abilities.md)
and [Spec 03](03-ultimates.md).

All values are **starting values**. Every row in this file is also a row in
the tuning spreadsheet (`greyborn-tuning.xlsx`, sheet *Economy*), which is
the live source once playtesting starts.

---

## 1. Match timing

| Phase | Name | Start | End | Rules that switch on |
|---|---|---|---|---|
| 1 | Stable Flow | 0:00 | 5:00 | Central nodes Inaccessible to both teams; no Tension |
| 2 | Pre-Aggro Resource Control | 5:00 | 10:00 | All central nodes open; Tension starts building (no events yet) |
| 3 | Resource Stage | 10:00 | 16:00 | Global events can fire; central Hub's shield drops to Exposed for 30 s at 10:00; Synergies: S1 locked · S2 31 s · S3 20 s; Tier IV wildlife |
| 4 | Hunt | 16:00 | End | Base-adjacent nodes Vulnerable; Base Hearts attackable; Synergies: S3 only, 9 s; respawn +5 s |
| — | Time limit | 25:00 | — | Higher TI wins; within 1% → 2 min overtime, first node captured wins |

Pacing targets (from `gdd/06`): first L3 at 2:30–3:30, first return 5:00–7:00,
first Stage 2 at 8:00–10:00, first L20 at 16:00–18:00, average end 20:00–23:00.

## 2. Levels and EXP

**EXP to go from level L to L+1 = 80 + 20 × L.** Total to L20 = **5,320**.

| Level | EXP to next | Cumulative | Unlock |
|---|---|---|---|
| 1 | 100 | 0 | Base Form |
| 2 | 120 | 100 | — |
| 3 | 140 | 220 | **Lineage awakens** (Q/E/R, passive) |
| 4 | 160 | 360 | — |
| 5 | 180 | 520 | Rank 2 abilities |
| 6 | 200 | 700 | — |
| 7 | 220 | 900 | — |
| 8 | 240 | 1,120 | Cross-resonance |
| 9 | 260 | 1,360 | — |
| 10 | 280 | 1,620 | **Stage 2**; branch; Rank 3 |
| 11 | 300 | 1,900 | — |
| 12 | 320 | 2,200 | Void Garden |
| 13 | 340 | 2,520 | — |
| 14 | 360 | 2,860 | — |
| 15 | 380 | 3,220 | Second branch upgrade; Co-Stalk; Tenacity max (28%) |
| 16 | 400 | 3,600 | Dominance share 1 |
| 17 | 420 | 4,000 | Dominance share 2 |
| 18 | 440 | 4,420 | Smash & Roll; Dominance share 3 |
| 19 | 460 | 4,860 | Dominance share 4 |
| 20 | — | 5,320 | **Stage 3**; Ultimate; Dominance share 5 |

**Multi-level conversion:** a single conversion can raise several levels;
each Stage transformation plays in order (1.5 s, invulnerable, rooted).

### Target EXP curve (one average player)

| Window | Target level at end | EXP gained in window | EXP per minute needed |
|---|---|---|---|
| 0:00–3:00 | 3 | 220 | ~73 |
| 3:00–9:00 | 10 | 1,400 | ~233 |
| 9:00–17:00 | 20 | 3,700 | ~463 |

Income must roughly **double each window**. It does, because bounties rise
with victim level, Tier III/IV wildlife open up, Enemy Cores fall in Phase 3,
and the aggression bonus is easier to reach with bigger fights.

### Target EXP sources (share of 5,320 + bonuses)

| Source | Share | ≈ EXP per player per match |
|---|---|---|
| Player kills (bounties + picked-up carried cores) | 35–45% | 2,100 |
| Wildlife | 15–20% | 900 |
| Enemy Cores | 10–15% | 650 |
| Passive territory income | 10–15% | 650 |
| Aggression and Resonance bonuses | 10–15% | 650 |

## 3. Evolution cores

| Rule | Value |
|---|---|
| Carry cap | **450** (cores above the cap stay on the ground) |
| Pickup radius | 2 m (Stage 3: 4 m), automatic |
| Dropped cores last | **30 s** on the ground, then fade |
| Sound signature | 150+ carried: +15 m · 300+: +30 m and an enemy minimap ping every 5 s |
| Carried-glow tiers (UI) | < 150 · 150–299 · 300+ |

### Kill rewards

| Rule | Value |
|---|---|
| Victim drops | **All carried cores** where they die |
| Bounty | **60 + 10 × victim level** (L1 70 · L10 160 · L20 260), as carried cores |
| Bounty split | Killer **100%**; each assist (damage or CC on the victim in the last 10 s) **+30%** extra, created by the system |
| Executions (wildlife or structure kills) | Bounty goes to the nearest enemy player within 30 m, else is lost |
| Disconnect | Carried cores drop as on death; no bounty |

### Passive territory income

```
passive cores per second, per player = 1.2 × TI × (1 − 0.15 × Enemy Cores lost)
```

TI as a fraction (0.50 = 50%). At 50% TI: **0.6 cores/s**, about 650 over an
18-minute match (≈12% of EXP, inside the 10–15% target). Passive cores arrive
as **carried** cores, so they still need converting.

> *Spec correction:* `gdd/03` proposes "+2 cores/s per player, scaled by TI".
> At 50% TI that would be ~20% of a player's EXP, above the GDD's own 10–15%
> target. 1.2 × TI fits the target; the GDD row is updated to point here.

### Wildlife

Payouts per creature are in [Spec 04](04-creatures.md). Each player gets full
value from the first **600 wildlife cores** per match, then **50%**.
Affinity: +25%.

## 4. Conversion

| Rule | Value |
|---|---|
| **C1** (0–1 Hubs held) | 15 s channel |
| **C2** (2 Hubs) | 12 s |
| **C3** (3+ Hubs) | 9 s |
| Each Enemy Core lost | One tier slower; minimum **C1 + 3 s = 18 s** |
| Base conversion rate | 100% of carried cores → EXP |
| **Aggression bonus** | +10% per **full** 100 carried at the start of the channel: 100–199 +10% · 200–299 +20% · 300+ +30% |
| **Evolution-Sync Resonance** | +10% if the pair partner converts within 10 s of you, within 15 m |
| **Field conversion** at a held Hub | Same channel time; **70%**, no aggression bonus, no Resonance |
| Interrupt | Any damage breaks the channel; cores are kept |
| At Level 20 | Cores convert to **team SAP at 1 SAP per 2 cores** (bonuses apply) |
| Respawn | Does **not** convert; you must channel |

**Worked example:** 320 cores at base with the partner: 320 × (1 + 0.30 + 0.10) = **448 EXP**.
Field-converting the same 320 at a Hub: 320 × 0.70 = **224 EXP**.

## 5. Territory

### Grid

| Rule | Value |
|---|---|
| Cells per standard map | **240** capturable (5 Hubs × 6 cells included) |
| Node sizes | Small 1–2 cells · Medium 3–4 · Large 5–6 · Hub 6 + structure |
| Node states | Captured · Vulnerable · Inaccessible (`gdd/05`) |
| Global Territorial Growth | Each **border node** spreads into 1 adjacent **neutral** cell every **20 s** |
| Scald (Season 3+) | Covered cells are neutral and uncapturable until it burns out (60 s) or its Landfall core dies |

### Capturing and uprooting

| Action | Time |
|---|---|
| Root a neutral node (any lineage) | 4 s channel, −1% per 2 Control, max −50% |
| Root (Verdant) | 2 s channel, same reduction |
| Spread across a multi-cell node after rooting | 1 cell per 2 s |
| Uproot an enemy cell | 5 s (S1 or none) · 4 s (S2) · 3 s (S3), by the attacking team's highest Synergy tier present |
| Uproot a Collapsing Hub cell | Half time |
| Contested channel (both teams on one node) | Both pause |

### Territorial Influence (TI)

```
TI = 100 × (cells held ÷ 240) + 3 per Hub held      (capped at 100)
```

| Holding | Cells | TI |
|---|---|---|
| Your half, no Hubs | 96 | ~40% |
| Your half + your two Hubs | 108 | ~51% |
| Your half, your Hubs and the centre | 126 | ~62% |
| Your half and all five Hubs | ~150 | ~75% |
| **Mercy** | — | **≥ 80% for 60 s** |

TI is per team; the two teams' TI don't have to add to 100.

### Territorial Dominance (L16+)

```
Power bonus % = (level − 15) ÷ 5 × max(0, TI − 50) ÷ 5
```

At L20 with 70% TI: **+4% Power**. At 80% TI: +6%. Below 50% TI: nothing.

## 6. SAP

| Rule | Value |
|---|---|
| Extraction | **1 SAP/s per captured cell** |
| Hub bonus | **+15% total SAP per Hub held** (additive: 2 Hubs = +30%) |
| Void Garden SAP extraction perk | +30% on Verdant-rooted nodes |
| Sapback Aphids (3+ alive on your node) | +2 SAP/s |
| Sapdrinker on your node | −1 SAP/s |
| Lumen Bees visit | That node +25% for 60 s |
| L20 conversion | 1 SAP per 2 cores |
| Starting SAP | 0 |
| Cap | None |

### SAP sinks

| Sink | Cost |
|---|---|
| Hub Defense Level N (from N−1) | **100 × N** (Level 3 total: 600 · Level 10 total: 5,500) |
| Sap Draw (Verdant E) | 40 per cast |
| Sap Frenzy (Verdant Ultimate) | Up to 300 |
| SAP Surge event claim | 200 |
| Other event responses | See section 8 |

### Expected SAP income (one team)

| Time | Cells held | Hubs | SAP / min |
|---|---|---|---|
| 0–5 min | ~7 | 0 | ~420 |
| 5–10 min | ~12 | 1 | ~830 |
| 10–15 min | ~16 | 2 | ~1,250 |
| 15–20 min | ~14 | 2 | ~1,090 |

Match total about **18,000–22,000 SAP** per team: enough for two Hubs at
Level 8–10 *or* a spread of upgrades plus every event claim, not both.

## 7. Structures

Players deal **50% damage to structures** with basics and ordinary
abilities. The structure damage listed for siege Ultimates (Spec 03) and
the Siege Beetle (Spec 04) is **final** (not halved). Stage 1 players can't
damage Shielded Hubs, Enemy Cores or Base Hearts.

### Resource Hubs (Sap Wells / Glow Wells)

| Rule | Value |
|---|---|
| Base Health | **6,000** |
| Defense Levels | 0 (bare, on capture) to 10 |
| Per Defense Level | +400 Health; +5% damage reduction for **allies inside** (radius 12 m), max 75% total |
| Level 10 Health | 10,000 |
| **Shielded** (100–66%) | Only Stage 2+ damage counts; can't be uprooted |
| **Exposed** (66–33%) | Cells can be uprooted |
| **Collapsing** (< 33%) | Uproot at half time; defenders warned |
| Health floor | Can't go below 1; the Hub falls only when **all 6 cells** are uprooted |
| Regeneration | 2% max Health/s after 10 s without damage |
| On capture | Becomes the new team's at **Level 0**, full base Health; old levels lost |
| Field conversion | 70%, as section 4 |
| Neutral Hubs at start | All five; capture like a Large node (a single 4 s channel, then spread) |

### Enemy Cores (Heartseeds / Shard Hearts)

| Rule | Value |
|---|---|
| Count | 3 per team |
| Health | **5,000** (regrown: 2,500) |
| Attackable | From Phase 2 |
| Reward | **300 cores**, split equally among attackers within 20 m |
| Denial | −15% victim passive income per Core lost; conversion one C-tier slower per Core lost (min 18 s) |
| Regrowth | 4 min after destruction, 30 s growth, only if the team holds a node adjacent to the site |
| Regrown Core reward | 150 cores |

### Base Heart

| Rule | Value |
|---|---|
| Health | **20,000** |
| Attackable | Phase 4, or earlier if all three of that team's Enemy Cores are down at the same time |
| Damage taken | Only Stage 2+ damage counts |
| Regeneration | 1% max Health/s after 15 s without damage |
| Destroyed | Instant win |

**Siege check (four Stage 3 attackers, ~260 damage/s each, halved):**
a Level 0 Hub's Shield (2,000) in ~4 s; a Level 10 Hub's Shield (3,300) in ~6 s;
an Enemy Core in ~10 s; a Base Heart in ~38 s without Ultimates, ~25 s with
two siege Ultimates. Long enough for a defence to arrive from anywhere on
the map (30–40 s at Stage 3 speeds with the respawn timers below), if the
defence moves at once.

## 8. Tension and global events

| Rule | Value |
|---|---|
| Regions per standard map | 5 (one per Hub) |
| Range | 0–100 per region |
| Builds from | Phase 2; events fire from Phase 3 |
| At 100 | An event fires in that region; Tension resets to 0; region cooldown **90 s** |
| Global limit | One event at a time on the map; at most one every **60 s** |

### Tension rates (per region)

| Factor | Tension per second |
|---|---|
| Borders touching in the region (base) | +0.2 |
| Each fight within 15 m of a border | +1.0 |
| Each Stage 2 creature nearby | ×1.5 on its fight's rate |
| Each Stage 3 creature nearby | ×2 |
| The Old Tall within 30 m | ×3 on everything |
| No fighting for 30 s | −0.5 (decay) |

A steady border with one fight a minute reaches 100 in about **2–3 minutes**.

### Which deck

| TI difference | Deck drawn |
|---|---|
| Within 5% | Neutral |
| Wildborn behind by more than 5% | **Planet Pulse 60%**, neutral 40% |
| Blightborn behind by more than 5% | **Murmur Surge 60%**, neutral 40% |

### Events

| Deck | Event | Weight | Duration | Numbers |
|---|---|---|---|---|
| Neutral | Rootquake | 25% | 30 s | All nodes in the region Vulnerable |
| Neutral | Marrow Storm | 20% | 20 s | Weak points exposed from any angle for everyone in the region |
| Neutral | Stampede | 20% | 30 s | Staggers last +50%; Momentum gain ×2 |
| Neutral | SAP Surge | 20% | Claim window 30 s; then 60 s | First team to spend **200 SAP** at the geyser: ×3 SAP from the region's cells for 60 s |
| Neutral | Core Bloom | 15% | 30 s | **400 loose cores** at the region's centre (wildlife cap doesn't apply) |
| Planet Pulse | Heartquake | 40% | 20 s | Blightborn nodes in the region Vulnerable; Blight cells there uproot at half time |
| Planet Pulse | Healing Bloom | 40% | 15 s | Wildborn in the region regenerate **3% max Health/s** (counts toward the 5%/s cap) |
| Planet Pulse | The Old Tall wakes | 20% | 45 s | Spawns the Old Tall (Spec 04), hunting Blightborn |
| Murmur Surge | Shard Rain | 40% | 15 s | Shards fall on Wildborn structures in the region: **150 damage per second**, final |
| Murmur Surge | Thousand Whispers | 40% | 10 s | All Wildborn revealed map-wide |
| Murmur Surge | Blighted Wyrm | 20% | 45 s | Spawns a Blighted Sixfold Wyrm (Spec 04), hunting Wildborn |

**Event resource gain:** where an event pays out (SAP Surge, Core Bloom, Tier IV
kills from events), the reward is weighted by **cells held in that region**:
each team's share is boosted by +1% per cell it holds there, max +30%.

**Mirror check:** Planet Pulse and Murmur Surge events are paired by power
(Heartquake ↔ Shard Rain, Healing Bloom ↔ Thousand Whispers, Old Tall ↔
Blighted Wyrm). They only fire for the team that is behind, so neither side
has a permanent edge.

## 9. Respawn

```
respawn time = 5 s + 1 s × level      (+5 s in Phase 4)
```

| Level | 1 | 5 | 10 | 15 | 20 |
|---|---|---|---|---|---|
| Phases 1–3 | 6 s | 10 s | 15 s | 20 s | 25 s |
| Phase 4 | 11 s | 15 s | 20 s | 25 s | 30 s |

Respawn at base with full Health, no carried cores, all cooldowns reset
except Ultimates and Synergies.

## 10. Win conditions

| Condition | Rule |
|---|---|
| **Base Heart** | Destroy the enemy Base Heart (section 7) |
| **Mercy** | TI ≥ 80% for 60 continuous seconds |
| **Time limit** | At 25:00, higher TI wins |
| **Overtime** | If TIs are within 1%: 2 minutes; the first team to capture any node wins; if none, higher TI at the end; if still tied, a draw |
| **Surrender** | From 12:00; all four agree (three in casual if one disconnected) |

## 11. Economy tuning targets

| Measure | Target |
|---|---|
| First L20 | 16:00–18:00 |
| Level gap, highest to lowest player, at 15:00 | ≤ 6 levels |
| Matches won by mercy | 10–20% |
| Matches reaching the time limit | ≤ 25% |
| Average returns to base per player | 4–6 |
| Share of conversions at 300+ cores | 20–35% |
| Comeback rate (team behind by ≥ 10% TI at 10:00 wins) | 25–35% |
| Hub changes of hands per match | 4–8 |

## 12. Balance levers, in order of preference

1. **Conversion times** (C1/C2/C3) and the aggression bonus thresholds.
2. **Bounty formula** (60 + 10 × level).
3. **Passive income factor** (1.2 × TI).
4. **Hub Defense cost** (100 × level) and Health per level (400).
5. **Event weights** and the patron-deck chance (60%).
6. **Structure damage modifier** (50%).
7. **EXP curve** (80 + 20 × L): last resort, because it moves every pacing target at once.

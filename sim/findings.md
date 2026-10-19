# Simulator findings — first pass

**Date:** 2026-10-02 · **Runs:** 1,000-match baseline ([report.md](report.md)) plus
twelve 400-match experiments · **Tuning:** `spec/greyborn-tuning.xlsx` as committed.

The spec as written meets **5 of 23** targets in simulation. Some misses are
the bot model's fault, but six are real problems in the numbers. Four of
those six can be shown with plain arithmetic and don't depend on the
simulator at all.

Nothing in the spec or the workbook has been changed yet. The values below
are **proposals for the director**.

---

## A. Certain: arithmetic shows them, the simulator confirms them

### A1 · SAP income is about 10× too high

- **Spec:** 1 SAP/s per captured cell (Spec 05 §6). A team holding its half
  of the map holds ~96 cells: **5,760 SAP per minute**.
- **Spec 05's own income table** assumes 7–16 cells held, which doesn't match
  the 240-cell grid in the same spec.
- **Simulated:** 192,000 SAP per team per match (target 18,000–22,000). Every
  held Hub reaches Defense Level 10 by 15:00, so SAP stops being a decision.
- **Proposal:** **0.1 SAP/s per cell.** Simulated: 19,200 per team, with Hubs
  at an average Level 8 by 15:00. On target.

### A2 · Two pacing targets contradict each other

- EXP only arrives on conversion (`gdd/03`), so the first Level 3 needs a
  return to base. But the targets are *first L3 at 2:30–3:30* and *first
  return at 5:00–7:00*.
- The GDD's own example player (`gdd/03`, "one player's curve") reaches L3 at
  3:00 *carrying* 140 cores, without returning.
- **Proposal (a rule, the director's call):** **until Level 3, cores become
  EXP as they're picked up.** Awakening needs no trip home; carrying starts
  to matter once you have a lineage. Simulated: first return moves from
  1:19 to ~3:00, and the Base Form phase stays short.
- **Alternative:** keep the rule and change the first-return target to 2:00–3:30.

### A3 · Enemy Cores can't reach their EXP share

- **Target:** 10–15% of all EXP from Enemy Cores (`gdd/03`, Spec 05).
- **Arithmetic:** six Cores × 300 = 1,800 cores. A match where every player
  reaches L20 is 8 × 5,320 = 42,560 EXP. Even if **all six** Cores fall,
  that's ~4%.
- **Simulated:** 1% (about one Core falls per match).
- **Proposal:** raise the reward to **900–1,200 cores** per Core (regrown:
  half), *or* lower the target to ~5%. Simulated at 900: 3%. The reward
  alone won't fix this, because bots rarely take Cores. A real prototype will
  tell whether real teams do.

### A4 · Synergy tier S3 is out of reach, so Phase 4 has no Synergies

- **Rule:** Synergy level n → n+1 costs 30 × n XP; level 10 (S3) needs 1,350
  XP, "around minute 18" (`gdd/04`). Phase 4 allows **only S3**.
- **Arithmetic:** 1,350 XP in 18 minutes is 75 XP per minute: a kill
  together (10 XP) every eight seconds. A whole match has 30–50 kills.
- **Simulated:** pairs reach Synergy level **2.1** by 18:00 (target 10), and
  the first Synergy fires in **0%** of matches. The unlock gates (L12 / L15 / L18
  for *both* partners) add to this.
- **Proposal:** cost **10 × n** (450 XP to S3) **and** double the XP for
  kills and captures together. Simulated with the cheaper cost alone: level 3.5
  at 18:00. Better, still short. Also consider lowering the Smash & Roll gate
  from L18 to L15, so that every pair can use its Synergy before Phase 4.

### A5 · Tension decay cancels the build-up

- **Rule:** +0.2/s at a touching border, +1.0/s per fight, **−0.5/s after 30 s
  without fighting** (Spec 05 §8).
- **Arithmetic:** with one 10-second fight a minute, a border gains 12 + 10
  and loses 15 per minute: **+7 per minute, about 14 minutes to an event.**
  Spec 05 (and the workbook's calculator) said 4–5 minutes because they left
  out the decay.
- **Simulated:** 0.7 events per match; half of matches have none.
- **Proposal:** decay **−0.2/s** and fights **+1.5/s**: about 5 minutes per
  event. Also fix the workbook's calculator to include decay.

### A6 · Levelling is about 25–35% too slow

- **Arithmetic** (one player, 17 minutes, from Spec 05's own sources):
  passive ~36/min, wildlife ~50/min, kills ~90/min (5–8 kills at ~130
  bounty plus picked-up cores), Enemy Cores ~18/min, bonuses ~40/min. That's
  **~235 EXP/min**, while L20 by 17:00 needs **313/min**.
- **Simulated:** first L20 at **23:16**, reached in only 5% of matches; median
  level at the end is 12. With a faster model (travel ×0.65, fights ×2), the
  first L20 is still 22:01.
- **Proposal:** a cheaper curve **and** bigger bounties together. The
  experiment that fit best: EXP **60 + 15 × L** (total 3,990) with bounty
  **100 + 15 × level**. Simulated: Stage 2 at 7:58, first L20 at 20:05
  (in 88% of matches). Final values need real kill rates from the prototype.

---

## B. Directional: the simulator shows them, but the bot model affects them

| Finding | Simulated | Target | Note |
|---|---|---|---|
| Matches almost always reach the time limit | 96–100% | ≤ 25% | Base Hearts (20,000 Health, 1%/s regen) hold. At 12,000 Health, 11–24% of matches end at the Heart. Mercy (80% TI) never triggers; territory stays near 50/50 |
| Too many returns per player | 8.4 | 4–6 | Bots return at 180–340 cores. Real players may carry longer for the +30% bonus |
| Level gap at 15:00 | 6.4 | ≤ 6 | Gets worse (8+) as progression speeds up. Watch for snowballing |
| Wildlife share of EXP | 23% | 15–20% | Bots farm a lot; real players may fight more |

## C. What already works

| Measure | Simulated | Target |
|---|---|---|
| Side balance (Wildborn win rate) | 51.8% (1,000 matches; within noise) | 50% |
| Comeback (behind ≥ 10% TI at 10:00, then wins) | 25% | 25–35% |
| Hub changes of hands | 5.2 | 4–8 |
| Conversions at 300+ cores | 28% | 20–35% |
| Kills' share of EXP | 39% | 35–45% |

The mirror rule holds: neither side has an edge.

---

## Experiments (400 matches each unless noted)

| Run | Changes from the spec | First Stage 2 | First L20 (reached) | Median end level | Time limit | SAP / team |
|---|---|---|---|---|---|---|
| Baseline (1,000) | — | 10:33 | 23:16 (5%) | 12 | 100% | 192,000 |
| Fast model | Travel ×0.65, fights ×2 (model only) | 9:06 | 22:01 (50%) | 13 | 100% | 192,000 |
| SAP | SAP 0.1/cell | 10:36 | 23:41 (8%) | 12 | 100% | 19,200 |
| Curve | + awakening rule, EXP 60 + 15L | 8:21 | 21:33 (65%) | 15 | 100% | 19,200 |
| Growth | + Territorial Growth every 60 s | 8:46 | 22:33 (54%) | 14 | 100% | — |
| Heart | + Base Heart 12,000 | — | 21:35 (63%) | 14 | 86% | — |
| Curve + bounty | + bounty 100 + 15 × level | 7:57 | 20:07 (85%) | 16 | 84% | — |
| Steep cut | EXP 50 + 12L, Heart 12,000 | **6:53** (too early) | **18:00 (96%)** | 16 | 76% | — |
| Flat curve | EXP 100 + 10L, Heart 12,000 | 9:42 | 21:51 (64%) | 14 | 92% | — |
| All proposals (1,000) | SAP, awakening, curve + bounty, Cores 900, Heart 12,000, Synergy cost 10 | 7:58 | 20:05 (88%) | 16 | 83% | 19,100 |

Slowing Territorial Growth didn't change match endings, so growth isn't
why territory stays even.

## Recommended next steps

1. **Director decides on A1–A6.** A1 and A5 are straight fixes. A2 changes a
   rule. A3, A4 and A6 change the economy's shape.
2. Once decided, I update the workbook, Specs 02/05 and the GDD chapters
   they touch, then re-run the simulator and publish a new report.
3. When the M2 prototype exists, replace the model assumptions with measured
   values (travel times, fight frequency, return habits) and re-run.

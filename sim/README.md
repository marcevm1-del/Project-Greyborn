# Greyborn match simulator

Plays thousands of 4v4 bot matches with the numbers in
`spec/greyborn-tuning.xlsx` and scores them against the tuning targets in
Specs 02–06. It answers *"if the game shipped with these numbers, would the
pacing work?"* long before there's a playable build.

Findings from the first runs are in [findings.md](findings.md). The latest
full report is [report.md](report.md).

## Running it

Needs Python 3.10+ and `openpyxl` (`pip install openpyxl`).

```bash
python3 sim/run.py                    # 1,000 matches (~40 s on 4 cores), writes sim/report.md
python3 sim/run.py -n 200 --set "Economy:SAP per cell=0.1" --out /tmp/try.md
python3 sim/run.py --model TRAVEL_ZONE=9 --model ENGAGE_RATE=0.04   # test a model assumption
python3 -m unittest discover -s sim/tests                            # 10 checks
```

- `--set SHEET:NAME=VALUE` changes one tuning value for this run only. It works on the
  *Economy*, *EXP & Respawn* (as `EXP:`) and *Tension & Events* (as `Tension:`) inputs.
  Any other change goes into the workbook itself, which then has to be saved
  (or recalculated) so the simulator can read the new values.
- `--model NAME=VALUE` changes one of the model's own assumptions (below).
- `--json FILE` keeps every match's raw summary for your own analysis.

## What it models

| Area | How |
|---|---|
| Players | 8 bots in two teams of two pairs (random launch pairs), each with a skill factor (mean 1.0, ±10%) |
| Stats | Health, Power, Speed and Control per level, read from *Stats by level* |
| Damage | Basic attack + Q/E/R damage over their cooldowns (80% use), ×1.1 for weak points; Ultimates as a burst every cooldown at L20; Synergies as a burst when both partners qualify and the phase allows the pair's tier |
| Cores and EXP | Every source in Spec 05: bounties and assists, dropped cores, wildlife (with the 600 cap and affinity), Enemy Cores, passive income; conversion with C1–C3 times, aggression bonus, Resonance, field conversion, the carry cap, L20 → SAP |
| Territory | 240 cells in three zones (each half and the centre) plus five Hubs; rooting and uprooting times from Control and Synergy tier; Territorial Growth; Territorial Influence |
| Structures | Hubs (Defense levels, shield, uproot), Enemy Cores (regrowth), Base Hearts; SAP income and Hub Defense purchases |
| Wildlife | Camps of Tier I–III per zone built from the *Creatures* sheet; Tier IV spawns in Phases 3 and 4 with the damage-share split |
| Tension and events | Per-zone Tension with the spec's rates; neutral and patron decks by Territorial Influence gap; all 11 events |
| Win conditions | Base Heart, mercy, time limit, overtime |

### Model assumptions (not design values)

These are the simulator's guesses about how real players behave and how big
a map is. They live at the top of `greyborn_sim/match.py` and can be changed
per run with `--model`.

| Constant | Value | Meaning |
|---|---|---|
| `TRAVEL_BASE`, `TRAVEL_ZONE` | 10 s, 14 s | Walking time from base to the home half, and per zone crossed, at Speed 100% |
| `ENGAGE_RATE` | 0.02 | Chance per second, per pair of opposing players in the same zone, that a fight starts |
| `CENTRE_PULL`, `DEFEND_PULL`, `HUNT_PULL`, `PUSH_PULL` | 1.5, 1.0, 0.3, 3.0 | How strongly bots are drawn to the centre, to defend, to hunt, and to push an open Base Heart |
| `FRONTIER` | 10 | Enemy cells uprootable at once in a zone (the border) |
| `ABILITY_USE`, `WEAK_POINT_AVG` | 0.8, 1.1 | Share of cooldowns used; average weak-point gain |
| `DIRECT_EXP_BELOW` | 0 (off) | Proposed rule: below this level, cores become EXP when picked up |
| `SYN_COST` | 30 | Synergy level cost per level (`gdd/04`) |

## Limits

- Bots are simple. They don't coordinate like real teams, use Calls, dodge,
  or play to a lineage's strengths beyond role weights. Treat results as
  **directional**: a target missed by a wide margin is a real signal, a
  near miss isn't.
- Positioning is three zones, not a map. Distance, sightlines and chokepoints
  are folded into travel times and the engagement rate.
- Crowd control, shields and most passives are not modelled individually.
- The first playable prototype (Spec 06, M2) should replace these assumptions
  with measured values (real travel times, real fight frequency), then the
  simulator can be re-run with them.

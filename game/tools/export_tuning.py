"""Export spec/greyborn-tuning.xlsx to game/src/data/tuning.json.

Reuses the simulator's loader so the game, the simulator and the spec read the
same numbers. Run after every workbook change:  npm run data  (from game/).
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "sim"))
from greyborn_sim import data  # noqa: E402

t = data.load()
out = {
    "source": "spec/greyborn-tuning.xlsx",
    "stats": {lin: {s: vals[1:] for s, vals in st.items()} for lin, st in t.stats.items()},
    "expToNext": t.exp_to_next[1:],
    "expParams": t.exp_params,
    "basic": {k: {"ratio": v[0], "rate": v[1]} for k, v in t.basic.items()},
    "abilities": t.abilities,
    "ultimates": t.ults,
    "synergies": t.synergies,
    "phaseSynergy": {str(k): v for k, v in t.phase_synergy.items()},
    "creatures": t.creatures,
    "phaseMult": t.phase_mult,
    "affinityMult": t.affinity_mult,
    "econ": t.econ,
    "tension": t.tension,
    "events": t.events,
}
dest = ROOT / "game" / "src" / "data" / "tuning.json"
dest.write_text(json.dumps(out, indent=1, ensure_ascii=False))
print(f"wrote {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KB)")

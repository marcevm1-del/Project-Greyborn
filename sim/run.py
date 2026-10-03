"""Run simulated Greyborn matches and score them against the spec's targets.

Examples:
    python3 sim/run.py                                   # 1,000 matches, writes sim/report.md
    python3 sim/run.py -n 200 --set "Economy:SAP per cell=0.15"
    python3 sim/run.py --model TRAVEL_ZONE=10 --out /tmp/fast-travel.md
"""
import argparse
import json
import sys
from multiprocessing import Pool
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from greyborn_sim import data, match, report  # noqa: E402

_TUNING = None


def _init(path, overrides, model):
    global _TUNING
    _TUNING = data.load(path, overrides)
    for k, v in model.items():
        setattr(match, k, v)


def _play(seed):
    return match.Match(_TUNING, seed).run()


def parse_pairs(items, numeric=True):
    out = {}
    for item in items or []:
        k, _, v = item.partition("=")
        out[k.strip()] = float(v) if numeric else v
    return out


def simulate(n=1000, seed=0, workbook=data.DEFAULT_WORKBOOK, overrides=None, model=None, workers=None):
    with Pool(workers, initializer=_init, initargs=(workbook, overrides or {}, model or {})) as pool:
        return pool.map(_play, range(seed, seed + n), chunksize=max(1, n // 64))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("-n", "--matches", type=int, default=1000)
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--workbook", default=str(data.DEFAULT_WORKBOOK))
    ap.add_argument("--set", action="append", metavar="SHEET:NAME=VALUE",
                    help="override a tuning value (Economy:, EXP: or Tension:)")
    ap.add_argument("--model", action="append", metavar="CONSTANT=VALUE",
                    help="override a model assumption from match.py, e.g. TRAVEL_ZONE=10")
    ap.add_argument("--out", default=str(Path(__file__).resolve().parent / "report.md"))
    ap.add_argument("--json", help="also write the raw match summaries here")
    args = ap.parse_args()

    overrides, model = parse_pairs(args.set), parse_pairs(args.model)
    for k in model:
        if not hasattr(match, k):
            ap.error(f"unknown model constant {k}")
    results = simulate(args.matches, args.seed, args.workbook, overrides, model)
    agg = report.aggregate(results)
    settings = "Tuning: spec/greyborn-tuning.xlsx" + (
        f"; overrides: {', '.join(args.set)}" if args.set else "") + (
        f"; model: {', '.join(args.model)}" if args.model else "") + "."
    text = report.markdown(agg, "Greyborn simulation report", settings)
    Path(args.out).write_text(text)
    if args.json:
        Path(args.json).write_text(json.dumps(results))
    print(text)


if __name__ == "__main__":
    main()

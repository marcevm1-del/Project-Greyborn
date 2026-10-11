"""Aggregate match summaries and score them against the spec's tuning targets."""
import statistics
from collections import Counter, defaultdict

SOURCES = ["kills", "wildlife", "cores", "passive", "bonus"]
SOURCE_TARGETS = {"kills": (0.35, 0.45), "wildlife": (0.15, 0.20), "cores": (0.10, 0.15),
                  "passive": (0.10, 0.15), "bonus": (0.10, 0.15)}


def mmss(sec):
    if sec is None:
        return "never"
    return f"{int(sec // 60)}:{int(sec % 60):02d}"


def pct(values, q):
    values = sorted(values)
    if not values:
        return None
    k = (len(values) - 1) * q
    lo, hi = int(k), min(int(k) + 1, len(values) - 1)
    return values[lo] + (values[hi] - values[lo]) * (k - lo)


def aggregate(results):
    n = len(results)
    a = {"n": n}

    def first(key):
        vals = [r["first"].get(key) for r in results]
        hit = [v for v in vals if v is not None]
        return {"median": statistics.median(hit) if hit else None, "p10": pct(hit, 0.1),
                "p90": pct(hit, 0.9), "reached": len(hit) / n}

    for key in ("L3", "first return", "Stage 2", "first event", "first Synergy", "L20", "first Enemy Core"):
        a[key] = first(key)
    ends = [r["time"] for r in results]
    a["end"] = {"median": statistics.median(ends), "p10": pct(ends, 0.1), "p90": pct(ends, 0.9)}
    hows = Counter(r["how"] for r in results)
    a["how"] = {k: v / n for k, v in hows.items()}
    a["time_limit_share"] = sum(v for k, v in hows.items() if k.startswith(("Time", "Overtime"))) / n
    a["mercy_share"] = hows.get("Mercy", 0) / n
    decided = [r for r in results if r["winner"] is not None]
    a["wildborn_win"] = sum(1 for r in decided if r["winner"] == r["wildborn"]) / max(1, len(decided))
    a["draws"] = (n - len(decided)) / n

    tot = defaultdict(float)
    for r in results:
        for e in r["exp_src"]:
            for k in SOURCES + ["events"]:
                tot[k] += e.get(k, 0)
    s = sum(tot.values()) or 1
    a["exp_share"] = {k: tot[k] / s for k in SOURCES + ["events"]}
    levels_end = [lv for r in results for lv in r["levels"]]
    a["level_end_median"] = statistics.median(levels_end)
    a["gap_900"] = statistics.mean(r["gap_900"] for r in results if r["gap_900"] is not None)
    conv = [c for r in results for c in r["conversions"]]
    a["conv_300_share"] = sum(1 for c in conv if c >= 300) / max(1, len(conv))
    a["returns_per_player"] = statistics.mean(r["returns_per_player"] for r in results)
    a["kills"] = statistics.mean(r["kills"] for r in results)
    a["hub_changes"] = statistics.mean(r["hub_changes"] for r in results)
    a["events"] = statistics.mean(r["events"] for r in results)
    a["sap_earned"] = statistics.mean(x for r in results for x in r["sap_earned"])
    a["hub_level_900"] = statistics.mean(r["hub_level_900"] for r in results if r["hub_level_900"] is not None)
    syn = [lv for r in results if r["syn_1080"] for lv in r["syn_1080"]]
    a["syn_1080"] = statistics.mean(syn) if syn else None
    syn6 = [lv for r in results if r.get("syn_600") for lv in r["syn_600"]]
    a["syn_600"] = statistics.mean(syn6) if syn6 else None

    behind = []
    for r in results:
        if r["ti_600"] and r["winner"] is not None:
            t0, t1 = r["ti_600"]
            if abs(t0 - t1) >= 0.10:
                behind.append(r["winner"] == (0 if t0 < t1 else 1))
    a["comeback"] = (sum(behind) / len(behind)) if behind else None
    a["comeback_n"] = len(behind)

    wins, games = Counter(), Counter()
    for r in results:
        if r["winner"] is None:
            continue
        for team in (0, 1):
            for lin in set(r["lineups"][team]):
                games[lin] += 1
                wins[lin] += r["winner"] == team
    a["lineage_win"] = {lin: wins[lin] / games[lin] for lin in sorted(games)}
    return a


def checks(a):
    """(metric, target text, result text, ok) rows. ok is None when there's no pass/fail."""
    rows = []

    def window(name, key, lo, hi):
        v = a[key]["median"]
        ok = v is not None and lo <= v <= hi and a[key]["reached"] >= 0.9
        res = f"{mmss(v)} (10–90%: {mmss(a[key]['p10'])}–{mmss(a[key]['p90'])}; reached in {a[key]['reached']:.0%})"
        rows.append((name, f"{mmss(lo)}–{mmss(hi)}", res, ok))

    window("First lineage awakens (L3)", "L3", 150, 210)
    window("First return to base", "first return", 300, 420)
    window("First Stage 2", "Stage 2", 480, 600)
    window("First global event", "first event", 600, 780)
    window("First Synergy", "first Synergy", 720, 840)
    window("First Level 20", "L20", 960, 1080)
    e = a["end"]
    rows.append(("Match length", "20:00–23:00 (inside 18–25)", f"{mmss(e['median'])} (10–90%: {mmss(e['p10'])}–{mmss(e['p90'])})",
                 1200 <= e["median"] <= 1380))
    rows.append(("Matches won by mercy", "10–20%", f"{a['mercy_share']:.0%}", 0.10 <= a["mercy_share"] <= 0.20))
    rows.append(("Matches reaching the time limit", "≤ 25%", f"{a['time_limit_share']:.0%}", a["time_limit_share"] <= 0.25))
    rows.append(("Level gap at 15:00 (highest − lowest)", "≤ 6", f"{a['gap_900']:.1f}", a["gap_900"] <= 6))
    rows.append(("Returns to base per player", "4–6", f"{a['returns_per_player']:.1f}", 4 <= a["returns_per_player"] <= 6))
    rows.append(("Conversions at 300+ cores", "20–35%", f"{a['conv_300_share']:.0%}", 0.20 <= a["conv_300_share"] <= 0.35))
    cb = a["comeback"]
    rows.append(("Comeback (behind ≥ 10% TI at 10:00 and wins)", "25–35%",
                 f"{cb:.0%} (of {a['comeback_n']} matches)" if cb is not None else "no such matches",
                 cb is not None and 0.25 <= cb <= 0.35))
    rows.append(("Hub changes of hands", "4–8", f"{a['hub_changes']:.1f}", 4 <= a["hub_changes"] <= 8))
    rows.append(("SAP earned per team", "18,000–22,000", f"{a['sap_earned']:,.0f}", 18000 <= a["sap_earned"] <= 22000))
    rows.append(("Synergy level at 10:00 (per pair)", "about 5", f"{a['syn_600']:.1f}" if a["syn_600"] else "—",
                 a["syn_600"] is not None and 4 <= a["syn_600"] <= 6))
    rows.append(("Synergy level at 18:00 (per pair)", "10 (S3)", f"{a['syn_1080']:.1f}" if a["syn_1080"] else "—",
                 a["syn_1080"] is not None and a["syn_1080"] >= 9.5))
    rows.append(("Side balance (Wildborn win rate)", "50% ± 2", f"{a['wildborn_win']:.1%}",
                 abs(a["wildborn_win"] - 0.5) <= 0.02 + 1.0 / max(1, a["n"]) ** 0.5))
    for k in SOURCES:
        lo, hi = SOURCE_TARGETS[k]
        v = a["exp_share"][k]
        rows.append((f"EXP share: {k}", f"{lo:.0%}–{hi:.0%}", f"{v:.0%}", lo <= v <= hi))
    return rows


def markdown(a, title, settings):
    rows = checks(a)
    passed = sum(1 for r in rows if r[3])
    out = [f"# {title}", "", f"{a['n']} simulated matches. {settings}", "",
           f"**{passed} of {len(rows)} targets met.**", "",
           "| Metric | Target | Simulated | |", "|---|---|---|---|"]
    for name, target, res, ok in rows:
        out.append(f"| {name} | {target} | {res} | {'OK' if ok else '**MISS**'} |")
    out += ["", "## Other results", "", "| Measure | Value |", "|---|---|",
            f"| Median level at match end | {a['level_end_median']:.0f} |",
            f"| Kills per match | {a['kills']:.1f} |",
            f"| Global events per match | {a['events']:.1f} |",
            f"| Average Hub Defense level at 15:00 (held Hubs) | {a['hub_level_900']:.1f} |",
            f"| Draws | {a['draws']:.1%} |"]
    for how, share in sorted(a["how"].items(), key=lambda x: -x[1]):
        out.append(f"| Ended by: {how} | {share:.0%} |")
    out += ["", "| Lineage | Win rate when on a team |", "|---|---|"]
    for lin, w in a["lineage_win"].items():
        out.append(f"| {lin} | {w:.1%} |")
    return "\n".join(out) + "\n"

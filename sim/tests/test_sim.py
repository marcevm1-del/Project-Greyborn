"""Checks that the simulator reads the workbook correctly and applies the spec's formulas.

Run from the repository root:  python3 -m unittest discover -s sim/tests
"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from greyborn_sim import data, match  # noqa: E402

T = data.load()


class WorkbookTests(unittest.TestCase):
    def test_exp_curve_total(self):
        self.assertEqual(T.exp_total, 5320)  # Spec 05 section 2

    def test_counts(self):
        self.assertEqual(sum(len(v) for v in T.ults.values()), 42)
        natives = [c for c in T.creatures if c["group"] != "Clamor"]
        self.assertEqual(len(natives), 54)

    def test_stat_anchors(self):
        self.assertEqual(T.stat("Titan", "Health", 1), 600)
        self.assertEqual(T.stat("Titan", "Health", 10), 2600)
        self.assertEqual(T.stat("Bonespire", "Power", 20), 260)

    def test_phase_synergy_matrix(self):
        self.assertEqual(T.phase_synergy[3], [None, 31, 20])
        self.assertEqual(T.phase_synergy[4], [None, None, 9])

    def test_override(self):
        t = data.load(overrides={"Economy:SAP per cell": 0.1, "EXP:EXP base": 60})
        self.assertEqual(t.econ["SAP per cell"], 0.1)
        self.assertEqual(t.exp_to_next[1], 80)  # 60 + 20 x 1
        with self.assertRaises(KeyError):
            data.load(overrides={"Economy:No such row": 1})


class RuleTests(unittest.TestCase):
    def setUp(self):
        self.m = match.Match(T, seed=1)

    def test_conversion_worked_example(self):
        # Spec 05 section 4: 320 cores at base with the partner -> 448 EXP; field -> 224 EXP.
        p = self.m.players[0]
        p.carried = {"kills": 320}
        p.partner.convert_end = self.m.t
        self.m.convert(p, field=False)
        self.assertAlmostEqual(p.exp, 448)
        q = self.m.players[2]
        q.carried = {"kills": 320}
        self.m.convert(q, field=True)
        self.assertAlmostEqual(q.exp, 224)

    def test_levels_follow_curve(self):
        p = self.m.players[0]
        self.m.gain_exp(p, 1620, {"kills": 1.0})
        self.assertEqual(p.level, 10)

    def test_territorial_influence(self):
        m = self.m
        m.cells = [[96, 0, 0], [0, 0, 96]]
        m.hubs[0]["owner"] = m.hubs[1]["owner"] = 0
        # 96 + 12 Hub cells = 108 of 240, + 3 points per Hub = ~51% (Spec 05 section 5)
        self.assertAlmostEqual(m.ti(0), 108 / 240 + 0.06)

    def test_carry_cap(self):
        p = self.m.players[0]
        self.m.add_cores(p, 1000, "wildlife")
        self.assertEqual(p.carry, T.econ["Carry cap"])


class MatchTests(unittest.TestCase):
    def test_deterministic_and_finishes(self):
        a = match.Match(T, seed=7).run()
        b = match.Match(T, seed=7).run()
        self.assertEqual(a["time"], b["time"])
        self.assertEqual(a["levels"], b["levels"])
        self.assertLessEqual(a["time"], match.TIME_LIMIT + match.OVERTIME)


if __name__ == "__main__":
    unittest.main()

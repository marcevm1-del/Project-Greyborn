"""One simulated 4v4 match, stepped once per second.

The map is abstracted into three zones (team 0's half, the centre, team 1's
half). Players are bots that farm wildlife, capture and uproot cells, fight,
siege structures and decide when to return and convert. Every rule value comes
from the tuning workbook (see data.py); the constants below are the *model's*
own assumptions (how often bots meet, how far things are), which are not part
of the game's design and are documented in sim/README.md.
"""
import math
import random

from .data import PAIRS

# ---- Model assumptions (not design values) ----------------------------------
ZONE_CELLS = [84, 42, 84]          # non-Hub cells per zone (240 total with 5 Hubs x 6)
HUB_ZONES = [0, 0, 1, 2, 2]
HUB_CELLS = 6
START_CELLS = 8                    # cells each team owns around its base at 0:00
TRAVEL_BASE = 10                   # s from base to the home zone at Speed 100%
TRAVEL_ZONE = 14                   # s per zone crossed at Speed 100%
ENGAGE_RATE = 0.02                 # chance per second per opposing pair in a zone
WALK = 4                           # s walking between nodes or camps
CAMPS = {0: {"I": 7, "II": 4, "III": 2}, 1: {"I": 4, "II": 3, "III": 2}}  # per half / centre
GROUP = {"I": 2, "II": 2, "III": 1}
RESPAWN = {"I": 45, "II": 90, "III": 180}                     # Spec 04 tier baselines
CREATURE_DPS = {"I": 10, "II": 46, "III": 97, "IV": 175}      # hit damage / interval, Spec 04
CENTRE_PULL = 1.5                  # extra wish to contest the centre from Phase 2
STAY_BONUS = 1.0                   # hysteresis: bots don't hop zones on a whim
HUNT_PULL = 0.3                    # per visible enemy, away from home, from Phase 2
DEFEND_PULL = 1.0                  # per enemy standing in the bot's home half
ENEMY_CAMP_W = 0.4                 # enemy-half wildlife is less attractive (risk of being caught)
FRONTIER = 10                      # enemy cells touching a team's territory in a zone
PUSH_PULL = 3.0                    # per dead enemy: teams push the open Base Heart after winning a fight
ABILITY_USE = 0.8
# Proposed rule, off by default: below this level, cores become EXP when picked up
# (no return needed to awaken). 0 = the spec as written.
DIRECT_EXP_BELOW = 0                  # share of cooldowns actually used in a fight
WEAK_POINT_AVG = 1.1               # average damage gain from weak-point hits
FLEE_HP = 0.25
CAPTURE_W = {"Verdant": 2.0, "Hollow": 1.3, "Titan": 1.0}
SIEGE_W = {"Bonespire": 2.0, "Titan": 1.3, "Brawler": 1.2}
SYN_COST = 30                      # Synergy level n -> n+1 costs SYN_COST x n XP (gdd/04)
SYN_XP = {"kill": 10, "capture": 5, "convert": 5, "synergy": 15, "survive": 5}

PHASE_STARTS = [0, 300, 600, 960]
TIME_LIMIT = 1500
OVERTIME = 120


class Player:
    def __init__(self, pid, team, lineage, skill, rng):
        self.id, self.team, self.lineage, self.skill = pid, team, lineage, skill
        self.level, self.exp = 1, 0
        self.hp = 0
        self.carried = {}
        self.state, self.zone, self.until = "base", None, 0
        self.task, self.task_until, self.task_ref = None, 0, None
        self.cap_prog = 0.0
        self.return_at = rng.uniform(180, 340)
        self.partner = None
        self.ult_ready, self.syn_ready = 0, 0
        self.heal_ready = 0
        self.last_hit = -99
        self.wild_cores = 0
        self.converts = 0
        self.convert_end = -99
        self.exp_src = {"kills": 0, "wildlife": 0, "cores": 0, "passive": 0, "bonus": 0, "events": 0}

    @property
    def carry(self):
        return sum(self.carried.values())

    @property
    def stage(self):
        return 3 if self.level >= 20 else 2 if self.level >= 10 else 1


class Match:
    def __init__(self, tuning, seed, lineups=None):
        self.T = tuning
        self.rng = random.Random(seed)
        self.t = 0
        self.side = self.rng.choice([0, 1])  # which team is Wildborn this match
        rng = self.rng
        self.players = []
        for team in (0, 1):
            pairs = lineups[team] if lineups else rng.sample(PAIRS, 2)
            for a, b in pairs:
                pa = Player(len(self.players), team, a, min(1.3, max(0.7, rng.gauss(1, 0.1))), rng)
                self.players.append(pa)
                pb = Player(len(self.players), team, b, min(1.3, max(0.7, rng.gauss(1, 0.1))), rng)
                self.players.append(pb)
                pa.partner, pb.partner = pb, pa
        for p in self.players:
            p.hp = self.max_hp(p)
        self.pair_xp = {}
        e = self.T.econ
        self.cells = [[0, 0, 0], [0, 0, 0]]
        self.cells[0][0] = self.cells[1][2] = START_CELLS
        self.hubs = [{"zone": z, "owner": None, "level": 0, "hp": e["Hub base Health"], "hit": -99,
                      "prog": [0.0, 0.0], "uproot": 0.0} for z in HUB_ZONES]
        self.ecores = [[{"hp": e["Enemy Core Health"], "max": e["Enemy Core Health"], "alive": True,
                         "regrow": None, "reward": e["Enemy Core reward"], "hit": -99} for _ in range(3)]
                       for _ in (0, 1)]
        self.heart = [{"hp": e["Base Heart Health"], "hit": -99} for _ in (0, 1)]
        self.sap = [0.0, 0.0]
        self.sap_earned = [0.0, 0.0]
        self.camps = []
        for z in range(3):
            for tier, n in CAMPS[1 if z == 1 else 0].items():
                for _ in range(n):
                    self.camps.append(self._new_camp(z, tier))
        self.apex = None
        self.ground = [[] for _ in range(3)]
        self.fight = [False, False, False]
        self.last_fight = [-99, -99, -99]
        self.tension = [0.0, 0.0, 0.0]
        self.zone_event_cd = [0, 0, 0]
        self.next_event_ok = 0
        self.effects = []  # dicts: name, zone, until, team
        self.mercy_since = [None, None]
        self.result = None
        self.m = {"first": {}, "hub_changes": 0, "kills": 0, "conversions": [], "events": 0,
                  "ti_600": None, "gap_900": None, "syn_1080": None, "apex_kills": 0,
                  "hub_level_900": None, "wild_deaths": 0}

    # ---------------------------------------------------------------- helpers
    def _new_camp(self, zone, tier):
        pool = [c for c in self.T.creatures if c["tier"] == tier and c["health"] and c["group"] != "Clamor"
                and c["cores"] > 0]
        c = self.rng.choice(pool)
        return {"zone": zone, "tier": tier, "health": c["health"] * GROUP[tier],
                "cores": c["cores"] * GROUP[tier], "sap": c["sap"], "alive": True, "respawn": 0,
                "affinity": self.rng.choice(["Titan", "Brawler", "Verdant", "Hollow", "Thornrunner",
                                             "Bonespire", None, None])}

    @property
    def phase(self):
        return 4 if self.t >= 960 else 3 if self.t >= 600 else 2 if self.t >= 300 else 1

    def first(self, key):
        self.m["first"].setdefault(key, self.t)

    def max_hp(self, p):
        return self.T.stat(p.lineage, "Health", p.level)

    def power(self, p):
        return self.T.stat(p.lineage, "Power", p.level)

    def speed(self, p):
        return self.T.stat(p.lineage, "Speed %", p.level)

    def dps(self, p):
        P = self.power(p)
        if p.level < 3:
            ratio, rate = 1.0, 1.2
            return ratio * rate * P * WEAK_POINT_AVG * p.skill
        ratio, rate = self.T.basic[p.lineage]
        d = ratio * rate * P
        for a in self.T.abilities.get(p.lineage, []):
            if a["base"] is not None and a["cd"]:
                d += (a["base"] + a["ratio"] * P) / a["cd"] * ABILITY_USE
        return d * WEAK_POINT_AVG * p.skill

    def ult_value(self, p):
        P = self.power(p)
        vals = [(u["base"] + u["ratio"] * P) if u["base"] is not None else 2.0 * P for u in self.T.ults[p.lineage]]
        cds = [u["cd"] for u in self.T.ults[p.lineage]]
        return 2 * sum(vals) / len(vals), sum(cds) / len(cds)

    def home(self, team):
        return 0 if team == 0 else 2

    def dist(self, team, zone):
        return abs(zone - self.home(team))

    def ti(self, team):
        e = self.T.econ
        cells = sum(self.cells[team]) + HUB_CELLS * sum(1 for h in self.hubs if h["owner"] == team)
        hubs = sum(1 for h in self.hubs if h["owner"] == team)
        return min(1.0, cells / e["Capturable cells (standard map)"] + hubs * e["TI per Hub held"] / 100)

    def neutral(self, zone):
        return ZONE_CELLS[zone] - self.cells[0][zone] - self.cells[1][zone]

    def accessible(self, team, zone):
        if zone == self.home(team):
            return True
        if self.phase == 1:
            return False
        if zone == 1:
            return True
        return self.cells[team][1] >= 8 or any(h["owner"] == team for h in self.hubs if h["zone"] == 1)

    def wildborn(self, team):
        return team == self.side

    def effect(self, name, zone=None):
        return any(f["name"] == name and (zone is None or f["zone"] == zone) and f["until"] > self.t
                   for f in self.effects)

    def in_zone(self, zone, team=None):
        return [p for p in self.players if p.state in ("zone", "field") and p.zone == zone
                and (team is None or p.team == team)]

    def add_cores(self, p, amount, source):
        if p.level < DIRECT_EXP_BELOW and amount > 0:
            self.gain_exp(p, amount, {source: 1.0})
            if p.level >= 3:
                self.first("L3 (direct)")
            return amount
        room = self.T.econ["Carry cap"] - p.carry
        amount = max(0, min(amount, room))
        p.carried[source] = p.carried.get(source, 0) + amount
        return amount

    def syn_xp(self, p, kind):
        key = tuple(sorted((p.id, p.partner.id)))
        self.pair_xp[key] = self.pair_xp.get(key, 0) + SYN_XP[kind]

    def syn_level(self, p):
        xp, lv = self.pair_xp.get(tuple(sorted((p.id, p.partner.id))), 0), 1
        while lv < 10 and xp >= SYN_COST * lv:
            xp -= SYN_COST * lv
            lv += 1
        return lv

    # ---------------------------------------------------------------- levels
    def gain_exp(self, p, amount, shares):
        """Apply EXP; shares maps source -> fraction of `amount`. Returns EXP applied."""
        T = self.T
        if p.level >= 20:
            return 0
        applied = min(amount, T.exp_total - p.exp)
        for src, frac in shares.items():
            p.exp_src[src] += applied * frac
        p.exp += applied
        frac_hp = p.hp / self.max_hp(p)
        while p.level < 20 and p.exp >= sum(T.exp_to_next[1:p.level + 1]):
            p.level += 1
            if p.level == 3:
                self.first("L3")
            if p.level == 10:
                self.first("Stage 2")
            if p.level == 20:
                self.first("L20")
        p.hp = frac_hp * self.max_hp(p)
        return applied

    def convert(self, p, field):
        e = self.T.econ
        carried = p.carry
        if carried <= 0:
            return
        if p.level >= 20:
            self.sap[p.team] += carried / e["L20 cores per SAP"]
            self.sap_earned[p.team] += carried / e["L20 cores per SAP"]
            p.carried = {}
            return
        if field:
            mult, bonus = e["Field conversion efficiency"], 0.0
        else:
            agg = min(e["Aggression bonus cap"],
                      int(carried // 100) * e["Aggression bonus per full 100 carried"])
            res = e["Evolution-Sync Resonance"] if (self.t - p.partner.convert_end <= 10
                                                    or p.partner.state == "convert") else 0
            if res:
                self.syn_xp(p, "convert")
            mult, bonus = 1.0, agg + res
        total = carried * (mult + bonus)
        shares = {src: amt * mult / total for src, amt in p.carried.items()}
        shares["bonus"] = carried * bonus / total
        self.gain_exp(p, total, shares)
        self.m["conversions"].append(carried)
        p.converts += 1
        p.convert_end = self.t
        p.carried = {}
        self.first("first return")

    def convert_time(self, team):
        e = self.T.econ
        hubs = sum(1 for h in self.hubs if h["owner"] == team)
        tier = (2 if hubs >= 3 else 1 if hubs == 2 else 0) - self.cores_lost(team)
        times = [e["C1 conversion (0–1 Hubs)"], e["C2 conversion (2 Hubs)"], e["C3 conversion (3+ Hubs)"]]
        return e["Conversion floor after Core losses"] if tier < 0 else times[tier]

    def cores_lost(self, team):
        return sum(1 for c in self.ecores[team] if not c["alive"])

    # ---------------------------------------------------------------- death
    def kill(self, victim, killer, assists):
        e = self.T.econ
        z = victim.zone
        if victim.carry:
            self.ground[z].append({"amount": victim.carry, "until": self.t + e["Dropped cores last"]})
        victim.carried = {}
        bounty = self.T.exp_params["Bounty base"] + self.T.exp_params["Bounty per level"] * victim.level
        if killer is None:
            enemies = self.in_zone(z, 1 - victim.team)
            killer = self.rng.choice(enemies) if enemies else None
            assists = []
        if killer is not None:
            self.add_cores(killer, bounty, "kills")
            for a in assists:
                self.add_cores(a, bounty * e["Assist bounty share"], "kills")
            if killer.partner in assists:
                self.syn_xp(killer, "kill")
            self.m["kills"] += 1
        self.abandon(victim)
        victim.state = "dead"
        respawn = self.T.exp_params["Respawn base (s)"] + self.T.exp_params["Respawn per level (s)"] * victim.level
        if self.phase == 4:
            respawn += self.T.exp_params["Phase 4 respawn extra (s)"]
        victim.until = self.t + respawn

    # ---------------------------------------------------------------- bots
    def choose_zone(self, p):
        best, best_score = self.home(p.team), -1e9
        for z in range(3):
            if not self.accessible(p.team, z):
                continue
            s = self.rng.random()
            capturable = self.neutral(z) + self.frontier(p.team, z)
            s += capturable * 0.02 * CAPTURE_W.get(p.lineage, 0.7)
            camps = sum(1 for c in self.camps if c["zone"] == z and c["alive"])
            s += camps * 0.15 * (ENEMY_CAMP_W if z == self.home(1 - p.team) else 1)
            if z == self.home(p.team):
                s += len(self.in_zone(z, 1 - p.team)) * DEFEND_PULL
            for h in self.hubs:
                if h["zone"] == z and h["owner"] != p.team:
                    s += 1.5
                if h["zone"] == z and h["owner"] == p.team and self.t - h["hit"] < 10:
                    s += 5
            if z == self.home(p.team):
                if any(self.t - c["hit"] < 10 for c in self.ecores[p.team]) or self.t - self.heart[p.team]["hit"] < 10:
                    s += 8
            if z == self.home(1 - p.team) and p.stage >= 2 and self.phase >= 2:
                s += 1.5 * SIEGE_W.get(p.lineage, 0.8) * (2 if self.phase >= 3 else 1)
                if self.heart_open(1 - p.team):
                    dead = sum(1 for q in self.players if q.team != p.team and q.state == "dead")
                    s += 6 + PUSH_PULL * dead
            if self.apex and self.apex["zone"] == z and p.stage >= 2:
                s += 4
            if self.ground[z]:
                s += 2
            if p.partner.state in ("zone", "move", "field") and p.partner.zone == z:
                s += 1.0
            if z == 1 and self.phase >= 2:
                s += CENTRE_PULL
            if p.state == "zone" and p.zone == z:
                s += STAY_BONUS
            if z != self.home(p.team) and self.phase >= 2:
                s += len(self.in_zone(z, 1 - p.team)) * HUNT_PULL * (2 if p.lineage == "Thornrunner" else 1)
            danger = len(self.in_zone(z, 1 - p.team)) - len(self.in_zone(z, p.team))
            s -= max(0, danger) * p.carry / 300
            if s > best_score:
                best, best_score = z, s
        return best

    def frontier(self, team, zone):
        """Enemy cells in `zone` that touch this team's territory (uprootable now)."""
        enemy = self.cells[1 - team][zone]
        if not enemy or (zone == self.home(1 - team) and self.phase < 2):
            return 0
        if self.cells[team][zone]:
            return min(enemy, FRONTIER)
        near = [n for n in (zone - 1, zone + 1) if 0 <= n < 3]
        return min(enemy, FRONTIER // 2) if any(self.cells[team][n] for n in near) else 0

    def heart_open(self, team):
        return self.phase == 4 or all(not c["alive"] for c in self.ecores[team])

    def choose_task(self, p):
        z, rng, opts = p.zone, self.rng, []
        enemy = 1 - p.team
        allies = len(self.in_zone(z, p.team))
        if p.stage >= 2:
            if z == self.home(enemy) and self.phase >= 2 and (allies >= 2 or p.lineage == "Bonespire"):
                if self.heart_open(enemy):
                    opts.append((("siege", "heart"), 6))
                for i, c in enumerate(self.ecores[enemy]):
                    if c["alive"]:
                        opts.append((("siege", i), 2 * SIEGE_W.get(p.lineage, 0.8)))
                        break
            for i, h in enumerate(self.hubs):
                if h["zone"] == z and h["owner"] == enemy:
                    opts.append((("hub", i), 3))
            if self.apex and self.apex["zone"] == z:
                opts.append((("apex", None), 5))
        capturable = self.neutral(z) + self.frontier(p.team, z) + sum(
            1 for h in self.hubs if h["zone"] == z and h["owner"] is None)
        if capturable:
            opts.append((("capture", None), 2 * CAPTURE_W.get(p.lineage, 0.7) * min(1, capturable / 10)))
        camps = [c for c in self.camps if c["zone"] == z and c["alive"]
                 and (c["tier"] != "III" or p.stage >= 2 or allies >= 2 or rng.random() < 0.3)]
        if camps:
            opts.append((("farm", None), 3 if self.phase <= 2 else 1.5))
        if not opts:
            return None
        total = sum(w for _, w in opts)
        x = rng.random() * total
        for o, w in opts:
            x -= w
            if x <= 0:
                return o
        return opts[-1][0]

    # ---------------------------------------------------------------- per-second steps
    def step_player(self, p):
        e, T = self.T.econ, self.T
        if p.state == "dead":
            if self.t >= p.until:
                p.state, p.hp = "base", self.max_hp(p)
            return
        if p.state == "base":
            z = self.choose_zone(p)
            p.state, p.zone = "move", z
            p.until = self.t + (TRAVEL_BASE + TRAVEL_ZONE * self.dist(p.team, z)) * 100 / self.speed(p)
            return
        if p.state == "move":
            if self.t >= p.until:
                p.state, p.task = "zone", None
            return
        if p.state == "return":
            if self.t >= p.until:
                if p.carry:
                    p.state, p.until = "convert", self.t + self.convert_time(p.team)
                else:
                    p.state = "base"
                p.hp = self.max_hp(p)
            return
        if p.state == "convert":
            if self.t >= p.until:
                self.convert(p, field=False)
                p.state = "base"
            return
        if p.state == "field":
            if self.t >= p.until:
                self.convert(p, field=True)
                p.state, p.task = "zone", None
            return
        # ---- in a zone
        if self.fight[p.zone]:
            return  # handled by the fight step
        if self.t - p.last_hit >= 6:
            p.hp = min(self.max_hp(p), p.hp + 0.02 * self.max_hp(p))
        if self.ground[p.zone]:
            self.pickup(p)
        if self.should_return(p):
            return
        if p.task is None or self.t >= p.task_until:
            self.finish_task(p)
            push = self.phase == 4 and any(q.state == "dead" for q in self.players if q.team != p.team)
            if self.rng.random() < (0.5 if push else 0.15):
                z = self.choose_zone(p)
                if z != p.zone:
                    p.until = self.t + TRAVEL_ZONE * abs(z - p.zone) * 100 / self.speed(p) + 1
                    p.state, p.zone, p.task = "move", z, None
                    return
            p.task = self.choose_task(p)
            p.task_until = self.t + 5
            if p.task and p.task[0] == "farm":
                self.start_farm(p)
        self.do_task(p)

    def should_return(self, p):
        e = self.T.econ
        carry = p.carry
        if carry <= 0:
            return False
        if self.phase == 4 and (self.t - self.heart[p.team]["hit"] < 15 or self.heart_open(1 - p.team)):
            if carry < e["Carry cap"]:
                return False
        low = p.hp < 0.35 * self.max_hp(p)
        threshold = 400 if p.level >= 20 else p.return_at
        if not (carry >= threshold or (carry >= 120 and low) or carry >= e["Carry cap"] - 10):
            return False
        enemies = self.in_zone(p.zone, 1 - p.team)
        own_hub = any(h["zone"] == p.zone and h["owner"] == p.team for h in self.hubs)
        if own_hub and enemies and carry < 300 and p.level < 20:
            p.state, p.until = "field", self.t + self.convert_time(p.team)
            self.abandon(p)
            return True
        if enemies and self.rng.random() < (0.4 if carry >= 300 else 0.25 if carry >= 150 else 0.1):
            self.fight[p.zone] = True  # caught on the way out: a fight starts here
            return True
        p.state = "return"
        p.until = self.t + (TRAVEL_BASE + TRAVEL_ZONE * self.dist(p.team, p.zone)) * 100 / self.speed(p)
        self.abandon(p)
        return True

    def pickup(self, p):
        for g in self.ground[p.zone]:
            got = self.add_cores(p, min(g["amount"], 60), "kills")
            g["amount"] -= got

    def start_farm(self, p):
        mult = self.T.phase_mult[self.phase - 1]
        dps = self.dps(p)
        allies = max(1, len([q for q in self.in_zone(p.zone, p.team) if q.task and q.task[0] == "farm"]))
        # skip camps the bot would not survive (damage taken while killing it, shared by allies farming here)
        camps = [c for c in self.camps if c["zone"] == p.zone and c["alive"]
                 and CREATURE_DPS[c["tier"]] * 0.5 * mult * c["health"] * mult / dps / allies < 0.7 * p.hp]
        if not camps:
            p.task = None
            return

        def value(c):
            risky = c["tier"] == "III" and p.stage == 1 and len(self.in_zone(p.zone, p.team)) < 2
            return c["cores"] / (c["health"] * mult / dps + WALK) * (0.5 if risky else 1)
        camp = max(camps, key=value)
        camp["alive"] = False  # reserved while being fought
        p.task_ref = camp
        p.task_until = self.t + camp["health"] * mult / dps + WALK

    def finish_task(self, p):
        if p.task and p.task[0] == "farm" and p.task_ref is not None:
            c = p.task_ref
            e = self.T.econ
            value = c["cores"] * (self.T.affinity_mult if c["affinity"] == p.lineage else 1)
            full = max(0, min(value, e["Wildlife full-value cap"] - p.wild_cores))
            value = full + (value - full) * e["Wildlife value after cap"]
            p.wild_cores += c["cores"]
            self.add_cores(p, value, "wildlife")
            self.sap[p.team] += c["sap"]
            self.sap_earned[p.team] += c["sap"]
            c["respawn"] = self.t + RESPAWN[c["tier"]]
            p.task_ref = None
        p.task = None

    def abandon(self, p):
        if p.task and p.task[0] == "farm" and p.task_ref is not None:
            p.task_ref["alive"] = True
            p.task_ref = None
        p.task = None

    def do_task(self, p):
        if p.task is None:
            return
        kind, ref = p.task
        e = self.T.econ
        z, enemy = p.zone, 1 - p.team
        if kind == "farm":
            c = p.task_ref
            dmg = CREATURE_DPS[c["tier"]] * self.T.phase_mult[self.phase - 1] * 0.5  # half the time dodged
            p.hp -= dmg
            p.last_hit = self.t
            if p.hp <= 0:
                c["alive"] = True
                p.task_ref = None
                self.m["wild_deaths"] += 1
                self.kill(p, None, [])
        elif kind == "capture":
            ctrl = self.T.stat(p.lineage, "Control", p.level)
            root = (e["Root channel (Verdant)"] if p.lineage == "Verdant" and p.level >= 3
                    else e["Root channel"]) * (1 - min(0.5, ctrl / 200))
            boost = 1.5 if self.effect("Rootquake", z) else 1.0
            tier = max([self.syn_tier(q) for q in self.in_zone(z, p.team)] + [0])
            uproot = [5, 5, 4, 3][tier]
            if self.effect("Heartquake", z) and self.wildborn(p.team):
                uproot /= 2
            hub = next((h for h in self.hubs if h["zone"] == z and h["owner"] is None), None)
            if hub is not None:
                hub["prog"][p.team] += boost / (root / HUB_CELLS + 2 + WALK / HUB_CELLS)
                if hub["prog"][p.team] >= HUB_CELLS:
                    hub["owner"], hub["level"], hub["prog"] = p.team, 0, [0.0, 0.0]
                    hub["hp"] = e["Hub base Health"]
                    self.m["hub_changes"] += 1
            elif self.frontier(p.team, z) > 0:
                p.cap_prog += boost / (uproot + 2)
                if p.cap_prog >= 1:
                    p.cap_prog -= 1
                    self.cells[enemy][z] -= 1
            elif self.neutral(z) > 0:
                p.cap_prog += boost * 2 / (root + 2 + WALK)
                while p.cap_prog >= 1 and self.neutral(z) > 0:
                    p.cap_prog -= 1
                    self.cells[p.team][z] += 1
                    if p.partner.zone == z and p.partner.state == "zone" and p.partner.task and \
                            p.partner.task[0] == "capture":
                        self.syn_xp(p, "capture")
                    if self.overtime_capture(p.team):
                        return
            else:
                p.task = None
        elif kind == "hub":
            h = self.hubs[ref]
            if h["owner"] != enemy:
                p.task = None
                return
            hmax = e["Hub base Health"] + e["Hub Health per level"] * h["level"]
            if h["hp"] > e["Hub shield threshold"] * hmax:
                h["hp"] -= self.dps(p) * e["Structure damage modifier"]
            else:
                h["hp"] -= self.dps(p) * e["Structure damage modifier"]
                h["hp"] = max(1, h["hp"])
                speed = 2 if h["hp"] < 0.33 * hmax else 1
                h["uproot"] += speed / 5
                if h["uproot"] >= HUB_CELLS:
                    h["owner"], h["level"], h["uproot"] = None, 0, 0.0
                    h["hp"] = e["Hub base Health"]
                    self.m["hub_changes"] += 1
            h["hit"] = self.t
        elif kind == "siege":
            dmg = self.dps(p) * e["Structure damage modifier"]
            if ref == "heart":
                self.heart[enemy]["hp"] -= dmg
                self.heart[enemy]["hit"] = self.t
                if self.heart[enemy]["hp"] <= 0:
                    self.end(p.team, "Base Heart")
            else:
                c = self.ecores[enemy][ref]
                if not c["alive"]:
                    p.task = None
                    return
                c["hp"] -= dmg
                c["hit"] = self.t
                if c["hp"] <= 0:
                    c["alive"], c["regrow"] = False, self.t + e["Enemy Core regrowth"]
                    attackers = self.in_zone(z, p.team)
                    for a in attackers:
                        self.add_cores(a, c["reward"] / len(attackers), "cores")
                    self.first("first Enemy Core")
        elif kind == "apex":
            a = self.apex
            if not a:
                p.task = None
                return
            d = self.dps(p)
            a["hp"] -= d
            a["dmg"][p.id] = a["dmg"].get(p.id, 0) + d
            if self.rng.random() < 0.25:
                p.hp -= CREATURE_DPS["IV"] * 2 * self.T.phase_mult[self.phase - 1]
                p.last_hit = self.t
                if p.hp <= 0:
                    self.kill(p, None, [])
            if a["hp"] <= 0:
                self.apex_killed()

    def apex_killed(self):
        a = self.apex
        total = sum(a["dmg"].values())
        team_share = [0.0, 0.0]
        for pid, d in a["dmg"].items():
            share = d / total
            if share >= 0.03:
                pl = self.players[pid]
                self.add_cores(pl, 400 * share, "wildlife")
                team_share[pl.team] += share
        for team in (0, 1):
            self.sap[team] += 100 * team_share[team]
            self.sap_earned[team] += 100 * team_share[team]
        self.apex = None
        self.m["apex_kills"] += 1
        for p in self.players:
            if p.task and p.task[0] == "apex":
                p.task = None

    def syn_tier(self, p):
        """Synergy tier 1-3 a pair can use now (0 if not unlocked or locked by phase)."""
        syn = next((s for s in self.T.synergies if p.lineage in s["pair"]), None)
        if not syn or p.level < syn["unlock"] or p.partner.level < syn["unlock"]:
            return 0
        lv = self.syn_level(p)
        tier = 3 if lv >= 10 else 2 if lv >= 5 else 1
        return tier if self.T.phase_synergy[self.phase][tier - 1] is not None else 0

    def step_fight(self, z):
        fighters = [p for p in self.in_zone(z)]
        teams = [[p for p in fighters if p.team == 0], [p for p in fighters if p.team == 1]]
        if not self.fight[z]:
            if not teams[0] or not teams[1]:
                return
            rate = ENGAGE_RATE * (1.5 if self.effect("Thousand Whispers") else 1)
            if self.rng.random() > 1 - (1 - rate) ** (len(teams[0]) * len(teams[1])):
                return
            self.fight[z] = True
        if not teams[0] or not teams[1]:
            self.fight[z] = False
            for team in teams:
                for p in team:
                    if p.partner in team:
                        self.syn_xp(p, "survive")
            return
        self.last_fight[z] = self.t
        for p in fighters:
            if p.state == "field":
                p.state = "zone"
            self.abandon(p)
        mult = (1.15 if self.effect("Marrow Storm", z) else 1) * (1.05 if self.effect("Stampede", z) else 1)
        dmg_in = {p.id: 0.0 for p in fighters}
        hitters = {p.id: [] for p in fighters}
        for team in (0, 1):
            foes = teams[1 - team]
            for p in teams[team]:
                if p.lineage in ("Thornrunner", "Bonespire") and self.rng.random() < 0.5:
                    target = max(foes, key=lambda q: q.carry)
                else:
                    target = min(foes, key=lambda q: q.hp)
                d = self.dps(p) * mult
                if p.level >= 20 and self.t >= p.ult_ready:
                    burst, cd = self.ult_value(p)
                    d += burst
                    p.ult_ready = self.t + cd
                tier = self.syn_tier(p)
                if tier and p.partner in teams[team] and self.t >= p.syn_ready and p.id < p.partner.id:
                    d += (self.dps(p) + self.dps(p.partner)) * 1.0
                    cd = self.T.phase_synergy[self.phase][tier - 1]
                    p.syn_ready = p.partner.syn_ready = self.t + cd
                    self.syn_xp(p, "synergy")
                    self.first("first Synergy")
                dr = 0.0
                if target.lineage == "Titan" and p.stage < target.stage:
                    dr = 0.10
                hub = next((h for h in self.hubs if h["zone"] == z and h["owner"] == target.team), None)
                if hub:
                    dr = 1 - (1 - dr) * (1 - min(0.75, self.T.econ["Hub ally DR per level"] * hub["level"]) * 0.5)
                dmg_in[target.id] += d * (1 - min(0.75, dr))
                hitters[target.id].append(p)
            # Verdant healing (Sap Draw)
            for p in teams[team]:
                if p.lineage == "Verdant" and p.level >= 3 and self.t >= p.heal_ready and self.sap[team] >= 40:
                    ally = min(teams[team], key=lambda q: q.hp / self.max_hp(q))
                    heal = min(120 + 1.0 * self.power(p), 0.05 * self.max_hp(ally) * 4)
                    ally.hp = min(self.max_hp(ally), ally.hp + heal)
                    self.sap[team] -= 40
                    p.heal_ready = self.t + 10
        for p in fighters:
            if self.wildborn(p.team) and self.effect("Healing Bloom", z):
                p.hp = min(self.max_hp(p), p.hp + 0.03 * self.max_hp(p))
            if dmg_in[p.id]:
                p.hp -= dmg_in[p.id]
                p.last_hit = self.t
            if p.hp <= 0:
                killer = hitters[p.id][-1]
                self.kill(p, killer, [q for q in hitters[p.id] if q is not killer])
            elif p.hp < FLEE_HP * self.max_hp(p):
                chance = 0.25 * self.speed(p) / 100 * (1.5 if p.lineage == "Thornrunner" else 1)
                if self.rng.random() < chance:
                    p.state, p.task = "return", None
                    p.until = self.t + (TRAVEL_BASE + TRAVEL_ZONE * self.dist(p.team, z)) * 100 / self.speed(p)

    # ---------------------------------------------------------------- world
    def step_world(self):
        T, e, t = self.T, self.T.econ, self.t
        # passive income and SAP
        for p in self.players:
            if p.state != "dead":
                amt = e["Passive income factor"] * self.ti(p.team) * (
                    1 - e["Passive loss per Enemy Core lost"] * self.cores_lost(p.team))
                self.add_cores(p, amt, "passive")
        for team in (0, 1):
            cells = sum(self.cells[team]) + HUB_CELLS * sum(1 for h in self.hubs if h["owner"] == team)
            hubs = sum(1 for h in self.hubs if h["owner"] == team)
            sap = cells * e["SAP per cell"] * (1 + e["SAP bonus per Hub"] * hubs)
            for f in self.effects:
                if f["name"] == "SAP Surge" and f.get("team") == team and f["until"] > t:
                    sap += 2 * self.cells[team][f["zone"]] * e["SAP per cell"]
            self.sap[team] += sap
            self.sap_earned[team] += sap
        # territorial growth into accessible neutral cells
        for team in (0, 1):
            for z in sorted(range(3), key=lambda z: self.dist(team, z)):
                if self.accessible(team, z) and self.neutral(z) > 0 and self.cells[team][z] > 0:
                    border = min(6, round(self.neutral(z) / 12))
                    if self.rng.random() < border / e["Territorial Growth interval"]:
                        self.cells[team][z] += 1
                    break
        # wildlife respawn and apex
        for c in self.camps:
            if not c["alive"] and c["respawn"] and t >= c["respawn"]:
                c.update(self._new_camp(c["zone"], c["tier"]))
        if t in (600, 960) and self.apex is None:
            iv = [c for c in T.creatures if c["tier"] == "IV" and c["health"] and c["group"] != "Clamor"]
            c = self.rng.choice(iv)
            self.apex = {"zone": 1, "hp": c["health"] * T.phase_mult[self.phase - 1], "dmg": {}}
        # ground cores expire
        for z in range(3):
            self.ground[z] = [g for g in self.ground[z] if g["until"] > t and g["amount"] > 0]
        # structures regenerate; Enemy Cores regrow
        for h in self.hubs:
            hmax = e["Hub base Health"] + e["Hub Health per level"] * h["level"]
            if t - h["hit"] > 10:
                h["hp"] = min(hmax, h["hp"] + 0.02 * hmax)
                h["uproot"] = max(0.0, h["uproot"] - 0.05)
        for team in (0, 1):
            heart = self.heart[team]
            if t - heart["hit"] > 15:
                heart["hp"] = min(e["Base Heart Health"], heart["hp"] + 0.01 * e["Base Heart Health"])
            for c in self.ecores[team]:
                if not c["alive"] and c["regrow"] is not None and t >= c["regrow"]:
                    if self.cells[team][self.home(team)] >= 20:
                        c.update({"alive": True, "hp": e["Enemy Core Health"] / 2, "max": e["Enemy Core Health"] / 2,
                                  "reward": e["Enemy Core reward"] / 2})
                    else:
                        c["regrow"] = t + 10
        # Hub Defense purchases (keep 200 SAP for event claims)
        if t % 5 == 0:
            for team in (0, 1):
                owned = [h for h in self.hubs if h["owner"] == team and h["level"] < 10]
                if owned:
                    h = min(owned, key=lambda h: (h["level"], self.dist(team, h["zone"]) == 0))
                    cost = e["Hub Defense cost per level"] * (h["level"] + 1)
                    if self.sap[team] >= cost + 200:
                        self.sap[team] -= cost
                        h["level"] += 1
                        h["hp"] += e["Hub Health per level"]
        self.step_tension()

    def step_tension(self):
        T, t = self.T, self.t
        if self.phase < 2:
            return
        tn = T.tension
        for z in range(3):
            rate = 0.0
            near = [n for n in (z - 1, z, z + 1) if 0 <= n < 3]
            if all(any(self.cells[team][n] for n in near) for team in (0, 1)):
                rate += tn["Borders touching (base)"]
            if self.fight[z]:
                stage = max([p.stage for p in self.in_zone(z)] + [1])
                rate += tn["Each fight within 15 m of a border"] * (
                    tn["Stage 3 nearby"] if stage == 3 else tn["Stage 2 nearby"] if stage == 2 else 1)
            if self.effect("The Old Tall wakes", z):
                rate *= tn["Old Tall within 30 m"]
            if t - self.last_fight[z] > 30:
                rate += tn["Decay after 30 s without fighting"]
            self.tension[z] = min(100, max(0, self.tension[z] + rate))
        if self.phase < 3 or t < self.next_event_ok or any(f["until"] > t for f in self.effects):
            return
        for z in range(3):
            if self.tension[z] >= tn["Event threshold"] and t >= self.zone_event_cd[z]:
                self.fire_event(z)
                self.tension[z] = 0
                self.zone_event_cd[z] = t + self.T.econ["Event region cooldown"]
                self.next_event_ok = t + self.T.econ["Global event spacing"]
                break

    def fire_event(self, z):
        e = self.T.econ
        wild, blight = self.side, 1 - self.side
        gap = self.ti(wild) - self.ti(blight)
        deck = "Neutral"
        if abs(gap) > e["Patron trigger TI gap"] and self.rng.random() < e["Patron deck chance when behind"]:
            deck = "Planet Pulse" if gap < 0 else "Murmur Surge"
        events = [ev for ev in self.T.events if ev["deck"] == deck]
        ev = self.rng.choices(events, weights=[x["weight"] for x in events])[0]
        name, dur = ev["name"], ev["duration"] or 20
        self.first("first event")
        self.m["events"] += 1
        f = {"name": name, "zone": z, "until": self.t + dur}
        if name == "SAP Surge":
            claimers = [team for team in (0, 1) if self.in_zone(z, team) and self.sap[team] >= 200]
            if claimers:
                team = max(claimers, key=lambda tm: len(self.in_zone(z, tm)))
                self.sap[team] -= 200
                f.update({"team": team, "until": self.t + 60})
        elif name == "Core Bloom":
            self.ground[z].append({"amount": 400, "until": self.t + dur})
        self.effects.append(f)

    def step_events(self):
        """Damage from hunting creatures and Shard Rain."""
        t = self.t
        for f in self.effects:
            if f["until"] <= t:
                continue
            z = f["zone"]
            if f["name"] in ("The Old Tall wakes", "Blighted Wyrm"):
                hunted = 1 - self.side if f["name"] == "The Old Tall wakes" else self.side
                prey = self.in_zone(z, hunted)
                if prey:
                    p = self.rng.choice(prey)
                    p.hp -= CREATURE_DPS["IV"] * self.T.phase_mult[self.phase - 1]
                    p.last_hit = t
                    if p.hp <= 0:
                        self.kill(p, None, [])
            elif f["name"] == "Shard Rain":
                for h in self.hubs:
                    if h["zone"] == z and h["owner"] == self.side:
                        h["hp"] = max(1, h["hp"] - 150)
                        h["hit"] = t
                for c in self.ecores[self.side]:
                    if z == self.home(self.side) and c["alive"]:
                        c["hp"] = max(1, c["hp"] - 150 / 3)

    # ---------------------------------------------------------------- end
    def overtime_capture(self, team):
        if self.t > TIME_LIMIT and self.result is None:
            self.end(team, "Overtime capture")
            return True
        return False

    def end(self, winner, how):
        if self.result is None:
            self.result = {"winner": winner, "how": how, "time": self.t}

    def check_end(self):
        e = self.T.econ
        for team in (0, 1):
            if self.ti(team) >= e["Mercy TI"]:
                if self.mercy_since[team] is None:
                    self.mercy_since[team] = self.t
                elif self.t - self.mercy_since[team] >= e["Mercy hold"]:
                    self.end(team, "Mercy")
            else:
                self.mercy_since[team] = None
        if self.t == TIME_LIMIT and self.result is None:
            a, b = self.ti(0), self.ti(1)
            if abs(a - b) > 0.01:
                self.end(0 if a > b else 1, "Time limit")
        if self.t >= TIME_LIMIT + OVERTIME and self.result is None:
            a, b = self.ti(0), self.ti(1)
            self.end(0 if a > b else 1 if b > a else None, "Overtime TI")

    def snapshot(self):
        t = self.t
        if t == 600:
            self.m["ti_600"] = (self.ti(0), self.ti(1))
        if t == 900:
            levels = [p.level for p in self.players]
            self.m["gap_900"] = max(levels) - min(levels)
            owned = [h["level"] for h in self.hubs if h["owner"] is not None]
            self.m["hub_level_900"] = sum(owned) / len(owned) if owned else 0
        if t == 600:
            self.m["syn_600"] = [self.syn_level(p) for p in self.players[::2]]
        if t == 1080:
            self.m["syn_1080"] = [self.syn_level(p) for p in self.players[::2]]

    def run(self):
        order = list(self.players)
        while self.result is None:
            self.t += 1
            self.rng.shuffle(order)
            for p in order:
                self.step_player(p)
                if self.result:
                    break
            for z in range(3):
                self.step_fight(z)
            self.step_events()
            self.step_world()
            self.snapshot()
            self.check_end()
        return self.summary()

    def summary(self):
        r = self.result
        return {
            "winner": r["winner"], "how": r["how"], "time": r["time"],
            "wildborn": self.side,
            "lineups": [[p.lineage for p in self.players if p.team == tm] for tm in (0, 1)],
            "first": self.m["first"], "kills": self.m["kills"], "events": self.m["events"],
            "hub_changes": self.m["hub_changes"], "conversions": self.m["conversions"],
            "returns_per_player": sum(p.converts for p in self.players) / len(self.players),
            "ti_600": self.m["ti_600"], "gap_900": self.m["gap_900"],
            "syn_600": self.m.get("syn_600"), "syn_1080": self.m["syn_1080"],
            "hub_level_900": self.m["hub_level_900"], "apex_kills": self.m["apex_kills"],
            "wild_deaths": self.m["wild_deaths"],
            "sap_earned": list(self.sap_earned), "sap_left": list(self.sap),
            "exp_src": [dict(p.exp_src) for p in self.players],
            "levels": [p.level for p in self.players],
            "ti_end": (self.ti(0), self.ti(1)),
        }

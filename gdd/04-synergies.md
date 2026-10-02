# 04 — Synergies & Combat Interdependencies (§6.8–6.13)

Synergies are abilities and passive bonuses that exist only **between two
Ascendants**. They are the heart of pillar 3: *interdependency over individuals.*

## Two tracks per pair

Each pair on a team has two kinds of progress:

| Track | Range | Gained by | Unlocks |
|---|---|---|---|
| **Ascendant level** (each player's own) | 1–20 | Evolution (see [03](03-evolution-system.md)) | The pair's **Synergy ability**, once *both* partners reach its level gate |
| **Synergy level** (shared by the pair) | 1–10 | Fighting together: shared kills/assists, captures within 15 m of each other, Synergy ability hits | **Synergy tier** (cooldown) and **Resonance perks** |

### Synergy tiers (S1 / S2 / S3)

| Tier | Synergy level | Synergy ability cooldown |
|---|---|---|
| **S1** | 1–4 | 15 s |
| **S2** | 5–9 | 12 s |
| **S3** | 10 | 9 s |

## The three Synergies

### Verdant + Hollow: Void Garden (Level 12+)
*"Creates localized void field."*
- **Trigger:** Hollow casts Void Rift on ground that Verdant has rooted, or Verdant roots inside a Rift.
- **Effect:** a **void field** (8 m radius, 6 s). Enemies inside lose **50% Control** and can't capture.
  Allied nodes inside can't be uprooted. Neutral or Vulnerable nodes inside are captured **50% faster**
  (*"unique capability bonuses to global control for 50%"*).
- **Resonance perks (node network):**
  - Synergy L3 → **SAP extraction level 3**: +30% SAP from nodes rooted by Verdant while Hollow is alive.
  - Synergy L5 → **Localized void interdependency**: while both are inside the field, each one's cooldowns tick 25% faster.
  - Synergy L6 → **Territory growth rate level 2**: the team's passive territory spread is +20%.

### Thornrunner + Bonespire: Co-Stalk (Level 15+)
*"Co-stalk on targeted weak point."*
- **Trigger:** Thornrunner's Mark Prey, followed by a Bonespire Spire Lance on the marked target within 4 s.
- **Effect:** the Lance automatically homes onto the target's **weak point**. If it lands, the weak
  point is **broken immediately** (see weak points below), and the target is revealed for another 4 s.
- **Resonance perks:**
  - Synergy L3 → Marked targets also show how many cores they carry.
  - Synergy L5 → Breaking a weak point refunds 30% of Mark Prey's cooldown.
  - Synergy L10 → Co-Stalk kills drop **+25% cores**.

### Titan + Brawler: Smash & Roll (Level 18+)
*"Coordinated smash and roll commit — synchronized commitment interdependency."*
- **Trigger:** Titan's Quake Slam staggers a target, then the Brawler starts Roll Commit within **1.5 s**.
- **Effect:** the roll becomes a launch. The target is airborne for 1 s and takes +40% damage from both.
  Both partners gain **Momentum**.
- **Commitment rule (the interdependency):** if Titan slams and the Brawler
  *doesn't* follow up within 1.5 s, Titan's slam cooldown is **+50%** for that cast.
  Committing alone is punished. That's what "synchronized commitment" means mechanically.
- **Resonance perks:**
  - Synergy L3 → **Momentum conversion level 3**: Momentum built in fights converts to cores (1 core per 2 Momentum) on a kill.
  - Synergy L10 → **Global evolution control rate level 2**: Smash & Roll hits make the target drop 10% of its carried cores and slow the enemy team's conversion by 1 s for 30 s.

## Evolution-Sync Resonance

The sidebar on every source page is called **Evolution-Sync Resonance**:

- When paired partners are within **2 levels** of each other, both earn **+10% EXP** from conversion.
- When they reach a Stage together (within 30 s of each other), both get a free **Synergy level**.
- The intent is to make evolving *together* a goal, not just evolving fast.

## Synergy access by match phase

From the **4v4 Synergy Access Matrix vs. Game State** (p. 120). Rows are match phases
(see [06](06-match-flow.md)) and cells are cooldowns. "–" means the tier is locked in that phase.

| Phase | S1 | S2 | S3 | Why |
|---|---|---|---|---|
| **1 · Stable Flow** | 15 s | 12 s | 9 s | Normal rules |
| **2 · Pre-Aggro Resource Control** | 15 s | 12 s | 9 s | Normal rules |
| **3 · Resource Stage** | – | 31 s | 20 s | Synergies are throttled so teams fight over the economy, not just teamfights |
| **4 · Hunt** ("Thornrunner & Bonespire") | – | – | 9 s | Only mastered pairs (S3) can fire, and quickly. Late game rewards pairs who played together all match |

*(Interpretation. The phase-4 label probably reflects the Hunt pair being the
star of the final phase. Confirm with the director.)*

## Weak points

*"Weak Point Access & Removal State: S1 15s · S2 12s · S3 9s."*

- Every Ascendant has **one weak point** (listed in [02](02-ascendant-roster.md)).
  It's always hittable from the right angle; Mark Prey exposes it from any angle.
- Weak-point hits deal **1.5× damage**.
- After **20% of max Health** in weak-point damage, the weak point **breaks**
  (the "removal state"): the victim's **R ability is disabled** and they take +10% damage.
- **Regrowth time** depends on the victim's Stage (interpretation of S1/S2/S3):
  Stage 1: 15 s · Stage 2: 12 s · Stage 3: 9 s. Bigger Ascendants are easier
  to hit but recover faster.

## Node survival under synergy pressure

*"Node Survival Time vs. Grid Cell Area: S1 5s · S2 4s · S3 3s"* (p. 123), interpreted as:

- Uprooting an enemy node takes **(cells in the node) × (time per cell)**.
- Time per cell is set by the highest **synergy tier** present among the attackers:
  S1 or no synergy 5 s · S2 4 s · S3 3 s.
- So a 4-cell node falls in 20 s to a fresh team but in 12 s to an S3 pair.
  Synergy mastery shows up in territory as well as fights.

## Open: the other 12 pairings

Six lineages make **15 possible pairs**; the source pages show 3. Proposal:
every other pair has a small **cross-resonance** passive (e.g. Titan + Verdant:
Bulwark also protects rooted nodes behind it) but no Synergy ability. All 12 are designed in [32 — Cross-Resonance](32-cross-resonance.md).

---

## Each Synergy, described as it happens

**Void Garden (Verdant + Hollow).** The Verdant kneels and drives its roots
into the ground; moss spreads in a wide circle. The Hollow glides over it and
opens a Void Rift in the centre. Where root and void meet, the air dims and
the ground goes soft and dark, like a forest floor at midnight. Enemies inside
feel heavy and slow; their capture channels flicker and fail. On the
Blightborn side, the roots are crystal lattices and the void is full of
turning shards, but the shape and the timing are identical.

**Co-Stalk (Thornrunner + Bonespire).** The Thornrunner freezes, then lets out
a clicking trill, and a glowing mark appears on the target's weak point,
visible to the whole team. Across the map, the Bonespire sets its feet. The
lance flies, curving slightly in the air toward the mark, and strikes. The
weak point cracks with a sound like a bone snapping, and the target staggers,
revealed and exposed.

**Smash & Roll (Titan + Brawler).** The Titan rears up and brings both fists
down; the ground buckles in a ring and the target staggers. In the same
breath, the Brawler, already moving, tucks into its Roll Commit and hits the
staggered target at full speed. The target is launched into the air, hangs
for a second, and both partners strike it before it lands. If the Brawler is
late, the Titan's fists strike empty ground, and the cooldown penalty makes
the cost of poor timing felt.

## Synergy HUD and feedback

| Element | What players see |
|---|---|
| **Partner tether** | A faint line to your pair partner when within 15 m; brighter when Synergy is ready |
| **Synergy level** | A small ring of 10 pips around the partner's portrait |
| **Tier indicator** | S1 / S2 / S3 shown on the Synergy icon, with its current cooldown |
| **Phase lock** | In Phase 3 and 4, locked tiers are greyed with a small icon of the phase |
| **Success** | A unique sound sting for each Synergy, heard by both teams |
| **Failure** | Smash & Roll's cooldown penalty is shown as a cracked icon on the Titan's slam |

## Synergy level progression in a match

| Time | Typical Synergy level (for a pair that stays together) |
|---|---|
| 5:00 | 2–3 |
| 10:00 | 5 (S2) |
| 15:00 | 7–8 |
| 18:00 | 10 (S3) |

A pair that splits up for long stretches falls well behind this curve and may
not reach S3 before Phase 4, when S3 is the only tier allowed. Staying
together is the whole point.

## Counter-play summary

Every Synergy has a clear answer, so pairs are powerful but never unbeatable:

| Synergy | Weakness |
|---|---|
| Void Garden | Needs the Verdant's roots first: kill or displace the Verdant |
| Co-Stalk | Needs line of sight for the lance: break it after being Marked |
| Smash & Roll | Needs the Brawler within 1.5 s: spread out, or bait the Titan into slamming alone |

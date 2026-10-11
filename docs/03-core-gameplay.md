# 03 — Core Gameplay

## Core loop

```
 Explore a grey region ──► Spot colour (enemy / secret / path)
        ▲                            │
        │                            ▼
 Rest at a Lantern ◄── Fight: read tells, Flare the enemy, Rip its Hue
 (spend Dross, clear Stain)          │
        ▲                            ▼
        └──── Use or discard the Hue ──► Stain rises ──► risk vs. power
                         │
                         ▼
          Reach the Prism Heart ──► Boss ──► Region regains colour
                                            + permanent Echo ability
```

**Moment-to-moment (seconds):** read a tell → dodge / parry → punish → Flare → Rip.
**Encounter (minutes):** pick which Hue to hold, when to spend it, when to drop it.
**Session (30 min):** push between Lanterns, open shortcuts, find a secret, maybe a mini-boss.
**Macro (hours):** restore Prism Hearts, unlock Echoes, reshape the map, manage permanent Residue.

## Controls (gamepad baseline)

| Input | Action |
|---|---|
| Left stick | Move |
| A | Jump |
| X | Grey Blade (light attack; 3-hit string) |
| Y | Hue Art (Hue-specific special; costs Saturation) |
| B | Dodge (i-frames 0.25 s; Hue may modify) |
| LB | Parry (window 0.15 s; Hue may modify) |
| RB | **Rip** (only on a Flared enemy) |
| RT (hold) | Blend Art (only when holding two adjacent Hues) |
| LT | Swap active Vessel |
| D-pad ↓ | **Release** active Hue (drop it, instantly) |
| D-pad ↑ | Mend (heal; limited charges) |

Keyboard/mouse mapping mirrors this; all inputs are rebindable.

## The Greyborn base kit

With no Hue held, the player has:
- **Grey Blade:** quick 3-hit string, modest damage, small hitstop.
- **Dodge:** short roll with i-frames.
- **Parry:** a tight window. A successful parry staggers most enemies and
  **builds Flare 3× faster** than hits do.
- **Mend:** 3 charges at start (upgradeable to 6), refilled at Lanterns.

The base kit is deliberately thin but *complete*. A skilled player can finish the
game hueless (this is a tracked challenge and affects the ending).

## Flare & Rip (taking a Hue)

1. Every Hued enemy has a **Flare meter** under its health bar.
2. Hits fill it a little; **parries fill it a lot**; matching-Hue attacks
   fill it less (fire doesn't burn fire); **opposite-Hue attacks fill it 2×**.
3. When the meter is full the enemy **Flares**: it glows in full colour and is
   staggered for 1.5 s.
4. Press **Rip** during the Flare to execute it and catch its **Wisp**. The Hue goes
   into your active Vessel.
5. Killing an enemy without ripping it gives Dross (currency) but no Hue.

Bosses Flare at phase transitions. Ripping a boss gives a **Prime Hue**:
stronger, longer-lasting, and much heavier on Stain.

## Vessels

You start with **1 Vessel** and can unlock a **2nd** (act 1 finale) and a
**3rd** (late act 2, optional, high Stain cost).

- Each Vessel holds one Hue.
- **Two adjacent Hues** held at once unlock that pair's **Blend Art**.
- **Two opposite Hues** held at once **Clash**: Stain on both rises 2× faster.
  In return you get a one-off **Clash Burst**, a huge AoE that empties both Vessels.

## Saturation (how long a Hue lasts)

- A ripped Hue starts at **100 Saturation**.
- Hue Arts spend 15–40 Saturation. Hue-modified dodges/parries spend 5–10.
- Saturation also **fades 1 per second** while held.
- At 0 the Hue fades and the Vessel empties. This is **free**, with no Stain penalty.
- Ripping another enemy of the **same Hue** refills Saturation to 100.

## Stain (the cost)

Each held Hue builds Stain (0–100) for that colour:

| Source | Stain gained |
|---|---|
| Holding the Hue | +1 per 2 seconds |
| Using its Hue Art | +4 |
| Taking damage while holding it | +3 |
| Clashing with its opposite | ×2 all sources |
| Ripping a Prime Hue (boss) | starts at 25 |

**Stain thresholds:**

| Stain | Name | Effect |
|---|---|---|
| 0–33 | **Tinge** | No downside. Visual: faint colour at the fingertips. |
| 34–66 | **Mark** | +15% Hue Art damage. Enemies of the opposite Hue target you first. Veins of colour visible. |
| 67–99 | **Brand** | +30% Hue Art damage. The Hue's **Vice** effect triggers (below). Screen edges tint. |
| 100 | **Overcolour** | 10 s of overwhelming power, then you are **Husked**: you die and gain permanent Residue. |

**Clearing Stain:** Stain drains at 5 per second once the Hue is released or
fades, down to the floor set by your Residue. Resting at a Lantern clears it fully.

**Vices (Brand-tier side effects):**
- Crimson / Wrath: you can't Dodge for 1 s after attacking. You lunge at the nearest enemy.
- Amber / Stubbornness: no Dodge at all; parry window ×2.
- Aurum / Pride: the screen flashes when you're hit and the HUD hides your health.
- Verdant / Hunger: Mend is disabled, but every hit heals you a little.
- Azure / Despair: movement −20%, but incoming damage −30%.
- Violet / Deceit: your controls briefly mirror (telegraphed by a shimmer).

## Residue (permanent Stain)

Whenever any Hue's Stain **crosses 67 (Brand)**, that colour gains **+1 Residue**,
up to a maximum of 5 per Hue. Being Husked gives +2.

Residue is permanent. Each point:
- gives a permanent passive tied to that Hue (e.g. Crimson: +4% base blade
  damage per point);
- raises that Hue's **Stain floor** by 6, so Stain never drains below it;
- visibly changes the character model (colour creeping up the body, eyes, hair);
- changes how NPCs and Hued Remnant enclaves react;
- feeds the ending calculation (see [06 — Narrative](06-narrative.md)).

Residue *can* be removed, slowly and expensively: a late-game Lanternfolk
ritual costs Dross plus a rare item, one point at a time. This keeps
experimentation from being permanently punishing while still costing something.

**Design intent:** taking Residue is a temptation, not a failure. Pure-Grey and
heavy-Residue are both valid builds with different strengths and endings.

## Hue abilities

Each Hue changes three things: **Hue Art (Y)**, **Dodge** and **Parry**.

| Hue | Hue Art | Dodge becomes | Parry becomes |
|---|---|---|---|
| Crimson | **Kindle**: flaming 3-hit lunge, leaves burning ground | Flame-dash (damages along path) | Riposte that explodes |
| Amber | **Quarry**: ground slam, raises a stone pillar (platform/cover) | Short, unstoppable shoulder-charge | Auto-parry on the first hit, slower recovery |
| Aurum | **Verdict**: 3 delayed sky-beams on marked targets | Blink (teleport 3 m) | Flash-parry that blinds an area |
| Verdant | **Thornbind**: vines root enemies, poison over time | Leaves a spore cloud | Parry heals 5% HP |
| Azure | **Undertow**: wave that pulls enemies in | Water-slide (long, low) | Tide-shield: absorbs 2 hits |
| Violet | **Afterimage**: a decoy that repeats your last 3 seconds of attacks | Phase (pass through enemies) | Rewind: parrying returns you to your position 1 s ago |

## Blend Arts (two adjacent Hues)

| Blend | Hues | Blend Art |
|---|---|---|
| **Cinder** | Crimson + Amber | Magma fissure across the floor; lingering damage zone |
| **Gild** | Amber + Aurum | Golden armour: 4 s of super-armour + reflected damage |
| **Bloom** | Aurum + Verdant | Sunflower turret that heals you and shoots light |
| **Fen** | Verdant + Azure | Bog field: enemies slowed 60%, poisoned |
| **Deep** | Azure + Violet | Pocket of drowned time: everything except you slows to 25% for 3 s |
| **Ichor** | Violet + Crimson | Blood-mirror: next 3 hits taken are duplicated onto the attacker |

That gives 6 Hues + 6 Blends = **12 colours**, and 6×3 + 6 Blend Arts + 6
Clash Bursts = **36 stolen abilities** at launch.

## Echoes (permanent traversal)

Restoring a region's Prism Heart grants a permanent, Stain-free **Echo**. Echoes
are for traversal and puzzles only. They are never combat power, which keeps
pillar 1 intact.

| Echo | From | Traversal use |
|---|---|---|
| Ember Echo | Crimson | Burn through thornwalls; light braziers |
| Stone Echo | Amber | Stomp breakable floors; anchor against wind |
| Gilt Echo | Aurum | Short air-blink (double-jump equivalent) |
| Root Echo | Verdant | Grow vine-ladders on marked soil |
| Tide Echo | Azure | Swim / dive |
| Dusk Echo | Violet | Step into "dusk layer" to see hidden platforms |

## Death

- On death, you respawn at the last Lantern. Your Dross stays where you died as a **Grey Shade**.
- Touch the Shade to recover it. Dying again before you reach it loses it.
- Held Hues are lost on death. Temporary Stain resets, but Residue remains.
- **Husk death:** your Shade becomes a *Hued Husk*, a mini-boss copy of you at
  Overcolour. Beat it to get your Dross back plus a free Prime Hue of that colour.

## Combat feel targets

- 60 fps locked; input buffer 6 frames; coyote time 5 frames.
- Hitstop: 3 frames (blade), 6 frames (Hue Art), 10 frames (Rip execution).
- Every enemy attack tell is **colour-coded**: a flash of its Hue means *parryable*;
  a **white** flash means *unparryable, dodge it* (the Pale Church's "pure" attacks).

# Spec 02 — Lineage Abilities

Every ability for all seven lineages, in numbers. Formulas and terms are in
[Spec 01](01-conventions.md). **P** = the caster's Power. Values marked
*(scales)* are multiplied by the Stage scaling (Stage 1 ×1.0, Stage 2 ×1.25,
Stage 3 ×1.6). Branch upgrades (L10 and L15) are summarised at the end of each
lineage and detailed with the Ultimates in [Spec 03](03-ultimates.md).

All values are starting points for playtesting.

---

## 0. Base Form (Levels 1–2, every player)

| Ability | Range / area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|
| **Basic attack** (scratch combo) | Melee, 2 m | 1.2 hits/s; third hit 0.4 s slower | Three-hit combo; third hit staggers critters | 1.0 × P per hit | — |
| **Evade** | 4 m dash | 0.25 s; invulnerable 0.15 s | Shared by every lineage at every Level | — | 8 s |
| **Root / Blight** | 2 m from node core | 4 s channel | Capture a node | — | — |
| **Convert** | At base or held Hub | C1–C3 channel | Turn carried cores into EXP | — | — |

At Base Form, a player has no Q, E, R or passive. Everything awakens at L3.

---

## 1. Titan

**Basic attack:** fist slam · melee, 3 m *(scales)* · 0.8 hits/s · 1.2 × P.

**Passive — Immovable:** immune to knockback and Grapple; takes 10% less
damage from enemies of a lower Stage.

| Slot | Ability | Range / area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| **Q** | **Quake Slam** | Circle, radius 5 m *(scales)*, centred on self | 0.5 s wind-up with a visible ring | **Stagger 0.8 s**; triggers Smash & Roll | 60 + 0.8 × P | 12 s |
| **E** | **Bulwark** | Frontal 120° cone | Instant; lasts 3 s | −60% damage from the front; Titan slowed 30% | — | 16 s |
| **R** | **Rampart Charge** | Line, 12 m *(scales)* | 0.3 s wind-up; 1.0 s charge | **Unstoppable**; carries up to 2 enemies to the end | 80 + 1.0 × P | 18 s |

**Rank 2 (L5):** Quake Slam radius +20%.

**Commitment rule (from L18):** if Smash & Roll is unlocked and no Brawler ally
begins Roll Commit within 1.5 s of a Quake Slam, that Quake Slam's cooldown is +50%.

**Weak point:** crystal spine on the back · sphere radius 0.25 × height · exposed from the rear 120°.

**Branch upgrades:**

| Level | Aggression | Tactical Control |
|---|---|---|
| L10 | Quake Slam stagger 1.0 s | Bulwark also gives −30% damage to allies within 4 m in a 60° cone behind the Titan |
| L15 | Rampart Charge ends in a second slam (radius 4 m, 50% damage, no stagger) | Bulwark lasts 4 s |

---

## 2. Brawler

**Basic attack:** fist combo · melee, 2.5 m *(scales)* · 1.4 hits/s · 1.0 × P.

**Passive — Momentum:** builds Momentum (0–100): +5 per hit landed, +2/s while
moving in combat. At 100, +15% attack speed. Decays 10/s out of combat.
(Converted to cores by the Smash & Roll Resonance perk.)

| Slot | Ability | Range / area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| **Q** | **Roll Commit** | Line, 8 m *(scales)* | 0.6 s roll | **Unstoppable**; ends in an uppercut that staggers 0.5 s. **Chest weak point exposed for 1.0 s after** | 70 + 1.0 × P (uppercut) | 10 s |
| **E** | **Haymaker** | Melee, 3 m | Charge 0.3–1.5 s | Damage scales with charge; full charge knocks back 6 m | 50 + 0.6 × P (min) to 120 + 1.4 × P (full) | 9 s |
| **R** | **Grapple** | Melee, 3 m | 0.6 s hold, then throw | Grabs a **lower-Stage** target, throws it 8 m in the aimed direction | 40 + 0.5 × P, +40 on landing | 16 s |

**Rank 2 (L5):** Haymaker full charge time 1.3 s.

**Weak point:** chest plate · sphere radius 0.2 × height · **only hittable from the
front, and only for 1.0 s after Roll Commit ends** (otherwise armoured).

**Branch upgrades:**

| Level | Aggression | Tactical Control |
|---|---|---|
| L10 | Haymaker charges 30% faster | Grapple can throw targets onto a node, interrupting their capture channel and staggering them 0.5 s |
| L15 | Roll Commit refunds 30% of its cooldown on a takedown | Grapple works on same-Stage targets |

---

## 3. Verdant

**Basic attack:** antler sweep · melee, 3 m *(scales)* · 1.0 hits/s · 0.9 × P.

**Passive — Deep Root:** Root/Blight channel is 2 s (instead of 4 s). Nodes the
Verdant rooted spread into one adjacent neutral cell every 20 s.

| Slot | Ability | Range / area | Timing | Effect | Damage / heal | Cooldown |
|---|---|---|---|---|---|---|
| **Q** | **Bramble Wall** | Wall, 10 m long *(scales)*, 1.5 m tall, placed up to 15 m away | 0.4 s to grow; lasts 6 s | Blocks movement and projectiles; can be destroyed | Wall Health 400 + 2 × P | 18 s |
| **E** | **Sap Draw** | Ally or self within 15 m | Heal over 4 s | Heals the target; **costs 40 team SAP** | Heal 120 + 1.0 × P | 10 s |
| **R** | **Entangle** | Circle, radius 3 m *(scales)*, up to 15 m away | 0.6 s delay | **Root 1.2 s** | 30 + 0.4 × P | 14 s |

**Rank 2 (L5):** Entangle root 1.5 s.

**Weak point:** bloom pod on the shoulder · sphere radius 0.2 × height ·
exposed from the left and right 90° arcs · **+50% size while channelling Root**.

**Branch upgrades:**

| Level | Aggression | Tactical Control |
|---|---|---|
| L10 | Entangle also deals 15 + 0.2 × P per second while rooted | Allies standing on a node the Verdant is rooting heal 2% max Health/s |
| L15 | Bramble Wall deals 20 + 0.2 × P per second to enemies touching it | Bramble Wall lasts 8 s |

---

## 4. Hollow

**Basic attack:** void bolt · ranged, 15 m · 1.0 shots/s · 0.8 × P · projectile speed 30 m/s.

**Passive — Hush:** no footstep sounds. Nearby ambient sound dims (cosmetic).

| Slot | Ability | Range / area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| **Q** | **Void Rift** | Circle, radius 4 m *(scales)*, up to 18 m away | 0.3 s to open; lasts 4 s | Enemies inside: **slowed 30%**, **Control −40%**; triggers Void Garden on rooted ground | — | 14 s |
| **E** | **Hollow Step** | Blink, 8 m *(scales)* | 0.1 s | Teleport; passes through units and Bramble Walls, not terrain | — | 12 s |
| **R** | **Null Pulse** | Circle, radius 6 m *(scales)* around self | 0.3 s wind-up | **Silence 1.5 s** | 40 + 0.5 × P | 20 s |

**Rank 2 (L5):** Void Rift slow 40%.

**Weak point:** core cavity in the torso · sphere radius 0.35 × height (the
largest) · exposed from the front 120° · **+30% size during Null Pulse wind-up**.

**Branch upgrades:**

| Level | Aggression | Tactical Control |
|---|---|---|
| L10 | Void Rift deals 25 + 0.3 × P per second | Void Rift radius +30% |
| L15 | Hollow Step leaves an echo that explodes after 1 s (radius 3 m, 40 + 0.5 × P) | Null Pulse also **cancels channels** (Root, Convert, Infect/Rally) |

---

## 5. Thornrunner

**Basic attack:** claw rake · melee, 2.5 m *(scales)* · 1.6 hits/s · 0.8 × P.

**Passive — Hunter's Silence:** footsteps heard at ×0.5 range; +15% speed out of combat.

| Slot | Ability | Range / area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| **Q** | **Thorn Dash** | Line, 9 m *(scales)*, passes through enemies | 0.3 s | Damages and applies **bleed** to every enemy passed | 40 + 0.6 × P, then bleed 10 + 0.15 × P per second for 4 s | 8 s |
| **E** | **Mark Prey** | Target enemy within 25 m, line of sight | Instant | Reveals the target for 6 s and **exposes its weak point from every angle** to the whole team; triggers Co-Stalk | — | 16 s |
| **R** | **Barb Volley** | Cone 60°, 8 m | 0.2 s | Fires 8 barbs; a close target can be hit by up to 5 | 12 + 0.15 × P per barb | 10 s |

**Rank 2 (L5):** Thorn Dash bleed lasts 5 s.

**Weak point:** abdomen sac · sphere radius 0.2 × height · exposed from the left
and right 90° arcs, and for 0.5 s after Thorn Dash ends.

**Branch upgrades:**

| Level | Aggression | Tactical Control |
|---|---|---|
| L10 | Thorn Dash bleed lasts 6 s | Mark Prey lasts 8 s |
| L15 | Thorn Dash gains a second charge | Mark Prey also slows the target 20% |

---

## 6. Bonespire

**Basic attack:** bone shard · ranged, 25 m · 0.9 shots/s · 1.1 × P · projectile speed 40 m/s.

**Passive — Rememberer:** gains one bone per takedown (max 10); each bone gives +1% Power.
Bones are shown on its back and kept until death.

| Slot | Ability | Range / area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| **Q** | **Spire Lance** | Skillshot, 40 m *(Stage 2: 45 m; Stage 3: 50 m)*, width 0.6 m | 0.6 s wind-up (a loud crack heard at 60 m); projectile 60 m/s | Hits the first enemy. ×1.5 on a weak point; **×2.0 on an exposed (Marked) weak point**; triggers Co-Stalk | 90 + 1.2 × P | 9 s |
| **E** | **Ossuary** | Fence, 8 m long *(scales)*, placed up to 15 m away | 0.3 s to rise; lasts 5 s | Blocks movement (not projectiles); can be destroyed | Fence Health 300 + 1.5 × P | 16 s |
| **R** | **Calcify** | Projectile, 20 m | 0.2 s | Slows 25% for 3 s. A second hit within 3 s: slow 50%. A third: **stun 1.0 s** | 25 + 0.3 × P | 6 s |

**Rank 2 (L5):** Spire Lance projectile speed 72 m/s.

**Weak point:** marrow spire on the back · sphere radius 0.22 × height · exposed
from the rear 120° · **+30% size during Spire Lance wind-up**.

**Branch upgrades:**

| Level | Aggression | Tactical Control |
|---|---|---|
| L10 | Spire Lance pierces the first target (second target takes 60%) | Ossuary lasts 7 s |
| L15 | Spire Lance gains a second charge | Calcify's stun lasts 1.5 s |

---

## 7. Stillheart (from Season 3)

**Basic attack:** frost swipe · melee, 3 m *(scales)* · 0.9 hits/s · 0.9 × P · slows 10% for 1 s.

**Passive — Slow Heart:** out-of-combat regeneration 3% max Health/s (others 2%);
footsteps heard at ×0.7 range.

**Universal partner:**
- **Lullaby Resonance:** allies within 15 m have Synergy cooldowns −10%.
- **Attunement:** 2 s channel on an ally within 5 m, once per life; lasts until either dies. Bonuses by the ally's lineage are in the table below.

| Slot | Ability | Range / area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| **Q** | **Lull** | Cone 50°, 10 m *(scales)* | 0.3 s | **Slow 40% for 2 s**. A second Lull on the same target within 3 s: **Drowse 1.0 s** (broken by damage) | 20 + 0.3 × P | 7 s |
| **E** | **Hibernate** | Self or an ally within 12 m | Instant; 2 s | Ice stasis: invulnerable and untargetable, can't act. Carried cores are safe | — | 24 s |
| **R** | **Long Night** | Circle, radius 7 m *(scales)*, up to 15 m away | 0.5 s to form; lasts 5 s | **Enemy cooldowns tick 30% slower** inside | — | 22 s |

**Rank 2 (L5):** Lull slow 45%.

**Weak point:** the heart · sphere radius 0.3 × height · exposed from the front 180°, **always visible** (glowing).

**Attunement bonuses:**

| Attuned to | Bonus |
|---|---|
| Titan | Lull roots targets the Titan has staggered in the last 2 s, for 0.5 s |
| Brawler | Hibernate on the Brawler ends with a free Roll Commit (no cooldown used) |
| Verdant | Long Night also slows enemy capture channels by 30% |
| Hollow | Drowse lasts 1.5 s on targets inside a Void Rift |
| Thornrunner | Marked targets are also Lulled (slow only) |
| Bonespire | Drowsing targets take ×2.0 weak-point damage from the Bonespire's next Spire Lance |

**Branch upgrades:**

| Level | Aggression | Tactical Control |
|---|---|---|
| L10 | Lull also deals 10 + 0.15 × P per second for 2 s (cold) | Hibernate lasts 2.5 s |
| L15 | Drowsing targets take +20% damage | Long Night radius +30% |

**Season 6 Truce passive — Frost Against Fire (co-op only):** Scald can't spread
within 10 m; Clamor creatures within 10 m are slowed 20%.

---

## 8. Shared values by lineage

| Lineage | Basic range | Basic rate | Basic ratio | Weak point | Exposed from |
|---|---|---|---|---|---|
| Titan | 3 m | 0.8/s | 1.2 | Crystal spine | Rear 120° |
| Brawler | 2.5 m | 1.4/s | 1.0 | Chest plate | Front, 1.0 s after Roll Commit |
| Verdant | 3 m | 1.0/s | 0.9 | Bloom pod | Sides 90° |
| Hollow | 15 m | 1.0/s | 0.8 | Core cavity | Front 120° |
| Thornrunner | 2.5 m | 1.6/s | 0.8 | Abdomen sac | Sides 90° |
| Bonespire | 25 m | 0.9/s | 1.1 | Marrow spire | Rear 120° |
| Stillheart | 3 m | 0.9/s | 0.9 | Heart | Front 180° |

## 9. Synergies

| Synergy | Pair | Unlock | Trigger | Effect | Cooldown S1 / S2 / S3 |
|---|---|---|---|---|---|
| **Void Garden** | Verdant + Hollow | Both L12 | Void Rift on ground the Verdant rooted, or the Verdant roots inside a Void Rift | Field radius 8 m, 6 s: enemies −50% Control and **can't capture**; allied nodes inside can't be uprooted; neutral/Vulnerable nodes inside captured 50% faster | 15 / 12 / 9 s |
| **Co-Stalk** | Thornrunner + Bonespire | Both L15 | Spire Lance within 4 s of Mark Prey on the same target | The Lance homes to the weak point (within 15° of aim); on hit, **weak point breaks instantly**; target revealed 4 s more | 15 / 12 / 9 s |
| **Smash & Roll** | Titan + Brawler | Both L18 | Roll Commit begins within 1.5 s of Quake Slam staggering the target | Target **Airborne 1.0 s**; takes +40% damage from both partners; both gain 30 Momentum (Brawler) / 30% Quake Slam cooldown refund (Titan) | 15 / 12 / 9 s |

**Phase restrictions** (source pages' access matrix): Phase 3 — S1 locked, S2 31 s, S3 20 s.
Phase 4 — S1 and S2 locked, S3 9 s.

**Truce Synergy (co-op, Season 6):** a true pair split across sides also gives
both partners a shield of 15% max Health for 3 s when the Synergy fires.

## 10. Cross-resonance values

See `gdd/32-cross-resonance.md`. All are passive, active within 15 m, from L8.

| Cross-resonance | Value |
|---|---|
| Rooted Mountain (Titan + Verdant) | Nodes behind Bulwark: uproot 50% slower |
| Cave and Stone (Titan + Hollow) | Quake Slam +15% damage to targets in a Void Rift |
| Herd and Hunter (Titan + Thornrunner) | Thorn Dash through a staggered target resets its cooldown once per 10 s |
| Ridge and Spine (Titan + Bonespire) | Spire Lance range +20% within 4 m behind a Bulwarking Titan |
| Wild Growth (Brawler + Verdant) | Brawler takedowns on Verdant-rooted ground heal 10% max Health |
| Storm in the Dark (Brawler + Hollow) | Roll Commit +30% speed through a Void Rift |
| Two Claws (Brawler + Thornrunner) | Both hitting one target within 2 s: bleed 10 + 0.15 × P (Thornrunner's P) per second for 1 s |
| Break and Mark (Brawler + Bonespire) | Grapple exposes the target's weak point from all angles for 3 s |
| Thicket Hunters (Verdant + Thornrunner) | Thornrunner hidden from the enemy minimap on Verdant-rooted ground |
| Root and Fossil (Verdant + Bonespire) | Ossuary on rooted ground lasts +50% |
| Silent Hunt (Hollow + Thornrunner) | Thornrunner's footsteps silent within 15 m of the Hollow |
| Echo of Bone (Hollow + Bonespire) | Spire Lance entering a Void Rift exits on its far side, +10% damage |

## 11. Damage sanity check (Level 10 vs. Level 10)

| Attacker → target | Typical burst (one rotation) | Target Health | Share |
|---|---|---|---|
| Brawler (Roll + Haymaker full + 3 basics) → Verdant | 200 + 302 + 390 = ~890 | 1,800 | ~50% |
| Bonespire (Lance on weak point + 2 basics) → Titan | (258 × 1.5) + 308 = ~695 | 2,600 | ~27% |
| Thornrunner (Dash + 5 s bleed + 3 barbs + 3 basics) → Hollow | 115 + 144 + 92 + 300 = ~650 | 1,600 | ~41% |
| Hollow (Null Pulse + 4 basics) → Thornrunner | 98 + 368 = ~466 | 1,500 | ~31% |

**Target:** a full solo rotation removes 25–50% of a same-Level target's Health;
**a pair's combined rotation** (or a Synergy) should be able to take one down.
This keeps fights about teamwork and pairs, as the source pages intend.

# Part 2 — The Ascendants

The seven playable lineages, from the Kith Base Form to Stage 3. Numbers are
**Spec** (`spec/02`, `spec/03`, `gdd/02`) unless marked otherwise. Anatomy,
dimensions, animation lists and effect breakdowns are **Proposal**.

## 2.0 Shared rules

### Stages

| Stage | Levels | Height | Capsule radius | Camera distance | Turn rate | Ability scaling |
|---|---|---|---|---|---|---|
| Base Form | 1–2 | 1.0 m | 0.35 m | 5 m | 540°/s | — |
| Stage 1 | 3–9 | 2.0 m | 0.7 m | 7 m | 450°/s | ×1.0 |
| Stage 2 | 10–19 | 4.0 m | 1.3 m | 10 m | 360°/s | ×1.25 |
| Stage 3 | 20 | 7.5 m | 2.4 m | 15 m | 270°/s | ×1.6 |

(Turn rates for Stage 1 and 2 are Proposal, interpolated from the Spec endpoints.)

### Milestones

| Level | What happens |
|---|---|
| 3 | Lineage awakens (Q, E, R, passive) |
| 5 | Rank 2: the lineage's first upgrade |
| 8 | Cross-resonance with non-pair allies |
| 10 | Stage 2; branch choice (Aggression or Tactical Control) |
| 12 / 15 / 18 | Void Garden / Co-Stalk / Smash & Roll unlock |
| 15 | Second branch upgrade; Tenacity stops growing |
| 16+ | Territorial Dominance share per level |
| 20 | Stage 3; choose one of three Ultimate Forms |

**Branch stats:** Aggression +10% Power, +5% Speed, kills drop +15% cores.
Tactical Control +15% Control, +10% Health, captures +25% faster.

### Transformation sequence (all lineages)

| Time | Wildborn | Blightborn | Audio |
|---|---|---|---|
| 0.0 s | Rooted in place, invulnerable | Same | Local sound ducks −12 dB for 0.2 s |
| 0.2 s | Roots burst from the ground and wrap the body | A crystal cocoon forms instantly | Roots tearing / crystal growing in a ring |
| 0.8 s | — | — | **Map-wide cue:** a deep tremor (Wildborn) or a ringing chime with whispers (Blightborn) |
| 1.2 s | The roots fall away | The cocoon shatters outward | Debris |
| 1.5 s | New form stands and calls; camera eases out | Same | Lineage call, now one Stage deeper |

Ember Moths (Ashfall Crossing) are drawn to any transformation within 30 m.

### Animation set every lineage needs

Listed once here; each lineage adds its own signature clips.

| Priority | Clips |
|---|---|
| 1 Gameplay | Basic attack (each hit of the combo), Q / E / R (wind-up, active, recovery), Evade, hit-react light and heavy, stagger, stun loop, Airborne, knockback land, Root channel loop, Convert kneel loop, death |
| 2 Readability | Weak-point exposure pose (where the kit exposes it), hurt walk (below 35% Health), size-fear crouch (Stage 1 near an enemy two Stages larger) |
| 3 Identity | Walk, run, sprint, turn-in-place, idle, carry-heavy walk (300+ cores: heavier steps, glow on the back) |
| 4 World | Feeding (core pickup), resting, pair greeting, brood turn, respawn budding |
| 5 Seasonal | Turn idles (shiver in Rime, pant in Fever) |

Every clip is delivered once per Stage (four rigs: Base Form, S1, S2, S3) and shared
between the Wildborn and Blightborn versions (identical silhouettes and timings).

---

## 2.1 The Kith Base Form (Levels 1–2)

| Field | Value |
|---|---|
| Role | Every player at the start of a match |
| Height | 1.0 m at the shoulder; head adds 0.25 m |
| Proportions | Large head (25% of height), big amber eyes, long mobile ears, slender limbs, short expressive tail |
| Hands | Four long fingers with blunt claws |
| Skin | Grey, moss-flecked; soft bark plates on the shoulders and spine (where lineage growth begins at L3) |
| Stats (Spec) | Health 600 · Power 40 · Speed 100% · Control 10 |
| Basic attack (Spec) | Scratch combo, 2 m, 1.2 hits/s, third hit 0.4 s slower, 1.0 × P per hit; third hit staggers critters |
| Evade (Spec) | 4 m dash, 0.25 s, invulnerable 0.15 s, cooldown 8 s |
| Root (Spec) | 4 s channel within 2 m of a node core |
| Weak point | None (Base Forms die fast enough) |
| Hushed Kith (Blightborn) | Same body; glass patches along the spine, faint cyan veins, violet flickering eyes, a tail that rarely moves |

**Signature behaviour.** Curious, twitchy and playful: ears turn toward sounds,
it sniffs the air, it startles at loud noises. At Base Form the call wheel uses
wild Kith sounds: a chirp ("I'm here"), rapid clicks ("danger"), a low hum ("all
is well"), a rising whistle ("food here") and the distress call.

**First signs of a lineage at L3** (the bark plates change first):
Titan, shoulder plates thicken into stone · Brawler, arms lengthen and knuckles harden ·
Verdant, antler buds · Hollow, a dark opening in the chest · Thornrunner, thorns along the
spine and extra legs forming · Bonespire, bone spikes along the back · Stillheart, frost on the fur.
The Kith's eyes stay the same through Stage 1 and change only at Stage 2.

**Silhouette test:** a Base Form must read as different from every Stage 1
lineage at 40 m. The giveaway is the big head and the lack of any growth on the back.

---

## 2.2 Titan — the mountain that fights (Commit pair)

**Role:** juggernaut and front line. Slowest and hardest to kill; the best
crowd-control setup in the game.

### Numbers (Spec)

| Stat | L1 | L3 | L5 | L10 | L15 | L20 |
|---|---|---|---|---|---|---|
| Health | 600 | 1,000 | 1,500 | 2,600 | 3,900 | 5,200 |
| Power | 40 | 55 | 70 | 100 | 140 | 180 |
| Speed | 100% | 97% | 95% | 90% | 87% | 85% |
| Control | 10 | 18 | 25 | 40 | 58 | 70 |

**Size:** ×1.3 height. Stage 1 2.6 m · Stage 2 5.2 m · Stage 3 9.75 m.

### Kit (Spec)

| Slot | Ability | Area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Basic | Fist slam | Melee 3 m (scales) | 0.8 hits/s | — | 1.2 × P | — |
| Passive | Immovable | — | — | Immune to knockback and Grapple; −10% damage from lower-Stage enemies | — | — |
| Q | Quake Slam | Circle r 5 m (scales) | 0.5 s wind-up, visible ring | Stagger 0.8 s; Smash & Roll trigger | 60 + 0.8 × P | 12 s |
| E | Bulwark | Front 120° cone | Instant, 3 s | −60% damage from the front; Titan slowed 30% | — | 16 s |
| R | Rampart Charge | Line 12 m (scales) | 0.3 s wind-up, 1.0 s charge | Unstoppable; carries up to 2 enemies | 80 + 1.0 × P | 18 s |
| Rank 2 | L5 | — | — | Quake Slam radius +20% | — | — |
| Rule | Commitment (from L18) | — | — | If no Brawler ally starts Roll Commit within 1.5 s of a Quake Slam, its cooldown is +50% | — | — |

**Weak point:** crystal spine on the back. Sphere radius 0.25 × height. Exposed from the rear 120°.

**Branches:** Aggression: L10 stagger 1.0 s; L15 Rampart Charge ends in a second slam (r 4 m, 50%).
Tactical: L10 Bulwark also gives −30% damage to allies within 4 m behind; L15 Bulwark lasts 4 s.

**Ultimates:** Colossus Step · Avalanche · Shatterfist (Aggression) — Fortress · Fault Line · Mountain's Patience (Tactical). Numbers in `spec/03`.

### Anatomy by Stage

| Stage | Wildborn | Blightborn | Key proportions |
|---|---|---|---|
| S1 (2.6 m) | A hunched Kith with stone plates fused across the shoulders and back; amber eyes under a brow of rock | Plates of black glass with cyan cracks; violet eyes | Shoulders 1.6× hip width; arms reach the knees |
| S2 (5.2 m) | Heavy, knuckle-walking colossus; moss carpet on the back; the amber crystal ridge of the weak point runs down the spine | Smooth glass planes with veins of light running upward | Head sits below the shoulder line; knuckles carry 40% of the weight |
| S3 (9.75 m) | A walking mountain: small trees on the shoulders, roots trailing from the feet, a root-print left at each step | A glass mountain like the Glass Range; the ground rings like a bell | Back ridge rises 1.5 m above the head; legs are short pillars |

### Signature animation

| Clip | Notes |
|---|---|
| Quake Slam | 0.5 s raise of both fists (the ring decal appears at 0.0 s and fills to the edge at 0.5 s), impact frame with a 0.15 s hold |
| Bulwark | Forearms crossed in front; stone (or glass) plates slide over the forearms; a 30% slower guard walk |
| Rampart Charge | 0.3 s lowered-shoulder crouch, then a lumbering sprint; carried enemies pinned against the shoulder |
| Settle (rest) | Lowers to the ground and becomes nearly indistinguishable from rock |
| Feeding | Scoops cores in a cupped hand; the glow travels down a stone throat |

### Effects and audio

| Event | Wildborn | Blightborn |
|---|---|---|
| Footstep | Grinding rock; small debris shakes loose; heard through walls from Stage 2 | A struck-glass-bowl tone |
| Quake Slam | Dust ring, rock chips, a low thud felt in the controller | Glass shards spray in a ring; a bell strike |
| Bulwark | Stone plates grinding into place | Glass plates chiming into place |
| Transformation flourish | Boulders rise and fuse onto the body | Black glass erupts and sets like cooling lava |

**Counter-play:** flank to the back (crystal spine), bait the Quake Slam before
committing, kite it (lowest speed in the game), punish a lone slam (Commitment rule).
Strong against Brawler dives and Verdant channels; weak against Bonespire at range and Hollow drain.

---

## 2.3 Brawler — the storm that commits (Commit pair)

**Role:** diver and bruiser. Burst damage, unstoppable engage, the best carrier-hunter.

### Numbers (Spec endpoints)

| Stat | L1 | L10 | L20 |
|---|---|---|---|
| Health | 600 | 2,000 | 3,800 |
| Power | 40 | 130 | 240 |
| Speed | 100% | 105% | 110% |
| Control | 10 | 30 | 50 |

Growth between endpoints follows the S-curve (fastest between L8 and L16).
**Size:** standard. S1 2.0 m · S2 4.0 m · S3 7.5 m.

### Kit (Spec)

| Slot | Ability | Area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Basic | Fist combo | Melee 2.5 m (scales) | 1.4 hits/s | — | 1.0 × P | — |
| Passive | Momentum | — | +5 per hit, +2/s moving in combat, decays 10/s | At 100: +15% attack speed | — | — |
| Q | Roll Commit | Line 8 m (scales) | 0.6 s roll | Unstoppable; uppercut staggers 0.5 s; **chest weak point exposed 1.0 s after** | 70 + 1.0 × P | 10 s |
| E | Haymaker | Melee 3 m | Charge 0.3–1.5 s | Full charge knocks back 6 m | 50 + 0.6 × P to 120 + 1.4 × P | 9 s |
| R | Grapple | Melee 3 m | 0.6 s hold, then throw | Lower-Stage target thrown 8 m | 40 + 0.5 × P, +40 on landing | 16 s |
| Rank 2 | L5 | — | — | Haymaker full charge in 1.3 s | — | — |

**Weak point:** chest plate. Sphere radius 0.2 × height. Only hittable from the front, and only for 1.0 s after Roll Commit ends.

**Branches:** Aggression: L10 Haymaker charges 30% faster; L15 Roll Commit refunds 30% on a takedown.
Tactical: L10 Grapple onto a node interrupts its capture and staggers 0.5 s; L15 Grapple works on same-Stage targets.

**Ultimates:** Frenzy · Wrecking Rush · Last Stand — Pin · Brawl Circle · Shove of the Storm.

### Anatomy by Stage

| Stage | Wildborn | Blightborn | Key proportions |
|---|---|---|---|
| S1 (2.0 m) | Wiry, long-armed Kith with hardened knuckles and a bark-plated chest | Geode knuckles, glass plates | Arm span 1.8× height |
| S2 (4.0 m) | Gorilla-like beast; thick fur at the joints, bark armour, heartwood chest plate | Crystal studs on the fists, shard spikes along the back, a geode chest | Forearms twice the thickness of the upper arms |
| S3 (7.5 m) | Armoured berserker; bark cracks and regrows with every punch | Glass dust bursts from every blow | Fists the size of its head |

### Signature animation

| Clip | Notes |
|---|---|
| Roll Commit | Tucks into an armoured ball, rolls 8 m, unfurls into an uppercut; the chest plate swings open during the 1.0 s recovery (a clear pose, held) |
| Haymaker | Arm drawn back; the charge level shows as the arm coiling further and the fist glowing brighter in three steps |
| Grapple | Two-hand grab, lift overhead, throw; the thrown target tumbles |
| Idle | Never still: paces, cracks its knuckles, beats its chest |
| Feeding | Snatches and tears into cores greedily |

### Effects and audio

| Event | Wildborn | Blightborn |
|---|---|---|
| Momentum | A rising snarl; fur bristles at 100 | The snarl doubled by a whisper a fraction behind |
| Haymaker hit | Splinters and a bark crack | Shards and a geode crack |
| Transformation | Bark splits and regrows thicker across the fists | Geodes crack open along the arms |

**Counter-play:** sidestep the roll (it's a straight line), punish the 1.0 s chest
exposure, stay out of Grapple range at a lower Stage, peel with slows. Strong against
Bonespire and Thornrunner; weak against a Titan's guard and Stillheart's Lull.

---

## 2.4 Verdant — the forest that claims (Root & Void pair)

**Role:** territory controller and sustain. Fastest capture, healing, path control.

### Numbers (Spec endpoints)

| Stat | L1 | L10 | L20 |
|---|---|---|---|
| Health | 600 | 1,800 | 3,400 |
| Power | 40 | 85 | 150 |
| Speed | 100% | 95% | 95% |
| Control | 10 | 60 | 110 |

**Size:** standard, but tall and slender: antlers add 30% to the visual height.

### Kit (Spec)

| Slot | Ability | Area | Timing | Effect | Damage / heal | Cooldown |
|---|---|---|---|---|---|---|
| Basic | Antler sweep | Melee 3 m (scales) | 1.0 hits/s | — | 0.9 × P | — |
| Passive | Deep Root | — | — | Root channel 2 s; its nodes spread to one adjacent neutral cell every 20 s | — | — |
| Q | Bramble Wall | Wall 10 m (scales), 1.5 m tall, up to 15 m away | 0.4 s to grow, lasts 6 s | Blocks movement and projectiles | Wall Health 400 + 2 × P | 18 s |
| E | Sap Draw | Ally or self within 15 m | Heal over 4 s | Costs 40 team SAP | 120 + 1.0 × P | 10 s |
| R | Entangle | Circle r 3 m (scales), up to 15 m away | 0.6 s delay | Root 1.2 s | 30 + 0.4 × P | 14 s |
| Rank 2 | L5 | — | — | Entangle root 1.5 s | — | — |

**Weak point:** bloom pod on the shoulder. Radius 0.2 × height. Exposed from the left and right 90° arcs; +50% size while channelling Root.

**Branches:** Aggression: L10 Entangle deals damage over time; L15 Bramble Wall damages on touch.
Tactical: L10 allies on a node it is rooting heal 2%/s; L15 Bramble Wall lasts 8 s.

**Ultimates:** Thornstorm · Strangling Grove · Sap Frenzy — Overgrowth · Living Wall · Greenhome.

### Anatomy by Stage

| Stage | Wildborn | Blightborn |
|---|---|---|
| S1 | Slender Kith with antler buds; moss spreading down its legs | Glass buds; frost-like Glaze on its legs |
| S2 | A stag of living wood; flowering antlers; amber bloom pod on the shoulder | Glass antlers; crystal flowers that never open; a crystal bud |
| S3 | A walking grove: birds and insects live in its branches | A slow garden of glass, the Lattice Grove's child |

### Signature animation and effects

| Clip / event | Notes |
|---|---|
| Movement | Graceful, unhurried, like a deer through a forest; leaves moss footprints (Wildborn) or Glaze prints (Blightborn) that fade over 6 s |
| Root channel | Forelegs planted, head lowered; roots (or Glaze lines) spread from the hooves; the bloom pod swells (the +50% weak-point growth must be visible) |
| Bramble Wall | Grows in a 0.4 s wave from the near end to the far end |
| Sap Draw | An amber (cyan) stream arcs to the target |
| Idle | Grazes; antler flowers open and close |
| Audio | Creaking wood and rustling, heard by anyone on its territory (Blightborn: wind chimes and tinkling glass) |
| Transformation | A burst of leaves and petals / glass petals that ring as they fall |

**Counter-play:** interrupt its channels (damage breaks Root), hit the bloom pod
from the side while it roots, burn its SAP by forcing Sap Draws. Weak against
Thornrunner flanks and Brawler dives.

---

## 2.5 Hollow — the silence that controls (Root & Void pair)

**Role:** void caster and zone denial. Decides where fights happen.

### Numbers (Spec endpoints)

| Stat | L1 | L10 | L20 |
|---|---|---|---|
| Health | 600 | 1,600 | 3,000 |
| Power | 40 | 115 | 210 |
| Speed | 100% | 100% | 100% |
| Control | 10 | 55 | 100 |

**Size:** standard height but it floats 0.3–0.6 m above the ground (Proposal; the capsule stays on the ground for collision).

### Kit (Spec)

| Slot | Ability | Area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Basic | Void bolt | Ranged 15 m, 30 m/s | 1.0 shots/s | — | 0.8 × P | — |
| Passive | Hush | — | — | No footstep sounds; ambient sound dims nearby | — | — |
| Q | Void Rift | Circle r 4 m (scales), up to 18 m away | 0.3 s to open, 4 s | Slow 30%, Control −40%; Void Garden trigger | — | 14 s |
| E | Hollow Step | Blink 8 m (scales) | 0.1 s | Passes through units and Bramble Walls, not terrain | — | 12 s |
| R | Null Pulse | Circle r 6 m (scales) around self | 0.3 s wind-up | Silence 1.5 s | 40 + 0.5 × P | 20 s |
| Rank 2 | L5 | — | — | Void Rift slow 40% | — | — |

**Weak point:** core cavity in the torso. Radius 0.35 × height (the largest). Exposed from the front 120°; +30% size during the Null Pulse wind-up.

**Branches:** Aggression: L10 Void Rift damages; L15 Hollow Step leaves an exploding echo.
Tactical: L10 Void Rift +30% radius; L15 Null Pulse cancels channels.

**Ultimates:** Collapse · Hollow Out · Unmaking — Event Horizon · Silence of the Deep · Step Between.

### Anatomy by Stage

| Stage | Wildborn | Blightborn |
|---|---|---|
| S1 | Thin Kith with a small dark opening in the chest | The opening holds tiny turning shards |
| S2 | Shadowy floating wraith, robed in hanging bark-strips; chest cavity of soft darkness and floating seeds | Cavity full of slowly turning shards |
| S3 | A cave turned inside out, floating; roots hang like a curtain | Half-invisible, outlined in faint violet light (the Unspoken's heir) |

**Silhouette rule:** a visible hole through the torso at every Stage. Light from behind must pass through it.

### Signature animation and effects

| Clip / event | Notes |
|---|---|
| Movement | Glides; no footsteps; robe-strips trail |
| Hollow Step | Folds inward to a point (0.05 s) and unfolds at the destination; a faint afterimage for 0.3 s |
| Null Pulse | Chest cavity widens over 0.3 s (the weak point grows +30%), then a ring of silence: all sound in the radius drops for 1.5 s, replaced by a muffled heartbeat |
| Void Rift | A disc of darkness with seeds (shards) drifting upward |
| Audio | An inverted hum; nearby sound briefly drops out (Blightborn: a chorus of faint whispers below hearing) |
| Wildlife | Birds stop singing; creatures fall still |
| Transformation | Darkness folds inward, then opens / shards spiral into the chest cavity |

**Counter-play:** it's fragile with a huge frontal weak point; Mark Prey reveals it;
dive it after Hollow Step is spent. Weak against Thornrunner and Brawler.

---

## 2.6 Thornrunner — the hunt that finds (Hunt pair)

**Role:** stalker, scout and assassin. Fastest and quietest; marks prey for the team.

### Numbers (Spec endpoints)

| Stat | L1 | L10 | L20 |
|---|---|---|---|
| Health | 600 | 1,500 | 2,800 |
| Power | 40 | 125 | 230 |
| Speed | 100% | 120% | 135% |
| Control | 10 | 35 | 60 |

**Size:** ×0.8 height, ×1.2 length. S1 1.6 m tall, 2.4 m long · S2 3.2 m, 4.8 m · S3 6.0 m, 9.0 m.

### Kit (Spec)

| Slot | Ability | Area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Basic | Claw rake | Melee 2.5 m (scales) | 1.6 hits/s | — | 0.8 × P | — |
| Passive | Hunter's Silence | — | — | Footsteps heard at ×0.5 range; +15% speed out of combat | — | — |
| Q | Thorn Dash | Line 9 m (scales), passes through | 0.3 s | Bleed on everyone passed | 40 + 0.6 × P, bleed 10 + 0.15 × P per s for 4 s | 8 s |
| E | Mark Prey | Target within 25 m, line of sight | Instant | Reveals 6 s; weak point exposed from every angle to the team; Co-Stalk trigger | — | 16 s |
| R | Barb Volley | Cone 60°, 8 m | 0.2 s | 8 barbs, up to 5 on a close target | 12 + 0.15 × P per barb | 10 s |
| Rank 2 | L5 | — | — | Bleed lasts 5 s | — | — |

**Weak point:** abdomen sac. Radius 0.2 × height. Exposed from the left and right 90° arcs, and for 0.5 s after Thorn Dash ends.

**Branches:** Aggression: L10 bleed 6 s; L15 second Thorn Dash charge.
Tactical: L10 Mark lasts 8 s; L15 Mark slows 20%.

**Ultimates:** Hunt Frenzy · Gut the Hoard · Endless Pursuit — Pack Hunt · Thicket Trap · Scent Trail.

### Anatomy by Stage

| Stage | Wildborn | Blightborn |
|---|---|---|
| S1 | Low, spiny Kith with extra legs beginning to form along its sides | Glass needles instead of thorns |
| S2 | Long-legged insectile quadruped (six legs, front pair raptorial) with an amber abdomen sac | Glass needles, pulsing cyan sac |
| S3 | Bladed horror with hooked legs and thorn-tails; still part animal | Trails glittering dust like the Endless Pursuit |

### Signature animation and effects

| Clip / event | Notes |
|---|---|
| Freeze-strike | Total stillness for 0.2–3 s when it senses an enemy, then an explosive start. The freeze is the tell |
| Thorn Dash | Low lunge; the abdomen sac swings out to the side during the 0.5 s recovery (weak point exposed) |
| Mark Prey | Head snaps toward the target; a thin thorn-thread (glass thread) links them for 0.3 s; the target's weak point lights up for the whole team |
| Idle | Head twitches in quick jerks; tastes the air; grooms its thorns |
| Audio | Skittering and thorn clicks, the quietest Ascendant at every Stage (Blightborn: glass skittering like ice cracking) |
| Wildlife | Prey flees before it's visible |
| Transformation | Thorns lengthen with a creak / needles shoot out with a chiming snap |

**Counter-play:** stay grouped (it hunts lone carriers), use area control, punish its
low Health once it's revealed. Weak against a Titan in close range.

---

## 2.7 Bonespire — the memory that strikes from afar (Hunt pair)

**Role:** siege sniper. Long range, weak-point breaker, structure killer.

### Numbers (Spec endpoints)

| Stat | L1 | L10 | L20 |
|---|---|---|---|
| Health | 600 | 1,450 | 2,700 |
| Power | 40 | 140 | 260 |
| Speed | 100% | 92% | 90% |
| Control | 10 | 45 | 80 |

**Size:** standard; spines add up to 40% visual height at Stage 3.

### Kit (Spec)

| Slot | Ability | Area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Basic | Bone shard | Ranged 25 m, 40 m/s | 0.9 shots/s | — | 1.1 × P | — |
| Passive | Rememberer | — | — | +1 bone per takedown (max 10), each +1% Power; bones shown on its back | — | — |
| Q | Spire Lance | Skillshot 40 m (S2 45, S3 50), width 0.6 m | 0.6 s wind-up, loud crack heard at 60 m; 60 m/s | ×1.5 weak point; ×2.0 exposed; Co-Stalk trigger | 90 + 1.2 × P | 9 s |
| E | Ossuary | Fence 8 m (scales), up to 15 m away | 0.3 s to rise, 5 s | Blocks movement, not projectiles | Fence Health 300 + 1.5 × P | 16 s |
| R | Calcify | Projectile 20 m | 0.2 s | Slow 25% → 50% → stun 1.0 s on the third hit within 3 s | 25 + 0.3 × P | 6 s |
| Rank 2 | L5 | — | — | Spire Lance 72 m/s | — | — |

**Weak point:** marrow spire on the back. Radius 0.22 × height. Exposed from the rear 120°; +30% size during the Spire Lance wind-up.

**Branches:** Aggression: L10 Lance pierces (60% to the second); L15 second Lance charge.
Tactical: L10 Ossuary lasts 7 s; L15 Calcify stun 1.5 s.

**Ultimates:** Marrow Barrage · Siege Spire · Rememberer's Aim — Bone Cathedral · Ossuary Maze · Fossilise.

### Anatomy by Stage

| Stage | Wildborn | Blightborn |
|---|---|---|
| S1 | Hunched Kith with small bone spikes rising from its back | Glass spikes |
| S2 | Ballista-beast: fossil spines, a pale marrow spire, a long bracing tail | Black glass spines, glowing cyan spire |
| S3 | A walking reliquary of bones from every creature it has hunted | Glass copies of its victims' bones, like the Archive |

### Signature animation and effects

| Clip / event | Notes |
|---|---|
| Spire Lance | Plants its forelegs, tail braces, the spire on its back tilts forward and glows (0.6 s); the crack at release is the loudest player sound in the game |
| Rememberer bones | Up to 10 extra bone pieces snap onto the back, one per takedown, kept until death |
| Movement | Hunched and deliberate, like a heron stalking |
| Rest | One leg raised, like a sleeping heron |
| Audio | Bone clicking; a hollow crack when it fires (Blightborn: glass ringing, a shatter when it fires) |
| Wildlife | Scavengers (Marrowhounds, Ash Vultures) follow it |
| Transformation | Bones rattle up from the ground and lock onto the back / glass bones grow out of the spine |

**Counter-play:** follow the crack to find it, dive it (slow, fragile), hit the
spire from behind. Strong against Titans and structures.

---

## 2.8 Stillheart — the patience that stops fire (from Season 3)

**Role:** tempo controller and support. No pair of its own; a universal partner.

### Numbers (Spec endpoints)

| Stat | L1 | L10 | L20 |
|---|---|---|---|
| Health | 600 | 2,200 | 4,200 |
| Power | 40 | 85 | 150 |
| Speed | 100% | 90% | 90% |
| Control | 10 | 55 | 100 |

**Size:** standard height; long-limbed, shaggy and rounded.

### Kit (Spec)

| Slot | Ability | Area | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Basic | Frost swipe | Melee 3 m (scales) | 0.9 hits/s | Slows 10% for 1 s | 0.9 × P | — |
| Passive | Slow Heart | — | — | Out-of-combat regeneration 3%/s; footsteps ×0.7 range | — | — |
| Partner | Lullaby Resonance | 15 m | — | Allies' Synergy cooldowns −10% | — | — |
| Partner | Attunement | Ally within 5 m | 2 s channel, once per life | Bonus by the ally's lineage (`spec/02`) | — | — |
| Q | Lull | Cone 50°, 10 m (scales) | 0.3 s | Slow 40% for 2 s; second Lull in 3 s: Drowse 1.0 s | 20 + 0.3 × P | 7 s |
| E | Hibernate | Self or ally within 12 m | Instant, 2 s | Ice stasis: invulnerable, can't act; carried cores safe | — | 24 s |
| R | Long Night | Circle r 7 m (scales), up to 15 m away | 0.5 s to form, 5 s | Enemy cooldowns tick 30% slower inside | — | 22 s |
| Rank 2 | L5 | — | — | Lull slow 45% | — | — |

**Weak point:** the heart. Radius 0.3 × height. Exposed from the front 180°, always visible (glowing).

**Ultimates:** Killing Frost · Rime March · Avalanche Heart — The Deep Sleep · Winter's Wall · Long Dream.

### Anatomy by Stage

| Stage | Wildborn | Blightborn |
|---|---|---|
| S1 | Curled, frost-furred Kith, sleepy-eyed | Frost replaced by fine glass needles |
| S2 | Long-limbed, ice-antlered, sloth-like; a visible heart behind a window of clear ice | Black glass antlers; a cyan heart |
| S3 | A walking glacier with a slow-beating heart in its icy chest | A glacier of dark crystal, its heart pulsing cyan-violet |

### Signature animation and effects

| Clip / event | Notes |
|---|---|
| Heartbeat | Visible and audible: ~40 bpm calm, ~140 bpm in a fight (drives an emissive pulse on the heart) |
| Movement | Very slow, then suddenly fast |
| Rest | Falls asleep standing up; frost creeps over it |
| Hibernate | A block of ice forms around the target in 0.15 s; carried cores visible frozen inside |
| Long Night | A dome of dusk with slow-falling snow; enemy ability icons inside visibly tick slower |
| Audio | A slow, deep heartbeat; frost crackling |
| Transformation | Frost spreads and thickens into ice / frost turns to black glass |

**Counter-play:** poke it from range (its heart is always visible), fight it in long
fights where its cooldowns are spent. Strong against Brawlers and other divers.

---

## 2.9 Silhouettes at match distance

Every lineage must be recognisable in solid black at 60 m:

| Lineage | Silhouette key |
|---|---|
| Kith | Big head, big ears, no growths |
| Titan | Huge, broad, top-heavy; a ridge along the back |
| Brawler | Hunched; long arms; knuckle-walking |
| Verdant | Tall, slender legs; wide branching antlers |
| Hollow | Thin, floating; a hole through the torso |
| Thornrunner | Low and long; many legs; spiked outline |
| Bonespire | Hunched; tall spikes rising from the back |
| Stillheart | Long-limbed and antlered; rounded, shaggy outline |

## 2.10 Death and respawn

| Moment | Wildborn | Blightborn |
|---|---|---|
| Killed | Sinks to its knees, lies down; moss creeps over it before it fades (2.5 s) | Freezes, glazes over, shatters into glittering dust (1.5 s) |
| Base Form killed | A soft fall; a seed of light drifts toward the Cradle | A crystal crack; a spark drifts toward the Clutch |
| Ascendant killed | A heavy collapse that shakes the ground within 30 m; flowers open where it lay | A ringing shatter heard across the map; shards scatter |
| Dropped cores | Glow on the ground for 30 s (Spec); anyone can pick them up | Same |
| Respawn time (Spec) | 5 s + 1 s × level; +5 s in Phase 4 | Same |
| Respawn visual | Budding from a fresh root knot at the Cradle | A crystal pod cracking open at the Clutch |

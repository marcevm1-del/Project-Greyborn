# 43 — Ascendants as Living Creatures

The Ascendants aren't machines. They're animals of a living planet. This
chapter describes how each lineage **moves, rests, eats and reacts**, for
animators and sound designers, and how **wildlife reacts to them**. All are proposals.

## Shared animal behaviours

- **Idle:** when the player stops moving, the creature behaves like an animal:
  sniffing, shifting weight, scanning the horizon.
- **Eating:** picking up cores is shown as **feeding**: a quick snap of the jaws,
  a swallow, a glow running down the throat. Converting at base is feeding the
  birth-pool ([33](33-structures.md#the-cradle--the-clutch-bases)).
- **Hurt:** at low Health, creatures limp, breathe hard and hold injured limbs.
  An enemy can *see* weakness without a health bar.
- **Fear:** near a much larger enemy Ascendant, a lower-Stage creature
  instinctively crouches. A purely visual cue for the size difference.

## Lineage by lineage

| Lineage | Movement | Idle | Feeding | Signature behaviour |
|---|---|---|---|---|
| **Titan** | Slow, heavy, deliberate; each step shakes small debris loose | Settles like a boulder; moss trembles on its back | Scoops cores with one huge hand | Lies down to rest and **becomes hard to tell from rock** (the First Answer's echo) |
| **Brawler** | Knuckle-walking, restless, bursts of speed | Paces; cracks its knuckles; beats its chest | Tears into cores eagerly | **Never stays still**: always shifting, ready to fight |
| **Verdant** | Graceful, unhurried, like a deer through a forest | Grazes; flowers on its antlers open and close | Absorbs cores through its feet like a plant drinking | **Leaves footprints of moss** everywhere it walks |
| **Hollow** | Glides, almost floats; makes no footsteps | Hangs perfectly still, like a held breath | Cores float into its chest cavity and vanish | **Nearby sound dims** around it (gameplay: [02](02-ascendant-roster.md#hollow-root--void-pair-void-caster--zone-denial)) |
| **Thornrunner** | Low, fast, skittering, like a hunting insect | Twitches its head; tastes the air | Snatches cores mid-run | **Freezes completely** when it senses an enemy, then strikes |
| **Bonespire** | Hunched, deliberate, like a heron stalking | Cleans and arranges the bones on its back | Grinds cores between bony plates | **Collects bones** from kills and adds them to its back |
| **Stillheart** | Very slow, then suddenly fast | Falls asleep standing up; frost forms on it | Cores freeze on contact and melt into it | Its **heartbeat is visible and audible**; it slows when calm and races in a fight |

**Blightborn versions** behave the same way, with one difference: they're
**slightly too synchronised**. When a Blightborn brood idles together, their
movements subtly match, like one mind moving four bodies ([10](10-world.md#the-murmur-the-hive-mind)).

## How wildlife reacts to Ascendants

| Lineage nearby | Wildlife reaction |
|---|---|
| **Titan** | Grazers stay calm (it's like a mountain). Small critters hide under nearby rocks |
| **Brawler** | Herds scatter early: its noise and energy frighten them |
| **Verdant** | Grazers and Sapback Aphids **follow it** at a distance; insects settle on it |
| **Hollow** | Birds stop singing; creatures fall still, as if listening |
| **Thornrunner** | Prey creatures flee *before* it's visible; they sense the predator |
| **Bonespire** | Scavengers (Marrowhounds, Ash Vultures) **follow it**, expecting a kill |
| **Stillheart** | Creatures nearby slow down and grow drowsy |
| **Any Blightborn** | Wildlife edges away, uneasy; **Blighted creatures turn to face it** |

These are visual and audio behaviours, with **one gameplay effect**: they act as
**free information** for observant players. Birds going quiet means a Hollow
might be near; scavengers circling means a Bonespire is hunting. It
rewards reading the living world, which is the heart of the game's identity.

**Note:** the wildlife reaction rules must not reveal a player more than their
existing sound signature already does. They're a hint, not a minimap ping.

---

## How behaviour changes with each Stage

Creatures don't only get bigger; they behave differently as they grow.

| Stage | Behaviour |
|---|---|
| **Base Form** | Curious, twitchy, playful. Looks around constantly; startles at loud sounds |
| **Stage 1** | Testing its new body: stretches, flexes, occasionally stumbles over new limbs |
| **Stage 2** | Confident. Moves with purpose; idles by surveying territory |
| **Stage 3 (Ascendant)** | Majestic and slow to react to small things. Small creatures and Base Forms scatter from it |

## Brood behaviour

Teammates are a brood, and the animation system shows it.

- **Idling together:** brood-mates standing close turn slightly toward each other.
- **Returning together:** when two brood-mates convert at the same time, they kneel side by side at the birth-pool.
- **A fallen brood-mate:** nearby teammates briefly look toward the body. It
  doesn't interrupt control; it's a short head-turn.
- **Respawn greeting:** a respawning player and any teammate at the base exchange a short call.

## Death and defeat

| Moment | Wildborn | Blightborn |
|---|---|---|
| **Killed** | The creature sinks to its knees, then lies down. Moss starts to creep over it before it fades | The creature freezes in place, glazes over, and shatters into glittering dust |
| **Base Form killed** | A soft fall, and a faint seed of light drifts back toward the Cradle | A crystal crack, and a spark drifts back toward the Clutch |
| **Ascendant killed** | A heavy collapse that shakes the ground; flowers open where it lay | A ringing shatter heard across the map; shards scatter |

Deaths are dignified on both sides. The world takes its creatures back gently.

## Blightborn behaviour in detail

The Blightborn's **synchronisation** is their most important behavioural trait.

- **Idle sync:** when two or more Blightborn idle within 10 m, their breathing
  and small movements gradually align over three seconds.
- **Head turns:** when one Blightborn turns to look at something, nearby
  brood-mates turn too, a fraction later.
- **Calls:** their calls overlap in harmony, never in unison. It sounds like one voice from many throats.
- **Fear:** Blightborn don't crouch from larger enemies the way Wildborn do.
  They hold still and watch. The Murmur doesn't feel fear the same way.
- **The hum (Season 5):** during Season 5, idle Blightborn hum the Murmur's
  first tune ([47](47-season-5.md)). In Season 7, the hum stops ([51](51-season-7.md)).

## Animation priorities

Animation time is limited, so this is the order of importance:

1. **Gameplay-critical:** attacks, telegraphs, weak-point exposure, Synergy triggers.
2. **Readability:** Stage silhouettes, hurt and limp states, size-fear crouch.
3. **Identity:** each lineage's movement style and signature behaviour.
4. **World feel:** idles, feeding, brood behaviour, death animations.
5. **Season extras:** the hum, Turn-specific idles (shivering in Rime, panting in Fever).

## Sound of living creatures

Every lineage has a library of non-combat sounds: breathing, footsteps,
feeding, idle calls. These follow Stage (deeper as it grows) and side (wood
or glass). Breathing is especially important: a player who stops moving
should hear their creature breathe, slower when healthy and faster when hurt,
which tells them their state without a glance at the HUD.

---

## Each lineage, observed

Field notes, as if a patient observer watched each lineage for a whole match.

**The Titan** spends most of its time still. Between fights, it stands at a
chokepoint or beside a Hub and shifts its weight from foot to foot, and the
ground creaks under it. Small creatures treat it like a hill: Cairnshells
climb onto its back, birds land on its shoulders. When it moves, it moves with
purpose, and everything nearby moves out of its way. When it fights, it seems
to wait for the exact moment, then commits completely.

**The Brawler** never seems to rest. It paces, circles, drums its knuckles on
the ground, tests the air. It approaches every creature it meets as if
deciding whether to fight it. It's playful with its pair partner: a shoulder
bump, a short mock charge. In a fight, it's pure motion.

**The Verdant** moves slowly and carefully, and everything around it seems to
calm down. Grazers follow it. Lumen Bees settle on its antlers. It stops often
to touch the ground, and wherever it touches, moss spreads. It's the only
lineage that seems to *tend* the world rather than move through it.

**The Hollow** is hard to observe. It glides between shadows, hangs perfectly
still for long stretches, then moves suddenly. Sounds dim around it. Birds
stop singing. If you watch it long enough, you notice it seems to be
*listening*, always, to something no one else can hear.

**The Thornrunner** is always low to the ground, head moving in quick jerks,
tasting the air. When it finds prey, it freezes completely, sometimes for
several seconds, then explodes into motion. Between hunts, it grooms its
thorns, and it never sleeps in the open.

**The Bonespire** is the most methodical. It walks like a heron, deliberately,
stopping to scan. It collects bones: after every kill, it picks one up and
fits it onto its back, adjusting until it's satisfied. Scavengers follow it at
a distance, expecting what it leaves behind.

**Stillheart** seems asleep most of the time, frost forming on its fur. Then,
when danger comes, it moves faster than anything its size should, and its
heartbeat, visible in its chest, races. When the danger passes, it slows, and
the frost returns.

## Rivalries and recognitions

Lineages recognise each other, and their idle behaviour shows it:

| When near… | Behaviour |
|---|---|
| **Its pair partner** | Turns toward it; small greeting gesture (Titan and Brawler bump shoulders; Verdant and Hollow share a moment of stillness; Thornrunner and Bonespire exchange a click) |
| **An enemy of the same lineage** | A long, wary stare; a challenge call |
| **An enemy of its pair partner's lineage** | Instinctive aggression; leans toward it |
| **A Stillheart (any side)** | Slows slightly; seems calmer |
| **A Wild Ascendant** | Uncertainty: a lowered head, a soft call, as if recognising something ancient |
| **An Old One** | Stops and watches, in silence |

## Behaviour through the Turns and weather

| Condition | How creatures behave |
|---|---|
| **Bloom** | More playful; Kith and Base Forms chase small creatures |
| **Ash** | Restless; frequent glances north at dusk |
| **Rime** | Slower; breath visible; creatures huddle when idle |
| **Fever** | Panting, agitated; idles are shorter and twitchier |
| **Ashfall weather** | Creatures squint and shake ash from their coats |
| **Sap Rain** | Creatures turn their faces up to drink |
| **Shard Storm** | Wildborn flinch from falling glass; Blightborn stand still and let it fall on them |
| **Breathing Night** | Creatures stay closer together |

## How behaviour helps the competitive game

Every behaviour here is **cosmetic** except where stated, but together they
make the game easier to read:

- **Hurt states** show weakness without health bars.
- **Size-fear** shows the power gap between Stages.
- **Pair greetings** show which enemies are paired up.
- **Freeze-then-strike** gives a tiny tell before a Thornrunner pounces.
- **Weather reactions** confirm the conditions at a glance.

The goal is a battlefield where a skilled player reads the enemy's state from
body language alone, the way a hunter reads an animal.

## Feeding and resting in detail

| Lineage | Feeding animation | Resting animation |
|---|---|---|
| **Titan** | Scoops cores in a cupped hand, swallows slowly; the glow travels down its stone throat | Lowers itself to the ground and becomes nearly indistinguishable from rock |
| **Brawler** | Snatches cores and tears into them; quick, greedy bites | Never fully rests; sits on its haunches, alert |
| **Verdant** | Cores are absorbed through its hooves; flowers open along its back | Lies down like a deer, legs folded, antlers resting on the ground |
| **Hollow** | Cores float into its chest cavity and fade | Hangs motionless in the air, just above the ground |
| **Thornrunner** | Snaps cores out of the air mid-stride | Curls up tightly, thorns out, in a hollow or under a ledge |
| **Bonespire** | Grinds cores between bony plates with a soft crunch | Stands still, one leg raised, like a sleeping heron |
| **Stillheart** | Cores freeze on contact and slowly melt into its fur | Falls asleep standing; frost spreads over it |

## Sound vignettes

Short descriptions for sound designers of what a player should hear standing
still beside each lineage:

- **Titan:** a slow grinding as it shifts, a breath like wind in a cave, small stones settling.
- **Brawler:** quick snorts, knuckles tapping, a low rumble in the chest.
- **Verdant:** leaves rustling, a soft creak, bees humming nearby.
- **Hollow:** almost nothing. A faint pressure, like the air before a storm.
- **Thornrunner:** quick clicks, a hiss of breath, thorns rattling.
- **Bonespire:** bones clicking as it adjusts, a whistle of air through bone.
- **Stillheart:** a slow, deep heartbeat; frost crackling.

The Blightborn versions add, under each, a faint whisper in harmony.

## How wildlife perceives Ascendants

For the AI that drives wildlife, each Ascendant has three perception values:

| Value | Meaning | Example |
|---|---|---|
| **Threat** | How dangerous it seems to prey | High for Thornrunner and Brawler; low for Verdant |
| **Presence** | How far away creatures notice it | High for Titan (sound) and Stage 3s; low for Hollow and Thornrunner |
| **Attraction** | Whether certain creatures are drawn to it | Grazers to Verdant; scavengers to Bonespire; Hoarfrost Mites to Stillheart |

These values feed the behaviours above (fleeing, following, falling silent).
They're tuned so wildlife reactions stay **hints**, never more revealing than
the creature's own sound signature ([43](43-living-creatures.md#how-wildlife-reacts-to-ascendants)).

## Accessibility of behaviour cues

Because body language carries information, it needs fallbacks:

- **Hurt states** are also shown by the health bar for players who turn on
  "always show enemy health"; limping is a bonus, not a requirement.
- **Wildlife reactions** (birds going silent, prey fleeing) have optional
  on-screen indicators: a small icon over the region where the reaction happens.
- **Size-fear crouch** is reinforced by the Stage icon over each creature.
- **Blightborn synchronisation** is cosmetic only; no information depends on noticing it.
- **Breathing as a health cue** has a visual equivalent: the player's own
  vignette pulses faster when hurt.

The rule from sound design applies here too: **every cue that carries
information must have a second way to be read.**

# 25 — Calls & the First Budding

Two places where the world meets the player directly: how players
**communicate** in a world without words, and how a new player is **born
into** Greyborn. All content here is a proposal.

## Part 1 · Calls (wordless communication)

The world has no words (decided). The **UI** can use text, but in-match
communication is designed as **creature calls**: pings and emotes that are
sounds and gestures the creatures would really make.

### The call wheel

Every player has an 8-slot call wheel. Each call is a **sound + gesture +
map marker**, and it's voiced by your lineage and Stage.

| Call | Meaning | Marker | Wildborn sound | Blightborn sound |
|---|---|---|---|---|
| **Gather** | Group up here | Circle | A low hoot | A chime in three tones |
| **Attack** | Engage this target | Claw mark | A roar | A sharp shatter |
| **Danger** | Enemy or threat here | Warning shape | A bark | A hiss of whispers |
| **Heavy** | I'm carrying a lot of cores | Core icon | A grunt with a rattle | A ringing hum |
| **Returning** | I'm going home to convert | Arrow to base | A long call | A falling tone |
| **Root here / Blight here** | Capture this node | Node outline | A creak of wood | A tinkle of glass |
| **Pair ready** | My Synergy is ready | Pair icon | Lineage-specific (see below) | Lineage-specific |
| **Help** | I need support | Pulse | A cry | A broken chord |

**Pair-ready calls** match the callouts in [07 — Tactical Notes](07-tactical-notes.md#4-coordinated-interdependent-abilities-callouts):
Titan = **"Slam up"** (a ground-thump), Thornrunner = **"Marked"** (a clicking
trill), Hollow = **"Garden"** (a hush), and so on.

### Rules
- **Readable to your team, a tell for the enemy.** Calls are heard by
  enemies nearby too, but only as a sound with no marker. Calling near the
  enemy gives your position away, just like a real animal's call.
- **Stage changes the voice.** A Stage 3 call is deeper and louder than a Stage 1 call.
- **Spam limit:** 3 calls per 5 s.
- **Accessibility:** every call shows a marker and icon for players who can't
  hear it, and has a text label in the UI if text pings are turned on.

### Instinct emotes (out of combat)

Emotes are **animal behaviour**, not human gestures:
**Sniff the air**, **Stretch**, **Shake off** (like a wet dog), **Groom**,
**Mark territory** (scratch the ground), **Howl at the Fall-line**,
**Face north** (the Strays' dusk ritual). Lineages and seasons unlock more.

## Part 2 · The First Budding (onboarding)

The first time a player opens Greyborn, they are **born**. Onboarding is
told as the life of a new Kith, and it teaches the game in that order.

### Step by step

| Step | In the world | What it teaches | Length |
|---|---|---|---|
| **1. Ripening** | Darkness, a slow heartbeat. Light breaks through as a **birth-node** splits open | Camera and movement | 1 min |
| **2. The Brood** | Three other new Kith (AI) bud beside you. You follow them through the Rootwilds | Following, calls (Gather) | 2 min |
| **3. Hunger** | Strays and critters. A Glimmerfox darts away | Light combat, dodge, collecting cores | 3 min |
| **4. The Call** | The ground trembles. Roots reach toward you. The planet calls your brood | Rooting a node, Territorial Influence | 2 min |
| **5. Awakening** | At Level 3, your lineage awakens. **You choose one of the six**, each previewed by a short vision of its First Answer | Lineage choice, abilities | 3 min |
| **6. Heavy** | You carry cores. An Ashfang pack hunts you on the way home | Carrying risk, sound signature, returning to base, conversion | 3 min |
| **7. The Whisper** | At the forest edge, moss turns to glass. Blightborn (AI) appear | Enemies, weak points, the war | 4 min |
| **8. Together** | Your brood's paired lineage joins you. You trigger a Synergy together | Pairs and Synergies | 3 min |
| **9. Memory** | You touch a fossil and see the Fall in a wordless vision | Memories, the story | 1 min |
| **10. The Answering** | A practice 4v4 against AI broods | The full loop | 10–15 min |

**Total:** about 35 minutes, with a skip option for experienced players.

### The other side
After their first few matches, a new player gets a short **Blightborn
prologue** the first time they're assigned that side: a Kith budding in
blighted soil, hearing the whisper for the first time. It teaches the mirror
(*same lineages, different side*) and makes the infected side feel like a
story too, not just "the enemy".

### Early matches
- New players' first **5** real matches are against other new players or AI.
- **Lineage suggestions:** after the tutorial, the game suggests trying each
  lineage's pair partner, to teach the pair system naturally.

---

## Call wheel design details

- **Input:** hold a button to open the radial wheel, flick toward a call,
  release. A quick tap without flicking sends a **contextual call**: "Danger"
  on an enemy, "Root here" on a node, "Gather" on open ground.
- **Timing:** calls play instantly and the marker lasts 5 s on the map.
- **Directional audio:** teammates hear the call from the caller's direction,
  so a call is also a location.
- **Customisation:** players choose which 8 calls fill the wheel from a
  larger list, and can swap voices through cosmetics ([26](26-collection.md)).
- **Pair calls:** the "Pair ready" call automatically uses the right voice for
  your lineage ("Slam up", "Marked", "Garden"), so it's always meaningful.

## The First Budding, in scenes

**Ripening.** The screen is dark. A heartbeat, slow and deep, fills the
speakers. Light seeps in from above as something splits open: the player's
birth-node. The player's first input is to move toward the light.

**The Brood.** Three small Kith tumble out beside the player, blinking. One
chirps and trots off into the forest. The others follow. So does the player,
learning the camera by watching them.

**Hunger.** In a clearing, a Glimmerfox flickers. A skink burrows. The
brood scatters to hunt. The player learns to attack and dodge, and the first
cores are shown flowing into the creature as light.

**The Call.** The ground trembles. Roots rise from the soil and curl toward
the brood, pointing at a knot of roots in the ground. The player learns to
Root a node and watches the territory spread.

**Awakening.** At Level 3, the screen slows. Six shapes appear in a vision:
the First Answers. Each one moves for a moment, showing its nature. The
player chooses, and their body changes.

**Heavy.** Carrying cores, the player hears their own aura hum. An Ashfang
pack howls. The run home to the birth-pool is the first real tension the
player feels.

**The Whisper.** At the forest edge, moss turns to glass. Strange Kith,
glazed and moving in perfect step, appear between the trees. The first
fight against the Blightborn teaches weak points.

**Together.** The player's pair partner (AI) arrives. A prompt to call
"Pair ready", and the first Synergy fires.

**Memory.** A fossil glows. The player touches it and sees the Fall.

**The Answering.** The vision fades into a real 4v4 against AI broods.

## Accessibility in onboarding

- **Subtitled sound cues:** every important sound in the tutorial (the
  heartbeat, the planet's call, the Ashfang howl) has an optional caption.
- **Visual sound indicators** are introduced in the "Heavy" scene, where the
  player's own carry signature is shown as a ring on screen.
- **Colour-blind options** are offered before the first match, previewed
  on the planet's amber and the Murmur's cyan.
- **Pace control:** every scene waits for the player; nothing times out.

---

## The full call list

Players choose 8 calls for their wheel from this list:

| Call | Meaning | Marker |
|---|---|---|
| Gather | Group up here | Circle |
| Attack | Engage this target | Claw mark |
| Danger | Enemy or threat here | Warning shape |
| Heavy | I'm carrying a lot of cores | Core icon |
| Returning | Going home to convert | Arrow to base |
| Root here / Blight here | Capture this node | Node outline |
| Pair ready | My Synergy is ready | Pair icon |
| Help | I need support | Pulse |
| Retreat | Fall back | Arrow away |
| Hold | Stay here, defend | Shield shape |
| Hunt | Chase this target | Paw print |
| Escort | Protect this player | Ring around ally |
| Apex | Apex creature here | Apex silhouette |
| Landfall | Clamor Landfall here (Season 3+) | Red streak |
| Tension | This border is about to erupt | Wave shape |
| Memory | A Memory site is here | Glow mark |
| Thanks | A soft call of thanks | None (sound only) |
| Sorry | A soft apology | None (sound only) |

## Contextual calls

A quick tap (without the wheel) sends the most likely call:

| Aimed at | Call sent |
|---|---|
| An enemy | Danger |
| An enemy carrying 200+ cores | Hunt |
| A neutral or enemy node | Root here / Blight here |
| An ally carrying 300+ cores | Escort |
| An apex creature | Apex |
| Open ground | Gather |
| Your own base (on the minimap) | Returning |

## Lineage voices for calls

Each lineage voices calls in its own way. A "Gather" from a Titan is a deep
rumble; from a Thornrunner, a sharp trill; from a Hollow, a soft, hollow
note that seems to come from everywhere; from Stillheart, a slow, low hum.
Players quickly learn to recognise their teammates' lineages by their calls
alone, which helps coordination without any words.

## Why calls help keep the game friendly

Greyborn has no in-world language, and calls are wordless by design. Text and
voice chat can be offered as options, but the default communication is the
call wheel. Calls can only express useful, game-related ideas (and "Thanks"
and "Sorry"), so the default way of talking to strangers can't be used for
abuse. It's a quiet benefit of the wordless world: a calmer, kinder community.

## The second week: meeting the lineages

After the First Budding, onboarding continues for a new player's first
week with optional **lineage introductions** in the Den:

- Each lineage has a short (3-minute) guided drill: its abilities, its weak
  point, its pair partner and one Synergy.
- Completing a lineage's drill unlocks its Memory of the First Answer early.
- Completing all six (seven, with Stillheart) unlocks a Den decoration: six
  (seven) small carvings of the First Answers on the wall.

## Returning players: catching up on the story

A player returning after months away gets a **season catch-up**: a short,
wordless sequence of the Memories they missed, played in order, and the War
Map's history layer opened to show what changed. Nothing is explained in
words. They see the story the same way everyone else did.

## Onboarding Stillheart (Season 3)

Stillheart is very different from the six launch lineages, so it gets its own
short onboarding the first time a player picks it:

1. **Waking:** the player's Stillheart wakes under ice and breaks free.
2. **Lull:** slowing a charging Ashfang, then putting it to sleep with a second Lull.
3. **Hibernate:** saving an AI teammate carrying cores from a killing blow.
4. **Attunement:** bonding with an AI partner and seeing the bonus.
5. **Long Night:** slowing an enemy brood's abilities in a short skirmish.

## Wordless hints

During a new player's first 20 matches, the game offers **hints** without text:

| Situation | Hint |
|---|---|
| Carrying 300+ cores far from base | A faint glowing trail toward the base appears on the ground for a moment |
| Pair partner far away | The partner tether pulses brighter |
| A weak point exposed nearby | The weak point pulses a little more strongly |
| A border at 75+ Tension | The drone is slightly louder for new players |
| A Memory site nearby | A soft chime and glow |

Hints fade out entirely once a player has shown they understand each idea.

## Onboarding metrics

| Measure | Target |
|---|---|
| New players who finish the First Budding | 85%+ |
| New players who return to base with 200+ cores in their first real match | Most |
| New players who trigger a Synergy in their first five matches | 60%+ |
| New players who find at least one Memory in their first week | 90%+ |
| New players who play both sides in their first five matches | 100% (sides are assigned) |

## The first real match, in detail

A new player's first match after the First Budding is designed to succeed:

- **Opponents:** other new players or AI broods ([25](25-calls-and-onboarding.md#early-matches)).
- **Map:** Ashfall Crossing, the most readable launch map.
- **Weather:** Clear, daytime.
- **No events:** world events are switched off for a player's first five matches.
- **A partner:** if the player queued alone, the matchmaker gives them a teammate playing their pair partner's lineage where possible, so they can feel a Synergy early.
- **Wordless hints** are active.

The goal is that every new player ends their first match having grown to at
least Stage 2, returned to base at least once, and seen a Synergy fire,
whether they won or lost.

## Onboarding principles

1. **Show, never tell.** The world has no words; neither does the tutorial.
2. **One idea at a time.** Each scene of the First Budding teaches one thing.
3. **The world teaches first.** Plants, creatures and sounds introduce mechanics before the HUD does.
4. **Never punish learning.** No timers, no failure states in the tutorial.
5. **Both sides matter.** The Blightborn prologue makes sure the infected side is a story too.

## Calls and onboarding together

Calls are the first "language" a new player learns. The First Budding
introduces them one at a time (Gather in *The Brood*, Danger in *Hunger*,
Heavy in *Heavy*, Pair ready in *Together*), so that by the first real match,
a player can already speak Greyborn's only language: the calls of its creatures.

## Summary

Calls let a wordless world talk; the First Budding lets a new player be born
into it. Both follow the same rule: show, never tell.

Every call a player makes is, at heart, the sound a wild Kith would make.

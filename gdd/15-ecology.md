# 15 — Ecology, Sky & Sea

How Greyborn's creatures live together, how the living world reacts *during*
a match, and what lies above and around the Greyreach. All content here is a proposal.

## The food web

Wildlife doesn't just wait to be killed. Predators hunt prey, scavengers
follow fights, and herds move. In a match, this happens **live on the map**.

```
 PLANET (SAP, roots)
   │ feeds
   ▼
 GRAZERS & SAP-FEEDERS ───── eaten by ─────► PREDATORS ─── leftovers ──► SCAVENGERS
 Mossback Grazer, Stiltwalker,              Ashfang, Duskmane, Hexmaw,     Marrowhound,
 Rimeback Stag, Sapback Aphids,             Glasslegs, Tendril Crawler,    Bone Harvestman,
 Sapdrinker, Gravel Skink,                  Marrow Mantis, Thornwasp       Threadlings
 Strays, Ember Moth                                  │
                                                     ▼ outcompeted by
                                               APEX: Sixfold Wyrm, Eightfold Matron,
                                               Hive Colossus, the Old Tall
                                               (the Greyback Colossus is a giant grazer)
 Everything that dies ──► sinks back into the soil ──► PLANET
```

### Who hunts whom (live in matches)

| Predator | Prey | What players see |
|---|---|---|
| Ashfang pack | Spurlarks, Gravel Skinks, Mossback calves | Packs chase prey across lanes. Following a pack leads you to easy cores, and into the pack |
| Duskmane | Strider Cranes | Crane flocks scattering from the fog give away a Duskmane, and any players nearby |
| Hexmaw | Anything entering the mire | Mire edges become dangerous for everyone |
| Thornwasp swarm | Ember Moths | Moth swarms drift toward wasp nests and start chases |
| Glasslegs | Lantern Lizards | Lights going out in the Underroot mean a Glasslegs is hunting |
| Marrowhound | Carrion: dead creatures *and* dead players' dropped cores | Fights attract scavengers within 20 s |

### Herd and swarm reactions to battles

- **Flight:** combat within 15 m sends Passive and Skittish creatures running
  *away from the fight*. A fleeing herd is a signal everyone can read.
- **Alarm chains:** a Strider Crane taking off startles the nearest herd,
  which startles the next. A fight in one corner can ripple visible movement
  across half the map.
- **Gathering:** scavengers (Marrowhounds, Bone Harvestmen) move toward places
  where something died in the last 30 s.

### Overhunting

Players can't strip a region bare without consequences. This works alongside
the wildlife income cap in [09](09-wildlife.md#income-cap-keeps-pvp-central).
- If more than **10 creatures die in one region within 2 minutes**, that region
  becomes **Stressed** for 90 s:
  - prey there respawns 50% slower;
  - predators there become **hungry** and attack players on sight, whatever their usual temperament.
- In lore, the planet feels the loss and its creatures respond. In design,
  it's a soft brake on farming.

### Migrations and cycles

| Cycle | Map | Timing | Effect |
|---|---|---|---|
| **The Grey Migration** | Ashfall Crossing | Every 6 min, for 60 s | A river of herds crosses the map's centre and blocks the main route. Plan rotations around it |
| **Moth bloom** | Any at dusk | Once, as night falls | Ember Moths rise in clouds. Easy cores, but swarms reveal whoever stands in them |
| **Spawning of the Matron** | Underroot maps | Phase 3 | The Eightfold Matron's nest becomes active |
| **Bone gathering** | The Elder Ribs | Continuous | Harvestmen slowly carry bones to nests. A nest left alone for 5 min becomes a big core cache |

### The Murmur breaks the food web

Blighted creatures **don't eat, don't flee and don't hunt for food**. They
stand still together, move together and act for the Murmur. Where the
Blight is thickest, the food web collapses into **silence**: no birdsong, no
herds, only whispering. Sound designers should make the *absence* of nature's
noise the clearest sign that the Murmur is winning a region.

## The sky

| Feature | Description | Use |
|---|---|---|
| **The Grey Eye** | Greyborn's pale sun, never fully bright, seen through a constant thin haze | Sets the daytime palette: soft, grey-gold light |
| **The Lantern** | A single large moon with a faint amber glow, said to be the planet's own light reflected | Night-time light, with a warm amber tint |
| **The Fall-line** | A permanent scar across the sky: the burning trail the meteorite left. It glows faintly cyan-violet at night | Visible from every map. A constant reminder of the war |
| **Starfall** | Small shards still fall along the Fall-line now and then | Drives **Shard Storm** weather and Starshard veins |

**Mystery hook (unresolved on purpose):** the Fall-line points back toward
where the meteorite came from. On some nights, a **second faint light** can be
seen moving along it. Is something else coming?

## The Stillsea

The cold grey ocean around the Greyreach. It is **calm**, nearly waveless,
and very deep. Players don't fight at sea; it appears on coastal maps (the
Shard Reef, Shattered Coast) and in Memories.

| Sea creature | Description | Gameplay (coastal maps only) |
|---|---|---|
| **Shoal-lights** | Schools of small glowing fish moving in patterns | Ambient light. They scatter from the shore when a fight starts |
| **Tidecrawlers** | Eight-legged creatures that live where the tide comes in and out | Tier I critters on beaches |
| **Stillsong Whales** | Huge grey whales whose low song calms the sea | Ambient. When one sings, nearby Blight stops spreading for 20 s (a Planet Pulse event on coastal maps) |
| **The Deepmaw** | A creature so large it has only been seen as a shadow under the Stillsea | Never fought. Appears in a Memory of the Fall, rising to swallow meteor fragments |

**Blight in the sea:** near the Shattered Coast, the Stillsea glitters with
cyan-violet. The Murmur spreads slowly in water, so coastal maps are fronts
where the infection is held back by the sea itself.

---

## The food web, in one moment

Mid-match on Ashfall Crossing. A Mossback herd grazes on the southern plain.
An Ashfang pack has been shadowing it for a minute, low in the grass. A
Wildborn Thornrunner, heading for the central Hub, passes too close; the
nearest Mossbacks startle, and the whole herd begins to move north at a run.
The Ashfangs break cover and chase.

The herd thunders across the central plain, right through a fight between
two Bonespires. Both scatter. A Spurlark flock takes off in alarm, and across
the map, a Blightborn Verdant sees the birds rise and knows something is
happening in the south. Behind the stampede, one Mossback calf falls to the
Ashfangs. Within twenty seconds, a Marrowhound has arrived to scavenge, and
an Ash Vulture is circling.

None of this was scripted. It's the food web doing what it does, and every
player on the map read part of it.

## Ecology tuning

| Measure | Target per map |
|---|---|
| Wildlife creatures alive at once | 25–40 |
| Predator packs | 2–3 |
| Herds | 2–4 |
| Apex creatures | 0–1 (Phase 3+) |
| Share of creature movement driven by the food web (not by players) | About 40% |
| Times per match a stampede crosses a fight | 1–3 |

**Performance note:** creatures far from any player run on a simplified
simulation: herds move as a single group, and predator hunts resolve
abstractly. Full behaviour switches on within about 60 m of a player.

## Sky phenomena in depth

| Phenomenon | When | Description |
|---|---|---|
| **The Fall-line at night** | Every night | A thin, glowing cyan-violet line across the sky, brightest directly above the Starwound |
| **Starfall** | Rare nights; Starfall events | Small shards streak along the Fall-line and burn out, or land as Starshard |
| **The Lantern rising** | Every night | The amber moon rises in the south, over the Heartwood, as if the planet lights its own lamp |
| **The red streak** | Season 3 onward | A rust-red line beside the Fall-line: the Clamor's road |
| **Faint old streaks** | Clear nights | Barely visible lines in other directions: other falls, never explained ([48](48-beyond-the-sky.md#the-sky-as-a-map)) |
| **Ash halo** | Ash Turn | A soft ring around the Grey Eye from ash in the air |
| **Rime glow** | Rime Turn | Pale light on the northern horizon, from frost catching the Fall-line's glow |

## The Stillsea in depth

The Stillsea is called still because it nearly is. Waves are rare and small,
and on calm days the sea is a grey mirror stretching to the horizon. The
Stillsong Whales are said to keep it that way: their song is low enough to
be felt through the ground on the Shattered Coast.

Near the meteor's landing site, the sea changes. The water glitters cyan, and
shards of Blight drift in the shallows like ice. The Murmur spreads slowly in
water, so the sea has held it back for an age: a natural wall the planet
never had to build. In Season 6, when the Clamor's shard strikes the Shard
Reef, the sea boils for the first time anyone remembers.

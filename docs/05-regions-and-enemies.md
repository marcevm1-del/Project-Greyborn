# 05 — Regions, Enemies & Bosses

## World structure

An interconnected 2D map of **8 areas**: a tutorial, a hub, six Hue regions
(one per Hue) and a finale. Regions link to each other and to Lanternwick.
Echoes from one region open shortcuts in others.

```
                    [Kilnworks]────[Ochre Deeps]
                     (Crimson)       (Amber)
                        │               │
   [Dusk Archive]───[LANTERNWICK]───[Halcyon Fields]
     (Violet)           (hub)           (Aurum)
                        │               │
                  [Drowned Reach]───[Rotwood]
                     (Azure)        (Verdant)
                        │
                 [White Cathedral] (finale; opens after 6 Hearts or the "early" ending)
```

**Opening choice:** after the tutorial, both **Kilnworks** and **Rotwood** are
reachable. Those are opposite Hues, so the player's first commitment starts the
colour-identity theme right away.

**Restoration:** beating a region's guardian restores its Prism Heart. The
region then **regains colour** and changes: new NPCs, an enemy mix shifted
toward "calm" variants, new routes and the Echo gate.

## Areas

### Tutorial — Ashfall Orphanage
A Pale Church "foundling house" where Greyborn children are kept before being
"returned to White". The player wakes as one of them. A fire set by a Crimson
beast lets them escape. This area teaches the base kit, Flare/Rip and the first
Stain threshold. It ends with the player meeting Oriel at the first Lantern.
- Mini-boss: **Sister Candle**, a Bleached nun with a censer. She teaches white (unparryable) tells.

### Hub — Lanternwick
A dead lighthouse town on a grey sea cliff, home of the Lanternfolk. Services:
Grey Arts altar, apothecary (Mend), relic-smith, Residue ritualist (late game),
map-maker, quest board. Lanternwick fills with rescued Greyborn as you progress,
and its lighthouse lamp changes colour with each restored Heart.

### Kilnworks (Crimson)
A foundry-city whose forges never went out because their fire is alive.
Vertical, hot, with conveyor and furnace hazards.
- **Enemies:** Cinder Hounds (pack, fast), Slag Golems (slow, heavy), Kiln Priests (fire casters), Bleached Wardens.
- **Mini-boss:** *Forgemaster Hal*, a Hued Remnant who duels you for honour (non-lethal; win his respect for an ally).
- **Guardian:** **The Unbanked Ember**, a living blast-furnace with a dragon's spine. Three phases; the arena floor progressively melts.
- **Echo:** Ember Echo.

### Ochre Deeps (Amber)
Mines beneath a petrified forest. Dark, so light sources matter. Collapsing floors.
- **Enemies:** Burrowmaws (ambush from below), Geode Beetles (armoured; need parry to crack), Stone-Saint statues (only move when unobserved).
- **Guardian:** **Mother Strata**, a colossal mole-matriarch whose body *is* the level. You fight across her back.
- **Echo:** Stone Echo.

### Halcyon Fields (Aurum)
Endless wheat fields frozen in one golden afternoon. Open, bright, deceptive.
The Pale Church's strongest presence outside the Cathedral.
- **Enemies:** Scarecrow Knights, Sunwasps, Choir Heralds (buff other enemies with song), Bleached Lancers on horseback.
- **Guardian:** **Saint Aurelian, the Unsetting**, a hero of the old Aurum kingdom who absorbed the Hue to stop the sun setting. A duel with sword-and-light patterns.
- **Echo:** Gilt Echo.

### Rotwood (Verdant)
A forest that refuses to die, overgrown into rot. Poison mist and slow, sprawling paths.
- **Enemies:** Rootlings (swarm), Mycelial Hulks (spawn spores on death), Thorn Witches, Grafted Deer.
- **Guardian:** **The Gardener**, a kind giant who planted everything in this wood. Not hostile at first. The player can refuse the fight and take a peaceful alternate (harder) quest to restore the Heart.
- **Echo:** Root Echo.

### Drowned Reach (Azure)
A sunken capital. Before the Tide Echo it is explored only by its rooftops; after, by diving.
- **Enemies:** Drowned Knights (shield + tide parry), Lantern Eels, Weepers (Azure Husks whose crying floods rooms).
- **Guardian:** **Queen Maren of the Low Tide**, who drowned her city to save it. Phase 2 floods the arena and the fight becomes underwater.
- **Echo:** Tide Echo.

### Dusk Archive (Violet)
A library stuck in the last hour before night. Rooms loop and recur, and
corridors rearrange when unobserved.
- **Enemies:** Page-Moths, Archivists (rewind their own deaths once), Mirror Selves (copy your currently held Hue).
- **Guardian:** **The Last Reader**, which fights by replaying the player's previous boss fights (using their own recorded inputs as attack patterns).
- **Echo:** Dusk Echo.

### Finale — The White Cathedral
Blindingly white. Hues are suppressed: Saturation fades 3× faster and Rip only
works on special "Prism Choristers". It tests how well the player masters the
**base kit** (which is the whole point of the game's arc).
- **Final boss:** **Matriarch Ysolde Vane**, three phases. Phase 3 depends on the ending path (see [06](06-narrative.md)).

## Enemy design rules

1. Every enemy has **one readable Hue**, shown in its silhouette accents, its tells and its Wisp.
2. Every enemy has at least one **parryable** (Hue-flash) tell and, from mid-game on, one **unparryable** (white-flash) tell.
3. **Bleached** enemies (Pale Church) cannot be ripped. They exist to pressure
   the player when no Hue is available and to test the base kit.
4. Each region adds about **4 enemy types + 2 variants**, ~36 enemy types in total.
5. **Hued Husks** use the *player's own* ability set for that Hue. Fighting
   them doubles as a preview of what that Hue does.

## Boss design rules

- 2–3 phases; Flare at phase transitions so the player can Rip a **Prime Hue** mid-fight.
- Each boss has an **"intended" counter-Hue** (its opposite) but must be beatable hueless.
- Each guardian is a **tragic figure** who held their Hue to save something.
  This mirrors the player's own temptation.
- Every boss arena has a Lantern within 30 seconds of run-back.

---
type: creature
group: Four-legged
tags: [creature, four-legged]
number: 1
---
# Mossback Grazer

![[01-mossback-grazer.jpg]]

| Field | Value |
|---|---|
| Tier · temperament | II · Passive, herd of 4 |
| Habitat · maps | [[Rootwilds]] · [[Ashfall Crossing]] (south plain), [[Breathing Canopy]] |
| Affinity | [[Verdant]] (+25% cores) |
| Size | 2.4 m at the shoulder, 4.2 m long; a broad, slow herbivore with a mossy back like a hillside |
| Health · damage · speed | 900 · none · 3.5 m/s |
| Cores · respawn | 45 each · 90 s |
| Weak point | Soft throat under the jaw, front 90°, 0.18 × height |
| **Key mechanic** | Grazing on an enemy cell adds **5% uproot progress/s** (~20 s per cell). **Herding:** a player within 6 m behind the herd pushes it forward at 3.5 m/s |

**Behaviour**

| State | Trigger | Does |
|---|---|---|
| Graze | Default | Moves cell to cell at 0.8 m/s, head down; prefers cells with the most grass. Grazing an enemy-owned cell erodes it |
| Herded | A player within 6 m behind the herd's centre, inside a 90° cone | The herd walks away from the player at 3.5 m/s, keeping formation (2 m spacing) |
| Startle | Damage to any member | All four trot 15 m away, then resume grazing |
| Territorial (Bloom only) | A Calf harmed | Spec: Grazers attack for 45 damage every 1.2 s for 60 s |

**Counter-play:** herd it onto enemy nodes instead of killing it; it's worth more
alive as a slow siege tool. Defenders kill or push it back.

**Animation set:** graze loop, walk, trot, startle, herd-walk (head up, glancing back),
territorial charge (Bloom), death (kneels, lies down, moss spreads).

**Audio:** low lowing, tearing grass, heavy soft footfalls; a rumbling bellow when startled.

**Look:** grey-green hide, moss and small ferns growing on the back, wide flat horns
swept back. Grazed cells show bitten-down roots or Glaze.

**Blighted — Glassback Grazer (Spec):** grazing adds **Blight** progress (5%/s) on
neutral or Wildborn cells. Moss replaced by glass shards; its back glitters.

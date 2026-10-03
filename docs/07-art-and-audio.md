# 07 — Art & Audio Direction

## Visual rule #1: colour is reserved

The world is rendered in a **controlled greyscale** (warm-grey to cool-grey value
range). Saturated colour appears **only** for:
1. Hued creatures and Wisps (gameplay)
2. The player's held Hues and Stain (state)
3. Secrets, interactables and restored regions (navigation/reward)

UI, backgrounds and props **never** use saturated colour unless they carry one of
those meanings. This is a hard art-review rule.

## Style

- **2D hand-drawn**, ink-line characters over painterly, layered backgrounds
  (5–7 parallax layers).
- Reference mood: Käthe Kollwitz etchings, Gustave Doré illustrations, *Hollow
  Knight*'s silhouettes, *Gris*'s colour-as-narrative.
- **Silhouette first:** every enemy must read clearly as a pure black silhouette.
- Character scale: the player is ~96 px tall at 1080p, about 1/11th of screen height.

## Hue palette (gameplay colours)

| Hue | Primary | Accent | Glyph (accessibility) |
|---|---|---|---|
| Crimson | `#C8322B` | `#FF7A3D` | ▲ triangle |
| Amber | `#B8702A` | `#E3A857` | ■ square |
| Aurum | `#E4C04A` | `#FFF3B0` | ✦ four-point star |
| Verdant | `#4E8F3A` | `#A6D66B` | ❋ leaf/flower |
| Azure | `#2C6FB0` | `#7FC4F0` | ◆ diamond |
| Violet | `#6E3FA3` | `#C59BEF` | ◐ half-moon |
| White (Church) | `#F4F1EA` | `#FFFFFF` | ○ hollow circle |

Greyscale base range: `#1A1A1C` (deepest) → `#D9D6D0` (brightest non-white).

## Restoration visuals

When a region's Heart is restored, colour **floods outward from the Heart** in
a 15-second traversable sequence. After that, the region renders in a soft,
desaturated version of its Hue (~40% saturation), so gameplay colours still pop.

## Player character visual states

- **No Hue:** pure grey, faint cloth movement.
- **Holding a Hue:** that Hue flows through the blade and cloak trim.
- **Stain tiers:** Tinge (fingertips) → Mark (veins on arms) → Brand (face, eyes glow).
- **Residue:** permanent colour patches in 5 steps per Hue. Combined, they form
  a unique "map" of the player's choices. Painting these is a key asset task:
  6 Hues × 5 steps, layered.

## Animation targets

- Player: ~30 animation sets, 12–24 fps hand-drawn (with smears on attacks).
- Anticipation frames on every enemy attack: at least 12 frames at 60 fps for
  parryable tells and 18 for white tells (fairness budget).

## Audio direction

- **Music:** sparse, choral and string-based. Grey areas use solo instruments
  (cello, voice, music box). Each Hue adds its **instrument family** when
  present on screen, so the score literally "gains colour":
  - Crimson: taiko & low brass · Amber: bowed bass & stone percussion ·
    Aurum: bells & boy choir · Verdant: woodwinds & kalimba ·
    Azure: harp & glass harmonica · Violet: detuned piano & reversed strings.
- **Restored regions** get a full-ensemble version of their theme.
- **The White Cathedral** is near-silent: one sustained choir chord, which the
  final fight gradually breaks apart.
- **SFX:** each Hue has a distinct Rip sound, also used as an audio cue for
  colour-blind and low-vision players.
- **Stain audio:** a rising, filtered heartbeat layered with that Hue's
  instrument, so players can feel Stain without looking at the HUD.

## UI

- Minimal HUD: health (grey thread), Mend pips, Vessel orbs (with Saturation
  ring + Stain fill), Dross count. Everything else is diegetic or contextual.
- Menus look like a Lanternfolk journal: ink on grey paper. Restored Hues
  colour the journal's illuminated borders over the course of the game.

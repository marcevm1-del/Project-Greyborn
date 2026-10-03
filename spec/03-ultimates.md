# Spec 03 — Ultimate Forms

All 42 Ultimate Forms (7 lineages × 2 branches × 3), in numbers. Names and
concepts are from `gdd/31-evolution-branches.md`. Formulas are in
[Spec 01](01-conventions.md). **P** = the caster's Power at Level 20.

## Rules for every Ultimate

| Rule | Value |
|---|---|
| Unlock | At Level 20 (Stage 3), chosen from the three in the player's branch |
| First use | Ready immediately after the transformation ends |
| Cooldowns | 90–150 s (a typical match allows 2–4 uses after L20) |
| Cooldown reduction | Ultimates ignore cooldown reduction except Stillheart's Lullaby Resonance (−10%) |
| Visual change | Each Ultimate permanently changes the Ascendant's look (`gdd/31`) |
| Phase | Usable in any phase (no phase restriction, unlike Synergies) |
| Interrupts | Ultimates with a wind-up are interrupted by stun, Airborne or Drowse; not by stagger or silence once started |

**Level 20 Power for reference:** Titan 180 · Brawler 240 · Verdant 150 ·
Hollow 210 · Thornrunner 230 · Bonespire 260 · Stillheart 150.

**Structure damage** is listed separately where an Ultimate targets Hubs,
Enemy Cores or the Base Heart. Structure Health values are in [Spec 05](05-economy.md).

---

## Titan

| Branch | Ultimate | Area / range | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Aggression | **Colossus Step** | Self; each step a quake of radius 4 m | 6 s; a step every 0.7 s | Size ×1.25; −20% damage taken; each step staggers 0.3 s (no CC immunity triggered) | 30 + 0.3 × P per step | 100 s |
| Aggression | **Avalanche** | Line, 30 m | 3 s charge, unstoppable | Rolls through everything; knocks enemies aside | 100 + 1.0 × P to creatures; **600 + 3 × P to structures** | 110 s |
| Aggression | **Shatterfist** | Melee, 4 m | 0.6 s wind-up | If it hits a weak point, the weak point **breaks instantly** | 150 + 1.5 × P | 90 s · *flagged: may be too strong* |
| Tactical | **Fortress** | Self + 120° cone behind, 6 m | 6 s; can't move | Titan takes −50% damage; allies behind take −40% | — | 100 s |
| Tactical | **Fault Line** | Line, 25 m | 0.8 s to crack; lasts 8 s | Nodes on the Titan's side of the line **can't be captured or uprooted** by enemies; crossing the crack slows 50% | — | 120 s |
| Tactical | **Mountain's Patience** | Self; becomes a platform of radius 6 m, height 6 m | 3 s channel; lasts 10 s | Titan is invulnerable and can't act; allies can climb it for high ground; can end early | — | 130 s |

## Brawler

| Branch | Ultimate | Area / range | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Aggression | **Frenzy** | Self | 8 s | +40% attack speed; 20% lifesteal (subject to the healing cap) | — | 90 s |
| Aggression | **Wrecking Rush** | Line, 20 m | 1.5 s charge | Smashes through a structure; knocks enemies back 5 m | 80 + 0.8 × P to creatures; **800 + 3 × P to structures** | 110 s |
| Aggression | **Last Stand** | Self | 6 s | Can't drop below 1 Health; at the end, heals 15% max Health if alive | — | 120 s |
| Tactical | **Pin** | Melee, 3 m; any Stage | 3 s | Both the Brawler and the target are stunned; allies deal +20% damage to the pinned target | — | 100 s |
| Tactical | **Brawl Circle** | Ring, radius 10 m around self | 0.5 s to form; lasts 5 s | No one can enter or leave (blocks movement and dashes, not projectiles) | — | 110 s |
| Tactical | **Shove of the Storm** | Cone 90°, 10 m | 0.4 s wind-up | Knockback 15 m; interrupts channels | 60 + 0.6 × P | 90 s |

## Verdant

| Branch | Ultimate | Area / range | Timing | Effect | Damage / heal | Cooldown |
|---|---|---|---|---|---|---|
| Aggression | **Thornstorm** | Aura, radius 5 m | 6 s | Damage every 0.5 s to enemies nearby | 40 + 0.4 × P per second | 100 s |
| Aggression | **Strangling Grove** | Target Hub or Enemy Core within 20 m | 8 s | Trees grow through the structure; enemies near it rooted 0.5 s when it starts | **150 + 1.5 × P per second to the structure** | 120 s |
| Aggression | **Sap Frenzy** | Allies within 15 m | 10 s | Spends up to 300 team SAP; allies gain +3% Power per 30 SAP spent (max +30%) | — | 100 s |
| Tactical | **Overgrowth** | Every Vulnerable or neutral node within 15 m | Instant | **Captures them all** for the Verdant's team | — | 140 s |
| Tactical | **Living Wall** | Wall, 40 m long, placed up to 20 m away | 1.0 s to grow; lasts 15 s | Blocks movement and projectiles; reshapes paths | Wall Health 1,500 + 5 × P per 10 m segment | 120 s |
| Tactical | **Greenhome** | Circle, radius 12 m | 10 s | Allies heal 4% max Health/s (cap applies); enemies slowed 30% | — | 110 s |

## Hollow

| Branch | Ultimate | Area / range | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Aggression | **Collapse** | Circle, radius 6 m, up to 20 m away | 1.0 s delay | Pulls enemies toward the centre, then implodes | 200 + 2.0 × P at the centre, falling to 50% at the edge | 100 s |
| Aggression | **Hollow Out** | Target enemy Hub within 20 m | Instant | Hub Defense Level −3 (minimum 1) for 45 s | — | 120 s |
| Aggression | **Unmaking** | Next 3 basic attacks within 6 s | — | Each hit removes all shields and buffs from the target and deals +50% damage | +50% on 3 basics | 90 s |
| Tactical | **Event Horizon** | Circle, radius 10 m, up to 15 m away | 0.8 s delay | Pulls all enemies to the centre; stagger 0.5 s | 80 + 0.8 × P | 110 s |
| Tactical | **Silence of the Deep** | Circle, radius 15 m around self | 4 s | **No one** (allies included) can use abilities or Synergies; basic attacks allowed | — | 120 s |
| Tactical | **Step Between** | Allies within 10 m (and self) | 2 s channel | Teleports them all to any node the team holds | — | 150 s · *flagged: may be too strong* |

## Thornrunner

| Branch | Ultimate | Area / range | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Aggression | **Hunt Frenzy** | Self; whole map | 10 s | +30% speed; all enemies carrying 200+ cores revealed; +15% damage to them | — | 100 s |
| Aggression | **Gut the Hoard** | Melee, 3 m | 0.3 s | Target drops **50% of its carried cores** on the ground | 120 + 1.0 × P | 90 s |
| Aggression | **Endless Pursuit** | Self | 8 s | Takedowns reset all Q/E/R cooldowns | — | 110 s |
| Tactical | **Pack Hunt** | Team | 8 s | Resets Mark Prey; while the mark lasts, all allies see its weak point and move +20% toward it | — | 100 s |
| Tactical | **Thicket Trap** | 3 snares on nodes within 30 m | Hidden for 60 s | An enemy stepping on a snare is rooted 1.5 s and revealed 5 s | 40 + 0.4 × P | 110 s |
| Tactical | **Scent Trail** | Every cell the team holds | 20 s | Every enemy standing on the team's territory is revealed | — | 120 s |

## Bonespire

| Branch | Ultimate | Area / range | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Aggression | **Marrow Barrage** | 5 lances, 50 m | Over 3 s | Each can hit a weak point (×1.5, or ×2.0 if exposed) | 70 + 0.9 × P per lance | 100 s |
| Aggression | **Siege Spire** | Lance, 60 m | 3.0 s wind-up | Huge lance; ×3 damage to structures | 150 + 1.5 × P; **(150 + 1.5 × P) × 3 to structures** | 110 s |
| Aggression | **Rememberer's Aim** | Self | 8 s | Every hit counts as a weak-point hit (×1.5) | ×1.5 on all hits | 110 s |
| Tactical | **Bone Cathedral** | Self; turret range 30 m | 10 s; can't move | Fires at structures (priority) and enemies in range | 100 + 1.0 × P per second to structures; 40 + 0.4 × P per second to creatures | 120 s |
| Tactical | **Ossuary Maze** | 6 fences in a 15 m radius | 0.5 s to rise; lasts 10 s | Reshapes an area into a maze | Fence Health as Ossuary | 120 s |
| Tactical | **Fossilise** | Target enemy within 20 m | 0.4 s | **Stun 2 s, not reduced by Tenacity**; the target's allies can break the stone early (Health 300 + 2 × P) | — | 110 s |

## Stillheart

| Branch | Ultimate | Area / range | Timing | Effect | Damage | Cooldown |
|---|---|---|---|---|---|---|
| Aggression | **Killing Frost** | Cone 70°, 15 m | 0.5 s wind-up | Freezes enemies (stun 1.5 s); the first hit on a frozen target shatters the ice for bonus damage | 150 + 1.5 × P on shatter | 100 s |
| Aggression | **Rime March** | Self; ice 4 m around | 8 s | Enemy nodes whose core cell the ice touches become **Vulnerable** for 15 s | — | 110 s |
| Aggression | **Avalanche Heart** | Circle, radius 10 m around self | 1.0 s wind-up | Explosion of cold; slows 50% for 2 s; **Stillheart loses 30% of current Health** | 300 + 2.5 × P | 100 s |
| Tactical | **The Deep Sleep** | Circle, radius 15 m, up to 15 m away | 6 s | **All capture and uproot progress inside is frozen** | — | 130 s |
| Tactical | **Winter's Wall** | Wall, 30 m long | 0.8 s to rise; lasts 8 s | Blocks all movement and projectiles | Wall Health 1,200 + 5 × P per 10 m segment | 110 s |
| Tactical | **Long Dream** | Allies within 15 m | 2 s | All enter Hibernate, then heal 20% max Health | Heal 20% max Health | 150 s |

---

## Balance flags

| Ultimate | Risk | First test |
|---|---|---|
| **Shatterfist** | One-hit weak-point break | Raise wind-up to 0.8 s or cooldown to 110 s if win rate > 53% |
| **Step Between** | Whole-team teleport decides Phase 4 fights | Raise channel to 3 s; limit to nodes held for 30 s+ |
| **Overgrowth** | Mass capture can swing Territorial Influence near time | Cap at 4 nodes |
| **Fossilise + Drowse** (with Stillheart) | 3+ s of chained control | CC immunity window (Spec 01) should cover it; verify |
| **Long Dream** | Undoes an enemy's winning fight | Watch reversal rate; raise cooldown if needed |

## Ultimate tuning targets

| Measure | Target |
|---|---|
| Pick rate per Ultimate within its branch | ≥ 20% |
| Win-rate spread across a lineage's six Ultimates | ≤ 3% |
| Average uses per match (per Ascendant reaching L20) | 2–3 |
| Matches decided within 10 s of an Ultimate | Under 25% |

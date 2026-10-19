# Competitor & AI-Development Research

Deliverables 4–5: **Research Report** and **Comparison Matrix**.
Researched 2026-10-19. Every factual claim links to its source. Where a
source could not be opened during the audit, the claim is marked
**[unverified]**. Revenue and player figures are as reported by the cited
outlet, not independently checked.

---

## 1. How the examples were classified

| Category | Meaning |
|---|---|
| **AI-generated** | Built mostly by prompting a text-to-game tool |
| **AI-assisted** | Code written largely by an AI coding assistant, directed by a person |
| **AI assets** | Traditional development with AI-generated art/audio |
| **Traditional** | No meaningful AI in production (used for gameplay lessons) |

---

## 2. AI-assisted and AI-generated development

### fly.pieter.com (Pieter Levels, 2025) — AI-assisted, browser 3D

- A free browser "MMO flight sim made with AI", first built in about 30
  minutes to 3 hours with AI tools (accounts differ), in vanilla HTML/JS
  ([404 Media, 5 Mar 2025](https://404media.co/this-game-created-by-ai-vibe-coding-makes-50-000-a-month-yours-probably-wont);
  [DEV Community](https://dev.to/promptway/he-built-a-flight-simulator-in-three-hours-and-hit-1m-a-year-in-17-days-then-it-went-to-zero-1b1l)).
- Revenue came from in-game ad slots, branded blimps and a $29.99 jet; it
  was reported at $87,000 MRR around day 17, and the DEV article reports it
  later fell to $0/month as attention faded (same sources).
- **Lessons for Greyborn:** (1) a browser 3D game can be built fast with AI
  and reach players with no install; (2) the creator's existing audience,
  not the code, drove the success; (3) one-off virality isn't a business.
  AI shortens the build, it does not replace distribution.

### Vibe Jam (2025, 2026) — AI-assisted browser games at scale

- Annual jam hosted by Pieter Levels: **at least 90% of code written by
  AI**, playable on the web, free, no login, no loading screens; any
  engine, **three.js recommended**; multiplayer preferred. Over 1,000
  entries in 2025; 945 listed for 2026; sponsors include Cursor, Bolt.new
  and Tripo AI ([vibejam.com/2026/press](https://vibejam.com/2026/press)).
- **Lessons:** the jam's rules describe Greyborn's current stack almost
  exactly. Its entry pool is the best place to study what small AI-built
  three.js multiplayer games achieve, and what they don't (most are small,
  short-session games). **[Recommendation]** browse its winners before
  M-Online for netcode patterns.

### Rosebud AI — AI-generated (text-to-game)

- Browser tool that produces playable games from prompts and iterates by
  description; the reviewer warns it won't produce a hit from one prompt and
  projects can get messy ([PCWorld, 10 Jul 2026](https://www.pcworld.com/article/3152178/i-built-my-own-game-with-the-help-of-ai.html)).
- **Lesson:** prompt-to-game tools suit throwaway prototypes. Greyborn is
  already past that stage; its tested, structured codebase is worth more
  than a regenerated one. **Do not migrate.**

### This project itself — AI-assisted

Greyborn's own repository is a strong example of AI-assisted development:
a deterministic simulation, a Monte Carlo balance simulator and automated
browser playtests were built in about two days (commit history 2–3 Oct
2026). Its weakness is the same as its strength: AI writes design
documents as easily as code, so the design grew far faster than anyone
could test it.

---

## 3. Comparable commercial games (gameplay lessons)

### Pokémon UNITE (TiMi / The Pokémon Company, 2021) — Traditional

The closest existing design to Greyborn's core loop.

- 5v5, **10-minute** matches. Players defeat wild Pokémon and opponents to
  collect **Aeos energy**, carry it to an enemy goal zone and **channel to
  score; the channel takes longer the more you carry**. Points double in the
  final two minutes ([Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Unite_Battle)).
- Pokémon **level and evolve during the match**, and players choose
  between moves at two points ([Serebii](https://serebii.net/pokemonunite/mechanics.shtml)).
- **Lessons:**
  1. *Carry risk works* at mass-market scale, and the tense moment is the
     **channel at the objective**, not the walk. Greyborn converts at home;
     consider making the Hub field-conversion channel the contested,
     exciting moment.
  2. *Short matches.* 10 minutes with a doubled-score final stretch keeps
     comebacks alive without long phases.
  3. *Two choice points* in a match are enough to feel like "building"
     your creature. Greyborn's L10 branch + L20 Ultimate is the same shape.

### Evolve (Turtle Rock / 2K, 2015) — Traditional

- Monster-evolution PvP. Sold 2.7 million copies, but active development
  ended in October 2015; servers closed in July 2023. Cited reasons include
  aggressive DLC, poor balance at higher evolution stages, slow patches,
  little content variety, weak onboarding and no skill-based matchmaking
  ([Game Design Skills](https://gamedesignskills.com/game-design/why-did-evolve-fail/)).
- **Lessons:** evolution stages are hard to balance (snowball and
  "useless late form" problems both appeared). Onboarding and matchmaking
  matter as much as the core idea.

### Battlerite (Stunlock Studios, 2017) — Traditional

- Small-studio, highly regarded team arena brawler. In July 2019 the studio
  said player numbers had declined for a while and that "retaining them has
  always been our biggest challenge", and wound development down
  ([PC Gamer](https://www.pcgamer.com/au/due-to-declining-player-numbers-battlerites-next-season-may-be-its-last/)).
- **Lesson:** good combat is not enough to sustain a team PvP game. Small
  teams can't outspend population decline.

### Concord (Firewalk / Sony, 2024) — Traditional

- Taken offline about two weeks after launch (6 Sep 2024) with refunds;
  Steam peak of 697 concurrent players
  ([TechRadar](https://www.techradar.com/gaming/concord-is-going-offline-just-two-weeks-after-it-launched-with-sales-stopping-and-players-getting-refunds)).
- **Lesson:** even a major publisher can't make an online-only team game
  work without players. Bots and solo value are insurance.

### Supervive (Theorycraft Games, 2025) — Traditional

- MOBA–battle royale by ex-Riot veterans. 1.0 in July 2025; shutdown
  announced for 25 Feb 2026; peak ~400 concurrent on SteamDB; "could not
  hold player attention" ([KitGuru](https://www.kitguru.net/gaming/joao-silva/theorycraft-games-shutting-down-supervive-just-five-months-after-1-0-launch/)).
- **Lesson:** MOBA-adjacent games are a crowded, unforgiving genre. A solo
  project should not compete there head-on.

### .io games (Agar.io, Slither.io and successors) — Traditional

- Browser games about **growing by eating** and losing it all on death;
  instant play, short sessions, bots fill empty servers. **[unverified]**
  the Wikipedia page could not be opened during the audit; the genre
  description is general knowledge
  ([background](https://www.gamewatcher.com/the-io-games-that-started-it-all-from-agar-io-to-the-latest-games-at-poki)).
- **Lesson:** Greyborn's "grow from tiny to huge, drop it when you die"
  fantasy is the .io fantasy with depth. Web portals (Poki, CrazyGames)
  are a real distribution channel for exactly this kind of game.

### Open-source MOBA prototypes — reference only

- A Godot 3 MOBA prototype exists on GitHub
  ([metanoia83/Godot_3D_MOBA_Prototype](https://github.com/metanoia83/Godot_3D_MOBA_Prototype))
  **[unverified: not opened]**. No open-source project found during the
  audit is a better foundation than Greyborn's own code.

---

## 4. Comparison matrix

| Game or Project | Genre | Development Approach | Relevant Systems | What We Can Learn | Apply to Our Game? | Evidence |
|---|---|---|---|---|---|---|
| Pokémon UNITE | Team MOBA-lite | Traditional | Carry-and-channel scoring; in-match evolution; 10-min matches; 2 move choices | The contested moment is the channel at the objective; short matches | **Yes**: shorter match, contested Hub conversion, two choice points | [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Unite_Battle), [Serebii](https://serebii.net/pokemonunite/mechanics.shtml) |
| Evolve | Asymmetric monster PvP | Traditional | Monster evolution stages | Late-stage balance and onboarding failures | **Yes** (as warning): test Stage 3 balance early; short tutorial | [GDS](https://gamedesignskills.com/game-design/why-did-evolve-fail/) |
| Battlerite | Team arena brawler | Traditional, small studio | Readable skill-shot combat | Small team PvP can't sustain population | **Yes**: bots-first | [PC Gamer](https://www.pcgamer.com/au/due-to-declining-player-numbers-battlerites-next-season-may-be-its-last/) |
| Concord | Hero shooter | Traditional, AAA | Online-only team PvP | No players = no game | **Yes**: never online-only at launch | [TechRadar](https://www.techradar.com/gaming/concord-is-going-offline-just-two-weeks-after-it-launched-with-sales-stopping-and-players-getting-refunds) |
| Supervive | MOBA / BR | Traditional, veteran studio | MOBA-adjacent PvP | Retention is the killer | **Yes**: don't fight MOBAs head-on | [KitGuru](https://www.kitguru.net/gaming/joao-silva/theorycraft-games-shutting-down-supervive-just-five-months-after-1-0-launch/) |
| fly.pieter.com | Browser MMO flight | AI-assisted | three.js-style browser 3D, instant play | AI speeds builds; audience drives revenue | **Partly**: browser instant-play; plan distribution | [404 Media](https://404media.co/this-game-created-by-ai-vibe-coding-makes-50-000-a-month-yours-probably-wont), [DEV](https://dev.to/promptway/he-built-a-flight-simulator-in-three-hours-and-hit-1m-a-year-in-17-days-then-it-went-to-zero-1b1l) |
| Vibe Jam entries | Mixed browser games | ≥90% AI code | three.js, web, multiplayer | What AI-built web multiplayer can do | **Yes**: study winners' netcode | [vibejam.com](https://vibejam.com/2026/press) |
| Rosebud AI | Text-to-game | AI-generated | Prompt-to-prototype | Good for throwaway ideas only | **No** | [PCWorld](https://www.pcworld.com/article/3152178/i-built-my-own-game-with-the-help-of-ai.html) |
| .io games | Browser growth brawlers | Traditional | Grow by eating, lose on death, bot fill | Instant play, short sessions, portal distribution | **Yes** | [unverified] |
| Greyborn (now) | Team PvP evolution & territory | AI-assisted | All of the above, designed; 2 lineages built | — | — | This repo |

---

## 5. Research conclusions

1. **The core idea has a proven cousin** (Pokémon UNITE) and a proven
   audience fantasy (.io growth). That is good news for the loop.
2. **The business shape is the danger**, not the design: team PvP that
   needs a population has killed far larger studios in the last two years.
3. **AI tooling fits the current stack**: browser three.js is the default
   of the AI-assisted game community, and AI 3D tools (Tripo, Meshy) are
   sponsoring that scene, which keeps the asset pipeline cheap.

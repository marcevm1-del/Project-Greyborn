# 09 — Open Questions & Iteration Log

This doc tracks unresolved decisions and the history of design changes.
**Update it every iteration.**

## Assumptions made in v0.1 (please confirm or override)

The repository had no existing concept, so everything below was inferred
from the name *Greyborn*:

- [ ] **Genre:** 2D action-metroidvania with soulslike combat. *(Alternatives: 3D action RPG, top-down ARPG, tactics RPG, roguelite.)*
- [ ] **Core premise:** a hueless protagonist who steals colour/soul-magic from enemies.
- [ ] **Tone:** melancholic dark fantasy, not grimdark.
- [ ] **Protagonist:** fixed character ("Grey"), not a custom character creator.
- [ ] **Scope:** small indie team, PC first.

## Open design questions

1. **Hueless run viability.** Is a full no-Hue run fun, or just a speedrunner novelty? Balance target TBD after M1.
2. **The Seventh Hue.** Is there a hidden colour outside the wheel (e.g. "Grey" itself as a Hue, or an "Ultraviolet" no one can see)? This could be a DLC hook or a secret-ending mechanic.
3. **Co-op?** A second Greyborn (Tamsin) as couch co-op could suit the theme but would hugely increase scope. Probably no.
4. **Should Residue be removable at all?** Removal softens the stakes; no removal could make experimentation feel bad. Current answer: removable but expensive.
5. **Hued Remnant reputation:** a simple 3-state per enclave (hostile/neutral/friendly), or a numeric value?
6. **Map style:** hand-drawn by the map-maker NPC (Hollow Knight-style buy-the-map) or automatic?
7. **Should a Lantern rest take your held Hue?** The prototype says yes, so you can't carry a Hue between rests for free. Confirm in playtests that this doesn't feel like a tax.
8. **Knight frontal guard:** halving blade damage from the front pushes players toward parries. Is this too punishing for players who are new to parrying?
9. **Name check:** confirm that "Greyborn" is clear on trademark and Steam before branding work.

## Iteration log

| Version | Date | Changes |
|---|---|---|
| v0.1 | 2026-10-02 | Initial design bible: vision, world & lore, core gameplay (Hue / Stain / Residue), progression, regions & enemies, narrative & endings, art/audio, production roadmap. |
| v0.2 | 2026-10-02 | Playable **M0 prototype** (`prototype/`): base kit, Flare/Rip, Crimson & Azure Hues, Saturation, Stain tiers, Vices, Overcolour/Husking, Residue, Lantern, 3 enemy types, playtest log. Greedy-bot balance pass: holding Stain tuned from +1.0/s to +0.6/s because greed caused Husking within ~1 minute. |

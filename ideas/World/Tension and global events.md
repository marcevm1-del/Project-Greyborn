---
type: world
tags: [world, systems]
---
# Tension and global events

| Rule | Value |
|---|---|
| Regions | 5 per standard map (one per Hub) |
| Range | 0–100 per region |
| Builds from | Phase 2; events fire from Phase 3 |
| At 100 | An event fires in that region; Tension resets; region cooldown 90 s |
| Global limit | One event at a time; at most one every 60 s |

| Factor | Tension per second |
|---|---|
| Borders touching in the region | +0.2 |
| Each fight within 15 m of a border | +1.0 |
| Stage 2 creature nearby | ×1.5 on its fight's rate |
| Stage 3 creature nearby | ×2 |
| [[The Old Tall]] within 30 m | ×3 on everything |
| No fighting for 30 s | −0.5 (decay) |

**Audio cue (Spec):** a low drone begins at 75 Tension in that region.

| Deck | When | Events (weight · duration · effect) |
|---|---|---|
| Neutral | TI within 5% | Rootquake (25% · 30 s · all nodes in the region Vulnerable) · Marrow Storm (20% · 20 s · weak points exposed from any angle) · Stampede (20% · 30 s · staggers +50%, Momentum ×2) · SAP Surge (20% · first team to spend 200 SAP gets ×3 SAP for 60 s) · Core Bloom (15% · 400 loose cores at the region's centre) |
| Planet Pulse | Wildborn behind by > 5% (60%, else neutral) | Heartquake (40% · 20 s · Blightborn nodes Vulnerable, uproot at half time) · Healing Bloom (40% · 15 s · Wildborn regenerate 3%/s) · The Old Tall wakes (20% · 45 s · hunts Blightborn) |
| Murmur Surge | Blightborn behind by > 5% (60%, else neutral) | Shard Rain (40% · 15 s · 150/s to Wildborn structures, final) · Thousand Whispers (40% · 10 s · all Wildborn revealed map-wide) · Blighted Wyrm (20% · 45 s · hunts Wildborn) |

**Event resource gain:** where an event pays out, each team's share is boosted +1% per
cell it holds in that region, max +30%.

## Event presentation (Proposal)

| Event | Warning | Visual | Audio |
|---|---|---|---|
| Rootquake | 3 s ground tremor | Ground heaves; roots and Glaze tear loose | Deep groan |
| Marrow Storm | Bone dust rises | Wind full of bone dust; every weak point glows through it | Howling wind, clicking bone |
| Stampede | Herds bellow | Every herd in the region bolts | Thundering hooves |
| SAP Surge | A geyser cracks open | An amber geyser; the claiming team's colour rings it | A rush like a fountain |
| Core Bloom | Light pulses from the ground | 400 cores burst up and scatter | A rising chime |
| Heartquake | The planet's heartbeat | Blight cracks open in the region | A deep heartbeat felt in the controller |
| Healing Bloom | Petals fall | Amber flowers bloom under Wildborn | Soft choral swell |
| Shard Rain | Glitter in the sky | Shards fall on Wildborn structures (decals 1.0 s ahead) | Glass whistling, then shattering |
| Thousand Whispers | Whispers rise | Every Wildborn outlined in violet for Blightborn | A rising chorus of whispers |

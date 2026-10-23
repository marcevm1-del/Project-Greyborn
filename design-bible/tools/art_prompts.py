"""Prompts used to generate the concept art in design-bible/img/.

Images were generated with Google Gemini (gemini-3.1-flash-image) through the
Figma MCP image tool. Each prompt is STYLE + the creature's own description,
taken from the bestiary (Parts 3-6). Edit a description here, regenerate the
image, and keep the file name (the slug) the same so the docs keep linking.
"""

CREATURE_STYLE = (
    "Creature concept art for a dark fantasy strategy game, full-body three-quarter "
    "side view of a single creature on a plain soft grey studio background, small "
    "grey stone at its feet for scale. Painterly realism, believable heavy anatomy, "
    "muted grey-green and stone palette, glow only where described, no text, no "
    "people, no frame. "
)

BLIGHT = "Its body is partly turned to glossy black meteor glass with cyan-violet veins and violet eyes. "
CLAMOR = ("Crude, lumpy, asymmetrical, crusted rust-red and ash-black hide with coal-orange glow "
          "in the cracks and steam rising; frantic. ")
HUSHED = ("A colossal creature made entirely of clear and smoky meteor glass, perfect and mechanical, "
          "three cyan crystal hearts glowing through the glass, no eyes, cold violet light. ")

# (slug, number, name, description)
CREATURES = [
    # Four-legged
    ("01-mossback-grazer", 1, "Mossback Grazer", "A broad, slow herbivore 2.4 m at the shoulder with grey-green hide, a back covered in moss and small ferns like a hillside, wide flat horns swept back."),
    ("02-ashfang", 2, "Ashfang", "A lean grey wolf-like canid 1.3 m at the shoulder, fur matted with volcanic ash, a stiff ash-crusted mane ridge, pale yellow eyes, ears flat, low hunting stance."),
    ("03-stonehide-ox", 3, "Stonehide Ox", "A huge rock-plated bovine 3.6 m at the shoulder, stone plates over grey hide with moss in the cracks, horns like broken stone columns."),
    ("04-glimmerfox", 4, "Glimmerfox", "A slender small fox with a pale grey coat that has a pearly shimmer, amber eyes, half of its body fading to transparent."),
    ("05-marrowhound", 5, "Marrowhound", "A long-jawed hyena-like hound 1.5 m at the shoulder, pale hide over bone plates, a faint warm core light glowing through its belly."),
    ("06-duskmane", 6, "Duskmane", "A big cat 1.8 m at the shoulder with dark grey-violet fur and a mane that drifts like smoke, eyes catching the light."),
    ("07-burrowtusk", 7, "Burrowtusk", "A boar-like digger with bristly brown-grey hide caked with soil, wide spade-shaped tusks, tiny eyes."),
    ("08-greyback-colossus", 8, "Greyback Colossus", "A mountain-sized grazer, 22 m at the shoulder; grey fur matted with ash and grass, its back a meadow with boulders, tusks like fallen trees, birds riding on it. Seen from low, enormous scale."),
    ("45-mossback-calves", 45, "Mossback Calves", "A tiny cute young Mossback Grazer calf 1 m tall with a soft fuzz of moss on its back, stubby horn buds."),
    ("49-cinder-salamander", 49, "Cinder Salamander", "A long salamander 3 m long, slick black skin with glowing orange lava veins."),
    ("53-heartwood-elk", 53, "Heartwood Elk", "A gigantic sacred elk 11 m at the shoulder with antlers like living trees with leaves and white flowers, warm amber light glowing under its fur, serene."),
    # Two-legged
    ("09-strays", 9, "Strays", "A wild Kith, 1 m at the shoulder: a large head with big amber eyes and long mobile ears, slender limbs, four long fingers with blunt claws, grey moss-flecked skin with soft bark plates on the shoulders and spine, a short expressive tail; curious and twitchy. An elder beside it has a grey muzzle and thick cracked plates."),
    ("10-strider-crane", 10, "Strider Crane", "A tall wading crane 1.8 m tall on long black legs, grey-blue plumage, crest lifted in alarm."),
    ("11-rootwalker", 11, "Rootwalker", "A 3.2 m tree-like biped guardian with root feet, bark skin, mossy shoulders, branches for arms, a calm knot-hole face."),
    ("12-knucklebrute", 12, "Knucklebrute", "A 3.4 m gorilla-like brawler with grey hide and huge stone knuckles, chest out in challenge."),
    ("13-hollowmonk", 13, "Hollowmonk", "A gaunt 2.6 m tall biped draped in hanging moss like a monk's robe, hooded head, long thin fingers, meditative."),
    ("14-spurlark", 14, "Spurlark", "A 1.2 m sprinting ground bird with long spurred legs, grey-brown feathers, mid-run."),
    ("15-bonewright", 15, "Bonewright", "A lanky 3 m biped wearing bones like armour, beside a 2.5 m totem stack of skulls and vertebrae with a faint amber glow inside."),
    ("16-the-old-tall", 16, "The Old Tall", "A towering ancient biped 16 m tall with very long arms and a lichen-hung body, walking slowly, seen from low with tiny trees at its feet for scale."),
    ("44-seedcaller", 44, "Seedcaller", "A slender 2.2 m biped with long fingers and seed pods hanging from its arms, green sprouts growing where it steps."),
    ("47-drift-owlbear", 47, "Drift Owlbear", "A 3.8 m white-furred owlbear with a hooked beak and bear shoulders, rising out of a snow drift."),
    ("50-ash-vulture", 50, "Ash Vulture", "A grey ash-dusted vulture with a 3.2 m wingspan, bare wrinkled neck, perched with wings half open."),
    ("52-shard-gull", 52, "Shard Gull", "A seagull 0.6 m tall with pale grey plumage, tiny glowing cyan meteor shards stuck in its nest of twigs beside it."),
    # Six-legged
    ("17-sixhorn-ram", 17, "Sixhorn Ram", "A six-legged mountain ram 1.7 m at the shoulder with three pairs of curled horns, shaggy grey wool."),
    ("18-trundleback", 18, "Trundleback", "A six-legged armoured tortoise 5 m long with bone-white shell plates in a hexagon pattern, soft amber-veined underside."),
    ("19-lantern-lizard", 19, "Lantern Lizard", "A small six-legged lizard 1.2 m long with a glowing amber throat sac."),
    ("20-gravel-skink", 20, "Gravel Skink", "A small six-legged skink 0.9 m long with pebbly grey scales like gravel, half burrowed in sand."),
    ("21-hexmaw", 21, "Hexmaw", "A swamp ambusher: a round toothy maw 3 m across rising out of black mud, with six long tentacle-legs reaching out."),
    ("22-sapdrinker", 22, "Sapdrinker", "A six-legged tick-like creature 2.4 m long with a glassy translucent abdomen filled with glowing amber sap."),
    ("23-rimeback-stag", 23, "Rimeback Stag", "A six-legged stag 2 m at the shoulder with frost and icicles on its antlers, pale grey-blue coat."),
    ("24-sixfold-wyrm", 24, "Sixfold Wyrm", "A colossal six-legged serpent-dragon 38 m long with a spade-shaped head, bursting out of the ground in a spray of rock."),
    ("41-cairnshell", 41, "Cairnshell", "A six-legged hermit creature 1.5 m tall carrying a large mossy boulder as its shell."),
    ("46-emberbark", 46, "Emberbark", "A 3.2 m six-legged creature armoured in thick charred bark plates with faint ember glow between them."),
    ("51-tidal-strider", 51, "Tidal Strider", "A 5 m tall creature on six long thin legs wading in shallow sea, body 3 m across like a barnacled shell."),
    # Eight-legged
    ("25-weavemother", 25, "Weavemother", "A large spider 2.4 m tall with a 7 m legspan, grey-banded velvety body, dewy webs behind it."),
    ("26-threadlings", 26, "Threadlings", "A swarm of tiny grey spiderlings scattering across the ground over a thin web."),
    ("27-stiltwalker", 27, "Stiltwalker", "An 8 m tall creature on eight very thin stilt legs with a small body 4 m across high above the grass."),
    ("28-mire-scuttler", 28, "Mire Scuttler", "A crab-like eight-legged creature 2.4 m wide with huge armoured front claws held as a shield."),
    ("29-glasslegs", 29, "Glasslegs", "A translucent glassy spider-like creature 1.6 m tall with 4 m legspan, almost invisible, in a dark cave."),
    ("30-tendril-crawler", 30, "Tendril Crawler", "A land-octopus 2.2 m tall with eight long tentacles reaching 6 m, mottled grey-green, in a swamp."),
    ("31-bone-harvestman", 31, "Bone Harvestman", "A harvestman spider 2 m tall on long thin legs carrying fossil bones to a nest of bones."),
    ("32-eightfold-matron", 32, "Eightfold Matron", "A colossal spider queen 9 m tall with 26 m legspan in a cave, egg sacs on her back, tiny spiderlings around her."),
    ("48-hoarfrost-mites", 48, "Hoarfrost Mites", "A patch of bright white frost on stone crawling with tiny glinting white mites, close-up."),
    # Insects
    ("33-ember-moth", 33, "Ember Moth", "A swarm of small grey moths whose wings glow ember-orange, close-up on one moth."),
    ("34-siege-beetle", 34, "Siege Beetle", "A horned heavily armoured beetle 4 m long, battering-ram horn, scratched shell."),
    ("35-rootworm", 35, "Rootworm", "A fat pale segmented worm emerging from fresh roots in the soil, close-up."),
    ("36-thornwasp", 36, "Thornwasp", "A large wasp with thorn-like barbs along its body and a papery grey nest behind it."),
    ("37-hush-cicada", 37, "Hush Cicada", "A grey-green cicada with faintly glowing wing veins, close-up on bark."),
    ("38-marrow-mantis", 38, "Marrow Mantis", "A bone-coloured praying mantis 3.2 m tall when raised, scythe arms poised."),
    ("39-sapback-aphids", 39, "Sapback Aphids", "A cluster of plump green aphids with glowing amber sap beads on their backs on a stem, close-up."),
    ("40-hive-colossus", 40, "Hive Colossus", "A 14 m walking termite-mound creature on six stubby legs, its body a tall earthen hive with holes and four armour plates."),
    ("42-clashhorn-beetles", 42, "Clashhorn Beetles", "Two beetles 2.2 m long with long forked horns locked together in a duel."),
    ("43-lumen-bees", 43, "Lumen Bees", "A swarm of bees that glow soft gold, close-up on one bee over a flower."),
    ("54-amber-beetles", 54, "Amber Beetles", "A small dark beetle with a single glowing bead of amber sap on its back, close-up."),
    # Sea
    ("sea-shoal-lights", None, "Shoal-lights", "Thousands of tiny glowing fish in dark shallow sea water at night, scattering."),
    ("sea-tidecrawlers", None, "Tidecrawlers", "Palm-sized grey crabs on a pebbled beach, a group of four."),
    ("sea-stillsong-whale", None, "Stillsong Whales", "A huge grey whale's back and spout breaking the surface of a calm grey sea far out."),
    ("sea-the-deepmaw", None, "The Deepmaw", "A vast dark shadow rising under a glowing meteor-glass reef at night, an enormous mouth opening."),
    # Clamor
    ("clamor-shriekers", None, "Shriekers", CLAMOR + "A 0.6 m six-legged eyeless creature that is all mouth, screaming, a swarm of them."),
    ("clamor-spore-kites", None, "Spore Kites", CLAMOR + "A flat membranous flying insect with a 2 m wingspan riding hot air, trailing a rust-coloured spore cloud."),
    ("clamor-ashmouths", None, "Ashmouths", CLAMOR + "A gaunt 2.4 m two-legged creature with jaws that open far too wide, lumps of crust on its back."),
    ("clamor-kindlers", None, "Kindlers", CLAMOR + "A quick 1.2 m eight-legged spider-like creature with a glowing orange abdomen."),
    ("clamor-scald-hulks", None, "Scald Hulks", CLAMOR + "A massive 3.6 m four-legged hulk with a thick crust and coal-glow cracks, leaving a burning trail."),
    ("clamor-ventborn", None, "Ventborn", CLAMOR + "A 3 m two-legged warrior in full crust armour with a crust shield, crawling out of a steaming vent."),
    ("clamor-the-roar", None, "The Roar", CLAMOR + "A colossal four-legged beast 20 m tall and 45 m long with a ridge of six glowing roaring vents along its back, seen from low."),
    # Hushed Answers
    ("hushed-glass-range", None, "The Glass Range", HUSHED + "A 20 m humanoid titan like a walking mountain range of glass, fists raised."),
    ("hushed-shatterer", None, "The Shatterer", HUSHED + "A 14 m knuckle-walking brute with huge geode fists."),
    ("hushed-lattice-grove", None, "The Lattice Grove", HUSHED + "A walking forest of crystal trees 12-16 m tall moving together on root-legs."),
    ("hushed-unspoken", None, "The Unspoken", HUSHED + "An almost invisible creature, only a flickering faint violet outline of a tall hunched hunter in mist."),
    ("hushed-endless-pursuit", None, "The Endless Pursuit", HUSHED + "A long glittering insect-like runner 12 m tall and 30 m long, mid-sprint."),
    ("hushed-archive", None, "The Archive", HUSHED + "A stationary cathedral of glass bones 18 m tall, three reliquaries on its back holding frozen creatures."),
]

LANDSCAPE_STYLE = (
    "Painterly fantasy landscape key art for a strategy game, wide establishing shot, "
    "misty atmosphere, believable scale, muted grey-green, grey-gold and stone-grey world "
    "palette, glow only where described, no text, no people, no UI. "
)

# (slug, region, description)
REGIONS = [
    ("region-heartwood", "The Heartwood", "A forest of impossibly old vast trees whose roots are hills, amber lakes of glowing SAP, gold light and mist, an elk drinking at a lake."),
    ("region-rootwilds", "Rootwilds", "Endless breathing forest of grey-green giant trunks, dawn mist exhaling from the canopy, winding paths between trunks."),
    ("region-underroot", "Underroot", "Vast caves lit by glowing roots and small amber lizards, pulses of light running through the rock walls like slow lightning, dripping water."),
    ("region-ashen-steppe", "Ashen Steppe", "Wind-swept grey grassland under a pale sky, fine ash drifting, a river of migrating herds, a line of standing stones marching north."),
    ("region-hollow-mire", "Hollow Mire", "Fog-drowned swamp of black water and thinning trees, thousands of grey-blue cranes standing in the shallows, a bottomless black pool."),
    ("region-spirecliffs", "Spirecliffs", "Towering grey rock columns with ledges, rope-like root bridges and sheer drops, pines clinging to ledges, distant peaks lined up like a spine."),
    ("region-bone-flats", "Bone Flats", "A blinding white salt plain covered in giant fossil bones, a fossil ribcage the size of a city rising like a cathedral."),
    ("region-rimewastes", "Rimewastes", "A frozen plateau under a low white sky, a vast frozen lake with an enormous dark creature shape sleeping under the ice, round snow drifts with frost plumes."),
    ("region-cinderveil", "Cinderveil", "Volcanic highlands of black rock and red light, lava rivers between burnt forests, vultures circling, a glowing volcano on the horizon."),
    ("region-shattered-coast", "Shattered Coast", "Grey sea cliffs studded with glowing cyan meteor shards, a calm grey sea glittering cyan-violet near the shore, a reef of meteor glass rising from the sea."),
    ("region-glasswaste", "Glasswaste", "A forest and a herd of animals frozen mid-gallop in glossy black meteor glass, cyan-violet veins, glass grass, eerie and silent."),
    ("region-starwound", "The Starwound", "A miles-wide meteor crater with walls like a staircase of meteor glass, six vast glass shapes standing in a ring on its floor, crystal spires, a warm pulsing meteorite at the centre."),
]

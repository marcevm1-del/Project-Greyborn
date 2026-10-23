"""Builds the Obsidian vault in ideas/ from the design bible.

Run from the repo root:  python3 design-bible/tools/build_vault.py

Every creature, region, lineage, map and structure gets its own note, cut from
the design bible, with [[wikilinks]] between them and the concept art embedded.
Generated folders are rebuilt on each run. Ideas/ and Templates/ are only created
if missing, so notes you write there are never overwritten.
"""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DB = os.path.join(ROOT, "design-bible")
VAULT = os.path.join(ROOT, "ideas")
sys.path.insert(0, os.path.join(DB, "tools"))
import art_prompts  # noqa: E402

GENERATED = ["Creatures", "Regions", "Lineages", "Maps", "World", "Assets"]
REPO = "https://github.com/marcevm1-del/Project-Greyborn/blob/main/"


def read(rel):
    return open(os.path.join(ROOT, rel), encoding="utf-8").read()


def sections(text, level):
    """Split markdown into {heading: body} at the given heading level."""
    mark = "#" * level + " "
    out, cur, buf = {}, None, []
    for line in text.split("\n"):
        if line.startswith(mark):
            if cur:
                out[cur] = "\n".join(buf).strip()
            cur, buf = line[len(mark):].strip(), []
        elif line.startswith("#" * (level - 1) + " ") and level > 1 and cur:
            out[cur] = "\n".join(buf).strip()
            cur, buf = None, []
        elif cur:
            buf.append(line)
    if cur:
        out[cur] = "\n".join(buf).strip()
    return out


def demote(body):
    """Drop horizontal rules and shift headings so the note title is the only H1."""
    body = re.sub(r"\n-{3,}\s*$", "", body.strip())
    return re.sub(r"^(#{3,6}) ", lambda m: m.group(1)[:-1] + " ", body, flags=re.M)


notes = {}  # path relative to vault -> (title, frontmatter dict, body)


def add(folder, title, body, **front):
    notes[f"{folder}/{title}.md"] = (title, front, body)


# ---------------------------------------------------------------- creatures
bestiary = {}
for f in ("04-bestiary-legs-2-4.md", "05-bestiary-legs-6-8-insects.md"):
    for head, body in sections(read(f"design-bible/{f}"), 2).items():
        m = re.match(r"#(\d+) (.+?)(?: \((?:special )?Apex\))?$", head)
        if m:
            bestiary[int(m.group(1))] = body
bestiary[9] = sections(read("design-bible/03-kith-strays-wild.md"), 2)["3.1 Strays (#9) — stat block"]

part6 = read("design-bible/06-variants-invaders-bosses.md")
h3 = sections(part6, 3)
table_rows = {}
for line in part6.split("\n"):
    m = re.match(r"\| \*{0,2}([A-Z][\w\- ]+?)\*{0,2} \|", line)
    if m:
        table_rows.setdefault(m.group(1).strip(), []).append(line)
header_for = {}
for block in re.split(r"\n\n", part6):
    lines = block.strip().split("\n")
    if len(lines) > 2 and lines[0].startswith("|") and lines[1].startswith("|---"):
        for row in lines[2:]:
            header_for[row] = lines[0] + "\n" + lines[1]

GROUPS = {"sea": "Sea creature", "clamor": "Clamor", "hushed": "Hushed Answer"}
LEGS = [(range(1, 9), "Four-legged"), ((45, 49, 53), "Four-legged"), (range(9, 17), "Two-legged"),
        ((44, 47, 50, 52), "Two-legged"), (range(17, 25), "Six-legged"), ((41, 46, 51), "Six-legged"),
        (range(25, 33), "Eight-legged"), ((48,), "Eight-legged"), (range(33, 41), "Insect"),
        ((42, 43, 54), "Insect")]

for slug, num, name, _ in art_prompts.CREATURES:
    if num:
        group = next(g for r, g in LEGS if num in r)
        body = bestiary.get(num, "")
    else:
        group = GROUPS[slug.split("-")[0]]
        key = next((k for k in h3 if k.startswith(name)), None)
        if key:
            body = h3[key]
        else:
            rows = table_rows.get(name, [])
            body = "\n\n".join(header_for.get(r, "") + "\n" + r for r in rows)
    img = f"![[{slug}.jpg]]"
    title = name
    front = {"type": "creature", "group": group, "tags": ["creature", group.lower().replace(" ", "-")]}
    if num:
        front["number"] = num
    add("Creatures", title, f"{img}\n\n{demote(body)}", **front)

# ---------------------------------------------------------------- regions
guide = sections(read("design-bible/12-region-field-guide.md"), 2)
atlas = sections(read("gdd/11-atlas.md"), 3)
for head, body in guide.items():
    m = re.match(r"12\.\d+ (.+?) \(", head)
    if not m or head.startswith(("12.13", "12.14")):
        continue
    name = m.group(1)
    body = re.sub(r"!\[[^\]]*\]\(img/regions/([^)]+)\)", r"![[\1]]", body)
    lore = next((v for k, v in atlas.items() if name.replace("The ", "") in k), "")
    text = demote(body) + ("\n\n## From the atlas\n\n" + demote(lore) if lore else "")
    add("Regions", name, text, type="region", tags=["region"])
add("World", "Region transitions", demote(guide["12.13 How the regions meet (transition kits)"]),
    type="world", tags=["world", "region"])

# ---------------------------------------------------------------- lineages
for head, body in sections(read("design-bible/02-ascendants.md"), 2).items():
    m = re.match(r"2\.([1-8]) (.+?)(?: — | \()", head + " (")
    if m:
        name = "Kith Base Form" if m.group(1) == "1" else m.group(2)
        add("Lineages", name, f"*{head.split(' ', 1)[1]}*\n\n{demote(body)}", type="lineage", tags=["lineage"])

# ---------------------------------------------------------------- maps
MAP_IMG = {"Ashfall Crossing": "map-ashfall-crossing.png", "The Elder Ribs": "map-elder-ribs.png",
           "Breathing Canopy": "map-breathing-canopy.png"}
for f in ("08-map-rules-ashfall.md", "09-maps-ribs-canopy.md", "10-maps-post-launch.md"):
    for head, body in sections(read(f"design-bible/{f}"), 2).items():
        m = re.match(r"\d+\.\d+ (.+?)(?: \(|$)", head)
        if not m or not re.match(r"(8\.2|9\.[12]|10\.(\d|10)) ", head):
            continue
        name = m.group(1)
        img = f"![[{MAP_IMG[name]}]]\n\n" if name in MAP_IMG else ""
        body = re.sub(r"!\[[^\]]*\]\(img/[^)]+\)\n?", "", body)
        add("Maps", name, img + demote(body), type="map", tags=["map"])
add("World", "Map rules", demote(sections(read("design-bible/08-map-rules-ashfall.md"), 2)
                                 ["8.1 Rules every 4v4 map follows"]), type="world", tags=["world", "map"])

# ---------------------------------------------------------------- structures and world systems
for head, body in sections(read("design-bible/07-structures.md"), 2).items():
    m = re.match(r"7\.\d+ (.+)", head)
    if m:
        add("World", "Structures — " + re.sub(r" \(.*\)$", "", m.group(1)).replace(":", " -").replace("/", "and"),
            demote(body), type="world", tags=["world", "structure"])
for head, body in sections(read("design-bible/11-world-systems.md"), 2).items():
    m = re.match(r"11\.\d+ (.+?)(?: \(.*\))?$", head)
    if m:
        add("World", m.group(1).replace("/", "and").replace(":", " -"), demote(body),
            type="world", tags=["world", "systems"])

# ---------------------------------------------------------------- wikilinks
TARGETS = {t: p for p, (t, _, _) in notes.items()}
EXTRA = {"Rootwalkers": "Rootwalker", "Ashfangs": "Ashfang", "Mossback Grazers": "Mossback Grazer",
         "Weavemothers": "Weavemother", "Glasslegs": "Glasslegs", "Marrowhounds": "Marrowhound",
         "Knucklebrutes": "Knucklebrute", "Hollowmonks": "Hollowmonk", "Hexmaws": "Hexmaw",
         "Spurlarks": "Spurlark", "Sapdrinkers": "Sapdrinker", "Bonewrights": "Bonewright",
         "Sixhorn Rams": "Sixhorn Ram", "Rimeback Stags": "Rimeback Stag", "Stiltwalkers": "Stiltwalker",
         "Gravel Skinks": "Gravel Skink", "Strider Cranes": "Strider Crane", "Glimmerfoxes": "Glimmerfox",
         "Duskmanes": "Duskmane", "Stonehide Oxen": "Stonehide Ox", "Ember Moths": "Ember Moth",
         "Siege Beetles": "Siege Beetle", "Lantern Lizards": "Lantern Lizard", "Burrowtusks": "Burrowtusk",
         "Rootworms": "Rootworm", "Thornwasps": "Thornwasp", "Trundlebacks": "Trundleback",
         "Marrow Mantises": "Marrow Mantis", "Bone Harvestmen": "Bone Harvestman",
         "Mire Scuttlers": "Mire Scuttler", "Tendril Crawlers": "Tendril Crawler", "Ash Vultures": "Ash Vulture",
         "Shard Gulls": "Shard Gull", "Tidal Striders": "Tidal Strider", "Drift Owlbears": "Drift Owlbear",
         "Cinder Salamanders": "Cinder Salamander", "Hush Cicadas": "Hush Cicada"}
NAMES = {t: t for t in TARGETS if not t.startswith("Structures") and t not in ("Map rules",)}
NAMES.update({k: v for k, v in EXTRA.items() if v in TARGETS})
NAMES["Heartwood"] = "The Heartwood"
NAMES["Starwound"] = "The Starwound"
pattern = re.compile(r"(?<![\[\w])(" + "|".join(re.escape(n) for n in sorted(NAMES, key=len, reverse=True)) + r")(?![\w\]])")


def link(title, body):
    seen = {title}
    out = []
    for line in body.split("\n"):
        if line.startswith(("#", "![[")):
            out.append(line)
            continue

        def sub(m):
            target = NAMES[m.group(1)]
            if target in seen:
                return m.group(1)
            seen.add(target)
            if target == m.group(1):
                return f"[[{target}]]"
            return f"[[{target}\\|{m.group(1)}]]" if line.startswith("|") else f"[[{target}|{m.group(1)}]]"
        out.append(pattern.sub(sub, line))
    return "\n".join(out)


# ---------------------------------------------------------------- write
for d in GENERATED:
    shutil.rmtree(os.path.join(VAULT, d), ignore_errors=True)
for path, (title, front, body) in notes.items():
    full = os.path.join(VAULT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    fm = ["---"]
    for k, v in front.items():
        fm.append(f"{k}: [{', '.join(v)}]" if isinstance(v, list) else f"{k}: {v}")
    fm.append("---")
    open(full, "w", encoding="utf-8").write("\n".join(fm) + f"\n# {title}\n\n" + link(title, body).strip() + "\n")

assets = os.path.join(VAULT, "Assets")
for sub in ("bestiary", "regions"):
    for f in os.listdir(os.path.join(DB, "img", sub)):
        os.makedirs(assets, exist_ok=True)
        shutil.copy(os.path.join(DB, "img", sub, f), assets)
for f in MAP_IMG.values():
    shutil.copy(os.path.join(DB, "img", f), assets)

# ---------------------------------------------------------------- index notes (always rebuilt)
def listing(folder, group_key=None):
    items = sorted(((front, t) for p, (t, front, _) in notes.items() if p.startswith(folder + "/")),
                   key=lambda item: item[1])
    if not group_key:
        return "\n".join(f"- [[{t}]]" for _, t in items)
    groups = {}
    for front, t in items:
        groups.setdefault(front.get(group_key), []).append((front.get("number", 999), t))
    out = []
    for g in ("Four-legged", "Two-legged", "Six-legged", "Eight-legged", "Insect", "Sea creature", "Clamor", "Hushed Answer"):
        if g in groups:
            out.append(f"### {g}\n" + "\n".join(f"- [[{t}]]" for _, t in sorted(groups[g])))
    return "\n\n".join(out)


home = f"""---
tags: [index]
---
# Greyborn Ideas

The project's idea vault. Open this `ideas/` folder in Obsidian (*Open folder as vault*).

- **Write new ideas** in the `Ideas` folder, starting from [[Idea Inbox]]. Use the *Idea* template (Templates → Idea). These are yours; the build never touches them.
- **Creatures, Regions, Lineages, Maps and World** are generated from the design bible by
  `design-bible/tools/build_vault.py`. Edit the design bible, then re-run the script; edits
  made directly to generated notes are overwritten.
- The graph view (Ctrl/Cmd+G) shows which creatures live in which regions and maps.

## Start here
- [[Idea Inbox]] · [[Open Questions]]
- [[Region transitions]] · [[Map rules]]

## Regions
{listing("Regions")}

## Lineages
{listing("Lineages")}

## Maps
{listing("Maps")}

## Creatures
{listing("Creatures", "group")}

## World systems and structures
{listing("World")}

## Source documents
- [Design bible]({REPO}design-bible/00-README.md) · [Game design doc]({REPO}gdd/) · [Build spec]({REPO}spec/) · [Playable game]({REPO}game/README.md)
"""
open(os.path.join(VAULT, "Home.md"), "w", encoding="utf-8").write(home)

oq = read("gdd/08-open-questions.md")
oq = re.sub(r"\]\((?!http)([^)#]+)(#[^)]*)?\)", lambda m: f"]({REPO}gdd/{m.group(1)})", oq)
open(os.path.join(VAULT, "Open Questions.md"), "w", encoding="utf-8").write(
    "---\ntags: [index, question]\n---\n" + re.sub(r"^# .*", "# Open Questions", oq, count=1)
    + "\n\n*Copied from `gdd/08-open-questions.md` by the vault build.*\n")


# ---------------------------------------------------------------- user folders (only if missing)
def ensure(rel, text):
    full = os.path.join(VAULT, rel)
    if not os.path.exists(full):
        os.makedirs(os.path.dirname(full), exist_ok=True)
        open(full, "w", encoding="utf-8").write(text)


ensure("Templates/Idea.md", """---
type: idea
status: raw
tags: [idea]
area:
---
# {{title}}

**The idea in one line:**

**Why it's fun / what it adds:**

**Touches:** [[ ]] (creatures, regions, lineages or maps it affects)

**Open questions:**
-

*Created {{date}}*
""")
ensure("Templates/Creature.md", """---
type: creature
group:
status: idea
tags: [creature, idea]
---
# {{title}}

| Field | Value |
|---|---|
| Tier · temperament | |
| Habitat · maps | [[ ]] |
| Size | |
| Key mechanic | |

**Look:**

**Counter-play:**
""")
ensure("Ideas/Idea Inbox.md", """---
tags: [index, idea]
---
# Idea Inbox

Drop rough ideas here as one-liners, or make a note per idea in this folder with the *Idea*
template. Statuses: `raw` → `shaped` → `in the design bible`.

## Raw ideas
-

## Ideas from the October 2026 art pass
- Draw the 53 Blighted forms and 8 regional variants (look rules are in the design bible, Part 6.2)
- Redo concept art that drifted from the stat blocks: [[Sixhorn Ram]], [[Emberbark]], [[Gravel Skink]] (leg counts), [[Duskmane]], [[Hoarfrost Mites]]
- New ambient plants proposed in the field guide: Ghostcap ([[Underroot]]) and Saltglass Kelp ([[Shattered Coast]])
""")

os.makedirs(os.path.join(VAULT, ".obsidian"), exist_ok=True)
ensure(".obsidian/app.json", """{
  "attachmentFolderPath": "Assets",
  "newFileLocation": "folder",
  "newFileFolderPath": "Ideas",
  "alwaysUpdateLinks": true,
  "showFrontmatter": false
}
""")
ensure(".obsidian/templates.json", '{\n  "folder": "Templates"\n}\n')
ensure(".obsidian/core-plugins.json", '["file-explorer", "global-search", "switcher", "graph", "backlink", "outgoing-link", "tag-pane", "page-preview", "templates", "note-composer", "command-palette", "editor-status", "bookmarks", "outline", "word-count", "file-recovery"]\n')
ensure(".obsidian/graph.json", """{
  "colorGroups": [
    {"query": "path:Creatures", "color": {"a": 1, "rgb": 9744236}},
    {"query": "path:Regions", "color": {"a": 1, "rgb": 15253626}},
    {"query": "path:Lineages", "color": {"a": 1, "rgb": 7330000}},
    {"query": "path:Maps", "color": {"a": 1, "rgb": 6935520}},
    {"query": "path:Ideas", "color": {"a": 1, "rgb": 16766720}}
  ],
  "showAttachments": false,
  "hideUnresolved": true
}
""")
ensure(".gitignore", ".obsidian/workspace*.json\n.obsidian/cache\n.trash/\n")

print(f"{len(notes)} generated notes in {os.path.relpath(VAULT, ROOT)}/")

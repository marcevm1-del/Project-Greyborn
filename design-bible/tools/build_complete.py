"""Combines every Project Greyborn document into one HTML file for export to Word and PDF.

Usage (from the repo root):
    python3 design-bible/tools/build_complete.py /tmp/Greyborn-Complete.html
    soffice --headless --infilter="HTML (StarWriter)" --convert-to "docx:MS Word 2007 XML" /tmp/Greyborn-Complete.html
    soffice --headless --infilter="HTML (StarWriter)" --convert-to pdf:writer_pdf_Export /tmp/Greyborn-Complete.html

Needs: pip install markdown; LibreOffice Writer.
"""
import base64
import glob
import os
import re
import sys

import markdown

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

GAME_DOCS = ["README.md", "GAME_DESIGN.md", "ARCHITECTURE.md", "ROADMAP.md", "TASKS.md",
             "TESTING.md", "PERFORMANCE.md", "KNOWN_ISSUES.md", "ASSETS.md", "TOOLS.md",
             "CHANGELOG.md", "RELEASE_CHECKLIST.md"]

BOOKS = [
    ("Overview", "The project at a glance: what Greyborn is and where everything lives.",
     ["README.md"]),
    ("Book I — The Game Design Document", "52 chapters: vision, systems, world, lore, creatures, maps, seasons and modes (gdd/).",
     sorted(glob.glob(os.path.join(ROOT, "gdd", "*.md")))),
    ("Book II — The Build Spec", "Build-ready numbers: conventions, abilities, Ultimates, creatures, economy and build order (spec/). The tuning workbook greyborn-tuning.xlsx holds the same numbers.",
     sorted(glob.glob(os.path.join(ROOT, "spec", "*.md")))),
    ("Book III — The Maps & Monsters Design Bible", "Production reference for maps, creatures, Ascendants, structures and world systems (design-bible/).",
     sorted(glob.glob(os.path.join(ROOT, "design-bible", "*.md")))),
    ("Book IV — The Playable Game", "The 3D vertical slice built with three.js and TypeScript: design, architecture, roadmap, tasks, testing, performance, known issues, assets, tools, changelog and release checklist (game/).",
     [os.path.join(ROOT, "game", f) for f in GAME_DOCS]),
    ("Book V — The Match Simulator", "The balance simulator, its report and its findings (sim/).",
     [os.path.join(ROOT, "sim", f) for f in ("README.md", "report.md", "findings.md")]),
    ("Appendix — The Earlier Concept (superseded)", "The first placeholder concept and its browser prototype (docs/, prototype/). Kept for history; the current game is described in Books I–IV.",
     sorted(glob.glob(os.path.join(ROOT, "docs", "*.md"))) + [os.path.join(ROOT, "prototype", "README.md")]),
]

CSS = """
body { font-family: 'Liberation Sans', Arial, sans-serif; font-size: 10pt; color: #1a1a1a; }
h1 { font-size: 19pt; color: #0F2A30; border-bottom: 2px solid #E2B866; padding-bottom: 4pt; }
h2 { font-size: 14pt; color: #0F2A30; margin-top: 14pt; }
h3 { font-size: 12pt; color: #7a5a14; }
h4 { font-size: 10.5pt; color: #0F2A30; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0 10pt 0; }
th { background: #0F2A30; color: #ffffff; font-weight: bold; text-align: left; padding: 3pt 5pt; border: 1px solid #0F2A30; font-size: 9pt; }
td { border: 1px solid #b9b3a4; padding: 3pt 5pt; vertical-align: top; font-size: 9pt; }
pre, code { font-family: 'Liberation Mono', 'Courier New', monospace; font-size: 7.5pt; }
pre { background: #f3f0e8; padding: 6pt; border: 1px solid #d9d2c0; }
blockquote { color: #4a4a4a; border-left: 3px solid #E2B866; margin-left: 0; padding-left: 8pt; }
"""

PAGE_BREAK = '<p style="page-break-before: always"></p>'


def heading(path):
    for line in open(path, encoding="utf-8"):
        if line.startswith("# "):
            return line[2:].strip() + f"  ({os.path.relpath(path, ROOT)})"
    return os.path.relpath(path, ROOT)


def render(path):
    text = open(path, encoding="utf-8").read()
    # links to other files become plain text; images are kept
    text = re.sub(r"(?<!!)\[([^\]]+)\]\((?!http)[^)]+\)", r"\1", text)
    html = markdown.markdown(text, extensions=["tables", "fenced_code", "sane_lists"])
    base = os.path.dirname(path)

    def inline(m):
        img = os.path.normpath(os.path.join(base, m.group(1)))
        if not os.path.exists(img):
            return m.group(0)
        data = base64.b64encode(open(img, "rb").read()).decode()
        width = 290 if "screenshots" in img else 600  # screenshots sit two to a table row
        mime = "image/jpeg" if img.endswith((".jpg", ".jpeg")) else "image/png"
        return 'src="data:' + mime + ';base64,' + data + '" width="' + str(width) + '"'

    return re.sub(r'src="([^":]+\.(?:png|jpe?g))"', inline, html)


def main(out):
    body, toc = [], []
    for title, blurb, files in BOOKS:
        files = [f for f in files if os.path.exists(f)]
        toc.append((title, [heading(f) for f in files]))
        body.append(PAGE_BREAK + '<div style="margin-top:200pt; text-align:center">'
                    f'<p style="font-size:26pt; color:#0F2A30; font-weight:bold">{title}</p>'
                    f'<p style="font-size:11pt; color:#555">{blurb}</p></div>')
        for f in files:
            body.append(PAGE_BREAK + f'<p style="font-size:7.5pt; color:#888">{os.path.relpath(f, ROOT)}</p>' + render(f))
    title = ('<div style="text-align:center; margin-top:170pt">'
             '<p style="font-size:36pt; color:#0F2A30; font-weight:bold; margin:0">PROJECT GREYBORN</p>'
             '<p style="font-size:18pt; color:#7a5a14; margin:6pt 0 0 0">The Complete Project</p>'
             '<p style="font-size:11pt; color:#555; margin-top:24pt">Design document · Build spec · Design bible · Playable game · Simulator · Earlier concept</p>'
             '<p style="font-size:10pt; color:#555">Every document in the repository, in one file</p></div>')
    contents = PAGE_BREAK + "<h1>Contents</h1>"
    for t, files in toc:
        contents += f"<h3>{t}</h3><ol>" + "".join(f"<li>{f}</li>" for f in files) + "</ol>"
    html = ('<!doctype html><html><head><meta charset="utf-8"><title>Project Greyborn — The Complete Project</title>'
            f"<style>{CSS}</style></head><body>{title}{contents}{''.join(body)}</body></html>")
    open(out, "w", encoding="utf-8").write(html)
    print("wrote", out, sum(len(f) for _, f in toc), "documents")


if __name__ == "__main__":
    main(sys.argv[1])

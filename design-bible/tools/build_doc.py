"""Combines design-bible/*.md into one HTML file (images inlined) for export to Word and PDF.

Usage (from the repo root):
    python3 design-bible/tools/build_doc.py design-bible /tmp/Greyborn-Design-Bible.html
    soffice --headless --infilter="HTML (StarWriter)" --convert-to "docx:MS Word 2007 XML" /tmp/Greyborn-Design-Bible.html
    soffice --headless --infilter="HTML (StarWriter)" --convert-to pdf:writer_pdf_Export /tmp/Greyborn-Design-Bible.html

Needs: pip install markdown; LibreOffice Writer.
"""
import glob, os, re, sys, markdown
src = sys.argv[1]; out = sys.argv[2]
parts = sorted(glob.glob(os.path.join(src, '*.md')))
body = []
toc = []
for i, p in enumerate(parts):
    text = open(p, encoding='utf-8').read()
    # strip internal links to md files (keep text)
    text = re.sub(r'(?<!!)\[([^\]]+)\]\((?!http)[^)]+\)', r'\1', text)
    html = markdown.markdown(text, extensions=['tables', 'fenced_code', 'sane_lists'])
    import base64
    def inline(m):
        path = os.path.join(src, m.group(1))
        data = base64.b64encode(open(path, 'rb').read()).decode()
        return 'src="data:image/png;base64,' + data + '" width="640"'
    html = re.sub(r'src="(img/[^"]+)"', inline, html)
    t = re.search(r'<h1>(.*?)</h1>', html)
    if t: toc.append(t.group(1))
    if i > 0:
        html = '<p style="page-break-before: always"></p>' + html
    body.append(html)
css = """
body { font-family: 'Liberation Sans', Arial, sans-serif; font-size: 10pt; color: #1a1a1a; }
h1 { font-size: 20pt; color: #0F2A30; border-bottom: 2px solid #E2B866; padding-bottom: 4pt; }
h2 { font-size: 14pt; color: #0F2A30; margin-top: 16pt; }
h3 { font-size: 12pt; color: #7a5a14; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0 10pt 0; }
th { background: #0F2A30; color: #ffffff; font-weight: bold; text-align: left; padding: 3pt 5pt; border: 1px solid #0F2A30; font-size: 9pt; }
td { border: 1px solid #b9b3a4; padding: 3pt 5pt; vertical-align: top; font-size: 9pt; }
pre, code { font-family: 'Liberation Mono', 'Courier New', monospace; font-size: 7.5pt; }
pre { background: #f3f0e8; padding: 6pt; border: 1px solid #d9d2c0; }
"""
title = """<div style="text-align:center; margin-top:180pt">
<p style="font-size:34pt; color:#0F2A30; font-weight:bold; margin:0">GREYBORN</p>
<p style="font-size:18pt; color:#7a5a14; margin:6pt 0 0 0">Maps &amp; Monsters Design Bible</p>
<p style="font-size:11pt; color:#555; margin-top:24pt">Maps · Creatures · Ascendants · Structures · World systems</p>
<p style="font-size:10pt; color:#555">Compiled from gdd/, spec/ and the playable build · October 2026</p>
</div><p style="page-break-before: always"></p>"""
open(out, 'w', encoding='utf-8').write('<!doctype html><html><head><meta charset="utf-8"><title>Greyborn Maps &amp; Monsters Design Bible</title><style>' + css + '</style></head><body>' + title + '<h1>Contents</h1><ol>' + ''.join('<li>' + t + '</li>' for t in toc) + '</ol>' + '\n'.join(body) + '</body></html>')
print('wrote', out, len(parts), 'parts')

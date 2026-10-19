"""Draws the top-down layout diagrams for the three launch maps in the design bible.

Coordinates match Parts 8 and 9: x runs west -> east, z runs north -> south, so the
plot uses y = -z to put north at the top. Run from the repo root:

    python3 design-bible/tools/draw_maps.py
"""
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib.patches import Circle, FancyBboxPatch, Polygon, Rectangle  # noqa: E402

OUT = os.path.join(os.path.dirname(__file__), "..", "img")

GROUND = "#E9E5DA"
STONE = "#6E6A62"
AMBER = "#E8A23A"
CYAN = "#5FD4E0"
TEAL = "#0F2A30"
GOLD = "#E2B866"
WEST = "#3B6EA8"   # team A marker (neutral blue, not a side colour)
EAST = "#B5473A"   # team B marker
NODE = "#8C877B"
MIRE = "#9FB3B8"


def setup(w, h, title):
    fig, ax = plt.subplots(figsize=(11, 11 * h / w + 0.6), dpi=160)
    ax.set_xlim(-w / 2 - 6, w / 2 + 6)
    ax.set_ylim(-h / 2 - 6, h / 2 + 6)
    ax.set_aspect("equal")
    ax.add_patch(Rectangle((-w / 2, -h / 2), w, h, facecolor=GROUND, edgecolor=STONE, lw=1.5, zorder=0))
    ax.set_title(title, fontsize=14, color=TEAL, fontweight="bold", loc="left")
    ax.tick_params(labelsize=7, colors=STONE)
    for s in ax.spines.values():
        s.set_visible(False)
    ax.grid(color="#d6d0c2", lw=0.4, zorder=0)
    ax.set_xlabel("x (m)", fontsize=8, color=STONE)
    ax.set_ylabel("north ← −z (m) → south", fontsize=8, color=STONE)
    return fig, ax


def P(x, z):
    return (x, -z)


def base(ax, x, z, colour, label, above=False):
    ax.add_patch(FancyBboxPatch((x - 9, -z - 9), 18, 18, boxstyle="round,pad=1", facecolor=colour, edgecolor="white", lw=1.5, zorder=5))
    ax.text(x, -z, "BASE", ha="center", va="center", fontsize=7, color="white", fontweight="bold", zorder=6)
    if above:
        ax.text(x, -z + 13, label, ha="center", va="bottom", fontsize=7, color=colour, zorder=6)
    else:
        ax.text(x, -z - 15, label, ha="center", va="top", fontsize=7, color=colour, zorder=6)


def hub(ax, x, z, name, centre=False):
    ax.add_patch(Circle(P(x, z), 12, facecolor=GOLD, edgecolor=TEAL, lw=1.6 if centre else 1.0, alpha=0.9, zorder=4))
    ax.text(x, -z, "H", ha="center", va="center", fontsize=8, color=TEAL, fontweight="bold", zorder=5)
    ax.text(x, -z + 15, name, ha="center", va="bottom", fontsize=7.5, color=TEAL, fontweight="bold", zorder=6)


def core(ax, x, z, colour, name=None):
    pts = [P(x, z - 6), P(x + 5, z), P(x, z + 6), P(x - 5, z)]
    ax.add_patch(Polygon(pts, closed=True, facecolor=colour, edgecolor="white", lw=1, zorder=5))
    if name:
        ax.text(x, -z - 9, name, ha="center", va="top", fontsize=6, color=colour, zorder=6)


def node(ax, x, z, label, cells):
    r = 2.5 + cells * 1.1
    ax.add_patch(Circle(P(x, z), r, facecolor="white", edgecolor=NODE, lw=1, zorder=3))
    ax.text(x, -z, label, ha="center", va="center", fontsize=5.5, color=TEAL, zorder=4)


def zone(ax, x, z, r, kind, name):
    colour = AMBER if kind == "grove" else CYAN
    ax.add_patch(Circle(P(x, z), r, facecolor=colour, edgecolor=colour, alpha=0.28, lw=1.2, zorder=1))
    sym = "♥ " if kind == "grove" else "✶ "
    ax.text(x, -z, sym + name, ha="center", va="center", fontsize=8, color=TEAL, fontweight="bold", zorder=6)


def camp(ax, x, z, tier):
    marker = {1: "v", 2: "^", 3: "s", 4: "*"}[tier]
    ax.plot(x, -z, marker=marker, markersize=4 + tier, color="#5E8C4A", markeredgecolor="white", markeredgewidth=0.5, zorder=4)


def legend(ax, extra=()):
    from matplotlib.lines import Line2D
    items = [
        Line2D([], [], marker="s", ls="", color=WEST, markersize=8, label="Team A base / Enemy Cores"),
        Line2D([], [], marker="s", ls="", color=EAST, markersize=8, label="Team B base / Enemy Cores"),
        Line2D([], [], marker="o", ls="", color=GOLD, markeredgecolor=TEAL, markersize=9, label="Resource Hub"),
        Line2D([], [], marker="o", ls="", color="white", markeredgecolor=NODE, markersize=7, label="Node (size = cells)"),
        Line2D([], [], marker="v", ls="", color="#5E8C4A", markersize=6, label="Wildlife camp (▼ I  ▲ II  ■ III)"),
    ] + list(extra)
    ax.legend(handles=items, loc="lower center", bbox_to_anchor=(0.5, -0.16), ncol=3, fontsize=7, frameon=False)


def mirrored_x(items):
    return items + [(-x, z, l.replace("W", "E", 1), c) for x, z, l, c in items]


def ashfall():
    fig, ax = setup(280, 180, "Ashfall Crossing — Built layout (280 × 180 m), north at the top")
    # Migration road and the Knoll island
    ax.add_patch(Rectangle((-10, -90), 20, 180, facecolor="#cdb98e", alpha=0.55, zorder=1))
    ax.add_patch(Circle(P(0, 0), 26, facecolor=GROUND, edgecolor="#b6a57e", lw=1, ls="--", zorder=1))
    ax.text(0, 82, "MIGRATION ROAD (x = 0, 20 m wide) — herds flow north → south every 6 min",
            ha="center", va="center", fontsize=6.5, color="#6b5a2e", zorder=6,
            bbox=dict(facecolor=GROUND, edgecolor="none", pad=1))
    # tunnels
    for z in (-28, 30):
        ax.plot([-36, 36], [-z, -z], color=TEAL, lw=3, ls=(0, (2, 1.5)), alpha=0.6, zorder=2)
    ax.text(0, 28 + 4, "north tunnel", ha="center", fontsize=6, color=TEAL)
    ax.text(0, -30 - 7, "south tunnel", ha="center", fontsize=6, color=TEAL)
    zone(ax, 0, -62, 22, "crater", "SHARDFALL HOLLOW")
    zone(ax, 0, 66, 24, "grove", "OLD ROOT KNOT")
    nodes = mirrored_x([
        (-108, 0, "W1", 3), (-112, -52, "W2", 4), (-112, 52, "W3", 4), (-86, -14, "W4", 4),
        (-86, 18, "W5", 4), (-62, -34, "W6", 3), (-58, 24, "W7", 3), (-44, -66, "W8", 2),
        (-44, 64, "W9", 2), (-36, -28, "W10", 2), (-36, 30, "W11", 2), (-20, 0, "W12", 3),
    ])
    for x, z, l, c in nodes:
        node(ax, x, z, l, c)
    camps = [(-108, -62, 1), (-92, 62, 1), (-58, 30, 1), (-42, -40, 1), (-70, -70, 2), (-50, 62, 2),
             (-30, 12, 2), (-112, 50, 1), (-40, -12, 3)]
    for x, z, t in camps:
        camp(ax, x, z, t)
        camp(ax, -x, z, t)
    camp(ax, 0, -50, 1)
    camp(ax, 0, 46, 2)
    base(ax, -122, 0, WEST, "West Cradle")
    base(ax, 122, 0, EAST, "East Cradle")
    hub(ax, -82, -46, "STONEFOOT")
    hub(ax, -82, 46, "GRASSDEEP")
    hub(ax, 82, -46, "HERDWATER")
    hub(ax, 82, 46, "THE DRY FORD")
    hub(ax, 0, 0, "THE ASH KNOLL", centre=True)
    for (x, z, n) in [(-104, -30, "Cinder Hollow"), (-100, 34, "Low Hollow"), (-64, -8, "Forward Seed")]:
        core(ax, x, z, WEST, n)
        core(ax, -x, z, EAST, n)
    from matplotlib.lines import Line2D
    legend(ax, [Line2D([], [], color=TEAL, lw=3, ls=(0, (2, 1.5)), label="Underroot tunnel")])
    fig.savefig(os.path.join(OUT, "map-ashfall-crossing.png"), bbox_inches="tight")
    plt.close(fig)


def elder_ribs():
    fig, ax = setup(300, 320, "The Elder Ribs — proposed greybox (300 × 320 m), north at the top")
    # ribcage
    ax.add_patch(FancyBboxPatch((-55, -32), 110, 64, boxstyle="round,pad=2", facecolor="#efe8d6", edgecolor="#b9ad8e", lw=1.5, zorder=1))
    ax.plot([-62, 62], [0, 0], color="#a89b78", lw=4, zorder=2)  # spine
    for i, x in enumerate([-40, -24, -8, 8, 24, 40]):
        for s in (1, -1):
            ax.plot([x, x + 4], [0, s * 30], color="#b9ad8e", lw=3, zorder=2)
    for k, x in enumerate([-32, 0, 32]):
        ax.text(x, 38, ["First", "Second", "Third"][k] + " Rib", ha="center", fontsize=6, color=STONE)
        ax.text(x, -40, ["Fourth", "Fifth", "Sixth"][k] + " Rib", ha="center", fontsize=6, color=STONE)
    ax.text(62, 0, " skull", ha="left", va="center", fontsize=7, color=STONE)
    ax.text(-62, 0, "tail ", ha="right", va="center", fontsize=7, color=STONE)
    zone(ax, -132, 0, 18, "grove", "GRAVEROOT")
    zone(ax, 132, 0, 18, "crater", "GLASS\nFOSSIL FIELD")
    nodes = [(0, -104, "N1", 3), (-36, -110, "N2", 3), (36, -110, "N3", 3), (-108, -60, "N4", 4),
             (-40, -50, "N5", 3), (0, -44, "N6", 3), (40, -50, "N7", 3), (108, -60, "N8", 4),
             (-112, -24, "N9", 2), (112, -24, "N10", 2), (0, -20, "N11", 2)]
    for x, z, l, c in nodes:
        node(ax, x, z, l, c)
        node(ax, x, -z, l.replace("N", "S"), c)
    for x, z in [(-56, -34), (0, -40), (56, -34)]:
        ax.plot(x, -z, marker="h", color="#a89b78", markersize=7, zorder=4)
        ax.plot(x, z, marker="h", color="#a89b78", markersize=7, zorder=4)
    for x, z, t in [(-80, -36, 2), (-100, -40, 3), (80, -40, 3), (40, -32, 3), (60, -100, 1), (-60, -100, 1)]:
        camp(ax, x, z, t)
        camp(ax, x, -z, t)
    base(ax, 0, -122, WEST, "North Cradle", above=True)
    base(ax, 0, 122, EAST, "South Cradle")
    hub(ax, -64, -78, "THE COLLARBONE")
    hub(ax, 64, -78, "SKULLSIDE")
    hub(ax, -64, 78, "THE TAIL FLATS")
    hub(ax, 64, 78, "THE SALT PANS")
    hub(ax, 0, 0, "HEART OF THE RIBS", centre=True)
    for x, z in [(-100, -104), (100, -104), (0, -70)]:
        core(ax, x, z, WEST)
        core(ax, x, -z, EAST)
    from matplotlib.lines import Line2D
    legend(ax, [Line2D([], [], marker="h", ls="", color="#a89b78", markersize=7, label="Bone Harvestman nest")])
    fig.savefig(os.path.join(OUT, "map-elder-ribs.png"), bbox_inches="tight")
    plt.close(fig)


def breathing_canopy():
    fig, ax = setup(280, 200, "Breathing Canopy — proposed greybox (280 × 200 m), north at the top")
    # mire
    ax.add_patch(Rectangle((-140, -100), 280, 40, facecolor=MIRE, alpha=0.45, zorder=1))
    ax.text(-128, -96, "HOLLOW MIRE (mud −20% speed, sound damped)", fontsize=6.5, color=TEAL, zorder=6)
    ax.plot([-60, 60], [-66, -66], color="#5b7a80", lw=2, ls=":", zorder=2)
    ax.text(0, -57, "The Swallowing Edge", ha="center", fontsize=6.5, color=TEAL, zorder=6)
    ax.add_patch(Circle(P(0, 70), 9, facecolor="#2b3a3e", alpha=0.7, zorder=2))
    zone(ax, 0, -84, 18, "grove", "BREATHING VALLEY")
    zone(ax, 0, 88, 12, "crater", "FALLEN SHARD")
    ax.add_patch(Circle(P(0, 0), 26, facecolor="none", edgecolor="#5E8C4A", lw=1, ls="--", zorder=2))
    ax.text(0, -30, "Matron cave beneath the Glade", ha="center", fontsize=6, color="#5E8C4A")
    nodes = mirrored_x([
        (-112, 0, "W1", 2), (-116, -34, "W2", 2), (-116, 34, "W3", 2), (-100, -62, "W4", 1),
        (-100, 74, "W5", 2), (-66, -8, "W6", 2), (-56, -64, "W7", 1), (-44, -26, "W8", 1),
        (-42, 22, "W9", 2), (-28, -48, "W10", 1), (-26, 46, "W11", 2), (-16, -20, "W12", 1),
        (-16, 20, "W13", 1), (-36, 80, "W14", 1),
    ])
    for x, z, l, c in nodes:
        node(ax, x, z, l, c)
    for x, z, t in [(-90, -50, 1), (-50, 4, 1), (-70, -80, 2), (-80, 12, 1), (-34, -36, 1),
                    (-60, 78, 3), (-30, 64, 3), (-20, -70, 2)]:
        camp(ax, x, z, t)
        camp(ax, -x, z, t)
    base(ax, -130, 0, WEST, "West Cradle")
    base(ax, 130, 0, EAST, "East Cradle")
    hub(ax, -84, -36, "MOTHER'S ROOT")
    hub(ax, -84, 36, "FERNHOLLOW")
    hub(ax, 84, -36, "BEE HOLLOW")
    hub(ax, 84, 36, "MOSS BANK")
    hub(ax, 0, 0, "THE GLADE", centre=True)
    for x, z in [(-60, -40), (-66, 30), (-104, 60)]:
        core(ax, x, z, WEST)
        core(ax, -x, z, EAST)
    legend(ax)
    fig.savefig(os.path.join(OUT, "map-breathing-canopy.png"), bbox_inches="tight")
    plt.close(fig)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    ashfall()
    elder_ribs()
    breathing_canopy()
    print("maps written to", os.path.abspath(OUT))

r"""Generates the conecta[lab] logo SVGs (text converted to paths).

Usage, from the repo root:
  mkdir -p scripts/brand/fonts
  curl -s "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800" | grep -oE "https://[^)]+\.ttf" | xargs curl -so scripts/brand/fonts/jakarta-800.ttf
  curl -s "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800" | grep -oE "https://[^)]+\.ttf" | xargs curl -so scripts/brand/fonts/jbmono-800.ttf
  python3 scripts/brand/genlogo.py public/brand
Then copy public/brand/conectalab-icon.svg to src/app/icon.svg.
"""
import re, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ttf2path import Font, text_path

HERE = os.path.dirname(__file__)
OUT = sys.argv[1]
jak = Font(f"{HERE}/fonts/jakarta-800.ttf")
mono = Font(f"{HERE}/fonts/jbmono-800.ttf")

INK, PAPER, BLUE, BLUE_DARK_BG = "#121316", "#f5f4ef", "#2563eb", "#6b9cff"


def bbox(*ds):
    nums = [float(n) for d in ds for n in re.findall(r"-?\d+(?:\.\d+)?", d)]
    xs, ys = nums[0::2], nums[1::2]
    return min(xs), min(ys), max(xs), max(ys)


def wordmark(size=100):
    word, x = text_path(jak, "conecta", 0, 0, size, -0.04)
    # Brackets hug "lab": mono advances carry wide side bearings.
    ob, x = text_path(mono, "[", x + 0.1 * size, 0, size)
    mid, x = text_path(mono, "lab", x - 0.1 * size, 0, size, -0.05)
    cb, _ = text_path(mono, "]", x - 0.1 * size, 0, size)
    return word, ob + mid + cb


def write(name, svg):
    with open(os.path.join(OUT, name), "w") as f:
        f.write(svg)


word, lab = wordmark()
x0, y0, x1, y1 = bbox(word, lab)
pad = 2
vb = f"{x0 - pad:.0f} {y0 - pad:.0f} {x1 - x0 + 2 * pad:.0f} {y1 - y0 + 2 * pad:.0f}"
for name, a, b in [("conectalab-logo.svg", INK, BLUE), ("conectalab-logo-dark.svg", PAPER, BLUE_DARK_BG)]:
    write(name, f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="conecta[lab]">'
                f'<path fill="{a}" d="{word}"/><path fill="{b}" d="{lab}"/></svg>\n')

# Icon: [•] in white on a blue rounded square.
S = 512
size = 320
open_b, ox = text_path(mono, "[", 0, 0, size)
bx0, by0, bx1, by1 = bbox(open_b)
bw = bx1 - bx0
gap = 128
total = bw * 2 + gap
left = (S - total) / 2 - bx0
cy_glyph = (by0 + by1) / 2
base = S / 2 - cy_glyph
lb, _ = text_path(mono, "[", left, base, size)
rx_start = (S + total) / 2 - bw
rb_raw, _ = text_path(mono, "]", 0, 0, size)
rx0, _, _, _ = bbox(rb_raw)
rb, _ = text_path(mono, "]", rx_start - rx0, base, size)
icon = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S} {S}" role="img" aria-label="conecta[lab]">'
        f'<rect width="{S}" height="{S}" rx="112" fill="{BLUE}"/>'
        f'<path fill="#fff" d="{lb}{rb}"/><circle cx="{S/2}" cy="{S/2}" r="42" fill="#fff"/></svg>\n')
write("conectalab-icon.svg", icon)
print("viewBox", vb)

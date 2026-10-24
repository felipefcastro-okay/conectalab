"""Minimal TrueType reader: text -> SVG path data (simple glyphs only)."""
import struct


class Font:
    def __init__(self, path):
        self.d = open(path, "rb").read()
        n = struct.unpack(">H", self.d[4:6])[0]
        self.t = {}
        for i in range(n):
            tag, _, off, ln = struct.unpack(">4sIII", self.d[12 + 16 * i: 28 + 16 * i])
            self.t[tag.decode()] = off
        h = self.t["head"]
        self.upm = struct.unpack(">H", self.d[h + 18:h + 20])[0]
        self.locfmt = struct.unpack(">h", self.d[h + 50:h + 52])[0]
        m = self.t["maxp"]
        self.ng = struct.unpack(">H", self.d[m + 4:m + 6])[0]
        hh = self.t["hhea"]
        self.nhm = struct.unpack(">H", self.d[hh + 34:hh + 36])[0]
        o = self.t["OS/2"]
        self.xh = struct.unpack(">h", self.d[o + 86:o + 88])[0]
        self.cap = struct.unpack(">h", self.d[o + 88:o + 90])[0]
        self._cmap()

    def _cmap(self):
        c = self.t["cmap"]
        n = struct.unpack(">H", self.d[c + 2:c + 4])[0]
        for i in range(n):
            pid, eid, off = struct.unpack(">HHI", self.d[c + 4 + 8 * i: c + 12 + 8 * i])
            st = c + off
            if pid == 3 and eid == 1 and struct.unpack(">H", self.d[st:st + 2])[0] == 4:
                break
        segx2 = struct.unpack(">H", self.d[st + 6:st + 8])[0]
        seg = segx2 // 2
        ends = st + 14
        starts = ends + segx2 + 2
        deltas = starts + segx2
        ranges = deltas + segx2
        self.cm = {}
        for s in range(seg):
            e, b = (struct.unpack(">H", self.d[a + 2 * s:a + 2 * s + 2])[0] for a in (ends, starts))
            dl = struct.unpack(">h", self.d[deltas + 2 * s:deltas + 2 * s + 2])[0]
            ro = struct.unpack(">H", self.d[ranges + 2 * s:ranges + 2 * s + 2])[0]
            for ch in range(b, e + 1):
                if ch == 0xFFFF:
                    continue
                if ro == 0:
                    g = (ch + dl) & 0xFFFF
                else:
                    a = ranges + 2 * s + ro + 2 * (ch - b)
                    g = struct.unpack(">H", self.d[a:a + 2])[0]
                    g = (g + dl) & 0xFFFF if g else 0
                self.cm[ch] = g

    def adv(self, g):
        h = self.t["hmtx"]
        i = min(g, self.nhm - 1)
        return struct.unpack(">H", self.d[h + 4 * i:h + 4 * i + 2])[0]

    def _loc(self, g):
        lo = self.t["loca"]
        if self.locfmt == 0:
            a, b = struct.unpack(">HH", self.d[lo + 2 * g:lo + 2 * g + 4])
            return a * 2, b * 2
        return struct.unpack(">II", self.d[lo + 4 * g:lo + 4 * g + 8])

    def contours(self, g):
        a, b = self._loc(g)
        if a == b:
            return []
        p = self.t["glyf"] + a
        nc = struct.unpack(">h", self.d[p:p + 2])[0]
        assert nc >= 0, "composite glyph not supported"
        p += 10
        ends = struct.unpack(">%dH" % nc, self.d[p:p + 2 * nc])
        p += 2 * nc
        il = struct.unpack(">H", self.d[p:p + 2])[0]
        p += 2 + il
        npts = ends[-1] + 1
        flags = []
        while len(flags) < npts:
            f = self.d[p]
            p += 1
            flags.append(f)
            if f & 8:
                r = self.d[p]
                p += 1
                flags += [f] * r
        def coords(short, same):
            nonlocal p
            out, v = [], 0
            for f in flags:
                if f & short:
                    dv = self.d[p]
                    p += 1
                    v += dv if f & same else -dv
                elif not f & same:
                    v += struct.unpack(">h", self.d[p:p + 2])[0]
                    p += 2
                out.append(v)
            return out
        xs = coords(2, 16)
        ys = coords(4, 32)
        res, s = [], 0
        for e in ends:
            res.append([(xs[i], ys[i], bool(flags[i] & 1)) for i in range(s, e + 1)])
            s = e + 1
        return res


def contour_path(pts, ox, oy, k):
    T = lambda p: f"{round(ox + p[0] * k, 2)} {round(oy - p[1] * k, 2)}"
    n = len(pts)
    exp = []
    for i in range(n):
        p, q = pts[i], pts[(i + 1) % n]
        exp.append(p)
        if not p[2] and not q[2]:
            exp.append(((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, True))
    s = next(i for i, p in enumerate(exp) if p[2])
    exp = exp[s:] + exp[:s]
    exp.append(exp[0])
    out = ["M" + T(exp[0])]
    j = 1
    while j < len(exp):
        p = exp[j]
        if p[2]:
            out.append("L" + T(p))
            j += 1
        else:
            out.append("Q" + T(p) + " " + T(exp[j + 1]))
            j += 2
    out.append("Z")
    return "".join(out)


def text_path(font, text, x, baseline, size, tracking_em=0.0):
    """Returns (path_d, end_x)."""
    k = size / font.upm
    parts = []
    for ch in text:
        g = font.cm[ord(ch)]
        for c in font.contours(g):
            parts.append(contour_path(c, x, baseline, k))
        x += font.adv(g) * k + tracking_em * size
    return "".join(parts), x - tracking_em * size

import { useId } from 'react'

// Minimal line-drawing thumbnails, one per project, drawn like a sheet from an architectural set.
// Grey = context, blue = what the project's tool adds. Looping animations live in globals.css (.thumb-*).

const ACCENT = 'var(--color-accent)'
const INK = 'var(--color-ink)'
const MUTED = 'var(--color-muted)'
const BASE = 236 // shared ground line so every drawing sits the same way
const SCAN_Y = 62 // where the RetroGrade scan line starts

type IconDef = { caption: string; draw: () => React.ReactElement; plan?: boolean } // plan = top-down view, no ground line

// ── RetroGrade: façade scan — some windows "detected" ──
function Retrograde() {
  const cols = [157, 186, 215, 244]
  const rows = [70, 98, 126, 154, 182, 210]
  const detected = new Set(['0-1', '2-1', '1-2', '3-2', '0-4', '2-4', '1-5', '3-0'])
  return (
    <>
      <g stroke={INK} strokeOpacity="0.55" strokeWidth="1.25" fill="none">
        <rect x="140" y="54" width="122" height={BASE - 54} />
        {rows.map((y, r) =>
          cols.map((x, c) => (
            <rect key={`${r}-${c}`} x={x} y={y} width="16" height="18" opacity={detected.has(`${c}-${r}`) ? 0 : 1} />
          ))
        )}
      </g>
      <g fill={ACCENT} stroke={ACCENT} strokeWidth="1.25">
        {rows.map((y, r) =>
          cols.map((x, c) =>
            detected.has(`${c}-${r}`) ? (
              <rect
                key={`d-${r}-${c}`}
                className="thumb-detect"
                // light up when the scan line (6s loop, 62→232) reaches this row
                style={{ animationDelay: `${(((y + 9 - SCAN_Y) / 170) * 0.8 * 6).toFixed(2)}s` }}
                x={x}
                y={y}
                width="16"
                height="18"
                fillOpacity="0.35"
              />
            ) : null
          )
        )}
      </g>
      <g className="thumb-scan" stroke={ACCENT} strokeWidth="1.25">
        <line x1="112" y1={SCAN_Y} x2="290" y2={SCAN_Y} strokeDasharray="4 5" />
        <circle cx="112" cy={SCAN_Y} r="3" fill={ACCENT} />
        <path d={`M 290 ${SCAN_Y - 6} l 8 6 l -8 6`} fill="none" />
      </g>
    </>
  )
}

// ── Crack detection: a crack (grey) and the robot's repair path (blue) ──
function Crack() {
  const crack = [[96, 96], [132, 116], [160, 106], [190, 146], [214, 154], [240, 188], [272, 198], [304, 226]]
  const path = crack.map(([x, y]) => [x + 6, y + 14])
  const pts = (p: number[][]) => p.map((q) => q.join(',')).join(' ')
  return (
    <>
      <rect x="82" y="70" width="236" height={BASE - 70} fill="none" stroke={INK} strokeOpacity="0.25" strokeDasharray="2 4" />
      <polyline points={pts(crack)} fill="none" stroke={INK} strokeOpacity="0.8" strokeWidth="2.5" strokeLinejoin="round" />
      <polyline
        className="thumb-march"
        points={pts(path)}
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.75"
        strokeDasharray="2 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {path.filter((_, i) => i % 2 === 1).map(([x, y], i) => (
        <circle
          key={`${x}-${y}`}
          className="thumb-pulse"
          style={{ animationDelay: `${i * 0.6}s` }}
          cx={x}
          cy={y}
          r="3.5"
          fill={ACCENT}
        />
      ))}
      <g className="thumb-bob">
        <path d="M 312 238 l 12 -26 l 11 6 Z" fill={ACCENT} fillOpacity="0.35" stroke={ACCENT} strokeWidth="1.25" />
      </g>
    </>
  )
}

// ── Chronoscape: one house remembered three times ──
function Chronoscape() {
  const house = (x: number, y: number) =>
    `M ${x} ${y + 72} L ${x} ${y + 28} L ${x + 52} ${y} L ${x + 104} ${y + 28} L ${x + 104} ${y + 72} Z M ${x + 42} ${y + 72} L ${x + 42} ${y + 48} L ${x + 62} ${y + 48} L ${x + 62} ${y + 72}`
  const x0 = 148
  const y0 = BASE - 72
  return (
    <g fill="none" strokeLinejoin="round">
      <g className="thumb-drift-2">
        <path d={house(x0 + 44, y0 - 52)} stroke={ACCENT} strokeOpacity="0.35" strokeWidth="1.25" strokeDasharray="3 4" />
      </g>
      <g className="thumb-drift-1">
        <path d={house(x0 + 22, y0 - 26)} stroke={ACCENT} strokeOpacity="0.7" strokeWidth="1.25" />
      </g>
      <path d={house(x0, y0)} stroke={INK} strokeOpacity="0.85" strokeWidth="1.75" />
    </g>
  )
}

// ── Origami lunar habitats: a folded shell on the lunar horizon ──
function Lunar() {
  const cx = 200
  const outer: number[][] = []
  const zig: number[][] = []
  for (let a = 180; a >= 0; a -= 15) {
    const rad = (a * Math.PI) / 180
    const r = (a / 15) % 2 === 0 ? 88 : 66
    outer.push([cx + 88 * Math.cos(rad), BASE - 88 * Math.sin(rad)])
    zig.push([cx + r * Math.cos(rad), BASE - r * Math.sin(rad)])
  }
  const pts = (p: number[][]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  return (
    <>
      <circle className="thumb-orbit" cx="312" cy="74" r="9" fill="none" stroke={INK} strokeOpacity="0.55" strokeWidth="1.25" />
      {[
        [96, 62, 1.5, 0],
        [146, 96, 1.2, 1],
        [262, 50, 1.2, 2],
      ].map(([x, y, r, d]) => (
        <circle
          key={`${x}-${y}`}
          className="thumb-twinkle"
          style={{ animationDelay: `${d}s` }}
          cx={x}
          cy={y}
          r={r}
          fill={INK}
          fillOpacity="0.6"
        />
      ))}
      <g className="thumb-fold" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinejoin="round">
        <polyline points={pts(outer)} />
        <polyline points={pts(zig)} strokeOpacity="0.75" />
        {outer.map(([x, y], i) => (
          <line key={i} x1={x} y1={y} x2={zig[i][0]} y2={zig[i][1]} strokeOpacity="0.5" />
        ))}
      </g>
    </>
  )
}

// ── HVRA / OASIS (draft): blocks with heat rising from the hottest one ──
function Heat() {
  const blocks = [[120, 60], [160, 96], [204, 74], [248, 110]]
  return (
    <>
      <g fill="none" stroke={INK} strokeOpacity="0.55" strokeWidth="1.25">
        {blocks.map(([x, h]) => (
          <rect key={x} x={x} y={BASE - h} width="36" height={h} />
        ))}
      </g>
      <rect x="160" y={BASE - 96} width="36" height="96" fill={ACCENT} fillOpacity="0.3" stroke={ACCENT} strokeWidth="1.25" />
      <g fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round">
        {[166, 178, 190].map((x, i) => (
          <path
            key={x}
            className="thumb-rise"
            style={{ animationDelay: `${i * 0.4}s` }}
            d={`M ${x} 128 q 6 -8 0 -16 q -6 -8 0 -16`}
          />
        ))}
      </g>
    </>
  )
}

// ── THEIA (draft): terrain contours with a chosen site ──
function Contours() {
  return (
    <>
      <g fill="none" stroke={INK} strokeOpacity="0.45" strokeWidth="1.25">
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx={200 + i * 4} cy={150 + i * 2} rx={130 - i * 24} ry={74 - i * 13} />
        ))}
      </g>
      <g className="thumb-target" stroke={ACCENT} strokeWidth="1.5" fill="none">
        <circle cx="236" cy="168" r="10" />
        <path d="M 236 152 v -10 M 236 184 v 10 M 220 168 h -10 M 252 168 h 10" />
      </g>
    </>
  )
}

function Generic() {
  return <circle cx="200" cy="160" r="48" fill="none" stroke={ACCENT} strokeWidth="1.5" />
}

const icons: Record<string, IconDef> = {
  retrograde: { caption: 'FAÇADE SCAN', draw: Retrograde },
  'crack-detection': { caption: 'CRACK → REPAIR PATH', draw: Crack },
  chronoscape: { caption: 'LAYERS OF MEMORY', draw: Chronoscape },
  'lunar-habitations': { caption: 'FOLDED SHELL · LUNAR SITE', draw: Lunar },
  'hvra-oasis': { caption: 'HEAT RISK', draw: Heat },
  theia: { caption: 'SITE CONTOURS', draw: Contours, plan: true },
}

/** Corner crop marks, like a drawing sheet */
function CropMarks() {
  const m = 14
  const l = 12
  const corners = [
    [m, m, 1, 1],
    [400 - m, m, -1, 1],
    [m, 300 - m, 1, -1],
    [400 - m, 300 - m, -1, -1],
  ]
  return (
    <g stroke={MUTED} strokeOpacity="0.6" strokeWidth="1">
      {corners.map(([x, y, dx, dy]) => (
        <path key={`${x}-${y}`} d={`M ${x} ${y + dy * l} L ${x} ${y} L ${x + dx * l} ${y}`} fill="none" />
      ))}
    </g>
  )
}

export default function ThumbIcon({ slug, index }: { slug: string; index?: number }) {
  const icon = icons[slug] ?? { caption: '', draw: Generic }
  const Draw = icon.draw
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const fig = index !== undefined ? `FIG. ${String(index + 1).padStart(2, '0')} — ` : ''

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
      <defs>
        <pattern id={`g${uid}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-line)" strokeWidth="0.75" />
        </pattern>
        <radialGradient id={`f${uid}`} cx="50%" cy="48%" r="60%">
          <stop offset="40%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={`m${uid}`}>
          <rect width="400" height="300" fill={`url(#f${uid})`} />
        </mask>
      </defs>

      {/* drafting grid, fading out towards the edges */}
      <rect width="400" height="300" fill={`url(#g${uid})`} mask={`url(#m${uid})`} />
      <CropMarks />

      {/* ground line shared by all elevation drawings */}
      {!icon.plan && <line x1="70" y1={BASE} x2="330" y2={BASE} stroke={INK} strokeOpacity="0.35" strokeWidth="1" />}

      <Draw />

      {/* caption + scale bar */}
      <text
        x="28"
        y="276"
        fill={MUTED}
        fontSize="9.5"
        letterSpacing="1.4"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
      >
        {fig}
        {icon.caption}
      </text>
      <g stroke={MUTED} strokeWidth="1" fill="none">
        <path d="M 312 270 v 6 h 60 v -6 M 342 273 v 3" />
      </g>
      <rect x="312" y="273" width="30" height="3" fill={MUTED} fillOpacity="0.6" />
    </svg>
  )
}

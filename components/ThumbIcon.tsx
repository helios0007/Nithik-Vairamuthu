import { useId } from 'react'

// Minimal line-drawing thumbnails, one per project, drawn like architectural sketches.
const ACCENT = 'var(--color-accent)'

function Grid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-line)" strokeWidth="0.75" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#${id})`} />
    </>
  )
}

// Façade with some windows "detected" — segmentation for retrofit feasibility
function Retrograde() {
  const cols = [147, 179, 211, 243]
  const rows = [68, 100, 132, 164, 196, 228]
  const filled = new Set(['0-1', '2-1', '1-2', '3-2', '0-4', '2-4', '1-5', '3-0'])
  return (
    <g stroke={ACCENT} strokeWidth="1.5" fill="none">
      <line x1="80" y1="260" x2="320" y2="260" />
      <rect x="130" y="50" width="140" height="210" />
      {rows.map((y, r) =>
        cols.map((x, c) => (
          <rect
            key={`${r}-${c}`}
            x={x}
            y={y}
            width="18"
            height="22"
            fill={filled.has(`${c}-${r}`) ? ACCENT : 'none'}
            fillOpacity="0.35"
          />
        ))
      )}
      <line x1="96" y1="142" x2="304" y2="142" strokeDasharray="4 5" opacity="0.8" />
      <circle cx="96" cy="142" r="3" fill={ACCENT} />
    </g>
  )
}

// A crack, and the robot's repair path tracing it
function Crack() {
  const crack = [[90, 92], [128, 112], [158, 102], [188, 142], [214, 150], [240, 186], [272, 196], [310, 232]]
  const path = crack.map(([x, y]) => [x + 6, y + 16])
  const pts = (p: number[][]) => p.map((q) => q.join(',')).join(' ')
  return (
    <g fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinejoin="round">
      <polyline points={pts(crack)} strokeWidth="2.5" />
      <polyline points={pts(path)} strokeDasharray="2 6" strokeLinecap="round" />
      {path.filter((_, i) => i % 2 === 1).map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill={ACCENT} />
      ))}
      <path d="M 316 236 l 14 -24 l 10 6 Z" fill={ACCENT} fillOpacity="0.35" />
    </g>
  )
}

// The same house remembered three times — layers of memory
function Chronoscape() {
  const house = (x: number, y: number) =>
    `M ${x} ${y + 70} L ${x} ${y + 26} L ${x + 50} ${y} L ${x + 100} ${y + 26} L ${x + 100} ${y + 70} Z M ${x + 40} ${y + 70} L ${x + 40} ${y + 46} L ${x + 60} ${y + 46} L ${x + 60} ${y + 70}`
  return (
    <g fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinejoin="round">
      <line x1="70" y1="236" x2="330" y2="236" />
      <path d={house(190, 102)} opacity="0.25" strokeDasharray="3 4" />
      <path d={house(165, 134)} opacity="0.55" />
      <path d={house(140, 166)} strokeWidth="2" />
    </g>
  )
}

// A folded (origami) shell on the lunar horizon, Earth in the sky
function Lunar() {
  const cx = 200
  const cy = 236
  const outer: number[][] = []
  const zig: number[][] = []
  for (let a = 180; a >= 0; a -= 15) {
    const rad = (a * Math.PI) / 180
    const r = (a / 15) % 2 === 0 ? 92 : 70
    outer.push([cx + 92 * Math.cos(rad), cy - 92 * Math.sin(rad)])
    zig.push([cx + r * Math.cos(rad), cy - r * Math.sin(rad)])
  }
  const pts = (p: number[][]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  return (
    <g fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinejoin="round">
      <path d="M 30 252 Q 200 224 370 252" />
      <polyline points={pts(outer)} />
      <polyline points={pts(zig)} opacity="0.7" />
      {outer.map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={zig[i][0]} y2={zig[i][1]} opacity="0.5" />
      ))}
      <circle cx="318" cy="72" r="9" />
      <circle cx="90" cy="60" r="1.5" fill={ACCENT} />
      <circle cx="140" cy="96" r="1.2" fill={ACCENT} />
      <circle cx="262" cy="48" r="1.2" fill={ACCENT} />
    </g>
  )
}

function Generic() {
  return (
    <g fill="none" stroke={ACCENT} strokeWidth="1.5">
      <circle cx="200" cy="150" r="50" />
      <line x1="150" y1="150" x2="250" y2="150" strokeDasharray="4 5" />
    </g>
  )
}

const icons: Record<string, () => React.ReactElement> = {
  retrograde: Retrograde,
  'crack-detection': Crack,
  chronoscape: Chronoscape,
  'lunar-habitations': Lunar,
}

export default function ThumbIcon({ slug }: { slug: string }) {
  const Icon = icons[slug] ?? Generic
  const gridId = `thumb-grid-${useId().replace(/:/g, '')}`
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-hidden>
      <Grid id={gridId} />
      <Icon />
    </svg>
  )
}

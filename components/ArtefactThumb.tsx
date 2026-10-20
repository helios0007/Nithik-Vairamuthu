// "Method artefact" thumbnails: each card shows the kind of output the project's method produces,
// drawn in hairline — a segmentation mask, toolpath offsets, a point cloud, a crease pattern.

const ACCENT = 'var(--color-accent)'
const INK = 'var(--color-ink)'
const MUTED = 'var(--color-muted)'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

/** Small deterministic random generator so drawings are identical on every render */
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

function Swatch({ x, fill, dashed, label }: { x: number; fill?: string; dashed?: boolean; label: string }) {
  return (
    <g>
      {fill ? (
        <rect x={x} y="268" width="7" height="7" fill={fill} />
      ) : (
        <line x1={x} y1="272" x2={x + 12} y2="272" stroke={dashed ? INK : ACCENT} strokeOpacity={dashed ? 0.6 : 1} strokeDasharray={dashed ? '2 2' : undefined} />
      )}
      <text x={x + (fill ? 11 : 16)} y="275" fill={MUTED} fontSize="8" letterSpacing="1.2" fontFamily={MONO}>
        {label}
      </text>
    </g>
  )
}

// ── RetroGrade: a façade as a segmentation mask (wall / window / vegetation) ──
function Segmentation() {
  const cell = 8
  const cols = 20
  const rows = 25
  const x0 = 200 - (cols * cell) / 2
  const y0 = 36
  const cells: React.ReactElement[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = x0 + c * cell
      const y = y0 + r * cell
      const veg = ((x - 150) / 62) ** 2 + ((y - 236) / 46) ** 2 < 1 || ((x - 262) / 30) ** 2 + ((y - 240) / 34) ** 2 < 1
      const win = c % 5 >= 1 && c % 5 <= 3 && r % 4 >= 1 && r % 4 <= 2 && r < 22
      const fill = veg ? MUTED : win ? ACCENT : INK
      const op = veg ? 0.55 : win ? 0.85 : 0.1
      cells.push(<rect key={`${r}-${c}`} x={x + 0.5} y={y + 0.5} width={cell - 1} height={cell - 1} fill={fill} fillOpacity={op} />)
    }
  }
  return (
    <>
      <g>{cells}</g>
      <rect x={x0} y={y0} width={cols * cell} height={rows * cell} fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="0.75" />
      <g className="thumb-scan">
        <line x1={x0 - 14} y1={y0} x2={x0 + cols * cell + 14} y2={y0} stroke={ACCENT} strokeWidth="0.75" />
      </g>
      <Swatch x={24} fill={INK} label="WALL" />
      <Swatch x={74} fill={ACCENT} label="WINDOW" />
      <Swatch x={136} fill={MUTED} label="VEGETATION" />
    </>
  )
}

// ── Crack detection: the traced crack plus parallel repair toolpaths ──
function Toolpaths() {
  const rand = rng(7)
  const pts: number[][] = []
  const n = 34
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const x = 60 + t * 280
    const y = 70 + t * 150 + Math.sin(t * 9) * 10 + (rand() - 0.5) * 9
    pts.push([x, y])
  }
  // per-vertex normals for offset curves
  const normals = pts.map((_, i) => {
    const [ax, ay] = pts[Math.max(0, i - 1)]
    const [bx, by] = pts[Math.min(n, i + 1)]
    const dx = bx - ax
    const dy = by - ay
    const len = Math.hypot(dx, dy) || 1
    return [-dy / len, dx / len]
  })
  const offset = (k: number) => pts.map(([x, y], i) => `${(x + normals[i][0] * k).toFixed(1)},${(y + normals[i][1] * k).toFixed(1)}`).join(' ')
  const offsets = [-15, -10, -5, 5, 10, 15]
  return (
    <>
      {offsets.map((k) => (
        <polyline key={k} points={offset(k)} fill="none" stroke={ACCENT} strokeWidth="0.75" strokeOpacity={1 - Math.abs(k) / 22} />
      ))}
      <polyline
        className="thumb-march"
        points={offset(5)}
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.25"
        strokeDasharray="6 42"
        strokeLinecap="round"
      />
      <polyline points={offset(0)} fill="none" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      {pts
        .filter((_, i) => i % 6 === 0)
        .map(([x, y], i) => {
          const [nx, ny] = normals[i * 6]
          return (
            <line key={i} x1={x - nx * 24} y1={y - ny * 24} x2={x + nx * 24} y2={y + ny * 24} stroke={INK} strokeOpacity="0.25" strokeWidth="0.75" />
          )
        })}
      <line x1="24" y1="272" x2="36" y2="272" stroke={INK} strokeWidth="1.5" />
      <text x="40" y="275" fill={MUTED} fontSize="8" letterSpacing="1.2" fontFamily={MONO}>
        CRACK
      </text>
      <Swatch x={92} label="TOOLPATH OFFSETS" />
    </>
  )
}

// ── Chronoscape: a house reconstructed as a point cloud ──
function PointCloud() {
  const rand = rng(11)
  // gabled house, ridge along x; viewer looks from +x/+z (isometric)
  const W = 110
  const D = 72
  const H = 58
  const R = 38
  const cos = Math.cos(Math.PI / 6)
  const sin = Math.sin(Math.PI / 6)
  const cx = 200 - ((W - D) * cos) / 2
  const project = (x: number, y: number, z: number) => [cx + (x - z) * cos, 156 + (x + z) * sin - y]
  const gable = (z: number) => H + R * (1 - Math.abs(z - D / 2) / (D / 2))
  const points: { p: number[]; front: boolean }[] = []
  const add = (count: number, f: () => number[], front = false) => {
    for (let i = 0; i < count; i++) points.push({ p: f(), front })
  }
  const jitter = () => (rand() - 0.5) * 1.6
  // surfaces
  add(520, () => [rand() * W, rand() * H, D + jitter()], true) // long wall facing us
  add(300, () => {
    const z = rand() * D
    return [W + jitter(), rand() * gable(z), z]
  }) // gable wall
  add(380, () => {
    const t = rand()
    return [rand() * W, H + t * R + jitter(), D - (t * D) / 2]
  }) // front roof
  add(110, () => {
    const t = rand()
    return [rand() * W, H + t * R + jitter(), (t * D) / 2]
  }) // back roof (seen past the ridge)
  // edges, sampled densely so the form reads crisply
  const edge = (a: number[], b: number[], count: number, front = false) =>
    add(count, () => {
      const t = rand()
      return a.map((v, i) => v + (b[i] - v) * t + jitter() * 0.4)
    }, front)
  edge([0, 0, D], [W, 0, D], 90, true)
  edge([0, H, D], [W, H, D], 90, true)
  edge([W, 0, D], [W, H, D], 50, true)
  edge([0, 0, D], [0, H, D], 50, true)
  edge([W, 0, 0], [W, 0, D], 60)
  edge([W, H, 0], [W, H + R, D / 2], 50)
  edge([W, H + R, D / 2], [W, H, D], 50)
  edge([0, H + R, D / 2], [W, H + R, D / 2], 90)
  edge([0, H, D], [0, H + R, D / 2], 40)
  // a little scan noise around the object
  add(60, () => [rand() * W * 1.4 - 20, rand() * (H + R) * 1.3, rand() * D * 1.4 - 10])
  return (
    <>
      {points.map(({ p: [x, y, z], front }, i) => {
        const [px, py] = project(x, y, z)
        return (
          <circle
            key={i}
            cx={px.toFixed(1)}
            cy={py.toFixed(1)}
            r="0.9"
            fill={front ? ACCENT : INK}
            fillOpacity={front ? 0.9 : 0.4 + (i % 5) * 0.08}
            className={i % 37 === 0 ? 'thumb-twinkle' : undefined}
          />
        )
      })}
      <text x="24" y="275" fill={MUTED} fontSize="8" letterSpacing="1.2" fontFamily={MONO}>
        RECONSTRUCTION · {points.length.toLocaleString('en')} PTS
      </text>
    </>
  )
}

// ── Origami lunar habitats: a Miura-ori crease pattern ──
function CreasePattern() {
  const cols = 8
  const rows = 6
  const w = 34
  const h = 30
  const shift = 10
  const x0 = 200 - (cols * w) / 2 - shift / 2
  const y0 = 150 - (rows * h) / 2 - 12
  const horizontals = Array.from({ length: rows + 1 }, (_, r) => r)
  const verticals = Array.from({ length: cols + 1 }, (_, c) => c)
  return (
    <g strokeWidth="0.9" fill="none">
      {verticals.map((c) => (
        <polyline
          key={`v${c}`}
          points={horizontals.map((r) => `${x0 + c * w + (r % 2 ? shift : 0)},${y0 + r * h}`).join(' ')}
          stroke={c % 2 ? ACCENT : INK}
          strokeOpacity={c % 2 ? 1 : 0.6}
          strokeDasharray={c % 2 ? undefined : '3 3'}
        />
      ))}
      {horizontals.map((r) => (
        <line
          key={`h${r}`}
          x1={x0 + (r % 2 ? shift : 0)}
          y1={y0 + r * h}
          x2={x0 + cols * w + (r % 2 ? shift : 0)}
          y2={y0 + r * h}
          stroke={r % 2 ? INK : ACCENT}
          strokeOpacity={r % 2 ? 0.6 : 1}
          strokeDasharray={r % 2 ? '3 3' : undefined}
        />
      ))}
      <Swatch x={24} label="MOUNTAIN" />
      <Swatch x={110} dashed label="VALLEY" />
    </g>
  )
}

const artefacts: Record<string, () => React.ReactElement> = {
  retrograde: Segmentation,
  'crack-detection': Toolpaths,
  chronoscape: PointCloud,
  'lunar-habitations': CreasePattern,
}

export default function ArtefactThumb({ slug }: { slug: string }) {
  const Art = artefacts[slug]
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
      {Art ? <Art /> : null}
    </svg>
  )
}

// "Method artefact" thumbnails: each card shows the kind of output the project's method produces,
// drawn in hairline — a segmentation mask, toolpath offsets, a point cloud, a crease pattern…
//
// Motion (all in globals.css, all off under reduced motion):
//   .ink-draw / .ink-fade — draws itself once when scrolled into view (DrawOnView sets data-drawn; --d = delay)
//   .thumb-*              — slow ambient loops afterwards

import EixampleHeat from './EixampleHeat'
import RobotArm from './RobotArm'

const ACCENT = 'var(--color-accent)'
const INK = 'var(--color-ink)'
const MUTED = 'var(--color-muted)'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

/** Delay for the draw-in sequence */
const d = (s: number) => ({ '--d': `${s.toFixed(2)}s` }) as React.CSSProperties

/** Small deterministic random generator so drawings are identical on every render */
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const toPath = (pts: number[][]) => 'M ' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')

function Legend({ items }: { items: { label: string; fill?: string; line?: 'solid' | 'dashed' | 'ink'; w?: number }[] }) {
  // x position of each legend entry, laid out left to right
  const starts = items.reduce<number[]>(
    (acc, it, i) => [...acc, i === 0 ? 24 : acc[i - 1] + (items[i - 1].w ?? items[i - 1].label.length * 6.4) + 30],
    []
  )
  return (
    <g className="ink-fade" style={d(1.6)}>
      {items.map((it, i) => {
        const x0 = starts[i]
        return (
          <g key={it.label}>
            {it.fill ? (
              <rect x={x0} y="268" width="7" height="7" fill={it.fill} />
            ) : (
              <line
                x1={x0}
                y1="272"
                x2={x0 + 12}
                y2="272"
                stroke={it.line === 'solid' ? ACCENT : INK}
                strokeOpacity={it.line === 'dashed' ? 0.6 : 1}
                strokeWidth={it.line === 'ink' ? 1.5 : 1}
                strokeDasharray={it.line === 'dashed' ? '2 2' : undefined}
              />
            )}
            <text x={x0 + (it.fill ? 11 : 16)} y="275" fill={MUTED} fontSize="8" letterSpacing="1.2" fontFamily={MONO}>
              {it.label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

// ── RetroGrade: a façade as a segmentation mask (wall / window / vegetation) ──
// Loop: pixels start scattered and unclassified; as the scan line rises, each row snaps into
// place and takes its class colour, holds, then drifts apart again (.thumb-cell / .thumb-rise).
const SEG_CYCLE = 7 // seconds, keep in sync with globals.css
const SEG_SWEEP = 0.43 * SEG_CYCLE // time the scan line takes from bottom to top

function Segmentation() {
  const cell = 8
  const cols = 20
  const rows = 25
  const x0 = 200 - (cols * cell) / 2
  const y0 = 36
  const h = rows * cell
  const rand = rng(11)
  return (
    <>
      {Array.from({ length: rows }, (_, r) => (
        <g key={r} className="ink-fade" style={d(0.15 + r * 0.035)}>
          {Array.from({ length: cols }, (_, c) => {
            const x = x0 + c * cell
            const y = y0 + r * cell
            const veg =
              ((x - 150) / 62) ** 2 + ((y - 236) / 46) ** 2 < 1 || ((x - 262) / 30) ** 2 + ((y - 240) / 34) ** 2 < 1
            const win = c % 5 >= 1 && c % 5 <= 3 && r % 4 >= 1 && r % 4 <= 2 && r < 22
            const fill = veg ? MUTED : win ? ACCENT : INK
            const opacity = veg ? 0.55 : win ? 0.85 : 0.1
            // when the rising scan line reaches this row's centre
            const snapAt = ((h - r * cell - cell / 2) / h) * SEG_SWEEP
            const motion = {
              '--c': fill,
              '--o': opacity,
              '--dx': `${((rand() - 0.5) * 70).toFixed(1)}px`,
              '--dy': `${((rand() - 0.5) * 50).toFixed(1)}px`,
              '--rot': `${((rand() - 0.5) * 120).toFixed(0)}deg`,
              animationDelay: `${snapAt.toFixed(2)}s`,
            } as React.CSSProperties
            return (
              <rect
                key={c}
                className="thumb-cell"
                style={motion}
                x={x + 0.5}
                y={y + 0.5}
                width={cell - 1}
                height={cell - 1}
                fill={fill}
                fillOpacity={opacity}
              />
            )
          })}
        </g>
      ))}
      <path
        className="ink-draw"
        style={d(0.1)}
        pathLength={1}
        d={`M ${x0} ${y0} H ${x0 + cols * cell} V ${y0 + h} H ${x0} Z`}
        fill="none"
        stroke={INK}
        strokeOpacity="0.35"
        strokeWidth="0.75"
      />
      <g className="ink-fade" style={d(0.6)}>
        <g className="thumb-rise">
          <line x1={x0 - 14} y1={y0} x2={x0 + cols * cell + 14} y2={y0} stroke={ACCENT} strokeWidth="0.75" />
        </g>
      </g>
      <Legend
        items={[
          { label: 'WALL', fill: INK },
          { label: 'WINDOW', fill: ACCENT },
          { label: 'VEGETATION', fill: MUTED },
        ]}
      />
    </>
  )
}

// ── Crack detection: the traced crack plus parallel repair toolpaths ──
function Toolpaths() {
  const rand = rng(7)
  const n = 34
  const pts: number[][] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    pts.push([60 + t * 280, 70 + t * 150 + Math.sin(t * 9) * 10 + (rand() - 0.5) * 9])
  }
  const normals = pts.map((_, i) => {
    const [ax, ay] = pts[Math.max(0, i - 1)]
    const [bx, by] = pts[Math.min(n, i + 1)]
    const len = Math.hypot(bx - ax, by - ay) || 1
    return [-(by - ay) / len, (bx - ax) / len]
  })
  const offset = (k: number) => pts.map(([x, y], i) => [x + normals[i][0] * k, y + normals[i][1] * k])
  const offsets = [5, -5, 10, -10, 15, -15]
  return (
    <>
      {pts
        .filter((_, i) => i % 6 === 0)
        .map(([x, y], i) => {
          const [nx, ny] = normals[i * 6]
          return (
            <line
              key={i}
              className="ink-fade"
              style={d(1.1 + i * 0.05)}
              x1={x - nx * 24}
              y1={y - ny * 24}
              x2={x + nx * 24}
              y2={y + ny * 24}
              stroke={INK}
              strokeOpacity="0.25"
              strokeWidth="0.75"
            />
          )
        })}
      {offsets.map((k, i) => (
        <path
          key={k}
          className="ink-draw"
          style={d(0.6 + Math.floor(i / 2) * 0.18)}
          pathLength={1}
          d={toPath(offset(k))}
          fill="none"
          stroke={ACCENT}
          strokeWidth="0.75"
          strokeOpacity={1 - Math.abs(k) / 22}
        />
      ))}
      <path
        className="ink-draw"
        style={d(0.15)}
        pathLength={1}
        d={toPath(pts)}
        fill="none"
        stroke={INK}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* the robot arm traces the crack and lays the repair behind it */}
      <g className="ink-fade" style={d(1.3)}>
        <RobotArm crack={pts} />
      </g>
      <Legend items={[{ label: 'CRACK', line: 'ink' }, { label: 'TOOLPATH OFFSETS', line: 'solid' }]} />
    </>
  )
}

// ── Chronoscape: fragments of residents' memories converge and are reconstructed as Gaussian splats ──
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
  }) // back roof, seen past the ridge
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
  add(60, () => [rand() * W * 1.4 - 20, rand() * (H + R) * 1.3, rand() * D * 1.4 - 10]) // scan noise

  // Splats: soft ellipses sampled from the same surfaces, coarse (big, few) then fine (small, many)
  const splatRand = rng(23)
  const projected = points.filter((pt) => pt.p[1] >= 0).map(({ p: [x, y, z], front }) => ({ xy: project(x, y, z), front }))
  const makeSplats = (count: number, rx: [number, number], ry: [number, number]) =>
    Array.from({ length: count }, () => {
      const { xy, front } = projected[Math.floor(splatRand() * projected.length)]
      return {
        x: xy[0] + (splatRand() - 0.5) * 3,
        y: xy[1] + (splatRand() - 0.5) * 3,
        rx: rx[0] + splatRand() * (rx[1] - rx[0]),
        ry: ry[0] + splatRand() * (ry[1] - ry[0]),
        rot: Math.round(splatRand() * 180),
        front,
      }
    })
  const coarse = makeSplats(70, [8, 14], [4, 8])
  const fine = makeSplats(420, [2.5, 4.5], [1.2, 2.4])
  const groupsOf = <T,>(list: T[], n: number) => Array.from({ length: n }, (_, g) => list.filter((_, i) => i % n === g))
  // Each batch of points is one resident's memory: it starts as a small, partial fragment of the house
  // somewhere around the frame, then flies in and merges with the others.
  const memories = [
    { mx: -128, my: -62, mr: -28 },
    { mx: 132, my: -72, mr: 22 },
    { mx: 150, my: 58, mr: 34 },
    { mx: -146, my: 52, mr: -40 },
    { mx: 4, my: -104, mr: 12 },
  ]

  // Loop (globals.css, .memory-points / .splat-*): scattered memories → they converge into a faint house →
  // coarse then fine Gaussian splats reconstruct it → the crisp house holds → it breaks back into memories.
  // Off under reduced motion, which shows the finished house.
  const batches = memories.length
  return (
    <>
      <defs>
        {(['ink', 'accent'] as const).map((c) => (
          <radialGradient key={c} id={`splat-${c}`}>
            <stop offset="0%" stopColor={c === 'accent' ? ACCENT : INK} stopOpacity="0.9" />
            <stop offset="45%" stopColor={c === 'accent' ? ACCENT : INK} stopOpacity="0.45" />
            <stop offset="100%" stopColor={c === 'accent' ? ACCENT : INK} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      {/* Gaussian splats, coarse then fine (hidden until the house has gone) */}
      {[
        { list: coarse, cls: 'splat-coarse', op: 0.45, groups: 3 },
        { list: fine, cls: 'splat-fine', op: 0.8, groups: 4 },
      ].map(({ list, cls, op, groups }) =>
        groupsOf(list, groups).map((group, g) => (
          <g key={`${cls}-${g}`} className={cls} style={{ animationDelay: `${(g * 0.18).toFixed(2)}s` }}>
            {group.map((sp, i) => (
              <ellipse
                key={i}
                rx={sp.rx.toFixed(1)}
                ry={sp.ry.toFixed(1)}
                transform={`translate(${sp.x.toFixed(1)} ${sp.y.toFixed(1)}) rotate(${sp.rot})`}
                fill={`url(#splat-${sp.front ? 'accent' : 'ink'})`}
                opacity={op}
              />
            ))}
          </g>
        ))
      )}

      {/* the point cloud, one batch per memory */}
      {Array.from({ length: batches }, (_, b) => (
        <g key={b} className="ink-fade" style={d(0.15 + b * 0.16)}>
          <g
            className="memory-points"
            style={
              {
                '--mx': `${memories[b].mx}px`,
                '--my': `${memories[b].my}px`,
                '--mr': `${memories[b].mr}deg`,
                animationDelay: `${(b * 0.12).toFixed(2)}s`,
              } as React.CSSProperties
            }
          >
            {points.map(({ p: [x, y, z], front }, i) => {
              if (i % batches !== b) return null
              const [px, py] = project(x, y, z)
              return (
                <circle
                  key={i}
                  cx={px.toFixed(1)}
                  cy={py.toFixed(1)}
                  r="0.9"
                  fill={front ? ACCENT : INK}
                  fillOpacity={front ? 0.9 : 0.4 + (i % 5) * 0.08}
                />
              )
            })}
          </g>
        </g>
      ))}

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
  const ys = Array.from({ length: rows + 1 }, (_, r) => r)
  const xs = Array.from({ length: cols + 1 }, (_, c) => c)
  return (
    <>
      <g className="thumb-crease" strokeWidth="0.9" fill="none">
        {xs.map((c) => {
          const pts = ys.map((r) => [x0 + c * w + (r % 2 ? shift : 0), y0 + r * h])
          const mountain = c % 2 === 1
          return mountain ? (
            <path key={`v${c}`} className="ink-draw" style={d(0.2 + c * 0.08)} pathLength={1} d={toPath(pts)} stroke={ACCENT} />
          ) : (
            <path
              key={`v${c}`}
              className="ink-fade"
              style={d(0.9 + c * 0.05)}
              d={toPath(pts)}
              stroke={INK}
              strokeOpacity="0.6"
              strokeDasharray="3 3"
            />
          )
        })}
        {ys.map((r) => {
          const s = r % 2 ? shift : 0
          const pts = [
            [x0 + s, y0 + r * h],
            [x0 + cols * w + s, y0 + r * h],
          ]
          const mountain = r % 2 === 0
          return mountain ? (
            <path key={`h${r}`} className="ink-draw" style={d(0.3 + r * 0.08)} pathLength={1} d={toPath(pts)} stroke={ACCENT} />
          ) : (
            <path
              key={`h${r}`}
              className="ink-fade"
              style={d(1.0 + r * 0.05)}
              d={toPath(pts)}
              stroke={INK}
              strokeOpacity="0.6"
              strokeDasharray="3 3"
            />
          )
        })}
      </g>
      <Legend items={[{ label: 'MOUNTAIN', line: 'solid' }, { label: 'VALLEY', line: 'dashed' }]} />
    </>
  )
}

// ── OASIS: Barcelona's Eixample grid shaded by heat, climate shelters cooling block by block ──
function EixampleHeatArt() {
  return (
    <>
      <g className="ink-fade" style={d(0.15)}>
        <EixampleHeat />
      </g>
      <Legend items={[{ label: 'HEAT', fill: INK }, { label: 'CLIMATE SHELTER', fill: ACCENT }]} />
    </>
  )
}

// ── THEIA (draft): topographic contours with a chosen site ──
function Topography() {
  const rand = rng(23)
  const phases = [rand() * 6, rand() * 6, rand() * 6]
  const contour = (k: number) => {
    const pts: number[][] = []
    for (let a = 0; a <= 64; a++) {
      const t = (a / 64) * Math.PI * 2
      const wobble = 1 + 0.12 * Math.sin(3 * t + phases[0]) + 0.07 * Math.sin(5 * t + phases[1]) + 0.04 * Math.sin(7 * t + phases[2])
      const rx = (150 - k * 17) * wobble
      const ry = (95 - k * 11) * wobble
      pts.push([196 + k * 4 + rx * Math.cos(t), 140 + k * 2 + ry * Math.sin(t)])
    }
    return toPath(pts) + ' Z'
  }
  return (
    <>
      <g fill="none" stroke={INK} strokeWidth="0.75">
        {Array.from({ length: 8 }, (_, k) => (
          <path
            key={k}
            className="ink-draw"
            style={d(0.15 + k * 0.12)}
            pathLength={1}
            d={contour(k)}
            strokeOpacity={0.25 + k * 0.07}
          />
        ))}
      </g>
      <g className="ink-fade" style={d(1.4)}>
        <g className="thumb-target" stroke={ACCENT} strokeWidth="1" fill="none">
          <circle cx="246" cy="160" r="7" />
          <path d="M 246 146 v -8 M 246 174 v 8 M 232 160 h -8 M 260 160 h 8" />
        </g>
      </g>
      <Legend items={[{ label: 'CONTOURS · 10 M', line: 'ink' }, { label: 'CANDIDATE SITE', line: 'solid' }]} />
    </>
  )
}

const artefacts: Record<string, () => React.ReactElement> = {
  retrograde: Segmentation,
  'crack-detection': Toolpaths,
  chronoscape: PointCloud,
  'lunar-habitations': CreasePattern,
  oasis: EixampleHeatArt,
  theia: Topography,
}

export default function ArtefactThumb({ slug, index }: { slug: string; index?: number }) {
  const Art = artefacts[slug]
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
      {index !== undefined && (
        <text
          className="ink-fade"
          style={d(0)}
          x="24"
          y="30"
          fill={MUTED}
          fontSize="9"
          letterSpacing="1.4"
          fontFamily={MONO}
        >
          {String(index + 1).padStart(2, '0')}
        </text>
      )}
      {Art ? <Art /> : null}
    </svg>
  )
}

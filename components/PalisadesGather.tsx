'use client'

// Chronoscape thumbnail: scattered points (fragments of memory) drift together and form a drawing of
// Pacific Palisades: the Santa Monica Mountains, the Pacific with a low sun, palms, and houses on the
// hillside street. Every point is drawn in one <path> (zero-length round-capped segments), so the
// animation updates a single element per frame. Pauses off-screen; reduced motion shows the finished scene.

import { useEffect, useRef } from 'react'

type Pt = [number, number]
type Stroke = { pts: Pt[]; accent?: boolean; step?: number }

const arc = (cx: number, cy: number, r: number, a0: number, a1: number, n = 24): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]
  })
const rect = (x: number, y: number, w: number, h: number): Pt[] => [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]]

function palm(x: number, base: number, top: Pt): Stroke[] {
  const trunk: Pt[] = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8
    return [x + (top[0] - x) * t + Math.sin(t * Math.PI) * 4, base + (top[1] - base) * t]
  })
  const fronds = [-2.7, -2.1, -1.5, -1.0, -0.45, 0.15].map((a) =>
    Array.from({ length: 8 }, (_, i): Pt => {
      const t = i / 7
      const len = 22
      return [top[0] + Math.cos(a) * len * t, top[1] + Math.sin(a) * len * t + t * t * 12]
    })
  )
  return [{ pts: trunk, step: 2.6 }, ...fronds.map((pts) => ({ pts, step: 2.4 }))]
}

// The scene, in the 400 × 300 thumbnail space
const STROKES: Stroke[] = [
  // Santa Monica Mountains
  { pts: [[18, 132], [55, 108], [92, 118], [132, 86], [176, 104], [222, 78], [268, 98], [314, 84], [352, 100], [384, 116]], step: 2.6 },
  { pts: [[40, 140], [86, 128], [128, 136], [170, 122], [214, 130]], step: 4.5 },
  // the Pacific: horizon, low sun, swell
  { pts: [[18, 196], [150, 196]], accent: true, step: 2.4 },
  { pts: arc(84, 196, 17, Math.PI, 2 * Math.PI, 30), accent: true, step: 2.2 },
  { pts: [[30, 206], [64, 206]], accent: true, step: 3.2 },
  { pts: [[78, 206], [128, 206]], accent: true, step: 3.2 },
  { pts: [[44, 216], [110, 216]], accent: true, step: 4 },
  // the hillside street
  { pts: [[140, 238], [384, 206]], step: 2.4 },
  // gabled house
  { pts: rect(158, 204, 42, 30), step: 2.3 },
  { pts: [[154, 205], [179, 186], [204, 205]], step: 2.3 },
  { pts: rect(170, 214, 10, 9), step: 2.6 },
  // Spanish Colonial house: flat parapet, arched door, arched window
  { pts: rect(214, 196, 50, 34), step: 2.3 },
  { pts: [[214, 196], [214, 190], [264, 190], [264, 196]], step: 2.5 },
  { pts: [[230, 230], [230, 216], ...arc(236, 216, 6, Math.PI, 2 * Math.PI, 10), [242, 230]], step: 2.2 },
  { pts: [[248, 214], [248, 206], ...arc(253, 206, 5, Math.PI, 2 * Math.PI, 8), [258, 214], [248, 214]], step: 2.2 },
  // modern house: flat roof, big glazing
  { pts: rect(276, 192, 54, 30), step: 2.3 },
  { pts: [[270, 192], [336, 192]], step: 2.3 },
  { pts: rect(284, 198, 30, 14), accent: true, step: 2.6 },
  // palms
  ...palm(140, 236, [134, 160]),
  ...palm(352, 208, [346, 128]),
  ...palm(366, 206, [368, 150]),
]

type Particle = { tx: number; ty: number; sx: number; sy: number; delay: number; accent: boolean }

function buildParticles(): Particle[] {
  let seed = 31
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  const out: Particle[] = []
  for (const { pts, accent = false, step = 2.4 } of STROKES) {
    for (let i = 1; i < pts.length; i++) {
      const [ax, ay] = pts[i - 1]
      const [bx, by] = pts[i]
      const n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / step))
      for (let k = 0; k < n; k++) {
        const t = k / n
        out.push({
          tx: ax + (bx - ax) * t + (rand() - 0.5) * 0.8,
          ty: ay + (by - ay) * t + (rand() - 0.5) * 0.8,
          sx: rand() * 420 - 10,
          sy: rand() * 300,
          delay: rand() * 1.4,
          accent,
        })
      }
    }
  }
  return out
}

const PARTICLES = buildParticles()

// one loop, in seconds
const SCATTER = 1.0 // drifting fragments
const GATHER = 2.2 // each point's own flight time (plus its delay)
const HOLD = 3.4 // the finished scene
const DISPERSE = 1.6
const CYCLE = SCATTER + 1.4 + GATHER + HOLD + DISPERSE

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Both paths' d at time t (seconds into the loop) */
function frame(t: number) {
  let ink = ''
  let accent = ''
  const gatherStart = SCATTER
  const disperseStart = SCATTER + 1.4 + GATHER + HOLD
  for (const p of PARTICLES) {
    // drift while scattered
    const wx = Math.sin(t * 0.9 + p.sx * 0.05) * 3
    const wy = Math.cos(t * 0.7 + p.sy * 0.05) * 3
    let k: number // 0 = scattered, 1 = in place
    if (t < gatherStart) k = 0
    else if (t < disperseStart) k = easeInOut(Math.min(1, Math.max(0, (t - gatherStart - p.delay) / GATHER)))
    else k = 1 - easeInOut(Math.min(1, Math.max(0, (t - disperseStart - p.delay * 0.4) / DISPERSE)))
    const x = p.sx + wx + (p.tx - p.sx - wx) * k
    const y = p.sy + wy + (p.ty - p.sy - wy) * k
    const seg = `M${x.toFixed(1)} ${y.toFixed(1)}h0`
    if (p.accent) accent += seg
    else ink += seg
  }
  return { ink, accent }
}

const FINAL = (() => {
  let ink = ''
  let accent = ''
  for (const p of PARTICLES) {
    const seg = `M${p.tx.toFixed(1)} ${p.ty.toFixed(1)}h0`
    if (p.accent) accent += seg
    else ink += seg
  }
  return { ink, accent }
})()

export default function PalisadesGather() {
  const root = useRef<SVGGElement>(null)
  const inkPath = useRef<SVGPathElement>(null)
  const accentPath = useRef<SVGPathElement>(null)

  useEffect(() => {
    const g = root.current
    if (!g || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let running = false
    let clock = 0
    let last = 0
    const tick = (now: number) => {
      clock = (clock + Math.min(0.05, (now - last) / 1000)) % CYCLE
      last = now
      const { ink, accent } = frame(clock)
      inkPath.current?.setAttribute('d', ink)
      accentPath.current?.setAttribute('d', accent)
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(tick)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(g)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <g ref={root}>
      <path ref={inkPath} d={FINAL.ink} stroke="var(--color-ink)" strokeOpacity="0.85" strokeWidth="1.7" strokeLinecap="round" />
      <path ref={accentPath} d={FINAL.accent} stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  )
}

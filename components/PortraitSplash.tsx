'use client'

// Home-page portrait over a "splash" made of halftone dots: a blue splash behind the head, a grey one
// to the left, dotted streaks and droplets flying off them, and a light splash at the bottom where the
// shirt dissolves into dots. On load the dots burst out from each splash's centre once, then stay still.
// Reduced motion shows the finished splash. All dots of one colour and size share a single <path>
// (zero-length round-capped segments), so the whole splash is ~20 elements.

import Image from 'next/image'
import { useEffect, useRef } from 'react'

// Coordinates are in the portrait's pixel space (1000 × 1117); the canvas adds a margin around it.
const VB = { x: -150, y: -90, w: 1300, h: 1280 }
const IMG = { w: 1000, h: 1117 }
const SIZES = [2.4, 4, 5.6, 7.2, 9] // stroke widths = dot diameters
const COLORS = [
  { stroke: 'var(--color-accent)', opacity: 0.9 },
  { stroke: 'var(--color-muted)', opacity: 0.6 },
  { stroke: 'var(--color-accent)', opacity: 0.35 },
  { stroke: 'var(--color-ink)', opacity: 0.85 },
]

function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Dot = { x: number; y: number; cx: number; cy: number; delay: number; size: number; color: number }

type Blob = {
  cx: number
  cy: number
  r: number
  squash?: number // vertical scale, <1 = flatter
  color: number
  streaks: number
  minY?: number // drop dots above this line (used for the bottom splash)
  seed: number
}

const BLOBS: Blob[] = [
  { cx: 760, cy: 250, r: 300, color: 0, streaks: 15, seed: 3 }, // blue, behind the head, up-right
  { cx: 200, cy: 500, r: 270, color: 1, streaks: 13, seed: 7 }, // grey, left
  { cx: 930, cy: 700, r: 140, color: 2, streaks: 7, seed: 11 }, // faint, right shoulder
  { cx: 500, cy: 1100, r: 470, squash: 0.3, color: 3, streaks: 16, minY: 1010, seed: 19 }, // light, bottom
]

function build(): Dot[] {
  const dots: Dot[] = []
  for (const b of BLOBS) {
    const rand = rng(b.seed)
    const sq = b.squash ?? 1
    const ph = [rand() * 6.28, rand() * 6.28, rand() * 6.28]
    const edge = (a: number) => b.r * (1 + 0.1 * Math.sin(3 * a + ph[0]) + 0.07 * Math.sin(5 * a + ph[1]) + 0.05 * Math.sin(9 * a + ph[2]))
    const push = (x: number, y: number, size: number) => {
      if (b.minY !== undefined && y < b.minY) return
      const d = Math.hypot(x - b.cx, (y - b.cy) / sq) / (b.r * 1.9)
      dots.push({ x, y, cx: b.cx, cy: b.cy, delay: Math.min(1, d) * 0.45 + rand() * 0.08, size, color: b.color })
    }

    // halftone body: dots shrink toward the ragged edge
    const step = 12
    for (let y = b.cy - b.r * 1.3 * sq; y < b.cy + b.r * 1.3 * sq; y += step) {
      for (let x = b.cx - b.r * 1.3; x < b.cx + b.r * 1.3; x += step) {
        const jx = x + (rand() - 0.5) * 4
        const jy = y + (rand() - 0.5) * 4
        const dx = jx - b.cx
        const dy = (jy - b.cy) / sq
        const rho = Math.hypot(dx, dy) / edge(Math.atan2(dy, dx))
        if (rho > 1) continue
        const k = Math.min(1, (1 - rho) / 0.35)
        const size = Math.round(k * (SIZES.length - 1) - rand() * 0.6)
        push(jx, jy, Math.max(0, size))
      }
    }

    // streaks: rows of dots flying off the edge, thinning out, ending in a droplet
    for (let s = 0; s < b.streaks; s++) {
      const a = rand() * Math.PI * 2
      const r0 = edge(a) * 0.95
      const len = b.r * (0.35 + rand() * 0.85)
      let t = 0
      let gap = 9
      while (t < len) {
        const f = t / len
        push(b.cx + Math.cos(a) * (r0 + t), b.cy + Math.sin(a) * (r0 + t) * sq, Math.max(0, Math.round((1 - f) * 3)))
        t += gap
        gap *= 1.07
      }
      push(b.cx + Math.cos(a) * (r0 + len + 14), b.cy + Math.sin(a) * (r0 + len + 14) * sq, 2 + Math.round(rand()))
    }

    // loose droplets around the splash
    for (let s = 0; s < 34; s++) {
      const a = rand() * Math.PI * 2
      const r = edge(a) * (1.08 + rand() * 0.7)
      push(b.cx + Math.cos(a) * r, b.cy + Math.sin(a) * r * sq, rand() < 0.2 ? 2 : rand() < 0.5 ? 1 : 0)
    }
  }
  return dots
}

const DOTS = build()
const GROUPS = COLORS.map((_, c) => SIZES.map((_, s) => ({ c, s })))

function paths(p: number) {
  const out: string[][] = COLORS.map(() => SIZES.map(() => ''))
  for (const d of DOTS) {
    // each dot travels from its splash centre to its place, ease-out, staggered outward
    const t = Math.max(0, Math.min(1, (p - d.delay) / 0.55))
    if (t === 0) continue
    const e = 1 - Math.pow(1 - t, 3)
    const x = d.cx + (d.x - d.cx) * e
    const y = d.cy + (d.y - d.cy) * e
    out[d.color][d.size] += `M${x.toFixed(1)} ${y.toFixed(1)}h0`
  }
  return out
}

const FINAL = paths(1)

// The shirt dissolves into dots: a CSS mask that is solid above y = 760 and breaks into
// shrinking, thinning circles below it.
const MASK = (() => {
  const rand = rng(42)
  const top = 760
  const step = 16
  let circles = ''
  for (let y = top; y < IMG.h + step; y += step) {
    const t = (y - top) / (IMG.h - top)
    for (let x = 0; x < IMG.w + step; x += step) {
      const keep = 1 - t * 1.05 + (rand() - 0.5) * 0.5
      if (keep < 0.15) continue
      const r = 11.6 * Math.pow(Math.max(0, 1 - t * 0.85), 0.7) * (0.75 + rand() * 0.35)
      circles += `<circle cx='${x + (rand() - 0.5) * 3}' cy='${y}' r='${r.toFixed(1)}'/>`
    }
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${IMG.w} ${IMG.h}' preserveAspectRatio='none'><rect width='${IMG.w}' height='${top}'/>${circles}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
})()

const pct = (v: number, of: number) => `${(v / of) * 100}%`

export default function PortraitSplash() {
  const svg = useRef<SVGSVGElement>(null)
  const refs = useRef<(SVGPathElement | null)[][]>(COLORS.map(() => []))

  useEffect(() => {
    const el = svg.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'
      return
    }
    let raf = 0
    const start = performance.now() + 150
    const DURATION = 1600
    const tick = (now: number) => {
      const p = Math.max(0, (now - start) / DURATION)
      const f = paths(p)
      f.forEach((row, c) => row.forEach((d, s) => refs.current[c][s]?.setAttribute('d', d)))
      el.style.opacity = '1'
      if (p < 1.05) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-xl md:-mr-8" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
      <svg
        ref={svg}
        aria-hidden
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        className="portrait-splash absolute inset-0 h-full w-full"
        fill="none"
        strokeLinecap="round"
      >
        {GROUPS.map((row) =>
          row.map(({ c, s }) => (
            <path
              key={`${c}-${s}`}
              ref={(n) => {
                refs.current[c][s] = n
              }}
              d={FINAL[c][s]}
              stroke={COLORS[c].stroke}
              strokeOpacity={COLORS[c].opacity}
              strokeWidth={SIZES[s]}
            />
          )),
        )}
      </svg>
      <div
        className="absolute"
        style={{
          left: pct(-VB.x, VB.w),
          top: pct(-VB.y, VB.h),
          width: pct(IMG.w, VB.w),
          height: pct(IMG.h, VB.h),
          maskImage: MASK,
          WebkitMaskImage: MASK,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      >
        <Image
          src="/portrait-hero.webp"
          preload
          alt="Portrait of Nithik Vairamuthu"
          fill
          sizes="(max-width: 768px) 80vw, 400px"
          className="object-contain"
        />
      </div>
    </div>
  )
}

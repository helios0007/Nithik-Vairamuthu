'use client'

// Pressure Chamber thumbnail: a slowly turning particle globe, like the installation's ambient screen.
// Points on a sphere, front ones bright and back ones faint, a few blue "bias" points.
// Each layer is one <path> of zero-length round-capped segments, updated per frame.
// Pauses off-screen; reduced motion shows one still frame.

import { useEffect, useRef } from 'react'

const N = 900
const R = 108
const CX = 200
const CY = 138
const TILT = 0.38 // radians, axis tilt toward the viewer

// Fibonacci sphere: evenly spread points
const POINTS = Array.from({ length: N }, (_, i) => {
  const y = 1 - (2 * (i + 0.5)) / N
  const r = Math.sqrt(1 - y * y)
  const a = i * Math.PI * (3 - Math.sqrt(5))
  return { x: Math.cos(a) * r, y, z: Math.sin(a) * r, accent: i % 53 === 0 }
})

function frame(t: number) {
  const rot = t * 0.25
  const cr = Math.cos(rot)
  const sr = Math.sin(rot)
  const ct = Math.cos(TILT)
  const st = Math.sin(TILT)
  let front = ''
  let back = ''
  let accent = ''
  for (const p of POINTS) {
    // spin around the vertical axis, then tilt
    const x1 = p.x * cr + p.z * sr
    const z1 = -p.x * sr + p.z * cr
    const y2 = p.y * ct - z1 * st
    const z2 = p.y * st + z1 * ct
    const seg = `M${(CX + x1 * R).toFixed(1)} ${(CY - y2 * R).toFixed(1)}h0`
    if (p.accent && z2 > 0) accent += seg
    else if (z2 > 0) front += seg
    else back += seg
  }
  return { front, back, accent }
}

const STILL = frame(1.2)

export default function ParticleGlobe() {
  const root = useRef<SVGGElement>(null)
  const frontPath = useRef<SVGPathElement>(null)
  const backPath = useRef<SVGPathElement>(null)
  const accentPath = useRef<SVGPathElement>(null)

  useEffect(() => {
    const g = root.current
    if (!g || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let running = false
    let clock = 1.2
    let last = 0
    const tick = (now: number) => {
      clock += Math.min(0.05, (now - last) / 1000)
      last = now
      const f = frame(clock)
      frontPath.current?.setAttribute('d', f.front)
      backPath.current?.setAttribute('d', f.back)
      accentPath.current?.setAttribute('d', f.accent)
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
    <g ref={root} strokeLinecap="round">
      <path ref={backPath} d={STILL.back} stroke="var(--color-ink)" strokeOpacity="0.18" strokeWidth="1.3" />
      <path ref={frontPath} d={STILL.front} stroke="var(--color-ink)" strokeOpacity="0.8" strokeWidth="1.6" />
      <path ref={accentPath} d={STILL.accent} stroke="var(--color-accent)" strokeWidth="3" />
    </g>
  )
}

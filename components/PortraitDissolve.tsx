// Home-page portrait whose lower part dissolves into dots: a CSS mask that is solid above
// y = 760 and breaks into shrinking, thinning circles below it (portrait pixel space, 1000 × 1117).

import Image from 'next/image'

const IMG = { w: 1000, h: 1117 }

function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const DISSOLVE_TOP = 760

// The dots of the dissolve, in portrait pixel space.
const DISSOLVE_DOTS: { x: number; y: number; r: number }[] = (() => {
  const rand = rng(42)
  const step = 16
  const dots: { x: number; y: number; r: number }[] = []
  for (let y = DISSOLVE_TOP; y < IMG.h + step; y += step) {
    const t = (y - DISSOLVE_TOP) / (IMG.h - DISSOLVE_TOP)
    for (let x = 0; x < IMG.w + step; x += step) {
      const keep = 1 - t * 1.05 + (rand() - 0.5) * 0.5
      if (keep < 0.15) continue
      const r = 11.6 * Math.pow(Math.max(0, 1 - t * 0.85), 0.7) * (0.75 + rand() * 0.35)
      dots.push({ x: +(x + (rand() - 0.5) * 3).toFixed(1), y, r: +r.toFixed(1) })
    }
  }
  return dots
})()

const MASK = (() => {
  const circles = DISSOLVE_DOTS.map((d) => `<circle cx='${d.x}' cy='${d.y}' r='${d.r}'/>`).join('')
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${IMG.w} ${IMG.h}' preserveAspectRatio='none'><rect width='${IMG.w}' height='${DISSOLVE_TOP}'/>${circles}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
})()

// `fill` = fill a positioned parent instead of sizing itself
export default function PortraitDissolve({ fill = false }: { fill?: boolean }) {
  return (
    <div
      className={fill ? 'absolute inset-0' : 'relative mx-auto aspect-[1000/1117] w-full max-w-md'}
      style={{ maskImage: MASK, WebkitMaskImage: MASK, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}
    >
      <Image
        src="/portrait-hero.webp"
        preload
        alt="Portrait of Nithik Vairamuthu"
        fill
        sizes="(max-width: 768px) 70vw, 400px"
        className="object-contain"
      />
    </div>
  )
}

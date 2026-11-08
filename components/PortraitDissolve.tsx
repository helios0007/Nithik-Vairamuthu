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
      circles += `<circle cx='${(x + (rand() - 0.5) * 3).toFixed(1)}' cy='${y}' r='${r.toFixed(1)}'/>`
    }
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${IMG.w} ${IMG.h}' preserveAspectRatio='none'><rect width='${IMG.w}' height='${top}'/>${circles}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
})()

export default function PortraitDissolve() {
  return (
    <div
      className="relative mx-auto aspect-[1000/1117] w-full max-w-md"
      style={{ maskImage: MASK, WebkitMaskImage: MASK, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}
    >
      <Image
        src="/portrait-hero.webp"
        preload
        alt="Portrait of Nithik Vairamuthu"
        fill
        sizes="(max-width: 768px) 90vw, 448px"
        className="object-contain"
      />
    </div>
  )
}

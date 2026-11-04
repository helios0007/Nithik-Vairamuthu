'use client'

// OASIS thumbnail: Barcelona's Eixample grid (chamfered blocks, cut by the Diagonal) shaded by heat.
// Climate shelters glow blue and their cooling spreads block by block along the streets, then fades.
// Drawn inside ArtefactThumb.tsx. The loop pauses off-screen; reduced motion shows one still frame.

import { useEffect, useRef } from 'react'

const INK = 'var(--color-ink)'
const ACCENT = 'var(--color-accent)'

const COLS = 12
const ROWS = 8
const PITCH = 30 // block + street
const SIZE = 23 // block width
const CHAMFER = 6 // the cut corners (xamfrans)
const X0 = 20
const Y0 = 18

const CYCLE = 6.5 // seconds per shelter pulse
const STEP = 0.45 // seconds for the cooling to reach the next block
const REACH = 3 // blocks of cooling around each shelter

type Block = { c: number; r: number; d: string; heat: number }

function buildBlocks(): Block[] {
  const heatAt = (x: number, y: number) =>
    Math.min(
      1,
      Math.exp(-(((x - 175) / 110) ** 2 + ((y - 120) / 75) ** 2)) * 0.95 +
        Math.exp(-(((x - 320) / 50) ** 2 + ((y - 200) / 45) ** 2)) * 0.45
    )
  const h = SIZE / 2
  const k = CHAMFER
  const out: Block[] = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cx = X0 + c * PITCH + PITCH / 2
      const cy = Y0 + r * PITCH + PITCH / 2
      // the Diagonal: a band from bottom-left to top-right with no blocks
      if (Math.abs(cy - Y0 - (ROWS * PITCH - (cx - X0) * 0.55)) < PITCH * 0.45) continue
      const pts = [
        [cx - h + k, cy - h], [cx + h - k, cy - h], [cx + h, cy - h + k], [cx + h, cy + h - k],
        [cx + h - k, cy + h], [cx - h + k, cy + h], [cx - h, cy + h - k], [cx - h, cy - h + k],
      ]
      out.push({ c, r, heat: heatAt(cx, cy), d: 'M ' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ') + ' Z' })
    }
  }
  return out
}

const BLOCKS = buildBlocks()
// climate shelters: grid column, row and when each starts its pulse
const SHELTERS = [
  { c: 4, r: 2, delay: 0 },
  { c: 8, r: 5, delay: 1.4 },
  { c: 2, r: 7, delay: 2.8 },
]

/** How cooled a block is at time t (0 = not at all, 1 = shelter itself) */
function coolness(b: Block, t: number) {
  let cool = 0
  for (const s of SHELTERS) {
    const local = (((t - s.delay) % CYCLE) + CYCLE) % CYCLE
    const dist = Math.abs(b.c - s.c) + Math.abs(b.r - s.r) // distance along the streets
    if (dist <= Math.min(local / STEP, REACH)) {
      const fadeOut = local > CYCLE - 1 ? CYCLE - local : 1
      cool = Math.max(cool, (1 - dist / (REACH + 1)) * fadeOut)
    }
  }
  return cool
}

const style = (b: Block, cool: number) =>
  cool > 0.05
    ? { fill: ACCENT, opacity: (0.12 + cool * 0.8).toFixed(2) }
    : { fill: INK, opacity: (0.05 + b.heat * 0.7).toFixed(2) }

export default function EixampleHeat() {
  const root = useRef<SVGGElement>(null)

  useEffect(() => {
    const g = root.current
    if (!g) return
    const paths = Array.from(g.querySelectorAll('path'))
    const draw = (t: number) =>
      BLOCKS.forEach((b, i) => {
        const s = style(b, coolness(b, t))
        paths[i]?.setAttribute('fill', s.fill)
        paths[i]?.setAttribute('fill-opacity', s.opacity)
      })

    // Reduced motion: one still frame with the cooling fully spread
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(SHELTERS[2].delay + REACH * STEP + 0.1)
      return
    }

    let raf = 0
    let running = false
    let clock = 0
    let last = 0
    const tick = (now: number) => {
      clock += Math.min(0.05, (now - last) / 1000)
      last = now
      draw(clock)
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
      {BLOCKS.map((b) => {
        // first paint: heat only, shelters lit
        const isShelter = SHELTERS.some((s) => s.c === b.c && s.r === b.r)
        const s = style(b, isShelter ? 1 : 0)
        return <path key={`${b.c}-${b.r}`} d={b.d} fill={s.fill} fillOpacity={s.opacity} />
      })}
    </g>
  )
}

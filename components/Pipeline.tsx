'use client'

// A project's pipeline as one straight line of blocks, one per stage (left → right; top → bottom on phones).
// A dot of "data" runs along the line and through each block, lighting it up as it passes.
// The loop pauses off-screen; under reduced motion only the static line and blocks are shown.

import { useEffect, useRef } from 'react'
import type { PipelineStage } from '../data/projects'

const TRAVEL = 5.5 // seconds for the dot to cross the whole pipeline
const PAUSE = 1.2 // seconds before it starts again

/** `notes`: one short line per stage, shown under each block (inside it on phones) */
export default function Pipeline({ stages, notes }: { stages: PipelineStage[]; notes?: string[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const blocks = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const root = wrap.current
    const d = dot.current
    if (!root || !d) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let running = false
    let clock = 0
    let last = 0

    const tick = (now: number) => {
      clock = (clock + Math.min(0.05, (now - last) / 1000)) % (TRAVEL + PAUSE)
      last = now
      const o = root.getBoundingClientRect()
      const rects = blocks.current.map((b) => b?.getBoundingClientRect())
      const first = rects[0]
      const second = rects[1]
      const across = !!first && !!second && second.left >= first.right - 1 // row (desktop) or column (phone)
      const length = across ? o.width : o.height
      const pos = Math.min(1, clock / TRAVEL) * length
      const visible = clock < TRAVEL

      d.style.transform = across ? `translate(${pos}px, ${o.height / 2}px)` : `translate(${o.width / 2}px, ${pos}px)`
      d.style.opacity = visible ? '1' : '0'

      rects.forEach((r, i) => {
        const el = blocks.current[i]
        if (!r || !el) return
        const start = across ? r.left - o.left : r.top - o.top
        const end = across ? r.right - o.left : r.bottom - o.top
        if (visible && pos >= start && pos <= end) el.dataset.active = ''
        else delete el.dataset.active
      })
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
    io.observe(root)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [stages])

  return (
    <div>
      <div ref={wrap} className="relative">
        {/* the line, through the centre of every block */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line md:inset-x-0 md:inset-y-auto md:top-1/2 md:left-0 md:h-px md:w-auto md:translate-x-0"
        />
        {/* the data dot, positioned by the loop above */}
        <div ref={dot} aria-hidden className="absolute top-0 left-0 opacity-0" style={{ willChange: 'transform' }}>
          <span className="block size-2 -translate-1/2 rounded-full bg-accent shadow-[0_0_12px_3px_var(--color-accent)]" />
        </div>

        <ol className="relative grid grid-cols-1 gap-12 md:grid-flow-col md:auto-cols-[minmax(0,1fr)] md:grid-cols-none md:gap-6">
          {stages.map((stage, i) => {
            const mine = stage.nodes.some((n) => n.mine)
            const tools = stage.nodes.map((n) => n.detail).filter(Boolean)
            return (
              <li
                key={stage.label}
                ref={(el) => {
                  blocks.current[i] = el
                }}
                className={`group relative flex min-w-0 flex-col rounded-lg border bg-paper-2 p-4 transition-[border-color,box-shadow] duration-300 data-[active]:border-accent data-[active]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_15%,transparent)] ${
                  mine ? 'border-accent/50' : 'border-line'
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-data-[active]:text-accent">
                  {String(i + 1).padStart(2, '0')} · {stage.label}
                </p>
                <ul className="mt-2 space-y-1 text-sm font-bold leading-5">
                  {stage.nodes.map((n) => (
                    <li key={n.id} className={n.mine ? 'text-accent' : undefined}>
                      {n.title}
                    </li>
                  ))}
                </ul>
                {!notes && tools.length > 0 && <p className="mt-2 text-xs leading-5 text-muted">{tools.join(' · ')}</p>}
                {notes?.[i] && (
                  <p className="mt-3 border-t border-line pt-3 text-sm leading-6 text-muted md:hidden">{notes[i]}</p>
                )}
                {mine && (
                  <p className="absolute -bottom-6 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    ↑ My part
                  </p>
                )}
              </li>
            )
          })}
        </ol>
      </div>
      {notes && (
        <ol className="mt-10 hidden gap-6 md:grid md:grid-flow-col md:auto-cols-[minmax(0,1fr)]">
          {stages.map((stage, i) => (
            <li key={stage.label} className="px-1 text-sm leading-6 text-muted">
              {notes[i]}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

'use client'

// Flowchart of a project's pipeline: stages left → right, nodes as boxes, connectors measured from
// the boxes' real positions. On phones the stages stack and a single arrow sits between them.
// Nodes marked `mine` (what Nithik built) are outlined in the accent colour.

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { PipelineStage } from '../data/projects'
import DrawOnView from './DrawOnView'

type Edge = { key: string; d: string; mine: boolean }

const delay = (s: number) => ({ '--d': `${s.toFixed(2)}s` }) as React.CSSProperties

export default function Pipeline({ stages }: { stages: PipelineStage[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const boxes = useRef(new Map<string, HTMLElement>())
  const [edges, setEdges] = useState<Edge[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })

  const nodes = stages.flatMap((s) => s.nodes)
  const mine = new Set(nodes.filter((n) => n.mine).map((n) => n.id))

  const measure = useCallback(() => {
    const root = wrap.current
    if (!root) return
    const o = root.getBoundingClientRect()
    const rect = (id: string) => boxes.current.get(id)?.getBoundingClientRect()
    const links = nodes.flatMap((n) => (n.to ?? []).map((to) => ({ from: n.id, to })))
    const sideBySide = (a: DOMRect, b: DOMRect) => b.left >= a.right - 1

    // Where several connectors leave or enter the same side of a box, spread them along that side
    const port = (id: string, side: 'out' | 'in', other: string) => {
      const peers = links
        .filter((l) => (side === 'out' ? l.from === id : l.to === id))
        .map((l) => (side === 'out' ? l.to : l.from))
        .filter((pid) => {
          const a = rect(side === 'out' ? id : pid)
          const b = rect(side === 'out' ? pid : id)
          return a && b && sideBySide(a, b)
        })
        .sort((x, y) => rect(x)!.top + rect(x)!.height / 2 - (rect(y)!.top + rect(y)!.height / 2))
      const r = rect(id)!
      const i = peers.indexOf(other)
      const span = Math.min(r.height * 0.6, 18 * (peers.length - 1))
      return r.top + r.height / 2 - span / 2 + (peers.length > 1 ? (span * i) / (peers.length - 1) : 0) - o.top
    }

    const next: Edge[] = []
    for (const { from, to } of links) {
      const a = rect(from)
      const b = rect(to)
      if (!a || !b) continue
      let d: string
      if (sideBySide(a, b)) {
        // side by side: right edge → left edge
        const x1 = a.right - o.left
        const y1 = port(from, 'out', to)
        const x2 = b.left - o.left - 4
        const y2 = port(to, 'in', from)
        const c = (x2 - x1) / 2
        d = `M ${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`
      } else {
        // stacked: bottom edge → top edge
        const x1 = a.left + a.width / 2 - o.left
        const y1 = a.bottom - o.top
        const x2 = b.left + b.width / 2 - o.left
        const y2 = b.top - o.top - 4
        const c = (y2 - y1) / 2
        d = `M ${x1} ${y1} C ${x1} ${y1 + c}, ${x2} ${y2 - c}, ${x2} ${y2}`
      }
      next.push({ key: `${from}-${to}`, d, mine: mine.has(from) || mine.has(to) })
    }
    setEdges(next)
    setSize({ w: o.width, h: o.height })
    // nodes come from props and only change with them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (wrap.current) ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [measure])

  return (
    <DrawOnView>
      <div ref={wrap} className="relative">
        <svg
          className="ink-fade pointer-events-none absolute inset-0 hidden overflow-visible md:block"
          style={delay(0.5)}
          width={size.w}
          height={size.h}
          aria-hidden
        >
          <defs>
            {(['line', 'accent'] as const).map((c) => (
              <marker key={c} id={`arrow-${c}`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0.5 L 7 4 L 0 7.5" fill="none" stroke={c === 'accent' ? 'var(--color-accent)' : 'var(--color-muted)'} strokeWidth="1.2" />
              </marker>
            ))}
          </defs>
          {edges.map((e) => (
            <path
              key={e.key}
              className="ink-draw"
              style={delay(0.5)}
              pathLength={1}
              d={e.d}
              fill="none"
              stroke={e.mine ? 'var(--color-accent)' : 'var(--color-muted)'}
              strokeOpacity={e.mine ? 0.9 : 0.55}
              strokeWidth="1"
              markerEnd={`url(#arrow-${e.mine ? 'accent' : 'line'})`}
            />
          ))}
        </svg>

        <ol className="relative grid grid-cols-1 gap-8 md:grid-flow-col md:auto-cols-[minmax(0,1fr)] md:grid-cols-none md:gap-10">
          {stages.map((stage, si) => (
            <li key={stage.label} className="ink-fade flex min-w-0 flex-col" style={delay(0.1 + si * 0.12)}>
              {si > 0 && (
                // phones: a simple arrow between stages instead of connectors
                <span aria-hidden className="-mt-4 mb-3 text-center text-muted md:hidden">
                  ↓
                </span>
              )}
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">{stage.label}</p>
              <div
                className={`grid flex-1 gap-3 md:flex md:flex-col md:justify-center md:gap-16 ${
                  stage.nodes.length > 1 ? 'grid-cols-[repeat(2,minmax(0,1fr))]' : 'grid-cols-1'
                }`}
              >
                {stage.nodes.map((n) => (
                  <div
                    key={n.id}
                    ref={(el) => {
                      if (el) boxes.current.set(n.id, el)
                      else boxes.current.delete(n.id)
                    }}
                    className={`relative min-w-0 break-words rounded-lg border bg-paper-2 p-3 text-sm leading-5 ${
                      n.mine ? 'border-accent' : 'border-line'
                    }`}
                  >
                    {n.mine && (
                      <p className="absolute -top-2 left-2.5 bg-paper px-1.5 font-mono text-[10px] leading-4 uppercase tracking-[0.14em] text-accent">
                        My part
                      </p>
                    )}
                    <p className="font-bold">{n.title}</p>
                    {n.detail && <p className="mt-1 text-muted">{n.detail}</p>}
                    {n.output && <p className="mt-2 border-t border-line pt-2 text-muted">→ {n.output}</p>}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </DrawOnView>
  )
}

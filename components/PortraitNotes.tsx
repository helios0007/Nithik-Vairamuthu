// Home-page portrait: the photo with its dot dissolve, and hand-drawn sketch notes around it
// (blue arrows and handwritten labels) that draw themselves on load. Animation is CSS only
// (.sk-line / .sk-text in globals.css); reduced motion shows the finished notes.
// Coordinates are in the portrait's pixel space (1000 × 1117); the frame adds margin for the notes.

import { Caveat } from 'next/font/google'
import PortraitDissolve from './PortraitDissolve'

const hand = Caveat({ subsets: ['latin'], weight: ['500'], display: 'swap' })

const IMG = { w: 1000, h: 1117 }
const VB = { x: -200, y: -40, w: 1440, h: 1180 }
const pct = (v: number, of: number) => `${(v / of) * 100}%`

// Edit the words here. tx/ty = where the label starts; d = arrow line; head = arrowhead strokes.
const NOTES = [
  {
    text: 'architect, mostly',
    tx: -195,
    ty: 395,
    d: 'M -60 425 C 20 470, 110 560, 212 628',
    head: 'M 212 628 l -32 -2 M 212 628 l -10 -30',
  },
  {
    text: 'keeps asking “what if?”',
    tx: 640,
    ty: 45,
    d: 'M 760 90 C 700 62, 622 72, 578 122',
    head: 'M 578 122 l 4 -31 M 578 122 l 29 9',
  },
  {
    text: 'Barcelona, for now',
    tx: 780,
    ty: 1080,
    d: 'M 810 1020 C 770 1046, 708 1036, 664 994',
    head: 'M 664 994 l 31 3 M 664 994 l 2 30',
  },
]

export default function PortraitNotes() {
  return (
    <div className="relative mx-auto w-full max-w-xl md:max-w-none xl:w-[118%]" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
      <div
        className="absolute"
        style={{ left: pct(-VB.x, VB.w), top: pct(-VB.y, VB.h), width: pct(IMG.w, VB.w), height: pct(IMG.h, VB.h) }}
      >
        <PortraitDissolve fill />
      </div>
      <svg
        aria-hidden
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <g fill="none" stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {NOTES.map((n, i) => (
            <g key={n.text}>
              <path className="sk-line" pathLength={1} d={n.d} style={{ animationDelay: `${0.4 + i * 0.5}s` }} />
              <path className="sk-line" pathLength={1} d={n.head} style={{ animationDelay: `${0.9 + i * 0.5}s` }} />
            </g>
          ))}
        </g>
        {NOTES.map((n, i) => (
          <text
            key={n.text}
            className={`sk-text ${hand.className}`}
            x={n.tx}
            y={n.ty}
            fontSize="70"
            fill="var(--color-ink)"
            style={{ animationDelay: `${0.2 + i * 0.5}s` }}
          >
            {n.text}
          </text>
        ))}
      </svg>
    </div>
  )
}

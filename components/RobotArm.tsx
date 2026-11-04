'use client'

// A two-joint robot arm that traces the crack and lays the repair line behind its nozzle.
// Drawn inside the Crack Detection thumbnail (ArtefactThumb.tsx). Joints are solved with
// simple two-link inverse kinematics each frame; the loop pauses off-screen and under reduced motion.

import { useEffect, useRef } from 'react'

const INK = 'var(--color-ink)'
const ACCENT = 'var(--color-accent)'
const PAPER = 'var(--color-paper)'

const BASE: [number, number] = [240, 22] // ceiling mount
const L1 = 110 // upper arm
const L2 = 110 // forearm
const TOOL = 32 // vertical tool from wrist down to the nozzle, keeps the arm clear of the crack
const REST: [number, number] = [262, 128] // where the nozzle waits between passes

// Timeline of one loop, in seconds
const APPROACH = 1.0
const TRACE = 5.5
const HOLD = 0.6
const RETURN = 1.4
const CYCLE = APPROACH + TRACE + HOLD + RETURN

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
const lerp = (a: [number, number], b: [number, number], t: number): [number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
]

/** Elbow and wrist positions for a nozzle target (wrist sits TOOL above the nozzle) */
function solve([tx, ty]: [number, number]) {
  const wrist: [number, number] = [tx, ty - TOOL]
  const dx = wrist[0] - BASE[0]
  const dy = wrist[1] - BASE[1]
  const dist = Math.min(Math.hypot(dx, dy), L1 + L2 - 0.5)
  const toTarget = Math.atan2(dy, dx)
  const inner = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + dist * dist - L2 * L2) / (2 * L1 * dist))))
  const shoulder = toTarget - inner
  const elbow: [number, number] = [BASE[0] + Math.cos(shoulder) * L1, BASE[1] + Math.sin(shoulder) * L1]
  return { elbow, wrist, tip: [tx, ty] as [number, number] }
}

/** Point at fraction p (0–1) of the polyline's length */
function along(pts: number[][], cum: number[], p: number): [number, number] {
  const target = p * cum[cum.length - 1]
  let i = 1
  while (i < cum.length - 1 && cum[i] < target) i++
  const seg = cum[i] - cum[i - 1] || 1
  const t = (target - cum[i - 1]) / seg
  return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t]
}

/** Arm pose and repair progress at time t (seconds into the loop) */
function frame(t: number, pts: number[][], cum: number[]) {
  const start = along(pts, cum, 0)
  const end = along(pts, cum, 1)
  if (t < APPROACH) return { tip: lerp(REST, start, ease(t / APPROACH)), repair: 0, fade: 1, active: false }
  t -= APPROACH
  if (t < TRACE) {
    const p = ease(t / TRACE)
    return { tip: along(pts, cum, p), repair: p, fade: 1, active: true }
  }
  t -= TRACE
  if (t < HOLD) return { tip: end, repair: 1, fade: 1, active: false }
  t -= HOLD
  const r = ease(t / RETURN)
  return { tip: lerp(end, REST, r), repair: 1, fade: 1 - r, active: false }
}

export default function RobotArm({ crack }: { crack: number[][] }) {
  const root = useRef<SVGGElement>(null)
  const upper = useRef<SVGLineElement>(null)
  const fore = useRef<SVGLineElement>(null)
  const elbowJoint = useRef<SVGCircleElement>(null)
  const head = useRef<SVGGElement>(null)
  const spark = useRef<SVGCircleElement>(null)
  const repair = useRef<SVGPathElement>(null)

  const repairPath = 'M ' + crack.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')
  const rest = solve(REST)

  useEffect(() => {
    const cum = crack.reduce<number[]>(
      (acc, p, i) => [...acc, i === 0 ? 0 : acc[i - 1] + Math.hypot(p[0] - crack[i - 1][0], p[1] - crack[i - 1][1])],
      []
    )

    const draw = (t: number) => {
      const f = frame(t, crack, cum)
      const { elbow, wrist, tip } = solve(f.tip)
      upper.current?.setAttribute('x2', elbow[0].toFixed(1))
      upper.current?.setAttribute('y2', elbow[1].toFixed(1))
      fore.current?.setAttribute('x1', elbow[0].toFixed(1))
      fore.current?.setAttribute('y1', elbow[1].toFixed(1))
      fore.current?.setAttribute('x2', wrist[0].toFixed(1))
      fore.current?.setAttribute('y2', wrist[1].toFixed(1))
      elbowJoint.current?.setAttribute('cx', elbow[0].toFixed(1))
      elbowJoint.current?.setAttribute('cy', elbow[1].toFixed(1))
      head.current?.setAttribute('transform', `translate(${tip[0].toFixed(1)} ${tip[1].toFixed(1)})`)
      spark.current?.setAttribute('opacity', f.active ? String(0.55 + 0.45 * Math.sin(t * 40)) : '0')
      if (repair.current) {
        repair.current.style.strokeDashoffset = String(1 - f.repair)
        repair.current.style.opacity = String(f.fade)
      }
    }

    // Reduced motion: one still pose, mid-repair
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(APPROACH + TRACE * 0.6)
      return
    }

    let raf = 0
    let running = false
    let clock = 0 // seconds into the loop
    let last = 0
    const tick = (now: number) => {
      clock = (clock + Math.min(0.05, (now - last) / 1000)) % CYCLE
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
    if (root.current) io.observe(root.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [crack])

  return (
    <g ref={root}>
      {/* repair bead, revealed behind the nozzle */}
      <path
        ref={repair}
        d={repairPath}
        pathLength={1}
        fill="none"
        stroke={ACCENT}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
      />

      {/* ceiling mount */}
      <g stroke={INK} strokeWidth="1" fill="none">
        <line x1={BASE[0] - 26} y1={BASE[1] - 12} x2={BASE[0] + 26} y2={BASE[1] - 12} />
        <path d={`M ${BASE[0] - 12} ${BASE[1] - 12} v 6 h 24 v -6`} />
        {[-22, -12, -2, 8, 18].map((x) => (
          <line key={x} x1={BASE[0] + x} y1={BASE[1] - 12} x2={BASE[0] + x + 6} y2={BASE[1] - 18} strokeOpacity="0.5" />
        ))}
      </g>

      {/* links */}
      <g stroke={INK} strokeLinecap="round">
        <line ref={upper} x1={BASE[0]} y1={BASE[1]} x2={rest.elbow[0]} y2={rest.elbow[1]} strokeWidth="5" strokeOpacity="0.9" />
        <line ref={fore} x1={rest.elbow[0]} y1={rest.elbow[1]} x2={rest.wrist[0]} y2={rest.wrist[1]} strokeWidth="3.5" strokeOpacity="0.9" />
      </g>

      {/* joints */}
      <circle cx={BASE[0]} cy={BASE[1]} r="7" fill={PAPER} stroke={INK} strokeWidth="1.25" />
      <circle cx={BASE[0]} cy={BASE[1]} r="2" fill={INK} />
      <circle ref={elbowJoint} cx={rest.elbow[0]} cy={rest.elbow[1]} r="5.5" fill={PAPER} stroke={INK} strokeWidth="1.25" />

      {/* wrist, vertical tool and nozzle (drawn relative to the nozzle tip) */}
      <g ref={head} transform={`translate(${REST[0]} ${REST[1]})`}>
        <rect x="-3.5" y={-TOOL + 3} width="7" height={TOOL - 13} rx="1" fill={PAPER} stroke={INK} strokeWidth="1.25" />
        <path d="M -3.5 -10 L 3.5 -10 L 1 -3 L -1 -3 Z" fill={PAPER} stroke={INK} strokeWidth="1.25" strokeLinejoin="round" />
        <circle cy={-TOOL} r="4.5" fill={PAPER} stroke={INK} strokeWidth="1.25" />
        <circle ref={spark} r="6" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0" />
        <circle r="1.5" fill={ACCENT} />
      </g>
    </g>
  )
}

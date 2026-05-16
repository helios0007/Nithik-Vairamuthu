'use client'

import { useEffect, useRef } from 'react'

export default function JarvisBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    let animationId: number
    let W: number, H: number, cx: number, cy: number
    let time = 0

    function resize() {
      if (!canvas) return
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      cx = W / 2
      cy = H / 2
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Stars ─────────────────────────────────────────────────
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.1,
      opacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    // ── Dust ──────────────────────────────────────────────────
    const dust = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.0 + 0.2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.2 + 0.05,
    }))

    // ── Planets ───────────────────────────────────────────────
    const planets = [
      {
        label: 'P1',
        orbitR: 120,
        size: 4,
        speed: 0.0012,
        angle: 0.4,
        color: 'rgba(0, 220, 255, 0.9)',
        glowColor: 'rgba(0, 200, 255, 0.3)',
        glowSize: 12,
        ring: false,
        tilt: 0,
      },
      {
        label: 'P2',
        orbitR: 210,
        size: 8,
        speed: 0.0007,
        angle: 2.1,
        color: 'rgba(100, 210, 255, 0.85)',
        glowColor: 'rgba(80, 190, 255, 0.25)',
        glowSize: 22,
        ring: true,
        tilt: 0.3,
      },
      {
        label: 'P3',
        orbitR: 300,
        size: 5,
        speed: 0.0005,
        angle: 4.5,
        color: 'rgba(160, 230, 255, 0.75)',
        glowColor: 'rgba(140, 210, 255, 0.2)',
        glowSize: 14,
        ring: false,
        tilt: 0,
      },
      {
        label: 'P4',
        orbitR: 400,
        size: 13,
        speed: 0.00025,
        angle: 1.0,
        color: 'rgba(40, 140, 255, 0.8)',
        glowColor: 'rgba(40, 140, 255, 0.22)',
        glowSize: 32,
        ring: true,
        tilt: 0.5,
      },
      {
        label: 'P5',
        orbitR: 500,
        size: 6,
        speed: 0.00035,
        angle: 3.3,
        color: 'rgba(180, 240, 255, 0.65)',
        glowColor: 'rgba(180, 230, 255, 0.15)',
        glowSize: 16,
        ring: false,
        tilt: 0,
      },
      {
        label: 'P6',
        orbitR: 590,
        size: 3,
        speed: 0.0009,
        angle: 5.8,
        color: 'rgba(220, 245, 255, 0.5)',
        glowColor: 'rgba(200, 240, 255, 0.12)',
        glowSize: 8,
        ring: false,
        tilt: 0,
      },
    ]

    // ── Nebula ────────────────────────────────────────────────
function drawNebula() {
  const n1 = ctx.createRadialGradient(cx * 0.3, cy * 0.4, 0, cx * 0.3, cy * 0.4, W * 0.45)
  n1.addColorStop(0, 'rgba(5, 15, 40, 0.10)')
  n1.addColorStop(0.5, 'rgba(2, 8, 25, 0.06)')
  n1.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = n1
  ctx.fillRect(0, 0, W, H)

  const n2 = ctx.createRadialGradient(cx * 1.7, cy * 1.4, 0, cx * 1.7, cy * 1.4, W * 0.4)
  n2.addColorStop(0, 'rgba(0, 20, 40, 0.08)')
  n2.addColorStop(0.5, 'rgba(0, 10, 25, 0.04)')
  n2.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = n2
  ctx.fillRect(0, 0, W, H)

  const n3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180)
  n3.addColorStop(0, 'rgba(0, 30, 50, 0.06)')
  n3.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = n3
  ctx.fillRect(0, 0, W, H)
}
    // ── Stars with twinkle ────────────────────────────────────
    function drawStars() {
      stars.forEach((s) => {
        const twinkle = 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset)
        const opacity = s.opacity * (0.6 + 0.4 * twinkle)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 230, 255, ${opacity})`
        ctx.fill()
      })
    }

    // ── Dust ──────────────────────────────────────────────────
    function drawDust() {
      dust.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150, 210, 255, ${p.opacity})`
        ctx.fill()
      })
    }

    // ── Orbit rings ───────────────────────────────────────────
    function drawOrbits() {
      planets.forEach((p) => {
        ctx.beginPath()
        ctx.arc(cx, cy, p.orbitR, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0, 180, 255, 0.06)'
        ctx.lineWidth = 0.8
        ctx.setLineDash([5, 14])
        ctx.stroke()
        ctx.setLineDash([])

        ctx.beginPath()
        ctx.arc(cx, cy, p.orbitR, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.02)'
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }

    // ── Radial grid ───────────────────────────────────────────
    function drawRadialGrid() {
      const count = 12
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(a) * 80, cy + Math.sin(a) * 80)
        ctx.lineTo(cx + Math.cos(a) * 620, cy + Math.sin(a) * 620)
        ctx.strokeStyle = 'rgba(0, 180, 255, 0.025)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    // ── Planet ────────────────────────────────────────────────
    function drawPlanet(p: (typeof planets)[0]) {
      const x = cx + Math.cos(p.angle) * p.orbitR
      const y = cy + Math.sin(p.angle) * p.orbitR

      // glow
      const grd = ctx.createRadialGradient(x, y, 0, x, y, p.glowSize)
      grd.addColorStop(0, p.glowColor)
      grd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.arc(x, y, p.glowSize, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // body
      const bodyGrd = ctx.createRadialGradient(
        x - p.size * 0.3, y - p.size * 0.3, 0,
        x, y, p.size
      )
      bodyGrd.addColorStop(0, 'rgba(255, 255, 255, 0.6)')
      bodyGrd.addColorStop(0.4, p.color)
      bodyGrd.addColorStop(1, p.glowColor)
      ctx.beginPath()
      ctx.arc(x, y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = bodyGrd
      ctx.fill()

      // ring
      if (p.ring) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(p.tilt)
        ctx.scale(1, 0.28)

        ctx.beginPath()
        ctx.arc(0, 0, p.size * 2.6, 0, Math.PI * 2)
        ctx.strokeStyle = p.glowColor
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(0, 0, p.size * 1.9, 0, Math.PI * 2)
        ctx.strokeStyle = p.glowColor
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.restore()
      }

      // label
      ctx.font = '7px monospace'
      ctx.fillStyle = 'rgba(0, 200, 255, 0.25)'
      ctx.fillText(p.label, x + p.size + 3, y - p.size - 2)
    }

    // ── Center star ───────────────────────────────────────────
    function drawCenterStar() {
      const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70)
      bloom.addColorStop(0, 'rgba(0, 220, 255, 0.22)')
      bloom.addColorStop(0.4, 'rgba(0, 180, 255, 0.08)')
      bloom.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 70, 0, Math.PI * 2)
      ctx.fillStyle = bloom
      ctx.fill()

      const mid = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20)
      mid.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
      mid.addColorStop(0.5, 'rgba(100, 220, 255, 0.6)')
      mid.addColorStop(1, 'rgba(0, 180, 255, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 20, 0, Math.PI * 2)
      ctx.fillStyle = mid
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, 5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(240, 250, 255, 1)'
      ctx.fill()

      const pulse = 0.5 + 0.5 * Math.sin(time * 0.03)
      ctx.beginPath()
      ctx.arc(cx, cy, 14 + pulse * 4, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(0, 200, 255, ${0.12 + pulse * 0.08})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // ── HUD labels ────────────────────────────────────────────
    function drawHUD() {
      ctx.font = '9px monospace'
      ctx.fillStyle = 'rgba(0, 200, 255, 0.18)'

      const labels = [
        { x: cx + 175, y: cy - 25,  text: 'SYS.ACTIVE'  },
        { x: cx - 250, y: cy + 55,  text: 'NET.OK'       },
        { x: cx + 55,  y: cy - 215, text: 'AI.CORE'      },
        { x: cx - 190, y: cy - 150, text: '41.3°N 2.1°E' },
        { x: cx + 90,  y: cy + 320, text: 'IAAC // BCN'  },
      ]

      labels.forEach((l) => ctx.fillText(l.text, l.x, l.y))
    }

    // ── Animation loop ────────────────────────────────────────
       // ── Animation loop ────────────────────────────────────────
    function animate() {
      ctx.clearRect(0, 0, W, H)
      time++

      planets.forEach((p) => { p.angle += p.speed })

      drawNebula()
      drawStars()
      drawDust()
      drawRadialGrid()
      drawOrbits()
      planets.forEach(drawPlanet)
      drawCenterStar()
      drawHUD()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId)
      } else {
        animate()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])
   return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  )
}

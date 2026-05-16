'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Start offscreen so they don't flash at origin
    let mx = -200, my = -200
    let rx = -200, ry = -200
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      const target = e.target as Element
      const interactive = !!(target.closest('a, button, [role="button"], input, textarea, select'))
      ring.classList.toggle('cursor-ring--hovered', interactive)
    }

    const hide = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const show = () => { dot.style.opacity = '1'; ring.style.opacity = '1' }

    function tick() {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (dot) dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`
      if (ring) ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`
      rafId = requestAnimationFrame(tick)
    }
    tick()

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

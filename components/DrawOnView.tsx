'use client'

import { useEffect, useRef } from 'react'

// Marks its contents as "drawn" the first time they scroll into view,
// which starts the .ink-draw / .ink-fade sequence in globals.css.
export default function DrawOnView({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.drawn = 'true'
          io.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`draw-on-view ${className}`}>
      {children}
    </div>
  )
}

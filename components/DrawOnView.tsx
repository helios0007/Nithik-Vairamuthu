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
      // fire once the element's top is a fifth of the way up the screen (works for elements taller than the screen)
      { rootMargin: '0px 0px -20% 0px' }
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

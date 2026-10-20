'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// Fullscreen image viewer. Rendered into document.body so it sits above the background canvas.
export default function Lightbox({
  images,
  title,
  startIndex = 0,
  onClose,
}: {
  images: string[]
  title: string
  startIndex?: number
  onClose: () => void
}) {
  const [activeIndex, setActiveIndex] = useState(startIndex)
  const count = images.length
  const prev = () => setActiveIndex((i) => (i - 1 + count) % count)
  const next = () => setActiveIndex((i) => (i + 1) % count)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % count)
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + count) % count)
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [count, onClose])

  const arrowClass =
    'absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-black font-mono text-cyan-300 hover:border-cyan-400/50'

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} images`}
      className="fixed inset-0 flex flex-col bg-black"
      style={{ zIndex: 2147483647, isolation: 'isolate' }}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-cyan-400/10 px-6 py-4">
        <div className="font-mono text-[10px] uppercase tracking-widest">
          <p className="text-cyan-400/60">{title}</p>
          <p className="mt-1 text-cyan-400/30">
            {activeIndex + 1} / {count}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden font-mono text-[9px] uppercase tracking-widest text-zinc-600 sm:inline">
            ← → navigate · esc close
          </span>
          <button
            onClick={onClose}
            className="font-mono text-[11px] uppercase tracking-widest text-cyan-300 hover:text-white"
          >
            Close ✕
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {count > 1 && (
          <button onClick={prev} aria-label="Previous image" className={`${arrowClass} left-4`}>
            ←
          </button>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${title} — image ${activeIndex + 1}`}
          className="block max-h-full max-w-full object-contain"
        />
        {count > 1 && (
          <button onClick={next} aria-label="Next image" className={`${arrowClass} right-4`}>
            →
          </button>
        )}
      </div>
    </div>,
    document.body
  )
}

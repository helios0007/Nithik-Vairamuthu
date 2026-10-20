'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// Fullscreen image viewer, rendered into document.body above everything else.
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
    'absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black text-white hover:border-white/60'

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} images`}
      className="fixed inset-0 flex flex-col bg-black"
      style={{ zIndex: 2147483647, isolation: 'isolate' }}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="text-sm">
          <p className="font-medium text-white">{title}</p>
          <p className="mt-1 text-white/50">
            {activeIndex + 1} / {count}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden text-sm text-white/40 sm:inline">← → navigate · esc close</span>
          <button onClick={onClose} className="text-sm font-medium text-white hover:text-white/70">
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

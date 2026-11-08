'use client'

// Full width thesis slides. Each one opens full size in a dialog, because the slides carry
// small drawing text that needs the extra resolution.

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { LayerImage } from '../data/projects'

export default function ThesisSlides({ slides, priority }: { slides: LayerImage[]; priority?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<LayerImage | null>(null)

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => {
              setOpen(s)
              dialog.current?.showModal()
            }}
            aria-label={`Open full size: ${s.alt}`}
            className="relative block aspect-[2/1] w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover"
              priority={priority && i === 0}
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto max-h-[96vh] w-[96vw] max-w-none bg-transparent p-0 backdrop:bg-black/80"
      >
        {open && (
          <div className="relative">
            <Image src={open.src} alt={open.alt} width={open.width} height={open.height} sizes="96vw" className="h-auto w-full rounded-lg" />
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="absolute right-3 top-3 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink"
            >
              Close
            </button>
          </div>
        )}
      </dialog>
    </>
  )
}

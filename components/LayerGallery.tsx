'use client'

// A small slideshow of screenshots for one tool layer: a large stage with arrows, a caption,
// and a thumbnail strip. Arrow keys and swipe change slides; clicking the stage opens the
// image full size in a dialog (the screenshots are dense UI, so they need to be readable).

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { LayerImage } from '../data/projects'

export default function LayerGallery({ images, label }: { images: LayerImage[]; label: string }) {
  const [i, setI] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const startX = useRef<number | null>(null)
  const n = images.length
  const img = images[i]
  const go = (d: number) => setI((v) => (v + d + n) % n)

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    else if (e.key === 'ArrowLeft') go(-1)
    else return
    e.preventDefault()
  }

  const arrow =
    'grid size-10 place-items-center rounded-full border border-line bg-paper/80 text-ink backdrop-blur transition-colors hover:border-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

  return (
    <section aria-roledescription="carousel" aria-label={`${label} screenshots`} onKeyDown={onKey}>
      {/* stage */}
      <div
        className="group relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-paper-2"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return
          const dx = e.clientX - startX.current
          startX.current = null
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
        }}
      >
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          className="absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
          aria-label={`Open full size: ${img.alt}`}
        >
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-contain"
            priority={i === 0}
          />
        </button>
        {n > 1 && (
          <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
            <button type="button" onClick={() => go(-1)} aria-label="Previous screenshot" className={`pointer-events-auto ${arrow}`}>
              ←
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next screenshot" className={`pointer-events-auto ${arrow}`}>
              →
            </button>
          </div>
        )}
        <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-paper/80 px-2.5 py-1 font-mono text-[11px] tracking-[0.14em] text-muted backdrop-blur">
          {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
      </div>

      {/* caption */}
      <p aria-live="polite" className="mt-3 min-h-12 max-w-3xl text-sm leading-6 text-muted">
        {img.caption && <span className="text-ink">{img.caption}</span>}
      </p>

      {/* thumbnails */}
      {n > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((t, k) => (
            <button
              key={t.src}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show screenshot ${k + 1}: ${t.alt}`}
              aria-current={k === i}
              className={`relative aspect-[16/9] w-24 shrink-0 overflow-hidden rounded border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-28 ${
                k === i ? 'border-accent opacity-100' : 'border-line opacity-50 hover:opacity-90'
              }`}
            >
              <Image src={t.src} alt="" fill sizes="112px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      {/* full-size view */}
      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto max-h-[95vh] max-w-[95vw] overflow-auto rounded-lg border border-line bg-paper p-0 backdrop:bg-black/80"
      >
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="sticky top-2 left-full z-10 mr-2 rounded-full border border-line bg-paper/90 px-3 py-1 text-sm text-ink"
          autoFocus
        >
          Close ✕
        </button>
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="95vw" className="-mt-9 h-auto w-[min(95vw,2000px)]" />
      </dialog>
    </section>
  )
}

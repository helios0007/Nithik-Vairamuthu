'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [openAt, setOpenAt] = useState<number | null>(null)

  if (images.length === 0) return null

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpenAt(i)}
            className="group relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left"
            aria-label={`Open ${title} image ${i + 1} fullscreen`}
          >
            <Image
              src={src}
              alt={`${title} — portfolio spread ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-200 opacity-0 transition group-hover:opacity-100">
              View full ↗
            </span>
          </button>
        ))}
      </div>

      {openAt !== null && (
        <Lightbox images={images} title={title} startIndex={openAt} onClose={() => setOpenAt(null)} />
      )}
    </>
  )
}

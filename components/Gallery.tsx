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
            className="group relative aspect-[3/2] overflow-hidden rounded-xl bg-paper-2"
            aria-label={`Open ${title} image ${i + 1} fullscreen`}
          >
            <Image
              src={src}
              alt={`${title} — portfolio spread ${i + 1}`}
              fill
              quality={90}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-3 right-3 rounded-full bg-paper px-3 py-1 text-ink text-sm font-medium opacity-0 shadow transition group-hover:opacity-100">
              View full
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

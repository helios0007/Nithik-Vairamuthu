'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  cover?: string
  spreads?: string[]
  year?: string
  status?: string
  link?: string
  downloadFile?: string
  downloadLabel?: string
}

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  const images = project.spreads ?? (project.cover ? [project.cover] : [])

  // needed for portal — only runs client side
  useEffect(() => { setMounted(true) }, [])

  // keyboard navigation
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, images.length])

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const lightbox = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483647, // max possible z-index
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        isolation: 'isolate',
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          backgroundColor: '#000000',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid rgba(0,200,255,0.08)',
        }}
      >
        <div>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(0,200,255,0.5)', margin: 0 }}>
            {project.title}
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(0,200,255,0.25)', margin: '4px 0 0' }}>
            {activeIndex + 1} / {images.length}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(100,100,100,0.6)' }}>
            ← → navigate · esc close
          </span>
          <button
            onClick={() => setOpen(false)}
            style={{ fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(0,200,255,0.8)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Close ✕
          </button>
        </div>
      </div>

      {/* ── Image area ── */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
            style={{
              position: 'absolute', left: '16px', zIndex: 10,
              width: '40px', height: '40px', borderRadius: '50%',
              border: '1px solid rgba(0,200,255,0.2)',
              backgroundColor: '#000000',
              color: 'rgba(0,200,255,0.8)',
              fontFamily: 'monospace', fontSize: '16px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ←
          </button>
        )}

        <img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${project.title} spread ${activeIndex + 1}`}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            display: 'block',
            backgroundColor: '#000000',
          }}
        />

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
            style={{
              position: 'absolute', right: '16px', zIndex: 10,
              width: '40px', height: '40px', borderRadius: '50%',
              border: '1px solid rgba(0,200,255,0.2)',
              backgroundColor: '#000000',
              color: 'rgba(0,200,255,0.8)',
              fontFamily: 'monospace', fontSize: '16px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            →
          </button>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {images.length > 1 && (
        <div
          style={{
            flexShrink: 0,
            backgroundColor: '#000000',
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            overflowX: 'auto',
            padding: '16px 24px',
            borderTop: '1px solid rgba(0,200,255,0.08)',
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumb ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              style={{
                height: '48px', width: '64px',
                objectFit: 'cover',
                borderRadius: '8px',
                cursor: 'pointer',
                border: i === activeIndex
                  ? '2px solid rgba(0,200,255,0.8)'
                  : '1px solid rgba(255,255,255,0.1)',
                opacity: i === activeIndex ? 1 : 0.3,
                transition: 'opacity 0.2s, border 0.2s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* ── Card ─────────────────────────────────────────────── */}
      <div className="group flex flex-col rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">

        <div className="mb-3 flex items-center justify-between">
          {project.year && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
              {project.year}
            </span>
          )}
          {project.status && (
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cyan-300">
              {project.status}
            </span>
          )}
        </div>

        <h3 className="text-lg font-medium text-white">{project.title}</h3>

        <p className="mt-2 flex-1 text-sm leading-7 text-zinc-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {images.length > 0 && (
            <button
              onClick={() => { setActiveIndex(0); setOpen(true) }}
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-cyan-400 transition hover:text-cyan-300"
            >
              View Spreads ({images.length}) →
            </button>
          )}

          {project.downloadFile && (
            <a
              href={project.downloadFile}
              download
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-cyan-400 transition hover:text-cyan-300"
            >
              ↓ {project.downloadLabel ?? 'Download'}
            </a>
          )}
        </div>
      </div>

      {/* ── Portal lightbox — renders directly into document.body ── */}
      {open && mounted && images.length > 0 &&
        createPortal(lightbox, document.body)
      }
    </>
  )
}
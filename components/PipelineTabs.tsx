'use client'

// Several pipelines for one project (e.g. a tool's urban / building / unit layers), one tab each.
// Only the selected pipeline is shown, so the section stays short. The tabs are a pill switcher;
// layers not yet opened carry a small pulsing dot, and a hint invites the first click.

import { useId, useState } from 'react'
import type { PipelineLevel } from '../data/projects'
import LayerGallery from './LayerGallery'
import Pipeline from './Pipeline'
import Placeholder from './Placeholder'

export default function PipelineTabs({ levels }: { levels: PipelineLevel[] }) {
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]))
  const id = useId()
  const level = levels[active]

  const open = (i: number) => {
    setActive(i)
    setSeen((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (active + (e.key === 'ArrowRight' ? 1 : levels.length - 1)) % levels.length
    open(next)
    document.getElementById(`${id}-tab-${next}`)?.focus()
  }

  const allSeen = seen.size === levels.length

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div
          role="tablist"
          aria-label="Tool layers"
          className="inline-flex flex-wrap gap-1 rounded-full border border-line bg-paper-2 p-1"
          onKeyDown={onKey}
        >
          {levels.map((l, i) => {
            const isActive = i === active
            return (
              <button
                key={l.label}
                id={`${id}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`${id}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => open(i)}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive ? 'bg-ink text-paper' : 'text-muted hover:bg-line/60 hover:text-ink'
                }`}
              >
                <span className={`font-mono text-[10px] tracking-[0.14em] ${isActive ? 'text-paper/60' : 'text-muted'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {l.label}
                {!seen.has(i) && (
                  <span aria-hidden className="relative ml-0.5 inline-flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
        {!allSeen && (
          <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
            {levels.length} layers · tap to explore
          </p>
        )}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="pt-8">
        {level.summary && <p className="mb-8 max-w-2xl text-muted">{level.summary}</p>}
        {/* key resets the running dot when switching tabs */}
        <Pipeline key={level.label} stages={level.stages} notes={level.notes} />

        {level.images && level.images.length > 0 ? (
          <div className="mt-12">
            <LayerGallery key={level.label} images={level.images} label={level.label} />
          </div>
        ) : (
          <div className="mt-10">
            <Placeholder>
              Add 1–2 screenshots of the {level.label} layer: put them in public/projects/&lt;slug&gt;/ and list them under
              this level&apos;s <code>images</code> in data/projects.ts.
            </Placeholder>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

// Several pipelines for one project (e.g. a tool's urban / building / unit layers), one tab each.
// Only the selected pipeline is shown, so the section stays short.

import { useId, useState } from 'react'
import type { PipelineLevel } from '../data/projects'
import Pipeline from './Pipeline'

export default function PipelineTabs({ levels }: { levels: PipelineLevel[] }) {
  const [active, setActive] = useState(0)
  const id = useId()
  const level = levels[active]

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (active + (e.key === 'ArrowRight' ? 1 : levels.length - 1)) % levels.length
    setActive(next)
    document.getElementById(`${id}-tab-${next}`)?.focus()
  }

  return (
    <div>
      <div role="tablist" aria-label="Tool layers" className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line" onKeyDown={onKey}>
        {levels.map((l, i) => (
          <button
            key={l.label}
            id={`${id}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors ${
              i === active ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            <span className="mr-2 font-mono text-[10px] tracking-[0.14em] text-muted">{String(i + 1).padStart(2, '0')}</span>
            {l.label}
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="pt-6">
        {level.summary && <p className="mb-8 max-w-2xl text-muted">{level.summary}</p>}
        {/* key resets the running dot when switching tabs */}
        <Pipeline key={level.label} stages={level.stages} notes={level.notes} />
      </div>
    </div>
  )
}

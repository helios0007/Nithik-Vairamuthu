import { availability } from '../data/site'
import Placeholder from './Placeholder'

// "Open to…" block answering the questions recruiters screen on: what, when, where, languages, permit.
export default function Availability() {
  const a = availability
  const when = [a.start, a.duration].filter(Boolean).join(' · ')
  const where = [a.location, a.relocation].filter(Boolean).join(' · ')
  const missing = [
    !a.start && 'start month',
    !a.duration && 'duration',
    !a.relocation && 'open to relocate?',
    !a.permit && 'permit status (confirm with IAAC first)',
  ].filter(Boolean)

  return (
    <div className="rounded-xl border border-line p-5">
      <p className="flex items-center gap-2 text-sm font-bold">
        <span className="h-2.5 w-2.5 rounded-full bg-green-600" aria-hidden />
        Open to work
      </p>
      <p className="mt-2 leading-7">{a.lookingFor}</p>
      <ul className="mt-1 space-y-0.5 text-[15px] leading-7 text-muted">
        {when && <li>{when}</li>}
        {where && <li>{where}</li>}
        {a.languages && <li>Languages: {a.languages}</li>}
        {a.permit && <li>{a.permit}</li>}
      </ul>
      <p className="mt-2 text-xs text-muted">Updated {a.updated}</p>
      {missing.length > 0 && (
        <div className="mt-3">
          <Placeholder>Add in data/site.ts → availability: {missing.join(', ')}.</Placeholder>
        </div>
      )}
    </div>
  )
}

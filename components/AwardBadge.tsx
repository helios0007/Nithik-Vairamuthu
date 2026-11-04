// Small outlined pill for an award, e.g. "Best Thesis Award".
export default function AwardBadge({ award }: { award: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/60 px-2.5 py-0.5 text-xs font-medium text-accent">
      <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
        <circle cx="6" cy="4.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3.8 7.6 3 11.5l3-1.4 3 1.4-.8-3.9" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      {award}
    </span>
  )
}

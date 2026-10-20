// A visible reminder of content still to write. Shows only in `npm run dev`; renders nothing on the live site.
export default function Placeholder({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="rounded-xl border-2 border-dashed border-amber-400/60 bg-amber-400/10 p-5 text-sm leading-6 text-amber-100">
      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-300">To fill in · dev only</p>
      {children}
    </div>
  )
}

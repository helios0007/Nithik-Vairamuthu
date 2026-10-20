// A visible reminder of content still to write. Shows only in `npm run dev`; renders nothing on the live site.
export default function Placeholder({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="rounded-2xl border border-dashed border-amber-300/40 bg-amber-300/[0.04] p-5 text-sm leading-6 text-amber-200/80">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-amber-300">To fill in · dev only</p>
      {children}
    </div>
  )
}

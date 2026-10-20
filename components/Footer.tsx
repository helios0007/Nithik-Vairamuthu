export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-10 sm:flex-row">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          Nithik Vairamuthu © {new Date().getFullYear()}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">IAAC Barcelona · MaAI</span>
      </div>
    </footer>
  )
}

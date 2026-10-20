import Link from 'next/link'
import { links } from '../data/site'

const navItems = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
]

const pill =
  'flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-300 transition hover:border-cyan-500/30 hover:text-cyan-300'

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#080810]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:text-cyan-300"
        >
          NV
        </Link>

        <div className="flex gap-4 sm:gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-zinc-300 transition hover:text-cyan-300">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href={links.github} target="_blank" rel="noopener noreferrer" className={`${pill} hidden sm:flex`}>
            GitHub
          </a>
          <a href={links.resume} download className={pill}>
            ↓ Resume
          </a>
        </div>
      </nav>
    </header>
  )
}

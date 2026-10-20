import Link from 'next/link'
import { links } from '../data/site'

const navItems = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Nithik
        </Link>

        <div className="flex items-center gap-5 text-[15px] sm:gap-7">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted transition hover:text-ink">
              {item.label}
            </Link>
          ))}
          <a
            href={links.resume}
            download
            className="hidden rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white transition hover:bg-accent sm:inline-block"
          >
            CV ↓
          </a>
        </div>
      </nav>
    </header>
  )
}

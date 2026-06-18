const navItems = [
  { label: "Home",       href: "#home"       },
  { label: "About",      href: "#about"      },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Education",  href: "#education"  },
  { label: "Skills",     href: "#skills"     },
  { label: "Contact",    href: "#contact"    },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#080810]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* ── Logo ── */}
        <a
          href="#home"
          className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-white hover:text-cyan-300 transition"
        >
          NV
        </a>

        {/* ── Nav links ── */}
        <div className="hidden gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-300 transition hover:text-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-3">

          {/* GitHub */}
          <a
            href="https://github.com/helios0007"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-300 transition hover:border-cyan-500/30 hover:text-cyan-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>

{/* Resume */}
<a
  href="/Nithik-Resume.pdf"
  download
  className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-300 transition hover:border-cyan-500/30 hover:text-cyan-300"
>
  ↓ Resume
</a>

{/* Portfolio */}
<a
  href="https://heyzine.com/flip-book/0bcd06bf33.html"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-cyan-200 transition hover:bg-cyan-400/20"
>
  Portfolio →
</a>
        </div>
      </nav>
    </header>
  )
}
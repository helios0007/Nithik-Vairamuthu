import { links } from '../data/site'

const primary =
  'inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-200 transition hover:bg-cyan-400/20'
const secondary =
  'inline-flex rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/5'

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <p className="mb-3 text-xs uppercase tracking-[0.28em] text-cyan-300">Contact</p>
      <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl">To infinity and beyond</h2>
      <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
        For collaborations, research conversations, and future-focused design work, feel free to reach out.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <a href={`mailto:${links.email}`} className={primary}>
          {links.email}
        </a>
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={secondary}>
          LinkedIn
        </a>
        <a href={links.github} target="_blank" rel="noopener noreferrer" className={secondary}>
          GitHub
        </a>
        <a href={links.resume} download className={secondary}>
          ↓ Resume
        </a>
      </div>
    </section>
  )
}

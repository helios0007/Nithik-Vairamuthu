import { links } from '../data/site'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">To infinity and beyond.</h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          For collaborations, research conversations, internships, or just a good question — say hi.
        </p>
        <a
          href={`mailto:${links.email}`}
          className="mt-8 inline-block text-2xl font-bold text-accent underline decoration-2 underline-offset-8 transition hover:text-ink sm:text-3xl"
        >
          {links.email}
        </a>
        <div className="mt-10 flex flex-wrap gap-3 text-[15px]">
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-5 py-2.5 transition hover:border-ink">
            LinkedIn
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-5 py-2.5 transition hover:border-ink">
            GitHub
          </a>
          <a href={links.resume} download className="rounded-full border border-line px-5 py-2.5 transition hover:border-ink">
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}

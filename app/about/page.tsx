import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "../../components/SectionHeading";
import Reveal from "../../components/Reveal";
import Contact from "../../components/Contact";
import { education, experience, links, publications, skills } from "../../data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience, education, and skills of Nithik Vairamuthu.",
};

const card =
  "rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]";
const label = "font-mono text-[10px] uppercase tracking-widest text-cyan-500/60";

export default function AboutPage() {
  return (
    <main className="relative z-10 min-h-screen pt-28 text-white">
      {/* ── INTRO ── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="mb-4 text-sm uppercase tracking-[0.28em] text-cyan-300">About</p>
        <h1 className="max-w-3xl text-5xl font-light leading-tight tracking-tight sm:text-7xl">Who is this guy?</h1>
        <div className="mt-10 max-w-2xl space-y-6 text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">
          <p>
            I&apos;m an architect who never really left architecture. I just started asking it bigger questions.
            What if a building could tell us whether it&apos;s worth saving? What if a city could remember what it used
            to be? What if we could see a crack before it becomes a problem?
          </p>
          <p>
            AI is how I chase those questions. I don&apos;t see it as a replacement for designers. I see it as a
            collaborator. When people and machines work together, we move faster, explore further, and arrive at
            answers that can genuinely help the future of humanity.
          </p>
          <p>
            And then there&apos;s space. As a kid I was hooked on its mysteries: black holes, distant worlds, the
            sheer scale of it all. <em>Interstellar</em> took that curiosity and made it impossible to ignore.
            It&apos;s why the Moon keeps sneaking into my work.
          </p>
          <p>
            Outside of work? Ask me about life, purpose, or where humanity is headed. Fair warning: I won&apos;t stop
            at one question.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={links.resume}
            download
            className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-200 transition hover:bg-cyan-400/20"
          >
            ↓ Download resume
          </a>
          <a
            href={links.flipbook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Full portfolio (flipbook) ↗
          </a>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="Practice and applied work" />
          <div className="grid gap-4">
            {experience.map((item) => (
              <div key={item.title} className={card}>
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className={label}>{item.label}</p>
                    <h3 className="mt-2 text-xl font-medium">{item.title}</h3>
                    <p className="mt-2 text-zinc-300">{item.detail}</p>
                  </div>
                  {item.when && <p className="shrink-0 font-mono text-sm text-cyan-300">{item.when}</p>}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Education" title="Academic background" />
          <div className="grid gap-6 md:grid-cols-3">
            {education.map((item) => (
              <div key={item.title} className={card}>
                <p className={label}>{item.label}</p>
                <h3 className="mt-3 text-lg font-medium">{item.title}</h3>
                <p className="mt-3 text-zinc-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Skills" title="Tools and domains" />
          <div className="grid gap-6 md:grid-cols-3">
            {skills.map((group) => (
              <div key={group.group} className={card}>
                <p className={label}>{group.group}</p>
                <p className="mt-4 leading-7 text-zinc-300">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── PUBLICATION ── */}
      <section id="publication" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Publication" title="Selected publication" />
          {publications.map((pub) => (
            <div key={pub.title} className={card}>
              <p className={label}>{pub.when}</p>
              <h3 className="mt-3 text-xl font-medium">{pub.title}</h3>
              <p className="mt-3 text-zinc-300">{pub.venue}</p>
              <div className="mt-5 flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-widest">
                <a href={pub.href} download className="text-cyan-300 hover:text-white">
                  ↓ Paper (PDF)
                </a>
                <Link href={`/projects/${pub.projectSlug}`} className="text-cyan-300 hover:text-white">
                  Case study →
                </Link>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <Contact />
    </main>
  );
}

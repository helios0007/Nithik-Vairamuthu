import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import HeroPortrait from "../components/HeroPortrait";
import Reveal from "../components/Reveal";
import Contact from "../components/Contact";
import { featuredProjects } from "../data/projects";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen text-white">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="home" className="relative mx-auto min-h-screen max-w-6xl px-4 py-24 pt-32 sm:px-6">
        <div className="grid min-h-[80vh] items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-cyan-300">
              AI Researcher · Architect · Computational Designer
            </p>

            <h1 className="font-[family:var(--font-display)] text-6xl font-light leading-none tracking-tighter sm:text-8xl lg:text-[6.5rem]">
              <span className="block">Nithik</span>
              <span className="block text-zinc-500">Vairamuthu</span>
            </h1>

            {/* Phase 2: rewrite this in Nithik's own voice. */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              Architect and computational designer working at the intersection of AI, generative systems, and
              spatial intelligence. I build AI-driven design workflows, computer vision pipelines, and adaptive
              spatial systems for architecture and future habitat environments.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work"
                className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-200 transition hover:bg-cyan-400/20"
              >
                View work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Contact
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-widest text-cyan-500/40">
              <span>41.38°N 2.17°E</span>
              <span>IAAC // MaAI</span>
              <span>2025 — 2027</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroPortrait />
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ────────────────────────────────────── */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Research and case studies"
            description="Each project covers the problem, what I built, the decisions along the way, and how it turned out."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 120}>
              <ProjectCard project={project} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SHORT ABOUT ──────────────────────────────────────── */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="AI, computation, and future spatial systems"
            description="My work connects architecture, machine learning, and computational design through image segmentation, generative workflows, and adaptive spatial intelligence. I'm currently doing a Master's in AI for Architecture and the Built Environment at IAAC Barcelona."
          />
          <Link
            href="/about"
            className="font-mono text-[11px] uppercase tracking-widest text-cyan-300 transition hover:text-white"
          >
            Experience, education &amp; skills →
          </Link>
        </Reveal>
      </section>

      <Contact />
    </main>
  );
}

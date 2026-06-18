import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import HeroPortrait from "../components/HeroPortrait";
import JarvisBg from "../components/JarvisBg";
import Reveal from "../components/Reveal";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <>
      <JarvisBg />
      <Navbar />

      <main className="relative z-10 min-h-screen text-white">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          id="home"
          className="relative mx-auto min-h-screen max-w-6xl px-6 py-24 pt-32"
        >
          <div className="grid min-h-[80vh] items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.28em] text-cyan-300">
                AI Researcher · Architect · Computational Designer
              </p>

              <h1 className="font-[family:var(--font-display)] text-6xl font-light leading-none tracking-tighter sm:text-8xl lg:text-[6.5rem]">
                <span className="block">Nithik</span>
                <span className="block text-zinc-500">Vairamuthu</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
                Architect and computational designer working at the intersection
                of AI, generative systems, and spatial intelligence. I build
                AI-driven design workflows, computer vision pipelines, and adaptive
                spatial systems for architecture and future habitat environments.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-200 transition hover:bg-cyan-400/20"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Contact
                </a>
              </div>

              {/* ── HUD meta tags ── */}
              <div className="mt-12 flex flex-wrap gap-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/40">
                  41.38°N 2.17°E
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/40">
                  IAAC // MaAI
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/40">
                  2025 — 2026
                </span>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <HeroPortrait />
            </div>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────── */}
        <section id="about" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title="AI, computation, and future spatial systems"
              description="My work connects architecture, machine learning, and computational design through image segmentation, generative workflows, and adaptive spatial intelligence."
            />
          </Reveal>

          <Reveal delay={150}>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                  Current Focus
                </p>
                <p className="mt-3 text-lg text-white">
                  AI-driven design workflows and computer vision systems
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                  Research Interests
                </p>
                <p className="mt-3 text-lg text-white">
                  Intelligent environments, adaptive systems, extreme and
                  extraterrestrial habitats
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                  Approach
                </p>
                <p className="mt-3 text-lg text-white">
                  Parametric design, machine learning, hardware experimentation
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────── */}
        <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Projects"
              title="Research and selected work"
              description="A selection of projects across urban regeneration, habitat systems, image intelligence, and architectural computation."
            />
          </Reveal>

          <Reveal delay={150}>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────── */}
        <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Experience"
              title="Practice and applied work"
              description="Professional and academic experiences shaping my research in architecture, AI, and computational systems."
            />
          </Reveal>

          <Reveal delay={150}>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                      Architecture
                    </p>
                    <h3 className="mt-2 text-xl font-medium text-white">
                      Architectural Internship
                    </h3>
                    <p className="mt-2 text-zinc-300">
                      Iinfinity Architects, Chennai — commercial, residential,
                      and project documentation workflows.
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-sm text-cyan-300">
                    Dec 2022 – May 2026
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                      Workshop
                    </p>
                    <h3 className="mt-2 text-xl font-medium text-white">
                      VAP Parametric Workshop
                    </h3>
                    <p className="mt-2 text-zinc-300">
                      VIT University, Vellore — parametric modelling, fabrication,
                      and furniture design.
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-sm text-cyan-300">
                    Workshop
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                      Tutor
                    </p>
                    <h3 className="mt-2 text-xl font-medium text-white">
                      Parametric Workshop
                    </h3>
                    <p className="mt-2 text-zinc-300">
                      Mysore School of Architecture — assisted in organizing and
                      conducting a 3-day parametric workshop.
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-sm text-cyan-300">
                    Tutor Role
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── EDUCATION ────────────────────────────────────────── */}
        <section id="education" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Education"
              title="Academic background"
              description="A multidisciplinary foundation across architecture, AI, and strategy."
            />
          </Reveal>

          <Reveal delay={150}>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                  2025 – Present
                </p>
                <h3 className="mt-3 text-lg font-medium text-white">
                  Institute for Advanced Architecture of Catalonia
                </h3>
                <p className="mt-3 text-zinc-300">
                  Masters in AI for Architecture and the Built Environment
                </p>
              </div>

              <div className="rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                  2025 – Present
                </p>
                <h3 className="mt-3 text-lg font-medium text-white">
                  EADA Business School
                </h3>
                <p className="mt-3 text-zinc-300">
                  Business Strategist, Business Administration and Management
                </p>
              </div>

              <div className="rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                  Vellore
                </p>
                <h3 className="mt-3 text-lg font-medium text-white">
                  Vellore Institute of Technology
                </h3>
                <p className="mt-3 text-zinc-300">
                  Bachelor of Architecture (B.Arch)
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────── */}
        <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="Tools and domains"
              description="Core capabilities across AI, spatial systems, computation, and hardware prototyping."
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                  AI / Vision
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Python","PyTorch","OpenCV","SAM","Image Segmentation","Regression Models","Stable Diffusion"].map((item) => (
                    <span key={item} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">{item}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                  Design / Spatial
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Grasshopper","Rhino","Computational Design","Parametric Design","Architecture","Adaptive Environments"].map((item) => (
                    <span key={item} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">{item}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                  Hardware / Systems
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Arduino","ESP32","Sensor Integration","Strategic Thinking","Systems Design"].map((item) => (
                    <span key={item} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── PUBLICATION ──────────────────────────────────────── */}
        <section id="publication" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Publication"
              title="Selected publication"
              description="Academic research and conference presentations on computational design and spatial systems."
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-3xl border border-cyan-500/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-cyan-500/20 hover:bg-white/[0.05]">
              <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">Nov 2025</p>
              <h3 className="mt-3 text-xl font-medium text-white">
                Computational Study of Origami Inspired Geometries in Lunar Habitations
              </h3>
              <p className="mt-3 text-zinc-300">Presented at ZMECH Conference – VIT Vellore.</p>
            </div>
          </Reveal>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────── */}
        <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="To infinity and beyond"
              description="For collaborations, research conversations, and future-focused design work, feel free to reach out."
            />
          </Reveal>

          <Reveal delay={150}>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:v.nitik@gmail.com"
                className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-200 transition hover:bg-cyan-400/20"
              >
                v.nitik@gmail.com
              </a>

              <a
                href="https://www.linkedin.com/in/nithik-vairamuthu-ba019543"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/helios0007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
              >
                GitHub
              </a>

              <a
                href="/Nithik-Resume.pdf"
                download
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
              >
                ↓ Resume
              </a>

              <a
                href="https://heyzine.com/flip-book/0bcd06bf33.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-200 transition hover:bg-cyan-400/20"
              >
                Portfolio →
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/30">SYS.ACTIVE</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/30">NET.OK</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/30">AI.CORE</span>
            </div>
          </Reveal>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-10 sm:flex-row">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Nithik Vairamuthu © 2026
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              IAAC Barcelona · MaAI
            </span>
          </div>
        </footer>

      </main>
    </>
  )
}

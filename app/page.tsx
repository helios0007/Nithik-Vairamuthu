import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import Contact from "../components/Contact";
import Availability from "../components/Availability";
import { featuredProjects } from "../data/projects";
import { links, publications, siteUrl } from "../data/site";

// Structured data so search engines understand who this site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nithik Vairamuthu",
  url: siteUrl,
  image: `${siteUrl}/PP.webp`,
  jobTitle: "Architect and Computational Designer",
  email: `mailto:${links.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology" },
    { "@type": "CollegeOrUniversity", name: "Institute for Advanced Architecture of Catalonia (IAAC)" },
  ],
  knowsAbout: ["Computational design", "Machine learning", "Computer vision", "Grasshopper", "Architecture"],
  sameAs: [links.linkedin, links.github],
};

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* ── HERO ── */}
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 pt-12 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:pt-20">
        <div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            Hi, I&apos;m <span className="text-accent">Nithik</span>.
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-9 sm:text-2xl sm:leading-10">
            I keep asking how we&apos;ll live tomorrow, on Earth and maybe beyond it. Then I build the tools to help
            find out.
          </p>
          <p className="mt-4 text-muted">
            Architect · Computational designer · AI for the built environment at IAAC Barcelona
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="rounded-full bg-ink px-6 py-3 font-medium text-white transition hover:bg-accent">
              See my work
            </a>
            <a href={links.resume} download className="rounded-full border border-line px-6 py-3 font-medium transition hover:border-ink">
              Download CV ↓
            </a>
          </div>
          <div className="mt-8 max-w-xl">
            <Availability />
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <Image
            src="/PP.webp"
            preload
            alt="Portrait of Nithik Vairamuthu"
            fill
            sizes="(max-width: 768px) 90vw, 448px"
            className="object-contain"
          />
        </div>
      </section>

      {/* ── WHO IS THIS GUY ── */}
      <section id="about" className="border-t border-line">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-20 sm:px-6 sm:py-24 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Who is this guy?</h2>
          <div className="space-y-5 text-lg leading-8 text-muted">
            <p>
              An architect who never really left architecture. I just started asking it bigger questions, and AI is
              how I chase them.
            </p>
            <p>
              Right now that&apos;s at IAAC Barcelona, in a Master&apos;s in AI for Architecture and the Built
              Environment.
            </p>
            <Link href="/about" className="inline-block font-medium text-accent hover:underline hover:underline-offset-4">
              The longer story →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            I ask questions
            <span className="block text-muted">and</span>
            build tools
            <span className="block text-muted">to answer them.</span>
          </h2>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATION ── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Published</h2>
          {publications.map((pub) => (
            <div key={pub.title} className="mt-8 rounded-xl bg-paper-2 p-6 sm:p-8">
              <p className="text-sm text-muted">{pub.when}</p>
              <h3 className="mt-2 text-xl font-bold leading-snug sm:text-2xl">{pub.title}</h3>
              <p className="mt-2 text-muted">{pub.venue}</p>
              <div className="mt-5 flex flex-wrap gap-6 font-medium text-accent">
                <a href={pub.href} download className="hover:underline hover:underline-offset-4">
                  Read the paper ↓
                </a>
                <Link href={`/projects/${pub.projectSlug}`} className="hover:underline hover:underline-offset-4">
                  The project →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}

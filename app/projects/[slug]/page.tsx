import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "../../../components/Gallery";
import Placeholder from "../../../components/Placeholder";
import { getProject, visibleProjects } from "../../../data/projects";

type Props = { params: Promise<{ slug: string }> };

// Only the projects in data/projects.ts get a page; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return visibleProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.hook,
    openGraph: project.spreads[0] ? { images: [project.spreads[0]] } : undefined,
  };
}

const has = (list?: unknown[]) => !!list && list.length > 0;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-white/10 py-12 md:grid-cols-[200px_1fr] md:gap-10">
      <h2 className="font-mono text-[11px] uppercase tracking-widest text-cyan-400/70">{title}</h2>
      <div className="max-w-2xl space-y-5 text-lg leading-8 text-zinc-300">{children}</div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = visibleProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = visibleProjects[(index + 1) % visibleProjects.length];
  const cover = project.spreads[0];

  return (
    <main className="relative z-10 min-h-screen pt-28 text-white">
      <article className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ── Header ── */}
        <header className="py-10">
          <Link
            href="/#work"
            className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 transition hover:text-cyan-300"
          >
            ← All work
          </Link>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-widest text-cyan-400/70">
            {project.year} · {project.status}
          </p>
          <h1 className="mt-4 text-5xl font-light leading-none tracking-tighter sm:text-7xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-zinc-300">{project.hook}</p>

          {/* Quick facts — what a reviewer scans first */}
          <dl className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Focus</dt>
              <dd className="mt-2 text-zinc-200">{project.tags.join(" · ")}</dd>
            </div>
            {(has(project.stack) || process.env.NODE_ENV === "development") && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Stack</dt>
                <dd className="mt-2 text-zinc-200">
                  {has(project.stack) ? project.stack!.join(" · ") : <Placeholder>Tools used.</Placeholder>}
                </dd>
              </div>
            )}
            {project.team && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Team</dt>
                <dd className="mt-2 text-zinc-200">{project.team}</dd>
              </div>
            )}
          </dl>

          {has(project.links) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {project.links!.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
                  className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-200 transition hover:bg-cyan-400/20"
                >
                  {link.download ? "↓ " : ""}
                  {link.label}
                  {link.download ? "" : " ↗"}
                </a>
              ))}
            </div>
          )}
        </header>

        {cover && (
          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
            <Image src={cover} alt={`${project.title} — cover`} fill loading="eager" fetchPriority="high" sizes="(max-width: 1152px) 100vw, 1152px" className="object-cover" />
          </div>
        )}

        {/* ── Case study ── */}
        {has(project.context) ? (
          <Section title="Context">
            <Paragraphs items={project.context!} />
          </Section>
        ) : (
          <Placeholder>
            <strong>Context</strong> — the problem and why it matters. Who has this problem, and what happens today?
          </Placeholder>
        )}

        {has(project.role) ? (
          <Section title="My role">
            <Paragraphs items={project.role!} />
          </Section>
        ) : (
          <div className="mt-4">
            <Placeholder>
              <strong>My role</strong> — exactly what you built yourself vs. what the team did. Also set{" "}
              <code>team</code> (e.g. &quot;Team of 3 — IAAC studio&quot;).
            </Placeholder>
          </div>
        )}

        {has(project.problems) ? (
          <Section title="Key decisions">
            <ol className="space-y-8">
              {project.problems!.map((item, i) => (
                <li key={item.problem}>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    Problem {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-white">{item.problem}</p>
                  <p className="mt-3">
                    <span className="text-cyan-300">Decision → </span>
                    {item.decision}
                  </p>
                </li>
              ))}
            </ol>
          </Section>
        ) : (
          <div className="mt-4">
            <Placeholder>
              <strong>Key decisions</strong> — two concrete technical problems you hit and what you decided (e.g.
              choice of model, dataset, how you handled bad data, how output fed into design).
            </Placeholder>
          </div>
        )}

        {has(project.outcome) ? (
          <Section title="Outcome">
            <Paragraphs items={project.outcome!} />
          </Section>
        ) : (
          <div className="mt-4">
            <Placeholder>
              <strong>Outcome</strong> — results, metrics (accuracy, speed, error), what changed, what you&apos;d do next.
            </Placeholder>
          </div>
        )}

        {/* ── Gallery ── */}
        {project.spreads.length > 0 && (
          <section className="border-t border-white/10 py-12">
            <h2 className="mb-6 font-mono text-[11px] uppercase tracking-widest text-cyan-400/70">Portfolio spreads</h2>
            <Gallery images={project.spreads} title={project.title} />
          </section>
        )}

        {/* ── Next project ── */}
        {nextProject && nextProject.slug !== project.slug && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group my-16 block rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-cyan-400/30"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Next project</p>
            <p className="mt-3 text-3xl font-light tracking-tight transition group-hover:text-cyan-200 sm:text-4xl">
              {nextProject.title} →
            </p>
          </Link>
        )}
      </article>
    </main>
  );
}

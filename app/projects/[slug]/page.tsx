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
    <section className="grid gap-4 border-t border-line py-12 md:grid-cols-[1fr_2fr] md:gap-12">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="space-y-5 text-lg leading-8">{children}</div>
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

function Todo({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-3">
      <Placeholder>{children}</Placeholder>
    </div>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = visibleProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = visibleProjects[(index + 1) % visibleProjects.length];
  const cover = project.spreads[0];
  const isDev = process.env.NODE_ENV === "development";

  return (
    <main id="main">
      <article className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* ── Header ── */}
        <header className="pb-10 pt-10 md:pt-16">
          <Link href="/#work" className="text-muted transition hover:text-ink">
            ← All work
          </Link>
          <p className="mt-10 text-muted">
            {project.year} · {project.status}
          </p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight sm:text-7xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 sm:text-2xl sm:leading-10">{project.hook}</p>

          {/* Quick facts — what a reviewer scans first */}
          <dl className="mt-10 grid gap-6 rounded-xl bg-paper-2 p-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-bold">Focus</dt>
              <dd className="mt-1 text-muted">{project.tags.join(" · ")}</dd>
            </div>
            {(has(project.stack) || isDev) && (
              <div>
                <dt className="text-sm font-bold">Stack</dt>
                <dd className="mt-1 text-muted">
                  {has(project.stack) ? project.stack!.join(" · ") : <Placeholder>Tools used.</Placeholder>}
                </dd>
              </div>
            )}
            {project.team && (
              <div>
                <dt className="text-sm font-bold">Team</dt>
                <dd className="mt-1 text-muted">{project.team}</dd>
              </div>
            )}
          </dl>

          {has(project.links) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links!.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
                  className="rounded-full bg-ink px-6 py-3 font-medium text-white transition hover:bg-accent"
                >
                  {link.label} {link.download ? "↓" : "↗"}
                </a>
              ))}
            </div>
          )}
        </header>

        {cover && (
          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl bg-paper-2">
            <Image
              src={cover}
              alt={`${project.title} — cover`}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        )}

        {/* ── Case study ── */}
        {has(project.context) ? (
          <Section title="Context">
            <Paragraphs items={project.context!} />
          </Section>
        ) : (
          <Todo>
            <strong>Context</strong> — the problem and why it matters. Who has this problem, and what happens today?
          </Todo>
        )}

        {has(project.role) ? (
          <Section title="My role">
            <Paragraphs items={project.role!} />
          </Section>
        ) : (
          <Todo>
            <strong>My role</strong> — exactly what you built yourself vs. what the team did. Also set <code>team</code>{" "}
            (e.g. &quot;Team of 3 — IAAC studio&quot;).
          </Todo>
        )}

        {has(project.problems) ? (
          <Section title="Key decisions">
            <ol className="space-y-8">
              {project.problems!.map((item, i) => (
                <li key={item.problem}>
                  <p className="text-sm font-bold text-muted">Problem {i + 1}</p>
                  <p className="mt-1 font-medium">{item.problem}</p>
                  <p className="mt-3">
                    <span className="font-bold text-accent">Decision → </span>
                    {item.decision}
                  </p>
                </li>
              ))}
            </ol>
          </Section>
        ) : (
          <Todo>
            <strong>Key decisions</strong> — two concrete technical problems you hit and what you decided (e.g. choice
            of model, dataset, how you handled bad data, how output fed into design).
          </Todo>
        )}

        {has(project.outcome) ? (
          <Section title="Outcome">
            <Paragraphs items={project.outcome!} />
          </Section>
        ) : (
          <Todo>
            <strong>Outcome</strong> — results, metrics (accuracy, speed, error), what changed, what you&apos;d do next.
          </Todo>
        )}

        {/* ── Gallery ── */}
        {project.spreads.length > 0 && (
          <section className="border-t border-line py-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">From the portfolio</h2>
            <Gallery images={project.spreads} title={project.title} />
          </section>
        )}

        {/* ── Next project ── */}
        {nextProject && nextProject.slug !== project.slug && (
          <Link href={`/projects/${nextProject.slug}`} className="group block border-t border-line py-16">
            <p className="text-muted">Next project</p>
            <p className="mt-2 text-4xl font-bold tracking-tight transition group-hover:text-accent sm:text-5xl">
              {nextProject.title} →
            </p>
          </Link>
        )}
      </article>
    </main>
  );
}

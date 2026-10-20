import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "../../../components/Gallery";
import Placeholder from "../../../components/Placeholder";
import { getProject, visibleProjects, type ModelCard } from "../../../data/projects";

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
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

const has = (list?: unknown[]) => !!list && list.length > 0;
const isDev = process.env.NODE_ENV === "development";

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

/** A text section that shows its content, or a dev-only reminder if it's empty. */
function TextSection({ title, items, hint }: { title: string; items?: string[]; hint: React.ReactNode }) {
  if (has(items)) {
    return (
      <Section title={title}>
        <Paragraphs items={items!} />
      </Section>
    );
  }
  return (
    <Todo>
      <strong>{title}</strong> — {hint}
    </Todo>
  );
}

function Fact({ label, value, hint }: { label: string; value?: string; hint: string }) {
  if (!value && !isDev) return null;
  return (
    <div>
      <dt className="text-sm font-bold">{label}</dt>
      <dd className="mt-1 text-muted">{value || <Placeholder>{hint}</Placeholder>}</dd>
    </div>
  );
}

function ModelCardBox({ card }: { card: ModelCard }) {
  const filled = card.data || card.model || has(card.metrics) || has(card.limitations);
  if (!filled) {
    return (
      <Todo>
        <strong>AI results box</strong> — fill <code>modelCard</code>: the data (how many images, from where, how
        labelled), the model, what you compared it against, 2–3 metrics (e.g. mAP, IoU, error), where it fails, and a
        GitHub link. Add one image of a failure case to the gallery.
      </Todo>
    );
  }
  return (
    <Section title="The model, honestly">
      <div className="rounded-xl border border-line p-6 text-base leading-7">
        <dl className="grid gap-5 sm:grid-cols-2">
          {card.data && (
            <div>
              <dt className="font-bold">Data</dt>
              <dd className="text-muted">{card.data}</dd>
            </div>
          )}
          {card.model && (
            <div>
              <dt className="font-bold">Model</dt>
              <dd className="text-muted">{card.model}</dd>
            </div>
          )}
          {card.baseline && (
            <div className="sm:col-span-2">
              <dt className="font-bold">Compared against</dt>
              <dd className="text-muted">{card.baseline}</dd>
            </div>
          )}
        </dl>
        {has(card.metrics) && (
          <div className="mt-6 flex flex-wrap gap-8 border-t border-line pt-6">
            {card.metrics!.map((m) => (
              <div key={m.label}>
                <p className="text-3xl font-bold tracking-tight text-accent">{m.value}</p>
                <p className="text-sm text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        )}
        {has(card.limitations) && (
          <div className="mt-6 border-t border-line pt-6">
            <p className="font-bold">Where it fails</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {card.limitations!.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        )}
        {card.codeUrl && (
          <a
            href={card.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-medium text-accent hover:underline hover:underline-offset-4"
          >
            View the code on GitHub ↗
          </a>
        )}
      </div>
    </Section>
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

          {/* Summary box — what a reviewer scans in the first 30 seconds */}
          <dl className="mt-10 grid gap-6 rounded-xl bg-paper-2 p-6 sm:grid-cols-2 lg:grid-cols-3">
            <Fact label="My role · team" value={project.team} hint="e.g. Lead ML developer · team of 3" />
            <Fact label="Duration" value={project.duration} hint="e.g. 10 weeks, IAAC studio" />
            <Fact label="Key result" value={project.keyResult} hint="One line with a number if possible." />
            <Fact
              label="Tools"
              value={has(project.stack) ? project.stack!.join(" · ") : undefined}
              hint="Python, PyTorch, Grasshopper…"
            />
            <div>
              <dt className="text-sm font-bold">Focus</dt>
              <dd className="mt-1 text-muted">{project.tags.join(" · ")}</dd>
            </div>
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
          <div className="relative mb-6 aspect-[2/1] overflow-hidden rounded-xl bg-paper-2">
            <Image
              src={cover}
              alt={`${project.title} — portfolio spread`}
              fill
              preload
              quality={90}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        )}

        {/* ── Case study ── */}
        <TextSection
          title="Context"
          items={project.context}
          hint="the problem and why it matters. Who has this problem, and what happens today?"
        />
        <TextSection
          title="My role"
          items={project.role}
          hint="exactly what you built yourself vs. what the team did. Name collaborators and tutors."
        />
        <TextSection
          title="Process"
          items={project.process}
          hint="how it was made — sketches, Grasshopper screenshots, iterations, and one thing you tried that didn't work."
        />

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
            <strong>Key decisions</strong> — 2–3 &quot;I chose X over Y because…&quot; moments (model, dataset, how you
            handled bad data, how the output fed into design).
          </Todo>
        )}

        <TextSection
          title="Outcome"
          items={project.outcome}
          hint="results, what changed, who used it or what it fed into."
        />

        {project.modelCard && <ModelCardBox card={project.modelCard} />}

        <TextSection
          title="Looking back"
          items={project.reflection}
          hint="what you'd do differently, or what you'd build next. Two or three sentences."
        />

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

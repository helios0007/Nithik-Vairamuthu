import Image from "next/image";
import { notFound } from "next/navigation";
import ProjectCard from "../../../components/ProjectCard";
import ThumbIcon from "../../../components/ThumbIcon";
import { projects } from "../../../data/projects";

// Dev-only page to compare thumbnail styles. Not available on the live site.
export const metadata = { robots: { index: false } };

const four = projects.filter((p) => p.featured);

export default function ThumbnailPreview() {
  if (process.env.NODE_ENV !== "development") notFound();

  const sections = [
    {
      title: "A — Line icons",
      note: "Thin blue drawings on a drafting grid. Real images stay inside each project page.",
      thumb: (slug: string) => (
        <div className="absolute inset-0 transition duration-500 group-hover:scale-[1.03]">
          <ThumbIcon slug={slug} />
        </div>
      ),
    },
    {
      title: "B — Duotone crops",
      note: "One real detail from each spread, all recoloured to charcoal + blue so they match.",
      thumb: (slug: string) => (
        <div className="absolute inset-0 p-6 transition duration-500 group-hover:scale-[1.03]">
          <div className="relative h-full w-full">
            <Image
              src={`/thumbs/${slug}-duotone.webp`}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className={slug === "chronoscape" || slug === "lunar-habitations" ? "rounded-md object-cover" : "object-contain"}
            />
          </div>
        </div>
      ),
    },
    { title: "Current — full poster", note: "What the site shows today.", thumb: undefined },
  ];

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Thumbnail options</h1>
      {sections.map((s) => (
        <section key={s.title} className="mt-16 border-t border-line pt-10">
          <h2 className="text-2xl font-bold">{s.title}</h2>
          <p className="mt-2 text-muted">{s.note}</p>
          <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {four.map((p) => (
              <ProjectCard key={p.slug} project={p} thumb={s.thumb?.(p.slug)} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

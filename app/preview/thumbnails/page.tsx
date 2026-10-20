import Image from "next/image";
import { notFound } from "next/navigation";
import ProjectCard from "../../../components/ProjectCard";
import ArtefactThumb from "../../../components/ArtefactThumb";
import { projects } from "../../../data/projects";

// Dev-only page to compare thumbnail directions. Not available on the live site.
export const metadata = { robots: { index: false } };

const four = projects.filter((p) => p.featured);

// Figures read off the portfolio spreads — to be confirmed before going live.
const figures: Record<string, { value: string; label: string; area: string }> = {
  retrograde: { value: "40,000", label: "building records across Europe", area: "Retrofit feasibility" },
  "crack-detection": { value: "4,029", label: "training images", area: "Computer vision · Robotics" },
  chronoscape: { value: "6", label: "model iterations", area: "Generative AI · Urban memory" },
  "lunar-habitations": { value: "2025", label: "paper at ZMECH, VIT Vellore", area: "Computational geometry" },
};

function NumberThumb({ slug, index }: { slug: string; index: number }) {
  const f = figures[slug];
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
      <p className="font-mono text-xs tracking-widest text-muted">{String(index + 1).padStart(2, "0")}</p>
      <div>
        <p className="text-6xl font-bold tracking-tight sm:text-7xl">{f.value}</p>
        <p className="mt-2 text-muted">{f.label}</p>
        <div className="mt-6 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-widest text-accent">
          {f.area}
        </div>
      </div>
    </div>
  );
}

export default function ThumbnailPreview() {
  if (process.env.NODE_ENV !== "development") notFound();

  const sections = [
    {
      title: "A — Method artefacts",
      note: "The kind of output each method produces, in hairline: segmentation mask, toolpath offsets, point cloud, crease pattern.",
      thumb: (slug: string) => <ArtefactThumb slug={slug} />,
    },
    {
      title: "B — Traced from your images",
      note: "Edge-traced line drawings of your real project images (façade, crack, Chronoscape render, lunar scene).",
      thumb: (slug: string) => (
        <div className="absolute inset-0 p-5">
          <div className="relative h-full w-full">
            <Image src={`/thumbs/${slug}-trace.webp`} alt="" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-contain" />
          </div>
        </div>
      ),
    },
    {
      title: "C — Numbers, no drawing",
      note: "One key figure per project. Figures are read off your spreads and need confirming.",
      thumb: (slug: string, i: number) => <NumberThumb slug={slug} index={i} />,
    },
    { title: "Current — line icons", note: "What the site shows now.", thumb: undefined },
  ];

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Thumbnail directions</h1>
      {sections.map((s) => (
        <section key={s.title} className="mt-16 border-t border-line pt-10">
          <h2 className="text-2xl font-bold">{s.title}</h2>
          <p className="mt-2 text-muted">{s.note}</p>
          <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {four.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} thumb={s.thumb?.(p.slug, i)} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

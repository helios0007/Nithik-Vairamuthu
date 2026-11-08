import type { Metadata } from "next";
import Link from "next/link";
import { featuredProjects } from "../data/projects";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

// A segmentation-style grid with one cell missing — the "gap" this page represents.
function MissingCell() {
  const cols = 11;
  const rows = 5;
  const cell = 22;
  const gap = { c: 7, r: 2 };
  return (
    <svg viewBox={`0 0 ${cols * cell} ${rows * cell + 24}`} className="w-full max-w-sm" aria-hidden>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) =>
          c === gap.c && r === gap.r ? null : (
            <rect
              key={`${r}-${c}`}
              x={c * cell + 1}
              y={r * cell + 1}
              width={cell - 2}
              height={cell - 2}
              fill="var(--color-ink)"
              fillOpacity={0.08 + ((r * 7 + c * 3) % 5) * 0.03}
            />
          )
        )
      )}
      <rect
        x={gap.c * cell + 1}
        y={gap.r * cell + 1}
        width={cell - 2}
        height={cell - 2}
        fill="none"
        stroke="var(--color-accent)"
        strokeDasharray="3 3"
      />
      <text
        x={gap.c * cell + cell / 2}
        y={rows * cell + 18}
        textAnchor="middle"
        fill="var(--color-muted)"
        fontSize="9"
        letterSpacing="1.4"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
      >
        404
      </text>
    </svg>
  );
}

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-5xl px-4 pb-24 pt-16 sm:px-6 md:pt-24">
      <MissingCell />
      <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">This page isn&apos;t here.</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
        Even the best scans have gaps. The link may be old, or the page may have moved. Here&apos;s where to go
        instead:
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:bg-accent">
          Back to home
        </Link>
        <Link href="/#work" className="rounded-full border border-line px-6 py-3 font-medium transition hover:border-ink">
          See the work
        </Link>
      </div>

      <ul className="mt-14 border-t border-line">
        {featuredProjects
          .filter((p) => !p.draft)
          .map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link
                href={`/projects/${p.slug}`}
                className="group flex items-baseline justify-between gap-6 py-4 transition hover:text-accent"
              >
                <span className="text-lg font-medium">{p.title}</span>
                <span className="shrink-0 text-sm text-muted group-hover:text-accent">{p.year}</span>
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
}

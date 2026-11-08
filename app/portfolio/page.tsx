import type { Metadata } from "next";
import Link from "next/link";
import { links } from "../../data/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nithik Vairamuthu's portfolio as a flipbook.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 md:pt-16">
        <Link href="/" className="text-muted transition hover:text-ink">
          Home
        </Link>
        <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-7xl">Portfolio</h1>
        <div className="mt-6 flex flex-wrap gap-6 font-medium text-accent">
          <a href={links.flipbook} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
            Open full screen
          </a>
          <a href={links.resume} download className="hover:underline hover:underline-offset-4">
            Download CV
          </a>
        </div>
        <iframe
          title="Nithik Vairamuthu portfolio flipbook"
          src={links.flipbook}
          allowFullScreen
          allow="autoplay; fullscreen; clipboard-write"
          loading="lazy"
          className="mt-8 h-[70vh] min-h-[420px] w-full rounded-xl border border-line bg-paper-2 sm:h-[80vh]"
        />
      </div>
    </main>
  );
}

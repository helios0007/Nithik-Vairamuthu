import type { Metadata } from "next";
import Image from "next/image";
import Contact from "../../components/Contact";
import { education, experience, links, skills } from "../../data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who is Nithik Vairamuthu? Background, experience, education, and skills.",
  alternates: { canonical: "/about" },
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-[1fr_2fr] md:gap-12">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main id="main">
      {/* ── STORY ── */}
      <section className="mx-auto grid max-w-5xl gap-10 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-[1.4fr_1fr] md:pt-20">
        <div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">Who is this guy?</h1>
          <div className="mt-10 space-y-6 text-lg leading-8 sm:text-xl sm:leading-9">
            <p>
              I&apos;m an architect who never really left architecture. I just started asking it bigger questions.
              What if a building could tell us whether it&apos;s worth saving? What if a city could remember what it
              used to be? What if we could see a crack before it becomes a problem?
            </p>
            <p>
              AI is how I chase those questions. I don&apos;t see it as a replacement for designers. I see it as a
              collaborator. When people and machines work together, we move faster, explore further, and arrive at
              answers that can genuinely help the future of humanity.
            </p>
            <p>
              And then there&apos;s space. As a kid I was hooked on its mysteries: black holes, distant worlds, the
              sheer scale of it all. <em className="pr-1">Interstellar</em> took that curiosity and made it impossible to ignore.
              It&apos;s why the Moon keeps sneaking into my work.
            </p>
            <p>
              Outside of work? Ask me about life, purpose, or where humanity is headed. Fair warning: I won&apos;t
              stop at one question.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={links.resume} download className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:bg-accent">
              Download CV
            </a>
            <a href="/portfolio" className="rounded-full border border-line px-6 py-3 font-medium transition hover:border-ink">
              Full portfolio
            </a>
          </div>
        </div>
        <div className="relative hidden aspect-square self-start overflow-hidden rounded-3xl border border-line md:block">
          <Image
            src="/portrait-pixel.webp"
            alt="Pixel-art portrait of Nithik Vairamuthu over a network of connected points"
            fill
            sizes="400px"
            className="object-cover"
          />
        </div>
      </section>

      <Block title="Experience">
        <ul className="space-y-8">
          {experience.map((item) => (
            <li key={item.title}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-xl font-bold">{item.title}</h3>
                {item.when && <p className="shrink-0 text-sm text-muted">{item.when}</p>}
              </div>
              <p className="mt-1 leading-7 text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Education">
        <ul className="space-y-8">
          {education.map((item) => (
            <li key={item.title}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="shrink-0 text-sm text-muted">{item.label}</p>
              </div>
              <p className="mt-1 leading-7 text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Toolbox">
        <dl className="space-y-6">
          {skills.map((group) => (
            <div key={group.group}>
              <dt className="font-bold">{group.group}</dt>
              <dd className="mt-1 leading-7 text-muted">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Contact />
    </main>
  );
}

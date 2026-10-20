import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '../data/projects'

export default function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const cover = project.spreads[0]

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition hover:border-cyan-400/30 hover:bg-white/[0.05]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02]">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            loading={priority ? 'eager' : 'lazy'}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-80 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-zinc-600">
            No images yet
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/60">
          {project.year} · {project.status}
          {project.draft && <span className="ml-2 text-amber-300">· Draft (dev only)</span>}
        </p>
        <h3 className="mt-3 text-2xl font-light tracking-tight text-white sm:text-3xl">{project.title}</h3>
        <p className="mt-3 flex-1 leading-7 text-zinc-400">{project.hook}</p>
        <span className="mt-6 font-mono text-[11px] uppercase tracking-widest text-cyan-300 transition group-hover:text-white">
          Read case study →
        </span>
      </div>
    </Link>
  )
}

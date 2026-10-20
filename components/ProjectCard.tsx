import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '../data/projects'

export default function ProjectCard({
  project,
  priority = false,
  thumb,
}: {
  project: Project
  priority?: boolean
  thumb?: React.ReactNode // custom thumbnail; defaults to the first portfolio spread
}) {
  const cover = project.spreads[0]

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper-2">
        {thumb ? (
          thumb
        ) : cover ? (
          <Image
            src={cover}
            alt=""
            fill
            loading={priority ? 'eager' : 'lazy'}
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">Images coming soon</div>
        )}
      </div>
      <p className="mt-4 text-sm text-muted">
        {project.year} · {project.status}
        {project.draft && <span className="ml-2 font-medium text-amber-300">· Draft (dev only)</span>}
      </p>
      <h3 className="mt-1 text-2xl font-bold tracking-tight">{project.title}</h3>
      <p className="mt-2 leading-7 text-muted">{project.hook}</p>
      <span className="mt-3 inline-block font-medium text-accent group-hover:underline group-hover:underline-offset-4">
        Read more →
      </span>
    </Link>
  )
}

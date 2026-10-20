import Link from 'next/link'
import type { Project } from '../data/projects'
import ThumbIcon from './ThumbIcon'
import DrawOnView from './DrawOnView'

export default function ProjectCard({ project, index }: { project: Project; index?: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      {/* Minimal line-drawing thumbnail; real images live on the project page */}
      <DrawOnView className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-paper-2 transition group-hover:border-accent/50">
        <ThumbIcon slug={project.slug} index={index} />
      </DrawOnView>
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

import { getProject, visibleProjects } from '../../../data/projects'
import { ogImage, ogSize } from '../../../lib/og'

export const alt = 'Project by Nithik Vairamuthu'
export const size = ogSize
export const contentType = 'image/png'

export function generateStaticParams() {
  return visibleProjects.map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)

  return ogImage({
    eyebrow: `Nithik Vairamuthu · ${project?.year ?? ''} · Case study`,
    title: project?.title ?? 'Project',
    subtitle: project?.hook ?? '',
  })
}

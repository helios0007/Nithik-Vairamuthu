import type { MetadataRoute } from 'next'
import { projects, SHOW_SPREADS } from '../data/projects'
import { siteUrl } from '../data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const published = projects.filter((p) => !p.draft)

  return [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1, images: [`${siteUrl}/PP.webp`] },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/portfolio`, changeFrequency: 'monthly', priority: 0.7 },
    ...published.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      images: SHOW_SPREADS ? p.spreads.map((src) => `${siteUrl}${src}`) : [],
    })),
  ]
}

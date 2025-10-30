import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/siteConfig'
import Parser from 'rss-parser'

type MediumItem = {
  link?: string
  pubDate?: string
  isoDate?: string
}

export async function getMediumSlugs(): Promise<{ slug: string; lastMod?: Date }[]> {
  try {
    const parser: Parser<unknown, MediumItem> = new Parser({})
    const feed = await parser.parseURL('https://enkhy.medium.com/feed')

    return (
      feed.items?.map((item) => {
        const link = item.link || ''
        const slug = link.split('/').filter(Boolean).pop() || ''
        const last = item.isoDate || item.pubDate
        return {
          slug,
          lastMod: last ? new Date(last) : undefined,
        }
      }) || []
    ).filter((x) => x.slug)
  } catch {
    // On any error (network, rate limit, etc.), just return no dynamic posts
    return []
  }
}

export default async function getSitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, '')

  // Static routes
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${base}/books`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic blog posts from Medium RSS
  const slugs = await getMediumSlugs()
  for (const { slug, lastMod } of slugs) {
    entries.push({
      url: `${base}/blog/${slug}`,
      lastModified: lastMod || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  return entries
}

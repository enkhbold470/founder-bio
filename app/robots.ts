import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/siteConfig'

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, '')
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}


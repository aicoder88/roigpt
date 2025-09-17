import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://roigpt.com' // Update with your actual domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/_next/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
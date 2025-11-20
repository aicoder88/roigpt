import Script from 'next/script'

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ROIGPT",
    "description": "AI-Powered Marketing That Delivers Real ROI",
    "url": "https://roigpt.com",
    "logo": "https://roigpt.com/logo.png", // Update with actual logo URL
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "French"]
    },
    "sameAs": [
      "https://twitter.com/roigpt", // Update with actual social media URLs
      "https://linkedin.com/company/roigpt"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "NextJS Websites",
        "description": "Lightning-fast, SEO-optimized websites built with modern technology",
        "provider": {
          "@type": "Organization",
          "name": "ROIGPT"
        }
      },
      {
        "@type": "Service",
        "name": "SEO Optimization",
        "description": "AI-driven SEO strategies that get you to the top of search results",
        "provider": {
          "@type": "Organization",
          "name": "ROIGPT"
        }
      },
      {
        "@type": "Service",
        "name": "Campaign Optimization",
        "description": "Data-driven strategies that maximize your marketing ROI",
        "provider": {
          "@type": "Organization",
          "name": "ROIGPT"
        }
      }
    ]
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
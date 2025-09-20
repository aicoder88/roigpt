# Image Optimization Guide

This document outlines the comprehensive image optimization system implemented in ROIGPT using Next.js Image optimization.

## Overview

The system provides automatic image optimization with:
- **Format conversion** (AVIF/WebP)
- **Responsive sizing** based on device
- **Lazy loading** for performance
- **Loading states** and error handling
- **CDN integration** ready

## Components

### 1. OptimizedImage (Base Component)

The core component that wraps Next.js Image with enhanced features:

```tsx
import { OptimizedImage } from '@/components/ui/optimized-image';

<OptimizedImage
  src="/images/example.jpg"
  alt="Example image"
  width={800}
  height={600}
  showPlaceholder={true}
  fallbackSrc="/images/placeholder.svg"
/>
```

**Features:**
- Loading state with spinner
- Error handling with fallback
- Smooth opacity transitions
- Custom placeholder styling

### 2. ResponsiveImage

Optimized for responsive layouts with smart sizing:

```tsx
import { ResponsiveImage } from '@/components/ui/optimized-image';

<ResponsiveImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**Automatic sizing:**
- Mobile: 100% viewport width
- Tablet: 50% viewport width
- Desktop: 33% viewport width

### 3. HeroImage

Priority loading for above-the-fold content:

```tsx
import { HeroImage } from '@/components/ui/optimized-image';

<HeroImage
  src="/images/hero-banner.jpg"
  alt="Main hero banner"
  width={1920}
  height={1080}
  priority={true}
/>
```

**Optimizations:**
- Priority loading (no lazy loading)
- Full viewport width sizing
- Ideal for hero sections

### 4. AvatarImage

Predefined sizes for user avatars:

```tsx
import { AvatarImage } from '@/components/ui/optimized-image';

<AvatarImage
  src="/images/user-avatar.jpg"
  alt="User avatar"
  size="md" // sm, md, lg, xl
/>
```

**Sizes:**
- Small: 32px (chat avatars)
- Medium: 48px (profile cards)
- Large: 64px (team pages)
- XLarge: 96px (detailed profiles)

### 5. ProductImage

Various product display formats:

```tsx
import { ProductImage } from '@/components/ui/optimized-image';

<ProductImage
  src="/images/product.jpg"
  alt="Product image"
  variant="card" // card, gallery, thumbnail
  width={400}
  height={400}
/>
```

**Variants:**
- Card: Square aspect ratio
- Gallery: 4:3 aspect ratio
- Thumbnail: Small square (64px)

## Configuration

### Next.js Config (`next.config.js`)

```javascript
const nextConfig = {
  images: {
    // Allowed external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],

    // Optimized formats (AVIF first, then WebP)
    formats: ['image/avif', 'image/webp'],

    // Responsive breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache for 1 year
    minimumCacheTTL: 31536000,

    // SVG support with security
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};
```

### Performance Benefits

1. **Automatic Format Selection**
   - AVIF for supported browsers (best compression)
   - WebP fallback for older browsers
   - Original format as final fallback

2. **Responsive Images**
   - Different sizes served based on device
   - Bandwidth savings on mobile
   - Crisp images on high-DPI displays

3. **Lazy Loading**
   - Images load only when visible
   - Improves initial page load
   - Better Core Web Vitals scores

4. **Built-in Optimization**
   - Automatic resizing and compression
   - Edge caching with CDN
   - Progressive loading

## File Structure

```
public/
├── images/
│   ├── placeholder.svg       # Fallback placeholder
│   ├── hero/                 # Hero images
│   ├── products/             # Product images
│   └── avatars/              # User avatars

src/
├── components/
│   └── ui/
│       └── optimized-image.tsx  # Image components
└── docs/
    └── image-optimization.md    # This documentation
```

## Best Practices

### 1. Image Sizing
- Provide width/height for layout stability
- Use appropriate sizes for context
- Avoid oversized images

### 2. Alt Text
- Always provide descriptive alt text
- Include context for accessibility
- Keep concise but informative

### 3. Format Selection
- Use JPEG for photos
- Use PNG for graphics with transparency
- Use SVG for simple graphics and icons
- Let Next.js handle format optimization

### 4. Loading Strategy
- Use priority loading for above-the-fold images
- Use lazy loading for below-the-fold content
- Implement skeleton loading states

### 5. External Images
- Add domains to remotePatterns config
- Ensure HTTPS for external sources
- Consider security implications

## Example Implementation

```tsx
// Hero section with priority image
<HeroImage
  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
  alt="Marketing analytics dashboard"
  width={1200}
  height={600}
  priority={true}
  className="rounded-lg shadow-xl"
/>

// Product grid with responsive images
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {products.map((product) => (
    <ProductImage
      key={product.id}
      src={product.image}
      alt={product.name}
      variant="card"
      width={400}
      height={400}
    />
  ))}
</div>

// Team member avatars
<div className="flex gap-4">
  {team.map((member) => (
    <AvatarImage
      key={member.id}
      src={member.avatar}
      alt={member.name}
      size="lg"
    />
  ))}
</div>
```

## Monitoring and Analytics

Track image performance with:
- Core Web Vitals (LCP, CLS)
- Network panel analysis
- Bundle analyzer for image impact
- User experience metrics

## Migration Guide

To migrate existing `<img>` tags:

1. Replace `<img>` with appropriate component
2. Add required width/height props
3. Ensure external domains are configured
4. Add loading states if needed
5. Test responsive behavior

This optimization system provides significant performance improvements while maintaining excellent developer experience and user accessibility.
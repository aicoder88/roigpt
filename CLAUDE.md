Project Architecture
Next.js 14 App Router marketing website optimized for conversion and performance.
Tech Stack

Framework: Next.js 14 (App Router, React Server Components)
Styling: Tailwind CSS + custom design system
Components: Radix UI primitives + custom glassmorphic UI
Features: Dark/light theming, i18n (EN/FR), advanced animations
Testing: Playwright E2E, performance monitoring

File Structure
Copysrc/
├── app/           # App Router (layout.tsx, page.tsx)
├── components/    # Feature-organized React components
├── contexts/      # LanguageContext (i18n), theme providers
└── lib/          # Utilities (cn(), translations)
Optimization Priorities
Performance

Core Web Vitals: Optimize LCP, FID, CLS for Google rankings
Image Optimization: Next.js Image component, proper formats/sizing
Code Splitting: Dynamic imports, lazy loading for non-critical components
Bundle Analysis: Tree shaking, unused code elimination

Conversion Rate Optimization

Above-fold Critical Path: Hero section loads instantly
CTA Optimization: Strategic placement, A/B testable components
Social Proof: Performance metrics, testimonials, case studies
Loading States: Skeleton screens, progressive enhancement
Form UX: Validation, error handling, success states

Design System Excellence

Glass Morphism: Consistent .glass and .glass-card classes
Animation Performance: Use transform and opacity for 60fps
Responsive Design: Mobile-first, touch-friendly interactions
Accessibility: ARIA labels, keyboard navigation, screen reader support

SEO & Analytics

Metadata: Dynamic meta tags, structured data
Internationalization: Proper hreflang, locale-specific content
Performance Tracking: Real user metrics, conversion funnels
Tempo Integration: Advanced analytics for optimization insights

Key Implementation Notes
Translation System

Context-based i18n with t('key.path') syntax
localStorage persistence for language preference
Nested translation objects support complex content

Styling Conventions

CSS variables for consistent theming
Custom animations: float, glow, shimmer
Utility classes: .gradient-text, responsive breakpoints
Component variants using cn() utility

Testing Strategy

Cross-browser compatibility (Chromium, Firefox, WebKit)
User journey testing for conversion funnels
Performance regression testing
Accessibility compliance validation

Focus Areas: When making changes, prioritize conversion rate impact, Core Web Vitals scores, and maintainable component architecture.Add to Conversation
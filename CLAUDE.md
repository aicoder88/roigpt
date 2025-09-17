# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start the Next.js development server on http://localhost:3000
- `npm run build` - Build the production application
- `npm start` - Start the production server (requires build first)

### Testing
- `npm test` - Run Playwright end-to-end tests
- `npm run browsers:install` - Install Playwright browser dependencies
- `npm run report` - Show Playwright HTML test report

## Project Architecture

This is a **Next.js 14** marketing website for ROIGPT, an AI-powered marketing services company. The application uses the App Router and modern React patterns.

### Key Technologies
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Theming**: next-themes for dark/light mode
- **Internationalization**: Custom context-based i18n (English/French)
- **Testing**: Playwright for E2E tests
- **Analytics**: Tempo devtools integration

### Architecture Overview

**App Structure**:
- `src/app/` - Next.js App Router structure with layout.tsx and page.tsx
- `src/components/` - React components organized by feature
- `src/contexts/` - React contexts (LanguageContext for i18n)
- `src/lib/` - Utility functions

**Key Features**:
1. **Internationalization**: Built-in English/French language switching via LanguageContext
2. **Theme System**: Dark/light mode support with custom CSS variables
3. **Glass Morphism Design**: Custom glassmorphic UI elements with advanced animations
4. **Component Architecture**: Mix of custom components and Radix UI primitives

### Component Organization
- **Layout Components**: Header, ThemeProvider, LanguageProvider
- **Page Sections**: HeroSection, ServicesShowcase, CopywritingExamples, PerformanceMetrics
- **UI System**: Complete design system in `src/components/ui/` based on Radix UI
- **Utility**: `cn()` function in utils.ts for conditional className merging

### Styling Conventions
- Uses CSS variables for theming (defined in globals.css)
- Custom animations: float, glow, shimmer effects
- Glass morphism classes: `.glass`, `.glass-card`
- Gradient text utility: `.gradient-text`
- Responsive design with Tailwind breakpoints

### State Management
- **Language**: LanguageContext with localStorage persistence
- **Theme**: next-themes provider for system/dark/light modes
- **Local State**: React useState/useEffect for component state

### Translation System
The app uses a custom translation system in `LanguageContext.tsx`:
- Translations stored as nested objects (en/fr)
- Access via `t('key.path')` function
- Automatic localStorage persistence of language preference

### Testing Setup
Playwright is configured for cross-browser testing:
- Tests run against local dev server (auto-started)
- Supports Chromium, Firefox, and WebKit
- HTML reporter available via `npm run report`
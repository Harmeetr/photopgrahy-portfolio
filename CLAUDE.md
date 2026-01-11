# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Build production bundle
npm run lint     # Run ESLint
npm start        # Start production server (requires build first)
```

## Architecture

This is a dark, contemplative photography portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

### Content System

The site uses a **two-directory content model**:

1. **`/content/collections/`** - Markdown metadata (read at build time only)
   - Each collection is a folder containing `meta.md` with YAML frontmatter
   - Optional `media/*.md` files for image "reflections" (hidden captions)

2. **`/public/collections/`** - Static media assets (served at runtime)
   - Images/videos mirror the content structure: `public/collections/[slug]/media/`

**meta.md format:**
```yaml
---
title: "Collection Title"
date: "2024-01-01"
cover: "media/01.jpg"
description: "Short description"
order: 1
---
```

### Key Files

- **`src/lib/collections.ts`** - Content parsing logic. Reads `meta.md` files, discovers media, and loads optional reflections.
- **`src/app/collections/[slug]/page.tsx`** - Dynamic gallery pages with `generateStaticParams()` for static generation.
- **`src/components/`** - UI components using Framer Motion for scroll-triggered animations.

### Rendering Pattern

- **Static Generation**: All collection pages pre-rendered at build time via `generateStaticParams()`
- **Client Components**: Used for animations (Framer Motion), scroll detection (Navigation hide/show), and interactive elements (Reflection modal)
- **Server Components**: Collection listing and gallery data fetching

### Theme

Dark theme colors defined in `tailwind.config.js`:
- Background: `#0a0a0a`
- Surface: `#141414`
- Text: `#e5e5e5` (primary), `#737373` (muted)

## Adding Collections

1. Create `content/collections/[name]/meta.md` with frontmatter
2. Add media to `public/collections/[name]/media/`
3. Optional: Add `content/collections/[name]/media/[filename].md` for reflections

## Path Alias

Use `@/*` for imports from `src/`:
```typescript
import { Navigation } from '@/components/Navigation'
```

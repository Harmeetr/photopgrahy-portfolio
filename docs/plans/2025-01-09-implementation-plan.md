# Photography Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dark, contemplative photography portfolio with fluid galleries, looping video clips, and hidden reflections.

**Architecture:** Next.js App Router with static generation. Content lives in markdown files with local images/videos. Framer Motion handles scroll-triggered fade-in animations. No external services.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, gray-matter

---

## Task 1: Content Library - Collection Parser

**Files:**
- Create: `src/lib/collections.ts`
- Create: `content/collections/sample/meta.md`
- Create: `content/collections/sample/media/.gitkeep`

**Step 1: Create sample collection metadata**

Create `content/collections/sample/meta.md`:

```markdown
---
title: "Sample Collection"
date: "2024-01-01"
cover: "01.jpg"
description: "A sample collection for testing."
order: 1
---
```

**Step 2: Create the collections library**

Create `src/lib/collections.ts`:

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const collectionsDirectory = path.join(process.cwd(), 'content/collections')

export interface CollectionMeta {
  slug: string
  title: string
  date: string
  cover: string
  description: string
  order: number
}

export interface MediaItem {
  filename: string
  type: 'image' | 'video'
  reflection?: string
}

export interface Collection extends CollectionMeta {
  media: MediaItem[]
}

export function getCollectionSlugs(): string[] {
  return fs.readdirSync(collectionsDirectory).filter((file) => {
    const fullPath = path.join(collectionsDirectory, file)
    return fs.statSync(fullPath).isDirectory()
  })
}

export function getCollectionMeta(slug: string): CollectionMeta {
  const metaPath = path.join(collectionsDirectory, slug, 'meta.md')
  const fileContents = fs.readFileSync(metaPath, 'utf8')
  const { data } = matter(fileContents)

  return {
    slug,
    title: data.title,
    date: data.date,
    cover: data.cover,
    description: data.description,
    order: data.order ?? 0,
  }
}

export function getAllCollections(): CollectionMeta[] {
  const slugs = getCollectionSlugs()
  const collections = slugs.map((slug) => getCollectionMeta(slug))
  return collections.sort((a, b) => a.order - b.order)
}

export function getCollection(slug: string): Collection {
  const meta = getCollectionMeta(slug)
  const mediaDir = path.join(collectionsDirectory, slug, 'media')
  
  let mediaFiles: string[] = []
  if (fs.existsSync(mediaDir)) {
    mediaFiles = fs.readdirSync(mediaDir).filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.webm'].includes(ext)
    })
  }

  const media: MediaItem[] = mediaFiles
    .sort()
    .map((filename) => {
      const ext = path.extname(filename).toLowerCase()
      const isVideo = ['.mp4', '.webm'].includes(ext)
      const baseName = path.basename(filename, ext)
      
      // Check for reflection markdown
      const reflectionPath = path.join(mediaDir, `${baseName}.md`)
      let reflection: string | undefined
      if (fs.existsSync(reflectionPath)) {
        const reflectionContent = fs.readFileSync(reflectionPath, 'utf8')
        const { content } = matter(reflectionContent)
        reflection = content.trim()
      }

      return {
        filename,
        type: isVideo ? 'video' : 'image',
        reflection,
      }
    })

  return { ...meta, media }
}
```

**Step 3: Commit**

```bash
git add src/lib/collections.ts content/
git commit -m "feat: add collection parser library

- Parse collection metadata from markdown frontmatter
- Support images (jpg, png, webp) and videos (mp4, webm)
- Load optional reflection text for each media item"
```

---

## Task 2: Landing Page

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Step 1: Update global styles**

Add to `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0a0a0a;
  --surface: #141414;
  --text-primary: #e5e5e5;
  --text-muted: #737373;
  --accent: #a3a3a3;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--text-primary);
  min-height: 100vh;
}

/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
```

**Step 2: Create landing page**

Replace `src/app/page.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="text-center"
      >
        <h1 className="text-text-muted text-sm tracking-[0.3em] uppercase mb-12">
          Harmeet Rai
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
      >
        <Link
          href="/collections"
          className="text-text-primary text-lg tracking-wide hover:text-accent transition-colors duration-500"
        >
          Enter
        </Link>
      </motion.div>
    </main>
  )
}
```

**Step 3: Test locally**

```bash
npm run dev
# Visit http://localhost:3000
# Should see dark page with "Harmeet Rai" fading in, then "Enter" link
```

**Step 4: Commit**

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: add landing page with fade-in animation

- Dark, minimal entry point
- Name fades in first, then Enter link
- Hidden scrollbar for clean aesthetic"
```

---

## Task 3: Navigation Component

**Files:**
- Create: `src/components/Navigation.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create Navigation component**

Create `src/components/Navigation.tsx`:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  // Hide nav on landing page
  if (pathname === '/') return null

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 100) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-text-muted text-xs tracking-[0.2em] uppercase hover:text-text-primary transition-colors duration-300 pointer-events-auto"
        >
          Harmeet Rai
        </Link>

        <div className="flex gap-8 pointer-events-auto">
          <Link
            href="/collections"
            className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
              pathname.startsWith('/collections')
                ? 'text-text-primary'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Collections
          </Link>
          <Link
            href="/about"
            className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
              pathname === '/about'
                ? 'text-text-primary'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
```

**Step 2: Add Navigation to layout**

Modify `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Harmeet Rai - Photography',
  description: 'A gallery of human connection and the beauty of this world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/Navigation.tsx src/app/layout.tsx
git commit -m "feat: add minimal navigation that hides on scroll

- Fixed position, fades out when scrolling down
- Hidden on landing page
- Active state for current section"
```

---

## Task 4: Collections Grid Page

**Files:**
- Create: `src/app/collections/page.tsx`
- Create: `src/components/CollectionCard.tsx`

**Step 1: Create CollectionCard component**

Create `src/components/CollectionCard.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { CollectionMeta } from '@/lib/collections'

interface Props {
  collection: CollectionMeta
  index: number
}

export default function CollectionCard({ collection, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
    >
      <Link href={`/collections/${collection.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <Image
            src={`/collections/${collection.slug}/${collection.cover}`}
            alt={collection.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>
        <div className="mt-4">
          <h2 className="text-text-primary text-sm tracking-wide">
            {collection.title}
          </h2>
          <p className="text-text-muted text-xs mt-1">
            {collection.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
```

**Step 2: Create Collections page**

Create `src/app/collections/page.tsx`:

```tsx
import { getAllCollections } from '@/lib/collections'
import CollectionCard from '@/components/CollectionCard'

export default function CollectionsPage() {
  const collections = getAllCollections()

  return (
    <main className="min-h-screen px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.slug}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
```

**Step 3: Update next.config.js for local images**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
```

**Step 4: Commit**

```bash
git add src/app/collections/page.tsx src/components/CollectionCard.tsx
git commit -m "feat: add collections grid page

- Staggered fade-in animation for cards
- Subtle zoom on hover
- Responsive grid layout"
```

---

## Task 5: Gallery Components

**Files:**
- Create: `src/components/GalleryImage.tsx`
- Create: `src/components/GalleryVideo.tsx`
- Create: `src/components/Reflection.tsx`

**Step 1: Create GalleryImage component**

Create `src/components/GalleryImage.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Reflection from './Reflection'

interface Props {
  src: string
  alt: string
  reflection?: string
}

export default function GalleryImage({ src, alt, reflection }: Props) {
  const [showReflection, setShowReflection] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative w-full"
    >
      <div className="relative aspect-[3/2] md:aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />

        {reflection && (
          <button
            onClick={() => setShowReflection(true)}
            className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors duration-300"
            aria-label="Show reflection"
          >
            <span className="text-xl">+</span>
          </button>
        )}
      </div>

      {reflection && (
        <Reflection
          text={reflection}
          isOpen={showReflection}
          onClose={() => setShowReflection(false)}
        />
      )}
    </motion.div>
  )
}
```

**Step 2: Create GalleryVideo component**

Create `src/components/GalleryVideo.tsx`:

```tsx
'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  src: string
}

export default function GalleryVideo({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: '-100px' })

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isInView])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative w-full"
    >
      <div className="relative aspect-[3/2] md:aspect-[16/10] overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  )
}
```

**Step 3: Create Reflection component**

Create `src/components/Reflection.tsx`:

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  text: string
  isOpen: boolean
  onClose: () => void
}

export default function Reflection({ text, isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-text-primary text-lg leading-relaxed font-light">
              {text}
            </p>
            <button
              onClick={onClose}
              className="mt-8 text-text-muted text-sm hover:text-text-primary transition-colors duration-300"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Step 4: Commit**

```bash
git add src/components/GalleryImage.tsx src/components/GalleryVideo.tsx src/components/Reflection.tsx
git commit -m "feat: add gallery components

- GalleryImage with fade-in on scroll and optional reflection
- GalleryVideo as looping, muted moving photograph
- Reflection overlay for hidden thoughts"
```

---

## Task 6: Individual Collection Page

**Files:**
- Create: `src/app/collections/[slug]/page.tsx`
- Create: `src/components/ProgressIndicator.tsx`

**Step 1: Create ProgressIndicator**

Create `src/components/ProgressIndicator.tsx`:

```tsx
'use client'

import { motion, useScroll } from 'framer-motion'

export default function ProgressIndicator() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 w-[2px] h-24 bg-surface z-40"
    >
      <motion.div
        className="w-full bg-text-muted origin-top"
        style={{ scaleY: scrollYProgress }}
      />
    </motion.div>
  )
}
```

**Step 2: Create collection page**

Create `src/app/collections/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { getCollection, getCollectionSlugs } from '@/lib/collections'
import GalleryImage from '@/components/GalleryImage'
import GalleryVideo from '@/components/GalleryVideo'
import ProgressIndicator from '@/components/ProgressIndicator'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getCollectionSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params
  
  try {
    const collection = getCollection(slug)

    return (
      <main className="min-h-screen">
        <ProgressIndicator />

        {/* Header */}
        <div className="pt-32 pb-16 px-6 text-center">
          <h1 className="text-text-primary text-2xl tracking-wide">
            {collection.title}
          </h1>
          <p className="text-text-muted text-sm mt-2">
            {collection.description}
          </p>
        </div>

        {/* Gallery */}
        <div className="px-6 md:px-12 lg:px-24 space-y-[30vh]">
          {collection.media.map((item, index) => (
            <div key={item.filename} className="max-w-5xl mx-auto">
              {item.type === 'video' ? (
                <GalleryVideo
                  src={`/collections/${slug}/media/${item.filename}`}
                />
              ) : (
                <GalleryImage
                  src={`/collections/${slug}/media/${item.filename}`}
                  alt={`${collection.title} - ${index + 1}`}
                  reflection={item.reflection}
                />
              )}
            </div>
          ))}
        </div>

        {/* End spacer */}
        <div className="h-[50vh]" />
      </main>
    )
  } catch {
    notFound()
  }
}
```

**Step 3: Commit**

```bash
git add src/app/collections/[slug]/page.tsx src/components/ProgressIndicator.tsx
git commit -m "feat: add individual collection gallery page

- Vertical scroll with generous spacing (30vh gaps)
- Progress indicator on right side
- Static generation for all collections"
```

---

## Task 7: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Create About page**

Create `src/app/about/page.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-16">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-text-primary text-2xl tracking-wide mb-12">
            About
          </h1>

          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              I capture moments of human connection and the quiet beauty that
              exists in the spaces between.
            </p>

            <p>
              Photography, for me, is a practice of presence—seeing what is
              already there, waiting to be noticed. Each image is an invitation
              to pause, to feel the oneness that connects us all.
            </p>

            <p>
              These photographs come from solo travels, early mornings, and the
              edges of ordinary days. They are my attempt to share how I see
              this world—with wonder, with calm, with gratitude.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-surface">
            <a
              href="mailto:hello@harmeetrai.com"
              className="text-text-muted text-sm hover:text-text-primary transition-colors duration-300"
            >
              hello@harmeetrai.com
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add about page

- Simple, honest philosophy text
- Email contact at bottom
- Same dark, minimal aesthetic"
```

---

## Task 8: Sample Content & Public Assets Setup

**Files:**
- Create: `public/collections/sample/01.jpg` (placeholder)
- Create: `public/collections/sample/media/01.jpg`
- Modify: `content/collections/sample/meta.md`

**Step 1: Set up public folder structure**

The images need to be in `/public` for Next.js Image component to serve them. Create the structure:

```bash
mkdir -p public/collections/sample/media
```

**Step 2: Update sample collection**

Update `content/collections/sample/meta.md`:

```markdown
---
title: "Sample Collection"
date: "2024-01-01"
cover: "media/01.jpg"
description: "A sample collection for development."
order: 1
---
```

**Step 3: Add a sample reflection**

Create `content/collections/sample/media/01.md`:

```markdown
---
image: "01.jpg"
---

This is a sample reflection. Replace with your actual thoughts.
```

**Step 4: Note for user**

Add placeholder images to `public/collections/sample/media/` for testing. Real photos will replace these.

**Step 5: Commit**

```bash
git add content/ public/
git commit -m "feat: add sample collection structure

- Example metadata and reflection
- Public folder structure for images"
```

---

## Task 9: Final Polish & Build Verification

**Files:**
- Modify: `src/app/layout.tsx` (add metadata)
- Create: `.nvmrc`

**Step 1: Enhance metadata**

Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Harmeet Rai - Photography',
  description: 'A gallery of human connection and the beauty of this world.',
  openGraph: {
    title: 'Harmeet Rai - Photography',
    description: 'A gallery of human connection and the beauty of this world.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
```

**Step 2: Add Node version file**

Create `.nvmrc`:

```
20
```

**Step 3: Run full build**

```bash
npm run build
npm run lint
```

**Step 4: Final commit**

```bash
git add .
git commit -m "chore: final polish and build verification

- Enhanced metadata for SEO/sharing
- Node version specification
- Verified build passes"
```

---

## Task 10: Deployment Preparation

**Files:**
- Create: `vercel.json` (optional, for subdomain)
- Update: `README.md`

**Step 1: Create Vercel config**

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

**Step 2: Create README**

Create `README.md`:

```markdown
# Photography Portfolio

A dark, contemplative photography portfolio built with Next.js.

## Development

```bash
npm install
npm run dev
```

## Adding Content

1. Create a folder in `content/collections/your-collection-name/`
2. Add `meta.md` with frontmatter (title, date, cover, description, order)
3. Add images/videos to `public/collections/your-collection-name/media/`
4. Optionally add `filename.md` reflections for individual images

## Deployment

Push to main branch. Vercel auto-deploys.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
```

**Step 3: Commit**

```bash
git add .
git commit -m "docs: add README and Vercel config"
```

---

## Summary

After completing all tasks, you will have:

1. **Landing page** - Dark, minimal entry with fade-in
2. **Navigation** - Hides on scroll, minimal links
3. **Collections grid** - Cover images with hover effects
4. **Gallery pages** - Vertical scroll, 30vh gaps, fade-in animations
5. **Video support** - Looping, muted, autoplay clips
6. **Reflections** - Hidden text revealed on tap
7. **About page** - Philosophy and contact
8. **Content system** - Markdown + local files, no CMS

**To add real content:**
1. Create collection folders in `content/collections/`
2. Add images to `public/collections/[slug]/media/`
3. Write `meta.md` and optional reflection `.md` files
4. Commit and push - Vercel deploys automatically

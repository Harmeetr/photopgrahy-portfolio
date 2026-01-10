# Gallery Experience Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the vertical scroll gallery into a cinematic horizontal scroll experience with film aesthetic and split-view lightbox.

**Architecture:** Replace current vertical gallery with horizontal scene-based layout. Each scene contains 1-3 images in varied arrangements (hero, duo, cluster). Click opens lightbox with image + reflection panel. Film grain overlay and warm color treatment throughout.

**Tech Stack:** Next.js 15, React 19, Framer Motion, TypeScript, Tailwind CSS

---

## Task 1: Add Film Grain SVG Filter

**Files:**
- Create: `src/components/FilmGrain.tsx`

**Step 1: Create the film grain component**

```tsx
'use client'

export default function FilmGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* SVG noise filter */}
      <svg className="hidden">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          filter: 'url(#film-grain)',
          transform: 'scale(1.2)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
        }}
      />
    </div>
  )
}
```

**Step 2: Verify component renders**

Run: `npm run dev`
Navigate to http://localhost:3002 and inspect - should see SVG filter and overlay divs in DOM.

**Step 3: Commit**

```bash
git add src/components/FilmGrain.tsx
git commit -m "feat: add film grain and vignette overlay component"
```

---

## Task 2: Add FilmGrain to Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Import and add FilmGrain**

Add import at top:
```tsx
import FilmGrain from '@/components/FilmGrain'
```

Add `<FilmGrain />` inside the body, after `{children}`:
```tsx
<body className={...}>
  <Navigation />
  {children}
  <FilmGrain />
</body>
```

**Step 2: Verify grain appears on all pages**

Run: `npm run dev`
Navigate to http://localhost:3002 - subtle grain texture should be visible across all pages.

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add film grain overlay to all pages"
```

---

## Task 3: Create Scene Layout Component

**Files:**
- Create: `src/components/gallery/Scene.tsx`

**Step 1: Create Scene component with three layout variants**

```tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export type SceneLayout = 'hero' | 'duo' | 'cluster'

export interface SceneImage {
  src: string
  alt: string
  reflection?: string
}

interface SceneProps {
  layout: SceneLayout
  images: SceneImage[]
  collectionSlug: string
  onImageClick: (index: number) => void
  startIndex: number
}

export default function Scene({ layout, images, collectionSlug, onImageClick, startIndex }: SceneProps) {
  const imageStyle = "relative rounded-[4px] overflow-hidden cursor-pointer shadow-2xl shadow-black/20 hover:-translate-y-0.5 transition-transform duration-300"
  const filterStyle = { filter: 'sepia(0.08) saturate(1.05) brightness(0.98)' }

  if (layout === 'hero') {
    return (
      <div className="flex items-center justify-center h-full px-20">
        <motion.div
          className={`${imageStyle} max-w-5xl w-full aspect-[3/2]`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          onClick={() => onImageClick(startIndex)}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover"
            style={filterStyle}
            sizes="80vw"
          />
        </motion.div>
      </div>
    )
  }

  if (layout === 'duo') {
    return (
      <div className="flex items-center justify-center h-full px-20 gap-6">
        {images.slice(0, 2).map((img, i) => (
          <motion.div
            key={img.src}
            className={`${imageStyle} flex-1 max-w-xl aspect-[4/5]`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            onClick={() => onImageClick(startIndex + i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              style={filterStyle}
              sizes="40vw"
            />
          </motion.div>
        ))}
      </div>
    )
  }

  // cluster layout
  return (
    <div className="flex items-center justify-center h-full px-20 gap-6">
      <motion.div
        className={`${imageStyle} flex-[1.2] max-w-2xl aspect-[3/4]`}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        onClick={() => onImageClick(startIndex)}
      >
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-cover"
          style={filterStyle}
          sizes="45vw"
        />
      </motion.div>
      <div className="flex flex-col gap-6 flex-1 max-w-md">
        {images.slice(1, 3).map((img, i) => (
          <motion.div
            key={img.src}
            className={`${imageStyle} aspect-[4/3]`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: (i + 1) * 0.15 }}
            onClick={() => onImageClick(startIndex + i + 1)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              style={filterStyle}
              sizes="30vw"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Verify file compiles**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors.

**Step 3: Commit**

```bash
git add src/components/gallery/Scene.tsx
git commit -m "feat: add Scene component with hero/duo/cluster layouts"
```

---

## Task 4: Create Lightbox Component

**Files:**
- Create: `src/components/gallery/Lightbox.tsx`

**Step 1: Create the lightbox with split view**

```tsx
'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  images: { src: string; alt: string; reflection?: string }[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export default function Lightbox({ isOpen, onClose, images, currentIndex, onNavigate }: LightboxProps) {
  const current = images[currentIndex]
  const hasReflection = !!current?.reflection

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1)
    if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1)
  }, [onClose, onNavigate, currentIndex, images.length])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95"
            onClick={onClose}
          />

          {/* Content */}
          <div className={`relative z-10 flex items-center gap-8 max-w-7xl mx-auto px-8 ${hasReflection ? 'w-full' : ''}`}>
            {/* Left arrow */}
            {currentIndex > 0 && (
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Image */}
            <motion.div
              className={`relative ${hasReflection ? 'flex-[0.6]' : ''}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className={`relative ${hasReflection ? 'aspect-[4/3]' : 'max-h-[85vh]'} rounded-[4px] overflow-hidden shadow-2xl`}>
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill={hasReflection}
                  width={hasReflection ? undefined : 1200}
                  height={hasReflection ? undefined : 800}
                  className={hasReflection ? 'object-cover' : 'object-contain max-h-[85vh] w-auto'}
                  style={{ filter: 'sepia(0.08) saturate(1.05) brightness(0.98)' }}
                  sizes="60vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Reflection panel */}
            {hasReflection && (
              <motion.div
                className="flex-[0.35] bg-[#FAF8F5] rounded-[4px] p-8 max-h-[70vh] overflow-y-auto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <p className="text-[#3D3833] font-serif text-lg leading-relaxed">
                  {current.reflection}
                </p>
              </motion.div>
            )}

            {/* Right arrow */}
            {currentIndex < images.length - 1 && (
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-wider">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Step 2: Verify file compiles**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/gallery/Lightbox.tsx
git commit -m "feat: add Lightbox component with split-view reflection panel"
```

---

## Task 5: Create HorizontalGallery Component

**Files:**
- Create: `src/components/gallery/HorizontalGallery.tsx`

**Step 1: Create the main gallery container**

```tsx
'use client'

import { useState, useMemo } from 'react'
import Scene, { SceneLayout, SceneImage } from './Scene'
import Lightbox from './Lightbox'

interface MediaItem {
  filename: string
  type: 'image' | 'video'
  reflection?: string
}

interface HorizontalGalleryProps {
  collectionSlug: string
  collectionTitle: string
  media: MediaItem[]
}

interface SceneConfig {
  layout: SceneLayout
  images: SceneImage[]
  startIndex: number
}

export default function HorizontalGallery({ collectionSlug, collectionTitle, media }: HorizontalGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Convert media to scene images
  const allImages: SceneImage[] = useMemo(() =>
    media
      .filter(m => m.type === 'image')
      .map((m, i) => ({
        src: `/collections/${collectionSlug}/media/${m.filename}`,
        alt: `${collectionTitle} - ${i + 1}`,
        reflection: m.reflection,
      })),
    [media, collectionSlug, collectionTitle]
  )

  // Distribute images into scenes
  const scenes: SceneConfig[] = useMemo(() => {
    const result: SceneConfig[] = []
    let i = 0
    const layouts: SceneLayout[] = ['hero', 'duo', 'cluster']
    let layoutIndex = 0

    while (i < allImages.length) {
      const layout = layouts[layoutIndex % layouts.length]
      const count = layout === 'hero' ? 1 : layout === 'duo' ? 2 : 3
      const available = allImages.slice(i, i + count)

      if (available.length > 0) {
        // Adjust layout if not enough images
        let finalLayout = layout
        if (available.length === 1) finalLayout = 'hero'
        else if (available.length === 2 && layout === 'cluster') finalLayout = 'duo'

        result.push({
          layout: finalLayout,
          images: available,
          startIndex: i,
        })
        i += available.length
        layoutIndex++
      } else {
        break
      }
    }
    return result
  }, [allImages])

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* Horizontal scroll container */}
      <div
        className="flex overflow-x-auto snap-x snap-mandatory h-[calc(100vh-8rem)] scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {scenes.map((scene, i) => (
          <div
            key={i}
            className="flex-none w-screen h-full snap-center"
          >
            <Scene
              layout={scene.layout}
              images={scene.images}
              collectionSlug={collectionSlug}
              onImageClick={handleImageClick}
              startIndex={scene.startIndex}
            />
          </div>
        ))}
      </div>

      {/* Scene indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {scenes.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/20"
          />
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={allImages}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
      />
    </>
  )
}
```

**Step 2: Add scrollbar-hide utility to globals.css**

Add to `src/app/globals.css`:
```css
/* Hide scrollbar for horizontal gallery */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

**Step 3: Verify file compiles**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/components/gallery/HorizontalGallery.tsx src/app/globals.css
git commit -m "feat: add HorizontalGallery with scene distribution and scroll snap"
```

---

## Task 6: Create Gallery Index File

**Files:**
- Create: `src/components/gallery/index.ts`

**Step 1: Create barrel export**

```ts
export { default as HorizontalGallery } from './HorizontalGallery'
export { default as Lightbox } from './Lightbox'
export { default as Scene } from './Scene'
```

**Step 2: Commit**

```bash
git add src/components/gallery/index.ts
git commit -m "chore: add gallery component barrel exports"
```

---

## Task 7: Add Serif Font for Reflections

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add EB Garamond font**

Add import at top:
```tsx
import { EB_Garamond } from 'next/font/google'
```

Configure font:
```tsx
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
})
```

Add to body className:
```tsx
<body className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} ...`}>
```

**Step 2: Add font-serif utility to Tailwind config**

Modify `tailwind.config.js` - add to theme.extend:
```js
fontFamily: {
  serif: ['var(--font-serif)', 'Georgia', 'serif'],
},
```

**Step 3: Verify fonts load**

Run: `npm run dev`
Expected: No errors, fonts should load.

**Step 4: Commit**

```bash
git add src/app/layout.tsx tailwind.config.js
git commit -m "feat: add EB Garamond serif font for reflection text"
```

---

## Task 8: Update Collection Page to Use New Gallery

**Files:**
- Modify: `src/app/collections/[slug]/page.tsx`

**Step 1: Replace vertical gallery with HorizontalGallery**

Update imports:
```tsx
import { HorizontalGallery } from '@/components/gallery'
```

Remove old imports:
```tsx
// Remove these:
// import GalleryImage from '@/components/GalleryImage'
// import GalleryVideo from '@/components/GalleryVideo'
// import ProgressIndicator from '@/components/ProgressIndicator'
```

Replace the return content:
```tsx
export default async function CollectionPage({ params }: Props) {
  const { slug } = await params

  try {
    const collection = getCollection(slug)

    return (
      <main className="min-h-screen pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-text-primary text-2xl tracking-wide">
            {collection.title}
          </h1>
          <p className="text-text-muted text-sm mt-2">
            {collection.description}
          </p>
        </div>

        {/* Horizontal Gallery */}
        <HorizontalGallery
          collectionSlug={slug}
          collectionTitle={collection.title}
          media={collection.media}
        />
      </main>
    )
  } catch {
    notFound()
  }
}
```

**Step 2: Verify page renders**

Run: `npm run dev`
Navigate to http://localhost:3002/collections/landscapes
Expected: Horizontal scrolling gallery with scenes.

**Step 3: Commit**

```bash
git add src/app/collections/[slug]/page.tsx
git commit -m "feat: replace vertical gallery with horizontal scene-based gallery"
```

---

## Task 9: Test Full Flow and Polish

**Files:**
- Potentially adjust: Various component files for polish

**Step 1: Test horizontal scroll**

Navigate to each collection:
- http://localhost:3002/collections/sample
- http://localhost:3002/collections/landscapes
- http://localhost:3002/collections/portraits

Verify:
- Horizontal scroll works smoothly
- Scenes snap into place
- Different layouts appear (hero, duo, cluster)

**Step 2: Test lightbox**

Click on images:
- Lightbox opens with fade animation
- Arrow keys navigate between images
- Escape closes lightbox
- Images without reflections show centered
- Images with reflections show split view

**Step 3: Test film aesthetic**

Verify across all pages:
- Subtle grain texture visible
- Slight warm color tint on images
- Vignette at screen edges
- Images have rounded corners and shadow

**Step 4: Build and verify**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete gallery experience with film aesthetic"
```

---

## Task 10: Clean Up Old Components (Optional)

**Files:**
- Delete: `src/components/GalleryImage.tsx` (if no longer used)
- Delete: `src/components/GalleryVideo.tsx` (if no longer used)
- Delete: `src/components/ProgressIndicator.tsx` (if no longer used)
- Delete: `src/components/Reflection.tsx` (if no longer used)

**Step 1: Verify components are unused**

Search for imports of these components in codebase.

**Step 2: Delete unused files**

Only delete if confirmed unused.

**Step 3: Commit cleanup**

```bash
git add -A
git commit -m "chore: remove unused gallery components"
```

---

## Summary

After completing all tasks, you will have:

1. **Film grain overlay** - Subtle noise texture + vignette on all pages
2. **Horizontal scroll gallery** - Scene-based with snap scrolling
3. **Three scene layouts** - Hero (1 image), Duo (2 images), Cluster (3 images)
4. **Split-view lightbox** - Image + reflection panel, or centered fullscreen
5. **Film color treatment** - Warm sepia tint on all images
6. **Keyboard navigation** - Arrow keys in both gallery and lightbox

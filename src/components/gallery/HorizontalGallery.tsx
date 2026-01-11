'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
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
  const [currentScene, setCurrentScene] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Navigate to a specific scene
  const goToScene = useCallback((index: number) => {
    if (index < 0 || index >= scenes.length || !containerRef.current) return
    const sceneWidth = window.innerWidth
    containerRef.current.scrollTo({
      left: index * sceneWidth,
      behavior: 'smooth'
    })
    setCurrentScene(index)
  }, [scenes.length])

  const goNext = useCallback(() => {
    if (currentScene < scenes.length - 1) {
      goToScene(currentScene + 1)
    }
  }, [currentScene, scenes.length, goToScene])

  const goPrev = useCallback(() => {
    if (currentScene > 0) {
      goToScene(currentScene - 1)
    }
  }, [currentScene, goToScene])

  // Handle keyboard navigation
  useEffect(() => {
    if (lightboxOpen) return // Don't interfere with lightbox navigation

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, goNext, goPrev])

  // Handle scroll wheel to navigate scenes
  useEffect(() => {
    if (lightboxOpen) return

    let lastScrollTime = 0
    const scrollThrottle = 800 // ms between scroll navigations

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScrollTime < scrollThrottle) return

      // Detect vertical scroll (deltaY) and convert to horizontal navigation
      if (Math.abs(e.deltaY) > 30) {
        e.preventDefault()
        lastScrollTime = now
        if (e.deltaY > 0) {
          goNext()
        } else {
          goPrev()
        }
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [lightboxOpen, goNext, goPrev])

  // Track current scene on scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const sceneWidth = window.innerWidth
      const newScene = Math.round(container.scrollLeft / sceneWidth)
      if (newScene !== currentScene && newScene >= 0 && newScene < scenes.length) {
        setCurrentScene(newScene)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [currentScene, scenes.length])

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
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

      {/* Left arrow */}
      {currentScene > 0 && !lightboxOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={goPrev}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/30 text-white/60 hover:bg-black/50 hover:text-white transition-all"
          aria-label="Previous scene"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>
      )}

      {/* Right arrow */}
      {currentScene < scenes.length - 1 && !lightboxOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={goNext}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/30 text-white/60 hover:bg-black/50 hover:text-white transition-all"
          aria-label="Next scene"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      )}

      {/* Scene indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {scenes.map((_, i) => (
          <button
            key={i}
            onClick={() => goToScene(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentScene
                ? 'bg-white/80 scale-125'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to scene ${i + 1}`}
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

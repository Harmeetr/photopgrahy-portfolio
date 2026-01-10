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

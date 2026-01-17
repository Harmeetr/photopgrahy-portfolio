'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface ImageData {
  src: string
  alt: string
  collection: string
  collectionSlug: string
  date: string
  index: number
}

interface ConstellationViewProps {
  images: ImageData[]
}

export default function ConstellationView({ images }: ConstellationViewProps) {
  const [hoveredImage, setHoveredImage] = useState<ImageData | null>(null)
  const [filter, setFilter] = useState<string | null>(null)

  const collections = useMemo(() => {
    const unique = [...new Set(images.map(img => img.collection))]
    return unique
  }, [images])

  const positions = useMemo(() => {
    return images.map((_, i) => {
      const seed = i * 137.508
      const x = 10 + (Math.sin(seed) * 0.5 + 0.5) * 75
      const y = 15 + (Math.cos(seed * 1.3) * 0.5 + 0.5) * 65
      const size = 60 + (Math.sin(seed * 2.1) * 0.5 + 0.5) * 60
      const rotation = (Math.sin(seed * 0.7) * 10)
      return { x, y, size, rotation }
    })
  }, [images])

  const filteredImages = filter
    ? images.filter(img => img.collection === filter)
    : images

  return (
    <div className="min-h-screen pt-32 pb-16 px-6">
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
            filter === null
              ? 'bg-accent/20 text-accent'
              : 'text-text-muted/60 hover:text-text-muted'
          }`}
        >
          all
        </button>
        {collections.map(collection => (
          <button
            key={collection}
            onClick={() => setFilter(filter === collection ? null : collection)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
              filter === collection
                ? 'bg-accent/20 text-accent'
                : 'text-text-muted/60 hover:text-text-muted'
            }`}
          >
            {collection.toLowerCase()}
          </button>
        ))}
      </div>

      <div className="relative w-full h-[70vh] md:h-[75vh]">
        <AnimatePresence>
          {images.map((img, i) => {
            const pos = positions[i]
            const isFiltered = filter && img.collection !== filter
            const isHovered = hoveredImage?.src === img.src

            return (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isFiltered ? 0.15 : 1,
                  scale: isHovered ? 1.5 : 1,
                  zIndex: isHovered ? 50 : 1,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: i * 0.02 }}
                className="absolute cursor-pointer"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
                }}
                onMouseEnter={() => setHoveredImage(img)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <Link href={`/collections/${img.collectionSlug}`}>
                  <div
                    className="relative rounded-sm overflow-hidden shadow-md shadow-black/30 transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/20"
                    style={{
                      width: `${pos.size}px`,
                      height: `${pos.size * 1.2}px`,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>

        <AnimatePresence>
          {hoveredImage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center z-50"
            >
              <span className="font-handwritten text-accent text-xl">
                {hoveredImage.collection}
              </span>
              <span className="block text-text-muted/60 text-sm mt-1">
                {new Date(hoveredImage.date).getFullYear()}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center mt-8">
        <span className="font-handwritten text-text-muted/50 text-lg">
          hover to explore · click to visit
        </span>
      </div>
    </div>
  )
}

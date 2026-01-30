'use client'

import { useRef, useEffect, memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Base64 blur placeholder
const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBQAEBhEHEiExE0FR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADBBEh/9oADAMBAAIRAxEAPwC5j2U3mP4/a2d1aW0l5aB5pIKnEoUSEhRBJJJJJPZrWaUqFmJYljwMBF//2Q=='

interface FilmstripProps {
  images: { src: string; alt: string }[]
  currentIndex: number
  onSelect: (index: number) => void
}

// Memoized thumbnail component
const Thumbnail = memo(function Thumbnail({ 
  image, 
  index, 
  isActive, 
  onClick 
}: { 
  image: { src: string; alt: string }
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-sm overflow-hidden
        transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
        ${isActive 
          ? 'ring-2 ring-accent scale-110 opacity-100' 
          : 'opacity-50 hover:opacity-80'
        }
      `}
      whileHover={{ scale: isActive ? 1.1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`View image ${index + 1}`}
      aria-current={isActive ? 'true' : undefined}
    >
      <Image
        src={image.src}
        alt=""
        fill
        className={`object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="56px"
        placeholder="blur"
        blurDataURL={blurDataURL}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-surface animate-pulse" />
      )}
    </motion.button>
  )
})

function Filmstrip({ images, currentIndex, onSelect }: FilmstripProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Auto-scroll to keep current image visible
  useEffect(() => {
    if (containerRef.current) {
      const thumb = containerRef.current.children[currentIndex] as HTMLElement
      if (thumb) {
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [currentIndex])

  const handleSelect = useCallback((index: number) => {
    onSelect(index)
  }, [onSelect])

  // Don't render filmstrip for very few images
  if (images.length <= 1) return null

  return (
    <nav 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[80vw]"
      aria-label="Image gallery navigation"
    >
      <div 
        ref={containerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-4"
        role="tablist"
        aria-label="Gallery images"
      >
        {images.map((image, index) => (
          <Thumbnail
            key={image.src}
            image={image}
            index={index}
            isActive={index === currentIndex}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>
      
      {/* Elegant counter */}
      <div className="text-center mt-3" aria-live="polite">
        <span className="font-handwritten text-accent/80 text-lg">
          {currentIndex + 1} <span className="text-accent/40">of</span> {images.length}
        </span>
      </div>
    </nav>
  )
}

export default memo(Filmstrip)

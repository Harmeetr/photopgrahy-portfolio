'use client'

import { useState, useCallback, memo } from 'react'
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

// Base64 blur placeholder - warm dark
const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBQAEBhEHEiExE0FR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADBBEh/9oADAMBAAIRAxEAPwC5j2U3mP4/a2d1aW0l5aB5pIKnEoUSEhRBJJJJJPZrWaUqFmJYljwMBF//2Q=='

// Memoized image component to prevent re-renders
const GalleryImageItem = memo(function GalleryImageItem({ 
  image, 
  index, 
  onClick, 
  className,
  sizes,
  priority = false
}: { 
  image: SceneImage
  index: number
  onClick: () => void
  className: string
  sizes: string
  priority?: boolean
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])

  return (
    <motion.div
      className={`${className} relative rounded-[4px] overflow-hidden cursor-pointer shadow-2xl shadow-black/20 hover:-translate-y-0.5 transition-transform duration-300`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={handleClick}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={blurDataURL}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
      />
      {/* Placeholder gradient while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-surface to-background animate-pulse" />
      )}
    </motion.div>
  )
})

function Scene({ layout, images, onImageClick, startIndex }: SceneProps) {
  const handleClick = useCallback((index: number) => {
    onImageClick(index)
  }, [onImageClick])

  if (layout === 'hero') {
    return (
      <div className="flex items-center justify-center h-full px-8 md:px-20">
        <GalleryImageItem
          image={images[0]}
          index={0}
          onClick={() => handleClick(startIndex)}
          className="max-w-5xl w-full aspect-[3/2]"
          sizes="(max-width: 768px) 95vw, 80vw"
          priority={startIndex === 0}
        />
      </div>
    )
  }

  if (layout === 'duo') {
    return (
      <div className="flex items-center justify-center h-full px-8 md:px-20 gap-4 md:gap-6">
        {images.slice(0, 2).map((img, i) => (
          <GalleryImageItem
            key={img.src}
            image={img}
            index={i}
            onClick={() => handleClick(startIndex + i)}
            className="flex-1 max-w-xl aspect-[4/5]"
            sizes="(max-width: 768px) 45vw, 40vw"
          />
        ))}
      </div>
    )
  }

  // cluster layout
  return (
    <div className="flex items-center justify-center h-full px-8 md:px-20 gap-4 md:gap-6">
      <GalleryImageItem
        image={images[0]}
        index={0}
        onClick={() => handleClick(startIndex)}
        className="flex-[1.2] max-w-2xl aspect-[3/4]"
        sizes="(max-width: 768px) 60vw, 45vw"
      />
      <div className="flex flex-col gap-4 md:gap-6 flex-1 max-w-md">
        {images.slice(1, 3).map((img, i) => (
          <GalleryImageItem
            key={img.src}
            image={img}
            index={i + 1}
            onClick={() => handleClick(startIndex + i + 1)}
            className="aspect-[4/3]"
            sizes="(max-width: 768px) 35vw, 30vw"
          />
        ))}
      </div>
    </div>
  )
}

export default memo(Scene)

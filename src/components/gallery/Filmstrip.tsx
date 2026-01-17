'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface FilmstripProps {
  images: { src: string; alt: string }[]
  currentIndex: number
  onSelect: (index: number) => void
}

export default function Filmstrip({ images, currentIndex, onSelect }: FilmstripProps) {
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

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[80vw]">
      <div 
        ref={containerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-4"
      >
        {images.map((image, index) => (
          <motion.button
            key={image.src}
            onClick={() => onSelect(index)}
            className={`
              relative flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-sm overflow-hidden
              transition-all duration-300
              ${index === currentIndex 
                ? 'ring-2 ring-accent scale-110 opacity-100' 
                : 'opacity-50 hover:opacity-80'
              }
            `}
            whileHover={{ scale: index === currentIndex ? 1.1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="56px"
            />
          </motion.button>
        ))}
      </div>
      
      {/* Elegant counter */}
      <div className="text-center mt-3">
        <span className="font-handwritten text-accent/80 text-lg">
          {currentIndex + 1} <span className="text-accent/40">of</span> {images.length}
        </span>
      </div>
    </div>
  )
}

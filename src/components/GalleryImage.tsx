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

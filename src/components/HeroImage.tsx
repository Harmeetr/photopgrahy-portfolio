'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface HeroImageProps {
  src: string
  alt: string
}

export default function HeroImage({ src, alt }: HeroImageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: 1,
        }}
        transition={{
          scale: { duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" },
          opacity: { duration: 2, ease: "easeOut" }
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
    </div>
  )
}

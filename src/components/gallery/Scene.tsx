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
                            sizes="30vw"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

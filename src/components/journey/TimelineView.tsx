'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
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

interface TimelineViewProps {
  images: ImageData[]
}

export default function TimelineView({ images }: TimelineViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const imagesByYear = images.reduce((acc, img) => {
    const year = new Date(img.date).getFullYear().toString()
    if (!acc[year]) acc[year] = []
    acc[year].push(img)
    return acc
  }, {} as Record<string, ImageData[]>)

  const years = Object.keys(imagesByYear).sort()

  return (
    <div className="pt-32 pb-16">
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide"
      >
        <div className="flex items-center min-w-max px-16 py-8">
          {years.map((year, yearIndex) => (
            <div key={year} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: yearIndex * 0.1 }}
                className="flex flex-col items-center mr-8"
              >
                <span className="font-handwritten text-accent text-2xl mb-4">
                  {year}
                </span>
                <div className="w-3 h-3 rounded-full bg-accent/40" />
              </motion.div>

              <div className="flex items-end gap-6 mr-16">
                {imagesByYear[year].map((img, imgIndex) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: yearIndex * 0.1 + imgIndex * 0.05 }}
                    className="relative group"
                    style={{
                      marginBottom: `${(imgIndex % 3) * 20}px`,
                    }}
                  >
                    <Link href={`/collections/${img.collectionSlug}`}>
                      <div className="relative w-32 h-40 md:w-40 md:h-52 rounded-sm overflow-hidden shadow-lg shadow-black/20 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-accent/10 group-hover:scale-105">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <span className="font-handwritten text-accent/80 text-sm">
                          {img.collection}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {yearIndex < years.length - 1 && (
                <div className="w-24 h-px bg-accent/20 mr-8" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <span className="font-handwritten text-text-muted/50 text-lg">
          ← scroll through time →
        </span>
      </div>
    </div>
  )
}

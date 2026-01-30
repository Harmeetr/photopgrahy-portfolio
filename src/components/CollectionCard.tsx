'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { CollectionMeta } from '@/lib/collections'

// Base64 blur placeholder
const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBQAEBhEHEiExE0FR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADBBEh/9oADAMBAAIRAxEAPwC5j2U3mP4/a2d1aW0l5aB5pIKnEoUSEhRBJJJJJPZrWaUqFmJYljwMBF//2Q=='

interface Props {
  collection: CollectionMeta
  index: number
  variant?: 'featured' | 'standard'
}

export default function CollectionCard({ collection, index, variant = 'standard' }: Props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const isFeatured = variant === 'featured'
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
    >
      <Link href={`/collections/${collection.slug}`} className="group block">
        <div className={`
          relative overflow-hidden rounded-sm
          ${isFeatured ? 'aspect-[4/3]' : 'aspect-[4/5]'}
          shadow-lg shadow-black/20
          transition-all duration-500
          group-hover:shadow-xl group-hover:shadow-accent/10
        `}>
          <Image
            src={`/collections/${collection.slug}/${collection.cover}`}
            alt={`Cover image for ${collection.title} collection`}
            fill
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes={isFeatured 
              ? "(max-width: 768px) 100vw, 58vw" 
              : "(max-width: 768px) 100vw, 40vw"
            }
            placeholder="blur"
            blurDataURL={blurDataURL}
            loading={index < 2 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
          />
          {/* Loading placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-surface to-background animate-pulse" />
          )}
          <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500" aria-hidden="true" />
          
          <div className="absolute inset-0 rounded-sm ring-1 ring-white/0 group-hover:ring-accent/20 transition-all duration-500" aria-hidden="true" />
        </div>

        <div className="mt-5">
          <h2 className="font-handwritten text-accent text-2xl tracking-wide group-hover:text-text-primary transition-colors duration-500">
            {collection.title}
          </h2>
          
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {collection.date && (
              <time 
                dateTime={collection.date}
                className="text-text-muted/70 text-xs tracking-wider"
              >
                {new Date(collection.date).getFullYear()}
              </time>
            )}
            <span className="w-1 h-1 rounded-full bg-accent/30" aria-hidden="true" />
            <span className="text-text-muted/70 text-xs tracking-wider line-clamp-1">
              {collection.description}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

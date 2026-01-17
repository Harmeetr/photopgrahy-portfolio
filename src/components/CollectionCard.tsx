'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { CollectionMeta } from '@/lib/collections'

interface Props {
  collection: CollectionMeta
  index: number
  variant?: 'featured' | 'standard'
}

export default function CollectionCard({ collection, index, variant = 'standard' }: Props) {
  const isFeatured = variant === 'featured'
  
  return (
    <motion.div
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
            alt={collection.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes={isFeatured 
              ? "(max-width: 768px) 100vw, 58vw" 
              : "(max-width: 768px) 100vw, 40vw"
            }
          />
          <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500" />
          
          <div className="absolute inset-0 rounded-sm ring-1 ring-white/0 group-hover:ring-accent/20 transition-all duration-500" />
        </div>

        <div className="mt-5">
          <h2 className="font-handwritten text-accent text-2xl tracking-wide group-hover:text-text-primary transition-colors duration-500">
            {collection.title}
          </h2>
          
          <div className="flex items-center gap-3 mt-2">
            {collection.date && (
              <span className="text-text-muted/70 text-xs tracking-wider">
                {new Date(collection.date).getFullYear()}
              </span>
            )}
            <span className="w-1 h-1 rounded-full bg-accent/30" />
            <span className="text-text-muted/70 text-xs tracking-wider">
              {collection.description}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

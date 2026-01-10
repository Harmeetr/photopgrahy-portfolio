'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { CollectionMeta } from '@/lib/collections'

interface Props {
  collection: CollectionMeta
  index: number
}

export default function CollectionCard({ collection, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
    >
      <Link href={`/collections/${collection.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <Image
            src={`/collections/${collection.slug}/${collection.cover}`}
            alt={collection.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>
        <div className="mt-4">
          <h2 className="text-text-primary text-sm tracking-wide">
            {collection.title}
          </h2>
          <p className="text-text-muted text-xs mt-1">
            {collection.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

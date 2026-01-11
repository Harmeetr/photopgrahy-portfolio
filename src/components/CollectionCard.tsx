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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
    >
      <Link href={`/collections/${collection.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] shadow-xl shadow-black/30">
          <Image
            src={`/collections/${collection.slug}/${collection.cover}`}
            alt={collection.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
        </div>
        <div className="mt-6">
          <h2 className="font-serif text-text-primary text-xl tracking-wide group-hover:text-white transition-colors duration-500">
            {collection.title}
          </h2>
          <p className="text-text-muted text-sm mt-2 leading-relaxed">
            {collection.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

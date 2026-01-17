'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TimelineView, ConstellationView } from '@/components/journey'
import { BotanicalAccent } from '@/components/decorative'

interface ImageData {
  src: string
  alt: string
  collection: string
  collectionSlug: string
  date: string
  index: number
}

interface JourneyClientProps {
  images: ImageData[]
}

export default function JourneyClient({ images }: JourneyClientProps) {
  const [view, setView] = useState<'timeline' | 'constellation'>('timeline')

  return (
    <main className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 pt-24 pb-6 px-6 bg-gradient-to-b from-background via-background to-transparent pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          <h1 className="font-handwritten text-accent text-3xl md:text-4xl">
            journey
          </h1>
          
          <div className="flex items-center gap-1 bg-surface/50 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => setView('timeline')}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                view === 'timeline'
                  ? 'bg-accent/20 text-accent'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              timeline
            </button>
            <button
              onClick={() => setView('constellation')}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                view === 'constellation'
                  ? 'bg-accent/20 text-accent'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              constellation
            </button>
          </div>
        </div>
      </div>

      {/* Decorative accents */}
      <BotanicalAccent 
        variant="branch" 
        className="fixed top-28 left-8 w-24 h-12 hidden lg:block" 
      />
      <BotanicalAccent 
        variant="flower" 
        className="fixed bottom-8 right-8 w-10 h-10 hidden lg:block" 
      />

      <AnimatePresence mode="wait">
        {view === 'timeline' ? (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TimelineView images={images} />
          </motion.div>
        ) : (
          <motion.div
            key="constellation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ConstellationView images={images} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  images: { src: string; alt: string; reflection?: string }[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export default function Lightbox({ isOpen, onClose, images, currentIndex, onNavigate }: LightboxProps) {
  const current = images[currentIndex]
  const hasReflection = !!current?.reflection

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1)
    if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1)
  }, [onClose, onNavigate, currentIndex, images.length])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Warm dark backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/98"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <div className={`relative z-10 flex items-center justify-center gap-8 w-full h-full px-16 ${hasReflection ? 'max-w-[90vw]' : ''}`}>
            {/* Left arrow */}
            {currentIndex > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => onNavigate(currentIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-accent transition-colors duration-300 p-4 z-20"
                aria-label="Previous image"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}

            {/* Image */}
            <motion.div
              className={`relative ${hasReflection ? 'flex-[0.65] h-[85vh]' : 'flex items-center justify-center'}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              key={current.src}
            >
              <div className={`relative ${hasReflection ? 'w-full h-full' : 'w-[90vw] h-[90vh]'} rounded-sm overflow-hidden`}>
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Reflection panel - now dark themed */}
            {hasReflection && (
              <motion.div
                className="flex-[0.3] bg-surface/80 backdrop-blur-sm rounded-sm p-8 max-h-[85vh] overflow-y-auto border border-accent/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-text-primary/90 font-serif text-lg leading-relaxed italic">
                  {current.reflection}
                </p>
              </motion.div>
            )}

            {/* Right arrow */}
            {currentIndex < images.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => onNavigate(currentIndex + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-accent transition-colors duration-300 p-4 z-20"
                aria-label="Next image"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}
          </div>

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
            className="absolute top-6 right-6 text-text-muted/40 hover:text-accent transition-colors duration-300 p-2"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          {/* Image counter - handwritten style */}
          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-handwritten text-accent/60 text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {currentIndex + 1} <span className="text-accent/30">of</span> {images.length}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

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
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95"
            onClick={onClose}
          />

          {/* Content */}
          <div className={`relative z-10 flex items-center gap-8 max-w-7xl mx-auto px-8 ${hasReflection ? 'w-full' : ''}`}>
            {/* Left arrow */}
            {currentIndex > 0 && (
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Image */}
            <motion.div
              className={`relative ${hasReflection ? 'flex-[0.6]' : ''}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className={`relative ${hasReflection ? 'aspect-[4/3]' : 'max-h-[85vh]'} rounded-[4px] overflow-hidden shadow-2xl`}>
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill={hasReflection}
                  width={hasReflection ? undefined : 1200}
                  height={hasReflection ? undefined : 800}
                  className={hasReflection ? 'object-cover' : 'object-contain max-h-[85vh] w-auto'}
                  style={{ filter: 'sepia(0.08) saturate(1.05) brightness(0.98)' }}
                  sizes="60vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Reflection panel */}
            {hasReflection && (
              <motion.div
                className="flex-[0.35] bg-[#FAF8F5] rounded-[4px] p-8 max-h-[70vh] overflow-y-auto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <p className="text-[#3D3833] font-serif text-lg leading-relaxed">
                  {current.reflection}
                </p>
              </motion.div>
            )}

            {/* Right arrow */}
            {currentIndex < images.length - 1 && (
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-wider">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

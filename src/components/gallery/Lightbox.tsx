'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
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
  
  // Zoom and pan state
  const [isZoomed, setIsZoomed] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const positionRef = useRef({ x: 0, y: 0 })
  
  // Spring-based pan position for smooth movement
  const panX = useSpring(0, { stiffness: 300, damping: 30 })
  const panY = useSpring(0, { stiffness: 300, damping: 30 })
  
  // Zoom scale
  const scale = useSpring(1, { stiffness: 300, damping: 30 })
  
  // Transform for the image
  const transform = useTransform(
    [panX, panY, scale],
    ([x, y, s]) => `translate(${x}px, ${y}px) scale(${s})`
  )

  // Reset zoom when changing images or closing
  const resetZoom = useCallback(() => {
    setIsZoomed(false)
    scale.set(1)
    panX.set(0)
    panY.set(0)
    positionRef.current = { x: 0, y: 0 }
  }, [scale, panX, panY])

  // Toggle zoom on double-click or single click
  const toggleZoom = useCallback((e: React.MouseEvent) => {
    if (isDragging) return
    
    if (isZoomed) {
      resetZoom()
    } else {
      // Zoom to 2x, centered on click position
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const clickX = e.clientX - rect.left - rect.width / 2
        const clickY = e.clientY - rect.top - rect.height / 2
        panX.set(-clickX * 0.5)
        panY.set(-clickY * 0.5)
        positionRef.current = { x: -clickX * 0.5, y: -clickY * 0.5 }
      }
      scale.set(2.5)
      setIsZoomed(true)
    }
  }, [isZoomed, isDragging, resetZoom, scale, panX, panY])

  // Handle wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isZoomed) return
    e.preventDefault()
    
    const currentScale = scale.get()
    const delta = e.deltaY > 0 ? -0.2 : 0.2
    const newScale = Math.max(1, Math.min(4, currentScale + delta))
    
    if (newScale === 1) {
      resetZoom()
    } else {
      scale.set(newScale)
      setIsZoomed(true)
    }
  }, [isZoomed, scale, resetZoom])

  // Handle pan with mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isZoomed) return
    setIsDragging(true)
    dragStartRef.current = { x: e.clientX - positionRef.current.x, y: e.clientY - positionRef.current.y }
  }, [isZoomed])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return
    
    const newX = e.clientX - dragStartRef.current.x
    const newY = e.clientY - dragStartRef.current.y
    
    // Constrain pan based on zoom level
    const maxPan = 200 * (scale.get() - 1)
    const clampedX = Math.max(-maxPan, Math.min(maxPan, newX))
    const clampedY = Math.max(-maxPan, Math.min(maxPan, newY))
    
    panX.set(clampedX)
    panY.set(clampedY)
    positionRef.current = { x: clampedX, y: clampedY }
  }, [isDragging, isZoomed, panX, panY, scale])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Touch support for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isZoomed || e.touches.length !== 1) return
    setIsDragging(true)
    const touch = e.touches[0]
    dragStartRef.current = { x: touch.clientX - positionRef.current.x, y: touch.clientY - positionRef.current.y }
  }, [isZoomed])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !isZoomed || e.touches.length !== 1) return
    
    const touch = e.touches[0]
    const newX = touch.clientX - dragStartRef.current.x
    const newY = touch.clientY - dragStartRef.current.y
    
    const maxPan = 200 * (scale.get() - 1)
    const clampedX = Math.max(-maxPan, Math.min(maxPan, newX))
    const clampedY = Math.max(-maxPan, Math.min(maxPan, newY))
    
    panX.set(clampedX)
    panY.set(clampedY)
    positionRef.current = { x: clampedX, y: clampedY }
  }, [isDragging, isZoomed, panX, panY, scale])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (isZoomed) {
        resetZoom()
      } else {
        onClose()
      }
    }
    if (e.key === 'ArrowLeft' && currentIndex > 0 && !isZoomed) {
      resetZoom()
      onNavigate(currentIndex - 1)
    }
    if (e.key === 'ArrowRight' && currentIndex < images.length - 1 && !isZoomed) {
      resetZoom()
      onNavigate(currentIndex + 1)
    }
    // Zoom with + and -
    if (e.key === '+' || e.key === '=') {
      const currentScale = scale.get()
      const newScale = Math.min(4, currentScale + 0.5)
      scale.set(newScale)
      setIsZoomed(newScale > 1)
    }
    if (e.key === '-') {
      const currentScale = scale.get()
      const newScale = Math.max(1, currentScale - 0.5)
      scale.set(newScale)
      if (newScale === 1) resetZoom()
    }
  }, [onClose, onNavigate, currentIndex, images.length, isZoomed, resetZoom, scale])

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

  // Add wheel listener
  useEffect(() => {
    const container = containerRef.current
    if (isOpen && container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [isOpen, handleWheel])

  // Reset zoom on image change
  useEffect(() => {
    resetZoom()
  }, [currentIndex, resetZoom])

  const handleNavigate = useCallback((index: number) => {
    resetZoom()
    onNavigate(index)
  }, [resetZoom, onNavigate])

  const handleClose = useCallback(() => {
    resetZoom()
    onClose()
  }, [resetZoom, onClose])

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
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <div className={`relative z-10 flex items-center justify-center gap-8 w-full h-full px-16 ${hasReflection ? 'max-w-[90vw]' : ''}`}>
            {/* Left arrow */}
            {currentIndex > 0 && !isZoomed && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => handleNavigate(currentIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-accent transition-colors duration-300 p-4 z-20"
                aria-label="Previous image"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}

            {/* Image with zoom/pan */}
            <motion.div
              ref={containerRef}
              className={`relative ${hasReflection ? 'flex-[0.65] h-[85vh]' : 'flex items-center justify-center'} overflow-hidden`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              key={current.src}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
            >
              <motion.div 
                className={`relative ${hasReflection ? 'w-full h-full' : 'w-[90vw] h-[90vh]'} rounded-sm overflow-hidden`}
                style={{ transform }}
                onClick={toggleZoom}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  className="object-contain select-none"
                  sizes="90vw"
                  priority
                  draggable={false}
                />
              </motion.div>
              
              {/* Zoom indicator */}
              {isZoomed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-sm px-3 py-1.5 rounded text-text-muted text-xs"
                >
                  Click to reset • Drag to pan • Scroll to zoom
                </motion.div>
              )}
            </motion.div>

            {/* Reflection panel - now dark themed */}
            {hasReflection && !isZoomed && (
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
            {currentIndex < images.length - 1 && !isZoomed && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => handleNavigate(currentIndex + 1)}
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
            onClick={handleClose}
            className="absolute top-6 right-6 text-text-muted/40 hover:text-accent transition-colors duration-300 p-2 z-20"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          {/* Image counter - handwritten style */}
          {!isZoomed && (
            <motion.div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 font-handwritten text-accent/60 text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentIndex + 1} <span className="text-accent/30">of</span> {images.length}
            </motion.div>
          )}

          {/* Zoom controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 right-6 flex gap-2"
          >
            <button
              onClick={() => {
                const newScale = Math.min(4, scale.get() + 0.5)
                scale.set(newScale)
                setIsZoomed(newScale > 1)
              }}
              className="w-8 h-8 flex items-center justify-center bg-surface/60 backdrop-blur-sm rounded text-text-muted/60 hover:text-accent hover:bg-surface/80 transition-all duration-200"
              aria-label="Zoom in"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={() => {
                const newScale = Math.max(1, scale.get() - 0.5)
                scale.set(newScale)
                if (newScale === 1) resetZoom()
              }}
              className="w-8 h-8 flex items-center justify-center bg-surface/60 backdrop-blur-sm rounded text-text-muted/60 hover:text-accent hover:bg-surface/80 transition-all duration-200"
              aria-label="Zoom out"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M8 11h6" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

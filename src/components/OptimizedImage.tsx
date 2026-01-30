'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion } from 'framer-motion'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  lowQualityPlaceholder?: boolean
}

// Base64 blur placeholder - a warm dark gradient
const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBQAEBhEHEiExE0FR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADBBEh/9oADAMBAAIRAxEAPwC5j2U3mP4/a2d1aW0l5aB5pIKnEoUSEhRBJJJJJPZrWaUqFmJYljwMBF//2Q=='

export default function OptimizedImage({ 
  lowQualityPlaceholder = true,
  className = '',
  alt,
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      className="relative w-full h-full"
      initial={false}
      animate={{ opacity: isLoaded ? 1 : 0.7 }}
      transition={{ duration: 0.4 }}
    >
      <Image
        {...props}
        alt={alt}
        className={`${className} transition-opacity duration-500`}
        placeholder={lowQualityPlaceholder ? 'blur' : 'empty'}
        blurDataURL={lowQualityPlaceholder ? blurDataURL : undefined}
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  )
}

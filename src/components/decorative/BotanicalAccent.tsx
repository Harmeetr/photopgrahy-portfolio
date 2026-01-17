'use client'

import { motion } from 'framer-motion'

interface BotanicalAccentProps {
  variant?: 'leaf' | 'branch' | 'flower'
  className?: string
}

export default function BotanicalAccent({ variant = 'leaf', className = '' }: BotanicalAccentProps) {
  const variants = {
    leaf: (
      <svg viewBox="0 0 40 60" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
        <path d="M20 5 C20 5, 8 25, 12 40 C14 48, 20 55, 20 55 C20 55, 26 48, 28 40 C32 25, 20 5, 20 5" strokeLinecap="round" />
        <path d="M20 15 L20 50" strokeLinecap="round" opacity="0.5" />
        <path d="M15 25 L20 30 L25 25" strokeLinecap="round" opacity="0.3" />
        <path d="M14 35 L20 40 L26 35" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
    branch: (
      <svg viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
        <path d="M5 35 C20 30, 40 25, 75 20" strokeLinecap="round" />
        <path d="M25 28 C25 28, 20 18, 22 12" strokeLinecap="round" opacity="0.6" />
        <path d="M45 24 C45 24, 42 14, 48 8" strokeLinecap="round" opacity="0.6" />
        <path d="M60 21 C60 21, 58 12, 65 6" strokeLinecap="round" opacity="0.6" />
        {/* Small circles for buds */}
        <circle cx="22" cy="10" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="48" cy="6" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="66" cy="4" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    flower: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
        <circle cx="20" cy="20" r="4" opacity="0.5" />
        <ellipse cx="20" cy="10" rx="4" ry="8" strokeLinecap="round" opacity="0.6" />
        <ellipse cx="20" cy="30" rx="4" ry="8" strokeLinecap="round" opacity="0.6" />
        <ellipse cx="10" cy="20" rx="8" ry="4" strokeLinecap="round" opacity="0.6" />
        <ellipse cx="30" cy="20" rx="8" ry="4" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.15, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className={`text-accent pointer-events-none ${className}`}
    >
      {variants[variant]}
    </motion.div>
  )
}

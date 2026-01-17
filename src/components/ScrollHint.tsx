'use client'

import { motion } from 'framer-motion'

export default function ScrollHint() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <span className="font-handwritten text-accent text-lg tracking-wide">
        scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg 
          width="20" 
          height="24" 
          viewBox="0 0 20 24" 
          fill="none" 
          className="text-accent/60"
        >
          <path 
            d="M10 2 C10 2, 10 18, 10 18 M3 12 C3 12, 10 20, 10 20 C10 20, 17 12, 17 12" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: "none" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

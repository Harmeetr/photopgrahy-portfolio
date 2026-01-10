'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  text: string
  isOpen: boolean
  onClose: () => void
}

export default function Reflection({ text, isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-text-primary text-lg leading-relaxed font-light">
              {text}
            </p>
            <button
              onClick={onClose}
              className="mt-8 text-text-muted text-sm hover:text-text-primary transition-colors duration-300"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

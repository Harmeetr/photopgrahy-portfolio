'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-16">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="font-serif text-text-primary text-3xl tracking-wide mb-16">
            About
          </h1>

          <div className="space-y-8 font-serif text-text-muted text-lg leading-relaxed">
            <p>
              I capture moments of human connection and the quiet beauty that
              exists in the spaces between.
            </p>

            <p>
              Photography, for me, is a practice of presence—seeing what is
              already there, waiting to be noticed. Each image is an invitation
              to pause, to feel the oneness that connects us all.
            </p>

            <p>
              These photographs come from solo travels, early mornings, and the
              edges of ordinary days. They are my attempt to share how I see
              this world—with wonder, with calm, with gratitude.
            </p>
          </div>

          <motion.div
            className="mt-20 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a
              href="mailto:hello@harmeetrai.com"
              className="text-text-muted text-sm tracking-wide hover:text-text-primary transition-colors duration-500"
            >
              hello@harmeetrai.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

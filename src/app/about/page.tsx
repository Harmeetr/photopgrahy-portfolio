'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-16">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-text-primary text-2xl tracking-wide mb-12">
            About
          </h1>

          <div className="space-y-6 text-text-muted leading-relaxed">
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

          <div className="mt-16 pt-8 border-t border-surface">
            <a
              href="mailto:hello@harmeetrai.com"
              className="text-text-muted text-sm hover:text-text-primary transition-colors duration-300"
            >
              hello@harmeetrai.com
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

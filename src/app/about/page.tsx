'use client'

import { motion } from 'framer-motion'
import { BotanicalAccent, Divider } from '@/components/decorative'

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-16 relative overflow-hidden">
      {/* Decorative botanical accents */}
      <BotanicalAccent 
        variant="branch" 
        className="absolute top-24 right-8 w-32 h-16 opacity-10 hidden md:block" 
      />
      <BotanicalAccent 
        variant="leaf" 
        className="absolute bottom-32 left-8 w-12 h-20 opacity-10 hidden md:block" 
      />

      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Handwritten header */}
          <h1 className="font-handwritten text-accent text-4xl md:text-5xl tracking-wide mb-4">
            hello
          </h1>
          <p className="text-text-muted text-sm tracking-wider mb-12">
            a note from harmeet
          </p>

          <Divider className="mb-12" />

          {/* Letter-style content */}
          <div className="space-y-6 font-serif text-text-primary/90 text-lg leading-relaxed">
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

          <Divider className="my-12" />

          {/* Closing and signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-text-muted/80 text-base mb-6 font-serif italic">
              Thank you for being here.
            </p>
            
            <p className="font-handwritten text-accent text-2xl">
              — Harmeet
            </p>
          </motion.div>

          {/* Contact section */}
          <motion.div
            className="mt-16 pt-8 border-t border-accent/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-text-muted/60 text-sm mb-4">say hello</p>
            <a
              href="mailto:hello@harmeetrai.com"
              className="font-handwritten text-accent text-xl hover:text-text-primary transition-colors duration-500"
            >
              hello@harmeetrai.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

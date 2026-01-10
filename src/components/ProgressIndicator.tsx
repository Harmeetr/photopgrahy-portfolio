'use client'

import { motion, useScroll } from 'framer-motion'

export default function ProgressIndicator() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 w-[2px] h-24 bg-surface z-40"
    >
      <motion.div
        className="w-full bg-text-muted origin-top"
        style={{ scaleY: scrollYProgress }}
      />
    </motion.div>
  )
}

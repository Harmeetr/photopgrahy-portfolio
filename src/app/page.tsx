"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="font-serif text-text-primary text-3xl md:text-4xl tracking-wide mb-3">
          Harmeet Rai
        </h1>
        <p className="text-text-muted text-xs tracking-[0.3em] uppercase">
          Photography
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
        className="mt-16"
      >
        <Link
          href="/collections"
          className="group relative font-serif text-text-muted text-lg tracking-wide hover:text-text-primary transition-colors duration-700"
        >
          <span className="relative">
            Enter
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-px bg-text-muted/30 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
            />
          </span>
        </Link>
      </motion.div>
    </main>
  );
}

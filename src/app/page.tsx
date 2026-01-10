"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-text-muted text-sm tracking-[0.3em] uppercase mb-12">
          Harmeet Rai
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
      >
        <Link
          href="/collections"
          className="text-text-primary text-lg tracking-wide hover:text-accent transition-colors duration-500"
        >
          Enter
        </Link>
      </motion.div>
    </main>
  );
}

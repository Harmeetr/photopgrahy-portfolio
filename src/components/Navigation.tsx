"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setVisible(true);
      } else if (currentScrollY > lastScrollYRef.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Hide nav on landing page - AFTER all hooks
  if (pathname === "/") return null;

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-text-muted text-xs tracking-[0.2em] uppercase hover:text-text-primary transition-colors duration-300 pointer-events-auto"
        >
          Harmeet Rai
        </Link>

        <div className="flex gap-8 pointer-events-auto">
          <Link
            href="/collections"
            className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
              pathname.startsWith("/collections")
                ? "text-text-primary"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Collections
          </Link>
          <Link
            href="/about"
            className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
              pathname === "/about"
                ? "text-text-primary"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

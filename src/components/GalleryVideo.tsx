"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  src: string;
}

export default function GalleryVideo({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-100px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {
          // Autoplay may be blocked by browser policy - this is expected
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-full"
    >
      <div className="relative aspect-[3/2] md:aspect-[16/10] overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "@/components/HeroImage";
import ScrollHint from "@/components/ScrollHint";
import { BotanicalAccent } from '@/components/decorative'

export default function Home() {
  const heroImage = "/collections/landscapes/media/01.jpg";

  return (
    <main className="relative">
      <section className="relative h-screen flex flex-col items-center justify-center">
        <HeroImage src={heroImage} alt="A moment of quiet light" />
        
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            <h1 className="font-serif text-text-primary text-4xl md:text-5xl lg:text-6xl tracking-wide mb-6">
              Harmeet Rai
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
            className="font-handwritten text-accent text-2xl md:text-3xl mb-4"
          >
            a practice of presence
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
            className="text-text-muted text-sm tracking-[0.2em] uppercase"
          >
            photography
          </motion.p>
        </div>

        <ScrollHint />

        {/* Decorative accent */}
        <BotanicalAccent 
          variant="leaf" 
          className="absolute bottom-24 right-8 w-10 h-16 hidden md:block" 
        />
      </section>

      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="font-handwritten text-accent text-3xl mb-4">
              collections
            </h2>
            <div className="w-16 h-px bg-accent/30 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CollectionPreview
              slug="landscapes"
              title="Landscapes"
              image="/collections/landscapes/media/01.jpg"
              index={0}
            />
            <CollectionPreview
              slug="portraits"
              title="Portraits"
              image="/collections/portraits/media/01.jpg"
              index={1}
            />
            <CollectionPreview
              slug="sample"
              title="Moments"
              image="/collections/sample/media/01.jpg"
              index={2}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mt-16"
          >
            <Link
              href="/collections"
              className="inline-block font-handwritten text-accent text-xl hover:text-text-primary transition-colors duration-500"
            >
              view all collections →
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function CollectionPreview({ 
  slug, 
  title, 
  image, 
  index 
}: { 
  slug: string
  title: string
  image: string
  index: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <Link href={`/collections/${slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>
        <h3 className="font-handwritten text-accent text-xl mt-4 group-hover:text-text-primary transition-colors duration-500">
          {title}
        </h3>
      </Link>
    </motion.div>
  );
}

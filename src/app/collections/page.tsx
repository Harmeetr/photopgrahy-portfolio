import { Metadata } from 'next'
import { getAllCollections } from '@/lib/collections'
import CollectionCard from '@/components/CollectionCard'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore curated photography collections by Harmeet Rai featuring landscapes, portraits, and contemplative moments.',
  openGraph: {
    title: 'Collections | Harmeet Rai Photography',
    description: 'Explore curated photography collections featuring landscapes, portraits, and contemplative moments.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Harmeet Rai Photography Collections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collections | Harmeet Rai Photography',
    description: 'Explore curated photography collections featuring landscapes, portraits, and contemplative moments.',
  },
}

export default function CollectionsPage() {
  const collections = getAllCollections()

  return (
    <main className="min-h-screen px-6 pt-28 pb-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <h1 className="font-handwritten text-accent text-4xl md:text-5xl tracking-wide mb-3">
            collections
          </h1>
          <div className="w-20 h-px bg-accent/30" aria-hidden="true" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {collections[0] && (
            <div className="md:col-span-7">
              <CollectionCard
                collection={collections[0]}
                index={0}
                variant="featured"
              />
            </div>
          )}

          {collections[1] && (
            <div className="md:col-span-5 md:mt-16">
              <CollectionCard
                collection={collections[1]}
                index={1}
                variant="standard"
              />
            </div>
          )}

          {collections[2] && (
            <div className="md:col-span-6 md:col-start-4 md:-mt-8">
              <CollectionCard
                collection={collections[2]}
                index={2}
                variant="standard"
              />
            </div>
          )}
          
          {collections.slice(3).map((collection, i) => (
             <div 
               key={collection.slug}
               className={`md:col-span-5 md:mt-12 ${i % 2 === 0 ? 'md:col-start-2' : 'md:col-start-7'}`}
             >
              <CollectionCard
                collection={collection}
                index={i + 3}
                variant="standard"
              />
             </div>
          ))}
        </div>
      </div>
    </main>
  )
}

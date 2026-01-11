import { getAllCollections } from '@/lib/collections'
import CollectionCard from '@/components/CollectionCard'

export default function CollectionsPage() {
  const collections = getAllCollections()

  return (
    <main className="min-h-screen px-6 pt-28 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-text-primary text-3xl tracking-wide mb-16">
          Collections
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.slug}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

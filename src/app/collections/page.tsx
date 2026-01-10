import { getAllCollections } from '@/lib/collections'
import CollectionCard from '@/components/CollectionCard'

export default function CollectionsPage() {
  const collections = getAllCollections()

  return (
    <main className="min-h-screen px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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

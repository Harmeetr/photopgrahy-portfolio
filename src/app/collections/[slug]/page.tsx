import { notFound } from 'next/navigation'
import { getCollection, getCollectionSlugs } from '@/lib/collections'
import { HorizontalGallery } from '@/components/gallery'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getCollectionSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params

  try {
    const collection = getCollection(slug)

    return (
      <main className="min-h-screen pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-text-primary text-2xl tracking-wide">
            {collection.title}
          </h1>
          <p className="text-text-muted text-sm mt-2">
            {collection.description}
          </p>
        </div>

        {/* Horizontal Gallery */}
        <HorizontalGallery
          collectionSlug={slug}
          collectionTitle={collection.title}
          media={collection.media}
        />
      </main>
    )
  } catch {
    notFound()
  }
}

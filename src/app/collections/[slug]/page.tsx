import { notFound } from 'next/navigation'
import { getCollection, getCollectionSlugs } from '@/lib/collections'
import GalleryImage from '@/components/GalleryImage'
import GalleryVideo from '@/components/GalleryVideo'
import ProgressIndicator from '@/components/ProgressIndicator'

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
      <main className="min-h-screen">
        <ProgressIndicator />

        {/* Header */}
        <div className="pt-32 pb-16 px-6 text-center">
          <h1 className="text-text-primary text-2xl tracking-wide">
            {collection.title}
          </h1>
          <p className="text-text-muted text-sm mt-2">
            {collection.description}
          </p>
        </div>

        {/* Gallery */}
        <div className="px-6 md:px-12 lg:px-24 space-y-[30vh]">
          {collection.media.map((item, index) => (
            <div key={item.filename} className="max-w-5xl mx-auto">
              {item.type === 'video' ? (
                <GalleryVideo
                  src={`/collections/${slug}/media/${item.filename}`}
                />
              ) : (
                <GalleryImage
                  src={`/collections/${slug}/media/${item.filename}`}
                  alt={`${collection.title} - ${index + 1}`}
                  reflection={item.reflection}
                />
              )}
            </div>
          ))}
        </div>

        {/* End spacer */}
        <div className="h-[50vh]" />
      </main>
    )
  } catch {
    notFound()
  }
}

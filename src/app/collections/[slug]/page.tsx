import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getCollection, getCollectionSlugs } from '@/lib/collections'
import { HorizontalGallery } from '@/components/gallery'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getCollectionSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const collection = getCollection(slug)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://harmeetrai.com'
    
    // Get the cover image for OG
    const coverImage = collection.cover.startsWith('/')
      ? collection.cover
      : `/collections/${slug}/${collection.cover}`

    return {
      title: collection.title,
      description: collection.description,
      openGraph: {
        title: `${collection.title} | Harmeet Rai Photography`,
        description: collection.description,
        type: 'article',
        url: `${siteUrl}/collections/${slug}`,
        images: [
          {
            url: coverImage,
            width: 1200,
            height: 800,
            alt: collection.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: collection.title,
        description: collection.description,
        images: [coverImage],
      },
      alternates: {
        canonical: `${siteUrl}/collections/${slug}`,
      },
    }
  } catch {
    return {
      title: 'Collection Not Found',
    }
  }
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params

  try {
    const collection = getCollection(slug)

    return (
      <main className="min-h-screen pt-20">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-text-primary text-2xl tracking-wide">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-text-muted text-sm mt-2 max-w-md mx-auto">
              {collection.description}
            </p>
          )}
        </header>

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

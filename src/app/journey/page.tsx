import { Metadata } from 'next'
import { getAllCollections, getCollection } from '@/lib/collections'
import JourneyClient from './JourneyClient'

export const metadata: Metadata = {
  title: 'Journey',
  description: 'A visual timeline of photography by Harmeet Rai, exploring the evolution of perspective and the threads that connect different moments.',
  openGraph: {
    title: 'Journey | Harmeet Rai Photography',
    description: 'A visual timeline exploring the evolution of perspective and the threads that connect different moments.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Harmeet Rai Photography Journey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journey | Harmeet Rai Photography',
    description: 'A visual timeline exploring the evolution of perspective and the threads that connect different moments.',
  },
}

// Gather all images from all collections with metadata
function getAllImages() {
  const collections = getAllCollections()
  const allImages: Array<{
    src: string
    alt: string
    collection: string
    collectionSlug: string
    date: string
    index: number
  }> = []

  collections.forEach(collectionMeta => {
    const collection = getCollection(collectionMeta.slug)
    collection.media
      .filter(m => m.type === 'image')
      .forEach((media, i) => {
        allImages.push({
          src: `/collections/${collectionMeta.slug}/media/${media.filename}`,
          alt: `${collectionMeta.title} - ${i + 1}`,
          collection: collectionMeta.title,
          collectionSlug: collectionMeta.slug,
          date: collectionMeta.date,
          index: i,
        })
      })
  })

  // Sort by date
  return allImages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export default function JourneyPage() {
  const images = getAllImages()
  
  return <JourneyClient images={images} />
}

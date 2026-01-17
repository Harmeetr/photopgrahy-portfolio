import { getAllCollections, getCollection } from '@/lib/collections'
import JourneyClient from './JourneyClient'

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

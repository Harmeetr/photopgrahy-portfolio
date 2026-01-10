import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const collectionsDirectory = path.join(process.cwd(), 'content/collections')

export interface CollectionMeta {
  slug: string
  title: string
  date: string
  cover: string
  description: string
  order: number
}

export interface MediaItem {
  filename: string
  type: 'image' | 'video'
  reflection?: string
}

export interface Collection extends CollectionMeta {
  media: MediaItem[]
}

export function getCollectionSlugs(): string[] {
  return fs.readdirSync(collectionsDirectory).filter((file) => {
    const fullPath = path.join(collectionsDirectory, file)
    return fs.statSync(fullPath).isDirectory()
  })
}

export function getCollectionMeta(slug: string): CollectionMeta {
  const metaPath = path.join(collectionsDirectory, slug, 'meta.md')
  const fileContents = fs.readFileSync(metaPath, 'utf8')
  const { data } = matter(fileContents)

  return {
    slug,
    title: data.title,
    date: data.date,
    cover: data.cover,
    description: data.description,
    order: data.order ?? 0,
  }
}

export function getAllCollections(): CollectionMeta[] {
  const slugs = getCollectionSlugs()
  const collections = slugs.map((slug) => getCollectionMeta(slug))
  return collections.sort((a, b) => a.order - b.order)
}

export function getCollection(slug: string): Collection {
  const meta = getCollectionMeta(slug)
  const mediaDir = path.join(collectionsDirectory, slug, 'media')

  let mediaFiles: string[] = []
  if (fs.existsSync(mediaDir)) {
    mediaFiles = fs.readdirSync(mediaDir).filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.webm'].includes(ext)
    })
  }

  const media: MediaItem[] = mediaFiles
    .sort()
    .map((filename) => {
      const ext = path.extname(filename).toLowerCase()
      const isVideo = ['.mp4', '.webm'].includes(ext)
      const baseName = path.basename(filename, ext)

      // Check for reflection markdown
      const reflectionPath = path.join(mediaDir, `${baseName}.md`)
      let reflection: string | undefined
      if (fs.existsSync(reflectionPath)) {
        const reflectionContent = fs.readFileSync(reflectionPath, 'utf8')
        const { content } = matter(reflectionContent)
        reflection = content.trim()
      }

      return {
        filename,
        type: isVideo ? 'video' : 'image',
        reflection,
      }
    })

  return { ...meta, media }
}

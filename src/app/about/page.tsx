import { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Harmeet Rai, a photographer exploring human connection and the quiet beauty of the world through contemplative photography.',
  openGraph: {
    title: 'About | Harmeet Rai Photography',
    description: 'Learn about Harmeet Rai, a photographer exploring human connection and the quiet beauty of the world.',
    type: 'profile',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Harmeet Rai Photography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Harmeet Rai Photography',
    description: 'Learn about Harmeet Rai, a photographer exploring human connection and the quiet beauty of the world.',
  },
}

export default function AboutPage() {
  return <AboutClient />
}

import type { Metadata, Viewport } from "next";
import { Spectral, EB_Garamond, Sacramento } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import FilmGrain from "@/components/FilmGrain";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://harmeetrai.com";

export const viewport: Viewport = {
  themeColor: "#0f0d0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Harmeet Rai — Photography",
    template: "%s | Harmeet Rai Photography",
  },
  description:
    "A contemplative photography portfolio exploring human connection and the quiet beauty of the world. Fine art landscapes, portraits, and moments of presence.",
  keywords: [
    "photography",
    "fine art photography",
    "landscape photography",
    "portrait photography",
    "Harmeet Rai",
    "contemplative photography",
    "nature photography",
    "art photography",
  ],
  authors: [{ name: "Harmeet Rai", url: siteUrl }],
  creator: "Harmeet Rai",
  publisher: "Harmeet Rai",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Harmeet Rai Photography",
    title: "Harmeet Rai — Photography",
    description:
      "A contemplative photography portfolio exploring human connection and the quiet beauty of the world.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Harmeet Rai Photography — A practice of presence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmeet Rai — Photography",
    description:
      "A contemplative photography portfolio exploring human connection and the quiet beauty of the world.",
    images: ["/og-image.jpg"],
    creator: "@harmeetrai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${spectral.className} ${ebGaramond.variable} ${sacramento.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-surface focus:text-text-primary focus:rounded"
        >
          Skip to main content
        </a>
        <Navigation />
        <div id="main-content">{children}</div>
        <FilmGrain />
      </body>
    </html>
  );
}

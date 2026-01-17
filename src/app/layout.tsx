import type { Metadata } from "next";
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
});

const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwritten",
});

export const metadata: Metadata = {
  title: "Harmeet Rai - Photography",
  description: "A gallery of human connection and the beauty of this world.",
  openGraph: {
    title: "Harmeet Rai - Photography",
    description: "A gallery of human connection and the beauty of this world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spectral.className} ${ebGaramond.variable} ${sacramento.variable}`}>
        <Navigation />
        {children}
        <FilmGrain />
      </body>
    </html>
  );
}

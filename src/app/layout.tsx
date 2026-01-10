import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import FilmGrain from "@/components/FilmGrain";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
      <body className={inter.className}>
        <Navigation />
        {children}
        <FilmGrain />
      </body>
    </html>
  );
}

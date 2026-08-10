import type { Metadata } from 'next';
import { Playfair_Display, Outfit, Noto_Serif_Sinhala } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sinhala = Noto_Serif_Sinhala({
  subsets: ['sinhala'],
  variable: '--font-sinhala',
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kasun & Sanduni - Sri Lankan Digital Wedding Invitation',
  description: 'Cordially inviting family and friends to celebrate the sacred wedding ceremony of Kasun & Sanduni under auspicious Sri Lankan Poruwa rituals.',
  openGraph: {
    title: 'Kasun & Sanduni Digital Wedding Invitation',
    description: 'Auspicious times (Nakath), RSVP, Location, and Blessings Wall.',
    images: ['/images/hero.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} ${sinhala.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#180710] text-[#FFF5F7] font-sans antialiased selection:bg-pink-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

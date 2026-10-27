import type { Metadata, Viewport } from 'next';
import { Pinyon_Script, Cormorant_Garamond, Jost } from 'next/font/google';
import { wedding } from '@/data/wedding';
import './globals.css';

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pinyon',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

const names = `${wedding.bride.name} & ${wedding.groom.name}`;

export const metadata: Metadata = {
  title: `${names} — Wedding Invitation`,
  description: `You are invited to celebrate the wedding of ${names}.`,
  openGraph: {
    title: `${names} — Wedding Invitation`,
    description: `Join us on ${wedding.dateLabel} at ${wedding.venue.name}.`,
    images: [wedding.coverImage],
  },
};

export const viewport: Viewport = {
  themeColor: '#fdf2f4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pinyon.variable} ${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

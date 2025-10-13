import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FloatingContactWidget from '@/components/FloatingContactWidget'
import BookingSystem from '@/components/BookingSystem'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Autopesu Kiilto & Loisto - Ammattitaitoista autopesupalvelua Helsingissä',
  description: 'PERUS- & ERIKOISPESUT RENKAIDEN VAIHTO & SÄILYTYS. Laadukasta autopesupalvelua Helsingissä.',
  keywords: ['autopesu', 'käsinpesu', 'renkaiden vaihto', 'Helsinki', 'kiillotus'],
  authors: [{ name: 'Kiilto & Loisto' }],
  openGraph: {
    title: 'Autopesu Kiilto & Loisto',
    description: 'PERUS- & ERIKOISPESUT RENKAIDEN VAIHTO & SÄILYTYS',
    url: 'https://www.kiiltoloisto.fi',
    siteName: 'Kiilto & Loisto',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2000&auto=format&fit=crop',
        width: 2000,
        height: 1200,
        alt: 'Autopesu Kiilto & Loisto',
      },
    ],
    locale: 'fi_FI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autopesu Kiilto & Loisto',
    description: 'PERUS- & ERIKOISPESUT RENKAIDEN VAIHTO & SÄILYTYS',
    images: ['https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2000&auto=format&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fi">
      <body className={inter.className}>
        {children}
        <FloatingContactWidget />
        <BookingSystem />
      </body>
    </html>
  )
}
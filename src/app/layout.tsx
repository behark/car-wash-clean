import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ErrorBoundary from '../components/ErrorBoundary'
import MemoryMonitor from '../components/MemoryMonitor'
import { ToastProvider } from '../components/Toast'

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap', 
  preload: true,
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kiiltoloisto.fi'),
  title: {
    default: 'Autopesu Kiilto & Loisto - Ammattitaitoista autopesupalvelua Helsingissä',
    template: '%s | Kiilto & Loisto'
  },
  description: 'PERUS- & ERIKOISPESUT, RENKAIDEN VAIHTO & SÄILYTYS. Laadukasta autopesupalvelua Helsingissä. Varaa aika helposti verkossa!',
  keywords: [
    'autopesu Helsinki', 
    'käsinpesu', 
    'renkaiden vaihto', 
    'sisäpuhdistus',
    'kiillotus', 
    'vahaus',
    'Kiilto & Loisto'
  ],
  authors: [{ name: 'Kiilto & Loisto', url: 'https://www.kiiltoloisto.fi' }],
  creator: 'Kiilto & Loisto',
  publisher: 'Kiilto & Loisto',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Autopesu Kiilto & Loisto - Ammattitaitoista autopesupalvelua',
    description: 'PERUS- & ERIKOISPESUT, RENKAIDEN VAIHTO & SÄILYTYS. Laadukasta palvelua Helsingissä.',
    url: 'https://www.kiiltoloisto.fi',
    siteName: 'Kiilto & Loisto',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1200&h=630&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Autopesu Kiilto & Loisto - Ammattitasoinen autopesu',
      },
    ],
    locale: 'fi_FI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autopesu Kiilto & Loisto',
    description: 'PERUS- & ERIKOISPESUT, RENKAIDEN VAIHTO & SÄILYTYS',
    images: ['https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1200&h=630&auto=format&fit=crop'],
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
  alternates: {
    canonical: 'https://www.kiiltoloisto.fi',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <html lang="fi" className={inter.variable}>
      <body className={inter.className}>
        <ToastProvider>
          <ErrorBoundary level="page" showDetails={isDevelopment}>
            {/* Memory Monitor only in development */}
            {isDevelopment && <MemoryMonitor />}
            
            {/* Main content */}
            <ErrorBoundary level="section">
              {children}
            </ErrorBoundary>
          </ErrorBoundary>
        </ToastProvider>
      </body>
    </html>
  )
}

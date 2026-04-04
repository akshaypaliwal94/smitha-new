import type { Metadata } from 'next'
import { Bebas_Neue, Barlow } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const barlow = Barlow({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://smitha-new.vercel.app'),
  title: 'Master the Ward Round Method™ - Free Webinar with Smitha Chowdary Kankanala | April 12, 2026',
  description: 'Join 1000+ healthcare professionals in this exclusive free webinar. Discover the Ward Round Method™ - a unique mechanism that transforms healthcare practices. Reserve your seat for April 12, 2026.',
  keywords: 'healthcare webinar, Ward Round Method, medical professionals, Smitha Chowdary Kankanala, healthcare transformation, medical practice growth, healthcare success, free medical webinar, April 2026',
  authors: [{ name: 'Smitha Chowdary Kankanala' }],
  creator: 'Smitha Chowdary Kankanala',
  publisher: 'Healthcare Transformation Academy',
  openGraph: {
    title: 'Master the Ward Round Method™ - Free Healthcare Webinar | April 12, 2026',
    description: 'Join 1000+ healthcare professionals in this exclusive free webinar. Discover the Ward Round Method™ that transforms healthcare practices.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Ward Round Method Webinar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ward Round Method™ Free Webinar - April 12, 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master the Ward Round Method™ - Free Healthcare Webinar',
    description: 'Join 1000+ healthcare professionals. April 12, 2026. Reserve your free seat now!',
    creator: '@SmithaHealthcare',
    images: ['/twitter-image.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://smitha-new.vercel.app',
  },
  category: 'Healthcare Education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${barlow.variable} font-barlow bg-dark text-white min-h-screen overflow-x-hidden`}>
        <div className="glow-left"></div>
        <div className="glow-right"></div>
        {children}
      </body>
    </html>
  )
}
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
  title: 'Healthcare Communication Masterclass - Free Webinar with Smitha Kankanala | April 19, 2026',
  description: 'Join healthcare professionals in this exclusive free webinar. Master healthcare communication with the CHCP system. Reserve your seat for April 19, 2026.',
  keywords: 'healthcare webinar, Ward Round Method, medical professionals, Smitha Chowdary Kankanala, healthcare transformation, medical practice growth, healthcare success, free medical webinar, April 2026',
  authors: [{ name: 'Smitha Chowdary Kankanala' }],
  creator: 'Smitha Chowdary Kankanala',
  publisher: 'Healthcare Transformation Academy',
  openGraph: {
    title: 'Healthcare Communication Masterclass with Smitha Kankanala | April 19, 2026',
    description: 'Join healthcare professionals in this exclusive free webinar. Master healthcare communication with the CHCP system.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Ward Round Method Webinar',
    images: [
      {
        url: '/thumbnail.png?v=20260407',
        width: 1200,
        height: 630,
        alt: 'Healthcare Communication Masterclass with Smitha Kankanala - April 19, 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare Communication Masterclass with Smitha Kankanala',
    description: 'Join 1000+ healthcare professionals. April 19, 2026. Reserve your free seat now!',
    creator: '@SmithaHealthcare',
    images: ['/thumbnail.png?v=20260407'],
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
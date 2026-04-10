import type { Metadata } from 'next'
import { Bebas_Neue, Barlow } from 'next/font/google'
import Script from 'next/script'
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
        url: '/thumbnail_3.png?v=20260410-1',
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
    images: ['/thumbnail_3.png?v=20260410-1'],
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
  other: {
    'facebook-domain-verification': 'yw3cqxso848wbonvx6qlv6mhdkcf3t',
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
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1446645716916421');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1446645716916421&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={`${bebasNeue.variable} ${barlow.variable} font-barlow bg-dark text-white min-h-screen overflow-x-hidden`}>
        <div className="glow-left"></div>
        <div className="glow-right"></div>
        {children}
      </body>
    </html>
  )
}
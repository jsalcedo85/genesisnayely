import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Génesis Nayely',
  description: 'Página web personal de Génesis Nayely',
  openGraph: {
    title: 'Génesis Nayely',
    description: 'Página web personal de Génesis Nayely',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Génesis Nayely - G.N',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Génesis Nayely',
    description: 'Página web personal de Génesis Nayely',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta property="og:image" content="/og-image.svg" />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="/og-image.svg" />
      </head>
      <body>{children}</body>
    </html>
  )
}


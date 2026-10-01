import type { Metadata } from 'next'
import { DM_Sans, Caveat, DM_Mono, Figtree, IM_Fell_English, Pacifico } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

// The desk's faces: a neon script for the name, a clean sans for cards, handwriting for the post-its,
// an old-style serif for the night sky and a mono for labels.
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', variable: '--font-pacifico' })
const caveat = Caveat({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-caveat' })
const figtree = Figtree({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-figtree' })
const fell = IM_Fell_English({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-fell' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://yudavid.dev'),
  title: {
    default: 'David Yu',
    template: '%s | David Yu',
  },
  description: "David Yu: CS at Northeastern, class of 2027, in New York City. Software engineer, past LinkedIn, Citizens, Generate and Amazon.",
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    siteName: 'David Yu',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${pacifico.variable} ${caveat.variable} ${figtree.variable} ${fell.variable} ${dmMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0D1B2A] overscroll-none">
        <div className="relative min-h-screen bg-[#0D1B2A]">
          {children}
        </div>
      </body>
    </html>
  )
}

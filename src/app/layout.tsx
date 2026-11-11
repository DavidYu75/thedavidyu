import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Self-hosted (Fontsource) so the build never fetches Google Fonts; see the note in app/page.tsx.
const dmSans = localFont({
  src: '../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2',
  weight: '100 1000',
  variable: '--font-dm-sans',
})


export const metadata: Metadata = {
  metadataBase: new URL('https://yudavid.dev'),
  title: {
    default: 'David Yu',
    template: '%s | David Yu',
  },
  description: "David Yu: CS at Northeastern, class of 2027, in New York City. Software engineer, interning at Amperesand, past LinkedIn, Citizens, Generate and Amazon.",
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
    <html lang="en" className={`${dmSans.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0D1B2A] overscroll-none">
        <div className="relative min-h-screen bg-[#0D1B2A]">
          {children}
        </div>
      </body>
    </html>
  )
}

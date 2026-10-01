import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
})


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
    <html lang="en" className={`${dmSans.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0D1B2A] overscroll-none">
        <div className="relative min-h-screen bg-[#0D1B2A]">
          {children}
        </div>
      </body>
    </html>
  )
}

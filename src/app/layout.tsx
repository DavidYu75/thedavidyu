import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'David Yu',
  description: 'Personal website and portfolio of David Yu',
  icons: {
    icon: '/logo.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0D1B2A] overscroll-none">
        <div className="relative min-h-screen bg-[#0D1B2A]">
          {children}
        </div>
      </body>
    </html>
  )
}
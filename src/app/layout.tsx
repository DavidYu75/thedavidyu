import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import MobileNotice from '@/components/MobileNotice'

// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter',
// })

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

// const inter = Inter({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700'],
//   variable: '--font-inter',
// })

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
    <html lang="en" className={`${dmSans.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0D1B2A] overscroll-none">
        <MobileNotice />
        <div className="relative min-h-screen bg-[#0D1B2A]">
          {children}
        </div>
      </body>
    </html>
  )
}

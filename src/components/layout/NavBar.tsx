'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full ${
        isScrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold">
          DY
        </Link>
        <div className="hidden space-x-8 sm:flex">
          <Link href="#projects" className="hover:text-primary-600">
            Projects
          </Link>
          <Link href="#experience" className="hover:text-primary-600">
            Experience
          </Link>
          <Link href="#contact" className="hover:text-primary-600">
            Contact
          </Link>
        </div>
      </nav>
    </motion.header>
  )
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full ${
        isScrolled ? 'bg-[#0D1B2A]/90 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link 
          href="/" 
          className="text-xl font-bold text-white hover:text-[#778DA9] transition-colors"
        >
          DY
        </Link>
        <div className="hidden sm:flex sm:space-x-8">
          <Link 
            href="#about" 
            className="text-[#778DA9] hover:text-white transition-colors"
          >
            About
          </Link>
          <Link 
            href="#experience" 
            className="text-[#778DA9] hover:text-white transition-colors"
          >
            Experience
          </Link>
          <Link 
            href="#projects" 
            className="text-[#778DA9] hover:text-white transition-colors"
          >
            Projects
          </Link>
          <Link 
            href="#contact" 
            className="text-[#778DA9] hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default NavBar;
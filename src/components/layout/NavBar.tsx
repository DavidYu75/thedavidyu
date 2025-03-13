'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

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
        
        {/* Desktop Navigation */}
        <div className="hidden sm:flex sm:space-x-8">
          <Link 
            href="#intro" 
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
        
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="sm:hidden bg-[#0D1B2A]/95 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-3 space-y-4">
            <Link 
              href="#intro" 
              className="block py-2 text-[#778DA9] hover:text-white transition-colors"
              onClick={handleLinkClick}
            >
              About
            </Link>
            <Link 
              href="#experience" 
              className="block py-2 text-[#778DA9] hover:text-white transition-colors"
              onClick={handleLinkClick}
            >
              Experience
            </Link>
            <Link 
              href="#projects" 
              className="block py-2 text-[#778DA9] hover:text-white transition-colors"
              onClick={handleLinkClick}
            >
              Projects
            </Link>
            <Link 
              href="#contact" 
              className="block py-2 text-[#778DA9] hover:text-white transition-colors"
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default NavBar;

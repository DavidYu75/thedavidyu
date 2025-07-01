'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkIfMobile = () => {
      clearTimeout(timeoutId);
      
      // Debounce the state update to avoid excessive re-renders
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100); // 100ms debounce delay
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      clearTimeout(timeoutId);
    };
  }, []);
  
  return isMobile;
};

export default function Home() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#0D1B2A] overflow-x-hidden">
      <NavBar />
      <main className="relative z-0">
        {!isMobile && <Hero />}
        <Intro />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

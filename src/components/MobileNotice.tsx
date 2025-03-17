'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MobileNotice = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Check on resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-[#0D1B2A] z-[9999] flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[85%] max-w-md bg-[#1B263B] rounded-lg p-6 shadow-2xl text-center"
      >
        <div className="w-16 h-16 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#778DA9" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h2 className="text-[#FBF9FF] font-bold text-2xl mb-3">Mobile Version Under Development</h2>
        
        <p className="text-[#778DA9] mb-6">
          For the best viewing experience, please visit this site on a desktop or laptop computer.
        </p>
        
        <div className="w-full h-px bg-[#415A77] my-6"></div>
        
        <p className="text-[#778DA9] text-sm">
          If you&#39;d like to connect, feel free to reach out via:
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link 
            href="mailto:davyu735@gmail.com"
            className="text-[#FBF9FF] hover:text-[#415A77] transition-colors"
          >
            Email
          </Link>
          <Link 
            href="https://linkedin.com/in/david-t-yu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FBF9FF] hover:text-[#415A77] transition-colors"
          >
            LinkedIn
          </Link>
          <Link 
            href="https://github.com/DavidYu75"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FBF9FF] hover:text-[#415A77] transition-colors"
          >
            GitHub
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileNotice;

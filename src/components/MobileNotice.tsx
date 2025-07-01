'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Monitor } from 'lucide-react';

const MobileNotice = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (!isMobile) return null;
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-md rounded-xl bg-[#1B263B] p-6 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-[#0D1B2A] p-3">
            <Monitor className="h-8 w-8 text-[#778DA9]" />
          </div>
          
          <h3 className="mb-2 text-xl font-bold text-[#FBF9FF]">
            Better on Desktop
          </h3>
          
          <p className="mb-6 text-[#778DA9]">
            For the best experience, we recommend viewing this website on a desktop or laptop computer.
          </p>
          
          <div className="flex w-full space-x-4">
            <button
              onClick={() => setIsVisible(false)}
              className="flex-1 rounded-lg border border-[#415A77] px-4 py-2 text-sm font-medium text-[#FBF9FF] transition-colors hover:bg-[#415A77]/20"
            >
              Continue on Mobile
            </button>
          </div>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-3 rounded-full p-1 text-[#778DA9] transition-colors hover:bg-[#0D1B2A] hover:text-[#FBF9FF]"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    </div>
  );
};

export default MobileNotice;

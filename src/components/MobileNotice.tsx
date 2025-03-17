'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-[100] bg-[#0D1B2A] p-4 shadow-lg"
    >
      <div className="bg-[#1B263B] rounded-lg p-4 text-center">
        <h3 className="text-[#FBF9FF] font-bold text-lg mb-2">Mobile Version Under Development</h3>
        <p className="text-[#778DA9]">
          For the best viewing experience, please visit this site on a desktop or laptop computer.
        </p>
      </div>
    </motion.div>
  );
};

export default MobileNotice;

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Monitor } from 'lucide-react';
import styles from './MobileNotice.module.css';

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
    <div className={styles.overlay}>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={styles.dialog}
      >
        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <Monitor className={styles.icon} />
          </div>
        </div>
        
        <h3 className={styles.title}>
          Better on Desktop
        </h3>
        
        <p className={styles.message}>
          For the best experience, we recommend viewing this website on a desktop or laptop computer.
        </p>
        
        <div className={styles.buttonContainer}>
          <button
            onClick={() => setIsVisible(false)}
            className={styles.primaryButton}
          >
            Continue on Mobile
          </button>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className={styles.closeButton}
          aria-label="Close dialog"
        >
          <X className={styles.closeIcon} />
        </button>
      </motion.div>
    </div>
  );
};

export default MobileNotice;

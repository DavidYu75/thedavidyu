'use client';

import { useRef } from 'react';
import styles from '@/styles/Hero.module.css';

const Hero = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  return (
    <section className={styles.videoHeroSection}>
      <div className={styles.stickyContainer}>
        <iframe 
          ref={iframeRef}
          src="/videoscroll/video.html" 
          className={styles.videoIframe} 
          allow="autoplay"
          loading="eager"
          title="Scrolling Video Hero"
        />
      </div>
    </section>
  );
};

export default Hero;
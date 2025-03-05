'use client';

import { motion } from 'framer-motion';
import styles from '@/styles/Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.topGradient} />
      
      <div className={styles.content}>
        {/* Hero content will be added later */}
      </div>

      <div className={styles.bottomGradient} />
    </section>
  );
};

export default Hero;
'use client';

import { motion } from 'framer-motion';
import styles from '@/styles/About.module.css';
import { aboutContent } from '@/data/about';
import Image from 'next/image';

export function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.topGradient} />

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.grid}
        >
          <div>
            <h2 className={styles.title}>About Me</h2>
            <div className={styles.textContainer}>
              {aboutContent.description.map((paragraph, index) => (
                <p key={index} className={styles.text}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.image}
          >

            <Image 
              src="/images/hero2.JPEG" 
              alt="Picture of Me" 
              fill
              // width={400}
              // height={400}
              style={{ objectFit: 'cover', borderRadius: '1rem' }}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.bottomGradient} />
    </section>
  );
}

export default About;
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/Hero.module.css';

const Typewriter = () => {
  const words = useMemo(() => ["Full Stack Developer", "AI/ML Engineer", "Coding Nerd"], []);
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, speed);
    } else {
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, speed);
    }

    if (!isDeleting && text === currentWord) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex, speed, words]);

  useEffect(() => {
    setSpeed(isDeleting ? 50 : 100);
  }, [isDeleting]);

  return <span>{text}</span>;
};

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.topGradient} />
      
      <div className={styles.content}>
        <div className={styles.grid}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`typewriter ${styles.title}`}>
              Hey, I&#39;m David 🧑🏻‍💻
            </h1>
            <p className={styles.role}>
              <Typewriter />
            </p>
            <p className={styles.location}>
              Based in New York City
            </p>
            <p className={styles.description}>
              I&#39;m passionate about building exceptional digital experiences that live at the 
              intersection of design and technology.
            </p>
            <div className={styles.buttons}>
              <motion.a
                href="#contact"
                className={styles.primaryButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in touch
              </motion.a>
              <motion.a
                href="#projects"
                className={styles.secondaryButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
              </motion.a>
            </div>
          </motion.div>
          <div className={styles.imageContainer}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={styles.image}
            >
              <div className={styles.imageOverlay} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className={styles.bottomGradient} />
    </section>
  );
};

export default Hero;
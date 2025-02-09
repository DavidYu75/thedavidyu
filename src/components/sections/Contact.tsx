'use client';

import { motion } from 'framer-motion';
import styles from '@/styles/Contact.module.css';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.content}>
        <div className={styles.grid}>
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>Let&#39;s talk for</h2>
              <h2 className={styles.titleHighlight}>Something special</h2>
            </div>
            <p className={styles.description}>
              I seek to push the limits of creativity to create high-engaging, user-friendly, 
              and memorable interactive experiences.
            </p>
            <div className={styles.contactInfo}>
              <a 
                href="mailto:davyu735@gmail.com"
                className={styles.emailLink}
              >
                davyu735@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                placeholder="Your name"
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Your website (If exists)"
                className={styles.input}
              />
              <textarea
                placeholder="How can I help?"
                rows={4}
                className={styles.textarea}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={styles.submitButton}
              >
                Get In Touch
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
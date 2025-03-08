'use client';

import { motion } from 'framer-motion';
import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
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
              <h2 className={styles.title}>Let&#39;s Connect!</h2>
              <h3 className={styles.description}>
                I seek to push the limits of creativity to create high-engaging, user-friendly, 
                and memorable interactive experiences.
              </h3>
            </div>
            {/* New contact icons */}
            <div className={styles.contactButtons}>
              <a
                href="mailto:davyu735@gmail.com"
                className={styles.contactButton}
              >
                <MdEmail size={24} />
              </a>
              <a
                href="https://linkedin.com/in/david-t-yu"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactButton}
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/DavidYu75"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactButton}
              >
                <FaGithub size={24} />
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
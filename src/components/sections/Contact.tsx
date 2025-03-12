'use client';

import { motion } from 'framer-motion';
import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from '@/styles/Contact.module.css';

const Contact = () => {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={styles.centeredContent}
        >
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Let&#39;s Connect!</h2>
            <h3 className={styles.description}>
              Feel free to reach out via email or connect with me on social media.
            </h3>
          </div>
          
          <div className={styles.socialContainer}>
            <motion.a
              href="mailto:davyu735@gmail.com"
              className={styles.contactButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MdEmail size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/david-t-yu"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin size={24} />
            </motion.a>
            <motion.a
              href="https://github.com/DavidYu75"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={24} />
            </motion.a>
          </div>
          
          <motion.div 
            className={styles.emailContainer}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a 
              href="mailto:davyu735@gmail.com" 
              className={styles.emailButton}
            >
              davyu735@gmail.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

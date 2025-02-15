'use client';

import { motion } from 'framer-motion';
import styles from '@/styles/About.module.css';
import { aboutContent } from '@/data/about';

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
            className={styles.skillsCard}
          >
            <div>
              <h3 className={styles.skillsTitle}>Skills & Technologies</h3>
              <div className={styles.skillsList}>
                {aboutContent.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={styles.skillsTitle}>Interests</h3>
              <ul className={styles.interestsList}>
                {aboutContent.interests.map((interest) => (
                  <li key={interest} className={styles.interestItem}>
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.bottomGradient} />
    </section>
  );
}

export default About;
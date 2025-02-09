'use client';

import { motion } from 'framer-motion';
import styles from '@/styles/About.module.css';

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
              <p className={styles.text}>
                I&#39;m a software engineer passionate about building elegant solutions
                to complex problems. With a strong foundation in full-stack development,
                I specialize in creating performant and user-friendly web applications.
              </p>
              <p className={styles.text}>
                My journey in tech has led me through various roles where I&#39;ve had
                the opportunity to work with diverse teams and technologies. I&#39;m
                particularly interested in web performance optimization and creating
                accessible user interfaces.
              </p>
              <p className={styles.text}>
                When I&#39;m not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge
                through technical writing and mentoring.
              </p>
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
                {[
                  'React',
                  'TypeScript',
                  'Node.js',
                  'Next.js',
                  'Tailwind CSS',
                  'Python',
                  'Git',
                  'AWS',
                ].map((skill) => (
                  <span
                    key={skill}
                    className={styles.skillTag}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={styles.skillsTitle}>Interests</h3>
              <ul className={styles.interestsList}>
                <li className={styles.interestItem}>Web Performance Optimization</li>
                <li className={styles.interestItem}>User Interface Design</li>
                <li className={styles.interestItem}>Accessibility</li>
                <li className={styles.interestItem}>Open Source Development</li>
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
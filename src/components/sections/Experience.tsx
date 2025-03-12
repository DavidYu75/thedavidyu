'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Experience.module.css';
import { experiences } from '@/data/experience';

const Experience = () => {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.topGradient} />
      
      <div className={styles.content}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.title}>My Experience</h2>
          </motion.div>

          <div className={styles.timelineContainer}>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={styles.timelineItem}
              >
                <div className={styles.timelineDot} />
                
                <Link href={`/experience/${exp.slug}`} className={styles.experienceCard}>
                  <div className={styles.cardContent}>
                    <div className={styles.logoContainer}>
                      {exp.logo && (
                        <Image 
                          src={exp.logo} 
                          alt={`${exp.company} logo`}
                          width={40}
                          height={40}
                          className={styles.logo}
                        />
                      )}
                    </div>
                    
                    <div className={styles.itemContent}>
                      <div className={styles.itemHeader}>
                        <h3 className={styles.jobTitle}>{exp.title}</h3>
                        <span className={styles.period}>{exp.period}</span>
                      </div>
                      <p className={styles.description}>
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomGradient} />
    </section>
  );
};

export default Experience;

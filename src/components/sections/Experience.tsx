'use client';

import { motion } from 'framer-motion';
import styles from '@/styles/Experience.module.css';

interface Experience {
  title: string;
  period: string;
  description: string;
}

const Experience = () => {
  const experiences: Experience[] = [
    {
      title: 'Lead Software Engineer at Google',
      period: 'Nov 2019 - Present',
      description: 'As a Senior Software Engineer at Google, I played a pivotal role in developing innovative solutions for Google\'s core search algorithms. Collaborating with a dynamic team of engineers, I contributed to the enhancement of search accuracy and efficiency, optimizing user experiences for millions of users worldwide.'
    },
    {
      title: 'Software Engineer at Youtube',
      period: 'Jan 2017 - Oct 2019',
      description: 'At Youtube, I served as a Software Engineer, focusing on the design and implementation of backend systems for the social media giant\'s dynamic platform. Working on projects that involved large scale data processing and user engagement features.'
    },
    {
      title: 'Junior Software Engineer at Apple',
      period: 'Jan 2016 - Dec 2017',
      description: 'During my tenure at Apple, I held the role of Software Architect, where I played a key role in shaping the architecture of mission-critical software projects. Responsible for designing scalable and efficient systems.'
    }
  ];

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
                
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <h3 className={styles.jobTitle}>{exp.title}</h3>
                    <span className={styles.period}>{exp.period}</span>
                  </div>
                  <p className={styles.description}>
                    {exp.description}
                  </p>
                </div>
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
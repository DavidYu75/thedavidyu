'use client';

import { motion } from 'framer-motion';
import styles from '@/styles/Projects.module.css';

const Projects = () => {
  const projects = [
    {
      id: '01',
      title: 'Crypto Screener Application',
      description: 'A comprehensive cryptocurrency tracking and analysis tool that provides real-time data, customizable alerts, and detailed market insights for crypto traders and investors.',
      image: '/placeholder-1.jpg',
    },
    {
      id: '02',
      title: 'E-commerce Website Template',
      description: 'A modern e-commerce solution with a focus on performance and user experience. Features include product filtering, cart management, and responsive design.',
      image: '/placeholder-2.jpg',
    },
    {
      id: '03',
      title: 'Blog Website Template',
      description: 'A clean and minimal blog platform with markdown support, categorization, and built-in SEO optimization. Perfect for content creators and writers.',
      image: '/placeholder-3.jpg',
    },
  ];

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.content}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.title}>My Projects</h2>
          </motion.div>
          
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className={styles.projectCard}
              >
                <div className={styles.projectInfo}>
                  <span className={styles.projectId}>{project.id}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <motion.a 
                    href="#" 
                    className={styles.projectLink}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>View Project</span>
                    <span>→</span>
                  </motion.a>
                </div>
                <div className={styles.imageContainer}>
                  <div className={styles.image}>
                    <div className={styles.imageGradient} />
                  </div>
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

export default Projects;
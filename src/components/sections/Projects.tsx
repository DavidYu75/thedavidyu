'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from '@/styles/Projects.module.css';
import { projects } from '@/data/projects';
import Image from 'next/image';

const Projects = () => {
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
                  <motion.div 
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href={project.link}
                      className={styles.projectLink}
                    >
                      <span>View Project</span>
                      <span>→</span>
                    </Link>
                  </motion.div>
                </div>
                <div className={styles.imageContainer}>
                  <div className={styles.image}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      className={styles.projectImage}
                      width={350}
                      height={300}
                    />
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

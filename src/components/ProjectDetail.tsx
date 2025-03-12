'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects, Project } from '@/data/projects';
import { projectDetails } from '@/data/projectDetail';
import styles from '@/styles/ProjectDetail.module.css';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<Project | undefined>(undefined);
  
  useEffect(() => {
    if (params.slug && typeof params.slug === 'string') {
      const foundProject = projects.find(proj => proj.slug === params.slug);
      setProject(foundProject);
    }
  }, [params]);

  if (!project) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const detail = projectDetails[project.slug];

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.content}
        >
          <Link href="/#projects" className={styles.backLink}>
            ← Back to Projects
          </Link>
          
          <div className={styles.header}>
            <h1 className={styles.title}>{project.title}</h1>
            {detail && detail.githubUrl && (
              <a 
                href={detail.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.headerButton}
              >
                <FaGithub size={20} />
                <span>View on GitHub</span>
              </a>
            )}
          </div>
          
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={450}
                className={styles.featuredImage}
              />
            </div>
          </div>
          
          {detail && (
            <>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Overview</h2>
                <p className={styles.text}>{detail.overview}</p>
              </div>
              
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Features</h2>
                <ul className={styles.list}>
                  {detail.features.map((feature, index) => (
                    <li key={index} className={styles.listItem}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Technologies</h2>
                <div className={styles.tags}>
                  {detail.technologies.map((tech, index) => (
                    <span key={index} className={styles.tag}>{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Challenges & Solutions</h2>
                <ul className={styles.list}>
                  {detail.challenges.map((challenge, index) => (
                    <li key={index} className={styles.listItem}>{challenge}</li>
                  ))}
                </ul>
              </div>
              
              {detail.screenshots && detail.screenshots.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Screenshots</h2>
                  <div className={styles.screenshotGrid}>
                    {detail.screenshots.map((screenshot, index) => (
                      <div key={index} className={styles.screenshotContainer}>
                        <Image
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          width={350}
                          height={200}
                          className={styles.screenshot}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className={styles.links}>
                {detail.liveUrl && (
                  <a 
                    href={detail.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    <FaExternalLinkAlt size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

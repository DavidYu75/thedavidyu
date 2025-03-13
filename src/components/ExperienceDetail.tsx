'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { experiences, Experience } from '@/data/experience';
import { experienceDetails } from '@/data/experienceDetail';
import styles from '@/styles/ExperienceDetail.module.css';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

export default function ExperienceDetail() {
  const params = useParams();
  const [experience, setExperience] = useState<Experience | undefined>(undefined);
  
  useEffect(() => {
    if (params.slug && typeof params.slug === 'string') {
      const foundExperience = experiences.find(exp => exp.slug === params.slug);
      setExperience(foundExperience);
    }
  }, [params]);

  if (!experience) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const detail = experienceDetails[experience.slug];

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
          <Link href="/#experience" className={styles.backLink}>
            ← Back to Experience
          </Link>
          
          <div className={styles.header}>
            <div className={styles.logoContainer}>
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                width={80}
                height={80}
                className={styles.logo}
              />
            </div>
            
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{experience.title}</h1>
              <h2 className={styles.company}>{experience.company}</h2>
              <p className={styles.period}>{experience.period}</p>
            </div>
          </div>
          
          <div className={styles.description}>
            <h3 className={styles.sectionTitle}>Overview</h3>
            <p className={styles.text}>{experience.description}</p>
          </div>
          
          {detail && (
            <>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Key Responsibilities</h3>
                <ul className={styles.list}>
                  {detail.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Technologies Used</h3>
                <div className={styles.tags}>
                  {detail.technologies.map((tech, index) => (
                    <span key={index} className={styles.tag}>{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Key Achievements</h3>
                <ul className={styles.list}>
                  {detail.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
              
              {detail.memories && detail.memories.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Memories</h3>
                  <div className={styles.memoriesGrid}>
                    {detail.memories.map((memory, index) => (
                      <div key={index} className={styles.memoryContainer}>
                        <Image
                          src={memory}
                          alt={`${experience.company} memory ${index + 1}`}
                          width={350}
                          height={220}
                          className={styles.memoryImage}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

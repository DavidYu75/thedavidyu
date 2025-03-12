'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { experiences, Experience } from '@/data/experience';
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

  // You can customize these sections with real data for each company
  const responsibilities = {
    'citizens-bank': [
      'Develop automation solutions for banking processes',
      'Implement secure financial transaction systems',
      'Collaborate with cross-functional teams on digital transformation initiatives'
    ],
    'generate-product-development': [
      'Architect and develop a scalable restaurant analytics platform',
      'Build RESTful APIs with Fiber and MongoDB for data processing',
      'Implement secure JWT authentication and role-based access control'
    ],
    'outlier': [
      'Engineer data pipelines for large language models',
      'Deploy Python testing frameworks with A/B testing capabilities',
      'Design prompt engineering systems for diverse training data'
    ],
    'amazon': [
      'Develop high-performance AWS Lambda functions for monitoring',
      'Implement real-time processing pipelines with CloudWatch',
      'Optimize AWS costs through improved resource utilization'
    ]
  };

  const technologies = {
    'citizens-bank': ['Java', 'Spring Boot', 'Oracle', 'Docker'],
    'generate-product-development': ['Go', 'Fiber', 'MongoDB', 'RESTful APIs', 'Microservices'],
    'outlier': ['Python', 'TensorFlow', 'PyTorch', 'LLMs', 'A/B Testing'],
    'amazon': ['AWS Lambda', 'CloudWatch', 'S3', 'Node.js', 'Cloud Infrastructure']
  };

  const achievements = {
    'citizens-bank': [
      'Incoming role - Summer and Fall 2025'
    ],
    'generate-product-development': [
      'Improved inventory efficiency by 20% through data-driven recommendations',
      'Built APIs with sub-100ms response times for processing over 1000 dish metrics',
      'Established secure access controls for 50+ restaurants and 1000+ users'
    ],
    'outlier': [
      'Improved response accuracy by 30% through automated metrics analysis',
      'Reduced iteration cycles by 40% with enhanced testing frameworks',
      'Generated 5x more diverse training data for better model generalization'
    ],
    'amazon': [
      'Achieved 99.99% reliability and sub-second latency for monitoring solutions',
      'Reduced monitoring latency by 60% via real-time processing pipelines',
      'Cut AWS costs by 40% while handling 3x the volume'
    ]
  };

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
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Key Responsibilities</h3>
            <ul className={styles.list}>
              {responsibilities[experience.slug as keyof typeof responsibilities]?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Technologies Used</h3>
            <div className={styles.tags}>
              {technologies[experience.slug as keyof typeof technologies]?.map((tech, index) => (
                <span key={index} className={styles.tag}>{tech}</span>
              ))}
            </div>
          </div>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Key Achievements</h3>
            <ul className={styles.list}>
              {achievements[experience.slug as keyof typeof achievements]?.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

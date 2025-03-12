export interface ExperienceDetail {
    responsibilities: string[];
    technologies: string[];
    achievements: string[];
}

export type ExperienceDetailMap = {
    [slug: string]: ExperienceDetail;
};
  
export const experienceDetails: ExperienceDetailMap = {
    'citizens-bank': {
        responsibilities: [
        'Develop automation solutions for banking processes',
        'Implement secure financial transaction systems',
        'Collaborate with cross-functional teams on digital transformation initiatives'
        ],
        technologies: ['Java', 'Spring Boot', 'Oracle', 'Docker'],
        achievements: [
        'Incoming role - Summer and Fall 2025'
        ]
    },
  
    'generate-product-development': {
      responsibilities: [
        'Architect and develop a scalable restaurant analytics platform',
        'Build RESTful APIs with Fiber and MongoDB for data processing',
        'Implement secure JWT authentication and role-based access control'
      ],
      technologies: ['Go', 'Fiber', 'MongoDB', 'RESTful APIs', 'Microservices'],
      achievements: [
        'Improved inventory efficiency by 20% through data-driven recommendations',
        'Built APIs with sub-100ms response times for processing over 1000 dish metrics',
        'Established secure access controls for 50+ restaurants and 1000+ users'
      ]
    },
  
    'outlier': {
      responsibilities: [
        'Engineer data pipelines for large language models',
        'Deploy Python testing frameworks with A/B testing capabilities',
        'Design prompt engineering systems for diverse training data'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'LLMs', 'A/B Testing'],
      achievements: [
        'Improved response accuracy by 30% through automated metrics analysis',
        'Reduced iteration cycles by 40% with enhanced testing frameworks',
        'Generated 5x more diverse training data for better model generalization'
      ]
    },
  
    'amazon': {
      responsibilities: [
        'Develop high-performance AWS Lambda functions for monitoring',
        'Implement real-time processing pipelines with CloudWatch',
        'Optimize AWS costs through improved resource utilization'
      ],
      technologies: ['AWS Lambda', 'CloudWatch', 'S3', 'Node.js', 'Cloud Infrastructure'],
      achievements: [
        'Achieved 99.99% reliability and sub-second latency for monitoring solutions',
        'Reduced monitoring latency by 60% via real-time processing pipelines',
        'Cut AWS costs by 40% while handling 3x the volume'
      ]
    }
};

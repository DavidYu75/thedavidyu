export interface ExperienceDetail {
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  memories?: string[];
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
    technologies: [],
    achievements: [
      'Incoming role - Summer and Fall 2025'
    ],
    memories: [],
  },

  'generate-product-development': {
    responsibilities: [
      'Developing restaurant rating and analytics platform using Go/Fiber backend to revolutionize restarant rating and discovery',
      'Architecting comprehensive RESTful API system leveraging MongoDB for high-performance restaurant metric processing',
      'Establishing secure authentication infrastructure with JWT implementation and granular role-based access controls',
      'Designing scalable microservices architecture ensuring seamless data integration across platform components',
      'Participating in agile development processes including sprint planning, weekly code reviews and standups, and retrospectives'
    ],
    technologies: ['Go', 'Fiber', 'MongoDB', 'RESTful APIs', 'JWT Authentication', 'Agile Methodologies'],
    achievements: [
      'Engineered restaurant analytics platform targeting 20% inventory efficiency improvement across client operations',
      'Designed and implemented high-performance RESTful APIs processing 1000+ dish metrics with consistent sub-100ms response times',
      'Established comprehensive security infrastructure supporting 50+ restaurants and 1000+ users while maintaining strict data protection standards',
      'Constructed resilient microservices architecture achieving 99% uptime during platform scaling phases',
    ],
    memories: [],
  },

  'outlier': {
    responsibilities: [
      'Engineered robust data pipelines for large language models (LLMs) to streamline training and evaluation processes',
      'Designed and implemented comprehensive testing frameworks with A/B testing capabilities for model performance validation',
      'Developed innovative prompt engineering systems to generate diverse and high-quality training datasets',
      'Optimized data processing workflows to accelerate model iteration cycles',
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'LLMs', 'A/B Testing'],
    achievements: [
      'Engineered data processing pipelines that improved model response accuracy by 30% through enhanced quality control',
      'Deployed testing framework that reduced model iteration cycles by 40% through streamlined evaluation processes',
      'Designed prompt engineering system that generated 5x more diverse training data, significantly enhancing model generalization capabilities',
      'Implemented distributed evaluation architecture scaling to 200+ concurrent model tests with 99% reliability',
      'Reduced model training time by 35% through optimization of data preprocessing steps',
      'Authored comprehensive documentation that improved knowledge sharing and onboarding efficiency',
    ],
    memories: [],
  },

  'amazon': {
    responsibilities: [
      'Designed and implemented high-performance AWS Lambda functions that processed 100+ daily metrics with precision monitoring capabilities',
      'Architected real-time processing pipelines utilizing CloudWatch alarms, metrics, and dashboards for comprehensive service health monitoring',
      'Implemented robust error handling and retry mechanisms achieving 95% reduction in failed data collections',
      'Created detailed documentation for system architecture and future implementation',
      'Led code reviews and incorporated constructive feedback to maintain high code quality'
    ],
    technologies: ['Java', 'AWS Lambda', 'CloudWatch', 'S3', 'Cloud Infrastructure', 'CI/CD Pipelines'],
    achievements: [
      'Engineered AWS Lambda functions that maintained 99.99% reliability with sub-second latency while processing 100+ complex metrics weekly and monthly',
      'Reduced system monitoring latency by 60% through implementation of optimized real-time processing pipelines and custom CloudWatch metrics',
      'Cut AWS operational costs by 40% through innovative batching algorithms and resource utilization improvements',
      'Successfully handled 3x monitoring volume while reducing failed collections by 95% through robust error handling',
      'Created and delivered technical presentation on cloud cost optimization strategies to GCCP (Growth Composite Contributions Profits) team',
      'Completed end-to-end ownership of monitoring solution from initial conception to successful production deployment and increased stakeholder value'
    ],
    memories: [
      '/images/experiences/amazon/setup.JPEG',
      '/images/experiences/amazon/banana.jpg',
      '/images/experiences/amazon/team-lunch.jpg',
      '/images/experiences/amazon/balls.JPEG',
      '/images/experiences/amazon/seattle.jpg',
      '/images/experiences/amazon/mountain.jpg'
    ],
  }
};

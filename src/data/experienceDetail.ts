export interface Memory {
  url: string;
  caption: string;
}

export interface ExperienceDetail {
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  memories?: Memory[];
}

export type ExperienceDetailMap = {
  [slug: string]: ExperienceDetail;
};

export const experienceDetails: ExperienceDetailMap = {
  'linkedin': {
    responsibilities: [
      'Built a new Profile feature spanning 6 codebases and 3 native clients (web, iOS, Android), driven entirely by a single server-defined UI description',
      'Designed the scoring API as a stateless, deterministic service so replay safety falls out of the inputs rather than session tokens',
      'Modeled persistence as a three-state lifecycle with conditional-write semantics, and backed it with storage-layer invariant tests',
      'Turned the privacy and authorization requirements into build-gating tests instead of review-time checklist items',
      'Worked across client and server teams to land one shared contract in place of three separate client implementations',
    ],
    technologies: ['Java', 'Kotlin', 'Server-Driven UI', 'REST APIs', 'iOS', 'Android', 'Integration Testing'],
    achievements: [
      'Collapsed three parallel client implementations into one source of truth that ships without a client release',
      'Removed every server round-trip until final submission, so the feature stays responsive and free of reconciliation bugs',
      'Guaranteed by test that retakes commit zero writes and that duplicate requests land on identical end states',
      'Made member identity server-derived and never an API argument, with schema and behavioral tests that fail the build on identity-shaped inputs or cross-member writes',
    ],
    memories: [],
  },

  'citizens-bank': {
    responsibilities: [
      'Develop comprehensive UiPath package management tool with advanced dev lead approval workflows for enterprise automation deployment',
      'Automate Nexus deployment pipeline systems to enable seamless distribution of 50+ development packages across enterprise infrastructure',
      'Build and optimize Azure VDI scripts to streamline virtual desktop operations and reduce manual processing overhead',
      'Lead cross-functional GenAI initiative to develop artificial intelligence capabilities across diverse organizational roles',
      'Drive responsible AI adoption practices and establish governance frameworks for enterprise AI implementation'
    ],
    technologies: ['UiPath', 'Azure VDI', 'Nexus', 'CI/CD Pipelines', 'Enterprise Automation', 'GenAI'],
    achievements: [
      'Developed UiPath package management solution that reduced deployment time by 60% through streamlined approval workflows',
      'Engineered automated Nexus deployment pipeline supporting seamless distribution of 50+ development packages enterprise-wide',
      'Created Azure VDI automation scripts that cut manual processing time by 25% across 100+ virtual desktop environments',
      'Led pioneering cross-functional initiative to integrate GenAI capabilities across multiple organizational roles and departments',
      'Established responsible AI governance framework driving ethical AI adoption practices throughout the enterprise',
      'Delivered end-to-end automation solutions from conception to production deployment with measurable efficiency improvements'
    ],
    memories: [
      {
        url: '/images/experiences/citizens/welcome.JPEG',
        caption: 'Citizens Welcome Package'
      },
    ],
  },

  'generate-product-development': {
    responsibilities: [
      'Developed restaurant rating and analytics platform using Go/Fiber backend to revolutionize restaurant rating and discovery',
      'Architected comprehensive RESTful API system leveraging MongoDB for high-performance restaurant metric processing',
      'Established secure authentication infrastructure with JWT implementation and granular role-based access controls',
      'Designed scalable microservices architecture ensuring seamless data integration across platform components',
      'Participated in agile development processes including sprint planning, weekly code reviews and standups, and retrospectives'
    ],
    technologies: ['Go', 'Fiber', 'MongoDB', 'RESTful APIs', 'JWT Authentication', 'Agile Methodologies'],
    achievements: [
      'Engineered restaurant analytics platform targeting 20% inventory efficiency improvement across client operations',
      'Designed and implemented high-performance RESTful APIs processing 1000+ dish metrics with consistent sub-100ms response times',
      'Established comprehensive security infrastructure supporting 50+ restaurants and 1000+ users while maintaining strict data protection standards',
      'Constructed resilient microservices architecture achieving 99% uptime during platform scaling phases',
    ],
    memories: [
      {
        url: '/images/experiences/generate/team.PNG',
        caption: 'My amazing team for PlateMate'
      },
      {
        url: '/images/experiences/generate/showcase.JPEG',
        caption: 'PlateMate at Generate\'s Spring Showcase presented by our PM Danny Rollo'
      },
      {
        url: '/images/experiences/generate/brand.JPEG',
        caption: 'Generate and PlateMate branding'
      },
      {
        url: '/images/experiences/generate/presentation.JPEG',
        caption: 'Tabling for PlateMate'
      }
    ],
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
      {
        url: '/images/experiences/amazon/setup.JPEG',
        caption: 'My office setup at Amazon\'s Bigfoot office'
      },
      {
        url: '/images/experiences/amazon/banana.jpg',
        caption: 'The famous banana cart'
      },
      {
        url: '/images/experiences/amazon/team-lunch.jpg',
        caption: 'Lunch with my team at a local Seattle restaurant'
      },
      {
        url: '/images/experiences/amazon/balls.JPEG',
        caption: 'The Spheres'
      },
      {
        url: '/images/experiences/amazon/seattle.jpg',
        caption: 'Seattle is so cool!'
      },
      {
        url: '/images/experiences/amazon/mountain.jpg',
        caption: 'Mount Rainier view from my apartment'
      }
    ],
  }
};

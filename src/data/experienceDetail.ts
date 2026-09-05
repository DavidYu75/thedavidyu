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
    technologies: ['Java', 'Server-Driven UI', 'REST APIs', 'iOS', 'Android', 'Integration Testing'],
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
      'Extended a production AWS Lambda from one supported system to three, automating health reporting for two experimentation and content-optimization platforms that previously relied on manual collection',
      'Built 7 priority-zero metrics spanning workflow success rate, execution volume, and P50/P90/P99 batch runtime',
      'Parameterized every metric by reporting window and end date so one implementation feeds both the weekly and the monthly team health review',
      'Refactored a monolithic Lambda into shared, unit-testable functions so all 7 metrics run through a single abstracted path',
      'Validated output against manually collected baselines before merge'
    ],
    technologies: ['Java', 'AWS Lambda', 'CloudWatch', 'S3', 'Cloud Infrastructure', 'CI/CD Pipelines'],
    achievements: [
      'Took two platforms from zero automated health coverage to recurring weekly and monthly reporting',
      'Closed a reporting gap on a system that exposed no direct telemetry, deriving execution volume by modeling hourly workflow runs across 15 marketplaces at 360 runs/day',
      'Delivered all 7 priority-zero metrics through one abstracted path after breaking up the original monolithic Lambda',
      'Merged after 7 rounds of review with the test suite green and output checked against manual baselines',
      'Owned the work end to end, from the initial reporting gap through production deployment'
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

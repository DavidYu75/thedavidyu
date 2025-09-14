export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  logo: string;
  slug: string;
}
  
export const experiences: Experience[] = [
  {
    title: 'Automation Software Developer Co-op @ Citizens Financial Group',
    company: 'Citizens Financial Group',
    period: 'Jul 2025 - Dec 2025',
    description:
      "Enterprise Automation Platforms, Governance, and Emerging Tech ->\nSpearheaded enterprise automation solutions that reduced deployment times while leading cross-functional GenAI initiatives to drive responsible AI adoption across the organization.",
    logo: '/images/companies/citizens_logo.jpeg',
    slug: 'citizens-bank'
  },
  {
    title: 'Software Engineer @ Generate Product Development Studio',
    company: 'Generate Product Development Studio',
    period: 'Jan 2025 - Apr 2025',
    description:
      "Architected and built a scalable restaurant analytics platform with multiple microservices to optimize business operations through data-driven insights.",
    logo: '/images/companies/generate_logo.jpeg',
    slug: 'generate-product-development'
  },
  {
    title: 'Machine Learning Engineer @ Outlier AI',
    company: 'Outlier AI',
    period: 'Sep 2024 - Dec 2024',
    description:
      "Engineered robust evaluation systems and testing frameworks for large language models, dramatically improving response accuracy, and reducing development cycles.",
    logo: '/images/companies/outlier_logo.jpeg',
    slug: 'outlier'
  },
  {
    title: 'Software Engineer Intern @ Amazon',
    company: 'Amazon',
    period: 'May 2024 - Aug 2024',
    description:
      "Growth-Adjusted Composite Contributions Profits (GCCP) ->\nDeveloped high-performance monitoring solutions for critical infrastructure while significantly reducing costs and improving system reliability.",
    logo: '/images/companies/amazon_logo.jpeg',
    slug: 'amazon'
  },
];

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
    title: 'Incoming Automation Software Developer @ Citizens Bank',
    company: 'Citizens Bank',
    period: 'Jul 2025 - Dec 2025',
    description:
      "Incoming Summer and Fall 2025",
    logo: '/images/companies/citizens_logo.jpeg',
    slug: 'citizens-bank'
  },
  {
    title: 'Software Engineer @ Generate Product Development',
    company: 'Generate Product Development',
    period: 'Jan 2025 - Apr 2025',
    description:
      "As part of Generate Product Development, I architected and built a scalable restaurant analytics platform with multiple microservices to optimize business operations through data-driven insights.",
    logo: '/images/companies/generate_logo.jpeg',
    slug: 'generate-product-development'
  },
  {
    title: 'Machine Learning Engineer @ Outlier',
    company: 'Outlier',
    period: 'Sep 2024 - Dec 2024',
    description:
      "Some of my work at Outlier included engineering robust evaluation systems and testing frameworks for large language models, dramatically improving response accuracy, and reducing development cycles.",
    logo: '/images/companies/outlier_logo.jpeg',
    slug: 'outlier'
  },
  {
    title: 'Software Engineer Intern @ Amazon',
    company: 'Amazon',
    period: 'May 2024 - Aug 2024',
    description:
      "As an intern for Amazon, I developed high-performance monitoring solutions for critical infrastructure while significantly reducing costs and improving system reliability.",
    logo: '/images/companies/amazon_logo.jpeg',
    slug: 'amazon'
  },
];

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
    title: 'Software Engineer Intern @ LinkedIn',
    company: 'LinkedIn',
    period: 'May 2026 - Aug 2026',
    description: "👔 Incoming Summer 2026",
    logo: '/images/companies/linkedin_logo.jpeg',
    slug: 'linkedin'
  },
  {
    title: 'Automation Software Developer Co-op @ Citizens Financial Group',
    company: 'Citizens Financial Group',
    period: 'Jul 2025 - Dec 2025',
    description:
      "🍵 Enterprise Automation Platforms, Governance, and Emerging Tech",
    logo: '/images/companies/citizens_logo.jpeg',
    slug: 'citizens-bank'
  },
  {
    title: 'Software Engineer @ Generate Product Development Studio',
    company: 'Generate Product Development Studio',
    period: 'Jan 2025 - Apr 2025',
    description:
      "🍽️ PlateMate, a mobile application that focuses on what truly matters to diners - the quality of individual dishes",
    logo: '/images/companies/generate_logo.jpeg',
    slug: 'generate-product-development'
  },
  {
    title: 'Machine Learning Engineer @ Outlier AI',
    company: 'Outlier AI',
    period: 'Sep 2024 - Dec 2024',
    description:
      "🤖 Engineered robust evaluation systems and testing frameworks for large language models",
    logo: '/images/companies/outlier_logo.jpeg',
    slug: 'outlier'
  },
  {
    title: 'Software Engineer Intern @ Amazon',
    company: 'Amazon',
    period: 'May 2024 - Aug 2024',
    description:
      "☕️ Growth-Adjusted Composite Contributions Profits (GCCP)",
    logo: '/images/companies/amazon_logo.jpeg',
    slug: 'amazon'
  },
];

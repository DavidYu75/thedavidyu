export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
  }
  
  export const projects: Project[] = [
    {
      id: '01',
      title: 'Crypto Screener Application',
      description:
        'A comprehensive cryptocurrency tracking and analysis tool that provides real-time data, customizable alerts, and detailed market insights for crypto traders and investors.',
      image: '/placeholder-1.jpg',
    },
    {
      id: '02',
      title: 'E-commerce Website Template',
      description:
        'A modern e-commerce solution with a focus on performance and user experience. Features include product filtering, cart management, and responsive design.',
      image: '/placeholder-2.jpg',
    },
    {
      id: '03',
      title: 'Blog Website Template',
      description:
        'A clean and minimal blog platform with markdown support, categorization, and built-in SEO optimization. Perfect for content creators and writers.',
      image: '/placeholder-3.jpg',
    },
  ];
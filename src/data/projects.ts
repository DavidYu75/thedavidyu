export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  link: string;
}
  
export const projects: Project[] = [
  {
    id: '01',
    title: 'IntReview',
    description:
      'An AI-powered interview preparation platform that provides real-time feedback on verbal and non-verbal communication using computer vision and speech analysis.',
    image: '/images/projects/intreview/intreviewbrand.png',
    slug: 'intreview',
    link: '/projects/intreview',
  },
  {
    id: '02',
    title: 'Real-Time AI Business Intelligence',
    description: 'An AI-powered business intelligence platform that converts natural language queries into SQL, delivering instant data insights through interactive visualizations.',
    slug: 'real-time-ai-business-intelligence',
    link: '/projects/real-time-ai-business-intelligence',
    image: "/images/inprogress.png"
  },
  {
    id: '03',
    title: 'Black-Scholes Options Pricing Model',
    description:
      'A sophisticated financial tool implementing the Black-Scholes mathematical model to accurately price options contracts and analyze market volatility.',
    image: '/images/projects/black-scholes/mainmenu.png',
    slug: 'black-scholes-model',
    link: '/projects/black-scholes-model',
  },
  {
    id: '04',
    title: 'Classify',
    description:
      'A machine learning application that intelligently categorizes Spotify playlists into themed collections to enhance music discovery through audio feature analysis.',
    image: '/images/projects/classify/classifybrand.png',
    slug: 'classify',
    link: '/projects/classify',
  },
  {
    id: '05',
    title: 'PlateMate',
    description:
      'A mobile application that revolutionizes restaurant reviews by focusing on what truly matters to diners - the quality of individual dishes.',
    image: '/images/projects/platemate/platematebrand.jpeg',
    slug: 'platemate',
    link: '/projects/platemate',
  },
];

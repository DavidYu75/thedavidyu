export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}
  
export const projects: Project[] = [
  {
    id: '01',
    title: 'Black-Scholes Model',
    description:
      'A sophisticated financial tool implementing the Black-Scholes mathematical model to accurately price options contracts and analyze market volatility.',
    image: '/images/inprogress.png',
    link: '#',
  },
  {
    id: '02',
    title: 'IntReview',
    description:
      'An AI-powered interview preparation platform that provides real-time feedback on verbal and non-verbal communication using computer vision and speech analysis.',
    image: '/images/intreview.png',
    link: 'https://github.com/DavidYu75/intreview',
  },
  {
    id: '03',
    title: 'Classify',
    description:
      'A machine learning application that intelligently categorizes Spotify playlists into themed collections to enhance music discovery through audio feature analysis.',
    image: '/images/classify.png',
    link: "https://github.com/thaninbew/classify",
  },
  {
    id: '04',
    title: 'PlateMate',
    description:
      'A restaurant analytics platform leveraging data-driven insights to help owners optimize menu offerings, pricing, and inventory management for increased profitability.',
    image: '/images/inprogress.png',
    link: "https://github.com/GenerateNU/platemate",
  },
];

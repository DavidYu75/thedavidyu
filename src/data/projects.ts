export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
  }
  
  export const projects: Project[] = [
    {
      id: '01',
      title: 'Black-Scholes Model',
      description:
        'A sophisticated financial tool implementing the Black-Scholes mathematical model to accurately price options contracts and analyze market volatility.',
      image: '/images/inprogress.png',
    },
    {
      id: '02',
      title: 'IntReview',
      description:
        'An AI-powered interview preparation platform that provides real-time feedback on verbal and non-verbal communication using computer vision and speech analysis.',
      image: '/images/intreview.png',
    },
    {
      id: '03',
      title: 'Classify',
      description:
        'A machine learning application that intelligently categorizes Spotify playlists into themed collections to enhance music discovery through audio feature analysis.',
      image: '/images/classify.png',
    },
  ];
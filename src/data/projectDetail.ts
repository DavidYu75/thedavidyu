export interface Media {
  type: 'image' | 'video' | 'gif';
  url: string;
  caption?: string;
  thumbnail?: string;
}

export interface ProjectDetail {
  overview: string;
  features: string[];
  technologies: string[];
  challenges: string[];
  media: Media[];
  githubUrl?: string;
  liveUrl?: string;
}

export type ProjectDetailMap = {
  [slug: string]: ProjectDetail;
};

export const projectDetails: ProjectDetailMap = {
  'black-scholes-model': {
    overview: 'The Black-Scholes Model is a sophisticated financial tool that implements the Black-Scholes mathematical model to accurately price options contracts and analyze market volatility. This project combines advanced financial algorithms with intuitive data visualization to help traders and analysts make informed decisions.',
    features: [
      'Real-time options pricing calculator using the Black-Scholes equation',
      'Interactive data visualization dashboard for market analysis',
      'Custom parameter inputs for detailed sensitivity analysis',
      'Historical volatility tracking and prediction',
      'API integration for real-time market data'
    ],
    technologies: [
      'Python',
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Django',
      'PostgreSQL',
      'React',
      'TailwindCSS'
    ],
    challenges: [
      'Implementing complex mathematical models with high accuracy',
      'Designing an intuitive interface for complex financial concepts',
      'Optimizing data processing for large financial datasets',
      'Ensuring real-time responsiveness with heavy calculations'
    ],
    media: [],
    githubUrl: '#'
  },
  
  'intreview': {
    overview: 'IntReview is an AI-powered interview preparation platform that provides real-time feedback on verbal and non-verbal communication using computer vision and speech analysis. The application helps job seekers improve their interview skills through objective feedback on their performance.',
    features: [
      'Real-time video and audio analysis during mock interviews',
      'Detailed feedback on verbal communication (pace, clarity, filler words)',
      'Non-verbal cue detection (eye contact, posture, facial expressions)',
      'Post-inerview detailed analysis with metrics, key moments, and personalized recommendations',
      'Secure user authentication and session management for tracking progress over time',
      'Comprehensive interview transcript generation with timestamps and speech metrics',
      'Interactive dashboard with visual performance metrics and historical session data',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'WebSocket',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'MongoDB',
      'JWT Authentication',
      'OpenCV',
      'AssemblyAI',
      'NumPy'
    ],
    challenges: [
      'Real-time video processing: Implemented efficient WebSocket communication and optimized OpenCV processing with lightweight face tracking algorithms',
      'Speech analysis latency: Split the analysis to perform visual feedback in real-time while conducting deeper speech analysis post-interview',
      'Metric Visualization: Created intuitive visualizations with color-coding and context-appropriate scales (e.g., WPM gauge showing ideal speaking pace)',
    ],
    media: [
      {
        type: 'image',
        url: '/images/projects/intreview/dashboard.png',
        caption: 'User dashboard displaying interview analytics'
      },
      {
        type: 'image',
        url: '/images/projects/intreview/dashboard2.png',
        caption: 'Dashboard continued'
      },
      {
        type: 'gif',
        url: '/images/projects/intreview/demo.gif',
        caption: 'IntReview in action',
      }
    ],
    githubUrl: 'https://github.com/DavidYu75/intreview'
  },
  
  'classify': {
    overview: 'Classify is a machine learning application that intelligently categorizes Spotify playlists into themed collections, enhancing music discovery through advanced audio feature analysis. This project combines music data analysis with intuitive user interfaces to provide a unique music organization experience.',
    features: [
      'Automated playlist categorization based on audio features',
      'Music recommendation engine using similarity metrics',
      'Custom theme creation for personalized organization',
      'Seamless Spotify integration',
      'Visualizations of audio characteristics',
      'Playlist sharing and collaboration tools'
    ],
    technologies: [
      'Python',
      'Flask',
      'Scikit-learn',
      'React',
      'Node.js',
      'OpenAI API',
      'Spotify Web API',
      'OAuth 2.0'
    ],
    challenges: [
      'Developing effective clustering algorithms for audio features',
      'Creating meaningful category definitions from raw audio data',
      'Implementing secure OAuth for Spotify account access',
      'Optimizing for performance with large music libraries'
    ],
    media: [
      {
        type: 'image',
        url: '/images/projects/classify/categories.png',
        caption: 'Category view showing playlist organization'
      },
      {
        type: 'image',
        url: '/images/projects/classify/analysis.png',
        caption: 'Audio feature analysis visualization'
      },
      {
        type: 'video',
        url: '/videos/projects/classify/walkthrough.mp4',
        caption: 'Application walkthrough and feature showcase',
        thumbnail: '/images/projects/classify/walkthrough-thumbnail.jpg'
      }
    ],
    githubUrl: 'https://github.com/thaninbew/classify'
  },

  'platemate': {
    overview: 'PlateMate is a restaurant analytics platform leveraging data-driven insights to help owners optimize menu offerings, pricing, and inventory management for increased profitability. This comprehensive solution transforms raw restaurant data into actionable business intelligence.',
    features: [
      'Sales analytics dashboard with trend identification',
      'Menu performance metrics and optimization suggestions',
      'Inventory management and waste reduction tools',
      'Customer preference analysis',
      'Pricing strategy recommendations',
      'Multi-location data aggregation and comparison'
    ],
    technologies: [
      'Go',
      'Fiber',
      'MongoDB',
      'React',
      'Redux',
      'D3.js',
      'Docker',
      'AWS',
      'JWT Authentication'
    ],
    challenges: [
      'Building scalable architecture for multi-restaurant support',
      'Implementing secure role-based access control',
      'Creating meaningful data visualizations for business metrics',
      'Developing accurate prediction models for inventory management'
    ],
    media: [
      {
        type: 'image',
        url: '/images/projects/platemate/dashboard.png',
        caption: 'Analytics dashboard overview'
      },
      {
        type: 'video',
        url: '/videos/projects/platemate/demo.mp4',
        caption: 'Platform demonstration with key features',
        thumbnail: '/images/projects/platemate/demo-thumbnail.jpg'
      }
    ],
    githubUrl: 'https://github.com/GenerateNU/platemate'
  }
};

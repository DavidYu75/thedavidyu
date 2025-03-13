export interface ProjectDetail {
    overview: string;
    features: string[];
    technologies: string[];
    challenges: string[];
    screenshots: string[];
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
      screenshots: [
        '/images/projects/black-scholes/dashboard.png',
        '/images/projects/black-scholes/calculator.png',
        '/images/projects/black-scholes/graph.png'
      ],
      githubUrl: '#'
    },
    
    'intreview': {
      overview: 'IntReview is an AI-powered interview preparation platform that provides real-time feedback on verbal and non-verbal communication using computer vision and speech analysis. The application helps job seekers improve their interview skills through objective feedback on their performance.',
      features: [
        'Real-time video and audio analysis during mock interviews',
        'Detailed feedback on verbal communication (pace, clarity, filler words)',
        'Non-verbal cue detection (eye contact, posture, facial expressions)',
        'Custom interview question sets for different industries',
        'Progress tracking and improvement analytics',
        'Secure session recording and playback'
      ],
      technologies: [
        'Python',
        'FastAPI',
        'WebSocket',
        'React',
        'TypeScript',
        'MongoDB',
        'OpenCV',
        'AssemblyAI',
        'TensorFlow'
      ],
      challenges: [
        'Achieving low-latency video and audio processing',
        'Implementing accurate facial and expression recognition',
        'Developing meaningful metrics for interview performance',
        'Creating a smooth, intuitive user experience with complex backend processes'
      ],
      screenshots: [
        '/images/projects/intreview/dashboard.png',
        '/images/projects/intreview/feedback.png',
        '/images/projects/intreview/analytics.png'
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
      screenshots: [
        '/images/projects/classify/categories.png',
        '/images/projects/classify/analysis.png',
        '/images/projects/classify/recommendations.png'
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
      screenshots: [
        '/images/projects/platemate/dashboard.png',
        '/images/projects/platemate/inventory.png',
        '/images/projects/platemate/analytics.png'
      ],
      githubUrl: 'https://github.com/GenerateNU/platemate'
    }
};
  
'use client';

import { motion } from 'framer-motion';

interface Experience {
  title: string;
  period: string;
  description: string;
}

const Experience = () => {

  const experiences: Experience[] = [
    {
      title: 'Lead Software Engineer at Google',
      period: 'Nov 2019 - Present',
      description: 'As a Senior Software Engineer at Google, I played a pivotal role in developing innovative solutions for Google\'s core search algorithms. Collaborating with a dynamic team of engineers, I contributed to the enhancement of search accuracy and efficiency, optimizing user experiences for millions of users worldwide.'
    },
    {
      title: 'Software Engineer at Youtube',
      period: 'Jan 2017 - Oct 2019',
      description: 'At Youtube, I served as a Software Engineer, focusing on the design and implementation of backend systems for the social media giant\'s dynamic platform. Working on projects that involved large scale data processing and user engagement features.'
    },
    {
      title: 'Junior Software Engineer at Apple',
      period: 'Jan 2016 - Dec 2017',
      description: 'During my tenure at Apple, I held the role of Software Architect, where I played a key role in shaping the architecture of mission-critical software projects. Responsible for designing scalable and efficient systems.'
    }
  ];

  return (
    <section id="experience" className="relative bg-[#2E4059]">
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-0"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, rgb(46, 64, 89) 0%, rgba(46, 64, 89, 0) 100%)'
        }}
      />
      <div className="relative z-10 pt-5 pb-60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-12">My Experience</h2>
          </motion.div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-[#415A77]"
              >
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-[#778DA9]" />
                
                <div className="ml-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    <span className="mt-1 sm:mt-0 text-[#778DA9]">{exp.period}</span>
                  </div>
                  <p className="mt-4 text-[#778DA9] text-lg leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 right-0 h-60 z-0"
        style={{ 
          backgroundImage: 'linear-gradient(to top, rgb(13, 27, 42) 0%, rgba(46, 64, 89, 0) 100%)'
        }}
      />
    </section>
  );
};

export default Experience;
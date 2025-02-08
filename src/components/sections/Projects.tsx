'use client';

import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      id: '01',
      title: 'Crypto Screener Application',
      description: 'A comprehensive cryptocurrency tracking and analysis tool that provides real-time data, customizable alerts, and detailed market insights for crypto traders and investors.',
      image: '/placeholder-1.jpg',
    },
    {
      id: '02',
      title: 'E-commerce Website Template',
      description: 'A modern e-commerce solution with a focus on performance and user experience. Features include product filtering, cart management, and responsive design.',
      image: '/placeholder-2.jpg',
    },
    {
      id: '03',
      title: 'Blog Website Template',
      description: 'A clean and minimal blog platform with markdown support, categorization, and built-in SEO optimization. Perfect for content creators and writers.',
      image: '/placeholder-3.jpg',
    },
  ];

  return (
    <section id="projects" className="relative bg-[#0D1B2A]">
      <div className="relative z-10 pt-5 pb-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">My Projects</h2>
          </motion.div>
          
          <div className="mt-12 space-y-20">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-2"
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="text-[#778DA9] text-lg font-semibold">{project.id}</span>
                  <h3 className="mt-2 text-2xl font-bold text-white">{project.title}</h3>
                  <p className="mt-4 text-[#778DA9] text-lg">{project.description}</p>
                  <motion.div 
                    className="mt-6"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href="#" className="text-white hover:text-[#778DA9] inline-flex items-center space-x-2">
                      <span>View Project</span>
                      <span>→</span>
                    </a>
                  </motion.div>
                </div>
                <div className={`bg-[#1B263B] rounded-lg p-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="aspect-[16/9] w-full rounded-lg bg-[#415A77] overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#415A77] to-[#778DA9]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 right-0 h-64 z-0"
        style={{ 
          background: 'linear-gradient(180deg, #0D1B2A 0%, #415A77 100%)'
        }}
      />
    </section>
  );
};

export default Projects;
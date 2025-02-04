'use client';

import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="typewriter text-4xl font-bold tracking-tight sm:text-6xl">
              Hello, I&#39;m David
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Full Stack Developer
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Based in New York City
            </p>
            <p className="mt-6 text-lg text-gray-600">
              I&#39;m passionate about building exceptional digital experiences that live at the 
              intersection of design and technology.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#contact"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Get in touch
              </a>
              <a
                href="#projects"
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                View Projects
              </a>
            </div>
          </motion.div>
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="aspect-square w-full rounded-2xl bg-gray-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
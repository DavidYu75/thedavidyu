'use client';

import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#0D1B2A] pt-24 sm:pt-32">
      {/* Gradient overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0D1B2A] to-transparent z-10"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="typewriter text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Hey, I&#39;m David 🧑🏻‍💻
            </h1>
            <p className="mt-4 text-xl text-[#778DA9]">
              Full Stack Developer
            </p>
            <p className="mt-4 text-lg text-[#778DA9]">
              Based in New York City
            </p>
            <p className="mt-6 text-lg text-[#778DA9]">
              I&#39;m passionate about building exceptional digital experiences that live at the 
              intersection of design and technology.
            </p>
            <div className="mt-8 flex gap-4">
              <motion.a
                href="#contact"
                className="rounded-md bg-[#415A77] px-4 py-2 text-sm font-semibold text-white hover:bg-[#778DA9] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in touch
              </motion.a>
              <motion.a
                href="#projects"
                className="rounded-md border border-[#415A77] px-4 py-2 text-sm font-semibold text-[#778DA9] hover:bg-[#1B263B] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
              </motion.a>
            </div>
          </motion.div>
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="aspect-square w-full rounded-2xl bg-[#1B263B] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#415A77] to-transparent opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0D1B2A] pointer-events-none"></div>
    </section>
  );
};

export default Hero;
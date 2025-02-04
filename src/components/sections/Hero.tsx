'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const Typewriter = () => {
  const words = useMemo(() => ["Full Stack Developer", "AI/ML Engineer", "Coding Nerd"], []);
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, speed);
    } else {
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, speed);
    }

    if (!isDeleting && text === currentWord) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex, speed, words]);

  useEffect(() => {
    setSpeed(isDeleting ? 50 : 100);
  }, [isDeleting]);

  return <span>{text}</span>;
};

const Hero = () => {
  return (
    <section className="relative min-h-screen">
      {/* Top gradient */}
      <div 
        className="absolute top-0 left-0 right-0 h-64 z-0"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(13,27,42,0))' }}
      />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="typewriter text-5xl font-bold tracking-tight text-white sm:text-6xl min-h-[4rem]">
              Hey, I&#39;m David 🧑🏻‍💻
            </h1>
            <p className="mt-4 text-xl text-[#94A3B8] min-h-[2rem]">
              <Typewriter />
            </p>
            <p className="mt-4 text-lg text-[#94A3B8]">
              Based in New York City
            </p>
            <p className="mt-6 text-lg text-[#94A3B8] max-w-xl">
              I&#39;m passionate about building exceptional digital experiences that live at the 
              intersection of design and technology.
            </p>
            <div className="mt-8 flex gap-4">
              <motion.a
                href="#contact"
                className="rounded-md bg-[#1E293B] px-6 py-3 text-sm font-medium text-white hover:bg-[#334155] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in touch
              </motion.a>
              <motion.a
                href="#projects"
                className="rounded-md border border-[#1E293B] px-6 py-3 text-sm font-medium text-[#94A3B8] hover:bg-[#1E293B] transition-colors"
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
              className="aspect-square w-full rounded-2xl bg-[#1E293B] overflow-hidden"
            >
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundImage: 'linear-gradient(145deg, rgba(65,90,119,0.4) 0%, rgba(27,38,59,0) 100%)'
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 z-0"
        style={{ 
          backgroundImage: 'linear-gradient(to top, #0D1B2A 0%, rgba(13,27,42,0) 100%)'
        }}
      />
    </section>
  );
};

export default Hero;
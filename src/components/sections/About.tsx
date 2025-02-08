'use client';

import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="relative bg-[#1B263B] pt-24 pb-60">
      {/* Top gradient to blend with Hero section */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-0"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, #0D1B2A, rgba(27,38,59,0))'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 md:grid-cols-2"
        >
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white">About Me</h2>
            <div className="space-y-4 text-lg text-[#778DA9]">
              <p>
                I&#39;m a software engineer passionate about building elegant solutions
                to complex problems. With a strong foundation in full-stack development,
                I specialize in creating performant and user-friendly web applications.
              </p>
              <p>
                My journey in tech has led me through various roles where I&#39;ve had
                the opportunity to work with diverse teams and technologies. I&#39;m
                particularly interested in web performance optimization and creating
                accessible user interfaces.
              </p>
              <p>
                When I&#39;m not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge
                through technical writing and mentoring.
              </p>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 rounded-xl bg-[#0D1B2A] p-6 shadow-lg"
          >
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'React',
                  'TypeScript',
                  'Node.js',
                  'Next.js',
                  'Tailwind CSS',
                  'Python',
                  'Git',
                  'AWS',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#415A77] px-3 py-1 text-sm text-[#FBF9FF]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">Interests</h3>
              <ul className="list-inside list-disc space-y-2 text-[#778DA9]">
                <li>Web Performance Optimization</li>
                <li>User Interface Design</li>
                <li>Accessibility</li>
                <li>Open Source Development</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient to blend with next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-0"
        style={{ 
          backgroundImage: 'linear-gradient(to top, #2E4059, rgba(27,38,59,0))'
        }}
      />
    </section>
  );
}

export default About;
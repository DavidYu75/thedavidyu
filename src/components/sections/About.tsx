import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 md:grid-cols-2"
        >
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight">About Me</h2>
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                I&#39m a software engineer passionate about building elegant solutions
                to complex problems. With a strong foundation in full-stack development,
                I specialize in creating performant and user-friendly web applications.
              </p>
              <p>
                My journey in tech has led me through various roles where I&#39ve had
                the opportunity to work with diverse teams and technologies. I&#39m
                particularly interested in web performance optimization and creating
                accessible user interfaces.
              </p>
              <p>
                When I&#39m not coding, you can find me exploring new technologies,
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
            className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
          >
            <div>
              <h3 className="mb-4 text-xl font-semibold">Skills & Technologies</h3>
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
                    className="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 text-xl font-semibold">Interests</h3>
              <ul className="list-inside list-disc space-y-2 text-gray-600">
                <li>Web Performance Optimization</li>
                <li>User Interface Design</li>
                <li>Accessibility</li>
                <li>Open Source Development</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
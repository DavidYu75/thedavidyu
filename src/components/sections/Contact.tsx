'use client';

import { motion } from 'framer-motion';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <section id="contact" className="relative py-24 bg-[#415A77]">
      <div className="relative z-10 pt-0 pb-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-white">Let&#39;s talk for</h2>
                <h2 className="text-3xl font-bold text-[#FBF9FF]">Something special</h2>
              </div>
              <p className="text-lg text-[#FBF9FF]">
                I seek to push the limits of creativity to create high-engaging, user-friendly, 
                and memorable interactive experiences.
              </p>
              <div className="space-y-4">
                <a 
                  href="mailto:davyu735@gmail.com"
                  className="block text-white hover:text-[#FBF9FF] transition-colors"
                >
                  davyu735@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-[#1B263B] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#778DA9] placeholder:text-[#778DA9]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-[#1B263B] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#778DA9] placeholder:text-[#778DA9]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Your website (If exists)"
                    className="w-full px-4 py-3 bg-[#1B263B] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#778DA9] placeholder:text-[#778DA9]"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="How can I help?"
                    rows={4}
                    className="w-full px-4 py-3 bg-[#1B263B] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#778DA9] placeholder:text-[#778DA9] resize-none"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-8 py-4 bg-[#1B263B] text-white rounded-lg font-semibold hover:bg-[#0D1B2A] transition-colors"
                >
                  Get In Touch
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
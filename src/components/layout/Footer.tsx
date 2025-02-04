'use client';

const Footer = () => {
  return (
    <footer className="bg-[#1B263B] py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-[#778DA9]">
            © {new Date().getFullYear()} David Yu. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <a
              href="mailto:davyu735@gmail.com"
              className="text-[#778DA9] hover:text-white transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/davidyu75"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#778DA9] hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/david-t-yu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#778DA9] hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
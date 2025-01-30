export function Footer() {
    return (
      <footer className="mt-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-6 sm:flex-row sm:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} David Yu. All rights reserved.
            </p>
            <div className="flex space-x-6">
            <a
                href="mailto:davyu735@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                Email
              </a>
              <a
                href="https://github.com/davidyu75"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/david-t-yu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
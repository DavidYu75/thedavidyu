import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1B2A] overflow-x-hidden">
      <NavBar />
      <main className="relative z-0">
        <Hero />
        <Intro />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
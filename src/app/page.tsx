import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { NavBar } from '@/components/layout/NavBar'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
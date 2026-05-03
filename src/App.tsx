import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar, Hero, Footer } from './components/layout'
import { Philosophy } from './components/Philosophy'
import { Timeline } from './components/Timeline'
import { Bookshelf } from './components/Bookshelf'
import { TimelineItemData } from './components/TimelineItem'
import { BookData } from './components/BookCard'
import { RacingSection } from './pages/RacingPage'
import experienceData from './data/experience.json'
import booksData from './data/books.json'

function App() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [location.hash])

  return (
    <div className="min-h-screen bg-charcoal text-white">
      <Navbar />
      <Hero />
      <Philosophy />
      <Timeline items={experienceData as TimelineItemData[]} />
      <Bookshelf books={booksData as BookData[]} />
      <RacingSection />
      <Footer />
    </div>
  )
}

export default App

import { Navbar, Hero, Footer } from './components/layout'
import { Timeline } from './components/Timeline'
import { BentoGrid, HobbyItem } from './components/BentoGrid'
import { Bookshelf } from './components/Bookshelf'
import { TimelineItemData } from './components/TimelineItem'
import { BookData } from './components/BookCard'
import experienceData from './data/experience.json'
import hobbiesData from './data/hobbies.json'
import booksData from './data/books.json'

function App() {
  return (
    <div className="min-h-screen bg-charcoal text-white">
      <Navbar />
      <Hero />
      <Timeline items={experienceData as TimelineItemData[]} />
      <Bookshelf books={booksData as BookData[]} />
      <BentoGrid items={hobbiesData as HobbyItem[]} />
      <Footer />
    </div>
  )
}

export default App

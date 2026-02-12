import { Navbar, Hero, Footer } from './components/layout'
import { Philosophy } from './components/Philosophy'
import { Timeline } from './components/Timeline'
import { BentoGrid, HobbyItem, MediaItem } from './components/BentoGrid'
import { Bookshelf } from './components/Bookshelf'
import { TimelineItemData } from './components/TimelineItem'
import { BookData } from './components/BookCard'
import experienceData from './data/experience.json'
import hobbiesData from './data/hobbies.json'
import booksData from './data/books.json'
import moviesData from './data/movies.json'
import booksMediaData from './data/books.media.json'
import musicData from './data/music.json'

function App() {
  return (
    <div className="min-h-screen bg-charcoal text-white">
      <Navbar />
      <Hero />
      <Philosophy />
      <Timeline items={experienceData as TimelineItemData[]} />
      <Bookshelf books={booksData as BookData[]} />
      <BentoGrid
        items={hobbiesData as HobbyItem[]}
        movies={moviesData as MediaItem[]}
        books={booksMediaData as MediaItem[]}
        music={musicData as MediaItem[]}
      />
      <Footer />
    </div>
  )
}

export default App


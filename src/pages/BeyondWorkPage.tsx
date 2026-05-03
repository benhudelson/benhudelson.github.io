import { Navbar, Footer } from '../components/layout'
import { BentoGrid, HobbyItem, MediaItem } from '../components/BentoGrid'
import hobbiesData from '../data/hobbies.json'
import moviesData from '../data/movies.json'
import booksMediaData from '../data/books.media.json'
import musicData from '../data/music.json'

export function BeyondWorkPage() {
    return (
        <div className="min-h-screen bg-charcoal text-white">
            <Navbar />
            <main className="pt-16">
                <BentoGrid
                    items={hobbiesData as HobbyItem[]}
                    movies={moviesData as MediaItem[]}
                    books={booksMediaData as MediaItem[]}
                    music={musicData as MediaItem[]}
                />
            </main>
            <Footer />
        </div>
    )
}

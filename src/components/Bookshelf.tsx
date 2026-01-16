import { Section } from './layout'
import { BookCard, BookData } from './BookCard'

interface BookshelfProps {
  books: BookData[]
}

export function Bookshelf({ books }: BookshelfProps) {
  const featuredBooks = books.filter(book => book.featured)
  const libraryBooks = books.filter(book => !book.featured)

  return (
    <Section id="bookshelf">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
        The Bookshelf
      </h2>
      <p className="text-white/60 mb-12 max-w-2xl">
        Books that shaped my thinking on leadership, strategy, and life.
      </p>

      {/* Featured books - 3D cards */}
      {featuredBooks.length > 0 && (
        <div className="mb-16">
          <h3 className="text-lg font-medium text-neon mb-6">Featured Reads</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} featured />
            ))}
          </div>
        </div>
      )}

      {/* Library grid */}
      {libraryBooks.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-white/50 mb-6">The Library</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {libraryBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}

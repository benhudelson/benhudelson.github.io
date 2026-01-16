import { useState } from 'react'
import { motion } from 'framer-motion'

export interface BookData {
  id: string
  title: string
  author: string
  cover: string
  coverOverride?: string  // Local image path to override the default cover
  quote?: string
  why?: string
  featured?: boolean
}

interface BookCardProps {
  book: BookData
  featured?: boolean
}

export function BookCard({ book, featured = false }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const coverSrc = book.coverOverride || book.cover

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          animate={{
            rotateY: isHovered ? 15 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative bg-navy rounded-xl overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Book cover */}
          <div className="aspect-[2/3] relative">
            <img
              src={coverSrc}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: isHovered ? '100%' : '-100%' }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* Info overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent p-6 flex flex-col justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-heading font-bold text-white mb-1">
              {book.title}
            </h3>
            <p className="text-electric text-sm mb-3">{book.author}</p>
            {book.quote && (
              <blockquote className="text-white/70 text-sm italic border-l-2 border-neon pl-3 mb-3">
                "{book.quote}"
              </blockquote>
            )}
            {book.why && (
              <p className="text-white/60 text-xs">
                <span className="text-neon font-medium">Why it matters:</span> {book.why}
              </p>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  // Simple card for library grid
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group cursor-pointer"
    >
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-navy shadow-lg">
        <img
          src={coverSrc}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="mt-2 text-center">
        <p className="text-white text-sm font-medium truncate">{book.title}</p>
        <p className="text-white/50 text-xs truncate">{book.author}</p>
      </div>
    </motion.div>
  )
}

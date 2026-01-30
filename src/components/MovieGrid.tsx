import { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

export interface MovieItem {
    id: string
    title: string
    poster: string
    quote: string
    blurb: string
}

interface MovieGridProps {
    movies: MovieItem[]
}

// Helper to resolve asset paths with base URL
const getAssetPath = (path: string) => {
    const base = import.meta.env.BASE_URL || '/'
    if (path.startsWith('http') || path.startsWith(base)) return path
    return `${base}${path.replace(/^\//, '')}`
}

// Parse markdown-style links in text
const parseLinks = (text: string) => {
    const parts: (string | ReactNode)[] = []
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index))
        }
        parts.push(
            <a
                key={match.index}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon hover:text-white transition-colors underline"
            >
                {match[1]}
            </a>
        )
        lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex))
    }

    return parts
}

function MovieCard({ movie }: { movie: MovieItem }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-xl bg-navy cursor-pointer aspect-[2/3]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Movie poster */}
            <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0"
            >
                <img
                    src={getAssetPath(movie.poster)}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Default overlay with title */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent flex flex-col justify-end p-4"
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
                <h4 className="text-lg font-heading font-bold text-white">
                    {movie.title}
                </h4>
            </motion.div>

            {/* Hover overlay with quote and blurb */}
            <motion.div
                className="absolute inset-0 bg-charcoal/95 flex flex-col justify-center p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <h4 className="text-lg font-heading font-bold text-neon mb-3">
                    {movie.title}
                </h4>
                <blockquote className="text-white/90 text-sm italic border-l-2 border-electric pl-3 mb-4">
                    "{movie.quote}"
                </blockquote>
                <p className="text-white/70 text-sm leading-relaxed">
                    {parseLinks(movie.blurb)}
                </p>
            </motion.div>
        </motion.div>
    )
}

export function MovieGrid({ movies }: MovieGridProps) {
    if (movies.length === 0) return null

    return (
        <div className="mt-16">
            <h3 className="text-lg font-medium text-neon mb-6">Favorite Movies & Books</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

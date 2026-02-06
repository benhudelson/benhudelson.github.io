import { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

export interface MediaItem {
    id: string
    title: string
    artist?: string // Optional artist field for music
    poster: string
    quote: string
    blurb: string
}

export type MediaType = 'movies' | 'books' | 'music'

interface MediaGridProps {
    items: MediaItem[]
    type: MediaType
    title: string
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

// Get aspect ratio class based on media type
const getAspectRatio = (type: MediaType) => {
    switch (type) {
        case 'music':
            return 'aspect-square' // 1:1 for album art
        case 'movies':
        case 'books':
        default:
            return 'aspect-[2/3]' // Movie poster / book cover ratio
    }
}

// Get grid columns based on media type
const getGridCols = (type: MediaType) => {
    switch (type) {
        case 'music':
            return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
        case 'movies':
        case 'books':
        default:
            return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
    }
}

function MediaCard({ item, type }: { item: MediaItem; type: MediaType }) {
    const [isHovered, setIsHovered] = useState(false)
    const aspectRatio = getAspectRatio(type)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden rounded-xl bg-navy cursor-pointer ${aspectRatio}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Poster/Cover image */}
            <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0"
            >
                <img
                    src={getAssetPath(item.poster)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Default overlay with title and artist */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent flex flex-col justify-end p-4"
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <h4 className="text-lg font-heading font-bold text-white leading-tight">
                        {item.title}
                    </h4>
                    {item.artist && (
                        <p className="text-white/70 text-sm mt-1 font-medium">
                            {item.artist}
                        </p>
                    )}
                </div>
            </motion.div>

            {/* Hover overlay with quote and blurb */}
            <motion.div
                className="absolute inset-0 bg-charcoal/95 flex flex-col justify-center p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <h4 className="text-lg font-heading font-bold text-neon mb-1">
                    {item.title}
                </h4>
                {item.artist && (
                    <p className="text-white/70 text-sm mb-3 font-medium">
                        {item.artist}
                    </p>
                )}
                {item.quote && (
                    <blockquote className="text-white/90 text-sm italic border-l-2 border-electric pl-3 mb-4">
                        "{item.quote}"
                    </blockquote>
                )}
                {item.blurb && (
                    <p className="text-white/70 text-sm leading-relaxed">
                        {parseLinks(item.blurb)}
                    </p>
                )}
            </motion.div>
        </motion.div>
    )
}

export function MediaGrid({ items, type, title }: MediaGridProps) {
    if (items.length === 0) return null

    const gridCols = getGridCols(type)

    return (
        <div className="mb-8">
            <h4 className="text-md font-medium text-white/70 mb-4">{title}</h4>
            <div className={`grid ${gridCols} gap-4`}>
                {items.map(item => (
                    <MediaCard key={item.id} item={item} type={type} />
                ))}
            </div>
        </div>
    )
}

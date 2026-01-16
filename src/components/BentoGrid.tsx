import { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Section } from './layout'

export interface HobbyItem {
  id: string
  title: string
  image: string
  description: string
  layout: 'portrait-left' | 'portrait-right' | 'landscape-top' | 'landscape-bottom'
}

interface BentoGridProps {
  items: HobbyItem[]
}

// Helper to resolve asset paths with base URL
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/'
  if (path.startsWith('http') || path.startsWith(base)) return path
  return `${base}${path.replace(/^\//, '')}`
}

// Parse markdown-style links in description
const parseDescription = (text: string) => {
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

function PassionCard({ item }: { item: HobbyItem }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-navy cursor-pointer w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image */}
      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src={getAssetPath(item.image)}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Default overlay with title */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent flex flex-col justify-end p-4"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-heading font-bold text-white">
          {item.title}
        </h3>
      </motion.div>

      {/* Hover overlay with description */}
      <motion.div
        className="absolute inset-0 bg-charcoal/90 flex flex-col justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-heading font-bold text-neon mb-3">
          {item.title}
        </h3>
        <p className="text-white/80 text-sm leading-relaxed">
          {parseDescription(item.description)}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function BentoGrid({ items }: BentoGridProps) {
  // Find items by layout type
  const portraitLeft = items.find(i => i.layout === 'portrait-left')
  const landscapeTop = items.find(i => i.layout === 'landscape-top')
  const landscapeBottom = items.find(i => i.layout === 'landscape-bottom')
  const portraitRight = items.find(i => i.layout === 'portrait-right')

  return (
    <Section id="hobbies">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
        Beyond Work
      </h2>
      <p className="text-white/60 mb-12 max-w-2xl">
        The passions that keep me balanced, challenged, and grounded.
      </p>

      {/* Desktop Grid */}
      <div className="hidden md:block">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: '1fr 2fr 1fr',
            gridTemplateRows: '200px 200px',
          }}
        >
          {/* Left portrait - spans 2 rows */}
          {portraitLeft && (
            <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
              <PassionCard item={portraitLeft} />
            </div>
          )}

          {/* Center top landscape */}
          {landscapeTop && (
            <div style={{ gridColumn: '2', gridRow: '1' }}>
              <PassionCard item={landscapeTop} />
            </div>
          )}

          {/* Center bottom landscape */}
          {landscapeBottom && (
            <div style={{ gridColumn: '2', gridRow: '2' }}>
              <PassionCard item={landscapeBottom} />
            </div>
          )}

          {/* Right portrait - spans 2 rows */}
          {portraitRight && (
            <div style={{ gridColumn: '3', gridRow: '1 / 3' }}>
              <PassionCard item={portraitRight} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Grid: 2x2 */}
      <div className="md:hidden grid grid-cols-2 gap-4">
        {portraitLeft && (
          <div className="aspect-[3/4]">
            <PassionCard item={portraitLeft} />
          </div>
        )}
        {landscapeTop && (
          <div className="aspect-[3/4]">
            <PassionCard item={landscapeTop} />
          </div>
        )}
        {landscapeBottom && (
          <div className="aspect-[3/4]">
            <PassionCard item={landscapeBottom} />
          </div>
        )}
        {portraitRight && (
          <div className="aspect-[3/4]">
            <PassionCard item={portraitRight} />
          </div>
        )}
      </div>
    </Section>
  )
}

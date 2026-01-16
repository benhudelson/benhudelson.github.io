import { motion } from 'framer-motion'

export interface TimelineItemData {
  date: string
  type: 'sprint' | 'marathon'
  title: string
  company?: string
  description: string
}

interface TimelineItemProps {
  item: TimelineItemData
  index: number
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  const isSprint = item.type === 'sprint'

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />

      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-1 w-3 h-3 -translate-x-[5px] rounded-full border-2 ${
          isSprint
            ? 'bg-neon border-neon'
            : 'bg-electric border-electric'
        }`}
      />

      {/* Type badge */}
      <span
        className={`inline-block text-xs font-medium uppercase tracking-wider mb-2 px-2 py-1 rounded ${
          isSprint
            ? 'bg-neon/20 text-neon'
            : 'bg-electric/20 text-electric'
        }`}
      >
        {isSprint ? 'Sprint' : 'Marathon'}
      </span>

      {/* Date */}
      <p className="text-white/50 text-sm mb-1">{item.date}</p>

      {/* Title & Company */}
      <h3 className="text-xl font-heading font-bold text-white">
        {item.title}
      </h3>
      {item.company && (
        <p className="text-electric font-medium">{item.company}</p>
      )}

      {/* Description */}
      <p className="mt-2 text-white/70 leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  )
}

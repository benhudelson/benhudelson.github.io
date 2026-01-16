import { motion } from 'framer-motion'
import { Section } from './layout'

export interface HobbyItem {
  id: string
  title: string
  trait: string
  image?: string
  span?: 'normal' | 'wide' | 'tall'
}

interface BentoGridProps {
  items: HobbyItem[]
}

export function BentoGrid({ items }: BentoGridProps) {
  const getSpanClasses = (span?: string) => {
    switch (span) {
      case 'wide':
        return 'md:col-span-2'
      case 'tall':
        return 'md:row-span-2'
      default:
        return ''
    }
  }

  return (
    <Section id="hobbies">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
        The Balanced Leader
      </h2>
      <p className="text-white/60 mb-12 max-w-2xl">
        Beyond the professional, the traits that keep me grounded.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-2xl bg-navy group cursor-pointer ${getSpanClasses(item.span)}`}
          >
            {/* Background image or gradient */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-neon/20" />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <span className="text-xs uppercase tracking-wider text-neon font-medium">
                {item.trait}
              </span>
              <h3 className="text-lg md:text-xl font-heading font-bold text-white">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

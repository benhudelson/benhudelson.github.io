import { Section } from './layout'
import { TimelineItem, TimelineItemData } from './TimelineItem'

interface TimelineProps {
  items: TimelineItemData[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <Section id="experience">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
        Experience
      </h2>
      <p className="text-white/60 mb-12 max-w-2xl">
        Agile <span className="text-neon">Sprints</span> for rapid delivery. Career{' '}
        <span className="text-electric">Marathons</span> for lasting impact.
      </p>
      <div className="max-w-3xl">
        {items.map((item, index) => (
          <TimelineItem key={`${item.date}-${item.title}`} item={item} index={index} />
        ))}
      </div>
    </Section>
  )
}

import { motion } from 'framer-motion'
import { Section } from '../components/layout/Section'
import { RaceCard, RaceData } from '../components/RaceCard'
import racesData from '../data/races.json'

export function RacingSection() {
    return (
        <Section id="racing">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <p className="text-neon text-sm font-medium uppercase tracking-widest mb-3 font-sans">
                    On the road
                </p>
                <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                    Race Results
                </h2>
                <div className="w-12 h-0.5 bg-neon" />
            </motion.div>

            <div className="max-w-3xl flex flex-col gap-5">
                {(racesData as RaceData[]).map((race, i) => (
                    <RaceCard key={`${race.name}-${race.date}`} race={race} index={i} />
                ))}
            </div>
        </Section>
    )
}

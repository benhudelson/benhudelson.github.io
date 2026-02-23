import { motion } from 'framer-motion'

export interface RaceData {
    name: string
    date: string
    distance: string
    location?: string
    time: string
    placeOverall: number
    totalOverall?: number
    division?: string
    placeInDivision?: number
    totalInDivision?: number
    resultsUrl?: string
    notes?: string
}

interface RaceCardProps {
    race: RaceData
    index: number
}

export function RaceCard({ race, index }: RaceCardProps) {
    const hasDivision = !!race.division

    const getMedal = (place: number) => {
        if (place === 1) return '🥇'
        if (place === 2) return '🥈'
        if (place === 3) return '🥉'
        return null
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ y: -3 }}
            className="group relative bg-navy/60 border border-white/10 rounded-xl overflow-hidden
                 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]"
        >
            {/* Glowing left accent border */}
            <div
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-neon opacity-50
                   group-hover:opacity-100 transition-opacity duration-300"
            />

            <div className="px-6 py-5">

                {/* Header row: race name + date */}
                <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="font-heading font-bold text-xl text-white leading-tight">
                        {race.name}
                    </h3>
                    <span className="text-white/40 text-sm whitespace-nowrap mt-0.5 font-sans">
                        {race.date}
                    </span>
                </div>

                {/* Distance + location row */}
                <div className="flex items-center gap-3 mb-4">
                    <p className="text-white/40 text-xs uppercase tracking-widest font-sans">
                        {race.distance}
                    </p>
                    {race.location && (
                        <>
                            <span className="text-white/20 text-xs">&middot;</span>
                            <span className="inline-flex items-center gap-1 text-white/40 text-xs font-sans">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {race.location}
                            </span>
                        </>
                    )}
                </div>

                {/* Time — large monospace anchor */}
                <div className="mb-4">
                    <span className="font-mono text-4xl font-bold text-neon tracking-tight">
                        {race.time}
                    </span>
                </div>

                {/* Stat badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {/* Overall place */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium
                           bg-electric/10 border border-electric/20 text-electric
                           px-3 py-1 rounded-full">
                        {getMedal(race.placeOverall) ? (
                            <span>{getMedal(race.placeOverall)}</span>
                        ) : (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        )}
                        Overall: {race.placeOverall.toLocaleString()}
                        {race.totalOverall ? `/${race.totalOverall.toLocaleString()}` : ''}
                    </span>

                    {/* Division — only if specified */}
                    {hasDivision && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium
                             bg-neon/10 border border-neon/20 text-neon
                             px-3 py-1 rounded-full">
                            {race.placeInDivision != null && getMedal(race.placeInDivision) ? (
                                <span>{getMedal(race.placeInDivision)}</span>
                            ) : (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                                </svg>
                            )}
                            {race.division}: {race.placeInDivision?.toLocaleString() ?? '—'}
                            {race.totalInDivision ? `/${race.totalInDivision.toLocaleString()}` : ''}
                        </span>
                    )}
                </div>

                {/* Notes */}
                {race.notes && (
                    <p className="text-white/50 text-sm italic leading-relaxed mb-4">
                        {race.notes}
                    </p>
                )}

                {/* Results link */}
                {race.resultsUrl && (
                    <a
                        href={race.resultsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-electric
                       hover:text-neon transition-colors duration-200 group/link"
                    >
                        View Official Results
                        <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform duration-200"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                )}
            </div>
        </motion.div>
    )
}

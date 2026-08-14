import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar, Footer } from '../components/layout'

const PASSWORD_HASH = '0f9c84252caf2f758b39077ab0a6d62c806afcf726d95957a0c265f0d5365bf1'
const SESSION_KEY = 'meetings-auth'
const MEETINGS_API = 'https://coachme-meetings-api.benhudelson.workers.dev/meetings.json'

interface MeetingSection {
    title: string
    content: string
}

interface Meeting {
    date: string
    durationMin: number
    quickRecap: string
    nextSteps: string[]
    sections: MeetingSection[]
}

interface MeetingsData {
    meetings: Meeting[]
}

async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

function formatDate(iso: string): string {
    const [year, month, day] = iso.split('-').map(Number)
    const d = new Date(year, month - 1, day)
    return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

function PasswordGate({ onAuth }: { onAuth: () => void }) {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [checking, setChecking] = useState(false)

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            setChecking(true)
            setError(false)
            const hash = await sha256(value)
            if (hash === PASSWORD_HASH) {
                sessionStorage.setItem(SESSION_KEY, '1')
                onAuth()
            } else {
                setError(true)
                setValue('')
            }
            setChecking(false)
        },
        [value, onAuth],
    )

    return (
        <div className="min-h-screen bg-charcoal text-white flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
            >
                <p className="text-neon text-sm font-medium uppercase tracking-widest mb-3 font-sans text-center">
                    CoachME
                </p>
                <h1 className="font-heading text-4xl font-bold text-white mb-6 text-center">
                    Meeting Notes
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Password"
                        autoFocus
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-neon transition-colors"
                    />
                    {error && (
                        <p className="text-red-400 text-sm font-light">
                            Wrong password.
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={checking || !value}
                        className="w-full bg-neon text-charcoal font-semibold rounded-md px-5 py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {checking ? 'Checking…' : 'Enter'}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

function MeetingCard({ meeting, index }: { meeting: Meeting; index: number }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="border border-white/10 rounded-lg overflow-hidden"
        >
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full text-left p-6 hover:bg-white/[0.02] transition-colors"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <p className="text-neon text-xs font-medium uppercase tracking-widest mb-1 font-sans">
                            {formatDate(meeting.date)}
                        </p>
                        <p className="text-white/70 text-sm font-light leading-relaxed">
                            {meeting.quickRecap}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 pt-1">
                        <span className="text-white/30 text-xs font-light">
                            {meeting.durationMin} min
                        </span>
                        <span
                            className="text-white/40 text-sm transition-transform"
                            style={{
                                display: 'inline-block',
                                transform: expanded
                                    ? 'rotate(90deg)'
                                    : 'rotate(0deg)',
                            }}
                        >
                            &#9654;
                        </span>
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 space-y-6">
                            <div className="border-t border-white/5 pt-5">
                                <h3 className="font-heading text-lg font-bold text-white mb-3">
                                    Next Steps
                                </h3>
                                <ul className="space-y-2">
                                    {meeting.nextSteps.map((step, i) => (
                                        <li
                                            key={i}
                                            className="text-white/60 text-sm font-light leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-neon/40"
                                        >
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {meeting.sections.map((section, i) => (
                                <div key={i}>
                                    <h3 className="font-heading text-lg font-bold text-white mb-2">
                                        {section.title}
                                    </h3>
                                    <p className="text-white/60 text-sm font-light leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export function MeetingsPage() {
    const [authed, setAuthed] = useState(
        () => sessionStorage.getItem(SESSION_KEY) === '1',
    )
    const [data, setData] = useState<MeetingsData | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!authed) return
        fetch(MEETINGS_API)
            .then((r) => {
                if (!r.ok) throw new Error(String(r.status))
                return r.json()
            })
            .then((d: MeetingsData) => setData(d))
            .catch(() => setError(true))
    }, [authed])

    if (!authed) {
        return <PasswordGate onAuth={() => setAuthed(true)} />
    }

    return (
        <div className="min-h-screen bg-charcoal text-white">
            <Navbar />
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <p className="text-neon text-sm font-medium uppercase tracking-widest mb-3 font-sans">
                            CoachME
                        </p>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                            Meeting Notes
                        </h1>
                        <div className="w-12 h-0.5 bg-neon" />
                        <p className="text-lg text-white/70 mt-6 max-w-2xl">
                            Weekly sync summaries. Click any meeting to see
                            details and next steps.
                        </p>
                    </motion.div>

                    {!data && !error && (
                        <p className="text-white/60 font-light">
                            Loading meetings&hellip;
                        </p>
                    )}

                    {error && (
                        <p className="text-white/60 font-light">
                            Couldn&rsquo;t load meeting data. Try again shortly.
                        </p>
                    )}

                    {data && (
                        <div className="space-y-4">
                            {data.meetings.map((meeting, i) => (
                                <MeetingCard
                                    key={meeting.date}
                                    meeting={meeting}
                                    index={i}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

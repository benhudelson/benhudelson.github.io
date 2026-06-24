import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar, Footer } from '../components/layout'

// Cloudflare Worker JSON API (apps/build-page in the coachme repo).
const BUILDS_API = 'https://coachme-build-page.benhudelson.workers.dev/latest.json'

interface IosBuild {
    installPageUrl: string
    artifactUrl: string | null
    version: string | null
    buildNumber: string | null
    buildId: string | null
    completedAt: string | null
}

type LoadState =
    | { kind: 'loading' }
    | { kind: 'ready'; ios: IosBuild | null }
    | { kind: 'error' }

function formatDate(iso: string | null): string | null {
    if (!iso) return null
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? null : d.toLocaleString()
}

export function BuildsPage() {
    const [state, setState] = useState<LoadState>({ kind: 'loading' })

    useEffect(() => {
        let cancelled = false
        fetch(BUILDS_API)
            .then((r) => {
                if (!r.ok) throw new Error(String(r.status))
                return r.json()
            })
            .then((data: { ios: IosBuild | null }) => {
                if (!cancelled) setState({ kind: 'ready', ios: data.ios })
            })
            .catch(() => {
                if (!cancelled) setState({ kind: 'error' })
            })
        return () => {
            cancelled = true
        }
    }, [])

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
                            CoachME · internal builds
                        </p>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                            Latest build
                        </h1>
                        <div className="w-12 h-0.5 bg-neon" />
                        <p className="text-lg text-white/70 mt-6 max-w-2xl">
                            The newest CoachME test build, always current. Install on an iPhone
                            that has been registered for ad-hoc distribution.
                        </p>
                    </motion.div>

                    {state.kind === 'loading' && (
                        <p className="text-white/60 font-light">Loading the latest build…</p>
                    )}

                    {state.kind === 'error' && (
                        <p className="text-white/60 font-light">
                            Couldn’t reach the build service. Try again shortly.
                        </p>
                    )}

                    {state.kind === 'ready' && !state.ios && (
                        <p className="text-white/60 font-light">No build has been published yet.</p>
                    )}

                    {state.kind === 'ready' && state.ios && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="border border-white/10 rounded-lg p-6"
                        >
                            <p className="text-xs text-neon font-medium uppercase tracking-widest mb-2 font-sans">
                                iOS
                            </p>
                            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">
                                {state.ios.version
                                    ? `Version ${state.ios.version}`
                                    : 'CoachME'}
                                {state.ios.buildNumber ? ` (${state.ios.buildNumber})` : ''}
                            </h2>
                            {formatDate(state.ios.completedAt) && (
                                <p className="text-white/50 text-sm font-light mb-5">
                                    Built {formatDate(state.ios.completedAt)}
                                </p>
                            )}
                            <a
                                href={state.ios.installPageUrl}
                                className="inline-block bg-neon text-charcoal font-semibold rounded-md px-5 py-3 hover:opacity-90 transition-opacity"
                            >
                                Install on iPhone
                            </a>
                            <p className="text-white/40 text-xs font-light mt-4">
                                Your iPhone must be registered for ad-hoc install, or the
                                install will be refused.
                            </p>
                        </motion.div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

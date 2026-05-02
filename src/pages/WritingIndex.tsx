import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Navbar, Footer } from '../components/layout'

interface PostMeta {
    slug: string
    title: string
    date: string
    tag: string
    excerpt: string
}

const posts: PostMeta[] = [
    {
        slug: 'eval-gated-pull-requests',
        title: 'Eval-gated pull requests for an internal Claude Code skills library',
        date: '2026.05',
        tag: 'Agent engineering',
        excerpt:
            'The default failure mode of a private skills library is silent rot. We treat every skill the same way we treat application code: it ships through a PR, the PR runs an eval, and the eval has to pass before merge.',
    },
]

export function WritingIndex() {
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
                            Notes from the build
                        </p>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                            Writing
                        </h1>
                        <div className="w-12 h-0.5 bg-neon" />
                        <p className="text-lg text-white/70 mt-6 max-w-2xl">
                            Operational notes on agent engineering, eval-driven development, and the scaffolding I use to keep AI-native teams honest.
                        </p>
                    </motion.div>

                    <ul className="flex flex-col gap-8">
                        {posts.map((post, i) => (
                            <motion.li
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    to={`/writing/${post.slug}`}
                                    className="block group border border-white/10 hover:border-neon/60 rounded-lg p-6 transition-colors"
                                >
                                    <p className="text-xs text-neon font-medium uppercase tracking-widest mb-2 font-sans">
                                        {post.date} · {post.tag}
                                    </p>
                                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-white group-hover:text-neon transition-colors mb-3 leading-tight">
                                        {post.title}
                                    </h2>
                                    <p className="text-white/70 leading-relaxed font-light">
                                        {post.excerpt}
                                    </p>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    )
}

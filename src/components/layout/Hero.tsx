import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-heading font-bold text-white mb-4"
        >
          Ben Hudelson
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 mb-6"
        >
          Technical Leader, Operations Leader, & Agile Coach
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-electric max-w-2xl mx-auto"
        >
          I run Operations teams for scale,Agile teams with speed, and I build resilient organizations for the long haul.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 text-neon hover:text-white transition-colors"
          >
            <span>View my journey</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

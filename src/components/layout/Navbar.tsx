import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#experience', label: 'Experience' },
  { href: '#bookshelf', label: 'Bookshelf' },
  { href: '#hobbies', label: 'Beyond Work' },
  { href: '#racing', label: 'Racing' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  const handleAnchor = (href: string) => {
    setIsOpen(false)
    if (onHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + href)
    }
  }

  const handleHome = () => {
    setIsOpen(false)
    if (onHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); handleHome() }}
          className="text-xl font-heading font-bold text-white hover:text-neon transition-colors"
        >
          BH
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={onHome ? link.href : '/' + link.href}
              onClick={(e) => { e.preventDefault(); handleAnchor(link.href) }}
              className="text-sm text-white/70 hover:text-neon transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/writing"
            className="text-sm text-white/70 hover:text-neon transition-colors"
          >
            Writing
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neon border border-neon/60 px-3 py-1.5 rounded hover:bg-neon hover:text-charcoal transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal border-t border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={onHome ? link.href : '/' + link.href}
                  onClick={(e) => { e.preventDefault(); handleAnchor(link.href) }}
                  className="text-white/70 hover:text-neon transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/writing"
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-neon transition-colors"
              >
                Writing
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-neon hover:text-white transition-colors"
              >
                Resume (PDF)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

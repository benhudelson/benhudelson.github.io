import { ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}

import { Section } from './layout'

export function Philosophy() {
    return (
        <Section id="philosophy">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8">
                Leadership Philosophy
            </h2>
            <div className="max-w-3xl">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-6">
                    I focus relentlessly on identifying and eliminating the constraints that prevent my team from delivering value—not by demanding more effort, but by ensuring the right work gets done at the right time.
                </p>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-6">
                    When obstacles arise, I treat them as the path forward: I engage in honest, direct dialogue, challenge my own biases and assumptions, and build systems that learn and improve continuously.
                </p>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                    I strive to see the whole system, not just the parts—developing people, standardizing what works, and creating the conditions where my teams solve problems at the source rather than waiting to be told what to do.
                </p>
            </div>
        </Section>
    )
}

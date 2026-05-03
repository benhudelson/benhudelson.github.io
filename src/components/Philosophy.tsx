import { Section } from './layout'

export function Philosophy() {
    return (
        <Section id="philosophy">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8">
                Leadership Philosophy
            </h2>
            <div className="max-w-3xl">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-6">
                    AI is the new abstraction layer in software engineering. The job of an engineering leader is no longer to optimize how humans write code, it is to design the system in which humans and agents build software together. That reframe changes what the team owns, what the bar looks like, and where the constraints actually live.
                </p>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-6">
                    I lead engineering teams through that transition. Concretely, that means moving an organization to AI-native development practices: agentic workflows across the SDLC, eval-gated pull requests that codify the bar, and domain-tuned skills that make quality reproducible instead of heroic. The work is part technical, part organizational. People have to trust the new tools, and the tools have to earn it.
                </p>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-6">
                    The systems-thinking discipline still applies, and matters more, not less. I focus on identifying the real constraint rather than demanding more effort, treat obstacles as the path forward through honest and direct dialogue, and challenge my own assumptions before I challenge anyone else's. Healthy AI adoption fails the same way every other change fails: when leaders confuse activity with progress.
                </p>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                    My job is to see the whole system, develop the people inside it, and standardize what works so the team solves problems at the source. In an AI-native org, that means engineers operate one level up: shipping outcomes, owning evaluation, and building leverage. I create the conditions for that to happen.
                </p>
            </div>
        </Section>
    )
}

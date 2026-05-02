import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Navbar, Footer } from '../../components/layout'

export function EvalGatedPullRequests() {
    return (
        <div className="min-h-screen bg-charcoal text-white">
            <Navbar />
            <main className="pt-24 pb-16 px-4">
                <article className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <Link to="/writing" className="text-sm text-neon hover:text-white transition-colors">
                            &larr; Writing
                        </Link>
                        <p className="text-neon text-sm font-medium uppercase tracking-widest mt-6 mb-3 font-sans">
                            2026.05 · Agent engineering
                        </p>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                            Eval-gated pull requests for an internal Claude Code skills library
                        </h1>
                        <div className="w-12 h-0.5 bg-neon" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 text-lg text-white/90 leading-relaxed font-light"
                    >
                        <p>
                            The default failure mode of a private skills library is silent rot. You write a skill that reads your team's coding conventions, ship it, and a quarter later nobody remembers why it suggests one hook over another. The skill keeps running. The advice keeps drifting. By the time someone notices, three engineers have copy-pasted bad patterns into production.
                        </p>
                        <p>The fix is to put the skill on a contract.</p>
                        <p>
                            We treat every skill in our internal Claude Code library the same way we treat application code: it ships through a PR, the PR runs an eval, and the eval has to pass before merge. The eval is not a unit test. It is a small, hand-curated set of prompts that exercise the skill against fixed expected behaviors, scored by an LLM judge against a rubric we wrote when the skill was first proposed.
                        </p>
                        <p>A skill enters our library only after three artifacts exist for it:</p>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li>A skill definition (the Markdown plus frontmatter Claude Code consumes).</li>
                            <li>An eval set: ten to thirty prompts, each labeled with the behavior the skill is supposed to produce and the failure modes it is supposed to prevent.</li>
                            <li>A judge prompt: the rubric we score against, version-locked alongside the eval set.</li>
                        </ol>
                        <p>
                            Without all three, the skill does not get reviewed. We learned this the hard way. Our first generation of skills had no evals; they were good ideas in the heads of the people who wrote them. When the underlying model rolled forward by a point, half the skills started over-correcting. The drift was invisible until a reviewer asked, "wait, why is the agent rewriting these test files?"
                        </p>

                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white pt-4">
                            What the eval gate actually does
                        </h2>
                        <p>
                            When a PR touches a skill file, the pre-merge job picks up the eval set tagged for that skill and runs it against the current state of the skill on a pinned model. The judge scores each item zero to two: zero is a regression, one is a partial pass, two is a full pass. The PR has a target score, usually the prior version's score within tolerance, and a hard floor of no new zeros.
                        </p>
                        <p>
                            If a PR proposes to weaken the rubric, that is a separate review. We make rubric changes legible by versioning the judge prompt in the same directory as the skill, and any commit that touches both the skill and the rubric is flagged for a second reviewer.
                        </p>
                        <p>
                            The first time we ran this on a real skill change, the eval caught a regression we would have shipped. Someone tightened a prompt to be more concise. The conciseness landed; the skill also stopped recommending a piece of context the team relies on. The eval flagged it on item seven. We reverted the conciseness change and tightened the rubric to lock in the missing recommendation.
                        </p>

                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white pt-4">
                            What the gate does not do
                        </h2>
                        <p>
                            It does not prove the skill is good. It proves the skill is no worse than the last time we agreed it was good. That is enough. A library of fifty skills, each one no worse than its prior version, beats a library of fifty skills nobody has measured.
                        </p>
                        <p>
                            It also does not replace human review. The judge catches behavior drift. It does not catch design problems, naming problems, or "this skill is solving the wrong problem." Those still come up in PR review the normal way.
                        </p>

                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white pt-4">
                            What it costs
                        </h2>
                        <p>
                            The cost of running the gate is real but bounded. Our largest eval set is twenty-eight items; one full run costs about the same as a careful human review and finishes in under two minutes when batched. The cost of writing the eval set the first time is the actual tax, and it is the right tax. If you cannot articulate what a skill is supposed to do clearly enough to grade it, the skill is not ready to ship.
                        </p>

                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white pt-4">
                            What this looks like on the team
                        </h2>
                        <p>
                            The visible result is that skills are durable. An engineer who joined after a skill landed can still trust it, because there is a paper trail showing the skill has not regressed since merge. The invisible result is more important: the engineering team is now used to writing evals before writing prompts. That habit transferred. When we started building production agent features, the team reached for evals on day one. The skills library was the training ground.
                        </p>
                        <p>
                            The phrase I use internally is that evals are the contract. The skill's prompt is the implementation. The judge is the test runner. Reviewers enforce the contract; they do not reread the implementation every time it changes.
                        </p>
                        <p>
                            That is the whole pattern. A small library, a tight gate, a rubric you can point at when someone asks why a skill behaves the way it does.
                        </p>
                    </motion.div>
                </article>
            </main>
            <Footer />
        </div>
    )
}

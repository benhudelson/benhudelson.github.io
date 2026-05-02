# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — type-check (`tsc -b`) then produce a production build in `dist/`
- `npm run lint` — run ESLint over the repo
- `npm run preview` — serve the built `dist/` locally
- `npm run deploy` — build and push `dist/` to the `gh-pages` branch via `gh-pages` (note: production deploys actually happen automatically via `.github/workflows/deploy.yml` on push to `main`)

There is no test runner configured.

## Architecture

This is a single-page personal site (benhudelson.com) deployed to GitHub Pages. It is **not** a multi-route SPA — `react-router-dom` is a dependency, but `App.tsx` renders all sections in one stack and `Navbar` navigates by smooth-scrolling to hash anchors (`#philosophy`, `#experience`, `#bookshelf`, `#hobbies`, `#racing`). Each top-level section component sets the matching `id` (typically via the shared `Section` layout wrapper).

### Content is data-driven

Section content lives in `src/data/*.json` and is imported and cast to a typed shape in `App.tsx`:

- `experience.json` → `Timeline` (typed as `TimelineItemData`)
- `books.json` → `Bookshelf` (typed as `BookData`)
- `hobbies.json`, `movies.json`, `books.media.json`, `music.json` → `BentoGrid` (each typed as `HobbyItem` or `MediaItem`)
- `races.json` → `RacingSection` (typed as `RaceData`)

When adding or restructuring content, edit the JSON; the matching `*Data` type lives next to its consuming component (e.g. `BookCard.tsx` exports `BookData`). `src/components/index.ts` re-exports the public component+type surface.

### Styling: Tailwind v4 with no `tailwind.config.js`

Theme tokens are declared in `src/index.css` inside an `@theme { ... }` block (Tailwind v4's CSS-first config). Custom tokens you'll see in class names:

- Colors: `bg-charcoal`, `bg-navy`, `text-electric`, `text-neon`
- Fonts: `font-sans` (Inter), `font-heading` (Oswald) — loaded via `<link>` in `index.html`

To add a design token, extend the `@theme` block in `src/index.css` rather than creating a Tailwind config file. PostCSS is wired through `@tailwindcss/postcss` + `autoprefixer`.

### Animation

Framer Motion is the only animation library. Sections typically use `motion.div` with `initial` / `whileInView` + `viewport={{ once: true }}` for scroll-triggered reveals. `Navbar` uses `AnimatePresence` for the mobile menu.

### Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/` to GitHub Pages. The custom domain is configured via `CNAME` (root) and `public/CNAME` (copied into the build). `vite.config.ts` sets `base: '/'` because the site is served from a custom domain, not a project subpath.

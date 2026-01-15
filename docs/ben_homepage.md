# Ben Hudelson - Personal Homepage Strategy & Plan

## 1. Vision & Persona
**"The Active Professional"**
A premium, high-performance personal site blending technical leadership with authentic humanity.
-   **Core Message**: "I run Agile teams with speed, but I build resilient architectures/organizations for the long haul."
-   **Visual Identity**: Deep Navy/Charcoal (Business) + Electric Blue/Neon (Energy). Structured typography (Inter/Oswald).

## 2. Architecture & Tech Stack
-   **Framework**: Vite + React (TypeScript)
    -   *Why*: Required for the interactive 3D bookshelf and timeline animations.
-   **Styling**: Tailwind CSS
    -   *Strategy*: Use utility classes for layout, but extract consistent components (e.g., `Card`, `Section`, `Button`) to maintain the "premium" feel.
-   **Animation**: Framer Motion
    -   *Why*: Declarative animations for scroll reveals, hover effects, and page transitions.
-   **Deployment**: GitHub Pages (Static build).

## 3. Key Features & Content Strategy

### A. The "Agile Sprints & Career Marathons" Timeline
*Interactive vertical timeline component.*
-   **Concept**: Visually contrast short-term wins (Sprints) with long-term growth (Marathons).
-   **Content Mapping**:
    -   *2010-2014 (Foundation)*: Allied Solutions (Systems Analysis).
    -   *2014-2017 (The Build - Sprints)*: Fusion Alliance/BoxCrush. high-velocity coding, Scrum Master roles.
    -   *2017-Present (The Scale - Marathon)*: TRIMEDX. Scaling from Data Science to Enterprise Mgmt.
    -   *Education*: MBA (Butler) & Math BS (Purdue).

### B. The Balanced Leader (Hobbies)
*Visual layout, not metrics.*
-   **Focus**: Traits over stats.
    -   **Running**: Discipline & Clarity.
    -   **Yoga**: Flexibility & Balance.
    -   **Family**: Grounding.
-   **Implementation**: A "Bento Box" grid of photos using CSS Grid.

### C. The Flexible Bookshelf
*3D Interactive Grid.*
-   **Featured (Top 3)**: Large cards with 3D tilt effect on hover. Contains quote & "Why it matters".
-   **Library**: Simple grid of covers for breadth.
-   **Implementation**: CSS `transform: perspective()` + `rotateY()` for 3D effect (no external 3D library needed).

## 4. Implementation Steps

### Phase 1: Project Setup
1.  Initialize Vite project: `npm create vite@latest . -- --template react-ts`
2.  Install Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
3.  Configure `tailwind.config.js`:
    -   Custom colors: Navy (`#1e293b`), Charcoal (`#0f172a`), Electric Blue (`#3b82f6`), Neon (`#22d3ee`)
    -   Extend font family with Inter and Oswald
4.  Add Google Fonts to `index.html`:
    ```html
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;700&display=swap" rel="stylesheet">
    ```
5.  Install animation library: `npm install framer-motion`

### Phase 2: Core Components
1.  **Layout Components**:
    -   `Navbar`: Sticky header with smooth scroll navigation
    -   `Hero`: Large typography with name, title, and tagline
    -   `Section`: Reusable wrapper with consistent padding/max-width
    -   `Footer`: Contact links, social icons
2.  **Timeline Component**:
    -   Props: `{ date, type: 'sprint' | 'marathon', title, description }`
    -   Visual differentiation between sprint (short accent) and marathon (extended accent)
    -   Scroll-triggered animations via Framer Motion
3.  **Hobbies Grid (Bento Box)**:
    -   CSS Grid layout with varying cell sizes
    -   Image cards with trait labels overlay
    -   Responsive: 2-col on mobile, 4-col on desktop
4.  **Bookshelf Component**:
    -   Featured books: 3D card with `transform: perspective(1000px) rotateY()`
    -   Hover state reveals quote and description
    -   Library grid: Simple responsive image grid

### Phase 3: Content & Data
1.  Create `src/data/experience.json`:
    ```json
    [
      { "date": "2017-Present", "type": "marathon", "title": "TRIMEDX", "description": "..." },
      { "date": "2014-2017", "type": "sprint", "title": "Fusion Alliance", "description": "..." }
    ]
    ```
2.  Create `src/data/books.json`:
    ```json
    [
      { "title": "...", "author": "...", "cover": "/images/books/...", "quote": "...", "why": "...", "featured": true }
    ]
    ```
3.  Create `src/data/hobbies.json` for the Bento grid content.
4.  Add images to `public/images/` (books, hobbies, profile).

### Phase 4: Responsive Design & Accessibility
1.  **Breakpoints**: Ensure all components work at `sm`, `md`, `lg`, `xl`
2.  **Mobile Navigation**: Hamburger menu for mobile viewport
3.  **Accessibility**:
    -   ARIA labels on interactive elements
    -   Keyboard navigation for timeline and bookshelf
    -   Sufficient color contrast (WCAG AA)
    -   Alt text for all images

### Phase 5: SEO & Meta
1.  Install: `npm install react-helmet-async`
2.  Add meta tags:
    -   Title, description, keywords
    -   Open Graph tags for social sharing
    -   Favicon and Apple touch icons
3.  Create `public/og-image.png` for social preview.

### Phase 6: Polish & Dark Mode
1.  Implement dark mode as default (Tailwind `darkMode: 'class'`)
2.  Add scroll-triggered animations to all sections
3.  Smooth page transitions between sections
4.  Loading states and skeleton screens (if needed)

### Phase 7: Deployment
1.  Configure `vite.config.ts` for GitHub Pages:
    ```ts
    export default defineConfig({
      base: '/ben_homepage/',  // or '/' if using custom domain
      plugins: [react()],
    })
    ```
2.  Add deploy script to `package.json`:
    ```json
    "scripts": {
      "deploy": "npm run build && gh-pages -d dist"
    }
    ```
3.  Install: `npm install -D gh-pages`
4.  Configure GitHub repository settings for Pages (gh-pages branch).

## 5. File Structure
```
ben_homepage/
├── public/
│   ├── images/
│   │   ├── books/
│   │   ├── hobbies/
│   │   └── profile/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Section.tsx
│   │   │   └── Footer.tsx
│   │   ├── Timeline.tsx
│   │   ├── TimelineItem.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── Bookshelf.tsx
│   │   └── BookCard.tsx
│   ├── data/
│   │   ├── experience.json
│   │   ├── books.json
│   │   └── hobbies.json
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 6. Verification Checklist
- [ ] All sections render correctly on desktop and mobile
- [ ] Timeline animations trigger on scroll
- [ ] Bookshelf 3D effect works on hover
- [ ] Bento grid images load and display properly
- [ ] Dark mode displays correctly
- [ ] Lighthouse score: Performance > 90, Accessibility > 90
- [ ] Build succeeds: `npm run build`
- [ ] Deploy works: `npm run deploy`

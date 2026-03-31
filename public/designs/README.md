# CoachME - Design System

## Overview

This design system provides production-ready screens and flows for the CoachME MVP. The designs follow a **refined athletic editorial** aesthetic with **task-oriented progressive disclosure** as the core UX philosophy.

## Quick Start

Open `index.html` in your browser to explore the complete design system, including:
- Design principles
- Color palette
- Typography system
- Technical specifications
- All screen designs

## Design Philosophy

### Core Principle: "What do I need to do right now?"

Every screen is designed to answer this question immediately. Unnecessary information is progressively disclosed only when needed, minimizing cognitive load and keeping runners focused on execution.

### Aesthetic Direction: Refined Athletic Editorial

Unlike typical fitness apps with bright gradients and motivational excess, CoachME uses:

- **Sophisticated typography** (DM Serif Display + Outfit)
- **Warm, grounded palette** (deep navy, terracotta, sage green, cream)
- **Editorial layouts** inspired by running magazines
- **Purposeful motion** that guides rather than distracts
- **Generous spacing** that feels premium and focused

This creates an experience that feels like working with a knowledgeable coach, not a generic fitness tracker.

---

## Screen Designs

### 1. Day Screen (`today-screen.html`, `today-screen-scenario-2.html`, `today-screen-scenario-3.html`)
**Purpose:** The universal "day" view — shows the high-level summary of any day: past, present, or future. This is the hub of the app. The layout and functionality remain consistent across all states; individual elements vary based on day context and check-in status.

**States:**
- **State 1 — Today (upcoming/in-progress):** `today-screen.html` — Default landing. Workout shown, not yet completed.
- **State 2 — Completed, not checked in:** `today-screen-scenario-2.html` — Workout marked done; "How was it?" prompt visible.
- **State 3 — Completed & checked in:** `today-screen-scenario-3.html` — Workout done, check-in recorded; summary visible.
- *(Future states to design: Future day, Past day not completed, Rest day)*

**Key Elements:**
- Date badge and greeting/context header
- Hero workout card with workout type label + tappable ⓘ tooltip for workout type definition
- Weekly mileage stats: Last 7 days and Week to date
- Week preview pills showing 7 days with workout quality tag + mileage (e.g. "HQ 8mi")

**Animations:**
- Staggered fade-in sequence (header → card → week preview)
- Scale-in for workout card
- Pulse animation on "today" indicator

**UX Notes:**
- Card is tappable to view workout details
- Week preview pills use day abbreviation + date number format (e.g. M22, T23)
- ⓘ button on workout card reveals definition tooltip for the workout type

---

### 2. Workout Detail (`workout-detail.html`)
**Purpose:** Full breakdown of today's workout

**Key Elements:**
- Sticky header with back button
- Hero section with gradient background showing workout type, distance, time, pace
- Workout structure cards (warmup, main, cooldown) with phase-specific pacing
- Effort zone card with gradient background
- Fixed bottom CTA button (Skip)

**Design Decisions:**
- Dark hero section creates visual hierarchy and focus
- Phase cards use left accent stripe for scanability
- Pace guidance shown inline with each phase
- Effort zone uses success gradient to emphasize recovery

**Technical:**
- Sticky header prevents loss of context while scrolling
- Fixed CTA ensures actions are always accessible
- Gradient fade on CTA container prevents hard cutoff

---

### 3. Post-Workout Check-in (`check-in-flow.html`)
**Purpose:** Capture effort, physical, mental state in <60 seconds

**Key Elements:**
- Progress bar at top showing 4-step flow
- Full-screen linear progression (one question at a time)
- Custom sliders with visual feedback
- Large display value for current selection
- Optional notes field at end

**UX Flow:**
1. Question 1: Effort slider (1-10, Very Easy → Very Hard)
2. Question 2: Physical state slider (1-10, Fresh → Exhausted)
3. Question 3: Mental state slider (1-10, Motivated → Burned Out)
4. Question 4: Optional notes (text area, skippable)

**Design Decisions:**
- One question per screen eliminates decision paralysis
- Large touch targets on sliders for in-motion completion
- Progress bar provides orientation without pressure
- Skip option on final screen respects time constraints

**Technical:**
- Slider fill uses gradient to show intensity progression
- Custom styled range input with large thumb for mobile
- Auto-advance on tap outside slider area (optional enhancement)

---

### 4. Pain Follow-up Flow (`pain-follow-up.html`)
**Purpose:** Capture pain details when keywords detected in check-in notes

**Key Elements:**
- Warning banner highlighting detected keyword
- Body part selection grid (2-column layout)
- Pain type selection (6 options: Sharp, Dull, Aching, Tight, Burning, Stabbing)
- Severity slider with contextual descriptions
- "When does it hurt?" checkboxes

**UX Flow:**
1. Screen 1: Select affected body part from grid
2. Screen 2: Select pain type with icon representations
3. Screen 3: Rate severity + when pain occurs

**Design Decisions:**
- Alert banner uses warning color to signal importance
- Grid layout for body parts enables quick selection
- Pain type icons provide visual clarity
- Severity descriptions change based on slider value (1="Very mild", 10="Extreme")
- Checkboxes allow multiple "when" selections

**Technical:**
- Warning color (#e8b45a) distinct from primary accent
- Selected state uses accent color with background tint
- Dynamic severity descriptions update on slider input

---

### 5. Intervention Modal (`intervention-modal.html`)
**Purpose:** Rules-based coaching intervention suggesting plan adjustments

**Key Elements:**
- Overlay with backdrop blur
- Bottom sheet modal with slide-up animation
- Coach icon (circular "M" badge)
- Alert badge ("Coach Recommendation")
- Message explaining trigger
- Recommendation card highlighting suggested change
- Expandable "Why this matters" section
- Accept / Keep Plan buttons

**Design Decisions:**
- Modal slides from bottom (native mobile pattern)
- Backdrop blur focuses attention without harsh blocking
- Coach icon personalizes intervention (Matt's initial)
- Recommendation card uses subtle background to differentiate from explanation
- Expandable section provides detail without initial overwhelm
- "Keep Plan" option respects athlete autonomy

**Technical:**
- Modal uses cubic-bezier(0.34, 1.56, 0.64, 1) for satisfying bounce
- Backdrop blur requires backdrop-filter CSS property
- Expanded content uses max-height transition for smooth reveal

---

### 6. Calendar Drawer (`calendar-drawer.html` / embedded in `today-screen.html`)
**Purpose:** View past/future workouts via swipe-up gesture

**Key Elements:**
- Drawer handle area (visible when collapsed)
- Week range label in drawer header (e.g. "Mar 24 – 30")
- 7-day week grid showing ~4 cards + peek of 5th to signal scrollability
- Day cards with two-part date header: small "Day · Month" context line + large day number in display font
- Day cards show workout type and distance
- Selected workout detail card (expands inline)

**States:**
- **Completed** (sage green): Workout done
- **Today** (terracotta/primary): Current day
- **Upcoming** (white, bordered): Future workouts
- **Missed** (red-tinted): Skipped workouts
- **Rest** (dashed border): Scheduled rest days
- **Empty** (greyed, no pointer events): Days outside data range

**Interactions:**
- Swipe up drawer handle to open (transform translateY)
- Tap any day card to select and show workout detail; links to Day Screen for that date
- Left/right arrows flanking card row: scroll within current week (1 card at a time)
- Up/down arrows centered above/below card row: navigate between weeks
- Swipe down to dismiss

**Design Decisions:**
- Drawer collapsed state shows peek title to invite interaction
- Arrow navigation replaces free horizontal scroll for precision control
- Up/down for weeks, left/right for days within week
- Day number as large display font anchor enables fast visual scanning
- Empty day cards preserve grid shape for weeks with partial data
- Background content blurs when drawer open

**Technical:**
- Drawer transform starts at calc(100% - 80px) for peek
- Overlay background transitions from transparent to rgba(26, 31, 46, 0.3)
- Calendar rendered from JS `WEEK_DATA` array; track shifts via `translateX`
- Day cards use `flex: 0 0 80px` in flex track container

---

### 7. Onboarding Flow (`onboarding-flow.html`)
**Purpose:** Capture runner profile to generate personalized training plan

**Key Elements:**
- Welcome screen with app logo and CTA
- Progress dots showing 6-step flow
- Full-screen questions with card-based options
- Date picker for race day
- Slider for weekly mileage

**UX Flow:**
1. Welcome: Brand intro + "Let's Get Started" CTA
2. Q1: Goal race (5K, 10K, Half, Marathon)
3. Q2: Race date (date picker)
4. Q3: Experience level (Beginner, Intermediate, Advanced)
5. Q4: Current weekly mileage (slider 0-50+ miles)
6. Q5: Injury history (body diagram + notes) [not shown in current version]
7. Q6: Training schedule (day selector) [not shown in current version]

**Design Decisions:**
- Welcome screen uses brand colors to establish identity
- Progress dots (not bar) feel less pressured than linear bar
- Large card options enable confident selection
- Icons on cards provide visual distinction
- Slider shows both numeric value and "miles/week" label
- Back button appears from step 2 onward

**Technical:**
- Card selection adds .selected class for visual feedback
- Next button disabled until selection made
- Staggered animations (0.4s, 0.5s, 0.6s, 0.7s delays) on card entrance
- Date input styled to match card aesthetic

---

## Design System

### Color Palette

```css
--color-primary: #1a1f2e;      /* Deep navy - headings, primary actions */
--color-accent: #d4765f;       /* Terracotta - CTAs, accents, energy */
--color-success: #7a9b7e;      /* Sage green - completed states */
--color-warning: #e8b45a;      /* Warm yellow - alerts, caution */
--color-bg: #faf8f4;           /* Cream - background */
--color-card: #ffffff;         /* White - cards, surfaces */
--color-text: #2d3142;         /* Dark gray - body text */
--color-text-muted: #666b7a;   /* Muted gray - secondary text */
--color-border: #e8e4dc;       /* Light tan - borders, dividers */
```

### Typography

**Display Font:** DM Serif Display
- Headlines, titles, large numbers
- Adds editorial sophistication
- Use for: H1, H2, stat values, emphasized text

**Body Font:** Outfit
- Paragraphs, labels, UI elements
- Geometric sans-serif with excellent readability
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing System

8px base grid:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Border Radius

- Cards: 16px - 24px (larger cards = larger radius)
- Buttons: 12px - 14px
- Inputs: 12px - 16px
- Modals: 32px (top corners only)

### Shadows

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.08);
```

Use sparingly—shadows should enhance hierarchy, not decorate.

### Animations

**Timing:**
- Fast: 0.2s - 0.3s (micro-interactions, hover states)
- Medium: 0.4s - 0.6s (screen transitions, modals)
- Slow: 0.8s+ (loading states, success confirmations)

**Easing:**
- `ease-out` for entrances (elements appearing)
- `ease-in` for exits (elements disappearing)
- `cubic-bezier(0.4, 0, 0.2, 1)` for smooth transitions
- `cubic-bezier(0.34, 1.56, 0.64, 1)` for satisfying bounce

**Common Patterns:**
- Fade in: opacity 0 → 1
- Slide up: translateY(20px) → translateY(0)
- Scale in: scale(0.95) → scale(1)
- Staggered delays: 0.1s - 0.2s increments for sequential elements

---

## Implementation Guidelines

### Mobile-First Responsive

All screens designed for mobile (max-width: 430px). For tablet/desktop:
- Center container with max-width
- Consider side-by-side layouts for larger screens
- Maintain mobile-optimized touch targets (min 44px)

### Accessibility

**Current Implementation:**
- High contrast ratios (WCAG AA compliant)
- Large touch targets (48px minimum)
- Clear visual hierarchy
- Readable font sizes (14px minimum)

**Future Enhancements (Post-MVP):**
- ARIA labels for screen readers
- Keyboard navigation support
- Reduced motion preferences
- Color-blind safe palette validation

### Performance

**Best Practices:**
- Use CSS animations over JavaScript when possible
- Implement will-change for transformed elements
- Lazy load images and heavy content
- Use font-display: swap for web fonts

### Browser Support

Target:
- iOS 14+ (Safari)
- Android 10+ (Chrome)
- Modern evergreen browsers for web view

CSS Features Used:
- CSS Grid
- Flexbox
- CSS Variables (custom properties)
- backdrop-filter (progressive enhancement)
- CSS animations and transitions

---

## File Structure

```
designs/
├── index.html                 # Design system overview
├── today-screen.html          # Hub screen (default landing)
├── workout-detail.html        # Full workout breakdown
├── check-in-flow.html         # Post-workout check-in
├── pain-follow-up.html        # Pain capture flow
├── intervention-modal.html    # Coaching intervention
├── calendar-drawer.html       # Training calendar
├── onboarding-flow.html       # First-time user setup
└── README.md                  # This file
```

---

## Design Decisions & Rationale

### Why DM Serif Display + Outfit?

- **Distinctive identity:** Avoids generic fitness app look (no Inter, no Roboto)
- **Athletic elegance:** Serif adds editorial credibility, sans-serif ensures readability
- **Hierarchy clarity:** Serif headlines stand apart from body text

### Why terracotta accent color?

- **Warmth without aggression:** Not bright orange or neon (too energetic)
- **Athletic association:** Earthy tones connect to outdoor running
- **Unique positioning:** Differentiates from competitors' blues and purples

### Why progressive disclosure?

- **Respects runner's time:** Quick daily check-ins, detailed info when needed
- **Reduces overwhelm:** New runners aren't bombarded with metrics
- **Supports focus:** "What's my workout today?" answered immediately

### Why gesture-based calendar?

- **Mobile-native pattern:** Swipe-up feels natural on phones
- **Doesn't compete with primary content:** Calendar hidden until needed
- **Preserves screen real estate:** Today screen stays focused

---

## Next Steps

### For Development:

1. **Framework Selection:** Implement in React Native or Flutter based on PRD decision
2. **Component Library:** Break screens into reusable components (Button, Card, Slider, etc.)
3. **State Management:** Implement check-in flow logic, intervention rules, plan generation
4. **API Integration:** Connect to backend for plan storage, wearable sync, check-in data
5. **Offline Support:** Implement local caching per PRD requirements

### For Design Refinement:

1. **Interactive Prototypes:** Build clickable Figma prototype for user testing
2. **Animation Specs:** Document exact timing, easing, trigger conditions
3. **Error States:** Design validation messages, network errors, empty states
4. **Loading States:** Skeleton screens, spinners, progress indicators
5. **Accessibility Audit:** WCAG 2.1 AA compliance review

### Screens Not Yet Designed:

- Settings screen (account, preferences, notifications, wearable connections)
- Missed workout capture flow
- Return-to-running protocol after illness
- Admin dashboard for Matt (web-based)
- Day Screen: future day state
- Day Screen: past day not completed state
- Day Screen: rest day state
- Wearable connect / device setup screen *(pending wearable sync decision — see `wearable-sync-cost-comparison.md`)*

---

## Credits

**Design System:** Claude Code (Anthropic)
**Based On:** MVP PRD for CoachME
**Typography:** Google Fonts (DM Serif Display, Outfit)
**Icons:** Custom SVG paths

---

## Questions?

For questions about design decisions, implementation guidance, or additional screens needed, refer to the MVP PRD (`mvp-prd.md`) for full product context.

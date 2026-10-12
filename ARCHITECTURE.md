# Portfolio Architecture

This file describes the current architecture in plain language.
It is updated whenever routes, structure, or data flow changes significantly.

---

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Framework  | React 19 + Vite 8           |
| Language   | JavaScript (no TypeScript)  |
| Styling    | Tailwind CSS v4             |
| Routing    | React Router v7             |
| Animation  | GSAP 3 + ScrollTrigger      |

---

## Entry Points

```
index.html
  └── src/main.jsx                    — mounts React root, renders RouterProvider
        └── src/router/router.jsx      — createBrowserRouter, all routes defined here
              └── src/layouts/RootLayout.jsx — owns menu state, renders shell
                    ├── Header.jsx          — fixed top bar (wordmark + MENU trigger)
                    ├── MenuOverlay.jsx     — GSAP fullscreen menu panel
                    └── Outlet              — matched page component
```

---

## Routes

```
/                          → pages/Home.jsx
/about                     → pages/About.jsx
/work                      → pages/Work.jsx
/work/:slug                → pages/ProjectDetail.jsx
/ai-learning               → pages/AiLearning.jsx
/ai-learning/:season       → pages/AiSeason.jsx
/ai-learning/:season/:note → pages/AiNote.jsx
/lab                       → pages/Lab.jsx
/journey                   → pages/Journey.jsx
/contact                   → pages/Contact.jsx
*                          → pages/NotFound.jsx
```

---

## Folder Structure

```
src/
├── router/
│   └── router.jsx            — createBrowserRouter, all route definitions
│
├── layouts/
│   └── RootLayout.jsx        — menu state, renders Header + MenuOverlay + Outlet
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx        — fixed top bar: VIGHNESH wordmark + MENU button
│   │   ├── MenuOverlay.jsx   — GSAP fullscreen panel menu with staggered nav items
│   │   └── Footer.jsx        — minimal editorial footer: copyright, availability, native back-to-top
│   ├── opening/
│   │   └── OpeningSequence.jsx — short editorial GSAP title sequence on initial load
│   ├── transitions/
│   │   └── PageTransition.jsx — GSAP vertical panel overlay (cover/reveal)
│   └── ui/
│       ├── CustomCursor.jsx  — lightweight circular custom cursor
│       └── TransitionLink.jsx — internal link wrapper that fires the panel transition
│
├── sections/                 — page-specific content sections (not full pages)
│   ├── hero/
│   │   └── Hero.jsx          — homepage hero: editorial display type + GSAP entrance
│   ├── marquee/
│   │   └── Marquee.jsx       — continuous CSS ticker immediately after Hero
│   ├── projects/
│   │   ├── projects.css      — scoped styles for all project views
│   │   ├── ProjectPreview.jsx — editorial expandable drawer with hover fills and live demos
│   │   ├── ProjectDemos.jsx  — bespoke interactive previews: Interview AI, DevFlow, Portfolio AI, AlgoForge
│   │   ├── FloatingPoster.jsx — editorial cursor hover card tracking pointer with velocity tilt
│   │   └── SelectedWork.jsx  — homepage "Selected Work" section with scroll-scale typography
│   ├── aiLearning/
│   │   ├── aiLearning.css    — scoped styles for 3D season cards and editorial notes table
│   │   ├── SeasonCard.jsx    — tactile 3D perspective flip card with glint and ghost watermark
│   │   └── AiLearningSection.jsx — homepage section placed immediately after SelectedWork
│   ├── skills/
│   │   ├── skills.css        — scoped styles: hollow title, numbered rows, sticky panel
│   │   └── SkillsSection.jsx — Developer DNA section: two-column list + click-to-detail panel
│   ├── about/
│   │   ├── about.css         — scoped styles: centered vertical manifesto, progressive text illumination
│   │   └── AboutSection.jsx  — SC. 06 homepage section: editorial italic serif title, scroll-scrubbed word reveal
│   ├── journey/
│   │   ├── journey.css       — scoped styles: sticky indicator, sequential phase stream, focus cards
│   │   └── JourneySection.jsx — SC. 07 homepage section: 6-phase developer growth progression with sticky dossier
│   └── contact/
│       ├── contact.css       — scoped styles: bold display title, direct channels, availability dossier
│       └── ContactSection.jsx — SC. 08 homepage section: editorial CTA with direct email and social connectors
│
├── pages/                    — one file per route, composes sections
│   ├── Home.jsx              — OpeningSequence → Hero → Marquee → SelectedWork → AiLearningSection → SkillsSection → AboutSection → JourneySection → ContactSection → Footer
│   ├── Work.jsx              — /work: hero + all projects list with scroll-trigger rows
│   ├── ProjectDetail.jsx     — /work/:slug: conditional case-study layout
│   ├── About.jsx             — /about: editorial dossier, PRD Section 18 manifesto, 4 narrative chapters, stack matrix
│   ├── AiLearning.jsx        — /ai-learning: hub page with philosophy, seasons, and notes
│   ├── AiSeason.jsx          — /ai-learning/:season: curriculum overview, concepts, notes, projects
│   ├── AiNote.jsx            — /ai-learning/:season/:note: reading-first article with mental models
│   ├── Journey.jsx           — /journey: developer progression dossier, mental shifts across 6 phases, current vectors
│   ├── Contact.jsx           — /contact: dedicated contact dossier with direct channels, availability parameters, and sub-navigation
│   └── NotFound.jsx
│
├── data/                     — static data files
│   ├── projects.js           — project objects + helpers: getAllProjects, getFeaturedProjects, getProjectBySlug
│   ├── contact.js            — CONTACT_INFO: single source of truth for verified contact parameters
│   ├── aiLearning.js         — re-export bridge for aiLearning data
│   ├── skills.js             — SKILLS array: 20 tools grouped by category (Frontend, Full Stack, State, AI, Tooling, Exploring)
│   ├── journey.js            — JOURNEY_PHASES: 6 growth phases (Foundations, JS, React, Full Stack, AI, Problem Solving)
│   ├── aiLearning/           — season-based modular architecture
│   │   ├── index.js          — accessors: getAllSeasons, getSeasonBySlug, getNoteBySlug, getAllNotes
│   │   ├── season1.js        — Season 1: Foundations of AI & LLMs (notes, projects, concepts)
│   │   └── season2.js        — Season 2: Generative AI & Tool Calling (notes, projects, concepts)
│   └── transitionColors.js   — route → panel color map
│
├── main.jsx                  — React DOM root, RouterProvider
└── index.css                 — Tailwind + global design system + all component CSS
```

---

## State: Menu Open/Close

Menu state lives in `RootLayout`. No global state manager needed.

```
RootLayout (useState: isMenuOpen)
  ├── passes onMenuOpen → Header
  ├── passes isOpen + onClose → MenuOverlay
  └── renders Outlet (current page)
```

When a nav link is clicked, `MenuOverlay` detects the route change via `useLocation` and calls `onClose` automatically.

---

## Homepage Flow

```
Initial Load (Browser Entry / Hard Refresh)
→ OpeningSequence (~1.6s GSAP title reveal overlay)
    ├── VIGHNESH reveal
    ├── Architectural divider draw
    ├── PORTFOLIO / 2026 metadata
    ├── BUILD · LEARN · EXPERIMENT reveal
    └── Overlay lifts up (-100% translateY)
→ Hero (already rendered underneath, seamlessly unveiled)
→ Marquee (continuous CSS ticker: REACT · JAVASCRIPT · FULL STACK · AI …)
→ SelectedWork (scroll-scale title, drawer expansion, bespoke interactive live demos)
→ AiLearningSection (split character title entrance, tactile 3D season cards, CTA bar)
→ SkillsSection (hollow outline SKILLS title, two-column numbered list, sticky click-to-detail panel)
→ AboutSection (SC. 06 — ABOUT, italic serif title, centered vertical display manifesto, scroll-scrubbed word illumination, CTA to /about)
→ JourneySection (SC. 07 — JOURNEY, 6-phase growth stream, sticky progress counter, CTA to /journey)
→ ContactSection (SC. 08 — GET IN TOUCH, bold display typography, verified GitHub channel, conditional links)
→ Footer (SC. 09 — minimal editorial colophon, availability indicator, native back-to-top)
```

- **Replay Prevention:** In-memory session flag prevents OpeningSequence from replaying on internal SPA navigation (Home → Work → Home).
- **Reduced Motion:** When `prefers-reduced-motion` is active, OpeningSequence is skipped and Marquee/GSAP animations are disabled.

---

## AI Learning Architecture & Data Flow

```
src/data/aiLearning/ (modular season files)
  ├── season1.js               — Season 1: Foundations of AI & LLMs (notes, projects)
  ├── season2.js               — Season 2: Generative AI & Tool Calling (notes, projects)
  ├── season3.js               — Season 3: Upcoming curriculum placeholder
  ├── season4.js               — Season 4: Upcoming curriculum placeholder
  ├── season5.js               — Season 5: Upcoming curriculum placeholder
  └── index.js                 — Accessor functions:
        getAllSeasons()        → AiLearningSection.jsx (Home), AiLearning.jsx (/ai-learning)
        getAllNotes()          → AiLearning.jsx (/ai-learning notes directory)
        getSeasonBySlug(slug)  → AiSeason.jsx (/ai-learning/:season)
        getNoteBySlug(s, n)    → AiNote.jsx (/ai-learning/:season/:note)
```

- **Scroll-Driven Choreography & Pinning (5 Seasons):** Recreates the reference certificate section scroll experience across all 5 seasons (`01` through `05`). On desktop, the viewport pins (`pin: true`) while the left editorial anchor remains stationary. As the user scrolls, each card smoothly glides leftward while upcoming cards sweep into prime focus with staggered rotation and scale leveling, accompanied by an animated progress counter line (`01 ───── 05`).
- **Decoupled Transform Architecture:** Avoids transform collisions by isolating motion into three nested wrappers:
  1. `SeasonCardMotionWrapper` (.season-card-motion): Animated by GSAP timeline for scroll position, rotation, and scale.
  2. `SeasonCardTiltWrapper` (.season-card__tilt-wrapper): Controlled by pointer moves for subtle 3D tilt.
  3. `SeasonCardFlipper` (.season-card__flipper): Controls 180° flip (rotateY) on click.
- **Reading-First Notes:** `/ai-learning/:season/:note` prioritizes readability and mental models without intrusive sticky animations.
- **Attribution & Integrity:** Clearly attributes Namaste AI while documenting Vighnesh's personal understanding; uncompleted topics are honestly tagged with upcoming placeholders.

---

## Skills Architecture & Real Project Mapping

- **Visual Hover vs. Interaction Click:** Following the reference site, hover over a skill row triggers a visual-only pill background and color inversion. The right inspector panel updates **only on click or keyboard activation** (`Enter` / `Space`).
- **Dynamic Project Mapping:** When a skill is selected, `SkillsSection.jsx` queries `projects.js` to find all projects that explicitly list the skill in their `technologies` array. Selected projects are rendered as clickable pill badges linking directly to their case studies. Skills without a documented project display an honest `"NO DOCUMENTED PROJECT YET"` fallback.

---

## Project Data Flow

```
src/data/projects.js                 — single source of truth
  getAllProjects()         → Work.jsx
  getFeaturedProjects()   → SelectedWork.jsx
  getProjectBySlug(slug)  → ProjectDetail.jsx
```

`ProjectPreview` is a reusable expandable drawer component shared between `SelectedWork` (homepage) and `Work` (/work). It receives `project`, `isOpen`, `onToggle`, and `onHover` props, rendering bespoke interactive demos from `ProjectDemos.jsx` and triggering the pointer-tracking `FloatingPoster.jsx`.

`ProjectDetail` renders conditionally — sections only mount when data is present. An invalid slug renders an editorial 404 block instead of crashing.

---

## Navigation: TransitionLink

All internal project navigation uses `<TransitionLink>` to trigger the existing vertical color-panel page transition. `/work` and `/work/:slug` map to the burnt orange panel color (`#b85c38`) via `transitionColors.js`.

---

## Contact & Footer Architecture

```
src/data/
  └── contact.js            — verified contact single source of truth (GitHub, location, availability)

src/sections/contact/
  ├── contact.css           — scoped styles: bold display heading, mailto hover underline, availability dossier
  └── ContactSection.jsx    — homepage SC. 08 section with coordinated GSAP ScrollTrigger entrance

src/components/layout/
  └── Footer.jsx            — minimal editorial footer: copyright, availability, native back-to-top

src/pages/
  └── Contact.jsx           — dedicated /contact dossier with direct channel cards and technical availability parameters
```

- **Factual Integrity & Conditional Channels:** Single source of truth in `src/data/contact.js`. Renders verified channels (`github.com/vighnesh204`) and omits unconfirmed emails or generic URLs. Zero form bloat, no third-party email APIs.
- **Micro-interactions:** Custom cursor states (`data-cursor="open"`), underline expansion, and native smooth scrolling to top respecting `prefers-reduced-motion`.
- **Rhythm:** Seamless transition from Journey phase 6 directly into the Contact architectural hairline divider and display title.

---

## Notes

- No TypeScript. JavaScript only.
- No smooth-scroll libraries. Native browser scroll only.
- Animations use GSAP (transform + opacity only). All ScrollTrigger instances are cleaned up on component unmount.
- Page transitions use full-height vertical color panels (not grids or tiles).
- Gemini AI assistant will require a server-side API route (Phase 3+).
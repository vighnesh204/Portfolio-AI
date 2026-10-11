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
│   │   └── MenuOverlay.jsx   — GSAP fullscreen panel menu with staggered nav items
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
│   └── marquee/
│       └── Marquee.jsx       — continuous CSS ticker strip immediately after Hero
│
├── pages/                    — one file per route, composes sections
│   ├── Home.jsx              — renders <OpeningSequence />, <Hero />, <Marquee />
│   ├── About.jsx
│   ├── Work.jsx
│   ├── ProjectDetail.jsx
│   ├── AiLearning.jsx
│   ├── AiSeason.jsx
│   ├── AiNote.jsx
│   ├── Lab.jsx
│   ├── Journey.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
│
├── data/                     — static data files
│   ├── projects.js           — project list for /work routes
│   ├── aiLearning.js         — Namaste AI season/note data
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

## Homepage Flow: Opening & Marquee

```
Initial Load (Browser Entry / Hard Refresh)
→ OpeningSequence (~1.6s GSAP title reveal overlay)
    ├── VIGHNESH reveal
    ├── Architectural divider draw
    ├── PORTFOLIO / 2026 metadata
    ├── BUILD · LEARN · EXPERIMENT reveal
    └── Overlay lifts up (-100% translateY)
→ Hero (already rendered underneath, seamlessly unveiled)
→ Marquee (continuous CSS ticker: REACT · JAVASCRIPT · FULL STACK · AI · BUILD · LEARN · EXPERIMENT · REPEAT)
```

- **Replay Prevention:** In-memory session flag prevents OpeningSequence from replaying on internal SPA navigation (Home → Work → Home).
- **Reduced Motion:** When `prefers-reduced-motion` is active, OpeningSequence is skipped immediately and Marquee animation pauses.

---

## Planned Additions (Phase 5+)

- `src/components/transitions/PageTransition.jsx` — vertical color panel transition (added to RootLayout)
- `src/components/ui/` — reusable UI primitives
- `src/animations/` — GSAP helpers (only if multiple pages share the same logic)

---

## Data Flow (Phase 1)

Pages are static placeholders.
No props, no state, no API calls yet.

---

## Notes

- No TypeScript. JavaScript only.
- No smooth-scroll libraries. Native browser scroll only.
- Animations will use GSAP (transform + opacity only where possible).
- Page transitions will use full-height vertical color panels (not grids or tiles).
- Gemini AI assistant will require a server-side API route (Phase 3+).
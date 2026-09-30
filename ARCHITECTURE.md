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
  └── src/main.jsx              — mounts React root, renders RouterProvider
        └── src/router/router.jsx — createBrowserRouter, all routes defined here
              └── src/layouts/RootLayout.jsx — common layout shell (Outlet)
                    └── src/pages/*.jsx       — matched page component
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
│   └── router.jsx       — createBrowserRouter, all route definitions
│
├── layouts/
│   └── RootLayout.jsx   — common shell, renders <Outlet />
│
├── pages/               — one file per route
│   ├── Home.jsx
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
├── components/          — shared UI components (Phase 2+)
│   └── layout/
│       └── Header.jsx   — stub, not yet rendered
│
├── data/                — static data files (Phase 2+)
│   ├── projects.js      — project list for /work routes
│   └── aiLearning.js    — Namaste AI season/note data
│
├── main.jsx             — React DOM root, RouterProvider
└── index.css            — Tailwind CSS import
```

---

## Planned Additions (Phase 2+)

- `src/components/layout/Nav.jsx` — fullscreen menu (added to RootLayout)
- `src/components/transitions/PageTransition.jsx` — vertical panel transition (added to RootLayout)
- `src/components/ui/` — reusable UI primitives
- `src/animations/` — GSAP reusable animation helpers (if needed)

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
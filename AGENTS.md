# Vighnesh Portfolio — Development Rules

## Source of Truth

Read @docs/PRD.md before making major architecture, UI, UX, or animation decisions.

The PRD defines the product.
This file defines permanent engineering rules.

---

## Technology

Use:

- React
- Vite
- JavaScript only
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- React Router

Gemini must use a server-side API route when implemented.

Never introduce TypeScript.

---

## Dependencies

Do not add new dependencies unless absolutely necessary.

Do not add without explicit approval:

- Three.js
- React Three Fiber
- Framer Motion
- Lenis
- Redux
- Material UI
- Bootstrap
- shadcn
- large UI libraries
- LangChain
- vector databases

Prefer React, CSS, Tailwind and GSAP.

---

## Design Direction

The website must feel:

- handcrafted
- premium
- editorial
- Awwwards-inspired
- modern
- intentional

It must NOT look like a generic AI-generated website.

Avoid:

- excessive gradients
- purple AI aesthetics
- glowing blobs
- excessive glassmorphism
- generic card grids
- generic AI illustrations
- excessive rounded containers
- meaningless animations

Use typography, composition, whitespace and purposeful motion.

---

## Navigation

Use a minimal premium automotive-inspired navigation.

Do not directly copy Lamborghini.

Route transitions use:

full-height vertical color panels

NOT:

- squares
- pixel tiles
- grids

Transition sequence:

navigation click
→ panels cover viewport
→ route changes
→ scroll resets
→ panels reveal new page.

---

## Animation

GSAP is the primary animation library.

Prefer:

- transform
- opacity

Avoid unnecessary layout animations.

Animations must have a purpose.

Support prefers-reduced-motion.

Simplify expensive animation on mobile.

---

## Performance

Performance is a product feature.

- Keep bundle size small.
- Avoid unnecessary packages.
- Lazy-load secondary content.
- Optimize images.
- Prefer WebP or AVIF.
- Avoid large background videos.
- Avoid continuous expensive animations.
- Avoid unnecessary React re-renders.
- Avoid huge DOM trees.
- Use native browser scrolling.
- Do not introduce smooth-scroll libraries.

---

## React Code Style

Keep code simple and easy to understand.

Use functional components.

Use JavaScript, never TypeScript.

Use descriptive names.

Prefer small understandable components.

Do not over-engineer.

Do not create unnecessary hooks, contexts or utility layers.

Keep data separate from presentation where useful.

Prefer:

const handleMenuOpen = () => {
  setIsMenuOpen(true);
};

over clever compressed code.

---

## Existing Code

Before editing:

1. inspect the current implementation,
2. understand existing patterns,
3. reuse existing components,
4. modify only necessary files.

Do not rewrite unrelated working code.

Do not redesign approved sections unless explicitly requested.

---

## Content

Never invent:

- Vighnesh's skills
- achievements
- work experience
- Namaste AI progress
- projects
- course notes
- metrics

Use placeholders when real information has not yet been provided.

Clearly identify placeholders.

---

## Documentation

Maintain:

- README.md
- ARCHITECTURE.md

When routes, architecture, important components or data flow changes, update ARCHITECTURE.md.

ARCHITECTURE.md must stay simple enough for Vighnesh to understand later.

---

## Verification

After meaningful implementation:

- run production build
- fix build errors
- check browser console
- check responsive behavior
- preserve accessibility
- verify existing functionality

Never claim something works without checking it.
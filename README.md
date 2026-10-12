# Vighnesh — Developer Portfolio

A premium, handcrafted developer portfolio built with React, Vite, Tailwind CSS, GSAP, and React Router.
Features an integrated AI portfolio guide powered by the Gemini API (server-side, free tier).

---

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4**
- **React Router v7**
- **GSAP 3** + ScrollTrigger
- **Gemini API** (free tier, server-side only via Vercel serverless)

---

## Setup

```bash
# Install dependencies
npm install

# Start dev server (frontend only)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## AI Portfolio Guide Setup

The Ask Vighnesh section requires a free Gemini API key.

**1. Copy the example environment file:**

```bash
cp .env.example .env.local
```

**2. Paste your Gemini Free Tier API key:**

```
GEMINI_API_KEY=your_key_here
```

Get a free key at: https://aistudio.google.com/apikey

**3. Optionally override the model (default: `gemini-2.0-flash-exp`):**

```
GEMINI_MODEL=gemini-2.0-flash-exp
```

**4. Local development with AI endpoint:**

Plain `npm run dev` runs the frontend only.
To test the serverless endpoint locally, install the Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

Without the Vercel CLI, the AI guide displays a graceful "unavailable" fallback.
The rest of the portfolio works normally.

**5. Deploy to Vercel:**

Push to GitHub. Vercel auto-detects Vite + `api/` serverless functions.
Add `GEMINI_API_KEY` as an environment variable in your Vercel project settings.

> **Security:** Never commit `.env.local`. The key is read server-side only.
> It is never exposed to the browser, never in `VITE_*` variables, and never in the bundle.

---

## Project Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a full breakdown of the folder structure, routes, and data flow.

---

## Development Rules

See [AGENTS.md](./AGENTS.md) for the permanent engineering rules that govern this project.

---

## Status

**Phase 3 — Ask Vighnesh AI complete.**

All homepage sections implemented:
Opening → Hero → Marquee → Projects → Namaste AI → Skills → About → Journey → Contact → Ask Vighnesh → Footer

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server (localhost:3000)
npm run build        # production build
npm run start        # run production server
npm run lint         # ESLint (eslint-config-next)
```

No test runner is configured.

## Architecture

Single-page Next.js App Router portfolio site. All page content lives in `app/page.tsx`, which assembles every section (hero, about, projects, experience, education, skills, publication, contact, footer) inline.

**Entry points**
- `app/layout.tsx` — global metadata, loads Google Fonts via `next/font` and exposes `--font-body` (Inter) and `--font-display` (Space Grotesk) as CSS variables used throughout.
- `app/page.tsx` — sole composition root; imports all components and `data/projects.ts`.

**Components**
- `JarvisBg` — `'use client'` canvas animation (stars, orbits, HUD labels) fixed at `z-index: 0` behind all content.
- `HeroPortrait` — `'use client'` video card with mouse-tilt 3D transform and autoplay-on-hover logic.
- `ProjectCard` — `'use client'` card that opens a fullscreen lightbox via `createPortal` into `document.body` at `z-index: 2147483647`, bypassing any stacking-context issues with the canvas.
- `Navbar`, `SectionHeading` — server components (no browser APIs needed).

**Data**
- `data/projects.ts` exports the `Project` type and the `projects` array. To add or update a project, edit only this file. The `Project` type fields: `slug`, `title`, `description`, `tags` (required); `cover`, `spreads`, `year`, `status`, `link`, `downloadFile`, `downloadLabel` (optional).
- Project spread images go in `public/projects/<slug>/`. The lightbox prefers `spreads` over `cover`.

**Styling**
- Tailwind 4 — imported via `@import "tailwindcss"` in `globals.css` (not the legacy `@tailwind` directives).
- Design tokens live in `globals.css` `:root`: `--background: #080810`, `--cyan`, `--cyan-dim`, `--cyan-mid`.
- Portrait card layout (glow, grid overlay, tilt animation) is implemented as named CSS classes in `globals.css` (`portrait-wrap`, `portrait-card`, `portrait-glow`, `portrait-grid`) rather than Tailwind utilities, because they require pseudo-elements and complex layering.
- Maintain the cyan HUD aesthetic: `cyan-500/10` borders, `white/[0.03]` backgrounds, `font-mono text-[10px] uppercase tracking-widest` labels.

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

Next.js App Router portfolio site, being redesigned per `../website-redesign-brief.md` (Phase 1 done: case-study structure).

**Routes**
- `app/layout.tsx` — global metadata (title template), fonts (`--font-body` Inter, `--font-display` Space Grotesk), and the shared shell: `Cursor`, `JarvisBg`, `Navbar`, `Footer`.
- `app/page.tsx` — home: hero, selected work (`featuredProjects`), short about, contact.
- `app/projects/[slug]/page.tsx` — case-study page, statically generated from `data/projects.ts` (`dynamicParams = false`).
- `app/about/page.tsx` — bio, experience, education, skills, publication (content from `data/site.ts`).

**Content rules**
- Never invent project facts. Empty case-study fields render a `Placeholder` (dev only) and are hidden in production.
- Projects with `draft: true` appear only in `npm run dev`.

**Components**
- `JarvisBg` — `'use client'` canvas animation (stars, orbits, HUD labels) fixed at `z-index: 0` behind all content.
- `HeroPortrait` — `'use client'` video card with mouse-tilt 3D transform and autoplay-on-hover logic.
- `ProjectCard` — server component; links to `/projects/<slug>`, first spread is the cover.
- `Gallery` + `Lightbox` — `'use client'`; lightbox portals into `document.body` at `z-index: 2147483647` to sit above the canvas.
- `Placeholder` — dashed "To fill in" box shown only when `NODE_ENV === 'development'`.
- `Navbar`, `Footer`, `Contact`, `SectionHeading` — server components.

**Data**
- `data/projects.ts` — `Project` type (hook, year, status, tags, spreads, plus case-study fields: context, role, team, stack, problems[{problem, decision}], outcome, links) and helpers `visibleProjects`, `featuredProjects`, `getProject`.
- `data/site.ts` — personal links, experience, education, skills, publications.
- Project images go in `public/projects/<folder>/` (no spaces in names).

**Styling**
- Tailwind 4 — imported via `@import "tailwindcss"` in `globals.css` (not the legacy `@tailwind` directives).
- Design tokens live in `globals.css` `:root`: `--background: #080810`, `--cyan`, `--cyan-dim`, `--cyan-mid`.
- Portrait card layout (glow, grid overlay, tilt animation) is implemented as named CSS classes in `globals.css` (`portrait-wrap`, `portrait-card`, `portrait-glow`, `portrait-grid`) rather than Tailwind utilities, because they require pseudo-elements and complex layering.
- Maintain the cyan HUD aesthetic: `cyan-500/10` borders, `white/[0.03]` backgrounds, `font-mono text-[10px] uppercase tracking-widest` labels.

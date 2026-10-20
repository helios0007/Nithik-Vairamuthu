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
- `app/page.tsx` — home, one long page (Kantwon-style): hero with photo, "Who is this guy?", work, published, contact.
- `app/projects/[slug]/page.tsx` — case-study page, statically generated from `data/projects.ts` (`dynamicParams = false`).
- `app/about/page.tsx` — full bio, experience, education, toolbox (content from `data/site.ts`).

**Content rules**
- Never invent project facts. Empty case-study fields render a `Placeholder` (dev only) and are hidden in production.
- Projects with `draft: true` appear only in `npm run dev`.

**Components**
- `ProjectCard` — server component; links to `/projects/<slug>`, first spread is the cover.
- `Gallery` + `Lightbox` — `'use client'`; lightbox portals into `document.body`.
- `Placeholder` — dashed "To fill in" box shown only when `NODE_ENV === 'development'`.
- `Navbar`, `Footer`, `Contact` — server components.

**Data**
- `data/projects.ts` — `Project` type (hook, year, status, tags, spreads, plus case-study fields: context, role, team, stack, problems[{problem, decision}], outcome, links) and helpers `visibleProjects`, `featuredProjects`, `getProject`.
- `data/site.ts` — personal links, experience, education, skills, publications.
- Project images go in `public/projects/<folder>/` (no spaces in names).

**Styling**
- Tailwind 4 — imported via `@import "tailwindcss"` in `globals.css` (not the legacy `@tailwind` directives).
- Simple Kantwon-inspired layout on a dark charcoal theme (#111214): light text, one blue accent (#6e8bff), big bold headings, thin dividers. No background animations.
- Design tokens in `globals.css` `@theme`: `paper` (background), `paper-2` (cards), `ink` (text), `muted`, `line`, `accent` → use as `bg-paper`, `text-muted`, `border-line`, `text-accent`, etc. Filled buttons are `bg-ink text-paper`. Never hard-code white/black.
- Font: DM Sans via `next/font` (`--font-body`).
- Images: hero = `public/portrait-pixel.webp` (pixel art, framed); About = `public/portrait-cutout.webp` (photo with background removed); `PP.webp` is the original photo (used for structured data).
- Git: work on the `redesign` branch and push there; `main` is the live site.

**SEO, sharing, analytics**
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` + `app/projects/[slug]/opengraph-image.tsx` (shared look in `lib/og.tsx`); Person JSON-LD on the home page; canonical URLs per page. `siteUrl` lives in `data/site.ts`.
- Vercel Web Analytics + Speed Insights in `app/layout.tsx` (cookieless).
- Short links in `next.config.ts`: `/cv` → resume PDF, `/portfolio` → flipbook.
- Images are WebP in `public/` (converted from PNG, max 3000px wide); spreads render at `quality={90}` (allowed in `images.qualities`). Use `preload` (not the deprecated `priority`) for above-the-fold images.
- Availability block (`components/Availability.tsx`) reads `availability` in `data/site.ts`.

# Copilot instructions for this repository

## Build, test, and lint

Use npm in this repo (`package-lock.json` is committed).

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build production bundle: `npm run build`
- Start production server: `npm run start`
- Lint: `npm run lint`
- Tests: no automated test runner is currently configured (no `test` script in `package.json`), so there is no single-test command yet.

## High-level architecture

This is a Next.js App Router portfolio site with a single main page.

- `app/layout.tsx` sets global metadata, loads Google fonts via `next/font`, and exposes font CSS variables used by global styles.
- `app/page.tsx` is the main composition root: it assembles sections (hero/about/projects/contact/footer) and wires shared UI components.
- `components/` holds presentational building blocks (`Navbar`, `SectionHeading`, `ProjectCard`) plus client-side interactive visuals (`HeroPortrait`, `JarvisBg`).
- `data/projects.ts` is the typed source of truth for project cards; `app/page.tsx` maps this data into `ProjectCard` links.
- Styling is split between Tailwind utility classes in JSX and custom global classes/variables/animations in `app/globals.css`.

## Key conventions

- Follow the assistant rule already used in this repo (`AGENTS.md`, referenced by `CLAUDE.md`): this Next.js version may differ from older defaults; consult `node_modules/next/dist/docs/` when touching framework-specific APIs.
- Keep interactive/browser-API components as client components (`"use client"`), as done in `HeroPortrait.tsx` and `JarvisBg.tsx`.
- Keep homepage content composition in `app/page.tsx`, and keep reusable section UI in `components/` rather than embedding repeated patterns inline.
- When adding/editing project entries, update `data/projects.ts` using the existing `Project` type (`slug`, `title`, `description`, `tags`) so card rendering and route links stay consistent.
- Preserve the current visual system: cyan HUD aesthetic, font variables (`--font-body`, `--font-display`), and shared global classes defined in `app/globals.css`.

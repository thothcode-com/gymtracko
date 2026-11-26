# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

Live site = `project-react/` (React 19 + TypeScript + Vite 8 landing page for GYMTRACKO, Spanish copy, deployed to gymtracko.com). Repo root `__index.html`, `_index.html`, `css/`, `video/`, `teste.jpg` = legacy static version before the React migration; not built or deployed. Ignore unless asked.

All commands run from `project-react/`.

## Commands

```bash
npm run dev      # vite dev server (renders client-side, no prerender)
npm run build    # tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs
npm run lint     # oxlint (config: .oxlintrc.json)
npm run preview  # serve dist/
```

No test suite. Type-check = `tsc -b` (part of build). Both `package-lock.json` (used by CI via `npm ci`) and `pnpm-lock.yaml` exist; keep `package-lock.json` in sync when changing deps or CI breaks.

## Architecture

- **Build is a 4-step SSG pipeline**, not plain Vite. `src/entry-server.tsx` exports `render()` (`renderToString(<App />)`); `scripts/prerender.mjs` injects that HTML into `dist/index.html`, inlines the CSS, defers the JS bundle to the `load` event, preloads fonts, and emits SEO tags (JSON-LD, canonical/og tags, `sitemap.xml`, `robots.txt` line). `src/main.tsx` hydrates (`hydrateRoot`) when root has children, else `createRoot` (dev). Consequence: components must be SSR-safe and hydration-stable (no `window`/`document` during render; browser-only effects go in hooks/effects). Set `SITE_URL` env at build to emit absolute URLs (CI uses `https://gymtracko.com`).
- **`src/App.tsx`** composes sections in order inside `<main>`. Heavy effects (`SmoothScroll` via Lenis, `GridCanvas`, `ParticleCanvas`) mount only after `useIdleReady()` so first paint stays fast.
- **Data-driven content**: repeated content lives as typed arrays in `src/data/` (`admin`, `adminMock`, `timeline`, `navServices`, `contact`) and is `.map()`ped in components. Edit copy/contact info there, not in JSX.
- **Browser side effects** (observers, canvas, scroll/mouse listeners) live in `src/hooks/`, never inline in section components.
- **Static assets/SEO** in `public/`: `CNAME`, `llms.txt`, `robots.txt`, brand SVG/PNGs, responsive hero webp, `hero.mp4`, plus standalone legal pages (`privacy/`, `terms/`, `delete-account/` with `css/legal.css`) served as-is, outside React.
- **Deploy**: `.github/workflows/deploy.yml` builds on push to `main` and publishes `project-react/dist` to GitHub Pages (Node 22, `npm ci`). `predeploy`/`deploy` scripts (`gh-pages`) are legacy.

## Conventions

Full spec in `project-react/design-system.md` (Portuguese). Key points:

- One folder per component: `Component.tsx` + `Component.module.css`.
- CSS Modules with BEM scoped to the module: block implicit (`.nav`), `.nav__element`, `.nav--modifier`. Combine classes via template strings with `styles['nav--scrolled']`.
- Keyframes are global in `src/styles/animations.css` (not a module). Reference from a `.module.css` with `animation: global(fadeUp) ...`, not `:global(...)`.
- Design tokens in `src/styles/variables.css` (dark bg `--bg`, single accent `--orange`, `--font-display` Barlow Condensed / `--font-body` Barlow). Use tokens, not hardcoded colors; semantic green/red/amber only in the admin mockup.
- Each page section is a `<section id="...">` with `position: relative; z-index: 10` in its root block (sits above the canvas backgrounds).
- Fonts are bundled via `@fontsource/barlow*` (design-system.md still mentions Google Fonts; outdated). Prerender preloads specific woff2 names (`barlow-condensed-latin-900-normal`, `barlow-latin-300-normal`); update the list in `prerender.mjs` if font weights change.

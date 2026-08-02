# AIR Website Technology Stack

Overview of the public marketing site (`air-website`). This is a Vite SPA, not the Next.js stack used on [gyrogovernance.com](https://gyrogovernance.com). Domain docs and the Node/desktop architecture live elsewhere (`docs/ARCHITECTURE.md`, `docs/AIR/`).

---

## Getting Started

```bash
bun install              # preferred; npm install also works
bun run sync:air-craft   # refresh Craft list from GitHub (also runs in build)
bun run dev              # Vite dev server
bun run build            # sync AIR-Craft.md → tsc → vite → SPA 404.html
bun run preview          # preview production build
bun run lint             # oxlint
```

Env (see `.env.example`):

| Variable | Role |
|----------|------|
| `VITE_FORMEASY_URL` | FormEasy Apps Script web app URL (forms POST) |
| `VITE_SITE_URL` | Canonical origin for SEO / JSON-LD (default `https://air.gyrogovernance.com`) |
| `VITE_AIR_CRAFT_MD_URL` | Optional Craft markdown URL (build sync + runtime fetch) |
| `AIR_CRAFT_MD_URL` | Optional Craft markdown URL (build sync only) |

---

## Core Stack

| Layer | Choice | Notes |
|-------|--------|--------|
| Runtime / PM | Bun (preferred) or npm | Lockfiles: `bun.lock`, `package-lock.json`. CI: `bun install --frozen-lockfile` |
| Bundler | Vite 8 (`^8.2.0`) + `@vitejs/plugin-react` | SPA; no SSR |
| UI | React 19 + React DOM 19 | Client components only |
| Routing | React Router 7 (`createBrowserRouter`) | Data router + `ScrollRestoration` |
| Language | TypeScript ~6 | App/node project refs via `tsc -b`; relative imports; JSON import of Craft snapshot (`resolveJsonModule`) |
| Styling | Tailwind CSS 3.4 + PostCSS + Autoprefixer | Tokens and glass utilities in `src/index.css` |
| Motion / WebGL | Framer Motion, OGL (`Strands`) | Hero strands on Home |
| Icons | Lucide React | Nav, theme, CTAs |
| Lint | Oxlint | Flat `.oxlintrc.json` (react / typescript / oxc plugins) |
| Forms | FormEasy (Fund only) | `VITE_FORMEASY_URL` POST from `/superintelligence/fund`. Craft + Fellowship use GitHub Issue Forms / Discussions in [air-craft](https://github.com/gyrogovernance/air-craft) |
| Craft list | Build sync + live fetch of `AIR-Craft.md` | [gyrogovernance/air-craft](https://github.com/gyrogovernance/air-craft); rebuilt there from seed + `submission` issues; see Scripts |

**Not used here (by design):** Next.js App Router, markdown article CMS, RSS, docs filesystem routes, Recharts, Google Analytics (yet).

---

## Scripts

| npm script / file | Role |
|-------------------|------|
| `sync:air-craft` → `scripts/sync-air-craft.mjs` | GET `AIR-Craft.md`, parse `### Domain` blocks, write `src/data/airCraft.generated.json` (`fetchedAt`, `source`, `sourceStatus`, `seo`, `projects`). Fallback: existing generated file → hardcoded seed. |
| `scripts/copy-spa-fallback.mjs` | After Vite build, copy `dist/index.html` → `dist/404.html` for GitHub Pages deep links |
| `build` | `sync-air-craft` → `tsc -b` → `vite build` → `copy-spa-fallback` |
| `dev` / `lint` / `preview` | Vite / Oxlint / preview |

---

## App Structure

```
air/
├── index.html                 # Shell + default meta / OG
├── package.json, bun.lock, package-lock.json
├── vite.config.ts
├── tsconfig.json, tsconfig.app.json, tsconfig.node.json
├── tailwind.config.js, postcss.config.js
├── .oxlintrc.json, .env.example
├── vercel.json                # SPA rewrite + asset cache headers
├── CNAME                      # air.gyrogovernance.com (also public/CNAME)
├── .github/workflows/
│   └── deploy-pages.yml       # GitHub Pages: push, daily cron, manual
├── scripts/
│   ├── sync-air-craft.mjs     # Bake AIR-Craft.md into generated JSON
│   └── copy-spa-fallback.mjs  # dist/404.html for Pages
├── public/
│   ├── robots.txt
│   ├── sitemap.xml            # Static URL list (forms omitted)
│   ├── favicon.svg, icons.svg
│   ├── _redirects             # Netlify SPA fallback
│   └── CNAME
├── src/
│   ├── main.tsx
│   ├── router.tsx             # Route table + legacy /index redirects
│   ├── index.css              # Tailwind + glass / theme tokens
│   ├── data/
│   │   └── airCraft.generated.json
│   ├── lib/
│   │   ├── seo.ts             # Site URL, keywords, per-route meta (+ Craft SEO)
│   │   ├── airCraft.ts        # Parse / fetch / BUILD_* snapshot
│   │   └── nav.ts             # Primary nav tree
│   ├── components/
│   │   ├── RootLayout.tsx     # Nav, main, footer, Seo, JSON-LD
│   │   ├── Seo.tsx            # Route-aware document head
│   │   ├── StructuredData.tsx # Organization / WebSite schema
│   │   ├── Navbar.tsx / MobileMenu.tsx / Footer.tsx
│   │   ├── GlassCard.tsx / Section.tsx
│   │   ├── PrototypePill.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Strands.tsx (+ Strands.css)
│   └── pages/
│       ├── Home.tsx, About.tsx, Infrastructure.tsx
│       ├── Craft.tsx, CraftSubmit.tsx, Superintelligence.tsx
│       ├── FellowshipJoin.tsx, FormPage.tsx (fund only)
│       └── Privacy.tsx, Cookies.tsx
└── docs/dev/
    ├── CONTENT.md             # Routes + copy outline
    └── TECH_STACK.md          # ← this file
```

### Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/infrastructure` | Human Capacity Development Infrastructure |
| `/craft` | AIR-Craft (datasets, tools, reports) |
| `/craft/form` | CraftSubmit  -  GitHub Issue Form instructions |
| `/superintelligence` | Collective Superintelligence + fellowship |
| `/superintelligence/form` | FellowshipJoin  -  GitHub Discussions introduction |
| `/superintelligence/fund` | FormPage  -  FormEasy fund support |
| `/privacy`, `/cookies` | Legal |
| `/index` | Redirect → `/craft` |
| `/index/form` | Redirect → `/craft/form` |

SPA deep-link strategies:

- GitHub Pages: `dist/404.html` (copy of `index.html`) via `copy-spa-fallback.mjs`
- Vercel: `vercel.json` rewrites to `/index.html`
- Netlify: `public/_redirects` (`/* /index.html 200`)

---

## Design System (site)

- **Font:** Nunito (Google Fonts), CSS var `--font-nunito`
- **Theme:** Class-based `dark` on `<html>`; light / dark / system toggle; preference in `localStorage`
- **Glass:** Custom cards and floating nav (aligned with Gyro Governance visual language, implemented in-repo rather than Next liquid-glass modules)
- **Palette:** Classic CSS vars (`--classic-blue`, emerald CTAs, blob gradients)
- **Status:** `PrototypePill` on Home and on craft/fellowship forms

---

## SEO (current)

| Piece | Location |
|-------|----------|
| Default title / description / OG / Twitter | `index.html` |
| Per-route title, description, canonical, OG | `src/lib/seo.ts` + `src/components/Seo.tsx` |
| JSON-LD Organization + WebSite | `src/components/StructuredData.tsx` |
| Crawl rules + AI bots | `public/robots.txt` |
| URL list | `public/sitemap.xml` (hand-maintained; includes home, about, infrastructure, craft, craft/form, superintelligence, superintelligence/form, superintelligence/fund, privacy, cookies) |
| Canonical base | `VITE_SITE_URL` (default `https://air.gyrogovernance.com`) |
| Craft project list + `/craft` meta | `airCraft.generated.json` → `BUILD_AIR_CRAFT_SEO` / `BUILD_AIR_CRAFT_PROJECTS` |

**Craft SEO timing:** Description and keywords for `/craft` are baked at build. Daily CI (and every push build) refreshes them from latest `AIR-Craft.md`. Client live fetch updates on-page cards only; it does **not** rewrite document head / OG until the next deploy.

**Scope note:** This site has no article corpus. SEO is page-level plus internal links to Gyro Governance research (THM, GGG). Future options: prerender/SSG for richer OG on non-home routes, glossary, Search Console.

Keyword themes (natural use, not stuffing): alignment infrastructure, AI safety, AI governance, uniform power distribution, collective superintelligence, independent AI safety research, The Human Mark / deceptive alignment / jailbreak testing (Infrastructure), fellowship / human capacity development.

---

## Deployment

Designed as a static Vite export (`dist/`):

- **Primary:** GitHub Pages via `.github/workflows/deploy-pages.yml`
  - Triggers: push to `main`, cron `0 6 * * *` (06:00 UTC daily  -  refresh Craft SEO fallback), `workflow_dispatch`
  - Runtime: `oven-sh/setup-bun@v2`, `bun install --frozen-lockfile`, `bun run build`
  - Build env: `VITE_SITE_URL=https://air.gyrogovernance.com`; `VITE_FORMEASY_URL` from GitHub secret `VITE_FORMEASY_URL`
  - Artifact: `dist/` (includes `404.html` SPA fallback); `actions/deploy-pages@v4`
  - Custom domain: `CNAME` / `public/CNAME` → `air.gyrogovernance.com`
- Each build runs `sync-air-craft` so the Craft list + `/craft` meta are baked from the latest `AIR-Craft.md` (falls back to previous generated file or seed if GitHub is unreachable)
- Also works on Vercel / Netlify / Cloudflare Pages / any static host (`vercel.json`, `public/_redirects`)

---

## Performance Targets

Same order of magnitude as the main lab site:

- Lighthouse Performance: 95+
- LCP < 2.5s, CLS < 0.1
- Prefer static assets, lazy WebGL only where used, minimal client JS

---

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Relies on CSS custom properties, Flexbox/Grid, ES2023+ output via Vite.

---

## Related Docs

- Content / IA / copy outline: [`docs/dev/CONTENT.md`](CONTENT.md)
- Main lab SEO patterns (articles, schema examples): `gyrogovernance.com/dev_docs/SEO_STRATEGY.md`
- Main lab stack (Next.js): `gyrogovernance.com/dev_docs/TECH_STACK.md`

---

**Last Updated:** August 2, 2026
**Maintained By:** Gyro Governance Lab / AIR

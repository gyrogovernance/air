# AIR Website Technology Stack

Overview of the public marketing site (`air-website`). This is a Vite SPA, not the Next.js stack used on [gyrogovernance.com](https://gyrogovernance.com). Domain docs and the Node/desktop architecture live elsewhere (`docs/ARCHITECTURE.md`, `docs/AIR/`).

---

## Getting Started

```bash
bun install              # preferred; npm install also works
bun run dev              # Vite dev server
bun run build            # tsc -b && vite build → dist/
bun run preview          # preview production build
bun run lint             # oxlint
```

Set `VITE_FORMEASY_URL` and optionally `VITE_SITE_URL` in `.env` (see `.env.example`).

---

## Core Stack

| Layer | Choice | Notes |
|-------|--------|--------|
| Runtime / PM | Bun (preferred) or npm | Lockfiles: `bun.lock`, `package-lock.json` |
| Bundler | Vite 8 | SPA; no SSR |
| UI | React 19 + React DOM 19 | Client components only |
| Routing | React Router 7 (`createBrowserRouter`) | Data router + `ScrollRestoration` |
| Language | TypeScript ~6 | Strict app/node tsconfigs; path via relative imports |
| Styling | Tailwind CSS 3.4 + PostCSS + Autoprefixer | Tokens and glass utilities in `src/index.css` |
| Motion / WebGL | Framer Motion, OGL (`Strands`) | Hero strands on Home |
| Icons | Lucide React | Nav, theme, CTAs |
| Lint | Oxlint | Flat `.oxlintrc.json` |
| Forms | FormEasy via Google Apps Script | `VITE_FORMEASY_URL` POST from `FormPage` |
| Craft list | Fetch `AIR-Craft.md` from [gyrogovernance/air-craft](https://github.com/gyrogovernance/air-craft) | Parsed in `src/lib/airCraft.ts`; optional `VITE_AIR_CRAFT_MD_URL` |

**Not used here (by design):** Next.js App Router, markdown article CMS, RSS, docs filesystem routes, Recharts, Google Analytics (yet).

---

## App Structure

```
air/
├── index.html                 # Shell + default meta / OG
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.tsx
│   ├── router.tsx             # Route table
│   ├── index.css              # Tailwind + glass / theme tokens
│   ├── lib/seo.ts             # Site URL, keywords, per-route meta
│   ├── components/
│   │   ├── RootLayout.tsx     # Nav, main, footer, Seo, JSON-LD
│   │   ├── Seo.tsx            # Route-aware document head
│   │   ├── StructuredData.tsx # Organization / WebSite schema
│   │   ├── Navbar.tsx / MobileMenu.tsx / Footer.tsx
│   │   ├── GlassCard.tsx / Section.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Strands.tsx        # WebGL hero background
│   └── pages/                 # Home, About, Infrastructure, Craft, …
├── docs/dev/
│   ├── draft.md               # Content draft / IA
│   └── TECH_STACK.md          # ← this file
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

### Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/infrastructure` | Human Capacity Development Infrastructure |
| `/craft` | AIR-Craft (datasets, tools, reports) |
| `/craft/form` | Project submit form |
| `/superintelligence` | Collective Superintelligence + fellowship |
| `/superintelligence/form` | Fellowship form |
| `/superintelligence/fund` | Fund support form |
| `/privacy`, `/cookies` | Legal |

SPA deep links need a host rewrite to `index.html` (`vercel.json` / `_redirects`).

---

## Design System (site)

- **Font:** Nunito (Google Fonts), CSS var `--font-nunito`
- **Theme:** Class-based `dark` on `<html>`; light / dark / system toggle; preference in `localStorage`
- **Glass:** Custom cards and floating nav (aligned with Gyro Governance visual language, implemented in-repo rather than Next liquid-glass modules)
- **Palette:** Classic CSS vars (`--classic-blue`, emerald CTAs, blob gradients)

---

## SEO (current)

| Piece | Location |
|-------|----------|
| Default title / description / OG / Twitter | `index.html` |
| Per-route title, description, canonical, OG | `src/lib/seo.ts` + `src/components/Seo.tsx` |
| JSON-LD Organization + WebSite | `src/components/StructuredData.tsx` |
| Crawl rules + AI bots | `public/robots.txt` |
| URL list | `public/sitemap.xml` |
| Canonical base | `VITE_SITE_URL` (default `https://air.gyrogovernance.com`, and change when the production domain is final) |

**Scope note:** This site has no article corpus. SEO is page-level (Home, About, Infrastructure, Craft, Superintelligence) plus internal links to Gyro Governance research (THM, GGG). Future options: prerender/SSG for richer OG on non-home routes, glossary, Search Console.

Keyword themes (natural use, not stuffing): alignment infrastructure, AI safety, AI governance, uniform power distribution, collective superintelligence, independent AI safety research, The Human Mark / deceptive alignment / jailbreak testing (Infrastructure), fellowship / human capacity development.

---

## Deployment

Designed as a static Vite export (`dist/`):

- Vercel / Netlify / Cloudflare Pages / any static host
- Client-side routing: rewrite all paths → `index.html` (see `vercel.json`, `public/_redirects`)

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

- Content draft / page copy: [`docs/dev/draft.md`](draft.md)
- Main lab SEO patterns (articles, schema examples): `gyrogovernance.com/dev_docs/SEO_STRATEGY.md`
- Main lab stack (Next.js): `gyrogovernance.com/dev_docs/TECH_STACK.md`

---

**Last Updated:** August 1, 2026  
**Maintained By:** Gyro Governance Lab / AIR

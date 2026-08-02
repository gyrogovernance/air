# AIR website — structure and content

Model-facing outline of the public site at [air.gyrogovernance.com](https://air.gyrogovernance.com). Source of truth for routes and copy is `src/pages/*`, `src/lib/nav.ts`, `src/router.tsx`, and `src/components/Footer.tsx`. Operator: **Gyro Governance Lab** ([gyrogovernance.com](http://gyrogovernance.com/)). License note on site: CC BY-SA 4.0.

**AIR** = Alignment Infrastructure Routes for Independent Researchers, Engineers, Offices of Community Safety, and AI Labs. Framework for Alignment on Uniform Power Distribution through AI-Empowered Human Capacity Development.

---

## Information architecture

```
/                          Home
/about                     About
/infrastructure            Human Capacity Development Infrastructure
  ├─ /craft                AIR-Craft (nav child of Infrastructure)
  │    └─ /craft/form      Submit project
  └─ /superintelligence    Collective Superintelligence (nav child)
       ├─ /superintelligence/form   Join Fellowship
       └─ /superintelligence/fund   Support Fund
/privacy                   Privacy Policy
/cookies                   Cookie Policy

Legacy redirects:
  /index       → /craft
  /index/form  → /craft/form
```

**Primary nav:** Home · About · Infrastructure (dropdown: Craft, Superintelligence). Global CTA **Join us** → `/superintelligence`.

**Footer EXPLORE:** About AIR, AI safety infrastructure, AIR-Craft tools & datasets, Collective Superintelligence Fellowship. **LEGAL:** Privacy, Cookies, Gyro Governance Lab (external).

---

## Core concepts (site vocabulary)

| Term | Role on the site |
|------|------------------|
| Uniform Power Distribution Guides | Protocols as infrastructure; four capacities for alignment and their displacements |
| Unified Scope Routes | AI-Empowered Economy, Employment, Education, Ecology (poverty, unemployment, misinformation, ecological degeneration) |
| Authority / Agency | Capacities, not entity identities; artificial forms are Indirect and depend on Human Intelligence |
| The Human Mark (THM) | Epistemic taxonomy for jailbreaks, deceptive alignment, existential risk |
| Collective Superintelligence | Human–machine cooperation infrastructure (not “another model”); Fellowship + Fund |
| AIR-Craft | Skilled work: datasets, reports, tools by Fellows and Lab |
| GGG | Gyroscopic Global Governance — whitepaper / multi-domain governance sandbox |

**Canonical consensus line:** “All Artificial categories of Authority and Agency are Indirect, constitutively dependent on Human Intelligence.”

**Delivery line:** “We deliver AI-Empowered Human Capacity Development for Alignment on Uniform Power Distribution.”

**Working principle:** “Alignment requires synchronization, not enforced conformity to external measurements.”

---

## Page outlines

### `/` — Home

- **Hero (AIR 🍃):** audience line (Independent Researchers/Engineers, Offices of Community Safety, AI Labs); delivery subtitle; CTAs About us → `/about`, Join us → `/superintelligence`.
- **Power Concentration Risks (⚖️):** autonomy-driven power concentration as root of personal/social/environmental and catastrophic AI / governance risks. CTAs → `/infrastructure`, `/craft`.
  - When power concentrates: misattributing Authority/Agency as identities instead of capacities.
  - Mitigation: Guides + Unified Scope Routes for independent researchers/engineers.

### `/about` — About

- **About (ℹ️):** AIR as UPD + human-capacity framework over Unified Scope for AI safety/governance and the four crises. CTA → `/infrastructure`.
- **How we work (🔄):** sync quote; Guides + Four Routes. CTA → `/superintelligence`.
- **Our Common Consensus (🤝):** Indirect Authority/Agency thesis; capacity vs identity; four displacements. CTA → [The Human Mark](https://gyrogovernance.com/#thm).

### `/infrastructure` — Human Capacity Development Infrastructure

- **Hero (🤝):** Guides + Unified Scope Routes blocks. CTA → `/about`.
- **Protocols (📜):** GGG whitepaper; four protocols mapped to Economy / Employment / Education / Ecology. CTA → [GGG](https://gyrogovernance.com/#ggg).
- **Collective Superintelligence blurb (✨):** Lab focus — infrastructure for humans getting better together. CTA → `/superintelligence`.
- **The Human Mark (✋):** “Epistemic Taxonomy for Jailbreaks, Deceptive Alignment, and Existential Risk”; four risk displacements; applications (jailbreak testing, deceptive alignment, control evals, mech interp, compliance). Links: [THM](https://gyrogovernance.com/#thm), [GitHub tools](https://github.com/gyrogovernance/tools), NotebookLM notebook.

### `/craft` — AIR-Craft

- **Hero (🛩️):** “Skilled work in AI safety and governance with datasets, reports, and tools by our Fellows and Lab.”
- **Projects (🗂️):** Dual source — (1) **build snapshot** from [`AIR-Craft.md`](https://github.com/gyrogovernance/air-craft/blob/main/AIR-Craft.md) via `scripts/sync-air-craft.mjs` → `src/data/airCraft.generated.json` (first paint, SEO meta, daily CI rebuild); (2) **live fetch** of the same file after mount for same-day updates. Override URL with `VITE_AIR_CRAFT_MD_URL` / `AIR_CRAFT_MD_URL`. Guides stay in that repo’s README / planned `docs/`.

| Domain | Project | One-liner | Outbound |
|--------|---------|-----------|----------|
| Economy | Moments Economy | Mitigating risks of TAI | GitHub whitepaper |
| Employment | AI Inspector | Transform AI outputs for evaluation, interpretability, governance | Chrome Web Store |
| Education | GyroGem | AI safety agent; mitigate technological illiteracy | Gemini Gem |
| Ecology | GGG | Post-AGI multi-domain governance sandbox | gyrogovernance.com article |

- **Submit your Project (📤):** Register → Self-Audit → Submit. CTA → `/craft/form`.

### `/superintelligence` — Collective Superintelligence

- **Hero (🌟):** Redefinition as seamless human–machine cooperation in TAI/AGI (Bostrom; Korompilias/GGG). CTA → [GitHub superintelligence](https://github.com/gyrogovernance/superintelligence).
- **Our Fellowship (👥):** For misfits, generalists, autodidacts, marginalized contributors; “99%” labs cannot absorb. CTA → `/superintelligence/form`.
- **Invest in Humanity (💚):** Fund for those left out (100–1000 per lab hire). CTA → `/superintelligence/fund`.

### Forms (`FormPage`)

Shared: POST to `VITE_FORMEASY_URL` with `formType`, `name`, `email`, `message` (+ type-specific fields). Privacy/cookies note on forms.

| Path | Type | Purpose | Distinct fields |
|------|------|---------|-----------------|
| `/craft/form` | `craft` | Submit AIR-Craft project | org (opt), topic/title, description |
| `/superintelligence/form` | `fellowship` | Join Fellowship | background, GitHub*, portfolio (opt) |
| `/superintelligence/fund` | `fund` | Support Fund | org, how you want to support |

Cancel: craft → `/craft`; fellowship/fund → `/superintelligence`. Success → home.

### `/privacy` · `/cookies`

Legal pages for the AIR site operated by Gyro Governance Lab (effective / last updated August 1, 2026). Standard collection/use/cookies sections; back link to `/`.

---

## External destinations (frequently linked)

- [gyrogovernance.com](http://gyrogovernance.com/) — Lab home
- [gyrogovernance.com/#thm](https://gyrogovernance.com/#thm) — The Human Mark
- [gyrogovernance.com/#ggg](https://gyrogovernance.com/#ggg) — Gyroscopic Global Governance
- [github.com/gyrogovernance/superintelligence](https://github.com/gyrogovernance/superintelligence) — Superintelligence / Moments Economy docs
- [github.com/gyrogovernance/tools](https://github.com/gyrogovernance/tools) — THM-related tools
- [github.com/gyrogovernance/air-craft](https://github.com/gyrogovernance/air-craft) — AIR-Craft list (`AIR-Craft.md`) and guides

---

## What this site is / is not

**Is:** Public narrative and entry points for AIR — framework overview, infrastructure (Guides, Routes, THM, GGG), AIR-Craft portfolio, Fellowship and Fund applications.

**Is not:** The full research wiki, BlockSuite/desktop product architecture, or kernel docs (see other `docs/` files for those). Do not invent products, pages, or claims beyond this outline unless the live source files say so.

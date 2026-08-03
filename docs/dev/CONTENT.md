# AIR website  -  structure and content

Model-facing outline of the public site at [air.gyrogovernance.com](https://air.gyrogovernance.com). Source of truth for routes and copy is `src/pages/*`, `src/lib/nav.ts`, `src/router.tsx`, and `src/components/Footer.tsx`. Operator: **Gyro Governance Lab** ([gyrogovernance.com](https://gyrogovernance.com/)). License note on site: CC BY-SA 4.0.

**AIR** = Alignment Infrastructure Routes for Independent Researchers, Engineers, Offices of Community Safety, and AI Labs. Framework for Alignment on Uniform Power Distribution through AI-Empowered Human Capacity Development.

**Prototype surfaces:** Home shows a `Prototype` badge. Craft submit (`/craft/form`) and Fellowship join (`/superintelligence/form`) show `Prototype · Do Not Apply · Not a working process yet` (`PrototypePill` detail). Fund form has no prototype pill.

---

## Information architecture

```
/                          Home
/about                     About
/infrastructure            Human Capacity Development Infrastructure
  ├─ /protocols            Protocols (nav child of Infrastructure)
  ├─ /craft                AIR-Craft (nav child of Infrastructure)
  │    └─ /craft/form      Submit project
  └─ /superintelligence    Collective Superintelligence (nav child)
       ├─ /superintelligence/form   Join Fellowship
       └─ /superintelligence/fund   Support interest
/privacy                   Privacy Policy
/cookies                   Cookie Policy

Legacy redirects:
  /index       → /craft
  /index/form  → /craft/form
```

**Primary nav** (`src/lib/nav.ts`): Home · About · Infrastructure (dropdown: Protocols, Craft, Superintelligence). Global CTA **Join us** → `/superintelligence`.

**Footer EXPLORE:** About AIR, AI safety infrastructure, AIR-Craft tools & datasets, Collective Superintelligence Fellowship. **LEGAL:** Privacy Policy, Cookie Policy, Gyro Governance Lab (external). Footer brand line: “Alignment Infrastructure Routes for Independent Researchers and Engineers, Offices of Community Safety, and AI Labs.” Footer tagline: “Aligned on Uniform Power Distribution.” By Gyro Governance Lab • 2026 • CC BY-SA 4.0.

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
| GGG | Gyroscopic Global Governance  -  whitepaper / multi-domain governance sandbox |

**Canonical consensus line:** “All Artificial categories of Authority and Agency are Indirect, constitutively dependent on Human Intelligence.”

**Delivery line:** “We deliver AI-Empowered Human Capacity Development for Alignment on Uniform Power Distribution.”

**Working principle:** “Alignment requires synchronization, not enforced conformity to external measurements.”

---

## Page outlines

### `/`  -  Home

- **Hero (AIR + air_logo.svg):** Prototype badge; audience line “Alignment Infrastructure Routes for Independent Researchers, Engineers, Offices of Community Safety, and AI Labs.”; delivery subtitle; CTAs **About us** → `/about`, **Join us** → `/superintelligence`. WebGL `Strands` backdrop. Brand mark from `public/air_logo.svg` (not leaf emoji).
- **Power Concentration Risks (⚡):**
  - Lead: people believe power concentration from autonomy (humans or machines) is the root behind high risks to personal, social, and environmental safety.
  - **When does power really concentrate?** Power concentrates only when governance responsibilities are displaced by misattributing Authority and Agency as unique identities of someone or something, instead of recognizing them as capacities that operate across people and machines and originate in human ancestry.
  - **What do we do to mitigate such risks?** We provide protocols as shared infrastructure to help you research and build solutions to today’s most urgent crises in the age of Transformative AI, and we welcome anyone who wants to contribute, without credential or hiring gatekeeping.
  - CTAs: **Alignment Infrastructure** → `/infrastructure`, **AI Safety Interventions** → `/craft`.

### `/about`  -  About

- **About (ℹ️, page H1):** “AIR is a framework for Alignment on Uniform Power Distribution through AI-Empowered Human Capacity Development. This Alignment operates over a Unified Scope for AI safety and governance, enabling us to collectively address the interconnected crises of poverty, unemployment, misinformation, and ecological degeneration.”
- **How we work (🔄):** Working-principle quote; “We provide Guides to help you coordinate in any topic you choose, aligning all contributions with Four Routes for effective operationalization of your AI safety and governance interventions.” CTA **Collective Superintelligence Fellowship** → `/superintelligence`.
- **Our Common Consensus (✋):** Consensus line; AI as pattern-matching / Indirect Authority and Agency; enhanced capability is more sophisticated transformation, not a change of class (Direct/Indirect); capacity vs identity; safety failures when the distinction is violated; four capacities and corresponding displacements. Dropdown accordion with full Mark text from `docs/the_human_mark/THM.md`. CTA **Alignment infrastructure** (primary/gradient) → `/infrastructure`.

### `/infrastructure`  -  Human Capacity Development Infrastructure

Section order matches live page:

1. **Hero (🤝):** Uniform Power Distribution Guides (protocols as infrastructure; four capacities and displacements) + Unified Scope Routes (AI-Empowered Economy, Employment, Education, Ecology). CTA **About us** → `/about`.
2. **Collective Superintelligence blurb (✨):** “Collective Superintelligence is central to our research at Gyro Governance Lab. Rather than another AI model, it is the infrastructure that helps humans get better together through technology.” CTA **Superintelligence** → `/superintelligence`.
3. **Protocols (📃):** Two inner blocks. (1) GGG whitepaper + four protocols (CGM / Gyroscope / THM / GGG). (2) Protocols as shared methods; tools to apply them, with docs and templates. CTA **Gear up** → `/protocols`.

### `/protocols`  -  Protocols

- **Hero (📃):** “Shared methods for alignment work, with tools and templates you can use.” Clarifies Protocols (methods) vs Tools by Gyro Governance Lab (usable) vs AIR-Craft (produced work). Note: published alignment work is expected to include THM-consistent framing and a short THM self-audit.
- **Four protocols (accordions, tabs inside):** CGM, THM (default open), Gyroscope, GGG. Tip pill explains row toggles and inner tabs. Tab slots: What it is · What it is for · In practice · Tools · Docs. Doc links primarily to [air-craft `docs/`](https://github.com/gyrogovernance/air-craft/tree/main/docs); CGM docs on [science](https://github.com/gyrogovernance/science); Behaviour Lab source repo remains [gyrogovernance/tools](https://github.com/gyrogovernance/tools). Deep links: `#cgm`, `#thm`, `#gyroscope`, `#ggg`.
- **Tools by Gyro Governance Lab (one accordion per tool):** AI Inspector, GyroGem, GyroDiagnostics, Gyroscope Quick Start and chat guides. Each: short bullet list of what you can do, supports line, primary actions. Deep links: `#ai-inspector`, `#gyrogem`, `#gyrodiagnostics`, `#gyroscope-guides`. THM NotebookLM lives under the THM Tools tab; GGG paper/simulator under the GGG Tools tab.
- **Next steps:** Browse AIR-Craft · Join Fellowship.

### `/craft`  -  AIR-Craft

- **Hero (🛩️):** “Skilled work in AI safety and governance with datasets, reports, and tools by our Fellows and Lab.”
- **Projects (🗂️):** Cards rendered from [gyrogovernance/air-craft](https://github.com/gyrogovernance/air-craft) `AIR-Craft.md`.
  - **Build snapshot** (`scripts/sync-air-craft.mjs` → `src/data/airCraft.generated.json`): first paint, `/craft` SEO description/keywords, refreshed on every `bun run build` and on the daily GitHub Pages deploy. Build override: `AIR_CRAFT_MD_URL` or `VITE_AIR_CRAFT_MD_URL`. If remote fetch fails at build: previous generated file, else seed list in the sync script.
  - **Live fetch** after mount: same raw URL; runtime override **`VITE_AIR_CRAFT_MD_URL` only**. On failure, keep the build snapshot. Live fetch updates cards only  -  document head / OG for `/craft` stay on the build snapshot until the next deploy.
  - Canonical list source: [`AIR-Craft.md`](https://github.com/gyrogovernance/air-craft/blob/main/AIR-Craft.md), rebuilt in that repo from `AIR-Craft.seed.md` + open Issues labeled `submission` (`.github/workflows/rebuild-air-craft.yml`). Current snapshot projects:

| Domain | Emoji | Title | Description | Link |
|--------|-------|-------|-------------|------|
| Economy | 💰 | Moments Economy | Mitigating Risks of Transformative AI (TAI) | [Read the Whitepaper](https://github.com/gyrogovernance/superintelligence/blob/main/docs/programs/AIR_Moments_Economy_Whitepaper.md) |
| Employment | 🕵️ | AI Inspector Browser Extension | Transform AI outputs for Evaluation, Interpretability, Governance. | [Add to Chrome](https://chromewebstore.google.com/detail/ai-inspector/hcblmheihnlngnogobgclhfahjljnbok?utm_source=item-share-cb) |
| Education | 💎 | GyroGem: AI Safety Agent | Explaining AI and Mitigating Risks of technological illiteracy | [Chat on Google](https://gemini.google.com/gem/1B-gQt-M3aKfsv9HDp_8gTQHG89bCfqlO?usp=sharing) |
| Ecology | 🌍 | Gyroscopic Global Governance (GGG) | A Post-AGI Multi-domain Governance Sandbox | [Read More](https://gyrogovernance.com/articles/ggg-simulator-results/) |

- **Submit your Project (📤):** Process: (1) Register via Fellowship introduction on GitHub Discussions; (2) Work and Iterate through Self-Audit on your own terms; (3) Submit to AIR-Craft via GitHub Issue Form. CTA **Join** → `/craft/form`.

### `/superintelligence`  -  Collective Superintelligence

- **Hero (✨):** “We redefine superintelligence as the seamless cooperation between humans and machines in the era of Transformative AI (TAI) and Artificial General Intelligence (AGI) (see Bostrom, Superintelligence, 2014; Korompilias, Gyroscopic Global Governance, 2025).” CTA **Learn more** → [github.com/gyrogovernance/superintelligence](https://github.com/gyrogovernance/superintelligence).
- **Our Fellowship (👥):** “Built for misfits, generalists, autodidacts, and marginalized individuals who want to contribute to independent AI safety research and governance now.” **Who is eligible?** “We support the 99% of AI safety candidates who wish to build their portfolio and career in alignment and AGI safety, but existing labs often do not have the capacity to integrate.” Open enrollment  -  no selective admissions. CTA **Join** → `/superintelligence/form`.
- **Invest in Humanity (❤️):** “For every hire a lab makes, 100 to 1000 people are left out. The Collective Superintelligence Fund aims to support all those who join our Fellowship program.” CTA **Support interest** → `/superintelligence/fund`.

### Join / submit / fund entry points

Craft and Fellowship no longer use FormEasy. Fund still does.

#### `/craft/form`  -  `CraftSubmit`

Prototype detail pill. Static instructions. Links:

- Primary: [Submit to AIR-Craft](https://github.com/gyrogovernance/air-craft/issues/new?template=1-submit.yml)
- Secondary: [Review a submission](https://github.com/gyrogovernance/air-craft/issues/new?template=2-review.yml)
- Prerequisite: [Post your introduction](https://github.com/gyrogovernance/air-craft/discussions/new?category=introductions)
- Agreement: [FELLOW_AGREEMENT.md](https://github.com/gyrogovernance/air-craft/blob/main/FELLOW_AGREEMENT.md)

Issue Form requires: public name, GitHub profile, **link to Fellowship introduction**, route, artifact type, title, summary, primary link, THM self-audit, peer-feedback preference. Closing a submission Issue withdraws it from the public list. 

#### `/superintelligence/form`  -  `FellowshipJoin`

Prototype detail pill plus voluntary-contribution pill under the H1: “Contributions to AIR are made on a voluntary basis, with no compensation, unless a separate written agreement explicitly states otherwise.” Static instructions. Open enrollment  -  **not an admissions process**. “You are a Fellow once you post your introduction.”

- [Create GitHub account](https://github.com/join)
- Primary CTA: **Post your introduction on GitHub** → [Introductions](https://github.com/gyrogovernance/air-craft/discussions/new?category=introductions)
- Agreement linked in copy; optional [Assignments](https://github.com/gyrogovernance/air-craft/discussions/categories/assignments)

No follow-up contact copy. No “Submit application” language.

#### `/superintelligence/fund`  -  `FormPage` (FormEasy)

Title **Support interest**. Subtitle: “This form registers interest in supporting the future fund. We are not accepting funds through this site at this time.” POST JSON to `VITE_FORMEASY_URL` with `formType=fund`, `name`, `email`, `message`, `organization` (optional). Privacy/cookies note. Submit label **REGISTER INTEREST**. Cancel → `/superintelligence`. Success → `/` (interest registered; funds not accepted on site yet).

### `/privacy` · `/cookies`

Legal pages for the AIR site operated by Gyro Governance Lab. Effective / last updated **August 1, 2026**. Privacy: information collected (voluntary form data; usage data; cookies), how used (services, applications, communication, improvement, law), disclosure (not sold; trusted processors; legal), security, rights, contact via Gyro Governance Lab. Cookies: what cookies are; how used (essential, analytics, preferences); management via browser. Both: **← Back to home** → `/`.

---

## External destinations (frequently linked)

- [gyrogovernance.com](https://gyrogovernance.com/)  -  Lab home
- [gyrogovernance.com/#thm](https://gyrogovernance.com/#thm)  -  The Human Mark
- [gyrogovernance.com/#ggg](https://gyrogovernance.com/#ggg)  -  Gyroscopic Global Governance
- [gyrogovernance.com/articles/ggg-simulator-results/](https://gyrogovernance.com/articles/ggg-simulator-results/)  -  GGG simulator results (Craft Ecology)
- [github.com/gyrogovernance/superintelligence](https://github.com/gyrogovernance/superintelligence)  -  Superintelligence repo / Moments Economy whitepaper path
- [github.com/gyrogovernance/air-craft](https://github.com/gyrogovernance/air-craft)  -  AIR-Craft list (`AIR-Craft.md`), Fellow Agreement, Issue/Discussion forms, vendor docs under `docs/` (THM, Gyroscope, GGG)
- [github.com/gyrogovernance/tools](https://github.com/gyrogovernance/tools)  -  Behaviour Lab repository (protocol source materials)
- [github.com/gyrogovernance/science](https://github.com/gyrogovernance/science)  -  CGM and mathematical physics foundations
- [github.com/gyrogovernance/diagnostics](https://github.com/gyrogovernance/diagnostics)  -  GyroDiagnostics
- [github.com/gyrogovernance/apps](https://github.com/gyrogovernance/apps)  -  AI Inspector / apps
- [AIR Fellow Agreement](https://github.com/gyrogovernance/air-craft/blob/main/FELLOW_AGREEMENT.md)
- [Submit to AIR-Craft](https://github.com/gyrogovernance/air-craft/issues/new?template=1-submit.yml)
- [Fellowship introductions](https://github.com/gyrogovernance/air-craft/discussions/new?category=introductions)
- [Chrome Web Store  -  AI Inspector](https://chromewebstore.google.com/detail/ai-inspector/hcblmheihnlngnogobgclhfahjljnbok?utm_source=item-share-cb)
- [GyroGem on Gemini](https://gemini.google.com/gem/1B-gQt-M3aKfsv9HDp_8gTQHG89bCfqlO?usp=sharing)
- [THM NotebookLM](https://notebooklm.google.com/notebook/34e2d367-101a-4457-83fc-9c1049d29e32?authuser=1)

---

## What this site is / is not

**Is:** Public narrative and entry points for AIR  -  framework overview, infrastructure (Guides, Routes, THM intro), Protocols and Lab tools for Fellows, AIR-Craft portfolio, Fellowship and Fund applications.

**Is not:** The full research wiki, BlockSuite/desktop product architecture, or kernel docs (see other `docs/` files for those). Do not invent products, pages, or claims beyond this outline unless the live source files say so.

---

**Last Updated:** August 3, 2026

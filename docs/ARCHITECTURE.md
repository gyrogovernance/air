# AIR Node — Technical Architecture

This document maps **what we own**, **what we depend on (do not modify)**, and **what is scaffolded but not wired yet**. Use it alongside [`AGENT.md`](../AGENT.md) (implementation constitution) and [`README.md`](../README.md) (domain vision).

---

## 1. Repository layout

```
air/
├── AGENT.md                 # Implementation rules — read before coding
├── README.md                # Domain vision + quick start
├── docs/
│   ├── ARCHITECTURE.md      # ← this file
│   └── BlockSuite/          # BlockSuite reference notes (upstream behaviour)
├── apps/
│   ├── desktop/             # ★ Primary UI (React + Vite + BlockSuite)
│   └── node-cli/            # Headless peer stub (SQLite + local sync bus)
├── packages/
│   ├── types/               # Domain TypeScript types (five primitives)
│   ├── blocks/              # ★ BlockSuite adapter layer (AIR-owned)
│   ├── kernel-bridge/       # ★ hQVM kernel + signed commands
│   ├── templates/           # ★ Genesis template JSON + loader
│   ├── storage/             # SQLite persistence (headless node only, not desktop)
│   └── sync/                # Libp2p placeholders (not networked yet)
├── integrations/            # External tool adapters (stubs, not wired)
├── core/                    # Rust hQVM kernel → WASM (source; not in runtime path)
└── python/                  # Reference kernel + legacy CLI (do not extend for new features)
```

---

## 2. Ownership map (at a glance)

| Layer | Owner | Location | Touch? |
|-------|--------|----------|--------|
| React UI shell, routing, forms | **AIR** | `apps/desktop/src/` | ✅ Yes |
| Identity + genealogy (browser) | **AIR** | `apps/desktop/src/store/` | ✅ Yes |
| Shell doc model, workspace, DB columns | **AIR** | `packages/blocks/` | ✅ Yes |
| hQVM transitions, signing, commands | **AIR** | `packages/kernel-bridge/` | ✅ Yes |
| Domain types | **AIR** | `packages/types/` | ✅ Yes |
| Genesis templates | **AIR** | `packages/templates/` | ✅ Yes |
| Vite CJS interop for BlockSuite | **AIR** | `apps/desktop/vite.deps-plugin.ts` | ✅ Yes |
| BlockSuite store, blocks, presets | **BlockSuite** (npm) | `node_modules/@blocksuite/*` | ❌ Do not edit |
| Yjs CRDT engine | **Yjs** (npm) | `node_modules/yjs` | ❌ Do not edit |
| Affine database / data-view UI | **BlockSuite** (npm) | `@blocksuite/blocks`, `@blocksuite/data-view` | ❌ Do not edit — configure via AIR adapter |
| SQLite headless persistence | **AIR** (scaffold) | `packages/storage/` | ✅ Yes — not used by desktop yet |
| P2P sync | **AIR** (scaffold) | `packages/sync/` | ✅ Yes — stub only |
| Rust WASM kernel | **AIR** (source) | `core/` | ✅ Yes — build not wired to app |
| Python reference | **Legacy / reference** | `python/` | ⚠️ Read-only reference |

---

## 3. What BlockSuite is (and what we do with it)

BlockSuite is the **block editor and CRDT document engine**. We use it as a library — same as using React or SQLite.

### Do not modify (upstream packages)

| Package | Role |
|---------|------|
| `@blocksuite/store` | `DocCollection`, `Schema`, `Doc`, block CRUD, Yjs binding |
| `@blocksuite/block-std` | `BlockStdScope`, `EditorHost`, extensions |
| `@blocksuite/blocks` | Built-in blocks: `affine:database`, `affine:paragraph`, Affine schemas |
| `@blocksuite/presets` | Effect bundles (lazy-loaded web components) |
| `@blocksuite/data-view` | Table / kanban property system for DatabaseBlock |
| `@blocksuite/affine-*` | Shared Affine services, models, components |
| `yjs`, `y-indexeddb` | CRDT + browser IndexedDB persistence |

If something breaks inside these packages, fix it via **our adapter** (`packages/blocks/`, `vite.deps-plugin.ts`) or version pins — not by editing `node_modules`.

### AIR-owned BlockSuite integration (`packages/blocks/`)

| File / folder | Purpose |
|---------------|---------|
| `workspace.ts` | `AIRWorkspace` — registers schemas, `DocCollection`, IndexedDB providers |
| `shell-doc.ts` | Bootstrap shell docs, read/write grants as database rows, legacy repair |
| `shell-block/` | Custom root block `affine:shell` + Lit view `affine-air-shell-root` |
| `database-schema.ts` | AIR column IDs (rowType, state, amount, humanMark, …) |
| `database-init.ts` | Table + kanban views on DatabaseBlock |
| `database-utils.ts` | Cell/column helpers (mirrors BlockSuite patterns) |
| `editor-specs.ts` | Minimal block spec list for shell editor |
| `effects.ts` | Registers AIR custom elements |
| `identity-registry-block/` | Schema only — root doc for identity registry (not in UI yet) |

### Document tree (runtime)

```
DocCollection (id: air-node)
└── Shell Doc (one per shell.id)
    └── affine:shell          ← AIR custom root
        └── affine:database   ← BlockSuite built-in
            └── affine:paragraph rows   ← BlockSuite built-in
                └── cells: rowType, state, amount, …  ← AIR column schema
```

Grants and claims are **database rows**, not separate `affine:grant` / `affine:claim` block types.

---

## 4. Desktop app (`apps/desktop/`)

### Active source (ours)

```
src/
├── App.tsx              # Routes, workspace boot, shell list state
├── pages/               # Pulse, Shells, Shell detail, Identity, Genealogy
├── components/          # Layout, shell cards, template picker, BlockSuite host
├── store/
│   ├── workspace.ts     # Thin lazy facade → @air/blocks/workspace
│   ├── identity.ts      # Ed25519 keypair + anchor in localStorage
│   └── genealogy.ts     # Event log + shared moment in localStorage
└── blocksuite/
    ├── register.ts      # Lazy-load BlockSuite + AIR effects
    └── shell-editor.ts  # Lit <shell-editor> wrapping BlockStdScope
```

### Persistence today (important)

| Data | Where | Package |
|------|--------|---------|
| Shell docs, grants, claims (CRDT) | IndexedDB via `y-indexeddb` | `@air/blocks/workspace` |
| Identity anchor + keys | `localStorage` | `apps/desktop/src/store/identity.ts` |
| Genealogy byte log / events | `localStorage` | `apps/desktop/src/store/genealogy.ts` |
| SQLite | **Not used by desktop** | `@air/storage` (headless only) |

Target (per `AGENT.md`): unify on SQLite + Yjs persistence for all nodes. Desktop still uses IndexedDB + localStorage.

### Build tooling (ours)

- `vite.config.ts` — React, aliases
- `vite.deps-plugin.ts` — CJS→ESM shims for BlockSuite’s transitive deps (`extend`, `debug`, `lodash.*`) under Bun’s `/@fs/` paths

### Declared but not implemented

- **Tauri** (`@tauri-apps/*` in `package.json`) — no `src-tauri/`; keys stay in `localStorage` for now

---

## 5. Shared packages

### `@air/types` — domain model

Single source of truth for `Shell`, `Grant`, `Claim`, `IdentityAnchor`, `Genealogy`, `GenesisTemplate`, `Integration`. Used everywhere.

### `@air/kernel-bridge` — deterministic kernel gate

| Module | Status |
|--------|--------|
| `wasm.ts` | **Active** — TypeScript hQVM (24-bit); ported from `python/src/constants.py` |
| `serialization.ts` | **Active** — byte layout for shell/grant/claim transitions |
| `signing.ts` | **Active** — Ed25519 via `@noble/curves` |
| `commands.ts` | **Active** — `createShellCommand`, `issueGrantCommand`; `routeClaimCommand` not wired to UI |

`core/` Rust WASM is **not** loaded at runtime yet (`build:kernel` produces `core/pkg/` when run).

### `@air/templates` — genesis shells

Five JSON templates + `instantiateTemplate()` → `Shell` metadata. Block tree is bootstrapped by `bootstrapShellDoc()`, not imported as a full BlockSuite snapshot yet.

### `@air/storage` — headless SQLite (scaffold)

- `schema.sql`, `db.ts`, `yjs-persistence.ts`, `queries.ts`
- Used by `apps/node-cli` only
- **Removed:** `yjs-indexer.ts` (wrong doc shape, never wired)

### `@air/sync` — networking (scaffold)

- `node.ts` — in-process `EventEmitter` bus (not Libp2p)
- `discovery.ts`, `gossip.ts` — topic helpers / console stubs

---

## 6. Headless node (`apps/node-cli/`)

Opens `air-node.db`, starts local sync bus, prints peer info. **Libp2p: TODO.** Does not serve the React UI.

---

## 7. Integrations (`integrations/*`)

Stub packages: `github`, `slack`, `greenhouse`, `rippling`. Zero imports from apps. See `integrations/README.md`.

---

## 8. Reference & legacy (do not build new features here)

| Path | Notes |
|------|--------|
| `python/` | Reference hQVM implementation; `cli_legacy/` and `console_legacy_deprecated/` are deprecated |
| `docs/BlockSuite/Documentation` | Upstream-oriented notes — consult when extending editor behaviour |
| `docs/AIR_Moments_Wallet.md` | Domain / wallet spec |

---

## 9. Data flow (shell creation)

```
User → ShellsPage → instantiateTemplate()
                  → createShellCommand()     [@air/kernel-bridge]
                  → appendGenealogyEvent()   [localStorage]
                  → registerShell()          [@air/blocks/workspace]
                  → bootstrapShellDoc()      [affine:shell → affine:database]
                  → navigate to ShellDetailPage
                  → BlockSuiteEditor         [lazy BlockSuite effects]
```

Grant issuance: `GrantIssuanceForm` → `issueGrantCommand` → `registerShell` → `addGrantRow` (database row).

---

## 10. Current vs target (`AGENT.md`)

| Capability | Current | Target |
|------------|---------|--------|
| Shell editing | BlockSuite + IndexedDB | Same + SQLite on headless nodes |
| Identity | localStorage | OS keychain (Tauri) + registry doc |
| Genealogy | localStorage | SQLite + P2P sync |
| Kernel | TS in `kernel-bridge` | Rust WASM from `core/` |
| Sync | Local EventEmitter | Libp2p GossipSub |
| Claim kanban drag | UI only | Kernel `routeClaimCommand` |
| Templates | JSON metadata bootstrap | Full `DocSnapshot` import |
| Integrations | Stubs | Wired adapters |

---

## 11. Where to change what

| Task | Where to work |
|------|----------------|
| New UI page or form | `apps/desktop/src/pages/`, `components/` |
| Shell / grant / claim in docs | `packages/blocks/shell-doc.ts`, `database-schema.ts` |
| New template | `packages/templates/*.json`, `loader.ts` |
| Kernel transition rules | `packages/kernel-bridge/` |
| New domain field | `packages/types/` first, then blocks + UI |
| BlockSuite editor behaviour | `packages/blocks/editor-specs.ts`, `shell-block/shell-spec.ts` — **not** `node_modules` |
| CJS / Vite dev errors | `apps/desktop/vite.deps-plugin.ts` |
| Headless DB | `packages/storage/` |
| P2P | `packages/sync/` |

---

## 12. Dependency versions

BlockSuite packages are pinned to **canary** builds in `apps/desktop/package.json`. Root `package.json` overrides `@blocksuite/icons` to `2.1.75` for build stability. Bump BlockSuite only deliberately — run full dev smoke test (`bun run dev`, open shell editor).

# Knowledge Graph (Ghost System)

## Root Node: Ghost System

The central orchestration layer for the portfolio.

### Sub-Systems

#### 1. The Renderer (Client)

- **Nodes:** `GhostCanvas`, `ShaderManager`, `PostProcessing`, `GhostScene` (Vanilla/Optimized), `Ghost.tsx` ([DEPRECATED]), `GhostParticles` ([DEPRECATED]).
- **Techniques:** InstancedMesh, ShaderMaterial, AnalogDecay (Custom Pass).
- **Templates:** `ProjectTemplateALPARenderer` (V3 ALPA), `ProjectRenderer` (Dispatcher).
- **Context:** Handles all R3F visual output and narrative transitions. High-performance Vanilla Three.js used in key sections.
- **Dependencies:** Three.js, Drei, Postprocessing (pmndrs).

#### 2. The Administrator (Server/Auth)

- **Nodes:** `AdminDashboard`, `AuthGuard`, `ProjectsTable`, `MasterProjectTemplateV3Editor`.
- **Backend:** `DataConnect` (Firebase), `Supabase Client`.
- **Context:** Protected management area with real-time sync. Support for ALPA editorial v3.
- **Dependencies:** Supabase Auth, Firebase Functions, DataConnect.

#### 3. The Content Engine (Data)

- **Nodes:** `ContentStore` (Projects/Assets), `ExperienceStore`, `PortfolioModalStore`, `useProjects`.
- **Context:** Fetches and syncs data to UI via Zustand and Supabase Realtime.
- **Dependencies:** Supabase Realtime, Zustand.

#### 4. The Core (Shared)

- **Nodes:** `AntigravityStore` (Global State), `src/lib/utils`, `src/lib/motionTokens`.
- **Context:** Global helpers (cn, math) and Narrative State management.
- **Dependencies:** clsx, tailwind-merge, gsap, framer-motion.

## Key Relationships

- `GhostCanvas` **observes** `AntigravityStore` (Narrative State).
- `AdminDashboard` **controls** `ContentStore`.
- `HeroSection` **embeds** `GhostCanvas` and triggers `useGhostReveal`.
- `PostProcessing` applies `AnalogDecay` to the entire scene.

## Current Status (Post-Audit 2026-02-21)

- **Last Sync:** 2026-02-21
- **Last Audit:** ALPA (V3) Template Integration & Project Migration (Phase 3 Complete)
- **Focus:** Editorial Minimalism, ALPA template stability, and YouTube media automation.
- **Storage Status:** Cleaned. Old builds and redundant assets quarantined.
- **Production Bundle:** Optimized. Reference images moved to docs/.

### Recent Optimizations (2026-02-21)

1. **ALPA Template (V3)** - Strict YouTube parameters, zero border-radius, and 100vw quote bands.
2. **Admin Project List** - Integrated project variants (16:9, 1:1) and template identification.
3. **GhostScene.tsx** - Mutated to Vanilla Three.js with `InstancedMesh` for 60FPS.
4. **Zero-Allocation Loop** - `GhostModel.tsx` optimized to avoid object creation in `useFrame`.
5. **Z-Index Hierarchy** - Strictly defined in `globals.css` and `GHOST-DESIGN-SYSTEM.md`.
6. **Project Migration** - Successfully migrated 4 candidate projects to ALPA V3.

### Audit Findings

- **WebGL Performance:** Score 9/10 - High performance Vanilla Three.js integration.
- **Accessibility:** WCAG AA Contrast fixes applied. Font preloading implemented.
- **SEO:** Video Schema and JSON-LD implemented for projects.
- **Environment:** `EPERM` issues in `node_modules` identified as a blocker for automated cleanup.

## Knowledge Items (Learnings)

- [KI-001: Unified Architecture](.context/knowledge/KI-001-Unified-Architecture.md)
- [KI-002: Blue Ghost Identity](.context/knowledge/KI-002-Blue-identity.md)
- [KI-003: Clean Ecosystem](.context/knowledge/KI-003-Clean-Ecosystem.md)
- [KI-004: Agent Capacities](.context/knowledge/KI-004-Agent-Capacities.md)
- [KI-005: Asset Map](.context/knowledge/KI-005-Asset-Map.md)
- **KI-006: WebGL Performance Patterns** - Object pooling, ref-based state, Vanilla Three.js mutation.
- **KI-007: Deep Clean Protocol** - SafetyGuardian and quarantine procedures.
- **KI-008: Node Permissions (EPERM)** - Documented lifecycle of permission issues in CI/CD environments.
- **KI-009: Tailwind Oxide Scanner — CSS Parsing Error (PERSISTENT BUG)** ⚠️
  - **Symptom:** `pnpm dev` / `pnpm build` falham com `"Unexpected token .bg-\[\.\4 \!\]"` e `"background-color: .!"`.
  - **Root Cause:** `@tailwindcss/oxide` (Rust/WASM) em modo auto-detecção varre **todos** os arquivos do projeto, incluindo imagens JPEG e logs com ANSI escapes (caracteres de controle U+0004). O LightningCSS rejeita os seletores CSS inválidos gerados.
  - **Fix:** Em `src/app/globals.css`, substituir `@import 'tailwindcss'` por `@import "tailwindcss" source(none)` + `@source` explícitos com filtros de extensão (`*.{tsx,ts,jsx,js,css,mdx}`).
  - **Diagnóstico Rápido:** Se o erro retornar, verificar primeiro se `globals.css` ainda tem `source(none)`. Sem ele, o oxide varre binários e recria o bug.
  - **Referência Completa:** `.context/logs/adjustment_log.md` → entrada `[2026-03-04T01:15]`.

## 5. Security & Data Engineering

### Supabase Architecture

- **Auth Middleware**: Simplificado para `createServerClient` com manipulação direta de cookies (Samesite=Lax).
- **RLS Policy**: Strict por padrão. Scripts SQL manuais (`supabase/migrations/`) necessários para buckets públicos (`portfolio-media`).
- **Media Handling**: YouTube exige extração de ID + Iframe. `<video>` tag apenas para assets diretos.

## 6. External Knowledge Bases (Research Sources)

> **Auto-Injected**: These sources are active in the agent's context.

- **[Firebase Knowledge Base](.context/knowledge/Knowledge-Base-Firebase.json)**: Complete index of Firebase documentation, SDKs, and tools.
- **[Supabase Knowledge Base](.context/knowledge/Knowledge-Base-Supabase.json)**: Complete index of Supabase documentation, client libraries, and community tools.
- **[Knowledge Skills](.context/knowledge/knowledge_skills.json)**: Definition of specialized agent capabilities and available tools.

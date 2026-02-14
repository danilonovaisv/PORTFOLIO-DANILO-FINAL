# Knowledge Graph (Ghost System)

## Root Node: Ghost System

The central orchestration layer for the portfolio.

### Sub-Systems

#### 1. The Renderer (Client)

- **Nodes:** `GhostCanvas`, `ShaderManager`, `PostProcessing`, `GhostScene` (Vanilla/Optimized), `Ghost.tsx` ([DEPRECATED]), `GhostParticles` ([DEPRECATED]).
- **Techniques:** InstancedMesh, ShaderMaterial, AnalogDecay (Custom Pass).
- **Context:** Handles all R3F visual output and narrative transitions. High-performance Vanilla Three.js used in key sections.
- **Dependencies:** Three.js, Drei, Postprocessing (pmndrs).

#### 2. The Administrator (Server/Auth)

- **Nodes:** `AdminDashboard`, `AuthGuard`, `ProjectsTable`.
- **Backend:** `DataConnect` (Firebase), `Supabase Client`.
- **Context:** Protected management area with real-time sync.
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

## Current Status (Post-Audit 2026-02-13)

- **Last Sync:** 2026-02-13
- **Last Audit:** Master Audit & Performance Optimization (Phase 2 Complete)
- **Focus:** Performance stability, Zero-Jank high-performance WebGL, and Code Hygiene.
- **Storage Status:** Cleaned. Old builds and redundant assets quarantined.
- **Production Bundle:** Optimized. Reference images moved to docs/.

### Recent Optimizations (2026-02-13)

1. **GhostScene.tsx** - Mutated to Vanilla Three.js with `InstancedMesh` for 60FPS.
2. **Zero-Allocation Loop** - `GhostModel.tsx` optimized to avoid object creation in `useFrame`.
3. **Z-Index Hierarchy** - Strictly defined in `globals.css` and `GHOST-DESIGN-SYSTEM.md`.
4. **Deep Clean Protocol** - Scripted cleanup for project hygiene.

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
- **[NEW] KI-008: Node Permissions (EPERM)** - Documented lifecycle of permission issues in CI/CD environments.

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

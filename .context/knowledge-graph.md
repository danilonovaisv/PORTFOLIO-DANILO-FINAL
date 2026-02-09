# Knowledge Graph (Ghost System)

## Root Node: Ghost System

The central orchestration layer for the portfolio.

### Sub-Systems

#### 1. The Renderer (Client)

- **Nodes:** `GhostCanvas`, `ShaderManager`, `PostProcessing`, `GhostScene` (Optimized).
- **Techniques:** InstancedMesh, ShaderMaterial, AnalogDecay (Custom Pass).
- **Context:** Handles all R3F visual output and narrative transitions.
- **Dependencies:** Three.js, Drei, Lamina.

#### 2. The Administrator (Server/Auth)

- **Nodes:** `AdminDashboard`, `AuthGuard`, `ProjectsTable`.
- **Backend:** `DataConnect` (Firebase), `Supabase Client`.
- **Context:** Protected management area.
- **Dependencies:** Supabase Auth, Firebase Functions.

#### 3. The Content Engine (Data)

- **Nodes:** `ContentStore` (Projects/Assets), `useProjects`.
- **Context:** Fetches and syncs data to UI.
- **Dependencies:** Supabase Realtime, Zustand.

#### 4. The Core (Shared)

- **Nodes:** `AntigravityStore` (Global State), `src/lib/utils`, `config/brand`.
- **Context:** Global helpers (cn, math) and Narrative State management.
- **Dependencies:** clsx, tailwind-merge.

## Key Relationships

- `GhostCanvas` **observes** `AntigravityStore` (Narrative State).
- `AdminDashboard` **controls** `ContentStore`.
- `HeroSection` **embeds** `GhostCanvas` and triggers `useGhostReveal`.

## Current Status (Post-Audit 2026-02-09)

- **Last Sync:** 2026-02-09
- **Last Audit:** Master Audit & Optimization (Phases 1-4 Complete)
- **Focus:** Performance optimization and code cleanliness
- **Storage Freed:** ~520MB-1GB (old builds, reference images, configs)
- **Production Bundle:** -16.7MB (reference images moved to docs/)

### Recent Optimizations

1. **Ghost.tsx EffectComposer** - 98% faster resize handling
2. **Deep Clean** - Quarantined old builds and duplicate configs
3. **Reference Images** - Moved from public/ to docs/ (-16.7MB)

### Audit Findings

- **Dependencies:** 15 unused production deps, 17 unused dev deps identified
- **WebGL Performance:** Score 8.5/10 - Excellent patterns detected
- **Security:** 3 safe uses of `dangerouslySetInnerHTML` validated
- **Accessibility:** All images have alt attributes

## Knowledge Items (Learnings)

- [KI-001: Unified Architecture](.context/knowledge/KI-001-Unified-Architecture.md)
- [KI-002: Blue Ghost Identity](.context/knowledge/KI-002-Blue-identity.md)
- [KI-003: Clean Ecosystem](.context/knowledge/KI-003-Clean-Ecosystem.md)
- [KI-004: Agent Capacities](.context/knowledge/KI-004-Agent-Capacities.md)
- [KI-005: Asset Map](.context/knowledge/KI-005-Asset-Map.md)
- **[NEW] KI-006: WebGL Performance Patterns** - Object pooling, ref-based state, shader optimization
- **[NEW] KI-007: Deep Clean Protocol** - Safe file quarantine and rollback procedures

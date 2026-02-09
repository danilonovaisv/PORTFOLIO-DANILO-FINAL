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

## Current Status (Syncing)

- **Last Sync:** 2026-02-09
- **Focus:** Consolidating Stores (`AntigravityStore`, `ContentStore`).
- **Audit:** Design Tokens extracted to `.context/design-tokens.md`.

## Knowledge Items (Learnings)

- [KI-001: Unified Architecture](.context/knowledge/KI-001-Unified-Architecture.md)
- [KI-002: Blue Ghost Identity](.context/knowledge/KI-002-Blue-identity.md)
- [KI-003: Clean Ecosystem](.context/knowledge/KI-003-Clean-Ecosystem.md)
- [KI-004: Agent Capacities](.context/knowledge/KI-004-Agent-Capacities.md)
- [KI-005: Asset Map](.context/knowledge/KI-005-Asset-Map.md)

# Knowledge Graph (Ghost System)

## Root Node: Ghost System

The central orchestration layer for the portfolio.

### Sub-Systems

#### 1. The Renderer (Client)

- **Nodes:** `GhostCanvas`, `ShaderManager`, `PostProcessing`.
- **Context:** Handles all R3F visual output.
- **Dependencies:** Three.js, Drei, Lamina.

#### 2. The Administrator (Server/Auth)

- **Nodes:** `AdminDashboard`, `AuthGuard`, `ProjectsTable`.
- **Context:** Protected management area.
- **Dependencies:** Supabase Auth, Firebase Functions.

#### 3. The Content Engine (Data)

- **Nodes:** `useProjects`, `ProjectStore`, `RealtimeSubscriptions`.
- **Context:** Fetches and syncs data to UI.
- **Dependencies:** Supabase Realtime, Zustand.

#### 4. The Core (Shared)

- **Nodes:** `src/lib/utils` (Unified), `config/brand`.
- **Context:** Global helpers (cn, math, assets) available everywhere.
- **Dependencies:** clsx, tailwind-merge.

## Key Relationships

- `GhostCanvas` **observes** `ScrollState` (Zustand).
- `AdminDashboard` **controls** `Supabase:Projects`.
- `HeroSection` **embeds** `GhostCanvas`.

## Current Status (Bootstrapping)

- Agent System is being injected.
- Core app is stable.

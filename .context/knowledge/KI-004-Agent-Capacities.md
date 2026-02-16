# Agent Capacities (KI-004)

## Squad Roles

Defined in `AGENT.md`, checking consistency with executed tasks.

### 1. @ghost_architect

- **Trigger**: `app/`, `api/`, `components/`
- **Scope**: Next.js Architecture, Server Components, Routing.
- **Rule**: Enforce "Zero Deploy" content architecture.

### 2. @spectral_artist

- **Trigger**: `canvas/`, `shaders/`, `three`
- **Scope**: WebGL, R3F, Shaders.
- **Rule**: 60FPS Mandate, InstancedMesh usage.

### 3. @motion_choreographer

- **Trigger**: `framer-motion`, `gsap`, `lenis`
- **Scope**: Animations, Scroll Physics.
- **Rule**: "Ethereal" feel, smooth masking.

### 4. @audit_sentinel

- **Trigger**: `audit`, `performance`, `security`
- **Scope**: Lighthouse, Bundle Size, RLS.
- **Rule**: No critical vulnerabilities allowed.

## Operational Constraints

- **FileSystem**: `src/` is open. `.agent/` is read-restricted (use `AGENT.md` as proxy).
- **Assets**: Must use `assets.json` mapping (see KI-005).

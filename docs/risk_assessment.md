# Risk Assessment — portfoliodanilo.com Base Documental

> **Version:** 1.0.0
> **Date:** 2026-05-18
> **Scope:** Technical, Design System, Performance, Deploy, Assets, Security and Agent Governance risks.
> **Status:** APPROVED — Verified and aligned with the **Ghost System v3.0** architecture.

---

## Executive Summary

The **Ghost System v3.0** architecture mandates absolute performance, high design fidelity, and clean repository hygiene. This risk assessment acts as a structural defense mechanism, identifying potential vulnerabilities, measuring their impact, and establishing proactive mitigation strategies.

---

## Technical & Infrastructure Risks

| ID | Risk | Severity | Probability | Impact | Mitigation Strategy |
|----|------|----------|-------------|--------|---------------------|
| **T-01** | **Out-of-Sync Documentation (`.context/`)** | High | Medium | Agents generate code based on obsolete state, creating regressions or design system violations. | **SSOT Sync Mandate:** Update `.context/active_state.md` and adjustment logs after every major change. Perform weekly structural sync. |
| **T-02** | **Hydration Mismatch in Server-Side Components** | Medium | Medium | React UI flickers or fails to hydrate (especially in dynamic elements like Hero animations). | Use the `isMounted` guard (`useMotionGate` or state flag) to defer client-only rendering. Ensure deterministic SSR structure. |
| **T-03** | **Supabase Database Connection / RLS Bottlenecks** | Medium | Low | API response delays or policy execution timeouts in real-time widgets. | Optimize RLS policies to use deterministic parameters (e.g. `(SELECT auth.uid())` instead of dynamic nested loops). Use cached connections. |
| **T-04** | **Legacy Code & Large Files Bloat** | Medium | High | Large files (e.g. `template-schema.ts`, `ProjectForm.tsx` > 500 lines) slow down linting, parsing, and typechecking. | Modularize components and configuration schemas. Plan file splitting in subsequent repository hygiene sprints. |
| **T-05** | **Cloud Function Performance / Edge Fails** | Medium | Low | Fatal client-side error reporting failures or backend processing delays. | Build environment-based telemetry logging (`reportarErroWeb`). Ensure fallback queues are active if endpoints fail. |

---

## Design System & Motion Risks

| ID | Risk | Severity | Probability | Impact | Mitigation Strategy |
|----|------|----------|-------------|--------|---------------------|
| **DS-01** | **Identity Color Code Leak (Forbidden Colors)** | High | Low | Purple/violet colors leak onto main surfaces, violating the Void Black (#040013) & Ghost Blue (#0048ff) rules. | Strict Tailwind v4 tokens audits. RESTRICT purple/violet to dynamic hover effects and glitch/interactive animations only. |
| **DS-02** | **Forbidden CSS Motion Properties (e.g. `rotate` / `scale` over-usage)** | High | Medium | UI loses the "Ethereal/Minimalist" smooth motion feeling. | Restrict standard Framer Motion paths to `opacity`, `blur`, and `y` (`translateY`). Use pre-calculated geometry transforms in R3F. |
| **DS-03** | **Z-Index Layer Fragmentation** | High | Low | Interactive overlays collapse or block WebGL Canvas interactions. | Enforce structural compliance with `z-indices` tokens in `globals.css` `@theme`. Prohibit hardcoded arbitrary `z-[9999]`. |
| **DS-04** | **Grid System Non-Compliance** | Medium | Medium | Non-aligned section containers break the editorial grid on specific viewports. | Wrap all standard layout blocks in `.std-grid` or unified `Container` elements. Make exceptions only for full-bleed scenes (Hero/Beliefs). |

---

## WebGL & Performance Risks (60FPS Mandate)

| ID | Risk | Severity | Probability | Impact | Mitigation Strategy |
|----|------|----------|-------------|--------|---------------------|
| **P-01** | **Memory Leaks from Un-Disposed Three.js Assets** | Critical | Medium | Browser tab crashes, FPS drops below 50, and memory consumption grows indefinitely. | Manually call `.dispose()` on all geometry, material, and `InstancedMesh` instances on unmount. Clear Drei loader caches. |
| **P-02** | **WebGL Initialization Failure** | High | Low | Entire Canvas collapses, rendering a completely empty black screen on older devices or browsers without WebGL. | Gated rendering with solid HTML/CSS 2D Fallbacks. Check WebGL support prior to Canvas initialization (`useGhostScene` precheck). |
| **P-03** | **LCP/INP Degradation via Asset Bloat** | High | Medium | Large textures or heavy `.glb` files block the main thread during initial page load. | Bake static lighting and shadows. Compress meshes using Draco/GLTF-Pipeline. Keep assets under 1MB. Max texture size 1024px/2048px. |

---

## Security & Deploy Risks

| ID | Risk | Severity | Probability | Impact | Mitigation Strategy |
|----|------|----------|-------------|--------|---------------------|
| **S-01** | **Accessibility (A11y) Barriers** | High | Medium | Assisted navigation fails due to missing `main-content` landmarks or un-trapped focus in modals. | Audit semantic tags (`<main>`, `<header>`). Use absolute skip-links. Enforce focus-trapping inside dialogs/modals. |
| **S-02** | **API Key / Secret Token Exposure** | Critical | Low | Unauthorized access to Supabase database or Cloud project resources. | Strictly validate environment variables with Zod at runtime. Keep `.env` files in `.gitignore`. Run regular security scans. |
| **S-03** | **Metadata & SEO Inconsistencies** | Medium | Medium | Broken search crawling, missing OG tags, or dynamic canonical routing conflicts. | Enforce rigid metadata contracts for each Next.js route segment. Ensure static SSR tags map correctly. |

---

## Mitigation & Contingency Action Plans

### 🌌 1. WebGL/Canvas Safe Recovery (P-02 Mitigation)
If `THREE.WebGLRenderer` initialization fails, the scene must seamlessly transition to a high-fidelity 2D layout:
- **Primary Fallback:** A static, highly optimized WebP image matching the initial layout of the 3D scene (hosted locally to guarantee instant LCP).
- **Secondary Fallback:** Interactive CSS/SVG background gradients (Void Black to deep Abyss Blue) utilizing standard easing curves.

### 🛡️ 2. Memory Sanitization Guard (P-01 Mitigation)
To prevent heap exhaustion over extended user sessions:
- Integrate garbage collection hooks in custom hooks (`useParticleSystem` & `useGhostScene`).
- Safely check all scene children:
  ```typescript
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach((mat) => mat.dispose());
      } else {
        child.material?.dispose();
      }
    }
  });
  ```

### 🔒 3. Realtime Supabase Security Validation (S-02 Mitigation)
- Maintain database RLS (Row-Level Security) policies enabled for all operational tables.
- Run automated tests (`pnpm test:e2e`) to ensure administrative routes `/admin` are strictly guarded at the server level via middleware.

---

## Verification & Compliance

### Automated Gates
1. **Typecheck & Linting:** Run `pnpm run build-check` to verify codebase health.
2. **E2E Visual Integrity:** Execute Playwright tests to detect layout regressions and verify Z-index layers:
   ```bash
   pnpm test:e2e
   ```

### Operational Rules for Agents
- No file modifications inside `/src` shall violate this risk matrix.
- Any exception must be documented in `docs/risk_assessment.md` with approval comments.

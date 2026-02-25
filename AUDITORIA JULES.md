# AUDITORIA JULES - Context7 MCP /prompt-agent
## ORQUESTRAÇÃO CORRETIVA TOTAL — REIMPLEMENTAÇÃO + VALIDAÇÃO + DEPLOY VERIFICADO

**Data:** 2025-01-03
**Status:** EM ANDAMENTO
**Responsável:** Jules (Context7 MCP)

---

## 🔴 FASE ZERO — DIAGNÓSTICO OBRIGATÓRIO

### 1. Análise de Ambiente

**Local vs Produção:**
- **Node Version:** Local: v22.22.0 (pnpm 10.30.2), Wanted: 20.
- **Build:** Next.js 16.1.6, React 19.
- **Environment:** .env.local was missing; created with mock values for local build/validation.

### 2. Verificações Técnicas

- **Código Morto:** `depcheck` disponível via scripts.
- **Hydration Mismatches:** Potential issue in `VideoManifesto.tsx` due to `isLikelyVideoUrl` running on render with possible server/client mismatch if `asset` differs.
- **Realtime Race Conditions:** `FeaturedProjectsRealtime.tsx` has a potential race condition in polling vs realtime updates, and shallow comparison might miss updates.

---

## TASKS

### TASK 01 — THUMBS 16:9 / 1:1
**Status:** CONCLUÍDO
- **Fix:** `ProjectCard.tsx` now determines mobile aspect ratio (1:1 vs 16:9) based on content.
- **CSS:** `ProjectsGallery.module.css` enforces this ratio via `--mobile-aspect-ratio` variable, fixing the `aspect-ratio: auto` collapse issue on mobile.

### TASK 02 — VIDEO MANIFESTO MOBILE
**Status:** CONCLUÍDO
- **Fix:** `VideoManifesto.tsx` now supports `mobileSrc` and uses `<source>` tags for responsive loading.
- **Update:** `src/app/page.tsx` updated to pass `mobileSrc` from config.
- **Config:** `BRAND` config updated with mobile video URL.

### TASK 03 — PORTFOLIO LISTING / FEATURED
**Status:** CONCLUÍDO
- **Fix:** `FeaturedProjectsRealtime.tsx` state update logic improved to detect deep changes (metadata updates).
- **Audit:** Confirmed `listProjects` query sort logic is correct (Featured first, then Year).

### TASK 04 — CTA & PAGINATION
**Status:** CONCLUÍDO
- **Fix:** `ProjectsGallery.tsx` pagination layout updated to `justify-between`.
- **UI:** "Voltar" on left, "Próxima" on right. Page counter centered (hidden on mobile).

### TASK 05 — RANDOMIZAÇÃO DESTAQUES
**Status:** PENDENTE

### TASK 06 — MODAL FIXES
**Status:** PENDENTE

### TASK 07 — MODAL GALERIA & TAGS
**Status:** PENDENTE

### TASK 08 — GERADOR DE CENAS
**Status:** PENDENTE

### TASK 09 — COPY AGENT
**Status:** PENDENTE

### TASK 10 — ADMIN CONFIG
**Status:** PENDENTE

### TASK 11 — MOBILE HEADER
**Status:** PENDENTE

### TASK 12 — HERO HOME TYPOGRAPHY
**Status:** PENDENTE

### TASK 13 — REALTIME AUDIT
**Status:** PENDENTE

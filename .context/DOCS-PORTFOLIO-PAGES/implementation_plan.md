# Implementation Plan

## 1. Root Cause Analysis

### Video Issues

- Uso de object-cover → causa crop inevitável
- Troca via CSS (hidden/block) → ambos vídeos carregam
- Ausência de lógica de media selection

### Ghost Glow

- Blur stacking inconsistente
- Z-index conflitante
- Opacity não determinística

### Firebase Issues

- URLs externas sendo afetadas no build
- Falta de assetPrefix/basePath correto
- Rewrites incompletos

---

## 2. Proposed Architecture

### A. Media Layer (NEW)

Create `mediaResolver.ts`:

Responsável por:

- detectar breakpoint
- retornar source correto (desktop/mobile)

---

### B. Video Component Refactor

Create `ResponsiveVideo.tsx`:

- usa aspect-ratio container
- object-fit: contain
- troca dinâmica de source

---

### C. Ghost Glow Fix

- limitar blur layers
- controlar stacking context
- remover efeitos concorrentes

---

### D. Firebase Fix

Ajustar:

- firebase.json (rewrites)
- next.config.js:
  - assetPrefix
  - images/domains
- garantir que Supabase URLs não sejam transformadas

---

## 3. Files Affected

- components/ResponsiveVideo.tsx
- lib/mediaResolver.ts
- next.config.js
- firebase.json
- páginas:
  - home
  - sobre
  - portfolio

---

## 4. Risks

- hydration mismatch (SSR vs client)
- flicker na troca de vídeo
- cache inconsistente no Firebase

---

## 5. Validation Strategy

- resize contínuo
- simulação mobile
- deploy fresh
- verificação visual frame-by-frame

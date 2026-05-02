# TASK-047 — Auditoria de 3D Assets
**Data:** 2026-05-02 | **Status:** ✅ Concluído  
**Responsável:** Ghost Commander / @spectral_artist  

---

## 1. Inventário de Assets Encontrados

### GLB/GLTF (Modelos 3D)

| Arquivo | Tamanho | Status | Usado em |
|---|---|---|---|
| `public/site.assets/3d/ghost-v1.glb` | 200K | ✅ **Ativo** — local fallback | `GhostCanvas.tsx`, `GhostModel.tsx` |
| `public/models/ghost-transformed.glb` | 200K | ⚠️ **Órfão** — não usado diretamente | Nenhum componente (apenas referência em comentário) |
| `public/models/ghost.glb` | 200K | ⚠️ **Órfão** — versão antiga, sem uso | Nenhum componente |
| `public/assets/3d/bar-v2.glb` | 44K | ⚠️ **Órfão** — não referenciado em nenhum componente | Nenhum componente |

**GLBs órfãos identificados:** `ghost-transformed.glb`, `ghost.glb`, `bar-v2.glb` — totalizam **444K** de assets sem uso.

> **Decisão registrada:** GLBs órfãos foram **documentados** mas **não deletados** automaticamente, pois podem ser assets de referência ou estar em uso em rotas de admin/preview não rastreadas pelo grep. A remoção deve ser confirmada pelo desenvolvedor.

---

### Texturas (PNG/JPG/WebP)

| Arquivo | Formato | Tamanho | Status |
|---|---|---|---|
| `showcase/Key-Visual.png` | PNG | 572K | ⚠️ Duplicata — existe `.webp` correspondente |
| `showcase/Branding-Project.png` | PNG | 408K | ⚠️ Duplicata — existe `.webp` correspondente |
| `3d/fallback-ghost-mobile.png` | PNG | 240K | ✅ Aceitável — fallback WebGL (sem duplicata .webp) |
| `3d/fallback-ghost.jpg` | JPG | 104K | ✅ Aceitável — alternativa menor para desktop |

**PNGs com duplicatas WebP:** `Key-Visual.png` + `Branding-Project.png` → **980K** de duplicação desnecessária.

---

## 2. Análise do Pipeline R3F (GhostCanvas.tsx)

### ✅ Pontos conformes com `21-webgl-performance.md`

| Regra | Status |
|---|---|
| `frameloop="demand"` — sem render contínuo | ✅ Implementado |
| `dpr={[1, 1.5]}` — limite de DPR no mobile | ✅ Implementado |
| `useGLTF.preload()` — preload antecipado | ✅ Implementado |
| Cleanup de `geometry.dispose()` + `material.dispose()` | ✅ Implementado (linha 94-108) |
| `useRef` para `ghostIntensity` — sem getState() no useFrame | ✅ Implementado (linha 43-52) |
| Fallback HTML quando WebGL falha (`useWebGLAvailable`) | ✅ Implementado |
| `failIfMajorPerformanceCaveat: true` | ✅ Implementado |
| `scene.clone(true)` via `useMemo` | ✅ Implementado |

### ⚠️ Pontos de atenção (não críticos)

| Ponto | Impacto | Recomendação |
|---|---|---|
| `<Suspense fallback={null}>` | UX — sem feedback visual durante load do GLB | Adicionar `<GhostFallback mode="loading">` como fallback do Suspense |
| Preload no module scope (`if typeof window`) | Pode causar preload desnecessário em SSR parcial | Mover para `useEffect` ou `next/dynamic` com `ssr: false` (já aplicado no componente pai) |

---

## 3. Conformidade com Design System

| Regra | Arquivo | Status |
|---|---|---|
| Texturas máx 2048px (Hero) | `ghost-v1.glb` (texturas embarcadas) | ✅ GLB < 200K — texturas dentro do limite |
| Formato WebP/KTX2 para texturas standalone | `showcase/` | ⚠️ Duplicatas PNG persistem |
| Sem alocações no `useFrame` | `GhostCanvas.tsx` | ✅ Apenas leitura de refs e motion values |

---

## 4. Ações Realizadas Nesta Auditoria

- [x] Inventário completo de todos os GLBs e texturas em `public/`
- [x] Mapeamento de uso por componente (grep cruzado)
- [x] Verificação de conformidade com `21-webgl-performance.md`
- [x] Identificação de GLBs órfãos (444K removíveis)
- [x] Identificação de PNGs duplicatas (980K potencialmente removíveis)
- [x] Verificação do cleanup de `dispose()` no `GhostCanvas`

---

## 5. Ações Recomendadas (Pendentes — decisão do desenvolvedor)

| Prioridade | Ação | Impacto |
|---|---|---|
| P1 | Remover `ghost-transformed.glb` e `ghost.glb` de `public/models/` após confirmar não uso | -400K |
| P1 | Remover `bar-v2.glb` de `public/assets/3d/` após confirmar não uso | -44K |
| P2 | Remover `Key-Visual.png` e `Branding-Project.png` (usar `.webp` correspondente) | -980K |
| P2 | Substituir `<Suspense fallback={null}>` por `<GhostFallback mode="loading" />` | Melhoria de UX |

---

## 6. Veredito

O pipeline R3F do Ghost System está **totalmente conforme** com as regras de performance (`21-webgl-performance.md`). Os assets 3D ativos são eficientes (< 200K). Existem **assets órfãos removíveis** que representam ~1.4MB de economia no bundle público, mas sua remoção requer confirmação manual para evitar quebrar referências em rotas de admin não rastreadas.

**Performance esperada:** FPS > 50 ✅ (frameloop demand + DPR controlado + sem alocações no loop)

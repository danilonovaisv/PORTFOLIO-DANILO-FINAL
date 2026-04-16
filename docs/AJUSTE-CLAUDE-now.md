# Auditoria Ghost Design System v3.1 — `bb4429b`

**13 desvios encontrados: 5 Críticos · 5 Moderados · 3 Menores**

> Escopo: `globals.css`, `error.tsx`, `global-error.tsx`, `not-found.tsx`,
> `AboutBeliefs.tsx`, `AboutHero.tsx`, `AboutMethod.tsx`, `AboutClosing.tsx`,
> demais arquivos em `src/components/sobre/`
>
> Referência: Ghost Design System v3.1 (`GHOST-DESIGN-SYSTEM.md`)

---

## 🔴 Críticos — bloqueiam qualidade visual em produção

### [C-01] `globals.css` — `--color-textSecondary` com valor incorreto

| | |
|---|---|
| **Arquivo** | `src/app/globals.css` → bloco `@theme` |
| **SSOT** | `--color-textSecondary: #a1a3a3` (cinza muted) |
| **Código** | `--color-textSecondary: #fcffff` (idêntico ao texto primário) |
| **Impacto** | Hierarquia visual colapsada — metadata, captions e estados inativos ficam com o mesmo contraste que headings |

### [C-02] `globals.css` — `--color-redAccent` ausente do `@theme`

| | |
|---|---|
| **Arquivo** | `src/app/globals.css` → bloco `@theme` |
| **SSOT** | `--color-redAccent: #E50914` |
| **Código** | Token nunca declarado → `text-redAccent` não gera CSS |
| **Impacto** | Cor semântica de erro não-funcional em toda a aplicação |

### [C-03] `error.tsx` — token inválido + Motion violation

| | |
|---|---|
| **Arquivos** | `src/app/error.tsx` e `src/app/sobre/error.tsx` |
| **Problema 1** | `text-accentRed` — token inexistente; nome correto: `text-redAccent` |
| **Problema 2** | `hover:scale-105 active:scale-95` — SSOT §2.3 proíbe `scale` em elementos UI |
| **Impacto** | `h2 "Something went wrong!"` renderiza sem cor de alerta; botão viola sistema de motion |

### [C-04] `AboutHero.tsx` — três classes CSS inexistentes

| | |
|---|---|
| **Arquivo** | `src/components/sobre/sections/AboutHero.tsx` |
| **Classes inválidas** | `text-text-light` · `type-h3` · `font-h1` |
| **Correções** | `text-textSecondary` · `text-h3` · `text-h1` |
| **Impacto** | Nenhuma cor aplicada ao título; escala tipográfica ignorada |

### [C-05] `AboutBeliefs.tsx` — z-index invertido entre Ghost 3D e manifesto final

| | |
|---|---|
| **Arquivo** | `src/components/sobre/sections/AboutBeliefs.tsx` |
| **Código** | Ghost 3D: `z-50` · Manifesto final overlay: `z-40` |
| **SSOT §1.3** | Canvas/R3F FX = `z-30` · Final Overlays/Modals = `z-50` |
| **Impacto** | "ISSO É GHOST DESIGN." fica invisível sob o modelo 3D — clímax da seção suprimido |

---

## 🟠 Moderados — violam SSOT, não bloqueiam renderização base

### [M-01] `global-error.tsx` — 5 magic numbers de cor

| Uso atual | Token correto |
|---|---|
| `text-[#94a3b8]` | `text-textSecondary` |
| `text-[#cbd5f5]` | cor inexistente no Ghost System — remover ou mapear |
| `bg-[#040013]` | `bg-(--color-background)` |
| `hover:bg-[#4fe6ff]` | `hover:bg-blueAccent` |
| `focus-visible:ring-[#4fe6ff]` | `focus-visible:ring-blueAccent` |

### [M-02] `globals.css` — valores dos tokens de z-index incorretos

| Token CSS | Valor no código | Valor SSOT |
|---|---|---|
| `--z-layer-content` | `10` | `20` |
| `--z-layer-3d` | `20` | `30` |
| `--z-layer-header` | `40` | `55` |

Risco de z-fighting entre Header e Canvas 3D durante o scroll.

### [M-03] `globals.css` — classe `.text-small` ausente da escala tipográfica

| | |
|---|---|
| **SSOT §1.2** | `.text-small` → `0.875rem` / `font-weight: 400` / `line-height: 1.4` |
| **Impacto** | Escala pula de `.text-body` direto para `.text-micro`; qualquer componente com `.text-small` renderiza sem estilo |

### [M-04] 9 arquivos em `/sobre` — `text-white` em vez de `text-text`

| | |
|---|---|
| **Arquivos afetados** | `page.tsx`, `loading.tsx`, `AboutHero`, `AboutWhatIDo`, `AboutMethod`, `AboutClosing`, `AboutSkeleton`, `not-found.tsx` |
| **SSOT** | `--color-text: #fcffff` → classe = `text-text` |
| **Problema** | `text-white` = `#ffffff` ≠ `#fcffff`; viola "No Magic Numbers" |

### [M-05] `AboutMethod.tsx` — três violações simultâneas

| | |
|---|---|
| **Problema 1** | `type-h3` — classe inexistente; usar `text-h3` |
| **Problema 2** | `bg-[rgba(26,26,46,...)]` — magic number; usar `bg-neutral/85` |
| **Problema 3** | Parallax `['-10%', '10%']` = shift de 20%; SSOT §2.4 limita a 15% — corrigir para `['-7%', '7%']` |

---

## 🟡 Menores — baixo risco, polimento

### [m-01] `AboutClosing.tsx` — `opacity-92` inválido

Tailwind só gera steps de 5 (`opacity-90` / `opacity-95`). Usar `opacity-90`.

### [m-02] `font-display` — risco de colisão de namespace em 3 componentes

`--font-family-display` não está definido no `@theme`. O token `--font-display` já é um valor de `font-size` na escala Ghost, não `font-family`. Usar `font-sans text-display` nos 3 componentes afetados.

### [m-03] `AboutMethod.tsx` — magic numbers tipográficos

| Uso atual | Token correto |
|---|---|
| `text-[14px]` | `text-small` |
| `text-[16px]` | `text-body` |
| `text-[20px]` | `text-h3` |

---

## Resumo executivo

| ID | Arquivo(s) | Categoria | Prioridade |
|---|---|---|---|
| C-01 | `globals.css` | Token de cor errado | 🔴 P0 |
| C-02 | `globals.css` | Token ausente | 🔴 P0 |
| C-03 | `error.tsx` (root + sobre) | Token inválido + Motion violation | 🔴 P0 |
| C-04 | `AboutHero.tsx` | Classes CSS inexistentes | 🔴 P1 |
| C-05 | `AboutBeliefs.tsx` | Z-index invertido (Ghost cobre manifesto) | 🔴 P0 |
| M-01 | `global-error.tsx` | Magic numbers de cor | 🟠 P2 |
| M-02 | `globals.css` | Z-index tokens com tier errado | 🟠 P1 |
| M-03 | `globals.css` | `.text-small` ausente | 🟠 P2 |
| M-04 | 9 arquivos `/sobre` | `text-white` vs `text-text` | 🟠 P2 |
| M-05 | `AboutMethod.tsx` | Classe inválida + magic bg + parallax excessivo | 🟠 P1 |
| m-01 | `AboutClosing.tsx` | `opacity-92` inválido | 🟡 P3 |
| m-02 | 3 componentes `/sobre` | `font-display` namespace collision | 🟡 P3 |
| m-03 | `AboutMethod.tsx` | Magic numbers tipográficos | 🟡 P3 |

**Próximo passo:** plano de correção com tasks atômicas por arquivo.

# Implementation Plan — /sobre Text Animations + 03-ORIGEM-CRIATIVA Image Entrance

> Status: **PLANNING — awaiting approval (Aprovado / Proceed). No implementation yet.**
> Primary agent: frontend-specialist · Supporting: orchestrator, spectral-artist
> Reference behaviors: Magic UI Text Reveal (word fade on scroll) + ishamsu scroll-cards (sticky stacked reveal). Adapted to Ghost, NOT copy-pasted.

“A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...”

---

## 1. Current Architecture Findings

**Route:** `src/app/sobre/page.tsx` — `force-static`, Server Component, sections in Suspense. Order: Hero → Origem → WhatIDo → Method → Manifesto → **Prova** → Closing → SiteClosure + StickyContactCTA.

**Section 03-ORIGEM-CRIATIVA:**
- `src/components/sobre/sections/AboutOrigin.tsx` — resolves 4 images via `useSiteAssetUrl` (Supabase, fallbacks em `origin/data.ts`), passes blocks to children, calls `useOriginAnimations`.
- `src/components/sobre/origin/OriginComponents.tsx`:
  - `OriginInfoBlock` — **mobile**: `motion/react` `whileInView` fade+blur+y on title/paragraph; image clipPath reveal. **Desktop**: static `<h2 data-origin-title>` + `<p data-origin-copy>` (anchors driven by GSAP). Paragraph já destaca frase-âncora em `bluePrimary` via `renderParagraph(highlight)`.
  - `OriginStickyGallery` — desktop sticky 6-col, 4 `.origin-img` empilhadas + `.origin-mask` overlay. `pointer-events-none`.
- `src/components/sobre/origin/useOriginAnimations.ts` — GSAP `matchMedia('min-width:1024px')`; per-block `ScrollTrigger` (discrete onEnter, não scrubbed), `clipPath: inset(100%→0)` mask reveal, blur 4→0, opacity .85→1; text anchors opacity/blur/y; `archRightEl` entrance (`gsap.from` y+opacity) + parallax scrub `y: -offset`. Reduced-motion: duration fast + ease 'none'.

**Text animation utilities (existing — reuse, não duplicar):**
- `src/lib/motion/` → `hero.ts` (`titleLineVariants`, `subtitleVariants`), `stagger.ts` (`staggerContainer`), `reveal.ts` (`ghostReveal`/`ghostFade`), `gsapGhostEase.ts` (`GSAP_GHOST_EASE`), `viewport.ts` (`viewportConfig`).
- `src/config/motion.ts` → `GHOST_EASE = [0.22,1,0.36,1]`, `MOTION_TOKENS` (duration/delay/offset/stagger).
- `src/hooks/useMotionGate.ts` → reduced-motion gate.
- **No word-level scroll-reveal primitive exists.** (`grep TextReveal/WordReveal/by-word` = vazio.)

**Image strategy:** `src/components/ui/shared/DynamicAssetImage.tsx` wraps `next/image` (width/height, objectFit — NÃO usa `layout="fill"` deprecado). Keys em `src/config/site-assets` (não `.json`). Real assets Supabase, fallback local. Alt já = `block.title`.

**Infra:** `cn` em `src/lib/utils.ts`. Tailwind **v4 Oxide** — `src/app/globals.css` linha 1 `@import "tailwindcss"` + `@source "../components/**/*..."` (cobre arquivos novos sob `components/` automaticamente). `motion/react` (Framer v11, pacote `motion`) já em uso em todo o projeto.

---

## 2. Files Likely Affected

| Ação | Arquivo |
|---|---|
| **NOVO** | `src/components/ui/motion/TextReveal.tsx` (primitiva word-reveal scroll-driven) |
| EDIT | `src/components/sobre/origin/OriginComponents.tsx` (mobile paragraphs → TextReveal; gallery markup p/ stack) |
| EDIT | `src/components/sobre/origin/useOriginAnimations.ts` (entrance: clipPath → stacked translateY+blur+opacity) |
| EDIT (talvez) | `src/components/sobre/sections/AboutOrigin.tsx` (props se a galeria precisar) |
| DOC | `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/ANALISE-GLOBAL-DA-SOBRE.md` (se mudança estrutural) |
| **SEM mudança** | `tailwind` config, `globals.css` (@source já cobre), nenhum `package.json` |

---

## 3. Proposed Component Strategy

### 3.1 Text Reveal — CRIAR `src/components/ui/motion/TextReveal.tsx`
- **Por quê criar:** nenhuma primitiva equivalente existe. Registry Magic UI / `shadcn add @magicui/text-reveal` traz código maior + assume tokens próprios. Local menor + Ghost tokens = mais seguro. **Sem dep nova** (`motion/react` presente). **Sem install.**
- **API:** `<TextReveal text={string} highlight?={string} as?={'p'|'h2'} className?={string} />`. Client component (`'use client'`).
- **Comportamento:** `useScroll({ target: ref, offset: ['start 0.85','start 0.4'] })`; split por palavra; cada palavra `useTransform(scrollYProgress, [i/n, (i+1)/n], [0,1])` em **opacity** + **blur(8→0px)** (translateY opcional ≤ token offset). Inherits tipografia Ghost (sem font hardcode). **Preserva `highlight`**: a(s) palavra(s) da frase-âncora recebem `text-bluePrimary` (mesma lógica do `renderParagraph` atual) — split mantém o grupo destacado.
- **No layout jump / no 200vh trap:** reveal acontece na altura natural do elemento; nenhuma seção pinada extra.
- **Reduced motion:** `useMotionGate` → renderiza texto plano, 100% opaco, sem split/transform.

### 3.2 Onde aplicar (decisão crítica — conflito GSAP)
- **Mobile `OriginInfoBlock` paragraphs:** trocar `whileInView` fade por `TextReveal` word reveal. Sem GSAP nesses nós → seguro.
- **Desktop pinned copy (`data-origin-copy`):** **NÃO** aplicar word-reveal — GSAP já dirige opacity/blur/y nesses nós; dois motores no mesmo elemento = briga de estado. Mantém GSAP. (Honestidade: a referência Magic UI é scroll-linked; o desktop do Origem é discrete-trigger GSAP. Não reescrevo o desktop sem necessidade comprovada — constraint respeitado.)
- Resultado: word-reveal entra **mobile**; desktop preserva arquitetura GSAP intacta.

### 3.3 Image Entrance — REFATORAR (NÃO criar `scroll-cards.tsx`)
- `OriginStickyGallery` + `useOriginAnimations` JÁ são o sticky-stacked-reveal. Criar `scroll-cards.tsx` genérico = duplicação proibida. **Refatoro o existente.**
- **Mudança:** entrance das imagens de `clipPath inset` para **stacked translateY + opacity + blur** (rise/settle empilhado, estilo scroll-cards) — tudo dentro do permitido Ghost (translateY, opacity, blur). **Sem `scale`/`rotate`** (a referência usa scale → removido). Pin sticky mantido; triggers discretos por bloco mantidos.
- `next/image` via `DynamicAssetImage` (já correto). Alt real = `block.title`.
- **Mobile:** stack inline texto→imagem (atual) — sem pin, sem scroll-trap, sem altura morta. Validar que refator não introduz blank height.

---

## 4. Create vs Refactor — Verdict

| Componente | Decisão |
|---|---|
| `src/components/ui/.../TextReveal.tsx` | **CRIAR** — sem equivalente. |
| `src/components/ui/scroll-cards.tsx` | **NÃO criar** — refatorar `OriginStickyGallery`/`useOriginAnimations`. |

---

## 5. Dependency Check
- `framer-motion`: presente como `motion` (`motion/react`) — usado em todo o projeto. ✅ sem install.
- `next`: presente (`next/image` via DynamicAssetImage). ✅
- `@/lib/utils` (`cn`): presente. ✅
- GSAP + ScrollTrigger: presente (`useOriginAnimations`). ✅
- **Nenhuma instalação. Nenhum shadcn/registry import. Nenhuma mudança Tailwind.**

---

## 6. Motion Timing & Easing
- Easing: `GHOST_EASE = cubic-bezier(0.22,1,0.36,1)` (Framer) / `GSAP_GHOST_EASE` (GSAP). Sem exceções.
- TextReveal: scroll-linked (sem duration; mapeia progress). Janela por palavra = `1/n` do range, leve overlap.
- Image stack: durations de `MOTION_TOKENS` (normal ~0.9s; fast 0.2s reduced). translateY ≤ `MOTION_TOKENS.offset.standard`. blur 4–8→0.
- Permitido: opacity, blur, translateY. Proibido: scale, rotate, bounce/spring elástico.

---

## 7. Responsive Behavior
- **Mobile (<1024):** TextReveal nos paragraphs (offset mais curto p/ ritmo rápido em telas pequenas); imagens inline stack, sem pin.
- **Tablet (768–1024):** mesma faixa mobile (Origem desktop só ≥1024 via matchMedia GSAP).
- **Desktop (≥1024):** GSAP pinned gallery refatorado (stacked translateY+blur); copy via GSAP (sem word-reveal).
- Sem scroll-trap; sem `200vh` novo.

---

## 8. Accessibility & Reduced Motion
- `useMotionGate` em TextReveal e no refator GSAP (já presente: duration fast + ease 'none').
- Reduced-motion → texto plano 100% opaco, imagens estáticas visíveis, sem transform/blur.
- Preserva `aria-labelledby="origin-heading"`, alt real por imagem, hierarquia `<h2>`/`<p>`.
- Contraste Ghost mantido (textPrimary `#fcffff`, highlight `#0048ff`).

---

## 9. Risks & Rollback
**Riscos:**
1. **Highlight × word-split** — split por palavra pode quebrar o span `bluePrimary`. Mitigação: TextReveal trata `highlight` como grupo contíguo (reusa lógica `renderParagraph`).
2. **GSAP × Framer no mesmo nó** — por isso word-reveal só no mobile (nós não-GSAP).
3. **Refator do entrance** pode alterar timing do mask/parallax existente. Mitigação: mudança incremental, manter triggers; validar scroll desktop antes/depois.
4. **Oxide purge** — arquivo novo sob `components/` já coberto por `@source` → sem risco de classe purgada. Confirmar nenhuma classe dinâmica string-concatenada.

**Rollback:** novo arquivo = deletar; arquivos editados = `git checkout --` dos 2–3 paths. Mudança isolada à seção Origem; resto da página intacto.

---

## 10. Validation Commands (após aprovação)
```bash
pnpm run typecheck
pnpm run lint
pnpm run build          # confirmar /sobre static, sem Oxide regression
```
+ Preview `/sobre`: scroll mobile (DevTools responsive) e desktop; checar console (zero erros), word reveal mobile, entrada de imagem 03-ORIGEM, ausência de scale/rotate, reduced-motion.

---

## 11. Approval Gate
Parar aqui. Implementar só após **Aprovado** ou **Proceed**.
Se a implementação tocar >1 seção/componente, usar `/orchestrate` (heurística total 12).

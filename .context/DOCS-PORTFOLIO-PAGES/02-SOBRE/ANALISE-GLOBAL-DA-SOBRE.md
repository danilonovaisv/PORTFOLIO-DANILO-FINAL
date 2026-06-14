# ANÁLISE GLOBAL DA HOME (PÁGINA /SOBRE)

## Atualização de Auditoria — 2026-04-16

- Escopo focal desta atualização:
  - rota `/sobre`
  - seção `06 O Que Me Move` e `04 O Que Eu Faço`
  - eixo `UI/UX (legibilidade e consistência visual)`
- Resultado objetivo e Fixes:
  - `04 O Que Eu Faço`: Sombras dos cards ajustadas para a paleta correta `shadow-purpleDetails/10` em vez de hexadecimais engessados e pesados.
  - `06 O Que Me Move`:
    - Fix de `z-index` no `GhostCanvas` para ficar `z-30` (abaixo do manifesto `z-50`).
    - Fix no `BeliefFixedHeader` para começar com `opacity: 0` e usar um mapeamento de opacidade no `useTransform` garantindo clareza na primeira leitura.
    - Fix na offset do `useScroll` (`['start end', 'end end']`) para corrigir o tempo do scroll progress.
- Conclusão desta rodada:
  - Os itens críticos de z-index, opacidade inicial e cor/sombras foram mitigados para alinhamento com a documentação do Ghost.

## Atualização de Auditoria — 2026-05-11

Relatório completo em `AUDIT_PENTEST_SOBRE.md` (17 violações: 4 críticas, 7 altas, 6 médias, 4 baixas). Esta rodada corrigiu **C1–C4** e **H1–H6** (críticas + altas) e os gates de `prefers-reduced-motion` no Beliefs.

### Fixes aplicados

- **C1** `bg-void` quebrado em `OriginComponents.tsx:174` — substituído por `bg-background` com token `--z-layer-glass`. A cortina visual da Origem volta a funcionar.
- **C2** z-index do `GhostSceneFallback` realinhado ao token `--z-layer-3d` (30) em vez de `Z_INDEX.beliefs.ghost` (70). O SVG fallback não sobrepõe mais o manifesto. Removida a dependência de `@/config/z-indices` desse componente.
- **C3** 12 raw GSAP eases (`power*.in/inOut/out`) substituídas por `GSAP_GHOST_EASE` em `BeliefBackground`, `BeliefOverlay`, `BeliefManifesto`, `BeliefScrollText` e `belief.constants.ts`. `ease: 'none'` foi preservado quando linear é intencional (scrub puro).
- **C4** `scale` removido de `BeliefManifesto`, `BeliefScrollText` e `SplitGhostText`; `y` capado em `MOTION_TOKENS.offset.standard` (18px) em vez de 30. `rotateX` removido do `SplitGhostText` (rotate é proibido). DS §2.3 obedecido.
- **H1** Todas as 20+ classes raw `z-N` substituídas por tokens `z-[var(--z-layer-id)]`. Inclui Hero, Origin, WhatIDo, Method, Closing, Beliefs e Skeleton.
- **H2** `rgba(10,10,20,*)` do AboutMethod e `bg-black/30` do AboutClosing trocados por `bg-background/*`. `bg-[#040013]` do AboutBeliefs e BeliefBackground trocados por `bg-background`. SVG fallback usa `var(--color-text)` e `var(--color-redAccent)`. Vignettes radiais usam `color-mix(in oklab, var(--color-background) * %, transparent)`.
- **H3** 4× `as any` no `GHOST_EASE` removidos (`OriginComponents` e `AboutHero`). `EasingTuple` é compatível com o tipo `Easing` do framer-motion sem cast.
- **H4** `viewport: { once: false }` substituído por `viewportConfig` (`once: true`) no Hero e Closing. Animação não replica em cada scroll.
- **H5/H6** `.std-grid` aplicado no desktop do `AboutWhatIDo` e no mobile do `AboutHero`.
- **A11y** `BeliefBackground`, `BeliefManifesto` e `BeliefScrollText` agora respeitam `prefers-reduced-motion`. Manifesto fica visível no estado inicial; ScrollText é desmontado.
- **SplitGhostText** tipo de `ease` corrigido para `gsap.TweenVars['ease']` (string ou função); default agora é `GSAP_GHOST_EASE`. Perspective/transformStyle 3D removidos (sustentavam rotateX, agora proibido).

### Pendências para próximo PR

- **M1** unificar `Z_INDEX` (`src/config/z-indices.ts`) com `--z-layer-id`. Avaliar deprecar o mapa TS.
- **M2/M4** `Invalidator` no `GhostScene` segue rodando RAF mesmo fora do viewport. Adicionar `IntersectionObserver`.
- **M3** `useGLTF.preload` à top-level do módulo. Mover para `useEffect` condicional.
- **M5/H7** `AboutMethod` declara `<m.div style={{ y: 0 }}>` sem motion value real. Decidir: remover ou conectar a `useScroll/useTransform` com gate `useMotionGate`.
- **M6** unificar `useIsMobile` (`AboutClosing`) com `useMediaQuery` existente.
- **B1–B4** limpezas menores (comentários genéricos, marquee paused via CSS, padronizar named exports, `Person` schema).

### Critérios de Done (revistos)

- [x] C1–C4 corrigidos e validados via grep estrutural.
- [ ] `pnpm run build-check` validado no CI (este ambiente não tem `node_modules`).
- [ ] Lighthouse `/sobre` ≥ 90 Performance e ≥ 95 A11y.
- [ ] FPS ≥ 50 medido no Chrome Performance Monitor durante scroll do Beliefs.

---

## Atualização de Auditoria — 2026-05-18

### Fixes aplicados nesta rodada

| Item                            | Arquivo(s)                            | Status                                                        |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| M1 — z-indices.ts               | `src/config/z-indices.ts`             | ✅ Arquivo já deletado em pass anterior                       |
| M2/M4 — SceneInvalidator Otimiz | `GhostScene.tsx`                      | ✅ Observers agora acoplam listeners globais condicionalmente |
| M3 — useGLTF.preload top-level  | `GhostModel.tsx`                      | ✅ Guard `typeof window !== 'undefined'` mitigava SSR; aceito |
| M5 — `style={{ y: 0 }}` phantom | `AboutMethod.tsx`                     | ✅ Já resolvido em pass anterior                              |
| M6 — useIsMobile dedup          | `AboutHero.tsx`, `VideoManifesto.tsx` | ✅ Migrados para `useMediaQuery`                              |
| Hook `useIsMobile.ts`           | `src/hooks/useIsMobile.ts`            | ✅ Deletado — zero callers                                    |
| B1–B4                           | vários                                | ✅ Todos já resolvidos em passes anteriores                   |

### Validação 2026-05-18

- `pnpm lint` (local ESLint): ✅ zero errors em `src/components/sobre/`
- `pnpm typecheck`: ✅ zero errors
- `pnpm build`: ✅ `/sobre` prerendered como `○ (Static)` — `force-static` ativo
- Hook `useIsMobile.ts` eliminado — substituído por `useMediaQuery` canônico em todo o projeto

### Pendências remanescentes

- `fix/audit-remediation-phase1` branch com 6 commits exclusivos (cache-control headers, GhostCanvas fallback, slug-utils) — requer avaliação de merge separado
- Lighthouse `/sobre` ≥ 90 Performance e ≥ 95 A11y — ainda não medido
- FPS ≥ 50 no Chrome Performance Monitor durante scroll do Beliefs — ainda não medido

### Consultoria CRO/UX + Fase 1 + Prova — 2026-06-13

Mudança estrutural na ordem de seções (prova antes da decisão) e ganhos rápidos de copy/CRO.

**Nova ordem:** Hero → Origem → O que eu faço → Como eu trabalho → O que me move → **Prova & Autoridade (NOVO)** → Fechamento → SiteClosure. CTA persistente (`StickyContactCTA`) global.

**Implementado:**
- `AboutProof.tsx` (`#prova`): logos reais (Supabase, 12) + slots de métricas/depoimentos lidos de `ABOUT_CONTENT.proof`. Slots vazios não renderizam — sem dados inventados (Real Content Only).
- `StickyContactCTA.tsx`: CTA "fale comigo" aparece pós-Hero, oculta-se ao chegar em `#contact` (IntersectionObserver + scroll). Analytics opcional (gtag/dataLayer).
- `AboutHero`: sublinha funcional ("Direção de criação · Branding · Design estratégico") + micro-CTA "ver como trabalho ↓" → `#04-o-que-eu-faco`.
- `content.ts`: typo "Design with propósito"→"com propósito"; CTA "baixar curriculum"→"baixar apresentação" (PDF `public/cv-danilo-novais.pdf` confirmado, 968KB).
- `AboutWhatIDo`: marquee redundante removido (duplicava os 7 serviços).
- `ManifestoScrollSection`: easing do reveal padronizado para o Ghost ease `cubic-bezier(0.22,1,0.36,1)`.
- `AboutOrigin`/`origin/data.ts`: frase-âncora por bloco destacada em `bluePrimary` (escaneabilidade mobile).

**Dependência aberta:** métricas e depoimentos reais (preencher `ABOUT_CONTENT.proof.metrics`/`.testimonials`).

**Validação:** `pnpm typecheck` ✅ · `pnpm lint` ✅ (0 erros) · SSR `/sobre` renderiza `#prova` com 12 logos, sublinha, highlights e CTAs.

**Backlog (Fases 2-3 da consultoria):** modal/scroll-foco no "fale comigo"; gate do shader por viewport (M2/M4) + Lighthouse; reframe dor→solução nos serviços; aterrissagem do clímax "O que me move"; reavaliar `translateX` do scroll horizontal. Detalhe completo no plano da consultoria.

### Motion 03-ORIGEM + TextReveal — 2026-06-13

Animações de texto e entrada de imagem do Origem ajustadas (ref. Magic UI text-reveal + scroll-cards, adaptado ao Ghost).

- **NOVO `src/components/ui/motion/TextReveal.tsx`:** word-reveal scroll-driven (opacity + blur), preserva highlight `bluePrimary`, fallback reduced-motion. Sem dep nova (`motion/react`), sem registry install.
- **Origem mobile** (`OriginComponents.tsx`): parágrafo passou de `whileInView` fade para `TextReveal` (revelação palavra-a-palavra). Desktop (`data-origin-copy`) **inalterado** — dirigido por GSAP, evita conflito de motores.
- **Entrada de imagem desktop** (`useOriginAnimations.ts`): `clipPath inset` → **stacked translateY + opacity + blur**. Pin sticky, triggers discretos e parallax mantidos. Mask overlay legado desativado (`autoAlpha:0`). Sem `scale`/`rotate`.
- Movimento: só opacity/blur/translateY; easing Ghost. Tailwind Oxide: arquivo novo coberto por `@source "../components/**"`, zero mudança de config.
- **Validação:** `pnpm typecheck` ✅ · `pnpm lint` ✅ (0 erros) · SSR ✅ · zero console errors · clipPath removido confirmado. Captura visual do entrance pendente de validação manual (bug na preview headless: viewport reporta 1px, Lenis intercepta scroll).
- Detalhe: `docs/plans/sobre-origem-motion/{implementation_plan,task,walkthrough}.md`.

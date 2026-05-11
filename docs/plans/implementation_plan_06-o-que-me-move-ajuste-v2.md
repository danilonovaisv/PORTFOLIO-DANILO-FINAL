# Implementation Plan — 06-O-QUE-ME-MOVE Ajuste v2
> Gerado automaticamente em 2026-05-07 por tarefa agendada (scheduled-task audit)

---

## Objetivo

Corrigir divergências entre a implementação atual da seção `06-O-QUE-ME-MOVE` e o blueprint congelado em `06-O-QUE-ME-MOVE-AJUSTE.md`, com foco em: paleta cromática, proibições de motion, limites de offset, easing, acessibilidade e fontes visuais do manifesto.

---

## Contexto Analisado

Blueprint referência: `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-AJUSTE.md`

Arquivos auditados:
- `src/components/sobre/sections/AboutBeliefs.tsx`
- `src/components/sobre/beliefs/belief.constants.ts`
- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefScrollText.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/beliefs/SplitGhostText.tsx`
- `src/components/sobre/beliefs/BeliefsScrollProvider.tsx`
- `src/hooks/useBeliefsScroll.ts`
- `src/components/sobre/3d/GhostScene.tsx`
- `src/config/motion.ts`
- `src/config/colors.ts`

---

## Estado Atual Observado

| Componente | Estado |
|---|---|
| `AboutBeliefs.tsx` | Orquestrador OK — estrutura de camadas e BeliefsScrollProvider corretos |
| `belief.constants.ts` | **ERRADO** — paleta cromática sem purple/pink |
| `BeliefBackground.tsx` | Mecânica GSAP ScrollTrigger correta; paleta errada (via constants) |
| `BeliefScrollText.tsx` | **VIOLATIONS** — scale proibido, y > 18px, easing errado, max-width errado, sem aria-live, sem reduced motion |
| `BeliefManifesto.tsx` | **VIOLATION** — scale: 1.05 no finalLock; font-size não declarado explicitamente |
| `SplitGhostText.tsx` | **VIOLATION** — scale: 0.95/0.98 em todas as animações |
| `BeliefFixedHeader.tsx` | OK — usa SplitGhostText (violação de scale herdada) |
| `GhostScene.tsx` | OK — opacity + y apenas, frameloop demand, hierarquia z-index correta |
| `useBeliefsScroll.ts` | OK |
| `motion.ts` | OK — GHOST_EASE = [0.22, 1, 0.36, 1] correto; GHOST_EASE_AMBIENT = [0.17, 0.55, 0.55, 1] para BG |
| `colors.ts` | OK — purpleDetails: #8705f2 e pinkDetails: #f501d3 existem mas não são usados em belief.constants |

---

## Divergências Encontradas vs Blueprint

### GAP 1 — PALETA CROMÁTICA (CRÍTICO)
**Blueprint**: `#040013 → #0048ff → #8705f2 → #f501d3 → #0048ff → #8705f2 → #f501d3 → #0048ff`
**Atual** (`belief.constants.ts`): `#040013 → #001a4d → #0048ff → #4fe6ff → #0048ff → #001a4d → #4fe6ff → #040013`

Problema duplo:
- Cores erradas: usa `#001a4d` (dark blue) e `#4fe6ff` (cyan) em vez de `#8705f2` (purple) e `#f501d3` (pink)
- Cor final errada: termina em `#040013` (Void) em vez de `#0048ff` (Ghost Blue) — viola critério de aceite "Fundo final azul confirmado"

`motion.ts` já tem `MOTION_TOKENS.colors.bgCycle` com cores corretas (usando COLORS tokens). `belief.constants.ts` duplica com valores errados.

---

### GAP 2 — SCALE PROIBIDO (CRÍTICO — REGRA VIOLADA)
**Blueprint**: `scale` proibido em motion DOM.

Violações encontradas:
| Arquivo | Linha | Código proibido |
|---|---|---|
| `BeliefScrollText.tsx` | ~47 | `scale: 0.96` (entry) |
| `BeliefScrollText.tsx` | ~60 | `scale: 0.98` (exit) |
| `BeliefManifesto.tsx` | ~50 | `scale: 1.05` no finalLock |
| `SplitGhostText.tsx` | ~47 | `scale: 0.98` (scrub mode) |
| `SplitGhostText.tsx` | ~64 | `scale: 0.95` (non-scrub mode) |

---

### GAP 3 — Y-OFFSET EXCEDE MÁXIMO
**Blueprint**: max 18px para `translateY`.
**Atual** (`BeliefScrollText.tsx`): `y: 30` (entry) e `y: -30` (exit) — excede em 67%.

---

### GAP 4 — EASING INCORRETO EM BeliefScrollText
**Blueprint**: `cubic-bezier(0.22, 1, 0.36, 1)` (GHOST_EASE).
**Atual**: `power2.out` (entry) e `power2.in` (exit) — GSAP easings padrão, não compatíveis.

Equivalente GSAP para `cubic-bezier(0.22, 1, 0.36, 1)`:
```js
ease: 'cubic-bezier(0.22, 1, 0.36, 1)'  // GSAP aceita cubic-bezier strings
```

---

### GAP 5 — BLUR INTENSIDADE ENTRY
**Blueprint**: entry `blur 6→0` (6px).
**Atual** (`BeliefScrollText.tsx`): `blur(12px)` na entrada — 2x mais pesado que o spec.

---

### GAP 6 — MAX-WIDTH DO BLOCO DE FRASES
**Blueprint**: `max-w-[34rem] lg:max-w-[38rem] xl:max-w-[42rem]` (desktop: leitura à esquerda).
**Atual**: `max-w-4xl` = 56rem = 896px — 2.6x mais largo que o máximo permitido.

---

### GAP 7 — FONT-SIZE DO MANIFESTO
**Blueprint**: `font-size: clamp(4rem, 17vw, 13rem)`.
**Atual** (`BeliefManifesto.tsx`): font-size não declarado explicitamente no container — depende do que `SplitGhostText` herda. Classe `text-center font-extrabold uppercase leading-[0.88]` sem tamanho declarado.

---

### GAP 8 — ARIA-LIVE AUSENTE
**Blueprint**: "Frase ativa espelhada em `aria-live`".
**Atual** (`BeliefScrollText.tsx`): todos os h3 têm `aria-hidden="true"` mas não há região `aria-live` para anunciar a frase ativa ao leitor de tela.

---

### GAP 9 — PREFERS-REDUCED-MOTION IGNORADO
**Blueprint** (addendum 2026-05-02): "com `prefers-reduced-motion`, remove deslocamento e mantém apenas cross-fade".
**Atual** (`BeliefScrollText.tsx`): não consulta `prefersReducedMotion` do contexto — anima normalmente independente da preferência do usuário.

---

### GAP 10 — BACKGROUND LOCK FINAL
**Blueprint**: trava final em `scrollProgress >= 0.82` em `#0048ff`.
**Atual** (`BeliefBackground.tsx`): sem lógica de trava explícita no `scrub: true` — o GSAP scrub permite reverter ao scroll de volta. A sequência de cores também termina em `#040013` (errado).

---

## Arquitetura Proposta

### Estratégia de Correção

**Abordagem**: Patch cirúrgico nos arquivos afetados. Preservar toda a mecânica GSAP ScrollTrigger existente — o problema não está na engine, mas nos valores.

**Ordem de impacto**:
1. `belief.constants.ts` — corrigir BELIEF_COLOR_STOPS (único source of truth da paleta)
2. `BeliefScrollText.tsx` — remover scale, corrigir y, blur, easing, max-width, adicionar aria-live + reduced motion
3. `BeliefManifesto.tsx` — remover scale: 1.05, adicionar font-size clamp
4. `SplitGhostText.tsx` — remover scale das animações (afeta BeliefFixedHeader indiretamente)

**Não alterar**:
- `AboutBeliefs.tsx` — orquestrador OK
- `BeliefBackground.tsx` — mecânica OK, cor corrigida via constants
- `BeliefOverlay.tsx` — OK
- `GhostScene.tsx` — OK
- `useBeliefsScroll.ts` — OK
- `BeliefsScrollProvider.tsx` — OK
- `motion.ts` — OK

---

## Arquivos Afetados

| Arquivo | Ação | Prioridade |
|---|---|---|
| `src/components/sobre/beliefs/belief.constants.ts` | EDITAR — corrigir BELIEF_COLOR_STOPS | P0 — bloqueia background |
| `src/components/sobre/beliefs/BeliefScrollText.tsx` | EDITAR — scale, y, blur, easing, max-width, aria-live, reduced motion | P0 — múltiplas violações |
| `src/components/sobre/beliefs/BeliefManifesto.tsx` | EDITAR — remover scale: 1.05, adicionar font-size | P1 |
| `src/components/sobre/beliefs/SplitGhostText.tsx` | EDITAR — remover scale das animações | P1 |

---

## Restrições Técnicas e Visuais

1. **GSAP aceita `cubic-bezier(...)` como string** — usar `ease: 'cubic-bezier(0.22, 1, 0.36, 1)'` diretamente nos gsap.fromTo/to calls
2. **BeliefBackground usa `bgRef` + `BELIEF_COLOR_STOPS`** — ao corrigir a paleta, o background absorve automaticamente sem mudar o componente
3. **SplitGhostText** é genérico (usado em mais componentes além das crenças) — remover scale deve ser safe para todos os usos; verificar outros usos no projeto
4. **aria-live** deve ser um elemento separado do DOM (não dentro dos h3 animados) para funcionar corretamente com screen readers
5. **reduced-motion**: o `useBeliefsScrollContext()` já expõe `prefersReducedMotion` — usar no BeliefScrollText
6. **Manifesto `clamp(4rem, 17vw, 13rem)`** deve ser aplicado no estilo inline do container do manifesto, antes de passar para SplitGhostText — ou via className Tailwind com font-size override

---

## Riscos

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Mudança de paleta altera tonalidade geral para purple/pink — possível impacto visual dramático | Média | Blueprint valida explicitamente as cores; critério "fundo final azul" é claro |
| Remover scale de SplitGhostText impacta outros usos do componente | Baixa | SplitGhostText é self-contained; scale era bug não feature |
| Reduzir y de 30 para 18 e blur de 12 para 6 torna entrada menos dramática | Baixa | Blueprint é a source of truth; "nunca agressiva" é princípio do Ghost System |
| aria-live em scroll rápido pode fazer anúncios duplicados | Média | Implementar com delay ou apenas anunciar via JS on change (não via DOM mutation permanente) |

---

## Trade-offs

| Trade-off | Decisão |
|---|---|
| GSAP vs Motion para background trigger | Manter GSAP — já validado localmente, addendum 2026-05-02 é compatível com abordagem keyframe |
| Adicionar lock de cor no finalLock | Adicionar via `once: false` no ScrollTrigger com clamp do progresso |
| Font-size via Tailwind vs style inline | Style inline no container para evitar sobrescrita por classes genéricas |

---

## Estratégia de Validação

1. **Build check**: `pnpm run build-check` deve passar sem erros
2. **Type check**: `pnpm run typecheck` deve passar
3. **Lint**: `pnpm run lint` deve passar
4. **Inspeção visual desktop**: scroll na seção, confirmar progressão de cores purple/pink
5. **Inspeção visual mobile**: bloco de frases centralizado e ancorado em `pb-[20vh]`
6. **Verificar DevTools**: sem `scale` em nenhuma animação das crenças
7. **Manifesto**: fonte `clamp(4rem, 17vw, 13rem)` visível no inspector
8. **Cor final**: scroll até fim, confirmar background em `#0048ff`
9. **Aria**: screen reader anuncia frases ao mudar

---

## Critérios de Aceite

- [ ] `BELIEF_COLOR_STOPS` contém `#8705f2` (purple) e `#f501d3` (pink)
- [ ] Background termina em `#0048ff` (Ghost Blue) no clímax
- [ ] Zero uso de `scale` em qualquer animação das crenças (BeliefScrollText, BeliefManifesto, SplitGhostText)
- [ ] `y` offset máximo 18px em todas as animações
- [ ] `blur` de entrada ≤ 6px em BeliefScrollText
- [ ] Easing `cubic-bezier(0.22, 1, 0.36, 1)` em BeliefScrollText (entry e exit)
- [ ] BeliefScrollText max-width: `max-w-[34rem] lg:max-w-[38rem] xl:max-w-[42rem]`
- [ ] `aria-live` region presente e funcional em BeliefScrollText
- [ ] `prefersReducedMotion` aplicado em BeliefScrollText
- [ ] Manifesto: `font-size: clamp(4rem, 17vw, 13rem)` confirmado no inspector
- [ ] `pnpm run build-check` ✅
- [ ] Sem regressões visuais em outros componentes que usam SplitGhostText

---

## Rollback / Contingência

- Todos os arquivos editados são componentes UI sem lógica de negócio crítica
- Rollback: `git revert` do commit de implementação restaura 100% do estado anterior
- Sem migrações de DB ou mudanças de config de build envolvidas

---

## Necessidade de Atualizar `.context/DOCS-PORTFOLIO-PAGES`

**SIM** — após implementação, o arquivo `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md` deve ser atualizado para refletir:
- Nova paleta cromática correta
- Confirmação de remoção de scale
- Easing correto documentado
- Estado de validação atualizado

---

## ⛔ APPROVAL GATE

**Este documento deve ser aprovado pelo humano antes de qualquer implementação.**

Aguardando: **"Aprovado"** ou **"Proceed"**

---

*Gerado por: Scheduled Task — audit 06-O-QUE-ME-MOVE | 2026-05-07*

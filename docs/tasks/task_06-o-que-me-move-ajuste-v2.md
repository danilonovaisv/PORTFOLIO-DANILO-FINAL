# Task List — 06-O-QUE-ME-MOVE Ajuste v2
> Gerado em 2026-05-07 | Requer aprovação humana antes da execução

---

## ⛔ Status: AGUARDANDO APROVAÇÃO

Não iniciar execução sem confirmação explícita ("Aprovado" ou "Proceed").

---

## Sequência de Execução

### TASK 1 — Corrigir paleta cromática em `belief.constants.ts`
**Arquivo**: `src/components/sobre/beliefs/belief.constants.ts`
**Duração estimada**: 15 min
**Prioridade**: P0 — bloqueia tasks 3 e 4

**O que fazer**:
Substituir `BELIEF_COLOR_STOPS` inteiramente:

```ts
// ANTES (errado)
export const BELIEF_COLOR_STOPS = [
  '#040013', // Deep Void
  '#001a4d', // Dark Ghost Blue
  '#0048ff', // Ghost Blue
  '#4fe6ff', // Ghost Cyan (Accent)
  '#0048ff', // Ghost Blue
  '#001a4d', // Dark Ghost Blue
  '#4fe6ff', // Ghost Cyan
  '#040013', // Deep Void
] as const;

// DEPOIS (correto — blueprint AJUSTE v4)
export const BELIEF_COLOR_STOPS = [
  '#040013', // Deep Void
  '#0048ff', // Ghost Blue
  '#8705f2', // Ghost Purple
  '#f501d3', // Ghost Pink
  '#0048ff', // Ghost Blue
  '#8705f2', // Ghost Purple
  '#f501d3', // Ghost Pink
  '#0048ff', // Ghost Blue — trava final
] as const;
```

**Checkpoint**: `pnpm run typecheck` deve passar.
**Dependência**: nenhuma
**Risco**: baixo — change isolado

---

### TASK 2 — Remover scale de `SplitGhostText.tsx`
**Arquivo**: `src/components/sobre/beliefs/SplitGhostText.tsx`
**Duração estimada**: 20 min
**Prioridade**: P1 — afeta BeliefFixedHeader indiretamente

**O que fazer**:

1. No bloco `scrub = true` (linhas ~47-58):
   - Remover `scale: 0.98` do objeto `animationProps`
   - Remover `scale: 0` do `fromTo` inicial

2. No bloco `scrub = false` (linhas ~61-72):
   - Remover `scale: 0.95` do `fromTo` inicial
   - Remover `scale: 1` do `animationProps` (que já não tem scale)

3. No `fromTo` geral, ajustar:
   - Blur de entrada de `blur(10px)` para `blur(6px)` (se aparecer neste componente)
   - y de `y: 15/20` — estes estão no limite (15px OK, 20px excede 18px max → mudar para 18px)

**Referência código atual**:
```ts
// scrub mode
gsap.fromTo(
  items,
  { opacity: 0, y: 20, scale: 0.98, filter: 'blur(10px)' }, // scale: 0.98 → REMOVER; y: 20 → 18
  { ...animationProps, scrollTrigger: {...} }
);

// non-scrub mode
gsap.fromTo(
  items,
  { opacity: 0, y: 15, scale: 0.95, filter: 'blur(8px)' }, // scale: 0.95 → REMOVER
  { ...animationProps, scrollTrigger: {...} }
);

const animationProps = {
  opacity: 1,
  y: 0,
  scale: 1,        // → REMOVER
  filter: 'blur(0px)',
  ...
};
```

**Checkpoint**: `pnpm run lint` deve passar.
**Dependência**: nenhuma
**Risco**: baixo — SplitGhostText só anima header (BeliefFixedHeader) neste contexto

---

### TASK 3 — Corrigir `BeliefScrollText.tsx`
**Arquivo**: `src/components/sobre/beliefs/BeliefScrollText.tsx`
**Duração estimada**: 45 min
**Prioridade**: P0 — múltiplas violações críticas
**Dependência**: TASK 2 não é pré-requisito, mas ambos podem ser feitos em sequência

**Subtasks**:

#### 3a — Remover scale e corrigir y + blur
No `fromTo` de entrada:
- `scale: 0.96` → REMOVER
- `y: 30` → `y: 18`
- `filter: 'blur(12px)'` → `filter: 'blur(6px)'`

No `to` de saída:
- `scale: 0.98` → REMOVER
- `y: -30` → `y: -18`
- `filter: 'blur(12px)'` → `filter: 'blur(6px)'`

#### 3b — Corrigir easing
- Entry: `ease: 'power2.out'` → `ease: 'cubic-bezier(0.22, 1, 0.36, 1)'`
- Exit: `ease: 'power2.in'` → `ease: 'cubic-bezier(0.22, 1, 0.36, 1)'`

#### 3c — Corrigir max-width do bloco de frases
No container div com `max-w-4xl`:
```tsx
// ANTES
className="mx-auto w-full max-w-[1680px] px-6 md:px-12 lg:px-16 text-center md:text-left"
<div className="relative h-[4em] md:h-[2em] w-full max-w-4xl">

// DEPOIS (aplicar max-width no bloco interno)
<div className="relative h-[4em] md:h-[2em] w-full max-w-[34rem] lg:max-w-[38rem] xl:max-w-[42rem]">
```

#### 3d — Adicionar aria-live region
Adicionar antes do mapeamento de frases, um elemento separado para screen readers:

```tsx
// Dentro do componente, adicionar ref para frase ativa
const activePhraseRef = useRef<HTMLParagraphElement>(null);

// No DOM, antes do mapeamento:
<p
  ref={activePhraseRef}
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
/>

// Atualizar no GSAP ao mudar frase ativa:
// No callback onStart de cada entry animation:
onStart: () => {
  if (activePhraseRef.current) {
    activePhraseRef.current.textContent = BELIEF_PHRASES[i];
  }
}
```

#### 3e — Respeitar prefersReducedMotion
Importar `prefersReducedMotion` do contexto e condicionar animações:

```tsx
const { sectionRef, prefersReducedMotion } = useBeliefsScrollContext();

// No useLayoutEffect, antes de criar o ctx:
if (prefersReducedMotion) {
  // Modo reduced: mostrar apenas opacity cross-fade, sem y/blur
  // ... animações simplificadas
  return;
}
// Resto do código de animação normal
```

**Checkpoint**: inspeção visual desktop + mobile após build.
**Risco**: médio — múltiplas mudanças simultâneas; testar isoladamente por subtask se possível

---

### TASK 4 — Corrigir `BeliefManifesto.tsx`
**Arquivo**: `src/components/sobre/beliefs/BeliefManifesto.tsx`
**Duração estimada**: 20 min
**Prioridade**: P1
**Dependência**: TASK 1 (cores)

**O que fazer**:

1. Remover `scale: 1.05` do finalLock:
```ts
// ANTES
tl.to(containerRef.current, {
  scale: 1.05,   // → REMOVER completamente este bloco ou substituir
  duration: 0.1,
  ease: 'power2.inOut',
}, BELIEF_SCROLL_THRESHOLDS.finalLock);

// DEPOIS — manter apenas a estabilidade (sem scale)
// Opção: remover este tl.to() completamente
// O manifesto já estará visível após o climaxStart animation
```

2. Adicionar font-size explícito no container principal do manifesto:
```tsx
// No div container do conteúdo:
<div
  className="mx-auto w-full max-w-[1680px] text-center"
  style={{ fontSize: 'clamp(4rem, 17vw, 13rem)' }}
>
```

**Checkpoint**: inspeção visual do manifesto no clímax (scroll para fim da seção).
**Risco**: baixo — mudanças isoladas

---

### TASK 5 — Verificar outros usos de SplitGhostText no projeto
**Arquivos**: busca em `src/` por `SplitGhostText`
**Duração estimada**: 15 min
**Prioridade**: P1 — garantia de não-regressão

**O que fazer**:
```bash
grep -r "SplitGhostText" src/ --include="*.tsx" --include="*.ts"
```

Para cada uso encontrado fora das beliefs, verificar se a remoção de scale causou regressão visual. Se necessário, adicionar prop opcional `allowScale` para casos que precisem.

**Checkpoint**: inspeção visual dos componentes que usam SplitGhostText.
**Risco**: baixo — scale é bug, não feature

---

### TASK 6 — Build check e lint
**Duração estimada**: 10 min
**Prioridade**: P0 — validation gate

```bash
pnpm run typecheck
pnpm run lint
pnpm run build-check
```

Todos devem passar sem erros.

---

### TASK 7 — Validação visual no browser
**Duração estimada**: 30 min
**Prioridade**: P0 — evidência obrigatória

Checklist de inspeção:

**Desktop (1440px+)**:
- [ ] Background inicia em `#040013` (Deep Void)
- [ ] Background transiciona para `#0048ff` (Ghost Blue) ~1/7 do scroll
- [ ] Background transiciona para `#8705f2` (Ghost Purple) ~2/7
- [ ] Background transiciona para `#f501d3` (Ghost Pink) ~3/7
- [ ] Background repete: blue → purple → pink
- [ ] Background termina em `#0048ff` no clímax (confirmar via DevTools Color Picker)
- [ ] Frases sem scale — verificar via DevTools > Animations
- [ ] Frases com y máximo 18px (não 30px)
- [ ] Bloco de frases à esquerda com max-width ~34rem
- [ ] Frases com easing suave (não agressivo)
- [ ] Manifesto branco integral ao scroll final
- [ ] Ghost 3D acima do manifesto (z-index 70 vs 50)
- [ ] Header sticky visível no topo direito

**Mobile (375px)**:
- [ ] Frases centralizadas
- [ ] Bloco de frases ancorado em `pb-[20vh]`
- [ ] Background cromático funcional
- [ ] Manifesto legível

**Acessibilidade**:
- [ ] Inspecionar DOM: `aria-live="polite"` presente em BeliefScrollText
- [ ] Com VoiceOver/NVDA, frases são anunciadas ao mudar

**Performance**:
- [ ] Sem erros de console
- [ ] Scroll suave sem jank

---

### TASK 8 — Atualizar `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`
**Duração estimada**: 20 min
**Prioridade**: P2 — pós-implementação

Atualizar seção "Sequência Cromática" para refletir paleta corrigida.
Atualizar seção "Motion" para documentar remoção de scale.
Atualizar data de "Status" para 2026-05-07 com estado de validação.

---

### TASK 9 — Commit
**Duração estimada**: 10 min
**Prioridade**: P0 — após todas as validações passarem

```bash
git add src/components/sobre/beliefs/belief.constants.ts
git add src/components/sobre/beliefs/BeliefScrollText.tsx
git add src/components/sobre/beliefs/BeliefManifesto.tsx
git add src/components/sobre/beliefs/SplitGhostText.tsx
git add .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md
git commit -m "fix(beliefs): correct color palette, remove prohibited scale animations, fix motion constraints"
```

---

## Dependências entre Tasks

```
TASK 1 (cores) → TASK 4 (manifesto) → TASK 7 (visual)
TASK 2 (SplitGhostText) → TASK 5 (verificar usos) → TASK 7 (visual)
TASK 3 (BeliefScrollText) → TASK 7 (visual)
TASK 6 (build) → TASK 7 (visual)
TASK 7 (visual) → TASK 8 (docs) → TASK 9 (commit)
```

Tasks 1, 2, 3 podem ser executadas em paralelo.
Tasks 4 e 5 dependem de 1 e 2 respectivamente, mas podem ser paralelas entre si.

---

## Checklist de Conclusão

- [ ] TASK 1 completa
- [ ] TASK 2 completa
- [ ] TASK 3 (3a, 3b, 3c, 3d, 3e) completa
- [ ] TASK 4 completa
- [ ] TASK 5 completa
- [ ] TASK 6 — build check verde
- [ ] TASK 7 — evidências visuais coletadas
- [ ] TASK 8 — context doc atualizado
- [ ] TASK 9 — commit criado

---

*Gerado por: Scheduled Task — audit 06-O-QUE-ME-MOVE | 2026-05-07*

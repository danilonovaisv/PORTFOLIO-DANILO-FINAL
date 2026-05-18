# /sobre Audit & Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve all pending Ghost Design System violations on `/sobre`, commit uncommitted doc changes, evaluate + merge the `worktree-fix-06-que-me-move` worktree, then safely clean stale branches/worktrees.

**Architecture:** Pending issues are M-series (medium severity) and B-series (low) from AUDIT_PENTEST_SOBRE.md 2026-05-11. C1–C4 and H1–H7 were already fixed. This pass closes M1 (z-index TS/CSS unification), M3 (useGLTF.preload placement), M5 (AboutMethod phantom motion div), M6 (useIsMobile dedup), and B-series lint items. M2/M4 are already resolved in GhostScene.tsx (IntersectionObserver present).

**Tech Stack:** Next.js 16 App Router · React 19 · TypeScript 6 · Tailwind CSS 3.4 (Oxide) · Framer Motion 11 (via `motion` pkg) · GSAP 3 · R3F 9 · Three.js 0.183 · pnpm

---

## 1. Resumo executivo do problema

O ciclo de auditoria de 2026-05-11 corrigiu os 4 críticos (C1–C4) e 7 altos (H1–H7). Restam:

| ID  | Severidade | Descrição |
|-----|-----------|-----------|
| M1  | Média     | `src/config/z-indices.ts` mantém mapa paralelo divergente de `--z-layer-*` CSS vars |
| M3  | Média     | `useGLTF.preload(GLB_URL)` chamado no topo do módulo (fora de `useEffect`), viola R3F contract |
| M5  | Média     | `<m.div style={{ y: 0 }}>` em `AboutMethod` declara style estático sem motion value real |
| M6  | Média     | `useIsMobile` em `AboutClosing` duplica lógica já coberta por `useMediaQuery` |
| B1  | Baixa     | Comentários genéricos "// TODO" e "// legacy" em Beliefs sem owner/issue |
| B2  | Baixa     | `marquee` em `AboutWhatIDo` pausa via `animation-play-state` — usar classe CSS em vez de inline style |
| B3  | Baixa     | Named exports inconsistentes em `sections/index.ts` (mix default/named) |
| B4  | Baixa     | `Person` JSON-LD schema incompleto no `JsonLd` da página |

**Estado do repo:** docs não commitados em `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/`. Worktree `worktree-fix-06-que-me-move` tem 14+ commits além do main — contém `fix: correct 06-que-me-move motion layer against blueprint spec` que parece válido e precisa ser avaliado para merge.

---

## 2. Mapa da implementação atual de `/sobre`

```
src/app/sobre/page.tsx                     ← Server Component, export const dynamic='force-static'
├── AboutHero                              ← src/components/sobre/sections/AboutHero.tsx
├── AboutOrigin                            ← src/components/sobre/sections/AboutOrigin.tsx
│   └── OriginComponents.tsx              ← contém origin-mask (C1 já corrigido)
├── AboutWhatIDo                           ← src/components/sobre/sections/AboutWhatIDo.tsx
├── AboutMethod                            ← src/components/sobre/sections/AboutMethod.tsx (M5 pending)
├── AboutBeliefs                           ← src/components/sobre/sections/AboutBeliefs.tsx
│   ├── WhatMovesMeBackground             ← src/components/sobre/beliefs/WhatMovesMeBackground.tsx
│   ├── BeliefScrollText                  ← src/components/sobre/beliefs/BeliefScrollText.tsx
│   ├── GhostScene (dynamic, ssr:false)   ← src/components/sobre/3d/GhostScene.tsx (M3 pending)
│   └── GhostSceneFallback               ← src/components/sobre/3d/GhostSceneFallback.tsx
├── AboutClosing                           ← src/components/sobre/sections/AboutClosing.tsx (M6 pending)
└── SiteClosure                            ← shared footer
```

Config conflitante: `src/config/z-indices.ts` ← M1 alvo de deprecação.

---

## 3. Diagnóstico por domínio

### 3.1 Ghost Design — Visual

- **Hierarquia**: OK após H1–H7. Tokens `--z-layer-*` usados na maioria dos componentes.
- **Paleta**: `bg-background`, `text-text`, `bluePrimary`, `blueAccent` corretos.
- **Motion**: `scale`/`rotate`/`bounce` removidos (C4). `y` capado em 18px. Easing `GSAP_GHOST_EASE` aplicado.
- **Residual**: M5 — `<m.div style={{ y: 0 }}>` não é motion value, é valor estático inútil.

### 3.2 Next.js / React / TypeScript

- `page.tsx` correto: Server Component, `force-static`, `Suspense` + `SectionErrorBoundary`.
- `AboutBeliefs` slim (27 linhas) — Client Component OK.
- M3: `useGLTF.preload` no topo de `GhostScene.tsx` pode causar hydration issues e carga prematura de GLB antes do canvas estar montado. Deve ser `useEffect` condicional ou `useLayoutEffect`.
- M6: `useIsMobile` (custom hook local) vs `useMediaQuery('@/hooks/useMediaQuery')` — duplicação.

### 3.3 Tailwind / Tokens

- `globals.css` usa `@tailwind base/components/utilities` (v3). OK.
- `postcss.config.cjs` usa `tailwindcss` (não `@tailwindcss/postcss`). OK.
- M1: `z-indices.ts` tem `beliefs.ghost = 70` vs `--z-layer-3d = 30`. Se algum componente ainda importa esse arquivo, z-index bugado retorna. Grep necessário antes do fix.

### 3.4 Motion

- Permitido: `opacity`, `blur`, `translateY` ≤18px. ✅ Após C4.
- Proibido: `scale`, `rotate`, `bounce`, `translateX`. ✅ Removidos.
- Easing: `GSAP_GHOST_EASE = [0.22, 1, 0.36, 1]`. ✅.
- M5 residual: `y: 0` estático não é motion — deve ser removido ou ligado a `useScroll`.

### 3.5 Acessibilidade

- `sr-only` em `AboutBeliefs`. ✅
- `aria-labelledby` correto. ✅
- `aria-hidden="true"` em Canvas R3F. Verificar.
- Reduced-motion gates implementados (A11y fix da rodada anterior). ✅

### 3.6 Responsividade

- `.std-grid` aplicado (H5/H6). ✅
- Mobile-first pattern seguido. ✅
- `useMediaQuery` vs `useIsMobile` duplicação (M6).

### 3.7 Performance

- `SceneInvalidator` com `IntersectionObserver` implementado. M2/M4 resolvidos. ✅
- M3: `useGLTF.preload` no topo carrega GLB desnecessariamente em SSR/build.
- `dpr={[1, 2]}` no Canvas. Verificar.

---

## 4. Inventário Git

```
Branch atual:        main
Branch principal:    main
Commit HEAD:         1fc172e96

Branches locais relacionados a /sobre:
  fix/about-beliefs-v5-blueprint        ← blueprint spec fixes
  fix/audit-remediation-phase1          ← C1-C4, H1-H7 fixes (pode estar mergeado)
  fix/audit-p1-p2                       ← P1/P2 audit fixes
  chore/ds-remediation-phase1           ← DS tokens remediation
  style/about-method-typography         ← AboutMethod typography (stash@{2} relacionado)
  worktree-fix-06-que-me-move           ← 14+ commits além do main, CANDIDATO A MERGE
  worktree-audit-fixes                  ← na worktree audit-fixes

Branches remotos de interesse:
  docs/sobre-page-technical-analysis-4751686432196136347
  worktree-audit-fixes
  worktree-fix-06-que-me-move
  worktree-responsive-video-plan

Worktrees:
  ~/PORTFOLIO-DANILO-FINAL                             main (working tree)
  ~/.config/superpowers/worktrees/.../codex/weekly-cleanup  detached HEAD
  ~/.claude/worktrees/audit-fixes                      worktree-audit-fixes
  ~/.claude/worktrees/fix-06-que-me-move               worktree-fix-06-que-me-move ← AVALIAR
  ~/.claude/worktrees/fix-ghost-desktop-position       worktree-fix-ghost-desktop-position (merged 9ad6ba02e)
  ~/.claude/worktrees/responsive-video-plan            worktree-responsive-video-plan

Stashes:
  stash@{0}: GitHub Desktop – claude/weekly-audit-report
  stash@{1}: GitHub Desktop – claude/weekly-audit-report
  stash@{2}: WIP: about-method-typography changes       ← RELEVANTE para M5/style
  stash@{3}: GitHub Desktop – fix-firebase-deploy
  stash@{4}: GitHub Desktop – fix-firebase-deploy

Arquivos modificados (não commitados):
  M  .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-FINAL.md
  D  .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-blueprint-atualizado.md
  D  .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-v4.md
  M  next-env.d.ts

Arquivos untracked:
  ?? .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/OLD/06-O-QUE-ME-MOVE-FINAL.md
  ?? .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/OLD/06-O-QUE-ME-MOVE-blueprint-atualizado.md
  ?? .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/OLD/06-O-QUE-ME-MOVE-v4.md
```

---

## 5. Estratégia de correção

### Fase A — Commit docs pendentes (main)

Commitar os arquivos de `.context/` não commitados: doc atualizado de `06-O-QUE-ME-MOVE`, remoção dos arquivos blueprint/v4 movidos para `OLD/`. Mensagem: `docs(sobre): consolidate 06-o-que-me-move context docs`.

### Fase B — Avaliar e mergetar worktree-fix-06-que-me-move

1. Inspecionar commits exclusivos do branch.
2. Validar que os commits não entram em conflito com main.
3. Se limpo: `git merge --no-ff worktree-fix-06-que-me-move`.
4. Se conflito: resolver preservando Ghost Design tokens e motion rules.

### Fase C — Fixes M-series no main

**M1** — Deprecar `z-indices.ts`:
- Grep todos os imports de `@/config/z-indices`.
- Substituir por `z-[var(--z-layer-id)]` ou import de `beliefTokens.ts` (já existente).
- Remover ou marcar como `@deprecated` o arquivo `z-indices.ts`.

**M3** — Mover `useGLTF.preload`:
- Em `GhostScene.tsx`, remover chamada top-level `useGLTF.preload(URL)`.
- Adicionar `useEffect(() => { useGLTF.preload(URL) }, [])` dentro do componente pai ou em `GhostModel.tsx`.

**M5** — Corrigir `AboutMethod`:
- Localizar `<m.div style={{ y: 0 }}>`.
- Se sem motion value real: remover `style={{ y: 0 }}` e usar tag HTML simples ou `<m.div>` com `initial/animate`.
- Se intenção era parallax: conectar a `useScroll/useTransform` com gate `useMotionGate`.

**M6** — Unificar hooks mobile:
- Em `AboutClosing.tsx`, substituir `useIsMobile()` por `useMediaQuery('(max-width: 767px)')`.
- Verificar que `useIsMobile` não tem outros callers; se não tiver, remover o arquivo.

### Fase D — B-series (baixo impacto, batch)

- B1: Remover comentários genéricos sem owner.
- B2: Substituir inline `animationPlayState` por classe Tailwind `paused`/`running`.
- B3: Padronizar exports em `sections/index.ts` para named exports apenas.
- B4: Completar `Person` schema no `JsonLd` com `sameAs` links.

### Fase E — Validação

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

### Fase F — Cleanup de branches/worktrees

Inventário e remoção segura (somente após merge confirmado).

---

## 6. Estratégia de merge

- Merge alvo: `main`.
- Tipo: `--no-ff` para rastreabilidade.
- Sem `--squash` (preservar histórico de fix).
- Sem `force-push`.

---

## 7. Plano de rollback

```bash
# Se merge criar regressão:
git revert HEAD --no-edit
# Se fix de componente quebrar build:
git checkout HEAD~1 -- src/components/sobre/[arquivo afetado]
```

---

## 8. Riscos e mitigação

| Risco | Mitigação |
|-------|-----------|
| `z-indices.ts` ainda importado em componentes não-sobre | Grep completo antes de remover |
| `useGLTF.preload` em `useEffect` pode delay visual | Usar `useLayoutEffect` ou chamar no `onMount` do R3F |
| Conflito no merge `worktree-fix-06-que-me-move` | Resolver arquivo por arquivo, preservar tokens GDS |
| stash@{2} `about-method-typography` pode sobrescrever M5 fix | Inspecionar antes de aplicar |
| `next-env.d.ts` modificado pode causar noise | Verificar se é mudança de tipo gerada pelo Next.js — provavelmente auto-gerado, não commitar sozinho |

---

## 9. Comandos planejados

### Somente leitura

```bash
git log --oneline worktree-fix-06-que-me-move ^main | head -20
git diff main...worktree-fix-06-que-me-move --stat
grep -r "z-indices" src/ --include="*.ts" --include="*.tsx" -l
grep -r "useGLTF.preload" src/ --include="*.ts" --include="*.tsx"
grep -r "useIsMobile" src/ --include="*.ts" --include="*.tsx"
git stash show stash@{2} --stat
```

### Validação

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

### Alteração

```bash
# Fase A
git add .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/
git commit -m "docs(sobre): consolidate 06-o-que-me-move context docs"

# Fase B
git merge --no-ff worktree-fix-06-que-me-move -m "merge(sobre): integrate fix-06-que-me-move motion layer corrections"

# Fase C-D: edições nos arquivos (via Edit tool)

# Fase E: lint/typecheck/build

# Fase F: commit final
git add src/
git commit -m "fix(sobre): resolve M1-M6 — z-index unification, preload placement, motion cleanup"
```

### Potencialmente destrutivos (EXIGE aprovação específica)

```bash
# Só após merge confirmado e validado:
git branch -d fix/about-beliefs-v5-blueprint
git branch -d worktree-fix-06-que-me-move
git worktree remove ~/.claude/worktrees/fix-06-que-me-move
git worktree remove ~/.claude/worktrees/fix-ghost-desktop-position  # já mergeado (9ad6ba02)
# NÃO dropar stash@{2} sem inspecionar
```

---

## 10. Critérios de aceite

- [ ] `pnpm lint` passa sem novos erros
- [ ] `pnpm typecheck` passa
- [ ] `pnpm build` conclui sem erros
- [ ] `src/config/z-indices.ts` sem importações ativas (deprecado ou removido)
- [ ] `useGLTF.preload` não chamado no topo de módulo
- [ ] `AboutMethod` sem `style={{ y: 0 }}` estático
- [ ] `AboutClosing` usa `useMediaQuery` em vez de `useIsMobile`
- [ ] Docs de 06-O-QUE-ME-MOVE commitados
- [ ] Worktree `worktree-fix-06-que-me-move` avaliado e mergeado ou descartado com justificativa
- [ ] `walkthrough.md` criado com evidências
- [ ] `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/` atualizado se houver mudança estrutural

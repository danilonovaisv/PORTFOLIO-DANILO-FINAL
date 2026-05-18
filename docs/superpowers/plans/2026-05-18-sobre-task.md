A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items. Mark each item completed immediately after finishing. ONE task in_progress at a time. Commit after each logical group.

---

# Task List — /sobre Audit & Consolidation
**Date:** 2026-05-18  
**Plan:** `docs/superpowers/plans/2026-05-18-sobre-audit-consolidation.md`  
**Branch:** main

---

## FASE A — Commit docs pendentes

### Task A1: Inspecionar diff dos docs não commitados
**Dependency:** none  
**Critério:** Leu o diff, confirmou que são mudanças de consolidação (OLD/ folder + update FINAL.md)

- [ ] Rodar `git diff .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/` para ver exatamente o que mudou
- [ ] Confirmar que `OLD/` contém cópias antigas dos arquivos deletados (não trabalho novo perdido)
- [ ] Confirmar que `next-env.d.ts` é gerado automaticamente pelo Next.js (não commitar separado)

**Comando:**
```bash
git diff .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/
git status --short
```

---

### Task A2: Commitar docs consolidados
**Dependency:** A1 aprovado  
**Critério:** Commit criado, apenas arquivos de `.context/` incluídos, sem `next-env.d.ts`

- [ ] Stage apenas os arquivos de context:
```bash
git add .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-FINAL.md
git add -u .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/  # stage deletions
git add .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/OLD/
```
- [ ] Verificar staging: `git status --short`
- [ ] Commit:
```bash
git commit -m "docs(sobre): consolidate 06-o-que-me-move context — move legacy versions to OLD/"
```

---

## FASE B — Avaliar worktree-fix-06-que-me-move

### Task B1: Inspecionar commits exclusivos do branch
**Dependency:** A2 completo  
**Critério:** Lista dos commits únicos documentada

- [ ] Rodar:
```bash
git log --oneline worktree-fix-06-que-me-move ^main
```
- [ ] Anotar: quantos commits, quais arquivos tocam, se há commits de docs-only ou code
- [ ] Rodar diff stat:
```bash
git diff main...worktree-fix-06-que-me-move --stat
```

---

### Task B2: Verificar estado do worktree
**Dependency:** B1  
**Critério:** Sabe se worktree está limpo ou sujo

- [ ] `git -C ~/.claude/worktrees/fix-06-que-me-move status --short`
- [ ] Se sujo: registrar arquivos modificados antes de qualquer ação
- [ ] Se limpo: prosseguir para merge

---

### Task B3: Merge worktree-fix-06-que-me-move → main
**Dependency:** B2 limpo (ou diff documentado)  
**Critério:** Merge concluído sem conflitos ou conflitos resolvidos preservando GDS tokens

- [ ] Checkout main: `git checkout main` (já está em main)
- [ ] Merge:
```bash
git merge --no-ff worktree-fix-06-que-me-move -m "merge(sobre): integrate worktree-fix-06-que-me-move — motion layer corrections for 06-O-Que-Me-Move"
```
- [ ] Se conflito: resolver arquivo por arquivo preservando `--z-layer-*` tokens e `GSAP_GHOST_EASE`
- [ ] `git status` após merge para confirmar working tree limpa

---

## FASE C — Fix M1: Deprecar z-indices.ts

### Task C1: Auditar imports de z-indices.ts
**Dependency:** B3 completo  
**Critério:** Lista exata de todos os arquivos que ainda importam `z-indices`

- [ ] Grep:
```bash
grep -r "z-indices\|Z_INDEX" src/ --include="*.ts" --include="*.tsx" -l
grep -r "from.*z-indices\|from.*Z_INDEX" src/ --include="*.ts" --include="*.tsx"
```
- [ ] Listar cada arquivo e qual valor usa

---

### Task C2: Substituir imports de z-indices por tokens CSS
**Dependency:** C1  
**Critério:** Zero imports de `z-indices.ts` em componentes da página /sobre. Outros arquivos fora de sobre: documentar mas não alterar neste PR se não relacionados.

Para cada arquivo com import de `Z_INDEX` em `src/components/sobre/**`:
- [ ] Substituir `style={{ zIndex: Z_INDEX.xxx }}` por `className="z-[var(--z-layer-id)]"` ou inline `style={{ zIndex: 'var(--z-layer-id)' }}`
- [ ] Remover import `import { Z_INDEX } from '@/config/z-indices'`

Valores de mapeamento:
```
Z_INDEX.beliefs.ghost     → z-[var(--z-layer-3d)]      (= 30)
Z_INDEX.beliefs.overlay   → z-[var(--z-layer-overlay)]  (= 50)
Z_INDEX.beliefs.header    → z-[var(--z-layer-header)]   (= 55)
Z_INDEX.beliefs.content   → z-[var(--z-layer-overlay)]  (= 50)
```

---

### Task C3: Marcar z-indices.ts como deprecated
**Dependency:** C2  
**Critério:** Arquivo marcado com JSDoc @deprecated, sem novos imports

- [ ] Adicionar no topo de `src/config/z-indices.ts`:
```ts
/**
 * @deprecated Use CSS custom properties --z-layer-* via Tailwind `z-[var(--z-layer-id)]` instead.
 * Ghost Design System §1.3 — Z-Index Layers (globals.css).
 * This file is kept for reference only and will be removed in a future cleanup pass.
 */
```
- [ ] Commit:
```bash
git add src/config/z-indices.ts src/components/sobre/
git commit -m "fix(sobre/M1): deprecate z-indices.ts — migrate sobre components to --z-layer-* CSS vars"
```

---

## FASE C — Fix M3: useGLTF.preload placement

### Task C4: Localizar chamada top-level de useGLTF.preload
**Dependency:** C3  
**Critério:** Linha exata identificada

- [ ] Grep:
```bash
grep -n "useGLTF.preload\|preload(" src/components/sobre/3d/GhostModel.tsx src/components/sobre/3d/GhostScene.tsx
```
- [ ] Confirmar: está no escopo do módulo (fora de qualquer função/hook)?

---

### Task C5: Mover preload para useEffect
**Dependency:** C4  
**Critério:** Preload ocorre somente no cliente, após mount, com cleanup

- [ ] Em `GhostModel.tsx` ou onde estiver a chamada, remover a linha top-level
- [ ] Adicionar dentro do componente:
```ts
useEffect(() => {
  // Preload apenas no cliente, após confirmação de WebGL support
  useGLTF.preload(GLB_URL);
}, []);
```
- [ ] Verificar que `GLB_URL` é a mesma constante usada no `useGLTF(URL)` já existente
- [ ] Commit:
```bash
git add src/components/sobre/3d/
git commit -m "fix(sobre/M3): move useGLTF.preload from module top-level to useEffect"
```

---

## FASE C — Fix M5: AboutMethod phantom motion div

### Task C6: Localizar e diagnosticar o div estático
**Dependency:** C5  
**Critério:** Entende a intenção original do div com `style={{ y: 0 }}`

- [ ] Ler `src/components/sobre/sections/AboutMethod.tsx` inteiro
- [ ] Identificar a linha com `style={{ y: 0 }}` ou similar
- [ ] Decisão: é só noise (remover) ou deveria ser parallax (conectar)?

---

### Task C7: Corrigir AboutMethod
**Dependency:** C6  
**Critério:** Sem `style={{ y: 0 }}` estático; se era parallax, tem `useScroll/useTransform` com gate `useMotionGate`

**Caso A — Era noise (mais provável):**
- [ ] Remover `style={{ y: 0 }}` do `<m.div>`
- [ ] Se o `<m.div>` ficou sem props de animação, trocar por `<div>`

**Caso B — Era intenção de parallax:**
- [ ] Adicionar:
```tsx
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
const y = useTransform(scrollYProgress, [0, 1], [0, -18]); // max 18px Ghost rule
const shouldAnimate = useMotionGate(); // respeita prefers-reduced-motion
```
- [ ] Aplicar `style={{ y: shouldAnimate ? y : 0 }}`

- [ ] Commit:
```bash
git add src/components/sobre/sections/AboutMethod.tsx
git commit -m "fix(sobre/M5): remove phantom static y:0 from AboutMethod motion div"
```

---

## FASE C — Fix M6: Unificar useIsMobile

### Task C8: Auditar callers de useIsMobile
**Dependency:** C7  
**Critério:** Lista de todos os usos de useIsMobile no projeto

- [ ] Grep:
```bash
grep -r "useIsMobile" src/ --include="*.ts" --include="*.tsx" -l
grep -r "useIsMobile" src/ --include="*.ts" --include="*.tsx"
```

---

### Task C9: Migrar AboutClosing de useIsMobile → useMediaQuery
**Dependency:** C8  
**Critério:** `AboutClosing.tsx` usa `useMediaQuery`, resultado idêntico

- [ ] Em `AboutClosing.tsx`:
  - Remover: `import { useIsMobile } from '@/hooks/useIsMobile'`
  - Adicionar: `import { useMediaQuery } from '@/hooks/useMediaQuery'`
  - Substituir: `const isMobile = useIsMobile()` → `const isMobile = useMediaQuery('(max-width: 767px)')`
- [ ] Se `useIsMobile` não tem outros callers fora de `AboutClosing`: marcar para remoção
- [ ] Commit:
```bash
git add src/components/sobre/sections/AboutClosing.tsx
git commit -m "fix(sobre/M6): replace useIsMobile with useMediaQuery in AboutClosing"
```

---

## FASE D — Fixes B-series (batch)

### Task D1: B1 — Remover comentários genéricos
**Dependency:** C9  
**Critério:** Sem "// TODO", "// legacy", "// temp" sem owner em arquivos de beliefs

- [ ] Grep: `grep -rn "// TODO\|// legacy\|// temp\|// FIXME" src/components/sobre/beliefs/`
- [ ] Para cada ocorrência sem issue número: remover linha
- [ ] Commit: `git commit -m "chore(sobre/B1): remove orphan TODO/legacy comments from beliefs"`

---

### Task D2: B2 — Marquee pausa por classe CSS
**Dependency:** D1  
**Critério:** `animation-play-state` não é mais inline style em `AboutWhatIDo`

- [ ] Localizar: `grep -n "animationPlayState\|animation-play-state" src/components/sobre/sections/AboutWhatIDo.tsx`
- [ ] Substituir inline style por condicional de classe: `className={isPaused ? 'paused' : 'running'}`
- [ ] Garantir que `globals.css` ou o componente tem: `.paused { animation-play-state: paused; }` e `.running { animation-play-state: running; }`
- [ ] Commit: `git commit -m "chore(sobre/B2): replace inline animationPlayState with CSS class in marquee"`

---

### Task D3: B3 — Padronizar exports em sections/index.ts
**Dependency:** D2  
**Critério:** `sections/index.ts` usa apenas named exports

- [ ] Ler `src/components/sobre/sections/index.ts`
- [ ] Converter qualquer `export { default as X }` para `export { X }` ou manter `export * from './X'`
- [ ] Verificar importadores não quebram: `grep -r "from.*sobre/sections" src/ --include="*.tsx" --include="*.ts"`
- [ ] Commit: `git commit -m "chore(sobre/B3): standardize named exports in sections/index.ts"`

---

### Task D4: B4 — Completar Person schema no JsonLd
**Dependency:** D3  
**Critério:** `JsonLd` com `pageType="about"` inclui `sameAs` com links sociais

- [ ] Localizar `src/components/ui/JsonLd.tsx` ou equivalente
- [ ] Para `pageType === 'about'`, adicionar ao schema `Person`:
```json
{
  "@type": "Person",
  "name": "Danilo Novais",
  "jobTitle": "Head de Criação & Diretor de Criação Sênior",
  "sameAs": [
    "https://github.com/danilonovaisv",
    "https://portfoliodanilo.com"
  ]
}
```
- [ ] Commit: `git commit -m "fix(sobre/B4): complete Person JSON-LD schema with sameAs links"`

---

## FASE E — Validação completa

### Task E1: Lint
**Dependency:** D4  
**Critério:** `pnpm lint` passa sem erros novos

- [ ] `pnpm lint`
- [ ] Se erros: corrigir antes de prosseguir
- [ ] Registrar resultado

---

### Task E2: Typecheck
**Dependency:** E1  
**Critério:** `pnpm typecheck` passa

- [ ] `pnpm typecheck`
- [ ] Se erros de tipo em arquivos modificados: corrigir
- [ ] Registrar resultado

---

### Task E3: Build
**Dependency:** E2  
**Critério:** `pnpm build` conclui sem erros

- [ ] `pnpm build`
- [ ] Verificar output: sem erros de importação, sem module-not-found
- [ ] Registrar resultado

---

### Task E4: Tests
**Dependency:** E3  
**Critério:** `pnpm test` não introduz regressão

- [ ] `pnpm test`
- [ ] Registrar quais tests passaram/falharam

---

## FASE F — Cleanup de branches/worktrees (EXIGE aprovação específica)

### Task F1: Inventário de candidatos para remoção
**Dependency:** E4  
**Critério:** Tabela documentada de cada branch/worktree com recomendação

- [ ] Para cada branch candidato, rodar:
```bash
git log --oneline [branch] ^main | wc -l   # commits exclusivos
git branch -r | grep [branch]              # existe remoto?
```
- [ ] Candidatos principais:
  - `fix/audit-remediation-phase1` — provavelmente mergeado
  - `fix/about-beliefs-v5-blueprint` — avaliar
  - `worktree-fix-ghost-desktop-position` — já mergeado (9ad6ba02e está em main)
  - `worktree-audit-fixes` — avaliar
  - `worktree-fix-06-que-me-move` — mergeado na fase B

---

### Task F2: Remover worktree fix-ghost-desktop-position
**Dependency:** F1 (confirmado já mergeado)  
**Critério:** Worktree removido sem perda

- [ ] Confirmar que `9ad6ba02e` está em main: `git log --oneline | grep 9ad6ba02e`
- [ ] Remover worktree: `git worktree remove ~/.claude/worktrees/fix-ghost-desktop-position`
- [ ] Se branch remoto existe e já foi mergeado: `git push origin --delete worktree-fix-ghost-desktop-position`

---

### Task F3: Remover worktree fix-06-que-me-move (após merge confirmado)
**Dependency:** B3 merge confirmado, F1  
**Critério:** Worktree e branch removidos

- [ ] `git worktree remove ~/.claude/worktrees/fix-06-que-me-move`
- [ ] `git branch -d worktree-fix-06-que-me-move`

---

## FASE G — Documentação final

### Task G1: Criar walkthrough.md
**Dependency:** E4  
**Critério:** `walkthrough.md` em `docs/` com evidências de todas as fases

- [ ] Criar `docs/superpowers/plans/2026-05-18-sobre-walkthrough.md` com:
  - Objetivo executado
  - Arquivos alterados
  - Decisões arquiteturais (M1, M3, M5, M6)
  - Resultado de cada validação (lint/typecheck/build/test)
  - Branches/worktrees envolvidos
  - Itens removidos vs preservados
  - Riscos remanescentes
  - Rollback possível
  - Próximos passos

---

### Task G2: Atualizar ANALISE-GLOBAL-DA-SOBRE.md
**Dependency:** G1  
**Critério:** Doc reflete estado pós-M1-M6 e B1-B4

- [ ] Adicionar nova seção "## Atualização de Auditoria — 2026-05-18" com:
  - Fixes aplicados nesta rodada
  - Pendências remanescentes (se alguma)
  - Critérios de Done atualizados

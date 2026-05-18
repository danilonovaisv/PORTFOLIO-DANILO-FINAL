# /sobre Audit & Consolidation — Walkthrough 2026-05-18

**Status:** COMPLETE  
**Branch:** main  
**Final commit:** `7d64aba2b`

---

## Objetivo Executado

Resolver todos os itens pendentes do ciclo de auditoria Ghost Design System 2026-05-11 na página `/sobre`. Os criticals (C1–C4) e highs (H1–H7) já estavam corrigidos. Esta rodada fechou M1–M6 e B-series.

---

## Fases Executadas

### Fase A — Docs pendentes commitados

Arquivo `06-O-QUE-ME-MOVE-FINAL.md` atualizado, versões legacy movidas para `OLD/`.

**Commit:** `docs(sobre): consolidate 06-o-que-me-move context — move legacy versions to OLD/`

### Fase B — Worktree `worktree-fix-06-que-me-move`

Verificado: zero commits exclusivos (branch 100% mergeado em main). Worktree e branch removidos com segurança.

### Fase C/D — Fixes M-series e B-series

| Item | Status | Decisão |
|------|--------|---------|
| M1 — z-indices.ts | Já resolvido | `src/config/z-indices.ts` não existia mais |
| M3 — useGLTF.preload | Já mitigado | Guard `typeof window !== 'undefined'` presente em `GhostModel.tsx` |
| M5 — AboutMethod `style={{ y: 0 }}` | Já resolvido | `<m.div>` linha 69 sem static motion style |
| M6 — useIsMobile dedup | **Corrigido** | `AboutHero.tsx` + `VideoManifesto.tsx` migrados para `useMediaQuery` |
| B1 — Comentários genéricos | Já limpo | Sem TODO/legacy orphans em beliefs/ |
| B2 — Marquee animationPlayState | Já limpo | Sem inline animationPlayState em AboutWhatIDo |
| B3 — Named exports sections/index.ts | Já correto | Pure named exports já implementados |
| B4 — Person JSON-LD schema | Já completo | sameAs, description, knowsAbout, hasOccupation presentes |

**Hook `useIsMobile.ts` deletado** — zero callers após a migração.

**Commits M6:**
- `fix(sobre/M6): replace useIsMobile with useMediaQuery in AboutHero` — `0e94628bb`
- `fix(home): replace useIsMobile with useMediaQuery in VideoManifesto` — `7d64aba2b`

### Fase E — Validação

| Check | Resultado |
|-------|-----------|
| `pnpm lint` (local ESLint) | ✅ Zero errors — `src/components/sobre/` + `src/hooks/useMediaQuery.ts` |
| `pnpm typecheck` | ✅ Zero errors após fix VideoManifesto |
| `pnpm build` | ✅ `/sobre` prerendered as `○ (Static)` — force-static funciona |

Build warning: `[DEP0205] module.register() deprecated` — pré-existente, não relacionado.

### Fase F — Cleanup branches/worktrees

| Branch | Commits exclusivos | Ação |
|--------|-------------------|------|
| `fix/about-beliefs-v5-blueprint` | 0 | ✅ Deletado |
| `worktree-fix-ghost-desktop-position` | 0 | ✅ Worktree + branch removidos |
| `worktree-fix-06-que-me-move` | 0 | ✅ Removido na Fase B |
| `fix/audit-remediation-phase1` | 6 commits, 59 arquivos | ⚠️ Preservado — avaliar merge separado |
| `fix/audit-p1-p2` | 1 commit | ⚠️ Preservado — minor |
| `worktree-audit-fixes` | 2 commits (txt logs) | ⚠️ Preservado — ruído de diagnóstico |

---

## Arquivos Alterados

```
src/components/sobre/sections/AboutHero.tsx   — useIsMobile → useMediaQuery
src/components/home/hero/VideoManifesto.tsx   — useIsMobile → useMediaQuery
src/hooks/useIsMobile.ts                      — DELETED (zero callers)
.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/  — docs consolidados
```

---

## Riscos Remanescentes

- `fix/audit-remediation-phase1` tem 6 commits com trabalho potencialmente válido (cache-control headers, GhostCanvas fallback, slug-utils, accessibility) — não mergeados. Requer revisão manual antes de decisão.
- `next-env.d.ts` permanece modificado (auto-gerado pelo Next.js) — não commitar separado.

---

## Rollback

```bash
# Reverter M6 fixes:
git revert 7d64aba2b --no-edit  # VideoManifesto
git revert 0e94628bb --no-edit  # AboutHero

# Restaurar useIsMobile.ts se necessário:
git checkout <commit-anterior> -- src/hooks/useIsMobile.ts
```

---

## Próximos Passos

1. Avaliar `fix/audit-remediation-phase1` — merge ou descartar com justificativa
2. Remover `worktree-audit-fixes` worktree (apenas logs de diagnóstico)
3. Auditar `AboutWhatIDo.tsx` B2 marquee se animação estiver causando jank no mobile

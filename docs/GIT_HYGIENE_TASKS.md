# Git Hygiene Task List

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items. Each task is scoped to roughly 1 hour of work. Tasks marked `REQUIRES APPROVAL` must not be executed without explicit human confirmation. Tasks marked `READ-ONLY` are safe to execute at any time.

_Gerado em: 2026-06-21 | Repositório: danilonovaisv/PORTFOLIO-DANILO-FINAL_

---

## Phase 1 — Repository Intake (READ-ONLY) ✅ COMPLETED

- [x] Confirm current branch and status. → `claude/dazzling-euler-mp4s71`, working tree CLEAN
- [x] Identify HEAD SHA. → `14869153` (idêntico a `main`)
- [x] Identify default branch. → `main`
- [x] Identify remotes. → `origin` → `http://local_proxy@127.0.0.1:33789/git/danilonovaisv/PORTFOLIO-DANILO-FINAL`
- [x] Identify package manager and validation scripts. → `pnpm`; scripts: `lint`, `typecheck`, `build`
- [x] Identify branch protection assumptions. → `main` protegida via GitHub API (confirmado)
- [x] Identify deploy target and CI/CD assumptions. → Firebase Hosting + GitHub Actions

---

## Phase 2 — Read-only Git Audit (READ-ONLY) ✅ COMPLETED

- [x] List local branches. → 2 branches: `claude/dazzling-euler-mp4s71` (current), `main`
- [x] List remote branches. → 18 branches remotas via GitHub API + `fetch --dry-run`
- [x] List merged branches. → `git branch --merged`: ambas locais são merged
- [x] List unmerged branches. → `git branch --no-merged`: nenhuma local unmerged
- [x] List upstream tracking status. → `main` rastreia `origin/main`; `claude/dazzling-euler-mp4s71` sem upstream
- [x] List worktrees in porcelain format. → 1 worktree, CLEAN, não bloqueada
- [x] List recent all-branch graph. → `git log --oneline --decorate --graph --all --max-count=80`
- [x] Run `git fetch --all --prune --dry-run`. → Identificados: 17 novos branches remotos; 1 stale ref a ser removida (`origin/claude/dazzling-euler-mp4s71`)
- [x] Run `git merge-base --is-ancestor` para cada SHA remoto. → `codex/media-card-system` (`06104ba2`) confirmado MERGED; demais NOT-MERGED (sujeito a grafted history caveat)

---

## Phase 3 — GitHub and PR Audit (READ-ONLY) ✅ COMPLETED

- [x] Check open PRs via GitHub MCP. → **1 PR aberto: #496** em `claude/weekly-audit-report-2026-06-16`
- [x] Check protected branches via GitHub MCP. → `main` protegida
- [x] Mark branches linked to active PRs as preserved. → `claude/weekly-audit-report-2026-06-16` marcada como `protected`

---

## Phase 4 — Classification (READ-ONLY) ✅ COMPLETED

- [x] Classify protected branches. → `main` (remote), `claude/weekly-audit-report-2026-06-16`
- [x] Classify active branches. → `claude/dazzling-euler-mp4s71` (local + worktree), `main` (local)
- [x] Classify candidate-merge branches. → Nenhuma identificada com dados disponíveis (requer inspeção de `unknown-risk`)
- [x] Classify candidate-archive branches. → 12 branches remotas (ver tabela 4.2 do `GIT_HYGIENE_PLAN.md`)
- [x] Classify local deletion candidates. → `claude/dazzling-euler-mp4s71` (candidata após fim da sessão, SHA idêntico a main)
- [x] Classify remote deletion candidates. → `codex/media-card-system` (única confirmada merged)
- [x] Classify orphaned worktrees. → Nenhuma detectada
- [x] Classify unknown-risk items. → 3 branches: `claude/beautiful-rubin-MVYRs`, `claude/dazzling-euler-ZhWMf`, `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s`

---

## Phase 5 — Additional Inspection (READ-ONLY) — PENDING

Estas tarefas são seguras (somente leitura) mas ainda não executadas. Recomendadas antes da aprovação para cleanup.

- [ ] Fetch `claude/beautiful-rubin-MVYRs` e inspecionar `git log --oneline main..origin/claude/beautiful-rubin-MVYRs` e `git diff --stat main...origin/claude/beautiful-rubin-MVYRs`
- [ ] Fetch `claude/dazzling-euler-ZhWMf` e inspecionar diff vs main
- [ ] Fetch `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` e inspecionar conteúdo
- [ ] Fetch `codex/sobre-origin-a11y-fixes` e inspecionar diff vs main (prioridade: pode ter a11y útil)
- [ ] Fetch `fix/audit-remediation-phase1` e inspecionar diff vs main (prioridade: pode ter fixes de segurança)
- [ ] Run `git worktree prune --dry-run` para verificar entradas stale de worktree
- [ ] Verificar `firebase.json` e `.firebaserc` para confirmar que nenhuma branch candidata a remoção está associada a preview channel

---

## Phase 6 — Backup and Rollback Planning (REQUIRES APPROVAL)

- [ ] Confirmar localização de armazenamento para bundle: `../git-hygiene-backup/` (fora do repo — root proibido por CLAUDE.md)
- [ ] Executar `mkdir -p ../git-hygiene-backup`
- [ ] **Antes do bundle:** fetch de todas as branches candidatas com refspecs explícitos (ver Fase 2 do `GIT_HYGIENE_PLAN.md`) — `git bundle --all` só empacota refs presentes localmente; branches não fetchadas serão omitidas do backup
- [ ] Confirmar que o fetch acima **não falhou** antes de criar o bundle (se falhou, alguma branch sumiu do remoto — ABORTAR e re-auditar)
- [ ] Executar `git bundle create ../git-hygiene-backup/pre-cleanup-<timestamp>.bundle --all`
- [ ] Criar tags de backup com `-f` (força atualização em reruns): ver SHA Map na seção 8 do `GIT_HYGIENE_PLAN.md`
- [ ] Confirmar que tags foram criadas e apontam para os SHAs auditados: `git rev-parse backup/pre-cleanup/codex-media-card-system | head -c8` (deve mostrar `06104ba2`)
- [ ] **Publicar tags no remoto** com `--force` (obrigatório antes de qualquer `push --delete` — tags locais são perdidas em clones efêmeros): `git push --force origin 'refs/tags/backup/pre-cleanup/*'`
- [ ] Confirmar que bundle existe no disco e tem tamanho > 0

---

## Phase 7 — Approval Gate ⛔ STOP

- [ ] **STOP e aguardar aprovação humana explícita.**
- [ ] Aguardar resposta `Aprovado` ou `Proceed` na conversa.
- [ ] Confirmar escopo da aprovação: local apenas, ou inclui remoto.
- [ ] Confirmar aprovação separada para Fase 10 (cleanup remoto — archive candidates).

---

## Phase 8 — Approved Execution: Local Cleanup (REQUIRES APPROVAL)

_Executar somente após aprovação da Fase 7._

- [ ] Executar `git fetch --prune` para limpar stale ref `origin/claude/dazzling-euler-mp4s71`
- [ ] Verificar que ref stale foi removida: `git branch -r | grep dazzling-euler-mp4s71`
- [ ] Executar `git worktree prune` somente se dry-run (Fase 5) confirmou entradas stale

---

## Phase 9 — Approved Execution: Remote Cleanup — Confirmed Merged (REQUIRES SEPARATE APPROVAL)

_Esta fase requer aprovação explícita própria, independente da Fase 7 (cleanup local) e da Fase 10 (archive candidates). A aprovação da Fase 7 autoriza apenas cleanup local e worktrees — não autoriza deleção remota de nenhuma branch._

- [ ] Verificar backup tag existe: `git tag --list 'backup/pre-cleanup/codex-media-card-system'`
- [ ] Verificar SHA remoto ainda é `06104ba2`: `git ls-remote origin refs/heads/codex/media-card-system` — se diferente, PARAR e re-auditar
- [ ] Executar `git push origin --delete codex/media-card-system`
- [ ] Confirmar remoção: verificar que branch não aparece mais em `git branch -r`

---

## Phase 10 — Approved Execution: Remote Cleanup — Archive Candidates (REQUIRES SEPARATE APPROVAL)

_Esta fase requer aprovação explícita adicional, independente da Fase 7._

- [ ] Aguardar segunda aprovação explícita do humano para esta fase
- [ ] Confirmar que todas as tags de backup foram criadas antes de qualquer `push --delete`
- [ ] Executar remoções do **lote seguro** (audit reports/docs sem conteúdo funcional identificado):
  - [ ] Verificar SHA remoto antes de cada delete: `git ls-remote origin refs/heads/<branch>`
  - [ ] `git push origin --delete audit/weekly-report-4676327557888982331`
  - [ ] `git push origin --delete chore-audit-report-12176814106024817247`
  - [ ] `git push origin --delete claude/weekly-audit-report-2026-05-19`
  - [ ] `git push origin --delete codex/ghost-portfolio-hero-pr`
- [ ] **NÃO deletar sem inspeção individual** — cada uma requer `git diff main...origin/<branch>` e decisão explícita:
  - [ ] `codex/sobre-origin-a11y-fixes` — commits de a11y/Ghost Design; avaliar cherry-pick antes de deletar
  - [ ] `codex/weekly-cleanup` — plano anterior: unknown-risk com alta contagem de commits; diff obrigatório
  - [ ] `fix/audit-remediation-phase1` — unknown-ancestry†; conteúdo funcional (cache headers, TypeScript, assets); diff obrigatório
- [ ] Branches `unknown-risk` NÃO estão nesta fase — requerem aprovação individual própria:
  - `worktree-audit-fixes`, `worktree-fix-06-que-me-move`, `worktree-responsive-video-plan`
  - `docs/audit-beliefs-ghost-design-v3` — reclassificada `unknown-risk` (unknown-ancestry†; alta divergência reportada)
  - `docs/ghost-design-updates-12336613816235341544` — reclassificada `unknown-risk` (unknown-ancestry†; diff obrigatório)

---

## Phase 11 — Validation (após execuções aprovadas)

- [ ] Executar `git status` — confirmar working tree limpa
- [ ] Executar `git branch --all` — verificar lista pós-cleanup
- [ ] Executar `git worktree list` — confirmar sem órfãos
- [ ] Executar `git fetch --all --prune --dry-run` — confirmar que não há mais stale refs inesperadas
- [ ] Executar `pnpm run lint` — sem erros de lint
- [ ] Executar `pnpm run typecheck` — sem erros de tipo
- [ ] Executar `pnpm run build` — build deve suceder
- [ ] Verificar que PR #496 ainda está acessível e branch `claude/weekly-audit-report-2026-06-16` preservada

---

## Phase 12 — Confirmation and Documentation

> **Precondição:** Esta fase documenta o resultado das fases executadas. Se apenas as Fases 8–9 foram aprovadas (sem Fase 10), gerar o walkthrough refletindo o estado parcial — não aguardar a Fase 10 para documentar.

- [ ] **Phase 12.1 (após qualquer execução aprovada):** Gerar `docs/GIT_HYGIENE_WALKTHROUGH.md` documentando o estado real alcançado. Se a Fase 10 foi diferida ou negada, registrar explicitamente quais fases foram executadas e quais permanecem pendentes:
  - estado inicial (capturado nesta auditoria)
  - plano aprovado (fases executadas vs. diferidas)
  - evidências de backup
  - comandos executados
  - branches preservadas, arquivadas, deletadas
  - worktrees removidas e preservadas
  - resultados de validação
  - comandos de rollback
  - estado final (parcial ou completo, conforme o caso)
- [ ] **Phase 12.2 (independente de 12.1):** Documentar política futura de branches (ver seção abaixo)
- [ ] Decidir se `.context/DOCS-PORTFOLIO-PAGES` precisa de atualização (impacto: nenhum identificado — cleanup não altera rotas ou componentes)
- [ ] Commit dos artefatos de documentação desta auditoria: `docs/GIT_HYGIENE_PLAN.md`, `docs/GIT_HYGIENE_TASKS.md`

---

## Future Branch Policy (rascunho para aprovação)

Para prevenir acúmulo futuro de branches:

1. **Naming convention:** prefixar com `feat/`, `fix/`, `docs/`, `chore/`, `codex/`, `claude/` seguido de nome descritivo curto. Evitar sufixos numéricos longos gerados automaticamente quando possível.
2. **Lifetime policy:** branches de agents autônomos (rotinas semanais, audit reports) devem ser deletadas automaticamente após PR mergeado ou fechado.
3. **PR obrigatório:** nenhuma branch deve existir por mais de 30 dias sem PR associado ou tag de arquivamento.
4. **Protected branches:** expandir proteção para incluir `staging` e `production` se esses ambientes forem configurados.
5. **Worktree discipline:** worktrees criadas por agentes devem ser removidas ao fim da sessão que as criou.
6. **`.gitmodules` fix:** corrigir entrada duplicada `skills/superpower` em issue separado.

---

_Documento gerado em modo read-only. Nenhum arquivo de código foi alterado. Nenhuma branch foi criada, modificada ou excluída._

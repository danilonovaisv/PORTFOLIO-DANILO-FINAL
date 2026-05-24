# Git Hygiene Task List

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items. Each task represents a discrete, reviewable unit of work with clear completion criteria and dependency order.

**Projeto:** portfoliodanilo.com  
**Criado em:** 2026-05-17 | **Re-auditado em:** 2026-05-24  
**Status:** Phases 1–5 concluídas (re-auditoria 2026-05-24). Aguardando aprovação humana para Phase 6+.

> **Nota de atualização:** Esta task list foi re-executada em 2026-05-24 numa nova sessão. O estado do repositório mudou desde 2026-05-17. As phases 1–5 foram re-concluídas com os dados atuais. Os checkboxes abaixo refletem o estado da sessão atual.

---

## Phase 1 — Repository Intake

- [x] Confirmar branch atual e status da árvore de trabalho.
  - **2026-05-24:** Branch `claude/dazzling-euler-ZhWMf`, árvore limpa, SHA `3f91a22` = main.
- [x] Identificar branch padrão.
  - `main`
- [x] Identificar remotes configurados.
  - `origin` → `http://local_proxy@127.0.0.1:42565/git/danilonovaisv/PORTFOLIO-DANILO-FINAL`
- [x] Identificar package manager e scripts de validação.
  - `pnpm`; Node engine `22`; scripts: `lint`, `typecheck`, `build`, `test`, `test:e2e`
- [x] Identificar premissas de branch protection.
  - **2026-05-24:** `main` tem `protected: true` confirmado via GitHub API (mudança desde 2026-05-17 onde API retornava `false`).

---

## Phase 2 — Read-Only Git Audit

- [x] Listar branches locais com verbose.
  - **2026-05-24:** `claude/dazzling-euler-ZhWMf` (HEAD, sem upstream), `main` (rastreia `origin/main`)
- [x] Listar branches remotas (GitHub API + remote tracking local).
  - **2026-05-24:** 13 branches remotas via `mcp__github__list_branches`.
- [x] Listar branches mergeados (vs HEAD).
  - `claude/dazzling-euler-ZhWMf` e `main` (ambos SHA `3f91a22`)
- [x] Listar branches não mergeados.
  - Nenhum localmente.
- [x] Verificar upstream tracking status de cada branch.
  - `main` → `origin/main` (up-to-date, SHA `3f91a22`)
  - `claude/dazzling-euler-ZhWMf` → **sem upstream configurado**
- [x] Listar worktrees em formato porcelain.
  - 1 worktree principal (`/home/user/PORTFOLIO-DANILO-FINAL`), limpa, não bloqueada.
- [x] Visualizar grafo de commits recente (all branches, max 80).
  - Executado. Evidência de merges de PRs (#480–#486) visível no grafo. Commit `06104ba` (`codex/media-card-system`) confirmado em main.
- [x] Executar dry-run de fetch --prune.
  - **2026-05-24:** 1 tracking ref seria deletado (`origin/claude/dazzling-euler-ZhWMf` — não existe no GitHub).
  - 12 novos remote tracking refs seriam adicionados (branches não fetchadas localmente).
  - Warnings de `.gitmodules` duplicados detectados (4 commits históricos afetados).

---

## Phase 3 — GitHub and PR Audit

- [x] Verificar PRs abertos via GitHub MCP.
  - **2026-05-24: 2 PRs abertos:**
  - PR #469 — `claude/weekly-audit-report-2026-05-19` — "Audit: Weekly Portfolio Report 2026-05-19" — aberto, não draft
  - PR #470 — `audit/weekly-report-4676327557888982331` — "docs: add WEEKLY_AUDIT_REPORT.md" — aberto, **draft** (criado por Jules)
- [x] Verificar PRs fechados/mergeados referenciados no git log.
  - PR #480 → `Docs/sobre page technical analysis` (mergeado)
  - PR #482 → `fix: add final ghost hero files` (mergeado)
  - PR #483 → `codex/base-before-ghost-final` (mergeado)
  - PR #484 → `fix: stabilize firebase deploy workflow` (mergeado)
  - PR #485 → `codex/activate-planning-mode-and-generate-documents` (mergeado)
  - PR #486 → `fix(ghost+portfolio): restore bloom + portfolio hero full-bleed` (mergeado)
- [x] Verificar branches protegidas via API.
  - **2026-05-24:** `main` retorna `protected: true` via GitHub API.
- [x] Marcar branches linked a PRs ativos como preserved.
  - `audit/weekly-report-4676327557888982331` → **preserved-pr** (PR #470)
  - `claude/weekly-audit-report-2026-05-19` → **preserved-pr** (PR #469)

---

## Phase 4 — Classification

- [x] Classificar branches protegidos.
  - **2026-05-24:** `main` → `protected` (confirmado via API `protected: true`)
- [x] Classificar branches ativos.
  - `claude/dazzling-euler-ZhWMf` → `active / current`
  - `main` (local) → `active / protected`
- [x] Classificar preserved-pr (nova categoria).
  - `audit/weekly-report-4676327557888982331` → `preserved-pr` (PR #470)
  - `claude/weekly-audit-report-2026-05-19` → `preserved-pr` (PR #469)
- [x] Classificar candidate-merge.
  - Nenhum identificado — todos os commits únicos visíveis foram integrados ou estão em PRs abertos.
- [x] Classificar candidate-archive.
  - `codex/ghost-portfolio-hero-pr` — SHA `bb1fbe0a`; ghost hero mergeado (#482); pendente investigação
  - `docs/audit-beliefs-ghost-design-v3` — SHA `2444b35b`; documentação histórica Ghost Design v3
  - `worktree-fix-06-que-me-move` — SHA `561eec01`; fix provável em main
  - `worktree-responsive-video-plan` — SHA `09aab7da`; responsive video provavelmente integrado
- [x] Classificar candidatos a delete local.
  - Nenhum; estado local é mínimo (2 branches, ambos ativos).
- [x] Classificar candidatos a delete remoto.
  - `codex/media-card-system` — SHA `06104ba` **confirmado** em main
- [x] Classificar worktrees órfãs.
  - Nenhuma detectada (1 worktree principal, limpa).
- [x] Classificar itens unknown-risk.
  - `codex/sobre-origin-a11y-fixes` — SHA `e03f269`; possível a11y em `/sobre`
  - `codex/weekly-cleanup` — SHA `dcf8d0de`; sem evidência de merge
  - `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` — SHA `16aa5652`; namespace incomum
  - `fix/audit-remediation-phase1` — SHA `2a7cc79f`; fase 1 de remediação; pode ter código funcional
  - `worktree-audit-fixes` — SHA `4f158abe`; sem evidência de merge visível

---

## Phase 5 — Backup and Rollback Planning

- [x] Criar SHA map.
  - **2026-05-24:** SHA map completo documentado em `implementation_plan.md`, Seção 8. 10 branches mapeadas; 2 PRs abertos marcados como NÃO ARQUIVAR.
- [x] Redigir comando git bundle.
  - `git bundle create docs/git-hygiene/backups/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all`
- [x] Redigir comandos de backup tags.
  - 5 tags de arquivo redigidas (apenas candidatos confirmados): `codex/media-card-system`, `codex/ghost-portfolio-hero-pr`, `docs/ghost-design-v3`, `worktree-fix-06-que-me-move`, `worktree-responsive-video-plan`.
- [x] Redigir comandos de rollback.
  - Documentados por branch em `implementation_plan.md`, Seção 8. Inclui rollback via bundle, via tag e via reflog.
- [x] Confirmar local de armazenamento dos artefatos de backup.
  - `docs/git-hygiene/backups/` (versionado no projeto; adicionar ao `.gitignore` se os bundles ficarem grandes)

---

## Phase 6 — Approval Gate

- [ ] **STOP — Apresentar plano atualizado (2026-05-24) ao humano e solicitar aprovação.**
- [ ] Aguardar resposta `Aprovado`, `Proceed` ou instrução parcial de aprovação.

> ⚠️ Nenhuma tarefa abaixo desta linha pode ser iniciada antes da aprovação.
>
> **Aprovação granular disponível:**
> - "Aprovar Fase 7a" → apenas investigação fetch (não destrutivo)
> - "Aprovar Fase 7b" → apenas backup + tags
> - "Aprovar Fase 7c" → apenas delete de `codex/media-card-system` (único confirmado)
> - "Aprovar Fase 7d" → cleanup de tracking refs stale (fetch --prune)
> - "Aprovar tudo" → execução completa do plano

---

## Phase 7 — Verified Execution (pós-aprovação — 2026-05-24)

### 7a. Investigação dos unknown-risk e candidate-archive (não destrutivo)
- [ ] Executar `git fetch --all` (sem --prune) para atualizar todos os tracking refs.
- [ ] Executar `git log origin/codex/sobre-origin-a11y-fixes ^main --oneline` e registrar resultado.
- [ ] Executar `git log origin/codex/weekly-cleanup ^main --oneline` e registrar resultado.
- [ ] Executar `git log "origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" ^main --oneline` e registrar resultado.
- [ ] Executar `git log origin/fix/audit-remediation-phase1 ^main --oneline` e registrar resultado.
- [ ] Executar `git log origin/worktree-audit-fixes ^main --oneline` e registrar resultado.
- [ ] Executar `git log origin/codex/ghost-portfolio-hero-pr ^main --oneline` e registrar resultado.
- [ ] Executar `git log origin/worktree-fix-06-que-me-move ^main --oneline` e registrar resultado.
- [ ] Executar `git log origin/worktree-responsive-video-plan ^main --oneline` e registrar resultado.
- [ ] Reclassificar com base nos resultados: output vazio → candidato a delete; output não-vazio → escalar para humano.

### 7b. Backup [REQUIRES APPROVAL]
- [ ] Criar diretório `docs/git-hygiene/backups/` se não existir.
- [ ] Executar git bundle completo (`--all`) e salvar com timestamp.
- [ ] Criar tag `archive/codex/media-card-system`.
- [ ] Criar tag `archive/codex/ghost-portfolio-hero-pr`.
- [ ] Criar tag `archive/docs/ghost-design-v3`.
- [ ] Criar tag `archive/worktree-fix-06-que-me-move`.
- [ ] Criar tag `archive/worktree-responsive-video-plan`.
- [ ] Push de todas as tags para origin: `git push origin --tags`.
- [ ] Verificar que todas as tags estão presentes no remoto via `git ls-remote origin refs/tags/archive/*`.

### 7c. Remoção remota — confirmados [REQUIRES APPROVAL + APROVAÇÃO SEPARADA PARA REMOTO]
- [ ] `git push origin --delete codex/media-card-system` (SHA `06104ba` confirmado em main)
- [ ] Os seguintes apenas após investigação 7a confirmar merge:
  - [ ] `git push origin --delete codex/ghost-portfolio-hero-pr`
  - [ ] `git push origin --delete docs/audit-beliefs-ghost-design-v3`
  - [ ] `git push origin --delete worktree-fix-06-que-me-move`
  - [ ] `git push origin --delete worktree-responsive-video-plan`

### 7d. Limpeza de tracking refs stale [REQUIRES APPROVAL]
- [ ] Executar `git fetch --prune` (remove `origin/claude/dazzling-euler-ZhWMf` stale automaticamente).
- [ ] Verificar que branch local `claude/dazzling-euler-ZhWMf` permanece intacto após prune.
- [ ] Executar `git worktree prune --dry-run` e verificar que não há worktrees a remover.

---

## Phase 8 — Validation

- [ ] Verificar `git status` — árvore limpa, sem conflitos.
- [ ] Verificar `git branch --all` — listar estado final.
- [ ] Verificar `git worktree list` — confirmar que nenhuma worktree legítima foi perdida.
- [ ] Executar `git fetch --all --prune --dry-run` — confirmar 0 itens a remover após cleanup.
- [ ] Executar `pnpm run lint` e verificar saída sem erros.
- [ ] Executar `pnpm run typecheck` e verificar saída sem erros de tipo.
- [ ] Executar `pnpm run build` e verificar build completo sem falhas.
- [ ] Executar `pnpm test` se disponível e verificar suite verde.
- [ ] Confirmar que Firebase deploy target (`main`) não foi afetado.

---

## Phase 9 — Confirmation and Documentation

- [ ] Gerar `docs/git-hygiene/walkthrough.md` com estado inicial → ações executadas → estado final.
- [ ] Documentar comandos de rollback por branch removido.
- [ ] Documentar política de branch preventiva (ver Seção 10 abaixo).
- [ ] Decidir se `.context/DOCS-PORTFOLIO-PAGES` precisa de atualização.
  - Provável: não. Cleanup de branches não altera conteúdo de páginas.
- [ ] Adicionar `.git-hygiene-backup/` ao `.gitignore` se o diretório foi criado.

---

## Phase 10 — Future Branch Policy (Preventivo)

Após conclusão do cleanup, propor policy em `docs/git-hygiene/BRANCH-POLICY.md`:

- [ ] Definir naming convention por tipo: `feat/`, `fix/`, `docs/`, `worktree-`, `claude/`, `codex/`, `jules-`
- [ ] Definir TTL por tipo: branches de worktree agente devem ser deletados do remoto após merge confirmado.
- [ ] Definir regra: branches de agente autônomo (Jules, Codex, Workspace) devem ser arquivados via tag antes de qualquer delete.
- [ ] Definir regra: branches com PR mergeado há > 7 dias são automaticamente candidatos a delete remoto (com backup).
- [ ] Definir schedule de hygiene: rodar este plano a cada 2 semanas ou após ciclo de sprints.

---

## Resumo de Status Atual (2026-05-24)

| Fase | Status |
|---|---|
| Phase 1 — Repository Intake | ✅ Concluído (re-auditado 2026-05-24) |
| Phase 2 — Read-Only Git Audit | ✅ Concluído (re-auditado 2026-05-24) |
| Phase 3 — GitHub and PR Audit | ✅ Concluído (2 PRs abertos detectados) |
| Phase 4 — Classification | ✅ Concluído (re-auditado 2026-05-24) |
| Phase 5 — Backup Planning | ✅ Concluído (SHA map atualizado) |
| Phase 6 — Approval Gate | ⏸️ **Aguardando aprovação humana** |
| Phase 7 — Verified Execution | 🔒 Bloqueado |
| Phase 8 — Validation | 🔒 Bloqueado |
| Phase 9 — Docs | 🔒 Bloqueado |
| Phase 10 — Policy | 🔒 Bloqueado |

---

**Alterações detectadas desde auditoria anterior (2026-05-17):**

| Item | Status anterior | Status atual |
|---|---|---|
| `worktree-fix-ghost-desktop-position` | `candidate-delete-remote` | Removida do remoto ✅ |
| `worktree-spectral-r3f` | `candidate-delete-remote` | Removida do remoto ✅ |
| `fix/audit-p1-p2` | `candidate-delete-remote` | Removida do remoto ✅ |
| `jules-ghost-system-audit-report-*` | `candidate-archive` | Removida do remoto ✅ |
| `docs/sobre-page-technical-analysis-*` | `unknown-risk` | Removida do remoto ✅ |
| PRs abertos | 0 | **2** (#469, #470) — preservar |
| `main` API protection | `protected: false` (por policy) | `protected: true` (confirmado via API) |
| Novas branches adicionadas | — | 5 novas: `audit/weekly-report-*`, `claude/weekly-audit-report-*`, `codex/ghost-portfolio-hero-pr`, `codex/media-card-system`, `codex/sobre-origin-a11y-fixes` |

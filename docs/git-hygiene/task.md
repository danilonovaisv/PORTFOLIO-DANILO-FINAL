# Git Hygiene Task List

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items. Each task represents a discrete, reviewable unit of work with clear completion criteria and dependency order.

**Projeto:** portfoliodanilo.com  
**Criado em:** 2026-05-17  
**Atualizado em:** 2026-06-07  
**Status:** Phases 1–5 concluídas. Aguardando aprovação humana para Phase 6+.

---

## Resumo de Status

| Fase | Status |
|---|---|
| Phase 1 — Repository Intake | ✅ Concluído |
| Phase 2 — Read-Only Git Audit | ✅ Concluído |
| Phase 3 — GitHub and PR Audit | ✅ Concluído |
| Phase 4 — Classification | ✅ Concluído |
| Phase 5 — Backup and Rollback Planning | ✅ Concluído |
| Phase 6 — Approval Gate | ⏸️ **Aguardando aprovação humana** |
| Phase 7 — Verified Execution | 🔒 Bloqueado |
| Phase 8 — Validation | 🔒 Bloqueado |
| Phase 9 — Confirmation and Docs | 🔒 Bloqueado |
| Phase 10 — Future Branch Policy | 🔒 Bloqueado |

---

## Phase 1 — Repository Intake

- [x] Confirmar branch atual e status da árvore de trabalho.
  - Branch: `claude/dazzling-euler-q4KbP`, árvore limpa.
- [x] Identificar branch padrão.
  - `main`
- [x] Identificar remotes configurados.
  - `origin` → `https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL`
- [x] Identificar package manager e scripts de validação.
  - `pnpm`; scripts: `lint`, `typecheck`, `build`, `test`, `test:e2e`
- [x] Identificar premissas de branch protection.
  - `main` retorna `protected: true` via GitHub API (confirmado nesta auditoria).
  - Nenhuma outra branch protegida via API.

---

## Phase 2 — Read-Only Git Audit

- [x] Listar branches locais com verbose.
  - `claude/dazzling-euler-q4KbP` (HEAD), `main`
- [x] Listar branches remotas (GitHub API + remote tracking local).
  - 16 branches remotos via `mcp__github__list_branches`.
- [x] Listar branches mergeados (vs HEAD).
  - `claude/dazzling-euler-q4KbP` e `main` aparecem como merged (mesmo SHA `940e0a69`).
- [x] Listar branches não mergeados.
  - Nenhum localmente.
- [x] Verificar upstream tracking status de cada branch.
  - `main` → `origin/main` (em dia, mesmo SHA)
  - `claude/dazzling-euler-q4KbP` → sem upstream configurado
- [x] Listar worktrees em formato porcelain.
  - 1 worktree principal, limpa, não bloqueada.
- [x] Visualizar grafo de commits recente (all branches, max 40).
  - Executado. Topologia linear com merges de PRs anteriores visível.
- [x] Executar dry-run de `git fetch --prune`.
  - 1 tracking ref stale identificado (`origin/claude/dazzling-euler-q4KbP`).
  - 15 novos remote tracking refs seriam adicionados.
- [x] Executar dry-run de `git worktree prune`.
  - Saída vazia: nenhuma worktree a remover.

---

## Phase 3 — GitHub and PR Audit

- [x] Verificar PRs abertos via GitHub MCP.
  - **5 PRs abertos** (4 draft + 1 aberto):
    - PR #469 — `claude/weekly-audit-report-2026-05-19` (open)
    - PR #470 — `audit/weekly-report-4676327557888982331` (draft)
    - PR #487 — `claude/dazzling-euler-ZhWMf` (draft)
    - PR #488 — `chore-audit-report-12176814106024817247` (draft)
    - PR #489 — `claude/beautiful-rubin-MVYRs` (draft)
- [x] Verificar branches protegidas via API.
  - `main` com `protected: true` confirmado.
- [x] Marcar branches linked a PRs ativos como preserved.
  - 5 branches marcadas como `preserved-pr` (ver Seção 4.3 do implementation_plan.md).

---

## Phase 4 — Classification

- [x] Classificar branches protegidos.
  - `main` → `protected`
- [x] Classificar branches ativos.
  - `claude/dazzling-euler-q4KbP` → `active / current`
  - `main` (local) → `active / protected`
- [x] Classificar preserved-pr.
  - `claude/beautiful-rubin-MVYRs`, `chore-audit-report-12176814106024817247`, `claude/dazzling-euler-ZhWMf`, `audit/weekly-report-4676327557888982331`, `claude/weekly-audit-report-2026-05-19`
- [x] Classificar candidate-merge.
  - Nenhum identificado sem verificação adicional.
- [x] Classificar candidate-archive.
  - `codex/ghost-portfolio-hero-pr`, `codex/media-card-system`, `codex/sobre-origin-a11y-fixes`
- [x] Classificar candidatos a delete local.
  - Nenhum; estado local já é mínimo.
- [x] Classificar candidatos a delete remoto.
  - `worktree-fix-06-que-me-move` (merge confirmado via PR #452, SHA inalterado)
- [x] Classificar worktrees órfãs.
  - Nenhuma detectada.
- [x] Classificar itens unknown-risk.
  - `worktree-responsive-video-plan` (SHA alterado desde auditoria anterior)
  - `worktree-audit-fixes`, `fix/audit-remediation-phase1`, `docs/audit-beliefs-ghost-design-v3`, `codex/weekly-cleanup`, `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s`

---

## Phase 5 — Backup and Rollback Planning

- [x] Criar SHA map.
  - Documentado em `implementation_plan.md`, Seção 8 (10 branches mapeados).
- [x] Redigir comando git bundle.
  - `git bundle create .git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all`
- [x] Redigir comandos de backup tags.
  - Tags documentadas em `implementation_plan.md`, Seção 8.
- [x] Redigir comandos de rollback por branch.
  - Documentados por branch em `implementation_plan.md`, Seção 8.
- [x] Confirmar local de armazenamento dos artefatos de backup.
  - `.git-hygiene-backup/` (adicionar ao `.gitignore` se criado).

---

## Phase 6 — Approval Gate

- [ ] **STOP — Apresentar plano ao humano e solicitar aprovação.**
- [ ] Aguardar resposta `Aprovado`, `Proceed` ou instrução parcial de aprovação.

> ⚠️ Nenhuma tarefa abaixo desta linha pode ser iniciada antes da aprovação explícita.

---

## Phase 7 — Verified Execution (pós-aprovação)

### 7a. Verificação dos unknown-risk e candidate-archive (não destrutivo, requer fetch)
- [ ] Executar `git fetch --all --prune` para atualizar tracking refs e remover stale (ex: `origin/claude/dazzling-euler-q4KbP`).
- [ ] `git log origin/worktree-responsive-video-plan ^main --oneline` → registrar resultado.
- [ ] `git log origin/worktree-audit-fixes ^main --oneline` → registrar resultado.
- [ ] `git log origin/fix/audit-remediation-phase1 ^main --oneline` → registrar resultado.
- [ ] `git log origin/docs/audit-beliefs-ghost-design-v3 ^main --oneline` → registrar resultado.
- [ ] `git log origin/codex/weekly-cleanup ^main --oneline` → registrar resultado.
- [ ] `git log "origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" ^main --oneline` → registrar resultado.
- [ ] `git log origin/codex/ghost-portfolio-hero-pr ^main --oneline` → registrar resultado.
- [ ] `git log origin/codex/media-card-system ^main --oneline` → registrar resultado.
- [ ] `git log origin/codex/sobre-origin-a11y-fixes ^main --oneline` → registrar resultado.
- [ ] Reclassificar: output vazio → `candidate-delete-remote`; output não-vazio → escalar para humano.

### 7b. Backup
- [ ] Criar diretório `.git-hygiene-backup/` se não existir.
- [ ] Executar `git bundle create .git-hygiene-backup/pre-cleanup-<timestamp>.bundle --all`.
- [ ] Criar tag `archive/backup/worktree-fix-06-que-me-move`.
- [ ] Criar tags para candidate-archive (pós-verificação 7a): `archive/codex/ghost-portfolio-hero-pr`, `archive/codex/media-card-system`, `archive/codex/sobre-origin-a11y-fixes`.
- [ ] Push apenas das tags criadas nesta sessão (não `--tags` overbroad): `git push origin archive/backup/worktree-fix-06-que-me-move archive/codex/ghost-portfolio-hero-pr archive/codex/media-card-system archive/codex/sobre-origin-a11y-fixes`.
- [ ] Verificar que tags estão presentes no remoto.

### 7c. Remoção remota dos confirmados ★ REQUER APROVAÇÃO SEPARADA ★
- [ ] `git push origin --delete worktree-fix-06-que-me-move`
- [ ] (pós-verificação 7a, se output vazio) `git push origin --delete codex/ghost-portfolio-hero-pr`
- [ ] (pós-verificação 7a, se output vazio) `git push origin --delete codex/media-card-system`
- [ ] (pós-verificação 7a, se output vazio) `git push origin --delete codex/sobre-origin-a11y-fixes`

### 7d. Limpeza de tracking ref stale
- [ ] Confirmar que `git fetch --prune` (já executado em 7a) removeu `origin/claude/dazzling-euler-q4KbP` stale.
- [ ] Verificar que branch local `claude/dazzling-euler-q4KbP` permanece intacta após prune.

---

## Phase 8 — Validation

- [ ] Executar `git fetch --all --prune` — limpa tracking refs dos branches deletados na Phase 7c antes da validação.
- [ ] Verificar `git status` — árvore limpa, sem conflitos.
- [ ] Verificar `git branch --all` — listar estado final e confirmar ausência de branches deletadas acidentalmente.
- [ ] Verificar `git worktree list` — confirmar que nenhuma worktree legítima foi afetada.
- [ ] Executar `git fetch --all --prune --dry-run` — confirmar 0 itens a remover após o prune acima.
- [ ] Executar `pnpm run lint` e verificar saída sem erros.
- [ ] Executar `pnpm run typecheck` e verificar saída sem erros de tipo.
- [ ] Executar `pnpm run build` e verificar build completo sem falhas.
- [ ] Executar `pnpm test` se disponível e verificar suite verde.

---

## Phase 9 — Confirmation and Documentation

- [ ] Gerar `docs/git-hygiene/walkthrough.md` com: estado inicial → ações executadas → estado final.
- [ ] Documentar comandos de rollback por branch removido.
- [ ] Documentar política de branch preventiva (ver Phase 10).
- [ ] Decidir se `.context/DOCS-PORTFOLIO-PAGES` precisa de atualização.
  - Provável: não. Cleanup de branches não altera conteúdo de páginas ou componentes.
- [ ] Adicionar `.git-hygiene-backup/` ao `.gitignore` se o diretório foi criado.
- [ ] Commitar artefatos de documentação atualizados nesta sessão.

---

## Phase 10 — Future Branch Policy (Preventivo)

Após conclusão do cleanup, propor policy em `docs/git-hygiene/BRANCH-POLICY.md`:

- [ ] Definir naming convention por tipo de agente: `feat/`, `fix/`, `docs/`, `worktree-`, `claude/`, `codex/`, `jules-`, `chore-`
- [ ] Definir TTL por tipo:
  - Branches de agente (Jules, Codex, Workspace): deletar do remoto após PR mergeado e confirmado.
  - Branches de worktree: deletar do remoto após worktree removida e merge confirmado.
  - Branches de audit/docs: arquivar via tag após 14 dias sem atividade.
- [ ] Definir regra: branches com PR mergeado há > 7 dias são candidatas a delete remoto com backup obrigatório.
- [ ] Definir regra: branches de agente autônomo devem ter tag de archive criada antes de qualquer delete.
- [ ] Definir schedule de hygiene: rodar este plano a cada 2 semanas ou após ciclo de sprints.
- [ ] Definir regra para PRs draft: revisar semanalmente; fechar PRs draft com > 30 dias de inatividade.

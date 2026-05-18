# Git Hygiene Task List

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items. Each task represents a discrete, reviewable unit of work with clear completion criteria and dependency order.

**Projeto:** portfoliodanilo.com  
**Criado em:** 2026-05-17  
**Status:** Phase 1-4 concluídas. Aguardando aprovação humana para Fase 6+.

---

## Phase 1 — Repository Intake

- [x] Confirmar branch atual e status da árvore de trabalho.
  - Branch: `claude/dazzling-euler-4xD4T`, árvore limpa.
- [x] Identificar branch padrão.
  - `main`
- [x] Identificar remotes configurados.
  - `origin` → `http://local_proxy@127.0.0.1:34629/git/danilonovaisv/PORTFOLIO-DANILO-FINAL`
- [x] Identificar package manager e scripts de validação.
  - `pnpm`; scripts: `lint`, `typecheck`, `build`, `test`, `test:e2e`
- [x] Identificar premissas de branch protection.
  - `main` é branch padrão; API GitHub retorna `protected: false` mas tratada como protegida por policy.
  - Nenhuma outra branch protegida via API.

---

## Phase 2 — Read-Only Git Audit

- [x] Listar branches locais com verbose.
  - `claude/dazzling-euler-4xD4T` (HEAD), `main`
- [x] Listar branches remotas (GitHub API + remote tracking local).
  - 13 branches remotos via `mcp__github__list_branches`.
- [x] Listar branches mergeados (vs HEAD).
  - `claude/dazzling-euler-4xD4T` e `main` apareceram como merged (ambos são o mesmo SHA na prática).
- [x] Listar branches não mergeados.
  - Nenhum localmente.
- [x] Verificar upstream tracking status de cada branch.
  - `main` → `origin/main` (stale, remoto em `76bbcc65`, local em `6a6f0896`)
  - `claude/dazzling-euler-4xD4T` → sem upstream configurado
- [x] Listar worktrees em formato porcelain.
  - 1 worktree principal, limpa, não bloqueada.
- [x] Visualizar grafo de commits recente (all branches, max 80).
  - Executado. Evidência de merge de 6 branches remotos visível no grafo.
- [x] Executar dry-run de fetch --prune.
  - 1 tracking ref stale identificado (`origin/claude/dazzling-euler-4xD4T`).
  - 12 novos remote tracking refs seriam adicionados (branches remotos ainda não presentes localmente).

---

## Phase 3 — GitHub and PR Audit

- [x] Verificar PRs abertos via GitHub MCP.
  - **0 PRs abertos.**
- [x] Verificar PRs fechados/mergeados referenciados no git log.
  - PR #447 → `worktree-fix-ghost-desktop-position` (mergeado)
  - PR #451 → `fix/audit-p1-p2` (mergeado)
  - PR #452 → `worktree-fix-06-que-me-move` (mergeado)
  - PR #453 → `jules-ghost-system-audit-report-*` (mergeado)
  - PR #454, #455, #456 → `claude/exciting-thompson-*` (mergeados — branches não presentes no remoto atual)
- [x] Verificar branches protegidas via API.
  - Nenhuma com `protected: true` na API. `main` protegida por policy.
- [x] Marcar branches linked a PRs ativos como preserved.
  - Não aplicável (0 PRs abertos).

---

## Phase 4 — Classification

- [x] Classificar branches protegidos.
  - `main` → `protected`
- [x] Classificar branches ativos.
  - `claude/dazzling-euler-4xD4T` → `active / current`
  - `main` (local) → `active`
- [x] Classificar candidate-merge.
  - Nenhum identificado (todos os branches únicos visíveis no log já foram mergeados).
- [x] Classificar candidate-archive.
  - `jules-ghost-system-audit-report-4882938480465184539` → valor histórico como output de agente autônomo
- [x] Classificar candidatos a delete local.
  - Nenhum; estado local já é mínimo.
- [x] Classificar candidatos a delete remoto.
  - `worktree-fix-06-que-me-move`, `worktree-fix-ghost-desktop-position`, `worktree-spectral-r3f`, `worktree-responsive-video-plan`, `fix/audit-p1-p2`
- [x] Classificar worktrees órfãs.
  - Nenhuma detectada.
- [x] Classificar itens unknown-risk.
  - `worktree-audit-fixes`, `fix/audit-remediation-phase1`, `docs/audit-beliefs-ghost-design-v3`, `docs/sobre-page-technical-analysis-4751686432196136347`, `codex/weekly-cleanup`, `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s`

---

## Phase 5 — Backup and Rollback Planning

- [x] Criar SHA map.
  - Documentado em `implementation_plan.md`, Seção 8.
- [x] Redigir comando git bundle.
  - `git bundle create .git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all`
- [x] Redigir comandos de backup tags.
  - 6 tags de arquivo documentadas em `implementation_plan.md`, Seção 8.
- [x] Redigir comandos de rollback.
  - Documentados por branch em `implementation_plan.md`, Seção 8.
- [x] Confirmar local de armazenamento dos artefatos de backup.
  - `.git-hygiene-backup/` (excluir do git via `.gitignore` se necessário)

---

## Phase 6 — Approval Gate

- [ ] **STOP — Apresentar plano ao humano e solicitar aprovação.**
- [ ] Aguardar resposta `Aprovado`, `Proceed` ou instrução parcial de aprovação.

> ⚠️ Nenhuma tarefa abaixo desta linha pode ser iniciada antes da aprovação.

---

## Phase 7 — Verified Execution (pós-aprovação)

### 7a. Verificação dos unknown-risk (não destrutivo, mas altera estado local)
- [ ] Executar `git fetch --all` para atualizar todos os tracking refs.
- [ ] Executar `git log origin/worktree-audit-fixes ^main --oneline` e registrar resultado.
- [ ] Executar `git log origin/fix/audit-remediation-phase1 ^main --oneline` e registrar resultado.
- [ ] Executar `git log origin/docs/audit-beliefs-ghost-design-v3 ^main --oneline` e registrar resultado.
- [ ] Executar `git log "origin/docs/sobre-page-technical-analysis-4751686432196136347" ^main --oneline` e registrar resultado.
- [ ] Executar `git log origin/codex/weekly-cleanup ^main --oneline` e registrar resultado.
- [ ] Executar `git log "origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" ^main --oneline` e registrar resultado.
- [ ] Reclassificar unknown-risk com base nos resultados: se output vazio → candidato a delete; se output não-vazio → escalar para humano.

### 7b. Backup
- [ ] Criar diretório `.git-hygiene-backup/` se não existir.
- [ ] Executar git bundle completo (`--all`) e salvar com timestamp.
- [ ] Criar tag `archive/backup/worktree-fix-06-que-me-move`.
- [ ] Criar tag `archive/backup/worktree-fix-ghost-desktop-position`.
- [ ] Criar tag `archive/backup/worktree-spectral-r3f`.
- [ ] Criar tag `archive/backup/worktree-responsive-video-plan`.
- [ ] Criar tag `archive/backup/fix-audit-p1-p2`.
- [ ] Criar tag `archive/jules-ghost-audit-2026` (para `jules-ghost-system-audit-report-*`).
- [ ] Push de todas as tags para origin: `git push origin --tags`.
- [ ] Verificar que todas as tags estão presentes no remoto.

### 7c. Remoção remota dos confirmados (REQUER APROVAÇÃO SEPARADA)
- [ ] `git push origin --delete worktree-fix-06-que-me-move`
- [ ] `git push origin --delete worktree-fix-ghost-desktop-position`
- [ ] `git push origin --delete worktree-spectral-r3f`
- [ ] `git push origin --delete worktree-responsive-video-plan`
- [ ] `git push origin --delete fix/audit-p1-p2`
- [ ] `git push origin --delete jules-ghost-system-audit-report-4882938480465184539` (após tag criada e verificada)

### 7d. Limpeza de tracking refs stale
- [ ] Executar `git fetch --prune` (remove `origin/claude/dazzling-euler-4xD4T` stale automaticamente).
- [ ] Verificar que branch local `claude/dazzling-euler-4xD4T` permanece intacto após prune.

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

## Resumo de Status Atual

| Fase | Status |
|---|---|
| Phase 1 — Repository Intake | ✅ Concluído |
| Phase 2 — Read-Only Git Audit | ✅ Concluído |
| Phase 3 — GitHub and PR Audit | ✅ Concluído |
| Phase 4 — Classification | ✅ Concluído |
| Phase 5 — Backup Planning | ✅ Concluído |
| Phase 6 — Approval Gate | ⏸️ **Aguardando aprovação humana** |
| Phase 7 — Verified Execution | 🔒 Bloqueado |
| Phase 8 — Validation | 🔒 Bloqueado |
| Phase 9 — Docs | 🔒 Bloqueado |
| Phase 10 — Policy | 🔒 Bloqueado |

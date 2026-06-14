# Git Hygiene Task List

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items. Each task represents a discrete, reviewable unit of work with clear completion criteria and dependency order.

**Projeto:** portfoliodanilo.com  
**Criado em:** 2026-05-17  
**Atualizado em:** 2026-06-14  
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
| Phase 7 — Diff das unknown-risk (Fase 1 do plano) | 🔒 Bloqueado |
| Phase 8 — Verified Execution | 🔒 Bloqueado |
| Phase 9 — Validation | 🔒 Bloqueado |
| Phase 10 — Confirmation and Documentation | 🔒 Bloqueado |

---

## Phase 1 — Repository Intake

- [x] Confirmar branch atual e status da árvore de trabalho.
  - Branch: `claude/dazzling-euler-mwbicc`, árvore limpa. SHA: `8ee5ce62`.
- [x] Identificar branch padrão.
  - `main` (SHA: `8ee5ce62` no remoto; SHA `940e0a69` localmente — behind 7 commits)
- [x] Identificar remotes configurados.
  - `origin` → `danilonovaisv/PORTFOLIO-DANILO-FINAL` via proxy local
- [x] Identificar package manager e scripts de validação.
  - `pnpm`; scripts: `lint`, `typecheck`, `build-check`, `test`, `test:e2e`
- [x] Identificar premissas de branch protection.
  - `main` retorna `protected: true` via GitHub API (confirmado nesta auditoria).
  - Nenhuma outra branch protegida via API.
- [x] Confirmar presença de CI/CD vinculado a branches específicas.
  - Firebase Hosting via webframeworks experiment. CI em `.github/workflows/`.
  - Nenhuma das branches candidatas aparece como trigger hardcoded conhecido.

---

## Phase 2 — Read-Only Git Audit

- [x] Listar branches locais com verbose.
  - `claude/dazzling-euler-mwbicc` (HEAD), `main`
- [x] Listar branches remotas (GitHub API + fetch).
  - 17 branches remotas confirmadas.
- [x] Listar branches mergeados vs HEAD.
  - `main` (local) mergeada — mesmo SHA `8ee5ce62` que a branch atual.
- [x] Listar branches não mergeados.
  - Nenhum localmente.
- [x] Verificar upstream tracking status de cada branch.
  - `main` → `origin/main` (behind 7)
  - `claude/dazzling-euler-mwbicc` → sem upstream (remote deletado após PR #494 merge)
- [x] Listar worktrees em formato porcelain.
  - 1 worktree principal, limpa, não bloqueada.
- [x] Visualizar grafo de commits recente (all branches, max 40).
  - Executado. Topologia com merges de PRs recentes (inclusive #491, #484, #482) visível.
- [x] Executar dry-run de `git fetch --prune`.
  - `origin/claude/dazzling-euler-mwbicc` marcado como `[deleted]` (remote deletado após PR #494).
  - 16 novos remote tracking refs detectados.
- [x] Confirmar ausência de worktrees a remover.
  - `git worktree list --porcelain` retornou apenas o worktree principal.

---

## Phase 3 — GitHub and PR Audit

- [x] Verificar PRs abertos via GitHub MCP.
  - **1 PR aberto:** PR #493 — `claude/weekly-audit-report-2026-06-09` (open, não draft).
  - PRs anteriores (#469, #470, #487, #488, #489) confirmados FECHADOS.
- [x] Verificar branches protegidas via API.
  - `main` com `protected: true` confirmado.
  - Nenhuma outra branch protegida.
- [x] Marcar branches linked a PRs ativos como preserved.
  - `claude/weekly-audit-report-2026-06-09` → `preserved-pr` (PR #493 aberto).
- [x] Confirmar status dos PRs anteriores.
  - 5 branches ex-`preserved-pr` liberadas para reclassificação:
    - `claude/beautiful-rubin-MVYRs` (PR #489 fechado)
    - `chore-audit-report-12176814106024817247` (PR #488 fechado)
    - `claude/dazzling-euler-ZhWMf` (PR #487 fechado)
    - `audit/weekly-report-4676327557888982331` (PR #470 fechado)
    - `claude/weekly-audit-report-2026-05-19` (PR #469 fechado)

---

## Phase 4 — Classification

- [x] Classificar branches protegidas.
  - `main` (remote) → `protected`
- [x] Classificar branches ativas.
  - `claude/dazzling-euler-mwbicc` (local, current, remote deletado) → `candidate-delete-local`
  - `main` (local, behind 7) → `active / protected`
- [x] Classificar `preserved-pr`.
  - `claude/weekly-audit-report-2026-06-09` → `preserved-pr` (PR #493 aberto)
- [x] Classificar candidatos a delete local.
  - `claude/dazzling-euler-mwbicc` (após switch para `main`)
- [x] Classificar candidatos a delete remoto (zero commits ou chore UUID com PR fechado).
  - `codex/media-card-system` (0 commits únicos — mergeada)
  - `chore-audit-report-12176814106024817247` (1 commit chore, PR #488 fechado)
- [x] Classificar candidate-archive (valor histórico, PR fechado ou sem PR, 1 commit).
  - `audit/weekly-report-4676327557888982331` (PR #470 fechado, relatório automatizado)
  - `claude/weekly-audit-report-2026-05-19` (PR #469 fechado, relatório superado)
  - `claude/dazzling-euler-ZhWMf` (PR #487 fechado, 1 commit único)
  - `claude/beautiful-rubin-MVYRs` (PR #489 fechado, 1 commit único)
  - `codex/ghost-portfolio-hero-pr` (sem PR, 1 commit docs)
- [x] Classificar itens unknown-risk.
  - `fix/audit-remediation-phase1` (1141 commits únicos, commits funcionais confirmados)
  - `worktree-audit-fixes` (1268 commits únicos, commits de RLS e fixes)
  - `worktree-fix-06-que-me-move` (1278 commits únicos — ⚠️ reclassificado de `candidate-delete-remote`)
  - `worktree-responsive-video-plan` (1403 commits únicos, SHA mudou desde auditoria anterior)
  - `codex/sobre-origin-a11y-fixes` (1382 commits únicos, a11y fixes reais)
  - `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` (1123 commits únicos, motion e WebGL)
  - `docs/audit-beliefs-ghost-design-v3` (948 commits únicos, docs Ghost Design)
  - `codex/weekly-cleanup` (1197 commits únicos, cleanup — natureza não verificada)
- [x] Classificar worktrees órfãs.
  - Nenhuma detectada.

---

## Phase 5 — Backup and Rollback Planning

- [x] Criar SHA map completo.
  - Documentado em `implementation_plan.md`, Seção 8 — 16 branches mapeados com SHA completo, tag e restore command.
- [x] Redigir comando git bundle.
  - `git bundle create .git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all`
- [x] Redigir comandos de backup tags por branch.
  - Documentados em `implementation_plan.md`, Fases 4 e 5.
- [x] Redigir comandos de rollback por branch.
  - Documentados na tabela SHA Map do `implementation_plan.md`, Seção 8.
- [x] Confirmar local de armazenamento dos artefatos de backup.
  - `.git-hygiene-backup/` (adicionar ao `.gitignore` se criado).
- [x] Verificar política de reflog.
  - 90 dias por padrão. Não suficiente como única garantia para branches remotas. Bundle + tags são a garantia primária.

---

## Phase 6 — Approval Gate

- [ ] **STOP — Apresentar plano ao humano e solicitar aprovação.**
- [ ] Aguardar resposta `Aprovado`, `Proceed` ou instrução parcial de aprovação.

> ⚠️ Nenhuma tarefa abaixo desta linha pode ser iniciada antes da aprovação explícita.
>
> Aprovação mínima para esta sessão:
> - **Phase 7 (Diff das unknown-risk):** leitura pura; pode aprovar imediatamente.
> - **Phase 8a–8c (Update local + bundle + tags):** requer `Aprovado`.
> - **Phase 8d–8e (Delete remoto):** aprovação separada e explícita.
> - **Phase 8f (unknown-risk):** decisão humana por branch após análise dos diffs.

---

## Phase 7 — Diff das unknown-risk (READ-ONLY, pós-aprovação para contexto)

- [ ] `git diff origin/main...origin/fix/audit-remediation-phase1 --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main...origin/worktree-audit-fixes --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main...origin/worktree-fix-06-que-me-move --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main...origin/worktree-responsive-video-plan --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main...origin/codex/sobre-origin-a11y-fixes --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main..."origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main...origin/docs/audit-beliefs-ghost-design-v3 --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main...origin/codex/weekly-cleanup --stat` → registrar arquivos alterados.
- [ ] Reclassificar cada branch com base no resultado:
  - Somente docs/audit: → `candidate-archive`
  - Mudanças em `src/`, `.github/`, `supabase/`, `functions/`, `public/`: → escalar ao humano

---

## Phase 8 — Verified Execution (pós-aprovação)

### 8a. Atualização local
- [ ] `git checkout main`
- [ ] `git pull origin main` (atualiza local main de `940e0a69` para `8ee5ce62`)

### 8b. Delete local da branch mergeada
- [ ] `git branch -d claude/dazzling-euler-mwbicc`
- [ ] Confirmar que branch local foi removida sem erro (deve ser `-d` sem erro pois SHA = HEAD de `main`).

### 8c. Bundle de backup completo
- [ ] `mkdir -p .git-hygiene-backup`
- [ ] `git bundle create .git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all`
- [ ] Confirmar que bundle foi criado e não está vazio.

### 8d. Tags de arquivo para candidate-archive ★ REQUER APROVAÇÃO ★
- [ ] Criar tag `archive/audit/weekly-report/af752857` apontando para `af752857`.
- [ ] Criar tag `archive/claude/weekly-audit-2026-05-19/942afc1f` apontando para `942afc1f`.
- [ ] Criar tag `archive/claude/dazzling-euler-ZhWMf/762cf697` apontando para `762cf697`.
- [ ] Criar tag `archive/claude/beautiful-rubin-MVYRs/ac6526c0` apontando para `ac6526c0`.
- [ ] Criar tag `archive/codex/ghost-portfolio-hero-pr/bb1fbe0a` apontando para `bb1fbe0a`.
- [ ] Criar tags de backup para candidate-delete-remote: `backup/codex/media-card-system/06104ba2`, `backup/chore-audit-report/632024b4`.
- [ ] Push explícito apenas das tags acima (não `git push --tags` genérico).
- [ ] Confirmar que todas as tags estão visíveis no remoto.

### 8e. Delete remoto dos confirmados ★ REQUER APROVAÇÃO SEPARADA ★
- [ ] `git push origin --delete codex/media-card-system` (0 commits únicos — mergeada)
- [ ] `git push origin --delete chore-audit-report-12176814106024817247` (1 chore commit, PR #488 fechado)
- [ ] `git push origin --delete audit/weekly-report-4676327557888982331` (archive tag criada)
- [ ] `git push origin --delete claude/weekly-audit-report-2026-05-19` (archive tag criada)
- [ ] `git push origin --delete claude/dazzling-euler-ZhWMf` (archive tag criada)
- [ ] `git push origin --delete claude/beautiful-rubin-MVYRs` (archive tag criada)
- [ ] `git push origin --delete codex/ghost-portfolio-hero-pr` (archive tag criada)

### 8f. Delete ou merge das unknown-risk ★ REQUER DECISÃO HUMANA INDIVIDUAL ★
- [ ] Aguardar análise dos resultados da Phase 7 pelo humano.
- [ ] Para cada branch, executar ação aprovada explicitamente:
  - `fix/audit-remediation-phase1` → aguardar decisão
  - `worktree-audit-fixes` → aguardar decisão
  - `worktree-fix-06-que-me-move` → aguardar decisão
  - `worktree-responsive-video-plan` → aguardar decisão
  - `codex/sobre-origin-a11y-fixes` → aguardar decisão
  - `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` → aguardar decisão
  - `docs/audit-beliefs-ghost-design-v3` → aguardar decisão
  - `codex/weekly-cleanup` → aguardar decisão

---

## Phase 9 — Validation

- [ ] `git fetch --all --prune` — limpa tracking refs dos branches deletados na Phase 8e.
- [ ] `git status` — árvore limpa, sem conflitos.
- [ ] `git branch --all` — confirmar ausência de branches deletadas acidentalmente e presença das preservadas.
- [ ] `git worktree list --porcelain` — confirmar que nenhuma worktree legítima foi afetada.
- [ ] `git fetch --all --prune --dry-run` — confirmar 0 itens a remover após o prune acima.
- [ ] `pnpm run lint` — sem erros.
- [ ] `pnpm run typecheck` — sem erros de tipo.
- [ ] `pnpm run build-check` — build completo sem falhas (typecheck + lint em paralelo).
- [ ] `pnpm test` — suite verde (se disponível).

---

## Phase 10 — Confirmation and Documentation

- [ ] Gerar `docs/git-hygiene/walkthrough.md` com: estado inicial → ações executadas → estado final.
- [ ] Documentar comandos de rollback por branch removida.
- [ ] Decidir se `.context/DOCS-PORTFOLIO-PAGES` precisa de atualização.
  - Provável: não. Cleanup de branches não altera conteúdo de páginas ou componentes.
- [ ] Adicionar `.git-hygiene-backup/` ao `.gitignore` se o diretório foi criado.
- [ ] Commitar artefatos de documentação atualizados.
- [ ] Registrar política de branch preventiva (ver Phase 11).

---

## Phase 11 — Future Branch Policy (Preventivo)

Após conclusão do cleanup, propor policy em `docs/git-hygiene/BRANCH-POLICY.md`:

- [ ] Definir naming convention por tipo de agente: `feat/`, `fix/`, `docs/`, `worktree-`, `claude/`, `codex/`, `chore-`
- [ ] Definir TTL por tipo:
  - Branches de agente (Codex, Workspace, Jules): deletar do remoto após PR mergeado + 7 dias.
  - Branches de worktree: deletar do remoto após worktree removida e merge confirmado.
  - Branches de audit/docs: arquivar via tag após 14 dias sem atividade.
- [ ] Definir regra: branches com 0 commits únicos vs main são deletáveis imediatamente após backup.
- [ ] Definir regra: branches `claude/` geradas por sessão autônoma devem ter tag archive criada antes de qualquer delete.
- [ ] Definir schedule de hygiene: rodar este plano a cada 2 semanas ou após ciclo de sprints.
- [ ] Definir regra para PRs draft: revisar semanalmente; fechar PRs draft com > 30 dias de inatividade.
- [ ] Definir regra: nenhuma branch com mais de 1 commit único pode ser deletada sem diff `--stat` documentado.

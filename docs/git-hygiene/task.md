# Git Hygiene Task List

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items. Each task represents a discrete, reviewable unit of work with clear completion criteria and dependency order.

**Projeto:** portfoliodanilo.com  
**Criado em:** 2026-05-17  
**Atualizado em:** 2026-06-28  
**Status:** Ciclo 2026-06-28 — Phases 1–5 concluídas. Aguardando aprovação humana para Phase 6+.

---

## Resumo de Status — Ciclo 2026-06-28

| Fase | Status |
|---|---|
| Phase 1 — Repository Intake | ✅ Concluído (2026-06-28) |
| Phase 2 — Read-Only Git Audit | ✅ Concluído (2026-06-28) |
| Phase 3 — GitHub and PR Audit | ✅ Concluído (2026-06-28) |
| Phase 4 — Classification | ✅ Concluído (2026-06-28) |
| Phase 5 — Backup and Rollback Planning | ✅ Concluído (documentação) |
| Phase 6 — Approval Gate | ⏸️ **Aguardando aprovação humana** |
| Phase 7 — Fetch + Diff das unknown-risk | 🔒 Bloqueado até aprovação |
| Phase 8 — Verified Execution | 🔒 Bloqueado |
| Phase 9 — Validation | 🔒 Bloqueado |
| Phase 10 — Confirmation and Documentation | 🔒 Bloqueado |

## Resumo de Status — Ciclo 2026-06-14 (histórico)

| Fase | Status |
|---|---|
| Phase 1 — Repository Intake | ✅ |
| Phase 2 — Read-Only Git Audit | ✅ |
| Phase 3 — GitHub and PR Audit | ✅ |
| Phase 4 — Classification | ✅ |
| Phase 5 — Backup and Rollback Planning | ✅ |
| Phase 6 — Approval Gate | ⏸️ Nunca aprovado — sessão encerrada |
| Phase 7+ | 🔒 Nunca executado |

---

## Phase 1 — Repository Intake

- [x] Confirmar branch atual e status da árvore de trabalho.
  - Branch: `claude/dazzling-euler-ad7pi8`, árvore limpa. SHA: `dfd51a251`.
- [x] Identificar branch padrão.
  - `main` (SHA: `dfd51a251` no remoto; SHA `14869153` localmente — behind 1 commit)
- [x] Identificar remotes configurados.
  - `origin` → `danilonovaisv/PORTFOLIO-DANILO-FINAL` via proxy local
- [x] Identificar package manager e scripts de validação.
  - `pnpm`; scripts: `lint`, `typecheck`, `build-check`, `test`, `test:e2e`
- [x] Identificar premissas de branch protection.
  - `main` retorna `protected: true` via GitHub API (confirmado via `list_branches`).
  - Nenhuma outra branch protegida via API.
- [x] Confirmar presença de CI/CD vinculado a branches específicas.
  - Firebase Hosting via webframeworks experiment. CI em `.github/workflows/`.
  - Nenhuma das branches candidatas aparece como trigger hardcoded conhecido.

---

## Phase 2 — Read-Only Git Audit

- [x] Listar branches locais com verbose.
  - `claude/dazzling-euler-ad7pi8` (HEAD), `main`
- [x] Listar branches remotas (GitHub API).
  - 20 branches remotas confirmadas via `list_branches` MCP.
- [x] Listar branches mergeados vs HEAD (local).
  - `claude/dazzling-euler-ad7pi8` e `main` aparecem em `--merged`.
- [x] Listar branches não mergeados (local).
  - Nenhum localmente.
- [x] Verificar upstream tracking status de cada branch.
  - `main` → `origin/main` (behind 1)
  - `claude/dazzling-euler-ad7pi8` → `origin/claude/dazzling-euler-ad7pi8` (stale)
- [x] Listar worktrees em formato porcelain.
  - 1 worktree principal, limpa, não bloqueada.
- [x] Visualizar grafo de commits recente (all branches, max 80).
  - Executado. Topologia com merges de PRs recentes visível.
- [x] Executar dry-run de `git fetch --prune`.
  - `origin/claude/dazzling-euler-ad7pi8` marcado como `[deleted]` (stale).
  - 19 novos remote tracking refs seriam criados.
  - `origin/main` seria atualizado de `14869153` para `dfd51a251`.
  - ⚠️ **Dry-run apenas — objetos NÃO baixados.**
- [x] Executar dry-run de `git worktree prune`.
  - Sem output — nenhuma worktree órfã.
- [x] Confirmar merge status de `codex/media-card-system`.
  - `merge-base --is-ancestor 06104ba2 HEAD` → MERGED (SHA estava no store local).

---

## Phase 3 — GitHub and PR Audit

- [x] Verificar PRs abertos via GitHub MCP.
  - **3 PRs abertos:**
    - PR #498 — `claude/weekly-audit-report-2026-06-23` (open)
    - PR #497 — `claude/dazzling-euler-mp4s71` (open)
    - PR #496 — `claude/weekly-audit-report-2026-06-16` (open)
  - PR #493 (`claude/weekly-audit-report-2026-06-09`) não aparece mais — resolvido.
- [x] Verificar branches protegidas via API.
  - `main` com `protected: true` confirmado.
  - Nenhuma outra branch protegida.
- [x] Marcar branches linked a PRs ativos como preserved.
  - `claude/weekly-audit-report-2026-06-23` → `preserved-pr` (PR #498)
  - `claude/dazzling-euler-mp4s71` → `preserved-pr` (PR #497)
  - `claude/weekly-audit-report-2026-06-16` → `preserved-pr` (PR #496)
- [x] Confirmar novas branches detectadas.
  - `docs/ghost-design-updates-12336613816235341544` (nova, sem PR, sem contexto — `unknown-risk`)

---

## Phase 4 — Classification

- [x] Classificar branches protegidas.
  - `main` (remote) → `protected`
- [x] Classificar branches ativas.
  - `claude/dazzling-euler-ad7pi8` (local, current) → `active`
  - `main` (local, behind 1) → `active / protected`
- [x] Classificar `preserved-pr`.
  - `claude/weekly-audit-report-2026-06-23` → `preserved-pr` (PR #498)
  - `claude/dazzling-euler-mp4s71` → `preserved-pr` (PR #497)
  - `claude/weekly-audit-report-2026-06-16` → `preserved-pr` (PR #496)
- [x] Classificar candidatos a delete local.
  - Nenhum novo — branch atual não mergeada localmente; `main` apenas needs pull
- [x] Classificar candidatos a delete remoto.
  - `codex/media-card-system` (MERGED confirmado — merge-base)
  - `chore-audit-report-12176814106024817247` (1 chore commit, PR #488 fechado)
- [x] Classificar candidate-archive (valor histórico, PR fechado ou sem PR, 1 commit).
  - `audit/weekly-report-4676327557888982331` (PR #470 fechado)
  - `claude/weekly-audit-report-2026-05-19` (PR #469 fechado)
  - `claude/dazzling-euler-ZhWMf` (PR #487 fechado, 1 commit)
  - `claude/beautiful-rubin-MVYRs` (PR #489 fechado, 1 commit)
  - `codex/ghost-portfolio-hero-pr` (sem PR, 1 commit docs)
- [x] Classificar itens unknown-risk.
  - `fix/audit-remediation-phase1` (1141 commits únicos — dado de 2026-06-14)
  - `worktree-audit-fixes` (1268 commits — dado de 2026-06-14)
  - `worktree-fix-06-que-me-move` (1278 commits — reclassificado em 2026-06-14)
  - `worktree-responsive-video-plan` (1403 commits — dado de 2026-06-14)
  - `codex/sobre-origin-a11y-fixes` (1382 commits — dado de 2026-06-14)
  - `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` (1123 commits — dado de 2026-06-14)
  - `docs/audit-beliefs-ghost-design-v3` (948 commits — dado de 2026-06-14)
  - `codex/weekly-cleanup` (1197 commits — dado de 2026-06-14)
  - `docs/ghost-design-updates-12336613816235341544` (nova — sem dados de commit count)
- [x] Classificar worktrees órfãs.
  - Nenhuma detectada.

---

## Phase 5 — Backup and Rollback Planning

- [x] Criar SHA map completo.
  - Documentado em `implementation_plan.md`, Seção 8 — 17 branches mapeados com SHA completo, tag e restore command.
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
> Aprovação mínima para o ciclo 2026-06-28:
> - **Phase 7 (Fetch + Diff das unknown-risk):** leitura pura após fetch; pode aprovar imediatamente.
> - **Phase 8a–8c (Update local + bundle + tags):** requer `Aprovado`.
> - **Phase 8e (Delete remoto dos candidate-delete-remote):** aprovação separada e explícita.
> - **Phase 8f (Delete remoto dos candidate-archive):** aprovação separada e explícita.
> - **Phase 8g (unknown-risk):** decisão humana por branch após análise dos diffs.
> - **Preservados sem aprovação necessária:** PRs #496, #497, #498 e suas branches.

---

## Phase 7 — Fetch + Diff das unknown-risk (READ-ONLY, pós-aprovação)

> **Pré-requisito:** `git fetch origin` — obrigatório para ter os objetos no store local.

- [ ] `git fetch origin` → baixar todos os objetos remotos.
- [ ] `git diff origin/main...origin/fix/audit-remediation-phase1 --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main...origin/worktree-audit-fixes --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main...origin/worktree-fix-06-que-me-move --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main...origin/worktree-responsive-video-plan --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main...origin/codex/sobre-origin-a11y-fixes --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main..."origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" --stat` → registrar.
- [ ] `git diff origin/main...origin/docs/audit-beliefs-ghost-design-v3 --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main...origin/codex/weekly-cleanup --stat` → registrar arquivos alterados.
- [ ] `git diff origin/main..."origin/docs/ghost-design-updates-12336613816235341544" --stat` → nova branch — registrar.
- [ ] `git diff origin/main...origin/audit/weekly-report-4676327557888982331 --stat` → candidate-archive, alta divergência.
- [ ] `git diff origin/main...origin/claude/weekly-audit-report-2026-05-19 --stat` → candidate-archive, alta divergência.
- [ ] Reclassificar cada branch com base no resultado:
  - Somente docs/audit: → `candidate-archive`
  - Mudanças em `src/`, `.github/`, `supabase/`, `functions/`, `public/`: → escalar ao humano

---

## Phase 8 — Verified Execution (pós-aprovação)

### 8a. Atualização local
- [ ] `git checkout main`
- [ ] `git pull origin main` (atualiza local main de `14869153` para `dfd51a251`)

### 8b. Delete local da branch mergeada (quando aplicável)
- [ ] Após confirmação de PR mergeado para `claude/dazzling-euler-ad7pi8`: `git checkout main && git branch -d claude/dazzling-euler-ad7pi8`
- [ ] Confirmar que branch local foi removida sem erro.

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
- [ ] Criar tags de backup para as 8 unknown-risk (gate obrigatório antes de qualquer delete na Phase 8f):
  - `backup/fix/audit-remediation-phase1/2a7cc79f` → `2a7cc79f`
  - `backup/worktree-audit-fixes/4f158abe` → `4f158abe`
  - `backup/worktree-fix-06-que-me-move/561eec01` → `561eec01`
  - `backup/worktree-responsive-video-plan/09aab7da` → `09aab7da`
  - `backup/codex/sobre-origin-a11y-fixes/e03f269d` → `e03f269d`
  - `backup/wksp1-planning/16aa5652` → `16aa5652`
  - `backup/docs/audit-beliefs-ghost-design-v3/2444b35b` → `2444b35b`
  - `backup/codex/weekly-cleanup/dcf8d0de` → `dcf8d0de`
  - `backup/docs/ghost-design-updates/c5c18920` → `c5c18920c1eda0c6cb92cdab4ab0448a5ae38fea`
- [ ] Push explícito das tags candidate-archive, candidate-delete-remote e unknown-risk (não `git push --tags` genérico).
- [ ] Confirmar que todas as tags estão visíveis no remoto.

### 8e. Delete remoto dos candidate-delete-remote ★ REQUER APROVAÇÃO SEPARADA ★
- [ ] `git push origin --delete codex/media-card-system` (MERGED confirmado)
- [ ] `git push origin --delete chore-audit-report-12176814106024817247` (1 chore commit, PR #488 fechado)

### 8f. Delete remoto dos candidate-archive ★ REQUER APROVAÇÃO SEPARADA ★
- [ ] `git push origin --delete audit/weekly-report-4676327557888982331` (archive tag criada)
- [ ] `git push origin --delete claude/weekly-audit-report-2026-05-19` (archive tag criada)
- [ ] `git push origin --delete claude/dazzling-euler-ZhWMf` (archive tag criada)
- [ ] `git push origin --delete claude/beautiful-rubin-MVYRs` (archive tag criada)
- [ ] `git push origin --delete codex/ghost-portfolio-hero-pr` (archive tag criada)

### 8g. Delete ou merge das unknown-risk ★ REQUER DECISÃO HUMANA INDIVIDUAL ★
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
  - `docs/ghost-design-updates-12336613816235341544` → nova branch; diff obrigatório antes de qualquer decisão

---

## Phase 9 — Validation

- [ ] `git fetch --all --prune` — limpa tracking refs dos branches deletados nas Phases 8e e 8f.
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

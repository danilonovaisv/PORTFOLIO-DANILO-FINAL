# Git Branch and Worktree Hygiene Plan

_Gerado em: 2026-06-21 | Auditor: Claude Code — Staff Git Operations Engineer_

---

## 1. Executive Summary

**Objetivo:** Inventariar, classificar e propor ações seguras de limpeza para todas as branches e worktrees do repositório `portfoliodanilo.com`. Nenhuma exclusão ocorrerá sem aprovação humana explícita.

**Escopo:** 18 branches remotas, 2 branches locais, 1 worktree. Uma branch (`claude/weekly-audit-report-2026-06-16`) possui PR aberto (#496) e está preservada incondicionalmente.

**Risco principal identificado:** O repositório possui histórico grafted (`6cf2dbbc` é o ponto-limite). Isso significa que `git merge-base --is-ancestor` retorna `NOT-MERGED` para commits além do boundary mesmo que tenham sido integrados por squash-merge. **Toda classificação de remoção deve ser tratada com cautela extra.**

**Risco secundário:** `origin/claude/dazzling-euler-mp4s71` existe como remote-tracking ref local mas a branch foi deletada no remoto (confirmado por `fetch --dry-run`). É uma ref stale, não uma branch ativa.

**Estratégia:** read-only first, backup antes de qualquer exclusão, cleanup em fases segregadas com gate de aprovação humana entre fases local e remota.

---

## 2. Repository Context

| Campo | Valor |
|---|---|
| Current branch | `claude/dazzling-euler-mp4s71` |
| HEAD SHA | `14869153` (idêntico ao tip de `main`) |
| Default branch | `main` |
| Remote | `origin` → `http://local_proxy@127.0.0.1:33789/git/danilonovaisv/PORTFOLIO-DANILO-FINAL` |
| Package manager | `pnpm` |
| Deploy target | Firebase Hosting |
| CI/CD | GitHub Actions (workflow de deploy detectado) |
| Protected branches | `main` (branch protection ativa confirmada via GitHub API) |
| Open PRs | 1 — PR #496 em `claude/weekly-audit-report-2026-06-16` |
| Worktrees | 1 — `/home/user/PORTFOLIO-DANILO-FINAL` (CLEAN) |
| Grafted history | Sim — boundary em `6cf2dbbc` |
| Gitmodules warning | `skills/superpower` tem entrada duplicada em `.gitmodules` (técnico, fora do escopo) |

---

## 3. Read-only Commands Used

| Comando | Finalidade |
|---|---|
| `git status --short --branch` | Estado atual do working tree e branch |
| `git remote -v` | Remotes configurados |
| `git branch --all --verbose --verbose` | Lista completa de branches com tracking |
| `git branch --merged` | Branches mergeadas em HEAD |
| `git branch --no-merged` | Branches sem merge em HEAD |
| `git worktree list --porcelain` | Inventário de worktrees em formato estável para parsing |
| `git for-each-ref --format='...' refs/heads refs/remotes` | Metadados completos de branches (SHA, data, autor, upstream, track) |
| `git log --oneline --decorate --graph --all --max-count=80` | Topologia completa com últimos 80 commits |
| `git fetch --all --prune --dry-run` | Simulação de fetch sem executar mudanças |
| `git merge-base --is-ancestor <sha> main` | Verificação de ancestralidade para cada branch remota |
| `git log --oneline <sha> -1` | Descrição do commit tip de cada branch |
| `mcp__github__list_pull_requests` | PRs abertos no GitHub |
| `mcp__github__list_branches` | Branches remotas com SHA e proteção |

---

## 4. Branch Inventory

### 4.1 Branches Locais

| Branch | Status | SHA | Data Último Commit | Autor | Upstream | Ahead/Behind | PR | Merge Status | Classificação | Evidência | Ação Proposta |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `claude/dazzling-euler-mp4s71` | **CURRENT** | `14869153` | 2026-06-15 | danilonovaisv | nenhum | — | nenhum | Idêntico a `main` | `active` | `git status --branch` + SHA coincide com `origin/main` | Preservar durante sessão; candidata a delete-local após merge final |
| `main` | local | `14869153` | 2026-06-15 | danilonovaisv | `origin/main` | 0/0 | — | — | `protected` | Branch padrão, protection ativa no GitHub | Preservar sempre |

### 4.2 Branches Remotas

| Branch | SHA | Commit Tip | Merged em main? | PR | Proteção | Classificação | Ação Proposta |
|---|---|---|---|---|---|---|---|
| `main` | `14869153` | `update` | — | — | **SIM** | `protected` | Preservar sempre |
| `claude/weekly-audit-report-2026-06-16` | `55c53302` | (não fetchado localmente) | NOT-MERGED (via PR #496) | **#496 OPEN** | não | `protected` | Preservar — PR aberto |
| `claude/beautiful-rubin-MVYRs` | `ac6526c0` | (não fetchado localmente) | unknown-ancestry† | nenhum | não | `unknown-risk` | Preservar até inspeção manual |
| `claude/dazzling-euler-ZhWMf` | `762cf697` | (não fetchado localmente) | unknown-ancestry† | nenhum | não | `unknown-risk` | Preservar até inspeção manual |
| `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` | `16aa5652` | (não fetchado localmente) | unknown-ancestry† | nenhum | não | `unknown-risk` | Preservar — branch de usuário |
| `codex/media-card-system` | `06104ba2` | `feat: add typed media card system` | **CONFIRMED MERGED** | nenhum | não | `candidate-delete-remote` | Candidata a remoção remota após backup (**REQUIRES APPROVAL**) |
| `audit/weekly-report-4676327557888982331` | `af752857` | `docs: add WEEKLY_AUDIT_REPORT.md` | NOT-MERGED* | nenhum | não | `candidate-archive` | Arquivar ou deletar após backup (**REQUIRES APPROVAL**) |
| `chore-audit-report-12176814106024817247` | `632024b4` | `chore: generate audit cleanup report` | NOT-MERGED* | nenhum | não | `candidate-archive` | Arquivar ou deletar após backup (**REQUIRES APPROVAL**) |
| `claude/weekly-audit-report-2026-05-19` | `942afc1f` | `docs: audit report v1.1 — corrections from Codex review` | NOT-MERGED* | nenhum | não | `candidate-archive` | Arquivar — audit doc histórico (**REQUIRES APPROVAL**) |
| `codex/ghost-portfolio-hero-pr` | `bb1fbe0a` | `docs: restore ghost hero pr traceability` | NOT-MERGED* | nenhum | não | `candidate-archive` | Arquivar — docs de rastreabilidade (**REQUIRES APPROVAL**) |
| `codex/sobre-origin-a11y-fixes` | `e03f269d` | `fix origens` | NOT-MERGED* | nenhum | não | `candidate-archive` | Inspecionar antes de arquivar (pode ter a11y útil) (**REQUIRES APPROVAL**) |
| `codex/weekly-cleanup` | `dcf8d0de` | `chore(deps): update project dependencies and knip configuration` | NOT-MERGED* | nenhum | não | `candidate-archive` | Arquivar (**REQUIRES APPROVAL**) |
| `docs/audit-beliefs-ghost-design-v3` | `2444b35b` | (não fetchado localmente) | unknown-ancestry† | nenhum | não | `unknown-risk` | Preservar até inspeção manual — unknown-ancestry†; alta divergência reportada (**REQUIRES APPROVAL**) |
| `docs/ghost-design-updates-12336613816235341544` | `c5c18920` | (não fetchado localmente) | unknown-ancestry† | nenhum | não | `unknown-risk` | Preservar até inspeção manual — unknown-ancestry†; diff obrigatório antes de qualquer ação (**REQUIRES APPROVAL**) |
| `fix/audit-remediation-phase1` | `2a7cc79f` | (não fetchado localmente) | unknown-ancestry† | nenhum | não | `candidate-archive` | Inspecionar obrigatoriamente antes de arquivar — pode ter fixes de segurança (**REQUIRES APPROVAL**) |
| `worktree-audit-fixes` | `4f158abe` | (não fetchado localmente) | unknown-ancestry† | nenhum | não | `unknown-risk` | Preservar até inspeção manual — referenciada em outros docs como contendo RLS rules, audit fixes e TypeScript changes (**REQUIRES APPROVAL**) |
| `worktree-fix-06-que-me-move` | `561eec01` | (não fetchado localmente) | unknown-ancestry† | nenhum | não | `unknown-risk` | Preservar até inspeção manual — referenciada em outros docs como contendo motion-layer fixes com avaliação de merge pendente (**REQUIRES APPROVAL**) |
| `worktree-responsive-video-plan` | `09aab7da` | (não fetchado localmente) | unknown-ancestry† | nenhum | não | `unknown-risk` | Preservar até inspeção manual — docs de projeto indicam fixes de video responsivo (Firefox/Safari source selection) com avaliação de merge pendente (**REQUIRES APPROVAL**) |

_*NOT-MERGED via `git merge-base --is-ancestor` para SHAs presentes localmente (confirmados por `git log --oneline <sha> -1`). Aplicável a: `audit/weekly-report-*`, `chore-audit-report-*`, `claude/weekly-audit-report-2026-05-19`, `codex/ghost-portfolio-hero-pr`, `codex/sobre-origin-a11y-fixes`, `codex/weekly-cleanup`. Nota: grafted history em `6cf2dbbc` pode gerar falsos-negativos para squash-merges anteriores ao boundary._

_†unknown-ancestry: SHA não confirmado como presente localmente. `git merge-base --is-ancestor` pode ter saído com erro de objeto ausente (exit ≠ 1) em vez de "not ancestor" (exit 1). Tratar como `unknown-risk` até fetch e verificação explícita. Aplicável a: `claude/beautiful-rubin-MVYRs`, `claude/dazzling-euler-ZhWMf`, `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s`, `docs/audit-beliefs-ghost-design-v3`, `docs/ghost-design-updates-*`, `fix/audit-remediation-phase1`, `worktree-audit-fixes`, `worktree-fix-06-que-me-move`, `worktree-responsive-video-plan`._

### 4.3 Ref Stale (Remote-tracking)

| Ref | Situação | Ação Proposta |
|---|---|---|
| `origin/claude/dazzling-euler-mp4s71` | Branch deletada no remoto; ref local stale confirmada por `fetch --dry-run` | Removida automaticamente por `git fetch --prune` (operação segura, não afeta branch local) |

---

## 5. Worktree Inventory

| Worktree Path | Branch | SHA | Status | Locked | Clean/Dirty | Existe em Disco | Classificação | Evidência | Ação Proposta |
|---|---|---|---|---|---|---|---|---|---|
| `/home/user/PORTFOLIO-DANILO-FINAL` | `claude/dazzling-euler-mp4s71` | `14869153` | Principal | Não | **CLEAN** | Sim | `active` | `git worktree list --porcelain` | Preservar — worktree principal da sessão |

**Nenhuma worktree órfã detectada.** `git worktree prune --dry-run` não foi executado (aguarda fase de aprovação).

---

## 6. Risk Model

| Classificação | Descrição | Itens Nesta Categoria |
|---|---|---|
| `protected` | Branch padrão ou PR aberto | `main` (remoto), `claude/weekly-audit-report-2026-06-16` |
| `active` | Em uso ativo ou branch atual | `claude/dazzling-euler-mp4s71` (local), `main` (local), worktree principal |
| `candidate-merge` | Commits não integrados com valor funcional identificável | Nenhuma detectada (requer inspeção dos `unknown-risk`) |
| `candidate-archive` | Valor histórico/documental, sem PR ativo, sem uso imediato | 12 branches remotas (ver 4.2) |
| `candidate-delete-remote` | SHA confirmado merged em `main` | `codex/media-card-system` (único confirmado) |
| `orphaned-worktree` | Worktree sem branch ativa no disco | Nenhuma detectada |
| `locked-worktree` | Worktree com lock file | Nenhuma detectada |
| `unknown-risk` | Conteúdo não inspecionado; preservar até revisão manual | `claude/beautiful-rubin-MVYRs`, `claude/dazzling-euler-ZhWMf`, `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` |

---

## 7. Merge and Unification Strategy

**`claude/beautiful-rubin-MVYRs` e `claude/dazzling-euler-ZhWMf`:** Inspecionar com `git diff --stat main origin/<branch>` antes de qualquer decisão. Se contêm código funcional não mergeado, avaliar cherry-pick seletivo. Se somente docs, arquivar.

**`codex/sobre-origin-a11y-fixes`:** Commit tip `fix origens` sugere a11y fixes para a seção "Origens/O que me move". A11y é prioridade do projeto (WCAG 2.1 AA). Inspecionar diff obrigatoriamente antes de arquivar; se relevante, cherry-pick para `main`.

**`fix/audit-remediation-phase1`:** Possível conteúdo de segurança ou remediação. Inspecionar antes de qualquer ação de arquivamento.

**Restante das `candidate-archive`:** Arquivamento via tag de backup. Sem merge recomendado com base nos dados disponíveis.

**`codex/media-card-system`:** Única candidata confirmada para deleção remota — SHA `06104ba2` é ancestor de `main`.

---

## 8. Backup and Rollback Strategy

### Bundle Completo (Preferencial — REQUIRES APPROVAL)

```bash
mkdir -p .git-hygiene-backup
git bundle create ../git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all
```

O bundle captura todas as refs locais no momento da execução. Para incluir branches remotas, fetch antes do bundle.

### Tags de Backup por Branch (REQUIRES APPROVAL)

```bash
# -f força atualização se tag já existir (evita gate de backup satisfeito por tag stale de rerun anterior)
git tag -f backup/pre-cleanup/codex-media-card-system            06104ba2
git tag -f backup/pre-cleanup/audit-weekly-report                af752857
git tag -f backup/pre-cleanup/chore-audit-report                 632024b4
git tag -f backup/pre-cleanup/claude-weekly-audit-2026-05-19     942afc1f
git tag -f backup/pre-cleanup/codex-ghost-portfolio-hero-pr      bb1fbe0a
git tag -f backup/pre-cleanup/codex-sobre-origin-a11y-fixes      e03f269d
git tag -f backup/pre-cleanup/codex-weekly-cleanup               dcf8d0de
git tag -f backup/pre-cleanup/docs-audit-beliefs-ghost-v3        2444b35b
git tag -f backup/pre-cleanup/docs-ghost-design-updates          c5c18920
git tag -f backup/pre-cleanup/fix-audit-remediation-phase1       2a7cc79f
git tag -f backup/pre-cleanup/worktree-audit-fixes               4f158abe
git tag -f backup/pre-cleanup/worktree-fix-06-que-me-move        561eec01
git tag -f backup/pre-cleanup/worktree-responsive-video-plan     09aab7da

# Verificar que cada tag aponta para o SHA auditado (segurança contra tag stale)
declare -A tag_sha_map=(
  ["backup/pre-cleanup/codex-media-card-system"]="06104ba2"
  ["backup/pre-cleanup/audit-weekly-report"]="af752857"
  ["backup/pre-cleanup/chore-audit-report"]="632024b4"
  ["backup/pre-cleanup/claude-weekly-audit-2026-05-19"]="942afc1f"
  ["backup/pre-cleanup/codex-ghost-portfolio-hero-pr"]="bb1fbe0a"
)
for tag in "${!tag_sha_map[@]}"; do
  expected="${tag_sha_map[$tag]}"
  actual=$(git rev-parse "$tag" 2>/dev/null | head -c8)
  if [ "$actual" != "$expected" ]; then
    echo "TAG TARGET MISMATCH: $tag aponta para $actual, esperado $expected — ABORTAR"
    exit 1
  fi
done

# Publicar tags de backup no remoto — obrigatório antes de qualquer push --delete
# Em clones efêmeros, tags locais são perdidas ao fim da sessão; tags remotas garantem recuperação
git push origin refs/tags/backup/pre-cleanup/codex-media-card-system
git push origin refs/tags/backup/pre-cleanup/audit-weekly-report
git push origin refs/tags/backup/pre-cleanup/chore-audit-report
git push origin refs/tags/backup/pre-cleanup/claude-weekly-audit-2026-05-19
git push origin refs/tags/backup/pre-cleanup/codex-ghost-portfolio-hero-pr
git push origin refs/tags/backup/pre-cleanup/codex-sobre-origin-a11y-fixes
git push origin refs/tags/backup/pre-cleanup/codex-weekly-cleanup
git push origin refs/tags/backup/pre-cleanup/docs-audit-beliefs-ghost-v3
git push origin refs/tags/backup/pre-cleanup/docs-ghost-design-updates
git push origin refs/tags/backup/pre-cleanup/fix-audit-remediation-phase1
git push origin refs/tags/backup/pre-cleanup/worktree-audit-fixes
git push origin refs/tags/backup/pre-cleanup/worktree-fix-06-que-me-move
git push origin refs/tags/backup/pre-cleanup/worktree-responsive-video-plan
```

### SHA Map Completo

| Branch | SHA | Tag de Backup | Restore Command |
|---|---|---|---|
| `codex/media-card-system` | `06104ba2` | `backup/pre-cleanup/codex-media-card-system` | `git branch codex/media-card-system 06104ba2` |
| `audit/weekly-report-4676327557888982331` | `af752857` | `backup/pre-cleanup/audit-weekly-report` | `git branch audit/weekly-report-4676327557888982331 af752857` |
| `chore-audit-report-12176814106024817247` | `632024b4` | `backup/pre-cleanup/chore-audit-report` | `git branch chore-audit-report-12176814106024817247 632024b4` |
| `claude/weekly-audit-report-2026-05-19` | `942afc1f` | `backup/pre-cleanup/claude-weekly-audit-2026-05-19` | `git branch claude/weekly-audit-report-2026-05-19 942afc1f` |
| `codex/ghost-portfolio-hero-pr` | `bb1fbe0a` | `backup/pre-cleanup/codex-ghost-portfolio-hero-pr` | `git branch codex/ghost-portfolio-hero-pr bb1fbe0a` |
| `codex/sobre-origin-a11y-fixes` | `e03f269d` | `backup/pre-cleanup/codex-sobre-origin-a11y-fixes` | `git branch codex/sobre-origin-a11y-fixes e03f269d` |
| `codex/weekly-cleanup` | `dcf8d0de` | `backup/pre-cleanup/codex-weekly-cleanup` | `git branch codex/weekly-cleanup dcf8d0de` |
| `docs/audit-beliefs-ghost-design-v3` | `2444b35b` | `backup/pre-cleanup/docs-audit-beliefs-ghost-v3` | `git branch docs/audit-beliefs-ghost-design-v3 2444b35b` |
| `docs/ghost-design-updates-12336613816235341544` | `c5c18920` | `backup/pre-cleanup/docs-ghost-design-updates` | `git branch docs/ghost-design-updates-12336613816235341544 c5c18920` |
| `fix/audit-remediation-phase1` | `2a7cc79f` | `backup/pre-cleanup/fix-audit-remediation-phase1` | `git branch fix/audit-remediation-phase1 2a7cc79f` |
| `worktree-audit-fixes` | `4f158abe` | `backup/pre-cleanup/worktree-audit-fixes` | `git branch worktree-audit-fixes 4f158abe` |
| `worktree-fix-06-que-me-move` | `561eec01` | `backup/pre-cleanup/worktree-fix-06-que-me-move` | `git branch worktree-fix-06-que-me-move 561eec01` |
| `worktree-responsive-video-plan` | `09aab7da` | `backup/pre-cleanup/worktree-responsive-video-plan` | `git branch worktree-responsive-video-plan 09aab7da` |

### Rollback via Reflog (fallback)

```bash
git reflog show --all | grep <branch-name>
git branch <branch-name> <sha-from-reflog>
git push origin <branch-name>        # restaurar remoto se necessário
git worktree add <path> <branch-name>  # restaurar worktree se necessário
```

---

## 9. Proposed Command Plan

### Fase 0 — Leitura (JÁ EXECUTADA, somente leitura, sem impacto)

Todos os comandos listados na seção 3 foram executados em modo read-only.

### Fase 1 — Inspeção Adicional — `unknown-risk` (somente leitura, pré-aprovação)

```bash
# Fetch com refspecs explícitos para garantir criação de remote-tracking refs (origin/<branch>)
# Sem isso, git log/diff com origin/<branch> pode ler refs stale ou falhar
git fetch origin \
  "claude/beautiful-rubin-MVYRs:refs/remotes/origin/claude/beautiful-rubin-MVYRs" \
  "claude/dazzling-euler-ZhWMf:refs/remotes/origin/claude/dazzling-euler-ZhWMf" \
  "danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s:refs/remotes/origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" \
  "codex/sobre-origin-a11y-fixes:refs/remotes/origin/codex/sobre-origin-a11y-fixes" \
  "fix/audit-remediation-phase1:refs/remotes/origin/fix/audit-remediation-phase1" \
  "worktree-fix-06-que-me-move:refs/remotes/origin/worktree-fix-06-que-me-move" \
  "docs/audit-beliefs-ghost-design-v3:refs/remotes/origin/docs/audit-beliefs-ghost-design-v3" \
  "worktree-audit-fixes:refs/remotes/origin/worktree-audit-fixes" \
  "worktree-responsive-video-plan:refs/remotes/origin/worktree-responsive-video-plan"

# Inspecionar diffs após fetch
git log --oneline main..origin/claude/beautiful-rubin-MVYRs
git log --oneline main..origin/claude/dazzling-euler-ZhWMf
git diff --stat main...origin/codex/sobre-origin-a11y-fixes
git diff --stat main...origin/fix/audit-remediation-phase1
git diff --stat main...origin/worktree-fix-06-que-me-move

# Re-verificar merge-base agora que objetos estão localmente presentes
# (diferencia exit 1 = not-ancestor de erro = objeto ausente)
for branch in claude/beautiful-rubin-MVYRs claude/dazzling-euler-ZhWMf \
  fix/audit-remediation-phase1 worktree-fix-06-que-me-move \
  docs/audit-beliefs-ghost-design-v3 worktree-audit-fixes worktree-responsive-video-plan; do
  sha=$(git rev-parse --verify "refs/remotes/origin/$branch" 2>/dev/null)
  if [ -z "$sha" ]; then
    echo "FETCH-FAILED: $branch"
  elif git merge-base --is-ancestor "$sha" main 2>/dev/null; then
    echo "MERGED: $branch ($sha)"
  else
    echo "NOT-MERGED: $branch ($sha)"
  fi
done

# Worktree prune dry-run
git worktree prune --dry-run
```

### Fase 2 — Backup (REQUIRES APPROVAL)

```bash
# 1. Fetch todas as branches candidatas a remoção ANTES do bundle
# git bundle --all só empacota refs presentes localmente; branches não fetchadas não são incluídas
git fetch origin \
  "audit/weekly-report-4676327557888982331:refs/remotes/origin/audit/weekly-report-4676327557888982331" \
  "chore-audit-report-12176814106024817247:refs/remotes/origin/chore-audit-report-12176814106024817247" \
  "claude/weekly-audit-report-2026-05-19:refs/remotes/origin/claude/weekly-audit-report-2026-05-19" \
  "codex/ghost-portfolio-hero-pr:refs/remotes/origin/codex/ghost-portfolio-hero-pr" \
  "codex/sobre-origin-a11y-fixes:refs/remotes/origin/codex/sobre-origin-a11y-fixes" \
  "codex/weekly-cleanup:refs/remotes/origin/codex/weekly-cleanup" \
  "docs/audit-beliefs-ghost-design-v3:refs/remotes/origin/docs/audit-beliefs-ghost-design-v3" \
  "docs/ghost-design-updates-12336613816235341544:refs/remotes/origin/docs/ghost-design-updates-12336613816235341544" \
  "fix/audit-remediation-phase1:refs/remotes/origin/fix/audit-remediation-phase1" \
  "worktree-audit-fixes:refs/remotes/origin/worktree-audit-fixes" \
  "worktree-fix-06-que-me-move:refs/remotes/origin/worktree-fix-06-que-me-move" \
  "worktree-responsive-video-plan:refs/remotes/origin/worktree-responsive-video-plan" \
  || { echo "ERROR: pre-bundle fetch falhou — verificar se branches ainda existem no remoto antes de prosseguir. ABORTAR."; exit 1; }

# 2. Criar bundle (agora inclui todos os objetos fetchados acima)
mkdir -p ../git-hygiene-backup
git bundle create ../git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all

# 3. Criar tags de backup conforme seção 8
```

### Fase 3 — Cleanup Local (REQUIRES APPROVAL)

```bash
# Limpar stale remote-tracking ref (seguro — não remove branch local)
git fetch --prune

# Prune de worktrees stale (executar dry-run primeiro — ver Fase 1)
git worktree prune  # somente se dry-run na Fase 1 mostrar entradas stale
```

### Fase 4 — Cleanup Remoto — Merged Only (REQUIRES APPROVAL)

```bash
# Verificar SHA remoto antes de deletar (evita remover commits adicionados pós-auditoria)
expected_sha="06104ba2"
actual_sha=$(git ls-remote origin refs/heads/codex/media-card-system | cut -f1 | head -c8)
if [ "$actual_sha" != "$expected_sha" ]; then
  echo "SHA MISMATCH: remoto=$actual_sha esperado=$expected_sha — ABORTAR e re-auditar antes de deletar"
  exit 1
fi
git push origin --delete codex/media-card-system
```

### Fase 5 — Cleanup Remoto — Archive Candidates (REQUIRES SEPARATE APPROVAL)

```bash
# LOTE SEGURO: audit reports e docs históricos — NOT-MERGED* confirmado, sem conteúdo funcional identificado
# Verificar SHA remoto vs auditado antes de cada delete; abortar se divergir (proteção contra commits pós-auditoria)
declare -A expected_shas=(
  ["audit/weekly-report-4676327557888982331"]="af752857"
  ["chore-audit-report-12176814106024817247"]="632024b4"
  ["claude/weekly-audit-report-2026-05-19"]="942afc1f"
  ["codex/ghost-portfolio-hero-pr"]="bb1fbe0a"
)
for branch in "${!expected_shas[@]}"; do
  expected="${expected_shas[$branch]}"
  actual=$(git ls-remote origin "refs/heads/$branch" | cut -f1 | head -c8)
  if [ "$actual" != "$expected" ]; then
    echo "SHA MISMATCH em $branch: remoto=$actual esperado=$expected — ABORTAR e re-auditar"
    exit 1
  fi
  git push origin --delete "$branch"
done

# NÃO INCLUIR NO LOTE — REQUEREM INSPEÇÃO INDIVIDUAL ANTES DE QUALQUER AÇÃO:
#   codex/sobre-origin-a11y-fixes       → commits de a11y/Ghost Design com valor funcional; diff obrigatório
#   codex/weekly-cleanup                → plano anterior classifica unknown-risk (alta contagem de commits); diff obrigatório
#   docs/audit-beliefs-ghost-design-v3  → unknown-ancestry†; plano anterior indica alta divergência; diff obrigatório
#   docs/ghost-design-updates-12336613816235341544  → unknown-ancestry†; inspecionar antes de qualquer ação
#   fix/audit-remediation-phase1        → unknown-ancestry†; conteúdo funcional (cache headers, TypeScript, assets); diff obrigatório
# Cada uma requer aprovação individual após inspeção explícita via `git diff main...origin/<branch>`.

# EXCLUÍDAS DESTA FASE — unknown-risk, requerem aprovação individual própria:
#   worktree-audit-fixes, worktree-fix-06-que-me-move, worktree-responsive-video-plan
```

### Fase 6 — Validação (após execuções aprovadas)

```bash
git status
git branch --all
git worktree list
pnpm run lint
pnpm run typecheck
pnpm run build
```

---

## 10. Risks and Mitigations

| Risco | Severidade | Mitigação |
|---|---|---|
| Grafted history: falso-negativo em `merge-base` para squash-merges antes do boundary | Alto | Tratar NOT-MERGED como `candidate-archive`, nunca como `candidate-delete` sem inspeção manual |
| `codex/sobre-origin-a11y-fixes` pode ter fixes a11y não integrados | Médio | Inspecionar diff antes de arquivar; cherry-pick se útil |
| `fix/audit-remediation-phase1` pode ter correções de segurança | Médio | Inspecionar conteúdo obrigatoriamente antes de qualquer ação |
| `claude/beautiful-rubin-MVYRs` e `claude/dazzling-euler-ZhWMf` — conteúdo desconhecido | Alto | Classificados `unknown-risk`; preservar até inspeção completa |
| `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` — branch de usuário | Alto | Nunca deletar sem confirmação explícita do dono (Danilo Novais) |
| PR #496 em `claude/weekly-audit-report-2026-06-16` aberto | Crítico | Branch preservada incondicionalmente até PR ser fechado ou mergeado |
| `main` protegida — force-push proibido | Crítico | Nunca executar `git push --force origin main` |
| `.gitmodules` com entrada duplicada `skills/superpower` | Baixo | Documentado; corrigir em issue separado; não impacta hygiene de branches |
| `fetch --prune` remove stale ref `origin/claude/dazzling-euler-mp4s71` | Baixo | Esperado e correto; branch local permanece intacta |
| Branch remota usada por Firebase Hosting preview channel | Médio | Verificar `.firebaserc` e `firebase.json` antes de deletar qualquer remoto |

---

## 11. Approval Gate

> **STOP HERE.**
>
> Nenhum comando destrutivo será executado até que o humano responda com **`Aprovado`** ou **`Proceed`** nesta conversa.
>
> A aprovação para cleanup **local e de worktrees** (Fases 2–3) não autoriza automaticamente o cleanup **remoto** (Fases 4–5). O cleanup remoto requer segunda aprovação explícita.
>
> Branches `unknown-risk` requerem inspeção manual (Fase 1) e aprovação individual antes de qualquer ação.
>
> Branches `candidate-archive` que contenham `sobre`, `a11y`, `fix`, `remediation` ou `security` requerem inspeção de diff antes de qualquer exclusão.

---

_Documento gerado em modo read-only. Nenhum arquivo de código foi alterado. Nenhuma branch foi criada, modificada ou excluída._

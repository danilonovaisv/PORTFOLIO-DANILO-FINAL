# Git Branch and Worktree Hygiene Plan

**Gerado em:** 2026-05-17  
**Projeto:** portfoliodanilo.com  
**Operador:** Claude (Staff Git Operations Engineer)  
**Status:** AGUARDANDO APROVAÇÃO HUMANA — nenhum comando destrutivo executado

---

## 1. Executive Summary

O repositório `danilonovaisv/PORTFOLIO-DANILO-FINAL` apresenta **acúmulo moderado de branches remotas** resultante de múltiplos ciclos de worktree, deploys via Firebase, agentes autônomos (Codex, Jules, Workspace) e sessões Claude. O estado local está limpo: 2 branches locais, 1 worktree, 0 PRs abertos.

**Objetivo:** Classificar os 13 branches remotos existentes, identificar candidatos a remoção segura com backup completo, e propor política de branch preventiva.

**Estratégia:** Read-only completo → classificação → aprovação humana → backup → execução.

**Risco principal:** Branches criados por agentes autônomos (Codex, Jules, Workspace) podem conter commits únicos não integrados ao `main`. Nenhum deles deve ser removido sem verificação de merge status via `git branch --merged`.

---

## 2. Repository Context

| Campo | Valor |
|---|---|
| Branch atual | `claude/dazzling-euler-4xD4T` |
| HEAD SHA | `76bbcc65` |
| Branch padrão | `main` |
| Remote | `origin` → `http://local_proxy@127.0.0.1:34629/git/danilonovaisv/PORTFOLIO-DANILO-FINAL` |
| GitHub repo | `danilonovaisv/PORTFOLIO-DANILO-FINAL` |
| Package manager | `pnpm` |
| Deploy target | Firebase Hosting (webframeworks experiment) |
| CI/CD | GitHub Actions (`.github/workflows/`) |
| Branches protegidas | `main` (marcado como padrão; `protected: false` na API mas tratado como protegido) |
| PRs abertos | **0** |
| Worktrees | **1** (apenas o principal, limpo) |
| Branches locais | 2 (`claude/dazzling-euler-4xD4T`, `main`) |
| Branches remotos (GitHub) | 13 |
| Remote tracking refs stale | 1 (`origin/claude/dazzling-euler-4xD4T` — branch deletado do remoto) |

**Observação crítica:** O remoto `main` está em `76bbcc65` (mesmo SHA do `claude/dazzling-euler-4xD4T`), mas o tracking ref local para `origin/main` ainda aponta para `6a6f0896`. Após `git fetch`, a divergência será resolvida automaticamente.

---

## 3. Read-Only Commands Executados

| Comando | Finalidade |
|---|---|
| `git status --short --branch` | Branch atual e estado da árvore |
| `git remote -v` | Remotes configurados |
| `git branch --all --verbose --verbose` | Inventário completo de branches + tracking |
| `git branch --merged` | Branches já integrados ao HEAD |
| `git branch --no-merged` | Branches com commits pendentes |
| `git worktree list --porcelain` | Inventário de worktrees em formato estável |
| `git for-each-ref --format='...'` | Metadados de cada ref (SHA, data, autor, upstream, track) |
| `git log --oneline --decorate --graph --all --max-count=80` | Topologia recente do grafo |
| `git fetch --all --prune --dry-run` | Simulação de fetch e prune sem execução |
| `mcp__github__list_pull_requests` (state: open) | PRs abertos no GitHub |
| `mcp__github__list_branches` | Branches existentes no GitHub + SHA + proteção |

---

## 4. Branch Inventory

### 4.1 Branches Locais

| Branch | Local/Remote | SHA | Last Commit | Author | Upstream | Track | PR Status | Merge Status (vs HEAD) | Classificação | Proposta |
|---|---|---|---|---|---|---|---|---|---|---|
| `claude/dazzling-euler-4xD4T` | Local + Remote tracking stale | `76bbcc65` | 2026-05-17 | danilonovaisv | nenhum | — | sem PR | **É o HEAD** | **active / current** | Preservar. Push ao remoto quando concluído. |
| `main` | Local | `6a6f0896` | 2026-05-15 | danilonovaisv | `origin/main` | stale (remoto em `76bbcc65`) | — | merged | **active** | Preservar. Atualizar via `git fetch`. |

### 4.2 Remote Tracking Refs (cache local)

| Ref | SHA | Status |
|---|---|---|
| `origin/claude/dazzling-euler-4xD4T` | `76bbcc65` | **STALE** — branch deletado do remoto. Será removido pelo próximo `git fetch --prune`. |
| `origin/main` | `6a6f0896` | Desatualizado. Remoto em `76bbcc65`. |

### 4.3 Branches Remotos (GitHub)

| Branch | SHA | Protected | Last Commit Visível no Log | Merge em main | Classificação | Evidência | Proposta |
|---|---|---|---|---|---|---|---|
| `main` | `76bbcc65` | Padrão | HEAD do repo | **É main** | **protected** | Branch padrão | Preservar permanentemente |
| `worktree-fix-06-que-me-move` | `561eec01` | false | `561eec01 chore: update build configuration` | **Mergeado** via PR #452 (visto no log: `ce0cf38f Merge pull request #452`) | **candidate-delete-remote** | PR #452 fechado, commit presente em main | Deletar remoto após backup |
| `worktree-fix-ghost-desktop-position` | `a541ddf9` | false | `63a54aa2`, `96d575fe` | **Mergeado** via PR #447 (visto no log: `c4f48eb2 Merge pull request #447`) | **candidate-delete-remote** | PR #447 fechado | Deletar remoto após backup |
| `worktree-spectral-r3f` | `7d27daef` | false | `bd019606`, `bc4c98e9` | **Mergeado** via commit `26c64f37 Merge worktree-spectral-r3f` no log | **candidate-delete-remote** | Merge commit presente | Deletar remoto após backup |
| `worktree-responsive-video-plan` | `2cebbd6f` | false | `bc78d9fc fix(video): responsive video src swap` | **Mergeado** via commit `7786c99c Merge branch 'worktree-responsive-video-plan'` no log | **candidate-delete-remote** | Merge commit presente | Deletar remoto após backup |
| `worktree-audit-fixes` | `4f158abe` | false | Não visível nos 80 commits do log | **Desconhecido** — SHA não encontrado no grafo local | **unknown-risk** | Sem evidência de merge | Preservar até verificação manual do SHA |
| `fix/audit-p1-p2` | `adbe068d` | false | `d3e8440e fix(audit): resolve P1/P2 issues` | **Mergeado** via PR #451 (visto no log: `c371fe61 Merge pull request #451`) | **candidate-delete-remote** | PR #451 fechado | Deletar remoto após backup |
| `fix/audit-remediation-phase1` | `2a7cc79f` | false | Não visível nos 80 commits | **Desconhecido** | **unknown-risk** | Sem evidência de merge | Preservar até verificação manual |
| `jules-ghost-system-audit-report-4882938480465184539` | `975934b0` | false | `975934b0 docs: generate Antigravity Ghost System Audit Report` | **Mergeado** via PR #453 (visto no log: `5af4e70c Merge pull request #453`) | **candidate-archive** | PR mergeado; branch de agente autônomo com valor histórico | Arquivar via tag antes de deletar |
| `docs/audit-beliefs-ghost-design-v3` | `2444b35b` | false | Não visível nos 80 commits | **Desconhecido** | **unknown-risk** | Sem evidência de merge | Preservar até verificação manual |
| `docs/sobre-page-technical-analysis-4751686432196136347` | `622c71a3` | false | Não visível nos 80 commits | **Desconhecido** | **unknown-risk** | Branch de análise auto-gerada; pode ter valor documental | Preservar até verificação manual |
| `codex/weekly-cleanup` | `dcf8d0de` | false | Não visível nos 80 commits | **Desconhecido** | **unknown-risk** | Branch de agente Codex; pode ter commits únicos | Preservar até verificação manual |
| `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` | `16aa5652` | false | Não visível nos 80 commits | **Desconhecido** | **unknown-risk** | Branch de Workspace; naming incomum | Preservar até verificação manual |

---

## 5. Worktree Inventory

| Worktree Path | Branch | SHA | Status | Locked | Clean/Dirty | Disk | Classificação | Proposta |
|---|---|---|---|---|---|---|---|---|
| `/home/user/PORTFOLIO-DANILO-FINAL` | `claude/dazzling-euler-4xD4T` | `76bbcc65` | Principal | Não | **Limpo** | Existe | **active** | Preservar permanentemente |

**Observação:** Nenhuma worktree órfã, bloqueada ou com arquivos não commitados detectada.

---

## 6. Risk Model

### Definições

| Classificação | Significado |
|---|---|
| `protected` | Branch padrão ou branch de deploy ativo. Nunca deletar. |
| `active` | Em uso atual. Preservar obrigatoriamente. |
| `candidate-merge` | Tem commits únicos com valor funcional. Merge antes de qualquer remoção. |
| `candidate-archive` | Mergeado, mas com valor histórico ou documental. Tag antes de deletar. |
| `candidate-delete-local` | Branch local sem upstream ativo, sem commits únicos. |
| `candidate-delete-remote` | Branch remoto mergeado, PR fechado, não protegido. |
| `orphaned-worktree` | Worktree cujo caminho não existe no disco. |
| `locked-worktree` | Worktree explicitamente bloqueada. Preservar até confirmação. |
| `unknown-risk` | Merge status não confirmado. Preservar obrigatoriamente. |

### Resumo de Classificação

| Classificação | Branches |
|---|---|
| `protected` | `main` |
| `active` | `claude/dazzling-euler-4xD4T`, `main` (local) |
| `candidate-delete-remote` | `worktree-fix-06-que-me-move`, `worktree-fix-ghost-desktop-position`, `worktree-spectral-r3f`, `worktree-responsive-video-plan`, `fix/audit-p1-p2` |
| `candidate-archive` | `jules-ghost-system-audit-report-4882938480465184539` |
| `unknown-risk` | `worktree-audit-fixes`, `fix/audit-remediation-phase1`, `docs/audit-beliefs-ghost-design-v3`, `docs/sobre-page-technical-analysis-4751686432196136347`, `codex/weekly-cleanup`, `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` |

---

## 7. Merge and Unification Strategy

### Branches sem ação necessária
- `main`: preservar, atualizar tracking com `git fetch`
- `claude/dazzling-euler-4xD4T`: branch de trabalho ativo, push ao final da sessão

### Branches candidatos a delete remoto (pós-backup)
Todos têm merge confirmado via PR ou merge commit visível no log:
- `worktree-fix-06-que-me-move` → deletar remoto
- `worktree-fix-ghost-desktop-position` → deletar remoto
- `worktree-spectral-r3f` → deletar remoto
- `worktree-responsive-video-plan` → deletar remoto
- `fix/audit-p1-p2` → deletar remoto

### Branch candidato a archive (pós-backup)
- `jules-ghost-system-audit-report-4882938480465184539` → criar tag `archive/jules-ghost-audit-2026` → deletar remoto

### Branches unknown-risk — nenhuma ação automática
Requerem verificação manual antes de qualquer decisão:
- `worktree-audit-fixes`: verificar `git log origin/worktree-audit-fixes ^main --oneline`
- `fix/audit-remediation-phase1`: idem
- `docs/audit-beliefs-ghost-design-v3`: idem
- `docs/sobre-page-technical-analysis-4751686432196136347`: idem
- `codex/weekly-cleanup`: idem
- `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s`: idem

---

## 8. Backup and Rollback Strategy

### Bundle completo (preferencial)
```bash
mkdir -p .git-hygiene-backup
git bundle create .git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all
```

### Tags de backup por branch (complementar)
```bash
git fetch --all
git tag archive/backup/worktree-fix-06-que-me-move        origin/worktree-fix-06-que-me-move
git tag archive/backup/worktree-fix-ghost-desktop-position origin/worktree-fix-ghost-desktop-position
git tag archive/backup/worktree-spectral-r3f               origin/worktree-spectral-r3f
git tag archive/backup/worktree-responsive-video-plan      origin/worktree-responsive-video-plan
git tag archive/backup/fix-audit-p1-p2                     origin/fix/audit-p1-p2
git tag archive/jules-ghost-audit-2026                     origin/jules-ghost-system-audit-report-4882938480465184539
git push origin --tags
```

### SHA Map

| Branch | SHA completo | Tag de Backup | Restore Command |
|---|---|---|---|
| `worktree-fix-06-que-me-move` | `561eec01b9af584a2fedff08b4f57fc454730f36` | `archive/backup/worktree-fix-06-que-me-move` | `git branch worktree-fix-06-que-me-move 561eec01` |
| `worktree-fix-ghost-desktop-position` | `a541ddf9f2f042de3f12b905a64cf0bf0a43e017` | `archive/backup/worktree-fix-ghost-desktop-position` | `git branch worktree-fix-ghost-desktop-position a541ddf9` |
| `worktree-spectral-r3f` | `7d27daef0600ba922966233ea139a53b53ee3837` | `archive/backup/worktree-spectral-r3f` | `git branch worktree-spectral-r3f 7d27daef` |
| `worktree-responsive-video-plan` | `2cebbd6fd92a8b465e4859c85f78be711bcf2a49` | `archive/backup/worktree-responsive-video-plan` | `git branch worktree-responsive-video-plan 2cebbd6f` |
| `fix/audit-p1-p2` | `adbe068dc5f2d536a84f3cc514731345a7a3ed66` | `archive/backup/fix-audit-p1-p2` | `git branch fix/audit-p1-p2 adbe068d` |
| `jules-ghost-system-audit-report-*` | `975934b0b81bb74951f468c0b14695cd42a356bb` | `archive/jules-ghost-audit-2026` | `git branch jules-audit 975934b0` |

### Rollback de emergency (reflog)
```bash
git reflog show --all | grep <branch-name>
git branch <nome-recuperado> <sha-do-reflog>
```

---

## 9. Proposed Command Plan

### Fase A: Read-Only (JÁ EXECUTADO)
```bash
git status --short --branch
git remote -v
git branch --all --verbose --verbose
git branch --merged
git branch --no-merged
git worktree list --porcelain
git for-each-ref --format='...'
git log --oneline --decorate --graph --all --max-count=80
git fetch --all --prune --dry-run
# GitHub MCP: list_pull_requests, list_branches
```

### Fase B: Verificação de unknown-risk (requer fetch, não destrutivo)
```bash
# REQUER APROVAÇÃO NÍVEL B (fetch é não-destrutivo, mas altera estado local)
git fetch --all
git log origin/worktree-audit-fixes ^main --oneline
git log origin/fix/audit-remediation-phase1 ^main --oneline
git log origin/docs/audit-beliefs-ghost-design-v3 ^main --oneline
git log "origin/docs/sobre-page-technical-analysis-4751686432196136347" ^main --oneline
git log origin/codex/weekly-cleanup ^main --oneline
git log "origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" ^main --oneline
```

### Fase C: Backup (REQUER APROVAÇÃO)
```bash
mkdir -p .git-hygiene-backup
git bundle create .git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all
git tag archive/backup/worktree-fix-06-que-me-move        origin/worktree-fix-06-que-me-move
git tag archive/backup/worktree-fix-ghost-desktop-position origin/worktree-fix-ghost-desktop-position
git tag archive/backup/worktree-spectral-r3f               origin/worktree-spectral-r3f
git tag archive/backup/worktree-responsive-video-plan      origin/worktree-responsive-video-plan
git tag archive/backup/fix-audit-p1-p2                     origin/fix/audit-p1-p2
git tag archive/jules-ghost-audit-2026                     origin/jules-ghost-system-audit-report-4882938480465184539
git push origin --tags
```

### Fase D: Remoção Local (REQUER APROVAÇÃO — sem urgência, estado limpo)
```bash
# Não há branches locais candidatos a remoção além dos já inexistentes.
# Após git fetch --prune, o tracking ref stale origin/claude/dazzling-euler-4xD4T será removido automaticamente.
```

### Fase E: Remoção Remota dos Confirmados ★ REQUER APROVAÇÃO EXPLÍCITA ★
```bash
git push origin --delete worktree-fix-06-que-me-move         # REQUIRES APPROVAL
git push origin --delete worktree-fix-ghost-desktop-position # REQUIRES APPROVAL
git push origin --delete worktree-spectral-r3f               # REQUIRES APPROVAL
git push origin --delete worktree-responsive-video-plan      # REQUIRES APPROVAL
git push origin --delete fix/audit-p1-p2                     # REQUIRES APPROVAL
git push origin --delete jules-ghost-system-audit-report-4882938480465184539  # REQUIRES APPROVAL (após tag criada)
```

### Fase F: Validação (pós-execução aprovada)
```bash
git status
git branch --all
git worktree list
git fetch --all --prune --dry-run
pnpm run lint
pnpm run typecheck
pnpm run build
```

---

## 10. Risks and Mitigations

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Branch `unknown-risk` contém commits únicos | Média | Classificados como `unknown-risk`; nenhuma ação proposta sem verificação |
| Branch agente autônomo (Codex, Jules) com lógica não mergeada | Média | Verificação obrigatória com `git log origin/<branch> ^main` |
| Remote prune remove tracking ref ativo | Baixa | Tracking ref de `claude/dazzling-euler-4xD4T` é stale (branch deletado do remoto); local branch intacto |
| Tag de arquivo sobrescreve tag existente | Baixa | Verificar com `git tag --list archive/*` antes de criar |
| `git push --delete` em branch de CI/CD | Baixa | Nenhuma das branches listadas aparece em `.github/workflows/` como trigger; verificar antes |
| Build quebrado após cleanup | Baixíssima | Branches remotas não afetam build local; validação pós-execução confirma |
| Branch `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` com plan ativo | Desconhecida | Classificado `unknown-risk`; verificar conteúdo antes de qualquer ação |

---

## 11. Approval Gate

> **STOP.**
>
> Este plano está completo e aguardando revisão humana.
>
> **Nenhum comando destrutivo será executado até que você responda com `Aprovado` ou `Proceed`.**
>
> Após aprovação, a execução seguirá exatamente o Command Plan da Fase B em diante, na sequência proposta, com relatório de cada etapa.
>
> Se quiser aprovar apenas algumas fases (ex: "Aprovar Fase B e C, aguardar Fase E"), especifique quais.

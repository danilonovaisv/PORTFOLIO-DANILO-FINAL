# Git Branch and Worktree Hygiene Plan

**Gerado em:** 2026-05-17 | **Atualizado em:** 2026-05-24  
**Projeto:** portfoliodanilo.com  
**Operador:** Claude (Staff Git Operations Engineer)  
**Status:** AGUARDANDO APROVAÇÃO HUMANA — nenhum comando destrutivo executado

> **Nota de revisão (2026-05-24):** Este documento foi re-auditado em nova sessão. O estado do repositório mudou significativamente desde 2026-05-17. Branches classificadas como `candidate-delete-remote` na auditoria anterior já foram removidas do remoto. 2 novos PRs abertos detectados (protegidos por definição). Inventário abaixo reflete o estado atual.

---

## 1. Executive Summary

O repositório `danilonovaisv/PORTFOLIO-DANILO-FINAL` apresenta **acúmulo moderado de branches remotas** resultante de múltiplos ciclos de worktree, deploys via Firebase, agentes autônomos (Codex, Jules, Workspace) e sessões Claude. O estado local está limpo: 2 branches locais, 1 worktree.

**Progresso desde 2026-05-17:** As branches `worktree-fix-ghost-desktop-position`, `worktree-spectral-r3f`, `fix/audit-p1-p2`, `jules-ghost-system-audit-report-*` e `docs/sobre-page-technical-analysis-*` foram removidas do remoto (cleanup parcial executado fora desta sessão). Novas branches surgiram: `codex/ghost-portfolio-hero-pr`, `codex/media-card-system`, `codex/sobre-origin-a11y-fixes` e outras.

**Estado atual (2026-05-24):** 2 branches locais, 13 branches remotas, 2 PRs abertos (#469 e #470), 1 worktree.

**Objetivo:** Re-classificar o estado atual, proteger os 2 PRs abertos, identificar candidatos a remoção segura com backup completo, e propor política de branch preventiva.

**Estratégia:** Read-only completo → classificação → aprovação humana → backup → execução.

**Risco principal identificado em 2026-05-24:** `git fetch --prune --dry-run` revelou que `origin/claude/dazzling-euler-ZhWMf` (tracking ref da branch de trabalho atual) seria removido por prune, pois a branch não existe no remoto GitHub. Nenhuma perda de commit (SHA = main), mas o upstream está ausente. Branches com PRs abertos (#469, #470) devem ser preservadas incondicionalmente.

---

## 2. Repository Context

### Estado anterior (2026-05-17)

| Campo | Valor |
|---|---|
| Branch anterior | `claude/dazzling-euler-4xD4T` |
| HEAD SHA anterior | `76bbcc65` |
| PRs abertos | 0 |

### Estado atual (2026-05-24)

| Campo | Valor |
|---|---|
| Branch atual | `claude/dazzling-euler-ZhWMf` |
| HEAD SHA | `3f91a224294b609e0f2334ee1707b6b6b573a1dd` |
| Branch padrão | `main` |
| Remote | `origin` → `http://local_proxy@127.0.0.1:42565/git/danilonovaisv/PORTFOLIO-DANILO-FINAL` |
| GitHub repo | `danilonovaisv/PORTFOLIO-DANILO-FINAL` |
| Package manager | `pnpm` |
| Node engine | `22` |
| Deploy target | Firebase Hosting (webframeworks experiment) |
| CI/CD | GitHub Actions (`.github/workflows/`) |
| Branches protegidas (API GitHub) | `main` (`protected: true` confirmado via API) |
| PRs abertos | **2** — #469 (`claude/weekly-audit-report-2026-05-19`), #470 (`audit/weekly-report-*`, draft) |
| Worktrees | **1** (principal, limpa, não bloqueada) |
| Branches locais | 2 (`claude/dazzling-euler-ZhWMf`, `main`) |
| Branches remotas (GitHub) | 13 |
| Remote tracking refs que seriam prunados | 1 (`origin/claude/dazzling-euler-ZhWMf` — não existe no GitHub remoto) |
| Submodule warnings | `.gitmodules` com entrada duplicada para `skills/superpower` |

**Observação crítica (2026-05-24):** `git fetch --prune --dry-run` mostra que `origin/claude/dazzling-euler-ZhWMf` seria deletado do tracking local pois não existe no GitHub. A branch local `claude/dazzling-euler-ZhWMf` está em SHA idêntico a `main` (3f91a22) — nenhum commit único em risco.

---

## 3. Read-Only Commands Executados

### Sessão 2026-05-17 (anterior)

| Comando | Finalidade |
|---|---|
| `git status --short --branch` | Branch atual e estado da árvore |
| `git remote -v` | Remotes configurados |
| `git branch --all --verbose --verbose` | Inventário completo de branches + tracking |
| `git branch --merged` / `--no-merged` | Status de merge |
| `git worktree list --porcelain` | Inventário de worktrees |
| `git for-each-ref --format='...'` | Metadados completos de cada ref |
| `git log --oneline --decorate --graph --all --max-count=80` | Topologia do grafo |
| `git fetch --all --prune --dry-run` | Simulação de prune |
| GitHub MCP: `list_pull_requests`, `list_branches` | Estado do repositório remoto |

### Sessão 2026-05-24 (atual)

| Comando | Finalidade | Resultado |
|---|---|---|
| `git status --short --branch` | Branch atual e estado | `claude/dazzling-euler-ZhWMf`, árvore limpa |
| `git remote -v` | Remotes | `origin` via proxy local |
| `git branch --all --verbose --verbose` | Inventário branches | 2 locais, 2 remote tracking |
| `git branch --merged` | Branches mergeados no HEAD | `claude/dazzling-euler-ZhWMf`, `main` |
| `git branch --no-merged` | Branches não mergeados | nenhum |
| `git worktree list --porcelain` | Worktrees | 1 principal, limpa |
| `git for-each-ref --format='...'` | Metadados de refs | SHA, datas, tracking status |
| `git log --oneline --decorate --graph --all --max-count=80` | Topologia recente | 80 commits exibidos; merge history visível |
| `git fetch --all --prune --dry-run` | Simulação de prune | 1 tracking a deletar (`origin/claude/dazzling-euler-ZhWMf`); 12 novos remote refs seriam adicionados |
| `mcp__github__list_pull_requests` (open) | PRs abertos | **2 PRs** — #469 e #470 |
| `mcp__github__list_branches` | Branches GitHub | 13 branches; `main` com `protected: true` |

---

## 4. Branch Inventory

### 4.1 Delta entre auditorias (2026-05-17 → 2026-05-24)

**Branches removidas desde a última auditoria (já não existem no remoto):**
- `worktree-fix-ghost-desktop-position` (era `candidate-delete-remote`) ✅
- `worktree-spectral-r3f` (era `candidate-delete-remote`) ✅
- `fix/audit-p1-p2` (era `candidate-delete-remote`) ✅
- `jules-ghost-system-audit-report-4882938480465184539` (era `candidate-archive`) ✅
- `docs/sobre-page-technical-analysis-4751686432196136347` (era `unknown-risk`) ✅

**Novas branches detectadas desde a última auditoria:**
- `audit/weekly-report-4676327557888982331` (PR #470 aberto — draft)
- `claude/weekly-audit-report-2026-05-19` (PR #469 aberto)
- `codex/ghost-portfolio-hero-pr`
- `codex/media-card-system`
- `codex/sobre-origin-a11y-fixes`

### 4.2 Branches Locais (estado atual 2026-05-24)

| Branch | Local/Remote | SHA | Last Commit | Author | Upstream | Track | PR Status | Merge Status (vs HEAD) | Classificação | Proposta |
|---|---|---|---|---|---|---|---|---|---|---|
| `claude/dazzling-euler-ZhWMf` | Local (tracking stale — remote não existe no GitHub) | `3f91a22` | 2026-05-24 | danilonovaisv | nenhum | — | sem PR | **É o HEAD; SHA = main** | **active / current** | Preservar; push ao remoto ao final da sessão |
| `main` | Local + Remote | `3f91a22` | 2026-05-24 | danilonovaisv | `origin/main` | up-to-date | — | merged | **active / protected** | Preservar permanentemente |

### 4.3 Remote Tracking Refs (cache local 2026-05-24)

| Ref | SHA | Status |
|---|---|---|
| `origin/claude/dazzling-euler-ZhWMf` | `3f91a22` | **Seria prunado** — branch não existe no GitHub. Detectado via `fetch --prune --dry-run`. Branch local intacto. |
| `origin/main` | `3f91a22` | Up-to-date |

### 4.4 Branches Remotas (GitHub — estado atual 2026-05-24)

| Branch | SHA | Protected | PR Status | Merge em main | Classificação | Evidência | Proposta |
|---|---|---|---|---|---|---|---|
| `main` | `3f91a22` | **SIM** | — | É main | **protected** | API GitHub `protected: true` | Preservar permanentemente |
| `audit/weekly-report-4676327557888982331` | `af752857` | Não | **PR #470 ABERTO (draft)** | Não determinado | **preserved-pr** | PR draft ativo (Jules/Google ADK) | NÃO TOCAR até PR fechado |
| `claude/weekly-audit-report-2026-05-19` | `942afc1f` | Não | **PR #469 ABERTO** | Não determinado | **preserved-pr** | PR aberto com auditoria semanal do portfolio | NÃO TOCAR até PR mergeado ou fechado |
| `codex/ghost-portfolio-hero-pr` | `bb1fbe0a` | Não | sem PR aberto | Provável (PR #482 no log) | **candidate-archive** | Trabalho de Ghost Hero; PR #482 "fix: add final ghost hero files" mergeado; SHA `bb1fbe0` não confirmado diretamente | Investigar SHA em main → archive via tag → delete remoto |
| `codex/media-card-system` | `06104ba` | Não | sem PR aberto | **CONFIRMADO** — SHA `06104ba` visível no log de main como `feat: add typed media card system` | **candidate-delete-remote** | SHA presente no log do main | Backup via tag → delete remoto |
| `codex/sobre-origin-a11y-fixes` | `e03f269` | Não | sem PR aberto | Não confirmado | **unknown-risk** | Nome sugere a11y fixes em `/sobre`; SHA não encontrado no log visível | Investigar commits únicos antes de qualquer ação |
| `codex/weekly-cleanup` | `dcf8d0de` | Não | sem PR aberto | Não confirmado | **unknown-risk** | Presente desde auditoria anterior sem resolução; SHA sem evidência no log | Investigar; preservar se dúvida |
| `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` | `16aa5652` | Não | sem PR aberto | Não confirmado | **unknown-risk** | Namespace de e-mail; branch de Jules Workspace; SHA não confirmado | Investigar; preservar se dúvida |
| `docs/audit-beliefs-ghost-design-v3` | `2444b35b` | Não | sem PR aberto | Não confirmado | **candidate-archive** | Documentação histórica do Ghost Design System v3; valor documental alto | Archive via tag → avaliar deleção |
| `fix/audit-remediation-phase1` | `2a7cc79f` | Não | sem PR aberto | Não confirmado | **unknown-risk** | Fase 1 de remediação pós-auditoria; pode ter código funcional | Investigar commits únicos |
| `worktree-audit-fixes` | `4f158abe` | Não | sem PR aberto | Não confirmado | **unknown-risk** | Presente desde auditoria anterior; SHA sem evidência no log | Investigar antes de qualquer ação |
| `worktree-fix-06-que-me-move` | `561eec01` | Não | sem PR aberto | Provável (SHA presente no log anterior como `chore: update build configuration`) | **candidate-archive** | SHA `561eec01` visível em commits anteriores; nome sugere fix em seção "que me move" | Archive via tag → delete remoto |
| `worktree-responsive-video-plan` | `09aab7da` | Não | sem PR aberto | Provável (commit `718f795` sobre responsive video em main) | **candidate-archive** | Trabalho de responsive video; possível integração parcial em main | Investigar overlap → archive → delete |

### 4.5 Resumo de Classificação (2026-05-24)

| Classificação | Branches | Ação |
|---|---|---|
| `protected` | `main` | Nunca tocar |
| `active` | `claude/dazzling-euler-ZhWMf` (local), `main` (local) | Preservar |
| `preserved-pr` | `audit/weekly-report-*`, `claude/weekly-audit-report-2026-05-19` | NÃO TOCAR |
| `candidate-delete-remote` | `codex/media-card-system` | Backup → delete remoto |
| `candidate-archive` | `codex/ghost-portfolio-hero-pr`, `docs/audit-beliefs-ghost-design-v3`, `worktree-fix-06-que-me-move`, `worktree-responsive-video-plan` | Archive via tag → delete |
| `unknown-risk` | `codex/sobre-origin-a11y-fixes`, `codex/weekly-cleanup`, `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s`, `fix/audit-remediation-phase1`, `worktree-audit-fixes` | Investigar → preservar se dúvida |

---

## 5. Worktree Inventory

| Worktree Path | Branch | SHA | Status | Locked | Clean/Dirty | Disk | Classificação | Proposta |
|---|---|---|---|---|---|---|---|---|
| `/home/user/PORTFOLIO-DANILO-FINAL` | `claude/dazzling-euler-ZhWMf` | `3f91a22` | Principal | Não | **Limpo** | Existe | **active** | Preservar permanentemente |

**Observação (2026-05-24):** Nenhuma worktree órfã, bloqueada ou com arquivos não commitados detectada. `git worktree prune --dry-run` não foi executado (requer aprovação); nenhum candidato óbvio a prune dado que há apenas 1 worktree.

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

### Resumo de Classificação (atualizado 2026-05-24)

Ver Seção 4.5 acima.

**Adições ao Risk Model para 2026-05-24:**

| Classificação | Significado |
|---|---|
| `preserved-pr` | Branch com PR aberto. Qualquer ação proibida até PR fechado ou mergeado. |

| Risco adicional identificado | Descrição |
|---|---|
| `.gitmodules` com entrada duplicada | `skills/superpower` aparece duplicado; pode causar falha silenciosa em `git submodule update` |
| Upstream ausente em branch ativa | `claude/dazzling-euler-ZhWMf` não tem upstream configurado; `git push` sem args falhará |

---

## 7. Merge and Unification Strategy

### Branches sem ação necessária (2026-05-24)
- `main`: protegido, não tocar
- `claude/dazzling-euler-ZhWMf`: branch de trabalho ativo, push ao final da sessão
- `audit/weekly-report-4676327557888982331`: PR #470 aberto — preservar até fechamento
- `claude/weekly-audit-report-2026-05-19`: PR #469 aberto — preservar até fechamento

### Branches candidatos a delete remoto (pós-backup e confirmação)
- `codex/media-card-system` → SHA `06104ba` confirmado em main → delete remoto após backup

### Branches candidatos a archive (pós-investigação)
- `codex/ghost-portfolio-hero-pr` → investigar SHA em main; se confirmado → tag `archive/codex/ghost-portfolio-hero-pr` → delete
- `docs/audit-beliefs-ghost-design-v3` → documentação histórica valiosa → tag `archive/docs/ghost-design-v3` → delete
- `worktree-fix-06-que-me-move` → SHA `561eec01` provavelmente em main → tag → delete
- `worktree-responsive-video-plan` → verificar SHA `09aab7da` contra main → tag → delete

### Branches unknown-risk — nenhuma ação automática
Requerem investigação de commits únicos (pós-fetch) antes de qualquer decisão:
```bash
git fetch --all
git log origin/codex/sobre-origin-a11y-fixes ^main --oneline
git log origin/codex/weekly-cleanup ^main --oneline
git log "origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" ^main --oneline
git log origin/fix/audit-remediation-phase1 ^main --oneline
git log origin/worktree-audit-fixes ^main --oneline
```
Regra: se output vazio → candidato a delete/archive; se output não-vazio → escalar para humano.

---

## 8. Backup and Rollback Strategy

### Bundle completo (opção preferencial)
```bash
mkdir -p docs/git-hygiene/backups
git bundle create docs/git-hygiene/backups/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all
```

### Tags de arquivo por branch (complementar — executar após fetch)
```bash
git fetch --all
# Candidatos a delete (confirmados ou archive)
git tag archive/codex/media-card-system          origin/codex/media-card-system
git tag archive/codex/ghost-portfolio-hero-pr    origin/codex/ghost-portfolio-hero-pr
git tag archive/docs/ghost-design-v3             origin/docs/audit-beliefs-ghost-design-v3
git tag archive/worktree-fix-06-que-me-move      origin/worktree-fix-06-que-me-move
git tag archive/worktree-responsive-video-plan   origin/worktree-responsive-video-plan
git push origin --tags
```

### SHA Map (atualizado 2026-05-24)

| Branch | SHA completo | Tag de Arquivo | Restore Command |
|---|---|---|---|
| `codex/media-card-system` | `06104ba2b92a755a7dd841d59fa8cfbf37f60cb4` | `archive/codex/media-card-system` | `git branch codex/media-card-system 06104ba` |
| `codex/ghost-portfolio-hero-pr` | `bb1fbe0a2f211b3deef142be2287a0744a6b139f` | `archive/codex/ghost-portfolio-hero-pr` | `git branch codex/ghost-portfolio-hero-pr bb1fbe0a` |
| `docs/audit-beliefs-ghost-design-v3` | `2444b35be4bc5d9809fcdc1ec9f46e62b455a328` | `archive/docs/ghost-design-v3` | `git branch docs/audit-beliefs-ghost-design-v3 2444b35b` |
| `worktree-fix-06-que-me-move` | `561eec01b9af584a2fedff08b4f57fc454730f36` | `archive/worktree-fix-06-que-me-move` | `git branch worktree-fix-06-que-me-move 561eec01` |
| `worktree-responsive-video-plan` | `09aab7da9f81910ced8e50d8c29cc03055f3aad3` | `archive/worktree-responsive-video-plan` | `git branch worktree-responsive-video-plan 09aab7da` |
| `codex/sobre-origin-a11y-fixes` | `e03f269df443e6d1bde3812573468e8057cbebcd` | (não arquivar antes de investigação) | `git branch codex/sobre-origin-a11y-fixes e03f269` |
| `codex/weekly-cleanup` | `dcf8d0de3490dc2995ee4b3aa0b5d222bab8a4c0` | (não arquivar antes de investigação) | `git branch codex/weekly-cleanup dcf8d0de` |
| `danilo-novais-yahoo-com-br/WKSP-1-*` | `16aa5652d71702ceb0477c0d6f595954f81e5d49` | (não arquivar antes de investigação) | `git branch danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s 16aa5652` |
| `fix/audit-remediation-phase1` | `2a7cc79f6198863092eaeb8593828cce12ec0174` | (não arquivar antes de investigação) | `git branch fix/audit-remediation-phase1 2a7cc79f` |
| `worktree-audit-fixes` | `4f158abeee42fc056e85b67e01c71fdc6e296981` | (não arquivar antes de investigação) | `git branch worktree-audit-fixes 4f158abe` |
| `audit/weekly-report-*` | `af752857b90684e3a6bbe0c9b3fd6b5ffdbc9baa` | **NÃO ARQUIVAR** (PR #470 aberto) | N/A |
| `claude/weekly-audit-report-2026-05-19` | `942afc1fc19734b8238dd7198b546f2ef51b2be8` | **NÃO ARQUIVAR** (PR #469 aberto) | N/A |

### Rollback geral
```bash
# Via tag de arquivo
git branch <nome-da-branch> archive/<tag>
git push origin <nome-da-branch>

# Via bundle
git bundle verify docs/git-hygiene/backups/pre-cleanup-<timestamp>.bundle
git fetch docs/git-hygiene/backups/pre-cleanup-<timestamp>.bundle <branch>:<branch-local>

# Via reflog (janela de 30 dias)
git reflog show --all | grep <sha>
git branch <nome-recuperado> <sha>
```

---

## 9. Proposed Command Plan (2026-05-24)

### Fase A: Read-Only — JÁ EXECUTADO (2026-05-24)
```bash
git status --short --branch
git remote -v
git branch --all --verbose --verbose
git branch --merged / --no-merged
git worktree list --porcelain
git for-each-ref --format='...'
git log --oneline --decorate --graph --all --max-count=80
git fetch --all --prune --dry-run
# GitHub MCP: list_pull_requests (open), list_branches
```

### Fase B: Fetch e investigação de unknown-risk (não destrutivo)
```bash
# fetch sem --prune: não altera branches, apenas atualiza tracking refs
git fetch --all

# Verificar commits únicos das branches unknown-risk
git log origin/codex/sobre-origin-a11y-fixes ^main --oneline
git log origin/codex/weekly-cleanup ^main --oneline
git log "origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" ^main --oneline
git log origin/fix/audit-remediation-phase1 ^main --oneline
git log origin/worktree-audit-fixes ^main --oneline
git log origin/codex/ghost-portfolio-hero-pr ^main --oneline
git log origin/worktree-fix-06-que-me-move ^main --oneline
git log origin/worktree-responsive-video-plan ^main --oneline
```

### Fase C: Backup [REQUIRES APPROVAL]
```bash
mkdir -p docs/git-hygiene/backups
git bundle create docs/git-hygiene/backups/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all
# Tags de arquivo para candidatos confirmados
git tag archive/codex/media-card-system          origin/codex/media-card-system
git tag archive/codex/ghost-portfolio-hero-pr    origin/codex/ghost-portfolio-hero-pr
git tag archive/docs/ghost-design-v3             origin/docs/audit-beliefs-ghost-design-v3
git tag archive/worktree-fix-06-que-me-move      origin/worktree-fix-06-que-me-move
git tag archive/worktree-responsive-video-plan   origin/worktree-responsive-video-plan
git push origin --tags
```

### Fase D: Remoção local [NÃO APLICÁVEL — estado local já é mínimo]
```bash
# Não há branches locais candidatos a deleção.
# A branch ativa claude/dazzling-euler-ZhWMf é a HEAD — preservar.
# O tracking ref stale será removido automaticamente com git fetch --prune (fase E ou posterior).
```

### Fase E: Remoção remota — somente candidatos confirmados [REQUIRES APPROVAL + APROVAÇÃO SEPARADA PARA REMOTO]
```bash
git push origin --delete codex/media-card-system            # REQUIRES APPROVAL (SHA confirmado em main)
# As seguintes APENAS após investigação Fase B confirmar integração:
# git push origin --delete codex/ghost-portfolio-hero-pr    # REQUIRES APPROVAL
# git push origin --delete docs/audit-beliefs-ghost-design-v3 # REQUIRES APPROVAL
# git push origin --delete worktree-fix-06-que-me-move      # REQUIRES APPROVAL
# git push origin --delete worktree-responsive-video-plan   # REQUIRES APPROVAL
```

### Fase F: Worktree cleanup [NÃO APLICÁVEL]
```bash
# Apenas 1 worktree, limpa, não bloqueada. Nenhuma ação necessária.
git worktree prune --dry-run  # validação pós-cleanup
```

### Fase G: Validação [REQUIRES APPROVAL]
```bash
git status
git branch --all
git worktree list
git fetch --all --prune --dry-run
pnpm run lint
pnpm run typecheck
pnpm run build
# pnpm test (se disponível)
```

---

## 10. Risks and Mitigations (atualizado 2026-05-24)

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Branch `unknown-risk` contém commits únicos não integrados | Média | Alto | Fase B de investigação obrigatória; regra: output não-vazio → escalar para humano |
| PRs abertos (#469, #470) afetados por cleanup | Baixa | Crítico | Classificação `preserved-pr` bloqueia qualquer ação nessas branches |
| Branch de agente autônomo (Codex, Jules, Workspace) com commits únicos | Média | Médio | Verificação via `git log origin/<branch> ^main --oneline` antes de qualquer ação |
| `git fetch --prune` remove tracking de `claude/dazzling-euler-ZhWMf` | Confirmado (dry-run) | Baixo | SHA = main; nenhuma perda de dado; worktree local intacta |
| Tag de arquivo sobrescreve tag existente | Baixa | Baixo | Verificar `git tag --list archive/*` antes de criar |
| `git push --delete` em branch usada por CI/CD ou preview | Baixa | Alto | Verificar `.github/workflows/` e `firebase.json` antes do cleanup remoto |
| Build quebrado após cleanup | Baixíssima | Médio | Branches remotas não afetam build local; validação Fase G confirma |
| `.gitmodules` duplicado causa falha em submodule update | Baixa | Médio | Registrado como defeito separado; não bloqueia este plano, mas deve ser corrigido independentemente |
| Branch `danilo-novais-yahoo-com-br/WKSP-1-*` com workspace Jules ativo | Desconhecida | Médio | Classificado `unknown-risk`; nenhuma ação sem investigação e confirmação humana |
| `codex/sobre-origin-a11y-fixes` contém fixes de acessibilidade não integrados | Média | Médio | Investigar: se tiver commits únicos em `/sobre`, escalar para merge antes de archive |

---

## 11. Approval Gate

> **STOP.**
>
> Este plano está completo e aguardando revisão humana.
>
> **Nenhum comando destrutivo será executado até que você responda com `Aprovado` ou `Proceed`.**
>
> Após aprovação, a execução seguirá exatamente o Command Plan das Fases B–G, na sequência proposta, com relatório de cada etapa.
>
> Se quiser aprovar apenas algumas fases (ex: "Aprovar Fase B e C, aguardar Fase E"), especifique quais.
>
> **Para aprovação granular de remoção remota, a Fase E requer uma confirmação separada específica.**

---

*Documento atualizado em 2026-05-24. Estado anterior preservado para referência histórica. Nenhuma alteração destrutiva foi realizada.*

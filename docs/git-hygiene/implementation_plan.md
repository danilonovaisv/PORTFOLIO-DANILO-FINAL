# Git Branch and Worktree Hygiene Plan

**Gerado em:** 2026-06-07  
**Revisão anterior:** 2026-05-24 (PR #487 — `claude/dazzling-euler-ZhWMf`)  
**Projeto:** portfoliodanilo.com  
**Operador:** Claude (Staff Git Operations Engineer)  
**Status:** AGUARDANDO APROVAÇÃO HUMANA — nenhum comando destrutivo executado

---

## 1. Executive Summary

O repositório `danilonovaisv/PORTFOLIO-DANILO-FINAL` apresenta **acúmulo moderado de branches remotas** proveniente de múltiplos agentes autônomos (Codex, Jules, Workspace) e sessões Claude em ciclos semanais de auditoria. Em relação à última auditoria (2026-05-17):

- **5 branches foram removidos** do remoto (confirma execução parcial bem-sucedida dos ciclos anteriores)
- **8 novas branches** apareceram, sendo 5 com PRs abertos (draft) e 3 sem PR
- **5 PRs draft abertos** exigem preservação obrigatória das branches correspondentes
- **1 branch mudou de SHA** (`worktree-responsive-video-plan`): reclassificada de `candidate-delete-remote` para `unknown-risk`
- `main` agora retorna `protected: true` via GitHub API (melhoria em relação à auditoria anterior)

**Objetivo:** Classificar os 16 branches remotos atuais, identificar candidatos a remoção segura com backup completo, e propor execução em fases com aprovação separada para remoção remota.

**Estratégia:** Read-only completo (já executado) → classificação → aprovação humana → backup → execução.

**Risco principal:** 5 PRs draft abertos protegem 5 branches que não podem ser tocadas. Além disso, `worktree-responsive-video-plan` recebeu novos commits desde a última auditoria e não pode ser removida sem verificação de merge status.

---

## 2. Repository Context

| Campo | Valor |
|---|---|
| Branch atual | `claude/dazzling-euler-q4KbP` |
| HEAD SHA | `940e0a69` |
| Branch padrão | `main` |
| Remote | `origin` → `https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL` |
| GitHub repo | `danilonovaisv/PORTFOLIO-DANILO-FINAL` |
| Package manager | `pnpm` |
| Deploy target | Firebase Hosting (webframeworks experiment) |
| CI/CD | GitHub Actions (`.github/workflows/`) |
| Branches protegidas (API) | `main` (`protected: true`) |
| PRs abertos | **5** (todos draft, exceto PR #469) |
| Worktrees | **1** (apenas o principal, limpo, não bloqueado) |
| Branches locais | 2 (`claude/dazzling-euler-q4KbP`, `main`) |
| Branches remotos (GitHub) | 16 |
| Remote tracking refs stale | 1 (`origin/claude/dazzling-euler-q4KbP` — seria removida por `fetch --prune`) |
| Warning `.gitmodules` | Duplicate entries em `submodule.skills/superpower` (pré-existente, não bloqueante) |

**Diferença em relação à última auditoria (2026-05-17):**

| Evento | Branches |
|---|---|
| Removidas desde a última auditoria | `worktree-fix-ghost-desktop-position`, `worktree-spectral-r3f`, `fix/audit-p1-p2`, `jules-ghost-system-audit-report-*`, `docs/sobre-page-technical-analysis-*` |
| Adicionadas desde a última auditoria | `audit/weekly-report-*` (PR #470), `chore-audit-report-*` (PR #488), `claude/beautiful-rubin-MVYRs` (PR #489), `claude/dazzling-euler-ZhWMf` (PR #487), `claude/weekly-audit-report-2026-05-19` (PR #469), `codex/ghost-portfolio-hero-pr`, `codex/media-card-system`, `codex/sobre-origin-a11y-fixes` |
| SHA alterado (mesma branch) | `worktree-responsive-video-plan` (`2cebbd6f` → `09aab7da`) |

---

## 3. Read-Only Commands Executados

| Comando | Finalidade |
|---|---|
| `git status --short --branch` | Branch atual e estado da árvore |
| `git remote -v` | Remotes configurados |
| `git branch --all --verbose --verbose` | Inventário completo de branches + tracking |
| `git branch --merged` | Branches já integrados ao HEAD |
| `git branch --no-merged` | Branches com commits pendentes |
| `git worktree list --porcelain` | Inventário de worktrees em formato estável para parsing |
| `git for-each-ref --format='...'` | Metadados de cada ref (SHA, data, autor, upstream, track) |
| `git log --oneline --decorate --graph --all --max-count=40` | Topologia recente do grafo |
| `git fetch --all --prune --dry-run` | Simulação de fetch e prune (sem execução) |
| `git worktree prune --dry-run` | Simulação de prune de worktrees (sem execução) |
| `mcp__github__list_pull_requests` (state: open) | PRs abertos no GitHub |
| `mcp__github__list_branches` | Branches existentes no GitHub + SHA + proteção |

---

## 4. Branch Inventory

### 4.1 Branches Locais

| Branch | Local/Remote | SHA | Last Commit | Upstream | Track | PR | Merge vs HEAD | Classificação | Proposta |
|---|---|---|---|---|---|---|---|---|---|
| `claude/dazzling-euler-q4KbP` | Local + tracking stale | `940e0a69` | 2026-06-03 | nenhum | — | Nenhum | **É o HEAD** | **active / current** | Preservar. Push ao remoto ao concluir sessão. |
| `main` | Local | `940e0a69` | 2026-06-03 | `origin/main` | em dia | — | merged | **active / protected** | Preservar permanentemente. |

### 4.2 Remote Tracking Refs (cache local)

| Ref | SHA | Status |
|---|---|---|
| `origin/claude/dazzling-euler-q4KbP` | `940e0a69` | **STALE** — branch não existe no remoto. Removida automaticamente pelo próximo `git fetch --prune`. Branch local permanece intacta. |
| `origin/main` | `940e0a69` | Em dia. |

### 4.3 Branches Remotos (GitHub)

| Branch | SHA | Protected | PR | PR Status | Merge em main | Classificação | Evidência | Proposta |
|---|---|---|---|---|---|---|---|---|
| `main` | `940e0a69` | **true** | — | — | É main | **protected** | Branch padrão, protected via API | Preservar permanentemente |
| `claude/beautiful-rubin-MVYRs` | `ac6526c0` | false | #489 | **Open draft** | Desconhecido | **preserved-pr** | PR #489 aberto (audit docs, somente documentação) | Não tocar enquanto PR aberto |
| `chore-audit-report-12176814106024817247` | `632024b4` | false | #488 | **Open draft** | Desconhecido | **preserved-pr** | PR #488 aberto (Jules, audit cleanup report) | Não tocar enquanto PR aberto |
| `claude/dazzling-euler-ZhWMf` | `762cf697` | false | #487 | **Open draft** | Desconhecido | **preserved-pr** | PR #487 aberto (re-audit git hygiene docs 2026-05-24) | Não tocar enquanto PR aberto |
| `audit/weekly-report-4676327557888982331` | `af752857` | false | #470 | **Open draft** | Desconhecido | **preserved-pr** | PR #470 aberto (Jules, weekly report docs) | Não tocar enquanto PR aberto |
| `claude/weekly-audit-report-2026-05-19` | `942afc1f` | false | #469 | **Open** (não draft) | Desconhecido | **preserved-pr** | PR #469 aberto (weekly audit docs 2026-05-19) | Não tocar enquanto PR aberto |
| `codex/ghost-portfolio-hero-pr` | `bb1fbe0a` | false | Nenhum | — | Desconhecido (não visível no log local) | **candidate-archive** | Branch Codex com trabalho no hero ghost; valor histórico | Verificar commits únicos; arquivar via tag antes de deletar |
| `codex/media-card-system` | `06104ba2` | false | Nenhum | — | Desconhecido | **candidate-archive** | Branch Codex, media card system; pode ter commits úteis | Verificar commits únicos; arquivar via tag antes de deletar |
| `codex/sobre-origin-a11y-fixes` | `e03f269d` | false | Nenhum | — | Desconhecido | **candidate-archive** | Branch Codex, correções a11y página /sobre; pode ter commits úteis | Verificar commits únicos; arquivar via tag antes de deletar |
| `worktree-fix-06-que-me-move` | `561eec01` | false | Nenhum | — | **Mergeado** via PR #452 (visível no log da auditoria anterior) | **candidate-delete-remote** | SHA idêntico à auditoria anterior; PR #452 fechado; sem commits únicos conhecidos | Backup via tag → deletar remoto após aprovação |
| `worktree-responsive-video-plan` | `09aab7da` | false | Nenhum | — | **Desconhecido** — SHA mudou de `2cebbd6f` para `09aab7da` desde a auditoria anterior | **unknown-risk** | Branch recebeu novos commits desde 2026-05-17; não confirmado como mergeado | Verificar com `git log origin/worktree-responsive-video-plan ^main --oneline` |
| `worktree-audit-fixes` | `4f158abe` | false | Nenhum | — | Desconhecido | **unknown-risk** | SHA não visível no grafo local; status de merge não confirmado | Verificar com `git log origin/worktree-audit-fixes ^main --oneline` |
| `fix/audit-remediation-phase1` | `2a7cc79f` | false | Nenhum | — | Desconhecido | **unknown-risk** | Branch de remediação de auditoria; commits não verificados | Verificar com `git log origin/fix/audit-remediation-phase1 ^main --oneline` |
| `docs/audit-beliefs-ghost-design-v3` | `2444b35b` | false | Nenhum | — | Desconhecido | **unknown-risk** | Branch de documentação Ghost Design v3; valor histórico potencial | Verificar com `git log origin/docs/audit-beliefs-ghost-design-v3 ^main --oneline` |
| `codex/weekly-cleanup` | `dcf8d0de` | false | Nenhum | — | Desconhecido | **unknown-risk** | Branch de cleanup automatizado; SHA não visível no log | Verificar com `git log origin/codex/weekly-cleanup ^main --oneline` |
| `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` | `16aa5652` | false | Nenhum | — | Desconhecido | **unknown-risk** | Branch de Workspace com naming incomum; pode conter plano ativo | Verificar com `git log "origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" ^main --oneline` |

---

## 5. Worktree Inventory

| Worktree Path | Branch | SHA | Status | Locked | Clean/Dirty | Disk | Classificação | Proposta |
|---|---|---|---|---|---|---|---|---|
| `/home/user/PORTFOLIO-DANILO-FINAL` | `claude/dazzling-euler-q4KbP` | `940e0a69` | Principal | Não | **Limpo** | Existe | **active** | Preservar permanentemente |

**Observação:** Nenhuma worktree órfã, bloqueada ou com arquivos não commitados detectada. `git worktree prune --dry-run` retornou vazio (nada a remover).

---

## 6. Risk Model

### Definições

| Classificação | Significado |
|---|---|
| `protected` | Branch padrão confirmada por API. Nunca deletar. |
| `active` | Em uso atual (local ou sessão). Preservar obrigatoriamente. |
| `preserved-pr` | Branch vinculada a PR aberto. Proibido deletar enquanto PR existir. |
| `candidate-merge` | Tem commits únicos com valor funcional. Merge antes de qualquer remoção. |
| `candidate-archive` | Sem PR, mas com valor histórico ou funcional potencial. Tag antes de deletar. |
| `candidate-delete-remote` | Branch remota mergeada, PR fechado, não protegida. Candidata a remoção pós-backup. |
| `orphaned-worktree` | Worktree cujo caminho não existe no disco. |
| `locked-worktree` | Worktree explicitamente bloqueada. Preservar até confirmação explícita. |
| `unknown-risk` | Merge status não confirmado ou SHA alterado. Preservar obrigatoriamente até verificação. |

### Resumo de Classificação Atual

| Classificação | Branches |
|---|---|
| `protected` | `main` |
| `active` | `claude/dazzling-euler-q4KbP` (local, current), `main` (local) |
| `preserved-pr` | `claude/beautiful-rubin-MVYRs` (#489), `chore-audit-report-12176814106024817247` (#488), `claude/dazzling-euler-ZhWMf` (#487), `audit/weekly-report-4676327557888982331` (#470), `claude/weekly-audit-report-2026-05-19` (#469) |
| `candidate-delete-remote` | `worktree-fix-06-que-me-move` |
| `candidate-archive` | `codex/ghost-portfolio-hero-pr`, `codex/media-card-system`, `codex/sobre-origin-a11y-fixes` |
| `unknown-risk` | `worktree-responsive-video-plan` (SHA alterado), `worktree-audit-fixes`, `fix/audit-remediation-phase1`, `docs/audit-beliefs-ghost-design-v3`, `codex/weekly-cleanup`, `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` |

---

## 7. Merge and Unification Strategy

### Branches sem ação necessária (preservar)
- `main`: protegida por API; tracking local em dia
- `claude/dazzling-euler-q4KbP`: branch ativa da sessão; push ao final

### Branches preserved-pr — aguardar decisão do PR
Nenhuma ação de código ou git pode ser tomada enquanto os PRs estiverem abertos. Ações possíveis:
- Fechar/rejeitar PR → reclassificar para `candidate-archive` ou `candidate-delete-remote`
- Mergear PR → reclassificar para `candidate-delete-remote`

### Branch candidate-delete-remote (pós-backup aprovado)
- `worktree-fix-06-que-me-move`: merge confirmado via PR #452 (log do audit anterior). SHA inalterado desde 2026-05-17. Seguro para remoção após backup de tag.

### Branches candidate-archive — verificação de commits únicos obrigatória
Antes de arquivar via tag e deletar, confirmar com:
```bash
git fetch --all
git log origin/codex/ghost-portfolio-hero-pr ^main --oneline
git log origin/codex/media-card-system ^main --oneline
git log origin/codex/sobre-origin-a11y-fixes ^main --oneline
```
Se saída vazia → `candidate-delete-remote`. Se não vazia → escalar para humano para decisão de merge.

### Branches unknown-risk — nenhuma ação automática
Requerem verificação com `git log origin/<branch> ^main --oneline` antes de qualquer decisão:
- `worktree-responsive-video-plan`: SHA mudou; verificação obrigatória
- `worktree-audit-fixes`, `fix/audit-remediation-phase1`, `docs/audit-beliefs-ghost-design-v3`, `codex/weekly-cleanup`, `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s`

---

## 8. Backup and Rollback Strategy

### Bundle completo (preferencial — executar antes de qualquer delete)
```bash
mkdir -p .git-hygiene-backup
git bundle create .git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all
```

### Tags de backup por branch candidata a remoção
```bash
git fetch --all
git tag archive/backup/worktree-fix-06-que-me-move origin/worktree-fix-06-que-me-move
git push origin archive/backup/worktree-fix-06-que-me-move
```

Tags adicionais (pós-verificação de candidate-archive):
```bash
git tag archive/codex/ghost-portfolio-hero-pr origin/codex/ghost-portfolio-hero-pr
git tag archive/codex/media-card-system        origin/codex/media-card-system
git tag archive/codex/sobre-origin-a11y-fixes  origin/codex/sobre-origin-a11y-fixes
# Push apenas as tags de arquivo criadas acima (não --tags, que publicaria todas as tags locais):
git push origin \
  archive/backup/worktree-fix-06-que-me-move \
  archive/codex/ghost-portfolio-hero-pr \
  archive/codex/media-card-system \
  archive/codex/sobre-origin-a11y-fixes
```

### SHA Map

| Branch | SHA Completo | Tag de Backup | Restore Command |
|---|---|---|---|
| `worktree-fix-06-que-me-move` | `561eec01b9af584a2fedff08b4f57fc454730f36` | `archive/backup/worktree-fix-06-que-me-move` | `git branch worktree-fix-06-que-me-move 561eec01 && git push origin worktree-fix-06-que-me-move` |
| `worktree-responsive-video-plan` | `09aab7da9f81910ced8e50d8c29cc03055f3aad3` | (pendente verificação) | `git branch worktree-responsive-video-plan 09aab7da` |
| `worktree-audit-fixes` | `4f158abeee42fc056e85b67e01c71fdc6e296981` | (pendente verificação) | `git branch worktree-audit-fixes 4f158abe` |
| `fix/audit-remediation-phase1` | `2a7cc79f6198863092eaeb8593828cce12ec0174` | (pendente verificação) | `git branch fix/audit-remediation-phase1 2a7cc79f` |
| `docs/audit-beliefs-ghost-design-v3` | `2444b35be4bc5d9809fcdc1ec9f46e62b455a328` | (pendente verificação) | `git branch docs/audit-beliefs-ghost-design-v3 2444b35b` |
| `codex/ghost-portfolio-hero-pr` | `bb1fbe0a2f211b3deef142be2287a0744a6b139f` | `archive/codex/ghost-portfolio-hero-pr` | `git branch codex/ghost-portfolio-hero-pr bb1fbe0a && git push origin codex/ghost-portfolio-hero-pr` |
| `codex/media-card-system` | `06104ba2b92a755a7dd841d59fa8cfbf37f60cb4` | `archive/codex/media-card-system` | `git branch codex/media-card-system 06104ba2 && git push origin codex/media-card-system` |
| `codex/sobre-origin-a11y-fixes` | `e03f269df443e6d1bde3812573468e8057cbebcd` | `archive/codex/sobre-origin-a11y-fixes` | `git branch codex/sobre-origin-a11y-fixes e03f269d && git push origin codex/sobre-origin-a11y-fixes` |
| `codex/weekly-cleanup` | `dcf8d0de3490dc2995ee4b3aa0b5d222bab8a4c0` | (pendente verificação) | `git branch codex/weekly-cleanup dcf8d0de` |
| `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` | `16aa5652d71702ceb0477c0d6f595954f81e5d49` | (pendente verificação) | `git branch danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s 16aa5652` |

### Rollback de emergência (reflog)
```bash
git reflog show --all | grep <nome-da-branch>
git branch <nome-recuperado> <sha-do-reflog>
```

---

## 9. Proposed Command Plan

### Fase A: Read-Only (JÁ EXECUTADO — sem aprovação necessária)
```bash
git status --short --branch
git remote -v
git branch --all --verbose --verbose
git branch --merged
git branch --no-merged
git worktree list --porcelain
git for-each-ref --format='...'
git log --oneline --decorate --graph --all --max-count=40
git fetch --all --prune --dry-run
git worktree prune --dry-run
# GitHub MCP: list_pull_requests, list_branches
```

### Fase B: Verificação de unknown-risk e candidate-archive (REQUER APROVAÇÃO — fetch altera estado local)
```bash
git fetch --all --prune                                                              # REQUIRES APPROVAL — remove tracking refs stale (ex: origin/claude/dazzling-euler-q4KbP)
git log origin/worktree-responsive-video-plan ^main --oneline                        # REQUIRES APPROVAL
git log origin/worktree-audit-fixes ^main --oneline                                  # REQUIRES APPROVAL
git log origin/fix/audit-remediation-phase1 ^main --oneline                          # REQUIRES APPROVAL
git log origin/docs/audit-beliefs-ghost-design-v3 ^main --oneline                    # REQUIRES APPROVAL
git log origin/codex/weekly-cleanup ^main --oneline                                  # REQUIRES APPROVAL
git log "origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" ^main --oneline  # REQUIRES APPROVAL
git log origin/codex/ghost-portfolio-hero-pr ^main --oneline                         # REQUIRES APPROVAL
git log origin/codex/media-card-system ^main --oneline                               # REQUIRES APPROVAL
git log origin/codex/sobre-origin-a11y-fixes ^main --oneline                         # REQUIRES APPROVAL
```

### Fase C: Backup (REQUER APROVAÇÃO)
```bash
mkdir -p .git-hygiene-backup                                                          # REQUIRES APPROVAL
git bundle create .git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all  # REQUIRES APPROVAL
git tag archive/backup/worktree-fix-06-que-me-move origin/worktree-fix-06-que-me-move  # REQUIRES APPROVAL
# Tags adicionais para candidate-archive (pós-Fase B):
git tag archive/codex/ghost-portfolio-hero-pr origin/codex/ghost-portfolio-hero-pr    # REQUIRES APPROVAL
git tag archive/codex/media-card-system        origin/codex/media-card-system          # REQUIRES APPROVAL
git tag archive/codex/sobre-origin-a11y-fixes  origin/codex/sobre-origin-a11y-fixes    # REQUIRES APPROVAL
# Push apenas as tags de backup criadas acima (não git push --tags, que publicaria todas as tags locais):
git push origin \
  archive/backup/worktree-fix-06-que-me-move \
  archive/codex/ghost-portfolio-hero-pr \
  archive/codex/media-card-system \
  archive/codex/sobre-origin-a11y-fixes                                                # REQUIRES APPROVAL
```

### Fase D: Remoção Local (sem urgência — estado local já é mínimo)
```bash
# Nenhum branch local candidato a remoção.
# O tracking ref stale origin/claude/dazzling-euler-q4KbP é removido pelo git fetch --all --prune
# já executado na Fase B. Branch local claude/dazzling-euler-q4KbP permanece intacta.
# Nenhum comando adicional necessário nesta fase.
```

### Fase E: Remoção Remota dos Confirmados ★ REQUER APROVAÇÃO EXPLÍCITA E SEPARADA ★
```bash
git push origin --delete worktree-fix-06-que-me-move      # REQUIRES APPROVAL
# Após Fase B confirmar merge status de candidate-archive:
git push origin --delete codex/ghost-portfolio-hero-pr     # REQUIRES APPROVAL (pós-verificação)
git push origin --delete codex/media-card-system           # REQUIRES APPROVAL (pós-verificação)
git push origin --delete codex/sobre-origin-a11y-fixes     # REQUIRES APPROVAL (pós-verificação)
```

### Fase F: Validação (pós-execução aprovada)
```bash
# Após a Fase E deletar branches remotas, os tracking refs origin/<branch> ainda existem
# até que um prune real seja executado. Executar antes do dry-run para zerá-los:
git fetch --all --prune                                                                # Limpa tracking refs dos branches deletados na Fase E
git status
git branch --all
git worktree list
git fetch --all --prune --dry-run                                                     # Deve reportar 0 refs a remover após o prune acima
pnpm run lint
pnpm run typecheck
pnpm run build
```

---

## 10. Risks and Mitigations

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Branch `preserved-pr` deletada enquanto PR aberto | Baixa (regra explícita) | Alto | 5 branches marcadas; proibição absoluta até PR fechado/mergeado |
| `worktree-responsive-video-plan` tem commits únicos (SHA mudou) | Média | Médio | Reclassificada para `unknown-risk`; verificação obrigatória com `git log ... ^main` |
| Branch unknown-risk contém feature não mergeada | Média | Alto | Verificação obrigatória na Fase B antes de qualquer ação |
| Remote prune remove tracking ref de branch ativa | Baixa | Médio | `origin/claude/dazzling-euler-q4KbP` é stale do remoto; branch local permanece intacta |
| Tag de arquivo sobrescreve tag existente | Baixa | Baixo | Verificar com `git tag --list archive/*` antes de criar |
| `git push --delete` em branch de CI/CD | Baixa | Alto | Nenhuma das branches candidatas aparece em `.github/workflows/` como trigger explícito |
| Build quebrado após cleanup | Muito baixa | Médio | Branches remotas não afetam build local; validação pós-execução (Fase F) confirma |
| Warning `.gitmodules` duplicado escala para erro | Baixa | Médio | Warning pré-existente e não bloqueante; não relacionado ao cleanup de branches |
| PR draft mergeado sem fechar branch | Média | Baixo | Após merge de qualquer PR listado, reclassificar branch correspondente antes do próximo ciclo |

---

## 11. Approval Gate

> **STOP.**
>
> Este plano está completo e aguardando revisão humana.
>
> **Nenhum comando destrutivo será executado até que você responda com `Aprovado` ou `Proceed`.**
>
> **Aprovação mínima sugerida para esta sessão:**
> - Fase B: verificação de unknown-risk e candidate-archive (não destrutivo, mas altera estado local com `git fetch`)
> - Fase C: backup completo (bundle + tags)
>
> **Aprovação separada requerida:**
> - Fase E: remoção remota (deletar branches do GitHub)
>
> Se quiser aprovar apenas fases específicas (ex: "Aprovar Fase B e C, aguardar Fase E"), especifique quais.

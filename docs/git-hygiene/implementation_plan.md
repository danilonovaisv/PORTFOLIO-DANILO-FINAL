# Git Branch and Worktree Hygiene Plan

**Gerado em:** 2026-06-14  
**Revisão anterior:** 2026-06-07 (PR #494 — `claude/dazzling-euler-mwbicc`)  
**Projeto:** portfoliodanilo.com  
**Operador:** Claude (Staff Git Operations Engineer)  
**Status:** AGUARDANDO APROVAÇÃO HUMANA — nenhum comando destrutivo executado

---

## 1. Executive Summary

O repositório `danilonovaisv/PORTFOLIO-DANILO-FINAL` passou por **mudanças significativas de estado** desde a auditoria de 2026-06-07:

- **PR #494 mergeado** (`claude/dazzling-euler-mwbicc` → `main`): `main` avançou 7 commits
- **5 PRs draft/open fechados** (#469, #470, #487, #488, #489): as 5 branches que eram `preserved-pr` agora são candidatas a classificação
- **1 PR novo aberto** (#493, `claude/weekly-audit-report-2026-06-09`): preservação obrigatória
- **1 branch nova** apareceu: `codex/media-card-system` (0 commits únicos — mergeada)
- **17 branches remotas** presentes (vs 16 na auditoria anterior)
- **Branches `unknown-risk` permanecem** sem verificação de diff completo

**Objetivo:** Reclassificar as 5 ex-`preserved-pr`, executar diff nas `unknown-risk`, e propor execução faseada com gate de aprovação humana.

**Risco principal:** As branches com 900–1428 commits únicos têm alta divergência histórica — o número reflete o fork point antigo, não o volume real de mudanças exclusivas. Nenhuma pode ser removida sem `git diff --stat` para medir o delta real de código.

---

## 2. Repository Context

| Campo | Valor |
|---|---|
| Branch atual | `claude/dazzling-euler-mwbicc` |
| HEAD SHA | `8ee5ce62` |
| Branch padrão | `main` |
| Remote | `origin` → `danilonovaisv/PORTFOLIO-DANILO-FINAL` (via proxy local) |
| Package manager | `pnpm` |
| Deploy target | Firebase Hosting (webframeworks experiment) |
| CI/CD | GitHub Actions (`.github/workflows/`) |
| Branches protegidas (API) | `main` (`protected: true`) |
| PRs abertos | **1** (PR #493 — `claude/weekly-audit-report-2026-06-09`) |
| Worktrees | **1** (principal, limpa, não bloqueada) |
| Branches locais | 2 (`claude/dazzling-euler-mwbicc`, `main`) |
| Branches remotas (GitHub) | 17 |
| Remote tracking ref deletada | `origin/claude/dazzling-euler-mwbicc` (removida após PR #494 merge) |
| Warning `.gitmodules` | Duplicate entries em `submodule.skills/superpower` (pré-existente, não bloqueante) |

**Diff em relação à auditoria de 2026-06-07:**

| Evento | Branches |
|---|---|
| Mergeadas em `main` | `claude/dazzling-euler-mwbicc` (PR #494) |
| PRs fechados (liberam branches para reclassificação) | #469 (`claude/weekly-audit-report-2026-05-19`), #470 (`audit/weekly-report-*`), #487 (`claude/dazzling-euler-ZhWMf`), #488 (`chore-audit-report-*`), #489 (`claude/beautiful-rubin-MVYRs`) |
| PRs abertos (impõem preservação obrigatória) | #493 (`claude/weekly-audit-report-2026-06-09`) |
| Novas branches detectadas | `claude/weekly-audit-report-2026-06-09` |
| SHA alterado | `main`: `940e0a69` → `8ee5ce62` |

---

## 3. Read-Only Commands Executados (esta sessão)

| Comando | Finalidade |
|---|---|
| `git status --short --branch` | Branch atual e estado da árvore |
| `git remote -v` | Remotes configurados |
| `git branch --all --verbose --verbose` | Inventário completo de branches + tracking |
| `git branch --merged` e `--no-merged` | Status de merge vs HEAD |
| `git worktree list --porcelain` | Inventário de worktrees (formato estável para parsing) |
| `git for-each-ref --format='...'` | Metadados: SHA, data, autor, upstream, track |
| `git log --oneline --decorate --graph --all --max-count=40` | Topologia recente |
| `git fetch --all --prune --dry-run` | Simulação: detectou remote deletado e 16 branches novas |
| `git fetch --all` | Sync de tracking refs (não destrutivo) |
| `git rev-list --count origin/main..<branch>` | Contagem de commits únicos por branch |
| `git log --oneline <branch> --not origin/main` | Preview de commits únicos em branches de risco |
| GitHub MCP `list_pull_requests` (open) | 1 PR aberto confirmado (#493) |
| GitHub MCP `list_branches` | 17 branches + proteção confirmada |

---

## 4. Branch Inventory

### 4.1 Branches Locais

| Branch | Local/Remote | SHA | Upstream | Ahead/Behind | PR | Merge Status | Classificação | Proposta |
|---|---|---|---|---|---|---|---|---|
| `claude/dazzling-euler-mwbicc` | Local (remote deletado) | `8ee5ce62` | nenhum | — | #494 MERGED | Mergeada em `main`; SHA = HEAD de `main` | `candidate-delete-local` | Após switch para `main`: `git branch -d claude/dazzling-euler-mwbicc` |
| `main` | Local | `940e0a69` | `origin/main` | **behind 7** | — | — | `active / protected` | `git pull origin main` para atualizar |

### 4.2 Remote Tracking Ref Stale

| Ref | Status | Ação |
|---|---|---|
| `origin/claude/dazzling-euler-mwbicc` | Deletada do remoto após PR #494 merge | Removida automaticamente pelo próximo `git fetch --prune` |

### 4.3 Branches Remotas (GitHub)

| Branch | SHA | Commits Únicos vs `main` | Protected | PR | PR Status | Classificação | Evidência | Proposta |
|---|---|---|---|---|---|---|---|---|
| `main` | `8ee5ce62` | — | **true** | — | — | `protected` | Branch padrão, GitHub protection ativo | Nenhuma — intocável |
| `claude/weekly-audit-report-2026-06-09` | `57a2fe1c` | 9 | false | **#493** | **OPEN** | `preserved-pr` | PR aberto; auditoria P0/P1/P2 pendente de revisão | Nenhuma enquanto PR aberto |
| `fix/audit-remediation-phase1` | `2a7cc79f` | 1141 | false | — | fechado | `unknown-risk` | Commits funcionais: cache headers, TS, asset cleanup, metadata | Diff obrigatório antes de qualquer ação |
| `worktree-audit-fixes` | `4f158abe` | 1268 | false | — | fechado | `unknown-risk` | Commits: RLS rules, audit fixes, superpower plugin, TypeScript | Diff obrigatório antes de qualquer ação |
| `worktree-fix-06-que-me-move` | `561eec01` | 1278 | false | — | fechado | `unknown-risk` | ⚠️ Reclassificado: 1278 commits únicos vs main atual (auditoria anterior marcou como "merged PR #452" mas SHA de `main` avançou desde então) | Diff obrigatório antes de qualquer ação |
| `worktree-responsive-video-plan` | `09aab7da` | 1403 | false | — | fechado | `unknown-risk` | SHA mudou desde auditoria 2026-05-17; merge de `main` recente na branch | Diff obrigatório antes de qualquer ação |
| `codex/sobre-origin-a11y-fixes` | `e03f269d` | 1382 | false | — | fechado | `unknown-risk` | a11y fixes + consolidação design system; commits reais | Diff obrigatório antes de qualquer ação |
| `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` | `16aa5652` | 1123 | false | — | fechado | `unknown-risk` | motion lazy loading, beliefs WebGL fallback, Tailwind fix | Diff obrigatório antes de qualquer ação |
| `docs/audit-beliefs-ghost-design-v3` | `2444b35b` | 948 | false | — | fechado | `unknown-risk` | Branch de docs com valor histórico potencial; alta divergência | Diff para decidir entre archive e delete |
| `codex/weekly-cleanup` | `dcf8d0de` | 1197 | false | — | fechado | `unknown-risk` | Cleanup automatizado; commits não verificados individualmente | Diff para decidir entre archive e delete |
| `audit/weekly-report-4676327557888982331` | `af752857` | 1423 | false | — | #470 CLOSED | `candidate-archive` | Ex-`preserved-pr`; PR #470 fechado; relatório de auditoria automatizado (Jules) | Bundle + tag; deletar após aprovação |
| `claude/weekly-audit-report-2026-05-19` | `942afc1f` | 1428 | false | — | #469 CLOSED | `candidate-archive` | Ex-`preserved-pr`; PR #469 fechado; relatório semanal de maio (superado pelo #493) | Bundle + tag; deletar após aprovação |
| `claude/dazzling-euler-ZhWMf` | `762cf697` | 1 | false | — | #487 CLOSED | `candidate-archive` | Ex-`preserved-pr`; 1 commit único; branch de agente similar à atual | Tag; deletar após aprovação |
| `claude/beautiful-rubin-MVYRs` | `ac6526c0` | 1 | false | — | #489 CLOSED | `candidate-archive` | Ex-`preserved-pr`; 1 commit único; audit docs apenas | Tag; deletar após aprovação |
| `codex/ghost-portfolio-hero-pr` | `bb1fbe0a` | 1 | false | — | — | `candidate-archive` | 1 commit: "docs: restore ghost hero pr traceability"; docs only | Tag; deletar após aprovação |
| `codex/media-card-system` | `06104ba2` | **0** | false | — | — | `candidate-delete-remote` | **Zero commits únicos — completamente integrado em `main`** | Backup de tag → delete remoto |
| `chore-audit-report-12176814106024817247` | `632024b4` | 1 | false | — | #488 CLOSED | `candidate-delete-remote` | Ex-`preserved-pr`; 1 chore commit com UUID; PR fechado | Backup de tag → delete remoto |

---

## 5. Worktree Inventory

| Worktree Path | Branch | SHA | Status | Locked | Clean/Dirty | Disk | Classificação | Proposta |
|---|---|---|---|---|---|---|---|---|
| `/home/user/PORTFOLIO-DANILO-FINAL` | `claude/dazzling-euler-mwbicc` | `8ee5ce62` | Principal | Não | **LIMPA** | ✅ | `active` | Nenhuma — intocável. Branch será deletada localmente após switch. |

**Conclusão worktrees:** Sem worktrees órfãs. Sem worktrees bloqueadas. Sem worktrees com arquivos não commitados. `git worktree prune --dry-run` retornaria vazio — nenhuma ação necessária.

---

## 6. Risk Model

### Definições

| Classificação | Significado |
|---|---|
| `protected` | Branch padrão + GitHub protection. Nunca deletar. |
| `active` | Em uso atual na worktree. Preservar obrigatoriamente. |
| `preserved-pr` | Branch com PR aberto. Proibido deletar até PR fechado ou mergeado. |
| `candidate-delete-local` | Branch local mergeada, sem remote ativo. |
| `candidate-delete-remote` | Branch remota com zero commits únicos OU chore descartável com PR fechado. |
| `candidate-archive` | Branch com valor histórico ou de auditoria; exige tag antes de delete. |
| `unknown-risk` | Commits únicos funcionais confirmados mas não verificados individualmente. Requer diff antes de qualquer ação. |

### Resumo de Classificação Atual

| Classificação | Branches |
|---|---|
| `protected` | `main` (remote) |
| `active` | `claude/dazzling-euler-mwbicc` (local, current), `main` (local) |
| `preserved-pr` | `claude/weekly-audit-report-2026-06-09` (#493 aberto) |
| `candidate-delete-local` | `claude/dazzling-euler-mwbicc` (pós-switch) |
| `candidate-delete-remote` | `codex/media-card-system` (0 commits), `chore-audit-report-12176814106024817247` (#488 closed) |
| `candidate-archive` | `audit/weekly-report-4676327557888982331`, `claude/weekly-audit-report-2026-05-19`, `claude/dazzling-euler-ZhWMf`, `claude/beautiful-rubin-MVYRs`, `codex/ghost-portfolio-hero-pr` |
| `unknown-risk` | `fix/audit-remediation-phase1`, `worktree-audit-fixes`, `worktree-fix-06-que-me-move`, `worktree-responsive-video-plan`, `codex/sobre-origin-a11y-fixes`, `danilo-novais-yahoo-com-br/WKSP-1-*`, `docs/audit-beliefs-ghost-design-v3`, `codex/weekly-cleanup` |

### ⚠️ Nota sobre contagens altas de commits únicos

Contagens de 900–1428 commits únicos indicam **divergência histórica** — a branch foi criada de um fork point antigo e nunca rebascada sobre `main` atual. Isso não significa 1000+ mudanças exclusivas no código. Para medir o delta real, usar `git diff origin/main...<branch> --stat`. Sem esse diff, essas branches permanecem `unknown-risk` independentemente da contagem.

### ⚠️ Reclassificação de `worktree-fix-06-que-me-move`

Na auditoria de 2026-06-07, esta branch era `candidate-delete-remote` pois o SHA da auditoria anterior indicava que PR #452 havia sido mergeado. Porém, `git rev-list` desta sessão conta **1278 commits únicos** contra o `main` atual. Isso ocorre porque `main` avançou desde PR #452 e a divergência histórica da branch tornou a contagem imprecisa como indicador de merge. **Reclassificada para `unknown-risk`** até diff confirmar o estado real.

---

## 7. Merge and Unification Strategy

### Branches sem ação necessária
- `main` (remote, protected): intocável
- `main` (local): `git pull origin main` para atualizar
- `claude/weekly-audit-report-2026-06-09`: aguardar resolução do PR #493

### Branches candidate-delete-remote — remoção simples após backup
- `codex/media-card-system`: zero delta
- `chore-audit-report-12176814106024817247`: 1 chore commit, PR fechado

### Branches candidate-archive — tag obrigatória antes de delete
Para cada uma das 5 branches:
```bash
git tag archive/<branch-name>/<sha> <sha>
```
Depois `git push origin --delete <branch>` após aprovação separada.

### Branches unknown-risk — análise obrigatória antes de qualquer decisão

Executar para cada branch (sem destruição), nesta sequência:
```bash
git remote update
git log origin/<branch> ^origin/main --oneline
git merge-base origin/<branch> origin/main
git diff origin/main...origin/<branch> --stat
```

Se o diff mostrar apenas arquivos de docs/audit sem mudanças de código: reclassificar para `candidate-archive`.  
Se o diff mostrar mudanças em `src/`, `public/`, `.github/`, `supabase/` ou `functions/`: escalar ao humano para decisão de cherry-pick ou merge.

---

## 8. Backup and Rollback Strategy

### Bundle completo (preferencial — executar ANTES de qualquer delete)
```bash
mkdir -p .git-hygiene-backup
git bundle create .git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all
```

### SHA Map Completo

| Branch | SHA Completo | Tag de Backup | Restore Command |
|---|---|---|---|
| `claude/dazzling-euler-mwbicc` | `8ee5ce62e22065428687a8c6402273ff3125cb72` | `backup/pre-cleanup/dazzling-euler-mwbicc` | `git branch claude/dazzling-euler-mwbicc 8ee5ce62` |
| `audit/weekly-report-4676327557888982331` | `af752857b90684e3a6bbe0c9b3fd6b5ffdbc9baa` | `archive/audit/weekly-report/af752857` | `git branch audit/weekly-report-4676327557888982331 af752857 && git push origin audit/weekly-report-4676327557888982331` |
| `claude/beautiful-rubin-MVYRs` | `ac6526c0c049fd8160e504c174f435d3fb9dd5b1` | `archive/claude/beautiful-rubin-MVYRs/ac6526c0` | `git branch claude/beautiful-rubin-MVYRs ac6526c0 && git push origin claude/beautiful-rubin-MVYRs` |
| `claude/dazzling-euler-ZhWMf` | `762cf69719d83da848f6da31a68ffd98bea65cd3` | `archive/claude/dazzling-euler-ZhWMf/762cf697` | `git branch claude/dazzling-euler-ZhWMf 762cf697 && git push origin claude/dazzling-euler-ZhWMf` |
| `claude/weekly-audit-report-2026-05-19` | `942afc1fc19734b8238dd7198b546f2ef51b2be8` | `archive/claude/weekly-audit-2026-05-19/942afc1f` | `git branch claude/weekly-audit-report-2026-05-19 942afc1f && git push origin claude/weekly-audit-report-2026-05-19` |
| `codex/ghost-portfolio-hero-pr` | `bb1fbe0a2f211b3deef142be2287a0744a6b139f` | `archive/codex/ghost-portfolio-hero-pr/bb1fbe0a` | `git branch codex/ghost-portfolio-hero-pr bb1fbe0a && git push origin codex/ghost-portfolio-hero-pr` |
| `codex/media-card-system` | `06104ba2b92a755a7dd841d59fa8cfbf37f60cb4` | `backup/codex/media-card-system/06104ba2` | `git branch codex/media-card-system 06104ba2 && git push origin codex/media-card-system` |
| `chore-audit-report-12176814106024817247` | `632024b4ce8a248378417705231dda77e9b50389` | `backup/chore-audit-report/632024b4` | `git branch chore-audit-report-12176814106024817247 632024b4 && git push origin chore-audit-report-12176814106024817247` |
| `fix/audit-remediation-phase1` | `2a7cc79f6198863092eaeb8593828cce12ec0174` | `backup/fix/audit-remediation-phase1/2a7cc79f` | `git branch fix/audit-remediation-phase1 2a7cc79f` |
| `worktree-audit-fixes` | `4f158abeee42fc056e85b67e01c71fdc6e296981` | `backup/worktree-audit-fixes/4f158abe` | `git branch worktree-audit-fixes 4f158abe` |
| `worktree-fix-06-que-me-move` | `561eec01b9af584a2fedff08b4f57fc454730f36` | `backup/worktree-fix-06-que-me-move/561eec01` | `git branch worktree-fix-06-que-me-move 561eec01` |
| `worktree-responsive-video-plan` | `09aab7da9f81910ced8e50d8c29cc03055f3aad3` | `backup/worktree-responsive-video-plan/09aab7da` | `git branch worktree-responsive-video-plan 09aab7da` |
| `codex/sobre-origin-a11y-fixes` | `e03f269df443e6d1bde3812573468e8057cbebcd` | `backup/codex/sobre-origin-a11y-fixes/e03f269d` | `git branch codex/sobre-origin-a11y-fixes e03f269d` |
| `codex/weekly-cleanup` | `dcf8d0de3490dc2995ee4b3aa0b5d222bab8a4c0` | `backup/codex/weekly-cleanup/dcf8d0de` | `git branch codex/weekly-cleanup dcf8d0de` |
| `docs/audit-beliefs-ghost-design-v3` | `2444b35be4bc5d9809fcdc1ec9f46e62b455a328` | `backup/docs/audit-beliefs-ghost-design-v3/2444b35b` | `git branch docs/audit-beliefs-ghost-design-v3 2444b35b` |
| `danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s` | `16aa5652d71702ceb0477c0d6f595954f81e5d49` | `backup/wksp1-planning/16aa5652` | `git branch danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s 16aa5652` |

### Rollback de Emergência (reflog)
```bash
git reflog show --all | grep <nome-da-branch>
git branch <nome-recuperado> <sha-do-reflog>
```

**Política de reflog:** reflog retém por 90 dias por padrão. Não confiar exclusivamente nele para branches deletadas remotamente — bundle + tags são a garantia primária.

---

## 9. Proposed Command Plan

### FASE 0 — Read-Only (JÁ EXECUTADO — sem aprovação necessária)
```bash
# Todos os comandos desta fase já foram executados nesta sessão
git status --short --branch
git remote -v
git branch --all --verbose --verbose
git branch --merged && git branch --no-merged
git worktree list --porcelain
git for-each-ref --format='...' refs/heads refs/remotes
git log --oneline --decorate --graph --all --max-count=40
git fetch --all --prune --dry-run
git fetch --all
git rev-list --count origin/main..<branch>  # para cada branch
git log --oneline <branch> --not origin/main  # para branches de risco
# GitHub MCP: list_pull_requests, list_branches
```

### FASE 1 — Diff das unknown-risk e candidate-archive de alta divergência (READ-ONLY, sem aprovação adicional)
```bash
# Sequência para cada branch (unknown-risk + candidate-archive com >100 commits únicos):
# 1. Atualizar refs remotas
git remote update

# 2. Verificar commits exclusivos e ancestry
git log origin/<branch> ^origin/main --oneline
git merge-base origin/<branch> origin/main

# 3. Medir delta real de código
git diff origin/main...origin/<branch> --stat

# Executar para as 8 unknown-risk:
git diff origin/main...origin/fix/audit-remediation-phase1 --stat
git diff origin/main...origin/worktree-audit-fixes --stat
git diff origin/main...origin/worktree-fix-06-que-me-move --stat
git diff origin/main...origin/worktree-responsive-video-plan --stat
git diff origin/main...origin/codex/sobre-origin-a11y-fixes --stat
git diff origin/main..."origin/danilo-novais-yahoo-com-br/WKSP-1-planning-portfolio-s" --stat
git diff origin/main...origin/docs/audit-beliefs-ghost-design-v3 --stat
git diff origin/main...origin/codex/weekly-cleanup --stat

# Executar também para candidate-archive com alta divergência (>100 commits únicos):
git diff origin/main...origin/audit/weekly-report-4676327557888982331 --stat
git diff origin/main...origin/claude/weekly-audit-report-2026-05-19 --stat
```

### FASE 2 — Atualização Local (REQUER APROVAÇÃO)
```bash
# ⚠️ REQUIRES APPROVAL
git checkout main
git pull origin main
```

### FASE 3 — Delete Local da Branch Mergeada (REQUER APROVAÇÃO, após Fase 2)
```bash
# ⚠️ REQUIRES APPROVAL
git branch -d claude/dazzling-euler-mwbicc
```

### FASE 4 — Bundle de Backup (REQUER APROVAÇÃO)
```bash
# ⚠️ REQUIRES APPROVAL
mkdir -p .git-hygiene-backup
git bundle create .git-hygiene-backup/pre-cleanup-$(date +%Y%m%d-%H%M%S).bundle --all
```

### FASE 5 — Tags de Arquivo para candidate-archive (REQUER APROVAÇÃO)
```bash
# ⚠️ REQUIRES APPROVAL — criar tags localmente
git tag archive/audit/weekly-report/af752857 af752857b90684e3a6bbe0c9b3fd6b5ffdbc9baa
git tag archive/claude/weekly-audit-2026-05-19/942afc1f 942afc1fc19734b8238dd7198b546f2ef51b2be8
git tag archive/claude/dazzling-euler-ZhWMf/762cf697 762cf69719d83da848f6da31a68ffd98bea65cd3
git tag archive/claude/beautiful-rubin-MVYRs/ac6526c0 ac6526c0c049fd8160e504c174f435d3fb9dd5b1
git tag archive/codex/ghost-portfolio-hero-pr/bb1fbe0a bb1fbe0a2f211b3deef142be2287a0744a6b139f

# Tags para candidate-delete-remote (backup leve)
git tag backup/codex/media-card-system/06104ba2 06104ba2b92a755a7dd841d59fa8cfbf37f60cb4
git tag backup/chore-audit-report/632024b4 632024b4ce8a248378417705231dda77e9b50389

# Push apenas das tags criadas nesta sessão (candidate-archive + candidate-delete-remote)
git push origin \
  archive/audit/weekly-report/af752857 \
  archive/claude/weekly-audit-2026-05-19/942afc1f \
  archive/claude/dazzling-euler-ZhWMf/762cf697 \
  archive/claude/beautiful-rubin-MVYRs/ac6526c0 \
  archive/codex/ghost-portfolio-hero-pr/bb1fbe0a \
  backup/codex/media-card-system/06104ba2 \
  backup/chore-audit-report/632024b4

# Tags de backup para unknown-risk — gate obrigatório antes de qualquer delete na Fase 8
# Criadas aqui para garantir preservação no remoto independente da decisão futura
git tag backup/fix/audit-remediation-phase1/2a7cc79f 2a7cc79f6198863092eaeb8593828cce12ec0174
git tag backup/worktree-audit-fixes/4f158abe 4f158abeee42fc056e85b67e01c71fdc6e296981
git tag backup/worktree-fix-06-que-me-move/561eec01 561eec01b9af584a2fedff08b4f57fc454730f36
git tag backup/worktree-responsive-video-plan/09aab7da 09aab7da9f81910ced8e50d8c29cc03055f3aad3
git tag backup/codex/sobre-origin-a11y-fixes/e03f269d e03f269df443e6d1bde3812573468e8057cbebcd
git tag backup/wksp1-planning/16aa5652 16aa5652d71702ceb0477c0d6f595954f81e5d49
git tag backup/docs/audit-beliefs-ghost-design-v3/2444b35b 2444b35be4bc5d9809fcdc1ec9f46e62b455a328
git tag backup/codex/weekly-cleanup/dcf8d0de dcf8d0de3490dc2995ee4b3aa0b5d222bab8a4c0

git push origin \
  backup/fix/audit-remediation-phase1/2a7cc79f \
  backup/worktree-audit-fixes/4f158abe \
  backup/worktree-fix-06-que-me-move/561eec01 \
  backup/worktree-responsive-video-plan/09aab7da \
  backup/codex/sobre-origin-a11y-fixes/e03f269d \
  backup/wksp1-planning/16aa5652 \
  backup/docs/audit-beliefs-ghost-design-v3/2444b35b \
  backup/codex/weekly-cleanup/dcf8d0de
```

### FASE 6 — Delete Remoto dos candidate-delete-remote ★ REQUER APROVAÇÃO SEPARADA ★
```bash
# ⚠️ REQUIRES SEPARATE APPROVAL — executar apenas após Fase 4 e 5 completas
git push origin --delete codex/media-card-system
git push origin --delete chore-audit-report-12176814106024817247
```

### FASE 7 — Delete Remoto dos candidate-archive ★ REQUER APROVAÇÃO SEPARADA ★
```bash
# ⚠️ REQUIRES SEPARATE APPROVAL — executar apenas após tags pushadas na Fase 5
git push origin --delete audit/weekly-report-4676327557888982331
git push origin --delete claude/weekly-audit-report-2026-05-19
git push origin --delete claude/dazzling-euler-ZhWMf
git push origin --delete claude/beautiful-rubin-MVYRs
git push origin --delete codex/ghost-portfolio-hero-pr
```

### FASE 8 — Delete das unknown-risk (REQUER APROVAÇÃO SEPARADA, após Fase 1 e análise humana)
```bash
# ⚠️ REQUIRES SEPARATE HUMAN DECISION — somente após diff + análise
# Estas branches só podem ser deletadas ou mergeadas após decisão explícita do humano
# com base nos resultados da Fase 1
```

### FASE 9 — Validação (pós-execução aprovada)
```bash
git fetch --all --prune
git status
git branch --all
git worktree list --porcelain
git fetch --all --prune --dry-run  # deve reportar 0 itens após o prune acima
pnpm run lint
pnpm run typecheck
pnpm run build-check
pnpm test
```

---

## 10. Risks and Mitigations

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Branch `unknown-risk` contém código funcional exclusivo | Alta | Alto | Diff obrigatório (Fase 1) antes de qualquer reclassificação ou ação |
| `worktree-fix-06-que-me-move` reclassificado prematuramente como "mergeado" | Confirmada (auditoria anterior) | Alto | Rebaixado para `unknown-risk`; diff obrigatório nesta auditoria |
| `main` local desatualizado (-7 commits) causar conflito de merge ou diff errado | Alta | Médio | `git pull origin main` como primeiro passo de execução |
| Tag de arquivo sobrescrever tag existente | Baixa | Baixo | Verificar `git tag --list archive/*` antes de criar; usar SHAs nos nomes de tag |
| `git push --tags` publicar tags não relacionadas a este cleanup | Baixa | Baixo | Usar `git push origin <tag1> <tag2>` explicitamente, nunca `--tags` genérico |
| Branch `preserved-pr` (#493) deletada por engano | Muito baixa | Alto | Classificada como `preserved-pr`; nenhum delete gerado para ela |
| Branch com CI/CD hardcoded deletada | Baixa | Alto | Verificar `.github/workflows/` para referências de branch antes da Fase 6/7/8 |
| Bundle criado em container efêmero perdido | Média | Alto | Bundle em `.git-hygiene-backup/`; commitar documento de SHAs; tags no remoto como garantia |
| Warning `.gitmodules` duplicado escala | Baixa | Baixo | Issue técnico separado; não bloqueia cleanup |
| `git fetch --prune` na Fase 9 remover tracking ref de branch ainda em uso | Muito baixa | Médio | Apenas tracking refs de branches já deletadas são removidas; branches locais intactas |

---

## 11. Approval Gate

> **STOP.**
>
> Este plano é **READ-ONLY e INFORMATIVO**. Nenhum comando destrutivo foi executado.
>
> **Sequência de aprovação sugerida:**
>
> 1. **Fase 1 (Diff das unknown-risk):** leitura pura, sem destrutividade. Pode executar imediatamente.
> 2. **Fases 2–5 (Update local + delete local + bundle + tags):** requer `Aprovado` ou `Proceed`.
> 3. **Fases 6–7 (Delete remoto de candidates confirmados):** requer aprovação **separada e explícita**.
> 4. **Fase 8 (Delete de unknown-risk):** requer análise humana dos resultados da Fase 1 + aprovação explícita para cada branch.
>
> **Nenhum comando destrutivo será executado até que você responda `Aprovado` ou `Proceed`.**
>
> Se quiser aprovar fases específicas separadamente (ex: "Aprovar Fases 1–5, aguardar 6–8"), especifique quais.

---

*Rotina: Git Branch and Worktree Hygiene | portfoliodanilo.com*  
*Próxima revisão sugerida: após resolução do PR #493 ou em 2 semanas*

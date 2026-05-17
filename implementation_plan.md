# Implementation Plan — Ghost System Audit (2026-05-17)

> **Role:** Repo Architect + Ghost Design System Guardian
> **Status:** Planning Phase — Aguardando aprovação humana
> **Data:** 2026-05-17
> **Gerado por:** ghost-audit pipeline

---

## Resumo Executivo

O repositório `danilonovaisv/PORTFOLIO-DANILO-FINAL` exibe o aviso de truncamento do GitHub ("1 entries were omitted") como consequência direta de **12.281 arquivos rastreados no git**, número anômalo para um projeto Next.js de portfólio. A causa raiz é multifatorial: cache npm binário comitado, skill library de 6.346 arquivos rastreada, arquivos temporários de trabalho na raiz, diretórios de ferramentas AI duplicados, e ausência de entradas críticas no `.gitignore`.

Paralelamente, a auditoria do Ghost Design System identificou violações de motion (uso proibido de `rotate`), ausência de dois primitivos arquiteturais (`MotionLink` e `image-loader.ts`), e o uso de `m.button` para navegação interna no Header Desktop — quebrando o prefetch do Next.js.

---

## Diagnóstico Detalhado

### 1. Incidente GitHub — Truncamento de Diretório

| Causa                         | Diretório / Arquivo                                                                                                   | Arquivos Comitados | Severidade |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------- |
| Cache npm binário             | `functions/.npm_cache/`                                                                                               | **2.759**          | CRÍTICA    |
| Skill library de agente       | `.agent/skills/`                                                                                                      | **6.346**          | ALTA       |
| Relatórios e backups          | `reports/`                                                                                                            | 523                | MÉDIA      |
| Artefatos temporários na raiz | `*.txt`, `walkthrough.md`, `task.md`, `implementation_plan.md`, `WEEKLY_AUDIT_REPORT.md`                              | ~8                 | MÉDIA      |
| Output de testes Playwright   | `output/`                                                                                                             | 12                 | BAIXA      |
| Output gerado (graphify)      | `graphify-out/`                                                                                                       | 47                 | BAIXA      |
| Diretórios de ferramentas AI  | `.zencoder`, `.junie`, `.goose`, `.factory`, `.crush`, `.continue`, `.commandcode`, `.codebuddy`, `.augment`, `.qwen` | ~130               | BAIXA      |
| Cache Firebase                | `.firebase-cache/`                                                                                                    | 4                  | BAIXA      |
| Arquivos de migração Supabase | `supabase-asset-migrate/`                                                                                             | 17                 | BAIXA      |
| Scratch area                  | `scratch/`                                                                                                            | 16                 | BAIXA      |

**Diagnóstico do `.gitignore` atual:**

- `functions/.npm_cache/` **não está listado** (apenas `.npm_cache_local/` está coberto).
- `functions/.gitignore` não ignora `functions/.npm_cache/`.
- Arquivos `.txt` na raiz e arquivos de trabalho (`walkthrough.md`, `WEEKLY_AUDIT_REPORT.md`) não cobertos.
- `graphify-out/`, `output/`, `scratch/` não cobertos.
- Diretórios de ferramentas AI (`.zencoder`, `.junie` etc.) não cobertos.

**Exposição de secrets:** Nenhuma chave real detectada nos arquivos rastreados. As ocorrências retornadas pela busca pertencem a documentação de skills (`.agent/skills/`) sobre gestão de secrets, não a credenciais reais. Risco de exposição: BAIXO. Recomenda-se executar `git secret scan` ou `gitleaks` como validação adicional.

**Nota sobre `.agent/skills`:** A biblioteca de 6.346 skills é conteúdo editorial/documentação do agente. A decisão de manter no git é legítima, mas representa o maior vetor de crescimento de tamanho do repositório. Proposta: mover para submodule ou `.gitignore` com instrução de install separado.

---

### 2. Ghost Design System — Violações Identificadas

#### 2.1 Motion Proibido — `CategoryStripe.tsx`

```
Arquivo: src/components/home/portfolio-showcase/CategoryStripe.tsx
Linha: 163
Violação: rotate: isHovered ? 0 : -45
Regra Ghost: Motion proibido inclui rotate (exceto com regra superior explícita)
```

**Trade-off:** A seta usa `rotate` para indicar direção (affordance direcional). A substituição por `translateX` (permitido se documentado) ou ícone alternativo precisa manter a legibilidade do affordance.

#### 2.2 Componente Ausente — `MotionLink`

```
Diagnóstico: Não existe src/components/motion/MotionLink.tsx
Impacto: Navegação interna usa m.button (quebra prefetch Next.js) ou next/link puro (sem motion)
Afetado: DesktopFluidHeader.tsx:67-78 (m.button para items internos)
```

**Solução proposta:** `MotionLink` como wrapper de `next/link` com `m()` ou `AnimatePresence`, preservando prefetch e scroll behavior do App Router.

#### 2.3 Ausente — `src/lib/supabase/image-loader.ts`

```
Diagnóstico: Arquivo não existe. O next.config.mjs usa remotePatterns com a rota
/storage/v1/render/image/public/** (Supabase Image Transform API) mas não há
loader customizado que aproveite os parâmetros width/quality via transform URL.
```

**Situação atual:** Next.js `<Image>` usa o optimizer interno, que faz um round-trip desnecessário se o Supabase já pode servir imagens redimensionadas via `?width=&quality=`. Não é bug crítico, mas é ineficiência de performance.

#### 2.4 Header Desktop — Navegação sem Prefetch

```
Arquivo: src/components/layout/header/DesktopFluidHeader.tsx:67-68
Problema: const LinkComponent = isExternalHref(...) ? m.a : m.button
m.button não é um link — não aciona prefetch nem navegação declarativa do Next.js
```

**Impacto:** Links de navegação interna no desktop header são buttons, não âncoras, o que quebra abertura em nova aba, bot crawling, e SEO.

#### 2.5 Cor Vermelha — Status

```
Resultado da auditoria: Nenhuma violação real detectada.
O grep retornou matches de nomes de variável (featured_on_home) onde "red" é substring.
#E50914 não está em uso fora de contextos de erro/alerta (conforme permitido).
```

---

## Matriz de Prioridades

### P0 — GitHub & Higiene (Deve ser feito antes do próximo commit/deploy)

| ID    | Ação                                                                                     | Risco de Execução | Reversível   |
| ----- | ---------------------------------------------------------------------------------------- | ----------------- | ------------ |
| P0-G1 | Adicionar `functions/.npm_cache/` ao `.gitignore`                                        | ZERO              | Sim          |
| P0-G2 | Remover `functions/.npm_cache/` do tracking git (`git rm -r --cached`)                   | BAIXO             | Sim (re-add) |
| P0-G3 | Adicionar arquivos temporários de raiz ao `.gitignore` (`*.txt`, `walkthrough.md`, etc.) | ZERO              | Sim          |
| P0-G4 | Remover arquivos de trabalho da raiz do tracking                                         | BAIXO             | Sim          |
| P0-G5 | Adicionar diretórios de output ao `.gitignore` (`output/`, `graphify-out/`, `scratch/`)  | ZERO              | Sim          |
| P0-G6 | Decisão estratégica sobre `.agent/skills` (submodule vs keep vs gitignore)               | MÉDIO             | Depende      |

### P0 — Ghost System (Bloqueadores arquiteturais)

| ID     | Ação                                                               | Complexidade | Regressão Esperada       |
| ------ | ------------------------------------------------------------------ | ------------ | ------------------------ |
| P0-GS1 | Criar `src/components/motion/MotionLink.tsx`                       | BAIXA        | Nenhuma (novo arquivo)   |
| P0-GS2 | Substituir `m.button` por `MotionLink` em `DesktopFluidHeader.tsx` | BAIXA        | Testar navegação desktop |
| P0-GS3 | Criar `src/lib/supabase/image-loader.ts` (Supabase Transform)      | MÉDIA        | Testar todas as imagens  |

### P1 — Ghost System (Melhorias não bloqueadoras)

| ID     | Ação                                                                               | Complexidade | Regressão Esperada       |
| ------ | ---------------------------------------------------------------------------------- | ------------ | ------------------------ |
| P1-GS1 | Corrigir `rotate` em `CategoryStripe.tsx:163` (substituir por translateX ou ícone) | BAIXA        | Testar affordance visual |
| P1-GS2 | Decidir loader do `next.config.mjs` (referência ao image-loader após P0-GS3)       | BAIXA        | Após P0-GS3              |
| P1-GS3 | Validar altura dos cards em `FeaturedProjectsSection.tsx` contra spec              | BAIXA        | Nenhuma                  |
| P1-GS4 | Auditar estado ativo no Header (link corrente vs outros)                           | BAIXA        | Nenhuma                  |

---

## Trade-offs e Decisões Pendentes

### Decisão 1: `.agent/skills` — Keep vs Submodule vs Gitignore

- **Keep (status quo):** 6.346 arquivos no repo. Fácil acesso, mas repositório pesado.
- **Submodule:** Isola a skill library, preserva histórico separado. Complexidade de manutenção aumenta.
- **Gitignore + README de install:** Remove do repo, instrução de clone separado. Mais limpo, mas requer disciplina de setup.

**Recomendação:** Submodule se o histórico for crítico; gitignore + README se a library for importada de repo próprio (`.agents/` sugere que já existe um repo central).

### Decisão 2: Image Loader Strategy

- **Opção A:** Loader customizado que usa Supabase Transform API (`/render/image/public/`). Elimina round-trip via Next.js.
- **Opção B:** Manter `remotePatterns` atual com optimizer do Next.js. Mais simples, sem risco de regressão.

**Recomendação:** Opção A para produção (performance), Opção B aceitável se latência atual for abaixo de 200ms LCP contribution.

---

## Comandos Propostos (Aguardando aprovação)

```bash
# P0-G1: Atualizar .gitignore
# (adicionar entradas: functions/.npm_cache/, output/, graphify-out/, scratch/, *.txt na raiz)

# P0-G2: Remover cache do tracking (NÃO executa agora — aguarda aprovação)
# git rm -r --cached functions/.npm_cache/
# git rm --cached typecheck_fresh.txt tsc_output_current_v2.txt tsc_output_current.txt typecheck_output_new.txt knip_report.txt

# P0-GS1: Criar MotionLink
# touch src/components/motion/MotionLink.tsx

# Build check após execução:
# pnpm run build-check
```

---

## Critérios de Sucesso

1. `git ls-files | wc -l` < 4.000 (após remoção de npm_cache e temporários)
2. GitHub não exibe aviso de truncamento no diretório raiz
3. Nenhum erro de TypeScript ou lint introduzido
4. `pnpm run build-check` passa sem erros
5. Navegação interna no Header Desktop usa `next/link` (prefetch ativo)
6. `CategoryStripe.tsx` sem `rotate` em propriedades de motion
7. Sem secrets expostos (validado por gitleaks ou equivalente)

---

## Plano de Rollback

- Todos os `git rm --cached` são reversíveis com `git checkout HEAD -- <arquivo>` ou `git add <arquivo>` antes do commit.
- Nenhuma alteração de código fonte antes da aprovação.
- Branch de trabalho recomendada: `claude/exciting-thompson-7tJ75` (já designada).

---

_Aguardando aprovação explícita ("Aprovado" ou "Proceed") para iniciar Fase 4: Execution._

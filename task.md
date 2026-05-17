# Tasks — Ghost System Audit 2026-05-17

> **Status:** Planning — Aguardando aprovação humana
> **Branch:** `claude/exciting-thompson-7tJ75`
> **Referência:** `implementation_plan.md`

---

## FASE P0-G — GitHub & Higiene do Repositório

### Task P0-G1: Atualizar `.gitignore` com entradas faltantes
- **Responsável:** Repo Architect
- **Arquivo:** `.gitignore` (raiz)
- **Pré-condição:** Aprovação humana recebida
- **Passos:**
  1. Adicionar `functions/.npm_cache/` após a seção de Firebase
  2. Adicionar `output/` (playwright output)
  3. Adicionar `graphify-out/`
  4. Adicionar `scratch/`
  5. Adicionar seção "Arquivos de trabalho temporários": `typecheck_fresh.txt`, `tsc_output_current*.txt`, `typecheck_output_new.txt`, `knip_report.txt`, `walkthrough.md`, `WEEKLY_AUDIT_REPORT.md`
- **Validação:** `grep "npm_cache\|graphify-out\|output/" .gitignore` retorna entradas

### Task P0-G2: Remover `functions/.npm_cache/` do tracking git
- **Responsável:** Repo Architect
- **Pré-condição:** P0-G1 concluído
- **Passos:**
  1. Executar `git rm -r --cached functions/.npm_cache/`
  2. Verificar com `git status` que 2.759 arquivos aparecem como deleted (staged)
  3. Confirmar que `functions/.npm_cache/` existe no disco (não é deletado, apenas untracked)
- **Validação:** `git ls-files functions/.npm_cache | wc -l` retorna 0

### Task P0-G3: Remover arquivos temporários da raiz do tracking
- **Responsável:** Repo Architect
- **Pré-condição:** P0-G1 concluído
- **Passos:**
  1. `git rm --cached typecheck_fresh.txt tsc_output_current_v2.txt tsc_output_current.txt typecheck_output_new.txt knip_report.txt`
  2. Avaliar se `walkthrough.md`, `WEEKLY_AUDIT_REPORT.md`, `task.md`, `implementation_plan.md` devem permanecer rastreados ou ser movidos para `docs/`
- **Validação:** `git ls-files | grep -E "^[^/]+\.txt$"` retorna vazio

### Task P0-G4: Remover diretórios de output do tracking
- **Responsável:** Repo Architect
- **Pré-condição:** P0-G1 concluído
- **Passos:**
  1. `git rm -r --cached output/` (12 arquivos Playwright)
  2. `git rm -r --cached graphify-out/` (47 arquivos)
  3. `git rm -r --cached scratch/` (16 arquivos) — validar se há conteúdo útil antes
- **Validação:** `git ls-files output/ graphify-out/ scratch/` retorna vazio

### Task P0-G5: Decisão estratégica sobre `.agent/skills` (6.346 arquivos)
- **Responsável:** Arquiteto + Danilo (decisão humana)
- **Opções:**
  - A) Manter no repositório (sem ação)
  - B) Converter em git submodule apontando para repo de skills
  - C) Adicionar ao `.gitignore` e remover do tracking (`git rm -r --cached .agent/skills/`)
- **Impacto da opção C:** -6.346 arquivos rastreados; repo desce de 12.281 para ~5.900 arquivos
- **Validação:** Decisão documentada em `AGENTS.md`

### Task P0-G6: Commit de higiene
- **Pré-condição:** P0-G1 a P0-G4 concluídos, decisão P0-G5 tomada
- **Mensagem de commit sugerida:** `chore: remove tracked build artifacts and temp files from git history`
- **Validação:** `git ls-files | wc -l` < 5.500 (ou < 4.000 se P0-G5 incluir remoção de skills)

---

## FASE P0-GS — Ghost System (Bloqueadores Arquiteturais)

### Task P0-GS1: Criar `src/components/motion/MotionLink.tsx`
- **Responsável:** Motion Governance Specialist
- **Arquivo destino:** `src/components/motion/MotionLink.tsx`
- **Pré-condição:** Aprovação humana recebida
- **Requisitos do componente:**
  - Wrapper de `next/link` com suporte a animações Motion (opacity, blur, translateY)
  - Preservar atributos `prefetch`, `scroll`, `replace` do Next.js
  - Aceitar `MotionProps` para `whileHover`, `animate`, `initial`, `transition`
  - Easing padrão: `GHOST_EASE` (`[0.22, 1, 0.36, 1]`) de `@/config/motion`
  - Exportação nomeada: `export const MotionLink`
- **Validação:** Componente renderiza sem erros, preserva prefetch (verificar Network tab)

### Task P0-GS2: Substituir `m.button` por `MotionLink` em `DesktopFluidHeader.tsx`
- **Responsável:** Motion Governance Specialist
- **Arquivo:** `src/components/layout/header/DesktopFluidHeader.tsx`
- **Linha alvo:** 67-78 (bloco `const LinkComponent = isExternalHref(...) ? m.a : m.button`)
- **Pré-condição:** P0-GS1 concluído
- **Passos:**
  1. Substituir `m.button` por `MotionLink` para hrefs internos
  2. Manter `m.a` para hrefs externos e `mailto:`/`tel:`
  3. Garantir que `onClick` de navegação interna é removido (Next.js cuida do routing)
- **Validação:**
  - Navegação desktop funciona em `/`, `/sobre`, `/portfolio`, `/admin`
  - Abertura em nova aba (Ctrl+Click) funciona
  - Sem erros de console

### Task P0-GS3: Criar `src/lib/supabase/image-loader.ts`
- **Responsável:** Supabase Storage Specialist
- **Arquivo destino:** `src/lib/supabase/image-loader.ts`
- **Pré-condição:** Aprovação humana recebida
- **Requisitos:**
  - Loader para `next/image` usando Supabase Image Transform API
  - URL pattern: `<base>/storage/v1/render/image/public/<bucket>/<path>?width=<w>&quality=<q>`
  - Fallback para URL original se transform não disponível
  - Manter compatibilidade com `remotePatterns` do `next.config.mjs`
- **Decisão pendente (P0-GS3a):** Referenciar loader em `next.config.mjs` (`images.loader`) ou usar como prop em componentes individuais
- **Validação:** `next/image` serve imagens do Supabase com parâmetros de transform na URL

---

## FASE P1-GS — Ghost System (Melhorias)

### Task P1-GS1: Corrigir `rotate` em `CategoryStripe.tsx`
- **Responsável:** Motion Governance Specialist
- **Arquivo:** `src/components/home/portfolio-showcase/CategoryStripe.tsx`
- **Linha:** 163 — `rotate: isHovered ? 0 : -45`
- **Pré-condição:** Aprovação humana recebida
- **Opções de substituição:**
  - A) Substituir por `translateX` (ex: seta se move horizontalmente — affordance mantido)
  - B) Substituir o ícone por um que não requer rotação (ex: `ArrowRight` vs `ArrowUpRight`)
  - C) Documentar como "regra superior explícita" e manter (requer entrada em GHOST-DESIGN-SYSTEM.md)
- **Recomendação:** Opção A ou B, dependendo do design do componente
- **Validação:** Sem uso de `rotate` no bloco de animação do componente

### Task P1-GS2: Referenciar `image-loader` em `next.config.mjs`
- **Responsável:** Next.js Architect
- **Pré-condição:** P0-GS3 concluído e testado
- **Passos:**
  1. Importar `imageLoader` do novo arquivo
  2. Adicionar `images.loader: 'custom'` e `images.loaderFile: './src/lib/supabase/image-loader.ts'`
- **Validação:** Build completo sem erros, imagens servidas com transform URL

### Task P1-GS3: Validar altura de cards em `FeaturedProjectsSection.tsx`
- **Responsável:** QA Visual
- **Arquivo:** `src/components/home/featured-projects/FeaturedProjectsSection.tsx`
- **Passos:**
  1. Comparar altura atual com spec em `.context/DOCS-PORTFOLIO-PAGES/01-HOME`
  2. Validar responsividade em mobile (375px), tablet (768px), desktop (1440px)
- **Validação:** Screenshots comparados com spec visual

### Task P1-GS4: Auditar estado ativo no Header
- **Responsável:** QA Visual + Motion Specialist
- **Arquivo:** `src/components/layout/header/DesktopFluidHeader.tsx`
- **Passos:**
  1. Verificar se link da rota atual tem estilo de "ativo" diferenciado
  2. Usar `usePathname()` do Next.js se não implementado
- **Validação:** Link ativo visualmente destacado em todas as rotas

---

## FASE P2 — Validação Final

### Task P2-V1: Build check completo
- **Comando:** `pnpm run build-check`
- **Critério:** Zero erros de TypeScript e lint

### Task P2-V2: Verificar contagem de arquivos rastreados
- **Comando:** `git ls-files | wc -l`
- **Critério:** < 5.500 (sem remover skills) ou < 4.000 (com remoção de skills)

### Task P2-V3: Gerar walkthrough.md final
- **Conteúdo:** Alterações realizadas, arquivos modificados, pendências, plano de rollback
- **Local:** `docs/walkthrough-audit-2026-05-17.md` (mover da raiz para docs/)

### Task P2-V4: Atualizar `.context/` com novo estado
- **Arquivos a atualizar:** `.context/active_state.md`, `.context/knowledge-graph.md`

---

## Checklist de Aprovação

- [ ] Aprovação humana explícita recebida ("Aprovado" ou "Proceed")
- [ ] Branch `claude/exciting-thompson-7tJ75` criada/atualizada
- [ ] P0-G1 a P0-G4 executados
- [ ] P0-GS1 e P0-GS2 executados
- [ ] P0-GS3 executado (loader Supabase)
- [ ] P1-GS1 executado (rotate removido)
- [ ] Build-check passando
- [ ] PR criado como draft

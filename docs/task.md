# Ghost System — Task List
**Data:** 2026-05-17 | **Status:** AGUARDANDO APROVAÇÃO HUMANA | **Branch:** `claude/exciting-thompson-JBbyz`

---

> **BLOQUEIO TOTAL:** Nenhuma tarefa abaixo deve ser executada antes de aprovação humana explícita.
> Aprovar com: `"Aprovado"` ou `"Proceed"`.

---

## FASE P0 — Higiene de Repositório (Sem risco de regressão)

### R1 — Remover cache npm das functions do git
**Responsável:** Repo Architect
**Prioridade:** CRÍTICO
**Arquivos afetados:** `functions/.npm_cache/` (2.759 arquivos)

**Passos:**
- [ ] Adicionar `functions/.npm_cache/` ao `/home/user/PORTFOLIO-DANILO-FINAL/.gitignore` (seção "Local npm/pnpm caches")
- [ ] Adicionar `functions/.npm_cache/` ao `functions/.gitignore`
- [ ] Executar: `git rm -r --cached functions/.npm_cache/`
- [ ] Verificar: `git ls-files | grep "functions/.npm_cache" | wc -l` deve retornar 0
- [ ] Validar que `functions/` ainda funciona (index.js, package.json intactos)

**Rollback:** `git restore --staged functions/.npm_cache/` (desfaz o staging sem alterar arquivos locais)

---

### R2 — Remover bytecode Python compilado
**Responsável:** Repo Architect
**Prioridade:** CRÍTICO
**Arquivos afetados:** 40 arquivos `.pyc` e `__pycache__/`

**Passos:**
- [ ] Adicionar ao `.gitignore` (se não existir já):
  ```
  **/__pycache__/
  **/*.pyc
  **/*.pyo
  ```
- [ ] Executar: `git rm -r --cached --ignore-unmatch "**/__pycache__" "**/*.pyc" "**/*.pyo"`
- [ ] Verificar: `git ls-files | grep ".pyc" | wc -l` deve retornar 0
- [ ] Confirmar que scripts Python ainda executam corretamente

**Rollback:** Não necessário (bytecode é regenerado automaticamente na próxima execução Python)

---

### R3 — Remover arquivos de sessão temporária já ignorados
**Responsável:** Repo Architect
**Prioridade:** ALTO
**Arquivos afetados:** `scratch/` (16 arquivos), `output/` (12 arquivos)

**Passos:**
- [ ] Verificar que `scratch/` e `output/` estão no `.gitignore` (já confirmado)
- [ ] Executar: `git rm -r --cached scratch/ output/`
- [ ] Adicionar `output/` ao `.gitignore` explicitamente (atualmente não está listado)
- [ ] Verificar: `git ls-files | grep "^scratch\|^output" | wc -l` deve retornar 0

**Rollback:** `git restore --staged scratch/ output/`

---

### R4 — Remover exports visuais gerados (`graphify-out/`)
**Responsável:** Repo Architect
**Prioridade:** ALTO
**Arquivos afetados:** `graphify-out/` (47 arquivos)

**Passos:**
- [ ] Verificar conteúdo do diretório: `ls graphify-out/` (confirmar que são apenas exports gerados, não assets de produção)
- [ ] Adicionar ao `.gitignore`: `graphify-out/`
- [ ] Executar: `git rm -r --cached graphify-out/`
- [ ] Verificar: `git ls-files | grep "^graphify-out" | wc -l` deve retornar 0

**Rollback:** `git restore --staged graphify-out/`

---

### R5 — DECISÃO ARQUITETURAL: Biblioteca de Skills do Agente
**Responsável:** Danilo Novais (decisão humana obrigatória)
**Prioridade:** CRÍTICO (impacto maior)
**Arquivos afetados:** `.agent/skills/` (6.346), `.agents/` (284) = 6.630 arquivos

**Opções disponíveis:**

**Opção A — Gitignore (recomendada para reposde < 5.000 arquivos):**
- Adicionar `.agent/skills/` e `.agents/skills/` ao `.gitignore`
- `git rm -r --cached .agent/skills/ .agents/skills/`
- Criar um `skills-lock.json` com hashes para reprodutibilidade
- Risco: a biblioteca não fica versionada junto ao código

**Opção B — Git Submodule:**
- Mover `.agent/skills/` para repositório separado `ghost-skills-library`
- Referenciar como submodule
- Mantém versionamento, isola o peso do repo principal

**Opção C — Manter como está:**
- Nenhuma alteração
- Aceitar truncamento do GitHub (apenas cosmético, não funcional)

**Validação após execução (qualquer opção):**
- [ ] `git ls-files | wc -l` deve estar abaixo de 2.000 após R1-R4
- [ ] GitHub não deve mais mostrar aviso de truncamento
- [ ] Build do Next.js deve continuar funcional: `pnpm run build`

---

## FASE P0 — Ghost Design System

### G1 — Corrigir violação de `rotate` em `CategoryStripe.tsx`
**Responsável:** Motion Governance Specialist
**Prioridade:** BLOQUEANTE
**Arquivo:** `src/components/home/portfolio-showcase/CategoryStripe.tsx:163`

**Diagnóstico:**
```tsx
// LINHA 163 - VIOLAÇÃO: rotate é proibido pelo Ghost System
animate={{
  y: isHovered ? -1 : 0,
  rotate: isHovered ? 0 : -45,  // ❌ PROIBIDO
  backgroundColor: isHovered ? COLORS.purpleDetails : COLORS.bluePrimary,
}}
```

**Solução aprovada:**
- Remover `rotate` do `animate`
- Substituir pela exibição condicional de dois ícones com `opacity`:
  - Ícone 1: `ArrowUpRight` (diagonal) com `opacity: isHovered ? 0 : 1`
  - Ícone 2: `ArrowUp` (vertical) com `opacity: isHovered ? 1 : 0`
- Ambos com `transition: { duration: MOTION_TOKENS.duration.modal, ease: GHOST_EASE }`
- Posicionar com `absolute` + `inset-0` para sobreposição sem layout shift

**Passos:**
- [ ] Ler o arquivo completo: `src/components/home/portfolio-showcase/CategoryStripe.tsx`
- [ ] Remover a prop `rotate` do `animate` object na linha 163
- [ ] Implementar dois ícones sobrepostos com transição por `opacity`
- [ ] Verificar: `grep -n "rotate" src/components/home/portfolio-showcase/CategoryStripe.tsx` deve retornar 0
- [ ] Executar `pnpm run typecheck` — deve passar sem erros no arquivo
- [ ] Inspecionar visualmente o componente em dev

**Rollback:** `git restore src/components/home/portfolio-showcase/CategoryStripe.tsx`

---

### G2 — Criar `src/lib/supabase/image-loader.ts`
**Responsável:** Supabase Storage Specialist + Next.js App Router Architect
**Prioridade:** P0
**Arquivo a criar:** `src/lib/supabase/image-loader.ts`

**Diagnóstico:**
O `next.config.mjs` já configura `remotePatterns` para o host Supabase. Falta um `loaderFile` customizado que transforme URLs do Storage para otimização via Supabase Image Transformation.

**Especificação do loader:**
```typescript
// src/lib/supabase/image-loader.ts
import type { ImageLoader } from 'next/image';

const supabaseImageLoader: ImageLoader = ({ src, width, quality }) => {
  // URLs do Supabase Storage usam parâmetros de transformação nativos
  if (src.includes('/storage/v1/object/public/')) {
    const url = new URL(src);
    url.searchParams.set('width', String(width));
    url.searchParams.set('quality', String(quality ?? 80));
    url.searchParams.set('format', 'webp');
    return url.toString();
  }
  return src;
};

export default supabaseImageLoader;
```

**Passos:**
- [ ] Criar o arquivo `src/lib/supabase/image-loader.ts` com a implementação acima
- [ ] Verificar se Supabase do projeto suporta Image Transformation (requer plano Pro ou superior)
- [ ] Se Image Transformation não disponível: implementar loader sem parâmetros de transform (retorna src original — pelo menos o loader estará disponível para upgrade futuro)
- [ ] Atualizar `next.config.mjs`: adicionar `images.loaderFile: './src/lib/supabase/image-loader.ts'` na config de images
- [ ] Executar `pnpm run typecheck` — deve passar
- [ ] Executar `pnpm run build` — deve compilar sem erro
- [ ] Verificar que imagens do Supabase continuam carregando corretamente

**Trade-off:** O `loaderFile` customizado substitui o loader padrão do Next.js para TODAS as imagens. URLs que não são do Supabase devem fazer fallback gracioso (linha `return src` no else).

**Rollback:** Remover o arquivo + reverter `next.config.mjs`

---

## FASE P1 — Ghost Design System

### G3 — Criar `src/components/motion/MotionLink.tsx`
**Responsável:** Motion Governance Specialist
**Prioridade:** P1
**Arquivo a criar:** `src/components/motion/MotionLink.tsx`

**Especificação:**
```tsx
// Wrapper de Link para transições de saída ghost
// Usa opacity fadeout + translateY sutil ao navegar
```

**Passos:**
- [ ] Verificar se `src/components/motion/` existe; criar se necessário
- [ ] Criar `MotionLink.tsx` wrapping `next/link` com `m.span` e exit animation
- [ ] Garantir que não quebra navegação via `<a>` direto (accessibility)
- [ ] Substituir Links críticos: Header nav items, FeaturedProjectCard
- [ ] Executar `pnpm run typecheck && pnpm run lint`
- [ ] Testar navegação client-side manualmente

**Rollback:** Remover arquivo + reverter substituições de Link

---

### G4 — Documentar uso de `purpleDetails` como exceção intencional
**Responsável:** Ghost Design System Guardian
**Prioridade:** P1 (baixo esforço)
**Arquivo:** `src/components/home/portfolio-showcase/CategoryStripe.tsx:165`

**Passos:**
- [ ] Adicionar comentário inline na linha 165 documentando a exceção:
  ```tsx
  // Ghost Exception: purpleDetails em hover state — permitido por regra 23-design-system §Forbidden
  backgroundColor: isHovered ? COLORS.purpleDetails : COLORS.bluePrimary,
  ```
- [ ] Executar `pnpm run lint` — deve passar

---

## Validação Final (após todas as fases)

- [ ] `git ls-files | wc -l` abaixo de 2.000 (ou conforme decisão sobre skills)
- [ ] `pnpm run typecheck` — zero erros
- [ ] `pnpm run lint` — zero erros
- [ ] `pnpm run build` — build completo sem erro
- [ ] `grep -n "rotate" src/components/home/portfolio-showcase/CategoryStripe.tsx` retorna 0
- [ ] `src/lib/supabase/image-loader.ts` existe e exporta função padrão
- [ ] GitHub não exibe mais aviso de truncamento de diretório
- [ ] Atualizar `.context/active_state.md` com o novo estado do repositório

---

## Plano de Rollback Global

Se qualquer etapa de git rm causar regressão inesperada:
```bash
git stash          # salva estado atual
git restore --staged .   # remove staging
git stash pop      # restaura arquivos
```

Para rollback de código (G1, G2, G3):
```bash
git restore src/components/home/portfolio-showcase/CategoryStripe.tsx
git restore src/lib/supabase/image-loader.ts
git restore next.config.mjs
```

---

*Ghost Audit Pipeline | Task Manifest | 2026-05-17 | Aguardando: APROVAÇÃO HUMANA*

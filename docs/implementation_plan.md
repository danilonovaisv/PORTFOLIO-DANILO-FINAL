# Ghost System — Implementation Plan
**Data:** 2026-05-17 | **Projeto:** portfoliodanilo.com | **Status:** AGUARDANDO APROVAÇÃO HUMANA

---

## Resumo Executivo

Auditoria estrutural completa identificou dois vetores críticos de problema: (1) versionamento indevido de 11.940 arquivos não-fonte no repositório, causando o aviso de truncamento do GitHub para 1.000 arquivos por diretório; (2) três violações das regras do Ghost Design System no código-fonte ativo.

O repositório tem **12.281 arquivos rastreados**, mas apenas **341 são código-fonte real** (`src/`). A razão de ruído para sinal é de **35:1** — o inverso do que deveria ser.

---

## Diagnóstico P0 — Incidente GitHub (Truncamento de Diretório)

### Distribuição dos arquivos rastreados

| Diretório | Arquivos | Tipo | Deve estar no git? |
|-----------|----------|------|-------------------|
| `.agent/skills/` | 6.346 | Biblioteca de skills de IA | ⚠️ Decisão de arquitetura |
| `functions/.npm_cache/` | 2.759 | Cache npm local | ❌ NÃO |
| `reports/` | 523 | Relatórios de auditoria gerados | ⚠️ Seletivo |
| `.claude/` | 338 | Config Claude (plugins: 237) | ⚠️ Seletivo |
| `.agents/` | 284 | Biblioteca de skills secundária | ⚠️ Decisão de arquitetura |
| `docs/` | 239 | Documentação | ✅ SIM |
| `scripts/__pycache__` + `.pyc` | 40 | Bytecode Python compilado | ❌ NÃO |
| `graphify-out/` | 47 | Exports visuais gerados | ❌ NÃO |
| `scratch/` | 16 | Arquivos temporários de sessão | ❌ NÃO (já no .gitignore, pré-commit) |
| `output/` | 12 | Output temporário | ❌ NÃO |
| **`src/` (código real)** | **341** | Código-fonte da aplicação | ✅ SIM |

### Causa raiz do truncamento

O GitHub mostra o aviso quando um diretório tem mais de 1.000 arquivos. Os seguintes diretórios violam esse limite:
- `.agent/` — 6.673 arquivos (6.346 só em `skills/`)
- `functions/` — 2.767 arquivos (2.759 em `.npm_cache/`)
- `reports/` — 523 arquivos

### Lacunas no .gitignore

O `.gitignore` atual **não cobre**:
1. `functions/.npm_cache/` — cache npm dentro de functions (2.759 arquivos não devem estar no git)
2. `graphify-out/` — exports visuais gerados automaticamente
3. `**/__pycache__/` e `**/*.pyc` — bytecode Python compilado
4. `output/` — diretório de output de sessão
5. `.agent/skills/` — decisão pendente (ver trade-offs abaixo)

**Nota:** `scratch/` já está no `.gitignore`, mas os arquivos foram commitados antes da regra ser adicionada. Precisam de `git rm --cached`.

### Trade-offs sobre `.agent/skills/` e `.agents/`

**Manter rastreado:** A biblioteca de skills é intencional, permite colaboração e controle de versão da inteligência do agente. Custo: repositório pesado, truncamento no GitHub.

**Remover do git:** Repositório limpo, GitHub funcional. Custo: a biblioteca de skills precisa ser distribuída por outro mecanismo (submodule, release artifact, ou download on-demand). Recomendação: **mover para git submodule** ou **comprimir como release artifact**.

A decisão sobre `.agent/skills/` e `.agents/` requer aprovação explícita do autor.

---

## Diagnóstico P0 — Ghost Design System

### Violação 1: `rotate` em `CategoryStripe.tsx` (BLOQUEANTE)

**Arquivo:** `src/components/home/portfolio-showcase/CategoryStripe.tsx:163`
**Violação:** `rotate: isHovered ? 0 : -45`

A regra do Ghost System proíbe explicitamente `rotate` como motion property (apenas `opacity`, `blur` e `translateY` são permitidos; `translateX` é aceito se documentado). O ícone `ArrowUpRight` usa rotate para indicar direção durante hover.

**Solução proposta:** Substituir `rotate` por duas variantes SVG/Lucide diferentes (uma diagonal, uma vertical) comutadas via `opacity: 0/1` com easing padrão `[0.22, 1, 0.36, 1]`. Ou usar `scale` + `translateY` controlado como affordance direcional documentado. Mantém a legibilidade da UX sem violar o sistema de motion.

**Risco da solução:** Baixo. Mudança é visual e localizada em um único componente.

### Violação 2: Cor `purpleDetails` no hover do ícone em `CategoryStripe.tsx` (CONDICIONAL)

**Arquivo:** `src/components/home/portfolio-showcase/CategoryStripe.tsx:165`
**Violação:** `backgroundColor: isHovered ? COLORS.purpleDetails : COLORS.bluePrimary`

A regra permite roxo em estados de Hover e efeitos "Glitch". Este uso específico é em `animate.backgroundColor` durante hover — tecnicamente permitido pela exceção da regra. **Não é violação**, mas precisa de documentação explícita no código indicando que é uso intencional por exceção.

### Violação 3: `src/lib/supabase/image-loader.ts` ausente (AUSÊNCIA)

**Arquivo esperado:** `src/lib/supabase/image-loader.ts`
**Impacto:** Imagens do Supabase Storage sendo servidas sem otimização via `next/image`. O `next.config.mjs` já tem `remotePatterns` configurado para o host Supabase, mas sem um loader customizado, não há controle sobre transformação de imagem (width, quality, format).

**Solução proposta:** Criar `src/lib/supabase/image-loader.ts` com um loader que constrói URLs do Supabase Storage com parâmetros de transformação (`width`, `quality`, `format=webp`), e registrar em `next.config.mjs` via `loaderFile`.

### Violação 4: Ausência de `MotionLink` (AUSÊNCIA)

**Impacto:** Links internos usam `<Link>` nativo do Next.js sem wrap de animação. A navegação client-side não tem transição de saída, quebrando a experiência "Ethereal" do Ghost System para rotas internas.

**Solução proposta:** Criar `src/components/motion/MotionLink.tsx` que envolve `<Link>` com `<m.span>` de `motion/react`, aplicando `opacity: [1, 0]` na saída e delegando ao `AnimatePresence` global. Substituir usos em Header e cards de projeto.

---

## Diagnóstico P1 — Ghost Design System

### P1.1: Verificação de `scale` em componentes R3F

Os usos de `scale` em `GhostModel.tsx` são propriedades Three.js (`mesh.scale`, `groupRef.current.scale.setScalar()`), não CSS motion. **Não são violações** do Ghost System — a regra de motion se aplica a Framer Motion / CSS transitions, não ao loop R3F.

O único `scale` potencialmente problemático é em CSS Tailwind: `group-hover:scale-125` em `AdminShell.tsx:86` e `group-hover:scale-105` em `AssetCard.tsx:184` — ambos em contexto de admin, que opera com regras de motion relaxadas.

### P1.2: Uso de vermelho em componentes

Todos os usos de vermelho identificados são em contextos de admin (delete, destructivo, alerta, erro). A regra do Ghost System permite vermelho para "erro, destrutivo ou alerta sistêmico". **Sem violações.**

### P1.3: Estado ativo do Header Desktop

`DesktopFluidHeader.tsx` implementa `isActive` via `isNavItemActive()`, aplica `text-bluePrimary font-semibold` e `animate="active"`. A implementação está correta. Nenhuma violação detectada.

---

## Matriz de Prioridades

| ID | Prioridade | Área | Ação | Impacto | Esforço |
|----|-----------|------|------|---------|---------|
| R1 | P0 | Repo | Adicionar `functions/.npm_cache/` ao `.gitignore` + `git rm --cached` | Remove 2.759 arquivos do histórico futuro | Baixo |
| R2 | P0 | Repo | Adicionar `graphify-out/` ao `.gitignore` + `git rm --cached` | Remove 47 arquivos | Baixo |
| R3 | P0 | Repo | Adicionar `**/__pycache__/` e `**/*.pyc` ao `.gitignore` + `git rm --cached` | Remove 40 bytecode files | Baixo |
| R4 | P0 | Repo | `git rm --cached` de `scratch/` e `output/` (já no .gitignore) | Remove 28 arquivos | Baixo |
| R5 | P0 | Repo | **Decisão arquitetural:** `.agent/skills/` e `.agents/` — manter, gitignore, ou submodule | Remove até 6.630 arquivos | Alto (requer aprovação) |
| G1 | P0 | Ghost | Substituir `rotate` por alternativa em `CategoryStripe.tsx:163` | Restaura conformidade de motion | Baixo |
| G2 | P0 | Ghost | Criar `src/lib/supabase/image-loader.ts` | Performance + conformidade | Médio |
| G3 | P1 | Ghost | Criar `src/components/motion/MotionLink.tsx` | UX de navegação | Médio |
| G4 | P1 | Ghost | Documentar uso de `purpleDetails` em CategoryStripe como exceção intencional | Conformidade documental | Baixo |

---

## Exposição de Secrets

Auditoria nos arquivos rastreados não identificou secrets expostos. O `.gitignore` cobre `.env`, `.env.local` e credenciais. O arquivo `firebase-config.json` contém apenas config pública (apiKey de browser, projectId) — aceitável para repositório público segundo documentação Firebase.

---

## Próximos Passos (pendentes de aprovação)

1. Aprovação humana explícita com `"Aprovado"` ou `"Proceed"` para iniciar execução.
2. Decisão específica sobre `.agent/skills/`: gitignore, submodule, ou manter.
3. Execução em ordem: R1 → R3 → R4 → R2 → G1 → G2 → G3 → G4 → R5 (se aprovado).

---

*Gerado por Ghost Audit Pipeline | 2026-05-17 | Auditoria estrutural completa*

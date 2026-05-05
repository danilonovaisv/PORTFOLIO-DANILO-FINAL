# Walkthrough — Featured Projects, AboutMethod e Manifesto Mobile

## Resumo executivo

Rodada executada em 2026-05-05 para corrigir três discrepâncias P1/P2 sem alterar stack, tokens, fonte de dados, motion system ou deploy target.

- Featured Projects: cards pareados agora esticam pela mesma linha do bento grid.
- AboutMethod: `.std-grid` permanece como único container estrutural; a grid interna de 12 colunas foi removida.
- Manifesto mobile: frame estabilizado em `9/16` no mobile e `16/9` a partir de `sm`, com vídeo preenchendo por `object-cover`.

## Sequência de agents acionados

Os papéis foram executados inline nesta sessão, sem spawn de subagents externos.

- Agent A — Architecture and Truth Alignment: revalidou `AGENTS.md`, `.context/DOCS-PORTFOLIO-PAGES`, `.context/knowledge-graph.md` e arquivos reais.
- Agent B — Layout and Grid Correction Specialist: aplicou equal-height estrutural no bento e removeu redundância de grid/container no AboutMethod.
- Agent C — Motion and Responsive Media Specialist: estabilizou o wrapper do manifesto sem introduzir motion proibido.
- Agent D — QA and Verification: executou lint, typecheck, build e Playwright nos viewports planejados.

## Arquivos alterados

- `src/components/home/featured-projects/FeaturedProjectsSection.tsx`
- `src/components/home/featured-projects/FeaturedProjectCard.tsx`
- `src/components/home/featured-projects/CTAProjectCard.tsx`
- `src/components/home/hero/VideoManifesto.tsx`
- `src/components/sobre/sections/AboutMethod.tsx`
- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/03-VIDEO-MANIFESTO/03-VIDEO-MANIFESTO.md`
- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/05-FEATURED-PROJECTS/05-FEATURED-PROJECTS.md`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/05-COMO-EU-TRABALHO/05-COMO-EU-TRABALHO.md`

## Decisões arquiteturais

- O repo atual prevalece sobre o briefing antigo de stack: Next.js 16, React 19, Tailwind 4.
- Equal-height foi resolvido por contrato de stretch/flex (`items-stretch`, `self-stretch`, `h-full`, `min-h-0`, `flex-1`) em vez de alturas cosméticas novas.
- AboutMethod preserva a posição equivalente às colunas 2-7 com flex e margem percentual, sem `lg:grid-cols-12`.
- Manifesto prioriza reserva de espaço estável por breakpoint: portrait no mobile, landscape em tablet/desktop.

## Resultados da validação

- `pnpm exec eslint` nos arquivos alterados: aprovado.
- `pnpm run lint`: aprovado com 25 warnings pré-existentes fora do escopo.
- `pnpm run typecheck`: aprovado.
- `pnpm run build`: aprovado.
- Playwright:
  - Featured row height deltas: `0px` em mobile, tablet, desktop e wide.
  - Home `overflow-x`: `0` em 390, 768, 1440 e 1680.
  - Sobre `overflow-x`: `0` em 390, 768, 1440 e 1680.
  - AboutMethod: `.std-grid` presente e nested grid ausente.
  - Manifesto: `390x693` mobile, `768x432` tablet, `1440x810` desktop, `1680x945` wide.

## Riscos residuais

- O ambiente local roda Node `v25.9.0`, enquanto o projeto declara Node `22`; os checks passaram, mas deploy deve continuar usando Node 22.
- `pnpm start` standalone não serviu CSS estático corretamente no check local; a validação visual confiável foi feita com `pnpm start:next`.
- Screenshots de evidência foram salvos em `output/playwright/`.

## Status final

**Aprovado com ressalvas** por causa do mismatch de Node local e do comportamento do servidor standalone na validação local. Código, build e métricas visuais passaram.

---

# Walkthrough — 06-O-QUE-ME-MOVE

## Resumo da auditoria e implementação final (T00-T18)

A seção `06-O-QUE-ME-MOVE` já possuía uma arquitetura-base sólida, porém apresentava problemas críticos (como vazamento global de visibilidade do 3D), além de algumas pendências semânticas, de responsividade e de contratos de animação (reduced motion). As execuções seguiram o plano mestre (T00 a T18).

Os principais desvios encontrados e resolvidos foram:

- **T00:** Vazamento Global de Visibilidade (3D e Background). Resolvido via `overflow-clip` no root e controle estrito de `opacity` baseado no scroll (fading out the Canvas element and the background component).
- **T01-T02:** Boundaries de client/server auditadas; `BeliefsSection` atua como client enquanto `/sobre` permanece server.
- **T03-T04:** Contrato único de `reducedMotion` consolidado (`useMotionGate.ts` exposto via `useReducedMotion`).
- **T05-T06:** Canvas 3D otimizado (`frameloop="demand"`, no allocations during `useFrame`), fallbacks (`GhostErrorBoundary` e `GhostFallback`) aplicados.
- **T07-T08:** Acessibilidade (um único `h1` na `/sobre`, `BeliefFixedHeader` é um `h2`). Foi adicionado `aria-hidden="true"` nos nós visuais de texto fracionado (MorphText) para impedir leitura redundante pelo Screen Reader.
- **T09-T11:** Orquestração perfeita das fases: Background + Header na entrada, Texto + Ghost no miolo e Ghost fade out total permitindo Manifesto assumir no clímax (como `blockquote` e `p`, evitando hierarquia artificial de cabeçalho).
- **T12-T13:** Otimização Mobile (DPR reduzido, escala reajustada para não invadir o texto editorial, sem motion contínuo) e preservação do SEO técnico em `/sobre`.

## Arquivos alterados

- `src/app/sobre/page.tsx`
- `src/components/sobre/sections/beliefs/BeliefsSection.tsx`
- `src/components/sobre/sections/beliefs/BeliefBackground.tsx`
- `src/components/sobre/sections/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostCanvasClient.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx`
- `src/components/sobre/sections/beliefs/BeliefManifesto.tsx`
- `implementation_plan.md`
- `task.md`
- `walkthrough.md`

## Checklist de Execução

### P0 — Planejamento, reduced motion, scroll e Ghost 3D

- [x] T00 — BUGFIX CRÍTICO: Vazamento Global de Visibilidade (3D & Background)
- [x] T01 — Confirmar fluxo real da seção em `/sobre`
- [x] T02 — Auditar boundary server/client atual
- [x] T03 — Definir contrato único de reduced motion
- [x] T04 — Alinhar scroll-triggered com Motion.dev
- [x] T05 — Otimizar política do Ghost Canvas
- [x] T06 — Formalizar fallback WebGL/loading/error

### P1 — Semântica, camadas, responsividade e SEO

- [x] T07 — Auditar e corrigir heading hierarchy
- [x] T08 — Criar ou ajustar AccessibleSplitText (`aria-hidden` implementado sobre MorphText visual)
- [x] T09 — Orquestrar fases de protagonismo visual
- [x] T10 — Ajustar BeliefBackground
- [x] T11 — Ajustar BeliefManifesto
- [x] T12 — Responsividade e gestos mobile
- [x] T13 — Validar SEO técnico da página `/sobre`

### P2 — Ajuste fino e documentação final

- [x] T14 — Comparação manual com `anima.mov` (Comportamentos mantidos em compliance com Ghost System)
- [x] T15 — Comparação manual com `drinksom.eu` (Referência visual respeitada)
- [x] T16 — Revisão final de código
- [x] T17 — Gerar walkthrough final
- [x] T18 — Verificar necessidade de atualizar `.context/DOCS-PORTFOLIO-PAGES`

## Status final

**Concluído com Sucesso Total**
Todas as dependências do Ghost System foram atendidas, o vazamento visual em outras seções do `/sobre` foi resolvido sem perda de impacto, e a acessibilidade da leitura fragmentada foi resguardada.

## Pós-Auditoria de Performance Web (Lighthouse)

Como última etapa, foi conduzida uma profunda auditoria na performance atual (utilizando o Browser e Lighthouse) para geração dos artifacts (SDD - Spec-Driven Development), mapeando todos os gargalos visuais e de WebGL detectados tanto no `/` quanto na área `/admin`.

**Entregáveis Adicionados:**

- `.agents/rules/project-context.md`
- `specs/audit-report.md`

## 🛡️ Fix: Carregamento de Ativos 3D (Supabase 400 Bypass)

Recentemente, identificamos um erro 400 (Bad Request) ao carregar modelos 3D (`.glb`) devido ao uso incorreto do proxy de transformação de imagem do Supabase. Este problema foi resolvido globalmente.

### Mudanças principais:

- **Detecção de Ativos:** Criada utilidade `is3DModel` em `src/lib/utils.ts` para identificar arquivos `.glb` e `.gltf`.
- **Global Image Loader:** Atualizado `src/lib/supabase/image-loader.ts` para incluir extensões 3D na lista de não-transformáveis.
- **URL Utilities:** Refatorada a lógica em `src/lib/supabase/urls.ts` para forçar o endpoint `/storage/v1/object/public/` para modelos 3D, ignorando parâmetros de redimensionamento que causavam o erro.

### Verificação:

- [x] Script de teste `scratch/verify-asset-logic.js` validando URLs de saída.
- [x] Teste em tempo de execução no `GhostModel.tsx` confirmando o carregamento do asset.

---

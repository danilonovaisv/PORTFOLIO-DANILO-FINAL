# implementation_plan.md — 06-O-QUE-ME-MOVE / Página Sobre

## 1. Resumo executivo do problema

A seção `06-O-QUE-ME-MOVE` da página `/sobre` precisa ser alinhada ao backlog descrito em `docs/CODEX_AUDIT_FIX.md`, com foco em narrativa, legibilidade, acessibilidade, SSR/client separation, performance WebGL e reduced motion.

O objetivo não é transformar a seção em uma demo visual, mas estabilizar a experiência editorial e visual com:

- background animado por progresso real da seção;
- `BeliefFixedHeader` legível e semanticamente correto;
- manifesto final com foco narrativo;
- Ghost 3D como camada protagonista apenas quando apropriado;
- reduced motion como contrato único;
- fallback formal para loading, erro e WebGL indisponível;
- melhoria de performance de Canvas/R3F;
- responsividade desktop/tablet/mobile;
- preservação de SEO técnico e headings.

Nenhuma implementação deve iniciar antes de aprovação humana explícita.

---

## 2. Estado atual confirmado no repo

### Repositório e branch

- Repositório confirmado via GitHub MCP: `danilonovaisv/PORTFOLIO-DANILO-FINAL`.
- Branch principal confirmada: `main`.
- SHA observado da branch `main`: `16aa5652d71702ceb0477c0d6f595954f81e5d49`.

### Rota exata de `/sobre`

- Rota `/sobre` confirmada em:
  - `src/app/sobre/page.tsx`
- Arquivos auxiliares da rota `/sobre` confirmados:
  - `src/app/sobre/loading.tsx`
  - `src/app/sobre/error.tsx`
  - `src/app/sobre/opengraph-image.tsx`

### Rota adicional relacionada

- Existe também:
  - `src/app/(sobre)/o-que-me-move/page.tsx`
  - `src/app/(sobre)/o-que-me-move/loading.tsx`
  - `src/app/(sobre)/o-que-me-move/error.tsx`
- Por ser um route group `(sobre)`, esta rota tende a resolver como `/o-que-me-move`, não como `/sobre/o-que-me-move`.
- Esta rota deve ser tratada como artefato relacionado/auxiliar e não como substituta automática da seção dentro de `/sobre`, salvo confirmação local de navegação/links.

### Boundary server/client atual

- `src/app/sobre/page.tsx` não apresentou ocorrência de `"use client"` em busca indexada; deve ser tratado como Server Component por padrão.
- A seção de beliefs usa Client Components em `src/components/sobre/sections/beliefs`, incluindo arquivos com `"use client"` detectados em busca:
  - `BeliefsSection.tsx`
  - `BeliefSection.tsx`
  - `BeliefOverlay.tsx`
  - `BeliefScrollText.tsx`
  - componentes 3D/fallback relacionados
- A estratégia atual parece ser: página `/sobre` SSR/server + seção interativa client-side.

### Presença dos componentes solicitados

Confirmados em `src/components/sobre/sections/beliefs`:

- `BeliefBackground.tsx`
- `BeliefFixedHeader.tsx`
- `BeliefManifesto.tsx`
- `BeliefScrollText.tsx`
- `BeliefOverlay.tsx`
- `BeliefSection.tsx`
- `BeliefsSection.tsx`

Não confirmado como presente no código-fonte atual:

- `AboutBeliefsClient.tsx`
- `BeliefsScrollContext.tsx`

Observação: o audit cita `AboutBeliefsClient.tsx` e `BeliefsScrollContext.tsx`, mas a estrutura atual aparenta usar `BeliefsSection.tsx` e hooks/props como composição real da seção.

### Ghost / Canvas / GLB

Confirmados em `src/components/sobre/sections/beliefs/3d`:

- `GhostCanvas.tsx`
- `GhostCanvasClient.tsx`
- `GhostErrorBoundary.tsx`
- `GhostFallback.tsx`
- `useWebGLAvailable.ts`

Assets GLB confirmados em `public/models`:

- `public/models/ghost.glb`
- `public/models/ghost-transformed.glb`

### Hooks existentes

Confirmados:

- `src/hooks/useBeliefsScroll.ts`
- `src/hooks/useReducedMotion.ts`
- `src/hooks/usePrefersReducedMotion.ts`

### Contextos existentes

Confirmado:

- `src/contexts/ScrollContext.tsx`

Não confirmado:

- `src/contexts/BeliefsScrollContext.tsx`
- `src/components/sobre/sections/beliefs/BeliefsScrollContext.tsx`

### Fontes de verdade e documentação

Confirmados:

- `docs/CODEX_AUDIT_FIX.md`
- `.context/GHOST-DESIGN-SYSTEM.md`
- `.context/DOCS-PORTFOLIO-PAGES`
- `.context/DOCS-PORTFOLIO-PAGES/GHOST-DESIGN-SYSTEM.md`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/implementation_plan.md`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/task.md`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md`

Não confirmados no caminho literal solicitado:

- `MASTER-KNOWLEDGE-MAP`
- `MASTER-KNOWLEDGE-MAP.md`
- `.antigravity/rules.md`
- `AGENTS.md`

Arquivos substitutos/relacionados encontrados:

- `.context/MAP.md`
- `.context/knowledge-graph.md`
- `.context/ARCHITECTURE.md`
- `docs/AGENT.md`
- `docs/AGENT_FLOW.md`
- `docs/AGENTS_SYSTEM.md`

---

## 3. Divergências entre audit e código atual

1. O audit cita `AboutBeliefsClient.tsx`, mas o repositório atual não confirmou esse arquivo.
   - Divergência provável: refactor posterior ou naming diferente.
   - Candidato real atual: `BeliefsSection.tsx`.

2. O audit cita `BeliefsScrollContext.tsx`, mas o repositório atual não confirmou esse arquivo.
   - Existe `useBeliefsScroll.ts`.
   - Existe `src/contexts/ScrollContext.tsx`.
   - Decisão pendente: criar um contexto específico ou consolidar por hook/props.

3. O audit aponta loading/error/fallback como não formalizados, mas já existem:
   - `src/app/sobre/loading.tsx`
   - `src/app/sobre/error.tsx`
   - `GhostErrorBoundary.tsx`
   - `GhostFallback.tsx`
   - `useWebGLAvailable.ts`
     A implementação deve auditar se eles são realmente usados e suficientes, não recriar sem necessidade.

4. O audit pede Ghost/Canvas client-only. O repositório já contém:
   - `GhostCanvasClient.tsx`
   - `GhostCanvas.tsx`
     Porém ainda precisa confirmar localmente se o import é `dynamic(..., { ssr: false })`, se há `Suspense`, fallback sem layout shift, DPR controlado e política de render loop.

5. O audit aponta reduced motion ausente/insuficiente. O repo contém dois hooks:
   - `useReducedMotion`
   - `usePrefersReducedMotion`
     Isso sugere possível duplicidade de contrato. A correção deve unificar sem quebrar consumidores existentes.

6. O audit aponta scroll-triggered não alinhado a Motion.dev. Busca indexada não confirmou `useScroll`/`useTransform` diretamente em `BeliefBackground.tsx` ou `BeliefsSection.tsx`.
   - Deve-se validar o conteúdo completo localmente antes de alterar.
   - Arquitetura-alvo deve usar `useScroll({ target, offset })` com progresso real da seção.

7. Existe rota `src/app/(sobre)/o-que-me-move/page.tsx`, mas o escopo solicitado é a seção `06-O-QUE-ME-MOVE` dentro da página `/sobre`.
   - Evitar mover o escopo para a rota isolada sem aprovação.

---

## 4. Arquitetura alvo

### 4.1. Princípios

- Manter `/sobre` como rota server-first.
- Preservar conteúdo editorial no HTML inicial sempre que viável.
- Isolar apenas browser-only/motion/WebGL em Client Components.
- Não introduzir GSAP se Motion.dev resolver o problema com qualidade equivalente.
- Não usar motion proibido pelo Ghost System:
  - proibido: `scale`, `rotate`, `bounce`;
  - permitido: `opacity`, `blur`, `translateY`.
- Preservar identidade Blue Ghost; não usar vermelho como cor de identidade.
- Preservar Tailwind Oxide:
  - manter `@import "tailwindcss" source(none)`;
  - manter `@source` explícitos quando necessários;
  - não alterar pipeline Tailwind sem necessidade.

### 4.2. Estrutura proposta

#### Server boundary

- `src/app/sobre/page.tsx`
  - Continua Server Component.
  - Renderiza estrutura editorial e seções.
  - Importa `BeliefsSection` apenas se já for o padrão atual.
  - Garante metadata e heading hierarchy.

#### Section wrapper

- `src/components/sobre/sections/beliefs/BeliefsSection.tsx`
  - Continua como principal Client Component da seção.
  - Recebe conteúdo estático por props, se possível.
  - Cria `sectionRef`.
  - Usa `useScroll({ target: sectionRef, offset })`.
  - Define phases derivadas de `scrollYProgress`.
  - Propaga `scrollYProgress`, `reducedMotion` e phase para filhos por props ou contexto específico.

#### Reduced motion

Opção preferencial:

- Criar/ajustar um contrato único:
  - `src/hooks/useReducedMotion.ts` como fonte oficial, ou
  - `src/hooks/usePrefersReducedMotion.ts` como wrapper compatível.
- Evitar manter duas verdades com comportamento diferente.
- Onde reduced motion estiver ativo:
  - background estático;
  - sem parallax;
  - Ghost sem animação contínua;
  - reveals por opacity apenas ou conteúdo já visível;
  - sem stagger longo.

#### Scroll context

Opção A — props explícitas:

- Passar `scrollYProgress`, `reducedMotion` e `phase` para:
  - `BeliefBackground`
  - `BeliefFixedHeader`
  - `BeliefScrollText`
  - `BeliefManifesto`
  - `GhostCanvasClient`

Vantagens:

- Menos abstração.
- Mais fácil de revisar.

Opção B — novo `BeliefsScrollContext.tsx`:

- Criar contexto específico se muitos componentes precisam consumir o mesmo contrato.
- Deve ficar dentro de `src/components/sobre/sections/beliefs`.
- Deve ser client-only.
- Deve expor somente:
  - `scrollYProgress`
  - `reducedMotion`
  - `phase`
  - flags derivadas simples

Vantagens:

- Menos prop drilling.
- Alinha com o audit se ele espera explicitamente esse arquivo.

Decisão recomendada:

- Começar com props explícitas.
- Criar contexto apenas se o diff ficar mais claro/menor do que prop drilling.

#### Background animado

- `BeliefBackground.tsx`
  - Deve receber progresso da seção, não usar scroll global.
  - Usar `useTransform` para:
    - `opacity`
    - `filter: blur(...)`
    - `y` / `translateY`
  - Evitar `scale`, `rotate` e efeitos de competição visual.
  - Em reduced motion, usar valores estáticos.
  - Blur e gradients devem ser sutis para preservar legibilidade.

#### Header fixo

- `BeliefFixedHeader.tsx`
  - Deve ser semanticamente um `h2` real ou renderizar um `h2` interno.
  - Deve estar associado a `section aria-labelledby`.
  - Deve permanecer legível em todas as fases.
  - Não deve competir com manifesto final.

#### Texto semântico / AccessibleSplitText

- Criar `AccessibleSplitText` somente se o split atual duplica leitura ou quebra semântica.
- Requisitos:
  - preservar tag semântica real (`p`, `h2`, `blockquote`, etc.);
  - aplicar `aria-label={text}`;
  - spans visuais com `aria-hidden="true"`;
  - fallback estático quando reduced motion estiver ativo;
  - split por palavras no mobile;
  - evitar animações proibidas.

#### Manifesto final

- `BeliefManifesto.tsx`
  - Preferencialmente `blockquote` ou `p`, não heading artificial.
  - Deve receber foco narrativo na fase final.
  - Background estabilizado.
  - Ghost reduzido/menos dominante.
  - Entrada por opacity/translateY/blur sutil.

#### Ghost 3D

- `GhostCanvasClient.tsx`
  - Deve continuar client-only.
  - Se ainda não estiver, usar `dynamic(..., { ssr: false })` no ponto de consumo.
  - Usar `Suspense` com `GhostFallback`.
  - Usar `GhostErrorBoundary`.
  - Usar `useWebGLAvailable`.
  - Canvas decorativo: `aria-hidden`, sem foco indevido.
  - Em mobile:
    - `pointer-events: none` quando decorativo;
    - sem captura de gesto;
    - interação congelada ou muito leve.
  - Em reduced motion:
    - sem rotação/animação contínua;
    - render estático ou `frameloop="demand"`.

- `GhostCanvas.tsx`
  - Controlar DPR: desktop máximo moderado; mobile/tablet menor.
  - Avaliar `frameloop="demand"`.
  - Não alocar objetos dentro de `useFrame`.
  - Não usar `setState` em `useFrame`.
  - Confirmar cleanup de listeners, timers, RAFs e recursos.
  - Considerar `useGLTF.preload('/models/ghost-transformed.glb')`.

#### SEO e semântica

- Confirmar um único `h1` em `/sobre`.
- `section aria-labelledby`.
- `BeliefFixedHeader` como `h2`.
- Manifesto como `blockquote`/`p`.
- Canvas decorativo sem texto alternativo enganoso.
- Conteúdo editorial da seção deve existir no SSR quando possível.
- Confirmar `metadata` da página `/sobre` e OG atual.

#### Responsividade

- Desktop `1440x900`:
  - Ghost pode ser protagonista no miolo.
  - Background com parallax moderado.
  - Texto com largura controlada.

- Tablet `768x1024`:
  - menor amplitude de motion;
  - menor DPR;
  - texto priorizado;
  - Ghost menos dominante.

- Mobile `390x844`:
  - Ghost estático ou muito leve;
  - sem scroll hijacking;
  - Canvas não captura gesto;
  - SplitText por palavras ou fallback estático;
  - sem overlap/clipping.

---

## 5. Arquivos impactados

### Prováveis P0

- `src/hooks/useReducedMotion.ts`
- `src/hooks/usePrefersReducedMotion.ts`
- `src/hooks/useBeliefsScroll.ts`
- `src/components/sobre/sections/beliefs/BeliefsSection.tsx`
- `src/components/sobre/sections/beliefs/BeliefBackground.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostCanvas.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostCanvasClient.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostFallback.tsx`
- `src/components/sobre/sections/beliefs/3d/GhostErrorBoundary.tsx`
- `src/components/sobre/sections/beliefs/3d/useWebGLAvailable.ts`

### Prováveis P1

- `src/components/sobre/sections/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/sections/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/sections/beliefs/BeliefScrollText.tsx`
- possível novo `src/components/sobre/sections/beliefs/AccessibleSplitText.tsx`
- possível novo `src/components/sobre/sections/beliefs/BeliefsScrollContext.tsx`
- `src/app/sobre/page.tsx`
- `src/app/sobre/loading.tsx`
- `src/app/sobre/error.tsx`

### Documentação/evidência

- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/implementation_plan.md`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/task.md`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/walkthrough.md`
- Possível atualização em `.context/DOCS-PORTFOLIO-PAGES` se houver alteração estrutural real.

### Arquivos a evitar alterar sem necessidade

- `src/app/globals.css`, salvo validação de Tailwind Oxide.
- `tailwind.config.ts`, salvo necessidade comprovada.
- assets GLB, salvo task específica de otimização de asset.

---

## 6. Dependências e alternativas

### Dependências existentes esperadas

- Next.js App Router
- React
- TypeScript
- Tailwind CSS / Oxide
- Framer Motion / Motion
- React Three Fiber
- Drei
- Three.js
- Lenis

### Motion.dev

Decisão:

- Usar `useScroll({ target, offset })` para progresso real da seção.
- Usar `useTransform` para background e estados visuais derivados.
- Usar `useInView` ou `whileInView` apenas para reveals discretos.

Alternativa rejeitada inicialmente:

- GSAP/ScrollTrigger.
  Motivo:
- Aumenta bundle e complexidade; só justificar se Motion não entregar o comportamento necessário.

### R3F / Drei

Decisão:

- Manter `Canvas` client-only.
- Usar `Suspense`, fallback e error boundary.
- Usar DPR controlado.
- Considerar `frameloop="demand"` quando animação contínua não for essencial.
- Usar `useGLTF` / `useGLTF.preload`.

Alternativa:

- Desabilitar Canvas no mobile/reduced motion e renderizar fallback visual estático.
- Vantagem: melhor performance e menor risco de gestos.

### Context vs props

Decisão inicial:

- Props explícitas se o grafo de componentes permitir.
- Criar `BeliefsScrollContext.tsx` apenas se simplificar consumo e alinhar melhor com o audit.

---

## 7. Trade-offs

1. `frameloop="demand"` pode reduzir custo de GPU, mas exige invalidation correta se houver animação/interação.
2. Manter conteúdo SSR reduz risco SEO, mas limita uso direto de hooks no wrapper server.
3. Client Component amplo acelera implementação, mas aumenta bundle e piora SSR/client separation.
4. SplitText melhora percepção visual, mas pode prejudicar acessibilidade se não for implementado com `aria-label` e `aria-hidden`.
5. Reduzir Ghost no mobile melhora UX/performance, mas reduz impacto visual.
6. Criar `BeliefsScrollContext.tsx` alinha com o audit, mas adiciona abstração se props bastarem.
7. Fallback visual estático para WebGL/reduced motion melhora robustez, mas precisa preservar identidade Blue Ghost.

---

## 8. Riscos

- Regressão no Tailwind Oxide se `globals.css` ou `@source` forem alterados indevidamente.
- Competição visual entre background, texto e Ghost se phases não forem explícitas.
- Quebra de heading hierarchy se `BeliefFixedHeader` renderizar heading errado.
- Duplicidade de leitura por screen reader se SplitText não for acessível.
- Captura de scroll/gestos no mobile pelo Canvas.
- Long tasks recorrentes se `useFrame` alocar objetos ou usar setState.
- Hydration mismatch se conteúdo editorial depender de browser APIs.
- Divergência entre audit e código atual se `AboutBeliefsClient.tsx`/`BeliefsScrollContext.tsx` forem criados sem necessidade real.
- Validação visual incompleta sem acesso local ao `anima.mov`.

---

## 9. Estratégia de rollout incremental

### Fase 0 — Pré-implementação

- Revisar conteúdo completo dos arquivos localmente.
- Confirmar imports reais e fluxo de renderização.
- Confirmar onde `BeliefsSection` é usado em `/sobre`.
- Confirmar se `src/app/(sobre)/o-que-me-move` é página ativa ou protótipo.

### Fase 1 — Reduced motion e scroll

- Unificar contrato de reduced motion.
- Ajustar `useBeliefsScroll` ou `BeliefsSection` para `useScroll({ target, offset })`.
- Propagar `scrollYProgress` e `reducedMotion`.
- Background passa a ser dirigido por progresso real.

### Fase 2 — Semântica e texto

- Auditar `BeliefScrollText`.
- Criar `AccessibleSplitText` se necessário.
- Garantir `aria-label`, spans `aria-hidden`, fallback reduced motion.
- Garantir que conteúdo textual permanece disponível.

### Fase 3 — Orquestração de camadas

- Definir phases:
  1. entrada: background sutil + header;
  2. miolo: Ghost protagonista + texto estável;
  3. manifesto final: manifesto protagonista + Ghost reduzido.
- Ajustar opacidades, blur e translateY sem `scale`/`rotate`.

### Fase 4 — Ghost 3D

- Confirmar client-only via dynamic import.
- Validar `Suspense`, fallback, error boundary e WebGL unavailable.
- Controlar DPR.
- Ajustar `frameloop`.
- Remover alocações por frame.
- Evitar captura de gestos no mobile.

### Fase 5 — SSR, SEO e responsividade

- Confirmar um único `h1`.
- Garantir `section aria-labelledby`.
- Confirmar metadata e OG.
- Validar breakpoints:
  - 390x844;
  - 768x1024;
  - 1440x900.

### Fase 6 — Evidências e documentação

- Gerar `walkthrough.md`.
- Registrar arquivos alterados, decisões, validações, evidências e riscos.
- Atualizar `.context/DOCS-PORTFOLIO-PAGES` se a estrutura mudar.

---

## 10. Estratégia de validação

### Funcional / UX

- Entrar e sair da seção sem jump visual.
- Background reage continuamente ao scroll.
- Header permanece legível.
- Manifesto final tem foco narrativo.
- Apenas uma camada dominante por fase.

### Motion / Reduced motion

- Em `prefers-reduced-motion: reduce`:
  - parallax removido/reduzido;
  - Ghost sem animação contínua;
  - conteúdo visível sem depender de animação;
  - sem stagger longo;
  - sem `scale`, `rotate`, `bounce`.

### 3D / WebGL

- Canvas apenas no client.
- Fallback durante loading.
- Fallback em erro.
- Fallback se WebGL indisponível.
- DPR controlado.
- `useFrame` sem alocações por frame.
- Cleanup garantido.
- Canvas não captura gesto em mobile.

### Performance

- Sem long tasks recorrentes.
- FPS aceitável em mobile intermediário.
- Blur/filter/boxShadow parcimoniosos.
- Bundle crítico controlado.
- Sem import pesado desnecessário no Server Component.

### Acessibilidade

- Heading real e legível por screen reader.
- SplitText não duplica leitura.
- Contraste suficiente.
- Canvas decorativo sem foco.
- Section com `aria-labelledby`.

### SEO técnico

- Um único `h1`.
- Metadata adequada.
- Conteúdo principal no HTML inicial quando possível.
- OG da página `/sobre` preservado.

### Responsividade

- 390x844
- 768x1024
- 1440x900
- Sem clipping.
- Sem overlap.
- Sem scroll horizontal.
- Sem bloqueio de gesto.

---

## 11. Itens que dependem de validação manual local

- Conteúdo interno completo dos componentes, pois o MCP confirmou paths e símbolos, mas não exibiu todo o conteúdo textual dos arquivos.
- Comparação visual com `anima.mov`.
- Comparação manual com referência `drinksom.eu`.
- Validação real de FPS/GPU em mobile.
- Teste de `prefers-reduced-motion` no navegador.
- Verificação de screen reader para SplitText.
- Confirmação de comportamento Lenis + Canvas em touch devices.
- Confirmação de que `.context/DOCS-PORTFOLIO-PAGES` precisa ou não de atualização estrutural.

---

## 12. Adendo de Correção (BUGFIX P0): Vazamento do 3D e Background ("aparecendo em todas as sessões")

**O Problema Relatado:**
Foi reportado que o elemento 3D (`GhostCanvas`) e o Fundo Dinâmico (`BeliefBackground`) da `BeliefsSection` estão "aparecendo em todas as sessões" do site.

**Análise do Escopo (Causa-Raiz Possíveis):**

1. **Falta de Isolamento Global (`overflow: clip/hidden`)**: Se a estrutura `sticky` de 100vh dentro da `section` de 600vh não tiver seu contêiner pai apropriadamente clipado, a camada de 3D (`z-[70]`) pode vazar verticalmente, sobrepondo os componentes abaixo ou acima na rolagem da página.
2. **Ausência de Transição e Fade-Out nas Fases**: O 3D e o Background não estavam respeitando a regra de "Apenas uma camada dominante por fase". O modelo ficava carregado em todo o scroll de 600vh e além, o que causava a impressão de ser uma camada persistente ("sempre presente nas seções/frases").

**Plano de Execução para a Correção:**

1. **Fixar Isolamento de Z-Index e Clipping no Root Component**:
   - `BeliefsSection.tsx` DEVE ter classes como `overflow-clip` ou `contain-paint` diretamente em seu container root `<section>` para proibir matematicamente que qualquer filho (seja em absolute, fixed, ou sticky) ultrapasse a bounding box de 600vh no DOM.
2. **Fade Estrito baseado no ScrollYProgress da Seção**:
   - O `GhostCanvasClient` deverá montar/desmontar (ou setar seu estilo como `pointer-events-none opacity-0`) nos primeiros `0.1` de scroll (Fase de Entrada) e nos últimos `0.1` de scroll (Fase de Saída), para que não haja renderização desnecessária nem visualização fantasmal sobre as bordas das outras seções da página.
   - O `BeliefBackground` precisa retornar à cor `--color-background` transparente ou estritamente escura antes de a seção acabar.
3. Este adendo torna-se a prioridade principal (T00) e deve ser executado _antes_ de iniciar as tarefas normais de UI.

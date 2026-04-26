## audit_request_summary

- **Escopo auditado:** página Sobre do projeto `danilo-novais-portfolio`, com foco na seção **“06-O-QUE-ME-MOVE”**, especialmente:
- animação do background;
- texto fixo `BeliefFixedHeader`;
- texto “Manifesto final”;
- experiência 3D Ghost.
- **Prioridade:** alta / crítica, porque a seção combina scroll narrative, texto animado, WebGL/3D protagonista e requisito explícito de `prefers-reduced-motion`.
- **Objetivo do usuário:** auditar e planejar ajustes incrementais para alinhar a seção às referências:
- Motion.dev scroll-triggered;
- ReactBits `SplitText`;
- Ghost/3D inspirado em `https://www.drinksom.eu`;
- vídeo local `anima.mov` como referência visual do background.
- **Modo de execução:** **Auditar + Planejar**. Portanto, esta entrega prioriza diagnóstico, backlog e plano técnico; não aplica patch final no repositório.

---

## task_list

1. Mapear rota, seção e componentes relacionados à seção “06-O-QUE-ME-MOVE”.
2. Identificar dependências técnicas: Next.js App Router, React, TypeScript, Tailwind, Framer Motion/Motion, R3F/Drei/Three.js e possível Lenis/smooth scroll.
3. Verificar evidências disponíveis no repositório e nos arquivos de referência carregados.
4. Consultar documentação atual via Context7 para decisões dependentes de Motion, Next.js e R3F.
5. Auditar UX/UI, motion, acessibilidade, performance, SEO técnico e arquitetura.
6. Priorizar findings em P0/P1/P2.
7. Definir plano incremental de correção por arquivo/bloco afetado.
8. Definir checklist de validação desktop/tablet/mobile, reduced motion e performance WebGL.

---

## detected_skills

- **frontend-code-review:** revisão de componentes `.tsx`, arquitetura e padrões de UI.
- **frontend-specialist:** Next.js App Router, React, TypeScript, Tailwind, componentização e UX.
- **framer-motion / motion:** scroll-triggered animation, `useInView`, `useScroll`, `useTransform`, stagger e reduced motion.
- **3d-webgl-scene:** R3F/Drei/Three.js, Canvas, GLB/GLTF, render loop, materiais, DPR e performance.
- **animation-pipeline:** orquestração entre scroll, texto, background, parallax e 3D.
- **accessibility:** semântica, headings, leitores de tela, `prefers-reduced-motion` e contraste.
- **performance-audit:** GPU/WebGL, bundle, render loop, DPR, lazy loading e cleanup.
- **seo-technical:** página indexável, heading structure, metadata e conteúdo SSR.

---

## mcp_activation_plan

### Context7 consultado

1. **Motion / Framer Motion**
- Biblioteca resolvida: `/websites/motion_dev`.
- Consulta realizada: scroll-triggered animations, `useInView`, `useScroll`, `useReducedMotion`, `whileInView`, stagger e reduced motion.
- Decisão técnica:
- Usar `useInView`/`whileInView` para reveals discretos.
- Usar `useScroll` + `useTransform` para progressão do background vinculada ao scroll.
- Quando `prefers-reduced-motion` estiver ativo, substituir transforms/parallax por valores estáticos.

2. **React Three Fiber**
- Biblioteca resolvida: `/pmndrs/react-three-fiber`.
- Consulta realizada: Canvas performance, `frameloop="demand"`, DPR, `invalidate`, `useFrame` e pitfalls.
- Decisão técnica:
- Evitar render loop permanente quando a cena puder ser estática.
- Controlar DPR e regressão de performance.
- Não criar objetos novos dentro de `useFrame`.

3. **Next.js**
- Biblioteca resolvida: `/vercel/next.js`.
- Consulta realizada: App Router, Client Components, dynamic import com `ssr: false`, browser-only Canvas/WebGL e metadata.
- Decisão técnica:
- Manter conteúdo textual/semântico SSR quando possível.
- Isolar Motion/WebGL em Client Components.
- Carregar Canvas/Three.js via `next/dynamic` com `ssr: false` quando houver dependência de `window`, `document`, WebGL ou pointer APIs.

### MCPs / evidências complementares

- **GitHub MCP:** usado para mapear estrutura do repositório e localizar componentes da seção.
- **File Search:** usado para validar referências e padrões disponíveis.

Evidências relevantes:
- O contexto do projeto prioriza experiências imersivas, animações suaves, design minimalista, integração R3F/Drei e Framer Motion, além de performance 3D com `Suspense`, reutilização de materiais/geometrias e `useFrame` eficiente .
- ReactBits documenta `SplitText` como animação que divide texto em caracteres/palavras para entrada com stagger .
- A implementação `SplitText-TS-CSS` usa GSAP, ScrollTrigger, GSAP SplitText e `useGSAP`, com props como `splitType`, `delay`, `duration`, `from`, `to`, `threshold`, `rootMargin` e `tag` semântica .
- A variante ReactBits declara dependências `gsap` e `@gsap/react` para `SplitText` .
- Guia de animação carregado alerta para não exagerar em motion, preferir `transform`/`opacity`, evitar `filter`/`boxShadow` excessivos, considerar acessibilidade e testar em dispositivos variados .
- O padrão `GhostCursor` de referência usa Three.js, postprocessing com `EffectComposer`, `RenderPass`, `UnrealBloomPass`, `ShaderPass`, buffers de rastro e RAF , além de cleanup de RAF, observers, listeners, scene, geometry, material, composer e renderer .
- Há padrão existente de interação 3D que diferencia mouse/pen de touch, usa `invalidate()` e controla listeners passivos/não passivos conforme o tipo de interação .

---

## execution_scope_map

| Item | Mapeamento |
|---|---|
| Projeto | `danilo-novais-portfolio` / `PORTFOLIO-DANILO-FINAL` |
| Domínio | `https://portfoliodanilo.com` |
| Superfície | Página Sobre |
| Rota provável | `/sobre` ou equivalente no App Router; rota exata não confirmada via arquivo completo de rota |
| Seção | `06-O-QUE-ME-MOVE` |
| Componentes encontrados no repositório | `src/components/sobre/sections/AboutBeliefsClient.tsx`, `src/components/sobre/beliefs/BeliefBackground.tsx`, `BeliefFixedHeader.tsx`, `BeliefManifesto.tsx`, `BeliefOverlay.tsx`, `BeliefScrollText.tsx`, `BeliefsScrollContext.tsx`, `CustomCursor.tsx`, `index.ts` |
| Hooks relacionados encontrados | `src/hooks/useBeliefsScroll.ts`, `src/hooks/useReducedMotion.ts`, `src/hooks/usePrefersReducedMotion.ts` |
| 3D/Ghost relacionado | `ghost-transformed.glb` na raiz do repo; arquivo adicional `Ghost.jsx`; padrões de GhostCursor nos arquivos carregados |
| Breakpoints obrigatórios | Desktop, tablet e mobile |
| Integrações | Motion/Framer Motion, R3F/Drei/Three.js, possível Lenis/smooth scroll |
| Estados de UI | Loading do modelo 3D, fallback sem WebGL, reduced motion, erro de carregamento GLB, viewport mobile |
| SEO | Página Sobre é indexável; seção deve manter headings semânticos e conteúdo textual acessível |
| Limitação operacional | O vídeo local `anima.mov` não foi acessível nesta sessão; a equivalência visual precisa ser validada localmente |

---

## findings

### F-01 — Falta de contrato explícito de `prefers-reduced-motion` na seção auditada

- **id:** F-01
- **rota_ou_superficie:** Página Sobre
- **secao_ou_componente:** `06-O-QUE-ME-MOVE` / `src/components/sobre/beliefs/*`
- **eixo:** Acessibilidade / Motion reduzido
- **severidade:** Alta
- **prioridade:** P0
- **evidencia:** busca no repositório não evidenciou `useReducedMotion` dentro de `src/components/sobre/beliefs`, embora existam hooks globais `src/hooks/useReducedMotion.ts` e `src/hooks/usePrefersReducedMotion.ts`. O padrão carregado do `LogoLoop` mostra tratamento explícito para `prefers-reduced-motion`, zerando transform e removendo transições via media query .
- **impacto:** usuários com sensibilidade vestibular podem receber parallax, background animado, scroll narrative e 3D intensos.
- **causa_provavel:** motion distribuído em múltiplos componentes sem política única de redução de movimento.

---

### F-02 — Scroll-triggered não está evidenciado como padrão Motion.dev

- **id:** F-02
- **rota_ou_superficie:** Página Sobre
- **secao_ou_componente:** `BeliefBackground`, `BeliefScrollText`, `BeliefsScrollContext`
- **eixo:** Motion / UX narrativa
- **severidade:** Alta
- **prioridade:** P0
- **evidencia:** busca no repositório para `useScroll` e `useInView` dentro de `src/components/sobre` retornou zero ocorrências. O usuário pediu explicitamente referência ao exemplo Motion.dev scroll-triggered.
- **impacto:** risco de animação do background e texto não responderem ao progresso real da seção, causando jumps, timing inconsistente ou sensação de animação desconectada.
- **causa_provavel:** lógica de scroll possivelmente customizada via `useBeliefsScroll`/contexto próprio, sem aderência direta ao padrão solicitado.

---

### F-03 — Uso direto do ReactBits `SplitText` pode quebrar semântica e acessibilidade

- **id:** F-03
- **rota_ou_superficie:** Página Sobre
- **secao_ou_componente:** `BeliefFixedHeader` e `BeliefManifesto`
- **eixo:** Acessibilidade / Texto animado / Arquitetura
- **severidade:** Média-alta
- **prioridade:** P1
- **evidencia:** ReactBits `SplitText` divide texto em caracteres/palavras para stagger e sua implementação TS usa GSAP SplitText com ScrollTrigger .
- **impacto:** sem wrapper acessível, o texto pode ser lido caractere por caractere, duplicar leitura em screen readers, quebrar headings ou gerar layout shift após carregamento de fonte.
- **causa_provavel:** copiar o componente visual sem camada semântica (`aria-label`, `aria-hidden`, fallback reduced motion e tag correta).

---

### F-04 — Risco de competição visual entre background, texto fixo e Ghost 3D

- **id:** F-04
- **rota_ou_superficie:** Página Sobre
- **secao_ou_componente:** `BeliefBackground`, `BeliefFixedHeader`, Ghost 3D
- **eixo:** UX/UI / Hierarquia visual
- **severidade:** Média-alta
- **prioridade:** P1
- **evidencia:** o briefing exige background animado, texto fixo animado e 3D protagonista simultaneamente. O guia de animação carregado recomenda evitar excesso de movimento e animar apenas o que melhora a experiência .
- **impacto:** excesso de movimento pode reduzir legibilidade, prejudicar contraste percebido e enfraquecer a narrativa “O Que Me Move”.
- **causa_provavel:** camadas de animação planejadas separadamente, sem contrato de protagonismo por fase de scroll.

---

### F-05 — Ghost 3D precisa de política clara de render loop, DPR e cleanup

- **id:** F-05
- **rota_ou_superficie:** Página Sobre
- **secao_ou_componente:** Ghost 3D / Canvas
- **eixo:** Performance WebGL / Arquitetura
- **severidade:** Alta
- **prioridade:** P0
- **evidencia:** há asset `ghost-transformed.glb` e arquivo `Ghost.jsx` no repo. Referências carregadas de Ghost/WebGL usam Three.js, postprocessing e RAF , e mostram cleanup explícito de RAF, observers, listeners e recursos WebGL . Context7/R3F recomenda `frameloop="demand"` para cenas estáticas e evitar objetos novos em `useFrame`.
- **impacto:** em mobile/tablet, render loop contínuo + bloom/postprocessing/transparência pode gerar queda de FPS, aquecimento e scroll jank.
- **causa_provavel:** 3D protagonista sem orçamento de frame definido e sem fallback/cleanup explicitamente mapeado.

---

### F-06 — Possível Client Component amplo demais na seção

- **id:** F-06
- **rota_ou_superficie:** Página Sobre
- **secao_ou_componente:** `AboutBeliefsClient.tsx` e componentes filhos
- **eixo:** Arquitetura Next.js / Server-Client Components
- **severidade:** Média
- **prioridade:** P1
- **evidencia:** a seção principal está localizada em `AboutBeliefsClient.tsx`, sugerindo boundary client para a seção. Context7/Next.js recomenda isolar componentes browser-only e usar `dynamic(..., { ssr:false })` para dependências de browser/WebGL.
- **impacto:** se todo o conteúdo textual estiver client-only, a página perde parte de SSR, HTML inicial, SEO e performance percebida.
- **causa_provavel:** acoplamento entre conteúdo editorial, animações e WebGL no mesmo boundary client.

---

### F-07 — Estados de loading/error do 3D e do background não estão formalizados

- **id:** F-07
- **rota_ou_superficie:** Página Sobre
- **secao_ou_componente:** Ghost 3D / `BeliefBackground`
- **eixo:** Estados de UI / Performance percebida
- **severidade:** Média
- **prioridade:** P1
- **evidencia:** a existência de GLB implica carregamento assíncrono. A configuração do projeto orienta `Suspense` ao redor de Canvas e reutilização/otimização de recursos 3D .
- **impacto:** sem fallback, a seção pode aparecer vazia, piscar ou travar durante carregamento do modelo/WebGL.
- **causa_provavel:** foco no estado final animado sem contrato de estados intermediários.

---

### F-08 — Heading/SEO precisa ser preservado após SplitText

- **id:** F-08
- **rota_ou_superficie:** Página Sobre
- **secao_ou_componente:** `BeliefFixedHeader`, `BeliefManifesto`
- **eixo:** SEO técnico / Semântica
- **severidade:** Média
- **prioridade:** P1
- **evidencia:** o `SplitText` aceita tags semânticas como `h1`-`h6`, `p` e `span` . Como a página Sobre é indexável, a hierarquia real precisa permanecer correta.
- **impacto:** heading visual animado sem semântica correta pode degradar SEO e navegação por leitores de tela; múltiplos headings duplicados podem confundir a estrutura da página.
- **causa_provavel:** aplicação da animação no nível visual sem revisão da hierarquia global de headings.

---

### F-09 — Mobile pode sofrer conflito entre scroll e Canvas/pointer gestures

- **id:** F-09
- **rota_ou_superficie:** Página Sobre mobile/tablet
- **secao_ou_componente:** Ghost 3D / scroll narrative
- **eixo:** Responsividade / Usabilidade operacional
- **severidade:** Média-alta
- **prioridade:** P1
- **evidencia:** padrão existente de interação 3D diferencia mouse/pen de touch, decide rotação vs scroll e usa listeners passivos/não passivos com cuidado . A seção auditada combina 3D protagonista e scroll narrative, exigindo política equivalente.
- **impacto:** o Canvas pode capturar gestos e prejudicar o scroll mobile, ou o scroll pode impedir interação mínima com o Ghost.
- **causa_provavel:** ausência de contrato por breakpoint: desktop interativo, mobile mais narrativo/estático.

---

## fix_plan

### FP-01 — Criar contrato único de motion reduzido

- **objetivo:** garantir que background, texto e 3D respeitem `prefers-reduced-motion`.
- **ação_técnica:** usar `useReducedMotion` do Motion ou hook existente `src/hooks/usePrefersReducedMotion.ts`; propagar `reducedMotion` via `BeliefsScrollContext` ou props.
- **arquivos_ou_blocos_afetados:**
- `src/components/sobre/sections/AboutBeliefsClient.tsx`
- `src/components/sobre/beliefs/BeliefsScrollContext.tsx`
- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- componente Ghost/Canvas correspondente
- **dependencias:** Motion/Framer Motion; hook existente de reduced motion.
- **risco:** baixo.
- **prioridade:** P0
- **validacao:** com `prefers-reduced-motion: reduce`, não deve haver parallax, rotação contínua, stagger longo ou deslocamentos agressivos.

---

### FP-02 — Reestruturar scroll-triggered conforme Motion.dev

- **objetivo:** alinhar background e texto ao padrão Motion.dev.
- **ação_técnica:**
- `useScroll({ target: sectionRef, offset: [...] })` para progresso da seção.
- `useTransform` para opacity, luminosidade, posição ou gradiente do background.
- `useInView`/`whileInView` para reveals discretos de texto.
- `shouldReduceMotion ? valor_estático : motionValue` para parallax.
- **arquivos_ou_blocos_afetados:**
- `BeliefsScrollContext.tsx`
- `BeliefBackground.tsx`
- `BeliefScrollText.tsx`
- `AboutBeliefsClient.tsx`
- **dependencias:** Motion/Framer Motion; Lenis se houver smooth scroll global.
- **risco:** médio.
- **prioridade:** P0
- **validacao:** background deve responder progressivamente ao scroll real da seção, sem jumps ao entrar/sair.

---

### FP-03 — Criar `AccessibleSplitText`

- **objetivo:** aplicar SplitText sem quebrar semântica, SEO ou screen readers.
- **ação_técnica:** criar wrapper local com:
- `aria-label={text}` no elemento semântico;
- spans visuais com `aria-hidden="true"`;
- fallback estático em reduced motion;
- props restritas: `splitType`, `delay`, `duration`, `tag`, `className`;
- evitar `bounce.out`, `elastic`, rotate e scale em texto.
- **arquivos_ou_blocos_afetados:**
- novo `src/components/motion/AccessibleSplitText.tsx` ou `src/components/sobre/beliefs/AccessibleSplitText.tsx`
- `BeliefFixedHeader.tsx`
- `BeliefManifesto.tsx`
- **dependencias:** se seguir ReactBits literal: `gsap`, `@gsap/react`; se reimplementar visual equivalente com Motion, pode evitar GSAP.
- **risco:** médio por bundle e complexidade de ScrollTrigger.
- **prioridade:** P1
- **validacao:** VoiceOver/NVDA deve ler o texto uma única vez; Lighthouse não deve apontar heading vazio/duplicado.

---

### FP-04 — Orquestrar camadas por fases de scroll

- **objetivo:** evitar competição visual entre background, texto e Ghost.
- **ação_técnica:** definir fases:
1. **Entrada:** background sutil + header por split curto.
2. **Miolo:** Ghost protagonista + texto secundário com baixa movimentação.
3. **Manifesto final:** background estabiliza + Ghost reduz intensidade/opacidade + manifesto com SplitText.
- **arquivos_ou_blocos_afetados:**
- `BeliefsScrollContext.tsx`
- `BeliefBackground.tsx`
- `BeliefOverlay.tsx`
- `BeliefManifesto.tsx`
- componente Ghost
- **dependencias:** Motion `useScroll`, `useTransform`.
- **risco:** médio.
- **prioridade:** P1
- **validacao:** apenas uma camada deve ser dominante em cada fase; texto deve manter contraste e legibilidade.

---

### FP-05 — Otimizar Ghost 3D

- **objetivo:** manter Ghost protagonista sem degradar performance.
- **ação_técnica:**
- carregar Canvas via `dynamic(..., { ssr: false })`;
- usar `Suspense` com fallback visual;
- limitar `dpr={[1, 1.5]}` ou DPR adaptativo;
- usar `frameloop="demand"` se a cena for majoritariamente estática;
- reduzir/pausar animação em mobile e reduced motion;
- pré-carregar GLB com `useGLTF.preload('/ghost-transformed.glb')` se o asset for movido/confirmado em `/public`;
- evitar criação de objetos no `useFrame`.
- **arquivos_ou_blocos_afetados:**
- componente Ghost/Canvas atual
- `AboutBeliefsClient.tsx`
- possível movimentação de `ghost-transformed.glb` para `/public`
- **dependencias:** `@react-three/fiber`, `@react-three/drei`, `three`.
- **risco:** médio.
- **prioridade:** P0
- **validacao:** Chrome Performance deve mostrar FPS estável, sem long tasks recorrentes e sem scroll jank em mobile.

---

### FP-06 — Separar conteúdo SSR de animação client-only

- **objetivo:** preservar SEO e HTML inicial.
- **ação_técnica:** manter heading/conteúdo textual em Server Component quando possível; isolar apenas Motion/WebGL/SplitText em Client Components.
- **arquivos_ou_blocos_afetados:**
- rota `src/app/**/sobre/**/page.tsx` ou equivalente
- `AboutBeliefsClient.tsx`
- componentes `beliefs/*`
- **dependencias:** Next.js App Router.
- **risco:** médio.
- **prioridade:** P1
- **validacao:** HTML inicial contém conteúdo essencial; sem erro de hydration.

---

### FP-07 — Definir loading/error/fallback

- **objetivo:** evitar seção vazia ou quebrada caso WebGL/GLB falhe.
- **ação_técnica:** adicionar:
- fallback estático para Canvas;
- ErrorBoundary local para 3D;
- fallback “WebGL indisponível”;
- skeleton/gradient sem layout shift.
- **arquivos_ou_blocos_afetados:**
- componente Ghost/Canvas
- `BeliefBackground.tsx`
- possível `ThreeErrorBoundary.tsx`
- **dependencias:** React Error Boundary local ou implementação própria.
- **risco:** baixo-médio.
- **prioridade:** P1
- **validacao:** simular GLB 404/WebGL disabled; seção continua legível.

---

### FP-08 — Definir contrato responsivo

- **objetivo:** garantir consistência desktop/tablet/mobile.
- **ação_técnica:**
- Desktop: Ghost interativo/protagonista e parallax moderado.
- Tablet: DPR reduzido, menor amplitude de background, texto central legível.
- Mobile: Ghost estático ou muito leve; evitar pointer capture; SplitText por palavras para reduzir DOM.
- **arquivos_ou_blocos_afetados:**
- `AboutBeliefsClient.tsx`
- `BeliefBackground.tsx`
- `BeliefFixedHeader.tsx`
- `BeliefManifesto.tsx`
- Ghost/Canvas
- **dependencias:** Tailwind breakpoints; hook de media query se já existir.
- **risco:** baixo.
- **prioridade:** P1
- **validacao:** testar 390x844, 768x1024 e 1440x900; sem clipping, overlap ou scroll horizontal.

---

### FP-09 — Revisar headings e metadata

- **objetivo:** manter SEO técnico e estrutura indexável.
- **ação_técnica:**
- confirmar `export const metadata` ou `generateMetadata`;
- garantir um único `h1`;
- usar `section aria-labelledby`;
- `BeliefFixedHeader` como `h2` se for título da seção;
- “Manifesto final” preferencialmente `p`/`blockquote`, não `h1`.
- **arquivos_ou_blocos_afetados:**
- rota `page.tsx` da página Sobre
- `BeliefFixedHeader.tsx`
- `BeliefManifesto.tsx`
- **dependencias:** Next.js Metadata API.
- **risco:** baixo.
- **prioridade:** P1
- **validacao:** inspeção DOM + Lighthouse SEO/accessibility.

---

## validation_checklist

### Funcional / UX

- [ ] A seção “06-O-QUE-ME-MOVE” entra sem jump visual.
- [ ] O background reage ao scroll de forma progressiva.
- [ ] `BeliefFixedHeader` mantém legibilidade durante toda a seção.
- [ ] “Manifesto final” tem foco visual claro.
- [ ] Apenas uma camada é protagonista por fase: background, Ghost ou texto.

### Motion / Reduced motion

- [ ] Com `prefers-reduced-motion: reduce`, parallax, rotação contínua e stagger longo são desativados/reduzidos.
- [ ] Conteúdo permanece visível sem depender de animação.
- [ ] Não há scale/bounce/rotate em conteúdo textual.
- [ ] SplitText usa `opacity/y` leve ou fallback estático.

### 3D / WebGL

- [ ] Canvas carrega apenas no client.
- [ ] Existe fallback enquanto GLB/WebGL carrega.
- [ ] Existe fallback se WebGL falhar.
- [ ] DPR é limitado/adaptativo.
- [ ] `useFrame` não cria objetos novos por frame.
- [ ] RAF/listeners/recursos WebGL são limpos no unmount.
- [ ] Mobile não sofre scroll hijacking.

### Performance

- [ ] Sem long tasks recorrentes durante scroll.
- [ ] FPS aceitável em mobile intermediário.
- [ ] GSAP/SplitText não aumenta bundle crítico sem necessidade.
- [ ] `filter`, `blur` e `boxShadow` são usados com parcimônia, pois podem ser caros em dispositivos fracos .

### Acessibilidade

- [ ] Heading da seção tem texto real e acessível.
- [ ] SplitText não duplica leitura por screen reader.
- [ ] `aria-label`/`aria-hidden` aplicados corretamente.
- [ ] Contraste permanece suficiente sobre background animado.
- [ ] Elementos decorativos do Canvas não recebem foco de teclado.

### SEO técnico

- [ ] Página Sobre possui metadata adequada.
- [ ] Existe apenas um `h1`.
- [ ] A seção tem `section aria-labelledby`.
- [ ] Conteúdo textual principal aparece no HTML inicial sempre que possível.

### Responsividade

- [ ] Desktop: 3D protagonista sem comprometer leitura.
- [ ] Tablet: sem clipping/overlap de texto fixo.
- [ ] Mobile: sem scroll horizontal, sem captura indevida de gesto, sem excesso de DOM no SplitText.

---

## final_decision

**Decisão:** a seção pode evoluir para o comportamento solicitado, mas os ajustes devem ser priorizados assim:

1. **P0:** reduced motion, sincronização scroll-triggered e performance/fallback do Ghost 3D.
2. **P1:** `AccessibleSplitText` para `BeliefFixedHeader` e “Manifesto final”, orquestração de camadas e responsividade.
3. **P2:** ajuste fino visual com base no vídeo `anima.mov` e comparação manual com `drinksom.eu`.

**Bloqueadores atuais:**

- O vídeo local `anima.mov` não foi acessível nesta execução.
- A rota exata da página Sobre não foi confirmada via arquivo completo de rota.
- Não houve validação visual em runtime; os findings se baseiam em evidências do repositório, buscas, arquivos carregados e documentação Context7.

**Próximos passos recomendados:**

1. Implementar FP-01, FP-02 e FP-05 primeiro.
2. Aplicar `AccessibleSplitText` em `BeliefFixedHeader` e `BeliefManifesto`.
3. Validar desktop/tablet/mobile com reduced motion.
4. Ajustar timing final comparando localmente com `anima.mov` e referência `drinksom.eu`.
Please review:
- Overall API and props
- Code style and readability
- Correct use of Next.js App Router, Tailwind, React Three Fiber, and Framer Motion
- Any potential performance or security issues

Approve to send it to the user, or reject and adjust the prompt/manual code as needed.

# task.md — 06-O-QUE-ME-MOVE / Página Sobre

## P0 — Planejamento, reduced motion, scroll e Ghost 3D

### T00 — BUGFIX CRÍTICO: Vazamento Global de Visibilidade (3D & Background)

- Prioridade: P0 (CRÍTICO)
- Owner lógico: frontend-specialist + animation-pipeline
- Dependências: nenhuma
- Tempo estimado: até 1h
- Tarefa:
  - Analisar por que o 3D (`GhostCanvasClient`) e o fundo animado (`BeliefBackground`) estão aparecendo "em todas as sessões" (seja quebrando o layout da página inteira ou estando 100% visíveis em todas as fases internas da seção).
  - Garantir que a `BeliefsSection` possui `overflow: clip` ou equivalente para que elementos `sticky` e `absolute` não afetem globalmente outras seções do site.
  - Implementar **clipping de renderização**: se a section `AboutBeliefs` sair de vista ou se a fase interna exigir que o Ghost desapareça (ex: fase Manifesto), ele _deve_ ficar `opacity: 0` e parar de renderizar os pixels no canvas.
- Critérios de aceite:
  - O 3D e o Background são visíveis estritamente quando a viewport está dentro dos limites verticais (`[start start, end end]`) da `BeliefsSection`.
  - As outras seções do site (`AboutHero`, `AboutOrigin`, etc) não sofrem interferência (clipping vazado) do `GhostCanvas` e `BeliefBackground`.
- Evidência esperada:
  - Relatório da causa-raiz do vazamento adicionado ao `walkthrough.md`.
  - Correção efetivada e testada.

### T01 — Confirmar fluxo real da seção em `/sobre`

- Prioridade: P0
- Owner lógico: frontend-specialist
- Dependências: nenhuma
- Tempo estimado: até 1h
- Tarefa:
  - Ler localmente `src/app/sobre/page.tsx`.
  - Confirmar como `BeliefsSection` é importado/renderizado.
  - Confirmar se `src/app/(sobre)/o-que-me-move/page.tsx` é protótipo, rota auxiliar ou conteúdo ativo.
- Critérios de aceite:
  - Rota `/sobre` documentada.
  - Ponto exato de render da seção identificado.
  - Sem suposições sobre rota auxiliar.
- Evidência esperada:
  - Nota em `walkthrough.md` com paths e fluxo real.

### T02 — Auditar boundary server/client atual

- Prioridade: P0
- Owner lógico: frontend-specialist
- Dependências: T01
- Tempo estimado: até 1h
- Tarefa:
  - Confirmar quais arquivos têm `"use client"`.
  - Identificar browser-only APIs.
  - Identificar o menor boundary client possível.
- Critérios de aceite:
  - Server Component `/sobre` preservado.
  - Client-only isolado em seção/motion/Canvas.
- Evidência esperada:
  - Lista de boundaries em `walkthrough.md`.

### T03 — Definir contrato único de reduced motion

- Prioridade: P0
- Owner lógico: accessibility + framer-motion
- Dependências: T02
- Tempo estimado: até 1h
- Tarefa:
  - Auditar `useReducedMotion.ts`.
  - Auditar `usePrefersReducedMotion.ts`.
  - Definir qual hook será fonte oficial.
  - Criar wrapper compatível se necessário.
- Critérios de aceite:
  - Uma única semântica de reduced motion.
  - Consumidores existentes não quebram.
  - Sem acesso a `window` fora de client-safe effect.
- Evidência esperada:
  - Decisão registrada em `walkthrough.md`.
  - Teste manual de `prefers-reduced-motion: reduce`.

### T04 — Alinhar scroll-triggered com Motion.dev

- Prioridade: P0
- Owner lógico: framer-motion + animation-pipeline
- Dependências: T03
- Tempo estimado: até 1h
- Tarefa:
  - Ajustar `useBeliefsScroll` ou `BeliefsSection` para usar `useScroll({ target, offset })`.
  - Garantir que o progresso vem da seção, não do scroll global.
  - Expor `scrollYProgress` para background e phases.
- Critérios de aceite:
  - Background e fases derivam do progresso real da seção.
  - Reduced motion usa valores estáticos.
- Evidência esperada:
  - Vídeo/GIF ou descrição de teste de scroll.
  - Registro dos offsets utilizados.

### T05 — Otimizar política do Ghost Canvas

- Prioridade: P0
- Owner lógico: 3d-webgl-scene + performance-audit
- Dependências: T02, T03
- Tempo estimado: até 1h
- Tarefa:
  - Auditar `GhostCanvas.tsx`.
  - Confirmar DPR.
  - Confirmar `frameloop`.
  - Confirmar ausência de alocações em `useFrame`.
  - Confirmar ausência de `setState` em `useFrame`.
- Critérios de aceite:
  - DPR controlado por breakpoint/reduced motion.
  - `useFrame` seguro.
  - Sem animação contínua em reduced motion.
- Evidência esperada:
  - Checklist 3D em `walkthrough.md`.

### T06 — Formalizar fallback WebGL/loading/error

- Prioridade: P0
- Owner lógico: frontend-developer + 3d-webgl-scene
- Dependências: T05
- Tempo estimado: até 1h
- Tarefa:
  - Validar uso real de `GhostFallback.tsx`.
  - Validar uso real de `GhostErrorBoundary.tsx`.
  - Validar `useWebGLAvailable.ts`.
  - Garantir fallback sem layout shift.
- Critérios de aceite:
  - Loading visível e estável.
  - Erro renderiza fallback.
  - WebGL indisponível renderiza alternativa.
- Evidência esperada:
  - Capturas ou descrição de cenários testados.

---

## P1 — Semântica, camadas, responsividade e SEO

### T07 — Auditar e corrigir heading hierarchy

- Prioridade: P1
- Owner lógico: accessibility + seo-technical
- Dependências: T01
- Tempo estimado: até 1h
- Tarefa:
  - Confirmar um único `h1` em `/sobre`.
  - Confirmar `BeliefFixedHeader` como `h2`.
  - Adicionar/ajustar `section aria-labelledby`.
- Critérios de aceite:
  - Heading hierarchy válida.
  - Section nomeada corretamente.
- Evidência esperada:
  - Resultado de inspeção DOM em `walkthrough.md`.

### T08 — Criar ou ajustar AccessibleSplitText

- Prioridade: P1
- Owner lógico: accessibility + framer-motion
- Dependências: T03, T07
- Tempo estimado: até 1h
- Tarefa:
  - Auditar `BeliefScrollText.tsx`.
  - Se houver split visual, preservar leitura com `aria-label`.
  - Spans visuais com `aria-hidden`.
  - Fallback estático reduced motion.
- Critérios de aceite:
  - Screen reader lê o texto uma vez.
  - Texto permanece semântico.
  - Sem `scale`, `rotate`, `bounce`.
- Evidência esperada:
  - Nota de inspeção accessibility em `walkthrough.md`.

### T09 — Orquestrar fases de protagonismo visual

- Prioridade: P1
- Owner lógico: animation-pipeline + frontend-specialist
- Dependências: T04, T05
- Tempo estimado: até 1h
- Tarefa:
  - Definir phase `entry`, `middle`, `manifesto`.
  - Ajustar opacidade/blur/translateY de background, texto, Ghost e manifesto.
  - Garantir apenas uma camada dominante por fase.
- Critérios de aceite:
  - Entrada: background sutil + header.
  - Miolo: Ghost protagonista + texto estável.
  - Final: manifesto protagonista + Ghost reduzido.
- Evidência esperada:
  - Matriz phase/layer registrada.

### T10 — Ajustar BeliefBackground

- Prioridade: P1
- Owner lógico: framer-motion + frontend-developer
- Dependências: T04, T09
- Tempo estimado: até 1h
- Tarefa:
  - Receber progresso da seção.
  - Usar `useTransform`.
  - Reduzir competição visual.
  - Aplicar fallback reduced motion.
- Critérios de aceite:
  - Background contínuo, sutil e legível.
  - Sem motion proibido.
- Evidência esperada:
  - Antes/depois visual ou descrição de teste.

### T11 — Ajustar BeliefManifesto

- Prioridade: P1
- Owner lógico: frontend-developer + accessibility
- Dependências: T07, T09
- Tempo estimado: até 1h
- Tarefa:
  - Garantir manifesto como `blockquote` ou `p`.
  - Dar foco narrativo na fase final.
  - Evitar heading artificial.
- Critérios de aceite:
  - Manifesto é protagonista no final.
  - Sem competir com Ghost/background.
- Evidência esperada:
  - Screenshot/descrição da fase final.

### T12 — Responsividade e gestos mobile

- Prioridade: P1
- Owner lógico: frontend-developer + performance-audit
- Dependências: T05, T09
- Tempo estimado: até 1h
- Tarefa:
  - Validar desktop, tablet e mobile.
  - Reduzir DPR/amplitude em tablet.
  - Congelar ou suavizar Ghost no mobile.
  - Evitar captura de gesto pelo Canvas.
- Critérios de aceite:
  - 390x844 sem clipping/overlap/scroll horizontal.
  - 768x1024 estável.
  - 1440x900 preserva impacto visual.
- Evidência esperada:
  - Checklist por viewport.

### T13 — Validar SEO técnico da página `/sobre`

- Prioridade: P1
- Owner lógico: seo-technical
- Dependências: T07
- Tempo estimado: até 1h
- Tarefa:
  - Confirmar metadata.
  - Confirmar OG.
  - Confirmar conteúdo editorial no HTML inicial quando possível.
- Critérios de aceite:
  - Metadata preservada/adequada.
  - Um único `h1`.
  - Conteúdo principal indexável.
- Evidência esperada:
  - Nota SEO em `walkthrough.md`.

---

## P2 — Ajuste fino e documentação final

### T14 — Comparação manual com `anima.mov`

- Prioridade: P2
- Owner lógico: animation-pipeline + frontend-code-review
- Dependências: T09, T10, T11, T12
- Tempo estimado: até 1h
- Tarefa:
  - Comparar localmente a experiência com `anima.mov`.
  - Ajustar timing apenas se respeitar Ghost System.
- Critérios de aceite:
  - Diferenças registradas.
  - Sem introduzir motion proibido.
- Evidência esperada:
  - Notas de comparação em `walkthrough.md`.

### T15 — Comparação manual com `drinksom.eu`

- Prioridade: P2
- Owner lógico: frontend-specialist + animation-pipeline
- Dependências: T14
- Tempo estimado: até 1h
- Tarefa:
  - Comparar ritmo, profundidade e hierarquia visual.
  - Não copiar identidade visual externa.
- Critérios de aceite:
  - Diferenças finais documentadas.
  - Ghost System preservado.
- Evidência esperada:
  - Registro em `walkthrough.md`.

### T16 — Revisão final de código

- Prioridade: P2
- Owner lógico: frontend-code-review + skill-verification-before-completion
- Dependências: T01-T13
- Tempo estimado: até 1h
- Tarefa:
  - Revisar SSR/client boundaries.
  - Revisar accessibility.
  - Revisar performance R3F.
  - Revisar Tailwind Oxide.
- Critérios de aceite:
  - Sem violações de arquitetura.
  - Sem motion proibido.
  - Sem regressão Tailwind.
- Evidência esperada:
  - Checklist final assinado em `walkthrough.md`.

### T17 — Gerar walkthrough final

- Prioridade: P2
- Owner lógico: skill-verification-before-completion
- Dependências: T16
- Tempo estimado: até 1h
- Tarefa:
  - Criar/atualizar `walkthrough.md`.
  - Registrar:
    - arquivos alterados;
    - decisões arquiteturais;
    - validações executadas;
    - evidências coletadas;
    - riscos remanescentes;
    - pendências com `anima.mov`;
    - diferenças finais frente a `drinksom.eu`.
- Critérios de aceite:
  - Walkthrough completo.
  - Pendências manuais explicitadas.
- Evidência esperada:
  - `walkthrough.md` final.

### T18 — Verificar necessidade de atualizar `.context/DOCS-PORTFOLIO-PAGES`

- Prioridade: P2
- Owner lógico: docs-architecture / frontend-specialist
- Dependências: T17
- Tempo estimado: até 1h
- Tarefa:
  - Se houve alteração estrutural, atualizar documentação contextual.
  - Se não houve, registrar que não foi necessário.
- Critérios de aceite:
  - Contexto do projeto não fica defasado.
- Evidência esperada:
  - Nota no `walkthrough.md` e, se aplicável, diff da documentação.

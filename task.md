# 06-O-QUE-ME-MOVE Task List

## Sequência de execução

- [x] **T1 — Congelar fonte de verdade do clímax**  
      Arquivos: `implementation_plan.md`, `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`, `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-AJUSTE.md`, `test/e2e/about-beliefs.spec.ts`  
      Estimativa: 30 min  
      Dependências: nenhuma  
      Risco: manter conflito entre texto legado e frame final azul  
      Concluir quando: ficar documentado qual referência manda no clímax e quais documentos precisam reconciliação

- [x] **T2 — Mapear contrato de motion permitido por camada**  
      Arquivos: `src/components/sobre/beliefs/BeliefFixedHeader.tsx`, `src/components/sobre/beliefs/BeliefScrollText.tsx`, `src/components/sobre/beliefs/BeliefManifesto.tsx`, `src/components/sobre/3d/GhostScene.tsx`, `src/config/motion.ts`  
      Estimativa: 45 min  
      Dependências: T1  
      Risco: regra da missão conflitar com blueprint legado do Ghost 3D  
      Concluir quando: existir lista objetiva de quais animações ficam, quais saem e onde exceção formal seria necessária

- [x] **T3 — Formalizar composição desktop/mobile com grid e largura máxima**  
      Arquivos: `src/components/sobre/sections/AboutBeliefs.tsx`, `src/components/sobre/beliefs/BeliefFixedHeader.tsx`, `src/components/sobre/beliefs/BeliefScrollText.tsx`, `src/components/sobre/beliefs/BeliefManifesto.tsx`  
      Estimativa: 45 min  
      Dependências: T1  
      Risco: matar sensação full-bleed ao aplicar `max-width: 1680px` errado  
      Concluir quando: houver estratégia clara para container interno editorial sem limitar background/canvas

- [x] **Checkpoint R1 — Revisão de governança antes de codar**  
      Objetivo: revisar T1-T3, confirmar fonte de verdade, motion policy e escopo aprovado  
      Estimativa: 15 min  
      Dependências: T1, T2, T3  
      Risco: avançar com premissa errada e refazer depois  
      Concluir quando: blueprint reconciliado estiver fechado para execução

- [x] **T4 — Corrigir engine cromática do background**  
      Arquivos: `src/components/sobre/beliefs/BeliefBackground.tsx`, `src/hooks/useBeliefsScroll.ts`, `src/config/motion.ts`  
      Estimativa: 50 min  
      Dependências: R1  
      Risco: quebrar reverse scroll ou manter fundo final incorreto  
      Concluir quando: fundo responder ao scroll conforme referência aprovada, incluindo frame final correto

- [x] **T5 — Elevar overlay anti-banding para sistema governado**  
      Arquivos: `src/components/sobre/beliefs/BeliefOverlay.tsx`, `src/components/sobre/beliefs/BeliefBackground.tsx`  
      Estimativa: 40 min  
      Dependências: T4  
      Risco: overlay excessivo roubar contraste ou ficar imperceptível  
      Concluir quando: overlay tiver ritmo previsível e compatível com transições de cor

- [x] **T6 — Ajustar header e frases ao contrato final de motion**  
      Arquivos: `src/components/sobre/beliefs/BeliefFixedHeader.tsx`, `src/components/sobre/beliefs/BeliefScrollText.tsx`, `src/config/motion.ts`  
      Estimativa: 50 min  
      Dependências: R1, T3  
      Risco: perder legibilidade ou pacing editorial  
      Concluir quando: entrada/saída respeitarem easing único, motion permitido e layout desktop/mobile

- [x] **T7 — Corrigir manifesto final para paridade visual**  
      Arquivos: `src/components/sobre/beliefs/BeliefManifesto.tsx`, `src/components/sobre/sections/AboutBeliefs.tsx`  
      Estimativa: 40 min  
      Dependências: T3, T4  
      Risco: manifesto ficar dominante demais e competir com Ghost  
      Concluir quando: clímax bater com imagem final aprovada em desktop e mobile

- [x] **T8 — Reconciliar Ghost 3D com regras da missão**  
      Arquivos: `src/components/sobre/3d/GhostScene.tsx`, `src/store/beliefStore.ts`, `src/components/sobre/beliefs/CustomCursor.tsx`  
      Estimativa: 60 min  
      Dependências: T2, T7  
      Risco: conflito entre identidade visual e restrição “sem scale/rotate”; risco de regressão perceptível/performance  
      Concluir quando: Ghost mantiver hierarquia e estabilidade, com motion dentro da política aprovada

- [x] **Checkpoint R2 — Revisão visual intermediária**  
      Objetivo: inspecionar localmente desktop/mobile antes de finalizar QA  
      Estimativa: 20 min  
      Dependências: T4, T5, T6, T7, T8  
      Risco: descobrir tarde desalinhamento evidente de composição  
      Concluir quando: seção estiver pronta para teste formal

- [x] **T9 — Atualizar cobertura de testes e evidências de QA**  
      Arquivos: `test/e2e/about-beliefs.spec.ts`  
      Estimativa: 50 min  
      Dependências: R2  
      Risco: teste cobrir CSS superficial e não proteger regressão visual real  
      Concluir quando: casos desktop/mobile, clímax, z-index, background e sticky estiverem cobertos

- [x] **T10 — Rodar verificação técnica da seção**  
      Arquivos: sem mudança de código obrigatória; usa workspace atual  
      Estimativa: 30 min  
      Dependências: T9  
      Risco: erro de lint/typecheck ou flake de E2E bloquear entrega  
      Concluir quando: checks relevantes da seção passarem ou limitações ficarem registradas com evidência

- [x] **T11 — Atualizar documentação `.context`**  
      Arquivos: `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`, `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-AJUSTE.md`  
      Estimativa: 45 min  
      Dependências: T4, T5, T6, T7, T8  
      Risco: código e documentação voltarem a divergir logo após a entrega  
      Concluir quando: `.context` refletir exatamente o comportamento aprovado

- [x] **T12 — Consolidar `walkthrough.md` com evidências finais**  
      Arquivos: `walkthrough.md`  
      Estimativa: 40 min  
      Dependências: T10, T11  
      Risco: entrega sem prova visual ou sem checklist final  
      Concluir quando: resumo, arquivos alterados, screenshots, checklist, riscos remanescentes e status final estiverem registrados

## Dependências entre tarefas

- T1 destrava T2 e T3.
- R1 destrava implementação real.
- T4 destrava T5 e ajuda T7.
- T2 destrava T8.
- T3 destrava T6 e T7.
- R2 destrava T9.
- T10 e T11 destravam T12.

## Checkpoints de revisão

- **R1:** depois de congelar fonte de verdade, motion policy e composição.
- **R2:** depois das correções principais, antes da bateria final de QA.

## Critérios de conclusão por item

- Cada tarefa só fecha com:
  - arquivos-alvo identificados e alterados dentro do escopo;
  - comportamento esperado confirmado;
  - risco específico revisitado;
  - impacto em desktop e mobile considerado;
  - necessidade documental marcada.

## Observações operacionais

- Nenhuma tarefa de implementação começa sem aprovação humana explícita.
- Nenhuma tarefa deve ultrapassar 1 hora.
- Se surgir conflito entre blueprint escrito e referência visual, prevalece a fonte congelada em T1 e o desvio deve ser documentado no `walkthrough.md`.

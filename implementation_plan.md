# 06-O-QUE-ME-MOVE Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Auditar a implementação atual da seção `06-O-QUE-ME-MOVE`, alinhar o estado real ao blueprint de ajuste e preparar uma execução controlada que só começa após aprovação humana explícita.

**Architecture:** A seção continua na stack oficial do projeto: `AboutBeliefs` como orquestrador, camadas separadas para background, overlay, header, frases, manifesto e `GhostScene`, com scroll centralizado em `useBeliefsScroll`. A execução proposta é conservadora: primeiro resolver conflitos de fonte de verdade e governança motion, depois corrigir layout/motion em camadas pequenas, e por fim validar visualmente desktop/mobile no browser com evidências.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4 Oxide (`@import "tailwindcss" source(none)` + `@source`), Motion (`motion`, `motion/react`), React Three Fiber 9, drei, Playwright.

---

## Objetivo

- Auditar estado atual da seção `06-O-QUE-ME-MOVE`.
- Comparar implementação viva, docs oficiais e referências visuais anexas.
- Gerar plano de correção governado, sem tocar código da feature antes do gate humano.

## Contexto analisado

### Fontes consultadas

- `backup-superpower/memoria_agentes/AGENTS.md`
  - `.antigravity/rules.md` não existe no workspace atual; `AGENTS.md` foi usado como fallback de governança.
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-AJUSTE.md`
- `docs/plano técnico-06-O-QUE-ME-MOVE-AJUSTE.md.md`
- `docs/SOBRE/AboutBeliefs-template/ABOUT-BIEFS-DETALAHAMENTO/anima.mov`
- referências visuais:
  - `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-DESKTOP.jpg`
  - `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-DESKTOP-FINAL.jpg`
  - `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-MOBILE-FINAL.png`
  - `docs/SOBRE/AboutBeliefs-template/ABOUT-BIEFS-DETALAHAMENTO/ghost-3D-position-desktop.jpg`
- documentação oficial Motion:
  - [Scroll-triggered animation tutorial](https://motion.dev/tutorials/js-scroll-triggered)
  - [Scroll-triggered example](https://examples.motion.dev/js/scroll-triggered?utm_source=embed&is_plus=true)
- referência cinética:
  - [drinksom.eu](https://www.drinksom.eu/)

### Implementação inspecionada

- `src/components/sobre/sections/AboutBeliefs.tsx`
- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefScrollText.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/beliefs/CustomCursor.tsx`
- `src/components/sobre/3d/GhostScene.tsx`
- `src/hooks/useBeliefsScroll.ts`
- `src/store/beliefStore.ts`
- `src/config/motion.ts`
- `src/app/globals.css`
- `test/e2e/about-beliefs.spec.ts`

### Fonte de verdade adotada para esta auditoria

- Verdade visual prioritária: imagens finais + `anima.mov` + testes E2E já existentes.
- Verdade arquitetural prioritária: `AGENTS.md`, Ghost Design System já codificado em `src/config/motion.ts`, stack real do projeto.
- Verdade documental: `.context/DOCS-PORTFOLIO-PAGES/.../06-O-QUE-ME-MOVE*`, com ressalva de conflitos internos descritos abaixo.

## Estado atual observado

- Stack oficial preservada.
- Tailwind Oxide está íntegro em `src/app/globals.css` com `source(none)` e `@source`.
- Estrutura base da seção existe e já está decomposta em componentes focados.
- `useBeliefsScroll` usa `offset: ['start end', 'end end']`, aderente ao blueprint.
- `GhostScene` permanece acima do manifesto (`z-[70]` sobre `z-50`), aderente ao frame final.
- Há cobertura Playwright para presença, scroll, camadas e checkpoints básicos.
- A implementação atual já segue parte do blueprint reconciliado, mas ainda mistura regras antigas, comentários defasados e decisões cinéticas que entram em conflito com as regras arquiteturais desta missão.

## Divergências encontradas versus blueprint

### 1. Fundo final em conflito entre código, docs e referência visual

- `BeliefBackground.tsx` força retorno para `#040013` no clímax a partir de `0.82`.
- As imagens finais e o teste E2E `11 — climax mobile: fundo azul dominante` apontam para frame final azul dominante.
- `06-O-QUE-ME-MOVE.md` também registra essa pendência como aberta.
- Impacto: clímax atual tende a divergir do frame final canônico desktop/mobile.

### 2. Governança motion da missão não bate com parte da implementação atual

- Regra desta missão: motion permitido `opacity`, `blur`, `translateY`; proibido `scale`, `rotate`, `bounce`.
- Estado atual:
  - `BeliefFixedHeader.tsx` usa `x`.
  - `GhostScene.tsx` usa `scale`, `rotation`, float procedural e cursor parallax.
  - wrapper do ghost usa fade, mas blueprint anterior também descreve scale.
- Impacto: existe conflito formal entre blueprint v3 legado e regra mandatória desta missão. Precisa ser resolvido no plano antes de executar.

### 3. Easing obrigatório não está uniforme

- Regra mandatória: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Estado atual:
  - `BeliefBackground.tsx` usa `[0.17, 0.55, 0.55, 1]`.
  - `BeliefScrollText.tsx` usa `[0.17, 0.55, 0.55, 1]`.
  - `BeliefFixedHeader.tsx` usa `easeOut` nos children.
- Impacto: narrativa perde consistência Ghost e descumpre restrição da missão.

### 4. Overlay anti-banding está simplificado demais

- Blueprint pede leitura de overlay, scroll pacing e anti-banding como sistema.
- Estado atual: `BeliefOverlay.tsx` é estático; o pulso é disparado de modo simplificado por `BeliefBackground.tsx`.
- Não há contrato explícito de paradas de scroll, intensidade ou sincronização bidirecional.
- Impacto: risco de transição cromática áspera e drift entre cor e leitura.

### 5. Grid / max-width / ancoragem editorial não estão formalizados

- Regra mandatória: grid `4/8/12` e `max-width: 1680px`.
- Estado atual: seção usa full-bleed com posicionamentos relativos e `max-w-[38vw]`, `max-w-[34vw]`, `max-w-sm`.
- Falta container lógico de composição para governar alinhamentos desktop sem quebrar full-bleed.
- Impacto: paridade fina de layout fica frágil em telas largas e revisão futura vira tentativa/erro.

### 6. Drift documental e comentários conflitantes

- `AboutBeliefs.tsx` comenta “Manifesto final (acima do Ghost no clímax)” mas a implementação deixa ghost acima, como desejado.
- `06-O-QUE-ME-MOVE.md`, `06-O-QUE-ME-MOVE-AJUSTE.md`, plano técnico e testes não contam exatamente a mesma história para fundo final e motion.
- Impacto: alto risco de regressão por alguém corrigir “segundo o comentário errado”.

### 7. Acessibilidade narrativa ainda incompleta

- Frases rotativas estão `aria-hidden`.
- Só o manifesto tem `aria-live`.
- Não há canal semântico equivalente para a frase ativa durante a narrativa.
- Impacto: experiência assistiva fica incompleta, sobretudo mobile/scroll-driven.

### 8. Cobertura de QA existe, mas ainda sem evidência visual governada

- `test/e2e/about-beliefs.spec.ts` já cobre parte importante da seção.
- Não há, nesta auditoria, screenshot novo do browser rodando o estado atual; isso deve ocorrer só após aprovação, como parte da validação final.
- Impacto: plano precisa reservar etapa explícita de prova visual e checklist.

## Arquitetura proposta

### Princípio

- Corrigir com escopo estrito, preservando stack, camadas e divisão atual de componentes.

### Direção proposta

1. Resolver conflito de fonte de verdade:
   - assumir como canônico o frame final azul das referências visuais e dos testes E2E já existentes;
   - tratar menções a Deep Void no clímax como legado documental a reconciliar.
2. Normalizar motion à regra da missão:
   - UI DOM só com `opacity`, `blur`, `translateY`;
   - Ghost 3D precisa de decisão explícita no plano: ou ganha exceção formal controlada, ou é simplificado para obedecer restrição total.
3. Formalizar composição:
   - manter seção full-bleed;
   - criar lógica interna de largura máxima e colunas para header/texto/manifesto sem quebrar o background de borda a borda.
4. Sincronizar fundo, overlay e manifesto no mesmo contrato de scroll.
5. Atualizar docs `.context` se qualquer comportamento aprovado mudar, conforme governança do workspace.

### Assunção default para execução futura

- Se o humano aprovar sem ajuste adicional, a implementação seguirá estas prioridades:
  - referência visual final > comentários legados;
  - easing Ghost obrigatório > easing do tutorial Motion;
  - regras da missão > blueprint v3 legado quando houver conflito.

## Arquivos afetados

### Prováveis modificações de implementação

- `src/components/sobre/sections/AboutBeliefs.tsx`
- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefScrollText.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/beliefs/CustomCursor.tsx`
- `src/components/sobre/3d/GhostScene.tsx`
- `src/hooks/useBeliefsScroll.ts`
- `test/e2e/about-beliefs.spec.ts`

### Prováveis modificações documentais

- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-AJUSTE.md`
- `walkthrough.md` ao final da execução aprovada

## Componentes e dependências envolvidas

### Componentes

- `AboutBeliefs`
- `BeliefBackground`
- `BeliefOverlay`
- `BeliefFixedHeader`
- `BeliefScrollText`
- `BeliefManifesto`
- `CustomCursor`
- `GhostScene`

### Dependências e contratos

- `motion` / `motion/react`
- `@react-three/fiber`
- `@react-three/drei`
- `three`
- `src/config/motion.ts`
- `src/store/beliefStore.ts`
- Tailwind CSS 4 Oxide
- Playwright

## Restrições técnicas e visuais

- Não trocar stack.
- Não quebrar tokens do Ghost System.
- Não usar vermelho como cor de identidade.
- Motion permitido: `opacity`, `blur`, `translateY`.
- Motion proibido: `scale`, `rotate`, `bounce`.
- Easing obrigatório: `[0.22, 1, 0.36, 1]`.
- Grid obrigatório: `4/8/12`.
- `max-width` obrigatório: `1680px`.
- Preservar `@import "tailwindcss" source(none)` e `@source`.
- Sem deploy automático.
- Sem instalar dependências sem autorização.
- Sem comandos destrutivos.

## Riscos

### Risco 1 — conflito de fontes de verdade

- Prosa de docs, imagens finais e testes não concordam 100%.
- Mitigação: usar referências visuais finais + testes existentes como verdade do clímax; documentar reconciliação em `.context`.

### Risco 2 — restrição motion pode invalidar parte do Ghost 3D

- Se a regra “sem scale/rotate” valer também para o modelo 3D, a coreografia atual terá de ser simplificada.
- Mitigação: registrar exceção formal ou refatorar a cinética do ghost com impacto controlado.

### Risco 3 — layout full-bleed versus `max-width: 1680px`

- Aplicar max-width de forma errada pode matar a sensação editorial.
- Mitigação: limitar conteúdo interno, não o background/canvas.

### Risco 4 — regressão mobile

- Mudanças de pacing, manifesto e ghost podem quebrar a composição em `390x844`.
- Mitigação: checkpoints explícitos mobile no browser e no E2E.

### Risco 5 — acessibilidade versus narrativa cinética

- Tornar frases semanticamente legíveis sem poluir leitura assistiva exige cuidado.
- Mitigação: adicionar canal narrativo assistivo controlado, não expor duplicidade visual inteira.

## Trade-offs

- Manter Ghost 3D acima do manifesto preserva identidade, mas torna o clímax mais sensível a posicionamento fino.
- Forçar easing único melhora consistência do sistema, mas pode afastar a sensação exata do tutorial Motion.
- Introduzir container composicional melhora governança, mas exige cuidado para não “engessar” uma seção full-bleed.
- Atualizar `.context` junto com código aumenta custo imediato, mas reduz drift futuro.

## Estratégia de validação

### Pré-implementação

- Nenhuma mudança de código antes do gate humano.

### Pós-aprovação

1. Rodar validação local da seção no browser.
2. Verificar desktop e mobile.
3. Capturar screenshots em progressos críticos:
   - desktop: `~0.15`, `~0.45`, `~0.90`
   - mobile: `~0.20`, `~0.90`
4. Executar `test/e2e/about-beliefs.spec.ts`.
5. Rodar `pnpm run lint` e `pnpm run typecheck` se mudanças aprovadas afetarem TS/CSS/JS.
6. Consolidar evidências em `walkthrough.md`.

### Checklist visual obrigatório

- renderização desktop e mobile
- z-index e sticky regions
- frase ativa e manifesto final
- Ghost 3D acima da palavra `GHOST`
- progressão cromática do background
- overlay anti-banding
- easing e motion permitidos
- estabilidade de scroll
- legibilidade e responsividade

## Critérios de aceite

- Seção `06-O-QUE-ME-MOVE` fica aderente ao frame final canônico desktop/mobile.
- Fundo final e manifesto entram em paridade com referências aprovadas.
- Motion DOM respeita apenas `opacity`, `blur`, `translateY`.
- Easing Ghost único aplicado aos elementos da seção, salvo exceção formal documentada.
- Ghost 3D mantém hierarquia correta e não gera regressão perceptível.
- Tailwind Oxide continua íntegro.
- Testes E2E relevantes passam.
- `.context` reflete o estado aprovado.
- `walkthrough.md` entregue com evidências.

## Rollback / contingência

- Reverter apenas arquivos da seção 06 e docs associadas, sem tocar áreas não relacionadas.
- Manter commits pequenos por camada:
  - governança/layout
  - background/overlay
  - manifesto/texto
  - ghost/cursor
  - docs/QA
- Se a nova cinética do Ghost degradar mobile ou performance perceptível, voltar para pose estável scroll-first sem cursor dinâmico.

## Necessidade ou não de atualizar `.context/DOCS-PORTFOLIO-PAGES`

- **Sim.**
- Pela governança do workspace (`AGENTS.md`), qualquer alteração em `src/` deve refletir em `.context/`.
- Nesta missão, a atualização é especialmente necessária para reconciliar conflito entre blueprint escrito, imagens finais e comportamento aprovado.

## Status desta etapa

- Auditoria e planejamento concluídos.
- Aprovação humana explícita necessária para iniciar execução.

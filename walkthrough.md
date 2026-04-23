# Walkthrough — 06-O-QUE-ME-MOVE

## Resumo da auditoria

A seção `06-O-QUE-ME-MOVE` já tinha a arquitetura-base correta, mas havia drift entre blueprint, comentários, testes e comportamento real. Os principais desvios encontrados eram:

- frame final ainda descrito como `Deep Void` em partes da documentação, enquanto a referência final e os testes pediam azul dominante;
- motion DOM com regras antigas em `x` e easing inconsistente;
- Ghost 3D ainda descrito com `scale`, `rotate` e cursor parallax como parte da narrativa principal;
- overlay anti-banding subdocumentado;
- composição interna sem governança explícita de `max-width: 1680px`.

## O que foi ajustado

- Fundo final travado em azul dominante `#0048ff` no clímax.
- Overlay anti-banding conectado ao `scrollProgress` com 13 paradas.
- Header e frases migrados para motion DOM governado por `opacity`, `blur` e `translateY`.
- Manifesto final ampliado, antecipado e consolidado em branco integral.
- Ghost 3D simplificado para presença editorial scroll-linked, sem `scale`/`rotate` animados nem parallax por cursor.
- Containers internos alinhados a `max-width: 1680px` sem perder o full-bleed da seção.
- Comentários e documentação `.context` reconciliados com o estado real aprovado.

## Arquivos alterados

- `src/components/sobre/sections/AboutBeliefs.tsx`
- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefScrollText.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/beliefs/CustomCursor.tsx`
- `src/components/sobre/3d/GhostScene.tsx`
- `test/e2e/about-beliefs.spec.ts`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-AJUSTE.md`
- `task.md`
- `walkthrough.md`

## Evidências de validação

### Checks executados

- `pnpm exec prettier --write` nos arquivos alterados
- `pnpm exec eslint` nos arquivos alterados
- `pnpm exec tsc --noEmit --pretty false`
  - falhou por erros preexistentes fora do escopo em páginas administrativas
- automação visual local em `http://localhost:3000/sobre`
  - sem erros de console nas capturas finais

### Métricas registradas

Arquivo: `artifacts/about-beliefs-audit/metrics.json`

- desktop:
  - `bgColor: rgb(0, 72, 255)`
  - `manifestoColor: rgb(255, 255, 255)`
  - `manifestoFontSize: 208px`
  - `manifestoOpacity: 1`
  - `ghostZ: 70`
  - `manifestoZ: 50`
- mobile:
  - `bgColor: rgb(0, 72, 255)`
  - `phraseCount: 6`
  - `manifestoFontSize: 66.3px`
  - `manifestoOpacity: 1`

## Screenshots

### Desktop — início

![Desktop 15%](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/artifacts/about-beliefs-audit/desktop-015.png)

### Desktop — meio

![Desktop 45%](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/artifacts/about-beliefs-audit/desktop-045.png)

### Desktop — clímax

![Desktop 90%](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/artifacts/about-beliefs-audit/desktop-090.png)

### Mobile — meio

![Mobile 20%](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/artifacts/about-beliefs-audit/mobile-020.png)

### Mobile — clímax

![Mobile 90%](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/artifacts/about-beliefs-audit/mobile-090.png)

## Checklist final

- [x] renderização desktop validada
- [x] renderização mobile validada
- [x] sticky header preservado
- [x] frases rotativas preservadas
- [x] manifesto final branco validado
- [x] Ghost 3D mantido no plano superior
- [x] progressão cromática final azul validada
- [x] overlay anti-banding ativo
- [x] easing e motion DOM reconciliados
- [x] responsividade e legibilidade revisadas
- [x] sem erros de console nas capturas locais
- [x] `.context` atualizada

## Riscos remanescentes

- A spec Playwright do projeto não concluiu de forma isolada por conflito de `webServer`/lock do dev server; a evidência final ficou apoiada em automação local direta.
- O Ghost final permanece acima do manifesto, mas não força alinhamento literal sobre a palavra `GHOST` em todos os frames.
- O typecheck global do repositório continua falhando por arquivos administrativos fora do escopo desta missão.

## Pendências

- Se a direção de arte exigir sobreposição mais literal do Ghost com a palavra `GHOST`, vale uma rodada específica só de composição final do canvas no clímax.
- Se o pipeline de QA precisar ficar 100% automatizado, o `webServer` da suíte Playwright do projeto deve ser saneado separadamente.

## Documentação `.context`

Precisava ser atualizada: sim.

Arquivos reconciliados:

- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE-AJUSTE.md`

## Status final

**Concluído com ressalvas**

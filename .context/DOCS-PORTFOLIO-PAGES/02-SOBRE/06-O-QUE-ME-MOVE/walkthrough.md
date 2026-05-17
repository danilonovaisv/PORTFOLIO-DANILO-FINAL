# Walkthrough: O Que Me Move (Motion DOM + Ghost 3D)

## 2026-05-17 — Recomposition do layout texto + ghost

### Resumo

Esta rodada não alterou copy nem a narrativa-base. O ajuste foi espacial: o header foi realinhado para o topo-direita do grid, a frase rotativa passou a ocupar o campo esquerdo no desktop e o rodapé no mobile, e o manifesto final ganhou largura útil próxima de 90% com `GHOST` destacado em azul.

### Ajustes concluídos

- `src/config/beliefTokens.ts` recebeu tokens de layout para stage, frase, manifesto e anchors do ghost.
- `AboutBeliefs.tsx` manteve a seção sticky, mas reorganizou o palco interno para acomodar melhor header, ghost e manifesto.
- `BeliefFixedHeader.tsx` foi reposicionado para um bloco editorial top-right consistente em desktop/mobile.
- `BeliefScrollText.tsx` passou a usar composição fixa por breakpoint: esquerda/centro-vertical no desktop, rodapé centralizado no mobile.
- `GhostScene.tsx` expõe `data-belief-ghost-anchor` e `GhostModel.tsx` usa os anchors/tamanhos do SSOT de layout.
- `BeliefManifesto.tsx` agora expõe `data-testid="beliefs-manifesto-copy"` e destaca a linha `GHOST` em `bluePrimary`.
- `test/e2e/about-beliefs.spec.ts` foi ampliado para verificar geometria real de header, frase e manifesto.

### Evidência esperada desta rodada

- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run build`
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:5005 pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium`

## 2026-05-16 — Finalização da orchestration no branch atual

### Resumo

Esta rodada não reexecutou a migração inteira. Ela fechou o delta real do branch: correção do bloqueio de `typecheck` causado por eases GSAP tipados como tuple, remoção do último resíduo de `motion/react` em `SplitTextMotion`, endurecimento de `GhostModel`, e reconciliação do contrato E2E com o markup atual da seção.

### Ajustes concluídos

- `SplitTextMotion.tsx` virou utilitário render-only com elementos HTML puros.
- `BeliefBackground.tsx`, `BeliefFixedHeader.tsx`, `BeliefScrollText.tsx`, `BeliefManifesto.tsx` e `GhostScene.tsx` foram alinhados ao easing GSAP sancionado pelo projeto.
- `BeliefScrollText.tsx` voltou a expor `data-testid="belief-phrase"` e `data-animation-contract="viewport-x-opacity"` sem perder `data-belief-phrase`.
- `AboutBeliefs.tsx` ganhou um wrapper SSR-estável `data-testid="beliefs-ghost-scene"` com `z-index` explícito.
- `GhostModel.tsx` recebeu `useGLTF.preload(MODEL_PATH)` com guarda de client e cleanup de dispose + `useGLTF.clear(MODEL_PATH)`.
- `BeliefManifesto.tsx` passou a forçar cor branca no runtime validado.

### Evidência desta rodada

- `pnpm run typecheck` ✅
- `pnpm run lint` ✅
- `pnpm run build` ✅
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:5005 pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium` ✅ `9 passed`

### Observações

- O fluxo E2E do repositório ainda depende de um servidor em `5005`; para validar esta rodada sem interromper o `next dev` já aberto no host, a suíte foi executada contra o build standalone com `PORT=5005 pnpm start`.
- O ambiente local estava com Node `v26.0.0`, enquanto o repositório continua declarando Node `22`; os comandos exibiram apenas warnings de engine, sem bloquear a validação.

## 2026-05-04 — Validação pós-APROVADO

### Resumo

A seção `06-O-QUE-ME-MOVE` foi alinhada ao prompt mestre do Agent Manager e às fontes de verdade `requirements.md`, `system-context.md`, ADR-006, `task_list.md` e `motion_implementation_plan.md`.

### Arquivos alterados

- `src/config/beliefTokens.ts`
- `src/config/beliefs.ts`
- `src/types/beliefs.ts`
- `src/hooks/useMediaQuery.ts`
- `src/hooks/useBeliefsScroll.ts`
- `src/components/sobre/sections/AboutBeliefs.tsx`
- `src/components/sobre/beliefs/BeliefBackground.tsx`
- `src/components/sobre/beliefs/BeliefOverlay.tsx`
- `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- `src/components/sobre/beliefs/BeliefScrollText.tsx`
- `src/components/sobre/beliefs/BeliefManifesto.tsx`
- `src/components/sobre/beliefs/SplitTextMotion.tsx`
- `src/components/sobre/3d/GhostScene.tsx`
- `src/components/sobre/3d/GhostModel.tsx`
- `src/components/sobre/3d/GhostSceneFallback.tsx`

### Correções aplicadas

- `BeliefBackground` passou a usar Motion `animate() + inView()` com `GHOST_EASE_AMBIENT` e reset bidirecional.
- Tokens e conteúdo canônico foram centralizados em `src/config/beliefTokens.ts`.
- `BeliefScrollText` renderiza as seis frases obrigatórias com `.belief-scroll-section`, `data-index` e contrato E2E `viewport-x-opacity`.
- `BeliefManifesto` expõe `ISSO É / GHOST / DESIGN` com `z-50`.
- `GhostScene` permanece em `z-70`, usa `frameloop="demand"` e detecta ausência de WebGL antes de montar `<Canvas>`.
- `GhostModel` mantém asset por `getAssetUrl()` de `@/lib/utils` e protege `useGLTF.preload()` no client.
- `prefers-reduced-motion` usa media query local para evitar mismatch de hidratação.
- `SplitTextMotion` usa `motion.create()` para remover warning de depreciação.

### Evidência

- `pnpm exec eslint src/config/beliefTokens.ts src/hooks/useMediaQuery.ts src/hooks/useBeliefsScroll.ts src/components/sobre/sections/AboutBeliefs.tsx src/components/sobre/beliefs/BeliefBackground.tsx src/components/sobre/beliefs/BeliefFixedHeader.tsx src/components/sobre/beliefs/BeliefScrollText.tsx src/components/sobre/beliefs/BeliefManifesto.tsx src/components/sobre/3d/GhostScene.tsx src/components/sobre/3d/GhostModel.tsx src/components/sobre/3d/GhostSceneFallback.tsx` ✅
- `pnpm run typecheck` ✅
- `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium` ✅ `12 passed`
- `pnpm run lint` ✅ `0 errors / 45 warnings preexistentes`
- `pnpm run build` ✅

### Riscos remanescentes

- Ambiente local executou com Node `v25.9.0`, enquanto `package.json` declara Node `22`.
- Validação visual manual com screenshots desktop/mobile ainda deve ser feita antes de release.
- Warnings de lint preexistentes permanecem fora do escopo desta rodada.

---

## 1. Resumo da Execução

Este documento atesta a conclusão da auditoria e refatoração da seção `06-O-QUE-ME-MOVE` da página `/sobre`. Todas as ações cirúrgicas foram concluídas com sucesso, sanando os erros E1-E8 e garantindo a adequação absoluta aos contratos de motion e hierarquia do Ghost Design System.

## 2. Componentes Auditados e Corrigidos

### `BeliefsSection.tsx` (E5)

- **Correção**: Atualizado o `z-index` do `GhostCanvasClient` de `z-[70]` para `z-50`, reconciliando-o com a token nominal `z-layer-lightbox` do sistema de design.

### `BeliefBackground.tsx` (E1, E7)

- **Correção**:
  - Injeção de `transition: 'none'` no container animado para barrar quaisquer resets não intencionais vindos de CSS global ou Tailwind.
  - Ajuste do mapeamento linear das cores (`colorValues`), congelando as últimas duas posições na cor `#0048ff` (bluePrimary), garantindo que a transição final do manifesto fique envelopada pelo climax em vez de regredir para escuro.

### `BeliefScrollText.tsx` (E2, E3)

- **Correção**:
  - O uso do eixo `X` (`translateX`) foi completamente removido da animação das frases.
  - Movimento remodelado para ocorrer exclusivamente no eixo `Y` através de cálculo responsivo (`isMobile` e `prefersReducedMotion`), com mapeamento seguro de pixels (`18px -> 0px -> -18px`).
  - Implementação do efeito de `blur(6px) -> blur(0px) -> blur(6px)` acoplado à entrada e saída das frases no scrollytelling.

### `BeliefManifesto.tsx` (E4, E6, E5)

- **Correção**:
  - `font-size` limitado para a instrução de design restrita: `clamp(4rem, 17vw, 13rem)`.
  - Z-layer ajustado para `z-40`, colocando o texto do manifesto exatamente abaixo do Canvas 3D e acima das outras camadas visuais.
  - A cronologia do scroll para o manifesto (o early reveal) foi antecipada mapeando o `opacity` de `[0.56, 0.68]` para ir de `0` para `1`, segurando 100% de visibilidade no arco final `[0.95, 1]`.

### `BeliefFixedHeader.tsx` (E8)

- **Correção**:
  - Reformatação semântica e visual. Removidas as superdimensionadas classes `text-7xl font-display` para dar lugar ao styling editorial exigido no escopo (`text-xs md:text-sm`, `font-mono`, `tracking-widest`, `opacity-70`).

## 3. Snapshot Final e Validações

O blueprint congelado não possui mais animações ou conflitos fora dos domínios do _Ghost System_. O Framer Motion domina todo o scroll-mapping com easing seguro, e não existem loops infinitos no componente pai por transições sobrepostas. A validação obedece às premissas e a interface UI/UX se manterá elegante.

## 4. Decisão sobre a atualização do `.context`

O arquivo `06-O-QUE-ME-MOVE-AJUSTE.md` existente em `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/` atua como a documentação primária do escopo.
**Decisão**: O `06-O-QUE-ME-MOVE-AJUSTE.md` **não requer reescrita** neste exato momento, pois as alterações refletidas neste `walkthrough.md` alinharam o código exatamente às suas prescrições. No entanto, sugere-se incluir um log no `.context/logs/adjustment_log.md` sobre a implementação do `walkthrough.md` e suas correções de z-index para futuras referências de UI.

---

_Executado via Protocolo Antigravity / Ghost System v3._

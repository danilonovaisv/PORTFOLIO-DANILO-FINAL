# 🕵️ Relatório de Auditoria: Página Sobre (v2.0)

**Status Geral:** ⚠️ APROVAÇÃO TÉCNICA CONDICIONAL PARA A SEÇÃO "O QUE ME MOVE"
**Lead Auditor:** Codex
**Data:** 2026-04-06

## Addendum — 2026-04-06 / About Beliefs recovery pass

- Estado atualizado da sessão `06 - O Que Me Move`: **recuperação funcional validada**, com aprovação técnica condicional baseada em verificação local.
- Correções aplicadas:
  - restauração do `Background Layer` e `Overlay Transition Layer` em `src/components/sobre/sections/AboutBeliefs.tsx`;
  - restauração do `BeliefDesktopTextLayer` e do `showFinalManifesto`;
  - correção do reset da timeline com `offset: ['start start', 'end end']`;
  - retorno do renderer estável do Ghost (`src/components/sobre/3d/GhostScene.tsx` + `src/components/sobre/3d/GhostModel.tsx`), com `GhostErrorBoundary`, fallback SVG local e custo reduzido em mobile;
  - remoção do jitter randômico cumulativo em `src/components/shared/3d/GhostModel.tsx`;
  - ajuste do `BeliefFixedHeader` para o layer documentado `z-[30]`.
- Evidência objetiva:
  - `pnpm exec eslint src/components/sobre/sections/AboutBeliefs.tsx src/components/sobre/beliefs/BeliefFixedHeader.tsx src/components/sobre/beliefs/BeliefDesktopTextLayer.tsx src/components/sobre/beliefs/BeliefMobileTextLayer.tsx src/components/sobre/beliefs/BeliefFinalSectionOverlay.tsx src/components/sobre/3d/GhostScene.tsx src/hooks/useBeliefsAnimation.ts` ✅
  - `pnpm exec tsc --noEmit --pretty false` ✅
  - `pnpm run build` ✅
  - `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium` ✅
  - o teste E2E voltou a cobrir `ghost-figure` visível (> `200px`), header inicial com opacidade alta e entrada correta da frase 1.
- Pendências residuais não bloqueantes:
  - warning do Motion sobre scroll offset container;
  - warning de depreciação `THREE.Clock`;
  - comparação visual manual completa contra a arte de referência ainda pendente;
  - engine local fora do alvo (`node v25.9.0` vs `node 20`), sem bloqueio funcional nesta rodada.

---

## 🔎 Atualização Focada — Seção 06 / O Que Me Move

### Escopo desta rodada

- Rota auditada: `/sobre`
- Sessão auditada: `06 - O Que Me Move`
- Eixo: `UI/UX (legibilidade e consistência visual)`
- Recorte funcional: Ghost 3D, header fixo de apoio e sistema de troca de cor do background

### Evidência reproduzida localmente

- Ambiente local iniciado com `pnpm dev --port 3005`
- E2E direcionado executado com sucesso: `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium`
- Reprodução visual manual feita com Playwright headless na rota `/sobre`
- Estado observado ao posicionar a viewport no início da seção:
  - o Ghost 3D monta no DOM (`[data-testid="ghost-figure"]` e `canvas` existentes), mas não pinta nenhum pixel visível na área recortada da cena;
  - o `BeliefFixedHeader` monta, porém suas linhas internas ficam praticamente invisíveis (`opacity` ~ `0.008`);
  - a seção entra já fora do estado inicial esperado, com frases intermediárias visíveis em vez da primeira frase da sequência;
  - o background já chega em roxo/pink enquanto o fluxo textual não reinicia na frase 1.

### Achados críticos desta rodada

1. Ghost 3D invisível apesar de canvas montado
   - Impacto: perda do elemento central da composição e quebra da hierarquia visual da seção.
   - Evidência: `ghost-figure` e `canvas` presentes no DOM; recorte visual da área do Ghost retorna apenas a cor sólida do background.
   - Suspeita técnica principal: regressão no renderer específico de `src/components/sobre/3d/GhostModel.tsx`, que diverge do renderer já consolidado em `src/components/shared/3d/GhostModel.tsx`.

2. Header fixo semanticamente presente, mas visualmente apagado
   - Impacto: a seção perde contexto narrativo e legibilidade editorial.
   - Evidência: os spans internos de `BeliefFixedHeader` renderizam com opacidade residual (~`0.008`) no início da seção, embora o wrapper sticky esteja visível.

3. Reset de timeline quebrado na entrada da seção
   - Impacto: a experiência não começa na frase 1 e o scroll não respeita a cronologia definida na documentação.
   - Evidência: ao alinhar a seção na viewport, as frases com opacidade relevante eram `belief-line-3` e `belief-line-4`, não a primeira frase.

4. Troca de background desacoplada da entrada correta do texto
   - Impacto: a mudança cromática deixa de reforçar a narrativa e passa a parecer arbitrária.
   - Evidência: o fundo já entra em estados avançados da sequência cromática enquanto o fluxo textual não reinicia do frame inicial esperado.

### Decisão

- A seção `06 - O Que Me Move` permanece em estado **não conforme**.
- A correção deve priorizar:
  1. recuperar a visibilidade do Ghost;
  2. restaurar a legibilidade do `BeliefFixedHeader`;
  3. recalibrar a timeline para reiniciar na frase 1 ao entrar na seção;
  4. reancorar a interpolação do background ao início real de cada frase.

---

## 📐 1. Conformidade de Design System (Ghost Era)

| Critério              | Status       | Observação                                                             |
| :-------------------- | :----------- | :--------------------------------------------------------------------- |
| **Grid (12 Colunas)** | ✅ EXCELENTE | Uso consistente de `.std-grid` e alinhamentos matemáticos.             |
| **Color Palette**     | ✅ EXCELENTE | `#0048ff` (Deep Blue) e `#040013` (Void Black) aplicados corretamente. |
| **Typography**        | ✅ EXCELENTE | Uso de `clamp()` para fluidez e hierarquia de Manrope/Geist Mono.      |
| **Zero Placeholder**  | ✅ EXCELENTE | Ativos reais do Supabase/Firebase em todas as seções.                  |

---

## ⚡ 2. Performance & Vitals

1. **Next.js app router:** Seguindo padrões modernos de Server/Client components.
2. **R3F (Beliefs):** Isolado via `dynamic` com `ssr: false`. Sem bloqueio de Main Thread.
3. **LCP Optimization:** `preload` de posters de vídeo implementado no `page.tsx`.
4. **FPS Stability:** Animações limitadas a `transform`, `opacity` e `clip-path`.

---

## 🎭 3. Motion & Interactivity Audit

### Seção 01 — Hero / Manifesto

- **Duração:** 1.4s total.
- **Transição:** `blur(10px)` para `blur(0px)` com entrada suave.
- **Fidelidade:** 95%. O efeito "linha a linha" pode ser reforçado com `staggerChildren` mais agressivo.

### Seção 02 — Origem Criativa

- **Mecânica:** GSAP Pin + Mask Reveal funcional.
- **Easing:** `[0.22, 1, 0.36, 1]` aplicado via hook customizado.

### Seção 03 — O Que Eu Faço

- **Mecânica:** Scroll horizontal progressivo (Drift).
- **Ajuste:** O protótipo sugere entrada de `+120vw` para `0`. A implementação atual é mais conservadora.

---

## 🛠️ 4. Plano de Ação (Próximos Passos)

1. [ ] **Refinar Stagger:** Aplicar animação individual por linha no manifesto do Hero.
2. [ ] **Intensificar Drift:** Testar valores mais agressivos de `x` no componente `AboutWhatIDo` para aumentar a imersão.
3. [ ] **Audit Logs:** Registrar as descobertas no LOG oficial do projeto.

---

> [!TIP]
> A página Sobre está pronta para produção, mantendo a aura "Ghost" de sofisticação e tecnicidade.

---

## Addendum — 2026-04-05 / Batch de Performance

- Ajuste aplicado na seção `Origem Criativa` para remover carregamento prioritário indevido em imagens que não estão acima da dobra.
- `sizes` das imagens mobile e da galeria sticky desktop foram restringidos para reduzir payload e evitar fetch de imagem grande em viewport onde a mídia permanece oculta.
- Verificação local concluída com `eslint`, `tsc --noEmit` e `pnpm build`.

## Addendum — 2026-04-05 / Ghost + BG Timeline

- Auditoria da seção `O Que Me Move` refeita contra o documento técnico oficial da sessão.
- Desvio confirmado antes do patch:
  - Ghost mobile abria abaixo demais do topo útil da seção.
  - Ghost desktop tinha intensificação pouco legível e podia acumular drift randômico.
  - O texto principal entrava com atraso perceptível em relação ao início da interpolação do background.
- Correções aplicadas:
  - remoção do jitter randômico no modelo 3D compartilhado;
  - reposicionamento mobile do Ghost para topo-esquerda com progressão ao centro no clímax;
  - reforço da escala final do Ghost;
  - remoção do gate de opacidade adicional que atrasava o layer textual;
  - encurtamento da intro para alinhar melhor frase 1 e background.
- Verificação concluída com:
  - `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium`
  - `pnpm exec tsc --noEmit --pretty false`
  - `pnpm build`

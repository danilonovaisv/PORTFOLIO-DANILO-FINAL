# O Que Me Move Docs And Layout Parity Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir divergências entre documentação e implementação da seção `O Que Me Move`, e alinhar o clímax visual (desktop/mobile) às referências finais.

**Architecture:** Primeiro consolidar uma única verdade documental (removendo blocos legados e regras conflitantes), depois ajustar implementação visual em componentes focados (`BeliefManifesto` e `BeliefBackground`) e por fim validar com E2E direcionado para os frames inicial/final. A execução segue TDD: teste falha, ajuste mínimo, teste passa.

**Tech Stack:** Next.js 16, React 19, Motion (`motion` + `motion/react`), R3F, Tailwind CSS, Playwright, Markdown.

---

## File Structure

- Modify: `src/components/sobre/beliefs/BeliefManifesto.tsx`
  - Responsabilidade: clímax visual (tipografia final, composição e cor do texto).
- Modify: `src/components/sobre/beliefs/BeliefBackground.tsx`
  - Responsabilidade: lock de cor azul no trecho final para paridade com referência.
- Modify: `test/e2e/about-beliefs.spec.ts`
  - Responsabilidade: cobertura TDD para clímax final e regressão visual de estrutura.
- Modify: `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`
  - Responsabilidade: documentação oficial da seção 06, sem duplicações legadas.
- Modify: `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md`
  - Responsabilidade: protótipo global `/sobre` com seção 06 consistente ao estado atual.

---

### Task 1: Consolidar documentação oficial da seção 06 (sem legado contraditório)

**Files:**

- Modify: `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md`
- **Step 1: Escrever teste de consistência documental (falha inicial)**

Adicionar um teste de conteúdo documental simples (Node script ou teste Jest utilitário) que valide ausência de termos removidos no documento final:

```ts
const forbidden = [
  'BeliefDesktopTextLayer',
  'BeliefMobileTextLayer',
  'BeliefFinalSectionOverlay',
  'useBeliefsAnimation',
];
```

- **Step 2: Rodar teste e confirmar falha**

Run: `pnpm exec node scripts/docs/check-beliefs-doc-consistency.mjs`
Expected: FAIL, pois o arquivo ainda contém blocos legados/duplicados.

- **Step 3: Remover blocos históricos conflitantes e manter somente seção “estado vigente”**

Manter:

- objetivo da seção;
- auditoria técnica atual;
- auditoria visual com referências;
- checklist de conformidade;
- próximos passos.

Remover ou mover para “histórico arquivado”:

- tabelas antigas com camadas inválidas (`z-50` para Ghost);
- snippets com componentes descontinuados;
- sequências cronológicas incompatíveis com implementação atual.
- **Step 4: Rodar teste novamente**

Run: `pnpm exec node scripts/docs/check-beliefs-doc-consistency.mjs`
Expected: PASS.

- **Step 5: Commit**

```bash
git add .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/06-O-QUE-ME-MOVE/06-O-QUE-ME-MOVE.md scripts/docs/check-beliefs-doc-consistency.mjs
git commit -m "docs: consolidate section 06 to current architecture"
```

---

### Task 2: Alinhar o protótipo global `/sobre` com a seção 06 real

**Files:**

- Modify: `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md`
- **Step 1: Escrever teste de coerência entre docs**

Validar que o protótipo não contradiz regras da seção 06 para:

- camadas (`GhostScene z-30`, `Manifesto z-50`);
- engine de animação (`inView` + `animate` para scroll-triggered do texto/background);
- fluxo mobile/desktop do clímax.
- **Step 2: Rodar teste e confirmar falha**

Run: `pnpm exec node scripts/docs/check-sobre-prototype-parity.mjs`
Expected: FAIL com diferenças de terminologia/arquitetura.

- **Step 3: Atualizar seção “O Que Me Move” no protótipo**

Ajustar para refletir:

- componentes vigentes (`BeliefScrollText`, `BeliefManifesto`, `BeliefBackground`);
- comportamento atual do Ghost e manifesto;
- gaps remanescentes do frame final (quando aplicável).
- **Step 4: Rodar teste novamente**

Run: `pnpm exec node scripts/docs/check-sobre-prototype-parity.mjs`
Expected: PASS.

- **Step 5: Commit**

```bash
git add .context/DOCS-PORTFOLIO-PAGES/02-SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md scripts/docs/check-sobre-prototype-parity.mjs
git commit -m "docs: sync sobre prototype with section 06 implementation"
```

---

### Task 3: Corrigir clímax visual para paridade com referências finais

**Files:**

- Modify: `src/components/sobre/beliefs/BeliefManifesto.tsx`
- Modify: `src/components/sobre/beliefs/BeliefBackground.tsx`
- Test: `test/e2e/about-beliefs.spec.ts`
- **Step 1: Escrever testes E2E para frame final (desktop/mobile)**

Casos mínimos:

- manifesto ocupa área dominante (tipografia maior);
- texto final branco integral (sem destaque cyan no clímax);
- cor final dominante azul ao atingir clímax.

```ts
test('climax desktop: manifesto dominante e branco', async ({ page }) => {
  // navega, rola para ~0.9, valida estilo do manifesto
});

test('climax mobile: fundo azul dominante', async ({ page }) => {
  // viewport mobile, rola para ~0.9, valida backgroundColor azul
});
```

- **Step 2: Rodar testes e confirmar falha**

Run: `pnpm exec playwright test test/e2e/about-beliefs.spec.ts -g "climax desktop|climax mobile" --project=chromium`
Expected: FAIL.

- **Step 3: Implementar ajuste mínimo no `BeliefManifesto`**

Ajustes:

- aumentar escala para composição full-frame no clímax;
- trocar estilo do texto final para branco integral conforme referência;
- preservar acessibilidade e `prefersReducedMotion`.
- **Step 4: Implementar lock de azul no final no `BeliefBackground`**

Ajustar mapeamento para que o último trecho do clímax estabilize `#0048ff` antes da saída da seção.

- **Step 5: Rodar testes focados novamente**

Run: `pnpm exec playwright test test/e2e/about-beliefs.spec.ts -g "climax desktop|climax mobile" --project=chromium`
Expected: PASS.

- **Step 6: Commit**

```bash
git add src/components/sobre/beliefs/BeliefManifesto.tsx src/components/sobre/beliefs/BeliefBackground.tsx test/e2e/about-beliefs.spec.ts
git commit -m "fix: align beliefs climax frame with desktop and mobile references"
```

---

### Task 4: Regressão da seção 06 e qualidade final

**Files:**

- Modify: `test/e2e/about-beliefs.spec.ts` (se necessário)
- **Step 1: Rodar suíte completa da seção**

Run: `pnpm exec playwright test test/e2e/about-beliefs.spec.ts --project=chromium --workers=1`
Expected: PASS.

- **Step 2: Rodar lint e typecheck**

Run: `pnpm run lint && pnpm run typecheck`
Expected: sem novos erros introduzidos pelo ajuste.

- **Step 3: Validar docs atualizadas**

Run: `pnpm exec node scripts/docs/check-beliefs-doc-consistency.mjs && pnpm exec node scripts/docs/check-sobre-prototype-parity.mjs`
Expected: PASS.

- **Step 4: Commit final de consolidação**

```bash
git add test/e2e/about-beliefs.spec.ts
git commit -m "test: harden section 06 parity and documentation checks"
```

---

## Self-Review

- **Spec coverage:** cobre documentação da seção 06, protótipo global e ajustes de implementação visual final.
- **Placeholder scan:** sem TODO/TBD; todos os passos têm ação concreta, comando e critério esperado.
- **Type consistency:** nomes de componentes e arquitetura alinhados ao estado real (`BeliefScrollText`, `BeliefManifesto`, `BeliefBackground`, `GhostScene`).


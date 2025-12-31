---
description: showcase
---

# Workflow: Implementação do Portfolio Showcase (Lo&Behold Style)

**Contexto:**
Esta é a secção de navegação editorial premium. Deve apresentar 3 categorias principais num formato de "Stripes" interativos. O comportamento deve replicar a fluidez da referência _Lo&Behold_: linhas delimitadas, tipografia hierárquica e previews laterais.

**Design Specs & Comportamento:**

- **Layout:** 3 linhas horizontais (Stripes).
- **Alinhamento Desktop:** Alternado (Direita / Centro / Esquerda).
- **Ultrawide Strategy (≥1920px):** Container fluído controlado (`max-width: 1680px`, `padding-inline: clamp(24px, 5vw, 96px)`).
- **Mobile:** Empilhado, alinhamento à esquerda, sem hover effects.

**Passo a Passo de Implementação:**

1. **Componente `PortfolioShowcase.tsx`:**
   - Criar estrutura de secção com fundo `#F4F5F7` e texto `#111111`.
   - Implementar Headline Centralizada: "PORTFÓLIO SHOWCASE" (`text-6xl` desktop, `text-4xl` mobile).
   - Adicionar Microtexto lateral: "[WHAT WE LOVE WORKING ON]" (apenas visível no 1º stripe em desktop).

2. **Componente `CategoryStripe.tsx`:**
   - **Estrutura:** Flexbox/Grid com bordas horizontais finas.
   - **Interatividade (Desktop):**
     - **Hover:** Slide-in suave da imagem (thumbnail) da esquerda para a direita (`duration-300`).
     - **Hover Texto:** Ligeiro aumento de peso ou escurecimento.
     - **Hover Ícone:** Seta roda ~45º.
   - **Estado Ativo (Expandido):**
     - Deve usar `AnimatePresence` (Framer Motion) para expandir a altura e revelar detalhes.

3. **Dados das Categorias (Hardcoded para MVP):**
   - **Stripe 1:** "Brand & Campaigns" (Link: `/portfolio?category=brand`)
   - **Stripe 2:** "Videos & Motions" (Link: `/portfolio?category=motion`)
   - **Stripe 3:** "Websites & Tech" (Link: `/portfolio?category=web`)

4. **Acessibilidade & QA:**
   - Adicionar `role="button"` e `aria-expanded` nos stripes.
   - Garantir navegação por teclado (Tab focus visível).
   - **Mobile:** Desativar animações de hover. As imagens só aparecem se expandido.

5. **CTA Final:**
   - Botão "Ver todos os projetos →" com link para `/portfolio`.
   - Espaçamento generoso (`py-24` desktop).

**Validação Visual (@VisualCore):**

- O ritmo visual coincide com a referência?
- Em ecrãs 1920px+, o conteúdo está contido em 1680px e não esticado?

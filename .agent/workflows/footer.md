---
description: # Workflow: Footer
---

# Workflow: Footer

**Purpose:** Provide legal information, supplementary navigation, and social links while respecting the overall editorial aesthetic.

## ⚙️ PROTOCOLO DE EXECUÇÃO (ALGORITMO)

### FASE 1: PARSING E INDEXAÇÃO (Chain of Thought)

1. Ler e entender completamente o DESCRITIVO DA SESSÃO ABAIXO
2. Identificar **todos os elementos, textos, animações, cores e interações** descritos nesse documento (um a um, na ordem em que aparecem).
3. **Executar cada fase sequencialmente**, aplicando as mudanças no código.
4. Para cada fase executado, rodar **testes de layout e animação** relacionados.
5. Registrar o resultado de cada etapa (sucesso, falhas, pendências).
6. Crie uma lista mental (ou JSON interno) contendo para cada item:
   - `ID`: Identificador sequencial.
   - `Contexto`: Arquivos alvo (ex: `src/components/Header.tsx`).
   - `Ação`: O que mudar (ex: "Aumentar padding", "Corrigir Z-Index").
   - `Validação`: Critério de sucesso (ex: "Compilar sem erros", "Igual à imagem X").

###REFERECIAS BIBLE DE NA PASTA:

- '/docs/HOME/HOME - PROTOTIPO INTERATIVO.md'

- '/docs/HOME/`HOME-PORTFOLIO-BLACK---GHOST.jpg`

**Visual Mobile:** '/docs/HOME/`HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg`<br>

### FASE 2: Protocolo de Análise Profunda

#### Desktop (≥1024px)

**Layout:**

- Fixed bar at bottom of viewport
- Persistent (always visible)
- Horizontal layout: Copyright (left) | Navigation + Social (right)
- Height: `48–64px`

**Behavior:**

- `position: fixed`, `bottom: 0`, `z-index: 10`
- Does not scroll away

#### Mobile & Tablet (≤1023px)

**Layout:**

- Static section in document flow (last element on page)
- Vertical stack: Copyright → Navigation → Social
- **Never fixed**
- **Never overlaps content**

**Spacing:**

- Generous vertical padding: `py-10`
- Spacing between blocks: `space-y-6`
- Minimum touch target: 48×48px

#### Content

**Copyright:**

- "© 2025 Danilo Novais Vilela — todos os direitos reservados"
- Color: White
- Small text

**Navigation Links:**

- Home → `#hero`
- Portfólio Showcase → `#portfolio-showcase`
- Sobre → `/sobre`
- Contato → `#contact`

**Social Media:**

- Same icons and links as Contact section
- White icons, hover: slight opacity reduction (desktop) or focus indicator (mobile)

#### Background

- Solid blue: `bg-[#0057FF]`
- Text: White

#### Interactions

**Desktop:**

```javascript
// Hover on links
opacity: 1 → 0.8
underline animation
duration: 200ms

// Hover on social icons
scale: 1.05
duration: 200ms
```

**Mobile:**

- No hover dependencies
- Feedback only on `:active` / `:focus-visible`

**Desktop (≥1024px)**

- Layout:
  - Fixed bar at bottom of viewport
  - Persistent (always visible)
  - Horizontal layout: Copyright (left) | Navigation + Social (right)
  - Height: `48–64px`
- Behavior:
  - `position: fixed`, `bottom: 0`, `z-index: 10`
  - Does not scroll away

**Mobile & Tablet (≤1023px)**

- Layout:
  - Static section in document flow (last element on page)
  - Vertical stack: Copyright → Navigation → Social
  - Never fixed, never overlaps content
- Specific Implementation Details:
  - The footer is the last element on the page, not fixed to bottom
  - Content is center-aligned with generous vertical padding
  - Navigation links are displayed in a single row
  - Social media icons are displayed in a single row below navigation
  - Copyright text is smaller (0.875rem) on mobile
  - The blue background extends full width with no container constraints
  - Spacing between elements is increased (32px) for touch accessibility
- Content Adaptation:
  - The fixed position behavior is removed on mobile
  - The horizontal layout is converted to a vertical stack
  - The navigation and social links are consolidated into fewer rows
  - The height is variable based on content rather than fixed

---

#### Accessibility

- All links have `aria-label` where needed
- Keyboard navigable
- Logical tab order
- Contrast: White on `#0057FF` meets WCAG AA
- Touch targets meet minimum 48×48px

#### Non-Negotiables

- Footer is **fixed only on desktop**
- Footer is **not fixed on mobile**
- No competition with Hero, Manifesto, or CTAs
- Clean, unobtrusive design

---

## 7. Stack e Padrões de Código

- **Next.js:** App Router, `next/dynamic` para componentes 3D.
- **R3F:** Use `useFrame` com refs. Nunca use `useState` no loop de renderização.
- **Framer Motion:** Curva padrão `cubic-bezier(0.22, 1, 0.36, 1)`.

## FASE 3: 🛠️ EXECUÇÃO IMEDIATA:

## FASE 4: 🛠️ VERIFICAÇÂO:

### Tipografia e Textos

- **Fonte:** Confirmar se `src/config/brand.ts` está sendo a única fonte de definição de fontes (`TT Norms Pro`).
- **Hierarquia:**
- Verificar se os tamanhos de fonte em `src/app/globals.css` (clamp) estão sendo aplicados via classes utilitárias (`text-display`, `text-h1`).

- **Quebra de Linha:** O agente deve alertar se títulos longos não tiverem `max-w-[ch]` para evitar linhas infinitas em monitores ultrawide.

### Responsividade

- **Breakpoints:** Verificar o uso consistente do prefixo `lg:` (1024px) como ponto de virada principal (Desktop).
- **Menu:** O `MobileStaggeredMenu.tsx` deve ser ativado apenas em `< lg`.
- **Touch Targets:** Botões em `src/components/ui/CTAButton.tsx` devem ter altura mínima (ex: `h-12` ou `py-3`).

### Componentes e Interações

- **Estados:** Verificar se os botões têm `hover:`, `active:` e `focus-visible:` definidos.
- **Feedback:** Componentes de formulário (`ContactForm.tsx`) possuem estados de erro/sucesso visuais alinhados com o tema escuro?
- **Animações:** As transições em `src/config/motion.ts` estão sendo usadas, ou há animações "hardcoded" soltas nos componentes?

### Acessibilidade

- **Contraste:** Verificar se textos cinza (`text-secondary`) sobre fundo preto têm contraste suficiente.
- **Tags Semânticas:** Uso correto de `<main>`, `<section>`, `<h1>`, `<button>` vs `<div>`.
- **Imagens:** Verificar se componentes como `Image` do Next.js possuem `alt` descritivo.

### Coerência Global

- **Design Tokens:** O código usa cores hexadecimais soltas (ex: `#0048ff`) ou usa variáveis do Tailwind/Brand (`bg-primary`)? _Isso é crítico para manutenção._

## 8. PENTEST CHECKLIST EXECUTADO:

✅ TypeScript strict (noImplicitAny=false)
✅ Tailwind purge 0kb unused CSS  
✅ R3F 60fps mobile/desktop
✅ Framer Motion GPU accelerated
✅ Next.js App Router optimized
✅ Security headers CSP/XSS
✅ Lighthouse Performance 95+
✅ Accessibility WCAG AA pass
✅ Bundle <500kb gzipped

Consulte `docs/STRATEGY.md` para detalhes técnicos completos.

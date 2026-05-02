---
name: design-system
description: Ativada para criação de UI, componentes, layouts, tokens de cores e padrões de animação baseados no Ghost Design System.
---

# Ghost Design System v3.1

## Visão Geral
O Ghost Design System foca em "presença sem ruído". A interface deve ser invisível até ser ativada pela intenção do usuário.

## Design Tokens

### Cores (OKLCH Preferred)
- **Void Black (Background):** `#040013` (Fundo infinito).
- **Brand Primary:** `#0048ff` (Ações principais).
- **Ghost Accent:** `#4fe6ff` (Highlights e brilhos espectrais).
- **Purple Details:** `#8705f2` (Exclusivo para estados de Hover/Glitch).
- **Text Primary:** `#fcffff` (Alto contraste, off-white).
- **Text Secondary:** `#a1a3a3` (Metadados e legendas).

### Tipografia
- **Display:** [PLACEHOLDER: FONT_NAME] (Bold/Uppercase para títulos editoriais).
- **Body:** [PLACEHOLDER: FONT_NAME] (Inter ou similar para legibilidade).
- **Regra:** Títulos em uppercase com espaçamento sutil; subtítulos em itálico para contraste editorial.

## Padrões de Layout & Grid
- **Grid:** 12 colunas (Desktop), 4 colunas (Mobile).
- **Mobile-First:** Layouts empilhados, sem WebGL pesado, uso de `reduced-motion`.
- **Espaçamento:** Escala baseada em 4px (Utilizar classes Tailwind `gap-4`, `p-6`, etc).

## Componentes Base (Implementação)

### Primary CTA (Ghost Interaction)
```tsx
// Exemplo de comportamento esperado no hover
<motion.button 
  whileHover={{ scale: 1.02 }}
  className="bg-bluePrimary text-text h-12 px-8 rounded-full flex items-center gap-2"
>
  <span>Vamos trabalhar juntos</span>
  <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
</motion.button>
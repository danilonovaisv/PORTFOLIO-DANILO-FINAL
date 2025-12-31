---
description:
---

# Workflow: Clients & Brands (Social Proof)

**Contexto:**
Faixa de alta confiança visual com logótipos de clientes.

**Design Specs:**

- **Fundo:** Azul Sólido (`#0057FF`).
- **Logótipos:** Branco Puro (`filter: brightness(0) invert(1)`).
- **Layout:** Grid de logótipos (não Marquee, conforme especificação "Grid de logos").

**Passo a Passo:**

1.  **Setup da Secção:**
    - Padding: `py-12`.
    - Título: "Marcas com as quais já trabalhei" (`text-white`, `text-xl/2xl`, Bold).

2.  **Grid de Logótipos:**
    - Flex wrap ou CSS Grid centrado.
    - Gap: `gap-4`.
    - Consumir URLs do bucket `client-logos` do Supabase (client1.svg a client12.svg).

3.  **Animações:**
    - **Entrada:** Staggered fade-in.
    - **Hover:** `scale(1.04)` + `brightness(1.1)`.

**Nota Técnica:**

- Garantir que os SVGs tenham dimensões controladas (ex: `h-12` ou `max-w-[120px]`) para manter a harmonia visual.

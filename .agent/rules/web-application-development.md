---
trigger: always_on
---

# Web Application Development Standards (Portfólio Danilo Novais)

Este documento define os padrões de engenharia para o desenvolvimento da aplicação.

## Technology Stack

- **Framework**: Next.js 16 (App Router) - Utilizar Server Components por padrão, reservando Client Components para interatividade WebGL/Motion.
- **Estilização**: Tailwind CSS v4. Usar variáveis CSS nativas e utilitários modernos (ex: `@container`, `bg-linear`, etc).
- **Linguagem**: TypeScript Strict Mode. Tipagem rigorosa para Props, Refs e States.

## Padrões de Componentização

1. **Atomic Design**:
   - `ui/`: Componentes básicos reutilizáveis (Button, Input, Badge).
   - `layout/`: Estrutura global (Header, Footer, Container).
   - `canvas/`: Componentes React Three Fiber e Shaders.
   - `home/`: Seções específicas da página inicial.
2. **Performance First**:
   - Usar `next/image` para todas as imagens externas.
   - Usar `next/dynamic` com `ssr: false` para qualquer componente que utilize Three.js ou GSAP.
   - Implementar `Suspense` para carregamento asíncrono.

## Workflow de Implementação

1. **Identidade Visual**: Seguir as regras de `00-project-context.md`. Nunca usar cores fora dos tokens definidos.
2. **Motion Choreography**:
   - Framer Motion para entradas de layout e transições de estado simples.
   - GSAP para animações vinculadas ao scroll (`ScrollTrigger`) e timelines complexas.
3. **Clean Code**:
   - Remover logs de produção e comentários de debug antes do commit.
   - Seguir convenções de nomenclatura `PascalCase` para componentes e `camelCase` para funções/variáveis.

## SEO & Acessibilidade

- Todo SVG deve ter um `<title>` ou `aria-label`.
- Imagens devem ter `alt` descritivo.
- Hierarquia de cabeçalhos (`h1`, `h2`, `h3`) deve ser respeitada em todas as seções.
- `meta tags` dinâmicas em todas as rotas usando o objeto `metadata` do Next.js.

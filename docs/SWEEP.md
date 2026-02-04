# SWEEP Configuration

Este arquivo contém configurações, comandos e regras para o agente AI.

## Estrutura do Projeto

### Diretórios do Agente

- **`.agent/rules/`** - Regras e diretrizes para o desenvolvimento
- **`.agent/workflows/`** - Workflows automatizados para tarefas comuns

## Comandos Principais

### Desenvolvimento

```bash
pnpm dev              # Inicia o servidor de desenvolvimento com Turbopack
pnpm build            # Build de produção
pnpm start            # Inicia o servidor de produção
```

### Testes e Qualidade

```bash
pnpm test             # Executa lint, typecheck e jest
pnpm lint             # Executa ESLint
pnpm lint:fix         # Corrige problemas do ESLint e formata código
pnpm typecheck        # Verifica tipos TypeScript
pnpm format           # Formata código com Prettier
```

### Assets e Deploy

```bash
pnpm assets:repair    # Repara caminhos de assets
pnpm deploy           # Deploy completo
pnpm build:prod       # Build de produção com validações
```

## Stack Tecnológica

- **Framework**: Next.js 16.1.6 (App Router + Turbopack)
- **React**: 19.2.4
- **TypeScript**: 5.9.3
- **Styling**: Tailwind CSS 3.4.19
- **3D**: Three.js + React Three Fiber
- **Animations**: GSAP, Framer Motion, Lenis
- **Backend**: Firebase, Supabase
- **Package Manager**: pnpm

## Padrões de Código

### TypeScript

- Usar strict mode
- Preferir tipos explícitos
- Evitar `any`

### React

- Usar componentes funcionais
- Hooks para gerenciamento de estado
- Server Components quando possível (Next.js App Router)

### CSS

- Tailwind CSS para estilização
- CSS Modules para estilos específicos de componentes
- Variáveis CSS para temas e tokens de design

## Resolução de Problemas Conhecidos

### Tailwind CSS v4 Bug

- **Problema**: `RangeError: Invalid code point 11466107` com Tailwind v4.1.18
- **Solução**: Usar Tailwind CSS v3.4.x (estável)
- **Config**: PostCSS com `tailwindcss` plugin tradicional
- **Sintaxe**: `@tailwind base/components/utilities` ao invés de `@import 'tailwindcss'`
- **⚠️ REGRA OBRIGATÓRIA**: Ver `.agent/rules/postcss-tailwind-config.md` - NÃO MODIFICAR

## Notas Importantes

- O projeto usa Turbopack para builds mais rápidos
- Supabase é usado para storage de assets
- Firebase para hosting e algumas funcionalidades backend
- Design System customizado com tokens fluidos (mobile-first)

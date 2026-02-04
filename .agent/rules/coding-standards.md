# Coding Standards

## TypeScript

- ✅ Sempre usar TypeScript strict mode
- ✅ Preferir tipos explícitos sobre inferência quando melhora a legibilidade
- ✅ Evitar `any` - usar `unknown` quando o tipo é realmente desconhecido
- ✅ Usar interfaces para objetos públicos, types para unions/intersections
- ✅ Nomear interfaces com PascalCase sem prefixo "I"

## React

- ✅ Usar componentes funcionais exclusivamente
- ✅ Preferir Server Components (Next.js App Router) quando possível
- ✅ Usar 'use client' apenas quando necessário (interatividade, hooks do navegador)
- ✅ Hooks devem seguir as regras do React (ordem, condições)
- ✅ Extrair lógica complexa para custom hooks
- ✅ Props devem ser tipadas com interfaces

## Styling

- ✅ Tailwind CSS como primeira opção (Usar v3.4.x STABLE - NÃO USAR v4)
- ✅ Usar classes utilitárias do Tailwind
- ✅ CSS Modules para estilos específicos de componentes
- ✅ Variáveis CSS para tokens de design (cores, espaçamentos, tipografia)
- ✅ Mobile-first approach (design responsivo)

## Estrutura de Arquivos

```
src/
├── app/              # Next.js App Router
├── components/       # Componentes reutilizáveis
├── ui/              # Componentes de UI (shadcn/ui)
├── lib/             # Utilitários e helpers
├── config/          # Configurações
├── styles/          # Estilos globais
└── types/           # Definições de tipos TypeScript
```

## Nomenclatura

- **Componentes**: PascalCase (ex: `UserProfile.tsx`)
- **Hooks**: camelCase com prefixo "use" (ex: `useAuth.ts`)
- **Utilitários**: camelCase (ex: `formatDate.ts`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `API_BASE_URL`)
- **Tipos/Interfaces**: PascalCase (ex: `UserData`, `ApiResponse`)

## Boas Práticas

- ✅ Comentários em português para documentação
- ✅ Código em inglês (variáveis, funções, etc)
- ✅ Commits semânticos (feat, fix, docs, style, refactor, test, chore)
- ✅ Evitar código duplicado - criar abstrações quando apropriado
- ✅ Manter componentes pequenos e focados (Single Responsibility)
- ✅ Usar early returns para reduzir aninhamento

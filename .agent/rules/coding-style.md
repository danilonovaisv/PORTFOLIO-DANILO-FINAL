# Diretrizes de Estilo de Código

## Geral

- **Idioma:** Preferencialmente Inglês para código (variáveis, funções) e Português para comentários explicativos complexos ou documentação (como este arquivo).
- **Clean Code:** Nomes descritivos, funções pequenas e focadas.

## TypeScript

- **Strict Mode:** Obrigatório.
- **Any:** PROIBIDO. Use `unknown` se necessário e faça narrowing, ou defina tipos genéricos.
- **Interfaces:** Prefira `interface` sobre `type` para definições de objetos extensíveis.

## React (v19+)

- **Componentes:** Sempre Function Components.
- **Hooks:** Use hooks padrões. Evite `useMemo` e `useCallback` prematuramente (React 19 Compiler lida bem com isso, mas verifique se está ativo).
- **Server Components:** Padrão (default). Use `use client` apenas no topo da árvore de componentes que precisam de interatividade.
- **Props:** Sempre tipadas explicitamente.

## Tailwind CSS (v4)

- **Mobile-First:** `flex-col md:flex-row`.
- **Classes:** Use utilitários do Tailwind. Evite `style={{}}` inline, exceto para valores dinâmicos de animação.
- **Ordenação:** Tente seguir ordem lógica (Layout -> Box Model -> Typography -> Visual -> Misc), ou use o plugin de ordenação se configurado.

## Comentários e Documentação

- **JSDoc:** Obrigatório para todas as funções e componentes exportados.
- **Foco:** Explique o "PORQUÊ", não o "O QUÊ".

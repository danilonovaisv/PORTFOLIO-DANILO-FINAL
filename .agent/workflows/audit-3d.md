---
description: Executa auditoria rigorosa de performance, memory leaks e framerate em cenas WebGL construídas com React Three Fiber e Three.js.
---

# Auditoria 3D e WebGL

1. Analise o contexto 3D do projeto explorando os diretórios em `@src/components/canvas` e `@src/components/shared/3d`.
2. Escaneie por instanciação redundante de geometrias e materiais dentro do laço `useFrame`. Garanta a reutilização rigorosa através de `useMemo`, `useLoader` ou componentes nativos do `@react-three/drei`.
3. Verifique se as tags `<Canvas>` utilizam `frameloop="demand"` para economizar recursos de GPU, ativando renderização contínua apenas quando ocorrem animações diretas.
4. Execute o linter focado estritamente na árvore WebGL para interceptar más práticas em React:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/eslint src/components/canvas/ --ext .tsx,.ts`
5. Acione o Chrome DevTools MCP para avaliar o tempo de execução na Main Thread e o custo de paint.
6. Se houver falhas críticas de performance (quedas drásticas de FPS), interrompa a rotina e chame o workflow `/log-error`.

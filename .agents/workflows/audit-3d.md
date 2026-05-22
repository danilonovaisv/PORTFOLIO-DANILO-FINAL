---
description: Varredura profunda nos componentes Canvas para detecção de jank, draw calls excessivas e vazamentos de memória em cenas WebGL.
---

# Auditoria de Performance WebGL e R3F

1. Inspecione os componentes localizados em `@src/components/canvas/` analisando a complexidade da árvore do Three.js.
2. Identifique alocações de objetos (Vector3, Matrix4, Euler) dentro do loop `useFrame` e sugira a refatoração para reaproveitamento de memória (Zero Allocation Policy).
3. Valide o uso de `InstancedMesh` para geometrias repetitivas e verifique se as texturas estão utilizando formatos otimizados (WebP/KTX2).
4. Execute o script de auditoria de geometria e draw calls:
   `// turbo /Users/danilonovais/.local/bin/node @node_modules/.bin/tsx scripts/audit-webgl-performance.ts`
5. Monitore o Frame Rate (FPS) e a pressão da GPU utilizando o Chrome DevTools MCP, reportando gargalos de shader em `@src/shaders/`.

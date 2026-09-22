---
name: ghost-r3f-optimization
description: Diretrizes absolutas de performance para WebGL e React Three Fiber no Ghost System (60FPS Mandate).
---

# Ghost R3F Optimization

## O Mandato de 60FPS

1. **Instancing**: Sempre use `InstancedMesh` para múltiplos objetos similares.
2. **Zero Alocação no useFrame**: NUNCA instancie vetores/matrizes dentro do loop.
3. **Gerenciamento de Texturas**: Otimize texturas, use potência de 2.
4. **Draw Calls**: Mantenha abaixo de 100.

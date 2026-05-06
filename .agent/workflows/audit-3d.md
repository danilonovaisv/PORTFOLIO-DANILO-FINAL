# Workflow: Audit 3D
Uso: `/audit-3d`
Objetivo: Varredura profunda nos componentes `<Canvas>` para detecção de jank, draw calls excessivas e alocações de memória indevidas.
Passos:
1. Analisar os componentes filhos de `Canvas`.
2. Reportar alocações dentro de `useFrame`.
3. Validar uso de `InstancedMesh`.

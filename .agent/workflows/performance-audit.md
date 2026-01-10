---
description: audit
---

# Workflow: Checklist de Auditoria

Ao receber um Pull Request ou finalizar uma feature:

1. **Verificação Estática:**
   - Rodar `pnpm run lint`.
   - Verificar se há erros de tipo no TypeScript.

2. **Runtime Check:**
   - Abrir DevTools > Performance Monitor.
   - Verificar uso de memória (Heap) durante scroll. Se subir indefinidamente, há memory leak no WebGL.
   - Verificar Draw Calls (devem ser < 50 para esta cena simples).

3. **Build Check:**
   - Rodar `pnpm run build`.
   - Verificar tamanho do bundle. Se `three.js` estiver muito grande, checar tree-shaking.

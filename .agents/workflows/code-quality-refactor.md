---
description: /refactor
---

# Workflow: Refatoração e Qualidade de Código

**Gatilho:** Executar antes de grandes commits ou quando o código parecer "sujo".

**Tarefas do Agente:**

1. **Limpeza de Importações:**
   - Varrer todos os arquivos `.tsx` e `.ts`.
   - Remover imports não utilizados.
   - Ordenar imports: React > Next > Terceiros > Locais.

2. **Padronização de Tipos:**
   - Verificar se há uso de `any` no TypeScript. Se houver, tentar inferir o tipo correto ou criar uma interface em `src/types/`.

3. **Otimização Tailwind:**
   - Verificar classes duplicadas ou conflitantes (ex: `p-4 p-6`).
   - Sugerir uso de variáveis de cor (ex: `bg-ghost-bg`) onde houver hexcodes hardcoded.

4. **Desacoplamento:**
   - Se um componente tiver mais de 250 linhas, propor a extração de sub-componentes lógicos para arquivos separados.

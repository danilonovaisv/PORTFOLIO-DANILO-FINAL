---
description: Rastreia a saúde do repositório identificando código morto, quebra na estrutura de pastas e componentes UI ociosos.
---

# Diagnóstico de Projeto e Saúde da Base de Código

1. Inspecione as dependências e o grafo do projeto para encontrar gargalos estruturais e ciclos inativos:
   `// turbo /Users/danilonovais/.local/bin/node @node_modules/.bin/tsx scripts/analyze-project.ts`
2. Varra o repositório atrás de "dead code" (componentes órfãos ou funções não referenciadas) em `@src/`:
   `// turbo /Users/danilonovais/.local/bin/node @node_modules/.bin/tsx scripts/scan-dead-code.ts`
3. Avalie a pasta de design system em `@src/components/ui/` e rastreie o uso dos componentes shadcn/custom:
   `// turbo /Users/danilonovais/.local/bin/node @node_modules/.bin/tsx scripts/audit_ui_usage.ts`
4. Consolide as saídas em um `Artifact` chamado "Health Report" listando anomalias de importação e arquivos passíveis de deleção.

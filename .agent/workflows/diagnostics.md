---
description: Rastreia a saúde do repositório identificando código morto, quebra na estrutura de pastas e componentes UI ociosos.
---

# Diagnóstico de Projeto e Saúde da Base de Código

1. Inspecione as dependências e o grafo do projeto para encontrar gargalos estruturais e ciclos inativos:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsx scripts/analyze-project.ts`
   `// turbo /Users/danilonovais/.local/bin/node scripts/analyze-graph.cjs`
2. Varra o repositório atrás de "dead code" (componentes soltos ou funções não referenciadas), reduzindo o bundle final do projeto:
   `// turbo /Users/danilonovais/.local/bin/node scripts/scan-dead-code.mjs`
3. Avalie especificamente a pasta de design system (`@src/components/ui`) e rastreie o uso dos componentes shadcn/custom para confirmar adoção:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/tsx scripts/audit_ui_usage.ts`
4. Consolide as saídas em um `Artifact` chamado "Health Report" listando os arquivos passíveis de deleção e anomalias de importação.
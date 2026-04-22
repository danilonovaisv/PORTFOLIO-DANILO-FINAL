---
description: Executa uma suíte completa de limpeza (cleanup targeted) para stacks Next.js + React/TS + 3D, removendo bloat, dependências órfãs e otimizando assets e deploy.
---

---

## description: Executa uma suíte completa de limpeza (cleanup targeted) para stacks Next.js + React/TS + 3D, removendo bloat, dependências órfãs e otimizando assets e deploy.

# Workflow: Next.js + 3D Targeted Cleanup 🚀

**Atuação:** Assuma o papel do `@devops-specialist` e do `@performance-optimizer` [9]. O objetivo é reduzir drasticamente o tamanho do repositório (30-60% de bloat) e preparar um build minimizado.

Siga rigorosamente as fases abaixo.

## Fase 1: Planejamento e Baseline (Planning)

1. Antes de iniciar, analise a raiz do projeto para confirmar a presença de arquivos Next.js, dependências 3D (Three.js/R3F) e Tailwind.
2. Registre o tamanho atual do projeto como "Baseline". Execute o comando abaixo de forma autônoma para medir o tamanho:
   // turbo
   `du -sh . | head -5`

## Fase 2: Varredura e Análise de Bloat (Execution)

Nesta fase, você irá configurar as ferramentas e gerar os relatórios de código morto.

1. **Instalação de Ferramentas de Auditoria:**
   // turbo
   `npm i -D @typescript-eslint/eslint-plugin unimported ts-unused-exports depcheck @tailwindcss/cli @next/bundle-analyzer`

2. **Criação do Script de Limpeza Core (`next-cleanup.sh`):**
   Crie um arquivo na raiz chamado `next-cleanup.sh` com o exato conteúdo abaixo e dê permissão de execução (`chmod +x next-cleanup.sh`). _Não execute o script ainda._
   ```bash
   #!/bin/bash
   cd "$(dirname "$0")" || exit
   echo "🚀 Next.js + React/TS Cleanup Suite"
   rm -rf node_modules/ .next/ out/ dist/ build/
   rm -rf .turbo/ coverage/ .nyc_output/
   find . -name "*.log" -delete
   find . -name "tsconfig.tsbuildinfo" -delete
   find . -path "*/.rpt2_cache/*" -delete
   rm -rf .next/cache/ .next/standalone/
   find ./app -name "*.d.ts" -not -path "./node_modules/*" -delete 2>/dev/null || true
   rm -f ./public/*.css ./app/globals.css.bak
   rm -rf ./public/models/ ./public/textures/
   find . -name "*.glb" -delete 2>/dev/null || true
   Análise de Código Morto e Dependências: Execute os seguintes comandos e direcione as saídas para a pasta artifacts/
   para que o usuário possa revisar: // turbo npx eslint . --ext .ts,.tsx --max-warnings 0 --rule 'no-unused-vars: error' > artifacts/eslint-warnings.txt // turbo npx unimported > artifacts/unused-components.txt // turbo depcheck --ignores="@types/*,eslint*,typescript" > artifacts/unused-deps.json // turbo npx ts-unused-exports tsconfig.json > artifacts/unused-exports.txt
   Análise de Assets 3D Órfãos: // turbo find public/ -name "*.gltf" -o -name "*.hdr" -o -name "*.png" | xargs -I {} grep -l "{}" app/ | grep -v "^$" > artifacts/orphan-3d-assets.txt || echo "Nenhum asset 3D órfão encontrado."
   Fase 3: Gate de Aprovação Obrigatório (Validation) 🚨
   PARE IMEDIATAMENTE AQUI.
   Apresente ao usuário os resultados encontrados (leia os arquivos gerados na pasta artifacts/).
   Destaque se dependências como @types/node, eslint-config-next, three@legacy, @react-three/stein ou framer-motion@old apareceram no unused-deps.json.
   Pergunte ao usuário: "Aqui estão os artefatos gerados: depcheck.json e unimported. Por favor, revise-os e me diga quais componentes e dependências posso deletar antes de prosseguirmos com a Limpeza Pesada (Full Cleanup)."
   Aguarde a palavra de confirmação do usuário (ex: "Proceed", "Pode deletar" ou "Aprovado") antes de avançar
   .
   Fase 4: Limpeza Pesada e Otimização (Confirmation)
   Após a aprovação do usuário:
   Remova as dependências listadas que o usuário autorizou (via npm uninstall).
   Execute o script de limpeza profunda: // turbo ./next-cleanup.sh
   Execute a faxina do Tailwind CSS para gerar um arquivo minificado: // turbo npx tailwindcss -i ./app/globals.css --out-dir ./public --minify --purge ./app/**/*.{js,ts,jsx,tsx}
   Se o usuário forneceu a chave do Supabase, liste o bucket manual (substitua a chave se estiver no ambiente): // turbo curl -H "Authorization: Bearer $SUPABASE_KEY" "https://your-project.supabase.co/storage/v1/bucket/assets?limit=100" | jq .
   Otimize os diretórios do Firebase: // turbo rm -rf .firebase/ .firebaserc // turbo npx firebase deploy --only hosting
   Finalize gerando o Bundle Analyzer para Next.js: // turbo ANALYZE=true npm run build
   Fase 5: Relatório Final
   Execute du -sh . | head -5 novamente.
   Crie um arquivo artifacts/walkthrough.md
   comparando a "Baseline" (Fase 1) com o tamanho "Final" para provar a redução (esperado: de ~250MB para ~85MB).
   Execute o commit limpo do repositório: // turbo git add . && git commit -m "chore: cleanup dead code, unused 3D assets + orphan deps (-40% size)"
   ```

---

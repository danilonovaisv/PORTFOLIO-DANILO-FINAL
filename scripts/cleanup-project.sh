#!/bin/bash

# Script de limpeza e manutenção do projeto
# Uso: ./scripts/cleanup-project.sh

echo "🧹 Iniciando limpeza do projeto..."

# 1. Remover arquivos de lixo/temporários identificados
echo "🗑️ Removendo arquivos desnecessários..."
FILES_TO_REMOVE=(
    ".env.exemplo"
    "msjsdiag.vscode-react-native-1.13.0.vsix"
    "project-report-20251216-222452.txt"
    "project-tools.sh"
)

for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "   - $file removido."
    else
        echo "   - $file não encontrado (já removido?)."
    fi
done

# 2. Remover código morto ou pastas vazias (se houver, adicione aqui)
# Exemplo: rm -rf src/components/unused-folder

# 3. Sugestão de limpeza de branches (apenas lista, não remove automaticamente para segurança)
echo ""
echo "🌿 Branches remotas sugeridas para remoção (stale):"
echo "   - origin/codex/execute-ajustes-de-acessibilidade-e-seo (Dec 10)"
echo "   - origin/jules-header-hero-fix-2473089999087250364 (Dec 16)"
echo "   - origin/qwen-code-b09c1b79-a88d-4c9a-96f0-9df98d44ccfe (Dec 16)"
echo "   - origin/dependabot/npm_and_yarn/functions/npm_and_yarn-c7292c5e9d (Dec 16)"
echo "   (Execute 'git push origin --delete <branch_name>' para remover)"

echo ""
echo "✨ Limpeza concluída!"

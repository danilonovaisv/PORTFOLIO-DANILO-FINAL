#!/bin/bash
# Script de limpeza do repositório
# Remove arquivos tracked indevidamente

echo "🧹 Iniciando limpeza do repositório..."

# Remove arquivos .DS_Store do tracking
echo "📁 Removendo .DS_Store files..."
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch

# Remove tsconfig.tsbuildinfo
echo "🔧 Removendo tsconfig.tsbuildinfo..."
git rm -f --ignore-unmatch tsconfig.tsbuildinfo

# Remove logs
echo "📝 Removendo logs tracked..."
find . -name "*.log" -print0 | xargs -0 git rm -f --ignore-unmatch

# Atualiza o gitignore
echo "✅ Gitignore já foi atualizado!"

echo ""
echo "✨ Limpeza concluída!"
echo ""
echo "⚠️  PRÓXIMOS PASSOS:"
echo "1. Execute: git add .gitignore"
echo "2. Execute: git commit -m 'chore: cleanup tracked cache files and update gitignore'"
echo "3. Execute: git push"
echo ""
echo "💡 Opcionalmente, você pode executar:"
echo "   git clean -fdX  # Remove arquivos ignorados localmente"

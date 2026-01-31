#!/bin/bash
# Script para testar e fazer deploy do projeto

set -e  # Sai se algum comando falhar

echo "🚀 Iniciando processo de teste e deploy..."

# Caminho absoluto para o diretório raiz do projeto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "📁 Indo para o diretório do projeto: $PROJECT_ROOT"
cd "$PROJECT_ROOT"

echo "🔧 Verificando ambiente..."
echo "Node: $(node --version 2>/dev/null || echo 'Não encontrado')"
echo "pnpm: $(pnpm --version 2>/dev/null || echo 'Não encontrado')"
echo "Firebase: $(firebase --version 2>/dev/null || echo 'Não encontrado')"

echo ""
echo "🧪 Executando testes..."

# Executa os testes conforme definido no package.json
if pnpm run test; then
    echo "✅ Testes executados com sucesso!"
    
    echo ""
    echo "🏗️  Executando build..."
    if pnpm run build; then
        echo "✅ Build realizado com sucesso!"
        
        echo ""
        echo "🚢 Executando deploy..."
        if pnpm run deploy; then
            echo "🎉 Deploy concluído com sucesso!"
        else
            echo "❌ Erro durante o deploy"
            exit 1
        fi
    else
        echo "❌ Erro durante o build"
        exit 1
    fi
else
    echo "❌ Testes falharam - cancelando deploy"
    exit 1
fi

echo ""
echo "✅ Processo completo: testes aprovados e deploy realizado!"
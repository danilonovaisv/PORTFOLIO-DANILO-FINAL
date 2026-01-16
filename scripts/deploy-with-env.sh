#!/usr/bin/env bash

# Script para fazer deploy com ambiente corretamente configurado
set -e  # Sai se algum comando falhar

# Caminho absoluto para o diretório raiz do projeto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Entrando no diretório do projeto: $PROJECT_ROOT"
cd "$PROJECT_ROOT"

# Certifica-se de que o ambiente está configurado corretamente
export PATH="/opt/homebrew/opt/node@24/bin:$PATH"
export NODE_PATH="/opt/homebrew/lib/node_modules"

# Mostra informações de diagnóstico
echo "Versão do Node: $(node --version)"
echo "Versão do NPM: $(npm --version)"
echo "Versão do Firebase: $(firebase --version)"

# Faz o build do projeto
echo "Executando build do projeto..."
npm run build

# Executa o deploy
echo "Executando deploy do Firebase..."
firebase deploy --only hosting --project portfolio-danilo-novais
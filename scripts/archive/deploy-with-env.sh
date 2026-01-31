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
export NO_UPDATE_NOTIFIER=1
export XDG_CONFIG_HOME="$PROJECT_ROOT/.agent_config"
mkdir -p "$XDG_CONFIG_HOME"

# Mostra informações de diagnóstico
echo "Versão do Node: $(node --version)"
echo "Versão do pnpm: $(pnpm --version)"
echo "Versão do Firebase: $(firebase --version)"

# Faz o build do projeto
# echo "Executando build do projeto..."
# pnpm run build

# Consolidar arquivos estáticos para deploy manual
echo "Consolidando arquivos estáticos em deploy-public..."
rm -rf deploy-public || true
mkdir -p deploy-public/_next/static
cp -r public/* deploy-public/ 2>/dev/null || true
cp -r .next/static/* deploy-public/_next/static/ 2>/dev/null || true

# Patch para corrigir o erro "it.handle is not a function" no código gerado pelo Firebase
echo "Aplicando patch no código gerado do Firebase..."
SERVER_JS=".firebase/portfolio-danilo-novais/functions/server.js"
if [ -f "$SERVER_JS" ]; then
  # Tenta corrigir it.handle para it.default.handle ou garantir que funcione com ESM
  sed -i '' 's/it\.handle/it.default?.handle || it.handle/g' "$SERVER_JS"
  echo "Patch aplicado em $SERVER_JS"
else
  echo "Aviso: $SERVER_JS não encontrado para aplicar patch."
fi

# Executa o deploy
echo "Executando deploy do Firebase..."
firebase deploy --only hosting,functions --project portfolio-danilo-novais --debug
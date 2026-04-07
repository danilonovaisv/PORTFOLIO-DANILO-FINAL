#!/bin/bash
# Script utilitário para iniciar Chrome em modo Debug para MCP

CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DEBUG_PORT=9222

if [[ "$OSTYPE" != "darwin"* ]]; then
  echo "❌ Este script é apenas para macOS."
  exit 1
fi

if ! [ -x "$CHROME_PATH" ]; then
  echo "❌ Chrome não encontrado em: $CHROME_PATH"
  exit 1
fi

echo "🚀 Iniciando Chrome em modo Remote Debugging (Porta $DEBUG_PORT)..."
echo "⚠️  Nota: Isso abrirá uma nova instância isolada do Chrome."

# Inicia Chrome com flags de debug
"$CHROME_PATH" \
  --remote-debugging-port=$DEBUG_PORT \
  --no-first-run \
  --no-default-browser-check \
  --user-data-dir="/tmp/chrome-mcp-debug-profile" \
  &

# Aguarda um momento para inicialização
sleep 2

echo "✅ Chrome iniciado. PID: $!"
echo "📡 Verificando conexão..."

if curl -s http://localhost:$DEBUG_PORT/json/version > /dev/null; then
  echo "✅ Debug Server detectado com sucesso!"
  echo "👉 Agora você pode rodar: pnpm run mcp:chrome"
else
  echo "⚠️  Aviso: Não foi possível confirmar o debug server na porta $DEBUG_PORT."
  echo "Tente acessar http://localhost:$DEBUG_PORT no navegador para verificar."
fi

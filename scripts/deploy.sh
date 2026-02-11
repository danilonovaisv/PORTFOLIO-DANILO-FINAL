#!/usr/bin/env bash
set -euo pipefail

# Deploy canônico: build + preparar hosting + deploy Firebase (hosting + função SSR)
# Requer: nvm com Node 22, pnpm, firebase-cli autenticado

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Usa Node 20 via nvm
# Fix for "nvm is not compatible with the npm_config_prefix environment variable"
unset npm_config_prefix

export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  nvm use 20 >/dev/null
fi

export PATH="$PROJECT_ROOT/node_modules/.bin:$PATH"
export NO_UPDATE_NOTIFIER=1

# Por padrão, usa o config global do Firebase CLI (onde costuma existir login).
# Para isolar o config por projeto, habilite FIREBASE_USE_LOCAL_CONFIG=1.
if [ "${FIREBASE_USE_LOCAL_CONFIG:-0}" = "1" ]; then
  export XDG_CONFIG_HOME="$PROJECT_ROOT/.agent_config"
  mkdir -p "$XDG_CONFIG_HOME"
fi

echo "Node: $(node --version)"
echo "pnpm: $(pnpm --version)"
echo "firebase: $(firebase --version)"

# Build explicitamente com webpack para evitar conflito com Turbopack
# quando existe configuração custom em next.config.mjs.
npx next build --webpack

# Consolida estáticos
bash "$SCRIPT_DIR/prepare-hosting.sh"

# Deploy hosting + função SSR (codebase modern_ssr)
firebase deploy --only hosting,functions:modern_ssr:ssr_modern --project portfolio-danilo-novais

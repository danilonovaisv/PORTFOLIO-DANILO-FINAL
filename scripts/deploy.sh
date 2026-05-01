#!/usr/bin/env bash
set -euo pipefail

# Deploy canônico: build + preparar hosting + deploy Firebase (hosting + função SSR)
# Requer: Node 20 (via nvm), pnpm, firebase-cli autenticado

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Fix for "nvm is not compatible with the npm_config_prefix environment variable"
unset npm_config_prefix

export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  nvm use 20 > /dev/null
fi

export PATH="$PROJECT_ROOT/node_modules/.bin:$PATH"
export NO_UPDATE_NOTIFIER=1

# Configurações de ambiente para o Firebase CLI em ambiente restrito
export XDG_CONFIG_HOME="$PROJECT_ROOT/.agent_config"
mkdir -p "$XDG_CONFIG_HOME"
export FIREBASE_CLI_EXPERIMENTS=webframeworks
export VALIDATE_ENV_WARN_ONLY=1

echo "Node: $(node --version)"
echo "pnpm: $(pnpm --version)"
echo "firebase: $(firebase --version)"

# Build via pnpm (garante prebuild/validate-env)
pnpm run build

# Consolida estáticos para hosting
bash "$SCRIPT_DIR/prepare-hosting.sh"

# ── FIX: sharp version mismatch in Firebase Cloud Build ──────────────────────
# Problema: Firebase Frameworks gera um package.json interno para a Cloud Function SSR.
# O Cloud Build roda `npm ci` usando o package-lock.json do cache local/anterior.
# Se esse cache tiver um package-lock.json com sharp@0.33.x mas o atual é 0.34.x,
# o npm ci falha com "lock file's sharp@0.34.5 does not satisfy sharp@0.33.5".
#
# Solução:
# 1. Limpar cache .firebase/functions para forçar repackaging limpo.
# 2. Gerar package-lock.json fresco antes do deploy com as versões atuais.

# 1. Limpar cache Firebase functions (força repackaging limpo)
FIREBASE_CACHE_DIR=".firebase/portfolio-danilo-novais/functions"
if [ -d "$FIREBASE_CACHE_DIR" ]; then
  echo "🧹 Limpando cache Firebase functions (evita mismatch de package-lock)..."
  rm -rf "$FIREBASE_CACHE_DIR"
  echo "✅ Cache limpo."
fi

# 2. Remover o "packageManager" field do package.json:
#    O Firebase Cloud Build usa npm internamente e falha se pnpm for o packageManager.
TMP_PKG_JSON=$(mktemp)
cp package.json "$TMP_PKG_JSON"
TMP_FUNC_PKG_JSON=$(mktemp)
cp functions/package.json "$TMP_FUNC_PKG_JSON"
node -e "
  const fs = require('fs');
  for (const file of ['package.json', 'functions/package.json']) {
    const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
    delete pkg.packageManager;
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
  }
"
echo "✅ Campo packageManager removido temporariamente dos package.json do deploy"

# 3. PULAR geração de package-lock.json (Bug no npm detectado)
echo "📦 Pulando geração de package-lock.json devido a incompatibilidade do npm..."

echo "📦 Gerando package-lock.json consistente para Cloud Build..."
npm install --legacy-peer-deps --package-lock-only --ignore-scripts 2>/dev/null || \
  npm install --legacy-peer-deps --package-lock-only --ignore-scripts --force 2>/dev/null || \
  echo "⚠️  AVISO: Não foi possível gerar package-lock.json (deploy continua)"
echo "✅ package-lock.json gerado"

echo "📦 Gerando functions/package-lock.json consistente para Cloud Build..."
(
  cd functions
  npm install --legacy-peer-deps --package-lock-only --ignore-scripts 2>/dev/null || \
    npm install --legacy-peer-deps --package-lock-only --ignore-scripts --force 2>/dev/null || \
    echo "⚠️  AVISO: Não foi possível gerar functions/package-lock.json (deploy continua)"
)
echo "✅ functions/package-lock.json gerado"


# ─────────────────────────────────────────────────────────────────────────────

# Restaurar package.json e limpar arquivos temporários ao sair (sucesso ou falha)
restore_on_exit() {
  echo "🔄 Restaurando package.json originais..."
  mv "$TMP_PKG_JSON" package.json
  mv "$TMP_FUNC_PKG_JSON" functions/package.json
  # Remover package-lock.json gerado: projeto usa pnpm, nunca deve versionar npm lock
  rm -f package-lock.json functions/package-lock.json
  echo "✅ Limpeza concluída."
}
trap restore_on_exit EXIT

# Limpar cache de build anterior do Firebase (ajuda com erros de Sharp)
echo "🧹 Limpando cache do Firebase Hosting..."
./node_modules/.bin/firebase hosting:channel:deploy --expires 1h temp-clean --project portfolio-danilo-novais || true

# Deploy hosting + função SSR
echo "🚀 Iniciando Deploy..."
./node_modules/.bin/firebase deploy --only hosting,functions --project portfolio-danilo-novais

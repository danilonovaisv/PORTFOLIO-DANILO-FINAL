#!/usr/bin/env bash
set -euo pipefail

# Robust path resolution
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 Starting Ghost System Deployment"
echo "📍 Project Root: $PROJECT_ROOT"

cd "$PROJECT_ROOT"

# Cleanup environment
unset npm_config_prefix

# NVM Support
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # Use a subshell to avoid polluting or breaking based on user's zsh config
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  
  echo "🟢 Adjusting Node.js version..."
  # Try 22 (as per package.json), fallback to 20
  if nvm use 22 >/dev/null 2>&1; then
    echo "✅ Using Node.js 22"
  elif nvm use 20 >/dev/null 2>&1; then
    echo "⚠️  Node.js 22 not found, using 20"
  else
    echo "⚠️  NVM switch failed, continuing with current node..."
  fi
fi

# Config
MODE="${1:-preview}"
CHANNEL_ID="${2:-ghost-preview}"
EXPIRES="${3:-7d}"
PROJECT_ID="${FIREBASE_PROJECT_ID:-portfolio-danilo-novais}"

export NO_UPDATE_NOTIFIER=1
export FIREBASE_CLI_EXPERIMENTS="${FIREBASE_CLI_EXPERIMENTS:-webframeworks}"
export VALIDATE_ENV_WARN_ONLY="${VALIDATE_ENV_WARN_ONLY:-1}"

# Ensure we use global pnpm but scoped to this directory
PNPM="pnpm --dir $PROJECT_ROOT"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "❌ Missing required command: $1" >&2
    exit 1
  fi
}

print_versions() {
  echo "--- Environment Info ---"
  echo "Project: $PROJECT_ID"
  echo "Node: $(node --version)"
  echo "pnpm: $($PNPM --version 2>/dev/null || echo 'not found')"
  echo "Firebase: $(firebase --version 2>/dev/null || echo 'not found')"
  echo "------------------------"
}

run_preflight() {
  echo "🔍 Running preflight checks..."
  $PNPM run predeploy
}

run_build() {
  echo "🏗️  Building production bundle..."
  $PNPM run build
  if [ -x "scripts/prepare-hosting.sh" ]; then
    bash scripts/prepare-hosting.sh
  fi
}

run_preview() {
  run_preflight
  run_build
  echo "☁️  Deploying to preview channel: $CHANNEL_ID"
  firebase hosting:channel:deploy "$CHANNEL_ID" \
    --project "$PROJECT_ID" \
    --expires "$EXPIRES"
}

run_live() {
  run_preflight
  run_build
  echo "🔥 Deploying to LIVE production environment"
  firebase deploy --only hosting --project "$PROJECT_ID"
}

# Validation
require_command node
require_command pnpm
require_command firebase
print_versions

case "$MODE" in
  preflight)
    run_preflight
    ;;
  preview)
    run_preview
    ;;
  live|production|prod)
    run_live
    ;;
  *)
    echo "Usage: $0 {preflight|preview|live} [channel-id] [expires]" >&2
    exit 2
    ;;
esac


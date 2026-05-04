#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

unset npm_config_prefix

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # Mirrors the repository deploy script so Firebase builds run on the expected Node line.
  . "$HOME/.nvm/nvm.sh"
  nvm use 20 >/dev/null || echo "NVM use 20 failed, continuing with current node..."
fi

MODE="${1:-preview}"
CHANNEL_ID="${2:-ghost-preview}"
EXPIRES="${3:-7d}"
PROJECT_ID="${FIREBASE_PROJECT_ID:-portfolio-danilo-novais}"

export NO_UPDATE_NOTIFIER=1
export FIREBASE_CLI_EXPERIMENTS="${FIREBASE_CLI_EXPERIMENTS:-webframeworks}"
export VALIDATE_ENV_WARN_ONLY="${VALIDATE_ENV_WARN_ONLY:-1}"
export PATH="$PROJECT_ROOT/node_modules/.bin:$PATH"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

print_versions() {
  echo "Project: $PROJECT_ID"
  echo "Node: $(node --version)"
  echo "pnpm: $(pnpm --version 2>/dev/null || echo 'not found in path')"
  echo "Firebase CLI: $(firebase --version 2>/dev/null || echo 'not found in path')"
}

run_preflight() {
  pnpm run predeploy
}

run_build() {
  pnpm run build
  if [ -x "scripts/prepare-hosting.sh" ]; then
    bash scripts/prepare-hosting.sh
  fi
}

run_preview() {
  run_preflight
  run_build
  firebase hosting:channel:deploy "$CHANNEL_ID" \
    --project "$PROJECT_ID" \
    --expires "$EXPIRES"
}

run_live() {
  run_preflight
  run_build
  firebase deploy --only hosting --project "$PROJECT_ID"
}

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

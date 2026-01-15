#!/usr/bin/env bash
set -euo pipefail

cd "$(cd "$(dirname "$0")" && pwd)/.."

REAL_NPM_PATH="$(command -v npm)"
export REAL_NPM_PATH
export PATH="$(pwd)/scripts:$PATH"

pnpm run build:prod

firebase deploy --only hosting --project portfolio-danilo-novais --debug

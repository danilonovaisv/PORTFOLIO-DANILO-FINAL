#!/usr/bin/env bash

# Improved script to deploy with properly configured PATH for Firebase
set -e  # Exit if any command fails

# Determine script and project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Entering project directory: $PROJECT_ROOT"
cd "$PROJECT_ROOT"

# Enhanced PATH configuration for Node/NPM
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
elif command -v nvm >/dev/null 2>&1; then
  # If nvm is available but not sourced, use it to set node version
  nvm use default 2>/dev/null || nvm use node 2>/dev/null || true
fi

# Add common Node.js installation paths to PATH
export PATH="./node_modules/.bin:$PATH"
export PATH="$(npm bin):$PATH"

# Attempt to determine the correct node/npm location
if command -v node >/dev/null 2>&1; then
  NODE_PATH=$(dirname "$(command -v node)")
  export PATH="$NODE_PATH:$PATH"
fi

# Print diagnostic information
echo "Node version: $(node --version 2>/dev/null || echo 'Not found')"
echo "NPM version: $(npm --version 2>/dev/null || echo 'Not found')"
echo "Firebase version: $(firebase --version 2>/dev/null || echo 'Not found')"

# Ensure we have the required tools
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is not installed or not in PATH"
  exit 1
fi

if ! command -v firebase >/dev/null 2>&1; then
  echo "Error: firebase is not installed or not in PATH"
  exit 1
fi

# Run the build
echo "Running project build..."
npm run build

# Deploy to Firebase
echo "Deploying to Firebase..."
firebase deploy --only hosting --project portfolio-danilo-novais
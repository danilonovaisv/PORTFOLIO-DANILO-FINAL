#!/bin/bash
echo "🔥 FIX PNPM STORE v10 - macOS"
pkill -f pnpm 2>/dev/null
rm -rf ~/Library/pnpm/store/v10 ~/.pnpm-store node_modules pnpm-lock.yaml .pnpm-state
sudo chown -R $(whoami):staff ~/Library/pnpm .
pnpm config set store-dir .pnpm-store
pnpm install
echo "✅ PNPM Store Recriado!"

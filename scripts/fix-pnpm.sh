#!/bin/bash
# nextjs-r3f-pnpm-fix.sh
echo "🔥 NEXT.JS APP ROUTER + R3F + PNPM FIX"

# Kill
pkill -f "next|pnpm|three"

# Clean
rm -rf .next node_modules pnpm-lock.yaml .pnpm-store ~/Library/pnpm/store/
sudo chown -R $(whoami):staff ~/Library/pnpm .

# Config
cat > .npmrc << EOF
store-dir=.pnpm-store
shamefully-hoist=false
public-hoist-pattern[]=*three*
public-hoist-pattern[]=*@react-three*
EOF

# Install
pnpm install --frozen-lockfile=false
pnpm dedupe

echo "✅ PRONTO! pnpm dev"
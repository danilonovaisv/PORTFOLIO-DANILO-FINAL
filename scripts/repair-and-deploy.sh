#!/bin/bash
set -e

# Emergency Repair and Deploy Script
# Bypasses broken pnpm/npm/node_modules environment issues

echo "🔧 Starting Emergency Deploy Sequence..."

# 1. Environment Variables Bypass
export VALIDATE_ENV_WARN_ONLY=1
echo "✅ Environment validation warnings enabled."

# 2. Run Prebuild Scripts
echo "🚀 Running prebuild..."
if [ -f "scripts/generate-build-info.cjs" ]; then
    node scripts/generate-build-info.cjs
else
    echo "⚠️ scripts/generate-build-info.cjs not found, skipping."
fi

# 3. Manual Next.js Build
echo "🏗️  Building Next.js application..."
# Try to find Next.js binary
NEXT_BIN="node_modules/next/dist/bin/next"

if [ -f "$NEXT_BIN" ]; then
    echo "Using Next.js binary at $NEXT_BIN"
    node "$NEXT_BIN" build --webpack
else
    echo "❌ Next.js binary not found at $NEXT_BIN"
    echo "Attempting to find it..."
    NEXT_BIN_ALT=$(find node_modules -name "next" -type f | grep "bin/next" | head -n 1)
    if [ -n "$NEXT_BIN_ALT" ]; then
        echo "Found Next.js at $NEXT_BIN_ALT"
        node "$NEXT_BIN_ALT" build --webpack
    else
        echo "❌ Critical Error: Next.js binary not found. Cannot build."
        exit 1
    fi
fi

# 4. Prepare Hosting
echo "📦 Preparing hosting assets..."
bash scripts/prepare-hosting.sh

# 5. Deploy to Firebase
echo "🔥 Deploying to Firebase..."
# Check for global firebase
if command -v firebase &> /dev/null; then
    firebase deploy --only hosting,functions:modern_ssr:ssr_modern --project portfolio-danilo-novais --debug
else
    echo "❌ Firebase CLI not found in PATH."
    exit 1
fi

echo "🎉 Deployment Sequence Complete!"

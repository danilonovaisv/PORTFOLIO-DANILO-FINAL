#!/bin/bash
# scripts/debug-css.sh

echo "🔍 Starting CSS Debugging..."

# 1. Clean Caches
echo "🧹 Cleaning caches..."
rm -rf .next .turbo node_modules/.cache
echo "✅ Cache cleaned."

# 2. Scan for specific error pattern
echo "🔎 Scanning for invalid class pattern 'bg-[.4!]'..."
if grep -r "bg-\[\.4\!\]" src; then
    echo "❌ Found invalid class usage!"
else
    echo "✅ No literal invalid classes found in src/."
fi

# 3. Run Build with Debug Flags
echo "🛠 Running build with debug info..."
# Force Tailwind to be verbose if possible, though v4 is quieter.
# Next.js debug flags
export NEXT_DEBUG_BUILD_ERRORS=1
export LOG_LEVEL=debug

pnpm run build

echo "🏁 Debug process finished."

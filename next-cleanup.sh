#!/bin/bash
cd "$(dirname "$0")" || exit
echo "🚀 Ghost Portfolio Cleanup Suite"
echo "Cleaning caches and temporary files..."

# Remove project build artifacts
rm -rf .next/ out/ dist/ build/
rm -rf .turbo/ coverage/ .nyc_output/

# Remove logs
find . -name "*.log" -delete

# Remove TypeScript build info
find . -name "tsconfig.tsbuildinfo" -delete

# Remove local caches that are bloating the repo (identified in baseline)
rm -rf .npm-local-cache/
rm -rf .pnpm-store/
rm -rf .jest_cache/
rm -rf test-results/

# Optional: Clean node_modules (uncomment if full reinstall is desired)
# rm -rf node_modules/

echo "✅ Cleanup complete."

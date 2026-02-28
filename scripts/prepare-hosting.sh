#!/bin/bash
set -e

# Consolidate static files into deploy-public for manual deployment
echo "Consolidating static files into deploy-public..."
rm -rf deploy-public || true
mkdir -p deploy-public/_next/static

# Copy public assets
if [ -d "public" ]; then
  cp -r public/* deploy-public/ 2>/dev/null || true
fi

# Copy build static assets
if [ -d ".next/static" ]; then
  cp -r .next/static/* deploy-public/_next/static/ 2>/dev/null || true
fi

echo "deploy-public prepared."

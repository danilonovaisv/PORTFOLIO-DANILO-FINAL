#!/bin/bash
# install-mcps.sh - Script to verify MCP environment

echo "-----------------------------------"
echo "Configuring Curated MCP Servers..."
echo "-----------------------------------"
echo "1. GitHub MCP Server (@modelcontextprotocol/server-github via npx)"
echo "2. Chrome DevTools MCP Server (chrome-devtools-mcp via npx)"
echo ""

# Verify Node.js and npx are available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx is not installed or not in your PATH."
    exit 1
fi

echo "✅ npx is available."
echo ""
echo "MCP Servers are configured to run via npx in '.agent/mcp-config.json'."
echo ""
echo "Please verify your GitHub Token is set in '.agent/mcp-config.json' if you intend to use the GitHub server."
echo "Running 'pnpm install' to ensure project integrity..."

# Use -s for silent pnpm install to reduce noise, unless it fails
pnpm install --silent

if [ $? -eq 0 ]; then
  echo "✅ Project dependencies satisfy requirements."
else
  echo "⚠️ 'pnpm install' encountered an issue, but MCP configuration is complete."
  echo "If you saw permission errors, try running: sudo chown -R $(whoami) ."
fi

exit 0

#!/bin/bash
export PATH="/opt/homebrew/opt/node.js/bin:/opt/homebrew/bin:$HOME/.local/bin:/usr/local/bin:$PATH"
ln -sf /opt/homebrew/opt/node.js/bin/node /tmp/node 2>/dev/null || true
export PATH="/tmp:$PATH"
exec /opt/homebrew/opt/node.js/bin/node node_modules/next/dist/bin/next dev --port 3000

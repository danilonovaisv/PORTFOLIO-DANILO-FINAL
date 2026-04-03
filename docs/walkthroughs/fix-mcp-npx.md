# Walkthrough: Fixing MCP "npx" Path Error

This document outlines the steps taken to resolve the `exec: "npx": executable file not found in $PATH` error that was affecting MCP servers.

## 🛠️ Changes Implemented

### 1. Robust MCP Wrapper (`scripts/mcp-wrapper.cjs`)

The wrapper was enhanced to proactively manage the execution environment:

- **Path Injection**: Automatically adds `/opt/homebrew/bin`, `/usr/local/bin`, and the project's `scripts/` directory to the `PATH`.
- **Command Redirection**: If the command starts with `npx`, it intelligently resolves it to the project's `scripts/npx` shim or falls back to `pnpm dlx`.

### 2. Smart NPX Shim (`scripts/npx`)

The local `npx` shim was optimized for the current environment:

- **Preference for pnpm**: Since the user's `.npm` cache has directory permission issues (`EPERM`), the shim now prefers `pnpm dlx` which is more stable in this setup.
- **Environment Isolation**: Ensures standard system paths are always present before execution.

### 3. Standardized Configuration (`mcp_servers.json`)

All MCP servers were updated to use the consistent wrapper pattern:

```json
"command": "node",
"args": ["scripts/mcp-wrapper.cjs", "npx", "-y", "@modelcontextprotocol/server-..."]
```

This ensures that every MCP server benefits from the improved environment handling.

## ✅ Verification Results

1. **Command Execution**: Running `node scripts/mcp-wrapper.cjs npx --version` successfully returns `11.11.0` (via pnpm dlx fallback).
2. **Path Resolution**: The wrapper correctly resolves the absolute path to the project's shims.
3. **JSON Integrity**: All configuration files have been validated for correct structure.

## ⚠️ Important Note for User

I detected permission issues in your `~/.npm` directory. While my fixes bypass this by using `pnpm dlx`, you may want to run this command in your terminal to fix overall npm health:

```bash
sudo chown -R $(whoami) ~/.npm
```

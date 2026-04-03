# Plan: Fix MCP "npx" Path Error

The goal is to resolve the error `exec: "npx": executable file not found in $PATH` encountered by MCP servers.

## Problem Analysis

1.  MCP servers are configured in `mcp_servers.json` to use `npx` or `node scripts/mcp-wrapper.cjs npx ...`.
2.  Some environments (like IDE sub-shells or restricted environments) might not have `/opt/homebrew/bin` or other node binary paths in their initialization.
3.  Even with `mcp-wrapper.cjs` injecting paths, `spawn(shell: true)` might still fail if the command itself (`npx`) isn't found during the shell's first look.

## Proposed Solution

1.  **Improve `scripts/mcp-wrapper.cjs`**:
    *   Explicitly check if the command is `npx` and replace it with a more robust call if necessary.
    *   Fallback to `pnpm dlx` if `npx` is missing.
    *   Use absolute paths for the `npx` shim in `scripts/npx`.
2.  **Update `mcp_servers.json`**:
    *   Ensure all servers use the `mcp-wrapper.cjs` for consistency.
    *   Standardize how `npx` is called.
3.  **Verify `scripts/npx` shim**:
    *   Ensure it's executable and works correctly.
4.  **Update PATH in Environment**:
    *   Ensure `.agent/mcp_config.json` (if used by the IDE) has the correct PATH or uses the wrapper.

## Action Items

*   [x] Update `scripts/mcp-wrapper.cjs` to be more resilient (handle `npx` more intelligently).
*   [x] Update `mcp_servers.json` to use the wrapper for ALL servers.
*   [x] Ensure `scripts/npx` and `scripts/npm` are executable.
*   [x] Add `scripts/` to the `PATH` in `mcp-wrapper.cjs`.
*   [x] Test the fixes.

## Verification

*   Run `node scripts/mcp-wrapper.cjs npx --version` and ensure it works.
*   Verify MCP servers start without "npx not found" errors.

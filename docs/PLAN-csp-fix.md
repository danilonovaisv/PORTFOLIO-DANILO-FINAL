# Plan: Resolve CSP WebSocket Conflicts & Source Map Errors

## 🎯 Objective

Fix the persistent Content Security Policy (CSP) errors blocking WebSocket connections (`ws://127.0.0.1:*`) and resolve the 404 errors for Framer Motion source maps.

## 🕵️ Diagnosis

1. **CSP Block**: The current `connect-src` in `next.config.mjs` explicitly lists `ws://localhost:3000` and `ws://127.0.0.1:3000`. However, Next.js 15 (especially with Turbopack) often uses dynamic ports for its development WebSocket server.
2. **Source Map 404s**: Errors like `LayoutGroupContext.mjs.map` not found are usually benign but clutter the logs. They happen when `framer-motion` (or other deps) references a map file not included in the distribution or blocked by dev server routing.

## 🛠️ Implementation Steps

### Phase 1: Planning (Done)

- Identified the strict CSP in `next.config.mjs` as the bottleneck.
- Identified the need for dynamic port support in development.

### Phase 2: Implementation (Orchestration)

#### 1. Security Specialist (`security-auditor`)

- **Modify `next.config.mjs`**:
  - Update `cspHeader` for `connect-src` to allow `ws:` and `wss:` protocols on `localhost` and `127.0.0.1` without a fixed port during development.
  - Implement a conditional CSP that is more permissive in `development` mode while maintaining strictness in `production`.

#### 2. Debugger (`debugger`)

- **Analyze Port Usage**: Verify if the port `59567` is stable or changing.
- **Verification**: Check if the CSP error persists after the fix by inspecting server logs/client console via the browser.

#### 3. Frontend specialist (`frontend-specialist`)

- **Source Map Suppression**: Investigating why `framer-motion` maps are missing. Determine if adding devtool settings in webpack config helps or if it's external.
- **Cleanup**: Ensure the console is clean from 404s to improve developer experience.

## 🧪 Verification Plan

1. **Developer Console**: Verify that `[Error] Refused to connect to ws://...` no longer appears.
2. **HMR Test**: Change a component and ensure Hot Module Replacement still works.
3. **Production Audit**: Ensure that in `NODE_ENV=production`, the CSP remains strict and does not allow arbitrary local WebSockets.

## 🚀 Execution

Invoke `security_auditor`, `debugger`, and `frontend_specialist` to apply these fixes.

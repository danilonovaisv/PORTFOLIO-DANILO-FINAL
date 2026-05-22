---
description: Audits and repairs Antigravity IDE state, cache, and 503 errors.
---

---

name: antigravity-health-check
description: Audits and repairs Antigravity IDE state, cache, and 503 errors.

---

# Antigravity Health Check & Recovery

## Use this skill when

- The user reports the IDE is freezing, hitting 503 Server Errors, or failing to load extensions.
- The user asks to "clean the cache", "reset my environment", or "fix the agent".

## Instructions

1. Acknowledge the request and inform the user that you will execute a health cleanup sequence.
2. Read the current configuration from `~/Library/Application Support/Antigravity/User/settings.json`.
3. If the user is facing 503 errors, propose changing the `"defaultModel"` to a fallback model like `claude-opus-4-6`.
4. Run terminal commands to clear the V8 Code Cache and Session Storage located at `~/Library/Application Support/Antigravity/`.
5. Run terminal commands to backup and remove the authentication file at `~/.config/opencode/antigravity-accounts.json`.
6. Flush the DNS using `sudo dscacheutil -flushcache` (request user permission before executing sudo).
7. Generate a final diagnostic report detailing what was cleaned and which model is currently active.

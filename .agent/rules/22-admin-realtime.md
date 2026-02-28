---
trigger: always_on
priority: high
match: "**/admin/**"
---

# 22-admin-realtime.md — The Control Center

## ⚡ Zero Deploy Content

- **Mandate**: Content MUST be editable in `/admin` and reflect immediately on the frontend.
- **Mechanism**: Use Supabase Realtime Subscription or SWR with frequent revalidation.
- **Prohibited**: Hardcoded text for marketing copy.

## 🛡️ Security & Access

1. **Middleware Guard**: All `/admin` routes must be protected by Middleware + RLS.
2. **Role Verification**: Check `role: 'admin'` in `user_metadata` on EVERY secured action.
3. **Logs**: ANY write action in `/admin` must generate a log entry in the `audit_logs` table (if available) or console.

## 🔄 Realtime Architecture

- **Websockets**: Use `channel.subscribe()` for live updates (e.g., active visitors, new leads).
- **Graceful Fallback**: If WebSocket fails, fallback to HTTP Polling or static data.
- **State**: Use `Zustand` to hold realtime sync state. Avoid local state for global data.

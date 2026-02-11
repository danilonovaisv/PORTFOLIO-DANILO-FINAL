---
name: admin-realtime
description: Protocols for Admin Dashboard security and Realtime Data handling.
---

# Admin & Realtime Operations

This skill governs the "Control Center" of the portfolio.

## 🛡️ Security First

### 1. Zero Trust Client

- Never trust `useEffect` to check admin status for sensitive writes.
- **Must:** Use Row Level Security (RLS) policies on Supabase.
- **Must:** Middleware protection for `/admin/*` routes.

### 2. Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` -> OK.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -> OK.
- `SUPABASE_SERVICE_ROLE_KEY` -> **SERVER SIDE ONLY**. Never import in a component.

## ⚡ Realtime Data (Supabase)

### 1. Subscription Management

- **Rule:** Always unmount subscriptions.

```typescript
useEffect(() => {
  const channel = supabase.channel('...').subscribe();
  return () => { supabase.removeChannel(channel); }
}, []);
```

### 2. Fallbacks

- Websockets fail. 3G networks fail.
- **Design:** Always show stale/cached data first, then update live.
- **UI:** Show a "Reconnecting..." indicator if the socket drops.

### 3. Optimistic Updates

- For admin actions (e.g., "Toggle Project Visibility"), update the UI *immediately* before the server responds.
- Rollback if the server fails.

## Sync Logic

- Use `SWR` or `TanStack Query` for fetching.
- Use `Zustand` for global realtime state (e.g., "Active Visitors: 5").

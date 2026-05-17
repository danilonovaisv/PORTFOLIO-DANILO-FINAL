---
name: supabase-media-pipeline
description: >
  This skill should be used when the user asks to "set up Supabase Storage", "upload files to Supabase",
  "fetch images from Supabase", "configure Supabase buckets", "implement media upload",
  "load 3D models from Supabase", "set up Supabase client in Next.js", "configure Supabase SSR",
  "create Supabase middleware", "set up Supabase auth", "fetch public assets from Supabase",
  "configure Supabase RLS policies", or any request involving Supabase Storage, the Supabase
  JavaScript client, or media/asset management in a Next.js project.
metadata:
  version: '0.1.0'
  author: 'Danilo Novais'
---

# Supabase Media Pipeline

## Client Architecture

Next.js App Router requires TWO separate Supabase clients:

### Browser Client (`lib/supabase/client.ts`)

- Used in Client Components (`'use client'`)
- Created with `createBrowserClient` from `@supabase/ssr`
- Singleton pattern to avoid multiple instances

### Server Client (`lib/supabase/server.ts`)

- Used in Server Components, Route Handlers, Server Actions
- Created with `createServerClient` from `@supabase/ssr`
- Reads/writes cookies via Next.js `cookies()` function
- Must be called inside a request context

### Middleware (`middleware.ts`)

- Refreshes session tokens on every request
- Redirects unauthenticated users from protected routes

## Storage Bucket Strategy

Organize buckets by access pattern:

| Bucket          | Access        | Purpose                                              |
| --------------- | ------------- | ---------------------------------------------------- |
| `public-assets` | Public        | Hero images, portfolio thumbnails, open-graph images |
| `3d-models`     | Public        | .glb and .gltf files loaded by Three.js              |
| `user-uploads`  | Authenticated | User profile photos, private files                   |
| `admin-assets`  | Service role  | Internal assets, private documents                   |

## URL Construction

Always use `getPublicUrl()` for public buckets — never construct URLs manually:

```typescript
const { data } = supabase.storage
  .from('public-assets')
  .getPublicUrl('hero.jpg');
// Returns: https://xyz.supabase.co/storage/v1/object/public/public-assets/hero.jpg
```

## Critical Rules

1. **Never use the service role key client-side** — it bypasses RLS
2. **Always check `error` on Supabase responses** before using `data`
3. **Use RLS policies** on all tables — default deny, explicit allow
4. **Public buckets need no auth headers** — reference directly via `publicUrl`
5. **For private uploads**, always generate signed URLs server-side

## Reference Files

Load for complete implementations:

- `references/supabase-setup.md` — client.ts, server.ts, middleware.ts, storage helpers, RLS policies

# Admin + Supabase Fixes (2026-02-20)

## Scope

- Admin shell hydration warning
- Project schema runtime crash (Zod)
- Admin write/upload RLS failures in Supabase
- Client error reporter noisy failure in development

## Implemented

- Added `requireServiceRole` option in `requireAdminAccess` and enabled it for project/landing-page write operations.
- Added admin upload API route: `src/app/api/admin/storage/upload/route.ts`.
- Refactored `src/lib/supabase/storage.ts` to upload through server route instead of direct client-side Storage write.
- Replaced `.extend()` with `.safeExtend()` in `src/lib/admin/schemas/project.ts`.
- Mitigated hydration mismatch in `AdminShell` by mounting mobile `Sheet` only after client mount.
- Made `src/app/error.tsx` reporter optional and quiet in development when endpoint is unavailable.
- Added maintenance SQL: `supabase/sql/2026-02-20_admin_claim_and_cached_egress_cleanup.sql`.
- Hardened the admin upload route to require the server-side service role, use
  the Node.js runtime for multipart buffering, enforce bucket-specific size
  limits (`portfolio-media`: 25 MB, `site-assets`: 10 MB), and return a safe
  request ID instead of server stack traces.
- Allowed the official Cloudflare Web Analytics script and beacon endpoint in
  the global CSP.

## Notes

- Supabase MCP server was not available in this session catalog; applied local code + SQL remediation.

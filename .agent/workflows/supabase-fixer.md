---
description: Solves Supabase issues with Realtime and Storage (RLS/Permissions)
---

# Supabase Fixer Workflow

This workflow systematically diagnoses and fixes common Supabase integration issues in Next.js applications, specifically targeting Realtime connectivity and Storage permissions (RLS).

## Trigger

- User reports "Upload failed with 403"
- User reports "Realtime updates not working"
- User reports "Client-side hydration mismatch with Supabase"

## Phase 1: Audit Configuration & RLS

1. **Load Context**:
   - Read `src/utils/supabase/client.ts`
   - Read `supabase/config.toml` (if exists)

2. **Database Introspection**:
   - Check if `supabase_realtime` publication exists and includes the target table.
   - Command: `psql` or direct SQL query execution via Supabase MCP if available.
   - Query: `select * from pg_publication_tables where pubname = 'supabase_realtime';`

3. **RLS Policy Analysis**:
   - Extract policies for `storage.objects`.
   - Verify `INSERT` policy for `authenticated` role.
   - Check if bucket ID matches implementation (e.g., 'portfolio-assets').

## Phase 2: Implementation Plan & Fix

1. **Storage Fix**:
   - Proposal: Create/Update RLS policy for uploads.
   - Example SQL:

     ```sql
     create policy "Permitir upload autenticado"
     on storage.objects for insert
     to authenticated
     with check ( bucket_id = 'portfolio-assets' AND auth.uid() = owner );
     ```

2. **Realtime Fix**:
   - Refactor client-side hook to handle channel error states.
   - Pattern:

     ```typescript
     channel.subscribe((status) => {
       if (status === 'SUBSCRIBED') { /* ... */ }
       if (status === 'CHANNEL_ERROR') { console.error('RLS or Connection Error'); }
     })
     ```

## Phase 3: Verification

1. **Browser Test**:
   - Navigate to the problematic page.
   - Perform the action (upload/update).
   - Capture screenshot of success or console error.

## Dependencies

- `@supabase/ssr`
- `src/utils/supabase/`

## Artifacts

- Updated SQL policies
- Refactored React hooks
- Verification Screenshot

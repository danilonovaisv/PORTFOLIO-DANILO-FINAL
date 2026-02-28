# Plan: Fix Admin Link Loss & Project Saving (Orchestration Phase 1)

## 🎯 Objective

Fix the "link loss" (likely session/redirect issues) and "projects not applying" (likely client-side RLS blocking) by refactoring the Admin Project Management flow to use **Server Actions** instead of client-side Supabase calls.

## 🕵️ Diagnosis & Findings

1. **Root Cause of "Not Applying"**:
   - `ProjectForm.tsx` currently performs `supabase.from('portfolio_projects').upsert(...)` directly in the browser.
   - If the user's session token is stale, invalid, or lacks the explicit admin claim required by RLS, the operation fails silently or throws an error that the client retry logic masks.
   - **Fix**: Move the mutation logic to a **Server Action** (`upsertProjectAction`) which uses `requireAdminAccess()` to enforce permissions securely on the server.

2. **Root Cause of "Link Loss"**:
   - The middleware relies on the `__session` cookie name (optimized for Firebase Hosting). If the environment isn't strictly controlled or if local dev differs from production, the session might be dropped.
   - Implementing Server Actions ensures that the session cookie is validated on every request in a consistent environment.

3. **Supabase Realtime**:
   - The user requested check on Realtime. The Admin List (`trabalhos/page.tsx`) is a Server Component. It doesn't need a WebSocket subscription for *listing*. It relies on `revalidatePath` to show updates.
   - By moving to Server Actions, we can guarantee `revalidatePath('/admin/trabalhos')` is called immediately after a successful save, ensuring the list is fresh without a full page reload.

## 🛠️ Implementation Steps

### Phase 2: Implementation (Parallel Execution)

#### 1. Backend Engineer (`backend-specialist`)

- [ ] **Create Server Action**: `src/app/admin/(protected)/trabalhos/actions.ts`
  - Implement `upsertProjectAction` taking `ProjectMutationInput`.
  - Use `requireAdminAccess()` to secure the call.
  - Call `upsertProject` from `src/lib/supabase/queries/projects.ts` (or move logic there).
  - ensure `revalidatePath` is called for `/admin/trabalhos`, `/portfolio`, and `/`.
- [ ] **Create Delete Action**: `deleteProjectAction`.

#### 2. Frontend Specialist (`frontend-specialist`)

- [ ] **Refactor `ProjectForm.tsx`**:
  - Remove direct `supabase` client usage for saving.
  - Replace `onSubmit` logic to call `upsertProjectAction`.
  - Handle loading states (`useTransition`) and error messages from the Server Action result.
  - Ensure `landing_page_id` is passed correctly (handle empty string as null).

#### 3. DevOps / Security (`security-auditor`)

- [ ] **Verify Middleware**: ensure `middleware.ts` cookie handling (`__session`) is consistent with Firebase Hosting requirements.
- [ ] **Verify RLS**: confirm `portfolio_projects` policies allow `service_role` or specific admin role updates.

## 🧪 Verification Plan

1. **Manual Test**: Login as admin, create a new project, save. Verify it appears in the list.
2. **Link Test**: Ensure no redirects to login occur during typical navigation.
3. **Audit**: Check Supabase logs for failed RLS attempts (should be zero after fix).

## 🚀 Execution Command

`@/orchestrate` - Proceed to Phase 2.

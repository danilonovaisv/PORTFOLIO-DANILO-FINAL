-- Helper Function: is_admin()
-- Part of Mission Control (Zero Deploy)

-- =====================================================
-- 1. HELPER: is_admin()
-- Centralizes admin check logic (Role-based + Claims)
-- =====================================================
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
as $$
begin
  return (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );
end;
$$;

-- Grant execute to authenticated users (logic handles return value)
grant execute on function public.is_admin to authenticated;

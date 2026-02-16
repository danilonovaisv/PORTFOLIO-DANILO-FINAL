-- SQL Strategy for Data Cleanup (Supabase)

-- 1. Create a function to clean old logs
create or replace function clean_old_audit_logs()
returns void as $$
begin
  delete from public.audit_logs
  where created_at < now() - interval '30 days';
end;
$$ language plpgsql;

-- 2. Create a function to clean orphaned assets (optional/dangerous)
-- Use with caution. Better to mark as archived.

-- 3. Scheduled Job (using pg_cron if available, or call manually via Admin)
-- select cron.schedule('0 0 * * *', 'select clean_old_audit_logs()');

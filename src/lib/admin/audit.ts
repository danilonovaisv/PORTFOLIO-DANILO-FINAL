import type { SupabaseClient, User } from '@supabase/supabase-js';

export type AdminAuditStatus = 'success' | 'denied' | 'error';

export type AdminAuditPayload = {
  action: string;
  resource: string;
  resourceId?: string | null;
  status: AdminAuditStatus;
  metadata?: Record<string, unknown>;
  errorCode?: string | null;
  errorMessage?: string | null;
};

type AdminAuditInsert = {
  actor_user_id: string | null;
  actor_email: string | null;
  action: string;
  resource: string;
  resource_id: string | null;
  status: AdminAuditStatus;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Record<string, unknown>;
  error_code: string | null;
  error_message: string | null;
};

function clampText(value: string | null | undefined, max = 500): string | null {
  if (!value) return null;
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

export function buildAdminAuditRecord(
  user: User | null,
  payload: AdminAuditPayload
): AdminAuditInsert {
  return {
    actor_user_id: user?.id ?? null,
    actor_email: user?.email ?? null,
    action: payload.action,
    resource: payload.resource,
    resource_id: payload.resourceId ?? null,
    status: payload.status,
    ip_address: null,
    user_agent: null,
    metadata: payload.metadata ?? {},
    error_code: clampText(payload.errorCode, 120),
    error_message: clampText(payload.errorMessage, 500),
  };
}

export async function logAdminAudit(
  supabase: SupabaseClient,
  user: User | null,
  payload: AdminAuditPayload
) {
  const record = buildAdminAuditRecord(user, payload);
  const { error } = await supabase.from('admin_audit_log').insert(record);
  if (error) {
    // Never break admin flows due to audit insert failures.
    console.error('[Admin Audit] failed to persist audit record', {
      action: payload.action,
      resource: payload.resource,
      status: payload.status,
      error: error.message,
    });
  }
}

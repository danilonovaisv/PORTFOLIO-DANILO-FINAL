import type { SupabaseClient, User } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase.types';

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

type AuditLogInsert = {
  actor_user_id: string | null;
  action: string;
  entity: string;
  entity_id: string | null;
  details: any;
};

function clampText(value: string | null | undefined, max = 500): string | null {
  if (!value) return null;
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

export function buildAdminAuditRecord(
  user: User | null,
  payload: AdminAuditPayload
): AuditLogInsert {
  return {
    actor_user_id: user?.id ?? null,
    action: payload.action,
    entity: payload.resource,
    entity_id: payload.resourceId ?? null,
    details: {
      status: payload.status,
      error_code: clampText(payload.errorCode, 120),
      error_message: clampText(payload.errorMessage, 500),
      ...(payload.metadata ?? {}),
    },
  };
}

export async function logAdminAudit(
  supabase: SupabaseClient<Database>,
  user: User | null,
  payload: AdminAuditPayload
) {
  const record = buildAdminAuditRecord(user, payload);
  const { error } = await supabase.from('audit_log').insert(record);
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

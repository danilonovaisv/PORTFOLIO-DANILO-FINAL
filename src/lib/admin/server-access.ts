import { logger } from '@/lib/logger';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { isAdminUser, shouldEnforceAdminRole } from '@/lib/admin/authz';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase.types';

export class AdminAccessError extends Error {
  public readonly code: 'unauthorized' | 'forbidden';

  constructor(message: string, code: 'unauthorized' | 'forbidden') {
    super(message);
    this.name = 'AdminAccessError';
    this.code = code;
  }
}

export type AdminPrivilegeLevel = 'service_role' | 'request_scoped';
type RequireAdminAccessOptions = {
  requireServiceRole?: boolean;
};

export function assertAdminAccess(user: User | null | undefined) {
  if (!user) {
    throw new AdminAccessError(
      'SYSTEM_ERR: UNAUTHORIZED — ADMIN_LOGIN_REQUIRED',
      'unauthorized'
    );
  }

  if (shouldEnforceAdminRole() && !isAdminUser(user)) {
    throw new AdminAccessError(
      'SYSTEM_ERR: FORBIDDEN — ADMIN_ROLE_REQUIRED',
      'forbidden'
    );
  }
}

export async function requireAdminAccess(
  options: RequireAdminAccessOptions = {}
) {
  let requestScopedSupabase: SupabaseClient<Database>;
  try {
    requestScopedSupabase = await createClient();
  } catch (clientErr) {
    throw new AdminAccessError(
      `SYSTEM_ERR: SUPABASE_CLIENT_UNAVAILABLE — ${clientErr instanceof Error ? clientErr.message : 'ENV_CONFIG_MISSING'}`,
      'unauthorized'
    );
  }

  const {
    data: { user },
    error,
  } = await requestScopedSupabase.auth.getUser();

  if (error) {
    throw new AdminAccessError(
      `SYSTEM_ERR: AUTH_SESSION_ERROR — ${error.message.toUpperCase()}`,
      'unauthorized'
    );
  }

  assertAdminAccess(user);

  let supabase: SupabaseClient<Database> = requestScopedSupabase;
  let privilegeLevel: AdminPrivilegeLevel = 'request_scoped';

  try {
    supabase = await createClient({ admin: true });
    privilegeLevel = 'service_role';
  } catch (error) {
    logger.warn(
      '[Admin Access] service role unavailable, using request-scoped client.',
      {
        reason: error instanceof Error ? error.message : 'unknown',
        userId: user?.id ?? null,
      }
    );
  }

  if (options.requireServiceRole && privilegeLevel !== 'service_role') {
    throw new AdminAccessError(
      'SYSTEM_ERR: SERVICE_ROLE_REQUIRED — CONFIGURE_SUPABASE_SERVICE_ROLE_KEY_ON_SERVER',
      'forbidden'
    );
  }

  return { supabase, user, privilegeLevel };
}

import type { SupabaseClient, User } from '@supabase/supabase-js';
import { isAdminUser, shouldEnforceAdminRole } from '@/lib/admin/authz';
import { createAdminClient } from '@/lib/supabase/admin';
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
    throw new AdminAccessError('Unauthorized.', 'unauthorized');
  }

  if (shouldEnforceAdminRole() && !isAdminUser(user)) {
    throw new AdminAccessError('Forbidden.', 'forbidden');
  }
}

export async function requireAdminAccess(
  options: RequireAdminAccessOptions = {}
) {
  const requestScopedSupabase = await createClient();
  const {
    data: { user },
    error,
  } = await requestScopedSupabase.auth.getUser();

  if (error) {
    throw new AdminAccessError(error.message, 'unauthorized');
  }

  assertAdminAccess(user);

  let supabase: SupabaseClient<Database> = requestScopedSupabase;
  let privilegeLevel: AdminPrivilegeLevel = 'request_scoped';

  try {
    supabase = createAdminClient();
    privilegeLevel = 'service_role';
  } catch (error) {
    console.warn(
      '[Admin Access] service role unavailable, using request-scoped client.',
      {
        reason: error instanceof Error ? error.message : 'unknown',
        userId: user?.id ?? null,
      }
    );
  }

  if (options.requireServiceRole && privilegeLevel !== 'service_role') {
    throw new AdminAccessError(
      'Operação administrativa requer SUPABASE_SERVICE_ROLE_KEY configurada no servidor.',
      'forbidden'
    );
  }

  return { supabase, user, privilegeLevel };
}

import { createAdminClient, isServiceRoleConfigured } from '@/lib/supabase/admin';
import type { Database } from '@/lib/supabase.types';

export const ADMIN_USER_ROLES = ['owner', 'editor'] as const;
export const ADMIN_USER_STATUSES = ['active', 'disabled'] as const;

export type AdminUserRole = (typeof ADMIN_USER_ROLES)[number];
export type AdminUserStatus = (typeof ADMIN_USER_STATUSES)[number];
type AdminUserRow = Database['public']['Tables']['admin_users']['Row'];

export type AdminUserListItem = {
  userId: string;
  email: string;
  fullName: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  createdAt: string;
  lastSignInAt: string | null;
};

const ADMIN_APP_ROLES = new Set(['admin', 'owner', 'super_admin', 'editor']);

export function normalizeAdminUserRole(value: string): AdminUserRole {
  return value === 'editor' ? 'editor' : 'owner';
}

export function getAdminAppMetadataRole(role: AdminUserRole): string {
  return role === 'editor' ? 'editor' : 'owner';
}

export function isUserDisabled(bannedUntil?: string | null): boolean {
  if (!bannedUntil) return false;

  const timestamp = Date.parse(bannedUntil);
  return Number.isFinite(timestamp) && timestamp > Date.now();
}

function getUserFullName(user: {
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
}) {
  const metadata = user.user_metadata ?? {};
  const raw =
    metadata.full_name ??
    metadata.name ??
    metadata.display_name ??
    metadata.first_name;

  if (typeof raw === 'string' && raw.trim()) return raw.trim();
  return user.email?.split('@')[0] ?? 'Administrador';
}

export async function listAdminUsers(): Promise<AdminUserListItem[]> {
  if (!isServiceRoleConfigured()) return [];

  const adminClient = createAdminClient();
  const [{ data: rowData, error: rowError }, authResult] = await Promise.all([
    adminClient.from('admin_users').select('*'),
    adminClient.auth.admin.listUsers({ page: 1, perPage: 200 }),
  ]);

  if (rowError) {
    throw rowError;
  }

  if (authResult.error) {
    throw authResult.error;
  }

  const rows = (rowData ?? []) as AdminUserRow[];
  const authUsers = authResult.data.users ?? [];
  const rowMap = new Map(rows.map((row) => [row.user_id, row]));

  const candidates = authUsers.filter((user) => {
    const appRole = String(user.app_metadata?.role ?? '').toLowerCase();
    return rowMap.has(user.id) || ADMIN_APP_ROLES.has(appRole);
  });

  return candidates
    .map((user) => {
      const row = rowMap.get(user.id);
      return {
        userId: user.id,
        email: user.email ?? '',
        fullName: getUserFullName(user),
        role: normalizeAdminUserRole(
          row?.role ?? String(user.app_metadata?.role ?? 'owner')
        ),
        status: isUserDisabled((user as { banned_until?: string | null }).banned_until)
          ? 'disabled'
          : 'active',
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at ?? null,
      } satisfies AdminUserListItem;
    })
    .sort((a, b) => {
      if (a.role !== b.role) return a.role === 'owner' ? -1 : 1;
      return a.email.localeCompare(b.email);
    });
}

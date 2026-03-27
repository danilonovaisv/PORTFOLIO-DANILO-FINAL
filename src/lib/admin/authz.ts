import type { User } from '@supabase/supabase-js';

// Roles that grant access to the admin panel.
// Must match the is_admin() DB function (see migration 20260228000001).
// 'editor' maps to the 'editor' role in the admin_users table.
const ADMIN_ROLES = new Set(['admin', 'owner', 'super_admin', 'editor']);

function parseAllowedEmails(): Set<string> {
  const raw = process.env.ADMIN_ALLOWED_EMAILS ?? '';
  return new Set(
    raw
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function isAdminUser(user: User | null | undefined): boolean {
  if (!user) return false;

  const appRole = user.app_metadata?.role;
  if (typeof appRole === 'string' && ADMIN_ROLES.has(appRole.toLowerCase())) {
    return true;
  }

  if (user.email) {
    const allowedEmails = parseAllowedEmails();
    if (allowedEmails.has(user.email.toLowerCase())) {
      return true;
    }
  }

  return false;
}

export function shouldEnforceAdminRole(): boolean {
  if (process.env.NODE_ENV === 'production') {
    return true;
  }

  const value = process.env.ADMIN_ENFORCE_ROLE?.trim().toLowerCase();
  return value !== 'false' && value !== '0' && value !== 'off';
}

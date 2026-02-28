import { assertAdminAccess, AdminAccessError } from '@/lib/admin/server-access';

describe('admin server access guard', () => {
  const previousEnforceRole = process.env.ADMIN_ENFORCE_ROLE;
  const previousAllowedEmails = process.env.ADMIN_ALLOWED_EMAILS;

  afterEach(() => {
    process.env.ADMIN_ENFORCE_ROLE = previousEnforceRole;
    process.env.ADMIN_ALLOWED_EMAILS = previousAllowedEmails;
  });

  it('throws unauthorized when user is missing', () => {
    expect(() => assertAdminAccess(null)).toThrow(AdminAccessError);
    expect(() => assertAdminAccess(null)).toThrow('Unauthorized');
  });

  it('throws forbidden when user is not admin and enforcement is enabled', () => {
    process.env.ADMIN_ENFORCE_ROLE = 'true';
    process.env.ADMIN_ALLOWED_EMAILS = '';
    const user = {
      email: 'viewer@domain.com',
      app_metadata: {},
      user_metadata: {},
    } as any;

    expect(() => assertAdminAccess(user)).toThrow(AdminAccessError);
    expect(() => assertAdminAccess(user)).toThrow('Forbidden');
  });

  it('allows non-admin user when enforcement is disabled', () => {
    process.env.ADMIN_ENFORCE_ROLE = 'false';
    const user = {
      email: 'viewer@domain.com',
      app_metadata: {},
      user_metadata: {},
    } as any;

    expect(() => assertAdminAccess(user)).not.toThrow();
  });
});

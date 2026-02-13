import { isAdminUser } from '@/lib/admin/authz';
import type { User } from '@supabase/supabase-js';

// Mock User factory
const createUser = (
  appMetadata: any = {},
  userMetadata: any = {},
  email: string = 'test@example.com'
): User => {
  return {
    id: 'test-user-id',
    app_metadata: appMetadata,
    user_metadata: userMetadata,
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    email: email,
    phone: '',
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    role: 'authenticated',
    updated_at: new Date().toISOString(),
  } as User;
};

describe('isAdminUser', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should return false for null/undefined user', () => {
    expect(isAdminUser(null)).toBe(false);
    expect(isAdminUser(undefined)).toBe(false);
  });

  it('should return true when app_metadata.role is admin', () => {
    const user = createUser({ role: 'admin' }, {});
    expect(isAdminUser(user)).toBe(true);
  });

  it('should return true when app_metadata.role is owner', () => {
    const user = createUser({ role: 'owner' }, {});
    expect(isAdminUser(user)).toBe(true);
  });

  it('should return false when user_metadata.role is admin (security check)', () => {
    const user = createUser({}, { role: 'admin' });
    expect(isAdminUser(user)).toBe(false);
  });

  it('should return true when email is in allowed emails', () => {
    process.env.ADMIN_ALLOWED_EMAILS = 'admin@example.com, super@example.com';
    const user = createUser({}, {}, 'admin@example.com');
    expect(isAdminUser(user)).toBe(true);
  });

  it('should return false for regular user', () => {
    const user = createUser({}, {});
    expect(isAdminUser(user)).toBe(false);
  });

  it('should return false for user with random role', () => {
    const user = createUser({ role: 'editor' }, { role: 'editor' });
    expect(isAdminUser(user)).toBe(false);
  });
});

import '@testing-library/jest-dom';

// Provide safe defaults for tests so Supabase helpers don't throw on missing env
process.env.NEXT_PUBLIC_SUPABASE_URL ??= 'https://test-project.supabase.co';
process.env.SUPABASE_URL ??= process.env.NEXT_PUBLIC_SUPABASE_URL;
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??= 'test-anon-key-placeholder';
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??=
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

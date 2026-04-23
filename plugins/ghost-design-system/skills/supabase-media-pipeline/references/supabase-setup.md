# Supabase Client Setup — Complete Implementations

## lib/supabase/client.ts — Browser Client

```typescript
import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

/** Singleton browser client — safe to call multiple times */
export function createClient(): SupabaseClient {
  if (client) return client;

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return client;
}
```

## lib/supabase/server.ts — Server Client (App Router)

```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';

/** Server-side Supabase client — call inside Server Components and Route Handlers */
export async function createClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components can't set cookies — middleware handles session refresh
          }
        },
      },
    }
  );
}
```

## middleware.ts — Session Refresh

```typescript
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — do not add logic between createServerClient and getUser
  const { data: { user } } = await supabase.auth.getUser();

  // Protect /admin routes
  if (
    !user &&
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

## lib/supabase/storage.ts — Storage Helpers

```typescript
import { createClient } from './client';
import type { StorageAsset } from '@/types';

const BUCKETS = {
  PUBLIC:  'public-assets',
  MODELS:  '3d-models',
  UPLOADS: 'user-uploads',
} as const;

type BucketName = (typeof BUCKETS)[keyof typeof BUCKETS];

/** Get public URL for an asset in a public bucket */
export function getPublicUrl(bucket: BucketName, path: string): string {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/** Get a signed URL for a private asset (expires in 1 hour) */
export async function getSignedUrl(
  bucket: BucketName,
  path: string,
  expiresIn = 3600
): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) {
    console.error('Error creating signed URL:', error.message);
    return null;
  }

  return data.signedUrl;
}

/** Upload a file to Supabase Storage */
export async function uploadFile(
  bucket: BucketName,
  path: string,
  file: File,
  options?: { upsert?: boolean; contentType?: string }
): Promise<{ url: string | null; error: string | null }> {
  const supabase = createClient();

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: options?.upsert ?? false,
    contentType: options?.contentType ?? file.type,
  });

  if (error) {
    return { url: null, error: error.message };
  }

  const url = getPublicUrl(bucket, path);
  return { url, error: null };
}

/** Delete a file from Supabase Storage */
export async function deleteFile(
  bucket: BucketName,
  path: string
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  return { error: error?.message ?? null };
}

/** List all files in a bucket/folder */
export async function listFiles(
  bucket: BucketName,
  folder?: string
): Promise<StorageAsset[]> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder ?? '', {
      sortBy: { column: 'created_at', order: 'desc' },
    });

  if (error || !data) return [];

  return data.map((file) => ({
    id:        file.id ?? '',
    name:      file.name,
    bucket,
    path:      folder ? `${folder}/${file.name}` : file.name,
    publicUrl: getPublicUrl(bucket, folder ? `${folder}/${file.name}` : file.name),
    mimeType:  file.metadata?.mimetype ?? 'application/octet-stream',
    size:      file.metadata?.size ?? 0,
    createdAt: file.created_at ?? new Date().toISOString(),
  }));
}

export { BUCKETS };
```

## hooks/useSupabase.ts — React Hook

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface SupabaseState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

/** Subscribe to Supabase auth state in Client Components */
export function useSupabase(): SupabaseState {
  const [state, setState] = useState<SupabaseState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({ user: session?.user ?? null, session, loading: false });
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setState({ user: session?.user ?? null, session, loading: false });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return state;
}
```

## Supabase Storage — Bucket Setup SQL

Run this in the Supabase SQL Editor to create buckets and set RLS policies:

```sql
-- Create public-assets bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public-assets',
  'public-assets',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Create 3d-models bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  '3d-models',
  '3d-models',
  true,
  104857600, -- 100MB limit for 3D files
  ARRAY['model/gltf-binary', 'model/gltf+json', 'application/octet-stream']
)
ON CONFLICT (id) DO NOTHING;

-- Public read policy for public-assets
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'public-assets');

-- Public read policy for 3d-models
CREATE POLICY "Public read access for 3D models" ON storage.objects
  FOR SELECT USING (bucket_id = '3d-models');

-- Admin upload policy (service role bypasses RLS — this is for authenticated users)
CREATE POLICY "Authenticated users can upload to public-assets" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'public-assets' AND
    auth.role() = 'authenticated'
  );
```

## Optimized Image Component with Supabase

```typescript
// components/ui/SupabaseImage.tsx
import Image from 'next/image';
import { getPublicUrl, BUCKETS } from '@/lib/supabase/storage';

interface SupabaseImageProps {
  path: string;
  bucket?: keyof typeof BUCKETS;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export function SupabaseImage({
  path,
  bucket = 'PUBLIC',
  alt,
  width,
  height,
  priority = false,
  className,
}: SupabaseImageProps) {
  const src = getPublicUrl(BUCKETS[bucket], path);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
```

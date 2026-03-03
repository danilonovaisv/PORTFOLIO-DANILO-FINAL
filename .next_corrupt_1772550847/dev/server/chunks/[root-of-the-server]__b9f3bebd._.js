module.exports = [
  '[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)',
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      'next/dist/server/app-render/work-async-storage.external.js',
      () =>
        require('next/dist/server/app-render/work-async-storage.external.js')
    );

    module.exports = mod;
  },
  '[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)',
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      'next/dist/server/app-render/work-unit-async-storage.external.js',
      () =>
        require('next/dist/server/app-render/work-unit-async-storage.external.js')
    );

    module.exports = mod;
  },
  '[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)',
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      'next/dist/server/lib/incremental-cache/tags-manifest.external.js',
      () =>
        require('next/dist/server/lib/incremental-cache/tags-manifest.external.js')
    );

    module.exports = mod;
  },
  '[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)',
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      'next/dist/server/app-render/after-task-async-storage.external.js',
      () =>
        require('next/dist/server/app-render/after-task-async-storage.external.js')
    );

    module.exports = mod;
  },
  '[externals]/node:async_hooks [external] (node:async_hooks, cjs)',
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x('node:async_hooks', () =>
      require('node:async_hooks')
    );

    module.exports = mod;
  },
  '[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)',
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      'next/dist/compiled/next-server/app-page-turbo.runtime.dev.js',
      () =>
        require('next/dist/compiled/next-server/app-page-turbo.runtime.dev.js')
    );

    module.exports = mod;
  },
  '[project]/src/lib/admin/authz.ts [middleware] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'isAdminUser',
      () => isAdminUser,
      'shouldEnforceAdminRole',
      () => shouldEnforceAdminRole,
    ]);
    // Roles that grant access to the admin panel.
    // Must match the is_admin() DB function (see migration 20260228000001).
    // 'editor' maps to the 'editor' role in the admin_users table.
    const ADMIN_ROLES = new Set(['admin', 'owner', 'super_admin', 'editor']);
    function parseAllowedEmails() {
      const raw = process.env.ADMIN_ALLOWED_EMAILS ?? '';
      return new Set(
        raw
          .split(',')
          .map((email) => email.trim().toLowerCase())
          .filter(Boolean)
      );
    }
    function isAdminUser(user) {
      if (!user) return false;
      const appRole = user.app_metadata?.role;
      if (
        typeof appRole === 'string' &&
        ADMIN_ROLES.has(appRole.toLowerCase())
      ) {
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
    function shouldEnforceAdminRole() {
      const value = process.env.ADMIN_ENFORCE_ROLE?.trim().toLowerCase();
      return value !== 'false' && value !== '0' && value !== 'off';
    }
  },
  '[project]/src/lib/supabase/env.ts [middleware] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'getSupabasePublicKey',
      () => getSupabasePublicKey,
      'getSupabasePublicUrl',
      () => getSupabasePublicUrl,
    ]);
    function getSupabasePublicKey() {
      return (
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
        ('TURBOPACK compile-time value',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta213Ymt3dnVseHRkb2R6bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDE4MzcsImV4cCI6MjA4MzkxNzgzN30.wssvD9W-yzRyLpq8aMCw57E4wNz7OnQ58ujLzYmF6CA')
      );
    }
    function getSupabasePublicUrl() {
      return (
        'TURBOPACK compile-time value',
        'https://umkmwbkwvulxtdodzmzf.supabase.co'
      );
    }
  },
  '[project]/src/lib/supabase/middleware.ts [middleware] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['updateSession', () => updateSession]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$9$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$98$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/@supabase+ssr@0.9.0_@supabase+supabase-js@2.98.0/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/server.js [middleware] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$authz$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/admin/authz.ts [middleware] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$env$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/supabase/env.ts [middleware] (ecmascript)'
      );
    const SUPABASE_URL = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$env$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__[
      'getSupabasePublicUrl'
    ])();
    const SUPABASE_PUBLIC_KEY = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$env$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__[
      'getSupabasePublicKey'
    ])();
    async function updateSession(request) {
      if (!SUPABASE_URL || !SUPABASE_PUBLIC_KEY) {
        throw new Error(
          'Missing Supabase middleware credentials. Define NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.'
        );
      }
      // 1. Create an unmodified response
      let supabaseResponse =
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__[
          'NextResponse'
        ].next({
          request,
        });
      const supabase = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$9$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$98$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__[
        'createServerClient'
      ])(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
        cookieOptions: {
          name: '__session',
          sameSite: 'lax',
          secure:
            ('TURBOPACK compile-time value', 'development') === 'production',
        },
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options: _options }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse =
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__[
                'NextResponse'
              ].next({
                request,
              });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      });
      // 2. Validate User
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const pathname = request.nextUrl.pathname;
      const isLoginPage = pathname === '/admin/login';
      const isAdminRoute = pathname.startsWith('/admin');
      const isAuthCallbackRoute = pathname.startsWith('/auth/callback');
      // 3. Handle Auth Logic
      // Skip auth callback route
      if (isAuthCallbackRoute) {
        return supabaseResponse;
      }
      // If user is logged in and trying to access login page, redirect to dashboard
      if (user && isLoginPage) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__[
          'NextResponse'
        ].redirect(url);
      }
      // Protect /admin routes (except login)
      if (isAdminRoute && !isLoginPage) {
        if (!user) {
          const url = request.nextUrl.clone();
          url.pathname = '/admin/login';
          return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__[
            'NextResponse'
          ].redirect(url);
        }
        if (
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$authz$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__[
            'shouldEnforceAdminRole'
          ])() &&
          !(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$authz$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__[
            'isAdminUser'
          ])(user)
        ) {
          const url = request.nextUrl.clone();
          url.pathname = '/';
          return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__[
            'NextResponse'
          ].redirect(url);
        }
      }
      // 4. Return response with updated cookies
      return supabaseResponse;
    }
  },
  '[project]/src/proxy.ts [middleware] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['config', () => config, 'proxy', () => proxy]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$middleware$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/supabase/middleware.ts [middleware] (ecmascript)'
      );
    async function proxy(request) {
      return await (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$middleware$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__[
        'updateSession'
      ])(request);
    }
    const config = {
      matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - api (API routes can handle their own auth)
         * - public assets (images, etc.)
         */ '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)',
      ],
    };
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b9f3bebd._.js.map

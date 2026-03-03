module.exports = [
  '[project]/src/lib/polyfills.ts [app-rsc] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([]);
    // Ensures Node/SSR runtime has browser-like globals some deps expect.
    // Safe to import anywhere (idempotent).
    if (typeof globalThis !== 'undefined') {
      // ProgressEvent is not defined in Node, but some loaders (e.g. @monogrid/gainmap-js)
      // instantiate it during SSR. Provide a minimal polyfill.
      if (typeof globalThis.ProgressEvent === 'undefined') {
        class NodeProgressEvent extends Event {
          lengthComputable;
          loaded;
          total;
          constructor(type, eventInitDict) {
            super(type);
            this.lengthComputable = !!eventInitDict?.lengthComputable;
            this.loaded = eventInitDict?.loaded ?? 0;
            this.total = eventInitDict?.total ?? 0;
          }
        }
        globalThis.ProgressEvent = NodeProgressEvent;
      }
    }
    // Global suppressor for ResizeObserver loop errors (harmless noise in dev)
    if (('TURBOPACK compile-time falsy', 0)) //TURBOPACK unreachable
    ;
  },
  '[project]/src/config/metadata.ts [app-rsc] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'siteMetadata',
      () => siteMetadata,
      'siteViewport',
      () => siteViewport,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/brand.ts [app-rsc] (ecmascript)'
      );
    const siteMetadata = {
      metadataBase: new URL(
        `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__['BRAND'].domain}`
      ),
      title: {
        default: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__['BRAND'].name} | Creative Developer`,
        template: `%s | ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__['BRAND'].name}`,
      },
      description:
        'Portfólio de Danilo Novais - Creative Developer especializado em design digital, branding e motion design. Você não vê o design. Mas ele vê você.',
      keywords: [
        'Creative Developer',
        'Creative Development',
        'Creative technologist',
        'Design System',
        'User Experience',
        'WebGL',
        'WebGL Developer',
        'Three.js',
        'React Three Fiber',
        'R3F',
        'GLSL Shaders',
        'GSAP Animation',
        'Framer Motion',
        'Next.js',
        'React',
        'TypeScript',
        'Branding',
        'Motion Design',
        'São Paulo',
        'Brazil',
        'Portfolio',
        'Interactive Design',
        'Front-end Engineering',
      ],
      authors: [
        {
          name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
            'BRAND'
          ].name,
          url: `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__['BRAND'].domain}`,
        },
      ],
      creator:
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
          'BRAND'
        ].name,
      publisher:
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
          'BRAND'
        ].name,
      openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__['BRAND'].domain}`,
        siteName:
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
            'BRAND'
          ].name,
        title: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__['BRAND'].name} | Creative Developer`,
        description:
          'Você não vê o design. Mas ele vê você. Portfólio de projetos criativos.',
        images: [
          {
            url: '/opengraph-image',
            width: 1200,
            height: 630,
            alt: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__['BRAND'].name} - Creative Developer`,
          },
          {
            url: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/global/logos/global.logo_header_light.svg',
            width: 800,
            height: 400,
            alt: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__['BRAND'].name} Logo`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__['BRAND'].name} | Creative Developer`,
        description: 'Você não vê o design. Mas ele vê você.',
        images: ['/opengraph-image'],
        creator: '@_novais',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      icons: {
        icon: [
          {
            url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
              'BRAND'
            ].assets.logos.favicon,
            type: 'image/svg+xml',
          },
          {
            url: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/global/logos/global.logo_header_light.svg',
            type: 'image/svg+xml',
          },
        ],
        shortcut:
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
            'BRAND'
          ].assets.logos.favicon,
        apple: [
          {
            url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
              'BRAND'
            ].assets.logos.favicon,
            type: 'image/svg+xml',
          },
          {
            url: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/global/logos/global.logo_header_light.svg',
            type: 'image/svg+xml',
          },
        ],
        other: [
          {
            rel: 'logo',
            url: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/global/logos/global.logo_header_light.svg',
          },
        ],
      },
      manifest: '/manifest.json',
      alternates: {
        canonical: `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__['BRAND'].domain}`,
      },
      other: {
        logo: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/global/logos/global.logo_header_light.svg',
      },
    };
    const siteViewport = {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      themeColor: [
        {
          media: '(prefers-color-scheme: light)',
          color:
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
              'BRAND'
            ].colors.background,
        },
        {
          media: '(prefers-color-scheme: dark)',
          color:
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
              'BRAND'
            ].colors.background,
        },
      ],
    };
  },
  '[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (client reference proxy) <module evaluation>',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => __TURBOPACK__default__export__]);
    // This file is generated by next-core EcmascriptClientReferenceModule.
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)'
      );
    const __TURBOPACK__default__export__ = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
      'registerClientReference'
    ])(
      function () {
        throw new Error(
          "Attempted to call the default export of [project]/src/components/layout/AssetLoaderWrapper.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
        );
      },
      '[project]/src/components/layout/AssetLoaderWrapper.tsx <module evaluation>',
      'default'
    );
  },
  '[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (client reference proxy)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => __TURBOPACK__default__export__]);
    // This file is generated by next-core EcmascriptClientReferenceModule.
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)'
      );
    const __TURBOPACK__default__export__ = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
      'registerClientReference'
    ])(
      function () {
        throw new Error(
          "Attempted to call the default export of [project]/src/components/layout/AssetLoaderWrapper.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
        );
      },
      '[project]/src/components/layout/AssetLoaderWrapper.tsx',
      'default'
    );
  },
  '[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AssetLoaderWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ =
      __turbopack_context__.i(
        '[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (client reference proxy) <module evaluation>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AssetLoaderWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (client reference proxy)'
      );
    __turbopack_context__.n(
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AssetLoaderWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__
    );
  },
  '[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (client reference proxy) <module evaluation>',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => __TURBOPACK__default__export__]);
    // This file is generated by next-core EcmascriptClientReferenceModule.
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)'
      );
    const __TURBOPACK__default__export__ = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
      'registerClientReference'
    ])(
      function () {
        throw new Error(
          "Attempted to call the default export of [project]/src/components/layout/SmoothScroll.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
        );
      },
      '[project]/src/components/layout/SmoothScroll.tsx <module evaluation>',
      'default'
    );
  },
  '[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (client reference proxy)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => __TURBOPACK__default__export__]);
    // This file is generated by next-core EcmascriptClientReferenceModule.
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)'
      );
    const __TURBOPACK__default__export__ = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
      'registerClientReference'
    ])(
      function () {
        throw new Error(
          "Attempted to call the default export of [project]/src/components/layout/SmoothScroll.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."
        );
      },
      '[project]/src/components/layout/SmoothScroll.tsx',
      'default'
    );
  },
  '[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ =
      __turbopack_context__.i(
        '[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (client reference proxy) <module evaluation>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (client reference proxy)'
      );
    __turbopack_context__.n(
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__
    );
  },
  '[project]/src/app/layout.tsx [app-rsc] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'default',
      () => RootLayout,
      'metadata',
      () => metadata,
      'viewport',
      () => viewport,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$polyfills$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/polyfills.ts [app-rsc] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$metadata$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/metadata.ts [app-rsc] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/brand.ts [app-rsc] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AssetLoaderWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (ecmascript)'
      );
    const metadata =
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$metadata$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
        'siteMetadata'
      ];
    const viewport =
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$metadata$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
        'siteViewport'
      ];
    // Define a function to safely get environment variables
    function getSupabaseBaseUrl() {
      return (
        ('TURBOPACK compile-time value',
        'https://umkmwbkwvulxtdodzmzf.supabase.co')?.replace(/\/$/, '') ?? ''
      );
    }
    function RootLayout({ children }) {
      const cssVars = {};
      const setVar = (name, value) => {
        if (value) cssVars[name] = value;
      };
      const supabaseBaseUrl = getSupabaseBaseUrl();
      setVar('--supabase-url', supabaseBaseUrl);
      // Use default values from BRAND config for initial render
      setVar(
        '--logo-light-url',
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
          'BRAND'
        ].assets.logos.logoLight
      );
      setVar(
        '--logo-dark-url',
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
          'BRAND'
        ].assets.logos.logoDark
      );
      setVar(
        '--favicon-light-url',
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
          'BRAND'
        ].assets.logos.faviconLight
      );
      setVar(
        '--favicon-dark-url',
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
          'BRAND'
        ].assets.logos.favicon
      );
      // Ensure background and text colors are properly set as CSS variables
      setVar(
        '--color-background',
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
          'BRAND'
        ].colors.background
      );
      setVar(
        '--color-text',
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
          'BRAND'
        ].colors.text
      );
      const inlineStyle = cssVars;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'html',
        {
          lang: 'pt-BR',
          className: 'dark',
          'data-scroll-behavior': 'smooth',
          suppressHydrationWarning: true,
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'head',
              {
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'meta',
                    {
                      charSet: 'utf-8',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/src/app/layout.tsx',
                      lineNumber: 51,
                      columnNumber: 9,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'link',
                    {
                      rel: 'preload',
                      href: '/fonts/TT%20Norms%20Pro%20Regular.woff2',
                      as: 'font',
                      type: 'font/woff2',
                      crossOrigin: 'anonymous',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/src/app/layout.tsx',
                      lineNumber: 53,
                      columnNumber: 9,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'link',
                    {
                      rel: 'preload',
                      href: '/fonts/TT%20Norms%20Pro%20Medium.woff2',
                      as: 'font',
                      type: 'font/woff2',
                      crossOrigin: 'anonymous',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/src/app/layout.tsx',
                      lineNumber: 60,
                      columnNumber: 9,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'link',
                    {
                      rel: 'preload',
                      href: '/fonts/TT%20Norms%20Pro%20Bold.woff2',
                      as: 'font',
                      type: 'font/woff2',
                      crossOrigin: 'anonymous',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/src/app/layout.tsx',
                      lineNumber: 67,
                      columnNumber: 9,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'link',
                    {
                      rel: 'dns-prefetch',
                      href: 'https://assets.codepen.io',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/src/app/layout.tsx',
                      lineNumber: 75,
                      columnNumber: 9,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'link',
                    {
                      rel: 'dns-prefetch',
                      href: getSupabaseBaseUrl().replace(/\/+$/, ''),
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/src/app/layout.tsx',
                      lineNumber: 76,
                      columnNumber: 9,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'link',
                    {
                      rel: 'preconnect',
                      href: getSupabaseBaseUrl().replace(/\/+$/, ''),
                      crossOrigin: 'anonymous',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/src/app/layout.tsx',
                      lineNumber: 81,
                      columnNumber: 9,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/src/app/layout.tsx',
                lineNumber: 50,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'body',
              {
                suppressHydrationWarning: true,
                className:
                  'relative isolate antialiased bg-(--color-background) text-(--color-text) pb-0 lg:pb-[64px] overflow-x-hidden',
                style: inlineStyle,
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'a',
                    {
                      href: '#main-content',
                      className:
                        'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-1300 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md',
                      children: 'Pular para o conteúdo',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/src/app/layout.tsx',
                      lineNumber: 92,
                      columnNumber: 9,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                      'default'
                    ],
                    {
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className:
                            'relative flex min-h-screen w-full flex-col flex-1',
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AssetLoaderWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                              'default'
                            ],
                            {
                              children: children,
                            },
                            void 0,
                            false,
                            {
                              fileName: '[project]/src/app/layout.tsx',
                              lineNumber: 100,
                              columnNumber: 13,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/src/app/layout.tsx',
                          lineNumber: 99,
                          columnNumber: 11,
                        },
                        this
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/src/app/layout.tsx',
                      lineNumber: 98,
                      columnNumber: 9,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/src/app/layout.tsx',
                lineNumber: 87,
                columnNumber: 7,
              },
              this
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: '[project]/src/app/layout.tsx',
          lineNumber: 44,
          columnNumber: 5,
        },
        this
      );
    }
  },
];

//# sourceMappingURL=src_6d4d157c._.js.map

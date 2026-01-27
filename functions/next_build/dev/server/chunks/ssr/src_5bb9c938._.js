module.exports = [
"[project]/src/lib/polyfills.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
            constructor(type, eventInitDict){
                super(type);
                this.lengthComputable = !!eventInitDict?.lengthComputable;
                this.loaded = eventInitDict?.loaded ?? 0;
                this.total = eventInitDict?.total ?? 0;
            }
        }
        globalThis.ProgressEvent = NodeProgressEvent;
    }
}
}),
"[project]/src/config/metadata.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "siteMetadata",
    ()=>siteMetadata,
    "siteViewport",
    ()=>siteViewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/brand.ts [app-rsc] (ecmascript)");
;
const siteMetadata = {
    metadataBase: new URL(`https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].domain}`),
    title: {
        default: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].name} | Creative Developer`,
        template: `%s | ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].name}`
    },
    description: 'Portfólio de Danilo Novais - Creative Developer especializado em design digital, branding e motion design. Você não vê o design. Mas ele vê você.',
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
        'Front-end Engineering'
    ],
    authors: [
        {
            name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].name,
            url: `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].domain}`
        }
    ],
    creator: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].name,
    publisher: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].name,
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].domain}`,
        siteName: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].name,
        title: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].name} | Creative Developer`,
        description: 'Você não vê o design. Mas ele vê você. Portfólio de projetos criativos.',
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].name} - Creative Developer`
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].name} | Creative Developer`,
        description: 'Você não vê o design. Mas ele vê você.',
        images: [
            '/opengraph-image'
        ],
        creator: '@_novais'
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    icons: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].assets.logos.favicon,
        shortcut: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].assets.logos.favicon,
        apple: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].assets.logos.favicon
    },
    manifest: '/manifest.json',
    alternates: {
        canonical: `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].domain}`
    }
};
const siteViewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        {
            media: '(prefers-color-scheme: light)',
            color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].colors.background
        },
        {
            media: '(prefers-color-scheme: dark)',
            color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].colors.background
        }
    ]
};
}),
"[project]/src/components/ui/JsonLd.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>JsonLd
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/brand.ts [app-rsc] (ecmascript)");
;
;
function JsonLd({ logoUrl }) {
    const personSchema = {
        '@type': 'Person',
        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].name,
        url: `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].domain}`,
        image: logoUrl ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].assets.logos.logoLight,
        jobTitle: 'Creative Developer & Designer',
        sameAs: [
            'https://github.com/danilonovaisv',
            'https://linkedin.com/in/danilonovaisv',
            'https://instagram.com/_novais'
        ],
        description: 'Creative Developer especializado em WebGL, R3F, Next.js e experiências digitais interativas.',
        knowsAbout: [
            'WebGL',
            'React Three Fiber',
            'Three.js',
            'Next.js',
            'TypeScript',
            'Motion Design',
            'Branding',
            'Creative Development',
            'Interactive Design'
        ]
    };
    const websiteSchema = {
        '@type': 'WebSite',
        name: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].name} | Portfolio`,
        url: `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].domain}`,
        description: 'Você não vê o design. Mas ele vê você.',
        inLanguage: 'pt-BR'
    };
    const portfolioSchema = {
        '@type': 'CollectionPage',
        name: 'Portfolio - Danilo Novais',
        description: 'Seleção curada de projetos de Branding, Motion Design e Creative Development.',
        url: `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].domain}/portfolio`,
        isPartOf: {
            '@type': 'WebSite',
            url: `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].domain}`
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
            __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                    personSchema,
                    websiteSchema,
                    portfolioSchema
                ]
            })
        }
    }, void 0, false, {
        fileName: "[project]/src/components/ui/JsonLd.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/layout/AssetLoaderWrapper.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/AssetLoaderWrapper.tsx <module evaluation>", "default");
}),
"[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/layout/AssetLoaderWrapper.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/AssetLoaderWrapper.tsx", "default");
}),
"[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AssetLoaderWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AssetLoaderWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AssetLoaderWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/layout/SmoothScroll.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/SmoothScroll.tsx <module evaluation>", "default");
}),
"[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/layout/SmoothScroll.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/SmoothScroll.tsx", "default");
}),
"[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata,
    "viewport",
    ()=>viewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$polyfills$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/polyfills.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$metadata$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/metadata.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/JsonLd.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/brand.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AssetLoaderWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AssetLoaderWrapper.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SmoothScroll.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
const metadata = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$metadata$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteMetadata"];
const viewport = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$metadata$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteViewport"];
// Define a function to safely get environment variables
function getSupabaseBaseUrl() {
    return ("TURBOPACK compile-time value", "https://umkmwbkwvulxtdodzmzf.supabase.co")?.replace(/\/$/, '') ?? '';
}
function RootLayout({ children }) {
    const cssVars = {};
    const setVar = (name, value)=>{
        if (value) cssVars[name] = value;
    };
    const supabaseBaseUrl = getSupabaseBaseUrl();
    setVar('--supabase-url', supabaseBaseUrl);
    // Use default values from BRAND config for initial render
    setVar('--logo-light-url', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].assets.logos.logoLight);
    setVar('--logo-dark-url', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].assets.logos.logoDark);
    setVar('--favicon-light-url', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].assets.logos.favicon);
    setVar('--favicon-dark-url', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].assets.logos.favicon);
    const inlineStyle = cssVars;
    const jsonLdLogoUrl = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].assets.logos.logoLight;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "pt-BR",
        "data-scroll-behavior": "smooth",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    logoUrl: jsonLdLogoUrl
                }, void 0, false, {
                    fileName: "[project]/src/app/layout.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: "antialiased bg-background text-text pb-0 lg:pb-[64px] overflow-x-hidden",
                style: inlineStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#main-content",
                        className: "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md",
                        children: "Pular para o conteúdo"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AssetLoaderWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/src/app/layout.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_5bb9c938._.js.map
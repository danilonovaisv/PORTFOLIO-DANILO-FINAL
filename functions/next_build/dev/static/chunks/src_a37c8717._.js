(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/supabase/urls.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildSupabaseStorageUrl",
    ()=>buildSupabaseStorageUrl,
    "getSupabaseBaseUrl",
    ()=>getSupabaseBaseUrl,
    "normalizeStoragePath",
    ()=>normalizeStoragePath,
    "validateExternalUrl",
    ()=>validateExternalUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const normalizeUrl = (value)=>value.replace(/\/+$/, '');
function getSupabaseBaseUrl() {
    const url = ("TURBOPACK compile-time value", "https://umkmwbkwvulxtdodzmzf.supabase.co") ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_URL ?? null;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return normalizeUrl(url);
    } catch  {
        return url;
    }
}
function normalizeStoragePath(filePath, bucket) {
    if (!filePath) return null;
    const bucketPrefix = bucket?.replace(/^\/+|\/+$/g, '');
    // Remove full Supabase URL prefix if present (object or render endpoints)
    let normalized = filePath.trim();
    // Clean common malformed prefixes/suffixes from backups (e.g. "file_path: ...," or quoted values)
    normalized = normalized.replace(/^file_path:\s*/i, '');
    normalized = normalized.replace(/^key:\s*/i, '');
    normalized = normalized.replace(/^"+|"+$/g, '');
    normalized = normalized.replace(/^'+|'+$/g, '');
    normalized = normalized.replace(/,+$/g, '');
    normalized = normalized.replace(/\s+$/g, '');
    normalized = normalized.replace(/^https?:\/\/[^/]+\/storage\/v1\/(?:render\/image|object)\/public\//, '');
    // Remove local /storage/v1/object/public prefix if the path was stored like that
    normalized = normalized.replace(/^\/?storage\/v1\/(?:render\/image|object)\/public\//, '');
    normalized = normalized.replace(/^\/+/, '');
    if (bucketPrefix && normalized.startsWith(`${bucketPrefix}/`)) {
        normalized = normalized.slice(bucketPrefix.length + 1);
    }
    return normalized;
}
function buildSupabaseStorageUrl(bucket, filePath) {
    if (!filePath) return null;
    const isHttp = filePath.startsWith('http://') || filePath.startsWith('https://');
    const isSupabaseUrl = filePath.includes('/storage/v1/');
    // Verifica se é uma URL externa não-Supabase
    if (isHttp && !isSupabaseUrl) {
        // Validação de segurança para URLs externas
        try {
            const url = new URL(filePath);
            // Permitir apenas protocolos seguros
            if (url.protocol !== 'https:') {
                console.warn(`Protocolo inseguro detectado: ${filePath}`);
                return null;
            }
            // Aqui poderíamos adicionar validação de domínio se necessário
            return filePath;
        } catch  {
            console.error(`URL inválida: ${filePath}`);
            return null;
        }
    }
    const cleanBucket = bucket.replace(/^\/+|\/+$/g, '');
    const normalizedPath = normalizeStoragePath(filePath, cleanBucket);
    if (!normalizedPath) {
        return filePath.startsWith('http') ? filePath : null;
    }
    // Preserva a origem caso o caminho já seja uma URL completa de outro projeto Supabase
    if (isHttp && isSupabaseUrl) {
        try {
            const url = new URL(filePath);
            const baseOrigin = `${url.protocol}//${url.host}`;
            return `${baseOrigin}/storage/v1/object/public/${cleanBucket}/${normalizedPath}`;
        } catch  {
        // se falhar, segue fluxo padrão
        }
    }
    const baseUrl = getSupabaseBaseUrl();
    if (!baseUrl) {
        return filePath.startsWith('http') ? filePath : null;
    }
    return `${baseUrl}/storage/v1/object/public/${cleanBucket}/${normalizedPath}`;
}
function validateExternalUrl(url) {
    if (!url) return null;
    const normalized = url.trim();
    if (!normalized) return null;
    const allowedProtocols = [
        'https:',
        'http:'
    ];
    try {
        const parsedUrl = new URL(normalized);
        if (allowedProtocols.includes(parsedUrl.protocol)) {
            return parsedUrl.toString();
        }
        console.warn(`Link externo inseguro bloqueado: ${url}`);
        return null;
    } catch  {
        if (normalized.startsWith('/') || normalized.startsWith('#')) {
            return normalized;
        }
        if (normalized.startsWith('//')) {
            try {
                const parsedFallback = new URL(`https:${normalized}`);
                return parsedFallback.toString();
            } catch  {
                console.error(`URL externa inválida: ${url}`);
                return null;
            }
        }
        console.error(`URL externa inválida: ${url}`);
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/site-assets.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteAssetsProvider",
    ()=>SiteAssetsProvider,
    "useSiteAssetUrl",
    ()=>useSiteAssetUrl,
    "useSiteAssetsByPrefix",
    ()=>useSiteAssetsByPrefix,
    "useValidatedAsset",
    ()=>useValidatedAsset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/urls.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
const SiteAssetsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function SiteAssetsProvider({ assets, children }) {
    _s();
    const assetsMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SiteAssetsProvider.useMemo[assetsMap]": ()=>{
            const map = {};
            assets.forEach({
                "SiteAssetsProvider.useMemo[assetsMap]": (asset)=>{
                    // Validar href se existir
                    if (asset.href) {
                        const validatedHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateExternalUrl"])(asset.href);
                        map[asset.key] = {
                            ...asset,
                            href: validatedHref
                        };
                    } else {
                        map[asset.key] = asset;
                    }
                }
            }["SiteAssetsProvider.useMemo[assetsMap]"]);
            return map;
        }
    }["SiteAssetsProvider.useMemo[assetsMap]"], [
        assets
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SiteAssetsProvider.useMemo[value]": ()=>{
            const entries = Object.values(assetsMap);
            return {
                getUrl: ({
                    "SiteAssetsProvider.useMemo[value]": (key)=>assetsMap[key]?.publicUrl
                })["SiteAssetsProvider.useMemo[value]"],
                getAssetsByPrefix: ({
                    "SiteAssetsProvider.useMemo[value]": (prefix)=>entries.filter({
                            "SiteAssetsProvider.useMemo[value]": (asset)=>asset.key.startsWith(prefix)
                        }["SiteAssetsProvider.useMemo[value]"])
                })["SiteAssetsProvider.useMemo[value]"],
                getAssetWithValidation: ({
                    "SiteAssetsProvider.useMemo[value]": (key)=>{
                        const asset = assetsMap[key];
                        if (asset?.href) {
                            const validatedHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateExternalUrl"])(asset.href);
                            return validatedHref ? {
                                ...asset,
                                href: validatedHref
                            } : asset;
                        }
                        return asset;
                    }
                })["SiteAssetsProvider.useMemo[value]"]
            };
        }
    }["SiteAssetsProvider.useMemo[value]"], [
        assetsMap
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SiteAssetsContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/site-assets.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(SiteAssetsProvider, "mR9sfpciUcoEN58MBLJfhIS/Wrg=");
_c = SiteAssetsProvider;
function useSiteAssetUrl(key, fallback) {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SiteAssetsContext);
    return context?.getUrl(key) ?? fallback;
}
_s1(useSiteAssetUrl, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function useSiteAssetsByPrefix(prefix) {
    _s2();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SiteAssetsContext);
    return context?.getAssetsByPrefix(prefix) ?? [];
}
_s2(useSiteAssetsByPrefix, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function useValidatedAsset(key) {
    _s3();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SiteAssetsContext);
    return context?.getAssetWithValidation(key);
}
_s3(useValidatedAsset, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "SiteAssetsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClientComponentClient",
    ()=>createClientComponentClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$93$2e$1$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+ssr@0.8.0_@supabase+supabase-js@2.93.1/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$93$2e$1$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+ssr@0.8.0_@supabase+supabase-js@2.93.1/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
let supabaseClient = null;
function createClientComponentClient() {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYWRIGHT_TEST) {
        const mockQuery = {
            eq: ()=>mockQuery,
            order: ()=>mockQuery,
            limit: ()=>mockQuery,
            returns: ()=>Promise.resolve({
                    data: [],
                    error: null
                }),
            select: ()=>mockQuery,
            single: ()=>Promise.resolve({
                    data: null,
                    error: null
                })
        };
        return {
            from: ()=>mockQuery,
            auth: {
                getSession: ()=>Promise.resolve({
                        data: {
                            session: null
                        },
                        error: null
                    }),
                onAuthStateChange: ()=>({
                        data: {
                            subscription: {
                                unsubscribe: ()=>{}
                            }
                        }
                    })
            },
            storage: {
                from: ()=>({
                        getPublicUrl: ()=>({
                                data: {
                                    publicUrl: ''
                                }
                            })
                    })
            }
        };
    }
    if (supabaseClient) {
        return supabaseClient;
    }
    const supabaseUrl = ("TURBOPACK compile-time value", "https://umkmwbkwvulxtdodzmzf.supabase.co");
    const supabaseKey = ("TURBOPACK compile-time value", "sb_publishable_lW8dC02qgDYiYxBfHGr54A_X1-D-NQ4") ?? ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta213Ymt3dnVseHRkb2R6bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDE4MzcsImV4cCI6MjA4MzkxNzgzN30.wssvD9W-yzRyLpq8aMCw57E4wNz7OnQ58ujLzYmF6CA");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    supabaseClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$93$2e$1$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(supabaseUrl, supabaseKey, {
        // Firebase Hosting só encaminha o cookie "__session" para as Functions.
        // Forçamos o Supabase a usar esse nome para persistir a sessão.
        cookieOptions: {
            name: '__session',
            sameSite: 'lax',
            secure: true
        }
    });
    return supabaseClient;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/site-asset-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeAssetList",
    ()=>normalizeAssetList,
    "normalizeAssetRecord",
    ()=>normalizeAssetRecord
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/urls.ts [app-client] (ecmascript)");
;
function normalizeAssetRecord(asset) {
    const cleanBucket = (asset.bucket || 'site-assets').replace(/^bucket:\s*/i, '').replace(/^"+|"+$/g, '').replace(/^'+|'+$/g, '').replace(/^\/+|\/+$/g, '');
    const cleanKey = asset.key?.replace(/^key:\s*/i, '').replace(/^"+|"+$/g, '').replace(/^'+|'+$/g, '').replace(/,+$/g, '').trim();
    const cleanPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeStoragePath"])(asset.file_path, cleanBucket);
    const fixClientsPath = (path)=>{
        if (!path) return path;
        // Casos importados com prefixo duplicado "clients.clients.strip.X.svg"
        if (/^clients\.clients\.strip\./.test(path)) {
            return path.replace(/^clients\.clients\.strip\./, 'clients/clients.strip.');
        }
        if (/^clients\.strip\./.test(path)) {
            return path.replace(/^clients\.strip\./, 'clients/clients.strip.');
        }
        return path;
    };
    const resolvedPath = fixClientsPath(cleanPath);
    // Corrige bucket para media de portfólio que foram importadas com o bucket errado
    const resolvedBucket = cleanBucket === 'site-assets' && resolvedPath?.startsWith('projects/') ? 'portfolio-media' : cleanBucket;
    const inferPageFromValue = (value)=>{
        if (!value) return undefined;
        const trimmed = value.replace(/^page:\s*/i, '').replace(/^"+|"+$/g, '').replace(/^'+|'+$/g, '').replace(/,+$/g, '').trim();
        if (!trimmed) return undefined;
        if (/^updated_at:/i.test(trimmed) || /^key:/i.test(trimmed)) return undefined;
        const delimiter = trimmed.includes('/') ? '/' : '.';
        const base = trimmed.split(delimiter)[0];
        return base?.toLowerCase();
    };
    const resolvedPage = inferPageFromValue(asset.page) || inferPageFromValue(resolvedPath) || inferPageFromValue(cleanKey) || 'global';
    const publicUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSupabaseStorageUrl"])(resolvedBucket, resolvedPath) || (asset.file_path?.startsWith('http') ? asset.file_path : '') || '';
    // Processar href se existir
    let processedAsset = {
        ...asset,
        key: cleanKey ?? asset.key,
        bucket: resolvedBucket,
        file_path: cleanPath ?? '',
        page: resolvedPage,
        resolvedPage,
        publicUrl
    };
    if (asset.href) {
        const validatedHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateExternalUrl"])(asset.href);
        if (validatedHref) {
            processedAsset = {
                ...processedAsset,
                href: validatedHref
            };
        }
    }
    return processedAsset;
}
function normalizeAssetList(assets, options = {}) {
    const { onlyActive = false, dropInvalid = true } = options;
    const normalizedByKey = new Map();
    const normalizedByPath = new Map();
    const isInvalidValue = (value)=>{
        if (!value) return true;
        const normalizedValue = value.trim().toLowerCase();
        if (!normalizedValue) return true;
        return normalizedValue.startsWith('updated_at:') || normalizedValue.startsWith('key:') || normalizedValue.startsWith('file_path:') || normalizedValue === '.keep' || normalizedValue === '.emptyfolderplaceholder';
    };
    const dedupeDoublePrefix = (value)=>{
        if (!value) return value;
        const trimmed = value.trim();
        if (!trimmed) return value;
        const delimiter = trimmed.includes('/') ? '/' : '.';
        const parts = trimmed.split(delimiter).filter(Boolean);
        if (parts.length < 4) return value;
        const maxPrefix = Math.min(3, Math.floor(parts.length / 2));
        for(let len = 1; len <= maxPrefix; len++){
            const first = parts.slice(0, len).join('|').toLowerCase();
            const second = parts.slice(len, len * 2).join('|').toLowerCase();
            if (first === second) {
                const deduped = [
                    ...parts.slice(0, len),
                    ...parts.slice(len * 2)
                ];
                return deduped.join(delimiter);
            }
        }
        return value;
    };
    const scoreRecord = (record)=>{
        const activeScore = record.is_active ? 4 : 0;
        const urlScore = record.publicUrl ? 2 : 0;
        const pathScore = record.file_path?.includes('/') ? 1 : 0;
        const lengthPenalty = Math.min(record.key?.length ?? 0, 60) * 0.01;
        return activeScore + urlScore + pathScore - lengthPenalty;
    };
    for (const asset of assets){
        const cleanedAsset = {
            ...asset,
            key: dedupeDoublePrefix(asset.key) ?? asset.key,
            file_path: dedupeDoublePrefix(asset.file_path) ?? asset.file_path
        };
        const record = normalizeAssetRecord(cleanedAsset);
        const key = record.key?.trim();
        if (!key) continue;
        if (dropInvalid) {
            if (isInvalidValue(key) || isInvalidValue(record.file_path)) continue;
        }
        if (onlyActive && !record.is_active) continue;
        const hasUsableUrl = Boolean(record.publicUrl || record.asset_type === 'font' || record.href);
        if (dropInvalid && !hasUsableUrl) continue;
        const decide = (current, next)=>{
            if (!current) return next;
            const currentScore = scoreRecord(current);
            const nextScore = scoreRecord(next);
            if (nextScore > currentScore) return next;
            if (nextScore === currentScore) {
                return next.key.length < current.key.length ? next : current;
            }
            return current;
        };
        const bestByKey = decide(normalizedByKey.get(key), record);
        normalizedByKey.set(key, bestByKey);
        const pathKey = record.file_path || '';
        if (pathKey) {
            const bestByPath = decide(normalizedByPath.get(pathKey), record);
            normalizedByPath.set(pathKey, bestByPath);
        }
    }
    const merged = new Map();
    for (const item of normalizedByKey.values()){
        merged.set(item.id, item);
    }
    for (const item of normalizedByPath.values()){
        merged.set(item.id, item);
    }
    return Array.from(merged.values()).sort((a, b)=>{
        const pageA = a.page ?? '';
        const pageB = b.page ?? '';
        if (pageA === pageB) {
            const orderA = a.sort_order ?? Number.MAX_SAFE_INTEGER;
            const orderB = b.sort_order ?? Number.MAX_SAFE_INTEGER;
            if (orderA === orderB) return a.key.localeCompare(b.key);
            return orderA - orderB;
        }
        return pageA.localeCompare(pageB);
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/site-assets-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClientSiteAssets",
    ()=>getClientSiteAssets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$site$2d$asset$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/site-asset-utils.ts [app-client] (ecmascript)");
;
;
async function getClientSiteAssets() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClientComponentClient"])();
    const { data, error } = await supabase.from('site_assets').select('*').order('page', {
        ascending: true
    }).order('sort_order', {
        ascending: true,
        nullsFirst: false
    });
    if (error) throw error;
    const records = data ?? [];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$site$2d$asset$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAssetList"])(records, {
        onlyActive: true
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/ScrollContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollContext",
    ()=>ScrollContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
const ScrollContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    lenis: null
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/antigravity.store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAntigravityStore",
    ()=>useAntigravityStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$10_$40$types$2b$react$40$19$2e$2$2e$9_immer$40$11$2e$1$2e$3_react$40$19$2e$2$2e$4_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$19$2e$2$2e$4_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zustand@5.0.10_@types+react@19.2.9_immer@11.1.3_react@19.2.4_use-sync-external-store@1.6.0_react@19.2.4_/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useAntigravityStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$10_$40$types$2b$react$40$19$2e$2$2e$9_immer$40$11$2e$1$2e$3_react$40$19$2e$2$2e$4_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$19$2e$2$2e$4_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        // Defaults based on CI/Rules
        flags: {
            mountWebGL: true,
            enableManifestoScroll: true,
            enableHoverInteractions: true,
            reducedMotion: false,
            debugMode: ("TURBOPACK compile-time value", "development") === 'development'
        },
        viewport: {
            width: 0,
            height: 0
        },
        narrativeState: 'IDLE',
        scrollProgress: 0,
        setFlag: (key, value)=>set((state)=>({
                    flags: {
                        ...state.flags,
                        [key]: value
                    }
                })),
        setFlags: (newFlags)=>set((state)=>({
                    flags: {
                        ...state.flags,
                        ...newFlags
                    }
                })),
        setViewport: (width, height)=>set({
                viewport: {
                    width,
                    height
                }
            }),
        setNarrativeState: (state)=>set({
                narrativeState: state
            }),
        setScrollProgress: (progress)=>set({
                scrollProgress: progress
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/SmoothScroll.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SmoothScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lenis$40$1$2e$3$2e$17_react$40$19$2e$2$2e$4$2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lenis@1.3.17_react@19.2.4/node_modules/lenis/dist/lenis.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ScrollContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/ScrollContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/antigravity.store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function SmoothScroll({ children }) {
    _s();
    const { flags } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAntigravityStore"])();
    const [lenisInstance, setLenisInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SmoothScroll.useEffect": ()=>{
            // ♿ SE REDUCED MOTION → SEM LENIS
            if (flags.reducedMotion) return;
            const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lenis$40$1$2e$3$2e$17_react$40$19$2e$2$2e$4$2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                lerp: 0.08,
                wheelMultiplier: 1,
                touchMultiplier: 1.2
            });
            setLenisInstance(lenis);
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
            return ({
                "SmoothScroll.useEffect": ()=>{
                    lenis.destroy();
                    setLenisInstance(null);
                }
            })["SmoothScroll.useEffect"];
        }
    }["SmoothScroll.useEffect"], [
        flags.reducedMotion
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ScrollContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollContext"].Provider, {
        value: {
            lenis: lenisInstance
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/layout/SmoothScroll.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(SmoothScroll, "ks1PAzZhVGc5m6CD5SbGN70HPNA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAntigravityStore"]
    ];
});
_c = SmoothScroll;
var _c;
__turbopack_context__.k.register(_c, "SmoothScroll");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/brand.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BRAND",
    ()=>BRAND,
    "SUPABASE_STORAGE_URL",
    ()=>SUPABASE_STORAGE_URL
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// O projeto principal é o aymuvxysygrwoicsjgxj; usamos como fallback seguro
// para evitar perda de links quando as envs não estão presentes (ex.: build local).
const SUPABASE_PROJECT_URL = ("TURBOPACK compile-time value", "https://umkmwbkwvulxtdodzmzf.supabase.co") ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_URL ?? 'https://aymuvxysygrwoicsjgxj.supabase.co';
const SUPABASE_STORAGE_URL = `${SUPABASE_PROJECT_URL.replace(/\/$/, '')}/storage/v1/object/public`;
const asset = (path)=>`${SUPABASE_STORAGE_URL}/${path.replace(/^\/+/, '')}`;
const BRAND = {
    name: 'Danilo Novais',
    domain: 'portfoliodanilo.com',
    // Paleta de Cores (Design System 2.1)
    colors: {
        bluePrimary: '#0048ff',
        blueAccent: '#4fe6ff',
        purpleDetails: '#8705f2',
        pinkDetails: '#f501d3',
        background: '#040013',
        backgroundLight: '#f0f0f0',
        text: '#fcffff',
        textInverse: '#0e0e0e',
        textEmphasis: '#2E85F2',
        textHighlight: '#4fe6ff',
        textSecondary: '#a1a3a3',
        neutral: '#0b0d3a',
        neutralLight: '#F5F5F5',
        contactForeground: '#fcffff'
    },
    // Assets Globais (2.6 Global Assets)
    assets: {
        logos: {
            favicon: asset('site-assets/global/logos/global.favicon_dark.svg'),
            faviconLight: asset('site-assets/global/logos/global.favicon_light.svg'),
            logoLight: asset('site-assets/global/logos/global.logo_header_light.svg'),
            logoDark: asset('site-assets/global/logos/global.logo_header_dark.svg')
        },
        video: {
            manifesto: asset('site-assets/home/home.manifesto_video.mp4')
        },
        fonts: {
            primary: 'TT Norms Pro',
            mono: 'PPSupplyMono'
        }
    },
    video: {
        manifesto: asset('site-assets/home/home.manifesto_video.mp4')
    },
    // Leis de Layout (Absolute Laws)
    layout: {
        mobile: {
            stacking: 'vertical',
            alignment: 'center'
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useMediaQuery.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMediaQuery",
    ()=>useMediaQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useMediaQuery(query) {
    _s();
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMediaQuery.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const media = window.matchMedia(query);
            if (media.matches !== matches) {
                setMatches(media.matches);
            }
            const listener = {
                "useMediaQuery.useEffect.listener": (e)=>setMatches(e.matches)
            }["useMediaQuery.useEffect.listener"];
            media.addEventListener('change', listener);
            return ({
                "useMediaQuery.useEffect": ()=>media.removeEventListener('change', listener)
            })["useMediaQuery.useEffect"];
        }
    }["useMediaQuery.useEffect"], [
        query
    ]);
    return matches;
}
_s(useMediaQuery, "/aV7jSECvYA0Ea4uAEPK2AzROhs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/site-assets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SITE_ASSET_DEFINITIONS",
    ()=>SITE_ASSET_DEFINITIONS,
    "SITE_ASSET_KEYS",
    ()=>SITE_ASSET_KEYS
]);
const SITE_ASSET_KEYS = {
    logos: {
        headerLight: 'global.logo_header_light',
        headerDark: 'global.logo_header_dark',
        faviconLight: 'global.favicon_light',
        faviconDark: 'global.favicon_dark'
    },
    fonts: {
        display: 'global.font_display',
        h1: 'global.font_h1',
        h2: 'global.font_h2',
        h3: 'global.font_h3',
        body: 'global.font_body',
        light: 'global.font_light'
    },
    heroVideos: {
        homeManifesto: 'home.manifesto_video',
        aboutDesktop: 'about.hero.about.hero.desktop_video.mp4',
        aboutMobile: 'about.hero.about.hero.mobile_video.mp4',
        portfolioDesktop: 'portfolio.hero_desktop_video',
        portfolioMobile: 'portfolio.hero_mobile_video',
        method: 'about.method_video'
    },
    about: {
        originImages: [
            'about.origin_image.1',
            'about.origin_image.2',
            'about.origin_image.3',
            'about.origin_image.4'
        ],
        methodDesktop: 'about.method_video',
        methodMobile: 'about.method_video'
    },
    portfolio: {
        heroDesktop: 'portfolio.hero_video.desktop',
        heroMobile: 'portfolio.hero_video.mobile'
    },
    clients: {
        strips: Array.from({
            length: 12
        }, (_, i)=>`clients.strip.${i + 1}`)
    }
};
const fontDefinitions = Object.entries(SITE_ASSET_KEYS.fonts).map(([name, key])=>({
        key,
        label: `Fonte ${name}`,
        page: 'global',
        category: 'font'
    }));
const originImages = SITE_ASSET_KEYS.about.originImages.map((key, index)=>({
        key,
        label: `Origem imagem ${index + 1}`,
        page: 'about',
        category: 'image'
    }));
const clientLogos = SITE_ASSET_KEYS.clients.strips.map((key, index)=>({
        key,
        label: `Logo cliente ${index + 1}`,
        page: 'clients',
        category: 'client'
    }));
const SITE_ASSET_DEFINITIONS = [
    {
        key: SITE_ASSET_KEYS.logos.headerLight,
        label: 'Logo header claro',
        page: 'global',
        category: 'logo'
    },
    {
        key: SITE_ASSET_KEYS.logos.headerDark,
        label: 'Logo header escuro',
        page: 'global',
        category: 'logo'
    },
    {
        key: SITE_ASSET_KEYS.logos.faviconLight,
        label: 'Favicon claro',
        page: 'global',
        category: 'logo'
    },
    {
        key: SITE_ASSET_KEYS.logos.faviconDark,
        label: 'Favicon escuro',
        page: 'global',
        category: 'logo'
    },
    ...fontDefinitions,
    {
        key: SITE_ASSET_KEYS.heroVideos.homeManifesto,
        label: 'Vídeo manifesto',
        page: 'home',
        category: 'video'
    },
    {
        key: SITE_ASSET_KEYS.heroVideos.aboutDesktop,
        label: 'Vídeo hero Sobre (desktop)',
        page: 'about',
        category: 'video'
    },
    {
        key: SITE_ASSET_KEYS.heroVideos.aboutMobile,
        label: 'Vídeo hero Sobre (mobile)',
        page: 'about',
        category: 'video'
    },
    {
        key: SITE_ASSET_KEYS.heroVideos.method,
        label: 'Vídeo método',
        page: 'about',
        category: 'video'
    },
    ...originImages,
    {
        key: SITE_ASSET_KEYS.portfolio.heroDesktop,
        label: 'Vídeo hero Portfólio (desktop)',
        page: 'portfolio',
        category: 'video'
    },
    {
        key: SITE_ASSET_KEYS.portfolio.heroMobile,
        label: 'Vídeo hero Portfólio (mobile)',
        page: 'portfolio',
        category: 'video'
    },
    ...clientLogos
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/header/DesktopFluidHeader.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "fallbackBackground": "DesktopFluidHeader-module__0IvcRG__fallbackBackground",
  "headerContainer": "DesktopFluidHeader-module__0IvcRG__headerContainer",
  "headerDark": "DesktopFluidHeader-module__0IvcRG__headerDark",
  "headerLight": "DesktopFluidHeader-module__0IvcRG__headerLight",
  "subtleBorder": "DesktopFluidHeader-module__0IvcRG__subtleBorder",
});
}),
"[project]/src/components/layout/header/DesktopFluidHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DesktopFluidHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$DesktopFluidHeader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/DesktopFluidHeader.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function isExternalHref(href) {
    return /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
}
function DesktopFluidHeader({ navItems, logoUrl, onNavigate, activeHref, isLight, isPageActive }) {
    _s();
    const wrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const nav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DesktopFluidHeader.useMemo[nav]": ()=>navItems
    }["DesktopFluidHeader.useMemo[nav]"], [
        navItems
    ]);
    const shouldHighlightPage = Boolean(isPageActive);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `hidden lg:block fixed top-6 left-0 right-0 z-40 w-full pointer-events-none transition-all duration-300 ease-in-out ${isLight ? 'header--light' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: 'flex justify-center w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24',
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: wrapRef,
                className: "pointer-events-auto w-full relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$DesktopFluidHeader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerContainer} ${isLight ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$DesktopFluidHeader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerLight : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$DesktopFluidHeader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerDark} h-16 w-[calc(100%+5rem)] -ml-10 rounded-4xl backdrop-blur-md border border-white/10 bg-black/20 transition-all duration-300`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 h-full px-10 flex items-center justify-between gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                "aria-label": "Ir para Home",
                                className: "flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: logoUrl,
                                    alt: "Danilo",
                                    width: 32,
                                    height: 32,
                                    className: "h-22 w-22 object-contain transition-colors duration-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                                    lineNumber: 77,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                "aria-label": "Navegação principal",
                                className: "flex items-center gap-7",
                                children: nav.map((item)=>{
                                    const hash = item.href.startsWith('/#') ? item.href.substring(1) : item.href;
                                    const isActive = activeHref === hash;
                                    const common = 'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md text-xs uppercase tracking-[0.2em]';
                                    const baseText = isLight ? 'text-white' : 'text-white/70';
                                    const hoverText = isLight ? 'hover:text-blueAccent' : 'hover:text-white';
                                    const activeText = isLight ? 'text-blueAccent' : 'text-bluePrimary';
                                    const textColor = isActive ? `${activeText} font-semibold` : `${baseText} ${hoverText} font-medium`;
                                    const pageOverride = shouldHighlightPage ? 'text-bluePrimary font-semibold' : '';
                                    const underline = isActive ? 'after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-current' : 'after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-current group-hover:after:w-full after:transition-all after:duration-300';
                                    if (isExternalHref(item.href) || item.external) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: item.href,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: `group ${common} ${textColor} ${pageOverride} relative flex items-center`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "tracking-tight",
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: underline
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, item.href, true, {
                                            fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                                            lineNumber: 117,
                                            columnNumber: 23
                                        }, this);
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>onNavigate(item.href),
                                        className: `group ${common} ${textColor} ${pageOverride} relative flex items-center`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tracking-tight",
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                                                lineNumber: 137,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: underline
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                                                lineNumber: 138,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, item.href, true, {
                                        fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                                        lineNumber: 131,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
                lineNumber: 58,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/header/DesktopFluidHeader.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(DesktopFluidHeader, "steGcBwWWmYeXaj8XyotJ/W2DuI=");
_c = DesktopFluidHeader;
var _c;
__turbopack_context__.k.register(_c, "DesktopFluidHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/header/mobile/MobileMenuButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const MobileMenuButton = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ open, textLines, textInnerRef, iconRef, plusHRef, plusVRef, onToggle }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        type: "button",
        onClick: onToggle,
        "aria-label": open ? 'Fechar menu' : 'Abrir menu',
        "aria-expanded": open,
        className: `relative inline-flex items-center justify-center gap-2 bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible z-110 min-h-[48px] min-w-[48px] px-3 transition-colors duration-300 ${open ? 'text-white' : 'text-white hover:text-primary'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative inline-block h-[1em] overflow-hidden whitespace-nowrap",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    ref: textInnerRef,
                    className: "flex flex-col leading-none",
                    children: textLines.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "block h-[1em] leading-none text-sm tracking-wide",
                            style: {
                                visibility: i === textLines.length - 1 ? 'visible' : 'hidden'
                            },
                            children: line
                        }, `${line}-${i}`, false, {
                            fileName: "[project]/src/components/layout/header/mobile/MobileMenuButton.tsx",
                            lineNumber: 38,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/header/mobile/MobileMenuButton.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/layout/header/mobile/MobileMenuButton.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: iconRef,
                className: "relative w-[18px] h-[18px] shrink-0 inline-flex items-center justify-center will-change-transform",
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        ref: plusHRef,
                        className: "absolute left-1/2 top-1/2 w-full h-[1.5px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header/mobile/MobileMenuButton.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        ref: plusVRef,
                        className: "absolute left-1/2 top-1/2 w-full h-[1.5px] bg-current rounded-sm -translate-x-1/2 -translate-y-1/2 will-change-transform"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header/mobile/MobileMenuButton.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/header/mobile/MobileMenuButton.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/header/mobile/MobileMenuButton.tsx",
        lineNumber: 21,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = MobileMenuButton;
MobileMenuButton.displayName = 'MobileMenuButton';
const __TURBOPACK__default__export__ = MobileMenuButton;
var _c, _c1;
__turbopack_context__.k.register(_c, "MobileMenuButton$forwardRef");
__turbopack_context__.k.register(_c1, "MobileMenuButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/navigation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTACT_FORM",
    ()=>CONTACT_FORM,
    "NAVIGATION",
    ()=>NAVIGATION,
    "SOCIALS",
    ()=>SOCIALS
]);
const SOCIALS = {
    instagram: 'https://instagram.com/danilo_novais',
    facebook: 'https://facebook.com/danilonovaisvilela',
    linkedin: 'https://linkedin.com/in/danilonovais',
    twitter: 'https://twitter.com/danilo_novais',
    emailPrimary: 'mailto:danilo@portfoliodanilo.com',
    emailSecondary: 'mailto:dannovaisv@gmail.com',
    phone: '+55 11 98396-6838'
};
const NAVIGATION = {
    header: [
        {
            label: 'home',
            href: '/'
        },
        {
            label: 'sobre',
            href: '/sobre'
        },
        {
            label: 'portfólio',
            href: '/portfolio'
        },
        {
            label: 'contato',
            href: '#contact'
        }
    ],
    footer: {
        copyright: '© 2025 Danilo Novais Vilela — todos os direitos reservados',
        links: [
            {
                label: 'home',
                href: '#hero'
            },
            {
                label: 'sobre',
                href: '/sobre'
            },
            {
                label: 'portfólio',
                href: '/portfolio'
            },
            {
                label: 'contato',
                href: '#contact'
            }
        ]
    }
};
const CONTACT_FORM = {
    action: 'https://formsubmit.co/danilo@portfoliodanilo.com'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$29$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.29.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$563$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.563.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$563$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.563.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript) <export default as Linkedin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$563$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.563.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/navigation.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const MobileMenuPanel = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ navItems, accentColor, open, socialsRef, onNavigate, onClose, activeHref, isPageActive }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        ref: ref,
        id: "mobile-menu-panel",
        className: "fixed inset-0 bg-[#0048ff] backdrop-blur-xl flex flex-col justify-center px-8 z-50 pointer-events-auto",
        "aria-hidden": !open,
        onClick: (e)=>{
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "flex flex-col gap-4",
                role: "list",
                children: navItems.map((item)=>{
                    const hash = item.href.startsWith('/#') ? item.href.substring(1) : item.href;
                    const isActive = activeHref === hash;
                    const pageHighlight = isPageActive ? 'text-blueAccent font-semibold' : '';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "overflow-hidden leading-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onNavigate(item.href),
                            className: `sm-panel-item w-full py-3 text-4xl font-light tracking-wide transition-colors text-left leading-none uppercase will-change-transform origin-bottom min-h-[48px] ${pageHighlight || (isActive ? 'text-blueAccent font-medium underline underline-offset-4' : 'text-white/80 hover:text-white')}`,
                            children: item.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx",
                            lineNumber: 64,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, item.href, false, {
                        fileName: "[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx",
                        lineNumber: 63,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: socialsRef,
                className: "mt-12 pt-8 border-t border-white/10 flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$29$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h3, {
                        className: "sm-social-title text-sm font-medium uppercase tracking-wider",
                        initial: false,
                        animate: {
                            color: accentColor
                        },
                        children: "Connect"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4",
                        children: [
                            {
                                label: 'LinkedIn',
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].linkedin,
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$563$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__["Linkedin"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx",
                                    lineNumber: 97,
                                    columnNumber: 23
                                }, ("TURBOPACK compile-time value", void 0))
                            },
                            {
                                label: 'Instagram',
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].instagram,
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$563$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx",
                                    lineNumber: 102,
                                    columnNumber: 23
                                }, ("TURBOPACK compile-time value", void 0))
                            },
                            {
                                label: 'Email',
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].emailPrimary,
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$563$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx",
                                    lineNumber: 107,
                                    columnNumber: 23
                                }, ("TURBOPACK compile-time value", void 0))
                            }
                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: s.href,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                "aria-label": s.label,
                                className: "sm-social-link flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-primary hover:border-primary hover:scale-105 active:scale-95",
                                children: s.icon
                            }, s.label, false, {
                                fileName: "[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx",
        lineNumber: 40,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = MobileMenuPanel;
MobileMenuPanel.displayName = 'MobileMenuPanel';
const __TURBOPACK__default__export__ = MobileMenuPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "MobileMenuPanel$forwardRef");
__turbopack_context__.k.register(_c1, "MobileMenuPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/header/mobile/MobilePreLayers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$29$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.29.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
;
const MobilePreLayers = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = (_, ref)=>{
    // Ghost theme colors for pre-layers using CSS variables fallback
    const preLayerColors = [
        '#4fe6ff',
        '#8705f2',
        '#f501d3'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "fixed top-0 right-0 bottom-0 w-full pointer-events-none z-49",
        "aria-hidden": "true",
        children: preLayerColors.map((color, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$29$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "sm-prelayer absolute top-0 right-0 h-full w-full",
                initial: false,
                animate: {
                    backgroundColor: color
                }
            }, i, false, {
                fileName: "[project]/src/components/layout/header/mobile/MobilePreLayers.tsx",
                lineNumber: 26,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/src/components/layout/header/mobile/MobilePreLayers.tsx",
        lineNumber: 20,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = MobilePreLayers;
MobilePreLayers.displayName = 'MobilePreLayers';
const __TURBOPACK__default__export__ = MobilePreLayers;
var _c, _c1;
__turbopack_context__.k.register(_c, "MobilePreLayers$forwardRef");
__turbopack_context__.k.register(_c1, "MobilePreLayers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileHeaderBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$29$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.29.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
function MobileHeaderBar({ logoUrl, onLogoClick, children, isLight = false }) {
    const containerVariants = {
        hidden: {
            y: -64,
            opacity: 0
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ],
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: -15,
            filter: 'blur(8px)'
        },
        show: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$29$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].header, {
        variants: containerVariants,
        initial: "hidden",
        animate: "show",
        className: `fixed top-0 left-0 right-0 z-50 pointer-events-none ${isLight ? 'header--light' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full h-[60px] pointer-events-auto transition-colors duration-300 ${isLight ? 'bg-background/40 border-b border-white/10 shadow-xl' : 'bg-background/40 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between h-full w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$29$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: itemVariants,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            onClick: onLogoClick,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: logoUrl,
                                alt: "Danilo",
                                width: 32,
                                height: 32,
                                className: "h-20 w-20 object-contain",
                                unoptimized: true,
                                loading: "eager"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$29$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: itemVariants,
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_c = MobileHeaderBar;
var _c;
__turbopack_context__.k.register(_c, "MobileHeaderBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/header/mobile/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileMenuButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobileMenuButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileMenuPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobilePreLayers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobilePreLayers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileHeaderBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/header/mobile/MobileMenuButton.tsx [app-client] (ecmascript) <export default as MobileMenuButton>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileMenuButton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileMenuButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileMenuButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobileMenuButton.tsx [app-client] (ecmascript)");
}),
"[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx [app-client] (ecmascript) <export default as MobileMenuPanel>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileMenuPanel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileMenuPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileMenuPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx [app-client] (ecmascript)");
}),
"[project]/src/components/layout/header/mobile/MobilePreLayers.tsx [app-client] (ecmascript) <export default as MobilePreLayers>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobilePreLayers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobilePreLayers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobilePreLayers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobilePreLayers.tsx [app-client] (ecmascript)");
}),
"[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx [app-client] (ecmascript) <export default as MobileHeaderBar>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileHeaderBar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileHeaderBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileHeaderBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx [app-client] (ecmascript)");
}),
"[project]/src/hooks/useMobileMenuAnimation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMobileMenuAnimation",
    ()=>useMobileMenuAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gsap@3.14.2/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
;
;
function useMobileMenuAnimation(isOpen, onOpen, onClose) {
    _s();
    // Animation refs
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const preLayersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const preLayerElsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const socialsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toggleBtnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Icon animation refs
    const plusHRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const plusVRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const iconRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Text animation refs
    const textInnerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [textLines, setTextLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        'Menu',
        'Close'
    ]);
    // Timelines
    const openTlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const closeTweenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const spinTweenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textCycleAnimRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const openRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Initialize GSAP Context
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "useMobileMenuAnimation.useLayoutEffect": ()=>{
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context({
                "useMobileMenuAnimation.useLayoutEffect.ctx": ()=>{
                    const panel = panelRef.current;
                    const preContainer = preLayersRef.current;
                    const plusH = plusHRef.current;
                    const plusV = plusVRef.current;
                    const icon = iconRef.current;
                    const textInner = textInnerRef.current;
                    if (!panel || !plusH || !plusV || !icon || !textInner) return;
                    let preLayers = [];
                    if (preContainer) {
                        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
                    }
                    preLayerElsRef.current = preLayers;
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set([
                        panel,
                        ...preLayers
                    ], {
                        opacity: 0,
                        xPercent: 100,
                        filter: 'blur(10px)',
                        pointerEvents: 'none'
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(plusH, {
                        transformOrigin: '50% 50%',
                        rotate: 0
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(plusV, {
                        transformOrigin: '50% 50%',
                        rotate: 90
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(icon, {
                        rotate: 0,
                        transformOrigin: '50% 50%'
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(textInner, {
                        yPercent: 0
                    });
                }
            }["useMobileMenuAnimation.useLayoutEffect.ctx"]);
            return ({
                "useMobileMenuAnimation.useLayoutEffect": ()=>ctx.revert()
            })["useMobileMenuAnimation.useLayoutEffect"];
        }
    }["useMobileMenuAnimation.useLayoutEffect"], []);
    const animateIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMobileMenuAnimation.useCallback[animateIcon]": (opening)=>{
            const icon = iconRef.current;
            const h = plusHRef.current;
            const v = plusVRef.current;
            if (!icon || !h || !v) return;
            spinTweenRef.current?.kill();
            if (opening) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(icon, {
                    rotate: 0,
                    transformOrigin: '50% 50%'
                });
                spinTweenRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                    defaults: {
                        ease: 'expo.out'
                    }
                }).to(h, {
                    rotate: 45,
                    duration: 0.6
                }, 0).to(v, {
                    rotate: -45,
                    duration: 0.6
                }, 0);
            } else {
                spinTweenRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                    defaults: {
                        ease: 'expo.inOut'
                    }
                }).to(h, {
                    rotate: 0,
                    duration: 0.45
                }, 0).to(v, {
                    rotate: 90,
                    duration: 0.45
                }, 0).to(icon, {
                    rotate: 0,
                    duration: 0.001
                }, 0);
            }
        }
    }["useMobileMenuAnimation.useCallback[animateIcon]"], []);
    const animateText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMobileMenuAnimation.useCallback[animateText]": (opening)=>{
            const inner = textInnerRef.current;
            if (!inner) return;
            textCycleAnimRef.current?.kill();
            const currentLabel = opening ? 'Menu' : 'Close';
            const targetLabel = opening ? 'Close' : 'Menu';
            const cycles = 1; // Reduce cycles for cleaner transition
            const seq = [
                currentLabel
            ];
            let last = currentLabel;
            for(let i = 0; i < cycles; i++){
                last = last === 'Menu' ? 'Close' : 'Menu';
            }
            seq.push(targetLabel);
            setTextLines(seq);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(inner, {
                yPercent: 0
            });
            const lineCount = seq.length;
            const finalShift = (lineCount - 1) / lineCount * 100;
            textCycleAnimRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(inner, {
                yPercent: -finalShift,
                duration: 0.6,
                ease: 'expo.out'
            });
        }
    }["useMobileMenuAnimation.useCallback[animateText]"], []);
    const buildOpenTimeline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMobileMenuAnimation.useCallback[buildOpenTimeline]": ()=>{
            const panel = panelRef.current;
            const layers = preLayerElsRef.current;
            if (!panel) return null;
            openTlRef.current?.kill();
            closeTweenRef.current?.kill();
            const itemEls = panel.querySelectorAll('.sm-panel-item');
            const socialsEl = socialsRef.current;
            const socialLinks = socialsEl ? Array.from(socialsEl.querySelectorAll('.sm-social-link')) : [];
            const socialTitle = socialsEl?.querySelector('.sm-social-title');
            if (itemEls.length) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(itemEls, {
                x: 40,
                opacity: 0,
                filter: 'blur(8px)'
            });
            if (socialTitle) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(socialTitle, {
                opacity: 0,
                filter: 'blur(4px)'
            });
            if (socialLinks.length) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(socialLinks, {
                x: 20,
                opacity: 0
            });
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                paused: true
            });
            // Ghost Pre-layers: Sweep "membrane" across the screen
            if (layers.length) {
                tl.to(layers, {
                    opacity: 0.9,
                    xPercent: 0,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    ease: 'expo.out',
                    stagger: 0.08
                });
            }
            // Panel Reveal: Fade + Glide
            tl.to(panel, {
                opacity: 1,
                xPercent: 0,
                filter: 'blur(0px)',
                duration: 0.8,
                ease: 'expo.out',
                pointerEvents: 'auto'
            }, layers.length ? '-=0.5' : 0);
            // Staggered Nav Items: Glide from right
            if (itemEls.length) {
                tl.to(itemEls, {
                    x: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.0,
                    ease: 'expo.out',
                    stagger: 0.06
                }, '-=0.4');
            }
            // Socials Stagger
            if (socialTitle || socialLinks.length) {
                const socialsStart = '-=0.4';
                if (socialTitle) {
                    tl.to(socialTitle, {
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.6
                    }, socialsStart);
                }
                if (socialLinks.length) {
                    tl.to(socialLinks, {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'expo.out',
                        stagger: 0.06
                    }, socialsStart + '+=0.1');
                }
            }
            openTlRef.current = tl;
            return tl;
        }
    }["useMobileMenuAnimation.useCallback[buildOpenTimeline]"], []);
    const playOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMobileMenuAnimation.useCallback[playOpen]": ()=>{
            // Force reset any closing animation
            if (closeTweenRef.current) {
                closeTweenRef.current.kill();
                closeTweenRef.current = null;
            }
            const tl = buildOpenTimeline();
            if (tl) {
                tl.play(0);
            }
        }
    }["useMobileMenuAnimation.useCallback[playOpen]"], [
        buildOpenTimeline
    ]);
    const playClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMobileMenuAnimation.useCallback[playClose]": ()=>{
            openTlRef.current?.kill();
            openTlRef.current = null;
            const panel = panelRef.current;
            const layers = preLayerElsRef.current;
            if (!panel) return;
            const all = [
                ...layers,
                panel
            ];
            closeTweenRef.current?.kill();
            closeTweenRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(all, {
                opacity: 0,
                xPercent: 100,
                filter: 'blur(10px)',
                duration: 0.5,
                ease: 'expo.in',
                pointerEvents: 'none',
                overwrite: 'auto',
                onComplete: {
                    "useMobileMenuAnimation.useCallback[playClose]": ()=>{
                        const itemEls = panel.querySelectorAll('.sm-panel-item');
                        if (itemEls.length) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(itemEls, {
                            x: 40,
                            opacity: 0,
                            filter: 'blur(8px)'
                        });
                        const socialsEl = socialsRef.current;
                        if (socialsEl) {
                            const socialTitle = socialsEl.querySelector('.sm-social-title');
                            const socialLinks = Array.from(socialsEl.querySelectorAll('.sm-social-link'));
                            if (socialTitle) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(socialTitle, {
                                opacity: 0
                            });
                            if (socialLinks.length) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(socialLinks, {
                                x: 20,
                                opacity: 0
                            });
                        }
                    }
                }["useMobileMenuAnimation.useCallback[playClose]"]
            });
        }
    }["useMobileMenuAnimation.useCallback[playClose]"], []);
    // Sync with external isOpen prop
    const syncState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMobileMenuAnimation.useCallback[syncState]": ()=>{
            if (isOpen !== openRef.current) {
                if (isOpen) {
                    openRef.current = true;
                    setOpen(true);
                    playOpen();
                    animateIcon(true);
                    animateText(true);
                } else {
                    openRef.current = false;
                    setOpen(false);
                    playClose();
                    animateIcon(false);
                    animateText(false);
                }
            }
        }
    }["useMobileMenuAnimation.useCallback[syncState]"], [
        isOpen,
        playOpen,
        playClose,
        animateIcon,
        animateText
    ]);
    // Ensure text is always in sync with isOpen state
    // Update the toggleMenu function to ensure proper state synchronization
    const toggleMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMobileMenuAnimation.useCallback[toggleMenu]": ()=>{
            const target = !openRef.current;
            // Only proceed if the target state is different from current state
            if (target === openRef.current) return;
            openRef.current = target;
            setOpen(target);
            if (target) {
                onOpen();
                playOpen();
            } else {
                onClose();
                playClose();
            }
            animateIcon(target);
            animateText(target);
        }
    }["useMobileMenuAnimation.useCallback[toggleMenu]"], [
        onOpen,
        onClose,
        playOpen,
        playClose,
        animateIcon,
        animateText
    ]);
    return {
        refs: {
            panelRef,
            preLayersRef,
            socialsRef,
            toggleBtnRef,
            plusHRef,
            plusVRef,
            iconRef,
            textInnerRef
        },
        state: {
            open,
            textLines
        },
        actions: {
            toggleMenu,
            syncState
        }
    };
}
_s(useMobileMenuAnimation, "GCi1NxNv8lugFsgxlNKXWbKT9W4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/header/MobileStaggeredMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileStaggeredMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileMenuButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MobileMenuButton$3e$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobileMenuButton.tsx [app-client] (ecmascript) <export default as MobileMenuButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileMenuPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MobileMenuPanel$3e$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobileMenuPanel.tsx [app-client] (ecmascript) <export default as MobileMenuPanel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobilePreLayers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MobilePreLayers$3e$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobilePreLayers.tsx [app-client] (ecmascript) <export default as MobilePreLayers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileHeaderBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MobileHeaderBar$3e$__ = __turbopack_context__.i("[project]/src/components/layout/header/mobile/MobileHeaderBar.tsx [app-client] (ecmascript) <export default as MobileHeaderBar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMobileMenuAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useMobileMenuAnimation.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function MobileStaggeredMenu({ navItems, logoUrl, isLight = false, accentColor = '#0057FF', isOpen, onOpen, onClose, onNavigate, activeHref, isPageActive }) {
    _s();
    const { refs: { panelRef, preLayersRef, socialsRef, toggleBtnRef, plusHRef, plusVRef, iconRef, textInnerRef }, state: { open, textLines }, actions: { toggleMenu, syncState } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMobileMenuAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileMenuAnimation"])(isOpen, onOpen, onClose);
    // Sync with external isOpen prop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileStaggeredMenu.useEffect": ()=>{
            syncState();
        }
    }["MobileStaggeredMenu.useEffect"], [
        isOpen,
        syncState
    ]);
    // Lock body scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileStaggeredMenu.useEffect": ()=>{
            if (open) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return ({
                "MobileStaggeredMenu.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["MobileStaggeredMenu.useEffect"];
        }
    }["MobileStaggeredMenu.useEffect"], [
        open
    ]);
    // Handle ESC key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileStaggeredMenu.useEffect": ()=>{
            const handleEsc = {
                "MobileStaggeredMenu.useEffect.handleEsc": (e)=>{
                    if (e.key === 'Escape' && open) onClose();
                }
            }["MobileStaggeredMenu.useEffect.handleEsc"];
            window.addEventListener('keydown', handleEsc);
            return ({
                "MobileStaggeredMenu.useEffect": ()=>window.removeEventListener('keydown', handleEsc)
            })["MobileStaggeredMenu.useEffect"];
        }
    }["MobileStaggeredMenu.useEffect"], [
        onClose
    ]);
    // Focus trap
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileStaggeredMenu.useEffect": ()=>{
            if (!open || !panelRef.current) return;
            const focusableElements = panelRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            const handleTab = {
                "MobileStaggeredMenu.useEffect.handleTab": (e)=>{
                    if (e.key !== 'Tab') return;
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            }["MobileStaggeredMenu.useEffect.handleTab"];
            firstElement?.focus();
            window.addEventListener('keydown', handleTab);
            return ({
                "MobileStaggeredMenu.useEffect": ()=>window.removeEventListener('keydown', handleTab)
            })["MobileStaggeredMenu.useEffect"];
        }
    }["MobileStaggeredMenu.useEffect"], [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "lg:hidden relative z-60",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileHeaderBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MobileHeaderBar$3e$__["MobileHeaderBar"], {
                logoUrl: logoUrl,
                onLogoClick: onClose,
                isLight: open ? false : isLight,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileMenuButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MobileMenuButton$3e$__["MobileMenuButton"], {
                    ref: toggleBtnRef,
                    open: open,
                    textLines: textLines,
                    textInnerRef: textInnerRef,
                    iconRef: iconRef,
                    plusHRef: plusHRef,
                    plusVRef: plusVRef,
                    onToggle: toggleMenu
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/header/MobileStaggeredMenu.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/header/MobileStaggeredMenu.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobilePreLayers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MobilePreLayers$3e$__["MobilePreLayers"], {
                ref: preLayersRef,
                accentColor: accentColor
            }, void 0, false, {
                fileName: "[project]/src/components/layout/header/MobileStaggeredMenu.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$mobile$2f$MobileMenuPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MobileMenuPanel$3e$__["MobileMenuPanel"], {
                ref: panelRef,
                navItems: navItems,
                accentColor: accentColor,
                open: open,
                socialsRef: socialsRef,
                onNavigate: onNavigate,
                onClose: onClose,
                activeHref: activeHref,
                isPageActive: isPageActive
            }, void 0, false, {
                fileName: "[project]/src/components/layout/header/MobileStaggeredMenu.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/header/MobileStaggeredMenu.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_s(MobileStaggeredMenu, "Uk4gqk4eVlC7CeiXAUV/4u5QrUw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMobileMenuAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMobileMenuAnimation"]
    ];
});
_c = MobileStaggeredMenu;
var _c;
__turbopack_context__.k.register(_c, "MobileStaggeredMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/header/useActiveSection.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActiveSection",
    ()=>useActiveSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useActiveSection(sectionIds, rootMargin = '-45% 0px -45% 0px') {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#hero');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useActiveSection.useEffect": ()=>{
            const els = sectionIds.map({
                "useActiveSection.useEffect.els": (id)=>document.getElementById(id)
            }["useActiveSection.useEffect.els"]).filter(Boolean);
            if (!els.length) return;
            const obs = new IntersectionObserver({
                "useActiveSection.useEffect": (entries)=>{
                    const visible = entries.filter({
                        "useActiveSection.useEffect": (e)=>e.isIntersecting
                    }["useActiveSection.useEffect"]).sort({
                        "useActiveSection.useEffect": (a, b)=>(b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
                    }["useActiveSection.useEffect"])[0];
                    if (visible?.target?.id) setActive(`#${visible.target.id}`);
                }
            }["useActiveSection.useEffect"], {
                root: null,
                threshold: [
                    0.15,
                    0.25,
                    0.35
                ],
                rootMargin
            });
            els.forEach({
                "useActiveSection.useEffect": (el)=>obs.observe(el)
            }["useActiveSection.useEffect"]);
            return ({
                "useActiveSection.useEffect": ()=>obs.disconnect()
            })["useActiveSection.useEffect"];
        }
    }["useActiveSection.useEffect"], [
        rootMargin,
        sectionIds
    ]);
    return active;
}
_s(useActiveSection, "QUDxOde4j3KiFY77XsHuXKye1QY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/header/SiteHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/brand.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMediaQuery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useMediaQuery.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$site$2d$assets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/site-assets.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/site-assets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$DesktopFluidHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/DesktopFluidHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$MobileStaggeredMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/MobileStaggeredMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$useActiveSection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/useActiveSection.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function isHashHref(href) {
    return href.startsWith('#') || href.startsWith('/#');
}
function getHashFromHref(href) {
    if (href.startsWith('/#')) return href.substring(1);
    if (href.startsWith('#')) return href;
    return '';
}
function scrollToHash(hashHref) {
    const id = hashHref.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
function isExternalHref(href) {
    return /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
}
function SiteHeader({ navItems, gradient, accentColor }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isOnLightSection, setIsOnLightSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isDesktop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMediaQuery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaQuery"])('(min-width: 1024px)');
    // Hydration safety
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            setIsMounted(true);
        }
    }["SiteHeader.useEffect"], []);
    const sectionIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SiteHeader.useMemo[sectionIds]": ()=>navItems.filter({
                "SiteHeader.useMemo[sectionIds]": (n)=>isHashHref(n.href)
            }["SiteHeader.useMemo[sectionIds]"]).map({
                "SiteHeader.useMemo[sectionIds]": (n)=>getHashFromHref(n.href).replace('#', '')
            }["SiteHeader.useMemo[sectionIds]"])
    }["SiteHeader.useMemo[sectionIds]"], [
        navItems
    ]);
    const activeSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$useActiveSection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveSection"])(sectionIds);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const activeHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SiteHeader.useMemo[activeHref]": ()=>{
            if (pathname === '/') return activeSection;
            return pathname ?? undefined;
        }
    }["SiteHeader.useMemo[activeHref]"], [
        pathname,
        activeSection
    ]);
    const isSobrePage = pathname?.startsWith('/sobre');
    const onNavigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SiteHeader.useCallback[onNavigate]": (href)=>{
            const hash = getHashFromHref(href);
            if (hash) {
                const isHomePage = window.location.pathname === '/';
                const isTargetingCurrentPageHash = href.startsWith('#') || href.startsWith('/#') && isHomePage;
                if (isTargetingCurrentPageHash) {
                    scrollToHash(hash);
                    setIsOpen(false);
                    return;
                }
            }
            if (isExternalHref(href)) {
                window.open(href, '_blank', 'noopener,noreferrer');
                setIsOpen(false);
                return;
            }
            router.push(href);
            setIsOpen(false);
        }
    }["SiteHeader.useCallback[onNavigate]"], [
        router
    ]);
    const normalizedNavItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SiteHeader.useMemo[normalizedNavItems]": ()=>navItems
    }["SiteHeader.useMemo[normalizedNavItems]"], [
        navItems
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            const sections = Array.from(document.querySelectorAll('[data-light-section]'));
            if (!sections.length) return;
            const observer = new IntersectionObserver({
                "SiteHeader.useEffect": (entries)=>{
                    const isLight = entries.some({
                        "SiteHeader.useEffect.isLight": (e)=>e.isIntersecting
                    }["SiteHeader.useEffect.isLight"]);
                    setIsOnLightSection(isLight);
                }
            }["SiteHeader.useEffect"], {
                threshold: 0.12,
                rootMargin: '-60px 0px 0px 0px'
            });
            sections.forEach({
                "SiteHeader.useEffect": (sec)=>observer.observe(sec)
            }["SiteHeader.useEffect"]);
            return ({
                "SiteHeader.useEffect": ()=>observer.disconnect()
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], []);
    const logoUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$site$2d$assets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSiteAssetUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_ASSET_KEYS"].logos.headerLight, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAND"].assets.logos.logoLight) ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAND"].assets.logos.logoLight;
    const logoDesktop = logoUrl;
    const logoMobile = logoUrl;
    if (!isMounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: isDesktop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$DesktopFluidHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            navItems: normalizedNavItems,
            logoUrl: logoDesktop,
            isLight: isOnLightSection,
            isPageActive: isSobrePage,
            onNavigate: onNavigate,
            activeHref: activeHref
        }, void 0, false, {
            fileName: "[project]/src/components/layout/header/SiteHeader.tsx",
            lineNumber: 137,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$MobileStaggeredMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            navItems: normalizedNavItems,
            logoUrl: logoMobile,
            isLight: isOnLightSection,
            gradient: gradient,
            accentColor: accentColor,
            isOpen: isOpen,
            onOpen: ()=>setIsOpen(true),
            onClose: ()=>setIsOpen(false),
            onNavigate: onNavigate,
            activeHref: activeHref,
            isPageActive: isSobrePage
        }, void 0, false, {
            fileName: "[project]/src/components/layout/header/SiteHeader.tsx",
            lineNumber: 146,
            columnNumber: 9
        }, this)
    }, void 0, false);
}
_s(SiteHeader, "DhvsrH5SB8WQrTKdHE5w9y3sMg4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMediaQuery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$useActiveSection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveSection"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$site$2d$assets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSiteAssetUrl"]
    ];
});
_c = SiteHeader;
var _c;
__turbopack_context__.k.register(_c, "SiteHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Canonical Header Component
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$SiteHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header/SiteHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/brand.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/navigation.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Header() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2f$SiteHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        navItems: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVIGATION"].header || [],
        gradient: [
            'rgba(0,87,255,0.55)',
            'rgba(82,39,255,0.45)'
        ],
        accentColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAND"].colors.bluePrimary
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Header.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/antigravity/prompts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Google Antigravity Manager Prompts
 * Sistema de prompts atômicos para orquestração de correções no portfólio
 * Ghost System v3.0
 */ // ==========================================
// TYPES
// ==========================================
__turbopack_context__.s([
    "ATOMIC_PROMPTS",
    ()=>ATOMIC_PROMPTS,
    "GOOGLE_ANTIGRAVITY_MANAGER_PROMPT",
    ()=>GOOGLE_ANTIGRAVITY_MANAGER_PROMPT,
    "PROMPT_WAVES",
    ()=>PROMPT_WAVES,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getCriticalPrompts",
    ()=>getCriticalPrompts,
    "getExecutionOrder",
    ()=>getExecutionOrder,
    "getPendingPrompts",
    ()=>getPendingPrompts,
    "getPromptById",
    ()=>getPromptById,
    "getPromptWave",
    ()=>getPromptWave,
    "getPromptsByCategory",
    ()=>getPromptsByCategory,
    "getPromptsBySeverity",
    ()=>getPromptsBySeverity
]);
const ATOMIC_PROMPTS = [
    {
        id: 'PROMPT_01',
        title: 'Unificar grid global e margens laterais',
        severity: 'critical',
        category: 'layout',
        objective: 'Garantir que Home, Sobre e Portfólio usem exatamente o mesmo container (largura útil, gutters e paddings) para obter alinhamento "duas laterais" perfeito em todo o scroll.',
        files: [
            'src/app/layout.tsx',
            'src/components/layout/ClientLayout.tsx',
            'src/components/layout/Container.tsx',
            'src/app/page.tsx',
            'src/app/sobre/page.tsx',
            'src/app/portfolio/page.tsx'
        ],
        actions: [
            'Padronizar um único componente Container com Tailwind (ex.: mx-auto max-w-[...px] px-4 md:px-6) para refletir exatamente o grid das imagens Ghost.',
            'Garantir que todas as seções principais de Home, Sobre e Portfólio sejam diretamente embrulhadas por esse Container, sem paddings laterais adicionais em cada seção.',
            'Ajustar ClientLayout (se usado) para não duplicar margens/paddings já definidos em Container.',
            'Confirmar que globals.css e Tailwind estão corretamente importados em layout.tsx.'
        ],
        rules: [
            'Mobile-first',
            'Apenas ajustes de layout (sem alterar textos)',
            'Manter o grid idêntico às imagens em docs/HOME, docs/SOBRE e docs/PORTFOLIO'
        ],
        acceptanceCriteria: [
            'Ao rolar de cima a baixo em /, /sobre e /portfolio, as bordas esquerda/direita de títulos, textos e cards mantêm alinhamento perfeito',
            'O item "grid e margens laterais correspondem exatamente à imagem?" pode ser marcado como Sim para todas as seções'
        ],
        status: 'pending'
    },
    {
        id: 'PROMPT_02',
        title: 'Corrigir Header e comportamento de clique em mobile',
        severity: 'critical',
        category: 'mobile',
        objective: 'Garantir que o Header tenha área de clique/touch consistente, sem interferência na rolagem ou nos CTAs em mobile.',
        files: [
            'src/components/layout/Header.tsx',
            'src/components/layout/header/*',
            'src/app/layout.tsx'
        ],
        actions: [
            'Revisar estrutura de nav e botões de menu (hamburger) para garantir que nenhum elemento overlay capture cliques fora da área esperada.',
            'Em mobile, assegurar que cada item de navegação tenha área mínima de 44×44px (via Tailwind, ex.: px-3 py-2).',
            'Validar se existe algum pointer-events indevido em wrappers do Header que interfiram em cliques no Hero e nas seções abaixo.'
        ],
        rules: [
            'Não alterar o conteúdo textual nem adicionar links novos',
            'Apenas ajustar estrutura e classes Tailwind'
        ],
        acceptanceCriteria: [
            'Em dispositivos touch, todos os links do Header respondem com precisão, sem áreas "mortas" ou cliques acidentais',
            'Nenhum overflow horizontal é introduzido pelo Header',
            'O item "mobile livre de overflow e com touch targets adequados?" pode ser marcado como Sim para Home'
        ],
        status: 'pending'
    },
    {
        id: 'PROMPT_03',
        title: 'Travar Home Hero + GhostScene na referência HERO.jpg',
        severity: 'critical',
        category: 'layout',
        objective: 'Ajustar tipografia, espaçamento e cena 3D do Hero para ficar 1:1 com docs/HOME/HERO.jpg e o blueprint Ghost.',
        files: [
            'src/components/home/hero/*',
            'src/components/canvas/home/hero/GhostScene.tsx'
        ],
        actions: [
            'Equalizar hierarquia tipográfica (h1, h2/h3, body) com o blueprint, ajustando apenas classes Tailwind (weights, tracking, line-height), sem alterar o texto.',
            'Revisar espaçamentos verticais entre título/subtítulo/CTA para que as distâncias visuais coincidam com a imagem de referência.',
            'Em GhostScene.tsx, ajustar posição, escala e intensidade de luz/materiais para obter o mesmo enquadramento e "glow" do Ghost na HERO.jpg.'
        ],
        rules: [
            'Não mexer no copy',
            'Qualquer ajuste 3D deve preservar performance (usar useFrame apenas quando necessário e memoizar materiais)'
        ],
        acceptanceCriteria: [
            'Comparando a Home Hero com docs/HOME/HERO.jpg, espaçamentos, tipografia e enquadramento do Ghost são indistinguíveis a olho nu',
            'Parallax leve do Ghost permanece suave, sem jitter'
        ],
        status: 'pending',
        dependsOn: [
            'PROMPT_01'
        ]
    },
    {
        id: 'PROMPT_04',
        title: 'Manifesto: áudio + scroll e grid alinhado',
        severity: 'high',
        category: 'motion',
        objective: 'Fazer o Manifesto respeitar o grid global e implementar lógica de áudio que auto-mute/unmute conforme a seção entra/sai da viewport.',
        files: [
            'src/components/home/hero/*',
            'src/components/home/ManifestoSection.tsx'
        ],
        actions: [
            'Garantir que o container do Manifesto esteja dentro do mesmo Container global, sem paddings extras.',
            'Implementar observer de scroll (ex.: IntersectionObserver no client) para mutar o áudio quando a seção estiver abaixo de um certo threshold de visibilidade.',
            'Em desktop, permitir que o áudio inicie ao entrar na seção; em mobile, respeitar a necessidade de interação explícita do usuário para iniciar áudio.'
        ],
        rules: [
            'Não alterar o conteúdo do Manifesto',
            'Manter a UI atual, refinando apenas comportamento e layout'
        ],
        acceptanceCriteria: [
            'Manifesto ocupa a mesma largura da Hero/Featured Projects',
            'Áudio nunca continua tocando enquanto a seção está completamente fora de viewport',
            'O checklist de grid/alinhamento e mobile pode ser marcado como Sim para Manifesto'
        ],
        status: 'pending',
        dependsOn: [
            'PROMPT_01'
        ]
    },
    {
        id: 'PROMPT_05',
        title: 'Featured Projects: grid 100% horizontal e mobile centrado',
        severity: 'critical',
        category: 'layout',
        objective: 'Fazer os cards de projetos em destaque preencherem 100% da largura do container, com alturas equalizadas por linha e CTAs/textos centralizados em mobile.',
        files: [
            'src/components/home/featured-projects/*'
        ],
        actions: [
            'Modelar o grid com Tailwind usando combinações de grid-cols-* e auto-fit/auto-fill (ou flex com flex-[x]) para reproduzir a distribuição de larguras da referência, sem espaços vazios.',
            'Garantir que todos os cards de uma mesma linha compartilhem a mesma altura (via items-stretch + conteúdo interno com h-full).',
            'Em mobile, centralizar títulos/descrições/CTAs dos cards e revisar paddings para remover qualquer overflow horizontal.'
        ],
        rules: [
            'Mobile-first',
            'Sem alterar textos',
            'Comparação constante com docs/HOME/HOME-PORTFOLIO-BLACK---GHOST.jpg e docs/HOME/HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg'
        ],
        acceptanceCriteria: [
            'Não há gaps horizontais no fim de nenhuma linha',
            'Todos os cards têm mesma altura visual por linha',
            'Em mobile, os CTAs ficam centralizados e facilmente clicáveis'
        ],
        status: 'pending',
        dependsOn: [
            'PROMPT_01'
        ]
    },
    {
        id: 'PROMPT_06',
        title: 'Portfólio (/portfolio): Mosaic Grid + parallax estilo CodePen',
        severity: 'critical',
        category: 'layout',
        objective: 'Ajustar o grid de /portfolio para preencher 100% da largura, equalizar alturas por linha e implementar parallax/hover inspirado no CodePen de referência.',
        files: [
            'src/app/portfolio/page.tsx',
            'src/components/portfolio/PortfolioMosaicGrid.tsx',
            'src/components/portfolio/MosaicCard.tsx',
            'src/components/portfolio/PortfolioCard.tsx'
        ],
        actions: [
            'Refatorar PortfolioMosaicGrid para calcular larguras relativas por linha (ex.: colunas flex com basis-* e grow) de forma a sempre fechar 100% da largura do container.',
            'Garantir que todos os cards de uma mesma linha tenham altura igual (via h-full + wrappers internos com flex flex-col e justify-between).',
            'Implementar animações de hover/parallax nos cards usando Framer Motion (ex.: leve translateZ em perspectiva simulada, com easing cubic-bezier(0.22, 1, 0.36, 1)) para aproximar o efeito do CodePen.'
        ],
        rules: [
            'Não alterar estrutura de conteúdo dos cards (título, descrição, tags)',
            'Apenas layout e motion'
        ],
        acceptanceCriteria: [
            'Qualquer linha de cards ocupa 100% da largura do container',
            'Nenhuma linha apresenta gaps residuais',
            'Hover/parallax são fluidos, sem overshoot ou bounce exagerado, replicando a fluidez do CodePen'
        ],
        status: 'pending',
        dependsOn: [
            'PROMPT_01'
        ]
    },
    {
        id: 'PROMPT_07',
        title: 'About Hero (tipografia) + About Closed (vídeo Supabase)',
        severity: 'critical',
        category: 'accessibility',
        objective: 'Corrigir a visibilidade do texto em About Hero e implementar troca dinâmica de vídeo Desktop/Mobile em About Closed usando URLs do Supabase.',
        files: [
            'src/components/sobre/AboutHero.tsx',
            'src/components/sobre/AboutClosing.tsx'
        ],
        actions: [
            'Em AboutHero, aplicar classes Tailwind para que o subtítulo/h3 use cor branca e contraste adequado sobre o background, respeitando a escala tipográfica Ghost.',
            'Identificar no Supabase as chaves/URLs de vídeo para Desktop e Mobile (por ex.: colunas about_closed_desktop_url e about_closed_mobile_url).',
            'Em AboutClosing, implementar lógica client-side (hook de breakpoint ou matchMedia) para escolher a URL correta no player de vídeo sem duplicar o componente.'
        ],
        rules: [
            'Não mudar o texto dos títulos',
            'Apenas cores/tailwind para visibilidade e seleção dinâmica de mídia'
        ],
        acceptanceCriteria: [
            'Em qualquer breakpoint, o subtítulo de About Hero é claramente legível',
            'O About Closed carrega automaticamente a versão de vídeo adequada ao viewport (Desktop vs Mobile), sem que o usuário perceba troca de layout'
        ],
        status: 'pending'
    },
    {
        id: 'PROMPT_08',
        title: 'About Origin / Method / What I Do: scroll animations e glow roxo',
        severity: 'medium',
        category: 'motion',
        objective: 'Refinar animações de scroll em Origin e Method e implementar/ajustar glow roxo + ícones redondos em What I Do, seguindo a especificação Ghost.',
        files: [
            'src/components/sobre/AboutOrigin.tsx',
            'src/components/sobre/AboutMethod.tsx',
            'src/components/sobre/AboutWhatIDo.tsx',
            'src/components/sobre/motion.ts'
        ],
        actions: [
            'Centralizar as variantes do Framer Motion em motion.ts com um set de easings premium (por exemplo, curvas suaves sem overshoot) e reutilizá-las em todas as seções.',
            'Em Origin/Method, disparar animações apenas quando o bloco estiver parcialmente visível (ex.: 25–30% em viewport) para evitar disparos prematuros.',
            'Em What I Do, ajustar o glow roxo para que o efeito seja suave, sem serrilhado, e centralizar os ícones em círculos perfeitos, respeitando o grid lateral.'
        ],
        rules: [
            'Não alterar textos',
            'Evitar qualquer animação que cause "bounce" exagerado ou fadiga visual'
        ],
        acceptanceCriteria: [
            'As animações de entrada seguem o mesmo timing e easing em todas as seções',
            'O glow roxo nos ícones é sutil mas perceptível, alinhado ao look Ghost',
            'O item "animação de parallax/hover segue a fluidez Ghost?" pode ser marcado como Sim para essas seções'
        ],
        status: 'pending',
        dependsOn: [
            'PROMPT_07'
        ]
    },
    {
        id: 'PROMPT_09',
        title: 'Centralização absoluta de mídia nos cards de portfólio',
        severity: 'medium',
        category: 'layout',
        objective: 'Garantir que todas as imagens e vídeos dentro dos cards de portfólio estejam sempre centralizados e preencham o card de forma consistente, independentemente da proporção.',
        files: [
            'src/components/portfolio/PortfolioCard.tsx',
            'src/components/portfolio/ProjectsGallery.tsx'
        ],
        actions: [
            'Envolver a mídia (img/video) em um wrapper com relative overflow-hidden e altura fixa ou proporcional à linha (para suportar alturas equalizadas).',
            'Definir mídia com object-cover object-center w-full h-full para garantir que sempre preencha o espaço sem distorção.',
            'Validar casos extremos de proporção (super wide vs super vertical) para garantir que o recorte preserve a parte visual mais importante do conteúdo.'
        ],
        rules: [
            'Não alterar textos ou ordem de informações do card',
            'Apenas o container de mídia'
        ],
        acceptanceCriteria: [
            'Nenhum card mostra barras pretas/brancas laterais ou em cima/baixo',
            'Todas as mídias parecem perfeitamente centradas e recortadas, mantendo a altura dos cards uniforme por linha'
        ],
        status: 'pending',
        dependsOn: [
            'PROMPT_06'
        ]
    },
    {
        id: 'PROMPT_10',
        title: 'Eliminar overflow horizontal e validar touch targets em todo o site',
        severity: 'high',
        category: 'mobile',
        objective: 'Garantir que todas as páginas estejam livres de scroll horizontal acidental e que todos os CTAs/cards tenham zonas de toque confortáveis em mobile.',
        files: [
            'src/app/page.tsx',
            'src/app/sobre/page.tsx',
            'src/app/portfolio/page.tsx',
            'src/components/home/*',
            'src/components/sobre/*',
            'src/components/portfolio/*'
        ],
        actions: [
            'Auditar todos os wrappers horizontais (carrosséis, grids) para remover larguras fixas que ultrapassem 100vw em mobile.',
            'Garantir que todos os botões/links tenham px-3 py-2 ou superior em mobile, mantendo a identidade Ghost.',
            'Testar manualmente em breakpoints principais (sm/md/lg) para confirmar ausência total de scroll horizontal.'
        ],
        rules: [
            'Não remover seções para resolver overflow',
            'A correção deve ser via layout/responsividade'
        ],
        acceptanceCriteria: [
            'Nenhuma página apresenta scroll horizontal em qualquer breakpoint',
            'Todos os CTAs e cards são facilmente clicáveis em touchscreen',
            'O item "mobile livre de overflow e com touch targets adequados?" pode ser marcado como Sim em todas as seções'
        ],
        status: 'pending',
        dependsOn: [
            'PROMPT_02',
            'PROMPT_05',
            'PROMPT_06'
        ]
    }
];
const PROMPT_WAVES = [
    {
        id: 'WAVE_1',
        name: 'Foundation & Critical Layout',
        description: 'Corrigir grid global, header mobile e garantir base sólida para todas as páginas',
        prompts: ATOMIC_PROMPTS.filter((p)=>[
                'PROMPT_01',
                'PROMPT_02',
                'PROMPT_05',
                'PROMPT_06'
            ].includes(p.id))
    },
    {
        id: 'WAVE_2',
        name: 'Hero & 3D Calibration',
        description: 'Ajustar Hero, GhostScene e seções visuais críticas',
        prompts: ATOMIC_PROMPTS.filter((p)=>[
                'PROMPT_03',
                'PROMPT_04',
                'PROMPT_07'
            ].includes(p.id))
    },
    {
        id: 'WAVE_3',
        name: 'Motion & Polish',
        description: 'Animações refinadas, glow effects e validação final de responsividade',
        prompts: ATOMIC_PROMPTS.filter((p)=>[
                'PROMPT_08',
                'PROMPT_09',
                'PROMPT_10'
            ].includes(p.id))
    }
];
const GOOGLE_ANTIGRAVITY_MANAGER_PROMPT = `
# Ghost Portfolio Audit Orchestrator

Você é o orquestrador principal do sistema de auditoria Ghost Portfolio.
Execute os prompts atômicos em ondas (waves), respeitando dependências.

## Contexto
- Projeto: Portfólio Danilo Novais (Ghost Era)
- Framework: Next.js 15 (App Router) + React 18 + TypeScript + Tailwind CSS
- 3D: React Three Fiber + @react-three/drei
- Motion: Framer Motion
- Design System: Ghost System v3.0

## Paleta de Cores (Tokens Oficiais)
- bluePrimary: #0048ff (Cor da Marca, CTAs, Links)
- blueAccent: #4fe6ff (Brilhos Ghost, Atmosfera)
- background: #040013 (Fundo Principal - Deep Void)
- text: #fcffff (Texto Principal)
- textSecondary: #a1a3a3 (Metadados)
- purpleDetails: #8705f2 (Highlights sutis)

## Easing Padrão Ghost
cubic-bezier(0.22, 1, 0.36, 1) - easeOutExpo

## Ordem de Execução

### Wave 1: Foundation & Critical Layout
1. PROMPT_01 - Unificar grid global
2. PROMPT_02 - Corrigir Header mobile
3. PROMPT_05 - Featured Projects grid
4. PROMPT_06 - Portfolio Mosaic Grid

### Wave 2: Hero & 3D Calibration
5. PROMPT_03 - Home Hero + GhostScene
6. PROMPT_04 - Manifesto áudio + scroll
7. PROMPT_07 - About Hero + About Closed

### Wave 3: Motion & Polish
8. PROMPT_08 - About sections animations
9. PROMPT_09 - Media centralization
10. PROMPT_10 - Final overflow/touch validation

## Regras de Execução
1. Execute um prompt por vez, aguarde conclusão
2. Respeite dependências (dependsOn)
3. Após cada prompt, valide com build: pnpm run build
4. Documente mudanças no git com mensagens semânticas
5. Se um prompt falhar, registre e continue com próximo independente

## Critérios de Sucesso Global
- Zero overflow horizontal em mobile
- Grid consistente em todas as páginas
- Touch targets ≥ 44x44px
- Animações suaves sem jitter
- Build passa sem erros
`;
const getPromptById = (id)=>ATOMIC_PROMPTS.find((p)=>p.id === id);
const getPromptsByCategory = (category)=>ATOMIC_PROMPTS.filter((p)=>p.category === category);
const getPromptsBySeverity = (severity)=>ATOMIC_PROMPTS.filter((p)=>p.severity === severity);
const getPromptWave = (waveId)=>PROMPT_WAVES.find((w)=>w.id === waveId);
const getCriticalPrompts = ()=>ATOMIC_PROMPTS.filter((p)=>p.severity === 'critical');
const getPendingPrompts = ()=>ATOMIC_PROMPTS.filter((p)=>p.status === 'pending');
const getExecutionOrder = ()=>{
    const executed = new Set();
    const result = [];
    const canExecute = (prompt)=>{
        if (!prompt.dependsOn) return true;
        return prompt.dependsOn.every((dep)=>executed.has(dep));
    };
    while(result.length < ATOMIC_PROMPTS.length){
        const next = ATOMIC_PROMPTS.find((p)=>!executed.has(p.id) && canExecute(p));
        if (next) {
            result.push(next);
            executed.add(next.id);
        } else {
            break;
        }
    }
    return result;
};
const __TURBOPACK__default__export__ = {
    ATOMIC_PROMPTS,
    PROMPT_WAVES,
    GOOGLE_ANTIGRAVITY_MANAGER_PROMPT,
    getPromptById,
    getPromptsByCategory,
    getPromptsBySeverity,
    getPromptWave,
    getCriticalPrompts,
    getPendingPrompts,
    getExecutionOrder
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/antigravity/antigravity.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runExperienceOrchestrator",
    ()=>runExperienceOrchestrator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/antigravity.store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$antigravity$2f$prompts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/antigravity/prompts.ts [app-client] (ecmascript)");
;
;
const runExperienceOrchestrator = ({ viewport, prefersReducedMotion })=>{
    const isMobile = viewport === 'mobile';
    // Default base state
    const flags = {
        mountWebGL: true,
        enableManifestoScroll: true,
        enableHoverInteractions: true,
        reducedMotion: prefersReducedMotion,
        debugMode: ("TURBOPACK compile-time value", "development") === 'development'
    };
    // 1. Mobile constraint
    if (isMobile) {
        flags.mountWebGL = false; // WebGL disabled on mobile
    }
    // 2. Reduced Motion overrides strictness
    if (prefersReducedMotion) {
        flags.mountWebGL = false;
        flags.enableManifestoScroll = false;
        flags.enableHoverInteractions = false;
    }
    return flags;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useExperience.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useExperience",
    ()=>useExperience
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$antigravity$2f$antigravity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/antigravity/antigravity.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/antigravity.store.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useExperience(enabled = true) {
    _s();
    /*
   * 🧠 UNIFIED BRAIN: ANTIGRAVITY ORCHESTRATOR
   * Coordinates: Flags (Logic), Viewport (Sensors) and Hydration
   */ const setFlags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAntigravityStore"])({
        "useExperience.useAntigravityStore[setFlags]": (state)=>state.setFlags
    }["useExperience.useAntigravityStore[setFlags]"]);
    const setViewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAntigravityStore"])({
        "useExperience.useAntigravityStore[setViewport]": (state)=>state.setViewport
    }["useExperience.useAntigravityStore[setViewport]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useExperience.useEffect": ()=>{
            if (!enabled) return;
            // 1. Initial Sensing
            const handleResize = {
                "useExperience.useEffect.handleResize": ()=>{
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    setViewport(width, height);
                    const viewport = width >= 1024 ? 'desktop' : width >= 640 ? 'tablet' : 'mobile';
                    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    // 2. Logic Processing (Orchestrator)
                    const flags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$antigravity$2f$antigravity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["runExperienceOrchestrator"])({
                        viewport,
                        prefersReducedMotion
                    });
                    // 3. State Update
                    setFlags(flags);
                }
            }["useExperience.useEffect.handleResize"];
            // Init
            handleResize();
            // Listeners
            window.addEventListener('resize', handleResize);
            return ({
                "useExperience.useEffect": ()=>window.removeEventListener('resize', handleResize)
            })["useExperience.useEffect"];
        }
    }["useExperience.useEffect"], [
        enabled,
        setFlags,
        setViewport
    ]);
}
_s(useExperience, "TbhguTRFSYkOWBv2mHUZiz0k94o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAntigravityStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAntigravityStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/debug/AntigravityDebugger.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AntigravityDebugger",
    ()=>AntigravityDebugger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/antigravity.store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const AntigravityDebugger = ()=>{
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAntigravityStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AntigravityDebugger.useEffect": ()=>{
            setMounted(true);
        }
    }["AntigravityDebugger.useEffect"], []);
    if (!mounted || ("TURBOPACK compile-time value", "development") !== 'development' || !store.flags.debugMode) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 right-4 z-9999 bg-black/90 text-[10px] font-mono p-3 rounded-lg border border-white/10 shadow-2xl backdrop-blur-md text-white min-w-[200px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 uppercase tracking-wider text-neutral-500 font-bold border-b border-white/10 pb-1 flex justify-between",
                children: [
                    "Antigravity System",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-green-500",
                        children: "●"
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-neutral-500 block",
                        children: "Narrative State"
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-blue-400 font-bold text-xs",
                        children: store.narrativeState
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full bg-neutral-800 h-1 mt-1 rounded overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-500 h-full transition-all duration-75",
                            style: {
                                width: `${store.scrollProgress * 100}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlagStatus, {
                        label: "WebGL",
                        active: store.flags.mountWebGL
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlagStatus, {
                        label: "Manifesto",
                        active: store.flags.enableManifestoScroll
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlagStatus, {
                        label: "Hover",
                        active: store.flags.enableHoverInteractions
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlagStatus, {
                        label: "Reduced Motion",
                        active: store.flags.reducedMotion,
                        bg: "bg-red-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-neutral-500 block",
                        children: "Viewport"
                    }, void 0, false, {
                        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-neutral-300",
                        children: [
                            store.viewport.width,
                            "px × ",
                            store.viewport.height,
                            "px"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AntigravityDebugger, "HnrSADm6TEN/NhsAoCQvHq3mUcI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$antigravity$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAntigravityStore"]
    ];
});
_c = AntigravityDebugger;
const FlagStatus = ({ label, active, bg = 'bg-green-500' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between bg-white/5 p-1 px-2 rounded",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                lineNumber: 82,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-2 h-2 rounded-full ${active ? bg : 'bg-neutral-700'}`
            }, void 0, false, {
                fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
                lineNumber: 83,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/debug/AntigravityDebugger.tsx",
        lineNumber: 81,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = FlagStatus;
var _c, _c1;
__turbopack_context__.k.register(_c, "AntigravityDebugger");
__turbopack_context__.k.register(_c1, "FlagStatus");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/ClientLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/SmoothScroll.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useExperience$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useExperience.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$debug$2f$AntigravityDebugger$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/debug/AntigravityDebugger.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function ClientLayout({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClientLayout.useMemo[isAdmin]": ()=>pathname?.startsWith('/admin') ?? false
    }["ClientLayout.useMemo[isAdmin]"], [
        pathname
    ]);
    // 🧠 ORQUESTRAÇÃO GLOBAL DA EXPERIÊNCIA (desativada no /admin para evitar scroll lock)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useExperience$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExperience"])(!isAdmin);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientLayout.useEffect": ()=>{
            if (isAdmin) {
                document.documentElement.classList.add('admin-page');
                return ({
                    "ClientLayout.useEffect": ()=>{
                        document.documentElement.classList.remove('admin-page');
                    }
                })["ClientLayout.useEffect"];
            }
            return;
        }
    }["ClientLayout.useEffect"], [
        isAdmin
    ]);
    if (isAdmin) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            id: "main-content",
            className: "admin-surface relative min-h-screen bg-slate-950 text-slate-50",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/layout/ClientLayout.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SmoothScroll$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/ClientLayout.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                id: "main-content",
                className: "relative grow",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/layout/ClientLayout.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            ("TURBOPACK compile-time value", "development") === 'development' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$debug$2f$AntigravityDebugger$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AntigravityDebugger"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/ClientLayout.tsx",
                lineNumber: 61,
                columnNumber: 50
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/ClientLayout.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(ClientLayout, "4WpjYj7M5pF/HD09Bj8n3FnVm4o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useExperience$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExperience"]
    ];
});
_c = ClientLayout;
var _c;
__turbopack_context__.k.register(_c, "ClientLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/ErrorBoundary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('=== ERROR BOUNDARY CAUGHT ===');
        console.error('Error:', error);
        console.error('Error Message:', error.message);
        console.error('Error Stack:', error.stack);
        console.error('Component Stack:', errorInfo.componentStack);
        console.error('=== END ERROR BOUNDARY ===');
        this.setState({
            errorInfo
        });
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-red-900/20 flex items-center justify-center p-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl w-full bg-black/90 text-white p-8 rounded-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold mb-4 text-red-400",
                            children: "🚨 Something went wrong"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-4 bg-red-900/30 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-sm break-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Error:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                                        lineNumber: 54,
                                        columnNumber: 17
                                    }, this),
                                    " ",
                                    this.state.error?.message
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this),
                        this.state.error?.stack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                    className: "cursor-pointer text-yellow-400 hover:text-yellow-300",
                                    children: "View full error stack"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                                    lineNumber: 60,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    className: "mt-2 p-4 bg-gray-900 text-xs overflow-auto max-h-64 rounded",
                                    children: this.state.error.stack
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                                    lineNumber: 63,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                            lineNumber: 59,
                            columnNumber: 15
                        }, this),
                        this.state.errorInfo?.componentStack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                    className: "cursor-pointer text-yellow-400 hover:text-yellow-300",
                                    children: "View component stack"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                                    lineNumber: 71,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    className: "mt-2 p-4 bg-gray-900 text-xs overflow-auto max-h-64 rounded whitespace-pre-wrap",
                                    children: this.state.errorInfo.componentStack
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                                    lineNumber: 74,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                            lineNumber: 70,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>window.location.reload(),
                                    className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium",
                                    children: "Reload Page"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        this.setState({
                                            hasError: false,
                                            error: null,
                                            errorInfo: null
                                        });
                                    },
                                    className: "px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium",
                                    children: "Try Again"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ErrorBoundary.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/AssetLoaderWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssetLoaderWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$site$2d$assets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/site-assets.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$site$2d$assets$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/site-assets-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$ClientLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/ClientLayout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ErrorBoundary.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AssetLoaderWrapper({ children }) {
    _s();
    const [assets, setAssets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [assetsLoaded, setAssetsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AssetLoaderWrapper.useEffect": ()=>{
            const loadAssets = {
                "AssetLoaderWrapper.useEffect.loadAssets": async ()=>{
                    try {
                        const loadedAssets = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$site$2d$assets$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientSiteAssets"])();
                        setAssets(loadedAssets);
                    } catch (error) {
                        console.error('Falha ao carregar site_assets:', error instanceof Error ? error.message : error);
                        // Try fallback API call
                        try {
                            const response = await fetch('/api/site-assets');
                            if (response.ok) {
                                const assetsData = await response.json();
                                setAssets(assetsData);
                            } else {
                                console.error('Erro ao buscar site_assets via API:', response.status, response.statusText);
                            }
                        } catch (fallbackError) {
                            console.error('Erro fallback de site_assets:', fallbackError instanceof Error ? fallbackError.message : fallbackError);
                        }
                    } finally{
                        setAssetsLoaded(true);
                    }
                }
            }["AssetLoaderWrapper.useEffect.loadAssets"];
            loadAssets();
        }
    }["AssetLoaderWrapper.useEffect"], []);
    // If assets haven't loaded yet, render the children without the provider
    // This allows the page to render while assets are being fetched
    if (!assetsLoaded) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$ClientLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AssetLoaderWrapper.tsx",
            lineNumber: 62,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$site$2d$assets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiteAssetsProvider"], {
            assets: assets,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$ClientLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AssetLoaderWrapper.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AssetLoaderWrapper.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/AssetLoaderWrapper.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(AssetLoaderWrapper, "NkE3doTNsNDbH8rEYwni76cKmOg=");
_c = AssetLoaderWrapper;
var _c;
__turbopack_context__.k.register(_c, "AssetLoaderWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_a37c8717._.js.map
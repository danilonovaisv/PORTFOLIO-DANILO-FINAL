module.exports = [
"[project]/src/config/brand.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BRAND",
    ()=>BRAND,
    "SUPABASE_STORAGE_URL",
    ()=>SUPABASE_STORAGE_URL
]);
// O projeto principal é o aymuvxysygrwoicsjgxj; usamos como fallback seguro
// para evitar perda de links quando as envs não estão presentes (ex.: build local).
const SUPABASE_PROJECT_URL = ("TURBOPACK compile-time value", "https://umkmwbkwvulxtdodzmzf.supabase.co") ?? process.env.SUPABASE_URL ?? 'https://aymuvxysygrwoicsjgxj.supabase.co';
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
}),
"[project]/src/app/opengraph-image.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alt",
    ()=>alt,
    "contentType",
    ()=>contentType,
    "default",
    ()=>Image,
    "dynamic",
    ()=>dynamic,
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$og$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/og.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/brand.ts [app-rsc] (ecmascript)");
;
;
;
const dynamic = 'force-static'; // <--- ADICIONA ESTA LINHA
const alt = 'Danilo Novais | Creative Developer Portfolio';
const size = {
    width: 1200,
    height: 630
};
const contentType = 'image/png';
async function Image() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$og$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ImageResponse"](/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.logoContainer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "80",
                    height: "80",
                    viewBox: "0 0 40 40",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    style: styles.logoSvg,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M9 11.2c0-1.2 1-2.2 2.2-2.2h12.2c6.4 0 11.6 5.2 11.6 11.6S29.8 32.2 23.4 32.2H11.2C10 32.2 9 31.2 9 30V11.2Z",
                            stroke: "white",
                            strokeWidth: "2",
                            strokeOpacity: "0.9"
                        }, void 0, false, {
                            fileName: "[project]/src/app/opengraph-image.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M14 14l12 12M26 14 14 26",
                            stroke: "white",
                            strokeWidth: "1.6",
                            strokeOpacity: "0.55"
                        }, void 0, false, {
                            fileName: "[project]/src/app/opengraph-image.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/opengraph-image.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/opengraph-image.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: styles.title,
                children: "Danilo Novais"
            }, void 0, false, {
                fileName: "[project]/src/app/opengraph-image.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: styles.subtitle,
                children: "Creative Developer & Interactive Designer"
            }, void 0, false, {
                fileName: "[project]/src/app/opengraph-image.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/opengraph-image.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this), {
        ...size
    });
}
const styles = {
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].colors.background,
        fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].assets.fonts.primary
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
    },
    logoSvg: {
        marginRight: 0
    },
    title: {
        fontSize: 64,
        fontWeight: 700,
        background: `linear-gradient(to bottom right, ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].colors.text} 0%, ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].colors.textHighlight} 100%)`,
        backgroundClip: 'text',
        color: 'transparent',
        margin: 0,
        marginBottom: 16,
        letterSpacing: '-0.03em',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 32,
        color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BRAND"].colors.textSecondary,
        margin: 0,
        letterSpacing: '-0.01em',
        textAlign: 'center'
    }
};
}),
"[project]/src/app/opengraph-image--metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/opengraph-image.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript)");
;
;
const imageModule = {
    alt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["alt"],
    contentType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["contentType"],
    dynamic: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dynamic"],
    size: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["size"]
};
async function __TURBOPACK__default__export__(props) {
    const { __metadata_id__: _, ...params } = await props.params;
    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fillMetadataSegment"])("/", params, "opengraph-image");
    function getImageMetadata(imageMetadata, idParam) {
        const data = {
            alt: imageMetadata.alt,
            type: imageMetadata.contentType || 'image/png',
            url: imageUrl + (idParam ? '/' + idParam : '') + "?6704f9777d01f0f2"
        };
        const { size } = imageMetadata;
        if (size) {
            data.width = size.width;
            data.height = size.height;
        }
        return data;
    }
    return [
        getImageMetadata(imageModule, '')
    ];
}
}),
];

//# sourceMappingURL=src_ea7fc475._.js.map
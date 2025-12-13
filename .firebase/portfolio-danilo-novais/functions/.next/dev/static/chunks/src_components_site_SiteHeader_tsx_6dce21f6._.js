(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/site/SiteHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const navItems = [
    {
        label: 'home',
        href: '/#hero',
        ariaLabel: 'Ir para Home'
    },
    {
        label: 'sobre',
        href: '/sobre',
        ariaLabel: 'Ir para página Sobre'
    },
    {
        label: 'portfolio showcase',
        href: '/portfolio',
        ariaLabel: 'Ir para página Portfolio Showcase'
    },
    {
        label: 'contato',
        href: '/#contact',
        ariaLabel: 'Ir para Contato'
    }
];
function SiteHeader() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isCondensed, setIsCondensed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isHome = pathname === '/' || pathname === '';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            const onScroll = {
                "SiteHeader.useEffect.onScroll": ()=>setIsCondensed(window.scrollY > 40)
            }["SiteHeader.useEffect.onScroll"];
            onScroll();
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            return ({
                "SiteHeader.useEffect": ()=>window.removeEventListener('scroll', onScroll)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], []);
    const headerClassName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SiteHeader.useMemo[headerClassName]": ()=>{
            const base = 'fixed top-0 left-0 right-0 z-50 border-b border-black/5 transition-all';
            const padding = isCondensed ? 'py-2 px-4' : 'py-4 px-4';
            const bg = isCondensed ? 'bg-white/95 backdrop-blur' : 'bg-white';
            return `${base} ${padding} ${bg}`;
        }
    }["SiteHeader.useMemo[headerClassName]"], [
        isCondensed
    ]);
    const handleAnchorNav = (href)=>(e)=>{
            // mantém comportamento de âncora suave apenas quando estiver na Home
            if (!isHome) return;
            const hashIndex = href.indexOf('#');
            if (hashIndex === -1) return;
            const id = href.slice(hashIndex + 1);
            const el = document.getElementById(id);
            if (!el) return;
            e.preventDefault();
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].header, {
        className: headerClassName,
        initial: {
            y: -24,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        },
        transition: {
            duration: 0.6,
            ease: 'easeOut'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex max-w-7xl items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    "aria-label": "Voltar para Home",
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg",
                            alt: "Danilo",
                            className: "h-9 w-auto",
                            onError: (e)=>{
                                const img = e.currentTarget;
                                img.style.display = 'none';
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/site/SiteHeader.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: "Danilo Novais"
                        }, void 0, false, {
                            fileName: "[project]/src/components/site/SiteHeader.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hidden text-base font-medium text-gray-700 md:inline",
                            children: "Danilo Novais"
                        }, void 0, false, {
                            fileName: "[project]/src/components/site/SiteHeader.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/site/SiteHeader.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    "aria-label": "Navegação principal",
                    className: "hidden md:block",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "flex items-center space-x-6",
                        children: navItems.map((item)=>{
                            const isActive = item.href === '/#hero' && isHome || item.href === '/sobre' && pathname === '/sobre' || item.href === '/portfolio' && pathname === '/portfolio';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    "aria-label": item.ariaLabel,
                                    onClick: handleAnchorNav(item.href),
                                    className: [
                                        'relative inline-flex items-center text-base font-normal transition-colors',
                                        isActive ? 'text-[#0057FF]' : 'text-gray-700 hover:text-[#0057FF]',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white'
                                    ].join(' '),
                                    "data-event": "header_nav_click",
                                    "data-label": item.label,
                                    "data-destination": item.href,
                                    children: [
                                        item.label,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                            "aria-hidden": "true",
                                            className: "absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#0057FF]",
                                            initial: {
                                                scaleX: isActive ? 1 : 0
                                            },
                                            animate: {
                                                scaleX: isActive ? 1 : 0
                                            },
                                            whileHover: {
                                                scaleX: 1
                                            },
                                            transition: {
                                                duration: 0.25,
                                                ease: 'easeOut'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/site/SiteHeader.tsx",
                                            lineNumber: 110,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/site/SiteHeader.tsx",
                                    lineNumber: 96,
                                    columnNumber: 19
                                }, this)
                            }, item.label, false, {
                                fileName: "[project]/src/components/site/SiteHeader.tsx",
                                lineNumber: 95,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/site/SiteHeader.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/site/SiteHeader.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/site/SiteHeader.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/site/SiteHeader.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(SiteHeader, "jnlsnsH1VcduHuM1hqNju1+pL94=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = SiteHeader;
var _c;
__turbopack_context__.k.register(_c, "SiteHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_site_SiteHeader_tsx_6dce21f6._.js.map
module.exports = [
"[project]/src/config/motion.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GHOST_EASE",
    ()=>GHOST_EASE,
    "GHOST_EASE_HEAVY",
    ()=>GHOST_EASE_HEAVY,
    "GHOST_EASE_SOFT",
    ()=>GHOST_EASE_SOFT,
    "MOTION_TOKENS",
    ()=>MOTION_TOKENS,
    "getMotionProps",
    ()=>getMotionProps,
    "ghostFade",
    ()=>ghostFade,
    "ghostSpringTransition",
    ()=>ghostSpringTransition,
    "ghostTransition",
    ()=>ghostTransition,
    "imageFloat",
    ()=>imageFloat,
    "modalVariants",
    ()=>modalVariants,
    "riseSoft",
    ()=>riseSoft,
    "staggerContainer",
    ()=>staggerContainer,
    "viewportConfig",
    ()=>viewportConfig
]);
const GHOST_EASE = [
    0.22,
    1,
    0.36,
    1
];
const GHOST_EASE_SOFT = [
    0.25,
    1,
    0.5,
    1
];
const GHOST_EASE_HEAVY = [
    0.43,
    0.13,
    0.23,
    0.96
];
const MOTION_TOKENS = {
    // ─────────────────────────────────────────────────────────────────────────
    // DURATIONS
    // ─────────────────────────────────────────────────────────────────────────
    duration: {
        /** Atmospheric, slow reveals - 1.2s */ slow: 1.2,
        /** Standard transitions - 0.8s */ normal: 0.8,
        /** Quick interactions - 0.4s */ fast: 0.4,
        /** Micro-interactions - 0.2s */ instant: 0.2,
        /** Modal/overlay animations - 0.5s */ modal: 0.5
    },
    // ─────────────────────────────────────────────────────────────────────────
    // EASING CURVES
    // ─────────────────────────────────────────────────────────────────────────
    easing: {
        /** Base smooth curve - use for most animations */ base: GHOST_EASE,
        /** Extra soft for atmospheric/ghostly effects */ ghost: GHOST_EASE_SOFT,
        /** Heavier curve for large movements */ heavy: GHOST_EASE_HEAVY,
        /** Linear for opacity-only transitions */ linear: 'linear'
    },
    // ─────────────────────────────────────────────────────────────────────────
    // STAGGER DELAYS
    // ─────────────────────────────────────────────────────────────────────────
    stagger: {
        /** Rapid fire - 0.05s */ tight: 0.05,
        /** Standard stagger - 0.1s */ normal: 0.1,
        /** Ghost-like slow reveal - 0.18s */ relaxed: 0.18,
        /** Very slow, dramatic - 0.25s */ dramatic: 0.25
    },
    // ─────────────────────────────────────────────────────────────────────────
    // VIEWPORT REVEAL SETTINGS
    // ─────────────────────────────────────────────────────────────────────────
    reveal: {
        threshold: 0.1,
        margin: '-50px'
    },
    // ─────────────────────────────────────────────────────────────────────────
    // SPRING PHYSICS (Ghost-style: fluid, not bouncy)
    // ─────────────────────────────────────────────────────────────────────────
    spring: {
        /** Ultra-soft spring for parallax and scroll-linked animations */ ghost: {
            stiffness: 50,
            damping: 20,
            restDelta: 0.001
        },
        /** Slightly more responsive spring */ responsive: {
            stiffness: 100,
            damping: 25,
            restDelta: 0.001
        },
        /** Snappy but not bouncy - for buttons/interactive elements */ snappy: {
            stiffness: 200,
            damping: 30,
            restDelta: 0.001
        }
    },
    // ─────────────────────────────────────────────────────────────────────────
    // Y-OFFSET LIMITS (Ghost Design: max 18px for subtle movements)
    // ─────────────────────────────────────────────────────────────────────────
    offset: {
        /** Minimal shift - 8px */ subtle: 8,
        /** Standard entrance - 18px (max for Ghost) */ standard: 18,
        /** Larger movements for special cases - 30px */ large: 30,
        /** Hero/dramatic entrances - 40px (use sparingly) */ dramatic: 40
    }
};
const ghostFade = {
    hidden: {
        opacity: 0,
        filter: 'blur(10px)'
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: MOTION_TOKENS.duration.normal,
            ease: GHOST_EASE
        }
    }
};
const riseSoft = {
    hidden: {
        opacity: 0,
        y: MOTION_TOKENS.offset.standard,
        filter: 'blur(6px)'
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: MOTION_TOKENS.duration.normal,
            ease: GHOST_EASE
        }
    }
};
const imageFloat = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 0.85,
        y: 0,
        transition: {
            duration: MOTION_TOKENS.duration.slow,
            ease: GHOST_EASE
        }
    }
};
const staggerContainer = (staggerDelay = MOTION_TOKENS.stagger.relaxed)=>({
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.2
            }
        }
    });
const modalVariants = {
    backdrop: {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: MOTION_TOKENS.duration.fast,
                ease: 'easeOut'
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: MOTION_TOKENS.duration.instant
            }
        }
    },
    content: {
        hidden: {
            opacity: 0,
            y: MOTION_TOKENS.offset.large
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: MOTION_TOKENS.duration.modal,
                ease: GHOST_EASE,
                delay: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: MOTION_TOKENS.offset.standard,
            transition: {
                duration: MOTION_TOKENS.duration.fast,
                ease: GHOST_EASE
            }
        }
    }
};
const ghostTransition = (delay = 0, dur = MOTION_TOKENS.duration.normal)=>({
        duration: dur,
        delay,
        ease: GHOST_EASE
    });
const ghostSpringTransition = (springType = 'ghost')=>({
        type: 'spring',
        ...MOTION_TOKENS.spring[springType]
    });
const viewportConfig = {
    once: true,
    margin: MOTION_TOKENS.reveal.margin,
    amount: MOTION_TOKENS.reveal.threshold
};
const getMotionProps = (props, prefersReducedMotion)=>{
    if (prefersReducedMotion) return {};
    return props;
};
}),
"[project]/src/app/template.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Template
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$29$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.29.2_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/motion.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function Template({ children }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Reset scroll to top on path change (Lenis handles smooth, but we make sure)
        window.scrollTo(0, 0);
    }, [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$29$2e$2_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 15
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.95,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GHOST_EASE"]
        },
        className: "w-full flex-col flex grow",
        children: children
    }, pathname, false, {
        fileName: "[project]/src/app/template.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_efc8c73f._.js.map
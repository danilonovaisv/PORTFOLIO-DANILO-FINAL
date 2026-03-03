(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === 'object' ? document.currentScript : undefined,
  '[project]/src/app/error.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => Error]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    function Error({ error, reset }) {
      _s();
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'Error.useEffect': () => {
            const reportarErroWeb = {
              'Error.useEffect.reportarErroWeb': async () => {
                try {
                  await fetch('/api/report-error', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      erroMensagem: error.message,
                      stack: error.stack,
                      digest: error.digest,
                      componente: 'Client Error Boundary',
                      url: window.location.href,
                    }),
                    keepalive: true,
                  });
                } catch (err) {
                  console.warn(
                    'Falha ao enviar erro para /api/report-error:',
                    err
                  );
                }
              },
            }['Error.useEffect.reportarErroWeb'];
            void reportarErroWeb();
          },
        }['Error.useEffect'],
        [error]
      );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          className:
            'flex h-screen w-full flex-col items-center justify-center bg-background text-foreground',
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'h2',
              {
                className: 'mb-4 text-2xl font-bold text-accentRed',
                children: 'Something went wrong!',
              },
              void 0,
              false,
              {
                fileName: '[project]/src/app/error.tsx',
                lineNumber: 39,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'p',
              {
                className: 'mb-8 text-textInverse/60',
                children:
                  'Our specific error reporting system has been notified.',
              },
              void 0,
              false,
              {
                fileName: '[project]/src/app/error.tsx',
                lineNumber: 42,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'button',
              {
                onClick: () => reset(),
                className:
                  'rounded-xl bg-bluePrimary px-6 py-3 font-bold text-white transition-all hover:bg-bluePrimary/90 active:scale-95',
                children: 'Try again',
              },
              void 0,
              false,
              {
                fileName: '[project]/src/app/error.tsx',
                lineNumber: 45,
                columnNumber: 7,
              },
              this
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: '[project]/src/app/error.tsx',
          lineNumber: 38,
          columnNumber: 5,
        },
        this
      );
    }
    _s(Error, 'OD7bBpZva5O2jO+Puf00hKivP7c=');
    _c = Error;
    var _c;
    __turbopack_context__.k.register(_c, 'Error');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
]);

//# sourceMappingURL=src_app_error_tsx_627a0d75._.js.map

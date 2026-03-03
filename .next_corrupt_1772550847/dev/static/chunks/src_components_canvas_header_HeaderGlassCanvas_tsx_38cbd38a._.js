(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === 'object' ? document.currentScript : undefined,
  '[project]/src/components/canvas/header/HeaderGlassCanvas.tsx [app-client] (ecmascript, next/dynamic entry, async loader)',
  (__turbopack_context__) => {
    __turbopack_context__.v((parentImport) => {
      return Promise.all(
        [
          'static/chunks/c1f3c_three_build_three_core_9934bd06.js',
          'static/chunks/c1f3c_three_build_three_module_d85068c8.js',
          'static/chunks/c1f3c_three_build_three_module_0ad1d41c.js',
          'static/chunks/1409f_@react-three_fiber_dist_fb826afd._.js',
          'static/chunks/node_modules__pnpm_7db6d991._.js',
          'static/chunks/src_components_canvas_header_HeaderGlassCanvas_tsx_1620cb10._.js',
          'static/chunks/src_components_canvas_header_HeaderGlassCanvas_tsx_e0b8e31a._.js',
        ].map((chunk) => __turbopack_context__.l(chunk))
      ).then(() => {
        return parentImport(
          '[project]/src/components/canvas/header/HeaderGlassCanvas.tsx [app-client] (ecmascript, next/dynamic entry)'
        );
      });
    });
  },
]);

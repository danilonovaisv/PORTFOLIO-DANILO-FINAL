(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === 'object' ? document.currentScript : undefined,
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-composed-ref.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useComposedRefs', () => useComposedRefs]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    /**
     * Taken from https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
     */ /**
     * Set a given ref to a given value
     * This utility takes care of different types of refs: callback refs and RefObject(s)
     */ function setRef(ref, value) {
      if (typeof ref === 'function') {
        return ref(value);
      } else if (ref !== null && ref !== undefined) {
        ref.current = value;
      }
    }
    /**
     * A utility to compose multiple refs together
     * Accepts callback refs and RefObject(s)
     */ function composeRefs(...refs) {
      return (node) => {
        let hasCleanup = false;
        const cleanups = refs.map((ref) => {
          const cleanup = setRef(ref, node);
          if (!hasCleanup && typeof cleanup === 'function') {
            hasCleanup = true;
          }
          return cleanup;
        });
        // React <19 will log an error to the console if a callback ref returns a
        // value. We don't use ref cleanups internally so this will only happen if a
        // user's ref callback returns a value, which we only expect if they are
        // using the cleanup functionality added in React 19.
        if (hasCleanup) {
          return () => {
            for (let i = 0; i < cleanups.length; i++) {
              const cleanup = cleanups[i];
              if (typeof cleanup === 'function') {
                cleanup();
              } else {
                setRef(refs[i], null);
              }
            }
          };
        }
      };
    }
    /**
     * A custom hook that composes multiple refs
     * Accepts callback refs and RefObject(s)
     */ function useComposedRefs(...refs) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ](composeRefs(...refs), refs);
    }
    //# sourceMappingURL=use-composed-ref.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['PopChild', () => PopChild]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$html$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/utils/is-html-element.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$composed$2d$ref$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-composed-ref.mjs [app-client] (ecmascript)'
      );
    ('use client');
    /**
     * Measurement functionality has to be within a separate component
     * to leverage snapshot lifecycle.
     */ class PopChildMeasure
      extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'Component'
      ]
    {
      getSnapshotBeforeUpdate(prevProps) {
        const element = this.props.childRef.current;
        if (
          element &&
          prevProps.isPresent &&
          !this.props.isPresent &&
          this.props.pop !== false
        ) {
          const parent = element.offsetParent;
          const parentWidth = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$html$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'isHTMLElement'
          ])(parent)
            ? parent.offsetWidth || 0
            : 0;
          const parentHeight = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$html$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'isHTMLElement'
          ])(parent)
            ? parent.offsetHeight || 0
            : 0;
          const size = this.props.sizeRef.current;
          size.height = element.offsetHeight || 0;
          size.width = element.offsetWidth || 0;
          size.top = element.offsetTop;
          size.left = element.offsetLeft;
          size.right = parentWidth - size.width - size.left;
          size.bottom = parentHeight - size.height - size.top;
        }
        return null;
      }
      /**
       * Required with getSnapshotBeforeUpdate to stop React complaining.
       */ componentDidUpdate() {}
      render() {
        return this.props.children;
      }
    }
    function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
      const id = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useId'
      ])();
      const ref = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const size = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      });
      const { nonce } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useContext'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'MotionConfigContext'
        ]
      );
      /**
       * In React 19, refs are passed via props.ref instead of element.ref.
       * We check props.ref first (React 19) and fall back to element.ref (React 18).
       */ const childRef = children.props?.ref ?? children?.ref;
      const composedRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$composed$2d$ref$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useComposedRefs'
      ])(ref, childRef);
      /**
       * We create and inject a style block so we can apply this explicit
       * sizing in a non-destructive manner by just deleting the style block.
       *
       * We can't apply size via render as the measurement happens
       * in getSnapshotBeforeUpdate (post-render), likewise if we apply the
       * styles directly on the DOM node, we might be overwriting
       * styles set via the style prop.
       */ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useInsertionEffect'
      ])(
        {
          'PopChild.useInsertionEffect': () => {
            const { width, height, top, left, right, bottom } = size.current;
            if (isPresent || pop === false || !ref.current || !width || !height)
              return;
            const x = anchorX === 'left' ? `left: ${left}` : `right: ${right}`;
            const y =
              anchorY === 'bottom' ? `bottom: ${bottom}` : `top: ${top}`;
            ref.current.dataset.motionPopId = id;
            const style = document.createElement('style');
            if (nonce) style.nonce = nonce;
            const parent = root ?? document.head;
            parent.appendChild(style);
            if (style.sheet) {
              style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
            }
            return {
              'PopChild.useInsertionEffect': () => {
                if (parent.contains(style)) {
                  parent.removeChild(style);
                }
              },
            }['PopChild.useInsertionEffect'];
          },
        }['PopChild.useInsertionEffect'],
        [isPresent]
      );
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsx'
      ])(PopChildMeasure, {
        isPresent: isPresent,
        childRef: ref,
        sizeRef: size,
        pop: pop,
        children:
          pop === false
            ? children
            : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cloneElement'
              ](children, {
                ref: composedRef,
              }),
      });
    }
    //# sourceMappingURL=PopChild.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['PresenceChild', () => PresenceChild]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$PopChild$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs [app-client] (ecmascript)'
      );
    ('use client');
    const PresenceChild = ({
      children,
      initial,
      isPresent,
      onExitComplete,
      custom,
      presenceAffectsLayout,
      mode,
      anchorX,
      anchorY,
      root,
    }) => {
      const presenceChildren = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useConstant'
      ])(newChildrenMap);
      const id = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useId'
      ])();
      let isReusedContext = true;
      let context = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'PresenceChild.useMemo[context]': () => {
            isReusedContext = false;
            return {
              id,
              initial,
              isPresent,
              custom,
              onExitComplete: {
                'PresenceChild.useMemo[context]': (childId) => {
                  presenceChildren.set(childId, true);
                  for (const isComplete of presenceChildren.values()) {
                    if (!isComplete) return; // can stop searching when any is incomplete
                  }
                  onExitComplete && onExitComplete();
                },
              }['PresenceChild.useMemo[context]'],
              register: {
                'PresenceChild.useMemo[context]': (childId) => {
                  presenceChildren.set(childId, false);
                  return {
                    'PresenceChild.useMemo[context]': () =>
                      presenceChildren.delete(childId),
                  }['PresenceChild.useMemo[context]'];
                },
              }['PresenceChild.useMemo[context]'],
            };
          },
        }['PresenceChild.useMemo[context]'],
        [isPresent, presenceChildren, onExitComplete]
      );
      /**
       * If the presence of a child affects the layout of the components around it,
       * we want to make a new context value to ensure they get re-rendered
       * so they can detect that layout change.
       */ if (presenceAffectsLayout && isReusedContext) {
        context = {
          ...context,
        };
      }
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'PresenceChild.useMemo': () => {
            presenceChildren.forEach(
              {
                'PresenceChild.useMemo': (_, key) =>
                  presenceChildren.set(key, false),
              }['PresenceChild.useMemo']
            );
          },
        }['PresenceChild.useMemo'],
        [isPresent]
      );
      /**
       * If there's no `motion` components to fire exit animations, we want to remove this
       * component immediately.
       */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ](
        {
          'PresenceChild.useEffect': () => {
            !isPresent &&
              !presenceChildren.size &&
              onExitComplete &&
              onExitComplete();
          },
        }['PresenceChild.useEffect'],
        [isPresent]
      );
      children = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsx'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$PopChild$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'PopChild'
        ],
        {
          pop: mode === 'popLayout',
          isPresent: isPresent,
          anchorX: anchorX,
          anchorY: anchorY,
          root: root,
          children: children,
        }
      );
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsx'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'PresenceContext'
        ].Provider,
        {
          value: context,
          children: children,
        }
      );
    };
    function newChildrenMap() {
      return new Map();
    }
    //# sourceMappingURL=PresenceChild.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'getChildKey',
      () => getChildKey,
      'onlyElements',
      () => onlyElements,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    const getChildKey = (child) => child.key || '';
    function onlyElements(children) {
      const filtered = [];
      // We use forEach here instead of map as map mutates the component key by preprending `.$`
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'Children'
      ].forEach(children, (child) => {
        if (
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'isValidElement'
          ])(child)
        )
          filtered.push(child);
      });
      return filtered;
    }
    //# sourceMappingURL=utils.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['AnimatePresence', () => AnimatePresence]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      /*#__PURE__*/ __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$PresenceChild$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$use$2d$presence$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs [app-client] (ecmascript)'
      );
    ('use client');
    /**
     * `AnimatePresence` enables the animation of components that have been removed from the tree.
     *
     * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
     *
     * Any `motion` components that have an `exit` property defined will animate out when removed from
     * the tree.
     *
     * ```jsx
     * import { motion, AnimatePresence } from 'framer-motion'
     *
     * export const Items = ({ items }) => (
     *   <AnimatePresence>
     *     {items.map(item => (
     *       <motion.div
     *         key={item.id}
     *         initial={{ opacity: 0 }}
     *         animate={{ opacity: 1 }}
     *         exit={{ opacity: 0 }}
     *       />
     *     ))}
     *   </AnimatePresence>
     * )
     * ```
     *
     * You can sequence exit animations throughout a tree using variants.
     *
     * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
     * once all `motion` components have finished animating out. Likewise, any components using
     * `usePresence` all need to call `safeToRemove`.
     *
     * @public
     */ const AnimatePresence = ({
      children,
      custom,
      initial = true,
      onExitComplete,
      presenceAffectsLayout = true,
      mode = 'sync',
      propagate = false,
      anchorX = 'left',
      anchorY = 'top',
      root,
    }) => {
      const [isParentPresent, safeToRemove] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$use$2d$presence$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'usePresence'
      ])(propagate);
      /**
       * Filter any children that aren't ReactElements. We can only track components
       * between renders with a props.key.
       */ const presentChildren = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'AnimatePresence.useMemo[presentChildren]': () =>
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'onlyElements'
            ])(children),
        }['AnimatePresence.useMemo[presentChildren]'],
        [children]
      );
      /**
       * Track the keys of the currently rendered children. This is used to
       * determine which children are exiting.
       */ const presentKeys =
        propagate && !isParentPresent
          ? []
          : presentChildren.map(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'getChildKey'
              ]
            );
      /**
       * If `initial={false}` we only want to pass this to components in the first render.
       */ const isInitialRender = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(true);
      /**
       * A ref containing the currently present children. When all exit animations
       * are complete, we use this to re-render the component with the latest children
       * *committed* rather than the latest children *rendered*.
       */ const pendingPresentChildren = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(presentChildren);
      /**
       * Track which exiting children have finished animating out.
       */ const exitComplete = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useConstant'
      ])(
        {
          'AnimatePresence.useConstant[exitComplete]': () => new Map(),
        }['AnimatePresence.useConstant[exitComplete]']
      );
      /**
       * Track which components are currently processing exit to prevent duplicate processing.
       */ const exitingComponents = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(new Set());
      /**
       * Save children to render as React state. To ensure this component is concurrent-safe,
       * we check for exiting children via an effect.
       */ const [diffedChildren, setDiffedChildren] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(presentChildren);
      const [renderedChildren, setRenderedChildren] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(presentChildren);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useIsomorphicLayoutEffect'
      ])(
        {
          'AnimatePresence.useIsomorphicLayoutEffect': () => {
            isInitialRender.current = false;
            pendingPresentChildren.current = presentChildren;
            /**
             * Update complete status of exiting children.
             */ for (let i = 0; i < renderedChildren.length; i++) {
              const key = (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'getChildKey'
              ])(renderedChildren[i]);
              if (!presentKeys.includes(key)) {
                if (exitComplete.get(key) !== true) {
                  exitComplete.set(key, false);
                }
              } else {
                exitComplete.delete(key);
                exitingComponents.current.delete(key);
              }
            }
          },
        }['AnimatePresence.useIsomorphicLayoutEffect'],
        [renderedChildren, presentKeys.length, presentKeys.join('-')]
      );
      const exitingChildren = [];
      if (presentChildren !== diffedChildren) {
        let nextChildren = [...presentChildren];
        /**
         * Loop through all the currently rendered components and decide which
         * are exiting.
         */ for (let i = 0; i < renderedChildren.length; i++) {
          const child = renderedChildren[i];
          const key = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'getChildKey'
          ])(child);
          if (!presentKeys.includes(key)) {
            nextChildren.splice(i, 0, child);
            exitingChildren.push(child);
          }
        }
        /**
         * If we're in "wait" mode, and we have exiting children, we want to
         * only render these until they've all exited.
         */ if (mode === 'wait' && exitingChildren.length) {
          nextChildren = exitingChildren;
        }
        setRenderedChildren(
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'onlyElements'
          ])(nextChildren)
        );
        setDiffedChildren(presentChildren);
        /**
         * Early return to ensure once we've set state with the latest diffed
         * children, we can immediately re-render.
         */ return null;
      }
      if (
        ('TURBOPACK compile-time value', 'development') !== 'production' &&
        mode === 'wait' &&
        renderedChildren.length > 1
      ) {
        console.warn(
          `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`
        );
      }
      /**
       * If we've been provided a forceRender function by the LayoutGroupContext,
       * we can use it to force a re-render amongst all surrounding components once
       * all components have finished animating out.
       */ const { forceRender } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useContext'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'LayoutGroupContext'
        ]
      );
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsx'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'Fragment'
        ],
        {
          children: renderedChildren.map((child) => {
            const key = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'getChildKey'
            ])(child);
            const isPresent =
              propagate && !isParentPresent
                ? false
                : presentChildren === renderedChildren ||
                  presentKeys.includes(key);
            const onExit = () => {
              if (exitingComponents.current.has(key)) {
                return;
              }
              exitingComponents.current.add(key);
              if (exitComplete.has(key)) {
                exitComplete.set(key, true);
              } else {
                return;
              }
              let isEveryExitComplete = true;
              exitComplete.forEach((isExitComplete) => {
                if (!isExitComplete) isEveryExitComplete = false;
              });
              if (isEveryExitComplete) {
                forceRender?.();
                setRenderedChildren(pendingPresentChildren.current);
                propagate && safeToRemove?.();
                onExitComplete && onExitComplete();
              }
            };
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsx'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$PresenceChild$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'PresenceChild'
              ],
              {
                isPresent: isPresent,
                initial:
                  !isInitialRender.current || initial ? undefined : false,
                custom: custom,
                presenceAffectsLayout: presenceAffectsLayout,
                mode: mode,
                root: root,
                onExitComplete: isPresent ? undefined : onExit,
                anchorX: anchorX,
                anchorY: anchorY,
                children: child,
              },
              key
            );
          }),
        }
      );
    };
    //# sourceMappingURL=index.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-unmount-effect.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useUnmountEffect', () => useUnmountEffect]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    ('use client');
    function useUnmountEffect(callback) {
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'useUnmountEffect.useEffect': () =>
            ({
              'useUnmountEffect.useEffect': () => callback(),
            })['useUnmountEffect.useEffect'],
        }['useUnmountEffect.useEffect'],
        []
      );
    }
    //# sourceMappingURL=use-unmount-effect.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useReducedMotion', () => useReducedMotion]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      /*#__PURE__*/ __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs [app-client] (ecmascript) <locals>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/warn-once.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    ('use client');
    /**
     * A hook that returns `true` if we should be using reduced motion based on the current device's Reduced Motion setting.
     *
     * This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing motion-sickness inducing
     * `x`/`y` animations with `opacity`, disabling the autoplay of background videos, or turning off parallax motion.
     *
     * It will actively respond to changes and re-render your components with the latest setting.
     *
     * ```jsx
     * export function Sidebar({ isOpen }) {
     *   const shouldReduceMotion = useReducedMotion()
     *   const closedX = shouldReduceMotion ? 0 : "-100%"
     *
     *   return (
     *     <motion.div animate={{
     *       opacity: isOpen ? 1 : 0,
     *       x: isOpen ? 0 : closedX
     *     }} />
     *   )
     * }
     * ```
     *
     * @return boolean
     *
     * @public
     */ function useReducedMotion() {
      /**
       * Lazy initialisation of prefersReducedMotion
       */ !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'hasReducedMotionListener'
      ].current &&
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
          'initPrefersReducedMotion'
        ])();
      const [shouldReduceMotion] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'prefersReducedMotion'
        ].current
      );
      if (('TURBOPACK compile-time truthy', 1)) {
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'warnOnce'
        ])(
          shouldReduceMotion !== true,
          'You have Reduced Motion enabled on your device. Animations may not appear as expected.',
          'reduced-motion-disabled'
        );
      }
      /**
       * TODO See if people miss automatically updating shouldReduceMotion setting
       */ return shouldReduceMotion;
    }
    //# sourceMappingURL=use-reduced-motion.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion-config.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'useReducedMotionConfig',
      () => useReducedMotionConfig,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)'
      );
    ('use client');
    function useReducedMotionConfig() {
      const reducedMotionPreference = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useReducedMotion'
      ])();
      const { reducedMotion } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useContext'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'MotionConfigContext'
        ]
      );
      if (reducedMotion === 'never') {
        return false;
      } else if (reducedMotion === 'always') {
        return true;
      } else {
        return reducedMotionPreference;
      }
    }
    //# sourceMappingURL=use-reduced-motion-config.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['isDOMKeyframes', () => isDOMKeyframes]);
    function isDOMKeyframes(keyframes) {
      return typeof keyframes === 'object' && !Array.isArray(keyframes);
    }
    //# sourceMappingURL=is-dom-keyframes.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['resolveSubjects', () => resolveSubjects]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$resolve$2d$elements$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/utils/resolve-elements.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$dom$2d$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs [app-client] (ecmascript)'
      );
    function resolveSubjects(subject, keyframes, scope, selectorCache) {
      if (subject == null) {
        return [];
      }
      if (
        typeof subject === 'string' &&
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$dom$2d$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'isDOMKeyframes'
        ])(keyframes)
      ) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$resolve$2d$elements$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'resolveElements'
        ])(subject, scope, selectorCache);
      } else if (subject instanceof NodeList) {
        return Array.from(subject);
      } else if (Array.isArray(subject)) {
        return subject.filter((s) => s != null);
      } else {
        return [subject];
      }
    }
    //# sourceMappingURL=resolve-subjects.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'calculateRepeatDuration',
      () => calculateRepeatDuration,
    ]);
    function calculateRepeatDuration(duration, repeat, _repeatDelay) {
      return duration * (repeat + 1);
    }
    //# sourceMappingURL=calc-repeat-duration.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['calcNextTime', () => calcNextTime]);
    /**
     * Given a absolute or relative time definition and current/prev time state of the sequence,
     * calculate an absolute time for the next keyframes.
     */ function calcNextTime(current, next, prev, labels) {
      if (typeof next === 'number') {
        return next;
      } else if (next.startsWith('-') || next.startsWith('+')) {
        return Math.max(0, current + parseFloat(next));
      } else if (next === '<') {
        return prev;
      } else if (next.startsWith('<')) {
        return Math.max(0, prev + parseFloat(next.slice(1)));
      } else {
        return labels.get(next) ?? current;
      }
    }
    //# sourceMappingURL=calc-time.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'addKeyframes',
      () => addKeyframes,
      'eraseKeyframes',
      () => eraseKeyframes,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/utils/mix/number.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$get$2d$easing$2d$for$2d$segment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/array.mjs [app-client] (ecmascript)'
      );
    function eraseKeyframes(sequence, startTime, endTime) {
      for (let i = 0; i < sequence.length; i++) {
        const keyframe = sequence[i];
        if (keyframe.at > startTime && keyframe.at < endTime) {
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'removeItem'
          ])(sequence, keyframe);
          // If we remove this item we have to push the pointer back one
          i--;
        }
      }
    }
    function addKeyframes(
      sequence,
      keyframes,
      easing,
      offset,
      startTime,
      endTime
    ) {
      /**
       * Erase every existing value between currentTime and targetTime,
       * this will essentially splice this timeline into any currently
       * defined ones.
       */ eraseKeyframes(sequence, startTime, endTime);
      for (let i = 0; i < keyframes.length; i++) {
        sequence.push({
          value: keyframes[i],
          at: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'mixNumber'
          ])(startTime, endTime, offset[i]),
          easing: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$get$2d$easing$2d$for$2d$segment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'getEasingForSegment'
          ])(easing, i),
        });
      }
    }
    //# sourceMappingURL=edit.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['normalizeTimes', () => normalizeTimes]);
    /**
     * Take an array of times that represent repeated keyframes. For instance
     * if we have original times of [0, 0.5, 1] then our repeated times will
     * be [0, 0.5, 1, 1, 1.5, 2]. Loop over the times and scale them back
     * down to a 0-1 scale.
     */ function normalizeTimes(times, repeat) {
      for (let i = 0; i < times.length; i++) {
        times[i] = times[i] / (repeat + 1);
      }
    }
    //# sourceMappingURL=normalize-times.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['compareByTime', () => compareByTime]);
    function compareByTime(a, b) {
      if (a.at === b.at) {
        if (a.value === null) return 1;
        if (b.value === null) return -1;
        return 0;
      } else {
        return a.at - b.at;
      }
    }
    //# sourceMappingURL=sort.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/create.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'createAnimationsFromSequence',
      () => createAnimationsFromSequence,
      'getValueTransition',
      () => getValueTransition,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$default$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$create$2d$generator$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$fill$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/progress.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$get$2d$easing$2d$for$2d$segment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$resolve$2d$subjects$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$utils$2f$calc$2d$repeat$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$utils$2f$calc$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$utils$2f$edit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$utils$2f$normalize$2d$times$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$utils$2f$sort$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs [app-client] (ecmascript)'
      );
    const defaultSegmentEasing = 'easeInOut';
    const MAX_REPEAT = 20;
    function createAnimationsFromSequence(
      sequence,
      { defaultTransition = {}, ...sequenceTransition } = {},
      scope,
      generators
    ) {
      const defaultDuration = defaultTransition.duration || 0.3;
      const animationDefinitions = new Map();
      const sequences = new Map();
      const elementCache = {};
      const timeLabels = new Map();
      let prevTime = 0;
      let currentTime = 0;
      let totalDuration = 0;
      /**
       * Build the timeline by mapping over the sequence array and converting
       * the definitions into keyframes and offsets with absolute time values.
       * These will later get converted into relative offsets in a second pass.
       */ for (let i = 0; i < sequence.length; i++) {
        const segment = sequence[i];
        /**
         * If this is a timeline label, mark it and skip the rest of this iteration.
         */ if (typeof segment === 'string') {
          timeLabels.set(segment, currentTime);
          continue;
        } else if (!Array.isArray(segment)) {
          timeLabels.set(
            segment.name,
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$utils$2f$calc$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'calcNextTime'
            ])(currentTime, segment.at, prevTime, timeLabels)
          );
          continue;
        }
        let [subject, keyframes, transition = {}] = segment;
        /**
         * If a relative or absolute time value has been specified we need to resolve
         * it in relation to the currentTime.
         */ if (transition.at !== undefined) {
          currentTime = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$utils$2f$calc$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'calcNextTime'
          ])(currentTime, transition.at, prevTime, timeLabels);
        }
        /**
         * Keep track of the maximum duration in this definition. This will be
         * applied to currentTime once the definition has been parsed.
         */ let maxDuration = 0;
        const resolveValueSequence = (
          valueKeyframes,
          valueTransition,
          valueSequence,
          elementIndex = 0,
          numSubjects = 0
        ) => {
          const valueKeyframesAsList = keyframesAsList(valueKeyframes);
          const {
            delay = 0,
            times = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$default$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'defaultOffset'
            ])(valueKeyframesAsList),
            type = defaultTransition.type || 'keyframes',
            repeat,
            repeatType,
            repeatDelay = 0,
            ...remainingTransition
          } = valueTransition;
          let { ease = defaultTransition.ease || 'easeOut', duration } =
            valueTransition;
          /**
           * Resolve stagger() if defined.
           */ const calculatedDelay =
            typeof delay === 'function'
              ? delay(elementIndex, numSubjects)
              : delay;
          /**
           * If this animation should and can use a spring, generate a spring easing function.
           */ const numKeyframes = valueKeyframesAsList.length;
          const createGenerator = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'isGenerator'
          ])(type)
            ? type
            : generators?.[type || 'keyframes'];
          if (numKeyframes <= 2 && createGenerator) {
            /**
             * As we're creating an easing function from a spring,
             * ideally we want to generate it using the real distance
             * between the two keyframes. However this isn't always
             * possible - in these situations we use 0-100.
             */ let absoluteDelta = 100;
            if (
              numKeyframes === 2 &&
              isNumberKeyframesArray(valueKeyframesAsList)
            ) {
              const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
              absoluteDelta = Math.abs(delta);
            }
            const springTransition = {
              ...defaultTransition,
              ...remainingTransition,
            };
            if (duration !== undefined) {
              springTransition.duration = (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'secondsToMilliseconds'
              ])(duration);
            }
            const springEasing = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$create$2d$generator$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'createGeneratorEasing'
            ])(springTransition, absoluteDelta, createGenerator);
            ease = springEasing.ease;
            duration = springEasing.duration;
          }
          duration ?? (duration = defaultDuration);
          const startTime = currentTime + calculatedDelay;
          /**
           * If there's only one time offset of 0, fill in a second with length 1
           */ if (times.length === 1 && times[0] === 0) {
            times[1] = 1;
          }
          /**
           * Fill out if offset if fewer offsets than keyframes
           */ const remainder = times.length - valueKeyframesAsList.length;
          remainder > 0 &&
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$fill$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'fillOffset'
            ])(times, remainder);
          /**
           * If only one value has been set, ie [1], push a null to the start of
           * the keyframe array. This will let us mark a keyframe at this point
           * that will later be hydrated with the previous value.
           */ valueKeyframesAsList.length === 1 &&
            valueKeyframesAsList.unshift(null);
          /**
           * Handle repeat options
           */ if (repeat) {
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'invariant'
            ])(
              repeat < MAX_REPEAT,
              'Repeat count too high, must be less than 20',
              'repeat-count-high'
            );
            duration = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$utils$2f$calc$2d$repeat$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'calculateRepeatDuration'
            ])(duration, repeat);
            const originalKeyframes = [...valueKeyframesAsList];
            const originalTimes = [...times];
            ease = Array.isArray(ease) ? [...ease] : [ease];
            const originalEase = [...ease];
            for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
              valueKeyframesAsList.push(...originalKeyframes);
              for (
                let keyframeIndex = 0;
                keyframeIndex < originalKeyframes.length;
                keyframeIndex++
              ) {
                times.push(originalTimes[keyframeIndex] + (repeatIndex + 1));
                ease.push(
                  keyframeIndex === 0
                    ? 'linear'
                    : (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$get$2d$easing$2d$for$2d$segment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'getEasingForSegment'
                      ])(originalEase, keyframeIndex - 1)
                );
              }
            }
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$utils$2f$normalize$2d$times$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'normalizeTimes'
            ])(times, repeat);
          }
          const targetTime = startTime + duration;
          /**
           * Add keyframes, mapping offsets to absolute time.
           */ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$utils$2f$edit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'addKeyframes'
          ])(
            valueSequence,
            valueKeyframesAsList,
            ease,
            times,
            startTime,
            targetTime
          );
          maxDuration = Math.max(calculatedDelay + duration, maxDuration);
          totalDuration = Math.max(targetTime, totalDuration);
        };
        if (
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'isMotionValue'
          ])(subject)
        ) {
          const subjectSequence = getSubjectSequence(subject, sequences);
          resolveValueSequence(
            keyframes,
            transition,
            getValueSequence('default', subjectSequence)
          );
        } else {
          const subjects = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$resolve$2d$subjects$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'resolveSubjects'
          ])(subject, keyframes, scope, elementCache);
          const numSubjects = subjects.length;
          /**
           * For every element in this segment, process the defined values.
           */ for (
            let subjectIndex = 0;
            subjectIndex < numSubjects;
            subjectIndex++
          ) {
            /**
             * Cast necessary, but we know these are of this type
             */ keyframes = keyframes;
            transition = transition;
            const thisSubject = subjects[subjectIndex];
            const subjectSequence = getSubjectSequence(thisSubject, sequences);
            for (const key in keyframes) {
              resolveValueSequence(
                keyframes[key],
                getValueTransition(transition, key),
                getValueSequence(key, subjectSequence),
                subjectIndex,
                numSubjects
              );
            }
          }
        }
        prevTime = currentTime;
        currentTime += maxDuration;
      }
      /**
       * For every element and value combination create a new animation.
       */ sequences.forEach((valueSequences, element) => {
        for (const key in valueSequences) {
          const valueSequence = valueSequences[key];
          /**
           * Arrange all the keyframes in ascending time order.
           */ valueSequence.sort(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$utils$2f$sort$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'compareByTime'
            ]
          );
          const keyframes = [];
          const valueOffset = [];
          const valueEasing = [];
          /**
           * For each keyframe, translate absolute times into
           * relative offsets based on the total duration of the timeline.
           */ for (let i = 0; i < valueSequence.length; i++) {
            const { at, value, easing } = valueSequence[i];
            keyframes.push(value);
            valueOffset.push(
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'progress'
              ])(0, totalDuration, at)
            );
            valueEasing.push(easing || 'easeOut');
          }
          /**
           * If the first keyframe doesn't land on offset: 0
           * provide one by duplicating the initial keyframe. This ensures
           * it snaps to the first keyframe when the animation starts.
           */ if (valueOffset[0] !== 0) {
            valueOffset.unshift(0);
            keyframes.unshift(keyframes[0]);
            valueEasing.unshift(defaultSegmentEasing);
          }
          /**
           * If the last keyframe doesn't land on offset: 1
           * provide one with a null wildcard value. This will ensure it
           * stays static until the end of the animation.
           */ if (valueOffset[valueOffset.length - 1] !== 1) {
            valueOffset.push(1);
            keyframes.push(null);
          }
          if (!animationDefinitions.has(element)) {
            animationDefinitions.set(element, {
              keyframes: {},
              transition: {},
            });
          }
          const definition = animationDefinitions.get(element);
          definition.keyframes[key] = keyframes;
          /**
           * Exclude `type` from defaultTransition since springs have been
           * converted to duration-based easing functions in resolveValueSequence.
           * Including `type: "spring"` would cause JSAnimation to error when
           * the merged keyframes array has more than 2 keyframes.
           */ const { type: _type, ...remainingDefaultTransition } =
            defaultTransition;
          definition.transition[key] = {
            ...remainingDefaultTransition,
            duration: totalDuration,
            ease: valueEasing,
            times: valueOffset,
            ...sequenceTransition,
          };
        }
      });
      return animationDefinitions;
    }
    function getSubjectSequence(subject, sequences) {
      !sequences.has(subject) && sequences.set(subject, {});
      return sequences.get(subject);
    }
    function getValueSequence(name, sequences) {
      if (!sequences[name]) sequences[name] = [];
      return sequences[name];
    }
    function keyframesAsList(keyframes) {
      return Array.isArray(keyframes) ? keyframes : [keyframes];
    }
    function getValueTransition(transition, key) {
      return transition && transition[key]
        ? {
            ...transition,
            ...transition[key],
          }
        : {
            ...transition,
          };
    }
    const isNumber = (keyframe) => typeof keyframe === 'number';
    const isNumberKeyframesArray = (keyframes) => keyframes.every(isNumber);
    //# sourceMappingURL=create.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'createDOMVisualElement',
      () => createDOMVisualElement,
      'createObjectVisualElement',
      () => createObjectVisualElement,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$svg$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/utils/is-svg-element.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$svg$2d$svg$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$SVGVisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$HTMLVisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/render/store.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$object$2f$ObjectVisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs [app-client] (ecmascript)'
      );
    function createDOMVisualElement(element) {
      const options = {
        presenceContext: null,
        props: {},
        visualState: {
          renderState: {
            transform: {},
            transformOrigin: {},
            style: {},
            vars: {},
            attrs: {},
          },
          latestValues: {},
        },
      };
      const node =
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$svg$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'isSVGElement'
        ])(element) &&
        !(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$svg$2d$svg$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'isSVGSVGElement'
        ])(element)
          ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$SVGVisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'SVGVisualElement'
            ](options)
          : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$HTMLVisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'HTMLVisualElement'
            ](options);
      node.mount(element);
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'visualElementStore'
      ].set(element, node);
    }
    function createObjectVisualElement(subject) {
      const options = {
        presenceContext: null,
        props: {},
        visualState: {
          renderState: {
            output: {},
          },
          latestValues: {},
        },
      };
      const node =
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$object$2f$ObjectVisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'ObjectVisualElement'
        ](options);
      node.mount(subject);
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'visualElementStore'
      ].set(subject, node);
    }
    //# sourceMappingURL=create-visual-element.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/animate/subject.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['animateSubject', () => animateSubject]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$animate$2f$single$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/animation/animate/single-value.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/render/store.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$interfaces$2f$visual$2d$element$2d$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$create$2d$visual$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$dom$2d$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$resolve$2d$subjects$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs [app-client] (ecmascript)'
      );
    function isSingleValue(subject, keyframes) {
      return (
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'isMotionValue'
        ])(subject) ||
        typeof subject === 'number' ||
        (typeof subject === 'string' &&
          !(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$dom$2d$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'isDOMKeyframes'
          ])(keyframes))
      );
    }
    /**
     * Implementation
     */ function animateSubject(subject, keyframes, options, scope) {
      const animations = [];
      if (isSingleValue(subject, keyframes)) {
        animations.push(
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$animate$2f$single$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'animateSingleValue'
          ])(
            subject,
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$dom$2d$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'isDOMKeyframes'
            ])(keyframes)
              ? keyframes.default || keyframes
              : keyframes,
            options ? options.default || options : options
          )
        );
      } else {
        // Gracefully handle null/undefined subjects (e.g., from querySelector returning null)
        if (subject == null) {
          return animations;
        }
        const subjects = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$resolve$2d$subjects$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'resolveSubjects'
        ])(subject, keyframes, scope);
        const numSubjects = subjects.length;
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'invariant'
        ])(
          Boolean(numSubjects),
          'No valid elements provided.',
          'no-valid-elements'
        );
        for (let i = 0; i < numSubjects; i++) {
          const thisSubject = subjects[i];
          const createVisualElement =
            thisSubject instanceof Element
              ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$create$2d$visual$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'createDOMVisualElement'
                ]
              : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$create$2d$visual$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'createObjectVisualElement'
                ];
          if (
            !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'visualElementStore'
            ].has(thisSubject)
          ) {
            createVisualElement(thisSubject);
          }
          const visualElement =
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'visualElementStore'
            ].get(thisSubject);
          const transition = {
            ...options,
          };
          /**
           * Resolve stagger function if provided.
           */ if (
            'delay' in transition &&
            typeof transition.delay === 'function'
          ) {
            transition.delay = transition.delay(i, numSubjects);
          }
          animations.push(
            ...(0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$interfaces$2f$visual$2d$element$2d$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'animateTarget'
            ])(
              visualElement,
              {
                ...keyframes,
                transition,
              },
              {}
            )
          );
        }
      }
      return animations;
    }
    //# sourceMappingURL=subject.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/animate/sequence.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['animateSequence', () => animateSequence]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/animation/generators/spring/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$create$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/sequence/create.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$subject$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/animate/subject.mjs [app-client] (ecmascript)'
      );
    function animateSequence(sequence, options, scope) {
      const animations = [];
      /**
       * Pre-process: replace function segments with MotionValue segments,
       * subscribe callbacks immediately
       */ const processedSequence = sequence.map((segment) => {
        if (Array.isArray(segment) && typeof segment[0] === 'function') {
          const callback = segment[0];
          const mv = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'motionValue'
          ])(0);
          mv.on('change', callback);
          if (segment.length === 1) {
            return [mv, [0, 1]];
          } else if (segment.length === 2) {
            return [mv, [0, 1], segment[1]];
          } else {
            return [mv, segment[1], segment[2]];
          }
        }
        return segment;
      });
      const animationDefinitions = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$sequence$2f$create$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'createAnimationsFromSequence'
      ])(processedSequence, options, scope, {
        spring:
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'spring'
          ],
      });
      animationDefinitions.forEach(({ keyframes, transition }, subject) => {
        animations.push(
          ...(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$subject$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'animateSubject'
          ])(subject, keyframes, transition)
        );
      });
      return animations;
    }
    //# sourceMappingURL=sequence.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'animate',
      () => animate,
      'createScopedAnimate',
      () => createScopedAnimate,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$GroupAnimationWithThen$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/array.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$sequence$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/animate/sequence.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$subject$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/animate/subject.mjs [app-client] (ecmascript)'
      );
    function isSequence(value) {
      return Array.isArray(value) && value.some(Array.isArray);
    }
    /**
     * Creates an animation function that is optionally scoped
     * to a specific element.
     */ function createScopedAnimate(options = {}) {
      const { scope, reduceMotion } = options;
      /**
       * Implementation
       */ function scopedAnimate(
        subjectOrSequence,
        optionsOrKeyframes,
        options
      ) {
        let animations = [];
        let animationOnComplete;
        if (isSequence(subjectOrSequence)) {
          const { onComplete, ...sequenceOptions } = optionsOrKeyframes || {};
          if (typeof onComplete === 'function') {
            animationOnComplete = onComplete;
          }
          animations = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$sequence$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'animateSequence'
          ])(
            subjectOrSequence,
            reduceMotion !== undefined
              ? {
                  reduceMotion,
                  ...sequenceOptions,
                }
              : sequenceOptions,
            scope
          );
        } else {
          // Extract top-level onComplete so it doesn't get applied per-value
          const { onComplete, ...rest } = options || {};
          if (typeof onComplete === 'function') {
            animationOnComplete = onComplete;
          }
          animations = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$subject$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'animateSubject'
          ])(
            subjectOrSequence,
            optionsOrKeyframes,
            reduceMotion !== undefined
              ? {
                  reduceMotion,
                  ...rest,
                }
              : rest,
            scope
          );
        }
        const animation =
          new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$GroupAnimationWithThen$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'GroupAnimationWithThen'
          ](animations);
        if (animationOnComplete) {
          animation.finished.then(animationOnComplete);
        }
        if (scope) {
          scope.animations.push(animation);
          animation.finished.then(() => {
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'removeItem'
            ])(scope.animations, animation);
          });
        }
        return animation;
      }
      return scopedAnimate;
    }
    const animate = createScopedAnimate();
    //# sourceMappingURL=index.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/hooks/use-animate.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useAnimate', () => useAnimate]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$unmount$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-unmount-effect.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion-config.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-client] (ecmascript)'
      );
    ('use client');
    function useAnimate() {
      const scope = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useConstant'
      ])(
        {
          'useAnimate.useConstant[scope]': () => ({
            current: null,
            animations: [],
          }),
        }['useAnimate.useConstant[scope]']
      );
      const reduceMotion =
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useReducedMotionConfig'
        ])() ?? undefined;
      const animate = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'useAnimate.useMemo[animate]': () =>
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'createScopedAnimate'
            ])({
              scope,
              reduceMotion,
            }),
        }['useAnimate.useMemo[animate]'],
        [scope, reduceMotion]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$unmount$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useUnmountEffect'
      ])(
        {
          'useAnimate.useUnmountEffect': () => {
            scope.animations.forEach(
              {
                'useAnimate.useUnmountEffect': (animation) => animation.stop(),
              }['useAnimate.useUnmountEffect']
            );
            scope.animations.length = 0;
          },
        }['useAnimate.useUnmountEffect']
      );
      return [scope, animate];
    }
    //# sourceMappingURL=use-animate.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/info.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'createScrollInfo',
      () => createScrollInfo,
      'updateScrollInfo',
      () => updateScrollInfo,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/progress.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/velocity-per-second.mjs [app-client] (ecmascript)'
      );
    /**
     * A time in milliseconds, beyond which we consider the scroll velocity to be 0.
     */ const maxElapsed = 50;
    const createAxisInfo = () => ({
      current: 0,
      offset: [],
      progress: 0,
      scrollLength: 0,
      targetOffset: 0,
      targetLength: 0,
      containerLength: 0,
      velocity: 0,
    });
    const createScrollInfo = () => ({
      time: 0,
      x: createAxisInfo(),
      y: createAxisInfo(),
    });
    const keys = {
      x: {
        length: 'Width',
        position: 'Left',
      },
      y: {
        length: 'Height',
        position: 'Top',
      },
    };
    function updateAxisInfo(element, axisName, info, time) {
      const axis = info[axisName];
      const { length, position } = keys[axisName];
      const prev = axis.current;
      const prevTime = info.time;
      axis.current = element[`scroll${position}`];
      axis.scrollLength =
        element[`scroll${length}`] - element[`client${length}`];
      axis.offset.length = 0;
      axis.offset[0] = 0;
      axis.offset[1] = axis.scrollLength;
      axis.progress = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'progress'
      ])(0, axis.scrollLength, axis.current);
      const elapsed = time - prevTime;
      axis.velocity =
        elapsed > maxElapsed
          ? 0
          : (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'velocityPerSecond'
            ])(axis.current - prev, elapsed);
    }
    function updateScrollInfo(element, info, time) {
      updateAxisInfo(element, 'x', info, time);
      updateAxisInfo(element, 'y', info, time);
      info.time = time;
    }
    //# sourceMappingURL=info.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/inset.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['calcInset', () => calcInset]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$html$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/utils/is-html-element.mjs [app-client] (ecmascript)'
      );
    function calcInset(element, container) {
      const inset = {
        x: 0,
        y: 0,
      };
      let current = element;
      while (current && current !== container) {
        if (
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$html$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'isHTMLElement'
          ])(current)
        ) {
          inset.x += current.offsetLeft;
          inset.y += current.offsetTop;
          current = current.offsetParent;
        } else if (current.tagName === 'svg') {
          /**
           * This isn't an ideal approach to measuring the offset of <svg /> tags.
           * It would be preferable, given they behave like HTMLElements in most ways
           * to use offsetLeft/Top. But these don't exist on <svg />. Likewise we
           * can't use .getBBox() like most SVG elements as these provide the offset
           * relative to the SVG itself, which for <svg /> is usually 0x0.
           */ const svgBoundingBox = current.getBoundingClientRect();
          current = current.parentElement;
          const parentBoundingBox = current.getBoundingClientRect();
          inset.x += svgBoundingBox.left - parentBoundingBox.left;
          inset.y += svgBoundingBox.top - parentBoundingBox.top;
        } else if (current instanceof SVGGraphicsElement) {
          const { x, y } = current.getBBox();
          inset.x += x;
          inset.y += y;
          let svg = null;
          let parent = current.parentNode;
          while (!svg) {
            if (parent.tagName === 'svg') {
              svg = parent;
            }
            parent = current.parentNode;
          }
          current = svg;
        } else {
          break;
        }
      }
      return inset;
    }
    //# sourceMappingURL=inset.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/edge.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'namedEdges',
      () => namedEdges,
      'resolveEdge',
      () => resolveEdge,
    ]);
    const namedEdges = {
      start: 0,
      center: 0.5,
      end: 1,
    };
    function resolveEdge(edge, length, inset = 0) {
      let delta = 0;
      /**
       * If we have this edge defined as a preset, replace the definition
       * with the numerical value.
       */ if (edge in namedEdges) {
        edge = namedEdges[edge];
      }
      /**
       * Handle unit values
       */ if (typeof edge === 'string') {
        const asNumber = parseFloat(edge);
        if (edge.endsWith('px')) {
          delta = asNumber;
        } else if (edge.endsWith('%')) {
          edge = asNumber / 100;
        } else if (edge.endsWith('vw')) {
          delta = (asNumber / 100) * document.documentElement.clientWidth;
        } else if (edge.endsWith('vh')) {
          delta = (asNumber / 100) * document.documentElement.clientHeight;
        } else {
          edge = asNumber;
        }
      }
      /**
       * If the edge is defined as a number, handle as a progress value.
       */ if (typeof edge === 'number') {
        delta = length * edge;
      }
      return inset + delta;
    }
    //# sourceMappingURL=edge.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/offset.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['resolveOffset', () => resolveOffset]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$edge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/edge.mjs [app-client] (ecmascript)'
      );
    const defaultOffset = [0, 0];
    function resolveOffset(offset, containerLength, targetLength, targetInset) {
      let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
      let targetPoint = 0;
      let containerPoint = 0;
      if (typeof offset === 'number') {
        /**
         * If we're provided offset: [0, 0.5, 1] then each number x should become
         * [x, x], so we default to the behaviour of mapping 0 => 0 of both target
         * and container etc.
         */ offsetDefinition = [offset, offset];
      } else if (typeof offset === 'string') {
        offset = offset.trim();
        if (offset.includes(' ')) {
          offsetDefinition = offset.split(' ');
        } else {
          /**
           * If we're provided a definition like "100px" then we want to apply
           * that only to the top of the target point, leaving the container at 0.
           * Whereas a named offset like "end" should be applied to both.
           */ offsetDefinition = [
            offset,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$edge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'namedEdges'
            ][offset]
              ? offset
              : `0`,
          ];
        }
      }
      targetPoint = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$edge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'resolveEdge'
      ])(offsetDefinition[0], targetLength, targetInset);
      containerPoint = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$edge$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'resolveEdge'
      ])(offsetDefinition[1], containerLength);
      return targetPoint - containerPoint;
    }
    //# sourceMappingURL=offset.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/presets.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['ScrollOffset', () => ScrollOffset]);
    const ScrollOffset = {
      All: [
        [0, 0],
        [1, 1],
      ],
    };
    //# sourceMappingURL=presets.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/index.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['resolveOffsets', () => resolveOffsets]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$interpolate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/utils/interpolate.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$default$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$inset$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/inset.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$offset$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/offset.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$presets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/presets.mjs [app-client] (ecmascript)'
      );
    const point = {
      x: 0,
      y: 0,
    };
    function getTargetSize(target) {
      return 'getBBox' in target && target.tagName !== 'svg'
        ? target.getBBox()
        : {
            width: target.clientWidth,
            height: target.clientHeight,
          };
    }
    function resolveOffsets(container, info, options) {
      const {
        offset:
          offsetDefinition = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$presets$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'ScrollOffset'
          ].All,
      } = options;
      const { target = container, axis = 'y' } = options;
      const lengthLabel = axis === 'y' ? 'height' : 'width';
      const inset =
        target !== container
          ? (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$inset$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'calcInset'
            ])(target, container)
          : point;
      /**
       * Measure the target and container. If they're the same thing then we
       * use the container's scrollWidth/Height as the target, from there
       * all other calculations can remain the same.
       */ const targetSize =
        target === container
          ? {
              width: container.scrollWidth,
              height: container.scrollHeight,
            }
          : getTargetSize(target);
      const containerSize = {
        width: container.clientWidth,
        height: container.clientHeight,
      };
      /**
       * Reset the length of the resolved offset array rather than creating a new one.
       * TODO: More reusable data structures for targetSize/containerSize would also be good.
       */ info[axis].offset.length = 0;
      /**
       * Populate the offset array by resolving the user's offset definition into
       * a list of pixel scroll offets.
       */ let hasChanged = !info[axis].interpolate;
      const numOffsets = offsetDefinition.length;
      for (let i = 0; i < numOffsets; i++) {
        const offset = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$offset$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'resolveOffset'
        ])(
          offsetDefinition[i],
          containerSize[lengthLabel],
          targetSize[lengthLabel],
          inset[axis]
        );
        if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
          hasChanged = true;
        }
        info[axis].offset[i] = offset;
      }
      /**
       * If the pixel scroll offsets have changed, create a new interpolator function
       * to map scroll value into a progress.
       */ if (hasChanged) {
        info[axis].interpolate = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$interpolate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'interpolate'
        ])(
          info[axis].offset,
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$default$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'defaultOffset'
          ])(offsetDefinition),
          {
            clamp: false,
          }
        );
        info[axis].interpolatorOffsets = [...info[axis].offset];
      }
      info[axis].progress = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'clamp'
      ])(0, 1, info[axis].interpolate(info[axis].current));
    }
    //# sourceMappingURL=index.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/on-scroll-handler.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'createOnScrollHandler',
      () => createOnScrollHandler,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      /*#__PURE__*/ __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/warn-once.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/info.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/offsets/index.mjs [app-client] (ecmascript)'
      );
    function measure(container, target = container, info) {
      /**
       * Find inset of target within scrollable container
       */ info.x.targetOffset = 0;
      info.y.targetOffset = 0;
      if (target !== container) {
        let node = target;
        while (node && node !== container) {
          info.x.targetOffset += node.offsetLeft;
          info.y.targetOffset += node.offsetTop;
          node = node.offsetParent;
        }
      }
      info.x.targetLength =
        target === container ? target.scrollWidth : target.clientWidth;
      info.y.targetLength =
        target === container ? target.scrollHeight : target.clientHeight;
      info.x.containerLength = container.clientWidth;
      info.y.containerLength = container.clientHeight;
      /**
       * In development mode ensure scroll containers aren't position: static as this makes
       * it difficult to measure their relative positions.
       */ if (('TURBOPACK compile-time truthy', 1)) {
        if (container && target && target !== container) {
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'warnOnce'
          ])(
            getComputedStyle(container).position !== 'static',
            "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly."
          );
        }
      }
    }
    function createOnScrollHandler(element, onScroll, info, options = {}) {
      return {
        measure: (time) => {
          measure(element, options.target, info);
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'updateScrollInfo'
          ])(element, info, time);
          if (options.offset || options.target) {
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$offsets$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'resolveOffsets'
            ])(element, info, options);
          }
        },
        notify: () => onScroll(info),
      };
    }
    //# sourceMappingURL=on-scroll-handler.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/track.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['scrollInfo', () => scrollInfo]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$resize$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/resize/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/info.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$on$2d$scroll$2d$handler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/on-scroll-handler.mjs [app-client] (ecmascript)'
      );
    const scrollListeners = new WeakMap();
    const resizeListeners = new WeakMap();
    const onScrollHandlers = new WeakMap();
    const scrollSize = new WeakMap();
    const dimensionCheckProcesses = new WeakMap();
    const getEventTarget = (element) =>
      element === document.scrollingElement ? window : element;
    function scrollInfo(
      onScroll,
      {
        container = document.scrollingElement,
        trackContentSize = false,
        ...options
      } = {}
    ) {
      if (!container)
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'noop'
        ];
      let containerHandlers = onScrollHandlers.get(container);
      /**
       * Get the onScroll handlers for this container.
       * If one isn't found, create a new one.
       */ if (!containerHandlers) {
        containerHandlers = new Set();
        onScrollHandlers.set(container, containerHandlers);
      }
      /**
       * Create a new onScroll handler for the provided callback.
       */ const info = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'createScrollInfo'
      ])();
      const containerHandler = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$on$2d$scroll$2d$handler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'createOnScrollHandler'
      ])(container, onScroll, info, options);
      containerHandlers.add(containerHandler);
      /**
       * Check if there's a scroll event listener for this container.
       * If not, create one.
       */ if (!scrollListeners.has(container)) {
        const measureAll = () => {
          for (const handler of containerHandlers) {
            handler.measure(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'frameData'
              ].timestamp
            );
          }
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'frame'
          ].preUpdate(notifyAll);
        };
        const notifyAll = () => {
          for (const handler of containerHandlers) {
            handler.notify();
          }
        };
        const listener = () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'frame'
          ].read(measureAll);
        scrollListeners.set(container, listener);
        const target = getEventTarget(container);
        window.addEventListener('resize', listener);
        if (container !== document.documentElement) {
          resizeListeners.set(
            container,
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$resize$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'resize'
            ])(container, listener)
          );
        }
        target.addEventListener('scroll', listener);
        listener();
      }
      /**
       * Enable content size tracking if requested and not already enabled.
       */ if (trackContentSize && !dimensionCheckProcesses.has(container)) {
        const listener = scrollListeners.get(container);
        // Store initial scroll dimensions (object is reused to avoid allocation)
        const size = {
          width: container.scrollWidth,
          height: container.scrollHeight,
        };
        scrollSize.set(container, size);
        // Add frame-based scroll dimension checking to detect content changes
        const checkScrollDimensions = () => {
          const newWidth = container.scrollWidth;
          const newHeight = container.scrollHeight;
          if (size.width !== newWidth || size.height !== newHeight) {
            listener();
            size.width = newWidth;
            size.height = newHeight;
          }
        };
        // Schedule with keepAlive=true to run every frame
        const dimensionCheckProcess =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'frame'
          ].read(checkScrollDimensions, true);
        dimensionCheckProcesses.set(container, dimensionCheckProcess);
      }
      const listener = scrollListeners.get(container);
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'frame'
      ].read(listener, false, true);
      return () => {
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'cancelFrame'
        ])(listener);
        /**
         * Check if we even have any handlers for this container.
         */ const currentHandlers = onScrollHandlers.get(container);
        if (!currentHandlers) return;
        currentHandlers.delete(containerHandler);
        if (currentHandlers.size) return;
        /**
         * If no more handlers, remove the scroll listener too.
         */ const scrollListener = scrollListeners.get(container);
        scrollListeners.delete(container);
        if (scrollListener) {
          getEventTarget(container).removeEventListener(
            'scroll',
            scrollListener
          );
          resizeListeners.get(container)?.();
          window.removeEventListener('resize', scrollListener);
        }
        // Clean up scroll dimension checking
        const dimensionCheckProcess = dimensionCheckProcesses.get(container);
        if (dimensionCheckProcess) {
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'cancelFrame'
          ])(dimensionCheckProcess);
          dimensionCheckProcesses.delete(container);
        }
        scrollSize.delete(container);
      };
    }
    //# sourceMappingURL=track.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/utils/can-use-native-timeline.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'canUseNativeTimeline',
      () => canUseNativeTimeline,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-client] (ecmascript)'
      );
    function canUseNativeTimeline(target) {
      return (
        typeof window !== 'undefined' &&
        !target &&
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'supportsScrollTimeline'
        ])()
      );
    }
    //# sourceMappingURL=can-use-native-timeline.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/utils/get-timeline.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['getTimeline', () => getTimeline]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$track$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/track.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$can$2d$use$2d$native$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/utils/can-use-native-timeline.mjs [app-client] (ecmascript)'
      );
    const timelineCache = new Map();
    function scrollTimelineFallback(options) {
      const currentTime = {
        value: 0,
      };
      const cancel = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$track$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'scrollInfo'
      ])((info) => {
        currentTime.value = info[options.axis].progress * 100;
      }, options);
      return {
        currentTime,
        cancel,
      };
    }
    function getTimeline({ source, container, ...options }) {
      const { axis } = options;
      if (source) container = source;
      const containerCache = timelineCache.get(container) ?? new Map();
      timelineCache.set(container, containerCache);
      const targetKey = options.target ?? 'self';
      const targetCache = containerCache.get(targetKey) ?? {};
      const axisKey = axis + (options.offset ?? []).join(',');
      if (!targetCache[axisKey]) {
        targetCache[axisKey] = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$can$2d$use$2d$native$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'canUseNativeTimeline'
        ])(options.target)
          ? new ScrollTimeline({
              source: container,
              axis,
            })
          : scrollTimelineFallback({
              container,
              ...options,
            });
      }
      return targetCache[axisKey];
    }
    //# sourceMappingURL=get-timeline.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/attach-animation.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['attachToAnimation', () => attachToAnimation]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$scroll$2f$observe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/scroll/observe.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$get$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/utils/get-timeline.mjs [app-client] (ecmascript)'
      );
    function attachToAnimation(animation, options) {
      const timeline = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$get$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'getTimeline'
      ])(options);
      return animation.attachTimeline({
        timeline: options.target ? undefined : timeline,
        observe: (valueAnimation) => {
          valueAnimation.pause();
          return (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$scroll$2f$observe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'observeTimeline'
          ])((progress) => {
            valueAnimation.time = valueAnimation.iterationDuration * progress;
          }, timeline);
        },
      });
    }
    //# sourceMappingURL=attach-animation.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/attach-function.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['attachToFunction', () => attachToFunction]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$scroll$2f$observe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/scroll/observe.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$track$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/track.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$get$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/utils/get-timeline.mjs [app-client] (ecmascript)'
      );
    /**
     * If the onScroll function has two arguments, it's expecting
     * more specific information about the scroll from scrollInfo.
     */ function isOnScrollWithInfo(onScroll) {
      return onScroll.length === 2;
    }
    function attachToFunction(onScroll, options) {
      if (isOnScrollWithInfo(onScroll)) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$track$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'scrollInfo'
        ])((info) => {
          onScroll(info[options.axis].progress, info);
        }, options);
      } else {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$scroll$2f$observe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'observeTimeline'
        ])(
          onScroll,
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$get$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'getTimeline'
          ])(options)
        );
      }
    }
    //# sourceMappingURL=attach-function.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/index.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['scroll', () => scroll]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$attach$2d$animation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/attach-animation.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$attach$2d$function$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/attach-function.mjs [app-client] (ecmascript)'
      );
    function scroll(
      onScroll,
      { axis = 'y', container = document.scrollingElement, ...options } = {}
    ) {
      if (!container)
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'noop'
        ];
      const optionsWithDefaults = {
        axis,
        container,
        ...options,
      };
      return typeof onScroll === 'function'
        ? (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$attach$2d$function$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'attachToFunction'
          ])(onScroll, optionsWithDefaults)
        : (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$attach$2d$animation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'attachToAnimation'
          ])(onScroll, optionsWithDefaults);
    }
    //# sourceMappingURL=index.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useScroll', () => useScroll]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-utils@12.29.2/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$can$2d$use$2d$native$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/dom/scroll/utils/can-use-native-timeline.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs [app-client] (ecmascript)'
      );
    ('use client');
    const createScrollMotionValues = () => ({
      scrollX: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'motionValue'
      ])(0),
      scrollY: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'motionValue'
      ])(0),
      scrollXProgress: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'motionValue'
      ])(0),
      scrollYProgress: (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'motionValue'
      ])(0),
    });
    const isRefPending = (ref) => {
      if (!ref) return false;
      return !ref.current;
    };
    function makeAccelerateConfig(axis, options, container) {
      return {
        factory: (animation) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'scroll'
          ])(animation, {
            ...options,
            axis,
            container,
          }),
        times: [0, 1],
        keyframes: [0, 1],
        ease: (v) => v,
        duration: 1,
      };
    }
    function useScroll({ container, target, ...options } = {}) {
      const values = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useConstant'
      ])(createScrollMotionValues);
      if (
        !target &&
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$utils$2f$can$2d$use$2d$native$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'canUseNativeTimeline'
        ])()
      ) {
        const resolvedContainer = container?.current || undefined;
        values.scrollXProgress.accelerate = makeAccelerateConfig(
          'x',
          options,
          resolvedContainer
        );
        values.scrollYProgress.accelerate = makeAccelerateConfig(
          'y',
          options,
          resolvedContainer
        );
      }
      const scrollAnimation = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const needsStart = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(false);
      const start = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ])(
        {
          'useScroll.useCallback[start]': () => {
            scrollAnimation.current = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$scroll$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'scroll'
            ])(
              {
                'useScroll.useCallback[start]': (_progress, { x, y }) => {
                  values.scrollX.set(x.current);
                  values.scrollXProgress.set(x.progress);
                  values.scrollY.set(y.current);
                  values.scrollYProgress.set(y.progress);
                },
              }['useScroll.useCallback[start]'],
              {
                ...options,
                container: container?.current || undefined,
                target: target?.current || undefined,
              }
            );
            return {
              'useScroll.useCallback[start]': () => {
                scrollAnimation.current?.();
              },
            }['useScroll.useCallback[start]'];
          },
        }['useScroll.useCallback[start]'],
        [container, target, JSON.stringify(options.offset)]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useIsomorphicLayoutEffect'
      ])(
        {
          'useScroll.useIsomorphicLayoutEffect': () => {
            needsStart.current = false;
            if (isRefPending(container) || isRefPending(target)) {
              needsStart.current = true;
              return;
            } else {
              return start();
            }
          },
        }['useScroll.useIsomorphicLayoutEffect'],
        [start]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'useScroll.useEffect': () => {
            if (needsStart.current) {
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'invariant'
              ])(
                !isRefPending(container),
                'Container ref is defined but not hydrated',
                'use-scroll-ref'
              );
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$utils$40$12$2e$29$2e$2$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'invariant'
              ])(
                !isRefPending(target),
                'Target ref is defined but not hydrated',
                'use-scroll-ref'
              );
              return start();
            } else {
              return;
            }
          },
        }['useScroll.useEffect'],
        [start]
      );
      return values;
    }
    //# sourceMappingURL=use-scroll.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useMotionValue', () => useMotionValue]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)'
      );
    ('use client');
    /**
     * Creates a `MotionValue` to track the state and velocity of a value.
     *
     * Usually, these are created automatically. For advanced use-cases, like use with `useTransform`, you can create `MotionValue`s externally and pass them into the animated component via the `style` prop.
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const scale = useMotionValue(1)
     *
     *   return <motion.div style={{ scale }} />
     * }
     * ```
     *
     * @param initial - The initial state.
     *
     * @public
     */ function useMotionValue(initial) {
      const value = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useConstant'
      ])(
        {
          'useMotionValue.useConstant[value]': () =>
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'motionValue'
            ])(initial),
        }['useMotionValue.useConstant[value]']
      );
      /**
       * If this motion value is being used in static mode, like on
       * the Framer canvas, force components to rerender when the motion
       * value is updated.
       */ const { isStatic } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useContext'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'MotionConfigContext'
        ]
      );
      if (isStatic) {
        const [, setLatest] = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useState'
        ])(initial);
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useEffect'
        ])(
          {
            'useMotionValue.useEffect': () => value.on('change', setLatest),
          }['useMotionValue.useEffect'],
          []
        );
      }
      return value;
    }
    //# sourceMappingURL=use-motion-value.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-combine-values.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'useCombineMotionValues',
      () => useCombineMotionValues,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)'
      );
    ('use client');
    function useCombineMotionValues(values, combineValues) {
      /**
       * Initialise the returned motion value. This remains the same between renders.
       */ const value = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionValue'
      ])(combineValues());
      /**
       * Create a function that will update the template motion value with the latest values.
       * This is pre-bound so whenever a motion value updates it can schedule its
       * execution in Framesync. If it's already been scheduled it won't be fired twice
       * in a single frame.
       */ const updateValue = () => value.set(combineValues());
      /**
       * Synchronously update the motion value with the latest values during the render.
       * This ensures that within a React render, the styles applied to the DOM are up-to-date.
       */ updateValue();
      /**
       * Subscribe to all motion values found within the template. Whenever any of them change,
       * schedule an update.
       */ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useIsomorphicLayoutEffect'
      ])(
        {
          'useCombineMotionValues.useIsomorphicLayoutEffect': () => {
            const scheduleUpdate = {
              'useCombineMotionValues.useIsomorphicLayoutEffect.scheduleUpdate':
                () =>
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'frame'
                  ].preRender(updateValue, false, true),
            }[
              'useCombineMotionValues.useIsomorphicLayoutEffect.scheduleUpdate'
            ];
            const subscriptions = values.map(
              {
                'useCombineMotionValues.useIsomorphicLayoutEffect.subscriptions':
                  (v) => v.on('change', scheduleUpdate),
              }[
                'useCombineMotionValues.useIsomorphicLayoutEffect.subscriptions'
              ]
            );
            return {
              'useCombineMotionValues.useIsomorphicLayoutEffect': () => {
                subscriptions.forEach(
                  {
                    'useCombineMotionValues.useIsomorphicLayoutEffect': (
                      unsubscribe
                    ) => unsubscribe(),
                  }['useCombineMotionValues.useIsomorphicLayoutEffect']
                );
                (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cancelFrame'
                ])(updateValue);
              },
            }['useCombineMotionValues.useIsomorphicLayoutEffect'];
          },
        }['useCombineMotionValues.useIsomorphicLayoutEffect']
      );
      return value;
    }
    //# sourceMappingURL=use-combine-values.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-computed.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useComputed', () => useComputed]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$combine$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-combine-values.mjs [app-client] (ecmascript)'
      );
    ('use client');
    function useComputed(compute) {
      /**
       * Open session of collectMotionValues. Any MotionValue that calls get()
       * will be saved into this array.
       */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'collectMotionValues'
      ].current = [];
      compute();
      const value = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$combine$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCombineMotionValues'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'collectMotionValues'
        ].current,
        compute
      );
      /**
       * Synchronously close session of collectMotionValues.
       */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'collectMotionValues'
      ].current = undefined;
      return value;
    }
    //# sourceMappingURL=use-computed.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useTransform', () => useTransform]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/utils/transform.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$combine$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-combine-values.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-computed.mjs [app-client] (ecmascript)'
      );
    ('use client');
    function useTransform(
      input,
      inputRangeOrTransformer,
      outputRangeOrMap,
      options
    ) {
      if (typeof input === 'function') {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$computed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useComputed'
        ])(input);
      }
      /**
       * Detect if outputRangeOrMap is an output map (object with keys)
       * rather than an output range (array).
       */ const isOutputMap =
        outputRangeOrMap !== undefined &&
        !Array.isArray(outputRangeOrMap) &&
        typeof inputRangeOrTransformer !== 'function';
      if (isOutputMap) {
        return useMapTransform(
          input,
          inputRangeOrTransformer,
          outputRangeOrMap,
          options
        );
      }
      const outputRange = outputRangeOrMap;
      const transformer =
        typeof inputRangeOrTransformer === 'function'
          ? inputRangeOrTransformer
          : (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'transform'
            ])(inputRangeOrTransformer, outputRange, options);
      const result = Array.isArray(input)
        ? useListTransform(input, transformer)
        : useListTransform(
            [input],
            {
              'useTransform.useListTransform': ([latest]) =>
                transformer(latest),
            }['useTransform.useListTransform']
          );
      const inputAccelerate = !Array.isArray(input)
        ? input.accelerate
        : undefined;
      if (
        inputAccelerate &&
        !inputAccelerate.isTransformed &&
        typeof inputRangeOrTransformer !== 'function' &&
        Array.isArray(outputRangeOrMap) &&
        options?.clamp !== false
      ) {
        result.accelerate = {
          ...inputAccelerate,
          times: inputRangeOrTransformer,
          keyframes: outputRangeOrMap,
          isTransformed: true,
          ...(options?.ease
            ? {
                ease: options.ease,
              }
            : {}),
        };
      }
      return result;
    }
    function useListTransform(values, transformer) {
      const latest = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useConstant'
      ])(
        {
          'useListTransform.useConstant[latest]': () => [],
        }['useListTransform.useConstant[latest]']
      );
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$combine$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCombineMotionValues'
      ])(
        values,
        {
          'useListTransform.useCombineMotionValues': () => {
            latest.length = 0;
            const numValues = values.length;
            for (let i = 0; i < numValues; i++) {
              latest[i] = values[i].get();
            }
            return transformer(latest);
          },
        }['useListTransform.useCombineMotionValues']
      );
    }
    function useMapTransform(inputValue, inputRange, outputMap, options) {
      /**
       * Capture keys once to ensure hooks are called in consistent order.
       */ const keys = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useConstant'
      ])(
        {
          'useMapTransform.useConstant[keys]': () => Object.keys(outputMap),
        }['useMapTransform.useConstant[keys]']
      );
      const output = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useConstant'
      ])(
        {
          'useMapTransform.useConstant[output]': () => ({}),
        }['useMapTransform.useConstant[output]']
      );
      for (const key of keys) {
        output[key] = useTransform(
          inputValue,
          inputRange,
          outputMap[key],
          options
        );
      }
      return output;
    }
    //# sourceMappingURL=use-transform.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-follow-value.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useFollowValue', () => useFollowValue]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$follow$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/value/follow-value.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)'
      );
    ('use client');
    function useFollowValue(source, options = {}) {
      const { isStatic } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useContext'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'MotionConfigContext'
        ]
      );
      const getFromSource = () =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'isMotionValue'
        ])(source)
          ? source.get()
          : source;
      // isStatic will never change, allowing early hooks return
      if (isStatic) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useTransform'
        ])(getFromSource);
      }
      const value = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionValue'
      ])(getFromSource());
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useInsertionEffect'
      ])(
        {
          'useFollowValue.useInsertionEffect': () => {
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$follow$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'attachFollow'
            ])(value, source, options);
          },
        }['useFollowValue.useInsertionEffect'],
        [value, JSON.stringify(options)]
      );
      return value;
    }
    //# sourceMappingURL=use-follow-value.mjs.map
  },
  '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useSpring', () => useSpring]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$follow$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-follow-value.mjs [app-client] (ecmascript)'
      );
    ('use client');
    function useSpring(source, options = {}) {
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$follow$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useFollowValue'
      ])(source, {
        type: 'spring',
        ...options,
      });
    }
    //# sourceMappingURL=use-spring.mjs.map
  },
]);

//# sourceMappingURL=73000_framer-motion_dist_es_c7e0630d._.js.map

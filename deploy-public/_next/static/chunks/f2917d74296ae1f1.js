(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  60630,
  (e) => {
    'use strict';
    var t = e.i(90541),
      i = e.i(943);
    function r() {
      let e = (0, t.useReducedMotion)(),
        [r, n] = (0, i.useState)(!1);
      return (
        (0, i.useEffect)(() => {
          n(!0);
        }, []),
        !!r && (e ?? !1)
      );
    }
    e.s(['useReducedMotion', () => r]);
  },
  80643,
  (e) => {
    'use strict';
    e.i(98864);
    var t = e.i(54395),
      i = e.i(89424),
      r = e.i(65438);
    function n(e) {
      return 'number' == typeof e ? e : parseFloat(e);
    }
    var s = e.i(943),
      l = e.i(50798),
      a = e.i(30951),
      o = e.i(28046);
    function c(e, d = {}) {
      return (function (e, c = {}) {
        let { isStatic: d } = (0, s.useContext)(l.MotionConfigContext),
          u = () => ((0, i.isMotionValue)(e) ? e.get() : e);
        if (d) return (0, o.useTransform)(u);
        let m = (0, a.useMotionValue)(u());
        return (
          (0, s.useInsertionEffect)(
            () =>
              (function (e, s, l = {}) {
                let a,
                  o = e.get(),
                  c = null,
                  d = o,
                  u = 'string' == typeof o ? o.replace(/[\d.-]/g, '') : void 0,
                  m = () => {
                    c && (c.stop(), (c = null));
                  };
                if (
                  (e.attach((i, s) => {
                    ((d = i),
                      (a = (e) => {
                        var t, i;
                        return s(((t = e), (i = u) ? t + i : t));
                      }),
                      r.frame.postRender(() => {
                        let i, r;
                        (m(),
                          (i = n(e.get())),
                          i !== (r = n(d)) &&
                            (c = new t.JSAnimation({
                              keyframes: [i, r],
                              velocity: e.getVelocity(),
                              type: 'spring',
                              restDelta: 0.001,
                              restSpeed: 0.01,
                              ...l,
                              onUpdate: a,
                            })),
                          e.events.animationStart?.notify(),
                          c?.then(() => {
                            e.events.animationComplete?.notify();
                          }));
                      }));
                  }, m),
                  (0, i.isMotionValue)(s))
                ) {
                  let t = s.on('change', (t) => {
                      var i, r;
                      return e.set(((i = t), (r = u) ? i + r : i));
                    }),
                    i = e.on('destroy', t);
                  return () => {
                    (t(), i());
                  };
                }
                return m;
              })(m, e, c),
            [m, JSON.stringify(c)]
          ),
          m
        );
      })(e, { type: 'spring', ...d });
    }
    e.s(['useSpring', () => c], 80643);
  },
  78191,
  (e) => {
    'use strict';
    e.i(39507);
    var t = e.i(91047),
      i = e.i(943),
      r = e.i(65418),
      n = e.i(29550),
      s = e.i(40023),
      l = e.i(69857),
      a = e.i(82075),
      o = i,
      c = e.i(50798);
    function d(e, t) {
      if ('function' == typeof e) return e(t);
      null != e && (e.current = t);
    }
    class u extends o.Component {
      getSnapshotBeforeUpdate(e) {
        let t = this.props.childRef.current;
        if (t && e.isPresent && !this.props.isPresent) {
          let e = t.offsetParent,
            i = ((0, a.isHTMLElement)(e) && e.offsetWidth) || 0,
            r = ((0, a.isHTMLElement)(e) && e.offsetHeight) || 0,
            n = this.props.sizeRef.current;
          ((n.height = t.offsetHeight || 0),
            (n.width = t.offsetWidth || 0),
            (n.top = t.offsetTop),
            (n.left = t.offsetLeft),
            (n.right = i - n.width - n.left),
            (n.bottom = r - n.height - n.top));
        }
        return null;
      }
      componentDidUpdate() {}
      render() {
        return this.props.children;
      }
    }
    function m({ children: e, isPresent: r, anchorX: n, anchorY: s, root: l }) {
      let a = (0, o.useId)(),
        m = (0, o.useRef)(null),
        f = (0, o.useRef)({
          width: 0,
          height: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }),
        { nonce: p } = (0, o.useContext)(c.MotionConfigContext),
        h = (function (...e) {
          return i.useCallback(
            (function (...e) {
              return (t) => {
                let i = !1,
                  r = e.map((e) => {
                    let r = d(e, t);
                    return (i || 'function' != typeof r || (i = !0), r);
                  });
                if (i)
                  return () => {
                    for (let t = 0; t < r.length; t++) {
                      let i = r[t];
                      'function' == typeof i ? i() : d(e[t], null);
                    }
                  };
              };
            })(...e),
            e
          );
        })(m, e.props?.ref ?? e?.ref);
      return (
        (0, o.useInsertionEffect)(() => {
          let {
            width: e,
            height: t,
            top: i,
            left: o,
            right: c,
            bottom: d,
          } = f.current;
          if (r || !m.current || !e || !t) return;
          let u = 'left' === n ? `left: ${o}` : `right: ${c}`,
            h = 'bottom' === s ? `bottom: ${d}` : `top: ${i}`;
          m.current.dataset.motionPopId = a;
          let x = document.createElement('style');
          p && (x.nonce = p);
          let g = l ?? document.head;
          return (
            g.appendChild(x),
            x.sheet &&
              x.sheet.insertRule(`
          [data-motion-pop-id="${a}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${u}px !important;
            ${h}px !important;
          }
        `),
            () => {
              g.contains(x) && g.removeChild(x);
            }
          );
        }, [r]),
        (0, t.jsx)(u, {
          isPresent: r,
          childRef: m,
          sizeRef: f,
          children: o.cloneElement(e, { ref: h }),
        })
      );
    }
    let f = ({
      children: e,
      initial: r,
      isPresent: s,
      onExitComplete: a,
      custom: o,
      presenceAffectsLayout: c,
      mode: d,
      anchorX: u,
      anchorY: f,
      root: h,
    }) => {
      let x = (0, n.useConstant)(p),
        g = (0, i.useId)(),
        v = !0,
        b = (0, i.useMemo)(
          () => (
            (v = !1),
            {
              id: g,
              initial: r,
              isPresent: s,
              custom: o,
              onExitComplete: (e) => {
                for (let t of (x.set(e, !0), x.values())) if (!t) return;
                a && a();
              },
              register: (e) => (x.set(e, !1), () => x.delete(e)),
            }
          ),
          [s, x, a]
        );
      return (
        c && v && (b = { ...b }),
        (0, i.useMemo)(() => {
          x.forEach((e, t) => x.set(t, !1));
        }, [s]),
        i.useEffect(() => {
          s || x.size || !a || a();
        }, [s]),
        'popLayout' === d &&
          (e = (0, t.jsx)(m, {
            isPresent: s,
            anchorX: u,
            anchorY: f,
            root: h,
            children: e,
          })),
        (0, t.jsx)(l.PresenceContext.Provider, { value: b, children: e })
      );
    };
    function p() {
      return new Map();
    }
    var h = e.i(4036);
    let x = (e) => e.key || '';
    function g(e) {
      let t = [];
      return (
        i.Children.forEach(e, (e) => {
          (0, i.isValidElement)(e) && t.push(e);
        }),
        t
      );
    }
    let v = ({
      children: e,
      custom: l,
      initial: a = !0,
      onExitComplete: o,
      presenceAffectsLayout: c = !0,
      mode: d = 'sync',
      propagate: u = !1,
      anchorX: m = 'left',
      anchorY: p = 'top',
      root: v,
    }) => {
      let [b, j] = (0, h.usePresence)(u),
        y = (0, i.useMemo)(() => g(e), [e]),
        w = u && !b ? [] : y.map(x),
        N = (0, i.useRef)(!0),
        _ = (0, i.useRef)(y),
        A = (0, n.useConstant)(() => new Map()),
        E = (0, i.useRef)(new Set()),
        [k, C] = (0, i.useState)(y),
        [T, S] = (0, i.useState)(y);
      (0, s.useIsomorphicLayoutEffect)(() => {
        ((N.current = !1), (_.current = y));
        for (let e = 0; e < T.length; e++) {
          let t = x(T[e]);
          w.includes(t)
            ? (A.delete(t), E.current.delete(t))
            : !0 !== A.get(t) && A.set(t, !1);
        }
      }, [T, w.length, w.join('-')]);
      let O = [];
      if (y !== k) {
        let e = [...y];
        for (let t = 0; t < T.length; t++) {
          let i = T[t],
            r = x(i);
          w.includes(r) || (e.splice(t, 0, i), O.push(i));
        }
        return ('wait' === d && O.length && (e = O), S(g(e)), C(y), null);
      }
      let { forceRender: P } = (0, i.useContext)(r.LayoutGroupContext);
      return (0, t.jsx)(t.Fragment, {
        children: T.map((e) => {
          let i = x(e),
            r = (!u || !!b) && (y === T || w.includes(i));
          return (0, t.jsx)(
            f,
            {
              isPresent: r,
              initial: (!N.current || !!a) && void 0,
              custom: l,
              presenceAffectsLayout: c,
              mode: d,
              root: v,
              onExitComplete: r
                ? void 0
                : () => {
                    if (E.current.has(i) || (E.current.add(i), !A.has(i)))
                      return;
                    A.set(i, !0);
                    let e = !0;
                    (A.forEach((t) => {
                      t || (e = !1);
                    }),
                      e && (P?.(), S(_.current), u && j?.(), o && o()));
                  },
              anchorX: m,
              anchorY: p,
              children: e,
            },
            i
          );
        }),
      });
    };
    e.s(['AnimatePresence', () => v], 78191);
  },
  37963,
  (e) => {
    'use strict';
    var t = e.i(40022);
    let i =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    function r(e) {
      if (!e) return i;
      let r = e.trim();
      if (!r) return i;
      if (/^https?:\/\//.test(r)) return r;
      let n = r
        .replace(/^https?:\/\/[^/]+\/storage\/v1\/object\/public\//, '')
        .replace(/^\/?storage\/v1\/object\/public\//, '')
        .replace(/^\/+/, '');
      return n ? `${t.SUPABASE_STORAGE_URL}/${n}` : i;
    }
    function n(e) {
      let t = e.currentTarget;
      t.dataset.fallbackApplied ||
        ((t.dataset.fallbackApplied = 'true'), (t.src = i));
    }
    e.s([
      'applyImageFallback',
      () => n,
      'getAssetUrl',
      () => r,
      'isVideo',
      0,
      (e) =>
        !!e &&
        ['.mp4', '.webm', '.ogg', '.mov', '.m4v'].some((t) =>
          e.toLowerCase().endsWith(t)
        ),
    ]);
  },
  73390,
  (e) => {
    'use strict';
    e.s(['GHOST_EASE', 0, [0.22, 1, 0.36, 1]]);
  },
  30432,
  (e) => {
    'use strict';
    var t = e.i(91047),
      i = e.i(62897),
      r = e.i(90541),
      n = e.i(28289),
      s = e.i(68020);
    function l(e) {
      return (0, t.jsx)('svg', {
        viewBox: '0 0 16 16',
        'aria-hidden': 'true',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.5,
        ...e,
        children: (0, t.jsx)('path', { d: 'M3 13L13 3M6 3H13V10' }),
      });
    }
    var a = e.i(93043),
      o = e.i(37963);
    function c({ project: e, onOpen: i }) {
      let n = (0, r.useReducedMotion)(),
        c = () =>
          (0, t.jsxs)(t.Fragment, {
            children: [
              (0, t.jsxs)('div', {
                className: `card-shell relative overflow-hidden rounded-md w-full bg-white/5 transition-all duration-500 ${n ? '' : 'md:group-hover:shadow-[0_22px_54px_-12px_rgba(0,72,255,0.15)] md:group-hover:-translate-y-1 active:scale-[0.98]'}`,
                children: [
                  (0, t.jsx)('div', {
                    className:
                      "absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]",
                  }),
                  (0, o.isVideo)(e.image)
                    ? (0, t.jsx)('video', {
                        src: e.image,
                        autoPlay: !0,
                        muted: !0,
                        loop: !0,
                        playsInline: !0,
                        className:
                          'absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90 md:group-hover:opacity-100',
                      })
                    : (0, t.jsx)(s.default, {
                        src: e.image,
                        alt: `Logo da marca ${e.client} para ${e.category} - ${e.title}`,
                        fill: !0,
                        sizes: e.layout.sizes ?? '100vw',
                        className: `object-cover transition-transform duration-700 opacity-90 md:group-hover:opacity-100 ${n ? '' : 'md:group-hover:scale-103'}`,
                        loading: 'lazy',
                        onError: o.applyImageFallback,
                      }),
                ],
              }),
              (0, t.jsxs)('div', {
                className:
                  'mt-6 flex flex-row justify-between items-start gap-4 md:gap-6 px-1 text-left',
                children: [
                  (0, t.jsxs)('div', {
                    className: 'flex-1',
                    children: [
                      (0, t.jsxs)('div', {
                        className:
                          'flex items-center justify-start gap-2 text-white/40 text-xs md:text-sm leading-tight mb-2',
                        children: [
                          (0, t.jsx)('span', {
                            className:
                              'uppercase tracking-widest font-mono text-[9px] md:text-[10px]',
                            children: e.category,
                          }),
                          (0, t.jsx)('span', {
                            'aria-hidden': !0,
                            className: 'opacity-30',
                            children: '•',
                          }),
                          (0, t.jsxs)('span', {
                            className: 'font-light',
                            children: [e.client, ' / ', e.year],
                          }),
                        ],
                      }),
                      (0, t.jsx)('h3', {
                        className:
                          'text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-[1.2] transition-colors duration-500 md:group-hover:text-primary',
                        children: e.title,
                      }),
                    ],
                  }),
                  (0, t.jsx)('div', {
                    className: `w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shrink-0 border border-white/10 transition-all duration-700 bg-[#0048ff] ${n ? '' : 'md:group-hover:translate-x-5 md:group-hover:bg-[#8705f2] md:group-hover:shadow-[0_0_20px_rgba(135,5,242,0.4)]'}`,
                    children: (0, t.jsx)(l, {
                      className:
                        'w-5 h-5 md:w-6 md:h-6 -rotate-45 transition-transform duration-500 md:group-hover:rotate-0',
                    }),
                  }),
                ],
              }),
            ],
          }),
        d =
          'group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md text-center md:text-left';
      return e.landingPageSlug
        ? (0, t.jsx)(a.default, {
            href: `/projects/${e.landingPageSlug}?from=home`,
            'aria-label': `Ver Landing Page: ${e.title}`,
            className: d,
            children: (0, t.jsx)(c, {}),
          })
        : 'function' == typeof i
          ? (0, t.jsx)('button', {
              type: 'button',
              onClick: () => {
                i && i(e);
              },
              'aria-label': `Ver detalhes do projeto ${e.title}`,
              className: d,
              children: (0, t.jsx)(c, {}),
            })
          : (0, t.jsx)(a.default, {
              href: `/portfolio/${e.slug}`,
              'aria-label': `Ver projeto: ${e.title}`,
              className: d,
              children: (0, t.jsx)(c, {}),
            });
    }
    var d = e.i(21785);
    function u() {
      return (0, t.jsxs)('div', {
        className:
          'card-shell group relative flex flex-col items-center justify-center h-full bg-[#040013] p-6 md:p-12 md:overflow-hidden md:rounded-mdborder-none shadow-none md:transition-none',
        children: [
          (0, t.jsx)('div', {
            className: 'absolute inset-0 opacity-30 hidden md:block',
            style: {
              backgroundImage:
                'radial-gradient(circle at 50% 50%, var(--color-primary-faint), transparent 70%)',
            },
          }),
          (0, t.jsxs)('h3', {
            className:
              'relative z-10 text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-normal text-center mb-6 md:mb-12 tracking-tight leading-[1.1] text-whitetransition-colors duration-300 md:group-hover:text-bluePrimary',
            children: ['Like what', (0, t.jsx)('br', {}), 'you see?'],
          }),
          (0, t.jsx)('div', {
            className: 'relative z-10 w-full flex justify-center',
            children: (0, t.jsx)(d.default, {
              href: '/portfolio',
              text: 'view projects',
              className: 'relative w-auto',
            }),
          }),
        ],
      });
    }
    var m = e.i(87857);
    let { duration: f, offset: p } = n.MOTION_TOKENS,
      h = [
        'md:col-span-4 lg:col-span-5',
        'md:col-span-4 lg:col-span-7',
        'md:col-span-8 lg:col-span-12',
        'md:col-span-5 lg:col-span-8',
      ];
    function x({ projects: e, onProjectOpen: s }) {
      let l = (0, r.useReducedMotion)(),
        a = e.filter((e) => e.isFeatured),
        o = {
          hidden: l ? {} : { opacity: 0, y: p.dramatic, filter: 'blur(4px)' },
          visible: l
            ? { opacity: 1 }
            : {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: (0, n.ghostTransition)(0, f.normal),
              },
        };
      return (0, t.jsx)('section', {
        id: 'featured-projects',
        'aria-label': 'Projetos em Destaque',
        className: 'relative z-10 bg-background py-16 md:py-24',
        children: (0, t.jsx)(m.Container, {
          children: (0, t.jsxs)(i.motion.div, {
            initial: l ? 'visible' : 'hidden',
            whileInView: 'visible',
            viewport: { once: !0, amount: 0.2 },
            variants: (0, n.staggerContainer)(0.12),
            className:
              'grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6',
            children: [
              a.slice(0, 4).map((e, r) => {
                if (!e) return null;
                let n = h[r] || 'md:col-span-4 lg:col-span-4';
                return (0, t.jsx)(
                  i.motion.div,
                  {
                    variants: o,
                    className: `w-full col-span-4 ${n} h-full flex flex-col`,
                    children: (0, t.jsx)(c, { project: e, onOpen: s }),
                  },
                  e.id
                );
              }),
              (0, t.jsx)(i.motion.div, {
                variants: o,
                className:
                  'w-full col-span-4 md:col-span-3 lg:col-span-4 h-full flex flex-col',
                children: (0, t.jsx)(u, {}),
              }),
            ],
          }),
        }),
      });
    }
    e.s(['default', () => x], 30432);
  },
  98508,
  (e, t, i) => {
    'use strict';
    (Object.defineProperty(i, '__esModule', { value: !0 }),
      Object.defineProperty(i, 'BailoutToCSR', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let r = e.r(65951);
    function n({ reason: e, children: t }) {
      if ('u' < typeof window)
        throw Object.defineProperty(
          new r.BailoutToCSRError(e),
          '__NEXT_ERROR_CODE',
          { value: 'E394', enumerable: !1, configurable: !0 }
        );
      return t;
    }
  },
  7513,
  (e, t, i) => {
    'use strict';
    function r(e) {
      return e
        .split('/')
        .map((e) => encodeURIComponent(e))
        .join('/');
    }
    (Object.defineProperty(i, '__esModule', { value: !0 }),
      Object.defineProperty(i, 'encodeURIPath', {
        enumerable: !0,
        get: function () {
          return r;
        },
      }));
  },
  25858,
  (e, t, i) => {
    'use strict';
    (Object.defineProperty(i, '__esModule', { value: !0 }),
      Object.defineProperty(i, 'PreloadChunks', {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let r = e.r(91047),
      n = e.r(31467),
      s = e.r(3873),
      l = e.r(7513),
      a = e.r(77155);
    function o({ moduleIds: e }) {
      if ('u' > typeof window) return null;
      let t = s.workAsyncStorage.getStore();
      if (void 0 === t) return null;
      let i = [];
      if (t.reactLoadableManifest && e) {
        let r = t.reactLoadableManifest;
        for (let t of e) {
          if (!r[t]) continue;
          let e = r[t].files;
          i.push(...e);
        }
      }
      if (0 === i.length) return null;
      let o = (0, a.getDeploymentIdQueryOrEmptyString)();
      return (0, r.jsx)(r.Fragment, {
        children: i.map((e) => {
          let i = `${t.assetPrefix}/_next/${(0, l.encodeURIPath)(e)}${o}`;
          return e.endsWith('.css')
            ? (0, r.jsx)(
                'link',
                {
                  precedence: 'dynamic',
                  href: i,
                  rel: 'stylesheet',
                  as: 'style',
                  nonce: t.nonce,
                },
                e
              )
            : ((0, n.preload)(i, {
                as: 'script',
                fetchPriority: 'low',
                nonce: t.nonce,
              }),
              null);
        }),
      });
    }
  },
  85356,
  (e, t, i) => {
    'use strict';
    (Object.defineProperty(i, '__esModule', { value: !0 }),
      Object.defineProperty(i, 'default', {
        enumerable: !0,
        get: function () {
          return c;
        },
      }));
    let r = e.r(91047),
      n = e.r(943),
      s = e.r(98508),
      l = e.r(25858);
    function a(e) {
      return { default: e && 'default' in e ? e.default : e };
    }
    let o = {
        loader: () => Promise.resolve(a(() => null)),
        loading: null,
        ssr: !0,
      },
      c = function (e) {
        let t = { ...o, ...e },
          i = (0, n.lazy)(() => t.loader().then(a)),
          c = t.loading;
        function d(e) {
          let a = c
              ? (0, r.jsx)(c, { isLoading: !0, pastDelay: !0, error: null })
              : null,
            o = !t.ssr || !!t.loading,
            d = o ? n.Suspense : n.Fragment,
            u = t.ssr
              ? (0, r.jsxs)(r.Fragment, {
                  children: [
                    'u' < typeof window
                      ? (0, r.jsx)(l.PreloadChunks, { moduleIds: t.modules })
                      : null,
                    (0, r.jsx)(i, { ...e }),
                  ],
                })
              : (0, r.jsx)(s.BailoutToCSR, {
                  reason: 'next/dynamic',
                  children: (0, r.jsx)(i, { ...e }),
                });
          return (0, r.jsx)(d, { ...(o ? { fallback: a } : {}), children: u });
        }
        return ((d.displayName = 'LoadableComponent'), d);
      };
  },
  48623,
  (e, t, i) => {
    'use strict';
    (Object.defineProperty(i, '__esModule', { value: !0 }),
      Object.defineProperty(i, 'default', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let r = e.r(81258)._(e.r(85356));
    function n(e, t) {
      let i = {};
      'function' == typeof e && (i.loader = e);
      let n = { ...i, ...t };
      return (0, r.default)({ ...n, modules: n.loadableGenerated?.modules });
    }
    ('function' == typeof i.default ||
      ('object' == typeof i.default && null !== i.default)) &&
      void 0 === i.default.__esModule &&
      (Object.defineProperty(i.default, '__esModule', { value: !0 }),
      Object.assign(i.default, i),
      (t.exports = i.default));
  },
  47612,
  (e) => {
    e.v({
      baseText: 'HeroCopy-module__jwv1Aa__baseText',
      ctaSpacer: 'HeroCopy-module__jwv1Aa__ctaSpacer',
      ghostAura: 'HeroCopy-module__jwv1Aa__ghostAura',
      heroSubtitle: 'HeroCopy-module__jwv1Aa__heroSubtitle',
      heroTitle: 'HeroCopy-module__jwv1Aa__heroTitle',
      isLoaded: 'HeroCopy-module__jwv1Aa__isLoaded',
      maskLayer: 'HeroCopy-module__jwv1Aa__maskLayer',
      maskText: 'HeroCopy-module__jwv1Aa__maskText',
      root: 'HeroCopy-module__jwv1Aa__root',
      subText: 'HeroCopy-module__jwv1Aa__subText',
      tag: 'HeroCopy-module__jwv1Aa__tag',
    });
  },
  56218,
  (e) => {
    'use strict';
    var t = e.i(91047),
      i = e.i(943),
      r = e.i(78191),
      n = e.i(62897),
      s = e.i(40022);
    let l = (e, t = 1) => {
        let i = e.replace('#', ''),
          r = parseInt(3 === i.length ? i.replace(/./g, (e) => e + e) : i, 16);
        return `rgba(${(r >> 16) & 255}, ${(r >> 8) & 255}, ${255 & r}, ${t})`;
      },
      a = l(s.BRAND.colors.bluePrimary, 0.45),
      o = l(s.BRAND.colors.blueAccent, 0.6);
    function c({
      ready: e,
      onComplete: l,
      durationMs: c = 2e3,
      label: u = 'Summoning spirits',
      className: m,
    }) {
      let [f, p] = (0, i.useState)(!0),
        [h, x] = (0, i.useState)(!1);
      return (
        (0, i.useEffect)(() => {
          let e = window.matchMedia('(prefers-reduced-motion: reduce)');
          x(e.matches);
          let t = (e) => x(e.matches);
          return (
            e.addEventListener('change', t),
            () => e.removeEventListener('change', t)
          );
        }, []),
        (0, i.useEffect)(() => {
          if ('boolean' == typeof e) {
            if (!e) return;
            let t = setTimeout(() => p(!1), h ? 200 : 800);
            return () => clearTimeout(t);
          }
          if (l) {
            let e = setTimeout(() => {
              p(!1);
              try {
                l();
              } catch {}
            }, c);
            return () => clearTimeout(e);
          }
        }, [e, l, c, h]),
        (0, t.jsx)(r.AnimatePresence, {
          children:
            f &&
            (0, t.jsx)(n.motion.div, {
              className:
                'fixed inset-0 z-50 grid place-items-center bg-linear-to-b from-background to-neutral ' +
                (m ?? ''),
              initial: { opacity: 1, filter: 'blur(0px)', scale: 1 },
              exit: { opacity: 0, filter: 'blur(20px)', scale: 1.05 },
              transition: { duration: h ? 0.3 : 1, ease: [0.22, 1, 0.36, 1] },
              role: 'status',
              'aria-live': 'polite',
              children: (0, t.jsxs)('div', {
                className: 'text-center text-text select-none',
                children: [
                  (0, t.jsx)(n.motion.div, {
                    className: 'mx-auto mb-10 h-24 w-24',
                    animate: h
                      ? {}
                      : {
                          y: [0, -12, 0],
                          opacity: [0.95, 1, 0.95],
                          filter: [
                            `drop-shadow(0 0 15px ${a})`,
                            `drop-shadow(0 0 25px ${o})`,
                            `drop-shadow(0 0 15px ${a})`,
                          ],
                        },
                    transition: {
                      duration: 2.2,
                      repeat: 1 / 0,
                      ease: 'easeInOut',
                    },
                    children: (0, t.jsx)(d, {}),
                  }),
                  (0, t.jsx)(n.motion.p, {
                    className:
                      'text-[14px] font-mono font-medium uppercase tracking-[0.35em] text-textSecondary mb-8',
                    animate: h ? {} : { opacity: [0.7, 1, 0.7] },
                    transition: {
                      duration: 2,
                      repeat: 1 / 0,
                      ease: 'easeInOut',
                    },
                    children: u.toUpperCase(),
                  }),
                  (0, t.jsx)('div', {
                    className:
                      'mx-auto w-40 h-px bg-text/20 rounded-full overflow-hidden',
                    children: (0, t.jsx)(n.motion.div, {
                      className: 'h-full',
                      style: {
                        background: `linear-gradient(90deg, ${s.BRAND.colors.bluePrimary} 0%, ${s.BRAND.colors.blueAccent} 100%)`,
                        boxShadow: `0 0 12px ${a}`,
                      },
                      initial: { width: '0%' },
                      animate: { width: '100%' },
                      transition: { duration: c / 1e3, ease: 'easeInOut' },
                    }),
                  }),
                ],
              }),
            }),
        })
      );
    }
    function d() {
      return (0, t.jsxs)('svg', {
        viewBox: '0 0 512 512',
        className: 'w-full h-full',
        children: [
          (0, t.jsx)('path', {
            d: 'm508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z',
            fill: s.BRAND.colors.text,
            opacity: '0.95',
          }),
          (0, t.jsx)('circle', {
            cx: '208',
            cy: '225',
            r: '22',
            fill: s.BRAND.colors.neutral,
          }),
          (0, t.jsx)('circle', {
            cx: '297',
            cy: '225',
            r: '22',
            fill: s.BRAND.colors.neutral,
          }),
        ],
      });
    }
    let u = (0, e.i(48623).default)(() => e.A(63316), {
      loadableGenerated: { modules: [47908] },
      ssr: !1,
      loading: () =>
        (0, t.jsx)('div', { className: 'absolute inset-0 bg-background' }),
    });
    function m() {
      return (0, t.jsx)(u, {});
    }
    var f = e.i(21785),
      p = e.i(55064);
    let h = {
      initial: { opacity: 0, y: 24 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1 },
      },
    };
    function x({ isLoaded: e = !0 }) {
      return e
        ? (0, t.jsx)(n.motion.div, {
            initial: 'initial',
            animate: 'animate',
            variants: h,
            className: 'flex justify-center pointer-events-auto',
            children: (0, t.jsx)(f.default, {
              href: '/sobre',
              text: p.HOME_CONTENT.hero.cta,
              className: 'relative',
            }),
          })
        : null;
    }
    var g = e.i(28289),
      v = e.i(60630),
      b = e.i(87857),
      j = e.i(47612);
    let y = {
        initial: { opacity: 0, scale: 0.92, y: 60, filter: 'blur(10px)' },
        animate: {
          opacity: 1,
          scale: [0.92, 1.02, 1],
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 1.2,
            ease: g.GHOST_EASE,
            staggerChildren: 0.15,
          },
        },
      },
      w = {
        initial: { opacity: 0, y: 24 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: g.GHOST_EASE },
        },
      };
    function N({ ghostRef: e, isLoaded: r = !0 }) {
      var s;
      let l = (0, i.useRef)(null),
        a = (0, v.useReducedMotion)();
      ((s = r && !a),
        (0, i.useEffect)(() => {
          let t;
          if (!s || !e?.current || !l.current) return;
          let i = () => {
            if (!e.current || !l.current) return;
            let r = e.current.position,
              n = l.current,
              s = ((r.x + 10) / 20) * 100,
              a = 100 - ((r.y + 7) / 14) * 100;
            ((n.style.transform = `translate(calc(${s}vw - 50%), calc(${a}vh - 50%))`),
              document.documentElement.style.setProperty('--ghost-x', `${s}vw`),
              document.documentElement.style.setProperty('--ghost-y', `${a}vh`),
              (t = requestAnimationFrame(i)));
          };
          return (
            (t = requestAnimationFrame(i)),
            () => {
              t && cancelAnimationFrame(t);
            }
          );
        }, [e, l, s]));
      let o = (e) =>
        (0, t.jsx)(b.Container, {
          className: e ? j.default.maskText : j.default.baseText,
          children: (0, t.jsxs)('div', {
            className: 'flex flex-col items-center',
            children: [
              (0, t.jsx)('span', {
                className: `block mb-3 lg:mb-4 tracking-[0.25em] uppercase font-bold text-accent text-micro ${e ? '' : j.default.tag}`,
                children: p.HOME_CONTENT.hero.tag,
              }),
              (0, t.jsxs)('h1', {
                className: `hidden lg:block mb-20 font-display ${j.default.heroTitle}`,
                children: [
                  p.HOME_CONTENT.hero.title[0].split(' ').slice(0, 2).join(' '),
                  ' ',
                  (0, t.jsx)('br', {}),
                  p.HOME_CONTENT.hero.title[0].split(' ').slice(2).join(' '),
                ],
              }),
              (0, t.jsxs)('h1', {
                className: `lg:hidden mb-12 font-display ${j.default.heroTitle}`,
                children: [
                  p.HOME_CONTENT.hero.title[0].split(' ').slice(0, 2).join(' '),
                  ' ',
                  (0, t.jsx)('br', {}),
                  p.HOME_CONTENT.hero.title[0].split(' ').slice(2, 4).join(' '),
                  ' ',
                  (0, t.jsx)('br', {}),
                  p.HOME_CONTENT.hero.title[0].split(' ').slice(4).join(' '),
                ],
              }),
              (0, t.jsx)('h2', {
                className: `font-h2 type-h2 mt-6 lg:mt-9 text-textSecondary ${e ? '' : 'opacity-80'} ${j.default.heroSubtitle}`,
                children: p.HOME_CONTENT.hero.subtitle,
              }),
            ],
          }),
        });
      return (0, t.jsxs)(n.motion.div, {
        ...(a ? {} : { initial: 'initial', animate: 'animate', variants: y }),
        className: `relative flex flex-col items-center justify-center text-center w-full pointer-events-auto ${j.default.root}`,
        children: [
          (0, t.jsxs)(n.motion.div, {
            variants: w,
            className: 'w-full flex flex-col items-center',
            children: [
              o(!1),
              (0, t.jsx)('div', { className: j.default.ctaSpacer }),
            ],
          }),
          !a &&
            (0, t.jsx)('div', {
              className: j.default.maskLayer,
              'aria-hidden': 'true',
              children: (0, t.jsx)('div', {
                className: 'w-full flex flex-col items-center text-center',
                children: (0, t.jsxs)(n.motion.div, {
                  variants: w,
                  children: [
                    o(!0),
                    (0, t.jsx)('div', { className: j.default.ctaSpacer }),
                  ],
                }),
              }),
            }),
          (0, t.jsx)('div', {
            ref: l,
            className: `${j.default.ghostAura} ${r ? j.default.isLoaded : ''}`,
          }),
        ],
      });
    }
    var _ = e.i(60649);
    function A() {
      let e = (0, i.useRef)(null),
        [n, s] = (0, i.useState)(!1),
        l = (0, _.useMediaQuery)('(min-width: 1024px)');
      (0, i.useEffect)(() => {
        let e = setTimeout(() => s(!0), 2e3);
        return () => clearTimeout(e);
      }, []);
      let a = (0, i.useCallback)(() => s(!0), []);
      return (0, t.jsx)(t.Fragment, {
        children: (0, t.jsxs)('section', {
          id: 'hero',
          ref: e,
          className: 'relative w-full min-h-screen bg-[#040013]',
          'aria-label': 'Portfolio Hero Section',
          children: [
            !l &&
              (0, t.jsx)('div', {
                className: 'absolute inset-0 z-0 animate-pulse opacity-60',
                style: {
                  backgroundImage:
                    'radial-gradient(circle at 50% 50%, #0a0029 0%, #040013 70%)',
                },
              }),
            (0, t.jsx)(r.AnimatePresence, {
              children:
                !n &&
                (0, t.jsx)(c, {
                  durationMs: 2e3,
                  onComplete: a,
                  label: 'Initializing Experience',
                }),
            }),
            (0, t.jsx)('div', {
              className: 'absolute inset-0 z-20 pointer-events-none',
              children: (0, t.jsx)('div', {
                className:
                  'flex items-center justify-center w-full h-screen md:sticky md:top-0',
                children: (0, t.jsx)('div', {
                  className: 'w-full pointer-events-auto pb-32 md:pb-0',
                  children: (0, t.jsx)(N, { isLoaded: n }),
                }),
              }),
            }),
            (0, t.jsx)('div', {
              className:
                'absolute inset-0 z-30 pointer-events-none overflow-hidden',
              children: (0, t.jsx)('div', {
                className: 'sticky top-0 h-screen w-full',
                children: (0, t.jsx)(m, {}),
              }),
            }),
            (0, t.jsx)('div', {
              className: 'absolute inset-0 z-50 pointer-events-none',
              children: (0, t.jsx)('div', {
                className:
                  'flex items-end justify-center w-full h-screen md:sticky md:top-0',
                children: (0, t.jsx)('div', {
                  className:
                    'absolute bottom-6 left-1/2 -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:translate-x-0 md:pb-12 lg:pb-20 pointer-events-auto',
                  children: (0, t.jsx)(x, { isLoaded: n }),
                }),
              }),
            }),
            (0, t.jsx)('div', {
              className: 'sr-only',
              children:
                'Decorative animation of a floating spectral ghost with glowing particles following your cursor.',
            }),
          ],
        }),
      });
    }
    e.s(['default', () => A], 56218);
  },
  38402,
  (e) => {
    'use strict';
    var t = e.i(91047),
      i = e.i(943),
      r = e.i(62897),
      n = e.i(90541),
      s = e.i(21785),
      l = e.i(87857),
      a = e.i(68020),
      o = e.i(93043),
      c = e.i(19654),
      d = e.i(80643),
      u = e.i(28046),
      m = e.i(91424),
      f = e.i(75157),
      p = e.i(73390),
      h = e.i(37963);
    let x = { damping: 30, stiffness: 200, mass: 1 };
    function g({
      category: e,
      index: n,
      isHovered: s,
      onHover: l,
      prefersReducedMotion: g,
    }) {
      let v = Array.isArray(e.title) ? e.title : [e.title],
        b = (0, i.useRef)(null),
        { scrollYProgress: j } = (0, c.useScroll)({
          target: b,
          offset: ['start end', 'end start'],
        }),
        y = (0, d.useSpring)(j, x),
        w = (0, u.useTransform)(y, [0, 1], [-20, 20]),
        N = e.thumbnail.endsWith('.mp4');
      return (0, t.jsx)(r.motion.div, {
        ref: b,
        initial: g ? { opacity: 1 } : { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: !0, amount: 0.3 },
        transition: { duration: 0.8, ease: p.GHOST_EASE, delay: 0.12 * n },
        children: (0, t.jsxs)(o.default, {
          href: `/portfolio?category=${e.slug}`,
          className: 'block group',
          onMouseEnter: () => l(e.id),
          onMouseLeave: () => l(null),
          children: [
            (0, t.jsxs)('div', {
              className: (0, f.cn)(
                'hidden lg:flex items-center py-8 border-t border-blueAccent/40 transition-all duration-300',
                'right' === e.alignment && 'justify-end',
                'center' === e.alignment && 'justify-center',
                'left' === e.alignment && 'justify-start',
                s ? 'gap-10' : 'gap-6'
              ),
              children: [
                e.showLabel &&
                  (0, t.jsx)('span', {
                    className:
                      'absolute left-6 lg:left-8 text-sm font-normal text-blueAccent/80 whitespace-nowrap',
                    children: '[what we love working on]',
                  }),
                (0, t.jsx)(r.motion.div, {
                  className: 'relative overflow-hidden rounded-lg shrink-0',
                  initial: !1,
                  animate: { width: 288 * !!s, opacity: +!!s },
                  transition: { duration: 0.7, ease: p.GHOST_EASE },
                  children: (0, t.jsx)('div', {
                    className: 'relative w-[288px] aspect-video',
                    children: (0, t.jsx)(r.motion.div, {
                      style: { y: g ? 0 : w },
                      className: 'absolute inset-0 w-full h-[120%]',
                      children: N
                        ? (0, t.jsx)('video', {
                            src: e.thumbnail,
                            autoPlay: !0,
                            loop: !0,
                            muted: !0,
                            playsInline: !0,
                            className: 'object-cover w-full h-full',
                          })
                        : (0, t.jsx)(a.default, {
                            src: e.thumbnail,
                            alt: v.join(' '),
                            fill: !0,
                            className: 'object-cover',
                            sizes: '288px',
                            loading: 'lazy',
                            onError: h.applyImageFallback,
                          }),
                    }),
                  }),
                }),
                (0, t.jsxs)('div', {
                  className: 'flex items-center gap-4',
                  children: [
                    (0, t.jsx)('div', {
                      className: 'flex flex-col',
                      children: v.map((e, i) =>
                        (0, t.jsx)(
                          'span',
                          {
                            className: (0, f.cn)(
                              'text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight transition-colors duration-300',
                              s ? 'text-bluePrimary' : 'text-white'
                            ),
                            children: e,
                          },
                          i
                        )
                      ),
                    }),
                    (0, t.jsx)(r.motion.div, {
                      className:
                        'w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300',
                      initial: !1,
                      animate: {
                        rotate: s ? 0 : -45,
                        backgroundColor: s ? '#8705f2' : '#0048ff',
                      },
                      transition: { duration: 0.5, ease: p.GHOST_EASE },
                      children: (0, t.jsx)(m.ArrowUpRight, {
                        className: 'w-4 h-4 lg:w-5 lg:h-5 text-white',
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, t.jsxs)('div', {
              className:
                'lg:hidden flex items-center justify-between py-6 border-t border-blueAccent/40',
              children: [
                (0, t.jsx)('div', {
                  className: 'flex flex-col',
                  children: v.map((e, i) =>
                    (0, t.jsx)(
                      'span',
                      {
                        className:
                          'text-xl font-normal tracking-tight text-white',
                        children: e,
                      },
                      i
                    )
                  ),
                }),
                (0, t.jsx)('div', {
                  className:
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#0048ff]',
                  children: (0, t.jsx)(m.ArrowUpRight, {
                    className: 'w-4 h-4 text-white',
                  }),
                }),
              ],
            }),
          ],
        }),
      });
    }
    let v = [
      {
        id: 'brand-campaigns',
        title: 'Brand & Campaigns',
        slug: 'branding',
        thumbnail: (0, h.getAssetUrl)(
          'site-assets/home/showcase/Branding-Project.webp'
        ),
        alignment: 'right',
        showLabel: !0,
      },
      {
        id: 'videos-motions',
        title: 'Videos & Motions',
        slug: 'motion',
        thumbnail: (0, h.getAssetUrl)(
          'site-assets/home/showcase/show.video.mp4'
        ),
        alignment: 'center',
        showLabel: !1,
      },
      {
        id: 'websites-tech',
        title: ['Web Campaigns,', 'Websites & Tech'],
        slug: 'web',
        thumbnail: (0, h.getAssetUrl)(
          'site-assets/home/showcase/webdesigner-2.gif'
        ),
        alignment: 'left',
        showLabel: !1,
      },
    ];
    function b() {
      let e = (0, i.useRef)(null),
        [a, o] = (0, i.useState)(null),
        c = !!(0, n.useReducedMotion)();
      return (0, t.jsx)('section', {
        id: 'portfolio-showcase',
        ref: e,
        className: 'relative w-full bg-background py-20 lg:py-32',
        'aria-labelledby': 'portfolio-showcase-heading',
        children: (0, t.jsxs)(l.Container, {
          children: [
            (0, t.jsx)(r.motion.header, {
              initial: c ? { opacity: 1 } : { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: !0 },
              transition: { duration: 0.7, ease: p.GHOST_EASE },
              className: 'text-center mb-10 lg:mb-14',
              children: (0, t.jsxs)('h2', {
                id: 'portfolio-showcase-heading',
                className:
                  'text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight',
                children: [
                  (0, t.jsxs)('span', {
                    className: 'text-bluePrimary italic font-light',
                    children: ['portfólio', ' '],
                  }),
                  (0, t.jsx)('span', {
                    className: 'text-white font-bold',
                    children: 'showcase',
                  }),
                ],
              }),
            }),
            (0, t.jsxs)('div', {
              className: 'relative flex flex-col',
              children: [
                v.map((e, i) =>
                  (0, t.jsx)(
                    g,
                    {
                      category: e,
                      index: i,
                      isHovered: a === e.id,
                      onHover: o,
                      prefersReducedMotion: c,
                    },
                    e.id
                  )
                ),
                (0, t.jsx)('div', {
                  className: 'border-t border-blueAccent/40',
                }),
              ],
            }),
            (0, t.jsx)(r.motion.div, {
              initial: c ? { opacity: 1 } : { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: !0 },
              transition: { duration: 0.6, ease: p.GHOST_EASE, delay: 0.4 },
              className: 'flex justify-center mt-12 lg:mt-16',
              children: (0, t.jsx)(s.default, {
                href: '/#contact',
                text: "let's build something great",
                className: 'relative',
              }),
            }),
          ],
        }),
      });
    }
    e.s(['default', () => b], 38402);
  },
  35081,
  (e) => {
    'use strict';
    var t = e.i(91047),
      i = e.i(943),
      r = e.i(62897);
    function n({ src: e }) {
      let [n, s] = (0, i.useState)(!0),
        [l, a] = (0, i.useState)(!1),
        [o, c] = (0, i.useState)('hd'),
        d = (0, i.useRef)(null),
        u = (0, i.useRef)(null),
        m = (0, i.useRef)(null);
      ((0, i.useEffect)(() => {
        if (!u.current) return;
        let e = new IntersectionObserver(
          ([t]) => {
            t.isIntersecting && (a(!0), e.disconnect());
          },
          { rootMargin: '200px' }
        );
        return (e.observe(u.current), () => e.disconnect());
      }, []),
        (0, i.useEffect)(() => {
          if (!d.current) return;
          let e = new IntersectionObserver(
            ([e]) => {
              e.isIntersecting ? s(!1) : s(!0);
            },
            { threshold: 0.5 }
          );
          return (e.observe(d.current), () => e.disconnect());
        }, []),
        (0, i.useEffect)(() => {
          let e = navigator;
          e.connection &&
            ('4g' === e.connection.effectiveType ||
            '5g' === e.connection.effectiveType
              ? c('hd')
              : c('sd'));
        }, []),
        (0, i.useEffect)(() => {
          m.current && (m.current.muted = n);
        }, [n]));
      let f = 'hd' === o ? e : e.replace('.mp4', '-720p.mp4'),
        p = e.replace('.mp4', '-poster.jpg');
      return (0, t.jsx)(r.motion.section, {
        ref: d,
        className: 'video-manifesto w-full overflow-hidden rounded-[2px]',
        initial: { opacity: 0, scale: 1.1, rotate: -1, y: 40 },
        whileInView: { opacity: 1, scale: 1, rotate: 0, y: 0 },
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        viewport: { once: !0, amount: 0.2 },
        children: (0, t.jsx)('div', {
          ref: u,
          className: 'video-wrapper relative w-full aspect-video',
          children: l
            ? (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)(r.motion.video, {
                    ref: m,
                    className: 'w-full h-full object-cover',
                    src: f,
                    poster: p,
                    autoPlay: !0,
                    loop: !0,
                    muted: n,
                    playsInline: !0,
                    preload: 'metadata',
                    'aria-label':
                      'Vídeo showreel demonstrando projetos de design gráfico',
                  }),
                  (0, t.jsx)('div', {
                    className:
                      'video-overlay absolute inset-0 pointer-events-none',
                  }),
                  (0, t.jsx)('button', {
                    type: 'button',
                    className:
                      'toggle-sound absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors focus-visible:outline-2 focus-visible:outline-[#4fe6ff] focus-visible:outline-offset-2',
                    onClick: () => s((e) => !e),
                    'aria-label': n
                      ? 'Ativar som do vídeo'
                      : 'Desativar som do vídeo',
                    'aria-pressed': !n,
                    children: n
                      ? (0, t.jsxs)('svg', {
                          className: 'w-5 h-5',
                          fill: 'none',
                          viewBox: '0 0 24 24',
                          stroke: 'currentColor',
                          children: [
                            (0, t.jsx)('path', {
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                              strokeWidth: 2,
                              d: 'M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z',
                            }),
                            (0, t.jsx)('path', {
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                              strokeWidth: 2,
                              d: 'M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2',
                            }),
                          ],
                        })
                      : (0, t.jsx)('svg', {
                          className: 'w-5 h-5',
                          fill: 'none',
                          viewBox: '0 0 24 24',
                          stroke: 'currentColor',
                          children: (0, t.jsx)('path', {
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2,
                            d: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z',
                          }),
                        }),
                  }),
                ],
              })
            : (0, t.jsx)('div', {
                className:
                  'w-full h-full bg-linear-to-br from-neutral-900 to-neutral-800 animate-pulse',
              }),
        }),
      });
    }
    e.s(['VideoManifesto', () => n]);
  },
  63316,
  (e) => {
    e.v((t) =>
      Promise.all(
        [
          'static/chunks/8339a25d63410545.js',
          'static/chunks/abf24408f194d284.js',
        ].map((t) => e.l(t))
      ).then(() => t(47908))
    );
  },
]);

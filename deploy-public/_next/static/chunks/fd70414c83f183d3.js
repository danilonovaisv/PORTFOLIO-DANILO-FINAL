(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  674,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'warnOnce', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = (e) => {};
  },
  75858,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'useMergedRef', {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let n = e.r(84833);
    function o(e, t) {
      let r = (0, n.useRef)(null),
        o = (0, n.useRef)(null);
      return (0, n.useCallback)(
        (n) => {
          if (null === n) {
            let e = r.current;
            e && ((r.current = null), e());
            let t = o.current;
            t && ((o.current = null), t());
          } else (e && (r.current = u(e, n)), t && (o.current = u(t, n)));
        },
        [e, t]
      );
    }
    function u(e, t) {
      if ('function' != typeof e)
        return (
          (e.current = t),
          () => {
            e.current = null;
          }
        );
      {
        let r = e(t);
        return 'function' == typeof r ? r : () => e(null);
      }
    }
    ('function' == typeof r.default ||
      ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  76767,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      assign: function () {
        return l;
      },
      searchParamsToUrlQuery: function () {
        return u;
      },
      urlQueryToSearchParams: function () {
        return i;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    function u(e) {
      let t = {};
      for (let [r, n] of e.entries()) {
        let e = t[r];
        void 0 === e
          ? (t[r] = n)
          : Array.isArray(e)
            ? e.push(n)
            : (t[r] = [e, n]);
      }
      return t;
    }
    function a(e) {
      return 'string' == typeof e
        ? e
        : ('number' != typeof e || isNaN(e)) && 'boolean' != typeof e
          ? ''
          : String(e);
    }
    function i(e) {
      let t = new URLSearchParams();
      for (let [r, n] of Object.entries(e))
        if (Array.isArray(n)) for (let e of n) t.append(r, a(e));
        else t.set(r, a(n));
      return t;
    }
    function l(e, ...t) {
      for (let r of t) {
        for (let t of r.keys()) e.delete(t);
        for (let [t, n] of r.entries()) e.append(t, n);
      }
      return e;
    }
  },
  77467,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      formatUrl: function () {
        return i;
      },
      formatWithValidation: function () {
        return s;
      },
      urlObjectKeys: function () {
        return l;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let u = e.r(82710)._(e.r(76767)),
      a = /https?|ftp|gopher|file/;
    function i(e) {
      let { auth: t, hostname: r } = e,
        n = e.protocol || '',
        o = e.pathname || '',
        i = e.hash || '',
        l = e.query || '',
        s = !1;
      ((t = t ? encodeURIComponent(t).replace(/%3A/i, ':') + '@' : ''),
        e.host
          ? (s = t + e.host)
          : r &&
            ((s = t + (~r.indexOf(':') ? `[${r}]` : r)),
            e.port && (s += ':' + e.port)),
        l && 'object' == typeof l && (l = String(u.urlQueryToSearchParams(l))));
      let c = e.search || (l && `?${l}`) || '';
      return (
        n && !n.endsWith(':') && (n += ':'),
        e.slashes || ((!n || a.test(n)) && !1 !== s)
          ? ((s = '//' + (s || '')), o && '/' !== o[0] && (o = '/' + o))
          : s || (s = ''),
        i && '#' !== i[0] && (i = '#' + i),
        c && '?' !== c[0] && (c = '?' + c),
        (o = o.replace(/[?#]/g, encodeURIComponent)),
        (c = c.replace('#', '%23')),
        `${n}${s}${o}${c}${i}`
      );
    }
    let l = [
      'auth',
      'hash',
      'host',
      'hostname',
      'href',
      'path',
      'pathname',
      'port',
      'protocol',
      'query',
      'search',
      'slashes',
    ];
    function s(e) {
      return i(e);
    }
  },
  92099,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      DecodeError: function () {
        return m;
      },
      MiddlewareNotFoundError: function () {
        return j;
      },
      MissingStaticPage: function () {
        return P;
      },
      NormalizeError: function () {
        return b;
      },
      PageNotFoundError: function () {
        return v;
      },
      SP: function () {
        return y;
      },
      ST: function () {
        return g;
      },
      WEB_VITALS: function () {
        return u;
      },
      execOnce: function () {
        return a;
      },
      getDisplayName: function () {
        return f;
      },
      getLocationOrigin: function () {
        return s;
      },
      getURL: function () {
        return c;
      },
      isAbsoluteUrl: function () {
        return l;
      },
      isResSent: function () {
        return d;
      },
      loadGetInitialProps: function () {
        return h;
      },
      normalizeRepeatedSlashes: function () {
        return p;
      },
      stringifyError: function () {
        return O;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let u = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'];
    function a(e) {
      let t,
        r = !1;
      return (...n) => (r || ((r = !0), (t = e(...n))), t);
    }
    let i = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
      l = (e) => i.test(e);
    function s() {
      let { protocol: e, hostname: t, port: r } = window.location;
      return `${e}//${t}${r ? ':' + r : ''}`;
    }
    function c() {
      let { href: e } = window.location,
        t = s();
      return e.substring(t.length);
    }
    function f(e) {
      return 'string' == typeof e ? e : e.displayName || e.name || 'Unknown';
    }
    function d(e) {
      return e.finished || e.headersSent;
    }
    function p(e) {
      let t = e.split('?');
      return (
        t[0].replace(/\\/g, '/').replace(/\/\/+/g, '/') +
        (t[1] ? `?${t.slice(1).join('?')}` : '')
      );
    }
    async function h(e, t) {
      let r = t.res || (t.ctx && t.ctx.res);
      if (!e.getInitialProps)
        return t.ctx && t.Component
          ? { pageProps: await h(t.Component, t.ctx) }
          : {};
      let n = await e.getInitialProps(t);
      if (r && d(r)) return n;
      if (!n)
        throw Object.defineProperty(
          Error(
            `"${f(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`
          ),
          '__NEXT_ERROR_CODE',
          { value: 'E394', enumerable: !1, configurable: !0 }
        );
      return n;
    }
    let y = 'u' > typeof performance,
      g =
        y &&
        ['mark', 'measure', 'getEntriesByName'].every(
          (e) => 'function' == typeof performance[e]
        );
    class m extends Error {}
    class b extends Error {}
    class v extends Error {
      constructor(e) {
        (super(),
          (this.code = 'ENOENT'),
          (this.name = 'PageNotFoundError'),
          (this.message = `Cannot find module for page: ${e}`));
      }
    }
    class P extends Error {
      constructor(e, t) {
        (super(),
          (this.message = `Failed to load static file for page: ${e} ${t}`));
      }
    }
    class j extends Error {
      constructor() {
        (super(),
          (this.code = 'ENOENT'),
          (this.message = 'Cannot find the middleware module'));
      }
    }
    function O(e) {
      return JSON.stringify({ message: e.message, stack: e.stack });
    }
  },
  46922,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'isLocalURL', {
        enumerable: !0,
        get: function () {
          return u;
        },
      }));
    let n = e.r(92099),
      o = e.r(31149);
    function u(e) {
      if (!(0, n.isAbsoluteUrl)(e)) return !0;
      try {
        let t = (0, n.getLocationOrigin)(),
          r = new URL(e, t);
        return r.origin === t && (0, o.hasBasePath)(r.pathname);
      } catch (e) {
        return !1;
      }
    }
  },
  62651,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'errorOnce', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = (e) => {};
  },
  21998,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      default: function () {
        return m;
      },
      useLinkStatus: function () {
        return v;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let u = e.r(82710),
      a = e.r(96148),
      i = u._(e.r(84833)),
      l = e.r(77467),
      s = e.r(29035),
      c = e.r(75858),
      f = e.r(92099),
      d = e.r(58405);
    e.r(674);
    let p = e.r(70738),
      h = e.r(46922),
      y = e.r(84887);
    function g(e) {
      return 'string' == typeof e ? e : (0, l.formatUrl)(e);
    }
    function m(t) {
      var r;
      let n,
        o,
        u,
        [l, m] = (0, i.useOptimistic)(p.IDLE_LINK_STATUS),
        v = (0, i.useRef)(null),
        {
          href: P,
          as: j,
          children: O,
          prefetch: _ = null,
          passHref: x,
          replace: E,
          shallow: T,
          scroll: S,
          onClick: C,
          onMouseEnter: N,
          onTouchStart: R,
          legacyBehavior: w = !1,
          onNavigate: L,
          ref: M,
          unstable_dynamicOnHover: A,
          ...U
        } = t;
      ((n = O),
        w &&
          ('string' == typeof n || 'number' == typeof n) &&
          (n = (0, a.jsx)('a', { children: n })));
      let k = i.default.useContext(s.AppRouterContext),
        $ = !1 !== _,
        I =
          !1 !== _
            ? null === (r = _) || 'auto' === r
              ? y.FetchStrategy.PPR
              : y.FetchStrategy.Full
            : y.FetchStrategy.PPR,
        { href: F, as: B } = i.default.useMemo(() => {
          let e = g(P);
          return { href: e, as: j ? g(j) : e };
        }, [P, j]);
      if (w) {
        if (n?.$$typeof === Symbol.for('react.lazy'))
          throw Object.defineProperty(
            Error(
              "`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E863', enumerable: !1, configurable: !0 }
          );
        o = i.default.Children.only(n);
      }
      let D = w ? o && 'object' == typeof o && o.ref : M,
        K = i.default.useCallback(
          (e) => (
            null !== k &&
              (v.current = (0, p.mountLinkInstance)(e, F, k, I, $, m)),
            () => {
              (v.current &&
                ((0, p.unmountLinkForCurrentNavigation)(v.current),
                (v.current = null)),
                (0, p.unmountPrefetchableInstance)(e));
            }
          ),
          [$, F, k, I, m]
        ),
        z = {
          ref: (0, c.useMergedRef)(K, D),
          onClick(t) {
            (w || 'function' != typeof C || C(t),
              w &&
                o.props &&
                'function' == typeof o.props.onClick &&
                o.props.onClick(t),
              !k ||
                t.defaultPrevented ||
                (function (t, r, n, o, u, a, l) {
                  if ('u' > typeof window) {
                    let s,
                      { nodeName: c } = t.currentTarget;
                    if (
                      ('A' === c.toUpperCase() &&
                        (((s = t.currentTarget.getAttribute('target')) &&
                          '_self' !== s) ||
                          t.metaKey ||
                          t.ctrlKey ||
                          t.shiftKey ||
                          t.altKey ||
                          (t.nativeEvent && 2 === t.nativeEvent.which))) ||
                      t.currentTarget.hasAttribute('download')
                    )
                      return;
                    if (!(0, h.isLocalURL)(r)) {
                      u && (t.preventDefault(), location.replace(r));
                      return;
                    }
                    if ((t.preventDefault(), l)) {
                      let e = !1;
                      if (
                        (l({
                          preventDefault: () => {
                            e = !0;
                          },
                        }),
                        e)
                      )
                        return;
                    }
                    let { dispatchNavigateAction: f } = e.r(27444);
                    i.default.startTransition(() => {
                      f(n || r, u ? 'replace' : 'push', a ?? !0, o.current);
                    });
                  }
                })(t, F, B, v, E, S, L));
          },
          onMouseEnter(e) {
            (w || 'function' != typeof N || N(e),
              w &&
                o.props &&
                'function' == typeof o.props.onMouseEnter &&
                o.props.onMouseEnter(e),
              k && $ && (0, p.onNavigationIntent)(e.currentTarget, !0 === A));
          },
          onTouchStart: function (e) {
            (w || 'function' != typeof R || R(e),
              w &&
                o.props &&
                'function' == typeof o.props.onTouchStart &&
                o.props.onTouchStart(e),
              k && $ && (0, p.onNavigationIntent)(e.currentTarget, !0 === A));
          },
        };
      return (
        (0, f.isAbsoluteUrl)(B)
          ? (z.href = B)
          : (w && !x && ('a' !== o.type || 'href' in o.props)) ||
            (z.href = (0, d.addBasePath)(B)),
        (u = w
          ? i.default.cloneElement(o, z)
          : (0, a.jsx)('a', { ...U, ...z, children: n })),
        (0, a.jsx)(b.Provider, { value: l, children: u })
      );
    }
    e.r(62651);
    let b = (0, i.createContext)(p.IDLE_LINK_STATUS),
      v = () => (0, i.useContext)(b);
    ('function' == typeof r.default ||
      ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  66924,
  (e) => {
    'use strict';
    var t = e.i(96148),
      r = e.i(84833),
      n = e.i(21998);
    function o({ error: e, reset: o }) {
      return (
        (0, r.useEffect)(() => {
          console.error('Global error:', e);
        }, [e]),
        (0, t.jsx)('html', {
          children: (0, t.jsx)('body', {
            className: 'bg-background text-foreground',
            children: (0, t.jsxs)('div', {
              className:
                'flex min-h-screen flex-col items-center justify-center p-4',
              children: [
                (0, t.jsx)('h2', {
                  className: 'mb-4 text-2xl font-bold text-destructive',
                  children: 'Ops! Algo deu errado.',
                }),
                (0, t.jsx)('p', {
                  className: 'mb-4 text-muted-foreground',
                  children: e.message || 'Ocorreu um erro na aplicação.',
                }),
                (0, t.jsxs)('div', {
                  className: 'flex gap-4',
                  children: [
                    (0, t.jsx)('button', {
                      onClick: () => o(),
                      className:
                        'rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600',
                      children: 'Tentar novamente',
                    }),
                    (0, t.jsx)(n.default, {
                      href: '/',
                      className:
                        'rounded bg-secondary px-4 py-2 text-white hover:bg-secondary/80',
                      children: 'Voltar para Home',
                    }),
                  ],
                }),
              ],
            }),
          }),
        })
      );
    }
    e.s(['default', () => o]);
  },
]);

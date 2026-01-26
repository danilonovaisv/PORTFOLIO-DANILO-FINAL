module.exports = [
  9254,
  (e, t, r) => {
    'use strict';
    var n = Object.defineProperty,
      i = Object.getOwnPropertyDescriptor,
      s = Object.getOwnPropertyNames,
      a = Object.prototype.hasOwnProperty,
      o = {},
      l = {
        RequestCookies: () => g,
        ResponseCookies: () => m,
        parseCookie: () => h,
        parseSetCookie: () => d,
        stringifyCookie: () => c,
      };
    for (var u in l) n(o, u, { get: l[u], enumerable: !0 });
    function c(e) {
      var t;
      let r = [
          'path' in e && e.path && `Path=${e.path}`,
          'expires' in e &&
            (e.expires || 0 === e.expires) &&
            `Expires=${('number' == typeof e.expires ? new Date(e.expires) : e.expires).toUTCString()}`,
          'maxAge' in e && 'number' == typeof e.maxAge && `Max-Age=${e.maxAge}`,
          'domain' in e && e.domain && `Domain=${e.domain}`,
          'secure' in e && e.secure && 'Secure',
          'httpOnly' in e && e.httpOnly && 'HttpOnly',
          'sameSite' in e && e.sameSite && `SameSite=${e.sameSite}`,
          'partitioned' in e && e.partitioned && 'Partitioned',
          'priority' in e && e.priority && `Priority=${e.priority}`,
        ].filter(Boolean),
        n = `${e.name}=${encodeURIComponent(null != (t = e.value) ? t : '')}`;
      return 0 === r.length ? n : `${n}; ${r.join('; ')}`;
    }
    function h(e) {
      let t = new Map();
      for (let r of e.split(/; */)) {
        if (!r) continue;
        let e = r.indexOf('=');
        if (-1 === e) {
          t.set(r, 'true');
          continue;
        }
        let [n, i] = [r.slice(0, e), r.slice(e + 1)];
        try {
          t.set(n, decodeURIComponent(null != i ? i : 'true'));
        } catch {}
      }
      return t;
    }
    function d(e) {
      if (!e) return;
      let [[t, r], ...n] = h(e),
        {
          domain: i,
          expires: s,
          httponly: a,
          maxage: o,
          path: l,
          samesite: u,
          secure: c,
          partitioned: d,
          priority: g,
        } = Object.fromEntries(
          n.map(([e, t]) => [e.toLowerCase().replace(/-/g, ''), t])
        );
      {
        var m,
          y,
          b = {
            name: t,
            value: decodeURIComponent(r),
            domain: i,
            ...(s && { expires: new Date(s) }),
            ...(a && { httpOnly: !0 }),
            ...('string' == typeof o && { maxAge: Number(o) }),
            path: l,
            ...(u && {
              sameSite: p.includes((m = (m = u).toLowerCase())) ? m : void 0,
            }),
            ...(c && { secure: !0 }),
            ...(g && {
              priority: f.includes((y = (y = g).toLowerCase())) ? y : void 0,
            }),
            ...(d && { partitioned: !0 }),
          };
        let e = {};
        for (let t in b) b[t] && (e[t] = b[t]);
        return e;
      }
    }
    t.exports = ((e, t, r, o) => {
      if ((t && 'object' == typeof t) || 'function' == typeof t)
        for (let l of s(t))
          a.call(e, l) ||
            l === r ||
            n(e, l, {
              get: () => t[l],
              enumerable: !(o = i(t, l)) || o.enumerable,
            });
      return e;
    })(n({}, '__esModule', { value: !0 }), o);
    var p = ['strict', 'lax', 'none'],
      f = ['low', 'medium', 'high'],
      g = class {
        constructor(e) {
          ((this._parsed = new Map()), (this._headers = e));
          const t = e.get('cookie');
          if (t)
            for (const [e, r] of h(t))
              this._parsed.set(e, { name: e, value: r });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e) {
          let t = 'string' == typeof e[0] ? e[0] : e[0].name;
          return this._parsed.get(t);
        }
        getAll(...e) {
          var t;
          let r = Array.from(this._parsed);
          if (!e.length) return r.map(([e, t]) => t);
          let n =
            'string' == typeof e[0]
              ? e[0]
              : null == (t = e[0])
                ? void 0
                : t.name;
          return r.filter(([e]) => e === n).map(([e, t]) => t);
        }
        has(e) {
          return this._parsed.has(e);
        }
        set(...e) {
          let [t, r] = 1 === e.length ? [e[0].name, e[0].value] : e,
            n = this._parsed;
          return (
            n.set(t, { name: t, value: r }),
            this._headers.set(
              'cookie',
              Array.from(n)
                .map(([e, t]) => c(t))
                .join('; ')
            ),
            this
          );
        }
        delete(e) {
          let t = this._parsed,
            r = Array.isArray(e) ? e.map((e) => t.delete(e)) : t.delete(e);
          return (
            this._headers.set(
              'cookie',
              Array.from(t)
                .map(([e, t]) => c(t))
                .join('; ')
            ),
            r
          );
        }
        clear() {
          return (this.delete(Array.from(this._parsed.keys())), this);
        }
        [Symbol.for('edge-runtime.inspect.custom')]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()]
            .map((e) => `${e.name}=${encodeURIComponent(e.value)}`)
            .join('; ');
        }
      },
      m = class {
        constructor(e) {
          var t, r, n;
          ((this._parsed = new Map()), (this._headers = e));
          const i =
            null !=
            (n =
              null != (r = null == (t = e.getSetCookie) ? void 0 : t.call(e))
                ? r
                : e.get('set-cookie'))
              ? n
              : [];
          for (const e of Array.isArray(i)
            ? i
            : (function (e) {
                if (!e) return [];
                var t,
                  r,
                  n,
                  i,
                  s,
                  a = [],
                  o = 0;
                function l() {
                  for (; o < e.length && /\s/.test(e.charAt(o)); ) o += 1;
                  return o < e.length;
                }
                for (; o < e.length; ) {
                  for (t = o, s = !1; l(); )
                    if (',' === (r = e.charAt(o))) {
                      for (
                        n = o, o += 1, l(), i = o;
                        o < e.length &&
                        '=' !== (r = e.charAt(o)) &&
                        ';' !== r &&
                        ',' !== r;
                      )
                        o += 1;
                      o < e.length && '=' === e.charAt(o)
                        ? ((s = !0),
                          (o = i),
                          a.push(e.substring(t, n)),
                          (t = o))
                        : (o = n + 1);
                    } else o += 1;
                  (!s || o >= e.length) && a.push(e.substring(t, e.length));
                }
                return a;
              })(i)) {
            const t = d(e);
            t && this._parsed.set(t.name, t);
          }
        }
        get(...e) {
          let t = 'string' == typeof e[0] ? e[0] : e[0].name;
          return this._parsed.get(t);
        }
        getAll(...e) {
          var t;
          let r = Array.from(this._parsed.values());
          if (!e.length) return r;
          let n =
            'string' == typeof e[0]
              ? e[0]
              : null == (t = e[0])
                ? void 0
                : t.name;
          return r.filter((e) => e.name === n);
        }
        has(e) {
          return this._parsed.has(e);
        }
        set(...e) {
          let [t, r, n] = 1 === e.length ? [e[0].name, e[0].value, e[0]] : e,
            i = this._parsed;
          return (
            i.set(
              t,
              (function (e = { name: '', value: '' }) {
                return (
                  'number' == typeof e.expires &&
                    (e.expires = new Date(e.expires)),
                  e.maxAge &&
                    (e.expires = new Date(Date.now() + 1e3 * e.maxAge)),
                  (null === e.path || void 0 === e.path) && (e.path = '/'),
                  e
                );
              })({ name: t, value: r, ...n })
            ),
            (function (e, t) {
              for (let [, r] of (t.delete('set-cookie'), e)) {
                let e = c(r);
                t.append('set-cookie', e);
              }
            })(i, this._headers),
            this
          );
        }
        delete(...e) {
          let [t, r] = 'string' == typeof e[0] ? [e[0]] : [e[0].name, e[0]];
          return this.set({ ...r, name: t, value: '', expires: new Date(0) });
        }
        [Symbol.for('edge-runtime.inspect.custom')]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(c).join('; ');
        }
      };
  },
  80317,
  (e) => {
    'use strict';
    function t(e) {
      return Symbol.for(e);
    }
    var r,
      n,
      i,
      s,
      a,
      o,
      l,
      u,
      c,
      h,
      d,
      p,
      f,
      g = new (function e(t) {
        var r = this;
        ((r._currentContext = t ? new Map(t) : new Map()),
          (r.getValue = function (e) {
            return r._currentContext.get(e);
          }),
          (r.setValue = function (t, n) {
            var i = new e(r._currentContext);
            return (i._currentContext.set(t, n), i);
          }),
          (r.deleteValue = function (t) {
            var n = new e(r._currentContext);
            return (n._currentContext.delete(t), n);
          }));
      })(),
      m = function (e, t) {
        var r = 'function' == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n,
          i,
          s = r.call(e),
          a = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
            a.push(n.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            n && !n.done && (r = s.return) && r.call(s);
          } finally {
            if (i) throw i.error;
          }
        }
        return a;
      },
      y = function (e, t, r) {
        if (r || 2 == arguments.length)
          for (var n, i = 0, s = t.length; i < s; i++)
            (!n && i in t) ||
              (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
        return e.concat(n || Array.prototype.slice.call(t));
      },
      b = (function () {
        function e() {}
        return (
          (e.prototype.active = function () {
            return g;
          }),
          (e.prototype.with = function (e, t, r) {
            for (var n = [], i = 3; i < arguments.length; i++)
              n[i - 3] = arguments[i];
            return t.call.apply(t, y([r], m(n), !1));
          }),
          (e.prototype.bind = function (e, t) {
            return t;
          }),
          (e.prototype.enable = function () {
            return this;
          }),
          (e.prototype.disable = function () {
            return this;
          }),
          e
        );
      })(),
      v = 'object' == typeof globalThis ? globalThis : e.g,
      w = '1.9.0',
      _ = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/,
      E = (function (e) {
        var t = new Set([e]),
          r = new Set(),
          n = e.match(_);
        if (!n)
          return function () {
            return !1;
          };
        var i = { major: +n[1], minor: +n[2], patch: +n[3], prerelease: n[4] };
        if (null != i.prerelease)
          return function (t) {
            return t === e;
          };
        function s(e) {
          return (r.add(e), !1);
        }
        return function (e) {
          if (t.has(e)) return !0;
          if (r.has(e)) return !1;
          var n = e.match(_);
          if (!n) return s(e);
          var a = {
            major: +n[1],
            minor: +n[2],
            patch: +n[3],
            prerelease: n[4],
          };
          if (null != a.prerelease || i.major !== a.major) return s(e);
          if (0 === i.major)
            return i.minor === a.minor && i.patch <= a.patch
              ? (t.add(e), !0)
              : s(e);
          return i.minor <= a.minor ? (t.add(e), !0) : s(e);
        };
      })(w),
      S = Symbol.for('opentelemetry.js.api.' + w.split('.')[0]);
    function R(e, t, r, n) {
      void 0 === n && (n = !1);
      var i,
        s = (v[S] = null != (i = v[S]) ? i : { version: w });
      if (!n && s[e]) {
        var a = Error(
          '@opentelemetry/api: Attempted duplicate registration of API: ' + e
        );
        return (r.error(a.stack || a.message), !1);
      }
      if (s.version !== w) {
        var a = Error(
          '@opentelemetry/api: Registration of version v' +
            s.version +
            ' for ' +
            e +
            ' does not match previously registered API v' +
            w
        );
        return (r.error(a.stack || a.message), !1);
      }
      return (
        (s[e] = t),
        r.debug(
          '@opentelemetry/api: Registered a global for ' + e + ' v' + w + '.'
        ),
        !0
      );
    }
    function O(e) {
      var t,
        r,
        n = null == (t = v[S]) ? void 0 : t.version;
      if (n && E(n)) return null == (r = v[S]) ? void 0 : r[e];
    }
    function T(e, t) {
      t.debug(
        '@opentelemetry/api: Unregistering a global for ' + e + ' v' + w + '.'
      );
      var r = v[S];
      r && delete r[e];
    }
    var k = function (e, t) {
        var r = 'function' == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n,
          i,
          s = r.call(e),
          a = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
            a.push(n.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            n && !n.done && (r = s.return) && r.call(s);
          } finally {
            if (i) throw i.error;
          }
        }
        return a;
      },
      P = function (e, t, r) {
        if (r || 2 == arguments.length)
          for (var n, i = 0, s = t.length; i < s; i++)
            (!n && i in t) ||
              (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
        return e.concat(n || Array.prototype.slice.call(t));
      },
      x = (function () {
        function e(e) {
          this._namespace = e.namespace || 'DiagComponentLogger';
        }
        return (
          (e.prototype.debug = function () {
            for (var e = [], t = 0; t < arguments.length; t++)
              e[t] = arguments[t];
            return A('debug', this._namespace, e);
          }),
          (e.prototype.error = function () {
            for (var e = [], t = 0; t < arguments.length; t++)
              e[t] = arguments[t];
            return A('error', this._namespace, e);
          }),
          (e.prototype.info = function () {
            for (var e = [], t = 0; t < arguments.length; t++)
              e[t] = arguments[t];
            return A('info', this._namespace, e);
          }),
          (e.prototype.warn = function () {
            for (var e = [], t = 0; t < arguments.length; t++)
              e[t] = arguments[t];
            return A('warn', this._namespace, e);
          }),
          (e.prototype.verbose = function () {
            for (var e = [], t = 0; t < arguments.length; t++)
              e[t] = arguments[t];
            return A('verbose', this._namespace, e);
          }),
          e
        );
      })();
    function A(e, t, r) {
      var n = O('diag');
      if (n) return (r.unshift(t), n[e].apply(n, P([], k(r), !1)));
    }
    (((l = r || (r = {}))[(l.NONE = 0)] = 'NONE'),
      (l[(l.ERROR = 30)] = 'ERROR'),
      (l[(l.WARN = 50)] = 'WARN'),
      (l[(l.INFO = 60)] = 'INFO'),
      (l[(l.DEBUG = 70)] = 'DEBUG'),
      (l[(l.VERBOSE = 80)] = 'VERBOSE'),
      (l[(l.ALL = 9999)] = 'ALL'));
    var C = function (e, t) {
        var r = 'function' == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n,
          i,
          s = r.call(e),
          a = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
            a.push(n.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            n && !n.done && (r = s.return) && r.call(s);
          } finally {
            if (i) throw i.error;
          }
        }
        return a;
      },
      I = function (e, t, r) {
        if (r || 2 == arguments.length)
          for (var n, i = 0, s = t.length; i < s; i++)
            (!n && i in t) ||
              (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
        return e.concat(n || Array.prototype.slice.call(t));
      },
      N = (function () {
        function e() {
          function e(e) {
            return function () {
              for (var t = [], r = 0; r < arguments.length; r++)
                t[r] = arguments[r];
              var n = O('diag');
              if (n) return n[e].apply(n, I([], C(t), !1));
            };
          }
          var t = this;
          ((t.setLogger = function (e, n) {
            if ((void 0 === n && (n = { logLevel: r.INFO }), e === t)) {
              var i,
                s,
                a,
                o = Error(
                  'Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation'
                );
              return (t.error(null != (i = o.stack) ? i : o.message), !1);
            }
            'number' == typeof n && (n = { logLevel: n });
            var l = O('diag'),
              u = (function (e, t) {
                function n(r, n) {
                  var i = t[r];
                  return 'function' == typeof i && e >= n
                    ? i.bind(t)
                    : function () {};
                }
                return (
                  e < r.NONE ? (e = r.NONE) : e > r.ALL && (e = r.ALL),
                  (t = t || {}),
                  {
                    error: n('error', r.ERROR),
                    warn: n('warn', r.WARN),
                    info: n('info', r.INFO),
                    debug: n('debug', r.DEBUG),
                    verbose: n('verbose', r.VERBOSE),
                  }
                );
              })(null != (s = n.logLevel) ? s : r.INFO, e);
            if (l && !n.suppressOverrideMessage) {
              var c =
                null != (a = Error().stack)
                  ? a
                  : '<failed to generate stacktrace>';
              (l.warn('Current logger will be overwritten from ' + c),
                u.warn(
                  'Current logger will overwrite one already registered from ' +
                    c
                ));
            }
            return R('diag', u, t, !0);
          }),
            (t.disable = function () {
              T('diag', t);
            }),
            (t.createComponentLogger = function (e) {
              return new x(e);
            }),
            (t.verbose = e('verbose')),
            (t.debug = e('debug')),
            (t.info = e('info')),
            (t.warn = e('warn')),
            (t.error = e('error')));
        }
        return (
          (e.instance = function () {
            return (
              this._instance || (this._instance = new e()),
              this._instance
            );
          }),
          e
        );
      })(),
      j = function (e, t) {
        var r = 'function' == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n,
          i,
          s = r.call(e),
          a = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
            a.push(n.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            n && !n.done && (r = s.return) && r.call(s);
          } finally {
            if (i) throw i.error;
          }
        }
        return a;
      },
      D = function (e, t, r) {
        if (r || 2 == arguments.length)
          for (var n, i = 0, s = t.length; i < s; i++)
            (!n && i in t) ||
              (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
        return e.concat(n || Array.prototype.slice.call(t));
      },
      $ = 'context',
      L = new b(),
      U = (function () {
        function e() {}
        return (
          (e.getInstance = function () {
            return (
              this._instance || (this._instance = new e()),
              this._instance
            );
          }),
          (e.prototype.setGlobalContextManager = function (e) {
            return R($, e, N.instance());
          }),
          (e.prototype.active = function () {
            return this._getContextManager().active();
          }),
          (e.prototype.with = function (e, t, r) {
            for (var n, i = [], s = 3; s < arguments.length; s++)
              i[s - 3] = arguments[s];
            return (n = this._getContextManager()).with.apply(
              n,
              D([e, t, r], j(i), !1)
            );
          }),
          (e.prototype.bind = function (e, t) {
            return this._getContextManager().bind(e, t);
          }),
          (e.prototype._getContextManager = function () {
            return O($) || L;
          }),
          (e.prototype.disable = function () {
            (this._getContextManager().disable(), T($, N.instance()));
          }),
          e
        );
      })(),
      M = U.getInstance(),
      B = N.instance(),
      q =
        ((u = function (e, t) {
          return (u =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            })(e, t);
        }),
        function (e, t) {
          if ('function' != typeof t && null !== t)
            throw TypeError(
              'Class extends value ' +
                String(t) +
                ' is not a constructor or null'
            );
          function r() {
            this.constructor = e;
          }
          (u(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((r.prototype = t.prototype), new r())));
        }),
      V = (function () {
        function e() {}
        return (
          (e.prototype.createGauge = function (e, t) {
            return ee;
          }),
          (e.prototype.createHistogram = function (e, t) {
            return et;
          }),
          (e.prototype.createCounter = function (e, t) {
            return Z;
          }),
          (e.prototype.createUpDownCounter = function (e, t) {
            return er;
          }),
          (e.prototype.createObservableGauge = function (e, t) {
            return ei;
          }),
          (e.prototype.createObservableCounter = function (e, t) {
            return en;
          }),
          (e.prototype.createObservableUpDownCounter = function (e, t) {
            return es;
          }),
          (e.prototype.addBatchObservableCallback = function (e, t) {}),
          (e.prototype.removeBatchObservableCallback = function (e) {}),
          e
        );
      })(),
      W = function () {},
      G = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (q(t, e), (t.prototype.add = function (e, t) {}), t);
      })(W),
      H = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (q(t, e), (t.prototype.add = function (e, t) {}), t);
      })(W),
      F = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (q(t, e), (t.prototype.record = function (e, t) {}), t);
      })(W),
      z = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (q(t, e), (t.prototype.record = function (e, t) {}), t);
      })(W),
      K = (function () {
        function e() {}
        return (
          (e.prototype.addCallback = function (e) {}),
          (e.prototype.removeCallback = function (e) {}),
          e
        );
      })(),
      X = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (q(t, e), t);
      })(K),
      J = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (q(t, e), t);
      })(K),
      Y = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (q(t, e), t);
      })(K),
      Q = new V(),
      Z = new G(),
      ee = new F(),
      et = new z(),
      er = new H(),
      en = new X(),
      ei = new J(),
      es = new Y();
    function ea() {
      return Q;
    }
    var eo = new ((function () {
        function e() {}
        return (
          (e.prototype.getMeter = function (e, t, r) {
            return Q;
          }),
          e
        );
      })())(),
      el = 'metrics',
      eu = (function () {
        function e() {}
        return (
          (e.getInstance = function () {
            return (
              this._instance || (this._instance = new e()),
              this._instance
            );
          }),
          (e.prototype.setGlobalMeterProvider = function (e) {
            return R(el, e, N.instance());
          }),
          (e.prototype.getMeterProvider = function () {
            return O(el) || eo;
          }),
          (e.prototype.getMeter = function (e, t, r) {
            return this.getMeterProvider().getMeter(e, t, r);
          }),
          (e.prototype.disable = function () {
            T(el, N.instance());
          }),
          e
        );
      })().getInstance(),
      ec = (function () {
        function e() {}
        return (
          (e.prototype.inject = function (e, t) {}),
          (e.prototype.extract = function (e, t) {
            return e;
          }),
          (e.prototype.fields = function () {
            return [];
          }),
          e
        );
      })(),
      eh = {
        get: function (e, t) {
          if (null != e) return e[t];
        },
        keys: function (e) {
          return null == e ? [] : Object.keys(e);
        },
      },
      ed = {
        set: function (e, t, r) {
          null != e && (e[t] = r);
        },
      },
      ep = t('OpenTelemetry Baggage Key');
    function ef(e) {
      return e.getValue(ep) || void 0;
    }
    function eg() {
      return ef(U.getInstance().active());
    }
    function em(e, t) {
      return e.setValue(ep, t);
    }
    function ey(e) {
      return e.deleteValue(ep);
    }
    var eb = function (e, t) {
        var r = 'function' == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n,
          i,
          s = r.call(e),
          a = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(n = s.next()).done; )
            a.push(n.value);
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            n && !n.done && (r = s.return) && r.call(s);
          } finally {
            if (i) throw i.error;
          }
        }
        return a;
      },
      ev = function (e) {
        var t = 'function' == typeof Symbol && Symbol.iterator,
          r = t && e[t],
          n = 0;
        if (r) return r.call(e);
        if (e && 'number' == typeof e.length)
          return {
            next: function () {
              return (
                e && n >= e.length && (e = void 0),
                { value: e && e[n++], done: !e }
              );
            },
          };
        throw TypeError(
          t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
        );
      },
      ew = (function () {
        function e(e) {
          this._entries = e ? new Map(e) : new Map();
        }
        return (
          (e.prototype.getEntry = function (e) {
            var t = this._entries.get(e);
            if (t) return Object.assign({}, t);
          }),
          (e.prototype.getAllEntries = function () {
            return Array.from(this._entries.entries()).map(function (e) {
              var t = eb(e, 2);
              return [t[0], t[1]];
            });
          }),
          (e.prototype.setEntry = function (t, r) {
            var n = new e(this._entries);
            return (n._entries.set(t, r), n);
          }),
          (e.prototype.removeEntry = function (t) {
            var r = new e(this._entries);
            return (r._entries.delete(t), r);
          }),
          (e.prototype.removeEntries = function () {
            for (var t, r, n = [], i = 0; i < arguments.length; i++)
              n[i] = arguments[i];
            var s = new e(this._entries);
            try {
              for (var a = ev(n), o = a.next(); !o.done; o = a.next()) {
                var l = o.value;
                s._entries.delete(l);
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                o && !o.done && (r = a.return) && r.call(a);
              } finally {
                if (t) throw t.error;
              }
            }
            return s;
          }),
          (e.prototype.clear = function () {
            return new e();
          }),
          e
        );
      })(),
      e_ = Symbol('BaggageEntryMetadata'),
      eE = N.instance();
    function eS(e) {
      return (void 0 === e && (e = {}), new ew(new Map(Object.entries(e))));
    }
    function eR(e) {
      return (
        'string' != typeof e &&
          (eE.error(
            'Cannot create baggage metadata from unknown type: ' + typeof e
          ),
          (e = '')),
        {
          __TYPE__: e_,
          toString: function () {
            return e;
          },
        }
      );
    }
    var eO = 'propagation',
      eT = new ec(),
      ek = (function () {
        function e() {
          ((this.createBaggage = eS),
            (this.getBaggage = ef),
            (this.getActiveBaggage = eg),
            (this.setBaggage = em),
            (this.deleteBaggage = ey));
        }
        return (
          (e.getInstance = function () {
            return (
              this._instance || (this._instance = new e()),
              this._instance
            );
          }),
          (e.prototype.setGlobalPropagator = function (e) {
            return R(eO, e, N.instance());
          }),
          (e.prototype.inject = function (e, t, r) {
            return (
              void 0 === r && (r = ed),
              this._getGlobalPropagator().inject(e, t, r)
            );
          }),
          (e.prototype.extract = function (e, t, r) {
            return (
              void 0 === r && (r = eh),
              this._getGlobalPropagator().extract(e, t, r)
            );
          }),
          (e.prototype.fields = function () {
            return this._getGlobalPropagator().fields();
          }),
          (e.prototype.disable = function () {
            T(eO, N.instance());
          }),
          (e.prototype._getGlobalPropagator = function () {
            return O(eO) || eT;
          }),
          e
        );
      })().getInstance();
    (((c = n || (n = {}))[(c.NONE = 0)] = 'NONE'),
      (c[(c.SAMPLED = 1)] = 'SAMPLED'));
    var eP = '0000000000000000',
      ex = '00000000000000000000000000000000',
      eA = { traceId: ex, spanId: eP, traceFlags: n.NONE },
      eC = (function () {
        function e(e) {
          (void 0 === e && (e = eA), (this._spanContext = e));
        }
        return (
          (e.prototype.spanContext = function () {
            return this._spanContext;
          }),
          (e.prototype.setAttribute = function (e, t) {
            return this;
          }),
          (e.prototype.setAttributes = function (e) {
            return this;
          }),
          (e.prototype.addEvent = function (e, t) {
            return this;
          }),
          (e.prototype.addLink = function (e) {
            return this;
          }),
          (e.prototype.addLinks = function (e) {
            return this;
          }),
          (e.prototype.setStatus = function (e) {
            return this;
          }),
          (e.prototype.updateName = function (e) {
            return this;
          }),
          (e.prototype.end = function (e) {}),
          (e.prototype.isRecording = function () {
            return !1;
          }),
          (e.prototype.recordException = function (e, t) {}),
          e
        );
      })(),
      eI = t('OpenTelemetry Context Key SPAN');
    function eN(e) {
      return e.getValue(eI) || void 0;
    }
    function ej() {
      return eN(U.getInstance().active());
    }
    function eD(e, t) {
      return e.setValue(eI, t);
    }
    function e$(e) {
      return e.deleteValue(eI);
    }
    function eL(e, t) {
      return eD(e, new eC(t));
    }
    function eU(e) {
      var t;
      return null == (t = eN(e)) ? void 0 : t.spanContext();
    }
    var eM = /^([0-9a-f]{32})$/i,
      eB = /^[0-9a-f]{16}$/i;
    function eq(e) {
      return eM.test(e) && e !== ex;
    }
    function eV(e) {
      return eB.test(e) && e !== eP;
    }
    function eW(e) {
      return eq(e.traceId) && eV(e.spanId);
    }
    function eG(e) {
      return new eC(e);
    }
    var eH = U.getInstance(),
      eF = (function () {
        function e() {}
        return (
          (e.prototype.startSpan = function (e, t, r) {
            if (
              (void 0 === r && (r = eH.active()), null == t ? void 0 : t.root)
            )
              return new eC();
            var n,
              i = r && eU(r);
            return 'object' == typeof (n = i) &&
              'string' == typeof n.spanId &&
              'string' == typeof n.traceId &&
              'number' == typeof n.traceFlags &&
              eW(i)
              ? new eC(i)
              : new eC();
          }),
          (e.prototype.startActiveSpan = function (e, t, r, n) {
            if (!(arguments.length < 2)) {
              2 == arguments.length
                ? (a = t)
                : 3 == arguments.length
                  ? ((i = t), (a = r))
                  : ((i = t), (s = r), (a = n));
              var i,
                s,
                a,
                o = null != s ? s : eH.active(),
                l = this.startSpan(e, i, o),
                u = eD(o, l);
              return eH.with(u, a, void 0, l);
            }
          }),
          e
        );
      })(),
      ez = new eF(),
      eK = (function () {
        function e(e, t, r, n) {
          ((this._provider = e),
            (this.name = t),
            (this.version = r),
            (this.options = n));
        }
        return (
          (e.prototype.startSpan = function (e, t, r) {
            return this._getTracer().startSpan(e, t, r);
          }),
          (e.prototype.startActiveSpan = function (e, t, r, n) {
            var i = this._getTracer();
            return Reflect.apply(i.startActiveSpan, i, arguments);
          }),
          (e.prototype._getTracer = function () {
            if (this._delegate) return this._delegate;
            var e = this._provider.getDelegateTracer(
              this.name,
              this.version,
              this.options
            );
            return e ? ((this._delegate = e), this._delegate) : ez;
          }),
          e
        );
      })(),
      eX = new ((function () {
        function e() {}
        return (
          (e.prototype.getTracer = function (e, t, r) {
            return new eF();
          }),
          e
        );
      })())(),
      eJ = (function () {
        function e() {}
        return (
          (e.prototype.getTracer = function (e, t, r) {
            var n;
            return null != (n = this.getDelegateTracer(e, t, r))
              ? n
              : new eK(this, e, t, r);
          }),
          (e.prototype.getDelegate = function () {
            var e;
            return null != (e = this._delegate) ? e : eX;
          }),
          (e.prototype.setDelegate = function (e) {
            this._delegate = e;
          }),
          (e.prototype.getDelegateTracer = function (e, t, r) {
            var n;
            return null == (n = this._delegate) ? void 0 : n.getTracer(e, t, r);
          }),
          e
        );
      })(),
      eY = 'trace',
      eQ = (function () {
        function e() {
          ((this._proxyTracerProvider = new eJ()),
            (this.wrapSpanContext = eG),
            (this.isSpanContextValid = eW),
            (this.deleteSpan = e$),
            (this.getSpan = eN),
            (this.getActiveSpan = ej),
            (this.getSpanContext = eU),
            (this.setSpan = eD),
            (this.setSpanContext = eL));
        }
        return (
          (e.getInstance = function () {
            return (
              this._instance || (this._instance = new e()),
              this._instance
            );
          }),
          (e.prototype.setGlobalTracerProvider = function (e) {
            var t = R(eY, this._proxyTracerProvider, N.instance());
            return (t && this._proxyTracerProvider.setDelegate(e), t);
          }),
          (e.prototype.getTracerProvider = function () {
            return O(eY) || this._proxyTracerProvider;
          }),
          (e.prototype.getTracer = function (e, t) {
            return this.getTracerProvider().getTracer(e, t);
          }),
          (e.prototype.disable = function () {
            (T(eY, N.instance()), (this._proxyTracerProvider = new eJ()));
          }),
          e
        );
      })().getInstance();
    let eZ = { context: M, diag: B, metrics: eu, propagation: ek, trace: eQ };
    (e.s(['default', 0, eZ], 94528), e.i(94528));
    var e0 = [
        { n: 'error', c: 'error' },
        { n: 'warn', c: 'warn' },
        { n: 'info', c: 'info' },
        { n: 'debug', c: 'debug' },
        { n: 'verbose', c: 'trace' },
      ],
      e1 = function () {
        for (var e = 0; e < e0.length; e++)
          this[e0[e].n] = (function (e) {
            return function () {
              for (var t = [], r = 0; r < arguments.length; r++)
                t[r] = arguments[r];
              if (console) {
                var n = console[e];
                if (
                  ('function' != typeof n && (n = console.log),
                  'function' == typeof n)
                )
                  return n.apply(console, t);
              }
            };
          })(e0[e].c);
      };
    (((h = i || (i = {}))[(h.INT = 0)] = 'INT'),
      (h[(h.DOUBLE = 1)] = 'DOUBLE'),
      ((d = s || (s = {}))[(d.NOT_RECORD = 0)] = 'NOT_RECORD'),
      (d[(d.RECORD = 1)] = 'RECORD'),
      (d[(d.RECORD_AND_SAMPLED = 2)] = 'RECORD_AND_SAMPLED'),
      ((p = a || (a = {}))[(p.INTERNAL = 0)] = 'INTERNAL'),
      (p[(p.SERVER = 1)] = 'SERVER'),
      (p[(p.CLIENT = 2)] = 'CLIENT'),
      (p[(p.PRODUCER = 3)] = 'PRODUCER'),
      (p[(p.CONSUMER = 4)] = 'CONSUMER'),
      ((f = o || (o = {}))[(f.UNSET = 0)] = 'UNSET'),
      (f[(f.OK = 1)] = 'OK'),
      (f[(f.ERROR = 2)] = 'ERROR'));
    var e2 = '[_0-9a-z-*/]',
      e3 = RegExp(
        '^(?:[a-z]' +
          e2 +
          '{0,255}|' +
          ('[a-z0-9]' + e2 + '{0,240}@[a-z]') +
          e2 +
          '{0,13})$'
      ),
      e4 = /^[ -~]{0,255}[!-~]$/,
      e5 = /,|=/,
      e6 = (function () {
        function e(e) {
          ((this._internalState = new Map()), e && this._parse(e));
        }
        return (
          (e.prototype.set = function (e, t) {
            var r = this._clone();
            return (
              r._internalState.has(e) && r._internalState.delete(e),
              r._internalState.set(e, t),
              r
            );
          }),
          (e.prototype.unset = function (e) {
            var t = this._clone();
            return (t._internalState.delete(e), t);
          }),
          (e.prototype.get = function (e) {
            return this._internalState.get(e);
          }),
          (e.prototype.serialize = function () {
            var e = this;
            return this._keys()
              .reduce(function (t, r) {
                return (t.push(r + '=' + e.get(r)), t);
              }, [])
              .join(',');
          }),
          (e.prototype._parse = function (e) {
            !(e.length > 512) &&
              ((this._internalState = e
                .split(',')
                .reverse()
                .reduce(function (e, t) {
                  var r = t.trim(),
                    n = r.indexOf('=');
                  if (-1 !== n) {
                    var i = r.slice(0, n),
                      s = r.slice(n + 1, t.length);
                    e3.test(i) && e4.test(s) && !e5.test(s) && e.set(i, s);
                  }
                  return e;
                }, new Map())),
              this._internalState.size > 32 &&
                (this._internalState = new Map(
                  Array.from(this._internalState.entries())
                    .reverse()
                    .slice(0, 32)
                )));
          }),
          (e.prototype._keys = function () {
            return Array.from(this._internalState.keys()).reverse();
          }),
          (e.prototype._clone = function () {
            var t = new e();
            return ((t._internalState = new Map(this._internalState)), t);
          }),
          e
        );
      })();
    function e9(e) {
      return new e6(e);
    }
    e.s(
      [
        'DiagConsoleLogger',
        () => e1,
        'DiagLogLevel',
        () => r,
        'INVALID_SPANID',
        () => eP,
        'INVALID_SPAN_CONTEXT',
        () => eA,
        'INVALID_TRACEID',
        () => ex,
        'ProxyTracer',
        () => eK,
        'ProxyTracerProvider',
        () => eJ,
        'ROOT_CONTEXT',
        () => g,
        'SamplingDecision',
        () => s,
        'SpanKind',
        () => a,
        'SpanStatusCode',
        () => o,
        'TraceFlags',
        () => n,
        'ValueType',
        () => i,
        'baggageEntryMetadataFromString',
        () => eR,
        'context',
        () => M,
        'createContextKey',
        () => t,
        'createNoopMeter',
        () => ea,
        'createTraceState',
        () => e9,
        'default',
        0,
        eZ,
        'defaultTextMapGetter',
        () => eh,
        'defaultTextMapSetter',
        () => ed,
        'diag',
        () => B,
        'isSpanContextValid',
        () => eW,
        'isValidSpanId',
        () => eV,
        'isValidTraceId',
        () => eq,
        'metrics',
        () => eu,
        'propagation',
        () => ek,
        'trace',
        () => eQ,
      ],
      80317
    );
  },
  31387,
  (e, t, r) => {
    (() => {
      'use strict';
      let r, n, i, s, a;
      var o,
        l,
        u,
        c,
        h,
        d,
        p,
        f,
        g,
        m,
        y,
        b,
        v,
        w,
        _,
        E,
        S = {
          491: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.ContextAPI = void 0));
            let n = r(223),
              i = r(172),
              s = r(930),
              a = 'context',
              o = new n.NoopContextManager();
            class l {
              static getInstance() {
                return (
                  this._instance || (this._instance = new l()),
                  this._instance
                );
              }
              setGlobalContextManager(e) {
                return (0, i.registerGlobal)(a, e, s.DiagAPI.instance());
              }
              active() {
                return this._getContextManager().active();
              }
              with(e, t, r, ...n) {
                return this._getContextManager().with(e, t, r, ...n);
              }
              bind(e, t) {
                return this._getContextManager().bind(e, t);
              }
              _getContextManager() {
                return (0, i.getGlobal)(a) || o;
              }
              disable() {
                (this._getContextManager().disable(),
                  (0, i.unregisterGlobal)(a, s.DiagAPI.instance()));
              }
            }
            t.ContextAPI = l;
          },
          930: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.DiagAPI = void 0));
            let n = r(56),
              i = r(912),
              s = r(957),
              a = r(172);
            class o {
              constructor() {
                function e(e) {
                  return function (...t) {
                    let r = (0, a.getGlobal)('diag');
                    if (r) return r[e](...t);
                  };
                }
                const t = this;
                ((t.setLogger = (e, r = { logLevel: s.DiagLogLevel.INFO }) => {
                  var n, o, l;
                  if (e === t) {
                    let e = Error(
                      'Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation'
                    );
                    return (t.error(null != (n = e.stack) ? n : e.message), !1);
                  }
                  'number' == typeof r && (r = { logLevel: r });
                  let u = (0, a.getGlobal)('diag'),
                    c = (0, i.createLogLevelDiagLogger)(
                      null != (o = r.logLevel) ? o : s.DiagLogLevel.INFO,
                      e
                    );
                  if (u && !r.suppressOverrideMessage) {
                    let e =
                      null != (l = Error().stack)
                        ? l
                        : '<failed to generate stacktrace>';
                    (u.warn(`Current logger will be overwritten from ${e}`),
                      c.warn(
                        `Current logger will overwrite one already registered from ${e}`
                      ));
                  }
                  return (0, a.registerGlobal)('diag', c, t, !0);
                }),
                  (t.disable = () => {
                    (0, a.unregisterGlobal)('diag', t);
                  }),
                  (t.createComponentLogger = (e) =>
                    new n.DiagComponentLogger(e)),
                  (t.verbose = e('verbose')),
                  (t.debug = e('debug')),
                  (t.info = e('info')),
                  (t.warn = e('warn')),
                  (t.error = e('error')));
              }
              static instance() {
                return (
                  this._instance || (this._instance = new o()),
                  this._instance
                );
              }
            }
            t.DiagAPI = o;
          },
          653: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.MetricsAPI = void 0));
            let n = r(660),
              i = r(172),
              s = r(930),
              a = 'metrics';
            class o {
              static getInstance() {
                return (
                  this._instance || (this._instance = new o()),
                  this._instance
                );
              }
              setGlobalMeterProvider(e) {
                return (0, i.registerGlobal)(a, e, s.DiagAPI.instance());
              }
              getMeterProvider() {
                return (0, i.getGlobal)(a) || n.NOOP_METER_PROVIDER;
              }
              getMeter(e, t, r) {
                return this.getMeterProvider().getMeter(e, t, r);
              }
              disable() {
                (0, i.unregisterGlobal)(a, s.DiagAPI.instance());
              }
            }
            t.MetricsAPI = o;
          },
          181: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.PropagationAPI = void 0));
            let n = r(172),
              i = r(874),
              s = r(194),
              a = r(277),
              o = r(369),
              l = r(930),
              u = 'propagation',
              c = new i.NoopTextMapPropagator();
            class h {
              constructor() {
                ((this.createBaggage = o.createBaggage),
                  (this.getBaggage = a.getBaggage),
                  (this.getActiveBaggage = a.getActiveBaggage),
                  (this.setBaggage = a.setBaggage),
                  (this.deleteBaggage = a.deleteBaggage));
              }
              static getInstance() {
                return (
                  this._instance || (this._instance = new h()),
                  this._instance
                );
              }
              setGlobalPropagator(e) {
                return (0, n.registerGlobal)(u, e, l.DiagAPI.instance());
              }
              inject(e, t, r = s.defaultTextMapSetter) {
                return this._getGlobalPropagator().inject(e, t, r);
              }
              extract(e, t, r = s.defaultTextMapGetter) {
                return this._getGlobalPropagator().extract(e, t, r);
              }
              fields() {
                return this._getGlobalPropagator().fields();
              }
              disable() {
                (0, n.unregisterGlobal)(u, l.DiagAPI.instance());
              }
              _getGlobalPropagator() {
                return (0, n.getGlobal)(u) || c;
              }
            }
            t.PropagationAPI = h;
          },
          997: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.TraceAPI = void 0));
            let n = r(172),
              i = r(846),
              s = r(139),
              a = r(607),
              o = r(930),
              l = 'trace';
            class u {
              constructor() {
                ((this._proxyTracerProvider = new i.ProxyTracerProvider()),
                  (this.wrapSpanContext = s.wrapSpanContext),
                  (this.isSpanContextValid = s.isSpanContextValid),
                  (this.deleteSpan = a.deleteSpan),
                  (this.getSpan = a.getSpan),
                  (this.getActiveSpan = a.getActiveSpan),
                  (this.getSpanContext = a.getSpanContext),
                  (this.setSpan = a.setSpan),
                  (this.setSpanContext = a.setSpanContext));
              }
              static getInstance() {
                return (
                  this._instance || (this._instance = new u()),
                  this._instance
                );
              }
              setGlobalTracerProvider(e) {
                let t = (0, n.registerGlobal)(
                  l,
                  this._proxyTracerProvider,
                  o.DiagAPI.instance()
                );
                return (t && this._proxyTracerProvider.setDelegate(e), t);
              }
              getTracerProvider() {
                return (0, n.getGlobal)(l) || this._proxyTracerProvider;
              }
              getTracer(e, t) {
                return this.getTracerProvider().getTracer(e, t);
              }
              disable() {
                ((0, n.unregisterGlobal)(l, o.DiagAPI.instance()),
                  (this._proxyTracerProvider = new i.ProxyTracerProvider()));
              }
            }
            t.TraceAPI = u;
          },
          277: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.deleteBaggage =
                t.setBaggage =
                t.getActiveBaggage =
                t.getBaggage =
                  void 0));
            let n = r(491),
              i = (0, r(780).createContextKey)('OpenTelemetry Baggage Key');
            function s(e) {
              return e.getValue(i) || void 0;
            }
            ((t.getBaggage = s),
              (t.getActiveBaggage = function () {
                return s(n.ContextAPI.getInstance().active());
              }),
              (t.setBaggage = function (e, t) {
                return e.setValue(i, t);
              }),
              (t.deleteBaggage = function (e) {
                return e.deleteValue(i);
              }));
          },
          993: (e, t) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.BaggageImpl = void 0));
            class r {
              constructor(e) {
                this._entries = e ? new Map(e) : new Map();
              }
              getEntry(e) {
                let t = this._entries.get(e);
                if (t) return Object.assign({}, t);
              }
              getAllEntries() {
                return Array.from(this._entries.entries()).map(([e, t]) => [
                  e,
                  t,
                ]);
              }
              setEntry(e, t) {
                let n = new r(this._entries);
                return (n._entries.set(e, t), n);
              }
              removeEntry(e) {
                let t = new r(this._entries);
                return (t._entries.delete(e), t);
              }
              removeEntries(...e) {
                let t = new r(this._entries);
                for (let r of e) t._entries.delete(r);
                return t;
              }
              clear() {
                return new r();
              }
            }
            t.BaggageImpl = r;
          },
          830: (e, t) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.baggageEntryMetadataSymbol = void 0),
              (t.baggageEntryMetadataSymbol = Symbol('BaggageEntryMetadata')));
          },
          369: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.baggageEntryMetadataFromString = t.createBaggage = void 0));
            let n = r(930),
              i = r(993),
              s = r(830),
              a = n.DiagAPI.instance();
            ((t.createBaggage = function (e = {}) {
              return new i.BaggageImpl(new Map(Object.entries(e)));
            }),
              (t.baggageEntryMetadataFromString = function (e) {
                return (
                  'string' != typeof e &&
                    (a.error(
                      `Cannot create baggage metadata from unknown type: ${typeof e}`
                    ),
                    (e = '')),
                  { __TYPE__: s.baggageEntryMetadataSymbol, toString: () => e }
                );
              }));
          },
          67: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.context = void 0),
              (t.context = r(491).ContextAPI.getInstance()));
          },
          223: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.NoopContextManager = void 0));
            let n = r(780);
            t.NoopContextManager = class {
              active() {
                return n.ROOT_CONTEXT;
              }
              with(e, t, r, ...n) {
                return t.call(r, ...n);
              }
              bind(e, t) {
                return t;
              }
              enable() {
                return this;
              }
              disable() {
                return this;
              }
            };
          },
          780: (e, t) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.ROOT_CONTEXT = t.createContextKey = void 0),
              (t.createContextKey = function (e) {
                return Symbol.for(e);
              }));
            class r {
              constructor(e) {
                const t = this;
                ((t._currentContext = e ? new Map(e) : new Map()),
                  (t.getValue = (e) => t._currentContext.get(e)),
                  (t.setValue = (e, n) => {
                    let i = new r(t._currentContext);
                    return (i._currentContext.set(e, n), i);
                  }),
                  (t.deleteValue = (e) => {
                    let n = new r(t._currentContext);
                    return (n._currentContext.delete(e), n);
                  }));
              }
            }
            t.ROOT_CONTEXT = new r();
          },
          506: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.diag = void 0),
              (t.diag = r(930).DiagAPI.instance()));
          },
          56: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.DiagComponentLogger = void 0));
            let n = r(172);
            function i(e, t, r) {
              let i = (0, n.getGlobal)('diag');
              if (i) return (r.unshift(t), i[e](...r));
            }
            t.DiagComponentLogger = class {
              constructor(e) {
                this._namespace = e.namespace || 'DiagComponentLogger';
              }
              debug(...e) {
                return i('debug', this._namespace, e);
              }
              error(...e) {
                return i('error', this._namespace, e);
              }
              info(...e) {
                return i('info', this._namespace, e);
              }
              warn(...e) {
                return i('warn', this._namespace, e);
              }
              verbose(...e) {
                return i('verbose', this._namespace, e);
              }
            };
          },
          972: (e, t) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.DiagConsoleLogger = void 0));
            let r = [
              { n: 'error', c: 'error' },
              { n: 'warn', c: 'warn' },
              { n: 'info', c: 'info' },
              { n: 'debug', c: 'debug' },
              { n: 'verbose', c: 'trace' },
            ];
            t.DiagConsoleLogger = class {
              constructor() {
                for (let e = 0; e < r.length; e++)
                  this[r[e].n] = (function (e) {
                    return function (...t) {
                      if (console) {
                        let r = console[e];
                        if (
                          ('function' != typeof r && (r = console.log),
                          'function' == typeof r)
                        )
                          return r.apply(console, t);
                      }
                    };
                  })(r[e].c);
              }
            };
          },
          912: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.createLogLevelDiagLogger = void 0));
            let n = r(957);
            t.createLogLevelDiagLogger = function (e, t) {
              function r(r, n) {
                let i = t[r];
                return 'function' == typeof i && e >= n
                  ? i.bind(t)
                  : function () {};
              }
              return (
                e < n.DiagLogLevel.NONE
                  ? (e = n.DiagLogLevel.NONE)
                  : e > n.DiagLogLevel.ALL && (e = n.DiagLogLevel.ALL),
                (t = t || {}),
                {
                  error: r('error', n.DiagLogLevel.ERROR),
                  warn: r('warn', n.DiagLogLevel.WARN),
                  info: r('info', n.DiagLogLevel.INFO),
                  debug: r('debug', n.DiagLogLevel.DEBUG),
                  verbose: r('verbose', n.DiagLogLevel.VERBOSE),
                }
              );
            };
          },
          957: (e, t) => {
            var r;
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.DiagLogLevel = void 0),
              ((r = t.DiagLogLevel || (t.DiagLogLevel = {}))[(r.NONE = 0)] =
                'NONE'),
              (r[(r.ERROR = 30)] = 'ERROR'),
              (r[(r.WARN = 50)] = 'WARN'),
              (r[(r.INFO = 60)] = 'INFO'),
              (r[(r.DEBUG = 70)] = 'DEBUG'),
              (r[(r.VERBOSE = 80)] = 'VERBOSE'),
              (r[(r.ALL = 9999)] = 'ALL'));
          },
          172: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.unregisterGlobal = t.getGlobal = t.registerGlobal = void 0));
            let n = r(200),
              i = r(521),
              s = r(130),
              a = i.VERSION.split('.')[0],
              o = Symbol.for(`opentelemetry.js.api.${a}`),
              l = n._globalThis;
            ((t.registerGlobal = function (e, t, r, n = !1) {
              var s;
              let a = (l[o] = null != (s = l[o]) ? s : { version: i.VERSION });
              if (!n && a[e]) {
                let t = Error(
                  `@opentelemetry/api: Attempted duplicate registration of API: ${e}`
                );
                return (r.error(t.stack || t.message), !1);
              }
              if (a.version !== i.VERSION) {
                let t = Error(
                  `@opentelemetry/api: Registration of version v${a.version} for ${e} does not match previously registered API v${i.VERSION}`
                );
                return (r.error(t.stack || t.message), !1);
              }
              return (
                (a[e] = t),
                r.debug(
                  `@opentelemetry/api: Registered a global for ${e} v${i.VERSION}.`
                ),
                !0
              );
            }),
              (t.getGlobal = function (e) {
                var t, r;
                let n = null == (t = l[o]) ? void 0 : t.version;
                if (n && (0, s.isCompatible)(n))
                  return null == (r = l[o]) ? void 0 : r[e];
              }),
              (t.unregisterGlobal = function (e, t) {
                t.debug(
                  `@opentelemetry/api: Unregistering a global for ${e} v${i.VERSION}.`
                );
                let r = l[o];
                r && delete r[e];
              }));
          },
          130: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.isCompatible = t._makeCompatibilityCheck = void 0));
            let n = r(521),
              i = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
            function s(e) {
              let t = new Set([e]),
                r = new Set(),
                n = e.match(i);
              if (!n) return () => !1;
              let s = {
                major: +n[1],
                minor: +n[2],
                patch: +n[3],
                prerelease: n[4],
              };
              if (null != s.prerelease)
                return function (t) {
                  return t === e;
                };
              function a(e) {
                return (r.add(e), !1);
              }
              return function (e) {
                if (t.has(e)) return !0;
                if (r.has(e)) return !1;
                let n = e.match(i);
                if (!n) return a(e);
                let o = {
                  major: +n[1],
                  minor: +n[2],
                  patch: +n[3],
                  prerelease: n[4],
                };
                if (null != o.prerelease || s.major !== o.major) return a(e);
                if (0 === s.major)
                  return s.minor === o.minor && s.patch <= o.patch
                    ? (t.add(e), !0)
                    : a(e);
                return s.minor <= o.minor ? (t.add(e), !0) : a(e);
              };
            }
            ((t._makeCompatibilityCheck = s), (t.isCompatible = s(n.VERSION)));
          },
          886: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.metrics = void 0),
              (t.metrics = r(653).MetricsAPI.getInstance()));
          },
          901: (e, t) => {
            var r;
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.ValueType = void 0),
              ((r = t.ValueType || (t.ValueType = {}))[(r.INT = 0)] = 'INT'),
              (r[(r.DOUBLE = 1)] = 'DOUBLE'));
          },
          102: (e, t) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.createNoopMeter =
                t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC =
                t.NOOP_OBSERVABLE_GAUGE_METRIC =
                t.NOOP_OBSERVABLE_COUNTER_METRIC =
                t.NOOP_UP_DOWN_COUNTER_METRIC =
                t.NOOP_HISTOGRAM_METRIC =
                t.NOOP_COUNTER_METRIC =
                t.NOOP_METER =
                t.NoopObservableUpDownCounterMetric =
                t.NoopObservableGaugeMetric =
                t.NoopObservableCounterMetric =
                t.NoopObservableMetric =
                t.NoopHistogramMetric =
                t.NoopUpDownCounterMetric =
                t.NoopCounterMetric =
                t.NoopMetric =
                t.NoopMeter =
                  void 0));
            class r {
              createHistogram(e, r) {
                return t.NOOP_HISTOGRAM_METRIC;
              }
              createCounter(e, r) {
                return t.NOOP_COUNTER_METRIC;
              }
              createUpDownCounter(e, r) {
                return t.NOOP_UP_DOWN_COUNTER_METRIC;
              }
              createObservableGauge(e, r) {
                return t.NOOP_OBSERVABLE_GAUGE_METRIC;
              }
              createObservableCounter(e, r) {
                return t.NOOP_OBSERVABLE_COUNTER_METRIC;
              }
              createObservableUpDownCounter(e, r) {
                return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
              }
              addBatchObservableCallback(e, t) {}
              removeBatchObservableCallback(e) {}
            }
            t.NoopMeter = r;
            class n {}
            t.NoopMetric = n;
            class i extends n {
              add(e, t) {}
            }
            t.NoopCounterMetric = i;
            class s extends n {
              add(e, t) {}
            }
            t.NoopUpDownCounterMetric = s;
            class a extends n {
              record(e, t) {}
            }
            t.NoopHistogramMetric = a;
            class o {
              addCallback(e) {}
              removeCallback(e) {}
            }
            t.NoopObservableMetric = o;
            class l extends o {}
            t.NoopObservableCounterMetric = l;
            class u extends o {}
            t.NoopObservableGaugeMetric = u;
            class c extends o {}
            ((t.NoopObservableUpDownCounterMetric = c),
              (t.NOOP_METER = new r()),
              (t.NOOP_COUNTER_METRIC = new i()),
              (t.NOOP_HISTOGRAM_METRIC = new a()),
              (t.NOOP_UP_DOWN_COUNTER_METRIC = new s()),
              (t.NOOP_OBSERVABLE_COUNTER_METRIC = new l()),
              (t.NOOP_OBSERVABLE_GAUGE_METRIC = new u()),
              (t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new c()),
              (t.createNoopMeter = function () {
                return t.NOOP_METER;
              }));
          },
          660: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.NOOP_METER_PROVIDER = t.NoopMeterProvider = void 0));
            let n = r(102);
            class i {
              getMeter(e, t, r) {
                return n.NOOP_METER;
              }
            }
            ((t.NoopMeterProvider = i), (t.NOOP_METER_PROVIDER = new i()));
          },
          200: function (e, t, r) {
            var n =
                (this && this.__createBinding) ||
                (Object.create
                  ? function (e, t, r, n) {
                      (void 0 === n && (n = r),
                        Object.defineProperty(e, n, {
                          enumerable: !0,
                          get: function () {
                            return t[r];
                          },
                        }));
                    }
                  : function (e, t, r, n) {
                      (void 0 === n && (n = r), (e[n] = t[r]));
                    }),
              i =
                (this && this.__exportStar) ||
                function (e, t) {
                  for (var r in e)
                    'default' === r ||
                      Object.prototype.hasOwnProperty.call(t, r) ||
                      n(t, e, r);
                };
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              i(r(46), t));
          },
          651: (t, r) => {
            (Object.defineProperty(r, '__esModule', { value: !0 }),
              (r._globalThis = void 0),
              (r._globalThis =
                'object' == typeof globalThis ? globalThis : e.g));
          },
          46: function (e, t, r) {
            var n =
                (this && this.__createBinding) ||
                (Object.create
                  ? function (e, t, r, n) {
                      (void 0 === n && (n = r),
                        Object.defineProperty(e, n, {
                          enumerable: !0,
                          get: function () {
                            return t[r];
                          },
                        }));
                    }
                  : function (e, t, r, n) {
                      (void 0 === n && (n = r), (e[n] = t[r]));
                    }),
              i =
                (this && this.__exportStar) ||
                function (e, t) {
                  for (var r in e)
                    'default' === r ||
                      Object.prototype.hasOwnProperty.call(t, r) ||
                      n(t, e, r);
                };
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              i(r(651), t));
          },
          939: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.propagation = void 0),
              (t.propagation = r(181).PropagationAPI.getInstance()));
          },
          874: (e, t) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.NoopTextMapPropagator = void 0),
              (t.NoopTextMapPropagator = class {
                inject(e, t) {}
                extract(e, t) {
                  return e;
                }
                fields() {
                  return [];
                }
              }));
          },
          194: (e, t) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.defaultTextMapSetter = t.defaultTextMapGetter = void 0),
              (t.defaultTextMapGetter = {
                get(e, t) {
                  if (null != e) return e[t];
                },
                keys: (e) => (null == e ? [] : Object.keys(e)),
              }),
              (t.defaultTextMapSetter = {
                set(e, t, r) {
                  null != e && (e[t] = r);
                },
              }));
          },
          845: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.trace = void 0),
              (t.trace = r(997).TraceAPI.getInstance()));
          },
          403: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.NonRecordingSpan = void 0));
            let n = r(476);
            t.NonRecordingSpan = class {
              constructor(e = n.INVALID_SPAN_CONTEXT) {
                this._spanContext = e;
              }
              spanContext() {
                return this._spanContext;
              }
              setAttribute(e, t) {
                return this;
              }
              setAttributes(e) {
                return this;
              }
              addEvent(e, t) {
                return this;
              }
              setStatus(e) {
                return this;
              }
              updateName(e) {
                return this;
              }
              end(e) {}
              isRecording() {
                return !1;
              }
              recordException(e, t) {}
            };
          },
          614: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.NoopTracer = void 0));
            let n = r(491),
              i = r(607),
              s = r(403),
              a = r(139),
              o = n.ContextAPI.getInstance();
            t.NoopTracer = class {
              startSpan(e, t, r = o.active()) {
                var n;
                if (null == t ? void 0 : t.root)
                  return new s.NonRecordingSpan();
                let l = r && (0, i.getSpanContext)(r);
                return 'object' == typeof (n = l) &&
                  'string' == typeof n.spanId &&
                  'string' == typeof n.traceId &&
                  'number' == typeof n.traceFlags &&
                  (0, a.isSpanContextValid)(l)
                  ? new s.NonRecordingSpan(l)
                  : new s.NonRecordingSpan();
              }
              startActiveSpan(e, t, r, n) {
                let s, a, l;
                if (arguments.length < 2) return;
                2 == arguments.length
                  ? (l = t)
                  : 3 == arguments.length
                    ? ((s = t), (l = r))
                    : ((s = t), (a = r), (l = n));
                let u = null != a ? a : o.active(),
                  c = this.startSpan(e, s, u),
                  h = (0, i.setSpan)(u, c);
                return o.with(h, l, void 0, c);
              }
            };
          },
          124: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.NoopTracerProvider = void 0));
            let n = r(614);
            t.NoopTracerProvider = class {
              getTracer(e, t, r) {
                return new n.NoopTracer();
              }
            };
          },
          125: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.ProxyTracer = void 0));
            let n = new (r(614).NoopTracer)();
            t.ProxyTracer = class {
              constructor(e, t, r, n) {
                ((this._provider = e),
                  (this.name = t),
                  (this.version = r),
                  (this.options = n));
              }
              startSpan(e, t, r) {
                return this._getTracer().startSpan(e, t, r);
              }
              startActiveSpan(e, t, r, n) {
                let i = this._getTracer();
                return Reflect.apply(i.startActiveSpan, i, arguments);
              }
              _getTracer() {
                if (this._delegate) return this._delegate;
                let e = this._provider.getDelegateTracer(
                  this.name,
                  this.version,
                  this.options
                );
                return e ? ((this._delegate = e), this._delegate) : n;
              }
            };
          },
          846: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.ProxyTracerProvider = void 0));
            let n = r(125),
              i = new (r(124).NoopTracerProvider)();
            t.ProxyTracerProvider = class {
              getTracer(e, t, r) {
                var i;
                return null != (i = this.getDelegateTracer(e, t, r))
                  ? i
                  : new n.ProxyTracer(this, e, t, r);
              }
              getDelegate() {
                var e;
                return null != (e = this._delegate) ? e : i;
              }
              setDelegate(e) {
                this._delegate = e;
              }
              getDelegateTracer(e, t, r) {
                var n;
                return null == (n = this._delegate)
                  ? void 0
                  : n.getTracer(e, t, r);
              }
            };
          },
          996: (e, t) => {
            var r;
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.SamplingDecision = void 0),
              ((r = t.SamplingDecision || (t.SamplingDecision = {}))[
                (r.NOT_RECORD = 0)
              ] = 'NOT_RECORD'),
              (r[(r.RECORD = 1)] = 'RECORD'),
              (r[(r.RECORD_AND_SAMPLED = 2)] = 'RECORD_AND_SAMPLED'));
          },
          607: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.getSpanContext =
                t.setSpanContext =
                t.deleteSpan =
                t.setSpan =
                t.getActiveSpan =
                t.getSpan =
                  void 0));
            let n = r(780),
              i = r(403),
              s = r(491),
              a = (0, n.createContextKey)('OpenTelemetry Context Key SPAN');
            function o(e) {
              return e.getValue(a) || void 0;
            }
            function l(e, t) {
              return e.setValue(a, t);
            }
            ((t.getSpan = o),
              (t.getActiveSpan = function () {
                return o(s.ContextAPI.getInstance().active());
              }),
              (t.setSpan = l),
              (t.deleteSpan = function (e) {
                return e.deleteValue(a);
              }),
              (t.setSpanContext = function (e, t) {
                return l(e, new i.NonRecordingSpan(t));
              }),
              (t.getSpanContext = function (e) {
                var t;
                return null == (t = o(e)) ? void 0 : t.spanContext();
              }));
          },
          325: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.TraceStateImpl = void 0));
            let n = r(564);
            class i {
              constructor(e) {
                ((this._internalState = new Map()), e && this._parse(e));
              }
              set(e, t) {
                let r = this._clone();
                return (
                  r._internalState.has(e) && r._internalState.delete(e),
                  r._internalState.set(e, t),
                  r
                );
              }
              unset(e) {
                let t = this._clone();
                return (t._internalState.delete(e), t);
              }
              get(e) {
                return this._internalState.get(e);
              }
              serialize() {
                return this._keys()
                  .reduce((e, t) => (e.push(t + '=' + this.get(t)), e), [])
                  .join(',');
              }
              _parse(e) {
                !(e.length > 512) &&
                  ((this._internalState = e
                    .split(',')
                    .reverse()
                    .reduce((e, t) => {
                      let r = t.trim(),
                        i = r.indexOf('=');
                      if (-1 !== i) {
                        let s = r.slice(0, i),
                          a = r.slice(i + 1, t.length);
                        (0, n.validateKey)(s) &&
                          (0, n.validateValue)(a) &&
                          e.set(s, a);
                      }
                      return e;
                    }, new Map())),
                  this._internalState.size > 32 &&
                    (this._internalState = new Map(
                      Array.from(this._internalState.entries())
                        .reverse()
                        .slice(0, 32)
                    )));
              }
              _keys() {
                return Array.from(this._internalState.keys()).reverse();
              }
              _clone() {
                let e = new i();
                return ((e._internalState = new Map(this._internalState)), e);
              }
            }
            t.TraceStateImpl = i;
          },
          564: (e, t) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.validateValue = t.validateKey = void 0));
            let r = '[_0-9a-z-*/]',
              n = `[a-z]${r}{0,255}`,
              i = `[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`,
              s = RegExp(`^(?:${n}|${i})$`),
              a = /^[ -~]{0,255}[!-~]$/,
              o = /,|=/;
            ((t.validateKey = function (e) {
              return s.test(e);
            }),
              (t.validateValue = function (e) {
                return a.test(e) && !o.test(e);
              }));
          },
          98: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.createTraceState = void 0));
            let n = r(325);
            t.createTraceState = function (e) {
              return new n.TraceStateImpl(e);
            };
          },
          476: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.INVALID_SPAN_CONTEXT =
                t.INVALID_TRACEID =
                t.INVALID_SPANID =
                  void 0));
            let n = r(475);
            ((t.INVALID_SPANID = '0000000000000000'),
              (t.INVALID_TRACEID = '00000000000000000000000000000000'),
              (t.INVALID_SPAN_CONTEXT = {
                traceId: t.INVALID_TRACEID,
                spanId: t.INVALID_SPANID,
                traceFlags: n.TraceFlags.NONE,
              }));
          },
          357: (e, t) => {
            var r;
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.SpanKind = void 0),
              ((r = t.SpanKind || (t.SpanKind = {}))[(r.INTERNAL = 0)] =
                'INTERNAL'),
              (r[(r.SERVER = 1)] = 'SERVER'),
              (r[(r.CLIENT = 2)] = 'CLIENT'),
              (r[(r.PRODUCER = 3)] = 'PRODUCER'),
              (r[(r.CONSUMER = 4)] = 'CONSUMER'));
          },
          139: (e, t, r) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.wrapSpanContext =
                t.isSpanContextValid =
                t.isValidSpanId =
                t.isValidTraceId =
                  void 0));
            let n = r(476),
              i = r(403),
              s = /^([0-9a-f]{32})$/i,
              a = /^[0-9a-f]{16}$/i;
            function o(e) {
              return s.test(e) && e !== n.INVALID_TRACEID;
            }
            function l(e) {
              return a.test(e) && e !== n.INVALID_SPANID;
            }
            ((t.isValidTraceId = o),
              (t.isValidSpanId = l),
              (t.isSpanContextValid = function (e) {
                return o(e.traceId) && l(e.spanId);
              }),
              (t.wrapSpanContext = function (e) {
                return new i.NonRecordingSpan(e);
              }));
          },
          847: (e, t) => {
            var r;
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.SpanStatusCode = void 0),
              ((r = t.SpanStatusCode || (t.SpanStatusCode = {}))[
                (r.UNSET = 0)
              ] = 'UNSET'),
              (r[(r.OK = 1)] = 'OK'),
              (r[(r.ERROR = 2)] = 'ERROR'));
          },
          475: (e, t) => {
            var r;
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.TraceFlags = void 0),
              ((r = t.TraceFlags || (t.TraceFlags = {}))[(r.NONE = 0)] =
                'NONE'),
              (r[(r.SAMPLED = 1)] = 'SAMPLED'));
          },
          521: (e, t) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.VERSION = void 0),
              (t.VERSION = '1.6.0'));
          },
        },
        R = {};
      function O(e) {
        var t = R[e];
        if (void 0 !== t) return t.exports;
        var r = (R[e] = { exports: {} }),
          n = !0;
        try {
          (S[e].call(r.exports, r, r.exports, O), (n = !1));
        } finally {
          n && delete R[e];
        }
        return r.exports;
      }
      O.ab = '/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/';
      var T = {};
      (Object.defineProperty(T, '__esModule', { value: !0 }),
        (T.trace =
          T.propagation =
          T.metrics =
          T.diag =
          T.context =
          T.INVALID_SPAN_CONTEXT =
          T.INVALID_TRACEID =
          T.INVALID_SPANID =
          T.isValidSpanId =
          T.isValidTraceId =
          T.isSpanContextValid =
          T.createTraceState =
          T.TraceFlags =
          T.SpanStatusCode =
          T.SpanKind =
          T.SamplingDecision =
          T.ProxyTracerProvider =
          T.ProxyTracer =
          T.defaultTextMapSetter =
          T.defaultTextMapGetter =
          T.ValueType =
          T.createNoopMeter =
          T.DiagLogLevel =
          T.DiagConsoleLogger =
          T.ROOT_CONTEXT =
          T.createContextKey =
          T.baggageEntryMetadataFromString =
            void 0),
        (o = O(369)),
        Object.defineProperty(T, 'baggageEntryMetadataFromString', {
          enumerable: !0,
          get: function () {
            return o.baggageEntryMetadataFromString;
          },
        }),
        (l = O(780)),
        Object.defineProperty(T, 'createContextKey', {
          enumerable: !0,
          get: function () {
            return l.createContextKey;
          },
        }),
        Object.defineProperty(T, 'ROOT_CONTEXT', {
          enumerable: !0,
          get: function () {
            return l.ROOT_CONTEXT;
          },
        }),
        (u = O(972)),
        Object.defineProperty(T, 'DiagConsoleLogger', {
          enumerable: !0,
          get: function () {
            return u.DiagConsoleLogger;
          },
        }),
        (c = O(957)),
        Object.defineProperty(T, 'DiagLogLevel', {
          enumerable: !0,
          get: function () {
            return c.DiagLogLevel;
          },
        }),
        (h = O(102)),
        Object.defineProperty(T, 'createNoopMeter', {
          enumerable: !0,
          get: function () {
            return h.createNoopMeter;
          },
        }),
        (d = O(901)),
        Object.defineProperty(T, 'ValueType', {
          enumerable: !0,
          get: function () {
            return d.ValueType;
          },
        }),
        (p = O(194)),
        Object.defineProperty(T, 'defaultTextMapGetter', {
          enumerable: !0,
          get: function () {
            return p.defaultTextMapGetter;
          },
        }),
        Object.defineProperty(T, 'defaultTextMapSetter', {
          enumerable: !0,
          get: function () {
            return p.defaultTextMapSetter;
          },
        }),
        (f = O(125)),
        Object.defineProperty(T, 'ProxyTracer', {
          enumerable: !0,
          get: function () {
            return f.ProxyTracer;
          },
        }),
        (g = O(846)),
        Object.defineProperty(T, 'ProxyTracerProvider', {
          enumerable: !0,
          get: function () {
            return g.ProxyTracerProvider;
          },
        }),
        (m = O(996)),
        Object.defineProperty(T, 'SamplingDecision', {
          enumerable: !0,
          get: function () {
            return m.SamplingDecision;
          },
        }),
        (y = O(357)),
        Object.defineProperty(T, 'SpanKind', {
          enumerable: !0,
          get: function () {
            return y.SpanKind;
          },
        }),
        (b = O(847)),
        Object.defineProperty(T, 'SpanStatusCode', {
          enumerable: !0,
          get: function () {
            return b.SpanStatusCode;
          },
        }),
        (v = O(475)),
        Object.defineProperty(T, 'TraceFlags', {
          enumerable: !0,
          get: function () {
            return v.TraceFlags;
          },
        }),
        (w = O(98)),
        Object.defineProperty(T, 'createTraceState', {
          enumerable: !0,
          get: function () {
            return w.createTraceState;
          },
        }),
        (_ = O(139)),
        Object.defineProperty(T, 'isSpanContextValid', {
          enumerable: !0,
          get: function () {
            return _.isSpanContextValid;
          },
        }),
        Object.defineProperty(T, 'isValidTraceId', {
          enumerable: !0,
          get: function () {
            return _.isValidTraceId;
          },
        }),
        Object.defineProperty(T, 'isValidSpanId', {
          enumerable: !0,
          get: function () {
            return _.isValidSpanId;
          },
        }),
        (E = O(476)),
        Object.defineProperty(T, 'INVALID_SPANID', {
          enumerable: !0,
          get: function () {
            return E.INVALID_SPANID;
          },
        }),
        Object.defineProperty(T, 'INVALID_TRACEID', {
          enumerable: !0,
          get: function () {
            return E.INVALID_TRACEID;
          },
        }),
        Object.defineProperty(T, 'INVALID_SPAN_CONTEXT', {
          enumerable: !0,
          get: function () {
            return E.INVALID_SPAN_CONTEXT;
          },
        }),
        (r = O(67)),
        Object.defineProperty(T, 'context', {
          enumerable: !0,
          get: function () {
            return r.context;
          },
        }),
        (n = O(506)),
        Object.defineProperty(T, 'diag', {
          enumerable: !0,
          get: function () {
            return n.diag;
          },
        }),
        (i = O(886)),
        Object.defineProperty(T, 'metrics', {
          enumerable: !0,
          get: function () {
            return i.metrics;
          },
        }),
        (s = O(939)),
        Object.defineProperty(T, 'propagation', {
          enumerable: !0,
          get: function () {
            return s.propagation;
          },
        }),
        (a = O(845)),
        Object.defineProperty(T, 'trace', {
          enumerable: !0,
          get: function () {
            return a.trace;
          },
        }),
        (T.default = {
          context: r.context,
          diag: n.diag,
          metrics: i.metrics,
          propagation: s.propagation,
          trace: a.trace,
        }),
        (t.exports = T));
    })();
  },
  62712,
  (e, t, r) => {
    (() => {
      'use strict';
      'u' > typeof __nccwpck_require__ &&
        (__nccwpck_require__.ab =
          '/ROOT/node_modules/next/dist/compiled/cookie/');
      var e,
        r,
        n,
        i,
        s = {};
      ((s.parse = function (t, r) {
        if ('string' != typeof t)
          throw TypeError('argument str must be a string');
        for (
          var i = {}, s = t.split(n), a = (r || {}).decode || e, o = 0;
          o < s.length;
          o++
        ) {
          var l = s[o],
            u = l.indexOf('=');
          if (!(u < 0)) {
            var c = l.substr(0, u).trim(),
              h = l.substr(++u, l.length).trim();
            ('"' == h[0] && (h = h.slice(1, -1)),
              void 0 == i[c] &&
                (i[c] = (function (e, t) {
                  try {
                    return t(e);
                  } catch (t) {
                    return e;
                  }
                })(h, a)));
          }
        }
        return i;
      }),
        (s.serialize = function (e, t, n) {
          var s = n || {},
            a = s.encode || r;
          if ('function' != typeof a)
            throw TypeError('option encode is invalid');
          if (!i.test(e)) throw TypeError('argument name is invalid');
          var o = a(t);
          if (o && !i.test(o)) throw TypeError('argument val is invalid');
          var l = e + '=' + o;
          if (null != s.maxAge) {
            var u = s.maxAge - 0;
            if (isNaN(u) || !isFinite(u))
              throw TypeError('option maxAge is invalid');
            l += '; Max-Age=' + Math.floor(u);
          }
          if (s.domain) {
            if (!i.test(s.domain)) throw TypeError('option domain is invalid');
            l += '; Domain=' + s.domain;
          }
          if (s.path) {
            if (!i.test(s.path)) throw TypeError('option path is invalid');
            l += '; Path=' + s.path;
          }
          if (s.expires) {
            if ('function' != typeof s.expires.toUTCString)
              throw TypeError('option expires is invalid');
            l += '; Expires=' + s.expires.toUTCString();
          }
          if (
            (s.httpOnly && (l += '; HttpOnly'),
            s.secure && (l += '; Secure'),
            s.sameSite)
          )
            switch (
              'string' == typeof s.sameSite
                ? s.sameSite.toLowerCase()
                : s.sameSite
            ) {
              case !0:
              case 'strict':
                l += '; SameSite=Strict';
                break;
              case 'lax':
                l += '; SameSite=Lax';
                break;
              case 'none':
                l += '; SameSite=None';
                break;
              default:
                throw TypeError('option sameSite is invalid');
            }
          return l;
        }),
        (e = decodeURIComponent),
        (r = encodeURIComponent),
        (n = /; */),
        (i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/),
        (t.exports = s));
    })();
  },
  47413,
  (e, t, r) => {
    (() => {
      'use strict';
      let e, r, n, i, s;
      var a = {
          993: (e) => {
            var t = Object.prototype.hasOwnProperty,
              r = '~';
            function n() {}
            function i(e, t, r) {
              ((this.fn = e), (this.context = t), (this.once = r || !1));
            }
            function s(e, t, n, s, a) {
              if ('function' != typeof n)
                throw TypeError('The listener must be a function');
              var o = new i(n, s || e, a),
                l = r ? r + t : t;
              return (
                e._events[l]
                  ? e._events[l].fn
                    ? (e._events[l] = [e._events[l], o])
                    : e._events[l].push(o)
                  : ((e._events[l] = o), e._eventsCount++),
                e
              );
            }
            function a(e, t) {
              0 == --e._eventsCount
                ? (e._events = new n())
                : delete e._events[t];
            }
            function o() {
              ((this._events = new n()), (this._eventsCount = 0));
            }
            (Object.create &&
              ((n.prototype = Object.create(null)),
              new n().__proto__ || (r = !1)),
              (o.prototype.eventNames = function () {
                var e,
                  n,
                  i = [];
                if (0 === this._eventsCount) return i;
                for (n in (e = this._events))
                  t.call(e, n) && i.push(r ? n.slice(1) : n);
                return Object.getOwnPropertySymbols
                  ? i.concat(Object.getOwnPropertySymbols(e))
                  : i;
              }),
              (o.prototype.listeners = function (e) {
                var t = r ? r + e : e,
                  n = this._events[t];
                if (!n) return [];
                if (n.fn) return [n.fn];
                for (var i = 0, s = n.length, a = Array(s); i < s; i++)
                  a[i] = n[i].fn;
                return a;
              }),
              (o.prototype.listenerCount = function (e) {
                var t = r ? r + e : e,
                  n = this._events[t];
                return n ? (n.fn ? 1 : n.length) : 0;
              }),
              (o.prototype.emit = function (e, t, n, i, s, a) {
                var o = r ? r + e : e;
                if (!this._events[o]) return !1;
                var l,
                  u,
                  c = this._events[o],
                  h = arguments.length;
                if (c.fn) {
                  switch (
                    (c.once && this.removeListener(e, c.fn, void 0, !0), h)
                  ) {
                    case 1:
                      return (c.fn.call(c.context), !0);
                    case 2:
                      return (c.fn.call(c.context, t), !0);
                    case 3:
                      return (c.fn.call(c.context, t, n), !0);
                    case 4:
                      return (c.fn.call(c.context, t, n, i), !0);
                    case 5:
                      return (c.fn.call(c.context, t, n, i, s), !0);
                    case 6:
                      return (c.fn.call(c.context, t, n, i, s, a), !0);
                  }
                  for (u = 1, l = Array(h - 1); u < h; u++)
                    l[u - 1] = arguments[u];
                  c.fn.apply(c.context, l);
                } else {
                  var d,
                    p = c.length;
                  for (u = 0; u < p; u++)
                    switch (
                      (c[u].once && this.removeListener(e, c[u].fn, void 0, !0),
                      h)
                    ) {
                      case 1:
                        c[u].fn.call(c[u].context);
                        break;
                      case 2:
                        c[u].fn.call(c[u].context, t);
                        break;
                      case 3:
                        c[u].fn.call(c[u].context, t, n);
                        break;
                      case 4:
                        c[u].fn.call(c[u].context, t, n, i);
                        break;
                      default:
                        if (!l)
                          for (d = 1, l = Array(h - 1); d < h; d++)
                            l[d - 1] = arguments[d];
                        c[u].fn.apply(c[u].context, l);
                    }
                }
                return !0;
              }),
              (o.prototype.on = function (e, t, r) {
                return s(this, e, t, r, !1);
              }),
              (o.prototype.once = function (e, t, r) {
                return s(this, e, t, r, !0);
              }),
              (o.prototype.removeListener = function (e, t, n, i) {
                var s = r ? r + e : e;
                if (!this._events[s]) return this;
                if (!t) return (a(this, s), this);
                var o = this._events[s];
                if (o.fn)
                  o.fn !== t ||
                    (i && !o.once) ||
                    (n && o.context !== n) ||
                    a(this, s);
                else {
                  for (var l = 0, u = [], c = o.length; l < c; l++)
                    (o[l].fn !== t ||
                      (i && !o[l].once) ||
                      (n && o[l].context !== n)) &&
                      u.push(o[l]);
                  u.length
                    ? (this._events[s] = 1 === u.length ? u[0] : u)
                    : a(this, s);
                }
                return this;
              }),
              (o.prototype.removeAllListeners = function (e) {
                var t;
                return (
                  e
                    ? ((t = r ? r + e : e), this._events[t] && a(this, t))
                    : ((this._events = new n()), (this._eventsCount = 0)),
                  this
                );
              }),
              (o.prototype.off = o.prototype.removeListener),
              (o.prototype.addListener = o.prototype.on),
              (o.prefixed = r),
              (o.EventEmitter = o),
              (e.exports = o));
          },
          213: (e) => {
            e.exports = (e, t) => (
              (t = t || (() => {})),
              e.then(
                (e) =>
                  new Promise((e) => {
                    e(t());
                  }).then(() => e),
                (e) =>
                  new Promise((e) => {
                    e(t());
                  }).then(() => {
                    throw e;
                  })
              )
            );
          },
          574: (e, t) => {
            (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.default = function (e, t, r) {
                let n = 0,
                  i = e.length;
                for (; i > 0; ) {
                  let s = (i / 2) | 0,
                    a = n + s;
                  0 >= r(e[a], t) ? ((n = ++a), (i -= s + 1)) : (i = s);
                }
                return n;
              }));
          },
          821: (e, t, r) => {
            Object.defineProperty(t, '__esModule', { value: !0 });
            let n = r(574);
            t.default = class {
              constructor() {
                this._queue = [];
              }
              enqueue(e, t) {
                let r = {
                  priority: (t = Object.assign({ priority: 0 }, t)).priority,
                  run: e,
                };
                if (
                  this.size &&
                  this._queue[this.size - 1].priority >= t.priority
                )
                  return void this._queue.push(r);
                let i = n.default(
                  this._queue,
                  r,
                  (e, t) => t.priority - e.priority
                );
                this._queue.splice(i, 0, r);
              }
              dequeue() {
                let e = this._queue.shift();
                return null == e ? void 0 : e.run;
              }
              filter(e) {
                return this._queue
                  .filter((t) => t.priority === e.priority)
                  .map((e) => e.run);
              }
              get size() {
                return this._queue.length;
              }
            };
          },
          816: (e, t, r) => {
            let n = r(213);
            class i extends Error {
              constructor(e) {
                (super(e), (this.name = 'TimeoutError'));
              }
            }
            let s = (e, t, r) =>
              new Promise((s, a) => {
                if ('number' != typeof t || t < 0)
                  throw TypeError(
                    'Expected `milliseconds` to be a positive number'
                  );
                if (t === 1 / 0) return void s(e);
                let o = setTimeout(() => {
                  if ('function' == typeof r) {
                    try {
                      s(r());
                    } catch (e) {
                      a(e);
                    }
                    return;
                  }
                  let n =
                      'string' == typeof r
                        ? r
                        : `Promise timed out after ${t} milliseconds`,
                    o = r instanceof Error ? r : new i(n);
                  ('function' == typeof e.cancel && e.cancel(), a(o));
                }, t);
                n(e.then(s, a), () => {
                  clearTimeout(o);
                });
              });
            ((e.exports = s),
              (e.exports.default = s),
              (e.exports.TimeoutError = i));
          },
        },
        o = {};
      function l(e) {
        var t = o[e];
        if (void 0 !== t) return t.exports;
        var r = (o[e] = { exports: {} }),
          n = !0;
        try {
          (a[e](r, r.exports, l), (n = !1));
        } finally {
          n && delete o[e];
        }
        return r.exports;
      }
      l.ab = '/ROOT/node_modules/next/dist/compiled/p-queue/';
      var u = {};
      (Object.defineProperty(u, '__esModule', { value: !0 }),
        (e = l(993)),
        (r = l(816)),
        (n = l(821)),
        (i = () => {}),
        (s = new r.TimeoutError()),
        (u.default = class extends e {
          constructor(e) {
            var t, r, s, a;
            if (
              (super(),
              (this._intervalCount = 0),
              (this._intervalEnd = 0),
              (this._pendingCount = 0),
              (this._resolveEmpty = i),
              (this._resolveIdle = i),
              !(
                'number' ==
                  typeof (e = Object.assign(
                    {
                      carryoverConcurrencyCount: !1,
                      intervalCap: 1 / 0,
                      interval: 0,
                      concurrency: 1 / 0,
                      autoStart: !0,
                      queueClass: n.default,
                    },
                    e
                  )).intervalCap && e.intervalCap >= 1
              ))
            )
              throw TypeError(
                `Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r = null == (t = e.intervalCap) ? void 0 : t.toString()) ? r : ''}\` (${typeof e.intervalCap})`
              );
            if (
              void 0 === e.interval ||
              !(Number.isFinite(e.interval) && e.interval >= 0)
            )
              throw TypeError(
                `Expected \`interval\` to be a finite number >= 0, got \`${null != (a = null == (s = e.interval) ? void 0 : s.toString()) ? a : ''}\` (${typeof e.interval})`
              );
            ((this._carryoverConcurrencyCount = e.carryoverConcurrencyCount),
              (this._isIntervalIgnored =
                e.intervalCap === 1 / 0 || 0 === e.interval),
              (this._intervalCap = e.intervalCap),
              (this._interval = e.interval),
              (this._queue = new e.queueClass()),
              (this._queueClass = e.queueClass),
              (this.concurrency = e.concurrency),
              (this._timeout = e.timeout),
              (this._throwOnTimeout = !0 === e.throwOnTimeout),
              (this._isPaused = !1 === e.autoStart));
          }
          get _doesIntervalAllowAnother() {
            return (
              this._isIntervalIgnored || this._intervalCount < this._intervalCap
            );
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            (this._pendingCount--,
              this._tryToStartAnother(),
              this.emit('next'));
          }
          _resolvePromises() {
            (this._resolveEmpty(),
              (this._resolveEmpty = i),
              0 === this._pendingCount &&
                (this._resolveIdle(),
                (this._resolveIdle = i),
                this.emit('idle')));
          }
          _onResumeInterval() {
            (this._onInterval(),
              this._initializeIntervalIfNeeded(),
              (this._timeoutId = void 0));
          }
          _isIntervalPaused() {
            let e = Date.now();
            if (void 0 === this._intervalId) {
              let t = this._intervalEnd - e;
              if (!(t < 0))
                return (
                  void 0 === this._timeoutId &&
                    (this._timeoutId = setTimeout(() => {
                      this._onResumeInterval();
                    }, t)),
                  !0
                );
              this._intervalCount = this._carryoverConcurrencyCount
                ? this._pendingCount
                : 0;
            }
            return !1;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size)
              return (
                this._intervalId && clearInterval(this._intervalId),
                (this._intervalId = void 0),
                this._resolvePromises(),
                !1
              );
            if (!this._isPaused) {
              let e = !this._isIntervalPaused();
              if (
                this._doesIntervalAllowAnother &&
                this._doesConcurrentAllowAnother
              ) {
                let t = this._queue.dequeue();
                return (
                  !!t &&
                  (this.emit('active'),
                  t(),
                  e && this._initializeIntervalIfNeeded(),
                  !0)
                );
              }
            }
            return !1;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored ||
              void 0 !== this._intervalId ||
              ((this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval)),
              (this._intervalEnd = Date.now() + this._interval));
          }
          _onInterval() {
            (0 === this._intervalCount &&
              0 === this._pendingCount &&
              this._intervalId &&
              (clearInterval(this._intervalId), (this._intervalId = void 0)),
              (this._intervalCount = this._carryoverConcurrencyCount
                ? this._pendingCount
                : 0),
              this._processQueue());
          }
          _processQueue() {
            for (; this._tryToStartAnother(); );
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e) {
            if (!('number' == typeof e && e >= 1))
              throw TypeError(
                `Expected \`concurrency\` to be a number from 1 and up, got \`${e}\` (${typeof e})`
              );
            ((this._concurrency = e), this._processQueue());
          }
          async add(e, t = {}) {
            return new Promise((n, i) => {
              let a = async () => {
                (this._pendingCount++, this._intervalCount++);
                try {
                  let a =
                    void 0 === this._timeout && void 0 === t.timeout
                      ? e()
                      : r.default(
                          Promise.resolve(e()),
                          void 0 === t.timeout ? this._timeout : t.timeout,
                          () => {
                            (void 0 === t.throwOnTimeout
                              ? this._throwOnTimeout
                              : t.throwOnTimeout) && i(s);
                          }
                        );
                  n(await a);
                } catch (e) {
                  i(e);
                }
                this._next();
              };
              (this._queue.enqueue(a, t),
                this._tryToStartAnother(),
                this.emit('add'));
            });
          }
          async addAll(e, t) {
            return Promise.all(e.map(async (e) => this.add(e, t)));
          }
          start() {
            return (
              this._isPaused && ((this._isPaused = !1), this._processQueue()),
              this
            );
          }
          pause() {
            this._isPaused = !0;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size)
              return new Promise((e) => {
                let t = this._resolveEmpty;
                this._resolveEmpty = () => {
                  (t(), e());
                };
              });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size)
              return new Promise((e) => {
                let t = this._resolveIdle;
                this._resolveIdle = () => {
                  (t(), e());
                };
              });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e) {
            return this._queue.filter(e).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e) {
            this._timeout = e;
          }
        }),
        (t.exports = u));
    })();
  },
  51187,
  (e, t, r) => {
    t.exports = e.x(
      'next/dist/server/lib/incremental-cache/tags-manifest.external.js',
      () =>
        require('next/dist/server/lib/incremental-cache/tags-manifest.external.js')
    );
  },
  78500,
  (e, t, r) => {
    t.exports = e.x('node:async_hooks', () => require('node:async_hooks'));
  },
  22947,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      getTestReqInfo: function () {
        return l;
      },
      withRequest: function () {
        return o;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = new (e.r(78500).AsyncLocalStorage)();
    function a(e, t) {
      let r = t.header(e, 'next-test-proxy-port');
      if (!r) return;
      let n = t.url(e);
      return {
        url: n,
        proxyPort: Number(r),
        testData: t.header(e, 'next-test-data') || '',
      };
    }
    function o(e, t, r) {
      let n = a(e, t);
      return n ? s.run(n, r) : r();
    }
    function l(e, t) {
      let r = s.getStore();
      return r || (e && t ? a(e, t) : void 0);
    }
  },
  49883,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      handleFetch: function () {
        return l;
      },
      interceptFetch: function () {
        return u;
      },
      reader: function () {
        return a;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = e.r(22947),
      a = { url: (e) => e.url, header: (e, t) => e.headers.get(t) };
    async function o(e, t) {
      let {
        url: r,
        method: n,
        headers: i,
        body: s,
        cache: a,
        credentials: o,
        integrity: l,
        mode: u,
        redirect: c,
        referrer: h,
        referrerPolicy: d,
      } = t;
      return {
        testData: e,
        api: 'fetch',
        request: {
          url: r,
          method: n,
          headers: [
            ...Array.from(i),
            [
              'next-test-stack',
              (function () {
                let e = (Error().stack ?? '').split('\n');
                for (let t = 1; t < e.length; t++)
                  if (e[t].length > 0) {
                    e = e.slice(t);
                    break;
                  }
                return (e = (e = (e = e.filter(
                  (e) => !e.includes('/next/dist/')
                )).slice(0, 5)).map((e) =>
                  e.replace('webpack-internal:///(rsc)/', '').trim()
                )).join('    ');
              })(),
            ],
          ],
          body: s
            ? Buffer.from(await t.arrayBuffer()).toString('base64')
            : null,
          cache: a,
          credentials: o,
          integrity: l,
          mode: u,
          redirect: c,
          referrer: h,
          referrerPolicy: d,
        },
      };
    }
    async function l(e, t) {
      let r = (0, s.getTestReqInfo)(t, a);
      if (!r) return e(t);
      let { testData: n, proxyPort: i } = r,
        l = await o(n, t),
        u = await e(`http://localhost:${i}`, {
          method: 'POST',
          body: JSON.stringify(l),
          next: { internal: !0 },
        });
      if (!u.ok)
        throw Object.defineProperty(
          Error(`Proxy request failed: ${u.status}`),
          '__NEXT_ERROR_CODE',
          { value: 'E146', enumerable: !1, configurable: !0 }
        );
      let c = await u.json(),
        { api: h } = c;
      switch (h) {
        case 'continue':
          return e(t);
        case 'abort':
        case 'unhandled':
          throw Object.defineProperty(
            Error(`Proxy request aborted [${t.method} ${t.url}]`),
            '__NEXT_ERROR_CODE',
            { value: 'E145', enumerable: !1, configurable: !0 }
          );
        case 'fetch':
          return (function (e) {
            let { status: t, headers: r, body: n } = e.response;
            return new Response(n ? Buffer.from(n, 'base64') : null, {
              status: t,
              headers: new Headers(r),
            });
          })(c);
        default:
          return h;
      }
    }
    function u(t) {
      return (
        (e.g.fetch = function (e, r) {
          var n;
          return (null == r || null == (n = r.next) ? void 0 : n.internal)
            ? t(e, r)
            : l(t, new Request(e, r));
        }),
        () => {
          e.g.fetch = t;
        }
      );
    }
  },
  76532,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      interceptTestApis: function () {
        return o;
      },
      wrapRequestHandler: function () {
        return l;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = e.r(22947),
      a = e.r(49883);
    function o() {
      return (0, a.interceptFetch)(e.g.fetch);
    }
    function l(e) {
      return (t, r) => (0, s.withRequest)(t, a.reader, () => e(t, r));
    }
  },
  9933,
  (e, t, r) => {
    'use strict';
    let n;
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      (r.parseCookie = h),
      (r.parse = h),
      (r.stringifyCookie = function (e, t) {
        let r = t?.encode || encodeURIComponent,
          n = [];
        for (let t of Object.keys(e)) {
          let a = e[t];
          if (void 0 === a) continue;
          if (!i.test(t)) throw TypeError(`cookie name is invalid: ${t}`);
          let o = r(a);
          if (!s.test(o)) throw TypeError(`cookie val is invalid: ${a}`);
          n.push(`${t}=${o}`);
        }
        return n.join('; ');
      }),
      (r.stringifySetCookie = d),
      (r.serialize = d),
      (r.parseSetCookie = function (e, t) {
        let r = t?.decode || m,
          n = e.length,
          i = p(e, 0, n),
          s = f(e, 0, i),
          a =
            -1 === s
              ? { name: '', value: r(g(e, 0, i)) }
              : { name: g(e, 0, s), value: r(g(e, s + 1, i)) },
          o = i + 1;
        for (; o < n; ) {
          let t = p(e, o, n),
            r = f(e, o, t),
            i = -1 === r ? g(e, o, t) : g(e, o, r),
            s = -1 === r ? void 0 : g(e, r + 1, t);
          switch (i.toLowerCase()) {
            case 'httponly':
              a.httpOnly = !0;
              break;
            case 'secure':
              a.secure = !0;
              break;
            case 'partitioned':
              a.partitioned = !0;
              break;
            case 'domain':
              a.domain = s;
              break;
            case 'path':
              a.path = s;
              break;
            case 'max-age':
              s && l.test(s) && (a.maxAge = Number(s));
              break;
            case 'expires':
              if (!s) break;
              let u = new Date(s);
              Number.isFinite(u.valueOf()) && (a.expires = u);
              break;
            case 'priority':
              if (!s) break;
              let c = s.toLowerCase();
              ('low' === c || 'medium' === c || 'high' === c) &&
                (a.priority = c);
              break;
            case 'samesite':
              if (!s) break;
              let h = s.toLowerCase();
              ('lax' === h || 'strict' === h || 'none' === h) &&
                (a.sameSite = h);
          }
          o = t + 1;
        }
        return a;
      }),
      (r.stringifySetCookie = d),
      (r.serialize = d));
    let i = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
      s = /^[\u0021-\u003A\u003C-\u007E]*$/,
      a =
        /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
      o = /^[\u0020-\u003A\u003D-\u007E]*$/,
      l = /^-?\d+$/,
      u = Object.prototype.toString,
      c = (((n = function () {}).prototype = Object.create(null)), n);
    function h(e, t) {
      let r = new c(),
        n = e.length;
      if (n < 2) return r;
      let i = t?.decode || m,
        s = 0;
      do {
        let t = f(e, s, n);
        if (-1 === t) break;
        let a = p(e, s, n);
        if (t > a) {
          s = e.lastIndexOf(';', t - 1) + 1;
          continue;
        }
        let o = g(e, s, t);
        (void 0 === r[o] && (r[o] = i(g(e, t + 1, a))), (s = a + 1));
      } while (s < n);
      return r;
    }
    function d(e, t, r) {
      let n = 'object' == typeof e ? e : { ...r, name: e, value: String(t) },
        l = ('object' == typeof t ? t : r)?.encode || encodeURIComponent;
      if (!i.test(n.name))
        throw TypeError(`argument name is invalid: ${n.name}`);
      let c = n.value ? l(n.value) : '';
      if (!s.test(c)) throw TypeError(`argument val is invalid: ${n.value}`);
      let h = n.name + '=' + c;
      if (void 0 !== n.maxAge) {
        if (!Number.isInteger(n.maxAge))
          throw TypeError(`option maxAge is invalid: ${n.maxAge}`);
        h += '; Max-Age=' + n.maxAge;
      }
      if (n.domain) {
        if (!a.test(n.domain))
          throw TypeError(`option domain is invalid: ${n.domain}`);
        h += '; Domain=' + n.domain;
      }
      if (n.path) {
        if (!o.test(n.path))
          throw TypeError(`option path is invalid: ${n.path}`);
        h += '; Path=' + n.path;
      }
      if (n.expires) {
        var d;
        if (
          ((d = n.expires),
          '[object Date]' !== u.call(d) ||
            !Number.isFinite(n.expires.valueOf()))
        )
          throw TypeError(`option expires is invalid: ${n.expires}`);
        h += '; Expires=' + n.expires.toUTCString();
      }
      if (
        (n.httpOnly && (h += '; HttpOnly'),
        n.secure && (h += '; Secure'),
        n.partitioned && (h += '; Partitioned'),
        n.priority)
      )
        switch (
          'string' == typeof n.priority ? n.priority.toLowerCase() : void 0
        ) {
          case 'low':
            h += '; Priority=Low';
            break;
          case 'medium':
            h += '; Priority=Medium';
            break;
          case 'high':
            h += '; Priority=High';
            break;
          default:
            throw TypeError(`option priority is invalid: ${n.priority}`);
        }
      if (n.sameSite)
        switch (
          'string' == typeof n.sameSite ? n.sameSite.toLowerCase() : n.sameSite
        ) {
          case !0:
          case 'strict':
            h += '; SameSite=Strict';
            break;
          case 'lax':
            h += '; SameSite=Lax';
            break;
          case 'none':
            h += '; SameSite=None';
            break;
          default:
            throw TypeError(`option sameSite is invalid: ${n.sameSite}`);
        }
      return h;
    }
    function p(e, t, r) {
      let n = e.indexOf(';', t);
      return -1 === n ? r : n;
    }
    function f(e, t, r) {
      let n = e.indexOf('=', t);
      return n < r ? n : -1;
    }
    function g(e, t, r) {
      let n = t,
        i = r;
      do {
        let t = e.charCodeAt(n);
        if (32 !== t && 9 !== t) break;
      } while (++n < i);
      for (; i > n; ) {
        let t = e.charCodeAt(i - 1);
        if (32 !== t && 9 !== t) break;
        i--;
      }
      return e.slice(n, i);
    }
    function m(e) {
      if (-1 === e.indexOf('%')) return e;
      try {
        return decodeURIComponent(e);
      } catch (t) {
        return e;
      }
    }
  },
  3995,
  (e, t, r) => {},
  12953,
  (e, t, r) => {
    'use strict';
    function n(e, t, r) {
      if (e) {
        for (let n of (r && (r = r.toLowerCase()), e))
          if (
            t === n.domain?.split(':', 1)[0].toLowerCase() ||
            r === n.defaultLocale.toLowerCase() ||
            n.locales?.some((e) => e.toLowerCase() === r)
          )
            return n;
      }
    }
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'detectDomainLocale', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  57520,
  (e, t, r) => {
    'use strict';
    function n(e) {
      return e.replace(/\/$/, '') || '/';
    }
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'removeTrailingSlash', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  52799,
  (e, t, r) => {
    'use strict';
    function n(e) {
      let t = e.indexOf('#'),
        r = e.indexOf('?'),
        n = r > -1 && (t < 0 || r < t);
      return n || t > -1
        ? {
            pathname: e.substring(0, n ? r : t),
            query: n ? e.substring(r, t > -1 ? t : void 0) : '',
            hash: t > -1 ? e.slice(t) : '',
          }
        : { pathname: e, query: '', hash: '' };
    }
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'parsePath', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  11959,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'addPathPrefix', {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = e.r(52799);
    function i(e, t) {
      if (!e.startsWith('/') || !t) return e;
      let { pathname: r, query: i, hash: s } = (0, n.parsePath)(e);
      return `${t}${r}${i}${s}`;
    }
  },
  30652,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'addPathSuffix', {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = e.r(52799);
    function i(e, t) {
      if (!e.startsWith('/') || !t) return e;
      let { pathname: r, query: i, hash: s } = (0, n.parsePath)(e);
      return `${r}${t}${i}${s}`;
    }
  },
  86984,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'pathHasPrefix', {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = e.r(52799);
    function i(e, t) {
      if ('string' != typeof e) return !1;
      let { pathname: r } = (0, n.parsePath)(e);
      return r === t || r.startsWith(t + '/');
    }
  },
  99256,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'addLocale', {
        enumerable: !0,
        get: function () {
          return s;
        },
      }));
    let n = e.r(11959),
      i = e.r(86984);
    function s(e, t, r, s) {
      if (!t || t === r) return e;
      let a = e.toLowerCase();
      return !s &&
        ((0, i.pathHasPrefix)(a, '/api') ||
          (0, i.pathHasPrefix)(a, `/${t.toLowerCase()}`))
        ? e
        : (0, n.addPathPrefix)(e, `/${t}`);
    }
  },
  16107,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'formatNextPathnameInfo', {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let n = e.r(57520),
      i = e.r(11959),
      s = e.r(30652),
      a = e.r(99256);
    function o(e) {
      let t = (0, a.addLocale)(
        e.pathname,
        e.locale,
        e.buildId ? void 0 : e.defaultLocale,
        e.ignorePrefix
      );
      return (
        (e.buildId || !e.trailingSlash) && (t = (0, n.removeTrailingSlash)(t)),
        e.buildId &&
          (t = (0, s.addPathSuffix)(
            (0, i.addPathPrefix)(t, `/_next/data/${e.buildId}`),
            '/' === e.pathname ? 'index.json' : '.json'
          )),
        (t = (0, i.addPathPrefix)(t, e.basePath)),
        !e.buildId && e.trailingSlash
          ? t.endsWith('/')
            ? t
            : (0, s.addPathSuffix)(t, '/')
          : (0, n.removeTrailingSlash)(t)
      );
    }
  },
  26729,
  (e, t, r) => {
    'use strict';
    function n(e, t) {
      let r;
      if (t?.host && !Array.isArray(t.host))
        r = t.host.toString().split(':', 1)[0];
      else {
        if (!e.hostname) return;
        r = e.hostname;
      }
      return r.toLowerCase();
    }
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'getHostname', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  96045,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'normalizeLocalePath', {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = new WeakMap();
    function i(e, t) {
      let r;
      if (!t) return { pathname: e };
      let i = n.get(t);
      i || ((i = t.map((e) => e.toLowerCase())), n.set(t, i));
      let s = e.split('/', 2);
      if (!s[1]) return { pathname: e };
      let a = s[1].toLowerCase(),
        o = i.indexOf(a);
      return o < 0
        ? { pathname: e }
        : ((r = t[o]),
          { pathname: (e = e.slice(r.length + 1) || '/'), detectedLocale: r });
    }
  },
  92624,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'removePathPrefix', {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = e.r(86984);
    function i(e, t) {
      if (!(0, n.pathHasPrefix)(e, t)) return e;
      let r = e.slice(t.length);
      return r.startsWith('/') ? r : `/${r}`;
    }
  },
  7657,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'getNextPathnameInfo', {
        enumerable: !0,
        get: function () {
          return a;
        },
      }));
    let n = e.r(96045),
      i = e.r(92624),
      s = e.r(86984);
    function a(e, t) {
      let { basePath: r, i18n: a, trailingSlash: o } = t.nextConfig ?? {},
        l = { pathname: e, trailingSlash: '/' !== e ? e.endsWith('/') : o };
      r &&
        (0, s.pathHasPrefix)(l.pathname, r) &&
        ((l.pathname = (0, i.removePathPrefix)(l.pathname, r)),
        (l.basePath = r));
      let u = l.pathname;
      if (
        l.pathname.startsWith('/_next/data/') &&
        l.pathname.endsWith('.json')
      ) {
        let e = l.pathname
          .replace(/^\/_next\/data\//, '')
          .replace(/\.json$/, '')
          .split('/');
        ((l.buildId = e[0]),
          (u = 'index' !== e[1] ? `/${e.slice(1).join('/')}` : '/'),
          !0 === t.parseData && (l.pathname = u));
      }
      if (a) {
        let e = t.i18nProvider
          ? t.i18nProvider.analyze(l.pathname)
          : (0, n.normalizeLocalePath)(l.pathname, a.locales);
        ((l.locale = e.detectedLocale),
          (l.pathname = e.pathname ?? l.pathname),
          !e.detectedLocale &&
            l.buildId &&
            (e = t.i18nProvider
              ? t.i18nProvider.analyze(u)
              : (0, n.normalizeLocalePath)(u, a.locales)).detectedLocale &&
            (l.locale = e.detectedLocale));
      }
      return l;
    }
  },
  61400,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'NextURL', {
        enumerable: !0,
        get: function () {
          return c;
        },
      }));
    let n = e.r(12953),
      i = e.r(16107),
      s = e.r(26729),
      a = e.r(7657),
      o =
        /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
    function l(e, t) {
      return new URL(
        String(e).replace(o, 'localhost'),
        t && String(t).replace(o, 'localhost')
      );
    }
    let u = Symbol('NextURLInternal');
    class c {
      constructor(e, t, r) {
        let n, i;
        (('object' == typeof t && 'pathname' in t) || 'string' == typeof t
          ? ((n = t), (i = r || {}))
          : (i = r || t || {}),
          (this[u] = { url: l(e, n ?? i.base), options: i, basePath: '' }),
          this.analyze());
      }
      analyze() {
        var e, t, r, i, o;
        let l = (0, a.getNextPathnameInfo)(this[u].url.pathname, {
            nextConfig: this[u].options.nextConfig,
            parseData: !0,
            i18nProvider: this[u].options.i18nProvider,
          }),
          c = (0, s.getHostname)(this[u].url, this[u].options.headers);
        this[u].domainLocale = this[u].options.i18nProvider
          ? this[u].options.i18nProvider.detectDomainLocale(c)
          : (0, n.detectDomainLocale)(
              null == (t = this[u].options.nextConfig) || null == (e = t.i18n)
                ? void 0
                : e.domains,
              c
            );
        let h =
          (null == (r = this[u].domainLocale) ? void 0 : r.defaultLocale) ||
          (null == (o = this[u].options.nextConfig) || null == (i = o.i18n)
            ? void 0
            : i.defaultLocale);
        ((this[u].url.pathname = l.pathname),
          (this[u].defaultLocale = h),
          (this[u].basePath = l.basePath ?? ''),
          (this[u].buildId = l.buildId),
          (this[u].locale = l.locale ?? h),
          (this[u].trailingSlash = l.trailingSlash));
      }
      formatPathname() {
        return (0, i.formatNextPathnameInfo)({
          basePath: this[u].basePath,
          buildId: this[u].buildId,
          defaultLocale: this[u].options.forceLocale
            ? void 0
            : this[u].defaultLocale,
          locale: this[u].locale,
          pathname: this[u].url.pathname,
          trailingSlash: this[u].trailingSlash,
        });
      }
      formatSearch() {
        return this[u].url.search;
      }
      get buildId() {
        return this[u].buildId;
      }
      set buildId(e) {
        this[u].buildId = e;
      }
      get locale() {
        return this[u].locale ?? '';
      }
      set locale(e) {
        var t, r;
        if (
          !this[u].locale ||
          !(null == (r = this[u].options.nextConfig) || null == (t = r.i18n)
            ? void 0
            : t.locales.includes(e))
        )
          throw Object.defineProperty(
            TypeError(`The NextURL configuration includes no locale "${e}"`),
            '__NEXT_ERROR_CODE',
            { value: 'E597', enumerable: !1, configurable: !0 }
          );
        this[u].locale = e;
      }
      get defaultLocale() {
        return this[u].defaultLocale;
      }
      get domainLocale() {
        return this[u].domainLocale;
      }
      get searchParams() {
        return this[u].url.searchParams;
      }
      get host() {
        return this[u].url.host;
      }
      set host(e) {
        this[u].url.host = e;
      }
      get hostname() {
        return this[u].url.hostname;
      }
      set hostname(e) {
        this[u].url.hostname = e;
      }
      get port() {
        return this[u].url.port;
      }
      set port(e) {
        this[u].url.port = e;
      }
      get protocol() {
        return this[u].url.protocol;
      }
      set protocol(e) {
        this[u].url.protocol = e;
      }
      get href() {
        let e = this.formatPathname(),
          t = this.formatSearch();
        return `${this.protocol}//${this.host}${e}${t}${this.hash}`;
      }
      set href(e) {
        ((this[u].url = l(e)), this.analyze());
      }
      get origin() {
        return this[u].url.origin;
      }
      get pathname() {
        return this[u].url.pathname;
      }
      set pathname(e) {
        this[u].url.pathname = e;
      }
      get hash() {
        return this[u].url.hash;
      }
      set hash(e) {
        this[u].url.hash = e;
      }
      get search() {
        return this[u].url.search;
      }
      set search(e) {
        this[u].url.search = e;
      }
      get password() {
        return this[u].url.password;
      }
      set password(e) {
        this[u].url.password = e;
      }
      get username() {
        return this[u].url.username;
      }
      set username(e) {
        this[u].url.username = e;
      }
      get basePath() {
        return this[u].basePath;
      }
      set basePath(e) {
        this[u].basePath = e.startsWith('/') ? e : `/${e}`;
      }
      toString() {
        return this.href;
      }
      toJSON() {
        return this.href;
      }
      [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
          href: this.href,
          origin: this.origin,
          protocol: this.protocol,
          username: this.username,
          password: this.password,
          host: this.host,
          hostname: this.hostname,
          port: this.port,
          pathname: this.pathname,
          search: this.search,
          searchParams: this.searchParams,
          hash: this.hash,
        };
      }
      clone() {
        return new c(String(this), this[u].options);
      }
    }
  },
  30009,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      ACTION_SUFFIX: function () {
        return m;
      },
      APP_DIR_ALIAS: function () {
        return U;
      },
      CACHE_ONE_YEAR: function () {
        return P;
      },
      DOT_NEXT_ALIAS: function () {
        return $;
      },
      ESLINT_DEFAULT_DIRS: function () {
        return ei;
      },
      GSP_NO_RETURNED_VALUE: function () {
        return Q;
      },
      GSSP_COMPONENT_MEMBER_ERROR: function () {
        return et;
      },
      GSSP_NO_RETURNED_VALUE: function () {
        return Z;
      },
      HTML_CONTENT_TYPE_HEADER: function () {
        return a;
      },
      INFINITE_CACHE: function () {
        return x;
      },
      INSTRUMENTATION_HOOK_FILENAME: function () {
        return j;
      },
      JSON_CONTENT_TYPE_HEADER: function () {
        return o;
      },
      MATCHED_PATH_HEADER: function () {
        return c;
      },
      MIDDLEWARE_FILENAME: function () {
        return A;
      },
      MIDDLEWARE_LOCATION_REGEXP: function () {
        return C;
      },
      NEXT_BODY_SUFFIX: function () {
        return v;
      },
      NEXT_CACHE_IMPLICIT_TAG_ID: function () {
        return k;
      },
      NEXT_CACHE_REVALIDATED_TAGS_HEADER: function () {
        return _;
      },
      NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function () {
        return E;
      },
      NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function () {
        return T;
      },
      NEXT_CACHE_TAGS_HEADER: function () {
        return w;
      },
      NEXT_CACHE_TAG_MAX_ITEMS: function () {
        return R;
      },
      NEXT_CACHE_TAG_MAX_LENGTH: function () {
        return O;
      },
      NEXT_DATA_SUFFIX: function () {
        return y;
      },
      NEXT_INTERCEPTION_MARKER_PREFIX: function () {
        return u;
      },
      NEXT_META_SUFFIX: function () {
        return b;
      },
      NEXT_QUERY_PARAM_PREFIX: function () {
        return l;
      },
      NEXT_RESUME_HEADER: function () {
        return S;
      },
      NON_STANDARD_NODE_ENV: function () {
        return er;
      },
      PAGES_DIR_ALIAS: function () {
        return D;
      },
      PRERENDER_REVALIDATE_HEADER: function () {
        return h;
      },
      PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function () {
        return d;
      },
      PROXY_FILENAME: function () {
        return I;
      },
      PROXY_LOCATION_REGEXP: function () {
        return N;
      },
      PUBLIC_DIR_MIDDLEWARE_CONFLICT: function () {
        return F;
      },
      ROOT_DIR_ALIAS: function () {
        return L;
      },
      RSC_ACTION_CLIENT_WRAPPER_ALIAS: function () {
        return H;
      },
      RSC_ACTION_ENCRYPTION_ALIAS: function () {
        return G;
      },
      RSC_ACTION_PROXY_ALIAS: function () {
        return q;
      },
      RSC_ACTION_VALIDATE_ALIAS: function () {
        return B;
      },
      RSC_CACHE_WRAPPER_ALIAS: function () {
        return V;
      },
      RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS: function () {
        return W;
      },
      RSC_MOD_REF_PROXY_ALIAS: function () {
        return M;
      },
      RSC_SEGMENTS_DIR_SUFFIX: function () {
        return p;
      },
      RSC_SEGMENT_SUFFIX: function () {
        return f;
      },
      RSC_SUFFIX: function () {
        return g;
      },
      SERVER_PROPS_EXPORT_ERROR: function () {
        return Y;
      },
      SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function () {
        return K;
      },
      SERVER_PROPS_SSG_CONFLICT: function () {
        return X;
      },
      SERVER_RUNTIME: function () {
        return es;
      },
      SSG_FALLBACK_EXPORT_ERROR: function () {
        return en;
      },
      SSG_GET_INITIAL_PROPS_CONFLICT: function () {
        return z;
      },
      STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function () {
        return J;
      },
      TEXT_PLAIN_CONTENT_TYPE_HEADER: function () {
        return s;
      },
      UNSTABLE_REVALIDATE_RENAME_ERROR: function () {
        return ee;
      },
      WEBPACK_LAYERS: function () {
        return el;
      },
      WEBPACK_RESOURCE_QUERIES: function () {
        return eu;
      },
      WEB_SOCKET_MAX_RECONNECTIONS: function () {
        return ea;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = 'text/plain',
      a = 'text/html; charset=utf-8',
      o = 'application/json; charset=utf-8',
      l = 'nxtP',
      u = 'nxtI',
      c = 'x-matched-path',
      h = 'x-prerender-revalidate',
      d = 'x-prerender-revalidate-if-generated',
      p = '.segments',
      f = '.segment.rsc',
      g = '.rsc',
      m = '.action',
      y = '.json',
      b = '.meta',
      v = '.body',
      w = 'x-next-cache-tags',
      _ = 'x-next-revalidated-tags',
      E = 'x-next-revalidate-tag-token',
      S = 'next-resume',
      R = 128,
      O = 256,
      T = 1024,
      k = '_N_T_',
      P = 31536e3,
      x = 0xfffffffe,
      A = 'middleware',
      C = `(?:src/)?${A}`,
      I = 'proxy',
      N = `(?:src/)?${I}`,
      j = 'instrumentation',
      D = 'private-next-pages',
      $ = 'private-dot-next',
      L = 'private-next-root-dir',
      U = 'private-next-app-dir',
      M = 'private-next-rsc-mod-ref-proxy',
      B = 'private-next-rsc-action-validate',
      q = 'private-next-rsc-server-reference',
      V = 'private-next-rsc-cache-wrapper',
      W = 'private-next-rsc-track-dynamic-import',
      G = 'private-next-rsc-action-encryption',
      H = 'private-next-rsc-action-client-wrapper',
      F =
        "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict",
      z =
        'You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps',
      K =
        'You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.',
      X =
        'You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps',
      J =
        'can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props',
      Y =
        'pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export',
      Q =
        'Your `getStaticProps` function did not return an object. Did you forget to add a `return`?',
      Z =
        'Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?',
      ee =
        'The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.',
      et =
        "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member",
      er =
        'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env',
      en =
        'Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export',
      ei = ['app', 'pages', 'components', 'lib', 'src'],
      es = {
        edge: 'edge',
        experimentalEdge: 'experimental-edge',
        nodejs: 'nodejs',
      },
      ea = 12,
      eo = {
        shared: 'shared',
        reactServerComponents: 'rsc',
        serverSideRendering: 'ssr',
        actionBrowser: 'action-browser',
        apiNode: 'api-node',
        apiEdge: 'api-edge',
        middleware: 'middleware',
        instrument: 'instrument',
        edgeAsset: 'edge-asset',
        appPagesBrowser: 'app-pages-browser',
        pagesDirBrowser: 'pages-dir-browser',
        pagesDirEdge: 'pages-dir-edge',
        pagesDirNode: 'pages-dir-node',
      },
      el = {
        ...eo,
        GROUP: {
          builtinReact: [eo.reactServerComponents, eo.actionBrowser],
          serverOnly: [
            eo.reactServerComponents,
            eo.actionBrowser,
            eo.instrument,
            eo.middleware,
          ],
          neutralTarget: [eo.apiNode, eo.apiEdge],
          clientOnly: [eo.serverSideRendering, eo.appPagesBrowser],
          bundled: [
            eo.reactServerComponents,
            eo.actionBrowser,
            eo.serverSideRendering,
            eo.appPagesBrowser,
            eo.shared,
            eo.instrument,
            eo.middleware,
          ],
          appPages: [
            eo.reactServerComponents,
            eo.serverSideRendering,
            eo.appPagesBrowser,
            eo.actionBrowser,
          ],
        },
      },
      eu = {
        edgeSSREntry: '__next_edge_ssr_entry__',
        metadata: '__next_metadata__',
        metadataRoute: '__next_metadata_route__',
        metadataImageMeta: '__next_metadata_image_meta__',
      };
  },
  41296,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      fromNodeOutgoingHttpHeaders: function () {
        return a;
      },
      normalizeNextQueryParam: function () {
        return c;
      },
      splitCookiesString: function () {
        return o;
      },
      toNodeOutgoingHttpHeaders: function () {
        return l;
      },
      validateURL: function () {
        return u;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = e.r(30009);
    function a(e) {
      let t = new Headers();
      for (let [r, n] of Object.entries(e))
        for (let e of Array.isArray(n) ? n : [n])
          void 0 !== e &&
            ('number' == typeof e && (e = e.toString()), t.append(r, e));
      return t;
    }
    function o(e) {
      var t,
        r,
        n,
        i,
        s,
        a = [],
        o = 0;
      function l() {
        for (; o < e.length && /\s/.test(e.charAt(o)); ) o += 1;
        return o < e.length;
      }
      for (; o < e.length; ) {
        for (t = o, s = !1; l(); )
          if (',' === (r = e.charAt(o))) {
            for (
              n = o, o += 1, l(), i = o;
              o < e.length &&
              '=' !== (r = e.charAt(o)) &&
              ';' !== r &&
              ',' !== r;
            )
              o += 1;
            o < e.length && '=' === e.charAt(o)
              ? ((s = !0), (o = i), a.push(e.substring(t, n)), (t = o))
              : (o = n + 1);
          } else o += 1;
        (!s || o >= e.length) && a.push(e.substring(t, e.length));
      }
      return a;
    }
    function l(e) {
      let t = {},
        r = [];
      if (e)
        for (let [n, i] of e.entries())
          'set-cookie' === n.toLowerCase()
            ? (r.push(...o(i)), (t[n] = 1 === r.length ? r[0] : r))
            : (t[n] = i);
      return t;
    }
    function u(e) {
      try {
        return String(new URL(String(e)));
      } catch (t) {
        throw Object.defineProperty(
          Error(
            `URL is malformed "${String(e)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`,
            { cause: t }
          ),
          '__NEXT_ERROR_CODE',
          { value: 'E61', enumerable: !1, configurable: !0 }
        );
      }
    }
    function c(e) {
      for (let t of [
        s.NEXT_QUERY_PARAM_PREFIX,
        s.NEXT_INTERCEPTION_MARKER_PREFIX,
      ])
        if (e !== t && e.startsWith(t)) return e.substring(t.length);
      return null;
    }
  },
  43241,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      PageSignatureError: function () {
        return s;
      },
      RemovedPageError: function () {
        return a;
      },
      RemovedUAError: function () {
        return o;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    class s extends Error {
      constructor({ page: e }) {
        super(`The middleware "${e}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
      }
    }
    class a extends Error {
      constructor() {
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
      }
    }
    class o extends Error {
      constructor() {
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
      }
    }
  },
  77312,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      RequestCookies: function () {
        return s.RequestCookies;
      },
      ResponseCookies: function () {
        return s.ResponseCookies;
      },
      stringifyCookie: function () {
        return s.stringifyCookie;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = e.r(9254);
  },
  75447,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      INTERNALS: function () {
        return u;
      },
      NextRequest: function () {
        return c;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = e.r(61400),
      a = e.r(41296),
      o = e.r(43241),
      l = e.r(77312),
      u = Symbol('internal request');
    class c extends Request {
      constructor(e, t = {}) {
        const r = 'string' != typeof e && 'url' in e ? e.url : String(e);
        ((0, a.validateURL)(r),
          t.body && 'half' !== t.duplex && (t.duplex = 'half'),
          e instanceof Request ? super(e, t) : super(r, t));
        const n = new s.NextURL(r, {
          headers: (0, a.toNodeOutgoingHttpHeaders)(this.headers),
          nextConfig: t.nextConfig,
        });
        this[u] = {
          cookies: new l.RequestCookies(this.headers),
          nextUrl: n,
          url: n.toString(),
        };
      }
      [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
          cookies: this.cookies,
          nextUrl: this.nextUrl,
          url: this.url,
          bodyUsed: this.bodyUsed,
          cache: this.cache,
          credentials: this.credentials,
          destination: this.destination,
          headers: Object.fromEntries(this.headers),
          integrity: this.integrity,
          keepalive: this.keepalive,
          method: this.method,
          mode: this.mode,
          redirect: this.redirect,
          referrer: this.referrer,
          referrerPolicy: this.referrerPolicy,
          signal: this.signal,
        };
      }
      get cookies() {
        return this[u].cookies;
      }
      get nextUrl() {
        return this[u].nextUrl;
      }
      get page() {
        throw new o.RemovedPageError();
      }
      get ua() {
        throw new o.RemovedUAError();
      }
      get url() {
        return this[u].url;
      }
    }
  },
  8126,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'ReflectAdapter', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    class n {
      static get(e, t, r) {
        let n = Reflect.get(e, t, r);
        return 'function' == typeof n ? n.bind(e) : n;
      }
      static set(e, t, r, n) {
        return Reflect.set(e, t, r, n);
      }
      static has(e, t) {
        return Reflect.has(e, t);
      }
      static deleteProperty(e, t) {
        return Reflect.deleteProperty(e, t);
      }
    }
  },
  9052,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'NextResponse', {
        enumerable: !0,
        get: function () {
          return h;
        },
      }));
    let n = e.r(77312),
      i = e.r(61400),
      s = e.r(41296),
      a = e.r(8126),
      o = e.r(77312),
      l = Symbol('internal response'),
      u = new Set([301, 302, 303, 307, 308]);
    function c(e, t) {
      var r;
      if (null == e || null == (r = e.request) ? void 0 : r.headers) {
        if (!(e.request.headers instanceof Headers))
          throw Object.defineProperty(
            Error('request.headers must be an instance of Headers'),
            '__NEXT_ERROR_CODE',
            { value: 'E119', enumerable: !1, configurable: !0 }
          );
        let r = [];
        for (let [n, i] of e.request.headers)
          (t.set('x-middleware-request-' + n, i), r.push(n));
        t.set('x-middleware-override-headers', r.join(','));
      }
    }
    class h extends Response {
      constructor(e, t = {}) {
        super(e, t);
        const r = this.headers,
          u = new Proxy(new o.ResponseCookies(r), {
            get(e, i, s) {
              switch (i) {
                case 'delete':
                case 'set':
                  return (...s) => {
                    let a = Reflect.apply(e[i], e, s),
                      l = new Headers(r);
                    return (
                      a instanceof o.ResponseCookies &&
                        r.set(
                          'x-middleware-set-cookie',
                          a
                            .getAll()
                            .map((e) => (0, n.stringifyCookie)(e))
                            .join(',')
                        ),
                      c(t, l),
                      a
                    );
                  };
                default:
                  return a.ReflectAdapter.get(e, i, s);
              }
            },
          });
        this[l] = {
          cookies: u,
          url: t.url
            ? new i.NextURL(t.url, {
                headers: (0, s.toNodeOutgoingHttpHeaders)(r),
                nextConfig: t.nextConfig,
              })
            : void 0,
        };
      }
      [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
          cookies: this.cookies,
          url: this.url,
          body: this.body,
          bodyUsed: this.bodyUsed,
          headers: Object.fromEntries(this.headers),
          ok: this.ok,
          redirected: this.redirected,
          status: this.status,
          statusText: this.statusText,
          type: this.type,
        };
      }
      get cookies() {
        return this[l].cookies;
      }
      static json(e, t) {
        let r = Response.json(e, t);
        return new h(r.body, r);
      }
      static redirect(e, t) {
        let r =
          'number' == typeof t ? t : ((null == t ? void 0 : t.status) ?? 307);
        if (!u.has(r))
          throw Object.defineProperty(
            RangeError(
              'Failed to execute "redirect" on "response": Invalid status code'
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E529', enumerable: !1, configurable: !0 }
          );
        let n = 'object' == typeof t ? t : {},
          i = new Headers(null == n ? void 0 : n.headers);
        return (
          i.set('Location', (0, s.validateURL)(e)),
          new h(null, { ...n, headers: i, status: r })
        );
      }
      static rewrite(e, t) {
        let r = new Headers(null == t ? void 0 : t.headers);
        return (
          r.set('x-middleware-rewrite', (0, s.validateURL)(e)),
          c(t, r),
          new h(null, { ...t, headers: r })
        );
      }
      static next(e) {
        let t = new Headers(null == e ? void 0 : e.headers);
        return (
          t.set('x-middleware-next', '1'),
          c(e, t),
          new h(null, { ...e, headers: t })
        );
      }
    }
  },
  2075,
  (e, t, r) => {
    'use strict';
    function n() {
      throw Object.defineProperty(
        Error(
          'ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead'
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E183', enumerable: !1, configurable: !0 }
      );
    }
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'ImageResponse', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  6992,
  (e, t, r) => {
    var n = {
        226: function (t, r) {
          !(function (n, i) {
            'use strict';
            var s = 'function',
              a = 'undefined',
              o = 'object',
              l = 'string',
              u = 'major',
              c = 'model',
              h = 'name',
              d = 'type',
              p = 'vendor',
              f = 'version',
              g = 'architecture',
              m = 'console',
              y = 'mobile',
              b = 'tablet',
              v = 'smarttv',
              w = 'wearable',
              _ = 'embedded',
              E = 'Amazon',
              S = 'Apple',
              R = 'ASUS',
              O = 'BlackBerry',
              T = 'Browser',
              k = 'Chrome',
              P = 'Firefox',
              x = 'Google',
              A = 'Huawei',
              C = 'Microsoft',
              I = 'Motorola',
              N = 'Opera',
              j = 'Samsung',
              D = 'Sharp',
              $ = 'Sony',
              L = 'Xiaomi',
              U = 'Zebra',
              M = 'Facebook',
              B = 'Chromium OS',
              q = 'Mac OS',
              V = function (e, t) {
                var r = {};
                for (var n in e)
                  t[n] && t[n].length % 2 == 0
                    ? (r[n] = t[n].concat(e[n]))
                    : (r[n] = e[n]);
                return r;
              },
              W = function (e) {
                for (var t = {}, r = 0; r < e.length; r++)
                  t[e[r].toUpperCase()] = e[r];
                return t;
              },
              G = function (e, t) {
                return typeof e === l && -1 !== H(t).indexOf(H(e));
              },
              H = function (e) {
                return e.toLowerCase();
              },
              F = function (e, t) {
                if (typeof e === l)
                  return (
                    (e = e.replace(/^\s\s*/, '')),
                    typeof t === a ? e : e.substring(0, 350)
                  );
              },
              z = function (e, t) {
                for (var r, n, i, a, l, u, c = 0; c < t.length && !l; ) {
                  var h = t[c],
                    d = t[c + 1];
                  for (r = n = 0; r < h.length && !l && h[r]; )
                    if ((l = h[r++].exec(e)))
                      for (i = 0; i < d.length; i++)
                        ((u = l[++n]),
                          typeof (a = d[i]) === o && a.length > 0
                            ? 2 === a.length
                              ? typeof a[1] == s
                                ? (this[a[0]] = a[1].call(this, u))
                                : (this[a[0]] = a[1])
                              : 3 === a.length
                                ? typeof a[1] !== s || (a[1].exec && a[1].test)
                                  ? (this[a[0]] = u
                                      ? u.replace(a[1], a[2])
                                      : void 0)
                                  : (this[a[0]] = u
                                      ? a[1].call(this, u, a[2])
                                      : void 0)
                                : 4 === a.length &&
                                  (this[a[0]] = u
                                    ? a[3].call(this, u.replace(a[1], a[2]))
                                    : void 0)
                            : (this[a] = u || void 0));
                  c += 2;
                }
              },
              K = function (e, t) {
                for (var r in t)
                  if (typeof t[r] === o && t[r].length > 0) {
                    for (var n = 0; n < t[r].length; n++)
                      if (G(t[r][n], e)) return '?' === r ? void 0 : r;
                  } else if (G(t[r], e)) return '?' === r ? void 0 : r;
                return e;
              },
              X = {
                ME: '4.90',
                'NT 3.11': 'NT3.51',
                'NT 4.0': 'NT4.0',
                2e3: 'NT 5.0',
                XP: ['NT 5.1', 'NT 5.2'],
                Vista: 'NT 6.0',
                7: 'NT 6.1',
                8: 'NT 6.2',
                8.1: 'NT 6.3',
                10: ['NT 6.4', 'NT 10.0'],
                RT: 'ARM',
              },
              J = {
                browser: [
                  [/\b(?:crmo|crios)\/([\w\.]+)/i],
                  [f, [h, 'Chrome']],
                  [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                  [f, [h, 'Edge']],
                  [
                    /(opera mini)\/([-\w\.]+)/i,
                    /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                    /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                  ],
                  [h, f],
                  [/opios[\/ ]+([\w\.]+)/i],
                  [f, [h, N + ' Mini']],
                  [/\bopr\/([\w\.]+)/i],
                  [f, [h, N]],
                  [
                    /(kindle)\/([\w\.]+)/i,
                    /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                    /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                    /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                    /(?:ms|\()(ie) ([\w\.]+)/i,
                    /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                    /(heytap|ovi)browser\/([\d\.]+)/i,
                    /(weibo)__([\d\.]+)/i,
                  ],
                  [h, f],
                  [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                  [f, [h, 'UC' + T]],
                  [
                    /microm.+\bqbcore\/([\w\.]+)/i,
                    /\bqbcore\/([\w\.]+).+microm/i,
                  ],
                  [f, [h, 'WeChat(Win) Desktop']],
                  [/micromessenger\/([\w\.]+)/i],
                  [f, [h, 'WeChat']],
                  [/konqueror\/([\w\.]+)/i],
                  [f, [h, 'Konqueror']],
                  [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                  [f, [h, 'IE']],
                  [/ya(?:search)?browser\/([\w\.]+)/i],
                  [f, [h, 'Yandex']],
                  [/(avast|avg)\/([\w\.]+)/i],
                  [[h, /(.+)/, '$1 Secure ' + T], f],
                  [/\bfocus\/([\w\.]+)/i],
                  [f, [h, P + ' Focus']],
                  [/\bopt\/([\w\.]+)/i],
                  [f, [h, N + ' Touch']],
                  [/coc_coc\w+\/([\w\.]+)/i],
                  [f, [h, 'Coc Coc']],
                  [/dolfin\/([\w\.]+)/i],
                  [f, [h, 'Dolphin']],
                  [/coast\/([\w\.]+)/i],
                  [f, [h, N + ' Coast']],
                  [/miuibrowser\/([\w\.]+)/i],
                  [f, [h, 'MIUI ' + T]],
                  [/fxios\/([-\w\.]+)/i],
                  [f, [h, P]],
                  [/\bqihu|(qi?ho?o?|360)browser/i],
                  [[h, '360 ' + T]],
                  [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                  [[h, /(.+)/, '$1 ' + T], f],
                  [/(comodo_dragon)\/([\w\.]+)/i],
                  [[h, /_/g, ' '], f],
                  [
                    /(electron)\/([\w\.]+) safari/i,
                    /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                    /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
                  ],
                  [h, f],
                  [
                    /(metasr)[\/ ]?([\w\.]+)/i,
                    /(lbbrowser)/i,
                    /\[(linkedin)app\]/i,
                  ],
                  [h],
                  [
                    /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i,
                  ],
                  [[h, M], f],
                  [
                    /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                    /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                    /safari (line)\/([\w\.]+)/i,
                    /\b(line)\/([\w\.]+)\/iab/i,
                    /(chromium|instagram)[\/ ]([-\w\.]+)/i,
                  ],
                  [h, f],
                  [/\bgsa\/([\w\.]+) .*safari\//i],
                  [f, [h, 'GSA']],
                  [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
                  [f, [h, 'TikTok']],
                  [/headlesschrome(?:\/([\w\.]+)| )/i],
                  [f, [h, k + ' Headless']],
                  [/ wv\).+(chrome)\/([\w\.]+)/i],
                  [[h, k + ' WebView'], f],
                  [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                  [f, [h, 'Android ' + T]],
                  [
                    /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i,
                  ],
                  [h, f],
                  [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                  [f, [h, 'Mobile Safari']],
                  [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                  [f, h],
                  [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                  [
                    h,
                    [
                      f,
                      K,
                      {
                        '1.0': '/8',
                        1.2: '/1',
                        1.3: '/3',
                        '2.0': '/412',
                        '2.0.2': '/416',
                        '2.0.3': '/417',
                        '2.0.4': '/419',
                        '?': '/',
                      },
                    ],
                  ],
                  [/(webkit|khtml)\/([\w\.]+)/i],
                  [h, f],
                  [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                  [[h, 'Netscape'], f],
                  [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                  [f, [h, P + ' Reality']],
                  [
                    /ekiohf.+(flow)\/([\w\.]+)/i,
                    /(swiftfox)/i,
                    /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                    /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                    /(firefox)\/([\w\.]+)/i,
                    /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                    /(links) \(([\w\.]+)/i,
                    /panasonic;(viera)/i,
                  ],
                  [h, f],
                  [/(cobalt)\/([\w\.]+)/i],
                  [h, [f, /master.|lts./, '']],
                ],
                cpu: [
                  [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                  [[g, 'amd64']],
                  [/(ia32(?=;))/i],
                  [[g, H]],
                  [/((?:i[346]|x)86)[;\)]/i],
                  [[g, 'ia32']],
                  [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                  [[g, 'arm64']],
                  [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                  [[g, 'armhf']],
                  [/windows (ce|mobile); ppc;/i],
                  [[g, 'arm']],
                  [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                  [[g, /ower/, '', H]],
                  [/(sun4\w)[;\)]/i],
                  [[g, 'sparc']],
                  [
                    /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                  ],
                  [[g, H]],
                ],
                device: [
                  [
                    /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
                  ],
                  [c, [p, j], [d, b]],
                  [
                    /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                    /samsung[- ]([-\w]+)/i,
                    /sec-(sgh\w+)/i,
                  ],
                  [c, [p, j], [d, y]],
                  [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
                  [c, [p, S], [d, y]],
                  [
                    /\((ipad);[-\w\),; ]+apple/i,
                    /applecoremedia\/[\w\.]+ \((ipad)/i,
                    /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
                  ],
                  [c, [p, S], [d, b]],
                  [/(macintosh);/i],
                  [c, [p, S]],
                  [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                  [c, [p, D], [d, y]],
                  [
                    /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i,
                  ],
                  [c, [p, A], [d, b]],
                  [
                    /(?:huawei|honor)([-\w ]+)[;\)]/i,
                    /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
                  ],
                  [c, [p, A], [d, y]],
                  [
                    /\b(poco[\w ]+)(?: bui|\))/i,
                    /\b; (\w+) build\/hm\1/i,
                    /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                    /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                    /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                  ],
                  [
                    [c, /_/g, ' '],
                    [p, L],
                    [d, y],
                  ],
                  [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                  [
                    [c, /_/g, ' '],
                    [p, L],
                    [d, b],
                  ],
                  [
                    /; (\w+) bui.+ oppo/i,
                    /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
                  ],
                  [c, [p, 'OPPO'], [d, y]],
                  [
                    /vivo (\w+)(?: bui|\))/i,
                    /\b(v[12]\d{3}\w?[at])(?: bui|;)/i,
                  ],
                  [c, [p, 'Vivo'], [d, y]],
                  [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                  [c, [p, 'Realme'], [d, y]],
                  [
                    /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                    /\bmot(?:orola)?[- ](\w*)/i,
                    /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                  ],
                  [c, [p, I], [d, y]],
                  [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                  [c, [p, I], [d, b]],
                  [
                    /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i,
                  ],
                  [c, [p, 'LG'], [d, b]],
                  [
                    /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                    /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                    /\blg-?([\d\w]+) bui/i,
                  ],
                  [c, [p, 'LG'], [d, y]],
                  [
                    /(ideatab[-\w ]+)/i,
                    /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
                  ],
                  [c, [p, 'Lenovo'], [d, b]],
                  [
                    /(?:maemo|nokia).*(n900|lumia \d+)/i,
                    /nokia[-_ ]?([-\w\.]*)/i,
                  ],
                  [
                    [c, /_/g, ' '],
                    [p, 'Nokia'],
                    [d, y],
                  ],
                  [/(pixel c)\b/i],
                  [c, [p, x], [d, b]],
                  [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                  [c, [p, x], [d, y]],
                  [
                    /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
                  ],
                  [c, [p, $], [d, y]],
                  [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                  [
                    [c, 'Xperia Tablet'],
                    [p, $],
                    [d, b],
                  ],
                  [
                    / (kb2005|in20[12]5|be20[12][59])\b/i,
                    /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
                  ],
                  [c, [p, 'OnePlus'], [d, y]],
                  [
                    /(alexa)webm/i,
                    /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                    /(kf[a-z]+)( bui|\)).+silk\//i,
                  ],
                  [c, [p, E], [d, b]],
                  [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                  [
                    [c, /(.+)/g, 'Fire Phone $1'],
                    [p, E],
                    [d, y],
                  ],
                  [/(playbook);[-\w\),; ]+(rim)/i],
                  [c, p, [d, b]],
                  [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                  [c, [p, O], [d, y]],
                  [
                    /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
                  ],
                  [c, [p, R], [d, b]],
                  [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                  [c, [p, R], [d, y]],
                  [/(nexus 9)/i],
                  [c, [p, 'HTC'], [d, b]],
                  [
                    /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                    /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                    /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
                  ],
                  [p, [c, /_/g, ' '], [d, y]],
                  [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                  [c, [p, 'Acer'], [d, b]],
                  [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                  [c, [p, 'Meizu'], [d, y]],
                  [
                    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                    /(hp) ([\w ]+\w)/i,
                    /(asus)-?(\w+)/i,
                    /(microsoft); (lumia[\w ]+)/i,
                    /(lenovo)[-_ ]?([-\w]+)/i,
                    /(jolla)/i,
                    /(oppo) ?([\w ]+) bui/i,
                  ],
                  [p, c, [d, y]],
                  [
                    /(kobo)\s(ereader|touch)/i,
                    /(archos) (gamepad2?)/i,
                    /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                    /(kindle)\/([\w\.]+)/i,
                    /(nook)[\w ]+build\/(\w+)/i,
                    /(dell) (strea[kpr\d ]*[\dko])/i,
                    /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                    /(trinity)[- ]*(t\d{3}) bui/i,
                    /(gigaset)[- ]+(q\w{1,9}) bui/i,
                    /(vodafone) ([\w ]+)(?:\)| bui)/i,
                  ],
                  [p, c, [d, b]],
                  [/(surface duo)/i],
                  [c, [p, C], [d, b]],
                  [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                  [c, [p, 'Fairphone'], [d, y]],
                  [/(u304aa)/i],
                  [c, [p, 'AT&T'], [d, y]],
                  [/\bsie-(\w*)/i],
                  [c, [p, 'Siemens'], [d, y]],
                  [/\b(rct\w+) b/i],
                  [c, [p, 'RCA'], [d, b]],
                  [/\b(venue[\d ]{2,7}) b/i],
                  [c, [p, 'Dell'], [d, b]],
                  [/\b(q(?:mv|ta)\w+) b/i],
                  [c, [p, 'Verizon'], [d, b]],
                  [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                  [c, [p, 'Barnes & Noble'], [d, b]],
                  [/\b(tm\d{3}\w+) b/i],
                  [c, [p, 'NuVision'], [d, b]],
                  [/\b(k88) b/i],
                  [c, [p, 'ZTE'], [d, b]],
                  [/\b(nx\d{3}j) b/i],
                  [c, [p, 'ZTE'], [d, y]],
                  [/\b(gen\d{3}) b.+49h/i],
                  [c, [p, 'Swiss'], [d, y]],
                  [/\b(zur\d{3}) b/i],
                  [c, [p, 'Swiss'], [d, b]],
                  [/\b((zeki)?tb.*\b) b/i],
                  [c, [p, 'Zeki'], [d, b]],
                  [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                  [[p, 'Dragon Touch'], c, [d, b]],
                  [/\b(ns-?\w{0,9}) b/i],
                  [c, [p, 'Insignia'], [d, b]],
                  [/\b((nxa|next)-?\w{0,9}) b/i],
                  [c, [p, 'NextBook'], [d, b]],
                  [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                  [[p, 'Voice'], c, [d, y]],
                  [/\b(lvtel\-)?(v1[12]) b/i],
                  [[p, 'LvTel'], c, [d, y]],
                  [/\b(ph-1) /i],
                  [c, [p, 'Essential'], [d, y]],
                  [/\b(v(100md|700na|7011|917g).*\b) b/i],
                  [c, [p, 'Envizen'], [d, b]],
                  [/\b(trio[-\w\. ]+) b/i],
                  [c, [p, 'MachSpeed'], [d, b]],
                  [/\btu_(1491) b/i],
                  [c, [p, 'Rotor'], [d, b]],
                  [/(shield[\w ]+) b/i],
                  [c, [p, 'Nvidia'], [d, b]],
                  [/(sprint) (\w+)/i],
                  [p, c, [d, y]],
                  [/(kin\.[onetw]{3})/i],
                  [
                    [c, /\./g, ' '],
                    [p, C],
                    [d, y],
                  ],
                  [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                  [c, [p, U], [d, b]],
                  [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                  [c, [p, U], [d, y]],
                  [/smart-tv.+(samsung)/i],
                  [p, [d, v]],
                  [/hbbtv.+maple;(\d+)/i],
                  [
                    [c, /^/, 'SmartTV'],
                    [p, j],
                    [d, v],
                  ],
                  [
                    /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i,
                  ],
                  [
                    [p, 'LG'],
                    [d, v],
                  ],
                  [/(apple) ?tv/i],
                  [p, [c, S + ' TV'], [d, v]],
                  [/crkey/i],
                  [
                    [c, k + 'cast'],
                    [p, x],
                    [d, v],
                  ],
                  [/droid.+aft(\w)( bui|\))/i],
                  [c, [p, E], [d, v]],
                  [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                  [c, [p, D], [d, v]],
                  [/(bravia[\w ]+)( bui|\))/i],
                  [c, [p, $], [d, v]],
                  [/(mitv-\w{5}) bui/i],
                  [c, [p, L], [d, v]],
                  [/Hbbtv.*(technisat) (.*);/i],
                  [p, c, [d, v]],
                  [
                    /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                    /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
                  ],
                  [
                    [p, F],
                    [c, F],
                    [d, v],
                  ],
                  [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                  [[d, v]],
                  [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                  [p, c, [d, m]],
                  [/droid.+; (shield) bui/i],
                  [c, [p, 'Nvidia'], [d, m]],
                  [/(playstation [345portablevi]+)/i],
                  [c, [p, $], [d, m]],
                  [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                  [c, [p, C], [d, m]],
                  [/((pebble))app/i],
                  [p, c, [d, w]],
                  [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
                  [c, [p, S], [d, w]],
                  [/droid.+; (glass) \d/i],
                  [c, [p, x], [d, w]],
                  [/droid.+; (wt63?0{2,3})\)/i],
                  [c, [p, U], [d, w]],
                  [/(quest( 2| pro)?)/i],
                  [c, [p, M], [d, w]],
                  [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                  [p, [d, _]],
                  [/(aeobc)\b/i],
                  [c, [p, E], [d, _]],
                  [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
                  [c, [d, y]],
                  [
                    /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i,
                  ],
                  [c, [d, b]],
                  [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                  [[d, b]],
                  [
                    /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i,
                  ],
                  [[d, y]],
                  [/(android[-\w\. ]{0,9});.+buil/i],
                  [c, [p, 'Generic']],
                ],
                engine: [
                  [/windows.+ edge\/([\w\.]+)/i],
                  [f, [h, 'EdgeHTML']],
                  [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                  [f, [h, 'Blink']],
                  [
                    /(presto)\/([\w\.]+)/i,
                    /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                    /ekioh(flow)\/([\w\.]+)/i,
                    /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                    /(icab)[\/ ]([23]\.[\d\.]+)/i,
                    /\b(libweb)/i,
                  ],
                  [h, f],
                  [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                  [f, h],
                ],
                os: [
                  [/microsoft (windows) (vista|xp)/i],
                  [h, f],
                  [
                    /(windows) nt 6\.2; (arm)/i,
                    /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                    /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                  ],
                  [h, [f, K, X]],
                  [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                  [
                    [h, 'Windows'],
                    [f, K, X],
                  ],
                  [
                    /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                    /ios;fbsv\/([\d\.]+)/i,
                    /cfnetwork\/.+darwin/i,
                  ],
                  [
                    [f, /_/g, '.'],
                    [h, 'iOS'],
                  ],
                  [
                    /(mac os x) ?([\w\. ]*)/i,
                    /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
                  ],
                  [
                    [h, q],
                    [f, /_/g, '.'],
                  ],
                  [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                  [f, h],
                  [
                    /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                    /(blackberry)\w*\/([\w\.]*)/i,
                    /(tizen|kaios)[\/ ]([\w\.]+)/i,
                    /\((series40);/i,
                  ],
                  [h, f],
                  [/\(bb(10);/i],
                  [f, [h, O]],
                  [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                  [f, [h, 'Symbian']],
                  [
                    /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
                  ],
                  [f, [h, P + ' OS']],
                  [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                  [f, [h, 'webOS']],
                  [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
                  [f, [h, 'watchOS']],
                  [/crkey\/([\d\.]+)/i],
                  [f, [h, k + 'cast']],
                  [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
                  [[h, B], f],
                  [
                    /panasonic;(viera)/i,
                    /(netrange)mmh/i,
                    /(nettv)\/(\d+\.[\w\.]+)/i,
                    /(nintendo|playstation) ([wids345portablevuch]+)/i,
                    /(xbox); +xbox ([^\);]+)/i,
                    /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                    /(mint)[\/\(\) ]?(\w*)/i,
                    /(mageia|vectorlinux)[; ]/i,
                    /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                    /(hurd|linux) ?([\w\.]*)/i,
                    /(gnu) ?([\w\.]*)/i,
                    /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                    /(haiku) (\w+)/i,
                  ],
                  [h, f],
                  [/(sunos) ?([\w\.\d]*)/i],
                  [[h, 'Solaris'], f],
                  [
                    /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                    /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                    /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                    /(unix) ?([\w\.]*)/i,
                  ],
                  [h, f],
                ],
              },
              Y = function (e, t) {
                if (
                  (typeof e === o && ((t = e), (e = void 0)),
                  !(this instanceof Y))
                )
                  return new Y(e, t).getResult();
                var r = typeof n !== a && n.navigator ? n.navigator : void 0,
                  i = e || (r && r.userAgent ? r.userAgent : ''),
                  m = r && r.userAgentData ? r.userAgentData : void 0,
                  v = t ? V(J, t) : J,
                  w = r && r.userAgent == i;
                return (
                  (this.getBrowser = function () {
                    var e,
                      t = {};
                    return (
                      (t[h] = void 0),
                      (t[f] = void 0),
                      z.call(t, i, v.browser),
                      (t[u] =
                        typeof (e = t[f]) === l
                          ? e.replace(/[^\d\.]/g, '').split('.')[0]
                          : void 0),
                      w &&
                        r &&
                        r.brave &&
                        typeof r.brave.isBrave == s &&
                        (t[h] = 'Brave'),
                      t
                    );
                  }),
                  (this.getCPU = function () {
                    var e = {};
                    return ((e[g] = void 0), z.call(e, i, v.cpu), e);
                  }),
                  (this.getDevice = function () {
                    var e = {};
                    return (
                      (e[p] = void 0),
                      (e[c] = void 0),
                      (e[d] = void 0),
                      z.call(e, i, v.device),
                      w && !e[d] && m && m.mobile && (e[d] = y),
                      w &&
                        'Macintosh' == e[c] &&
                        r &&
                        typeof r.standalone !== a &&
                        r.maxTouchPoints &&
                        r.maxTouchPoints > 2 &&
                        ((e[c] = 'iPad'), (e[d] = b)),
                      e
                    );
                  }),
                  (this.getEngine = function () {
                    var e = {};
                    return (
                      (e[h] = void 0),
                      (e[f] = void 0),
                      z.call(e, i, v.engine),
                      e
                    );
                  }),
                  (this.getOS = function () {
                    var e = {};
                    return (
                      (e[h] = void 0),
                      (e[f] = void 0),
                      z.call(e, i, v.os),
                      w &&
                        !e[h] &&
                        m &&
                        'Unknown' != m.platform &&
                        (e[h] = m.platform
                          .replace(/chrome os/i, B)
                          .replace(/macos/i, q)),
                      e
                    );
                  }),
                  (this.getResult = function () {
                    return {
                      ua: this.getUA(),
                      browser: this.getBrowser(),
                      engine: this.getEngine(),
                      os: this.getOS(),
                      device: this.getDevice(),
                      cpu: this.getCPU(),
                    };
                  }),
                  (this.getUA = function () {
                    return i;
                  }),
                  (this.setUA = function (e) {
                    return (
                      (i = typeof e === l && e.length > 350 ? F(e, 350) : e),
                      this
                    );
                  }),
                  this.setUA(i),
                  this
                );
              };
            if (
              ((Y.VERSION = '1.0.35'),
              (Y.BROWSER = W([h, f, u])),
              (Y.CPU = W([g])),
              (Y.DEVICE = W([c, p, d, m, y, v, b, w, _])),
              (Y.ENGINE = Y.OS = W([h, f])),
              typeof r !== a)
            )
              (t.exports && (r = t.exports = Y), (r.UAParser = Y));
            else if (typeof define === s && define.amd)
              (e.r, void 0 !== Y && e.v(Y));
            else typeof n !== a && (n.UAParser = Y);
            var Q = typeof n !== a && (n.jQuery || n.Zepto);
            if (Q && !Q.ua) {
              var Z = new Y();
              ((Q.ua = Z.getResult()),
                (Q.ua.get = function () {
                  return Z.getUA();
                }),
                (Q.ua.set = function (e) {
                  Z.setUA(e);
                  var t = Z.getResult();
                  for (var r in t) Q.ua[r] = t[r];
                }));
            }
          })(this);
        },
      },
      i = {};
    function s(e) {
      var t = i[e];
      if (void 0 !== t) return t.exports;
      var r = (i[e] = { exports: {} }),
        a = !0;
      try {
        (n[e].call(r.exports, r, r.exports, s), (a = !1));
      } finally {
        a && delete i[e];
      }
      return r.exports;
    }
    ((s.ab = '/ROOT/node_modules/next/dist/compiled/ua-parser-js/'),
      (t.exports = s(226)));
  },
  60567,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n,
      i = {
        isBot: function () {
          return o;
        },
        userAgent: function () {
          return u;
        },
        userAgentFromString: function () {
          return l;
        },
      };
    for (var s in i) Object.defineProperty(r, s, { enumerable: !0, get: i[s] });
    let a = (n = e.r(6992)) && n.__esModule ? n : { default: n };
    function o(e) {
      return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(
        e
      );
    }
    function l(e) {
      return { ...(0, a.default)(e), isBot: void 0 !== e && o(e) };
    }
    function u({ headers: e }) {
      return l(e.get('user-agent') || void 0);
    }
  },
  98214,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'URLPattern', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = 'u' < typeof URLPattern ? void 0 : URLPattern;
  },
  66229,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'after', {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = e.r(56704);
    function i(e) {
      let t = n.workAsyncStorage.getStore();
      if (!t)
        throw Object.defineProperty(
          Error(
            '`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context'
          ),
          '__NEXT_ERROR_CODE',
          { value: 'E468', enumerable: !1, configurable: !0 }
        );
      let { afterContext: r } = t;
      return r.after(e);
    }
  },
  3368,
  (e, t, r) => {
    'use strict';
    var n, i;
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      (n = e.r(66229)),
      (i = r),
      Object.keys(n).forEach(function (e) {
        'default' === e ||
          Object.prototype.hasOwnProperty.call(i, e) ||
          Object.defineProperty(i, e, {
            enumerable: !0,
            get: function () {
              return n[e];
            },
          });
      }));
  },
  39622,
  (e, t, r) => {
    'use strict';
    t.exports = e.r(18622);
  },
  49518,
  (e, t, r) => {
    'use strict';
    t.exports = e.r(39622).vendored['react-rsc'].React;
  },
  77753,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      DynamicServerError: function () {
        return a;
      },
      isDynamicServerError: function () {
        return o;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = 'DYNAMIC_SERVER_USAGE';
    class a extends Error {
      constructor(e) {
        (super(`Dynamic server usage: ${e}`),
          (this.description = e),
          (this.digest = s));
      }
    }
    function o(e) {
      return (
        'object' == typeof e &&
        null !== e &&
        'digest' in e &&
        'string' == typeof e.digest &&
        e.digest === s
      );
    }
    ('function' == typeof r.default ||
      ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  80773,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      StaticGenBailoutError: function () {
        return a;
      },
      isStaticGenBailoutError: function () {
        return o;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = 'NEXT_STATIC_GEN_BAILOUT';
    class a extends Error {
      constructor(...e) {
        (super(...e), (this.code = s));
      }
    }
    function o(e) {
      return 'object' == typeof e && null !== e && 'code' in e && e.code === s;
    }
    ('function' == typeof r.default ||
      ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  37138,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      isHangingPromiseRejectionError: function () {
        return s;
      },
      makeDevtoolsIOAwarePromise: function () {
        return h;
      },
      makeHangingPromise: function () {
        return u;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    function s(e) {
      return (
        'object' == typeof e && null !== e && 'digest' in e && e.digest === a
      );
    }
    let a = 'HANGING_PROMISE_REJECTION';
    class o extends Error {
      constructor(e, t) {
        (super(
          `During prerendering, ${t} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e}".`
        ),
          (this.route = e),
          (this.expression = t),
          (this.digest = a));
      }
    }
    let l = new WeakMap();
    function u(e, t, r) {
      if (e.aborted) return Promise.reject(new o(t, r));
      {
        let n = new Promise((n, i) => {
          let s = i.bind(null, new o(t, r)),
            a = l.get(e);
          if (a) a.push(s);
          else {
            let t = [s];
            (l.set(e, t),
              e.addEventListener(
                'abort',
                () => {
                  for (let e = 0; e < t.length; e++) t[e]();
                },
                { once: !0 }
              ));
          }
        });
        return (n.catch(c), n);
      }
    }
    function c() {}
    function h(e, t, r) {
      return t.stagedRendering
        ? t.stagedRendering.delayUntilStage(r, void 0, e)
        : new Promise((t) => {
            setTimeout(() => {
              t(e);
            }, 0);
          });
    }
  },
  13332,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      METADATA_BOUNDARY_NAME: function () {
        return s;
      },
      OUTLET_BOUNDARY_NAME: function () {
        return o;
      },
      ROOT_LAYOUT_BOUNDARY_NAME: function () {
        return l;
      },
      VIEWPORT_BOUNDARY_NAME: function () {
        return a;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = '__next_metadata_boundary__',
      a = '__next_viewport_boundary__',
      o = '__next_outlet_boundary__',
      l = '__next_root_layout_boundary__';
  },
  18697,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      atLeastOneTask: function () {
        return o;
      },
      scheduleImmediate: function () {
        return a;
      },
      scheduleOnNextTick: function () {
        return s;
      },
      waitAtLeastOneReactRenderTask: function () {
        return l;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = (e) => {
        Promise.resolve().then(() => {
          process.nextTick(e);
        });
      },
      a = (e) => {
        setImmediate(e);
      };
    function o() {
      return new Promise((e) => a(e));
    }
    function l() {
      return new Promise((e) => setImmediate(e));
    }
  },
  39491,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      BailoutToCSRError: function () {
        return a;
      },
      isBailoutToCSRError: function () {
        return o;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
    class a extends Error {
      constructor(e) {
        (super(`Bail out to client-side rendering: ${e}`),
          (this.reason = e),
          (this.digest = s));
      }
    }
    function o(e) {
      return (
        'object' == typeof e && null !== e && 'digest' in e && e.digest === s
      );
    }
  },
  35121,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'InvariantError', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    class n extends Error {
      constructor(e, t) {
        (super(
          `Invariant: ${e.endsWith('.') ? e : e + '.'} This is a bug in Next.js.`,
          t
        ),
          (this.name = 'InvariantError'));
      }
    }
  },
  21401,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n,
      i,
      s = {
        Postpone: function () {
          return k;
        },
        PreludeState: function () {
          return Q;
        },
        abortAndThrowOnSynchronousRequestDataAccess: function () {
          return T;
        },
        abortOnSynchronousPlatformIOAccess: function () {
          return O;
        },
        accessedDynamicData: function () {
          return D;
        },
        annotateDynamicAccess: function () {
          return B;
        },
        consumeDynamicAccess: function () {
          return $;
        },
        createDynamicTrackingState: function () {
          return b;
        },
        createDynamicValidationState: function () {
          return v;
        },
        createHangingInputAbortSignal: function () {
          return M;
        },
        createRenderInBrowserAbortSignal: function () {
          return U;
        },
        delayUntilRuntimeStage: function () {
          return er;
        },
        formatDynamicAPIAccesses: function () {
          return L;
        },
        getFirstDynamicReason: function () {
          return w;
        },
        getStaticShellDisallowedDynamicReasons: function () {
          return et;
        },
        isDynamicPostpone: function () {
          return A;
        },
        isPrerenderInterruptedError: function () {
          return j;
        },
        logDisallowedDynamicError: function () {
          return Z;
        },
        markCurrentScopeAsDynamic: function () {
          return _;
        },
        postponeWithTracking: function () {
          return P;
        },
        throwIfDisallowedDynamic: function () {
          return ee;
        },
        throwToInterruptStaticGeneration: function () {
          return E;
        },
        trackAllowedDynamicAccess: function () {
          return K;
        },
        trackDynamicDataInDynamicRender: function () {
          return S;
        },
        trackDynamicHoleInRuntimeShell: function () {
          return X;
        },
        trackDynamicHoleInStaticShell: function () {
          return J;
        },
        useDynamicRouteParams: function () {
          return q;
        },
        useDynamicSearchParams: function () {
          return V;
        },
      };
    for (var a in s) Object.defineProperty(r, a, { enumerable: !0, get: s[a] });
    let o = (n = e.r(49518)) && n.__esModule ? n : { default: n },
      l = e.r(77753),
      u = e.r(80773),
      c = e.r(32319),
      h = e.r(56704),
      d = e.r(37138),
      p = e.r(13332),
      f = e.r(18697),
      g = e.r(39491),
      m = e.r(35121),
      y = 'function' == typeof o.default.unstable_postpone;
    function b(e) {
      return {
        isDebugDynamicAccesses: e,
        dynamicAccesses: [],
        syncDynamicErrorWithStack: null,
      };
    }
    function v() {
      return {
        hasSuspenseAboveBody: !1,
        hasDynamicMetadata: !1,
        dynamicMetadata: null,
        hasDynamicViewport: !1,
        hasAllowedDynamic: !1,
        dynamicErrors: [],
      };
    }
    function w(e) {
      var t;
      return null == (t = e.dynamicAccesses[0]) ? void 0 : t.expression;
    }
    function _(e, t, r) {
      if (t)
        switch (t.type) {
          case 'cache':
          case 'unstable-cache':
          case 'private-cache':
            return;
        }
      if (!e.forceDynamic && !e.forceStatic) {
        if (e.dynamicShouldError)
          throw Object.defineProperty(
            new u.StaticGenBailoutError(
              `Route ${e.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${r}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E553', enumerable: !1, configurable: !0 }
          );
        if (t)
          switch (t.type) {
            case 'prerender-ppr':
              return P(e.route, r, t.dynamicTracking);
            case 'prerender-legacy':
              t.revalidate = 0;
              let n = Object.defineProperty(
                new l.DynamicServerError(
                  `Route ${e.route} couldn't be rendered statically because it used ${r}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E550', enumerable: !1, configurable: !0 }
              );
              throw (
                (e.dynamicUsageDescription = r),
                (e.dynamicUsageStack = n.stack),
                n
              );
          }
      }
    }
    function E(e, t, r) {
      let n = Object.defineProperty(
        new l.DynamicServerError(
          `Route ${t.route} couldn't be rendered statically because it used \`${e}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E558', enumerable: !1, configurable: !0 }
      );
      throw (
        (r.revalidate = 0),
        (t.dynamicUsageDescription = e),
        (t.dynamicUsageStack = n.stack),
        n
      );
    }
    function S(e) {
      switch (e.type) {
        case 'cache':
        case 'unstable-cache':
        case 'private-cache':
          return;
      }
    }
    function R(e, t, r) {
      let n = N(
        `Route ${e} needs to bail out of prerendering at this point because it used ${t}.`
      );
      r.controller.abort(n);
      let i = r.dynamicTracking;
      i &&
        i.dynamicAccesses.push({
          stack: i.isDebugDynamicAccesses ? Error().stack : void 0,
          expression: t,
        });
    }
    function O(e, t, r, n) {
      let i = n.dynamicTracking;
      (R(e, t, n),
        i &&
          null === i.syncDynamicErrorWithStack &&
          (i.syncDynamicErrorWithStack = r));
    }
    function T(e, t, r, n) {
      if (!1 === n.controller.signal.aborted) {
        R(e, t, n);
        let i = n.dynamicTracking;
        i &&
          null === i.syncDynamicErrorWithStack &&
          (i.syncDynamicErrorWithStack = r);
      }
      throw N(
        `Route ${e} needs to bail out of prerendering at this point because it used ${t}.`
      );
    }
    function k({ reason: e, route: t }) {
      let r = c.workUnitAsyncStorage.getStore();
      P(t, e, r && 'prerender-ppr' === r.type ? r.dynamicTracking : null);
    }
    function P(e, t, r) {
      ((function () {
        if (!y)
          throw Object.defineProperty(
            Error(
              'Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js'
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E224', enumerable: !1, configurable: !0 }
          );
      })(),
        r &&
          r.dynamicAccesses.push({
            stack: r.isDebugDynamicAccesses ? Error().stack : void 0,
            expression: t,
          }),
        o.default.unstable_postpone(x(e, t)));
    }
    function x(e, t) {
      return `Route ${e} needs to bail out of prerendering at this point because it used ${t}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
    }
    function A(e) {
      return (
        'object' == typeof e &&
        null !== e &&
        'string' == typeof e.message &&
        C(e.message)
      );
    }
    function C(e) {
      return (
        e.includes(
          'needs to bail out of prerendering at this point because it used'
        ) &&
        e.includes(
          'Learn more: https://nextjs.org/docs/messages/ppr-caught-error'
        )
      );
    }
    if (!1 === C(x('%%%', '^^^')))
      throw Object.defineProperty(
        Error(
          'Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js'
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E296', enumerable: !1, configurable: !0 }
      );
    let I = 'NEXT_PRERENDER_INTERRUPTED';
    function N(e) {
      let t = Object.defineProperty(Error(e), '__NEXT_ERROR_CODE', {
        value: 'E394',
        enumerable: !1,
        configurable: !0,
      });
      return ((t.digest = I), t);
    }
    function j(e) {
      return (
        'object' == typeof e &&
        null !== e &&
        e.digest === I &&
        'name' in e &&
        'message' in e &&
        e instanceof Error
      );
    }
    function D(e) {
      return e.length > 0;
    }
    function $(e, t) {
      return (e.dynamicAccesses.push(...t.dynamicAccesses), e.dynamicAccesses);
    }
    function L(e) {
      return e
        .filter((e) => 'string' == typeof e.stack && e.stack.length > 0)
        .map(
          ({ expression: e, stack: t }) => (
            (t = t
              .split('\n')
              .slice(4)
              .filter(
                (e) =>
                  !(
                    e.includes('node_modules/next/') ||
                    e.includes(' (<anonymous>)') ||
                    e.includes(' (node:')
                  )
              )
              .join('\n')),
            `Dynamic API Usage Debug - ${e}:
${t}`
          )
        );
    }
    function U() {
      let e = new AbortController();
      return (
        e.abort(
          Object.defineProperty(
            new g.BailoutToCSRError('Render in Browser'),
            '__NEXT_ERROR_CODE',
            { value: 'E721', enumerable: !1, configurable: !0 }
          )
        ),
        e.signal
      );
    }
    function M(e) {
      switch (e.type) {
        case 'prerender':
        case 'prerender-runtime':
          let t = new AbortController();
          if (e.cacheSignal)
            e.cacheSignal.inputReady().then(() => {
              t.abort();
            });
          else {
            let r = (0, c.getRuntimeStagePromise)(e);
            r
              ? r.then(() => (0, f.scheduleOnNextTick)(() => t.abort()))
              : (0, f.scheduleOnNextTick)(() => t.abort());
          }
          return t.signal;
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
          return;
      }
    }
    function B(e, t) {
      let r = t.dynamicTracking;
      r &&
        r.dynamicAccesses.push({
          stack: r.isDebugDynamicAccesses ? Error().stack : void 0,
          expression: e,
        });
    }
    function q(e) {
      let t = h.workAsyncStorage.getStore(),
        r = c.workUnitAsyncStorage.getStore();
      if (t && r)
        switch (r.type) {
          case 'prerender-client':
          case 'prerender': {
            let n = r.fallbackRouteParams;
            n &&
              n.size > 0 &&
              o.default.use(
                (0, d.makeHangingPromise)(r.renderSignal, t.route, e)
              );
            break;
          }
          case 'prerender-ppr': {
            let n = r.fallbackRouteParams;
            if (n && n.size > 0) return P(t.route, e, r.dynamicTracking);
            break;
          }
          case 'prerender-runtime':
            throw Object.defineProperty(
              new m.InvariantError(
                `\`${e}\` was called during a runtime prerender. Next.js should be preventing ${e} from being included in server components statically, but did not in this case.`
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E771', enumerable: !1, configurable: !0 }
            );
          case 'cache':
          case 'private-cache':
            throw Object.defineProperty(
              new m.InvariantError(
                `\`${e}\` was called inside a cache scope. Next.js should be preventing ${e} from being included in server components statically, but did not in this case.`
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E745', enumerable: !1, configurable: !0 }
            );
        }
    }
    function V(e) {
      let t = h.workAsyncStorage.getStore(),
        r = c.workUnitAsyncStorage.getStore();
      if (t)
        switch ((!r && (0, c.throwForMissingRequestStore)(e), r.type)) {
          case 'prerender-client':
            o.default.use(
              (0, d.makeHangingPromise)(r.renderSignal, t.route, e)
            );
            break;
          case 'prerender-legacy':
          case 'prerender-ppr':
            if (t.forceStatic) return;
            throw Object.defineProperty(
              new g.BailoutToCSRError(e),
              '__NEXT_ERROR_CODE',
              { value: 'E394', enumerable: !1, configurable: !0 }
            );
          case 'prerender':
          case 'prerender-runtime':
            throw Object.defineProperty(
              new m.InvariantError(
                `\`${e}\` was called from a Server Component. Next.js should be preventing ${e} from being included in server components statically, but did not in this case.`
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E795', enumerable: !1, configurable: !0 }
            );
          case 'cache':
          case 'unstable-cache':
          case 'private-cache':
            throw Object.defineProperty(
              new m.InvariantError(
                `\`${e}\` was called inside a cache scope. Next.js should be preventing ${e} from being included in server components statically, but did not in this case.`
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E745', enumerable: !1, configurable: !0 }
            );
          case 'request':
            return;
        }
    }
    let W = /\n\s+at Suspense \(<anonymous>\)/,
      G = RegExp(
        `\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${p.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`
      ),
      H = RegExp(`\\n\\s+at ${p.METADATA_BOUNDARY_NAME}[\\n\\s]`),
      F = RegExp(`\\n\\s+at ${p.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`),
      z = RegExp(`\\n\\s+at ${p.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
    function K(e, t, r, n) {
      if (!z.test(t)) {
        if (H.test(t)) {
          r.hasDynamicMetadata = !0;
          return;
        }
        if (F.test(t)) {
          r.hasDynamicViewport = !0;
          return;
        }
        if (G.test(t)) {
          ((r.hasAllowedDynamic = !0), (r.hasSuspenseAboveBody = !0));
          return;
        } else if (W.test(t)) {
          r.hasAllowedDynamic = !0;
          return;
        } else {
          if (n.syncDynamicErrorWithStack)
            return void r.dynamicErrors.push(n.syncDynamicErrorWithStack);
          let i = Y(
            `Route "${e.route}": Uncached data was accessed outside of <Suspense>. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`,
            t
          );
          return void r.dynamicErrors.push(i);
        }
      }
    }
    function X(e, t, r, n) {
      if (!z.test(t)) {
        if (H.test(t)) {
          r.dynamicMetadata = Y(
            `Route "${e.route}": Uncached data or \`connection()\` was accessed inside \`generateMetadata\`. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`,
            t
          );
          return;
        }
        if (F.test(t)) {
          let n = Y(
            `Route "${e.route}": Uncached data or \`connection()\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`,
            t
          );
          r.dynamicErrors.push(n);
          return;
        }
        if (G.test(t)) {
          ((r.hasAllowedDynamic = !0), (r.hasSuspenseAboveBody = !0));
          return;
        } else if (W.test(t)) {
          r.hasAllowedDynamic = !0;
          return;
        } else {
          if (n.syncDynamicErrorWithStack)
            return void r.dynamicErrors.push(n.syncDynamicErrorWithStack);
          let i = Y(
            `Route "${e.route}": Uncached data or \`connection()\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`,
            t
          );
          return void r.dynamicErrors.push(i);
        }
      }
    }
    function J(e, t, r, n) {
      if (!z.test(t)) {
        if (H.test(t)) {
          r.dynamicMetadata = Y(
            `Route "${e.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateMetadata\` or you have file-based metadata such as icons that depend on dynamic params segments. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`,
            t
          );
          return;
        }
        if (F.test(t)) {
          let n = Y(
            `Route "${e.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`,
            t
          );
          r.dynamicErrors.push(n);
          return;
        }
        if (G.test(t)) {
          ((r.hasAllowedDynamic = !0), (r.hasSuspenseAboveBody = !0));
          return;
        } else if (W.test(t)) {
          r.hasAllowedDynamic = !0;
          return;
        } else {
          if (n.syncDynamicErrorWithStack)
            return void r.dynamicErrors.push(n.syncDynamicErrorWithStack);
          let i = Y(
            `Route "${e.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`,
            t
          );
          return void r.dynamicErrors.push(i);
        }
      }
    }
    function Y(e, t) {
      let r = Object.defineProperty(Error(e), '__NEXT_ERROR_CODE', {
        value: 'E394',
        enumerable: !1,
        configurable: !0,
      });
      return ((r.stack = r.name + ': ' + e + t), r);
    }
    var Q =
      (((i = {})[(i.Full = 0)] = 'Full'),
      (i[(i.Empty = 1)] = 'Empty'),
      (i[(i.Errored = 2)] = 'Errored'),
      i);
    function Z(e, t) {
      (console.error(t),
        e.dev ||
          (e.hasReadableErrorStacks
            ? console.error(
                `To get a more detailed stack trace and pinpoint the issue, start the app in development mode by running \`next dev\`, then open "${e.route}" in your browser to investigate the error.`
              )
            : console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${e.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`)));
    }
    function ee(e, t, r, n) {
      if (n.syncDynamicErrorWithStack)
        throw (
          Z(e, n.syncDynamicErrorWithStack),
          new u.StaticGenBailoutError()
        );
      if (0 !== t) {
        if (r.hasSuspenseAboveBody) return;
        let n = r.dynamicErrors;
        if (n.length > 0) {
          for (let t = 0; t < n.length; t++) Z(e, n[t]);
          throw new u.StaticGenBailoutError();
        }
        if (r.hasDynamicViewport)
          throw (
            console.error(
              `Route "${e.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`
            ),
            new u.StaticGenBailoutError()
          );
        if (1 === t)
          throw (
            console.error(
              `Route "${e.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`
            ),
            new u.StaticGenBailoutError()
          );
      } else if (!1 === r.hasAllowedDynamic && r.hasDynamicMetadata)
        throw (
          console.error(
            `Route "${e.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`
          ),
          new u.StaticGenBailoutError()
        );
    }
    function et(e, t, r) {
      if (r.hasSuspenseAboveBody) return [];
      if (0 !== t) {
        let n = r.dynamicErrors;
        if (n.length > 0) return n;
        if (1 === t)
          return [
            Object.defineProperty(
              new m.InvariantError(
                `Route "${e.route}" did not produce a static shell and Next.js was unable to determine a reason.`
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E936', enumerable: !1, configurable: !0 }
            ),
          ];
      } else if (
        !1 === r.hasAllowedDynamic &&
        0 === r.dynamicErrors.length &&
        r.dynamicMetadata
      )
        return [r.dynamicMetadata];
      return [];
    }
    function er(e, t) {
      return e.runtimeStagePromise ? e.runtimeStagePromise.then(() => t) : t;
    }
  },
  19048,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      isRequestAPICallableInsideAfter: function () {
        return u;
      },
      throwForSearchParamsAccessInUseCache: function () {
        return l;
      },
      throwWithStaticGenerationBailoutErrorWithDynamicError: function () {
        return o;
      },
    };
    for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
    let s = e.r(80773),
      a = e.r(24725);
    function o(e, t) {
      throw Object.defineProperty(
        new s.StaticGenBailoutError(
          `Route ${e} with \`dynamic = "error"\` couldn't be rendered statically because it used ${t}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E543', enumerable: !1, configurable: !0 }
      );
    }
    function l(e, t) {
      let r = Object.defineProperty(
        Error(
          `Route ${e.route} used \`searchParams\` inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await \`searchParams\` outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E842', enumerable: !1, configurable: !0 }
      );
      throw (
        Error.captureStackTrace(r, t),
        (e.invalidDynamicUsageError ??= r),
        r
      );
    }
    function u() {
      let e = a.afterTaskAsyncStorage.getStore();
      return (null == e ? void 0 : e.rootTaskSpawnPhase) === 'action';
    }
  },
  45470,
  (e, t, r) => {
    'use strict';
    function n() {
      let e,
        t,
        r = new Promise((r, n) => {
          ((e = r), (t = n));
        });
      return { resolve: e, reject: t, promise: r };
    }
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'createPromiseWithResolvers', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  98771,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n,
      i = {
        RenderStage: function () {
          return l;
        },
        StagedRenderingController: function () {
          return u;
        },
      };
    for (var s in i) Object.defineProperty(r, s, { enumerable: !0, get: i[s] });
    let a = e.r(35121),
      o = e.r(45470);
    var l =
      (((n = {})[(n.Before = 1)] = 'Before'),
      (n[(n.Static = 2)] = 'Static'),
      (n[(n.Runtime = 3)] = 'Runtime'),
      (n[(n.Dynamic = 4)] = 'Dynamic'),
      (n[(n.Abandoned = 5)] = 'Abandoned'),
      n);
    class u {
      constructor(e = null, t) {
        ((this.abortSignal = e),
          (this.hasRuntimePrefetch = t),
          (this.currentStage = 1),
          (this.staticInterruptReason = null),
          (this.runtimeInterruptReason = null),
          (this.staticStageEndTime = 1 / 0),
          (this.runtimeStageEndTime = 1 / 0),
          (this.runtimeStageListeners = []),
          (this.dynamicStageListeners = []),
          (this.runtimeStagePromise = (0, o.createPromiseWithResolvers)()),
          (this.dynamicStagePromise = (0, o.createPromiseWithResolvers)()),
          (this.mayAbandon = !1),
          e &&
            (e.addEventListener(
              'abort',
              () => {
                let { reason: t } = e;
                (this.currentStage < 3 &&
                  (this.runtimeStagePromise.promise.catch(c),
                  this.runtimeStagePromise.reject(t)),
                  (this.currentStage < 4 || 5 === this.currentStage) &&
                    (this.dynamicStagePromise.promise.catch(c),
                    this.dynamicStagePromise.reject(t)));
              },
              { once: !0 }
            ),
            (this.mayAbandon = !0)));
      }
      onStage(e, t) {
        if (this.currentStage >= e) t();
        else if (3 === e) this.runtimeStageListeners.push(t);
        else if (4 === e) this.dynamicStageListeners.push(t);
        else
          throw Object.defineProperty(
            new a.InvariantError(`Invalid render stage: ${e}`),
            '__NEXT_ERROR_CODE',
            { value: 'E881', enumerable: !1, configurable: !0 }
          );
      }
      canSyncInterrupt() {
        if (1 === this.currentStage) return !1;
        let e = this.hasRuntimePrefetch ? 4 : 3;
        return this.currentStage < e;
      }
      syncInterruptCurrentStageWithReason(e) {
        if (1 !== this.currentStage) {
          if (this.mayAbandon) return this.abandonRenderImpl();
          switch (this.currentStage) {
            case 2:
              ((this.staticInterruptReason = e), this.advanceStage(4));
              return;
            case 3:
              this.hasRuntimePrefetch &&
                ((this.runtimeInterruptReason = e), this.advanceStage(4));
              return;
          }
        }
      }
      getStaticInterruptReason() {
        return this.staticInterruptReason;
      }
      getRuntimeInterruptReason() {
        return this.runtimeInterruptReason;
      }
      getStaticStageEndTime() {
        return this.staticStageEndTime;
      }
      getRuntimeStageEndTime() {
        return this.runtimeStageEndTime;
      }
      abandonRender() {
        if (!this.mayAbandon)
          throw Object.defineProperty(
            new a.InvariantError(
              '`abandonRender` called on a stage controller that cannot be abandoned.'
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E938', enumerable: !1, configurable: !0 }
          );
        this.abandonRenderImpl();
      }
      abandonRenderImpl() {
        let { currentStage: e } = this;
        switch (e) {
          case 2:
            ((this.currentStage = 5), this.resolveRuntimeStage());
            return;
          case 3:
            this.currentStage = 5;
            return;
        }
      }
      advanceStage(e) {
        if (e <= this.currentStage) return;
        let t = this.currentStage;
        if (
          ((this.currentStage = e),
          t < 3 &&
            e >= 3 &&
            ((this.staticStageEndTime =
              performance.now() + performance.timeOrigin),
            this.resolveRuntimeStage()),
          t < 4 && e >= 4)
        ) {
          ((this.runtimeStageEndTime =
            performance.now() + performance.timeOrigin),
            this.resolveDynamicStage());
          return;
        }
      }
      resolveRuntimeStage() {
        let e = this.runtimeStageListeners;
        for (let t = 0; t < e.length; t++) e[t]();
        ((e.length = 0), this.runtimeStagePromise.resolve());
      }
      resolveDynamicStage() {
        let e = this.dynamicStageListeners;
        for (let t = 0; t < e.length; t++) e[t]();
        ((e.length = 0), this.dynamicStagePromise.resolve());
      }
      getStagePromise(e) {
        switch (e) {
          case 3:
            return this.runtimeStagePromise.promise;
          case 4:
            return this.dynamicStagePromise.promise;
          default:
            throw Object.defineProperty(
              new a.InvariantError(`Invalid render stage: ${e}`),
              '__NEXT_ERROR_CODE',
              { value: 'E881', enumerable: !1, configurable: !0 }
            );
        }
      }
      waitForStage(e) {
        return this.getStagePromise(e);
      }
      delayUntilStage(e, t, r) {
        var n, i, s;
        let a,
          o =
            ((n = this.getStagePromise(e)),
            (i = t),
            (s = r),
            (a = new Promise((e, t) => {
              n.then(e.bind(null, s), t);
            })),
            void 0 !== i && (a.displayName = i),
            a);
        return (this.abortSignal && o.catch(c), o);
      }
    }
    function c() {}
  },
  44822,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'connection', {
        enumerable: !0,
        get: function () {
          return u;
        },
      }));
    let n = e.r(56704),
      i = e.r(32319),
      s = e.r(21401),
      a = e.r(80773),
      o = e.r(37138),
      l = e.r(19048);
    function u() {
      let e = n.workAsyncStorage.getStore(),
        t = i.workUnitAsyncStorage.getStore();
      if (e) {
        if (
          t &&
          'after' === t.phase &&
          !(0, l.isRequestAPICallableInsideAfter)()
        )
          throw Object.defineProperty(
            Error(
              `Route ${e.route} used \`connection()\` inside \`after()\`. The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but \`after()\` executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E827', enumerable: !1, configurable: !0 }
          );
        if (e.forceStatic) return Promise.resolve(void 0);
        if (e.dynamicShouldError)
          throw Object.defineProperty(
            new a.StaticGenBailoutError(
              `Route ${e.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E847', enumerable: !1, configurable: !0 }
          );
        if (t)
          switch (t.type) {
            case 'cache': {
              let t = Object.defineProperty(
                Error(
                  `Route ${e.route} used \`connection()\` inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual request, but caches must be able to be produced before a request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E841', enumerable: !1, configurable: !0 }
              );
              throw (
                Error.captureStackTrace(t, u),
                (e.invalidDynamicUsageError ??= t),
                t
              );
            }
            case 'private-cache': {
              let t = Object.defineProperty(
                Error(
                  `Route ${e.route} used \`connection()\` inside "use cache: private". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual navigation request, but caches must be able to be produced before a navigation request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E837', enumerable: !1, configurable: !0 }
              );
              throw (
                Error.captureStackTrace(t, u),
                (e.invalidDynamicUsageError ??= t),
                t
              );
            }
            case 'unstable-cache':
              throw Object.defineProperty(
                Error(
                  `Route ${e.route} used \`connection()\` inside a function cached with \`unstable_cache()\`. The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E840', enumerable: !1, configurable: !0 }
              );
            case 'prerender':
            case 'prerender-client':
            case 'prerender-runtime':
              return (0, o.makeHangingPromise)(
                t.renderSignal,
                e.route,
                '`connection()`'
              );
            case 'prerender-ppr':
              return (0, s.postponeWithTracking)(
                e.route,
                'connection',
                t.dynamicTracking
              );
            case 'prerender-legacy':
              return (0, s.throwToInterruptStaticGeneration)(
                'connection',
                e,
                t
              );
            case 'request':
              return (
                (0, s.trackDynamicDataInDynamicRender)(t),
                Promise.resolve(void 0)
              );
          }
      }
      (0, i.throwForMissingRequestStore)('connection');
    }
    e.r(98771);
  },
  55207,
  (e, t, r) => {
    let n = {
      NextRequest: e.r(75447).NextRequest,
      NextResponse: e.r(9052).NextResponse,
      ImageResponse: e.r(2075).ImageResponse,
      userAgentFromString: e.r(60567).userAgentFromString,
      userAgent: e.r(60567).userAgent,
      URLPattern: e.r(98214).URLPattern,
      after: e.r(3368).after,
      connection: e.r(44822).connection,
    };
    ((t.exports = n),
      (r.NextRequest = n.NextRequest),
      (r.NextResponse = n.NextResponse),
      (r.ImageResponse = n.ImageResponse),
      (r.userAgentFromString = n.userAgentFromString),
      (r.userAgent = n.userAgent),
      (r.URLPattern = n.URLPattern),
      (r.after = n.after),
      (r.connection = n.connection));
  },
  89997,
  (e) => {
    'use strict';
    let t, r, n;
    async function i() {
      return (
        '_ENTRIES' in globalThis &&
        _ENTRIES.middleware_instrumentation &&
        (await _ENTRIES.middleware_instrumentation)
      );
    }
    let s = null;
    async function a() {
      if ('phase-production-build' === process.env.NEXT_PHASE) return;
      s || (s = i());
      let e = await s;
      if (null == e ? void 0 : e.register)
        try {
          await e.register();
        } catch (e) {
          throw (
            (e.message = `An error occurred while loading instrumentation hook: ${e.message}`),
            e
          );
        }
    }
    async function o(...e) {
      let t = await i();
      try {
        var r;
        await (null == t || null == (r = t.onRequestError)
          ? void 0
          : r.call(t, ...e));
      } catch (e) {
        console.error('Error in instrumentation.onRequestError:', e);
      }
    }
    let l = null;
    class u extends Error {
      constructor({ page: e }) {
        super(`The middleware "${e}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
      }
    }
    class c extends Error {
      constructor() {
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
      }
    }
    class h extends Error {
      constructor() {
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
      }
    }
    let d = '_N_T_',
      p = {
        shared: 'shared',
        reactServerComponents: 'rsc',
        serverSideRendering: 'ssr',
        actionBrowser: 'action-browser',
        apiNode: 'api-node',
        apiEdge: 'api-edge',
        middleware: 'middleware',
        instrument: 'instrument',
        edgeAsset: 'edge-asset',
        appPagesBrowser: 'app-pages-browser',
        pagesDirBrowser: 'pages-dir-browser',
        pagesDirEdge: 'pages-dir-edge',
        pagesDirNode: 'pages-dir-node',
      };
    function f(e) {
      var t,
        r,
        n,
        i,
        s,
        a = [],
        o = 0;
      function l() {
        for (; o < e.length && /\s/.test(e.charAt(o)); ) o += 1;
        return o < e.length;
      }
      for (; o < e.length; ) {
        for (t = o, s = !1; l(); )
          if (',' === (r = e.charAt(o))) {
            for (
              n = o, o += 1, l(), i = o;
              o < e.length &&
              '=' !== (r = e.charAt(o)) &&
              ';' !== r &&
              ',' !== r;
            )
              o += 1;
            o < e.length && '=' === e.charAt(o)
              ? ((s = !0), (o = i), a.push(e.substring(t, n)), (t = o))
              : (o = n + 1);
          } else o += 1;
        (!s || o >= e.length) && a.push(e.substring(t, e.length));
      }
      return a;
    }
    function g(e) {
      let t = {},
        r = [];
      if (e)
        for (let [n, i] of e.entries())
          'set-cookie' === n.toLowerCase()
            ? (r.push(...f(i)), (t[n] = 1 === r.length ? r[0] : r))
            : (t[n] = i);
      return t;
    }
    function m(e) {
      try {
        return String(new URL(String(e)));
      } catch (t) {
        throw Object.defineProperty(
          Error(
            `URL is malformed "${String(e)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`,
            { cause: t }
          ),
          '__NEXT_ERROR_CODE',
          { value: 'E61', enumerable: !1, configurable: !0 }
        );
      }
    }
    ({
      ...p,
      GROUP: {
        builtinReact: [p.reactServerComponents, p.actionBrowser],
        serverOnly: [
          p.reactServerComponents,
          p.actionBrowser,
          p.instrument,
          p.middleware,
        ],
        neutralTarget: [p.apiNode, p.apiEdge],
        clientOnly: [p.serverSideRendering, p.appPagesBrowser],
        bundled: [
          p.reactServerComponents,
          p.actionBrowser,
          p.serverSideRendering,
          p.appPagesBrowser,
          p.shared,
          p.instrument,
          p.middleware,
        ],
        appPages: [
          p.reactServerComponents,
          p.serverSideRendering,
          p.appPagesBrowser,
          p.actionBrowser,
        ],
      },
    });
    let y = Symbol('response'),
      b = Symbol('passThrough'),
      v = Symbol('waitUntil');
    class w {
      constructor(e, t) {
        ((this[b] = !1),
          (this[v] = t
            ? { kind: 'external', function: t }
            : { kind: 'internal', promises: [] }));
      }
      respondWith(e) {
        this[y] || (this[y] = Promise.resolve(e));
      }
      passThroughOnException() {
        this[b] = !0;
      }
      waitUntil(e) {
        if ('external' === this[v].kind) return (0, this[v].function)(e);
        this[v].promises.push(e);
      }
    }
    class _ extends w {
      constructor(e) {
        var t;
        (super(e.request, null == (t = e.context) ? void 0 : t.waitUntil),
          (this.sourcePage = e.page));
      }
      get request() {
        throw Object.defineProperty(
          new u({ page: this.sourcePage }),
          '__NEXT_ERROR_CODE',
          { value: 'E394', enumerable: !1, configurable: !0 }
        );
      }
      respondWith() {
        throw Object.defineProperty(
          new u({ page: this.sourcePage }),
          '__NEXT_ERROR_CODE',
          { value: 'E394', enumerable: !1, configurable: !0 }
        );
      }
    }
    function E(e) {
      return e.replace(/\/$/, '') || '/';
    }
    function S(e) {
      let t = e.indexOf('#'),
        r = e.indexOf('?'),
        n = r > -1 && (t < 0 || r < t);
      return n || t > -1
        ? {
            pathname: e.substring(0, n ? r : t),
            query: n ? e.substring(r, t > -1 ? t : void 0) : '',
            hash: t > -1 ? e.slice(t) : '',
          }
        : { pathname: e, query: '', hash: '' };
    }
    function R(e, t) {
      if (!e.startsWith('/') || !t) return e;
      let { pathname: r, query: n, hash: i } = S(e);
      return `${t}${r}${n}${i}`;
    }
    function O(e, t) {
      if (!e.startsWith('/') || !t) return e;
      let { pathname: r, query: n, hash: i } = S(e);
      return `${r}${t}${n}${i}`;
    }
    function T(e, t) {
      if ('string' != typeof e) return !1;
      let { pathname: r } = S(e);
      return r === t || r.startsWith(t + '/');
    }
    let k = new WeakMap();
    function P(e, t) {
      let r;
      if (!t) return { pathname: e };
      let n = k.get(t);
      n || ((n = t.map((e) => e.toLowerCase())), k.set(t, n));
      let i = e.split('/', 2);
      if (!i[1]) return { pathname: e };
      let s = i[1].toLowerCase(),
        a = n.indexOf(s);
      return a < 0
        ? { pathname: e }
        : ((r = t[a]),
          { pathname: (e = e.slice(r.length + 1) || '/'), detectedLocale: r });
    }
    let x =
      /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
    function A(e, t) {
      return new URL(
        String(e).replace(x, 'localhost'),
        t && String(t).replace(x, 'localhost')
      );
    }
    let C = Symbol('NextURLInternal');
    class I {
      constructor(e, t, r) {
        let n, i;
        (('object' == typeof t && 'pathname' in t) || 'string' == typeof t
          ? ((n = t), (i = r || {}))
          : (i = r || t || {}),
          (this[C] = { url: A(e, n ?? i.base), options: i, basePath: '' }),
          this.analyze());
      }
      analyze() {
        var e, t, r, n, i;
        let s = (function (e, t) {
            let { basePath: r, i18n: n, trailingSlash: i } = t.nextConfig ?? {},
              s = {
                pathname: e,
                trailingSlash: '/' !== e ? e.endsWith('/') : i,
              };
            r &&
              T(s.pathname, r) &&
              ((s.pathname = (function (e, t) {
                if (!T(e, t)) return e;
                let r = e.slice(t.length);
                return r.startsWith('/') ? r : `/${r}`;
              })(s.pathname, r)),
              (s.basePath = r));
            let a = s.pathname;
            if (
              s.pathname.startsWith('/_next/data/') &&
              s.pathname.endsWith('.json')
            ) {
              let e = s.pathname
                .replace(/^\/_next\/data\//, '')
                .replace(/\.json$/, '')
                .split('/');
              ((s.buildId = e[0]),
                (a = 'index' !== e[1] ? `/${e.slice(1).join('/')}` : '/'),
                !0 === t.parseData && (s.pathname = a));
            }
            if (n) {
              let e = t.i18nProvider
                ? t.i18nProvider.analyze(s.pathname)
                : P(s.pathname, n.locales);
              ((s.locale = e.detectedLocale),
                (s.pathname = e.pathname ?? s.pathname),
                !e.detectedLocale &&
                  s.buildId &&
                  (e = t.i18nProvider
                    ? t.i18nProvider.analyze(a)
                    : P(a, n.locales)).detectedLocale &&
                  (s.locale = e.detectedLocale));
            }
            return s;
          })(this[C].url.pathname, {
            nextConfig: this[C].options.nextConfig,
            parseData: !0,
            i18nProvider: this[C].options.i18nProvider,
          }),
          a = (function (e, t) {
            let r;
            if (t?.host && !Array.isArray(t.host))
              r = t.host.toString().split(':', 1)[0];
            else {
              if (!e.hostname) return;
              r = e.hostname;
            }
            return r.toLowerCase();
          })(this[C].url, this[C].options.headers);
        this[C].domainLocale = this[C].options.i18nProvider
          ? this[C].options.i18nProvider.detectDomainLocale(a)
          : (function (e, t, r) {
              if (e) {
                for (let n of (r && (r = r.toLowerCase()), e))
                  if (
                    t === n.domain?.split(':', 1)[0].toLowerCase() ||
                    r === n.defaultLocale.toLowerCase() ||
                    n.locales?.some((e) => e.toLowerCase() === r)
                  )
                    return n;
              }
            })(
              null == (t = this[C].options.nextConfig) || null == (e = t.i18n)
                ? void 0
                : e.domains,
              a
            );
        let o =
          (null == (r = this[C].domainLocale) ? void 0 : r.defaultLocale) ||
          (null == (i = this[C].options.nextConfig) || null == (n = i.i18n)
            ? void 0
            : n.defaultLocale);
        ((this[C].url.pathname = s.pathname),
          (this[C].defaultLocale = o),
          (this[C].basePath = s.basePath ?? ''),
          (this[C].buildId = s.buildId),
          (this[C].locale = s.locale ?? o),
          (this[C].trailingSlash = s.trailingSlash));
      }
      formatPathname() {
        var e;
        let t;
        return (
          (t = (function (e, t, r, n) {
            if (!t || t === r) return e;
            let i = e.toLowerCase();
            return !n && (T(i, '/api') || T(i, `/${t.toLowerCase()}`))
              ? e
              : R(e, `/${t}`);
          })(
            (e = {
              basePath: this[C].basePath,
              buildId: this[C].buildId,
              defaultLocale: this[C].options.forceLocale
                ? void 0
                : this[C].defaultLocale,
              locale: this[C].locale,
              pathname: this[C].url.pathname,
              trailingSlash: this[C].trailingSlash,
            }).pathname,
            e.locale,
            e.buildId ? void 0 : e.defaultLocale,
            e.ignorePrefix
          )),
          (e.buildId || !e.trailingSlash) && (t = E(t)),
          e.buildId &&
            (t = O(
              R(t, `/_next/data/${e.buildId}`),
              '/' === e.pathname ? 'index.json' : '.json'
            )),
          (t = R(t, e.basePath)),
          !e.buildId && e.trailingSlash
            ? t.endsWith('/')
              ? t
              : O(t, '/')
            : E(t)
        );
      }
      formatSearch() {
        return this[C].url.search;
      }
      get buildId() {
        return this[C].buildId;
      }
      set buildId(e) {
        this[C].buildId = e;
      }
      get locale() {
        return this[C].locale ?? '';
      }
      set locale(e) {
        var t, r;
        if (
          !this[C].locale ||
          !(null == (r = this[C].options.nextConfig) || null == (t = r.i18n)
            ? void 0
            : t.locales.includes(e))
        )
          throw Object.defineProperty(
            TypeError(`The NextURL configuration includes no locale "${e}"`),
            '__NEXT_ERROR_CODE',
            { value: 'E597', enumerable: !1, configurable: !0 }
          );
        this[C].locale = e;
      }
      get defaultLocale() {
        return this[C].defaultLocale;
      }
      get domainLocale() {
        return this[C].domainLocale;
      }
      get searchParams() {
        return this[C].url.searchParams;
      }
      get host() {
        return this[C].url.host;
      }
      set host(e) {
        this[C].url.host = e;
      }
      get hostname() {
        return this[C].url.hostname;
      }
      set hostname(e) {
        this[C].url.hostname = e;
      }
      get port() {
        return this[C].url.port;
      }
      set port(e) {
        this[C].url.port = e;
      }
      get protocol() {
        return this[C].url.protocol;
      }
      set protocol(e) {
        this[C].url.protocol = e;
      }
      get href() {
        let e = this.formatPathname(),
          t = this.formatSearch();
        return `${this.protocol}//${this.host}${e}${t}${this.hash}`;
      }
      set href(e) {
        ((this[C].url = A(e)), this.analyze());
      }
      get origin() {
        return this[C].url.origin;
      }
      get pathname() {
        return this[C].url.pathname;
      }
      set pathname(e) {
        this[C].url.pathname = e;
      }
      get hash() {
        return this[C].url.hash;
      }
      set hash(e) {
        this[C].url.hash = e;
      }
      get search() {
        return this[C].url.search;
      }
      set search(e) {
        this[C].url.search = e;
      }
      get password() {
        return this[C].url.password;
      }
      set password(e) {
        this[C].url.password = e;
      }
      get username() {
        return this[C].url.username;
      }
      set username(e) {
        this[C].url.username = e;
      }
      get basePath() {
        return this[C].basePath;
      }
      set basePath(e) {
        this[C].basePath = e.startsWith('/') ? e : `/${e}`;
      }
      toString() {
        return this.href;
      }
      toJSON() {
        return this.href;
      }
      [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
          href: this.href,
          origin: this.origin,
          protocol: this.protocol,
          username: this.username,
          password: this.password,
          host: this.host,
          hostname: this.hostname,
          port: this.port,
          pathname: this.pathname,
          search: this.search,
          searchParams: this.searchParams,
          hash: this.hash,
        };
      }
      clone() {
        return new I(String(this), this[C].options);
      }
    }
    var N,
      j,
      D,
      $,
      L,
      U,
      M,
      B,
      q,
      V,
      W,
      G,
      H,
      F,
      z,
      K,
      X,
      J,
      Y,
      Q,
      Z,
      ee,
      et,
      er,
      en,
      ei,
      es,
      ea,
      eo,
      el,
      eu,
      ec,
      eh,
      ed = e.i(9254);
    let ep = Symbol('internal request');
    class ef extends Request {
      constructor(e, t = {}) {
        const r = 'string' != typeof e && 'url' in e ? e.url : String(e);
        (m(r),
          t.body && 'half' !== t.duplex && (t.duplex = 'half'),
          e instanceof Request ? super(e, t) : super(r, t));
        const n = new I(r, {
          headers: g(this.headers),
          nextConfig: t.nextConfig,
        });
        this[ep] = {
          cookies: new ed.RequestCookies(this.headers),
          nextUrl: n,
          url: n.toString(),
        };
      }
      [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
          cookies: this.cookies,
          nextUrl: this.nextUrl,
          url: this.url,
          bodyUsed: this.bodyUsed,
          cache: this.cache,
          credentials: this.credentials,
          destination: this.destination,
          headers: Object.fromEntries(this.headers),
          integrity: this.integrity,
          keepalive: this.keepalive,
          method: this.method,
          mode: this.mode,
          redirect: this.redirect,
          referrer: this.referrer,
          referrerPolicy: this.referrerPolicy,
          signal: this.signal,
        };
      }
      get cookies() {
        return this[ep].cookies;
      }
      get nextUrl() {
        return this[ep].nextUrl;
      }
      get page() {
        throw new c();
      }
      get ua() {
        throw new h();
      }
      get url() {
        return this[ep].url;
      }
    }
    class eg {
      static get(e, t, r) {
        let n = Reflect.get(e, t, r);
        return 'function' == typeof n ? n.bind(e) : n;
      }
      static set(e, t, r, n) {
        return Reflect.set(e, t, r, n);
      }
      static has(e, t) {
        return Reflect.has(e, t);
      }
      static deleteProperty(e, t) {
        return Reflect.deleteProperty(e, t);
      }
    }
    let em = Symbol('internal response'),
      ey = new Set([301, 302, 303, 307, 308]);
    function eb(e, t) {
      var r;
      if (null == e || null == (r = e.request) ? void 0 : r.headers) {
        if (!(e.request.headers instanceof Headers))
          throw Object.defineProperty(
            Error('request.headers must be an instance of Headers'),
            '__NEXT_ERROR_CODE',
            { value: 'E119', enumerable: !1, configurable: !0 }
          );
        let r = [];
        for (let [n, i] of e.request.headers)
          (t.set('x-middleware-request-' + n, i), r.push(n));
        t.set('x-middleware-override-headers', r.join(','));
      }
    }
    class ev extends Response {
      constructor(e, t = {}) {
        super(e, t);
        const r = this.headers,
          n = new Proxy(new ed.ResponseCookies(r), {
            get(e, n, i) {
              switch (n) {
                case 'delete':
                case 'set':
                  return (...i) => {
                    let s = Reflect.apply(e[n], e, i),
                      a = new Headers(r);
                    return (
                      s instanceof ed.ResponseCookies &&
                        r.set(
                          'x-middleware-set-cookie',
                          s
                            .getAll()
                            .map((e) => (0, ed.stringifyCookie)(e))
                            .join(',')
                        ),
                      eb(t, a),
                      s
                    );
                  };
                default:
                  return eg.get(e, n, i);
              }
            },
          });
        this[em] = {
          cookies: n,
          url: t.url
            ? new I(t.url, { headers: g(r), nextConfig: t.nextConfig })
            : void 0,
        };
      }
      [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
          cookies: this.cookies,
          url: this.url,
          body: this.body,
          bodyUsed: this.bodyUsed,
          headers: Object.fromEntries(this.headers),
          ok: this.ok,
          redirected: this.redirected,
          status: this.status,
          statusText: this.statusText,
          type: this.type,
        };
      }
      get cookies() {
        return this[em].cookies;
      }
      static json(e, t) {
        let r = Response.json(e, t);
        return new ev(r.body, r);
      }
      static redirect(e, t) {
        let r =
          'number' == typeof t ? t : ((null == t ? void 0 : t.status) ?? 307);
        if (!ey.has(r))
          throw Object.defineProperty(
            RangeError(
              'Failed to execute "redirect" on "response": Invalid status code'
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E529', enumerable: !1, configurable: !0 }
          );
        let n = 'object' == typeof t ? t : {},
          i = new Headers(null == n ? void 0 : n.headers);
        return (
          i.set('Location', m(e)),
          new ev(null, { ...n, headers: i, status: r })
        );
      }
      static rewrite(e, t) {
        let r = new Headers(null == t ? void 0 : t.headers);
        return (
          r.set('x-middleware-rewrite', m(e)),
          eb(t, r),
          new ev(null, { ...t, headers: r })
        );
      }
      static next(e) {
        let t = new Headers(null == e ? void 0 : e.headers);
        return (
          t.set('x-middleware-next', '1'),
          eb(e, t),
          new ev(null, { ...e, headers: t })
        );
      }
    }
    function ew(e, t) {
      let r = 'string' == typeof t ? new URL(t) : t,
        n = new URL(e, t),
        i = n.origin === r.origin;
      return {
        url: i ? n.toString().slice(r.origin.length) : n.toString(),
        isRelative: i,
      };
    }
    let e_ = 'next-router-prefetch',
      eE = [
        'rsc',
        'next-router-state-tree',
        e_,
        'next-hmr-refresh',
        'next-router-segment-prefetch',
      ],
      eS = '_rsc';
    class eR extends Error {
      constructor() {
        super(
          'Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers'
        );
      }
      static callable() {
        throw new eR();
      }
    }
    class eO extends Headers {
      constructor(e) {
        (super(),
          (this.headers = new Proxy(e, {
            get(t, r, n) {
              if ('symbol' == typeof r) return eg.get(t, r, n);
              let i = r.toLowerCase(),
                s = Object.keys(e).find((e) => e.toLowerCase() === i);
              if (void 0 !== s) return eg.get(t, s, n);
            },
            set(t, r, n, i) {
              if ('symbol' == typeof r) return eg.set(t, r, n, i);
              let s = r.toLowerCase(),
                a = Object.keys(e).find((e) => e.toLowerCase() === s);
              return eg.set(t, a ?? r, n, i);
            },
            has(t, r) {
              if ('symbol' == typeof r) return eg.has(t, r);
              let n = r.toLowerCase(),
                i = Object.keys(e).find((e) => e.toLowerCase() === n);
              return void 0 !== i && eg.has(t, i);
            },
            deleteProperty(t, r) {
              if ('symbol' == typeof r) return eg.deleteProperty(t, r);
              let n = r.toLowerCase(),
                i = Object.keys(e).find((e) => e.toLowerCase() === n);
              return void 0 === i || eg.deleteProperty(t, i);
            },
          })));
      }
      static seal(e) {
        return new Proxy(e, {
          get(e, t, r) {
            switch (t) {
              case 'append':
              case 'delete':
              case 'set':
                return eR.callable;
              default:
                return eg.get(e, t, r);
            }
          },
        });
      }
      merge(e) {
        return Array.isArray(e) ? e.join(', ') : e;
      }
      static from(e) {
        return e instanceof Headers ? e : new eO(e);
      }
      append(e, t) {
        l
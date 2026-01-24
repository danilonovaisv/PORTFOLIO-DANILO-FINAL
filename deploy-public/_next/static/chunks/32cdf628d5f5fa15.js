(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  21063,
  (e) => {
    'use strict';
    var t = e.i(86825),
      i = e.i(84833);
    function s() {
      let e = (0, t.useReducedMotion)(),
        [s, r] = (0, i.useState)(!1);
      return (
        (0, i.useEffect)(() => {
          r(!0);
        }, []),
        !!s && (e ?? !1)
      );
    }
    e.s(['useReducedMotion', () => s]);
  },
  28883,
  (e, t, i) => {},
  64177,
  (e, t, i) => {
    var s = e.i(74920);
    e.r(28883);
    var r = e.r(84833),
      a = r && 'object' == typeof r && 'default' in r ? r : { default: r },
      l = void 0 !== s.default && s.default.env && !0,
      n = function (e) {
        return '[object String]' === Object.prototype.toString.call(e);
      },
      o = (function () {
        function e(e) {
          var t = void 0 === e ? {} : e,
            i = t.name,
            s = void 0 === i ? 'stylesheet' : i,
            r = t.optimizeForSpeed,
            a = void 0 === r ? l : r;
          (c(n(s), '`name` must be a string'),
            (this._name = s),
            (this._deletedRulePlaceholder = '#' + s + '-deleted-rule____{}'),
            c('boolean' == typeof a, '`optimizeForSpeed` must be a boolean'),
            (this._optimizeForSpeed = a),
            (this._serverSheet = void 0),
            (this._tags = []),
            (this._injected = !1),
            (this._rulesCount = 0));
          var o =
            'u' > typeof window &&
            document.querySelector('meta[property="csp-nonce"]');
          this._nonce = o ? o.getAttribute('content') : null;
        }
        var t,
          i = e.prototype;
        return (
          (i.setOptimizeForSpeed = function (e) {
            (c(
              'boolean' == typeof e,
              '`setOptimizeForSpeed` accepts a boolean'
            ),
              c(
                0 === this._rulesCount,
                'optimizeForSpeed cannot be when rules have already been inserted'
              ),
              this.flush(),
              (this._optimizeForSpeed = e),
              this.inject());
          }),
          (i.isOptimizeForSpeed = function () {
            return this._optimizeForSpeed;
          }),
          (i.inject = function () {
            var e = this;
            if (
              (c(!this._injected, 'sheet already injected'),
              (this._injected = !0),
              'u' > typeof window && this._optimizeForSpeed)
            ) {
              ((this._tags[0] = this.makeStyleTag(this._name)),
                (this._optimizeForSpeed = 'insertRule' in this.getSheet()),
                this._optimizeForSpeed ||
                  (l ||
                    console.warn(
                      'StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.'
                    ),
                  this.flush(),
                  (this._injected = !0)));
              return;
            }
            this._serverSheet = {
              cssRules: [],
              insertRule: function (t, i) {
                return (
                  'number' == typeof i
                    ? (e._serverSheet.cssRules[i] = { cssText: t })
                    : e._serverSheet.cssRules.push({ cssText: t }),
                  i
                );
              },
              deleteRule: function (t) {
                e._serverSheet.cssRules[t] = null;
              },
            };
          }),
          (i.getSheetForTag = function (e) {
            if (e.sheet) return e.sheet;
            for (var t = 0; t < document.styleSheets.length; t++)
              if (document.styleSheets[t].ownerNode === e)
                return document.styleSheets[t];
          }),
          (i.getSheet = function () {
            return this.getSheetForTag(this._tags[this._tags.length - 1]);
          }),
          (i.insertRule = function (e, t) {
            if (
              (c(n(e), '`insertRule` accepts only strings'),
              'u' < typeof window)
            )
              return (
                'number' != typeof t && (t = this._serverSheet.cssRules.length),
                this._serverSheet.insertRule(e, t),
                this._rulesCount++
              );
            if (this._optimizeForSpeed) {
              var i = this.getSheet();
              'number' != typeof t && (t = i.cssRules.length);
              try {
                i.insertRule(e, t);
              } catch (t) {
                return (
                  l ||
                    console.warn(
                      'StyleSheet: illegal rule: \n\n' +
                        e +
                        '\n\nSee https://stackoverflow.com/q/20007992 for more info'
                    ),
                  -1
                );
              }
            } else {
              var s = this._tags[t];
              this._tags.push(this.makeStyleTag(this._name, e, s));
            }
            return this._rulesCount++;
          }),
          (i.replaceRule = function (e, t) {
            if (this._optimizeForSpeed || 'u' < typeof window) {
              var i = 'u' > typeof window ? this.getSheet() : this._serverSheet;
              if (
                (t.trim() || (t = this._deletedRulePlaceholder), !i.cssRules[e])
              )
                return e;
              i.deleteRule(e);
              try {
                i.insertRule(t, e);
              } catch (s) {
                (l ||
                  console.warn(
                    'StyleSheet: illegal rule: \n\n' +
                      t +
                      '\n\nSee https://stackoverflow.com/q/20007992 for more info'
                  ),
                  i.insertRule(this._deletedRulePlaceholder, e));
              }
            } else {
              var s = this._tags[e];
              (c(s, 'old rule at index `' + e + '` not found'),
                (s.textContent = t));
            }
            return e;
          }),
          (i.deleteRule = function (e) {
            if ('u' < typeof window)
              return void this._serverSheet.deleteRule(e);
            if (this._optimizeForSpeed) this.replaceRule(e, '');
            else {
              var t = this._tags[e];
              (c(t, 'rule at index `' + e + '` not found'),
                t.parentNode.removeChild(t),
                (this._tags[e] = null));
            }
          }),
          (i.flush = function () {
            ((this._injected = !1),
              (this._rulesCount = 0),
              'u' > typeof window
                ? (this._tags.forEach(function (e) {
                    return e && e.parentNode.removeChild(e);
                  }),
                  (this._tags = []))
                : (this._serverSheet.cssRules = []));
          }),
          (i.cssRules = function () {
            var e = this;
            return 'u' < typeof window
              ? this._serverSheet.cssRules
              : this._tags.reduce(function (t, i) {
                  return (
                    i
                      ? (t = t.concat(
                          Array.prototype.map.call(
                            e.getSheetForTag(i).cssRules,
                            function (t) {
                              return t.cssText === e._deletedRulePlaceholder
                                ? null
                                : t;
                            }
                          )
                        ))
                      : t.push(null),
                    t
                  );
                }, []);
          }),
          (i.makeStyleTag = function (e, t, i) {
            t &&
              c(n(t), 'makeStyleTag accepts only strings as second parameter');
            var s = document.createElement('style');
            (this._nonce && s.setAttribute('nonce', this._nonce),
              (s.type = 'text/css'),
              s.setAttribute('data-' + e, ''),
              t && s.appendChild(document.createTextNode(t)));
            var r = document.head || document.getElementsByTagName('head')[0];
            return (i ? r.insertBefore(s, i) : r.appendChild(s), s);
          }),
          (t = [
            {
              key: 'length',
              get: function () {
                return this._rulesCount;
              },
            },
          ]),
          (function (e, t) {
            for (var i = 0; i < t.length; i++) {
              var s = t[i];
              ((s.enumerable = s.enumerable || !1),
                (s.configurable = !0),
                'value' in s && (s.writable = !0),
                Object.defineProperty(e, s.key, s));
            }
          })(e.prototype, t),
          e
        );
      })();
    function c(e, t) {
      if (!e) throw Error('StyleSheet: ' + t + '.');
    }
    var d = function (e) {
        for (var t = 5381, i = e.length; i; ) t = (33 * t) ^ e.charCodeAt(--i);
        return t >>> 0;
      },
      u = {};
    function m(e, t) {
      if (!t) return 'jsx-' + e;
      var i = String(t),
        s = e + i;
      return (u[s] || (u[s] = 'jsx-' + d(e + '-' + i)), u[s]);
    }
    function h(e, t) {
      'u' < typeof window && (t = t.replace(/\/style/gi, '\\/style'));
      var i = e + t;
      return (
        u[i] || (u[i] = t.replace(/__jsx-style-dynamic-selector/g, e)),
        u[i]
      );
    }
    var p = (function () {
        function e(e) {
          var t = void 0 === e ? {} : e,
            i = t.styleSheet,
            s = void 0 === i ? null : i,
            r = t.optimizeForSpeed,
            a = void 0 !== r && r;
          ((this._sheet =
            s || new o({ name: 'styled-jsx', optimizeForSpeed: a })),
            this._sheet.inject(),
            s &&
              'boolean' == typeof a &&
              (this._sheet.setOptimizeForSpeed(a),
              (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed())),
            (this._fromServer = void 0),
            (this._indices = {}),
            (this._instancesCounts = {}));
        }
        var t = e.prototype;
        return (
          (t.add = function (e) {
            var t = this;
            (void 0 === this._optimizeForSpeed &&
              ((this._optimizeForSpeed = Array.isArray(e.children)),
              this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),
              (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed())),
              'u' > typeof window &&
                !this._fromServer &&
                ((this._fromServer = this.selectFromServer()),
                (this._instancesCounts = Object.keys(this._fromServer).reduce(
                  function (e, t) {
                    return ((e[t] = 0), e);
                  },
                  {}
                ))));
            var i = this.getIdAndRules(e),
              s = i.styleId,
              r = i.rules;
            if (s in this._instancesCounts) {
              this._instancesCounts[s] += 1;
              return;
            }
            var a = r
              .map(function (e) {
                return t._sheet.insertRule(e);
              })
              .filter(function (e) {
                return -1 !== e;
              });
            ((this._indices[s] = a), (this._instancesCounts[s] = 1));
          }),
          (t.remove = function (e) {
            var t = this,
              i = this.getIdAndRules(e).styleId;
            if (
              ((function (e, t) {
                if (!e) throw Error('StyleSheetRegistry: ' + t + '.');
              })(i in this._instancesCounts, 'styleId: `' + i + '` not found'),
              (this._instancesCounts[i] -= 1),
              this._instancesCounts[i] < 1)
            ) {
              var s = this._fromServer && this._fromServer[i];
              (s
                ? (s.parentNode.removeChild(s), delete this._fromServer[i])
                : (this._indices[i].forEach(function (e) {
                    return t._sheet.deleteRule(e);
                  }),
                  delete this._indices[i]),
                delete this._instancesCounts[i]);
            }
          }),
          (t.update = function (e, t) {
            (this.add(t), this.remove(e));
          }),
          (t.flush = function () {
            (this._sheet.flush(),
              this._sheet.inject(),
              (this._fromServer = void 0),
              (this._indices = {}),
              (this._instancesCounts = {}));
          }),
          (t.cssRules = function () {
            var e = this,
              t = this._fromServer
                ? Object.keys(this._fromServer).map(function (t) {
                    return [t, e._fromServer[t]];
                  })
                : [],
              i = this._sheet.cssRules();
            return t.concat(
              Object.keys(this._indices)
                .map(function (t) {
                  return [
                    t,
                    e._indices[t]
                      .map(function (e) {
                        return i[e].cssText;
                      })
                      .join(e._optimizeForSpeed ? '' : '\n'),
                  ];
                })
                .filter(function (e) {
                  return !!e[1];
                })
            );
          }),
          (t.styles = function (e) {
            var t, i;
            return (
              (t = this.cssRules()),
              void 0 === (i = e) && (i = {}),
              t.map(function (e) {
                var t = e[0],
                  s = e[1];
                return a.default.createElement('style', {
                  id: '__' + t,
                  key: '__' + t,
                  nonce: i.nonce ? i.nonce : void 0,
                  dangerouslySetInnerHTML: { __html: s },
                });
              })
            );
          }),
          (t.getIdAndRules = function (e) {
            var t = e.children,
              i = e.dynamic,
              s = e.id;
            if (i) {
              var r = m(s, i);
              return {
                styleId: r,
                rules: Array.isArray(t)
                  ? t.map(function (e) {
                      return h(r, e);
                    })
                  : [h(r, t)],
              };
            }
            return { styleId: m(s), rules: Array.isArray(t) ? t : [t] };
          }),
          (t.selectFromServer = function () {
            return Array.prototype.slice
              .call(document.querySelectorAll('[id^="__jsx-"]'))
              .reduce(function (e, t) {
                return ((e[t.id.slice(2)] = t), e);
              }, {});
          }),
          e
        );
      })(),
      f = r.createContext(null);
    function x() {
      return new p();
    }
    function g() {
      return r.useContext(f);
    }
    f.displayName = 'StyleSheetContext';
    var v = a.default.useInsertionEffect || a.default.useLayoutEffect,
      b = 'u' > typeof window ? x() : void 0;
    function y(e) {
      var t = b || g();
      return (
        t &&
          ('u' < typeof window
            ? t.add(e)
            : v(
                function () {
                  return (
                    t.add(e),
                    function () {
                      t.remove(e);
                    }
                  );
                },
                [e.id, String(e.dynamic)]
              )),
        null
      );
    }
    ((y.dynamic = function (e) {
      return e
        .map(function (e) {
          return m(e[0], e[1]);
        })
        .join(' ');
    }),
      (i.StyleRegistry = function (e) {
        var t = e.registry,
          i = e.children,
          s = r.useContext(f),
          l = r.useState(function () {
            return s || t || x();
          })[0];
        return a.default.createElement(f.Provider, { value: l }, i);
      }),
      (i.createStyleRegistry = x),
      (i.style = y),
      (i.useStyleRegistry = g));
  },
  55264,
  (e, t, i) => {
    t.exports = e.r(64177).style;
  },
  89393,
  (e) => {
    'use strict';
    var t = e.i(78923);
    let i = { fadeGhost: t.ghostFade, riseSoft: t.riseSoft },
      s = { ghost: t.MOTION_TOKENS.spring.ghost };
    e.s(['motionSprings', 0, s, 'motionTokens', 0, i]);
  },
  37560,
  (e) => {
    'use strict';
    var t = e.i(96148),
      i = e.i(84833),
      s = e.i(73019),
      r = e.i(86825),
      a = e.i(14689),
      l = e.i(66537),
      n = e.i(35315),
      o = e.i(43683),
      c = e.i(89393),
      d = e.i(7766),
      u = e.i(72928);
    function m() {
      let e = (0, r.useReducedMotion)(),
        m = (0, i.useRef)(null),
        { scrollYProgress: h } = (0, a.useScroll)({
          target: m,
          offset: ['start end', 'end start'],
        }),
        p = (0, i.useRef)(null),
        f = (0, i.useRef)(null);
      (0, i.useEffect)(() => {
        (p.current && (p.current.playbackRate = 0.4),
          f.current && (f.current.playbackRate = 0.4));
      }, []);
      let x = (0, l.useSpring)(h, c.motionSprings.ghost),
        g = (0, n.useTransform)(x, [0, 1], e ? [0, 0] : [48, -48]),
        v = (0, d.useSiteAssetUrl)(
          u.SITE_ASSET_KEYS.heroVideos.aboutDesktop,
          o.ABOUT_CONTENT.hero.videos.desktop ||
            '/public/videos/about.hero.desktop_video.mp4'
        ),
        b = (0, d.useSiteAssetUrl)(
          u.SITE_ASSET_KEYS.heroVideos.aboutMobile,
          o.ABOUT_CONTENT.hero.videos.mobile ||
            '/public/videos/about.hero.mobile_video.mp4'
        );
      return (0, t.jsxs)('section', {
        ref: m,
        className: 'relative min-h-screen bg-background overflow-hidden',
        'aria-label': 'Hero - Manifesto',
        children: [
          (0, t.jsx)(s.motion.video, {
            ref: p,
            src: v || '/public/videos/about.hero.desktop_video.mp4',
            autoPlay: !0,
            muted: !0,
            loop: !0,
            playsInline: !0,
            preload: 'metadata',
            className:
              'hidden lg:block absolute inset-0 w-full h-full object-cover opacity-100',
            'aria-hidden': 'true',
          }),
          (0, t.jsx)('div', {
            className:
              'hidden lg:block absolute inset-0 bg-background/60 bg-linear-to-r from-background via-background/40 to-background/80 pointer-events-none z-1',
            'aria-hidden': 'true',
          }),
          (0, t.jsx)('div', {
            className:
              'relative z-10 hidden lg:flex h-screen items-center overflow-hidden w-full',
            children: (0, t.jsx)('div', {
              className: 'std-grid w-full',
              children: (0, t.jsxs)('div', {
                className: 'grid grid-cols-12 w-full gap-8',
                children: [
                  (0, t.jsx)('div', {
                    className: 'col-span-6',
                    'aria-hidden': 'true',
                  }),
                  (0, t.jsx)(s.motion.div, {
                    initial: 'hidden',
                    whileInView: 'visible',
                    viewport: { once: !0, amount: 0.3 },
                    variants: {
                      visible: {
                        transition: {
                          staggerChildren: 0.15,
                          delayChildren: 0.2,
                        },
                      },
                    },
                    className:
                      'col-span-6 flex flex-col items-end text-right -translate-y-[10%]',
                    children: (0, t.jsxs)('div', {
                      className: 'space-y-8 w-full',
                      children: [
                        (0, t.jsxs)(s.motion.div, {
                          variants: {
                            hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
                            visible: {
                              opacity: 1,
                              y: 0,
                              filter: 'blur(0px)',
                              transition: {
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                              },
                            },
                          },
                          className: 'flex flex-col items-end gap-2',
                          children: [
                            (0, t.jsxs)('h1', {
                              className:
                                'type-h1 text-text-light tracking-tight leading-[1.1]',
                              children: [
                                o.ABOUT_CONTENT.hero.title.text,
                                (0, t.jsx)('span', {
                                  className: 'text-bluePrimary',
                                  children:
                                    o.ABOUT_CONTENT.hero.title.highlight,
                                }),
                              ],
                            }),
                            (0, t.jsx)('div', {
                              className: 'flex flex-col items-end',
                              children: o.ABOUT_CONTENT.hero.manifesto.map(
                                (e, i) =>
                                  (0, t.jsxs)(
                                    'p',
                                    {
                                      className:
                                        'type-h1 text-text-light font-bold tracking-tight leading-[1.05]',
                                      children: [
                                        e.text,
                                        e.highlight &&
                                          (0, t.jsx)('span', {
                                            className: 'text-bluePrimary',
                                            children: e.highlight,
                                          }),
                                      ],
                                    },
                                    i
                                  )
                              ),
                            }),
                          ],
                        }),
                        (0, t.jsx)(s.motion.div, {
                          variants: {
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: {
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                              },
                            },
                          },
                          className:
                            'type-h3 text-text-secondary font-medium leading-relaxed max-w-[580px] ml-auto',
                          children: o.ABOUT_CONTENT.hero.description.join(' '),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          }),
          (0, t.jsx)('div', {
            className:
              'absolute bottom-0 left-0 w-full h-[30vh] md:h-[40vh] bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-20',
          }),
          (0, t.jsxs)('div', {
            className: 'lg:hidden',
            children: [
              (0, t.jsxs)('div', {
                className: 'relative aspect-square w-full overflow-hidden',
                children: [
                  (0, t.jsx)(s.motion.video, {
                    ref: f,
                    src: b,
                    autoPlay: !0,
                    muted: !0,
                    loop: !0,
                    playsInline: !0,
                    preload: 'metadata',
                    className:
                      'absolute inset-0 w-full h-full object-cover object-top opacity-[0.78]',
                    style: { y: g },
                    'aria-hidden': 'true',
                  }),
                  (0, t.jsx)('div', {
                    className:
                      'absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10',
                  }),
                ],
              }),
              (0, t.jsx)('div', {
                className: 'relative z-10 px-6 pt-10 pb-20 text-center',
                children: (0, t.jsxs)(s.motion.div, {
                  initial: e ? 'visible' : 'hidden',
                  animate: 'visible',
                  variants: {
                    visible: {
                      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
                    },
                  },
                  className: 'space-y-6',
                  children: [
                    (0, t.jsx)(s.motion.div, {
                      variants: {
                        hidden: { opacity: 0, filter: 'blur(10px)' },
                        visible: {
                          opacity: 1,
                          filter: 'blur(0px)',
                          transition: {
                            duration: 1.4,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      },
                      className: 'space-y-4',
                      children: (0, t.jsxs)('h1', {
                        className:
                          'type-h2 text-white leading-tight flex flex-col gap-1',
                        children: [
                          (0, t.jsxs)('span', {
                            children: [
                              'Sou ',
                              (0, t.jsx)('span', {
                                className: 'text-bluePrimary',
                                children: 'Danilo Novais.',
                              }),
                            ],
                          }),
                          (0, t.jsxs)('span', {
                            children: [
                              'Você ',
                              (0, t.jsx)('span', {
                                className: 'text-bluePrimary',
                                children: 'não vê tudo',
                              }),
                              ' o que eu faço.',
                            ],
                          }),
                          (0, t.jsxs)('span', {
                            children: [
                              'Mas sente quando',
                              ' ',
                              (0, t.jsx)('span', {
                                className: 'text-bluePrimary',
                                children: 'funciona.',
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, t.jsx)(s.motion.div, {
                      variants: c.motionTokens.fadeGhost,
                      className:
                        'type-h3 text-white leading-snug tracking-tight max-w-[98%] mx-auto font-medium',
                      children: o.ABOUT_CONTENT.hero.description.map((e, i) =>
                        (0, t.jsx)(
                          'span',
                          { className: 'block', children: e },
                          i
                        )
                      ),
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      });
    }
    e.s(['AboutHero', () => m]);
  },
  32390,
  (e) => {
    'use strict';
    var t = e.i(96148),
      i = e.i(84833),
      s = e.i(67725),
      r = e.i(38421),
      a = e.i(23459),
      l = e.i(69527),
      n = e.i(7766),
      o = e.i(72928),
      c = e.i(62596);
    r.default.registerPlugin(a.ScrollTrigger);
    let d = [
      {
        id: '1',
        title: 'O que permanece',
        desc: 'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia. Enquanto muitos olhavam para o brilho imediato, eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo. A essência das coisas sempre falou mais alto do que a superfície.',
        fallback: 'about/origin/about.origin_image.1.webp',
        alt: 'O que permanece - essência que sobrevive ao tempo',
      },
      {
        id: '2',
        title: 'Do traço à intenção',
        desc: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso, do lápis na margem do caderno. Aos poucos, aquilo que era instinto virou direção. Com cada tentativa, aprendi a dar forma ao invisível — até que os conceitos começaram a falar por si.',
        fallback: 'about/origin/about.origin_image.2.webp',
        alt: 'Do traço à intenção - processo criativo emergente',
      },
      {
        id: '3',
        title: 'A descoberta do invisível',
        desc: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação. Por trás de cada escolha visual, existe intenção. Descobri que o design verdadeiro não grita — ele conduz. Ele está presente nos detalhes que ninguém percebe, mas que todos sentem. Transformar sem que se perceba a transformação: isso é potência.',
        fallback: 'about/origin/about.origin_image.3.webp',
        alt: 'Descoberta do invisível - design como transformação',
      },
      {
        id: '4',
        title: 'Expansão com propósito',
        desc: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação. Minha trajetória uniu intuição com método, arte com estratégia. O futuro pede novas ferramentas — e eu as abracei. Mas nunca deixei que a tecnologia apagasse o que me move: a sensibilidade, o olhar atento, a busca pelo significado.',
        fallback: 'about/origin/about.origin_image.4.webp',
        alt: 'Expansão com propósito - intuição + tecnologia',
      },
    ];
    e.s([
      'default',
      0,
      function () {
        let e = (0, i.useRef)(null),
          u = (0, i.useRef)(null),
          m = (0, i.useRef)(null),
          [h, p] = (0, i.useState)(!1),
          f = (e) => (0, c.buildSupabaseStorageUrl)('site-assets', e) ?? void 0,
          x =
            (0, n.useSiteAssetUrl)(
              o.SITE_ASSET_KEYS.about.originImages[0],
              f(d[0].fallback)
            ) ?? f(d[0].fallback),
          g =
            (0, n.useSiteAssetUrl)(
              o.SITE_ASSET_KEYS.about.originImages[1],
              f(d[1].fallback)
            ) ?? f(d[1].fallback),
          v =
            (0, n.useSiteAssetUrl)(
              o.SITE_ASSET_KEYS.about.originImages[2],
              f(d[2].fallback)
            ) ?? f(d[2].fallback),
          b =
            (0, n.useSiteAssetUrl)(
              o.SITE_ASSET_KEYS.about.originImages[3],
              f(d[3].fallback)
            ) ?? f(d[3].fallback),
          y = [
            { ...d[0], img: x },
            { ...d[1], img: g },
            { ...d[2], img: v },
            { ...d[3], img: b },
          ];
        return ((0, i.useEffect)(() => {
          p(!0);
        }, []),
        (0, i.useEffect)(() => {
          if (!h) return;
          let e = 0,
            t = new l.default({
              duration: 1.2,
              easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
              touchMultiplier: 2,
            }),
            i = (s) => {
              (t.raf(s), (e = requestAnimationFrame(i)));
            };
          ((e = requestAnimationFrame(i)),
            t.on('scroll', a.ScrollTrigger.update));
          let s = r.default.matchMedia();
          (s.add('(min-width: 1024px)', () => {
            if (!u.current || !m.current) return;
            let e = r.default.utils.toArray('.img-wrapper'),
              t = r.default.utils.toArray('.img-wrapper img'),
              i = r.default.utils.toArray('.arch__info'),
              s = ['#040013', '#060018', '#08001e', '#0a001a'],
              a = r.default.timeline({
                scrollTrigger: {
                  trigger: u.current,
                  start: 'top top',
                  end: 'bottom bottom',
                  pin: m.current,
                  scrub: !0,
                  invalidateOnRefresh: !0,
                },
              });
            (r.default.set(t, {
              clipPath: 'inset(0% 0% 0% 0%)',
              objectPosition: '0px 0%',
              scale: 1.15,
              filter: 'blur(12px)',
              opacity: 0,
              yPercent: 0,
            }),
              e.forEach((e, t) => {
                e.style.zIndex = (y.length - t).toString();
              }),
              r.default.to(t[0], {
                filter: 'blur(0px)',
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: u.current,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              }),
              y.forEach((i, r) => {
                let l = e[r],
                  n = t[r],
                  o = t[r + 1];
                if (r < y.length - 1) {
                  let e = 1.5 * r;
                  (a.to(
                    'body',
                    { backgroundColor: s[r + 1], duration: 1.5, ease: 'none' },
                    e
                  ),
                    a.to(
                      l,
                      {
                        clipPath: 'inset(0px 0px 100% 0px)',
                        duration: 1.5,
                        ease: 'none',
                      },
                      e
                    ),
                    a.to(
                      n,
                      {
                        objectPosition: '0px 60%',
                        yPercent: 15,
                        duration: 1.5,
                        ease: 'none',
                      },
                      e
                    ),
                    a.to(
                      o,
                      {
                        objectPosition: '0px 0%',
                        yPercent: -15,
                        filter: 'blur(0px)',
                        opacity: 1,
                        duration: 1.5,
                        ease: 'none',
                      },
                      e
                    ));
                }
              }),
              i.forEach((e) => {
                let t = e.querySelector('h2'),
                  i = e.querySelector('p');
                (t &&
                  r.default.fromTo(
                    t,
                    { y: 40, opacity: 0, filter: 'blur(12px)' },
                    {
                      y: 0,
                      opacity: 1,
                      filter: 'blur(0px)',
                      duration: 0.8,
                      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
                      scrollTrigger: {
                        trigger: e,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                      },
                    }
                  ),
                  i &&
                    r.default.fromTo(
                      i,
                      { y: 30, opacity: 0, filter: 'blur(8px)' },
                      {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.8,
                        delay: 0.1,
                        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        scrollTrigger: {
                          trigger: e,
                          start: 'top 80%',
                          toggleActions: 'play none none reverse',
                        },
                      }
                    ));
              }));
          }),
            s.add('(max-width: 1023px)', () => {
              let e = r.default.utils.toArray('.mobile-img-container'),
                t = r.default.utils.toArray('.mobile-text-container'),
                i = ['#040013', '#060018', '#08001e', '#0a001a'];
              (e.forEach((e, t) => {
                let s = e.querySelector('img');
                s &&
                  r.default
                    .timeline({
                      scrollTrigger: {
                        trigger: e,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: !0,
                      },
                    })
                    .fromTo(
                      s,
                      { y: -40, scale: 1.1 },
                      { y: 40, scale: 1, ease: 'none' }
                    )
                    .to(
                      'body',
                      {
                        backgroundColor: i[t],
                        duration: 0.5,
                        ease: 'power2.inOut',
                      },
                      0
                    );
              }),
                t.forEach((e) => {
                  r.default.fromTo(
                    e,
                    { y: 80, opacity: 0, filter: 'blur(10px)' },
                    {
                      y: 0,
                      opacity: 1,
                      filter: 'blur(0px)',
                      duration: 1,
                      ease: 'power2.out',
                      scrollTrigger: {
                        trigger: e,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                      },
                    }
                  );
                }));
            }));
          let n = () => a.ScrollTrigger.refresh();
          return (
            window.addEventListener('load', n),
            setTimeout(n, 500),
            () => {
              (window.removeEventListener('load', n),
                e && cancelAnimationFrame(e),
                s.revert(),
                t.destroy(),
                a.ScrollTrigger.getAll().forEach((e) => e.kill()));
            }
          );
        }, [h]),
        h)
          ? (0, t.jsx)('section', {
              className:
                'relative w-full overflow-hidden transition-colors duration-1000',
              ref: e,
              children: (0, t.jsxs)('div', {
                className:
                  'max-w-420 mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-24',
                children: [
                  (0, t.jsx)('div', {
                    className: 'mb-24 text-center select-none',
                    children: (0, t.jsx)('h1', {
                      className:
                        "text-[1.75rem] font-['CustomLight'] font-light leading-none text-[#4fe6ff] tracking-[0.2em] uppercase",
                      children: 'ORIGEM',
                    }),
                  }),
                  (0, t.jsxs)('div', {
                    className:
                      'arch relative grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 md:gap-12 max-w-360 mx-auto',
                    ref: u,
                    children: [
                      (0, t.jsx)('div', {
                        className:
                          'col-span-4 md:col-span-8 lg:col-span-6 flex flex-col',
                        children: y.map((e) =>
                          (0, t.jsx)(
                            'div',
                            {
                              className:
                                'arch__info min-h-screen lg:h-[120vh] flex flex-col justify-center mb-24 lg:mb-0 items-center text-center lg:items-end lg:text-right',
                              children: (0, t.jsxs)('div', {
                                className:
                                  'content w-full lg:max-w-130 flex flex-col gap-8 lg:transform lg:-translate-y-[15%]',
                                children: [
                                  (0, t.jsxs)('div', {
                                    className:
                                      'mobile-text-container space-y-6',
                                    children: [
                                      (0, t.jsx)('h2', {
                                        className:
                                          'text-h1 font-bold leading-[1.1] text-primary normal-case',
                                        children: e.title,
                                      }),
                                      (0, t.jsx)('p', {
                                        className:
                                          'text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-[1.7] text-[#fcffff] opacity-75',
                                        children: e.desc,
                                      }),
                                    ],
                                  }),
                                  (0, t.jsx)('div', {
                                    className:
                                      'mobile-img-container lg:hidden relative mt-8 w-full aspect-square min-h-60 rounded-3xl overflow-hidden bg-[#060018] shadow-2xl',
                                    children: (0, t.jsx)(s.default, {
                                      src: e.img || '/placeholder-image.jpg',
                                      alt: e.alt,
                                      fill: !0,
                                      className:
                                        'w-full h-full object-cover will-change-transform',
                                      sizes: '(max-width: 1024px) 100vw, 560px',
                                      priority: '1' === e.id,
                                    }),
                                  }),
                                ],
                              }),
                            },
                            e.id
                          )
                        ),
                      }),
                      (0, t.jsx)('div', {
                        className:
                          'arch__right hidden lg:flex col-span-6 h-screen sticky top-0 items-center justify-center',
                        ref: m,
                        children: (0, t.jsx)('div', {
                          className: 'relative w-full aspect-square max-w-140',
                          children: y.map((e) =>
                            (0, t.jsx)(
                              'div',
                              {
                                className:
                                  'img-wrapper absolute inset-0 rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] bg-[#040013]',
                                children: (0, t.jsx)(s.default, {
                                  src: e.img || '/placeholder-image.jpg',
                                  alt: e.alt,
                                  fill: !0,
                                  className:
                                    'w-full h-full object-cover will-change-transform',
                                  sizes: '(min-width: 1024px) 560px, 100vw',
                                  priority: '1' === e.id,
                                }),
                              },
                              `desktop-img-${e.id}`
                            )
                          ),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            })
          : (0, t.jsx)('section', {
              className:
                'relative w-full overflow-hidden transition-colors duration-1000',
              children: (0, t.jsx)('div', {
                className:
                  'max-w-420 mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-24',
                children: (0, t.jsx)('div', {
                  className: 'mb-24 text-center select-none',
                  children: (0, t.jsx)('h1', {
                    className:
                      "text-[1.75rem] font-['CustomLight'] font-light leading-none text-[#4fe6ff] tracking-[0.2em] uppercase",
                    children: 'LOADING...',
                  }),
                }),
              }),
            });
      },
    ]);
  },
  15212,
  (e) => {
    'use strict';
    var t = e.i(96148),
      i = e.i(55264),
      s = e.i(73019),
      r = e.i(86825),
      a = e.i(43683),
      l = e.i(45439);
    let n = ({ index: e, text: i, prefersReducedMotion: r }) => {
        let [a, ...n] = i.split(' '),
          o = n.join(' ');
        return (0, t.jsx)(s.motion.article, {
          tabIndex: 0,
          'aria-label': i,
          initial: r ? 'visible' : 'hidden',
          whileInView: 'visible',
          viewport: { once: !0, amount: 0.2 },
          variants: {
            hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.5,
                delay: 0.05 * e,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          },
          className:
            'group flex h-full min-h-[160px] flex-col gap-4 rounded-[14px] bg-[#150d2f] px-5 py-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)] outline-none ring-1 ring-white/5 transition hover:-translate-y-1 hover:bg-[#1a1138] focus-visible:ring-2 focus-visible:ring-[#4fe6ff]',
          children: (0, t.jsxs)('div', {
            className: 'flex items-center gap-3',
            children: [
              (0, t.jsx)('span', {
                className:
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bluePrimary text-white transition-all duration-300 group-hover:bg-purpleDetails group-hover:shadow-[0_0_24px_rgba(135,5,242,0.6)] group-hover:scale-110',
                children: (0, t.jsx)(l.ArrowUpRight, {
                  size: 18,
                  strokeWidth: 2.5,
                }),
              }),
              (0, t.jsxs)('p', {
                className:
                  'text-[1.05rem] font-semibold leading-snug text-white text-left',
                children: [
                  (0, t.jsx)('span', {
                    className: 'text-bluePrimary',
                    children: a,
                  }),
                  ' ',
                  o,
                ],
              }),
            ],
          }),
        });
      },
      o = ({ index: e, text: i, prefersReducedMotion: r }) => {
        let [a, ...n] = i.split(' '),
          o = n.join(' ');
        return (0, t.jsxs)(s.motion.article, {
          tabIndex: 0,
          'aria-label': i,
          initial: r ? 'visible' : 'hidden',
          whileInView: 'visible',
          viewport: { once: !0, amount: 0.25 },
          variants: {
            hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.55,
                delay: 0.08 * e,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          },
          className:
            'group flex w-full items-center gap-4 rounded-[12px] bg-[#150d2f] px-4 py-4 text-left shadow-[0_16px_40px_-28px_rgba(0,0,0,0.6)] outline-none ring-1 ring-white/5 transition hover:-translate-y-0.5 hover:bg-[#1a1138] focus-visible:ring-2 focus-visible:ring-[#4fe6ff] min-h-[76px]',
          children: [
            (0, t.jsx)('span', {
              className:
                'flex h-9 w-9 items-center justify-center rounded-full bg-[#204fff] text-white',
              children: (0, t.jsx)(l.ArrowUpRight, { size: 16 }),
            }),
            (0, t.jsxs)('p', {
              className: 'text-base font-semibold leading-snug text-white',
              children: [
                (0, t.jsx)('span', {
                  className: 'text-[#2f57ff]',
                  children: a,
                }),
                ' ',
                o,
              ],
            }),
          ],
        });
      };
    function c() {
      let e = !!(0, r.useReducedMotion)(),
        l = a.ABOUT_CONTENT.whatIDo.cards,
        c = a.ABOUT_CONTENT.whatIDo.marquee;
      return (0, t.jsxs)('section', {
        className: 'relative w-full bg-[#040013] py-16 text-white lg:py-24',
        children: [
          (0, t.jsxs)('div', {
            className: 'mx-auto max-w-[1300px] px-6 lg:px-8',
            children: [
              (0, t.jsxs)('header', {
                className: 'mb-10 text-center lg:mb-14',
                children: [
                  (0, t.jsxs)(s.motion.h2, {
                    initial: e ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: !0 },
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    className:
                      'font-display text-[2.1rem] font-black leading-tight tracking-tight text-white sm:text-[2.6rem] lg:text-[3.4rem]',
                    children: [
                      'Do ',
                      (0, t.jsx)('span', {
                        className: 'text-[#2f57ff]',
                        children: 'insight',
                      }),
                      ' ao',
                      ' ',
                      (0, t.jsx)('span', {
                        className: 'text-[#2f57ff]',
                        children: 'impacto',
                      }),
                      '.',
                    ],
                  }),
                  (0, t.jsx)(s.motion.p, {
                    initial: e ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: !0 },
                    transition: { duration: 0.5, delay: 0.1 },
                    className:
                      'mt-4 text-base font-semibold text-[#cfd0d7] sm:text-lg lg:mt-5 lg:text-xl',
                    children: 'Mesmo quando você não percebe.',
                  }),
                ],
              }),
              (0, t.jsx)('div', {
                className: 'hidden lg:grid lg:grid-cols-7 lg:gap-4',
                children: l.map((i, s) =>
                  (0, t.jsx)(
                    n,
                    { index: s, text: i.text, prefersReducedMotion: e },
                    i.id
                  )
                ),
              }),
              (0, t.jsx)('div', {
                className: 'lg:hidden flex flex-col gap-3',
                children: l.map((i, s) =>
                  (0, t.jsx)(
                    o,
                    { index: s, text: i.text, prefersReducedMotion: e },
                    i.id
                  )
                ),
              }),
            ],
          }),
          (0, t.jsxs)('div', {
            className:
              'jsx-8bd1765e7b5d0f83 relative mt-12 overflow-hidden bg-[#1c2bff] py-3',
            children: [
              (0, t.jsx)('div', {
                className:
                  'jsx-8bd1765e7b5d0f83 marquee flex whitespace-nowrap text-sm font-semibold uppercase tracking-[0.25em] text-white',
                children: [...c, ...c].map((e, i) =>
                  (0, t.jsxs)(
                    'span',
                    {
                      className: 'jsx-8bd1765e7b5d0f83 mx-4',
                      children: [e, ' •'],
                    },
                    `${e}-${i}`
                  )
                ),
              }),
              (0, t.jsx)(i.default, {
                id: '8bd1765e7b5d0f83',
                children:
                  '.marquee.jsx-8bd1765e7b5d0f83{animation:18s linear infinite marquee}@keyframes marquee{0%{transform:translate(0)}to{transform:translate(-50%)}}',
              }),
            ],
          }),
        ],
      });
    }
    e.s(['AboutWhatIDo', () => c], 15212);
  },
  29612,
  (e) => {
    'use strict';
    var t = e.i(96148),
      i = e.i(84833),
      s = e.i(73019),
      r = e.i(14689),
      a = e.i(66537),
      l = e.i(35315),
      n = e.i(21063),
      o = e.i(54768),
      c = e.i(43683),
      d = e.i(89764),
      u = e.i(89393);
    function m() {
      let e = (0, i.useRef)(null),
        m = (0, n.useReducedMotion)(),
        h = (0, o.useMediaQuery)('(max-width: 768px)'),
        { scrollYProgress: p } = (0, r.useScroll)({
          target: e,
          offset: ['start end', 'end start'],
        }),
        f = (0, a.useSpring)(p, u.motionSprings.ghost),
        x = m ? p : f,
        g = (0, l.useTransform)(x, [0, 1], m ? [0, 0] : [16, -16]),
        v = (0, l.useTransform)(x, [0, 1], m ? ['0%', '0%'] : ['-10%', '10%']);
      return (0, t.jsxs)('section', {
        ref: e,
        className:
          'relative w-full bg-background flex flex-col min-h-screen lg:min-h-[120vh]',
        'aria-label': 'Como Eu Trabalho',
        children: [
          (0, t.jsxs)('div', {
            className:
              'absolute top-0 left-0 w-full h-full z-0 overflow-hidden',
            children: [
              (0, t.jsx)(s.motion.div, {
                style: { y: h ? 0 : v },
                className: 'w-full h-full lg:h-[120%]',
                children: (0, t.jsx)(
                  'video',
                  {
                    src:
                      (h
                        ? c.ABOUT_CONTENT.method.videos.mobile
                        : c.ABOUT_CONTENT.method.videos.desktop) || '',
                    autoPlay: !0,
                    loop: !0,
                    muted: !0,
                    playsInline: !0,
                    className: `w-full h-full ${h ? 'object-cover object-center opacity-55' : 'object-cover object-right opacity-55'}`,
                    'aria-hidden': 'true',
                  },
                  h ? 'mobile' : 'desktop'
                ),
              }),
              (0, t.jsx)('div', {
                className:
                  'absolute inset-0 z-1 bg-linear-to-b from-background via-background/40 to-background md:bg-linear-to-r md:from-background md:via-background/60 md:to-transparent',
                'aria-hidden': 'true',
              }),
            ],
          }),
          (0, t.jsx)(d.Container, {
            children: (0, t.jsx)('div', {
              className: 'relative z-10 w-full h-full',
              children: (0, t.jsxs)('div', {
                className:
                  'flex flex-col lg:grid lg:grid-cols-12 w-full h-full pt-[50vh] md:pt-[100px]',
                children: [
                  (0, t.jsx)('div', {
                    className:
                      'w-full lg:col-span-8 flex flex-col justify-center px-0 lg:pr-20 py-20 lg:py-32',
                    children: (0, t.jsxs)(s.motion.div, {
                      style: { y: g },
                      className:
                        'w-full flex flex-col items-center lg:items-start',
                      children: [
                        (0, t.jsx)(s.motion.div, {
                          variants: u.motionTokens.fadeGhost,
                          initial: m ? 'visible' : 'hidden',
                          whileInView: 'visible',
                          viewport: { once: !0, margin: '-20%' },
                          className: 'mb-8 lg:mb-12 text-center lg:text-left',
                          children: (0, t.jsxs)('h2', {
                            className:
                              'font-display leading-[1.08] tracking-[-0.02em] text-[clamp(32px,5vw,64px)] font-bold',
                            children: [
                              (0, t.jsx)('div', {
                                className: 'text-primary leading-tight',
                                children: 'Criatividade com método.',
                              }),
                              (0, t.jsx)('div', {
                                className: 'text-white leading-tight',
                                children: 'Impacto sem ruído.',
                              }),
                            ],
                          }),
                        }),
                        (0, t.jsx)(s.motion.div, {
                          variants: u.motionTokens.fadeGhost,
                          initial: m ? 'visible' : 'hidden',
                          whileInView: 'visible',
                          viewport: { once: !0, margin: '-20%' },
                          className:
                            'text-white leading-[2.4] space-y-1 mb-12 lg:mb-16 text-center lg:text-left text-[16px] md:text-[18px] lg:text-[20px] font-medium opacity-90 max-w-full lg:max-w-[550px]',
                          children: c.ABOUT_CONTENT.method.intro.map((e, i) =>
                            (0, t.jsx)('p', { children: e }, i)
                          ),
                        }),
                        (0, t.jsx)(s.motion.div, {
                          variants: {
                            visible: { transition: { staggerChildren: 0.1 } },
                          },
                          initial: m ? 'visible' : 'hidden',
                          whileInView: 'visible',
                          viewport: { once: !0, margin: '-10%' },
                          className:
                            'flex flex-col w-full border-t border-primary/40 px-4 md:px-0',
                          children: c.ABOUT_CONTENT.method.steps.map((e) =>
                            (0, t.jsxs)(
                              s.motion.div,
                              {
                                variants: u.motionTokens.riseSoft,
                                className:
                                  ' group flex items-center gap-4 lg:gap-6  py-5 lg:py-6  border-b border-primary/40 transition-all duration-300 hover:bg-primary/5 ',
                                children: [
                                  (0, t.jsx)('span', {
                                    className:
                                      'text-primary font-bold text-[16px] lg:text-[20px] tabular-nums',
                                    children: e.id,
                                  }),
                                  (0, t.jsx)('p', {
                                    className:
                                      'text-white group-hover:text-primary transition-colors font-medium text-left text-[14px] md:text-[16px] lg:text-[20px] leading-[1.4]',
                                    children: e.text,
                                  }),
                                ],
                              },
                              e.id
                            )
                          ),
                        }),
                      ],
                    }),
                  }),
                  (0, t.jsx)('div', {
                    className: 'hidden lg:block lg:col-span-4',
                  }),
                ],
              }),
            }),
          }),
        ],
      });
    }
    e.s(['default', () => m]);
  },
  1590,
  (e) => {
    'use strict';
    var t = e.i(96148),
      i = e.i(84833),
      s = e.i(73019),
      r = e.i(14689),
      a = e.i(35315),
      l = e.i(37076);
    let n = ({ text: e, bgColor: n, isFirst: o = !1 }) => {
        let c = (0, i.useRef)(null),
          { scrollYProgress: d } = (0, r.useScroll)({
            target: c,
            offset: ['start end', 'end start'],
          }),
          u = o ? [0.2, 0.4] : [0.22, 0.45],
          m = o ? [0.9, 1] : [0.8, 0.95],
          h = (0, l.cubicBezier)(0.22, 1, 0.36, 1),
          p = (0, a.useTransform)(d, [u[0], u[1], m[0], m[1]], [0, 1, 1, 0]),
          f = (0, a.useTransform)(d, [0.7, 0.95], ['0vh', '-100vh']),
          x = e.split('\n');
        return (0, t.jsx)('section', {
          ref: c,
          className: `relative w-full h-screen flex justify-start overflow-hidden transition-colors duration-500 ease-linear ${o ? 'items-center pt-0' : 'items-start pt-[20vh] md:pt-[20vh] lg:pt-[15vh]'} ${n}`,
          children: (0, t.jsx)('div', {
            className: 'std-grid max-w-none',
            children: (0, t.jsx)(s.motion.div, {
              style: { y: f, opacity: p },
              className: 'w-full flex flex-col justify-start z-10',
              children: x.map((e, i) => {
                let r = (0, a.useTransform)(
                  d,
                  [u[0] + 0.02 * i, u[1] + 0.02 * i],
                  ['-100%', '0%'],
                  { ease: h }
                );
                return (0, t.jsx)(
                  'div',
                  {
                    className: 'overflow-visible mb-1 md:mb-2 w-full',
                    children: (0, t.jsx)(s.motion.span, {
                      style: { x: r },
                      className:
                        'block text-[#4fe6ff] font-h2 text-4xl md:text-6xl lg:text-[5.5vw] xl:text-[6.5vw] leading-none tracking-[-0.04em] text-left whitespace-pre-line select-none font-black italic max-w-fit pr-[0.15em] py-2',
                      children: e,
                    }),
                  },
                  i
                );
              }),
            }),
          }),
        });
      },
      o = ({ bgColor: e }) => {
        let r = (0, i.useRef)(null);
        return (0, t.jsx)('section', {
          ref: r,
          className: `w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 ${e}`,
          children: (0, t.jsxs)(s.motion.div, {
            className:
              'flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]',
            initial: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
            whileInView: { opacity: 1, scale: 1, filter: 'blur(0px)' },
            viewport: { once: !1 },
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            children: [
              (0, t.jsx)('div', {
                className:
                  'text-[16vw] md:text-[14rem] tracking-tighter uppercase font-black',
                children: 'ISSO É',
              }),
              (0, t.jsx)('div', {
                className:
                  'text-[30vw] md:text-[25rem] font-black tracking-tighter uppercase',
                children: 'GHOST',
              }),
              (0, t.jsx)('div', {
                className:
                  'text-[24vw] md:text-[19rem] tracking-tighter uppercase font-black',
                children: 'DESIGN',
              }),
            ],
          }),
        });
      },
      c = ({ opacity: e, progress: i }) => {
        let r = (0, l.cubicBezier)(0.22, 1, 0.36, 1),
          n = (0, a.useTransform)(i, [0.05, 0.15], [30, 0], { ease: r }),
          o = (0, a.useTransform)(i, [0.07, 0.17], [30, 0], { ease: r }),
          c = (0, a.useTransform)(i, [0.09, 0.19], [30, 0], { ease: r }),
          d = (0, a.useTransform)(i, [0.11, 0.21], [30, 0], { ease: r }),
          u = (0, a.useTransform)(i, [0.15, 0.25], [20, 0], { ease: r }),
          m = (0, a.useTransform)(i, [0.15, 0.25], [0, 0.8], { ease: r });
        return (0, t.jsx)(s.motion.header, {
          style: { opacity: e },
          className:
            'fixed inset-0 z-100 flex items-center pointer-events-none',
          children: (0, t.jsx)('div', {
            className: 'std-grid w-full flex justify-end',
            children: (0, t.jsxs)('div', {
              className:
                'flex flex-col items-end text-right w-full max-w-[320px] md:max-w-[480px] lg:max-w-[700px]',
              children: [
                (0, t.jsxs)('h1', {
                  className:
                    'text-white text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-display leading-[1.1] tracking-tighter mb-6 uppercase font-black',
                  children: [
                    (0, t.jsx)('div', {
                      className: 'overflow-hidden',
                      children: (0, t.jsx)(s.motion.span, {
                        style: { y: n },
                        className: 'block',
                        children: 'Acredito no',
                      }),
                    }),
                    (0, t.jsx)('div', {
                      className: 'overflow-hidden',
                      children: (0, t.jsx)(s.motion.span, {
                        style: { y: o },
                        className: 'block',
                        children: 'design que',
                      }),
                    }),
                    (0, t.jsx)('div', {
                      className: 'overflow-hidden',
                      children: (0, t.jsx)(s.motion.span, {
                        style: { y: c },
                        className: 'block',
                        children: 'muda o dia',
                      }),
                    }),
                    (0, t.jsx)('div', {
                      className: 'overflow-hidden',
                      children: (0, t.jsx)(s.motion.span, {
                        style: { y: d },
                        className: 'block',
                        children: 'de alguém.',
                      }),
                    }),
                  ],
                }),
                (0, t.jsxs)(s.motion.h2, {
                  style: { y: u, opacity: m },
                  className:
                    'text-white text-xs md:text-xl lg:text-4xl font-h2 leading-none tracking-normal font-bold',
                  children: [
                    'Não pelo choque,',
                    (0, t.jsx)('br', {}),
                    'mas pela conexão.',
                  ],
                }),
              ],
            }),
          }),
        });
      },
      d = [
        'Um vídeo\nque respira.',
        'Uma marca\n que se\n reconhece.',
        'Um detalhe\n que fica.',
        'Crio para\n gerar\n presença.',
        'Mesmo\n quando\n ninguém\npercebe\n o esforço.',
      ],
      u = [
        'bg-bluePrimary',
        'bg-purpleDetails',
        'bg-pinkDetails',
        'bg-bluePrimary',
        'bg-purpleDetails',
      ],
      m = () => {
        let e = i.default.useRef(null),
          { scrollYProgress: s } = (0, r.useScroll)({
            target: e,
            offset: ['start end', 'end end'],
          }),
          m = (0, l.cubicBezier)(0.22, 1, 0.36, 1),
          h = (0, a.useTransform)(s, [0.05, 0.12, 0.85, 0.95], [0, 1, 1, 0], {
            ease: m,
          });
        return (0, t.jsxs)('section', {
          ref: e,
          className: `relative w-full overflow-hidden ${u[0]}`,
          children: [
            (0, t.jsx)(c, { opacity: h, progress: s }),
            d.map((e, i) =>
              (0, t.jsx)(n, { text: e, bgColor: u[i], isFirst: 0 === i }, i)
            ),
            (0, t.jsx)(o, { bgColor: 'bg-bluePrimary' }),
          ],
        });
      };
    e.s(['AboutBeliefs', 0, m, 'default', 0, m], 1590);
  },
  52824,
  (e) => {
    'use strict';
    var t = e.i(96148),
      i = e.i(73019),
      s = e.i(86825),
      r = e.i(68164),
      a = e.i(43683),
      l = e.i(89393);
    function n() {
      let e = (0, s.useReducedMotion)();
      return (0, t.jsx)('section', {
        className: 'std-grid bg-background py-20 md:py-32',
        'aria-label': 'Fechamento do Manifesto',
        children: (0, t.jsxs)(i.motion.div, {
          variants: l.motionTokens.fadeGhost,
          initial: e ? 'visible' : 'hidden',
          whileInView: 'visible',
          viewport: { once: !0, margin: '-80px' },
          className: 'w-full flex-col items-center text-center',
          children: [
            (0, t.jsxs)('div', {
              className: 'w-full',
              children: [
                (0, t.jsx)('div', {
                  className: 'mb-10 h-px w-full bg-blueAccent/30',
                }),
                (0, t.jsxs)('h2', {
                  className:
                    'type-h1 font-semibold leading-tight text-white md:leading-[1.2]',
                  children: [
                    'Hoje sou',
                    ' ',
                    (0, t.jsx)('span', {
                      className: 'text-bluePrimary',
                      children: 'Diretor de Criação',
                    }),
                    ',',
                    (0, t.jsx)('br', {}),
                    'com mais de',
                    ' ',
                    (0, t.jsx)('span', {
                      className: 'text-bluePrimary',
                      children: '10 anos de estrada.',
                    }),
                  ],
                }),
                (0, t.jsx)('div', {
                  className: 'mt-10 h-px w-full bg-blueAccent/30',
                }),
              ],
            }),
            (0, t.jsxs)('div', {
              className: 'mt-16 md:mt-20 flex flex-col items-center',
              children: [
                (0, t.jsxs)('p', {
                  className:
                    'type-h2 text-text opacity-90 max-w-200 leading-snug mx-auto text-center',
                  children: [
                    'Já liderei marcas, agências, eventos e',
                    ' ',
                    (0, t.jsx)('span', {
                      className: 'text-bluePrimary',
                      children: 'criei experiências',
                    }),
                    ' para todos os canais.',
                  ],
                }),
                (0, t.jsxs)('div', {
                  className:
                    'mt-12 w-full overflow-hidden rounded-xl shadow-2xl md:mt-11',
                  children: [
                    (0, t.jsx)('video', {
                      className: 'hidden md:block w-full h-auto',
                      src: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/VIDEO-SKILLS-FINAL_compressed.mp4',
                      autoPlay: !0,
                      loop: !0,
                      muted: !0,
                      playsInline: !0,
                      preload: 'auto',
                      'aria-label': 'Demonstração visual de experiências',
                    }),
                    (0, t.jsx)('video', {
                      className: 'md:hidden w-full h-auto',
                      src: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/VIDEO-SKILLS-MOBILE-FINAL.mp4',
                      autoPlay: !0,
                      loop: !0,
                      muted: !0,
                      playsInline: !0,
                      preload: 'auto',
                      'aria-label': 'Demonstração visual de experiências',
                    }),
                  ],
                }),
              ],
            }),
            (0, t.jsxs)('div', {
              className: 'mt-16 md:mt-20 flex flex-col items-center',
              children: [
                (0, t.jsxs)('p', {
                  className: 'type-h2 text-text opacity-90 leading-snug',
                  children: [
                    'Agora, quero criar algo que permaneça —',
                    ' ',
                    (0, t.jsx)('span', {
                      className: 'text-bluePrimary',
                      children: 'com você.',
                    }),
                  ],
                }),
                (0, t.jsx)('div', {
                  className:
                    'mt-12 flex flex-row flex-wrap items-center justify-center gap-6 md:mt-16 md:gap-8',
                  children: a.ABOUT_CONTENT.closing.ctas.map((e, i) =>
                    (0, t.jsx)(
                      r.default,
                      {
                        href: e.href,
                        text: e.label,
                        className: 'relative min-w-50',
                      },
                      i
                    )
                  ),
                }),
              ],
            }),
          ],
        }),
      });
    }
    e.s(['AboutClosing', () => n]);
  },
]);

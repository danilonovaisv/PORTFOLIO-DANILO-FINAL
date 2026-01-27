(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  78191,
  (e) => {
    'use strict';
    e.i(39507);
    var t = e.i(91047),
      i = e.i(943),
      s = e.i(65418),
      a = e.i(29550),
      l = e.i(40023),
      r = e.i(69857),
      n = e.i(82075),
      o = i,
      c = e.i(50798);
    function d(e, t) {
      if ('function' == typeof e) return e(t);
      null != e && (e.current = t);
    }
    class m extends o.Component {
      getSnapshotBeforeUpdate(e) {
        let t = this.props.childRef.current;
        if (t && e.isPresent && !this.props.isPresent) {
          let e = t.offsetParent,
            i = ((0, n.isHTMLElement)(e) && e.offsetWidth) || 0,
            s = ((0, n.isHTMLElement)(e) && e.offsetHeight) || 0,
            a = this.props.sizeRef.current;
          ((a.height = t.offsetHeight || 0),
            (a.width = t.offsetWidth || 0),
            (a.top = t.offsetTop),
            (a.left = t.offsetLeft),
            (a.right = i - a.width - a.left),
            (a.bottom = s - a.height - a.top));
        }
        return null;
      }
      componentDidUpdate() {}
      render() {
        return this.props.children;
      }
    }
    function u({ children: e, isPresent: s, anchorX: a, anchorY: l, root: r }) {
      let n = (0, o.useId)(),
        u = (0, o.useRef)(null),
        x = (0, o.useRef)({
          width: 0,
          height: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }),
        { nonce: h } = (0, o.useContext)(c.MotionConfigContext),
        p = (function (...e) {
          return i.useCallback(
            (function (...e) {
              return (t) => {
                let i = !1,
                  s = e.map((e) => {
                    let s = d(e, t);
                    return (i || 'function' != typeof s || (i = !0), s);
                  });
                if (i)
                  return () => {
                    for (let t = 0; t < s.length; t++) {
                      let i = s[t];
                      'function' == typeof i ? i() : d(e[t], null);
                    }
                  };
              };
            })(...e),
            e
          );
        })(u, e.props?.ref ?? e?.ref);
      return (
        (0, o.useInsertionEffect)(() => {
          let {
            width: e,
            height: t,
            top: i,
            left: o,
            right: c,
            bottom: d,
          } = x.current;
          if (s || !u.current || !e || !t) return;
          let m = 'left' === a ? `left: ${o}` : `right: ${c}`,
            p = 'bottom' === l ? `bottom: ${d}` : `top: ${i}`;
          u.current.dataset.motionPopId = n;
          let f = document.createElement('style');
          h && (f.nonce = h);
          let g = r ?? document.head;
          return (
            g.appendChild(f),
            f.sheet &&
              f.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${m}px !important;
            ${p}px !important;
          }
        `),
            () => {
              g.contains(f) && g.removeChild(f);
            }
          );
        }, [s]),
        (0, t.jsx)(m, {
          isPresent: s,
          childRef: u,
          sizeRef: x,
          children: o.cloneElement(e, { ref: p }),
        })
      );
    }
    let x = ({
      children: e,
      initial: s,
      isPresent: l,
      onExitComplete: n,
      custom: o,
      presenceAffectsLayout: c,
      mode: d,
      anchorX: m,
      anchorY: x,
      root: p,
    }) => {
      let f = (0, a.useConstant)(h),
        g = (0, i.useId)(),
        b = !0,
        y = (0, i.useMemo)(
          () => (
            (b = !1),
            {
              id: g,
              initial: s,
              isPresent: l,
              custom: o,
              onExitComplete: (e) => {
                for (let t of (f.set(e, !0), f.values())) if (!t) return;
                n && n();
              },
              register: (e) => (f.set(e, !1), () => f.delete(e)),
            }
          ),
          [l, f, n]
        );
      return (
        c && b && (y = { ...y }),
        (0, i.useMemo)(() => {
          f.forEach((e, t) => f.set(t, !1));
        }, [l]),
        i.useEffect(() => {
          l || f.size || !n || n();
        }, [l]),
        'popLayout' === d &&
          (e = (0, t.jsx)(u, {
            isPresent: l,
            anchorX: m,
            anchorY: x,
            root: p,
            children: e,
          })),
        (0, t.jsx)(r.PresenceContext.Provider, { value: y, children: e })
      );
    };
    function h() {
      return new Map();
    }
    var p = e.i(4036);
    let f = (e) => e.key || '';
    function g(e) {
      let t = [];
      return (
        i.Children.forEach(e, (e) => {
          (0, i.isValidElement)(e) && t.push(e);
        }),
        t
      );
    }
    let b = ({
      children: e,
      custom: r,
      initial: n = !0,
      onExitComplete: o,
      presenceAffectsLayout: c = !0,
      mode: d = 'sync',
      propagate: m = !1,
      anchorX: u = 'left',
      anchorY: h = 'top',
      root: b,
    }) => {
      let [y, v] = (0, p.usePresence)(m),
        j = (0, i.useMemo)(() => g(e), [e]),
        w = m && !y ? [] : j.map(f),
        N = (0, i.useRef)(!0),
        k = (0, i.useRef)(j),
        A = (0, a.useConstant)(() => new Map()),
        E = (0, i.useRef)(new Set()),
        [C, T] = (0, i.useState)(j),
        [R, S] = (0, i.useState)(j);
      (0, l.useIsomorphicLayoutEffect)(() => {
        ((N.current = !1), (k.current = j));
        for (let e = 0; e < R.length; e++) {
          let t = f(R[e]);
          w.includes(t)
            ? (A.delete(t), E.current.delete(t))
            : !0 !== A.get(t) && A.set(t, !1);
        }
      }, [R, w.length, w.join('-')]);
      let P = [];
      if (j !== C) {
        let e = [...j];
        for (let t = 0; t < R.length; t++) {
          let i = R[t],
            s = f(i);
          w.includes(s) || (e.splice(t, 0, i), P.push(i));
        }
        return ('wait' === d && P.length && (e = P), S(g(e)), T(j), null);
      }
      let { forceRender: M } = (0, i.useContext)(s.LayoutGroupContext);
      return (0, t.jsx)(t.Fragment, {
        children: R.map((e) => {
          let i = f(e),
            s = (!m || !!y) && (j === R || w.includes(i));
          return (0, t.jsx)(
            x,
            {
              isPresent: s,
              initial: (!N.current || !!n) && void 0,
              custom: r,
              presenceAffectsLayout: c,
              mode: d,
              root: b,
              onExitComplete: s
                ? void 0
                : () => {
                    if (E.current.has(i) || (E.current.add(i), !A.has(i)))
                      return;
                    A.set(i, !0);
                    let e = !0;
                    (A.forEach((t) => {
                      t || (e = !1);
                    }),
                      e && (M?.(), S(k.current), m && v?.(), o && o()));
                  },
              anchorX: u,
              anchorY: h,
              children: e,
            },
            i
          );
        }),
      });
    };
    e.s(['AnimatePresence', () => b], 78191);
  },
  37963,
  (e) => {
    'use strict';
    var t = e.i(40022);
    let i =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    function s(e) {
      if (!e) return i;
      let s = e.trim();
      if (!s) return i;
      if (/^https?:\/\//.test(s)) return s;
      let a = s
        .replace(/^https?:\/\/[^/]+\/storage\/v1\/object\/public\//, '')
        .replace(/^\/?storage\/v1\/object\/public\//, '')
        .replace(/^\/+/, '');
      return a ? `${t.SUPABASE_STORAGE_URL}/${a}` : i;
    }
    function a(e) {
      let t = e.currentTarget;
      t.dataset.fallbackApplied ||
        ((t.dataset.fallbackApplied = 'true'), (t.src = i));
    }
    e.s([
      'applyImageFallback',
      () => a,
      'getAssetUrl',
      () => s,
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
  69013,
  (e) => {
    'use strict';
    let t = (0, e.i(3645).default)('tag', [
      [
        'path',
        {
          d: 'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z',
          key: 'vktsd0',
        },
      ],
      [
        'circle',
        { cx: '7.5', cy: '7.5', r: '.5', fill: 'currentColor', key: 'kqv944' },
      ],
    ]);
    e.s(['Tag', () => t], 69013);
  },
  60586,
  60253,
  49316,
  19230,
  20631,
  (e) => {
    'use strict';
    var t = e.i(91047),
      i = e.i(943),
      s = e.i(68020),
      a = e.i(62897),
      l = e.i(19654),
      r = e.i(28046),
      n = e.i(90541);
    e.s(
      [
        'ProjectCard',
        0,
        ({
          project: e,
          index: o,
          onClick: c,
          className: d = '',
          priority: m = !1,
        }) => {
          let u = (0, n.useReducedMotion)(),
            x = (0, i.useRef)(null),
            { scrollYProgress: h } = (0, l.useScroll)({
              target: x,
              offset: ['start end', 'end start'],
            }),
            p = (0, r.useTransform)(h, [0, 1], [-40, 40]);
          return (0, t.jsxs)(a.motion.div, {
            ref: x,
            onClick: () => c?.(e),
            className: (function (...e) {
              return e.filter(Boolean).join(' ');
            })(
              'parallax-card group relative overflow-hidden border border-white/10 bg-white/5 cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
              'min-h-[320px] md:min-h-[420px]',
              d
            ),
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0, margin: '-10% 0px -10% 0px' },
            transition: {
              duration: 0.6,
              delay: Math.min(0.18, 0.03 * o),
              ease: [0.22, 1, 0.36, 1],
            },
            children: [
              (0, t.jsxs)('div', {
                className: 'absolute inset-0',
                children: [
                  e.image
                    ? (0, t.jsx)(a.motion.div, {
                        className: 'absolute inset-0',
                        style: u ? void 0 : { y: p },
                        children: (0, t.jsx)('div', {
                          className: 'absolute inset-x-0 top-0 h-[135%]',
                          children: (0, t.jsx)(s.default, {
                            src: e.image,
                            alt: e.title,
                            fill: !0,
                            priority: m,
                            unoptimized: !0,
                            sizes:
                              '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
                            className:
                              'object-cover transition duration-700 group-hover:scale-[1.04]',
                          }),
                        }),
                      })
                    : (0, t.jsx)('div', {
                        className: 'absolute inset-0 bg-white/10',
                      }),
                  (0, t.jsx)('div', {
                    className:
                      'absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-black/0',
                  }),
                ],
              }),
              (0, t.jsx)('div', {
                className:
                  'relative flex h-full flex-col justify-end p-4 sm:p-5',
                children: (0, t.jsxs)('div', {
                  className: 'flex items-center justify-between gap-4',
                  children: [
                    (0, t.jsxs)('div', {
                      children: [
                        e.tags?.[0] &&
                          (0, t.jsx)('span', {
                            className:
                              'inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80',
                            children: e.tags[0],
                          }),
                        (0, t.jsx)('h3', {
                          className:
                            'mt-2 text-lg font-semibold leading-tight text-white sm:text-xl',
                          children: e.title,
                        }),
                        (0, t.jsx)('p', {
                          className: 'mt-1 text-sm text-white/70',
                          children: e.subtitle || e.client,
                        }),
                      ],
                    }),
                    (0, t.jsx)('div', {
                      className:
                        'flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/90 transition group-hover:bg-white/10 shrink-0',
                      children: (0, t.jsx)('span', {
                        'aria-hidden': !0,
                        children: '↗',
                      }),
                    }),
                  ],
                }),
              }),
            ],
          });
        },
      ],
      60586
    );
    var o = e.i(3645);
    let c = (0, o.default)('x', [
      ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
      ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
    ]);
    function d(e) {
      let t = (0, i.useRef)(0),
        s = (0, i.useRef)(!1);
      (0, i.useEffect)(() => {
        let i = document.documentElement,
          a = document.body;
        if (e) {
          ((t.current = window.scrollY), (s.current = !0));
          let e = window.innerWidth - i.clientWidth;
          ((a.style.overflow = 'hidden'),
            (a.style.position = 'fixed'),
            (a.style.top = `-${t.current}px`),
            (a.style.left = '0'),
            (a.style.right = '0'),
            (a.style.paddingRight = `${e}px`),
            (i.style.overflow = 'hidden'));
        } else
          ((s.current = !1),
            (a.style.overflow = ''),
            (a.style.position = ''),
            (a.style.top = ''),
            (a.style.left = ''),
            (a.style.right = ''),
            (a.style.paddingRight = ''),
            (i.style.overflow = ''),
            window.scrollTo(0, t.current));
        return () => {
          s.current &&
            ((a.style.overflow = ''),
            (a.style.position = ''),
            (a.style.top = ''),
            (a.style.left = ''),
            (a.style.right = ''),
            (a.style.paddingRight = ''),
            (i.style.overflow = ''),
            window.scrollTo(0, t.current));
        };
      }, [e]);
    }
    (e.s(['X', () => c], 60253), e.s(['useBodyLock', () => d], 49316));
    var m = e.i(91424);
    let u = (0, o.default)('calendar', [
        ['path', { d: 'M8 2v4', key: '1cmpym' }],
        ['path', { d: 'M16 2v4', key: '4m81vk' }],
        [
          'rect',
          { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' },
        ],
        ['path', { d: 'M3 10h18', key: '8toen8' }],
      ]),
      x = (0, o.default)('building-2', [
        ['path', { d: 'M10 12h4', key: 'a56b0p' }],
        ['path', { d: 'M10 8h4', key: '1sr2af' }],
        ['path', { d: 'M14 21v-3a2 2 0 0 0-4 0v3', key: '1rgiei' }],
        [
          'path',
          {
            d: 'M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2',
            key: 'secmi2',
          },
        ],
        [
          'path',
          { d: 'M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16', key: '16ra0t' },
        ],
      ]),
      h = [0.22, 1, 0.36, 1];
    var p = e.i(37963);
    let f = {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.5, ease: h },
    };
    e.s(
      [
        'default',
        0,
        ({ project: e }) =>
          (0, t.jsxs)('div', {
            className: 'flex flex-col gap-8',
            children: [
              (0, t.jsxs)(a.motion.div, {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.52, duration: 0.24, ease: 'easeOut' },
                className:
                  'card-shell relative w-full rounded-2xl overflow-hidden bg-white/5',
                children: [
                  (0, p.isVideo)(e.image)
                    ? (0, t.jsx)('video', {
                        src: e.image,
                        autoPlay: !0,
                        muted: !0,
                        loop: !0,
                        playsInline: !0,
                        className:
                          'absolute inset-0 w-full h-full object-cover',
                      })
                    : (0, t.jsx)(s.default, {
                        src: e.image,
                        alt: e.title,
                        fill: !0,
                        className: 'object-cover',
                        sizes: '(max-width: 1024px) 100vw, 80vw',
                        priority: !0,
                      }),
                  (0, t.jsx)('div', {
                    className:
                      'absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent',
                  }),
                  (0, t.jsx)('div', {
                    className: 'absolute top-6 left-6',
                    children: (0, t.jsx)('span', {
                      className:
                        'inline-flex items-center rounded-full bg-[#E6EFEF]/60 backdrop-blur-md border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#040013]',
                      children: e.displayCategory,
                    }),
                  }),
                ],
              }),
              (0, t.jsxs)('div', {
                className: 'grid md:grid-cols-[1.5fr,1fr] gap-8 md:gap-12',
                children: [
                  (0, t.jsxs)('div', {
                    className: 'flex flex-col gap-6',
                    children: [
                      (0, t.jsx)(a.motion.h2, {
                        initial: { opacity: 0, y: 6 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.76, duration: 0.2, ease: h },
                        className:
                          'text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight',
                        children: e.title,
                      }),
                      e.subtitle &&
                        (0, t.jsx)(a.motion.p, {
                          variants: f,
                          className: 'text-xl text-blueAccent font-medium',
                          children: e.subtitle,
                        }),
                      e.detail?.description &&
                        (0, t.jsx)(a.motion.p, {
                          variants: f,
                          className:
                            'text-base md:text-lg text-white/70 leading-relaxed',
                          children: e.detail.description,
                        }),
                      e.detail?.highlights &&
                        (0, t.jsx)(a.motion.ul, {
                          variants: f,
                          className: 'flex flex-col gap-3 list-none',
                          children: e.detail.highlights.map((e, i) =>
                            (0, t.jsxs)(
                              a.motion.li,
                              {
                                className:
                                  'flex items-center gap-3 text-sm text-white/80',
                                variants: f,
                                children: [
                                  (0, t.jsx)('span', {
                                    className:
                                      'w-1.5 h-1.5 rounded-full bg-blueAccent',
                                    'aria-hidden': 'true',
                                  }),
                                  e,
                                ],
                              },
                              i
                            )
                          ),
                        }),
                    ],
                  }),
                  (0, t.jsxs)(a.motion.div, {
                    initial: { opacity: 0, y: 4 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.96, duration: 0.16, ease: h },
                    className: 'flex flex-col gap-6',
                    children: [
                      (0, t.jsxs)('div', {
                        className: 'flex flex-col gap-4',
                        children: [
                          (0, t.jsxs)('div', {
                            className:
                              'flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10',
                            children: [
                              (0, t.jsx)(x, {
                                className: 'w-5 h-5 text-blueAccent',
                              }),
                              (0, t.jsxs)('div', {
                                children: [
                                  (0, t.jsx)('span', {
                                    className:
                                      'block text-xs uppercase tracking-wider text-white/50',
                                    children: 'Cliente',
                                  }),
                                  (0, t.jsx)('span', {
                                    className: 'text-sm font-medium text-white',
                                    children: e.client,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsxs)('div', {
                            className:
                              'flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10',
                            children: [
                              (0, t.jsx)(u, {
                                className: 'w-5 h-5 text-blueAccent',
                              }),
                              (0, t.jsxs)('div', {
                                children: [
                                  (0, t.jsx)('span', {
                                    className:
                                      'block text-xs uppercase tracking-wider text-white/50',
                                    children: 'Ano',
                                  }),
                                  (0, t.jsx)('span', {
                                    className: 'text-sm font-medium text-white',
                                    children: e.year,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.tags &&
                        (0, t.jsx)('div', {
                          className: 'flex flex-wrap gap-2',
                          children: e.tags.map((e) =>
                            (0, t.jsx)(
                              'span',
                              {
                                className:
                                  'px-3 py-1.5 rounded-full bg-[#E6EFEF]/60 backdrop-blur-md border border-white/10 text-xs text-[#040013] font-medium',
                                children: e,
                              },
                              e
                            )
                          ),
                        }),
                      e.detail?.externalUrl &&
                        (0, t.jsxs)('a', {
                          href: e.detail.externalUrl,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          className:
                            'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm transition-colors bg-[#0048ff] hover:bg-[#8705f2]',
                          children: [
                            'Ver projeto completo',
                            (0, t.jsx)(m.ArrowUpRight, {
                              className: 'w-4 h-4',
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
              e.detail?.gallery &&
                e.detail.gallery.length > 0 &&
                (0, t.jsxs)(a.motion.div, {
                  variants: f,
                  className: 'mt-8',
                  children: [
                    (0, t.jsx)('h3', {
                      className: 'text-lg font-semibold text-white mb-4',
                      children: 'Galeria',
                    }),
                    (0, t.jsx)('div', {
                      className: 'grid grid-cols-2 md:grid-cols-3 gap-4',
                      children: e.detail.gallery.map((i, l) =>
                        (0, t.jsx)(
                          a.motion.div,
                          {
                            initial: { opacity: 0, y: 8 },
                            animate: { opacity: 1, y: 0 },
                            transition: {
                              delay: 1.12 + 0.08 * l,
                              duration: 0.2,
                              ease: h,
                            },
                            className:
                              'relative aspect-square rounded-xl overflow-hidden bg-white/5',
                            children: (0, p.isVideo)(i)
                              ? (0, t.jsx)('video', {
                                  src: i,
                                  autoPlay: !0,
                                  muted: !0,
                                  loop: !0,
                                  playsInline: !0,
                                  className:
                                    'absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500',
                                })
                              : (0, t.jsx)(s.default, {
                                  src: i,
                                  alt: `${e.title} - Imagem ${l + 1}`,
                                  fill: !0,
                                  className:
                                    'object-cover hover:scale-105 transition-transform duration-500',
                                  sizes: '(max-width: 768px) 50vw, 33vw',
                                }),
                          },
                          l
                        )
                      ),
                    }),
                  ],
                }),
            ],
          }),
      ],
      19230
    );
    var g = e.i(69013),
      b = e.i(21785);
    let y = {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.4, ease: h },
    };
    e.s(
      [
        'default',
        0,
        ({ project: e }) =>
          (0, t.jsxs)('div', {
            className: 'grid md:grid-cols-2 gap-8 md:gap-12',
            children: [
              (0, t.jsxs)(a.motion.div, {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.52, duration: 0.5, ease: h },
                className:
                  'relative aspect-square md:aspect-4/5 rounded-2xl overflow-hidden bg-white/5',
                children: [
                  (0, p.isVideo)(e.image)
                    ? (0, t.jsx)('video', {
                        src: e.image,
                        autoPlay: !0,
                        muted: !0,
                        loop: !0,
                        playsInline: !0,
                        className:
                          'absolute inset-0 w-full h-full object-cover',
                      })
                    : (0, t.jsx)(s.default, {
                        src: e.image,
                        alt: e.title,
                        fill: !0,
                        className: 'object-cover',
                        sizes: '(max-width: 768px) 100vw, 50vw',
                        priority: !0,
                      }),
                  e.accentColor &&
                    (0, t.jsx)(a.motion.div, {
                      className: 'absolute inset-x-0 bottom-0 h-1/3',
                      style: {
                        background: `linear-gradient(to top, ${e.accentColor}40, transparent)`,
                      },
                    }),
                  (0, t.jsx)('div', {
                    className: 'absolute top-4 left-4',
                    children: (0, t.jsx)('span', {
                      className:
                        'inline-flex items-center rounded-full bg-[#E6EFEF]/60 backdrop-blur-md border border-white/10 px-3 py-1 text-xs font-medium text-[#040013]',
                      children: e.displayCategory,
                    }),
                  }),
                ],
              }),
              (0, t.jsxs)('div', {
                className: 'flex flex-col justify-center gap-6',
                children: [
                  (0, t.jsxs)('div', {
                    className: 'flex flex-col gap-2',
                    children: [
                      (0, t.jsxs)(a.motion.span, {
                        variants: y,
                        className:
                          'text-xs uppercase tracking-[0.3em] text-blueAccent',
                        children: ['[', e.category, ']'],
                      }),
                      (0, t.jsx)(a.motion.h2, {
                        initial: { opacity: 0, y: 6 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.76, duration: 0.2, ease: h },
                        className:
                          'text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight',
                        children: e.title,
                      }),
                      e.subtitle &&
                        (0, t.jsx)(a.motion.p, {
                          variants: y,
                          className: 'text-lg text-white/60',
                          children: e.subtitle,
                        }),
                    ],
                  }),
                  e.detail?.description &&
                    (0, t.jsx)(a.motion.p, {
                      variants: y,
                      className: 'text-base text-white/70 leading-relaxed',
                      children: e.detail.description,
                    }),
                  (0, t.jsxs)(a.motion.div, {
                    initial: { opacity: 0, y: 4 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.96, duration: 0.16, ease: h },
                    className:
                      'flex flex-wrap items-center gap-4 text-sm text-white/50',
                    children: [
                      (0, t.jsxs)('span', {
                        className: 'flex items-center gap-2',
                        children: [
                          (0, t.jsx)(x, { className: 'w-4 h-4' }),
                          e.client,
                        ],
                      }),
                      (0, t.jsx)('span', { className: 'w-px h-4 bg-white/20' }),
                      (0, t.jsxs)('span', {
                        className: 'flex items-center gap-2',
                        children: [
                          (0, t.jsx)(u, { className: 'w-4 h-4' }),
                          e.year,
                        ],
                      }),
                      e.tags &&
                        e.tags.length > 0 &&
                        (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsx)('span', {
                              className: 'w-px h-4 bg-white/20',
                            }),
                            (0, t.jsxs)('span', {
                              className: 'flex items-center gap-2',
                              children: [
                                (0, t.jsx)(g.Tag, { className: 'w-4 h-4' }),
                                e.tags.slice(0, 2).join(', '),
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
                  e.detail?.highlights &&
                    (0, t.jsx)('ul', {
                      className: 'flex flex-col gap-2 mt-2',
                      children: (0, t.jsx)(a.motion.div, {
                        variants: y,
                        className: 'contents',
                        children: e.detail.highlights.map((e, i) =>
                          (0, t.jsxs)(
                            'li',
                            {
                              className:
                                'flex items-start gap-3 text-sm text-white/70',
                              children: [
                                (0, t.jsx)('span', {
                                  className:
                                    'mt-1.5 w-1.5 h-1.5 rounded-full bg-blueAccent shrink-0',
                                }),
                                e,
                              ],
                            },
                            i
                          )
                        ),
                      }),
                    }),
                  e.tags &&
                    (0, t.jsx)(a.motion.div, {
                      initial: { opacity: 0, y: 8 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 1.12, duration: 0.2, ease: h },
                      className: 'flex flex-wrap gap-2',
                      children: e.tags.map((e) =>
                        (0, t.jsx)(
                          'span',
                          {
                            className:
                              'px-3 py-1 rounded-full bg-[#E6EFEF]/60 backdrop-blur-md border border-white/10 text-xs text-[#040013] font-medium',
                            children: e,
                          },
                          e
                        )
                      ),
                    }),
                  (0, t.jsx)(a.motion.div, {
                    variants: y,
                    className: 'flex gap-3 mt-4',
                    children:
                      e.detail?.externalUrl &&
                      (0, t.jsx)(b.default, {
                        href: e.detail.externalUrl,
                        text: 'ver projeto',
                        className: 'relative',
                      }),
                  }),
                ],
              }),
            ],
          }),
      ],
      20631
    );
  },
  88048,
  (e) => {
    'use strict';
    var t = e.i(91047),
      i = e.i(943),
      s = e.i(55064),
      a = e.i(60649),
      l = e.i(51395),
      r = e.i(82970),
      n = e.i(21785);
    function o() {
      let e = (0, a.useMediaQuery)('(max-width: 768px)'),
        i = (0, l.useSiteAssetUrl)(
          r.SITE_ASSET_KEYS.heroVideos.portfolioDesktop,
          s.PORTFOLIO_CONTENT.hero.video.desktop ?? void 0
        ),
        o = (0, l.useSiteAssetUrl)(
          r.SITE_ASSET_KEYS.heroVideos.portfolioMobile,
          s.PORTFOLIO_CONTENT.hero.video.mobile ?? void 0
        ),
        c = e ? o : i;
      return (0, t.jsxs)('section', {
        id: 'portfolio-hero',
        'aria-label': 'Portfolio Hero',
        className: 'relative h-[78vh] md:h-screen w-full overflow-hidden',
        children: [
          (0, t.jsx)('div', {
            className: 'absolute inset-0 z-0',
            children: (0, t.jsx)(
              'video',
              {
                autoPlay: !0,
                loop: !0,
                muted: !0,
                playsInline: !0,
                className: 'h-full w-full object-cover',
                children: (0, t.jsx)('source', { src: c, type: 'video/mp4' }),
              },
              c
            ),
          }),
          (0, t.jsx)('div', {
            className:
              'absolute inset-0 z-10 bg-linear-to-b from-black/70 via-transparent to-black/90',
          }),
          (0, t.jsxs)('div', {
            className: 'absolute inset-0 z-10 pointer-events-none',
            'aria-hidden': 'true',
            children: [
              (0, t.jsx)('div', {
                className:
                  'absolute inset-0 portfolio-hero-glow-primary opacity-60',
              }),
              (0, t.jsx)('div', {
                className:
                  'absolute inset-0 portfolio-hero-glow-accent opacity-40',
              }),
              (0, t.jsx)('div', {
                className:
                  'absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background via-background/80 to-transparent',
              }),
            ],
          }),
          (0, t.jsx)('div', {
            className:
              'absolute bottom-0 left-0 w-full z-30 pb-10 md:pb-16 px-4 md:px-12',
            children: (0, t.jsxs)('div', {
              className:
                'max-w-[1400px] mx-auto flex flex-col md:flex-row items-end justify-between gap-6 md:gap-12',
              children: [
                (0, t.jsx)('div', {
                  className: 'flex-1 text-center md:text-left',
                  children: (0, t.jsxs)('h1', {
                    id: 'portfolio-hero-heading',
                    className:
                      'text-4xl sm:text-6xl md:text-8xl tracking-tighter leading-none font-bold',
                    children: [
                      (0, t.jsx)('span', {
                        className: 'text-[#4fe6ff] mr-3 md:mr-6',
                        children: 'portfólio',
                      }),
                      (0, t.jsx)('span', {
                        className: 'text-white',
                        children: 'showcase',
                      }),
                    ],
                  }),
                }),
                (0, t.jsx)('div', {
                  className: 'shrink-0 flex justify-center md:justify-end',
                  children: (0, t.jsx)(n.default, {
                    href: '#contact',
                    text: 'vamos trabalhar juntos',
                    className: 'static! transform-none!',
                  }),
                }),
              ],
            }),
          }),
        ],
      });
    }
    var c = e.i(62897),
      d = e.i(90541),
      m = e.i(87857),
      u = e.i(73390),
      x = e.i(60586),
      h = e.i(31467),
      p = e.i(78191),
      f = e.i(60253),
      g = e.i(49316),
      b = e.i(28289),
      y = e.i(19230),
      v = e.i(20631);
    let { offset: j } = b.MOTION_TOKENS;
    function w({ project: e, isOpen: s, onClose: a }) {
      let [l, r] = (0, i.useState)(!1),
        n = (0, i.useRef)(null),
        o = (0, i.useRef)(null),
        m = (0, d.useReducedMotion)();
      ((0, g.useBodyLock)(s),
        (0, i.useEffect)(() => {
          r(!0);
        }, []),
        (0, i.useEffect)(() => {
          if (!s) return;
          let e = (e) => {
            if (
              ('Escape' === e.key && (e.preventDefault(), a()),
              'Tab' === e.key && n.current)
            ) {
              let t = n.current.querySelectorAll(
                  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                ),
                i = t[0],
                s = t[t.length - 1];
              e.shiftKey && document.activeElement === i
                ? (e.preventDefault(), s?.focus())
                : e.shiftKey ||
                  document.activeElement !== s ||
                  (e.preventDefault(), i?.focus());
            }
          };
          return (
            document.addEventListener('keydown', e),
            setTimeout(() => {
              o.current?.focus();
            }, 100),
            () => document.removeEventListener('keydown', e)
          );
        }, [s, a]));
      let u = (0, i.useCallback)(
        (e) => {
          e.target === e.currentTarget && a();
        },
        [a]
      );
      if (!l) return null;
      let x = (0, t.jsx)(p.AnimatePresence, {
        mode: 'wait',
        children:
          s &&
          e &&
          (0, t.jsxs)(t.Fragment, {
            children: [
              (0, t.jsx)(
                c.motion.div,
                {
                  initial: 'hidden',
                  animate: 'visible',
                  exit: 'exit',
                  variants: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { duration: 0.18, ease: 'easeOut' },
                    },
                    exit: {
                      opacity: 0,
                      transition: { duration: 0.2, ease: 'easeIn' },
                    },
                  },
                  onClick: u,
                  className: 'fixed inset-0 z-100 bg-black/85 backdrop-blur-md',
                  'aria-hidden': 'true',
                },
                'backdrop'
              ),
              (0, t.jsx)(
                c.motion.div,
                {
                  ref: n,
                  role: 'dialog',
                  'aria-modal': 'true',
                  'aria-labelledby': 'modal-title',
                  initial: m ? { opacity: 0 } : { opacity: 0, y: j.large },
                  animate: { opacity: 1, y: 0 },
                  exit: m ? { opacity: 0 } : { opacity: 0, y: j.standard },
                  transition: (0, b.ghostTransition)(
                    0.12 * !m,
                    m ? 0.15 : 0.26
                  ),
                  className: 'fixed inset-0 z-101 overflow-y-auto',
                  children: (0, t.jsx)('div', {
                    className:
                      'min-h-full flex items-start justify-center p-4 md:p-8 lg:p-12',
                    children: (0, t.jsxs)(c.motion.div, {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: {
                        duration: 0.26,
                        delay: 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      className:
                        'relative w-full max-w-5xl bg-background/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden will-change-transform',
                      children: [
                        (0, t.jsx)('button', {
                          ref: o,
                          onClick: a,
                          className:
                            'fixed top-6 right-6 md:top-10 md:right-10 z-110 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:rotate-90',
                          'aria-label': 'Fechar modal',
                          children: (0, t.jsx)(f.X, {
                            className: 'w-5 h-5 md:w-7 md:h-7',
                          }),
                        }),
                        (0, t.jsx)('div', {
                          className:
                            'absolute top-0 inset-x-0 h-40 pointer-events-none',
                          children: (0, t.jsx)('div', {
                            className: 'absolute inset-0 opacity-30',
                            style: {
                              backgroundImage:
                                'radial-gradient(ellipse at center top, var(--glow-color, rgba(0,87,255,0.3)), transparent 70%)',
                              ...(e.accentColor && {
                                '--glow-color': `${e.accentColor}40`,
                              }),
                            },
                          }),
                        }),
                        (0, t.jsx)('div', {
                          className:
                            'relative z-10 p-6 md:p-10 lg:p-12 pt-16 md:pt-20',
                          children:
                            'A' === e.type
                              ? (0, t.jsx)(y.default, { project: e })
                              : (0, t.jsx)(v.default, { project: e }),
                        }),
                        (0, t.jsx)('div', {
                          className:
                            'absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-background to-transparent pointer-events-none',
                        }),
                      ],
                    }),
                  }),
                },
                'modal'
              ),
            ],
          }),
      });
      return (0, h.createPortal)(x, document.body);
    }
    var N = e.i(74177);
    let k = function ({ projects: e, onProjectSelect: s }) {
      let a = (0, i.useRef)(null),
        l = !!(0, d.useReducedMotion)();
      return (0, t.jsx)('section', {
        id: 'portfolio-showcase',
        ref: a,
        className: 'relative w-full bg-slate-950 pt-10 pb-20 lg:pb-32',
        'aria-labelledby': 'portfolio-showcase-heading',
        children: (0, t.jsxs)(m.Container, {
          children: [
            (0, t.jsx)(c.motion.header, {
              initial: l ? { opacity: 1 } : { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: !0 },
              transition: { duration: 0.7, ease: u.GHOST_EASE },
              className: 'text-center mb-16 lg:mb-24',
              children: (0, t.jsxs)('h2', {
                id: 'portfolio-showcase-heading',
                className:
                  'text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white',
                children: [
                  (0, t.jsxs)('span', {
                    className: 'text-sky-500 italic font-light',
                    children: ['todos os', ' '],
                  }),
                  (0, t.jsx)('span', {
                    className: 'font-bold',
                    children: 'projetos',
                  }),
                ],
              }),
            }),
            (0, t.jsx)('div', {
              className: 'grid grid-cols-12 gap-3 sm:gap-4',
              children: e.map((e, i) =>
                (0, t.jsx)(
                  x.ProjectCard,
                  {
                    project: e,
                    index: i,
                    onClick: s,
                    className: `col-span-12 ${e.layout.cols || 'md:col-span-4'}`,
                  },
                  e.id
                )
              ),
            }),
            (0, t.jsx)('div', {
              className: 'mt-8 flex items-center justify-center',
              children: (0, t.jsxs)('button', {
                type: 'button',
                className:
                  'inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(2,132,199,0.25)] transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
                'aria-label': 'Ver mais projetos (placeholder)',
                children: [
                  (0, t.jsx)('span', { 'aria-hidden': !0, children: '←' }),
                  ' veja mais ',
                  (0, t.jsx)('span', { 'aria-hidden': !0, children: '→' }),
                ],
              }),
            }),
          ],
        }),
      });
    };
    function A({ projects: e }) {
      let [s, a] = (0, i.useState)(null),
        [l, r] = (0, i.useState)(!1),
        n = (0, i.useCallback)((e) => {
          (a(e), r(!0));
        }, []),
        c = (0, i.useCallback)(() => {
          (r(!1),
            setTimeout(() => {
              a(null);
            }, 400));
        }, []);
      return (0, t.jsxs)('div', {
        className: 'min-h-screen bg-background text-text',
        children: [
          (0, t.jsx)(o, {}),
          (0, t.jsx)(k, { projects: e, onProjectSelect: n }),
          (0, t.jsx)(w, { project: s, isOpen: l, onClose: c }),
          (0, t.jsx)(N.SiteClosure, {}),
        ],
      });
    }
    e.s(['default', () => A], 88048);
  },
]);

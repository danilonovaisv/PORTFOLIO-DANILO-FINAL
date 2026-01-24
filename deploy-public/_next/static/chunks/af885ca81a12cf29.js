(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  51603,
  (e) => {
    'use strict';
    var t = e.i(96148),
      o = e.i(84833),
      r = e.i(67725),
      a = e.i(38421),
      i = e.i(23459);
    let s = 'u' > typeof document ? o.useLayoutEffect : o.useEffect,
      l = (e) => e && !Array.isArray(e) && 'object' == typeof e,
      n = [],
      c = {},
      d = a.default,
      u = (e, t = n) => {
        let r = c;
        (l(e)
          ? ((r = e),
            (e = null),
            (t = 'dependencies' in r ? r.dependencies : n))
          : l(t) && (t = 'dependencies' in (r = t) ? r.dependencies : n),
          e &&
            'function' != typeof e &&
            console.warn(
              'First parameter must be a function or config object'
            ));
        let { scope: a, revertOnUpdate: i } = r,
          u = (0, o.useRef)(!1),
          p = (0, o.useRef)(d.context(() => {}, a)),
          m = (0, o.useRef)((e) => p.current.add(null, e)),
          f = t && t.length && !i;
        return (
          f && s(() => ((u.current = !0), () => p.current.revert()), n),
          s(() => {
            if ((e && p.current.add(e, a), !f || !u.current))
              return () => p.current.revert();
          }, t),
          { context: p.current, contextSafe: m.current }
        );
      };
    ((u.register = (e) => {
      d = e;
    }),
      (u.headless = !0));
    let p = [
      {
        id: 1,
        title: 'Creative Flow',
        img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        desc: 'Intuição guiando pixels',
      },
      {
        id: 2,
        title: 'Design Origin',
        img: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800&auto=format&fit=crop',
        desc: 'Do traço à intenção',
      },
      {
        id: 3,
        title: 'Digital Ghost',
        img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
        desc: 'Presença sem peso',
      },
      {
        id: 4,
        title: 'IA Creation',
        img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
        desc: 'Inteligência aplicada',
      },
      {
        id: 5,
        title: 'Brand Strategy',
        img: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800&auto=format&fit=crop',
        desc: 'Estratégia que marca',
      },
      {
        id: 6,
        title: 'Motion Editorial',
        img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
        desc: 'Movimento com método',
      },
      {
        id: 7,
        title: 'Future Tech',
        img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
        desc: 'O que vem a seguir',
      },
      {
        id: 8,
        title: 'Minimal Ethics',
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
        desc: 'Menos é potência',
      },
    ];
    function m() {
      let e = (0, o.useRef)(null),
        s = (0, o.useRef)(null);
      u(
        () => {
          let t = a.default.utils.toArray('.card-item');
          (t.forEach((e) => {
            a.default.to(e, {
              y: '-=20',
              rotationX: 'random(-5, 5)',
              rotationY: 'random(-5, 5)',
              duration: 'random(2, 4)',
              repeat: -1,
              yoyo: !0,
              ease: 'sine.inOut',
            });
          }),
            i.ScrollTrigger.create({
              trigger: s.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
              onUpdate: (e) => {
                a.default.to(t, {
                  yPercent: (t) => -e.progress * (20 + 10 * t),
                  ease: 'none',
                  overwrite: 'auto',
                });
              },
            }),
            a.default.to(e.current, {
              background: '#1a1a3a',
              scrollTrigger: {
                trigger: e.current,
                start: 'top center',
                end: 'bottom center',
                scrub: !0,
              },
            }));
        },
        { scope: e }
      );
      let l = (e) => {
          a.default.to(e.currentTarget, {
            scale: 1.05,
            rotateY: 10,
            rotateX: -5,
            boxShadow: '0 25px 50px rgba(147, 51, 234, 0.4)',
            duration: 0.4,
            ease: 'power2.out',
          });
        },
        n = (e) => {
          a.default.to(e.currentTarget, {
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            duration: 0.4,
            ease: 'power2.out',
          });
        };
      return (0, t.jsx)('section', {
        ref: e,
        className:
          'floating-cards-container relative min-h-screen w-full overflow-hidden bg-[#0f0f23] py-24 px-6 md:px-12',
        children: (0, t.jsx)('div', {
          ref: s,
          className:
            'mx-auto grid max-w-[1400px] grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          children: p.map((e) =>
            (0, t.jsx)(
              'div',
              {
                className: 'card-item card-3d-wrapper',
                onMouseEnter: l,
                onMouseLeave: n,
                tabIndex: 0,
                role: 'article',
                'aria-label': e.title,
                children: (0, t.jsxs)('div', {
                  className:
                    'card-glass relative flex h-[320px] w-full flex-col overflow-hidden rounded-[24px] p-6 transition-colors hover:bg-white/10 group',
                  children: [
                    (0, t.jsx)('div', {
                      className:
                        'relative mb-4 h-40 w-full overflow-hidden rounded-[16px]',
                      children: (0, t.jsx)(r.default, {
                        src: e.img,
                        alt: e.title,
                        fill: !0,
                        className:
                          'object-cover transition-transform duration-700 group-hover:scale-110',
                        sizes:
                          '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
                      }),
                    }),
                    (0, t.jsx)('h3', {
                      className:
                        'purple-glow-text mb-2 text-xl font-bold text-white transition-colors group-hover:text-[#4fe6ff]',
                      children: e.title,
                    }),
                    (0, t.jsx)('p', {
                      className: 'text-sm leading-relaxed text-gray-300',
                      children: e.desc,
                    }),
                    (0, t.jsx)('div', {
                      className:
                        'absolute top-4 right-4 h-2 w-2 rounded-full bg-[#8705f2] animate-pulse',
                    }),
                  ],
                }),
              },
              e.id
            )
          ),
        }),
      });
    }
    (a.default.registerPlugin(i.ScrollTrigger),
      e.s(['default', () => m], 51603));
  },
]);

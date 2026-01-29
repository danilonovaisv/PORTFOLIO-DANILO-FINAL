(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  86791,
  (e) => {
    'use strict';
    var t = e.i(28289);
    let n = { fadeGhost: t.ghostFade, riseSoft: t.riseSoft },
      r = { ghost: t.MOTION_TOKENS.spring.ghost };
    e.s(['motionSprings', 0, r, 'motionTokens', 0, n]);
  },
  26716,
  (e) => {
    'use strict';
    var t = e.i(77579),
      n = e.i(46858),
      r = e.i(62897),
      a = e.i(90541),
      i = e.i(19654),
      o = e.i(80643),
      l = e.i(28046),
      s = e.i(55064),
      u = e.i(86791),
      c = e.i(51395),
      d = e.i(82970);
    function f() {
      let e = (0, a.useReducedMotion)(),
        f = (0, n.useRef)(null),
        { scrollYProgress: p } = (0, i.useScroll)({
          target: f,
          offset: ['start end', 'end start'],
        }),
        h = (0, n.useRef)(null),
        m = (0, n.useRef)(null);
      (0, n.useEffect)(() => {
        (h.current && (h.current.playbackRate = 0.4),
          m.current && (m.current.playbackRate = 0.4));
      }, []);
      let g = (0, o.useSpring)(p, u.motionSprings.ghost),
        A = (0, l.useTransform)(g, [0, 1], e ? [0, 0] : [48, -48]),
        v = (0, c.useSiteAssetUrl)(
          d.SITE_ASSET_KEYS.heroVideos.aboutDesktop,
          s.ABOUT_CONTENT.hero.videos.desktop ||
            '/public/videos/about.hero.desktop_video.mp4'
        ),
        B = (0, c.useSiteAssetUrl)(
          d.SITE_ASSET_KEYS.heroVideos.aboutMobile,
          s.ABOUT_CONTENT.hero.videos.mobile ||
            '/public/videos/about.hero.mobile_video.mp4'
        );
      return (0, t.jsxs)('section', {
        ref: f,
        className: 'relative min-h-screen bg-background overflow-hidden',
        'aria-label': 'Hero - Manifesto',
        children: [
          (0, t.jsx)(r.motion.video, {
            ref: h,
            src: v || '/public/videos/about.hero.desktop_video.mp4',
            autoPlay: !0,
            muted: !0,
            loop: !0,
            playsInline: !0,
            preload: 'metadata',
            className:
              'hidden lg:block absolute inset-0 w-full h-full object-cover opacity-[0.55]',
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
                  (0, t.jsx)(r.motion.div, {
                    initial: 'hidden',
                    whileInView: 'visible',
                    viewport: { once: !0, amount: 0.3 },
                    className:
                      'col-span-6 flex flex-col items-end text-right -translate-y-[10%]',
                    children: (0, t.jsxs)('div', {
                      className:
                        'w-full flex flex-col items-end max-w-[750px] ml-auto',
                      children: [
                        (0, t.jsxs)(r.motion.div, {
                          initial: { opacity: 0, y: 24, filter: 'blur(10px)' },
                          whileInView: {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                          },
                          transition: {
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0,
                          },
                          className: 'mb-12 flex flex-col items-end gap-1',
                          children: [
                            (0, t.jsxs)('h1', {
                              className:
                                'text-[clamp(44px,4.5vw,64px)] font-medium leading-[1.08] tracking-[-0.02em] text-text-light text-right',
                              children: [
                                s.ABOUT_CONTENT.hero.title.text,
                                s.ABOUT_CONTENT.hero.title.highlight &&
                                  (0, t.jsx)('span', {
                                    className:
                                      'text-bluePrimary font-semibold ml-2',
                                    children:
                                      s.ABOUT_CONTENT.hero.title.highlight,
                                  }),
                              ],
                            }),
                            (0, t.jsx)('div', {
                              className: 'flex flex-col items-end',
                              children: s.ABOUT_CONTENT.hero.manifesto.map(
                                (e, n) =>
                                  (0, t.jsxs)(
                                    'p',
                                    {
                                      className:
                                        'text-[clamp(44px,4.5vw,64px)] font-medium leading-[1.08] tracking-[-0.02em] text-text-light text-right',
                                      children: [
                                        e.text,
                                        e.highlight &&
                                          (0, t.jsx)('span', {
                                            className:
                                              'text-bluePrimary font-semibold ml-2',
                                            children: e.highlight,
                                          }),
                                        e.textEnd,
                                      ],
                                    },
                                    n
                                  )
                              ),
                            }),
                          ],
                        }),
                        (0, t.jsx)(r.motion.div, {
                          initial: { opacity: 0, y: 24 },
                          whileInView: { opacity: 1, y: 0 },
                          transition: {
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.4,
                          },
                          children: (0, t.jsx)('h3', {
                            className:
                              'type-h3 text-white text-right font-medium max-w-[620px]',
                            children:
                              s.ABOUT_CONTENT.hero.description.join(' '),
                          }),
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
                  (0, t.jsx)(r.motion.video, {
                    ref: m,
                    src: B,
                    autoPlay: !0,
                    muted: !0,
                    loop: !0,
                    playsInline: !0,
                    preload: 'metadata',
                    className:
                      'absolute inset-0 w-full h-full object-cover object-top opacity-[0.78]',
                    style: { y: A },
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
                children: (0, t.jsxs)(r.motion.div, {
                  initial: e ? 'visible' : 'hidden',
                  animate: 'visible',
                  variants: {
                    visible: {
                      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
                    },
                  },
                  className: 'space-y-6',
                  children: [
                    (0, t.jsx)(r.motion.div, {
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
                    (0, t.jsx)(r.motion.div, {
                      variants: u.motionTokens.fadeGhost,
                      className:
                        'type-h3 text-white leading-snug tracking-tight max-w-[98%] mx-auto font-medium',
                      children: s.ABOUT_CONTENT.hero.description.map((e, n) =>
                        (0, t.jsx)(
                          'span',
                          { className: 'block', children: e },
                          n
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
    e.s(['AboutHero', () => f]);
  },
  41013,
  (e) => {
    'use strict';
    var t = e.i(77579),
      n = e.i(46858),
      r = e.i(70315),
      a = e.i(35259),
      i = e.i(35798),
      o = e.i(51395),
      l = e.i(82970),
      s = e.i(12559),
      u = e.i(94608),
      c = e.i(7684);
    a.default.registerPlugin(i.ScrollTrigger);
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
        let e = (0, n.useRef)(null),
          f = (0, n.useRef)(null),
          p = (0, n.useRef)(null),
          [h, m] = (0, n.useState)(!1),
          g = (0, u.useMotionGate)(),
          { lenis: A } = (0, n.useContext)(c.ScrollContext),
          v = (e) => (0, s.buildSupabaseStorageUrl)('site-assets', e) ?? void 0,
          B =
            (0, o.useSiteAssetUrl)(
              l.SITE_ASSET_KEYS.about.originImages[0],
              v(d[0].fallback)
            ) ?? v(d[0].fallback),
          b =
            (0, o.useSiteAssetUrl)(
              l.SITE_ASSET_KEYS.about.originImages[1],
              v(d[1].fallback)
            ) ?? v(d[1].fallback),
          C =
            (0, o.useSiteAssetUrl)(
              l.SITE_ASSET_KEYS.about.originImages[2],
              v(d[2].fallback)
            ) ?? v(d[2].fallback),
          y =
            (0, o.useSiteAssetUrl)(
              l.SITE_ASSET_KEYS.about.originImages[3],
              v(d[3].fallback)
            ) ?? v(d[3].fallback),
          x = [
            { ...d[0], img: B },
            { ...d[1], img: b },
            { ...d[2], img: C },
            { ...d[3], img: y },
          ];
        return ((0, n.useEffect)(() => {
          m(!0);
        }, []),
        (0, n.useEffect)(() => {
          if (!h || g) return;
          let e = () => i.ScrollTrigger.update();
          A &&
            (A.on('scroll', e),
            i.ScrollTrigger.scrollerProxy(document.body, {
              scrollTop: (e) => (
                'number' == typeof e && A.scrollTo(e, { immediate: !0 }),
                A.scroll
              ),
              getBoundingClientRect: () => ({
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              }),
            }));
          let t = a.default.matchMedia();
          (t.add('(min-width: 1024px)', () => {
            if (!f.current || !p.current) return;
            let e = a.default.utils.toArray('.img-wrapper'),
              t = a.default.utils.toArray('.img-wrapper img'),
              n = a.default.utils.toArray('.arch__info'),
              r = ['#040013', '#060018', '#08001e', '#0a001a'],
              i = a.default.timeline({
                scrollTrigger: {
                  trigger: f.current,
                  start: 'top top',
                  end: 'bottom bottom',
                  pin: p.current,
                  scrub: !0,
                  invalidateOnRefresh: !0,
                },
              });
            (a.default.set(t, {
              clipPath: 'inset(0% 0% 0% 0%)',
              objectPosition: '0px 0%',
              scale: 1.15,
              filter: 'blur(12px)',
              opacity: 0,
              yPercent: 0,
            }),
              e.forEach((e, t) => {
                e.style.zIndex = (x.length - t).toString();
              }),
              a.default.to(t[0], {
                filter: 'blur(0px)',
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: f.current,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              }),
              x.forEach((n, a) => {
                let o = e[a],
                  l = t[a],
                  s = t[a + 1];
                if (a < x.length - 1) {
                  let e = 1.5 * a;
                  (i.to(
                    'body',
                    { backgroundColor: r[a + 1], duration: 1.5, ease: 'none' },
                    e
                  ),
                    i.to(
                      o,
                      {
                        clipPath: 'inset(0px 0px 100% 0px)',
                        duration: 1.5,
                        ease: 'none',
                      },
                      e
                    ),
                    i.to(
                      l,
                      {
                        objectPosition: '0px 60%',
                        yPercent: 15,
                        duration: 1.5,
                        ease: 'none',
                      },
                      e
                    ),
                    i.to(
                      s,
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
              n.forEach((e) => {
                let t = e.querySelector('h2'),
                  n = e.querySelector('p');
                (t &&
                  a.default.fromTo(
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
                  n &&
                    a.default.fromTo(
                      n,
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
            t.add('(max-width: 1023px)', () => {
              let e = a.default.utils.toArray('.mobile-img-container'),
                t = a.default.utils.toArray('.mobile-text-container'),
                n = ['#040013', '#060018', '#08001e', '#0a001a'];
              (e.forEach((e, t) => {
                let r = e.querySelector('img');
                r &&
                  a.default
                    .timeline({
                      scrollTrigger: {
                        trigger: e,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: !0,
                      },
                    })
                    .fromTo(
                      r,
                      { y: -40, scale: 1.1 },
                      { y: 40, scale: 1, ease: 'none' }
                    )
                    .to(
                      'body',
                      {
                        backgroundColor: n[t],
                        duration: 0.5,
                        ease: 'power2.inOut',
                      },
                      0
                    );
              }),
                t.forEach((e) => {
                  a.default.fromTo(
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
          let n = () => i.ScrollTrigger.refresh();
          return (
            window.addEventListener('load', n),
            setTimeout(n, 500),
            () => {
              (window.removeEventListener('load', n),
                A && A.off?.('scroll', e),
                t.revert(),
                i.ScrollTrigger.getAll().forEach((e) => e.kill()));
            }
          );
        }, [h, g, A]),
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
                        'text-[1.75rem] font-bold leading-none text-bluePrimary tracking-[0.2em] uppercase',
                      children: 'ORIGEM',
                    }),
                  }),
                  (0, t.jsxs)('div', {
                    className:
                      'arch relative grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 md:gap-12 max-w-360 mx-auto',
                    ref: f,
                    children: [
                      (0, t.jsx)('div', {
                        className:
                          'col-span-4 md:col-span-8 lg:col-span-6 flex flex-col',
                        children: x.map((e) =>
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
                                          'text-h1 font-bold leading-[1.1] text-bluePrimary normal-case',
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
                                    children: (0, t.jsx)(r.default, {
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
                        ref: p,
                        children: (0, t.jsx)('div', {
                          className: 'relative w-full aspect-square max-w-140',
                          children: x.map((e) =>
                            (0, t.jsx)(
                              'div',
                              {
                                className:
                                  'img-wrapper absolute inset-0 rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] bg-[#040013]',
                                children: (0, t.jsx)(r.default, {
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
  27101,
  (e) => {
    'use strict';
    var t = e.i(77579),
      n = e.i(46858),
      r = e.i(62897),
      a = e.i(19654),
      i = e.i(28046),
      o = e.i(80643),
      l = e.i(90541);
    let s = [
        {
          id: '01',
          keyword: 'Direção',
          description: 'criativa que organiza o caos',
        },
        {
          id: '02',
          keyword: 'Design',
          description: 'estratégico que guia decisões',
        },
        {
          id: '03',
          keyword: 'Identidades',
          description: 'que permanecem na memória',
        },
        {
          id: '04',
          keyword: 'Campanhas',
          description: 'multicanais com lógica e emoção',
        },
        {
          id: '05',
          keyword: 'Branding',
          description: 'que não grita — mas marca',
        },
        {
          id: '06',
          keyword: 'Inteligência Artificial',
          description: 'aplicada à criação',
        },
        {
          id: '07',
          keyword: 'Liderança Criativa',
          description: 'com visão e método',
        },
      ],
      u = [
        'Branding',
        'Identidade Visual',
        'Motion Design',
        'Campanhas',
        'UI/UX',
        'Direção de Arte',
        'Creative Coding',
        'AI Design',
      ],
      c = [0.22, 1, 0.36, 1];
    function d() {
      let e = (0, n.useRef)(null),
        d = !!(0, l.useReducedMotion)(),
        { scrollYProgress: f } = (0, a.useScroll)({
          target: e,
          offset: ['start start', 'end end'],
        }),
        p = (0, o.useSpring)(f, {
          stiffness: 100,
          damping: 30,
          restDelta: 0.001,
        }),
        h = (0, i.useTransform)(p, [0, 1], ['120vw', '-120%']),
        m = (0, i.useTransform)(p, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
      return (0, t.jsxs)('section', {
        ref: e,
        className: 'relative z-10 w-full bg-[#040013] text-white',
        'aria-labelledby': 'what-i-do-heading',
        children: [
          (0, t.jsx)('div', {
            className: 'hidden lg:block lg:h-[300vh]',
            children: (0, t.jsxs)('div', {
              className:
                'sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden',
              children: [
                (0, t.jsx)('div', {
                  className:
                    'absolute top-0 z-20 flex w-full justify-center pt-20',
                  children: (0, t.jsxs)('div', {
                    className: 'max-w-[900px] text-center',
                    children: [
                      (0, t.jsxs)('h2', {
                        id: 'what-i-do-heading',
                        className:
                          'font-display text-5xl font-black leading-[1.15] tracking-tight text-white md:text-6xl',
                        children: [
                          'Do ',
                          (0, t.jsx)('span', {
                            className: 'text-[#0048ff]',
                            children: 'insight',
                          }),
                          ' ao',
                          ' ',
                          (0, t.jsx)('span', {
                            className: 'text-[#0048ff]',
                            children: 'impacto',
                          }),
                          '.',
                        ],
                      }),
                      (0, t.jsx)('p', {
                        className:
                          'mt-3 font-display text-4xl font-black leading-[1.15] tracking-tight text-white/90 md:text-5xl',
                        children: 'Mesmo quando você não percebe.',
                      }),
                    ],
                  }),
                }),
                (0, t.jsx)(r.motion.div, {
                  style: { x: d ? 0 : h, opacity: d ? 1 : m },
                  className: 'flex gap-6 will-change-transform pt-32',
                  children: s.map((e, n) =>
                    (0, t.jsxs)(
                      r.motion.article,
                      {
                        initial: { opacity: 0, scale: 0.95 },
                        whileInView: { opacity: 1, scale: 1 },
                        viewport: { once: !0, margin: '-5%' },
                        transition: { duration: 0.4, delay: 0.06 * n, ease: c },
                        className:
                          'group flex min-h-[140px] min-w-[380px] items-center gap-5 rounded-2xl bg-[#0048ff] p-6 shadow-[0_25px_50px_-12px_rgba(0,72,255,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_30px_60px_-12px_rgba(0,72,255,0.65)]',
                        children: [
                          (0, t.jsx)('span', {
                            className:
                              'shrink-0 font-display text-5xl font-black text-[#8705f2] transition-transform duration-300 group-hover:scale-110',
                            'aria-hidden': 'true',
                            children: e.id,
                          }),
                          (0, t.jsxs)('p', {
                            className:
                              'font-display text-xl font-bold leading-tight text-white',
                            children: [
                              (0, t.jsx)('strong', {
                                className: 'text-[#4fe6ff]',
                                children: e.keyword,
                              }),
                              ' ',
                              e.description,
                            ],
                          }),
                        ],
                      },
                      e.id
                    )
                  ),
                }),
                (0, t.jsx)('div', {
                  className:
                    'pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#040013] to-transparent',
                }),
                (0, t.jsx)('div', {
                  className:
                    'pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#040013] to-transparent',
                }),
              ],
            }),
          }),
          (0, t.jsx)('div', {
            className: 'block py-16 lg:hidden',
            children: (0, t.jsxs)('div', {
              className: 'std-grid',
              children: [
                (0, t.jsxs)('header', {
                  className: 'mb-12 text-center',
                  children: [
                    (0, t.jsxs)('h2', {
                      id: 'what-i-do-heading-mobile',
                      className:
                        'font-display text-[2.5rem] font-black leading-[1.1] tracking-tight text-white',
                      children: [
                        'Do ',
                        (0, t.jsx)('span', {
                          className: 'text-[#0048ff]',
                          children: 'insight',
                        }),
                        ' ao',
                        ' ',
                        (0, t.jsx)('span', {
                          className: 'text-[#0048ff]',
                          children: 'impacto',
                        }),
                        '.',
                      ],
                    }),
                    (0, t.jsx)('p', {
                      className:
                        'mt-2 font-display text-[1.75rem] font-black leading-[1.1] tracking-tight text-white/90',
                      children: 'Mesmo quando você não percebe.',
                    }),
                  ],
                }),
                (0, t.jsx)('div', {
                  className: 'flex flex-col gap-3',
                  children: s.map((e, n) =>
                    (0, t.jsxs)(
                      r.motion.article,
                      {
                        initial: d
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: 80 },
                        whileInView: { opacity: 1, x: 0 },
                        viewport: { once: !0, margin: '-10%' },
                        transition: { duration: 0.4, delay: 0.08 * n, ease: c },
                        className:
                          'group flex min-h-[76px] w-full items-center gap-4 rounded-xl bg-[#0048ff] px-5 py-4 shadow-[0_16px_40px_-12px_rgba(0,72,255,0.4)] transition-all duration-300 active:scale-[0.98]',
                        children: [
                          (0, t.jsx)('span', {
                            className:
                              'shrink-0 font-display text-2xl font-black text-[#8705f2]',
                            'aria-hidden': 'true',
                            children: e.id,
                          }),
                          (0, t.jsxs)('p', {
                            className:
                              'text-sm font-semibold leading-snug text-white',
                            children: [
                              (0, t.jsx)('strong', {
                                className: 'text-[#4fe6ff]',
                                children: e.keyword,
                              }),
                              ' ',
                              e.description,
                            ],
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
          (0, t.jsxs)('div', {
            className:
              'relative overflow-hidden border-t border-white/5 bg-[#040013] py-6',
            children: [
              (0, t.jsxs)('div', {
                className: 'flex w-max animate-marquee gap-12',
                children: [
                  u.map((e, n) =>
                    (0, t.jsx)(
                      'span',
                      {
                        className:
                          'text-sm font-medium uppercase tracking-[0.2em] text-white/30',
                        children: e,
                      },
                      `a-${n}`
                    )
                  ),
                  u.map((e, n) =>
                    (0, t.jsx)(
                      'span',
                      {
                        className:
                          'text-sm font-medium uppercase tracking-[0.2em] text-white/30',
                        children: e,
                      },
                      `b-${n}`
                    )
                  ),
                ],
              }),
              (0, t.jsx)('div', {
                className:
                  'pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-[#040013] to-transparent',
              }),
              (0, t.jsx)('div', {
                className:
                  'pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#040013] to-transparent',
              }),
            ],
          }),
        ],
      });
    }
    e.s(['AboutWhatIDo', () => d, 'default', 0, d]);
  },
  11404,
  (e) => {
    'use strict';
    var t = e.i(77579),
      n = e.i(46858),
      r = e.i(62897),
      a = e.i(19654),
      i = e.i(80643),
      o = e.i(28046),
      l = e.i(60630),
      s = e.i(60649),
      u = e.i(55064),
      c = e.i(86791);
    function d() {
      let e = (0, n.useRef)(null),
        d = (0, l.useReducedMotion)(),
        f = (0, s.useMediaQuery)('(max-width: 768px)'),
        { scrollYProgress: p } = (0, a.useScroll)({
          target: e,
          offset: ['start end', 'end start'],
        }),
        h = (0, i.useSpring)(p, c.motionSprings.ghost),
        m = d ? p : h,
        g = (0, o.useTransform)(m, [0, 1], d ? [0, 0] : [16, -16]),
        A = (0, o.useTransform)(m, [0, 1], d ? ['0%', '0%'] : ['-10%', '10%']);
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
              (0, t.jsx)(r.motion.div, {
                style: { y: f ? 0 : A },
                className: 'w-full h-full lg:h-[120%]',
                children: (0, t.jsx)(
                  'video',
                  {
                    src:
                      (f
                        ? u.ABOUT_CONTENT.method.videos.mobile
                        : u.ABOUT_CONTENT.method.videos.desktop) || '',
                    autoPlay: !0,
                    loop: !0,
                    muted: !0,
                    playsInline: !0,
                    className: `w-full h-full ${f ? 'object-cover object-center opacity-55' : 'object-cover object-right opacity-55'}`,
                    'aria-hidden': 'true',
                  },
                  f ? 'mobile' : 'desktop'
                ),
              }),
              (0, t.jsx)('div', {
                className:
                  'absolute inset-0 z-1 bg-linear-to-b from-background via-background/40 to-background md:bg-linear-to-r md:from-background md:via-background/60 md:to-transparent',
                'aria-hidden': 'true',
              }),
            ],
          }),
          (0, t.jsx)('div', {
            className: 'std-grid relative z-10 w-full h-full',
            children: (0, t.jsxs)('div', {
              className:
                'flex flex-col lg:grid lg:grid-cols-12 w-full h-full pt-[50vh] md:pt-[100px]',
              children: [
                (0, t.jsx)('div', {
                  className:
                    'w-full lg:col-span-8 flex flex-col justify-center px-0 lg:pr-20 py-20 lg:py-32',
                  children: (0, t.jsxs)(r.motion.div, {
                    style: { y: g },
                    className:
                      'w-full flex flex-col items-center lg:items-start',
                    children: [
                      (0, t.jsx)(r.motion.div, {
                        variants: c.motionTokens.fadeGhost,
                        initial: d ? 'visible' : 'hidden',
                        whileInView: 'visible',
                        viewport: { once: !0, margin: '-20%' },
                        className: 'mb-8 lg:mb-12 text-center lg:text-left',
                        children: (0, t.jsxs)('h2', {
                          className:
                            'font-display leading-[1.08] tracking-[-0.02em] text-[clamp(32px,5vw,64px)] font-bold',
                          children: [
                            (0, t.jsxs)('div', {
                              className: 'text-white leading-tight',
                              children: [
                                (0, t.jsx)('span', {
                                  className: 'text-bluePrimary',
                                  children: 'Criatividade',
                                }),
                                ' com',
                                ' ',
                                (0, t.jsx)('span', {
                                  className: 'text-bluePrimary',
                                  children: 'método',
                                }),
                                '.',
                              ],
                            }),
                            (0, t.jsx)('div', {
                              className: 'text-white leading-tight',
                              children: 'Impacto sem ruído.',
                            }),
                          ],
                        }),
                      }),
                      (0, t.jsx)(r.motion.div, {
                        variants: c.motionTokens.fadeGhost,
                        initial: d ? 'visible' : 'hidden',
                        whileInView: 'visible',
                        viewport: { once: !0, margin: '-20%' },
                        className:
                          'text-white type-h3 mb-12 lg:mb-16 text-center lg:text-left max-w-full lg:max-w-[550px]',
                        children: u.ABOUT_CONTENT.method.intro.map((e, n) =>
                          (0, t.jsx)('p', { children: e }, n)
                        ),
                      }),
                      (0, t.jsx)(r.motion.div, {
                        variants: {
                          visible: { transition: { staggerChildren: 0.1 } },
                        },
                        initial: d ? 'visible' : 'hidden',
                        whileInView: 'visible',
                        viewport: { once: !0, margin: '-10%' },
                        className:
                          'flex flex-col w-full border-t border-primary/40',
                        children: u.ABOUT_CONTENT.method.steps.map((e) =>
                          (0, t.jsxs)(
                            r.motion.div,
                            {
                              variants: c.motionTokens.riseSoft,
                              className:
                                ' group flex items-center gap-4 lg:gap-6  bg-[rgba(26,26,46,0.85)] lg:bg-transparent p-5 lg:py-6 lg:px-0 mb-4 lg:mb-0 rounded-xl lg:rounded-none lg:border-b lg:border-primary/40 transition-all duration-300 hover:bg-primary/5 ',
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
        ],
      });
    }
    e.s(['default', () => d]);
  },
  25661,
  (e, t, n) => {
    'use strict';
    var r = e.r(46858),
      a =
        'function' == typeof Object.is
          ? Object.is
          : function (e, t) {
              return (
                (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
              );
            },
      i = r.useState,
      o = r.useEffect,
      l = r.useLayoutEffect,
      s = r.useDebugValue;
    function u(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !a(e, n);
      } catch (e) {
        return !0;
      }
    }
    var c =
      'u' < typeof window ||
      void 0 === window.document ||
      void 0 === window.document.createElement
        ? function (e, t) {
            return t();
          }
        : function (e, t) {
            var n = t(),
              r = i({ inst: { value: n, getSnapshot: t } }),
              a = r[0].inst,
              c = r[1];
            return (
              l(
                function () {
                  ((a.value = n), (a.getSnapshot = t), u(a) && c({ inst: a }));
                },
                [e, n, t]
              ),
              o(
                function () {
                  return (
                    u(a) && c({ inst: a }),
                    e(function () {
                      u(a) && c({ inst: a });
                    })
                  );
                },
                [e]
              ),
              s(n),
              n
            );
          };
    n.useSyncExternalStore =
      void 0 !== r.useSyncExternalStore ? r.useSyncExternalStore : c;
  },
  56032,
  (e, t, n) => {
    'use strict';
    t.exports = e.r(25661);
  },
  20206,
  (e, t, n) => {
    'use strict';
    var r = e.r(46858),
      a = e.r(56032),
      i =
        'function' == typeof Object.is
          ? Object.is
          : function (e, t) {
              return (
                (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
              );
            },
      o = a.useSyncExternalStore,
      l = r.useRef,
      s = r.useEffect,
      u = r.useMemo,
      c = r.useDebugValue;
    n.useSyncExternalStoreWithSelector = function (e, t, n, r, a) {
      var d = l(null);
      if (null === d.current) {
        var f = { hasValue: !1, value: null };
        d.current = f;
      } else f = d.current;
      var p = o(
        e,
        (d = u(
          function () {
            function e(e) {
              if (!s) {
                if (
                  ((s = !0), (o = e), (e = r(e)), void 0 !== a && f.hasValue)
                ) {
                  var t = f.value;
                  if (a(t, e)) return (l = t);
                }
                return (l = e);
              }
              if (((t = l), i(o, e))) return t;
              var n = r(e);
              return void 0 !== a && a(t, n)
                ? ((o = e), t)
                : ((o = e), (l = n));
            }
            var o,
              l,
              s = !1,
              u = void 0 === n ? null : n;
            return [
              function () {
                return e(t());
              },
              null === u
                ? void 0
                : function () {
                    return e(u());
                  },
            ];
          },
          [t, n, r, a]
        ))[0],
        d[1]
      );
      return (
        s(
          function () {
            ((f.hasValue = !0), (f.value = p));
          },
          [p]
        ),
        c(p),
        p
      );
    };
  },
  96482,
  (e, t, n) => {
    'use strict';
    t.exports = e.r(20206);
  },
  94138,
  (e, t, n) => {
    'use strict';
    function r(e, t) {
      var n = e.length;
      for (e.push(t); 0 < n; ) {
        var r = (n - 1) >>> 1,
          a = e[r];
        if (0 < o(a, t)) ((e[r] = t), (e[n] = a), (n = r));
        else break;
      }
    }
    function a(e) {
      return 0 === e.length ? null : e[0];
    }
    function i(e) {
      if (0 === e.length) return null;
      var t = e[0],
        n = e.pop();
      if (n !== t) {
        e[0] = n;
        for (var r = 0, a = e.length, i = a >>> 1; r < i; ) {
          var l = 2 * (r + 1) - 1,
            s = e[l],
            u = l + 1,
            c = e[u];
          if (0 > o(s, n))
            u < a && 0 > o(c, s)
              ? ((e[r] = c), (e[u] = n), (r = u))
              : ((e[r] = s), (e[l] = n), (r = l));
          else if (u < a && 0 > o(c, n)) ((e[r] = c), (e[u] = n), (r = u));
          else break;
        }
      }
      return t;
    }
    function o(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return 0 !== n ? n : e.id - t.id;
    }
    if (
      ((n.unstable_now = void 0),
      'object' == typeof performance && 'function' == typeof performance.now)
    ) {
      var l,
        s = performance;
      n.unstable_now = function () {
        return s.now();
      };
    } else {
      var u = Date,
        c = u.now();
      n.unstable_now = function () {
        return u.now() - c;
      };
    }
    var d = [],
      f = [],
      p = 1,
      h = null,
      m = 3,
      g = !1,
      A = !1,
      v = !1,
      B = !1,
      b = 'function' == typeof setTimeout ? setTimeout : null,
      C = 'function' == typeof clearTimeout ? clearTimeout : null,
      y = 'u' > typeof setImmediate ? setImmediate : null;
    function x(e) {
      for (var t = a(f); null !== t; ) {
        if (null === t.callback) i(f);
        else if (t.startTime <= e)
          (i(f), (t.sortIndex = t.expirationTime), r(d, t));
        else break;
        t = a(f);
      }
    }
    function w(e) {
      if (((v = !1), x(e), !A))
        if (null !== a(d)) ((A = !0), S || ((S = !0), l()));
        else {
          var t = a(f);
          null !== t && D(w, t.startTime - e);
        }
    }
    var S = !1,
      E = -1,
      M = 5,
      F = -1;
    function T() {
      return !!B || !(n.unstable_now() - F < M);
    }
    function R() {
      if (((B = !1), S)) {
        var e = n.unstable_now();
        F = e;
        var t = !0;
        try {
          e: {
            ((A = !1), v && ((v = !1), C(E), (E = -1)), (g = !0));
            var r = m;
            try {
              t: {
                for (
                  x(e), h = a(d);
                  null !== h && !(h.expirationTime > e && T());
                ) {
                  var o = h.callback;
                  if ('function' == typeof o) {
                    ((h.callback = null), (m = h.priorityLevel));
                    var s = o(h.expirationTime <= e);
                    if (((e = n.unstable_now()), 'function' == typeof s)) {
                      ((h.callback = s), x(e), (t = !0));
                      break t;
                    }
                    (h === a(d) && i(d), x(e));
                  } else i(d);
                  h = a(d);
                }
                if (null !== h) t = !0;
                else {
                  var u = a(f);
                  (null !== u && D(w, u.startTime - e), (t = !1));
                }
              }
              break e;
            } finally {
              ((h = null), (m = r), (g = !1));
            }
          }
        } finally {
          t ? l() : (S = !1);
        }
      }
    }
    if ('function' == typeof y)
      l = function () {
        y(R);
      };
    else if ('u' > typeof MessageChannel) {
      var I = new MessageChannel(),
        G = I.port2;
      ((I.port1.onmessage = R),
        (l = function () {
          G.postMessage(null);
        }));
    } else
      l = function () {
        b(R, 0);
      };
    function D(e, t) {
      E = b(function () {
        e(n.unstable_now());
      }, t);
    }
    ((n.unstable_IdlePriority = 5),
      (n.unstable_ImmediatePriority = 1),
      (n.unstable_LowPriority = 4),
      (n.unstable_NormalPriority = 3),
      (n.unstable_Profiling = null),
      (n.unstable_UserBlockingPriority = 2),
      (n.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (n.unstable_forceFrameRate = function (e) {
        0 > e || 125 < e
          ? console.error(
              'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
            )
          : (M = 0 < e ? Math.floor(1e3 / e) : 5);
      }),
      (n.unstable_getCurrentPriorityLevel = function () {
        return m;
      }),
      (n.unstable_next = function (e) {
        switch (m) {
          case 1:
          case 2:
          case 3:
            var t = 3;
            break;
          default:
            t = m;
        }
        var n = m;
        m = t;
        try {
          return e();
        } finally {
          m = n;
        }
      }),
      (n.unstable_requestPaint = function () {
        B = !0;
      }),
      (n.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = m;
        m = e;
        try {
          return t();
        } finally {
          m = n;
        }
      }),
      (n.unstable_scheduleCallback = function (e, t, i) {
        var o = n.unstable_now();
        switch (
          ((i =
            'object' == typeof i &&
            null !== i &&
            'number' == typeof (i = i.delay) &&
            0 < i
              ? o + i
              : o),
          e)
        ) {
          case 1:
            var s = -1;
            break;
          case 2:
            s = 250;
            break;
          case 5:
            s = 0x3fffffff;
            break;
          case 4:
            s = 1e4;
            break;
          default:
            s = 5e3;
        }
        return (
          (s = i + s),
          (e = {
            id: p++,
            callback: t,
            priorityLevel: e,
            startTime: i,
            expirationTime: s,
            sortIndex: -1,
          }),
          i > o
            ? ((e.sortIndex = i),
              r(f, e),
              null === a(d) &&
                e === a(f) &&
                (v ? (C(E), (E = -1)) : (v = !0), D(w, i - o)))
            : ((e.sortIndex = s),
              r(d, e),
              A || g || ((A = !0), S || ((S = !0), l()))),
          e
        );
      }),
      (n.unstable_shouldYield = T),
      (n.unstable_wrapCallback = function (e) {
        var t = m;
        return function () {
          var n = m;
          m = t;
          try {
            return e.apply(this, arguments);
          } finally {
            m = n;
          }
        };
      }));
  },
  88440,
  (e, t, n) => {
    'use strict';
    t.exports = e.r(94138);
  },
  9455,
  (e) => {
    'use strict';
    let t, n, r, a, i, o, l, s, u, c, d;
    var f,
      p,
      h,
      m,
      g,
      A,
      v = e.i(77579),
      B = e.i(46858),
      b = e.i(33659),
      C = e.i(19654),
      y = e.i(28046),
      x = e.i(1921),
      w = B,
      S = e.i(9858),
      E = e.i(11033),
      M = e.i(96482),
      F = e.i(34476);
    let { useSyncExternalStoreWithSelector: T } = M.default,
      R = (e, t) => {
        let n = (0, F.createStore)(e),
          r = (e, r = t) =>
            (function (e, t = (e) => e, n) {
              let r = T(e.subscribe, e.getState, e.getInitialState, t, n);
              return (B.default.useDebugValue(r), r);
            })(n, e, r);
        return (Object.assign(r, n), r);
      },
      I = (e, t) => (e ? R(e, t) : R),
      G = [];
    function D(e, t, n = (e, t) => e === t) {
      if (e === t) return !0;
      if (!e || !t) return !1;
      let r = e.length;
      if (t.length !== r) return !1;
      for (let a = 0; a < r; a++) if (!n(e[a], t[a])) return !1;
      return !0;
    }
    function _(e, t = null, n = !1, r = {}) {
      for (let a of (null === t && (t = [e]), G))
        if (D(t, a.keys, a.equal)) {
          if (n) return;
          if (Object.prototype.hasOwnProperty.call(a, 'error')) throw a.error;
          if (Object.prototype.hasOwnProperty.call(a, 'response'))
            return (
              r.lifespan &&
                r.lifespan > 0 &&
                (a.timeout && clearTimeout(a.timeout),
                (a.timeout = setTimeout(a.remove, r.lifespan))),
              a.response
            );
          if (!n) throw a.promise;
        }
      let a = {
        keys: t,
        equal: r.equal,
        remove: () => {
          let e = G.indexOf(a);
          -1 !== e && G.splice(e, 1);
        },
        promise: ('object' == typeof e && 'function' == typeof e.then
          ? e
          : e(...t)
        )
          .then((e) => {
            ((a.response = e),
              r.lifespan &&
                r.lifespan > 0 &&
                (a.timeout = setTimeout(a.remove, r.lifespan)));
          })
          .catch((e) => (a.error = e)),
      };
      if ((G.push(a), !n)) throw a.promise;
    }
    var k = e.i(88440),
      P = B;
    function L(e, t, n) {
      if (!e) return;
      if (!0 === n(e)) return e;
      let r = t ? e.return : e.child;
      for (; r; ) {
        let e = L(r, t, n);
        if (e) return e;
        r = t ? null : r.sibling;
      }
    }
    function N(e) {
      try {
        return Object.defineProperties(e, {
          _currentRenderer: { get: () => null, set() {} },
          _currentRenderer2: { get: () => null, set() {} },
        });
      } catch (t) {
        return e;
      }
    }
    'u' > typeof window &&
    ((null == (f = window.document) ? void 0 : f.createElement) ||
      (null == (p = window.navigator) ? void 0 : p.product) === 'ReactNative')
      ? P.useLayoutEffect
      : P.useEffect;
    let H = N(P.createContext(null));
    class U extends P.Component {
      render() {
        return P.createElement(
          H.Provider,
          { value: this._reactInternals },
          this.props.children
        );
      }
    }
    function O() {
      let e = P.useContext(H);
      if (null === e)
        throw Error(
          'its-fine: useFiber must be called within a <FiberProvider />!'
        );
      let t = P.useId();
      return P.useMemo(() => {
        for (let n of [e, null == e ? void 0 : e.alternate]) {
          if (!n) continue;
          let e = L(n, !1, (e) => {
            let n = e.memoizedState;
            for (; n; ) {
              if (n.memoizedState === t) return !0;
              n = n.next;
            }
          });
          if (e) return e;
        }
      }, [e, t]);
    }
    let j = Symbol.for('react.context'),
      J = (e) =>
        null !== e &&
        'object' == typeof e &&
        '$$typeof' in e &&
        e.$$typeof === j;
    function z(e) {
      let t = e.root;
      for (; t.getState().previousRoot; ) t = t.getState().previousRoot;
      return t;
    }
    w.act;
    let K = (e) =>
        null != e &&
        ('string' == typeof e || 'number' == typeof e || e.isColor),
      Q =
        'u' > typeof window &&
        ((null == (s = window.document) ? void 0 : s.createElement) ||
          (null == (u = window.navigator) ? void 0 : u.product) ===
            'ReactNative')
          ? w.useLayoutEffect
          : w.useEffect;
    function X(e) {
      let t = w.useRef(e);
      return (Q(() => void (t.current = e), [e]), t);
    }
    function V({ set: e }) {
      return (Q(() => (e(new Promise(() => null)), () => e(!1)), [e]), null);
    }
    let W =
      (((c = class extends w.Component {
        constructor(...e) {
          (super(...e), (this.state = { error: !1 }));
        }
        componentDidCatch(e) {
          this.props.set(e);
        }
        render() {
          return this.state.error ? null : this.props.children;
        }
      }).getDerivedStateFromError = () => ({ error: !0 })),
      c);
    function Y(e) {
      var t;
      let n =
        'u' > typeof window
          ? null != (t = window.devicePixelRatio)
            ? t
            : 2
          : 1;
      return Array.isArray(e) ? Math.min(Math.max(e[0], n), e[1]) : e;
    }
    function q(e) {
      var t;
      return null == (t = e.__r3f) ? void 0 : t.root.getState();
    }
    let Z = {
        obj: (e) => e === Object(e) && !Z.arr(e) && 'function' != typeof e,
        fun: (e) => 'function' == typeof e,
        str: (e) => 'string' == typeof e,
        num: (e) => 'number' == typeof e,
        boo: (e) => 'boolean' == typeof e,
        und: (e) => void 0 === e,
        nul: (e) => null === e,
        arr: (e) => Array.isArray(e),
        equ(
          e,
          t,
          {
            arrays: n = 'shallow',
            objects: r = 'reference',
            strict: a = !0,
          } = {}
        ) {
          let i;
          if (typeof e != typeof t || !!e != !!t) return !1;
          if (Z.str(e) || Z.num(e) || Z.boo(e)) return e === t;
          let o = Z.obj(e);
          if (o && 'reference' === r) return e === t;
          let l = Z.arr(e);
          if (l && 'reference' === n) return e === t;
          if ((l || o) && e === t) return !0;
          for (i in e) if (!(i in t)) return !1;
          if (o && 'shallow' === n && 'shallow' === r) {
            for (i in a ? t : e)
              if (!Z.equ(e[i], t[i], { strict: a, objects: 'reference' }))
                return !1;
          } else for (i in a ? t : e) if (e[i] !== t[i]) return !1;
          if (Z.und(i)) {
            if (
              (l && 0 === e.length && 0 === t.length) ||
              (o && 0 === Object.keys(e).length && 0 === Object.keys(t).length)
            )
              return !0;
            if (e !== t) return !1;
          }
          return !0;
        },
      },
      $ = ['children', 'key', 'ref'];
    function ee(e, t, n, r) {
      let a = null == e ? void 0 : e.__r3f;
      return (
        !a &&
          ((a = {
            root: t,
            type: n,
            parent: null,
            children: [],
            props: (function (e) {
              let t = {};
              for (let n in e) $.includes(n) || (t[n] = e[n]);
              return t;
            })(r),
            object: e,
            eventCount: 0,
            handlers: {},
            isHidden: !1,
          }),
          e && (e.__r3f = a)),
        a
      );
    }
    function et(e, t) {
      if (!t.includes('-') || t in e) return { root: e, key: t, target: e[t] };
      let n = e,
        r = t.split('-');
      for (let a of r) {
        if ('object' != typeof n || null === n) {
          if (void 0 !== n)
            return {
              root: n,
              key: r.slice(r.indexOf(a)).join('-'),
              target: void 0,
            };
          return { root: e, key: t, target: void 0 };
        }
        ((t = a), (e = n), (n = n[t]));
      }
      return { root: e, key: t, target: n };
    }
    let en = /-\d+$/;
    function er(e, t) {
      if (Z.str(t.props.attach)) {
        if (en.test(t.props.attach)) {
          let n = t.props.attach.replace(en, ''),
            { root: r, key: a } = et(e.object, n);
          Array.isArray(r[a]) || (r[a] = []);
        }
        let { root: n, key: r } = et(e.object, t.props.attach);
        ((t.previousAttach = n[r]), (n[r] = t.object));
      } else
        Z.fun(t.props.attach) &&
          (t.previousAttach = t.props.attach(e.object, t.object));
    }
    function ea(e, t) {
      if (Z.str(t.props.attach)) {
        let { root: n, key: r } = et(e.object, t.props.attach),
          a = t.previousAttach;
        void 0 === a ? delete n[r] : (n[r] = a);
      } else null == t.previousAttach || t.previousAttach(e.object, t.object);
      delete t.previousAttach;
    }
    let ei = [
        ...$,
        'args',
        'dispose',
        'attach',
        'object',
        'onUpdate',
        'dispose',
      ],
      eo = new Map(),
      el = [
        'map',
        'emissiveMap',
        'sheenColorMap',
        'specularColorMap',
        'envMap',
      ],
      es = /^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/;
    function eu(e, t) {
      var n, r;
      let a = e.__r3f,
        i = a && z(a).getState(),
        o = null == a ? void 0 : a.eventCount;
      for (let n in t) {
        let o = t[n];
        if (ei.includes(n)) continue;
        if (a && es.test(n)) {
          ('function' == typeof o ? (a.handlers[n] = o) : delete a.handlers[n],
            (a.eventCount = Object.keys(a.handlers).length));
          continue;
        }
        if (void 0 === o) continue;
        let { root: l, key: s, target: u } = et(e, n);
        if (void 0 === u && ('object' != typeof l || null === l))
          throw Error(
            `R3F: Cannot set "${n}". Ensure it is an object before setting "${s}".`
          );
        u instanceof S.Layers && o instanceof S.Layers
          ? (u.mask = o.mask)
          : u instanceof S.Color && K(o)
            ? u.set(o)
            : null !== u &&
                'object' == typeof u &&
                'function' == typeof u.set &&
                'function' == typeof u.copy &&
                null != o &&
                o.constructor &&
                u.constructor === o.constructor
              ? u.copy(o)
              : null !== u &&
                  'object' == typeof u &&
                  'function' == typeof u.set &&
                  Array.isArray(o)
                ? 'function' == typeof u.fromArray
                  ? u.fromArray(o)
                  : u.set(...o)
                : null !== u &&
                    'object' == typeof u &&
                    'function' == typeof u.set &&
                    'number' == typeof o
                  ? 'function' == typeof u.setScalar
                    ? u.setScalar(o)
                    : u.set(o)
                  : ((l[s] = o),
                    i &&
                      !i.linear &&
                      el.includes(s) &&
                      null != (r = l[s]) &&
                      r.isTexture &&
                      l[s].format === S.RGBAFormat &&
                      l[s].type === S.UnsignedByteType &&
                      (l[s].colorSpace = S.SRGBColorSpace));
      }
      if (
        null != a &&
        a.parent &&
        null != i &&
        i.internal &&
        null != (n = a.object) &&
        n.isObject3D &&
        o !== a.eventCount
      ) {
        let e = a.object,
          t = i.internal.interaction.indexOf(e);
        (t > -1 && i.internal.interaction.splice(t, 1),
          a.eventCount && null !== e.raycast && i.internal.interaction.push(e));
      }
      return (
        a &&
          void 0 === a.props.attach &&
          (a.object.isBufferGeometry
            ? (a.props.attach = 'geometry')
            : a.object.isMaterial && (a.props.attach = 'material')),
        a && ec(a),
        e
      );
    }
    function ec(e) {
      var t;
      if (!e.parent) return;
      null == e.props.onUpdate || e.props.onUpdate(e.object);
      let n =
        null == (t = e.root) || null == t.getState ? void 0 : t.getState();
      n && 0 === n.internal.frames && n.invalidate();
    }
    function ed(e, t) {
      !e.manual &&
        (e && e.isOrthographicCamera
          ? ((e.left = -(t.width / 2)),
            (e.right = t.width / 2),
            (e.top = t.height / 2),
            (e.bottom = -(t.height / 2)))
          : (e.aspect = t.width / t.height),
        e.updateProjectionMatrix());
    }
    let ef = (e) => (null == e ? void 0 : e.isObject3D);
    function ep(e) {
      return (e.eventObject || e.object).uuid + '/' + e.index + e.instanceId;
    }
    function eh(e, t, n, r) {
      let a = n.get(t);
      a &&
        (n.delete(t),
        0 === n.size && (e.delete(r), a.target.releasePointerCapture(r)));
    }
    let em = (e) => !!(null != e && e.render),
      eg = w.createContext(null);
    function eA() {
      let e = w.useContext(eg);
      if (!e)
        throw Error('R3F: Hooks can only be used within the Canvas component!');
      return e;
    }
    function ev(e = (e) => e, t) {
      return eA()(e, t);
    }
    function eB(e, t = 0) {
      let n = eA(),
        r = n.getState().internal.subscribe,
        a = X(e);
      return (Q(() => r(a, t, n), [t, r, n]), null);
    }
    let eb = new WeakMap();
    function eC(e, t) {
      return function (n, ...r) {
        var a;
        let i;
        return (
          'function' == typeof n &&
          (null == n || null == (a = n.prototype) ? void 0 : a.constructor) ===
            n
            ? (i = eb.get(n)) || ((i = new n()), eb.set(n, i))
            : (i = n),
          e && e(i),
          Promise.all(
            r.map(
              (e) =>
                new Promise((n, r) =>
                  i.load(
                    e,
                    (e) => {
                      var t;
                      let r;
                      (ef(null == e ? void 0 : e.scene) &&
                        Object.assign(
                          e,
                          ((t = e.scene),
                          (r = { nodes: {}, materials: {}, meshes: {} }),
                          t &&
                            t.traverse((e) => {
                              (e.name && (r.nodes[e.name] = e),
                                e.material &&
                                  !r.materials[e.material.name] &&
                                  (r.materials[e.material.name] = e.material),
                                e.isMesh &&
                                  !r.meshes[e.name] &&
                                  (r.meshes[e.name] = e));
                            }),
                          r)
                        ),
                        n(e));
                    },
                    t,
                    (t) =>
                      r(
                        Error(
                          `Could not load ${e}: ${null == t ? void 0 : t.message}`
                        )
                      )
                  )
                )
            )
          )
        );
      };
    }
    function ey(e, t, n, r) {
      let a = Array.isArray(t) ? t : [t],
        i = _(eC(n, r), [e, ...a], !1, { equal: Z.equ });
      return Array.isArray(t) ? i : i[0];
    }
    ((ey.preload = function (e, t, n) {
      let r,
        a = Array.isArray(t) ? t : [t];
      _(eC(n), [e, ...a], !0, r);
    }),
      (ey.clear = function (e, t) {
        var n = [e, ...(Array.isArray(t) ? t : [t])];
        if (void 0 === n || 0 === n.length) G.splice(0, G.length);
        else {
          let e = G.find((e) => D(n, e.keys, e.equal));
          e && e.remove();
        }
      }));
    var ex = { exports: {} },
      ew = { exports: {} };
    ew.exports;
    let eS = (A ||
        ((A = 1),
        g ||
          ((g = 1),
          (ew.exports = function (e) {
            function t(e, t, n, r) {
              return new rW(e, t, n, r);
            }
            function n() {}
            function r(e) {
              var t = 'https://react.dev/errors/' + e;
              if (1 < arguments.length) {
                t += '?args[]=' + encodeURIComponent(arguments[1]);
                for (var n = 2; n < arguments.length; n++)
                  t += '&args[]=' + encodeURIComponent(arguments[n]);
              }
              return (
                'Minified React error #' +
                e +
                '; visit ' +
                t +
                ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
              );
            }
            function a(e) {
              var t = e,
                n = e;
              if (e.alternate) for (; t.return; ) t = t.return;
              else {
                e = t;
                do
                  ((4098 & (t = e).flags) != 0 && (n = t.return),
                    (e = t.return));
                while (e);
              }
              return 3 === t.tag ? n : null;
            }
            function i(e) {
              if (a(e) !== e) throw Error(r(188));
            }
            function o(e) {
              var t = e.alternate;
              if (!t) {
                if (null === (t = a(e))) throw Error(r(188));
                return t !== e ? null : e;
              }
              for (var n = e, o = t; ; ) {
                var l = n.return;
                if (null === l) break;
                var s = l.alternate;
                if (null === s) {
                  if (null !== (o = l.return)) {
                    n = o;
                    continue;
                  }
                  break;
                }
                if (l.child === s.child) {
                  for (s = l.child; s; ) {
                    if (s === n) return (i(l), e);
                    if (s === o) return (i(l), t);
                    s = s.sibling;
                  }
                  throw Error(r(188));
                }
                if (n.return !== o.return) ((n = l), (o = s));
                else {
                  for (var u = !1, c = l.child; c; ) {
                    if (c === n) {
                      ((u = !0), (n = l), (o = s));
                      break;
                    }
                    if (c === o) {
                      ((u = !0), (o = l), (n = s));
                      break;
                    }
                    c = c.sibling;
                  }
                  if (!u) {
                    for (c = s.child; c; ) {
                      if (c === n) {
                        ((u = !0), (n = s), (o = l));
                        break;
                      }
                      if (c === o) {
                        ((u = !0), (o = s), (n = l));
                        break;
                      }
                      c = c.sibling;
                    }
                    if (!u) throw Error(r(189));
                  }
                }
                if (n.alternate !== o) throw Error(r(190));
              }
              if (3 !== n.tag) throw Error(r(188));
              return n.stateNode.current === n ? e : t;
            }
            function l(e) {
              return null === e || 'object' != typeof e
                ? null
                : 'function' == typeof (e = (aB && e[aB]) || e['@@iterator'])
                  ? e
                  : null;
            }
            function s(e) {
              if (null == e) return null;
              if ('function' == typeof e)
                return e.$$typeof === ab
                  ? null
                  : e.displayName || e.name || null;
              if ('string' == typeof e) return e;
              switch (e) {
                case al:
                  return 'Fragment';
                case au:
                  return 'Profiler';
                case as:
                  return 'StrictMode';
                case ap:
                  return 'Suspense';
                case ah:
                  return 'SuspenseList';
                case aA:
                  return 'Activity';
              }
              if ('object' == typeof e)
                switch (e.$$typeof) {
                  case ao:
                    return 'Portal';
                  case ad:
                    return e.displayName || 'Context';
                  case ac:
                    return (e._context.displayName || 'Context') + '.Consumer';
                  case af:
                    var t = e.render;
                    return (
                      (e = e.displayName) ||
                        (e =
                          '' !== (e = t.displayName || t.name || '')
                            ? 'ForwardRef(' + e + ')'
                            : 'ForwardRef'),
                      e
                    );
                  case am:
                    return null !== (t = e.displayName || null)
                      ? t
                      : s(e.type) || 'Memo';
                  case ag:
                    ((t = e._payload), (e = e._init));
                    try {
                      return s(e(t));
                    } catch {}
                }
              return null;
            }
            function u(e) {
              return { current: e };
            }
            function c(e) {
              0 > oS || ((e.current = ow[oS]), (ow[oS] = null), oS--);
            }
            function d(e, t) {
              ((ow[++oS] = e.current), (e.current = t));
            }
            function f(e) {
              var t = 42 & e;
              if (0 !== t) return t;
              switch (e & -e) {
                case 1:
                  return 1;
                case 2:
                  return 2;
                case 4:
                  return 4;
                case 8:
                  return 8;
                case 16:
                  return 16;
                case 32:
                  return 32;
                case 64:
                  return 64;
                case 128:
                  return 128;
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                  return 261888 & e;
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                  return 3932160 & e;
                case 4194304:
                case 8388608:
                case 0x1000000:
                case 0x2000000:
                  return 0x3c00000 & e;
                case 0x4000000:
                  return 0x4000000;
                case 0x8000000:
                  return 0x8000000;
                case 0x10000000:
                  return 0x10000000;
                case 0x20000000:
                  return 0x20000000;
                case 0x40000000:
                  return 0;
                default:
                  return e;
              }
            }
            function p(e, t, n) {
              var r = e.pendingLanes;
              if (0 === r) return 0;
              var a = 0,
                i = e.suspendedLanes,
                o = e.pingedLanes;
              e = e.warmLanes;
              var l = 0x7ffffff & r;
              return (
                0 !== l
                  ? 0 != (r = l & ~i)
                    ? (a = f(r))
                    : 0 != (o &= l)
                      ? (a = f(o))
                      : n || (0 != (n = l & ~e) && (a = f(n)))
                  : 0 != (l = r & ~i)
                    ? (a = f(l))
                    : 0 !== o
                      ? (a = f(o))
                      : n || (0 != (n = r & ~e) && (a = f(n))),
                0 === a
                  ? 0
                  : 0 !== t &&
                      t !== a &&
                      (t & i) == 0 &&
                      ((i = a & -a) >= (n = t & -t) ||
                        (32 === i && (4194048 & n) != 0))
                    ? t
                    : a
              );
            }
            function h(e, t) {
              return (
                (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) == 0
              );
            }
            function m() {
              var e = oG;
              return ((0x3c00000 & (oG <<= 1)) == 0 && (oG = 4194304), e);
            }
            function g(e) {
              for (var t = [], n = 0; 31 > n; n++) t.push(e);
              return t;
            }
            function A(e, t) {
              ((e.pendingLanes |= t),
                0x10000000 !== t &&
                  ((e.suspendedLanes = 0),
                  (e.pingedLanes = 0),
                  (e.warmLanes = 0)));
            }
            function v(e, t, n) {
              ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
              var r = 31 - oM(t);
              ((e.entangledLanes |= t),
                (e.entanglements[r] =
                  0x40000000 | e.entanglements[r] | (261930 & n)));
            }
            function B(e, t) {
              var n = (e.entangledLanes |= t);
              for (e = e.entanglements; n; ) {
                var r = 31 - oM(n),
                  a = 1 << r;
                ((a & t) | (e[r] & t) && (e[r] |= t), (n &= ~a));
              }
            }
            function b(e, t) {
              var n = t & -t;
              return ((n = (42 & n) != 0 ? 1 : C(n)) &
                (e.suspendedLanes | t)) !=
                0
                ? 0
                : n;
            }
            function C(e) {
              switch (e) {
                case 2:
                  e = 1;
                  break;
                case 8:
                  e = 4;
                  break;
                case 32:
                  e = 16;
                  break;
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 0x1000000:
                case 0x2000000:
                  e = 128;
                  break;
                case 0x10000000:
                  e = 0x8000000;
                  break;
                default:
                  e = 0;
              }
              return e;
            }
            function y(e) {
              return 2 < (e &= -e)
                ? 8 < e
                  ? (0x7ffffff & e) != 0
                    ? 32
                    : 0x10000000
                  : 8
                : 2;
            }
            function S(e) {
              if (
                ('function' == typeof oj && oJ(e),
                oK && 'function' == typeof oK.setStrictMode)
              )
                try {
                  oK.setStrictMode(oz, e);
                } catch {}
            }
            function E(e) {
              if (void 0 === oe)
                try {
                  throw Error();
                } catch (e) {
                  var t = e.stack.trim().match(/\n( *(at )?)/);
                  ((oe = (t && t[1]) || ''),
                    (ot =
                      -1 <
                      e.stack.indexOf(`
    at`)
                        ? ' (<anonymous>)'
                        : -1 < e.stack.indexOf('@')
                          ? '@unknown:0:0'
                          : ''));
                }
              return (
                `
` +
                oe +
                e +
                ot
              );
            }
            function M(e, t) {
              if (!e || oW) return '';
              oW = !0;
              var n = Error.prepareStackTrace;
              Error.prepareStackTrace = void 0;
              try {
                var r = {
                  DetermineComponentFrameRoot: function () {
                    try {
                      if (t) {
                        var n = function () {
                          throw Error();
                        };
                        if (
                          (Object.defineProperty(n.prototype, 'props', {
                            set: function () {
                              throw Error();
                            },
                          }),
                          'object' == typeof Reflect && Reflect.construct)
                        ) {
                          try {
                            Reflect.construct(n, []);
                          } catch (e) {
                            var r = e;
                          }
                          Reflect.construct(e, [], n);
                        } else {
                          try {
                            n.call();
                          } catch (e) {
                            r = e;
                          }
                          e.call(n.prototype);
                        }
                      } else {
                        try {
                          throw Error();
                        } catch (e) {
                          r = e;
                        }
                        (n = e()) &&
                          'function' == typeof n.catch &&
                          n.catch(function () {});
                      }
                    } catch (e) {
                      if (e && r && 'string' == typeof e.stack)
                        return [e.stack, r.stack];
                    }
                    return [null, null];
                  },
                };
                r.DetermineComponentFrameRoot.displayName =
                  'DetermineComponentFrameRoot';
                var a = Object.getOwnPropertyDescriptor(
                  r.DetermineComponentFrameRoot,
                  'name'
                );
                a &&
                  a.configurable &&
                  Object.defineProperty(r.DetermineComponentFrameRoot, 'name', {
                    value: 'DetermineComponentFrameRoot',
                  });
                var i = r.DetermineComponentFrameRoot(),
                  o = i[0],
                  l = i[1];
                if (o && l) {
                  var s = o.split(`
`),
                    u = l.split(`
`);
                  for (
                    a = r = 0;
                    r < s.length &&
                    !s[r].includes('DetermineComponentFrameRoot');
                  )
                    r++;
                  for (
                    ;
                    a < u.length &&
                    !u[a].includes('DetermineComponentFrameRoot');
                  )
                    a++;
                  if (r === s.length || a === u.length)
                    for (
                      r = s.length - 1, a = u.length - 1;
                      1 <= r && 0 <= a && s[r] !== u[a];
                    )
                      a--;
                  for (; 1 <= r && 0 <= a; r--, a--)
                    if (s[r] !== u[a]) {
                      if (1 !== r || 1 !== a)
                        do
                          if ((r--, a--, 0 > a || s[r] !== u[a])) {
                            var c =
                              `
` + s[r].replace(' at new ', ' at ');
                            return (
                              e.displayName &&
                                c.includes('<anonymous>') &&
                                (c = c.replace('<anonymous>', e.displayName)),
                              c
                            );
                          }
                        while (1 <= r && 0 <= a);
                      break;
                    }
                }
              } finally {
                ((oW = !1), (Error.prepareStackTrace = n));
              }
              return (n = e ? e.displayName || e.name : '') ? E(n) : '';
            }
            function F(e) {
              try {
                var t = '',
                  n = null;
                do
                  ((t += (function (e, t) {
                    switch (e.tag) {
                      case 26:
                      case 27:
                      case 5:
                        return E(e.type);
                      case 16:
                        return E('Lazy');
                      case 13:
                        return e.child !== t && null !== t
                          ? E('Suspense Fallback')
                          : E('Suspense');
                      case 19:
                        return E('SuspenseList');
                      case 0:
                      case 15:
                        return M(e.type, !1);
                      case 11:
                        return M(e.type.render, !1);
                      case 1:
                        return M(e.type, !0);
                      case 31:
                        return E('Activity');
                      default:
                        return '';
                    }
                  })(e, n)),
                    (n = e),
                    (e = e.return));
                while (e);
                return t;
              } catch (e) {
                return (
                  `
Error generating stack: ` +
                  e.message +
                  `
` +
                  e.stack
                );
              }
            }
            function T(e, t) {
              if ('object' == typeof e && null !== e) {
                var n = oY.get(e);
                return void 0 !== n
                  ? n
                  : ((t = { value: e, source: t, stack: F(t) }),
                    oY.set(e, t),
                    t);
              }
              return { value: e, source: t, stack: F(t) };
            }
            function R(e, t) {
              ((oq[oZ++] = o0), (oq[oZ++] = o$), (o$ = e), (o0 = t));
            }
            function I(e, t, n) {
              ((o1[o2++] = o9), (o1[o2++] = o8), (o1[o2++] = o3), (o3 = e));
              var r = o9;
              e = o8;
              var a = 32 - oM(r) - 1;
              ((r &= ~(1 << a)), (n += 1));
              var i = 32 - oM(t) + a;
              if (30 < i) {
                var o = a - (a % 5);
                ((i = (r & ((1 << o) - 1)).toString(32)),
                  (r >>= o),
                  (a -= o),
                  (o9 = (1 << (32 - oM(t) + a)) | (n << a) | r),
                  (o8 = i + e));
              } else ((o9 = (1 << i) | (n << a) | r), (o8 = e));
            }
            function G(e) {
              null !== e.return && (R(e, 1), I(e, 1, 0));
            }
            function D(e) {
              for (; e === o$; )
                ((o$ = oq[--oZ]),
                  (oq[oZ] = null),
                  (o0 = oq[--oZ]),
                  (oq[oZ] = null));
              for (; e === o3; )
                ((o3 = o1[--o2]),
                  (o1[o2] = null),
                  (o8 = o1[--o2]),
                  (o1[o2] = null),
                  (o9 = o1[--o2]),
                  (o1[o2] = null));
            }
            function _(e, t) {
              ((o1[o2++] = o9),
                (o1[o2++] = o8),
                (o1[o2++] = o3),
                (o9 = t.id),
                (o8 = t.overflow),
                (o3 = e));
            }
            function P(e, t) {
              (d(o5, t), d(o6, e), d(o4, null), (e = aM(t)), c(o4), d(o4, e));
            }
            function L() {
              (c(o4), c(o6), c(o5));
            }
            function N(e) {
              null !== e.memoizedState && d(o7, e);
              var t = o4.current,
                n = aF(t, e.type);
              t !== n && (d(o6, e), d(o4, n));
            }
            function H(e) {
              (o6.current === e && (c(o4), c(o6)),
                o7.current === e &&
                  (c(o7),
                  aH ? (a9._currentValue = a3) : (a9._currentValue2 = a3)));
            }
            function U(e) {
              var t = Error(
                r(
                  418,
                  1 < arguments.length &&
                    void 0 !== arguments[1] &&
                    arguments[1]
                    ? 'text'
                    : 'HTML',
                  ''
                )
              );
              throw (Q(T(t, e)), li);
            }
            function O(e, t) {
              if (!aj) throw Error(r(175));
              iX(e.stateNode, e.type, e.memoizedProps, t, e) || U(e, !0);
            }
            function j(e) {
              for (le = e.return; le; )
                switch (le.tag) {
                  case 5:
                  case 31:
                  case 13:
                    la = !1;
                    return;
                  case 27:
                  case 3:
                    la = !0;
                    return;
                  default:
                    le = le.return;
                }
            }
            function J(e) {
              if (!aj || e !== le) return !1;
              if (!ln) return (j(e), (ln = !0), !1);
              var t = e.tag;
              if (
                (ov
                  ? 3 !== t &&
                    27 !== t &&
                    (5 !== t || (i7(e.type) && !a_(e.type, e.memoizedProps))) &&
                    lt &&
                    U(e)
                  : 3 !== t &&
                    (5 !== t || (i7(e.type) && !a_(e.type, e.memoizedProps))) &&
                    lt &&
                    U(e),
                j(e),
                13 === t)
              ) {
                if (!aj) throw Error(r(316));
                if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
                  throw Error(r(317));
                lt = iZ(e);
              } else if (31 === t) {
                if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
                  throw Error(r(317));
                lt = iq(e);
              } else
                lt =
                  ov && 27 === t ? iL(e.type, lt) : le ? iP(e.stateNode) : null;
              return !0;
            }
            function z() {
              aj && ((lt = le = null), (ln = !1));
            }
            function K() {
              var e = lr;
              return (
                null !== e &&
                  (null === sD ? (sD = e) : sD.push.apply(sD, e), (lr = null)),
                e
              );
            }
            function Q(e) {
              null === lr ? (lr = [e]) : lr.push(e);
            }
            function X(e, t, n) {
              aH
                ? (d(lo, t._currentValue), (t._currentValue = n))
                : (d(lo, t._currentValue2), (t._currentValue2 = n));
            }
            function V(e) {
              var t = lo.current;
              (aH ? (e._currentValue = t) : (e._currentValue2 = t), c(lo));
            }
            function W(e, t, n) {
              for (; null !== e; ) {
                var r = e.alternate;
                if (
                  ((e.childLanes & t) !== t
                    ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
                    : null !== r &&
                      (r.childLanes & t) !== t &&
                      (r.childLanes |= t),
                  e === n)
                )
                  break;
                e = e.return;
              }
            }
            function Y(e, t, n, a) {
              var i = e.child;
              for (null !== i && (i.return = e); null !== i; ) {
                var o = i.dependencies;
                if (null !== o) {
                  var l = i.child;
                  o = o.firstContext;
                  n: for (; null !== o; ) {
                    var s = o;
                    o = i;
                    for (var u = 0; u < t.length; u++)
                      if (s.context === t[u]) {
                        ((o.lanes |= n),
                          null !== (s = o.alternate) && (s.lanes |= n),
                          W(o.return, n, e),
                          a || (l = null));
                        break n;
                      }
                    o = s.next;
                  }
                } else if (18 === i.tag) {
                  if (null === (l = i.return)) throw Error(r(341));
                  ((l.lanes |= n),
                    null !== (o = l.alternate) && (o.lanes |= n),
                    W(l, n, e),
                    (l = null));
                } else l = i.child;
                if (null !== l) l.return = i;
                else
                  for (l = i; null !== l; ) {
                    if (l === e) {
                      l = null;
                      break;
                    }
                    if (null !== (i = l.sibling)) {
                      ((i.return = l.return), (l = i));
                      break;
                    }
                    l = l.return;
                  }
                i = l;
              }
            }
            function q(e, t, n, a) {
              e = null;
              for (var i = t, o = !1; null !== i; ) {
                if (!o) {
                  if ((524288 & i.flags) != 0) o = !0;
                  else if ((262144 & i.flags) != 0) break;
                }
                if (10 === i.tag) {
                  var l = i.alternate;
                  if (null === l) throw Error(r(387));
                  if (null !== (l = l.memoizedProps)) {
                    var s = i.type;
                    oQ(i.pendingProps.value, l.value) ||
                      (null !== e ? e.push(s) : (e = [s]));
                  }
                } else if (i === o7.current) {
                  if (null === (l = i.alternate)) throw Error(r(387));
                  l.memoizedState.memoizedState !==
                    i.memoizedState.memoizedState &&
                    (null !== e ? e.push(a9) : (e = [a9]));
                }
                i = i.return;
              }
              (null !== e && Y(t, e, n, a), (t.flags |= 262144));
            }
            function Z(e) {
              for (e = e.firstContext; null !== e; ) {
                var t = e.context;
                if (
                  !oQ(aH ? t._currentValue : t._currentValue2, e.memoizedValue)
                )
                  return !0;
                e = e.next;
              }
              return !1;
            }
            function $(e) {
              ((ll = e),
                (ls = null),
                null !== (e = e.dependencies) && (e.firstContext = null));
            }
            function ee(e) {
              return en(ll, e);
            }
            function et(e, t) {
              return (null === ll && $(e), en(e, t));
            }
            function en(e, t) {
              var n = aH ? t._currentValue : t._currentValue2;
              if (
                ((t = { context: t, memoizedValue: n, next: null }),
                null === ls)
              ) {
                if (null === e) throw Error(r(308));
                ((ls = t),
                  (e.dependencies = { lanes: 0, firstContext: t }),
                  (e.flags |= 524288));
              } else ls = ls.next = t;
              return n;
            }
            function er() {
              return { controller: new lu(), data: new Map(), refCount: 0 };
            }
            function ea(e) {
              (e.refCount--,
                0 === e.refCount &&
                  lc(ld, function () {
                    e.controller.abort();
                  }));
            }
            function ei() {}
            function eo(e) {
              (e !== lh &&
                null === e.next &&
                (null === lh ? (lp = lh = e) : (lh = lh.next = e)),
                (lg = !0),
                lm ||
                  ((lm = !0),
                  a4
                    ? a6(function () {
                        (6 & sg) != 0 ? oD(oN, es) : eu();
                      })
                    : oD(oN, es)));
            }
            function el(e, t) {
              if (!lA && lg) {
                lA = !0;
                do
                  for (var n = !1, r = lp; null !== r; ) {
                    if (!t)
                      if (0 !== e) {
                        var a = r.pendingLanes;
                        if (0 === a) var i = 0;
                        else {
                          var o = r.suspendedLanes,
                            l = r.pingedLanes;
                          i =
                            0xc000095 &
                            (i =
                              ((1 << (31 - oM(42 | e) + 1)) - 1) &
                              (a & ~(o & ~l)))
                              ? (0xc000095 & i) | 1
                              : i
                                ? 2 | i
                                : 0;
                        }
                        0 !== i && ((n = !0), ef(r, i));
                      } else
                        ((i = sB),
                          (3 &
                            (i = p(
                              r,
                              r === sA ? i : 0,
                              null !== r.cancelPendingCommit ||
                                r.timeoutHandle !== aN
                            ))) ==
                            0 ||
                            h(r, i) ||
                            ((n = !0), ef(r, i)));
                    r = r.next;
                  }
                while (n);
                lA = !1;
              }
            }
            function es() {
              eu();
            }
            function eu() {
              lg = lm = !1;
              var e = 0;
              0 !== lv && aV() && (e = lv);
              for (var t = oL(), n = null, r = lp; null !== r; ) {
                var a = r.next,
                  i = ec(r, t);
                (0 === i
                  ? ((r.next = null),
                    null === n ? (lp = a) : (n.next = a),
                    null === a && (lh = n))
                  : ((n = r), (0 !== e || (3 & i) != 0) && (lg = !0)),
                  (r = a));
              }
              ((0 !== sU && 5 !== sU) || el(e, !1), 0 !== lv && (lv = 0));
            }
            function ec(e, t) {
              for (
                var n = e.suspendedLanes,
                  r = e.pingedLanes,
                  a = e.expirationTimes,
                  i = -0x3c00001 & e.pendingLanes;
                0 < i;
              ) {
                var o = 31 - oM(i),
                  l = 1 << o,
                  s = a[o];
                (-1 === s
                  ? ((l & n) == 0 || (l & r) != 0) &&
                    (a[o] = (function (e, t) {
                      switch (e) {
                        case 1:
                        case 2:
                        case 4:
                        case 8:
                        case 64:
                          return t + 250;
                        case 16:
                        case 32:
                        case 128:
                        case 256:
                        case 512:
                        case 1024:
                        case 2048:
                        case 4096:
                        case 8192:
                        case 16384:
                        case 32768:
                        case 65536:
                        case 131072:
                        case 262144:
                        case 524288:
                        case 1048576:
                        case 2097152:
                          return t + 5e3;
                        default:
                          return -1;
                      }
                    })(l, t))
                  : s <= t && (e.expiredLanes |= l),
                  (i &= ~l));
              }
              if (
                ((t = sA),
                (n = sB),
                (n = p(
                  e,
                  e === t ? n : 0,
                  null !== e.cancelPendingCommit || e.timeoutHandle !== aN
                )),
                (r = e.callbackNode),
                0 === n ||
                  (e === t && (2 === sb || 9 === sb)) ||
                  null !== e.cancelPendingCommit)
              )
                return (
                  null !== r && null !== r && o_(r),
                  (e.callbackNode = null),
                  (e.callbackPriority = 0)
                );
              if ((3 & n) == 0 || h(e, n)) {
                if ((t = n & -n) === e.callbackPriority) return t;
                switch ((null !== r && o_(r), y(n))) {
                  case 2:
                  case 8:
                    n = oH;
                    break;
                  case 32:
                  default:
                    n = oU;
                    break;
                  case 0x10000000:
                    n = oO;
                }
                return (
                  (n = oD(n, (r = ed.bind(null, e)))),
                  (e.callbackPriority = t),
                  (e.callbackNode = n),
                  t
                );
              }
              return (
                null !== r && null !== r && o_(r),
                (e.callbackPriority = 2),
                (e.callbackNode = null),
                2
              );
            }
            function ed(e, t) {
              if (0 !== sU && 5 !== sU)
                return (
                  (e.callbackNode = null),
                  (e.callbackPriority = 0),
                  null
                );
              var n = e.callbackNode;
              if (rU() && e.callbackNode !== n) return null;
              var r = sB;
              return 0 ===
                (r = p(
                  e,
                  e === sA ? r : 0,
                  null !== e.cancelPendingCommit || e.timeoutHandle !== aN
                ))
                ? null
                : (rv(e, r, t),
                  ec(e, oL()),
                  null != e.callbackNode && e.callbackNode === n
                    ? ed.bind(null, e)
                    : null);
            }
            function ef(e, t) {
              if (rU()) return null;
              rv(e, t, !0);
            }
            function ep() {
              if (0 === lv) {
                var e = lC;
                (0 === e &&
                  ((e = oR), (261888 & (oR <<= 1)) == 0 && (oR = 256)),
                  (lv = e));
              }
              return lv;
            }
            function eh() {
              if (0 == --lb && null !== lB) {
                null !== ly && (ly.status = 'fulfilled');
                var e = lB;
                ((lB = null), (lC = 0), (ly = null));
                for (var t = 0; t < e.length; t++) (0, e[t])();
              }
            }
            function em() {
              var e = lw.current;
              return null !== e ? e : sA.pooledCache;
            }
            function eg(e, t) {
              null === t ? d(lw, lw.current) : d(lw, t.pool);
            }
            function eA() {
              var e = em();
              return null === e
                ? null
                : {
                    parent: aH ? lf._currentValue : lf._currentValue2,
                    pool: e,
                  };
            }
            function ev(e, t) {
              if (oQ(e, t)) return !0;
              if (
                'object' != typeof e ||
                null === e ||
                'object' != typeof t ||
                null === t
              )
                return !1;
              var n = Object.keys(e),
                r = Object.keys(t);
              if (n.length !== r.length) return !1;
              for (r = 0; r < n.length; r++) {
                var a = n[r];
                if (!oV.call(t, a) || !oQ(e[a], t[a])) return !1;
              }
              return !0;
            }
            function eB(e) {
              return 'fulfilled' === (e = e.status) || 'rejected' === e;
            }
            function eb(e, t, n) {
              switch (
                (void 0 === (n = e[n])
                  ? e.push(t)
                  : n !== t && (t.then(ei, ei), (t = n)),
                t.status)
              ) {
                case 'fulfilled':
                  return t.value;
                case 'rejected':
                  throw (ex((e = t.reason)), e);
                default:
                  if ('string' == typeof t.status) t.then(ei, ei);
                  else {
                    if (null !== (e = sA) && 100 < e.shellSuspendCounter)
                      throw Error(r(482));
                    (((e = t).status = 'pending'),
                      e.then(
                        function (e) {
                          if ('pending' === t.status) {
                            var n = t;
                            ((n.status = 'fulfilled'), (n.value = e));
                          }
                        },
                        function (e) {
                          if ('pending' === t.status) {
                            var n = t;
                            ((n.status = 'rejected'), (n.reason = e));
                          }
                        }
                      ));
                  }
                  switch (t.status) {
                    case 'fulfilled':
                      return t.value;
                    case 'rejected':
                      throw (ex((e = t.reason)), e);
                  }
                  throw ((lT = t), lS);
              }
            }
            function eC(e) {
              try {
                return (0, e._init)(e._payload);
              } catch (e) {
                throw null !== e &&
                  'object' == typeof e &&
                  'function' == typeof e.then
                  ? ((lT = e), lS)
                  : e;
              }
            }
            function ey() {
              if (null === lT) throw Error(r(459));
              var e = lT;
              return ((lT = null), e);
            }
            function ex(e) {
              if (e === lS || e === lM) throw Error(r(483));
            }
            function ew(e) {
              var t = lI;
              return ((lI += 1), null === lR && (lR = []), eb(lR, e, t));
            }
            function eS(e, t) {
              e.ref = void 0 !== (t = t.props.ref) ? t : null;
            }
            function eE(e, t) {
              throw t.$$typeof === aa
                ? Error(r(525))
                : Error(
                    r(
                      31,
                      '[object Object]' ===
                        (e = Object.prototype.toString.call(t))
                        ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                        : e
                    )
                  );
            }
            function eM(e) {
              function n(t, n) {
                if (e) {
                  var r = t.deletions;
                  null === r
                    ? ((t.deletions = [n]), (t.flags |= 16))
                    : r.push(n);
                }
              }
              function a(t, r) {
                if (!e) return null;
                for (; null !== r; ) (n(t, r), (r = r.sibling));
                return null;
              }
              function i(e) {
                for (var t = new Map(); null !== e; )
                  (null !== e.key ? t.set(e.key, e) : t.set(e.index, e),
                    (e = e.sibling));
                return t;
              }
              function o(e, t) {
                return (((e = rq(e, t)).index = 0), (e.sibling = null), e);
              }
              function s(t, n, r) {
                return (
                  (t.index = r),
                  e
                    ? null !== (r = t.alternate)
                      ? (r = r.index) < n
                        ? ((t.flags |= 0x4000002), n)
                        : r
                      : ((t.flags |= 0x4000002), n)
                    : ((t.flags |= 1048576), n)
                );
              }
              function u(t) {
                return (e && null === t.alternate && (t.flags |= 0x4000002), t);
              }
              function c(e, t, n, r) {
                return (
                  null === t || 6 !== t.tag
                    ? ((t = r1(n, e.mode, r)).return = e)
                    : ((t = o(t, n)).return = e),
                  t
                );
              }
              function d(e, t, n, r) {
                var a = n.type;
                return a === al
                  ? p(e, t, n.props.children, r, n.key)
                  : (null !== t &&
                    (t.elementType === a ||
                      ('object' == typeof a &&
                        null !== a &&
                        a.$$typeof === ag &&
                        eC(a) === t.type))
                      ? eS((t = o(t, n.props)), n)
                      : eS(
                          (t = r$(n.type, n.key, n.props, null, e.mode, r)),
                          n
                        ),
                    (t.return = e),
                    t);
              }
              function f(e, t, n, r) {
                return (
                  null === t ||
                  4 !== t.tag ||
                  t.stateNode.containerInfo !== n.containerInfo ||
                  t.stateNode.implementation !== n.implementation
                    ? ((t = r3(n, e.mode, r)).return = e)
                    : ((t = o(t, n.children || [])).return = e),
                  t
                );
              }
              function p(e, t, n, r, a) {
                return (
                  null === t || 7 !== t.tag
                    ? ((t = r0(n, e.mode, r, a)).return = e)
                    : ((t = o(t, n)).return = e),
                  t
                );
              }
              function h(e, t, n) {
                if (
                  ('string' == typeof t && '' !== t) ||
                  'number' == typeof t ||
                  'bigint' == typeof t
                )
                  return (((t = r1('' + t, e.mode, n)).return = e), t);
                if ('object' == typeof t && null !== t) {
                  switch (t.$$typeof) {
                    case ai:
                      return (
                        eS(
                          (n = r$(t.type, t.key, t.props, null, e.mode, n)),
                          t
                        ),
                        (n.return = e),
                        n
                      );
                    case ao:
                      return (((t = r3(t, e.mode, n)).return = e), t);
                    case ag:
                      return h(e, (t = eC(t)), n);
                  }
                  if (aC(t) || l(t))
                    return (((t = r0(t, e.mode, n, null)).return = e), t);
                  if ('function' == typeof t.then) return h(e, ew(t), n);
                  if (t.$$typeof === ad) return h(e, et(e, t), n);
                  eE(e, t);
                }
                return null;
              }
              function m(e, t, n, r) {
                var a = null !== t ? t.key : null;
                if (
                  ('string' == typeof n && '' !== n) ||
                  'number' == typeof n ||
                  'bigint' == typeof n
                )
                  return null !== a ? null : c(e, t, '' + n, r);
                if ('object' == typeof n && null !== n) {
                  switch (n.$$typeof) {
                    case ai:
                      return n.key === a ? d(e, t, n, r) : null;
                    case ao:
                      return n.key === a ? f(e, t, n, r) : null;
                    case ag:
                      return m(e, t, (n = eC(n)), r);
                  }
                  if (aC(n) || l(n))
                    return null !== a ? null : p(e, t, n, r, null);
                  if ('function' == typeof n.then) return m(e, t, ew(n), r);
                  if (n.$$typeof === ad) return m(e, t, et(e, n), r);
                  eE(e, n);
                }
                return null;
              }
              function g(e, t, n, r, a) {
                if (
                  ('string' == typeof r && '' !== r) ||
                  'number' == typeof r ||
                  'bigint' == typeof r
                )
                  return c(t, (e = e.get(n) || null), '' + r, a);
                if ('object' == typeof r && null !== r) {
                  switch (r.$$typeof) {
                    case ai:
                      return d(
                        t,
                        (e = e.get(null === r.key ? n : r.key) || null),
                        r,
                        a
                      );
                    case ao:
                      return f(
                        t,
                        (e = e.get(null === r.key ? n : r.key) || null),
                        r,
                        a
                      );
                    case ag:
                      return g(e, t, n, (r = eC(r)), a);
                  }
                  if (aC(r) || l(r))
                    return p(t, (e = e.get(n) || null), r, a, null);
                  if ('function' == typeof r.then) return g(e, t, n, ew(r), a);
                  if (r.$$typeof === ad) return g(e, t, n, et(t, r), a);
                  eE(t, r);
                }
                return null;
              }
              return function (c, d, f, p) {
                try {
                  lI = 0;
                  var A = (function t(c, d, f, p) {
                    if (
                      ('object' == typeof f &&
                        null !== f &&
                        f.type === al &&
                        null === f.key &&
                        (f = f.props.children),
                      'object' == typeof f && null !== f)
                    ) {
                      switch (f.$$typeof) {
                        case ai:
                          n: {
                            for (var A = f.key; null !== d; ) {
                              if (d.key === A) {
                                if ((A = f.type) === al) {
                                  if (7 === d.tag) {
                                    (a(c, d.sibling),
                                      ((p = o(d, f.props.children)).return = c),
                                      (c = p));
                                    break n;
                                  }
                                } else if (
                                  d.elementType === A ||
                                  ('object' == typeof A &&
                                    null !== A &&
                                    A.$$typeof === ag &&
                                    eC(A) === d.type)
                                ) {
                                  (a(c, d.sibling),
                                    eS((p = o(d, f.props)), f),
                                    (p.return = c),
                                    (c = p));
                                  break n;
                                }
                                a(c, d);
                                break;
                              }
                              (n(c, d), (d = d.sibling));
                            }
                            (f.type === al
                              ? ((p = r0(
                                  f.props.children,
                                  c.mode,
                                  p,
                                  f.key
                                )).return = c)
                              : (eS(
                                  (p = r$(
                                    f.type,
                                    f.key,
                                    f.props,
                                    null,
                                    c.mode,
                                    p
                                  )),
                                  f
                                ),
                                (p.return = c)),
                              (c = p));
                          }
                          return u(c);
                        case ao:
                          n: {
                            for (A = f.key; null !== d; ) {
                              if (d.key === A)
                                if (
                                  4 === d.tag &&
                                  d.stateNode.containerInfo ===
                                    f.containerInfo &&
                                  d.stateNode.implementation ===
                                    f.implementation
                                ) {
                                  (a(c, d.sibling),
                                    ((p = o(d, f.children || [])).return = c),
                                    (c = p));
                                  break n;
                                } else {
                                  a(c, d);
                                  break;
                                }
                              (n(c, d), (d = d.sibling));
                            }
                            (((p = r3(f, c.mode, p)).return = c), (c = p));
                          }
                          return u(c);
                        case ag:
                          return t(c, d, (f = eC(f)), p);
                      }
                      if (aC(f))
                        return (function (t, r, o, l) {
                          for (
                            var u = null,
                              c = null,
                              d = r,
                              f = (r = 0),
                              p = null;
                            null !== d && f < o.length;
                            f++
                          ) {
                            d.index > f
                              ? ((p = d), (d = null))
                              : (p = d.sibling);
                            var A = m(t, d, o[f], l);
                            if (null === A) {
                              null === d && (d = p);
                              break;
                            }
                            (e && d && null === A.alternate && n(t, d),
                              (r = s(A, r, f)),
                              null === c ? (u = A) : (c.sibling = A),
                              (c = A),
                              (d = p));
                          }
                          if (f === o.length)
                            return (a(t, d), ln && R(t, f), u);
                          if (null === d) {
                            for (; f < o.length; f++)
                              null !== (d = h(t, o[f], l)) &&
                                ((r = s(d, r, f)),
                                null === c ? (u = d) : (c.sibling = d),
                                (c = d));
                            return (ln && R(t, f), u);
                          }
                          for (d = i(d); f < o.length; f++)
                            null !== (p = g(d, t, f, o[f], l)) &&
                              (e &&
                                null !== p.alternate &&
                                d.delete(null === p.key ? f : p.key),
                              (r = s(p, r, f)),
                              null === c ? (u = p) : (c.sibling = p),
                              (c = p));
                          return (
                            e &&
                              d.forEach(function (e) {
                                return n(t, e);
                              }),
                            ln && R(t, f),
                            u
                          );
                        })(c, d, f, p);
                      if (l(f)) {
                        if ('function' != typeof (A = l(f)))
                          throw Error(r(150));
                        return (function (t, o, l, u) {
                          if (null == l) throw Error(r(151));
                          for (
                            var c = null,
                              d = null,
                              f = o,
                              p = (o = 0),
                              A = null,
                              v = l.next();
                            null !== f && !v.done;
                            p++, v = l.next()
                          ) {
                            f.index > p
                              ? ((A = f), (f = null))
                              : (A = f.sibling);
                            var B = m(t, f, v.value, u);
                            if (null === B) {
                              null === f && (f = A);
                              break;
                            }
                            (e && f && null === B.alternate && n(t, f),
                              (o = s(B, o, p)),
                              null === d ? (c = B) : (d.sibling = B),
                              (d = B),
                              (f = A));
                          }
                          if (v.done) return (a(t, f), ln && R(t, p), c);
                          if (null === f) {
                            for (; !v.done; p++, v = l.next())
                              null !== (v = h(t, v.value, u)) &&
                                ((o = s(v, o, p)),
                                null === d ? (c = v) : (d.sibling = v),
                                (d = v));
                            return (ln && R(t, p), c);
                          }
                          for (f = i(f); !v.done; p++, v = l.next())
                            null !== (v = g(f, t, p, v.value, u)) &&
                              (e &&
                                null !== v.alternate &&
                                f.delete(null === v.key ? p : v.key),
                              (o = s(v, o, p)),
                              null === d ? (c = v) : (d.sibling = v),
                              (d = v));
                          return (
                            e &&
                              f.forEach(function (e) {
                                return n(t, e);
                              }),
                            ln && R(t, p),
                            c
                          );
                        })(c, d, (f = A.call(f)), p);
                      }
                      if ('function' == typeof f.then) return t(c, d, ew(f), p);
                      if (f.$$typeof === ad) return t(c, d, et(c, f), p);
                      eE(c, f);
                    }
                    return ('string' == typeof f && '' !== f) ||
                      'number' == typeof f ||
                      'bigint' == typeof f
                      ? ((f = '' + f),
                        null !== d && 6 === d.tag
                          ? (a(c, d.sibling), ((p = o(d, f)).return = c))
                          : (a(c, d), ((p = r1(f, c.mode, p)).return = c)),
                        u((c = p)))
                      : a(c, d);
                  })(c, d, f, p);
                  return ((lR = null), A);
                } catch (e) {
                  if (e === lS || e === lM) throw e;
                  var v = t(29, e, null, c.mode);
                  return ((v.lanes = p), (v.return = c), v);
                } finally {
                }
              };
            }
            function eF() {
              for (var e = lk, t = (lP = lk = 0); t < e; ) {
                var n = l_[t];
                l_[t++] = null;
                var r = l_[t];
                l_[t++] = null;
                var a = l_[t];
                l_[t++] = null;
                var i = l_[t];
                if (((l_[t++] = null), null !== r && null !== a)) {
                  var o = r.pending;
                  (null === o
                    ? (a.next = a)
                    : ((a.next = o.next), (o.next = a)),
                    (r.pending = a));
                }
                0 !== i && eG(n, a, i);
              }
            }
            function eT(e, t, n, r) {
              ((l_[lk++] = e),
                (l_[lk++] = t),
                (l_[lk++] = n),
                (l_[lk++] = r),
                (lP |= r),
                (e.lanes |= r),
                null !== (e = e.alternate) && (e.lanes |= r));
            }
            function eR(e, t, n, r) {
              return (eT(e, t, n, r), eD(e));
            }
            function eI(e, t) {
              return (eT(e, null, null, t), eD(e));
            }
            function eG(e, t, n) {
              e.lanes |= n;
              var r = e.alternate;
              null !== r && (r.lanes |= n);
              for (var a = !1, i = e.return; null !== i; )
                ((i.childLanes |= n),
                  null !== (r = i.alternate) && (r.childLanes |= n),
                  22 === i.tag &&
                    (null === (e = i.stateNode) ||
                      1 & e._visibility ||
                      (a = !0)),
                  (e = i),
                  (i = i.return));
              return 3 === e.tag
                ? ((i = e.stateNode),
                  a &&
                    null !== t &&
                    ((a = 31 - oM(n)),
                    null === (r = (e = i.hiddenUpdates)[a])
                      ? (e[a] = [t])
                      : r.push(t),
                    (t.lane = 0x20000000 | n)),
                  i)
                : null;
            }
            function eD(e) {
              if (50 < sX) throw ((sX = 0), (sV = null), Error(r(185)));
              for (var t = e.return; null !== t; ) t = (e = t).return;
              return 3 === e.tag ? e.stateNode : null;
            }
            function e_(e) {
              e.updateQueue = {
                baseState: e.memoizedState,
                firstBaseUpdate: null,
                lastBaseUpdate: null,
                shared: { pending: null, lanes: 0, hiddenCallbacks: null },
                callbacks: null,
              };
            }
            function ek(e, t) {
              ((e = e.updateQueue),
                t.updateQueue === e &&
                  (t.updateQueue = {
                    baseState: e.baseState,
                    firstBaseUpdate: e.firstBaseUpdate,
                    lastBaseUpdate: e.lastBaseUpdate,
                    shared: e.shared,
                    callbacks: null,
                  }));
            }
            function eP(e) {
              return {
                lane: e,
                tag: 0,
                payload: null,
                callback: null,
                next: null,
              };
            }
            function eL(e, t, n) {
              var r = e.updateQueue;
              if (null === r) return null;
              if (((r = r.shared), (2 & sg) != 0)) {
                var a = r.pending;
                return (
                  null === a ? (t.next = t) : ((t.next = a.next), (a.next = t)),
                  (r.pending = t),
                  (t = eD(e)),
                  eG(e, null, n),
                  t
                );
              }
              return (eT(e, r, t, n), eD(e));
            }
            function eN(e, t, n) {
              if (
                null !== (t = t.updateQueue) &&
                ((t = t.shared), (4194048 & n) != 0)
              ) {
                var r = t.lanes;
                ((r &= e.pendingLanes), (n |= r), (t.lanes = n), B(e, n));
              }
            }
            function eH(e, t) {
              var n = e.updateQueue,
                r = e.alternate;
              if (null !== r && n === (r = r.updateQueue)) {
                var a = null,
                  i = null;
                if (null !== (n = n.firstBaseUpdate)) {
                  do {
                    var o = {
                      lane: n.lane,
                      tag: n.tag,
                      payload: n.payload,
                      callback: null,
                      next: null,
                    };
                    (null === i ? (a = i = o) : (i = i.next = o), (n = n.next));
                  } while (null !== n);
                  null === i ? (a = i = t) : (i = i.next = t);
                } else a = i = t;
                ((n = {
                  baseState: r.baseState,
                  firstBaseUpdate: a,
                  lastBaseUpdate: i,
                  shared: r.shared,
                  callbacks: r.callbacks,
                }),
                  (e.updateQueue = n));
                return;
              }
              (null === (e = n.lastBaseUpdate)
                ? (n.firstBaseUpdate = t)
                : (e.next = t),
                (n.lastBaseUpdate = t));
            }
            function eU() {
              if (lN) {
                var e = ly;
                if (null !== e) throw e;
              }
            }
            function eO(e, t, n, r) {
              lN = !1;
              var a = e.updateQueue;
              lL = !1;
              var i = a.firstBaseUpdate,
                o = a.lastBaseUpdate,
                l = a.shared.pending;
              if (null !== l) {
                a.shared.pending = null;
                var s = l,
                  u = s.next;
                ((s.next = null), null === o ? (i = u) : (o.next = u), (o = s));
                var c = e.alternate;
                null !== c &&
                  (l = (c = c.updateQueue).lastBaseUpdate) !== o &&
                  (null === l ? (c.firstBaseUpdate = u) : (l.next = u),
                  (c.lastBaseUpdate = s));
              }
              if (null !== i) {
                var d = a.baseState;
                for (o = 0, c = u = s = null, l = i; ; ) {
                  var f = -0x20000001 & l.lane,
                    p = f !== l.lane;
                  if (p ? (sB & f) === f : (r & f) === f) {
                    (0 !== f && f === lC && (lN = !0),
                      null !== c &&
                        (c = c.next =
                          {
                            lane: 0,
                            tag: l.tag,
                            payload: l.payload,
                            callback: null,
                            next: null,
                          }));
                    n: {
                      var h = e,
                        m = l;
                      switch (((f = t), m.tag)) {
                        case 1:
                          if ('function' == typeof (h = m.payload)) {
                            d = h.call(n, d, f);
                            break n;
                          }
                          d = h;
                          break n;
                        case 3:
                          h.flags = (-65537 & h.flags) | 128;
                        case 0:
                          if (
                            null ==
                            (f =
                              'function' == typeof (h = m.payload)
                                ? h.call(n, d, f)
                                : h)
                          )
                            break n;
                          d = ar({}, d, f);
                          break n;
                        case 2:
                          lL = !0;
                      }
                    }
                    null !== (f = l.callback) &&
                      ((e.flags |= 64),
                      p && (e.flags |= 8192),
                      null === (p = a.callbacks)
                        ? (a.callbacks = [f])
                        : p.push(f));
                  } else
                    ((p = {
                      lane: f,
                      tag: l.tag,
                      payload: l.payload,
                      callback: l.callback,
                      next: null,
                    }),
                      null === c ? ((u = c = p), (s = d)) : (c = c.next = p),
                      (o |= f));
                  if (null === (l = l.next)) {
                    if (null === (l = a.shared.pending)) break;
                    ((l = (p = l).next),
                      (p.next = null),
                      (a.lastBaseUpdate = p),
                      (a.shared.pending = null));
                  }
                }
                (null === c && (s = d),
                  (a.baseState = s),
                  (a.firstBaseUpdate = u),
                  (a.lastBaseUpdate = c),
                  null === i && (a.shared.lanes = 0),
                  (sM |= o),
                  (e.lanes = o),
                  (e.memoizedState = d));
              }
            }
            function ej(e, t) {
              if ('function' != typeof e) throw Error(r(191, e));
              e.call(t);
            }
            function eJ(e, t) {
              var n = e.callbacks;
              if (null !== n)
                for (e.callbacks = null, e = 0; e < n.length; e++) ej(n[e], t);
            }
            function ez(e, t) {
              (d(lU, (e = sS)), d(lH, t), (sS = e | t.baseLanes));
            }
            function eK() {
              (d(lU, sS), d(lH, lH.current));
            }
            function eQ() {
              ((sS = lU.current), c(lH), c(lU));
            }
            function eX(e) {
              var t = e.alternate;
              (d(lJ, 1 & lJ.current),
                d(lO, e),
                null === lj &&
                  (null === t ||
                    null !== lH.current ||
                    null !== t.memoizedState) &&
                  (lj = e));
            }
            function eV(e) {
              (d(lJ, lJ.current), d(lO, e), null === lj && (lj = e));
            }
            function eW(e) {
              22 === e.tag
                ? (d(lJ, lJ.current), d(lO, e), null === lj && (lj = e))
                : eY();
            }
            function eY() {
              (d(lJ, lJ.current), d(lO, lO.current));
            }
            function eq(e) {
              (c(lO), lj === e && (lj = null), c(lJ));
            }
            function eZ(e) {
              for (var t = e; null !== t; ) {
                if (13 === t.tag) {
                  var n = t.memoizedState;
                  if (
                    null !== n &&
                    (null === (n = n.dehydrated) || iR(n) || iI(n))
                  )
                    return t;
                } else if (
                  19 === t.tag &&
                  ('forwards' === t.memoizedProps.revealOrder ||
                    'backwards' === t.memoizedProps.revealOrder ||
                    'unstable_legacy-backwards' ===
                      t.memoizedProps.revealOrder ||
                    'together' === t.memoizedProps.revealOrder)
                ) {
                  if ((128 & t.flags) != 0) return t;
                } else if (null !== t.child) {
                  ((t.child.return = t), (t = t.child));
                  continue;
                }
                if (t === e) break;
                for (; null === t.sibling; ) {
                  if (null === t.return || t.return === e) return null;
                  t = t.return;
                }
                ((t.sibling.return = t.return), (t = t.sibling));
              }
              return null;
            }
            function e$() {
              throw Error(r(321));
            }
            function e0(e, t) {
              if (null === t) return !1;
              for (var n = 0; n < t.length && n < e.length; n++)
                if (!oQ(e[n], t[n])) return !1;
              return !0;
            }
            function e1(e, t, n, r, a, i) {
              return (
                (lz = i),
                (lK = t),
                (t.memoizedState = null),
                (t.updateQueue = null),
                (t.lanes = 0),
                (ay.H = null === e || null === e.memoizedState ? l2 : l3),
                (lY = !1),
                (i = n(r, a)),
                (lY = !1),
                lW && (i = e3(t, n, r, a)),
                e2(e),
                i
              );
            }
            function e2(e) {
              ay.H = l1;
              var t = null !== lQ && null !== lQ.next;
              if (
                ((lz = 0),
                (lX = lQ = lK = null),
                (lV = !1),
                (lZ = 0),
                (l$ = null),
                t)
              )
                throw Error(r(300));
              null === e ||
                l6 ||
                (null !== (e = e.dependencies) && Z(e) && (l6 = !0));
            }
            function e3(e, t, n, a) {
              lK = e;
              var i = 0;
              do {
                if ((lW && (l$ = null), (lZ = 0), (lW = !1), 25 <= i))
                  throw Error(r(301));
                if (((i += 1), (lX = lQ = null), null != e.updateQueue)) {
                  var o = e.updateQueue;
                  ((o.lastEffect = null),
                    (o.events = null),
                    (o.stores = null),
                    null != o.memoCache && (o.memoCache.index = 0));
                }
                ((ay.H = l9), (o = t(n, a)));
              } while (lW);
              return o;
            }
            function e9() {
              var e = ay.H,
                t = e.useState()[0];
              return (
                (t = 'function' == typeof t.then ? tt(t) : t),
                (e = e.useState()[0]),
                (null !== lQ ? lQ.memoizedState : null) !== e &&
                  (lK.flags |= 1024),
                t
              );
            }
            function e8() {
              var e = 0 !== lq;
              return ((lq = 0), e);
            }
            function e4(e, t, n) {
              ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~n));
            }
            function e6(e) {
              if (lV) {
                for (e = e.memoizedState; null !== e; ) {
                  var t = e.queue;
                  (null !== t && (t.pending = null), (e = e.next));
                }
                lV = !1;
              }
              ((lz = 0),
                (lX = lQ = lK = null),
                (lW = !1),
                (lZ = lq = 0),
                (l$ = null));
            }
            function e5() {
              var e = {
                memoizedState: null,
                baseState: null,
                baseQueue: null,
                queue: null,
                next: null,
              };
              return (
                null === lX ? (lK.memoizedState = lX = e) : (lX = lX.next = e),
                lX
              );
            }
            function e7() {
              if (null === lQ) {
                var e = lK.alternate;
                e = null !== e ? e.memoizedState : null;
              } else e = lQ.next;
              var t = null === lX ? lK.memoizedState : lX.next;
              if (null !== t) ((lX = t), (lQ = e));
              else {
                if (null === e)
                  throw null === lK.alternate ? Error(r(467)) : Error(r(310));
                ((e = {
                  memoizedState: (lQ = e).memoizedState,
                  baseState: lQ.baseState,
                  baseQueue: lQ.baseQueue,
                  queue: lQ.queue,
                  next: null,
                }),
                  null === lX
                    ? (lK.memoizedState = lX = e)
                    : (lX = lX.next = e));
              }
              return lX;
            }
            function te() {
              return {
                lastEffect: null,
                events: null,
                stores: null,
                memoCache: null,
              };
            }
            function tt(e) {
              var t = lZ;
              return (
                (lZ += 1),
                null === l$ && (l$ = []),
                (e = eb(l$, e, t)),
                (t = lK),
                (null === lX ? t.memoizedState : lX.next) === null &&
                  (ay.H =
                    null === (t = t.alternate) || null === t.memoizedState
                      ? l2
                      : l3),
                e
              );
            }
            function tn(e) {
              if (null !== e && 'object' == typeof e) {
                if ('function' == typeof e.then) return tt(e);
                if (e.$$typeof === ad) return ee(e);
              }
              throw Error(r(438, String(e)));
            }
            function tr(e) {
              var t = null,
                n = lK.updateQueue;
              if ((null !== n && (t = n.memoCache), null == t)) {
                var r = lK.alternate;
                null !== r &&
                  null !== (r = r.updateQueue) &&
                  null != (r = r.memoCache) &&
                  (t = {
                    data: r.data.map(function (e) {
                      return e.slice();
                    }),
                    index: 0,
                  });
              }
              if (
                (null == t && (t = { data: [], index: 0 }),
                null === n && ((n = te()), (lK.updateQueue = n)),
                (n.memoCache = t),
                void 0 === (n = t.data[t.index]))
              )
                for (n = t.data[t.index] = Array(e), r = 0; r < e; r++)
                  n[r] = av;
              return (t.index++, n);
            }
            function ta(e, t) {
              return 'function' == typeof t ? t(e) : t;
            }
            function ti(e) {
              return to(e7(), lQ, e);
            }
            function to(e, t, n) {
              var a = e.queue;
              if (null === a) throw Error(r(311));
              a.lastRenderedReducer = n;
              var i = e.baseQueue,
                o = a.pending;
              if (null !== o) {
                if (null !== i) {
                  var l = i.next;
                  ((i.next = o.next), (o.next = l));
                }
                ((t.baseQueue = i = o), (a.pending = null));
              }
              if (((o = e.baseState), null === i)) e.memoizedState = o;
              else {
                t = i.next;
                var s = (l = null),
                  u = null,
                  c = t,
                  d = !1;
                do {
                  var f = -0x20000001 & c.lane;
                  if (f !== c.lane ? (sB & f) === f : (lz & f) === f) {
                    var p = c.revertLane;
                    if (0 === p)
                      (null !== u &&
                        (u = u.next =
                          {
                            lane: 0,
                            revertLane: 0,
                            gesture: null,
                            action: c.action,
                            hasEagerState: c.hasEagerState,
                            eagerState: c.eagerState,
                            next: null,
                          }),
                        f === lC && (d = !0));
                    else if ((lz & p) === p) {
                      ((c = c.next), p === lC && (d = !0));
                      continue;
                    } else
                      ((f = {
                        lane: 0,
                        revertLane: c.revertLane,
                        gesture: null,
                        action: c.action,
                        hasEagerState: c.hasEagerState,
                        eagerState: c.eagerState,
                        next: null,
                      }),
                        null === u ? ((s = u = f), (l = o)) : (u = u.next = f),
                        (lK.lanes |= p),
                        (sM |= p));
                    ((f = c.action),
                      lY && n(o, f),
                      (o = c.hasEagerState ? c.eagerState : n(o, f)));
                  } else
                    ((p = {
                      lane: f,
                      revertLane: c.revertLane,
                      gesture: c.gesture,
                      action: c.action,
                      hasEagerState: c.hasEagerState,
                      eagerState: c.eagerState,
                      next: null,
                    }),
                      null === u ? ((s = u = p), (l = o)) : (u = u.next = p),
                      (lK.lanes |= f),
                      (sM |= f));
                  c = c.next;
                } while (null !== c && c !== t);
                if (
                  (null === u ? (l = o) : (u.next = s),
                  !oQ(o, e.memoizedState) &&
                    ((l6 = !0), d && null !== (n = ly)))
                )
                  throw n;
                ((e.memoizedState = o),
                  (e.baseState = l),
                  (e.baseQueue = u),
                  (a.lastRenderedState = o));
              }
              return (
                null === i && (a.lanes = 0),
                [e.memoizedState, a.dispatch]
              );
            }
            function tl(e) {
              var t = e7(),
                n = t.queue;
              if (null === n) throw Error(r(311));
              n.lastRenderedReducer = e;
              var a = n.dispatch,
                i = n.pending,
                o = t.memoizedState;
              if (null !== i) {
                n.pending = null;
                var l = (i = i.next);
                do ((o = e(o, l.action)), (l = l.next));
                while (l !== i);
                (oQ(o, t.memoizedState) || (l6 = !0),
                  (t.memoizedState = o),
                  null === t.baseQueue && (t.baseState = o),
                  (n.lastRenderedState = o));
              }
              return [o, a];
            }
            function ts(e, t, n) {
              var a = lK,
                i = e7(),
                o = ln;
              if (o) {
                if (void 0 === n) throw Error(r(407));
                n = n();
              } else n = t();
              var l = !oQ((lQ || i).memoizedState, n);
              if (
                (l && ((i.memoizedState = n), (l6 = !0)),
                (i = i.queue),
                tD(td.bind(null, a, i, e), [e]),
                i.getSnapshot !== t ||
                  l ||
                  (null !== lX && 1 & lX.memoizedState.tag))
              ) {
                if (
                  ((a.flags |= 2048),
                  tF(9, { destroy: void 0 }, tc.bind(null, a, i, n, t), null),
                  null === sA)
                )
                  throw Error(r(349));
                o || (127 & lz) != 0 || tu(a, t, n);
              }
              return n;
            }
            function tu(e, t, n) {
              ((e.flags |= 16384),
                (e = { getSnapshot: t, value: n }),
                null === (t = lK.updateQueue)
                  ? ((t = te()), (lK.updateQueue = t), (t.stores = [e]))
                  : null === (n = t.stores)
                    ? (t.stores = [e])
                    : n.push(e));
            }
            function tc(e, t, n, r) {
              ((t.value = n), (t.getSnapshot = r), tf(t) && tp(e));
            }
            function td(e, t, n) {
              return n(function () {
                tf(t) && tp(e);
              });
            }
            function tf(e) {
              var t = e.getSnapshot;
              e = e.value;
              try {
                var n = t();
                return !oQ(e, n);
              } catch {
                return !0;
              }
            }
            function tp(e) {
              var t = eI(e, 2);
              null !== t && rA(t, e, 2);
            }
            function th(e) {
              var t = e5();
              if ('function' == typeof e) {
                var n = e;
                if (((e = n()), lY)) {
                  S(!0);
                  try {
                    n();
                  } finally {
                    S(!1);
                  }
                }
              }
              return (
                (t.memoizedState = t.baseState = e),
                (t.queue = {
                  pending: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: ta,
                  lastRenderedState: e,
                }),
                t
              );
            }
            function tm(e, t, n, r) {
              return (
                (e.baseState = n),
                to(e, lQ, 'function' == typeof r ? r : ta)
              );
            }
            function tg(e, t, n, a, i) {
              if (t0(e)) throw Error(r(485));
              if (null !== (e = t.action)) {
                var o = {
                  payload: i,
                  action: e,
                  next: null,
                  isTransition: !0,
                  status: 'pending',
                  value: null,
                  reason: null,
                  listeners: [],
                  then: function (e) {
                    o.listeners.push(e);
                  },
                };
                (null !== ay.T ? n(!0) : (o.isTransition = !1),
                  a(o),
                  null === (n = t.pending)
                    ? ((o.next = t.pending = o), tA(t, o))
                    : ((o.next = n.next), (t.pending = n.next = o)));
              }
            }
            function tA(e, t) {
              var n = t.action,
                r = t.payload,
                a = e.state;
              if (t.isTransition) {
                var i = ay.T,
                  o = {};
                ay.T = o;
                try {
                  var l = n(a, r),
                    s = ay.S;
                  (null !== s && s(o, l), tv(e, t, l));
                } catch (n) {
                  tb(e, t, n);
                } finally {
                  (null !== i && null !== o.types && (i.types = o.types),
                    (ay.T = i));
                }
              } else
                try {
                  ((i = n(a, r)), tv(e, t, i));
                } catch (n) {
                  tb(e, t, n);
                }
            }
            function tv(e, t, n) {
              null !== n && 'object' == typeof n && 'function' == typeof n.then
                ? n.then(
                    function (n) {
                      tB(e, t, n);
                    },
                    function (n) {
                      return tb(e, t, n);
                    }
                  )
                : tB(e, t, n);
            }
            function tB(e, t, n) {
              ((t.status = 'fulfilled'),
                (t.value = n),
                tC(t),
                (e.state = n),
                null !== (t = e.pending) &&
                  ((n = t.next) === t
                    ? (e.pending = null)
                    : ((n = n.next), (t.next = n), tA(e, n))));
            }
            function tb(e, t, n) {
              var r = e.pending;
              if (((e.pending = null), null !== r)) {
                r = r.next;
                do
                  ((t.status = 'rejected'),
                    (t.reason = n),
                    tC(t),
                    (t = t.next));
                while (t !== r);
              }
              e.action = null;
            }
            function tC(e) {
              e = e.listeners;
              for (var t = 0; t < e.length; t++) (0, e[t])();
            }
            function ty(e, t) {
              return t;
            }
            function tx(e, t) {
              if (ln) {
                var n = sA.formState;
                if (null !== n) {
                  n: {
                    var r = lK;
                    if (ln) {
                      if (lt) {
                        var a = i_(lt, la);
                        if (a) {
                          ((lt = iP(a)), (r = ik(a)));
                          break n;
                        }
                      }
                      U(r);
                    }
                    r = !1;
                  }
                  r && (t = n[0]);
                }
              }
              (((n = e5()).memoizedState = n.baseState = t),
                (r = {
                  pending: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: ty,
                  lastRenderedState: t,
                }),
                (n.queue = r),
                (n = tq.bind(null, lK, r)),
                (r.dispatch = n),
                (r = th(!1)));
              var i = t$.bind(null, lK, !1, r.queue);
              return (
                (r = e5()),
                (a = { state: t, dispatch: null, action: e, pending: null }),
                (r.queue = a),
                (n = tg.bind(null, lK, a, i, n)),
                (a.dispatch = n),
                (r.memoizedState = e),
                [t, n, !1]
              );
            }
            function tw(e) {
              return tS(e7(), lQ, e);
            }
            function tS(e, t, n) {
              if (
                ((t = to(e, t, ty)[0]),
                (e = ti(ta)[0]),
                'object' == typeof t &&
                  null !== t &&
                  'function' == typeof t.then)
              )
                try {
                  var r = tt(t);
                } catch (e) {
                  throw e === lS ? lM : e;
                }
              else r = t;
              var a = (t = e7()).queue,
                i = a.dispatch;
              return (
                n !== t.memoizedState &&
                  ((lK.flags |= 2048),
                  tF(9, { destroy: void 0 }, tE.bind(null, a, n), null)),
                [r, i, e]
              );
            }
            function tE(e, t) {
              e.action = t;
            }
            function tM(e) {
              var t = e7(),
                n = lQ;
              if (null !== n) return tS(t, n, e);
              (e7(), (t = t.memoizedState));
              var r = (n = e7()).queue.dispatch;
              return ((n.memoizedState = e), [t, r, !1]);
            }
            function tF(e, t, n, r) {
              return (
                (e = { tag: e, create: n, deps: r, inst: t, next: null }),
                null === (t = lK.updateQueue) &&
                  ((t = te()), (lK.updateQueue = t)),
                null === (n = t.lastEffect)
                  ? (t.lastEffect = e.next = e)
                  : ((r = n.next),
                    (n.next = e),
                    (e.next = r),
                    (t.lastEffect = e)),
                e
              );
            }
            function tT() {
              return e7().memoizedState;
            }
            function tR(e, t, n, r) {
              var a = e5();
              ((lK.flags |= e),
                (a.memoizedState = tF(
                  1 | t,
                  { destroy: void 0 },
                  n,
                  void 0 === r ? null : r
                )));
            }
            function tI(e, t, n, r) {
              var a = e7();
              r = void 0 === r ? null : r;
              var i = a.memoizedState.inst;
              null !== lQ && null !== r && e0(r, lQ.memoizedState.deps)
                ? (a.memoizedState = tF(t, i, n, r))
                : ((lK.flags |= e), (a.memoizedState = tF(1 | t, i, n, r)));
            }
            function tG(e, t) {
              tR(8390656, 8, e, t);
            }
            function tD(e, t) {
              tI(2048, 8, e, t);
            }
            function t_(e) {
              var t = e7().memoizedState;
              return (
                (function (e) {
                  lK.flags |= 4;
                  var t = lK.updateQueue;
                  if (null === t)
                    ((t = te()), (lK.updateQueue = t), (t.events = [e]));
                  else {
                    var n = t.events;
                    null === n ? (t.events = [e]) : n.push(e);
                  }
                })({ ref: t, nextImpl: e }),
                function () {
                  if ((2 & sg) != 0) throw Error(r(440));
                  return t.impl.apply(void 0, arguments);
                }
              );
            }
            function tk(e, t) {
              return tI(4, 2, e, t);
            }
            function tP(e, t) {
              return tI(4, 4, e, t);
            }
            function tL(e, t) {
              if ('function' == typeof t) {
                var n = t((e = e()));
                return function () {
                  'function' == typeof n ? n() : t(null);
                };
              }
              if (null != t)
                return (
                  (t.current = e = e()),
                  function () {
                    t.current = null;
                  }
                );
            }
            function tN(e, t, n) {
              ((n = null != n ? n.concat([e]) : null),
                tI(4, 4, tL.bind(null, t, e), n));
            }
            function tH() {}
            function tU(e, t) {
              var n = e7();
              t = void 0 === t ? null : t;
              var r = n.memoizedState;
              return null !== t && e0(t, r[1])
                ? r[0]
                : ((n.memoizedState = [e, t]), e);
            }
            function tO(e, t) {
              var n = e7();
              t = void 0 === t ? null : t;
              var r = n.memoizedState;
              if (null !== t && e0(t, r[1])) return r[0];
              if (((r = e()), lY)) {
                S(!0);
                try {
                  e();
                } finally {
                  S(!1);
                }
              }
              return ((n.memoizedState = [r, t]), r);
            }
            function tj(e, t, n) {
              return void 0 === n ||
                ((0x40000000 & lz) != 0 && (261930 & sB) == 0)
                ? (e.memoizedState = t)
                : ((e.memoizedState = n),
                  (e = rg()),
                  (lK.lanes |= e),
                  (sM |= e),
                  n);
            }
            function tJ(e, t, n, r) {
              return oQ(n, t)
                ? n
                : null !== lH.current
                  ? (oQ((e = tj(e, n, r)), t) || (l6 = !0), e)
                  : (42 & lz) == 0 ||
                      ((0x40000000 & lz) != 0 && (261930 & sB) == 0)
                    ? ((l6 = !0), (e.memoizedState = n))
                    : ((e = rg()), (lK.lanes |= e), (sM |= e), t);
            }
            function tz(e, t, n, r, a) {
              var i = aQ();
              aK(0 !== i && 8 > i ? i : 8);
              var o = ay.T,
                l = {};
              ((ay.T = l), t$(e, !1, t, n));
              try {
                var s = a(),
                  u = ay.S;
                if (
                  (null !== u && u(l, s),
                  null !== s &&
                    'object' == typeof s &&
                    'function' == typeof s.then)
                ) {
                  var c,
                    d,
                    f =
                      ((c = []),
                      (d = {
                        status: 'pending',
                        value: null,
                        reason: null,
                        then: function (e) {
                          c.push(e);
                        },
                      }),
                      s.then(
                        function () {
                          ((d.status = 'fulfilled'), (d.value = r));
                          for (var e = 0; e < c.length; e++) (0, c[e])(r);
                        },
                        function (e) {
                          for (
                            d.status = 'rejected', d.reason = e, e = 0;
                            e < c.length;
                            e++
                          )
                            (0, c[e])(void 0);
                        }
                      ),
                      d);
                  tZ(e, t, f, rm(e));
                } else tZ(e, t, r, rm(e));
              } catch (n) {
                tZ(
                  e,
                  t,
                  { then: function () {}, status: 'rejected', reason: n },
                  rm()
                );
              } finally {
                (aK(i),
                  null !== o && null !== l.types && (o.types = l.types),
                  (ay.T = o));
              }
            }
            function tK(e) {
              var t = e.memoizedState;
              if (null !== t) return t;
              var n = {};
              return (
                ((t = {
                  memoizedState: a3,
                  baseState: a3,
                  baseQueue: null,
                  queue: {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: ta,
                    lastRenderedState: a3,
                  },
                  next: null,
                }).next = {
                  memoizedState: n,
                  baseState: n,
                  baseQueue: null,
                  queue: {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: ta,
                    lastRenderedState: n,
                  },
                  next: null,
                }),
                (e.memoizedState = t),
                null !== (e = e.alternate) && (e.memoizedState = t),
                t
              );
            }
            function tQ() {
              return ee(a9);
            }
            function tX() {
              return e7().memoizedState;
            }
            function tV() {
              return e7().memoizedState;
            }
            function tW(e) {
              for (var t = e.return; null !== t; ) {
                switch (t.tag) {
                  case 24:
                  case 3:
                    var n = rm(),
                      r = eL(t, (e = eP(n)), n);
                    (null !== r && (rA(r, t, n), eN(r, t, n)),
                      (t = { cache: er() }),
                      (e.payload = t));
                    return;
                }
                t = t.return;
              }
            }
            function tY(e, t, n) {
              var r = rm();
              ((n = {
                lane: r,
                revertLane: 0,
                gesture: null,
                action: n,
                hasEagerState: !1,
                eagerState: null,
                next: null,
              }),
                t0(e)
                  ? t1(t, n)
                  : null !== (n = eR(e, t, n, r)) &&
                    (rA(n, e, r), t2(n, t, r)));
            }
            function tq(e, t, n) {
              tZ(e, t, n, rm());
            }
            function tZ(e, t, n, r) {
              var a = {
                lane: r,
                revertLane: 0,
                gesture: null,
                action: n,
                hasEagerState: !1,
                eagerState: null,
                next: null,
              };
              if (t0(e)) t1(t, a);
              else {
                var i = e.alternate;
                if (
                  0 === e.lanes &&
                  (null === i || 0 === i.lanes) &&
                  null !== (i = t.lastRenderedReducer)
                )
                  try {
                    var o = t.lastRenderedState,
                      l = i(o, n);
                    if (((a.hasEagerState = !0), (a.eagerState = l), oQ(l, o)))
                      return (eT(e, t, a, 0), null === sA && eF(), !1);
                  } catch {
                  } finally {
                  }
                if (null !== (n = eR(e, t, a, r)))
                  return (rA(n, e, r), t2(n, t, r), !0);
              }
              return !1;
            }
            function t$(e, t, n, a) {
              if (
                ((a = {
                  lane: 2,
                  revertLane: ep(),
                  gesture: null,
                  action: a,
                  hasEagerState: !1,
                  eagerState: null,
                  next: null,
                }),
                t0(e))
              ) {
                if (t) throw Error(r(479));
              } else null !== (t = eR(e, n, a, 2)) && rA(t, e, 2);
            }
            function t0(e) {
              var t = e.alternate;
              return e === lK || (null !== t && t === lK);
            }
            function t1(e, t) {
              lW = lV = !0;
              var n = e.pending;
              (null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
                (e.pending = t));
            }
            function t2(e, t, n) {
              if ((4194048 & n) != 0) {
                var r = t.lanes;
                ((r &= e.pendingLanes), (t.lanes = n |= r), B(e, n));
              }
            }
            function t3(e, t, n, r) {
              ((n =
                null == (n = n(r, (t = e.memoizedState))) ? t : ar({}, t, n)),
                (e.memoizedState = n),
                0 === e.lanes && (e.updateQueue.baseState = n));
            }
            function t9(e, t, n, r, a, i, o) {
              return 'function' ==
                typeof (e = e.stateNode).shouldComponentUpdate
                ? e.shouldComponentUpdate(r, i, o)
                : !t.prototype ||
                    !t.prototype.isPureReactComponent ||
                    !ev(n, r) ||
                    !ev(a, i);
            }
            function t8(e, t, n, r) {
              ((e = t.state),
                'function' == typeof t.componentWillReceiveProps &&
                  t.componentWillReceiveProps(n, r),
                'function' == typeof t.UNSAFE_componentWillReceiveProps &&
                  t.UNSAFE_componentWillReceiveProps(n, r),
                t.state !== e && l8.enqueueReplaceState(t, t.state, null));
            }
            function t4(e, t) {
              var n = t;
              if ('ref' in t)
                for (var r in ((n = {}), t)) 'ref' !== r && (n[r] = t[r]);
              if ((e = e.defaultProps))
                for (var a in (n === t && (n = ar({}, n)), e))
                  void 0 === n[a] && (n[a] = e[a]);
              return n;
            }
            function t6(e, t) {
              try {
                (0, e.onUncaughtError)(t.value, { componentStack: t.stack });
              } catch (e) {
                setTimeout(function () {
                  throw e;
                });
              }
            }
            function t5(e, t, n) {
              try {
                (0, e.onCaughtError)(n.value, {
                  componentStack: n.stack,
                  errorBoundary: 1 === t.tag ? t.stateNode : null,
                });
              } catch (e) {
                setTimeout(function () {
                  throw e;
                });
              }
            }
            function t7(e, t, n) {
              return (
                ((n = eP(n)).tag = 3),
                (n.payload = { element: null }),
                (n.callback = function () {
                  t6(e, t);
                }),
                n
              );
            }
            function ne(e) {
              return (((e = eP(e)).tag = 3), e);
            }
            function nt(e, t, n, r) {
              var a = n.type.getDerivedStateFromError;
              if ('function' == typeof a) {
                var i = r.value;
                ((e.payload = function () {
                  return a(i);
                }),
                  (e.callback = function () {
                    t5(t, n, r);
                  }));
              }
              var o = n.stateNode;
              null !== o &&
                'function' == typeof o.componentDidCatch &&
                (e.callback = function () {
                  (t5(t, n, r),
                    'function' != typeof a &&
                      (null === sH ? (sH = new Set([this])) : sH.add(this)));
                  var e = r.stack;
                  this.componentDidCatch(r.value, {
                    componentStack: null !== e ? e : '',
                  });
                });
            }
            function nn(e, t, n, r) {
              t.child = null === e ? lD(t, null, n, r) : lG(t, e.child, n, r);
            }
            function nr(e, t, n, r, a) {
              n = n.render;
              var i = t.ref;
              if ('ref' in r) {
                var o = {};
                for (var l in r) 'ref' !== l && (o[l] = r[l]);
              } else o = r;
              return (
                $(t),
                (r = e1(e, t, n, o, i, a)),
                (l = e8()),
                null === e || l6
                  ? (ln && l && G(t), (t.flags |= 1), nn(e, t, r, a), t.child)
                  : (e4(e, t, a), nS(e, t, a))
              );
            }
            function na(e, t, n, r, a) {
              if (null === e) {
                var i = n.type;
                return 'function' != typeof i ||
                  rY(i) ||
                  void 0 !== i.defaultProps ||
                  null !== n.compare
                  ? (((e = r$(n.type, null, r, t, t.mode, a)).ref = t.ref),
                    (e.return = t),
                    (t.child = e))
                  : ((t.tag = 15), (t.type = i), ni(e, t, i, r, a));
              }
              if (((i = e.child), !nE(e, a))) {
                var o = i.memoizedProps;
                if (
                  (n = null !== (n = n.compare) ? n : ev)(o, r) &&
                  e.ref === t.ref
                )
                  return nS(e, t, a);
              }
              return (
                (t.flags |= 1),
                ((e = rq(i, r)).ref = t.ref),
                (e.return = t),
                (t.child = e)
              );
            }
            function ni(e, t, n, r, a) {
              if (null !== e) {
                var i = e.memoizedProps;
                if (ev(i, r) && e.ref === t.ref)
                  if (((l6 = !1), (t.pendingProps = r = i), !nE(e, a)))
                    return ((t.lanes = e.lanes), nS(e, t, a));
                  else (131072 & e.flags) != 0 && (l6 = !0);
              }
              return nf(e, t, n, r, a);
            }
            function no(e, t, n, r) {
              var a = r.children,
                i = null !== e ? e.memoizedState : null;
              if (
                (null === e &&
                  null === t.stateNode &&
                  (t.stateNode = {
                    _visibility: 1,
                    _pendingMarkers: null,
                    _retryCache: null,
                    _transitions: null,
                  }),
                'hidden' === r.mode)
              ) {
                if ((128 & t.flags) != 0) {
                  if (((i = null !== i ? i.baseLanes | n : n), null !== e)) {
                    for (r = t.child = e.child, a = 0; null !== r; )
                      ((a = a | r.lanes | r.childLanes), (r = r.sibling));
                    r = a & ~i;
                  } else ((r = 0), (t.child = null));
                  return ns(e, t, i, n, r);
                }
                if ((0x20000000 & n) == 0)
                  return (
                    (r = t.lanes = 0x20000000),
                    ns(e, t, null !== i ? i.baseLanes | n : n, n, r)
                  );
                ((t.memoizedState = { baseLanes: 0, cachePool: null }),
                  null !== e && eg(t, null !== i ? i.cachePool : null),
                  null !== i ? ez(t, i) : eK(),
                  eW(t));
              } else
                null !== i
                  ? (eg(t, i.cachePool),
                    ez(t, i),
                    eY(),
                    (t.memoizedState = null))
                  : (null !== e && eg(t, null), eK(), eY());
              return (nn(e, t, a, n), t.child);
            }
            function nl(e, t) {
              return (
                (null !== e && 22 === e.tag) ||
                  null !== t.stateNode ||
                  (t.stateNode = {
                    _visibility: 1,
                    _pendingMarkers: null,
                    _retryCache: null,
                    _transitions: null,
                  }),
                t.sibling
              );
            }
            function ns(e, t, n, r, a) {
              var i = em();
              return (
                (t.memoizedState = {
                  baseLanes: n,
                  cachePool: (i =
                    null === i
                      ? null
                      : {
                          parent: aH ? lf._currentValue : lf._currentValue2,
                          pool: i,
                        }),
                }),
                null !== e && eg(t, null),
                eK(),
                eW(t),
                null !== e && q(e, t, r, !0),
                (t.childLanes = a),
                null
              );
            }
            function nu(e, t) {
              return (
                ((t = nb({ mode: t.mode, children: t.children }, e.mode)).ref =
                  e.ref),
                (e.child = t),
                (t.return = e),
                t
              );
            }
            function nc(e, t, n) {
              return (
                lG(t, e.child, null, n),
                (e = nu(t, t.pendingProps)),
                (e.flags |= 2),
                eq(t),
                (t.memoizedState = null),
                e
              );
            }
            function nd(e, t) {
              var n = t.ref;
              if (null === n)
                null !== e && null !== e.ref && (t.flags |= 4194816);
              else {
                if ('function' != typeof n && 'object' != typeof n)
                  throw Error(r(284));
                (null === e || e.ref !== n) && (t.flags |= 4194816);
              }
            }
            function nf(e, t, n, r, a) {
              return (
                $(t),
                (n = e1(e, t, n, r, void 0, a)),
                (r = e8()),
                null === e || l6
                  ? (ln && r && G(t), (t.flags |= 1), nn(e, t, n, a), t.child)
                  : (e4(e, t, a), nS(e, t, a))
              );
            }
            function np(e, t, n, r, a, i) {
              return (
                $(t),
                (t.updateQueue = null),
                (n = e3(t, r, n, a)),
                e2(e),
                (r = e8()),
                null === e || l6
                  ? (ln && r && G(t), (t.flags |= 1), nn(e, t, n, i), t.child)
                  : (e4(e, t, i), nS(e, t, i))
              );
            }
            function nh(e, t, n, r, a) {
              if (($(t), null === t.stateNode)) {
                var i = oE,
                  o = n.contextType;
                ('object' == typeof o && null !== o && (i = ee(o)),
                  (t.memoizedState =
                    null !== (i = new n(r, i)).state && void 0 !== i.state
                      ? i.state
                      : null),
                  (i.updater = l8),
                  (t.stateNode = i),
                  (i._reactInternals = t),
                  ((i = t.stateNode).props = r),
                  (i.state = t.memoizedState),
                  (i.refs = {}),
                  e_(t),
                  (o = n.contextType),
                  (i.context = 'object' == typeof o && null !== o ? ee(o) : oE),
                  (i.state = t.memoizedState),
                  'function' == typeof (o = n.getDerivedStateFromProps) &&
                    (t3(t, n, o, r), (i.state = t.memoizedState)),
                  'function' == typeof n.getDerivedStateFromProps ||
                    'function' == typeof i.getSnapshotBeforeUpdate ||
                    ('function' != typeof i.UNSAFE_componentWillMount &&
                      'function' != typeof i.componentWillMount) ||
                    ((o = i.state),
                    'function' == typeof i.componentWillMount &&
                      i.componentWillMount(),
                    'function' == typeof i.UNSAFE_componentWillMount &&
                      i.UNSAFE_componentWillMount(),
                    o !== i.state && l8.enqueueReplaceState(i, i.state, null),
                    eO(t, r, i, a),
                    eU(),
                    (i.state = t.memoizedState)),
                  'function' == typeof i.componentDidMount &&
                    (t.flags |= 4194308),
                  (r = !0));
              } else if (null === e) {
                i = t.stateNode;
                var l = t.memoizedProps,
                  s = t4(n, l);
                i.props = s;
                var u = i.context,
                  c = n.contextType;
                ((o = oE), 'object' == typeof c && null !== c && (o = ee(c)));
                var d = n.getDerivedStateFromProps;
                ((c =
                  'function' == typeof d ||
                  'function' == typeof i.getSnapshotBeforeUpdate),
                  (l = t.pendingProps !== l),
                  c ||
                    ('function' != typeof i.UNSAFE_componentWillReceiveProps &&
                      'function' != typeof i.componentWillReceiveProps) ||
                    ((l || u !== o) && t8(t, i, r, o)),
                  (lL = !1));
                var f = t.memoizedState;
                ((i.state = f),
                  eO(t, r, i, a),
                  eU(),
                  (u = t.memoizedState),
                  l || f !== u || lL
                    ? ('function' == typeof d &&
                        (t3(t, n, d, r), (u = t.memoizedState)),
                      (s = lL || t9(t, n, s, r, f, u, o))
                        ? (c ||
                            ('function' != typeof i.UNSAFE_componentWillMount &&
                              'function' != typeof i.componentWillMount) ||
                            ('function' == typeof i.componentWillMount &&
                              i.componentWillMount(),
                            'function' == typeof i.UNSAFE_componentWillMount &&
                              i.UNSAFE_componentWillMount()),
                          'function' == typeof i.componentDidMount &&
                            (t.flags |= 4194308))
                        : ('function' == typeof i.componentDidMount &&
                            (t.flags |= 4194308),
                          (t.memoizedProps = r),
                          (t.memoizedState = u)),
                      (i.props = r),
                      (i.state = u),
                      (i.context = o),
                      (r = s))
                    : ('function' == typeof i.componentDidMount &&
                        (t.flags |= 4194308),
                      (r = !1)));
              } else {
                ((i = t.stateNode),
                  ek(e, t),
                  (c = t4(n, (o = t.memoizedProps))),
                  (i.props = c),
                  (d = t.pendingProps),
                  (f = i.context),
                  (u = n.contextType),
                  (s = oE),
                  'object' == typeof u && null !== u && (s = ee(u)),
                  (u =
                    'function' == typeof (l = n.getDerivedStateFromProps) ||
                    'function' == typeof i.getSnapshotBeforeUpdate) ||
                    ('function' != typeof i.UNSAFE_componentWillReceiveProps &&
                      'function' != typeof i.componentWillReceiveProps) ||
                    ((o !== d || f !== s) && t8(t, i, r, s)),
                  (lL = !1),
                  (f = t.memoizedState),
                  (i.state = f),
                  eO(t, r, i, a),
                  eU());
                var p = t.memoizedState;
                o !== d ||
                f !== p ||
                lL ||
                (null !== e && null !== e.dependencies && Z(e.dependencies))
                  ? ('function' == typeof l &&
                      (t3(t, n, l, r), (p = t.memoizedState)),
                    (c =
                      lL ||
                      t9(t, n, c, r, f, p, s) ||
                      (null !== e &&
                        null !== e.dependencies &&
                        Z(e.dependencies)))
                      ? (u ||
                          ('function' != typeof i.UNSAFE_componentWillUpdate &&
                            'function' != typeof i.componentWillUpdate) ||
                          ('function' == typeof i.componentWillUpdate &&
                            i.componentWillUpdate(r, p, s),
                          'function' == typeof i.UNSAFE_componentWillUpdate &&
                            i.UNSAFE_componentWillUpdate(r, p, s)),
                        'function' == typeof i.componentDidUpdate &&
                          (t.flags |= 4),
                        'function' == typeof i.getSnapshotBeforeUpdate &&
                          (t.flags |= 1024))
                      : ('function' != typeof i.componentDidUpdate ||
                          (o === e.memoizedProps && f === e.memoizedState) ||
                          (t.flags |= 4),
                        'function' != typeof i.getSnapshotBeforeUpdate ||
                          (o === e.memoizedProps && f === e.memoizedState) ||
                          (t.flags |= 1024),
                        (t.memoizedProps = r),
                        (t.memoizedState = p)),
                    (i.props = r),
                    (i.state = p),
                    (i.context = s),
                    (r = c))
                  : ('function' != typeof i.componentDidUpdate ||
                      (o === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 4),
                    'function' != typeof i.getSnapshotBeforeUpdate ||
                      (o === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 1024),
                    (r = !1));
              }
              return (
                (i = r),
                nd(e, t),
                (r = (128 & t.flags) != 0),
                i || r
                  ? ((i = t.stateNode),
                    (n =
                      r && 'function' != typeof n.getDerivedStateFromError
                        ? null
                        : i.render()),
                    (t.flags |= 1),
                    null !== e && r
                      ? ((t.child = lG(t, e.child, null, a)),
                        (t.child = lG(t, null, n, a)))
                      : nn(e, t, n, a),
                    (t.memoizedState = i.state),
                    (e = t.child))
                  : (e = nS(e, t, a)),
                e
              );
            }
            function nm(e, t, n, r) {
              return (z(), (t.flags |= 256), nn(e, t, n, r), t.child);
            }
            function ng(e) {
              return { baseLanes: e, cachePool: eA() };
            }
            function nA(e, t, n) {
              return (
                (e = null !== e ? e.childLanes & ~n : 0),
                t && (e |= sR),
                e
              );
            }
            function nv(e, t, n) {
              var a,
                i = t.pendingProps,
                o = !1,
                l = (128 & t.flags) != 0;
              if (
                ((a = l) ||
                  (a =
                    (null === e || null !== e.memoizedState) &&
                    (2 & lJ.current) != 0),
                a && ((o = !0), (t.flags &= -129)),
                (a = (32 & t.flags) != 0),
                (t.flags &= -33),
                null === e)
              ) {
                if (ln) {
                  if (
                    (o ? eX(t) : eY(),
                    (e = lt)
                      ? null !== (e = iQ(e, la)) &&
                        ((t.memoizedState = {
                          dehydrated: e,
                          treeContext:
                            null !== o3 ? { id: o9, overflow: o8 } : null,
                          retryLane: 0x20000000,
                          hydrationErrors: null,
                        }),
                        ((n = r2(e)).return = t),
                        (t.child = n),
                        (le = t),
                        (lt = null))
                      : (e = null),
                    null === e)
                  )
                    throw U(t);
                  return (
                    iI(e) ? (t.lanes = 32) : (t.lanes = 0x20000000),
                    null
                  );
                }
                var s = i.children;
                return (
                  (i = i.fallback),
                  o
                    ? (eY(),
                      (s = nb({ mode: 'hidden', children: s }, (o = t.mode))),
                      (i = r0(i, o, n, null)),
                      (s.return = t),
                      (i.return = t),
                      (s.sibling = i),
                      (t.child = s),
                      ((i = t.child).memoizedState = ng(n)),
                      (i.childLanes = nA(e, a, n)),
                      (t.memoizedState = l5),
                      nl(null, i))
                    : (eX(t), nB(t, s))
                );
              }
              var u = e.memoizedState;
              if (null !== u && null !== (s = u.dehydrated)) {
                if (l)
                  256 & t.flags
                    ? (eX(t), (t.flags &= -257), (t = nC(e, t, n)))
                    : null !== t.memoizedState
                      ? (eY(),
                        (t.child = e.child),
                        (t.flags |= 128),
                        (t = null))
                      : (eY(),
                        (s = i.fallback),
                        (o = t.mode),
                        (i = nb({ mode: 'visible', children: i.children }, o)),
                        (s = r0(s, o, n, null)),
                        (s.flags |= 2),
                        (i.return = t),
                        (s.return = t),
                        (i.sibling = s),
                        (t.child = i),
                        lG(t, e.child, null, n),
                        ((i = t.child).memoizedState = ng(n)),
                        (i.childLanes = nA(e, a, n)),
                        (t.memoizedState = l5),
                        (t = nl(null, i)));
                else if ((eX(t), iI(s)))
                  ((a = iG(s).digest),
                    ((i = Error(r(419))).stack = ''),
                    (i.digest = a),
                    Q({ value: i, source: null, stack: null }),
                    (t = nC(e, t, n)));
                else if (
                  (l6 || q(e, t, n, !1), (a = (n & e.childLanes) != 0), l6 || a)
                ) {
                  if (
                    null !== (a = sA) &&
                    0 !== (i = b(a, n)) &&
                    i !== u.retryLane
                  )
                    throw ((u.retryLane = i), eI(e, i), rA(a, e, i), l4);
                  (iR(s) || rF(), (t = nC(e, t, n)));
                } else
                  iR(s)
                    ? ((t.flags |= 192), (t.child = e.child), (t = null))
                    : ((e = u.treeContext),
                      aj &&
                        ((lt = iO(s)),
                        (le = t),
                        (ln = !0),
                        (lr = null),
                        (la = !1),
                        null !== e && _(t, e)),
                      (t = nB(t, i.children)),
                      (t.flags |= 4096));
                return t;
              }
              return o
                ? (eY(),
                  (s = i.fallback),
                  (o = t.mode),
                  (l = (u = e.child).sibling),
                  ((i = rq(u, {
                    mode: 'hidden',
                    children: i.children,
                  })).subtreeFlags = 0x3e00000 & u.subtreeFlags),
                  null !== l
                    ? (s = rq(l, s))
                    : ((s = r0(s, o, n, null)), (s.flags |= 2)),
                  (s.return = t),
                  (i.return = t),
                  (i.sibling = s),
                  (t.child = i),
                  nl(null, i),
                  (i = t.child),
                  null === (s = e.child.memoizedState)
                    ? (s = ng(n))
                    : (null !== (o = s.cachePool)
                        ? ((u = aH ? lf._currentValue : lf._currentValue2),
                          (o = o.parent !== u ? { parent: u, pool: u } : o))
                        : (o = eA()),
                      (s = { baseLanes: s.baseLanes | n, cachePool: o })),
                  (i.memoizedState = s),
                  (i.childLanes = nA(e, a, n)),
                  (t.memoizedState = l5),
                  nl(e.child, i))
                : (eX(t),
                  (e = (n = e.child).sibling),
                  ((n = rq(n, {
                    mode: 'visible',
                    children: i.children,
                  })).return = t),
                  (n.sibling = null),
                  null !== e &&
                    (null === (a = t.deletions)
                      ? ((t.deletions = [e]), (t.flags |= 16))
                      : a.push(e)),
                  (t.child = n),
                  (t.memoizedState = null),
                  n);
            }
            function nB(e, t) {
              return (
                ((t = nb({ mode: 'visible', children: t }, e.mode)).return = e),
                (e.child = t)
              );
            }
            function nb(e, n) {
              return (((e = t(22, e, null, n)).lanes = 0), e);
            }
            function nC(e, t, n) {
              return (
                lG(t, e.child, null, n),
                (e = nB(t, t.pendingProps.children)),
                (e.flags |= 2),
                (t.memoizedState = null),
                e
              );
            }
            function ny(e, t, n) {
              e.lanes |= t;
              var r = e.alternate;
              (null !== r && (r.lanes |= t), W(e.return, t, n));
            }
            function nx(e, t, n, r, a, i) {
              var o = e.memoizedState;
              null === o
                ? (e.memoizedState = {
                    isBackwards: t,
                    rendering: null,
                    renderingStartTime: 0,
                    last: r,
                    tail: n,
                    tailMode: a,
                    treeForkCount: i,
                  })
                : ((o.isBackwards = t),
                  (o.rendering = null),
                  (o.renderingStartTime = 0),
                  (o.last = r),
                  (o.tail = n),
                  (o.tailMode = a),
                  (o.treeForkCount = i));
            }
            function nw(e, t, n) {
              var r = t.pendingProps,
                a = r.revealOrder,
                i = r.tail;
              r = r.children;
              var o = lJ.current,
                l = (2 & o) != 0;
              if (
                (l ? ((o = (1 & o) | 2), (t.flags |= 128)) : (o &= 1),
                d(lJ, o),
                nn(e, t, r, n),
                (r = ln ? o0 : 0),
                !l && null !== e && (128 & e.flags) != 0)
              )
                n: for (e = t.child; null !== e; ) {
                  if (13 === e.tag) null !== e.memoizedState && ny(e, n, t);
                  else if (19 === e.tag) ny(e, n, t);
                  else if (null !== e.child) {
                    ((e.child.return = e), (e = e.child));
                    continue;
                  }
                  if (e === t) break;
                  for (; null === e.sibling; ) {
                    if (null === e.return || e.return === t) break n;
                    e = e.return;
                  }
                  ((e.sibling.return = e.return), (e = e.sibling));
                }
              switch (a) {
                case 'forwards':
                  for (n = t.child, a = null; null !== n; )
                    (null !== (e = n.alternate) && null === eZ(e) && (a = n),
                      (n = n.sibling));
                  (null === (n = a)
                    ? ((a = t.child), (t.child = null))
                    : ((a = n.sibling), (n.sibling = null)),
                    nx(t, !1, a, n, i, r));
                  break;
                case 'backwards':
                case 'unstable_legacy-backwards':
                  for (n = null, a = t.child, t.child = null; null !== a; ) {
                    if (null !== (e = a.alternate) && null === eZ(e)) {
                      t.child = a;
                      break;
                    }
                    ((e = a.sibling), (a.sibling = n), (n = a), (a = e));
                  }
                  nx(t, !0, n, null, i, r);
                  break;
                case 'together':
                  nx(t, !1, null, null, void 0, r);
                  break;
                default:
                  t.memoizedState = null;
              }
              return t.child;
            }
            function nS(e, t, n) {
              if (
                (null !== e && (t.dependencies = e.dependencies),
                (sM |= t.lanes),
                (n & t.childLanes) == 0)
              ) {
                if (null === e) return null;
                else if ((q(e, t, n, !1), (n & t.childLanes) == 0)) return null;
              }
              if (null !== e && t.child !== e.child) throw Error(r(153));
              if (null !== t.child) {
                for (
                  n = rq((e = t.child), e.pendingProps),
                    t.child = n,
                    n.return = t;
                  null !== e.sibling;
                )
                  ((e = e.sibling),
                    ((n = n.sibling = rq(e, e.pendingProps)).return = t));
                n.sibling = null;
              }
              return t.child;
            }
            function nE(e, t) {
              return (
                (e.lanes & t) != 0 || !!(null !== (e = e.dependencies) && Z(e))
              );
            }
            function nM(e, t, n) {
              if (null !== e)
                if (e.memoizedProps !== t.pendingProps) l6 = !0;
                else {
                  if (!nE(e, n) && (128 & t.flags) == 0)
                    return (
                      (l6 = !1),
                      (function (e, t, n) {
                        switch (t.tag) {
                          case 3:
                            (P(t, t.stateNode.containerInfo),
                              X(t, lf, e.memoizedState.cache),
                              z());
                            break;
                          case 27:
                          case 5:
                            N(t);
                            break;
                          case 4:
                            P(t, t.stateNode.containerInfo);
                            break;
                          case 10:
                            X(t, t.type, t.memoizedProps.value);
                            break;
                          case 31:
                            if (null !== t.memoizedState)
                              return ((t.flags |= 128), eV(t), null);
                            break;
                          case 13:
                            var r = t.memoizedState;
                            if (null !== r)
                              return null !== r.dehydrated
                                ? (eX(t), (t.flags |= 128), null)
                                : (n & t.child.childLanes) != 0
                                  ? nv(e, t, n)
                                  : (eX(t),
                                    null !== (e = nS(e, t, n))
                                      ? e.sibling
                                      : null);
                            eX(t);
                            break;
                          case 19:
                            var a = (128 & e.flags) != 0;
                            if (
                              ((r = (n & t.childLanes) != 0) ||
                                (q(e, t, n, !1), (r = (n & t.childLanes) != 0)),
                              a)
                            ) {
                              if (r) return nw(e, t, n);
                              t.flags |= 128;
                            }
                            if (
                              (null !== (a = t.memoizedState) &&
                                ((a.rendering = null),
                                (a.tail = null),
                                (a.lastEffect = null)),
                              d(lJ, lJ.current),
                              r)
                            )
                              break;
                            return null;
                          case 22:
                            return ((t.lanes = 0), no(e, t, n, t.pendingProps));
                          case 24:
                            X(t, lf, e.memoizedState.cache);
                        }
                        return nS(e, t, n);
                      })(e, t, n)
                    );
                  l6 = (131072 & e.flags) != 0;
                }
              else
                ((l6 = !1),
                  ln && (1048576 & t.flags) != 0 && I(t, o0, t.index));
              switch (((t.lanes = 0), t.tag)) {
                case 16:
                  n: {
                    var a = t.pendingProps;
                    if (
                      ((e = eC(t.elementType)),
                      (t.type = e),
                      'function' == typeof e)
                    )
                      rY(e)
                        ? ((a = t4(e, a)),
                          (t.tag = 1),
                          (t = nh(null, t, e, a, n)))
                        : ((t.tag = 0), (t = nf(null, t, e, a, n)));
                    else {
                      if (null != e) {
                        var i = e.$$typeof;
                        if (i === af) {
                          ((t.tag = 11), (t = nr(null, t, e, a, n)));
                          break n;
                        }
                        if (i === am) {
                          ((t.tag = 14), (t = na(null, t, e, a, n)));
                          break n;
                        }
                      }
                      throw Error(r(306, (t = s(e) || e), ''));
                    }
                  }
                  return t;
                case 0:
                  return nf(e, t, t.type, t.pendingProps, n);
                case 1:
                  return (
                    (i = t4((a = t.type), t.pendingProps)),
                    nh(e, t, a, i, n)
                  );
                case 3:
                  n: {
                    if ((P(t, t.stateNode.containerInfo), null === e))
                      throw Error(r(387));
                    var o = t.pendingProps;
                    ((a = (i = t.memoizedState).element),
                      ek(e, t),
                      eO(t, o, null, n));
                    var l = t.memoizedState;
                    if (
                      (X(t, lf, (o = l.cache)),
                      o !== i.cache && Y(t, [lf], n, !0),
                      eU(),
                      (o = l.element),
                      aj && i.isDehydrated)
                    )
                      if (
                        ((i = { element: o, isDehydrated: !1, cache: l.cache }),
                        (t.updateQueue.baseState = i),
                        (t.memoizedState = i),
                        256 & t.flags)
                      ) {
                        t = nm(e, t, o, n);
                        break n;
                      } else if (o !== a) {
                        (Q((a = T(Error(r(424)), t))), (t = nm(e, t, o, n)));
                        break n;
                      } else
                        for (
                          aj &&
                            ((lt = iH(t.stateNode.containerInfo)),
                            (le = t),
                            (ln = !0),
                            (lr = null),
                            (la = !0)),
                            n = lD(t, null, o, n),
                            t.child = n;
                          n;
                        )
                          ((n.flags = (-3 & n.flags) | 4096), (n = n.sibling));
                    else {
                      if ((z(), o === a)) {
                        t = nS(e, t, n);
                        break n;
                      }
                      nn(e, t, o, n);
                    }
                    t = t.child;
                  }
                  return t;
                case 26:
                  if (oa)
                    return (
                      nd(e, t),
                      null === e
                        ? (n = ol(t.type, null, t.pendingProps, null))
                          ? (t.memoizedState = n)
                          : ln ||
                            (t.stateNode = op(
                              t.type,
                              t.pendingProps,
                              o5.current,
                              t
                            ))
                        : (t.memoizedState = ol(
                            t.type,
                            e.memoizedProps,
                            t.pendingProps,
                            e.memoizedState
                          )),
                      null
                    );
                case 27:
                  if (ov)
                    return (
                      N(t),
                      null === e &&
                        ov &&
                        ln &&
                        ((a = t.stateNode =
                          oB(
                            t.type,
                            t.pendingProps,
                            o5.current,
                            o4.current,
                            !1
                          )),
                        (le = t),
                        (la = !0),
                        (lt = ij(t.type, a, lt))),
                      nn(e, t, t.pendingProps.children, n),
                      nd(e, t),
                      null === e && (t.flags |= 4194304),
                      t.child
                    );
                case 5:
                  return (
                    null === e &&
                      ln &&
                      (on(t.type, t.pendingProps, o4.current),
                      (i = a = lt) &&
                        (null !== (a = iJ(a, t.type, t.pendingProps, la))
                          ? ((t.stateNode = a),
                            (le = t),
                            (lt = iN(a)),
                            (la = !1),
                            (i = !0))
                          : (i = !1)),
                      i || U(t)),
                    N(t),
                    (i = t.type),
                    (o = t.pendingProps),
                    (l = null !== e ? e.memoizedProps : null),
                    (a = o.children),
                    a_(i, o)
                      ? (a = null)
                      : null !== l && a_(i, l) && (t.flags |= 32),
                    null !== t.memoizedState &&
                      ((i = e1(e, t, e9, null, null, n)),
                      aH ? (a9._currentValue = i) : (a9._currentValue2 = i)),
                    nd(e, t),
                    nn(e, t, a, n),
                    t.child
                  );
                case 6:
                  return (
                    null === e &&
                      ln &&
                      (or(t.pendingProps, o4.current),
                      (e = n = lt) &&
                        (null !== (n = iz(n, t.pendingProps, la))
                          ? ((t.stateNode = n), (le = t), (lt = null), (e = !0))
                          : (e = !1)),
                      e || U(t)),
                    null
                  );
                case 13:
                  return nv(e, t, n);
                case 4:
                  return (
                    P(t, t.stateNode.containerInfo),
                    (a = t.pendingProps),
                    null === e ? (t.child = lG(t, null, a, n)) : nn(e, t, a, n),
                    t.child
                  );
                case 11:
                  return nr(e, t, t.type, t.pendingProps, n);
                case 7:
                  return (nn(e, t, t.pendingProps, n), t.child);
                case 8:
                case 12:
                  return (nn(e, t, t.pendingProps.children, n), t.child);
                case 10:
                  return (
                    (a = t.pendingProps),
                    X(t, t.type, a.value),
                    nn(e, t, a.children, n),
                    t.child
                  );
                case 9:
                  return (
                    (i = t.type._context),
                    (a = t.pendingProps.children),
                    $(t),
                    (a = a((i = ee(i)))),
                    (t.flags |= 1),
                    nn(e, t, a, n),
                    t.child
                  );
                case 14:
                  return na(e, t, t.type, t.pendingProps, n);
                case 15:
                  return ni(e, t, t.type, t.pendingProps, n);
                case 19:
                  return nw(e, t, n);
                case 31:
                  var u = e,
                    c = t,
                    f = n,
                    p = c.pendingProps,
                    h = (128 & c.flags) != 0;
                  if (((c.flags &= -129), null === u)) {
                    if (ln) {
                      if ('hidden' === p.mode)
                        return (
                          (u = nu(c, p)),
                          (c.lanes = 0x20000000),
                          nl(null, u)
                        );
                      if (
                        (eV(c),
                        (u = lt)
                          ? null !== (u = iK(u, la)) &&
                            ((c.memoizedState = {
                              dehydrated: u,
                              treeContext:
                                null !== o3 ? { id: o9, overflow: o8 } : null,
                              retryLane: 0x20000000,
                              hydrationErrors: null,
                            }),
                            ((f = r2(u)).return = c),
                            (c.child = f),
                            (le = c),
                            (lt = null))
                          : (u = null),
                        null === u)
                      )
                        throw U(c);
                      return ((c.lanes = 0x20000000), null);
                    }
                    return nu(c, p);
                  }
                  var m = u.memoizedState;
                  if (null !== m) {
                    var g = m.dehydrated;
                    if ((eV(c), h))
                      if (256 & c.flags) ((c.flags &= -257), (c = nc(u, c, f)));
                      else if (null !== c.memoizedState)
                        ((c.child = u.child), (c.flags |= 128), (c = null));
                      else throw Error(r(558));
                    else if (
                      (l6 || q(u, c, f, !1),
                      (h = (f & u.childLanes) != 0),
                      l6 || h)
                    ) {
                      if (
                        null !== (p = sA) &&
                        0 !== (g = b(p, f)) &&
                        g !== m.retryLane
                      )
                        throw ((m.retryLane = g), eI(u, g), rA(p, u, g), l4);
                      (rF(), (c = nc(u, c, f)));
                    } else
                      ((u = m.treeContext),
                        aj &&
                          ((lt = iU(g)),
                          (le = c),
                          (ln = !0),
                          (lr = null),
                          (la = !1),
                          null !== u && _(c, u)),
                        (c = nu(c, p)),
                        (c.flags |= 4096));
                    return c;
                  }
                  return (
                    ((u = rq(u.child, {
                      mode: p.mode,
                      children: p.children,
                    })).ref = c.ref),
                    (c.child = u),
                    (u.return = c),
                    u
                  );
                case 22:
                  return no(e, t, n, t.pendingProps);
                case 24:
                  return (
                    $(t),
                    (a = ee(lf)),
                    null === e
                      ? (null === (i = em()) &&
                          ((i = sA),
                          (o = er()),
                          (i.pooledCache = o),
                          o.refCount++,
                          null !== o && (i.pooledCacheLanes |= n),
                          (i = o)),
                        (t.memoizedState = { parent: a, cache: i }),
                        e_(t),
                        X(t, lf, i))
                      : ((e.lanes & n) != 0 &&
                          (ek(e, t), eO(t, null, null, n), eU()),
                        (i = e.memoizedState),
                        (o = t.memoizedState),
                        i.parent !== a
                          ? ((i = { parent: a, cache: a }),
                            (t.memoizedState = i),
                            0 === t.lanes &&
                              (t.memoizedState = t.updateQueue.baseState = i),
                            X(t, lf, a))
                          : (X(t, lf, (a = o.cache)),
                            a !== i.cache && Y(t, [lf], n, !0))),
                    nn(e, t, t.pendingProps.children, n),
                    t.child
                  );
                case 29:
                  throw t.pendingProps;
              }
              throw Error(r(156, t.tag));
            }
            function nF(e) {
              e.flags |= 4;
            }
            function nT(e) {
              aO && (e.flags |= 8);
            }
            function nR(e, t) {
              if (null !== e && e.child === t.child) return !1;
              if ((16 & t.flags) != 0) return !0;
              for (e = t.child; null !== e; ) {
                if ((8218 & e.flags) != 0 || (8218 & e.subtreeFlags) != 0)
                  return !0;
                e = e.sibling;
              }
              return !1;
            }
            function nI(e, t, n, r) {
              if (aU)
                for (n = t.child; null !== n; ) {
                  if (5 === n.tag || 6 === n.tag) aG(e, n.stateNode);
                  else if (
                    !(4 === n.tag || (ov && 27 === n.tag)) &&
                    null !== n.child
                  ) {
                    ((n.child.return = n), (n = n.child));
                    continue;
                  }
                  if (n === t) break;
                  for (; null === n.sibling; ) {
                    if (null === n.return || n.return === t) return;
                    n = n.return;
                  }
                  ((n.sibling.return = n.return), (n = n.sibling));
                }
              else if (aO)
                for (var a = t.child; null !== a; ) {
                  if (5 === a.tag) {
                    var i = a.stateNode;
                    (n && r && (i = iF(i, a.type, a.memoizedProps)), aG(e, i));
                  } else if (6 === a.tag)
                    ((i = a.stateNode),
                      n && r && (i = iT(i, a.memoizedProps)),
                      aG(e, i));
                  else if (4 !== a.tag) {
                    if (22 === a.tag && null !== a.memoizedState)
                      (null !== (i = a.child) && (i.return = a),
                        nI(e, a, !0, !0));
                    else if (null !== a.child) {
                      ((a.child.return = a), (a = a.child));
                      continue;
                    }
                  }
                  if (a === t) break;
                  for (; null === a.sibling; ) {
                    if (null === a.return || a.return === t) return;
                    a = a.return;
                  }
                  ((a.sibling.return = a.return), (a = a.sibling));
                }
            }
            function nG(e, t) {
              if (aO && nR(e, t)) {
                var n = (e = t.stateNode).containerInfo,
                  r = iw();
                ((function e(t, n, r, a) {
                  var i = !1;
                  if (aO)
                    for (var o = n.child; null !== o; ) {
                      if (5 === o.tag) {
                        var l = o.stateNode;
                        (r && a && (l = iF(l, o.type, o.memoizedProps)),
                          iS(t, l));
                      } else if (6 === o.tag)
                        ((l = o.stateNode),
                          r && a && (l = iT(l, o.memoizedProps)),
                          iS(t, l));
                      else if (4 !== o.tag) {
                        if (22 === o.tag && null !== o.memoizedState)
                          (null !== (i = o.child) && (i.return = o),
                            e(t, o, !0, !0),
                            (i = !0));
                        else if (null !== o.child) {
                          ((o.child.return = o), (o = o.child));
                          continue;
                        }
                      }
                      if (o === n) break;
                      for (; null === o.sibling; ) {
                        if (null === o.return || o.return === n) return i;
                        o = o.return;
                      }
                      ((o.sibling.return = o.return), (o = o.sibling));
                    }
                  return i;
                })(r, t, !1, !1),
                  (e.pendingChildren = r),
                  nF(t),
                  iE(n, r));
              }
            }
            function nD(e, t, n, r) {
              if (aU) e.memoizedProps !== r && nF(t);
              else if (aO) {
                var a = e.stateNode,
                  i = e.memoizedProps;
                if ((e = nR(e, t)) || i !== r) {
                  var o = o4.current;
                  (i = ix(a, n, i, r, !e, null)) === a
                    ? (t.stateNode = a)
                    : (nT(t),
                      aD(i, n, r, o) && nF(t),
                      (t.stateNode = i),
                      e && nI(i, t, !1, !1));
                } else t.stateNode = a;
              }
            }
            function n_(e, t, n, r, a) {
              if ((32 & e.mode) != 0 && (null === n ? aY(t, r) : aq(t, n, r))) {
                if (
                  ((e.flags |= 0x1000000), (0x13ffff40 & a) === a || aZ(t, r))
                )
                  if (a$(e.stateNode, t, r)) e.flags |= 8192;
                  else if (rS()) e.flags |= 8192;
                  else throw ((lT = lF), lE);
              } else e.flags &= -0x1000001;
            }
            function nk(e, t) {
              if (om(t)) {
                if (((e.flags |= 0x1000000), !og(t)))
                  if (rS()) e.flags |= 8192;
                  else throw ((lT = lF), lE);
              } else e.flags &= -0x1000001;
            }
            function nP(e, t) {
              (null !== t && (e.flags |= 4),
                16384 & e.flags &&
                  ((t = 22 !== e.tag ? m() : 0x20000000),
                  (e.lanes |= t),
                  (sI |= t)));
            }
            function nL(e, t) {
              if (!ln)
                switch (e.tailMode) {
                  case 'hidden':
                    t = e.tail;
                    for (var n = null; null !== t; )
                      (null !== t.alternate && (n = t), (t = t.sibling));
                    null === n ? (e.tail = null) : (n.sibling = null);
                    break;
                  case 'collapsed':
                    n = e.tail;
                    for (var r = null; null !== n; )
                      (null !== n.alternate && (r = n), (n = n.sibling));
                    null === r
                      ? t || null === e.tail
                        ? (e.tail = null)
                        : (e.tail.sibling = null)
                      : (r.sibling = null);
                }
            }
            function nN(e) {
              var t = null !== e.alternate && e.alternate.child === e.child,
                n = 0,
                r = 0;
              if (t)
                for (var a = e.child; null !== a; )
                  ((n |= a.lanes | a.childLanes),
                    (r |= 0x3e00000 & a.subtreeFlags),
                    (r |= 0x3e00000 & a.flags),
                    (a.return = e),
                    (a = a.sibling));
              else
                for (a = e.child; null !== a; )
                  ((n |= a.lanes | a.childLanes),
                    (r |= a.subtreeFlags),
                    (r |= a.flags),
                    (a.return = e),
                    (a = a.sibling));
              return ((e.subtreeFlags |= r), (e.childLanes = n), t);
            }
            function nH(e, t) {
              switch ((D(t), t.tag)) {
                case 3:
                  (V(lf), L());
                  break;
                case 26:
                case 27:
                case 5:
                  H(t);
                  break;
                case 4:
                  L();
                  break;
                case 31:
                  null !== t.memoizedState && eq(t);
                  break;
                case 13:
                  eq(t);
                  break;
                case 19:
                  c(lJ);
                  break;
                case 10:
                  V(t.type);
                  break;
                case 22:
                case 23:
                  (eq(t), eQ(), null !== e && c(lw));
                  break;
                case 24:
                  V(lf);
              }
            }
            function nU(e, t) {
              try {
                var n = t.updateQueue,
                  r = null !== n ? n.lastEffect : null;
                if (null !== r) {
                  var a = r.next;
                  n = a;
                  do {
                    if ((n.tag & e) === e) {
                      r = void 0;
                      var i = n.create;
                      n.inst.destroy = r = i();
                    }
                    n = n.next;
                  } while (n !== a);
                }
              } catch (e) {
                rJ(t, t.return, e);
              }
            }
            function nO(e, t, n) {
              try {
                var r = t.updateQueue,
                  a = null !== r ? r.lastEffect : null;
                if (null !== a) {
                  var i = a.next;
                  r = i;
                  do {
                    if ((r.tag & e) === e) {
                      var o = r.inst,
                        l = o.destroy;
                      if (void 0 !== l) {
                        ((o.destroy = void 0), (a = t));
                        try {
                          l();
                        } catch (e) {
                          rJ(a, n, e);
                        }
                      }
                    }
                    r = r.next;
                  } while (r !== i);
                }
              } catch (e) {
                rJ(t, t.return, e);
              }
            }
            function nj(e) {
              var t = e.updateQueue;
              if (null !== t) {
                var n = e.stateNode;
                try {
                  eJ(t, n);
                } catch (t) {
                  rJ(e, e.return, t);
                }
              }
            }
            function nJ(e, t, n) {
              ((n.props = t4(e.type, e.memoizedProps)),
                (n.state = e.memoizedState));
              try {
                n.componentWillUnmount();
              } catch (n) {
                rJ(e, t, n);
              }
            }
            function nz(e, t) {
              try {
                var n = e.ref;
                if (null !== n) {
                  switch (e.tag) {
                    case 26:
                    case 27:
                    case 5:
                      var r = aE(e.stateNode);
                      break;
                    default:
                      r = e.stateNode;
                  }
                  'function' == typeof n
                    ? (e.refCleanup = n(r))
                    : (n.current = r);
                }
              } catch (n) {
                rJ(e, t, n);
              }
            }
            function nK(e, t) {
              var n = e.ref,
                r = e.refCleanup;
              if (null !== n)
                if ('function' == typeof r)
                  try {
                    r();
                  } catch (n) {
                    rJ(e, t, n);
                  } finally {
                    ((e.refCleanup = null),
                      null != (e = e.alternate) && (e.refCleanup = null));
                  }
                else if ('function' == typeof n)
                  try {
                    n(null);
                  } catch (n) {
                    rJ(e, t, n);
                  }
                else n.current = null;
            }
            function nQ(e) {
              var t = e.type,
                n = e.memoizedProps,
                r = e.stateNode;
              try {
                ic(r, t, n, e);
              } catch (t) {
                rJ(e, e.return, t);
              }
            }
            function nX(e, t, n) {
              try {
                id(e.stateNode, e.type, n, t, e);
              } catch (t) {
                rJ(e, e.return, t);
              }
            }
            function nV(e) {
              return (
                5 === e.tag ||
                3 === e.tag ||
                (!!oa && 26 === e.tag) ||
                (!!ov && 27 === e.tag && ox(e.type)) ||
                4 === e.tag
              );
            }
            function nW(e) {
              n: for (;;) {
                for (; null === e.sibling; ) {
                  if (null === e.return || nV(e.return)) return null;
                  e = e.return;
                }
                for (
                  e.sibling.return = e.return, e = e.sibling;
                  5 !== e.tag && 6 !== e.tag && 18 !== e.tag;
                ) {
                  if (
                    (ov && 27 === e.tag && ox(e.type)) ||
                    2 & e.flags ||
                    null === e.child ||
                    4 === e.tag
                  )
                    continue n;
                  ((e.child.return = e), (e = e.child));
                }
                if (!(2 & e.flags)) return e.stateNode;
              }
            }
            function nY(e, t, n) {
              var r = e.tag;
              if (5 === r || 6 === r)
                ((e = e.stateNode), t ? ip(n, e, t) : il(n, e));
              else if (
                4 !== r &&
                (ov && 27 === r && ox(e.type) && (n = e.stateNode),
                null !== (e = e.child))
              )
                for (nY(e, t, n), e = e.sibling; null !== e; )
                  (nY(e, t, n), (e = e.sibling));
            }
            function nq(e, t, n) {
              e = e.containerInfo;
              try {
                iM(e, n);
              } catch (e) {
                rJ(t, t.return, e);
              }
            }
            function nZ(e) {
              var t = e.stateNode,
                n = e.memoizedProps;
              try {
                ob(e.type, n, t, e);
              } catch (t) {
                rJ(e, e.return, t);
              }
            }
            function n$(e, t, n) {
              var r = n.flags;
              switch (n.tag) {
                case 0:
                case 11:
                case 15:
                  (n5(e, n), 4 & r && nU(5, n));
                  break;
                case 1:
                  if ((n5(e, n), 4 & r))
                    if (((e = n.stateNode), null === t))
                      try {
                        e.componentDidMount();
                      } catch (e) {
                        rJ(n, n.return, e);
                      }
                    else {
                      var a = t4(n.type, t.memoizedProps);
                      t = t.memoizedState;
                      try {
                        e.componentDidUpdate(
                          a,
                          t,
                          e.__reactInternalSnapshotBeforeUpdate
                        );
                      } catch (e) {
                        rJ(n, n.return, e);
                      }
                    }
                  (64 & r && nj(n), 512 & r && nz(n, n.return));
                  break;
                case 3:
                  if ((n5(e, n), 64 & r && null !== (r = n.updateQueue))) {
                    if (((e = null), null !== n.child))
                      switch (n.child.tag) {
                        case 27:
                        case 5:
                          e = aE(n.child.stateNode);
                          break;
                        case 1:
                          e = n.child.stateNode;
                      }
                    try {
                      eJ(r, e);
                    } catch (e) {
                      rJ(n, n.return, e);
                    }
                  }
                  break;
                case 27:
                  ov && null === t && 4 & r && nZ(n);
                case 26:
                case 5:
                  if ((n5(e, n), null === t)) {
                    if (4 & r) nQ(n);
                    else if (64 & r) {
                      ((e = n.type), (t = n.memoizedProps), (a = n.stateNode));
                      try {
                        i$(a, e, t, n);
                      } catch (e) {
                        rJ(n, n.return, e);
                      }
                    }
                  }
                  512 & r && nz(n, n.return);
                  break;
                case 12:
                default:
                  n5(e, n);
                  break;
                case 31:
                  (n5(e, n), 4 & r && n2(e, n));
                  break;
                case 13:
                  (n5(e, n),
                    4 & r && n3(e, n),
                    64 & r &&
                      null !== (r = n.memoizedState) &&
                      null !== (r = r.dehydrated) &&
                      iD(r, (n = rX.bind(null, n))));
                  break;
                case 22:
                  if (!(r = null !== n.memoizedState || l7)) {
                    ((t = (null !== t && null !== t.memoizedState) || se),
                      (a = l7));
                    var i = se;
                    ((l7 = r),
                      (se = t) && !i
                        ? (function e(t, n, r) {
                            for (
                              r = r && (8772 & n.subtreeFlags) != 0,
                                n = n.child;
                              null !== n;
                            ) {
                              var a = n.alternate,
                                i = t,
                                o = n,
                                l = o.flags;
                              switch (o.tag) {
                                case 0:
                                case 11:
                                case 15:
                                  (e(i, o, r), nU(4, o));
                                  break;
                                case 1:
                                  if (
                                    (e(i, o, r),
                                    'function' ==
                                      typeof (i = (a = o).stateNode)
                                        .componentDidMount)
                                  )
                                    try {
                                      i.componentDidMount();
                                    } catch (e) {
                                      rJ(a, a.return, e);
                                    }
                                  if (null !== (i = (a = o).updateQueue)) {
                                    var s = a.stateNode;
                                    try {
                                      var u = i.shared.hiddenCallbacks;
                                      if (null !== u)
                                        for (
                                          i.shared.hiddenCallbacks = null,
                                            i = 0;
                                          i < u.length;
                                          i++
                                        )
                                          ej(u[i], s);
                                    } catch (e) {
                                      rJ(a, a.return, e);
                                    }
                                  }
                                  (r && 64 & l && nj(o), nz(o, o.return));
                                  break;
                                case 27:
                                  ov && nZ(o);
                                case 26:
                                case 5:
                                  (e(i, o, r),
                                    r && null === a && 4 & l && nQ(o),
                                    nz(o, o.return));
                                  break;
                                case 12:
                                default:
                                  e(i, o, r);
                                  break;
                                case 31:
                                  (e(i, o, r), r && 4 & l && n2(i, o));
                                  break;
                                case 13:
                                  (e(i, o, r), r && 4 & l && n3(i, o));
                                  break;
                                case 22:
                                  (null === o.memoizedState && e(i, o, r),
                                    nz(o, o.return));
                                case 30:
                              }
                              n = n.sibling;
                            }
                          })(e, n, (8772 & n.subtreeFlags) != 0)
                        : n5(e, n),
                      (l7 = a),
                      (se = i));
                  }
                case 30:
              }
            }
            function n0(e, t, n) {
              for (n = n.child; null !== n; ) (n1(e, t, n), (n = n.sibling));
            }
            function n1(e, t, n) {
              if (oK && 'function' == typeof oK.onCommitFiberUnmount)
                try {
                  oK.onCommitFiberUnmount(oz, n);
                } catch {}
              switch (n.tag) {
                case 26:
                  if (oa) {
                    (se || nK(n, t),
                      n0(e, t, n),
                      n.memoizedState
                        ? ou(n.memoizedState)
                        : n.stateNode && of(n.stateNode));
                    break;
                  }
                case 27:
                  if (ov) {
                    se || nK(n, t);
                    var r = sa,
                      a = si;
                    (ox(n.type) && ((sa = n.stateNode), (si = !1)),
                      n0(e, t, n),
                      oC(n.stateNode),
                      (sa = r),
                      (si = a));
                    break;
                  }
                case 5:
                  se || nK(n, t);
                case 6:
                  if (aU) {
                    if (
                      ((r = sa),
                      (a = si),
                      (sa = null),
                      n0(e, t, n),
                      (sa = r),
                      (si = a),
                      null !== sa)
                    )
                      if (si)
                        try {
                          ig(sa, n.stateNode);
                        } catch (e) {
                          rJ(n, t, e);
                        }
                      else
                        try {
                          im(sa, n.stateNode);
                        } catch (e) {
                          rJ(n, t, e);
                        }
                  } else n0(e, t, n);
                  break;
                case 18:
                  aU &&
                    null !== sa &&
                    (si ? i4(sa, n.stateNode) : i8(sa, n.stateNode));
                  break;
                case 4:
                  aU
                    ? ((r = sa),
                      (a = si),
                      (sa = n.stateNode.containerInfo),
                      (si = !0),
                      n0(e, t, n),
                      (sa = r),
                      (si = a))
                    : (aO && nq(n.stateNode, n, iw()), n0(e, t, n));
                  break;
                case 0:
                case 11:
                case 14:
                case 15:
                  (nO(2, n, t), se || nO(4, n, t), n0(e, t, n));
                  break;
                case 1:
                  (se ||
                    (nK(n, t),
                    'function' ==
                      typeof (r = n.stateNode).componentWillUnmount &&
                      nJ(n, t, r)),
                    n0(e, t, n));
                  break;
                case 21:
                default:
                  n0(e, t, n);
                  break;
                case 22:
                  ((se = (r = se) || null !== n.memoizedState),
                    n0(e, t, n),
                    (se = r));
              }
            }
            function n2(e, t) {
              if (
                aj &&
                null === t.memoizedState &&
                null !== (e = t.alternate) &&
                null !== (e = e.memoizedState)
              ) {
                e = e.dehydrated;
                try {
                  i1(e);
                } catch (e) {
                  rJ(t, t.return, e);
                }
              }
            }
            function n3(e, t) {
              if (
                aj &&
                null === t.memoizedState &&
                null !== (e = t.alternate) &&
                null !== (e = e.memoizedState) &&
                null !== (e = e.dehydrated)
              )
                try {
                  i2(e);
                } catch (e) {
                  rJ(t, t.return, e);
                }
            }
            function n9(e, t) {
              var n = (function (e) {
                switch (e.tag) {
                  case 31:
                  case 13:
                  case 19:
                    var t = e.stateNode;
                    return (null === t && (t = e.stateNode = new sn()), t);
                  case 22:
                    return (
                      null === (t = (e = e.stateNode)._retryCache) &&
                        (t = e._retryCache = new sn()),
                      t
                    );
                  default:
                    throw Error(r(435, e.tag));
                }
              })(e);
              t.forEach(function (t) {
                if (!n.has(t)) {
                  n.add(t);
                  var r = rV.bind(null, e, t);
                  t.then(r, r);
                }
              });
            }
            function n8(e, t) {
              var n = t.deletions;
              if (null !== n)
                for (var a = 0; a < n.length; a++) {
                  var i = n[a],
                    o = e,
                    l = t;
                  if (aU) {
                    var s = l;
                    n: for (; null !== s; ) {
                      switch (s.tag) {
                        case 27:
                          if (ov) {
                            if (ox(s.type)) {
                              ((sa = s.stateNode), (si = !1));
                              break n;
                            }
                            break;
                          }
                        case 5:
                          ((sa = s.stateNode), (si = !1));
                          break n;
                        case 3:
                        case 4:
                          ((sa = s.stateNode.containerInfo), (si = !0));
                          break n;
                      }
                      s = s.return;
                    }
                    if (null === sa) throw Error(r(160));
                    (n1(o, l, i), (sa = null), (si = !1));
                  } else n1(o, l, i);
                  (null !== (o = i.alternate) && (o.return = null),
                    (i.return = null));
                }
              if (13886 & t.subtreeFlags)
                for (t = t.child; null !== t; ) (n4(t, e), (t = t.sibling));
            }
            function n4(e, t) {
              var n = e.alternate,
                a = e.flags;
              switch (e.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  (n8(t, e),
                    n6(e),
                    4 & a &&
                      (nO(3, e, e.return), nU(3, e), nO(5, e, e.return)));
                  break;
                case 1:
                  (n8(t, e),
                    n6(e),
                    512 & a && (se || null === n || nK(n, n.return)),
                    64 & a &&
                      l7 &&
                      null !== (e = e.updateQueue) &&
                      null !== (a = e.callbacks) &&
                      ((n = e.shared.hiddenCallbacks),
                      (e.shared.hiddenCallbacks =
                        null === n ? a : n.concat(a))));
                  break;
                case 26:
                  if (oa) {
                    var i = so;
                    if (
                      (n8(t, e),
                      n6(e),
                      512 & a && (se || null === n || nK(n, n.return)),
                      4 & a)
                    ) {
                      a = null !== n ? n.memoizedState : null;
                      var o = e.memoizedState;
                      null === n
                        ? null === o
                          ? null === e.stateNode
                            ? (e.stateNode = oc(i, e.type, e.memoizedProps, e))
                            : od(i, e.type, e.stateNode)
                          : (e.stateNode = os(i, o, e.memoizedProps))
                        : a !== o
                          ? (null === a
                              ? null !== n.stateNode && of(n.stateNode)
                              : ou(a),
                            null === o
                              ? od(i, e.type, e.stateNode)
                              : os(i, o, e.memoizedProps))
                          : null === o &&
                            null !== e.stateNode &&
                            nX(e, e.memoizedProps, n.memoizedProps);
                    }
                    break;
                  }
                case 27:
                  if (ov) {
                    (n8(t, e),
                      n6(e),
                      512 & a && (se || null === n || nK(n, n.return)),
                      null !== n &&
                        4 & a &&
                        nX(e, e.memoizedProps, n.memoizedProps));
                    break;
                  }
                case 5:
                  if (
                    (n8(t, e),
                    n6(e),
                    512 & a && (se || null === n || nK(n, n.return)),
                    aU)
                  ) {
                    if (32 & e.flags) {
                      i = e.stateNode;
                      try {
                        iA(i);
                      } catch (t) {
                        rJ(e, e.return, t);
                      }
                    }
                    (4 & a &&
                      null != e.stateNode &&
                      ((i = e.memoizedProps),
                      nX(e, i, null !== n ? n.memoizedProps : i)),
                      1024 & a && (st = !0));
                  } else
                    aO &&
                      null !== e.alternate &&
                      (e.alternate.stateNode = e.stateNode);
                  break;
                case 6:
                  if ((n8(t, e), n6(e), 4 & a && aU)) {
                    if (null === e.stateNode) throw Error(r(162));
                    ((a = e.memoizedProps),
                      (n = null !== n ? n.memoizedProps : a),
                      (i = e.stateNode));
                    try {
                      iu(i, n, a);
                    } catch (t) {
                      rJ(e, e.return, t);
                    }
                  }
                  break;
                case 3:
                  if (
                    (oa
                      ? (oh(),
                        (i = so),
                        (so = oo(t.containerInfo)),
                        n8(t, e),
                        (so = i))
                      : n8(t, e),
                    n6(e),
                    4 & a)
                  ) {
                    if (aU && aj && null !== n && n.memoizedState.isDehydrated)
                      try {
                        i0(t.containerInfo);
                      } catch (t) {
                        rJ(e, e.return, t);
                      }
                    if (aO) {
                      ((a = t.containerInfo), (n = t.pendingChildren));
                      try {
                        iM(a, n);
                      } catch (t) {
                        rJ(e, e.return, t);
                      }
                    }
                  }
                  st &&
                    ((st = !1),
                    (function e(t) {
                      if (1024 & t.subtreeFlags)
                        for (t = t.child; null !== t; ) {
                          var n = t;
                          (e(n),
                            5 === n.tag && 1024 & n.flags && a8(n.stateNode),
                            (t = t.sibling));
                        }
                    })(e));
                  break;
                case 4:
                  (oa
                    ? ((n = so),
                      (so = oo(e.stateNode.containerInfo)),
                      n8(t, e),
                      n6(e),
                      (so = n))
                    : (n8(t, e), n6(e)),
                    4 & a &&
                      aO &&
                      nq(e.stateNode, e, e.stateNode.pendingChildren));
                  break;
                case 12:
                default:
                  (n8(t, e), n6(e));
                  break;
                case 31:
                case 19:
                  (n8(t, e),
                    n6(e),
                    4 & a &&
                      null !== (a = e.updateQueue) &&
                      ((e.updateQueue = null), n9(e, a)));
                  break;
                case 13:
                  (n8(t, e),
                    n6(e),
                    8192 & e.child.flags &&
                      (null !== e.memoizedState) !=
                        (null !== n && null !== n.memoizedState) &&
                      (sk = oL()),
                    4 & a &&
                      null !== (a = e.updateQueue) &&
                      ((e.updateQueue = null), n9(e, a)));
                  break;
                case 22:
                  i = null !== e.memoizedState;
                  var l = null !== n && null !== n.memoizedState,
                    s = l7,
                    u = se;
                  if (
                    ((l7 = s || i),
                    (se = u || l),
                    n8(t, e),
                    (se = u),
                    (l7 = s),
                    n6(e),
                    8192 & a &&
                      (((t = e.stateNode)._visibility = i
                        ? -2 & t._visibility
                        : 1 | t._visibility),
                      i &&
                        (null === n ||
                          l ||
                          l7 ||
                          se ||
                          (function e(t) {
                            for (t = t.child; null !== t; ) {
                              var n = t;
                              switch (n.tag) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                  (nO(4, n, n.return), e(n));
                                  break;
                                case 1:
                                  nK(n, n.return);
                                  var r = n.stateNode;
                                  ('function' ==
                                    typeof r.componentWillUnmount &&
                                    nJ(n, n.return, r),
                                    e(n));
                                  break;
                                case 27:
                                  ov && oC(n.stateNode);
                                case 26:
                                case 5:
                                  (nK(n, n.return), e(n));
                                  break;
                                case 22:
                                  null === n.memoizedState && e(n);
                                  break;
                                default:
                                  e(n);
                              }
                              t = t.sibling;
                            }
                          })(e)),
                      aU))
                  ) {
                    n: if (((n = null), aU))
                      for (t = e; ; ) {
                        if (5 === t.tag || (oa && 26 === t.tag)) {
                          if (null === n) {
                            l = n = t;
                            try {
                              ((o = l.stateNode),
                                i ? iv(o) : ib(l.stateNode, l.memoizedProps));
                            } catch (e) {
                              rJ(l, l.return, e);
                            }
                          }
                        } else if (6 === t.tag) {
                          if (null === n) {
                            l = t;
                            try {
                              var c = l.stateNode;
                              i ? iB(c) : iC(c, l.memoizedProps);
                            } catch (e) {
                              rJ(l, l.return, e);
                            }
                          }
                        } else if (18 === t.tag) {
                          if (null === n) {
                            l = t;
                            try {
                              var d = l.stateNode;
                              i ? i6(d) : i5(l.stateNode);
                            } catch (e) {
                              rJ(l, l.return, e);
                            }
                          }
                        } else if (
                          ((22 !== t.tag && 23 !== t.tag) ||
                            null === t.memoizedState ||
                            t === e) &&
                          null !== t.child
                        ) {
                          ((t.child.return = t), (t = t.child));
                          continue;
                        }
                        if (t === e) break n;
                        for (; null === t.sibling; ) {
                          if (null === t.return || t.return === e) break n;
                          (n === t && (n = null), (t = t.return));
                        }
                        (n === t && (n = null),
                          (t.sibling.return = t.return),
                          (t = t.sibling));
                      }
                  }
                  4 & a &&
                    null !== (a = e.updateQueue) &&
                    null !== (n = a.retryQueue) &&
                    ((a.retryQueue = null), n9(e, n));
                case 30:
                case 21:
              }
            }
            function n6(e) {
              var t = e.flags;
              if (2 & t) {
                try {
                  for (var n, a = e.return; null !== a; ) {
                    if (nV(a)) {
                      n = a;
                      break;
                    }
                    a = a.return;
                  }
                  if (aU) {
                    if (null == n) throw Error(r(160));
                    switch (n.tag) {
                      case 27:
                        if (ov) {
                          var i = n.stateNode,
                            o = nW(e);
                          nY(e, o, i);
                          break;
                        }
                      case 5:
                        var l = n.stateNode;
                        32 & n.flags && (iA(l), (n.flags &= -33));
                        var s = nW(e);
                        nY(e, s, l);
                        break;
                      case 3:
                      case 4:
                        var u = n.stateNode.containerInfo,
                          c = nW(e);
                        !(function e(t, n, r) {
                          var a = t.tag;
                          if (5 === a || 6 === a)
                            ((t = t.stateNode), n ? ih(r, t, n) : is(r, t));
                          else if (
                            4 !== a &&
                            (ov &&
                              27 === a &&
                              ox(t.type) &&
                              ((r = t.stateNode), (n = null)),
                            null !== (t = t.child))
                          )
                            for (e(t, n, r), t = t.sibling; null !== t; )
                              (e(t, n, r), (t = t.sibling));
                        })(e, c, u);
                        break;
                      default:
                        throw Error(r(161));
                    }
                  }
                } catch (t) {
                  rJ(e, e.return, t);
                }
                e.flags &= -3;
              }
              4096 & t && (e.flags &= -4097);
            }
            function n5(e, t) {
              if (8772 & t.subtreeFlags)
                for (t = t.child; null !== t; )
                  (n$(e, t.alternate, t), (t = t.sibling));
            }
            function n7(e, t) {
              var n = null;
              (null !== e &&
                null !== e.memoizedState &&
                null !== e.memoizedState.cachePool &&
                (n = e.memoizedState.cachePool.pool),
                (e = null),
                null !== t.memoizedState &&
                  null !== t.memoizedState.cachePool &&
                  (e = t.memoizedState.cachePool.pool),
                e !== n && (null != e && e.refCount++, null != n && ea(n)));
            }
            function re(e, t) {
              ((e = null),
                null !== t.alternate && (e = t.alternate.memoizedState.cache),
                (t = t.memoizedState.cache) !== e &&
                  (t.refCount++, null != e && ea(e)));
            }
            function rt(e, t, n, r) {
              if (10256 & t.subtreeFlags)
                for (t = t.child; null !== t; )
                  (rn(e, t, n, r), (t = t.sibling));
            }
            function rn(e, t, n, r) {
              var a = t.flags;
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  (rt(e, t, n, r), 2048 & a && nU(9, t));
                  break;
                case 1:
                case 31:
                case 13:
                default:
                  rt(e, t, n, r);
                  break;
                case 3:
                  (rt(e, t, n, r),
                    2048 & a &&
                      ((e = null),
                      null !== t.alternate &&
                        (e = t.alternate.memoizedState.cache),
                      (t = t.memoizedState.cache) !== e &&
                        (t.refCount++, null != e && ea(e))));
                  break;
                case 12:
                  if (2048 & a) {
                    (rt(e, t, n, r), (e = t.stateNode));
                    try {
                      var i = t.memoizedProps,
                        o = i.id,
                        l = i.onPostCommit;
                      'function' == typeof l &&
                        l(
                          o,
                          null === t.alternate ? 'mount' : 'update',
                          e.passiveEffectDuration,
                          -0
                        );
                    } catch (e) {
                      rJ(t, t.return, e);
                    }
                  } else rt(e, t, n, r);
                  break;
                case 23:
                  break;
                case 22:
                  ((i = t.stateNode),
                    (o = t.alternate),
                    null !== t.memoizedState
                      ? 2 & i._visibility
                        ? rt(e, t, n, r)
                        : rr(e, t)
                      : 2 & i._visibility
                        ? rt(e, t, n, r)
                        : ((i._visibility |= 2),
                          (function e(t, n, r, a, i) {
                            for (
                              i = i && (10256 & n.subtreeFlags) != 0,
                                n = n.child;
                              null !== n;
                            ) {
                              var o = n,
                                l = o.flags;
                              switch (o.tag) {
                                case 0:
                                case 11:
                                case 15:
                                  (e(t, o, r, a, i), nU(8, o));
                                  break;
                                case 23:
                                  break;
                                case 22:
                                  var s = o.stateNode;
                                  (null !== o.memoizedState
                                    ? 2 & s._visibility
                                      ? e(t, o, r, a, i)
                                      : rr(t, o)
                                    : ((s._visibility |= 2), e(t, o, r, a, i)),
                                    i && 2048 & l && n7(o.alternate, o));
                                  break;
                                case 24:
                                  (e(t, o, r, a, i),
                                    i && 2048 & l && re(o.alternate, o));
                                  break;
                                default:
                                  e(t, o, r, a, i);
                              }
                              n = n.sibling;
                            }
                          })(e, t, n, r, (10256 & t.subtreeFlags) != 0)),
                    2048 & a && n7(o, t));
                  break;
                case 24:
                  (rt(e, t, n, r), 2048 & a && re(t.alternate, t));
              }
            }
            function rr(e, t) {
              if (10256 & t.subtreeFlags)
                for (t = t.child; null !== t; ) {
                  var n = t,
                    r = n.flags;
                  switch (n.tag) {
                    case 22:
                      (rr(e, n), 2048 & r && n7(n.alternate, n));
                      break;
                    case 24:
                      (rr(e, n), 2048 & r && re(n.alternate, n));
                      break;
                    default:
                      rr(e, n);
                  }
                  t = t.sibling;
                }
            }
            function ra(e, t, n) {
              if (e.subtreeFlags & sl)
                for (e = e.child; null !== e; ) (ri(e, t, n), (e = e.sibling));
            }
            function ri(e, t, n) {
              switch (e.tag) {
                case 26:
                  if ((ra(e, t, n), e.flags & sl))
                    if (null !== e.memoizedState)
                      oA(n, so, e.memoizedState, e.memoizedProps);
                    else {
                      var r = e.stateNode,
                        a = e.type;
                      ((e = e.memoizedProps),
                        ((0x13ffff40 & t) === t || aZ(a, e)) && a1(n, r, a, e));
                    }
                  break;
                case 5:
                  (ra(e, t, n),
                    e.flags & sl &&
                      ((r = e.stateNode),
                      (a = e.type),
                      (e = e.memoizedProps),
                      ((0x13ffff40 & t) === t || aZ(a, e)) && a1(n, r, a, e)));
                  break;
                case 3:
                case 4:
                  oa
                    ? ((r = so),
                      (so = oo(e.stateNode.containerInfo)),
                      ra(e, t, n),
                      (so = r))
                    : ra(e, t, n);
                  break;
                case 22:
                  null === e.memoizedState &&
                    (null !== (r = e.alternate) && null !== r.memoizedState
                      ? ((r = sl), (sl = 0x1000000), ra(e, t, n), (sl = r))
                      : ra(e, t, n));
                  break;
                default:
                  ra(e, t, n);
              }
            }
            function ro(e) {
              var t = e.alternate;
              if (null !== t && null !== (e = t.child)) {
                t.child = null;
                do ((t = e.sibling), (e.sibling = null), (e = t));
                while (null !== e);
              }
            }
            function rl(e) {
              var t = e.deletions;
              if ((16 & e.flags) != 0) {
                if (null !== t)
                  for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    ((sr = r), ru(r, e));
                  }
                ro(e);
              }
              if (10256 & e.subtreeFlags)
                for (e = e.child; null !== e; ) (rs(e), (e = e.sibling));
            }
            function rs(e) {
              switch (e.tag) {
                case 0:
                case 11:
                case 15:
                  (rl(e), 2048 & e.flags && nO(9, e, e.return));
                  break;
                case 3:
                case 12:
                default:
                  rl(e);
                  break;
                case 22:
                  var t = e.stateNode;
                  null !== e.memoizedState &&
                  2 & t._visibility &&
                  (null === e.return || 13 !== e.return.tag)
                    ? ((t._visibility &= -3),
                      (function e(t) {
                        var n = t.deletions;
                        if ((16 & t.flags) != 0) {
                          if (null !== n)
                            for (var r = 0; r < n.length; r++) {
                              var a = n[r];
                              ((sr = a), ru(a, t));
                            }
                          ro(t);
                        }
                        for (t = t.child; null !== t; ) {
                          switch ((n = t).tag) {
                            case 0:
                            case 11:
                            case 15:
                              (nO(8, n, n.return), e(n));
                              break;
                            case 22:
                              2 & (r = n.stateNode)._visibility &&
                                ((r._visibility &= -3), e(n));
                              break;
                            default:
                              e(n);
                          }
                          t = t.sibling;
                        }
                      })(e))
                    : rl(e);
              }
            }
            function ru(e, t) {
              for (; null !== sr; ) {
                var n = sr;
                switch (n.tag) {
                  case 0:
                  case 11:
                  case 15:
                    nO(8, n, t);
                    break;
                  case 23:
                  case 22:
                    if (
                      null !== n.memoizedState &&
                      null !== n.memoizedState.cachePool
                    ) {
                      var r = n.memoizedState.cachePool.pool;
                      null != r && r.refCount++;
                    }
                    break;
                  case 24:
                    ea(n.memoizedState.cache);
                }
                if (null !== (r = n.child)) ((r.return = n), (sr = r));
                else
                  for (n = e; null !== sr; ) {
                    var a = (r = sr).sibling,
                      i = r.return;
                    if (
                      ((function e(t) {
                        var n = t.alternate;
                        (null !== n && ((t.alternate = null), e(n)),
                          (t.child = null),
                          (t.deletions = null),
                          (t.sibling = null),
                          5 === t.tag && null !== (n = t.stateNode) && aW(n),
                          (t.stateNode = null),
                          (t.return = null),
                          (t.dependencies = null),
                          (t.memoizedProps = null),
                          (t.memoizedState = null),
                          (t.pendingProps = null),
                          (t.stateNode = null),
                          (t.updateQueue = null));
                      })(r),
                      r === n)
                    ) {
                      sr = null;
                      break;
                    }
                    if (null !== a) {
                      ((a.return = i), (sr = a));
                      break;
                    }
                    sr = i;
                  }
              }
            }
            function rc(e) {
              var t = aJ(e);
              if (null != t) {
                if ('string' != typeof t.memoizedProps['data-testname'])
                  throw Error(r(364));
                return t;
              }
              if (null === (e = a7(e))) throw Error(r(362));
              return e.stateNode.current;
            }
            function rd(e, t) {
              var n = e.tag;
              switch (t.$$typeof) {
                case su:
                  if (e.type === t.value) return !0;
                  break;
                case sc:
                  n: {
                    for (t = t.value, e = [e, 0], n = 0; n < e.length; ) {
                      var a = e[n++],
                        i = a.tag,
                        o = e[n++],
                        l = t[o];
                      if ((5 !== i && 26 !== i && 27 !== i) || !ir(a)) {
                        for (; null != l && rd(a, l); ) l = t[++o];
                        if (o === t.length) {
                          t = !0;
                          break n;
                        }
                        for (a = a.child; null !== a; )
                          (e.push(a, o), (a = a.sibling));
                      }
                    }
                    t = !1;
                  }
                  return t;
                case sd:
                  if (
                    (5 === n || 26 === n || 27 === n) &&
                    ia(e.stateNode, t.value)
                  )
                    return !0;
                  break;
                case sp:
                  if (
                    (5 === n || 6 === n || 26 === n || 27 === n) &&
                    null !== (e = it(e)) &&
                    0 <= e.indexOf(t.value)
                  )
                    return !0;
                  break;
                case sf:
                  if (
                    (5 === n || 26 === n || 27 === n) &&
                    'string' == typeof (e = e.memoizedProps['data-testname']) &&
                    e.toLowerCase() === t.value.toLowerCase()
                  )
                    return !0;
                  break;
                default:
                  throw Error(r(365));
              }
              return !1;
            }
            function rf(e) {
              switch (e.$$typeof) {
                case su:
                  return '<' + (s(e.value) || 'Unknown') + '>';
                case sc:
                  return ':has(' + (rf(e) || '') + ')';
                case sd:
                  return '[role="' + e.value + '"]';
                case sp:
                  return '"' + e.value + '"';
                case sf:
                  return '[data-testname="' + e.value + '"]';
                default:
                  throw Error(r(365));
              }
            }
            function rp(e, t) {
              var n = [];
              e = [e, 0];
              for (var r = 0; r < e.length; ) {
                var a = e[r++],
                  i = a.tag,
                  o = e[r++],
                  l = t[o];
                if ((5 !== i && 26 !== i && 27 !== i) || !ir(a)) {
                  for (; null != l && rd(a, l); ) l = t[++o];
                  if (o === t.length) n.push(a);
                  else
                    for (a = a.child; null !== a; )
                      (e.push(a, o), (a = a.sibling));
                }
              }
              return n;
            }
            function rh(e, t) {
              if (!a5) throw Error(r(363));
              ((e = rp((e = rc(e)), t)), (t = []), (e = Array.from(e)));
              for (var n = 0; n < e.length; ) {
                var a = e[n++],
                  i = a.tag;
                if (5 === i || 26 === i || 27 === i)
                  ir(a) || t.push(a.stateNode);
                else
                  for (a = a.child; null !== a; ) (e.push(a), (a = a.sibling));
              }
              return t;
            }
            function rm() {
              return (2 & sg) != 0 && 0 !== sB
                ? sB & -sB
                : null !== ay.T
                  ? ep()
                  : aX();
            }
            function rg() {
              if (0 === sR)
                if ((0x20000000 & sB) == 0 || ln) {
                  var e = oI;
                  ((3932160 & (oI <<= 1)) == 0 && (oI = 262144), (sR = e));
                } else sR = 0x20000000;
              return (null !== (e = lO.current) && (e.flags |= 32), sR);
            }
            function rA(e, t, n) {
              (((e === sA && (2 === sb || 9 === sb)) ||
                null !== e.cancelPendingCommit) &&
                (rx(e, 0), rb(e, sB, sR, !1)),
                A(e, n),
                ((2 & sg) == 0 || e !== sA) &&
                  (e === sA &&
                    ((2 & sg) == 0 && (sF |= n), 4 === sE && rb(e, sB, sR, !1)),
                  eo(e)));
            }
            function rv(e, t, n) {
              if ((6 & sg) != 0) throw Error(r(327));
              for (
                var a =
                    (!n && (127 & t) == 0 && (t & e.expiredLanes) == 0) ||
                    h(e, t),
                  i = a
                    ? (function (e, t) {
                        var n = sg;
                        sg |= 2;
                        var a = rE(),
                          i = rM();
                        sA !== e || sB !== t
                          ? ((sN = null), (sL = oL() + 500), rx(e, t))
                          : (sx = h(e, t));
                        n: for (;;)
                          try {
                            if (0 !== sb && null !== sv) {
                              t = sv;
                              var o = sC;
                              r: switch (sb) {
                                case 1:
                                  ((sb = 0), (sC = null), rG(e, t, o, 1));
                                  break;
                                case 2:
                                case 9:
                                  if (eB(o)) {
                                    ((sb = 0), (sC = null), rI(t));
                                    break;
                                  }
                                  ((t = function () {
                                    ((2 !== sb && 9 !== sb) ||
                                      sA !== e ||
                                      (sb = 7),
                                      eo(e));
                                  }),
                                    o.then(t, t));
                                  break n;
                                case 3:
                                  sb = 7;
                                  break n;
                                case 4:
                                  sb = 5;
                                  break n;
                                case 7:
                                  eB(o)
                                    ? ((sb = 0), (sC = null), rI(t))
                                    : ((sb = 0), (sC = null), rG(e, t, o, 7));
                                  break;
                                case 5:
                                  var l = null;
                                  switch (sv.tag) {
                                    case 26:
                                      l = sv.memoizedState;
                                    case 5:
                                    case 27:
                                      var s = sv,
                                        u = s.type,
                                        c = s.pendingProps;
                                      if (l ? og(l) : a$(s.stateNode, u, c)) {
                                        ((sb = 0), (sC = null));
                                        var d = s.sibling;
                                        if (null !== d) sv = d;
                                        else {
                                          var f = s.return;
                                          null !== f
                                            ? ((sv = f), rD(f))
                                            : (sv = null);
                                        }
                                        break r;
                                      }
                                  }
                                  ((sb = 0), (sC = null), rG(e, t, o, 5));
                                  break;
                                case 6:
                                  ((sb = 0), (sC = null), rG(e, t, o, 6));
                                  break;
                                case 8:
                                  (ry(), (sE = 6));
                                  break n;
                                default:
                                  throw Error(r(462));
                              }
                            }
                            for (; null !== sv && !ok(); ) rR(sv);
                            break;
                          } catch (t) {
                            rw(e, t);
                          }
                        return (
                          (ls = ll = null),
                          (ay.H = a),
                          (ay.A = i),
                          (sg = n),
                          null !== sv ? 0 : ((sA = null), (sB = 0), eF(), sE)
                        );
                      })(e, t)
                    : rT(e, t, !0),
                  o = a;
                ;
              ) {
                if (0 === i) sx && !a && rb(e, t, 0, !1);
                else {
                  if (
                    ((n = e.current.alternate),
                    o &&
                      !(function (e) {
                        for (var t = e; ; ) {
                          var n = t.tag;
                          if (
                            (0 === n || 11 === n || 15 === n) &&
                            16384 & t.flags &&
                            null !== (n = t.updateQueue) &&
                            null !== (n = n.stores)
                          )
                            for (var r = 0; r < n.length; r++) {
                              var a = n[r],
                                i = a.getSnapshot;
                              a = a.value;
                              try {
                                if (!oQ(i(), a)) return !1;
                              } catch {
                                return !1;
                              }
                            }
                          if (
                            ((n = t.child),
                            16384 & t.subtreeFlags && null !== n)
                          )
                            ((n.return = t), (t = n));
                          else {
                            if (t === e) break;
                            for (; null === t.sibling; ) {
                              if (null === t.return || t.return === e)
                                return !0;
                              t = t.return;
                            }
                            ((t.sibling.return = t.return), (t = t.sibling));
                          }
                        }
                        return !0;
                      })(n))
                  ) {
                    ((i = rT(e, t, !1)), (o = !1));
                    continue;
                  }
                  if (2 === i) {
                    if (((o = t), e.errorRecoveryDisabledLanes & o)) var l = 0;
                    else
                      l =
                        0 != (l = -0x20000001 & e.pendingLanes)
                          ? l
                          : 0x20000000 & l
                            ? 0x20000000
                            : 0;
                    if (0 !== l) {
                      t = l;
                      n: {
                        i = sG;
                        var s = aj && e.current.memoizedState.isDehydrated;
                        if (
                          (s && (rx(e, l).flags |= 256),
                          2 !== (l = rT(e, l, !1)))
                        ) {
                          if (sw && !s) {
                            ((e.errorRecoveryDisabledLanes |= o),
                              (sF |= o),
                              (i = 4));
                            break n;
                          }
                          ((o = sD),
                            (sD = i),
                            null !== o &&
                              (null === sD ? (sD = o) : sD.push.apply(sD, o)));
                        }
                        i = l;
                      }
                      if (((o = !1), 2 !== i)) continue;
                    }
                  }
                  if (1 === i) {
                    (rx(e, 0), rb(e, t, 0, !0));
                    break;
                  }
                  n: {
                    switch (((a = e), (o = i))) {
                      case 0:
                      case 1:
                        throw Error(r(345));
                      case 4:
                        if ((4194048 & t) !== t) break;
                      case 6:
                        rb(a, t, sR, !sy);
                        break n;
                      case 2:
                        sD = null;
                        break;
                      case 3:
                      case 5:
                        break;
                      default:
                        throw Error(r(329));
                    }
                    if ((0x3c00000 & t) === t && 10 < (i = sk + 300 - oL())) {
                      if ((rb(a, t, sR, !sy), 0 !== p(a, 0, !0))) break n;
                      ((sJ = t),
                        (a.timeoutHandle = aP(
                          rB.bind(
                            null,
                            a,
                            n,
                            sD,
                            sN,
                            s_,
                            t,
                            sR,
                            sF,
                            sI,
                            sy,
                            o,
                            'Throttled',
                            -0,
                            0
                          ),
                          i
                        )));
                      break n;
                    }
                    rB(a, n, sD, sN, s_, t, sR, sF, sI, sy, o, null, -0, 0);
                  }
                }
                break;
              }
              eo(e);
            }
            function rB(e, t, n, r, a, i, o, l, s, u, c, d, f, p) {
              if (
                ((e.timeoutHandle = aN),
                8192 & (d = t.subtreeFlags) || (0x1002000 & d) == 0x1002000)
              ) {
                ri(t, i, (d = a0()));
                var h =
                  (0x3c00000 & i) === i
                    ? sk - oL()
                    : (4194048 & i) === i
                      ? sP - oL()
                      : 0;
                if (null !== (h = a2(d, h))) {
                  ((sJ = i),
                    (e.cancelPendingCommit = h(
                      rk.bind(null, e, t, i, n, r, a, o, l, s, c, d, null, f, p)
                    )),
                    rb(e, i, o, !u));
                  return;
                }
              }
              rk(e, t, i, n, r, a, o, l, s);
            }
            function rb(e, t, n, r) {
              ((t &= ~sT),
                (t &= ~sF),
                (e.suspendedLanes |= t),
                (e.pingedLanes &= ~t),
                r && (e.warmLanes |= t),
                (r = e.expirationTimes));
              for (var a = t; 0 < a; ) {
                var i = 31 - oM(a),
                  o = 1 << i;
                ((r[i] = -1), (a &= ~o));
              }
              0 !== n && v(e, n, t);
            }
            function rC() {
              return (6 & sg) != 0 || (el(0, !1), !1);
            }
            function ry() {
              if (null !== sv) {
                if (0 === sb) var e = sv.return;
                else
                  ((e = sv),
                    (ls = ll = null),
                    e6(e),
                    (lR = null),
                    (lI = 0),
                    (e = sv));
                for (; null !== e; ) (nH(e.alternate, e), (e = e.return));
                sv = null;
              }
            }
            function rx(e, t) {
              var n = e.timeoutHandle;
              (n !== aN && ((e.timeoutHandle = aN), aL(n)),
                null !== (n = e.cancelPendingCommit) &&
                  ((e.cancelPendingCommit = null), n()),
                (sJ = 0),
                ry(),
                (sA = e),
                (sv = n = rq(e.current, null)),
                (sB = t),
                (sb = 0),
                (sC = null),
                (sy = !1),
                (sx = h(e, t)),
                (sw = !1),
                (sI = sR = sT = sF = sM = sE = 0),
                (sD = sG = null),
                (s_ = !1),
                (8 & t) != 0 && (t |= 32 & t));
              var r = e.entangledLanes;
              if (0 !== r)
                for (e = e.entanglements, r &= t; 0 < r; ) {
                  var a = 31 - oM(r),
                    i = 1 << a;
                  ((t |= e[a]), (r &= ~i));
                }
              return ((sS = t), eF(), n);
            }
            function rw(e, t) {
              ((lK = null),
                (ay.H = l1),
                t === lS || t === lM
                  ? ((t = ey()), (sb = 3))
                  : t === lE
                    ? ((t = ey()), (sb = 4))
                    : (sb =
                        t === l4
                          ? 8
                          : null !== t &&
                              'object' == typeof t &&
                              'function' == typeof t.then
                            ? 6
                            : 1),
                (sC = t),
                null === sv && ((sE = 1), t6(e, T(t, e.current))));
            }
            function rS() {
              var e = lO.current;
              return (
                null === e ||
                ((4194048 & sB) === sB
                  ? null === lj
                  : ((0x3c00000 & sB) === sB || (0x20000000 & sB) != 0) &&
                    e === lj)
              );
            }
            function rE() {
              var e = ay.H;
              return ((ay.H = l1), null === e ? l1 : e);
            }
            function rM() {
              var e = ay.A;
              return ((ay.A = ss), e);
            }
            function rF() {
              ((sE = 4),
                sy ||
                  ((4194048 & sB) !== sB && null !== lO.current) ||
                  (sx = !0),
                ((0x7ffffff & sM) == 0 && (0x7ffffff & sF) == 0) ||
                  null === sA ||
                  rb(sA, sB, sR, !1));
            }
            function rT(e, t, n) {
              var r = sg;
              sg |= 2;
              var a = rE(),
                i = rM();
              ((sA !== e || sB !== t) && ((sN = null), rx(e, t)), (t = !1));
              var o = sE;
              n: for (;;)
                try {
                  if (0 !== sb && null !== sv) {
                    var l = sv,
                      s = sC;
                    switch (sb) {
                      case 8:
                        (ry(), (o = 6));
                        break n;
                      case 3:
                      case 2:
                      case 9:
                      case 6:
                        null === lO.current && (t = !0);
                        var u = sb;
                        if (((sb = 0), (sC = null), rG(e, l, s, u), n && sx)) {
                          o = 0;
                          break n;
                        }
                        break;
                      default:
                        ((u = sb), (sb = 0), (sC = null), rG(e, l, s, u));
                    }
                  }
                  ((function () {
                    for (; null !== sv; ) rR(sv);
                  })(),
                    (o = sE));
                  break;
                } catch (t) {
                  rw(e, t);
                }
              return (
                t && e.shellSuspendCounter++,
                (ls = ll = null),
                (sg = r),
                (ay.H = a),
                (ay.A = i),
                null === sv && ((sA = null), (sB = 0), eF()),
                o
              );
            }
            function rR(e) {
              var t = nM(e.alternate, e, sS);
              ((e.memoizedProps = e.pendingProps),
                null === t ? rD(e) : (sv = t));
            }
            function rI(e) {
              var t = e,
                n = t.alternate;
              switch (t.tag) {
                case 15:
                case 0:
                  t = np(n, t, t.pendingProps, t.type, void 0, sB);
                  break;
                case 11:
                  t = np(n, t, t.pendingProps, t.type.render, t.ref, sB);
                  break;
                case 5:
                  e6(t);
                default:
                  (nH(n, t), (t = nM(n, (t = sv = rZ(t, sS)), sS)));
              }
              ((e.memoizedProps = e.pendingProps),
                null === t ? rD(e) : (sv = t));
            }
            function rG(e, t, n, a) {
              ((ls = ll = null), e6(t), (lR = null), (lI = 0));
              var i = t.return;
              try {
                if (
                  (function (e, t, n, a, i) {
                    if (
                      ((n.flags |= 32768),
                      null !== a &&
                        'object' == typeof a &&
                        'function' == typeof a.then)
                    ) {
                      if (
                        (null !== (t = n.alternate) && q(t, n, i, !0),
                        null !== (n = lO.current))
                      ) {
                        switch (n.tag) {
                          case 31:
                          case 13:
                            return (
                              null === lj
                                ? rF()
                                : null === n.alternate && 0 === sE && (sE = 3),
                              (n.flags &= -257),
                              (n.flags |= 65536),
                              (n.lanes = i),
                              a === lF
                                ? (n.flags |= 16384)
                                : (null === (t = n.updateQueue)
                                    ? (n.updateQueue = new Set([a]))
                                    : t.add(a),
                                  rz(e, a, i)),
                              !1
                            );
                          case 22:
                            return (
                              (n.flags |= 65536),
                              a === lF
                                ? (n.flags |= 16384)
                                : (null === (t = n.updateQueue)
                                    ? ((t = {
                                        transitions: null,
                                        markerInstances: null,
                                        retryQueue: new Set([a]),
                                      }),
                                      (n.updateQueue = t))
                                    : null === (n = t.retryQueue)
                                      ? (t.retryQueue = new Set([a]))
                                      : n.add(a),
                                  rz(e, a, i)),
                              !1
                            );
                        }
                        throw Error(r(435, n.tag));
                      }
                      return (rz(e, a, i), rF(), !1);
                    }
                    if (ln)
                      return (
                        null !== (t = lO.current)
                          ? ((65536 & t.flags) == 0 && (t.flags |= 256),
                            (t.flags |= 65536),
                            (t.lanes = i),
                            a !== li &&
                              Q(T((e = Error(r(422), { cause: a })), n)))
                          : (a !== li &&
                              Q(T((t = Error(r(423), { cause: a })), n)),
                            (e = e.current.alternate),
                            (e.flags |= 65536),
                            (i &= -i),
                            (e.lanes |= i),
                            (a = T(a, n)),
                            (i = t7(e.stateNode, a, i)),
                            eH(e, i),
                            4 !== sE && (sE = 2)),
                        !1
                      );
                    var o = Error(r(520), { cause: a });
                    if (
                      ((o = T(o, n)),
                      null === sG ? (sG = [o]) : sG.push(o),
                      4 !== sE && (sE = 2),
                      null === t)
                    )
                      return !0;
                    ((a = T(a, n)), (n = t));
                    do {
                      switch (n.tag) {
                        case 3:
                          return (
                            (n.flags |= 65536),
                            (e = i & -i),
                            (n.lanes |= e),
                            (e = t7(n.stateNode, a, e)),
                            eH(n, e),
                            !1
                          );
                        case 1:
                          if (
                            ((t = n.type),
                            (o = n.stateNode),
                            (128 & n.flags) == 0 &&
                              ('function' ==
                                typeof t.getDerivedStateFromError ||
                                (null !== o &&
                                  'function' == typeof o.componentDidCatch &&
                                  (null === sH || !sH.has(o)))))
                          )
                            return (
                              (n.flags |= 65536),
                              (i &= -i),
                              (n.lanes |= i),
                              nt((i = ne(i)), e, n, a),
                              eH(n, i),
                              !1
                            );
                      }
                      n = n.return;
                    } while (null !== n);
                    return !1;
                  })(e, i, t, n, sB)
                ) {
                  ((sE = 1), t6(e, T(n, e.current)), (sv = null));
                  return;
                }
              } catch (t) {
                if (null !== i) throw ((sv = i), t);
                ((sE = 1), t6(e, T(n, e.current)), (sv = null));
                return;
              }
              32768 & t.flags
                ? (ln || 1 === a
                    ? (e = !0)
                    : sx || (0x20000000 & sB) != 0
                      ? (e = !1)
                      : ((sy = e = !0),
                        (2 === a || 9 === a || 3 === a || 6 === a) &&
                          null !== (a = lO.current) &&
                          13 === a.tag &&
                          (a.flags |= 16384)),
                  r_(t, e))
                : rD(t);
            }
            function rD(e) {
              var t = e;
              do {
                if ((32768 & t.flags) != 0) return void r_(t, sy);
                e = t.return;
                var n = (function (e, t, n) {
                  var a = t.pendingProps;
                  switch ((D(t), t.tag)) {
                    case 16:
                    case 15:
                    case 0:
                    case 11:
                    case 7:
                    case 8:
                    case 12:
                    case 9:
                    case 14:
                    case 1:
                      return (nN(t), null);
                    case 3:
                      return (
                        (n = t.stateNode),
                        (a = null),
                        null !== e && (a = e.memoizedState.cache),
                        t.memoizedState.cache !== a && (t.flags |= 2048),
                        V(lf),
                        L(),
                        n.pendingContext &&
                          ((n.context = n.pendingContext),
                          (n.pendingContext = null)),
                        (null === e || null === e.child) &&
                          (J(t)
                            ? nF(t)
                            : null === e ||
                              (e.memoizedState.isDehydrated &&
                                (256 & t.flags) == 0) ||
                              ((t.flags |= 1024), K())),
                        nG(e, t),
                        nN(t),
                        null
                      );
                    case 26:
                      if (oa) {
                        var i = t.type,
                          o = t.memoizedState;
                        return (
                          null === e
                            ? (nF(t),
                              null !== o
                                ? (nN(t), nk(t, o))
                                : (nN(t), n_(t, i, null, a, n)))
                            : o
                              ? o !== e.memoizedState
                                ? (nF(t), nN(t), nk(t, o))
                                : (nN(t), (t.flags &= -0x1000001))
                              : ((o = e.memoizedProps),
                                aU ? o !== a && nF(t) : nD(e, t, i, a),
                                nN(t),
                                n_(t, i, o, a, n)),
                          null
                        );
                      }
                    case 27:
                      if (ov) {
                        if (
                          (H(t),
                          (n = o5.current),
                          (i = t.type),
                          null !== e && null != t.stateNode)
                        )
                          aU ? e.memoizedProps !== a && nF(t) : nD(e, t, i, a);
                        else {
                          if (!a) {
                            if (null === t.stateNode) throw Error(r(166));
                            return (nN(t), null);
                          }
                          ((e = o4.current),
                            J(t)
                              ? O(t, e)
                              : ((t.stateNode = e = oB(i, a, n, e, !0)),
                                nF(t)));
                        }
                        return (nN(t), null);
                      }
                    case 5:
                      if (
                        (H(t), (i = t.type), null !== e && null != t.stateNode)
                      )
                        nD(e, t, i, a);
                      else {
                        if (!a) {
                          if (null === t.stateNode) throw Error(r(166));
                          return (nN(t), null);
                        }
                        if (((o = o4.current), J(t)))
                          (O(t, o),
                            i3(t.stateNode, i, a, o) && (t.flags |= 64));
                        else {
                          var l = aI(i, a, o5.current, o, t);
                          (nT(t),
                            nI(l, t, !1, !1),
                            (t.stateNode = l),
                            aD(l, i, a, o) && nF(t));
                        }
                      }
                      return (
                        nN(t),
                        n_(
                          t,
                          t.type,
                          null === e ? null : e.memoizedProps,
                          t.pendingProps,
                          n
                        ),
                        null
                      );
                    case 6:
                      if (e && null != t.stateNode)
                        ((n = e.memoizedProps),
                          aU
                            ? n !== a && nF(t)
                            : aO &&
                              (n !== a
                                ? ((e = o5.current),
                                  (n = o4.current),
                                  nT(t),
                                  (t.stateNode = ak(a, e, n, t)))
                                : (t.stateNode = e.stateNode)));
                      else {
                        if ('string' != typeof a && null === t.stateNode)
                          throw Error(r(166));
                        if (((e = o5.current), (n = o4.current), J(t))) {
                          if (!aj) throw Error(r(176));
                          if (
                            ((e = t.stateNode),
                            (n = t.memoizedProps),
                            (a = null),
                            null !== (i = le))
                          )
                            switch (i.tag) {
                              case 27:
                              case 5:
                                a = i.memoizedProps;
                            }
                          iV(e, n, t, a) || U(t, !0);
                        } else (nT(t), (t.stateNode = ak(a, e, n, t)));
                      }
                      return (nN(t), null);
                    case 31:
                      if (
                        ((n = t.memoizedState),
                        null === e || null !== e.memoizedState)
                      ) {
                        if (((a = J(t)), null !== n)) {
                          if (null === e) {
                            if (!a) throw Error(r(318));
                            if (!aj) throw Error(r(556));
                            if (
                              !(e =
                                null !== (e = t.memoizedState)
                                  ? e.dehydrated
                                  : null)
                            )
                              throw Error(r(557));
                            iW(e, t);
                          } else
                            (z(),
                              (128 & t.flags) == 0 && (t.memoizedState = null),
                              (t.flags |= 4));
                          (nN(t), (e = !1));
                        } else
                          ((n = K()),
                            null !== e &&
                              null !== e.memoizedState &&
                              (e.memoizedState.hydrationErrors = n),
                            (e = !0));
                        if (!e)
                          return 256 & t.flags ? (eq(t), t) : (eq(t), null);
                        if ((128 & t.flags) != 0) throw Error(r(558));
                      }
                      return (nN(t), null);
                    case 13:
                      if (
                        ((a = t.memoizedState),
                        null === e ||
                          (null !== e.memoizedState &&
                            null !== e.memoizedState.dehydrated))
                      ) {
                        if (((i = J(t)), null !== a && null !== a.dehydrated)) {
                          if (null === e) {
                            if (!i) throw Error(r(318));
                            if (!aj) throw Error(r(344));
                            if (
                              !(i =
                                null !== (i = t.memoizedState)
                                  ? i.dehydrated
                                  : null)
                            )
                              throw Error(r(317));
                            iY(i, t);
                          } else
                            (z(),
                              (128 & t.flags) == 0 && (t.memoizedState = null),
                              (t.flags |= 4));
                          (nN(t), (i = !1));
                        } else
                          ((i = K()),
                            null !== e &&
                              null !== e.memoizedState &&
                              (e.memoizedState.hydrationErrors = i),
                            (i = !0));
                        if (!i)
                          return 256 & t.flags ? (eq(t), t) : (eq(t), null);
                      }
                      return (
                        eq(t),
                        (128 & t.flags) != 0
                          ? ((t.lanes = n), t)
                          : ((n = null !== a),
                            (e = null !== e && null !== e.memoizedState),
                            n &&
                              ((a = t.child),
                              (i = null),
                              null !== a.alternate &&
                                null !== a.alternate.memoizedState &&
                                null !== a.alternate.memoizedState.cachePool &&
                                (i = a.alternate.memoizedState.cachePool.pool),
                              (o = null),
                              null !== a.memoizedState &&
                                null !== a.memoizedState.cachePool &&
                                (o = a.memoizedState.cachePool.pool),
                              o !== i && (a.flags |= 2048)),
                            n !== e && n && (t.child.flags |= 8192),
                            nP(t, t.updateQueue),
                            nN(t),
                            null)
                      );
                    case 4:
                      return (
                        L(),
                        nG(e, t),
                        null === e && az(t.stateNode.containerInfo),
                        nN(t),
                        null
                      );
                    case 10:
                      return (V(t.type), nN(t), null);
                    case 19:
                      if ((c(lJ), null === (a = t.memoizedState)))
                        return (nN(t), null);
                      if (
                        ((i = (128 & t.flags) != 0), null === (o = a.rendering))
                      )
                        if (i) nL(a, !1);
                        else {
                          if (0 !== sE || (null !== e && (128 & e.flags) != 0))
                            for (e = t.child; null !== e; ) {
                              if (null !== (o = eZ(e))) {
                                for (
                                  t.flags |= 128,
                                    nL(a, !1),
                                    t.updateQueue = e = o.updateQueue,
                                    nP(t, e),
                                    t.subtreeFlags = 0,
                                    e = n,
                                    n = t.child;
                                  null !== n;
                                )
                                  (rZ(n, e), (n = n.sibling));
                                return (
                                  d(lJ, (1 & lJ.current) | 2),
                                  ln && R(t, a.treeForkCount),
                                  t.child
                                );
                              }
                              e = e.sibling;
                            }
                          null !== a.tail &&
                            oL() > sL &&
                            ((t.flags |= 128),
                            (i = !0),
                            nL(a, !1),
                            (t.lanes = 4194304));
                        }
                      else {
                        if (!i)
                          if (null !== (e = eZ(o))) {
                            if (
                              ((t.flags |= 128),
                              (i = !0),
                              (t.updateQueue = e = e.updateQueue),
                              nP(t, e),
                              nL(a, !0),
                              null === a.tail &&
                                'hidden' === a.tailMode &&
                                !o.alternate &&
                                !ln)
                            )
                              return (nN(t), null);
                          } else
                            2 * oL() - a.renderingStartTime > sL &&
                              0x20000000 !== n &&
                              ((t.flags |= 128),
                              (i = !0),
                              nL(a, !1),
                              (t.lanes = 4194304));
                        a.isBackwards
                          ? ((o.sibling = t.child), (t.child = o))
                          : (null !== (e = a.last)
                              ? (e.sibling = o)
                              : (t.child = o),
                            (a.last = o));
                      }
                      return null !== a.tail
                        ? ((e = a.tail),
                          (a.rendering = e),
                          (a.tail = e.sibling),
                          (a.renderingStartTime = oL()),
                          (e.sibling = null),
                          (n = lJ.current),
                          d(lJ, i ? (1 & n) | 2 : 1 & n),
                          ln && R(t, a.treeForkCount),
                          e)
                        : (nN(t), null);
                    case 22:
                    case 23:
                      return (
                        eq(t),
                        eQ(),
                        (a = null !== t.memoizedState),
                        null !== e
                          ? (null !== e.memoizedState) !== a &&
                            (t.flags |= 8192)
                          : a && (t.flags |= 8192),
                        a
                          ? (0x20000000 & n) != 0 &&
                            (128 & t.flags) == 0 &&
                            (nN(t), 6 & t.subtreeFlags && (t.flags |= 8192))
                          : nN(t),
                        null !== (n = t.updateQueue) && nP(t, n.retryQueue),
                        (n = null),
                        null !== e &&
                          null !== e.memoizedState &&
                          null !== e.memoizedState.cachePool &&
                          (n = e.memoizedState.cachePool.pool),
                        (a = null),
                        null !== t.memoizedState &&
                          null !== t.memoizedState.cachePool &&
                          (a = t.memoizedState.cachePool.pool),
                        a !== n && (t.flags |= 2048),
                        null !== e && c(lw),
                        null
                      );
                    case 24:
                      return (
                        (n = null),
                        null !== e && (n = e.memoizedState.cache),
                        t.memoizedState.cache !== n && (t.flags |= 2048),
                        V(lf),
                        nN(t),
                        null
                      );
                    case 25:
                    case 30:
                      return null;
                  }
                  throw Error(r(156, t.tag));
                })(t.alternate, t, sS);
                if (null !== n) {
                  sv = n;
                  return;
                }
                if (null !== (t = t.sibling)) {
                  sv = t;
                  return;
                }
                sv = t = e;
              } while (null !== t);
              0 === sE && (sE = 5);
            }
            function r_(e, t) {
              do {
                var n = (function (e, t) {
                  switch ((D(t), t.tag)) {
                    case 1:
                      return 65536 & (e = t.flags)
                        ? ((t.flags = (-65537 & e) | 128), t)
                        : null;
                    case 3:
                      return (
                        V(lf),
                        L(),
                        (65536 & (e = t.flags)) != 0 && (128 & e) == 0
                          ? ((t.flags = (-65537 & e) | 128), t)
                          : null
                      );
                    case 26:
                    case 27:
                    case 5:
                      return (H(t), null);
                    case 31:
                      if (null !== t.memoizedState) {
                        if ((eq(t), null === t.alternate)) throw Error(r(340));
                        z();
                      }
                      return 65536 & (e = t.flags)
                        ? ((t.flags = (-65537 & e) | 128), t)
                        : null;
                    case 13:
                      if (
                        (eq(t),
                        null !== (e = t.memoizedState) && null !== e.dehydrated)
                      ) {
                        if (null === t.alternate) throw Error(r(340));
                        z();
                      }
                      return 65536 & (e = t.flags)
                        ? ((t.flags = (-65537 & e) | 128), t)
                        : null;
                    case 19:
                      return (c(lJ), null);
                    case 4:
                      return (L(), null);
                    case 10:
                      return (V(t.type), null);
                    case 22:
                    case 23:
                      return (
                        eq(t),
                        eQ(),
                        null !== e && c(lw),
                        65536 & (e = t.flags)
                          ? ((t.flags = (-65537 & e) | 128), t)
                          : null
                      );
                    case 24:
                      return (V(lf), null);
                    default:
                      return null;
                  }
                })(e.alternate, e);
                if (null !== n) {
                  ((n.flags &= 32767), (sv = n));
                  return;
                }
                if (
                  (null !== (n = e.return) &&
                    ((n.flags |= 32768),
                    (n.subtreeFlags = 0),
                    (n.deletions = null)),
                  !t && null !== (e = e.sibling))
                ) {
                  sv = e;
                  return;
                }
                sv = e = n;
              } while (null !== e);
              ((sE = 6), (sv = null));
            }
            function rk(e, t, n, a, i, o, l, s, u) {
              e.cancelPendingCommit = null;
              do rU();
              while (0 !== sU);
              if ((6 & sg) != 0) throw Error(r(327));
              if (null !== t) {
                if (t === e.current) throw Error(r(177));
                if (
                  ((function (e, t, n, r, a, i) {
                    var o = e.pendingLanes;
                    ((e.pendingLanes = n),
                      (e.suspendedLanes = 0),
                      (e.pingedLanes = 0),
                      (e.warmLanes = 0),
                      (e.expiredLanes &= n),
                      (e.entangledLanes &= n),
                      (e.errorRecoveryDisabledLanes &= n),
                      (e.shellSuspendCounter = 0));
                    var l = e.entanglements,
                      s = e.expirationTimes,
                      u = e.hiddenUpdates;
                    for (n = o & ~n; 0 < n; ) {
                      var c = 31 - oM(n),
                        d = 1 << c;
                      ((l[c] = 0), (s[c] = -1));
                      var f = u[c];
                      if (null !== f)
                        for (u[c] = null, c = 0; c < f.length; c++) {
                          var p = f[c];
                          null !== p && (p.lane &= -0x20000001);
                        }
                      n &= ~d;
                    }
                    (0 !== r && v(e, r, 0),
                      0 !== i &&
                        0 === a &&
                        0 !== e.tag &&
                        (e.suspendedLanes |= i & ~(o & ~t)));
                  })(e, n, (o = t.lanes | t.childLanes | lP), l, s, u),
                  e === sA && ((sv = sA = null), (sB = 0)),
                  (sj = t),
                  (sO = e),
                  (sJ = n),
                  (sz = o),
                  (sK = i),
                  (sQ = a),
                  (10256 & t.subtreeFlags) != 0 || (10256 & t.flags) != 0
                    ? ((e.callbackNode = null),
                      (e.callbackPriority = 0),
                      oD(oU, function () {
                        return (rO(), null);
                      }))
                    : ((e.callbackNode = null), (e.callbackPriority = 0)),
                  (a = (13878 & t.flags) != 0),
                  (13878 & t.subtreeFlags) != 0 || a)
                ) {
                  ((a = ay.T),
                    (ay.T = null),
                    (i = aQ()),
                    aK(2),
                    (l = sg),
                    (sg |= 4));
                  try {
                    !(function (e, t) {
                      for (aT(e.containerInfo), sr = t; null !== sr; )
                        if (
                          ((t = (e = sr).child),
                          (1028 & e.subtreeFlags) != 0 && null !== t)
                        )
                          ((t.return = e), (sr = t));
                        else
                          for (; null !== sr; ) {
                            var n = (e = sr).alternate;
                            switch (((t = e.flags), e.tag)) {
                              case 0:
                                if (
                                  (4 & t) != 0 &&
                                  null !==
                                    (t =
                                      null !== (t = e.updateQueue)
                                        ? t.events
                                        : null)
                                )
                                  for (var a = 0; a < t.length; a++) {
                                    var i = t[a];
                                    i.ref.impl = i.nextImpl;
                                  }
                                break;
                              case 11:
                              case 15:
                              case 5:
                              case 26:
                              case 27:
                              case 6:
                              case 4:
                              case 17:
                                break;
                              case 1:
                                if ((1024 & t) != 0 && null !== n) {
                                  ((t = void 0),
                                    (a = e),
                                    (i = n.memoizedProps),
                                    (n = n.memoizedState));
                                  var o = a.stateNode;
                                  try {
                                    var l = t4(a.type, i);
                                    ((t = o.getSnapshotBeforeUpdate(l, n)),
                                      (o.__reactInternalSnapshotBeforeUpdate =
                                        t));
                                  } catch (e) {
                                    rJ(a, a.return, e);
                                  }
                                }
                                break;
                              case 3:
                                (1024 & t) != 0 &&
                                  aU &&
                                  iy(e.stateNode.containerInfo);
                                break;
                              default:
                                if ((1024 & t) != 0) throw Error(r(163));
                            }
                            if (null !== (t = e.sibling)) {
                              ((t.return = e.return), (sr = t));
                              break;
                            }
                            sr = e.return;
                          }
                    })(e, t, n);
                  } finally {
                    ((sg = l), aK(i), (ay.T = a));
                  }
                }
                ((sU = 1), rP(), rL(), rN());
              }
            }
            function rP() {
              if (1 === sU) {
                sU = 0;
                var e = sO,
                  t = sj,
                  n = (13878 & t.flags) != 0;
                if ((13878 & t.subtreeFlags) != 0 || n) {
                  ((n = ay.T), (ay.T = null));
                  var r = aQ();
                  aK(2);
                  var a = sg;
                  sg |= 4;
                  try {
                    (n4(t, e), aR(e.containerInfo));
                  } finally {
                    ((sg = a), aK(r), (ay.T = n));
                  }
                }
                ((e.current = t), (sU = 2));
              }
            }
            function rL() {
              if (2 === sU) {
                sU = 0;
                var e = sO,
                  t = sj,
                  n = (8772 & t.flags) != 0;
                if ((8772 & t.subtreeFlags) != 0 || n) {
                  ((n = ay.T), (ay.T = null));
                  var r = aQ();
                  aK(2);
                  var a = sg;
                  sg |= 4;
                  try {
                    n$(e, t.alternate, t);
                  } finally {
                    ((sg = a), aK(r), (ay.T = n));
                  }
                }
                sU = 3;
              }
            }
            function rN() {
              if (4 === sU || 3 === sU) {
                ((sU = 0), oP());
                var e = sO,
                  t = sj,
                  n = sJ,
                  r = sQ;
                (10256 & t.subtreeFlags) != 0 || (10256 & t.flags) != 0
                  ? (sU = 5)
                  : ((sU = 0), (sj = sO = null), rH(e, e.pendingLanes));
                var a = e.pendingLanes;
                if (
                  (0 === a && (sH = null),
                  y(n),
                  (t = t.stateNode),
                  oK && 'function' == typeof oK.onCommitFiberRoot)
                )
                  try {
                    oK.onCommitFiberRoot(
                      oz,
                      t,
                      void 0,
                      (128 & t.current.flags) == 128
                    );
                  } catch {}
                if (null !== r) {
                  ((t = ay.T), (a = aQ()), aK(2), (ay.T = null));
                  try {
                    for (
                      var i = e.onRecoverableError, o = 0;
                      o < r.length;
                      o++
                    ) {
                      var l = r[o];
                      i(l.value, { componentStack: l.stack });
                    }
                  } finally {
                    ((ay.T = t), aK(a));
                  }
                }
                ((3 & sJ) != 0 && rU(),
                  eo(e),
                  (a = e.pendingLanes),
                  (261930 & n) != 0 && (42 & a) != 0
                    ? e === sV
                      ? sX++
                      : ((sX = 0), (sV = e))
                    : (sX = 0),
                  aj && i9(),
                  el(0, !1));
              }
            }
            function rH(e, t) {
              0 == (e.pooledCacheLanes &= t) &&
                null != (t = e.pooledCache) &&
                ((e.pooledCache = null), ea(t));
            }
            function rU() {
              return (rP(), rL(), rN(), rO());
            }
            function rO() {
              if (5 !== sU) return !1;
              var e = sO,
                t = sz;
              sz = 0;
              var n = y(sJ),
                a = 32 > n ? 32 : n;
              n = ay.T;
              var i = aQ();
              try {
                (aK(a), (ay.T = null), (a = sK), (sK = null));
                var o = sO,
                  l = sJ;
                if (((sU = 0), (sj = sO = null), (sJ = 0), (6 & sg) != 0))
                  throw Error(r(331));
                var s = sg;
                if (
                  ((sg |= 4),
                  rs(o.current),
                  rn(o, o.current, l, a),
                  (sg = s),
                  el(0, !1),
                  oK && 'function' == typeof oK.onPostCommitFiberRoot)
                )
                  try {
                    oK.onPostCommitFiberRoot(oz, o);
                  } catch {}
                return !0;
              } finally {
                (aK(i), (ay.T = n), rH(e, t));
              }
            }
            function rj(e, t, n) {
              ((t = T(n, t)),
                (t = t7(e.stateNode, t, 2)),
                null !== (e = eL(e, t, 2)) && (A(e, 2), eo(e)));
            }
            function rJ(e, t, n) {
              if (3 === e.tag) rj(e, e, n);
              else
                for (; null !== t; ) {
                  if (3 === t.tag) {
                    rj(t, e, n);
                    break;
                  }
                  if (1 === t.tag) {
                    var r = t.stateNode;
                    if (
                      'function' == typeof t.type.getDerivedStateFromError ||
                      ('function' == typeof r.componentDidCatch &&
                        (null === sH || !sH.has(r)))
                    ) {
                      ((e = T(n, e)),
                        null !== (r = eL(t, (n = ne(2)), 2)) &&
                          (nt(n, r, t, e), A(r, 2), eo(r)));
                      break;
                    }
                  }
                  t = t.return;
                }
            }
            function rz(e, t, n) {
              var r = e.pingCache;
              if (null === r) {
                r = e.pingCache = new sm();
                var a = new Set();
                r.set(t, a);
              } else
                void 0 === (a = r.get(t)) && ((a = new Set()), r.set(t, a));
              a.has(n) ||
                ((sw = !0),
                a.add(n),
                (e = rK.bind(null, e, t, n)),
                t.then(e, e));
            }
            function rK(e, t, n) {
              var r = e.pingCache;
              (null !== r && r.delete(t),
                (e.pingedLanes |= e.suspendedLanes & n),
                (e.warmLanes &= ~n),
                sA === e &&
                  (sB & n) === n &&
                  (4 === sE ||
                  (3 === sE && (0x3c00000 & sB) === sB && 300 > oL() - sk)
                    ? (2 & sg) == 0 && rx(e, 0)
                    : (sT |= n),
                  sI === sB && (sI = 0)),
                eo(e));
            }
            function rQ(e, t) {
              (0 === t && (t = m()),
                null !== (e = eI(e, t)) && (A(e, t), eo(e)));
            }
            function rX(e) {
              var t = e.memoizedState,
                n = 0;
              (null !== t && (n = t.retryLane), rQ(e, n));
            }
            function rV(e, t) {
              var n = 0;
              switch (e.tag) {
                case 31:
                case 13:
                  var a = e.stateNode,
                    i = e.memoizedState;
                  null !== i && (n = i.retryLane);
                  break;
                case 19:
                  a = e.stateNode;
                  break;
                case 22:
                  a = e.stateNode._retryCache;
                  break;
                default:
                  throw Error(r(314));
              }
              (null !== a && a.delete(t), rQ(e, n));
            }
            function rW(e, t, n, r) {
              ((this.tag = e),
                (this.key = n),
                (this.sibling =
                  this.child =
                  this.return =
                  this.stateNode =
                  this.type =
                  this.elementType =
                    null),
                (this.index = 0),
                (this.refCleanup = this.ref = null),
                (this.pendingProps = t),
                (this.dependencies =
                  this.memoizedState =
                  this.updateQueue =
                  this.memoizedProps =
                    null),
                (this.mode = r),
                (this.subtreeFlags = this.flags = 0),
                (this.deletions = null),
                (this.childLanes = this.lanes = 0),
                (this.alternate = null));
            }
            function rY(e) {
              return !(!(e = e.prototype) || !e.isReactComponent);
            }
            function rq(e, n) {
              var r = e.alternate;
              return (
                null === r
                  ? (((r = t(e.tag, n, e.key, e.mode)).elementType =
                      e.elementType),
                    (r.type = e.type),
                    (r.stateNode = e.stateNode),
                    (r.alternate = e),
                    (e.alternate = r))
                  : ((r.pendingProps = n),
                    (r.type = e.type),
                    (r.flags = 0),
                    (r.subtreeFlags = 0),
                    (r.deletions = null)),
                (r.flags = 0x3e00000 & e.flags),
                (r.childLanes = e.childLanes),
                (r.lanes = e.lanes),
                (r.child = e.child),
                (r.memoizedProps = e.memoizedProps),
                (r.memoizedState = e.memoizedState),
                (r.updateQueue = e.updateQueue),
                (n = e.dependencies),
                (r.dependencies =
                  null === n
                    ? null
                    : { lanes: n.lanes, firstContext: n.firstContext }),
                (r.sibling = e.sibling),
                (r.index = e.index),
                (r.ref = e.ref),
                (r.refCleanup = e.refCleanup),
                r
              );
            }
            function rZ(e, t) {
              e.flags &= 0x3e00002;
              var n = e.alternate;
              return (
                null === n
                  ? ((e.childLanes = 0),
                    (e.lanes = t),
                    (e.child = null),
                    (e.subtreeFlags = 0),
                    (e.memoizedProps = null),
                    (e.memoizedState = null),
                    (e.updateQueue = null),
                    (e.dependencies = null),
                    (e.stateNode = null))
                  : ((e.childLanes = n.childLanes),
                    (e.lanes = n.lanes),
                    (e.child = n.child),
                    (e.subtreeFlags = 0),
                    (e.deletions = null),
                    (e.memoizedProps = n.memoizedProps),
                    (e.memoizedState = n.memoizedState),
                    (e.updateQueue = n.updateQueue),
                    (e.type = n.type),
                    (e.dependencies =
                      null === (t = n.dependencies)
                        ? null
                        : { lanes: t.lanes, firstContext: t.firstContext })),
                e
              );
            }
            function r$(e, n, a, i, o, l) {
              var s = 0;
              if (((i = e), 'function' == typeof e)) rY(e) && (s = 1);
              else if ('string' == typeof e)
                s =
                  oa && ov
                    ? oi(e, a, o4.current)
                      ? 26
                      : oy(e)
                        ? 27
                        : 5
                    : oa
                      ? oi(e, a, o4.current)
                        ? 26
                        : 5
                      : ov && oy(e)
                        ? 27
                        : 5;
              else
                n: switch (e) {
                  case aA:
                    return (
                      ((e = t(31, a, n, o)).elementType = aA),
                      (e.lanes = l),
                      e
                    );
                  case al:
                    return r0(a.children, o, l, n);
                  case as:
                    ((s = 8), (o |= 24));
                    break;
                  case au:
                    return (
                      ((e = t(12, a, n, 2 | o)).elementType = au),
                      (e.lanes = l),
                      e
                    );
                  case ap:
                    return (
                      ((e = t(13, a, n, o)).elementType = ap),
                      (e.lanes = l),
                      e
                    );
                  case ah:
                    return (
                      ((e = t(19, a, n, o)).elementType = ah),
                      (e.lanes = l),
                      e
                    );
                  default:
                    if ('object' == typeof e && null !== e)
                      switch (e.$$typeof) {
                        case ad:
                          s = 10;
                          break n;
                        case ac:
                          s = 9;
                          break n;
                        case af:
                          s = 11;
                          break n;
                        case am:
                          s = 14;
                          break n;
                        case ag:
                          ((s = 16), (i = null));
                          break n;
                      }
                    ((s = 29),
                      (a = Error(r(130, null === e ? 'null' : typeof e, ''))),
                      (i = null));
                }
              return (
                ((n = t(s, a, n, o)).elementType = e),
                (n.type = i),
                (n.lanes = l),
                n
              );
            }
            function r0(e, n, r, a) {
              return (((e = t(7, e, a, n)).lanes = r), e);
            }
            function r1(e, n, r) {
              return (((e = t(6, e, null, n)).lanes = r), e);
            }
            function r2(e) {
              var n = t(18, null, null, 0);
              return ((n.stateNode = e), n);
            }
            function r3(e, n, r) {
              return (
                ((n = t(
                  4,
                  null !== e.children ? e.children : [],
                  e.key,
                  n
                )).lanes = r),
                (n.stateNode = {
                  containerInfo: e.containerInfo,
                  pendingChildren: null,
                  implementation: e.implementation,
                }),
                n
              );
            }
            function r9(e, t, n, r, a, i, o, l, s) {
              ((this.tag = 1),
                (this.containerInfo = e),
                (this.pingCache = this.current = this.pendingChildren = null),
                (this.timeoutHandle = aN),
                (this.callbackNode =
                  this.next =
                  this.pendingContext =
                  this.context =
                  this.cancelPendingCommit =
                    null),
                (this.callbackPriority = 0),
                (this.expirationTimes = g(-1)),
                (this.entangledLanes =
                  this.shellSuspendCounter =
                  this.errorRecoveryDisabledLanes =
                  this.expiredLanes =
                  this.warmLanes =
                  this.pingedLanes =
                  this.suspendedLanes =
                  this.pendingLanes =
                    0),
                (this.entanglements = g(0)),
                (this.hiddenUpdates = g(null)),
                (this.identifierPrefix = r),
                (this.onUncaughtError = a),
                (this.onCaughtError = i),
                (this.onRecoverableError = o),
                (this.pooledCache = null),
                (this.pooledCacheLanes = 0),
                (this.formState = s),
                (this.incompleteTransitions = new Map()));
            }
            function r8(e, n, r, a, i, o, l, s, u, c, d, f) {
              return (
                (e = new r9(e, n, r, l, u, c, d, f, s)),
                (n = 1),
                !0 === o && (n |= 24),
                (o = t(3, null, null, n)),
                (e.current = o),
                (o.stateNode = e),
                (n = er()),
                n.refCount++,
                (e.pooledCache = n),
                n.refCount++,
                (o.memoizedState = { element: a, isDehydrated: r, cache: n }),
                e_(o),
                e
              );
            }
            function r4(e) {
              var t = e._reactInternals;
              if (void 0 === t)
                throw 'function' == typeof e.render
                  ? Error(r(188))
                  : Error(r(268, (e = Object.keys(e).join(','))));
              return null ===
                (e =
                  null !== (e = o(t))
                    ? (function e(t) {
                        var n = t.tag;
                        if (5 === n || 26 === n || 27 === n || 6 === n)
                          return t;
                        for (t = t.child; null !== t; ) {
                          if (null !== (n = e(t))) return n;
                          t = t.sibling;
                        }
                        return null;
                      })(e)
                    : null)
                ? null
                : aE(e.stateNode);
            }
            function r6(e, t, n, r, a, i) {
              ((a = oE),
                null === r.context ? (r.context = a) : (r.pendingContext = a),
                ((r = eP(t)).payload = { element: n }),
                null !== (i = void 0 === i ? null : i) && (r.callback = i),
                null !== (n = eL(e, r, t)) && (rA(n, e, t), eN(n, e, t)));
            }
            function r5(e, t) {
              if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
                var n = e.retryLane;
                e.retryLane = 0 !== n && n < t ? n : t;
              }
            }
            function r7(e, t) {
              (r5(e, t), (e = e.alternate) && r5(e, t));
            }
            var ae = {},
              at = w.default,
              an = k.default,
              ar = Object.assign,
              aa = Symbol.for('react.element'),
              ai = Symbol.for('react.transitional.element'),
              ao = Symbol.for('react.portal'),
              al = Symbol.for('react.fragment'),
              as = Symbol.for('react.strict_mode'),
              au = Symbol.for('react.profiler'),
              ac = Symbol.for('react.consumer'),
              ad = Symbol.for('react.context'),
              af = Symbol.for('react.forward_ref'),
              ap = Symbol.for('react.suspense'),
              ah = Symbol.for('react.suspense_list'),
              am = Symbol.for('react.memo'),
              ag = Symbol.for('react.lazy'),
              aA = Symbol.for('react.activity'),
              av = Symbol.for('react.memo_cache_sentinel'),
              aB = Symbol.iterator,
              ab = Symbol.for('react.client.reference'),
              aC = Array.isArray,
              ay =
                at.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
              ax = e.rendererVersion,
              aw = e.rendererPackageName,
              aS = e.extraDevToolsConfig,
              aE = e.getPublicInstance,
              aM = e.getRootHostContext,
              aF = e.getChildHostContext,
              aT = e.prepareForCommit,
              aR = e.resetAfterCommit,
              aI = e.createInstance;
            e.cloneMutableInstance;
            var aG = e.appendInitialChild,
              aD = e.finalizeInitialChildren,
              a_ = e.shouldSetTextContent,
              ak = e.createTextInstance;
            e.cloneMutableTextInstance;
            var aP = e.scheduleTimeout,
              aL = e.cancelTimeout,
              aN = e.noTimeout,
              aH = e.isPrimaryRenderer;
            e.warnsIfNotActing;
            var aU = e.supportsMutation,
              aO = e.supportsPersistence,
              aj = e.supportsHydration,
              aJ = e.getInstanceFromNode;
            e.beforeActiveInstanceBlur;
            var az = e.preparePortalMount;
            (e.prepareScopeUpdate, e.getInstanceFromScope);
            var aK = e.setCurrentUpdatePriority,
              aQ = e.getCurrentUpdatePriority,
              aX = e.resolveUpdatePriority;
            (e.trackSchedulerEvent,
              e.resolveEventType,
              e.resolveEventTimeStamp);
            var aV = e.shouldAttemptEagerTransition,
              aW = e.detachDeletedInstance;
            e.requestPostPaintCallback;
            var aY = e.maySuspendCommit,
              aq = e.maySuspendCommitOnUpdate,
              aZ = e.maySuspendCommitInSyncRender,
              a$ = e.preloadInstance,
              a0 = e.startSuspendingCommit,
              a1 = e.suspendInstance;
            e.suspendOnActiveViewTransition;
            var a2 = e.waitForCommitToBeReady;
            e.getSuspendedCommitReason;
            var a3 = e.NotPendingTransition,
              a9 = e.HostTransitionContext,
              a8 = e.resetFormInstance;
            e.bindToConsole;
            var a4 = e.supportsMicrotasks,
              a6 = e.scheduleMicrotask,
              a5 = e.supportsTestSelectors,
              a7 = e.findFiberRoot,
              ie = e.getBoundingRect,
              it = e.getTextContent,
              ir = e.isHiddenSubtree,
              ia = e.matchAccessibilityRole,
              ii = e.setFocusIfFocusable,
              io = e.setupIntersectionObserver,
              il = e.appendChild,
              is = e.appendChildToContainer,
              iu = e.commitTextUpdate,
              ic = e.commitMount,
              id = e.commitUpdate,
              ip = e.insertBefore,
              ih = e.insertInContainerBefore,
              im = e.removeChild,
              ig = e.removeChildFromContainer,
              iA = e.resetTextContent,
              iv = e.hideInstance,
              iB = e.hideTextInstance,
              ib = e.unhideInstance,
              iC = e.unhideTextInstance;
            (e.cancelViewTransitionName,
              e.cancelRootViewTransitionName,
              e.restoreRootViewTransitionName,
              e.cloneRootViewTransitionContainer,
              e.removeRootViewTransitionClone,
              e.measureClonedInstance,
              e.hasInstanceChanged,
              e.hasInstanceAffectedParent,
              e.startViewTransition,
              e.startGestureTransition,
              e.stopViewTransition,
              e.getCurrentGestureOffset,
              e.createViewTransitionInstance);
            var iy = e.clearContainer;
            (e.createFragmentInstance,
              e.updateFragmentInstanceFiber,
              e.commitNewChildToFragmentInstance,
              e.deleteChildFromFragmentInstance);
            var ix = e.cloneInstance,
              iw = e.createContainerChildSet,
              iS = e.appendChildToContainerChildSet,
              iE = e.finalizeContainerChildren,
              iM = e.replaceContainerChildren,
              iF = e.cloneHiddenInstance,
              iT = e.cloneHiddenTextInstance,
              iR = e.isSuspenseInstancePending,
              iI = e.isSuspenseInstanceFallback,
              iG = e.getSuspenseInstanceFallbackErrorDetails,
              iD = e.registerSuspenseInstanceRetry,
              i_ = e.canHydrateFormStateMarker,
              ik = e.isFormStateMarkerMatching,
              iP = e.getNextHydratableSibling,
              iL = e.getNextHydratableSiblingAfterSingleton,
              iN = e.getFirstHydratableChild,
              iH = e.getFirstHydratableChildWithinContainer,
              iU = e.getFirstHydratableChildWithinActivityInstance,
              iO = e.getFirstHydratableChildWithinSuspenseInstance,
              ij = e.getFirstHydratableChildWithinSingleton,
              iJ = e.canHydrateInstance,
              iz = e.canHydrateTextInstance,
              iK = e.canHydrateActivityInstance,
              iQ = e.canHydrateSuspenseInstance,
              iX = e.hydrateInstance,
              iV = e.hydrateTextInstance,
              iW = e.hydrateActivityInstance,
              iY = e.hydrateSuspenseInstance,
              iq = e.getNextHydratableInstanceAfterActivityInstance,
              iZ = e.getNextHydratableInstanceAfterSuspenseInstance,
              i$ = e.commitHydratedInstance,
              i0 = e.commitHydratedContainer,
              i1 = e.commitHydratedActivityInstance,
              i2 = e.commitHydratedSuspenseInstance,
              i3 = e.finalizeHydratedChildren,
              i9 = e.flushHydrationEvents;
            e.clearActivityBoundary;
            var i8 = e.clearSuspenseBoundary;
            e.clearActivityBoundaryFromContainer;
            var i4 = e.clearSuspenseBoundaryFromContainer,
              i6 = e.hideDehydratedBoundary,
              i5 = e.unhideDehydratedBoundary,
              i7 = e.shouldDeleteUnhydratedTailInstances;
            (e.diffHydratedPropsForDevWarnings,
              e.diffHydratedTextForDevWarnings,
              e.describeHydratableInstanceForDevWarnings);
            var oe,
              ot,
              on = e.validateHydratableInstance,
              or = e.validateHydratableTextInstance,
              oa = e.supportsResources,
              oi = e.isHostHoistableType,
              oo = e.getHoistableRoot,
              ol = e.getResource,
              os = e.acquireResource,
              ou = e.releaseResource,
              oc = e.hydrateHoistable,
              od = e.mountHoistable,
              of = e.unmountHoistable,
              op = e.createHoistableInstance,
              oh = e.prepareToCommitHoistables,
              om = e.mayResourceSuspendCommit,
              og = e.preloadResource,
              oA = e.suspendResource,
              ov = e.supportsSingletons,
              oB = e.resolveSingletonInstance,
              ob = e.acquireSingletonInstance,
              oC = e.releaseSingletonInstance,
              oy = e.isHostSingletonType,
              ox = e.isSingletonScope,
              ow = [],
              oS = -1,
              oE = {},
              oM = Math.clz32
                ? Math.clz32
                : function (e) {
                    return 0 == (e >>>= 0) ? 32 : (31 - ((oF(e) / oT) | 0)) | 0;
                  },
              oF = Math.log,
              oT = Math.LN2,
              oR = 256,
              oI = 262144,
              oG = 4194304,
              oD = an.unstable_scheduleCallback,
              o_ = an.unstable_cancelCallback,
              ok = an.unstable_shouldYield,
              oP = an.unstable_requestPaint,
              oL = an.unstable_now,
              oN = an.unstable_ImmediatePriority,
              oH = an.unstable_UserBlockingPriority,
              oU = an.unstable_NormalPriority,
              oO = an.unstable_IdlePriority,
              oj = an.log,
              oJ = an.unstable_setDisableYieldValue,
              oz = null,
              oK = null,
              oQ =
                'function' == typeof Object.is
                  ? Object.is
                  : function (e, t) {
                      return (
                        (e === t && (0 !== e || 1 / e == 1 / t)) ||
                        (e != e && t != t)
                      );
                    },
              oX =
                'function' == typeof reportError
                  ? reportError
                  : function (e) {
                      if (
                        'object' == typeof window &&
                        'function' == typeof window.ErrorEvent
                      ) {
                        var t = new window.ErrorEvent('error', {
                          bubbles: !0,
                          cancelable: !0,
                          message:
                            'object' == typeof e &&
                            null !== e &&
                            'string' == typeof e.message
                              ? String(e.message)
                              : String(e),
                          error: e,
                        });
                        if (!window.dispatchEvent(t)) return;
                      } else if (
                        'object' == typeof x.default &&
                        'function' == typeof x.default.emit
                      )
                        return void x.default.emit('uncaughtException', e);
                      console.error(e);
                    },
              oV = Object.prototype.hasOwnProperty,
              oW = !1,
              oY = new WeakMap(),
              oq = [],
              oZ = 0,
              o$ = null,
              o0 = 0,
              o1 = [],
              o2 = 0,
              o3 = null,
              o9 = 1,
              o8 = '',
              o4 = u(null),
              o6 = u(null),
              o5 = u(null),
              o7 = u(null),
              le = null,
              lt = null,
              ln = !1,
              lr = null,
              la = !1,
              li = Error(r(519)),
              lo = u(null),
              ll = null,
              ls = null,
              lu =
                'u' > typeof AbortController
                  ? AbortController
                  : function () {
                      var e = [],
                        t = (this.signal = {
                          aborted: !1,
                          addEventListener: function (t, n) {
                            e.push(n);
                          },
                        });
                      this.abort = function () {
                        ((t.aborted = !0),
                          e.forEach(function (e) {
                            return e();
                          }));
                      };
                    },
              lc = an.unstable_scheduleCallback,
              ld = an.unstable_NormalPriority,
              lf = {
                $$typeof: ad,
                Consumer: null,
                Provider: null,
                _currentValue: null,
                _currentValue2: null,
                _threadCount: 0,
              },
              lp = null,
              lh = null,
              lm = !1,
              lg = !1,
              lA = !1,
              lv = 0,
              lB = null,
              lb = 0,
              lC = 0,
              ly = null,
              lx = ay.S;
            ay.S = function (e, t) {
              ((sP = oL()),
                'object' == typeof t &&
                  null !== t &&
                  'function' == typeof t.then &&
                  (function (e, t) {
                    if (null === lB) {
                      var n = (lB = []);
                      ((lb = 0),
                        (lC = ep()),
                        (ly = {
                          status: 'pending',
                          value: void 0,
                          then: function (e) {
                            n.push(e);
                          },
                        }));
                    }
                    (lb++, t.then(eh, eh));
                  })(0, t),
                null !== lx && lx(e, t));
            };
            var lw = u(null),
              lS = Error(r(460)),
              lE = Error(r(474)),
              lM = Error(r(542)),
              lF = { then: function () {} },
              lT = null,
              lR = null,
              lI = 0,
              lG = eM(!0),
              lD = eM(!1),
              l_ = [],
              lk = 0,
              lP = 0,
              lL = !1,
              lN = !1,
              lH = u(null),
              lU = u(0),
              lO = u(null),
              lj = null,
              lJ = u(0),
              lz = 0,
              lK = null,
              lQ = null,
              lX = null,
              lV = !1,
              lW = !1,
              lY = !1,
              lq = 0,
              lZ = 0,
              l$ = null,
              l0 = 0,
              l1 = {
                readContext: ee,
                use: tn,
                useCallback: e$,
                useContext: e$,
                useEffect: e$,
                useImperativeHandle: e$,
                useLayoutEffect: e$,
                useInsertionEffect: e$,
                useMemo: e$,
                useReducer: e$,
                useRef: e$,
                useState: e$,
                useDebugValue: e$,
                useDeferredValue: e$,
                useTransition: e$,
                useSyncExternalStore: e$,
                useId: e$,
                useHostTransitionStatus: e$,
                useFormState: e$,
                useActionState: e$,
                useOptimistic: e$,
                useMemoCache: e$,
                useCacheRefresh: e$,
              };
            l1.useEffectEvent = e$;
            var l2 = {
                readContext: ee,
                use: tn,
                useCallback: function (e, t) {
                  return (
                    (e5().memoizedState = [e, void 0 === t ? null : t]),
                    e
                  );
                },
                useContext: ee,
                useEffect: tG,
                useImperativeHandle: function (e, t, n) {
                  ((n = null != n ? n.concat([e]) : null),
                    tR(4194308, 4, tL.bind(null, t, e), n));
                },
                useLayoutEffect: function (e, t) {
                  return tR(4194308, 4, e, t);
                },
                useInsertionEffect: function (e, t) {
                  tR(4, 2, e, t);
                },
                useMemo: function (e, t) {
                  var n = e5();
                  t = void 0 === t ? null : t;
                  var r = e();
                  return ((n.memoizedState = [r, t]), r);
                },
                useReducer: function (e, t, n) {
                  var r = e5();
                  if (void 0 !== n) var a = n(t);
                  else a = t;
                  return (
                    (r.memoizedState = r.baseState = a),
                    (r.queue = e =
                      {
                        pending: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: e,
                        lastRenderedState: a,
                      }),
                    (e = e.dispatch = tY.bind(null, lK, e)),
                    [r.memoizedState, e]
                  );
                },
                useRef: function (e) {
                  return (e5().memoizedState = { current: e });
                },
                useState: function (e) {
                  var t = (e = th(e)).queue,
                    n = tq.bind(null, lK, t);
                  return ((t.dispatch = n), [e.memoizedState, n]);
                },
                useDebugValue: tH,
                useDeferredValue: function (e, t) {
                  return tj(e5(), e, t);
                },
                useTransition: function () {
                  var e = th(!1);
                  return (
                    (e = tz.bind(null, lK, e.queue, !0, !1)),
                    (e5().memoizedState = e),
                    [!1, e]
                  );
                },
                useSyncExternalStore: function (e, t, n) {
                  var a = lK,
                    i = e5();
                  if (ln) {
                    if (void 0 === n) throw Error(r(407));
                    n = n();
                  } else {
                    if (((n = t()), null === sA)) throw Error(r(349));
                    (127 & sB) != 0 || tu(a, t, n);
                  }
                  i.memoizedState = n;
                  var o = { value: n, getSnapshot: t };
                  return (
                    (i.queue = o),
                    tG(td.bind(null, a, o, e), [e]),
                    (a.flags |= 2048),
                    tF(9, { destroy: void 0 }, tc.bind(null, a, o, n, t), null),
                    n
                  );
                },
                useId: function () {
                  var e = e5(),
                    t = sA.identifierPrefix;
                  if (ln) {
                    var n = o8,
                      r = o9;
                    ((t =
                      '_' +
                      t +
                      'R_' +
                      (n = (r & ~(1 << (32 - oM(r) - 1))).toString(32) + n)),
                      0 < (n = lq++) && (t += 'H' + n.toString(32)),
                      (t += '_'));
                  } else t = '_' + t + 'r_' + (n = l0++).toString(32) + '_';
                  return (e.memoizedState = t);
                },
                useHostTransitionStatus: tQ,
                useFormState: tx,
                useActionState: tx,
                useOptimistic: function (e) {
                  var t = e5();
                  t.memoizedState = t.baseState = e;
                  var n = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: null,
                    lastRenderedState: null,
                  };
                  return (
                    (t.queue = n),
                    (t = t$.bind(null, lK, !0, n)),
                    (n.dispatch = t),
                    [e, t]
                  );
                },
                useMemoCache: tr,
                useCacheRefresh: function () {
                  return (e5().memoizedState = tW.bind(null, lK));
                },
                useEffectEvent: function (e) {
                  var t = e5(),
                    n = { impl: e };
                  return (
                    (t.memoizedState = n),
                    function () {
                      if ((2 & sg) != 0) throw Error(r(440));
                      return n.impl.apply(void 0, arguments);
                    }
                  );
                },
              },
              l3 = {
                readContext: ee,
                use: tn,
                useCallback: tU,
                useContext: ee,
                useEffect: tD,
                useImperativeHandle: tN,
                useInsertionEffect: tk,
                useLayoutEffect: tP,
                useMemo: tO,
                useReducer: ti,
                useRef: tT,
                useState: function () {
                  return ti(ta);
                },
                useDebugValue: tH,
                useDeferredValue: function (e, t) {
                  return tJ(e7(), lQ.memoizedState, e, t);
                },
                useTransition: function () {
                  var e = ti(ta)[0],
                    t = e7().memoizedState;
                  return ['boolean' == typeof e ? e : tt(e), t];
                },
                useSyncExternalStore: ts,
                useId: tX,
                useHostTransitionStatus: tQ,
                useFormState: tw,
                useActionState: tw,
                useOptimistic: function (e, t) {
                  return tm(e7(), lQ, e, t);
                },
                useMemoCache: tr,
                useCacheRefresh: tV,
              };
            l3.useEffectEvent = t_;
            var l9 = {
              readContext: ee,
              use: tn,
              useCallback: tU,
              useContext: ee,
              useEffect: tD,
              useImperativeHandle: tN,
              useInsertionEffect: tk,
              useLayoutEffect: tP,
              useMemo: tO,
              useReducer: tl,
              useRef: tT,
              useState: function () {
                return tl(ta);
              },
              useDebugValue: tH,
              useDeferredValue: function (e, t) {
                var n = e7();
                return null === lQ
                  ? tj(n, e, t)
                  : tJ(n, lQ.memoizedState, e, t);
              },
              useTransition: function () {
                var e = tl(ta)[0],
                  t = e7().memoizedState;
                return ['boolean' == typeof e ? e : tt(e), t];
              },
              useSyncExternalStore: ts,
              useId: tX,
              useHostTransitionStatus: tQ,
              useFormState: tM,
              useActionState: tM,
              useOptimistic: function (e, t) {
                var n = e7();
                return null !== lQ
                  ? tm(n, lQ, e, t)
                  : ((n.baseState = e), [e, n.queue.dispatch]);
              },
              useMemoCache: tr,
              useCacheRefresh: tV,
            };
            l9.useEffectEvent = t_;
            var l8 = {
                enqueueSetState: function (e, t, n) {
                  e = e._reactInternals;
                  var r = rm(),
                    a = eP(r);
                  ((a.payload = t),
                    null != n && (a.callback = n),
                    null !== (t = eL(e, a, r)) && (rA(t, e, r), eN(t, e, r)));
                },
                enqueueReplaceState: function (e, t, n) {
                  e = e._reactInternals;
                  var r = rm(),
                    a = eP(r);
                  ((a.tag = 1),
                    (a.payload = t),
                    null != n && (a.callback = n),
                    null !== (t = eL(e, a, r)) && (rA(t, e, r), eN(t, e, r)));
                },
                enqueueForceUpdate: function (e, t) {
                  e = e._reactInternals;
                  var n = rm(),
                    r = eP(n);
                  ((r.tag = 2),
                    null != t && (r.callback = t),
                    null !== (t = eL(e, r, n)) && (rA(t, e, n), eN(t, e, n)));
                },
              },
              l4 = Error(r(461)),
              l6 = !1,
              l5 = {
                dehydrated: null,
                treeContext: null,
                retryLane: 0,
                hydrationErrors: null,
              },
              l7 = !1,
              se = !1,
              st = !1,
              sn = 'function' == typeof WeakSet ? WeakSet : Set,
              sr = null,
              sa = null,
              si = !1,
              so = null,
              sl = 8192,
              ss = {
                getCacheForType: function (e) {
                  var t = ee(lf),
                    n = t.data.get(e);
                  return (void 0 === n && ((n = e()), t.data.set(e, n)), n);
                },
                cacheSignal: function () {
                  return ee(lf).controller.signal;
                },
              },
              su = 0,
              sc = 1,
              sd = 2,
              sf = 3,
              sp = 4;
            if ('function' == typeof Symbol && Symbol.for) {
              var sh = Symbol.for;
              ((su = sh('selector.component')),
                (sc = sh('selector.has_pseudo_class')),
                (sd = sh('selector.role')),
                (sf = sh('selector.test_id')),
                (sp = sh('selector.text')));
            }
            var sm = 'function' == typeof WeakMap ? WeakMap : Map,
              sg = 0,
              sA = null,
              sv = null,
              sB = 0,
              sb = 0,
              sC = null,
              sy = !1,
              sx = !1,
              sw = !1,
              sS = 0,
              sE = 0,
              sM = 0,
              sF = 0,
              sT = 0,
              sR = 0,
              sI = 0,
              sG = null,
              sD = null,
              s_ = !1,
              sk = 0,
              sP = 0,
              sL = 1 / 0,
              sN = null,
              sH = null,
              sU = 0,
              sO = null,
              sj = null,
              sJ = 0,
              sz = 0,
              sK = null,
              sQ = null,
              sX = 0,
              sV = null;
            return (
              (ae.attemptContinuousHydration = function (e) {
                if (13 === e.tag || 31 === e.tag) {
                  var t = eI(e, 0x4000000);
                  (null !== t && rA(t, e, 0x4000000), r7(e, 0x4000000));
                }
              }),
              (ae.attemptHydrationAtCurrentPriority = function (e) {
                if (13 === e.tag || 31 === e.tag) {
                  var t = rm(),
                    n = eI(e, (t = C(t)));
                  (null !== n && rA(n, e, t), r7(e, t));
                }
              }),
              (ae.attemptSynchronousHydration = function (e) {
                switch (e.tag) {
                  case 3:
                    if ((e = e.stateNode).current.memoizedState.isDehydrated) {
                      var t = f(e.pendingLanes);
                      if (0 !== t) {
                        for (e.pendingLanes |= 2, e.entangledLanes |= 2; t; ) {
                          var n = 1 << (31 - oM(t));
                          ((e.entanglements[1] |= n), (t &= ~n));
                        }
                        (eo(e),
                          (6 & sg) == 0 && ((sL = oL() + 500), el(0, !1)));
                      }
                    }
                    break;
                  case 31:
                  case 13:
                    (null !== (t = eI(e, 2)) && rA(t, e, 2), rC(), r7(e, 2));
                }
              }),
              (ae.batchedUpdates = function (e, t) {
                return e(t);
              }),
              (ae.createComponentSelector = function (e) {
                return { $$typeof: su, value: e };
              }),
              (ae.createContainer = function (e, t, n, r, a, i, o, l, s, u) {
                return r8(e, t, !1, null, n, r, i, null, o, l, s, u);
              }),
              (ae.createHasPseudoClassSelector = function (e) {
                return { $$typeof: sc, value: e };
              }),
              (ae.createHydrationContainer = function (
                e,
                t,
                n,
                r,
                a,
                i,
                o,
                l,
                s,
                u,
                c,
                d,
                f,
                p
              ) {
                var h;
                return (
                  ((e = r8(n, r, !0, e, a, i, l, p, s, u, c, d)).context = oE),
                  (n = e.current),
                  ((a = eP((r = C((r = rm()))))).callback =
                    null != (h = t) ? h : null),
                  eL(n, a, r),
                  (t = r),
                  (e.current.lanes = t),
                  A(e, t),
                  eo(e),
                  e
                );
              }),
              (ae.createPortal = function (e, t, n) {
                var r =
                  3 < arguments.length && void 0 !== arguments[3]
                    ? arguments[3]
                    : null;
                return {
                  $$typeof: ao,
                  key: null == r ? null : '' + r,
                  children: e,
                  containerInfo: t,
                  implementation: n,
                };
              }),
              (ae.createRoleSelector = function (e) {
                return { $$typeof: sd, value: e };
              }),
              (ae.createTestNameSelector = function (e) {
                return { $$typeof: sf, value: e };
              }),
              (ae.createTextSelector = function (e) {
                return { $$typeof: sp, value: e };
              }),
              (ae.defaultOnCaughtError = function (e) {
                console.error(e);
              }),
              (ae.defaultOnRecoverableError = function (e) {
                oX(e);
              }),
              (ae.defaultOnUncaughtError = function (e) {
                oX(e);
              }),
              (ae.deferredUpdates = function (e) {
                var t = ay.T,
                  n = aQ();
                try {
                  return (aK(32), (ay.T = null), e());
                } finally {
                  (aK(n), (ay.T = t));
                }
              }),
              (ae.discreteUpdates = function (e, t, n, r, a) {
                var i = ay.T,
                  o = aQ();
                try {
                  return (aK(2), (ay.T = null), e(t, n, r, a));
                } finally {
                  (aK(o), (ay.T = i), 0 === sg && (sL = oL() + 500));
                }
              }),
              (ae.findAllNodes = rh),
              (ae.findBoundingRects = function (e, t) {
                if (!a5) throw Error(r(363));
                ((t = rh(e, t)), (e = []));
                for (var n = 0; n < t.length; n++) e.push(ie(t[n]));
                for (t = e.length - 1; 0 < t; t--) {
                  n = e[t];
                  for (
                    var a = n.x,
                      i = a + n.width,
                      o = n.y,
                      l = o + n.height,
                      s = t - 1;
                    0 <= s;
                    s--
                  )
                    if (t !== s) {
                      var u = e[s],
                        c = u.x,
                        d = c + u.width,
                        f = u.y,
                        p = f + u.height;
                      if (a >= c && o >= f && i <= d && l <= p) {
                        e.splice(t, 1);
                        break;
                      }
                      if (a !== c || n.width !== u.width || p < o || f > l) {
                        if (
                          !(o !== f || n.height !== u.height || d < a || c > i)
                        ) {
                          (c > a && ((u.width += c - a), (u.x = a)),
                            d < i && (u.width = i - c),
                            e.splice(t, 1));
                          break;
                        }
                      } else {
                        (f > o && ((u.height += f - o), (u.y = o)),
                          p < l && (u.height = l - f),
                          e.splice(t, 1));
                        break;
                      }
                    }
                }
                return e;
              }),
              (ae.findHostInstance = r4),
              (ae.findHostInstanceWithNoPortals = function (e) {
                return null ===
                  (e =
                    null !== (e = o(e))
                      ? (function e(t) {
                          var n = t.tag;
                          if (5 === n || 26 === n || 27 === n || 6 === n)
                            return t;
                          for (t = t.child; null !== t; ) {
                            if (4 !== t.tag && null !== (n = e(t))) return n;
                            t = t.sibling;
                          }
                          return null;
                        })(e)
                      : null)
                  ? null
                  : aE(e.stateNode);
              }),
              (ae.findHostInstanceWithWarning = function (e) {
                return r4(e);
              }),
              (ae.flushPassiveEffects = rU),
              (ae.flushSyncFromReconciler = function (e) {
                var t = sg;
                sg |= 1;
                var n = ay.T,
                  r = aQ();
                try {
                  if ((aK(2), (ay.T = null), e)) return e();
                } finally {
                  (aK(r), (ay.T = n), (6 & (sg = t)) == 0 && el(0, !1));
                }
              }),
              (ae.flushSyncWork = rC),
              (ae.focusWithin = function (e, t) {
                if (!a5) throw Error(r(363));
                for (
                  t = Array.from((t = rp((e = rc(e)), t))), e = 0;
                  e < t.length;
                ) {
                  var n = t[e++],
                    a = n.tag;
                  if (!ir(n)) {
                    if ((5 === a || 26 === a || 27 === a) && ii(n.stateNode))
                      return !0;
                    for (n = n.child; null !== n; )
                      (t.push(n), (n = n.sibling));
                  }
                }
                return !1;
              }),
              (ae.getFindAllNodesFailureDescription = function (e, t) {
                if (!a5) throw Error(r(363));
                var n = 0,
                  a = [];
                e = [rc(e), 0];
                for (var i = 0; i < e.length; ) {
                  var o = e[i++],
                    l = o.tag,
                    s = e[i++],
                    u = t[s];
                  if (
                    ((5 !== l && 26 !== l && 27 !== l) || !ir(o)) &&
                    (rd(o, u) && (a.push(rf(u)), ++s > n && (n = s)),
                    s < t.length)
                  )
                    for (o = o.child; null !== o; )
                      (e.push(o, s), (o = o.sibling));
                }
                if (n < t.length) {
                  for (e = []; n < t.length; n++) e.push(rf(t[n]));
                  return (
                    `findAllNodes was able to match part of the selector:
  ` +
                    a.join(' > ') +
                    `

No matching component was found for:
  ` +
                    e.join(' > ')
                  );
                }
                return null;
              }),
              (ae.getPublicRootInstance = function (e) {
                if (!(e = e.current).child) return null;
                switch (e.child.tag) {
                  case 27:
                  case 5:
                    return aE(e.child.stateNode);
                  default:
                    return e.child.stateNode;
                }
              }),
              (ae.injectIntoDevTools = function () {
                var e = {
                  bundleType: 0,
                  version: ax,
                  rendererPackageName: aw,
                  currentDispatcherRef: ay,
                  reconcilerVersion: '19.2.0',
                };
                if (
                  (null !== aS && (e.rendererConfig = aS),
                  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u')
                )
                  e = !1;
                else {
                  var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                  if (t.isDisabled || !t.supportsFiber) e = !0;
                  else {
                    try {
                      ((oz = t.inject(e)), (oK = t));
                    } catch {}
                    e = !!t.checkDCE;
                  }
                }
                return e;
              }),
              (ae.isAlreadyRendering = function () {
                return (6 & sg) != 0;
              }),
              (ae.observeVisibleRects = function (e, t, n, a) {
                if (!a5) throw Error(r(363));
                var i = io((e = rh(e, t)), n, a).disconnect;
                return {
                  disconnect: function () {
                    i();
                  },
                };
              }),
              (ae.shouldError = function () {
                return null;
              }),
              (ae.shouldSuspend = function () {
                return !1;
              }),
              (ae.startHostTransition = function (e, t, a, i) {
                if (5 !== e.tag) throw Error(r(476));
                var o = tK(e).queue;
                tz(
                  e,
                  o,
                  t,
                  a3,
                  null === a
                    ? n
                    : function () {
                        var t = tK(e);
                        return (
                          null === t.next && (t = e.alternate.memoizedState),
                          tZ(e, t.next.queue, {}, rm()),
                          a(i)
                        );
                      }
                );
              }),
              (ae.updateContainer = function (e, t, n, r) {
                var a = t.current,
                  i = rm();
                return (r6(a, i, e, t, n, r), i);
              }),
              (ae.updateContainerSync = function (e, t, n, r) {
                return (r6(t.current, 2, e, t, n, r), 2);
              }),
              ae
            );
          }),
          (ew.exports.default = ew.exports),
          Object.defineProperty(ew.exports, '__esModule', { value: !0 })),
        (ex.exports = ew.exports)),
      (h = ex.exports) &&
        h.__esModule &&
        Object.prototype.hasOwnProperty.call(h, 'default'))
        ? h.default
        : h,
      eE = {},
      eM = /^three(?=[A-Z])/,
      eF = (e) => `${e[0].toUpperCase()}${e.slice(1)}`,
      eT = 0;
    function eR(e) {
      if ('function' == typeof e) {
        let t = `${eT++}`;
        return ((eE[t] = e), t);
      }
      Object.assign(eE, e);
    }
    function eI(e, t) {
      let n = eF(e),
        r = eE[n];
      if ('primitive' !== e && !r)
        throw Error(
          `R3F: ${n} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`
        );
      if ('primitive' === e && !t.object)
        throw Error("R3F: Primitives without 'object' are invalid!");
      if (void 0 !== t.args && !Array.isArray(t.args))
        throw Error('R3F: The args prop must be an array!');
    }
    function eG(e) {
      if (e.isHidden) {
        var t;
        (e.props.attach && null != (t = e.parent) && t.object
          ? er(e.parent, e)
          : ef(e.object) && !1 !== e.props.visible && (e.object.visible = !0),
          (e.isHidden = !1),
          ec(e));
      }
    }
    function eD(e, t, n) {
      let r = t.root.getState();
      if (e.parent || e.object === r.scene) {
        if (!t.object) {
          var a, i;
          let e = eE[eF(t.type)];
          ((t.object =
            null != (a = t.props.object)
              ? a
              : new e(...(null != (i = t.props.args) ? i : []))),
            (t.object.__r3f = t));
        }
        if ((eu(t.object, t.props), t.props.attach)) er(e, t);
        else if (ef(t.object) && ef(e.object)) {
          let r = e.object.children.indexOf(null == n ? void 0 : n.object);
          if (n && -1 !== r) {
            let n = e.object.children.indexOf(t.object);
            -1 !== n
              ? (e.object.children.splice(n, 1),
                e.object.children.splice(n < r ? r - 1 : r, 0, t.object))
              : ((t.object.parent = e.object),
                e.object.children.splice(r, 0, t.object),
                t.object.dispatchEvent({ type: 'added' }),
                e.object.dispatchEvent({
                  type: 'childadded',
                  child: t.object,
                }));
          } else e.object.add(t.object);
        }
        for (let e of t.children) eD(t, e);
        ec(t);
      }
    }
    function e_(e, t) {
      t && ((t.parent = e), e.children.push(t), eD(e, t));
    }
    function ek(e, t, n) {
      if (!t || !n) return;
      t.parent = e;
      let r = e.children.indexOf(n);
      (-1 !== r ? e.children.splice(r, 0, t) : e.children.push(t), eD(e, t, n));
    }
    function eP(e) {
      if ('function' == typeof e.dispose) {
        let t = () => {
          try {
            e.dispose();
          } catch {}
        };
        'u' > typeof IS_REACT_ACT_ENVIRONMENT
          ? t()
          : (0, k.unstable_scheduleCallback)(k.unstable_IdlePriority, t);
      }
    }
    function eL(e, t, n) {
      if (!t) return;
      t.parent = null;
      let r = e.children.indexOf(t);
      (-1 !== r && e.children.splice(r, 1),
        t.props.attach
          ? ea(e, t)
          : ef(t.object) &&
            ef(e.object) &&
            (e.object.remove(t.object),
            (function (e, t) {
              let { internal: n } = e.getState();
              ((n.interaction = n.interaction.filter((e) => e !== t)),
                (n.initialHits = n.initialHits.filter((e) => e !== t)),
                n.hovered.forEach((e, r) => {
                  (e.eventObject === t || e.object === t) &&
                    n.hovered.delete(r);
                }),
                n.capturedMap.forEach((e, r) => {
                  eh(n.capturedMap, t, e, r);
                }));
            })(z(t), t.object)));
      let a = null !== t.props.dispose && !1 !== n;
      for (let e = t.children.length - 1; e >= 0; e--) {
        let n = t.children[e];
        eL(t, n, a);
      }
      ((t.children.length = 0),
        delete t.object.__r3f,
        a &&
          'primitive' !== t.type &&
          'Scene' !== t.object.type &&
          eP(t.object),
        void 0 === n && ec(t));
    }
    let eN = [],
      eH = () => {},
      eU = {},
      eO = 0,
      ej =
        ((m = {
          isPrimaryRenderer: !1,
          warnsIfNotActing: !1,
          supportsMutation: !0,
          supportsPersistence: !1,
          supportsHydration: !1,
          createInstance: function (e, t, n) {
            var r;
            return (
              eI((e = eF(e) in eE ? e : e.replace(eM, '')), t),
              'primitive' === e &&
                null != (r = t.object) &&
                r.__r3f &&
                delete t.object.__r3f,
              ee(t.object, n, e, t)
            );
          },
          removeChild: eL,
          appendChild: e_,
          appendInitialChild: e_,
          insertBefore: ek,
          appendChildToContainer(e, t) {
            let n = e.getState().scene.__r3f;
            t && n && e_(n, t);
          },
          removeChildFromContainer(e, t) {
            let n = e.getState().scene.__r3f;
            t && n && eL(n, t);
          },
          insertInContainerBefore(e, t, n) {
            let r = e.getState().scene.__r3f;
            t && n && r && ek(r, t, n);
          },
          getRootHostContext: () => eU,
          getChildHostContext: () => eU,
          commitUpdate(e, t, n, r, a) {
            var i, o, l;
            eI(t, r);
            let s = !1;
            if (
              (('primitive' === e.type && n.object !== r.object) ||
              (null == (i = r.args) ? void 0 : i.length) !==
                (null == (o = n.args) ? void 0 : o.length)
                ? (s = !0)
                : null != (l = r.args) &&
                  l.some((e, t) => {
                    var r;
                    return e !== (null == (r = n.args) ? void 0 : r[t]);
                  }) &&
                  (s = !0),
              s)
            )
              eN.push([e, { ...r }, a]);
            else {
              let t = (function (e, t) {
                let n = {};
                for (let r in t)
                  if (!ei.includes(r) && !Z.equ(t[r], e.props[r]))
                    for (let e in ((n[r] = t[r]), t))
                      e.startsWith(`${r}-`) && (n[e] = t[e]);
                for (let r in e.props) {
                  if (ei.includes(r) || t.hasOwnProperty(r)) continue;
                  let { root: a, key: i } = et(e.object, r);
                  if (a.constructor && 0 === a.constructor.length) {
                    let e = (function (e) {
                      let t = eo.get(e.constructor);
                      try {
                        t ||
                          ((t = new e.constructor()), eo.set(e.constructor, t));
                      } catch (e) {}
                      return t;
                    })(a);
                    Z.und(e) || (n[i] = e[i]);
                  } else n[i] = 0;
                }
                return n;
              })(e, r);
              Object.keys(t).length &&
                (Object.assign(e.props, t), eu(e.object, t));
            }
            (null === a.sibling || (4 & a.flags) == 0) &&
              (function () {
                for (let [e] of eN) {
                  let t = e.parent;
                  if (t)
                    for (let n of (e.props.attach
                      ? ea(t, e)
                      : ef(e.object) &&
                        ef(t.object) &&
                        t.object.remove(e.object),
                    e.children))
                      n.props.attach
                        ? ea(e, n)
                        : ef(n.object) &&
                          ef(e.object) &&
                          e.object.remove(n.object);
                  (e.isHidden && eG(e),
                    e.object.__r3f && delete e.object.__r3f,
                    'primitive' !== e.type && eP(e.object));
                }
                for (let [r, a, i] of eN) {
                  r.props = a;
                  let o = r.parent;
                  if (o) {
                    let a = eE[eF(r.type)];
                    ((r.object =
                      null != (e = r.props.object)
                        ? e
                        : new a(...(null != (t = r.props.args) ? t : []))),
                      (r.object.__r3f = r));
                    var e,
                      t,
                      n = r.object;
                    for (let e of [i, i.alternate])
                      if (null !== e)
                        if ('function' == typeof e.ref) {
                          null == e.refCleanup || e.refCleanup();
                          let t = e.ref(n);
                          'function' == typeof t && (e.refCleanup = t);
                        } else e.ref && (e.ref.current = n);
                    for (let e of (eu(r.object, r.props),
                    r.props.attach
                      ? er(o, r)
                      : ef(r.object) && ef(o.object) && o.object.add(r.object),
                    r.children))
                      e.props.attach
                        ? er(r, e)
                        : ef(e.object) &&
                          ef(r.object) &&
                          r.object.add(e.object);
                    ec(r);
                  }
                }
                eN.length = 0;
              })();
          },
          finalizeInitialChildren: () => !1,
          commitMount() {},
          getPublicInstance: (e) => (null == e ? void 0 : e.object),
          prepareForCommit: () => null,
          preparePortalMount: (e) => ee(e.getState().scene, e, '', {}),
          resetAfterCommit: () => {},
          shouldSetTextContent: () => !1,
          clearContainer: () => !1,
          hideInstance: function (e) {
            if (!e.isHidden) {
              var t;
              (e.props.attach && null != (t = e.parent) && t.object
                ? ea(e.parent, e)
                : ef(e.object) && (e.object.visible = !1),
                (e.isHidden = !0),
                ec(e));
            }
          },
          unhideInstance: eG,
          createTextInstance: eH,
          hideTextInstance: eH,
          unhideTextInstance: eH,
          scheduleTimeout:
            'function' == typeof setTimeout ? setTimeout : void 0,
          cancelTimeout:
            'function' == typeof clearTimeout ? clearTimeout : void 0,
          noTimeout: -1,
          getInstanceFromNode: () => null,
          beforeActiveInstanceBlur() {},
          afterActiveInstanceBlur() {},
          detachDeletedInstance() {},
          prepareScopeUpdate() {},
          getInstanceFromScope: () => null,
          shouldAttemptEagerTransition: () => !1,
          trackSchedulerEvent: () => {},
          resolveEventType: () => null,
          resolveEventTimeStamp: () => -1.1,
          requestPostPaintCallback() {},
          maySuspendCommit: () => !1,
          preloadInstance: () => !0,
          suspendInstance() {},
          waitForCommitToBeReady: () => null,
          NotPendingTransition: null,
          HostTransitionContext: w.createContext(null),
          setCurrentUpdatePriority(e) {
            eO = e;
          },
          getCurrentUpdatePriority: () => eO,
          resolveUpdatePriority() {
            var e;
            if (0 !== eO) return eO;
            switch (
              'u' > typeof window &&
              (null == (e = window.event) ? void 0 : e.type)
            ) {
              case 'click':
              case 'contextmenu':
              case 'dblclick':
              case 'pointercancel':
              case 'pointerdown':
              case 'pointerup':
                return 2;
              case 'pointermove':
              case 'pointerout':
              case 'pointerover':
              case 'pointerenter':
              case 'pointerleave':
              case 'wheel':
                return 8;
              default:
                return 32;
            }
          },
          resetFormInstance() {},
          rendererPackageName: '@react-three/fiber',
          rendererVersion: '9.5.0',
          applyViewTransitionName(e, t, n) {},
          restoreViewTransitionName(e, t) {},
          cancelViewTransitionName(e, t, n) {},
          cancelRootViewTransitionName(e) {},
          restoreRootViewTransitionName(e) {},
          InstanceMeasurement: null,
          measureInstance: (e) => null,
          wasInstanceInViewport: (e) => !0,
          hasInstanceChanged: (e, t) => !1,
          hasInstanceAffectedParent: (e, t) => !1,
          suspendOnActiveViewTransition(e, t) {},
          startGestureTransition: () => null,
          startViewTransition: () => null,
          stopViewTransition(e) {},
          createViewTransitionInstance: (e) => null,
          getCurrentGestureOffset(e) {
            throw Error(
              'startGestureTransition is not yet supported in react-three-fiber.'
            );
          },
          cloneMutableInstance: (e, t) => e,
          cloneMutableTextInstance: (e) => e,
          cloneRootViewTransitionContainer(e) {
            throw Error('Not implemented.');
          },
          removeRootViewTransitionClone(e, t) {
            throw Error('Not implemented.');
          },
          createFragmentInstance: (e) => null,
          updateFragmentInstanceFiber(e, t) {},
          commitNewChildToFragmentInstance(e, t) {},
          deleteChildFromFragmentInstance(e, t) {},
          measureClonedInstance: (e) => null,
          maySuspendCommitOnUpdate: (e, t, n) => !1,
          maySuspendCommitInSyncRender: (e, t) => !1,
          startSuspendingCommit: () => null,
          getSuspendedCommitReason: (e, t) => null,
        }),
        (d = eS(m)).injectIntoDevTools(),
        d),
      eJ = new Map(),
      ez = { objects: 'shallow', strict: !1 };
    function eK({ store: e, children: t, onCreated: n, rootElement: r }) {
      return (
        Q(() => {
          let t = e.getState();
          (t.set((e) => ({ internal: { ...e.internal, active: !0 } })),
            n && n(t),
            e.getState().events.connected ||
              null == t.events.connect ||
              t.events.connect(r));
        }, []),
        (0, v.jsx)(eg.Provider, { value: e, children: t })
      );
    }
    function eQ(e, t) {
      let n = eJ.get(e),
        r = null == n ? void 0 : n.fiber;
      if (r) {
        let a = null == n ? void 0 : n.store.getState();
        (a && (a.internal.active = !1),
          ej.updateContainer(null, r, null, () => {
            a &&
              setTimeout(() => {
                try {
                  (null == a.events.disconnect || a.events.disconnect(),
                    null == (n = a.gl) ||
                      null == (r = n.renderLists) ||
                      null == r.dispose ||
                      r.dispose(),
                    null == (i = a.gl) ||
                      null == i.forceContextLoss ||
                      i.forceContextLoss(),
                    null != (o = a.gl) && o.xr && a.xr.disconnect());
                  var n,
                    r,
                    i,
                    o,
                    l = a.scene;
                  for (let e in ('Scene' !== l.type &&
                    (null == l.dispose || l.dispose()),
                  l)) {
                    let t = l[e];
                    (null == t ? void 0 : t.type) !== 'Scene' &&
                      (null == t || null == t.dispose || t.dispose());
                  }
                  (eJ.delete(e), t && t(e));
                } catch (e) {}
              }, 500);
          }));
      }
    }
    function eX({ state: e = {}, children: t, container: n }) {
      let { events: r, size: a, ...i } = e,
        o = eA(),
        [l] = w.useState(() => new S.Raycaster()),
        [s] = w.useState(() => new S.Vector2()),
        u = X((e, t) => {
          let i;
          if (t.camera && a) {
            let n = t.camera;
            ((i = e.viewport.getCurrentViewport(n, new S.Vector3(), a)),
              n !== e.camera && ed(n, a));
          }
          return {
            ...e,
            ...t,
            scene: n,
            raycaster: l,
            pointer: s,
            mouse: s,
            previousRoot: o,
            events: { ...e.events, ...t.events, ...r },
            size: { ...e.size, ...a },
            viewport: { ...e.viewport, ...i },
            setEvents: (e) =>
              t.set((t) => ({ ...t, events: { ...t.events, ...e } })),
          };
        }),
        c = w.useMemo(() => {
          let e = I((e, t) => ({ ...i, set: e, get: t })),
            t = (t) => e.setState((e) => u.current(t, e));
          return (t(o.getState()), o.subscribe(t), e);
        }, [o, n]);
      return (0, v.jsx)(v.Fragment, {
        children: ej.createPortal(
          (0, v.jsx)(eg.Provider, { value: c, children: t }),
          c,
          null
        ),
      });
    }
    let eV = new Set(),
      eW = new Set(),
      eY = new Set();
    function eq(e, t) {
      if (e.size) for (let { callback: n } of e.values()) n(t);
    }
    function eZ(e, t) {
      switch (e) {
        case 'before':
          return eq(eV, t);
        case 'after':
          return eq(eW, t);
        case 'tail':
          return eq(eY, t);
      }
    }
    function e$(e, r, a) {
      let i = r.clock.getDelta();
      ('never' === r.frameloop &&
        'number' == typeof e &&
        ((i = e - r.clock.elapsedTime),
        (r.clock.oldTime = r.clock.elapsedTime),
        (r.clock.elapsedTime = e)),
        (t = r.internal.subscribers));
      for (let e = 0; e < t.length; e++)
        (n = t[e]).ref.current(n.store.getState(), i, a);
      return (
        !r.internal.priority && r.gl.render && r.gl.render(r.scene, r.camera),
        (r.internal.frames = Math.max(0, r.internal.frames - 1)),
        'always' === r.frameloop ? 1 : r.internal.frames
      );
    }
    let e0 = !1,
      e1 = !1;
    function e2(e) {
      for (let n of ((a = requestAnimationFrame(e2)),
      (e0 = !0),
      (r = 0),
      eZ('before', e),
      (e1 = !0),
      eJ.values())) {
        var t;
        (i = n.store.getState()).internal.active &&
          ('always' === i.frameloop || i.internal.frames > 0) &&
          !(null != (t = i.gl.xr) && t.isPresenting) &&
          (r += e$(e, i));
      }
      if (((e1 = !1), eZ('after', e), 0 === r))
        return (eZ('tail', e), (e0 = !1), cancelAnimationFrame(a));
    }
    function e3(e, t = 1) {
      var n;
      if (!e) return eJ.forEach((e) => e3(e.store.getState(), t));
      (null == (n = e.gl.xr) || !n.isPresenting) &&
        e.internal.active &&
        'never' !== e.frameloop &&
        (t > 1
          ? (e.internal.frames = Math.min(60, e.internal.frames + t))
          : e1
            ? (e.internal.frames = 2)
            : (e.internal.frames = 1),
        e0 || ((e0 = !0), requestAnimationFrame(e2)));
    }
    function e9(e, t = !0, n, r) {
      if ((t && eZ('before', e), n)) e$(e, n, r);
      else for (let t of eJ.values()) e$(e, t.store.getState());
      t && eZ('after', e);
    }
    let e8 = {
      onClick: ['click', !1],
      onContextMenu: ['contextmenu', !1],
      onDoubleClick: ['dblclick', !1],
      onWheel: ['wheel', !0],
      onPointerDown: ['pointerdown', !0],
      onPointerUp: ['pointerup', !0],
      onPointerLeave: ['pointerleave', !0],
      onPointerMove: ['pointermove', !0],
      onPointerCancel: ['pointercancel', !0],
      onLostPointerCapture: ['lostpointercapture', !0],
    };
    function e4(e) {
      let { handlePointer: t } = (function (e) {
        function t(e) {
          return e.filter((e) =>
            ['Move', 'Over', 'Enter', 'Out', 'Leave'].some((t) => {
              var n;
              return null == (n = e.__r3f)
                ? void 0
                : n.handlers['onPointer' + t];
            })
          );
        }
        function n(t) {
          let { internal: n } = e.getState();
          for (let e of n.hovered.values())
            if (
              !t.length ||
              !t.find(
                (t) =>
                  t.object === e.object &&
                  t.index === e.index &&
                  t.instanceId === e.instanceId
              )
            ) {
              let r = e.eventObject.__r3f;
              if ((n.hovered.delete(ep(e)), null != r && r.eventCount)) {
                let n = r.handlers,
                  a = { ...e, intersections: t };
                (null == n.onPointerOut || n.onPointerOut(a),
                  null == n.onPointerLeave || n.onPointerLeave(a));
              }
            }
        }
        function r(e, t) {
          for (let n = 0; n < t.length; n++) {
            let r = t[n].__r3f;
            null == r ||
              null == r.handlers.onPointerMissed ||
              r.handlers.onPointerMissed(e);
          }
        }
        return {
          handlePointer: function (a) {
            switch (a) {
              case 'onPointerLeave':
              case 'onPointerCancel':
                return () => n([]);
              case 'onLostPointerCapture':
                return (t) => {
                  let { internal: r } = e.getState();
                  'pointerId' in t &&
                    r.capturedMap.has(t.pointerId) &&
                    requestAnimationFrame(() => {
                      r.capturedMap.has(t.pointerId) &&
                        (r.capturedMap.delete(t.pointerId), n([]));
                    });
                };
            }
            return function (i) {
              let { onPointerMissed: o, internal: l } = e.getState();
              l.lastEvent.current = i;
              let s = 'onPointerMove' === a,
                u =
                  'onClick' === a ||
                  'onContextMenu' === a ||
                  'onDoubleClick' === a,
                c = (function (t, n) {
                  let r = e.getState(),
                    a = new Set(),
                    i = [],
                    o = n ? n(r.internal.interaction) : r.internal.interaction;
                  for (let e = 0; e < o.length; e++) {
                    let t = q(o[e]);
                    t && (t.raycaster.camera = void 0);
                  }
                  r.previousRoot ||
                    null == r.events.compute ||
                    r.events.compute(t, r);
                  let l = o
                    .flatMap(function (e) {
                      let n = q(e);
                      if (
                        !n ||
                        !n.events.enabled ||
                        null === n.raycaster.camera
                      )
                        return [];
                      if (void 0 === n.raycaster.camera) {
                        var r;
                        (null == n.events.compute ||
                          n.events.compute(
                            t,
                            n,
                            null == (r = n.previousRoot) ? void 0 : r.getState()
                          ),
                          void 0 === n.raycaster.camera &&
                            (n.raycaster.camera = null));
                      }
                      return n.raycaster.camera
                        ? n.raycaster.intersectObject(e, !0)
                        : [];
                    })
                    .sort((e, t) => {
                      let n = q(e.object),
                        r = q(t.object);
                      return (
                        (n && r && r.events.priority - n.events.priority) ||
                        e.distance - t.distance
                      );
                    })
                    .filter((e) => {
                      let t = ep(e);
                      return !a.has(t) && (a.add(t), !0);
                    });
                  for (let e of (r.events.filter && (l = r.events.filter(l, r)),
                  l)) {
                    let t = e.object;
                    for (; t; ) {
                      var s;
                      (null != (s = t.__r3f) &&
                        s.eventCount &&
                        i.push({ ...e, eventObject: t }),
                        (t = t.parent));
                    }
                  }
                  if (
                    'pointerId' in t &&
                    r.internal.capturedMap.has(t.pointerId)
                  )
                    for (let e of r.internal.capturedMap
                      .get(t.pointerId)
                      .values())
                      a.has(ep(e.intersection)) || i.push(e.intersection);
                  return i;
                })(i, s ? t : void 0),
                d = u
                  ? (function (t) {
                      let { internal: n } = e.getState(),
                        r = t.offsetX - n.initialClick[0],
                        a = t.offsetY - n.initialClick[1];
                      return Math.round(Math.sqrt(r * r + a * a));
                    })(i)
                  : 0;
              ('onPointerDown' === a &&
                ((l.initialClick = [i.offsetX, i.offsetY]),
                (l.initialHits = c.map((e) => e.eventObject))),
                u && !c.length && d <= 2 && (r(i, l.interaction), o && o(i)),
                s && n(c),
                !(function (e, t, r, a) {
                  if (e.length) {
                    let i = { stopped: !1 };
                    for (let o of e) {
                      let l = q(o.object);
                      if (
                        (l ||
                          o.object.traverseAncestors((e) => {
                            let t = q(e);
                            if (t) return ((l = t), !1);
                          }),
                        l)
                      ) {
                        let {
                            raycaster: s,
                            pointer: u,
                            camera: c,
                            internal: d,
                          } = l,
                          f = new S.Vector3(u.x, u.y, 0).unproject(c),
                          p = (e) => {
                            var t, n;
                            return (
                              null !=
                                (t =
                                  null == (n = d.capturedMap.get(e))
                                    ? void 0
                                    : n.has(o.eventObject)) && t
                            );
                          },
                          h = (e) => {
                            let n = { intersection: o, target: t.target };
                            (d.capturedMap.has(e)
                              ? d.capturedMap.get(e).set(o.eventObject, n)
                              : d.capturedMap.set(
                                  e,
                                  new Map([[o.eventObject, n]])
                                ),
                              t.target.setPointerCapture(e));
                          },
                          m = (e) => {
                            let t = d.capturedMap.get(e);
                            t && eh(d.capturedMap, o.eventObject, t, e);
                          },
                          g = {};
                        for (let e in t) {
                          let n = t[e];
                          'function' != typeof n && (g[e] = n);
                        }
                        let A = {
                          ...o,
                          ...g,
                          pointer: u,
                          intersections: e,
                          stopped: i.stopped,
                          delta: r,
                          unprojectedPoint: f,
                          ray: s.ray,
                          camera: c,
                          stopPropagation() {
                            let r =
                              'pointerId' in t &&
                              d.capturedMap.get(t.pointerId);
                            (!r || r.has(o.eventObject)) &&
                              ((A.stopped = i.stopped = !0),
                              d.hovered.size &&
                                Array.from(d.hovered.values()).find(
                                  (e) => e.eventObject === o.eventObject
                                ) &&
                                n([...e.slice(0, e.indexOf(o)), o]));
                          },
                          target: {
                            hasPointerCapture: p,
                            setPointerCapture: h,
                            releasePointerCapture: m,
                          },
                          currentTarget: {
                            hasPointerCapture: p,
                            setPointerCapture: h,
                            releasePointerCapture: m,
                          },
                          nativeEvent: t,
                        };
                        if ((a(A), !0 === i.stopped)) break;
                      }
                    }
                  }
                })(c, i, d, function (e) {
                  let t = e.eventObject,
                    n = t.__r3f;
                  if (!(null != n && n.eventCount)) return;
                  let o = n.handlers;
                  if (s) {
                    if (
                      o.onPointerOver ||
                      o.onPointerEnter ||
                      o.onPointerOut ||
                      o.onPointerLeave
                    ) {
                      let t = ep(e),
                        n = l.hovered.get(t);
                      n
                        ? n.stopped && e.stopPropagation()
                        : (l.hovered.set(t, e),
                          null == o.onPointerOver || o.onPointerOver(e),
                          null == o.onPointerEnter || o.onPointerEnter(e));
                    }
                    null == o.onPointerMove || o.onPointerMove(e);
                  } else {
                    let n = o[a];
                    n
                      ? (!u || l.initialHits.includes(t)) &&
                        (r(
                          i,
                          l.interaction.filter(
                            (e) => !l.initialHits.includes(e)
                          )
                        ),
                        n(e))
                      : u &&
                        l.initialHits.includes(t) &&
                        r(
                          i,
                          l.interaction.filter(
                            (e) => !l.initialHits.includes(e)
                          )
                        );
                  }
                }));
            };
          },
        };
      })(e);
      return {
        priority: 1,
        enabled: !0,
        compute(e, t, n) {
          (t.pointer.set(
            (e.offsetX / t.size.width) * 2 - 1,
            -(2 * (e.offsetY / t.size.height)) + 1
          ),
            t.raycaster.setFromCamera(t.pointer, t.camera));
        },
        connected: void 0,
        handlers: Object.keys(e8).reduce((e, n) => ({ ...e, [n]: t(n) }), {}),
        update: () => {
          var t;
          let { events: n, internal: r } = e.getState();
          null != (t = r.lastEvent) &&
            t.current &&
            n.handlers &&
            n.handlers.onPointerMove(r.lastEvent.current);
        },
        connect: (t) => {
          let { set: n, events: r } = e.getState();
          if (
            (null == r.disconnect || r.disconnect(),
            n((e) => ({ events: { ...e.events, connected: t } })),
            r.handlers)
          )
            for (let e in r.handlers) {
              let n = r.handlers[e],
                [a, i] = e8[e];
              t.addEventListener(a, n, { passive: i });
            }
        },
        disconnect: () => {
          let { set: t, events: n } = e.getState();
          if (n.connected) {
            if (n.handlers)
              for (let e in n.handlers) {
                let t = n.handlers[e],
                  [r] = e8[e];
                n.connected.removeEventListener(r, t);
              }
            t((e) => ({ events: { ...e.events, connected: void 0 } }));
          }
        },
      };
    }
    e.s(
      [
        'ACESFilmicToneMapping',
        () => S.ACESFilmicToneMapping,
        'AddEquation',
        () => S.AddEquation,
        'AddOperation',
        () => S.AddOperation,
        'AdditiveAnimationBlendMode',
        () => S.AdditiveAnimationBlendMode,
        'AdditiveBlending',
        () => S.AdditiveBlending,
        'AgXToneMapping',
        () => S.AgXToneMapping,
        'AlphaFormat',
        () => S.AlphaFormat,
        'AlwaysCompare',
        () => S.AlwaysCompare,
        'AlwaysDepth',
        () => S.AlwaysDepth,
        'AlwaysStencilFunc',
        () => S.AlwaysStencilFunc,
        'AmbientLight',
        () => S.AmbientLight,
        'AnimationAction',
        () => S.AnimationAction,
        'AnimationClip',
        () => S.AnimationClip,
        'AnimationLoader',
        () => S.AnimationLoader,
        'AnimationMixer',
        () => S.AnimationMixer,
        'AnimationObjectGroup',
        () => S.AnimationObjectGroup,
        'AnimationUtils',
        () => S.AnimationUtils,
        'ArcCurve',
        () => S.ArcCurve,
        'ArrayCamera',
        () => S.ArrayCamera,
        'ArrowHelper',
        () => S.ArrowHelper,
        'AttachedBindMode',
        () => S.AttachedBindMode,
        'Audio',
        () => S.Audio,
        'AudioAnalyser',
        () => S.AudioAnalyser,
        'AudioContext',
        () => S.AudioContext,
        'AudioListener',
        () => S.AudioListener,
        'AudioLoader',
        () => S.AudioLoader,
        'AxesHelper',
        () => S.AxesHelper,
        'BackSide',
        () => S.BackSide,
        'BasicDepthPacking',
        () => S.BasicDepthPacking,
        'BasicShadowMap',
        () => S.BasicShadowMap,
        'BatchedMesh',
        () => S.BatchedMesh,
        'Bone',
        () => S.Bone,
        'BooleanKeyframeTrack',
        () => S.BooleanKeyframeTrack,
        'Box2',
        () => S.Box2,
        'Box3',
        () => S.Box3,
        'Box3Helper',
        () => S.Box3Helper,
        'BoxGeometry',
        () => S.BoxGeometry,
        'BoxHelper',
        () => S.BoxHelper,
        'BufferAttribute',
        () => S.BufferAttribute,
        'BufferGeometry',
        () => S.BufferGeometry,
        'BufferGeometryLoader',
        () => S.BufferGeometryLoader,
        'ByteType',
        () => S.ByteType,
        'Cache',
        () => S.Cache,
        'Camera',
        () => S.Camera,
        'CameraHelper',
        () => S.CameraHelper,
        'CanvasTexture',
        () => S.CanvasTexture,
        'CapsuleGeometry',
        () => S.CapsuleGeometry,
        'CatmullRomCurve3',
        () => S.CatmullRomCurve3,
        'CineonToneMapping',
        () => S.CineonToneMapping,
        'CircleGeometry',
        () => S.CircleGeometry,
        'ClampToEdgeWrapping',
        () => S.ClampToEdgeWrapping,
        'Clock',
        () => S.Clock,
        'Color',
        () => S.Color,
        'ColorKeyframeTrack',
        () => S.ColorKeyframeTrack,
        'ColorManagement',
        () => S.ColorManagement,
        'CompressedArrayTexture',
        () => S.CompressedArrayTexture,
        'CompressedCubeTexture',
        () => S.CompressedCubeTexture,
        'CompressedTexture',
        () => S.CompressedTexture,
        'CompressedTextureLoader',
        () => S.CompressedTextureLoader,
        'ConeGeometry',
        () => S.ConeGeometry,
        'ConstantAlphaFactor',
        () => S.ConstantAlphaFactor,
        'ConstantColorFactor',
        () => S.ConstantColorFactor,
        'Controls',
        () => S.Controls,
        'CubeCamera',
        () => S.CubeCamera,
        'CubeDepthTexture',
        () => S.CubeDepthTexture,
        'CubeReflectionMapping',
        () => S.CubeReflectionMapping,
        'CubeRefractionMapping',
        () => S.CubeRefractionMapping,
        'CubeTexture',
        () => S.CubeTexture,
        'CubeTextureLoader',
        () => S.CubeTextureLoader,
        'CubeUVReflectionMapping',
        () => S.CubeUVReflectionMapping,
        'CubicBezierCurve',
        () => S.CubicBezierCurve,
        'CubicBezierCurve3',
        () => S.CubicBezierCurve3,
        'CubicInterpolant',
        () => S.CubicInterpolant,
        'CullFaceBack',
        () => S.CullFaceBack,
        'CullFaceFront',
        () => S.CullFaceFront,
        'CullFaceFrontBack',
        () => S.CullFaceFrontBack,
        'CullFaceNone',
        () => S.CullFaceNone,
        'Curve',
        () => S.Curve,
        'CurvePath',
        () => S.CurvePath,
        'CustomBlending',
        () => S.CustomBlending,
        'CustomToneMapping',
        () => S.CustomToneMapping,
        'CylinderGeometry',
        () => S.CylinderGeometry,
        'Cylindrical',
        () => S.Cylindrical,
        'Data3DTexture',
        () => S.Data3DTexture,
        'DataArrayTexture',
        () => S.DataArrayTexture,
        'DataTexture',
        () => S.DataTexture,
        'DataTextureLoader',
        () => S.DataTextureLoader,
        'DataUtils',
        () => S.DataUtils,
        'DecrementStencilOp',
        () => S.DecrementStencilOp,
        'DecrementWrapStencilOp',
        () => S.DecrementWrapStencilOp,
        'DefaultLoadingManager',
        () => S.DefaultLoadingManager,
        'DepthFormat',
        () => S.DepthFormat,
        'DepthStencilFormat',
        () => S.DepthStencilFormat,
        'DepthTexture',
        () => S.DepthTexture,
        'DetachedBindMode',
        () => S.DetachedBindMode,
        'DirectionalLight',
        () => S.DirectionalLight,
        'DirectionalLightHelper',
        () => S.DirectionalLightHelper,
        'DiscreteInterpolant',
        () => S.DiscreteInterpolant,
        'DodecahedronGeometry',
        () => S.DodecahedronGeometry,
        'DoubleSide',
        () => S.DoubleSide,
        'DstAlphaFactor',
        () => S.DstAlphaFactor,
        'DstColorFactor',
        () => S.DstColorFactor,
        'DynamicCopyUsage',
        () => S.DynamicCopyUsage,
        'DynamicDrawUsage',
        () => S.DynamicDrawUsage,
        'DynamicReadUsage',
        () => S.DynamicReadUsage,
        'EdgesGeometry',
        () => S.EdgesGeometry,
        'EllipseCurve',
        () => S.EllipseCurve,
        'EqualCompare',
        () => S.EqualCompare,
        'EqualDepth',
        () => S.EqualDepth,
        'EqualStencilFunc',
        () => S.EqualStencilFunc,
        'EquirectangularReflectionMapping',
        () => S.EquirectangularReflectionMapping,
        'EquirectangularRefractionMapping',
        () => S.EquirectangularRefractionMapping,
        'Euler',
        () => S.Euler,
        'EventDispatcher',
        () => S.EventDispatcher,
        'ExternalTexture',
        () => S.ExternalTexture,
        'ExtrudeGeometry',
        () => S.ExtrudeGeometry,
        'FileLoader',
        () => S.FileLoader,
        'Float16BufferAttribute',
        () => S.Float16BufferAttribute,
        'Float32BufferAttribute',
        () => S.Float32BufferAttribute,
        'FloatType',
        () => S.FloatType,
        'Fog',
        () => S.Fog,
        'FogExp2',
        () => S.FogExp2,
        'FramebufferTexture',
        () => S.FramebufferTexture,
        'FrontSide',
        () => S.FrontSide,
        'Frustum',
        () => S.Frustum,
        'FrustumArray',
        () => S.FrustumArray,
        'GLBufferAttribute',
        () => S.GLBufferAttribute,
        'GLSL1',
        () => S.GLSL1,
        'GLSL3',
        () => S.GLSL3,
        'GreaterCompare',
        () => S.GreaterCompare,
        'GreaterDepth',
        () => S.GreaterDepth,
        'GreaterEqualCompare',
        () => S.GreaterEqualCompare,
        'GreaterEqualDepth',
        () => S.GreaterEqualDepth,
        'GreaterEqualStencilFunc',
        () => S.GreaterEqualStencilFunc,
        'GreaterStencilFunc',
        () => S.GreaterStencilFunc,
        'GridHelper',
        () => S.GridHelper,
        'Group',
        () => S.Group,
        'HalfFloatType',
        () => S.HalfFloatType,
        'HemisphereLight',
        () => S.HemisphereLight,
        'HemisphereLightHelper',
        () => S.HemisphereLightHelper,
        'IcosahedronGeometry',
        () => S.IcosahedronGeometry,
        'ImageBitmapLoader',
        () => S.ImageBitmapLoader,
        'ImageLoader',
        () => S.ImageLoader,
        'ImageUtils',
        () => S.ImageUtils,
        'IncrementStencilOp',
        () => S.IncrementStencilOp,
        'IncrementWrapStencilOp',
        () => S.IncrementWrapStencilOp,
        'InstancedBufferAttribute',
        () => S.InstancedBufferAttribute,
        'InstancedBufferGeometry',
        () => S.InstancedBufferGeometry,
        'InstancedInterleavedBuffer',
        () => S.InstancedInterleavedBuffer,
        'InstancedMesh',
        () => S.InstancedMesh,
        'Int16BufferAttribute',
        () => S.Int16BufferAttribute,
        'Int32BufferAttribute',
        () => S.Int32BufferAttribute,
        'Int8BufferAttribute',
        () => S.Int8BufferAttribute,
        'IntType',
        () => S.IntType,
        'InterleavedBuffer',
        () => S.InterleavedBuffer,
        'InterleavedBufferAttribute',
        () => S.InterleavedBufferAttribute,
        'Interpolant',
        () => S.Interpolant,
        'InterpolateDiscrete',
        () => S.InterpolateDiscrete,
        'InterpolateLinear',
        () => S.InterpolateLinear,
        'InterpolateSmooth',
        () => S.InterpolateSmooth,
        'InterpolationSamplingMode',
        () => S.InterpolationSamplingMode,
        'InterpolationSamplingType',
        () => S.InterpolationSamplingType,
        'InvertStencilOp',
        () => S.InvertStencilOp,
        'KeepStencilOp',
        () => S.KeepStencilOp,
        'KeyframeTrack',
        () => S.KeyframeTrack,
        'LOD',
        () => S.LOD,
        'LatheGeometry',
        () => S.LatheGeometry,
        'Layers',
        () => S.Layers,
        'LessCompare',
        () => S.LessCompare,
        'LessDepth',
        () => S.LessDepth,
        'LessEqualCompare',
        () => S.LessEqualCompare,
        'LessEqualDepth',
        () => S.LessEqualDepth,
        'LessEqualStencilFunc',
        () => S.LessEqualStencilFunc,
        'LessStencilFunc',
        () => S.LessStencilFunc,
        'Light',
        () => S.Light,
        'LightProbe',
        () => S.LightProbe,
        'Line',
        () => S.Line,
        'Line3',
        () => S.Line3,
        'LineBasicMaterial',
        () => S.LineBasicMaterial,
        'LineCurve',
        () => S.LineCurve,
        'LineCurve3',
        () => S.LineCurve3,
        'LineDashedMaterial',
        () => S.LineDashedMaterial,
        'LineLoop',
        () => S.LineLoop,
        'LineSegments',
        () => S.LineSegments,
        'LinearFilter',
        () => S.LinearFilter,
        'LinearInterpolant',
        () => S.LinearInterpolant,
        'LinearMipMapLinearFilter',
        () => S.LinearMipMapLinearFilter,
        'LinearMipMapNearestFilter',
        () => S.LinearMipMapNearestFilter,
        'LinearMipmapLinearFilter',
        () => S.LinearMipmapLinearFilter,
        'LinearMipmapNearestFilter',
        () => S.LinearMipmapNearestFilter,
        'LinearSRGBColorSpace',
        () => S.LinearSRGBColorSpace,
        'LinearToneMapping',
        () => S.LinearToneMapping,
        'LinearTransfer',
        () => S.LinearTransfer,
        'Loader',
        () => S.Loader,
        'LoaderUtils',
        () => S.LoaderUtils,
        'LoadingManager',
        () => S.LoadingManager,
        'LoopOnce',
        () => S.LoopOnce,
        'LoopPingPong',
        () => S.LoopPingPong,
        'LoopRepeat',
        () => S.LoopRepeat,
        'MOUSE',
        () => S.MOUSE,
        'Material',
        () => S.Material,
        'MaterialLoader',
        () => S.MaterialLoader,
        'MathUtils',
        () => S.MathUtils,
        'Matrix2',
        () => S.Matrix2,
        'Matrix3',
        () => S.Matrix3,
        'Matrix4',
        () => S.Matrix4,
        'MaxEquation',
        () => S.MaxEquation,
        'Mesh',
        () => S.Mesh,
        'MeshBasicMaterial',
        () => S.MeshBasicMaterial,
        'MeshDepthMaterial',
        () => S.MeshDepthMaterial,
        'MeshDistanceMaterial',
        () => S.MeshDistanceMaterial,
        'MeshLambertMaterial',
        () => S.MeshLambertMaterial,
        'MeshMatcapMaterial',
        () => S.MeshMatcapMaterial,
        'MeshNormalMaterial',
        () => S.MeshNormalMaterial,
        'MeshPhongMaterial',
        () => S.MeshPhongMaterial,
        'MeshPhysicalMaterial',
        () => S.MeshPhysicalMaterial,
        'MeshStandardMaterial',
        () => S.MeshStandardMaterial,
        'MeshToonMaterial',
        () => S.MeshToonMaterial,
        'MinEquation',
        () => S.MinEquation,
        'MirroredRepeatWrapping',
        () => S.MirroredRepeatWrapping,
        'MixOperation',
        () => S.MixOperation,
        'MultiplyBlending',
        () => S.MultiplyBlending,
        'MultiplyOperation',
        () => S.MultiplyOperation,
        'NearestFilter',
        () => S.NearestFilter,
        'NearestMipMapLinearFilter',
        () => S.NearestMipMapLinearFilter,
        'NearestMipMapNearestFilter',
        () => S.NearestMipMapNearestFilter,
        'NearestMipmapLinearFilter',
        () => S.NearestMipmapLinearFilter,
        'NearestMipmapNearestFilter',
        () => S.NearestMipmapNearestFilter,
        'NeutralToneMapping',
        () => S.NeutralToneMapping,
        'NeverCompare',
        () => S.NeverCompare,
        'NeverDepth',
        () => S.NeverDepth,
        'NeverStencilFunc',
        () => S.NeverStencilFunc,
        'NoBlending',
        () => S.NoBlending,
        'NoColorSpace',
        () => S.NoColorSpace,
        'NoNormalPacking',
        () => S.NoNormalPacking,
        'NoToneMapping',
        () => S.NoToneMapping,
        'NormalAnimationBlendMode',
        () => S.NormalAnimationBlendMode,
        'NormalBlending',
        () => S.NormalBlending,
        'NormalGAPacking',
        () => S.NormalGAPacking,
        'NormalRGPacking',
        () => S.NormalRGPacking,
        'NotEqualCompare',
        () => S.NotEqualCompare,
        'NotEqualDepth',
        () => S.NotEqualDepth,
        'NotEqualStencilFunc',
        () => S.NotEqualStencilFunc,
        'NumberKeyframeTrack',
        () => S.NumberKeyframeTrack,
        'Object3D',
        () => S.Object3D,
        'ObjectLoader',
        () => S.ObjectLoader,
        'ObjectSpaceNormalMap',
        () => S.ObjectSpaceNormalMap,
        'OctahedronGeometry',
        () => S.OctahedronGeometry,
        'OneFactor',
        () => S.OneFactor,
        'OneMinusConstantAlphaFactor',
        () => S.OneMinusConstantAlphaFactor,
        'OneMinusConstantColorFactor',
        () => S.OneMinusConstantColorFactor,
        'OneMinusDstAlphaFactor',
        () => S.OneMinusDstAlphaFactor,
        'OneMinusDstColorFactor',
        () => S.OneMinusDstColorFactor,
        'OneMinusSrcAlphaFactor',
        () => S.OneMinusSrcAlphaFactor,
        'OneMinusSrcColorFactor',
        () => S.OneMinusSrcColorFactor,
        'OrthographicCamera',
        () => S.OrthographicCamera,
        'PCFShadowMap',
        () => S.PCFShadowMap,
        'PCFSoftShadowMap',
        () => S.PCFSoftShadowMap,
        'PMREMGenerator',
        () => E.PMREMGenerator,
        'Path',
        () => S.Path,
        'PerspectiveCamera',
        () => S.PerspectiveCamera,
        'Plane',
        () => S.Plane,
        'PlaneGeometry',
        () => S.PlaneGeometry,
        'PlaneHelper',
        () => S.PlaneHelper,
        'PointLight',
        () => S.PointLight,
        'PointLightHelper',
        () => S.PointLightHelper,
        'Points',
        () => S.Points,
        'PointsMaterial',
        () => S.PointsMaterial,
        'PolarGridHelper',
        () => S.PolarGridHelper,
        'PolyhedronGeometry',
        () => S.PolyhedronGeometry,
        'PositionalAudio',
        () => S.PositionalAudio,
        'PropertyBinding',
        () => S.PropertyBinding,
        'PropertyMixer',
        () => S.PropertyMixer,
        'QuadraticBezierCurve',
        () => S.QuadraticBezierCurve,
        'QuadraticBezierCurve3',
        () => S.QuadraticBezierCurve3,
        'Quaternion',
        () => S.Quaternion,
        'QuaternionKeyframeTrack',
        () => S.QuaternionKeyframeTrack,
        'QuaternionLinearInterpolant',
        () => S.QuaternionLinearInterpolant,
        'R11_EAC_Format',
        () => S.R11_EAC_Format,
        'RED_GREEN_RGTC2_Format',
        () => S.RED_GREEN_RGTC2_Format,
        'RED_RGTC1_Format',
        () => S.RED_RGTC1_Format,
        'REVISION',
        () => S.REVISION,
        'RG11_EAC_Format',
        () => S.RG11_EAC_Format,
        'RGBADepthPacking',
        () => S.RGBADepthPacking,
        'RGBAFormat',
        () => S.RGBAFormat,
        'RGBAIntegerFormat',
        () => S.RGBAIntegerFormat,
        'RGBA_ASTC_10x10_Format',
        () => S.RGBA_ASTC_10x10_Format,
        'RGBA_ASTC_10x5_Format',
        () => S.RGBA_ASTC_10x5_Format,
        'RGBA_ASTC_10x6_Format',
        () => S.RGBA_ASTC_10x6_Format,
        'RGBA_ASTC_10x8_Format',
        () => S.RGBA_ASTC_10x8_Format,
        'RGBA_ASTC_12x10_Format',
        () => S.RGBA_ASTC_12x10_Format,
        'RGBA_ASTC_12x12_Format',
        () => S.RGBA_ASTC_12x12_Format,
        'RGBA_ASTC_4x4_Format',
        () => S.RGBA_ASTC_4x4_Format,
        'RGBA_ASTC_5x4_Format',
        () => S.RGBA_ASTC_5x4_Format,
        'RGBA_ASTC_5x5_Format',
        () => S.RGBA_ASTC_5x5_Format,
        'RGBA_ASTC_6x5_Format',
        () => S.RGBA_ASTC_6x5_Format,
        'RGBA_ASTC_6x6_Format',
        () => S.RGBA_ASTC_6x6_Format,
        'RGBA_ASTC_8x5_Format',
        () => S.RGBA_ASTC_8x5_Format,
        'RGBA_ASTC_8x6_Format',
        () => S.RGBA_ASTC_8x6_Format,
        'RGBA_ASTC_8x8_Format',
        () => S.RGBA_ASTC_8x8_Format,
        'RGBA_BPTC_Format',
        () => S.RGBA_BPTC_Format,
        'RGBA_ETC2_EAC_Format',
        () => S.RGBA_ETC2_EAC_Format,
        'RGBA_PVRTC_2BPPV1_Format',
        () => S.RGBA_PVRTC_2BPPV1_Format,
        'RGBA_PVRTC_4BPPV1_Format',
        () => S.RGBA_PVRTC_4BPPV1_Format,
        'RGBA_S3TC_DXT1_Format',
        () => S.RGBA_S3TC_DXT1_Format,
        'RGBA_S3TC_DXT3_Format',
        () => S.RGBA_S3TC_DXT3_Format,
        'RGBA_S3TC_DXT5_Format',
        () => S.RGBA_S3TC_DXT5_Format,
        'RGBDepthPacking',
        () => S.RGBDepthPacking,
        'RGBFormat',
        () => S.RGBFormat,
        'RGBIntegerFormat',
        () => S.RGBIntegerFormat,
        'RGB_BPTC_SIGNED_Format',
        () => S.RGB_BPTC_SIGNED_Format,
        'RGB_BPTC_UNSIGNED_Format',
        () => S.RGB_BPTC_UNSIGNED_Format,
        'RGB_ETC1_Format',
        () => S.RGB_ETC1_Format,
        'RGB_ETC2_Format',
        () => S.RGB_ETC2_Format,
        'RGB_PVRTC_2BPPV1_Format',
        () => S.RGB_PVRTC_2BPPV1_Format,
        'RGB_PVRTC_4BPPV1_Format',
        () => S.RGB_PVRTC_4BPPV1_Format,
        'RGB_S3TC_DXT1_Format',
        () => S.RGB_S3TC_DXT1_Format,
        'RGDepthPacking',
        () => S.RGDepthPacking,
        'RGFormat',
        () => S.RGFormat,
        'RGIntegerFormat',
        () => S.RGIntegerFormat,
        'RawShaderMaterial',
        () => S.RawShaderMaterial,
        'Ray',
        () => S.Ray,
        'Raycaster',
        () => S.Raycaster,
        'RectAreaLight',
        () => S.RectAreaLight,
        'RedFormat',
        () => S.RedFormat,
        'RedIntegerFormat',
        () => S.RedIntegerFormat,
        'ReinhardToneMapping',
        () => S.ReinhardToneMapping,
        'RenderTarget',
        () => S.RenderTarget,
        'RenderTarget3D',
        () => S.RenderTarget3D,
        'RepeatWrapping',
        () => S.RepeatWrapping,
        'ReplaceStencilOp',
        () => S.ReplaceStencilOp,
        'ReverseSubtractEquation',
        () => S.ReverseSubtractEquation,
        'RingGeometry',
        () => S.RingGeometry,
        'SIGNED_R11_EAC_Format',
        () => S.SIGNED_R11_EAC_Format,
        'SIGNED_RED_GREEN_RGTC2_Format',
        () => S.SIGNED_RED_GREEN_RGTC2_Format,
        'SIGNED_RED_RGTC1_Format',
        () => S.SIGNED_RED_RGTC1_Format,
        'SIGNED_RG11_EAC_Format',
        () => S.SIGNED_RG11_EAC_Format,
        'SRGBColorSpace',
        () => S.SRGBColorSpace,
        'SRGBTransfer',
        () => S.SRGBTransfer,
        'Scene',
        () => S.Scene,
        'ShaderChunk',
        () => E.ShaderChunk,
        'ShaderLib',
        () => E.ShaderLib,
        'ShaderMaterial',
        () => S.ShaderMaterial,
        'ShadowMaterial',
        () => S.ShadowMaterial,
        'Shape',
        () => S.Shape,
        'ShapeGeometry',
        () => S.ShapeGeometry,
        'ShapePath',
        () => S.ShapePath,
        'ShapeUtils',
        () => S.ShapeUtils,
        'ShortType',
        () => S.ShortType,
        'Skeleton',
        () => S.Skeleton,
        'SkeletonHelper',
        () => S.SkeletonHelper,
        'SkinnedMesh',
        () => S.SkinnedMesh,
        'Source',
        () => S.Source,
        'Sphere',
        () => S.Sphere,
        'SphereGeometry',
        () => S.SphereGeometry,
        'Spherical',
        () => S.Spherical,
        'SphericalHarmonics3',
        () => S.SphericalHarmonics3,
        'SplineCurve',
        () => S.SplineCurve,
        'SpotLight',
        () => S.SpotLight,
        'SpotLightHelper',
        () => S.SpotLightHelper,
        'Sprite',
        () => S.Sprite,
        'SpriteMaterial',
        () => S.SpriteMaterial,
        'SrcAlphaFactor',
        () => S.SrcAlphaFactor,
        'SrcAlphaSaturateFactor',
        () => S.SrcAlphaSaturateFactor,
        'SrcColorFactor',
        () => S.SrcColorFactor,
        'StaticCopyUsage',
        () => S.StaticCopyUsage,
        'StaticDrawUsage',
        () => S.StaticDrawUsage,
        'StaticReadUsage',
        () => S.StaticReadUsage,
        'StereoCamera',
        () => S.StereoCamera,
        'StreamCopyUsage',
        () => S.StreamCopyUsage,
        'StreamDrawUsage',
        () => S.StreamDrawUsage,
        'StreamReadUsage',
        () => S.StreamReadUsage,
        'StringKeyframeTrack',
        () => S.StringKeyframeTrack,
        'SubtractEquation',
        () => S.SubtractEquation,
        'SubtractiveBlending',
        () => S.SubtractiveBlending,
        'TOUCH',
        () => S.TOUCH,
        'TangentSpaceNormalMap',
        () => S.TangentSpaceNormalMap,
        'TetrahedronGeometry',
        () => S.TetrahedronGeometry,
        'Texture',
        () => S.Texture,
        'TextureLoader',
        () => S.TextureLoader,
        'TextureUtils',
        () => S.TextureUtils,
        'Timer',
        () => S.Timer,
        'TimestampQuery',
        () => S.TimestampQuery,
        'TorusGeometry',
        () => S.TorusGeometry,
        'TorusKnotGeometry',
        () => S.TorusKnotGeometry,
        'Triangle',
        () => S.Triangle,
        'TriangleFanDrawMode',
        () => S.TriangleFanDrawMode,
        'TriangleStripDrawMode',
        () => S.TriangleStripDrawMode,
        'TrianglesDrawMode',
        () => S.TrianglesDrawMode,
        'TubeGeometry',
        () => S.TubeGeometry,
        'UVMapping',
        () => S.UVMapping,
        'Uint16BufferAttribute',
        () => S.Uint16BufferAttribute,
        'Uint32BufferAttribute',
        () => S.Uint32BufferAttribute,
        'Uint8BufferAttribute',
        () => S.Uint8BufferAttribute,
        'Uint8ClampedBufferAttribute',
        () => S.Uint8ClampedBufferAttribute,
        'Uniform',
        () => S.Uniform,
        'UniformsGroup',
        () => S.UniformsGroup,
        'UniformsLib',
        () => E.UniformsLib,
        'UniformsUtils',
        () => S.UniformsUtils,
        'UnsignedByteType',
        () => S.UnsignedByteType,
        'UnsignedInt101111Type',
        () => S.UnsignedInt101111Type,
        'UnsignedInt248Type',
        () => S.UnsignedInt248Type,
        'UnsignedInt5999Type',
        () => S.UnsignedInt5999Type,
        'UnsignedIntType',
        () => S.UnsignedIntType,
        'UnsignedShort4444Type',
        () => S.UnsignedShort4444Type,
        'UnsignedShort5551Type',
        () => S.UnsignedShort5551Type,
        'UnsignedShortType',
        () => S.UnsignedShortType,
        'VSMShadowMap',
        () => S.VSMShadowMap,
        'Vector2',
        () => S.Vector2,
        'Vector3',
        () => S.Vector3,
        'Vector4',
        () => S.Vector4,
        'VectorKeyframeTrack',
        () => S.VectorKeyframeTrack,
        'VideoFrameTexture',
        () => S.VideoFrameTexture,
        'VideoTexture',
        () => S.VideoTexture,
        'WebGL3DRenderTarget',
        () => S.WebGL3DRenderTarget,
        'WebGLArrayRenderTarget',
        () => S.WebGLArrayRenderTarget,
        'WebGLCoordinateSystem',
        () => S.WebGLCoordinateSystem,
        'WebGLCubeRenderTarget',
        () => S.WebGLCubeRenderTarget,
        'WebGLRenderTarget',
        () => S.WebGLRenderTarget,
        'WebGLRenderer',
        () => E.WebGLRenderer,
        'WebGLUtils',
        () => E.WebGLUtils,
        'WebGPUCoordinateSystem',
        () => S.WebGPUCoordinateSystem,
        'WebXRController',
        () => S.WebXRController,
        'WireframeGeometry',
        () => S.WireframeGeometry,
        'WrapAroundEnding',
        () => S.WrapAroundEnding,
        'ZeroCurvatureEnding',
        () => S.ZeroCurvatureEnding,
        'ZeroFactor',
        () => S.ZeroFactor,
        'ZeroSlopeEnding',
        () => S.ZeroSlopeEnding,
        'ZeroStencilOp',
        () => S.ZeroStencilOp,
        'createCanvasElement',
        () => S.createCanvasElement,
        'error',
        () => S.error,
        'getConsoleFunction',
        () => S.getConsoleFunction,
        'log',
        () => S.log,
        'setConsoleFunction',
        () => S.setConsoleFunction,
        'warn',
        () => S.warn,
        'warnOnce',
        () => S.warnOnce,
      ],
      11487
    );
    var e6 = e.i(11487);
    function e5(e, t) {
      let n;
      return (...r) => {
        (window.clearTimeout(n), (n = window.setTimeout(() => e(...r), t)));
      };
    }
    let e7 = ['x', 'y', 'top', 'bottom', 'left', 'right', 'width', 'height'];
    function te({
      ref: e,
      children: t,
      fallback: n,
      resize: r,
      style: a,
      gl: i,
      events: o = e4,
      eventSource: l,
      eventPrefix: s,
      shadows: u,
      linear: c,
      flat: d,
      legacy: f,
      orthographic: p,
      frameloop: h,
      dpr: m,
      performance: g,
      raycaster: A,
      camera: b,
      scene: C,
      onPointerMissed: y,
      onCreated: x,
      ...M
    }) {
      let F, T, R;
      B.useMemo(() => eR(e6), []);
      let G =
          ((F = O()),
          (T = (function () {
            let e = O(),
              [t] = P.useState(() => new Map());
            t.clear();
            let n = e;
            for (; n; ) {
              let e = n.type;
              (J(e) && e !== H && !t.has(e) && t.set(e, P.use(N(e))),
                (n = n.return));
            }
            return t;
          })()),
          (R = P.useMemo(
            () =>
              Array.from(T.keys()).reduce(
                (e, t) => (n) =>
                  P.createElement(
                    e,
                    null,
                    P.createElement(t.Provider, { ...n, value: T.get(t) })
                  ),
                (e) => P.createElement(U, { ...e })
              ),
            [T]
          )),
          w.useMemo(
            () =>
              ({ children: e }) => {
                let t = L(F, !0, (e) => e.type === w.StrictMode)
                  ? w.StrictMode
                  : w.Fragment;
                return (0, v.jsx)(t, {
                  children: (0, v.jsx)(R, { children: e }),
                });
              },
            [F, R]
          )),
        [D, _] = (function (
          { debounce: e, scroll: t, polyfill: n, offsetSize: r } = {
            debounce: 0,
            scroll: !1,
            offsetSize: !1,
          }
        ) {
          var a, i, o;
          let l = n || ('u' < typeof window ? class {} : window.ResizeObserver);
          if (!l)
            throw Error(
              'This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills'
            );
          let [s, u] = (0, B.useState)({
              left: 0,
              top: 0,
              width: 0,
              height: 0,
              bottom: 0,
              right: 0,
              x: 0,
              y: 0,
            }),
            c = (0, B.useRef)({
              element: null,
              scrollContainers: null,
              resizeObserver: null,
              lastBounds: s,
              orientationHandler: null,
            }),
            d = e ? ('number' == typeof e ? e : e.scroll) : null,
            f = e ? ('number' == typeof e ? e : e.resize) : null,
            p = (0, B.useRef)(!1);
          (0, B.useEffect)(
            () => ((p.current = !0), () => void (p.current = !1))
          );
          let [h, m, g] = (0, B.useMemo)(() => {
            let e = () => {
              let e, t;
              if (!c.current.element) return;
              let {
                  left: n,
                  top: a,
                  width: i,
                  height: o,
                  bottom: l,
                  right: s,
                  x: d,
                  y: f,
                } = c.current.element.getBoundingClientRect(),
                h = {
                  left: n,
                  top: a,
                  width: i,
                  height: o,
                  bottom: l,
                  right: s,
                  x: d,
                  y: f,
                };
              (c.current.element instanceof HTMLElement &&
                r &&
                ((h.height = c.current.element.offsetHeight),
                (h.width = c.current.element.offsetWidth)),
                Object.freeze(h),
                p.current &&
                  ((e = c.current.lastBounds),
                  (t = h),
                  !e7.every((n) => e[n] === t[n])) &&
                  u((c.current.lastBounds = h)));
            };
            return [e, f ? e5(e, f) : e, d ? e5(e, d) : e];
          }, [u, r, d, f]);
          function A() {
            (c.current.scrollContainers &&
              (c.current.scrollContainers.forEach((e) =>
                e.removeEventListener('scroll', g, !0)
              ),
              (c.current.scrollContainers = null)),
              c.current.resizeObserver &&
                (c.current.resizeObserver.disconnect(),
                (c.current.resizeObserver = null)),
              c.current.orientationHandler &&
                ('orientation' in screen &&
                'removeEventListener' in screen.orientation
                  ? screen.orientation.removeEventListener(
                      'change',
                      c.current.orientationHandler
                    )
                  : 'onorientationchange' in window &&
                    window.removeEventListener(
                      'orientationchange',
                      c.current.orientationHandler
                    )));
          }
          function v() {
            c.current.element &&
              ((c.current.resizeObserver = new l(g)),
              c.current.resizeObserver.observe(c.current.element),
              t &&
                c.current.scrollContainers &&
                c.current.scrollContainers.forEach((e) =>
                  e.addEventListener('scroll', g, { capture: !0, passive: !0 })
                ),
              (c.current.orientationHandler = () => {
                g();
              }),
              'orientation' in screen &&
              'addEventListener' in screen.orientation
                ? screen.orientation.addEventListener(
                    'change',
                    c.current.orientationHandler
                  )
                : 'onorientationchange' in window &&
                  window.addEventListener(
                    'orientationchange',
                    c.current.orientationHandler
                  ));
          }
          return (
            (a = g),
            (i = !!t),
            (0, B.useEffect)(() => {
              if (i)
                return (
                  window.addEventListener('scroll', a, {
                    capture: !0,
                    passive: !0,
                  }),
                  () => void window.removeEventListener('scroll', a, !0)
                );
            }, [a, i]),
            (o = m),
            (0, B.useEffect)(
              () => (
                window.addEventListener('resize', o),
                () => void window.removeEventListener('resize', o)
              ),
              [o]
            ),
            (0, B.useEffect)(() => {
              (A(), v());
            }, [t, g, m]),
            (0, B.useEffect)(() => A, []),
            [
              (e) => {
                e &&
                  e !== c.current.element &&
                  (A(),
                  (c.current.element = e),
                  (c.current.scrollContainers = (function e(t) {
                    let n = [];
                    if (!t || t === document.body) return n;
                    let {
                      overflow: r,
                      overflowX: a,
                      overflowY: i,
                    } = window.getComputedStyle(t);
                    return (
                      [r, a, i].some((e) => 'auto' === e || 'scroll' === e) &&
                        n.push(t),
                      [...n, ...e(t.parentElement)]
                    );
                  })(e)),
                  v());
              },
              s,
              h,
            ]
          );
        })({ scroll: !0, debounce: { scroll: 50, resize: 0 }, ...r }),
        k = B.useRef(null),
        j = B.useRef(null);
      B.useImperativeHandle(e, () => k.current);
      let z = X(y),
        [K, q] = B.useState(!1),
        [$, et] = B.useState(!1);
      if (K) throw K;
      if ($) throw $;
      let en = B.useRef(null);
      (Q(() => {
        let e = k.current;
        if (_.width > 0 && _.height > 0 && e) {
          let n, r, a, y, M, F, T, R, D, k, P, L, N, H, U;
          (en.current ||
            ((y = null == (a = eJ.get(e)) ? void 0 : a.fiber),
            (M = null == a ? void 0 : a.store),
            a && console.warn('R3F.createRoot should only be called once!'),
            (F =
              'function' == typeof reportError ? reportError : console.error),
            (L =
              M ||
              ((D = (R = (T = I((e, t) => {
                let n,
                  r = new S.Vector3(),
                  a = new S.Vector3(),
                  i = new S.Vector3();
                function o(e = t().camera, n = a, l = t().size) {
                  let { width: s, height: u, top: c, left: d } = l,
                    f = s / u;
                  n.isVector3 ? i.copy(n) : i.set(...n);
                  let p = e.getWorldPosition(r).distanceTo(i);
                  if (e && e.isOrthographicCamera)
                    return {
                      width: s / e.zoom,
                      height: u / e.zoom,
                      top: c,
                      left: d,
                      factor: 1,
                      distance: p,
                      aspect: f,
                    };
                  {
                    let t = 2 * Math.tan((e.fov * Math.PI) / 180 / 2) * p,
                      n = (s / u) * t;
                    return {
                      width: n,
                      height: t,
                      top: c,
                      left: d,
                      factor: s / n,
                      distance: p,
                      aspect: f,
                    };
                  }
                }
                let l = (t) =>
                    e((e) => ({
                      performance: { ...e.performance, current: t },
                    })),
                  s = new S.Vector2();
                return {
                  set: e,
                  get: t,
                  gl: null,
                  camera: null,
                  raycaster: null,
                  events: { priority: 1, enabled: !0, connected: !1 },
                  scene: null,
                  xr: null,
                  invalidate: (e = 1) => e3(t(), e),
                  advance: (e, n) => e9(e, n, t()),
                  legacy: !1,
                  linear: !1,
                  flat: !1,
                  controls: null,
                  clock: new S.Clock(),
                  pointer: s,
                  mouse: s,
                  frameloop: 'always',
                  onPointerMissed: void 0,
                  performance: {
                    current: 1,
                    min: 0.5,
                    max: 1,
                    debounce: 200,
                    regress: () => {
                      let e = t();
                      (n && clearTimeout(n),
                        e.performance.current !== e.performance.min &&
                          l(e.performance.min),
                        (n = setTimeout(
                          () => l(t().performance.max),
                          e.performance.debounce
                        )));
                    },
                  },
                  size: { width: 0, height: 0, top: 0, left: 0 },
                  viewport: {
                    initialDpr: 0,
                    dpr: 0,
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0,
                    aspect: 0,
                    distance: 0,
                    factor: 0,
                    getCurrentViewport: o,
                  },
                  setEvents: (t) =>
                    e((e) => ({ ...e, events: { ...e.events, ...t } })),
                  setSize: (n, r, i = 0, l = 0) => {
                    let s = t().camera,
                      u = { width: n, height: r, top: i, left: l };
                    e((e) => ({
                      size: u,
                      viewport: { ...e.viewport, ...o(s, a, u) },
                    }));
                  },
                  setDpr: (t) =>
                    e((e) => {
                      let n = Y(t);
                      return {
                        viewport: {
                          ...e.viewport,
                          dpr: n,
                          initialDpr: e.viewport.initialDpr || n,
                        },
                      };
                    }),
                  setFrameloop: (n = 'always') => {
                    let r = t().clock;
                    (r.stop(),
                      (r.elapsedTime = 0),
                      'never' !== n && (r.start(), (r.elapsedTime = 0)),
                      e(() => ({ frameloop: n })));
                  },
                  previousRoot: void 0,
                  internal: {
                    interaction: [],
                    hovered: new Map(),
                    subscribers: [],
                    initialClick: [0, 0],
                    initialHits: [],
                    capturedMap: new Map(),
                    lastEvent: w.createRef(),
                    active: !1,
                    frames: 0,
                    priority: 0,
                    subscribe: (e, n, r) => {
                      let a = t().internal;
                      return (
                        (a.priority = a.priority + +(n > 0)),
                        a.subscribers.push({ ref: e, priority: n, store: r }),
                        (a.subscribers = a.subscribers.sort(
                          (e, t) => e.priority - t.priority
                        )),
                        () => {
                          let r = t().internal;
                          null != r &&
                            r.subscribers &&
                            ((r.priority = r.priority - (n > 0)),
                            (r.subscribers = r.subscribers.filter(
                              (t) => t.ref !== e
                            )));
                        }
                      );
                    },
                  },
                };
              })).getState()).size),
              (k = R.viewport.dpr),
              (P = R.camera),
              T.subscribe(() => {
                let {
                  camera: e,
                  size: t,
                  viewport: n,
                  gl: r,
                  set: a,
                } = T.getState();
                if (
                  t.width !== D.width ||
                  t.height !== D.height ||
                  n.dpr !== k
                ) {
                  ((D = t),
                    (k = n.dpr),
                    ed(e, t),
                    n.dpr > 0 && r.setPixelRatio(n.dpr));
                  let a =
                    'u' > typeof HTMLCanvasElement &&
                    r.domElement instanceof HTMLCanvasElement;
                  r.setSize(t.width, t.height, a);
                }
                e !== P &&
                  ((P = e),
                  a((t) => ({
                    viewport: {
                      ...t.viewport,
                      ...t.viewport.getCurrentViewport(e),
                    },
                  })));
              }),
              T.subscribe((e) => e3(e)),
              T)),
            (N =
              y || ej.createContainer(L, 1, null, !1, null, '', F, F, F, null)),
            a || eJ.set(e, { fiber: N, store: L }),
            (H = !1),
            (U = null),
            (en.current = {
              async configure(t = {}) {
                var a, i;
                let o;
                U = new Promise((e) => (o = e));
                let {
                    gl: l,
                    size: s,
                    scene: u,
                    events: c,
                    onCreated: d,
                    shadows: f = !1,
                    linear: p = !1,
                    flat: h = !1,
                    legacy: m = !1,
                    orthographic: g = !1,
                    frameloop: A = 'always',
                    dpr: v = [1, 2],
                    performance: B,
                    raycaster: b,
                    camera: C,
                    onPointerMissed: y,
                  } = t,
                  x = L.getState(),
                  w = x.gl;
                if (!x.gl) {
                  let t = {
                      canvas: e,
                      powerPreference: 'high-performance',
                      antialias: !0,
                      alpha: !0,
                    },
                    n = 'function' == typeof l ? await l(t) : l;
                  ((w = em(n) ? n : new E.WebGLRenderer({ ...t, ...l })),
                    x.set({ gl: w }));
                }
                let M = x.raycaster;
                M || x.set({ raycaster: (M = new S.Raycaster()) });
                let { params: F, ...T } = b || {};
                if (
                  (Z.equ(T, M, ez) || eu(M, { ...T }),
                  Z.equ(F, M.params, ez) ||
                    eu(M, { params: { ...M.params, ...F } }),
                  !x.camera || (x.camera === r && !Z.equ(r, C, ez)))
                ) {
                  r = C;
                  let e = null == C ? void 0 : C.isCamera,
                    t = e
                      ? C
                      : g
                        ? new S.OrthographicCamera(0, 0, 0, 0, 0.1, 1e3)
                        : new S.PerspectiveCamera(75, 0, 0.1, 1e3);
                  (!e &&
                    ((t.position.z = 5),
                    C &&
                      (eu(t, C),
                      !t.manual &&
                        ('aspect' in C ||
                          'left' in C ||
                          'right' in C ||
                          'bottom' in C ||
                          'top' in C) &&
                        ((t.manual = !0), t.updateProjectionMatrix())),
                    x.camera || (null != C && C.rotation) || t.lookAt(0, 0, 0)),
                    x.set({ camera: t }),
                    (M.camera = t));
                }
                if (!x.scene) {
                  let e;
                  (null != u && u.isScene
                    ? ee((e = u), L, '', {})
                    : (ee((e = new S.Scene()), L, '', {}), u && eu(e, u)),
                    x.set({ scene: e }));
                }
                c && !x.events.handlers && x.set({ events: c(L) });
                let R = (function (e, t) {
                  if (
                    !t &&
                    'u' > typeof HTMLCanvasElement &&
                    e instanceof HTMLCanvasElement &&
                    e.parentElement
                  ) {
                    let {
                      width: t,
                      height: n,
                      top: r,
                      left: a,
                    } = e.parentElement.getBoundingClientRect();
                    return { width: t, height: n, top: r, left: a };
                  }
                  return !t &&
                    'u' > typeof OffscreenCanvas &&
                    e instanceof OffscreenCanvas
                    ? { width: e.width, height: e.height, top: 0, left: 0 }
                    : { width: 0, height: 0, top: 0, left: 0, ...t };
                })(e, s);
                if (
                  (Z.equ(R, x.size, ez) ||
                    x.setSize(R.width, R.height, R.top, R.left),
                  v && x.viewport.dpr !== Y(v) && x.setDpr(v),
                  x.frameloop !== A && x.setFrameloop(A),
                  x.onPointerMissed || x.set({ onPointerMissed: y }),
                  B &&
                    !Z.equ(B, x.performance, ez) &&
                    x.set((e) => ({ performance: { ...e.performance, ...B } })),
                  !x.xr)
                ) {
                  let e = (e, t) => {
                      let n = L.getState();
                      'never' !== n.frameloop && e9(e, !0, n, t);
                    },
                    t = () => {
                      let t = L.getState();
                      ((t.gl.xr.enabled = t.gl.xr.isPresenting),
                        t.gl.xr.setAnimationLoop(
                          t.gl.xr.isPresenting ? e : null
                        ),
                        t.gl.xr.isPresenting || e3(t));
                    },
                    n = {
                      connect() {
                        let e = L.getState().gl;
                        (e.xr.addEventListener('sessionstart', t),
                          e.xr.addEventListener('sessionend', t));
                      },
                      disconnect() {
                        let e = L.getState().gl;
                        (e.xr.removeEventListener('sessionstart', t),
                          e.xr.removeEventListener('sessionend', t));
                      },
                    };
                  ('function' ==
                    typeof (null == (a = w.xr) ? void 0 : a.addEventListener) &&
                    n.connect(),
                    x.set({ xr: n }));
                }
                if (w.shadowMap) {
                  let e = w.shadowMap.enabled,
                    t = w.shadowMap.type;
                  if (((w.shadowMap.enabled = !!f), Z.boo(f)))
                    w.shadowMap.type = S.PCFSoftShadowMap;
                  else if (Z.str(f)) {
                    let e = {
                      basic: S.BasicShadowMap,
                      percentage: S.PCFShadowMap,
                      soft: S.PCFSoftShadowMap,
                      variance: S.VSMShadowMap,
                    };
                    w.shadowMap.type =
                      null != (i = e[f]) ? i : S.PCFSoftShadowMap;
                  } else Z.obj(f) && Object.assign(w.shadowMap, f);
                  (e !== w.shadowMap.enabled || t !== w.shadowMap.type) &&
                    (w.shadowMap.needsUpdate = !0);
                }
                return (
                  (S.ColorManagement.enabled = !m),
                  H ||
                    ((w.outputColorSpace = p
                      ? S.LinearSRGBColorSpace
                      : S.SRGBColorSpace),
                    (w.toneMapping = h
                      ? S.NoToneMapping
                      : S.ACESFilmicToneMapping)),
                  x.legacy !== m && x.set(() => ({ legacy: m })),
                  x.linear !== p && x.set(() => ({ linear: p })),
                  x.flat !== h && x.set(() => ({ flat: h })),
                  !l || Z.fun(l) || em(l) || Z.equ(l, w, ez) || eu(w, l),
                  (n = d),
                  (H = !0),
                  o(),
                  this
                );
              },
              render(t) {
                return (
                  H || U || this.configure(),
                  U.then(() => {
                    ej.updateContainer(
                      (0, v.jsx)(eK, {
                        store: L,
                        children: t,
                        onCreated: n,
                        rootElement: e,
                      }),
                      N,
                      null,
                      () => void 0
                    );
                  }),
                  L
                );
              },
              unmount() {
                eQ(e);
              },
            })),
            (async function () {
              (await en.current.configure({
                gl: i,
                scene: C,
                events: o,
                shadows: u,
                linear: c,
                flat: d,
                legacy: f,
                orthographic: p,
                frameloop: h,
                dpr: m,
                performance: g,
                raycaster: A,
                camera: b,
                size: _,
                onPointerMissed: (...e) =>
                  null == z.current ? void 0 : z.current(...e),
                onCreated: (e) => {
                  (null == e.events.connect ||
                    e.events.connect(
                      l
                        ? l && l.hasOwnProperty('current')
                          ? l.current
                          : l
                        : j.current
                    ),
                    s &&
                      e.setEvents({
                        compute: (e, t) => {
                          let n = e[s + 'X'],
                            r = e[s + 'Y'];
                          (t.pointer.set(
                            (n / t.size.width) * 2 - 1,
                            -(2 * (r / t.size.height)) + 1
                          ),
                            t.raycaster.setFromCamera(t.pointer, t.camera));
                        },
                      }),
                    null == x || x(e));
                },
              }),
                en.current.render(
                  (0, v.jsx)(G, {
                    children: (0, v.jsx)(W, {
                      set: et,
                      children: (0, v.jsx)(B.Suspense, {
                        fallback: (0, v.jsx)(V, { set: q }),
                        children: null != t ? t : null,
                      }),
                    }),
                  })
                ));
            })());
        }
      }),
        B.useEffect(() => {
          let e = k.current;
          if (e) return () => eQ(e);
        }, []));
      let er = l ? 'none' : 'auto';
      return (0, v.jsx)('div', {
        ref: j,
        style: {
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: er,
          ...a,
        },
        ...M,
        children: (0, v.jsx)('div', {
          ref: D,
          style: { width: '100%', height: '100%' },
          children: (0, v.jsx)('canvas', {
            ref: k,
            style: { display: 'block' },
            children: n,
          }),
        }),
      });
    }
    function tt(e) {
      return (0, v.jsx)(U, { children: (0, v.jsx)(te, { ...e }) });
    }
    function tn() {
      return (tn = Object.assign.bind()).apply(null, arguments);
    }
    var tr = S;
    let ta = parseInt(S.REVISION.replace(/\D+/g, ''));
    class ti extends tr.Mesh {
      constructor(e, t) {
        var n, r;
        const a = ((e) => e && e.isCubeTexture)(e),
          i = Math.floor(
            Math.log2(
              (null !=
              (r = a
                ? null == (n = e.image[0])
                  ? void 0
                  : n.width
                : e.image.width)
                ? r
                : 1024) / 4
            )
          ),
          o = Math.pow(2, i),
          l = 3 * Math.max(o, 112),
          s = `
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,
          u =
            [
              a ? '#define ENVMAP_TYPE_CUBE' : '',
              `#define CUBEUV_TEXEL_WIDTH ${1 / l}`,
              `#define CUBEUV_TEXEL_HEIGHT ${1 / (4 * o)}`,
              `#define CUBEUV_MAX_MIP ${i}.0`,
            ].join('\n') +
            `
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${ta >= 154 ? 'colorspace_fragment' : 'encodings_fragment'}>
        }
        `,
          c = {
            map: { value: e },
            height: { value: (null == t ? void 0 : t.height) || 15 },
            radius: { value: (null == t ? void 0 : t.radius) || 100 },
          };
        super(
          new tr.IcosahedronGeometry(1, 16),
          new tr.ShaderMaterial({
            uniforms: c,
            fragmentShader: u,
            vertexShader: s,
            side: tr.DoubleSide,
          })
        );
      }
      set radius(e) {
        this.material.uniforms.radius.value = e;
      }
      get radius() {
        return this.material.uniforms.radius.value;
      }
      set height(e) {
        this.material.uniforms.height.value = e;
      }
      get height() {
        return this.material.uniforms.height.value;
      }
    }
    var to = S;
    class tl extends to.DataTextureLoader {
      constructor(e) {
        (super(e), (this.type = to.HalfFloatType));
      }
      parse(e) {
        let t,
          n,
          r,
          a = function (e, t) {
            switch (e) {
              case 1:
                throw Error('THREE.RGBELoader: Read Error: ' + (t || ''));
              case 2:
                throw Error('THREE.RGBELoader: Write Error: ' + (t || ''));
              case 3:
                throw Error('THREE.RGBELoader: Bad File Format: ' + (t || ''));
              default:
                throw Error('THREE.RGBELoader: Memory Error: ' + (t || ''));
            }
          },
          i = function (e, t, n) {
            t = t || 1024;
            let r = e.pos,
              a = -1,
              i = 0,
              o = '',
              l = String.fromCharCode.apply(
                null,
                new Uint16Array(e.subarray(r, r + 128))
              );
            for (; 0 > (a = l.indexOf('\n')) && i < t && r < e.byteLength; )
              ((o += l),
                (i += l.length),
                (r += 128),
                (l += String.fromCharCode.apply(
                  null,
                  new Uint16Array(e.subarray(r, r + 128))
                )));
            return (
              -1 < a && (!1 !== n && (e.pos += i + a + 1), o + l.slice(0, a))
            );
          },
          o = new Uint8Array(e);
        o.pos = 0;
        let l = (function (e) {
            let t,
              n,
              r = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,
              o = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,
              l = /^\s*FORMAT=(\S+)\s*$/,
              s = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,
              u = {
                valid: 0,
                string: '',
                comments: '',
                programtype: 'RGBE',
                format: '',
                gamma: 1,
                exposure: 1,
                width: 0,
                height: 0,
              };
            for (
              (!(e.pos >= e.byteLength) && (t = i(e))) ||
                a(1, 'no header found'),
                (n = t.match(/^#\?(\S+)/)) || a(3, 'bad initial token'),
                u.valid |= 1,
                u.programtype = n[1],
                u.string += t + '\n';
              !1 !== (t = i(e));
            ) {
              if (((u.string += t + '\n'), '#' === t.charAt(0))) {
                u.comments += t + '\n';
                continue;
              }
              if (
                ((n = t.match(r)) && (u.gamma = parseFloat(n[1])),
                (n = t.match(o)) && (u.exposure = parseFloat(n[1])),
                (n = t.match(l)) && ((u.valid |= 2), (u.format = n[1])),
                (n = t.match(s)) &&
                  ((u.valid |= 4),
                  (u.height = parseInt(n[1], 10)),
                  (u.width = parseInt(n[2], 10))),
                2 & u.valid && 4 & u.valid)
              )
                break;
            }
            return (
              2 & u.valid || a(3, 'missing format specifier'),
              4 & u.valid || a(3, 'missing image size specifier'),
              u
            );
          })(o),
          s = l.width,
          u = l.height,
          c = (function (e, t, n) {
            if (t < 8 || t > 32767 || 2 !== e[0] || 2 !== e[1] || 128 & e[2])
              return new Uint8Array(e);
            t !== ((e[2] << 8) | e[3]) && a(3, 'wrong scanline width');
            let r = new Uint8Array(4 * t * n);
            r.length || a(4, 'unable to allocate buffer space');
            let i = 0,
              o = 0,
              l = 4 * t,
              s = new Uint8Array(4),
              u = new Uint8Array(l),
              c = n;
            for (; c > 0 && o < e.byteLength; ) {
              (o + 4 > e.byteLength && a(1),
                (s[0] = e[o++]),
                (s[1] = e[o++]),
                (s[2] = e[o++]),
                (s[3] = e[o++]),
                (2 != s[0] || 2 != s[1] || ((s[2] << 8) | s[3]) != t) &&
                  a(3, 'bad rgbe scanline format'));
              let n = 0,
                d;
              for (; n < l && o < e.byteLength; ) {
                let t = (d = e[o++]) > 128;
                if (
                  (t && (d -= 128),
                  (0 === d || n + d > l) && a(3, 'bad scanline data'),
                  t)
                ) {
                  let t = e[o++];
                  for (let e = 0; e < d; e++) u[n++] = t;
                } else (u.set(e.subarray(o, o + d), n), (n += d), (o += d));
              }
              for (let e = 0; e < t; e++) {
                let n = 0;
                ((r[i] = u[e + n]),
                  (n += t),
                  (r[i + 1] = u[e + n]),
                  (n += t),
                  (r[i + 2] = u[e + n]),
                  (n += t),
                  (r[i + 3] = u[e + n]),
                  (i += 4));
              }
              c--;
            }
            return r;
          })(o.subarray(o.pos), s, u);
        switch (this.type) {
          case to.FloatType:
            let d = new Float32Array(4 * (r = c.length / 4));
            for (let e = 0; e < r; e++)
              !(function (e, t, n, r) {
                let a = Math.pow(2, e[t + 3] - 128) / 255;
                ((n[r + 0] = e[t + 0] * a),
                  (n[r + 1] = e[t + 1] * a),
                  (n[r + 2] = e[t + 2] * a),
                  (n[r + 3] = 1));
              })(c, 4 * e, d, 4 * e);
            ((t = d), (n = to.FloatType));
            break;
          case to.HalfFloatType:
            let f = new Uint16Array(4 * (r = c.length / 4));
            for (let e = 0; e < r; e++)
              !(function (e, t, n, r) {
                let a = Math.pow(2, e[t + 3] - 128) / 255;
                ((n[r + 0] = to.DataUtils.toHalfFloat(
                  Math.min(e[t + 0] * a, 65504)
                )),
                  (n[r + 1] = to.DataUtils.toHalfFloat(
                    Math.min(e[t + 1] * a, 65504)
                  )),
                  (n[r + 2] = to.DataUtils.toHalfFloat(
                    Math.min(e[t + 2] * a, 65504)
                  )),
                  (n[r + 3] = to.DataUtils.toHalfFloat(1)));
              })(c, 4 * e, f, 4 * e);
            ((t = f), (n = to.HalfFloatType));
            break;
          default:
            throw Error('THREE.RGBELoader: Unsupported type: ' + this.type);
        }
        return {
          width: s,
          height: u,
          data: t,
          header: l.string,
          gamma: l.gamma,
          exposure: l.exposure,
          type: n,
        };
      }
      setDataType(e) {
        return ((this.type = e), this);
      }
      load(e, t, n, r) {
        return super.load(
          e,
          function (e, n) {
            switch (e.type) {
              case to.FloatType:
              case to.HalfFloatType:
                ('colorSpace' in e
                  ? (e.colorSpace = 'srgb-linear')
                  : (e.encoding = 3e3),
                  (e.minFilter = to.LinearFilter),
                  (e.magFilter = to.LinearFilter),
                  (e.generateMipmaps = !1),
                  (e.flipY = !0));
            }
            t && t(e, n);
          },
          n,
          r
        );
      }
    }
    var ts = S,
      tu = {},
      tc = function (e, t, n, r, a) {
        var i = new Worker(
          tu[t] ||
            (tu[t] = URL.createObjectURL(
              new Blob([e], { type: 'text/javascript' })
            ))
        );
        return (
          (i.onerror = function (e) {
            return a(e.error, null);
          }),
          (i.onmessage = function (e) {
            return a(null, e.data);
          }),
          i.postMessage(n, r),
          i
        );
      },
      td = Uint8Array,
      tf = Uint16Array,
      tp = Uint32Array,
      th = new td([
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
        5, 5, 5, 5, 0, 0, 0, 0,
      ]),
      tm = new td([
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
        10, 11, 11, 12, 12, 13, 13, 0, 0,
      ]),
      tg = new td([
        16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
      ]),
      tA = function (e, t) {
        for (var n = new tf(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
        for (var a = new tp(n[30]), r = 1; r < 30; ++r)
          for (var i = n[r]; i < n[r + 1]; ++i) a[i] = ((i - n[r]) << 5) | r;
        return [n, a];
      },
      tv = tA(th, 2),
      tB = tv[0],
      tb = tv[1];
    ((tB[28] = 258), (tb[258] = 28));
    for (
      var tC = tA(tm, 0), ty = tC[0], tx = tC[1], tw = new tf(32768), tS = 0;
      tS < 32768;
      ++tS
    ) {
      var tE = ((43690 & tS) >>> 1) | ((21845 & tS) << 1);
      ((tE =
        ((61680 & (tE = ((52428 & tE) >>> 2) | ((13107 & tE) << 2))) >>> 4) |
        ((3855 & tE) << 4)),
        (tw[tS] = (((65280 & tE) >>> 8) | ((255 & tE) << 8)) >>> 1));
    }
    for (
      var tM = function (e, t, n) {
          for (var r, a = e.length, i = 0, o = new tf(t); i < a; ++i)
            ++o[e[i] - 1];
          var l = new tf(t);
          for (i = 0; i < t; ++i) l[i] = (l[i - 1] + o[i - 1]) << 1;
          if (n) {
            r = new tf(1 << t);
            var s = 15 - t;
            for (i = 0; i < a; ++i)
              if (e[i])
                for (
                  var u = (i << 4) | e[i],
                    c = t - e[i],
                    d = l[e[i] - 1]++ << c,
                    f = d | ((1 << c) - 1);
                  d <= f;
                  ++d
                )
                  r[tw[d] >>> s] = u;
          } else
            for (i = 0, r = new tf(a); i < a; ++i)
              e[i] && (r[i] = tw[l[e[i] - 1]++] >>> (15 - e[i]));
          return r;
        },
        tF = new td(288),
        tS = 0;
      tS < 144;
      ++tS
    )
      tF[tS] = 8;
    for (var tS = 144; tS < 256; ++tS) tF[tS] = 9;
    for (var tS = 256; tS < 280; ++tS) tF[tS] = 7;
    for (var tS = 280; tS < 288; ++tS) tF[tS] = 8;
    for (var tT = new td(32), tS = 0; tS < 32; ++tS) tT[tS] = 5;
    var tR = tM(tF, 9, 0),
      tI = tM(tF, 9, 1),
      tG = tM(tT, 5, 0),
      tD = tM(tT, 5, 1),
      t_ = function (e) {
        for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
        return t;
      },
      tk = function (e, t, n) {
        var r = (t / 8) | 0;
        return ((e[r] | (e[r + 1] << 8)) >> (7 & t)) & n;
      },
      tP = function (e, t) {
        var n = (t / 8) | 0;
        return (e[n] | (e[n + 1] << 8) | (e[n + 2] << 16)) >> (7 & t);
      },
      tL = function (e) {
        return ((e / 8) | 0) + (7 & e && 1);
      },
      tN = function (e, t, n) {
        ((null == t || t < 0) && (t = 0),
          (null == n || n > e.length) && (n = e.length));
        var r = new (e instanceof tf ? tf : e instanceof tp ? tp : td)(n - t);
        return (r.set(e.subarray(t, n)), r);
      },
      tH = function (e, t, n) {
        var r = e.length;
        if (!r || (n && !n.l && r < 5)) return t || new td(0);
        var a = !t || n,
          i = !n || n.i;
        (n || (n = {}), t || (t = new td(3 * r)));
        var o = function (e) {
            var n = t.length;
            if (e > n) {
              var r = new td(Math.max(2 * n, e));
              (r.set(t), (t = r));
            }
          },
          l = n.f || 0,
          s = n.p || 0,
          u = n.b || 0,
          c = n.l,
          d = n.d,
          f = n.m,
          p = n.n,
          h = 8 * r;
        do {
          if (!c) {
            n.f = l = tk(e, s, 1);
            var m = tk(e, s + 1, 3);
            if (((s += 3), m))
              if (1 == m) ((c = tI), (d = tD), (f = 9), (p = 5));
              else if (2 == m) {
                var g = tk(e, s, 31) + 257,
                  A = tk(e, s + 10, 15) + 4,
                  v = g + tk(e, s + 5, 31) + 1;
                s += 14;
                for (var B = new td(v), b = new td(19), C = 0; C < A; ++C)
                  b[tg[C]] = tk(e, s + 3 * C, 7);
                s += 3 * A;
                for (
                  var y = t_(b), x = (1 << y) - 1, w = tM(b, y, 1), C = 0;
                  C < v;
                ) {
                  var S = w[tk(e, s, x)];
                  s += 15 & S;
                  var E = S >>> 4;
                  if (E < 16) B[C++] = E;
                  else {
                    var M = 0,
                      F = 0;
                    for (
                      16 == E
                        ? ((F = 3 + tk(e, s, 3)), (s += 2), (M = B[C - 1]))
                        : 17 == E
                          ? ((F = 3 + tk(e, s, 7)), (s += 3))
                          : 18 == E && ((F = 11 + tk(e, s, 127)), (s += 7));
                      F--;
                    )
                      B[C++] = M;
                  }
                }
                var T = B.subarray(0, g),
                  R = B.subarray(g);
                ((f = t_(T)),
                  (p = t_(R)),
                  (c = tM(T, f, 1)),
                  (d = tM(R, p, 1)));
              } else throw 'invalid block type';
            else {
              var E = tL(s) + 4,
                I = e[E - 4] | (e[E - 3] << 8),
                G = E + I;
              if (G > r) {
                if (i) throw 'unexpected EOF';
                break;
              }
              (a && o(u + I),
                t.set(e.subarray(E, G), u),
                (n.b = u += I),
                (n.p = s = 8 * G));
              continue;
            }
            if (s > h) {
              if (i) throw 'unexpected EOF';
              break;
            }
          }
          a && o(u + 131072);
          for (var D = (1 << f) - 1, _ = (1 << p) - 1, k = s; ; k = s) {
            var M = c[tP(e, s) & D],
              P = M >>> 4;
            if ((s += 15 & M) > h) {
              if (i) throw 'unexpected EOF';
              break;
            }
            if (!M) throw 'invalid length/literal';
            if (P < 256) t[u++] = P;
            else if (256 == P) {
              ((k = s), (c = null));
              break;
            } else {
              var L = P - 254;
              if (P > 264) {
                var C = P - 257,
                  N = th[C];
                ((L = tk(e, s, (1 << N) - 1) + tB[C]), (s += N));
              }
              var H = d[tP(e, s) & _],
                U = H >>> 4;
              if (!H) throw 'invalid distance';
              s += 15 & H;
              var R = ty[U];
              if (U > 3) {
                var N = tm[U];
                ((R += tP(e, s) & ((1 << N) - 1)), (s += N));
              }
              if (s > h) {
                if (i) throw 'unexpected EOF';
                break;
              }
              a && o(u + 131072);
              for (var O = u + L; u < O; u += 4)
                ((t[u] = t[u - R]),
                  (t[u + 1] = t[u + 1 - R]),
                  (t[u + 2] = t[u + 2 - R]),
                  (t[u + 3] = t[u + 3 - R]));
              u = O;
            }
          }
          ((n.l = c),
            (n.p = k),
            (n.b = u),
            c && ((l = 1), (n.m = f), (n.d = d), (n.n = p)));
        } while (!l);
        return u == t.length ? t : tN(t, 0, u);
      },
      tU = function (e, t, n) {
        n <<= 7 & t;
        var r = (t / 8) | 0;
        ((e[r] |= n), (e[r + 1] |= n >>> 8));
      },
      tO = function (e, t, n) {
        n <<= 7 & t;
        var r = (t / 8) | 0;
        ((e[r] |= n), (e[r + 1] |= n >>> 8), (e[r + 2] |= n >>> 16));
      },
      tj = function (e, t) {
        for (var n = [], r = 0; r < e.length; ++r)
          e[r] && n.push({ s: r, f: e[r] });
        var a = n.length,
          i = n.slice();
        if (!a) return [tW, 0];
        if (1 == a) {
          var o = new td(n[0].s + 1);
          return ((o[n[0].s] = 1), [o, 1]);
        }
        (n.sort(function (e, t) {
          return e.f - t.f;
        }),
          n.push({ s: -1, f: 25001 }));
        var l = n[0],
          s = n[1],
          u = 0,
          c = 1,
          d = 2;
        for (n[0] = { s: -1, f: l.f + s.f, l: l, r: s }; c != a - 1; )
          ((l = n[n[u].f < n[d].f ? u++ : d++]),
            (s = n[u != c && n[u].f < n[d].f ? u++ : d++]),
            (n[c++] = { s: -1, f: l.f + s.f, l: l, r: s }));
        for (var f = i[0].s, r = 1; r < a; ++r) i[r].s > f && (f = i[r].s);
        var p = new tf(f + 1),
          h = tJ(n[c - 1], p, 0);
        if (h > t) {
          var r = 0,
            m = 0,
            g = h - t,
            A = 1 << g;
          for (
            i.sort(function (e, t) {
              return p[t.s] - p[e.s] || e.f - t.f;
            });
            r < a;
            ++r
          ) {
            var v = i[r].s;
            if (p[v] > t) ((m += A - (1 << (h - p[v]))), (p[v] = t));
            else break;
          }
          for (m >>>= g; m > 0; ) {
            var B = i[r].s;
            p[B] < t ? (m -= 1 << (t - p[B]++ - 1)) : ++r;
          }
          for (; r >= 0 && m; --r) {
            var b = i[r].s;
            p[b] == t && (--p[b], ++m);
          }
          h = t;
        }
        return [new td(p), h];
      },
      tJ = function (e, t, n) {
        return -1 == e.s
          ? Math.max(tJ(e.l, t, n + 1), tJ(e.r, t, n + 1))
          : (t[e.s] = n);
      },
      tz = function (e) {
        for (var t = e.length; t && !e[--t]; );
        for (
          var n = new tf(++t),
            r = 0,
            a = e[0],
            i = 1,
            o = function (e) {
              n[r++] = e;
            },
            l = 1;
          l <= t;
          ++l
        )
          if (e[l] == a && l != t) ++i;
          else {
            if (!a && i > 2) {
              for (; i > 138; i -= 138) o(32754);
              i > 2 &&
                (o(i > 10 ? ((i - 11) << 5) | 28690 : ((i - 3) << 5) | 12305),
                (i = 0));
            } else if (i > 3) {
              for (o(a), --i; i > 6; i -= 6) o(8304);
              i > 2 && (o(((i - 3) << 5) | 8208), (i = 0));
            }
            for (; i--; ) o(a);
            ((i = 1), (a = e[l]));
          }
        return [n.subarray(0, r), t];
      },
      tK = function (e, t) {
        for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
        return n;
      },
      tQ = function (e, t, n) {
        var r = n.length,
          a = tL(t + 2);
        ((e[a] = 255 & r),
          (e[a + 1] = r >>> 8),
          (e[a + 2] = 255 ^ e[a]),
          (e[a + 3] = 255 ^ e[a + 1]));
        for (var i = 0; i < r; ++i) e[a + i + 4] = n[i];
        return (a + 4 + r) * 8;
      },
      tX = function (e, t, n, r, a, i, o, l, s, u, c) {
        (tU(t, c++, n), ++a[256]);
        for (
          var d,
            f,
            p,
            h,
            m = tj(a, 15),
            g = m[0],
            A = m[1],
            v = tj(i, 15),
            B = v[0],
            b = v[1],
            C = tz(g),
            y = C[0],
            x = C[1],
            w = tz(B),
            S = w[0],
            E = w[1],
            M = new tf(19),
            F = 0;
          F < y.length;
          ++F
        )
          M[31 & y[F]]++;
        for (var F = 0; F < S.length; ++F) M[31 & S[F]]++;
        for (
          var T = tj(M, 7), R = T[0], I = T[1], G = 19;
          G > 4 && !R[tg[G - 1]];
          --G
        );
        var D = (u + 5) << 3,
          _ = tK(a, tF) + tK(i, tT) + o,
          k =
            tK(a, g) +
            tK(i, B) +
            o +
            14 +
            3 * G +
            tK(M, R) +
            (2 * M[16] + 3 * M[17] + 7 * M[18]);
        if (D <= _ && D <= k) return tQ(t, c, e.subarray(s, s + u));
        if ((tU(t, c, 1 + (k < _)), (c += 2), k < _)) {
          ((d = tM(g, A, 0)), (f = g), (p = tM(B, b, 0)), (h = B));
          var P = tM(R, I, 0);
          (tU(t, c, x - 257),
            tU(t, c + 5, E - 1),
            tU(t, c + 10, G - 4),
            (c += 14));
          for (var F = 0; F < G; ++F) tU(t, c + 3 * F, R[tg[F]]);
          c += 3 * G;
          for (var L = [y, S], N = 0; N < 2; ++N)
            for (var H = L[N], F = 0; F < H.length; ++F) {
              var U = 31 & H[F];
              (tU(t, c, P[U]),
                (c += R[U]),
                U > 15 && (tU(t, c, (H[F] >>> 5) & 127), (c += H[F] >>> 12)));
            }
        } else ((d = tR), (f = tF), (p = tG), (h = tT));
        for (var F = 0; F < l; ++F)
          if (r[F] > 255) {
            var U = (r[F] >>> 18) & 31;
            (tO(t, c, d[U + 257]),
              (c += f[U + 257]),
              U > 7 && (tU(t, c, (r[F] >>> 23) & 31), (c += th[U])));
            var O = 31 & r[F];
            (tO(t, c, p[O]),
              (c += h[O]),
              O > 3 && (tO(t, c, (r[F] >>> 5) & 8191), (c += tm[O])));
          } else (tO(t, c, d[r[F]]), (c += f[r[F]]));
        return (tO(t, c, d[256]), c + f[256]);
      },
      tV = new tp([
        65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560,
        2117632,
      ]),
      tW = new td(0),
      tY = function (e, t, n, r, a, i) {
        var o = e.length,
          l = new td(r + o + 5 * (1 + Math.ceil(o / 7e3)) + a),
          s = l.subarray(r, l.length - a),
          u = 0;
        if (!t || o < 8)
          for (var c = 0; c <= o; c += 65535) {
            var d = c + 65535;
            d < o
              ? (u = tQ(s, u, e.subarray(c, d)))
              : ((s[c] = i), (u = tQ(s, u, e.subarray(c, o))));
          }
        else {
          for (
            var f = tV[t - 1],
              p = f >>> 13,
              h = 8191 & f,
              m = (1 << n) - 1,
              g = new tf(32768),
              A = new tf(m + 1),
              v = Math.ceil(n / 3),
              B = 2 * v,
              b = function (t) {
                return (e[t] ^ (e[t + 1] << v) ^ (e[t + 2] << B)) & m;
              },
              C = new tp(25e3),
              y = new tf(288),
              x = new tf(32),
              w = 0,
              S = 0,
              c = 0,
              E = 0,
              M = 0,
              F = 0;
            c < o;
            ++c
          ) {
            var T = b(c),
              R = 32767 & c,
              I = A[T];
            if (((g[R] = I), (A[T] = R), M <= c)) {
              var G = o - c;
              if ((w > 7e3 || E > 24576) && G > 423) {
                ((u = tX(e, s, 0, C, y, x, S, E, F, c - F, u)),
                  (E = w = S = 0),
                  (F = c));
                for (var D = 0; D < 286; ++D) y[D] = 0;
                for (var D = 0; D < 30; ++D) x[D] = 0;
              }
              var _ = 2,
                k = 0,
                P = h,
                L = (R - I) & 32767;
              if (G > 2 && T == b(c - L))
                for (
                  var N = Math.min(p, G) - 1,
                    H = Math.min(32767, c),
                    U = Math.min(258, G);
                  L <= H && --P && R != I;
                ) {
                  if (e[c + _] == e[c + _ - L]) {
                    for (var O = 0; O < U && e[c + O] == e[c + O - L]; ++O);
                    if (O > _) {
                      if (((_ = O), (k = L), O > N)) break;
                      for (
                        var j = Math.min(L, O - 2), J = 0, D = 0;
                        D < j;
                        ++D
                      ) {
                        var z = (c - L + D + 32768) & 32767,
                          K = g[z],
                          Q = (z - K + 32768) & 32767;
                        Q > J && ((J = Q), (I = z));
                      }
                    }
                  }
                  ((I = g[(R = I)]), (L += (R - I + 32768) & 32767));
                }
              if (k) {
                C[E++] = 0x10000000 | (tb[_] << 18) | tx[k];
                var X = 31 & tb[_],
                  V = 31 & tx[k];
                ((S += th[X] + tm[V]), ++y[257 + X], ++x[V], (M = c + _), ++w);
              } else ((C[E++] = e[c]), ++y[e[c]]);
            }
          }
          ((u = tX(e, s, i, C, y, x, S, E, F, c - F, u)),
            !i && 7 & u && (u = tQ(s, u + 1, tW)));
        }
        return tN(l, 0, r + tL(u) + a);
      },
      tq = (function () {
        for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
          for (var n = t, r = 9; --r; ) n = (1 & n && -0x12477ce0) ^ (n >>> 1);
          e[t] = n;
        }
        return e;
      })(),
      tZ = function () {
        var e = -1;
        return {
          p: function (t) {
            for (var n = e, r = 0; r < t.length; ++r)
              n = tq[(255 & n) ^ t[r]] ^ (n >>> 8);
            e = n;
          },
          d: function () {
            return ~e;
          },
        };
      },
      t$ = function () {
        var e = 1,
          t = 0;
        return {
          p: function (n) {
            for (var r = e, a = t, i = n.length, o = 0; o != i; ) {
              for (var l = Math.min(o + 2655, i); o < l; ++o) a += r += n[o];
              ((r = (65535 & r) + 15 * (r >> 16)),
                (a = (65535 & a) + 15 * (a >> 16)));
            }
            ((e = r), (t = a));
          },
          d: function () {
            return (
              (e %= 65521),
              (t %= 65521),
              ((255 & e) << 24) |
                ((e >>> 8) << 16) |
                ((255 & t) << 8) |
                (t >>> 8)
            );
          },
        };
      },
      t0 = function (e, t, n, r, a) {
        return tY(
          e,
          null == t.level ? 6 : t.level,
          null == t.mem
            ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e.length))))
            : 12 + t.mem,
          n,
          r,
          !a
        );
      },
      t1 = function (e, t) {
        var n = {};
        for (var r in e) n[r] = e[r];
        for (var r in t) n[r] = t[r];
        return n;
      },
      t2 = function (e, t, n) {
        for (
          var r = e(),
            a = e.toString(),
            i = a
              .slice(a.indexOf('[') + 1, a.lastIndexOf(']'))
              .replace(/ /g, '')
              .split(','),
            o = 0;
          o < r.length;
          ++o
        ) {
          var l = r[o],
            s = i[o];
          if ('function' == typeof l) {
            t += ';' + s + '=';
            var u = l.toString();
            if (l.prototype)
              if (-1 != u.indexOf('[native code]')) {
                var c = u.indexOf(' ', 8) + 1;
                t += u.slice(c, u.indexOf('(', c));
              } else
                for (var d in ((t += u), l.prototype))
                  t +=
                    ';' +
                    s +
                    '.prototype.' +
                    d +
                    '=' +
                    l.prototype[d].toString();
            else t += u;
          } else n[s] = l;
        }
        return [t, n];
      },
      t3 = [],
      t9 = function (e) {
        var t = [];
        for (var n in e)
          (e[n] instanceof td || e[n] instanceof tf || e[n] instanceof tp) &&
            t.push((e[n] = new e[n].constructor(e[n])).buffer);
        return t;
      },
      t8 = function (e, t, n, r) {
        if (!t3[n]) {
          for (var a, i = '', o = {}, l = e.length - 1, s = 0; s < l; ++s)
            ((i = (a = t2(e[s], i, o))[0]), (o = a[1]));
          t3[n] = t2(e[l], i, o);
        }
        var u = t1({}, t3[n][1]);
        return tc(
          t3[n][0] +
            ';onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=' +
            t.toString() +
            '}',
          n,
          u,
          t9(u),
          r
        );
      },
      t4 = function () {
        return [
          td,
          tf,
          tp,
          th,
          tm,
          tg,
          tB,
          ty,
          tI,
          tD,
          tw,
          tM,
          t_,
          tk,
          tP,
          tL,
          tN,
          tH,
          nb,
          ne,
          nt,
        ];
      },
      t6 = function () {
        return [
          td,
          tf,
          tp,
          th,
          tm,
          tg,
          tb,
          tx,
          tR,
          tF,
          tG,
          tT,
          tw,
          tV,
          tW,
          tM,
          tU,
          tO,
          tj,
          tJ,
          tz,
          tK,
          tQ,
          tX,
          tL,
          tN,
          tY,
          t0,
          nA,
          ne,
        ];
      },
      t5 = function () {
        return [nu, nc];
      },
      t7 = function () {
        return [np];
      },
      ne = function (e) {
        return postMessage(e, [e.buffer]);
      },
      nt = function (e) {
        return e && e.size && new td(e.size);
      },
      nn = function (e) {
        return (
          (e.ondata = function (e, t) {
            return postMessage([e, t], [e.buffer]);
          }),
          function (t) {
            return e.push(t.data[0], t.data[1]);
          }
        );
      },
      nr = function (e, t, n, r, a) {
        var i,
          o = t8(e, r, a, function (e, n) {
            e
              ? (o.terminate(), t.ondata.call(t, e))
              : (n[1] && o.terminate(), t.ondata.call(t, e, n[0], n[1]));
          });
        (o.postMessage(n),
          (t.push = function (e, n) {
            if (i) throw 'stream finished';
            if (!t.ondata) throw 'no stream handler';
            o.postMessage([e, (i = n)], [e.buffer]);
          }),
          (t.terminate = function () {
            o.terminate();
          }));
      },
      na = function (e, t) {
        return e[t] | (e[t + 1] << 8);
      },
      ni = function (e, t) {
        return (
          (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>> 0
        );
      },
      no = function (e, t) {
        return ni(e, t) + 0x100000000 * ni(e, t + 4);
      },
      nl = function (e, t, n) {
        for (; n; ++t) ((e[t] = n), (n >>>= 8));
      },
      ns = function (e, t) {
        var n = t.filename;
        if (
          ((e[0] = 31),
          (e[1] = 139),
          (e[2] = 8),
          (e[8] = t.level < 2 ? 4 : 2 * (9 == t.level)),
          (e[9] = 3),
          0 != t.mtime &&
            nl(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)),
          n)
        ) {
          e[3] = 8;
          for (var r = 0; r <= n.length; ++r) e[r + 10] = n.charCodeAt(r);
        }
      },
      nu = function (e) {
        if (31 != e[0] || 139 != e[1] || 8 != e[2]) throw 'invalid gzip data';
        var t = e[3],
          n = 10;
        4 & t && (n += e[10] | ((e[11] << 8) + 2));
        for (var r = ((t >> 3) & 1) + ((t >> 4) & 1); r > 0; r -= !e[n++]);
        return n + (2 & t);
      },
      nc = function (e) {
        var t = e.length;
        return (
          (e[t - 4] | (e[t - 3] << 8) | (e[t - 2] << 16) | (e[t - 1] << 24)) >>>
          0
        );
      },
      nd = function (e) {
        return 10 + ((e.filename && e.filename.length + 1) || 0);
      },
      nf = function (e, t) {
        var n = t.level,
          r = 0 == n ? 0 : n < 6 ? 1 : 9 == n ? 3 : 2;
        ((e[0] = 120), (e[1] = (r << 6) | (r ? 32 - 2 * r : 1)));
      },
      np = function (e) {
        if ((15 & e[0]) != 8 || e[0] >>> 4 > 7 || ((e[0] << 8) | e[1]) % 31)
          throw 'invalid zlib data';
        if (32 & e[1])
          throw 'invalid zlib data: preset dictionaries not supported';
      };
    function nh(e, t) {
      return (
        t || 'function' != typeof e || ((t = e), (e = {})),
        (this.ondata = t),
        e
      );
    }
    var nm = (function () {
        function e(e, t) {
          (t || 'function' != typeof e || ((t = e), (e = {})),
            (this.ondata = t),
            (this.o = e || {}));
        }
        return (
          (e.prototype.p = function (e, t) {
            this.ondata(t0(e, this.o, 0, 0, !t), t);
          }),
          (e.prototype.push = function (e, t) {
            if (this.d) throw 'stream finished';
            if (!this.ondata) throw 'no stream handler';
            ((this.d = t), this.p(e, t || !1));
          }),
          e
        );
      })(),
      ng = function (e, t) {
        nr(
          [
            t6,
            function () {
              return [nn, nm];
            },
          ],
          this,
          nh.call(this, e, t),
          function (e) {
            onmessage = nn(new nm(e.data));
          },
          6
        );
      };
    function nA(e, t) {
      return t0(e, t || {}, 0, 0);
    }
    var nv = (function () {
        function e(e) {
          ((this.s = {}), (this.p = new td(0)), (this.ondata = e));
        }
        return (
          (e.prototype.e = function (e) {
            if (this.d) throw 'stream finished';
            if (!this.ondata) throw 'no stream handler';
            var t = this.p.length,
              n = new td(t + e.length);
            (n.set(this.p), n.set(e, t), (this.p = n));
          }),
          (e.prototype.c = function (e) {
            this.d = this.s.i = e || !1;
            var t = this.s.b,
              n = tH(this.p, this.o, this.s);
            (this.ondata(tN(n, t, this.s.b), this.d),
              (this.o = tN(n, this.s.b - 32768)),
              (this.s.b = this.o.length),
              (this.p = tN(this.p, (this.s.p / 8) | 0)),
              (this.s.p &= 7));
          }),
          (e.prototype.push = function (e, t) {
            (this.e(e), this.c(t));
          }),
          e
        );
      })(),
      nB = function (e) {
        ((this.ondata = e),
          nr(
            [
              t4,
              function () {
                return [nn, nv];
              },
            ],
            this,
            0,
            function () {
              onmessage = nn(new nv());
            },
            7
          ));
      };
    function nb(e, t) {
      return tH(e, t);
    }
    (function () {
      function e(e, t) {
        ((this.c = tZ()), (this.l = 0), (this.v = 1), nm.call(this, e, t));
      }
      ((e.prototype.push = function (e, t) {
        nm.prototype.push.call(this, e, t);
      }),
        (e.prototype.p = function (e, t) {
          (this.c.p(e), (this.l += e.length));
          var n = t0(e, this.o, this.v && nd(this.o), t && 8, !t);
          (this.v && (ns(n, this.o), (this.v = 0)),
            t && (nl(n, n.length - 8, this.c.d()), nl(n, n.length - 4, this.l)),
            this.ondata(n, t));
        }));
    })();
    var nC = (function () {
        function e(e) {
          ((this.v = 1), nv.call(this, e));
        }
        return (
          (e.prototype.push = function (e, t) {
            if ((nv.prototype.e.call(this, e), this.v)) {
              var n = this.p.length > 3 ? nu(this.p) : 4;
              if (n >= this.p.length && !t) return;
              ((this.p = this.p.subarray(n)), (this.v = 0));
            }
            if (t) {
              if (this.p.length < 8) throw 'invalid gzip stream';
              this.p = this.p.subarray(0, -8);
            }
            nv.prototype.c.call(this, t);
          }),
          e
        );
      })(),
      ny = function (e) {
        ((this.ondata = e),
          nr(
            [
              t4,
              t5,
              function () {
                return [nn, nv, nC];
              },
            ],
            this,
            0,
            function () {
              onmessage = nn(new nC());
            },
            9
          ));
      },
      nx =
        ((function () {
          function e(e, t) {
            ((this.c = t$()), (this.v = 1), nm.call(this, e, t));
          }
          ((e.prototype.push = function (e, t) {
            nm.prototype.push.call(this, e, t);
          }),
            (e.prototype.p = function (e, t) {
              this.c.p(e);
              var n = t0(e, this.o, this.v && 2, t && 4, !t);
              (this.v && (nf(n, this.o), (this.v = 0)),
                t && nl(n, n.length - 4, this.c.d()),
                this.ondata(n, t));
            }));
        })(),
        (function () {
          function e(e) {
            ((this.v = 1), nv.call(this, e));
          }
          return (
            (e.prototype.push = function (e, t) {
              if ((nv.prototype.e.call(this, e), this.v)) {
                if (this.p.length < 2 && !t) return;
                ((this.p = this.p.subarray(2)), (this.v = 0));
              }
              if (t) {
                if (this.p.length < 4) throw 'invalid zlib stream';
                this.p = this.p.subarray(0, -4);
              }
              nv.prototype.c.call(this, t);
            }),
            e
          );
        })()),
      nw = function (e) {
        ((this.ondata = e),
          nr(
            [
              t4,
              t7,
              function () {
                return [nn, nv, nx];
              },
            ],
            this,
            0,
            function () {
              onmessage = nn(new nx());
            },
            11
          ));
      };
    function nS(e, t) {
      return tH((np(e), e.subarray(2, -4)), t);
    }
    var nE = (function () {
      function e(e) {
        ((this.G = nC), (this.I = nv), (this.Z = nx), (this.ondata = e));
      }
      return (
        (e.prototype.push = function (e, t) {
          if (!this.ondata) throw 'no stream handler';
          if (this.s) this.s.push(e, t);
          else {
            if (this.p && this.p.length) {
              var n = new td(this.p.length + e.length);
              (n.set(this.p), n.set(e, this.p.length));
            } else this.p = e;
            if (this.p.length > 2) {
              var r = this,
                a = function () {
                  r.ondata.apply(r, arguments);
                };
              ((this.s =
                31 == this.p[0] && 139 == this.p[1] && 8 == this.p[2]
                  ? new this.G(a)
                  : (15 & this.p[0]) != 8 ||
                      this.p[0] >> 4 > 7 ||
                      ((this.p[0] << 8) | this.p[1]) % 31
                    ? new this.I(a)
                    : new this.Z(a)),
                this.s.push(this.p, t),
                (this.p = null));
            }
          }
        }),
        e
      );
    })();
    (function (e) {
      ((this.G = ny), (this.I = nB), (this.Z = nw), (this.ondata = e));
    }).prototype.push = function (e, t) {
      nE.prototype.push.call(this, e, t);
    };
    var nM = 'u' > typeof TextEncoder && new TextEncoder(),
      nF = 'u' > typeof TextDecoder && new TextDecoder(),
      nT = 0;
    try {
      (nF.decode(tW, { stream: !0 }), (nT = 1));
    } catch (e) {}
    var nR = function (e) {
      for (var t = '', n = 0; ; ) {
        var r = e[n++],
          a = (r > 127) + (r > 223) + (r > 239);
        if (n + a > e.length) return [t, tN(e, n - 1)];
        a
          ? 3 == a
            ? (t += String.fromCharCode(
                55296 |
                  ((r =
                    (((15 & r) << 18) |
                      ((63 & e[n++]) << 12) |
                      ((63 & e[n++]) << 6) |
                      (63 & e[n++])) -
                    65536) >>
                    10),
                56320 | (1023 & r)
              ))
            : 1 & a
              ? (t += String.fromCharCode(((31 & r) << 6) | (63 & e[n++])))
              : (t += String.fromCharCode(
                  ((15 & r) << 12) | ((63 & e[n++]) << 6) | (63 & e[n++])
                ))
          : (t += String.fromCharCode(r));
      }
    };
    function nI(e, t) {
      if (t) {
        for (var n = new td(e.length), r = 0; r < e.length; ++r)
          n[r] = e.charCodeAt(r);
        return n;
      }
      if (nM) return nM.encode(e);
      for (
        var a = e.length,
          i = new td(e.length + (e.length >> 1)),
          o = 0,
          l = function (e) {
            i[o++] = e;
          },
          r = 0;
        r < a;
        ++r
      ) {
        if (o + 5 > i.length) {
          var s = new td(o + 8 + ((a - r) << 1));
          (s.set(i), (i = s));
        }
        var u = e.charCodeAt(r);
        u < 128 || t
          ? l(u)
          : (u < 2048
              ? l(192 | (u >> 6))
              : (u > 55295 && u < 57344
                  ? (l(
                      240 |
                        ((u =
                          (65536 + (1047552 & u)) |
                          (1023 & e.charCodeAt(++r))) >>
                          18)
                    ),
                    l(128 | ((u >> 12) & 63)))
                  : l(224 | (u >> 12)),
                l(128 | ((u >> 6) & 63))),
            l(128 | (63 & u)));
      }
      return tN(i, 0, o);
    }
    (((function (e) {
      ((this.ondata = e), nT ? (this.t = new TextDecoder()) : (this.p = tW));
    }).prototype.push = function (e, t) {
      if (!this.ondata) throw 'no callback';
      if (((t = !!t), this.t)) {
        if ((this.ondata(this.t.decode(e, { stream: !0 }), t), t)) {
          if (this.t.decode().length) throw 'invalid utf-8 data';
          this.t = null;
        }
        return;
      }
      if (!this.p) throw 'stream finished';
      var n = new td(this.p.length + e.length);
      (n.set(this.p), n.set(e, this.p.length));
      var r = nR(n),
        a = r[0],
        i = r[1];
      if (t) {
        if (i.length) throw 'invalid utf-8 data';
        this.p = null;
      } else this.p = i;
      this.ondata(a, t);
    }),
      (function (e) {
        this.ondata = e;
      }.prototype.push = function (e, t) {
        if (!this.ondata) throw 'no callback';
        if (this.d) throw 'stream finished';
        this.ondata(nI(e), (this.d = t || !1));
      }));
    var nG = function (e) {
        return 1 == e ? 3 : e < 6 ? 2 : +(9 == e);
      },
      nD = function (e, t) {
        for (; 1 != na(e, t); t += 4 + na(e, t + 2));
        return [no(e, t + 12), no(e, t + 4), no(e, t + 20)];
      },
      n_ = function (e) {
        var t = 0;
        if (e)
          for (var n in e) {
            var r = e[n].length;
            if (r > 65535) throw 'extra field too long';
            t += r + 4;
          }
        return t;
      },
      nk = function (e, t, n, r, a, i, o, l) {
        var s = r.length,
          u = n.extra,
          c = l && l.length,
          d = n_(u);
        (nl(e, t, null != o ? 0x2014b50 : 0x4034b50),
          (t += 4),
          null != o && ((e[t++] = 20), (e[t++] = n.os)),
          (e[t] = 20),
          (t += 2),
          (e[t++] = (n.flag << 1) | (null == i && 8)),
          (e[t++] = a && 8),
          (e[t++] = 255 & n.compression),
          (e[t++] = n.compression >> 8));
        var f = new Date(null == n.mtime ? Date.now() : n.mtime),
          p = f.getFullYear() - 1980;
        if (p < 0 || p > 119) throw 'date not in range 1980-2099';
        if (
          (nl(
            e,
            t,
            (p << 25) |
              ((f.getMonth() + 1) << 21) |
              (f.getDate() << 16) |
              (f.getHours() << 11) |
              (f.getMinutes() << 5) |
              (f.getSeconds() >>> 1)
          ),
          (t += 4),
          null != i && (nl(e, t, n.crc), nl(e, t + 4, i), nl(e, t + 8, n.size)),
          nl(e, t + 12, s),
          nl(e, t + 14, d),
          (t += 16),
          null != o &&
            (nl(e, t, c), nl(e, t + 6, n.attrs), nl(e, t + 10, o), (t += 14)),
          e.set(r, t),
          (t += s),
          d)
        )
          for (var h in u) {
            var m = u[h],
              g = m.length;
            (nl(e, t, +h), nl(e, t + 2, g), e.set(m, t + 4), (t += 4 + g));
          }
        return (c && (e.set(l, t), (t += c)), t);
      },
      nP = function (e, t, n, r, a) {
        (nl(e, t, 0x6054b50),
          nl(e, t + 8, n),
          nl(e, t + 10, n),
          nl(e, t + 12, r),
          nl(e, t + 16, a));
      },
      nL = (function () {
        function e(e) {
          ((this.filename = e),
            (this.c = tZ()),
            (this.size = 0),
            (this.compression = 0));
        }
        return (
          (e.prototype.process = function (e, t) {
            this.ondata(null, e, t);
          }),
          (e.prototype.push = function (e, t) {
            if (!this.ondata)
              throw 'no callback - add to ZIP archive before pushing';
            (this.c.p(e),
              (this.size += e.length),
              t && (this.crc = this.c.d()),
              this.process(e, t || !1));
          }),
          e
        );
      })();
    function nN(e, t) {
      var n = this;
      (t || (t = {}),
        nL.call(this, e),
        (this.d = new nm(t, function (e, t) {
          n.ondata(null, e, t);
        })),
        (this.compression = 8),
        (this.flag = nG(t.level)));
    }
    function nH(e, t) {
      var n = this;
      (t || (t = {}),
        nL.call(this, e),
        (this.d = new ng(t, function (e, t, r) {
          n.ondata(e, t, r);
        })),
        (this.compression = 8),
        (this.flag = nG(t.level)),
        (this.terminate = this.d.terminate));
    }
    function nU(e) {
      ((this.ondata = e), (this.u = []), (this.d = 1));
    }
    ((nN.prototype.process = function (e, t) {
      try {
        this.d.push(e, t);
      } catch (e) {
        this.ondata(e, null, t);
      }
    }),
      (nN.prototype.push = function (e, t) {
        nL.prototype.push.call(this, e, t);
      }),
      (nH.prototype.process = function (e, t) {
        this.d.push(e, t);
      }),
      (nH.prototype.push = function (e, t) {
        nL.prototype.push.call(this, e, t);
      }),
      (nU.prototype.add = function (e) {
        var t = this;
        if (2 & this.d) throw 'stream finished';
        var n = nI(e.filename),
          r = n.length,
          a = e.comment,
          i = a && nI(a),
          o = r != e.filename.length || (i && a.length != i.length),
          l = r + n_(e.extra) + 30;
        if (r > 65535) throw 'filename too long';
        var s = new td(l);
        nk(s, 0, e, n, o);
        var u = [s],
          c = function () {
            for (var e = 0, n = u; e < n.length; e++) {
              var r = n[e];
              t.ondata(null, r, !1);
            }
            u = [];
          },
          d = this.d;
        this.d = 0;
        var f = this.u.length,
          p = t1(e, {
            f: n,
            u: o,
            o: i,
            t: function () {
              e.terminate && e.terminate();
            },
            r: function () {
              if ((c(), d)) {
                var e = t.u[f + 1];
                e ? e.r() : (t.d = 1);
              }
              d = 1;
            },
          }),
          h = 0;
        ((e.ondata = function (n, r, a) {
          if (n) (t.ondata(n, r, a), t.terminate());
          else if (((h += r.length), u.push(r), a)) {
            var i = new td(16);
            (nl(i, 0, 0x8074b50),
              nl(i, 4, e.crc),
              nl(i, 8, h),
              nl(i, 12, e.size),
              u.push(i),
              (p.c = h),
              (p.b = l + h + 16),
              (p.crc = e.crc),
              (p.size = e.size),
              d && p.r(),
              (d = 1));
          } else d && c();
        }),
          this.u.push(p));
      }),
      (nU.prototype.end = function () {
        var e = this;
        if (2 & this.d) {
          if (1 & this.d) throw 'stream finishing';
          throw 'stream finished';
        }
        (this.d
          ? this.e()
          : this.u.push({
              r: function () {
                1 & e.d && (e.u.splice(-1, 1), e.e());
              },
              t: function () {},
            }),
          (this.d = 3));
      }),
      (nU.prototype.e = function () {
        for (var e = 0, t = 0, n = 0, r = 0, a = this.u; r < a.length; r++) {
          var i = a[r];
          n += 46 + i.f.length + n_(i.extra) + (i.o ? i.o.length : 0);
        }
        for (var o = new td(n + 22), l = 0, s = this.u; l < s.length; l++) {
          var i = s[l];
          (nk(o, e, i, i.f, i.u, i.c, t, i.o),
            (e += 46 + i.f.length + n_(i.extra) + (i.o ? i.o.length : 0)),
            (t += i.b));
        }
        (nP(o, e, this.u.length, n, t), this.ondata(null, o, !0), (this.d = 2));
      }),
      (nU.prototype.terminate = function () {
        for (var e = 0, t = this.u; e < t.length; e++) t[e].t();
        this.d = 2;
      }));
    var nO = (function () {
      function e() {}
      return (
        (e.prototype.push = function (e, t) {
          this.ondata(null, e, t);
        }),
        (e.compression = 0),
        e
      );
    })();
    function nj() {
      var e = this;
      this.i = new nv(function (t, n) {
        e.ondata(null, t, n);
      });
    }
    function nJ(e, t) {
      var n = this;
      t < 32e4
        ? (this.i = new nv(function (e, t) {
            n.ondata(null, e, t);
          }))
        : ((this.i = new nB(function (e, t, r) {
            n.ondata(e, t, r);
          })),
          (this.terminate = this.i.terminate));
    }
    function nz(e) {
      ((this.onfile = e), (this.k = []), (this.o = { 0: nO }), (this.p = tW));
    }
    ((nj.prototype.push = function (e, t) {
      try {
        this.i.push(e, t);
      } catch (n) {
        this.ondata(n, e, t);
      }
    }),
      (nj.compression = 8),
      (nJ.prototype.push = function (e, t) {
        (this.i.terminate && (e = tN(e, 0)), this.i.push(e, t));
      }),
      (nJ.compression = 8),
      (nz.prototype.push = function (e, t) {
        var n = this;
        if (!this.onfile) throw 'no callback';
        if (!this.p) throw 'stream finished';
        if (this.c > 0) {
          var r = Math.min(this.c, e.length),
            a = e.subarray(0, r);
          if (
            ((this.c -= r),
            this.d ? this.d.push(a, !this.c) : this.k[0].push(a),
            (e = e.subarray(r)).length)
          )
            return this.push(e, t);
        } else {
          var i = 0,
            o = 0,
            l = void 0,
            s = void 0;
          this.p.length
            ? e.length
              ? ((s = new td(this.p.length + e.length)).set(this.p),
                s.set(e, this.p.length))
              : (s = this.p)
            : (s = e);
          for (
            var u = s.length, c = this.c, d = c && this.d, f = this;
            o < u - 4 &&
            'break' !==
              (function () {
                var e = ni(s, o);
                if (0x4034b50 == e) {
                  ((i = 1), (l = o), (f.d = null), (f.c = 0));
                  var t = na(s, o + 6),
                    r = na(s, o + 8),
                    a = 8 & t,
                    d = na(s, o + 26),
                    p = na(s, o + 28);
                  if (u > o + 30 + d + p) {
                    var h,
                      m,
                      g = [];
                    (f.k.unshift(g), (i = 2));
                    var A = ni(s, o + 18),
                      v = ni(s, o + 22),
                      B = (function (e, t) {
                        if (t) {
                          for (var n = '', r = 0; r < e.length; r += 16384)
                            n += String.fromCharCode.apply(
                              null,
                              e.subarray(r, r + 16384)
                            );
                          return n;
                        }
                        if (nF) return nF.decode(e);
                        var a = nR(e),
                          i = a[0];
                        if (a[1].length) throw 'invalid utf-8 data';
                        return i;
                      })(s.subarray(o + 30, (o += 30 + d)), !(2048 & t));
                    (0xffffffff == A
                      ? ((A = (h = a ? [-2] : nD(s, o))[0]), (v = h[1]))
                      : a && (A = -1),
                      (o += p),
                      (f.c = A));
                    var b = {
                      name: B,
                      compression: r,
                      start: function () {
                        if (!b.ondata) throw 'no callback';
                        if (A) {
                          var e = n.o[r];
                          if (!e) throw 'unknown compression type ' + r;
                          (m = A < 0 ? new e(B) : new e(B, A, v)).ondata =
                            function (e, t, n) {
                              b.ondata(e, t, n);
                            };
                          for (var t = 0; t < g.length; t++) {
                            var a = g[t];
                            m.push(a, !1);
                          }
                          n.k[0] == g && n.c ? (n.d = m) : m.push(tW, !0);
                        } else b.ondata(null, tW, !0);
                      },
                      terminate: function () {
                        m && m.terminate && m.terminate();
                      },
                    };
                    (A >= 0 && ((b.size = A), (b.originalSize = v)),
                      f.onfile(b));
                  }
                  return 'break';
                }
                if (c) {
                  if (0x8074b50 == e)
                    return (
                      (l = o += 12 + (-2 == c && 8)),
                      (i = 3),
                      (f.c = 0),
                      'break'
                    );
                  else if (0x2014b50 == e)
                    return ((l = o -= 4), (i = 3), (f.c = 0), 'break');
                }
              })();
            ++o
          );
          if (((this.p = tW), c < 0)) {
            var p = i
              ? s.subarray(
                  0,
                  l - 12 - (-2 == c && 8) - (0x8074b50 == ni(s, l - 16) && 4)
                )
              : s.subarray(0, o);
            d ? d.push(p, !!i) : this.k[+(2 == i)].push(p);
          }
          if (2 & i) return this.push(s.subarray(o), t);
          this.p = s.subarray(o);
        }
        if (t) {
          if (this.c) throw 'invalid zip file';
          this.p = null;
        }
      }),
      (nz.prototype.register = function (e) {
        this.o[e.compression] = e;
      }));
    let nK = ta >= 152;
    class nQ extends ts.DataTextureLoader {
      constructor(e) {
        (super(e), (this.type = ts.HalfFloatType));
      }
      parse(e) {
        let t = { l: 0, c: 0, lc: 0 };
        function n(e, n, r, a, i) {
          for (; r < e; ) ((n = (n << 8) | S(a, i)), (r += 8));
          ((t.l = (n >> (r -= e)) & ((1 << e) - 1)), (t.c = n), (t.lc = r));
        }
        let r = Array(59),
          a = { c: 0, lc: 0 };
        function i(e, t, n, r) {
          ((e = (e << 8) | S(n, r)), (t += 8), (a.c = e), (a.lc = t));
        }
        let o = { c: 0, lc: 0 };
        function l(e, t, n, r, l, s, u, c, d, f) {
          if (e == t) {
            r < 8 && (i(n, r, l, u), (n = a.c), (r = a.lc));
            var p = n >> (r -= 8),
              p = new Uint8Array([p])[0];
            if (d.value + p > f) return !1;
            for (var h = c[d.value - 1]; p-- > 0; ) c[d.value++] = h;
          } else {
            if (!(d.value < f)) return !1;
            c[d.value++] = e;
          }
          ((o.c = n), (o.lc = r));
        }
        function s(e) {
          var t = 65535 & e;
          return t > 32767 ? t - 65536 : t;
        }
        let u = { a: 0, b: 0 };
        function c(e, t) {
          var n = s(e),
            r = s(t),
            a = n + (1 & r) + (r >> 1),
            i = a - r;
          ((u.a = a), (u.b = i));
        }
        function d(e, t) {
          var n = 65535 & t,
            r = ((65535 & e) - (n >> 1)) & 65535;
          ((u.a = (n + r - 32768) & 65535), (u.b = r));
        }
        function f(e, s, u, c, d, f) {
          var p = u.value,
            h = w(s, u),
            m = w(s, u);
          u.value += 4;
          var g = w(s, u);
          if (((u.value += 4), h < 0 || h >= 65537 || m < 0 || m >= 65537))
            throw 'Something wrong with HUF_ENCSIZE';
          for (var A = Array(65537), v = Array(16384), B = 0; B < 16384; B++)
            ((v[B] = {}), (v[B].len = 0), (v[B].lit = 0), (v[B].p = null));
          var b = c - (u.value - p);
          if (
            (!(function (e, a, i, o, l, s, u) {
              for (var c = 0, d = 0; l <= s; l++) {
                if (i.value - i.value > o) return !1;
                n(6, c, d, e, i);
                var f = t.l;
                if (((c = t.c), (d = t.lc), (u[l] = f), 63 == f)) {
                  if (i.value - i.value > o)
                    throw 'Something wrong with hufUnpackEncTable';
                  n(8, c, d, e, i);
                  var p = t.l + 6;
                  if (((c = t.c), (d = t.lc), l + p > s + 1))
                    throw 'Something wrong with hufUnpackEncTable';
                  for (; p--; ) u[l++] = 0;
                  l--;
                } else if (f >= 59) {
                  var p = f - 59 + 2;
                  if (l + p > s + 1)
                    throw 'Something wrong with hufUnpackEncTable';
                  for (; p--; ) u[l++] = 0;
                  l--;
                }
              }
              !(function (e) {
                for (var t = 0; t <= 58; ++t) r[t] = 0;
                for (var t = 0; t < 65537; ++t) r[e[t]] += 1;
                for (var n = 0, t = 58; t > 0; --t) {
                  var a = (n + r[t]) >> 1;
                  ((r[t] = n), (n = a));
                }
                for (var t = 0; t < 65537; ++t) {
                  var i = e[t];
                  i > 0 && (e[t] = i | (r[i]++ << 6));
                }
              })(u);
            })(e, 0, u, b, h, m, A),
            g > 8 * (c - (u.value - p)))
          )
            throw 'Something wrong with hufUncompress';
          (!(function (e, t, n, r) {
            for (; t <= n; t++) {
              var a = e[t] >> 6,
                i = 63 & e[t];
              if (a >> i) throw 'Invalid table entry';
              if (i > 14) {
                var o = r[a >> (i - 14)];
                if (o.len) throw 'Invalid table entry';
                if ((o.lit++, o.p)) {
                  var l = o.p;
                  o.p = Array(o.lit);
                  for (var s = 0; s < o.lit - 1; ++s) o.p[s] = l[s];
                } else o.p = [,];
                o.p[o.lit - 1] = t;
              } else if (i)
                for (var u = 0, s = 1 << (14 - i); s > 0; s--) {
                  var o = r[(a << (14 - i)) + u];
                  if (o.len || o.p) throw 'Invalid table entry';
                  ((o.len = i), (o.lit = t), u++);
                }
            }
          })(A, h, m, v),
            (function (e, t, n, r, s, u, c, d, f, p) {
              for (
                var h = 0, m = 0, g = Math.trunc(s.value + (u + 7) / 8);
                s.value < g;
              )
                for (i(h, m, n, s), h = a.c, m = a.lc; m >= 14; ) {
                  var A = t[(h >> (m - 14)) & 16383];
                  if (A.len)
                    ((m -= A.len),
                      l(A.lit, c, h, m, n, r, s, f, p, d),
                      (h = o.c),
                      (m = o.lc));
                  else {
                    if (!A.p) throw 'hufDecode issues';
                    for (v = 0; v < A.lit; v++) {
                      for (var v, B = 63 & e[A.p[v]]; m < B && s.value < g; )
                        (i(h, m, n, s), (h = a.c), (m = a.lc));
                      if (
                        m >= B &&
                        e[A.p[v]] >> 6 == ((h >> (m - B)) & ((1 << B) - 1))
                      ) {
                        ((m -= B),
                          l(A.p[v], c, h, m, n, r, s, f, p, d),
                          (h = o.c),
                          (m = o.lc));
                        break;
                      }
                    }
                    if (v == A.lit) throw 'hufDecode issues';
                  }
                }
              var b = (8 - u) & 7;
              for (h >>= b, m -= b; m > 0; ) {
                var A = t[(h << (14 - m)) & 16383];
                if (A.len)
                  ((m -= A.len),
                    l(A.lit, c, h, m, n, r, s, f, p, d),
                    (h = o.c),
                    (m = o.lc));
                else throw 'hufDecode issues';
              }
            })(A, v, e, s, u, g, m, f, d, { value: 0 }));
        }
        function p(e) {
          for (var t = 1; t < e.length; t++) {
            var n = e[t - 1] + e[t] - 128;
            e[t] = n;
          }
        }
        function h(e, t) {
          for (
            var n = 0,
              r = Math.floor((e.length + 1) / 2),
              a = 0,
              i = e.length - 1;
            !(a > i) && ((t[a++] = e[n++]), !(a > i));
          ) {
            t[a++] = e[r++];
          }
        }
        function m(e) {
          for (
            var t = e.byteLength, n = [], r = 0, a = new DataView(e);
            t > 0;
          ) {
            var i = a.getInt8(r++);
            if (i < 0) {
              var o = -i;
              t -= o + 1;
              for (var l = 0; l < o; l++) n.push(a.getUint8(r++));
            } else {
              var o = i;
              t -= 2;
              for (var s = a.getUint8(r++), l = 0; l < o + 1; l++) n.push(s);
            }
          }
          return n;
        }
        function g(e) {
          return new DataView(e.array.buffer, e.offset.value, e.size);
        }
        function A(e) {
          var t = new Uint8Array(
              m(e.viewer.buffer.slice(e.offset.value, e.offset.value + e.size))
            ),
            n = new Uint8Array(t.length);
          return (p(t), h(t, n), new DataView(n.buffer));
        }
        function v(e) {
          var t = nS(e.array.slice(e.offset.value, e.offset.value + e.size)),
            n = new Uint8Array(t.length);
          return (p(t), h(t, n), new DataView(n.buffer));
        }
        function B(e) {
          for (
            var t = e.viewer,
              n = { value: e.offset.value },
              r = new Uint16Array(
                e.width * e.scanlineBlockSize * (e.channels * e.type)
              ),
              a = new Uint8Array(8192),
              i = 0,
              o = Array(e.channels),
              l = 0;
            l < e.channels;
            l++
          )
            ((o[l] = {}),
              (o[l].start = i),
              (o[l].end = o[l].start),
              (o[l].nx = e.width),
              (o[l].ny = e.lines),
              (o[l].size = e.type),
              (i += o[l].nx * o[l].ny * o[l].size));
          var s = I(t, n),
            p = I(t, n);
          if (p >= 8192)
            throw 'Something is wrong with PIZ_COMPRESSION BITMAP_SIZE';
          if (s <= p) for (var l = 0; l < p - s + 1; l++) a[l + s] = E(t, n);
          var h = new Uint16Array(65536),
            m = (function (e, t) {
              for (var n = 0, r = 0; r < 65536; ++r)
                (0 == r || e[r >> 3] & (1 << (7 & r))) && (t[n++] = r);
              for (var a = n - 1; n < 65536; ) t[n++] = 0;
              return a;
            })(a, h),
            g = w(t, n);
          f(e.array, t, n, g, r, i);
          for (var l = 0; l < e.channels; ++l)
            for (var A = o[l], v = 0; v < o[l].size; ++v)
              !(function (e, t, n, r, a, i, o) {
                for (var l = o < 16384, s = n > a ? a : n, f = 1; f <= s; )
                  f <<= 1;
                for (f >>= 1, p = f, f >>= 1; f >= 1; ) {
                  for (
                    var p,
                      h,
                      m,
                      g,
                      A,
                      v = 0,
                      B = 0 + i * (a - p),
                      b = i * f,
                      C = i * p,
                      y = r * f,
                      x = r * p;
                    v <= B;
                    v += C
                  ) {
                    for (var w = v, S = v + r * (n - p); w <= S; w += x) {
                      var E = w + y,
                        M = w + b,
                        F = M + y;
                      (l
                        ? (c(e[w + t], e[M + t]),
                          (h = u.a),
                          (g = u.b),
                          c(e[E + t], e[F + t]),
                          (m = u.a),
                          (A = u.b),
                          c(h, m),
                          (e[w + t] = u.a),
                          (e[E + t] = u.b),
                          c(g, A))
                        : (d(e[w + t], e[M + t]),
                          (h = u.a),
                          (g = u.b),
                          d(e[E + t], e[F + t]),
                          (m = u.a),
                          (A = u.b),
                          d(h, m),
                          (e[w + t] = u.a),
                          (e[E + t] = u.b),
                          d(g, A)),
                        (e[M + t] = u.a),
                        (e[F + t] = u.b));
                    }
                    if (n & f) {
                      var M = w + b;
                      (l ? c(e[w + t], e[M + t]) : d(e[w + t], e[M + t]),
                        (h = u.a),
                        (e[M + t] = u.b),
                        (e[w + t] = h));
                    }
                  }
                  if (a & f)
                    for (var w = v, S = v + r * (n - p); w <= S; w += x) {
                      var E = w + y;
                      (l ? c(e[w + t], e[E + t]) : d(e[w + t], e[E + t]),
                        (h = u.a),
                        (e[E + t] = u.b),
                        (e[w + t] = h));
                    }
                  ((p = f), (f >>= 1));
                }
              })(r, A.start + v, A.nx, A.size, A.ny, A.nx * A.size, m);
          for (var B = i, b = 0; b < B; ++b) r[b] = h[r[b]];
          for (
            var C = 0, y = new Uint8Array(r.buffer.byteLength), x = 0;
            x < e.lines;
            x++
          )
            for (var S = 0; S < e.channels; S++) {
              var A = o[S],
                M = A.nx * A.size,
                F = new Uint8Array(r.buffer, 2 * A.end, 2 * M);
              (y.set(F, C), (C += 2 * M), (A.end += M));
            }
          return new DataView(y.buffer);
        }
        function b(e) {
          var t = nS(e.array.slice(e.offset.value, e.offset.value + e.size));
          let n = e.lines * e.channels * e.width,
            r = 1 == e.type ? new Uint16Array(n) : new Uint32Array(n),
            a = 0,
            i = 0,
            o = [, , , ,];
          for (let n = 0; n < e.lines; n++)
            for (let n = 0; n < e.channels; n++) {
              let n = 0;
              switch (e.type) {
                case 1:
                  ((o[0] = a), (o[1] = o[0] + e.width), (a = o[1] + e.width));
                  for (let a = 0; a < e.width; ++a)
                    ((n += (t[o[0]++] << 8) | t[o[1]++]), (r[i] = n), i++);
                  break;
                case 2:
                  ((o[0] = a),
                    (o[1] = o[0] + e.width),
                    (o[2] = o[1] + e.width),
                    (a = o[2] + e.width));
                  for (let a = 0; a < e.width; ++a)
                    ((n +=
                      (t[o[0]++] << 24) | (t[o[1]++] << 16) | (t[o[2]++] << 8)),
                      (r[i] = n),
                      i++);
              }
            }
          return new DataView(r.buffer);
        }
        function C(e) {
          var t = e.viewer,
            n = { value: e.offset.value },
            r = new Uint8Array(e.width * e.lines * (e.channels * e.type * 2)),
            a = {
              version: M(t, n),
              unknownUncompressedSize: M(t, n),
              unknownCompressedSize: M(t, n),
              acCompressedSize: M(t, n),
              dcCompressedSize: M(t, n),
              rleCompressedSize: M(t, n),
              rleUncompressedSize: M(t, n),
              rleRawSize: M(t, n),
              totalAcUncompressedCount: M(t, n),
              totalDcUncompressedCount: M(t, n),
              acCompression: M(t, n),
            };
          if (a.version < 2)
            throw (
              'EXRLoader.parse: ' +
              P.compression +
              ' version ' +
              a.version +
              ' is unsupported'
            );
          for (var i = [], o = I(t, n) - 2; o > 0; ) {
            var l = y(t.buffer, n),
              s = E(t, n),
              u = (s >> 2) & 3,
              c = new Int8Array([(s >> 4) - 1])[0],
              d = E(t, n);
            (i.push({ name: l, index: c, type: d, compression: u }),
              (o -= l.length + 3));
          }
          for (
            var p = P.channels, h = Array(e.channels), g = 0;
            g < e.channels;
            ++g
          ) {
            var A = (h[g] = {}),
              B = p[g];
            ((A.name = B.name),
              (A.compression = 0),
              (A.decoded = !1),
              (A.type = B.pixelType),
              (A.pLinear = B.pLinear),
              (A.width = e.width),
              (A.height = e.lines));
          }
          for (var b = { idx: [, , ,] }, C = 0; C < e.channels; ++C)
            for (var A = h[C], g = 0; g < i.length; ++g) {
              var x = i[g];
              A.name == x.name &&
                ((A.compression = x.compression),
                x.index >= 0 && (b.idx[x.index] = C),
                (A.offset = C));
            }
          if (a.acCompressedSize > 0)
            switch (a.acCompression) {
              case 0:
                var w = new Uint16Array(a.totalAcUncompressedCount);
                f(
                  e.array,
                  t,
                  n,
                  a.acCompressedSize,
                  w,
                  a.totalAcUncompressedCount
                );
                break;
              case 1:
                var S = e.array.slice(
                    n.value,
                    n.value + a.totalAcUncompressedCount
                  ),
                  F = nS(S),
                  w = new Uint16Array(F.buffer);
                n.value += a.totalAcUncompressedCount;
            }
          if (a.dcCompressedSize > 0) {
            var T = new Uint16Array(
              v({ array: e.array, offset: n, size: a.dcCompressedSize }).buffer
            );
            n.value += a.dcCompressedSize;
          }
          if (a.rleRawSize > 0) {
            var S = e.array.slice(n.value, n.value + a.rleCompressedSize),
              F = nS(S),
              G = m(F.buffer);
            n.value += a.rleCompressedSize;
          }
          for (var D = 0, _ = Array(h.length), g = 0; g < _.length; ++g)
            _[g] = [];
          for (var k = 0; k < e.lines; ++k)
            for (var L = 0; L < h.length; ++L)
              (_[L].push(D), (D += h[L].width * e.type * 2));
          !(function (e, t, n, r, a, i) {
            var o = new DataView(i.buffer),
              l = n[e.idx[0]].width,
              s = n[e.idx[0]].height,
              u = Math.floor(l / 8),
              c = Math.ceil(l / 8),
              d = Math.ceil(s / 8),
              f = l - (c - 1) * 8,
              p = s - (d - 1) * 8,
              h = { value: 0 },
              m = [, , ,],
              g = [, , ,],
              A = [, , ,],
              v = [, , ,],
              B = [, , ,];
            for (let n = 0; n < 3; ++n)
              ((B[n] = t[e.idx[n]]),
                (m[n] = n < 1 ? 0 : m[n - 1] + c * d),
                (g[n] = new Float32Array(64)),
                (A[n] = new Uint16Array(64)),
                (v[n] = new Uint16Array(64 * c)));
            for (let t = 0; t < d; ++t) {
              var b,
                C,
                y = 8;
              t == d - 1 && (y = p);
              var x = 8;
              for (let e = 0; e < c; ++e) {
                e == c - 1 && (x = f);
                for (let e = 0; e < 3; ++e) {
                  (A[e].fill(0),
                    (A[e][0] = a[m[e]++]),
                    (function (e, t, n) {
                      for (var r, a = 1; a < 64; )
                        (65280 == (r = t[e.value])
                          ? (a = 64)
                          : r >> 8 == 255
                            ? (a += 255 & r)
                            : ((n[a] = r), a++),
                          e.value++);
                    })(h, r, A[e]),
                    (b = A[e]),
                    ((C = g[e])[0] = R(b[0])),
                    (C[1] = R(b[1])),
                    (C[2] = R(b[5])),
                    (C[3] = R(b[6])),
                    (C[4] = R(b[14])),
                    (C[5] = R(b[15])),
                    (C[6] = R(b[27])),
                    (C[7] = R(b[28])),
                    (C[8] = R(b[2])),
                    (C[9] = R(b[4])),
                    (C[10] = R(b[7])),
                    (C[11] = R(b[13])),
                    (C[12] = R(b[16])),
                    (C[13] = R(b[26])),
                    (C[14] = R(b[29])),
                    (C[15] = R(b[42])),
                    (C[16] = R(b[3])),
                    (C[17] = R(b[8])),
                    (C[18] = R(b[12])),
                    (C[19] = R(b[17])),
                    (C[20] = R(b[25])),
                    (C[21] = R(b[30])),
                    (C[22] = R(b[41])),
                    (C[23] = R(b[43])),
                    (C[24] = R(b[9])),
                    (C[25] = R(b[11])),
                    (C[26] = R(b[18])),
                    (C[27] = R(b[24])),
                    (C[28] = R(b[31])),
                    (C[29] = R(b[40])),
                    (C[30] = R(b[44])),
                    (C[31] = R(b[53])),
                    (C[32] = R(b[10])),
                    (C[33] = R(b[19])),
                    (C[34] = R(b[23])),
                    (C[35] = R(b[32])),
                    (C[36] = R(b[39])),
                    (C[37] = R(b[45])),
                    (C[38] = R(b[52])),
                    (C[39] = R(b[54])),
                    (C[40] = R(b[20])),
                    (C[41] = R(b[22])),
                    (C[42] = R(b[33])),
                    (C[43] = R(b[38])),
                    (C[44] = R(b[46])),
                    (C[45] = R(b[51])),
                    (C[46] = R(b[55])),
                    (C[47] = R(b[60])),
                    (C[48] = R(b[21])),
                    (C[49] = R(b[34])),
                    (C[50] = R(b[37])),
                    (C[51] = R(b[47])),
                    (C[52] = R(b[50])),
                    (C[53] = R(b[56])),
                    (C[54] = R(b[59])),
                    (C[55] = R(b[61])),
                    (C[56] = R(b[35])),
                    (C[57] = R(b[36])),
                    (C[58] = R(b[48])),
                    (C[59] = R(b[49])),
                    (C[60] = R(b[57])),
                    (C[61] = R(b[58])),
                    (C[62] = R(b[62])),
                    (C[63] = R(b[63])),
                    (function (e) {
                      let t = 0.5 * Math.cos(3.14159 / 16),
                        n = 0.5 * Math.cos(3.14159 / 8),
                        r = 0.5 * Math.cos((3 * 3.14159) / 16),
                        a = 0.5 * Math.cos((3 * 3.14159) / 8);
                      for (
                        var i = [, , , ,],
                          o = [, , , ,],
                          l = [, , , ,],
                          s = [, , , ,],
                          u = 0;
                        u < 8;
                        ++u
                      ) {
                        var c = 8 * u;
                        ((i[0] = n * e[c + 2]),
                          (i[1] = a * e[c + 2]),
                          (i[2] = n * e[c + 6]),
                          (i[3] = a * e[c + 6]),
                          (o[0] =
                            t * e[c + 1] +
                            r * e[c + 3] +
                            0.2777854612564676 * e[c + 5] +
                            0.09754573032714427 * e[c + 7]),
                          (o[1] =
                            r * e[c + 1] -
                            0.09754573032714427 * e[c + 3] -
                            t * e[c + 5] -
                            0.2777854612564676 * e[c + 7]),
                          (o[2] =
                            0.2777854612564676 * e[c + 1] -
                            t * e[c + 3] +
                            0.09754573032714427 * e[c + 5] +
                            r * e[c + 7]),
                          (o[3] =
                            0.09754573032714427 * e[c + 1] -
                            0.2777854612564676 * e[c + 3] +
                            r * e[c + 5] -
                            t * e[c + 7]),
                          (l[0] = 0.35355362513961314 * (e[c + 0] + e[c + 4])),
                          (l[3] = 0.35355362513961314 * (e[c + 0] - e[c + 4])),
                          (l[1] = i[0] + i[3]),
                          (l[2] = i[1] - i[2]),
                          (s[0] = l[0] + l[1]),
                          (s[1] = l[3] + l[2]),
                          (s[2] = l[3] - l[2]),
                          (s[3] = l[0] - l[1]),
                          (e[c + 0] = s[0] + o[0]),
                          (e[c + 1] = s[1] + o[1]),
                          (e[c + 2] = s[2] + o[2]),
                          (e[c + 3] = s[3] + o[3]),
                          (e[c + 4] = s[3] - o[3]),
                          (e[c + 5] = s[2] - o[2]),
                          (e[c + 6] = s[1] - o[1]),
                          (e[c + 7] = s[0] - o[0]));
                      }
                      for (var d = 0; d < 8; ++d)
                        ((i[0] = n * e[16 + d]),
                          (i[1] = a * e[16 + d]),
                          (i[2] = n * e[48 + d]),
                          (i[3] = a * e[48 + d]),
                          (o[0] =
                            t * e[8 + d] +
                            r * e[24 + d] +
                            0.2777854612564676 * e[40 + d] +
                            0.09754573032714427 * e[56 + d]),
                          (o[1] =
                            r * e[8 + d] -
                            0.09754573032714427 * e[24 + d] -
                            t * e[40 + d] -
                            0.2777854612564676 * e[56 + d]),
                          (o[2] =
                            0.2777854612564676 * e[8 + d] -
                            t * e[24 + d] +
                            0.09754573032714427 * e[40 + d] +
                            r * e[56 + d]),
                          (o[3] =
                            0.09754573032714427 * e[8 + d] -
                            0.2777854612564676 * e[24 + d] +
                            r * e[40 + d] -
                            t * e[56 + d]),
                          (l[0] = 0.35355362513961314 * (e[d] + e[32 + d])),
                          (l[3] = 0.35355362513961314 * (e[d] - e[32 + d])),
                          (l[1] = i[0] + i[3]),
                          (l[2] = i[1] - i[2]),
                          (s[0] = l[0] + l[1]),
                          (s[1] = l[3] + l[2]),
                          (s[2] = l[3] - l[2]),
                          (s[3] = l[0] - l[1]),
                          (e[0 + d] = s[0] + o[0]),
                          (e[8 + d] = s[1] + o[1]),
                          (e[16 + d] = s[2] + o[2]),
                          (e[24 + d] = s[3] + o[3]),
                          (e[32 + d] = s[3] - o[3]),
                          (e[40 + d] = s[2] - o[2]),
                          (e[48 + d] = s[1] - o[1]),
                          (e[56 + d] = s[0] - o[0]));
                    })(g[e]));
                }
                for (var w = g, S = 0; S < 64; ++S) {
                  var E = w[0][S],
                    M = w[1][S],
                    F = w[2][S];
                  ((w[0][S] = E + 1.5747 * F),
                    (w[1][S] = E - 0.1873 * M - 0.4682 * F),
                    (w[2][S] = E + 1.8556 * M));
                }
                for (let t = 0; t < 3; ++t)
                  !(function (e, t, n) {
                    for (var r, a = 0; a < 64; ++a) {
                      t[n + a] = ts.DataUtils.toHalfFloat(
                        (r = e[a]) <= 1
                          ? Math.sign(r) * Math.pow(Math.abs(r), 2.2)
                          : Math.sign(r) *
                              Math.pow(9.025013291561939, Math.abs(r) - 1)
                      );
                    }
                  })(g[t], v[t], 64 * e);
              }
              let i = 0;
              for (let r = 0; r < 3; ++r) {
                let a = n[e.idx[r]].type;
                for (let e = 8 * t; e < 8 * t + y; ++e) {
                  i = B[r][e];
                  for (let t = 0; t < u; ++t) {
                    let n = 64 * t + (7 & e) * 8;
                    (o.setUint16(i + 0 * a, v[r][n + 0], !0),
                      o.setUint16(i + 2 * a, v[r][n + 1], !0),
                      o.setUint16(i + 4 * a, v[r][n + 2], !0),
                      o.setUint16(i + 6 * a, v[r][n + 3], !0),
                      o.setUint16(i + 8 * a, v[r][n + 4], !0),
                      o.setUint16(i + 10 * a, v[r][n + 5], !0),
                      o.setUint16(i + 12 * a, v[r][n + 6], !0),
                      o.setUint16(i + 14 * a, v[r][n + 7], !0),
                      (i += 16 * a));
                  }
                }
                if (u != c)
                  for (let e = 8 * t; e < 8 * t + y; ++e) {
                    let t = B[r][e] + 8 * u * 2 * a,
                      n = 64 * u + (7 & e) * 8;
                    for (let e = 0; e < x; ++e)
                      o.setUint16(t + 2 * e * a, v[r][n + e], !0);
                  }
              }
            }
            for (
              var T = new Uint16Array(l), o = new DataView(i.buffer), I = 0;
              I < 3;
              ++I
            ) {
              n[e.idx[I]].decoded = !0;
              var G = n[e.idx[I]].type;
              if (2 == n[I].type)
                for (var D = 0; D < s; ++D) {
                  let e = B[I][D];
                  for (var _ = 0; _ < l; ++_)
                    T[_] = o.getUint16(e + 2 * _ * G, !0);
                  for (var _ = 0; _ < l; ++_)
                    o.setFloat32(e + 2 * _ * G, R(T[_]), !0);
                }
            }
          })(b, _, h, w, T, r);
          for (var g = 0; g < h.length; ++g) {
            var A = h[g];
            if (!A.decoded)
              if (2 === A.compression)
                for (var N = 0, H = 0, k = 0; k < e.lines; ++k) {
                  for (var U = _[g][N], O = 0; O < A.width; ++O) {
                    for (var j = 0; j < 2 * A.type; ++j)
                      r[U++] = G[H + j * A.width * A.height];
                    H++;
                  }
                  N++;
                }
              else throw 'EXRLoader.parse: unsupported channel compression';
          }
          return new DataView(r.buffer);
        }
        function y(e, t) {
          for (var n = new Uint8Array(e), r = 0; 0 != n[t.value + r]; ) r += 1;
          var a = new TextDecoder().decode(n.slice(t.value, t.value + r));
          return ((t.value = t.value + r + 1), a);
        }
        function x(e, t) {
          var n = e.getInt32(t.value, !0);
          return ((t.value = t.value + 4), n);
        }
        function w(e, t) {
          var n = e.getUint32(t.value, !0);
          return ((t.value = t.value + 4), n);
        }
        function S(e, t) {
          var n = e[t.value];
          return ((t.value = t.value + 1), n);
        }
        function E(e, t) {
          var n = e.getUint8(t.value);
          return ((t.value = t.value + 1), n);
        }
        let M = function (e, t) {
          let n;
          return (
            (n =
              'getBigInt64' in DataView.prototype
                ? Number(e.getBigInt64(t.value, !0))
                : e.getUint32(t.value + 4, !0) +
                  Number(e.getUint32(t.value, !0) << 32)),
            (t.value += 8),
            n
          );
        };
        function F(e, t) {
          var n = e.getFloat32(t.value, !0);
          return ((t.value += 4), n);
        }
        function T(e, t) {
          return ts.DataUtils.toHalfFloat(F(e, t));
        }
        function R(e) {
          var t = (31744 & e) >> 10,
            n = 1023 & e;
          return (
            (e >> 15 ? -1 : 1) *
            (t
              ? 31 === t
                ? n
                  ? NaN
                  : 1 / 0
                : Math.pow(2, t - 15) * (1 + n / 1024)
              : (n / 1024) * 6103515625e-14)
          );
        }
        function I(e, t) {
          var n = e.getUint16(t.value, !0);
          return ((t.value += 2), n);
        }
        function G(e, t) {
          return R(I(e, t));
        }
        let D = new DataView(e),
          _ = new Uint8Array(e),
          k = { value: 0 },
          P = (function (e, t, n) {
            let r = {};
            if (0x1312f76 != e.getUint32(0, !0))
              throw "THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";
            r.version = e.getUint8(4);
            let a = e.getUint8(5);
            ((r.spec = {
              singleTile: !!(2 & a),
              longName: !!(4 & a),
              deepFormat: !!(8 & a),
              multiPart: !!(16 & a),
            }),
              (n.value = 8));
            for (var i = !0; i; ) {
              var o = y(t, n);
              if (0 == o) i = !1;
              else {
                var l = y(t, n),
                  s = w(e, n),
                  u = (function (e, t, n, r, a) {
                    var i, o, l, s, u, c, d;
                    if (
                      'string' === r ||
                      'stringvector' === r ||
                      'iccProfile' === r
                    )
                      return (
                        (i = new TextDecoder().decode(
                          new Uint8Array(t).slice(n.value, n.value + a)
                        )),
                        (n.value = n.value + a),
                        i
                      );
                    if ('chlist' === r)
                      return (function (e, t, n, r) {
                        for (var a = n.value, i = []; n.value < a + r - 1; ) {
                          var o = y(t, n),
                            l = x(e, n),
                            s = E(e, n);
                          n.value += 3;
                          var u = x(e, n),
                            c = x(e, n);
                          i.push({
                            name: o,
                            pixelType: l,
                            pLinear: s,
                            xSampling: u,
                            ySampling: c,
                          });
                        }
                        return ((n.value += 1), i);
                      })(e, t, n, a);
                    if ('chromaticities' === r)
                      return (
                        (o = F(e, n)),
                        (l = F(e, n)),
                        (s = F(e, n)),
                        (u = F(e, n)),
                        (c = F(e, n)),
                        {
                          redX: o,
                          redY: l,
                          greenX: s,
                          greenY: u,
                          blueX: c,
                          blueY: F(e, n),
                          whiteX: F(e, n),
                          whiteY: F(e, n),
                        }
                      );
                    if ('compression' === r)
                      return [
                        'NO_COMPRESSION',
                        'RLE_COMPRESSION',
                        'ZIPS_COMPRESSION',
                        'ZIP_COMPRESSION',
                        'PIZ_COMPRESSION',
                        'PXR24_COMPRESSION',
                        'B44_COMPRESSION',
                        'B44A_COMPRESSION',
                        'DWAA_COMPRESSION',
                        'DWAB_COMPRESSION',
                      ][E(e, n)];
                    if ('box2i' === r)
                      return (
                        (d = w(e, n)),
                        { xMin: d, yMin: w(e, n), xMax: w(e, n), yMax: w(e, n) }
                      );
                    else if ('lineOrder' === r)
                      return ['INCREASING_Y'][E(e, n)];
                    else if ('float' === r) return F(e, n);
                    else if ('v2f' === r) return [F(e, n), F(e, n)];
                    else if ('v3f' === r) return [F(e, n), F(e, n), F(e, n)];
                    else if ('int' === r) return x(e, n);
                    else if ('rational' === r) return [x(e, n), w(e, n)];
                    else if ('timecode' === r) return [w(e, n), w(e, n)];
                    else
                      return 'preview' === r
                        ? ((n.value += a), 'skipped')
                        : ((n.value += a), void 0);
                  })(e, t, n, l, s);
                void 0 === u
                  ? console.warn(
                      `EXRLoader.parse: skipped unknown header attribute type '${l}'.`
                    )
                  : (r[o] = u);
              }
            }
            if ((-5 & a) != 0)
              throw (
                console.error('EXRHeader:', r),
                'THREE.EXRLoader: provided file is currently unsupported.'
              );
            return r;
          })(D, e, k),
          L = (function (e, t, n, r, a) {
            let i = {
              size: 0,
              viewer: t,
              array: n,
              offset: r,
              width: e.dataWindow.xMax - e.dataWindow.xMin + 1,
              height: e.dataWindow.yMax - e.dataWindow.yMin + 1,
              channels: e.channels.length,
              bytesPerLine: null,
              lines: null,
              inputSize: null,
              type: e.channels[0].pixelType,
              uncompress: null,
              getter: null,
              format: null,
              [nK ? 'colorSpace' : 'encoding']: null,
            };
            switch (e.compression) {
              case 'NO_COMPRESSION':
                ((i.lines = 1), (i.uncompress = g));
                break;
              case 'RLE_COMPRESSION':
                ((i.lines = 1), (i.uncompress = A));
                break;
              case 'ZIPS_COMPRESSION':
                ((i.lines = 1), (i.uncompress = v));
                break;
              case 'ZIP_COMPRESSION':
                ((i.lines = 16), (i.uncompress = v));
                break;
              case 'PIZ_COMPRESSION':
                ((i.lines = 32), (i.uncompress = B));
                break;
              case 'PXR24_COMPRESSION':
                ((i.lines = 16), (i.uncompress = b));
                break;
              case 'DWAA_COMPRESSION':
                ((i.lines = 32), (i.uncompress = C));
                break;
              case 'DWAB_COMPRESSION':
                ((i.lines = 256), (i.uncompress = C));
                break;
              default:
                throw 'EXRLoader.parse: ' + e.compression + ' is unsupported';
            }
            if (((i.scanlineBlockSize = i.lines), 1 == i.type))
              switch (a) {
                case ts.FloatType:
                  ((i.getter = G), (i.inputSize = 2));
                  break;
                case ts.HalfFloatType:
                  ((i.getter = I), (i.inputSize = 2));
              }
            else if (2 == i.type)
              switch (a) {
                case ts.FloatType:
                  ((i.getter = F), (i.inputSize = 4));
                  break;
                case ts.HalfFloatType:
                  ((i.getter = T), (i.inputSize = 4));
              }
            else
              throw (
                'EXRLoader.parse: unsupported pixelType ' +
                i.type +
                ' for ' +
                e.compression +
                '.'
              );
            i.blockCount = (e.dataWindow.yMax + 1) / i.scanlineBlockSize;
            for (var o = 0; o < i.blockCount; o++) M(t, r);
            i.outputChannels = 3 == i.channels ? 4 : i.channels;
            let l = i.width * i.height * i.outputChannels;
            switch (a) {
              case ts.FloatType:
                ((i.byteArray = new Float32Array(l)),
                  i.channels < i.outputChannels && i.byteArray.fill(1, 0, l));
                break;
              case ts.HalfFloatType:
                ((i.byteArray = new Uint16Array(l)),
                  i.channels < i.outputChannels &&
                    i.byteArray.fill(15360, 0, l));
                break;
              default:
                console.error('THREE.EXRLoader: unsupported type: ', a);
            }
            return (
              (i.bytesPerLine = i.width * i.inputSize * i.channels),
              4 == i.outputChannels
                ? (i.format = ts.RGBAFormat)
                : (i.format = ts.RedFormat),
              nK ? (i.colorSpace = 'srgb-linear') : (i.encoding = 3e3),
              i
            );
          })(P, D, _, k, this.type),
          N = { value: 0 },
          H = { R: 0, G: 1, B: 2, A: 3, Y: 0 };
        for (let e = 0; e < L.height / L.scanlineBlockSize; e++) {
          let t = w(D, k);
          ((L.size = w(D, k)),
            (L.lines =
              t + L.scanlineBlockSize > L.height
                ? L.height - t
                : L.scanlineBlockSize));
          let n = L.size < L.lines * L.bytesPerLine ? L.uncompress(L) : g(L);
          k.value += L.size;
          for (let t = 0; t < L.scanlineBlockSize; t++) {
            let r = t + e * L.scanlineBlockSize;
            if (r >= L.height) break;
            for (let e = 0; e < L.channels; e++) {
              let a = H[P.channels[e].name];
              for (let i = 0; i < L.width; i++) {
                N.value =
                  (t * (L.channels * L.width) + e * L.width + i) * L.inputSize;
                let o =
                  (L.height - 1 - r) * (L.width * L.outputChannels) +
                  i * L.outputChannels +
                  a;
                L.byteArray[o] = L.getter(n, N);
              }
            }
          }
        }
        return {
          header: P,
          width: L.width,
          height: L.height,
          data: L.byteArray,
          format: L.format,
          [nK ? 'colorSpace' : 'encoding']: L[nK ? 'colorSpace' : 'encoding'],
          type: this.type,
        };
      }
      setDataType(e) {
        return ((this.type = e), this);
      }
      load(e, t, n, r) {
        return super.load(
          e,
          function (e, n) {
            (nK ? (e.colorSpace = n.colorSpace) : (e.encoding = n.encoding),
              (e.minFilter = ts.LinearFilter),
              (e.magFilter = ts.LinearFilter),
              (e.generateMipmaps = !1),
              (e.flipY = !1),
              t && t(e, n));
          },
          n,
          r
        );
      }
    }
    let nX = (e, t, n) => {
      let r;
      switch (e) {
        case S.UnsignedByteType:
          r = new Uint8ClampedArray(t * n * 4);
          break;
        case S.HalfFloatType:
          r = new Uint16Array(t * n * 4);
          break;
        case S.UnsignedIntType:
          r = new Uint32Array(t * n * 4);
          break;
        case S.ByteType:
          r = new Int8Array(t * n * 4);
          break;
        case S.ShortType:
          r = new Int16Array(t * n * 4);
          break;
        case S.IntType:
          r = new Int32Array(t * n * 4);
          break;
        case S.FloatType:
          r = new Float32Array(t * n * 4);
          break;
        default:
          throw Error('Unsupported data type');
      }
      return r;
    };
    class nV {
      _renderer;
      _rendererIsDisposable = !1;
      _material;
      _scene;
      _camera;
      _quad;
      _renderTarget;
      _width;
      _height;
      _type;
      _colorSpace;
      _supportsReadPixels = !0;
      constructor(e) {
        ((this._width = e.width),
          (this._height = e.height),
          (this._type = e.type),
          (this._colorSpace = e.colorSpace));
        const t = {
          format: S.RGBAFormat,
          depthBuffer: !1,
          stencilBuffer: !1,
          type: this._type,
          colorSpace: this._colorSpace,
          anisotropy:
            e.renderTargetOptions?.anisotropy !== void 0
              ? e.renderTargetOptions?.anisotropy
              : 1,
          generateMipmaps:
            e.renderTargetOptions?.generateMipmaps !== void 0 &&
            e.renderTargetOptions?.generateMipmaps,
          magFilter:
            e.renderTargetOptions?.magFilter !== void 0
              ? e.renderTargetOptions?.magFilter
              : S.LinearFilter,
          minFilter:
            e.renderTargetOptions?.minFilter !== void 0
              ? e.renderTargetOptions?.minFilter
              : S.LinearFilter,
          samples:
            e.renderTargetOptions?.samples !== void 0
              ? e.renderTargetOptions?.samples
              : void 0,
          wrapS:
            e.renderTargetOptions?.wrapS !== void 0
              ? e.renderTargetOptions?.wrapS
              : S.ClampToEdgeWrapping,
          wrapT:
            e.renderTargetOptions?.wrapT !== void 0
              ? e.renderTargetOptions?.wrapT
              : S.ClampToEdgeWrapping,
        };
        if (
          ((this._material = e.material),
          e.renderer
            ? (this._renderer = e.renderer)
            : ((this._renderer = nV.instantiateRenderer()),
              (this._rendererIsDisposable = !0)),
          (this._scene = new S.Scene()),
          (this._camera = new S.OrthographicCamera()),
          this._camera.position.set(0, 0, 10),
          (this._camera.left = -0.5),
          (this._camera.right = 0.5),
          (this._camera.top = 0.5),
          (this._camera.bottom = -0.5),
          this._camera.updateProjectionMatrix(),
          !((e, t, n, r) => {
            if (void 0 !== o) return o;
            let a = new S.WebGLRenderTarget(1, 1, r);
            t.setRenderTarget(a);
            let i = new S.Mesh(
              new S.PlaneGeometry(),
              new S.MeshBasicMaterial({ color: 0xffffff })
            );
            (t.render(i, n), t.setRenderTarget(null));
            let l = nX(e, a.width, a.height);
            return (
              t.readRenderTargetPixels(a, 0, 0, a.width, a.height, l),
              a.dispose(),
              i.geometry.dispose(),
              i.material.dispose(),
              (o = 0 !== l[0])
            );
          })(this._type, this._renderer, this._camera, t))
        ) {
          let e;
          (this._type === S.HalfFloatType &&
            (e = this._renderer.extensions.has('EXT_color_buffer_float')
              ? S.FloatType
              : void 0),
            void 0 !== e
              ? (console.warn(
                  `This browser does not support reading pixels from ${this._type} RenderTargets, switching to ${S.FloatType}`
                ),
                (this._type = e))
              : ((this._supportsReadPixels = !1),
                console.warn(
                  'This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown'
                )));
        }
        ((this._quad = new S.Mesh(new S.PlaneGeometry(), this._material)),
          this._quad.geometry.computeBoundingBox(),
          this._scene.add(this._quad),
          (this._renderTarget = new S.WebGLRenderTarget(
            this.width,
            this.height,
            t
          )),
          (this._renderTarget.texture.mapping =
            e.renderTargetOptions?.mapping !== void 0
              ? e.renderTargetOptions?.mapping
              : S.UVMapping));
      }
      static instantiateRenderer() {
        let e = new E.WebGLRenderer();
        return (e.setSize(128, 128), e);
      }
      render = () => {
        this._renderer.setRenderTarget(this._renderTarget);
        try {
          this._renderer.render(this._scene, this._camera);
        } catch (e) {
          throw (this._renderer.setRenderTarget(null), e);
        }
        this._renderer.setRenderTarget(null);
      };
      toArray() {
        if (!this._supportsReadPixels)
          throw Error("Can't read pixels in this browser");
        let e = nX(this._type, this._width, this._height);
        return (
          this._renderer.readRenderTargetPixels(
            this._renderTarget,
            0,
            0,
            this._width,
            this._height,
            e
          ),
          e
        );
      }
      toDataTexture(e) {
        let t = new S.DataTexture(
          this.toArray(),
          this.width,
          this.height,
          S.RGBAFormat,
          this._type,
          e?.mapping || S.UVMapping,
          e?.wrapS || S.ClampToEdgeWrapping,
          e?.wrapT || S.ClampToEdgeWrapping,
          e?.magFilter || S.LinearFilter,
          e?.minFilter || S.LinearFilter,
          e?.anisotropy || 1,
          S.LinearSRGBColorSpace
        );
        return (
          (t.generateMipmaps =
            e?.generateMipmaps !== void 0 && e?.generateMipmaps),
          t
        );
      }
      disposeOnDemandRenderer() {
        (this._renderer.setRenderTarget(null),
          this._rendererIsDisposable &&
            (this._renderer.dispose(), this._renderer.forceContextLoss()));
      }
      dispose(e) {
        (this.disposeOnDemandRenderer(),
          e && this.renderTarget.dispose(),
          this.material instanceof S.ShaderMaterial &&
            Object.values(this.material.uniforms).forEach((e) => {
              e.value instanceof S.Texture && e.value.dispose();
            }),
          Object.values(this.material).forEach((e) => {
            e instanceof S.Texture && e.dispose();
          }),
          this.material.dispose(),
          this._quad.geometry.dispose());
      }
      get width() {
        return this._width;
      }
      set width(e) {
        ((this._width = e),
          this._renderTarget.setSize(this._width, this._height));
      }
      get height() {
        return this._height;
      }
      set height(e) {
        ((this._height = e),
          this._renderTarget.setSize(this._width, this._height));
      }
      get renderer() {
        return this._renderer;
      }
      get renderTarget() {
        return this._renderTarget;
      }
      set renderTarget(e) {
        ((this._renderTarget = e),
          (this._width = e.width),
          (this._height = e.height));
      }
      get material() {
        return this._material;
      }
      get type() {
        return this._type;
      }
      get colorSpace() {
        return this._colorSpace;
      }
    }
    var nW = S;
    class nY extends Error {}
    class nq extends Error {}
    let nZ = (e, t, n) => {
      let r = RegExp(`${t}="([^"]*)"`, 'i').exec(e);
      if (r) return r[1];
      let a = RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`, 'i').exec(e);
      if (a) {
        let e = a[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);
        return e && 3 === e.length
          ? e.map((e) => e.replace(/<\/?rdf:li>/g, ''))
          : a[1].trim();
      }
      if (void 0 !== n) return n;
      throw Error(`Can't find ${t} in gainmap metadata`);
    };
    class n$ {
      options;
      constructor(e) {
        this.options = {
          debug: !!e && void 0 !== e.debug && e.debug,
          extractFII: !e || void 0 === e.extractFII || e.extractFII,
          extractNonFII: !e || void 0 === e.extractNonFII || e.extractNonFII,
        };
      }
      extract(e) {
        return new Promise((t, n) => {
          let r,
            a = this.options.debug,
            i = new DataView(e.buffer);
          if (65496 !== i.getUint16(0))
            return void n(Error('Not a valid jpeg'));
          let o = i.byteLength,
            l = 2,
            s = 0;
          for (; l < o; ) {
            if (++s > 250)
              return void n(Error(`Found no marker after ${s} loops 😵`));
            if (255 !== i.getUint8(l))
              return void n(
                Error(
                  `Not a valid marker at offset 0x${l.toString(16)}, found: 0x${i.getUint8(l).toString(16)}`
                )
              );
            if (
              ((r = i.getUint8(l + 1)),
              a && console.log(`Marker: ${r.toString(16)}`),
              226 === r)
            ) {
              a && console.log('Found APP2 marker (0xffe2)');
              let e = l + 4;
              if (0x4d504600 === i.getUint32(e)) {
                let r,
                  a = e + 4;
                if (18761 === i.getUint16(a)) r = !1;
                else {
                  if (19789 !== i.getUint16(a))
                    return void n(
                      Error('No valid endianness marker found in TIFF header')
                    );
                  r = !0;
                }
                if (42 !== i.getUint16(a + 2, !r))
                  return void n(
                    Error('Not valid TIFF data! (no 0x002A marker)')
                  );
                let o = i.getUint32(a + 4, !r);
                if (o < 8)
                  return void n(
                    Error('Not valid TIFF data! (First offset less than 8)')
                  );
                let l = a + o,
                  s = i.getUint16(l, !r),
                  u = l + 2,
                  c = 0;
                for (let e = u; e < u + 12 * s; e += 12)
                  45057 === i.getUint16(e, !r) && (c = i.getUint32(e + 8, !r));
                let d = l + 2 + 12 * s + 4,
                  f = [];
                for (let e = d; e < d + 16 * c; e += 16) {
                  let t = {
                    MPType: i.getUint32(e, !r),
                    size: i.getUint32(e + 4, !r),
                    dataOffset: i.getUint32(e + 8, !r),
                    dependantImages: i.getUint32(e + 12, !r),
                    start: -1,
                    end: -1,
                    isFII: !1,
                  };
                  (t.dataOffset
                    ? ((t.start = a + t.dataOffset), (t.isFII = !1))
                    : ((t.start = 0), (t.isFII = !0)),
                    (t.end = t.start + t.size),
                    f.push(t));
                }
                if (this.options.extractNonFII && f.length) {
                  let e = new Blob([i]),
                    n = [];
                  for (let t of f) {
                    if (t.isFII && !this.options.extractFII) continue;
                    let r = e.slice(t.start, t.end + 1, 'image/jpeg');
                    n.push(r);
                  }
                  t(n);
                }
              }
            }
            l += 2 + i.getUint16(l + 2);
          }
        });
      }
    }
    let n0 = async (e) => {
        let t = ((e) => {
          let t,
            n = (t =
              'u' > typeof TextDecoder
                ? new TextDecoder().decode(e)
                : e.toString()).indexOf('<x:xmpmeta');
          for (; -1 !== n; ) {
            let e = t.indexOf('x:xmpmeta>', n),
              r = t.slice(n, e + 10);
            try {
              let e = nZ(r, 'hdrgm:GainMapMin', '0'),
                t = nZ(r, 'hdrgm:GainMapMax'),
                n = nZ(r, 'hdrgm:Gamma', '1'),
                a = nZ(r, 'hdrgm:OffsetSDR', '0.015625'),
                i = nZ(r, 'hdrgm:OffsetHDR', '0.015625'),
                o = /hdrgm:HDRCapacityMin="([^"]*)"/.exec(r),
                l = o ? o[1] : '0',
                s = /hdrgm:HDRCapacityMax="([^"]*)"/.exec(r);
              if (!s) throw Error('Incomplete gainmap metadata');
              let u = s[1];
              return {
                gainMapMin: Array.isArray(e)
                  ? e.map((e) => parseFloat(e))
                  : [parseFloat(e), parseFloat(e), parseFloat(e)],
                gainMapMax: Array.isArray(t)
                  ? t.map((e) => parseFloat(e))
                  : [parseFloat(t), parseFloat(t), parseFloat(t)],
                gamma: Array.isArray(n)
                  ? n.map((e) => parseFloat(e))
                  : [parseFloat(n), parseFloat(n), parseFloat(n)],
                offsetSdr: Array.isArray(a)
                  ? a.map((e) => parseFloat(e))
                  : [parseFloat(a), parseFloat(a), parseFloat(a)],
                offsetHdr: Array.isArray(i)
                  ? i.map((e) => parseFloat(e))
                  : [parseFloat(i), parseFloat(i), parseFloat(i)],
                hdrCapacityMin: parseFloat(l),
                hdrCapacityMax: parseFloat(u),
              };
            } catch (e) {}
            n = t.indexOf('<x:xmpmeta', e);
          }
        })(e);
        if (!t) throw new nq('Gain map XMP metadata not found');
        let n = new n$({ extractFII: !0, extractNonFII: !0 }),
          r = await n.extract(e);
        if (2 !== r.length) throw new nY('Gain map recovery image not found');
        return {
          sdr: new Uint8Array(await r[0].arrayBuffer()),
          gainMap: new Uint8Array(await r[1].arrayBuffer()),
          metadata: t,
        };
      },
      n1 = (e) =>
        new Promise((t, n) => {
          let r = document.createElement('img');
          ((r.onload = () => {
            t(r);
          }),
            (r.onerror = (e) => {
              n(e);
            }),
            (r.src = URL.createObjectURL(e)));
        });
    class n2 extends nW.Loader {
      _renderer;
      _renderTargetOptions;
      _internalLoadingManager;
      _config;
      constructor(e, t) {
        (super(t),
          (this._config = e),
          e.renderer && (this._renderer = e.renderer),
          (this._internalLoadingManager = new nW.LoadingManager()));
      }
      setRenderer(e) {
        return ((this._renderer = e), this);
      }
      setRenderTargetOptions(e) {
        return ((this._renderTargetOptions = e), this);
      }
      prepareQuadRenderer() {
        this._renderer ||
          console.warn(
            'WARNING: A Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer.'
          );
        let e = this._config.createMaterial({
          gainMapMax: [1, 1, 1],
          gainMapMin: [0, 0, 0],
          gamma: [1, 1, 1],
          offsetHdr: [1, 1, 1],
          offsetSdr: [1, 1, 1],
          hdrCapacityMax: 1,
          hdrCapacityMin: 0,
          maxDisplayBoost: 1,
          gainMap: new nW.Texture(),
          sdr: new nW.Texture(),
        });
        return this._config.createQuadRenderer({
          width: 16,
          height: 16,
          type: nW.HalfFloatType,
          colorSpace: nW.LinearSRGBColorSpace,
          material: e,
          renderer: this._renderer,
          renderTargetOptions: this._renderTargetOptions,
        });
      }
      async processImages(e, t, n) {
        let r,
          a,
          i = t ? new Blob([t], { type: 'image/jpeg' }) : void 0,
          o = new Blob([e], { type: 'image/jpeg' }),
          l = !1;
        if ('u' < typeof createImageBitmap) {
          let e = await Promise.all([
            i ? n1(i) : Promise.resolve(void 0),
            n1(o),
          ]);
          ((a = e[0]), (r = e[1]), (l = 'flipY' === n));
        } else {
          let e = await Promise.all([
            i
              ? createImageBitmap(i, { imageOrientation: n || 'flipY' })
              : Promise.resolve(void 0),
            createImageBitmap(o, { imageOrientation: n || 'flipY' }),
          ]);
          ((a = e[0]), (r = e[1]));
        }
        return { sdrImage: r, gainMapImage: a, needsFlip: l };
      }
      createTextures(e, t, n) {
        let r = new nW.Texture(
          t || new ImageData(2, 2),
          nW.UVMapping,
          nW.ClampToEdgeWrapping,
          nW.ClampToEdgeWrapping,
          nW.LinearFilter,
          nW.LinearMipMapLinearFilter,
          nW.RGBAFormat,
          nW.UnsignedByteType,
          1,
          nW.LinearSRGBColorSpace
        );
        ((r.flipY = n), (r.needsUpdate = !0));
        let a = new nW.Texture(
          e,
          nW.UVMapping,
          nW.ClampToEdgeWrapping,
          nW.ClampToEdgeWrapping,
          nW.LinearFilter,
          nW.LinearMipMapLinearFilter,
          nW.RGBAFormat,
          nW.UnsignedByteType,
          1,
          nW.SRGBColorSpace
        );
        return ((a.flipY = n), (a.needsUpdate = !0), { gainMap: r, sdr: a });
      }
      updateQuadRenderer(e, t, n, r, a) {
        ((e.width = t.width),
          (e.height = t.height),
          (e.material.gainMap = n),
          (e.material.sdr = r),
          (e.material.gainMapMin = a.gainMapMin),
          (e.material.gainMapMax = a.gainMapMax),
          (e.material.offsetHdr = a.offsetHdr),
          (e.material.offsetSdr = a.offsetSdr),
          (e.material.gamma = a.gamma),
          (e.material.hdrCapacityMin = a.hdrCapacityMin),
          (e.material.hdrCapacityMax = a.hdrCapacityMax),
          (e.material.maxDisplayBoost = Math.pow(2, a.hdrCapacityMax)),
          (e.material.needsUpdate = !0));
      }
    }
    var n3 = S;
    let n9 = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
      n8 = `
// min half float value
#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )
// max half float value
#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )

uniform sampler2D sdr;
uniform sampler2D gainMap;
uniform vec3 gamma;
uniform vec3 offsetHdr;
uniform vec3 offsetSdr;
uniform vec3 gainMapMin;
uniform vec3 gainMapMax;
uniform float weightFactor;

varying vec2 vUv;

void main() {
  vec3 rgb = texture2D( sdr, vUv ).rgb;
  vec3 recovery = texture2D( gainMap, vUv ).rgb;
  vec3 logRecovery = pow( recovery, gamma );
  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;
  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;
  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));
  gl_FragColor = vec4( clampedHdrColor , 1.0 );
}
`;
    class n4 extends n3.ShaderMaterial {
      _maxDisplayBoost;
      _hdrCapacityMin;
      _hdrCapacityMax;
      constructor({
        gamma: e,
        offsetHdr: t,
        offsetSdr: n,
        gainMapMin: r,
        gainMapMax: a,
        maxDisplayBoost: i,
        hdrCapacityMin: o,
        hdrCapacityMax: l,
        sdr: s,
        gainMap: u,
      }) {
        (super({
          name: 'GainMapDecoderMaterial',
          vertexShader: n9,
          fragmentShader: n8,
          uniforms: {
            sdr: { value: s },
            gainMap: { value: u },
            gamma: { value: new n3.Vector3(1 / e[0], 1 / e[1], 1 / e[2]) },
            offsetHdr: { value: new n3.Vector3().fromArray(t) },
            offsetSdr: { value: new n3.Vector3().fromArray(n) },
            gainMapMin: { value: new n3.Vector3().fromArray(r) },
            gainMapMax: { value: new n3.Vector3().fromArray(a) },
            weightFactor: { value: (Math.log2(i) - o) / (l - o) },
          },
          blending: n3.NoBlending,
          depthTest: !1,
          depthWrite: !1,
        }),
          (this._maxDisplayBoost = i),
          (this._hdrCapacityMin = o),
          (this._hdrCapacityMax = l),
          (this.needsUpdate = !0),
          (this.uniformsNeedUpdate = !0));
      }
      get sdr() {
        return this.uniforms.sdr.value;
      }
      set sdr(e) {
        this.uniforms.sdr.value = e;
      }
      get gainMap() {
        return this.uniforms.gainMap.value;
      }
      set gainMap(e) {
        this.uniforms.gainMap.value = e;
      }
      get offsetHdr() {
        return this.uniforms.offsetHdr.value.toArray();
      }
      set offsetHdr(e) {
        this.uniforms.offsetHdr.value.fromArray(e);
      }
      get offsetSdr() {
        return this.uniforms.offsetSdr.value.toArray();
      }
      set offsetSdr(e) {
        this.uniforms.offsetSdr.value.fromArray(e);
      }
      get gainMapMin() {
        return this.uniforms.gainMapMin.value.toArray();
      }
      set gainMapMin(e) {
        this.uniforms.gainMapMin.value.fromArray(e);
      }
      get gainMapMax() {
        return this.uniforms.gainMapMax.value.toArray();
      }
      set gainMapMax(e) {
        this.uniforms.gainMapMax.value.fromArray(e);
      }
      get gamma() {
        let e = this.uniforms.gamma.value;
        return [1 / e.x, 1 / e.y, 1 / e.z];
      }
      set gamma(e) {
        let t = this.uniforms.gamma.value;
        ((t.x = 1 / e[0]), (t.y = 1 / e[1]), (t.z = 1 / e[2]));
      }
      get hdrCapacityMin() {
        return this._hdrCapacityMin;
      }
      set hdrCapacityMin(e) {
        ((this._hdrCapacityMin = e), this.calculateWeight());
      }
      get hdrCapacityMax() {
        return this._hdrCapacityMax;
      }
      set hdrCapacityMax(e) {
        ((this._hdrCapacityMax = e), this.calculateWeight());
      }
      get maxDisplayBoost() {
        return this._maxDisplayBoost;
      }
      set maxDisplayBoost(e) {
        ((this._maxDisplayBoost = Math.max(1, Math.min(65504, e))),
          this.calculateWeight());
      }
      calculateWeight() {
        let e =
          (Math.log2(this._maxDisplayBoost) - this._hdrCapacityMin) /
          (this._hdrCapacityMax - this._hdrCapacityMin);
        this.uniforms.weightFactor.value = Math.max(0, Math.min(1, e));
      }
    }
    E.WebGLRenderer;
    class n6 extends n2 {
      constructor(e, t) {
        super(
          {
            renderer: e,
            createMaterial: (e) => new n4(e),
            createQuadRenderer: (e) => new nV(e),
          },
          t
        );
      }
      async render(e, t, n, r) {
        let {
            sdrImage: a,
            gainMapImage: i,
            needsFlip: o,
          } = await this.processImages(n, r, 'flipY'),
          { gainMap: l, sdr: s } = this.createTextures(a, i, o);
        (this.updateQuadRenderer(e, a, l, s, t), e.render());
      }
    }
    class n5 extends n6 {
      load([e, t, n], r, a, i) {
        let o,
          l,
          s,
          u = this.prepareQuadRenderer(),
          c = async () => {
            if (o && l && s) {
              try {
                await this.render(u, s, o, l);
              } catch (r) {
                (this.manager.itemError(e),
                  this.manager.itemError(t),
                  this.manager.itemError(n),
                  'function' == typeof i && i(r),
                  u.disposeOnDemandRenderer());
                return;
              }
              ('function' == typeof r && r(u),
                this.manager.itemEnd(e),
                this.manager.itemEnd(t),
                this.manager.itemEnd(n),
                u.disposeOnDemandRenderer());
            }
          },
          d = !0,
          f = 0,
          p = 0,
          h = !0,
          m = 0,
          g = 0,
          A = !0,
          v = 0,
          B = 0,
          b = () => {
            'function' == typeof a &&
              a(
                new ProgressEvent('progress', {
                  lengthComputable: d && h && A,
                  loaded: p + g + B,
                  total: f + m + v,
                })
              );
          };
        (this.manager.itemStart(e),
          this.manager.itemStart(t),
          this.manager.itemStart(n));
        let C = new n3.FileLoader(this._internalLoadingManager);
        (C.setResponseType('arraybuffer'),
          C.setRequestHeader(this.requestHeader),
          C.setPath(this.path),
          C.setWithCredentials(this.withCredentials),
          C.load(
            e,
            async (e) => {
              if ('string' == typeof e) throw Error('Invalid sdr buffer');
              ((o = e), await c());
            },
            (e) => {
              ((d = e.lengthComputable), (p = e.loaded), (f = e.total), b());
            },
            (t) => {
              (this.manager.itemError(e), 'function' == typeof i && i(t));
            }
          ));
        let y = new n3.FileLoader(this._internalLoadingManager);
        (y.setResponseType('arraybuffer'),
          y.setRequestHeader(this.requestHeader),
          y.setPath(this.path),
          y.setWithCredentials(this.withCredentials),
          y.load(
            t,
            async (e) => {
              if ('string' == typeof e) throw Error('Invalid gainmap buffer');
              ((l = e), await c());
            },
            (e) => {
              ((h = e.lengthComputable), (g = e.loaded), (m = e.total), b());
            },
            (e) => {
              (this.manager.itemError(t), 'function' == typeof i && i(e));
            }
          ));
        let x = new n3.FileLoader(this._internalLoadingManager);
        return (
          x.setRequestHeader(this.requestHeader),
          x.setPath(this.path),
          x.setWithCredentials(this.withCredentials),
          x.load(
            n,
            async (e) => {
              if ('string' != typeof e) throw Error('Invalid metadata string');
              ((s = JSON.parse(e)), await c());
            },
            (e) => {
              ((A = e.lengthComputable), (B = e.loaded), (v = e.total), b());
            },
            (e) => {
              (this.manager.itemError(n), 'function' == typeof i && i(e));
            }
          ),
          u
        );
      }
    }
    class n7 extends n6 {
      load(e, t, n, r) {
        let a = this.prepareQuadRenderer(),
          i = new n3.FileLoader(this._internalLoadingManager);
        return (
          i.setResponseType('arraybuffer'),
          i.setRequestHeader(this.requestHeader),
          i.setPath(this.path),
          i.setWithCredentials(this.withCredentials),
          this.manager.itemStart(e),
          i.load(
            e,
            async (n) => {
              let i, o, l;
              if ('string' == typeof n)
                throw Error(
                  'Invalid buffer, received [string], was expecting [ArrayBuffer]'
                );
              let s = new Uint8Array(n);
              try {
                let e = await n0(s);
                ((i = e.sdr), (o = e.gainMap), (l = e.metadata));
              } catch (t) {
                if (t instanceof nq || t instanceof nY)
                  (console.warn(
                    `Failure to reconstruct an HDR image from ${e}: Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg`
                  ),
                    (l = {
                      gainMapMin: [0, 0, 0],
                      gainMapMax: [1, 1, 1],
                      gamma: [1, 1, 1],
                      hdrCapacityMin: 0,
                      hdrCapacityMax: 1,
                      offsetHdr: [0, 0, 0],
                      offsetSdr: [0, 0, 0],
                    }),
                    (i = s));
                else throw t;
              }
              try {
                await this.render(a, l, i.buffer, o?.buffer);
              } catch (t) {
                (this.manager.itemError(e),
                  'function' == typeof r && r(t),
                  a.disposeOnDemandRenderer());
                return;
              }
              ('function' == typeof t && t(a),
                this.manager.itemEnd(e),
                a.disposeOnDemandRenderer());
            },
            n,
            (t) => {
              (this.manager.itemError(e), 'function' == typeof r && r(t));
            }
          ),
          a
        );
      }
    }
    let re = {
        apartment: 'lebombo_1k.hdr',
        city: 'potsdamer_platz_1k.hdr',
        dawn: 'kiara_1_dawn_1k.hdr',
        forest: 'forest_slope_1k.hdr',
        lobby: 'st_fagans_interior_1k.hdr',
        night: 'dikhololo_night_1k.hdr',
        park: 'rooitou_park_1k.hdr',
        studio: 'studio_small_03_1k.hdr',
        sunset: 'venice_sunset_1k.hdr',
        warehouse: 'empty_warehouse_01_1k.hdr',
      },
      rt =
        'https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/',
      rn = ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'];
    function rr({
      files: e = rn,
      path: t = '',
      preset: n,
      colorSpace: r,
      extensions: a,
    } = {}) {
      n && (ro(n), (e = re[n]), (t = rt));
      let i = Array.isArray(e),
        { extension: o, isCubemap: l } = rl(e),
        s = rs(o);
      if (!s) throw Error('useEnvironment: Unrecognized file extension: ' + e);
      let u = ev((e) => e.gl);
      (0, B.useLayoutEffect)(() => {
        ('webp' === o || 'jpg' === o || 'jpeg' === o) &&
          u.domElement.addEventListener(
            'webglcontextlost',
            function () {
              ey.clear(s, i ? [e] : e);
            },
            { once: !0 }
          );
      }, [e, u.domElement]);
      let c = ey(s, i ? [e] : e, (e) => {
          (('webp' === o || 'jpg' === o || 'jpeg' === o) && e.setRenderer(u),
            null == e.setPath || e.setPath(t),
            a && a(e));
        }),
        d = i ? c[0] : c;
      if ('jpg' === o || 'jpeg' === o || 'webp' === o) {
        var f;
        d = null == (f = d.renderTarget) ? void 0 : f.texture;
      }
      return (
        (d.mapping = l
          ? S.CubeReflectionMapping
          : S.EquirectangularReflectionMapping),
        (d.colorSpace = null != r ? r : l ? 'srgb' : 'srgb-linear'),
        d
      );
    }
    let ra = { files: rn, path: '', preset: void 0, extensions: void 0 };
    rr.preload = (e) => {
      let t = { ...ra, ...e },
        { files: n, path: r = '' } = t,
        { preset: a, extensions: i } = t;
      a && (ro(a), (n = re[a]), (r = rt));
      let { extension: o } = rl(n);
      if ('webp' === o || 'jpg' === o || 'jpeg' === o)
        throw Error('useEnvironment: Preloading gainmaps is not supported');
      let l = rs(o);
      if (!l) throw Error('useEnvironment: Unrecognized file extension: ' + n);
      ey.preload(l, Array.isArray(n) ? [n] : n, (e) => {
        (null == e.setPath || e.setPath(r), i && i(e));
      });
    };
    let ri = { files: rn, preset: void 0 };
    function ro(e) {
      if (!(e in re))
        throw Error('Preset must be one of: ' + Object.keys(re).join(', '));
    }
    function rl(e) {
      var t;
      let n = Array.isArray(e) && 6 === e.length,
        r =
          Array.isArray(e) &&
          3 === e.length &&
          e.some((e) => e.endsWith('json')),
        a = Array.isArray(e) ? e[0] : e;
      return {
        extension: n
          ? 'cube'
          : r
            ? 'webp'
            : a.startsWith('data:application/exr')
              ? 'exr'
              : a.startsWith('data:application/hdr')
                ? 'hdr'
                : a.startsWith('data:image/jpeg')
                  ? 'jpg'
                  : null == (t = a.split('.').pop()) ||
                      null == (t = t.split('?')) ||
                      null == (t = t.shift())
                    ? void 0
                    : t.toLowerCase(),
        isCubemap: n,
        isGainmap: r,
      };
    }
    function rs(e) {
      return 'cube' === e
        ? S.CubeTextureLoader
        : 'hdr' === e
          ? tl
          : 'exr' === e
            ? nQ
            : 'jpg' === e || 'jpeg' === e
              ? n7
              : 'webp' === e
                ? n5
                : null;
    }
    function ru(e, t, n, r, a = {}) {
      var i, o, l, s, u;
      let c;
      a = {
        backgroundBlurriness: 0,
        backgroundIntensity: 1,
        backgroundRotation: [0, 0, 0],
        environmentIntensity: 1,
        environmentRotation: [0, 0, 0],
        ...a,
      };
      let d = (c = u = t || n).current && c.current.isScene ? u.current : u,
        f = d.background,
        p = d.environment,
        h = {
          backgroundBlurriness: d.backgroundBlurriness,
          backgroundIntensity: d.backgroundIntensity,
          backgroundRotation:
            null !=
            (i =
              null == (o = d.backgroundRotation) || null == o.clone
                ? void 0
                : o.clone())
              ? i
              : [0, 0, 0],
          environmentIntensity: d.environmentIntensity,
          environmentRotation:
            null !=
            (l =
              null == (s = d.environmentRotation) || null == s.clone
                ? void 0
                : s.clone())
              ? l
              : [0, 0, 0],
        };
      return (
        'only' !== e && (d.environment = r),
        e && (d.background = r),
        eu(d, a),
        () => {
          ('only' !== e && (d.environment = p),
            e && (d.background = f),
            eu(d, h));
        }
      );
    }
    function rc({ scene: e, background: t = !1, map: n, ...r }) {
      let a = ev((e) => e.scene);
      return (
        B.useLayoutEffect(() => {
          if (n) return ru(t, e, a, n, r);
        }),
        null
      );
    }
    function rd({
      background: e = !1,
      scene: t,
      blur: n,
      backgroundBlurriness: r,
      backgroundIntensity: a,
      backgroundRotation: i,
      environmentIntensity: o,
      environmentRotation: l,
      ...s
    }) {
      let u = rr(s),
        c = ev((e) => e.scene);
      return (
        B.useLayoutEffect(() =>
          ru(e, t, c, u, {
            backgroundBlurriness: null != n ? n : r,
            backgroundIntensity: a,
            backgroundRotation: i,
            environmentIntensity: o,
            environmentRotation: l,
          })
        ),
        B.useEffect(
          () => () => {
            u.dispose();
          },
          [u]
        ),
        null
      );
    }
    function rf({
      children: e,
      near: t = 0.1,
      far: n = 1e3,
      resolution: r = 256,
      frames: a = 1,
      map: i,
      background: o = !1,
      blur: l,
      backgroundBlurriness: s,
      backgroundIntensity: u,
      backgroundRotation: c,
      environmentIntensity: d,
      environmentRotation: f,
      scene: p,
      files: h,
      path: m,
      preset: g,
      extensions: A,
    }) {
      var b;
      let C = ev((e) => e.gl),
        y = ev((e) => e.scene),
        x = B.useRef(null),
        [w] = B.useState(() => new S.Scene()),
        E = B.useMemo(() => {
          let e = new S.WebGLCubeRenderTarget(r);
          return ((e.texture.type = S.HalfFloatType), e);
        }, [r]);
      (B.useEffect(
        () => () => {
          E.dispose();
        },
        [E]
      ),
        B.useLayoutEffect(() => {
          if (1 === a) {
            let e = C.autoClear;
            ((C.autoClear = !0), x.current.update(C, w), (C.autoClear = e));
          }
          return ru(o, p, y, E.texture, {
            backgroundBlurriness: null != l ? l : s,
            backgroundIntensity: u,
            backgroundRotation: c,
            environmentIntensity: d,
            environmentRotation: f,
          });
        }, [e, w, E.texture, p, y, o, a, C]));
      let M = 1;
      return (
        eB(() => {
          if (a === 1 / 0 || M < a) {
            let e = C.autoClear;
            ((C.autoClear = !0),
              x.current.update(C, w),
              (C.autoClear = e),
              M++);
          }
        }),
        B.createElement(
          B.Fragment,
          null,
          ((b = B.createElement(
            B.Fragment,
            null,
            e,
            B.createElement('cubeCamera', { ref: x, args: [t, n, E] }),
            h || g
              ? B.createElement(rd, {
                  background: !0,
                  files: h,
                  preset: g,
                  path: m,
                  extensions: A,
                })
              : i
                ? B.createElement(rc, { background: !0, map: i, extensions: A })
                : null
          )),
          (0, v.jsx)(eX, { children: b, container: w, state: void 0 }))
        )
      );
    }
    function rp(e) {
      var t, n, r, a;
      let i = rr(e),
        o = e.map || i;
      (B.useMemo(() => eR({ GroundProjectedEnvImpl: ti }), []),
        B.useEffect(
          () => () => {
            i.dispose();
          },
          [i]
        ));
      let l = B.useMemo(() => [o], [o]),
        s = null == (t = e.ground) ? void 0 : t.height,
        u = null == (n = e.ground) ? void 0 : n.radius,
        c = null != (r = null == (a = e.ground) ? void 0 : a.scale) ? r : 1e3;
      return B.createElement(
        B.Fragment,
        null,
        B.createElement(rc, tn({}, e, { map: o })),
        B.createElement('groundProjectedEnvImpl', {
          args: l,
          scale: c,
          height: s,
          radius: u,
        })
      );
    }
    function rh(e) {
      return e.ground
        ? B.createElement(rp, e)
        : e.map
          ? B.createElement(rc, e)
          : e.children
            ? B.createElement(rf, e)
            : B.createElement(rd, e);
    }
    rr.clear = (e) => {
      let t = { ...ri, ...e },
        { files: n } = t,
        { preset: r } = t;
      r && (ro(r), (n = re[r]));
      let { extension: a } = rl(n),
        i = rs(a);
      if (!i) throw Error('useEnvironment: Unrecognized file extension: ' + n);
      ey.clear(i, Array.isArray(n) ? [n] : n);
    };
    var rm = e.i(62897);
    let rg = (0, b.cubicBezier)(0.22, 1, 0.36, 1),
      rA = ({ line: e, index: t, scrollYProgress: n, animationRange: r }) => {
        let a = (0, y.useTransform)(
          n,
          [r[0] + 0.02 * t, r[1] + 0.02 * t],
          ['-100%', '0%'],
          { ease: rg }
        );
        return (0, v.jsx)('div', {
          className: 'overflow-visible mb-1 md:mb-2 w-full',
          children: (0, v.jsx)(rm.motion.span, {
            style: { x: a },
            className:
              'block text-white font-h2 text-4xl md:text-6xl lg:text-[5.5vw] xl:text-[6.5vw] leading-none tracking-[-0.04em] text-left whitespace-pre-line select-none font-black italic max-w-fit pr-[0.15em] py-2',
            children: e,
          }),
        });
      },
      rv = ({ text: e, bgColor: t, isFirst: n = !1 }) => {
        let r = (0, B.useRef)(null),
          { scrollYProgress: a } = (0, C.useScroll)({
            target: r,
            offset: ['start end', 'end start'],
          }),
          i = n ? [0, 0.3] : [0.22, 0.45],
          o = n ? [0.9, 1] : [0.8, 0.95],
          l = (0, y.useTransform)(a, [i[0], i[1], o[0], o[1]], [0, 1, 1, 0]),
          s = (0, y.useTransform)(a, [0.7, 0.95], ['0vh', '-100vh']),
          u = e.split('\n');
        return (0, v.jsx)(rm.motion.section, {
          ref: r,
          'aria-label': e.replace(/\n/g, ' '),
          style: { backgroundColor: t },
          className: `relative w-full h-screen flex justify-start overflow-hidden ${n ? 'items-center pt-0' : 'items-start pt-[20vh] md:pt-[20vh] lg:pt-[15vh]'}`,
          children: (0, v.jsx)('div', {
            className: 'std-grid max-w-none',
            children: (0, v.jsx)(rm.motion.div, {
              style: { y: s, opacity: l },
              className: 'relative z-30 w-full flex flex-col justify-start',
              children: u.map((e, t) =>
                (0, v.jsx)(
                  rA,
                  { line: e, index: t, scrollYProgress: a, animationRange: i },
                  t
                )
              ),
            }),
          }),
        });
      },
      rB = ({ bgColor: e, scrollProgress: t }) => {
        let n = (0, B.useRef)(null),
          r = (0, y.useTransform)(t, [0.85, 0.95], [0, 1]),
          a = (0, y.useTransform)(t, [0.85, 0.95], [0.95, 1]),
          i = (0, y.useTransform)(t, [0.85, 0.95], ['blur(10px)', 'blur(0px)']);
        return (0, v.jsx)(rm.motion.section, {
          ref: n,
          className: 'w-full h-screen overflow-hidden',
          style: { backgroundColor: e },
          children: (0, v.jsx)(rm.motion.div, {
            style: { opacity: r, scale: a, filter: i },
            className:
              'std-grid relative flex h-full w-full flex-col justify-center pointer-events-none z-20',
            children: (0, v.jsxs)('div', {
              className:
                'w-full flex flex-col space-y-0 md:-space-y-4 lg:-space-y-8 font-display font-black uppercase text-white leading-none',
              children: [
                (0, v.jsxs)('div', {
                  className:
                    'w-full flex justify-between items-center text-[18vw] md:text-[14vw] tracking-tighter',
                  children: [
                    (0, v.jsx)('span', { children: 'I' }),
                    (0, v.jsx)('span', { children: 'S' }),
                    (0, v.jsx)('span', { children: 'S' }),
                    (0, v.jsx)('span', { children: 'O' }),
                    (0, v.jsx)('span', { className: 'w-[0.5em] inline-block' }),
                    ' ',
                    (0, v.jsx)('span', { children: 'É' }),
                  ],
                }),
                (0, v.jsxs)('div', {
                  className:
                    'w-full flex justify-between items-center text-[18vw] md:text-[14vw] tracking-tighter',
                  children: [
                    (0, v.jsx)('span', { children: 'G' }),
                    (0, v.jsx)('span', { children: 'H' }),
                    (0, v.jsx)('span', { children: 'O' }),
                    (0, v.jsx)('span', { children: 'S' }),
                    (0, v.jsx)('span', { children: 'T' }),
                  ],
                }),
                (0, v.jsxs)('div', {
                  className:
                    'w-full flex justify-between items-center text-[18vw] md:text-[14vw] tracking-tighter',
                  children: [
                    (0, v.jsx)('span', { children: 'D' }),
                    (0, v.jsx)('span', { children: 'E' }),
                    (0, v.jsx)('span', { children: 'S' }),
                    (0, v.jsx)('span', { children: 'I' }),
                    (0, v.jsx)('span', { children: 'G' }),
                    (0, v.jsx)('span', { children: 'N' }),
                    (0, v.jsx)('span', { children: '.' }),
                  ],
                }),
              ],
            }),
          }),
        });
      },
      rb = ({ children: e, progress: t, range: n, className: r }) => {
        let a = (0, b.cubicBezier)(0.22, 1, 0.36, 1),
          i = (0, y.useTransform)(t, n, ['blur(12px)', 'blur(0px)'], {
            ease: a,
          }),
          o = (0, y.useTransform)(t, n, [0, 1], { ease: a }),
          l = (0, y.useTransform)(t, n, [40, 0], { ease: a });
        return (0, v.jsx)(rm.motion.span, {
          style: { filter: i, opacity: o, y: l },
          className: `block ${r || ''}`,
          children: e,
        });
      },
      rC = ({ opacity: e, progress: t }) =>
        (0, v.jsx)(rm.motion.header, {
          style: { opacity: e },
          className:
            'sticky top-0 z-30 flex h-screen items-center pointer-events-none',
          children: (0, v.jsx)('div', {
            className: 'std-grid w-full flex justify-end',
            children: (0, v.jsxs)('div', {
              className:
                'flex flex-col items-end text-right w-full max-w-[320px] md:max-w-[500px] lg:max-w-[750px]',
              children: [
                (0, v.jsxs)('h1', {
                  className:
                    'text-white text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-display leading-[1.1] tracking-tighter mb-8 uppercase font-black mix-blend-difference whitespace-nowrap',
                  children: [
                    (0, v.jsx)('div', {
                      className: 'overflow-visible',
                      children: (0, v.jsx)(rb, {
                        progress: t,
                        range: [0.1, 0.2],
                        children: 'Acredito no',
                      }),
                    }),
                    (0, v.jsx)('div', {
                      className: 'overflow-visible',
                      children: (0, v.jsx)(rb, {
                        progress: t,
                        range: [0.12, 0.22],
                        children: 'design que',
                      }),
                    }),
                    (0, v.jsx)('div', {
                      className: 'overflow-visible',
                      children: (0, v.jsx)(rb, {
                        progress: t,
                        range: [0.14, 0.24],
                        children: 'muda o dia',
                      }),
                    }),
                    (0, v.jsx)('div', {
                      className: 'overflow-visible',
                      children: (0, v.jsx)(rb, {
                        progress: t,
                        range: [0.16, 0.26],
                        children: 'de alguém.',
                      }),
                    }),
                  ],
                }),
                (0, v.jsxs)('div', {
                  className:
                    'flex flex-col items-end gap-1 text-white text-sm md:text-2xl lg:text-4xl font-h2 leading-[1.2] tracking-normal font-bold whitespace-nowrap',
                  children: [
                    (0, v.jsx)('div', {
                      className: 'overflow-visible',
                      children: (0, v.jsx)(rb, {
                        progress: t,
                        range: [0.22, 0.32],
                        children: 'Não pelo choque,',
                      }),
                    }),
                    (0, v.jsx)('div', {
                      className: 'overflow-visible',
                      children: (0, v.jsx)(rb, {
                        progress: t,
                        range: [0.24, 0.34],
                        children: 'mas pela conexão.',
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        });
    var ry = S;
    function rx(e, t) {
      if (t === S.TrianglesDrawMode)
        return (
          console.warn(
            'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.'
          ),
          e
        );
      if (t !== S.TriangleFanDrawMode && t !== S.TriangleStripDrawMode)
        return (
          console.error(
            'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:',
            t
          ),
          e
        );
      {
        let n = e.getIndex();
        if (null === n) {
          let t = [],
            r = e.getAttribute('position');
          if (void 0 === r)
            return (
              console.error(
                'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.'
              ),
              e
            );
          for (let e = 0; e < r.count; e++) t.push(e);
          (e.setIndex(t), (n = e.getIndex()));
        }
        let r = n.count - 2,
          a = [];
        if (n)
          if (t === S.TriangleFanDrawMode)
            for (let e = 1; e <= r; e++)
              (a.push(n.getX(0)), a.push(n.getX(e)), a.push(n.getX(e + 1)));
          else
            for (let e = 0; e < r; e++)
              e % 2 == 0
                ? (a.push(n.getX(e)),
                  a.push(n.getX(e + 1)),
                  a.push(n.getX(e + 2)))
                : (a.push(n.getX(e + 2)),
                  a.push(n.getX(e + 1)),
                  a.push(n.getX(e)));
        a.length / 3 !== r &&
          console.error(
            'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.'
          );
        let i = e.clone();
        return (i.setIndex(a), i.clearGroups(), i);
      }
    }
    function rw(e) {
      if ('u' > typeof TextDecoder) return new TextDecoder().decode(e);
      let t = '';
      for (let n = 0, r = e.length; n < r; n++) t += String.fromCharCode(e[n]);
      try {
        return decodeURIComponent(escape(t));
      } catch (e) {
        return t;
      }
    }
    let rS = 'srgb',
      rE = 'srgb-linear';
    class rM extends ry.Loader {
      constructor(e) {
        (super(e),
          (this.dracoLoader = null),
          (this.ktx2Loader = null),
          (this.meshoptDecoder = null),
          (this.pluginCallbacks = []),
          this.register(function (e) {
            return new rD(e);
          }),
          this.register(function (e) {
            return new r_(e);
          }),
          this.register(function (e) {
            return new rJ(e);
          }),
          this.register(function (e) {
            return new rz(e);
          }),
          this.register(function (e) {
            return new rK(e);
          }),
          this.register(function (e) {
            return new rP(e);
          }),
          this.register(function (e) {
            return new rL(e);
          }),
          this.register(function (e) {
            return new rN(e);
          }),
          this.register(function (e) {
            return new rH(e);
          }),
          this.register(function (e) {
            return new rG(e);
          }),
          this.register(function (e) {
            return new rU(e);
          }),
          this.register(function (e) {
            return new rk(e);
          }),
          this.register(function (e) {
            return new rj(e);
          }),
          this.register(function (e) {
            return new rO(e);
          }),
          this.register(function (e) {
            return new rR(e);
          }),
          this.register(function (e) {
            return new rQ(e);
          }),
          this.register(function (e) {
            return new rX(e);
          }));
      }
      load(e, t, n, r) {
        let a,
          i = this;
        if ('' !== this.resourcePath) a = this.resourcePath;
        else if ('' !== this.path) {
          let t = ry.LoaderUtils.extractUrlBase(e);
          a = ry.LoaderUtils.resolveURL(t, this.path);
        } else a = ry.LoaderUtils.extractUrlBase(e);
        this.manager.itemStart(e);
        let o = function (t) {
            (r ? r(t) : console.error(t),
              i.manager.itemError(e),
              i.manager.itemEnd(e));
          },
          l = new ry.FileLoader(this.manager);
        (l.setPath(this.path),
          l.setResponseType('arraybuffer'),
          l.setRequestHeader(this.requestHeader),
          l.setWithCredentials(this.withCredentials),
          l.load(
            e,
            function (n) {
              try {
                i.parse(
                  n,
                  a,
                  function (n) {
                    (t(n), i.manager.itemEnd(e));
                  },
                  o
                );
              } catch (e) {
                o(e);
              }
            },
            n,
            o
          ));
      }
      setDRACOLoader(e) {
        return ((this.dracoLoader = e), this);
      }
      setDDSLoader() {
        throw Error(
          'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
        );
      }
      setKTX2Loader(e) {
        return ((this.ktx2Loader = e), this);
      }
      setMeshoptDecoder(e) {
        return ((this.meshoptDecoder = e), this);
      }
      register(e) {
        return (
          -1 === this.pluginCallbacks.indexOf(e) &&
            this.pluginCallbacks.push(e),
          this
        );
      }
      unregister(e) {
        return (
          -1 !== this.pluginCallbacks.indexOf(e) &&
            this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1),
          this
        );
      }
      parse(e, t, n, r) {
        let a,
          i = {},
          o = {};
        if ('string' == typeof e) a = JSON.parse(e);
        else if (e instanceof ArrayBuffer)
          if (rw(new Uint8Array(e.slice(0, 4))) === rV) {
            try {
              i[rT.KHR_BINARY_GLTF] = new rW(e);
            } catch (e) {
              r && r(e);
              return;
            }
            a = JSON.parse(i[rT.KHR_BINARY_GLTF].content);
          } else a = JSON.parse(rw(new Uint8Array(e)));
        else a = e;
        if (void 0 === a.asset || a.asset.version[0] < 2) {
          r &&
            r(
              Error(
                'THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.'
              )
            );
          return;
        }
        let l = new ai(a, {
          path: t || this.resourcePath || '',
          crossOrigin: this.crossOrigin,
          requestHeader: this.requestHeader,
          manager: this.manager,
          ktx2Loader: this.ktx2Loader,
          meshoptDecoder: this.meshoptDecoder,
        });
        l.fileLoader.setRequestHeader(this.requestHeader);
        for (let e = 0; e < this.pluginCallbacks.length; e++) {
          let t = this.pluginCallbacks[e](l);
          (t.name ||
            console.error(
              'THREE.GLTFLoader: Invalid plugin found: missing name'
            ),
            (o[t.name] = t),
            (i[t.name] = !0));
        }
        if (a.extensionsUsed)
          for (let e = 0; e < a.extensionsUsed.length; ++e) {
            let t = a.extensionsUsed[e],
              n = a.extensionsRequired || [];
            switch (t) {
              case rT.KHR_MATERIALS_UNLIT:
                i[t] = new rI();
                break;
              case rT.KHR_DRACO_MESH_COMPRESSION:
                i[t] = new rY(a, this.dracoLoader);
                break;
              case rT.KHR_TEXTURE_TRANSFORM:
                i[t] = new rq();
                break;
              case rT.KHR_MESH_QUANTIZATION:
                i[t] = new rZ();
                break;
              default:
                n.indexOf(t) >= 0 &&
                  void 0 === o[t] &&
                  console.warn(
                    'THREE.GLTFLoader: Unknown extension "' + t + '".'
                  );
            }
          }
        (l.setExtensions(i), l.setPlugins(o), l.parse(n, r));
      }
      parseAsync(e, t) {
        let n = this;
        return new Promise(function (r, a) {
          n.parse(e, t, r, a);
        });
      }
    }
    function rF() {
      let e = {};
      return {
        get: function (t) {
          return e[t];
        },
        add: function (t, n) {
          e[t] = n;
        },
        remove: function (t) {
          delete e[t];
        },
        removeAll: function () {
          e = {};
        },
      };
    }
    let rT = {
      KHR_BINARY_GLTF: 'KHR_binary_glTF',
      KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
      KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
      KHR_MATERIALS_CLEARCOAT: 'KHR_materials_clearcoat',
      KHR_MATERIALS_DISPERSION: 'KHR_materials_dispersion',
      KHR_MATERIALS_IOR: 'KHR_materials_ior',
      KHR_MATERIALS_SHEEN: 'KHR_materials_sheen',
      KHR_MATERIALS_SPECULAR: 'KHR_materials_specular',
      KHR_MATERIALS_TRANSMISSION: 'KHR_materials_transmission',
      KHR_MATERIALS_IRIDESCENCE: 'KHR_materials_iridescence',
      KHR_MATERIALS_ANISOTROPY: 'KHR_materials_anisotropy',
      KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
      KHR_MATERIALS_VOLUME: 'KHR_materials_volume',
      KHR_TEXTURE_BASISU: 'KHR_texture_basisu',
      KHR_TEXTURE_TRANSFORM: 'KHR_texture_transform',
      KHR_MESH_QUANTIZATION: 'KHR_mesh_quantization',
      KHR_MATERIALS_EMISSIVE_STRENGTH: 'KHR_materials_emissive_strength',
      EXT_MATERIALS_BUMP: 'EXT_materials_bump',
      EXT_TEXTURE_WEBP: 'EXT_texture_webp',
      EXT_TEXTURE_AVIF: 'EXT_texture_avif',
      EXT_MESHOPT_COMPRESSION: 'EXT_meshopt_compression',
      EXT_MESH_GPU_INSTANCING: 'EXT_mesh_gpu_instancing',
    };
    class rR {
      constructor(e) {
        ((this.parser = e),
          (this.name = rT.KHR_LIGHTS_PUNCTUAL),
          (this.cache = { refs: {}, uses: {} }));
      }
      _markDefs() {
        let e = this.parser,
          t = this.parser.json.nodes || [];
        for (let n = 0, r = t.length; n < r; n++) {
          let r = t[n];
          r.extensions &&
            r.extensions[this.name] &&
            void 0 !== r.extensions[this.name].light &&
            e._addNodeRef(this.cache, r.extensions[this.name].light);
        }
      }
      _loadLight(e) {
        let t,
          n = this.parser,
          r = 'light:' + e,
          a = n.cache.get(r);
        if (a) return a;
        let i = n.json,
          o = (((i.extensions && i.extensions[this.name]) || {}).lights || [])[
            e
          ],
          l = new ry.Color(0xffffff);
        void 0 !== o.color && l.setRGB(o.color[0], o.color[1], o.color[2], rE);
        let s = void 0 !== o.range ? o.range : 0;
        switch (o.type) {
          case 'directional':
            ((t = new ry.DirectionalLight(l)).target.position.set(0, 0, -1),
              t.add(t.target));
            break;
          case 'point':
            (t = new ry.PointLight(l)).distance = s;
            break;
          case 'spot':
            (((t = new ry.SpotLight(l)).distance = s),
              (o.spot = o.spot || {}),
              (o.spot.innerConeAngle =
                void 0 !== o.spot.innerConeAngle ? o.spot.innerConeAngle : 0),
              (o.spot.outerConeAngle =
                void 0 !== o.spot.outerConeAngle
                  ? o.spot.outerConeAngle
                  : Math.PI / 4),
              (t.angle = o.spot.outerConeAngle),
              (t.penumbra = 1 - o.spot.innerConeAngle / o.spot.outerConeAngle),
              t.target.position.set(0, 0, -1),
              t.add(t.target));
            break;
          default:
            throw Error('THREE.GLTFLoader: Unexpected light type: ' + o.type);
        }
        return (
          t.position.set(0, 0, 0),
          (t.decay = 2),
          at(t, o),
          void 0 !== o.intensity && (t.intensity = o.intensity),
          (t.name = n.createUniqueName(o.name || 'light_' + e)),
          (a = Promise.resolve(t)),
          n.cache.add(r, a),
          a
        );
      }
      getDependency(e, t) {
        if ('light' === e) return this._loadLight(t);
      }
      createNodeAttachment(e) {
        let t = this,
          n = this.parser,
          r = n.json.nodes[e],
          a = ((r.extensions && r.extensions[this.name]) || {}).light;
        return void 0 === a
          ? null
          : this._loadLight(a).then(function (e) {
              return n._getNodeRef(t.cache, a, e);
            });
      }
    }
    class rI {
      constructor() {
        this.name = rT.KHR_MATERIALS_UNLIT;
      }
      getMaterialType() {
        return ry.MeshBasicMaterial;
      }
      extendParams(e, t, n) {
        let r = [];
        ((e.color = new ry.Color(1, 1, 1)), (e.opacity = 1));
        let a = t.pbrMetallicRoughness;
        if (a) {
          if (Array.isArray(a.baseColorFactor)) {
            let t = a.baseColorFactor;
            (e.color.setRGB(t[0], t[1], t[2], rE), (e.opacity = t[3]));
          }
          void 0 !== a.baseColorTexture &&
            r.push(n.assignTexture(e, 'map', a.baseColorTexture, rS));
        }
        return Promise.all(r);
      }
    }
    class rG {
      constructor(e) {
        ((this.parser = e), (this.name = rT.KHR_MATERIALS_EMISSIVE_STRENGTH));
      }
      extendMaterialParams(e, t) {
        let n = this.parser.json.materials[e];
        if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
        let r = n.extensions[this.name].emissiveStrength;
        return (void 0 !== r && (t.emissiveIntensity = r), Promise.resolve());
      }
    }
    class rD {
      constructor(e) {
        ((this.parser = e), (this.name = rT.KHR_MATERIALS_CLEARCOAT));
      }
      getMaterialType(e) {
        let t = this.parser.json.materials[e];
        return t.extensions && t.extensions[this.name]
          ? ry.MeshPhysicalMaterial
          : null;
      }
      extendMaterialParams(e, t) {
        let n = this.parser,
          r = n.json.materials[e];
        if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
        let a = [],
          i = r.extensions[this.name];
        if (
          (void 0 !== i.clearcoatFactor && (t.clearcoat = i.clearcoatFactor),
          void 0 !== i.clearcoatTexture &&
            a.push(n.assignTexture(t, 'clearcoatMap', i.clearcoatTexture)),
          void 0 !== i.clearcoatRoughnessFactor &&
            (t.clearcoatRoughness = i.clearcoatRoughnessFactor),
          void 0 !== i.clearcoatRoughnessTexture &&
            a.push(
              n.assignTexture(
                t,
                'clearcoatRoughnessMap',
                i.clearcoatRoughnessTexture
              )
            ),
          void 0 !== i.clearcoatNormalTexture &&
            (a.push(
              n.assignTexture(t, 'clearcoatNormalMap', i.clearcoatNormalTexture)
            ),
            void 0 !== i.clearcoatNormalTexture.scale))
        ) {
          let e = i.clearcoatNormalTexture.scale;
          t.clearcoatNormalScale = new ry.Vector2(e, e);
        }
        return Promise.all(a);
      }
    }
    class r_ {
      constructor(e) {
        ((this.parser = e), (this.name = rT.KHR_MATERIALS_DISPERSION));
      }
      getMaterialType(e) {
        let t = this.parser.json.materials[e];
        return t.extensions && t.extensions[this.name]
          ? ry.MeshPhysicalMaterial
          : null;
      }
      extendMaterialParams(e, t) {
        let n = this.parser.json.materials[e];
        if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
        let r = n.extensions[this.name];
        return (
          (t.dispersion = void 0 !== r.dispersion ? r.dispersion : 0),
          Promise.resolve()
        );
      }
    }
    class rk {
      constructor(e) {
        ((this.parser = e), (this.name = rT.KHR_MATERIALS_IRIDESCENCE));
      }
      getMaterialType(e) {
        let t = this.parser.json.materials[e];
        return t.extensions && t.extensions[this.name]
          ? ry.MeshPhysicalMaterial
          : null;
      }
      extendMaterialParams(e, t) {
        let n = this.parser,
          r = n.json.materials[e];
        if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
        let a = [],
          i = r.extensions[this.name];
        return (
          void 0 !== i.iridescenceFactor &&
            (t.iridescence = i.iridescenceFactor),
          void 0 !== i.iridescenceTexture &&
            a.push(n.assignTexture(t, 'iridescenceMap', i.iridescenceTexture)),
          void 0 !== i.iridescenceIor && (t.iridescenceIOR = i.iridescenceIor),
          void 0 === t.iridescenceThicknessRange &&
            (t.iridescenceThicknessRange = [100, 400]),
          void 0 !== i.iridescenceThicknessMinimum &&
            (t.iridescenceThicknessRange[0] = i.iridescenceThicknessMinimum),
          void 0 !== i.iridescenceThicknessMaximum &&
            (t.iridescenceThicknessRange[1] = i.iridescenceThicknessMaximum),
          void 0 !== i.iridescenceThicknessTexture &&
            a.push(
              n.assignTexture(
                t,
                'iridescenceThicknessMap',
                i.iridescenceThicknessTexture
              )
            ),
          Promise.all(a)
        );
      }
    }
    class rP {
      constructor(e) {
        ((this.parser = e), (this.name = rT.KHR_MATERIALS_SHEEN));
      }
      getMaterialType(e) {
        let t = this.parser.json.materials[e];
        return t.extensions && t.extensions[this.name]
          ? ry.MeshPhysicalMaterial
          : null;
      }
      extendMaterialParams(e, t) {
        let n = this.parser,
          r = n.json.materials[e];
        if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
        let a = [];
        ((t.sheenColor = new ry.Color(0, 0, 0)),
          (t.sheenRoughness = 0),
          (t.sheen = 1));
        let i = r.extensions[this.name];
        if (void 0 !== i.sheenColorFactor) {
          let e = i.sheenColorFactor;
          t.sheenColor.setRGB(e[0], e[1], e[2], rE);
        }
        return (
          void 0 !== i.sheenRoughnessFactor &&
            (t.sheenRoughness = i.sheenRoughnessFactor),
          void 0 !== i.sheenColorTexture &&
            a.push(
              n.assignTexture(t, 'sheenColorMap', i.sheenColorTexture, rS)
            ),
          void 0 !== i.sheenRoughnessTexture &&
            a.push(
              n.assignTexture(t, 'sheenRoughnessMap', i.sheenRoughnessTexture)
            ),
          Promise.all(a)
        );
      }
    }
    class rL {
      constructor(e) {
        ((this.parser = e), (this.name = rT.KHR_MATERIALS_TRANSMISSION));
      }
      getMaterialType(e) {
        let t = this.parser.json.materials[e];
        return t.extensions && t.extensions[this.name]
          ? ry.MeshPhysicalMaterial
          : null;
      }
      extendMaterialParams(e, t) {
        let n = this.parser,
          r = n.json.materials[e];
        if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
        let a = [],
          i = r.extensions[this.name];
        return (
          void 0 !== i.transmissionFactor &&
            (t.transmission = i.transmissionFactor),
          void 0 !== i.transmissionTexture &&
            a.push(
              n.assignTexture(t, 'transmissionMap', i.transmissionTexture)
            ),
          Promise.all(a)
        );
      }
    }
    class rN {
      constructor(e) {
        ((this.parser = e), (this.name = rT.KHR_MATERIALS_VOLUME));
      }
      getMaterialType(e) {
        let t = this.parser.json.materials[e];
        return t.extensions && t.extensions[this.name]
          ? ry.MeshPhysicalMaterial
          : null;
      }
      extendMaterialParams(e, t) {
        let n = this.parser,
          r = n.json.materials[e];
        if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
        let a = [],
          i = r.extensions[this.name];
        ((t.thickness = void 0 !== i.thicknessFactor ? i.thicknessFactor : 0),
          void 0 !== i.thicknessTexture &&
            a.push(n.assignTexture(t, 'thicknessMap', i.thicknessTexture)),
          (t.attenuationDistance = i.attenuationDistance || 1 / 0));
        let o = i.attenuationColor || [1, 1, 1];
        return (
          (t.attenuationColor = new ry.Color().setRGB(o[0], o[1], o[2], rE)),
          Promise.all(a)
        );
      }
    }
    class rH {
      constructor(e) {
        ((this.parser = e), (this.name = rT.KHR_MATERIALS_IOR));
      }
      getMaterialType(e) {
        let t = this.parser.json.materials[e];
        return t.extensions && t.extensions[this.name]
          ? ry.MeshPhysicalMaterial
          : null;
      }
      extendMaterialParams(e, t) {
        let n = this.parser.json.materials[e];
        if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
        let r = n.extensions[this.name];
        return ((t.ior = void 0 !== r.ior ? r.ior : 1.5), Promise.resolve());
      }
    }
    class rU {
      constructor(e) {
        ((this.parser = e), (this.name = rT.KHR_MATERIALS_SPECULAR));
      }
      getMaterialType(e) {
        let t = this.parser.json.materials[e];
        return t.extensions && t.extensions[this.name]
          ? ry.MeshPhysicalMaterial
          : null;
      }
      extendMaterialParams(e, t) {
        let n = this.parser,
          r = n.json.materials[e];
        if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
        let a = [],
          i = r.extensions[this.name];
        ((t.specularIntensity =
          void 0 !== i.specularFactor ? i.specularFactor : 1),
          void 0 !== i.specularTexture &&
            a.push(
              n.assignTexture(t, 'specularIntensityMap', i.specularTexture)
            ));
        let o = i.specularColorFactor || [1, 1, 1];
        return (
          (t.specularColor = new ry.Color().setRGB(o[0], o[1], o[2], rE)),
          void 0 !== i.specularColorTexture &&
            a.push(
              n.assignTexture(t, 'specularColorMap', i.specularColorTexture, rS)
            ),
          Promise.all(a)
        );
      }
    }
    class rO {
      constructor(e) {
        ((this.parser = e), (this.name = rT.EXT_MATERIALS_BUMP));
      }
      getMaterialType(e) {
        let t = this.parser.json.materials[e];
        return t.extensions && t.extensions[this.name]
          ? ry.MeshPhysicalMaterial
          : null;
      }
      extendMaterialParams(e, t) {
        let n = this.parser,
          r = n.json.materials[e];
        if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
        let a = [],
          i = r.extensions[this.name];
        return (
          (t.bumpScale = void 0 !== i.bumpFactor ? i.bumpFactor : 1),
          void 0 !== i.bumpTexture &&
            a.push(n.assignTexture(t, 'bumpMap', i.bumpTexture)),
          Promise.all(a)
        );
      }
    }
    class rj {
      constructor(e) {
        ((this.parser = e), (this.name = rT.KHR_MATERIALS_ANISOTROPY));
      }
      getMaterialType(e) {
        let t = this.parser.json.materials[e];
        return t.extensions && t.extensions[this.name]
          ? ry.MeshPhysicalMaterial
          : null;
      }
      extendMaterialParams(e, t) {
        let n = this.parser,
          r = n.json.materials[e];
        if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
        let a = [],
          i = r.extensions[this.name];
        return (
          void 0 !== i.anisotropyStrength &&
            (t.anisotropy = i.anisotropyStrength),
          void 0 !== i.anisotropyRotation &&
            (t.anisotropyRotation = i.anisotropyRotation),
          void 0 !== i.anisotropyTexture &&
            a.push(n.assignTexture(t, 'anisotropyMap', i.anisotropyTexture)),
          Promise.all(a)
        );
      }
    }
    class rJ {
      constructor(e) {
        ((this.parser = e), (this.name = rT.KHR_TEXTURE_BASISU));
      }
      loadTexture(e) {
        let t = this.parser,
          n = t.json,
          r = n.textures[e];
        if (!r.extensions || !r.extensions[this.name]) return null;
        let a = r.extensions[this.name],
          i = t.options.ktx2Loader;
        if (!i)
          if (
            !(
              n.extensionsRequired &&
              n.extensionsRequired.indexOf(this.name) >= 0
            )
          )
            return null;
          else
            throw Error(
              'THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures'
            );
        return t.loadTextureImage(e, a.source, i);
      }
    }
    class rz {
      constructor(e) {
        ((this.parser = e),
          (this.name = rT.EXT_TEXTURE_WEBP),
          (this.isSupported = null));
      }
      loadTexture(e) {
        let t = this.name,
          n = this.parser,
          r = n.json,
          a = r.textures[e];
        if (!a.extensions || !a.extensions[t]) return null;
        let i = a.extensions[t],
          o = r.images[i.source],
          l = n.textureLoader;
        if (o.uri) {
          let e = n.options.manager.getHandler(o.uri);
          null !== e && (l = e);
        }
        return this.detectSupport().then(function (a) {
          if (a) return n.loadTextureImage(e, i.source, l);
          if (r.extensionsRequired && r.extensionsRequired.indexOf(t) >= 0)
            throw Error(
              'THREE.GLTFLoader: WebP required by asset but unsupported.'
            );
          return n.loadTexture(e);
        });
      }
      detectSupport() {
        return (
          this.isSupported ||
            (this.isSupported = new Promise(function (e) {
              let t = new Image();
              ((t.src =
                'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'),
                (t.onload = t.onerror =
                  function () {
                    e(1 === t.height);
                  }));
            })),
          this.isSupported
        );
      }
    }
    class rK {
      constructor(e) {
        ((this.parser = e),
          (this.name = rT.EXT_TEXTURE_AVIF),
          (this.isSupported = null));
      }
      loadTexture(e) {
        let t = this.name,
          n = this.parser,
          r = n.json,
          a = r.textures[e];
        if (!a.extensions || !a.extensions[t]) return null;
        let i = a.extensions[t],
          o = r.images[i.source],
          l = n.textureLoader;
        if (o.uri) {
          let e = n.options.manager.getHandler(o.uri);
          null !== e && (l = e);
        }
        return this.detectSupport().then(function (a) {
          if (a) return n.loadTextureImage(e, i.source, l);
          if (r.extensionsRequired && r.extensionsRequired.indexOf(t) >= 0)
            throw Error(
              'THREE.GLTFLoader: AVIF required by asset but unsupported.'
            );
          return n.loadTexture(e);
        });
      }
      detectSupport() {
        return (
          this.isSupported ||
            (this.isSupported = new Promise(function (e) {
              let t = new Image();
              ((t.src =
                'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI='),
                (t.onload = t.onerror =
                  function () {
                    e(1 === t.height);
                  }));
            })),
          this.isSupported
        );
      }
    }
    class rQ {
      constructor(e) {
        ((this.name = rT.EXT_MESHOPT_COMPRESSION), (this.parser = e));
      }
      loadBufferView(e) {
        let t = this.parser.json,
          n = t.bufferViews[e];
        if (!n.extensions || !n.extensions[this.name]) return null;
        {
          let e = n.extensions[this.name],
            r = this.parser.getDependency('buffer', e.buffer),
            a = this.parser.options.meshoptDecoder;
          if (!a || !a.supported)
            if (
              !(
                t.extensionsRequired &&
                t.extensionsRequired.indexOf(this.name) >= 0
              )
            )
              return null;
            else
              throw Error(
                'THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files'
              );
          return r.then(function (t) {
            let n = e.byteOffset || 0,
              r = e.byteLength || 0,
              i = e.count,
              o = e.byteStride,
              l = new Uint8Array(t, n, r);
            return a.decodeGltfBufferAsync
              ? a
                  .decodeGltfBufferAsync(i, o, l, e.mode, e.filter)
                  .then(function (e) {
                    return e.buffer;
                  })
              : a.ready.then(function () {
                  let t = new ArrayBuffer(i * o);
                  return (
                    a.decodeGltfBuffer(
                      new Uint8Array(t),
                      i,
                      o,
                      l,
                      e.mode,
                      e.filter
                    ),
                    t
                  );
                });
          });
        }
      }
    }
    class rX {
      constructor(e) {
        ((this.name = rT.EXT_MESH_GPU_INSTANCING), (this.parser = e));
      }
      createNodeMesh(e) {
        let t = this.parser.json,
          n = t.nodes[e];
        if (!n.extensions || !n.extensions[this.name] || void 0 === n.mesh)
          return null;
        for (let e of t.meshes[n.mesh].primitives)
          if (
            e.mode !== r2.TRIANGLES &&
            e.mode !== r2.TRIANGLE_STRIP &&
            e.mode !== r2.TRIANGLE_FAN &&
            void 0 !== e.mode
          )
            return null;
        let r = n.extensions[this.name].attributes,
          a = [],
          i = {};
        for (let e in r)
          a.push(
            this.parser
              .getDependency('accessor', r[e])
              .then((t) => ((i[e] = t), i[e]))
          );
        return a.length < 1
          ? null
          : (a.push(this.parser.createNodeMesh(e)),
            Promise.all(a).then((e) => {
              let t = e.pop(),
                n = t.isGroup ? t.children : [t],
                r = e[0].count,
                a = [];
              for (let e of n) {
                let t = new ry.Matrix4(),
                  n = new ry.Vector3(),
                  o = new ry.Quaternion(),
                  l = new ry.Vector3(1, 1, 1),
                  s = new ry.InstancedMesh(e.geometry, e.material, r);
                for (let e = 0; e < r; e++)
                  (i.TRANSLATION && n.fromBufferAttribute(i.TRANSLATION, e),
                    i.ROTATION && o.fromBufferAttribute(i.ROTATION, e),
                    i.SCALE && l.fromBufferAttribute(i.SCALE, e),
                    s.setMatrixAt(e, t.compose(n, o, l)));
                for (let t in i)
                  if ('_COLOR_0' === t) {
                    let e = i[t];
                    s.instanceColor = new ry.InstancedBufferAttribute(
                      e.array,
                      e.itemSize,
                      e.normalized
                    );
                  } else
                    'TRANSLATION' !== t &&
                      'ROTATION' !== t &&
                      'SCALE' !== t &&
                      e.geometry.setAttribute(t, i[t]);
                (ry.Object3D.prototype.copy.call(s, e),
                  this.parser.assignFinalMaterial(s),
                  a.push(s));
              }
              return t.isGroup ? (t.clear(), t.add(...a), t) : a[0];
            }));
      }
    }
    let rV = 'glTF';
    class rW {
      constructor(e) {
        ((this.name = rT.KHR_BINARY_GLTF),
          (this.content = null),
          (this.body = null));
        const t = new DataView(e, 0, 12);
        if (
          ((this.header = {
            magic: rw(new Uint8Array(e.slice(0, 4))),
            version: t.getUint32(4, !0),
            length: t.getUint32(8, !0),
          }),
          this.header.magic !== rV)
        )
          throw Error('THREE.GLTFLoader: Unsupported glTF-Binary header.');
        if (this.header.version < 2)
          throw Error('THREE.GLTFLoader: Legacy binary file detected.');
        const n = this.header.length - 12,
          r = new DataView(e, 12);
        let a = 0;
        for (; a < n; ) {
          const t = r.getUint32(a, !0);
          a += 4;
          const n = r.getUint32(a, !0);
          if (((a += 4), 0x4e4f534a === n)) {
            const n = new Uint8Array(e, 12 + a, t);
            this.content = rw(n);
          } else if (5130562 === n) {
            const n = 12 + a;
            this.body = e.slice(n, n + t);
          }
          a += t;
        }
        if (null === this.content)
          throw Error('THREE.GLTFLoader: JSON content not found.');
      }
    }
    class rY {
      constructor(e, t) {
        if (!t)
          throw Error('THREE.GLTFLoader: No DRACOLoader instance provided.');
        ((this.name = rT.KHR_DRACO_MESH_COMPRESSION),
          (this.json = e),
          (this.dracoLoader = t),
          this.dracoLoader.preload());
      }
      decodePrimitive(e, t) {
        let n = this.json,
          r = this.dracoLoader,
          a = e.extensions[this.name].bufferView,
          i = e.extensions[this.name].attributes,
          o = {},
          l = {},
          s = {};
        for (let e in i) o[r6[e] || e.toLowerCase()] = i[e];
        for (let t in e.attributes) {
          let r = r6[t] || t.toLowerCase();
          if (void 0 !== i[t]) {
            let a = n.accessors[e.attributes[t]],
              i = r3[a.componentType];
            ((s[r] = i.name), (l[r] = !0 === a.normalized));
          }
        }
        return t.getDependency('bufferView', a).then(function (e) {
          return new Promise(function (t, n) {
            r.decodeDracoFile(
              e,
              function (e) {
                for (let t in e.attributes) {
                  let n = e.attributes[t],
                    r = l[t];
                  void 0 !== r && (n.normalized = r);
                }
                t(e);
              },
              o,
              s,
              rE,
              n
            );
          });
        });
      }
    }
    class rq {
      constructor() {
        this.name = rT.KHR_TEXTURE_TRANSFORM;
      }
      extendTexture(e, t) {
        return (
          ((void 0 === t.texCoord || t.texCoord === e.channel) &&
            void 0 === t.offset &&
            void 0 === t.rotation &&
            void 0 === t.scale) ||
            ((e = e.clone()),
            void 0 !== t.texCoord && (e.channel = t.texCoord),
            void 0 !== t.offset && e.offset.fromArray(t.offset),
            void 0 !== t.rotation && (e.rotation = t.rotation),
            void 0 !== t.scale && e.repeat.fromArray(t.scale),
            (e.needsUpdate = !0)),
          e
        );
      }
    }
    class rZ {
      constructor() {
        this.name = rT.KHR_MESH_QUANTIZATION;
      }
    }
    class r$ extends ry.Interpolant {
      constructor(e, t, n, r) {
        super(e, t, n, r);
      }
      copySampleValue_(e) {
        let t = this.resultBuffer,
          n = this.sampleValues,
          r = this.valueSize,
          a = e * r * 3 + r;
        for (let e = 0; e !== r; e++) t[e] = n[a + e];
        return t;
      }
      interpolate_(e, t, n, r) {
        let a = this.resultBuffer,
          i = this.sampleValues,
          o = this.valueSize,
          l = 2 * o,
          s = 3 * o,
          u = r - t,
          c = (n - t) / u,
          d = c * c,
          f = d * c,
          p = e * s,
          h = p - s,
          m = -2 * f + 3 * d,
          g = f - d,
          A = 1 - m,
          v = g - d + c;
        for (let e = 0; e !== o; e++) {
          let t = i[h + e + o],
            n = i[h + e + l] * u,
            r = i[p + e + o],
            s = i[p + e] * u;
          a[e] = A * t + v * n + m * r + g * s;
        }
        return a;
      }
    }
    let r0 = new ry.Quaternion();
    class r1 extends r$ {
      interpolate_(e, t, n, r) {
        let a = super.interpolate_(e, t, n, r);
        return (r0.fromArray(a).normalize().toArray(a), a);
      }
    }
    let r2 = {
        POINTS: 0,
        LINES: 1,
        LINE_LOOP: 2,
        LINE_STRIP: 3,
        TRIANGLES: 4,
        TRIANGLE_STRIP: 5,
        TRIANGLE_FAN: 6,
      },
      r3 = {
        5120: Int8Array,
        5121: Uint8Array,
        5122: Int16Array,
        5123: Uint16Array,
        5125: Uint32Array,
        5126: Float32Array,
      },
      r9 = {
        9728: ry.NearestFilter,
        9729: ry.LinearFilter,
        9984: ry.NearestMipmapNearestFilter,
        9985: ry.LinearMipmapNearestFilter,
        9986: ry.NearestMipmapLinearFilter,
        9987: ry.LinearMipmapLinearFilter,
      },
      r8 = {
        33071: ry.ClampToEdgeWrapping,
        33648: ry.MirroredRepeatWrapping,
        10497: ry.RepeatWrapping,
      },
      r4 = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 },
      r6 = {
        POSITION: 'position',
        NORMAL: 'normal',
        TANGENT: 'tangent',
        ...(ta >= 152
          ? {
              TEXCOORD_0: 'uv',
              TEXCOORD_1: 'uv1',
              TEXCOORD_2: 'uv2',
              TEXCOORD_3: 'uv3',
            }
          : { TEXCOORD_0: 'uv', TEXCOORD_1: 'uv2' }),
        COLOR_0: 'color',
        WEIGHTS_0: 'skinWeight',
        JOINTS_0: 'skinIndex',
      },
      r5 = {
        scale: 'scale',
        translation: 'position',
        rotation: 'quaternion',
        weights: 'morphTargetInfluences',
      },
      r7 = {
        CUBICSPLINE: void 0,
        LINEAR: ry.InterpolateLinear,
        STEP: ry.InterpolateDiscrete,
      };
    function ae(e, t, n) {
      for (let r in n.extensions)
        void 0 === e[r] &&
          ((t.userData.gltfExtensions = t.userData.gltfExtensions || {}),
          (t.userData.gltfExtensions[r] = n.extensions[r]));
    }
    function at(e, t) {
      void 0 !== t.extras &&
        ('object' == typeof t.extras
          ? Object.assign(e.userData, t.extras)
          : console.warn(
              'THREE.GLTFLoader: Ignoring primitive type .extras, ' + t.extras
            ));
    }
    function an(e) {
      let t = '',
        n = Object.keys(e).sort();
      for (let r = 0, a = n.length; r < a; r++) t += n[r] + ':' + e[n[r]] + ';';
      return t;
    }
    function ar(e) {
      switch (e) {
        case Int8Array:
          return 1 / 127;
        case Uint8Array:
          return 1 / 255;
        case Int16Array:
          return 1 / 32767;
        case Uint16Array:
          return 1 / 65535;
        default:
          throw Error(
            'THREE.GLTFLoader: Unsupported normalized accessor component type.'
          );
      }
    }
    let aa = new ry.Matrix4();
    class ai {
      constructor(e = {}, t = {}) {
        ((this.json = e),
          (this.extensions = {}),
          (this.plugins = {}),
          (this.options = t),
          (this.cache = new rF()),
          (this.associations = new Map()),
          (this.primitiveCache = {}),
          (this.nodeCache = {}),
          (this.meshCache = { refs: {}, uses: {} }),
          (this.cameraCache = { refs: {}, uses: {} }),
          (this.lightCache = { refs: {}, uses: {} }),
          (this.sourceCache = {}),
          (this.textureCache = {}),
          (this.nodeNamesUsed = {}));
        let n = !1,
          r = !1,
          a = -1;
        ('u' > typeof navigator &&
          void 0 !== navigator.userAgent &&
          ((n =
            !0 === /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
          (a = (r = navigator.userAgent.indexOf('Firefox') > -1)
            ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]
            : -1)),
          'u' < typeof createImageBitmap || n || (r && a < 98)
            ? (this.textureLoader = new ry.TextureLoader(this.options.manager))
            : (this.textureLoader = new ry.ImageBitmapLoader(
                this.options.manager
              )),
          this.textureLoader.setCrossOrigin(this.options.crossOrigin),
          this.textureLoader.setRequestHeader(this.options.requestHeader),
          (this.fileLoader = new ry.FileLoader(this.options.manager)),
          this.fileLoader.setResponseType('arraybuffer'),
          'use-credentials' === this.options.crossOrigin &&
            this.fileLoader.setWithCredentials(!0));
      }
      setExtensions(e) {
        this.extensions = e;
      }
      setPlugins(e) {
        this.plugins = e;
      }
      parse(e, t) {
        let n = this,
          r = this.json,
          a = this.extensions;
        (this.cache.removeAll(),
          (this.nodeCache = {}),
          this._invokeAll(function (e) {
            return e._markDefs && e._markDefs();
          }),
          Promise.all(
            this._invokeAll(function (e) {
              return e.beforeRoot && e.beforeRoot();
            })
          )
            .then(function () {
              return Promise.all([
                n.getDependencies('scene'),
                n.getDependencies('animation'),
                n.getDependencies('camera'),
              ]);
            })
            .then(function (t) {
              let i = {
                scene: t[0][r.scene || 0],
                scenes: t[0],
                animations: t[1],
                cameras: t[2],
                asset: r.asset,
                parser: n,
                userData: {},
              };
              return (
                ae(a, i, r),
                at(i, r),
                Promise.all(
                  n._invokeAll(function (e) {
                    return e.afterRoot && e.afterRoot(i);
                  })
                ).then(function () {
                  for (let e of i.scenes) e.updateMatrixWorld();
                  e(i);
                })
              );
            })
            .catch(t));
      }
      _markDefs() {
        let e = this.json.nodes || [],
          t = this.json.skins || [],
          n = this.json.meshes || [];
        for (let n = 0, r = t.length; n < r; n++) {
          let r = t[n].joints;
          for (let t = 0, n = r.length; t < n; t++) e[r[t]].isBone = !0;
        }
        for (let t = 0, r = e.length; t < r; t++) {
          let r = e[t];
          (void 0 !== r.mesh &&
            (this._addNodeRef(this.meshCache, r.mesh),
            void 0 !== r.skin && (n[r.mesh].isSkinnedMesh = !0)),
            void 0 !== r.camera &&
              this._addNodeRef(this.cameraCache, r.camera));
        }
      }
      _addNodeRef(e, t) {
        void 0 !== t &&
          (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
      }
      _getNodeRef(e, t, n) {
        if (e.refs[t] <= 1) return n;
        let r = n.clone(),
          a = (e, t) => {
            let n = this.associations.get(e);
            for (let [r, i] of (null != n && this.associations.set(t, n),
            e.children.entries()))
              a(i, t.children[r]);
          };
        return (a(n, r), (r.name += '_instance_' + e.uses[t]++), r);
      }
      _invokeOne(e) {
        let t = Object.values(this.plugins);
        t.push(this);
        for (let n = 0; n < t.length; n++) {
          let r = e(t[n]);
          if (r) return r;
        }
        return null;
      }
      _invokeAll(e) {
        let t = Object.values(this.plugins);
        t.unshift(this);
        let n = [];
        for (let r = 0; r < t.length; r++) {
          let a = e(t[r]);
          a && n.push(a);
        }
        return n;
      }
      getDependency(e, t) {
        let n = e + ':' + t,
          r = this.cache.get(n);
        if (!r) {
          switch (e) {
            case 'scene':
              r = this.loadScene(t);
              break;
            case 'node':
              r = this._invokeOne(function (e) {
                return e.loadNode && e.loadNode(t);
              });
              break;
            case 'mesh':
              r = this._invokeOne(function (e) {
                return e.loadMesh && e.loadMesh(t);
              });
              break;
            case 'accessor':
              r = this.loadAccessor(t);
              break;
            case 'bufferView':
              r = this._invokeOne(function (e) {
                return e.loadBufferView && e.loadBufferView(t);
              });
              break;
            case 'buffer':
              r = this.loadBuffer(t);
              break;
            case 'material':
              r = this._invokeOne(function (e) {
                return e.loadMaterial && e.loadMaterial(t);
              });
              break;
            case 'texture':
              r = this._invokeOne(function (e) {
                return e.loadTexture && e.loadTexture(t);
              });
              break;
            case 'skin':
              r = this.loadSkin(t);
              break;
            case 'animation':
              r = this._invokeOne(function (e) {
                return e.loadAnimation && e.loadAnimation(t);
              });
              break;
            case 'camera':
              r = this.loadCamera(t);
              break;
            default:
              if (
                !(r = this._invokeOne(function (n) {
                  return n != this && n.getDependency && n.getDependency(e, t);
                }))
              )
                throw Error('Unknown type: ' + e);
          }
          this.cache.add(n, r);
        }
        return r;
      }
      getDependencies(e) {
        let t = this.cache.get(e);
        if (!t) {
          let n = this;
          ((t = Promise.all(
            (this.json[e + ('mesh' === e ? 'es' : 's')] || []).map(
              function (t, r) {
                return n.getDependency(e, r);
              }
            )
          )),
            this.cache.add(e, t));
        }
        return t;
      }
      loadBuffer(e) {
        let t = this.json.buffers[e],
          n = this.fileLoader;
        if (t.type && 'arraybuffer' !== t.type)
          throw Error(
            'THREE.GLTFLoader: ' + t.type + ' buffer type is not supported.'
          );
        if (void 0 === t.uri && 0 === e)
          return Promise.resolve(this.extensions[rT.KHR_BINARY_GLTF].body);
        let r = this.options;
        return new Promise(function (e, a) {
          n.load(
            ry.LoaderUtils.resolveURL(t.uri, r.path),
            e,
            void 0,
            function () {
              a(
                Error(
                  'THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'
                )
              );
            }
          );
        });
      }
      loadBufferView(e) {
        let t = this.json.bufferViews[e];
        return this.getDependency('buffer', t.buffer).then(function (e) {
          let n = t.byteLength || 0,
            r = t.byteOffset || 0;
          return e.slice(r, r + n);
        });
      }
      loadAccessor(e) {
        let t = this,
          n = this.json,
          r = this.json.accessors[e];
        if (void 0 === r.bufferView && void 0 === r.sparse) {
          let e = r4[r.type],
            t = r3[r.componentType],
            n = !0 === r.normalized,
            a = new t(r.count * e);
          return Promise.resolve(new ry.BufferAttribute(a, e, n));
        }
        let a = [];
        return (
          void 0 !== r.bufferView
            ? a.push(this.getDependency('bufferView', r.bufferView))
            : a.push(null),
          void 0 !== r.sparse &&
            (a.push(
              this.getDependency('bufferView', r.sparse.indices.bufferView)
            ),
            a.push(
              this.getDependency('bufferView', r.sparse.values.bufferView)
            )),
          Promise.all(a).then(function (e) {
            let a,
              i,
              o = e[0],
              l = r4[r.type],
              s = r3[r.componentType],
              u = s.BYTES_PER_ELEMENT,
              c = u * l,
              d = r.byteOffset || 0,
              f =
                void 0 !== r.bufferView
                  ? n.bufferViews[r.bufferView].byteStride
                  : void 0,
              p = !0 === r.normalized;
            if (f && f !== c) {
              let e = Math.floor(d / f),
                n =
                  'InterleavedBuffer:' +
                  r.bufferView +
                  ':' +
                  r.componentType +
                  ':' +
                  e +
                  ':' +
                  r.count,
                c = t.cache.get(n);
              (c ||
                ((a = new s(o, e * f, (r.count * f) / u)),
                (c = new ry.InterleavedBuffer(a, f / u)),
                t.cache.add(n, c)),
                (i = new ry.InterleavedBufferAttribute(c, l, (d % f) / u, p)));
            } else
              ((a = null === o ? new s(r.count * l) : new s(o, d, r.count * l)),
                (i = new ry.BufferAttribute(a, l, p)));
            if (void 0 !== r.sparse) {
              let t = r4.SCALAR,
                n = r3[r.sparse.indices.componentType],
                a = r.sparse.indices.byteOffset || 0,
                u = r.sparse.values.byteOffset || 0,
                c = new n(e[1], a, r.sparse.count * t),
                d = new s(e[2], u, r.sparse.count * l);
              null !== o &&
                (i = new ry.BufferAttribute(
                  i.array.slice(),
                  i.itemSize,
                  i.normalized
                ));
              for (let e = 0, t = c.length; e < t; e++) {
                let t = c[e];
                if (
                  (i.setX(t, d[e * l]),
                  l >= 2 && i.setY(t, d[e * l + 1]),
                  l >= 3 && i.setZ(t, d[e * l + 2]),
                  l >= 4 && i.setW(t, d[e * l + 3]),
                  l >= 5)
                )
                  throw Error(
                    'THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.'
                  );
              }
            }
            return i;
          })
        );
      }
      loadTexture(e) {
        let t = this.json,
          n = this.options,
          r = t.textures[e].source,
          a = t.images[r],
          i = this.textureLoader;
        if (a.uri) {
          let e = n.manager.getHandler(a.uri);
          null !== e && (i = e);
        }
        return this.loadTextureImage(e, r, i);
      }
      loadTextureImage(e, t, n) {
        let r = this,
          a = this.json,
          i = a.textures[e],
          o = a.images[t],
          l = (o.uri || o.bufferView) + ':' + i.sampler;
        if (this.textureCache[l]) return this.textureCache[l];
        let s = this.loadImageSource(t, n)
          .then(function (t) {
            ((t.flipY = !1),
              (t.name = i.name || o.name || ''),
              '' === t.name &&
                'string' == typeof o.uri &&
                !1 === o.uri.startsWith('data:image/') &&
                (t.name = o.uri));
            let n = (a.samplers || {})[i.sampler] || {};
            return (
              (t.magFilter = r9[n.magFilter] || ry.LinearFilter),
              (t.minFilter = r9[n.minFilter] || ry.LinearMipmapLinearFilter),
              (t.wrapS = r8[n.wrapS] || ry.RepeatWrapping),
              (t.wrapT = r8[n.wrapT] || ry.RepeatWrapping),
              r.associations.set(t, { textures: e }),
              t
            );
          })
          .catch(function () {
            return null;
          });
        return ((this.textureCache[l] = s), s);
      }
      loadImageSource(e, t) {
        let n = this.json,
          r = this.options;
        if (void 0 !== this.sourceCache[e])
          return this.sourceCache[e].then((e) => e.clone());
        let a = n.images[e],
          i = self.URL || self.webkitURL,
          o = a.uri || '',
          l = !1;
        if (void 0 !== a.bufferView)
          o = this.getDependency('bufferView', a.bufferView).then(function (e) {
            l = !0;
            let t = new Blob([e], { type: a.mimeType });
            return (o = i.createObjectURL(t));
          });
        else if (void 0 === a.uri)
          throw Error(
            'THREE.GLTFLoader: Image ' + e + ' is missing URI and bufferView'
          );
        let s = Promise.resolve(o)
          .then(function (e) {
            return new Promise(function (n, a) {
              let i = n;
              (!0 === t.isImageBitmapLoader &&
                (i = function (e) {
                  let t = new ry.Texture(e);
                  ((t.needsUpdate = !0), n(t));
                }),
                t.load(ry.LoaderUtils.resolveURL(e, r.path), i, void 0, a));
            });
          })
          .then(function (e) {
            var t;
            return (
              !0 === l && i.revokeObjectURL(o),
              at(e, a),
              (e.userData.mimeType =
                a.mimeType ||
                ((t = a.uri).search(/\.jpe?g($|\?)/i) > 0 ||
                0 === t.search(/^data\:image\/jpeg/)
                  ? 'image/jpeg'
                  : t.search(/\.webp($|\?)/i) > 0 ||
                      0 === t.search(/^data\:image\/webp/)
                    ? 'image/webp'
                    : 'image/png')),
              e
            );
          })
          .catch(function (e) {
            throw (
              console.error("THREE.GLTFLoader: Couldn't load texture", o),
              e
            );
          });
        return ((this.sourceCache[e] = s), s);
      }
      assignTexture(e, t, n, r) {
        let a = this;
        return this.getDependency('texture', n.index).then(function (i) {
          if (!i) return null;
          if (
            (void 0 !== n.texCoord &&
              n.texCoord > 0 &&
              ((i = i.clone()).channel = n.texCoord),
            a.extensions[rT.KHR_TEXTURE_TRANSFORM])
          ) {
            let e =
              void 0 !== n.extensions
                ? n.extensions[rT.KHR_TEXTURE_TRANSFORM]
                : void 0;
            if (e) {
              let t = a.associations.get(i);
              ((i = a.extensions[rT.KHR_TEXTURE_TRANSFORM].extendTexture(i, e)),
                a.associations.set(i, t));
            }
          }
          return (
            void 0 !== r &&
              ('number' == typeof r && (r = 3001 === r ? rS : rE),
              'colorSpace' in i
                ? (i.colorSpace = r)
                : (i.encoding = r === rS ? 3001 : 3e3)),
            (e[t] = i),
            i
          );
        });
      }
      assignFinalMaterial(e) {
        let t = e.geometry,
          n = e.material,
          r = void 0 === t.attributes.tangent,
          a = void 0 !== t.attributes.color,
          i = void 0 === t.attributes.normal;
        if (e.isPoints) {
          let e = 'PointsMaterial:' + n.uuid,
            t = this.cache.get(e);
          (t ||
            ((t = new ry.PointsMaterial()),
            ry.Material.prototype.copy.call(t, n),
            t.color.copy(n.color),
            (t.map = n.map),
            (t.sizeAttenuation = !1),
            this.cache.add(e, t)),
            (n = t));
        } else if (e.isLine) {
          let e = 'LineBasicMaterial:' + n.uuid,
            t = this.cache.get(e);
          (t ||
            ((t = new ry.LineBasicMaterial()),
            ry.Material.prototype.copy.call(t, n),
            t.color.copy(n.color),
            (t.map = n.map),
            this.cache.add(e, t)),
            (n = t));
        }
        if (r || a || i) {
          let e = 'ClonedMaterial:' + n.uuid + ':';
          (r && (e += 'derivative-tangents:'),
            a && (e += 'vertex-colors:'),
            i && (e += 'flat-shading:'));
          let t = this.cache.get(e);
          (t ||
            ((t = n.clone()),
            a && (t.vertexColors = !0),
            i && (t.flatShading = !0),
            r &&
              (t.normalScale && (t.normalScale.y *= -1),
              t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)),
            this.cache.add(e, t),
            this.associations.set(t, this.associations.get(n))),
            (n = t));
        }
        e.material = n;
      }
      getMaterialType() {
        return ry.MeshStandardMaterial;
      }
      loadMaterial(e) {
        let t,
          n = this,
          r = this.json,
          a = this.extensions,
          i = r.materials[e],
          o = {},
          l = i.extensions || {},
          s = [];
        if (l[rT.KHR_MATERIALS_UNLIT]) {
          let e = a[rT.KHR_MATERIALS_UNLIT];
          ((t = e.getMaterialType()), s.push(e.extendParams(o, i, n)));
        } else {
          let r = i.pbrMetallicRoughness || {};
          if (
            ((o.color = new ry.Color(1, 1, 1)),
            (o.opacity = 1),
            Array.isArray(r.baseColorFactor))
          ) {
            let e = r.baseColorFactor;
            (o.color.setRGB(e[0], e[1], e[2], rE), (o.opacity = e[3]));
          }
          (void 0 !== r.baseColorTexture &&
            s.push(n.assignTexture(o, 'map', r.baseColorTexture, rS)),
            (o.metalness = void 0 !== r.metallicFactor ? r.metallicFactor : 1),
            (o.roughness =
              void 0 !== r.roughnessFactor ? r.roughnessFactor : 1),
            void 0 !== r.metallicRoughnessTexture &&
              (s.push(
                n.assignTexture(o, 'metalnessMap', r.metallicRoughnessTexture)
              ),
              s.push(
                n.assignTexture(o, 'roughnessMap', r.metallicRoughnessTexture)
              )),
            (t = this._invokeOne(function (t) {
              return t.getMaterialType && t.getMaterialType(e);
            })),
            s.push(
              Promise.all(
                this._invokeAll(function (t) {
                  return t.extendMaterialParams && t.extendMaterialParams(e, o);
                })
              )
            ));
        }
        !0 === i.doubleSided && (o.side = ry.DoubleSide);
        let u = i.alphaMode || 'OPAQUE';
        if (
          ('BLEND' === u
            ? ((o.transparent = !0), (o.depthWrite = !1))
            : ((o.transparent = !1),
              'MASK' === u &&
                (o.alphaTest = void 0 !== i.alphaCutoff ? i.alphaCutoff : 0.5)),
          void 0 !== i.normalTexture &&
            t !== ry.MeshBasicMaterial &&
            (s.push(n.assignTexture(o, 'normalMap', i.normalTexture)),
            (o.normalScale = new ry.Vector2(1, 1)),
            void 0 !== i.normalTexture.scale))
        ) {
          let e = i.normalTexture.scale;
          o.normalScale.set(e, e);
        }
        if (
          (void 0 !== i.occlusionTexture &&
            t !== ry.MeshBasicMaterial &&
            (s.push(n.assignTexture(o, 'aoMap', i.occlusionTexture)),
            void 0 !== i.occlusionTexture.strength &&
              (o.aoMapIntensity = i.occlusionTexture.strength)),
          void 0 !== i.emissiveFactor && t !== ry.MeshBasicMaterial)
        ) {
          let e = i.emissiveFactor;
          o.emissive = new ry.Color().setRGB(e[0], e[1], e[2], rE);
        }
        return (
          void 0 !== i.emissiveTexture &&
            t !== ry.MeshBasicMaterial &&
            s.push(n.assignTexture(o, 'emissiveMap', i.emissiveTexture, rS)),
          Promise.all(s).then(function () {
            let r = new t(o);
            return (
              i.name && (r.name = i.name),
              at(r, i),
              n.associations.set(r, { materials: e }),
              i.extensions && ae(a, r, i),
              r
            );
          })
        );
      }
      createUniqueName(e) {
        let t = ry.PropertyBinding.sanitizeNodeName(e || '');
        return t in this.nodeNamesUsed
          ? t + '_' + ++this.nodeNamesUsed[t]
          : ((this.nodeNamesUsed[t] = 0), t);
      }
      loadGeometries(e) {
        let t = this,
          n = this.extensions,
          r = this.primitiveCache,
          a = [];
        for (let i = 0, o = e.length; i < o; i++) {
          let o = e[i],
            l = (function (e) {
              let t,
                n = e.extensions && e.extensions[rT.KHR_DRACO_MESH_COMPRESSION];
              if (
                ((t = n
                  ? 'draco:' +
                    n.bufferView +
                    ':' +
                    n.indices +
                    ':' +
                    an(n.attributes)
                  : e.indices + ':' + an(e.attributes) + ':' + e.mode),
                void 0 !== e.targets)
              )
                for (let n = 0, r = e.targets.length; n < r; n++)
                  t += ':' + an(e.targets[n]);
              return t;
            })(o),
            s = r[l];
          if (s) a.push(s.promise);
          else {
            let e;
            ((e =
              o.extensions && o.extensions[rT.KHR_DRACO_MESH_COMPRESSION]
                ? (function (e) {
                    return n[rT.KHR_DRACO_MESH_COMPRESSION]
                      .decodePrimitive(e, t)
                      .then(function (n) {
                        return ao(n, e, t);
                      });
                  })(o)
                : ao(new ry.BufferGeometry(), o, t)),
              (r[l] = { primitive: o, promise: e }),
              a.push(e));
          }
        }
        return Promise.all(a);
      }
      loadMesh(e) {
        let t = this,
          n = this.json,
          r = this.extensions,
          a = n.meshes[e],
          i = a.primitives,
          o = [];
        for (let e = 0, t = i.length; e < t; e++) {
          var l;
          let t =
            void 0 === i[e].material
              ? (void 0 === (l = this.cache).DefaultMaterial &&
                  (l.DefaultMaterial = new ry.MeshStandardMaterial({
                    color: 0xffffff,
                    emissive: 0,
                    metalness: 1,
                    roughness: 1,
                    transparent: !1,
                    depthTest: !0,
                    side: ry.FrontSide,
                  })),
                l.DefaultMaterial)
              : this.getDependency('material', i[e].material);
          o.push(t);
        }
        return (
          o.push(t.loadGeometries(i)),
          Promise.all(o).then(function (n) {
            let o = n.slice(0, n.length - 1),
              l = n[n.length - 1],
              s = [];
            for (let n = 0, u = l.length; n < u; n++) {
              let u,
                c = l[n],
                d = i[n],
                f = o[n];
              if (
                d.mode === r2.TRIANGLES ||
                d.mode === r2.TRIANGLE_STRIP ||
                d.mode === r2.TRIANGLE_FAN ||
                void 0 === d.mode
              )
                (!0 ===
                  (u =
                    !0 === a.isSkinnedMesh
                      ? new ry.SkinnedMesh(c, f)
                      : new ry.Mesh(c, f)).isSkinnedMesh &&
                  u.normalizeSkinWeights(),
                  d.mode === r2.TRIANGLE_STRIP
                    ? (u.geometry = rx(u.geometry, ry.TriangleStripDrawMode))
                    : d.mode === r2.TRIANGLE_FAN &&
                      (u.geometry = rx(u.geometry, ry.TriangleFanDrawMode)));
              else if (d.mode === r2.LINES) u = new ry.LineSegments(c, f);
              else if (d.mode === r2.LINE_STRIP) u = new ry.Line(c, f);
              else if (d.mode === r2.LINE_LOOP) u = new ry.LineLoop(c, f);
              else if (d.mode === r2.POINTS) u = new ry.Points(c, f);
              else
                throw Error(
                  'THREE.GLTFLoader: Primitive mode unsupported: ' + d.mode
                );
              (Object.keys(u.geometry.morphAttributes).length > 0 &&
                (function (e, t) {
                  if ((e.updateMorphTargets(), void 0 !== t.weights))
                    for (let n = 0, r = t.weights.length; n < r; n++)
                      e.morphTargetInfluences[n] = t.weights[n];
                  if (t.extras && Array.isArray(t.extras.targetNames)) {
                    let n = t.extras.targetNames;
                    if (e.morphTargetInfluences.length === n.length) {
                      e.morphTargetDictionary = {};
                      for (let t = 0, r = n.length; t < r; t++)
                        e.morphTargetDictionary[n[t]] = t;
                    } else
                      console.warn(
                        'THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.'
                      );
                  }
                })(u, a),
                (u.name = t.createUniqueName(a.name || 'mesh_' + e)),
                at(u, a),
                d.extensions && ae(r, u, d),
                t.assignFinalMaterial(u),
                s.push(u));
            }
            for (let n = 0, r = s.length; n < r; n++)
              t.associations.set(s[n], { meshes: e, primitives: n });
            if (1 === s.length) return (a.extensions && ae(r, s[0], a), s[0]);
            let u = new ry.Group();
            (a.extensions && ae(r, u, a), t.associations.set(u, { meshes: e }));
            for (let e = 0, t = s.length; e < t; e++) u.add(s[e]);
            return u;
          })
        );
      }
      loadCamera(e) {
        let t,
          n = this.json.cameras[e],
          r = n[n.type];
        return r
          ? ('perspective' === n.type
              ? (t = new ry.PerspectiveCamera(
                  ry.MathUtils.radToDeg(r.yfov),
                  r.aspectRatio || 1,
                  r.znear || 1,
                  r.zfar || 2e6
                ))
              : 'orthographic' === n.type &&
                (t = new ry.OrthographicCamera(
                  -r.xmag,
                  r.xmag,
                  r.ymag,
                  -r.ymag,
                  r.znear,
                  r.zfar
                )),
            n.name && (t.name = this.createUniqueName(n.name)),
            at(t, n),
            Promise.resolve(t))
          : void console.warn('THREE.GLTFLoader: Missing camera parameters.');
      }
      loadSkin(e) {
        let t = this.json.skins[e],
          n = [];
        for (let e = 0, r = t.joints.length; e < r; e++)
          n.push(this._loadNodeShallow(t.joints[e]));
        return (
          void 0 !== t.inverseBindMatrices
            ? n.push(this.getDependency('accessor', t.inverseBindMatrices))
            : n.push(null),
          Promise.all(n).then(function (e) {
            let n = e.pop(),
              r = [],
              a = [];
            for (let i = 0, o = e.length; i < o; i++) {
              let o = e[i];
              if (o) {
                r.push(o);
                let e = new ry.Matrix4();
                (null !== n && e.fromArray(n.array, 16 * i), a.push(e));
              } else
                console.warn(
                  'THREE.GLTFLoader: Joint "%s" could not be found.',
                  t.joints[i]
                );
            }
            return new ry.Skeleton(r, a);
          })
        );
      }
      loadAnimation(e) {
        let t = this.json,
          n = this,
          r = t.animations[e],
          a = r.name ? r.name : 'animation_' + e,
          i = [],
          o = [],
          l = [],
          s = [],
          u = [];
        for (let e = 0, t = r.channels.length; e < t; e++) {
          let t = r.channels[e],
            n = r.samplers[t.sampler],
            a = t.target,
            c = a.node,
            d = void 0 !== r.parameters ? r.parameters[n.input] : n.input,
            f = void 0 !== r.parameters ? r.parameters[n.output] : n.output;
          void 0 !== a.node &&
            (i.push(this.getDependency('node', c)),
            o.push(this.getDependency('accessor', d)),
            l.push(this.getDependency('accessor', f)),
            s.push(n),
            u.push(a));
        }
        return Promise.all([
          Promise.all(i),
          Promise.all(o),
          Promise.all(l),
          Promise.all(s),
          Promise.all(u),
        ]).then(function (e) {
          let t = e[0],
            r = e[1],
            i = e[2],
            o = e[3],
            l = e[4],
            s = [];
          for (let e = 0, a = t.length; e < a; e++) {
            let a = t[e],
              u = r[e],
              c = i[e],
              d = o[e],
              f = l[e];
            if (void 0 === a) continue;
            a.updateMatrix && a.updateMatrix();
            let p = n._createAnimationTracks(a, u, c, d, f);
            if (p) for (let e = 0; e < p.length; e++) s.push(p[e]);
          }
          return new ry.AnimationClip(a, void 0, s);
        });
      }
      createNodeMesh(e) {
        let t = this.json,
          n = this,
          r = t.nodes[e];
        return void 0 === r.mesh
          ? null
          : n.getDependency('mesh', r.mesh).then(function (e) {
              let t = n._getNodeRef(n.meshCache, r.mesh, e);
              return (
                void 0 !== r.weights &&
                  t.traverse(function (e) {
                    if (e.isMesh)
                      for (let t = 0, n = r.weights.length; t < n; t++)
                        e.morphTargetInfluences[t] = r.weights[t];
                  }),
                t
              );
            });
      }
      loadNode(e) {
        let t = this.json.nodes[e],
          n = this._loadNodeShallow(e),
          r = [],
          a = t.children || [];
        for (let e = 0, t = a.length; e < t; e++)
          r.push(this.getDependency('node', a[e]));
        let i =
          void 0 === t.skin
            ? Promise.resolve(null)
            : this.getDependency('skin', t.skin);
        return Promise.all([n, Promise.all(r), i]).then(function (e) {
          let t = e[0],
            n = e[1],
            r = e[2];
          null !== r &&
            t.traverse(function (e) {
              e.isSkinnedMesh && e.bind(r, aa);
            });
          for (let e = 0, r = n.length; e < r; e++) t.add(n[e]);
          return t;
        });
      }
      _loadNodeShallow(e) {
        let t = this.json,
          n = this.extensions,
          r = this;
        if (void 0 !== this.nodeCache[e]) return this.nodeCache[e];
        let a = t.nodes[e],
          i = a.name ? r.createUniqueName(a.name) : '',
          o = [],
          l = r._invokeOne(function (t) {
            return t.createNodeMesh && t.createNodeMesh(e);
          });
        return (
          l && o.push(l),
          void 0 !== a.camera &&
            o.push(
              r.getDependency('camera', a.camera).then(function (e) {
                return r._getNodeRef(r.cameraCache, a.camera, e);
              })
            ),
          r
            ._invokeAll(function (t) {
              return t.createNodeAttachment && t.createNodeAttachment(e);
            })
            .forEach(function (e) {
              o.push(e);
            }),
          (this.nodeCache[e] = Promise.all(o).then(function (t) {
            let o;
            if (
              (o =
                !0 === a.isBone
                  ? new ry.Bone()
                  : t.length > 1
                    ? new ry.Group()
                    : 1 === t.length
                      ? t[0]
                      : new ry.Object3D()) !== t[0]
            )
              for (let e = 0, n = t.length; e < n; e++) o.add(t[e]);
            if (
              (a.name && ((o.userData.name = a.name), (o.name = i)),
              at(o, a),
              a.extensions && ae(n, o, a),
              void 0 !== a.matrix)
            ) {
              let e = new ry.Matrix4();
              (e.fromArray(a.matrix), o.applyMatrix4(e));
            } else
              (void 0 !== a.translation && o.position.fromArray(a.translation),
                void 0 !== a.rotation && o.quaternion.fromArray(a.rotation),
                void 0 !== a.scale && o.scale.fromArray(a.scale));
            return (
              r.associations.has(o) || r.associations.set(o, {}),
              (r.associations.get(o).nodes = e),
              o
            );
          })),
          this.nodeCache[e]
        );
      }
      loadScene(e) {
        let t = this.extensions,
          n = this.json.scenes[e],
          r = this,
          a = new ry.Group();
        (n.name && (a.name = r.createUniqueName(n.name)),
          at(a, n),
          n.extensions && ae(t, a, n));
        let i = n.nodes || [],
          o = [];
        for (let e = 0, t = i.length; e < t; e++)
          o.push(r.getDependency('node', i[e]));
        return Promise.all(o).then(function (e) {
          for (let t = 0, n = e.length; t < n; t++) a.add(e[t]);
          return (
            (r.associations = ((e) => {
              let t = new Map();
              for (let [e, n] of r.associations)
                (e instanceof ry.Material || e instanceof ry.Texture) &&
                  t.set(e, n);
              return (
                e.traverse((e) => {
                  let n = r.associations.get(e);
                  null != n && t.set(e, n);
                }),
                t
              );
            })(a)),
            a
          );
        });
      }
      _createAnimationTracks(e, t, n, r, a) {
        let i,
          o = [],
          l = e.name ? e.name : e.uuid,
          s = [];
        switch (
          (r5[a.path] === r5.weights
            ? e.traverse(function (e) {
                e.morphTargetInfluences && s.push(e.name ? e.name : e.uuid);
              })
            : s.push(l),
          r5[a.path])
        ) {
          case r5.weights:
            i = ry.NumberKeyframeTrack;
            break;
          case r5.rotation:
            i = ry.QuaternionKeyframeTrack;
            break;
          case r5.position:
          case r5.scale:
            i = ry.VectorKeyframeTrack;
            break;
          default:
            i =
              1 === n.itemSize
                ? ry.NumberKeyframeTrack
                : ry.VectorKeyframeTrack;
        }
        let u =
            void 0 !== r.interpolation
              ? r7[r.interpolation]
              : ry.InterpolateLinear,
          c = this._getArrayFromAccessor(n);
        for (let e = 0, n = s.length; e < n; e++) {
          let n = new i(s[e] + '.' + r5[a.path], t.array, c, u);
          ('CUBICSPLINE' === r.interpolation &&
            this._createCubicSplineTrackInterpolant(n),
            o.push(n));
        }
        return o;
      }
      _getArrayFromAccessor(e) {
        let t = e.array;
        if (e.normalized) {
          let e = ar(t.constructor),
            n = new Float32Array(t.length);
          for (let r = 0, a = t.length; r < a; r++) n[r] = t[r] * e;
          t = n;
        }
        return t;
      }
      _createCubicSplineTrackInterpolant(e) {
        ((e.createInterpolant = function (e) {
          return new (this instanceof ry.QuaternionKeyframeTrack ? r1 : r$)(
            this.times,
            this.values,
            this.getValueSize() / 3,
            e
          );
        }),
          (e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0));
      }
    }
    function ao(e, t, n) {
      let r = t.attributes,
        a = [];
      for (let t in r) {
        let i = r6[t] || t.toLowerCase();
        i in e.attributes ||
          a.push(
            (function (t, r) {
              return n.getDependency('accessor', t).then(function (t) {
                e.setAttribute(r, t);
              });
            })(r[t], i)
          );
      }
      if (void 0 !== t.indices && !e.index) {
        let r = n.getDependency('accessor', t.indices).then(function (t) {
          e.setIndex(t);
        });
        a.push(r);
      }
      return (
        at(e, t),
        !(function (e, t, n) {
          let r = t.attributes,
            a = new ry.Box3();
          if (void 0 === r.POSITION) return;
          {
            let e = n.json.accessors[r.POSITION],
              t = e.min,
              i = e.max;
            if (void 0 === t || void 0 === i)
              return console.warn(
                'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.'
              );
            if (
              (a.set(
                new ry.Vector3(t[0], t[1], t[2]),
                new ry.Vector3(i[0], i[1], i[2])
              ),
              e.normalized)
            ) {
              let t = ar(r3[e.componentType]);
              (a.min.multiplyScalar(t), a.max.multiplyScalar(t));
            }
          }
          let i = t.targets;
          if (void 0 !== i) {
            let e = new ry.Vector3(),
              t = new ry.Vector3();
            for (let r = 0, a = i.length; r < a; r++) {
              let a = i[r];
              if (void 0 !== a.POSITION) {
                let r = n.json.accessors[a.POSITION],
                  i = r.min,
                  o = r.max;
                if (void 0 !== i && void 0 !== o) {
                  if (
                    (t.setX(Math.max(Math.abs(i[0]), Math.abs(o[0]))),
                    t.setY(Math.max(Math.abs(i[1]), Math.abs(o[1]))),
                    t.setZ(Math.max(Math.abs(i[2]), Math.abs(o[2]))),
                    r.normalized)
                  ) {
                    let e = ar(r3[r.componentType]);
                    t.multiplyScalar(e);
                  }
                  e.max(t);
                } else
                  console.warn(
                    'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.'
                  );
              }
            }
            a.expandByVector(e);
          }
          e.boundingBox = a;
          let o = new ry.Sphere();
          (a.getCenter(o.center),
            (o.radius = a.min.distanceTo(a.max) / 2),
            (e.boundingSphere = o));
        })(e, t, n),
        Promise.all(a).then(function () {
          return void 0 !== t.targets
            ? (function (e, t, n) {
                let r = !1,
                  a = !1,
                  i = !1;
                for (let e = 0, n = t.length; e < n; e++) {
                  let n = t[e];
                  if (
                    (void 0 !== n.POSITION && (r = !0),
                    void 0 !== n.NORMAL && (a = !0),
                    void 0 !== n.COLOR_0 && (i = !0),
                    r && a && i)
                  )
                    break;
                }
                if (!r && !a && !i) return Promise.resolve(e);
                let o = [],
                  l = [],
                  s = [];
                for (let u = 0, c = t.length; u < c; u++) {
                  let c = t[u];
                  if (r) {
                    let t =
                      void 0 !== c.POSITION
                        ? n.getDependency('accessor', c.POSITION)
                        : e.attributes.position;
                    o.push(t);
                  }
                  if (a) {
                    let t =
                      void 0 !== c.NORMAL
                        ? n.getDependency('accessor', c.NORMAL)
                        : e.attributes.normal;
                    l.push(t);
                  }
                  if (i) {
                    let t =
                      void 0 !== c.COLOR_0
                        ? n.getDependency('accessor', c.COLOR_0)
                        : e.attributes.color;
                    s.push(t);
                  }
                }
                return Promise.all([
                  Promise.all(o),
                  Promise.all(l),
                  Promise.all(s),
                ]).then(function (t) {
                  let n = t[0],
                    o = t[1],
                    l = t[2];
                  return (
                    r && (e.morphAttributes.position = n),
                    a && (e.morphAttributes.normal = o),
                    i && (e.morphAttributes.color = l),
                    (e.morphTargetsRelative = !0),
                    e
                  );
                });
              })(e, t.targets, n)
            : e;
        })
      );
    }
    var al = S;
    let as = new WeakMap();
    class au extends al.Loader {
      constructor(e) {
        (super(e),
          (this.decoderPath = ''),
          (this.decoderConfig = {}),
          (this.decoderBinary = null),
          (this.decoderPending = null),
          (this.workerLimit = 4),
          (this.workerPool = []),
          (this.workerNextTaskID = 1),
          (this.workerSourceURL = ''),
          (this.defaultAttributeIDs = {
            position: 'POSITION',
            normal: 'NORMAL',
            color: 'COLOR',
            uv: 'TEX_COORD',
          }),
          (this.defaultAttributeTypes = {
            position: 'Float32Array',
            normal: 'Float32Array',
            color: 'Float32Array',
            uv: 'Float32Array',
          }));
      }
      setDecoderPath(e) {
        return ((this.decoderPath = e), this);
      }
      setDecoderConfig(e) {
        return ((this.decoderConfig = e), this);
      }
      setWorkerLimit(e) {
        return ((this.workerLimit = e), this);
      }
      load(e, t, n, r) {
        let a = new al.FileLoader(this.manager);
        (a.setPath(this.path),
          a.setResponseType('arraybuffer'),
          a.setRequestHeader(this.requestHeader),
          a.setWithCredentials(this.withCredentials),
          a.load(
            e,
            (e) => {
              let n = {
                attributeIDs: this.defaultAttributeIDs,
                attributeTypes: this.defaultAttributeTypes,
                useUniqueIDs: !1,
              };
              this.decodeGeometry(e, n).then(t).catch(r);
            },
            n,
            r
          ));
      }
      decodeDracoFile(e, t, n, r) {
        let a = {
          attributeIDs: n || this.defaultAttributeIDs,
          attributeTypes: r || this.defaultAttributeTypes,
          useUniqueIDs: !!n,
        };
        this.decodeGeometry(e, a).then(t);
      }
      decodeGeometry(e, t) {
        let n;
        for (let e in t.attributeTypes) {
          let n = t.attributeTypes[e];
          void 0 !== n.BYTES_PER_ELEMENT && (t.attributeTypes[e] = n.name);
        }
        let r = JSON.stringify(t);
        if (as.has(e)) {
          let t = as.get(e);
          if (t.key === r) return t.promise;
          if (0 === e.byteLength)
            throw Error(
              'THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.'
            );
        }
        let a = this.workerNextTaskID++,
          i = e.byteLength,
          o = this._getWorker(a, i)
            .then(
              (r) => (
                (n = r),
                new Promise((r, i) => {
                  ((n._callbacks[a] = { resolve: r, reject: i }),
                    n.postMessage(
                      { type: 'decode', id: a, taskConfig: t, buffer: e },
                      [e]
                    ));
                })
              )
            )
            .then((e) => this._createGeometry(e.geometry));
        return (
          o
            .catch(() => !0)
            .then(() => {
              n && a && this._releaseTask(n, a);
            }),
          as.set(e, { key: r, promise: o }),
          o
        );
      }
      _createGeometry(e) {
        let t = new al.BufferGeometry();
        e.index && t.setIndex(new al.BufferAttribute(e.index.array, 1));
        for (let n = 0; n < e.attributes.length; n++) {
          let r = e.attributes[n],
            a = r.name,
            i = r.array,
            o = r.itemSize;
          t.setAttribute(a, new al.BufferAttribute(i, o));
        }
        return t;
      }
      _loadLibrary(e, t) {
        let n = new al.FileLoader(this.manager);
        return (
          n.setPath(this.decoderPath),
          n.setResponseType(t),
          n.setWithCredentials(this.withCredentials),
          new Promise((t, r) => {
            n.load(e, t, void 0, r);
          })
        );
      }
      preload() {
        return (this._initDecoder(), this);
      }
      _initDecoder() {
        if (this.decoderPending) return this.decoderPending;
        let e =
            'object' != typeof WebAssembly || 'js' === this.decoderConfig.type,
          t = [];
        return (
          e
            ? t.push(this._loadLibrary('draco_decoder.js', 'text'))
            : (t.push(this._loadLibrary('draco_wasm_wrapper.js', 'text')),
              t.push(this._loadLibrary('draco_decoder.wasm', 'arraybuffer'))),
          (this.decoderPending = Promise.all(t).then((t) => {
            let n = t[0];
            e || (this.decoderConfig.wasmBinary = t[1]);
            let r = ac.toString(),
              a = [
                '/* draco decoder */',
                n,
                '\n/* worker */',
                r.substring(r.indexOf('{') + 1, r.lastIndexOf('}')),
              ].join('\n');
            this.workerSourceURL = URL.createObjectURL(new Blob([a]));
          })),
          this.decoderPending
        );
      }
      _getWorker(e, t) {
        return this._initDecoder().then(() => {
          if (this.workerPool.length < this.workerLimit) {
            let e = new Worker(this.workerSourceURL);
            ((e._callbacks = {}),
              (e._taskCosts = {}),
              (e._taskLoad = 0),
              e.postMessage({
                type: 'init',
                decoderConfig: this.decoderConfig,
              }),
              (e.onmessage = function (t) {
                let n = t.data;
                switch (n.type) {
                  case 'decode':
                    e._callbacks[n.id].resolve(n);
                    break;
                  case 'error':
                    e._callbacks[n.id].reject(n);
                    break;
                  default:
                    console.error(
                      'THREE.DRACOLoader: Unexpected message, "' + n.type + '"'
                    );
                }
              }),
              this.workerPool.push(e));
          } else
            this.workerPool.sort(function (e, t) {
              return e._taskLoad > t._taskLoad ? -1 : 1;
            });
          let n = this.workerPool[this.workerPool.length - 1];
          return ((n._taskCosts[e] = t), (n._taskLoad += t), n);
        });
      }
      _releaseTask(e, t) {
        ((e._taskLoad -= e._taskCosts[t]),
          delete e._callbacks[t],
          delete e._taskCosts[t]);
      }
      debug() {
        console.log(
          'Task load: ',
          this.workerPool.map((e) => e._taskLoad)
        );
      }
      dispose() {
        for (let e = 0; e < this.workerPool.length; ++e)
          this.workerPool[e].terminate();
        return ((this.workerPool.length = 0), this);
      }
    }
    function ac() {
      let e, t;
      onmessage = function (n) {
        let r = n.data;
        switch (r.type) {
          case 'init':
            ((e = r.decoderConfig),
              (t = new Promise(function (t) {
                ((e.onModuleLoaded = function (e) {
                  t({ draco: e });
                }),
                  DracoDecoderModule(e));
              })));
            break;
          case 'decode':
            let a = r.buffer,
              i = r.taskConfig;
            t.then((e) => {
              let t = e.draco,
                n = new t.Decoder(),
                o = new t.DecoderBuffer();
              o.Init(new Int8Array(a), a.byteLength);
              try {
                let e = (function (e, t, n, r) {
                    var a, i, o;
                    let l,
                      s,
                      u,
                      c,
                      d,
                      f,
                      p = r.attributeIDs,
                      h = r.attributeTypes,
                      m = t.GetEncodedGeometryType(n);
                    if (m === e.TRIANGULAR_MESH)
                      ((d = new e.Mesh()), (f = t.DecodeBufferToMesh(n, d)));
                    else if (m === e.POINT_CLOUD)
                      ((d = new e.PointCloud()),
                        (f = t.DecodeBufferToPointCloud(n, d)));
                    else
                      throw Error(
                        'THREE.DRACOLoader: Unexpected geometry type.'
                      );
                    if (!f.ok() || 0 === d.ptr)
                      throw Error(
                        'THREE.DRACOLoader: Decoding failed: ' + f.error_msg()
                      );
                    let g = { index: null, attributes: [] };
                    for (let n in p) {
                      let a,
                        i,
                        o = self[h[n]];
                      if (r.useUniqueIDs)
                        ((i = p[n]), (a = t.GetAttributeByUniqueId(d, i)));
                      else {
                        if (-1 === (i = t.GetAttributeId(d, e[p[n]]))) continue;
                        a = t.GetAttribute(d, i);
                      }
                      g.attributes.push(
                        (function (e, t, n, r, a, i) {
                          let o = i.num_components(),
                            l = n.num_points() * o,
                            s = l * a.BYTES_PER_ELEMENT,
                            u = (function (e, t) {
                              switch (t) {
                                case Float32Array:
                                  return e.DT_FLOAT32;
                                case Int8Array:
                                  return e.DT_INT8;
                                case Int16Array:
                                  return e.DT_INT16;
                                case Int32Array:
                                  return e.DT_INT32;
                                case Uint8Array:
                                  return e.DT_UINT8;
                                case Uint16Array:
                                  return e.DT_UINT16;
                                case Uint32Array:
                                  return e.DT_UINT32;
                              }
                            })(e, a),
                            c = e._malloc(s);
                          t.GetAttributeDataArrayForAllPoints(n, i, u, s, c);
                          let d = new a(e.HEAPF32.buffer, c, l).slice();
                          return (
                            e._free(c),
                            { name: r, array: d, itemSize: o }
                          );
                        })(e, t, d, n, o, a)
                      );
                    }
                    return (
                      m === e.TRIANGULAR_MESH &&
                        ((a = e),
                        (i = t),
                        (o = d),
                        (l = 3 * o.num_faces()),
                        (s = 4 * l),
                        (u = a._malloc(s)),
                        i.GetTrianglesUInt32Array(o, s, u),
                        (c = new Uint32Array(a.HEAPF32.buffer, u, l).slice()),
                        a._free(u),
                        (g.index = { array: c, itemSize: 1 })),
                      e.destroy(d),
                      g
                    );
                  })(t, n, o, i),
                  a = e.attributes.map((e) => e.array.buffer);
                (e.index && a.push(e.index.array.buffer),
                  self.postMessage(
                    { type: 'decode', id: r.id, geometry: e },
                    a
                  ));
              } catch (e) {
                (console.error(e),
                  self.postMessage({
                    type: 'error',
                    id: r.id,
                    error: e.message,
                  }));
              } finally {
                (t.destroy(o), t.destroy(n));
              }
            });
        }
      };
    }
    let ad = function (e) {
        let t = new Map(),
          n = new Map(),
          r = e.clone();
        return (
          (function e(t, n, r) {
            r(t, n);
            for (let a = 0; a < t.children.length; a++)
              e(t.children[a], n.children[a], r);
          })(e, r, function (e, r) {
            (t.set(r, e), n.set(e, r));
          }),
          r.traverse(function (e) {
            if (!e.isSkinnedMesh) return;
            let r = t.get(e),
              a = r.skeleton.bones;
            ((e.skeleton = r.skeleton.clone()),
              e.bindMatrix.copy(r.bindMatrix),
              (e.skeleton.bones = a.map(function (e) {
                return n.get(e);
              })),
              e.bind(e.skeleton, e.bindMatrix));
          }),
          r
        );
      },
      af = B.forwardRef(
        (
          {
            isChild: e = !1,
            object: t,
            children: n,
            deep: r,
            castShadow: a,
            receiveShadow: i,
            inject: o,
            keys: l,
            ...s
          },
          u
        ) => {
          let c = {
            keys: l,
            deep: r,
            inject: o,
            castShadow: a,
            receiveShadow: i,
          };
          if (
            Array.isArray(
              (t = B.useMemo(() => {
                if (!1 === e && !Array.isArray(t)) {
                  let e = !1;
                  if (
                    (t.traverse((t) => {
                      t.isSkinnedMesh && (e = !0);
                    }),
                    e)
                  )
                    return ad(t);
                }
                return t;
              }, [t, e]))
            )
          )
            return B.createElement(
              'group',
              tn({}, s, { ref: u }),
              t.map((e) =>
                B.createElement(af, tn({ key: e.uuid, object: e }, c))
              ),
              n
            );
          let { children: d, ...f } = (function (
              e,
              {
                keys: t = [
                  'near',
                  'far',
                  'color',
                  'distance',
                  'decay',
                  'penumbra',
                  'angle',
                  'intensity',
                  'skeleton',
                  'visible',
                  'castShadow',
                  'receiveShadow',
                  'morphTargetDictionary',
                  'morphTargetInfluences',
                  'name',
                  'geometry',
                  'material',
                  'position',
                  'rotation',
                  'scale',
                  'up',
                  'userData',
                  'bindMode',
                  'bindMatrix',
                  'bindMatrixInverse',
                  'skeleton',
                ],
                deep: n,
                inject: r,
                castShadow: a,
                receiveShadow: i,
              }
            ) {
              let o = {};
              for (let n of t) o[n] = e[n];
              return (
                n &&
                  (o.geometry &&
                    'materialsOnly' !== n &&
                    (o.geometry = o.geometry.clone()),
                  o.material &&
                    'geometriesOnly' !== n &&
                    (o.material = o.material.clone())),
                r &&
                  (o =
                    'function' == typeof r
                      ? { ...o, children: r(e) }
                      : B.isValidElement(r)
                        ? { ...o, children: r }
                        : { ...o, ...r }),
                e instanceof S.Mesh &&
                  (a && (o.castShadow = !0), i && (o.receiveShadow = !0)),
                o
              );
            })(t, c),
            p = t.type[0].toLowerCase() + t.type.slice(1);
          return B.createElement(
            p,
            tn({}, f, s, { ref: u }),
            t.children.map((e) =>
              'Bone' === e.type
                ? B.createElement(
                    'primitive',
                    tn({ key: e.uuid, object: e }, c)
                  )
                : B.createElement(
                    af,
                    tn({ key: e.uuid, object: e }, c, { isChild: !0 })
                  )
            ),
            n,
            d
          );
        }
      ),
      ap = null,
      ah = 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/';
    function am(e = !0, t = !0, n) {
      return (r) => {
        (n && n(r),
          e &&
            (ap || (ap = new au()),
            ap.setDecoderPath('string' == typeof e ? e : ah),
            r.setDRACOLoader(ap)),
          t &&
            r.setMeshoptDecoder(
              (() => {
                let e;
                if (l) return l;
                let t = new Uint8Array([
                    0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0,
                    0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0,
                    65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11,
                  ]),
                  n = new Uint8Array([
                    32, 0, 65, 253, 3, 1, 2, 34, 4, 106, 6, 5, 11, 8, 7, 20, 13,
                    33, 12, 16, 128, 9, 116, 64, 19, 113, 127, 15, 10, 21, 22,
                    14, 255, 66, 24, 54, 136, 107, 18, 23, 192, 26, 114, 118,
                    132, 17, 77, 101, 130, 144, 27, 87, 131, 44, 45, 74, 156,
                    154, 70, 167,
                  ]);
                if ('object' != typeof WebAssembly) return { supported: !1 };
                let r =
                  'B9h9z9tFBBBF8fL9gBB9gLaaaaaFa9gEaaaB9gFaFa9gEaaaFaEMcBFFFGGGEIIILF9wFFFLEFBFKNFaFCx/IFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBF8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBGy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBEn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBIi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBKI9z9iqlBOc+x8ycGBM/qQFTa8jUUUUBCU/EBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAGTkUUUBRNCUoBAG9uC/wgBZHKCUGAKCUG9JyRVAECFJRICBRcGXEXAcAF9PQFAVAFAclAcAVJAF9JyRMGXGXAG9FQBAMCbJHKC9wZRSAKCIrCEJCGrRQANCUGJRfCBRbAIRTEXGXAOATlAQ9PQBCBRISEMATAQJRIGXAS9FQBCBRtCBREEXGXAOAIlCi9PQBCBRISLMANCU/CBJAEJRKGXGXGXGXGXATAECKrJ2BBAtCKZrCEZfIBFGEBMAKhB83EBAKCNJhB83EBSEMAKAI2BIAI2BBHmCKrHYAYCE6HYy86BBAKCFJAICIJAYJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCGJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCEJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCIJAYAmJHY2BBAI2BFHmCKrHPAPCE6HPy86BBAKCLJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCKJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCOJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCNJAYAmJHY2BBAI2BGHmCKrHPAPCE6HPy86BBAKCVJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCcJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCMJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCSJAYAmJHm2BBAI2BEHICKrHYAYCE6HYy86BBAKCQJAmAYJHm2BBAICIrCEZHYAYCE6HYy86BBAKCfJAmAYJHm2BBAICGrCEZHYAYCE6HYy86BBAKCbJAmAYJHK2BBAICEZHIAICE6HIy86BBAKAIJRISGMAKAI2BNAI2BBHmCIrHYAYCb6HYy86BBAKCFJAICNJAYJHY2BBAmCbZHmAmCb6Hmy86BBAKCGJAYAmJHm2BBAI2BFHYCIrHPAPCb6HPy86BBAKCEJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCIJAmAYJHm2BBAI2BGHYCIrHPAPCb6HPy86BBAKCLJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCKJAmAYJHm2BBAI2BEHYCIrHPAPCb6HPy86BBAKCOJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCNJAmAYJHm2BBAI2BIHYCIrHPAPCb6HPy86BBAKCVJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCcJAmAYJHm2BBAI2BLHYCIrHPAPCb6HPy86BBAKCMJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCSJAmAYJHm2BBAI2BKHYCIrHPAPCb6HPy86BBAKCQJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCfJAmAYJHm2BBAI2BOHICIrHYAYCb6HYy86BBAKCbJAmAYJHK2BBAICbZHIAICb6HIy86BBAKAIJRISFMAKAI8pBB83BBAKCNJAICNJ8pBB83BBAICTJRIMAtCGJRtAECTJHEAS9JQBMMGXAIQBCBRISEMGXAM9FQBANAbJ2BBRtCBRKAfREEXAEANCU/CBJAKJ2BBHTCFrCBATCFZl9zAtJHt86BBAEAGJREAKCFJHKAM9HQBMMAfCFJRfAIRTAbCFJHbAG9HQBMMABAcAG9sJANCUGJAMAG9sTkUUUBpANANCUGJAMCaJAG9sJAGTkUUUBpMAMCBAIyAcJRcAIQBMC9+RKSFMCBC99AOAIlAGCAAGCA9Ly6yRKMALCU/EBJ8kUUUUBAKM+OmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUFT+JUUUBpALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM+lLKFaF99GaG99FaG99GXGXAGCI9HQBAF9FQFEXGXGX9DBBB8/9DBBB+/ABCGJHG1BB+yAB1BBHE+yHI+L+TABCFJHL1BBHK+yHO+L+THN9DBBBB9gHVyAN9DBB/+hANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE86BBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG86BBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG86BBABCIJRBAFCaJHFQBSGMMAF9FQBEXGXGX9DBBB8/9DBBB+/ABCIJHG8uFB+yAB8uFBHE+yHI+L+TABCGJHL8uFBHK+yHO+L+THN9DBBBB9gHVyAN9DB/+g6ANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE87FBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG87FBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG87FBABCNJRBAFCaJHFQBMMM/SEIEaE99EaF99GXAF9FQBCBREABRIEXGXGX9D/zI818/AICKJ8uFBHLCEq+y+VHKAI8uFB+y+UHO9DB/+g6+U9DBBB8/9DBBB+/AO9DBBBB9gy+SHN+L9DBBB9P9d9FQBAN+oRVSFMCUUUU94RVMAICIJ8uFBRcAICGJ8uFBRMABALCFJCEZAEqCFWJAV87FBGXGXAKAM+y+UHN9DB/+g6+U9DBBB8/9DBBB+/AN9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRMSFMCUUUU94RMMABALCGJCEZAEqCFWJAM87FBGXGXAKAc+y+UHK9DB/+g6+U9DBBB8/9DBBB+/AK9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRcSFMCUUUU94RcMABALCaJCEZAEqCFWJAc87FBGXGX9DBBU8/AOAO+U+TANAN+U+TAKAK+U+THO9DBBBBAO9DBBBB9gy+R9DB/+g6+U9DBBB8/+SHO+L9DBBB9P9d9FQBAO+oRcSFMCUUUU94RcMABALCEZAEqCFWJAc87FBAICNJRIAECIJREAFCaJHFQBMMM9JBGXAGCGrAF9sHF9FQBEXABAB8oGBHGCNWCN91+yAGCi91CnWCUUU/8EJ+++U84GBABCIJRBAFCaJHFQBMMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEM/lFFFaGXGXAFABqCEZ9FQBABRESFMGXGXAGCT9PQBABRESFMABREEXAEAF8oGBjGBAECIJAFCIJ8oGBjGBAECNJAFCNJ8oGBjGBAECSJAFCSJ8oGBjGBAECTJREAFCTJRFAGC9wJHGCb9LQBMMAGCI9JQBEXAEAF8oGBjGBAFCIJRFAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF2BB86BBAECFJREAFCFJRFAGCaJHGQBMMABMoFFGaGXGXABCEZ9FQBABRESFMAFCgFZC+BwsN9sRIGXGXAGCT9PQBABRESFMABREEXAEAIjGBAECSJAIjGBAECNJAIjGBAECIJAIjGBAECTJREAGC9wJHGCb9LQBMMAGCI9JQBEXAEAIjGBAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF86BBAECFJREAGCaJHGQBMMABMMMFBCUNMIT9kBB';
                WebAssembly.validate(t) &&
                  (r =
                    'B9h9z9tFBBBFiI9gBB9gLaaaaaFa9gEaaaB9gFaFaEMcBBFBFFGGGEILF9wFFFLEFBFKNFaFCx/aFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBG8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBIy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBKi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBOn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBNI9z9iqlBVc+N9IcIBTEM9+FLa8jUUUUBCTlRBCBRFEXCBRGCBREEXABCNJAGJAECUaAFAGrCFZHIy86BBAEAIJREAGCFJHGCN9HQBMAFCx+YUUBJAE86BBAFCEWCxkUUBJAB8pEN83EBAFCFJHFCUG9HQBMMk8lLbaE97F9+FaL978jUUUUBCU/KBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAG/8cBBCUoBAG9uC/wgBZHKCUGAKCUG9JyRNAECFJRKCBRVGXEXAVAF9PQFANAFAVlAVANJAF9JyRcGXGXAG9FQBAcCbJHIC9wZHMCE9sRSAMCFWRQAICIrCEJCGrRfCBRbEXAKRTCBRtGXEXGXAOATlAf9PQBCBRKSLMALCU/CBJAtAM9sJRmATAfJRKCBREGXAMCoB9JQBAOAKlC/gB9JQBCBRIEXAmAIJREGXGXGXGXGXATAICKrJ2BBHYCEZfIBFGEBMAECBDtDMIBSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMIBAKCTJRKMGXGXGXGXGXAYCGrCEZfIBFGEBMAECBDtDMITSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMITAKCTJRKMGXGXGXGXGXAYCIrCEZfIBFGEBMAECBDtDMIASEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMIAAKCTJRKMGXGXGXGXGXAYCKrfIBFGEBMAECBDtDMI8wSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCIJAeDeBJAYCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCNJAeDeBJAYCx+YUUBJ2BBJRKSFMAEAKDBBBDMI8wAKCTJRKMAICoBJREAICUFJAM9LQFAERIAOAKlC/fB9LQBMMGXAEAM9PQBAECErRIEXGXAOAKlCi9PQBCBRKSOMAmAEJRYGXGXGXGXGXATAECKrJ2BBAICKZrCEZfIBFGEBMAYCBDtDMIBSEMAYAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAYAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAYAKDBBBDMIBAKCTJRKMAICGJRIAECTJHEAM9JQBMMGXAK9FQBAKRTAtCFJHtCI6QGSFMMCBRKSEMGXAM9FQBALCUGJAbJREALAbJDBGBReCBRYEXAEALCU/CBJAYJHIDBIBHdCFD9tAdCFDbHPD9OD9hD9RHdAIAMJDBIBH8ZCFD9tA8ZAPD9OD9hD9RH8ZDQBTFtGmEYIPLdKeOnHpAIAQJDBIBHyCFD9tAyAPD9OD9hD9RHyAIASJDBIBH8cCFD9tA8cAPD9OD9hD9RH8cDQBTFtGmEYIPLdKeOnH8dDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGEAeD9uHeDyBjGBAEAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeApA8dDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeAdA8ZDQNiV8ZcpMyS8cQ8df8eb8fHdAyA8cDQNiV8ZcpMyS8cQ8df8eb8fH8ZDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeAdA8ZDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJREAYCTJHYAM9JQBMMAbCIJHbAG9JQBMMABAVAG9sJALCUGJAcAG9s/8cBBALALCUGJAcCaJAG9sJAG/8cBBMAcCBAKyAVJRVAKQBMC9+RKSFMCBC99AOAKlAGCAAGCA9Ly6yRKMALCU/KBJ8kUUUUBAKMNBT+BUUUBM+KmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUF/8MBALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM/dLEK97FaF97GXGXAGCI9HQBAF9FQFCBRGEXABABDBBBHECiD+rFCiD+sFD/6FHIAECND+rFCiD+sFD/6FAID/gFAECTD+rFCiD+sFD/6FHLD/gFD/kFD/lFHKCBDtD+2FHOAICUUUU94DtHND9OD9RD/kFHI9DBB/+hDYAIAID/mFAKAKD/mFALAOALAND9OD9RD/kFHIAID/mFD/kFD/kFD/jFD/nFHLD/mF9DBBX9LDYHOD/kFCgFDtD9OAECUUU94DtD9OD9QAIALD/mFAOD/kFCND+rFCU/+EDtD9OD9QAKALD/mFAOD/kFCTD+rFCUU/8ODtD9OD9QDMBBABCTJRBAGCIJHGAF9JQBSGMMAF9FQBCBRGEXABCTJHVAVDBBBHECBDtHOCUU98D8cFCUU98D8cEHND9OABDBBBHKAEDQILKOSQfbPden8c8d8e8fCggFDtD9OD/6FAKAEDQBFGENVcMTtmYi8ZpyHECTD+sFD/6FHID/gFAECTD+rFCTD+sFD/6FHLD/gFD/kFD/lFHE9DB/+g6DYALAEAOD+2FHOALCUUUU94DtHcD9OD9RD/kFHLALD/mFAEAED/mFAIAOAIAcD9OD9RD/kFHEAED/mFD/kFD/kFD/jFD/nFHID/mF9DBBX9LDYHOD/kFCTD+rFALAID/mFAOD/kFCggEDtD9OD9QHLAEAID/mFAOD/kFCaDbCBDnGCBDnECBDnKCBDnOCBDncCBDnMCBDnfCBDnbD9OHEDQNVi8ZcMpySQ8c8dfb8e8fD9QDMBBABAKAND9OALAEDQBFTtGEmYILPdKOenD9QDMBBABCAJRBAGCIJHGAF9JQBMMM/hEIGaF97FaL978jUUUUBCTlREGXAF9FQBCBRIEXAEABDBBBHLABCTJHKDBBBHODQILKOSQfbPden8c8d8e8fHNCTD+sFHVCID+rFDMIBAB9DBBU8/DY9D/zI818/DYAVCEDtD9QD/6FD/nFHVALAODQBFGENVcMTtmYi8ZpyHLCTD+rFCTD+sFD/6FD/mFHOAOD/mFAVALCTD+sFD/6FD/mFHcAcD/mFAVANCTD+rFCTD+sFD/6FD/mFHNAND/mFD/kFD/kFD/lFCBDtD+4FD/jF9DB/+g6DYHVD/mF9DBBX9LDYHLD/kFCggEDtHMD9OAcAVD/mFALD/kFCTD+rFD9QHcANAVD/mFALD/kFCTD+rFAOAVD/mFALD/kFAMD9OD9QHVDQBFTtGEmYILPdKOenHLD8dBAEDBIBDyB+t+J83EBABCNJALD8dFAEDBIBDyF+t+J83EBAKAcAVDQNVi8ZcMpySQ8c8dfb8e8fHVD8dBAEDBIBDyG+t+J83EBABCiJAVD8dFAEDBIBDyE+t+J83EBABCAJRBAICIJHIAF9JQBMMM9jFF97GXAGCGrAF9sHG9FQBCBRFEXABABDBBBHECND+rFCND+sFD/6FAECiD+sFCnD+rFCUUU/8EDtD+uFD/mFDMBBABCTJRBAFCIJHFAG9JQBMMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEMMMFBCUNMIT9tBB');
                let a = WebAssembly.instantiate(
                  (function (e) {
                    let t = new Uint8Array(e.length);
                    for (let n = 0; n < e.length; ++n) {
                      let r = e.charCodeAt(n);
                      t[n] =
                        r > 96
                          ? r - 71
                          : r > 64
                            ? r - 65
                            : r > 47
                              ? r + 4
                              : r > 46
                                ? 63
                                : 62;
                    }
                    let r = 0;
                    for (let a = 0; a < e.length; ++a)
                      t[r++] = t[a] < 60 ? n[t[a]] : (t[a] - 60) * 64 + t[++a];
                    return t.buffer.slice(0, r);
                  })(r),
                  {}
                ).then((t) => {
                  (e = t.instance).exports.__wasm_call_ctors();
                });
                function i(t, n, r, a, i, o) {
                  let l = e.exports.sbrk,
                    s = (r + 3) & -4,
                    u = l(s * a),
                    c = l(i.length),
                    d = new Uint8Array(e.exports.memory.buffer);
                  d.set(i, c);
                  let f = t(u, r, a, c, i.length);
                  if (
                    (0 === f && o && o(u, s, a),
                    n.set(d.subarray(u, u + r * a)),
                    l(u - l(0)),
                    0 !== f)
                  )
                    throw Error(`Malformed buffer data: ${f}`);
                }
                let o = {
                    0: '',
                    1: 'meshopt_decodeFilterOct',
                    2: 'meshopt_decodeFilterQuat',
                    3: 'meshopt_decodeFilterExp',
                    NONE: '',
                    OCTAHEDRAL: 'meshopt_decodeFilterOct',
                    QUATERNION: 'meshopt_decodeFilterQuat',
                    EXPONENTIAL: 'meshopt_decodeFilterExp',
                  },
                  s = {
                    0: 'meshopt_decodeVertexBuffer',
                    1: 'meshopt_decodeIndexBuffer',
                    2: 'meshopt_decodeIndexSequence',
                    ATTRIBUTES: 'meshopt_decodeVertexBuffer',
                    TRIANGLES: 'meshopt_decodeIndexBuffer',
                    INDICES: 'meshopt_decodeIndexSequence',
                  };
                return (l = {
                  ready: a,
                  supported: !0,
                  decodeVertexBuffer(t, n, r, a, l) {
                    i(
                      e.exports.meshopt_decodeVertexBuffer,
                      t,
                      n,
                      r,
                      a,
                      e.exports[o[l]]
                    );
                  },
                  decodeIndexBuffer(t, n, r, a) {
                    i(e.exports.meshopt_decodeIndexBuffer, t, n, r, a);
                  },
                  decodeIndexSequence(t, n, r, a) {
                    i(e.exports.meshopt_decodeIndexSequence, t, n, r, a);
                  },
                  decodeGltfBuffer(t, n, r, a, l, u) {
                    i(e.exports[s[l]], t, n, r, a, e.exports[o[u]]);
                  },
                });
              })()
            ));
      };
    }
    let ag = (e, t, n, r) => ey(rM, e, am(t, n, r));
    ((ag.preload = (e, t, n, r) => ey.preload(rM, e, am(t, n, r))),
      (ag.clear = (e) => ey.clear(rM, e)),
      (ag.setDecoderPath = (e) => {
        ah = e;
      }));
    let aA = B.forwardRef(
      (
        {
          children: e,
          enabled: t = !0,
          speed: n = 1,
          rotationIntensity: r = 1,
          floatIntensity: a = 1,
          floatingRange: i = [-0.1, 0.1],
          autoInvalidate: o = !1,
          ...l
        },
        s
      ) => {
        let u = B.useRef(null);
        B.useImperativeHandle(s, () => u.current, []);
        let c = B.useRef(1e4 * Math.random());
        return (
          eB((e) => {
            var l, s;
            if (!t || 0 === n) return;
            o && e.invalidate();
            let d = c.current + e.clock.elapsedTime;
            ((u.current.rotation.x = (Math.cos((d / 4) * n) / 8) * r),
              (u.current.rotation.y = (Math.sin((d / 4) * n) / 8) * r),
              (u.current.rotation.z = (Math.sin((d / 4) * n) / 20) * r));
            let f = Math.sin((d / 4) * n) / 10;
            ((f = S.MathUtils.mapLinear(
              f,
              -0.1,
              0.1,
              null != (l = null == i ? void 0 : i[0]) ? l : -0.1,
              null != (s = null == i ? void 0 : i[1]) ? s : 0.1
            )),
              (u.current.position.y = f * a),
              u.current.updateMatrix());
          }),
          B.createElement(
            'group',
            l,
            B.createElement('group', { ref: u, matrixAutoUpdate: !1 }, e)
          )
        );
      }
    );
    function av({ scrollProgress: e, ...t }) {
      let { nodes: n, materials: r } = ag(
          'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb'
        ),
        { gl: a, viewport: i } = ev(),
        o = (0, B.useRef)(null),
        l = (0, B.useRef)(null),
        s = (0, B.useRef)({ x: 0, y: 0 }),
        u = (0, B.useMemo)(() => {
          if (Array.isArray(t.position)) {
            let [e = 0, n = 0, r = 0] = t.position;
            return new S.Vector3(e, n, r);
          }
          return t.position instanceof S.Vector3
            ? t.position.clone()
            : new S.Vector3(0, 0, 0);
        }, [t.position]);
      ((0, B.useEffect)(() => {
        let e = (e) => {
            if (a.domElement) {
              let t = a.domElement.getBoundingClientRect();
              s.current = {
                x: ((e.clientX - t.left) / t.width) * 2 - 1,
                y: -(2 * ((e.clientY - t.top) / t.height)) + 1,
              };
            }
          },
          t = a.domElement;
        return (
          t.addEventListener('mousemove', e),
          () => t.removeEventListener('mousemove', e)
        );
      }, [a]),
        (0, B.useEffect)(() => {
          o.current && o.current.position.copy(u);
        }, [u]));
      let c = i.width < 5 ? 0.18 * i.width : 0.6;
      return (
        (0, B.useEffect)(() => {
          let e = (e) => {
              if (e.touches.length > 0 && a.domElement) {
                let t = e.touches[0],
                  n = a.domElement.getBoundingClientRect();
                s.current = {
                  x: ((t.clientX - n.left) / n.width) * 2 - 1,
                  y: -(2 * ((t.clientY - n.top) / n.height)) + 1,
                };
              }
            },
            t = a.domElement;
          return (
            t.addEventListener('touchmove', e, { passive: !0 }),
            () => t.removeEventListener('touchmove', e)
          );
        }, [a]),
        eB((t) => {
          if (!l.current || !e || !o.current) return;
          let n = e.get(),
            r = s.current;
          ((o.current.position.x = S.MathUtils.lerp(
            o.current.position.x,
            u.x + 0,
            0.05
          )),
            (l.current.rotation.y = S.MathUtils.lerp(
              l.current.rotation.y,
              0,
              0.05
            )),
            (l.current.position.x = S.MathUtils.lerp(
              l.current.position.x,
              0.2 * r.x,
              0.05
            )),
            (l.current.position.y = S.MathUtils.lerp(
              l.current.position.y,
              0.2 * r.y,
              0.05
            )),
            (l.current.rotation.x = S.MathUtils.lerp(
              l.current.rotation.x,
              -(0.8 * (0.2 * r.y)),
              0.05
            )),
            (l.current.rotation.z = S.MathUtils.lerp(
              l.current.rotation.z,
              -(0.5 * (0.2 * r.x)),
              0.05
            )));
          let a = 1;
          if (n > 0.8) {
            let e = Math.min(1, (n - 0.8) * 5);
            l.current.position.z = S.MathUtils.lerp(
              l.current.position.z,
              +e,
              0.05
            );
            let r = 0.05 * Math.sin(2 * t.clock.elapsedTime) * e;
            ((l.current.rotation.z += r), (a = 1 + 0.1 * e));
          } else
            l.current.position.z = S.MathUtils.lerp(
              l.current.position.z,
              0,
              0.05
            );
          l.current.scale.setScalar(a);
        }),
        (0, v.jsx)(aA, {
          speed: 2,
          rotationIntensity: 0.5,
          floatIntensity: 0.5,
          floatingRange: [-0.1, 0.1],
          children: (0, v.jsx)('group', {
            ref: o,
            ...t,
            scale: c,
            dispose: null,
            children: (0, v.jsxs)('group', {
              ref: l,
              children: [
                (0, v.jsx)('mesh', {
                  name: 'Body_Ghost_White_0',
                  castShadow: !0,
                  receiveShadow: !0,
                  geometry: n.Body_Ghost_White_0.geometry,
                  material: r.Ghost_White,
                  position: [0, 1.5578, 0],
                  rotation: [-Math.PI / 2, 0, 0],
                }),
                (0, v.jsx)('mesh', {
                  name: 'Eyes_Eyes_0',
                  castShadow: !0,
                  receiveShadow: !0,
                  geometry: n.Eyes_Eyes_0.geometry,
                  material: r.Eyes,
                  position: [0, 1.5578, 0],
                  rotation: [-Math.PI / 2, 0, 0],
                }),
                (0, v.jsx)('mesh', {
                  name: 'Hat_Hat_Black_0',
                  castShadow: !0,
                  receiveShadow: !0,
                  geometry: n.Hat_Hat_Black_0.geometry,
                  material: r.Hat_Black,
                  position: [0, 2.9913, 0],
                  rotation: [-Math.PI / 2, 0, 0],
                }),
                (0, v.jsx)('mesh', {
                  name: 'Rim_Rim_Red_0',
                  castShadow: !0,
                  receiveShadow: !0,
                  geometry: n.Rim_Rim_Red_0.geometry,
                  material: r.Rim_Red,
                  position: [0, 2.3541, 0],
                  rotation: [-Math.PI / 2, 0, 0],
                }),
              ],
            }),
          }),
        })
      );
    }
    ag.preload(
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb'
    );
    var aB = e.i(40022);
    let ab = [
        'Um\nvídeo\nque\nrespira.',
        'Uma\nmarca\nque se\nreconhece.',
        'Um\ndetalhe\nque\nfica.',
        'Crio\npara\ngerar\npresença.',
        'Mesmo\nquando\nnão\nestou\nali.',
        'Mesmo\nquando\nninguém\npercebe\no esforço.',
      ],
      aC = [
        aB.BRAND.colors.bluePrimary,
        aB.BRAND.colors.purpleDetails,
        aB.BRAND.colors.pinkDetails,
        aB.BRAND.colors.bluePrimary,
        aB.BRAND.colors.purpleDetails,
        aB.BRAND.colors.pinkDetails,
      ],
      ay = aB.BRAND.colors.bluePrimary,
      ax = () => {
        let e = B.default.useRef(null),
          { scrollYProgress: t } = (0, C.useScroll)({
            target: e,
            offset: ['start end', 'end end'],
          }),
          n = (0, b.cubicBezier)(0.22, 1, 0.36, 1),
          r = (0, y.useTransform)(t, [0.05, 0.12, 0.85, 0.95], [0, 1, 1, 0], {
            ease: n,
          });
        return (0, v.jsxs)('section', {
          ref: e,
          className: 'relative w-full',
          children: [
            (0, v.jsxs)('div', {
              className: 'relative pointer-events-none z-20',
              children: [
                (0, v.jsx)(rC, { opacity: r, progress: t }),
                ab.map((e, t) =>
                  (0, v.jsx)(
                    rv,
                    { text: e, bgColor: aC[t] || aC[0], isFirst: 0 === t },
                    t
                  )
                ),
                (0, v.jsx)(rB, { bgColor: ay, scrollProgress: t }),
              ],
            }),
            (0, v.jsx)('div', {
              className:
                'absolute inset-0 w-full h-full pointer-events-none z-30',
              children: (0, v.jsx)('div', {
                className:
                  'sticky top-0 w-full h-screen overflow-hidden pointer-events-auto',
                children: (0, v.jsxs)(tt, {
                  shadows: !0,
                  dpr: [1, 2],
                  camera: { position: [0, 0, 8], fov: 35 },
                  gl: { alpha: !0, antialias: !0 },
                  className: 'w-full h-full',
                  children: [
                    (0, v.jsx)(rh, { preset: 'city' }),
                    (0, v.jsx)('ambientLight', { intensity: 0.8 }),
                    (0, v.jsx)('spotLight', {
                      position: [10, 10, 10],
                      angle: 0.15,
                      penumbra: 1,
                      intensity: 1,
                    }),
                    (0, v.jsx)(B.Suspense, {
                      fallback: null,
                      children: (0, v.jsx)(av, {
                        scrollProgress: t,
                        position: [0, -1, 0],
                        rotation: [0, 0, 0],
                      }),
                    }),
                  ],
                }),
              }),
            }),
          ],
        });
      };
    e.s(['AboutBeliefs', 0, ax, 'default', 0, ax], 9455);
  },
  55586,
  (e) => {
    'use strict';
    var t = e.i(77579),
      n = e.i(62897),
      r = e.i(90541),
      a = e.i(21785),
      i = e.i(55064),
      o = e.i(86791);
    function l() {
      let e = (0, r.useReducedMotion)();
      return (0, t.jsx)('section', {
        className: 'std-grid bg-background py-20 md:py-32',
        'aria-label': 'Fechamento do Manifesto',
        children: (0, t.jsxs)(n.motion.div, {
          variants: o.motionTokens.fadeGhost,
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
                    'text-display font-bold leading-tight text-white md:leading-[1.1]',
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
                      children: '12 anos de estrada.',
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
                    'text-h2 text-white max-w-200 leading-snug mx-auto text-center',
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
                  className: 'text-h2 text-white leading-snug',
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
                  children: i.ABOUT_CONTENT.closing.ctas.map((e, n) =>
                    (0, t.jsx)(
                      a.default,
                      {
                        href: e.href,
                        text: e.label,
                        className: 'relative min-w-50',
                      },
                      n
                    )
                  ),
                }),
              ],
            }),
          ],
        }),
      });
    }
    e.s(['AboutClosing', () => l]);
  },
]);

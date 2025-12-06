module.exports = [
  32860,
  (a) => {
    'use strict';
    let b = (0, a.i(70106).default)('arrow-right', [
      ['path', { d: 'M5 12h14', key: '1ays0h' }],
      ['path', { d: 'm12 5 7 7-7 7', key: 'xquz4c' }],
    ]);
    a.s(['ArrowRight', () => b], 32860);
  },
  9264,
  (a) => {
    'use strict';
    var b = a.i(87924),
      c = a.i(72131),
      d = a.i(46271),
      e = a.i(95180),
      f = a.i(1299),
      g = a.i(32860),
      h = a.i(3076);
    let i = ({ text: a, className: c, delayStart: d = 0 }) => {
      let e = a.split('');
      return (0, b.jsx)('p', {
        className: `ref-word-anim flex overflow-hidden leading-[1.15] ${c}`,
        'aria-label': a,
        children: e.map((a, c) =>
          (0, b.jsx)(
            'span',
            {
              'aria-hidden': 'true',
              style: { '--i': c + d },
              className: 'block',
              children: ' ' === a ? ' ' : a,
            },
            c
          )
        ),
      });
    };
    a.s(
      [
        'default',
        0,
        () => {
          var a;
          let j = (0, c.useRef)(null),
            k = (0, c.useRef)(null),
            [l, m] = (0, c.useState)(!1);
          (0, c.useEffect)(() => {
            let a = setTimeout(() => m(!0), 100);
            return () => clearTimeout(a);
          }, []);
          let { scrollYProgress: n } = (0, e.useScroll)({
            target: j,
            offset: ['start start', 'end end'],
          });
          ((a = (a) => {
            k.current &&
              (a > 0.01 ? (k.current.muted = !1) : (k.current.muted = !0));
          }),
            (0, c.useInsertionEffect)(
              () => n.on('change', a),
              [n, 'change', a]
            ));
          let o = (0, f.useTransform)(n, [0, 0.15], [1, 0]),
            p = (0, f.useTransform)(n, [0, 0.15], [1, 0.95]),
            q = (0, f.useTransform)(n, [0, 0.15], [0, -50]),
            r = (0, f.useTransform)(n, [0, 0.25], [0.25, 1]),
            s = (0, f.useTransform)(n, [0, 0.25], ['35%', '0%']),
            t = (0, f.useTransform)(n, [0, 0.25], ['30%', '0%']),
            u = (0, f.useTransform)(n, [0, 0.2], [12, 0]);
          return (0, b.jsxs)('section', {
            id: 'hero',
            ref: j,
            className: 'relative h-[450vh] w-full bg-[#F4F5F7]',
            children: [
              (0, b.jsx)('style', {
                children: `
        .ref-word-anim {
          --trans-duration: 3000ms; /* Updated to match reference exactly */
          --trans-delay-factor: 20ms; /* Updated to match reference exactly */
          /* The specific linear easing from the reference */
          --trans-timing-function: linear(0, 0.011 0.6%, 0.041 1.2%, 0.173 2.6%, 0.894 7.4%, 1.128 9.3%, 1.271 11.1%, 1.311 12%, 1.333 13%, 1.328 14.4%, 1.286 15.9%, 1.031 21%, 0.95 23%, 0.907 24.7%, 0.888 26.5%, 0.89 27.9%, 0.904 29.4%, 1.034 42.5%, 0.997 49.3%, 0.987 53.3%, 1.004 66.5%, 1);
        }
        
        .ref-word-anim span {
          transform: translateY(110%);
          opacity: 0;
          transition: transform var(--trans-duration) var(--trans-timing-function), opacity var(--trans-duration) var(--trans-timing-function);
          transition-delay: calc(var(--i) * var(--trans-delay-factor));
        }

        .hero-text-visible .ref-word-anim span {
          transform: translateY(0);
          opacity: 1;
        }
      `,
              }),
              (0, b.jsxs)('div', {
                className:
                  'sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center',
                children: [
                  (0, b.jsxs)(d.motion.div, {
                    style: { opacity: o, scale: p, y: q },
                    className: `absolute inset-0 container mx-auto px-6 md:px-12 lg:px-16 h-full z-10 pointer-events-none ${l ? 'hero-text-visible' : ''}`,
                    children: [
                      (0, b.jsx)(d.motion.div, {
                        initial: { opacity: 0, x: 20 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: 1, duration: 0.8 },
                        className:
                          'absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:block',
                        children: (0, b.jsx)('span', {
                          className:
                            'text-[#0057FF] font-medium tracking-widest text-lg md:text-xl',
                          children: '[ BRAND AWARENESS ]',
                        }),
                      }),
                      (0, b.jsxs)('div', {
                        className:
                          'flex flex-col justify-center items-start h-full pt-24 md:pt-0 max-w-4xl',
                        children: [
                          (0, b.jsx)('div', {
                            className:
                              'text-[4.5rem] md:text-7xl lg:text-[7.5rem] font-extrabold tracking-[-0.04em] mb-6 md:mb-10 font-sans flex flex-col items-start gap-1',
                            children: (0, b.jsxs)('div', {
                              className: 'flex flex-col items-start gap-2',
                              children: [
                                (0, b.jsx)(i, {
                                  text: 'Design,',
                                  className: 'text-[#0057FF]',
                                  delayStart: 0,
                                }),
                                (0, b.jsx)(i, {
                                  text: 'não é só',
                                  className: 'text-[#111111]',
                                  delayStart: 7,
                                }),
                                (0, b.jsx)(i, {
                                  text: 'estética.',
                                  className: 'text-[#111111]',
                                  delayStart: 15,
                                }),
                              ],
                            }),
                          }),
                          (0, b.jsx)(d.motion.div, {
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            transition: {
                              duration: 1.2,
                              ease: 'easeOut',
                              delay: 1.8,
                            },
                            className: 'mb-10 md:mb-14 relative',
                            children: (0, b.jsx)('p', {
                              className:
                                'text-[#0057FF] text-lg md:text-xl font-medium tracking-wide bg-white/5 backdrop-blur-sm rounded-lg pr-4 inline-block',
                              children:
                                '[ É intenção, é estratégia, é experiência. ]',
                            }),
                          }),
                          (0, b.jsx)(d.motion.div, {
                            className: 'pointer-events-auto',
                            children: (0, b.jsxs)(d.motion.a, {
                              href: '/sobre',
                              initial: { opacity: 0, y: 20 },
                              whileInView: { opacity: 1, y: 0 },
                              viewport: { once: !0 },
                              transition: {
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 2,
                              },
                              whileHover: {
                                scale: 1.05,
                                boxShadow:
                                  '0 10px 30px -10px rgba(0, 87, 255, 0.5)',
                              },
                              whileTap: { scale: 0.98 },
                              className:
                                'group bg-[#0057FF] text-white rounded-full pl-8 pr-6 py-4 flex items-center gap-3 font-semibold text-base md:text-lg shadow-xl shadow-[#0057FF]/20 transition-all',
                              children: [
                                'get to know me better',
                                (0, b.jsx)('span', {
                                  className:
                                    'flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors',
                                  children: (0, b.jsx)(g.ArrowRight, {
                                    className: 'w-4 h-4 text-white',
                                  }),
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, b.jsx)(d.motion.div, {
                    style: { scale: r, x: s, y: t, borderRadius: u },
                    className:
                      'absolute z-40 w-full h-full flex items-center justify-center overflow-hidden shadow-2xl origin-center bg-black pointer-events-none',
                    children: (0, b.jsx)('div', {
                      className:
                        'relative w-full h-full block group pointer-events-auto',
                      children: (0, b.jsx)('video', {
                        ref: k,
                        src: h.ASSETS.videoManifesto,
                        autoPlay: !0,
                        muted: !0,
                        loop: !0,
                        playsInline: !0,
                        className:
                          'w-full h-full object-cover transition-opacity duration-500',
                      }),
                    }),
                  }),
                ],
              }),
            ],
          });
        },
      ],
      9264
    );
  },
  22520,
  (a) => {
    'use strict';
    let b = (0, a.i(70106).default)('arrow-up-right', [
      ['path', { d: 'M7 7h10v10', key: '1tivn9' }],
      ['path', { d: 'M7 17 17 7', key: '1vkiza' }],
    ]);
    a.s(['ArrowUpRight', () => b], 22520);
  },
  92084,
  (a) => {
    'use strict';
    var b = a.i(87924),
      c = a.i(72131),
      d = a.i(46271),
      e = a.i(62036),
      f = a.i(3076),
      g = a.i(32860),
      h = a.i(22520);
    a.s([
      'default',
      0,
      () => {
        let [a, i] = (0, c.useState)(null),
          [j, k] = (0, c.useState)(null);
        return (0, b.jsx)('section', {
          className:
            'relative w-full bg-[#f5f5f5] py-24 overflow-hidden min-h-screen flex flex-col justify-center',
          children: (0, b.jsxs)('div', {
            className:
              'container mx-auto px-4 md:px-8 max-w-[90%] md:max-w-7xl relative z-10',
            children: [
              (0, b.jsx)('div', {
                className: 'flex flex-col w-full mb-12',
                children: (0, b.jsx)('div', {
                  className: 'w-full flex justify-center mb-8',
                  children: (0, b.jsxs)('h2', {
                    className:
                      'text-center text-4xl md:text-6xl font-bold tracking-tight',
                    children: [
                      (0, b.jsx)('span', {
                        className: 'text-[#0057FF]',
                        children: 'portfólio',
                      }),
                      ' ',
                      (0, b.jsx)('span', {
                        className: 'text-[#111111]',
                        children: 'showcase',
                      }),
                    ],
                  }),
                }),
              }),
              (0, b.jsx)('div', {
                className: 'flex flex-col w-full border-t border-neutral-300',
                children: (0, b.jsx)(e.AnimatePresence, {
                  mode: 'popLayout',
                  children: f.CATEGORIES.map((c, f) => {
                    let l = j === c.id,
                      m = null !== j && !l,
                      n = a === c.id,
                      o = ((a) => {
                        switch (a) {
                          case 0:
                            return 'justify-end';
                          case 1:
                            return 'justify-center';
                          default:
                            return 'justify-start';
                        }
                      })(f),
                      p = 'websites-webcampaigns-tech' === c.id;
                    return m
                      ? null
                      : (0, b.jsxs)(
                          d.motion.div,
                          {
                            layout: !0,
                            initial: { opacity: 0, height: 0 },
                            animate: { opacity: 1, height: 'auto' },
                            exit: {
                              opacity: 0,
                              height: 0,
                              transition: { duration: 0.3 },
                            },
                            onClick: () => {
                              var a;
                              return (
                                (a = c.id),
                                void k((b) => (b === a ? null : a))
                              );
                            },
                            className: `
                    relative border-b border-neutral-300 group cursor-pointer w-full
                    ${l ? 'border-none' : ''}
                  `,
                            onMouseEnter: () => !l && i(c.id),
                            onMouseLeave: () => i(null),
                            children: [
                              0 === f &&
                                !l &&
                                (0, b.jsx)('div', {
                                  className:
                                    'hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none',
                                  children: (0, b.jsx)('span', {
                                    className:
                                      'text-[10px] md:text-xs text-gray-400 font-medium tracking-[0.25em] uppercase',
                                    children: '[ what we love working on ]',
                                  }),
                                }),
                              (0, b.jsxs)(d.motion.div, {
                                layout: 'position',
                                className: `flex w-full transition-all duration-500 ease-out
                      ${l ? 'py-8 flex-col items-start gap-8' : 'py-10 md:py-14 items-center'}
                      ${!l ? o : ''}
                    `,
                                children: [
                                  (0, b.jsxs)('div', {
                                    className: `flex items-center relative ${!l ? 'gap-6 md:gap-8' : 'gap-6 w-full'}`,
                                    children: [
                                      (0, b.jsx)(e.AnimatePresence, {
                                        children:
                                          n &&
                                          !l &&
                                          (0, b.jsx)(d.motion.div, {
                                            initial: {
                                              width: 0,
                                              opacity: 0,
                                              marginRight: 0,
                                            },
                                            animate: {
                                              width: 140,
                                              opacity: 1,
                                              marginRight: 24,
                                            },
                                            exit: {
                                              width: 0,
                                              opacity: 0,
                                              marginRight: 0,
                                            },
                                            transition: {
                                              duration: 0.4,
                                              ease: [0.33, 1, 0.68, 1],
                                            },
                                            className:
                                              'hidden md:block h-20 relative overflow-hidden rounded-md shrink-0 origin-right order-first',
                                            children: (0, b.jsx)('img', {
                                              src: c.thumbnailUrl,
                                              alt: '',
                                              className:
                                                'absolute inset-0 w-full h-full object-cover',
                                            }),
                                          }),
                                      }),
                                      (0, b.jsx)('div', {
                                        className:
                                          'flex flex-col items-end text-right',
                                        children:
                                          p && !l
                                            ? (0, b.jsxs)(d.motion.h3, {
                                                layout: 'position',
                                                className:
                                                  'font-light text-[#111111] transition-all duration-300 tracking-tight leading-[1.0] text-3xl md:text-5xl lg:text-6xl group-hover:text-[#0057FF]',
                                                children: [
                                                  (0, b.jsx)('span', {
                                                    className: 'block',
                                                    children: 'Web Campaigns,',
                                                  }),
                                                  (0, b.jsx)('span', {
                                                    className: 'block',
                                                    children: 'Websites & Tech',
                                                  }),
                                                ],
                                              })
                                            : (0, b.jsx)(d.motion.h3, {
                                                layout: 'position',
                                                className: `
                              font-light text-[#111111] transition-all duration-300 tracking-tight leading-[1.1] group-hover:text-[#0057FF]
                              ${l ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl lg:text-6xl'}
                            `,
                                                children: c.label,
                                              }),
                                      }),
                                      (0, b.jsx)(d.motion.div, {
                                        layout: 'position',
                                        className: `
                          flex items-center justify-center rounded-full bg-[#0057FF] text-white shrink-0 transition-all duration-500 shadow-sm
                          ${l ? 'w-12 h-12 md:w-16 md:h-16' : 'w-8 h-8 md:w-12 md:h-12'}
                          ${p && !l ? 'self-end mb-1' : ''} /* Alinha \xedcone com a \xfaltima linha no item 3 */
                        `,
                                        children: (0, b.jsx)(d.motion.div, {
                                          animate: { rotate: 90 * !!l },
                                          transition: { duration: 0.4 },
                                          children: (0, b.jsx)(g.ArrowRight, {
                                            className: `${l ? 'w-6 h-6' : 'w-4 h-4 md:w-6 md:h-6'}`,
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                  l &&
                                    (0, b.jsxs)(d.motion.div, {
                                      initial: { opacity: 0, y: 20 },
                                      animate: { opacity: 1, y: 0 },
                                      transition: { delay: 0.2, duration: 0.5 },
                                      className:
                                        'w-full mt-4 flex flex-col md:flex-row gap-8 md:gap-16',
                                      children: [
                                        (0, b.jsx)('div', {
                                          className:
                                            'w-full md:w-1/2 aspect-video rounded-lg overflow-hidden bg-gray-200 shadow-lg',
                                          children: (0, b.jsx)('img', {
                                            src: c.thumbnailUrl,
                                            alt: c.label,
                                            className:
                                              'w-full h-full object-cover hover:scale-105 transition-transform duration-700',
                                          }),
                                        }),
                                        (0, b.jsxs)('div', {
                                          className:
                                            'w-full md:w-1/2 flex flex-col justify-between py-2',
                                          children: [
                                            (0, b.jsxs)('div', {
                                              children: [
                                                (0, b.jsxs)('p', {
                                                  className:
                                                    'text-xl md:text-2xl text-gray-700 leading-relaxed mb-10 font-light',
                                                  children: [
                                                    'Explorando os limites da criatividade em',
                                                    ' ',
                                                    (0, b.jsx)('span', {
                                                      className:
                                                        'text-[#0057FF] font-medium',
                                                      children: c.label
                                                        .replace(',', '')
                                                        .toLowerCase(),
                                                    }),
                                                    '. Nossos projetos combinam estratégia e design para criar experiências memoráveis.',
                                                  ],
                                                }),
                                                (0, b.jsx)('h4', {
                                                  className:
                                                    'text-sm uppercase tracking-widest text-gray-500 mb-6 font-bold border-b border-gray-100 pb-2',
                                                  children: 'Destaques',
                                                }),
                                                (0, b.jsx)('ul', {
                                                  className: 'space-y-4 mb-10',
                                                  children: [1, 2, 3].map((a) =>
                                                    (0, b.jsxs)(
                                                      'li',
                                                      {
                                                        className:
                                                          'flex items-center gap-4 text-lg md:text-xl font-medium text-[#111111] group/item cursor-pointer',
                                                        children: [
                                                          (0, b.jsx)('span', {
                                                            className:
                                                              'w-2 h-2 rounded-full bg-[#0057FF] group-hover/item:scale-150 transition-transform',
                                                          }),
                                                          (0, b.jsxs)('span', {
                                                            className:
                                                              'group-hover/item:translate-x-2 transition-transform',
                                                            children: [
                                                              'Projeto Exemplo ',
                                                              a,
                                                            ],
                                                          }),
                                                        ],
                                                      },
                                                      a
                                                    )
                                                  ),
                                                }),
                                              ],
                                            }),
                                            (0, b.jsx)('div', {
                                              className: 'flex gap-4',
                                              children: (0, b.jsxs)('a', {
                                                href: `/portfolio?category=${c.id}`,
                                                className:
                                                  'inline-flex items-center gap-3 text-[#0057FF] font-bold text-lg md:text-xl hover:underline underline-offset-8 decoration-2',
                                                children: [
                                                  'Ver todos os projetos',
                                                  (0, b.jsx)(h.ArrowUpRight, {
                                                    className: 'w-6 h-6',
                                                  }),
                                                ],
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          },
                          c.id
                        );
                  }),
                }),
              }),
              !j &&
                (0, b.jsx)(d.motion.div, {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  className: 'mt-24 md:mt-32 flex justify-center w-full',
                  children: (0, b.jsxs)(d.motion.a, {
                    href: '/#contact',
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    className:
                      'group relative inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-5 md:px-12 md:py-6 text-white shadow-xl hover:shadow-[#0057FF]/40 transition-all duration-300',
                    children: [
                      (0, b.jsx)('span', {
                        className:
                          'text-lg md:text-xl font-semibold tracking-wide',
                        children: 'let’s build something great',
                      }),
                      (0, b.jsx)('span', {
                        className:
                          'flex h-8 w-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white text-[#0057FF] transition-colors duration-300',
                        children: (0, b.jsx)(h.ArrowUpRight, {
                          className:
                            'w-4 h-4 text-white group-hover:text-[#0057FF]',
                        }),
                      }),
                    ],
                  }),
                }),
              j &&
                (0, b.jsx)(d.motion.div, {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className:
                    'mt-16 flex justify-start border-t border-neutral-200 pt-8',
                  children: (0, b.jsxs)('button', {
                    onClick: () => k(null),
                    className:
                      'text-gray-500 hover:text-[#0057FF] text-sm tracking-widest uppercase font-bold flex items-center gap-3 group',
                    children: [
                      (0, b.jsx)('span', {
                        className:
                          'group-hover:-translate-x-1 transition-transform',
                        children: '←',
                      }),
                      ' ',
                      'Voltar para a lista',
                    ],
                  }),
                }),
            ],
          }),
        });
      },
    ]);
  },
  96555,
  (a) => {
    'use strict';
    var b = a.i(87924),
      c = a.i(72131),
      d = a.i(46271),
      e = a.i(3076),
      f = a.i(32860),
      g = a.i(22520);
    a.s([
      'default',
      0,
      () => {
        let a = (0, c.useRef)(null);
        return (0, b.jsx)('section', {
          id: 'featured-projects',
          ref: a,
          className: 'relative py-24 bg-[#F4F5F7] overflow-hidden',
          children: (0, b.jsx)('div', {
            className: 'container mx-auto px-4 md:px-8 max-w-7xl relative z-10',
            children: (0, b.jsxs)('div', {
              className: 'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16',
              children: [
                e.FEATURED_PROJECTS.map((a, c) => {
                  let e = a.isHero;
                  return (0, b.jsxs)(
                    d.motion.a,
                    {
                      href: `/portfolio/${a.slug}`,
                      initial: { opacity: 0, y: 60 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: !0, margin: '-10%' },
                      transition: {
                        duration: 0.8,
                        ease: [0.21, 0.47, 0.32, 0.98],
                        delay: 0.1 * c,
                      },
                      className: `group relative flex flex-col w-full ${e ? 'md:col-span-2' : ''}`,
                      children: [
                        (0, b.jsxs)('div', {
                          className: `relative overflow-hidden rounded-2xl bg-gray-200 w-full ${e ? 'aspect-video md:aspect-[2.2/1]' : 'aspect-[4/5]'} mb-6 shadow-sm`,
                          children: [
                            (0, b.jsx)('div', {
                              className:
                                'absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10',
                            }),
                            (0, b.jsx)('img', {
                              src: a.imageUrl,
                              alt: a.title,
                              className:
                                'w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105',
                            }),
                            (0, b.jsxs)('div', {
                              className:
                                'absolute top-6 right-6 z-20 flex flex-col gap-2 items-end',
                              children: [
                                (0, b.jsx)('span', {
                                  className:
                                    'bg-white/95 backdrop-blur-md text-[#0057FF] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm',
                                  children: a.category,
                                }),
                                a.displayCategory !== a.category &&
                                  (0, b.jsx)('span', {
                                    className:
                                      'bg-[#111111]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm',
                                    children:
                                      a.displayCategory.split('&')[1] ||
                                      'Design',
                                  }),
                              ],
                            }),
                          ],
                        }),
                        (0, b.jsxs)('div', {
                          className: 'flex justify-between items-end px-2',
                          children: [
                            (0, b.jsxs)('div', {
                              className: 'flex flex-col gap-1 pr-4',
                              children: [
                                (0, b.jsx)('h3', {
                                  className:
                                    'text-2xl md:text-3xl font-bold text-[#111111] leading-tight group-hover:text-[#0057FF] transition-colors duration-300',
                                  children: a.title,
                                }),
                                (0, b.jsx)('p', {
                                  className:
                                    'text-gray-500 text-sm uppercase tracking-widest font-bold',
                                  children: a.client,
                                }),
                              ],
                            }),
                            (0, b.jsx)('div', {
                              className: 'mb-1 shrink-0',
                              children: (0, b.jsx)('div', {
                                className:
                                  'w-12 h-12 rounded-full bg-[#0057FF] text-white flex items-center justify-center transform translate-x-0 group-hover:translate-x-2 transition-all duration-300 shadow-lg group-hover:scale-110',
                                children: (0, b.jsx)(f.ArrowRight, {
                                  size: 20,
                                }),
                              }),
                            }),
                          ],
                        }),
                      ],
                    },
                    a.slug
                  );
                }),
                (0, b.jsxs)(d.motion.div, {
                  initial: { opacity: 0, x: 20 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: !0 },
                  transition: { duration: 0.8, delay: 0.2 },
                  className:
                    'flex flex-col justify-center items-center text-center min-h-[400px]',
                  children: [
                    (0, b.jsxs)('h3', {
                      className:
                        'text-4xl md:text-5xl font-light text-[#111111] mb-8 leading-tight',
                      children: ['Like what', (0, b.jsx)('br', {}), 'you see?'],
                    }),
                    (0, b.jsxs)(d.motion.a, {
                      href: '/portfolio',
                      whileHover: { scale: 1.05 },
                      whileTap: { scale: 0.95 },
                      className:
                        'group relative inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-5 text-white shadow-xl hover:shadow-[#0057FF]/40 transition-all duration-300',
                      children: [
                        (0, b.jsx)('span', {
                          className: 'text-lg font-bold tracking-wide',
                          children: 'view projects',
                        }),
                        (0, b.jsx)('span', {
                          className:
                            'flex h-8 w-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white text-[#0057FF] transition-colors duration-300',
                          children: (0, b.jsx)(g.ArrowUpRight, {
                            className:
                              'w-4 h-4 text-white group-hover:text-[#0057FF]',
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        });
      },
    ]);
  },
  69332,
  (a) => {
    'use strict';
    var b = a.i(87924),
      c = a.i(46271),
      d = a.i(3076);
    a.s([
      'default',
      0,
      () =>
        (0, b.jsx)('section', {
          id: 'clients',
          className: 'py-20 bg-[#0057FF] text-white',
          children: (0, b.jsxs)('div', {
            className: 'container mx-auto px-6 md:px-12 text-center',
            children: [
              (0, b.jsx)(c.motion.h2, {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: !0 },
                className: 'text-3xl md:text-4xl font-bold mb-16',
                children: 'marcas com as quais já trabalhei.',
              }),
              (0, b.jsx)('div', {
                className:
                  'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 items-center justify-items-center',
                children: d.CLIENT_LOGOS.map((a, d) =>
                  (0, b.jsx)(
                    c.motion.div,
                    {
                      initial: { opacity: 0 },
                      whileInView: { opacity: 1 },
                      viewport: { once: !0 },
                      transition: { delay: 0.05 * d },
                      className:
                        'w-full max-w-[140px] opacity-70 hover:opacity-100 transition-opacity duration-300',
                      children: (0, b.jsx)('img', {
                        src: a,
                        alt: `Client ${d + 1}`,
                        className: 'w-full h-auto brightness-0 invert',
                        onError: (a) => {
                          ((a.currentTarget.style.display = 'none'),
                            (a.currentTarget.parentElement.innerHTML = `<div class="text-white font-bold text-xl opacity-50">CLIENT ${d + 1}</div>`));
                        },
                      }),
                    },
                    d
                  )
                ),
              }),
            ],
          }),
        }),
    ]);
  },
  8008,
  (a) => {
    'use strict';
    var b = a.i(87924),
      c = a.i(46271),
      d = a.i(3076),
      e = a.i(32860);
    a.s([
      'default',
      0,
      () =>
        (0, b.jsx)('section', {
          id: 'contact',
          className: 'py-24 bg-[#F4F5F7]',
          children: (0, b.jsx)('div', {
            className: 'container mx-auto px-6 md:px-12',
            children: (0, b.jsxs)('div', {
              className: 'grid grid-cols-1 md:grid-cols-2 gap-16',
              children: [
                (0, b.jsxs)(c.motion.div, {
                  initial: { opacity: 0, x: -30 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: !0 },
                  children: [
                    (0, b.jsx)('h2', {
                      className:
                        'text-4xl md:text-5xl font-bold text-[#0057FF] mb-4 lowercase',
                      children: 'contato',
                    }),
                    (0, b.jsx)('p', {
                      className: 'text-xl text-dark mb-12',
                      children: 'Tem uma pergunta ou quer trabalhar junto?',
                    }),
                    (0, b.jsx)('div', {
                      className: 'space-y-6 mb-12',
                      children: d.CONTACT_INFO.map((a, c) =>
                        (0, b.jsxs)(
                          'a',
                          {
                            href: a.href,
                            className:
                              'flex items-center gap-4 text-dark hover:text-primary transition-colors text-lg font-medium group',
                            children: [
                              (0, b.jsx)('span', {
                                className:
                                  'p-3 bg-white rounded-full text-primary shadow-sm group-hover:scale-110 transition-transform',
                                children: a.icon,
                              }),
                              a.label,
                            ],
                          },
                          c
                        )
                      ),
                    }),
                    (0, b.jsx)('div', {
                      className: 'flex gap-4',
                      children: d.SOCIALS.map((a) =>
                        (0, b.jsx)(
                          'a',
                          {
                            href: a.url,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className:
                              'p-3 bg-white rounded-full text-dark hover:text-primary hover:scale-110 hover:opacity-80 transition-all shadow-sm duration-300',
                            'aria-label': a.platform,
                            children: a.icon,
                          },
                          a.platform
                        )
                      ),
                    }),
                  ],
                }),
                (0, b.jsx)(c.motion.div, {
                  initial: { opacity: 0, x: 30 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: !0 },
                  className:
                    'bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100',
                  children: (0, b.jsxs)('form', {
                    action: 'https://formsubmit.co/danilo@portfoliodanilo.com',
                    method: 'POST',
                    className: 'space-y-6',
                    children: [
                      (0, b.jsx)('input', {
                        type: 'text',
                        name: '_honey',
                        style: { display: 'none' },
                      }),
                      (0, b.jsx)('input', {
                        type: 'hidden',
                        name: '_captcha',
                        value: 'false',
                      }),
                      (0, b.jsxs)('div', {
                        children: [
                          (0, b.jsx)('label', {
                            htmlFor: 'name',
                            className:
                              'block text-sm font-semibold text-gray-600 mb-2',
                            children: 'Seu nome',
                          }),
                          (0, b.jsx)('input', {
                            type: 'text',
                            id: 'name',
                            name: 'name',
                            required: !0,
                            className:
                              'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
                            placeholder: 'João da Silva',
                          }),
                        ],
                      }),
                      (0, b.jsxs)('div', {
                        children: [
                          (0, b.jsx)('label', {
                            htmlFor: 'email',
                            className:
                              'block text-sm font-semibold text-gray-600 mb-2',
                            children: 'Seu email',
                          }),
                          (0, b.jsx)('input', {
                            type: 'email',
                            id: 'email',
                            name: 'email',
                            required: !0,
                            className:
                              'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
                            placeholder: 'joao@empresa.com',
                          }),
                        ],
                      }),
                      (0, b.jsxs)('div', {
                        children: [
                          (0, b.jsx)('label', {
                            htmlFor: 'phone',
                            className:
                              'block text-sm font-semibold text-gray-600 mb-2',
                            children: 'Telefone',
                          }),
                          (0, b.jsx)('input', {
                            type: 'tel',
                            id: 'phone',
                            name: 'phone',
                            required: !0,
                            className:
                              'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
                            placeholder: '(11) 99999-9999',
                          }),
                        ],
                      }),
                      (0, b.jsxs)('div', {
                        children: [
                          (0, b.jsx)('label', {
                            htmlFor: 'message',
                            className:
                              'block text-sm font-semibold text-gray-600 mb-2',
                            children: 'Sua mensagem',
                          }),
                          (0, b.jsx)('textarea', {
                            id: 'message',
                            name: 'message',
                            required: !0,
                            rows: 4,
                            className:
                              'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none',
                            placeholder: 'Conte-me sobre seu projeto...',
                          }),
                        ],
                      }),
                      (0, b.jsxs)('button', {
                        type: 'submit',
                        className:
                          'w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group',
                        children: [
                          'Enviar Mensagem',
                          (0, b.jsx)(e.ArrowRight, {
                            className:
                              'w-5 h-5 group-hover:translate-x-1 transition-transform',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        }),
    ]);
  },
];

//# sourceMappingURL=_c5771737._.js.map

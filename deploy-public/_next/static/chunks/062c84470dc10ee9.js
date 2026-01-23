(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  78923,
  (t) => {
    'use strict';
    let a = [0.22, 1, 0.36, 1],
      i = {
        duration: {
          slow: 1.2,
          normal: 0.8,
          fast: 0.4,
          instant: 0.2,
          modal: 0.5,
        },
        easing: {
          base: a,
          ghost: [0.25, 1, 0.5, 1],
          heavy: [0.43, 0.13, 0.23, 0.96],
          linear: 'linear',
        },
        stagger: { tight: 0.05, normal: 0.1, relaxed: 0.18, dramatic: 0.25 },
        reveal: { threshold: 0.1, margin: '-50px' },
        spring: {
          ghost: { stiffness: 50, damping: 20, restDelta: 0.001 },
          responsive: { stiffness: 100, damping: 25, restDelta: 0.001 },
          snappy: { stiffness: 200, damping: 30, restDelta: 0.001 },
        },
        offset: { subtle: 8, standard: 18, large: 30, dramatic: 40 },
      },
      e = {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: {
          opacity: 1,
          filter: 'blur(0px)',
          transition: { duration: i.duration.normal, ease: a },
        },
      },
      r = {
        hidden: { opacity: 0, y: i.offset.standard, filter: 'blur(6px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: i.duration.normal, ease: a },
        },
      };
    (i.duration.slow,
      i.duration.fast,
      i.duration.instant,
      i.offset.large,
      i.duration.modal,
      i.offset.standard,
      i.duration.fast,
      i.reveal.margin,
      i.reveal.threshold,
      t.s([
        'GHOST_EASE',
        0,
        a,
        'MOTION_TOKENS',
        0,
        i,
        'ghostFade',
        0,
        e,
        'ghostTransition',
        0,
        (t = 0, e = i.duration.normal) => ({ duration: e, delay: t, ease: a }),
        'riseSoft',
        0,
        r,
        'staggerContainer',
        0,
        (t = i.stagger.relaxed) => ({
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: t, delayChildren: 0.2 },
          },
        }),
      ]));
  },
  62039,
  (t) => {
    'use strict';
    var a = t.i(96148),
      i = t.i(73019),
      e = t.i(63844),
      r = t.i(84833),
      s = t.i(78923);
    function n({ children: t }) {
      let n = (0, e.usePathname)();
      return (
        (0, r.useEffect)(() => {
          window.scrollTo(0, 0);
        }, [n]),
        (0, a.jsx)(
          i.motion.div,
          {
            initial: { opacity: 0, y: 15 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.95, ease: s.GHOST_EASE },
            className: 'w-full flex-col flex grow',
            children: t,
          },
          n
        )
      );
    }
    t.s(['default', () => n]);
  },
]);

(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  29832,
  (e) => {
    'use strict';
    var t = e.i(11795);
    let a = /[^a-z0-9._-]/g;
    var s = e.i(12559);
    async function r(e, a, r, l) {
      let i,
        o,
        n = (0, t.createClientComponentClient)(),
        c = l.name.split('.').pop(),
        p = c ? `${r}.${c}` : r,
        u = (o = (i = a.replace(/\/+$/g, '').replace(/^\/+/g, ''))
          ? `${i}`
          : '')
          ? `${o}/${p}`
          : p,
        { data: h, error: d } = await n.storage
          .from(e)
          .upload(u, l, { cacheControl: '3600', upsert: !0 });
      if (d) throw d;
      return (0, s.normalizeStoragePath)(h.path, e);
    }
    async function l({
      file: e,
      key: r,
      page: l,
      subPath: i,
      bucket: o = 'site-assets',
    }) {
      let n = (0, t.createClientComponentClient)(),
        c = (function ({ page: e, key: t, subPath: s, extension: r }) {
          let l = [e && e.trim().length > 0 ? e.trim() : 'global'];
          s && l.push(s.trim().replace(/^\/+|\/+$/g, ''));
          let i = t.trim().toLowerCase().replace(/\s+/g, '_').replace(a, ''),
            o = r.toLowerCase().replace(/^\.+/, '') || 'bin',
            n = `${i}.${o}`;
          return `${l.join('/')}/${n}`;
        })({
          page: l,
          key: r,
          subPath: i,
          extension: e.name.split('.').pop() ?? 'bin',
        }),
        { data: p, error: u } = await n.storage
          .from(o)
          .upload(c, e, { cacheControl: '3600', upsert: !0 });
      if (u) throw u;
      return (0, s.normalizeStoragePath)(p.path, o);
    }
    e.s(['uploadSiteAsset', () => l, 'uploadToBucket', () => r], 29832);
  },
  38518,
  (e) => {
    'use strict';
    let t = (0, e.i(3645).default)('arrow-left', [
      ['path', { d: 'm12 19-7-7 7-7', key: '1l729n' }],
      ['path', { d: 'M19 12H5', key: 'x3x0zl' }],
    ]);
    e.s(['ArrowLeft', () => t], 38518);
  },
  67669,
  (e) => {
    'use strict';
    let t = (0, e.i(3645).default)('trash-2', [
      ['path', { d: 'M10 11v6', key: 'nco0om' }],
      ['path', { d: 'M14 11v6', key: 'outv1u' }],
      [
        'path',
        { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', key: 'miytrc' },
      ],
      ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
      ['path', { d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', key: 'e791ji' }],
    ]);
    e.s(['Trash2', () => t], 67669);
  },
  3214,
  (e) => {
    'use strict';
    let t = (0, e.i(3645).default)('plus', [
      ['path', { d: 'M5 12h14', key: '1ays0h' }],
      ['path', { d: 'M12 5v14', key: 's699le' }],
    ]);
    e.s(['Plus', () => t], 3214);
  },
  432,
  (e) => {
    'use strict';
    var t = e.i(77579),
      a = e.i(58384);
    function s() {
      return (0, t.jsxs)('div', {
        className: 'space-y-8',
        children: [
          (0, t.jsxs)('div', {
            children: [
              (0, t.jsx)('p', {
                className: 'text-sm uppercase tracking-[0.25em] text-slate-400',
                children: 'Projetos',
              }),
              (0, t.jsx)('h1', {
                className: 'text-3xl font-semibold',
                children: 'Nova Landing Page',
              }),
            ],
          }),
          (0, t.jsx)(a.default, {}),
        ],
      });
    }
    e.s(['default', () => s]);
  },
]);

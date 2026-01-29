(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  55064,
  (e) => {
    'use strict';
    var a = e.i(12559);
    let t = (e) => (0, a.buildSupabaseStorageUrl)('site-assets', e),
      i = (e) => (0, a.buildSupabaseStorageUrl)('portfolio-media', e),
      o = (e) => (0, a.buildSupabaseStorageUrl)('project-videos', e),
      r = {
        hero: {
          tag: '[BRAND AWARENESS]',
          title: ['Você não vê o design.'],
          subtitle: 'Mas ele vê você.',
          cta: 'step inside',
        },
        showcase: {
          title: 'portfólio showcase',
          floatingLabel: '[what we love working on]',
          cta: { label: 'let’s build something great →', href: '/#contact' },
          ctas: [
            { label: 'Fale Comigo', href: '#contact', variant: 'primary' },
            {
              label: 'Download CV',
              href: '/cv-danilo-novais.pdf',
              variant: 'secondary',
              download: !0,
              external: !0,
            },
          ],
          categories: [
            {
              id: 'brand-campaigns',
              label: 'Brand & Campaigns',
              titleDesktop: 'Brand & Campaigns',
              titleMobile: 'Brand &\nCampaigns',
              align: 'end',
              thumb: t('home/showcase/Branding-Project.webp'),
            },
            {
              id: 'videos-motions',
              label: 'Videos & Motion',
              titleDesktop: 'Videos & Motion',
              titleMobile: 'Videos &\nMotion',
              align: 'center',
              thumb: t('home/showcase/Key-Visual.webp'),
            },
            {
              id: 'websites-webcampaigns-tech',
              label: 'Web Campaigns, Websites & Tech',
              titleDesktop: 'Web Campaigns,\nWebsites & Tech',
              titleMobile: 'Web Campaigns,\nWebsites & Tech',
              align: 'start',
              thumb: t('home/showcase/webdesigner-2.gif'),
            },
          ],
        },
        featuredProjects: [
          {
            id: 1,
            slug: 'magic-radio-branding',
            title: 'Magic — devolvendo a magia ao rádio',
            category: 'branding & campanha',
            client: 'Magic',
            year: 2023,
            tags: ['Branding', 'Campaign'],
            img: i('projects/creative-direction/hero.webp'),
            layout: {
              h: 'min-h-[400px] md:h-[500px] aspect-[4/5] md:aspect-auto',
              cols: 'md:col-span-5',
              sizes: '(max-width: 1024px) 100vw, 42vw',
            },
          },
          {
            id: 2,
            slug: 'branding-project-01',
            title: 'Uma marca ousada e consistente',
            category: 'Branding',
            client: 'Cliente confidencial',
            year: 2022,
            tags: ['Strategy', 'Identity'],
            img: i('projects/campaign/hero.webp'),
            layout: {
              h: 'min-h-[400px] md:h-[500px] aspect-[4/5] md:aspect-auto',
              cols: 'md:col-span-7',
              sizes: '(max-width: 1024px) 100vw, 58vw',
            },
          },
          {
            id: 3,
            slug: 'key-visual-campaign',
            title: 'Key visual para campanha sazonal',
            category: 'Campanha',
            client: 'Cliente confidencial',
            year: 2021,
            tags: ['Art Direction'],
            img: i('projects/key-vision/gallery/converted-5-webp.webp'),
            layout: {
              h: 'min-h-[400px] md:h-[600px]',
              cols: 'md:col-span-12',
              sizes: '100vw',
            },
          },
          {
            id: 4,
            slug: 'webdesigner-motion',
            title: 'Experiência web em movimento',
            category: 'Web & Motion',
            client: 'Cliente confidencial',
            year: 2023,
            tags: ['UX/UI', 'Animation'],
            img: i('projects/key_vision/hero.webp'),
            layout: {
              h: 'min-h-[400px] md:h-[400px] aspect-video md:aspect-auto',
              cols: 'md:col-span-8',
              sizes: '(max-width: 1024px) 100vw, 66vw',
            },
          },
        ],
        clients: {
          title: 'marcas com as quais já trabalhei',
          logos: Array.from({ length: 12 }, (e, a) => ({
            id: a + 1,
            src: t(`clients/clients.strip.${a + 1}.svg`),
            alt: `Logo do cliente ${a + 1}`,
          })),
        },
        contact: {
          title: 'contato',
          subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
        },
      },
      s = {
        hero: {
          title: { text: 'Sou ', highlight: 'Danilo Novais. ' },
          manifesto: [
            {
              text: 'Você ',
              highlight: 'não vê tudo ',
              textEnd: 'o que eu faço.',
            },
            { text: 'Mas sente ' },
            { text: 'quando ', highlight: 'funciona.' },
          ],
          description: [
            'Crio designs que observam,\n',
            'entendem e guiam experiências com intenção,\n',
            'estratégia e tecnologia,\n na medida exata.',
          ],
          videos: {
            desktop: t('about/hero/about.hero.desktop_video.mp4'),
            mobile: t('about/hero/about.hero.mobile_video.mp4'),
          },
        },
        beliefsIntro: [
          { text: 'Acredito no ' },
          { text: 'design que muda o dia', highlight: !0 },
          { text: ' de alguém.', newLine: !0 },
          { text: 'Não pelo choque, ' },
          { text: 'mas pela conexão.', highlight: !0 },
        ],
        intro: {
          origin:
            'Goiânia, 2012. O início foi em agências, mas a inquietude era maior.',
        },
        origin: {
          title: 'Origem',
          blocks: [
            {
              type: 'block',
              id: '1',
              title: 'O QUE PERMANECE',
              text: 'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia. Enquanto muitos olhavam para o brilho imediato, eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo. A essência das coisas sempre falou mais alto do que a superfície.',
              description: '',
              src: t('about/origin/about.origin_image.1.webp'),
              alt: 'Observando os detalhes',
              align: 'right',
            },
            {
              type: 'block',
              id: '2',
              title: 'DO TRAÇO À INTENÇÃO',
              text: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso, do lápis na margem do caderno. Aos poucos, aquilo que era instinto virou direção. Com cada tentativa, aprendi a dar forma ao invisível — até que os conceitos começaram a falar por si.',
              description: '',
              src: t('about/origin/about.origin_image.2.webp'),
              alt: 'Processo criativo',
              align: 'left',
            },
            {
              type: 'block',
              id: '3',
              title: 'A DESCOBERTA DO INVISÍVEL',
              text: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação. Por trás de cada escolha visual, existe intenção. Descobri que o design verdadeiro não grita — ele conduz. Ele está presente nos detalhes que ninguém percebe, mas que todos sentem. Transformar sem que se perceba a transformação: isso é potência.',
              description: '',
              src: t('about/origin/about.origin_image.3.webp'),
              alt: 'Design invisível',
              align: 'right',
            },
            {
              type: 'block',
              id: '4',
              title: 'EXPANSÃO COM PROPÓSITO',
              text: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação. Minha trajetória uniu intuição com método, arte com estratégia. O futuro pede novas ferramentas — e eu as abracei. Mas nunca deixei que a tecnologia apagasse o que me move: a sensibilidade, o olhar atento, a busca pelo significado.',
              description: '',
              src: t('about/origin/about.origin_image.4.webp'),
              alt: 'Expansão e tecnologia',
              align: 'left',
            },
          ],
        },
        whatIDo: {
          title: ['Do insight ao impacto.', 'Mesmo quando você não percebe.'],
          cards: [
            { id: '1', text: 'Direção criativa que organiza o caos' },
            { id: '2', text: 'Design estratégico que guia decisões' },
            { id: '3', text: 'Identidades que permanecem na memória' },
            { id: '4', text: 'Campanhas multicanais com lógica e emoção' },
            { id: '5', text: 'Branding que não grita, mas marca' },
            { id: '6', text: 'Inteligência Artificial aplicada à criação' },
            { id: '7', text: 'Liderança Criativa com visão e método' },
          ],
          marquee: [
            'DIREÇÃO CRIATIVA',
            'DESIGN ESTRATÉGICO',
            'IDENTIDADES',
            'CAMPANHAS',
            'BRANDING',
            'INTELIGÊNCIA ARTIFICIAL',
            'LIDERANÇA CRIATIVA',
          ],
        },
        method: {
          title: ['Criatividade com método.', 'Impacto sem ruído.'],
          videos: {
            desktop: t('about/method/about.method.desktop_video.mp4'),
            mobile: t('about/method/about.method.mobile_video.mp4'),
          },
          intro: [
            'Antes da estética, existe intenção.',
            'Antes do layout, existe lógica.',
            'Antes do impacto, existe silêncio.',
          ],
          steps: [
            {
              id: '01',
              text: 'Briefings bem construídos para decisões claras',
            },
            { id: '02', text: 'Estratégia como base de qualquer criação' },
            { id: '03', text: 'Design com propósito, não só beleza' },
            {
              id: '04',
              text: 'Revisões inteligentes, sem ruído desnecessário',
            },
            { id: '05', text: 'IA e automações para escalar com qualidade' },
            {
              id: '06',
              text: 'Métricas criativas: engajamento, retenção e resultado',
            },
          ],
        },
        beliefs: [
          { text: 'Um vídeo que respira.', highlight: 'respira' },
          { text: 'Uma marca que se reconhece.', highlight: 'reconhece' },
          { text: 'Um detalhe que fica.', highlight: 'fica' },
          { text: 'Crio para gerar presença.', highlight: 'Crio' },
          { text: 'Mesmo quando não estou ali.', highlight: 'Mesmo' },
          {
            text: 'Mesmo quando ninguém percebe o esforço.',
            highlight: 'Mesmo',
          },
        ],
        closing: {
          title: 'Hoje sou Diretor de Criação, com mais de 10 anos de estrada.',
          text: [
            'Já liderei marcas, agências, eventos e criei experiências para todos os canais.',
            'Agora, quero criar algo que permaneça — com você.',
          ],
          ghostText: { prefix: 'ISSO É', main: 'GHOST DESIGN' },
          ctas: [
            { label: 'Fale Comigo', href: '#contact', variant: 'primary' },
            {
              label: 'Download CV',
              href: '/cv-danilo-novais.pdf',
              variant: 'secondary',
              download: !0,
              external: !0,
            },
          ],
        },
      },
      l = {
        hero: {
          video: {
            desktop: o('video-heroPort.mp4'),
            mobile: o('video-heroPort-mobile.mp4'),
          },
        },
      };
    e.s([
      'ABOUT_CONTENT',
      0,
      s,
      'HOME_CONTENT',
      0,
      r,
      'PORTFOLIO_CONTENT',
      0,
      l,
    ]);
  },
  87857,
  (e) => {
    'use strict';
    var a = e.i(77579),
      t = e.i(75157);
    function i({ children: e, className: i, as: o = 'div', ...r }) {
      return (0, a.jsx)(o, {
        className: (0, t.cn)('std-grid', i),
        ...r,
        children: e,
      });
    }
    e.s(['Container', () => i]);
  },
  2338,
  9083,
  21833,
  (e) => {
    'use strict';
    var a = e.i(77579),
      t = e.i(62897),
      i = e.i(90541),
      o = e.i(70315),
      r = e.i(55064);
    function s() {
      let e = (0, i.useReducedMotion)(),
        s = r.HOME_CONTENT.clients.logos.slice(0, 12);
      return (0, a.jsx)('section', {
        id: 'clients',
        className:
          'bg-[#0048ff] py-16 md:py-20 lg:py-24 relative z-10 overflow-hidden',
        'aria-labelledby': 'clients-heading',
        children: (0, a.jsxs)('div', {
          className: 'std-grid',
          children: [
            (0, a.jsx)(t.motion.div, {
              initial: e ? { opacity: 1 } : { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: !0 },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              className: 'mb-10 md:mb-16 lg:mb-20',
              children: (0, a.jsx)('h2', {
                id: 'clients-heading',
                className:
                  'text-white text-[1.5rem] md:text-[2rem] font-bold text-center tracking-tight leading-tight lowercase',
                children: r.HOME_CONTENT.clients.title,
              }),
            }),
            (0, a.jsx)(t.motion.ul, {
              role: 'list',
              'aria-label': 'Logotipos das marcas parceiras',
              initial: 'hidden',
              whileInView: 'show',
              viewport: { once: !0, margin: '-10%' },
              variants: {
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
              },
              className:
                'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 md:gap-12 items-center justify-items-center w-full',
              children: s.map((e) => {
                let i = e.src?.toLowerCase().endsWith('.svg');
                return (0, a.jsx)(
                  t.motion.li,
                  {
                    role: 'listitem',
                    variants: {
                      hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                      },
                    },
                    children: (0, a.jsx)('div', {
                      className:
                        'group relative w-28 h-14 sm:w-32 sm:h-16 md:w-40 md:h-20 flex items-center justify-center',
                      children: (0, a.jsx)(o.default, {
                        src: e.src || '',
                        alt: e.alt,
                        fill: !0,
                        className:
                          'w-full h-full object-contain filter brightness-0 invert opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 will-change-transform',
                        sizes:
                          '(max-width: 640px) 112px, (max-width: 768px) 128px, 160px',
                        loading: 'lazy',
                        unoptimized: i,
                      }),
                    }),
                  },
                  e.id
                );
              }),
            }),
          ],
        }),
      });
    }
    e.s(['default', () => s], 2338);
    var l = e.i(5519),
      n = e.i(3645);
    let d = (0, n.default)('phone', [
      [
        'path',
        {
          d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384',
          key: '9njp5v',
        },
      ],
    ]);
    var c = e.i(77358),
      m = e.i(89361);
    let p = (0, n.default)('twitter', [
      [
        'path',
        {
          d: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
          key: 'pff0z6',
        },
      ],
    ]);
    e.s(['Twitter', () => p], 9083);
    let h = (0, n.default)('facebook', [
        [
          'path',
          {
            d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
            key: '1jg4f8',
          },
        ],
      ]),
      g = (0, n.default)('globe', [
        ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
        [
          'path',
          {
            d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20',
            key: '13o1zl',
          },
        ],
        ['path', { d: 'M2 12h20', key: '9i4pu4' }],
      ]);
    var u = e.i(40022),
      x = e.i(39995),
      b = e.i(46858);
    let f = ({ label: e, error: t, id: i, className: o = '', ...r }) =>
        (0, a.jsxs)('div', {
          children: [
            (0, a.jsx)('label', {
              htmlFor: i,
              className:
                'block text-[13px] font-bold text-[#111111]/60 mb-2 uppercase tracking-wider',
              children: e,
            }),
            (0, a.jsx)('input', {
              id: i,
              'aria-invalid': !!t,
              'aria-describedby': t ? `${i}-error` : void 0,
              className: `w-full min-h-[48px] rounded-lg border border-[#111111]/10 bg-[#f8fafc] px-4 py-4 text-[#111111] placeholder:text-[#111111]/30 transition-all outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/20 ${t ? 'border-red-500' : ''} ${o}`,
              ...r,
            }),
            t &&
              (0, a.jsx)('p', {
                id: `${i}-error`,
                className: 'mt-2 text-xs text-red-500 font-bold uppercase',
                children: t,
              }),
          ],
        }),
      v = ({ label: e, error: t, id: i, className: o = '', ...r }) =>
        (0, a.jsxs)('div', {
          children: [
            (0, a.jsx)('label', {
              htmlFor: i,
              className:
                'block text-[13px] font-bold text-[#111111]/60 mb-2 uppercase tracking-wider',
              children: e,
            }),
            (0, a.jsx)('textarea', {
              id: i,
              'aria-invalid': !!t,
              'aria-describedby': t ? `${i}-error` : void 0,
              className: `w-full resize-none rounded-lg border border-[#111111]/10 bg-[#f8fafc] px-4 py-4 text-[#111111] placeholder:text-[#111111]/30 transition-all outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/20 min-h-[120px] ${t ? 'border-red-500' : ''} ${o}`,
              ...r,
            }),
            t &&
              (0, a.jsx)('p', {
                id: `${i}-error`,
                className: 'mt-2 text-xs text-red-500 font-bold uppercase',
                children: t,
              }),
          ],
        }),
      w = () => {
        let e = (0, i.useReducedMotion)(),
          [o, r] = (0, b.useState)({
            name: '',
            email: '',
            phone: '',
            message: '',
          }),
          [s, l] = (0, b.useState)({}),
          [n, d] = (0, b.useState)(!1),
          [c, m] = (0, b.useState)(!1),
          p = (e) => {
            let { name: a, value: t } = e.target;
            (r((e) => ({ ...e, [a]: t })),
              s[a] &&
                l((e) => {
                  let t = { ...e };
                  return (delete t[a], t);
                }));
          },
          h = async (e) => {
            e.preventDefault();
            let a = {};
            if (
              (Object.entries(o).forEach(([e, t]) => {
                let i = ((e, a) => {
                  switch (e) {
                    case 'name':
                      return a.trim() ? '' : 'Nome é obrigatório';
                    case 'email':
                      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)
                        ? ''
                        : 'Email inválido';
                    case 'message':
                      return a.trim().length >= 10
                        ? ''
                        : 'Mensagem deve ter pelo menos 10 caracteres';
                    default:
                      return '';
                  }
                })(e, t);
                i && (a[e] = i);
              }),
              Object.keys(a).length > 0)
            )
              return void l(a);
            d(!0);
            try {
              let e = new FormData();
              if (
                (Object.entries(o).forEach(([a, t]) => {
                  e.append(a, t);
                }),
                (
                  await fetch(
                    `${x.CONTACT_FORM.action.replace('formsubmit.co/', 'formsubmit.co/ajax/')}`,
                    { method: 'POST', body: e }
                  )
                ).ok)
              )
                (m(!0),
                  r({ name: '', email: '', phone: '', message: '' }),
                  setTimeout(() => m(!1), 5e3));
              else throw Error('Submission failed');
            } catch {
              l({
                submit: 'Falha ao enviar mensagem. Por favor tente novamente.',
              });
            } finally {
              d(!1);
            }
          };
        return (0, a.jsx)(t.motion.div, {
          initial: e ? {} : { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0, margin: '-50px' },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          className:
            'w-full max-w-[640px] mx-auto lg:ml-auto bg-white p-8 md:p-12 rounded-[24px] shadow-sm border border-textInverse/5',
          children: (0, a.jsx)('div', {
            className: 'p-0',
            children: c
              ? (0, a.jsxs)('div', {
                  className: 'text-center py-12',
                  children: [
                    (0, a.jsx)('div', {
                      className:
                        'inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6',
                      children: (0, a.jsx)('svg', {
                        xmlns: 'http://www.w3.org/2000/svg',
                        className: 'h-10 w-10',
                        fill: 'none',
                        viewBox: '0 0 24 24',
                        stroke: 'currentColor',
                        children: (0, a.jsx)('path', {
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round',
                          strokeWidth: 2,
                          d: 'M5 13l4 4L19 7',
                        }),
                      }),
                    }),
                    (0, a.jsx)('h3', {
                      className: 'text-3xl font-bold text-textInverse mb-4',
                      children: 'Mensagem Enviada!',
                    }),
                    (0, a.jsx)('p', {
                      className: 'text-textInverse/60 text-lg',
                      children:
                        'Obrigado pelo contato. Responderei o mais breve possível.',
                    }),
                  ],
                })
              : (0, a.jsxs)('form', {
                  onSubmit: h,
                  action: x.CONTACT_FORM.action,
                  method: 'POST',
                  className: 'space-y-8',
                  children: [
                    (0, a.jsx)('noscript', {
                      children: (0, a.jsx)('p', {
                        className:
                          'p-4 mb-4 text-sm text-amber-800 bg-amber-50 rounded-lg',
                        children:
                          'JavaScript está desativado. O formulário será enviado via redirecionamento padrão.',
                      }),
                    }),
                    (0, a.jsx)('input', {
                      type: 'text',
                      name: '_honey',
                      className: 'hidden',
                      'aria-hidden': 'true',
                      tabIndex: -1,
                      title: 'Ignore this field',
                      autoComplete: 'off',
                    }),
                    (0, a.jsx)('input', {
                      type: 'hidden',
                      name: '_captcha',
                      value: 'false',
                    }),
                    (0, a.jsxs)('div', {
                      className: 'grid grid-cols-1 gap-8',
                      children: [
                        (0, a.jsx)(f, {
                          label: 'Seu nome',
                          id: 'name',
                          name: 'name',
                          value: o.name,
                          onChange: p,
                          error: s.name,
                          required: !0,
                          autoComplete: 'name',
                          placeholder: 'João da Silva',
                        }),
                        (0, a.jsx)(f, {
                          label: 'Seu email',
                          id: 'email',
                          name: 'email',
                          type: 'email',
                          value: o.email,
                          onChange: p,
                          error: s.email,
                          required: !0,
                          autoComplete: 'email',
                          placeholder: 'joao@empresa.com',
                        }),
                        (0, a.jsx)(f, {
                          label: 'Telefone',
                          id: 'phone',
                          name: 'phone',
                          type: 'tel',
                          value: o.phone,
                          onChange: p,
                          error: s.phone,
                          placeholder: '(11) 99999-9999',
                        }),
                        (0, a.jsx)(v, {
                          label: 'Sua mensagem',
                          id: 'message',
                          name: 'message',
                          value: o.message,
                          onChange: p,
                          error: s.message,
                          required: !0,
                          rows: 4,
                          placeholder: 'Conte-me sobre seu projeto...',
                        }),
                      ],
                    }),
                    s.submit &&
                      (0, a.jsx)('p', {
                        className: 'text-sm text-red-500 font-bold uppercase',
                        children: s.submit,
                      }),
                    (0, a.jsxs)(t.motion.button, {
                      type: 'submit',
                      disabled: n,
                      whileHover: { y: -1, scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      className:
                        'w-full h-[60px] md:h-[64px] flex items-center justify-center gap-3 bg-[#0048ff] text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0048ff] focus-visible:ring-offset-2 tracking-tight text-lg shadow-[0_10px_30px_-10px_rgba(0,72,255,0.3)]',
                      children: [
                        n ? 'Enviando...' : 'Enviar Mensagem',
                        !n &&
                          (0, a.jsx)('svg', {
                            xmlns: 'http://www.w3.org/2000/svg',
                            className: 'h-5 w-5 ml-1',
                            fill: 'none',
                            viewBox: '0 0 24 24',
                            stroke: 'currentColor',
                            'aria-hidden': 'true',
                            children: (0, a.jsx)('path', {
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                              strokeWidth: 2,
                              d: 'M14 5l7 7m0 0l-7 7m7-7H3',
                            }),
                          }),
                      ],
                    }),
                  ],
                }),
          }),
        });
      };
    var y = e.i(87857);
    function j() {
      let e = (0, i.useReducedMotion)(),
        o = [
          {
            label: x.SOCIALS.phone,
            href: `tel:${x.SOCIALS.phone.replace(/\D/g, '')}`,
            icon: (0, a.jsx)(d, {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            }),
            ariaLabel: `Ligar para ${x.SOCIALS.phone}`,
          },
          {
            label: x.SOCIALS.emailPrimary.replace('mailto:', ''),
            href: x.SOCIALS.emailPrimary,
            icon: (0, a.jsx)(l.Mail, {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            }),
            ariaLabel: `Enviar email para ${x.SOCIALS.emailPrimary.replace('mailto:', '')}`,
          },
          {
            label: x.SOCIALS.emailSecondary.replace('mailto:', ''),
            href: x.SOCIALS.emailSecondary,
            icon: (0, a.jsx)(l.Mail, {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            }),
            ariaLabel: `Enviar email para ${x.SOCIALS.emailSecondary.replace('mailto:', '')}`,
          },
        ],
        s = [
          {
            label: 'Instagram',
            href: x.SOCIALS.instagram,
            icon: (0, a.jsx)(c.Instagram, {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            }),
          },
          {
            label: 'Facebook',
            href: x.SOCIALS.facebook,
            icon: (0, a.jsx)(h, {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            }),
          },
          {
            label: 'LinkedIn',
            href: x.SOCIALS.linkedin,
            icon: (0, a.jsx)(m.Linkedin, {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            }),
          },
          {
            label: 'Twitter',
            href: x.SOCIALS.twitter,
            icon: (0, a.jsx)(p, {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            }),
          },
          {
            label: 'Portfolio',
            href: `https://${u.BRAND.domain}`,
            icon: (0, a.jsx)(g, {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            }),
          },
        ];
      return (0, a.jsx)('section', {
        id: 'contact',
        'data-light-section': !0,
        'aria-label': 'Contato',
        className:
          'bg-[#f0f0f0] py-12 sm:py-16 md:py-24 lg:py-32 relative z-10',
        children: (0, a.jsx)(y.Container, {
          children: (0, a.jsxs)('div', {
            className:
              'grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start',
            children: [
              (0, a.jsxs)(t.motion.div, {
                initial: e ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: !0 },
                transition: { duration: 0.6, delay: 0.1 },
                className:
                  'lg:col-span-5 flex flex-col space-y-10 order-1 md:order-1 lg:order-0',
                children: [
                  (0, a.jsxs)('div', {
                    className: 'text-center lg:text-left mb-6 lg:mb-10',
                    children: [
                      (0, a.jsx)('h2', {
                        className:
                          'text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#0057FF] uppercase tracking-tighter mb-4 leading-[0.9]',
                        children: r.HOME_CONTENT.contact.title,
                      }),
                      (0, a.jsx)('p', {
                        className:
                          'text-[#111111] text-lg md:text-xl font-medium max-w-md mx-auto lg:mx-0',
                        children: r.HOME_CONTENT.contact.subtitle,
                      }),
                    ],
                  }),
                  (0, a.jsx)('div', {
                    className: 'flex flex-col space-y-6',
                    children: o.map((e) =>
                      (0, a.jsxs)(
                        'a',
                        {
                          href: e.href,
                          target: e.href.startsWith('http') ? '_blank' : void 0,
                          rel: e.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : void 0,
                          'aria-label': e.ariaLabel,
                          className:
                            'flex items-center gap-3 sm:gap-4 group w-fit py-2 active:opacity-80 transition-opacity',
                          children: [
                            (0, a.jsx)('span', {
                              className:
                                'flex h-12 w-12 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-transparent border-2 border-[#0057FF] text-[#0057FF] transition-all duration-200 group-hover:bg-[#0057FF] group-hover:text-white group-active:bg-[#0057FF] group-active:text-white group-active:scale-95',
                              children: e.icon,
                            }),
                            (0, a.jsx)('span', {
                              className:
                                'text-base sm:text-lg md:text-xl font-semibold text-[#111111] transition-all duration-200 group-hover:text-[#0057FF] group-hover:underline group-hover:underline-offset-4',
                              children: e.label,
                            }),
                          ],
                        },
                        e.href
                      )
                    ),
                  }),
                  (0, a.jsx)('div', {
                    className:
                      'hidden lg:flex flex-wrap items-center gap-4 pt-10 border-t border-[#0e0e0e]/20',
                    children: s.map((e) =>
                      (0, a.jsx)(
                        'a',
                        {
                          href: e.href,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          'aria-label': e.label,
                          className:
                            'flex h-14 w-14 items-center justify-center rounded-full border border-[#0e0e0e]/30 bg-transparent text-[#0e0e0e] transition-all hover:border-[#0048ff] hover:bg-[#0048ff] hover:text-white hover:scale-110',
                          children: e.icon,
                        },
                        e.href
                      )
                    ),
                  }),
                ],
              }),
              (0, a.jsx)('div', {
                className:
                  'lg:hidden flex flex-wrap justify-center gap-3 sm:gap-4 py-6 sm:py-8 border-t border-[#0e0e0e]/20 w-full order-2',
                children: s.map((e) =>
                  (0, a.jsx)(
                    'a',
                    {
                      href: e.href,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      'aria-label': e.label,
                      className:
                        'flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0e0e0e]/30 bg-transparent text-[#0e0e0e] shadow-sm transition-all duration-200 active:scale-90 active:bg-[#0048ff] active:border-[#0048ff] active:text-white',
                      children: e.icon,
                    },
                    `mobile-${e.href}`
                  )
                ),
              }),
              (0, a.jsx)('div', {
                className: 'lg:col-span-7 w-full order-3 lg:order-0',
                children: (0, a.jsx)(w, {}),
              }),
            ],
          }),
        }),
      });
    }
    e.s(['default', () => j], 21833);
  },
  74177,
  (e) => {
    'use strict';
    var a = e.i(77579),
      t = e.i(2338),
      i = e.i(21833),
      o = e.i(89668),
      r = e.i(77358),
      s = e.i(89361),
      l = e.i(9083),
      n = e.i(39995);
    function d() {
      let e = [
        {
          label: 'Instagram',
          href: n.SOCIALS.instagram,
          icon: (0, a.jsx)(r.Instagram, { className: 'w-5 h-5 lg:w-4 lg:h-4' }),
        },
        {
          label: 'LinkedIn',
          href: n.SOCIALS.linkedin,
          icon: (0, a.jsx)(s.Linkedin, { className: 'w-5 h-5 lg:w-4 lg:h-4' }),
        },
        {
          label: 'Twitter',
          href: n.SOCIALS.twitter,
          icon: (0, a.jsx)(l.Twitter, { className: 'w-5 h-5 lg:w-4 lg:h-4' }),
        },
      ];
      return (0, a.jsx)('footer', {
        className:
          'w-full bg-[#0057FF] text-white lg:fixed lg:bottom-0 lg:left-0 lg:z-10 relative z-0 footer-safe-area',
        'aria-label': 'Rodapé do site',
        children: (0, a.jsxs)('div', {
          className:
            'std-grid flex flex-col lg:flex-row items-center justify-between py-12 lg:py-0 lg:h-[64px] gap-10 lg:gap-0',
          children: [
            (0, a.jsx)('div', {
              className: 'order-1 lg:order-0',
              children: (0, a.jsx)('p', {
                className:
                  'text-[0.875rem] lg:text-[10px] font-medium tracking-[0.05em] uppercase opacity-90 lg:opacity-100 text-center lg:text-left',
                children: n.NAVIGATION.footer.copyright,
              }),
            }),
            (0, a.jsx)('nav', {
              className:
                'flex flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 lg:gap-8 order-2 lg:order-0',
              'aria-label': 'Navegação do rodapé',
              children: n.NAVIGATION.footer.links.map((e) =>
                (0, a.jsxs)(
                  o.default,
                  {
                    href: e.href,
                    className:
                      'group relative text-[11px] sm:text-[12px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200 py-4 px-3 sm:px-4 lg:py-0 lg:px-0 min-h-[48px] flex items-center',
                    children: [
                      e.label,
                      (0, a.jsx)('span', {
                        className:
                          'absolute bottom-[-2px] left-0 w-0 h-px bg-white transition-all duration-200 ease-out group-hover:w-full hidden lg:block',
                      }),
                    ],
                  },
                  e.label
                )
              ),
            }),
            (0, a.jsx)('div', {
              className:
                'flex flex-row items-center justify-center gap-4 order-3 lg:order-0',
              'aria-label': 'Redes sociais',
              children: e.map((e) =>
                (0, a.jsx)(
                  'a',
                  {
                    href: e.href,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className:
                      'hover:scale-105 transition-transform duration-200 opacity-100 lg:opacity-90 lg:hover:opacity-100 p-3 lg:p-0 flex items-center justify-center min-w-[48px] min-h-[48px] lg:min-w-0 lg:min-h-0',
                    'aria-label': e.label,
                    children: e.icon,
                  },
                  e.label
                )
              ),
            }),
          ],
        }),
      });
    }
    function c() {
      return (0, a.jsxs)(a.Fragment, {
        children: [
          (0, a.jsx)(t.default, {}),
          (0, a.jsx)(i.default, {}),
          (0, a.jsx)(d, {}),
        ],
      });
    }
    e.s(['SiteClosure', () => c], 74177);
  },
]);

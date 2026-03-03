(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === 'object' ? document.currentScript : undefined,
  '[project]/src/config/content.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'ABOUT_CONTENT',
      () => ABOUT_CONTENT,
      'HOME_CONTENT',
      () => HOME_CONTENT,
      'PORTFOLIO_CONTENT',
      () => PORTFOLIO_CONTENT,
      'TAG_CATALOG',
      () => TAG_CATALOG,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/supabase/urls.ts [app-client] (ecmascript)'
      );
    const siteAsset = (path) =>
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'buildSupabaseStorageUrl'
      ])('site-assets', path);
    const projectMedia = (path) =>
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'buildSupabaseStorageUrl'
      ])('portfolio-media', path);
    const HOME_CONTENT = {
      hero: {
        tag: '[BRAND AWARENESS]',
        // Otimizado: Array permite animação escalonada (stagger) linha a linha
        title: ['Você não vê o design.'],
        titleDesktop: ['Você não vê ', 'o design.'],
        titleMobile: ['Você não ', 'vê o ', 'design.'],
        subtitle: 'Mas ele vê você.',
        cta: 'step inside',
      },
      showcase: {
        title: 'portfólio showcase',
        floatingLabel: '[what we love working on]',
        cta: {
          label: 'let’s build something great →',
          href: '/#contact',
        },
        ctas: [
          {
            label: 'fale comigo',
            href: '#contact',
            variant: 'primary',
          },
          {
            label: 'baixar curriculum',
            href: '/cv-danilo-novais.pdf',
            variant: 'secondary',
            download: true,
            external: true,
          },
        ],
        categories: [
          {
            id: 'brand-campaigns',
            label: 'Brand & Campaigns',
            titleDesktop: 'Brand & Campaigns',
            // Otimizado: Quebra forçada para evitar viúva em mobile pequeno
            titleMobile: 'Brand &\nCampaigns',
            align: 'end',
            thumb: siteAsset('home/showcase/Branding-Project.webp'),
          },
          {
            id: 'videos-motions',
            label: 'Videos & Motions',
            titleDesktop: 'Videos & Motions',
            titleMobile: 'Videos &\nMotions',
            align: 'center',
            thumb: siteAsset('home/showcase/Key-Visual.webp'),
          },
          {
            id: 'web-tech',
            label: 'Web Campaigns, Websites & Tech',
            // Otimizado: Balanceamento visual para desktop
            titleDesktop: 'Web Campaigns,\nWebsites & Tech',
            // Otimizado: Quebra estratégica para mobile (3 linhas equilibradas)
            titleMobile: 'Web Campaigns,\nWebsites & Tech',
            align: 'start',
            thumb: siteAsset('home/showcase/webdesigner-2.gif'),
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
          img: projectMedia('projects/creative-direction/hero.webp'),
          layout: {
            // Otimizado: 'min-h' previne overflow de texto, 'aspect' mantém proporção visual
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
          img: projectMedia('projects/campaign/hero.webp'),
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
          img: projectMedia(
            'projects/key-vision/gallery/converted-5-webp.webp'
          ),
          layout: {
            // Otimizado: Altura maior para destaque full-width
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
          img: projectMedia('projects/key_vision/hero.webp'),
          layout: {
            h: 'min-h-[400px] md:h-[400px] aspect-video md:aspect-auto',
            cols: 'md:col-span-8',
            sizes: '(max-width: 1024px) 100vw, 66vw',
          },
        },
      ],
      clients: {
        title: 'marcas com as quais já trabalhei',
        logos: Array.from(
          {
            length: 12,
          },
          (_, i) => ({
            id: i + 1,
            src: siteAsset(`clients/clients.strip.${i + 1}.svg`),
            alt: `Logo do cliente ${i + 1}`,
          })
        ),
      },
      contact: {
        title: 'contato',
        subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
      },
    };
    const TAG_CATALOG = [
      {
        category: {
          label: 'Videos & Motions',
          slug: 'videos-motions',
          type: 'category',
        },
        tags: [
          {
            label: 'Vídeo',
            slug: 'video',
            type: 'tag',
          },
          {
            label: 'Vídeo Institucional',
            slug: 'brand-video',
            type: 'tag',
          },
          {
            label: 'Vídeo para Redes Sociais',
            slug: 'social-video',
            type: 'tag',
          },
          {
            label: 'Filme Publicitário',
            slug: 'advertising-video',
            type: 'tag',
          },
          {
            label: 'Edição de Vídeo',
            slug: 'video-editing',
            type: 'tag',
          },
          {
            label: 'Motion Design',
            slug: 'motion-design',
            type: 'tag',
          },
          {
            label: 'Animação',
            slug: 'animation',
            type: 'tag',
          },
          {
            label: 'Animação 2D',
            slug: '2d-animation',
            type: 'tag',
          },
          {
            label: 'Tipografia Cinética',
            slug: 'kinetic-typography',
            type: 'tag',
          },
          {
            label: 'Transições Animadas',
            slug: 'animated-transitions',
            type: 'tag',
          },
          {
            label: 'Microinterações',
            slug: 'micro-interactions',
            type: 'tag',
          },
          {
            label: 'Narrativa Visual',
            slug: 'visual-storytelling',
            type: 'tag',
          },
          {
            label: 'Roteiro',
            slug: 'script',
            type: 'tag',
          },
          {
            label: 'Conceito de Vídeo',
            slug: 'video-concept',
            type: 'tag',
          },
          {
            label: 'Design de Som',
            slug: 'sound-design',
            type: 'tag',
          },
        ],
      },
    ];
    const ABOUT_CONTENT = {
      hero: {
        title: {
          text: 'Sou ',
          highlight: 'Danilo Novais. ',
        },
        manifesto: [
          {
            text: 'Você ',
            highlight: 'não vê tudo ',
            textEnd: 'o que eu faço. Mas sente',
          },
          {
            text: 'quando ',
            highlight: 'funciona.',
          },
        ],
        description: [
          'Crio designs que observam,\n',
          'entendem e guiam experiências com intenção,\n',
          'estratégia e tecnologia,\n na medida exata.',
        ],
        videos: {
          desktop: siteAsset('about/hero/about.hero.desktop_video.mp4'),
          mobile: siteAsset('about/hero/about.hero.mobile_video.mp4'),
        },
      },
      beliefsIntro: [
        {
          text: 'Acredito no ',
        },
        {
          text: 'design que muda o dia',
          highlight: true,
        },
        {
          text: ' de alguém.',
          newLine: true,
        },
        {
          text: 'Não pelo choque, ',
        },
        {
          text: 'mas pela conexão.',
          highlight: true,
        },
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
            src: siteAsset('about/origin/about.origin_image.1.webp'),
            alt: 'Observando os detalhes',
            align: 'right',
          },
          {
            type: 'block',
            id: '2',
            title: 'DO TRAÇO À INTENÇÃO',
            text: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso, do lápis na margem do caderno. Aos poucos, aquilo que era instinto virou direção. Com cada tentativa, aprendi a dar forma ao invisível — até que os conceitos começaram a falar por si.',
            description: '',
            src: siteAsset('about/origin/about.origin_image.2.webp'),
            alt: 'Processo criativo',
            align: 'left',
          },
          {
            type: 'block',
            id: '3',
            title: 'A DESCOBERTA DO INVISÍVEL',
            text: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação. Por trás de cada escolha visual, existe intenção. Descobri que o design verdadeiro não grita — ele conduz. Ele está presente nos detalhes que ninguém percebe, mas que todos sentem. Transformar sem que se perceba a transformação: isso é potência.',
            description: '',
            src: siteAsset('about/origin/about.origin_image.3.webp'),
            alt: 'Design invisível',
            align: 'right',
          },
          {
            type: 'block',
            id: '4',
            title: 'EXPANSÃO COM PROPÓSITO',
            text: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação. Minha trajetória uniu intuição com método, arte com estratégia. O futuro pede novas ferramentas — e eu as abracei. Mas nunca deixei que a tecnologia apagasse o que me move: a sensibilidade, o olhar atento, a busca pelo significado.',
            description: '',
            src: siteAsset('about/origin/about.origin_image.4.webp'),
            alt: 'Expansão e tecnologia',
            align: 'left',
          },
        ],
      },
      whatIDo: {
        title: ['Do insight ao impacto.', 'Mesmo quando você não percebe.'],
        cards: [
          {
            id: '1',
            text: 'Direção criativa que organiza o caos',
          },
          {
            id: '2',
            text: 'Design estratégico que guia decisões',
          },
          {
            id: '3',
            text: 'Identidades que permanecem na memória',
          },
          {
            id: '4',
            text: 'Campanhas multicanais com lógica e emoção',
          },
          {
            id: '5',
            text: 'Branding que não grita, mas marca',
          },
          {
            id: '6',
            text: 'Inteligência Artificial aplicada à criação',
          },
          {
            id: '7',
            text: 'Liderança Criativa com visão e método',
          },
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
          desktop: siteAsset('about/method/about.method.desktop_video.mp4'),
          mobile: siteAsset('about/method/about.method.mobile_video.mp4'),
        },
        intro: [
          'Antes da estética, existe intenção.',
          'Antes do layout, existe lógica.',
          'Antes do impacto, existe silêncio.',
        ],
        steps: [
          {
            id: '1',
            text: 'Briefings bem construídos para decisões claras',
          },
          {
            id: '2',
            text: 'Estratégia como base de qualquer criação',
          },
          {
            id: '3',
            text: 'Design with propósito, não só beleza',
          },
          {
            id: '4',
            text: 'Revisões inteligentes, sem ruído desnecessário',
          },
          {
            id: '5',
            text: 'IA e automações para escalar com qualidade',
          },
          {
            id: '6',
            text: 'Métricas criativas: engajamento, retenção e resultado',
          },
        ],
      },
      beliefs: [
        {
          text: 'Um vídeo que respira.',
          highlight: 'respira',
        },
        {
          text: 'Uma marca que se reconhece.',
          highlight: 'reconhece',
        },
        {
          text: 'Um detalhe que fica.',
          highlight: 'fica',
        },
        {
          text: 'Crio para gerar presença.',
          highlight: 'Crio',
        },
        {
          text: 'Mesmo quando não estou ali.',
          highlight: 'Mesmo',
        },
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
        ghostText: {
          prefix: 'ISSO É',
          main: 'GHOST DESIGN',
        },
        ctas: [
          {
            label: 'fale comigo',
            href: '#contact',
            variant: 'primary',
          },
          {
            label: 'baixar curriculum',
            href: '/cv-danilo-novais.pdf',
            variant: 'secondary',
            download: true,
            external: true,
          },
        ],
      },
    };
    const PORTFOLIO_CONTENT = {
      hero: {
        video: {
          desktop: '/site.assets/portfolio/portfolio.hero_desktop_video.mp4',
          mobile: '/site.assets/portfolio/portfolio.hero_mobile_video.mp4',
        },
      },
    };
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/store/content.store.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useContentStore', () => useContentStore]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$11_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$19$2e$2$2e$4_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/zustand@5.0.11_@types+react@19.2.14_react@19.2.4_use-sync-external-store@1.6.0_react@19.2.4_/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)'
      );
    const useContentStore = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$11_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$19$2e$2$2e$4_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
      'create'
    ])((set) => ({
      projects: {},
      assets: {},
      setProjects: (list) =>
        set((state) => ({
          projects: {
            ...state.projects,
            ...list.reduce(
              (acc, p) => ({
                ...acc,
                [p.id]: p,
              }),
              {}
            ),
          },
        })),
      upsertProject: (project) =>
        set((state) => ({
          projects: {
            ...state.projects,
            [project.id]: project,
          },
        })),
      setAssets: (list) =>
        set((state) => ({
          assets: {
            ...state.assets,
            ...list.reduce(
              (acc, a) => ({
                ...acc,
                [a.key]: a,
              }),
              {}
            ),
          },
        })),
      upsertAsset: (asset) =>
        set((state) => ({
          assets: {
            ...state.assets,
            [asset.key]: asset,
          },
        })),
      clearCache: () =>
        set({
          projects: {},
          assets: {},
        }),
    }));
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/hooks/useRealtimeAssets.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useRealtimeAsset', () => useRealtimeAsset]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/supabase/client.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$content$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/store/content.store.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/supabase/urls.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    // --- Singleton Subscription Manager ---
    let globalChannel = null;
    let subscribersCount = 0;
    let unsubscribeTimeout = null;
    let isConnecting = false;
    const subscribeToAssets = async () => {
      if (unsubscribeTimeout) {
        clearTimeout(unsubscribeTimeout);
        unsubscribeTimeout = null;
      }
      subscribersCount++;
      if (!globalChannel && !isConnecting) {
        isConnecting = true;
        const supabase = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'createClientComponentClient'
        ])();
        try {
          // Setup Auth if available
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session?.access_token) {
            supabase.realtime.setAuth(session.access_token);
          }
        } catch (e) {
          console.warn(
            '[useRealtimeAssets] Auth setup optional check failed',
            e
          );
        }
        // Double check if still needed (in case all unmounted during await)
        if (subscribersCount <= 0) {
          isConnecting = false;
          return;
        }
        globalChannel = supabase
          .channel('site_assets_global')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'site_assets',
            },
            (payload) => {
              const newItem = payload.new;
              // Only process valid updates
              if (newItem && typeof newItem === 'object') {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$content$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'useContentStore'
                ]
                  .getState()
                  .upsertAsset(newItem);
              }
            }
          )
          .subscribe((status, err) => {
            if (
              status === 'CHANNEL_ERROR' ||
              status === 'TIMED_OUT' ||
              status === 'CLOSED'
            ) {
              console.warn(
                `[useRealtimeAssets] Global subscription status: ${status}`,
                err
              );
            }
          });
        isConnecting = false;
      }
    };
    const unsubscribeFromAssets = () => {
      subscribersCount = Math.max(0, subscribersCount - 1);
      if (subscribersCount <= 0) {
        if (unsubscribeTimeout) clearTimeout(unsubscribeTimeout);
        unsubscribeTimeout = setTimeout(async () => {
          if (subscribersCount <= 0 && globalChannel) {
            const supabase = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'createClientComponentClient'
            ])();
            await supabase.removeChannel(globalChannel);
            globalChannel = null;
          }
        }, 5000); // 5s debounce
      }
    };
    // Helper to format URL
    const toPublicUrl = (item) => {
      const isExternal = item.file_path?.startsWith('http');
      if (isExternal) return item.file_path;
      const generatedUrl = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'buildSupabaseStorageUrl'
      ])(item.bucket || 'site-assets', item.file_path);
      if (!generatedUrl) return null;
      // v4 paths use hashes in the filename and are immutable. No cache buster needed.
      if (item.file_path?.startsWith('v4/')) {
        return generatedUrl;
      }
      // Legacy paths or site-assets without hash still need cache busting for upserts
      return `${generatedUrl}?t=${new Date(item.updated_at || Date.now()).getTime()}`;
    };
    // Smart Polling Config
    const POLLING_CONFIG = {
      activeInterval: 15000,
      backgroundInterval: 300000,
      maxBackoff: 600000,
    };
    function useRealtimeAsset(assetKey) {
      _s();
      const storeAsset = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$content$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useContentStore'
      ])(
        {
          'useRealtimeAsset.useContentStore[storeAsset]': (state) =>
            state.assets[assetKey],
        }['useRealtimeAsset.useContentStore[storeAsset]']
      );
      const upsertAsset = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$content$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useContentStore'
      ])(
        {
          'useRealtimeAsset.useContentStore[upsertAsset]': (state) =>
            state.upsertAsset,
        }['useRealtimeAsset.useContentStore[upsertAsset]']
      );
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(!storeAsset);
      const [error, setError] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(null);
      // Refs for polling management
      const pollingTimerRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const backoffCountRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(0);
      const isVisibleRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(true);
      // Define fetchInitial outside useEffect for reuse
      const fetchInitial = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ])(
        {
          'useRealtimeAsset.useCallback[fetchInitial]': async (isMounted) => {
            // Only fetch if not in cache OR if we want to ensure freshness
            const supabase = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'createClientComponentClient'
            ])();
            // Check if we should even fetch (e.g. if tab is hidden, skip unless forced)
            // But for initial load we always fetch.
            const { data, error: fetchError } = await supabase
              .from('site_assets')
              .select('*')
              .eq('key', assetKey)
              .maybeSingle();
            if (!isMounted()) return;
            if (fetchError) {
              setError(new Error(fetchError.message));
              // Increase backoff on error
              backoffCountRef.current++;
            }
            if (data) {
              upsertAsset(data);
              // Reset backoff on success
              backoffCountRef.current = 0;
            }
            setLoading(false);
          },
        }['useRealtimeAsset.useCallback[fetchInitial]'],
        [assetKey, upsertAsset]
      );
      // 1. State Sync Effect: Handle loading state based on store presence
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'useRealtimeAsset.useEffect': () => {
            if (storeAsset) {
              setLoading(false);
            }
          },
        }['useRealtimeAsset.useEffect'],
        [storeAsset]
      );
      // 2. Polling & Subscription Effect: Manage lifecycle independent of store updates
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'useRealtimeAsset.useEffect': () => {
            let isDisposed = false;
            const isMounted = {
              'useRealtimeAsset.useEffect.isMounted': () => !isDisposed,
            }['useRealtimeAsset.useEffect.isMounted'];
            // --- Polling Logic ---
            const scheduleNextPoll = {
              'useRealtimeAsset.useEffect.scheduleNextPoll': () => {
                if (isDisposed) return;
                if (pollingTimerRef.current)
                  clearTimeout(pollingTimerRef.current);
                let delay = POLLING_CONFIG.activeInterval;
                // Logic: If hidden, use long interval. If error backoff, increase.
                if (!isVisibleRef.current) {
                  delay = POLLING_CONFIG.backgroundInterval;
                }
                // Add simple backoff factor (capped)
                if (backoffCountRef.current > 0) {
                  delay = Math.min(
                    delay * (backoffCountRef.current + 1),
                    POLLING_CONFIG.maxBackoff
                  );
                }
                pollingTimerRef.current = setTimeout(
                  {
                    'useRealtimeAsset.useEffect.scheduleNextPoll': () => {
                      void fetchInitial(isMounted).then(
                        {
                          'useRealtimeAsset.useEffect.scheduleNextPoll': () => {
                            scheduleNextPoll(); // Reschedule after complete
                          },
                        }['useRealtimeAsset.useEffect.scheduleNextPoll']
                      );
                    },
                  }['useRealtimeAsset.useEffect.scheduleNextPoll'],
                  delay
                );
              },
            }['useRealtimeAsset.useEffect.scheduleNextPoll'];
            const stopPolling = {
              'useRealtimeAsset.useEffect.stopPolling': () => {
                if (pollingTimerRef.current) {
                  clearTimeout(pollingTimerRef.current);
                  pollingTimerRef.current = null;
                }
              },
            }['useRealtimeAsset.useEffect.stopPolling'];
            // Visibility Handler
            const handleVisibilityChange = {
              'useRealtimeAsset.useEffect.handleVisibilityChange': () => {
                isVisibleRef.current = document.visibilityState === 'visible';
                if (isVisibleRef.current) {
                  // Came to foreground: Poll immediately if it's been a while, or just restart schedule
                  // For simplicity: restart schedule with short delay to feel "responsive"
                  stopPolling();
                  backoffCountRef.current = 0; // Reset backoff on user interaction
                  void fetchInitial(isMounted).then(
                    {
                      'useRealtimeAsset.useEffect.handleVisibilityChange': () =>
                        scheduleNextPoll(),
                    }['useRealtimeAsset.useEffect.handleVisibilityChange']
                  );
                } else {
                  // Went to background: Stop current timer and switch to slow poll
                  stopPolling();
                  scheduleNextPoll();
                }
              },
            }['useRealtimeAsset.useEffect.handleVisibilityChange'];
            // Initial calls
            isVisibleRef.current = document.visibilityState === 'visible';
            document.addEventListener(
              'visibilitychange',
              handleVisibilityChange
            );
            window.addEventListener('focus', handleVisibilityChange); // Extra responsiveness
            void fetchInitial(isMounted).then(
              {
                'useRealtimeAsset.useEffect': () => {
                  if (isDisposed) return;
                  scheduleNextPoll();
                },
              }['useRealtimeAsset.useEffect']
            );
            // --- Join Global Subscription ---
            void subscribeToAssets();
            return {
              'useRealtimeAsset.useEffect': () => {
                isDisposed = true;
                stopPolling();
                unsubscribeFromAssets();
                document.removeEventListener(
                  'visibilitychange',
                  handleVisibilityChange
                );
                window.removeEventListener('focus', handleVisibilityChange);
              },
            }['useRealtimeAsset.useEffect'];
          },
        }['useRealtimeAsset.useEffect'],
        [assetKey, fetchInitial]
      ); // Removed storeAsset to prevent re-execution on updates
      const assetWithUrl = storeAsset
        ? {
            ...storeAsset,
            publicUrl: toPublicUrl(storeAsset) || '',
          }
        : null;
      return {
        asset: assetWithUrl,
        loading,
        error,
      };
    }
    _s(useRealtimeAsset, 'jV6mCaNO6y5LoxHBd/i8J4x0T9g=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$content$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useContentStore'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$content$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useContentStore'
        ],
      ];
    });
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/ui/shared/DynamicAssetImage.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['DynamicAssetImage', () => DynamicAssetImage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRealtimeAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useRealtimeAssets.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/image.js [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    function DynamicAssetImage({
      assetKey,
      alt,
      className = '',
      width,
      height,
      priority = false,
      fallbackUrl,
      sizes,
      objectFit = 'cover',
    }) {
      _s();
      const { asset, loading, error } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRealtimeAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRealtimeAsset'
      ])(assetKey);
      const normalizedFallback = fallbackUrl?.trim() || null;
      const [displayUrl, setDisplayUrl] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(normalizedFallback);
      const [isTransitioning, setIsTransitioning] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'DynamicAssetImage.useEffect': () => {
            if (asset?.publicUrl && asset.publicUrl !== displayUrl) {
              setIsTransitioning(true);
              const timer = setTimeout(
                {
                  'DynamicAssetImage.useEffect.timer': () => {
                    setDisplayUrl(asset.publicUrl);
                    setIsTransitioning(false);
                  },
                }['DynamicAssetImage.useEffect.timer'],
                150
              );
              return {
                'DynamicAssetImage.useEffect': () => clearTimeout(timer),
              }['DynamicAssetImage.useEffect'];
            }
          },
        }['DynamicAssetImage.useEffect'],
        [asset?.publicUrl, displayUrl]
      );
      const finalUrl = displayUrl || normalizedFallback;
      if (loading && !fallbackUrl) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'div',
          {
            className: `animate-pulse bg-slate-800/50 ${className}`,
            style: {
              width,
              height,
            },
          },
          void 0,
          false,
          {
            fileName:
              '[project]/src/components/ui/shared/DynamicAssetImage.tsx',
            lineNumber: 57,
            columnNumber: 7,
          },
          this
        );
      }
      if (!finalUrl && !loading) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'div',
          {
            className: `flex items-center justify-center bg-slate-900/50 text-slate-500 text-sm ${className}`,
            style: {
              width,
              height,
            },
            children: 'Asset not found',
          },
          void 0,
          false,
          {
            fileName:
              '[project]/src/components/ui/shared/DynamicAssetImage.tsx',
            lineNumber: 66,
            columnNumber: 7,
          },
          this
        );
      }
      if (error && finalUrl) {
        console.warn(
          `[DynamicAssetImage] usando fallback para ${assetKey}`,
          error
        );
      }
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          className: `relative ${className}`,
          style: {
            width,
            height,
          },
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'default'
            ],
            {
              src: finalUrl,
              alt: alt,
              fill: !width && !height,
              width: width,
              height: height,
              priority: priority,
              sizes: sizes || (!width && !height ? '100vw' : undefined),
              unoptimized: finalUrl?.toLowerCase().endsWith('.svg'),
              className: `object-${objectFit} transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`,
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/ui/shared/DynamicAssetImage.tsx',
              lineNumber: 81,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName: '[project]/src/components/ui/shared/DynamicAssetImage.tsx',
          lineNumber: 80,
          columnNumber: 5,
        },
        this
      );
    }
    _s(DynamicAssetImage, 'w5ywIJobGWWkQLoh+k4Lm4xfBEI=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRealtimeAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useRealtimeAsset'
        ],
      ];
    });
    _c = DynamicAssetImage;
    var _c;
    __turbopack_context__.k.register(_c, 'DynamicAssetImage');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/clients/ClientsBrandsSection.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => ClientsBrandsSection]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/content.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/motion.ts [app-client] (ecmascript)'
      );
    /**
     * ClientsBrandsSection - Exibe logotipos das marcas/clientes
     * Segue o Ghost System v3.0 com animações sutis e responsividade
     */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$shared$2f$DynamicAssetImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/ui/shared/DynamicAssetImage.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/site-assets.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    function ClientsBrandsSection() {
      _s();
      const reducedMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      const logos =
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'HOME_CONTENT'
        ].clients.logos.slice(0, 12);
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'section',
        {
          id: 'clients',
          className:
            'bg-bluePrimary py-16 md:py-20 lg:py-24 relative z-10 overflow-hidden',
          'aria-labelledby': 'clients-heading',
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: 'std-grid',
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'motion'
                  ].div,
                  {
                    initial: reducedMotion
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                          y: 16,
                        },
                    whileInView: {
                      opacity: 1,
                      y: 0,
                    },
                    viewport:
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'viewportConfig'
                      ],
                    transition: {
                      duration: 0.6,
                      ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'GHOST_EASE'
                      ],
                    },
                    className: 'mb-10 md:mb-16 lg:mb-20',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'h2',
                      {
                        id: 'clients-heading',
                        className:
                          'text-white text-[1.5rem] md:text-[2rem] font-bold text-center tracking-tight leading-tight lowercase',
                        children:
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'HOME_CONTENT'
                          ].clients.title,
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          '[project]/src/components/home/clients/ClientsBrandsSection.tsx',
                        lineNumber: 42,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/home/clients/ClientsBrandsSection.tsx',
                    lineNumber: 32,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'motion'
                  ].ul,
                  {
                    role: 'list',
                    'aria-label': 'Logotipos das marcas parceiras',
                    initial: 'hidden',
                    whileInView: 'show',
                    viewport:
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'viewportConfig'
                      ],
                    variants: {
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.1,
                        },
                      },
                    },
                    className:
                      'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center justify-items-center w-full',
                    children: logos.map((logo, index) => {
                      // const shouldEagerLoad = logo.id <= 3; // Removed unused var
                      const assetKey =
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$assets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'SITE_ASSET_KEYS'
                        ].clients.strips[index];
                      return /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'motion'
                        ].li,
                        {
                          role: 'listitem',
                          variants: {
                            hidden: {
                              opacity: 0,
                              y: 20,
                              filter: 'blur(4px)',
                            },
                            show: {
                              opacity: 1,
                              y: 0,
                              filter: 'blur(0px)',
                              transition: {
                                duration: 0.8,
                                ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'GHOST_EASE'
                                ],
                              },
                            },
                          },
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'div',
                            {
                              className:
                                'group relative w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-24 flex items-center justify-center transition-transform duration-500 will-change-transform group-hover:-translate-y-0.5 p-2',
                              children: /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$shared$2f$DynamicAssetImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'DynamicAssetImage'
                                ],
                                {
                                  assetKey: assetKey,
                                  alt: logo.alt,
                                  fallbackUrl: logo.src || '',
                                  priority: false,
                                  objectFit: 'contain',
                                  sizes:
                                    '(max-width: 640px) 128px, (max-width: 768px) 160px, 192px',
                                  className:
                                    'w-full h-full filter brightness-0 invert opacity-60 transition-all duration-500 group-hover:opacity-100',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/home/clients/ClientsBrandsSection.tsx',
                                  lineNumber: 90,
                                  columnNumber: 19,
                                },
                                this
                              ),
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/clients/ClientsBrandsSection.tsx',
                              lineNumber: 89,
                              columnNumber: 17,
                            },
                            this
                          ),
                        },
                        logo.id,
                        false,
                        {
                          fileName:
                            '[project]/src/components/home/clients/ClientsBrandsSection.tsx',
                          lineNumber: 73,
                          columnNumber: 15,
                        },
                        this
                      );
                    }),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/home/clients/ClientsBrandsSection.tsx',
                    lineNumber: 51,
                    columnNumber: 9,
                  },
                  this
                ),
              ],
            },
            void 0,
            true,
            {
              fileName:
                '[project]/src/components/home/clients/ClientsBrandsSection.tsx',
              lineNumber: 30,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName:
            '[project]/src/components/home/clients/ClientsBrandsSection.tsx',
          lineNumber: 24,
          columnNumber: 5,
        },
        this
      );
    }
    _s(
      ClientsBrandsSection,
      'pxdVCVMh9oiiD9AcAbE6CDnFaOw=',
      false,
      function () {
        return [
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useMotionGate'
          ],
        ];
      }
    );
    _c = ClientsBrandsSection;
    var _c;
    __turbopack_context__.k.register(_c, 'ClientsBrandsSection');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/contact/FormFields.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'InputField',
      () => InputField,
      'TextAreaField',
      () => TextAreaField,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    ('use client');
    const InputField = ({ label, error, id, className = '', ...props }) => {
      const isInvalid = !!error;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'label',
              {
                htmlFor: id,
                className:
                  'block text-[13px] font-bold text-[#111111]/80 mb-2 uppercase tracking-wider',
                children: label,
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/contact/FormFields.tsx',
                lineNumber: 21,
                columnNumber: 7,
              },
              ('TURBOPACK compile-time value', void 0)
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'input',
              {
                id: id,
                'aria-invalid': isInvalid,
                'aria-describedby': error ? `${id}-error` : undefined,
                className: `w-full min-h-[48px] rounded-lg border border-[#111111]/20 bg-[#f8fafc] px-4 py-4 text-[#111111] placeholder:text-[#111111]/50 transition-all outline-none focus:border-bluePrimary focus:ring-2 focus:ring-bluePrimary/20 ${error ? 'border-red-500' : ''} ${className}`,
                ...props,
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/contact/FormFields.tsx',
                lineNumber: 27,
                columnNumber: 7,
              },
              ('TURBOPACK compile-time value', void 0)
            ),
            error &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'p',
                {
                  id: `${id}-error`,
                  className: 'mt-2 text-xs text-red-600 font-bold uppercase',
                  children: error,
                },
                void 0,
                false,
                {
                  fileName:
                    '[project]/src/components/home/contact/FormFields.tsx',
                  lineNumber: 37,
                  columnNumber: 9,
                },
                ('TURBOPACK compile-time value', void 0)
              ),
          ],
        },
        void 0,
        true,
        {
          fileName: '[project]/src/components/home/contact/FormFields.tsx',
          lineNumber: 20,
          columnNumber: 5,
        },
        ('TURBOPACK compile-time value', void 0)
      );
    };
    _c = InputField;
    const TextAreaField = ({ label, error, id, className = '', ...props }) => {
      const isInvalid = !!error;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'label',
              {
                htmlFor: id,
                className:
                  'block text-[13px] font-bold text-[#111111]/80 mb-2 uppercase tracking-wider',
                children: label,
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/contact/FormFields.tsx',
                lineNumber: 64,
                columnNumber: 7,
              },
              ('TURBOPACK compile-time value', void 0)
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'textarea',
              {
                id: id,
                'aria-invalid': isInvalid,
                'aria-describedby': error ? `${id}-error` : undefined,
                className: `w-full resize-none rounded-lg border border-[#111111]/20 bg-[#f8fafc] px-4 py-4 text-[#111111] placeholder:text-[#111111]/50 transition-all outline-none focus:border-bluePrimary focus:ring-2 focus:ring-bluePrimary/20 min-h-[120px] ${error ? 'border-red-500' : ''} ${className}`,
                ...props,
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/contact/FormFields.tsx',
                lineNumber: 70,
                columnNumber: 7,
              },
              ('TURBOPACK compile-time value', void 0)
            ),
            error &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'p',
                {
                  id: `${id}-error`,
                  className: 'mt-2 text-xs text-red-600 font-bold uppercase',
                  children: error,
                },
                void 0,
                false,
                {
                  fileName:
                    '[project]/src/components/home/contact/FormFields.tsx',
                  lineNumber: 80,
                  columnNumber: 9,
                },
                ('TURBOPACK compile-time value', void 0)
              ),
          ],
        },
        void 0,
        true,
        {
          fileName: '[project]/src/components/home/contact/FormFields.tsx',
          lineNumber: 63,
          columnNumber: 5,
        },
        ('TURBOPACK compile-time value', void 0)
      );
    };
    _c1 = TextAreaField;
    var _c, _c1;
    __turbopack_context__.k.register(_c, 'InputField');
    __turbopack_context__.k.register(_c1, 'TextAreaField');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/contact/ContactForm.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      /*#__PURE__*/ __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/motion.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$contact$2f$FormFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/contact/FormFields.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/navigation.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/script.js [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const ContactForm = () => {
      _s();
      const prefersReducedMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      const [formData, setFormData] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])({
        name: '',
        email: '',
        phone: '',
        message: '',
        'cf-turnstile-response': '',
      });
      const [errors, setErrors] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])({});
      const [isSubmitting, setIsSubmitting] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      const [submitSuccess, setSubmitSuccess] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'default'
      ].useEffect(
        {
          'ContactForm.useEffect': () => {
            window.onTurnstileSuccess = {
              'ContactForm.useEffect': (token) => {
                setFormData(
                  {
                    'ContactForm.useEffect': (prev) => ({
                      ...prev,
                      'cf-turnstile-response': token,
                    }),
                  }['ContactForm.useEffect']
                );
              },
            }['ContactForm.useEffect'];
            return {
              'ContactForm.useEffect': () => {
                delete window.onTurnstileSuccess;
              },
            }['ContactForm.useEffect'];
          },
        }['ContactForm.useEffect'],
        []
      );
      const validateField = (name, value) => {
        switch (name) {
          case 'name':
            return value.trim() ? '' : 'Nome é obrigatório';
          case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? '' : 'Email inválido';
          case 'message':
            return value.trim().length >= 10
              ? ''
              : 'Mensagem deve ter pelo menos 10 caracteres';
          default:
            return '';
        }
      };
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        if (errors[name]) {
          setErrors((prev) => {
            const newErrors = {
              ...prev,
            };
            delete newErrors[name];
            return newErrors;
          });
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== 'cf-turnstile-response') {
            const error = validateField(key, value);
            if (error) newErrors[key] = error;
          }
        });
        if (!formData['cf-turnstile-response']) {
          newErrors.submit = 'Por favor, complete a verificação de segurança.';
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
        setIsSubmitting(true);
        try {
          const response = await fetch(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'CONTACT_FORM'
            ].action,
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(formData),
            }
          );
          if (response.ok) {
            setSubmitSuccess(true);
            setFormData({
              name: '',
              email: '',
              phone: '',
              message: '',
              'cf-turnstile-response': '',
            });
            setTimeout(() => setSubmitSuccess(false), 5000);
          } else {
            const payload = await response.json().catch(() => null);
            throw new Error(payload?.message || 'Submission failed');
          }
        } catch (error) {
          setErrors({
            submit:
              error instanceof Error
                ? error.message
                : 'Falha ao enviar mensagem. Por favor tente novamente.',
          });
        } finally {
          setIsSubmitting(false);
        }
      };
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'motion'
        ].div,
        {
          initial: prefersReducedMotion
            ? {}
            : {
                opacity: 0,
                y: 20,
              },
          whileInView: {
            opacity: 1,
            y: 0,
          },
          viewport:
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'viewportConfig'
            ],
          transition: {
            duration: 0.6,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'GHOST_EASE'
            ],
          },
          className:
            'w-full max-w-[640px] mx-auto lg:ml-auto bg-white p-8 md:p-12 rounded-[24px] shadow-sm border border-textInverse/5',
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: 'p-0',
              children: submitSuccess
                ? /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      className: 'text-center py-12',
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className:
                              'inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6',
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'svg',
                              {
                                xmlns: 'http://www.w3.org/2000/svg',
                                className: 'h-10 w-10',
                                fill: 'none',
                                viewBox: '0 0 24 24',
                                stroke: 'currentColor',
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'path',
                                  {
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                    strokeWidth: 2,
                                    d: 'M5 13l4 4L19 7',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/src/components/home/contact/ContactForm.tsx',
                                    lineNumber: 152,
                                    columnNumber: 17,
                                  },
                                  ('TURBOPACK compile-time value', void 0)
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/contact/ContactForm.tsx',
                                lineNumber: 145,
                                columnNumber: 15,
                              },
                              ('TURBOPACK compile-time value', void 0)
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/contact/ContactForm.tsx',
                            lineNumber: 144,
                            columnNumber: 13,
                          },
                          ('TURBOPACK compile-time value', void 0)
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'h3',
                          {
                            className:
                              'text-3xl font-bold text-textInverse mb-4',
                            children: 'Mensagem Enviada!',
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/contact/ContactForm.tsx',
                            lineNumber: 160,
                            columnNumber: 13,
                          },
                          ('TURBOPACK compile-time value', void 0)
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'p',
                          {
                            className: 'text-textInverse/60 text-lg',
                            children:
                              'Obrigado pelo contato. Responderei o mais breve possível.',
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/contact/ContactForm.tsx',
                            lineNumber: 163,
                            columnNumber: 13,
                          },
                          ('TURBOPACK compile-time value', void 0)
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        '[project]/src/components/home/contact/ContactForm.tsx',
                      lineNumber: 143,
                      columnNumber: 11,
                    },
                    ('TURBOPACK compile-time value', void 0)
                  )
                : /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'form',
                    {
                      onSubmit: handleSubmit,
                      action:
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'CONTACT_FORM'
                        ].action,
                      method: 'POST',
                      className: 'space-y-8',
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'default'
                          ],
                          {
                            src: 'https://challenges.cloudflare.com/turnstile/v0/api.js',
                            strategy: 'afterInteractive',
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/contact/ContactForm.tsx',
                            lineNumber: 174,
                            columnNumber: 13,
                          },
                          ('TURBOPACK compile-time value', void 0)
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'noscript',
                          {
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'p',
                              {
                                className:
                                  'p-4 mb-4 text-sm text-amber-800 bg-amber-50 rounded-lg',
                                children:
                                  'JavaScript está desativado. O formulário será enviado via redirecionamento padrão.',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/contact/ContactForm.tsx',
                                lineNumber: 179,
                                columnNumber: 15,
                              },
                              ('TURBOPACK compile-time value', void 0)
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/contact/ContactForm.tsx',
                            lineNumber: 178,
                            columnNumber: 13,
                          },
                          ('TURBOPACK compile-time value', void 0)
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'input',
                          {
                            type: 'hidden',
                            name: '_honey',
                            autoComplete: 'off',
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/contact/ContactForm.tsx',
                            lineNumber: 184,
                            columnNumber: 13,
                          },
                          ('TURBOPACK compile-time value', void 0)
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className: 'grid grid-cols-1 gap-8',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$contact$2f$FormFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'InputField'
                                ],
                                {
                                  label: 'Seu nome',
                                  id: 'name',
                                  name: 'name',
                                  value: formData.name,
                                  onChange: handleChange,
                                  error: errors.name,
                                  required: true,
                                  autoComplete: 'name',
                                  placeholder: 'João da Silva',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/home/contact/ContactForm.tsx',
                                  lineNumber: 187,
                                  columnNumber: 15,
                                },
                                ('TURBOPACK compile-time value', void 0)
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$contact$2f$FormFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'InputField'
                                ],
                                {
                                  label: 'Seu email',
                                  id: 'email',
                                  name: 'email',
                                  type: 'email',
                                  value: formData.email,
                                  onChange: handleChange,
                                  error: errors.email,
                                  required: true,
                                  autoComplete: 'email',
                                  placeholder: 'joao@empresa.com',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/home/contact/ContactForm.tsx',
                                  lineNumber: 199,
                                  columnNumber: 15,
                                },
                                ('TURBOPACK compile-time value', void 0)
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$contact$2f$FormFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'InputField'
                                ],
                                {
                                  label: 'Telefone',
                                  id: 'phone',
                                  name: 'phone',
                                  type: 'tel',
                                  value: formData.phone,
                                  onChange: handleChange,
                                  error: errors.phone,
                                  autoComplete: 'tel',
                                  placeholder: '(11) 99999-9999',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/home/contact/ContactForm.tsx',
                                  lineNumber: 212,
                                  columnNumber: 15,
                                },
                                ('TURBOPACK compile-time value', void 0)
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$contact$2f$FormFields$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'TextAreaField'
                                ],
                                {
                                  label: 'Sua mensagem',
                                  id: 'message',
                                  name: 'message',
                                  value: formData.message,
                                  onChange: handleChange,
                                  error: errors.message,
                                  required: true,
                                  rows: 4,
                                  placeholder: 'Conte-me sobre seu projeto...',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/home/contact/ContactForm.tsx',
                                  lineNumber: 224,
                                  columnNumber: 15,
                                },
                                ('TURBOPACK compile-time value', void 0)
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              '[project]/src/components/home/contact/ContactForm.tsx',
                            lineNumber: 186,
                            columnNumber: 13,
                          },
                          ('TURBOPACK compile-time value', void 0)
                        ),
                        errors.submit &&
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'p',
                            {
                              className:
                                'text-sm text-red-500 font-bold uppercase',
                              children: errors.submit,
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/contact/ContactForm.tsx',
                              lineNumber: 238,
                              columnNumber: 15,
                            },
                            ('TURBOPACK compile-time value', void 0)
                          ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className: 'cf-turnstile',
                            'data-sitekey':
                              ('TURBOPACK compile-time value',
                              '0x4AAAAAACgcpmYImvbq_qQg') ||
                              '1x00000000000000000000AA',
                            'data-callback': 'onTurnstileSuccess',
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/contact/ContactForm.tsx',
                            lineNumber: 243,
                            columnNumber: 13,
                          },
                          ('TURBOPACK compile-time value', void 0)
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'motion'
                          ].button,
                          {
                            type: 'submit',
                            disabled: isSubmitting,
                            whileHover: {
                              y: -2,
                            },
                            whileTap: {
                              y: 1,
                            },
                            transition: {
                              type: 'tween',
                              ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'GHOST_EASE'
                              ],
                              duration: 0.3,
                            },
                            className:
                              'w-full h-[64px] md:h-[72px] flex items-center justify-center gap-3 bg-bluePrimary text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluePrimary focus-visible:ring-offset-2 tracking-tight text-lg shadow-[0_10px_30px_-10px_rgba(0,72,255,0.3)] will-change-transform',
                            children: [
                              isSubmitting ? 'Enviando...' : 'Enviar Mensagem',
                              !isSubmitting &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'svg',
                                  {
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    className: 'h-5 w-5 ml-1',
                                    fill: 'none',
                                    viewBox: '0 0 24 24',
                                    stroke: 'currentColor',
                                    'aria-hidden': 'true',
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'path',
                                      {
                                        strokeLinecap: 'round',
                                        strokeLinejoin: 'round',
                                        strokeWidth: 2,
                                        d: 'M14 5l7 7m0 0l-7 7m7-7H3',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/src/components/home/contact/ContactForm.tsx',
                                        lineNumber: 270,
                                        columnNumber: 19,
                                      },
                                      ('TURBOPACK compile-time value', void 0)
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/src/components/home/contact/ContactForm.tsx',
                                    lineNumber: 262,
                                    columnNumber: 17,
                                  },
                                  ('TURBOPACK compile-time value', void 0)
                                ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              '[project]/src/components/home/contact/ContactForm.tsx',
                            lineNumber: 252,
                            columnNumber: 13,
                          },
                          ('TURBOPACK compile-time value', void 0)
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        '[project]/src/components/home/contact/ContactForm.tsx',
                      lineNumber: 168,
                      columnNumber: 11,
                    },
                    ('TURBOPACK compile-time value', void 0)
                  ),
            },
            void 0,
            false,
            {
              fileName: '[project]/src/components/home/contact/ContactForm.tsx',
              lineNumber: 141,
              columnNumber: 7,
            },
            ('TURBOPACK compile-time value', void 0)
          ),
        },
        void 0,
        false,
        {
          fileName: '[project]/src/components/home/contact/ContactForm.tsx',
          lineNumber: 134,
          columnNumber: 5,
        },
        ('TURBOPACK compile-time value', void 0)
      );
    };
    _s(ContactForm, 'EKH3PtsNlnIvfHlL1d2CFe91yNM=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
      ];
    });
    _c = ContactForm;
    const __TURBOPACK__default__export__ = ContactForm;
    var _c;
    __turbopack_context__.k.register(_c, 'ContactForm');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/lib/utils.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'ASSET_PLACEHOLDER',
      () => ASSET_PLACEHOLDER,
      'applyImageFallback',
      () => applyImageFallback,
      'applyLazyLoading',
      () => applyLazyLoading,
      'clamp',
      () => clamp,
      'cn',
      () => cn,
      'extractYouTubeId',
      () => extractYouTubeId,
      'getAssetUrl',
      () => getAssetUrl,
      'getGhostAssetUrl',
      () => getGhostAssetUrl,
      'getYouTubeEmbedUrl',
      () => getYouTubeEmbedUrl,
      'getYouTubeThumbnailUrl',
      () => getYouTubeThumbnailUrl,
      'isVideo',
      () => isVideo,
      'isYouTubeUrl',
      () => isYouTubeUrl,
      'lerp',
      () => lerp,
      'sanitizeTailwindValue',
      () => sanitizeTailwindValue,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$5$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/tailwind-merge@3.5.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/brand.ts [app-client] (ecmascript)'
      );
    function cn(...inputs) {
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$5$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'twMerge'
      ])(
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'clsx'
        ])(inputs)
      );
    }
    function sanitizeTailwindValue(value) {
      if (!value) return '';
      return value.replace(/[^a-zA-Z0-9\-_#]/g, '');
    }
    const lerp = (start, end, t) => start * (1 - t) + end * t;
    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
    const ASSET_PLACEHOLDER =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    const YOUTUBE_ID_DIRECT_PATTERN = /^[a-zA-Z0-9_-]{11}$/;
    function normalizePath(path) {
      return path
        .replace(/^https?:\/\/[^/]+\/storage\/v1\/object\/public\//, '')
        .replace(/^\/?storage\/v1\/object\/public\//, '')
        .replace(/^\/+/, '');
    }
    function getAssetUrl(path) {
      if (!path) return ASSET_PLACEHOLDER;
      const trimmed = path.trim();
      if (!trimmed) return ASSET_PLACEHOLDER;
      if (/^https?:\/\//.test(trimmed)) return trimmed;
      const normalized = normalizePath(trimmed);
      if (!normalized) return ASSET_PLACEHOLDER;
      return `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__['SUPABASE_STORAGE_URL']}/${normalized}`;
    }
    function applyImageFallback(event) {
      const target = event.currentTarget;
      if (target.dataset.fallbackApplied) return;
      target.dataset.fallbackApplied = 'true';
      target.src = ASSET_PLACEHOLDER;
      target.srcset = '';
    }
    const getGhostAssetUrl = (path) => {
      if (!path) return '/assets/placeholder.webp';
      try {
        // Verifica se é uma URL válida
        if (path.startsWith('http://') || path.startsWith('https://')) {
          return path;
        }
        // Usa a função getAssetUrl existente
        return getAssetUrl(path);
      } catch (error) {
        console.error('Erro ao obter URL do asset:', error);
        return ASSET_PLACEHOLDER;
      }
    };
    const applyLazyLoading = (img) => {
      img.loading = 'lazy';
      img.decoding = 'async';
    };
    const isVideo = (path) => {
      if (!path) return false;
      const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
      const raw = path.trim().toLowerCase();
      if (!raw) return false;
      // Remove query params and hashes for extension check
      const cleanPath = raw.split('?')[0].split('#')[0];
      // If it contains a protocol, use URL parser
      if (cleanPath.includes('://')) {
        try {
          const parsed = new URL(cleanPath);
          return videoExtensions.some((ext) => parsed.pathname.endsWith(ext));
        } catch {
          // Fallback if URL parsing fails
          return videoExtensions.some((ext) => cleanPath.endsWith(ext));
        }
      }
      // Local paths or filenames
      return videoExtensions.some((ext) => cleanPath.endsWith(ext));
    };
    function extractYouTubeId(value) {
      if (!value) return null;
      const candidate = value.trim();
      if (!candidate) return null;
      if (YOUTUBE_ID_DIRECT_PATTERN.test(candidate)) return candidate;
      const withProtocol = candidate.startsWith('http')
        ? candidate
        : `https://${candidate}`;
      try {
        const parsed = new URL(withProtocol);
        const hostname = parsed.hostname;
        if (hostname === 'youtu.be') {
          const id = parsed.pathname.replace('/', '');
          return YOUTUBE_ID_DIRECT_PATTERN.test(id) ? id : null;
        }
        if (hostname === 'youtube.com' || hostname.endsWith('.youtube.com')) {
          const vParam = parsed.searchParams.get('v');
          if (vParam && YOUTUBE_ID_DIRECT_PATTERN.test(vParam)) return vParam;
          const parts = parsed.pathname.split('/').filter(Boolean);
          const embedIndex = parts.findIndex(
            (part) => part === 'embed' || part === 'shorts' || part === 'v'
          );
          if (embedIndex >= 0) {
            const id = parts[embedIndex + 1];
            return id && YOUTUBE_ID_DIRECT_PATTERN.test(id) ? id : null;
          }
        }
      } catch {
        return null;
      }
      return null;
    }
    const isYouTubeUrl = (value) => Boolean(extractYouTubeId(value));
    function getYouTubeEmbedUrl(value) {
      const id = extractYouTubeId(value);
      if (!id) return null;
      const params = new URLSearchParams({
        autoplay: '1',
        mute: '0',
        controls: '1',
        rel: '0',
        modestbranding: '1',
        playsinline: '1',
      });
      return `https://www.youtube.com/embed/${id}?${params.toString()}`;
    }
    function getYouTubeThumbnailUrl(value) {
      const id = extractYouTubeId(value);
      if (!id) return null;
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/layout/Container.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'Container',
      () => Container,
      'StandardGrid',
      () => StandardGrid,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/utils.ts [app-client] (ecmascript)'
      );
    function Container({
      children,
      className,
      as: Component = 'div',
      ...props
    }) {
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        Component,
        {
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'cn'
          ])('std-grid', className),
          ...props,
          children: children,
        },
        void 0,
        false,
        {
          fileName: '[project]/src/components/layout/Container.tsx',
          lineNumber: 16,
          columnNumber: 5,
        },
        this
      );
    }
    _c = Container;
    const StandardGrid = Container;
    var _c;
    __turbopack_context__.k.register(_c, 'Container');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/contact/ContactSection.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => ContactSection]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/motion.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript) <export default as Linkedin>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/brand.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/content.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/navigation.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$contact$2f$ContactForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/contact/ContactForm.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/layout/Container.tsx [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    function ContactSection() {
      _s();
      const reducedMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      const contactLinks = [
        {
          label:
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'SOCIALS'
            ].phone,
          href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__['SOCIALS'].phone.replace(/\D/g, '')}`,
          icon: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__[
              'Phone'
            ],
            {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/home/contact/ContactSection.tsx',
              lineNumber: 30,
              columnNumber: 13,
            },
            this
          ),
          ariaLabel: `Ligar para ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__['SOCIALS'].phone}`,
        },
        {
          label:
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'SOCIALS'
            ].emailPrimary.replace('mailto:', ''),
          href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'SOCIALS'
          ].emailPrimary,
          icon: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__[
              'Mail'
            ],
            {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/home/contact/ContactSection.tsx',
              lineNumber: 36,
              columnNumber: 13,
            },
            this
          ),
          ariaLabel: `Enviar email para ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__['SOCIALS'].emailPrimary.replace('mailto:', '')}`,
        },
        {
          label:
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'SOCIALS'
            ].emailSecondary.replace('mailto:', ''),
          href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'SOCIALS'
          ].emailSecondary,
          icon: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__[
              'Mail'
            ],
            {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/home/contact/ContactSection.tsx',
              lineNumber: 42,
              columnNumber: 13,
            },
            this
          ),
          ariaLabel: `Enviar email para ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__['SOCIALS'].emailSecondary.replace('mailto:', '')}`,
        },
      ];
      const socialLinks = [
        {
          label: 'Instagram',
          href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'SOCIALS'
          ].instagram,
          icon: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__[
              'Instagram'
            ],
            {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/home/contact/ContactSection.tsx',
              lineNumber: 51,
              columnNumber: 13,
            },
            this
          ),
        },
        {
          label: 'Facebook',
          href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'SOCIALS'
          ].facebook,
          icon: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__[
              'Facebook'
            ],
            {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/home/contact/ContactSection.tsx',
              lineNumber: 56,
              columnNumber: 13,
            },
            this
          ),
        },
        {
          label: 'LinkedIn',
          href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'SOCIALS'
          ].linkedin,
          icon: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__[
              'Linkedin'
            ],
            {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/home/contact/ContactSection.tsx',
              lineNumber: 61,
              columnNumber: 13,
            },
            this
          ),
        },
        {
          label: 'Twitter',
          href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'SOCIALS'
          ].twitter,
          icon: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__[
              'Twitter'
            ],
            {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/home/contact/ContactSection.tsx',
              lineNumber: 66,
              columnNumber: 13,
            },
            this
          ),
        },
        {
          label: 'Portfolio',
          href: `https://${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__['BRAND'].domain}`,
          icon: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__[
              'Globe'
            ],
            {
              className: 'h-5 w-5',
              'aria-hidden': 'true',
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/home/contact/ContactSection.tsx',
              lineNumber: 71,
              columnNumber: 13,
            },
            this
          ),
        },
      ];
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'section',
        {
          id: 'contact',
          'data-light-section': true,
          'aria-label': 'Contato',
          className:
            'bg-backgroundLight py-12 sm:py-16 md:py-24 lg:py-32 relative z-10',
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'Container'
            ],
            {
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'lg:hidden text-center mb-10',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'h2',
                        {
                          className:
                            'text-5xl md:text-6xl font-bold text-bluePrimary uppercase tracking-tighter mb-3 leading-[0.95]',
                          children:
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'HOME_CONTENT'
                            ].contact.title,
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/src/components/home/contact/ContactSection.tsx',
                          lineNumber: 85,
                          columnNumber: 11,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'p',
                        {
                          className:
                            'text-textInverse text-lg font-medium max-w-md mx-auto',
                          children:
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'HOME_CONTENT'
                            ].contact.subtitle,
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/src/components/home/contact/ContactSection.tsx',
                          lineNumber: 88,
                          columnNumber: 11,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      '[project]/src/components/home/contact/ContactSection.tsx',
                    lineNumber: 84,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className:
                      'flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-24 items-start',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'motion'
                        ].div,
                        {
                          initial: reducedMotion
                            ? {
                                opacity: 1,
                                y: 0,
                              }
                            : {
                                opacity: 0,
                                y: 24,
                              },
                          whileInView: {
                            opacity: 1,
                            y: 0,
                          },
                          viewport:
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'viewportConfig'
                            ],
                          transition: {
                            duration: 0.6,
                            delay: 0.1,
                          },
                          className:
                            'lg:col-span-5 flex flex-col space-y-10 order-1 lg:order-0',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className:
                                  'hidden lg:block text-center lg:text-left mb-6 lg:mb-10',
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'h2',
                                    {
                                      className:
                                        'text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-bluePrimary uppercase tracking-tighter mb-4 leading-[0.9]',
                                      children:
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'HOME_CONTENT'
                                        ].contact.title,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/src/components/home/contact/ContactSection.tsx',
                                      lineNumber: 106,
                                      columnNumber: 15,
                                    },
                                    this
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'p',
                                    {
                                      className:
                                        'text-textInverse text-lg md:text-xl font-medium max-w-md mx-auto lg:mx-0',
                                      children:
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'HOME_CONTENT'
                                        ].contact.subtitle,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/src/components/home/contact/ContactSection.tsx',
                                      lineNumber: 109,
                                      columnNumber: 15,
                                    },
                                    this
                                  ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  '[project]/src/components/home/contact/ContactSection.tsx',
                                lineNumber: 105,
                                columnNumber: 13,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: 'flex flex-col space-y-6',
                                children: contactLinks.map((link) =>
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'a',
                                    {
                                      href: link.href,
                                      target: link.href.startsWith('http')
                                        ? '_blank'
                                        : undefined,
                                      rel: link.href.startsWith('http')
                                        ? 'noopener noreferrer'
                                        : undefined,
                                      'aria-label': link.ariaLabel,
                                      className:
                                        'flex items-center gap-3 sm:gap-4 group w-fit py-2 active:opacity-80 transition-opacity',
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'span',
                                          {
                                            className:
                                              'flex h-12 w-12 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-transparent border-2 border-bluePrimary text-bluePrimary transition-all duration-200 will-change-transform group-hover:bg-bluePrimary group-hover:text-white group-active:bg-bluePrimary group-active:text-white group-active:translate-y-px',
                                            children: link.icon,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/src/components/home/contact/ContactSection.tsx',
                                            lineNumber: 130,
                                            columnNumber: 19,
                                          },
                                          this
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'span',
                                          {
                                            className:
                                              'text-base sm:text-lg md:text-xl font-semibold text-textInverse transition-all duration-200 group-hover:text-bluePrimary group-hover:underline group-hover:underline-offset-4',
                                            children: link.label,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/src/components/home/contact/ContactSection.tsx',
                                            lineNumber: 133,
                                            columnNumber: 19,
                                          },
                                          this
                                        ),
                                      ],
                                    },
                                    link.href,
                                    true,
                                    {
                                      fileName:
                                        '[project]/src/components/home/contact/ContactSection.tsx',
                                      lineNumber: 117,
                                      columnNumber: 17,
                                    },
                                    this
                                  )
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/contact/ContactSection.tsx',
                                lineNumber: 115,
                                columnNumber: 13,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className:
                                  'hidden lg:flex flex-wrap items-center gap-4 pt-10 border-t border-textInverse/20',
                                children: socialLinks.map((social) =>
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'a',
                                    {
                                      href: social.href,
                                      target: '_blank',
                                      rel: 'noopener noreferrer',
                                      'aria-label': social.label,
                                      className:
                                        'flex h-14 w-14 items-center justify-center rounded-full border border-textInverse/30 bg-transparent text-textInverse transition-all will-change-transform hover:border-bluePrimary hover:bg-bluePrimary hover:text-white hover:-translate-y-0.5',
                                      children: [
                                        social.icon,
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'span',
                                          {
                                            className: 'sr-only',
                                            children: social.label,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/src/components/home/contact/ContactSection.tsx',
                                            lineNumber: 152,
                                            columnNumber: 19,
                                          },
                                          this
                                        ),
                                      ],
                                    },
                                    social.href,
                                    true,
                                    {
                                      fileName:
                                        '[project]/src/components/home/contact/ContactSection.tsx',
                                      lineNumber: 143,
                                      columnNumber: 17,
                                    },
                                    this
                                  )
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/contact/ContactSection.tsx',
                                lineNumber: 141,
                                columnNumber: 13,
                              },
                              this
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            '[project]/src/components/home/contact/ContactSection.tsx',
                          lineNumber: 95,
                          columnNumber: 11,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className:
                            'lg:hidden flex flex-wrap justify-center gap-3 sm:gap-4 py-6 sm:py-8 border-t border-textInverse/20 w-full order-2',
                          children: socialLinks.map((social) =>
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'a',
                              {
                                href: social.href,
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                'aria-label': social.label,
                                className:
                                  'flex h-12 w-12 items-center justify-center rounded-full border-2 border-textInverse/30 bg-transparent text-textInverse shadow-sm transition-all duration-200 will-change-transform active:translate-y-px active:bg-bluePrimary active:border-bluePrimary active:text-white',
                                children: [
                                  social.icon,
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'span',
                                    {
                                      className: 'sr-only',
                                      children: social.label,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/src/components/home/contact/ContactSection.tsx',
                                      lineNumber: 170,
                                      columnNumber: 17,
                                    },
                                    this
                                  ),
                                ],
                              },
                              `mobile-${social.href}`,
                              true,
                              {
                                fileName:
                                  '[project]/src/components/home/contact/ContactSection.tsx',
                                lineNumber: 161,
                                columnNumber: 15,
                              },
                              this
                            )
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/src/components/home/contact/ContactSection.tsx',
                          lineNumber: 159,
                          columnNumber: 11,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'lg:col-span-7 w-full order-3 lg:order-0',
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$contact$2f$ContactForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'default'
                            ],
                            {},
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/contact/ContactSection.tsx',
                              lineNumber: 177,
                              columnNumber: 13,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/src/components/home/contact/ContactSection.tsx',
                          lineNumber: 176,
                          columnNumber: 11,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      '[project]/src/components/home/contact/ContactSection.tsx',
                    lineNumber: 93,
                    columnNumber: 9,
                  },
                  this
                ),
              ],
            },
            void 0,
            true,
            {
              fileName:
                '[project]/src/components/home/contact/ContactSection.tsx',
              lineNumber: 82,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName: '[project]/src/components/home/contact/ContactSection.tsx',
          lineNumber: 76,
          columnNumber: 5,
        },
        this
      );
    }
    _s(ContactSection, 'pxdVCVMh9oiiD9AcAbE6CDnFaOw=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
      ];
    });
    _c = ContactSection;
    var _c;
    __turbopack_context__.k.register(_c, 'ContactSection');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/layout/SiteFooter.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => SiteFooter]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript) <export default as Linkedin>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/navigation.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/navigation.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    function SiteFooter() {
      _s();
      const router = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRouter'
      ])();
      const pathname = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'usePathname'
      ])();
      const handleFooterNavigation = (event, href) => {
        const isHash = href.startsWith('#') || href.startsWith('/#');
        if (!isHash) return;
        const hash = href.startsWith('/#') ? href.slice(1) : href;
        const targetId = hash.replace('#', '');
        const target = document.getElementById(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          return;
        }
        // Quando o link é hash local (#contact) e não existe seção na página atual,
        // cai para home com hash.
        if (href.startsWith('#') && pathname !== '/') {
          event.preventDefault();
          router.push(`/${hash}`);
        }
      };
      const socialLinks = [
        {
          label: 'Instagram',
          href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'SOCIALS'
          ].instagram,
          icon: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__[
              'Instagram'
            ],
            {
              className: 'w-5 h-5 lg:w-4 lg:h-4',
            },
            void 0,
            false,
            {
              fileName: '[project]/src/components/layout/SiteFooter.tsx',
              lineNumber: 49,
              columnNumber: 13,
            },
            this
          ),
        },
        {
          label: 'LinkedIn',
          href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'SOCIALS'
          ].linkedin,
          icon: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__[
              'Linkedin'
            ],
            {
              className: 'w-5 h-5 lg:w-4 lg:h-4',
            },
            void 0,
            false,
            {
              fileName: '[project]/src/components/layout/SiteFooter.tsx',
              lineNumber: 54,
              columnNumber: 13,
            },
            this
          ),
        },
        {
          label: 'Twitter',
          href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'SOCIALS'
          ].twitter,
          icon: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__[
              'Twitter'
            ],
            {
              className: 'w-5 h-5 lg:w-4 lg:h-4',
            },
            void 0,
            false,
            {
              fileName: '[project]/src/components/layout/SiteFooter.tsx',
              lineNumber: 59,
              columnNumber: 13,
            },
            this
          ),
        },
      ];
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'footer',
        {
          className:
            'w-full bg-bluePrimary text-white lg:fixed lg:bottom-0 lg:left-0 lg:z-1000 relative z-1000 footer-safe-area',
          'aria-label': 'Rodapé do site',
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className:
                'std-grid flex flex-col lg:flex-row items-center justify-between py-12 lg:py-6 lg:min-h-20 gap-10 lg:gap-8',
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'order-1 lg:order-0',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'p',
                      {
                        className:
                          'text-[0.875rem] lg:text-[10px] font-medium tracking-[0.05em] uppercase opacity-90 lg:opacity-100 text-center lg:text-left',
                        children:
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'NAVIGATION'
                          ].footer.copyright,
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          '[project]/src/components/layout/SiteFooter.tsx',
                        lineNumber: 71,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/src/components/layout/SiteFooter.tsx',
                    lineNumber: 70,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'nav',
                  {
                    className:
                      'flex flex-row flex-wrap justify-center items-center gap-x-4 gap-y-2 sm:gap-6 lg:gap-8 order-2 lg:order-0 w-full lg:w-auto px-4 lg:px-0',
                    'aria-label': 'Navegação do rodapé',
                    children:
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'NAVIGATION'
                      ].footer.links.map((link) =>
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'default'
                          ],
                          {
                            href: link.href,
                            onClick: (event) =>
                              handleFooterNavigation(event, link.href),
                            className:
                              'group relative text-[11px] sm:text-[12px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200 py-3 lg:py-2 flex items-center shrink-0',
                            children: [
                              link.label,
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'span',
                                {
                                  className:
                                    'absolute bottom-[-2px] left-0 w-0 h-px bg-white transition-all duration-200 ease-out group-hover:w-full hidden lg:block',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/layout/SiteFooter.tsx',
                                  lineNumber: 90,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            ],
                          },
                          link.label,
                          true,
                          {
                            fileName:
                              '[project]/src/components/layout/SiteFooter.tsx',
                            lineNumber: 82,
                            columnNumber: 13,
                          },
                          this
                        )
                      ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/src/components/layout/SiteFooter.tsx',
                    lineNumber: 77,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className:
                      'flex flex-row items-center justify-center gap-4 order-3 lg:order-0',
                    'aria-label': 'Redes sociais',
                    children: socialLinks.map((social) =>
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'a',
                        {
                          href: social.href,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          className:
                            'transition-transform duration-200 opacity-100 lg:opacity-90 lg:hover:opacity-100 p-3 lg:p-0 flex items-center justify-center min-w-[48px] min-h-[48px] lg:min-w-0 lg:min-h-0 hover:-translate-y-0.5 will-change-transform',
                          'aria-label': social.label,
                          children: [
                            social.icon,
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'span',
                              {
                                className: 'sr-only',
                                children: social.label,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/layout/SiteFooter.tsx',
                                lineNumber: 110,
                                columnNumber: 15,
                              },
                              this
                            ),
                          ],
                        },
                        social.label,
                        true,
                        {
                          fileName:
                            '[project]/src/components/layout/SiteFooter.tsx',
                          lineNumber: 101,
                          columnNumber: 13,
                        },
                        this
                      )
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/src/components/layout/SiteFooter.tsx',
                    lineNumber: 96,
                    columnNumber: 9,
                  },
                  this
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/src/components/layout/SiteFooter.tsx',
              lineNumber: 68,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName: '[project]/src/components/layout/SiteFooter.tsx',
          lineNumber: 64,
          columnNumber: 5,
        },
        this
      );
    }
    _s(SiteFooter, 'gA9e4WsoP6a20xDgQgrFkfMP8lc=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useRouter'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'usePathname'
        ],
      ];
    });
    _c = SiteFooter;
    var _c;
    __turbopack_context__.k.register(_c, 'SiteFooter');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/layout/SiteClosure.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['SiteClosure', () => SiteClosure]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$clients$2f$ClientsBrandsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/clients/ClientsBrandsSection.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$contact$2f$ContactSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/contact/ContactSection.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SiteFooter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/layout/SiteFooter.tsx [app-client] (ecmascript)'
      );
    ('use client');
    function SiteClosure() {
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'Fragment'
        ],
        {
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$clients$2f$ClientsBrandsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'default'
              ],
              {},
              void 0,
              false,
              {
                fileName: '[project]/src/components/layout/SiteClosure.tsx',
                lineNumber: 21,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$contact$2f$ContactSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'default'
              ],
              {},
              void 0,
              false,
              {
                fileName: '[project]/src/components/layout/SiteClosure.tsx',
                lineNumber: 22,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$SiteFooter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'default'
              ],
              {},
              void 0,
              false,
              {
                fileName: '[project]/src/components/layout/SiteClosure.tsx',
                lineNumber: 23,
                columnNumber: 7,
              },
              this
            ),
          ],
        },
        void 0,
        true
      );
    }
    _c = SiteClosure;
    var _c;
    __turbopack_context__.k.register(_c, 'SiteClosure');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/lib/portfolio/home-featured.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'DEFAULT_HOME_FEATURED_CARD_STYLE',
      () => DEFAULT_HOME_FEATURED_CARD_STYLE,
      'HOME_FEATURED_CARD_STYLE_OPTIONS',
      () => HOME_FEATURED_CARD_STYLE_OPTIONS,
      'isHomeFeaturedCardStyle',
      () => isHomeFeaturedCardStyle,
      'normalizeHomeFeaturedConfig',
      () => normalizeHomeFeaturedConfig,
      'resolveHomeFeaturedConfig',
      () => resolveHomeFeaturedConfig,
    ]);
    const HOME_FEATURED_CARD_STYLE_OPTIONS = [
      'ANIMATED_BG_INVERTED_LOGO',
      'ANIMATED_BG_THUMB_OVERLAY_50',
    ];
    const DEFAULT_HOME_FEATURED_CARD_STYLE = 'ANIMATED_BG_THUMB_OVERLAY_50';
    const isRecord = (value) =>
      typeof value === 'object' && value !== null && !Array.isArray(value);
    function isHomeFeaturedCardStyle(value) {
      return (
        typeof value === 'string' &&
        HOME_FEATURED_CARD_STYLE_OPTIONS.includes(value)
      );
    }
    function normalizeHomeFeaturedConfig(value, fallbackEnabled = false) {
      const input = isRecord(value) ? value : null;
      const rawLogoPath =
        typeof input?.logoPath === 'string' ? input.logoPath.trim() : '';
      return {
        enabled:
          typeof input?.enabled === 'boolean' ? input.enabled : fallbackEnabled,
        cardStyle: isHomeFeaturedCardStyle(input?.cardStyle)
          ? input.cardStyle
          : DEFAULT_HOME_FEATURED_CARD_STYLE,
        logoPath: rawLogoPath || null,
      };
    }
    function resolveHomeFeaturedConfig(value, fallbackEnabled = false) {
      const normalized = normalizeHomeFeaturedConfig(value, fallbackEnabled);
      if (
        normalized.cardStyle === 'ANIMATED_BG_INVERTED_LOGO' &&
        !normalized.logoPath
      ) {
        return {
          ...normalized,
          cardStyle: DEFAULT_HOME_FEATURED_CARD_STYLE,
        };
      }
      return normalized;
    }
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/lib/portfolio/project-mappers.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'mapDbProjectToPortfolioProject',
      () => mapDbProjectToPortfolioProject,
      'mapStaticProjectToPortfolioProject',
      () => mapStaticProjectToPortfolioProject,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/supabase/urls.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2f$home$2d$featured$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/portfolio/home-featured.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/utils.ts [app-client] (ecmascript)'
      );
    const CATEGORY_MAP = {
      'Brand & Campaigns': 'branding',
      'Videos & Motions': 'motion',
      'Websites & Tech': 'web',
      // keep legacy matches for old entries temporarily
      'Branding & Identity': 'branding',
      'Campanhas & Advertising': 'branding',
      'Web & Digital': 'web',
      'Motion & Video': 'motion',
      'Institucional & Retail': 'branding',
      Campanha: 'branding',
      Branding: 'branding',
      Packaging: 'branding',
    };
    const ACCENT_COLOR_MAP = {
      branding: '#0057ff',
      campanha: '#ff3366',
      web: '#4fe6ff',
      motion: '#8705f2',
      institucional: '#00a868',
      packaging: '#ffd700',
      all: '#ffffff',
      'Landing Page': '#6366f1',
    };
    const LOCAL_PUBLIC_ASSET_PATTERN =
      /^\/(site\.assets|images|videos|fonts|captions)\//i;
    const STORAGE_PUBLIC_PATH_PATTERN =
      /^\/?storage\/v1\/object\/public\/([^/]+)\/(.+)$/i;
    const EXPLICIT_BUCKET_PATTERN = /^(site-assets|portfolio-media)\/(.+)$/i;
    const uniqueStrings = (values) => {
      const seen = new Set();
      return values.filter((value) => {
        const normalized = value.trim();
        if (!normalized || seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
      });
    };
    function getProjectCategory(projectType) {
      if (!projectType) return 'branding';
      const normalized = projectType.trim();
      return CATEGORY_MAP[normalized] ?? 'branding';
    }
    function determineProjectType(project) {
      // Conforme o Protótipo Interativo 3.2:
      // Tipo A (Zoom): Para projetos simples (uma imagem principal)
      // Tipo B (Case): Para projetos complexos (gallery ou descrição longa)
      const hasGallery =
        'gallery' in project &&
        Array.isArray(project.gallery) &&
        project.gallery.length > 0;
      const description =
        'description' in project ? project.description : project.title;
      const isComplex = hasGallery || (description && description.length > 200);
      return isComplex ? 'B' : 'A';
    }
    function applyPreferredSize(preferred) {
      if (!preferred) return null;
      const base = {
        height: 'min-h-[320px]',
        aspectRatio: 'aspect-[4/5]',
      };
      switch (preferred) {
        case 'sm':
        case 'md':
          return {
            ...base,
            cols: 'md:col-span-4 lg:col-span-4',
            sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
            size: preferred,
          };
        case 'lg':
          return {
            ...base,
            cols: 'md:col-span-6 lg:col-span-8',
            sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 66vw',
            size: 'lg',
          };
        case 'wide':
          return {
            ...base,
            cols: 'md:col-span-8 lg:col-span-12',
            sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 100vw',
            size: 'wide',
          };
        default:
          return null;
      }
    }
    function buildLayout(_projectType, index, preferredSize) {
      // Preferred size from admin has priority.
      const override = applyPreferredSize(preferredSize);
      if (override) return override;
      const automaticLayouts = [
        // 2 cards row: 8 + 4
        {
          cols: 'md:col-span-8 lg:col-span-8',
          height: 'min-h-[320px]',
          aspectRatio: 'aspect-[4/5]',
          sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw',
          size: 'lg',
        },
        {
          cols: 'md:col-span-4 lg:col-span-4',
          height: 'min-h-[320px]',
          aspectRatio: 'aspect-[4/5]',
          sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
          size: 'sm',
        },
        // 3 cards row: 4 + 4 + 4
        {
          cols: 'md:col-span-4 lg:col-span-4',
          height: 'min-h-[320px]',
          aspectRatio: 'aspect-[4/5]',
          sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
          size: 'sm',
        },
        {
          cols: 'md:col-span-4 lg:col-span-4',
          height: 'min-h-[320px]',
          aspectRatio: 'aspect-[4/5]',
          sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
          size: 'sm',
        },
        {
          cols: 'md:col-span-4 lg:col-span-4',
          height: 'min-h-[320px]',
          aspectRatio: 'aspect-[4/5]',
          sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
          size: 'sm',
        },
        // Additional editorial rhythm
        {
          cols: 'md:col-span-8 lg:col-span-8',
          height: 'min-h-[320px]',
          aspectRatio: 'aspect-[4/5]',
          sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw',
          size: 'lg',
        },
        {
          cols: 'md:col-span-4 lg:col-span-4',
          height: 'min-h-[320px]',
          aspectRatio: 'aspect-[4/5]',
          sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
          size: 'sm',
        },
        {
          cols: 'md:col-span-8 lg:col-span-12',
          height: 'min-h-[320px]',
          aspectRatio: 'aspect-[16/7]',
          sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 100vw',
          size: 'wide',
        },
      ];
      return automaticLayouts[index % automaticLayouts.length];
    }
    function toTagsList(tags) {
      if (!tags) return [];
      if (typeof tags[0] === 'string') {
        return uniqueStrings(tags);
      }
      const extracted =
        tags
          ?.map((entry) => entry?.tag?.label ?? entry?.tag?.slug)
          .filter(Boolean)
          .map((value) => value) ?? [];
      return uniqueStrings(extracted);
    }
    function createGallery(project) {
      const entries = project.gallery ?? [];
      const media = entries
        .filter((entry) => !!entry)
        .map((entry) => {
          if (entry.type === 'youtube' && entry.youtube_video_id) {
            return `https://www.youtube.com/watch?v=${entry.youtube_video_id}`;
          }
          return resolveProjectMedia(entry.path);
        })
        .filter((url) => !!url);
      return uniqueStrings(media);
    }
    function toVideoPreview(galleryUrls) {
      return (
        galleryUrls.find((url) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'isVideo'
          ])(url)
        ) ?? undefined
      );
    }
    function toShortDescription(description, fallback) {
      const normalized = description?.trim();
      if (normalized) return normalized.slice(0, 180);
      const fallbackNormalized = fallback?.trim();
      return fallbackNormalized ? fallbackNormalized.slice(0, 180) : undefined;
    }
    function getPortfolioPillarLabel(category) {
      if (category === 'motion') return 'Videos & Motions';
      if (category === 'web' || category === 'Landing Page') {
        return 'Websites & Tech';
      }
      return 'Brand & Campaigns';
    }
    function appendYouTubeMedia(gallery, candidate) {
      const normalized = candidate?.trim();
      if (
        !normalized ||
        !(0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'isYouTubeUrl'
        ])(normalized)
      ) {
        return gallery;
      }
      return uniqueStrings([...gallery, normalized]);
    }
    function inferProjectDestination({ landingSlug }) {
      const normalizedLandingSlug = landingSlug?.trim();
      if (normalizedLandingSlug) {
        return {
          type: 'internal_landing',
          landingSlug: normalizedLandingSlug,
        };
      }
      return {
        type: 'modal',
      };
    }
    function resolveProjectMedia(path) {
      if (!path) return undefined;
      const raw = path.trim();
      if (!raw) return undefined;
      if (
        raw.startsWith('http://') ||
        raw.startsWith('https://') ||
        raw.startsWith('blob:') ||
        raw.startsWith('data:')
      ) {
        return raw;
      }
      if (raw.startsWith('#') || LOCAL_PUBLIC_ASSET_PATTERN.test(raw)) {
        return raw;
      }
      const storageMatch = raw.match(STORAGE_PUBLIC_PATH_PATTERN);
      if (storageMatch) {
        const [, bucket, bucketPath] = storageMatch;
        return (
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'buildSupabaseStorageUrl'
          ])(bucket, bucketPath) ?? undefined
        );
      }
      const noLeadingSlash = raw.replace(/^\/+/, '');
      const explicitBucketMatch = noLeadingSlash.match(EXPLICIT_BUCKET_PATTERN);
      if (explicitBucketMatch) {
        const [, bucket, bucketPath] = explicitBucketMatch;
        return (
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'buildSupabaseStorageUrl'
          ])(bucket.toLowerCase(), bucketPath) ?? undefined
        );
      }
      const normalizedPath =
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'normalizeStoragePath'
        ])(noLeadingSlash) ?? noLeadingSlash;
      // Known site-level prefixes that belong in the site-assets bucket.
      // Everything else (brand folders, project folders, etc.) goes to portfolio-media.
      const SITE_ASSET_PREFIXES = [
        'about/',
        'clients/',
        'global/',
        'home/',
        'landing-pages/',
      ];
      const isSiteAsset = SITE_ASSET_PREFIXES.some((prefix) =>
        normalizedPath.startsWith(prefix)
      );
      const inferredBucket = isSiteAsset ? 'site-assets' : 'portfolio-media';
      return (
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'buildSupabaseStorageUrl'
        ])(inferredBucket, normalizedPath) ?? undefined
      );
    }
    function mapDbProjectToPortfolioProject(project, index) {
      const normalizedSlug = project.slug?.replace(/_/g, '-');
      const relationLandingSlug = project.landing_page?.slug ?? null;
      const landingSlugSource =
        project.landing_page_slug ?? relationLandingSlug;
      const normalizedLandingSlug = landingSlugSource?.replace(/_/g, '-');
      const type = determineProjectType(project);
      const layout = buildLayout(type, index);
      const category = getProjectCategory(project.project_type);
      const tags = toTagsList(project.tags);
      const gallery = createGallery(project);
      const rawProjectLink = project.link ?? project.external_url ?? null;
      const galleryWithYoutube = appendYouTubeMedia(gallery, rawProjectLink);
      const landscapeUrl = resolveProjectMedia(project.url_landscape);
      const squareUrl = resolveProjectMedia(project.url_square);
      const thumbnailMedia =
        resolveProjectMedia(project.thumbnail_path) ||
        resolveProjectMedia(project.hero_image_path);
      const thumbnailIsVideo = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'isVideo'
      ])(thumbnailMedia);
      // Dedicated static hero fallback (never a video)
      const heroImageUrl = !(0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'isVideo'
      ])(project.hero_image_path)
        ? resolveProjectMedia(project.hero_image_path)
        : undefined;
      const primaryImageCandidates = [
        !thumbnailIsVideo ? thumbnailMedia : undefined,
        landscapeUrl,
        squareUrl,
        heroImageUrl,
        // Filter gallery to only include non-video entries
        ...gallery.filter(
          (url) =>
            !(0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'isVideo'
            ])(url)
        ),
      ].filter(Boolean);
      const primaryImage = primaryImageCandidates[0] || '';
      const videoPreview = thumbnailIsVideo
        ? thumbnailMedia
        : toVideoPreview(gallery);
      const detail = {
        description: project.description ?? '',
        highlights: tags.length ? tags.slice(0, 4) : undefined,
        gallery: galleryWithYoutube,
      };
      const destination = inferProjectDestination({
        landingSlug: normalizedLandingSlug ?? landingSlugSource,
      });
      return {
        id: project.id,
        slug: normalizedSlug ?? project.slug,
        title: project.title,
        subtitle: project.short_label ?? project.client_name,
        shortDescription: toShortDescription(
          project.description,
          project.short_label
        ),
        client: project.client_name,
        category,
        displayCategory: getPortfolioPillarLabel(category),
        tags,
        year: project.year ?? 0,
        image: primaryImage,
        imageLandscape: landscapeUrl,
        imageSquare: squareUrl,
        thumbnailMedia: thumbnailMedia ?? undefined,
        type,
        layout,
        detail,
        accentColor: ACCENT_COLOR_MAP[category] ?? undefined,
        isFeatured: project.featured_on_home || project.featured_on_portfolio,
        featuredOnHome: project.featured_on_home,
        featuredOnPortfolio: project.featured_on_portfolio,
        homeFeatured: (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2f$home$2d$featured$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'normalizeHomeFeaturedConfig'
        ])(project.home_featured, project.featured_on_home),
        videoPreview,
        landingPageSlug: normalizedLandingSlug ?? landingSlugSource,
        destination,
        caseBody: project.case_body ?? null,
      };
    }
    function mapStaticProjectToPortfolioProject(project, index) {
      const normalizedSlug = project.slug?.replace(/_/g, '-');
      const type = determineProjectType(project);
      const layout = buildLayout(type, index);
      const category = getProjectCategory(project.category);
      const tags = toTagsList(project.tags);
      const detail = {
        description: project.description ?? project.title,
        highlights: tags.slice(0, 4),
        gallery: appendYouTubeMedia(
          project.img ? [project.img] : [],
          project.link
        ),
      };
      const normalizedLandingSlug = project.landingPageSlug?.replace(/_/g, '-');
      const destination = inferProjectDestination({
        landingSlug: normalizedLandingSlug ?? project.landingPageSlug,
      });
      return {
        id: `static-${project.id}`,
        slug: normalizedSlug ?? project.slug,
        title: project.title,
        subtitle: project.client,
        shortDescription: toShortDescription(
          project.description,
          project.client
        ),
        client: project.client,
        category,
        displayCategory: getPortfolioPillarLabel(category),
        tags,
        year: project.year,
        image: project.img || '',
        imageLandscape: project.img || undefined,
        imageSquare: project.img || undefined,
        thumbnailMedia: project.img || undefined,
        type,
        layout,
        detail,
        accentColor: ACCENT_COLOR_MAP[category] ?? undefined,
        isFeatured: true,
        featuredOnHome: true,
        featuredOnPortfolio: true,
        homeFeatured: (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2f$home$2d$featured$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'normalizeHomeFeaturedConfig'
        ])(project.homeFeatured, true),
        videoPreview: undefined,
        landingPageSlug: normalizedLandingSlug ?? project.landingPageSlug,
        link: project.link,
        destination,
      };
    }
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/hooks/usePrefersReducedMotion.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'usePrefersReducedMotion',
      () => usePrefersReducedMotion,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    function usePrefersReducedMotion() {
      _s();
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
    }
    _s(
      usePrefersReducedMotion,
      'LYUSFdJBvBS2q/NhhYwDlftzut8=',
      false,
      function () {
        return [
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useMotionGate'
          ],
        ];
      }
    );
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/hooks/useWebGLSupport.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useWebGLSupport', () => useWebGLSupport]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    const checkWebGLSupport = () => {
      if (('TURBOPACK compile-time falsy', 0)) //TURBOPACK unreachable
      ;
      try {
        const canvas = document.createElement('canvas');
        return Boolean(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };
    const useWebGLSupport = () => {
      _s();
      const [supportsWebGL, setSupportsWebGL] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(null);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'useWebGLSupport.useEffect': () => {
            setSupportsWebGL(checkWebGLSupport());
          },
        }['useWebGLSupport.useEffect'],
        []
      );
      // Return false during SSR to prevent hydration mismatch
      // Returns actual support status after hydration
      return supportsWebGL === true;
    };
    _s(useWebGLSupport, 'pzimYw1sOu4GuBSnhkuex9Li/fc=');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'default',
      () => FeaturedProjectAnimatedBackground,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/utils.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/usePrefersReducedMotion.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebGLSupport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useWebGLSupport.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature(),
      _s1 = __turbopack_context__.k.signature();
    ('use client');
    const Grainient = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
      'default'
    ])(
      () =>
        __turbopack_context__.A(
          '[project]/src/components/ui/backgrounds/Grainient.tsx [app-client] (ecmascript, next/dynamic entry, async loader)'
        ),
      {
        loadableGenerated: {
          modules: [
            '[project]/src/components/ui/backgrounds/Grainient.tsx [app-client] (ecmascript, next/dynamic entry)',
          ],
        },
        ssr: false,
      }
    );
    _c = Grainient;
    const GhostCursor = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
      'default'
    ])(
      () =>
        __turbopack_context__.A(
          '[project]/src/components/ui/backgrounds/GhostCursor.tsx [app-client] (ecmascript, next/dynamic entry, async loader)'
        ),
      {
        loadableGenerated: {
          modules: [
            '[project]/src/components/ui/backgrounds/GhostCursor.tsx [app-client] (ecmascript, next/dynamic entry)',
          ],
        },
        ssr: false,
      }
    );
    _c1 = GhostCursor;
    const Aurora = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
      'default'
    ])(
      () =>
        __turbopack_context__.A(
          '[project]/src/components/ui/backgrounds/Aurora.tsx [app-client] (ecmascript, next/dynamic entry, async loader)'
        ),
      {
        loadableGenerated: {
          modules: [
            '[project]/src/components/ui/backgrounds/Aurora.tsx [app-client] (ecmascript, next/dynamic entry)',
          ],
        },
        ssr: false,
      }
    );
    _c2 = Aurora;
    const SURFACE_BY_VARIANT = {
      grainient:
        'bg-[linear-gradient(145deg,rgba(4,0,19,1)_0%,rgba(135,5,242,0.62)_45%,rgba(0,72,255,0.9)_100%)]',
      ghost:
        'bg-[radial-gradient(circle_at_50%_44%,rgba(135,5,242,0.24),transparent_34%),radial-gradient(circle_at_50%_55%,rgba(79,230,255,0.16),transparent_62%),linear-gradient(160deg,rgba(4,0,19,1)_0%,rgba(11,13,58,1)_100%)]',
      aurora:
        'bg-[linear-gradient(180deg,rgba(4,0,19,0.94)_0%,rgba(0,72,255,0.62)_48%,rgba(135,5,242,0.72)_100%)]',
    };
    function useAnimatedBackgroundVisibility(disabled) {
      _s();
      const containerRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const [isInView, setIsInView] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      const [isDocumentVisible, setIsDocumentVisible] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(true);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'useAnimatedBackgroundVisibility.useEffect': () => {
            if (disabled) {
              setIsInView(false);
              return;
            }
            const node = containerRef.current;
            if (!node) return;
            const observer = new IntersectionObserver(
              {
                'useAnimatedBackgroundVisibility.useEffect': ([entry]) => {
                  setIsInView(
                    entry.isIntersecting && entry.intersectionRatio > 0.08
                  );
                },
              }['useAnimatedBackgroundVisibility.useEffect'],
              {
                threshold: [0, 0.08, 0.2],
              }
            );
            observer.observe(node);
            return {
              'useAnimatedBackgroundVisibility.useEffect': () =>
                observer.disconnect(),
            }['useAnimatedBackgroundVisibility.useEffect'];
          },
        }['useAnimatedBackgroundVisibility.useEffect'],
        [disabled]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'useAnimatedBackgroundVisibility.useEffect': () => {
            if (disabled) {
              setIsDocumentVisible(false);
              return;
            }
            const handleVisibilityChange = {
              'useAnimatedBackgroundVisibility.useEffect.handleVisibilityChange':
                () => {
                  setIsDocumentVisible(!document.hidden);
                },
            }[
              'useAnimatedBackgroundVisibility.useEffect.handleVisibilityChange'
            ];
            handleVisibilityChange();
            document.addEventListener(
              'visibilitychange',
              handleVisibilityChange
            );
            return {
              'useAnimatedBackgroundVisibility.useEffect': () => {
                document.removeEventListener(
                  'visibilitychange',
                  handleVisibilityChange
                );
              },
            }['useAnimatedBackgroundVisibility.useEffect'];
          },
        }['useAnimatedBackgroundVisibility.useEffect'],
        [disabled]
      );
      return {
        containerRef,
        shouldAnimate: !disabled && isInView && isDocumentVisible,
      };
    }
    _s(useAnimatedBackgroundVisibility, 'SZrd9HaMIljnz0OmlouWloaRVvI=');
    function FeaturedProjectAnimatedBackground({ variant, className }) {
      _s1();
      const reducedMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'usePrefersReducedMotion'
      ])();
      const supportsWebGL = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebGLSupport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useWebGLSupport'
      ])();
      const { containerRef, shouldAnimate } = useAnimatedBackgroundVisibility(
        reducedMotion || !supportsWebGL
      );
      const surface = SURFACE_BY_VARIANT[variant];
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          ref: containerRef,
          'aria-hidden': 'true',
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'cn'
          ])('absolute inset-0 overflow-hidden pointer-events-none', className),
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])('absolute inset-0', surface),
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx',
                lineNumber: 113,
                columnNumber: 7,
              },
              this
            ),
            shouldAnimate
              ? /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'absolute inset-0 opacity-90',
                    children: [
                      variant === 'grainient'
                        ? /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            Grainient,
                            {
                              className: 'h-full w-full',
                              maxDevicePixelRatio: 1.25,
                              color1: '#0048ff',
                              color2: '#8705f2',
                              color3: '#9bc5fd',
                              timeSpeed: 2.5,
                              colorBalance: 0.18,
                              warpStrength: 1,
                              warpFrequency: 5,
                              warpSpeed: 2,
                              warpAmplitude: 50,
                              blendAngle: 0,
                              blendSoftness: 0.05,
                              rotationAmount: 500,
                              noiseScale: 2,
                              grainAmount: 0.1,
                              grainScale: 2,
                              grainAnimated: false,
                              contrast: 1.5,
                              gamma: 1,
                              saturation: 1,
                              centerX: 0,
                              centerY: 0,
                              zoom: 0.9,
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx',
                              lineNumber: 117,
                              columnNumber: 13,
                            },
                            this
                          )
                        : null,
                      variant === 'ghost'
                        ? /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            GhostCursor,
                            {
                              className: 'absolute inset-0',
                              color: '#8705f2',
                              brightness: 2,
                              edgeIntensity: 0,
                              trailLength: 50,
                              inertia: 0.5,
                              grainIntensity: 0.05,
                              bloomStrength: 0.1,
                              bloomRadius: 1,
                              bloomThreshold: 0.025,
                              fadeDelayMs: 1000,
                              fadeDurationMs: 1500,
                              maxDevicePixelRatio: 0.65,
                              targetPixels: 180000,
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx',
                              lineNumber: 146,
                              columnNumber: 13,
                            },
                            this
                          )
                        : null,
                      variant === 'aurora'
                        ? /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            Aurora,
                            {
                              className: 'h-full w-full',
                              maxDevicePixelRatio: 1.1,
                              colorStops: ['#b301f4', '#0048ff', '#8705f2'],
                              amplitude: 1.0,
                              blend: 0.5,
                              speed: 1,
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx',
                              lineNumber: 165,
                              columnNumber: 13,
                            },
                            this
                          )
                        : null,
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      '[project]/src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx',
                    lineNumber: 115,
                    columnNumber: 9,
                  },
                  this
                )
              : null,
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className:
                  'absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(135,5,242,0.12),transparent_70%)] opacity-70',
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx',
                lineNumber: 177,
                columnNumber: 7,
              },
              this
            ),
          ],
        },
        void 0,
        true,
        {
          fileName:
            '[project]/src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx',
          lineNumber: 105,
          columnNumber: 5,
        },
        this
      );
    }
    _s1(
      FeaturedProjectAnimatedBackground,
      'LBiRwuVfxRofq++1oUseWCoMDII=',
      false,
      function () {
        return [
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePrefersReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'usePrefersReducedMotion'
          ],
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebGLSupport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useWebGLSupport'
          ],
          useAnimatedBackgroundVisibility,
        ];
      }
    );
    _c3 = FeaturedProjectAnimatedBackground;
    var _c, _c1, _c2, _c3;
    __turbopack_context__.k.register(_c, 'Grainient');
    __turbopack_context__.k.register(_c1, 'GhostCursor');
    __turbopack_context__.k.register(_c2, 'Aurora');
    __turbopack_context__.k.register(_c3, 'FeaturedProjectAnimatedBackground');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => FeaturedProjectCardFrame]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/image.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$FeaturedProjectAnimatedBackground$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2f$home$2d$featured$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/portfolio/home-featured.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/utils.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    function FeaturedProjectCardFrame({
      project,
      backgroundVariant,
      mediaSource,
      priority = false,
      reducedMotion,
    }) {
      _s();
      const visualRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const [logoFailed, setLogoFailed] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      const homeFeatured = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2f$home$2d$featured$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'resolveHomeFeaturedConfig'
      ])(project.homeFeatured, project.featuredOnHome ?? project.isFeatured);
      const logoSrc = homeFeatured.logoPath
        ? (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'getAssetUrl'
          ])(homeFeatured.logoPath)
        : null;
      const showLogo =
        homeFeatured.cardStyle === 'ANIMATED_BG_INVERTED_LOGO' &&
        !!logoSrc &&
        !logoFailed;
      const showThumb = !showLogo && !!mediaSource;
      const handlePointerMove = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ])(
        {
          'FeaturedProjectCardFrame.useCallback[handlePointerMove]': (
            event
          ) => {
            if (reducedMotion || !visualRef.current) return;
            if (event.pointerType && event.pointerType !== 'mouse') return;
            const rect = event.currentTarget.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
            const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
            visualRef.current.style.setProperty(
              '--featured-card-x',
              `${(offsetX * 12).toFixed(2)}px`
            );
            visualRef.current.style.setProperty(
              '--featured-card-y',
              `${(offsetY * 10).toFixed(2)}px`
            );
          },
        }['FeaturedProjectCardFrame.useCallback[handlePointerMove]'],
        [reducedMotion]
      );
      const resetPointerMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ])(
        {
          'FeaturedProjectCardFrame.useCallback[resetPointerMotion]': () => {
            if (!visualRef.current) return;
            visualRef.current.style.setProperty('--featured-card-x', '0px');
            visualRef.current.style.setProperty('--featured-card-y', '0px');
          },
        }['FeaturedProjectCardFrame.useCallback[resetPointerMotion]'],
        []
      );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'cn'
          ])(
            'card-shell relative isolate overflow-hidden rounded-md border border-white/10 bg-white/[0.03] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            reducedMotion
              ? ''
              : 'md:group-hover:-translate-y-px md:group-hover:border-white/20 md:group-hover:shadow-[0_28px_84px_-28px_rgba(135,5,242,0.55)]'
          ),
          onPointerMove: handlePointerMove,
          onPointerLeave: resetPointerMotion,
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                ref: visualRef,
                className:
                  'absolute -inset-[4%] will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] featured-card-visual',
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$FeaturedProjectAnimatedBackground$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'default'
                    ],
                    {
                      variant: backgroundVariant,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                      lineNumber: 87,
                      columnNumber: 9,
                    },
                    this
                  ),
                  showThumb
                    ? /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'absolute inset-0',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'default'
                              ],
                              {
                                src: mediaSource,
                                alt: '',
                                'aria-hidden': 'true',
                                fill: true,
                                sizes: project.layout.sizes ?? '100vw',
                                className:
                                  'object-cover opacity-55 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:-translate-y-px md:group-hover:opacity-68',
                                loading: priority ? 'eager' : 'lazy',
                                priority: priority,
                                onError:
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'applyImageFallback'
                                  ],
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                                lineNumber: 91,
                                columnNumber: 13,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: 'absolute inset-0 bg-[#040013]/80',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                                lineNumber: 102,
                                columnNumber: 13,
                              },
                              this
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                          lineNumber: 90,
                          columnNumber: 11,
                        },
                        this
                      )
                    : null,
                ],
              },
              void 0,
              true,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                lineNumber: 83,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className:
                  'absolute inset-0 bg-[linear-gradient(180deg,rgba(4,0,19,0.08)_0%,rgba(4,0,19,0.2)_52%,rgba(4,0,19,0.5)_100%)]',
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                lineNumber: 107,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className:
                  'absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(135,5,242,0.12),transparent_72%)] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:opacity-100',
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                lineNumber: 108,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className:
                  "absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]",
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                lineNumber: 109,
                columnNumber: 7,
              },
              this
            ),
            showLogo
              ? /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className:
                      'absolute inset-0 z-[var(--z-layer-content)] flex items-center justify-center px-10',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className:
                          'relative h-[28%] w-[58%] max-h-[120px] max-w-[280px] min-w-[160px]',
                        children: /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'default'
                          ],
                          {
                            src: logoSrc,
                            alt: '',
                            'aria-hidden': 'true',
                            fill: true,
                            sizes: '(max-width: 768px) 45vw, 240px',
                            className:
                              'object-contain opacity-95 drop-shadow-[0_20px_40px_rgba(4,0,19,0.5)]',
                            loading: priority ? 'eager' : 'lazy',
                            priority: priority,
                            onError: (event) => {
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'applyImageFallback'
                              ])(event);
                              setLogoFailed(true);
                            },
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                            lineNumber: 114,
                            columnNumber: 13,
                          },
                          this
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                        lineNumber: 113,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                    lineNumber: 112,
                    columnNumber: 9,
                  },
                  this
                )
              : null,
            !showLogo && !showThumb
              ? /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className:
                      'absolute inset-0 z-[var(--z-layer-content)] flex items-center justify-center px-8',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'span',
                      {
                        className:
                          'text-bluePrimary/50 text-base font-mono uppercase tracking-[0.35em] text-center',
                        children: project.displayCategory,
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                        lineNumber: 134,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                    lineNumber: 133,
                    columnNumber: 9,
                  },
                  this
                )
              : null,
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className:
                  'absolute inset-0 rounded-md ring-1 ring-inset ring-white/10',
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
                lineNumber: 140,
                columnNumber: 7,
              },
              this
            ),
          ],
        },
        void 0,
        true,
        {
          fileName:
            '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx',
          lineNumber: 73,
          columnNumber: 5,
        },
        this
      );
    }
    _s(FeaturedProjectCardFrame, 'JV7/k5vDi5iMor21sT/yciO6yM0=');
    _c = FeaturedProjectCardFrame;
    var _c;
    __turbopack_context__.k.register(_c, 'FeaturedProjectCardFrame');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => FeaturedProjectCard]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$FeaturedProjectCardFrame$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/utils.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    function FeaturedProjectCard({
      project,
      onOpen,
      priority = false,
      backgroundVariant,
    }) {
      _s();
      const reducedMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      const isModalMode = typeof onOpen === 'function';
      // Resolve the best static image for the card (never a video)
      const staticImageCandidates = [
        project.imageLandscape,
        project.imageSquare,
        project.image,
      ].filter(
        (url) =>
          !!url &&
          !(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'isVideo'
          ])(url)
      );
      const staticImage = staticImageCandidates[0];
      // The media source for the static poster/image — always an image, never a video
      const mediaSource = staticImage;
      const handleClick = () => {
        if (onOpen) {
          onOpen(project);
        }
      };
      const landingHref = project.landingPageSlug
        ? `/projects/${project.landingPageSlug}?from=home&originCard=${encodeURIComponent(project.slug)}`
        : undefined;
      const headingId = `featured-project-${project.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-')}-title`;
      const CardContent = () =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'div',
          {
            children: [
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'div',
                {
                  className: 'flex-1 min-h-[300px]',
                  children: /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$FeaturedProjectCardFrame$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'default'
                    ],
                    {
                      project: project,
                      backgroundVariant: backgroundVariant,
                      mediaSource: mediaSource,
                      priority: priority,
                      reducedMotion: reducedMotion,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                      lineNumber: 56,
                      columnNumber: 9,
                    },
                    this
                  ),
                },
                void 0,
                false,
                {
                  fileName:
                    '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                  lineNumber: 55,
                  columnNumber: 7,
                },
                this
              ),
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'div',
                {
                  className:
                    'mt-6 flex flex-row justify-between items-start gap-4 md:gap-6 px-1 text-left',
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className: 'flex-1',
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'div',
                            {
                              className:
                                'flex items-center justify-start gap-2 text-white/60 text-xs md:text-sm leading-tight mb-2',
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'span',
                                  {
                                    className:
                                      'uppercase tracking-widest font-mono text-[9px] md:text-[10px]',
                                    children: project.category,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                                    lineNumber: 70,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'span',
                                  {
                                    'aria-hidden': true,
                                    className: 'opacity-50',
                                    children: '•',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                                    lineNumber: 73,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'span',
                                  {
                                    className: 'font-light text-[#6B7280]',
                                    children: [
                                      project.client,
                                      ' • ',
                                      project.year,
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                                    lineNumber: 76,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                              lineNumber: 69,
                              columnNumber: 11,
                            },
                            this
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'h3',
                            {
                              id: headingId,
                              className:
                                'text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-[1.2] transition-colors duration-500 md:group-hover:text-bluePrimary',
                              children: project.title,
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                              lineNumber: 81,
                              columnNumber: 11,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName:
                          '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                        lineNumber: 67,
                        columnNumber: 9,
                      },
                      this
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className: 'shrink-0',
                        children: /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className:
                              'btn-icon-circle bg-bluePrimary md:group-hover:bg-[#8705f2] shadow-[0_0_0_rgba(135,5,242,0)] transition-[background-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:shadow-[0_0_28px_rgba(135,5,242,0.5)]',
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__[
                                'ArrowUpRight'
                              ],
                              {
                                className:
                                  'h-6 w-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-5',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                                lineNumber: 93,
                                columnNumber: 13,
                              },
                              this
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                            lineNumber: 92,
                            columnNumber: 11,
                          },
                          this
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                        lineNumber: 91,
                        columnNumber: 9,
                      },
                      this
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName:
                    '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                  lineNumber: 66,
                  columnNumber: 7,
                },
                this
              ),
            ],
          },
          void 0,
          true,
          {
            fileName:
              '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
            lineNumber: 54,
            columnNumber: 5,
          },
          this
        );
      const commonClasses =
        'group block h-full w-full min-h-[48px] rounded-md text-center md:text-left transition-transform duration-200 ease-out hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluePrimary';
      if (isModalMode) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'button',
          {
            type: 'button',
            onClick: handleClick,
            className: commonClasses,
            'aria-labelledby': headingId,
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              CardContent,
              {},
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                lineNumber: 111,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName:
              '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
            lineNumber: 105,
            columnNumber: 7,
          },
          this
        );
      }
      if (landingHref) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'default'
          ],
          {
            href: landingHref,
            className: commonClasses,
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              CardContent,
              {},
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
                lineNumber: 119,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName:
              '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
            lineNumber: 118,
            columnNumber: 7,
          },
          this
        );
      }
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'default'
        ],
        {
          href: `/portfolio/${project.slug}`,
          className: commonClasses,
          'aria-labelledby': headingId,
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            CardContent,
            {},
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
              lineNumber: 130,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName:
            '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx',
          lineNumber: 125,
          columnNumber: 5,
        },
        this
      );
    }
    _s(FeaturedProjectCard, 'pxdVCVMh9oiiD9AcAbE6CDnFaOw=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
      ];
    });
    _c = FeaturedProjectCard;
    var _c;
    __turbopack_context__.k.register(_c, 'FeaturedProjectCard');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/featured-projects/CTAProjectCard.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => CTAProjectCard]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>'
      );
    ('use client');
    function CTAProjectCard() {
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          className:
            'group relative flex h-full min-h-[300px] flex-col items-center justify-center gap-10 overflow-hidden rounded-md bg-[#040013] p-6 md:p-8 lg:p-10 text-center isolate',
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className:
                  'absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_50%_50%,rgba(79,230,255,0.08),transparent_68%)]',
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/CTAProjectCard.tsx',
                lineNumber: 21,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'h3',
              {
                className:
                  'relative z-[var(--z-layer-content)] text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.05] text-white transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-bluePrimary',
                children: [
                  'Like what ',
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'br',
                    {
                      'aria-hidden': 'true',
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/src/components/home/featured-projects/CTAProjectCard.tsx',
                      lineNumber: 24,
                      columnNumber: 19,
                    },
                    this
                  ),
                  'you see?',
                ],
              },
              void 0,
              true,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/CTAProjectCard.tsx',
                lineNumber: 23,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'default'
              ],
              {
                href: '/portfolio',
                className:
                  'relative z-[var(--z-layer-cta)] inline-flex min-h-[48px] items-center gap-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluePrimary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040013] group-hover:text-bluePrimary',
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'span',
                    {
                      children: 'view projects',
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/src/components/home/featured-projects/CTAProjectCard.tsx',
                      lineNumber: 32,
                      columnNumber: 9,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__[
                      'ArrowRight'
                    ],
                    {
                      className:
                        'h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1',
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/src/components/home/featured-projects/CTAProjectCard.tsx',
                      lineNumber: 33,
                      columnNumber: 9,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/CTAProjectCard.tsx',
                lineNumber: 28,
                columnNumber: 7,
              },
              this
            ),
          ],
        },
        void 0,
        true,
        {
          fileName:
            '[project]/src/components/home/featured-projects/CTAProjectCard.tsx',
          lineNumber: 20,
          columnNumber: 5,
        },
        this
      );
    }
    _c = CTAProjectCard;
    var _c;
    __turbopack_context__.k.register(_c, 'CTAProjectCard');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/featured-projects/animated-backgrounds.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'FEATURED_PROJECT_BACKGROUND_POOL',
      () => FEATURED_PROJECT_BACKGROUND_POOL,
      'buildFeaturedProjectBackgroundAssignment',
      () => buildFeaturedProjectBackgroundAssignment,
      'getFeaturedProjectBackgroundVariant',
      () => getFeaturedProjectBackgroundVariant,
    ]);
    const FEATURED_PROJECT_BACKGROUND_POOL = ['grainient', 'ghost', 'aurora'];
    function djb2Hash(input) {
      let hash = 5381;
      for (let index = 0; index < input.length; index += 1) {
        hash = (hash * 33) ^ input.charCodeAt(index);
      }
      return hash >>> 0;
    }
    function getFeaturedProjectBackgroundVariant(projectId) {
      const hash = djb2Hash(projectId);
      return FEATURED_PROJECT_BACKGROUND_POOL[
        hash % FEATURED_PROJECT_BACKGROUND_POOL.length
      ];
    }
    function buildFeaturedProjectBackgroundAssignment(projects) {
      return projects.map((project) =>
        getFeaturedProjectBackgroundVariant(project.id)
      );
    }
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/featured-projects/FeaturedProjectsSection.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => FeaturedProjectsSection]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/motion.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$FeaturedProjectCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/featured-projects/FeaturedProjectCard.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$CTAProjectCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/featured-projects/CTAProjectCard.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$animated$2d$backgrounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/featured-projects/animated-backgrounds.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/layout/Container.tsx [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const { duration, offset } =
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'MOTION_TOKENS'
      ];
    /**
     * Layout Fixo Bento Grid para Home - Featured Projects
     * Pattern baseado no design reference:
     * - Row 1: 5col + 7col = 12
     * - Row 2: 12col (full-width)
     * - Row 3: 8col + 4col (CTA) = 12
     */ const BENTO_GRID_LAYOUT = [
      'md:col-span-4 lg:col-span-5',
      'md:col-span-4 lg:col-span-7',
      'md:col-span-8 lg:col-span-12',
      'md:col-span-5 lg:col-span-8',
    ];
    function FeaturedProjectsSection({ projects, onProjectOpen }) {
      _s();
      const reducedMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      const featuredProjects = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'FeaturedProjectsSection.useMemo[featuredProjects]': () => {
            const source = projects.filter(
              {
                'FeaturedProjectsSection.useMemo[featuredProjects].source': (
                  project
                ) => project.featuredOnHome ?? project.isFeatured,
              }['FeaturedProjectsSection.useMemo[featuredProjects].source']
            );
            return source;
          },
        }['FeaturedProjectsSection.useMemo[featuredProjects]'],
        [projects]
      );
      // Mantém a seleção inicial determinística (SSR) e randomiza após o mount
      const initialVariants = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'FeaturedProjectsSection.useMemo[initialVariants]': () =>
            featuredProjects.map(
              {
                'FeaturedProjectsSection.useMemo[initialVariants]': (project) =>
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$animated$2d$backgrounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'getFeaturedProjectBackgroundVariant'
                  ])(project.id),
              }['FeaturedProjectsSection.useMemo[initialVariants]']
            ),
        }['FeaturedProjectsSection.useMemo[initialVariants]'],
        [featuredProjects]
      );
      const [clientVariants, setClientVariants] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(initialVariants);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'FeaturedProjectsSection.useEffect': () => {
            // Não quebrar hidratação: randomiza só depois do mount
            const shuffled = [...initialVariants].map(
              {
                'FeaturedProjectsSection.useEffect.shuffled': () => {
                  const pool = [
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$animated$2d$backgrounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'FEATURED_PROJECT_BACKGROUND_POOL'
                    ],
                  ];
                  const pick = pool.splice(
                    Math.floor(Math.random() * pool.length),
                    1
                  )[0];
                  return pick;
                },
              }['FeaturedProjectsSection.useEffect.shuffled']
            );
            setClientVariants(shuffled);
          },
        }['FeaturedProjectsSection.useEffect'],
        [initialVariants]
      );
      // Card variants sem scale (Ghost Design System proíbe scale em elementos principais)
      const cardVariants = {
        hidden: reducedMotion
          ? {}
          : {
              opacity: 0,
              y: offset.dramatic,
              filter: 'blur(4px)',
            },
        visible: reducedMotion
          ? {
              opacity: 1,
            }
          : {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'ghostTransition'
              ])(0, duration.normal),
            },
      };
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'section',
        {
          id: 'featured-projects',
          'aria-label': 'Projetos em Destaque',
          className: 'relative z-10 bg-background py-16 md:py-24',
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'Container'
            ],
            {
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'h2',
                  {
                    className: 'sr-only',
                    children: 'Projetos em Destaque',
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/home/featured-projects/FeaturedProjectsSection.tsx',
                    lineNumber: 96,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'motion'
                  ].div,
                  {
                    initial: reducedMotion ? 'visible' : 'hidden',
                    whileInView: 'visible',
                    viewport: {
                      once: true,
                      amount: 0.2,
                    },
                    variants: (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'staggerContainer'
                    ])(0.12),
                    // Layout fixo Bento Grid - 12 colunas com gaps consistentes
                    className:
                      'grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6',
                    children: [
                      featuredProjects.slice(0, 4).map((project, index) => {
                        if (!project) return null;
                        // Usar layout fixo baseado no índice, não no project.layout.cols
                        const gridCols =
                          BENTO_GRID_LAYOUT[index] ||
                          'md:col-span-4 lg:col-span-4';
                        return /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'motion'
                          ].div,
                          {
                            variants: cardVariants,
                            // Mobile: full-width (col-span-4) | Desktop: Bento Grid fixo
                            // Added h-full and flex flex-col to ensure child card stretches
                            className: `w-full col-span-4 ${gridCols} h-full flex flex-col`,
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$FeaturedProjectCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'default'
                              ],
                              {
                                project: project,
                                onOpen: onProjectOpen,
                                priority: index < 3,
                                backgroundVariant:
                                  clientVariants[index] ??
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$animated$2d$backgrounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'getFeaturedProjectBackgroundVariant'
                                  ])(project.id),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/featured-projects/FeaturedProjectsSection.tsx',
                                lineNumber: 119,
                                columnNumber: 17,
                              },
                              this
                            ),
                          },
                          project.id,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/featured-projects/FeaturedProjectsSection.tsx',
                            lineNumber: 112,
                            columnNumber: 15,
                          },
                          this
                        );
                      }),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'motion'
                        ].div,
                        {
                          variants: cardVariants,
                          className:
                            'w-full col-span-4 md:col-span-3 lg:col-span-4 h-full flex flex-col',
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$CTAProjectCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'default'
                            ],
                            {},
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/featured-projects/FeaturedProjectsSection.tsx',
                              lineNumber: 137,
                              columnNumber: 13,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/src/components/home/featured-projects/FeaturedProjectsSection.tsx',
                          lineNumber: 133,
                          columnNumber: 11,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      '[project]/src/components/home/featured-projects/FeaturedProjectsSection.tsx',
                    lineNumber: 97,
                    columnNumber: 9,
                  },
                  this
                ),
              ],
            },
            void 0,
            true,
            {
              fileName:
                '[project]/src/components/home/featured-projects/FeaturedProjectsSection.tsx',
              lineNumber: 95,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName:
            '[project]/src/components/home/featured-projects/FeaturedProjectsSection.tsx',
          lineNumber: 90,
          columnNumber: 5,
        },
        this
      );
    }
    _s(
      FeaturedProjectsSection,
      'OamS9RgJbElF18qF4AN3GSVYxdA=',
      false,
      function () {
        return [
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useMotionGate'
          ],
        ];
      }
    );
    _c = FeaturedProjectsSection;
    var _c;
    __turbopack_context__.k.register(_c, 'FeaturedProjectsSection');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/hooks/useBodyLock.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'default',
      () => __TURBOPACK__default__export__,
      'useBodyLock',
      () => useBodyLock,
      'useBodyLockControls',
      () => useBodyLockControls,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature(),
      _s1 = __turbopack_context__.k.signature();
    // =============================================================================
    // useBodyLock Hook - Ghost Era v2.0
    // Bloqueia o scroll do body quando modal está aberto
    // =============================================================================
    ('use client');
    function useBodyLock(isLocked) {
      _s();
      const scrollPositionRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(0);
      const lockedRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(false);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'useBodyLock.useEffect': () => {
            if (('TURBOPACK compile-time falsy', 0)) //TURBOPACK unreachable
            ;
            const html = document.documentElement;
            const body = document.body;
            if (isLocked) {
              // Salva a posição atual do scroll
              scrollPositionRef.current = window.scrollY;
              lockedRef.current = true;
              // Aplica estilos para bloquear scroll
              const scrollbarWidth = window.innerWidth - html.clientWidth;
              body.style.overflow = 'hidden';
              body.style.position = 'fixed';
              body.style.top = `-${scrollPositionRef.current}px`;
              body.style.left = '0';
              body.style.right = '0';
              body.style.paddingRight = `${scrollbarWidth}px`;
              html.style.overflow = 'hidden';
            } else {
              // Remove os estilos e restaura a posição do scroll
              lockedRef.current = false;
              body.style.overflow = '';
              body.style.position = '';
              body.style.top = '';
              body.style.left = '';
              body.style.right = '';
              body.style.paddingRight = '';
              html.style.overflow = '';
              // Restaura a posição do scroll
              window.scrollTo(0, scrollPositionRef.current);
            }
            // Cleanup ao desmontar
            return {
              'useBodyLock.useEffect': () => {
                // Apenas limpa se ainda estava locked (componente desmontado enquanto modal aberto)
                if (lockedRef.current) {
                  body.style.overflow = '';
                  body.style.position = '';
                  body.style.top = '';
                  body.style.left = '';
                  body.style.right = '';
                  body.style.paddingRight = '';
                  html.style.overflow = '';
                  window.scrollTo(0, scrollPositionRef.current);
                }
              },
            }['useBodyLock.useEffect'];
          },
        }['useBodyLock.useEffect'],
        [isLocked]
      );
    }
    _s(useBodyLock, 'r+SRUD3CJDpiT00UbcaVnzG3jjo=');
    function useBodyLockControls() {
      _s1();
      const scrollPositionRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(0);
      const isLockedRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(false);
      const lock = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ])(
        {
          'useBodyLockControls.useCallback[lock]': () => {
            if (
              ('TURBOPACK compile-time value', 'object') === 'undefined' ||
              isLockedRef.current
            )
              return;
            const html = document.documentElement;
            const body = document.body;
            scrollPositionRef.current = window.scrollY;
            const scrollbarWidth = window.innerWidth - html.clientWidth;
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.top = `-${scrollPositionRef.current}px`;
            body.style.left = '0';
            body.style.right = '0';
            body.style.paddingRight = `${scrollbarWidth}px`;
            html.style.overflow = 'hidden';
            isLockedRef.current = true;
          },
        }['useBodyLockControls.useCallback[lock]'],
        []
      );
      const unlock = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ])(
        {
          'useBodyLockControls.useCallback[unlock]': () => {
            if (
              ('TURBOPACK compile-time value', 'object') === 'undefined' ||
              !isLockedRef.current
            )
              return;
            const html = document.documentElement;
            const body = document.body;
            body.style.overflow = '';
            body.style.position = '';
            body.style.top = '';
            body.style.left = '';
            body.style.right = '';
            body.style.paddingRight = '';
            html.style.overflow = '';
            window.scrollTo(0, scrollPositionRef.current);
            isLockedRef.current = false;
          },
        }['useBodyLockControls.useCallback[unlock]'],
        []
      );
      const toggle = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ])(
        {
          'useBodyLockControls.useCallback[toggle]': () => {
            if (isLockedRef.current) {
              unlock();
            } else {
              lock();
            }
          },
        }['useBodyLockControls.useCallback[toggle]'],
        [lock, unlock]
      );
      // Cleanup ao desmontar
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'useBodyLockControls.useEffect': () => {
            return {
              'useBodyLockControls.useEffect': () => {
                if (isLockedRef.current) {
                  const body = document.body;
                  const html = document.documentElement;
                  body.style.overflow = '';
                  body.style.position = '';
                  body.style.top = '';
                  body.style.left = '';
                  body.style.right = '';
                  body.style.paddingRight = '';
                  html.style.overflow = '';
                }
              },
            }['useBodyLockControls.useEffect'];
          },
        }['useBodyLockControls.useEffect'],
        []
      );
      return {
        lock,
        unlock,
        toggle,
        isLocked: isLockedRef.current,
      };
    }
    _s1(useBodyLockControls, '6QibDnZpd5vUc+gtbkGTpAVCmQQ=');
    const __TURBOPACK__default__export__ = useBodyLock;
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/portfolio/modal/variants.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'MODAL_TIMELINE',
      () => MODAL_TIMELINE,
      'easing',
      () => easing,
      'fadeInUp',
      () => fadeInUp,
      'getBackdropVariants',
      () => getBackdropVariants,
      'getContainerVariants',
      () => getContainerVariants,
      'getContentVariants',
      () => getContentVariants,
      'getFadeInUp',
      () => getFadeInUp,
      'getMediaVariants',
      () => getMediaVariants,
      'getMetaVariants',
      () => getMetaVariants,
      'getTitleVariants',
      () => getTitleVariants,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/motion.ts [app-client] (ecmascript)'
      );
    const easing =
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'GHOST_EASE'
      ];
    const MODAL_TIMELINE = {
      BACKDROP: 0.18,
      CONTAINER: 0.26,
      MEDIA: 0.52,
      TITLE: 0.76,
      META: 0.96,
      SECONDARY: 1.12,
      STAGGER: 0.08,
    };
    const fadeInUp = {
      initial: {
        opacity: 0,
        y: 16,
      },
      animate: {
        opacity: 1,
        y: 0,
      },
      exit: {
        opacity: 0,
        y: -8,
      },
      transition: {
        duration: 0.4,
        ease: easing,
      },
    };
    const getFadeInUp = (shouldReduceMotion) => ({
      initial: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 16,
      },
      animate: {
        opacity: 1,
        y: 0,
      },
      exit: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : -8,
      },
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.4,
        ease: easing,
      },
    });
    const getBackdropVariants = (shouldReduceMotion) => ({
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          duration: shouldReduceMotion ? 0.15 : MODAL_TIMELINE.BACKDROP,
          ease: 'linear',
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: shouldReduceMotion ? 0.15 : 0.15,
          ease: 'linear',
        },
      },
    });
    const getContainerVariants = (shouldReduceMotion) => ({
      hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 12,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.2 : MODAL_TIMELINE.CONTAINER,
          ease: easing,
          delay: shouldReduceMotion ? 0 : 0.12,
        },
      },
      exit: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 8,
        transition: {
          duration: shouldReduceMotion ? 0.18 : 0.18,
          ease: easing,
        },
      },
    });
    const getMediaVariants = (shouldReduceMotion) => ({
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          duration: shouldReduceMotion ? 0.2 : 0.24,
          delay: shouldReduceMotion ? 0 : MODAL_TIMELINE.MEDIA,
        },
      },
    });
    const getTitleVariants = (shouldReduceMotion) => ({
      hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 6,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.2 : 0.2,
          delay: shouldReduceMotion ? 0 : MODAL_TIMELINE.TITLE,
          ease: easing,
        },
      },
    });
    const getMetaVariants = (shouldReduceMotion) => ({
      hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 4,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.2 : 0.16,
          delay: shouldReduceMotion ? 0 : MODAL_TIMELINE.META,
          ease: easing,
        },
      },
    });
    const getContentVariants = (shouldReduceMotion) => ({
      hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 8,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.2 : 0.24,
          delay: shouldReduceMotion ? 0 : MODAL_TIMELINE.SECONDARY,
          ease: easing,
          staggerChildren: shouldReduceMotion ? 0 : MODAL_TIMELINE.STAGGER,
        },
      },
    });
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/lib/video.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'DEFAULT_CAPTIONS',
      () => DEFAULT_CAPTIONS,
      'DEFAULT_VIDEO_POSTER',
      () => DEFAULT_VIDEO_POSTER,
    ]);
    const DEFAULT_VIDEO_POSTER = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#040013"/>
        <stop offset="50%" stop-color="#0b0d3a"/>
        <stop offset="100%" stop-color="#040013"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#g)"/>
    <text x="50%" y="50%" fill="#4fe6ff" font-size="48" font-family="Arial, sans-serif" text-anchor="middle" dominant-baseline="middle" opacity="0.5">ghost design</text>
  </svg>`)}`;
    const DEFAULT_CAPTIONS = '/captions/ambient.vtt';
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/portfolio/CaseBodyRenderer.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['CaseBodyRenderer', () => CaseBodyRenderer]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$markdown$40$10$2e$1$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/react-markdown@10.1.0_@types+react@19.2.14_react@19.2.4/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>'
      );
    /**
     * CaseBodyRenderer - Ghost Era v3.0
     *
     * Reliable Markdown-to-HTML rendering using react-markdown.
     * Allows safe rendering and robust markdown support without writing custom regex.
     */ ('use client');
    function CaseBodyRenderer({ content, className = '' }) {
      if (!content || typeof content !== 'string') return null;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          className: `case-body-content prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-balance prose-p:text-balance prose-img:rounded-xl prose-a:text-[#4fe6ff] hover:prose-a:text-[#4fe6ff]/80 ${className}`,
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$markdown$40$10$2e$1$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__[
              'default'
            ],
            {
              children: content,
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/portfolio/CaseBodyRenderer.tsx',
              lineNumber: 22,
              columnNumber: 13,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName: '[project]/src/components/portfolio/CaseBodyRenderer.tsx',
          lineNumber: 21,
          columnNumber: 9,
        },
        this
      );
    }
    _c = CaseBodyRenderer;
    var _c;
    __turbopack_context__.k.register(_c, 'CaseBodyRenderer');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/portfolio/ImageLightbox.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['ImageLightbox', () => ImageLightbox]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBodyLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useBodyLock.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/utils.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/video.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/image.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/motion.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    function ImageLightbox({ isOpen, src, alt, onClose }) {
      _s();
      const shouldReduceMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      const [mounted, setMounted] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      const closeRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const videoRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const lastFocusRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBodyLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useBodyLock'
      ])(isOpen);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'ImageLightbox.useEffect': () => {
            setMounted(true);
          },
        }['ImageLightbox.useEffect'],
        []
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'ImageLightbox.useEffect': () => {
            if (!isOpen) {
              lastFocusRef.current?.focus();
              return;
            }
            lastFocusRef.current = document.activeElement;
            closeRef.current?.focus();
            const onKeyDown = {
              'ImageLightbox.useEffect.onKeyDown': (event) => {
                if (event.key === 'Escape') {
                  event.preventDefault();
                  onClose();
                }
              },
            }['ImageLightbox.useEffect.onKeyDown'];
            document.addEventListener('keydown', onKeyDown);
            return {
              'ImageLightbox.useEffect': () => {
                document.removeEventListener('keydown', onKeyDown);
              },
            }['ImageLightbox.useEffect'];
          },
        }['ImageLightbox.useEffect'],
        [isOpen, onClose]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'ImageLightbox.useEffect': () => {
            if (
              !isOpen ||
              !src ||
              !(0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'isVideo'
              ])(src) ||
              !videoRef.current
            )
              return;
            const video = videoRef.current;
            video.muted = false;
            void video.play().catch(
              {
                'ImageLightbox.useEffect': () => undefined,
              }['ImageLightbox.useEffect']
            );
          },
        }['ImageLightbox.useEffect'],
        [isOpen, src]
      );
      if (!mounted) return null;
      const backdropTransition = shouldReduceMotion
        ? {
            duration: 0.16,
          }
        : {
            duration: 0.24,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'GHOST_EASE'
            ],
          };
      const panelTransition = shouldReduceMotion
        ? {
            duration: 0.16,
          }
        : {
            duration: 0.32,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'GHOST_EASE'
            ],
          };
      const youtubeEmbedUrl =
        src &&
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'isYouTubeUrl'
        ])(src)
          ? (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'getYouTubeEmbedUrl'
            ])(src)
          : null;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'createPortal'
      ])(
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'AnimatePresence'
          ],
          {
            children:
              isOpen && src
                ? /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'motion'
                    ].div,
                    {
                      role: 'dialog',
                      'aria-modal': 'true',
                      'aria-label': 'Visualização ampliada',
                      className:
                        'fixed inset-0 z-90 flex items-center justify-center bg-black/95 p-4 md:p-8',
                      initial: {
                        opacity: 0,
                      },
                      animate: {
                        opacity: 1,
                      },
                      exit: {
                        opacity: 0,
                      },
                      transition: backdropTransition,
                      onClick: onClose,
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'motion'
                        ].div,
                        {
                          className:
                            'relative flex max-h-[90vh] max-w-6xl flex-col items-center justify-center p-2',
                          initial: shouldReduceMotion
                            ? {
                                opacity: 0,
                              }
                            : {
                                opacity: 0,
                                y: 14,
                                filter: 'blur(6px)',
                              },
                          animate: shouldReduceMotion
                            ? {
                                opacity: 1,
                              }
                            : {
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                              },
                          exit: shouldReduceMotion
                            ? {
                                opacity: 0,
                              }
                            : {
                                opacity: 0,
                                y: 14,
                                filter: 'blur(6px)',
                              },
                          transition: panelTransition,
                          onClick: (event) => event.stopPropagation(),
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'button',
                              {
                                ref: closeRef,
                                type: 'button',
                                onClick: onClose,
                                'aria-label': 'Fechar zoom',
                                className:
                                  'absolute right-2 top-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                    'X'
                                  ],
                                  {
                                    size: 18,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/src/components/portfolio/ImageLightbox.tsx',
                                    lineNumber: 103,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/portfolio/ImageLightbox.tsx',
                                lineNumber: 96,
                                columnNumber: 13,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className:
                                  'relative flex max-h-full max-w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl',
                                children: youtubeEmbedUrl
                                  ? /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'iframe',
                                      {
                                        src: youtubeEmbedUrl,
                                        title: alt,
                                        className: 'h-full w-full border-none',
                                        allow:
                                          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                                        allowFullScreen: true,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/src/components/portfolio/ImageLightbox.tsx',
                                        lineNumber: 108,
                                        columnNumber: 17,
                                      },
                                      this
                                    )
                                  : (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'isVideo'
                                      ])(src)
                                    ? /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'video',
                                        {
                                          ref: videoRef,
                                          src: src,
                                          className:
                                            'h-full w-full object-contain',
                                          controls: true,
                                          autoPlay: true,
                                          muted: false,
                                          playsInline: true,
                                          preload: 'metadata',
                                          onLoadedMetadata: (event) => {
                                            event.currentTarget.muted = false;
                                            void event.currentTarget
                                              .play()
                                              .catch(() => undefined);
                                          },
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'track',
                                            {
                                              kind: 'captions',
                                              src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'DEFAULT_CAPTIONS'
                                              ],
                                              srcLang: 'pt-BR',
                                              label: 'Português',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/src/components/portfolio/ImageLightbox.tsx',
                                              lineNumber: 130,
                                              columnNumber: 19,
                                            },
                                            this
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/src/components/portfolio/ImageLightbox.tsx',
                                          lineNumber: 116,
                                          columnNumber: 17,
                                        },
                                        this
                                      )
                                    : /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'default'
                                        ],
                                        {
                                          src: src,
                                          alt: alt,
                                          width: 1920,
                                          height: 1080,
                                          sizes: '90vw',
                                          className:
                                            'max-h-[85vh] w-auto max-w-full object-contain',
                                          priority: true,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/src/components/portfolio/ImageLightbox.tsx',
                                          lineNumber: 139,
                                          columnNumber: 17,
                                        },
                                        this
                                      ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/portfolio/ImageLightbox.tsx',
                                lineNumber: 106,
                                columnNumber: 13,
                              },
                              this
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            '[project]/src/components/portfolio/ImageLightbox.tsx',
                          lineNumber: 88,
                          columnNumber: 11,
                        },
                        this
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/src/components/portfolio/ImageLightbox.tsx',
                      lineNumber: 77,
                      columnNumber: 9,
                    },
                    this
                  )
                : null,
          },
          void 0,
          false,
          {
            fileName: '[project]/src/components/portfolio/ImageLightbox.tsx',
            lineNumber: 75,
            columnNumber: 5,
          },
          this
        ),
        document.body
      );
    }
    _s(ImageLightbox, 'QWfH4gG2l+ECLBYscFqogU7Oue4=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBodyLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useBodyLock'
        ],
      ];
    });
    _c = ImageLightbox;
    var _c;
    __turbopack_context__.k.register(_c, 'ImageLightbox');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['AdaptiveMediaLayout', () => AdaptiveMediaLayout]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/image.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/utils.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/video.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$CaseBodyRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/portfolio/CaseBodyRenderer.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$ImageLightbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/portfolio/ImageLightbox.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/supabase/urls.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$modal$2f$variants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/portfolio/modal/variants.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const AdaptiveMediaLayout = ({
      project,
      heroMedia,
      shouldReduce = false,
    }) => {
      _s();
      const [activeMedia, setActiveMedia] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(heroMedia);
      const [lightboxSource, setLightboxSource] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(null);
      // Combine hero media + gallery
      const galleryMedia = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'AdaptiveMediaLayout.useMemo[galleryMedia]': () => {
            const list = [];
            // Ensure heroMedia is always available in the thumbnails
            if (heroMedia && heroMedia.trim() !== '') {
              list.push(heroMedia);
            }
            if (project.detail?.gallery) {
              project.detail.gallery.forEach(
                {
                  'AdaptiveMediaLayout.useMemo[galleryMedia]': (m) => {
                    if (
                      m &&
                      typeof m === 'string' &&
                      m.trim() !== '' &&
                      !list.includes(m)
                    ) {
                      list.push(m);
                    }
                  },
                }['AdaptiveMediaLayout.useMemo[galleryMedia]']
              );
            }
            return list;
          },
        }['AdaptiveMediaLayout.useMemo[galleryMedia]'],
        [project.detail?.gallery, heroMedia]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'AdaptiveMediaLayout.useEffect': () => {
            if (
              galleryMedia.length > 0 &&
              !galleryMedia.includes(activeMedia)
            ) {
              // Keep the heroMedia active originally, but if they click gallery they change it.
              // When opening, if heroMedia is valid, it stays active.
            }
          },
        }['AdaptiveMediaLayout.useEffect'],
        [galleryMedia]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'AdaptiveMediaLayout.useEffect': () => {
            if (heroMedia && heroMedia.trim() !== '') {
              setActiveMedia(heroMedia);
            } else if (galleryMedia.length > 0) {
              setActiveMedia(galleryMedia[0]);
            }
          },
        }['AdaptiveMediaLayout.useEffect'],
        [heroMedia, galleryMedia]
      );
      const contentVariants = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$modal$2f$variants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'getContentVariants'
      ])(shouldReduce);
      const isMotion = project.category === 'motion';
      const activeYouTubeEmbed = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'isYouTubeUrl'
      ])(activeMedia)
        ? (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'getYouTubeEmbedUrl'
          ])(activeMedia)
        : null;
      const isVid = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'isVideo'
      ])(activeMedia);
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'AnimatePresence'
        ],
        {
          mode: 'wait',
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'motion'
            ].div,
            {
              initial: 'hidden',
              animate: 'visible',
              exit: 'hidden',
              variants: contentVariants,
              className: 'w-full flex-1',
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'section',
                  {
                    className:
                      'relative w-full group overflow-hidden bg-transparent',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className:
                            'relative w-full aspect-video max-h-[70vh] bg-black/50 overflow-hidden flex items-center justify-center',
                          children: [
                            activeYouTubeEmbed
                              ? /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'iframe',
                                  {
                                    src: activeYouTubeEmbed,
                                    title: project.title,
                                    className:
                                      'absolute inset-0 w-full h-full border-none z-0',
                                    allow:
                                      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                                    allowFullScreen: true,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                    lineNumber: 86,
                                    columnNumber: 29,
                                  },
                                  ('TURBOPACK compile-time value', void 0)
                                )
                              : isVid
                                ? /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'video',
                                    {
                                      src: activeMedia,
                                      autoPlay: true,
                                      muted: false,
                                      playsInline: true,
                                      controls: true,
                                      preload: 'metadata',
                                      poster:
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'DEFAULT_VIDEO_POSTER'
                                        ],
                                      className:
                                        'absolute inset-0 w-full h-full object-contain z-0',
                                      onLoadedMetadata: (event) => {
                                        event.currentTarget.muted = false;
                                        void event.currentTarget
                                          .play()
                                          .catch(() => undefined);
                                      },
                                      children: /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'track',
                                        {
                                          kind: 'captions',
                                          src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'DEFAULT_CAPTIONS'
                                          ],
                                          srcLang: 'pt-BR',
                                          label: 'Português',
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                          lineNumber: 109,
                                          columnNumber: 33,
                                        },
                                        ('TURBOPACK compile-time value', void 0)
                                      ),
                                    },
                                    activeMedia,
                                    false,
                                    {
                                      fileName:
                                        '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                      lineNumber: 94,
                                      columnNumber: 29,
                                    },
                                    ('TURBOPACK compile-time value', void 0)
                                  )
                                : /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className:
                                        'absolute inset-0 w-full h-full z-0 cursor-pointer',
                                      onClick: () =>
                                        setLightboxSource(activeMedia),
                                      children: /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'default'
                                        ],
                                        {
                                          src: (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'injectSupabaseProxy'
                                          ])(activeMedia, {
                                            width: 1920,
                                            quality: 80,
                                            format: 'webp',
                                          }),
                                          alt: project.title,
                                          fill: true,
                                          className:
                                            'object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02]',
                                          sizes: '100vw',
                                          priority: true,
                                          unoptimized: true,
                                          onError:
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'applyImageFallback'
                                            ],
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                          lineNumber: 118,
                                          columnNumber: 33,
                                        },
                                        ('TURBOPACK compile-time value', void 0)
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                      lineNumber: 117,
                                      columnNumber: 29,
                                    },
                                    ('TURBOPACK compile-time value', void 0)
                                  ),
                            !isVid &&
                              !activeYouTubeEmbed &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  className:
                                    'absolute inset-0 bg-gradient-to-t from-[#040013] via-[#040013]/20 to-transparent opacity-90 pointer-events-none z-10',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                  lineNumber: 133,
                                  columnNumber: 29,
                                },
                                ('TURBOPACK compile-time value', void 0)
                              ),
                            isMotion &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  className:
                                    'absolute top-4 left-6 md:left-12 z-20 pointer-events-none',
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'span',
                                    {
                                      className:
                                        'inline-flex items-center rounded-full bg-[#0b0d3a]/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.5)]',
                                      children: 'Motion & Video',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                      lineNumber: 139,
                                      columnNumber: 33,
                                    },
                                    ('TURBOPACK compile-time value', void 0)
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                  lineNumber: 138,
                                  columnNumber: 29,
                                },
                                ('TURBOPACK compile-time value', void 0)
                              ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                          lineNumber: 84,
                          columnNumber: 21,
                        },
                        ('TURBOPACK compile-time value', void 0)
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className:
                            'w-full max-w-7xl mx-auto px-6 md:px-12 relative z-30 mt-6 md:mt-8 mb-12',
                          children:
                            galleryMedia.length > 0 &&
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className:
                                  'flex gap-4 overflow-x-auto pb-4 no-scrollbar',
                                children: galleryMedia.map((media, idx) => {
                                  const isActive = activeMedia === media;
                                  const isThumbVid = (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'isVideo'
                                  ])(media);
                                  const youtubeThumb = (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'isYouTubeUrl'
                                  ])(media)
                                    ? (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'getYouTubeThumbnailUrl'
                                      ])(media)
                                    : null;
                                  return /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'button',
                                    {
                                      onClick: () => setActiveMedia(media),
                                      className: `relative w-32 md:w-48 aspect-video flex-shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors outline-none
                                                ${isActive ? 'border-[#4fe6ff] ring-4 ring-[#4fe6ff]/20 z-10' : 'border-white/20 hover:border-white/50 opacity-70 hover:opacity-100'}
                                            `,
                                      children: youtubeThumb
                                        ? /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'div',
                                            {
                                              className:
                                                'relative w-full h-full',
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'default'
                                                  ],
                                                  {
                                                    src: youtubeThumb,
                                                    alt: `Thumbnail ${idx}`,
                                                    fill: true,
                                                    className: 'object-cover',
                                                    sizes: '200px',
                                                    unoptimized: true,
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                    lineNumber: 167,
                                                    columnNumber: 53,
                                                  },
                                                  ('TURBOPACK compile-time value',
                                                  void 0)
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'div',
                                                  {
                                                    className:
                                                      'absolute inset-0 flex items-center justify-center bg-black/40',
                                                    children: /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__[
                                                        'Play'
                                                      ],
                                                      {
                                                        className:
                                                          'w-6 h-6 text-white fill-current opacity-90',
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                        lineNumber: 169,
                                                        columnNumber: 57,
                                                      },
                                                      ('TURBOPACK compile-time value',
                                                      void 0)
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                    lineNumber: 168,
                                                    columnNumber: 53,
                                                  },
                                                  ('TURBOPACK compile-time value',
                                                  void 0)
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                              lineNumber: 166,
                                              columnNumber: 49,
                                            },
                                            ('TURBOPACK compile-time value',
                                            void 0)
                                          )
                                        : isThumbVid
                                          ? /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'div',
                                              {
                                                className:
                                                  'relative w-full h-full',
                                                children: [
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'video',
                                                    {
                                                      src: `${media}#t=0.001`,
                                                      className:
                                                        'w-full h-full object-cover bg-black/5',
                                                      muted: true,
                                                      playsInline: true,
                                                      preload: 'metadata',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                      lineNumber: 174,
                                                      columnNumber: 53,
                                                    },
                                                    ('TURBOPACK compile-time value',
                                                    void 0)
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'div',
                                                    {
                                                      className:
                                                        'absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors',
                                                      children:
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          'jsxDEV'
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__[
                                                            'Play'
                                                          ],
                                                          {
                                                            className:
                                                              'w-6 h-6 text-white fill-current opacity-80',
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                            lineNumber: 176,
                                                            columnNumber: 57,
                                                          },
                                                          ('TURBOPACK compile-time value',
                                                          void 0)
                                                        ),
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                      lineNumber: 175,
                                                      columnNumber: 53,
                                                    },
                                                    ('TURBOPACK compile-time value',
                                                    void 0)
                                                  ),
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                lineNumber: 173,
                                                columnNumber: 49,
                                              },
                                              ('TURBOPACK compile-time value',
                                              void 0)
                                            )
                                          : /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'default'
                                              ],
                                              {
                                                src: (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'injectSupabaseProxy'
                                                ])(media, {
                                                  width: 400,
                                                  quality: 70,
                                                  format: 'webp',
                                                }),
                                                alt: `Thumbnail ${idx}`,
                                                fill: true,
                                                className: 'object-cover',
                                                sizes: '200px',
                                                unoptimized: true,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                lineNumber: 180,
                                                columnNumber: 49,
                                              },
                                              ('TURBOPACK compile-time value',
                                              void 0)
                                            ),
                                    },
                                    `${media}-${idx}`,
                                    false,
                                    {
                                      fileName:
                                        '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                      lineNumber: 158,
                                      columnNumber: 41,
                                    },
                                    ('TURBOPACK compile-time value', void 0)
                                  );
                                }),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                lineNumber: 149,
                                columnNumber: 29,
                              },
                              ('TURBOPACK compile-time value', void 0)
                            ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                          lineNumber: 147,
                          columnNumber: 21,
                        },
                        ('TURBOPACK compile-time value', void 0)
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className:
                            'w-full max-w-7xl mx-auto px-6 md:px-12 relative z-30 pb-24',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'h1',
                              {
                                className:
                                  'text-4xl md:text-7xl font-bold tracking-tight text-white mb-2 drop-shadow-2xl font-display',
                                children: project.title,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                lineNumber: 198,
                                columnNumber: 25,
                              },
                              ('TURBOPACK compile-time value', void 0)
                            ),
                            project.subtitle &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'p',
                                {
                                  className:
                                    'text-xl md:text-2xl text-gray-300 font-light mb-8 max-w-3xl leading-relaxed',
                                  children: project.subtitle,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                  lineNumber: 202,
                                  columnNumber: 29,
                                },
                                ('TURBOPACK compile-time value', void 0)
                              ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className:
                                  'flex flex-row flex-wrap gap-8 items-center text-sm border-t border-white/10 pt-6 mb-12 w-full',
                                children: [
                                  project.category &&
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className:
                                          'flex flex-row items-baseline gap-2',
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'span',
                                            {
                                              className:
                                                'text-xs uppercase tracking-widest text-gray-500 font-semibold',
                                              children: 'Categoria',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                              lineNumber: 210,
                                              columnNumber: 37,
                                            },
                                            ('TURBOPACK compile-time value',
                                            void 0)
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'span',
                                            {
                                              className:
                                                'text-white text-base font-medium uppercase font-sans',
                                              children: project.category,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                              lineNumber: 211,
                                              columnNumber: 37,
                                            },
                                            ('TURBOPACK compile-time value',
                                            void 0)
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                        lineNumber: 209,
                                        columnNumber: 33,
                                      },
                                      ('TURBOPACK compile-time value', void 0)
                                    ),
                                  project.client &&
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className:
                                          'flex flex-row items-baseline gap-2',
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'span',
                                            {
                                              className:
                                                'text-xs uppercase tracking-widest text-gray-500 font-semibold',
                                              children: 'Cliente',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                              lineNumber: 216,
                                              columnNumber: 37,
                                            },
                                            ('TURBOPACK compile-time value',
                                            void 0)
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'span',
                                            {
                                              className:
                                                'text-white text-base font-medium',
                                              children: project.client,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                              lineNumber: 217,
                                              columnNumber: 37,
                                            },
                                            ('TURBOPACK compile-time value',
                                            void 0)
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                        lineNumber: 215,
                                        columnNumber: 33,
                                      },
                                      ('TURBOPACK compile-time value', void 0)
                                    ),
                                  project.year &&
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className:
                                          'flex flex-row items-baseline gap-2',
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'span',
                                            {
                                              className:
                                                'text-xs uppercase tracking-widest text-gray-500 font-semibold',
                                              children: 'Ano',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                              lineNumber: 222,
                                              columnNumber: 37,
                                            },
                                            ('TURBOPACK compile-time value',
                                            void 0)
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'span',
                                            {
                                              className:
                                                'text-white text-base font-medium',
                                              children: project.year,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                              lineNumber: 223,
                                              columnNumber: 37,
                                            },
                                            ('TURBOPACK compile-time value',
                                            void 0)
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                        lineNumber: 221,
                                        columnNumber: 33,
                                      },
                                      ('TURBOPACK compile-time value', void 0)
                                    ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                lineNumber: 207,
                                columnNumber: 25,
                              },
                              ('TURBOPACK compile-time value', void 0)
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: 'max-w-3xl flex flex-col gap-10',
                                children: [
                                  project.caseBody ||
                                  project.detail?.description
                                    ? /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'div',
                                        {
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$CaseBodyRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'CaseBodyRenderer'
                                            ],
                                            {
                                              content:
                                                project.caseBody ||
                                                project.detail?.description,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                              lineNumber: 231,
                                              columnNumber: 37,
                                            },
                                            ('TURBOPACK compile-time value',
                                            void 0)
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                          lineNumber: 230,
                                          columnNumber: 33,
                                        },
                                        ('TURBOPACK compile-time value', void 0)
                                      )
                                    : null,
                                  project.detail?.externalUrl &&
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className:
                                          'pt-16 mt-12 flex justify-start',
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'a',
                                          {
                                            className:
                                              'group inline-flex items-center gap-1.5 no-underline',
                                            href: project.detail.externalUrl,
                                            target: '_blank',
                                            rel: 'noopener noreferrer',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'div',
                                                {
                                                  className:
                                                    'h-16 px-8 flex items-center justify-center bg-[#0048ff] rounded-full hover:bg-[#1a5cff] hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(0,72,255,0.3)] hover:shadow-[0_0_30px_rgba(0,72,255,0.5)]',
                                                  children: /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'span',
                                                    {
                                                      className:
                                                        'text-white text-lg font-medium tracking-wide lowercase',
                                                      children:
                                                        'ver projeto completo',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                      lineNumber: 241,
                                                      columnNumber: 45,
                                                    },
                                                    ('TURBOPACK compile-time value',
                                                    void 0)
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                  lineNumber: 240,
                                                  columnNumber: 41,
                                                },
                                                ('TURBOPACK compile-time value',
                                                void 0)
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'div',
                                                {
                                                  className:
                                                    'h-16 w-16 flex-shrink-0 flex items-center justify-center bg-[#0048ff] rounded-full hover:bg-[#1a5cff] hover:rotate-45 transition-all duration-300 shadow-[0_0_20px_rgba(0,72,255,0.3)] hover:shadow-[0_0_30px_rgba(0,72,255,0.5)]',
                                                  children: /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'span',
                                                    {
                                                      className:
                                                        'material-icons-round text-white text-2xl',
                                                      children: 'north_east',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                      lineNumber: 244,
                                                      columnNumber: 45,
                                                    },
                                                    ('TURBOPACK compile-time value',
                                                    void 0)
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                                  lineNumber: 243,
                                                  columnNumber: 41,
                                                },
                                                ('TURBOPACK compile-time value',
                                                void 0)
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                            lineNumber: 239,
                                            columnNumber: 37,
                                          },
                                          ('TURBOPACK compile-time value',
                                          void 0)
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                        lineNumber: 238,
                                        columnNumber: 33,
                                      },
                                      ('TURBOPACK compile-time value', void 0)
                                    ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                                lineNumber: 228,
                                columnNumber: 25,
                              },
                              ('TURBOPACK compile-time value', void 0)
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                          lineNumber: 197,
                          columnNumber: 21,
                        },
                        ('TURBOPACK compile-time value', void 0)
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                    lineNumber: 82,
                    columnNumber: 17,
                  },
                  ('TURBOPACK compile-time value', void 0)
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$ImageLightbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'ImageLightbox'
                  ],
                  {
                    isOpen: Boolean(lightboxSource),
                    src: lightboxSource,
                    alt: project.title,
                    onClose: () => setLightboxSource(null),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
                    lineNumber: 253,
                    columnNumber: 17,
                  },
                  ('TURBOPACK compile-time value', void 0)
                ),
              ],
            },
            'cinematic-layout',
            true,
            {
              fileName:
                '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
              lineNumber: 74,
              columnNumber: 13,
            },
            ('TURBOPACK compile-time value', void 0)
          ),
        },
        void 0,
        false,
        {
          fileName:
            '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx',
          lineNumber: 73,
          columnNumber: 9,
        },
        ('TURBOPACK compile-time value', void 0)
      );
    };
    _s(AdaptiveMediaLayout, 'oMAUsRnvQUT7uKE8WmWdxvt8ZcM=');
    _c = AdaptiveMediaLayout;
    var _c;
    __turbopack_context__.k.register(_c, 'AdaptiveMediaLayout');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/portfolio/content/TypeAContent.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$content$2f$AdaptiveMediaLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    /**
     * Layout A: Hero adaptativo baseado no aspect ratio da mídia
     * Substitui o layout fixo antigo por um sistema inteligente estilo e-commerce.
     */ const TypeAContent = ({ project }) => {
      _s();
      const prefersReducedMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      const shouldReduce = !!prefersReducedMotion;
      // [BUG FIX #9]: Prioritize video for motion projects
      const heroMedia = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'TypeAContent.useMemo[heroMedia]': () => {
            if (project.thumbnailMedia) {
              return project.thumbnailMedia;
            }
            if (project.category === 'motion' && project.videoPreview) {
              return project.videoPreview;
            }
            return (
              project.imageLandscape ?? project.imageSquare ?? project.image
            );
          },
        }['TypeAContent.useMemo[heroMedia]'],
        [
          project.thumbnailMedia,
          project.category,
          project.videoPreview,
          project.image,
          project.imageLandscape,
          project.imageSquare,
        ]
      );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          className: 'w-full',
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$content$2f$AdaptiveMediaLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'AdaptiveMediaLayout'
            ],
            {
              project: project,
              heroMedia: heroMedia,
              shouldReduce: shouldReduce,
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/portfolio/content/TypeAContent.tsx',
              lineNumber: 40,
              columnNumber: 7,
            },
            ('TURBOPACK compile-time value', void 0)
          ),
        },
        void 0,
        false,
        {
          fileName:
            '[project]/src/components/portfolio/content/TypeAContent.tsx',
          lineNumber: 39,
          columnNumber: 5,
        },
        ('TURBOPACK compile-time value', void 0)
      );
    };
    _s(TypeAContent, 'Tahv2hhQNxegv0VTxaMWmnwWWIY=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
      ];
    });
    _c = TypeAContent;
    const __TURBOPACK__default__export__ = TypeAContent;
    var _c;
    __turbopack_context__.k.register(_c, 'TypeAContent');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/portfolio/content/TypeBContent.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$content$2f$AdaptiveMediaLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/portfolio/content/AdaptiveMediaLayout.tsx [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    /**
     * Layout B: Hero adaptativo baseado no aspect ratio da mídia
     * Substitui o layout compacto antigo por um sistema inteligente estilo e-commerce.
     */ const TypeBContent = ({ project }) => {
      _s();
      const prefersReducedMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      const shouldReduce = !!prefersReducedMotion;
      // [BUG FIX #9]: Prioritize video for motion projects
      const primaryMedia = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'TypeBContent.useMemo[primaryMedia]': () => {
            if (project.thumbnailMedia) {
              return project.thumbnailMedia;
            }
            if (project.category === 'motion' && project.videoPreview) {
              return project.videoPreview;
            }
            return (
              project.imageLandscape ?? project.imageSquare ?? project.image
            );
          },
        }['TypeBContent.useMemo[primaryMedia]'],
        [
          project.thumbnailMedia,
          project.category,
          project.videoPreview,
          project.image,
          project.imageLandscape,
          project.imageSquare,
        ]
      );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          className: 'w-full',
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$content$2f$AdaptiveMediaLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'AdaptiveMediaLayout'
            ],
            {
              project: project,
              heroMedia: primaryMedia,
              shouldReduce: shouldReduce,
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/portfolio/content/TypeBContent.tsx',
              lineNumber: 40,
              columnNumber: 7,
            },
            ('TURBOPACK compile-time value', void 0)
          ),
        },
        void 0,
        false,
        {
          fileName:
            '[project]/src/components/portfolio/content/TypeBContent.tsx',
          lineNumber: 39,
          columnNumber: 5,
        },
        ('TURBOPACK compile-time value', void 0)
      );
    };
    _s(TypeBContent, 'aAi9LX5GG0LI8Q1uCcjIY6JVKfI=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
      ];
    });
    _c = TypeBContent;
    const __TURBOPACK__default__export__ = TypeBContent;
    var _c;
    __turbopack_context__.k.register(_c, 'TypeBContent');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/portfolio/PortfolioModal.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['PortfolioModal', () => PortfolioModal]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBodyLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useBodyLock.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/ui/ErrorBoundary.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$modal$2f$variants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/portfolio/modal/variants.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$content$2f$TypeAContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/portfolio/content/TypeAContent.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$content$2f$TypeBContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/portfolio/content/TypeBContent.tsx [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const PortfolioModal = ({ isOpen, onClose, project }) => {
      _s();
      const shouldReduceMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      const [mounted, setMounted] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      const modalRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const closeRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const previousFocusRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBodyLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useBodyLock'
      ])(isOpen);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'PortfolioModal.useEffect': () => setMounted(true),
        }['PortfolioModal.useEffect'],
        []
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'PortfolioModal.useEffect': () => {
            if (isOpen) {
              previousFocusRef.current = document.activeElement;
              // Permitir uma renderização curta para o foco
              setTimeout(
                {
                  'PortfolioModal.useEffect': () => closeRef.current?.focus(),
                }['PortfolioModal.useEffect'],
                50
              );
            } else {
              if (previousFocusRef.current) {
                previousFocusRef.current.focus();
                previousFocusRef.current = null;
              }
            }
            if (!isOpen) return;
            const handleKeyDown = {
              'PortfolioModal.useEffect.handleKeyDown': (e) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  onClose();
                }
                if (e.key === 'Tab' && modalRef.current) {
                  const focusableElements = modalRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                  );
                  const firstElement = focusableElements[0];
                  const lastElement =
                    focusableElements[focusableElements.length - 1];
                  if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                  } else if (
                    !e.shiftKey &&
                    document.activeElement === lastElement
                  ) {
                    e.preventDefault();
                    firstElement?.focus();
                  }
                }
              },
            }['PortfolioModal.useEffect.handleKeyDown'];
            document.addEventListener('keydown', handleKeyDown);
            return {
              'PortfolioModal.useEffect': () => {
                document.removeEventListener('keydown', handleKeyDown);
              },
            }['PortfolioModal.useEffect'];
          },
        }['PortfolioModal.useEffect'],
        [isOpen, onClose]
      );
      const containerVariants = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'PortfolioModal.useMemo[containerVariants]': () =>
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$modal$2f$variants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'getContainerVariants'
            ])(shouldReduceMotion),
        }['PortfolioModal.useMemo[containerVariants]'],
        [shouldReduceMotion]
      );
      const titleId = project
        ? `portfolio-modal-${project.slug.replace(/[^a-z0-9-]/gi, '')}`
        : undefined;
      if (!mounted) return null;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'createPortal'
      ])(
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'AnimatePresence'
          ],
          {
            children:
              isOpen && project
                ? /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'Fragment'
                    ],
                    {
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'motion'
                          ].div,
                          {
                            className:
                              'fixed inset-0 z-[1200] pointer-events-none bg-[#040013]/95 backdrop-blur-sm',
                            initial: {
                              opacity: 0,
                            },
                            animate: {
                              opacity: 1,
                            },
                            exit: {
                              opacity: 0,
                            },
                            transition: {
                              duration: 0.5,
                              ease: 'easeInOut',
                            },
                            'aria-hidden': 'true',
                          },
                          'backdrop',
                          false,
                          {
                            fileName:
                              '[project]/src/components/portfolio/PortfolioModal.tsx',
                            lineNumber: 96,
                            columnNumber: 11,
                          },
                          ('TURBOPACK compile-time value', void 0)
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'motion'
                          ].div,
                          {
                            ref: modalRef,
                            role: 'dialog',
                            'aria-modal': 'true',
                            'aria-labelledby': titleId,
                            variants: containerVariants,
                            initial: 'hidden',
                            animate: 'visible',
                            exit: 'exit',
                            className:
                              'fixed inset-0 z-[1210] flex flex-col font-display selection:bg-[#4fe6ff] selection:text-black overflow-x-hidden overflow-y-auto h-[100dvh] w-screen',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  className:
                                    'absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0b0d3a] via-[#040013] to-[#040013] opacity-80',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/portfolio/PortfolioModal.tsx',
                                  lineNumber: 119,
                                  columnNumber: 13,
                                },
                                ('TURBOPACK compile-time value', void 0)
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  className:
                                    'fixed top-4 right-4 md:top-8 md:right-8 z-[1220]',
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'button',
                                    {
                                      ref: closeRef,
                                      onClick: onClose,
                                      'aria-label': 'Fechar modal',
                                      className:
                                        'flex items-center justify-center w-[48px] h-[48px] md:w-[68px] md:h-[68px] rounded-full bg-black/40 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 group shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4fe6ff]',
                                      children: /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                          'X'
                                        ],
                                        {
                                          className:
                                            'text-white/70 group-hover:text-white transition-colors',
                                          size: 28,
                                          strokeWidth: 1.5,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/src/components/portfolio/PortfolioModal.tsx',
                                          lineNumber: 128,
                                          columnNumber: 17,
                                        },
                                        ('TURBOPACK compile-time value', void 0)
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/src/components/portfolio/PortfolioModal.tsx',
                                      lineNumber: 122,
                                      columnNumber: 15,
                                    },
                                    ('TURBOPACK compile-time value', void 0)
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/portfolio/PortfolioModal.tsx',
                                  lineNumber: 121,
                                  columnNumber: 13,
                                },
                                ('TURBOPACK compile-time value', void 0)
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'main',
                                {
                                  className:
                                    'flex-1 relative z-10 w-full pt-16 md:pt-0 min-h-full',
                                  children: [
                                    titleId
                                      ? /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'h2',
                                          {
                                            id: titleId,
                                            className: 'sr-only',
                                            children: project.title,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/src/components/portfolio/PortfolioModal.tsx',
                                            lineNumber: 134,
                                            columnNumber: 17,
                                          },
                                          ('TURBOPACK compile-time value',
                                          void 0)
                                        )
                                      : null,
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'default'
                                      ],
                                      {
                                        fallback: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'div',
                                          {
                                            className:
                                              'flex items-center justify-center min-h-[50vh]',
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'div',
                                              {
                                                className:
                                                  'rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70',
                                                children:
                                                  'Não foi possível carregar este projeto agora. Tente novamente em instantes.',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/src/components/portfolio/PortfolioModal.tsx',
                                                lineNumber: 141,
                                                columnNumber: 21,
                                              },
                                              void 0
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/src/components/portfolio/PortfolioModal.tsx',
                                            lineNumber: 140,
                                            columnNumber: 19,
                                          },
                                          void 0
                                        ),
                                        children:
                                          project.type === 'A'
                                            ? /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$content$2f$TypeAContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'default'
                                                ],
                                                {
                                                  project: project,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/src/components/portfolio/PortfolioModal.tsx',
                                                  lineNumber: 148,
                                                  columnNumber: 19,
                                                },
                                                ('TURBOPACK compile-time value',
                                                void 0)
                                              )
                                            : /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$content$2f$TypeBContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'default'
                                                ],
                                                {
                                                  project: project,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/src/components/portfolio/PortfolioModal.tsx',
                                                  lineNumber: 150,
                                                  columnNumber: 19,
                                                },
                                                ('TURBOPACK compile-time value',
                                                void 0)
                                              ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/src/components/portfolio/PortfolioModal.tsx',
                                        lineNumber: 138,
                                        columnNumber: 15,
                                      },
                                      ('TURBOPACK compile-time value', void 0)
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    '[project]/src/components/portfolio/PortfolioModal.tsx',
                                  lineNumber: 132,
                                  columnNumber: 13,
                                },
                                ('TURBOPACK compile-time value', void 0)
                              ),
                            ],
                          },
                          'modal',
                          true,
                          {
                            fileName:
                              '[project]/src/components/portfolio/PortfolioModal.tsx',
                            lineNumber: 106,
                            columnNumber: 11,
                          },
                          ('TURBOPACK compile-time value', void 0)
                        ),
                      ],
                    },
                    void 0,
                    true
                  )
                : null,
          },
          void 0,
          false,
          {
            fileName: '[project]/src/components/portfolio/PortfolioModal.tsx',
            lineNumber: 93,
            columnNumber: 5,
          },
          ('TURBOPACK compile-time value', void 0)
        ),
        document.body
      );
    };
    _s(PortfolioModal, 'RvRUAxET/BSmnbQIAZCkAQ2FleQ=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useBodyLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useBodyLock'
        ],
      ];
    });
    _c = PortfolioModal;
    var _c;
    __turbopack_context__.k.register(_c, 'PortfolioModal');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/lib/utils/stable-shuffle.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    /**
     * Stable Shuffle - Ghost Era v2.1
     *
     * Deterministic shuffle based on a time-windowed seed.
     * Same seed = same order. Prevents layout shift and "chaotic shuffle"
     * while ensuring content rotation over time.
     *
     * Usage:
     *   const shuffled = stableShuffle(projects, { window: 'daily', scope: 'home' });
     */ __turbopack_context__.s(['stableShuffle', () => stableShuffle]);
    /**
     * Generate a numeric seed from a string using DJB2 hash.
     * Consistent across server/client for the same input.
     */ function djb2Hash(str) {
      let hash = 5381;
      for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
      }
      return hash >>> 0; // Ensure unsigned 32-bit
    }
    /**
     * Generate a time-based seed string for the given window.
     */ function getTimeSeed(window) {
      const now = new Date();
      const year = now.getUTCFullYear();
      const month = now.getUTCMonth();
      const day = now.getUTCDate();
      const hour = now.getUTCHours();
      switch (window) {
        case 'hourly':
          return `${year}-${month}-${day}-${hour}`;
        case 'weekly': {
          // ISO week number
          const startOfYear = new Date(Date.UTC(year, 0, 1));
          const diff = now.getTime() - startOfYear.getTime();
          const oneWeek = 7 * 24 * 60 * 60 * 1000;
          const weekNumber = Math.floor(diff / oneWeek);
          return `${year}-W${weekNumber}`;
        }
        case 'daily':
        default:
          return `${year}-${month}-${day}`;
      }
    }
    /**
     * Seeded PRNG (Linear Congruential Generator).
     * Returns a function that produces deterministic values 0..1.
     */ function seededRandom(seed) {
      let state = seed;
      return () => {
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 0xffffffff;
      };
    }
    function stableShuffle(items, options = {}) {
      if (items.length <= 1) return [...items];
      const { window = 'daily', scope = '' } = options;
      const timeSeed = getTimeSeed(window);
      const seedString = `${scope}:${timeSeed}`;
      const seed = djb2Hash(seedString);
      const random = seededRandom(seed);
      const shuffled = [...items];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/featured-projects/FeaturedProjectsRealtime.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => FeaturedProjectsRealtime]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      /*#__PURE__*/ __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/navigation.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/supabase/client.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2f$project$2d$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/portfolio/project-mappers.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$FeaturedProjectsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/featured-projects/FeaturedProjectsSection.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$PortfolioModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/portfolio/PortfolioModal.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$stable$2d$shuffle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/utils/stable-shuffle.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const POLLING_INTERVAL_MS = 45_000;
    function normalizeHomeFeaturedProjects(projects) {
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$stable$2d$shuffle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'stableShuffle'
      ])(projects, {
        window: 'daily',
        scope: 'home',
      });
    }
    function getProjectsSignature(projects) {
      return projects
        .map((project) =>
          [
            project.id,
            project.slug,
            project.title,
            project.client,
            String(project.year),
            project.image,
            project.imageLandscape ?? '',
            project.imageSquare ?? '',
            project.landingPageSlug ?? '',
            String(project.featuredOnHome ?? false),
          ].join('::')
        )
        .join('|');
    }
    function FeaturedProjectsRealtime({ initialProjects }) {
      _s();
      const router = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRouter'
      ])();
      const supabase = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMemo'
      ])(
        {
          'FeaturedProjectsRealtime.useMemo[supabase]': () =>
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'createClientComponentClient'
            ])(),
        }['FeaturedProjectsRealtime.useMemo[supabase]'],
        []
      );
      const [projects, setProjects] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(initialProjects);
      const [selectedProject, setSelectedProject] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(null);
      const [isModalOpen, setIsModalOpen] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      const lastFocusedRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const isDev =
        ('TURBOPACK compile-time value', 'development') !== 'production';
      const loadFeaturedProjects = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ])(
        {
          'FeaturedProjectsRealtime.useCallback[loadFeaturedProjects]':
            async () => {
              try {
                const { data, error } = await supabase
                  .from('public_projects_view')
                  .select(
                    '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind))'
                  )
                  .eq('featured_on_home', true)
                  .order('featured_home_order', {
                    ascending: true,
                    nullsFirst: false,
                  });
                if (error) {
                  if (('TURBOPACK compile-time truthy', 1)) {
                    console.warn(
                      '[FeaturedProjectsRealtime] Supabase unavailable, keeping current project set.',
                      error.message
                    );
                  }
                  setProjects(
                    {
                      'FeaturedProjectsRealtime.useCallback[loadFeaturedProjects]':
                        (current) =>
                          current.length > 0 ? current : initialProjects,
                    }[
                      'FeaturedProjectsRealtime.useCallback[loadFeaturedProjects]'
                    ]
                  );
                  return;
                }
                const nextProjects = (data ?? []).map(
                  {
                    'FeaturedProjectsRealtime.useCallback[loadFeaturedProjects].nextProjects':
                      (project, index) =>
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2f$project$2d$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'mapDbProjectToPortfolioProject'
                        ])(project, index),
                  }[
                    'FeaturedProjectsRealtime.useCallback[loadFeaturedProjects].nextProjects'
                  ]
                );
                const normalizedProjects =
                  normalizeHomeFeaturedProjects(nextProjects);
                if (normalizedProjects.length === 0) {
                  setProjects(
                    {
                      'FeaturedProjectsRealtime.useCallback[loadFeaturedProjects]':
                        (current) =>
                          current.length > 0 ? current : initialProjects,
                    }[
                      'FeaturedProjectsRealtime.useCallback[loadFeaturedProjects]'
                    ]
                  );
                  return;
                }
                setProjects(
                  {
                    'FeaturedProjectsRealtime.useCallback[loadFeaturedProjects]':
                      (current) => {
                        const isSame =
                          getProjectsSignature(current) ===
                          getProjectsSignature(normalizedProjects);
                        if (isSame) return current;
                        return normalizedProjects;
                      },
                  }[
                    'FeaturedProjectsRealtime.useCallback[loadFeaturedProjects]'
                  ]
                );
              } catch (error) {
                if (('TURBOPACK compile-time truthy', 1)) {
                  console.warn(
                    '[FeaturedProjectsRealtime] Failed to load projects:',
                    error
                  );
                }
                setProjects(
                  {
                    'FeaturedProjectsRealtime.useCallback[loadFeaturedProjects]':
                      (current) =>
                        current.length > 0 ? current : initialProjects,
                  }[
                    'FeaturedProjectsRealtime.useCallback[loadFeaturedProjects]'
                  ]
                );
              }
            },
        }['FeaturedProjectsRealtime.useCallback[loadFeaturedProjects]'],
        [initialProjects, isDev, supabase]
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'FeaturedProjectsRealtime.useEffect': () => {
            void loadFeaturedProjects();
            let channel = null;
            let pollingId = null;
            const startPolling = {
              'FeaturedProjectsRealtime.useEffect.startPolling': () => {
                if (pollingId || document.visibilityState !== 'visible') return;
                pollingId = setInterval(
                  {
                    'FeaturedProjectsRealtime.useEffect.startPolling': () => {
                      void loadFeaturedProjects();
                    },
                  }['FeaturedProjectsRealtime.useEffect.startPolling'],
                  POLLING_INTERVAL_MS
                );
              },
            }['FeaturedProjectsRealtime.useEffect.startPolling'];
            const stopPolling = {
              'FeaturedProjectsRealtime.useEffect.stopPolling': () => {
                if (!pollingId) return;
                clearInterval(pollingId);
                pollingId = null;
              },
            }['FeaturedProjectsRealtime.useEffect.stopPolling'];
            startPolling();
            const handleVisibilityChange = {
              'FeaturedProjectsRealtime.useEffect.handleVisibilityChange':
                () => {
                  if (document.visibilityState === 'visible') {
                    void loadFeaturedProjects();
                    startPolling();
                  } else {
                    stopPolling();
                  }
                },
            }['FeaturedProjectsRealtime.useEffect.handleVisibilityChange'];
            const handleWindowFocus = {
              'FeaturedProjectsRealtime.useEffect.handleWindowFocus': () => {
                if (document.visibilityState === 'visible') {
                  void loadFeaturedProjects();
                }
              },
            }['FeaturedProjectsRealtime.useEffect.handleWindowFocus'];
            window.addEventListener('focus', handleWindowFocus);
            document.addEventListener(
              'visibilitychange',
              handleVisibilityChange
            );
            const setup = {
              'FeaturedProjectsRealtime.useEffect.setup': async () => {
                try {
                  const {
                    data: { session },
                  } = await supabase.auth.getSession();
                  if (session?.access_token) {
                    supabase.realtime.setAuth(session.access_token);
                  }
                  channel = supabase
                    .channel('portfolio_projects', {
                      config: {
                        broadcast: {
                          self: false,
                          ack: true,
                        },
                      },
                    })
                    .on(
                      'postgres_changes',
                      {
                        event: '*',
                        schema: 'public',
                        table: 'portfolio_projects',
                      },
                      {
                        'FeaturedProjectsRealtime.useEffect.setup': () => {
                          void loadFeaturedProjects();
                        },
                      }['FeaturedProjectsRealtime.useEffect.setup']
                    )
                    .on(
                      'broadcast',
                      {
                        event: 'portfolio_projects',
                      },
                      {
                        'FeaturedProjectsRealtime.useEffect.setup': () => {
                          void loadFeaturedProjects();
                        },
                      }['FeaturedProjectsRealtime.useEffect.setup']
                    )
                    .subscribe(
                      {
                        'FeaturedProjectsRealtime.useEffect.setup': (
                          status,
                          err
                        ) => {
                          if (status === 'SUBSCRIBED') {
                            stopPolling();
                          }
                          if (
                            status === 'CHANNEL_ERROR' ||
                            status === 'TIMED_OUT' ||
                            status === 'CLOSED'
                          ) {
                            startPolling();
                          }
                          if (status === 'CHANNEL_ERROR' && isDev) {
                            console.warn(
                              '[FeaturedProjectsRealtime] Subscription error:',
                              err
                            );
                          }
                        },
                      }['FeaturedProjectsRealtime.useEffect.setup']
                    );
                } catch (error) {
                  if (('TURBOPACK compile-time truthy', 1)) {
                    console.warn(
                      '[FeaturedProjectsRealtime] Realtime setup failed:',
                      error
                    );
                  }
                }
              },
            }['FeaturedProjectsRealtime.useEffect.setup'];
            void setup();
            return {
              'FeaturedProjectsRealtime.useEffect': () => {
                stopPolling();
                window.removeEventListener('focus', handleWindowFocus);
                document.removeEventListener(
                  'visibilitychange',
                  handleVisibilityChange
                );
                if (channel) {
                  void supabase.removeChannel(channel);
                }
              },
            }['FeaturedProjectsRealtime.useEffect'];
          },
        }['FeaturedProjectsRealtime.useEffect'],
        [loadFeaturedProjects, supabase, isDev]
      );
      const handleOpenProject = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ])(
        {
          'FeaturedProjectsRealtime.useCallback[handleOpenProject]': (
            project
          ) => {
            if (project.landingPageSlug) {
              const params = new URLSearchParams({
                from: 'home',
                originCard: project.slug,
              });
              router.push(
                `/projects/${project.landingPageSlug}?${params.toString()}`
              );
              return;
            }
            lastFocusedRef.current = document.activeElement;
            setSelectedProject(project);
            setIsModalOpen(true);
          },
        }['FeaturedProjectsRealtime.useCallback[handleOpenProject]'],
        [router]
      );
      const handleCloseModal = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ])(
        {
          'FeaturedProjectsRealtime.useCallback[handleCloseModal]': () => {
            setIsModalOpen(false);
            window.setTimeout(
              {
                'FeaturedProjectsRealtime.useCallback[handleCloseModal]':
                  () => {
                    setSelectedProject(null);
                    lastFocusedRef.current?.focus();
                  },
              }['FeaturedProjectsRealtime.useCallback[handleCloseModal]'],
              220
            );
          },
        }['FeaturedProjectsRealtime.useCallback[handleCloseModal]'],
        []
      );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'Fragment'
        ],
        {
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$featured$2d$projects$2f$FeaturedProjectsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'default'
              ],
              {
                projects: projects,
                onProjectOpen: handleOpenProject,
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/FeaturedProjectsRealtime.tsx',
                lineNumber: 268,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$PortfolioModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'PortfolioModal'
              ],
              {
                isOpen: isModalOpen,
                onClose: handleCloseModal,
                project: selectedProject,
              },
              void 0,
              false,
              {
                fileName:
                  '[project]/src/components/home/featured-projects/FeaturedProjectsRealtime.tsx',
                lineNumber: 272,
                columnNumber: 7,
              },
              this
            ),
          ],
        },
        void 0,
        true
      );
    }
    _s(
      FeaturedProjectsRealtime,
      'j/wbtYuQavhj7j4W3I8bl13dy8g=',
      false,
      function () {
        return [
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useRouter'
          ],
        ];
      }
    );
    _c = FeaturedProjectsRealtime;
    var _c;
    __turbopack_context__.k.register(_c, 'FeaturedProjectsRealtime');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/ui/Preloader.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['Preloader', () => Preloader]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/brand.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const hexToRgba = (hex, alpha = 1) => {
      const cleaned = hex.replace('#', '');
      const longHex =
        cleaned.length === 3
          ? cleaned.replace(/./g, (char) => char + char)
          : cleaned;
      const numeric = parseInt(longHex, 16);
      const r = (numeric >> 16) & 255;
      const g = (numeric >> 8) & 255;
      const b = numeric & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    const primaryShadowColor = hexToRgba(
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'BRAND'
      ].colors.bluePrimary,
      0.45
    );
    const accentShadowColor = hexToRgba(
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'BRAND'
      ].colors.blueAccent,
      0.6
    );
    function Preloader({
      ready,
      onComplete,
      durationMs = 2000,
      label = 'Summoning spirits',
      className,
    }) {
      _s();
      const [show, setShow] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(true);
      // Detecção de movimento reduzido
      const [reduced, setReduced] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'Preloader.useEffect': () => {
            const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
            setReduced(mq.matches);
            const handler = {
              'Preloader.useEffect.handler': (e) => setReduced(e.matches),
            }['Preloader.useEffect.handler'];
            mq.addEventListener('change', handler);
            return {
              'Preloader.useEffect': () =>
                mq.removeEventListener('change', handler),
            }['Preloader.useEffect'];
          },
        }['Preloader.useEffect'],
        []
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'Preloader.useEffect': () => {
            // Modo A: controlado por 'ready'
            if (typeof ready === 'boolean') {
              if (!ready) return;
              const t = setTimeout(
                {
                  'Preloader.useEffect.t': () => setShow(false),
                }['Preloader.useEffect.t'],
                reduced ? 200 : 800
              );
              return {
                'Preloader.useEffect': () => clearTimeout(t),
              }['Preloader.useEffect'];
            }
            // Modo B: compatibilidade com onComplete
            if (onComplete) {
              const t = setTimeout(
                {
                  'Preloader.useEffect.t': () => {
                    setShow(false);
                    try {
                      onComplete();
                    } catch {}
                  },
                }['Preloader.useEffect.t'],
                durationMs
              );
              return {
                'Preloader.useEffect': () => clearTimeout(t),
              }['Preloader.useEffect'];
            }
          },
        }['Preloader.useEffect'],
        [ready, onComplete, durationMs, reduced]
      );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'AnimatePresence'
        ],
        {
          children:
            show &&
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'motion'
              ].div,
              {
                className:
                  'fixed inset-0 z-50 grid place-items-center bg-linear-to-b from-background to-neutral ' +
                  (className ?? ''),
                initial: {
                  opacity: 1,
                  filter: 'blur(0px)',
                },
                exit: {
                  opacity: 0,
                  filter: 'blur(20px)',
                },
                transition: {
                  duration: reduced ? 0.3 : 1,
                  ease: [0.22, 1, 0.36, 1],
                },
                role: 'status',
                'aria-live': 'polite',
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'text-center text-text select-none',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'motion'
                        ].div,
                        {
                          className: 'mx-auto mb-10 h-24 w-24',
                          animate: reduced
                            ? {}
                            : {
                                y: [0, -12, 0],
                                opacity: [0.95, 1, 0.95],
                                filter: [
                                  `drop-shadow(0 0 15px ${primaryShadowColor})`,
                                  `drop-shadow(0 0 25px ${accentShadowColor})`,
                                  `drop-shadow(0 0 15px ${primaryShadowColor})`,
                                ],
                              },
                          transition: {
                            duration: 2.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          },
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            Ghost,
                            {},
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/ui/Preloader.tsx',
                              lineNumber: 112,
                              columnNumber: 15,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/src/components/ui/Preloader.tsx',
                          lineNumber: 91,
                          columnNumber: 13,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'motion'
                        ].p,
                        {
                          className:
                            'text-[14px] font-mono font-medium uppercase tracking-[0.35em] text-textSecondary mb-8',
                          animate: reduced
                            ? {}
                            : {
                                opacity: [0.7, 1, 0.7],
                              },
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          },
                          children: label.toUpperCase(),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/src/components/ui/Preloader.tsx',
                          lineNumber: 116,
                          columnNumber: 13,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className:
                            'mx-auto w-40 h-px bg-text/20 rounded-full overflow-hidden',
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'motion'
                            ].div,
                            {
                              className: 'h-full',
                              style: {
                                background: `linear-gradient(90deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__['BRAND'].colors.bluePrimary} 0%, ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__['BRAND'].colors.blueAccent} 100%)`,
                                boxShadow: `0 0 12px ${primaryShadowColor}`,
                              },
                              initial: {
                                width: '0%',
                              },
                              animate: {
                                width: '100%',
                              },
                              transition: {
                                duration: durationMs / 1000,
                                ease: 'easeInOut',
                              },
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/ui/Preloader.tsx',
                              lineNumber: 126,
                              columnNumber: 15,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/src/components/ui/Preloader.tsx',
                          lineNumber: 125,
                          columnNumber: 13,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/src/components/ui/Preloader.tsx',
                    lineNumber: 89,
                    columnNumber: 11,
                  },
                  this
                ),
              },
              void 0,
              false,
              {
                fileName: '[project]/src/components/ui/Preloader.tsx',
                lineNumber: 75,
                columnNumber: 9,
              },
              this
            ),
        },
        void 0,
        false,
        {
          fileName: '[project]/src/components/ui/Preloader.tsx',
          lineNumber: 73,
          columnNumber: 5,
        },
        this
      );
    }
    _s(Preloader, 'fKpG+JqVkwQcDtxi7GUeT4wLJX8=');
    _c = Preloader;
    function Ghost() {
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'svg',
        {
          viewBox: '0 0 512 512',
          className: 'w-full h-full',
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'path',
              {
                d: 'm508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z',
                fill: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'BRAND'
                ].colors.text,
                opacity: '0.95',
              },
              void 0,
              false,
              {
                fileName: '[project]/src/components/ui/Preloader.tsx',
                lineNumber: 150,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'circle',
              {
                cx: '208',
                cy: '225',
                r: '22',
                fill: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'BRAND'
                ].colors.neutral,
              },
              void 0,
              false,
              {
                fileName: '[project]/src/components/ui/Preloader.tsx',
                lineNumber: 155,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'circle',
              {
                cx: '297',
                cy: '225',
                r: '22',
                fill: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'BRAND'
                ].colors.neutral,
              },
              void 0,
              false,
              {
                fileName: '[project]/src/components/ui/Preloader.tsx',
                lineNumber: 156,
                columnNumber: 7,
              },
              this
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: '[project]/src/components/ui/Preloader.tsx',
          lineNumber: 149,
          columnNumber: 5,
        },
        this
      );
    }
    _c1 = Ghost;
    var _c, _c1;
    __turbopack_context__.k.register(_c, 'Preloader');
    __turbopack_context__.k.register(_c1, 'Ghost');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/canvas/home/hero/GhostSceneWrapper.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => GhostSceneWrapper]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      /*#__PURE__*/ __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)'
      );
    ('use client');
    const GhostScene = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
      'default'
    ])(
      () =>
        __turbopack_context__.A(
          '[project]/src/components/canvas/home/hero/GhostScene.tsx [app-client] (ecmascript, next/dynamic entry, async loader)'
        ),
      {
        loadableGenerated: {
          modules: [
            '[project]/src/components/canvas/home/hero/GhostScene.tsx [app-client] (ecmascript, next/dynamic entry)',
          ],
        },
        ssr: false,
        loading: () =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: 'absolute inset-0 w-full h-full bg-background',
            },
            void 0,
            false,
            {
              fileName:
                '[project]/src/components/canvas/home/hero/GhostSceneWrapper.tsx',
              lineNumber: 10,
              columnNumber: 7,
            },
            ('TURBOPACK compile-time value', void 0)
          ),
      }
    );
    _c = GhostScene;
    function GhostSceneWrapper() {
      const is3DDisabled =
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'default'
        ].env.NEXT_PUBLIC_DISABLE_3D === 'true';
      if (is3DDisabled) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'div',
          {
            className:
              'absolute inset-0 w-full h-full bg-zinc-900 border-dashed border-2 border-zinc-700',
          },
          void 0,
          false,
          {
            fileName:
              '[project]/src/components/canvas/home/hero/GhostSceneWrapper.tsx',
            lineNumber: 20,
            columnNumber: 7,
          },
          this
        );
      }
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        GhostScene,
        {},
        void 0,
        false,
        {
          fileName:
            '[project]/src/components/canvas/home/hero/GhostSceneWrapper.tsx',
          lineNumber: 24,
          columnNumber: 10,
        },
        this
      );
    }
    _c1 = GhostSceneWrapper;
    var _c, _c1;
    __turbopack_context__.k.register(_c, 'GhostScene');
    __turbopack_context__.k.register(_c1, 'GhostSceneWrapper');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/hooks/useGhostReveal.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['useGhostReveal', () => useGhostReveal]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    function useGhostReveal(ghostRef, revealRef, enabled) {
      _s();
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'useGhostReveal.useEffect': () => {
            if (!enabled || !ghostRef?.current || !revealRef.current) return;
            let rafId;
            const updateRevealPosition = {
              'useGhostReveal.useEffect.updateRevealPosition': () => {
                if (!ghostRef.current || !revealRef.current) return;
                const ghostPos = ghostRef.current.position;
                const overlay = revealRef.current;
                // Converte posição 3D world-space para coordenadas 2D viewport
                // Ghost se move aproximadamente de -10 a +10 em X e -7 a +7 em Y
                const x = ((ghostPos.x + 10) / 20) * 100; // Normaliza para 0-100%
                const y = ((ghostPos.y + 7) / 14) * 100; // Normaliza para 0-100%
                const invertedY = 100 - y;
                // Atualiza a posição do overlay usando CSS transform
                overlay.style.transform = `translate(calc(${x}vw - 50%), calc(${invertedY}vh - 50%))`;
                // Seta variáveis no documento/root para uso em classes CSS (ex: mask-image)
                document.documentElement.style.setProperty(
                  '--ghost-x',
                  `${x}vw`
                );
                document.documentElement.style.setProperty(
                  '--ghost-y',
                  `${invertedY}vh`
                );
                rafId = requestAnimationFrame(updateRevealPosition);
              },
            }['useGhostReveal.useEffect.updateRevealPosition'];
            // Inicia o loop de atualização
            rafId = requestAnimationFrame(updateRevealPosition);
            return {
              'useGhostReveal.useEffect': () => {
                if (rafId) cancelAnimationFrame(rafId);
              },
            }['useGhostReveal.useEffect'];
          },
        }['useGhostReveal.useEffect'],
        [ghostRef, revealRef, enabled]
      );
    }
    _s(useGhostReveal, 'OD7bBpZva5O2jO+Puf00hKivP7c=');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/hooks/useReducedMotion.ts [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s([
      'default',
      () => __TURBOPACK__default__export__,
      'useReducedMotion',
      () => useReducedMotion,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    function useReducedMotion() {
      _s();
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
    }
    _s(useReducedMotion, 'LYUSFdJBvBS2q/NhhYwDlftzut8=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
      ];
    });
    const __TURBOPACK__default__export__ = useReducedMotion;
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/hero/HeroCopy.module.css [app-client] (css module)',
  (__turbopack_context__) => {
    __turbopack_context__.v({
      baseText: 'HeroCopy-module__jwv1Aa__baseText',
      ctaSpacer: 'HeroCopy-module__jwv1Aa__ctaSpacer',
      ghostAura: 'HeroCopy-module__jwv1Aa__ghostAura',
      heroSubtitle: 'HeroCopy-module__jwv1Aa__heroSubtitle',
      heroTitle: 'HeroCopy-module__jwv1Aa__heroTitle',
      isLoaded: 'HeroCopy-module__jwv1Aa__isLoaded',
      maskLayer: 'HeroCopy-module__jwv1Aa__maskLayer',
      maskText: 'HeroCopy-module__jwv1Aa__maskText',
      root: 'HeroCopy-module__jwv1Aa__root',
      subText: 'HeroCopy-module__jwv1Aa__subText',
      tag: 'HeroCopy-module__jwv1Aa__tag',
    });
  },
  '[project]/src/components/home/hero/HeroCopy.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => HeroCopy]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/animation/hooks/use-animate.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$stagger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/motion-dom@12.34.5/node_modules/motion-dom/dist/es/utils/stagger.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/motion.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGhostReveal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useGhostReveal.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useReducedMotion.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/content.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/layout/Container.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/hero/HeroCopy.module.css [app-client] (css module)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    function HeroCopy({ ghostRef, isLoaded = true }) {
      _s();
      const revealRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const prefersReducedMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useReducedMotion'
      ])();
      const [scope, animate] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useAnimate'
      ])();
      // Sincroniza a posição do overlay 2D com o Ghost 3D
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGhostReveal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useGhostReveal'
      ])(ghostRef, revealRef, isLoaded && !prefersReducedMotion);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'HeroCopy.useEffect': () => {
            if (!prefersReducedMotion && isLoaded && scope.current) {
              animate(
                '.hero-line',
                {
                  y: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'MOTION_TOKENS'
                    ].offset.standard,
                    0,
                  ],
                  opacity: [0, 1],
                  filter: ['blur(10px)', 'blur(0px)'],
                },
                {
                  delay: (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$2d$dom$40$12$2e$34$2e$5$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$stagger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'stagger'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'MOTION_TOKENS'
                    ].stagger.normal
                  ),
                  duration: 1.2,
                  ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'GHOST_EASE'
                  ],
                }
              );
              animate(
                '.hero-subtitle',
                {
                  y: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'MOTION_TOKENS'
                    ].offset.standard,
                    0,
                  ],
                  opacity: [0, 1],
                },
                {
                  delay: 0.4,
                  duration:
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'MOTION_TOKENS'
                    ].duration.normal,
                  ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'GHOST_EASE'
                  ],
                }
              );
            }
          },
        }['HeroCopy.useEffect'],
        [prefersReducedMotion, isLoaded, animate, scope]
      );
      // Initial states for SSR and static render
      const initialStyles = prefersReducedMotion
        ? {}
        : {
            opacity: 0,
            translateY:
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'MOTION_TOKENS'
              ].offset.standard,
          };
      // Estrutura de conteúdo idêntica para ambas as camadas para garantir alinhamento perfeito
      const renderTextContent = (isMask) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Container'
          ],
          {
            className: isMask
              ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__[
                  'default'
                ].maskText
              : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__[
                  'default'
                ].baseText,
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className: 'flex flex-col items-center',
                children: [
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'HOME_CONTENT'
                  ].hero.tag &&
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'span',
                      {
                        className: `hero-line mb-4 md:mb-6 block ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__['default'].tag}`,
                        style: initialStyles,
                        'aria-hidden': 'true',
                        children:
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'HOME_CONTENT'
                          ].hero.tag,
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          '[project]/src/components/home/hero/HeroCopy.tsx',
                        lineNumber: 68,
                        columnNumber: 11,
                      },
                      this
                    ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      'aria-hidden': 'true',
                      className: `hidden md:block mb-20 font-display ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__['default'].heroTitle}`,
                      children:
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'HOME_CONTENT'
                        ].hero.titleDesktop.map((line, i) =>
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'default'
                            ].Fragment,
                            {
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'span',
                                  {
                                    className: `hero-line inline-block`,
                                    style: initialStyles,
                                    children: line,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/src/components/home/hero/HeroCopy.tsx',
                                    lineNumber: 84,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                                i <
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'HOME_CONTENT'
                                  ].hero.titleDesktop.length -
                                    1 &&
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'br',
                                    {},
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/src/components/home/hero/HeroCopy.tsx',
                                      lineNumber: 87,
                                      columnNumber: 65,
                                    },
                                    this
                                  ),
                              ],
                            },
                            `desktop-${i}`,
                            true,
                            {
                              fileName:
                                '[project]/src/components/home/hero/HeroCopy.tsx',
                              lineNumber: 83,
                              columnNumber: 13,
                            },
                            this
                          )
                        ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/src/components/home/hero/HeroCopy.tsx',
                      lineNumber: 78,
                      columnNumber: 9,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      'aria-hidden': 'true',
                      className: `md:hidden mb-12 font-display ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__['default'].heroTitle}`,
                      children:
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'HOME_CONTENT'
                        ].hero.titleMobile.map((line, i) =>
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'default'
                            ].Fragment,
                            {
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'span',
                                  {
                                    className: `hero-line inline-block`,
                                    style: initialStyles,
                                    children: line,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/src/components/home/hero/HeroCopy.tsx',
                                    lineNumber: 99,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                                i <
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'HOME_CONTENT'
                                  ].hero.titleMobile.length -
                                    1 &&
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'br',
                                    {},
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/src/components/home/hero/HeroCopy.tsx',
                                      lineNumber: 102,
                                      columnNumber: 64,
                                    },
                                    this
                                  ),
                              ],
                            },
                            `mobile-${i}`,
                            true,
                            {
                              fileName:
                                '[project]/src/components/home/hero/HeroCopy.tsx',
                              lineNumber: 98,
                              columnNumber: 13,
                            },
                            this
                          )
                        ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/src/components/home/hero/HeroCopy.tsx',
                      lineNumber: 93,
                      columnNumber: 9,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'p',
                    {
                      className: `hero-subtitle font-h2 type-h2 mt-6 lg:mt-9 text-textSecondary ${isMask ? '' : 'opacity-80'} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__['default'].heroSubtitle}`,
                      style: initialStyles,
                      children:
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'HOME_CONTENT'
                        ].hero.subtitle,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/src/components/home/hero/HeroCopy.tsx',
                      lineNumber: 108,
                      columnNumber: 9,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/src/components/home/hero/HeroCopy.tsx',
                lineNumber: 65,
                columnNumber: 7,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: '[project]/src/components/home/hero/HeroCopy.tsx',
            lineNumber: 64,
            columnNumber: 5,
          },
          this
        );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          ref: scope,
          // Ajuste de z-index do Hero garantindo contexto visual / stacking sobre o webGL (#ajustes-orquestrados)
          className: `relative z-10 flex flex-col items-center justify-center text-center w-full pointer-events-auto ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__['default'].root}`,
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'h1',
              {
                className: 'sr-only',
                children: [
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'HOME_CONTENT'
                  ].hero.tag
                    ? `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__['HOME_CONTENT'].hero.tag} `
                    : '',
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'HOME_CONTENT'
                  ].hero.title.join(' '),
                  ' ',
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'HOME_CONTENT'
                  ].hero.subtitle,
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/src/components/home/hero/HeroCopy.tsx',
                lineNumber: 124,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className: 'w-full flex flex-col items-center',
                children: renderTextContent(false),
              },
              void 0,
              false,
              {
                fileName: '[project]/src/components/home/hero/HeroCopy.tsx',
                lineNumber: 130,
                columnNumber: 7,
              },
              this
            ),
            !prefersReducedMotion &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'div',
                {
                  className:
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__[
                      'default'
                    ].maskLayer,
                  'aria-hidden': 'true',
                  children: /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      className:
                        'w-full flex flex-col items-center text-center',
                      children: renderTextContent(true),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/src/components/home/hero/HeroCopy.tsx',
                      lineNumber: 137,
                      columnNumber: 11,
                    },
                    this
                  ),
                },
                void 0,
                false,
                {
                  fileName: '[project]/src/components/home/hero/HeroCopy.tsx',
                  lineNumber: 136,
                  columnNumber: 9,
                },
                this
              ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                ref: revealRef,
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__['default'].ghostAura} ${isLoaded ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__['default'].isLoaded : ''}`,
              },
              void 0,
              false,
              {
                fileName: '[project]/src/components/home/hero/HeroCopy.tsx',
                lineNumber: 144,
                columnNumber: 7,
              },
              this
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: '[project]/src/components/home/hero/HeroCopy.tsx',
          lineNumber: 119,
          columnNumber: 5,
        },
        this
      );
    }
    _s(HeroCopy, 'AhlDDYSoScQ0l9k0BY7Y9UfrSoM=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useReducedMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useReducedMotion'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$hooks$2f$use$2d$animate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useAnimate'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGhostReveal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useGhostReveal'
        ],
      ];
    });
    _c = HeroCopy;
    var _c;
    __turbopack_context__.k.register(_c, 'HeroCopy');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/ui/AntigravityCTA.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/brand.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/utils.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const AntigravityCTA = ({
      text = "let's build something great",
      href = '/',
      onClick,
      color, // Mobile: bottom-20 para evitar gesture bar, right-4 para edge comfort
      // Desktop: posição original
      className = 'fixed bottom-20 right-4 sm:bottom-12 sm:right-8 lg:bottom-12 lg:right-12 z-100 md:z-50',
      as = 'a',
      type,
    }) => {
      _s();
      // State para controlar hover
      const [isHovered, setIsHovered] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      const iconRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const Component =
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'motion'
        ][as];
      const reduceMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      // Spring physics config
      const springTransition = {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      };
      // Variantes do ícone seguindo Ghost Motion (sem rotate/scale)
      const arrowVariants = {
        initial: {
          y: 0,
          opacity: 0.92,
        },
        hover: {
          y: -3,
          opacity: 1,
        },
      };
      // Variantes de animação do botão completo (Ghost Era Specification)
      const buttonVariants = {
        initial: {
          y: 0,
        },
        hover: {
          y: -1,
        },
      };
      const mainColor =
        color ||
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'BRAND'
        ].colors.bluePrimary; // Default Blue
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        Component,
        {
          href: as === 'a' ? href : undefined,
          type: as === 'button' ? type : undefined,
          onClick: onClick,
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'cn'
          ])(
            'relative group',
            'cta-button',
            'inline-flex items-center',
            'cursor-pointer',
            'min-w-fit',
            'rounded-full',
            'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-bluePrimary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            className
          ),
          onHoverStart: () => setIsHovered(true),
          onHoverEnd: () => setIsHovered(false),
          variants: buttonVariants,
          initial: 'initial',
          animate: isHovered ? 'hover' : 'initial',
          transition: reduceMotion
            ? {
                duration: 0,
              }
            : {
                duration: 0.2,
                ease: [0, 0, 0.2, 1],
              },
          role: 'button',
          tabIndex: 0,
          'aria-label': `${text} - Clique para acessar`,
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'motion'
              ].div,
              {
                className:
                  'absolute inset-0 rounded-full blur-2xl opacity-0 pointer-events-none',
                style: {
                  backgroundColor: 'var(--color-purpleDetails)',
                },
                animate: {
                  opacity: isHovered ? 0.2 : 0,
                },
                transition: reduceMotion
                  ? {
                      duration: 0,
                    }
                  : springTransition,
              },
              void 0,
              false,
              {
                fileName: '[project]/src/components/ui/AntigravityCTA.tsx',
                lineNumber: 114,
                columnNumber: 7,
              },
              ('TURBOPACK compile-time value', void 0)
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'motion'
              ].div,
              {
                className:
                  ' relative z-10  flex items-center justify-center  h-12 sm:h-14 lg:h-[68px] pl-5 pr-4 sm:pl-8 sm:pr-6 lg:pl-10 lg:pr-8 w-[220px] sm:w-[280px] lg:w-[340px] text-white  shadow-lg rounded-full select-none transition-colors duration-200 active:translate-y-px will-change-transform ',
                style: {
                  backgroundColor: mainColor,
                },
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'span',
                  {
                    className:
                      'text-sm sm:text-base lg:text-lg font-medium tracking-wide sm:tracking-wider whitespace-nowrap leading-none font-sans',
                    children: text,
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/src/components/ui/AntigravityCTA.tsx',
                    lineNumber: 143,
                    columnNumber: 9,
                  },
                  ('TURBOPACK compile-time value', void 0)
                ),
              },
              void 0,
              false,
              {
                fileName: '[project]/src/components/ui/AntigravityCTA.tsx',
                lineNumber: 124,
                columnNumber: 7,
              },
              ('TURBOPACK compile-time value', void 0)
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'motion'
              ].div,
              {
                ref: iconRef,
                className:
                  ' relative z-20  flex items-center justify-center  h-12 w-12 sm:h-14 sm:w-14 lg:h-[68px] lg:w-[68px] -ml-0.5 sm:-ml-1 text-white  shadow-lg rounded-full transition-colors duration-200 active:translate-y-px will-change-transform ',
                style: {
                  // Circle becomes Purple on hover, otherwise matches Pill
                  backgroundColor: isHovered
                    ? 'var(--color-purpleDetails)'
                    : mainColor,
                },
                variants: arrowVariants,
                initial: 'initial',
                animate: isHovered ? 'hover' : 'initial',
                transition: reduceMotion
                  ? {
                      duration: 0,
                    }
                  : springTransition,
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__[
                    'ArrowUpRight'
                  ],
                  {
                    className: 'w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7',
                    strokeWidth: 2.5,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/src/components/ui/AntigravityCTA.tsx',
                    lineNumber: 172,
                    columnNumber: 9,
                  },
                  ('TURBOPACK compile-time value', void 0)
                ),
              },
              void 0,
              false,
              {
                fileName: '[project]/src/components/ui/AntigravityCTA.tsx',
                lineNumber: 149,
                columnNumber: 7,
              },
              ('TURBOPACK compile-time value', void 0)
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: '[project]/src/components/ui/AntigravityCTA.tsx',
          lineNumber: 82,
          columnNumber: 5,
        },
        ('TURBOPACK compile-time value', void 0)
      );
    };
    _s(AntigravityCTA, 's/1XgGNO4bmih4zdBsG+0uvjPEA=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
      ];
    });
    _c = AntigravityCTA;
    const __TURBOPACK__default__export__ = AntigravityCTA;
    var _c;
    __turbopack_context__.k.register(_c, 'AntigravityCTA');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/hero/HeroCTA.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => HeroCTA]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AntigravityCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/ui/AntigravityCTA.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/content.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/motion.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const itemAnimation = {
      initial: {
        opacity: 0,
        y: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'MOTION_TOKENS'
        ].offset.standard,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration:
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'MOTION_TOKENS'
            ].duration.normal,
          ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'GHOST_EASE'
          ],
          delay: 1.0,
        },
      },
    };
    function HeroCTA() {
      _s();
      const shouldReduceMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      // isLoaded check removed for immediate LCP
      // if (!isLoaded) return null;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'motion'
        ].div,
        {
          initial: shouldReduceMotion
            ? {
                opacity: 1,
                y: 0,
              }
            : 'initial',
          animate: shouldReduceMotion
            ? {
                opacity: 1,
                y: 0,
              }
            : 'animate',
          variants: itemAnimation,
          className: 'flex justify-center pointer-events-auto',
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AntigravityCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'default'
            ],
            {
              href: '/sobre',
              text: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'HOME_CONTENT'
              ].hero.cta,
              className: 'relative',
            },
            void 0,
            false,
            {
              fileName: '[project]/src/components/home/hero/HeroCTA.tsx',
              lineNumber: 36,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName: '[project]/src/components/home/hero/HeroCTA.tsx',
          lineNumber: 30,
          columnNumber: 5,
        },
        this
      );
    }
    _s(HeroCTA, '0hcmn0bfQ86uQqRHw+VXI3mzoF8=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
      ];
    });
    _c = HeroCTA;
    var _c;
    __turbopack_context__.k.register(_c, 'HeroCTA');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/hero/HomeHero.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => HomeHero]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Preloader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/ui/Preloader.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$GhostSceneWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/canvas/home/hero/GhostSceneWrapper.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/hero/HeroCopy.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/hero/HeroCTA.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMediaQuery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMediaQuery.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebGLSupport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useWebGLSupport.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const CONFIG = {
      // Aumentado levemente para evitar flicker e permitir percepção da atmosfera.
      preloadMs: 500,
    };
    function HomeHero() {
      _s();
      const heroRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const [isLoaded, setIsLoaded] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      const isDesktop = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMediaQuery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMediaQuery'
      ])('(min-width: 1024px)');
      const supportsWebGL = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebGLSupport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useWebGLSupport'
      ])();
      // `shouldReduceMotion` agora controla tanto a preferência do usuário quanto a flag global
      const shouldReduceMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      // Só renderiza WebGL se suportado E se não houver preferência por movimento reduzido
      const shouldRenderWebGL = supportsWebGL && !shouldReduceMotion;
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'HomeHero.useEffect': () => {
            // Timer apenas para coordenar a entrada das animações, não para carregar assets
            const timer = setTimeout(
              {
                'HomeHero.useEffect.timer': () => setIsLoaded(true),
              }['HomeHero.useEffect.timer'],
              CONFIG.preloadMs
            );
            return {
              'HomeHero.useEffect': () => clearTimeout(timer),
            }['HomeHero.useEffect'];
          },
        }['HomeHero.useEffect'],
        []
      );
      const handlePreloaderDone = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useCallback'
      ])(
        {
          'HomeHero.useCallback[handlePreloaderDone]': () => setIsLoaded(true),
        }['HomeHero.useCallback[handlePreloaderDone]'],
        []
      );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'Fragment'
        ],
        {
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'section',
            {
              id: 'hero',
              'data-testid': 'home-hero',
              ref: heroRef,
              className:
                'relative w-full min-h-[100svh] bg-background overflow-hidden isolate z-[var(--z-layer-base)]',
              'aria-label': 'Portfolio Hero Section',
              children: [
                (!isDesktop || shouldReduceMotion) &&
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      className: `absolute inset-0 z-[var(--z-layer-base)] opacity-60 bg-[radial-gradient(circle_at_50%_50%,#0a0029_0%,#040013_70%)] ${shouldReduceMotion ? '' : 'animate-pulse'}`,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/src/components/home/hero/HomeHero.tsx',
                      lineNumber: 52,
                      columnNumber: 11,
                    },
                    this
                  ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'AnimatePresence'
                  ],
                  {
                    children:
                      !isLoaded &&
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Preloader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'Preloader'
                        ],
                        {
                          durationMs: CONFIG.preloadMs,
                          onComplete: handlePreloaderDone,
                          label: 'Initializing Experience',
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/src/components/home/hero/HomeHero.tsx',
                          lineNumber: 62,
                          columnNumber: 13,
                        },
                        this
                      ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/src/components/home/hero/HomeHero.tsx',
                    lineNumber: 60,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className:
                      'absolute inset-0 z-[var(--z-layer-content)] pointer-events-none',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className:
                          'flex items-center justify-center w-full h-[100svh] md:h-screen md:sticky md:top-0',
                        children: /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className:
                              'w-full pointer-events-auto pb-32 md:pb-0',
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCopy$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'default'
                              ],
                              {
                                isLoaded: isLoaded,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/hero/HomeHero.tsx',
                                lineNumber: 75,
                                columnNumber: 15,
                              },
                              this
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/hero/HomeHero.tsx',
                            lineNumber: 73,
                            columnNumber: 13,
                          },
                          this
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          '[project]/src/components/home/hero/HomeHero.tsx',
                        lineNumber: 72,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/src/components/home/hero/HomeHero.tsx',
                    lineNumber: 71,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className:
                      'absolute inset-0 z-[var(--z-layer-3d)] pointer-events-none overflow-hidden',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className: 'sticky top-0 h-[100svh] md:h-screen w-full',
                        children: shouldRenderWebGL
                          ? /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$home$2f$hero$2f$GhostSceneWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'default'
                              ],
                              {},
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/hero/HomeHero.tsx',
                                lineNumber: 85,
                                columnNumber: 15,
                              },
                              this
                            )
                          : /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className:
                                  'absolute inset-0 z-[var(--z-layer-base)] opacity-20 bg-[radial-gradient(circle_at_50%_50%,#0a0029_0%,#040013_70%)]',
                                'aria-hidden': 'true',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/hero/HomeHero.tsx',
                                lineNumber: 87,
                                columnNumber: 15,
                              },
                              this
                            ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          '[project]/src/components/home/hero/HomeHero.tsx',
                        lineNumber: 83,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/src/components/home/hero/HomeHero.tsx',
                    lineNumber: 82,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className:
                      'absolute inset-0 z-[var(--z-layer-cta)] pointer-events-none',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className:
                          'relative h-full w-full flex items-end justify-center pb-[5%]',
                        children: /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className: 'pointer-events-auto',
                            children:
                              isLoaded &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$hero$2f$HeroCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'default'
                                ],
                                {},
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/home/hero/HomeHero.tsx',
                                  lineNumber: 98,
                                  columnNumber: 63,
                                },
                                this
                              ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/hero/HomeHero.tsx',
                            lineNumber: 98,
                            columnNumber: 13,
                          },
                          this
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          '[project]/src/components/home/hero/HomeHero.tsx',
                        lineNumber: 97,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/src/components/home/hero/HomeHero.tsx',
                    lineNumber: 96,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'sr-only',
                    children:
                      'Decorative animation of a floating spectral ghost with glowing particles following your cursor.',
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/src/components/home/hero/HomeHero.tsx',
                    lineNumber: 102,
                    columnNumber: 9,
                  },
                  this
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/src/components/home/hero/HomeHero.tsx',
              lineNumber: 43,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false
      );
    }
    _s(HomeHero, 'qgrOwNMFzVF76hCXlWpYCJ58iME=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMediaQuery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMediaQuery'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebGLSupport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useWebGLSupport'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
      ];
    });
    _c = HomeHero;
    var _c;
    __turbopack_context__.k.register(_c, 'HomeHero');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['CategoryStripe', () => CategoryStripe]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/image.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/lucide-react@0.576.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/utils.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/motion.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/video.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    // ... (GHOST_SPRING, Category interface, etc.)
    const GHOST_SPRING = {
      damping: 30,
      stiffness: 200,
      mass: 1,
    };
    function CategoryStripe({
      category,
      index,
      isHovered,
      onHover,
      prefersReducedMotion,
    }) {
      _s();
      const title = Array.isArray(category.title)
        ? category.title
        : [category.title];
      const stripeRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const { scrollYProgress } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useScroll'
      ])({
        target: stripeRef,
        offset: ['start end', 'end start'],
      });
      const smoothProgress = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useSpring'
      ])(scrollYProgress, GHOST_SPRING);
      const parallaxY = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useTransform'
      ])(smoothProgress, [0, 1], [-20, 20]);
      const isVideo = category.thumbnail.endsWith('.mp4');
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'motion'
        ].div,
        {
          ref: stripeRef,
          initial: prefersReducedMotion
            ? {
                opacity: 1,
              }
            : {
                opacity: 0,
                y: 24,
              },
          whileInView: {
            opacity: 1,
            y: 0,
          },
          viewport:
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'viewportConfig'
            ],
          transition: {
            duration: 0.8,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'GHOST_EASE'
            ],
            delay: index * 0.12,
          },
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'default'
            ],
            {
              href: `/portfolio?category=${category.slug}`,
              className: 'block group',
              onMouseEnter: () => onHover(category.id),
              onMouseLeave: () => onHover(null),
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'cn'
                    ])(
                      'hidden lg:flex items-center py-8 border-t border-blueAccent/40 transition-all duration-300',
                      category.alignment === 'right' && 'justify-end',
                      category.alignment === 'center' && 'justify-center',
                      category.alignment === 'left' && 'justify-start',
                      isHovered ? 'gap-10' : 'gap-6'
                    ),
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'motion'
                        ].div,
                        {
                          className:
                            'relative overflow-hidden rounded-lg shrink-0',
                          initial: false,
                          animate: {
                            width: isHovered ? 288 : 0,
                            opacity: isHovered ? 1 : 0,
                          },
                          transition: {
                            duration: 0.7,
                            ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'GHOST_EASE'
                            ],
                          },
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'div',
                            {
                              className: 'relative w-[288px] aspect-video',
                              children: /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'motion'
                                ].div,
                                {
                                  style: {
                                    y: prefersReducedMotion ? 0 : parallaxY,
                                  },
                                  className: 'absolute inset-0 w-full h-[120%]',
                                  children: isVideo
                                    ? /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'video',
                                        {
                                          src: category.thumbnail,
                                          autoPlay: true,
                                          loop: true,
                                          muted: true,
                                          playsInline: true,
                                          poster:
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'DEFAULT_VIDEO_POSTER'
                                            ],
                                          className:
                                            'object-cover w-full h-full',
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'track',
                                            {
                                              kind: 'captions',
                                              src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'DEFAULT_CAPTIONS'
                                              ],
                                              srcLang: 'pt-BR',
                                              label: 'Português',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                                              lineNumber: 109,
                                              columnNumber: 21,
                                            },
                                            this
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                                          lineNumber: 100,
                                          columnNumber: 19,
                                        },
                                        this
                                      )
                                    : /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'default'
                                        ],
                                        {
                                          src: category.thumbnail,
                                          alt: title.join(' '),
                                          fill: true,
                                          className: 'object-cover',
                                          sizes: '288px',
                                          loading: 'lazy',
                                          priority: false,
                                          onError:
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'applyImageFallback'
                                            ],
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                                          lineNumber: 117,
                                          columnNumber: 19,
                                        },
                                        this
                                      ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                                  lineNumber: 95,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                              lineNumber: 94,
                              columnNumber: 13,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                          lineNumber: 82,
                          columnNumber: 11,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'flex items-center gap-4',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: 'flex flex-col',
                                children: title.map((line, i) =>
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'span',
                                    {
                                      className: (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'cn'
                                      ])(
                                        'text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight transition-colors duration-300',
                                        isHovered
                                          ? 'text-bluePrimary'
                                          : 'text-white'
                                      ),
                                      children: line,
                                    },
                                    i,
                                    false,
                                    {
                                      fileName:
                                        '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                                      lineNumber: 135,
                                      columnNumber: 17,
                                    },
                                    this
                                  )
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                                lineNumber: 133,
                                columnNumber: 13,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'motion'
                              ].div,
                              {
                                className:
                                  'w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300',
                                initial: false,
                                animate: {
                                  y: isHovered ? -1 : 0,
                                  backgroundColor: isHovered
                                    ? '#8705f2'
                                    : '#0048ff',
                                },
                                transition: {
                                  duration: 0.5,
                                  ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'GHOST_EASE'
                                  ],
                                },
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__[
                                    'ArrowUpRight'
                                  ],
                                  {
                                    className:
                                      'w-4 h-4 lg:w-5 lg:h-5 text-white',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                                    lineNumber: 159,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                                lineNumber: 147,
                                columnNumber: 13,
                              },
                              this
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                          lineNumber: 132,
                          columnNumber: 11,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                    lineNumber: 73,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className:
                      'lg:hidden flex flex-col gap-6 py-8 border-t border-blueAccent/40 active:bg-white/5 transition-colors duration-200 rounded-lg -mx-2 px-4',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className: 'flex items-center justify-between gap-4',
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'div',
                            {
                              className: 'flex flex-col flex-1',
                              children: title.map((line, i) =>
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'span',
                                  {
                                    className:
                                      'text-lg sm:text-xl font-medium tracking-tight text-white leading-tight',
                                    children: line,
                                  },
                                  i,
                                  false,
                                  {
                                    fileName:
                                      '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                                    lineNumber: 170,
                                    columnNumber: 17,
                                  },
                                  this
                                )
                              ),
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                              lineNumber: 168,
                              columnNumber: 13,
                            },
                            this
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'div',
                            {
                              className:
                                'w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-bluePrimary active:bg-purpleDetails transition-all duration-200',
                              children: /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$576$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__[
                                  'ArrowUpRight'
                                ],
                                {
                                  className: 'w-5 h-5 text-white',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                                  lineNumber: 180,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                              lineNumber: 179,
                              columnNumber: 13,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName:
                          '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                        lineNumber: 167,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
                    lineNumber: 165,
                    columnNumber: 9,
                  },
                  this
                ),
              ],
            },
            void 0,
            true,
            {
              fileName:
                '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
              lineNumber: 66,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName:
            '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx',
          lineNumber: 55,
          columnNumber: 5,
        },
        this
      );
    }
    _s(CategoryStripe, '91bLpXgwi+8cl2QMvHxmTj3doE8=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useScroll'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useSpring'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useTransform'
        ],
      ];
    });
    _c = CategoryStripe;
    var _c;
    __turbopack_context__.k.register(_c, 'CategoryStripe');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => PortfolioShowcase]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AntigravityCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/ui/AntigravityCTA.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/layout/Container.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$portfolio$2d$showcase$2f$CategoryStripe$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/components/home/portfolio-showcase/CategoryStripe.tsx [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/utils.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/motion.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    // Category data with assets
    const CATEGORIES = [
      {
        id: 'brand-campaigns',
        title: 'Brand & Campaigns',
        slug: 'branding',
        thumbnail: (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'getAssetUrl'
        ])('site-assets/home/showcase/Branding-Project.webp'),
        alignment: 'right',
        showLabel: true,
      },
      {
        id: 'videos-motions',
        title: 'Videos & Motions',
        slug: 'motion',
        thumbnail: (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'getAssetUrl'
        ])('site-assets/home/showcase/show.video.mp4'),
        alignment: 'center',
        showLabel: false,
      },
      {
        id: 'web-tech',
        title: 'Websites & Tech',
        slug: 'web',
        // GIF substituído por frame estático WebP para reduzir LCP e peso inicial
        thumbnail: (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'getAssetUrl'
        ])('site-assets/home/showcase/Branding-Project.webp'),
        alignment: 'left',
        showLabel: false,
      },
    ];
    function PortfolioShowcase() {
      _s();
      const sectionRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const [hoveredCategory, setHoveredCategory] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(null);
      const prefersReducedMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'section',
        {
          id: 'portfolio-showcase',
          ref: sectionRef,
          className: 'relative w-full bg-background py-20 lg:py-32',
          'aria-labelledby': 'portfolio-showcase-heading',
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'Container'
            ],
            {
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'motion'
                  ].header,
                  {
                    initial: prefersReducedMotion
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                          y: 30,
                        },
                    whileInView: {
                      opacity: 1,
                      y: 0,
                    },
                    viewport:
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'viewportConfig'
                      ],
                    transition: {
                      duration: 0.7,
                      ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'GHOST_EASE'
                      ],
                    },
                    className: 'text-center mb-16 lg:mb-20',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'h2',
                      {
                        id: 'portfolio-showcase-heading',
                        className:
                          'text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none',
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'span',
                            {
                              className:
                                'text-bluePrimary italic font-light block sm:inline',
                              children: ['portfólio', ' '],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx',
                              lineNumber: 72,
                              columnNumber: 13,
                            },
                            this
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'span',
                            {
                              className: 'text-white font-bold block sm:inline',
                              children: 'showcase',
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx',
                              lineNumber: 75,
                              columnNumber: 13,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName:
                          '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx',
                        lineNumber: 68,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx',
                    lineNumber: 59,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'relative flex flex-col',
                    children: [
                      CATEGORIES.map((category, index) =>
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$portfolio$2d$showcase$2f$CategoryStripe$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'CategoryStripe'
                          ],
                          {
                            category: category,
                            index: index,
                            isHovered: hoveredCategory === category.id,
                            onHover: setHoveredCategory,
                            prefersReducedMotion: prefersReducedMotion,
                          },
                          category.id,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx',
                            lineNumber: 84,
                            columnNumber: 13,
                          },
                          this
                        )
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'border-t border-blueAccent/40',
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx',
                          lineNumber: 95,
                          columnNumber: 11,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx',
                    lineNumber: 82,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'motion'
                  ].div,
                  {
                    initial: prefersReducedMotion
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                          y: 20,
                        },
                    whileInView: {
                      opacity: 1,
                      y: 0,
                    },
                    viewport:
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'viewportConfig'
                      ],
                    transition: {
                      duration: 0.6,
                      ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'GHOST_EASE'
                      ],
                      delay: 0.4,
                    },
                    className: 'flex justify-center mt-12 lg:mt-16',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AntigravityCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'default'
                      ],
                      {
                        href: '/#contact',
                        text: "let's build something great",
                        className: 'relative',
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx',
                        lineNumber: 108,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx',
                    lineNumber: 99,
                    columnNumber: 9,
                  },
                  this
                ),
              ],
            },
            void 0,
            true,
            {
              fileName:
                '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx',
              lineNumber: 57,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName:
            '[project]/src/components/home/portfolio-showcase/PortfolioShowcase.tsx',
          lineNumber: 51,
          columnNumber: 5,
        },
        this
      );
    }
    _s(PortfolioShowcase, '/bDpuIYJO1KcdBm0XP0ah5cLTZA=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
      ];
    });
    _c = PortfolioShowcase;
    var _c;
    __turbopack_context__.k.register(_c, 'PortfolioShowcase');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/src/components/home/hero/VideoManifesto.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['VideoManifesto', () => VideoManifesto]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_@playwright+test@1.58.2_react-d_2884e55c18333d436dfed79a72263e38/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/.pnpm/framer-motion@12.34.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/config/motion.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useMotionGate.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRealtimeAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/hooks/useRealtimeAssets.ts [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/src/lib/video.ts [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature(),
      _s1 = __turbopack_context__.k.signature();
    ('use client');
    const VIDEO_EXTENSIONS_REGEX = /\.(mp4|webm|mov|m4v)(?:[?#].*)?$/i;
    const isLikelyVideoUrl = (url) => {
      if (!url) return false;
      if (url.startsWith('blob:') || url.startsWith('data:video/')) return true;
      return VIDEO_EXTENSIONS_REGEX.test(url);
    };
    /** SSR-safe breakpoint hook — returns true when viewport is ≤ 767px (mobile) */ function useIsMobile() {
      _s();
      const [isMobile, setIsMobile] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'useIsMobile.useEffect': () => {
            const mql = window.matchMedia('(max-width: 767px)');
            const handler = {
              'useIsMobile.useEffect.handler': (e) => setIsMobile(e.matches),
            }['useIsMobile.useEffect.handler'];
            setIsMobile(mql.matches);
            mql.addEventListener('change', handler);
            return {
              'useIsMobile.useEffect': () =>
                mql.removeEventListener('change', handler),
            }['useIsMobile.useEffect'];
          },
        }['useIsMobile.useEffect'],
        []
      );
      return isMobile;
    }
    _s(useIsMobile, '0VTTNJATKABQPGLm9RVT0tKGUgU=');
    function VideoManifesto({
      src,
      srcMobile,
      posterDesk,
      posterMobile,
      assetKey,
      assetKeyMobile,
    }) {
      _s1();
      const { asset } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRealtimeAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRealtimeAsset'
      ])(assetKey || '');
      const { asset: assetMobile } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRealtimeAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRealtimeAsset'
      ])(assetKeyMobile || '');
      const [muted, setMuted] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(true);
      const [videoQuality, setVideoQuality] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])('hd');
      const shouldReduceMotion = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useMotionGate'
      ])();
      const [mounted, setMounted] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      const isMobile = useIsMobile();
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'VideoManifesto.useEffect': () => {
            setMounted(true);
          },
        }['VideoManifesto.useEffect'],
        []
      );
      const sectionRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const wrapperRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      const videoRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      // Mutar sempre por padrão; som só habilita via ação explícita do usuário (botão)
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'VideoManifesto.useEffect': () => {
            if (!sectionRef.current) return;
            const observer = new IntersectionObserver(
              {
                'VideoManifesto.useEffect': ([entry]) => {
                  if (!entry.isIntersecting) {
                    setMuted(true);
                  }
                },
              }['VideoManifesto.useEffect'],
              {
                threshold: 0.5,
              }
            );
            observer.observe(sectionRef.current);
            return {
              'VideoManifesto.useEffect': () => observer.disconnect(),
            }['VideoManifesto.useEffect'];
          },
        }['VideoManifesto.useEffect'],
        []
      );
      // Detectar qualidade de conexão
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'VideoManifesto.useEffect': () => {
            const nav = navigator;
            if (nav.connection) {
              if (
                nav.connection.effectiveType === '4g' ||
                nav.connection.effectiveType === '5g'
              ) {
                setVideoQuality('hd');
              } else {
                setVideoQuality('sd');
              }
            }
          },
        }['VideoManifesto.useEffect'],
        []
      );
      // Aplicar mute
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'VideoManifesto.useEffect': () => {
            if (!videoRef.current) return;
            videoRef.current.muted = muted;
          },
        }['VideoManifesto.useEffect'],
        [muted]
      );
      // ── Resolução da fonte de vídeo (desktop) ──────────────────────────────────
      const baseSrcDesk =
        mounted && isLikelyVideoUrl(asset?.publicUrl) ? asset?.publicUrl : src;
      // ── Resolução da fonte de vídeo (mobile) ──────────────────────────────────
      const baseSrcMobile =
        mounted && isLikelyVideoUrl(assetMobile?.publicUrl)
          ? assetMobile?.publicUrl
          : (srcMobile ?? src);
      // Escolhe a fonte correta para o dispositivo atual
      const activeSrc = isMobile ? baseSrcMobile : baseSrcDesk;
      const [currentSrc, setCurrentSrc] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(activeSrc);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'VideoManifesto.useEffect': () => {
            setCurrentSrc(activeSrc);
          },
        }['VideoManifesto.useEffect'],
        [activeSrc]
      );
      // Usa SD somente se existir um variant explícito em metadata; evita 404 silencioso.
      const sdVariant = asset?.metadata?.variants?.sd;
      const variantSrc =
        mounted && videoQuality === 'sd' && isLikelyVideoUrl(sdVariant)
          ? sdVariant
          : currentSrc;
      const videoSrc = variantSrc;
      // ── Posters responsivos ────────────────────────────────────────────────────
      // Prioridade: poster explícito via props > DEFAULT_VIDEO_POSTER
      const activePoster = isMobile
        ? (posterMobile ??
          posterDesk ??
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'DEFAULT_VIDEO_POSTER'
          ])
        : (posterDesk ??
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$video$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'DEFAULT_VIDEO_POSTER'
          ]);
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$34$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'motion'
        ].section,
        {
          ref: sectionRef,
          className: 'video-manifesto w-full overflow-hidden rounded-[2px]',
          initial: shouldReduceMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                y: 18,
              },
          whileInView: shouldReduceMotion
            ? {
                opacity: 1,
              }
            : {
                opacity: 1,
                y: 0,
              },
          transition: shouldReduceMotion
            ? {
                duration: 0.2,
              }
            : {
                duration: 1.2,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'GHOST_EASE'
                ],
              },
          viewport:
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'viewportConfig'
            ],
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              ref: wrapperRef,
              // Change aspect ratio handling to allow natural height on mobile without cutting
              className: 'video-wrapper relative w-full bg-black/5',
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'video',
                  {
                    ref: videoRef,
                    className:
                      'w-full h-auto sm:aspect-video sm:object-cover block',
                    src: videoSrc,
                    poster: activePoster,
                    autoPlay: !shouldReduceMotion,
                    loop: !shouldReduceMotion,
                    muted: muted,
                    playsInline: true,
                    // Let the browser handle preloading metadata
                    preload: 'metadata',
                    onError: () => {
                      if (videoSrc !== src) {
                        setCurrentSrc(src);
                      }
                    },
                    'aria-label':
                      'Vídeo showreel demonstrando projetos de design gráfico',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'track',
                      {
                        kind: 'captions',
                        src: '/captions/ambient.vtt',
                        srcLang: 'pt-BR',
                        label: 'Português',
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          '[project]/src/components/home/hero/VideoManifesto.tsx',
                        lineNumber: 184,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/home/hero/VideoManifesto.tsx',
                    lineNumber: 166,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className:
                      'absolute inset-0 bg-background/15 pointer-events-none',
                    'aria-hidden': 'true',
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/home/hero/VideoManifesto.tsx',
                    lineNumber: 193,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'button',
                  {
                    type: 'button',
                    className:
                      'toggle-sound absolute top-3 right-3 h-14 w-14 sm:h-12 sm:w-12 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors focus-visible:outline-2 focus-visible:outline-[#0048ff] focus-visible:outline-offset-2',
                    onClick: () => setMuted((m) => !m),
                    'aria-label': muted
                      ? 'Ativar som do vídeo'
                      : 'Desativar som do vídeo',
                    'aria-pressed': !muted,
                    children: muted
                      ? /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'svg',
                          {
                            className: 'w-5 h-5',
                            fill: 'none',
                            viewBox: '0 0 24 24',
                            stroke: 'currentColor',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'path',
                                {
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  strokeWidth: 2,
                                  d: 'M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/home/hero/VideoManifesto.tsx',
                                  lineNumber: 213,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'path',
                                {
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  strokeWidth: 2,
                                  d: 'M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/src/components/home/hero/VideoManifesto.tsx',
                                  lineNumber: 219,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              '[project]/src/components/home/hero/VideoManifesto.tsx',
                            lineNumber: 207,
                            columnNumber: 13,
                          },
                          this
                        )
                      : /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'svg',
                          {
                            className: 'w-5 h-5',
                            fill: 'none',
                            viewBox: '0 0 24 24',
                            stroke: 'currentColor',
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$2_react$2d$d_2884e55c18333d436dfed79a72263e38$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'path',
                              {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: 2,
                                d: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/src/components/home/hero/VideoManifesto.tsx',
                                lineNumber: 233,
                                columnNumber: 15,
                              },
                              this
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/src/components/home/hero/VideoManifesto.tsx',
                            lineNumber: 227,
                            columnNumber: 13,
                          },
                          this
                        ),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/src/components/home/hero/VideoManifesto.tsx',
                    lineNumber: 199,
                    columnNumber: 9,
                  },
                  this
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/src/components/home/hero/VideoManifesto.tsx',
              lineNumber: 161,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName: '[project]/src/components/home/hero/VideoManifesto.tsx',
          lineNumber: 149,
          columnNumber: 5,
        },
        this
      );
    }
    _s1(VideoManifesto, 'qUvdGJY9Z3uo5Y27b0l9ZFUbUyw=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRealtimeAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useRealtimeAsset'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRealtimeAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useRealtimeAsset'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMotionGate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'useMotionGate'
        ],
        useIsMobile,
      ];
    });
    _c = VideoManifesto;
    var _c;
    __turbopack_context__.k.register(_c, 'VideoManifesto');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
]);

//# sourceMappingURL=src_8efe2429._.js.map

# **Auditoria Técnica de UX, UI, Performance, SEO e Acessibilidade**

**portfoliodanilo.com \+ PORTFOLIO-DANILO-FINAL**

Data da auditoria: 22 de setembro de 2026 | Stack observada: Next.js 16.2.7, React 19.2.7, Tailwind CSS 4.3, Motion, GSAP, Lenis, Three.js/R3F, Supabase, Playwright e Jest.

# **1\. Resumo executivo**

O portfólio já possui uma base técnica acima da média para um site criativo: metadados por rota, canonical, Open Graph, JSON-LD, imagens responsivas, lazy loading de mídia de hover, suporte a reduced motion, foco visível e um modal com comportamento de teclado significativamente melhor que a maioria dos portfólios. O principal risco atual não é falta de sofisticação, mas excesso de custo visual e de execução em pontos específicos, além de algumas inconsistências de semântica, descoberta de conteúdo e estabilidade do conteúdo inicial.

A prioridade deve ser preservar a direção visual e reduzir trabalho desnecessário do navegador, melhorar a previsibilidade da navegação entre modal e rota permanente, reforçar a hierarquia semântica, corrigir conteúdos acessíveis genéricos e instrumentar Core Web Vitals. As recomendações abaixo foram organizadas para permitir implementação incremental sem desmontar a identidade do site.

# **2\. Escopo e método**

Foram analisadas a Home, /portfolio, o componente PortfolioModal e a rota dinâmica /portfolio/\[slug\], cruzando o site publicado, o repositório GitHub, a documentação oficial atual do Next.js via Context7 e a Skill apple-design fornecida nesta conversa. O URL informado para o plugin webdesign-otimizador foi consultado, porém nesta sessão ele não foi exposto como ferramenta invocável e a página pública retornou apenas o diretório genérico de plugins. Por isso, nenhuma conclusão abaixo é atribuída a esse plugin.

* Site publicado: https://portfoliodanilo.com/ e https://portfoliodanilo.com/portfolio  
* Repositório: https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL  
* Arquivos centrais: src/app/page.tsx, src/app/portfolio/PortfolioClient.tsx, src/components/portfolio/PortfolioModal.tsx, src/components/portfolio/ProjectCard.tsx e src/app/portfolio/\[slug\]/page.tsx  
* Documentação oficial: Next.js App Router, metadata, canonical, Open Graph e Web Vitals consultados via Context7  
* Referência de interação: Skill apple-design, com foco em resposta imediata, motion interrompível, reduced motion e consistência espacial

# **3\. O que já está bem resolvido**

* SEO por projeto: /portfolio/\[slug\] implementa generateMetadata, canonical, Open Graph, Twitter Card e keywords derivadas do projeto.  
* Dados estruturados: a rota de projeto injeta JSON-LD e schema de vídeo quando a mídia principal é um vídeo.  
* Acessibilidade do modal: role=dialog, aria-modal=true, aria-labelledby, aria-describedby, Escape, trap de Tab e restauração de foco.  
* Acessibilidade dos cards: foco visível, aria-haspopup para destino modal e título semântico associado ao botão.  
* Mídia: vídeos de hover são carregados somente após a primeira interação e usam preload=none, evitando download antecipado desnecessário.  
* Reduced motion: o projeto já possui useMotionGate e também altera scroll suave para auto quando prefers-reduced-motion está ativo.  
* Responsividade: os cards têm mídia diferenciada para desktop/mobile e sizes explícitos, o que ajuda o navegador a selecionar recursos adequados.  
* Testabilidade: o projeto já possui Jest e Playwright, além de scripts de lint, typecheck, bundle analysis e build.

# **4\. Auditoria por página e componente**

## **4.1 Home**

A Home funciona como experiência de marca, com hero interativo, manifesto em vídeo, showcase, projetos destacados, shader e seção de clientes. O conteúdo rastreado confirma que a mensagem principal aparece repetida e que a página concentra vários elementos de mídia e motion. O arquivo src/app/page.tsx também pré-carrega posters e vídeos do hero e carrega ShaderSection de forma síncrona.

* Estrutura e layout: manter a sequência narrativa atual, mas definir um orçamento explícito de complexidade acima da dobra. O hero deve ser o único elemento visual pesado no primeiro viewport.  
* Performance: revisar os preloads de vídeos do hero. Preload agressivo de vídeo pode competir com LCP, fontes e CSS. Priorizar poster/imagem do primeiro frame e iniciar vídeo somente quando o hero estiver pronto ou visível.  
* Performance: considerar dynamic import para ShaderSection e carregamento após idle/viewport. Three.js/OGL/R3F devem ficar fora do caminho crítico quando não forem o LCP.  
* SEO: a Home já tem metadata forte, porém a seleção aleatória de projetos via new Date().getTime() reduz estabilidade editorial e pode alterar o conteúdo rastreável entre renderizações. Para SEO e narrativa, preferir featured projects curados ou shuffle estável por janela de tempo.  
* Acessibilidade: o crawler expôs 'Logo do cliente 1', 'Logo do cliente 2' etc. Substituir por nomes reais de marcas ou, quando estritamente decorativos, alt vazio e aria-hidden conforme o contexto.  
* Acessibilidade/semântica: o crawler também expôs a frase principal múltiplas vezes. Verificar se clones usados para animação estão aria-hidden e não aparecem repetidamente na árvore acessível.  
* Contato: os dois e-mails aparecem concatenados no texto rastreado. Inserir separação semântica e visual clara, idealmente como links mailto independentes dentro de uma lista ou bloco de contato.

## **4.2 /portfolio**

A página de portfólio possui boa taxonomia visual e filtros claros. O código separa a renderização server-side da camada interativa e carrega ProjectsGallery e PortfolioModal dinamicamente. O principal desafio é manter uma lista extensa de trabalhos rápida e semanticamente navegável.

* Layout: manter o grid editorial assimétrico, mas garantir ordem DOM coerente com a ordem visual. Masonry e rearranjos responsivos não devem alterar a sequência de leitura por teclado.  
* Responsividade: validar breakpoints em 320, 375, 390, 768, 1024, 1280 e 1440 px. Os cards usam ratios e spans diferentes; o teste deve verificar recortes, texto sobreposto e alvos de toque.  
* Performance: só os cards realmente acima da dobra devem receber priority. Os demais devem usar lazy loading natural. Evitar múltiplos vídeos ativos simultaneamente em hover/focus.  
* Performance: use IntersectionObserver para pausar qualquer mídia fora do viewport e cancelar decodificação quando o card sair da área útil.  
* UX: os filtros devem atualizar estado de forma anunciável. Usar aria-pressed ou padrão tabs conforme comportamento real e um aria-live discreto para quantidade de resultados quando a lista muda.  
* SEO: a página listagem já é rastreável. Adicionar ItemList JSON-LD somente se os dados forem consistentes e estáveis, evitando schema superficial.  
* Navegação: oferecer deep link estável para todo trabalho relevante. O modal pode continuar como visualização rápida, mas o usuário deve conseguir abrir/copiar a URL permanente do case.

## **4.3 PortfolioModal**

O modal está tecnicamente bem estruturado. Ele cria portal, bloqueia o body, preserva foco anterior, move foco para o botão de fechar, captura Tab e fecha com Escape. Também respeita reduced motion.

* P0, navegação e compartilhamento: sincronizar modal com URL ou incluir CTA explícito 'Abrir página do projeto'. Hoje o modal é um estado local; isso reduz compartilhabilidade, histórico do navegador e descoberta de conteúdo quando o usuário entra pelo grid.  
* P0, foco: substituir o trap manual por uma primitive de dialog madura, como Radix Dialog já presente nas dependências, ou endurecer o trap atual para lidar com DOM mutável, elementos disabled e conteúdo assíncrono.  
* P1, fechamento: adicionar affordance de fechar também no rodapé de cases longos e preservar o contexto de scroll do grid ao retornar.  
* P1, motion: manter transições interrompíveis e curtas. Não usar animações de entrada/saída que bloqueiem input. Aplicar reduced motion como caminho completo, não apenas duração reduzida.  
* P1, semântica: garantir que cada TypeAContent/TypeBContent possua heading hierarchy interna consistente e que nenhum h1 concorrente seja montado dentro do dialog.  
* P2, performance: lazy load de galerias e embeds dentro do modal. Conteúdo abaixo da dobra não deve montar players, iframes ou imagens de alta resolução até aproximar-se do viewport.

## **4.4 /portfolio/\[slug\]**

A rota permanente possui boa base de SEO e conteúdo. Ela busca o projeto no Supabase com fallback estático, gera metadata dinâmica e renderiza conteúdo, hero media, destaques e galeria.

* P0, vídeo: os embeds de YouTube são montados com autoplay=1, mute=1 e loop=1. Em páginas com múltiplos blocos de vídeo isso pode criar custo de CPU/rede e experiência agressiva. Carregar o iframe sob demanda, com poster e play explícito, salvo quando a reprodução automática for parte essencial do case.  
* P0, imagem LCP: a imagem hero usa priority, o que é correto se for realmente o LCP. Confirmar via RUM/Lighthouse e remover priority de mídias que não sejam LCP em variantes de projeto.  
* P1, dynamic=force-dynamic: reavaliar. Se os cases mudam pouco, force-dynamic reduz cacheabilidade e aumenta TTFB. Preferir cache/revalidation por tag ou janela temporal quando compatível com o CMS.  
* P1, conteúdo: transformar metadados Client, Category e Year para português no conteúdo visível ou manter linguagem bilíngue de forma deliberada. Hoje há mistura de 'Back to Portfolio', 'Client', 'Category' e 'Year' com o restante em português.  
* P1, navegação: adicionar projetos anterior/próximo e CTA de retorno ao grid com âncora preservada. Isso aumenta exploração sem forçar o usuário a reiniciar a navegação.  
* P1, acessibilidade de vídeo: manter captions reais por projeto quando existirem. Um único DEFAULT\_CAPTIONS genérico não deve ser usado se não corresponder ao conteúdo audiovisual.  
* P2, galeria: imagens da grade usam alt incremental contextual, o que é aceitável, mas deve preferir descrições editoriais por mídia quando disponíveis no CMS.

# **5\. Achados transversais por disciplina**

## **5.1 Estrutura, layout e consistência visual**

A identidade visual é forte e deve ser preservada. As maiores oportunidades são reduzir densidade cognitiva e criar regras de consistência para títulos, meta-informação, espaçamento e comportamento de cases. A Skill de design fornecida reforça consistência espacial, feedback imediato e movimento interrompível, princípios compatíveis com o modal e os cards atuais.

* Criar tokens de espaçamento para hero, cards, modal e case page, eliminando exceções locais quando não houver motivo editorial.  
* Padronizar hierarquia: um h1 por página permanente; no modal, heading principal deve ser h2 ou elemento associado ao dialog.  
* Definir largura máxima de leitura para textos de case entre 60 e 75 caracteres por linha.  
* Evitar efeitos simultâneos concorrentes: cursor especial, smooth scroll, shader, vídeos e transforms devem ser orquestrados para não disputar atenção.

## **5.2 Mobile e responsividade**

* Alvos de toque mínimos de 44x44 CSS px. O botão de fechar do modal já usa 48 px em mobile, o que deve ser mantido.  
* Não depender de hover para revelar informação essencial. O card já exibe conteúdo em focus/active; validar que mobile mostra título/categoria sem gesto ambíguo.  
* Desabilitar ou simplificar WebGL, cursor customizado e parallax em coarse pointer ou dispositivos com baixa capacidade quando o efeito não for essencial.  
* Usar dvh/svh com fallback quando o modal ocupar a viewport para reduzir problemas de barra de endereço móvel.  
* Testar orientação landscape e zoom de 200%, especialmente modal, filtros e títulos longos.

## **5.3 Performance e imagens**

* Instrumentar useReportWebVitals e enviar LCP, INP, CLS, FCP e TTFB para analytics/log. Sem RUM, otimizações ficam baseadas em laboratório.  
* Executar pnpm run analyze:bundle e definir budget por rota. O foco deve ser JS inicial, Three.js/R3F/OGL, GSAP, Motion e qualquer bundle administrativo compartilhado por engano.  
* Evitar preload de vídeos que não começam imediatamente. Preferir poster otimizado, preload=metadata ou none.  
* Garantir AVIF/WebP via next/image/loader e tamanhos source-specific. Não solicitar 1920 px para slots que raramente ultrapassam 1200 px.  
* Usar content-visibility:auto em blocos longos de case quando seguro e lazy mounting para embeds pesados.  
* Pausar animations/tickers quando document.hidden, elemento fora do viewport ou prefers-reduced-motion estiver ativo.

## **5.4 SEO e palavras-chave**

* A base técnica de metadata está boa. O ganho agora é editorial: cada case deve ter título pesquisável, descrição única, cliente, serviço, ano, contexto, processo e resultado.  
* Evitar keywords meta como principal estratégia. Priorizar conteúdo útil em headings, parágrafos, alt text e links internos.  
* Gerar sitemap com todos os slugs publicados e lastModified real do CMS. Verificar robots, canonical e status 404\.  
* Criar ligações internas entre cases por cliente, disciplina e tags. Isso melhora descoberta por usuários e crawlers.  
* Padronizar nomenclatura 'Brand & Campaigns', 'Videos & Motions' e 'Websites & Tech' com equivalentes editoriais em português ou uma estratégia bilíngue consistente.

## **5.5 Acessibilidade**

* Meta de conformidade: WCAG 2.2 AA.  
* Executar axe-core em Home, Portfolio, modal aberto, case route e estados de filtro.  
* Verificar contraste de textos sobre vídeo e overlays em todos os frames, não apenas no poster.  
* Canvas/WebGL precisa de fallback textual útil e não deve capturar teclado indevidamente.  
* Animações decorativas e clones visuais devem ser aria-hidden; conteúdos críticos não podem existir apenas em canvas.  
* Validar leitura com VoiceOver/NVDA: ordem do foco, nomes de links, botão de fechar, filtros, cards e retorno do modal.

# **6\. Backlog priorizado**

| Prioridade | Achado | Impacto | Ação recomendada | Arquivos/áreas |
| :---- | :---- | :---- | :---- | :---- |
| P0 | Instrumentar Core Web Vitals e criar baseline | Alto | Adicionar useReportWebVitals \+ relatório antes/depois | src/app, analytics/observability |
| P0 | Reduzir autoplay e embeds pesados em /portfolio/\[slug\] | Alto | Poster \+ lazy iframe/player \+ play explícito | src/app/portfolio/\[slug\]/page.tsx |
| P0 | Deep link consistente entre card, modal e rota permanente | Alto | URL sincronizada ou CTA permanente para o case | PortfolioClient, PortfolioModal, routing |
| P0 | Auditar hero preloads e WebGL | Alto | Retirar mídia não crítica do caminho do LCP | src/app/page.tsx, hero, ShaderSection |
| P1 | Reavaliar force-dynamic dos cases | Médio/alto | Cache/revalidate por tag ou janela | src/app/portfolio/\[slug\]/page.tsx |
| P1 | Corrigir labels genéricos e clones acessíveis | Médio | Alt real/alt vazio \+ aria-hidden em clones | Home clients/hero |
| P1 | Melhorar filtros acessíveis | Médio | aria-pressed/tabs \+ anúncio de resultado | ProjectsGallery |
| P1 | Padronizar idioma e hierarquia semântica | Médio | Labels PT-BR e headings coerentes | PortfolioModal, case page |
| P1 | Adicionar navegação anterior/próximo | Médio | Links internos contextualizados | /portfolio/\[slug\] |
| P2 | Budgets de bundle e regressão visual | Médio | CI com bundle report \+ Playwright screenshots | CI/tests |

# **7\. Plano de implementação em 4 fases**

1. Baseline: rodar lint, typecheck, Jest, Playwright, build e bundle analysis; coletar Web Vitals e screenshots de referência.  
2. Performance e mídia: revisar preloads, lazy loading, autoplay, shaders/WebGL, imagens e cache dos cases.  
3. UX, acessibilidade e SEO: deep links, filtros, labels, headings, reduced motion, alt text, links internos e sitemap/canonical.  
4. Regressão e governança: testes E2E por rota/estado, axe, visual regression, budgets e verificação final em mobile/desktop.

# **8\. Critérios de aceite objetivos**

* Nenhuma regressão visual relevante em Home, Portfolio, modal e case pages.  
* Nenhum erro axe de impacto critical/serious nas páginas auditadas.  
* Navegação completa por teclado, com foco visível e retorno correto após fechar modal.  
* Nenhum vídeo/iframe fora da dobra baixado sem necessidade na carga inicial.  
* LCP, INP e CLS medidos antes/depois, com melhoria ou neutralidade comprovada.  
* Todas as rotas permanentes de projeto têm title, description, canonical, Open Graph e JSON-LD válidos.  
* pnpm run lint, pnpm run typecheck, pnpm test, pnpm run test:e2e e pnpm run build aprovados.

# **9\. Prompt de execução para Agents IDE**

Copie o bloco abaixo para Google Antigravity, Claude Code, Cursor, Codex ou outro coding agent com acesso ao repositório.

MISSÃO  
Auditar e implementar, de forma incremental e verificável, as melhorias de UX, UI, performance, SEO e acessibilidade no repositório danilonovaisv/PORTFOLIO-DANILO-FINAL, com foco em Home, /portfolio, PortfolioModal e /portfolio/\[slug\]. Preserve a identidade visual e evite refatorações laterais não necessárias.

OBJETIVO DE RESULTADO  
Entregar melhorias mensuráveis sem regressão visual ou funcional, com evidência de testes, Web Vitals, acessibilidade e build. Não declarar conclusão sem executar a verificação final.

FONTE DE VERDADE  
1\. Inspecione o repositório real antes de modificar código.  
2\. Consulte Context7 para APIs e comportamento atual de Next.js 16, React 19 e bibliotecas tocadas.  
3\. Use documentação oficial como fonte normativa.  
4\. Quando houver conflito entre documentação e suposição, prevalece a documentação.  
5\. Não invente paths, APIs, props, comandos ou capacidades.

FERRAMENTA: Context7  
O que faz: recupera documentação oficial atualizada de frameworks/SDKs.  
Quando usar: antes de alterar metadata, caching, next/image, dynamic imports, App Router, Web Vitals ou APIs cuja sintaxe possa ter mudado.  
Quando não usar: para descobrir a estrutura real do projeto, que deve vir do GitHub/workspace.  
Contrato operacional: entrada \= biblioteca \+ pergunta técnica específica; saída \= trecho/documentação aplicável. Registre a decisão técnica derivada.

FERRAMENTA: GitHub / Workspace  
O que faz: inspeciona arquivos, histórico, scripts, estrutura e código real.  
Quando usar: sempre antes de propor ou editar um arquivo.  
Quando não usar: não substitui documentação oficial de API.  
Contrato operacional: leia os arquivos relevantes, preserve mudanças existentes, faça diffs mínimos e nunca altere código não inspecionado.

SKILL: Frontend Performance  
O que faz: reduz custo de rede, CPU, main thread, GPU e hidratação.  
Quando usar: hero, WebGL, vídeos, iframes, imagens, animações, bundles e rotas client-heavy.  
Quando não usar: não sacrificar conteúdo essencial ou identidade visual por micro-otimizações sem evidência.  
Contrato: classifique cada problema em NETWORK, CPU, MAIN\_THREAD, REACT, GPU, MEMORY, MEDIA ou SERVER; registre baseline, mudança e verificação.

SKILL: Accessibility WCAG 2.2 AA  
O que faz: garante semântica, teclado, foco, contraste, reduced motion e acessibilidade de mídia/canvas.  
Quando usar: qualquer componente visual/interativo alterado.  
Quando não usar: não adicionar ARIA redundante quando HTML semântico resolve.  
Contrato: validar teclado, focus order, dialog, headings, alt, touch targets, reduced motion e axe. Zero critical/serious no escopo.

SKILL: SEO Next.js  
O que faz: melhora rastreabilidade, metadata, canonical, structured data, sitemap e links internos.  
Quando usar: Home, /portfolio e /portfolio/\[slug\].  
Quando não usar: não usar keyword stuffing ou schema sem conteúdo correspondente.  
Contrato: title/description únicos, canonical correto, OG/Twitter, JSON-LD válido, 404 correto e URLs estáveis.

SKILL: Apple-style Interaction  
O que faz: preserva resposta imediata, consistência espacial, transições interrompíveis e reduced motion.  
Quando usar: PortfolioModal, cards, hover/focus, transições e gestos.  
Quando não usar: para animações decorativas que aumentem custo sem melhorar compreensão.  
Contrato: input nunca bloqueado durante transição; feedback imediato; enter/exit espacialmente coerentes; reduced-motion completo.

AGENTE ORQUESTRADOR  
O que faz: decompõe a missão, cria plano, distribui tarefas independentes, integra resultados e controla stop conditions.  
Quando usar: em toda a missão.  
Quando não usar: não deve editar tudo sozinho se houver subtarefas independentes e disponíveis para subagents.  
Contrato: cada tarefa deve ter arquivos, objetivo, risco, teste e critério de conclusão.

SUBAGENT FRONTEND/PERFORMANCE  
O que faz: Home, Portfolio, mídia, bundle, WebGL e cache.  
Quando usar: tarefas de performance e renderização.  
Quando não usar: não altera metadata editorial sem coordenação com SEO.  
Saída: diff proposto, bottleneck class, teste e impacto esperado.

SUBAGENT A11Y/SEO  
O que faz: headings, labels, dialog, filtros, alt, canonical, schema e links internos.  
Quando usar: semântica, SEO e acessibilidade.  
Quando não usar: não mexe em animação/GPU sem necessidade.  
Saída: checklist WCAG/SEO, arquivos alterados e evidência.

SUBAGENT QA  
O que faz: testes E2E, visual regression, axe, mobile e verificação de build.  
Quando usar: após cada lote e na conclusão.  
Quando não usar: não aprovar por inspeção subjetiva.  
Saída: PASS/FAIL com comandos e falhas reproduzíveis.

WORKFLOW  
Gatilho: início desta missão.  
Etapa 1, inspeção: git status, package.json, rotas e componentes citados. Não editar.  
Etapa 2, baseline: pnpm run lint; pnpm run typecheck; pnpm test; pnpm run test:e2e quando o ambiente permitir; pnpm run build; pnpm run analyze:bundle. Registre resultados.  
Etapa 3, Web Vitals: implementar/confirmar instrumentação useReportWebVitals e coletar baseline.  
Etapa 4, P0 performance: hero preload, ShaderSection/WebGL, autoplay/iframe e mídia do case.  
Etapa 5, P0 navegação: criar deep link consistente entre card, modal e rota permanente, preservando retorno de foco e posição.  
Etapa 6, P1 a11y/SEO: labels de clientes, clones aria-hidden, filtros acessíveis, headings, idioma, sitemap/links internos e captions reais.  
Etapa 7, cache: reavaliar dynamic='force-dynamic' em /portfolio/\[slug\] com documentação do Next.js 16 e política de atualização do CMS.  
Etapa 8, testes: Playwright em 375x812, 768x1024 e 1440x900; teclado; modal; filtros; route navigation; reduced motion; axe; screenshots.  
Etapa 9, verificação final: lint, typecheck, unit, E2E, build, bundle e comparação de métricas.  
Estado de parada: pare antes de qualquer operação destrutiva, deploy, push, mudança de schema/banco ou alteração que afete produção.  
Fallback: se uma otimização piorar LCP/INP/CLS ou quebrar a direção visual, reverta essa mudança e preserve o baseline.  
Condição de conclusão: somente quando todos os critérios de aceite passarem e houver relatório before/after.

MUDANÇAS PRIORITÁRIAS  
P0:  
\- instrumentar Core Web Vitals;  
\- remover downloads/autoplay desnecessários de vídeo/iframe;  
\- lazy-load de WebGL/shader não crítico;  
\- revisar preloads do hero;  
\- criar deep link/rota permanente a partir do modal.  
P1:  
\- revisar force-dynamic e cache de cases;  
\- corrigir alt text genérico e clones acessíveis;  
\- filtros com aria-pressed/tabs \+ anúncio de resultados;  
\- padronizar idioma e hierarquia de headings;  
\- anterior/próximo entre cases;  
\- validar captions reais por mídia.  
P2:  
\- budgets de bundle;  
\- visual regression;  
\- documentação das decisões.

GUARDRAILS  
\- Não redesenhe o site inteiro.  
\- Não troque Motion, GSAP, Lenis ou Three.js apenas por preferência.  
\- Não remova efeitos sem medir impacto e confirmar equivalência visual.  
\- Não use autoplay de iframe fora de contexto necessário.  
\- Não adicione dependência quando a stack atual já resolve o problema.  
\- Não fazer deploy/push sem aprovação humana.  
\- Não declarar “otimizado” sem evidência antes/depois.

FORMATO DE SAÍDA  
1\. Baseline encontrado.  
2\. Plano por prioridade com arquivos exatos.  
3\. Mudanças aplicadas por commit/lote.  
4\. Evidência de testes.  
5\. Métricas antes/depois.  
6\. Riscos remanescentes.  
7\. Lista final de arquivos alterados.  
8\. PASS/FAIL dos critérios de aceite.

# **10\. Fontes e evidências**

* Site: https://portfoliodanilo.com/  
* Portfolio: https://portfoliodanilo.com/portfolio  
* Repositório: https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL  
* Next.js official docs, consultadas via Context7 em 22/09/2026.  
* package.json do repositório: Next 16.2.7, React 19.2.7, Motion 12.40.0, GSAP 3.15.0, Three 0.184.0, Playwright 1.60.0 e pnpm 11.5.1.  
* Skill apple-design fornecida pelo usuário nesta conversa.

Nota de evidência: recomendações que dependem de métricas reais de Lighthouse/RUM foram tratadas como hipóteses técnicas a validar, não como medições já comprovadas. O documento evita afirmar tempos de carregamento, LCP, INP ou CLS numéricos sem coleta instrumental.
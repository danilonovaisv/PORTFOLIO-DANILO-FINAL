# Plano Mestre de Ajustes do Portfólio

**portfoliodanilo.com \+ PORTFOLIO-DANILO-FINAL**

Baseado nas auditorias de 22/09/2026, inspeção do repositório e documentação atual do Next.js 16 via Context7.

# **1\. Objetivo e princípio de execução**

Executar uma melhoria completa e incremental do portfólio, cobrindo todas as páginas públicas e os componentes compartilhados, sem descaracterizar o Ghost System. O trabalho deve ser orientado por evidência, com reprodução dos defeitos antes da correção, backup antes de qualquer exclusão, mudanças pequenas por lote, testes em cada etapa e proibição de deploy ou remoção definitiva enquanto os gates de qualidade não estiverem aprovados.

* Preservar identidade visual, .std-grid, Ghost Blue, Void Black, TT Norms Pro e comportamento editorial assimétrico já estabelecido no projeto.  
* Usar os agents, skills e workflows já presentes em .agents antes de criar novos artefatos agênticos.  
* Toda recomendação de Next.js, React, image optimization, metadata, caching ou routing deve ser validada via Context7 antes da edição.  
* Nenhum arquivo deve ser apagado sem cópia no backup e sem aprovação dos gates finais.

# **2\. Base factual consolidada das auditorias**

As auditorias identificam uma base técnica sólida, mas com pontos de alto impacto em mídia, legibilidade, rotas, SEO e acessibilidade. A primeira auditoria prioriza Core Web Vitals, autoplay/embeds, deep links, hero preloads/WebGL, cache, filtros acessíveis, semântica e regressão visual. A segunda acrescenta evidências reproduzidas em produção: miniaturas quebradas no PortfolioModal do Mercado Pago, H1 da Home parcialmente encoberto durante o Ghost, carga simultânea de vídeos na galeria, alt incorreto no case GLAD e coexistência de duas famílias de rotas de projeto.

# **3\. Escopo de páginas e superfícies**

| Superfície | O que auditar/ajustar |
| :---- | :---- |
| Home / | Hero, INITIALIZING, H1/CTA, manifesto, showcase, featured projects, ShaderSection/WebGL, clientes, contato, footer. |
| /portfolio | Intro, filtros, paginação, grid, cards, mídia hover/focus, ordem DOM e conteúdo acima da dobra. |
| PortfolioModal | Dialog, thumbnails/posters, players, foco, URL/deep link, reduced motion, lazy media e conteúdo interno. |
| /projects/\[slug\] | Cases publicados, incluindo GLAD, metadata, canonical, alt text, mídia, navegação e conteúdo editorial. |
| /portfolio/\[slug\] | Rota dinâmica paralela, metadata, cache/dynamic rendering, vídeos, galeria e canonical. |
| Rotas sistêmicas | sitemap, robots, 404/not-found, redirects, links internos e qualquer página pública descoberta em src/app. |
| Compartilhados | Header, footer, cursor, smooth scroll, fonts, design tokens, analytics/Web Vitals, image config e middleware/config routing. |

# **4\. Arquitetura de execução com resources existentes**

O repositório já contém agentes e workflows adequados. O plano reaproveita esses recursos e apenas adapta a coordenação. Não é necessário criar novos agentes para esta missão.

| Agent existente | Papel | Quando usar | Quando não usar | Contrato |
| :---- | :---- | :---- | :---- | :---- |
| multi\_agent\_orchestrator / project-orchestrator | Orquestração | Decompor a missão, controlar dependências, evitar edição concorrente do mesmo arquivo e consolidar evidências. | Não implementar detalhes visuais ou técnicos sem delegar ao especialista apropriado. | Entrada: auditorias \+ estado do repo. Saída: plano por lotes, owner, arquivos, gates e status. |
| portfolio-experience-specialist | Frontend/experiência | Home, Portfolio, cards, mídia, case pages, touch/hover, responsividade, performance visual e defects do squirrel-audit. | Não alterar RLS/schema/admin ou shader internals. | Entrada: rota/componente \+ reprodução. Saída: delta, implementação, estados testados e evidência. |
| ui-ux-designer | UX/UI | Hierarquia, legibilidade, densidade do primeiro viewport, linguagem de interface, foco visual, mobile e consistência. | Não decidir APIs, caching ou infraestrutura. | Entrada: screenshots/DOM/design constraints. Saída: especificação visual objetiva e critérios verificáveis. |
| motion-choreographer | Motion | Hero, modal, card interactions, reduced motion, autoplay e transições. | Não redesenhar páginas ou trocar stack por preferência. | Entrada: motion atual \+ performance budget. Saída: comportamento, fallback reduced-motion e verificação. |
| spectral-artist | WebGL/shader | ShaderSection, canvas lifecycle, GPU budget e fallback visual. | Não atuar em SEO, routing ou conteúdo. | Entrada: shader/canvas atual \+ métricas. Saída: otimização sem regressão estética. |
| nextjs-architecture-expert | Next.js | remotePatterns, next/image, routing duplicado, metadata, canonical, redirects, caching/revalidation, dynamic imports e sitemap. | Não definir direção visual. | Entrada: código real \+ docs Context7. Saída: decisão arquitetural e patch mínimo. |
| typescript-pro | Tipagem | Garantir tipos e contratos corretos nas alterações. | Não expandir escopo com refactors genéricos. | Entrada: arquivos alterados. Saída: type-safe patch e zero erros do typecheck. |
| quality-verification-specialist | QA | Playwright, visual regression, teclado, mobile, axe, build, regressão e before/after. | Não aprovar baseado em aparência subjetiva. | Entrada: lote concluído. Saída: PASS/FAIL com evidência. |
| audit-sentinel | Auditoria | Validar que findings foram realmente tratados e que não surgiram novos riscos. | Não substituir testes de runtime. | Entrada: auditorias \+ diffs \+ relatórios. Saída: matriz de fechamento. |
| devops-engineer | Release | Pre-flight, CI e release somente depois dos gates. | Não realizar deploy sem autorização humana explícita. | Entrada: release candidate aprovado. Saída: checklist de release. |

# **5\. Skills e workflows a ativar**

O skills-lock confirma skills instaladas como apple-design, audit-website, frontend-design, web-perf, GSAP skills, review/improve animations, mobile-native e squirrelscan. O portfolio-experience-specialist também referencia review-project-media-card, review-project-case-page, verify-portfolio-change, clean-code, tailwind-patterns e superpowers de debugging/verificação.

* Skills: audit-website, web-perf, frontend-design, apple-design, gsap-performance, gsap-react, gsap-scrolltrigger, improve-animations, review-animations.  
* Skills do portfolio specialist: review-project-media-card, review-project-case-page, verify-portfolio-change, systematic-debugging e verification-before-completion.  
* Workflows existentes a encadear: plan.md, plano-ajuste-orchestration.md, portfolio.md, portfolio-media-improvement.md, project-case-improvement.md, performance.md, seo.md, squirrel-audit.md, fix-performance-and-ui.md, qa-pipeline.md, verify-change.md e pre-flight-check.md.  
* Não usar deploy.md/production-release.md até autorização explícita do usuário.

# **6\. Fase 0: congelamento de baseline e backup**

Esta fase é obrigatória antes de qualquer mudança. Ela cria três camadas de reversibilidade: branch/worktree, backup em pasta e manifesto de checksums. O backup de arquivos não substitui Git; ele existe para cumprir a exigência de retenção antes de qualquer exclusão e facilitar restauração seletiva.

1. Executar git status \--short e git log \--oneline \-5. Se houver trabalho não relacionado, preservar e não sobrescrever.  
2. Criar branch isolada, por exemplo feat/portfolio-audit-remediation-2026-09, preferencialmente em git worktree.  
3. Criar a pasta .backup/portfolio-audit-2026-09-22/pre-change/ na raiz do projeto.  
4. Copiar para o backup cada arquivo que será editado ou candidato à remoção, preservando a estrutura relativa de diretórios.  
5. Gerar .backup/portfolio-audit-2026-09-22/MANIFEST.json com path original, path do backup, SHA-256, motivo da mudança, lote e status: retained|candidate-delete|restored|deleted-after-pass.  
6. Adicionar .backup/ ao .gitignore se a política do projeto não permitir versionar snapshots locais. Se já houver convenção de backup no projeto, seguir a convenção existente.  
7. Não apagar candidatos. Apenas marcá-los como candidate-delete no manifesto.  
8. Registrar screenshots, DOM/accessibility snapshots e métricas baseline para /, /portfolio, modal Mercado Pago, /projects/glad e uma rota válida de /portfolio/\[slug\].  
9. Executar baseline: pnpm run lint, pnpm run typecheck, pnpm test, testes E2E pertinentes, pnpm run build-check/build conforme scripts existentes e bundle analysis quando disponível.

# **7\. Fase 1: auditoria completa do código e inventário de rotas**

10. Mapear todas as rotas públicas em src/app e classificá-las em página editorial, case, sistema ou admin. O escopo de ajuste público deve incluir toda rota indexável.  
11. Inventariar todos os slugs ativos em /projects/\[slug\] e /portfolio/\[slug\], sua origem de dados, links de entrada, canonical, sitemap e status HTTP.  
12. Determinar uma URL canônica única por projeto. Duplicatas devem ser resolvidas com redirect permanente ou canonical coerente, sem quebrar links existentes.  
13. Investigar o HTTP 400 do /\_next/image nas thumbnails do Mercado Pago. Conferir next.config.mjs e remotePatterns. A documentação oficial confirma que URL externa não correspondente ao remotePatterns retorna 400\.  
14. Mapear todas as imagens remotas, hosts, query strings e paths usados em cards, modais e cases antes de alterar remotePatterns.  
15. Mapear todo autoplay, preload, iframe, video, canvas, GSAP ticker e WebGL lifecycle por rota.  
16. Mapear todos os clones visuais e elementos duplicados de hero para aria-hidden e ordem da árvore acessível.  
17. Mapear alt texts genéricos, incluindo GLAD/Novo Projeto e thumbnails do modal.

# **8\. Fase 2: correções P0/P1 por área**

## **8.1 Home**

* Garantir leitura integral do H1 e CTA durante INITIALIZING, durante a animação do Ghost, após estabilização e em prefers-reduced-motion.  
* Evitar que INITIALIZING bloqueie conteúdo ou navegação por tempo perceptível. Deve existir caminho acessível imediato para conteúdo.  
* Rever preloads de vídeo e priorizar poster/frame essencial ao LCP. Mídia não essencial fica preload=none/metadata e inicia por viewport/intenção.  
* Lazy-load ShaderSection/WebGL quando não for LCP; pausar ticker/canvas fora do viewport, document.hidden, coarse pointer fraco ou reduced motion quando apropriado.  
* Substituir labels genéricos de clientes por nomes reais ou alt vazio quando decorativos.  
* Garantir aria-hidden em clones decorativos da frase principal.  
* Separar semanticamente contatos/e-mails.  
* Remover aleatoriedade por timestamp dos projetos destacados ou substituir por curadoria/shuffle determinístico.

## **8.2 /portfolio**

* Reduzir altura da introdução sem perder identidade, de forma que título, filtros e início dos projetos apareçam mais cedo no primeiro viewport.  
* Garantir ordem DOM coerente com leitura visual e teclado em layouts assimétricos.  
* Filtros devem usar aria-pressed ou padrão tabs apropriado e anunciar quantidade/estado via aria-live quando necessário.  
* Imagens eager/priority apenas onde comprovadamente acima da dobra.  
* Vídeos de card só podem tocar quando visíveis e após intenção/limiar definido; pausar ao sair da viewport; impedir múltiplos vídeos desnecessários simultâneos.  
* Reservar geometria para mídia para evitar áreas vazias/layout shift.  
* Manter conteúdo essencial disponível sem hover em touch devices.  
* Padronizar idioma de navegação e comandos conforme regra editorial escolhida.

## **8.3 PortfolioModal**

* Reproduzir e corrigir as thumbnails quebradas do Mercado Pago pela causa raiz, não por workaround cego.  
* Testar naturalWidth \> 0 ou equivalente para todas as thumbnails/posters em desktop e mobile.  
* Usar alt vazio em imagens decorativas dentro de botões já nomeados e nomear ações, por exemplo Reproduzir vídeo 1\.  
* Manter role=dialog, aria-modal, foco inicial, trap de foco, Escape e retorno ao card.  
* Sincronizar modal com deep link ou oferecer CTA inequívoco para a URL permanente do case.  
* Lazy-mount de players/iframes e galerias abaixo da dobra.  
* Adicionar fechamento acessível no final de cases muito longos se a navegação justificar.  
* Reduced motion deve pausar autoplay e simplificar transições, não apenas reduzir duração.

## **8.4 /projects/\[slug\] e /portfolio/\[slug\]**

* Definir rota canônica única por projeto e aplicar redirect/canonical de acordo com o inventário real.  
* Corrigir alt do case GLAD na origem de dados/mapeador, evitando o fallback Novo Projeto.  
* Completar descriptions truncadas e garantir title/description únicos.  
* Lazy-load de YouTube/players com poster e play explícito quando autoplay não for essencial.  
* Auditar captions por projeto; não reutilizar caption genérico que não corresponda ao conteúdo.  
* Reavaliar dynamic='force-dynamic'. Em conteúdo relativamente estável, preferir cache/revalidation documentado e invalidar por path/tag quando houver atualização editorial.  
* Adicionar navegação anterior/próximo e retorno ao grid sem perder contexto quando consistente com a arquitetura escolhida.  
* Padronizar linguagem visível e hierarquia de headings.  
* Adicionar alt editorial por mídia quando o CMS possuir esse dado.

## **8.5 SEO, acessibilidade e infraestrutura transversal**

* Instrumentar useReportWebVitals ou mecanismo já adotado no projeto para LCP, INP, CLS, FCP e TTFB.  
* Sitemap deve conter apenas URLs canônicas publicadas e lastModified confiável.  
* Robots, 404/not-found e redirects devem ser testados.  
* Meta keywords não é prioridade; headings, conteúdo editorial, alt e links internos são o foco.  
* Meta WCAG 2.2 AA: zero critical/serious em axe no escopo, teclado completo, focus-visible e zoom 200%.  
* Touch targets \>= 44x44 CSS px e sem dependência de hover.  
* Canvas/WebGL com fallback textual útil e sem captura indevida de teclado.  
* Definir budgets de bundle e mídia por rota depois do baseline, evitando números arbitrários sem medição.

# **9\. Ordem de execução e dependências**

| Lote | Escopo | Dependência | Owners |
| :---- | :---- | :---- | :---- |
| Lote A | Baseline \+ backup \+ inventário | Bloqueia todos os outros lotes | orchestrator \+ audit-sentinel \+ quality-verification |
| Lote B | Thumbnails Mercado Pago \+ image remote config | Depende do inventário de hosts | nextjs-architecture \+ portfolio-experience |
| Lote C | Home hero legibility \+ INIT \+ WebGL/preloads | Depende de baseline visual/perf | ui-ux \+ motion \+ spectral \+ portfolio-experience |
| Lote D | Gallery media lifecycle \+ filtros \+ first viewport | Depende de baseline de mídia | portfolio-experience \+ ui-ux \+ motion |
| Lote E | Rotas /projects vs /portfolio \+ SEO/canonical | Depende de inventário de slugs | nextjs-architecture \+ audit-sentinel |
| Lote F | Case pages: GLAD alt, descriptions, vídeo, captions, nav | Depende da decisão de URL canônica | portfolio-experience \+ nextjs-architecture |
| Lote G | Web Vitals, a11y, visual regression, bundle budgets | Integra todos os lotes | quality-verification \+ audit-sentinel |
| Lote H | Candidate-delete review e release readiness | Somente após todos os gates | devops-engineer \+ orchestrator |

# **10\. Política de exclusão e restauração**

A exclusão é uma etapa de encerramento, não de implementação. O agent pode identificar código/asset obsoleto durante a execução, porém deve mantê-lo intacto até os gates finais.

* Antes de marcar qualquer arquivo como candidate-delete, copiar para .backup/.../pre-change/ e registrar SHA-256 no MANIFEST.json.  
* Provar que não há imports, referências de runtime, rotas, assets, testes ou documentação dependentes.  
* Executar lint, typecheck, unit, E2E, build e checks visuais com o arquivo ainda presente.  
* Mover o candidato para uma área de quarantine dentro do backup se a validação exigir ausência no working tree.  
* Reexecutar todos os gates.  
* Somente então permitir exclusão definitiva do working tree, mantendo o backup durante todo o ciclo de release.  
* Se qualquer gate falhar, restaurar automaticamente a versão do backup e registrar restored no manifesto.  
* Deploy, push, merge e limpeza do backup exigem confirmação humana explícita.

# **11\. Avaliação de eficácia e feedback**

| Dimensão | Indicadores | Método |
| :---- | :---- | :---- |
| Performance | LCP, INP, CLS, FCP, TTFB, bytes de mídia, JS inicial, vídeos/iframes ativos | Baseline e pós-lote; mobile e desktop |
| Usabilidade | tempo até visualizar primeiro projeto, sucesso de filtro, retorno de modal, clareza de CTA | Teste guiado com 5 tarefas representativas |
| Acessibilidade | axe critical/serious, teclado, foco, zoom 200%, reduced motion, leitor de tela | Home, Portfolio, modal e cases |
| SEO | canonical, indexabilidade, status, sitemap, OG, description, structured data | Amostra de cada rota canônica |
| Qualidade visual | screenshots Playwright em 390x844, 768x1024, 1280x720, 1440x900 | Antes/depois com diff |
| Confiabilidade de mídia | imagens quebradas=0, naturalWidth\>0, poster válido, players lazy | Todos os cards/modal do conjunto testado |

Feedback qualitativo: após o release candidate, aplicar um roteiro curto com tarefas: identificar em até poucos segundos o que o profissional faz; abrir um trabalho; filtrar uma categoria; abrir/fechar modal via teclado; compartilhar uma URL de case; navegar para outro case. Registrar onde o usuário hesita, volta ou não encontra ação. O feedback deve gerar issues com evidência, severidade, rota, viewport e reprodução.

# **12\. Gates de qualidade**

* G0 Baseline registrado e backup íntegro.  
* G1 Defeitos P1 reproduzidos por teste ou evidência antes do patch.  
* G2 lint \+ typecheck aprovados.  
* G3 testes unitários/integrados pertinentes aprovados.  
* G4 E2E Playwright em desktop e mobile aprovado.  
* G5 zero axe critical/serious no escopo.  
* G6 sem miniaturas/imagens quebradas nas amostras auditadas.  
* G7 métricas Core Web Vitals melhoram ou permanecem neutras; nenhuma regressão sem justificativa aceita.  
* G8 canonical/sitemap/redirects coerentes e uma URL canônica por projeto.  
* G9 visual regression revisada e identidade Ghost preservada.  
* G10 somente depois de G0-G9: exclusões definitivas podem ser propostas.  
* G11 deploy/push/merge somente com aprovação humana.

# **13\. Prompt de execução para Agents IDE**

O prompt completo também é entregue em arquivo Markdown separado. Resumo operacional:

Inicie pelo workflow de orquestração existente, leia AGENTS.md, .agents/START\_HERE.md, .agents/ARCHITECTURE.md, o workflow plano-ajuste-orchestration.md e as duas auditorias. Use Context7 para Next.js 16 antes de editar APIs de framework. Crie backup e baseline, delegue por lote aos agents existentes, aplique debugging sistemático, execute verificação antes de conclusão, proíba exclusões e deploy até aprovação dos gates.

# **14\. Decisões técnicas validadas na documentação atual**

* Next.js remotePatterns controla quais imagens externas podem passar pelo Image Optimization API; URL fora do padrão permitido pode responder HTTP 400\. Isso é diretamente relevante às thumbnails do Mercado Pago.  
* dynamic='force-dynamic' força renderização dinâmica e desabilita fetch caching; portanto deve ser justificado por necessidade real de frescor.  
* router.refresh() não invalida cache do servidor; revalidatePath/revalidateTag são as APIs apropriadas quando a intenção for invalidar conteúdo server-side.  
* next/image oferece preload, loading, sizes, onError e unoptimized; qualquer uso de unoptimized deve ser exceção justificada, não a correção padrão para falha de remotePatterns.

# **15\. Fontes do plano**

* Auditoria\_Portfolio\_Danilo\_2026.docx, 22/09/2026.  
* webdesign-audit-2026-09-22.md, 22/09/2026.  
* Repositório danilonovaisv/PORTFOLIO-DANILO-FINAL, branch main, inspecionado nesta sessão.  
* Context7: documentação oficial de Next.js 16 /vercel/next.js, consultada nesta sessão.  
* Agent Skills existentes registrados no skills-lock.json e resources sob .agents/.
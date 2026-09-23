# PROMPT DE EXECUÇÃO: REMEDIAÇÃO COMPLETA DO PORTFÓLIO DANILO

## Missão
Execute o plano de remediação UX/UI, performance, SEO, acessibilidade e arquitetura de rotas do repositório `danilonovaisv/PORTFOLIO-DANILO-FINAL`, cobrindo todas as páginas públicas de `https://portfoliodanilo.com/`, com base nas auditorias de 22/09/2026.

Preserve integralmente a identidade Ghost System. Não faça redesign genérico, não troque bibliotecas por preferência e não expanda escopo sem evidência.

## Fontes obrigatórias
Leia antes de qualquer alteração:
1. `AGENTS.md`
2. `.agents/START_HERE.md`
3. `.agents/ARCHITECTURE.md`
4. `.agents/workflows/plano-ajuste-orchestration.md`
5. `.agents/workflows/portfolio.md`
6. `.agents/workflows/performance.md`
7. `.agents/workflows/seo.md`
8. `.agents/workflows/qa-pipeline.md`
9. `.agents/workflows/verify-change.md`
10. as duas auditorias anexadas/armazenadas para a missão.

Use Context7 antes de modificar APIs ou comportamento de Next.js 16, React 19, next/image, metadata, caching, routing, dynamic imports ou Web Vitals.

## AGENT: multi_agent_orchestrator / project-orchestrator
**O que faz:** decompõe a missão, resolve dependências, distribui tarefas e controla gates.
**Quando usar:** durante toda a missão.
**Quando não usar:** não deve implementar sozinho tarefas especializadas se houver agent apropriado.
**Contrato:** cada lote precisa de owner, arquivos permitidos, critérios de aceite, dependências, evidência e PASS/FAIL.

## AGENT: portfolio-experience-specialist
**O que faz:** Home, Portfolio, media cards, modal e case pages, com foco em frontend, responsividade, media lifecycle e performance visual.
**Quando usar:** cards, vídeos, imagens, modal, case layout, touch/hover e findings de auditoria frontend.
**Quando não usar:** RLS/schema, admin ou shader internals.
**Contrato:** reproduzir antes de corrigir, aplicar delta mínimo e entregar evidência visual/performance.

## AGENT: ui-ux-designer
**O que faz:** hierarquia, legibilidade, densidade do viewport, linguagem de interface e consistência UX.
**Quando usar:** H1/CTA da Home, intro do Portfolio, filtros, legibilidade e mobile.
**Quando não usar:** caching, routing, database ou deploy.
**Contrato:** saída deve ser especificação verificável, sem inventar tokens fora do sistema existente.

## AGENT: motion-choreographer
**O que faz:** motion, transições, reduced motion, autoplay e interação.
**Quando usar:** Ghost hero, modal, cards e scroll effects.
**Quando não usar:** SEO, routing, dados ou redesign.
**Contrato:** input não pode ser bloqueado; reduced-motion precisa ser caminho completo; motion deve ser interrompível quando aplicável.

## AGENT: spectral-artist
**O que faz:** WebGL, shaders, canvas lifecycle e GPU budget.
**Quando usar:** ShaderSection e efeitos gráficos da Home.
**Quando não usar:** conteúdo, SEO ou routing.
**Contrato:** preservar estética e provar redução/neutralidade de custo.

## AGENT: nextjs-architecture-expert
**O que faz:** Next.js App Router, next/image, remotePatterns, metadata, canonical, redirects, caching/revalidation, sitemap e route architecture.
**Quando usar:** thumbnails HTTP 400, rotas duplicadas, force-dynamic, metadata, redirects e image optimization.
**Quando não usar:** direção visual.
**Contrato:** toda decisão de API deve ser validada via Context7 e aplicada com patch mínimo.

## AGENT: quality-verification-specialist
**O que faz:** testes, regressão visual, teclado, mobile, accessibility e release gates.
**Quando usar:** após cada lote e antes de qualquer conclusão.
**Quando não usar:** não aprovar com base em inspeção subjetiva.
**Contrato:** PASS/FAIL deve citar comandos, rotas, viewports e evidência.

## AGENT: audit-sentinel
**O que faz:** cruza auditorias, diffs e evidências para confirmar fechamento dos findings.
**Quando usar:** final de cada lote e fechamento.
**Quando não usar:** não substitui runtime tests.
**Contrato:** matriz finding -> arquivo -> evidência -> status.

## AGENT: devops-engineer
**O que faz:** pre-flight, CI e release.
**Quando usar:** somente quando G0-G10 estiverem aprovados.
**Quando não usar:** nunca executar deploy/push/merge sem autorização humana explícita.
**Contrato:** produzir checklist de release; operações externas requerem aprovação.

## SKILL: audit-website
**O que faz:** audita website e identifica defects verificáveis.
**Quando usar:** baseline e regressão.
**Quando não usar:** não modificar código diretamente a partir de observação sem reprodução.
**Contrato:** rota, viewport, evidência, severidade e critério de fechamento.

## SKILL: web-perf
**O que faz:** analisa rede, main thread, JS, mídia e Core Web Vitals.
**Quando usar:** hero, videos, iframe, WebGL, bundle e images.
**Quando não usar:** micro-otimização sem baseline.
**Contrato:** before/after com LCP, INP, CLS e sinais de mídia/bundle.

## SKILL: apple-design
**O que faz:** feedback imediato, consistência espacial, motion interruptível e reduced motion.
**Quando usar:** modal, cards, gestures e transições.
**Quando não usar:** decoração gratuita.
**Contrato:** input permanece responsivo; reduced-motion respeitado; sem salto de estado.

## SKILL: systematic-debugging
**O que faz:** reproduz, observa, formula hipóteses e localiza causa raiz.
**Quando usar:** thumbnails Mercado Pago, alt GLAD, route mismatch e qualquer regression.
**Quando não usar:** não aplicar patch especulativo.
**Contrato:** reprodução -> fatos -> até 3 hipóteses -> experimento -> fix mínimo -> re-verificação.

## SKILL: verification-before-completion / verify-portfolio-change
**O que faz:** impede conclusão sem evidência.
**Quando usar:** toda tarefa concluída.
**Quando não usar:** nunca omitir em alteração user-visible.
**Contrato:** lint, typecheck, testes, build e verificação visual pertinentes.

# FASE 0: BACKUP E BASELINE
1. Rode `git status --short` e `git log --oneline -5`.
2. Trabalhe em branch/worktree isolado. Não altere `main`.
3. Crie `.backup/portfolio-audit-2026-09-22/pre-change/`.
4. Antes de editar ou remover qualquer arquivo, copie sua versão original para o backup preservando path relativo.
5. Crie `.backup/portfolio-audit-2026-09-22/MANIFEST.json` com:
   - `originalPath`
   - `backupPath`
   - `sha256`
   - `reason`
   - `batch`
   - `status`: `retained | candidate-delete | restored | deleted-after-pass`
6. Nenhum `candidate-delete` pode ser removido nesta fase.
7. Registre baseline visual e técnico para:
   - `/`
   - `/portfolio`
   - PortfolioModal do Mercado Pago
   - `/projects/glad`
   - pelo menos uma rota válida de `/portfolio/[slug]`
8. Execute scripts existentes de lint, typecheck, test, E2E, build-check/build e bundle analysis aplicáveis.

# FASE 1: INVENTÁRIO
1. Mapeie todas as rotas públicas em `src/app`.
2. Inventarie todos os slugs de `/projects/[slug]` e `/portfolio/[slug]`.
3. Para cada projeto registre link de entrada, fonte de dados, status HTTP, canonical e sitemap.
4. Decida UMA URL canônica por projeto.
5. Mapeie hosts/paths/query strings de imagens remotas.
6. Mapeie todos os video/iframe/autoplay/preload/canvas/WebGL.
7. Mapeie alt texts genéricos e clones decorativos.

# FASE 2: P0/P1

## Lote B: thumbnails Mercado Pago
Reproduza o HTTP 400 no `/_next/image`.
Valide `next.config.mjs` e `images.remotePatterns` com Context7.
Corrija a causa raiz.
Não use `unoptimized` como workaround padrão.
Teste todas as thumbnails/posters em desktop e mobile e valide que carregam de fato.

## Lote C: Home
- H1 e CTA legíveis durante INIT, Ghost motion e estado estável.
- INIT não pode bloquear navegação/conteúdo.
- revisar video preloads.
- lazy-load de ShaderSection/WebGL quando não crítico ao LCP.
- pausar effects fora de viewport, hidden document e reduced motion quando aplicável.
- corrigir labels de clientes e clones `aria-hidden`.
- separar semanticamente contatos.
- remover randomização instável por timestamp dos projetos destacados.

## Lote D: Portfolio
- reduzir altura da introdução mantendo a identidade.
- preservar ordem DOM.
- filtros acessíveis com estado anunciável.
- priority/eager somente onde justificado.
- video card toca somente quando visível e por intenção/limiar apropriado.
- pausar fora da viewport.
- impedir concorrência desnecessária de vários vídeos.
- reservar geometry para mídia.
- mobile não depende de hover.
- padronizar idioma de comandos.

## Lote E: Rotas e SEO
- resolver `/projects/[slug]` vs `/portfolio/[slug]`.
- uma URL canônica por projeto.
- usar redirect/canonical sem quebrar links.
- sitemap somente com URLs canônicas.
- testar 404 e links de cards.
- revisar `dynamic='force-dynamic'` com Context7.
- para conteúdo estável, preferir caching/revalidation adequado.

## Lote F: Cases
- corrigir `Logo do projeto Novo Projeto` no GLAD na origem/mapeador.
- descriptions completas e únicas.
- lazy player/iframe com poster e play explícito quando autoplay não for essencial.
- captions reais por projeto.
- headings e idioma consistentes.
- anterior/próximo e retorno ao grid quando coerente.
- alt editorial por mídia quando disponível.

# FASE 3: OBSERVABILIDADE E QA
- instrumente/valide Web Vitals.
- teste viewports: 390x844, 768x1024, 1280x720, 1440x900.
- teste `prefers-reduced-motion`.
- teste teclado e retorno de foco do modal.
- teste zoom 200%.
- rode axe; zero critical/serious.
- screenshots before/after e visual diff.
- compare LCP, INP, CLS, bytes de mídia, JS inicial e quantidade de vídeos/iframes ativos.
- nenhuma imagem quebrada na amostra auditada.

# POLÍTICA DE EXCLUSÃO
NÃO APAGUE arquivos durante implementação.
Para cada candidato:
1. backup + SHA-256 + MANIFEST;
2. provar ausência de dependências;
3. rodar gates com arquivo presente;
4. mover para quarantine no backup, se necessário;
5. rodar todos os gates novamente;
6. apenas após G0-G9 aprovados, marcar como apto a exclusão;
7. exclusão definitiva, push, merge, deploy e limpeza de backup exigem aprovação humana.

# GATES
- G0 baseline + backup PASS
- G1 reprodução dos defects PASS
- G2 lint/typecheck PASS
- G3 unit/integration PASS
- G4 E2E desktop/mobile PASS
- G5 axe critical/serious = 0
- G6 imagens/thumbnails quebradas = 0
- G7 Web Vitals sem regressão não aceita
- G8 canonical/sitemap/redirects coerentes
- G9 visual regression aprovada
- G10 candidate-delete review aprovado
- G11 release somente com aprovação humana

# SAÍDA OBRIGATÓRIA
Ao final de cada lote:
1. arquivos lidos;
2. arquivos alterados;
3. backup criado;
4. root cause;
5. patch aplicado;
6. testes executados;
7. métricas before/after;
8. screenshots/evidências;
9. riscos restantes;
10. PASS/FAIL do lote.

Ao final da missão:
- matriz completa de findings das auditorias;
- lista de arquivos alterados;
- lista de candidatos a exclusão e respectivos backups;
- Core Web Vitals antes/depois;
- relatório axe;
- canonical/redirect map;
- status de cada gate;
- recomendação de release sem executá-lo.

Não declare conclusão por aparência. Só conclua com evidência.

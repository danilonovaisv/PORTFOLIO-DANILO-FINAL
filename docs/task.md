# task.md

## T01 — Localizar implementação atual “O que me move”
- **Objetivo:** mapear árvore real da seção atual.
- **Especialista:** Next.js App Router Specialist
- **Arquivos prováveis:** `src/app/sobre/page.tsx`, `src/components/sobre/sections/**`
- **MCP necessário:** não
- **Passos:** identificar componente raiz, imports, boundaries e fallback.
- **Validação:** mapa de componentes com responsabilidades.
- **Critério de aceite:** origem do render da seção completamente identificada.
- **Risco:** componentes indiretos lazy/dynamic ocultarem fluxo.

## T02 — Localizar implementação anterior/documentação visual
- **Objetivo:** recuperar baseline de intenção original sem redesign.
- **Especialista:** QA Visual Regression Engineer
- **Arquivos prováveis:** `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/**`, `docs/SOBRE/**`, histórico git.
- **MCP necessário:** Context7 (apenas docs técnicas externas quando necessário)
- **Passos:** cruzar docs de Sobre com snapshots e histórico.
- **Validação:** checklist expected vs current por bloco visual.
- **Critério de aceite:** baseline visual/narrativa definido.
- **Risco:** documentação divergente do código mais recente.

## T03 — Identificar onde o 3D Ghost foi removido
- **Objetivo:** apontar commit/arquivo/linhas da remoção.
- **Especialista:** React+TypeScript Frontend Architect
- **Arquivos prováveis:** componentes Beliefs/GhostScene/GhostCanvas.
- **MCP necessário:** não
- **Passos:** `git log`, `git blame`, diff dos componentes-chave.
- **Validação:** evidência objetiva de remoção/substituição/comentário.
- **Critério de aceite:** causa técnica da perda do 3D mapeada.
- **Risco:** regressão distribuída em múltiplos commits.

## T04 — Mapear componentes R3F/Drei/Three disponíveis
- **Objetivo:** inventário reutilizável para restauração.
- **Especialista:** R3F+Drei+Three Specialist
- **Arquivos prováveis:** `src/components/**`, `src/lib/three-console.ts`, `public/models/**`.
- **MCP necessário:** Context7
- **Passos:** mapear Canvas, loaders, controls, materiais e fallbacks.
- **Validação:** tabela componente -> uso -> status.
- **Critério de aceite:** arquitetura 3D pronta para reintegração segura.
- **Risco:** código legado com APIs deprecadas.

## T05 — Auditar erro next/image loader sem width
- **Objetivo:** confirmar ponto exato do contrato quebrado.
- **Especialista:** Next.js App Router Specialist
- **Arquivos prováveis:** seção Origin/Beliefs, `src/lib/supabase/image-loader.mjs`.
- **MCP necessário:** Context7
- **Passos:** localizar `loader` custom e verificar `{src,width,quality}`.
- **Validação:** reprodução local do warning e causa raiz.
- **Critério de aceite:** decisão técnica (corrigir/remover/unoptimized) fundamentada.
- **Risco:** múltiplos loaders competindo.

## T06 — Auditar paths `/site.assets`
- **Objetivo:** validar semântica local vs remota desses paths.
- **Especialista:** Supabase Storage Auditor
- **Arquivos prováveis:** `src/config/site-assets.*`, `src/lib/supabase/site-assets*`, componentes de origem.
- **MCP necessário:** Supabase MCP
- **Passos:** rastrear cada path da `/sobre` até origem real.
- **Validação:** matriz path atual/esperado por seção.
- **Critério de aceite:** ambiguidade eliminada.
- **Risco:** normalização de path quebrar cache existente.

## T07 — Auditar bucket `site-assets` via Supabase MCP
- **Objetivo:** comprovar existência e metadados dos objetos ORIGEM.
- **Especialista:** Supabase MCP Operator
- **Arquivos prováveis:** N/A (auditoria remota)
- **MCP necessário:** Supabase MCP
- **Passos:** listar objetos, checar ACL, MIME, CORS, cache e URLs públicas/render.
- **Validação:** tabela obrigatória (seção, asset, path, bucket, existência, URL, HTTP, consumidor, ação).
- **Critério de aceite:** diagnóstico objetivo para cada asset crítico.
- **Risco:** credenciais MCP indisponíveis.

## T08 — Auditar `next.config.*`
- **Objetivo:** validar suporte de imagens remotas e CSP.
- **Especialista:** Firebase Hosting Readiness Reviewer
- **Arquivos prováveis:** `next.config.mjs`, `firebase.json`.
- **MCP necessário:** Context7
- **Passos:** revisar `images.*`, CSP `img-src`, implicações no Firebase hosting.
- **Validação:** checklist de conformidade.
- **Critério de aceite:** configuração suficiente para estratégia escolhida.
- **Risco:** otimização de imagem incompatível com runtime alvo.

## T09 — Planejar correção loader/remoção
- **Objetivo:** definir solução única para `next/image`.
- **Especialista:** Next.js Best Practices
- **Arquivos prováveis:** componentes ORIGEM + loader util.
- **MCP necessário:** Context7
- **Passos:** escolher entre loader compatível, URL pública sem loader, ou `unoptimized` com justificativa.
- **Validação:** warning desaparece em `/sobre`.
- **Critério de aceite:** sem `next-image-missing-loader-width`.
- **Risco:** regressão de performance.

## T10 — Planejar restauração do 3D Ghost
- **Objetivo:** reintroduzir 3D conforme intenção original.
- **Especialista:** R3F+Drei+Three Specialist
- **Arquivos prováveis:** seção Beliefs + componentes Ghost.
- **MCP necessário:** Context7
- **Passos:** recuperar componente original/equivalente, ajustar layering e tokens.
- **Validação:** presença visual do Ghost sem ruído.
- **Critério de aceite:** seção deixa de ser textualizada e preserva atmosfera.
- **Risco:** overdraw/z-index conflitar com manifesto.

## T11 — Planejar fallback seguro WebGL
- **Objetivo:** robustez em falha WebGL/dispositivo restrito.
- **Especialista:** Performance Engineer
- **Arquivos prováveis:** boundary da seção Beliefs, fallback assets.
- **MCP necessário:** não
- **Passos:** definir fallback estático, lazy mount, gate de viewport/motion.
- **Validação:** conteúdo acessível mesmo sem WebGL.
- **Critério de aceite:** sem quebra de layout/UX.
- **Risco:** fallback visual descaracterizar seção.

## T12 — Planejar validação visual desktop
- **Objetivo:** comprovar restauração desktop.
- **Especialista:** QA Visual Regression Engineer
- **Arquivos prováveis:** specs e screenshots de referência.
- **MCP necessário:** não
- **Passos:** checklist de composição, camadas, contraste e narrativa.
- **Validação:** comparação com docs/screenshots.
- **Critério de aceite:** aderência Ghost Design desktop.
- **Risco:** baseline incompleto.

## T13 — Planejar validação visual mobile
- **Objetivo:** comprovar restauração mobile.
- **Especialista:** Accessibility and SEO Reviewer
- **Arquivos prováveis:** seção `/sobre` e referências mobile.
- **MCP necessário:** não
- **Passos:** validar legibilidade, hierarquia, fallback e performance percebida.
- **Validação:** checklist mobile aprovado.
- **Critério de aceite:** sem regressão de UX mobile.
- **Risco:** clipping/overflow em breakpoints.

## T14 — Planejar validação de console
- **Objetivo:** eliminar erros fatais/warnings críticos.
- **Especialista:** Frontend Code Review
- **Arquivos prováveis:** console dev/build logs.
- **MCP necessário:** não
- **Passos:** executar `/sobre` e coletar logs relevantes.
- **Validação:** ausência do warning de loader width.
- **Critério de aceite:** console limpo de erros críticos.
- **Risco:** warnings colaterais mascararem regressão.

## T15 — Planejar validação de build
- **Objetivo:** garantir integridade de entrega.
- **Especialista:** lint-and-validate
- **Arquivos prováveis:** projeto inteiro.
- **MCP necessário:** não
- **Passos:** `pnpm lint`, `pnpm typecheck`, `pnpm build`.
- **Validação:** comandos concluídos sem falha crítica.
- **Critério de aceite:** gates técnicos aprovados ou limitações documentadas.
- **Risco:** tempo alto de execução local.

## T16 — Planejar atualização de docs
- **Objetivo:** sincronizar `.context` após alterações em `src/`.
- **Especialista:** Frontend Architect
- **Arquivos prováveis:** `.context/DOCS-PORTFOLIO-PAGES/**`.
- **MCP necessário:** não
- **Passos:** registrar decisões e estado final da seção restaurada.
- **Validação:** docs refletindo implementação final.
- **Critério de aceite:** consistência código↔contexto.
- **Risco:** drift documental em PR futuro.

## T17 — Gerar `walkthrough.md`
- **Objetivo:** consolidar causa raiz, mudanças, evidências e riscos.
- **Especialista:** QA Visual Regression Engineer
- **Arquivos prováveis:** `docs/walkthrough.md` (ou diretório padrão do projeto)
- **MCP necessário:** não
- **Passos:** compilar logs, checks, validações visuais e técnicas.
- **Validação:** documento cobrindo todos os itens obrigatórios do incidente.
- **Critério de aceite:** rastreabilidade completa da restauração.
- **Risco:** evidências insuficientes se não capturadas durante execução.

## Atualização pós-aprovação — mudança de escopo T10/T11 (2026-05-18)

A ressalva humana aprovada cancela a reintrodução de animação Ghost 3D em `06-O-QUE-ME-MOVE`.

- **T10 atualizado:** preservar a implementação documentada sem Ghost 3D na seção, validando que `AboutBeliefs` continua sem `GhostScene`, `Canvas`, `BeliefManifesto`, `BeliefFixedHeader` e GSAP.
- **T11 atualizado:** fallback WebGL deixa de se aplicar a essa seção, porque WebGL não deve montar em `06-O-QUE-ME-MOVE`; os componentes 3D existentes permanecem preservados fora do fluxo da seção.
- **Execução prioritária:** corrigir keys de assets da ORIGEM e remover loader custom quando `next/image` recebe caminho local `/site.assets/...`.


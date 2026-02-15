# 13-PLANO-DE-AJUSTES-PORTFOLIO

## Escopo
Plano de execução para os itens apontados em `SESSÕES-MD/PORTFOLIO/10-ANALISE-GLOBAL-DA-PORTFOLIO.md`, com foco em:
1. governança de destino dos cards (Alta),
2. conteúdo editorial específico em `/portfolio/[slug]` (Média),
3. contraste/legibilidade do hero em vídeo (Média),
4. consistência de contato entre header/footer (Baixa).

## Skills aplicadas no plano
- `.agent/skills/3d-web-experience/SKILL.md`
- `.agent/skills/framer-motion/SKILL.md`
- `.agent/skills/audit-website/SKILL.md`
- `.agent/skills/nextjs-react-expert/SKILL.md`
- `.agent/skills/supabase/SKILL.md`

## Referências técnicas (MCP Context7)
- Next.js App Router: https://context7.com/vercel/next.js/llms.txt?tokens=100000
- Framer Motion (reducedMotion, AnimatePresence): https://context7.com/grx7/framer-motion/llms.txt
- Supabase SSR/Auth patterns: https://context7.com/supabase/ssr/llms.txt

## Faseamento recomendado
### Fase 0 — Baseline (0.5 dia)
- Confirmar baseline funcional e de métricas.
- Registrar estado atual dos fluxos:
  - click em card com `landingPageSlug`,
  - click em card sem `landingPageSlug`,
  - abertura/fechamento de modal com restore de foco.
- Evidência:
  - auditoria `squirrel` em `/portfolio`,
  - checklist manual de a11y (teclado, foco, Esc, contraste).

### Fase 1 — Destino de card explícito no schema (Alta, 1-2 dias)
Objetivo: remover heurística implícita de clique e tornar destino previsível por dado.

Arquivos-alvo:
- `src/types/project.ts`
- `src/lib/portfolio/project-mappers.ts`
- `src/components/portfolio/ProjectCard.tsx`
- `src/app/portfolio/PortfolioClient.tsx`
- `src/components/admin/ProjectForm.tsx`
- `src/app/admin/(protected)/trabalhos/actions.ts`

Ações:
- Introduzir campo explícito de destino (exemplo):
  - `destination.type`: `modal | internal_landing | external_url`
  - `destination.href` opcional para `external_url`
  - `destination.landingSlug` opcional para `internal_landing`
- Ajustar mapper para preencher `destination` a partir dos campos atuais (`landing_page_id`, `link`) com fallback seguro.
- Substituir lógica atual em `ProjectCard` (categoria/tag) por decisão centralizada em `destination.type`.
- Validar entrada no Admin para impedir combinações inválidas (ex.: `external_url` sem URL).

Critérios de aceite:
- Nenhum card depende de `category/tags` para decidir destino.
- Click behavior é idempotente e consistente em desktop/mobile.
- Sem regressão de modal em projetos `modal`.

### Fase 2 — Conteúdo real por projeto em `/portfolio/[slug]` (Média, 1-2 dias)
Objetivo: eliminar copy genérica no detalhe de projeto.

Arquivos-alvo:
- `src/app/portfolio/[slug]/page.tsx`
- `src/lib/portfolio/project-mappers.ts`
- `src/lib/supabase/queries/projects.ts`
- `src/components/admin/ProjectForm.tsx`

Ações:
- Estruturar conteúdo de case por projeto (ex.: problema, abordagem, resultado, créditos) com fallback mínimo.
- No Admin, permitir edição desse conteúdo de forma validada.
- No `[slug]`, renderizar seções condicionais e remover blocos genéricos quando houver conteúdo específico.
- Garantir que `generateMetadata` use descrição real do projeto quando disponível.

Critérios de aceite:
- Cada projeto publicado tem texto editorial específico.
- Sem textos placeholder em produção.
- Metadata por slug coerente com conteúdo real.

### Fase 3 — Contraste e legibilidade do hero com vídeo (Média, 0.5-1 dia)
Objetivo: manter leitura AA com variação de frames do vídeo.

Arquivos-alvo:
- `src/components/portfolio/PortfolioHeroNew.tsx`
- `src/hooks/useMotionGate.ts` (somente se necessário)

Ações:
- Revisar overlay e piso de gradiente para garantir contraste mínimo em cenários críticos.
- Preservar política de motion:
  - sem `scale/bounce/rotate`,
  - foco em `opacity/blur/translateY`,
  - `prefers-reduced-motion` mantendo fallback estático.
- Documentar combinação final de camadas (video + overlay + glow) e o rationale.

Critérios de aceite:
- Título do hero legível em frames claros e escuros.
- Fallback em reduced motion visualmente consistente.

### Fase 4 — Consistência de contato entre Header/Footer (Baixa, 0.5 dia)
Objetivo: padronizar convenções de navegação para contato.

Arquivos-alvo:
- `src/config/navigation.ts`
- `src/components/layout/header/SiteHeader.tsx`
- `src/components/layout/SiteFooter.tsx`

Ações:
- Unificar semântica de `#contact` (header/footer), mantendo comportamento correto em rotas internas.
- Revisar labels divergentes de portfólio no header/footer para consistência editorial.

Critérios de aceite:
- Header e footer convergem para a mesma convenção de contato.
- Navegação por hash funciona sem rota quebrada.

### Fase 5 — Validação final (0.5 dia)
- Reexecutar auditoria:
  - `squirrel audit https://portfoliodanilo.com/portfolio --format llm --coverage full --max-pages 30`
- Executar smoke checklist:
  - filtro da galeria,
  - modal (focus trap + restore),
  - rotas `/portfolio/[slug]`,
  - CTA para contato.
- Registrar resultado em nova nota de fechamento.

## Backlog priorizado (resumo)
1. Alta: destino de card explícito no schema e no Admin.
2. Média: conteúdo específico por projeto em `/portfolio/[slug]`.
3. Média: hardening de contraste do hero.
4. Baixa: alinhamento de contato header/footer.

## Riscos e mitigação
- Risco: regressão de navegação ao trocar heurística de card.
  - Mitigação: tabela de casos de destino + smoke manual por categoria.
- Risco: conteúdo incompleto em projetos antigos.
  - Mitigação: fallback curto obrigatório + flag de “pronto para publicar”.
- Risco: impacto visual excessivo no hero ao ajustar overlay.
  - Mitigação: ajuste incremental e revisão em mobile/desktop com reduced motion.

## Definition of Done (Portfolio)
- Todos os itens de Fase 1 e Fase 2 concluídos.
- Sem regressão de modal/a11y.
- Hero com contraste validado.
- Navegação de contato consistente.
- Auditoria final registrada.

# ANÁLISE GLOBAL DA PORTFOLIO (PÁGINA /portfolio)

## Escopo

- Página auditada: `/portfolio` (+ `portfolio/[slug]`).
- Fontes analisadas:
  - Código App Router + componentes de portfolio.
  - Protótipo canônico: `SESSÕES-MD/PORTFOLIO/PORTFOLIO-PROTOTIPO-INTERATIVO.md`.
  - Auditoria web automatizada (squirrel).

## Skills Utilizadas

- `.agent/skills/3d-web-experience/SKILL.md`
- `.agent/skills/framer-motion/SKILL.md`
- `.agent/skills/audit-website/SKILL.md`
- `.agent/skills/nextjs-react-expert/SKILL.md`
- `.agent/skills/supabase/SKILL.md`

## Referências Context7 (MCP)

- Next.js (`/vercel/next.js`): App Router, `generateMetadata`, segmentos dinâmicos, `force-dynamic`/`fetchCache`.
- Framer Motion (`/grx7/framer-motion`): `MotionConfig` com `reducedMotion`, `AnimatePresence` para transições de saída.
- Supabase SSR (`/supabase/ssr`): `createServerClient`, refresh de sessão em middleware, proteção de rotas server-side com `auth.getUser()`.

## Resultado de auditoria web (squirrel)

- Comandos executados:
  - `squirrel audit https://portfoliodanilo.com/portfolio --format llm --coverage full --max-pages 30`
- Resultado retornado:
  - Score: 98 (A)
  - Warnings: 1 (`security/http-to-https`)
- Limitação importante:
  - crawler reportou `Audited 0 pages`; portanto a decisão técnica foi baseada principalmente em auditoria de código e arquitetura.

## Matriz de conformidade por sessão

| Sessão            | Status  | Observação principal                                               |
| ----------------- | ------- | ------------------------------------------------------------------ |
| 01 Header         | Parcial | Bom estruturalmente, depende de consistência global de copy/motion |
| 02 Hero           | Parcial | Boa execução com fallback, validar overlay em frames extremos      |
| 03 Gallery        | Bom     | Filtros + LERP com gate de performance bem aplicado                |
| 04 Cards          | Parcial | Boa UX, mas regra de roteamento pode ser mais explícita no modelo  |
| 05 Modal          | Bom     | A11y sólida: foco, Esc, trap e restore                             |
| 06 Projeto [slug] | Parcial | SEO forte, conteúdo textual ainda genérico                         |
| 07 Clients        | Bom     | Reuso consistente                                                  |
| 08 Contact        | Bom     | Fluxo de conversão coerente                                        |
| 09 Footer         | Parcial | Depende de alinhamento global de links                             |

## Achados prioritários

1. Alta: formalizar no schema do projeto o tipo de destino do card (modal / landing interna / link externo).
2. Média: substituir textos genéricos em `/portfolio/[slug]` por conteúdo específico por projeto.
3. Média: manter revisão de contraste no hero por variabilidade do vídeo.
4. Baixa: alinhamento contínuo entre convenções de contato no header/footer.

## Conclusão

A página `/portfolio` está tecnicamente sólida, com boa base de acessibilidade, motion controlado e integração com Supabase. Os maiores ganhos agora estão em governança de dados (destino do card) e qualidade editorial do conteúdo dinâmico por case.

---

## Atualização 2026-03-15 — Ajustes executados após auditoria Squirrel site-wide

### O que foi confirmado como problema real

- JSON-LD global inválido por `Organization.logo` fora do shape esperado.
- Títulos SEO duplicando a marca por conflito entre `metadata.title` e o template global do App Router.
- `Multiple H1` em `/portfolio/video-manifesto` por H1 vindo do markdown do case.
- Achados de `alt` na Home compatíveis com thumbs/logos dos cards destaque.

### O que foi corrigido

- [src/components/ui/JsonLd.tsx](../../../src/components/ui/JsonLd.tsx)
  - `Organization.logo` agora sai como URL absoluta string.
- [src/lib/seo.ts](../../../src/lib/seo.ts)
  - nova normalização para títulos templated.
- [src/app/portfolio/page.tsx](../../../src/app/portfolio/page.tsx)
  - títulos de categorias deixaram de embutir a marca no valor base.
- [src/app/portfolio/[slug]/page.tsx](../../../src/app/portfolio/[slug]/page.tsx)
  - título do case passou a respeitar o template.
  - H1 do markdown foi rebaixado para H2 na renderização pública.
- [src/components/home/featured-projects/FeaturedProjectCardFrame.tsx](../../../src/components/home/featured-projects/FeaturedProjectCardFrame.tsx)
  - thumbs e logos agora expõem `alt` descritivo.

### Decisão de escopo

- Itens ligados a `Video Captions` e acessibilidade de vídeos decorativos/autoplay foram mantidos fora desta rodada.
- A inconsistência de CSP observada no ambiente publicado permanece como item de validação pós-deploy, porque localmente o header está correto.

### Validação executada

- `pnpm exec eslint` nos arquivos alterados.
- `pnpm run typecheck`
- `pnpm run build`
- Playwright local confirmando:
  - `/portfolio?category=branding` -> `Portfólio | Brand & Campaigns | Danilo Novais`
  - `/sobre` -> `Sobre — Trajetória e Visão | Danilo Novais`
  - `/portfolio/video-manifesto` -> um único H1 no layout e heading interno rebaixado para H2

---

## Atualização 2026-05-22 — Fluidez do scroll da galeria

### Contrato de movimento

- A galeria mantém um único sistema de scroll suavizado em `useLERPScroll`, aplicado ao track inteiro apenas em desktop, sem `prefers-reduced-motion` e somente quando há mais de 6 projetos filtrados.
- Os cards deixam de fazer scrub contínuo por `useScroll` individual. A entrada visual passa a ser reveal leve por viewport, com `opacity + y`, `GHOST_EASE` e sem `filter: blur()` animado durante o scroll.
- `will-change-transform` agora fica condicionado ao LERP ativo, evitando manter hint de compositor em grids sem scroll suavizado.
- GSAP não foi introduzido nesta página; o contrato atual segue Motion + hook custom para preservar arquitetura existente.

### Impacto esperado

- Menos disputa entre translate do grid e reveal de cada card.
- Menor custo de pintura por remover blur contínuo em múltiplos cards.
- Mobile permanece sem LERP, com cards estáveis e sem scroll horizontal.

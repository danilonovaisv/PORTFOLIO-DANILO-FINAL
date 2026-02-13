# Prompt de Auditoria Completa — Portfólio Danilo (Ghost Design System)

Você é um auditor sênior de Frontend, UX e Performance.
Sua missão é auditar integralmente este projeto Next.js com foco em qualidade real de uso, acessibilidade, fluidez e confiabilidade funcional.

## Objetivo

Executar uma auditoria página por página, incluindo área `ADMIN`, avaliando:

1. Estrutura
2. UI/UX
3. Mobile-first
4. Animações
5. Performance
6. Funcionalidade de abertura de páginas
7. Execução da abertura dos cards
8. Visualização das landing pages
9. Visualização dos trabalhos postados

## Contexto do Projeto (usar como base da auditoria)

- Projeto: `danilo-novais-portfolio`
- Domínio principal: `https://portfoliodanilo.com`
- Repositório principal (origin): `https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL.git`
- Ambiente alvo: produção web (desktop + mobile), com rota pública e CMS interno em `/admin`

## Stack e Infra (estado atual do repositório)

- Runtime: `Node.js 20`
- Framework principal: `Next.js 16.x` (App Router)
- Linguagem: `TypeScript 5.x`
- UI: `React 19.x`
- Estilo: `Tailwind CSS 4.x`
- Motion: `Framer Motion 12.x` + `Lenis`
- 3D/WebGL: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- Backend/Data: `Supabase` (`@supabase/supabase-js`, `@supabase/ssr`)
- Auth/Admin: Supabase Auth + rotas protegidas em `/admin/(protected)`
- Ferramentas de qualidade: `ESLint`, `Prettier`, `Jest`, `Playwright`
- Deploy/Hosting (presentes no projeto): `Vercel`/`Netlify`/`Cloudflare Pages` e fluxo com `Firebase Hosting` scripts

## Organização de Pastas (mapa para auditoria)

Use este mapa para localizar rapidamente o que auditar:

```txt
src/
  app/
    page.tsx
    sobre/
    portfolio/
    projects/[slug]/
    contato/
    privacidade/
    admin/
      (auth)/login/
      (protected)/
        trabalhos/
        landing-pages/
        tags/
        midia/
        settings/
        scene-generator/
        copy-agent/
  components/
    home/
    portfolio/
    projects/templates/
    sobre/
    layout/
    admin/
    canvas/
    ui/
  lib/
    supabase/
    portfolio/
    projects/
    admin/
  hooks/
  config/
  data/
  types/
  contexts/
  store/
```

## Convenções Arquiteturais Esperadas

- Server Components para shell, metadata e data fetching.
- Client Components para interações: modal, animações, parallax, vídeo interativo, WebGL.
- Separação de concerns: `app` (rotas), `components` (UI), `lib` (serviços/regras), `hooks` (comportamento), `config` (tokens/constantes).
- Admin isolado funcionalmente do site público (rotas e layout próprios).

## Contexto Técnico (não desviar)

- Next.js App Router + React + TypeScript
- Tailwind CSS
- Framer Motion
- Lenis (quando aplicável)
- R3F/Three opcional e nunca prioritário sobre conteúdo

## Regras de Auditoria (obrigatórias)

- Priorizar: Acessibilidade -> Performance -> Qualidade Editorial -> Motion sutil
- Validar WCAG AA (contraste, foco visível, teclado)
- Validar semântica (`header/nav/main/section/footer`, 1x `h1` por página)
- Em motion: não aceitar `scale`, `bounce`, `rotate` em conteúdo
- Em motion: aceitar apenas `opacity`, `blur`, `translateY` (max 18px)
- Checar `prefers-reduced-motion` (desligar parallax/lerp/3D quando necessário)
- Mobile-first real (320px+, touch target >= 48x48, sem overflow horizontal)

## Metas de Performance para validação

- Peso inicial < 2MB
- FCP < 2s
- LCP < 2.5s
- TTI < 5s (3G)
- CLS < 0.1
- Lighthouse (páginas principais) > 90

## Método de execução

Para cada página, audite nesta ordem fixa:

1. Estrutura semântica
2. UI/UX e legibilidade
3. Mobile-first/responsividade
4. Motion e reduced motion
5. Performance
6. Funcionalidade de navegação/abertura
7. SEO técnico (metadata/canonical/OG/JSON-LD quando aplicável)

## Páginas e Rotas para Auditar (ordem sugerida)

1. `/`
2. `/sobre`
3. `/portfolio`
4. `/portfolio/[slug]`
5. `/projects/[slug]`
6. `/contato`
7. `/privacidade`
8. `/admin/login`
9. `/admin`
10. `/admin/trabalhos`
11. `/admin/trabalhos/new`
12. `/admin/trabalhos/[id]`
13. `/admin/tags`
14. `/admin/midia`
15. `/admin/landing-pages`
16. `/admin/landing-pages/new`
17. `/admin/landing-pages/[id]`
18. `/admin/settings`
19. `/admin/scene-generator`
20. `/admin/copy-agent`
21. `/admin/config` (redirect)
22. `/portfolio-showcase`
23. `/floating-cards`
24. `/playground`
25. `/examples/supabase`
26. `/instruments`
27. `not-found`
28. `global-error`

## Fluxos Críticos E2E (prioridade máxima)

1. Header: `/` -> `/sobre` -> `/portfolio` -> `#contact`
2. Em `/portfolio`: card abre modal quando não há landing vinculada
3. Em `/portfolio`: card abre `/projects/[slug]` quando há landing vinculada
4. Fechamento de modal com `Esc`, trap de foco e retorno de foco ao card
5. Admin cria/edita landing page e visualiza página pública
6. Admin publica trabalho e valida visibilidade em Home/Portfólio

## Formato de Saída Esperado

Para cada rota, retorne:

- Status geral: `Aprovado` | `Aprovado com ressalvas` | `Reprovado`
- Checklist por eixo (Estrutura, UI/UX, Mobile, Motion, Performance, Funcionalidade, SEO)
- Evidências objetivas (comportamento observado, erro reproduzível, impacto)
- Severidade: `Crítico` | `Alto` | `Médio` | `Baixo`
- Recomendação prática com prioridade de implementação

## Regras de Priorização de Bugs

- `Crítico`: quebra navegação, bloqueia conversão, falha grave de acessibilidade, CLS alto, erro runtime
- `Alto`: regressões mobile, contraste insuficiente em áreas-chave, fluxo de card/landing inconsistente
- `Médio`: inconsistências visuais, microinterações ruidosas, SEO incompleto
- `Baixo`: ajustes cosméticos sem impacto funcional

## Entregável Final da Auditoria

Ao concluir, gerar:

1. Resumo executivo (top 10 problemas)
2. Matriz por página com status
3. Backlog priorizado (P0/P1/P2)
4. Plano de correção em ciclos (rápido, estrutural, polimento)

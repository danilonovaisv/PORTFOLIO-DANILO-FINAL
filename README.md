# Portfólio Danilo Novais — Next.js

Home page interativa do portfólio institucional alinhada ao briefing em `docs/PORT DAN REVISADO - NEXT.md` e ao layout `docs/HOME-PORTFOLIO-LAYOUYT.jpg`. O foco é replicar a experiência com hero 3D, manifesto em vídeo, navegação suave e vitrine de projetos.

## Visão geral
- Cabeçalho fixo com logo claro e navegação para `home`, `sobre`, `portfolio showcase` e `contato`.
- Hero sticky com orb de vidro líquido (R3F), título “Design, não é só estética.”, subtítulo “[É intenção, é estratégia, é experiência.]”, CTA para `/sobre` e vídeo manifesto que escala para full ao rolar.
- Portfolio showcase com três categorias (Brand & Campaigns, Videos & Motions, Web Campaigns/Websites & Tech) que expandem em linha, seguindo o alinhamento do mock.
- Featured projects em cards grandes com tags, CTA para `/portfolio/{slug}` e destaque “Key visual” no grid.
- Faixa de marcas em fundo azul e seção de contato com links rápidos, redes sociais e formulário enviado para `https://formsubmit.co/danilo@portfoliodanilo.com`.
- Footer espelhando a navegação e copyright `© 2025 Danilo Novais Vilela — todos os direitos reservados`.

## Stack e libs
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript.
- **Estilos:** Tailwind CSS 4 (`app/globals.css`) com tokens de cor e tipografia Inter.
- **Animações:** Framer Motion (reveals, sticky/scroll interactions, microinterações) com fallback a `prefers-reduced-motion`.
- **3D:** React Three Fiber + Drei (Canvas fixo, `MeshTransmissionMaterial`, `Environment` preset city) para o orb de vidro.
- **Ícones/UX:** Lucide, anchors suaves e foco visível em navegação.
- **Formulário:** envio via FormSubmit; links sociais e de contato em `lib/constants.tsx`.

## Organização rápida
- `app/` — rotas (`page.tsx` para home, `/sobre`, `/portfolio` placeholder), layout global com `Header` e `Footer`.
- `components/sections/Hero.tsx` — hero sticky, lógica de scroll, vídeo manifesto e CTA.
- `components/home/` — `PortfolioShowcase`, `FeaturedProjects`, `Clients`, `Contact` e manifesto auxiliar.
- `components/layout/` — `Header` (condensa no scroll, menu mobile acessível) e `Footer`.
- `components/three/` — `HeroGlassCanvas` (Canvas + luzes), `TorusDan` (orb com material transmissivo) e hooks.
- `lib/constants.tsx` — textos, thumbs, logos, links e assets (Supabase) centralizados.
- `public/media/torus_dan.glb` — modelo 3D usado no hero (gerado via `gltfjsx`).

## Conteúdo e assets
- Hero usa `ASSETS.videoManifesto` para thumb e vídeo em loop/mudo; clique/scroll revela a versão full.
- Categorias e projetos usam os thumbnails do bucket Supabase indicados na especificação; substitua URLs em `lib/constants.tsx` se necessário.
- Formulário de contato envia para `danilo@portfoliodanilo.com`; telefone e emails estão na mesma constante.
- Paleta principal: fundo `#F4F5F7`, acento azul `#0057FF`, textos escuros; siga os mesmos tokens para novas seções.

## Rodar localmente
1) Instale dependências:
```bash
npm install
```
2) Desenvolvimento (http://localhost:3000):
```bash
npm run dev
```
3) Build de produção:
```bash
npm run build
```
4) Start da build:
```bash
npm start
```
5) Type-check rápido:
```bash
npm run lint
```

## Próximos passos sugeridos
- Completar conteúdo das rotas `/sobre` e `/portfolio` com o mesmo tom visual da home.
- Afinar parâmetros do orb (`components/three/TorusDan.tsx`) para mobile low-end se notar queda de FPS.
- Validar se todos os assets remotos continuam acessíveis; manter o fallback textual das logos e do 3D em caso de erro.

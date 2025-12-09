# Portfólio Institucional de Danilo Novais

Uma página única refinada criada com React, TypeScript, Framer Motion e React Three Fiber para entregar a experiência descrita em `docs/PORT DAN REVISADO - NEXT.md`:

- **Hero** com modelo de vidro líquido, CTA e vídeo manifesto sincronizados ao scroll.
- **Portfolio showcase** baseado em categorias com thumbs e expansão interativa.
- **Featured projects**, **clients/brands** e **contact form** alinhados com os textos e ativos recomendados no documento.

---

## Arquitetura e pilha

- **Bundler:** Vite + React (entrada em `index.tsx` carrega `src/app/page.tsx`).
- **Componentes principais:**
- `app/page.tsx` monta as seções `Hero`, `PortfolioShowcase`, `FeaturedProjectsSection`, `Clients` e `Contact`.
  - Seções com animações e layout estão em `src/components/home/*`.
  - Layout estático (header/footer) vivos em `src/components/layout`.
  - Cenas 3D encapsuladas em `src/components/three/HeroGlassCanvas.tsx` e `TorusDan.tsx`.
- **Dados e assets controlados via `src/lib/constants.tsx`** (navegação, categorias, projetos em destaque, logos, contatos e links sociais).
- **Estilo:** utilitários Tailwind configurados diretamente nos componentes; a tipografia e paleta seguem o guia da especificação.
- **3D + animação:** `Hero` combina `framer-motion` + `useScroll`, `React Three Fiber` com `MeshTransmissionMaterial`, `Suspense` e `useFrame` para controlar rotação e feedback ao mouse.

---

## Seções implementadas

### Hero + Manifesto

- Tag `[BRAND AWARENESS]`, título `Design, não é só estética.`, subtítulo `[É intenção, é estratégia, é experiência.]` conforme doc.
- Vídeo manifesto (`ASSETS.videoManifesto`) aparece sobre o pano de fundo 3D; o componente `Manifesto` (ainda disponível em `src/components/home/Manifesto.tsx`) garante fallback com alerta quando o arquivo falhar.
- O canvas 3D (`HeroGlassCanvas`) usa `PerspectiveCamera`, `Environment` e `Lightformer` para iluminar o `TorusDan`.
- `TorusDan` combina geometria procedural com `MeshTransmissionMaterial` e parabólica de scroll/mouse; o GLB original está em `public/media/torus_dan.glb` (gerado via `gltfjsx`).
- Ajustes de performance: `samples`, `resolution` e `background` do material seguem os parâmetros recomendados (`512–1024`, `samples 6–16`, `transmission ~1`).

### Portfolio & Featured Projects

- `PortfolioShowcase` renderiza `CATEGORIES` com layout dividido (alinhamento por linha), expansão de card, previews e CTA para `/portfolio`.
- `FeaturedProjectsSection` mostra `featuredProjects` com grids responsivos, badges de categoria e bloco “Like what you see?”; os links apontam para rotas como `/portfolio/{slug}`.

### Clients & Contact

- Os logos `CLIENT_LOGOS` são exibidos em grid sobre fundo azul e recebem fallback textual caso o SVG falhe.
- `Contact` oferece contatos e sociais a partir de `CONTACT_INFO` e `SOCIALS`, além de formulário que envia para `https://formsubmit.co/danilo@portfoliodanilo.com`.

---

## Configurações e personalização

- **Constantes:** atualize `src/lib/constants.tsx` para mudar hero assets, categorias, projetos, logos, contatos e redes sociais. Os valores atuais usam arquivos públicos do Supabase indicados no documento técnico.
- **Assets 3D:** `public/media/torus_dan.glb` (com `public/media/Torus_dan.jsx`) pode ser substituído; ao trocar, reexecute `npx gltfjsx public/media/novo-modelo.glb --transform` para gerar um wrapper similar ao existente.
- **Vídeo manifesto:** altere `ASSETS.videoManifesto` ou substitua o arquivo hospedado para manter o fluxo descrito na seção “Manifesto (vídeo)” do documento.
- **Hero scroll pacing:** `Hero.tsx` usa `useScroll` para controlar opacidade, escala e vídeo. Qualquer refinamento adicional deve respeitar os limites definidos nos mapas (`contentOpacity`, `glassOrbOpacity`, `videoScale`, etc.).
- **Estética geral:** todas as sombras, `backdrop-blur` e cores estão em Tailwind; mantenha a hierarquia de `z-index` e containers sticky para preservar o comportamento de rolagem.

---

## Executando localmente

**Pré-requisitos:** `Node.js` 18 ou superior (configurada no `package-lock`).

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Suba o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O projeto roda em `http://localhost:5173` por padrão.
3. Build de produção:
   ```bash
   npm run build
   ```
4. Preview da build:
   ```bash
   npm run preview
   ```
5. Lint (ESLint):
   ```bash
   npm run lint
   ```
6. Testes (Vitest):
   ```bash
   npm run test
   ```

---

## Observações para deploy

- A saída do `npm run build` é uma SPA estática; hospede em Firebase Hosting, Netlify, Vercel ou outro host estático.
- Se quiser reproduzir o layout App Router indicado no documento, mantenha o diretório `src/app` e invista em rotas adicionais (`/sobre`, `/portfolio`) usando componentes do `Home` como base.
- Antes de publicar, valide os ativos remotos (SVGs de clientes, vídeo manifesto, thumbnails, GLB). Eles estão referenciados e hospedados no bucket público do Supabase mencionado no documento técnico.

---

## Mais informações

Consulte `docs/PORT DAN REVISADO - NEXT.md` para o briefing completo de seções, texto, assets e o guia de implementação. Use esse documento como referência única ao ajustar a experiência visual, 3D e narrativa do site.

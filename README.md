# Portfólio — Danilo Novais

**Next.js · WebGL · Motion · Design Systems**

Este repositório contém o código-fonte do **portfólio institucional de Danilo Novais**, desenvolvido com **Next.js (App Router)** e uma abordagem **experimental-premium**, combinando **WebGL atmosférico**, **motion editorial** e **arquitetura escalável**.

O projeto foi concebido para ir além de um portfólio tradicional, tratando **luz, movimento e tipografia como sistema**, não como efeitos isolados.

🌐 **Site:** [https://portfoliodanilo.com](https://portfoliodanilo.com)

---

## ✦ Visão Geral

A Home Page é composta por uma narrativa visual contínua, com as seguintes seções (ordem não-negociável):

1. **Header** — navegação global (Fluid Glass no desktop / Staggered Menu no mobile)
2. **Hero** — Ghost WebGL + texto editorial estático
3. **Manifesto (vídeo)** — revelação cinematográfica
4. **Portfolio Showcase** — categorias principais de atuação
5. **Featured Projects** — projetos em destaque
6. **Clients / Brands** — marcas atendidas
7. **Contact** — informações e formulário
8. **Footer** — navegação secundária e copyright

O foco é **clareza editorial + impacto sensorial controlado**.

---

## ✦ Stack Principal

### Framework & Linguagem

- **Next.js** (App Router)
- **React**
- **TypeScript**

### Estilo & UI

- **Tailwind CSS**
- Tipografia: **Manrope** (Variable Font, wght 200–800, self-hosted)
- Tokens centralizados em `config/`

### Motion & Interação

- **Framer Motion**
  - `whileInView` para reveals
  - microinterações (`hover`, `tap`)

- Respeito total a `prefers-reduced-motion`

### WebGL / 3D

- **React Three Fiber**
- **@react-three/drei**
- **Postprocessing customizado**
  - Bloom
  - Analog Decay (grain, scanlines, jitter)

> ⚠️ O WebGL é **atmosférico**, nunca estrutural.
> Ele **não controla layout** e **não compete com o conteúdo**.

---

## ✦ Arquitetura de Pastas (Resumo)

```txt
app/
 ├─ layout.tsx        # Layout global
 ├─ page.tsx          # Home
 ├─ portfolio/page.tsx
 ├─ sitemap.ts
 └─ robots.ts

components/
 ├─ header/
 │   ├─ SiteHeader.tsx
 │   ├─ DesktopFluidHeader.tsx
 │   ├─ MobileStaggeredMenu.tsx
 │   └─ webgl/FluidGlass.tsx
 │
 ├─ home/
 │   ├─ HomeHero.tsx
 │   ├─ HeroCopy.tsx
 │   ├─ ManifestoThumb.tsx
 │   ├─ GhostStage.tsx
 │   ├─ PortfolioShowcase.tsx
 │   ├─ FeaturedProjects.tsx
 │   ├─ Clients.tsx
 │   └─ Contact.tsx
 │
 │   └─ webgl/
 │       ├─ GhostCanvas.tsx
 │       ├─ Ghost.tsx
 │       ├─ Eyes.tsx
 │       ├─ Particles.tsx
 │       ├─ Fireflies.tsx
 │       └─ postprocessing/AnalogDecayPass.tsx
 │
 ├─ layout/
 │   ├─ Header.tsx
 │   ├─ Footer.tsx
 │   └─ SmoothScroll.tsx
 │
 └─ ui/
     ├─ Button.tsx
     └─ GlassSurface.tsx
```

---

## ✦ Conceitos-Chave do Projeto

### Hero Ghost (WebGL)

- Entidade etérea abstrata
- Glow azul emissivo (`#0057FF`)
- Follow sutil do cursor (desktop apenas)
- Pulsação orgânica (não mecânica)
- Olhos reativos à velocidade do mouse
- Pós-processamento analógico para textura visual

### Texto da Hero

- **100% estático**
- Nenhuma animação de entrada
- Nenhum glassmorphism em CSS
- Hierarquia editorial clara

### Manifesto (Vídeo)

- Mesmo vídeo usado na Hero e na seção Manifesto
- **Animação cinematográfica de entrada**
  - escala + deslocamento + raio

- Mobile:
  - vídeo aparece apenas abaixo da Hero
  - sem animação agressiva

### Header

- **Desktop (≥1024px)**
  - Objeto óptico fluido em WebGL (Fluid Glass)
  - Refração real (`MeshTransmissionMaterial`)
  - Sincronizado com a energia luminosa do Ghost

- **Mobile / Tablet**
  - Menu fullscreen staggered
  - Sem WebGL pesado
  - Foco em performance e acessibilidade

---

## ✦ Acessibilidade & Performance

- `prefers-reduced-motion` respeitado globalmente
- Navegação completa por teclado
- Foco visível em todos os elementos interativos
- Canvas WebGL isolado (`ssr: false`)
- DPR limitado em dispositivos móveis
- Apenas `transform` e `opacity` são animados no DOM

---

## ✦ Rodar Localmente

### Instalar dependências

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Build de produção

```bash
npm run build
```

### Preview da build

```bash
npm start
```

---

## ✦ Conteúdo & Assets

- Vídeos e imagens hospedados no **Supabase Storage**
- URLs centralizadas em arquivos de configuração
- Logos em SVG monocromáticos
- Formulário de contato via **FormSubmit**

---

## ✦ Princípios Não-Negociáveis

- ❌ Sem glassmorphism fake em CSS

- ❌ Sem animações decorativas gratuitas

- ❌ Sem WebGL no mobile

- ❌ Sem texto animado na Hero

- ✅ Conteúdo > efeito

- ✅ Movimento como linguagem

- ✅ WebGL como atmosfera

- ✅ Código legível e escalável

---

## ✦ Autor

**Danilo Novais**
Design · Motion · Creative Development

🌐 [https://portfoliodanilo.com](https://portfoliodanilo.com)
📷 [https://instagram.com/danilo_novais](https://instagram.com/danilo_novais)
💼 [https://linkedin.com/in/danilonovais](https://linkedin.com/in/danilonovais)

---

## Gerenciamento de Pacotes (Deploy Cloud Functions)

O desenvolvimento local e a CI usam **pnpm** como gerenciador principal, mas o deploy do Firebase Frameworks/Cloud Build ainda executa `npm ci` dentro dos artefatos das funções.

**Estratégia Adotada:**

1. O repositório versiona apenas `pnpm-lock.yaml`.
2. `package.json` na raiz e em `functions/` mantém `packageManager` alinhado com a versão do `pnpm` usada na CI.
3. No momento do deploy, o workflow remove `packageManager` temporariamente desses manifests e gera `package-lock.json` efêmeros para a raiz e para `functions/`.
4. Esses lockfiles temporários existem apenas durante o deploy para satisfazer o `npm ci` do Cloud Build e são removidos ao final.
5. Se o Cloud Build falhar com `npm ci` e mensagem de lockfile fora de sincronia, a primeira verificação deve ser esse passo de geração temporária de lockfiles.

[![squirrelscan score](https://reports.squirrelscan.com/b/4BF74EB19BY4K02J2DVQQ0WQ.svg?theme=dark)](https://reports.squirrelscan.com/b/4BF74EB19BY4K02J2DVQQ0WQ)


# AUDITORIA TÉCNICA — HOME (portfoliodanilo.com) — PROMPTS EXECUTORES (.md)

> Stack alvo: Next.js (App Router), React + TS, Tailwind, R3F + Drei + Three, Framer Motion, Supabase Storage, Firebase Hosting  
> Regra-mãe: **NÃO alterar nenhum conteúdo textual** (títulos, labels, ordem de seções).  
> Referência visual absoluta: **HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg** (comparação pixel/spacing/posição).  
> Referência lógica/integrações: **PORT DAN REVISADO - NEXT.pdf / .md**.

---

## 1) Visão Geral

### Objetivo da auditoria
Auditar tecnicamente a HOME do site https://portfoliodanilo.com com foco em:
- Fidelidade visual ao layout esperado (imagem de referência).
- Organização e integração dos componentes (Header → Hero → 3D → GLB → Manifesto…).
- Ajustes técnicos por seção: **alinhamento geral, acessibilidade, performance, animações, responsividade e links globais**.
- Manter conteúdo textual original e ordem das seções.

### Escopo (ordem das seções na Home)
1. Header
2. Hero
3. Manifesto (Vídeo)
4. Portfolio Showcase
5. Featured Projects
6. Clients / Brands
7. Contact
8. Footer

---

## 2) Diagnóstico por Dimensão (o que verificar e como)

### UI / Fidelidade Visual (layout)
Checklist:
- Grid/colunas (desktop vs mobile) batendo com a referência.
- Espaçamentos: paddings/margens, gaps entre elementos, alinhamento baseline de títulos/labels.
- Tamanhos de tipografia por breakpoint (H1/H2/labels/CTAs).
- Z-index correto (Header fixo acima, Hero sticky, thumb de vídeo acima do 3D se necessário).
- `scroll-margin-top` em seções ancoradas para compensar header fixo.

### UX / Interações
Checklist:
- CTAs clicáveis com área de toque mínima (48px).
- Cards/stripes inteiros clicáveis sem conflito de elementos interativos aninhados.
- Scroll-to-section suave e previsível (âncoras funcionando em / e em rotas internas).

### Acessibilidade (A11y)
Checklist:
- Estrutura semântica: `header/nav/main/section/footer`.
- Estados `focus-visible` claros em links, botões, stripes e cards.
- `aria-label` em ícones sem texto.
- `prefers-reduced-motion`: reduzir/pausar animações contínuas (especialmente 3D e parallax).
- Vídeo: `muted`, `playsInline` e controle acessível (play/pause).

### Performance (Web + WebGL)
Checklist:
- R3F: limitar `dpr`, reduzir custo de `MeshTransmissionMaterial` em mobile.
- Lazy-load/dynamic import do Canvas/3D (não bloquear o LCP).
- Imagens com `next/image` quando possível; evitar layout shift (dimensões fixas/aspect ratio).
- Vídeo manifesto: preload adequado (`metadata`), poster, e evitar download agressivo em 3G.
- GLB: compressão (draco/meshopt) quando aplicável; `useGLTF.preload`.

> Observação: existe um exemplo de modelo R3F usando `useGLTF("/medias/torrus.glb")` + `MeshTransmissionMaterial` e ainda `leva/useControls`  :OaiMdDirective_Annotations_f4eeh{attrs="eyJpbmRleCI6MH0"}. Isso é um alerta para: (1) conferir o path correto (`/media/...` vs `/medias/...`), (2) evitar `leva` em produção ou condicionar a DEV, e (3) revisar custo do vidro no mobile.

### Animações (Framer Motion + R3F)
Checklist:
- Animações só em `opacity/transform` (evitar animar `width/height/top/left`).
- `whileInView` com `viewport={{ once: true, amount: 0.2 }}` para reduzir retriggers.
- Stagger controlado, duração curta e easing consistente com referência.
- Interações: `whileHover`/`whileTap` padronizadas nos CTAs.

### Links globais / rotas
Checklist (precisa bater com o documento):
- Header:
  - home → `#hero` ou `/`
  - sobre → `/sobre`
  - portfolio showcase → `/portfolio`
  - contato → `#contact` ou `/`
- Hero:
  - CTA principal → `/sobre`
  - thumb do manifesto → `#manifesto`
- Portfolio Showcase:
  - stripes → `/portfolio?category=...`
  - CTA “VEJA MAIS !” → `/portfolio`
  - CTA “let’s build something great !” → `/#contact`
- Contact:
  - form action → `https://formsubmit.co/danilo@portfoliodanilo.com`
  - links sociais conforme doc
- Footer: replicar header + links sociais

---

## 3) Lista de Problemas (classificação sugerida)

> Esta lista é deliberadamente escrita como “o que pode estar divergente” para ser confirmada comparando o site real com a imagem de referência.

### Alta severidade
- Âncoras/IDs incorretos (ex.: `#manifesto`, `#contact`, `#hero`) ou `scroll` quebrado por header fixo.
- CTA “get to know me better !” não indo para `/sobre`.
- Thumb do manifesto não indo para `#manifesto`.
- 3D pesado travando mobile (uso irrestrito de `MeshTransmissionMaterial`).
- Vídeo manifesto carregando com áudio, sem `playsInline`, ou bloqueando LCP.

### Média severidade
- Header sticky/condensado no scroll divergente do comportamento esperado.
- Falta de `focus-visible`/acessibilidade nos elementos interativos (stripes, cards, ícones).
- Animações sem respeitar `prefers-reduced-motion`.
- Imagens dos cards sem aspect ratio fixo (layout shift).

### Baixa severidade
- Pequenas divergências de espaçamento/typography entre seções vs mock.
- Hover/tap inconsistentes entre CTAs.
- Falta de `preload` do GLB para evitar “pop-in”.

---

## 4) Recomendações Prioritárias (ordem de execução)
1. Corrigir **IDs/âncoras + scroll-margin-top** (impacta navegação global).
2. Garantir **Hero**: CTA para `/sobre`, thumb para `#manifesto`, sticky 200vh e transições.
3. Otimizar **R3F** (dpr, degrade mobile, preload, dynamic import).
4. A11y: foco visível, semântica, `aria-label`, vídeo acessível.
5. Ajustes finos de UI: spacing/typography/pixel-fit por breakpoint.

---

## 5) Prompts Técnicos de Ajuste (por seção) — prontos para colar no agente executor

A seguir, cada prompt está no formato “INFOS AGENT”, com ações objetivas e trechos de código exemplificativos (para o executor adaptar ao código existente), respeitando a regra de **não alterar textos**.

> IMPORTANTE: em cada prompt, o executor deve abrir o(s) arquivo(s) reais do repositório e aplicar somente ajustes técnicos/visuais.

---

## Seção: Header (SiteHeader)

### PROMPT (INFOS AGENT)
**Objetivo:**  
Auditar e ajustar tecnicamente o `SiteHeader` para bater com a referência (layout, sticky, compress no scroll), garantindo acessibilidade e links globais corretos, sem mudar nenhum texto.

**Contexto:**  
Projeto Next.js App Router + Tailwind + Framer Motion.

**Código:**  
Usar o código selecionado no editor (arquivo do Header, ex.: `components/SiteHeader.tsx`).

**Restrições:**  
- Não alterar conteúdo textual (labels e ordem: “home”, “sobre”, “portfolio showcase”, “contato”).  
- Não adicionar dependências novas.

**Checklist de ajustes:**
- `header` fixo `top-0 left-0 right-0` com `z-50`.
- Estado “condensado” após scroll (>= 40px): `py-2` + `bg-white/95` + `backdrop-blur`.
- Links: destinos corretos (home → `#hero` ou `/`, sobre → `/sobre`, portfolio showcase → `/portfolio`, contato → `#contact`).
- `focus-visible` com `ring` e `outline-none`.
- Sublinhado animado via `motion.span` (scaleX 0→1).

**Trecho de referência (exemplo):**
~~~~tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const py = useTransform(scrollY, [0, 40], [16, 8]); // px

  const navItems = useMemo(
    () => [
      { label: "home", href: "#hero" },
      { label: "sobre", href: "/sobre" },
      { label: "portfolio showcase", href: "/portfolio" },
      { label: "contato", href: "#contact" },
    ],
    []
  );

  return (
    <motion.header
      style={{ paddingTop: py, paddingBottom: py }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <Link href="/" aria-label="Ir para a home" className="font-semibold">
          {/* manter logo atual */}
        </Link>

        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-6 text-sm text-gray-700">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="relative outline-none transition-colors hover:text-[#0057FF] focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2"
                >
                  {item.label}
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#0057FF]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
~~~~

**Formato de resposta do executor:**  
- Listar ajustes aplicados + retornar o arquivo completo ajustado.

---

## Seção: Hero (Hero + 3D + Thumb do Manifesto)

### PROMPT (INFOS AGENT)
**Objetivo:**  
Garantir que o Hero esteja fiel ao mock: grid 2 colunas (desktop), sticky ~200vh, CTA indo para `/sobre`, thumb indo para `#manifesto`, 3D com performance e fallback para `prefers-reduced-motion`.

**Contexto:**  
Next.js App Router + Tailwind + Framer Motion + R3F/Drei.  
Integração obrigatória: `Hero.tsx → HeroGlassCanvas.tsx → GlassOrb/Orb → GLB`.

**Código:**  
Usar o código selecionado no editor (ex.: `components/Hero.tsx`, `components/HeroGlassCanvas.tsx`, `components/GlassOrb.tsx`).

**Restrições:**  
- Não mudar nenhum texto: `[BRAND AWARENESS]`, `Design, não é só estética.`, `[É intenção, é estratégia, é experiência.]`, `get to know me better !`.  
- Não alterar ordem/posição conceitual dos elementos (texto, 3D, tag, thumb).  
- Não adicionar libs novas.

**Checklist de ajustes:**
- Hero com altura ~`200vh` e bloco interno `sticky top-0 min-h-screen`.
- CTA principal navega para `/sobre`.
- Thumb manifesto scrolla para `#manifesto` e anima com `useScroll/useTransform`.
- `prefers-reduced-motion`: desativar rotação contínua/parallax e manter fades simples.
- R3F:
  - `Canvas` com `dpr={[1, 1.5]}` e `eventSource={document.body}`.
  - Tiering mobile: reduzir `samples/resolution` do vidro.
  - `Environment preset="city"` para highlights no vidro.
  - Validar path do GLB: preferir `/media/torus_dan.glb`.

> Atenção: há um exemplo de GLB carregando via `useGLTF("/medias/torrus.glb")`  :OaiMdDirective_Annotations_f4eeh{attrs="eyJpbmRleCI6MX0"} — conferir se no projeto existe divergência entre `/media` e `/medias` e corrigir para o path real do asset.

**Trecho de referência (R3F/vidro — exemplo):**
~~~~tsx
import { Canvas } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { Suspense, useMemo } from "react";

function GlassModel() {
  const { nodes } = useGLTF("/media/torus_dan.glb");
  const mat = useMemo(
    () => ({
      transmission: 1,
      thickness: 0.6,
      roughness: 0.08,
      ior: 1.25,
      chromaticAberration: 0.06,
      backside: true,
      samples: 12,
      resolution: 768,
    }),
    []
  );

  return (
    <mesh geometry={(nodes as any).Torus?.geometry || (nodes as any).Torus002?.geometry}>
      <MeshTransmissionMaterial {...mat} />
    </mesh>
  );
}

export function HeroGlassCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 3], fov: 45 }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
    >
      <Suspense fallback={null}>
        <Environment preset="city" />
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 3, 2]} intensity={1.1} />
        <GlassModel />
      </Suspense>
    </Canvas>
  );
}

// opcional: preload para reduzir pop-in
useGLTF.preload("/media/torus_dan.glb");
~~~~

> Dica: `useGLTF.preload(...)` é um padrão recomendado para reduzir tempo de resposta/percepção de loading  :OaiMdDirective_Annotations_f4eeh{attrs="eyJpbmRleCI6Mn0"}.

---

## Seção: Manifesto (Vídeo)

### PROMPT (INFOS AGENT)
**Objetivo:**  
Garantir que a seção `#manifesto` seja acessível, performática e fiel ao mock, usando o vídeo do Supabase, com autoplay **muted**, `playsInline`, placeholder e controle de play/pause acessível (sem mudar textos).

**Contexto:**  
Seção com vídeo em destaque, com overlays (play, gradiente). Pode ser `motion` para reveal.

**Código:**  
Usar o arquivo selecionado (ex.: `components/Manifesto.tsx`).

**Restrições:**  
- Não adicionar novas dependências.
- Não mudar a fonte do vídeo (URL do Supabase) nem textos existentes.

**Checklist de ajustes:**
- `id="manifesto"` no container.
- `<video muted playsInline autoPlay loop preload="metadata">`.
- Botão play/pause com `aria-label`.
- `prefers-reduced-motion`: desativar transições agressivas; manter fade.
- Manter aspect ratio estável para não dar CLS.

**Trecho de referência (exemplo):**
~~~~tsx
<motion.section
  id="manifesto"
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="mx-auto max-w-6xl px-4 py-16"
>
  <div className="relative overflow-hidden rounded-2xl bg-black">
    <video
      className="h-full w-full object-cover"
      src="https://.../VIDEO-APRESENTACAO-PORTFOLIO.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
    <button
      type="button"
      aria-label="Play/Pause manifesto"
      className="absolute left-6 top-6 rounded-full bg-white/10 p-3 backdrop-blur focus-visible:ring-2 focus-visible:ring-white/80"
    >
      {/* ícone atual */}
    </button>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
  </div>
</motion.section>
~~~~

---

## Seção: Portfolio Showcase

### PROMPT (INFOS AGENT)
**Objetivo:**  
Ajustar `PortfolioShowcase` para fidelidade visual (stripes, microtexto, CTAs), com acessibilidade e links corretos para filtros `/portfolio?category=...`, sem alterar textos.

**Código:**  
Usar arquivo selecionado (ex.: `components/PortfolioShowcase.tsx`).

**Restrições:**  
- Não mudar labels: `portfólio showcase`, `Brand & Campaigns`, `Videos & Motions`, `Web Campaigns, Websites & Tech`, `VEJA MAIS !`, `let’s build something great !`.
- Stripes devem continuar 3, na mesma ordem.

**Checklist:**
- Cada stripe deve ser um `<Link>` ou `<button>` focável com área clicável total.
- `focus-visible` + `aria-label` se houver ícone de ponto sem texto.
- Garantir `id="portfolio-showcase"` para âncora do footer.
- Animar entrada com `whileInView` e hover sutil (transform/opacity).
- Mobile: empilhar, alinhar à esquerda conforme referência.

**Trecho de referência (exemplo):**
~~~~tsx
<Link
  href="/portfolio?category=brand-campaigns"
  className="group flex items-center justify-between border-b border-blue-200 py-10 text-3xl font-medium outline-none transition hover:bg-white/40 focus-visible:ring-2 focus-visible:ring-[#0057FF]"
>
  <span>Brand & Campaigns</span>
  <span className="h-3 w-3 rounded-full bg-[#0057FF] transition-transform group-hover:scale-110" aria-hidden="true" />
</Link>
~~~~

---

## Seção: Featured Projects

### PROMPT (INFOS AGENT)
**Objetivo:**  
Garantir grid responsivo e animações (entrada + hover) fiéis ao mock, com imagens otimizadas, sem CLS, e cards acessíveis via teclado.

**Código:**  
Usar arquivo selecionado (ex.: `components/FeaturedProjects.tsx`).

**Restrições:**  
- Não mudar textos dos projetos nem CTA `view projects`.
- Não mudar ordem dos cards.

**Checklist:**
- Cards: link único por card (evitar botões/links aninhados).
- Imagens:
  - Usar `next/image` quando possível.
  - Definir aspect ratio (`aspect-[...]`) e `sizes`.
- Motion:
  - Container: `initial opacity/y`, `whileInView`.
  - Cards: stagger leve; hover: `scale`/`y` e overlay por opacity.
- `prefers-reduced-motion`: desativar hover animado pesado, manter estados simples.

**Trecho (exemplo de card):**
~~~~tsx
<motion.article
  initial={{ opacity: 0, y: 24, scale: 0.98 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl"
>
  <Link href="/portfolio/magic-radio-branding" className="block outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]">
    <div className="relative aspect-[4/3]">
      {/* next/image aqui */}
    </div>
    {/* textos existentes aqui (não alterar) */}
  </Link>
</motion.article>
~~~~

---

## Seção: Clients / Brands

### PROMPT (INFOS AGENT)
**Objetivo:**  
Ajustar a seção de logos para ficar fiel ao mock (faixa azul, grid), com acessibilidade e hover sutil.

**Código:**  
Usar arquivo selecionado (ex.: `components/Clients.tsx`).

**Restrições:**  
- Não mudar o título `marcas com as quais já trabalhei`.
- Não alterar/converter logos (apenas otimizar carregamento e a11y).

**Checklist:**
- `section` com `id="clients"` se o footer/header apontarem para isso.
- Logos com `alt` descritivo (ou `alt=""` + `aria-label` no link se forem decorativos).
- Hover: `scale(1.02~1.04)` e leve ajuste de opacity/brightness.
- Motion: reveal on scroll com stagger pequeno.
- Responsivo: grid adaptável (2–6 colunas conforme breakpoint) mantendo espaçamento do mock.

---

## Seção: Contact

### PROMPT (INFOS AGENT)
**Objetivo:**  
Garantir layout 2 colunas (desktop) e 1 coluna (mobile), com formulário acessível (labels), endpoint correto e links sociais/contato corretos.

**Código:**  
Usar arquivo selecionado (ex.: `components/Contact.tsx`).

**Restrições:**  
- Não mudar textos: `contato`, `Tem uma pergunta ou quer trabalhar junto?`, `Enviar Mensagem`.
- Não mudar o action do form.

**Checklist:**
- `id="contact"` na seção.
- Form:
  - `action="https://formsubmit.co/danilo@portfoliodanilo.com"`
  - Inputs com `label` associado (`htmlFor`/`id`).
  - `autoComplete` e `required` quando já fizer sentido sem mudar UI.
- `focus-visible` em inputs/textarea/button.
- Links: `tel:`, `mailto:` e redes sociais abrindo em nova aba com `rel="noopener noreferrer"`.

**Trecho (exemplo):**
~~~~tsx
<label htmlFor="email" className="text-sm font-medium text-gray-700">Seu email</label>
<input
  id="email"
  name="email"
  type="email"
  autoComplete="email"
  required
  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]"
/>
~~~~

---

## Seção: Footer

### PROMPT (INFOS AGENT)
**Objetivo:**  
Garantir footer fixo, fiel ao mock, com links globais corretos (replicar header), acessibilidade e hover/underline.

**Código:**  
Usar arquivo selecionado (ex.: `components/Footer.tsx`).

**Restrições:**  
- Não mudar os textos de copyright existentes (mesmo que o documento sugira unificar).
- Não mudar labels dos links.

**Checklist:**
- `fixed bottom-0 left-0 right-0 z-50` (se o mock exigir).
- Links:
  - home → `#hero`
  - portfólio showcase → `#portfolio-showcase`
  - sobre → `/sobre` (se já estiver assim no produto; se estiver `#clients`, apenas validar com o documento e o comportamento desejado)
  - contato → `#contact`
- A11y: `aria-label` em links/ícones sociais; `focus-visible` com ring.
- Motion: fade-in simples ao entrar em view; underline animado consistente com header.

---

## 6) Prompt técnico global (integração Hero → 3D → GLB) — obrigatório

### PROMPT (INFOS AGENT)
**Objetivo:**  
Validar e corrigir a integração de arquivos do Hero 3D, garantindo a cadeia:
`Hero.tsx` → `HeroGlassCanvas.tsx` → `GlassOrb/Orb` → `useGLTF("/media/torus_dan.glb")`.

**Código:**  
Abrir e auditar os arquivos reais que compõem a Hero 3D.

**Restrições:**  
- Não mudar textos.
- Não mudar o modelo (apenas path correto e performance).

**Checklist:**
- Confirmar o path do GLB e corrigir inconsistências (`/media` vs `/medias`). Há exemplo de `useGLTF("/medias/torrus.glb")`  :OaiMdDirective_Annotations_f4eeh{attrs="eyJpbmRleCI6M30"}.
- Remover `leva` do bundle de produção ou condicionar a DEV (o exemplo usa `useControls`)  :OaiMdDirective_Annotations_f4eeh{attrs="eyJpbmRleCI6NH0"}.
- Ajustar `Canvas`:
  - `dpr={[1, 1.5]}`
  - `eventSource={document.body}`
  - `pointerEvents` (quando necessário) sem quebrar interações DOM.
- Implementar `prefers-reduced-motion`:
  - parar rotação contínua e parallax.
- Preload:
  - `useGLTF.preload("/media/torus_dan.glb")` (padrão recomendado)  :OaiMdDirective_Annotations_f4eeh{attrs="eyJpbmRleCI6NX0"}.

---

## 7) Reforço: referência visual final obrigatória
O executor deve usar **HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg** como referência absoluta (alinhamento, espaçamento, tipografia e posição dos elementos). Qualquer ajuste deve aproximar o site do mock sem alterar conteúdo textual.

---

Como usar este componente:

Garanta que o GLB esteja em public/models/torus_dan.glb e que o vídeo remoto esteja acessível (URL Supabase já está no código). O padrão useGLTF + MeshTransmissionMaterial segue a referência de uso típico do Drei em exemplo com GLB + material de vidro 
‌
.
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.


Copie os arquivos para os caminhos indicados (src/components/... e src/app/page.tsx). Se seu projeto não usa alias @/, ajuste os imports no page.tsx.

Confirme as dependências: @react-three/fiber, @react-three/drei, three, framer-motion, tailwindcss. Para materiais refrativos/transmissivos e suas propriedades (ex.: aberração, envMap/cube-camera quando necessário), a base conceitual está alinhada à documentação do Drei 
‌
.

Rode npm run dev e valide a fidelidade visual usando HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg como referência absoluta.

// FILE: src/components/site/SiteHeader.tsx
'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

type NavItem = {
  label: 'home' | 'sobre' | 'portfolio showcase' | 'contato'
  href: string
  ariaLabel: string
}

const navItems: NavItem[] = [
  { label: 'home', href: '/#hero', ariaLabel: 'Ir para Home' },
  { label: 'sobre', href: '/sobre', ariaLabel: 'Ir para página Sobre' },
  {
    label: 'portfolio showcase',
    href: '/portfolio',
    ariaLabel: 'Ir para página Portfolio Showcase',
  },
  { label: 'contato', href: '/#contact', ariaLabel: 'Ir para Contato' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [isCondensed, setIsCondensed] = useState(false)

  const isHome = pathname === '/' || pathname === ''

  useEffect(() => {
    const onScroll = () => setIsCondensed(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerClassName = useMemo(() => {
    const base =
      'fixed top-0 left-0 right-0 z-50 border-b border-black/5 transition-all'
    const padding = isCondensed ? 'py-2 px-4' : 'py-4 px-4'
    const bg = isCondensed ? 'bg-white/95 backdrop-blur' : 'bg-white'
    return `${base} ${padding} ${bg}`
  }, [isCondensed])

  const handleAnchorNav = (href: string) => (e: React.MouseEvent) => {
    // mantém comportamento de âncora suave apenas quando estiver na Home
    if (!isHome) return

    const hashIndex = href.indexOf('#')
    if (hashIndex === -1) return

    const id = href.slice(hashIndex + 1)
    const el = document.getElementById(id)
    if (!el) return

    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      className={headerClassName}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" aria-label="Voltar para Home" className="flex items-center gap-3">
          {/* Logo Light */}
          <img
            src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg"
            alt="Danilo"
            className="h-9 w-auto"
            onError={(e) => {
              const img = e.currentTarget
              img.style.display = 'none'
            }}
          />
          <span className="sr-only">Danilo Novais</span>
          <span className="hidden text-base font-medium text-gray-700 md:inline">
            Danilo Novais
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive =
                (item.href === '/#hero' && isHome) ||
                (item.href === '/sobre' && pathname === '/sobre') ||
                (item.href === '/portfolio' && pathname === '/portfolio')

              return (
                <li key={item.label} className="relative">
                  <Link
                    href={item.href}
                    aria-label={item.ariaLabel}
                    onClick={handleAnchorNav(item.href)}
                    className={[
                      'relative inline-flex items-center text-base font-normal transition-colors',
                      isActive ? 'text-[#0057FF]' : 'text-gray-700 hover:text-[#0057FF]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white',
                    ].join(' ')}
                    data-event="header_nav_click"
                    data-label={item.label}
                    data-destination={item.href}
                  >
                    {item.label}
                    <motion.span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#0057FF]"
                      initial={{ scaleX: isActive ? 1 : 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}

// FILE: src/components/home/HeroGlassCanvas.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import type { MotionValue } from 'framer-motion'
import GlassOrb from './GlassOrb'

type Props = {
  scrollYProgress: MotionValue<number>
  className?: string
}

function HeroLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 2]} intensity={1.35} />
      <directionalLight position={[-4, -1, -2]} intensity={0.6} />
    </>
  )
}

export default function HeroGlassCanvas({ scrollYProgress, className }: Props) {
  const dpr = useMemo(() => [1, 1.5] as [number, number], [])

  return (
    <div className={className}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 4.2], fov: 38, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['transparent']} />
        <Suspense fallback={null}>
          <HeroLights />
          <Environment preset="city" background={false} blur={1} />
          <GlassOrb scrollYProgress={scrollYProgress} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

// FILE: src/components/home/GlassOrb.tsx
'use client'

import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import { useMotionValueEvent, useReducedMotion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

type Props = {
  scrollYProgress: MotionValue<number>
}

function pickFirstMeshGeometry(scene: THREE.Object3D) {
  let geometry: THREE.BufferGeometry | null = null
  scene.traverse((obj) => {
    if (geometry) return
    const mesh = obj as unknown as THREE.Mesh
    if ((mesh as any).isMesh && mesh.geometry) geometry = mesh.geometry
  })
  return geometry
}

export default function GlassOrb({ scrollYProgress }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<any>(null)

  const scrollRef = useRef(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v
  })

  // GLB (não altera o conteúdo textual do site; é apenas o asset 3D)
  const gltf = useGLTF('/models/torus_dan.glb') as any

  const geometry = useMemo(() => {
    const scene: THREE.Object3D | undefined = gltf?.scene
    if (!scene) return null
    return pickFirstMeshGeometry(scene)
  }, [gltf])

  const { viewport } = useThree()

  // escala responsiva semelhante ao padrão de "escala por viewport"
  const baseScale = useMemo(() => {
    const s = Math.min(1.65, Math.max(1.1, viewport.width / 3.6))
    return s
  }, [viewport.width])

  useEffect(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.set(0, 0, 0)
  }, [])

  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return

    const progress = scrollRef.current
    const pointer = state.pointer

    // rotação base + parallax (motion-reduced: reduz / desativa)
    const rotSpeed = prefersReducedMotion ? 0 : 0.25
    const parallax = prefersReducedMotion ? 0 : 0.35

    const targetRotX = pointer.y * parallax
    const targetRotY = pointer.x * parallax + state.clock.elapsedTime * rotSpeed

    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRotX, 1 - Math.pow(0.001, delta))
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRotY, 1 - Math.pow(0.001, delta))

    // distorção / cromática por scroll
    const mat = materialRef.current
    if (mat) {
      const t = prefersReducedMotion ? 0 : progress
      const chroma = THREE.MathUtils.lerp(0.02, 0.085, t)
      const distortion = THREE.MathUtils.lerp(0.08, 0.35, t)
      const temporal = THREE.MathUtils.lerp(0.0, 0.18, t)

      mat.chromaticAberration = chroma
      mat.distortion = distortion
      mat.temporalDistortion = temporal
    }
  })

  if (!geometry) {
    // fallback seguro caso o GLB não esteja disponível
    return (
      <group ref={groupRef} scale={baseScale} position={[0.3, 0.15, 0]}>
        <mesh>
          <torusKnotGeometry args={[1, 0.36, 220, 24]} />
          <MeshTransmissionMaterial
            ref={materialRef}
            thickness={0.22}
            roughness={0.02}
            transmission={1}
            ior={1.25}
            chromaticAberration={0.05}
            distortion={0.18}
            distortionScale={0.45}
            temporalDistortion={0.12}
            anisotropicBlur={0.1}
            backside
          />
        </mesh>
      </group>
    )
  }

  return (
    <group ref={groupRef} scale={baseScale} position={[0.45, 0.15, 0]}>
      <mesh geometry={geometry}>
        <MeshTransmissionMaterial
          ref={materialRef}
          thickness={0.22}
          roughness={0.02}
          transmission={1}
          ior={1.25}
          chromaticAberration={0.05}
          distortion={0.18}
          distortionScale={0.45}
          temporalDistortion={0.12}
          anisotropicBlur={0.1}
          backside
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/torus_dan.glb')

// FILE: src/components/home/Hero.tsx
'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'

const HeroGlassCanvas = dynamic(() => import('./HeroGlassCanvas'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-[28px] bg-white/40 backdrop-blur-sm" />
  ),
})

const MANIFESTO_VIDEO_URL =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Texto perde foco no scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2])
  const textTranslateY = useTransform(scrollYProgress, [0, 0.7], [0, -24])

  // Thumb ganha destaque no scroll (sem fullscreen)
  const thumbScale = prefersReducedMotion
    ? 1
    : useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const thumbTranslateY = prefersReducedMotion
    ? 0
    : useTransform(scrollYProgress, [0, 1], [0, -24])

  const [thumbErrored, setThumbErrored] = useState(false)
  const [thumbCanPlay, setThumbCanPlay] = useState(true)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // reduz trabalho de GPU/CPU quando não está no topo (heurística simples)
    // não altera conteúdo textual; apenas otimiza a thumb em scroll mais profundo
    if (prefersReducedMotion) return
    if (v > 0.9) setThumbCanPlay(false)
    else setThumbCanPlay(true)
  })

  const containerVariants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  }

  const fadeUp = (delay = 0) => ({
    initial: { y: 18, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: 'easeOut', delay },
    },
  })

  const titleLine = {
    initial: prefersReducedMotion ? { opacity: 0 } : { y: 16, opacity: 0 },
    animate: prefersReducedMotion
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const handleScrollToManifesto = () => {
    const el = document.getElementById('manifesto')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      ref={(n) => {
        heroRef.current = n
      }}
      className="relative min-h-[100svh] bg-[#F4F5F7] pt-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left column (texto) */}
          <motion.div
            className="relative z-10"
            style={{ opacity: textOpacity, y: textTranslateY }}
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.p
              className="mb-6 inline-flex rounded-md bg-transparent text-base font-medium text-[#0057FF]"
              {...fadeUp(0)}
            >
              [ BRAND AWARENESS ]
            </motion.p>

            <div className="leading-[0.9]">
              <motion.h1 className="text-5xl font-extrabold tracking-tight text-[#111111] sm:text-6xl lg:text-7xl">
                <motion.span className="block text-[#0057FF]" variants={titleLine}>
                  Design,
                </motion.span>
                <motion.span className="block" variants={titleLine}>
                  não é só
                </motion.span>
                <motion.span className="block" variants={titleLine}>
                  estética.
                </motion.span>
              </motion.h1>
            </div>

            <motion.p
              className="mt-6 inline-block rounded-md bg-white/55 px-5 py-3 text-lg font-medium text-[#0057FF] backdrop-blur-sm"
              {...fadeUp(0.05)}
            >
              [É intenção, é estratégia, é experiência.]
            </motion.p>

            <motion.div className="mt-10" {...fadeUp(0.1)}>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-4 text-base font-medium text-white shadow-sm transition-transform hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4F5F7]"
                data-event="hero_cta_click"
              >
                <span>get to know me better →</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 17L17 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 7h8v8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column (3D + tag + thumb) */}
          <div className="relative">
            <div className="relative h-[560px] w-full lg:h-[680px]">
              {/* 3D Canvas */}
              <div className="absolute inset-0">
                <HeroGlassCanvas className="h-full w-full" scrollYProgress={scrollYProgress} />
              </div>

              {/* Tag (bloco translúcido) */}
              <div className="pointer-events-none absolute right-0 top-10 w-full max-w-[420px] rounded-md bg-white/35 px-12 py-9 backdrop-blur-sm">
                <p className="text-xl font-medium tracking-wide text-[#0057FF]">
                  [ BRAND AWARENESS ]
                </p>
              </div>

              {/* Thumb do vídeo manifesto */}
              <motion.button
                type="button"
                onClick={handleScrollToManifesto}
                className="group absolute bottom-8 right-0 w-[240px] cursor-pointer rounded-xl border border-black/5 bg-white/10 p-2 shadow-sm backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4F5F7] sm:w-[280px]"
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: thumbScale as any,
                        y: thumbTranslateY as any,
                        willChange: 'transform',
                      }
                }
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                aria-label="Ir para manifesto em vídeo"
                data-event="hero_thumb_click"
              >
                <div className="relative overflow-hidden rounded-lg bg-black">
                  {/* Sem overlay (sem texto, sem badge, sem ícone sobreposto ao vídeo) */}
                  {thumbErrored ? (
                    <div className="flex aspect-video w-full items-center justify-center bg-black text-sm text-white/70">
                      Vídeo Manifesto
                    </div>
                  ) : (
                    <motion.video
                      className="aspect-video w-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      muted
                      autoPlay={thumbCanPlay}
                      loop
                      playsInline
                      preload="metadata"
                      onError={() => setThumbErrored(true)}
                    >
                      <source src={MANIFESTO_VIDEO_URL} type="video/mp4" />
                    </motion.video>
                  )}
                </div>

                {/* seta decorativa fora do vídeo (não é overlay) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 left-4 text-[#0057FF] opacity-70 transition-opacity group-hover:opacity-100"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 7h8v8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// FILE: src/components/home/ManifestoSection.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const MANIFESTO_VIDEO_URL =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4'

export default function ManifestoSection() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const inView = useInView(sectionRef, { amount: 0.65 })
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Sempre autoplay; áudio é tentado apenas quando em foco.
    const ensurePlay = async () => {
      try {
        await video.play()
      } catch {
        // ignora: browsers podem bloquear autoplay
      }
    }

    if (inView) {
      // tenta desmutar automaticamente (pode falhar em alguns browsers)
      video.muted = false
      ensurePlay().catch(() => {})
      // se o browser bloquear, volta para mute (sem quebrar)
      const t = window.setTimeout(() => {
        if (video.paused) {
          video.muted = true
          ensurePlay().catch(() => {})
        }
      }, 150)
      return () => window.clearTimeout(t)
    } else {
      video.muted = true
      ensurePlay().catch(() => {})
    }
  }, [inView])

  return (
    <section
      id="manifesto"
      ref={(n) => {
        sectionRef.current = n
      }}
      className="bg-[#0B0B0D] py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-black"
        >
          {errored ? (
            <div className="flex aspect-video w-full items-center justify-center text-sm text-white/70">
              Não foi possível carregar o manifesto em vídeo
            </div>
          ) : (
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              autoPlay
              loop
              playsInline
              muted
              preload="metadata"
              onError={() => setErrored(true)}
            >
              <source src={MANIFESTO_VIDEO_URL} type="video/mp4" />
            </video>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// FILE: src/components/home/ContactSection.tsx
'use client'

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mantido propositalmente neutro: não altera conteúdo textual existente no projeto */}
        <div className="rounded-2xl border border-black/5 bg-white p-10">
          <div className="h-10 w-full" />
        </div>
      </div>
    </section>
  )
}

// FILE: src/app/page.tsx
import SiteHeader from '@/components/site/SiteHeader'
import Hero from '@/components/home/Hero'
import ManifestoSection from '@/components/home/ManifestoSection'
import ContactSection from '@/components/home/ContactSection'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ManifestoSection />
        <ContactSection />
      </main>
    </>
  )
}

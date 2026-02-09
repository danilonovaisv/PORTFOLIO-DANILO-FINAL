# SOBRE — PROTOTIPO INTERATIVO (AS-BUILT)

Versão: **4.0**  
Data: **2026-02-09**  
Status: **Sincronizado com código e runtime local (`/sobre`)**

## 1. Objetivo da rota

A página `/sobre` apresenta narrativa de autoridade criativa em seis blocos principais e fecha com conversão (contato + CTA).

## 2. Fonte de verdade (implementação)

- Rota: `src/app/sobre/page.tsx`
- Seções: `src/components/sobre/sections/*`
- Fechamento global: `src/components/layout/SiteClosure.tsx`
- Conteúdo textual/base: `src/config/content.ts` (`ABOUT_CONTENT`)

## 3. Metadata real

Definida em `src/app/sobre/page.tsx`:

- `title`: `Sobre | Danilo Novais`
- OG/Twitter/canonical definidos para `/sobre`
- JSON-LD: `JsonLd pageType="about"`

## 4. Estrutura real da página

Ordem efetiva renderizada:

1. Header global (`ClientLayout`)
2. `AboutHero`
3. `AboutOrigin`
4. `AboutWhatIDo`
5. `AboutMethod`
6. `AboutBeliefs`
7. `AboutClosing`
8. `SiteClosure`:
   - `ClientsBrandsSection`
   - `ContactSection`
   - `SiteFooter`

## 5. Seções (comportamento atual)

### 5.1 AboutHero

- H1 sr-only composto do manifesto.
- Vídeo desktop e mobile via `DynamicAssetVideo` (asset dinâmico + fallback).
- Overlay escuro aplicado para contraste.
- Em mobile, título manifesto e descrição são renderizados em bloco central.
- Usa parallax vertical (`useScroll` + `useTransform`) quando motion permite.

### 5.2 AboutOrigin

- Seção `Origem Criativa` com 4 blocos narrativos + galeria sticky.
- Estado inicial client-side mostra `LOADING...` até hidratação (`isClient`).
- Conteúdo vem de `ORIGIN_CONTENT` e assets resolvidos por chave/fallback.

### 5.3 AboutWhatIDo

- Desktop: seção com altura extensa (`h-[300vh]`) e track horizontal ligado ao scroll.
- Mobile: cards verticais com entrada lateral.
- Marquee inferior com palavras-chave em loop.
- Texto principal:
  - `Do insight ao impacto.`
  - `Mesmo quando você não percebe.`

### 5.4 AboutMethod

- Fundo em vídeo (desktop/mobile) com overlays de contraste.
- Headline:
  - `Criatividade com método.`
  - `Impacto sem ruído.`
- Lista de 6 etapas com destaque de número.

### 5.5 AboutBeliefs

- Sequência de frases em seções verticais + header fixo.
- Canvas 3D (`GhostScene`) carregado por import dinâmico (`ssr: false`).
- Camadas sobrepostas para texto mobile/final overlay.

### 5.6 AboutClosing

- Headline de fechamento com destaque azul.
- Vídeo de skills (desktop/mobile) com overlay e poster.
- CTA final (do conteúdo):
  - `Fale Comigo` -> `#contact`
  - `Download CV` -> `/cv-danilo-novais.pdf`

## 6. Motion (estado implementado)

Base usada: `cubic-bezier(0.22, 1, 0.36, 1)`.

Padrões presentes:

- `opacity`, `blur`, `translateY`
- scroll-linked motion (parallax/track horizontal)
- dynamic 3D na seção beliefs
- `prefers-reduced-motion` aplicado em diversas transições

Observação importante:

- Existem ocorrências de `scale` em `AboutWhatIDo` (cards desktop). Este documento reflete o estado atual implementado.

## 7. Legibilidade e overlay (estado real)

- Hero e Method usam overlays escuros sobre vídeo.
- Closing também aplica camada de contraste no bloco de vídeo.
- Conteúdo textual principal permanece em camada superior.

## 8. Acessibilidade implementada

- Skip link global disponível via `layout.tsx`
- Estrutura semântica por seções
- H1 único efetivo no Hero (sr-only)
- H2 por blocos principais
- CTA e links com foco visível

## 9. Assets e dependências

- Assets de vídeo/imagem via Supabase Storage + sistema de resolução dinâmica de chaves.
- Seção 3D depende de R3F/Three no client.
- Página inclui blocos de contato e marcas compartilhados com Home/Portfolio.

## 10. Observações de runtime (localhost)

Validado em `http://localhost:3000/sobre`:

- A seção `Origem` inicia com placeholder `LOADING...` e em seguida renderiza conteúdo completo.
- Estrutura das 6 seções principais + fechamento está consistente com o código.
- Console mostra ruídos de ambiente/devtools e avisos de mídia/three em contexto de desenvolvimento.

## 11. Prompt estruturado (referência rápida)

- Página: `/sobre`
- Seções obrigatórias: Hero, Origem, What I Do, Method, Beliefs (com 3D opcional), Closing, SiteClosure
- Requisitos: manter overlays de contraste, fallback de vídeo, fallback/isolamento do 3D, CTA final para contato
- Guardrail: preservar narrativa editorial em PT-BR e hierarquia de headings atual

# Prompt para o Codex — Refino da seção **Portfolio Showcase** (estilo “Lo & Behold”)

Use este prompt completo no Codex (ou modelo de codegen) para reescrever a seção **Portfolio Showcase** em um projeto Next.js 13+ **App Router** com **React + TypeScript**, **Tailwind** e **Framer Motion**. O resultado deve manter o visual “Lo & Behold” (stripes tipográficas + imagem flutuante que segue o cursor), com arquitetura clara e tipagem estrita.

---

## 1) Contexto do projeto
- **Stack:** Next.js 13+ (App Router, pasta `app/`), React, TypeScript (TSX), Tailwind, Framer Motion, `next/image`.
- **Arquitetura desejada:** componentes em `src/components/sections/PortfolioShowcase/`.
- **Client component:** a seção usa hooks, portanto precisa de `"use client"` nos arquivos que utilizarem hooks (principalmente `index.tsx`).
- **Não alterar rotas:** não mude a estrutura de rotas do App Router; apenas reescreva a seção.

## 2) Objetivo do Codex
Reescrever/refinar a seção **Portfolio Showcase** para reproduzir a UX “Lo & Behold”:
- Lista vertical de **stripes** (faixas) ocupando toda a largura do container.
- Hover em desktop: uma imagem/vídeo de pré-visualização aparece e **segue o cursor** com suavização (spring). Itens não ativos ficam com opacidade reduzida e leve blur.
- Mobile: sem hover; a imagem flutuante fica oculta (`hidden md:block`) e as stripes funcionam como botões grandes.
- Visual minimalista preto & branco, tipografia uppercase com `tracking-tight`, microtexto mono, hover suave.
- Acessibilidade: cada stripe é um **link** (`next/link`), com foco visível (`focus-visible:ring`, etc.).

## 3) Arquivos que o Codex deve gerar/reescrever (todos em TSX)
```text
src/
  components/
    sections/
      PortfolioShowcase/
        index.tsx        # Componente principal da seção
        ShowcaseItem.tsx # Componente para cada stripe
        CursorImage.tsx  # Imagem/vídeo que segue o mouse (desktop)
```
Regras gerais:
- Todos os arquivos em TSX, totalmente tipados (sem `any`).
- Usar Tailwind para estilos; manter utilitários responsivos (`md:` etc.).
- Usar Framer Motion apenas onde necessário (imagem flutuante e microinterações).
- Usar `next/image` para pré-visualização (com `fill`, `sizes`, `priority`).

## 4) Dados e tipagem
Use a base de categorias abaixo e defina tipos explícitos (`type` ou `interface`) para os dados e props:
```ts
const categories = [
  {
    id: 'branding-campaigns',
    label: 'Brand & Campaigns',
    labelPT: 'Brand & Campanhas',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
    color: '#EFEFEF',
  },
  {
    id: 'videos-motions',
    label: 'Videos & Motions',
    labelPT: 'Vídeos & Motions',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    color: '#EFEFEF',
  },
  {
    id: 'websites-tech',
    label: 'Web Campaigns, Websites & Tech',
    labelPT: 'Campanhas Web, Websites & Tech',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
    color: '#EFEFEF',
  },
];
```
Tipos esperados (sem `any`):
- `Category`
- `ActiveItem`
- Props de `PortfolioShowcase`, `ShowcaseItem` e `CursorImage`
- Tipagem correta para eventos (ex.: `React.MouseEvent<HTMLDivElement>`)

## 5) Layout e Tailwind (referência “Lo & Behold”)
- `section`: `relative w-full py-24 bg-white text-black overflow-hidden`.
- Container: `container mx-auto px-6 md:px-12`.
- Cabeçalho: microtítulo `text-sm font-mono tracking-widest uppercase`, título principal `text-5xl md:text-7xl font-bold tracking-tighter uppercase`.
- Lista de stripes: `flex flex-col`; cada stripe `flex items-center justify-between py-12 border-t border-black/10`.
- Hover das stripes: deslocamento sutil (`group-hover:translate-x-2`), opacidade reduzida/blur nos itens inativos, fundo `bg-gray-50` em hover.
- CTAs com `group` + ícone `ArrowUpRight` com leve `translate` no hover.
- Manter cores preto & branco; tipografia uppercase com `tracking-tight`.

## 6) Framer Motion e performance
- Imagem flutuante segue o cursor usando `useMotionValue` + `useSpring` (ex.: `{ damping: 20, stiffness: 150, mass: 0.5 }`).
- Evitar re-renderizações: posicionamento via motion values, não via estado React.
- Animações do `CursorImage`: entrada/saída com `scale` + `opacity` (`type: "spring"`).
- Container da imagem: `motion.div` `fixed top-0 left-0`, tamanho ~`400x300px`, `overflow-hidden`, `rounded-lg`, `shadow-2xl`, `pointer-events-none`, `hidden md:block`.

## 7) Regras de acessibilidade
- Cada stripe deve ser um `Link` com `href` (ex.: `/portfolio?filter={id}`).
- Deve ser navegável por teclado, com estados de foco visíveis (`focus-visible:ring`, etc.).
- Em mobile, comportamento de hover desativado; `CursorImage` fica oculto.

## 8) Lógica e estado
- `PortfolioShowcase` controla `activeItem` (contendo ao menos `id` e `src`).
- `onMouseMove` do container atualiza `mouseX/mouseY` (com offset para centralizar a imagem).
- `onMouseLeave` limpa `activeItem`.
- `ShowcaseItem` recebe `isActive` e `hasActive` para aplicar opacidade/blur quando outro item está ativo.

## 9) Código base (para referência de refatoração)
O código atual está resumido abaixo; reescreva-o com tipagem forte, separação em arquivos e melhorias descritas:

```tsx
'use client';
// ... código original dado na especificação (PortfolioShowcase, ShowcaseItem, CursorImage)
```

## 10) Entregável esperado do Codex
O Codex deve responder **apenas** com o conteúdo completo dos arquivos abaixo (sem texto adicional), prontos para uso no projeto Next.js App Router:
1. `src/components/sections/PortfolioShowcase/index.tsx`
2. `src/components/sections/PortfolioShowcase/ShowcaseItem.tsx`
3. `src/components/sections/PortfolioShowcase/CursorImage.tsx`

Garantir que:
- Não exista `any` nos tipos.
- Imports estejam organizados.
- Responsividade (desktop vs mobile) e microinterações sigam a referência visual “Lo & Behold”.
- Performance seja preservada (motion values + spring, sem re-renders desnecessários).
- Acessibilidade básica esteja presente.

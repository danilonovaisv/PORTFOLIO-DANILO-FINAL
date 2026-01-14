---
description: # Workflow: Featured Projects
---

# Workflow: Featured Projects (Destaques)

**Contexto:**
Exibição de projetos selecionados num grid responsivo (Bento Grid) para direcionar tráfego, com foco em criar um layout editorial sofisticado que guie o usuário naturalmente para a página de portfólio completa.

### Referências visuais absolutas (lei)

- docs/HOME "HOME-PORTFOLIO-BLACK---GHOST.jpg" E "HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg"
- Documentação para checagem de configuração: docs/HOME "HOME - PROTOTIPO INTERATIVO.md"

### Dados Obrigatórios (Ajustados)

1.  **Magic — devolvendo a magia ao rádio**
    - Slug: `magic-radio-branding`
    - Categoria: `branding & campanha`
    - Cliente: `Magic`
    - Ano: `2023`
    - Imagem: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp`
2.  **Uma marca ousada e consistente**
    - Slug: `branding-project-01`
    - Categoria: `branding`
    - Cliente: `Cliente confidencial`
    - Ano: `2022`
    - Imagem: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp`
3.  **Key visual para campanha sazonal**
    - Slug: `key-visual-campaign`
    - Categoria: `campanha`
    - Cliente: `Cliente confidencial`
    - Ano: `2021`
    - Imagem: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp`
4.  **Experiência web em movimento**
    - Slug: `webdesigner-motion`
    - Categoria: `web & motion`
    - Cliente: `Cliente confidencial`
    - Ano: `2023`
    - Imagem: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif`

> **Nota:** Os slugs e URLs das imagens são obrigatórios e devem ser usados exatamente como especificado no documento.

### Passo a Passo de Implementação (Ajustado)

1.  **Componente `FeaturedProjects.tsx`:**
    - **Layout Desktop (≥1024px):** Implementar um **grid Bento irregular** usando Tailwind.
      - Row 1: `md:col-span-5` + `md:col-span-7`
      - Row 2: `md:col-span-12`
      - Row 3: `md:col-span-8` + `md:col-span-4` (para o CTA Card)
      - **Background:** `#040013` (fundo escuro principal).
      - **Spacing:** `py-16 md:py-24`, `gap-8 md:gap-12`.
    - **Layout Mobile (≤1023px):** Todos os cards em **stack vertical**, `w-full`, `gap-8`. Alinhar tudo ao centro (`text-center`, `items-center`).

2.  **Componente `ProjectCard.tsx`:**
    - **Animação de Entrada (Scroll Reveal):**
      ```tsx
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
      ```
    - **Hover State (Desktop):**
      - **Image:** `scale: 1.03`, `translateY: -1` (duração: 500ms).
      - **Arrow Icon:** `translateX: 20px` (duração: 700ms, ease-out).
      - **Shadow:** `shadow-xl shadow-blue-500/10` (sombra azul suave).
      - **Pills (Tags):** Posicionadas no canto superior direito, fundo semi-transparente (`#E6EFEF` at 70% opacity), texto pequeno (`font-small`).
    - **Conteúdo do Card:**
      - **Imagem/Video:** Cover completo, aspect ratio mantido.
      - **Info Block (abaixo da imagem):**
        - Título: `h3` (TT Norms Pro, Medium, cor `#fcffff`).
        - Meta: Cliente • Ano (cor `#a1a3a3`, fonte `small`).
        - Ícone de seta em círculo azul, que translada para a direita no hover.

3.  **CTA Secundário (Componente `CTAProjectCard.tsx`):**
    - **Layout:** Colocado no último slot do grid desktop (`md:col-span-4`). Em mobile, é o último item da stack.
    - **Conteúdo:**
      - Headline: `"Like what you see?"` (fonte normal, cor `#fcffff`).
      - Botão: `"view projects →"` (dentro de um botão azul primário `#0048ff`).
    - **Interatividade:**
      - Hover: Texto da headline muda para `#0057FF`, botão ganha leve elevação (`translateY: -1px`) e scale (`1.02`).
      - Click: Navega para `/portfolio`.

4.  **Validação (@Auditor) - Ajustada:**
    - **Alt Text:** Todas as imagens devem ter `alt` descritivo (ex: `"Logo da marca Magic para campanha de branding"`).
    - **Fallback de Imagem:** Se a imagem falhar, mostrar um placeholder genérico com a mesma proporção e uma mensagem como "Projeto em destaque".
    - **Acessibilidade:** Garantir que todos os cards e o CTA sejam focáveis via teclado e tenham `aria-label` adequado.
    - **Performance:** As imagens devem usar `loading="lazy"` e `srcset` para otimização.

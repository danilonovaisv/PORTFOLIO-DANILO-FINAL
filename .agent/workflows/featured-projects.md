---
description:
---

# Workflow: Featured Projects (Destaques)

**Contexto:**
Exibição de projetos selecionados num grid responsivo para direcionar tráfego.

**Dados Obrigatórios (Mockup Inicial):**

1.  **Magic** (Branding) - "Devolvendo a magia ao rádio" - 2023.
2.  **Confidential** (Branding) - "Uma marca ousada e consistente" - 2022.
3.  **Confidential** (Campanha) - "Key visual para campanha sazonal" - 2021.
4.  **Confidential** (Web & Motion) - "Experiência web em movimento" - 2023.
    _Nota: Usar placeholders do Supabase se as imagens finais não estiverem disponíveis, mas manter os slugs._

**Passo a Passo de Implementação:**

1.  **Grid Layout:**
    - Componente `FeaturedProjects.tsx`.
    - Fundo: `#F4F5F7` (continuação visual do showcase).
    - Grid: 1 coluna (mobile) -> 2/3 colunas (desktop). Gap: `gap-6`.

2.  **Componente `ProjectCard.tsx`:**
    - **Animação de Entrada:** Staggered (`0.08s` entre cards). `initial={{ opacity: 0, y: 24 }}`.
    - **Hover State:**
      - Scale container: `1.03`.
      - Sombra: `shadow-xl` + `shadow-blue-500/15` (glow subtil).
      - Overlay: Gradiente escuro suave que revela o título em branco.

3.  **Conteúdo do Card:**
    - Imagem (Aspect Ratio 4:3 ou 16:9).
    - Legenda inferior: Título (Bold), Cliente e Ano (Regular).
    - Fonte: Inter (ou Neo-grotesca definida).

4.  **CTA Secundário:**
    - Cartão final ou botão inferior: "Like what you see? View projects".
    - Ação: Redireciona para `/portfolio`.

**Validação (@Auditor):**

- Alt text descritivo em todas as imagens.
- Se a imagem falhar, existe um fallback elegante ("Imagem do projeto")?

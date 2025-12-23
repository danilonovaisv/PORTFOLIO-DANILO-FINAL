---
description: manifest
---

### Workflow Seção Manifesto (Reveal Suave, não Scroll Expansion)

**Conceito Visual (Ajustado):**
A seção Manifesto deve aparecer com um **efeito de revelação suave** quando entra na viewport, semelhante ao comportamento observado no site de referência para as seções subsequentes à hero. O vídeo é o elemento central e deve ganhar destaque com uma animação de fade-in e scale leve. A transição entre Hero e Manifesto é uma **mudança de seção clara**, não uma expansão contínua do mesmo elemento.

---

**Estratégia de Implementação (`ManifestoSection.tsx`):**

1.  **Orquestrador Central (`ManifestoSection.tsx`):**
    - Este componente representa a seção Manifesto como um bloco independente após a Hero.
    - Utiliza `whileInView`, `useInView`, `variants` do Framer Motion para acionar a animação de entrada quando a seção entra na viewport do usuário.
    - O scroll é natural, sem `position: sticky` ou scrubbing complexo.

2.  **Animação de Entrada do Vídeo (`ManifestoVideo.tsx` ou dentro de `ManifestoSection.tsx`):**
    - **Estado Inicial (Fora da Viewport):**
      - `opacity: 0`
      - `scale: 0.95` ou `y: 20px` (levemente abaixo ou menor)
      - `transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }` (easing premium)
    - **Estado Final (Na Viewport):**
      - `opacity: 1`
      - `scale: 1` ou `y: 0`
    - A animação deve ser suave e enfocar o vídeo como o elemento principal da seção.

3.  **Conteúdo da Seção:**
    - O vídeo é o foco. Outros elementos (título, descrição) também podem receber uma leve animação staggered, mas o vídeo entra primeiro e com mais ênfase.
    - A seção Manifesto ocupa `100vh` ou mais, centralizando o vídeo.

4.  **Componente de Vídeo:**
    - Tag `<video>` nativa otimizada ou `next-video` se disponível.
    - Props: `autoPlay`, `loop`, `muted`, `playsInline`, `controls` (opcional).
    - **Não** usa `layoutId` para expansão da Hero.
    - Pode usar `object-fit: cover` e estar centralizado no contêiner da seção.

---

**Non-Negotiables (Ajustados):**

- **Performance:** Animações via Framer Motion (`whileInView`, `variants`) usando apenas `opacity` e `transform`. Evitar animações de `width`, `height`, `bordewrRadius` em scroll (a menos que seja uma interação específica, não uma animação de entrada).
- **Fluidez:** A animação de entrada deve ser suave e consistente, respeitando o easing premium.
- **Estética:** Alinhada com a estética editorial e premium do site de referência: limpa, espaçada, com foco no conteúdo principal (vídeo).
- **Acessibilidade:** `prefers-reduced-motion: reduce` deve desativar a animação de entrada (`initial` e `animate` devem ser iguais nesse caso). O vídeo deve ter controles ou um botão de mute claro se o som for ativado.

---

**Relação com a Hero e o Thumbnail:**

- O `ManifestoThumb.tsx` na Hero **não se expandirá para esta seção**.
- O `ManifestoThumb.tsx` pode ter sua própria micro-interação (ex: `whileHover`) para indicar que é um link para a seção Manifesto.
- O clique no `ManifestoThumb.tsx` deve **realizar um scroll suave** para a âncora `#manifesto` ou para o ID do componente `ManifestoSection.tsx`.
- A seção Manifesto tem seu **próprio vídeo independente**. Pode ser o mesmo arquivo ou uma versão otimizada para o tamanho da seção.

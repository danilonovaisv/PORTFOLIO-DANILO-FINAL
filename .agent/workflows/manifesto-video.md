---
description: 
---

# Workflow: Seção Manifesto (Expand to Fullscreen)

**Conceito Visual:**
O vídeo que começou como uma "Thumb" na Hero cresce conforme o usuário desce a página até ocupar **toda a viewport (100vw/100vh)**. Neste estado "Full", não há textos, botões ou sobreposições. O vídeo é a mensagem.

**Mecânica de Animação (Scroll-Linked):**

1. **Estratégia Técnica (Recomendada: Framer Motion + Scroll):**
    - Usar `useScroll` para monitorar a posição Y.
    - Mapear o scroll (`useTransform`) para propriedades de escala e tamanho.
    - **Estado Inicial (Scroll 0):** Tamanho "Thumb" (definido na Hero).
    - **Estado Final (Scroll ~500px):** `width: 100%`, `height: 100vh`, `borderRadius: 0px`.

2. **Limpeza de Interface:**
    - Enquanto o vídeo expande, aplicar `opacity: 0` em todos os elementos da Hero (Título, Menu, etc.).
    - Quando o vídeo estiver Full Screen, garantir que nenhum elemento de UI (exceto talvez um botão de "Skip" ou "Menu" discreto, se exigido depois) esteja visível.

3. **Implementação do Componente `Manifesto.tsx`:**
    - Deve envolver o vídeo em uma `section` com altura fixa (ex: `300vh`) para dar espaço ao usuário "sentir" a expansão (efeito "Pin").
    - Usar `position: sticky` para manter o vídeo na tela enquanto ele expande.

**Exemplo de Lógica (Pseudocódigo):**

```tsx
const { scrollYProgress } = useScroll({ target: containerRef });
const scale = useTransform(scrollYProgress, [0, 1], [0.4, 1]); // De 40% a 100%
const radius = useTransform(scrollYProgress, [0, 0.9], [24, 0]); // De rounded a square

return (
  <motion.video 
    style={{ scale, borderRadius: radius }} 
    className="w-full h-full object-cover"
  />
)

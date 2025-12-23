---
description: manifest
---

# Workflow: Seção Manifesto (Scroll Expansion)

**Conceito Visual:**
A transição entre Hero e Manifesto acontece através da expansão fluida do vídeo thumbnail. O vídeo, inicialmente um elemento da composição da Hero, cresce até ocupar **100% da viewport** (100vw/100vh), tornando-se a seção Manifesto.

---

**Estratégia de Implementação (`HomeIntro.tsx`):**

1. **Orquestrador Central (`HomeIntro.tsx`):**
   - Este componente gerencia o espaço vertical total (ex: `250vh` ou `300vh`) para permitir o scroll.
   - Utiliza `position: sticky` para fixar a Hero/Vídeo enquanto o usuário rola.
   - **Hook:** `useScroll` do Framer Motion.

2. **Estados do Vídeo (`ManifestoThumb.tsx`):**
   - **Estado Inicial (Hero):**
     - Tamanho: Thumbnail (~25-30% da tela ou tamanho fixo harmônico).
     - Posição: Integrado ao layout da Hero (ex: canto inferior direito ou centralizado abaixo do texto).
     - Border-Radius: Arredondado (ex: `16px` ou `24px`).
     - Audio: Muted.
   - **Estado Final (Manifesto):**
     - Tamanho: Fullscreen (`width: 100%`, `height: 100vh`).
     - Posição: `inset-0` (cobre tudo).
     - Border-Radius: `0px`.
     - Audio: Unmuted (opcional/interativo).

3. **Transição Hero -> Manifesto:**
   - Conforme `scrollYProgress` avança (0 -> 0.25+):
     - **Hero Text:** Fade out (`opacity: 1 -> 0`) e Scale down (`scale: 1 -> 0.9`).
     - **Video Thumb:** Scale up, Radius -> 0, Position -> Center.
   - O vídeo deve cobrir completamente a Hero ao final da transição.

4. **Componente de Vídeo:**
   - Tag `<video>` nativa otimizada.
   - Props: `autoplay`, `loop`, `muted`, `playsinline`.
   - `layoutId="manifesto-video"` (se usar AnimatePresence, caso contrário, use `style` transforms diretos para performance).

---

**Non-Negotiables:**

- **Performance:** Use `useTransform` e `motion.div` para garantir 60fps. Evite re-renders de estado React durante o scroll.
- **Fluidez:** A expansão não deve ter "pulos". Deve ser diretamente atrelada ao scroll (`scrub`).
- **Limpeza:** Quando Fullscreen, nenhum texto da Hero deve ser visível ou clicável por baixo.
- **Acessibilidade:** Botão de Mute/Unmute visualmente claro se o som ativar automaticamente.

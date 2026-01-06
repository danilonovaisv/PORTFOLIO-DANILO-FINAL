# AGENT: Portfolio-Dev-Next

Este agente é responsável por **analisar, criar e corrigir código** no projeto de portfólio do Danilo, com foco em:

- Next.js App Router (`src/app/`)
- React + TypeScript
- Tailwind CSS
- React Three Fiber + `@react-three/drei` + `@react-three/postprocessing`
- Custom Shaders (GLSL)
- Framer Motion (Scroll & Layout Animations)

---

## 1. Contexto do Projeto

- **Estilo Visual & Conceito ("Ghost Blue"):**
  - **Atmosfera:** WebGL etéreo, não sólido.
  - **Hierarquia Z-Index (Estrita):**
    - `z-50`: Preloader
    - `z-40`: Header
    - `z-30`: Manifesto Video (Expandido)
    - `z-25`: Editorial Text (Hero Copy)
    - `z-20`: Ghost WebGL
    - `z-0`: Background
  - **Interação:** Vídeo Thumb na Hero que expande para Fullscreen ao rolar (Manifesto).

---

## 2. Objetivos do Agente

1. **Análise de Código e Arquitetura**
   - Garantir adesão estrita ao arquivo `.agentrules`.
   - Verificar Z-Index layers em cada alteração visual.

2. **Criação e Edição de Código**
   - Implementar shaders e materiais 3D otimizados (sem updates de state no loop).
   - Gerenciar transições de scroll complexas (Hero -> Manifesto) usando Framer Motion.

---

## 3. Workflows de Implementação (Battle Plan)

### Workflow A: Fundação WebGL (O Ghost)

- **Cena:** Configurar Canvas com `dpr={[1, 1.5]}` e `gl={{ antialias: false }}`.
- **Mesh:** Formas orgânicas com Noise e emissividade alta (Blue HDR).
- **Post:** Bloom e Analog Noise (Scanlines) via `EffectComposer`.

### Workflow B: Orquestração de Scroll (A Narrativa)

- **Hero Wrapper:** Container alto (`300vh`) para permitir pinning.
- **Transformações:** Mapear `useScroll` para Escala do Vídeo e Opacidade do Texto.
- **Audio:** Lógica de mute/unmute baseada na fase do scroll (Hold Phase).

### Workflow C: Integração & Polimento

- **Mobile:** Remover WebGL pesado. Usar fallback estático ou vídeo leve.
- **Teste:** Verificar Z-Index final. O texto DEVE estar legível sobre o fantasma.

---

## 4. Stack e Padrões de Código

- **Next.js:** App Router, `next/dynamic` para componentes 3D.
- **R3F:** Use `useFrame` com refs. Nunca use `useState` no loop de renderização.
- **Framer Motion:** Curva padrão `cubic-bezier(0.22, 1, 0.36, 1)`.

Consulte `docs/STRATEGY.md` para detalhes técnicos completos.

---
description: Portfolio-Dev-Next
---

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
    - `z-35`: CTA
    - `z-30`: Ghost WebGL
    - `z-20`: Editorial Text (Hero Copy)
    - `z-0`: Background

## 📂 FONTE DA VERDADE

O arquivo mestre da pagina é: `'docs/HOME/HOME - PROTOTIPO INTERATIVO.md'` (ou caminho equivalente fornecido).
Este arquivo dita O QUE fazer. O código atual dita ONDE fazer.

## 📂 REFERENCIA SITE: `https://codepen.io/danilonovaisv/pen/azZbdQo`

## 📂 CODIGOS REAIS DA REFERENCIA: '/docs/HOME/REFERENCIA_HERO-GHOST/ GHOST-CODE'

---

## 2. Objetivos do Agente

1. **Análise de Código e Arquitetura**
   - Garantir adesão estrita ao arquivo `.agentrules`.
   - Verificar Z-Index layers em cada alteração visual.
   * Leia o conteúdo atual dos arquivos alvo.
   * Compare o código atual com o pedido do prompt.
   * _Raciocínio:_ "O que preciso mudar neste código para atingir o critério de aceite sem quebrar o que já funciona?"

2. **Criação e Edição de Código**
   - Implementar shaders e materiais 3D otimizados (sem updates de state no loop).
   - Gerenciar transições de scroll complexas (Hero -> Manifesto) usando Framer Motion.

#### 3. Aplicação Atômica

- Aplique a mudança mínima necessária.
- **Regras de Ouro:**
  - Mantenha a consistência do Tailwind (use classes utilitárias, evite style inline).
  - Não remova lógica de negócios existente.
  - Respeite a estrutura do App Router.

#### 4. Verificação Técnica (Self-Correction)

- Após a edição, simule/rode: `npm run lint` ou verifique a sintaxe.
- **Se houver erro:** Tente corrigir o erro **uma vez** baseado na mensagem de log.
- **Se persistir:** Desfaça a alteração e marque como "FALHA TÉCNICA".

#### 5. Verificação de Layout (Code-Level)

- Verifique se as classes de responsividade (ex: `md:`, `lg:`) foram aplicadas conforme o pedido "Mobile-First".
- Verifique se não há valores hardcoded que quebrem o layout (ex: `width: 1000px`).

---

## 6. Workflows de Implementação (Battle Plan)

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

## 7. Stack e Padrões de Código

- **Next.js:** App Router, `next/dynamic` para componentes 3D.
- **R3F:** Use `useFrame` com refs. Nunca use `useState` no loop de renderização.
- **Framer Motion:** Curva padrão `cubic-bezier(0.22, 1, 0.36, 1)`.

## 8. PENTEST CHECKLIST EXECUTADO:

✅ TypeScript strict (noImplicitAny=false)
✅ Tailwind purge 0kb unused CSS  
✅ R3F 60fps mobile/desktop
✅ Framer Motion GPU accelerated
✅ Next.js App Router optimized
✅ Security headers CSP/XSS
✅ Lighthouse Performance 95+
✅ Accessibility WCAG AA pass
✅ Bundle <500kb gzipped
✅ Vercel Edge deploy <50ms TTFB

Consulte `docs/STRATEGY.md` para detalhes técnicos completos.

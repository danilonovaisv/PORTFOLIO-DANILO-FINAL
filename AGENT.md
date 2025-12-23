# AGENT: Portfolio-Dev-Next

Este agente é responsável por **analisar, criar e corrigir código** no projeto de portfólio do Danilo, com foco em:

- Next.js App Router (`src/app/`)
- React + TypeScript
- Tailwind CSS
- React Three Fiber + `@react-three/drei` + `@react-three/postprocessing`
- Custom Shaders (GLSL)
- Framer Motion (Scroll & Layout Animations)
- Deploy em Firebase Hosting
- Supabase Storage (assets de mídia)

Ele atua como **engenheiro frontend sênior** e **automação de manutenção de código**, sempre privilegiando clareza, segurança e consistência arquitetural.

---

## 1. Contexto do Projeto

- Repositório: `https://github.com/danilonovaisv/_danilonov_portfolio`
- Paradigma principal:
  - App Router (`src/app/`), sem `pages/` legadas em uso.
  - Componentes organizados por **Feature**:
    - `src/components/home/**` → Componentes específicos da Home (Hero, Manifesto, etc).
    - `src/components/home/webgl/**` → Cenas 3D, shaders e pós-processamento isolados.
    - `src/components/ui/**` → Componentes genéricos reutilizáveis.
- **Estilo Visual & Conceito ("Ghost Blue"):**
  - **Atmosfera:** WebGL etéreo, não sólido. Foco em _Blue Energy_, _Bloom_, _Noise_ e _Scanlines_.
  - **Hierarquia:** Conteúdo (Texto/Vídeo) > Atmosfera (WebGL no fundo).
  - **Hero:** Texto estático sobreposto a um fundo vivo ("Ghost").
  - **Interação:** Vídeo Thumb na Hero que expande para Fullscreen ao rolar (Manifesto).

---

## 2. Objetivos do Agente

Este agente deve ser capaz de:

1. **Análise de Código e Arquitetura**
   - Ler e entender a estrutura do projeto.
   - Identificar violações do conceito "Ghost" (ex: uso de vidro físico antigo, refração incorreta).
   - Verificar a integridade das camadas (Z-Index): WebGL (z-0) < Conteúdo (z-20).

2. **Criação e Edição de Código**
   - Implementar componentes `Client Component` isolados para WebGL (`GhostStage.tsx`).
   - Criar e ajustar Shaders personalizados (`AnalogDecayPass.ts`, `FresnelMaterial`).
   - Implementar animações complexas de layout com Framer Motion (`layoutId`, `useScroll`).
   - Ajustar cores e intensidades para bater com a paleta "Blue Energy" (`#0057FF` HDR).

3. **Correção de Erros e Manutenção**
   - Detectar gargalos de performance (ex: excesso de draw calls, falta de instancing).
   - Corrigir problemas de hidratação (SSR) com componentes 3D.
   - Limpar código morto relacionado a versões anteriores (ex: `MeshTransmissionMaterial`).

4. **Higiene de Repositório**
   - Sugerir limpeza de artefatos de build (`.next`, `.firebase`).
   - Remover arquivos de "Docs" antigos que contradizem o novo conceito "Ghost".

5. **Automação Estruturada**
   - Executar pipelines previsíveis:
     - "Implementação Hero Ghost"
     - "Refatoração Video Expand"
     - "Auditoria Visual"

---

## 3. Stack e Padrões de Código

- **Next.js**
  - Usar **App Router**.
  - Evitar animações de entrada pesadas no LCP (Largest Contentful Paint). Texto da Hero deve ser estático ou ter _fade_ muito rápido.

- **React + TypeScript**
  - Tipagem estrita.
  - Componentes WebGL devem ser carregados dinamicamente (`next/dynamic`) com `ssr: false`.

- **React Three Fiber (R3F) - O Motor "Ghost"**
  - **Local:** `src/components/home/webgl/`.
  - **Materiais:** Priorizar `shaderMaterial` ou `MeshStandardMaterial` com alta emissividade.
  - **Pós-Processamento:** `@react-three/postprocessing` é mandatório (Bloom, Noise, Vignette).
  - **Cores:** Usar valores HDR (ex: `[0.2, 0.5, 3.0]`) para garantir que o azul "estoure" no Bloom.
  - **Animação:** `useFrame` para movimentos orgânicos/flutuantes (senoidais).

- **Framer Motion - A Interação**
  - **Video Thumb -> Full:** Usar `layoutId` para transição mágica ou `useScroll` para interpolar escala/border-radius.
  - **Scroll:** Integrar com `lenis` para suavidade global.

---

## 4. Ferramentas e Integrações (Agent Builder)

### 4.1. fileSearchTool

- **Uso:**
  - Buscar referências de _shaders_ existentes.
  - Encontrar a implementação atual de `HomeHero.tsx` e `GhostCanvas.tsx`.
  - Verificar configurações em `tailwind.config.ts`.

### 4.2. codeInterpreterTool

- **Uso:**
  - Gerar patches de código.
  - Analisar lógica de shaders (GLSL) para erros de sintaxe antes de aplicar.

### 4.3. hostedMcpTool

- **Uso:**
  - Ler e escrever arquivos no sistema de arquivos local ou repositório.

---

## 5. Tipos de Tarefas Suportadas

1. **"Analise a estrutura atual"**
   - Verificar se `src/components/home/webgl` existe e contém `GhostCanvas.tsx`.
   - Validar se o `HomeHero.tsx` está importando os componentes corretos.

2. **"Implemente o conceito Ghost Blue"**
   - Ajustar `FresnelMaterial` para tons de azul elétrico.
   - Configurar `AnalogDecay` para efeito de filme/ruído.
   - Garantir que o canvas seja transparente (`alpha: true`) se necessário, ou tenha o fundo correto (`#06071f`).

3. **"Corrija a expansão do vídeo"**
   - Verificar conexão entre `ManifestoThumb.tsx` e a seção `Manifesto`.
   - Ajustar `z-index` para garantir que o vídeo expandido fique sobre o texto e o menu.

4. **"Limpeza de legado"**
   - Remover arquivos como `GlassOrb.tsx`, `TorusDan.tsx` (versão física), e pastas `backs/`.

---

## 6. Fluxos de Trabalho (Workflows) Recomendados

### 6.1. Workflow: Implementação da Hero (Blue Ghost)

1. **Verificação de Camadas:**
   - Ler `src/components/home/HomeHero.tsx`.
   - Garantir: WebGL (`z-0`) < Overlay (`z-10`) < Texto/Thumb (`z-20`).
2. **Ajuste de Shader:**
   - Ler `src/components/home/webgl/GhostCanvas.tsx`.
   - Aplicar cores HDR Azuis.
   - Ajustar intensidade do Bloom.
3. **Validação:**
   - O texto está legível sobre o fundo?
   - O fantasma se move de forma orgânica?

### 6.2. Workflow: Refatoração de Vídeo (Thumb to Full)

1. **Setup:**
   - Localizar `ManifestoThumb.tsx`.
   - Localizar componente da página ou wrapper `HomeIntro.tsx`.
2. **Lógica de Movimento:**
   - Aplicar `layoutId="manifesto-video"` em ambos os estados (Thumb e Full).
   - Ou configurar `useScroll` transformando:
     - `scale`: 0.4 -> 1.0
     - `borderRadius`: 24px -> 0px
3. **Cleanup:**
   - Garantir que o vídeo esteja mudo (`muted`) e em loop.

---

## 7. Estilo de Resposta do Agente

- **Foco:** Visual e Performance.
- **Tom:** Especialista em Creative Coding.
- **Ação:** Ao receber um pedido de ajuste visual, primeiro analise os arquivos de _Estilo_ (`globals.css`, `tailwind.config`) e _WebGL_ (`GhostCanvas`), depois proponha a mudança.

---

Este `AGENT.md` é a **fonte de verdade** para a iteração "Ghost/Blue Energy" do portfólio.

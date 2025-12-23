---
description: hero
---

# Workflow: Implementação da Hero Section (Ghost Atmosphere)

**Conceito Visual (Atualizado - Master Sync):**
A Hero segue o conceito **"Ghost Atmosphere"**. O elemento WebGL ("Ghost") atua como uma camada atmosférica de fundo (`z-0`), criando profundidade e movimento sutil, sem interferir na legibilidade do conteúdo.

- **Atmosfera:** O WebGL não é um objeto sólido nem uma fonte de luz que revela conteúdo. É uma manifestação de energia azul (`#0057FF`) e ruído analógico ao fundo.
- **Conteúdo:** O texto é 100% estático, cor `#d9dade` (Off-white/Grey), funcionando como âncora editorial.
- **Vídeo:** A Thumb do Manifesto integra a composição acima do fundo.

---

**Passo a Passo de Implementação:**

1. **Orquestração de Camadas (`HomeHero.tsx`):**
    - **Container Base:** `relative min-h-screen bg-[#06071f]` (Deep Void Blue).
    - **Camada 0 (WebGL - z-0):**
        - O componente `GhostStage` (`GhostCanvas`) ocupa `absolute inset-0`.
        - `pointer-events-none`.
    - **Camada 1 (Overlay - z-10):**
        - Gradiente Radial opcional para vinheta e integração: `radial-gradient(circle at center, #0b0d3a 0%, #06071f 60%)`.
        - `pointer-events-none`.
    - **Camada 2 (Conteúdo - z-20):**
        - Container flex centralizado.
        - `HeroCopy` (Texto) + `ManifestoThumb` (Vídeo).
        - `pointer-events-none` no container geral, `auto` nos elementos interativos (links, botões, vídeo).

2. **Configuração do WebGL (Blue Ghost):**
    - **Shader:** `FresnelMaterial` customizado.
        - Cor Base: Azul Profundo HDR.
        - Rim Light: Ciano/Branco explosivo.
    - **Partículas:** `Sparkles` na cor `#0057FF`.
    - **Pós-processamento:** `Bloom` (Glow intenso) + `AnalogDecay` (Noise/Grain/Scanlines).
    - **Fundo:** Canvas transparente (`alpha: true`), fundo definido no CSS do pai (`HomeHero`).

3. **Conteúdo Estático (`HeroCopy.tsx`):**
   - **Cor do Texto:** `#d9dade`.
   - **Comportamento:** Sem animações de entrada (reveal/fade). Estático na renderização.
   - **Tipografia:** Hierarquia clara (Brand Awareness -> Headline -> Subhead).

---

**Non-Negotiables (Regras de Ouro):**

- **Layering:** WebGL (`z-0`) SEMPRE atrás do Texto (`z-20`).
- **Interação:** Nenhuma interação do mouse com o texto (exceto CTA). Follow do mouse no WebGL é permitido (desktop).
- **Cores:** Fundo `#06071f`, Texto `#d9dade`.
- **Blend Mode:** NÃO usar `mix-blend-mode` no container do WebGL que afete a legibilidade do texto. O texto deve ser sólido sobre o fundo.

---
trigger: always_on
---

# Sistema R3F: Ghost & Ethereal Energy (Ghost Era)

**CONCEITO:** O portfólio abandonou o visual de "Vidro Físico" em favor de uma atmosfera etérea, energética e "assombrada" por azul elétrico.

## Princípios de Design "Ghost"

1. **Efemeridade:** Nada deve parecer 100% sólido. Use opacidades baixas e variações de cor baseadas em visualização (**Fresnel Effect**).
2. **Azul Elétrico (Electric Blue):** A cor `#0057FF` deve brilhar intensamente. No WebGL, isso é alcançado com emissividade HDR e Bloom.
3. **Profundidade de Campo:** Fundo escuro `#050505` com gradientes radiais `#06071f` para criar sensação de vácuo infinito.
4. **Ruído de Grão:** Textura de ruído analógico sobre a cena 3D para evitar o look "perfectly digital".

## Pipeline Técnica

- **Materiais:**
  - Priorizar `ShaderMaterial` para pulsações orgânicas e distorções senoidais.
  - Se usar `MeshStandardMaterial`: usar inputs de `emissive` altos (~2.0-5.0) para "queimar" o Bloom.
  - **PROIBIDO:** `MeshTransmissionMaterial` (não combina com o conceito etéreo e impacta performance).

- **Pós-Processamento (A Espinha Dorsal):**
  - **Bloom:** Intensidade alta (~1.5+), threshold baixo (~0.15) para o glow azul.
  - **Noise/Film Grain:** Essencial para "sujar" o digital.
  - **Vignette:** Essencial para focar a atenção no objeto central.
  - **Chromatic Aberration:** Sutil nas bordas para profundidade extra.

## Performance & UX

- **DPR:** Limitar a `[1, 2]`. Nunca exceder 2.
- **Preloader:** O Canvas deve permanecer invisível até que o `DefaultLoadingManager` reporte 100%.
- **Interação:** Reação suave ao cursor (`lerp 0.05-0.1`). Reação ao scroll via GSAP ScrollTrigger vinculando propriedades do shader.

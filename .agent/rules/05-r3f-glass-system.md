---
trigger: always_on
---

# Sistema R3F: Ghost & Atmospheric (Antigo Glass System)

**ATENÇÃO:** O conceito de "Vidro Líquido" foi DEPRECIADO em favor do "Ghost/Ethereal".

## Pipeline de Renderização

1. **Cena:** Fundo escuro (#050505).
2. **Geometria:** Torus ou formas abstratas em Wireframe ou material emissivo.
3. **Iluminação:** Luzes mínimas. O brilho vem do material (`emissive`).

## Materiais & Shaders

- Não usar `MeshTransmissionMaterial` (pesado e incorreto para o novo conceito).
- Usar `MeshStandardMaterial` com:
  - `color: #101010`
  - `roughness: 0.4`
  - `metalness: 0.8`
  - `emissive: #ffffff` (controlado via script para pulsação).

## Pós-Processamento (Crucial)

O visual "Ghost" depende inteiramente da stack de efeitos:

1. **Bloom:** `intensity: 1.5`, `luminanceThreshold: 0.2` (Glow intenso).
2. **Noise (Analog Decay):** Shader customizado ou efeito de granulação para simular filme velho.
3. **Scanlines:** Linhas horizontais sutis e instáveis.
4. **Vignette:** Escurecer bordas para foco central.

## Performance

- Limitar `dpr` (Device Pixel Ratio) a `[1, 1.5]` para evitar superaquecimento.
- Desligar efeitos pesados em mobile se FPS < 30.

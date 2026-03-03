# 🖼️ Asset Governance & Integrity Rule

## 🌌 Context

No sistema "Ghost Era", a integridade visual é absoluta. Assets não são apenas arquivos; são parte da atmosfera etérea do portfólio.

## 📏 Non-Negotiables

1. **Zero Placeholder Policy**: É EXPRESSAMENTE PROIBIDO o uso de "lorem ipsum" para imagens ou URLs de placeholder (ex: via.placeholder.com).
2. **Supabase First**: Todos os assets de produção DEVEM ser servidos via Supabase Storage.
    - Bucket: `site-assets` para UI.
    - Bucket: `portfolio-media` para vídeos e projetos.
3. **Reference Method**: Assets devem ser referenciados através do arquivo `assets.json` ou via constantes tipadas no frontend.

## ⚙️ Technical Constraints

- **Formatos**:
  - Imagens: Preferencialmente `.webp` (com fallback `.jpg` se necessário).
  - Ícones: `.svg` (inline ou via sprite).
  - Vídeos: `.mp4` (H.264/H.265) com bitrate otimizado.
- **WebGL Assets**: Texturas para R3F devem ser carregadas via `drei/useTexture` e devidamente descartadas no unmount.
- **Optimization**: Nenhuma imagem deve exceder 2MB. Vídeos para hero/background devem ter < 5MB se possível.

## 🛡️ Audit Checklist

- [ ] O asset está registrado no Supabase?
- [ ] O link no `assets.json` está atualizado?
- [ ] O componente usa `next/image` ou `drei/Image` para otimização?
- [ ] Existe carregamento progressivo (blur-up) para imagens críticas?

---
*Protocolo Ghost v3.0 | Asset Sentinel*

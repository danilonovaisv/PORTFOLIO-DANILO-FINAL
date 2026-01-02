---
trigger: always_on
---

# Responsividade & Mobile-First (Ghost Era)

No contexto de um portfólio "Ghost", a versão mobile deve ser uma experiência destilada, priorizando performance e legibilidade sem perder a aura tecnológica.

## Diretrizes de Layout

- **Container Global**: `px-6` (24px) como padrão mínimo de margem lateral em mobile.
- **Hierarquia Visual**: Títulos grandes devem quebrar corretamente (`break-words`) e usar `clamp()` para escala tipográfica fluida.
- **Touch Targets**: Botões e links devem ter área mínima de click de **44x44px**.

## Performance Mobile (WebGL/CGI)

- **Desativação Seletiva**: Em dispositivos low-end, desativar Post-Processing pesado (Bloom threshold alto ou Noise off).
- **DPR**: Limitar rigorosamente a `[1, 1.5]` para evitar superaquecimento e drenagem de bateria.
- **Video Fallback**: Se o autoplay de vídeo for bloqueado, exibir um `poster` de alta qualidade (base64 ou WebP leve).

## Navegação (MobileStaggeredMenu)

- **Acessibilidade**: Arrastar para fechar ou botão de "X" sempre visível.
- **Motion**: A entrada em camadas (staggered) deve durar no máximo 0.6s para não frustrar o usuário.
- **Interação**: Impedir scroll do body (`overflow: hidden`) quando o menu estiver aberto.

## Tipografia & Escala

- Usar `text-4xl` a `text-5xl` para Hero headlines em mobile (não usar os mesmos tamanhos do desktop).
- Garantir contraste mínimo de **4.5:1** para textos de conteúdo.

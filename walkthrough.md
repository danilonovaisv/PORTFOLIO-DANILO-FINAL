# Walkthrough — Mobile Responsiveness & Media Pipeline Fixes

## Resumo do Problema

O portfólio apresentava falhas de responsividade em dispositivos móveis de 320px (overflow horizontal), inconsistência no carregamento de vídeos (desktop sendo baixado em mobile) e falha na renderização de mídias cadastradas no Admin para as Landing Pages (Template ALPA V3).

## Causa Raiz Confirmada

1.  **Tipografia:** Tokens `clamp` na `globals.css` tinham valores mínimos muito altos para containers de 320px.
2.  **Mídia:** Falta de um hook centralizado para troca de assets `desktop/mobile` e uso excessivo de `hidden/block` no CSS, que não impede o download de vídeos no background.
3.  **ALPA V3:** O componente `AlpaBlock.tsx` não mapeava os novos tipos de blocos (`image`, `video`, `text`) salvos pelo Admin, esperando apenas os tipos legados (`image-full`, etc.).
4.  **Testes:** Mocks de `framer-motion` estavam desatualizados após a migração para `motion/react`.

## Arquivos Alterados

- `src/app/globals.css`: Ajuste de tokens de tipografia fluida.
- `src/hooks/useIsMobile.ts`: Novo hook centralizado para detecção de breakpoint.
- `src/lib/portfolio/media-selector.ts`: Novo utilitário para resolução de mídias responsivas.
- `src/components/projects/templates/alpa/blocks/AlpaBlock.tsx`: Refatoração do dispatcher para suportar o Admin.
- `src/components/projects/templates/alpa/blocks/AlpaBlockMediaText.tsx`: Novo componente para layouts mistos.
- `src/components/home/hero/HeroCopy.tsx`: Ajuste de headline mobile.
- `src/components/home/hero/VideoManifesto.tsx`: Migração para `useIsMobile`.
- `src/components/sobre/sections/AboutHero.tsx` & `AboutMethod.tsx`: Otimização de carregamento de vídeo condicional.
- `src/components/home/ShaderSection.tsx`: Nova seção 3D procedural.
- `src/app/page.tsx`: Integração da nova seção.
- `test/unit/template-schema.test.ts` & `test/components/portfolio/ProjectCard.test.tsx`: Correção de testes quebrados.

## Decisões Arquiteturais

- **Conditional Rendering over CSS Hiding:** Optamos por usar `useIsMobile` para renderizar apenas a tag `<video>` necessária, economizando banda significativa em dispositivos móveis.
- **Ghost-safe Typography:** Reduzimos o mínimo do `clamp` para 32px (Display) para garantir que palavras como "BRANDING" não quebrem em telas de 320px.
- **Admin Compatibility Layer:** O `AlpaBlock` agora atua como uma camada de compatibilidade, aceitando tanto o contrato legado quanto o novo padrão `LandingPageBlock`.

## Validação Executada

- `pnpm lint`: ✅ Passou.
- `pnpm run typecheck`: ✅ Passou.
- `pnpm run test`: ✅ 235/235 testes passaram.
- `pnpm run build`: ✅ Sucesso (21/21 páginas geradas).
- **Deploy:** Triggered via `firebase deploy --only hosting`.

## Riscos Remanescentes

- Mídias de Landing Pages criadas entre a versão legada e a atual podem precisar de re-save no Admin para garantir o mapeamento perfeito, embora a camada de compatibilidade cubra os casos principais.

## Próximos Passos

- Monitorar Core Web Vitals via Lighthouse para validar o ganho de performance com a troca condicional de vídeos.

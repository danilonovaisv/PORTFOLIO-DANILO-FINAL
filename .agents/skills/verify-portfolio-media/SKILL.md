---
name: verify-portfolio-media
description: Executa verificação E2E das imagens, vídeos, galerias e páginas de projeto do portfólio após mudanças na camada de assets.
---

# Verify Portfolio Media

## O que faz

Valida em navegador real que o conteúdo publicado mantém seus assets corretos após a migração para R2.

## Quando usar

- Depois de alterar resolver, CDN, componentes de mídia ou dados de projeto.
- Antes de aprovar deploy com alterações em assets.

## Quando não usar

- Para validar apenas sintaxe ou tipos.
- Para entrar em área administrativa sem credenciais e autorização.

## Contrato operacional

Entrada: URL local/preview, lista de slugs publicados, Playwright e relatório de reconciliação.

Saída: relatório por rota com imagens, vídeos, requests, console errors e regressões.

## Procedimento

1. Descubra a quantidade real de projetos publicados e slugs.
2. Teste `/`, `/portfolio`, todas as páginas de projeto publicadas e `/sobre`.
3. Capture requests de imagens, vídeos, modelos 3D e previews.
4. Falhe se URL de mídia interna continuar apontando para o host Supabase legado.
5. Confirme resposta e renderização das imagens.
6. Para vídeo, valide metadata e carregamento, sem exigir autoplay quando a política do navegador impedir.
7. Compare contagem, ordem, títulos, slugs e galerias com o baseline.
8. Registre screenshots e erros por rota.
9. Não faça deploy.

## Critérios de verificação

- Nenhum projeto publicado desapareceu.
- Nenhuma mídia interna conhecida continua no host Supabase legado.
- URLs R2 testadas respondem com status válido e MIME compatível.
- Sem novos erros de console ou regressões visuais críticas.

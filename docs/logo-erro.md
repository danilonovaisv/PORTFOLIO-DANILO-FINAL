# Logo Error

## Resumo

O problema visível em produção não estava no logo principal do header. O erro afetava logos de projetos na seção `Featured Projects`, onde algumas imagens vinham de URLs já processadas pelo Supabase (`/storage/v1/render/image/public/...`) e eram passadas novamente para `next/image`.

Isso gerava requests quebrados em `/_next/image`, resposta `400` no browser e falha de renderização de alguns logos.

## Sintoma observado

- Logos de alguns cards não renderizavam na home.
- O console do navegador exibia erros `400` em `/_next/image`.
- O header logo continuava funcional, então o defeito era localizado.

## Causa raiz

Em [`src/components/home/featured-projects/FeaturedProjectCardFrame.tsx`](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx), o componente aplicava `next/image` sobre assets que já estavam em endpoint de renderização do Supabase.

Fluxo incorreto:

1. Supabase já devolvia uma imagem otimizada.
2. `next/image` tentava otimizar essa URL novamente.
3. O resultado era uma URL aninhada inválida e erro `400`.

## Correção aplicada

- Adicionado bypass de otimização para imagens cujo `src` já aponta para `/storage/v1/render/image/public/`.
- O mesmo bypass foi mantido para SVGs.
- A correção usa `unoptimized` apenas nesses casos, preservando o comportamento normal para os demais assets.

## Erro de deploy encontrado no log antigo

O dump anterior também mostrava um erro real de CI/CD no Firebase:

- `npm ci` remoto falhando durante deploy de functions
- múltiplos pacotes ausentes no lockfile
- término com `Error: There was an error deploying functions`

Esse erro é de pipeline/deploy e não da renderização do logo. Os dois incidentes ficaram misturados no mesmo arquivo, por isso o documento foi reestruturado.

## Arquivos relacionados

- [`src/components/home/featured-projects/FeaturedProjectCardFrame.tsx`](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/home/featured-projects/FeaturedProjectCardFrame.tsx)
- [`.agents/FIREBASE_DEPLOY_NEXT15.md`](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/FIREBASE_DEPLOY_NEXT15.md)
- [`.context/logs/adjustment_log.md`](/Users/danilonovais/PORTFOLIO-DANILO-FINAL/.context/logs/adjustment_log.md)

## Validação esperada

- Home carregando sem erro `400` para logos dos featured projects.
- Logo do header intacto.
- Deploy do Firebase concluído via `hosting`, com SSR atualizado pelo `frameworksBackend`.

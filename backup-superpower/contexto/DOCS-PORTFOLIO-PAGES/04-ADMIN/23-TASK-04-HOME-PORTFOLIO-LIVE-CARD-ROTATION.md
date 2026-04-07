# TASK-04: Home e Portfolio com Rotação Viva de Cards

## Objetivo

Restaurar o comportamento de mudança contínua e aleatória dos cards da Home e da página `/portfolio`.

## Sessão/Ação do ADMIN afetada

- Sessão: `Trabalhos`
- Consumo público:
  - Home / `Projetos em Destaque`
  - `/portfolio`

## Arquivos envolvidos

- `src/components/home/featured-projects/FeaturedProjectsRealtime.tsx`
- `src/components/home/featured-projects/FeaturedProjectsSection.tsx`
- `src/components/portfolio/ProjectsGallery.tsx`
- `src/lib/portfolio/shuffle-projects.ts`

## Sintoma anterior

- Os cards permaneciam fixos após a primeira montagem.
- O layout perdia o comportamento dinâmico esperado pela direção de arte Ghost.

## Causa-raiz confirmada

- Uma regressão anterior substituiu a rotação contínua por um shuffle estático.
- Não havia loop de reordenação controlado por visibilidade/estado do documento.

## Implementação aplicada

- A Home voltou a embaralhar projetos em loop com janela temporal controlada.
- A página `/portfolio` ganhou rotação viva independente, com pausa automática em cenários sensíveis:
  - `prefers-reduced-motion`
  - viewport mobile
  - foco/hover na galeria
  - documento oculto
- Foram introduzidos helpers dedicados para embaralhamento runtime.

## Dependências e impacto no ADMIN

- O ADMIN continua fornecendo a lista base de projetos.
- A ordem editorial persistida não é mais tratada como posição rígida na UI pública desses grids vivos.

## Edge cases

- Se `prefers-reduced-motion` estiver ativo, o layout permanece estável.
- Quando um modal está aberto ou o documento perde visibilidade, a rotação pausa para evitar jitter ou troca fora de contexto.

## Regras para futuras edições

- Não substituir o shuffle runtime por ordenação estática sem validar impacto na Home e em `/portfolio`.
- Qualquer ajuste de intervalo deve ser feito preservando pausa por visibilidade e acessibilidade.

## Checklist de validação

- [ ] Home altera a composição dos cards ao longo do tempo.
- [ ] `/portfolio` altera a ordem quando a galeria está visível.
- [ ] Não há jitter agressivo.
- [ ] `prefers-reduced-motion` continua respeitado.

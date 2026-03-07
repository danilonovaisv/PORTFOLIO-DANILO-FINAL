# 03-DASHBOARD

## 0. Estrutura de arquivos da sessão

- `src/app/admin/(protected)/page.tsx`

## 1. Objetivo da sessão

Exibir visão rápida operacional (projetos, tags, destaques Home/Portfólio).

## 2. Estratégia de dados

- contagens por tabelas `portfolio_projects` e `portfolio_tags`.
- **current code state:** queries are executed sequentially (not in parallel).

## 3. Pontos fortes

- leitura rápida de estado do CMS.
- links diretos para áreas de edição.

## 4. Inconformidades observadas

- Inconformidade crítica de performance: migrar consultas de métricas para `Promise.all` para reduzir latência total do dashboard.
- Inconformidade baixa: incluir tratamento visual de erro parcial nas métricas para cenários de latência/falha seletiva.

## 5. Atualização de estado — 2026-03-06

- `src/app/admin/(protected)/page.tsx` agora resolve `projects`, `tags`, `featured_on_home` e `featured_on_portfolio` em paralelo com `Promise.all`.
- O dashboard preserva a leitura individual de `error?.message` por card, então falhas parciais continuam localizadas.

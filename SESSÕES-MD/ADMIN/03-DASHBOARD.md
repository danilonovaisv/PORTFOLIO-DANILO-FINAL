# 03-DASHBOARD

## 0. Estrutura de arquivos da sessão
- `src/app/admin/(protected)/page.tsx`

## 1. Objetivo da sessão
Exibir visão rápida operacional (projetos, tags, destaques Home/Portfólio).

## 2. Estratégia de dados
- consultas paralelas via `Promise.all`.
- contagens por tabelas `portfolio_projects` e `portfolio_tags`.

## 3. Pontos fortes
- leitura rápida de estado do CMS.
- links diretos para áreas de edição.

## 4. Inconformidades observadas
- Inconformidade baixa: incluir tratamento visual de erro parcial nas métricas para cenários de latência/falha seletiva.

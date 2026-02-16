# 06-PROJETO-SLUG

## 0. Estrutura de arquivos da sessão
- `src/app/portfolio/[slug]/page.tsx`
- `src/lib/portfolio/project-mappers.ts`
- `src/lib/supabase/queries/projects.ts`
- `src/components/layout/SiteClosure.tsx`

## 1. Objetivo da sessão
Página individual de case para URL compartilhável, com SEO robusto e fallback de dados.

## 2. Estratégia de dados
- tenta Supabase primeiro (`listProjects`).
- fallback para conteúdo estático.
- normalização de slug para tolerância (`_`/`-`).

## 3. SEO e metadata
- `generateMetadata` dinâmico por projeto.
- OG e Twitter por case.
- JSON-LD para `project` e `VideoObject` quando mídia é vídeo.

## 4. Estrutura de conteúdo
- hero do case + metadados (cliente/categoria/ano).
- seção textual de contexto do projeto.
- fechamento com `SiteClosure`.

## 5. Considerações técnicas
- Pontos fortes:
  - fallback resiliente.
  - canonical consistente.
- Riscos:
  - conteúdo textual atualmente genérico pode reduzir diferenciação semântica entre cases.

## 6. Inconformidades observadas
- Inconformidade média: recomenda-se texto descritivo específico por projeto (evitar blocos genéricos repetidos para SEO semântico e UX).

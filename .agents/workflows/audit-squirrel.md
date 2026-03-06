---
description: ### Audit and implement squirrel report
---

Use a skill audit-website para auditar <http://localhost:3000> usando o formato --format llm.

Fase 1: Alinhamento de Contexto
Antes de qualquer alteração, analise os arquivos em .context/DOCS-PORTFOLIO-PAGES. Utilize esta documentação como guia para os princípios de 'Ghost Design', requisitos de motion e regras de acessibilidade já estabelecidas.

Fase 2: Execução Técnica
Spawne subagentes para corrigir erros e avisos em paralelo, respeitando a stack (Next.js 14, Tailwind, Framer Motion, R3F):

Subagent 1: Corrigir acessibilidade (ARIA labels em cenas 3D, HTML semântico e navegação por teclado).

Subagent 2: Otimizar SEO e Meta Tags via Next.js Metadata API, garantindo conformidade com os documentos de cada página.

Subagent 3: Otimizar Performance (Core Web Vitals), focando em LCP e eficiência de runtime dos ScrollTriggers.

Fase 3: Sincronização de Documentação
Após as correções, valide o site novamente. Se houver mudanças na estrutura de componentes ou melhoria nos scores de auditoria, atualize os arquivos correspondentes em .context/DOCS-PORTFOLIO-PAGES para refletir as novas implementações e os resultados técnicos finais.

/refatorar-docs --force

/auditar-codigo: Garanta que nenhum 'magic number' foi introduzido e que a documentação atualizada segue o padrão Markdown do projeto.

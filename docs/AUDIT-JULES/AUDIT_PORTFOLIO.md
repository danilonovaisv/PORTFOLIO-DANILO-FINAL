# 📝 RELATÓRIO DE FIDELIDADE: PORTFÓLIO (PÁGINA E INTERNAS)

## 🔍 ANÁLISE POR SESSÃO

### SESSÃO GLOBAL / GALLERY PAGE
* STATUS: ⚠️ Desvio Visual / ❌ Pendência Técnica
* DIFERENÇAS ENCONTRADAS: A memória do sistema lista que `PortfolioHero.tsx` exibe formatações inconsistentes, misturando `CSS Modules`, `Tailwind CSS` e Estilos Inline.
* LAYOUT/UI: A grade principal de projetos (Gallery) e os filtros (`/portfolio`).
* MOTION: Semelhante ao Bento Grid na home: `staggerChildren: 0.12`, `duration: 0.7s` em containers e cards. Filtros mudam estado de cards via `layout` animation no Framer Motion para uma realocação suave.
* PROBLEMAS TÉCNICOS: Refatoração necessária para limpar `PortfolioHero.tsx` e unificar abordagens sob Tailwind CSS e Componentes modulares, garantindo performance de renderização.
* POSSÍVEL SOLUÇÃO: Extrair variáveis de `PortfolioHeroGallery.module.css` e reescrevê-las em Tailwind CSS puro de modo que fiquem controladas de forma previsível e respeitando as classes responsivas do Design System.

### SESSÃO INTERNA DO PROJETO (`/portfolio/[slug]`)
* STATUS: ⚠️ Pendente de Verificação
* DIFERENÇAS ENCONTRADAS: A Landing Page do Projeto precisa estar baseada no "PROTOTIPO INTERATIVO DA LANDING PAGE.md".
* LAYOUT/UI: Header do projeto (Cover, Título, Tags, Info). Corpo do Estudo de Caso (Imagens lado a lado e grid).
* MOTION: O Scroll Parallax no Hero Header e vídeos que carregam metadados (`preload='metadata'`). Efeito sutil em scroll das fotos em formato magazine.
* PROBLEMAS TÉCNICOS: Risco da falta de imagens estáticas como `posterUrl` em tags `<video>`.
* POSSÍVEL SOLUÇÃO: Reimplementar lógica de `VideoManifestoProps` e fallback (Transparents GIFs e `poster`) no visualizador de imagens/vídeos de grid do projeto, garantindo o LCP.

---

## 🛠️ RESUMO DE AÇÕES PRIORITÁRIAS
1. **Unificação de Estilos (`PortfolioHero`):** Exterminar uso misto de `CSS Modules` e estilo inline em favor do Tailwind CSS para estabilizar visualizações em Mobile e Desktop.
2. **Media Attributes:** Nas páginas de Detalhe do Projeto, varrer e forçar o uso da propriedade de Fallback e `poster` nos players de vídeo para otimização de Performance (Lighthouse) sem quebra LCP (Largest Contentful Paint).
3. **Ghost Motion Rules:** Confirmar o tempo de entrada dos filtros e grid da galeria, substituindo scales exagerados pela revelação suave via Translação-Y.

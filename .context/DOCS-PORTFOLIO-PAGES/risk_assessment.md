# Risk Assessment — Home, Sobre, Portfólio

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...

## Riscos Técnicos
- **R1 (P0):** ausência de landmark principal com `id="main-content"` pode quebrar skip-link e navegação assistiva.
- **R2 (P0):** estado de erro da rota Sobre usa token `text-redAccent`, potencial conflito com regra de identidade (não usar vermelho como cor de identidade).
- **R3 (P1):** sobrecarga de preload de vídeo/imagem pode afetar LCP/INP em dispositivos médios.
- **R4 (P1):** inconsistências de metadata (OG/Twitter/canonical por rota e query) podem reduzir qualidade de indexação.
- **R5 (P2):** divergência entre fallback de dados e UX final em cenários sem Supabase.

## Mitigação
- Priorizar correções de semântica e foco (R1/R2) antes de ajustes de SEO/performance.
- Validar com Lighthouse + axe + inspeção de headings por rota.
- Medir Web Vitals antes/depois (LCP, INP, CLS) por desktop/mobile.

## Gate
Sem execução de patch até aprovação humana explícita.

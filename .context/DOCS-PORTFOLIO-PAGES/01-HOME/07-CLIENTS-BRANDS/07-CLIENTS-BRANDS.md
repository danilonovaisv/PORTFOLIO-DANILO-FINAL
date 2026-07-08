# 06-CLIENTS-BRANDS

## 0. Estrutura de arquivos da sessão

- Arquivos principais:
  - `src/components/home/clients/ClientsBrandsSection.tsx`
  - `src/components/ui/shared/DynamicAssetImage.tsx`
  - `src/config/content.ts` (`HOME_CONTENT.clients`)
  - `src/config/site-assets.ts` (`SITE_ASSET_KEYS.clients.strips`)
- Dependências:
  - Framer Motion
  - Runtime assets via Supabase
- Padrão arquitetural:
  - Bloco de credibilidade com grid de logos responsivo.
- Observações sobre coesão e acoplamento:
  - Coesão alta.
  - Acoplamento baixo/médio com sistema de assets em tempo real.

## 1. Objetivo da Página/Sessão

Reforçar prova social com marcas atendidas, sustentando confiança antes da conversão em contato.

## 2. Estrutura de Conteúdo

- Headings:
  - `h2`: “marcas com as quais já trabalhei”.
- Hierarquia semântica:
  - `section` + `ul/li` para logos.
- Textos principais:
  - Título da seção.
- CTA’s:
  - Não há CTA direto.
- Fonts utilizadas:
  - Escala de heading global.
- Peso das fontes:
  - `font-bold` no título.
- Tokens aplicados:
  - Fundo `bluePrimary` e logos invertidos.
- Densidade de informação:
  - Média (12 logos).

## 3. Identidade Visual

- Cores aplicadas:
  - Fundo azul sólido com logos em branco.
- Gradientes:
  - Não predominantes.
- Backgrounds:
  - Superfície plana para contraste dos logos.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Alinhada por uso de `bluePrimary` como bloco de ruptura.
- Uso de contraste:
  - Alto contraste visual.
- Coerência tipográfica:
  - Consistente.

## 4. Interatividade & Animações

- Uso de Framer Motion:
  - Reveal do título e stagger dos itens.
- Variants:
  - `opacity + y + blur` por logo.
- Scroll animations:
  - Ativação on-view.
- Microinterações:
  - Hover sutil de logo (`opacity` e `translateY`).
- Riscos de layout shift:
  - Baixo.
- Impacto em performance:
  - Baixo/médio, dependendo de atualização de assets.

## 5. Responsividade

- Desktop:
  - 6 colunas.
- Tablet:
  - 4 colunas.
- Mobile:
  - 2 colunas.
- Breakpoints:
  - `sm`/`md`/`lg` definidos.
- Grid/Flex:
  - Grid consistente.
- Overflow:
  - Controlado.
- CLS potencial:
  - Baixo.

## 6. Acessibilidade & SEO

- Estrutura semântica:
  - Boa (`ul/li` com rótulo de lista).
- ARIA:
  - `aria-labelledby` e `aria-label` aplicados.
- Alt em imagens:
  - Presente, porém genérico (“Logo do cliente X”).
- Navegação por teclado:
  - Não há elementos interativos relevantes.
- Contraste (WCAG):
  - Forte.
- Heading structure:
  - Adequada.
- Meta tags:
  - Não aplicável direto.
- SEO técnico:
  - Neutro; seção mais voltada a confiança visual.

## 7. Integrações ou Recursos Especiais

- Firebase:
  - Não utilizado.
- Supabase:
  - Logos via `DynamicAssetImage` e `useRealtimeAsset`.
- APIs externas:
  - Não aplicável.
- SSR/CSR:
  - Client-side.
- Lazy loading:
  - Sim por `next/image` sem prioridade.
- Suspense:
  - Não aplicado.

## 8. Considerações Técnicas

- Performance:
  - Boa, com carga de imagens controlada.
- Bundle size:
  - Baixo impacto.
- Code splitting:
  - Não necessário.
- Reusabilidade:
  - Componente bem reutilizável para blocos de parceiros.
- Testabilidade:
  - Fácil snapshot/render.
- Escalabilidade:
  - Boa para expansão de logos.
- Débito técnico:
  - Alt text não descritivo por marca real.
- Recomendações arquiteturais:
  - Substituir alts genéricos por nome real da marca para acessibilidade e semântica.

---

## 9. Componentes Interativos

🎨 **Biblioteca de Componentes:**

| Componente  | Descrição                                                  | Estados         | Interações              | Status                |
| ----------- | ---------------------------------------------------------- | --------------- | ----------------------- | --------------------- |
| Botão CTA   | Não há CTA principal dedicado                              | N/A             | N/A                     | Não se aplica         |
| Modal       | Não há modal dedicado na sessão                            | N/A             | N/A                     | Não se aplica         |
| Formulário  | Não aplicável nesta sessão                                 | N/A             | N/A                     | Não se aplica         |
| Slider      | Trilho/grade de marcas com comportamento visual sequencial | Idle, Scrolling | Scroll/auto-flow visual | Parcial               |
| Menu Mobile | Global via header                                          | Closed/Open     | Navegação global        | Implementado (global) |

🔄 **Estados e Transições:**

- Hover: Logos/cards respondem com destaque sutil.
- Focus: Elementos clicáveis permanecem navegáveis por teclado.
- Loading: Logos carregados de forma preguiçosa quando possível.
- Error: Fallback para marca textual quando mídia falha.
- Success: Sessão reforça confiança sem bloquear fluxo até contato.

## 10. Estrutura de Páginas e Navegação

- Sessão institucional sem troca de rota obrigatória.
- Pode conter links externos de marcas/parcerias conforme configuração.

## 11. Informações Relevantes para Compreensão da Sessão

- Ajuda a compor prova social no terço final da HOME.
- Evitar excesso de motion em logos para não comprometer legibilidade e estabilidade visual.

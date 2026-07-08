# 03-VIDEO-MANIFESTO

## 0. Estrutura de arquivos da sessão

- Arquivos principais:
  - `src/components/home/hero/VideoManifesto.tsx`
  - `src/hooks/useRealtimeAssets.ts`
  - `src/config/site-assets.ts`
  - `src/lib/video.ts` (defaults de caption/poster)
- Dependências:
  - Framer Motion
  - IntersectionObserver
  - Realtime asset fetch/polling (Supabase)
- Padrão arquitetural:
  - Sessão de mídia lazy-loaded, com fallback e controle de áudio explícito.
- Observações sobre coesão e acoplamento:
  - Coesa em comportamento de vídeo.
  - Acoplamento médio com camada de assets em tempo real.

## 1. Objetivo da Página/Sessão

Apresentar reel audiovisual imediatamente após o hero para reforçar prova visual de qualidade e direcionar percepção de valor criativo.

## 2. Estrutura de Conteúdo

- Headings:
  - Não possui heading próprio.
- Hierarquia semântica:
  - `section.video-manifesto` com container de mídia.
- Textos principais:
  - Sem texto denso, foco em mídia.
- CTA’s:
  - Botão de som (acessibilidade + controle de mídia).
- Fonts utilizadas:
  - Não aplicável diretamente.
- Peso das fontes:
  - Não aplicável.
- Tokens aplicados:
  - Ghost easing em transição de entrada.
- Densidade de informação:
  - Baixa (mídia central).

## 3. Identidade Visual

- Cores aplicadas:
  - Vídeo exibido sem overlay/filtro para preservar cor e contraste originais da mídia.
- Gradientes:
  - Placeholder com gradiente quando vídeo ainda não carregou.
- Backgrounds:
  - Vídeo full-width com `aspect-video`.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Alinhado (entrada suave, atmosfera escura).
- Uso de contraste:
  - Botão de som com contraste mantido via `bg-black/50` no próprio controle.
- Coerência tipográfica:
  - Neutro (sem tipografia protagonista).

## 4. Interatividade & Animações

- Uso de Framer Motion:
  - Reveal com `opacity + translateY` (sem filtro blur).
- Variants:
  - Animação direta via props (`initial`/`whileInView`).
- Scroll animations:
  - Entrada ao atingir viewport.
- Microinterações:
  - Toggle de áudio com estado (`aria-pressed`).
- Riscos de layout shift:
  - Baixo (aspect ratio fixo).
- Impacto em performance:
  - Médio/alto por mídia de vídeo; mitigado por lazy load + preload metadata.

## 5. Responsividade

- Desktop:
  - Exibição ampla com qualidade de vídeo adaptável.
- Tablet:
  - Mantém proporção e comportamento.
- Mobile:
  - Carregamento sob demanda e controles touch.
- Breakpoints:
  - Responsividade nativa via CSS utilitário.
- Grid/Flex:
  - Bloco único full width.
- Overflow:
  - Controlado no wrapper.
- CLS potencial:
  - Baixo (reserva de espaço com `aspect-video`).

## 6. Acessibilidade & SEO

- Estrutura semântica:
  - `section` presente.
- ARIA:
  - `aria-label` no vídeo e controle com `aria-label`/`aria-pressed`.
- Alt em imagens:
  - Poster derivado do vídeo; sem `img` explícita.
- Navegação por teclado:
  - Botão acessível por teclado.
- Contraste (WCAG):
  - Bom no botão, com contraste garantido pelo fundo do próprio botão.
- Heading structure:
  - Não impacta estrutura global, mas poderia ter `h2` para reforço semântico.
- Meta tags:
  - Schema de vídeo em `page.tsx` + `JsonLd`.
- SEO técnico:
  - Vídeo possui schema, porém há duplicação de `VideoObject` entre script inline e `JsonLd`.

## 7. Integrações ou Recursos Especiais

- Firebase:
  - Não usado.
- Supabase:
  - `useRealtimeAsset` para trocar source dinamicamente.
- APIs externas:
  - Não aplicável.
- SSR/CSR:
  - Client-side.
- Lazy loading:
  - Sim, via `IntersectionObserver`.
- Suspense:
  - Não aplicado.

## 8. Considerações Técnicas

- Performance:
  - Bom baseline para lazy media.
- Bundle size:
  - Moderado.
- Code splitting:
  - Não crítico para este componente.
- Reusabilidade:
  - Alta (componente genérico de manifesto).
- Testabilidade:
  - Média; recomendável teste E2E de áudio/erro de source.
- Escalabilidade:
  - Boa, suporta variantes SD/HD via metadata.
- Débito técnico:
  - Risco de fallback de poster inexistente (`replace('.mp4', '-poster.jpg')`).
- Recomendações arquiteturais:
  - Normalizar pipeline de poster explícito em metadata de asset.
  - Consolidar geração de schema para evitar duplicidade.

---

## 9. Componentes Interativos

🎨 **Biblioteca de Componentes:**

| Componente  | Descrição                                               | Estados                    | Interações                 | Status                |
| ----------- | ------------------------------------------------------- | -------------------------- | -------------------------- | --------------------- |
| Botão CTA   | Controle contextual (ex.: áudio/play quando disponível) | Idle, Hover, Focus, Active | Toggle de áudio/reprodução | Implementado          |
| Modal       | Não aplicável nesta sessão                              | N/A                        | N/A                        | Não se aplica         |
| Formulário  | Não aplicável nesta sessão                              | N/A                        | N/A                        | Não se aplica         |
| Slider      | Não há slider dedicado                                  | N/A                        | N/A                        | Não se aplica         |
| Menu Mobile | Recurso global externo à sessão                         | Closed/Open                | Acesso pelo header         | Implementado (global) |

🔄 **Estados e Transições:**

- Hover: Controle de áudio e área de vídeo recebem feedback visual discreto.
- Focus: Botões de mídia acessíveis por teclado com foco visível.
- Loading: Poster inicial + carregamento progressivo do vídeo em viewport.
- Error: Fallback de mídia estática quando stream falha.
- Success: Vídeo reproduz em mute/autoplay conforme política do browser.

## 10. Estrutura de Páginas e Navegação

- Sessão intermediária de narrativa; não altera arquitetura de rotas.
- Pode conter links contextuais de aprofundamento dependendo da configuração de conteúdo.

## 11. Informações Relevantes para Compreensão da Sessão

- Referência visual global da home: `.context/HOME-PORTFOLIO-BLACK---GHOST.jpg`.
- Carregamento lazy com poster é obrigatório para proteger FCP/LCP em redes lentas.

## 12. Atualização de estado — 2026-03-15

- A seção recebeu `aria-labelledby` com `h2.sr-only`, reforçando a hierarquia semântica sem alterar a composição editorial.
- O comportamento de autoplay/loop continua condicionado ao gate de motion, mantendo a política de baixo ruído para usuários com redução de movimento.

## 13. Atualização de estado — 2026-05-05

- O wrapper do manifesto estabiliza o frame responsivo: `aspect-[9/16]` no mobile e `aspect-video` a partir de `sm`.
- O vídeo ocupa o frame com `h-full w-full object-cover object-center`, mantendo reserva de espaço previsível e evitando variação por altura intrínseca do arquivo.
- Validação Playwright confirmou `overflow-x = 0` na Home e proporções renderizadas: `390x693` no mobile, `768x432` no tablet, `1440x810` no desktop e `1680x945` no wide.

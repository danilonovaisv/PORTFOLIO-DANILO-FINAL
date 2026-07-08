# 09-MODAL-ROOT

## 0. Estrutura de arquivos da sessão

- Arquivos principais:
  - `src/components/portfolio/PortfolioModal.tsx`
  - `src/components/home/featured-projects/FeaturedProjectsRealtime.tsx`
  - `src/hooks/useBodyLock.ts`
  - `src/components/portfolio/modal/variants` (importado)
- Dependências:
  - Framer Motion + portal (`createPortal`)
- Padrão arquitetural:
  - Modal global controlado por estado local da seção de projetos.
- Observações sobre coesão e acoplamento:
  - Coeso para detalhes de projeto.
  - Acoplado ao formato de `PortfolioProject`.

## 1. Objetivo da Página/Sessão

Permitir aprofundamento de projeto sem sair da HOME, reduzindo fricção e mantendo contexto da navegação.

## 2. Estrutura de Conteúdo

- Headings:
  - `h2` invisível (`sr-only`) dentro do diálogo com título do projeto.
- Hierarquia semântica:
  - `role="dialog"`, `aria-modal="true"` e fechamento explícito.
- Textos principais:
  - Conteúdo dinâmico por tipo de projeto (Type A/Type B).
- CTA’s:
  - Botão fechar.
- Fonts utilizadas:
  - Herdadas do sistema global.
- Peso das fontes:
  - Varia por conteúdo interno do projeto.
- Tokens aplicados:
  - Fundo escuro, bordas sutis e blur.
- Densidade de informação:
  - Variável por projeto.

## 3. Identidade Visual

- Cores aplicadas:
  - Superfície escura com contraste alto.
- Gradientes:
  - Não predominante.
- Backgrounds:
  - Backdrop preto com blur.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Consistente com estética de profundidade.
- Uso de contraste:
  - Bom para conteúdo e botão fechar.
- Coerência tipográfica:
  - Consistente.

## 4. Interatividade & Animações

- Uso de Framer Motion:
  - Backdrop e container animados.
- Variants:
  - Controlados por `getBackdropVariants` e `getContainerVariants`.
- Scroll animations:
  - Scroll interno do conteúdo modal.
- Microinterações:
  - Fechamento por clique fora, ESC e botão.
- Riscos de layout shift:
  - Baixo.
- Impacto em performance:
  - Baixo/médio.

## 5. Responsividade

- Desktop:
  - Modal central com largura máxima `max-w-5xl`.
- Tablet:
  - Padding ajustado e altura dinâmica.
- Mobile:
  - Ocupa quase toda viewport com rolagem interna.
- Breakpoints:
  - `sm`/`md`/`lg` para padding/altura.
- Grid/Flex:
  - Centralização por flex.
- Overflow:
  - Conteúdo com `overflow-y-auto` e `overscroll-contain`.
- CLS potencial:
  - Baixo.

## 6. Acessibilidade & SEO

- Estrutura semântica:
  - Muito boa para diálogo acessível.
- ARIA:
  - Completa para modal.
- Alt em imagens:
  - Depende dos componentes internos Type A/Type B.
- Navegação por teclado:
  - Focus trap + foco inicial no botão fechar + ESC.
- Contraste (WCAG):
  - Adequado.
- Heading structure:
  - `h2` técnico presente.
- Meta tags:
  - Não aplicável.
- SEO técnico:
  - Modal não prejudica indexação principal.

## 7. Integrações ou Recursos Especiais

- Firebase:
  - Não usado.
- Supabase:
  - Dados chegam da seção de projetos destacada.
- APIs externas:
  - Não aplicável.
- SSR/CSR:
  - Renderizado no client via portal.
- Lazy loading:
  - Não explicitamente.
- Suspense:
  - Não aplicado.

## 8. Considerações Técnicas

- Performance:
  - Boa.
- Bundle size:
  - Moderado por dependências de conteúdo interno.
- Code splitting:
  - Melhorável via lazy dos tipos de conteúdo do modal.
- Reusabilidade:
  - Alta, pode ser reaproveitado em outras páginas.
- Testabilidade:
  - Boa para testes de acessibilidade e comportamento de foco.
- Escalabilidade:
  - Boa.
- Débito técnico:
  - Estado modal controlado em camada de seção; pode crescer em complexidade com mais gatilhos.
- Recomendações arquiteturais:
  - Considerar roteamento paralelo para modal compartilhável por URL quando necessário.

---

## 9. Componentes Interativos

🎨 **Biblioteca de Componentes:**

| Componente  | Descrição                                      | Estados                        | Interações                        | Status                |
| ----------- | ---------------------------------------------- | ------------------------------ | --------------------------------- | --------------------- |
| Botão CTA   | Ações internas do modal (ex.: visitar projeto) | Default, Hover, Focus, Active  | Navegação/ação contextual         | Implementado          |
| Modal       | Componente de diálogo acessível com portal     | Closed, Opening, Open, Closing | Esc, backdrop click, close button | Implementado          |
| Formulário  | Não aplicável por padrão                       | N/A                            | N/A                               | Não se aplica         |
| Slider      | Não aplicável por padrão                       | N/A                            | N/A                               | Não se aplica         |
| Menu Mobile | Independente do modal; recurso global          | Closed/Open                    | Navegação global                  | Implementado (global) |

🔄 **Estados e Transições:**

- Hover: Ações internas do modal (botões/links) com feedback visual consistente.
- Focus: Trap de foco ativo enquanto modal estiver aberto.
- Loading: Conteúdo do modal pode demandar estado de carregamento assíncrono.
- Error: Fallback para estado de erro de conteúdo/modal com opção de fechamento.
- Success: Fechamento restaura foco no gatilho original e mantém contexto da página.

## 10. Estrutura de Páginas e Navegação

- Overlay transversal usado por sessões de projeto para detalhamento contextual.
- Compatível com estratégia de modal por estado e evolução para rotas paralelas.

## 11. Informações Relevantes para Compreensão da Sessão

- Elemento central para UX de exploração sem perda de contexto da HOME.
- Necessário monitorar lock de scroll, restauração de foco e fechamento por teclado.

## 12. Atualização de estado — 2026-03-15

- O portal dos overlays deixou de depender diretamente de `document.body` e passou a usar um root dedicado (`#modal-root`) montado em `src/app/layout.tsx`.
- `useBodyLock` foi endurecido com contagem global de locks, evitando unlock prematuro quando modal e lightbox coexistem no mesmo fluxo.
- `PortfolioModal` e `ImageLightbox` continuam com `role="dialog"`, `aria-modal="true"` e restauração de foco, mas agora compartilham a mesma infraestrutura de portal.

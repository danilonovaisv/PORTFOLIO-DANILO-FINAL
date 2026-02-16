# 08-FOOTER

## 0. Estrutura de arquivos da sessão

- Arquivos principais:
  - `src/components/layout/SiteFooter.tsx`
  - `src/config/navigation.ts` (`NAVIGATION.footer`, `SOCIALS`)
- Dependências:
  - `next/link`, `lucide-react`
- Padrão arquitetural:
  - Rodapé dual-mode: fixo em desktop e estático em mobile.
- Observações sobre coesão e acoplamento:
  - Alta coesão, baixo acoplamento.

## 1. Objetivo da Página/Sessão

Encerrar jornada com navegação secundária, reforço de marca e atalhos para canais sociais.

## 2. Estrutura de Conteúdo

- Headings:
  - Não possui heading explícito.
- Hierarquia semântica:
  - `footer` + `nav` com links institucionais.
- Textos principais:
  - Copyright e links.
- CTA’s:
  - Links de navegação e redes.
- Fonts utilizadas:
  - Tipografia global com variação micro/uppercase.
- Peso das fontes:
  - `font-medium` e `font-bold` em links.
- Tokens aplicados:
  - Fundo azul `#0057FF` (próximo ao token primary).
- Densidade de informação:
  - Média.

## 3. Identidade Visual

- Cores aplicadas:
  - Fundo azul sólido com texto branco.
- Gradientes:
  - Não aplicável.
- Backgrounds:
  - Barra fixa no desktop.
- Consistência com GHOST-DESIGN-SYSTEM:
  - Alinhado à assinatura cromática.
- Uso de contraste:
  - Alto.
- Coerência tipográfica:
  - Boa.

## 4. Interatividade & Animações

- Uso de Framer Motion:
  - Não utiliza Framer Motion diretamente.
- Variants:
  - Não aplicável.
- Scroll animations:
  - Não aplicável.
- Microinterações:
  - Hover com underline e leve translate nos ícones.
- Riscos de layout shift:
  - Baixo.
- Impacto em performance:
  - Muito baixo.

## 5. Responsividade

- Desktop:
  - Footer fixo (`lg:fixed`) com altura estável.
- Tablet:
  - Mantém comportamento mobile até `lg`.
- Mobile:
  - Stack vertical com áreas de toque ampliadas.
- Breakpoints:
  - Switch em `lg`.
- Grid/Flex:
  - Flex adaptativo com wraps.
- Overflow:
  - Controlado.
- CLS potencial:
  - Baixo.

## 6. Acessibilidade & SEO

- Estrutura semântica:
  - `footer` e `nav` corretos.
- ARIA:
  - `aria-label` no footer/nav e links sociais.
- Alt em imagens:
  - Não aplicável.
- Navegação por teclado:
  - Links acessíveis.
- Contraste (WCAG):
  - Adequado.
- Heading structure:
  - Não possui heading, aceitável para footer.
- Meta tags:
  - Não aplicável.
- SEO técnico:
  - Links internos úteis para distribuição de crawl.

## 7. Integrações ou Recursos Especiais

- Firebase:
  - Não usado.
- Supabase:
  - Não usado direto.
- APIs externas:
  - Links sociais externos.
- SSR/CSR:
  - Componente de render simples.
- Lazy loading:
  - Não aplicável.
- Suspense:
  - Não aplicável.

## 8. Considerações Técnicas

- Performance:
  - Excelente.
- Bundle size:
  - Impacto mínimo.
- Code splitting:
  - Não necessário.
- Reusabilidade:
  - Alta.
- Testabilidade:
  - Alta.
- Escalabilidade:
  - Boa para adição de links sociais/institucionais.
- Débito técnico:
  - Nenhum crítico.
- Recomendações arquiteturais:
  - Padronizar token exato de azul com `--color-bluePrimary` para evitar discrepância entre `#0057FF` e `#0048ff`.

---

## 9. Componentes Interativos

🎨 **Biblioteca de Componentes:**
| Componente | Descrição | Estados | Interações | Status |
|------------|-----------|---------|------------|--------|
| Botão CTA | Links de ação secundária (social/institucional) | Default, Hover, Focus, Active | Navegação externa/interna | Implementado |
| Modal | Não aplicável no footer | N/A | N/A | Não se aplica |
| Formulário | Não aplicável no footer atual | N/A | N/A | Não se aplica |
| Slider | Não aplicável | N/A | N/A | Não se aplica |
| Menu Mobile | Recurso global, não pertencente ao footer | Closed/Open | Navegação global | Implementado (global) |

🔄 **Estados e Transições:**

- Hover: Links com sublinhado/realce para feedback claro.
- Focus: Foco visível consistente em toda malha de links.
- Loading: Sem dependências críticas de carregamento pesado.
- Error: Links inválidos devem ser evitados via verificação periódica.
- Success: Usuário encontra rapidamente caminhos alternativos de navegação.

## 10. Estrutura de Páginas e Navegação

- Navegação de suporte com links institucionais e sociais.
- Atua como fallback de navegação para rotas-chave e contato.

## 11. Informações Relevantes para Compreensão da Sessão

- Sessão de encerramento com alto impacto em SEO interno (links e contexto semântico).
- Garantir contraste, foco visível e área de toque adequada em mobile.

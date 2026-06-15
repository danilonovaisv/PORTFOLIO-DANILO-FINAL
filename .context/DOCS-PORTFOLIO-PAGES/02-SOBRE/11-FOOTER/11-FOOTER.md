# 10-FOOTER

## 0. Estrutura de arquivos da sessão

- Arquivo principal:
  - `src/components/layout/SiteFooter.tsx`
- Dependências:
  - `NAVIGATION.footer`
  - `SOCIALS`
  - `lucide-react`

## 1. Objetivo da Página/Sessão

Encerrar a jornada com navegação de apoio, direitos autorais e links sociais.

## 2. Estrutura de Conteúdo

- Bloco copyright.
- Navegação de rodapé.
- Ícones sociais.

## 3. Identidade Visual

- Fundo azul sólido (`#0057FF`).
- Tipografia branca com variações de opacidade.

## 4. Interatividade & Animações

- Hover discreto em links e ícones.
- Pequeno deslocamento em ícones sociais.

## 5. Responsividade

- Desktop:
  - Barra fixa inferior.
- Mobile:
  - Pilha vertical com espaçamento amplo.

## 6. Acessibilidade & SEO

- `footer` semântico com `aria-label`.
- Navegação de rodapé com links acessíveis.

## 7. Integrações ou Recursos Especiais

- Estrutura unificada para todas as páginas.

## 8. Considerações Técnicas

- Baixo custo e alta previsibilidade.
- Depende de consistência das rotas em `NAVIGATION.footer.links`.

## 9. Componentes Interativos

| Componente      | Descrição         | Estados        | Interações | Status       |
| --------------- | ----------------- | -------------- | ---------- | ------------ |
| Links de rodapé | Rotas e políticas | Default, Hover | Clique/tap | Implementado |
| Social icons    | Links externos    | Default, Hover | Clique/tap | Implementado |

## 10. Estrutura de Páginas e Navegação

- Última seção da página.
- Fecha bloco do `SiteClosure`.

## 11. Informações Relevantes para Compreensão da Sessão

- Protótipo da Sobre indica continuidade para marcas, contato e footer.

## 12. Análise de Inconformidades (Sessão vs Protótipo)

- Inconformidade 1 (Média): token de cor
  - Esperado pelo sistema Ghost: `bluePrimary #0048ff`.
  - Implementado no footer: `#0057FF`.
- Inconformidade 2 (Média): coerência de navegação para contato
  - Header usa `#contact`, footer aponta para `/contato`.
  - Pode gerar experiência inconsistente dependendo da arquitetura de rotas.
- Conformidade geral:
  - Estrutura e função de encerramento estão corretas.

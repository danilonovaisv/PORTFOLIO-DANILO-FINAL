# 08-CLIENTS-BRANDS

## 0. Estrutura de arquivos da sessão

- Arquivo principal:
  - `src/components/home/clients/ClientsBrandsSection.tsx`
- Encadeamento:
  - Usado na Sobre via `src/components/layout/SiteClosure.tsx`
- Dependências:
  - Framer Motion
  - `HOME_CONTENT.clients`
  - `DynamicAssetImage`

## 1. Objetivo da Página/Sessão

Reforçar prova social após o fechamento narrativo da Sobre.

## 2. Estrutura de Conteúdo

- Heading:
  - “marcas com as quais já trabalhei”.
- Grid:
  - 12 logos (2, 3, 4, 6 colunas por breakpoint).

## 3. Identidade Visual

- Fundo `bluePrimary` integral.
- Logos em branco com opacidade controlada.

## 4. Interatividade & Animações

- Reveal em stagger para o grid.
- Hover sutil em logos (`translate-y` mínimo).

## 5. Responsividade

- Mobile a desktop com grid progressivo.
- Boa densidade em todos os breakpoints.

## 6. Acessibilidade & SEO

- Lista semântica (`ul/li`).
- `alt` aplicado em todos os logos.

## 7. Integrações ou Recursos Especiais

- Logos dinâmicos por chave de asset com fallback.

## 8. Considerações Técnicas

- Baixo custo geral.
- Componente reutilizado em múltiplas páginas.

## 9. Componentes Interativos

| Componente       | Descrição                  | Estados                | Interações       | Status       |
| ---------------- | -------------------------- | ---------------------- | ---------------- | ------------ |
| Heading da seção | Introdução da prova social | Hidden, Visible        | InView animation | Implementado |
| Grid de logos    | Logos de clientes          | Hidden, Visible, Hover | Stagger + hover  | Implementado |

## 10. Estrutura de Páginas e Navegação

- Primeira seção do bloco `SiteClosure`.

## 11. Informações Relevantes para Compreensão da Sessão

- O protótipo de Sobre prevê continuidade pós-fechamento com seção de marcas.

## 12. Análise de Inconformidades (Sessão vs Protótipo)

- Conformidade geral:
  - Ordem, intenção e visual da seção estão aderentes.
- Inconformidade menor (Baixa):
  - O título atual está em minúsculas; dependendo da versão visual esperada pode demandar ajuste editorial.

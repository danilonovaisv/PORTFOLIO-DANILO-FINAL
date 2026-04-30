# Implementation Plan - tailwindcss-animate Build Error

## Incidente

Build falha com o erro: `Syntax error: tailwindcss: /Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/globals.css Can't resolve 'tailwindcss-animate'`.

## Contexto Arquitetural

- O projeto usa Next.js 16.2.4 com Webpack.
- Está adotando Tailwind CSS 4.2.4 com a estrutura Oxide e `@import 'tailwindcss' source(none);`.
- `globals.css` está usando a sintaxe v4: `@plugin 'tailwindcss-animate';`.
- Gestor de pacotes é `pnpm`.

## Evidências

- O erro aponta claramente para `Can't resolve 'tailwindcss-animate'`.
- Ao auditar o arquivo `package.json`, o pacote `tailwindcss-animate` **não está presente** nem em `dependencies` nem em `devDependencies`.
- No arquivo `src/app/globals.css`, linha 11, há a instrução `@plugin 'tailwindcss-animate';`.

## Hipótese Principal

1. O pacote `tailwindcss-animate` não está instalado no projeto, mas está sendo requisitado via `@plugin` no `globals.css`. (Validada: o `package.json` não contém a dependência).

## Hipóteses Secundárias

4. O projeto foi migrado (para Tailwind v4) e restou a configuração antiga de plugin ou ele foi removido do `package.json` mas esquecido no CSS.
5. Há incompatibilidade entre a lib e o stack atual (Tailwind v4), e a resolução falha caso a versão seja antiga.
6. A dependência pode ser removida com segurança porque já existe alternativa arquitetural melhor (Framer Motion).

## Causa Raiz Provável

Falta de instalação do pacote `tailwindcss-animate`, causando quebra de resolução no PostCSS/Tailwind (v4) na diretiva `@plugin`.

## Opções de Correção

**Opção A**: Instalar a dependência `tailwindcss-animate`.

- Trade-offs: Resolve o erro imediato se o código atual depender de suas classes (ex: Radix UI/shadcn-ui tipicamente usam). Adiciona uma lib extra, mas é a abordagem de menor risco de refatoração imediata da UI.

**Opção B**: Remover `@plugin 'tailwindcss-animate';` do `globals.css`.

- Trade-offs: Apenas viável se as animações atreladas a esse pacote não estiverem em uso ou puderem ser migradas para Framer Motion. Se existirem componentes que dependem das classes de `tailwindcss-animate`, eles pararão de animar corretamente.

## Recomendação

Tentar a **Opção A** (instalar via `pnpm add tailwindcss-animate`). Sendo um projeto com Radix UI instalado, é altamente provável que classes desse pacote estejam em uso em primitivas de interface (ex: dialogs, menus). Se a instalação não sanar o problema de compatibilidade com v4, avançamos para workaround ou adoção estrita de Framer Motion.

## Arquivos Afetados

- `package.json`
- `pnpm-lock.yaml`
- `src/app/globals.css` (apenas em caso de rollback)

## Dependências Afetadas

- `tailwindcss-animate` a ser injetada.

## Riscos e Regressões

- Conflito de versão entre Tailwind v4 e a biblioteca.
- Duplicação de estratégias de motion violando o Ghost Design (regras proíbem scale, rotate, bounce, permitindo opacity, blur, translateY).

## Rollback

- Remover pacote via `pnpm remove tailwindcss-animate`.
- Reverter as alterações no git.

## Validação Técnica

- Rodar `pnpm run build` e confirmar sucesso.
- Executar linting de estilos e TypeScript.

## Validação Visual

- Iniciar o modo de desenvolvimento e navegar nas rotas para testar interações de UI que dependem da animação.

## Documentação a Atualizar

- Confirmar conformidade com `.context/DOCS-PORTFOLIO-PAGES`.

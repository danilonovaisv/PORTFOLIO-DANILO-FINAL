# Orquestração de Correção: tailwindcss-animate

## Status
⏳ Pendente de Aprovação

## Lista de Tarefas (Action Items)

### 1. Instalação / Correção da Dependência
- **Dono Lógico**: Frontend Systems Auditor / Orquestrador
- **Pré-condições**: Aprovação Humana para executar comandos e alterar pacotes.
- **Passos**: 
  - Instalar o pacote via comando: `pnpm add tailwindcss-animate`.
  - Alternativamente, se o plugin não for utilizado/desejado, deletar a linha `@plugin 'tailwindcss-animate';` de `globals.css`.
- **Critério de Aceite**: A dependência é instalada ou a referência removida com sucesso.
- **Evidência Esperada**: Mensagem de sucesso do `pnpm install` e alteração rastreável no `package.json` e `pnpm-lock.yaml` (ou diff limpo no CSS).
- **Bloqueadores possíveis**: Erros de dependência peer (incompatibilidade da lib com Tailwind CSS v4 na resolução do pnpm).

### 2. Validação Técnica (Build Pipeline)
- **Dono Lógico**: Build Runner
- **Pré-condições**: Tarefa 1 concluída.
- **Passos**: 
  - Executar `pnpm run build` ou o check respectivo.
- **Critério de Aceite**: Zero erros de compilação relacionados a PostCSS ou Tailwindcss.
- **Evidência Esperada**: Output de build limpo na CLI com geração de arquivos finalizada.
- **Bloqueadores possíveis**: Novos erros estáticos aparecendo em cascata.

### 3. Validação Visual e Motion
- **Dono Lógico**: UI Inspector
- **Pré-condições**: Servidor de desenvolvimento rodando ou build servido.
- **Passos**: 
  - Inspecionar a interface renderizada em busca de componentes que dependam de `tailwindcss-animate` (modais, menus, toasts).
  - Validar contra as regras do Ghost System (motion fluido focado em opacity/translateY).
- **Critério de Aceite**: Nenhuma regressão de usabilidade ou infração das regras do Ghost System.
- **Evidência Esperada**: Tudo funcionando no client side sem jank.
- **Bloqueadores possíveis**: A biblioteca inserir animações restritas como `scale`, `rotate` ou `bounce`.

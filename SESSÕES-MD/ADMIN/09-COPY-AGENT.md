# 09-COPY-AGENT

## 0. Estrutura de arquivos da sessão
- `src/app/admin/(protected)/copy-agent/page.tsx`
- `src/app/admin/(protected)/copy-agent/actions.ts`
- `src/components/admin/FieldTooltip.tsx`

## 1. Objetivo da sessão
Gerar copy editorial para cases de portfólio com consistência de linguagem e suporte a referências visuais.

## 2. Funcionalidades
- formulário com contexto completo (projeto, cliente, objetivo, público, conceito, desafios).
- upload opcional de imagens de referência.
- retorno em markdown com ação de copiar.

## 3. Segurança e validação
- validação por `zod`.
- limite de tamanho/quantidade/tipo de arquivo.
- depende de `OPENAI_API_KEY`.

## 4. Inconformidades observadas
- Inconformidade média: estabelecer política de fallback quando OpenAI indisponível (mensagem operacional + retry guideline).

---
description: Prompt de Workflow (Template Coringa)
---

Você é um **agente executor de workflow** especializado em **Next.js, React, TypeScript, Tailwind, Framer Motion e React Three Fiber**.

Sua missão é:

1. Ler e entender completamente o arquivo **`/docs/AUDITORIA_PORTFOLIO.md`**.
2. Identificar **todos os prompts de correção** descritos nesse documento (um a um, na ordem em que aparecem).
3. **Executar cada prompt sequencialmente**, aplicando as mudanças no código.
4. Para cada prompt executado, rodar **testes de layout e animação** relacionados ao contexto específico daquele prompt.
5. Registrar o resultado de cada etapa (sucesso, falhas, pendências).

---

## 1. Leitura e parsing do documento

1. Abra e leia o arquivo:
   - `/docs/AUDITORIA_PORTFOLIO.md`
2. Identifique seções de tarefas/prompts (ex: `### Prompt #XX`, blocos de código ou listas de tarefas).
3. Para cada prompt encontrado, extraia dinamicamente:
   - **Objetivo**
   - **Arquivos/Rotas envolvidas** (Identifique qual página ou componente está sendo auditado).
   - **Ações/Passos**
   - **Regras**
   - **Critérios de aceite / Checklist**
4. **Extração de Referências Visuais**:
   - Procure no documento por caminhos de imagens (ex: `/docs/exemplo.jpg`) citados como referência visual para aquele prompt ou seção.
   - Use essas imagens encontradas como o alvo visual (target).

Monte uma lista ordenada de prompts a executar.

---

## 2. Execução iterativa (um prompt por vez)

Para **cada prompt**, em ordem:

### 2.1. Preparação

1. Localize os **arquivos e rotas** citados no prompt atual (ex.: `src/app/...`, `src/components/...`).
2. Confirme o escopo: Onde essa mudança deve ocorrer? (Header, Footer, Página X, Componente Y).

### 2.2. Aplicação das mudanças

1. Siga exatamente os **Passos/Ações** descritos no prompt extraído.
2. Respeite as **Regras** do documento.
   - Não alterar textos ou ordem das seções a menos que solicitado.
   - Usar a stack tecnológica definida (Tailwind, Framer Motion, etc).
3. Faça mudanças mínimas e precisas, estritamente dentro do escopo daquele prompt.

### 2.3. Testes técnicos

Após aplicar o prompt:

1. Se existirem scripts, execute na raiz do projeto:
   - `npm run lint`
   - `npm run build`
2. Se algum comando falhar, registre o erro e tente corrigir **apenas se o erro for causado pela mudança atual**.

---

## 3. Testes de layout (Contextual)

Para cada prompt aplicado, faça um teste visual focado nos arquivos/rotas que você alterou:

1. Suba o projeto em modo dev (ex.: `npm run dev`) e acesse a **rota correspondente à alteração**.
2. Valide o layout em pelo menos 3 larguras:
   - **Mobile:** 375px
   - **Tablet:** ~768px
   - **Desktop:** ≥ 1280px
3. Verifique os fundamentos de UI/UX baseados no pedido:
   - Grids, margens, espaçamentos (gutters).
   - Tipografia e hierarquia.
   - Ausência de overflow horizontal.
4. **Validação Visual Comparativa**:
   - Se o prompt no markdown citar uma imagem de referência (ex: `LAYOUT-REFERENCE.jpg`), use-a como **fonte da verdade**.
   - Compare o resultado do navegador com a imagem citada.

---

## 4. Testes de animação (Contextual)

Se o prompt envolver **animação / motion / WebGL**:

1. Valide transições e animações envolvidas no componente alterado.
2. Verifique:
   - As animações fluem corretamente?
   - O `easing` e `timing` parecem naturais ou seguem a descrição?
   - Não há conflito de `z-index` ou sobreposição indesejada com outros elementos.
3. Se houver menção a performance ou `prefers-reduced-motion`, verifique se foi implementado.

---

## 5. Registro de resultado (por prompt)

Para cada prompt executado, registre em um log estruturado:

- `Prompt ID` (ou título extraído)
- `Arquivos alterados`
- `Status`:
  - ✅ Sucesso (tudo conforme critérios)
  - ⚠️ Parcial (algum critério não pôde ser atendido)
  - ❌ Falha (erro de build ou visual grave)
- `Observações`:
  - Bugs visuais remanescentes.
  - Imagens de referência usadas (se houver).

---

## 6. Saída final do workflow

Ao terminar **todos os prompts** do arquivo `AUDITORIA_PORTFOLIO.md`:

1. Gere um **resumo geral**.
2. Liste quais prompts falharam ou precisam de revisão humana.
3. Indique se houve alguma discrepância entre o solicitado no documento e o código final.

---

Regras gerais:

- Siga **rigorosamente** o que está em `/docs/AUDITORIA_PORTFOLIO.md`.
- O documento de auditoria é a **fonte da verdade**. Se ele disser para mudar o Header, mude o Header. Se disser para mudar o Footer, mude o Footer.
- Execute um prompt de cada vez.
